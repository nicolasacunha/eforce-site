from dataclasses import dataclass
from typing import Protocol


@dataclass
class EmailMessage:
    provider_uid: str
    subject: str
    sender: str
    sender_domain: str
    date: str
    snippet: str
    has_unsubscribe: bool
    raw_headers: str  # JSON string


class EmailProvider(Protocol):
    def authenticate(self) -> None: ...
    def fetch_emails(self, since: str | None = None, batch_size: int = 50) -> list[EmailMessage]: ...
    def trash_email(self, provider_uid: str) -> bool: ...
