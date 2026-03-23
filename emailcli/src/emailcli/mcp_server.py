import json
from datetime import datetime, timedelta

from mcp.server.fastmcp import FastMCP

from emailcli.config import load_config
from emailcli.db import Database

mcp = FastMCP("EmailCLI", json_response=True)

_db_instance: Database | None = None


def _get_db() -> Database:
    global _db_instance
    if _db_instance is None:
        config = load_config()
        _db_instance = Database(config.general.db_path)
    return _db_instance


@mcp.resource("emails://summary")
def summary_resource() -> str:
    """Overview of email state: totals by category and action across all accounts."""
    result = get_summary()
    return json.dumps(result, indent=2)


@mcp.resource("emails://priority")
def priority_resource() -> str:
    """Emails with priority score > 60, sorted by importance."""
    result = get_priority()
    return json.dumps(result, indent=2, default=str)


@mcp.resource("emails://account/{email}")
def account_resource(email: str) -> str:
    """Emails for a specific account, kept only, sorted by date."""
    db = _get_db()
    emails = db.get_emails_by_account(email)
    return json.dumps(emails, indent=2, default=str)


@mcp.resource("emails://recent-actions")
def recent_actions_resource() -> str:
    """Log of the last 50 actions taken (deletions, classifications)."""
    db = _get_db()
    actions = db.get_actions(limit=50)
    return json.dumps(actions, indent=2, default=str)


@mcp.tool()
def search_emails(query: str, account: str | None = None, category: str | None = None) -> str:
    """Search emails by subject or sender text. Optionally filter by account email or category."""
    result = search(query, account, category)
    return json.dumps(result, indent=2, default=str)


@mcp.tool()
def get_email(id: int) -> str:
    """Get full details of an email by its ID."""
    result = get_email_detail(id)
    if result is None:
        return json.dumps({"error": "Email not found"})
    return json.dumps(result, indent=2, default=str)


@mcp.tool()
def categorize_email(id: int, category: str, priority: int) -> str:
    """Manually reclassify an email with a new category and priority score."""
    db = _get_db()
    email = db.get_email(id)
    if not email:
        return json.dumps({"error": "Email not found"})
    db.classify_email(id, category, priority, "kept")
    db.log_action(id, "categorize", f"manually reclassified to {category} (score={priority})")
    return json.dumps({"success": True, "id": id, "category": category, "priority": priority})


@mcp.tool()
def trigger_scan(account: str | None = None) -> str:
    """Trigger a fresh email scan. Blocks until complete. Returns summary of actions.
    Optionally pass an account email to scan only that account."""
    import subprocess
    cmd = ["emailcli", "scan"]
    if account:
        cmd.extend(["--account", account])
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=300)
    return json.dumps({
        "returncode": result.returncode,
        "stdout": result.stdout,
        "stderr": result.stderr,
    })


def get_summary() -> dict:
    db = _get_db()
    return db.get_summary()


def get_priority() -> list[dict]:
    db = _get_db()
    return db.get_priority_emails(min_score=60)


def search(query: str, account: str | None = None, category: str | None = None) -> list[dict]:
    db = _get_db()
    return db.search_emails(query, account, category)


def get_email_detail(id: int) -> dict | None:
    db = _get_db()
    return db.get_email(id)


def main():
    """Entry point for emailcli-mcp command."""
    mcp.run(transport="stdio")


if __name__ == "__main__":
    main()
