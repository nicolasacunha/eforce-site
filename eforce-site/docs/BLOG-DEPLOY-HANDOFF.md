# Blog E-Force — handoff de deploy (09/jul/2026)

Blog auto-atualizável entregue e **no ar em produção** (`https://eforcedrums.com/pt/news/` e `/en/news/`).
Entrega por subagentes (superpowers), spec/plano em `docs/superpowers/`.

## O que está no ar

- Gerador estático PT+EN: markdown em `content/{pt,en}/news/*.md` → HTML em `dist/<lang>/news/` no `postbuild`.
- SEO/GEO: JSON-LD (BlogPosting + FAQPage + BreadcrumbList), hreflang pt/en/x-default, `sitemap-blog.xml`, RSS `feed.xml`.
- Trava de validação no `prebuild` (`valida-todos-posts.mjs`): allowlist Odery/E-Force/Bronz, sem preço/promessa, sem HTML cru no corpo, mínimos de qualidade → post ruim **quebra o build** e não sobe.
- Post-semente "mesh vs borracha" PT+EN. Menu "Novidades" (Footer) aponta pro blog estático; `NewsPage.tsx` tem redirect defensivo.
- Guia + backlog + prompt colável em `docs/BLOG-ROTINA.md`.

## Modelo de deploy (IMPORTANTE — difere do Odery)

- **Vercel projeto `eforce-site`** (team `nicolascunha14s-projects` / `team_nrKsYjAemGbEQQSbV5SxOhdn`), framework **Vite**.
- **Repositório GitHub `nicolasacunha/eforce-site`** (o remote antigo `nicolascunha14/eforce-site` redireciona pro mesmo repoId `1207055599`).
- **A app fica numa subpasta:** raiz do git = `EForce/`, código em `EForce/eforce-site/`. Por isso o **Root Directory do projeto Vercel = `eforce-site`** (setado em 09/jul via API). Sem isso, o build por git roda na raiz errada, não acha `package.json`, pula o install e falha com `vite: command not found` (exit 127).
- **`buildCommand = "npm run build"`** fixado em `vercel.json` (encadeia `prebuild` valida + `postbuild` gera o blog). Framework segue Vite; `dist/<lang>/news/` é servido direto (filesystem tem precedência sobre o rewrite `/(.*)→/index.html`).
- **Integração git↔Vercel conectada em 09/jul** (antes era `link: null`, deploy só por CLI). **Production Branch = `main`.** Agora **`git push` na `main` publica em produção** — o modelo que a rotina do blog assume.
- **`ssoProtection: all_except_custom_domains`**: URLs `*.vercel.app` ficam atrás de login SSO; o domínio custom `eforcedrums.com` é **público** (crawlers acessam — SEO/GEO ok). Para testar preview via `*.vercel.app`, precisa de bypass; valide sempre no domínio custom.

## Validação em produção (09/jul)

`eforcedrums.com`: home 200 (SPA intacto), `/pt/news/` e `/en/news/` 200, posts 200 e **estáticos** (sem `#root`), 1 BlogPosting + 1 FAQPage por post, hreflang pt/en/x-default, `sitemap-blog.xml`/`feed.xml` 200, og:image resolvendo.

## Pendências / follow-ups

- **Arquivos não-commitados do usuário** no working tree (`src/data/products.ts`, `src/pages/SupportPage.tsx`, `src/components/layout/SidebarSupportList.tsx`, `public/assets/manuais/*-en.pdf`, `.gitignore`) — trabalho em andamento, NÃO relacionado ao blog. O deploy por git usa o estado commitado, então não sobem. Decidir commit/descarte à parte. **Nunca** `vercel --prod` cru da pasta (subiria esse rascunho).
- **OG dedicado**: hoje usa `eforce-logo-white.webp`; um card 1200×630 próprio é melhoria.
- **Catálogo tem 6 kits** (`ef2-v1..v4`, `ef5-v2`, `ef7-eye-hybrid`); guia/rotina restringe links a `ef2-v1`/`ef2-v2`. Expandir quando quiser.
- **Revogar token do GitHub** que estava no `.git/config` antigo (ação do Nicolas em github.com/settings/tokens), se ainda válido.
