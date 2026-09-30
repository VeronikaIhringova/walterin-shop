# Launch label — three directions

Mock-ups only. Nothing here is in the theme.

```
open docs/design/launch-label-mockups/index.html
```

## What it shows

**First screen: all three side by side.** For each direction — the product-page label above the
notify-me email field (Digital, Printed, and the no-date fallback), then the same wording as a
product-card badge.

**Click a direction** (top tabs, or the button at the foot of a column) for the interactive
version: switch Digital ↔ Printed and watch the label and price change, type in the email field,
and toggle 1440 / 390 and EN / SK.

## The wording (agreed 30 Sep 2026)

| | EN | SK |
|---|---|---|
| Digital | Available from October 23rd | Dostupné od 23. októbra |
| Printed | Available from November 10th | Dostupné od 10. novembra |
| No date yet | Coming soon | Už čoskoro |

A product with no confirmed date — the tarot, and the sticker set unless it gets one — keeps
"Coming soon" **in the same design**. Never a guessed date, and never "Sold out" for something that
has not launched.

## The three directions

**1 · Stamped.** A date stamp, not a button. Nothing is filled: two ink rules, a small
letter-spaced "Available from", then the date large in WalterinBold, the whole thing rotated a
degree and a half as if pressed by hand. Yellow appears only as a marker under the date. The
quietest of the three, and the one that looks least like a control you could press. On a card it
hangs slightly off the left edge, like a stamp applied over the corner.

**2 · Marquee.** A banner across the whole column, the way a comic announces a chapter. Solid
yellow, ink rules top and bottom, a star at each end. Loud on purpose: while an edition is
unreleased it replaces the price as the thing the eye lands on. On a card it becomes a band across
the foot of the image.

**3 · Balloon.** A speech balloon with its tail pointing down at the email field — the house medium
saying the one thing it has to say. Paper fill, ink outline, hard shadow. It reads as the shop
talking to you rather than a label stuck on the page, which is the most Walterin of the three.

## Notes

- Only the design system: paper `#FFFDF7`, ink `#222222`, yellow `#FCF205`, 2.5px frames, 8px
  radius, hard `4px 4px 0` shadow. No grey, no gradients, no soft shadows. WalterinBold is loaded
  from the same CDN URL the theme uses, so the display face is real.
- The label sits **directly above the email field**, not at the top of the column: it is the reason
  to sign up, so it belongs to the form.
- Direction 1 splits the sentence — "Available from" is the kicker, the date is what the stamp is
  for — so it never says "Available from" twice. The other two use the whole line.
- Card badges and product-page labels come from one function per direction (`labels.js`), so they
  cannot drift apart.
- Product images are the real ones, loaded from the live CDN.

## Files

`index.html` — overview + the direction switcher · `frame.html` — one interactive product page,
takes `?dir=1|2|3&lang=en|sk` · `label.css` — the three label and badge designs ·
`labels.js` — the copy, EN and SK, and the markup for each direction.
