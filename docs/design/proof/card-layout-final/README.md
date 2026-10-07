# Card layout, type hierarchy and the pill — build awaiting "OK live" (7 Oct 2026)

Safari (WebKit), captured from the preview, cropped to the shopping row, pointer parked in the
corner so nothing is hovered.

| File | What it shows |
|---|---|
| `390-*`, `430-*` | phone — one card per row, pill full width at the slim phone scale |
| `768-*`, `1024-*` | tablet — two per row, equal heights within the row, pill always visible |
| `1440-*` | desk — three per row, ruled bottom edge, pill hover-revealed (so it is absent here, correctly) |
| `*-narrow-desktop` | **a desktop browser dragged narrow, no touch at all** — the case where the pill used to vanish |

The last row is the point of this set. Visibility used to key off `@media (hover: none)` alone, so
any browser reporting a pointer hid the pill at rest — including a desktop window at phone width.
It is now `(hover: none) OR a viewport up to 1024px`, and the `-narrow-desktop` shots are the proof
that the two agree.

Measured on every surface here, both engines, with touch and without: pill spans the card inset
10px each side, 34px tall at 12px on a phone, and never hides at or below 1024px.

Spec: `docs/design/PRODUCT-CARD-SYSTEM.md`. How layout B was chosen: `../phone-layouts/index.html`.
