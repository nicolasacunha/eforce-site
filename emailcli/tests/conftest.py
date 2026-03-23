import pytest
from emailcli.db import Database
from emailcli.providers.base import EmailMessage


@pytest.fixture
def db(tmp_path):
    return Database(str(tmp_path / "test.db"))


def make_email(**kwargs) -> EmailMessage:
    defaults = dict(
        provider_uid="1", subject="Hello", sender="user@example.com",
        sender_domain="example.com", date="2026-01-01", snippet="Hi",
        has_unsubscribe=False, raw_headers="{}",
    )
    defaults.update(kwargs)
    return EmailMessage(**defaults)
