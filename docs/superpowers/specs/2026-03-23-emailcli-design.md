# EmailCLI — Design Spec

**Date:** 2026-03-23
**Status:** Approved

## Overview

Python CLI that connects to 2 Gmail accounts + 1 iCloud account, automatically cleans marketing/junk emails using deterministic rules + local Ollama LLM, catalogs remaining emails by priority, and exposes everything via MCP server for Claude Code integration.

## Goals

- **Zero-cost AI classification** — Ollama (Llama 3.1 8B) runs locally, no API fees
- **Full autonomy** — No confirmations, no dry-runs. CLI acts proactively and logs everything
- **Claude Code integration** — MCP server exposes prioritized emails for conversational access

## Architecture

**Approach:** CLI + MCP server as two entry points in one Python package, sharing a SQLite database as the bridge.

- `emailcli` — CLI that fetches, classifies, cleans, and catalogs
- `emailcli-mcp` — MCP server (stdio) that reads from SQLite and exposes data to Claude Code

```
Gmail API ──┐                    ┌── CLI (typer)
             ├── Providers ──▶ Pipeline ──▶ SQLite ◀── MCP Server
IMAP (iCloud)┘    (fetch)     (classify     (cache/    (read/expose)
                               + act)       catalog)
```

## Project Structure

```
emailcli/
├── pyproject.toml
├── src/
│   └── emailcli/
│       ├── __init__.py
│       ├── cli.py              # Typer CLI entry point
│       ├── mcp_server.py       # MCP server entry point
│       ├── db.py               # SQLite schema + queries
│       ├── config.py           # Account configs, credential paths
│       ├── providers/
│       │   ├── base.py         # Provider Protocol (interface)
│       │   ├── gmail.py        # Gmail API via OAuth2
│       │   └── icloud.py       # iCloud via IMAP + app password
│       ├── classifier/
│       │   ├── rules.py        # Deterministic rules engine
│       │   └── llm.py          # Ollama client for ambiguous emails
│       └── actions/
│           ├── cleaner.py      # Delete/archive logic
│           └── cataloger.py    # Prioritization and categorization
└── tests/                      # Future tests
```

## Data Model

### accounts
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PK | Auto-increment |
| provider | TEXT | "gmail" or "icloud" |
| email | TEXT UNIQUE | Email address |
| credentials_path | TEXT | Path to token/config |
| last_sync | DATETIME | Last successful sync timestamp |

### emails
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PK | Auto-increment |
| account_id | INTEGER FK | References accounts.id |
| provider_uid | TEXT | Provider-specific message ID |

Table constraint: `UNIQUE(account_id, provider_uid)` — prevents duplicate emails per account.
| subject | TEXT | Email subject |
| sender | TEXT | Full sender (name + email) |
| sender_domain | TEXT | Extracted domain |
| date | DATETIME | Email date |
| snippet | TEXT | First ~200 chars of body |
| category | TEXT | marketing/transactional/personal/work/notification/ambiguous |
| priority_score | INTEGER | 0-100 |
| has_unsubscribe | BOOLEAN | Has List-Unsubscribe header |
| raw_headers | TEXT | JSON of select headers |
| processed_at | DATETIME | When classified |
| action_taken | TEXT | kept/deleted/archived |

### actions_log
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PK | Auto-increment |
| email_id | INTEGER FK | References emails.id |
| action | TEXT | delete/archive/categorize |
| reason | TEXT | Why action was taken |
| timestamp | DATETIME | When action occurred |

## Categories and Priority

**Categories:**
- `marketing` — newsletters, promos → auto-delete
- `transactional` — receipts, confirmations → keep, low priority
- `personal` — direct emails from people → keep, high priority
- `work` — professional emails → keep, high priority
- `notification` — app/service alerts → keep unless score < 20
- `ambiguous` — sent to Ollama for classification

**Priority score (0-100):**
- 90-100: needs urgent response
- 60-89: important, read soon
- 30-59: informational, no urgency
- 0-29: near-junk, but not marketing

**Default scores by category (rules engine):**
- `marketing` → 5 (will be deleted anyway)
- `transactional` → 35
- `personal` → 80
- `work` → 85
- `notification` → 25
- LLM-classified emails get their score from Ollama directly

**Safety rules:** Emails classified as `personal` or `work` are never auto-deleted regardless of score.

## Classification Pipeline

```
Fetch new emails (Gmail API / IMAP)
        │
        ▼
  Deterministic rules (fast, free)
        │
        ├── Header List-Unsubscribe? → marketing
        ├── Known marketing domain? → marketing
        │   (hardcoded list + user-configurable in config.toml)
        ├── Keywords in subject (EN+PT: promo, oferta, sale, newsletter, etc)? → marketing
        ├── Sender is real person? → personal/work
        │   (heuristic: no "noreply/no-reply/mailer-daemon" in address,
        │    AND sender domain is not in known-services list)
        └── Rest → ambiguous
        │
        ▼
  Ambiguous → Ollama (Llama 3.1 8B)
        │
        └── Prompt: classify into category + priority_score
        │
        ▼
  Automatic actions
        ├── marketing → TRASH on provider (Gmail: messages.trash(), IMAP: move to Trash)
        ├── notification with score < 20 → TRASH on provider
        └── rest → keep on provider, save to SQLite with category + score
        │
        Note: ALL emails (including trashed) are recorded in SQLite with action_taken field
        │
        ▼
  Log everything to actions_log
```

**First run:** Fetches last 30 days. Subsequent runs: only new emails since last_sync.

**Batching:** Processes emails in batches of 50. Gmail API calls are paginated with exponential backoff on rate limit errors (429). IMAP fetches use SINCE filter.

**Ollama fallback:** If Ollama is unreachable, ambiguous emails are kept with category `ambiguous` and score 50. They will be reclassified on next scan if Ollama is available.

**Error handling:** Provider connection failures are logged and skipped (scan continues with other accounts). Individual email processing errors are logged, email is skipped, and retried on next scan.

## Authentication

### Gmail (2 accounts)
- OAuth2 via `google-auth-oauthlib`
- `emailcli accounts add gmail` opens browser for authorization
- Token stored at `~/.config/emailcli/tokens/gmail-{email}.json`
- Scope: `gmail.modify` (read + delete, no send)
- Automatic token refresh

### iCloud (1 account)
- IMAP with app-specific password (required with 2FA)
- `emailcli accounts add icloud` prompts for email + app password
- Credentials stored encrypted via `keyring` (macOS Keychain)
- Server: `imap.mail.me.com:993` SSL

### Security
- No plaintext passwords on disk
- Gmail: OAuth tokens (revocable at myaccount.google.com)
- iCloud: app password in macOS Keychain (biometric-protected)
- Config at `~/.config/emailcli/config.toml` — metadata only, no secrets

## MCP Server

### Resources (read-only)
- `emails://summary` — Overview: X urgent, Y to respond, Z informational per account
- `emails://priority` — Emails with score > 60, sorted by priority
- `emails://account/{email}` — Emails for a specific account
- `emails://recent-actions` — Log of recent actions (deleted/kept)

### Tools (actions)
- `search_emails(query, account?, category?)` — Search by subject/sender text
- `get_email(id)` — Full details of an email
- `categorize_email(id, category, priority)` — Manual reclassification
- `trigger_scan(account?)` — Trigger a fresh scan (synchronous, blocks until complete, returns summary of actions taken)

### Configuration
Protocol: stdio. Claude Code config:
```json
{
  "mcpServers": {
    "emailcli": {
      "command": "emailcli-mcp"
    }
  }
}
```

## CLI Commands

- `emailcli scan` — Fetch, classify, clean, catalog
- `emailcli status` — Show current state summary
- `emailcli accounts add [gmail|icloud]` — Add account
- `emailcli accounts list` — List configured accounts
- `emailcli accounts remove {email}` — Remove account and its data
- `emailcli-mcp` — Start MCP server

## Dependencies

```toml
dependencies = [
    "typer",
    "rich",
    "google-api-python-client",
    "google-auth-oauthlib",
    "keyring",
    "ollama",
    "mcp",
]
```

Requires Python 3.11+ and Ollama installed separately (`brew install ollama`).

Note: iCloud IMAP uses Python's stdlib `imaplib`, config parsing uses stdlib `tomllib` (3.11+) — no extra deps needed.

**Platform:** macOS only (Keychain integration, Ollama via Homebrew).

## Operational Notes

- **SQLite concurrency:** WAL mode enabled to allow CLI writes and MCP server reads simultaneously
- **Logging:** `rich` console output during interactive use. File log at `~/.config/emailcli/emailcli.log` (rotating, 5MB max)
- **Config schema (`~/.config/emailcli/config.toml`):**
  ```toml
  [general]
  db_path = "~/.config/emailcli/emails.db"
  ollama_model = "llama3.1:8b"
  scan_days_initial = 30
  batch_size = 50

  [rules]
  extra_marketing_domains = ["example-newsletter.com"]
  extra_keywords = ["liquidação"]

  [retention]
  prune_after_days = 90  # delete SQLite records older than this
  ```

**Auto-unsubscribe:** Out of scope. Using `List-Unsubscribe` automatically risks confirming addresses to spammers. The header is used only as a classification signal.
