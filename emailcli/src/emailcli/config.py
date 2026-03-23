import tomllib
from dataclasses import dataclass, field
from pathlib import Path

CONFIG_DIR = Path.home() / ".config" / "emailcli"
CONFIG_FILE = CONFIG_DIR / "config.toml"
TOKENS_DIR = CONFIG_DIR / "tokens"
DB_PATH = CONFIG_DIR / "emails.db"
LOG_PATH = CONFIG_DIR / "emailcli.log"


@dataclass
class GeneralConfig:
    db_path: str = str(DB_PATH)
    ollama_model: str = "llama3.1:8b"
    scan_days_initial: int = 30
    batch_size: int = 50


@dataclass
class RulesConfig:
    extra_marketing_domains: list[str] = field(default_factory=list)
    extra_keywords: list[str] = field(default_factory=list)


@dataclass
class RetentionConfig:
    prune_after_days: int = 90


@dataclass
class AppConfig:
    general: GeneralConfig = field(default_factory=GeneralConfig)
    rules: RulesConfig = field(default_factory=RulesConfig)
    retention: RetentionConfig = field(default_factory=RetentionConfig)


def load_config() -> AppConfig:
    """Load config from TOML file, falling back to defaults."""
    config = AppConfig()
    if CONFIG_FILE.exists():
        with open(CONFIG_FILE, "rb") as f:
            data = tomllib.load(f)
        if "general" in data:
            for k, v in data["general"].items():
                if hasattr(config.general, k):
                    setattr(config.general, k, v)
        if "rules" in data:
            for k, v in data["rules"].items():
                if hasattr(config.rules, k):
                    setattr(config.rules, k, v)
        if "retention" in data:
            for k, v in data["retention"].items():
                if hasattr(config.retention, k):
                    setattr(config.retention, k, v)
    return config


def ensure_dirs():
    """Create config directories if they don't exist."""
    CONFIG_DIR.mkdir(parents=True, exist_ok=True)
    TOKENS_DIR.mkdir(parents=True, exist_ok=True)
