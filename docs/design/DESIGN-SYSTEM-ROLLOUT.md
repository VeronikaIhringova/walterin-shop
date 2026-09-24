# Rolling the design system out to the rest of the store

> Plan only, 24 Sep 2026. Nothing here is built. Each wave is its own preview → your OK live → push →
> Slovak → read back, exactly the way the buy column, Meet the cards and How a card is read went out.
> Rules: ground truth §6, `docs/design/COPY-GUIDE.md`, the page plans in `SHOPIFY-THEME-TECHNICAL.md`
> and `PRODUCT-PAGE-IMPROVEMENT-PLAN.md`.

## Where the store actually stands

| | |
| --- | --- |
| Sections in the theme | **61** |
| Sections on the design system | **4** — the buy column, Meet the cards, How a card is read, the withdrawal page |
| Pages with the design system | the tarot product page, the book product page (buy column only), the withdrawal page |
| Everything else | stock Dawn, or bespoke with its own private CSS prefix (`mw-`, `fwi-`, `wi-`, `hiw-`) |
| `walterin-ui.css` | 478 lines: scope reset, type, button, input, variant pills, icon rows, accordion |
| Missing from it | **a product card** — nothing in the design system styles a card, and cards are on six surfaces |

The home page, every collection, the cart, search, the blog, the 404 and the customer pages have no
Walterin design on them at all today. They are Dawn with the brand's fonts on top.

## The lever

`layout/theme.liquid` decides who gets the design system:

```liquid
assign wui_product_templates = 'tarot,book,qa' | split: ','
if template.name == 'product' and wui_product_templates contains template.suffix
  assign wui_enabled = true
...
```

Two things follow the flag: the `wui` class on `<body>` and whether `walterin-ui.css` loads at all.
Because every rule in that file is written `.wui .wui-something`, **turning the flag on everywhere
changes nothing visually** — it only makes the system available. That is wave 0, and it is what makes
the rest safe: each page can be converted on its own, and an unconverted page can't be affected.

One hazard sits next to it: a block at the bottom of `theme.liquid` hard-codes `!important` overrides
against two header section IDs to make the home header transparent and pull the page up by −70px.
It will fight any header work and has to come out **in the same wave as the header**, not before.

---

## The waves

Each wave is a shippable step. The order is by leverage: chrome is on every page, the card is on six.

### Wave 0 · Make the system available, and build the card — 1 day
- Flip `wui_enabled` to true for every template; keep `.wui-scope` as the real boundary.
- Add the missing **card component** to `walterin-ui.css`, to the anatomy in the brief: badge pill
  top-right, image, title in WalterinBold, one-line descriptor, price, and on hover a contrast-safe
  full-width CTA bar; on touch, a persistent compact CTA. Sold out is faded to 40%, never struck through.
- Add a **page-header** primitive (title + optional intro) so every converted page starts the same.
- Nothing on the storefront changes yet. This is the wave that makes the next five cheap.

### Wave 1 · The chrome that is on every page — 2–3 days
Header, announcement bar, footer, cart drawer and cart notification, and the promo popup.
- Header: ink on paper, WalterinBold nav, the brand mark as it is now, one button style, a drawer on
  the phone that matches the deck's frames rather than Dawn's panel. Remove the `!important` block.
- Announcement bar: one line, ink on yellow or paper, no rotation.
- Footer: the policy list, the payment icons (check the live set first — `docs/tasks/theme-fixes.md`
  has Revolut and PayPal showing while PayPal is not active), the newsletter field on the design
  system's input and button.
- Cart drawer: frames, not Dawn's panel. This is the highest-risk file in the wave — it is wired to
  Dawn's cart JS, so it gets re-skinned, not rebuilt.
- **Why first:** it is the only work that improves every page at once, including pages we never convert.

### Wave 2 · The product card, everywhere it appears — 1–2 days
Swap `snippets/card-product.liquid` to the wave-0 component. That single file feeds the collection
grid, the featured-collection rows, search results, related products, the collage section and the
footer. Then re-skin `main-collection-product-grid` around it (facets, sort, the empty state).
- Ratings appear on every card or none — right now there are none, so none.
- Hide "You may also like" until there is a second product, per the product-page plan.

### Wave 3 · The cart — 1 day
`main-cart-items`, `main-cart-footer`, the cart notification. Line items as frames, the quantity
control on the design system's input, one button for checkout. The cart is the last page before
Shopify's checkout, which we cannot style — so it has to hand over looking like us.

### Wave 4 · The rest of the product pages — 2 days
- The tarot page's remaining bespoke sections — `meet-walter` and `faq-with-image` — are each
  self-contained with their own prefix, so they are re-skins, not rebuilds.
- The t-shirt and Prague-book pages still run Dawn's `main-product`. Decide per page: move them onto
  the buy column (they are both simple products) or re-skin `main-product`. Moving them is less code
  and gives them the trust rows and the notify form for free.
- Retire `whats-inside` and `how-it-works` once nothing references them.

### Wave 5 · The home page — 2–3 days
The only page where the plan asks for new structure rather than a re-skin. `SHOPIFY-THEME-TECHNICAL.md`
already sets the order: one illustrated hero, the Walterin story, the tarot as an editorial feature,
a rotating card reveal, press when it exists, newsletter. Today it is a Dawn slideshow plus twelve
`_blocks` sections carrying Shopify AI-generated blocks.
- **Decision needed before this wave:** keep, rewrite or delete the 34 `ai_gen_block_*` files. They
  are an un-audited surface with their own CSS and copy nobody in this project wrote.

### Wave 6 · The long tail — 2 days
Pages (about, FAQ, contact, track-order), blog and article, 404, search results, the seven customer
account pages, and `layout/password.liquid` — which has its own layout and needs its own edit if the
password page should look like us.
- Lowest traffic, lowest risk, and the place to stop if the launch needs the time elsewhere.

---

## What we do not do

- **Never touch checkout.** It is not ours to style on this plan.
- **Never restyle Shopify's consent banner** — it is served by Shopify and the policy depends on it.
- **No third typeface.** WalterinBold and Inter, with Cormorant Garamond only where the prose calls
  for it and only loaded on pages that use it.
- **No grey, no gradients, no soft shadows.** Sky, red and green belong to Walter's artwork, never to
  the interface.
- **No new colour meanings.** Ink, paper, yellow. Unavailable is faded 40%.
- **No auto-translated Slovak.** A surface is not done until its Slovak is written and registered.
- **No section is converted without its copy being read aloud** in both languages first.

## When a surface is done

The same checks that shipped the last three sections, run at 1440 and 390, in English and Slovak:

1. Palette: ink, paper, yellow only — measured, not eyeballed.
2. One button component, contrast-safe in every state; text on yellow is always ink.
3. Type: the six sizes, nothing else. No mid-word breaks, no hyphenation.
4. Spacing from the tokens, measured optically; content edges match the header.
5. Layout shift ≤ 0.001 on load and on interaction.
6. Full keyboard operation; visible focus; reduced motion respected.
7. Chromium and WebKit, no console errors.
8. Slovak registered through Translate & Adapt and read back with `outdated: false`.

## What has to be decided, and by whom

| Decision | Who | Blocks |
| --- | --- | --- |
| **Publish the Slovak locale.** It is still unpublished, so `/sk/` 404s and no Slovak on the store can be seen or checked. | Veronka | Everything bilingual, including the two sections that went live today |
| The 34 AI-generated home page blocks: keep, rewrite or delete | Veronka + Walter | Wave 5 |
| t-shirt and Prague-book pages: move to the buy column, or re-skin Dawn | Veronka | Wave 4 |
| Home page hero image — the one image the page opens with | Walter | Wave 5 |
| Payment icons: the live set shows Revolut and PayPal while PayPal is not active | Veronka | Wave 1 |
| Should the password page carry the design system | Veronka | Wave 6 |

## Shape of the work

| Wave | What | Days |
| --- | --- | --- |
| 0 | The lever, the card component, the page header | 1 |
| 1 | Header, announcement, footer, cart drawer, popup | 2–3 |
| 2 | Product card everywhere + collection grid | 1–2 |
| 3 | Cart | 1 |
| 4 | Remaining product pages | 2 |
| 5 | Home page | 2–3 |
| 6 | Pages, blog, 404, search, customers, password | 2 |
| | **Total** | **11–14 days of focused work** |

Waves 0–3 are what a visitor sees on the way to buying, and they are half the total. If the deck's
launch needs the calendar, stop after wave 3 and the store already reads as one thing.
