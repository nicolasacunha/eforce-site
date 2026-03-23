import pytest
from unittest.mock import MagicMock, patch
from emailcli.db import Database
from emailcli.config import RulesConfig
from emailcli.classifier.rules import RulesClassifier
from emailcli.classifier.llm import LLMClassifier
from emailcli.actions.cleaner import Cleaner
from emailcli.actions.cataloger import Cataloger
from emailcli.providers.base import EmailMessage


@pytest.fixture
def db(tmp_path):
    return Database(str(tmp_path / "test.db"))


def test_full_pipeline(db):
    """End-to-end: fetch -> classify -> clean -> catalog."""
    db.add_account("gmail", "test@gmail.com", "/p")
    acc = db.get_account("test@gmail.com")

    emails = [
        EmailMessage("m1", "50% OFF Sale!", "promo@store.com", "store.com", "2026-03-23", "Buy now", True, "{}"),
        EmailMessage("m2", "Meeting at 3pm", "alice@gmail.com", "gmail.com", "2026-03-23", "See you", False, "{}"),
        EmailMessage("m3", "Your order shipped", "noreply@amazon.com", "amazon.com", "2026-03-23", "Track", False, "{}"),
        EmailMessage("m4", "Partnership proposal", "ceo@startup.io", "startup.io", "2026-03-23", "Hi there", False, "{}"),
    ]

    mock_provider = MagicMock()
    mock_provider.trash_email.return_value = True

    rules = RulesClassifier(RulesConfig())

    # Phase 1: Rules classification
    for em in emails:
        eid = db.upsert_email(acc["id"], em.provider_uid, em.subject, em.sender,
                              em.sender_domain, em.date, em.snippet, em.has_unsubscribe, em.raw_headers)
        result = rules.classify(em)
        if result.category == "ambiguous":
            db.classify_email(eid, "ambiguous", 50, None)
        else:
            cleaner = Cleaner(db, mock_provider)
            cleaner.act(eid, em.provider_uid, result)

    # m1 (marketing) should be deleted
    assert db.get_email(1)["action_taken"] == "deleted"
    # m2 (personal) should be kept
    assert db.get_email(2)["action_taken"] == "kept"
    # m3 (notification/noreply) should be kept (score 25 > 20)
    assert db.get_email(3)["action_taken"] == "kept"
    # m4 (ambiguous) should be unprocessed
    assert db.get_email(4)["action_taken"] is None

    # Phase 2: LLM processes ambiguous
    mock_llm = MagicMock(spec=LLMClassifier)
    from emailcli.classifier.rules import ClassificationResult
    mock_llm.classify.return_value = ClassificationResult("work", 85)

    cataloger = Cataloger(db, mock_llm, mock_provider)
    stats = cataloger.process_ambiguous()
    assert stats["processed"] == 1
    assert db.get_email(4)["category"] == "work"
    assert db.get_email(4)["action_taken"] == "kept"

    # Verify summary
    summary = db.get_summary()
    assert summary["total"] == 4
    assert summary["by_action"]["deleted"] == 1
    assert summary["by_action"]["kept"] == 3

    # Verify priority emails
    priority = db.get_priority_emails(min_score=60)
    subjects = {e["subject"] for e in priority}
    assert "Meeting at 3pm" in subjects
    assert "Partnership proposal" in subjects
    assert "50% OFF Sale!" not in subjects

    # Verify search
    results = db.search_emails("meeting")
    assert len(results) == 1
