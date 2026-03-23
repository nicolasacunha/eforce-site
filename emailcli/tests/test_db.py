import pytest
from emailcli.db import Database


@pytest.fixture
def db(tmp_path):
    return Database(str(tmp_path / "test.db"))


def test_create_tables(db):
    tables = db.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()
    table_names = {t[0] for t in tables}
    assert "accounts" in table_names
    assert "emails" in table_names
    assert "actions_log" in table_names


def test_add_account(db):
    account_id = db.add_account("gmail", "test@gmail.com", "/path/to/token")
    assert account_id > 0
    account = db.get_account("test@gmail.com")
    assert account["provider"] == "gmail"
    assert account["email"] == "test@gmail.com"


def test_add_duplicate_account_raises(db):
    db.add_account("gmail", "test@gmail.com", "/path")
    with pytest.raises(Exception):
        db.add_account("gmail", "test@gmail.com", "/path2")


def test_upsert_email(db):
    db.add_account("gmail", "test@gmail.com", "/path")
    account = db.get_account("test@gmail.com")
    email_id = db.upsert_email(
        account_id=account["id"], provider_uid="msg123",
        subject="Test Subject", sender="John <john@example.com>",
        sender_domain="example.com", date="2026-03-23T10:00:00",
        snippet="Hello world", has_unsubscribe=False, raw_headers="{}",
    )
    assert email_id > 0


def test_upsert_email_dedup(db):
    db.add_account("gmail", "test@gmail.com", "/path")
    account = db.get_account("test@gmail.com")
    kwargs = dict(
        account_id=account["id"], provider_uid="msg123", subject="Test",
        sender="a@b.com", sender_domain="b.com", date="2026-03-23",
        snippet="hi", has_unsubscribe=False, raw_headers="{}",
    )
    id1 = db.upsert_email(**kwargs)
    id2 = db.upsert_email(**kwargs)
    assert id1 == id2


def test_classify_email(db):
    db.add_account("gmail", "t@g.com", "/p")
    acc = db.get_account("t@g.com")
    eid = db.upsert_email(acc["id"], "u1", "Sub", "s@d.com", "d.com", "2026-01-01", "sn", False, "{}")
    db.classify_email(eid, category="marketing", priority_score=5, action_taken="deleted")
    email = db.get_email(eid)
    assert email["category"] == "marketing"
    assert email["priority_score"] == 5
    assert email["action_taken"] == "deleted"


def test_log_action(db):
    db.add_account("gmail", "t@g.com", "/p")
    acc = db.get_account("t@g.com")
    eid = db.upsert_email(acc["id"], "u1", "Sub", "s@d.com", "d.com", "2026-01-01", "sn", False, "{}")
    db.log_action(eid, "delete", "marketing email")
    logs = db.get_actions(limit=10)
    assert len(logs) == 1
    assert logs[0]["action"] == "delete"


def test_get_priority_emails(db):
    db.add_account("gmail", "t@g.com", "/p")
    acc = db.get_account("t@g.com")
    eid = db.upsert_email(acc["id"], "u1", "Important", "s@d.com", "d.com", "2026-01-01", "sn", False, "{}")
    db.classify_email(eid, "personal", 80, "kept")
    eid2 = db.upsert_email(acc["id"], "u2", "Spam", "s@d.com", "d.com", "2026-01-01", "sn", True, "{}")
    db.classify_email(eid2, "marketing", 5, "deleted")
    priority = db.get_priority_emails(min_score=60)
    assert len(priority) == 1
    assert priority[0]["subject"] == "Important"


def test_update_last_sync(db):
    db.add_account("gmail", "t@g.com", "/p")
    db.update_last_sync("t@g.com", "2026-03-23T12:00:00")
    acc = db.get_account("t@g.com")
    assert acc["last_sync"] == "2026-03-23T12:00:00"


def test_remove_account(db):
    db.add_account("gmail", "t@g.com", "/p")
    acc = db.get_account("t@g.com")
    eid = db.upsert_email(acc["id"], "u1", "Sub", "s@d.com", "d.com", "2026-01-01", "sn", False, "{}")
    db.remove_account("t@g.com")
    assert db.get_account("t@g.com") is None
    assert db.get_email(eid) is None


def test_prune_old_emails(db):
    db.add_account("gmail", "t@g.com", "/p")
    acc = db.get_account("t@g.com")
    db.upsert_email(acc["id"], "old", "Old", "s@d.com", "d.com", "2025-01-01", "sn", False, "{}")
    db.upsert_email(acc["id"], "new", "New", "s@d.com", "d.com", "2026-03-23", "sn", False, "{}")
    pruned = db.prune_old_emails(days=90)
    assert pruned == 1


def test_get_summary(db):
    db.add_account("gmail", "t@g.com", "/p")
    acc = db.get_account("t@g.com")
    eid = db.upsert_email(acc["id"], "u1", "Sub", "s@d.com", "d.com", "2026-01-01", "sn", False, "{}")
    db.classify_email(eid, "personal", 80, "kept")
    summary = db.get_summary()
    assert summary["total"] == 1
    assert summary["by_category"]["personal"] == 1


def test_search_emails(db):
    db.add_account("gmail", "t@g.com", "/p")
    acc = db.get_account("t@g.com")
    eid = db.upsert_email(acc["id"], "u1", "Invoice from Acme", "billing@acme.com", "acme.com", "2026-01-01", "sn", False, "{}")
    db.classify_email(eid, "transactional", 35, "kept")
    results = db.search_emails("acme")
    assert len(results) == 1
    assert results[0]["sender_domain"] == "acme.com"
