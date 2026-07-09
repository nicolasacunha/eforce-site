# Blog auto-atualizável do E-Force — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Um blog PT+EN sobre bateria eletrônica no site do E-Force que se atualiza sozinho toda semana via rotina do Claude Code, renderizado como HTML estático (gerador de build) para SEO/GEO, funilando para os kits.

**Architecture:** O site é um SPA Vite/React pesado em shaders — o blog NÃO entra no React. Posts em markdown (`content/{pt,en}/news/*.md`) → um gerador Node (`postbuild`) emite HTML estático em `dist/<lang>/news/…`, servido direto pela Vercel (ganha do rewrite SPA). Uma trava determinística valida os posts no build. Deploy por git.

**Tech Stack:** Node ESM (`.mjs`) scripts, `gray-matter` (frontmatter) + `marked` (md→HTML) como devDeps, Vite (build → `dist/`), Vercel (git-linked, team scope). O app React em si quase não é tocado.

## Global Constraints

- **Idiomas: PT + EN.** Todo post existe em `content/pt/news/<slug>.md` E `content/en/news/<slug>.md` (mesmo slug → par hreflang). Os outros 4 idiomas do site (it, de, zh, es) NÃO recebem posts.
- **Marcas: só Odery, E-Force, Bronz.** Qualquer outra marca de bateria (acústica OU eletrônica: Roland, Alesis, ATV, 2box, Yamaha, Pearl, Tama, Millenium, Donner, Zildjian, Sabian, Meinl, RMV, Nagano…) reprova o post.
- **Sem preço/prazo/promessa/garantia** no corpo.
- **Anti-AI-slop** (proibido: advérbio inflado, "não é X, é Y", "Aqui está"/"A verdade é", "confira", "jornada", "ecossistema", pontuação dramática, listas de 3 por estética). Voz E-Force: bateria eletrônica, tecnologia (mesh, módulo, resposta, latência, gravação) — não acústica.
- **Byline:** `Nicolas Cunha`.
- **Links internos:** ≥3 por post, para rotas reais `/<lang>/kits/ef2-v1`, `/<lang>/kits/ef2-v2`, `/<lang>/technology`, `/<lang>/support`, `/<lang>/story`.
- **Domínio de produção:** `https://eforcedrums.com`. Cores da marca: fundo `#0a0a0a`, laranja `#ff4a1c`.
- **Sem framework de teste** no projeto: verificação por script Node + inspeção do HTML gerado. O validador tem teste próprio via fixtures.
- **Não tocar** no app React de shaders (three.js, framer-motion, rotas existentes) além da única mudança prevista na Task 6 (link "Novidades" + redirect defensivo da NewsPage).
- **Commit por task** (Conventional Commits PT-BR).

---

## FASE 1 — Gerador estático + rotas + semente

### Task 1: Dependências + leitura/validação de forma dos posts

**Files:**
- Modify: `package.json` (devDeps `gray-matter`, `marked`)
- Create: `scripts/lib-posts.mjs` (helper compartilhado: descobre e lê posts)

**Interfaces:**
- Produces:
  - `POSTS_DIR(lang)` → caminho absoluto de `content/<lang>/news` resolvido pelo dir do script (cwd-independente).
  - `listPostFiles(lang): string[]` — nomes `.md` em `content/<lang>/news`, exclui `_*`.
  - `readPost(lang, file): { data, body, slug }` — gray-matter parse; `slug` = nome do arquivo sem `.md`.
  - `LANGS = ["pt","en"]`.

- [ ] **Step 1: Instalar deps**

```bash
cd "/Users/nicolascunha/Projects/Business/irbis/02 - Projetos/Odery Drums/EForce/eforce-site"
npm install -D gray-matter marked
```

- [ ] **Step 2: Criar `scripts/lib-posts.mjs`**

```js
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..");
export const LANGS = ["pt", "en"];

export function postsDir(lang) {
  return path.join(ROOT, "content", lang, "news");
}

export function listPostFiles(lang) {
  const dir = postsDir(lang);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"));
}

export function readPost(lang, file) {
  const raw = fs.readFileSync(path.join(postsDir(lang), file), "utf8");
  const { data, content } = matter(raw);
  return { data, body: content.trim(), slug: file.replace(/\.md$/, "") };
}
```

- [ ] **Step 3: Criar diretórios de conteúdo com um post de fumaça PT+EN**

```bash
mkdir -p content/pt/news content/en/news content/dados
for L in pt en; do
cat > "content/$L/news/smoke.md" <<EOF
---
slug: smoke
lang: $L
type: post
title: "Smoke"
description: "Post de fumaça para validar o gerador. Não vai a produção (draft)."
publishedAt: "2026-07-08"
draft: true
---
Corpo de teste com um link /$L/kits/ef2-v1 para o gerador processar.
EOF
done
```

- [ ] **Step 4: Verificar leitura**

Run: `node -e "import('./scripts/lib-posts.mjs').then(m=>console.log(m.LANGS.map(l=>m.listPostFiles(l))))"`
Expected: imprime `[ [ 'smoke.md' ], [ 'smoke.md' ] ]`.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json scripts/lib-posts.mjs content/pt/news/smoke.md content/en/news/smoke.md
git commit -m "feat(blog): deps (gray-matter, marked) e leitor de posts"
```

---

### Task 2: Gerador estático (template E-Force + SEO/GEO)

**Files:**
- Create: `scripts/blog-template.mjs` (template HTML + JSON-LD)
- Create: `scripts/gera-blog.mjs` (orquestra: lê posts → escreve HTML/sitemap/RSS)

**Interfaces:**
- Consumes: `lib-posts.mjs` (Task 1), `marked`.
- Produces: executável `node scripts/gera-blog.mjs [outDir]` (default `dist`). Escreve:
  - `<out>/<lang>/news/index.html` (índice)
  - `<out>/<lang>/news/<slug>/index.html` (post)
  - `<out>/sitemap-blog.xml`, `<out>/<lang>/news/feed.xml`
  Pula `draft: true` quando `process.env.NODE_ENV === "production"`; sempre pula `_*`.

- [ ] **Step 1: Template**

Criar `scripts/blog-template.mjs`. Exporta `renderPost({lang, slug, data, html, related})` e `renderIndex({lang, posts})`. HTML completo (`<!doctype html>`), tema E-Force (fundo `#0a0a0a`, texto claro, laranja `#ff4a1c`), `<head>` com `<title>`, meta description, canonical `https://eforcedrums.com/<lang>/news/<slug>/`, **hreflang pt/en/x-default**, Open Graph, e **JSON-LD** `BlogPosting` + `FAQPage` (se `data.faq`) + `BreadcrumbList`. Cabeçalho com link `<a href="/<lang>/">E-FORCE</a>` (âncora normal → volta ao SPA), corpo do artigo, FAQ em `<details>`, e um bloco "kits" linkando `relatedProducts`. Rodapé mínimo. Código completo:

```js
import { marked } from "marked";

const BASE = "https://eforcedrums.com";
const OG = "/assets/images/brand/eforce-og-image.webp";

function esc(s = "") {
  return String(s).replace(/[<>&"']/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&#39;" })[c]);
}

function head({ lang, slug, data, isIndex }) {
  const pathSeg = isIndex ? `/${lang}/news/` : `/${lang}/news/${slug}/`;
  const url = `${BASE}${pathSeg}`;
  const other = lang === "pt" ? "en" : "pt";
  const otherUrl = isIndex ? `${BASE}/${other}/news/` : `${BASE}/${other}/news/${slug}/`;
  const jsonld = isIndex ? [] : [{
    "@context": "https://schema.org", "@type": "BlogPosting",
    headline: data.title, description: data.description,
    datePublished: data.publishedAt, dateModified: data.updatedAt ?? data.publishedAt,
    author: { "@type": "Person", name: data.author ?? "Nicolas Cunha" },
    publisher: { "@type": "Organization", name: "E-Force" },
    mainEntityOfPage: url,
  }, {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Novidades", item: `${BASE}/${lang}/news/` },
      { "@type": "ListItem", position: 2, name: data.title, item: url },
    ],
  }];
  if (!isIndex && Array.isArray(data.faq) && data.faq.length) {
    jsonld.push({ "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: data.faq.map((f) => ({ "@type": "Question", name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a } })) });
  }
  return `<!doctype html><html lang="${lang}"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(data.title)} | E-Force</title>
<meta name="description" content="${esc(data.description)}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="${lang}" href="${url}">
<link rel="alternate" hreflang="${other}" href="${otherUrl}">
<link rel="alternate" hreflang="x-default" href="${url}">
<meta property="og:type" content="article"><meta property="og:title" content="${esc(data.title)}">
<meta property="og:description" content="${esc(data.description)}"><meta property="og:url" content="${url}">
<meta property="og:image" content="${BASE}${OG}">
${jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join("")}
<style>
:root{--bg:#0a0a0a;--fg:#ececec;--muted:rgba(255,255,255,.55);--orange:#ff4a1c;--line:rgba(255,255,255,.12)}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.7}
a{color:var(--orange);text-decoration:none}a:hover{text-decoration:underline}
.wrap{max-width:44rem;margin:0 auto;padding:2rem 1.25rem 5rem}
.top{max-width:44rem;margin:0 auto;padding:1.25rem;display:flex;justify-content:space-between;border-bottom:1px solid var(--line)}
.brand{font-weight:800;letter-spacing:.08em;color:#fff}
h1{font-size:clamp(1.9rem,4vw,2.9rem);line-height:1.08;margin:.4rem 0 .6rem;color:#fff}
h2{font-size:1.4rem;margin:2.4rem 0 .8rem;color:#fff}
.meta{color:var(--muted);font-size:.85rem;margin-bottom:2rem}
.eyebrow{color:var(--orange);font-size:.72rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase}
.prose p{margin:1.1rem 0}.prose img{max-width:100%;border-radius:6px}
details{border:1px solid var(--line);border-radius:6px;margin:.6rem 0;padding:.4rem .9rem}
summary{cursor:pointer;font-weight:700;color:#fff;padding:.5rem 0}
.related{margin-top:3rem;border-top:1px solid var(--line);padding-top:1.5rem}
.related a{display:inline-block;border:1px solid var(--line);border-radius:999px;padding:.5rem 1rem;margin:.3rem .3rem 0 0;color:#fff}
.card{display:block;border:1px solid var(--line);border-radius:8px;padding:1.1rem 1.25rem;margin:1rem 0;color:#fff}
.card:hover{border-color:var(--orange);text-decoration:none}.card small{color:var(--muted)}
</style></head><body>
<div class="top"><a class="brand" href="/${lang}/">E-FORCE</a><a href="/${lang}/news/">Novidades</a></div>`;
}

const foot = `</body></html>`;

export function renderPost({ lang, slug, data, html, related }) {
  const relBlock = related?.length
    ? `<div class="related"><span class="eyebrow">Kits E-Force</span><div>${related
        .map((r) => `<a href="/${lang}/kits/${r}">${esc(r)}</a>`).join("")}</div></div>`
    : "";
  const faqBlock = Array.isArray(data.faq) && data.faq.length
    ? `<h2>FAQ</h2>${data.faq.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("")}`
    : "";
  return head({ lang, slug, data, isIndex: false }) +
    `<article class="wrap"><span class="eyebrow">Novidades</span>
<h1>${esc(data.title)}</h1><p class="meta">${esc(data.publishedAt)} · ${esc(data.author ?? "Nicolas Cunha")}</p>
<div class="prose">${html}</div>${faqBlock}${relBlock}</article>` + foot;
}

export function renderIndex({ lang, posts }) {
  const data = {
    title: lang === "pt" ? "Novidades" : "News",
    description: lang === "pt"
      ? "Guias e conhecimento sobre bateria eletrônica, tecnologia e gravação."
      : "Guides and know-how on electronic drums, technology and recording.",
  };
  const cards = posts.map((p) =>
    `<a class="card" href="/${lang}/news/${p.slug}/"><strong>${esc(p.data.title)}</strong><br><small>${esc(p.data.publishedAt)}</small><br>${esc(p.data.description)}</a>`
  ).join("");
  return head({ lang, slug: "", data, isIndex: true }) +
    `<main class="wrap"><span class="eyebrow">${lang === "pt" ? "Novidades" : "News"}</span>
<h1>${esc(data.title)}</h1><p class="meta">${esc(data.description)}</p>${cards}</main>` + foot;
}
```

- [ ] **Step 2: Gerador**

Criar `scripts/gera-blog.mjs`:

```js
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { LANGS, listPostFiles, readPost } from "./lib-posts.mjs";
import { renderIndex, renderPost } from "./blog-template.mjs";

const OUT = path.resolve(process.argv[2] ?? "dist");
const isProd = process.env.NODE_ENV === "production";

function write(rel, content) {
  const full = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
}

let total = 0;
const sitemap = [];
for (const lang of LANGS) {
  const posts = listPostFiles(lang)
    .map((f) => readPost(lang, f))
    .filter((p) => !(isProd && p.data.draft))
    .sort((a, b) => String(b.data.publishedAt).localeCompare(String(a.data.publishedAt)));

  for (const p of posts) {
    const html = marked.parse(p.body);
    write(`${lang}/news/${p.slug}/index.html`,
      renderPost({ lang, slug: p.slug, data: p.data, html, related: p.data.relatedProducts ?? [] }));
    sitemap.push(`https://eforcedrums.com/${lang}/news/${p.slug}/`);
    total++;
  }
  write(`${lang}/news/index.html`, renderIndex({ lang, posts }));
  sitemap.push(`https://eforcedrums.com/${lang}/news/`);

  const items = posts.map((p) =>
    `<item><title>${p.data.title.replace(/[<&]/g, "")}</title><link>https://eforcedrums.com/${lang}/news/${p.slug}/</link><pubDate>${new Date(p.data.publishedAt).toUTCString()}</pubDate></item>`).join("");
  write(`${lang}/news/feed.xml`,
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>E-Force — ${lang === "pt" ? "Novidades" : "News"}</title><link>https://eforcedrums.com/${lang}/news/</link><description>Bateria eletrônica.</description>${items}</channel></rss>`);
}
write("sitemap-blog.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemap.map((u) => `<url><loc>${u}</loc></url>`).join("")}</urlset>`);
console.log(`gera-blog: ${total} post(s) em ${LANGS.length} idioma(s) → ${OUT}`);
```

- [ ] **Step 3: Testar o gerador num dir temporário (com o post de fumaça, NODE_ENV != production → inclui draft)**

Run: `node scripts/gera-blog.mjs /tmp/blogtest && find /tmp/blogtest -name '*.html' | sort`
Expected: gera `pt/news/index.html`, `pt/news/smoke/index.html`, `en/news/index.html`, `en/news/smoke/index.html`. Conferir que um post tem `BlogPosting` e `hreflang`:
`grep -l BlogPosting /tmp/blogtest/pt/news/smoke/index.html && grep -c 'hreflang' /tmp/blogtest/pt/news/smoke/index.html`

- [ ] **Step 4: Commit**

```bash
git add scripts/blog-template.mjs scripts/gera-blog.mjs
git commit -m "feat(blog): gerador estático (template E-Force + JSON-LD + hreflang + sitemap/RSS)"
```

---

### Task 3: Wire no build + post-semente PT+EN

**Files:**
- Modify: `package.json` (script `blog` + `postbuild`)
- Create: `content/pt/news/mesh-vs-borracha-resposta.md`, `content/en/news/mesh-vs-borracha-resposta.md`
- Delete: `content/pt/news/smoke.md`, `content/en/news/smoke.md`

- [ ] **Step 1: package.json**

Adicionar em `scripts`: `"blog": "node scripts/gera-blog.mjs"` e `"postbuild": "node scripts/gera-blog.mjs"`. (O `build` do E-Force é `tsc -b && vite build`; `postbuild` roda automático depois via npm lifecycle, escrevendo em `dist/`.)

- [ ] **Step 2: Escrever o post-semente (PT e EN, mesmo slug)**

`content/pt/news/mesh-vs-borracha-resposta.md` e a versão EN. Frontmatter completo (title, description 120–160, publishedAt "2026-07-08", author "Nicolas Cunha", keywords, faq ≥3, `relatedProducts: [ef2-v1, ef2-v2]`, `draft: false`). Corpo evergreen ~900–1200 palavras sobre pads mesh vs borracha (resposta, silêncio, sensação, durabilidade) — voz E-Force (eletrônica/tecnologia), ≥3 links internos markdown para `/pt/kits/ef2-v1`, `/pt/kits/ef2-v2`, `/pt/technology` (e as versões `/en/...` no arquivo EN). Só nomeia Odery/E-Force/Bronz; sem preço/promessa. Anti-AI-slop.

- [ ] **Step 3: Remover o post de fumaça**

```bash
rm content/pt/news/smoke.md content/en/news/smoke.md
```

- [ ] **Step 4: Build completo + verificação**

Run: `rm -rf dist && npm run build`
Expected: vite build OK; `postbuild` roda; conferir:
- `ls dist/pt/news/index.html dist/en/news/index.html`
- `ls dist/pt/news/mesh-vs-borracha-resposta/index.html`
- `grep -c BlogPosting dist/pt/news/mesh-vs-borracha-resposta/index.html` ≥1
- links internos apontam pra rotas que existem no site (`/pt/kits/ef2-v1` etc.)

- [ ] **Step 5: Commit**

```bash
git add package.json content/pt/news content/en/news
git commit -m "content(blog): gerador no postbuild + post-semente PT/EN (mesh vs borracha)"
```

---

## FASE 2 — Trava, rotina e deploy git

### Task 4: Listas de marcas + validador `valida-post.mjs`

**Files:**
- Create: `content/dados/marcas-permitidas.txt`, `content/dados/marcas-banidas.txt`
- Create: `scripts/valida-post.mjs`, `scripts/valida-post.test.mjs`

**Interfaces:**
- Produces: `validatePost(raw, { banned })` → array de erros (vazio = ok); `loadBanned(dir?)`; CLI `node scripts/valida-post.mjs <arquivo.md>` (exit 1 se erro).

- [ ] **Step 1: Listas**

```bash
printf 'Odery\nE-Force\nEForce\nBronz\n' > content/dados/marcas-permitidas.txt
cat > content/dados/marcas-banidas.txt <<'EOF'
Roland
Alesis
ATV
2box
Yamaha
Millenium
Donner
Carlsbro
Nux
Pearl
Tama
DW
Gretsch
Ludwig
Mapex
Sonor
Zildjian
Sabian
Meinl
Paiste
RMV
Nagano
Turbo
Vogga
EOF
```

- [ ] **Step 2: Validador** (`scripts/valida-post.mjs`) — porta do Odery, com o regex de link interno aceitando PT e EN (`\]\(/(pt|en)/`). Checa: `type=post`; campos obrigatórios (title, description, publishedAt); description 120–160; corpo ≥600 palavras; ≥3 links internos `](/(pt|en)/`; ≥3 itens de `faq`; marca banida (whole-word, case-insensitive) no title+description+body; preço/promessa (`/R\$\s*\d|\b\d+\s*dias\b|garantia de|grátis|desconto|promoção/i`); resíduo de importação (`/&#\d+;|Continue reading/i`). `loadBanned` resolve o path pelo dir do script (cwd-independente). Código completo:

```js
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_DADOS = path.resolve(SCRIPT_DIR, "../content/dados");
const DIRTY = /&#\d+;|&[a-z]+;|Continue reading|" \/>/i;
const PRICE = /R\$\s*\d|\b\d+\s*dias\b|garantia de|\bgrátis\b|\bdesconto\b|\bpromoção\b/i;

export function loadBanned(dir = DEFAULT_DADOS) {
  return fs.readFileSync(path.join(dir, "marcas-banidas.txt"), "utf8")
    .split("\n").map((s) => s.trim()).filter(Boolean);
}

export function validatePost(raw, { banned }) {
  const errs = [];
  const { data, content } = matter(raw);
  const body = content.trim();
  const text = `${data.title ?? ""} ${data.description ?? ""} ${body}`;
  if (data.type !== "post") errs.push('type deve ser "post"');
  for (const f of ["title", "description", "publishedAt"])
    if (!data[f]) errs.push(`frontmatter: ${f} ausente`);
  const desc = String(data.description ?? "");
  if (desc.length < 120 || desc.length > 160) errs.push(`description ${desc.length} chars (esperado 120–160)`);
  const words = body ? body.split(/\s+/).length : 0;
  if (words < 600) errs.push(`corpo ${words} palavras (mínimo 600)`);
  const internal = (body.match(/\]\(\/(pt|en)\//g) ?? []).length;
  if (internal < 3) errs.push(`${internal} links internos (mínimo 3)`);
  const faq = Array.isArray(data.faq) ? data.faq.length : 0;
  if (faq < 3) errs.push(`${faq} itens de FAQ (mínimo 3)`);
  for (const b of banned) {
    const re = new RegExp(`\\b${b.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
    if (re.test(text)) errs.push(`marca proibida: ${b}`);
  }
  if (PRICE.test(text)) errs.push("preço/promessa/garantia (proibido)");
  if (DIRTY.test(text)) errs.push("resíduo de importação");
  return errs;
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isMain) {
  const file = process.argv[2];
  if (!file) { console.error("uso: node scripts/valida-post.mjs <arquivo.md>"); process.exit(2); }
  const errs = validatePost(fs.readFileSync(file, "utf8"), { banned: loadBanned() });
  if (errs.length) { console.error(`REPROVADO (${file}):`); errs.forEach((e) => console.error("  - " + e)); process.exit(1); }
  console.log(`OK: ${file}`); process.exit(0);
}
```

- [ ] **Step 3: Teste de fixtures** (`scripts/valida-post.test.mjs`): post bom passa (0 erros); posts ruins (com "Roland", com "R$ 2.000", corpo curto) falham pelo motivo certo.

```js
import assert from "node:assert";
import { validatePost } from "./valida-post.mjs";
const banned = ["Roland", "Alesis"];
const bom = `---\ntype: post\ntitle: X\ndescription: ${"a".repeat(140)}\npublishedAt: "2026-07-08"\nfaq:\n  - q: a\n    a: b\n  - q: c\n    a: d\n  - q: e\n    a: f\n---\n${"palavra ".repeat(620)}\n[a](/pt/kits/ef2-v1) [b](/en/technology) [c](/pt/kits/ef2-v2)`;
assert.equal(validatePost(bom, { banned }).length, 0, "post bom passa");
assert.ok(validatePost(bom.replace("palavra", "Roland"), { banned }).some((e) => /Roland/.test(e)), "pega marca");
assert.ok(validatePost(bom + " R$ 2.000", { banned }).some((e) => /preço/.test(e)), "pega preço");
assert.ok(validatePost(bom.replace(("palavra ".repeat(620)), "curto"), { banned }).some((e) => /palavras/.test(e)), "pega corpo curto");
console.log("todos os casos ok");
```

- [ ] **Step 4: Verificar** — `node scripts/valida-post.test.mjs` → "todos os casos ok"; e o post-semente PT e EN passam:
`node scripts/valida-post.mjs content/pt/news/mesh-vs-borracha-resposta.md` e o `en`. Se um seed falhar, NÃO edite o post — reporte (calibração do validador vs conteúdo aceito).

- [ ] **Step 5: Commit**

```bash
git add content/dados/marcas-*.txt scripts/valida-post.mjs scripts/valida-post.test.mjs
git commit -m "feat(blog): trava de validação (allowlist de marcas incl. eletrônicas, preço, qualidade)"
```

---

### Task 5: Gate no build (prebuild)

**Files:**
- Create: `scripts/valida-todos-posts.mjs`
- Modify: `package.json` (`validate:posts` + `prebuild`)

- [ ] **Step 1: Runner** (`scripts/valida-todos-posts.mjs`): usa `LANGS`/`listPostFiles`/`readPost` do `lib-posts.mjs` para varrer `content/{pt,en}/news/*.md`, pula `draft: true` e `_*` (já filtrado por `listPostFiles`), roda `validatePost` em cada (com `loadBanned()`), agrega, `exit 1` se algum erro.

```js
import fs from "node:fs";
import path from "node:path";
import { LANGS, postsDir, listPostFiles } from "./lib-posts.mjs";
import { validatePost, loadBanned } from "./valida-post.mjs";
import matter from "gray-matter";

const banned = loadBanned();
let checked = 0, failed = 0;
for (const lang of LANGS) {
  for (const file of listPostFiles(lang)) {
    const full = path.join(postsDir(lang), file);
    const raw = fs.readFileSync(full, "utf8");
    if (matter(raw).data.draft === true) continue;
    const errs = validatePost(raw, { banned });
    checked++;
    if (errs.length) { failed++; console.error(`REPROVADO ${lang}/${file}:`); errs.forEach((e) => console.error("  - " + e)); }
  }
}
console.log(`${checked} verificado(s), ${failed} reprovado(s)`);
process.exit(failed ? 1 : 0);
```

- [ ] **Step 2: package.json** — adicionar `"validate:posts": "node scripts/valida-todos-posts.mjs"` e `"prebuild": "node scripts/valida-todos-posts.mjs"`.

- [ ] **Step 3: Verificar** — `npm run validate:posts` (2 seeds passam); prova negativa: criar `content/pt/news/ruim.md` (não-draft, com "Roland" e corpo curto), `npm run build` deve FALHAR no prebuild; remover o arquivo. Confirmar `npm run build` completo passa (prebuild valida → vite build → postbuild gera blog).

- [ ] **Step 4: Commit**

```bash
git add scripts/valida-todos-posts.mjs package.json
git commit -m "feat(blog): valida posts no build (prebuild) — reprovado não sobe"
```

---

### Task 6: Menu "Novidades" aponta para o blog estático

**Files:**
- Modify: `src/components/layout/Navbar.tsx` (e `Footer.tsx` se tiver link de news) — trocar o `<Link to=".../news">` por `<a href="/<lang>/news/">` (âncora normal → carrega o HTML estático, não a rota client).
- Modify: `src/pages/NewsPage.tsx` — redirect defensivo: se alguém chegar client-side, `window.location.replace('/<lang>/news/')`.

**Interfaces:**
- Consumes: nada de tasks anteriores; é integração com o app React.

- [ ] **Step 1: Localizar os links de news no React**

Run: `grep -rn "news" src/components/layout/`
Anotar onde o link "Novidades" é um `<Link to>` do react-router.

- [ ] **Step 2: Trocar por âncora** — onde o navbar/rodapé linka news, usar `<a href={\`/${lang}/news/\`}>` (mantendo classes/estilo). Isso força full-load → serve o estático.

- [ ] **Step 3: Redirect defensivo na NewsPage** — substituir o corpo de `NewsPage.tsx` por um componente que no mount faz `window.location.replace(\`/${lang}/news/\`)` (com um `useParams` pra pegar `lang`; fallback 'pt'). Assim, se a rota React `news` for atingida por navegação client, ela hard-carrega o estático.

```tsx
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function NewsPage() {
  const { lang } = useParams<{ lang: string }>();
  useEffect(() => {
    window.location.replace(`/${lang ?? 'pt'}/news/`);
  }, [lang]);
  return null;
}
```

- [ ] **Step 4: Verificar** — `npm run build` OK (tsc + vite). Manual: `npm run preview`, abrir `/pt/`, clicar "Novidades" → carrega a página estática de blog (não o stub). Conferir no dist que o estático existe e o navbar usa `<a href>`.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout src/pages/NewsPage.tsx
git commit -m "feat(blog): menu Novidades aponta para o blog estático (âncora + redirect defensivo)"
```

---

### Task 7: Guia da rotina, backlog e prompt colável

**Files:**
- Create: `docs/BLOG-ROTINA.md`, `content/pt/news/_backlog.md`

- [ ] **Step 1: `_backlog.md`** — 12–18 temas evergreen de bateria eletrônica ancorados (afinação/ajuste de trigger, latência e módulo, gravar direto do módulo via USB/MIDI, mesh vs borracha [feito], escolher pedal de bumbo eletrônico, tocar de madrugada sem incomodar, integrar com DAW, cuidar dos pads, etc.). Marcar o seed `[x]`. Prefixo `_` → ignorado pelo validador.

- [ ] **Step 2: `docs/BLOG-ROTINA.md`** — (a) voz/regras (as Global Constraints acima, em prosa); (b) frontmatter de exemplo válido + slugs de kit reais (`ef2-v1`, `ef2-v2`) e rotas de link interno; (c) **prompt colável**: a cada semana — ler backlog+posts+guia → escolher tema → pesquisar (sources) → escrever `content/pt/news/<slug>.md` E `content/en/news/<slug>.md` → rodar `node scripts/valida-post.mjs` nos DOIS → se passar: `draft:false`, marca backlog, `git commit`+`push` na `main` (publica via Vercel) → se reprovar (após 2 correções): `draft:true`, branch `rascunho/blog-<data>`, push, e reporta os erros. Regras moram no repo; prompt só aponta.

- [ ] **Step 3: Verificar** — `npm run validate:posts` ainda exit 0 (backlog ignorado por `_`).

- [ ] **Step 4: Commit**

```bash
git add docs/BLOG-ROTINA.md content/pt/news/_backlog.md
git commit -m "docs(blog): guia da rotina, backlog e prompt colável"
```

---

### Task 8: Deploy por git (build command + validação)

**Files:** config na Vercel (projeto `eforce-site`, team scope) — sem arquivo no repo.

- [ ] **Step 1: Build command** — no projeto Vercel `eforce-site`, Settings → Build: Build Command = `npm run build` (garante `prebuild` valida + `postbuild` gera o blog). Framework fica **Vite** (output `dist/` já é estático — diferente do Odery, NÃO precisa mudar framework; os arquivos `dist/<lang>/news/` são servidos direto).

- [ ] **Step 2: Validar build remoto num preview** — push um branch de teste; confirmar no preview: `/pt/news/` 200, `/pt/news/<slug>/` 200, JSON-LD no HTML, hreflang, e que o SPA (home, kits) continua funcionando (o rewrite `/(.*)→/index.html` não engole os estáticos de news). Se algo falhar, diagnosticar antes do merge.

- [ ] **Step 3: Registrar** — anotar o resultado (git-deploy OK) no handoff.

---

## Self-review (preenchido)

- **Cobertura da spec:** gerador (T2), rotas+wire (T3), template/SEO/hreflang/JSON-LD/sitemap/RSS (T2), PT+EN (T1/T3/T5/T7), semente (T3), trava+allowlist eletrônica (T4), gate no build (T5), integração do menu (T6), guia+backlog+prompt (T7), deploy git (T8). ✔
- **Não tocar no app de shaders:** só T6 mexe no React (link + redirect), como a spec permite. ✔
- **cwd-independência** dos scripts (lib-posts, valida-post) para o build remoto/rotina. ✔
- **Sem placeholders de código:** gerador, template, validador, runner e o redirect da NewsPage têm código completo. ✔
- **Dependência entre tasks:** T5/T7 consomem `lib-posts`/`valida-post` de T1/T4 — sinalizado nos Interfaces. ✔
