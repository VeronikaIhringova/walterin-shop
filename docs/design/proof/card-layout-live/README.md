# Live proof — card layout, type hierarchy and the pill

Captured from **walterin.com** on 7 October 2026, straight after the push, in fresh browsers with no
cookies and no preview session. The theme serving every page was **164726866249** — the live theme,
asserted in the run rather than assumed, because a preview session follows a visitor onto the real
domain. Safari (WebKit) for the images; Chromium measured alongside.

Pointer parked in the corner before every capture, so nothing is hovered and the pill is shown at
rest.

| File | What it shows |
|---|---|
| `390-*`, `430-*` | phone — one card per row, pill full width at the slim phone scale (34px / 12px) |
| `*-narrow-desktop` | **a desktop browser at 390px with no touch at all** — the case where the pill used to vanish |
| `768-*`, `1024-*` | tablet — two per row, equal heights within the row, pill always visible |
| `1440-*` | desk — three per row, ruled bottom edge, pill hover-revealed (correctly absent at rest) |

Measured on every page above, both engines, EN and SK: the name is always larger than the price, the
name-to-price gap is constant, the card and pill are `rgb(255,254,251)`, no pill is underlined, and
the pill is full width and never hidden at or below 1024px.

## Two things the run flags that are not faults

1. **Dead space of 36–57px at 768 and above.** This is the equal-height trade Veronka chose on
   7 Oct: cards in a row end on one line, and the spare height lands under the shorter titles. It
   never appears at a phone width. Recorded in `PRODUCT-CARD-SYSTEM.md` so it is not re-reported as
   a bug.
2. **The home page scrolls sideways at 768 and 1024.** Pre-existing on live, unrelated to cards —
   the closed cart drawer is parked off the right edge instead of being taken out of the layout.
   Its own step on the plan, with the iPad Tarot bug.
