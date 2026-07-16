---
name: Younes Kazemi Portfolio
description: Dark FA-first freelance portfolio — real work, clear phases, quiet craft
colors:
  background: "#050508"
  foreground: "#f4f4f5"
  muted: "#b0b0ba"
  muted-soft: "#8b8b96"
  card: "#0c0c12"
  card-border: "#ffffff17"
  primary: "#38bdf8"
  primary-soft: "#38bdf824"
  primary-hover: "#7dd3fc"
  accent-ink: "#020617"
  glow: "#38bdf82e"
  mesh-violet: "#a78bfa24"
  mesh-emerald: "#34d39917"
  selection: "#38bdf859"
typography:
  display:
    fontFamily: "Vazirmatn, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Vazirmatn, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Vazirmatn, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Vazirmatn, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  body-lg:
    fontFamily: "Vazirmatn, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Vazirmatn, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "normal"
rounded:
  sm: "0.375rem"
  md: "0.5rem"
  card: "0.875rem"
  full: "9999px"
spacing:
  touch: "2.75rem"
  section-y: "clamp(4.5rem, 11vw, 7.5rem)"
  page-x: "1.25rem"
  content-max: "72rem"
  gap-md: "1rem"
  gap-lg: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.full}"
    padding: "0 1.5rem"
    height: "{spacing.touch}"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.accent-ink}"
  button-secondary:
    backgroundColor: "#ffffff0a"
    textColor: "{colors.foreground}"
    rounded: "{rounded.full}"
    padding: "0 1.25rem"
    height: "{spacing.touch}"
  surface-card:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.card}"
    padding: "1.5rem"
  chip:
    backgroundColor: "#ffffff0a"
    textColor: "#d4d4d8"
    rounded: "{rounded.full}"
    padding: "0.375rem 0.75rem"
  nav-link:
    textColor: "#a1a1aa"
    rounded: "{rounded.md}"
    padding: "0.5rem 0.75rem"
    height: "{spacing.touch}"
---

# Design System: Younes Kazemi Portfolio

## Overview

**Creative North Star: "The Quiet Workshop"**

A dark, calm bench for real tools and screenshots — craft without theatrics. The interface feels like a focused freelaner workspace at night: near-black surfaces, one sky-cyan accent, and browser-framed product shots that carry the proof. Personality is **clear · capable · direct** (see PRODUCT.md): short copy, live links, phased delivery language, FA-first hospitality.

Density is airy on the home narrative and tighter on the `/projects` catalog. Motion is present but subordinate — scroll depth and in-view reveals support hierarchy; they never replace content. The system explicitly rejects **generic AI SaaS dark templates** (purple glows as identity, hero-metric rows, identical icon cards, startup landing clichés).

**Key Characteristics:**

- Near-black base (`#050508`) with sky accent used sparingly for CTAs and focus
- FA-first RTL default; EN as peer via client toggle
- Pill primary/secondary buttons; 14px surface cards with ring, not heavy shadow
- Real project screenshots in browser chrome — imagery is the hero, not abstract blobs
- Practical a11y: focus rings, contrast, 44px touch, reduced-motion kill-switch

## Colors

Restrained strategy: tinted near-black neutrals + one sky accent. Accent rarity is intentional.

### Primary

- **Sky Signal** (`#38bdf8`): Primary actions (`.btn-primary`), focus rings, link emphasis, selection tint. Soft form (`#38bdf824`) for glows and ambient mesh only.
- **Sky Lift** (`#7dd3fc`): Primary button hover.
- **Accent Ink** (`#020617`): Text on sky buttons for contrast.

### Secondary (ambient only)

- **Mesh Violet** (`#a78bfa24`) and **Mesh Emerald** (`#34d39917`): Hero gradient mesh only — never identity-level accents on UI chrome.

### Neutral

- **Void Black** (`#050508`): Page background.
- **Zinc Bright** (`#f4f4f5`): Headings and primary text.
- **Readable Muted** (`#b0b0ba`): Body/supporting text (contrast-tuned on void).
- **Soft Muted** (`#8b8b96`): De-emphasized meta when needed.
- **Panel** (`#0c0c12`): Cards and surface containers.
- **Hairline** (`#ffffff17` ≈ `rgba(255,255,255,0.09)`): Card borders / rings.

**The One Voice Rule.** Sky is for action and focus. Do not introduce a second brand accent for decoration. Project-specific accent dots on case studies may use each project's own `accent` field; they do not replace sky for system CTAs.

**The No SaaS Purple Rule.** Do not let purple mesh or violet chrome become the brand. Mesh is atmosphere only.

## Typography

**Display / Body Font:** Vazirmatn (Arabic + Latin) with Inter as Latin fallback via `next/font`  
**Mono Font:** System UI mono for process step numbers and browser chrome URLs only

**Character:** Single sans stack optimized for Persian and English. Semibold headings, regular body. No display serif, no Inter-as-only-brand flex.

### Hierarchy

- **Display** (600, ~3.75rem / `text-6xl` on large, line-height ~1.08, letter-spacing `-0.025em`): Hero name only.
- **Headline** (600, ~2.25–2.5rem, tight leading): Section titles and case-study project names.
- **Title** (600, ~1.25rem): Card titles, service names.
- **Body** (400, 1rem–1.125rem, line-height ~1.625, max ~65–75ch where prose is long): Descriptions, about, case body.
- **Label** (500, 0.875rem): Nav, buttons, chips, meta.
- **Mono label** (600, 0.875rem tabular): Process steps `01`, case study indices.

Headings use `text-wrap: balance`; paragraphs use `text-wrap: pretty`. Letter-spacing floor on display is `-0.025em` (never tighter than `-0.04em`).

**The No Kicker Grammar Rule.** Do not put tiny uppercase tracked eyebrows above every section. Section identity is the heading itself.

## Elevation

Depth is **tonal + ring, rare lift**. Surfaces sit on void via slightly lighter panel color and a 1px hairline/ring. Soft multi-stop shadows are reserved for **browser frames** around project previews — not for every card.

### Shadow Vocabulary

- **Frame lift** (`0 8px 0 0 rgba(0,0,0,0.35), 0 20px 40px -16px rgba(0,0,0,0.75)` + `ring-1 ring-white/8`): `BrowserFrame` only.
- **Nav glass**: translucent dark bar + blur when scrolled — functional, not decorative glassmorphism everywhere.
- **Ambient orbs**: large blurred radial blobs in the hero mesh; non-interactive, low opacity.

**The Flat-At-Rest Rule.** `.surface-card` has border + fill, no drop shadow. Do not pair 1px border with wide soft shadows on buttons or generic cards (ghost-card ban).

## Components

### Buttons

- **Shape:** Full pill (`9999px`)
- **Primary:** Sky fill, accent-ink text, min-height 44px (`2.75rem`), horizontal padding 1.5rem. Hover → sky lift; active → `scale(0.98)`.
- **Secondary:** Hairline border, faint white fill, min-height 44px. Hover → sky-tinted border + slightly brighter fill.
- **Focus:** 2px solid sky outline, 3px offset (global focus-visible).

### Chips / tags

- Soft pill or slightly rounded pill: border `white/10`, fill `white/[0.04]`, text zinc-300, small type. Used for stack tags and skill items — not as primary navigation.

### Cards / containers

- **Corner:** 14px (`0.875rem`) — under the 16px ceiling; never 24px+ “blob cards”
- **Background:** Panel `#0c0c12`
- **Border:** Hairline card-border
- **Padding:** 1.25–2rem depending on density
- **Hover:** Optional border brighten; no lift shadow on generic cards

### Browser frame (signature)

- Rounded 14px chrome with traffic-light dots, mono URL bar, screenshot region
- Carries real product imagery; hover may translate frame slightly upward on case studies

### Navigation

- Fixed top bar; transparent at rest, glass when scrolled
- Links: zinc muted → bright on hover; min-height 44px hit areas
- Mobile: hamburger → full-width list with 44px rows; language toggle always visible

### Filters (All work)

- Pill tabs, height 44px; active = primary sky fill; inactive = bordered ghost

### Forms / inputs

- No contact form on site — contact is Telegram / mailto cards. If inputs are added later: dark panel, hairline border, sky focus ring, 44px height.

## Do's and Don'ts

### Do:

- **Do** lead with live projects and real screenshots as proof.
- **Do** keep primary CTA as contact (Telegram / email) and secondary as browse work.
- **Do** preserve FA-first RTL defaults and readable muted body (`#b0b0ba` or brighter) on void.
- **Do** use shared primitives: `.btn-primary`, `.btn-secondary`, `.surface-card`, CSS tokens in `app/globals.css`.
- **Do** honor `prefers-reduced-motion` (global transition kill + Framer `useReducedMotion`).
- **Do** keep touch targets ≥ 44px on primary controls (nav, filters, CTAs, slider controls).

### Don't:

- **Don't** ship **generic AI SaaS dark templates** — purple identity glows, hero-metric stat rows, identical icon+title+text card grids, startup cliché scaffolding.
- **Don't** add tiny uppercase tracked eyebrows above every section.
- **Don't** use gradient text (`background-clip: text`) or side-stripe accent borders (`border-left` > 1px as decoration).
- **Don't** pair 1px border + wide soft drop shadows on ordinary cards/buttons.
- **Don't** over-round cards past ~14–16px; pills are for buttons/chips only.
- **Don't** invent a second system accent or replace sky CTAs with project accent colors.
- **Don't** gate content visibility solely on scroll animations (content must be readable without JS motion).
