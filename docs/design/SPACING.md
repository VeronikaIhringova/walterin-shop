# Spacing — the vertical rhythm

> The rule every section follows. If you are about to type a pixel value for a gap, the answer is
> already here. Last changed 24 Sep 2026.

## The problem this fixes

Before this, every section chose its own vertical padding: the buy column used 48/96, Meet the cards
96, How a card is read 48, Questions 48, Look inside 48. Nobody was wrong on their own, and the page
was wrong as a whole — measured gaps on the tarot page at 1440 ran **96, 144, 103, 125, 123**. The
eye reads that as carelessness even when it cannot name why.

**So sections no longer own the space between them. The page does.**

---

## The scale

Five steps. Each has one job. There is no sixth.

| Token | Job | Mobile | Desktop (≥990px) |
| --- | --- | --- | --- |
| `--wui-space-section` | section → section | **72px** | **96px** |
| `--wui-space-block` | group → group inside a section | **24px** | **32px** |
| `--wui-space-heading` | a heading → the content it introduces | **12px** | **16px** |
| `--wui-space-item` | item → item in a list | **8px** | 8px |
| `--wui-space-control` | a label → its control, an icon → its text | **4px** | 4px |

Defined in `assets/walterin-ui.css`. Mobile values sit on `.wui`; the desktop values override at
990px.

### Why these numbers

- **Each step is at least twice the one below it.** Nathan Curtis, *Space in Design Systems*
  (EightShapes, 2016): a linear scale — 4, 8, 12, 16, 20, 24 — gives "too many choices too close
  together", and the result is "unpredictably used". He recommends a geometric progression. Ours is
  96 → 32 → 16 → 8 → 4: one 3× step at the top where the break has to be unmistakable, then 2×.
- **Mobile is 0.75 × desktop.** This is exactly what Shopify's own Dawn theme does — every section
  computes `padding_top | times: 0.75` below its 750px breakpoint. It is the most conventional,
  lowest-risk choice for a commerce theme, and it means one decision produces both numbers.
- **The section break is 3× the group step.** The closest published number is GOV.UK Frontend, where
  the largest section break is 2.0× the paragraph gap on mobile and 2.5× on desktop. We sit just
  above that, because our sections are tall and image-heavy.
- **Fixed steps, not fluid.** None of Dawn, GOV.UK, Carbon or Tailwind ship viewport-scaled spacing.
  Utopia's `clamp()` approach is defensible but anchors space to viewport width, which Adrian
  Roselli has shown can work against a user who zooms — and zoom is exactly how someone reads a
  comic page on a small screen. We step at a breakpoint instead.

### Honest about what is not evidence

There is **no published number** for "how much bigger should a section break be than a paragraph
break". NN/g's writing on the proximity principle is entirely qualitative. The ratios above are
derived from shipped systems, not from a study. Treat them as a defensible convention, not a law.

---

## The section-to-section rule

Sections carry **no vertical padding of their own**. The gap between any two of them is exactly one
`--wui-space-section`, applied by the page:

```css
.wui.t-product #MainContent > .shopify-section + .shopify-section {
  margin-block-start: var(--wui-space-section);
}
```

This is what makes it impossible for a section to decide it needs "a bit more". Three supporting
rules handle the ways a section can smuggle padding back in:

- direct children of a section are zeroed (`padding-block: 0`);
- Dawn writes each section's padding into a generated class on a *descendant*
  (`.section-template--123__related-padding`), so that is zeroed too;
- the footer's own top padding is zeroed on product pages, or the page ends with a double gap.

**The page's first section** opens against the header, which is a lighter break than a section
change, so it gets `--wui-space-block`, not the section step.

**The one exception** — if a section ever has its own background colour, it needs real padding rather
than margin, or the colour band will collapse. There is no such section today. Add one and write
the exception down here.

---

## Horizontal alignment

Every section on a product page shares one content frame, whichever generation of the theme it came
from:

```css
.wui.t-product #MainContent :is(.wui-wrap, .page-width, .mw-inner, .fwi-inner) {
  width: var(--wui-frame);       /* 92%   */
  max-width: var(--wui-frame-max); /* 1400px */
  margin-inline: auto;
  padding-inline: var(--wui-frame-pad); /* 15px, 50px from 750px */
}
```

At 1440 that puts every heading at **108px** from the viewport edge; at 390, **31px**.

---

## Worked examples

**A section heading and its lead line.** The heading and the line under it are one group, so they sit
`--wui-space-heading` apart. The group then sits `--wui-space-block` above the content it introduces
— more below than within, because the heading belongs to what follows it, not to what came before
(Butterick, *Practical Typography*, "Space above & below").

```css
.wui .wui-faq__head {
  display: grid;
  gap: var(--wui-space-heading);       /* heading → its lead line */
  margin-bottom: var(--wui-space-block); /* the group → the questions */
}
```

**A list of specs.** Rows are items: `--wui-space-item`. The list as a whole is a group:
`--wui-space-block` from whatever sits above it.

**A label and its radio button.** `--wui-space-control`. Nothing smaller exists.

---

## When you are about to break this

You are not. Pick the nearest step. If nothing fits, the layout is wrong, not the scale — and if you
genuinely believe a sixth step is needed, add it here first, with the reason, before using it.

---

## Checking it

`docs/design/responsive-check.py` walks every page at **320, 360, 390 and 412**, in both languages,
at normal and 175% text scaling, and fails on any horizontal scroll, overflow or clipped text.

360 and 412 are there because they are Android, and 390-only testing is what let the tarot page ship
with a 99px text column. The text-scaling pass is there because Android Chrome scales text without
scaling fixed-px columns, which is the same bug wearing a different hat.
