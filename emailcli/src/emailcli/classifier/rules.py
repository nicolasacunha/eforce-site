import re
from dataclasses import dataclass

from emailcli.config import RulesConfig
from emailcli.providers.base import EmailMessage

KNOWN_MARKETING_DOMAINS = {
    "mailchimp.com", "sendgrid.net", "sendgrid.com", "mailgun.com",
    "constantcontact.com", "campaign-archive.com", "list-manage.com",
    "hubspot.com", "hubspotemail.net", "marketo.com", "pardot.com",
    "salesforce.com", "klaviyo.com", "brevo.com", "sendinblue.com",
    "mailjet.com", "getresponse.com", "aweber.com", "drip.com",
    "convertkit.com", "activecampaign.com", "omnisend.com",
    "emarsys.com", "iterable.com", "customer.io",
}

MARKETING_KEYWORDS = {
    "unsubscribe", "newsletter", "promotion", "promo", "sale", "discount",
    "deal", "offer", "limited time", "act now", "buy now", "free trial",
    "exclusive offer",
    "promoção", "oferta", "desconto", "liquidação", "newsletter",
    "cadastre-se", "aproveite", "compre agora", "frete grátis",
    "tempo limitado", "oferta exclusiva",
}

NOREPLY_PATTERNS = {"noreply", "no-reply", "no_reply", "mailer-daemon", "donotreply", "do-not-reply"}

PERSONAL_DOMAINS = {
    "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com",
    "me.com", "mac.com", "protonmail.com", "proton.me", "live.com",
    "aol.com", "uol.com.br", "bol.com.br", "terra.com.br",
}


@dataclass
class ClassificationResult:
    category: str
    priority_score: int


CATEGORY_SCORES = {
    "marketing": 5,
    "transactional": 35,
    "personal": 80,
    "work": 85,
    "notification": 25,
    "ambiguous": 50,
}


class RulesClassifier:
    def __init__(self, config: RulesConfig):
        self.config = config

    def classify(self, email: EmailMessage) -> ClassificationResult:
        if email.has_unsubscribe:
            return ClassificationResult("marketing", CATEGORY_SCORES["marketing"])
        all_marketing = KNOWN_MARKETING_DOMAINS | set(self.config.extra_marketing_domains)
        if email.sender_domain in all_marketing:
            return ClassificationResult("marketing", CATEGORY_SCORES["marketing"])
        subject_lower = email.subject.lower()
        all_keywords = MARKETING_KEYWORDS | set(k.lower() for k in self.config.extra_keywords)
        for kw in all_keywords:
            if kw in subject_lower:
                return ClassificationResult("marketing", CATEGORY_SCORES["marketing"])
        sender_lower = email.sender.lower()
        for pattern in NOREPLY_PATTERNS:
            if pattern in sender_lower:
                return ClassificationResult("notification", CATEGORY_SCORES["notification"])
        if email.sender_domain in PERSONAL_DOMAINS:
            return ClassificationResult("personal", CATEGORY_SCORES["personal"])
        return ClassificationResult("ambiguous", CATEGORY_SCORES["ambiguous"])
