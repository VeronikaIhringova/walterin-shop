# BUY SECTION SPEC

> The rules for the product page's right column (sections/walterin-buy.liquid).
> Design system: assets/walterin-ui.css. Behaviour: assets/walterin-buy.js.
> Facts and copy: docs/WALTERIN-GROUND-TRUTH.md and docs/products/*.md. Updated 22 Sep 2026.

## 1. Direction: Frameless
Type and space carry the column. The only framed things are the email field and the one yellow
button. Choices are text with a dot and a yellow marker; accordions are ruled rows, not boxes.

## 2. Order (never rearranged)
1. **Title** — the product title, one headline. A line break after a colon; never a separate subtitle.
2. **Price** — price left, shipping line with its icon right.
3. **Choice** — one group per product option (Language, Format…), then up to two short notes under
   them (edition, and what the choice actually changes), 8px apart.
4. **Act** — add to cart (+ express checkout + payment icons) or, before launch, the notify form.
5. **Read** — accordions, in this order: About the deck · What's in the box (product safety inside
   it) · How to read · As a gift · About Walter · When can I have it? (before launch only).
   The first two are main (solid rule); the rest are secondary (dashed rule + a small ink star).
   Inside every accordion: the first paragraph is the lead at Body size, the rest is Small.

**Rhythm.** Four groups, 32px apart on desktop and 24px on phones; the accordions get 48 / 32,
because reading is a different job from deciding. Inside a group nothing is further apart than 16:
title → price 24 / 16 · label → control 16 · control ↔ control 12 · control → helper 12 ·
helper ↔ helper 8. The two helper lines under the choices belong to the choices, not to themselves:
the first is Body size (the edition fact), the second is Small (what the choice changes).
Measured optically.

## 3. Three text levels, nothing between
| Level | Font | Size | Used for |
|---|---|---|---|
| Headline | WalterinBold | 40 / 32 | the product title |
| Subheadline | WalterinBold | 22 / 20 | option legends, choice names, button, accordion titles |
| Body / Small | Inter 400 | 17 / 16 · 14 | notes, accordion text, legal lines |
Price is its own role: Inter 700, 32 / 28, tabular numbers.
A choice group with a word of 11+ letters, or three values, steps its names down to the Body size
instead of breaking or shrinking anything else.

## 4. Colour
Ink `#222222` · paper `#FFFDF7` · yellow `#FCF205`. Nothing else carries meaning in the UI.
Sky, red and green belong to Walter's artwork only. Unavailable = faded to 40%, never a
strike-through, never a grey fill. Status boxes are an ink frame with an ink glyph.

## 5. Edges and shadows
- The column's left and right edges match the site header (`.wui-wrap`).
- Everything with a hard shadow reserves it: `margin-right: var(--wui-sh)` and a width of
  `calc(100% - var(--wui-sh))`, so the shadow's **outer** edge lands on the column edge.
- Express checkout draws its ink ring outside the button, so it is inset by one line width.
- Nothing, in any state, may cross the column edge. Checked automatically (see §10).

## 6. Motion
| What | How | Time |
|---|---|---|
| Picking a choice | yellow marker grows over the name (background-size), name darkens, dot fills | 180ms ease-out |
| Hover on a choice or the button | dot tint, button presses into its shadow | 120ms ease-out |
| Accordion open/close | height + opacity, plus becomes minus | 200ms ease-out |
| Edition name, availability note | cross-fade, never a hard swap | 90ms |
| Price | changes instantly: a number that fades reads as a glitch | 0 |
| Mobile sticky bar | slides up once the button scrolls away | 250ms |
Only transform, opacity, colour and height ever animate. Nothing changes size on selection.
`prefers-reduced-motion: reduce` makes all of it instant, and the accordion opens with no animation.

## 7. Text never breaks inside a word
- `overflow-wrap: normal; word-break: normal; hyphens: none` in the scope, and an override for
  headings in assets/base.css (Dawn sets `word-break: break-word` on h1–h6 site-wide).
- Hyphenated words are written with a non-breaking hyphen (U+2011): "nine‑frame", "well‑drawn".
  "Rider–Waite" carries a word joiner (U+2060) after the dash.
- Choice groups sit side by side only while every label fits whole. The decision is made from the
  width the group really has (a container query on `.wui-cq`), not the screen width: 2 values stack
  below 320px, 3 values or priced values below 440px.
- **A container-query element must not be a `<fieldset>` child, and a `<legend>` must not float
  inside a block fieldset.** Both collapse the choices to zero width. The fieldset is a flex column.

## 8. States
| State | Column |
|---|---|
| Coming soon | notify form: email + button, newsletter checkbox, one line with the privacy link |
| Available | add to cart · price · express checkout · payment icons |
| Low stock | "[n] of 100 left" under the value, from real inventory |
| One value sold out | that value faded, "Sold out", not clickable; the rest stays buyable |
| All sold out | faded, disabled button |
| Digital selected | no express checkout (it would skip the cart's consent checkbox), no shipping line, "PDF + EPUB. Download right after payment." |
| Combination missing | the value stays visible and faded, the column moves to the nearest available variant and says so through a live region |

## 9. Words
- Names of option values come from the site language (`locales walterin.buy.value.*` via the
  "Option value" blocks): an English site never shows a Slovak word, and the other way round.
- No VAT wording while Walterin is not a VAT payer; tax wording appears only if Shopify's
  "include tax in prices" is switched on.
- Payment icons come from `shop.enabled_payment_types`, minus anything listed in "Hide these
  payment icons" (currently `paypal`: the store's PayPal is not Walterin's — see LAUNCH-READINESS).
  Shopify's express-checkout buttons follow the store's payment settings, not the theme.
- Product safety (GPSR) is two small lines at the end of "What's in the box", physical only.
- The legal guarantee stays in the Terms, never in the column.

## 10. Proof before any push
`node proof.mjs` (scratchpad) runs Chromium and WebKit at 1440 / 1280 / 390 over every state and
both products, and fails on: a word broken mid-word, a colour outside the palette, anything past
the column edge, horizontal scroll, a console error, or CLS above 0.001. Screenshots land in
docs/design/proof/. Also: `shopify theme check`, and a keyboard pass (Tab order, arrows inside a
choice group, Enter/Space on accordions, Esc closes the zoom and returns focus).

## 10b. Fonts
WalterinBold is preloaded first in `<head>` from the Shopify files CDN and declared
`font-display: optional`, with a metric-matched `Walterin Fallback` (size-adjust 83.4%). Inter has
the same treatment (`Inter Fallback`, size-adjust 96%). Result: the brand face shows on every
measured load and nothing can re-wrap later, so CLS stays at zero. `block` was tested and is worse
(0.021 on phones). If the font ever misses the paint window, the stand-in has the same metrics, so
the layout is identical either way.

## 11. Zoom
PhotoSwipe 5 (MIT), self-hosted in assets/, imported on the first tap only — nothing on page load.
Full screen, pinch, double-tap, swipe between images, swipe down or ✕ to close. Without JS or
modules the link still opens the large image.

## 12. Preview templates
`product.tarot.json` is the real one. `product.book.json` (Format × Language) previews on Prague
with `?view=book`. The design system is switched on per template suffix in layout/theme.liquid
(`tarot,book,qa`); `qa` is kept in that list for a scratch template during testing.
The preview states in the section (launch day, low stock, sold out) work in the theme editor and on
preview/development themes only — never on the published theme.
