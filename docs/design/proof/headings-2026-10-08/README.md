# Home page headings — structure fixed, pixels unchanged

Three faults, all structural, none visible:

| Before | After |
|---|---|
| **two `<h1>`** — Dawn makes the logo the home page's h1, and the first content block is already `<h1 class="pagetitle">` | one h1, the page title |
| **heading level skipped, 1 → 3** — the three feature headings were `<h3>` straight after the h1 | h2, so the outline reads 1 → 2 |
| **an empty `<h3>`** — the mobile drawer's title renders even when its setting is blank | rendered only when it has words |

## "No visual change" is measured, not asserted

The header and the feature section were screenshotted on **live** (still the old markup) and on the
preview, at 1440 and 390, and compared by SHA-256:

```
header   desktop  2880x206   6fc1b5a04e07  IDENTICAL
header   phone     780x184   9ce26b5e8936  IDENTICAL
features desktop  2880x954   adf671646613  IDENTICAL
features phone    780x2108   4bb760786b59  IDENTICAL
```

Byte-identical images, so nothing moved by even a pixel.

## One thing worth knowing

Changing the logo from `<h1>` to `<span>` *does* change its computed text styles — an h1 inherits
heading typography, a span does not. It renders identically because the element contains only the
logo `<img>`, and its box is unchanged. If the logo setting were ever emptied, Shopify falls back to
`<span class="h2">{{ shop.name }}</span>`, which carries its own class and is unaffected.

## And a correction

An earlier check reported the logo h1 as "empty". It is not: it holds the logo image with
`alt="Walterin"`, so it has always had an accessible name. That check stripped tags before testing
for text. The real fault was that there were two h1s, not that one was empty.
