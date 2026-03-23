import pytest
from unittest.mock import patch, MagicMock
from emailcli.classifier.llm import LLMClassifier, ClassificationResult
from emailcli.providers.base import EmailMessage


def make_email(**kwargs) -> EmailMessage:
    defaults = dict(
        provider_uid="1", subject="Hello", sender="user@example.com",
        sender_domain="example.com", date="2026-01-01", snippet="Hi there",
        has_unsubscribe=False, raw_headers="{}",
    )
    defaults.update(kwargs)
    return EmailMessage(**defaults)


@patch("emailcli.classifier.llm.chat")
def test_classify_returns_result(mock_chat):
    mock_response = MagicMock()
    mock_response.message.content = '{"category": "personal", "priority_score": 75}'
    mock_chat.return_value = mock_response
    classifier = LLMClassifier(model="llama3.1:8b")
    result = classifier.classify(make_email())
    assert result.category == "personal"
    assert result.priority_score == 75


@patch("emailcli.classifier.llm.chat")
def test_classify_invalid_category_returns_ambiguous(mock_chat):
    mock_response = MagicMock()
    mock_response.message.content = '{"category": "invalid", "priority_score": 50}'
    mock_chat.return_value = mock_response
    classifier = LLMClassifier(model="llama3.1:8b")
    result = classifier.classify(make_email())
    assert result.category == "ambiguous"


@patch("emailcli.classifier.llm.chat", side_effect=Exception("Connection refused"))
def test_classify_ollama_down_returns_fallback(mock_chat):
    classifier = LLMClassifier(model="llama3.1:8b")
    result = classifier.classify(make_email())
    assert result.category == "ambiguous"
    assert result.priority_score == 50
