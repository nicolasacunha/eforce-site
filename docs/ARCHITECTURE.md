# ARCHITECTURE.md

> Last updated: 2026-03-23 · Primary contact: Nicolas Cunha

---

## 1. Project Structure

```
EForce/
├── eforce-site/                        # React marketing site for E-Force drums
│   ├── src/
│   │   ├── main.tsx                    # App entry point (HelmetProvider)
│   │   ├── App.tsx                     # Router + i18n path-based routing
│   │   ├── i18n.ts                     # i18next config (en, pt, es, it, zh)
│   │   ├── index.css                   # Global styles
│   │   ├── components/
│   │   │   ├── layout/                 # Navbar, Footer, SEO, Sidebar, SidebarModelList
│   │   │   ├── home/                   # HeroSection, ProductShowcase, ManifestoSection,
│   │   │   │                           # VideoSection, OderyStory, SocialProof,
│   │   │   │                           # FinishShowcase, TechPillars, ProductPreview, DealerCTA
│   │   │   ├── product/               # ProductHero, FinishSelector, TechTabs, SpecTable,
│   │   │   │                           # StickyContextBar, CompareModels, InTheBox
│   │   │   ├── line/                   # Product line/catalog components
│   │   │   └── ui/                     # ScrollReveal, HoverVideoCard, scroll-expansion-hero,
│   │   │                               # Overlay, product-card
│   │   ├── pages/                      # HomePage, LinePage, ProductDetailPage, StoryPage,
│   │   │                               # TechnologyPage, DealersPage, SupportPage, NewsPage,
│   │   │                               # NotFoundPage
│   │   ├── data/
│   │   │   └── products.ts            # Static product database (7 kits)
│   │   ├── hooks/
│   │   │   └── useScrollReveal.ts     # Scroll animation hook
│   │   ├── lib/
│   │   │   └── utils.ts              # Utility functions
│   │   ├── locales/                   # Translation files (en, pt, es, it, zh)
│   │   └── assets/                    # Static images and videos
│   ├── public/
│   │   └── assets/
│   │       ├── images/kits/           # Product photos by model
│   │       ├── images/brand/          # Logos
│   │       └── video/hero-loop.mp4    # Hero background video
│   ├── vite.config.ts                 # Path alias @/ → ./src, Tailwind plugin
│   ├── tsconfig.json                  # Multi-ref TS config
│   ├── vercel.json                    # SPA rewrite rules
│   └── package.json
│
├── emailcli/                           # Python email management CLI + MCP server
│   ├── src/emailcli/
│   │   ├── cli.py                     # Typer CLI (scan, accounts, status)
│   │   ├── config.py                  # TOML config loader
│   │   ├── db.py                      # SQLite database (WAL mode)
│   │   ├── mcp_server.py             # FastMCP server for AI assistants
│   │   ├── providers/
│   │   │   ├── base.py               # EmailProvider protocol + EmailMessage dataclass
│   │   │   ├── gmail.py              # Gmail API (OAuth2)
│   │   │   └── icloud.py            # iCloud IMAP (Keychain auth)
│   │   ├── classifier/
│   │   │   ├── rules.py              # Deterministic rules classifier
│   │   │   └── llm.py               # Ollama LLM classifier (Pydantic output)
│   │   └── actions/
│   │       ├── cleaner.py            # Auto-trash marketing/low-priority
│   │       └── cataloger.py          # LLM reclassification of ambiguous emails
│   ├── tests/                         # pytest suite (9 test modules)
│   └── pyproject.toml                # Package config, deps, entry points
│
├── proto-porsche/                      # Static HTML design prototype (reference only)
├── FOTOS/                              # Product photography (10 sets)
├── LOGOS/                              # Brand logo assets
├── render mau/                         # Product render images
├── PROMPT-DESIGN-SYSTEM.md            # Mandatory design guidelines
├── .mcp.json                          # MCP server registration
└── .gitignore
```

---

## 2. High-Level System Diagram

```
┌─────────────────────────────────────────────────────────┐
│                         USERS                            │
│        (Consumers, Dealers, Drummers)                    │
└──────────────┬──────────────────────┬───────────────────┘
               │                      │
               ▼                      ▼
┌──────────────────────┐  ┌──────────────────────────────┐
│    eforce-site       │  │        emailcli              │
│    (Frontend)        │  │        (CLI/Backend)         │
│                      │  │                              │
│  React 19 + Vite     │  │  Python 3.11 + Typer        │
│  Tailwind CSS        │  │  SQLite + Ollama            │
│  i18next (5 langs)   │  │  MCP Server (FastMCP)       │
│  Framer Motion       │  │                              │
└──────────┬───────────┘  └──────┬───────────┬───────────┘
           │                     │           │
           ▼                     ▼           ▼
┌──────────────────┐  ┌─────────────┐  ┌──────────────┐
│     Vercel       │  │  Gmail API  │  │ iCloud IMAP  │
│   (CDN/Hosting)  │  │  (OAuth2)   │  │ (Keychain)   │
└──────────────────┘  └─────────────┘  └──────────────┘
                             │
                             ▼
                      ┌──────────────┐
                      │   Ollama     │
                      │ (Local LLM)  │
                      │ llama3.1:8b  │
                      └──────────────┘
```

The two projects are **independent** — no shared backend, database, or API. eforce-site is a static marketing site. emailcli is a local automation tool.

---

## 3. Core Components

### eforce-site — Product Showcase Website

| Component | Purpose | Tech | Deployment |
|-----------|---------|------|------------|
| React SPA | Marketing site for E-Force electronic drums | React 19, TypeScript, Vite | Vercel (SPA rewrite) |
| i18n Layer | 5-language support (en, pt, es, it, zh) | i18next, path-based routing (/:lang/*) | Static JSON files |
| Product Data | 7 drum kits with specs, finishes, gallery | Static TypeScript module (data/products.ts) | Bundled at build |
| Animation System | Scroll reveals, page transitions | Framer Motion, AnimatePresence | Client-side |
| SEO | Per-page meta tags, OG images, canonicals | react-helmet-async | Server-rendered by Vercel |

### emailcli — Email Management CLI

| Component | Purpose | Tech | Deployment |
|-----------|---------|------|------------|
| CLI | User-facing commands (scan, accounts, status) | Typer 0.9.0, Rich 13.0.0 | Local binary via pip |
| Rules Classifier | Fast deterministic email categorization | Domain/keyword/header heuristics | In-process |
| LLM Classifier | ML-powered classification for ambiguous emails | Ollama 0.4.0, Pydantic 2.0 | Local HTTP (port 11434) |
| Cleaner | Auto-trash marketing/low-priority | Score-based deletion rules | In-process |
| Cataloger | LLM reclassification of ambiguous emails | Ollama + Pydantic structured output | In-process |
| MCP Server | AI assistant integration (resources + tools) | FastMCP 1.0.0 | Local process |
| Providers | Gmail API + iCloud IMAP adapters | google-api-python-client, imaplib | In-process |

---

## 4. Data Stores

### eforce-site

**No database.** All product data is a static TypeScript module:

```typescript
// data/products.ts — 7 products
interface Product {
  slug: string;           // URL identifier (ef2-v1, ef6-cafe, etc.)
  name: string;
  price: number;
  tagline: string;
  module: "F10" | "F50"; // Sound module type
  finishes: Finish[];    // Color/material options
  specs: Spec[];         // Technical specifications
  gallery: string[];     // Image paths
  techTabs: TechTab[];   // Feature tabs
  inTheBox: string[];    // Included items
}
```

### emailcli

**SQLite 3** (WAL journaling mode):

| Table | Purpose | Key Columns |
|-------|---------|-------------|
| `accounts` | Registered email accounts | provider, email, credentials_path, last_sync |
| `emails` | Fetched and classified emails | subject, sender, sender_domain, category, priority_score, has_unsubscribe, action_taken |
| `actions_log` | Audit trail of all actions | email_id, action (delete/categorize/reclassify), reason, timestamp |

**Indexes**: category, priority_score, account_id, date

**Location**: `~/.config/emailcli/emails.db`

**Categories**: marketing, transactional, personal, work, notification, ambiguous

**Priority scores**: 0-100 (marketing=5, transactional=35, notification=25, ambiguous=50, personal=80, work=85)

---

## 5. External Integrations

| Service | Project | Purpose | Auth Method |
|---------|---------|---------|-------------|
| **Vercel** | eforce-site | Hosting, CDN, SPA routing | Deploy token (CI) |
| **Gmail API** | emailcli | Fetch/trash emails | OAuth2 (InstalledAppFlow), scope: gmail.modify |
| **iCloud IMAP** | emailcli | Fetch/trash emails | App password via system Keychain |
| **Ollama** | emailcli | Local LLM inference (llama3.1:8b) | None (localhost:11434) |
| **Google Fonts** | eforce-site | Typography (preloaded in index.html) | None (CDN) |

---

## 6. Deployment & Infrastructure

### eforce-site

| Aspect | Detail |
|--------|--------|
| **Provider** | Vercel |
| **Project** | prj_m8zrhkIfx6Hv9b3nU8svI5b8ckar |
| **Build** | `tsc -b && vite build` |
| **Output** | `dist/` (static files) |
| **Routing** | SPA rewrite: all paths → `/index.html` |
| **CI/CD** | Auto-deploy on push to main |
| **CDN** | Vercel Edge Network |
| **Monitoring** | Vercel Analytics (built-in) |

### emailcli

| Aspect | Detail |
|--------|--------|
| **Provider** | Local machine only |
| **Install** | `pip install -e ".[dev]"` |
| **Entry points** | `emailcli` (CLI), `emailcli-mcp` (MCP server) |
| **Data** | `~/.config/emailcli/` |
| **No remote deployment** | Runs locally, no containerization |

---

## 7. Security Considerations

| Area | Implementation |
|------|----------------|
| **Gmail Auth** | OAuth2 with offline refresh tokens. Tokens stored at `~/.config/emailcli/tokens/{email}.json`. Scope limited to `gmail.modify`. |
| **iCloud Auth** | App-specific password stored in OS Keychain (macOS Keychain, Linux Secret Service). Never stored in plaintext files. |
| **Database** | SQLite with WAL mode. No encryption at rest. Local filesystem permissions only. |
| **MCP Server** | Runs locally only (stdin/stdout transport). No network exposure. |
| **Frontend** | No auth, no user data, no forms. Static content only. |
| **Secrets** | No secrets in source code. OAuth client secrets in token files (gitignored). Keychain for iCloud. |
| **HTTPS** | Enforced by Vercel for eforce-site. IMAP uses TLS (port 993). Gmail API uses HTTPS. |

---

## 8. Development & Testing

### eforce-site

```bash
npm install          # Install dependencies
npm run dev          # Dev server (http://localhost:5173)
npm run build        # Production build (tsc + vite)
npm run lint         # ESLint
npm run preview      # Preview production build
```

**No test framework configured.** Linting via ESLint with React hooks and refresh rules.

**TypeScript**: Strict mode enabled (strict: true, noUnusedLocals, noUnusedParameters).

### emailcli

```bash
cd emailcli
python -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"
pytest tests/                        # Full test suite
emailcli scan                        # Run email scan
emailcli accounts list               # List accounts
emailcli status                      # Email statistics
emailcli-mcp                         # Start MCP server
```

**Test framework**: pytest 7.0.0 with 9 test modules:

| Test File | Coverage |
|-----------|----------|
| test_db.py | Schema, CRUD, indexes, transactions |
| test_rules.py | Rules classifier heuristics |
| test_llm.py | LLM classifier, Pydantic validation, fallback |
| test_gmail.py | OAuth2 flow, token refresh |
| test_icloud.py | IMAP connection, header parsing |
| test_actions.py | Cleaner/Cataloger logic |
| test_mcp_server.py | MCP resources and tools |
| test_integration.py | End-to-end pipeline |

**Code quality**: No linter configured for Python (no ruff/flake8/mypy in deps).

---

## 9. Future Considerations

### Known Technical Debt

- **eforce-site**: All product data is hardcoded in `data/products.ts`. No CMS or API for content management. Adding products requires code changes.
- **emailcli**: No async/concurrent email processing — emails are fetched and classified sequentially. Ollama must be running locally.
- **Monorepo**: No shared workspace config (no npm workspaces, no turborepo). Projects are fully independent.

### Planned Migrations

- None currently documented.

### Roadmap Items

- **eforce-site**: E-commerce integration, dealer locator with live data, product comparison tool.
- **emailcli**: Containerized Ollama, async processing, email recovery UI, additional providers (Outlook, ProtonMail).

---

## 10. Glossary

| Term | Definition |
|------|-----------|
| **E-Force** | Electronic drum kit product line by Odery Drums |
| **F10 / F50** | Sound module tiers. F10 = entry-level, F50 = flagship |
| **EF2, EF5, EF6, EF7** | Drum kit model series (2-piece through 7-piece configurations) |
| **MCP** | Model Context Protocol — standard for AI assistant tool integration |
| **FastMCP** | Python framework for building MCP servers |
| **Ollama** | Local LLM inference server (runs models like llama3.1 on local hardware) |
| **WAL** | Write-Ahead Logging — SQLite journaling mode for concurrent read/write |
| **GEO** | Generative Engine Optimization — SEO for AI-powered search |
| **Cleaner** | emailcli action that auto-trashes marketing/low-priority emails |
| **Cataloger** | emailcli action that uses LLM to reclassify ambiguous emails |

---

## 11. Project Identification

| Field | Value |
|-------|-------|
| **Project name** | EForce |
| **Repository** | Local git (no remote configured) |
| **Primary contact** | Nicolas Cunha |
| **Last updated** | 2026-03-23 |
| **Sub-projects** | eforce-site (React), emailcli (Python) |
