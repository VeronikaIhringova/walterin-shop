# Product card system

The single rule for every product card on walterin.com — collection pages, the home page,
"You may also like", search results, the cart carousel. If a card appears anywhere else, it follows
this.

Mock-ups: `docs/design/product-card-system/` (`open docs/design/product-card-system/index.html`).
Reference the direction came from: `docs/design/bugs/reference-myway-card-*.png`.
Status: **proposed, 30 Sep 2026.** Nothing is in the theme yet.

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
| **Top-left** | Category — the universe the product belongs to: Prague, Paris, Tarot | Plain ink text, Inter 12px, `letter-spacing:.16em`, uppercase. **No chip, no fill** | Optional. It is context, not a claim |
| **Top-right** | Status — `New`, `Sold out`, `eBook` | Pill, 12px, uppercase. Fill depends on the variation | **At most one, ever.** Priority: Sold out > New > eBook |
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
| New | yes | `New` | — | Merchant-set; must expire |
| Sold out | yes | `Sold out` | `Sold out` | Image and text fade to 40%. Never a strike-through, never a grey fill |
| Digital only | yes | `eBook` | — | |
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

## 9. The three variations

They differ **only** in how labels are filled and shaped. Structure, copy, states and rules are
identical, so the choice is cosmetic and reversible.

1. **Quiet** — paper fill, thin ink frame on the bar and pill. Nothing filled. Calmest in a grid.
2. **Marker** — yellow fill, no borders, fully rounded like the reference. Media keeps its hard
   shadow. Warmest and most obviously Walterin.
3. **Ink** — ink fill, paper text. Highest contrast, and it keeps yellow for actions only, so a grid
   of cards never competes with the buttons on the page.

## 10. Open questions

- **Which variation.** Veronka decides.
- **Category source.** Product tags are currently inconsistent — the sticker set is tagged `PARIS`
  and Paris is tagged `PRAGUE` (backend audit S1). The category label is only as good as those tags,
  so they get fixed before this ships.
- **"New" needs an expiry.** A `New` pill that nobody removes becomes a lie. Either a metafield with
  a date, or a rule ("30 days from publication"), decided before it is used.
- **Does the tarot show `Coming soon` or nothing?** It has no date and no notify deadline. Showing
  the bar is honest; showing nothing is calmer.
