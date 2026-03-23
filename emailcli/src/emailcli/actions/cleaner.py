from emailcli.classifier.rules import ClassificationResult
from emailcli.db import Database

SAFE_CATEGORIES = {"personal", "work"}
NOTIFICATION_DELETE_THRESHOLD = 20


class Cleaner:
    def __init__(self, db: Database, provider):
        self.db = db
        self.provider = provider

    def act(self, email_id: int, provider_uid: str, classification: ClassificationResult) -> str:
        category = classification.category
        score = classification.priority_score
        should_delete = False
        reason = ""
        if category == "marketing":
            should_delete = True
            reason = "marketing email"
        elif category == "notification" and score < NOTIFICATION_DELETE_THRESHOLD:
            should_delete = True
            reason = f"low-priority notification (score={score})"
        if category in SAFE_CATEGORIES:
            should_delete = False
        if should_delete:
            self.provider.trash_email(provider_uid)
            self.db.classify_email(email_id, category, score, "deleted")
            self.db.log_action(email_id, "delete", reason)
            return "deleted"
        else:
            self.db.classify_email(email_id, category, score, "kept")
            self.db.log_action(email_id, "categorize", f"kept as {category} (score={score})")
            return "kept"
