# Walterin — claude.md

## Project Overview

**Walterin** (walterin.com) is the artistic brand and creative universe of Slovak illustrator **Walter Ihring**. The brand publishes illustrated stories in physical formats — decks, books, prints — built on the equal pillars of illustration and text. The first product, launching shortly, is **Comics Tarot of Consciousness**: a 78-card illustrated tarot deck.

- **Store URL:** https://walterin.com
- **Founder / illustrator:** Walter Ihring
- **Lead on design + content:** Veronka (graphic designer, social media manager)
- **Platform:** Shopify (planned for launch — see `SHOPIFY-THEME-TECHNICAL.md`)
- **Default currency:** EUR (€)
- **Storefront languages:** Slovak (`sk`) and English (`en`) — both authored natively
- **Fulfillment:** EU via **Packeta**
- **Stage:** Pre-launch of first product (~3 weeks to print, ~1 month to launch)

---

## Tech Stack (planned at launch)

| Layer | Technology |
|---|---|
| Storefront platform | Shopify |
| Theme base | TBD (likely Dawn-derived theme — confirm during build) |
| Frontend | Vanilla / theme-provided, no custom build system at launch |
| Fonts | Walterin Bold (primary), Cormorant Garamond (literary companion), workhorse sans for UI body (TBD) |
| CMS / product data | Shopify Admin |
| Payments | Shopify Payments stack — Visa, Mastercard, Apple Pay, Google Pay, Shop Pay; local SK/EU methods to be confirmed |
| Analytics | Web analytics + Meta Pixel at minimum at launch |
| Email | TBD (Klaviyo / Shopify Email — decide before launch sequence builds) |
| Reviews | TBD (Judge.me / Loox / native — decide before first units ship) |
| Shipping | Packeta (EU); domestic SK + EU rates configured per region |

> **TBD before launch.** Theme name + version, body/UI font, email tool, review tool, exact payment-method enablement.

---

## Brand Snapshot

| Attribute | Value |
|---|---|
| What it is | Storytelling brand — illustrated comic stories made into physical objects |
| Brand voice | Bold, warm, literary, never generic |
| Brand archetype | The Storyteller |
| Languages | Slovak + English — authored natively in both |
| First product | Comics Tarot of Consciousness (78-card illustrated tarot deck) |
| First print run | ~150 units |
| Long-term margin target | ~70% gross |

Reference: `WALTERIN-MASTER-REFERENCE.md` and `BRAND-POSITIONING.md` are the source of truth for brand voice, audience, and strategy.

---

## Design System (working spec)

### Color palette (working — to be locked from packaging proof)

| Token | Hex (TBD) | Use |
|---|---|---|
| Walterin Red | TBD | Brand-signature accent: tuck-box back panel, key CTAs, accent details. Used sparingly. |
| Off-white / cream | TBD | Page canvas, packaging base, default surface |
| Deep ink | TBD | Body copy, headlines, line work |
| Neutral warm | TBD | Secondary surfaces, supporting UI |

> **Action item:** Confirm hex values from the printed packaging proof and lock the token set before storefront build.

### Typography

- **Primary:** **Walterin Bold** — brand identifier, headlines, packaging titles
- **Companion:** **Cormorant Garamond** — literary / editorial passages, longer prose, story snippets
- **Body / UI:** workhorse sans — TBD
- Don't introduce a third display family without a clear reason

### Layout principles

- Treat product pages like exhibition wall labels — generous whitespace, illustration as hero
- Restraint in motion — minimal animation; let the illustrations carry the energy
- Editorial > e-commerce default; resist standard Shopify section patterns where they undercut tone

---

## Product Structure (at launch)

### Product: Comics Tarot of Consciousness

| Attribute | Detail |
|---|---|
| Type | 78-card illustrated tarot deck (Major + Minor Arcana) |
| Handle | TBD (`comics-tarot-of-consciousness`) |
| URL pattern | `/products/comics-tarot-of-consciousness` |
| Variants | TBD — likely a single SKU at launch (single edition); possible bundle SKUs (deck + print, deck + booklet) added later |
| Price | TBD |
| Shipping | Packeta EU; rates by region (SK / EU / international) |
| Languages on packaging | SK + EN |
| First print run | ~150 units |
| Tuck box anatomy | Walterin logo top → "COMICS TAROT" large → "of Consciousness" subordinated → Magician card on front → red panel on back |

### Product attributes

- Single-author work — Walter Ihring's illustration and authored universe
- Physical-only product at launch (digital companion / per-card guide is a TBD post-launch question)
- Treat as a collectible-illustrated-object first; usable tarot deck second

---

## Store Architecture (planned)

### URL structure (Shopify defaults)
```
/                          → Homepage
/products/{handle}         → Product page
/collections/{handle}      → Collection page (TBD which collections at launch)
/cart                      → Cart page
/pages/{handle}            → Static pages (About, Story, Contact, FAQ, Returns)
/policies/                 → Policy pages (privacy, returns, shipping, terms)
/search                    → Search results
/account                   → Customer account
```

### Localized URL pattern
```
/sk/products/{handle}      → Slovak storefront
/products/{handle}         → English (default)
```

> **Decision needed:** locale routing — default English at root with `/sk/` for Slovak, or default Slovak at root with `/en/` for English? Lock during theme setup.

### Key pages at launch

| Page | Purpose | Priority |
|---|---|---|
| Homepage | Universe-led entry. Hero illustration + product launch hook. | Highest |
| Product (Tarot) | Conversion-critical. Editorial product page. | Highest |
| About / Story | Walter's story + Walterin universe framing. | High |
| Cards (companion) | Per-card or group-of-cards reveal pages. May launch later. | Medium |
| FAQ | Sizing, shipping, returns, what's in the box. | High |
| Press / Coverage | Press mentions and interviews after launch. | Low at launch, builds over time |

---

## Brand Voice & Copy Guidelines (short version)

Full rules: `BRAND-POSITIONING.md` → "Brand Personality & Voice" and `PROJECT-INSTRUCTIONS.md` → "Brand Voice".

- Tone: bold, warm, literary. Never generic.
- Lead with image and story, not features.
- Be specific (a city, a year, a face, a fragment of a myth).
- Treat copy as a companion to artwork, not a label.
- Bilingual native rule: Slovak and English are equal first languages. Author each separately rather than translating.
- Never use spiritual buzzwords or self-help framing for the Tarot product.
- Never spoiler-summarize cards or stories.

---

## SEO & Structured Data (planned)

- **Schema:** `Product` for the deck; `Organization` / `Person` for Walterin / Walter Ihring; `Article` for any future story posts.
- **hreflang:** `x-default`, `sk`, `en` — to be configured at theme level.
- **Title pattern:** `{Product} — Walterin` (English) / `{Product} — Walterin` (Slovak; treat as the same display)
- **Meta description pattern:** lead with story / atmosphere, not feature list.
- **Social preview:** card art-led; never default Shopify product card.

---

## Localization

- **Storefront languages:** SK + EN at launch (or staged — see TBD above).
- **Currency:** EUR everywhere at launch. Other currencies considered post-launch only after volume justifies.
- **Country selector:** off / hidden at launch unless required by local law (default the user's experience to their browser language; let them switch manually).
- **Bilingual rule:** copy is authored, not translated. Both languages must read natively.

---

## Operations

### Shipping & fulfillment
- **Carrier:** Packeta (EU)
- **Ship from:** Slovakia
- **First-run lead time:** ships within X business days of dispatch — confirm post-print
- **Returns:** standard EU consumer-rights window; returns to a Slovak address. Specific copy TBD before launch.

### Payments
Shopify Payments stack at minimum. Cards + Apple Pay + Google Pay + Shop Pay. Local SK / EU methods (e.g., Klarna, local cards, bank transfer) — to be enabled where they materially help conversion.

---

## File Naming Conventions (when assets are added)

- Product images: `comics-tarot-{descriptor}.{ext}` (e.g., `comics-tarot-magician-front.jpg`)
- Card individual scans: `card-{number}-{name}.{ext}` (e.g., `card-01-magician.jpg`)
- Packaging: `tuckbox-front.{ext}`, `tuckbox-back.{ext}`, `tuckbox-side.{ext}`
- Lifestyle: `lifestyle-{scene-keyword}.{ext}` (e.g., `lifestyle-desk-coffee.jpg`)
- Logo files: `walterin-logo-{variant}.{ext}` (e.g., `walterin-logo-dark.svg`)

---

## Reference Documents

- **`PROJECT-INSTRUCTIONS.md`** — Top-level Claude project instructions, hard constraints, working style.
- **`WALTERIN-MASTER-REFERENCE.md`** — Master reference: brand, products, audience, ops.
- **`BRAND-POSITIONING.md`** — Strategy: positioning, voice, audience, channel, geographic strategy, success metrics.
- **`SHOPIFY-THEME-TECHNICAL.md`** — Storefront / theme technical reference (TBD sections will be filled in as the build progresses).
- **`PRODUCT-PAGE-IMPROVEMENT-PLAN.md`** — Backlog of product page work for the Tarot deck launch.
