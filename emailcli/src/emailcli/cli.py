import typer
from rich.console import Console

app = typer.Typer(help="EmailCLI — Autonomous email cleaner and cataloger")
accounts_app = typer.Typer(help="Manage email accounts")
app.add_typer(accounts_app, name="accounts")

console = Console()


@app.command()
def scan():
    """Fetch, classify, clean, and catalog emails."""
    console.print("[bold]Scan not yet implemented[/bold]")


@app.command()
def status():
    """Show current state summary."""
    console.print("[bold]Status not yet implemented[/bold]")


@accounts_app.command("add")
def accounts_add(provider: str):
    """Add an email account (gmail or icloud)."""
    console.print(f"[bold]Add account ({provider}) not yet implemented[/bold]")


@accounts_app.command("list")
def accounts_list():
    """List configured accounts."""
    console.print("[bold]List accounts not yet implemented[/bold]")


@accounts_app.command("remove")
def accounts_remove(email: str):
    """Remove an account and its data."""
    console.print(f"[bold]Remove {email} not yet implemented[/bold]")


if __name__ == "__main__":
    app()
