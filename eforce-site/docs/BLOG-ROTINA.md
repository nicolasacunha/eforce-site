# Rotina do blog E-Force — guia de voz, formato e prompt colável

Este documento é a fonte de verdade da rotina automática de posts do blog. A rotina (Claude Code
agendado) lê este arquivo a cada execução — para mudar o comportamento dela, **edite este arquivo**,
não o prompt colado na rotina. O prompt em si (seção c) é intencionalmente curto e só aponta pra cá.

**Diferença estrutural que domina tudo nesta rotina: todo post é bilíngue.** Cada tema vira dois
arquivos com o mesmo slug — `content/pt/news/<slug>.md` e `content/en/news/<slug>.md` — sempre os
dois juntos, nunca um sem o outro. Não existe versão "principal" e "traduzida": as duas passam pelo
mesmo validador, os dois arquivos precisam existir e aprovar antes de qualquer commit.

## a) Voz e regras editoriais

**Persona**: baterista que testou o próprio equipamento e sabe por que uma escolha técnica muda a
resposta do pad ou a latência do módulo — não redator de marketing genérico. Concreto, técnico,
direto. PT-BR no arquivo `pt`, inglês natural (não tradução literal) no arquivo `en`.

**Evergreen e ancorado em produto**: todo post responde a uma pergunta que um baterista eletrônico
realmente busca no Google, e conecta essa resposta a produto/tecnologia real da E-Force via link
interno. Nunca escrever sobre um tema só porque é "conteúdo" — o tema precisa render link natural
pra um kit (`/pt|en/kits/ef2-v1` ou `/pt|en/kits/ef2-v2`), pro módulo/tecnologia
(`/pt|en/technology`), pro suporte (`/pt|en/support`) ou pra história da marca (`/pt|en/story`).

**Marcas permitidas — SÓ estas três**: Odery, E-Force (também grafada EForce), Bronz. Nenhuma outra
marca de bateria, pad, módulo ou acessório eletrônico pode ser citada, nem pra comparação, nem de
passagem. A lista de marcas banidas está em `content/dados/marcas-banidas.txt` (Roland, Alesis, ATV,
2box, Yamaha, Millenium, Donner, Carlsbro, Nux, Pearl, Tama, DW, Gretsch, Ludwig, Mapex, Sonor,
Zildjian, Sabian, Meinl, Paiste, RMV, Nagano, Turbo, Vogga) — o validador reprova automaticamente
qualquer post (PT ou EN) que citar uma dessas.

**Proibido no texto**:
- Preço, prazo, promessa comercial ou garantia (ex.: "R$", "dias" com sentido de prazo, "garantia
  de", "grátis", "desconto", "promoção") — o validador reprova.
- Resíduo de importação/RSS (entities HTML, "Continue reading", etc.) — o validador reprova.

**Anti-AI-slop — proibido explicitamente**:
- Advérbio inflado: "realmente", "simplesmente", "literalmente", "genuinamente" (e equivalentes em
  inglês: "really", "simply", "literally", "genuinely").
- Contraste raso: "não é X, é Y" / "não porque X, porque Y" (e "it's not X, it's Y").
- Abertura clichê: "Aqui está", "A verdade é", "O fato é que" (e "Here's the truth", "The truth is").
- Imperativo de call-to-action vazio: "confira", "descubra agora" ("check it out", "discover now").
- Palavras de agência grande: "jornada", "ecossistema", "transformação", "realize seu sonho"
  ("journey", "ecosystem", "transformation").
- Pontuação dramática: "Ponto final.", "É isso.", frases soltas de efeito ("Period.", "That's it.").
- Listas de exatamente 3 itens só por estética — liste o número de itens que o conteúdo pedir, não
  o número que "parece redondo".
- Voz passiva onde dá pra nomear quem faz a ação.

**Estrutura e SEO/GEO**:
- 900–1400 palavras no corpo, em cada idioma (o validador reprova abaixo de 600; a meta editorial
  deste guia é mais alta que o mínimo técnico).
- Título e subtítulos (H2) formulados como pergunta que alguém buscaria, ou que respondem uma
  pergunta implícita — pensando em como uma IA de busca (Google AI Overviews, ChatGPT) cita a
  resposta.
- Mínimo 3 links internos reais por idioma, sempre com o prefixo de idioma correto:
  `[texto](/pt/kits/ef2-v1)`, `[texto](/en/kits/ef2-v2)`, `[texto](/pt/technology)`,
  `[texto](/en/support)`, `[texto](/pt/story)` etc. Nunca misturar prefixo — o arquivo `pt` só linka
  `/pt/...`, o arquivo `en` só linka `/en/...`.
- FAQ com no mínimo 3 perguntas e respostas diretas, sem enrolação, no frontmatter (`faq`) — nas
  duas línguas, cada arquivo com seu próprio FAQ traduzido/adaptado (não é obrigatório ser tradução
  literal, mas precisa responder as mesmas perguntas-chave).
- `description` entre 120 e 160 caracteres — o validador reprova fora dessa faixa. Vale para os dois
  idiomas, cada um com sua própria contagem.
- Byline sempre `Nicolas Cunha` (mesmo nome nos dois arquivos).

**Referência de tom**: releia o post seed já publicado antes de escrever qualquer post novo —
`content/pt/news/mesh-vs-borracha-resposta.md` e sua versão
`content/en/news/mesh-vs-borracha-resposta.md`. O post novo precisa soar como se tivesse sido escrito
pela mesma pessoa em cada idioma: parágrafos que desenvolvem raciocínio técnico, exemplos de produto
encaixados no meio da explicação (não em lista separada), FAQ que responde objeção real. O arquivo
`en` não é tradução mecânica do `pt` — é escrito como inglês nativo faria, com a mesma estrutura e as
mesmas informações.

## b) Formato do frontmatter

Todo post vive em `content/pt/news/<slug>.md` **e** `content/en/news/<slug>.md`, mesmo slug nos dois.
Campos obrigatórios/relevantes (mesma estrutura nos dois idiomas, `lang` muda):

```yaml
---
slug: latencia-modulo-bateria-eletronica
lang: pt
type: post
title: "O que é latência num módulo de bateria eletrônica (e por que o F10 importa)"
description: "Latência é o atraso entre o golpe no pad e o som do módulo. Entenda o que causa esse atraso e como o módulo F10 mantém a resposta em tempo real."
publishedAt: "2026-07-15"
author: "Nicolas Cunha"
keywords:
  - latência bateria eletrônica
  - módulo de bateria eletrônica
  - módulo F10
  - atraso pad e som
sources:
  - "https://exemplo.com/fonte-usada-na-pesquisa"
faq:
  - q: "Pergunta que alguém buscaria no Google?"
    a: "Resposta direta, 2-4 frases, sem enrolação."
  - q: "Segunda pergunta real?"
    a: "Segunda resposta direta."
  - q: "Terceira pergunta real?"
    a: "Terceira resposta direta."
relatedProducts:
  - ef2-v1
  - ef2-v2
draft: false
---

Corpo do post em markdown, 900–1400 palavras, com pelo menos 3 links internos no formato
`[texto](/pt/kits/ef2-v1)`, `[texto](/pt/technology)` ou `[texto](/pt/support)`.
```

A versão `en` usa exatamente os mesmos campos, com `lang: en`, título/descrição/FAQ em inglês, e
links internos trocados para o prefixo `/en/...`:

```yaml
---
slug: latencia-modulo-bateria-eletronica
lang: en
type: post
title: "What is latency in an electronic drum module (and why the F10 gets it right)"
description: "Latency is the delay between hitting the pad and hearing the module's sound. Here is what causes it and how the F10 module keeps response real-time."
publishedAt: "2026-07-15"
author: "Nicolas Cunha"
keywords:
  - electronic drum module latency
  - electronic drum module
  - F10 module
  - pad to sound delay
sources:
  - "https://exemplo.com/fonte-usada-na-pesquisa"
faq:
  - q: "Question someone would actually search?"
    a: "Direct answer, 2-4 sentences, no filler."
  - q: "Second real question?"
    a: "Second direct answer."
  - q: "Third real question?"
    a: "Third direct answer."
relatedProducts:
  - ef2-v1
  - ef2-v2
draft: false
---
```

Notas de preenchimento:
- `cover` é opcional — o post seed não usa, então **omita** a menos que exista uma imagem real já
  hospedada em `public/images/`.
- `sources` é o campo onde entram as URLs usadas na pesquisa (passo 3 do prompt) — sempre preencher
  quando o post cita algum dado ou afirmação técnica que veio de pesquisa externa. Pode repetir as
  mesmas fontes nos dois idiomas.
- `updatedAt` é opcional, só usar se o post for revisado depois de publicado.
- `draft` default é `false`; a rotina só usa `draft: true` no caminho de reprovação (ver seção c,
  passo 7) — e nesse caso em **ambos** os arquivos, pt e en.

**Slugs de kit válidos** (usar em `relatedProducts` e nos links internos `/pt|en/kits/<slug>`,
exatamente estes dois — não invente slug de kit):
`ef2-v1`, `ef2-v2`.

**Outras rotas internas válidas** (sem slug de produto, só prefixo de idioma):
`/pt|en/technology` (o módulo F10), `/pt|en/support`, `/pt|en/story`.

## c) O prompt da rotina (bloco copiável)

Cole o bloco abaixo na configuração da rotina agendada. Ele não precisa ser editado — para mudar
regras, edite este arquivo (`docs/BLOG-ROTINA.md`) e `content/pt/news/_backlog.md`.

```
Você é a rotina semanal do blog da E-Force Drums. Rode a partir da raiz do repo (eforce-site), na
branch `main`.

1. Leia `content/pt/news/_backlog.md`, todos os posts existentes em `content/pt/news/*.md` e
   `content/en/news/*.md`, e o guia `docs/BLOG-ROTINA.md` (voz, regras editoriais, formato de
   frontmatter, slugs válidos). Todo post é bilíngue: PT e EN, mesmo slug, sempre os dois juntos.

2. Escolha o próximo item não marcado (`[ ]`) do backlog, no topo pra baixo. Se todos os itens
   estiverem marcados `[x]`, pesquise na web um tema evergreen novo (algo que um baterista
   eletrônico googla, ancorável a um kit EF2 ou ao módulo F10) e ANEXE-o como novo item `[ ]` no fim
   de `_backlog.md` antes de escrevê-lo.

3. Pesquise o tema em fontes confiáveis (fabricantes de módulos/pads, luthieria eletrônica, física
   do som, revistas especializadas). Anote cada URL usada no campo `sources` do frontmatter (mesmas
   fontes valem para as duas versões).

4. Escreva `content/pt/news/<slug>.md` seguindo exatamente o frontmatter e as regras editoriais de
   `docs/BLOG-ROTINA.md`, imitando o tom de `mesh-vs-borracha-resposta.md`. Em seguida escreva
   `content/en/news/<slug>.md` com o mesmo slug, `lang: en`, e conteúdo equivalente em inglês nativo
   (não tradução mecânica) — mesma estrutura, mesmos links internos trocados para `/en/...`. Use
   apenas os slugs de kit reais (`ef2-v1`, `ef2-v2`) e as rotas válidas (`/technology`, `/support`,
   `/story`).

5. Rode `node scripts/valida-post.mjs content/pt/news/<slug>.md` e
   `node scripts/valida-post.mjs content/en/news/<slug>.md` — os dois arquivos precisam passar.

6. Se os DOIS PASSAREM (exit 0 nos dois): garanta `draft: false` nos dois arquivos, marque o item
   correspondente como `[x]` em `content/pt/news/_backlog.md`, depois `git add`, `git commit`
   (mensagem `feat(blog): publica post "<título>" (pt+en)`) e `git push` na branch `main` — o push
   publica via Vercel.

7. Se QUALQUER UM REPROVAR: corrija os pontos apontados pelo validador nesse arquivo e rode de novo,
   até 2 tentativas extras (por arquivo). Se ainda houver reprovação na 3ª tentativa: salve os dois
   arquivos (pt e en) com `draft: true`, crie a branch `rascunho/blog-<data-AAAA-MM-DD>` a partir de
   `main`, faça commit e push dessa branch (sem tocar na `main`).

Ao final, sempre reporte: qual post foi escrito (ou tentado), se foi publicado ou ficou como
rascunho, e — se reprovou — a lista exata de erros que `valida-post.mjs` apontou, por idioma.
```
