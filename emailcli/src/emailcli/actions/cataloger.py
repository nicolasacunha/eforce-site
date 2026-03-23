from emailcli.db import Database
from emailcli.classifier.llm import LLMClassifier
from emailcli.actions.cleaner import Cleaner
from emailcli.providers.base import EmailMessage


class Cataloger:
    def __init__(self, db: Database, llm: LLMClassifier, provider):
        self.db = db
        self.llm = llm
        self.cleaner = Cleaner(db, provider)

    def process_ambiguous(self) -> dict:
        ambiguous = self.db.get_unprocessed_ambiguous()
        stats = {"processed": 0, "kept": 0, "deleted": 0}
        for row in ambiguous:
            email_msg = EmailMessage(
                provider_uid=row["provider_uid"],
                subject=row.get("subject", ""),
                sender=row.get("sender", ""),
                sender_domain=row.get("sender_domain", ""),
                date=row.get("date", ""),
                snippet=row.get("snippet", ""),
                has_unsubscribe=bool(row.get("has_unsubscribe", False)),
                raw_headers=row.get("raw_headers", "{}"),
            )
            classification = self.llm.classify(email_msg)
            action = self.cleaner.act(row["id"], row["provider_uid"], classification)
            stats["processed"] += 1
            if action == "kept":
                stats["kept"] += 1
            else:
                stats["deleted"] += 1
        return stats
