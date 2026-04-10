# E-Force Design System — Mandatory Rules

You are building the E-Force electronic drums website. Every component you generate MUST follow these rules. They are non-negotiable. The goal is a site that feels like Porsche, Apple, and Bang & Olufsen — not a startup template.

---

## 1. THE PRODUCT IS THE PAGE

The drum kit is the hero, not the text. At any scroll position, the product image must occupy at least 60-70% of the visible viewport. Text exists to caption the image, not the other way around.

- Hero section: the kit fills the bottom 70% of the screen. Text floats above it like a caption, not a billboard.
- Product pages: every section leads with a full-bleed image. Text comes second.
- Never show a section that is only text. Every block needs a visual anchor.

How Porsche does it: the Taycan hero image is 3840×1158px, covering the full viewport. The car IS the page.
How Apple does it: the iPhone fills the screen. The headline is 6 words max floating on top.
How Bang & Olufsen does it: the Beolab 90 product page has 35 words total describing a $211,000 speaker. Thirty-five.

## 2. MAXIMUM 35-45 WORDS PER SECTION

Each section gets ONE thought. Not two, not three. One headline (3-8 words), one supporting sentence (15-25 words), one CTA. That's it.

Bad (current E-Force):
> "E-Force redefines what an electronic drum kit can be — with wood-shell aesthetics, exclusive finishes, and the acoustic expertise of Odery Drums Brazil. Our partnership with Odery brings decades of acoustic mastery to every kit in the line."

Good (Porsche/Apple style):
> "Where acoustic design meets electronic performance."
> (that's the entire section text. The image does the rest.)

Rules:
- Headlines: max 8 words. Font weight 700. Size: `clamp(2.5rem, 6vw, 6rem)`.
- Subtext: max 25 words. Font weight 300. Color: `rgba(255,255,255,0.5)`.
- Body paragraphs: NEVER more than 3 short sentences per section.
- If you find yourself writing a fourth sentence, you need a new section.

## 3. NUMBERS AS HEROES

Technical specs are visual anchors, not list items. When displaying a number, it must be the largest typography on screen.

Implementation:
```
937          ← font-size: clamp(4rem, 10vw, 9rem), font-weight: 800, color: white
Onboard Sounds ← font-size: 11px, uppercase, letter-spacing: 0.2em, color: rgba(255,255,255,0.35)
```

Display specs in a horizontal strip with massive numbers:
- "937" sounds | "F50" module | "3" finishes | "USB-C" power
- Each number occupies its own visual column
- Number size: at least 4× larger than the label below it

Reference: Porsche shows "2.3s" (0-100km/h) at 80px+ font size. The number hits you before you read what it means.

## 4. RHYTHM: EMOTION → SPEC → EMOTION → SPEC

Never stack two emotional sections or two technical sections in a row. Alternate.

Correct homepage flow:
1. HERO — emotional (kit image + tagline) → dark bg
2. MANIFESTO — emotional (brand statement, word-by-word reveal) → dark bg
3. SPECS STRIP — technical (937 sounds / F50 / BT / USB-C as giant numbers) → light bg (#f5f3ef)
4. FINISH SWITCHER — emotional (interactive, visual) → dark bg
5. PRODUCT SPREAD — technical (model details, specs) → alternating
6. ODERY STORY — emotional (heritage, craftsmanship) → split layout
7. TECH PILLARS — technical (features grid) → dark bg
8. CTA — emotional (find a dealer) → dark bg with glow

## 5. SECTION CONTRAST: ALTERNATE DARK AND LIGHT

Never have more than 2 consecutive dark sections. Insert light sections (#f5f3ef background with #0a0a0a text) to create visual "chapters" and reset the eye.

Dark sections: `background: #0a0a0a`, text white/off-white
Light sections: `background: #f5f3ef`, text `#0a0a0a`
Surface sections: `background: #111111` (for subtle variation within dark)

Between every section, add a gradient divider:
```css
background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
height: 1px;
```

## 6. WHITESPACE IS NOT EMPTY — IT'S THE DESIGN

Section padding must be proportional to viewport:
```css
padding: clamp(6rem, 15vh, 12rem) clamp(1.5rem, 6vw, 6rem);
```

- Between elements within a section: `clamp(1.5rem, 3vh, 3rem)`
- Between sections: `clamp(6rem, 15vh, 12rem)`
- Never use fixed values like `py-12` or `mb-8`. Always use clamp().
- At any scroll position, at least 40% of the viewport should be empty space.

Reference: Apple's iPhone page uses 50-60% whitespace per viewport. The emptiness IS the premium feeling.

## 7. TYPOGRAPHY WITH clamp() — NO FIXED SIZES

Never use Tailwind's fixed text sizes (text-xl, text-5xl, etc). Always use clamp() for fluid scaling:

```css
/* Display / Hero headlines */
font-size: clamp(2.8rem, 7vw, 7rem);
line-height: 0.92;
letter-spacing: -0.04em;
font-weight: 700;

/* Section headlines */
font-size: clamp(2rem, 4.5vw, 4rem);
line-height: 0.95;
letter-spacing: -0.03em;
font-weight: 700;

/* Subheadlines */
font-size: clamp(1rem, 2vw, 1.3rem);
line-height: 1.6;
letter-spacing: -0.01em;
font-weight: 300;

/* Labels (section tags like "ENGINEERING", "HERITAGE") */
font-size: 11px;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.3em;
color: #ff4a1c;

/* Body text */
font-size: clamp(0.9rem, 1.2vw, 1.05rem);
line-height: 1.75;
font-weight: 400;
color: rgba(255,255,255,0.5);

/* Spec numbers (the giant ones) */
font-size: clamp(4rem, 10vw, 9rem);
font-weight: 800;
letter-spacing: -0.04em;
line-height: 0.85;
```

## 8. ANIMATIONS: SLOW, DELIBERATE, EARNED

Every animation must feel like it has weight. Nothing pops in — everything glides.

Timing rules:
- Entrance animations: 0.8s - 1.2s (not 0.3s like templates use)
- Hover transitions: 0.4s - 0.6s
- Crossfades (finish switcher): 0.5s
- Easing: always `cubic-bezier(0.16, 1, 0.3, 1)` — this is the "premium" curve
- Never use `ease` or `ease-in-out` — these are default/generic
- Stagger between elements: 0.15s

Scroll reveals:
- translateY: start at 40px (not 20px — needs visible travel distance)
- opacity: 0 → 1 over the full duration
- Use IntersectionObserver with threshold: 0.1 and rootMargin: '0px 0px -60px 0px'

Manifesto word reveal:
- Split text into <span> per word
- Each word: opacity 0 → 1, color from rgba(255,255,255,0.15) → white
- Stagger: 50ms per word
- Respect `prefers-reduced-motion`

## 9. COLOR — ONLY THREE COLORS EXIST

The palette is:
- `#0a0a0a` — primary background (near-black, never pure #000000)
- `#ffffff` — primary text on dark (but prefer rgba(255,255,255,0.95) for slight softness)
- `#ff4a1c` — the ONLY accent. Used for: section labels, CTAs, active states, hover accents

Supporting tones (these are NOT colors, they're opacities of white):
- `rgba(255,255,255,0.50)` — secondary text
- `rgba(255,255,255,0.25)` — tertiary text (labels, captions)
- `rgba(255,255,255,0.08)` — borders, dividers
- `#111111` — surface (cards, subtle elevation)
- `#1a1a1a` — surface-2 (nested cards)
- `#f5f3ef` — light section background

NEVER introduce new colors. No blue, no green, no purple. If something needs emphasis, use the orange. If it needs subtlety, use lower opacity white. That's it.

Reference: Rivian uses white + one yellow. Porsche uses black + one blue. Restraint = premium.

## 10. PRODUCT IMAGES — TREATMENT RULES

All kit renders have transparent backgrounds (white removed via processing). Display rules:

```css
/* All product images on dark backgrounds */
filter: drop-shadow(0 40px 80px rgba(0,0,0,0.6));

/* Ambient glow behind product (pseudo-element) */
background: radial-gradient(ellipse, rgba(255,74,28,0.06) 0%, transparent 70%);

/* Hover state */
transform: scale(1.03) translateY(-8px);
transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
```

Image sizing:
- Hero: width `clamp(500px, 80vw, 1100px)`
- Product spread: max-width `600px`
- Line cards: max-height `240px`, object-fit: contain
- Always add `loading="lazy"` below the fold, `loading="eager"` on hero

## 11. PROGRESSIVE DISCLOSURE — HIDE COMPLEXITY

Don't dump all specs at once. Layer the information:

Layer 1 (visible): 3-4 hero numbers (937 sounds / F50 / BT / USB-C)
Layer 2 (tabs): Feature categories as clickable tabs ("Module", "Connectivity", "Dimensions")
Layer 3 (expandable): Full spec table in an accordion, collapsed by default on mobile

Reference: Porsche uses tabs ("Engine and gearbox | Battery and charging | Chassis"). Sonos uses interactive hotspot diagrams. Apple uses horizontal card carousels.

## 12. PRODUCT SPREADS — EDITORIAL LAYOUT

Each product model gets a full-viewport spread, alternating image position:

```
Model 1: [IMAGE left 55%] [INFO right 45%]  — dark bg
Model 2: [INFO left 45%]  [IMAGE right 55%] — surface bg (#111)
Model 3: [IMAGE left 55%] [INFO right 45%]  — dark bg
```

Each spread contains:
- Badge (if applicable): "FLAGSHIP" / "BEST SELLER" — small pill, uppercase
- Model name: largest text, font-weight 700
- Tagline: one short sentence, font-weight 300
- 3-4 spec numbers in horizontal strip
- Price: displayed prominently (like B&O does — price is a design statement)
- 2 CTAs: primary (Configure & Buy) + ghost (Full Specs)

Mobile: stack vertically, image on top (always), info below.

## 13. THE FINISH SWITCHER — MAKE IT THE STAR

This is E-Force's single biggest differentiator. No other e-drum brand has multiple finish options. Treat it like Apple treats the iPhone color picker.

Requirements:
- Large image area (60% of section width)
- Circular swatches with the actual finish color
- Active swatch gets orange ring: `box-shadow: 0 0 0 2px #0a0a0a, 0 0 0 5px #ff4a1c`
- Image crossfade on selection: opacity transition 0.5s
- Preload all finish images so swap is instant
- Label updates smoothly: "Selected: Blue Marine Pearl"

## 14. MOBILE-FIRST, NOT MOBILE-ADAPTED

Design for 375px first, then expand. On mobile:
- Hero: text takes top 40%, product image takes bottom 60%
- Product spreads: always stacked (image top, info bottom)
- Spec numbers: 2 per row instead of 4
- Line cards: horizontal scroll with snap
- Touch targets: minimum 44×44px
- Reduce animation distances (translateY: 24px instead of 40px)

## 15. WHAT TO AVOID — THE "GENERIC" CHECKLIST

If any of these are true, the design is generic. Fix it:

- [ ] Text occupies more than 40% of any viewport → reduce text, enlarge images
- [ ] More than 45 words in a section → cut ruthlessly
- [ ] Fixed Tailwind sizes (text-5xl) instead of clamp() → switch to clamp
- [ ] Animations under 0.5s duration → slow them down
- [ ] All dark sections with no light sections → add contrast alternation
- [ ] Numbers displayed at body text size → make them 4× larger
- [ ] More than 3 colors in the palette → strip back to black/white/orange
- [ ] Product image smaller than 50% of viewport → enlarge significantly
- [ ] Section padding under 4rem → increase to clamp(6rem, 15vh, 12rem)
- [ ] Using `ease-in-out` instead of custom cubic-bezier → change easing
- [ ] All specs visible at once without progressive disclosure → add tabs/accordions
