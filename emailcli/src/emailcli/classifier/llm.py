import json
from dataclasses import dataclass
from pydantic import BaseModel

from ollama import chat

from emailcli.providers.base import EmailMessage

VALID_CATEGORIES = {"marketing", "transactional", "personal", "work", "notification"}

SYSTEM_PROMPT = """You are an email classifier. Given an email's subject, sender, and snippet, classify it.

Return JSON with exactly two fields:
- "category": one of "marketing", "transactional", "personal", "work", "notification"
- "priority_score": integer 0-100 (100 = most urgent/important)

Scoring guide:
- 90-100: needs urgent response (time-sensitive, from known contacts asking for something)
- 60-89: important, should read soon (work updates, personal messages)
- 30-59: informational, no urgency (receipts, confirmations, FYI)
- 0-29: near-junk but not marketing (automated notifications, social media alerts)

Respond with ONLY the JSON object, no extra text."""


class EmailClassification(BaseModel):
    category: str
    priority_score: int


@dataclass
class ClassificationResult:
    category: str
    priority_score: int


class LLMClassifier:
    def __init__(self, model: str = "llama3.1:8b"):
        self.model = model

    def classify(self, email: EmailMessage) -> ClassificationResult:
        try:
            prompt = (
                f"Subject: {email.subject}\n"
                f"From: {email.sender}\n"
                f"Snippet: {email.snippet}\n"
                f"Has Unsubscribe Header: {email.has_unsubscribe}"
            )
            response = chat(
                model=self.model,
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": prompt},
                ],
                format=EmailClassification.model_json_schema(),
                options={"temperature": 0},
            )
            result = EmailClassification.model_validate_json(response.message.content)
            if result.category not in VALID_CATEGORIES:
                return ClassificationResult("ambiguous", 50)
            score = max(0, min(100, result.priority_score))
            return ClassificationResult(result.category, score)
        except Exception:
            return ClassificationResult("ambiguous", 50)
