# Blog auto-atualizável — E-Force (design)

**Data:** 08/jul/2026 · **Repo:** `eforce-site` (Vite + React + React Router SPA, i18next 6 idiomas, Vercel team scope). Segue o blog do Odery já entregue; o que muda é a stack (SPA → precisa de HTML estático gerado no build) e o idioma (PT + EN).

## Objetivo

Um blog sobre bateria eletrônica e tecnologia de percussão no site do E-Force que se atualiza sozinho toda semana (rotina do Claude Code), para SEO e citação por IAs de busca. Valor primário: descoberta — o visitante cai direto num post vindo do Google/IA e é funilado para os kits.

## Princípios

Herdados do blog do Odery (valem iguais):
1. **Publicação automática com trava de segurança** (passou → publica; falhou → rascunho + aviso).
2. **Evergreen ancorado + radar de tendências** — atemporal, amarrado aos produtos reais do E-Force.
3. **Backlog híbrido** (fila priorizada + descoberta).
4. **Allowlist de marcas: só Odery, E-Force, Bronz.** Qualquer outra marca de bateria/pad/módulo reprova.
5. **Perfil baixo na navegação** (o menu já tem "Novidades"/news; sem inflar) **+ links internos fortes** para os kits.
6. **Regras no repo; prompt da rotina curto** apontando pra elas.
7. **Deploy por git** (E-Force já em Vercel+GitHub).
8. **Anti-AI-slop** em cada post; byline **Nicolas Cunha**; sem preço/promessa/garantia.

Decididos para o E-Force (brainstorm 08/jul):
9. **Idiomas: PT + EN.** Os 6 idiomas do site permanecem na interface; o blog sai só em PT e EN. A rotina escreve cada post nos dois.
10. **Renderização: gerador estático separado.** O blog NÃO faz parte do app React (que é pesado em three.js/shaders/framer-motion e quebraria em SSG). Um script de build transforma markdown em HTML estático, servido direto pela Vercel.

## Arquitetura

### Conteúdo & rotas

- Posts em markdown: `content/pt/news/<slug>.md` e `content/en/news/<slug>.md` (mesmo slug nos dois idiomas → par hreflang).
- Frontmatter (mesmo schema do Odery): `slug`, `lang`, `type: post`, `title`, `description` (120–160), `publishedAt`, `updatedAt?`, `cover?`, `keywords[]`, `faq[{q,a}]`, `relatedProducts[]` (slugs de kit reais), `author` (default "Nicolas Cunha"), `sources[]`, `draft`.
- Rotas geradas (estáticas):
  - `/<lang>/news/` — índice (substitui a `NewsPage` "coming soon"; o menu já rotula como "Novidades").
  - `/<lang>/news/<slug>/` — post.
- URLs seguem o padrão `/:lang/...` do site (react-router usa `/pt`, `/en`).

### O gerador (`scripts/gera-blog.mjs`)

Roda no `postbuild` (depois do `vite build`, que produz `dist/`):
1. Lê `content/{pt,en}/news/*.md` (gray-matter), pula `draft: true` em produção e arquivos `_*`.
2. Aplica um template HTML com a identidade do E-Force (fundo escuro `#0a0a0a`, laranja `#ff4a1c`, tipografia do site) — cabeçalho/rodapé simples que remetem ao site, corpo do artigo, FAQ, bloco de kits relacionados.
3. Injeta no HTML inicial: `<title>`, meta description, **JSON-LD BlogPosting + FAQPage + BreadcrumbList**, **hreflang** PT↔EN (+ x-default), Open Graph.
4. Escreve os arquivos em `dist/<lang>/news/index.html` e `dist/<lang>/news/<slug>/index.html`.
5. Gera/atualiza `dist/sitemap.xml` (as URLs de blog) e um RSS `dist/<lang>/news/feed.xml`.

Como são arquivos estáticos em `dist/`, a Vercel os serve antes do rewrite `/(.*) → /index.html` do SPA (filesystem tem precedência sobre rewrite). O app React de shaders nunca é envolvido.

### Ancoragem real

Links internos apontam para rotas/produtos que existem: `/<lang>/kits/ef2-v1`, `/<lang>/kits/ef2-v2`, `/<lang>/technology`, `/<lang>/support`, `/<lang>/story`. Voz: bateria eletrônica e tecnologia (mesh, módulo, resposta, latência, gravação) — não bateria acústica. Só nomeia Odery/E-Force/Bronz.

### Navegação

- O item "Novidades" (news) já existe no menu e aponta para `/<lang>/news` — vira o índice do blog. Sem novo item de menu.

## Trava de segurança

`scripts/valida-post.mjs` (portado do Odery), determinístico, `exit 1` na reprovação; roda na rotina e no `prebuild`:
- **Marcas**: só Odery/E-Force/Bronz; lista banida (Pearl, Tama, Yamaha, Roland, Alesis, ATV, 2box, Zildjian, Sabian, Meinl, RMV, Nagano… — inclui as marcas de bateria ELETRÔNICA, que são concorrentes diretos do E-Force) reprova.
- **Sem preço/promessa/garantia.**
- **Qualidade**: ≥600 palavras, ≥3 links internos `/<lang>/...`, FAQ ≥3, description 120–160, sem resíduo de importação.
- **Consistência**: `relatedProducts` batem com os slugs reais (`ef2-v1`, `ef2-v2`).

Lista banida em `content/dados/marcas-banidas.txt`; allowlist em `content/dados/marcas-permitidas.txt`.

## A rotina semanal

Prompt colável em `docs/BLOG-ROTINA.md` (guia de voz/regras + o bloco). A cada execução: lê o backlog (`content/pt/news/_backlog.md`) + posts existentes + o guia → escolhe o tema (ou descobre) → pesquisa (fontes, registra em `sources`) → escreve **PT e EN** (`content/pt/news/<slug>.md` e `content/en/news/<slug>.md`) → roda `valida-post.mjs` nos dois → se passar: `draft: false`, marca o backlog, `git commit` + `git push` na `main` (publica via Vercel) → se reprovar (após 2 correções): `draft: true`, branch `rascunho/blog-<data>`, push, e avisa o que falhou.

## Deploy por git

E-Force já é git-linked na Vercel (team scope, `eforce-site`, produção = `main`). Ajuste único: **build command = `npm run build`** (o `build` do E-Force é `tsc -b && vite build`; encadear `prebuild` = validador e `postbuild` = gerador). Como o framework é Vite (output `dist/` já é estático puro), NÃO precisa da mudança de framework que o Odery exigiu — os arquivos de `dist/<lang>/news/` são servidos direto. Validar o build remoto num preview antes do merge.

## Fases de entrega (commit por fase)

- **F1 — Gerador + rotas + semente.** `scripts/gera-blog.mjs`, template HTML do E-Force, camada SEO/GEO (JSON-LD, hreflang, sitemap, RSS), índice `/news`, e **1 post-semente PT+EN escrito à mão** (ancorado em ef2-v1/ef2-v2).
- **F2 — Trava + rotina + deploy git.** `valida-post.mjs` + `valida-todos-posts.mjs` no build, listas de marcas, `docs/BLOG-ROTINA.md` + `_backlog.md`, setup do build command e validação do git deploy, prompt colável.

## Fora de escopo

- Blog nos outros 4 idiomas (it, de, zh, es) — só interface, sem posts.
- Qualquer alteração no app React (shaders, three.js, rotas existentes além de substituir a NewsPage stub).
- SSG/hidratação do SPA.

## Critérios de sucesso

- 1 post-semente PT+EN no ar, HTML estático com JSON-LD e hreflang válidos, linkando os kits.
- A trava reprova de fato (post com marca concorrente / preço / raso não passa; roda no build).
- Deploy por git funcionando: push na `main` publica com o blog estático servido corretamente.
- Prompt da rotina entregue: colável, curto, escrevendo PT+EN.
