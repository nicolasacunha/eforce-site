"""Organizes kept iCloud emails into IMAP folders by category."""
from emailcli.db import Database
from emailcli.providers.icloud import ICloudProvider


class Organizer:
    def __init__(self, db: Database, provider: ICloudProvider):
        self.db = db
        self.provider = provider

    def organize(self, account_id: int) -> dict:
        """Move all kept, unorganized emails to category folders."""
        self.provider.ensure_folders()
        # Ensure we're in INBOX for move operations
        self.provider.conn.select("INBOX")

        # Get kept emails that haven't been organized yet
        rows = self.db.conn.execute(
            """SELECT id, provider_uid, category FROM emails
               WHERE account_id = ? AND action_taken = 'kept'
               AND category IS NOT NULL AND category != 'ambiguous'
               AND id NOT IN (
                   SELECT email_id FROM actions_log WHERE action = 'organized'
               )""",
            (account_id,),
        ).fetchall()

        stats = {"moved": 0, "failed": 0, "by_folder": {}}

        for row in rows:
            category = row["category"]
            uid = row["provider_uid"]

            success = self.provider.move_to_folder(uid, category)
            if success:
                self.db.log_action(row["id"], "organized", f"moved to EmailCLI/{category}")
                stats["moved"] += 1
                stats["by_folder"][category] = stats["by_folder"].get(category, 0) + 1
            else:
                stats["failed"] += 1

        return stats
