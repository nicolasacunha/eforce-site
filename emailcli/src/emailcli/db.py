import sqlite3
from datetime import datetime, timedelta


class Database:
    def __init__(self, db_path: str):
        self.conn = sqlite3.connect(db_path)
        self.conn.row_factory = sqlite3.Row
        self.conn.execute("PRAGMA journal_mode=WAL")
        self.conn.execute("PRAGMA foreign_keys=ON")
        self._create_tables()

    def _create_tables(self):
        self.conn.executescript("""
            CREATE TABLE IF NOT EXISTS accounts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                provider TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                credentials_path TEXT NOT NULL,
                last_sync DATETIME
            );

            CREATE TABLE IF NOT EXISTS emails (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                account_id INTEGER NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
                provider_uid TEXT NOT NULL,
                subject TEXT,
                sender TEXT,
                sender_domain TEXT,
                date DATETIME,
                snippet TEXT,
                category TEXT,
                priority_score INTEGER,
                has_unsubscribe BOOLEAN,
                raw_headers TEXT,
                processed_at DATETIME,
                action_taken TEXT,
                UNIQUE(account_id, provider_uid)
            );

            CREATE TABLE IF NOT EXISTS actions_log (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email_id INTEGER NOT NULL REFERENCES emails(id) ON DELETE CASCADE,
                action TEXT NOT NULL,
                reason TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            );

            CREATE INDEX IF NOT EXISTS idx_emails_category ON emails(category);
            CREATE INDEX IF NOT EXISTS idx_emails_priority ON emails(priority_score);
            CREATE INDEX IF NOT EXISTS idx_emails_account ON emails(account_id);
            CREATE INDEX IF NOT EXISTS idx_emails_date ON emails(date);
        """)

    def execute(self, sql, params=()):
        return self.conn.execute(sql, params)

    def add_account(self, provider: str, email: str, credentials_path: str) -> int:
        cursor = self.conn.execute(
            "INSERT INTO accounts (provider, email, credentials_path) VALUES (?, ?, ?)",
            (provider, email, credentials_path),
        )
        self.conn.commit()
        return cursor.lastrowid

    def get_account(self, email: str) -> dict | None:
        row = self.conn.execute("SELECT * FROM accounts WHERE email = ?", (email,)).fetchone()
        return dict(row) if row else None

    def get_all_accounts(self) -> list[dict]:
        rows = self.conn.execute("SELECT * FROM accounts").fetchall()
        return [dict(r) for r in rows]

    def remove_account(self, email: str):
        self.conn.execute("DELETE FROM accounts WHERE email = ?", (email,))
        self.conn.commit()

    def update_last_sync(self, email: str, timestamp: str):
        self.conn.execute("UPDATE accounts SET last_sync = ? WHERE email = ?", (timestamp, email))
        self.conn.commit()

    def upsert_email(
        self, account_id: int, provider_uid: str, subject: str, sender: str,
        sender_domain: str, date: str, snippet: str, has_unsubscribe: bool,
        raw_headers: str,
    ) -> int:
        existing = self.conn.execute(
            "SELECT id FROM emails WHERE account_id = ? AND provider_uid = ?",
            (account_id, provider_uid),
        ).fetchone()
        if existing:
            return existing[0]
        cursor = self.conn.execute(
            """INSERT INTO emails (account_id, provider_uid, subject, sender,
               sender_domain, date, snippet, has_unsubscribe, raw_headers)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (account_id, provider_uid, subject, sender, sender_domain,
             date, snippet, has_unsubscribe, raw_headers),
        )
        self.conn.commit()
        return cursor.lastrowid

    def classify_email(self, email_id: int, category: str, priority_score: int, action_taken: str):
        self.conn.execute(
            """UPDATE emails SET category = ?, priority_score = ?, action_taken = ?,
               processed_at = ? WHERE id = ?""",
            (category, priority_score, action_taken, datetime.now().isoformat(), email_id),
        )
        self.conn.commit()

    def get_email(self, email_id: int) -> dict | None:
        row = self.conn.execute("SELECT * FROM emails WHERE id = ?", (email_id,)).fetchone()
        return dict(row) if row else None

    def log_action(self, email_id: int, action: str, reason: str):
        self.conn.execute(
            "INSERT INTO actions_log (email_id, action, reason) VALUES (?, ?, ?)",
            (email_id, action, reason),
        )
        self.conn.commit()

    def get_actions(self, limit: int = 50) -> list[dict]:
        rows = self.conn.execute(
            "SELECT * FROM actions_log ORDER BY timestamp DESC LIMIT ?", (limit,)
        ).fetchall()
        return [dict(r) for r in rows]

    def get_priority_emails(self, min_score: int = 60) -> list[dict]:
        rows = self.conn.execute(
            """SELECT e.*, a.email as account_email FROM emails e
               JOIN accounts a ON e.account_id = a.id
               WHERE e.priority_score >= ? AND e.action_taken = 'kept'
               ORDER BY e.priority_score DESC""",
            (min_score,),
        ).fetchall()
        return [dict(r) for r in rows]

    def get_emails_by_account(self, account_email: str) -> list[dict]:
        rows = self.conn.execute(
            """SELECT e.* FROM emails e
               JOIN accounts a ON e.account_id = a.id
               WHERE a.email = ? AND e.action_taken = 'kept'
               ORDER BY e.date DESC""",
            (account_email,),
        ).fetchall()
        return [dict(r) for r in rows]

    def search_emails(self, query: str, account_email: str | None = None, category: str | None = None) -> list[dict]:
        sql = """SELECT e.*, a.email as account_email FROM emails e
                 JOIN accounts a ON e.account_id = a.id
                 WHERE (e.subject LIKE ? OR e.sender LIKE ?) AND e.action_taken = 'kept'"""
        params: list = [f"%{query}%", f"%{query}%"]
        if account_email:
            sql += " AND a.email = ?"
            params.append(account_email)
        if category:
            sql += " AND e.category = ?"
            params.append(category)
        sql += " ORDER BY e.date DESC LIMIT 100"
        rows = self.conn.execute(sql, params).fetchall()
        return [dict(r) for r in rows]

    def get_summary(self) -> dict:
        total = self.conn.execute("SELECT COUNT(*) FROM emails").fetchone()[0]
        by_category = {}
        rows = self.conn.execute(
            "SELECT category, COUNT(*) as cnt FROM emails WHERE category IS NOT NULL GROUP BY category"
        ).fetchall()
        for r in rows:
            by_category[r["category"]] = r["cnt"]
        by_action = {}
        rows = self.conn.execute(
            "SELECT action_taken, COUNT(*) as cnt FROM emails WHERE action_taken IS NOT NULL GROUP BY action_taken"
        ).fetchall()
        for r in rows:
            by_action[r["action_taken"]] = r["cnt"]
        return {"total": total, "by_category": by_category, "by_action": by_action}

    def get_unprocessed_ambiguous(self) -> list[dict]:
        rows = self.conn.execute(
            "SELECT * FROM emails WHERE category = 'ambiguous' AND action_taken IS NULL"
        ).fetchall()
        return [dict(r) for r in rows]

    def prune_old_emails(self, days: int = 90) -> int:
        cutoff = (datetime.now() - timedelta(days=days)).isoformat()
        cursor = self.conn.execute("DELETE FROM emails WHERE date < ?", (cutoff,))
        self.conn.commit()
        return cursor.rowcount

    def close(self):
        self.conn.close()
