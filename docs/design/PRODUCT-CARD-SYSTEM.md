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
| **Sold out** | `Sold out` → `Tell me when it is back` | `Vypredané` → `Dajte mi vedieť` | **hover** on a desk · **always** on a phone; the second wording is the hover state |

**Every state waits for a hover on a desk** (Veronka, 6 Oct 2026), not just the buyable one. At
rest the card is image, title and price, and nothing else — the bar is the answer to "tell me
more", so it arrives when the visitor reaches for the card. On a phone there is no hover, so every
bar is simply always there.

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
| Inset from image edges | `14px` left / right, `16px` bottom | `10px` / `12px` |
| Switches at | card wider than 320px | card 320px or narrower (a 1440 card is ~407px, a 390 card ~170px) |
| Min height | `48px` | `44px`, growing when the label wraps |
| Padding | `9px 14px` | same |
| Radius | `999px` (full round) | same |
| Font | body, 600 weight, `14px` | `13px` |
| Fill | `var(--wui-card)` — the card colour, §5 | same |
| Frame | `var(--wui-line-thin)` (1.5px) solid `var(--wui-ink)` | same |
| Shadow | none | none |
| Hover fill (buyable) | `var(--wui-yellow)` | n/a |

The label is one line on a desk. **On a narrow card it wraps instead of truncating**, and the bar
grows to hold it: "Available from October 23rd" does not fit on a 170px card, and an ellipsis would
hide the one thing the card most needs to say. Two lines of a date beats half a date.

**A call to action still has to fit on one line.** If a "Buy the…" needs two, the wording is wrong.

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

### `--wui-card` — the card colour  `#FFFEFB`

**Decided 6 October 2026 (Veronka), after three rounds.** One colour, used in exactly three places,
so all three read as the same material:

- the ground behind a card's title and price;
- the fill of the card's bar;
- the fill of the **product page's availability pill** (§B below).

It is white carrying a trace of the page beige, which makes a card very slightly **lighter** than
the page it sits on rather than darker. Ink on it measures **15.77 : 1**.

**What was rejected, so nobody walks the same road again:**

| Tried | Why it went |
|---|---|
| `#F3F3F3` grey | the original Dawn leftover — reads cold against a warm paper page |
| `#FAF4E4` cream · `#EFE4CE` sand · `#FBF3C4` pale yellow | "none of the three, they look bad" — all too strong; they turned the card into a panel competing with the artwork |
| `#FFFFFF` pure white | indistinguishable from `#FFFEFB` in practice, and gains nothing |

**The honest caveat.** Separation from the page is about **1.009 : 1**. A contrast ratio measures
text legibility, not the edge of a large flat panel, so that number is not the test — but it is low,
and the cards hold together because of the gaps between them and the product photographs, not
because of the fill. **If a card ever stops reading as a card, that number is what to revisit** —
and the answer is a frame or more space, not a darker fill, which has now been tried three ways.

**No other card colour exists anywhere on the site.** Three things had to be removed to make that
true, and all three are the kind that come back:

1. `--wui-card-white` / `--wui-card-tint`, the two comparison tokens.
2. `snippets/wui-preview-switch.liquid` and its `?card=` / `?pill=` switch.
3. A **Shopify per-section Custom CSS** rule — `.card--card { background-color: #f3f3f3 !important; }`
   on the home page's featured collection. It lives in the `custom_css` array of
   `templates/index.json`, not in any stylesheet, which is why the home page kept showing the old
   grey after the token changed and why grepping the CSS found nothing. **Look there first** if a
   card colour ever disagrees with this file again.

**The ink frame stays.** Tested both ways: without it the bar vanishes into a pale product
photograph — the tarot box sits on a light ground, and a bar with no edge reads as a smudge rather
than a control. Screenshots: `docs/design/proof/card-labels/v3/`.

### B · The product page pill

**Decided 6 October 2026 (Veronka): placement B.** The same pill as the card's bar, in the
**price row** of the product page, where it takes the shipping line's place.

| | |
|---|---|
| Lives in | `sections/walterin-buy.liquid`, inside `.wui-buy__price` |
| Markup | `<p class="wui-buy__pill-row" data-wui-launch-line><span class="wui-pill" data-wui-launch-pill>` |
| Words | `Coming soon` / `Available from [date]`, from `snippets/launch-date.liquid` |
| Replaces | the `Shipping calculated at checkout` line, while a pill is showing |

Two rules that are easy to break:

- **The row is always in the markup**, hidden when there is nothing to say. `walterin-buy.js` fills
  it as the visitor changes edition, so a row printed only when the *first* edition happens to carry
  a label would leave a later edition silently blank. This matters after 23 October, when the eBook
  launches and the printed edition is still waiting.
- **The shipping line stands down via `:has([data-wui-launch-line]:not([hidden]))`.** Without the
  `:not([hidden])` the row's permanent presence would hide the shipping line on every edition,
  including a perfectly buyable one.

Rejected: placement A, directly above the email field. It said the right thing too late — a visitor
reads the price, and the answer to "can I have this" belongs there, not further down the page.

### Type hierarchy — the name leads, the price supports

**Decided 7 October 2026 (Veronka).** It used to be the other way round, by accident: the title was
17px at weight 500 and the price 16px at weight **700** — a pixel smaller and two weights heavier —
so the eye landed on the price.

| | Narrow card (≤ 259px) | Wide card (≥ 260px) |
|---|---|---|
| Name | `16px` | `18px` |
| Price | `13px`, weight `500` | `15px`, weight `500` |
| Gap between them | `6px`, stacked | `24px`, between the columns |
| Space under the price | `12px` | `14px` |

**The price keeps full ink**, 15.77:1. Greying it is the obvious way to make it recede, and it is
wrong here: the price was invisible yellow until 6 Oct 2026 and does not go back towards low
contrast to make a point about hierarchy. Size and weight carry it.

**Beating Dawn takes four classes, not three.** Dawn ships
`.grid--2-col-tablet-down .product-card-wrapper .card__heading.h5` at `1.3rem` — which is 13px,
*exactly* the size this table gives the price. A three-class selector loses to it and makes the name
and the price identical. Match `.h5` explicitly or the hierarchy silently collapses.

**Nothing but padding sits under the price.** Three separate things were adding space there, found
one box at a time: this file's own padding, a `10px` foot on Dawn's `.card__information`, and the
price wrapper's line-height strut hanging 6px below the number it holds. All three are zeroed.

### Card heights — phones and desks differ

**Decided 7 October 2026 (Veronka).**

| | Phone (≤ 749px) | Desk (≥ 750px) |
|---|---|---|
| Height | natural — each card as tall as its own words | equal — every card matches the tallest |

Equal heights and "no empty areas" cannot both be had at a given width: the stretch has to go
somewhere, and it goes under the price of the shorter titles as a block of card colour with nothing
in it. The split works because the answer genuinely differs — on a phone the row holds one card, so
there is no neighbour to line up with and the stretch would buy nothing.

**Known and accepted on a desk:** the void returns where titles differ in length. Measured at **36px
and 57px at 768 and 1024**, and **36px at 1440 in Slovak**, where *Komiksový tarot vedomia* runs to
three lines against the English two. That is the price of the ruled bottom edge, recorded here so
nobody later reports it as a new bug.

### The phone layout — one card per row

**Decided 7 October 2026 (Veronka): layout B.** Chosen over three others, all built and compared in
`docs/design/proof/phone-layouts/`:

| | Why not |
|---|---|
| **A** two per row | with three products the last card sits beside an empty half-row, and at 390 the tarot name needs four lines |
| **C** swipe row | products two and three are never seen by anyone who does not swipe — on a three-product shop, that hides two thirds of it |
| **D** 1 + 2 | no half-empty row, but it forces an editorial call about what comes first |

One per row costs length and nothing else, and at three products there is barely any length to pay.
It is also the only layout where the card is wide enough for the name and price to sit side by side,
every title to fit two lines, and the date to fit the pill on one line.

**Queued, not built:** a customer-facing toggle between this and two-per-row, the way a shop offers
grid or list. Post-launch — see the plan.

### The bar hugs its words

On a phone the bar is `width: fit-content`, centred, rather than inset to the card's edges. Stretched
across a full-width card, a pill holding "Coming soon" in the middle of 340px reads as an empty input
field rather than a label. It also does what "slimmer and smaller" asks: the pill stops being the
widest thing on the artwork. Phone bar: `34px` tall at `12px`, against `48px` at `14px` on a desk.

**Keyed to the phone as well as to the card width.** A full-width card on a 390px phone is 360px —
wide by the container's measure, still a phone by the hand holding it — so the media query has the
final say over the container query here.

### The card itself

**No frame around the card.** Image, then text beneath. This is the current live card and it does
not change.

## 6. Hover and touch

```css
/* Every state hides at rest. The card is calm until it is reached for. */
.wui-cl__bar { opacity: 0; transform: translateY(8px); pointer-events: none; }
.card-wrapper:hover .wui-cl__bar,
.card-wrapper:focus-within .wui-cl__bar { opacity: 1; transform: none; pointer-events: auto; }

@media (hover: none) {
  .wui-cl__bar { opacity: 1; transform: none; pointer-events: auto; }
}
```

Three rules behind that:

1. **`:focus-within` as well as `:hover`.** A keyboard reaches the bar or it does not exist.
2. **`@media (hover: none)` on touch.** A hover that never happens is a feature nobody can reach, so
   on a phone the buyable bar is simply always there.
3. **On a phone the bar is simply always there.** There is no hover to wait for, and the
   alternatives are worse: tap-to-reveal costs a tap and steals the one the card already uses to
   open the product, and moving the status under the price pushes the price down the screen and
   makes the card taller than the artwork it is selling.

Transition: `opacity` and `transform`, `.18s var(--wui-ease)`. Respects `prefers-reduced-motion`
through the design system's existing blanket rule.

## 7. Accessibility

- The bar is a link to the product page, not a button, except in the sold-out state where it opens
  the notify form.
- The pill carries screen-reader text: "New" is announced as **"New product"**, so it is not read as
  a stray word.
- Bar text on the card colour is ink: **15.77 : 1**. On the yellow hover fill it is **13.4 : 1**. Both pass AA
  comfortably. **Never white text on yellow** — see `BUTTONS.md`.
- Minimum target 40px tall on a desk, 36px on a phone, with the whole card clickable behind it.

## 8. Where it lives

| File | What it owns |
|---|---|
| `snippets/card-product.liquid` | the pill and the bar markup, and which state a card is in |
| `snippets/launch-date.liquid` | the date, and whether one is confirmed at all |
| `assets/walterin-ui.css` | `--wui-card`, every size, and the hover/touch behaviour |
| `sections/walterin-buy.liquid` | the product page pill, in the price row |
| `templates/index.json` | watch the `custom_css` array — it can override all of the above |
| `locales/en.default.json`, `locales/sk.json` | every word, including the per-product wording |

## 9. Decided, and still open

**Decided**

- Variation **B · Paper** (Veronka, 6 Oct 2026).
- `New` lasts **one month**, automatic from `published_at`. *(Changed from three months.)*
- Slovak for the pill is **`Nové`**. *(Changed from `Novinka`.)*
- No category word top-left. No frame around the card.
- Sold out offers the notify wording on hover and always on a phone.
- **`--wui-card` is `#FFFEFB`**, and it is the only card colour on the site.
- The product page pill sits in the **price row** (placement B), not above the email field.
- **The name leads, the price supports** — everywhere a card appears (7 Oct).
- **One card per row on a phone**; natural heights there, equal heights on a desk (7 Oct).

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
