# Walterin — Product Page Plan: Comics Tarot of Consciousness

> **Status:** Pre-launch backlog. The Walterin storefront is being built; this is the working plan for the product page that will sell **Comics Tarot of Consciousness**.
> **Companion docs:** `walterin.md` (project overview), `WALTERIN-MASTER-REFERENCE.md` (brand), `BRAND-POSITIONING.md` (strategy), `SHOPIFY-THEME-TECHNICAL.md` (technical reference).

---

## Goal

Make the product page feel like an **exhibition wall label** — not an e-commerce listing. The visitor should leave the page with a sense of the universe behind the deck, not just a feature list. The illustration is the hero. Copy is the literary companion. Default Shopify section patterns are resisted wherever they undercut the editorial tone.

Success on this page is not "the buy button works." Success is: a first-time visitor with no prior knowledge of Walterin understands what the deck is, who Walter is, and why this is not the same as every other tarot deck — within 30 seconds.

---

## Section Map (target build)

| # | Section | Role | Notes |
|---|---|---|---|
| 1 | **Main product** (gallery + buy zone) | Visual + decision zone | Card art carousel; title; price; buy button; trust row |
| 2 | **The universe** | Editorial intro | One paragraph, Cormorant Garamond. Atmosphere, not feature list. |
| 3 | **Card preview gallery** | Tease, don't summarize | 4–6 selected cards from the deck. No spoilers. |
| 4 | **What's in the box** | Concrete specs | Card count, card stock, dimensions, packaging, edition size, languages |
| 5 | **The illustrator** | Author identity | Walter — short bio, link to *Bratislava* and other prior work |
| 6 | **FAQ** | Practical reassurance | Shipping, returns, language, "do I need to know tarot?" |
| 7 | **Reviews** | Social proof (post-launch) | Hidden until verified reviews exist |

> Treat sections like spreads in a zine: each one earns its place, each one has a clear voice, none of them feel templated.

---

## What's Missing (must-haves before launch)

These are the items the page can't open without. None are nice-to-have.

1. **Atmospheric hero image.** The first thing on the page should be a single, considered image — not a 4-up grid of standard Shopify product crops. The Magician card from the tuck-box front is a strong default; a full tuck-box hero shot is a strong alternative. Pick one and commit.
2. **A real product story.** A paragraph that says, in voice, what this is and why it exists. Cormorant Garamond, ~80 words. Authored in SK and EN — natively in both, never translated.
3. **Specs as a clean grid, not a wall of bullets.** Card count, card stock, dimensions, packaging, edition size, languages. Each as its own labeled tile.
4. **Edition-size signal.** Lead with "first run of 150" prominently — it is one of the most powerful trust + scarcity signals we have, and it's true.
5. **Walter's identity present on the page.** A short bio block + link to *Bratislava* / past work. Buyers should leave knowing they bought into a creator, not a SKU.
6. **Buy-zone trust row.** Made in Slovakia / Ships across EU via Packeta / Bilingual packaging (SK + EN). Three icons, clear copy. No fake Trustpilot stars, no generic "secure checkout" badges.
7. **No spoiler-summarizing of cards in copy.** Copy teases. The card preview gallery shows. Anything that summarizes "the meaning" of a card has to be cut.
8. **SK + EN both live on launch day** — or a clear, deliberate decision to ship one first and the other within 30 days.

---

## What to Avoid (anti-patterns)

The default Shopify product page wants to do these things. We resist.

| Default pattern | Why we avoid it |
|---|---|
| "You may also like" carousel | Walterin has one product. A carousel creates either an empty section or a sad single-card row. Hide entirely until a second product launches. |
| Generic trust badges (256-bit encryption, lock icon, "free returns" chip) | They cheapen the editorial tone. Use the buy-zone trust row instead. |
| Star-rating row with "0 reviews" | Hide the reviews section entirely until verified reviews exist. |
| Frequently-bought-together upsell | We have nothing to bundle yet. |
| Heavy popups (newsletter / discount-on-exit) | Brand-damaging on launch. A footer or in-page email capture is enough. |
| AI-generated product descriptions | Every word on this page is authored. |
| Auto-translate fallback for SK/EN | We never publish auto-translated copy. Better to ship one language well than two languages poorly. |

---

## Priority Order — Tier 1, 2, 3

### Tier 1 — Must ship for launch

| # | Change | Where | Scope |
|---|--------|-------|-------|
| 1 | Set a single atmospheric hero image as the first thing on the page (no 4-up grid above the fold) | Product page main section | Image asset + section setting |
| 2 | Write the "universe" intro paragraph (~80 words, SK + EN, natively authored) | Editorial section below buy zone | Copy work |
| 3 | Build the specs grid: card count / stock / dimensions / packaging / edition size / languages | Specs section | 6 labeled tiles |
| 4 | Add the buy-zone trust row: Made in Slovakia / Ships across EU via Packeta / SK+EN packaging | Inside main product section | 3 icons + copy |
| 5 | Add Walter's bio block + link to prior work | "About the illustrator" section | Bio copy + link |
| 6 | FAQ in SK + EN — minimum: shipping, returns, language, beginner question | FAQ section | 4–6 Q/A pairs |
| 7 | Hide reviews section entirely until verified reviews exist | Reviews section | Conditional on review count |
| 8 | Add edition-size signal ("first run of 150") in the buy zone | Main product section | Single line of copy |
| 9 | Confirm SK + EN both live, both authored, no auto-translation | Both languages | Native authoring pass |
| 10 | Final visual QA: tuck-box anatomy on hero image is correct (logo top, "COMICS TAROT" large, "of Consciousness" subordinated, Magician on front, red panel on back) | Hero image | One pass |

**Estimated total time for Tier 1: 1–2 days of design + copy work, plus storefront wiring.**

---

### Tier 2 — Ship within 30 days of launch

| # | Change | Where | Scope |
|---|--------|-------|-------|
| 11 | Card preview gallery — 4–6 selected cards, no spoilers, atmospheric crops + close-ups | New section | Image work + section build |
| 12 | Real reviews section turned on once verified reviews exist | Reviews section | Switch + populate |
| 13 | Press / coverage block on product page (single line + logo strip) once first press hits | Above FAQ | Section build, hidden until ready |
| 14 | Email capture in-page near the bottom — "Be first when the next chapter lands" (SK + EN) | New section / footer | Form + copy |
| 15 | Polish: typography rhythm pass on the editorial paragraph and the bio — read both aloud in SK and EN | Copy work | One careful pass |

**Estimated total time for Tier 2: 1–2 days of focused work, paced with launch traction.**

---

### Tier 3 — Backlog, evaluate as the product universe grows

| # | Change | Where | Risk / Notes |
|---|--------|-------|---|
| 16 | "You may also like" carousel — only when product 2 exists | Below FAQ | Don't enable empty |
| 17 | Bundle SKU (deck + signed print, deck + booklet) once production allows | Variant picker | Operational complexity — confirm fulfillment first |
| 18 | Per-card companion pages — `/cards/{slug}` — atmospheric scenes for each card with a short literary caption (no divinatory summary) | New page template | Big content lift; consider as a post-launch creative project, not a launch blocker |
| 19 | Alternative editions / future printings — handle vs. reserve a separate product handle | Information architecture | Decide before second print run |
| 20 | A "studio" page or section showing process artwork — sketches, panel comps, behind-the-scenes — to deepen the universe | New page | Strong long-term brand investment |

**Estimated total time for Tier 3: variable. Treat as universe-building, not launch work.**

---

## Scope Summary

| Tier | Changes | Estimated Time | Risk |
|---|---|---|---|
| 1 | Must-ship for launch | 1–2 days | Minimal — pure correctness + voice work |
| 2 | First 30 days post-launch | 1–2 days | Low — paced with launch data |
| 3 | Universe-building backlog | Variable | Strategic, not blocking |

**Recommended starting point:** Lock the hero image and write the universe intro paragraph (SK + EN) first — those two decisions cascade through every other Tier 1 item. Once those are signed off, the rest of Tier 1 is straightforward execution.

---

## Open Questions Before Implementation

These need a decision (Veronka + Walter together) before the page can ship. Each item has implications for design, copy, and packaging.

1. **Final retail price.** Single-unit pricing for Comics Tarot of Consciousness. Bundle with print or postcard set?
2. **Hero image choice.** Magician card from front of tuck box vs. full tuck-box shot vs. alternating? Pick one as primary.
3. **Edition framing.** Lead with "first run of 150" as a number, or with "first edition" as a label? Different signal — decision matters.
4. **Card preview selection.** Which 4–6 cards do we show? They define the universe's first impression.
5. **Reviews tool.** Pick one before first units ship — Judge.me / Loox / native. (`SHOPIFY-THEME-TECHNICAL.md` covers the trade-offs.)
6. **Returns policy text.** Required by EU consumer law — needs to read in voice, not as boilerplate. SK + EN.
7. **Shipping promise.** "Ships within X business days" — confirm X with the printer + Packeta before publishing.
8. **Universe roadmap on the page.** Do we tease product 2 on this page (footer, "what's next" mention), or hold all roadmap signal off the product page itself?
9. **Beginner FAQ stance.** Are we welcoming to tarot beginners, or are we explicitly framing the deck as art-first / divinatory function optional? The FAQ copy turns on this single decision.
10. **Customer accounts.** On or off for launch? (Recommendation in `SHOPIFY-THEME-TECHNICAL.md`: off for first run.)
