# The nine-frame path diagram — web assets

The diagram printed in the box, prepared for the storefront. Source of truth for anyone rebuilding it.

## Source
`assets/Comic_Tarot_of_Consciousness_Official_Cards.pdf` — one page, 238 × 391 pt, a single embedded
RGB image at 936 × 1498. No crop marks in the file.

## What was produced
| File | Size | What it is |
| --- | --- | --- |
| `assets/nine-frame-path.png` | 1400 × 2375, 163 KB | the whole diagram: title, the rotated row questions, the grid, the Walterin wordmark. White margins trimmed, 48-colour palette. |
| `assets/nine-frame-path.webp` | 1400 × 2375, 177 KB | same, WebP q92 |
| `assets/nine-frame-path-grid.png` | 900 × 1398, 76 KB | the grid alone — no title, no wordmark, no empty strip under the bottom row. This is the one used as the map. |
| `assets/nine-frame-path-grid.webp` | 900 × 1398, 91 KB | same, WebP q92 |

Rendered from the PDF at 8× (1905 × 3130), cropped on measured grid lines, resized with Lanczos,
quantised to 48 colours. Serve WebP with the PNG as the fallback in a `<picture>`.

## Cell geometry (percentages of `nine-frame-path-grid`)
Measured from the grid lines in the 8× render, not estimated. Each cell covers its label strip
(CHANCE / OPENNESS / TO TRY …) **and** the coloured cell under it.

```
cols: [0.53, 32.65, 65.56, 99.47]   // left → right
rows: [0,    34.54, 67.85, 100]     // understand → accept → transform
```

Frame *i* on a card maps to row `floor(i / 3)`, column `i % 3` — the same order as the nine frames.

| | Chance / Openness / To try | Idea / Meaning / To develop | Value / Trust / To create |
| --- | --- | --- | --- |
| What to understand | recognise the moment | what has potential | what matters |
| What to accept | embrace the unexpected | why do it | release control |
| What to transform | begin unprepared | carry on | bring into consciousness |

## Open question for Walter — the colours do not match
The printed diagram and the cards use different palettes, and the diagram was **not** recoloured:

| Row | On the cards | In the printed diagram |
| --- | --- | --- |
| What to understand | `#69E7FD` bright cyan | a softer, greyer blue |
| What to accept | `#FFFE03` yellow | the same yellow |
| What to transform | `#75FEF4` turquoise | a leaf **green** |

So on one page the third row is turquoise in the artwork and green in the diagram. Three ways out:
recolour the diagram to the card palette, repaint the cards' third row (no — they are at print),
or leave both and treat the diagram as a printed object quoted as it is. Veronka and Walter decide;
nothing has been changed in the meantime.
