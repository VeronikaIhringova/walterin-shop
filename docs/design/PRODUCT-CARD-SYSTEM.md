# Product card system

The single rule for every product card on walterin.com — collection pages, the home page,
"You may also like", search results, the cart carousel. If a card appears anywhere else, it follows
this.

Mock-ups: `docs/design/product-card-system/` (`open docs/design/product-card-system/index.html`).
Reference the direction came from: `docs/design/bugs/reference-myway-card-*.png`.
Status: **decided 30 Sep 2026 — variation "Quiet". Built in the theme, in preview, awaiting
"OK live".**

---

## 1. The idea

A card says three things: what it is, what it costs, and — only when true — when you can have it.
Everything else is decoration, and decoration is what made the old cards noisy.

So: **calm by default.** A category word top-left, at most one status pill top-right, and a wide flat
bar along the foot of the image that carries the date. No soft chips, no blurred shadows, no grey.

## 2. Anatomy

```
┌─────────────────────────────┐
│ PRAGUE              [ NEW ] │  ← category (plain text) · status pill (max one)
│                             │
│         product image       │
│                             │
│  [ AVAILABLE FROM OCT 23 ]  │  ← the bar: date / coming soon / sold out
└─────────────────────────────┘
  WALTERIN PRAGUE                ← title, WalterinBold, uppercase
  from €18,99                    ← price, Inter 700
```

Media: `aspect-ratio: 3/4`, 2.5px ink border, 8px radius. Title and price sit on paper under it,
never over the image.

## 3. The label library

| Slot | What goes there | Style | Rule |
|---|---|---|---|
| **Top-left** | *(not in use)* — reserved for a category word | Plain ink text, Inter 12px, `letter-spacing:.16em`, uppercase. **No chip, no fill** | **Deferred (Veronka, 30 Sep 2026).** Kept as a future option; see §11 |
| **Top-right** | Status — `Sold out`, `New` | Pill, 12px, uppercase. Fill depends on the variation | **At most one, ever.** Sold out beats New |
| **Bottom bar** | `Available from [date]` · `Coming soon` · `Sold out` | WalterinBold 15px, uppercase, full width minus 10px, min-height 46px | Only when there is something true to say |

**The crowding rule: one category + one status + one bar. Never more.** If a product qualifies for
two statuses, the priority order decides and the loser is not shown.

**The bar never invents a reason to appear.** A buyable product with no date has no bar — hovering it
underlines the title instead. A bar that said "View" was the first thing cut.

## 4. States

Every state below is honest. **No discount badges, no ratings, no "bestseller", no scarcity
language we cannot evidence** — see `docs/launch/BACKEND-AUDIT-2026-09-30.md` B8 for what happens
when an unverifiable claim sits in the data.

| State | Category | Status pill | Bar | Notes |
|---|---|---|---|---|
| Buyable | yes | — | — | The calm default |
| Hover / keyboard focus | yes | — | bar if it has one | Focus shows **exactly** what hover shows |
| Available from [date] | yes | — | `Available from October 23rd` | Date comes from the product, never hardcoded |
| Coming soon (no date) | yes | — | `Coming soon` | **Never "Sold out" for something that never launched** |
| New | — | `New` | — | **Automatic: three months from `published_at`, then it disappears by itself.** Nobody sets it and nobody has to remove it |
| Sold out | yes | `Sold out` | `Sold out` | Image and text fade to 40%. Never a strike-through, never a grey fill |
| Digital only | — | — | — | No pill: the format is a variant, and the page says it |
| Digital + printed | yes | — | — | Price reads `from €18,99` |

## 5. Mobile and touch

**There is no hover on a phone, so nothing may depend on it.** Where the pointer is coarse
(`@media (hover:none),(pointer:coarse)`) the bar is visible from the start. The date is never
hidden behind an interaction that cannot happen.

That is also why the bar carries information and not an action: a permanently visible "View" bar on
every card on a phone would be noise on every card.

## 6. Accessibility

- **Focus shows what hover shows.** `:focus-visible` reveals the bar and underlines the title, plus
  a 2.5px ink outline offset 3px.
- **Status pills carry screen-reader text**: "New" is announced as "New product", "eBook" as
  "Digital edition" — a two-letter pill is not self-explanatory read aloud.
- **Contrast**: ink on paper, ink on yellow and paper on ink all clear 4.5:1. **Never yellow text on
  paper, never white on yellow** (`docs/design/BUTTONS.md`).
- The bar is real text, never an image, so it translates and scales with the browser's text size.
- Faded (40%) is used only with a word — the pill and the bar both say "Sold out". Opacity alone is
  not information.

## 7. The matching product page

A card and the page it opens must be recognisably the same thing. **The launch label on the product
page uses the same shape and fill as that variation's card bar**, and sits directly above the email
field of the notify-me form — it is the reason to sign up, so it belongs to the form, not to the top
of the column.

| Card state | Product page |
|---|---|
| Buyable | Price · Add to cart · express checkout · payment icons |
| Available from [date] | Launch label above the email field · notify form · **no buy button, no express, no "Buy it now"** |
| Coming soon | Same, label reads `Coming soon` |
| Sold out | Faded, disabled button, no notify form |
| Digital ↔ printed | Price, label and date all switch with the format |

## 8. Copy

| | EN | SK |
|---|---|---|
| Dated | Available from October 23rd | Dostupné od 23. októbra |
| No date | Coming soon | Už čoskoro |
| Sold out | Sold out | Vypredané |
| New | New | Novinka |
| Digital | eBook | E-kniha |
| From-price | from €18,99 | od 18,99 € |

Slovak is written natively, not translated. Dates take the natural form in each language —
"October 23rd", "23. októbra" — never an ISO date in front of a customer.

## 9. The variation in use: Quiet

**Paper fill, thin ink frame on both the bar and the pill. Nothing coloured.** Yellow stays for
actions, so a grid of cards never competes with the buttons on the page.

Chosen 30 Sep 2026 over *Marker* (yellow fill, fully rounded) and *Ink* (ink fill, paper text),
which are kept in the mock-ups should the decision ever be revisited. The three differed only in
fill and shape — structure, copy, states and rules were identical — so swapping is a CSS change.

## 9a. Where it lives in the theme

| | |
|---|---|
| `snippets/launch-date.liquid` | **The one source for every launch date.** Cards and product pages both read it, so they cannot disagree. Rows are `handle \| option value \| YYYYMMDD \| locale key`; the words are locale strings, the date is a number, and a row expires by comparison |
| `snippets/wui-card-labels.liquid` | The status pill and the bar. Decides which, and never renders more than one pill |
| `snippets/card-product.liquid` | Renders the labels into the card; the stock Dawn badge is hidden in CSS, not deleted |
| `assets/walterin-ui.css` | `.wui-cl__*`, the card frame, the hover/focus reveal, the touch rule |
| `sections/walterin-buy.liquid` | The matching product-page line, same shape and fill as the card bar |

**The date table should move to a product metafield** the next time a definition is created in
admin — content does not belong in code. It is in one place, which is the part that matters.

## 10. Open questions

- ~~Which variation.~~ **Decided: Quiet.**
- **The category label is deferred, not dropped.** It stays specified above so it can be switched on
  later without another design pass. Before it is, the tags have to be fixed: the sticker set is
  tagged `PARIS` and Paris is tagged `PRAGUE` (backend audit S1). Tags are being left as they are
  for now (Veronka, 30 Sep 2026).
- ~~"New" needs an expiry.~~ **Decided: three months from `published_at`, computed in Liquid.**
  Nothing to set and nothing to remove, so it cannot become a lie.
- ~~Does the tarot show `Coming soon`?~~ **It has a date: 10 November 2026**, so it shows
  "Available from November 10th". `Coming soon` is now only for products with no confirmed date —
  the sticker set today.
