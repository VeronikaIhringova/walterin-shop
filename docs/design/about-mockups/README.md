# About page — five directions

> Mock-ups only. Nothing here is in the theme, and none of it has been near the live site.
> Made 25 Sep 2026, for the decision on how to rebuild `/pages/about-us`.

## Look at them

```
open docs/design/about-mockups/index.html
```

Tabs switch direction. The **1440** and **390** buttons show or hide each width, so you can compare
desktop and phone side by side or look at one on its own.

Each direction is also a plain page you can open on its own: `dir-A.html` … `dir-E.html`.

## The five

| | Leads with | Asks the visitor to |
| --- | --- | --- |
| **A · Sixteen panels** | The illustrated biography, made clickable | Play, then see the deck |
| **B · Lead with the work** | A book, full-bleed, with a claim over it | Buy |
| **C · Walter speaks** | First person, one column | Read, then look at the deck |
| **D · The strip** | Six panels: 1969 → now | Follow the arc, then look |
| **E · Two pillars** | The brand's thesis, not the man | Understand it, then buy |

**Recommendation: A, with B's closing section** — the grid as the page, the two products at the
bottom. It is the only direction that uses the strongest asset properly, and it fixes both of the
page's worst problems at once: nothing to click, and no product anywhere.

**It needs Walter.** Sixteen captions, two sentences each. The ones in the mock are an impression of
his voice to show the length — they are not shippable. If he will not write them, **D** gets most of
the effect from six, and **B** needs none.

## What is in here

- `dir-*.html` — the five directions, self-contained. Site chrome is abbreviated on purpose: these
  are about structure, not about re-mocking the header.
- `index.html` — the viewer above.
- `build.py` — generates the five files. Edit the copy here, not in the HTML, then run
  `python3 build.py` from this folder.
- `p-*.png`, `grid.png` — the sixteen panels of Walter's illustrated biography, cut out of
  `illustrated_biography_pixel_*.png` on the Shopify CDN so single panels can be used on their own.
  Walter's artwork; not for use outside Walterin.

The full-page screenshots are not committed — they are ~20 MB and `build.py` plus a browser
regenerates them.

## Why the page needed this

The live page, as of 25 Sep 2026:

- says *"HI, MY NAME IS WALTER IHRING"* and then describes him in the third person underneath;
- links to **no product at all** — its one button is disabled and labelled `"Button label"`;
- has **no Slovak** — five strings, none registered, so `/sk/` shows English;
- leaves the sixteen-panel biography as a flat PNG. On a phone it renders 360px wide, which is
  **90px per panel** — the hand-lettering is unreadable;
- never says what a Walterin book is, or why nine frames.

Two things flagged for Veronka rather than decided:

1. **The Playboy paragraph** (2010, issue 5/2010, dividing women into "fire-engine" and
   "racing-car" types) is the longest on the page. It is Walter's bio and his call, but it is the
   biggest liability on the site a month before launch.
2. The biography artwork is navy / orange / green — **a palette that appears nowhere else on the
   site.** Whichever direction wins, that has to be reconciled deliberately.
