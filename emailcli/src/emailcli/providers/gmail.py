import json
import re
import time
from pathlib import Path

from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from emailcli.providers.base import EmailMessage

SCOPES = ["https://www.googleapis.com/auth/gmail.modify"]


class GmailProvider:
    def __init__(self, email: str, token_path: str, client_secret_path: str | None = None):
        self.email = email
        self.token_path = Path(token_path)
        self.client_secret_path = client_secret_path
        self.service = None

    def authenticate(self) -> None:
        creds = None
        if self.token_path.exists():
            creds = Credentials.from_authorized_user_file(str(self.token_path), SCOPES)
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                if not self.client_secret_path:
                    raise ValueError("Client secret path required for initial authentication")
                flow = InstalledAppFlow.from_client_secrets_file(self.client_secret_path, SCOPES)
                creds = flow.run_local_server(port=0)
            self.token_path.parent.mkdir(parents=True, exist_ok=True)
            self.token_path.write_text(creds.to_json())
        self.service = build("gmail", "v1", credentials=creds)

    def fetch_emails(self, since: str | None = None, batch_size: int = 50) -> list[EmailMessage]:
        if not self.service:
            raise RuntimeError("Not authenticated. Call authenticate() first.")
        query = "in:inbox"
        if since:
            query += f" after:{since.replace('-', '/')}"
        messages = []
        page_token = None
        while True:
            result = self._list_with_backoff(query, batch_size, page_token)
            msg_list = result.get("messages", [])
            if not msg_list:
                break
            for msg_ref in msg_list:
                try:
                    msg = self.service.users().messages().get(
                        userId="me", id=msg_ref["id"], format="metadata",
                        metadataHeaders=["Subject", "From", "Date", "List-Unsubscribe"],
                    ).execute()
                    parsed = self._parse_message(msg)
                    if parsed:
                        messages.append(parsed)
                except HttpError as e:
                    if e.resp.status == 429:
                        time.sleep(2)
                    continue
            page_token = result.get("nextPageToken")
            if not page_token:
                break
        return messages

    def _list_with_backoff(self, query: str, max_results: int, page_token: str | None) -> dict:
        for attempt in range(5):
            try:
                kwargs = {"userId": "me", "q": query, "maxResults": max_results}
                if page_token:
                    kwargs["pageToken"] = page_token
                return self.service.users().messages().list(**kwargs).execute()
            except HttpError as e:
                if e.resp.status == 429:
                    time.sleep(2 ** attempt)
                else:
                    raise
        return {}

    def trash_email(self, provider_uid: str) -> bool:
        if not self.service:
            return False
        try:
            self.service.users().messages().trash(userId="me", id=provider_uid).execute()
            return True
        except HttpError:
            return False

    def _parse_message(self, msg: dict) -> EmailMessage | None:
        headers = {h["name"].lower(): h["value"] for h in msg.get("payload", {}).get("headers", [])}
        sender = headers.get("from", "")
        return EmailMessage(
            provider_uid=msg["id"],
            subject=headers.get("subject", "(no subject)"),
            sender=sender,
            sender_domain=self._extract_domain(sender),
            date=headers.get("date", ""),
            snippet=msg.get("snippet", ""),
            has_unsubscribe="list-unsubscribe" in headers,
            raw_headers=json.dumps(headers),
        )

    def _extract_domain(self, sender: str) -> str:
        match = re.search(r"@([\w.-]+)", sender)
        return match.group(1) if match else ""
