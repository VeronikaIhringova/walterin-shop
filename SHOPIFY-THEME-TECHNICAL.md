# Walterin — Shopify Theme Technical Reference

> **Status:** Pre-launch. The Walterin storefront is being set up for the launch of Comics Tarot of Consciousness. Sections marked **[TBD]** are placeholders for decisions still to be made during the build.

This file is the technical companion to `walterin.md`, `WALTERIN-MASTER-REFERENCE.md`, and `BRAND-POSITIONING.md`. Use it for any work touching the storefront codebase, theme settings, or deployment.

---

## Overview

The Walterin storefront will be built on **Shopify**. Theme base, theme ID, and dev/live IDs are **[TBD]** until the theme is selected and pushed.

Walterin is an editorial brand-led store, not a feature-rich e-commerce build. Resist the default Shopify section patterns (related products, trust badges, generic blocks) wherever they undercut the editorial tone. The storefront should read like an exhibition catalog, not a product feed.

---

## Development Workflow (planned)

Shopify themes are developed using the Shopify CLI:

```sh
# Authenticate with Shopify
shopify auth login

# Start dev server with live preview against the store
shopify theme dev --store=<walterin-handle>.myshopify.com

# Push to a specific theme (use the dev theme ID once assigned)
shopify theme push --theme <DEV_THEME_ID>

# Pull latest theme from Shopify
shopify theme pull --theme <DEV_THEME_ID>

# List available themes
shopify theme list
```

There are no linting, testing, or build commands at this stage — pure Liquid / CSS / JS.

> **[TBD]** Store handle, dev theme ID, live theme ID. Fill in as soon as the store is created.

---

## Architecture

### Template language
All dynamic content uses [Liquid](https://shopify.dev/docs/api/liquid) — Shopify's template language. Liquid files use `.liquid` extension and can include variables (`{{ }}`), tags (`{% %}`), and filters.

### Directory roles (Shopify default)

| Directory | Purpose |
|---|---|
| `layout/` | HTML shells — `theme.liquid` is the primary layout for all pages |
| `templates/` | JSON files defining which sections appear on each page type |
| `sections/` | Reusable, customizable page sections (the main building blocks) |
| `snippets/` | Small Liquid partials included via `{% render %}` |
| `blocks/` | Custom block components (if the theme uses Online Store 2.0 blocks) |
| `assets/` | Static CSS, JS, images — served directly from Shopify CDN |
| `config/` | `settings_schema.json` (theme editor UI) + `settings_data.json` (saved values) |
| `locales/` | Translation strings — `sk.json` and `en.json` are the two we care about |

### JavaScript & CSS posture
- Vanilla JS, no framework dependencies (Shopify Dawn-style baseline).
- Component-scoped CSS files per section/snippet.
- Design tokens via CSS Custom Properties — see "Color System" and "Typography" below.

> **[TBD]** Final theme base (Dawn or alternative), Online Store 2.0 vs. legacy block model, custom theme name.

---

## Color System

### Palette (working — to be locked from final packaging proof)

| Token | Hex | Usage |
|---|---|---|
| `--color-walterin-red` | **[TBD]** | Brand-signature accent: tuck-box back, key CTAs, accent details. Used sparingly. **Never as a default page background.** |
| `--color-canvas` | **[TBD]** | Off-white / cream — page canvas, section default backgrounds, packaging base feel |
| `--color-ink` | **[TBD]** | Deep ink — body text, headlines, line work |
| `--color-warm-neutral` | **[TBD]** | Warm neutral — secondary surfaces, supporting UI |
| `--color-link-hover` | **[TBD]** | Hover state — likely a low-saturation tint of brand red |

### Usage rules

- **Walterin Red is sacred.** It marks the brand. Use it on the tuck-box back panel, the primary CTA button, and small accents. Never as a large section background. Never in body text.
- **Canvas is the default surface.** Most sections sit on canvas; ink is the primary type color.
- **Don't introduce new colors without a deliberate reason.** Greys, beiges, accent tints — bring them in only when the design genuinely needs them.

### Shopify color schemes (planned)

| Scheme | Background | Use |
|---|---|---|
| `scheme-1` (default) | canvas | Primary content surface |
| `scheme-2` | warm neutral | Secondary sections, cards |
| `scheme-3` | ink | Dark sections (rare — used only when the artwork demands a dark frame) |
| `scheme-4` | walterin-red | Reserved for hero-CTA / single editorial moment per page |

> **[TBD]** Lock scheme tokens in `config/settings_data.json` once palette hex values are confirmed.

---

## Typography

- **Display / brand:** **Walterin Bold** — used for the wordmark, page heroes, packaging headlines, product page titles
- **Editorial:** **Cormorant Garamond** — long-form prose, story passages, editorial pull-quotes, italic emphasis
- **Body / UI:** **[TBD]** — needs a reliable workhorse sans for forms, navigation, captions, and small UI text. Cormorant is too literary for UI; Walterin Bold is too display.
- **Loading:** Self-host or load via Shopify's preferred font CDN. Use `font-display: swap` to avoid invisible text during load.

### Type scale (working)
- Hero / page titles: Walterin Bold, generous size, tight tracking
- Section headings: Walterin Bold or Cormorant Garamond depending on the section's role (display vs. editorial)
- Body: workhorse sans, generous line-height (1.5+), restrained measure (~65 characters per line)
- Small UI: workhorse sans, tracked-out slightly for legibility

> **[TBD]** Pick the workhorse sans, lock the type scale in `--font-*` custom properties, document overrides per page type.

---

## Page Architecture

### Homepage (`templates/index.json`) — planned section order

> Resist Shopify defaults. The homepage should feel like the cover spread of an illustrated book, not a category page.

| # | Section | Purpose |
|---|---|---|
| 1 | Hero — universe + product | Single illustrated frame + headline. Below: "Comics Tarot of Consciousness — coming / out now." |
| 2 | Story / about Walterin | One paragraph, Cormorant Garamond. Walter, the universe, why this exists. |
| 3 | Featured product — the Tarot | Editorial card, not standard product card. Big image, short copy, CTA. |
| 4 | Card reveals | A rotating selection of 3–5 cards from the deck — visual atmosphere. |
| 5 | Press / quote (post-launch) | Single quote from press or early review, when available. Hide section if empty. |
| 6 | Newsletter | "Be first when the next chapter lands." SK + EN copy. |

### Product page (Comics Tarot of Consciousness) — planned section order

See `PRODUCT-PAGE-IMPROVEMENT-PLAN.md` for the active backlog.

| # | Section | Purpose |
|---|---|---|
| 1 | Main product (Shopify default extended) | Gallery, title, price, variant picker (if applicable), buy button, trust row |
| 2 | Story / what's in the deck | Editorial copy. Cormorant for prose. |
| 3 | Card preview gallery | Selected card scans (no spoilers — tease, don't summarize) |
| 4 | Specs / format | Card count, card stock, dimensions, packaging, edition size |
| 5 | About the illustrator | Walter — short bio, link to other work / books |
| 6 | FAQ | Shipping, returns, "is this for tarot beginners?", language of packaging |
| 7 | Reviews | Once the review tool is wired and verified reviews exist. Hide on launch day if empty. |

### Block / section naming

If the theme uses Online Store 2.0 custom blocks, use the prefix `walterin_*` and keep block schema names ≤ 25 characters (Shopify limit). Example file names: `blocks/walterin_card_grid.liquid`, `blocks/walterin_story.liquid`.

---

## Metafields (planned)

> Use Shopify metafields for content that varies per product / per page. Don't hard-code product copy in Liquid.

| Namespace.key | Type | Used by |
|---|---|---|
| `custom.story_intro` | rich_text | Product page → editorial intro |
| `custom.specs_card_count` | number_integer | Specs section |
| `custom.specs_card_stock` | single_line_text | Specs section |
| `custom.specs_dimensions` | single_line_text | Specs section |
| `custom.edition_size` | number_integer | Specs section ("first run of 150") |
| `custom.languages` | list.single_line_text | Specs section ("Slovak / English") |
| `custom.illustrator_bio` | rich_text | "About the illustrator" section |
| `custom.featured_card_handles` | list.single_line_text | Card preview gallery — which cards to show |
| `custom.reviews` | list (body / author / date / rating) | Reviews fallback if external tool is unavailable |

> **[TBD]** Confirm metafield definitions during theme setup. Add definitions in Shopify Admin → Settings → Custom data → Products before pushing the theme that consumes them.

---

## Localization

### Languages
- `en` (English) — primary international
- `sk` (Slovak) — primary domestic

### Routing decision
- **[TBD]** Default Slovak at root with `/en/` for English, or default English at root with `/sk/` for Slovak? The decision matters for SEO and for first-impression in Slovakia. Lock before theme push.

### Bilingual content rule
Storefront copy must be authored natively in each language (see `BRAND-POSITIONING.md` → "Bilingual rule"). Use `locales/sk.json` and `locales/en.json` for UI strings, and per-product metafields with locale-specific values where needed.

---

## SEO & Structured Data

- **Schema types:**
  - `Product` for Comics Tarot of Consciousness
  - `Organization` / `Person` for Walterin / Walter Ihring
  - `Article` if/when a journal or story page launches
- **hreflang:** `x-default`, `sk`, `en` configured at theme level
- **Title pattern:** `{Product} — Walterin`
- **Meta description pattern:** lead with story / atmosphere, not feature list
- **Social preview (`og:image`):** card-art led, never the default Shopify product card
- **Sitemap:** standard Shopify-generated sitemap
- **Robots:** disallow none at launch

> **[TBD]** SEO app — install only if needed. Most of what we need is achievable with native Shopify schema. Avoid bloat.

---

## Installed Apps (planned at launch)

| App | Purpose | Status |
|---|---|---|
| Shopify Payments | Cards, Apple Pay, Google Pay, Shop Pay | Required at launch |
| Packeta (or compatible app) | Fulfillment integration | Required at launch |
| Email tool (Klaviyo / Shopify Email) | Launch sequence, post-launch flows | **[TBD]** before launch |
| Reviews tool (Judge.me / Loox / native) | Verified reviews | **[TBD]** before first units ship |
| Privacy / cookie banner | GDPR consent | Required at launch |
| Meta Pixel | Paid + retargeting attribution | Required at launch |
| Google Analytics (GA4) | Web analytics | Required at launch |

> **Rule:** every installed app earns its place. Don't add anything that isn't materially earning conversion or operational value. Bloat slows the page and dilutes the brand.

---

## Coding Conventions

- **Liquid:** Follow Shopify section + snippet conventions. `{% schema %}` for theme-editor settings. Sections own their own CSS file.
- **CSS:** Use existing CSS custom properties — never hardcode color or spacing values. Component-scoped CSS per section.
- **JS:** Vanilla. Web Components / Custom Elements pattern as in Dawn. No frameworks. No build step.
- **Accessibility:** All interactive elements have ARIA labels. Modals use `details` / `summary` pattern. Keyboard navigable. Color contrast checked against ink-on-canvas and red-on-canvas combinations.
- **Images:** Always use Shopify's `img_url` filter with `width` parameter for responsive images (e.g., `?width=1500`). Lazy-load below-the-fold media.
- **Metafields over hardcoded content:** product specs, intros, bios — all metafields where possible.

---

## Deployment Rules (once dev/live themes exist)

> **[TBD]** Fill in dev theme ID and live theme ID once assigned. Add the rule below to this section:

- Always push to **dev theme `<DEV_ID>`**, never directly to live theme `<LIVE_ID>`.
- When adding new block files, push the block file BEFORE the template that consumes it.
- `config/settings_data.json` is overwritten by the theme editor — document changes in this doc, not just code.

---

## Performance Posture

- The illustration is the hero — and it's heavy. Aggressive image optimization is non-negotiable.
- Use Shopify's responsive image filters everywhere.
- Lazy-load below-the-fold media.
- Defer all non-critical JS.
- Avoid third-party scripts that aren't materially earning value (analytics + pixel + payment widgets only at launch).
- Target Lighthouse mobile performance ≥ 80 on the product page at launch.

---

## Pre-Launch Checklist (technical)

A short checklist of technical decisions that need to be locked before doors open. Each should resolve a **[TBD]** in this doc.

- [ ] Theme base + name + dev/live theme IDs
- [ ] Final color tokens (hex) in `settings_data.json`
- [ ] Workhorse sans body / UI font selected and loaded
- [ ] SK/EN locale routing decision (root locale + secondary path)
- [ ] Metafield definitions registered in Shopify Admin
- [ ] Product page sections ordered and copy locked
- [ ] Email tool wired to capture form + launch sequence drafted
- [ ] Reviews tool installed and configured (or decision to defer until first reviews exist)
- [ ] Packeta integration tested with a real test order
- [ ] Privacy / cookie banner live
- [ ] Meta Pixel + GA4 installed and verified
- [ ] Lighthouse mobile ≥ 80 on the product page
- [ ] All policy pages (privacy, returns, shipping, terms) live in SK + EN
- [ ] FAQ live in SK + EN
- [ ] About / Walterin universe page live in SK + EN

---

## Open Technical Questions

These need a decision during build:

1. **Theme base.** Dawn (free, well-supported) vs. paid editorial theme vs. custom-built. Recommendation: start on a Dawn-derived base, customize aggressively.
2. **Online Store 2.0 blocks vs. legacy sections.** OS 2.0 is the safer long-term choice.
3. **Locale routing default.** SK at root or EN at root? See "Localization" above.
4. **Email tool.** Klaviyo (more powerful, more cost) vs. Shopify Email (lighter, included).
5. **Reviews tool.** Judge.me (low cost, robust) vs. Loox (photo-led, more visual) vs. defer until needed.
6. **Customer accounts on/off at launch.** Probably off for the first run — fewer things to break, less friction. Revisit post-launch.
