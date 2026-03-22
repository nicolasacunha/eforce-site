# EForce Redesign — Estilo Porsche

**Data:** 2026-03-22
**Diretriz:** "E se a Porsche fabricasse baterias eletrônicas?" — espelhar a experiência de porsche.com adaptada para baterias eletrônicas E-Force.

## Contexto

O site EForce (eforce-site/) é um site de marketing para baterias eletrônicas E-Force. Stack atual: React 19, TypeScript, Vite 6, Tailwind CSS v4, Framer Motion, i18next (5 idiomas), React Router v7. Deploy na Vercel.

O redesign mantém a stack, paleta (laranja #ff4a1c + preto), e dados de produto. Muda a estrutura de navegação, layouts de página, e interações para espelhar porsche.com.

---

## 1. Navegação Global

### Atual
Navbar fixa com links visíveis (Home, Line, Story, Technology, Dealers), logo à esquerda, language switcher dropdown, hamburger apenas no mobile.

### Novo
Navbar minimalista estilo Porsche com hamburger que abre sidebar.

**Navbar (fechada):**
- Esquerda: ícone hamburger (☰) + texto "Menu"
- Centro: logo E-FORCE centralizado (tipografia, não imagem)
- Direita: seletor de idioma (🌐) + ícone de conta (futuro)
- Fundo: transparente sobre hero, transição para #0a0a0a ao scrollar
- Sem links de navegação visíveis na barra

**Sidebar (aberta):**
- Painel dividido em duas colunas
- Coluna esquerda (40%): categorias — Modelos, Tecnologia, Nossa História, Dealers, Suporte
- Coluna direita (60%): conteúdo contextual da categoria selecionada
- Ao selecionar "Modelos": lista vertical de todos os 7 kits com imagem lateral + nome + badge (módulo, best seller, flagship)
- Hover sobre imagem do kit → troca para vídeo curto do kit em ação
- Clique no kit → navega para página de detalhe
- Overlay escuro sobre o conteúdo da página
- Animação: slide-in da esquerda com Framer Motion
- Botão X para fechar no canto superior direito da sidebar
- Mobile: sidebar ocupa 100% da largura

**Arquivos afetados:**
- `src/components/layout/Navbar.tsx` — reescrever
- Novo: `src/components/layout/Sidebar.tsx`
- Novo: `src/components/layout/SidebarModelList.tsx`

---

## 2. Home Page

### Atual
ScrollExpandMedia hero com animação de expansão ao scroll, ManifestoSection, ProductShowcase (grid de cards), FinishShowcase, OderyStory, TechPillars, VideoSection, SocialProof, DealerCTA.

### Novo
Layout editorial limpo estilo Porsche. Seções simplificadas e focadas.

**Seções (ordem):**

1. **Hero** — Vídeo loop fullscreen (hero-loop.mp4 existente). Branding minimalista centrado: "E-FORCE" em tipografia grande + subtítulo + CTA "Explorar modelos →". Remove scroll-expansion animation. Navbar sobreposta em transparente.

2. **Modelos em Destaque** — Grid horizontal de 3-4 kits destacados (EF2 V2 Best Seller, EF5 V2 Pro, EF7 Eye Flagship). Cards com imagem lateral, hover → vídeo curto, nome, badge, preço. Link "Ver todos os modelos →".

3. **Seção Editorial / Manifesto** — Bloco de texto com tipografia grande + imagem cinematográfica do kit. Storytelling da marca.

4. **Tecnologia** — Cards para módulos F10 e F50 com specs resumidos e CTA para página de tecnologia.

5. **Encontrar Dealer CTA** — Seção com imagem de fundo + texto + botão.

6. **Footer** — Redesign para estilo Porsche: seletor de idioma, links organizados em colunas, redes sociais, logo.

**Seções removidas:** FinishShowcase, SocialProof, TechPillars (absorvidos nas novas seções).

**Arquivos afetados:**
- `src/pages/HomePage.tsx` — reescrever
- `src/components/home/HeroSection.tsx` — simplificar (remover scroll-expansion)
- Remover: `ScrollExpandMedia.tsx` (ou manter mas não usar)
- Reescrever: `ProductShowcase.tsx` → novo com hover vídeo
- Simplificar/remover: `FinishShowcase.tsx`, `TechPillars.tsx`, `SocialProof.tsx`
- `src/components/layout/Footer.tsx` — reescrever

---

## 3. Página de Modelos (LinePage)

### Atual
Hero com título, filtros de preço em botões (All, <5k, 5-10k, >10k), grid 3 colunas de ProductCards.

### Novo
Layout sidebar + grid agrupado estilo Porsche models overview.

**Layout:**
- Sem hero section
- Título: "Visão Geral dos Modelos"
- Sidebar esquerda (30-35%):
  - Tabs de família: Todos (7), EF2 (4), Híbrido (2), Pro (1) — com contagem
  - Filtros expansíveis (accordion):
    - Módulo: F10, F50
    - Faixa de Preço: <5k, 5-10k, >10k
    - Tipo: Standard, Café, Hybrid
  - Link "Resetar filtros"
- Grid direita (65-70%):
  - Kits agrupados por linha com heading (ex: "Linha EF2", "Linha Híbrida", "Linha Profissional")
  - Cada grupo: heading + link "Comparar modelos"
  - Cards horizontais: imagem lateral (hover → vídeo) + nome + badges + 3 specs resumidos (sons, pads, preço) + links "Ver modelo" e "Comparar"
  - Imagens devem ser consistentes: todos os kits no mesmo ângulo lateral

**Arquivos afetados:**
- `src/pages/LinePage.tsx` — reescrever
- Novo: `src/components/line/ModelFilterSidebar.tsx`
- Novo: `src/components/line/ModelGroupGrid.tsx`
- Novo: `src/components/line/ModelCard.tsx` (horizontal, com hover vídeo)

---

## 4. Página de Detalhe do Kit (ProductDetailPage)

### Atual
Hero com imagem/nome/preço/CTAs, FinishSelector, Features grid, Gallery, Sound Demo placeholder, Module section, SpecTable, InTheBox, CompareModels, Related Models.

### Novo
Storytelling editorial longo estilo Porsche model detail page.

**Seções (ordem):**

1. **Sticky Context Bar** — Aparece ao scrollar para baixo (scroll > 400px). Conteúdo: nome do kit à esquerda, "Mudar de modelo" + "Encontrar Dealer" à direita. Fundo #151515, z-index alto. Animação: slide-down com Framer Motion.

2. **Hero** — Foto lateral do kit centrada. Nome do modelo em tipografia gigante semi-transparente atrás (ex: "EF5" em 200px, opacity 0.04). Abaixo: nome completo, tagline, badge do módulo (F10/F50).

3. **Key Specs** — 3-4 números grandes centrados com labels: quantidade de sons, pads, faixas de gravação, conectividade. Foto frontal do kit ao lado (layout 50/50). Link "Todos os detalhes técnicos →" abaixo.

4. **Editorial Intro** — Logo/sigla do modelo em SVG estilizado (ex: "EF5" em itálico). Headline editorial + parágrafo de storytelling. Galeria de 3 fotos com navegação prev/next (fotos lifestyle, detalhe, tocando).

5. **Highlights Grid** — Grid de 4-6 cards de destaques do kit. Cada card: foto + subtítulo + descrição. Ex: "Pads de Silicone", "Módulo F50", "Bluetooth", "Design Premium", etc.

6. **Vídeo** — Seção fullwidth com thumbnail + botão play overlay. Vídeo do kit em uso.

7. **Demo de Som (Press & Hold)** — Adaptação do "engine sound" da Porsche. Botão circular "Segure para ouvir" que toca sample de som do kit enquanto pressionado. Waveform visual ou indicador circular de progresso.

8. **Tabs Técnicas** — Conteúdo em tabs (como Motor/Transmissão/Chassi da Porsche):
   - Tab "Módulo": specs do F10 ou F50
   - Tab "Pads": tipo, tamanho, resposta
   - Tab "Conectividade": USB, MIDI, Bluetooth, gravação
   - Cada tab com carrossel horizontal de slides (ilustração técnica + título + descrição)

9. **Seletor de Acabamento** — Mantém funcionalidade atual (FinishSelector) com visual atualizado para tema escuro.

10. **Comparação de Modelos** — "Qual kit é ideal para você?" Carrossel horizontal de kits da mesma faixa. Cards no mesmo formato da LinePage. Links "Dados técnicos" e "Encontrar Dealer". Link "Comparar em detalhes".

11. **Na Caixa** — Lista de itens inclusos, visual limpo.

12. **Dealer CTA** — Seção com imagem + "Encontrar um dealer" + formulário de contato.

**Model Switcher Flyout:**
- Acionado pelo botão "Mudar de modelo" na sticky bar
- Painel lateral (direita) com todos os kits da mesma família
- Cada kit: imagem lateral + nome + 3 specs
- Botões: "Confirmar seleção" (navega para o kit) + "Comparar em detalhe"
- Overlay escuro sobre página

**Arquivos afetados:**
- `src/pages/ProductDetailPage.tsx` — reescrever
- Novo: `src/components/product/StickyContextBar.tsx`
- Novo: `src/components/product/ProductHero.tsx`
- Novo: `src/components/product/KeySpecs.tsx`
- Novo: `src/components/product/EditorialIntro.tsx`
- Novo: `src/components/product/HighlightsGrid.tsx`
- Novo: `src/components/product/SoundDemo.tsx` (press & hold)
- Novo: `src/components/product/TechTabs.tsx`
- Novo: `src/components/product/ModelSwitcher.tsx` (flyout)
- Atualizar: `src/components/product/FinishSelector.tsx` — tema escuro
- Atualizar: `src/components/product/CompareModels.tsx` — carrossel horizontal
- Atualizar: `src/components/product/InTheBox.tsx` — visual atualizado

---

## 5. Interações Globais

### Hover → Vídeo
- **Onde:** cards de produto no menu sidebar, home page, line page
- **Comportamento:** ao fazer hover sobre a imagem do kit, troca suavemente para vídeo curto (2-3s loop) do kit em ação
- **Fallback:** se não houver vídeo para o kit, mantém imagem estática com zoom sutil
- **Implementação:** componente `HoverVideoCard` reutilizável. Preload do vídeo em `mouseenter`, play automático, pause em `mouseleave`
- **Dados necessários:** campo `videoPreview` no product data (URL do vídeo curto por kit)
- Novo: `src/components/ui/HoverVideoCard.tsx`

### Press & Hold → Som
- **Onde:** página de detalhe do kit
- **Comportamento:** botão circular. Segurar = toca sample do kit. Soltar = para. Indicador visual circular de progresso.
- **Dados necessários:** campo `soundDemo` no product data (URL do áudio mp3/wav)
- Implementado em `SoundDemo.tsx`

### Sticky Context Bar
- **Onde:** página de detalhe do kit
- **Trigger:** scroll > 400px (após hero sair da viewport)
- **Conteúdo:** nome do kit + "Mudar de modelo" + "Encontrar Dealer"
- **Animação:** slide-down ao aparecer, slide-up ao sumir

### Model Switcher Flyout
- **Onde:** acessível de qualquer página de detalhe via sticky bar
- **Painel lateral direito** com lista de **todos** os kits (não apenas da mesma família) — o usuário pode navegar livremente entre modelos
- Cada kit: imagem lateral + nome + 3 specs + botão "Confirmar seleção"

### Acessibilidade (overlays)
- Sidebar e flyouts devem implementar: focus trapping, Escape para fechar, aria-modal, aria-label
- Transições respeitam `prefers-reduced-motion`

---

## 6. Estilo Visual

### Mantém
- Paleta: laranja #ff4a1c como accent, preto #0a0a0a como base
- Fontes: Sora (display) + Inter (body)
- Tailwind CSS v4
- Framer Motion para animações
- Suporte a 5 idiomas

### Muda
- **Tom geral:** mais escuro, mais editorial, menos "site de produto genérico"
- **Tipografia:** maior, mais ousada, mais espaçamento
- **Espaçamento:** mais generoso, mais whitespace (darkspace)
- **Cards:** bordas mais sutis (#1a1a1a), menos sombras, mais flat
- **Transições:** mais suaves e lentas (0.4-0.6s), premium feel
- **Backgrounds:** predominantemente escuros (#0a0a0a, #111, #151515), seções claras apenas quando necessário para contraste editorial

### Breakpoints
- Mobile: < 768px — sidebar fullscreen, cards empilhados, specs em 2 colunas
- Tablet: 768-1024px — sidebar overlay, grid 2 colunas
- Desktop: > 1024px — layout completo com sidebar lateral

---

## 7. Dados Necessários (Novos Campos)

Adicionar ao `src/data/products.ts`:

```typescript
interface Product {
  // ... campos existentes ...
  videoPreview?: string;    // URL vídeo curto (2-3s) para hover
  soundDemo?: string;       // URL áudio demo do kit
  specsHighlight: {         // 3-4 specs para exibição em números grandes
    label: string;
    value: string;
    unit?: string;
  }[];
  highlights: {             // 4-6 destaques editoriais
    image: string;
    title: string;
    description: string;
  }[];
  editorialHeadline?: string;  // headline para seção editorial
  editorialBody?: string;      // texto storytelling
  galleryImages: string[];     // fotos para galeria editorial
  techTabs: {                  // conteúdo das tabs técnicas
    label: string;
    slides: {
      image?: string;
      title: string;
      description: string;
    }[];
  }[];
}
```

**Nota:** vídeos de hover e áudio de demo precisam ser produzidos/obtidos. Inicialmente podem usar placeholders.

**i18n:** Os novos campos textuais (`editorialHeadline`, `editorialBody`, highlight titles/descriptions, techTab labels) devem usar chaves i18n no `locales/{lang}/common.json`, como o restante do site. Na fase inicial, implementar apenas em PT-BR e EN, com fallback para EN nos demais idiomas.

---

## 8. Páginas Não Afetadas (Mínimas Mudanças)

- **StoryPage** — atualizar visual para tema escuro, sem mudança estrutural
- **TechnologyPage** — atualizar visual para tema escuro
- **DealersPage** — atualizar visual para tema escuro
- **SupportPage** — atualizar visual para tema escuro
- **NewsPage** — atualizar visual para tema escuro
- **NotFoundPage** — atualizar visual

Essas páginas recebem apenas a nova navbar/footer e ajuste de tema (fundo escuro, tipografia atualizada).

---

## 9. Escopo e Prioridade

**Fase 1 (Core):**
1. Navbar + Sidebar
2. Home Page
3. Line Page (sidebar + filtros + hover vídeo)
4. Product Detail Page (hero + specs + sticky bar + model switcher)
5. Footer

**Fase 2 (Interações Premium):**
6. Hover → Vídeo (quando vídeos estiverem disponíveis)
7. Press & Hold → Som Demo
8. Tabs técnicas com carrossel
9. Highlights grid editorial

**Fase 3 (Polish):**
10. Atualizar páginas secundárias para tema escuro
11. Animações finas e transições
12. Comparação de modelos avançada
