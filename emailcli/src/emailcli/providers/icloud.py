import email
import imaplib
import json
import re
from datetime import datetime
from email.header import decode_header

import keyring

from emailcli.providers.base import EmailMessage

ICLOUD_IMAP_HOST = "imap.mail.me.com"
ICLOUD_IMAP_PORT = 993
KEYRING_SERVICE = "emailcli-icloud"


class ICloudProvider:
    def __init__(self, email_address: str):
        self.email_address = email_address
        self.conn: imaplib.IMAP4_SSL | None = None

    def authenticate(self) -> None:
        password = keyring.get_password(KEYRING_SERVICE, self.email_address)
        if not password:
            raise ValueError(
                f"No app password found for {self.email_address}. "
                f"Use 'emailcli accounts add icloud' first."
            )
        self.conn = imaplib.IMAP4_SSL(ICLOUD_IMAP_HOST, ICLOUD_IMAP_PORT)
        self.conn.login(self.email_address, password)
        self.conn.select("INBOX")

    @staticmethod
    def store_password(email_address: str, password: str):
        keyring.set_password(KEYRING_SERVICE, email_address, password)

    def fetch_emails(self, since: str | None = None, batch_size: int = 50) -> list[EmailMessage]:
        if not self.conn:
            raise RuntimeError("Not authenticated. Call authenticate() first.")
        if since:
            dt = datetime.fromisoformat(since)
            date_str = dt.strftime("%d-%b-%Y")
            _, data = self.conn.search(None, f'(SINCE "{date_str}")')
        else:
            _, data = self.conn.search(None, "ALL")
        msg_ids = data[0].split()
        if not msg_ids:
            return []
        msg_ids = msg_ids[-batch_size:]
        messages = []
        for msg_id in msg_ids:
            try:
                _, msg_data = self.conn.fetch(msg_id, "(RFC822)")
                if msg_data and msg_data[0]:
                    raw = msg_data[0][1]
                    parsed = self._parse_raw_email(msg_id.decode(), raw)
                    if parsed:
                        messages.append(parsed)
            except Exception:
                continue
        return messages

    def trash_email(self, provider_uid: str) -> bool:
        if not self.conn:
            return False
        try:
            self.conn.copy(provider_uid.encode(), "Trash")
            self.conn.store(provider_uid.encode(), "+FLAGS", "\\Deleted")
            self.conn.expunge()
            return True
        except Exception:
            return False

    def _parse_raw_email(self, uid: str, raw: bytes) -> EmailMessage | None:
        msg = email.message_from_bytes(raw)
        sender = self._decode_header(msg.get("From", ""))
        subject = self._decode_header(msg.get("Subject", "(no subject)"))
        date_str = msg.get("Date", "")
        has_unsub = msg.get("List-Unsubscribe") is not None
        snippet = ""
        if msg.is_multipart():
            for part in msg.walk():
                if part.get_content_type() == "text/plain":
                    payload = part.get_payload(decode=True)
                    if payload:
                        snippet = payload.decode(errors="replace")[:200]
                    break
        else:
            payload = msg.get_payload(decode=True)
            if payload:
                snippet = payload.decode(errors="replace")[:200]
        headers_dict = {k.lower(): v for k, v in msg.items()}
        return EmailMessage(
            provider_uid=uid,
            subject=subject,
            sender=sender,
            sender_domain=self._extract_domain(sender),
            date=date_str,
            snippet=snippet.strip(),
            has_unsubscribe=has_unsub,
            raw_headers=json.dumps(headers_dict),
        )

    def _decode_header(self, value: str) -> str:
        parts = decode_header(value)
        decoded = []
        for part, charset in parts:
            if isinstance(part, bytes):
                decoded.append(part.decode(charset or "utf-8", errors="replace"))
            else:
                decoded.append(part)
        return " ".join(decoded)

    def _extract_domain(self, sender: str) -> str:
        match = re.search(r"@([\w.-]+)", sender)
        return match.group(1) if match else ""

    def close(self):
        if self.conn:
            try:
                self.conn.close()
                self.conn.logout()
            except Exception:
                pass
