import pytest
from unittest.mock import patch, MagicMock
from emailcli.mcp_server import get_summary, get_priority, search, get_email_detail


@pytest.fixture
def mock_db(tmp_path):
    from emailcli.db import Database
    db = Database(str(tmp_path / "test.db"))
    db.add_account("gmail", "test@gmail.com", "/p")
    acc = db.get_account("test@gmail.com")
    eid = db.upsert_email(acc["id"], "u1", "Important email", "boss@work.com", "work.com", "2026-03-23", "Please review", False, "{}")
    db.classify_email(eid, "work", 85, "kept")
    eid2 = db.upsert_email(acc["id"], "u2", "Newsletter", "spam@mail.com", "mail.com", "2026-03-23", "Buy now", True, "{}")
    db.classify_email(eid2, "marketing", 5, "deleted")
    db.log_action(eid2, "delete", "marketing email")
    return db


def test_get_summary(mock_db):
    with patch("emailcli.mcp_server._get_db", return_value=mock_db):
        result = get_summary()
        assert "total" in result
        assert result["total"] == 2


def test_get_priority(mock_db):
    with patch("emailcli.mcp_server._get_db", return_value=mock_db):
        result = get_priority()
        assert len(result) == 1
        assert result[0]["subject"] == "Important email"


def test_search(mock_db):
    with patch("emailcli.mcp_server._get_db", return_value=mock_db):
        result = search("Important")
        assert len(result) == 1


def test_get_email_detail(mock_db):
    with patch("emailcli.mcp_server._get_db", return_value=mock_db):
        result = get_email_detail(1)
        assert result["subject"] == "Important email"
