# The nine-frame path diagram — web assets

The diagram printed in the box, prepared for the storefront. Source of truth for anyone rebuilding it.

## Source
Two print PDFs, one per language, each one page at 238 × 391 pt — which is 84 × 138 mm, the card's
own size, so the page **is** the card:
- English: `assets/Comic_Tarot_of_Consciousness_Official_Cards.pdf`
- Slovak: `assets/cesta v 9 krokoch.pdf`

Both are the same artwork with different text, and their grid lines fall on the same pixels, so one
set of measurements serves both.

## What was produced
| File | Size | What it is |
| --- | --- | --- |
| `assets/nine-frame-path.png` | 1400 × 2375, 163 KB | the whole diagram: title, the rotated row questions, the grid, the Walterin wordmark. White margins trimmed, 48-colour palette. |
| `assets/nine-frame-path.webp` | 1400 × 2375, 177 KB | same, WebP q92 |
| `assets/nine-frame-path-grid.png` | 900 × 1398, 76 KB | the grid alone — no title, no wordmark, no empty strip under the bottom row. This is the one used as the map. |
| `assets/nine-frame-path-grid.webp` | 900 × 1398, 91 KB | same, WebP q92 |
| `assets/nine-frame-path-card.png` / `.webp` | 800 × 1314, 82 / 85 KB | **the English card**, whole page at the card's proportions — what the storefront shows |
| `assets/nine-frame-path-card-sk.png` / `.webp` | 800 × 1314, 79 / 83 KB | **the Slovak card**, `cesta v 9 krokoch` — shown on the Slovak site |

Rendered from the PDF at 8× (1905 × 3130), cropped on measured grid lines, resized with Lanczos,
quantised to 48 colours. Serve WebP with the PNG as the fallback in a `<picture>`.

## Cell geometry
Measured from the grid lines in the 8× render, not estimated. Each cell covers its label strip
(ŠANCA / CHANCE …) **and** the coloured cell under it. The same numbers work for both languages.

Percentages of the **whole card** (`nine-frame-path-card`, `-sk`) — this is what the storefront uses:

```
cols: [13.54, 39.00, 65.09, 91.97]
rows: [10.10, 35.97, 60.93, 85.02]
```

Percentages of the **grid crop** (`nine-frame-path-grid`), kept for the cropped version:

```
cols: [0.53, 32.65, 65.56, 99.47]
rows: [0,    34.54, 67.85, 100]
```

Frame *i* on a card maps to row `floor(i / 3)`, column `i % 3` — the same order as the nine frames.

**English, as printed**

| | Chance / Openness / To try | Idea / Meaning / To develop | Value / Trust / To create |
| --- | --- | --- | --- |
| What to understand? | recognise the moment | what has potential | what matters |
| What to accept? | embrace the unexpected | why do it | release control |
| What to transform? | begin unprepared | carry on | bring into consciousness |

**Slovak, as printed** — these are Walter's words, not translations. Note the third row: the Slovak
card says **zmeniť**, not premeniť, so the Slovak site says zmeniť everywhere.

| | Šanca / Otvorenosť / Skúšať | Idea / Zmysel / Rozvíjať | Hodnota / Dôvera / Tvoriť |
| --- | --- | --- | --- |
| Čo pochopiť? | rozpoznať moment | čo má potenciál | čo je dôležité |
| Čo prijať? | prijať nečakané | prečo to robiť | uvoľniť kontrolu |
| Čo zmeniť? | začať nepripravený | pokračovať | dostať do vedomia |

In running text the question mark is dropped — "Row: What to understand" / "Riadok: Čo pochopiť" —
the same way the English site already treats the printed row questions.

## Still open for Walter — the colours do not match
The printed diagram and the cards use different palettes, and the diagram was **not** recoloured:

| Row | On the cards | In the printed diagram |
| --- | --- | --- |
| What to understand | `#69E7FD` bright cyan | a softer, greyer blue |
| What to accept | `#FFFE03` yellow | the same yellow |
| What to transform · Čo zmeniť | `#75FEF4` turquoise | a leaf **green** |

So on one page the third row is turquoise in the artwork and green in the diagram. Three ways out:
recolour the diagram to the card palette, repaint the cards' third row (no — they are at print),
or leave both and treat the diagram as a printed object quoted as it is. Veronka and Walter decide;
nothing has been changed in the meantime.
