import logging
from datetime import datetime, timedelta
from logging.handlers import RotatingFileHandler

import typer
from rich.console import Console
from rich.table import Table

from emailcli.config import load_config, ensure_dirs, TOKENS_DIR, LOG_PATH
from emailcli.db import Database
from emailcli.classifier.rules import RulesClassifier
from emailcli.classifier.llm import LLMClassifier
from emailcli.actions.cleaner import Cleaner
from emailcli.actions.cataloger import Cataloger
from emailcli.actions.organizer import Organizer

app = typer.Typer(help="EmailCLI — Autonomous email cleaner and cataloger")
accounts_app = typer.Typer(help="Manage email accounts")
app.add_typer(accounts_app, name="accounts")

console = Console()


def get_logger() -> logging.Logger:
    ensure_dirs()
    logger = logging.getLogger("emailcli")
    if not logger.handlers:
        handler = RotatingFileHandler(str(LOG_PATH), maxBytes=5_000_000, backupCount=2)
        handler.setFormatter(logging.Formatter("%(asctime)s %(levelname)s %(message)s"))
        logger.addHandler(handler)
        logger.setLevel(logging.INFO)
    return logger


def get_provider(account: dict):
    if account["provider"] == "gmail":
        from emailcli.providers.gmail import GmailProvider
        provider = GmailProvider(
            email=account["email"],
            token_path=account["credentials_path"],
        )
    else:
        from emailcli.providers.icloud import ICloudProvider
        provider = ICloudProvider(email_address=account["email"])
    provider.authenticate()
    return provider


@app.command()
def scan(account: str = typer.Option(None, help="Scan only this account email")):
    """Fetch, classify, clean, and catalog emails from all accounts."""
    config = load_config()
    ensure_dirs()
    logger = get_logger()
    db = Database(config.general.db_path)
    rules = RulesClassifier(config.rules)
    llm = LLMClassifier(model=config.general.ollama_model)

    if account:
        acc = db.get_account(account)
        if not acc:
            console.print(f"[red]Account {account} not found.[/red]")
            raise typer.Exit(1)
        accounts = [acc]
    else:
        accounts = db.get_all_accounts()

    if not accounts:
        console.print("[red]No accounts configured. Use 'emailcli accounts add' first.[/red]")
        raise typer.Exit(1)

    total_stats = {"fetched": 0, "marketing": 0, "kept": 0, "deleted": 0, "ambiguous_processed": 0}

    for acct in accounts:
        console.print(f"\n[bold blue]Scanning {acct['email']}...[/bold blue]")
        try:
            provider = get_provider(acct)
        except Exception as e:
            logger.error(f"Failed to connect to {acct['email']}: {e}")
            console.print(f"[red]Failed to connect: {e}[/red]")
            continue

        since = acct.get("last_sync")
        if not since:
            since = (datetime.now() - timedelta(days=config.general.scan_days_initial)).strftime("%Y-%m-%d")

        try:
            emails = provider.fetch_emails(since=since, batch_size=config.general.batch_size)
        except Exception as e:
            logger.error(f"Failed to fetch from {acct['email']}: {e}")
            console.print(f"[red]Failed to fetch: {e}[/red]")
            continue

        console.print(f"  Fetched {len(emails)} new emails")
        total_stats["fetched"] += len(emails)

        for email_msg in emails:
            email_id = db.upsert_email(
                account_id=acct["id"],
                provider_uid=email_msg.provider_uid,
                subject=email_msg.subject,
                sender=email_msg.sender,
                sender_domain=email_msg.sender_domain,
                date=email_msg.date,
                snippet=email_msg.snippet,
                has_unsubscribe=email_msg.has_unsubscribe,
                raw_headers=email_msg.raw_headers,
            )

            existing = db.get_email(email_id)
            if existing and existing.get("action_taken"):
                continue

            classification = rules.classify(email_msg)
            cleaner = Cleaner(db, provider)

            if classification.category == "ambiguous":
                db.classify_email(email_id, "ambiguous", 50, None)
            else:
                action = cleaner.act(email_id, email_msg.provider_uid, classification)
                if action == "deleted":
                    total_stats["deleted"] += 1
                else:
                    total_stats["kept"] += 1
                if classification.category == "marketing":
                    total_stats["marketing"] += 1

        cataloger = Cataloger(db, llm, provider)
        amb_stats = cataloger.process_ambiguous()
        total_stats["ambiguous_processed"] += amb_stats["processed"]
        total_stats["kept"] += amb_stats["kept"]
        total_stats["deleted"] += amb_stats["deleted"]

        # Organize iCloud emails into folders
        if acct["provider"] == "icloud":
            from emailcli.providers.icloud import ICloudProvider
            if isinstance(provider, ICloudProvider):
                organizer = Organizer(db, provider)
                org_stats = organizer.organize(acct["id"])
                if org_stats["moved"] > 0:
                    console.print(f"  Organized {org_stats['moved']} emails into folders")
                    total_stats["organized"] = total_stats.get("organized", 0) + org_stats["moved"]

        db.update_last_sync(acct["email"], datetime.now().isoformat())
        logger.info(f"Scan complete for {acct['email']}: {len(emails)} fetched")

    pruned = db.prune_old_emails(config.retention.prune_after_days)

    console.print("\n[bold green]Scan complete![/bold green]")
    table = Table(title="Summary")
    table.add_column("Metric", style="bold")
    table.add_column("Count", justify="right")
    table.add_row("Emails fetched", str(total_stats["fetched"]))
    table.add_row("Marketing deleted", str(total_stats["marketing"]))
    table.add_row("Total deleted", str(total_stats["deleted"]))
    table.add_row("Kept", str(total_stats["kept"]))
    table.add_row("LLM classified", str(total_stats["ambiguous_processed"]))
    if total_stats.get("organized"):
        table.add_row("iCloud organized", str(total_stats["organized"]))
    if pruned:
        table.add_row("Old records pruned", str(pruned))
    console.print(table)

    db.close()


@app.command()
def organize():
    """Organize iCloud emails into folders by category."""
    config = load_config()
    db = Database(config.general.db_path)

    icloud_accounts = [a for a in db.get_all_accounts() if a["provider"] == "icloud"]
    if not icloud_accounts:
        console.print("[yellow]No iCloud accounts configured.[/yellow]")
        db.close()
        return

    from emailcli.providers.icloud import ICloudProvider

    for acct in icloud_accounts:
        console.print(f"\n[bold blue]Organizing {acct['email']}...[/bold blue]")
        try:
            provider = ICloudProvider(email_address=acct["email"])
            provider.authenticate()
        except Exception as e:
            console.print(f"[red]Failed to connect: {e}[/red]")
            continue

        organizer = Organizer(db, provider)
        stats = organizer.organize(acct["id"])

        if stats["moved"] > 0:
            table = Table(title=f"Organized {acct['email']}")
            table.add_column("Folder", style="bold")
            table.add_column("Emails moved", justify="right")
            for folder, count in stats["by_folder"].items():
                table.add_row(f"EmailCLI/{folder.capitalize()}", str(count))
            table.add_row("[bold]Total[/bold]", f"[bold]{stats['moved']}[/bold]")
            console.print(table)
        else:
            console.print("  Nothing new to organize.")

        if stats["failed"] > 0:
            console.print(f"  [yellow]{stats['failed']} emails failed to move[/yellow]")

        provider.close()

    db.close()


@app.command()
def status():
    """Show current state summary."""
    config = load_config()
    db = Database(config.general.db_path)
    summary = db.get_summary()
    accounts = db.get_all_accounts()

    table = Table(title="EmailCLI Status")
    table.add_column("Metric", style="bold")
    table.add_column("Value", justify="right")
    table.add_row("Total emails tracked", str(summary["total"]))
    table.add_row("Accounts", str(len(accounts)))
    for cat, count in summary.get("by_category", {}).items():
        table.add_row(f"  {cat}", str(count))
    for action, count in summary.get("by_action", {}).items():
        table.add_row(f"  [{action}]", str(count))

    console.print(table)

    if accounts:
        acc_table = Table(title="Accounts")
        acc_table.add_column("Email")
        acc_table.add_column("Provider")
        acc_table.add_column("Last Sync")
        for acc in accounts:
            acc_table.add_row(acc["email"], acc["provider"], acc.get("last_sync") or "never")
        console.print(acc_table)

    db.close()


@accounts_app.command("add")
def accounts_add(provider: str):
    """Add an email account (gmail or icloud)."""
    config = load_config()
    ensure_dirs()
    db = Database(config.general.db_path)

    if provider == "gmail":
        email_addr = typer.prompt("Gmail address")
        client_secret = typer.prompt("Path to client_secret.json (from Google Cloud Console)")
        token_path = str(TOKENS_DIR / f"gmail-{email_addr}.json")

        from emailcli.providers.gmail import GmailProvider
        gp = GmailProvider(email=email_addr, token_path=token_path, client_secret_path=client_secret)
        console.print("[yellow]Opening browser for Gmail authorization...[/yellow]")
        gp.authenticate()

        db.add_account("gmail", email_addr, token_path)
        console.print(f"[green]Gmail account {email_addr} added successfully![/green]")

    elif provider == "icloud":
        email_addr = typer.prompt("iCloud email address")
        app_password = typer.prompt("App-specific password (from appleid.apple.com)", hide_input=True)

        from emailcli.providers.icloud import ICloudProvider
        ICloudProvider.store_password(email_addr, app_password)

        ip = ICloudProvider(email_address=email_addr)
        ip.authenticate()
        ip.close()

        db.add_account("icloud", email_addr, "keyring")
        console.print(f"[green]iCloud account {email_addr} added successfully![/green]")

    else:
        console.print(f"[red]Unknown provider: {provider}. Use 'gmail' or 'icloud'.[/red]")
        raise typer.Exit(1)

    db.close()


@accounts_app.command("list")
def accounts_list():
    """List configured accounts."""
    config = load_config()
    db = Database(config.general.db_path)
    accounts = db.get_all_accounts()

    if not accounts:
        console.print("[yellow]No accounts configured.[/yellow]")
        return

    table = Table(title="Configured Accounts")
    table.add_column("Email")
    table.add_column("Provider")
    table.add_column("Last Sync")
    for acc in accounts:
        table.add_row(acc["email"], acc["provider"], acc.get("last_sync") or "never")
    console.print(table)
    db.close()


@accounts_app.command("remove")
def accounts_remove(email: str):
    """Remove an account and its data."""
    config = load_config()
    db = Database(config.general.db_path)
    account = db.get_account(email)

    if not account:
        console.print(f"[red]Account {email} not found.[/red]")
        raise typer.Exit(1)

    db.remove_account(email)
    console.print(f"[green]Account {email} removed.[/green]")
    db.close()


if __name__ == "__main__":
    app()
