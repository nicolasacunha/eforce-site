import json
import pytest
from unittest.mock import MagicMock, patch
from emailcli.providers.gmail import GmailProvider


def make_message(msg_id, subject, sender, date, snippet, has_unsub=False):
    headers = [
        {"name": "Subject", "value": subject},
        {"name": "From", "value": sender},
        {"name": "Date", "value": date},
    ]
    if has_unsub:
        headers.append({"name": "List-Unsubscribe", "value": "<mailto:unsub@example.com>"})
    return {
        "id": msg_id,
        "snippet": snippet,
        "payload": {"headers": headers},
    }


def test_parse_message():
    provider = GmailProvider.__new__(GmailProvider)
    msg = make_message("abc123", "Test Subject", "John <john@example.com>", "Mon, 23 Mar 2026 10:00:00 +0000", "Hello")
    result = provider._parse_message(msg)
    assert result.provider_uid == "abc123"
    assert result.subject == "Test Subject"
    assert result.sender == "John <john@example.com>"
    assert result.sender_domain == "example.com"
    assert result.has_unsubscribe is False


def test_parse_message_with_unsubscribe():
    provider = GmailProvider.__new__(GmailProvider)
    msg = make_message("abc123", "Newsletter", "news@mail.com", "Mon, 23 Mar 2026", "Hi", has_unsub=True)
    result = provider._parse_message(msg)
    assert result.has_unsubscribe is True


def test_extract_domain():
    provider = GmailProvider.__new__(GmailProvider)
    assert provider._extract_domain("John <john@example.com>") == "example.com"
    assert provider._extract_domain("plain@domain.org") == "domain.org"
    assert provider._extract_domain("malformed") == ""
