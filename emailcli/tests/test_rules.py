import pytest
from emailcli.classifier.rules import RulesClassifier, ClassificationResult
from emailcli.providers.base import EmailMessage
from emailcli.config import RulesConfig


@pytest.fixture
def classifier():
    return RulesClassifier(RulesConfig())


def make_email(**kwargs) -> EmailMessage:
    defaults = dict(
        provider_uid="1", subject="Hello", sender="user@example.com",
        sender_domain="example.com", date="2026-01-01", snippet="Hi",
        has_unsubscribe=False, raw_headers="{}",
    )
    defaults.update(kwargs)
    return EmailMessage(**defaults)


def test_unsubscribe_header_is_marketing(classifier):
    email = make_email(has_unsubscribe=True, sender="news@random.com", sender_domain="random.com")
    result = classifier.classify(email)
    assert result.category == "marketing"


def test_known_marketing_domain(classifier):
    email = make_email(sender_domain="mailchimp.com", sender="mc@mailchimp.com")
    result = classifier.classify(email)
    assert result.category == "marketing"


def test_marketing_keyword_in_subject(classifier):
    email = make_email(subject="Promoção especial de verão!")
    result = classifier.classify(email)
    assert result.category == "marketing"


def test_noreply_is_notification(classifier):
    email = make_email(sender="noreply@github.com", sender_domain="github.com")
    result = classifier.classify(email)
    assert result.category == "notification"


def test_personal_email(classifier):
    email = make_email(sender="maria@gmail.com", sender_domain="gmail.com")
    result = classifier.classify(email)
    assert result.category == "personal"


def test_ambiguous_when_unclear(classifier):
    email = make_email(sender="support@someapp.io", sender_domain="someapp.io")
    result = classifier.classify(email)
    assert result.category == "ambiguous"


def test_extra_marketing_domains(classifier):
    classifier.config.extra_marketing_domains = ["custom-spam.com"]
    email = make_email(sender_domain="custom-spam.com", sender="x@custom-spam.com")
    result = classifier.classify(email)
    assert result.category == "marketing"


def test_marketing_score_is_5(classifier):
    email = make_email(has_unsubscribe=True, sender="x@y.com", sender_domain="y.com")
    result = classifier.classify(email)
    assert result.priority_score == 5


def test_personal_score_is_80(classifier):
    email = make_email(sender="friend@gmail.com", sender_domain="gmail.com")
    result = classifier.classify(email)
    assert result.priority_score == 80


def test_notification_score_is_25(classifier):
    email = make_email(sender="no-reply@service.com", sender_domain="service.com")
    result = classifier.classify(email)
    assert result.priority_score == 25
