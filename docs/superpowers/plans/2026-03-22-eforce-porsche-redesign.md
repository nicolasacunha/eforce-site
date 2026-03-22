# EForce Porsche-Style Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the EForce electronic drums marketing site to mirror the Porsche.com experience — hamburger + sidebar navigation, model catalog with hover video, editorial product detail pages with sticky bar, press-and-hold sound demo, and model switcher flyout.

**Architecture:** Component-based React SPA. New shared components (`Sidebar`, `HoverVideoCard`, `StickyContextBar`, `ModelSwitcher`) are built first, then pages are rewritten to use them. Data layer is extended with new fields (video, audio, specs, editorial content). Existing routing and i18n infrastructure stays intact.

**Tech Stack:** React 19, TypeScript, Vite 6, Tailwind CSS v4, Framer Motion, i18next, React Router v7

**Spec:** `docs/superpowers/specs/2026-03-22-eforce-porsche-redesign-design.md`

**Note:** No test framework is configured. Verification is done via `npm run build` (type-check + build) and visual inspection with `npm run dev`. All commands run from `eforce-site/`.

---

## File Map

### New Files
| File | Responsibility |
|------|---------------|
| `src/components/layout/Sidebar.tsx` | Full-screen sidebar overlay with categories + model preview |
| `src/components/layout/SidebarModelList.tsx` | Model list shown when "Modelos" is selected in sidebar |
| `src/components/ui/HoverVideoCard.tsx` | Reusable card: image → video on hover |
| `src/components/ui/Overlay.tsx` | Shared overlay backdrop with focus trap + escape + aria |
| `src/components/line/ModelFilterSidebar.tsx` | Left sidebar with family tabs + accordion filters |
| `src/components/line/ModelCard.tsx` | Horizontal product card for line page |
| `src/components/product/StickyContextBar.tsx` | Sticky bar: model name + "Mudar de modelo" + CTA |
| `src/components/product/ProductHero.tsx` | Hero with giant model name background + photo |
| `src/components/product/KeySpecs.tsx` | 3-4 large numbers with labels |
| `src/components/product/EditorialIntro.tsx` | Model logo + headline + storytelling + gallery |
| `src/components/product/HighlightsGrid.tsx` | 4-6 feature cards with photo + text |
| `src/components/product/SoundDemo.tsx` | Press-and-hold circular button for sound demo |
| `src/components/product/TechTabs.tsx` | Tabbed content with horizontal carousel |
| `src/components/product/ModelSwitcher.tsx` | Flyout panel listing all kits for quick switching |

### Modified Files
| File | Changes |
|------|---------|
| `src/data/products.ts` | Extend Product interface with new fields |
| `src/components/layout/Navbar.tsx` | Rewrite: minimal bar + hamburger trigger |
| `src/components/layout/Footer.tsx` | Rewrite: Porsche-style columns |
| `src/pages/HomePage.tsx` | Rewrite: new section composition |
| `src/components/home/HeroSection.tsx` | Simplify: remove scroll-expansion, video loop |
| `src/components/home/ProductShowcase.tsx` | Rewrite: use HoverVideoCard |
| `src/pages/LinePage.tsx` | Rewrite: sidebar + grouped grid |
| `src/pages/ProductDetailPage.tsx` | Rewrite: editorial storytelling layout |
| `src/components/product/FinishSelector.tsx` | Update: dark theme |
| `src/components/product/CompareModels.tsx` | Rewrite: horizontal carousel |
| `src/components/product/InTheBox.tsx` | Update: dark theme |
| `src/index.css` | Add new utility classes and update theme |
| `src/locales/pt/common.json` | Add new translation keys |
| `src/locales/en/common.json` | Add new translation keys |

---

## Phase 1: Core Infrastructure

### Task 1: Extend Product Data Model

**Files:**
- Modify: `eforce-site/src/data/products.ts`

- [ ] **Step 1: Read current Product interface**

Read `src/data/products.ts` to understand the existing interface and all 7 products.

- [ ] **Step 2: Extend the Product interface**

Add new optional fields after the existing ones:

```typescript
export interface Product {
  // ... existing fields stay unchanged ...
  videoPreview?: string;
  soundDemo?: string;
  specsHighlight: {
    label: string;
    value: string;
    unit?: string;
  }[];
  highlights: {
    image: string;
    title: string;
    description: string;
  }[];
  editorialHeadline?: string;
  editorialBody?: string;
  galleryImages: string[];
  techTabs: {
    label: string;
    slides: {
      image?: string;
      title: string;
      description: string;
    }[];
  }[];
}
```

- [ ] **Step 3: Add specsHighlight data to each product**

For each of the 7 products, add `specsHighlight` based on their module specs. Example for EF2 V2:

```typescript
specsHighlight: [
  { label: "Sons", value: "461" },
  { label: "Pads", value: "8" },
  { label: "Faixas", value: "1" },
  { label: "Módulo", value: "F10" },
],
```

Derive values from existing product descriptions and module specs (F10: 461 sons, F50: 937 sons).

- [ ] **Step 4: Add placeholder data for remaining new fields**

For each product, add empty/placeholder arrays for fields that need content production:

```typescript
videoPreview: undefined,  // placeholder until videos are produced
soundDemo: undefined,     // placeholder until audio is produced
highlights: [],           // to be filled with editorial content
editorialHeadline: undefined,
editorialBody: undefined,
galleryImages: [],        // use existing images where available
techTabs: [],             // to be filled with technical content
```

For products that have multiple images (ef2v2, ef5v2), populate `galleryImages` with existing paths.

- [ ] **Step 5: Verify build**

Run: `cd eforce-site && npm run build`
Expected: Build succeeds with no type errors.

- [ ] **Step 6: Commit**

```bash
git add eforce-site/src/data/products.ts
git commit -m "feat: extend product data model with video, audio, specs, editorial fields"
```

---

### Task 2: Shared Overlay Component

**Files:**
- Create: `eforce-site/src/components/ui/Overlay.tsx`

- [ ] **Step 1: Create Overlay component**

Shared overlay used by Sidebar and ModelSwitcher. Handles backdrop, focus trap, escape-to-close, aria.

```tsx
import { useEffect, useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  side?: "left" | "right";
  ariaLabel: string;
}

export function Overlay({ isOpen, onClose, children, side = "left", ariaLabel }: OverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    // Focus trap: focus first focusable element
    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable?.length) focusable[0].focus();

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const slideFrom = side === "left" ? "-100%" : "100%";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            className={`fixed top-0 ${side === "left" ? "left-0" : "right-0"} h-full z-50`}
            initial={{ x: slideFrom }}
            animate={{ x: 0 }}
            exit={{ x: slideFrom }}
            transition={{ type: "tween", duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `cd eforce-site && npm run build`

- [ ] **Step 3: Commit**

```bash
git add eforce-site/src/components/ui/Overlay.tsx
git commit -m "feat: add shared Overlay component with focus trap and a11y"
```

---

### Task 3: HoverVideoCard Component

**Files:**
- Create: `eforce-site/src/components/ui/HoverVideoCard.tsx`

- [ ] **Step 1: Create HoverVideoCard component**

Reusable card: shows image by default, switches to video on hover.

```tsx
import { useState, useRef } from "react";

interface HoverVideoCardProps {
  image: string;
  videoSrc?: string;
  alt: string;
  className?: string;
}

export function HoverVideoCard({ image, videoSrc, alt, className = "" }: HoverVideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && videoSrc) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={image}
        alt={alt}
        className={`w-full h-full object-cover transition-transform duration-500 ${
          isHovered && !videoSrc ? "scale-105" : ""
        }`}
      />
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="none"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `cd eforce-site && npm run build`

- [ ] **Step 3: Commit**

```bash
git add eforce-site/src/components/ui/HoverVideoCard.tsx
git commit -m "feat: add HoverVideoCard with image-to-video hover transition"
```

---

### Task 4: Update Theme & Global Styles

**Files:**
- Modify: `eforce-site/src/index.css`

- [ ] **Step 1: Read current index.css**

Read the full file to understand existing theme variables and custom classes.

- [ ] **Step 2: Add new utility classes**

Add after existing custom classes:

```css
/* Porsche-style utilities */
.text-giant {
  font-size: clamp(4rem, 12vw, 12rem);
  font-weight: 900;
  line-height: 1;
  color: rgba(255, 255, 255, 0.04);
}

.sticky-bar {
  position: sticky;
  top: 0;
  z-index: 30;
  backdrop-filter: blur(12px);
  background: rgba(21, 21, 21, 0.95);
}

.specs-number {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 300;
  line-height: 1.1;
}

.editorial-headline {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 300;
  font-style: italic;
  letter-spacing: -0.02em;
}
```

- [ ] **Step 3: Verify build**

Run: `cd eforce-site && npm run build`

- [ ] **Step 4: Commit**

```bash
git add eforce-site/src/index.css
git commit -m "feat: add Porsche-style utility classes to theme"
```

---

### Task 5: Navbar Rewrite

**Files:**
- Modify: `eforce-site/src/components/layout/Navbar.tsx`
- Create: `eforce-site/src/components/layout/Sidebar.tsx`
- Create: `eforce-site/src/components/layout/SidebarModelList.tsx`

- [ ] **Step 1: Read current Navbar.tsx fully**

Read the complete file to understand all current behavior.

- [ ] **Step 2: Create SidebarModelList component**

```tsx
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { products } from "@/data/products";
import { HoverVideoCard } from "@/components/ui/HoverVideoCard";

interface SidebarModelListProps {
  onNavigate: () => void;
}

export function SidebarModelList({ onNavigate }: SidebarModelListProps) {
  const { lang } = useParams();

  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3">
      <div className="text-xs uppercase tracking-widest text-neutral-500 mb-2">
        {t("nav.line")}
      </div>
      {products.map((product) => (
        <Link
          key={product.id}
          to={`/${lang}/kits/${product.slug}`}
          onClick={onNavigate}
          className="flex items-center gap-3 p-3 rounded-lg border border-neutral-800 hover:border-neutral-600 transition-colors"
        >
          <HoverVideoCard
            image={product.heroImage}
            videoSrc={product.videoPreview}
            alt={product.name}
            className="w-24 h-14 rounded-md flex-shrink-0"
          />
          <div>
            <div className="text-sm font-semibold text-white">{product.name}</div>
            <div className="text-xs text-neutral-500">
              {product.badge && (
                <span className="text-brand-orange mr-2">{product.badge}</span>
              )}
              {product.module}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Create Sidebar component**

```tsx
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Overlay } from "@/components/ui/Overlay";
import { SidebarModelList } from "./SidebarModelList";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

type Category = "modelos" | "tecnologia" | "historia" | "dealers" | "suporte";

const categories: { key: Category; labelKey: string; route: string }[] = [
  { key: "modelos", labelKey: "nav.line", route: "line" },
  { key: "tecnologia", labelKey: "nav.technology", route: "technology" },
  { key: "historia", labelKey: "nav.story", route: "story" },
  { key: "dealers", labelKey: "nav.dealers", route: "dealers" },
  { key: "suporte", labelKey: "nav.support", route: "support" },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("modelos");
  const { lang } = useParams();
  const { t } = useTranslation();

  return (
    <Overlay isOpen={isOpen} onClose={onClose} side="left" ariaLabel="Menu de navegação">
      <div className="flex h-full w-[90vw] max-w-4xl">
        {/* Left column: categories */}
        <div className="w-2/5 bg-neutral-900 p-6 flex flex-col">
          <button
            onClick={onClose}
            className="self-end text-white text-2xl mb-8 hover:text-neutral-400 transition-colors"
            aria-label="Fechar menu"
          >
            ✕
          </button>
          <nav className="flex flex-col gap-0">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex justify-between items-center py-4 border-b border-neutral-800 text-left text-base transition-colors ${
                  activeCategory === cat.key
                    ? "text-white font-semibold"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {t(cat.labelKey)}
                <span className="text-neutral-600">→</span>
              </button>
            ))}
          </nav>
        </div>
        {/* Right column: contextual content */}
        <div className="w-3/5 bg-neutral-950 p-6 overflow-y-auto">
          {activeCategory === "modelos" ? (
            <SidebarModelList onNavigate={onClose} />
          ) : (
            <Link
              to={`/${lang}/${categories.find((c) => c.key === activeCategory)?.route}`}
              onClick={onClose}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              {t(categories.find((c) => c.key === activeCategory)?.labelKey || "")} →
            </Link>
          )}
        </div>
      </div>
    </Overlay>
  );
}
```

- [ ] **Step 4: Rewrite Navbar**

Rewrite `Navbar.tsx` to minimal Porsche-style bar:

```tsx
import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Sidebar } from "./Sidebar";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const languages = [
    { code: "pt", label: "PT", flag: "🇧🇷" },
    { code: "en", label: "EN", flag: "🇺🇸" },
    { code: "es", label: "ES", flag: "🇪🇸" },
    { code: "it", label: "IT", flag: "🇮🇹" },
    { code: "zh", label: "ZH", flag: "🇨🇳" },
  ];

  const switchLanguage = (newLang: string) => {
    const newPath = location.pathname.replace(`/${lang}`, `/${newLang}`);
    i18n.changeLanguage(newLang);
    setLangOpen(false);
    window.location.href = newPath;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-brand-black/95 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left: hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 text-white hover:text-neutral-400 transition-colors"
            aria-label="Abrir menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <span className="text-sm hidden md:inline">Menu</span>
          </button>

          {/* Center: logo */}
          <Link
            to={`/${lang}`}
            className="absolute left-1/2 -translate-x-1/2 text-white font-display font-bold text-lg tracking-[0.2em]"
          >
            E-FORCE
          </Link>

          {/* Right: language + account */}
          <div className="flex items-center gap-4 relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="text-white hover:text-neutral-400 transition-colors"
              aria-label="Selecionar idioma"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </button>
            {langOpen && (
              <div className="absolute top-full right-0 mt-2 bg-neutral-900 border border-neutral-800 rounded-lg py-2 min-w-[120px]">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => switchLanguage(l.code)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-neutral-800 transition-colors ${
                      lang === l.code ? "text-brand-orange" : "text-white"
                    }`}
                  >
                    {l.flag} {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
```

- [ ] **Step 5: Verify build and visual check**

Run: `cd eforce-site && npm run build`
Then: `npm run dev` and verify navbar is minimal with hamburger + logo + language.

- [ ] **Step 6: Commit**

```bash
git add eforce-site/src/components/layout/Navbar.tsx eforce-site/src/components/layout/Sidebar.tsx eforce-site/src/components/layout/SidebarModelList.tsx
git commit -m "feat: rewrite navbar to Porsche-style hamburger + sidebar navigation"
```

---

### Task 6: Footer Rewrite

**Files:**
- Modify: `eforce-site/src/components/layout/Footer.tsx`

- [ ] **Step 1: Read current Footer.tsx**

Read the complete file.

- [ ] **Step 2: Rewrite Footer in Porsche style**

Porsche-style footer: language selector up top, organized link columns, social icons, legal bar.

```tsx
import { Link, useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { lang } = useParams();
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const languages = [
    { code: "pt", label: "Brasil / Português", flag: "🇧🇷" },
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "it", label: "Italiano", flag: "🇮🇹" },
    { code: "zh", label: "中文", flag: "🇨🇳" },
  ];

  const switchLanguage = (newLang: string) => {
    const newPath = location.pathname.replace(`/${lang}`, `/${newLang}`);
    i18n.changeLanguage(newLang);
    window.location.href = newPath;
  };

  return (
    <footer className="bg-brand-black text-white border-t border-neutral-800">
      {/* Language selector */}
      <div className="max-w-7xl mx-auto px-6 py-6 border-b border-neutral-800">
        <div className="flex flex-wrap gap-3">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => switchLanguage(l.code)}
              className={`text-sm px-3 py-1 rounded transition-colors ${
                lang === l.code
                  ? "text-brand-orange"
                  : "text-neutral-500 hover:text-white"
              }`}
            >
              {l.flag} {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Link columns */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-display font-bold text-sm tracking-wider mb-4">E-FORCE</h4>
          <ul className="space-y-2 text-sm text-neutral-500">
            <li><Link to={`/${lang}`} className="hover:text-white transition-colors">{t("nav.home")}</Link></li>
            <li><Link to={`/${lang}/line`} className="hover:text-white transition-colors">{t("nav.line")}</Link></li>
            <li><Link to={`/${lang}/technology`} className="hover:text-white transition-colors">{t("nav.technology")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold text-sm tracking-wider mb-4">{t("nav.story")}</h4>
          <ul className="space-y-2 text-sm text-neutral-500">
            <li><Link to={`/${lang}/story`} className="hover:text-white transition-colors">{t("nav.story")}</Link></li>
            <li><Link to={`/${lang}/news`} className="hover:text-white transition-colors">{t("nav.news") || "News"}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold text-sm tracking-wider mb-4">{t("nav.dealers")}</h4>
          <ul className="space-y-2 text-sm text-neutral-500">
            <li><Link to={`/${lang}/dealers`} className="hover:text-white transition-colors">{t("nav.dealers")}</Link></li>
            <li><Link to={`/${lang}/support`} className="hover:text-white transition-colors">{t("nav.support") || "Suporte"}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold text-sm tracking-wider mb-4">Social</h4>
          <div className="flex gap-4 text-neutral-500">
            <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="TikTok">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-neutral-800 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-600">
          <span>© {new Date().getFullYear()} E-Force Electronic Drums. {t("footer.rights")}</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-neutral-400 transition-colors">{t("footer.privacy")}</a>
            <a href="#" className="hover:text-neutral-400 transition-colors">{t("footer.terms")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `cd eforce-site && npm run build`

- [ ] **Step 4: Commit**

```bash
git add eforce-site/src/components/layout/Footer.tsx
git commit -m "feat: rewrite footer to Porsche-style with link columns and legal bar"
```

---

## Phase 2: Page Rewrites

### Task 7: Home Page Rewrite

**Files:**
- Modify: `eforce-site/src/pages/HomePage.tsx`
- Modify: `eforce-site/src/components/home/HeroSection.tsx`
- Modify: `eforce-site/src/components/home/ProductShowcase.tsx`

- [ ] **Step 1: Read current HeroSection.tsx and ProductShowcase.tsx**

Read both files fully.

- [ ] **Step 2: Rewrite HeroSection**

Replace scroll-expansion with simple fullscreen video hero:

```tsx
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function HeroSection() {
  const { lang } = useParams();
  const { t } = useTranslation();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/assets/video/hero-loop.mp4" type="video/mp4" />
      </video>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center text-white px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-300 mb-4">
          Electronic Drums
        </p>
        <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl tracking-[0.15em] mb-6">
          E-FORCE
        </h1>
        <p className="text-lg md:text-xl text-neutral-300 mb-8 max-w-lg mx-auto">
          {t("hero.sub")}
        </p>
        <Link
          to={`/${lang}/line`}
          className="inline-flex items-center gap-2 text-brand-orange hover:text-white transition-colors text-sm tracking-wider"
        >
          {t("hero.cta")} →
        </Link>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 3: Rewrite ProductShowcase with HoverVideoCard**

```tsx
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { HoverVideoCard } from "@/components/ui/HoverVideoCard";

const featured = products.filter((p) =>
  ["ef2-v2", "ef5-v2", "ef7-eye-hybrid"].includes(p.slug)
);

export default function ProductShowcase() {
  const { lang } = useParams();
  const { t } = useTranslation();

  return (
    <section className="bg-brand-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-8">
          {t("showcase.label") || "Modelos em Destaque"}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/${lang}/kits/${product.slug}`}
                className="group block bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 hover:border-neutral-600 transition-colors"
              >
                <HoverVideoCard
                  image={product.heroImage}
                  videoSrc={product.videoPreview}
                  alt={product.name}
                  className="h-48"
                />
                <div className="p-5">
                  <h3 className="text-white font-semibold text-lg">{product.name}</h3>
                  {product.badge && (
                    <span className="text-brand-orange text-xs">{product.badge}</span>
                  )}
                  <p className="text-neutral-500 text-sm mt-1">{product.price}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            to={`/${lang}/line`}
            className="text-brand-orange hover:text-white transition-colors text-sm tracking-wider"
          >
            {t("showcase.viewAll") || "Ver todos os modelos"} →
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Rewrite HomePage composition**

```tsx
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import SEO from "@/components/layout/SEO";
import HeroSection from "@/components/home/HeroSection";
import ProductShowcase from "@/components/home/ProductShowcase";
import ManifestoSection from "@/components/home/ManifestoSection";

export default function HomePage() {
  const { t } = useTranslation();
  const { lang } = useParams();

  return (
    <>
      <SEO title={t("seo.homeTitle")} description={t("seo.homeDescription")} />
      <HeroSection />
      <ProductShowcase />
      <ManifestoSection />

      {/* Tech CTA */}
      <section className="bg-brand-black py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to={`/${lang}/technology`}
            className="bg-neutral-900 rounded-lg p-8 border border-neutral-800 hover:border-neutral-600 transition-colors group"
          >
            <h3 className="text-white text-xl font-semibold mb-2">{t("nav.technology")}</h3>
            <p className="text-neutral-500 text-sm group-hover:text-neutral-400 transition-colors">
              {t("tech.subtitle") || "Módulos F10 & F50"} →
            </p>
          </Link>
          <Link
            to={`/${lang}/dealers`}
            className="bg-neutral-900 rounded-lg p-8 border border-neutral-800 hover:border-neutral-600 transition-colors group"
          >
            <h3 className="text-white text-xl font-semibold mb-2">{t("nav.dealers")}</h3>
            <p className="text-neutral-500 text-sm group-hover:text-neutral-400 transition-colors">
              {t("dealers.subtitle") || "Encontrar o dealer mais próximo"} →
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 5: Verify build and visual check**

Run: `cd eforce-site && npm run build && npm run dev`
Check: home page loads with video hero, product showcase with 3 featured kits, manifesto, CTA cards.

- [ ] **Step 6: Commit**

```bash
git add eforce-site/src/pages/HomePage.tsx eforce-site/src/components/home/HeroSection.tsx eforce-site/src/components/home/ProductShowcase.tsx
git commit -m "feat: rewrite home page with video hero and Porsche-style product showcase"
```

---

### Task 8: Line Page Rewrite

**Files:**
- Modify: `eforce-site/src/pages/LinePage.tsx`
- Create: `eforce-site/src/components/line/ModelFilterSidebar.tsx`
- Create: `eforce-site/src/components/line/ModelCard.tsx`

- [ ] **Step 1: Read current LinePage.tsx**

Read the full file.

- [ ] **Step 2: Create ModelCard component**

Horizontal product card with hover video:

```tsx
import { Link, useParams } from "react-router-dom";
import { HoverVideoCard } from "@/components/ui/HoverVideoCard";
import type { Product } from "@/data/products";

interface ModelCardProps {
  product: Product;
}

export function ModelCard({ product }: ModelCardProps) {
  const { lang } = useParams();

  return (
    <Link
      to={`/${lang}/kits/${product.slug}`}
      className="flex items-center gap-4 p-4 bg-neutral-900 rounded-lg border border-neutral-800 hover:border-neutral-600 transition-colors group"
    >
      <HoverVideoCard
        image={product.heroImage}
        videoSrc={product.videoPreview}
        alt={product.name}
        className="w-32 h-16 md:w-40 md:h-20 rounded-md flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-white font-semibold">{product.name}</h3>
          {product.badge && (
            <span className="text-brand-orange text-xs">{product.badge}</span>
          )}
        </div>
        <div className="flex items-center gap-3 mt-1 text-xs text-neutral-500">
          <span>{product.module}</span>
          <span>·</span>
          <span>{product.specsHighlight?.[0]?.value} {product.specsHighlight?.[0]?.label}</span>
          <span>·</span>
          <span>{product.price}</span>
        </div>
      </div>
      <span className="text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity text-lg">
        →
      </span>
    </Link>
  );
}
```

- [ ] **Step 3: Create ModelFilterSidebar component**

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ModelFilterSidebarProps {
  activeFamily: string;
  onFamilyChange: (family: string) => void;
  activeModule: string;
  onModuleChange: (module: string) => void;
  activePriceRange: string;
  onPriceRangeChange: (range: string) => void;
}

const families = [
  { key: "all", label: "Todos", count: 7 },
  { key: "ef2", label: "EF2", count: 4 },
  { key: "hybrid", label: "Híbrido", count: 2 },
  { key: "pro", label: "Pro", count: 1 },
];

export function ModelFilterSidebar({
  activeFamily,
  onFamilyChange,
  activeModule,
  onModuleChange,
  activePriceRange,
  onPriceRangeChange,
}: ModelFilterSidebarProps) {
  const [moduleOpen, setModuleOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <aside className="w-full lg:w-80 flex-shrink-0">
      <h1 className="text-xl font-bold text-white mb-6">
        {t("line.title")}
      </h1>

      {/* Family tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {families.map((f) => (
          <button
            key={f.key}
            onClick={() => onFamilyChange(f.key)}
            className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
              activeFamily === f.key
                ? "bg-brand-orange text-white"
                : "bg-neutral-800 text-neutral-400 hover:text-white"
            }`}
          >
            {f.label} ({f.count})
          </button>
        ))}
      </div>

      {/* Accordion filters */}
      <div className="border-t border-neutral-800 pt-4">
        <button
          onClick={() => setModuleOpen(!moduleOpen)}
          className="w-full flex justify-between items-center py-3 text-sm text-neutral-400 hover:text-white transition-colors"
        >
          <span>{t("line.module") || "Módulo"}</span>
          <span>{moduleOpen ? "−" : "+"}</span>
        </button>
        {moduleOpen && (
          <div className="flex gap-2 pb-4">
            {["all", "F10", "F50"].map((m) => (
              <button
                key={m}
                onClick={() => onModuleChange(m)}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  activeModule === m
                    ? "bg-brand-orange text-white"
                    : "bg-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                {m === "all" ? t("line.all") || "Todos" : m}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => setPriceOpen(!priceOpen)}
          className="w-full flex justify-between items-center py-3 text-sm text-neutral-400 hover:text-white transition-colors"
        >
          <span>{t("line.priceRange") || "Faixa de Preço"}</span>
          <span>{priceOpen ? "−" : "+"}</span>
        </button>
        {priceOpen && (
          <div className="flex flex-wrap gap-2 pb-4">
            {(["all", "under5k", "5k-10k", "over10k"] as const).map((r) => {
              const labels: Record<string, string> = {
                all: t("line.all") || "Todos",
                under5k: "< R$ 5k",
                "5k-10k": "R$ 5k - 10k",
                over10k: "> R$ 10k",
              };
              return (
                <button
                  key={r}
                  onClick={() => onPriceRangeChange(r)}
                  className={`px-3 py-1 rounded text-xs transition-colors ${
                    activePriceRange === r
                      ? "bg-brand-orange text-white"
                      : "bg-neutral-800 text-neutral-400 hover:text-white"
                  }`}
                >
                  {labels[r]}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <button
        onClick={() => {
          onFamilyChange("all");
          onModuleChange("all");
          onPriceRangeChange("all");
        }}
        className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors mt-4"
      >
        {t("line.resetFilters")}
      </button>
    </aside>
  );
}
```

- [ ] **Step 4: Rewrite LinePage**

```tsx
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/layout/SEO";
import { products } from "@/data/products";
import { ModelFilterSidebar } from "@/components/line/ModelFilterSidebar";
import { ModelCard } from "@/components/line/ModelCard";

type ProductGroup = { label: string; items: typeof products };

export default function LinePage() {
  const { t } = useTranslation();
  const [activeFamily, setActiveFamily] = useState("all");
  const [activeModule, setActiveModule] = useState("all");
  const [activePriceRange, setActivePriceRange] = useState("all");

  // Classify products by price range for grouping
  const getFamily = (p: typeof products[0]) => {
    if (p.priceValue <= 5000) return "entry";
    if (p.priceValue <= 10000) return "mid";
    return "premium";
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      // Family filter
      if (activeFamily === "ef2" && !p.name.startsWith("EF2")) return false;
      if (activeFamily === "hybrid" && !p.name.toLowerCase().includes("hybrid") && !p.name.toLowerCase().includes("cafe")) return false;
      if (activeFamily === "pro" && p.module !== "F50") return false;
      // Module filter
      if (activeModule !== "all" && p.module !== activeModule) return false;
      // Price range filter
      if (activePriceRange === "under5k" && p.priceValue >= 5000) return false;
      if (activePriceRange === "5k-10k" && (p.priceValue < 5000 || p.priceValue > 10000)) return false;
      if (activePriceRange === "over10k" && p.priceValue <= 10000) return false;
      return true;
    });
  }, [activeFamily, activeModule, activePriceRange]);

  const groups = useMemo<ProductGroup[]>(() => {
    const entry = filtered.filter((p) => getFamily(p) === "entry");
    const mid = filtered.filter((p) => getFamily(p) === "mid");
    const premium = filtered.filter((p) => getFamily(p) === "premium");

    const result: ProductGroup[] = [];
    if (entry.length) result.push({ label: t("line.entryLine") || "Linha Entrada", items: entry });
    if (mid.length) result.push({ label: t("line.midLine") || "Linha Intermediária", items: mid });
    if (premium.length) result.push({ label: t("line.premiumLine") || "Linha Premium", items: premium });
    return result;
  }, [filtered, t]);

  return (
    <>
      <SEO title={t("seo.lineTitle") || "Modelos"} description={t("seo.lineDescription") || ""} />
      <div className="min-h-screen bg-brand-black pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          <ModelFilterSidebar
            activeFamily={activeFamily}
            onFamilyChange={setActiveFamily}
            activeModule={activeModule}
            onModuleChange={setActiveModule}
            activePriceRange={activePriceRange}
            onPriceRangeChange={setActivePriceRange}
          />
          <main className="flex-1">
            {groups.map((group) => (
              <div key={group.label} className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xs uppercase tracking-widest text-neutral-500">
                    {group.label}
                  </h2>
                  <span className="text-xs text-brand-orange cursor-pointer hover:text-white transition-colors">
                    {t("line.compare")}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {group.items.map((product) => (
                    <ModelCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ))}
            {groups.length === 0 && (
              <p className="text-neutral-500 text-center py-16">
                {t("line.noResults") || "Nenhum modelo encontrado com esses filtros."}
              </p>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 5: Verify build and visual check**

Run: `cd eforce-site && npm run build && npm run dev`
Navigate to `/pt/line` and verify sidebar + grouped grid layout.

- [ ] **Step 6: Commit**

```bash
git add eforce-site/src/pages/LinePage.tsx eforce-site/src/components/line/
git commit -m "feat: rewrite line page with Porsche-style sidebar filters and grouped grid"
```

---

### Task 9: Product Detail — Core Components

**Files:**
- Create: `eforce-site/src/components/product/StickyContextBar.tsx`
- Create: `eforce-site/src/components/product/ProductHero.tsx`
- Create: `eforce-site/src/components/product/KeySpecs.tsx`
- Create: `eforce-site/src/components/product/ModelSwitcher.tsx`

- [ ] **Step 1: Create StickyContextBar**

```tsx
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/data/products";

interface StickyContextBarProps {
  product: Product;
  onSwitchModel: () => void;
}

export function StickyContextBar({ product, onSwitchModel }: StickyContextBarProps) {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="sticky-bar flex items-center justify-between px-6 py-3"
          initial={{ y: -60 }}
          animate={{ y: 0 }}
          exit={{ y: -60 }}
          transition={{ type: "tween", duration: 0.3 }}
        >
          <span className="text-white font-semibold text-sm">{product.name}</span>
          <div className="flex items-center gap-4">
            <button
              onClick={onSwitchModel}
              className="text-neutral-400 hover:text-white text-sm transition-colors"
            >
              {t("product.switchModel") || "Mudar de modelo"}
            </button>
            <a
              href="#dealers"
              className="bg-brand-orange text-white text-sm px-4 py-1.5 rounded hover:bg-orange-600 transition-colors"
            >
              {t("product.findDealer") || "Encontrar Dealer"}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Create ProductHero**

```tsx
import { motion } from "framer-motion";
import type { Product } from "@/data/products";

interface ProductHeroProps {
  product: Product;
}

export function ProductHero({ product }: ProductHeroProps) {
  // Extract short model name (e.g., "EF5" from "EF5 V2")
  const shortName = product.name.split(" ")[0];

  return (
    <section className="relative flex flex-col items-center justify-center py-24 md:py-32 overflow-hidden">
      {/* Giant background text */}
      <div className="text-giant absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none whitespace-nowrap">
        {shortName}
      </div>

      {/* Product image */}
      <motion.img
        src={product.heroImage}
        alt={product.name}
        className="relative z-10 max-w-md md:max-w-lg lg:max-w-xl w-full h-auto object-contain"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      {/* Model info */}
      <motion.div
        className="relative z-10 text-center mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h1 className="text-white text-2xl md:text-4xl font-bold">{product.name}</h1>
        <p className="text-neutral-500 text-sm md:text-base mt-2">{product.tagline}</p>
        <span className="inline-block mt-3 bg-neutral-800 text-brand-orange text-xs px-3 py-1 rounded-full">
          {product.module}
        </span>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 3: Create KeySpecs**

```tsx
import { motion } from "framer-motion";
import type { Product } from "@/data/products";

interface KeySpecsProps {
  product: Product;
}

export function KeySpecs({ product }: KeySpecsProps) {
  const specs = product.specsHighlight || [];

  if (specs.length === 0) return null;

  return (
    <section className="border-t border-b border-neutral-800 py-12 px-6">
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16">
        {specs.map((spec, i) => (
          <motion.div
            key={spec.label}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="specs-number text-white">
              {spec.value}
              {spec.unit && (
                <span className="text-lg text-neutral-500 ml-1">{spec.unit}</span>
              )}
            </div>
            <div className="text-xs text-neutral-500 mt-1 uppercase tracking-wider">
              {spec.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create ModelSwitcher flyout**

```tsx
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Overlay } from "@/components/ui/Overlay";
import { products } from "@/data/products";
import type { Product } from "@/data/products";

interface ModelSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
  currentProduct: Product;
}

export function ModelSwitcher({ isOpen, onClose, currentProduct }: ModelSwitcherProps) {
  const { lang } = useParams();
  const { t } = useTranslation();

  return (
    <Overlay isOpen={isOpen} onClose={onClose} side="right" ariaLabel="Mudar de modelo">
      <div className="h-full w-[85vw] max-w-md bg-neutral-900 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-white font-semibold text-lg">
            {t("product.switchModel") || "Mudar de modelo"}
          </h2>
          <button
            onClick={onClose}
            className="text-white text-2xl hover:text-neutral-400 transition-colors"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/${lang}/kits/${product.slug}`}
              onClick={onClose}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                product.id === currentProduct.id
                  ? "border-brand-orange bg-neutral-800"
                  : "border-neutral-800 hover:border-neutral-600"
              }`}
            >
              <img
                src={product.heroImage}
                alt={product.name}
                className="w-24 h-14 object-contain flex-shrink-0"
              />
              <div className="flex-1">
                <div className="text-white text-sm font-semibold">{product.name}</div>
                {product.badge && (
                  <span className="text-brand-orange text-xs">{product.badge}</span>
                )}
                <div className="flex gap-3 mt-1 text-xs text-neutral-500">
                  <span>{product.module}</span>
                  <span>{product.price}</span>
                </div>
              </div>
              {product.id === currentProduct.id && (
                <span className="text-brand-orange text-xs">Atual</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </Overlay>
  );
}
```

- [ ] **Step 5: Verify build**

Run: `cd eforce-site && npm run build`

- [ ] **Step 6: Commit**

```bash
git add eforce-site/src/components/product/StickyContextBar.tsx eforce-site/src/components/product/ProductHero.tsx eforce-site/src/components/product/KeySpecs.tsx eforce-site/src/components/product/ModelSwitcher.tsx
git commit -m "feat: add product detail core components — hero, specs, sticky bar, model switcher"
```

---

### Task 10: Product Detail — Editorial Components

**Files:**
- Create: `eforce-site/src/components/product/EditorialIntro.tsx`
- Create: `eforce-site/src/components/product/HighlightsGrid.tsx`
- Create: `eforce-site/src/components/product/SoundDemo.tsx`
- Create: `eforce-site/src/components/product/TechTabs.tsx`

- [ ] **Step 1: Create EditorialIntro**

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";

interface EditorialIntroProps {
  product: Product;
}

export function EditorialIntro({ product }: EditorialIntroProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const { t } = useTranslation();
  const shortName = product.name.split(" ")[0];
  const images = product.galleryImages || [];

  if (!product.editorialHeadline && images.length === 0) return null;

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <div className="editorial-headline text-white mb-6">{shortName}</div>

        {product.editorialHeadline && (
          <h2 className="text-white text-xl md:text-2xl font-light mb-4">
            {product.editorialHeadline}
          </h2>
        )}
        {product.editorialBody && (
          <p className="text-neutral-500 max-w-2xl mx-auto mb-12">
            {product.editorialBody}
          </p>
        )}

        {images.length > 0 && (
          <div className="relative">
            <motion.img
              key={currentImage}
              src={images[currentImage]}
              alt={`${product.name} gallery`}
              className="w-full rounded-lg max-h-[500px] object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            {images.length > 1 && (
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)}
                  className="text-neutral-500 hover:text-white transition-colors"
                >
                  ← {t("product.previous")}
                </button>
                <span className="text-neutral-600 text-sm">
                  {currentImage + 1} / {images.length}
                </span>
                <button
                  onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
                  className="text-neutral-500 hover:text-white transition-colors"
                >
                  {t("product.next")} →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create HighlightsGrid**

```tsx
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { Product } from "@/data/products";

interface HighlightsGridProps {
  product: Product;
}

export function HighlightsGrid({ product }: HighlightsGridProps) {
  const highlights = product.highlights || [];

  const { t } = useTranslation();

  if (highlights.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-neutral-950">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xs uppercase tracking-widest text-neutral-500 mb-8">
          {t("product.highlights")} — {product.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              className="rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <img
                src={h.image}
                alt={h.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-white font-semibold text-sm mb-1">{h.title}</h3>
                <p className="text-neutral-500 text-sm">{h.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create SoundDemo (press & hold)**

```tsx
import { useState, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";

interface SoundDemoProps {
  product: Product;
}

export function SoundDemo({ product }: SoundDemoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { t } = useTranslation();

  if (!product.soundDemo) return null;

  const handleStart = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(product.soundDemo);
      audioRef.current.loop = true;
    }
    audioRef.current.play().catch(() => {});
    setIsPlaying(true);
  }, [product.soundDemo]);

  const handleStop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  }, []);

  return (
    <section className="py-24 px-6 text-center">
      <div className="max-w-2xl mx-auto">
        <p className="text-neutral-500 text-sm mb-8">
          O som não é apenas bom. Ele proporciona uma experiência emocionante.
        </p>

        <button
          onMouseDown={handleStart}
          onMouseUp={handleStop}
          onMouseLeave={handleStop}
          onTouchStart={handleStart}
          onTouchEnd={handleStop}
          className="relative w-24 h-24 rounded-full border-2 border-neutral-700 hover:border-brand-orange transition-colors mx-auto flex items-center justify-center group"
          aria-label="Segure para ouvir"
        >
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-brand-orange"
            animate={isPlaying ? { scale: [1, 1.3, 1], opacity: [1, 0, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1 }}
          />
          <span className="text-neutral-400 group-hover:text-white transition-colors text-xs text-center leading-tight">
            {isPlaying ? t("product.listening") : t("product.holdToListen")}
          </span>
        </button>

        <p className="text-neutral-600 text-xs mt-4">{product.name}</p>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create TechTabs**

```tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/data/products";

interface TechTabsProps {
  product: Product;
}

export function TechTabs({ product }: TechTabsProps) {
  const tabs = product.techTabs || [];
  const [activeTab, setActiveTab] = useState(0);

  if (tabs.length === 0) return null;

  const currentTab = tabs[activeTab];

  return (
    <section className="py-24 px-6 bg-neutral-950">
      <div className="max-w-5xl mx-auto">
        {/* Tab headers */}
        <div className="flex gap-8 border-b border-neutral-800 mb-8">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={`pb-3 text-sm transition-colors ${
                i === activeTab
                  ? "text-white border-b-2 border-brand-orange"
                  : "text-neutral-500 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content: horizontal scroll */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="flex gap-6 overflow-x-auto pb-4 snap-x"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentTab.slides.map((slide) => (
              <div
                key={slide.title}
                className="min-w-[280px] max-w-[320px] flex-shrink-0 snap-start"
              >
                {slide.image && (
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                )}
                <h4 className="text-white font-semibold text-sm mb-1">{slide.title}</h4>
                <p className="text-neutral-500 text-xs">{slide.description}</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Verify build**

Run: `cd eforce-site && npm run build`

- [ ] **Step 6: Commit**

```bash
git add eforce-site/src/components/product/EditorialIntro.tsx eforce-site/src/components/product/HighlightsGrid.tsx eforce-site/src/components/product/SoundDemo.tsx eforce-site/src/components/product/TechTabs.tsx
git commit -m "feat: add editorial product components — intro, highlights, sound demo, tech tabs"
```

---

### Task 11: Product Detail Page Rewrite

**Files:**
- Modify: `eforce-site/src/pages/ProductDetailPage.tsx`

- [ ] **Step 1: Read current ProductDetailPage.tsx**

Read the complete file.

- [ ] **Step 2: Rewrite ProductDetailPage**

Compose all new components into the editorial storytelling flow:

```tsx
import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEO from "@/components/layout/SEO";
import { getProductBySlug } from "@/data/products";
import { StickyContextBar } from "@/components/product/StickyContextBar";
import { ProductHero } from "@/components/product/ProductHero";
import { KeySpecs } from "@/components/product/KeySpecs";
import { EditorialIntro } from "@/components/product/EditorialIntro";
import { HighlightsGrid } from "@/components/product/HighlightsGrid";
import { SoundDemo } from "@/components/product/SoundDemo";
import { TechTabs } from "@/components/product/TechTabs";
import { ModelSwitcher } from "@/components/product/ModelSwitcher";
import FinishSelector from "@/components/product/FinishSelector";
import CompareModels from "@/components/product/CompareModels";
import InTheBox from "@/components/product/InTheBox";

export default function ProductDetailPage() {
  const { model, lang } = useParams();
  const { t } = useTranslation();
  const [switcherOpen, setSwitcherOpen] = useState(false);

  const product = getProductBySlug(model || "");

  if (!product) {
    return <Navigate to={`/${lang}/line`} replace />;
  }

  return (
    <>
      <SEO
        title={`${product.name} | E-Force`}
        description={product.description}
      />

      <div className="bg-brand-black min-h-screen">
        <StickyContextBar
          product={product}
          onSwitchModel={() => setSwitcherOpen(true)}
        />

        <ProductHero product={product} />

        <KeySpecs product={product} />

        <EditorialIntro product={product} />

        <HighlightsGrid product={product} />

        <SoundDemo product={product} />

        <TechTabs product={product} />

        {/* Finish selector */}
        {product.finishes.length > 0 && (
          <section className="py-24 px-6">
            <div className="max-w-5xl mx-auto">
              <FinishSelector product={product} />
            </div>
          </section>
        )}

        {/* In the box */}
        {product.inTheBox.length > 0 && (
          <section className="py-24 px-6 bg-neutral-950">
            <div className="max-w-5xl mx-auto">
              <InTheBox items={product.inTheBox} />
            </div>
          </section>
        )}

        {/* Compare models */}
        <section className="py-24 px-6" id="dealers">
          <div className="max-w-7xl mx-auto">
            <CompareModels currentProduct={product} />
          </div>
        </section>
      </div>

      <ModelSwitcher
        isOpen={switcherOpen}
        onClose={() => setSwitcherOpen(false)}
        currentProduct={product}
      />
    </>
  );
}
```

- [ ] **Step 3: Verify build and visual check**

Run: `cd eforce-site && npm run build && npm run dev`
Navigate to a product page (e.g., `/pt/kits/ef5-v2`) and verify:
- Giant model name in background
- Key specs with large numbers
- Sticky bar appears on scroll
- Model switcher flyout opens from sticky bar

- [ ] **Step 4: Commit**

```bash
git add eforce-site/src/pages/ProductDetailPage.tsx
git commit -m "feat: rewrite product detail page with Porsche-style editorial layout"
```

---

## Phase 3: Polish & Integration

### Task 12: Update Existing Components for Dark Theme

**Files:**
- Modify: `eforce-site/src/components/product/FinishSelector.tsx`
- Modify: `eforce-site/src/components/product/CompareModels.tsx`
- Modify: `eforce-site/src/components/product/InTheBox.tsx`

- [ ] **Step 1: Read FinishSelector, CompareModels, InTheBox**

Read all three files to understand current styling.

- [ ] **Step 2: Update FinishSelector for dark theme**

Replace light backgrounds (`bg-white`, `bg-gray-*`) with dark equivalents (`bg-neutral-900`, `bg-neutral-800`). Replace dark text colors with white/neutral. Keep existing functionality intact.

- [ ] **Step 3: Rewrite CompareModels as horizontal carousel**

Replace current grid with a horizontal scrolling carousel. Show kits in similar price range:

```tsx
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { products } from "@/data/products";
import type { Product } from "@/data/products";
import { HoverVideoCard } from "@/components/ui/HoverVideoCard";

interface CompareModelsProps {
  currentProduct: Product;
}

export default function CompareModels({ currentProduct }: CompareModelsProps) {
  const { lang } = useParams();
  const { t } = useTranslation();

  // Show all models except current, sorted by price proximity
  const otherModels = products
    .filter((p) => p.id !== currentProduct.id)
    .sort((a, b) => Math.abs(a.priceValue - currentProduct.priceValue) - Math.abs(b.priceValue - currentProduct.priceValue));

  return (
    <div>
      <h2 className="text-xs uppercase tracking-widest text-neutral-500 mb-6">
        {t("product.whichKit")}
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
        {otherModels.map((product) => (
          <Link
            key={product.id}
            to={`/${lang}/kits/${product.slug}`}
            className="min-w-[260px] max-w-[280px] flex-shrink-0 snap-start bg-neutral-900 rounded-lg border border-neutral-800 hover:border-neutral-600 transition-colors overflow-hidden"
          >
            <HoverVideoCard
              image={product.heroImage}
              videoSrc={product.videoPreview}
              alt={product.name}
              className="h-36"
            />
            <div className="p-4">
              <h3 className="text-white font-semibold text-sm">{product.name}</h3>
              {product.badge && (
                <span className="text-brand-orange text-xs">{product.badge}</span>
              )}
              <div className="flex gap-3 mt-2 text-xs text-neutral-500">
                <span>{product.module}</span>
                <span>{product.price}</span>
              </div>
              <div className="flex gap-4 mt-3 text-xs">
                <span className="text-neutral-400 hover:text-white transition-colors">
                  {t("product.allSpecs")}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-4">
        <span className="text-xs text-brand-orange cursor-pointer hover:text-white transition-colors">
          {t("product.compareDetail")}
        </span>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Update InTheBox for dark theme**

Replace light backgrounds with dark. Adjust text colors.

- [ ] **Step 5: Verify build**

Run: `cd eforce-site && npm run build`

- [ ] **Step 6: Commit**

```bash
git add eforce-site/src/components/product/FinishSelector.tsx eforce-site/src/components/product/CompareModels.tsx eforce-site/src/components/product/InTheBox.tsx
git commit -m "feat: update FinishSelector, CompareModels, InTheBox to dark theme"
```

---

### Task 13: Add i18n Keys for New Content

**Files:**
- Modify: `eforce-site/src/locales/pt/common.json`
- Modify: `eforce-site/src/locales/en/common.json`

- [ ] **Step 1: Read current locale files**

Read both PT and EN locale files to understand existing key structure.

- [ ] **Step 2: Add new keys to PT**

Add under appropriate sections:

```json
{
  "showcase": {
    "label": "Modelos em Destaque",
    "viewAll": "Ver todos os modelos"
  },
  "line": {
    "title": "Visão Geral dos Modelos",
    "compare": "Comparar modelos",
    "resetFilters": "Resetar filtros",
    "all": "Todos",
    "module": "Módulo",
    "priceRange": "Faixa de Preço",
    "entryLine": "Linha Entrada",
    "midLine": "Linha Intermediária",
    "premiumLine": "Linha Premium",
    "noResults": "Nenhum modelo encontrado com esses filtros."
  },
  "product": {
    "switchModel": "Mudar de modelo",
    "findDealer": "Encontrar Dealer",
    "allSpecs": "Todos os detalhes técnicos",
    "holdToListen": "Segure para ouvir",
    "listening": "Ouvindo...",
    "highlights": "Destaques",
    "whichKit": "Qual kit é ideal para você?",
    "compareDetail": "Comparar em detalhes",
    "current": "Atual",
    "previous": "Anterior",
    "next": "Próximo"
  }
}
```

- [ ] **Step 3: Add equivalent EN keys**

```json
{
  "showcase": {
    "label": "Featured Models",
    "viewAll": "View all models"
  },
  "line": {
    "title": "Model Overview",
    "compare": "Compare models",
    "resetFilters": "Reset filters",
    "all": "All",
    "module": "Module",
    "priceRange": "Price Range",
    "entryLine": "Entry Line",
    "midLine": "Mid-Range Line",
    "premiumLine": "Premium Line",
    "noResults": "No models found with these filters."
  },
  "product": {
    "switchModel": "Change model",
    "findDealer": "Find Dealer",
    "allSpecs": "All technical details",
    "holdToListen": "Hold to listen",
    "listening": "Listening...",
    "highlights": "Highlights",
    "whichKit": "Which kit is right for you?",
    "compareDetail": "Compare in detail",
    "current": "Current",
    "previous": "Previous",
    "next": "Next"
  }
}
```

- [ ] **Step 4: Verify build**

Run: `cd eforce-site && npm run build`

- [ ] **Step 5: Commit**

```bash
git add eforce-site/src/locales/
git commit -m "feat: add i18n keys for redesigned navigation, line page, and product detail"
```

---

### Task 14: Update Secondary Pages Theme

**Files:**
- Modify: `eforce-site/src/pages/StoryPage.tsx`
- Modify: `eforce-site/src/pages/TechnologyPage.tsx`
- Modify: `eforce-site/src/pages/DealersPage.tsx`
- Modify: `eforce-site/src/pages/SupportPage.tsx`
- Modify: `eforce-site/src/pages/NewsPage.tsx`
- Modify: `eforce-site/src/pages/NotFoundPage.tsx`

- [ ] **Step 1: Read all secondary pages**

Read each page to understand current styling.

- [ ] **Step 2: Update each page**

For each page:
- Add `bg-brand-black min-h-screen` to root container
- Replace `bg-white`/`bg-gray-*` with dark equivalents
- Replace dark text colors (`text-gray-900`, `text-black`) with `text-white`/`text-neutral-*`
- Add `pt-24` padding for navbar clearance
- Keep existing content and structure intact

- [ ] **Step 3: Verify build and spot-check**

Run: `cd eforce-site && npm run build && npm run dev`
Navigate to each page and verify dark theme applies correctly.

- [ ] **Step 4: Commit**

```bash
git add eforce-site/src/pages/StoryPage.tsx eforce-site/src/pages/TechnologyPage.tsx eforce-site/src/pages/DealersPage.tsx eforce-site/src/pages/SupportPage.tsx eforce-site/src/pages/NewsPage.tsx eforce-site/src/pages/NotFoundPage.tsx
git commit -m "feat: update secondary pages to dark theme"
```

---

### Task 15: Final Integration & Cleanup

- [ ] **Step 1: Full build verification**

Run: `cd eforce-site && npm run build`
Ensure zero errors.

- [ ] **Step 2: Full visual walkthrough**

Run: `npm run dev` and check every page:
- Home: video hero, product showcase, CTAs
- Line: sidebar filters, grouped grid, hover video (fallback to zoom if no video)
- Product detail: hero with giant name, specs, sticky bar, model switcher, sound demo (if audio present)
- Story, Technology, Dealers, Support, News: dark theme, navbar works
- Language switching works across all pages
- Mobile responsive: check at 375px width

- [ ] **Step 3: Remove unused components (if any)**

Check if `ScrollExpandMedia.tsx` or other removed components have any remaining imports. Remove dead imports.

- [ ] **Step 4: Lint check**

Run: `cd eforce-site && npm run lint`
Fix any lint errors.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: final cleanup and integration verification for Porsche-style redesign"
```
