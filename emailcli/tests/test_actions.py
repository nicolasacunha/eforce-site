import pytest
from unittest.mock import MagicMock
from emailcli.actions.cleaner import Cleaner
from emailcli.actions.cataloger import Cataloger
from emailcli.classifier.rules import ClassificationResult


@pytest.fixture
def mock_db():
    return MagicMock()


@pytest.fixture
def mock_provider():
    provider = MagicMock()
    provider.trash_email.return_value = True
    return provider


def test_cleaner_trashes_marketing(mock_db, mock_provider):
    cleaner = Cleaner(mock_db, mock_provider)
    result = ClassificationResult("marketing", 5)
    action = cleaner.act(email_id=1, provider_uid="abc", classification=result)
    assert action == "deleted"
    mock_provider.trash_email.assert_called_once_with("abc")
    mock_db.classify_email.assert_called_once_with(1, "marketing", 5, "deleted")
    mock_db.log_action.assert_called_once()


def test_cleaner_trashes_low_notification(mock_db, mock_provider):
    cleaner = Cleaner(mock_db, mock_provider)
    result = ClassificationResult("notification", 15)
    action = cleaner.act(email_id=1, provider_uid="abc", classification=result)
    assert action == "deleted"


def test_cleaner_keeps_personal(mock_db, mock_provider):
    cleaner = Cleaner(mock_db, mock_provider)
    result = ClassificationResult("personal", 80)
    action = cleaner.act(email_id=1, provider_uid="abc", classification=result)
    assert action == "kept"
    mock_provider.trash_email.assert_not_called()


def test_cleaner_keeps_work(mock_db, mock_provider):
    cleaner = Cleaner(mock_db, mock_provider)
    result = ClassificationResult("work", 85)
    action = cleaner.act(email_id=1, provider_uid="abc", classification=result)
    assert action == "kept"


def test_cleaner_keeps_high_notification(mock_db, mock_provider):
    cleaner = Cleaner(mock_db, mock_provider)
    result = ClassificationResult("notification", 40)
    action = cleaner.act(email_id=1, provider_uid="abc", classification=result)
    assert action == "kept"


def test_cataloger_processes_batch(mock_db):
    mock_db.get_unprocessed_ambiguous.return_value = [
        {"id": 1, "subject": "Test", "sender": "a@b.com", "snippet": "hi",
         "has_unsubscribe": False, "provider_uid": "u1", "sender_domain": "b.com",
         "date": "2026-01-01", "raw_headers": "{}"},
    ]
    mock_llm = MagicMock()
    mock_llm.classify.return_value = ClassificationResult("personal", 75)
    mock_provider = MagicMock()
    mock_provider.trash_email.return_value = True

    cataloger = Cataloger(mock_db, mock_llm, mock_provider)
    stats = cataloger.process_ambiguous()
    assert stats["processed"] == 1
    assert stats["kept"] == 1
