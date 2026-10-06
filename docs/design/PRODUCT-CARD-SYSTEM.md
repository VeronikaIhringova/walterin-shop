# Product card system

The single rule for every product card on walterin.com — the home page, Shop, "You may also like",
search results, the cart recommendations. If a card appears anywhere else, it follows this.

**Decided 6 October 2026 (Veronka): variation B · Paper.**
Mock-ups: `docs/design/card-labels-mockups/` — `open docs/design/card-labels-mockups/index.html`.
Reference the direction came from: rhode.com product cards.

> **This replaces the 30 September "Quiet" direction entirely.** That version put a category word
> top-left, a 2.5px frame round every card and a flat bar welded to the foot of the image, kept
> "New" for three months and called it *Novinka* in Slovak. All of that is superseded. Where an
> older note disagrees with this file, this file wins.

---

## 1. The idea

The card is already right: image, then title left and price right beneath it. **Nothing about that
changes.** Two things are added, and only two:

- a **New pill**, top right of the image;
- a **bar**, wide and rounded, near the bottom of the image, clear of the title.

The artwork stays the loudest thing on the card. The bar is quiet until it matters.

## 2. Anatomy

```
┌───────────────────────────────┐
│                      [ NEW ]  │  ← pill, top right, only when new
│                               │
│          product image        │
│                               │
│   (  Available from Oct 23  ) │  ← bar: inset from the edges, rounded
└───────────────────────────────┘
   WALTERIN PRAGUE      €16,00     ← unchanged: title left, price right
   COMIC BOOK
```

**The bar sits inside the image, not under it.** It is inset 12px from the left, right and bottom,
so a strip of artwork shows beneath it, and the card's own 14px of top padding keeps clear space
between the bar and the title. The bar never touches the title block.

## 3. The states

Exactly one bar state at a time. They are listed in the order a product lives through them.

| State | Bar says (EN) | Bar says (SK) | When it shows |
|---|---|---|---|
| **No confirmed date** | `Coming soon` | `Už čoskoro` | always visible |
| **Confirmed date** | `Available from October 23rd` | `Dostupné od 23. októbra` | always visible |
| **Buyable** | *per product, §4* | *per product, §4* | **hover** on a desk · **always** on a phone |
| **Sold out** | `Sold out` → `Tell me when it is back` | `Vypredané` → `Dajte mi vedieť` | always visible; the second wording on hover, and always on a phone |

**Never "Sold out" before launch.** A thing that has not been for sale yet cannot be sold out — that
is the whole reason the first two states exist. The date comes from `snippets/launch-date.liquid`
and nowhere else, so a card and the page it opens can never disagree.

**Sold out offers the bell, not just the shut door.** "Sold out" alone tells someone to go away;
the second wording opens the same notify form the product page already uses.

### The New pill

| | EN | SK |
|---|---|---|
| Pill | `New` | `Nové` |

**One month from `published_at`, computed in Liquid, then it disappears by itself.** Nobody sets it
and nobody has to remember to remove it. **Sold out beats New** — if a card would show both, the
pill is dropped. At most one pill, ever.

## 4. The call to action, per product

Written one product at a time, not assembled from a template: "Buy the deck" is right for a tarot
and wrong for stickers. **Slovak is written natively, never translated** — *Kúpiť tarot*, not a
literal *Kúpiť balíček kariet*.

| Product | EN | SK |
|---|---|---|
| Tarot of Consciousness | `Buy the deck` | `Kúpiť tarot` |
| Walterin Prague — eBook | `Buy the e-book` | `Kúpiť e-knihu` |
| Walterin Prague — printed | `Buy the comic book` | `Kúpiť komiks` |
| Prague Sticker Set | `Buy the stickers` | `Kúpiť nálepky` |

**A product with two editions on one card** (Prague) follows whichever is the cheaper buyable one:
the e-book while only that is on sale, the comic book once both are. The card links to the product
page; it never adds to the cart directly, because the visitor has not chosen an edition yet.

**A new product needs its own line here.** Without one the bar falls back to the neutral
`Buy` / `Kúpiť`, which is correct but flat — so adding a product means adding its sentence.

## 5. Sizes, spacing and colour

All values come from the design system. No raw colours, no new tokens.

### The bar

| | Desktop | Phone (≤ 430px card) |
|---|---|---|
| Inset from image edges | `12px` left / right / bottom | `8px` |
| Min height | `40px` | `36px` |
| Padding | `9px 14px` | same |
| Radius | `999px` (full round) | same |
| Font | body, 600 weight, `13px` | `12px` |
| Fill | `var(--wui-paper)` | same |
| Frame | `var(--wui-line-thin)` (1.5px) solid `var(--wui-ink)` | same |
| Shadow | none | none |
| Hover fill (buyable) | `var(--wui-yellow)` | n/a |

The label is one line: `white-space: nowrap`, with an ellipsis if a future product's wording is too
long for a narrow card. **If a call to action needs two lines, the wording is wrong — shorten it.**

### The New pill

| | |
|---|---|
| Position | `top: 10px; right: 10px` |
| Padding | `4px 10px` |
| Font | display, `11px`, uppercase, `letter-spacing: .06em` |
| Fill | `var(--wui-yellow)` |
| Frame | `1.5px` solid `var(--wui-ink)` |
| Radius | `999px` |

### Space between the bar and the words

The card text keeps its existing `14px` top padding. Together with the bar's 12px inset that leaves
**26px of clear space** between the bar and the title — enough that the two never read as one block.

### The card itself

**No frame around the card.** Paper ground, image, text beneath. This is the current live card and
it does not change.

## 6. Hover and touch

```css
/* Only the buyable bar hides. Every other state is always visible. */
.card[data-state="buyable"] .bar { opacity: 0; transform: translateY(6px); pointer-events: none; }
.card[data-state="buyable"]:hover .bar,
.card[data-state="buyable"]:focus-within .bar { opacity: 1; transform: none; pointer-events: auto; }

@media (hover: none) {
  .card[data-state="buyable"] .bar { opacity: 1; transform: none; pointer-events: auto; }
}
```

Three rules behind that:

1. **`:focus-within` as well as `:hover`.** A keyboard reaches the bar or it does not exist.
2. **`@media (hover: none)` on touch.** A hover that never happens is a feature nobody can reach, so
   on a phone the buyable bar is simply always there.
3. **Only *buyable* hides.** A date or a "Coming soon" is information, and information does not wait
   to be hovered.

Transition: `opacity` and `transform`, `.18s var(--wui-ease)`. Respects `prefers-reduced-motion`
through the design system's existing blanket rule.

## 7. Accessibility

- The bar is a link to the product page, not a button, except in the sold-out state where it opens
  the notify form.
- The pill carries screen-reader text: "New" is announced as **"New product"**, so it is not read as
  a stray word.
- Bar text on paper is ink: **15.6 : 1**. On the yellow hover fill it is **13.4 : 1**. Both pass AA
  comfortably. **Never white text on yellow** — see `BUTTONS.md`.
- Minimum target 40px tall on a desk, 36px on a phone, with the whole card clickable behind it.

## 8. Where it lives

| File | What it owns |
|---|---|
| `snippets/card-product.liquid` | the pill and the bar markup, and which state a card is in |
| `snippets/launch-date.liquid` | the date, and whether one is confirmed at all |
| `assets/walterin-ui.css` | every size, colour and the hover/touch behaviour |
| `locales/en.default.json`, `locales/sk.json` | every word, including the per-product wording |

## 9. Decided, and still open

**Decided**

- Variation **B · Paper** (Veronka, 6 Oct 2026).
- `New` lasts **one month**, automatic from `published_at`. *(Changed from three months.)*
- Slovak for the pill is **`Nové`**. *(Changed from `Novinka`.)*
- No category word top-left. No frame around the card.
- Sold out offers the notify wording on hover and always on a phone.

**Still open**

- The rhode reference screenshot was never added to the repo, so the proportions were taken from
  Veronka's written description. If it is added and the weight is different, re-check §5.
- Whether the bar should also appear on the home page's featured row, or only on Shop and
  "You may also like".

## 10. Related

- [LINE-BREAKS.md](LINE-BREAKS.md) — the bar label is one line; if it wraps, the wording is wrong.
- [BUTTONS.md](BUTTONS.md) — why the bar is not a yellow button.
- [SPACING.md](SPACING.md) — the space between the bar and the title.
- [../WALTERIN-GROUND-TRUTH.md](../WALTERIN-GROUND-TRUTH.md) — launch dates and what may be claimed.
