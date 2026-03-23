import pytest
from emailcli.providers.icloud import ICloudProvider


def test_parse_email_headers():
    provider = ICloudProvider.__new__(ICloudProvider)
    raw = (
        b"From: John Doe <john@example.com>\r\n"
        b"Subject: Test Email\r\n"
        b"Date: Mon, 23 Mar 2026 10:00:00 +0000\r\n"
        b"List-Unsubscribe: <mailto:unsub@example.com>\r\n"
        b"\r\n"
        b"Hello, this is a test email body."
    )
    result = provider._parse_raw_email("123", raw)
    assert result.provider_uid == "123"
    assert result.subject == "Test Email"
    assert result.sender_domain == "example.com"
    assert result.has_unsubscribe is True
    assert "Hello, this is a test" in result.snippet


def test_parse_email_no_unsubscribe():
    provider = ICloudProvider.__new__(ICloudProvider)
    raw = (
        b"From: alice@work.com\r\n"
        b"Subject: Meeting tomorrow\r\n"
        b"Date: Mon, 23 Mar 2026\r\n"
        b"\r\n"
        b"See you at 3pm."
    )
    result = provider._parse_raw_email("456", raw)
    assert result.has_unsubscribe is False
    assert result.sender_domain == "work.com"


def test_extract_domain():
    provider = ICloudProvider.__new__(ICloudProvider)
    assert provider._extract_domain("Bob <bob@company.org>") == "company.org"
    assert provider._extract_domain("plain@test.io") == "test.io"
