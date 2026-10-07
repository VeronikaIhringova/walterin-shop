# Card layout and type hierarchy — the build Veronka approved on 7 October 2026

Safari (WebKit), captured from the preview, cropped to the shopping row.
`390` and `430` have touch emulated, so the pills behave as they do on a phone rather than as they
do in a narrow desktop window.

- **390 / 430** — one card per row (layout B), natural card heights, pill hugging its words
- **768** — two per row, equal heights within the row
- **1440** — three per row, equal heights, the ruled bottom edge

The name leads at 16px (narrow) / 18px (wide); the price supports at 13px / 15px, weight 500, full
ink. Both languages, because Slovak is the longer one and it is where the layout gets tested.

Spec: `docs/design/PRODUCT-CARD-SYSTEM.md`. How layout B was chosen: `../phone-layouts/index.html`.
