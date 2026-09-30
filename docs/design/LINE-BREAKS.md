# Line breaks — break by meaning

**Mandatory, from 30 September 2026. Applies to every text on the site, in every language, at
every width: home, product pages, cards, about, FAQ, footer, cart, emails.**

A line break is punctuation. It tells the reader where to pause. Put one in the wrong place and
the sentence stumbles, even when every word is right.

---

## The rule

**Body text is a paragraph, not a poem.** That is the whole thing. Everything below follows from it.

1. **A short lead statement stays on one line.** Never broken. It is the sentence that has to land.
2. **Body text runs as a paragraph.** Lines reach a similar, fairly long length and fill the column.
   Do **not** give every clause its own line. A paragraph wrapping mid-phrase is correct — that is
   what prose does. `History told with timing, where observation` / `meets nuance, and a single
   detail` is right, even though the first line ends on a noun and the second on "detail".
3. **Related short sentences share a line.** `Cities become symbols. Facts become scenes.` belongs
   together, not stacked one above the other.
4. **The ending may have its own line**, for emphasis. `You recognize it.` earns it. One line per
   paragraph, at most.
5. **Never strand a single word from the next sentence at a line end.** `…sharpest form. Five` and
   `…Clean lines. A` are the fault. A short *group* of words carried over is fine, as long as the
   lines stay balanced.
6. **Keep pairs together**: `9:00–17:00`, `From €18,99`, `129 × 207 mm`, `Walter Ihring`.
7. **Check every width.** A break that is right at 1440 is often wrong at 390. On a phone the lines
   are shorter — but they are still paragraphs, not poems. Rules 1 and 5 hold there too.

### What it looks like

```
Comics move where language hesitates.          <- lead, one line, unbroken

Cities become symbols. Facts become scenes.    <- related short sentences share a line
Ideas travel lightly, but stay with you.       <- lines of a similar length
This is history you don't just read.
You recognize it.                              <- the ending, for emphasis
```

Not this:

```
Cities become symbols.
Facts become scenes.
Ideas travel lightly,
but stay with you.
```

### The exceptions

**A single long word alone on a line is acceptable on a narrow phone card** when it cannot fit
otherwise. `TAROT OF / CONSCIOUSNESS` at 170px is fine. Narrow cards only.

**A lead that genuinely cannot fit** on a phone breaks at a sentence boundary, never mid-phrase:
`Sharp insights. Clean lines.` / `A point of view.`

## How to do it — what actually works

Measured in WebKit and Chromium on 30 Sep 2026 (`scratchpad/wrap_test.py`), not taken from
documentation. Safari is the one that matters here: it is where the brand's readers are, and it is
where two bugs already bit us today.

### Use these

**1 · Let it wrap.** The default is no intervention at all. A paragraph with no forced breaks
fills its column and reaches even line lengths on its own. Reach for a tool only when rule 1, 4 or 5
is actually broken.

**Watch out:** in a Shopify `richtext` setting — which is what most of this copy lives in — a
`<span>` is silently stripped. Phrase spans are not available there. `<br>`, no-break spaces and
CSS are.

**2 · No-break space (U+00A0) — for pairs.** Universal support, no CSS, works in email too.
Type it between the words that must never separate: `From €18,99`, `9:00–17:00`.
For a pair with no space in it, the word joiner U+2060 does the same job around punctuation.

**3 · `white-space: nowrap` on a span — for a pair of several words.**

```html
<span class="wui-nb">From €18,99</span>
```

Already in the design system as `.wui-nb`.

**4 · `text-wrap: balance` — as a finish, never as the plan.** Confirmed working in **both** WebKit
and Chromium. It evens out line lengths; it **cannot** decide where a break belongs semantically. Use
it on headings and short leads. In a paragraph it is usually unnecessary: a full column of prose
already reaches even lines by itself.

### Do not use these

**`text-wrap: pretty` — the engines disagree.** Both report `CSS.supports(...) === true`, but in the
same test WebKit re-balanced the text and Chromium left it exactly as `wrap`. A property that claims
support and then does nothing in Chrome is worse than no property: it looks right to whoever tested
in Safari and is wrong for everyone else.

**A `<br>` per clause.** This is the mistake that produced this rewrite: every clause on its own
line turns prose into a poem. Use `<br>` for the gap between a lead and its paragraph, and for an
ending given its own line. Not to punctuate a paragraph.

**A bare `<br>` for anything that must reflow.** It is frozen at every width. A `<br>` that reads
well at 1440 can strand a word at 390, and rule 7 then fails.

**Breaking with `&nbsp;` padding or spaces.** It moves with the font and falls apart on the first
text change.

---

## Checking it

The Playwright run checks this automatically — `tools/check-line-breaks.py`. It reads the real line
boxes out of the rendered page (not the HTML) and flags:

- `orphan` — a **last line holding one word**, with the narrow-card exception applied automatically;
- `stranded` — a line ending on the **lone first word of the next sentence**, rule 5;
- `stacked` — a paragraph set **one clause per line**, rule 2: three or more lines that end on a
  clause boundary while leaving a quarter of the column empty;
- `unbalanced` — a last line under 40% of the width of the one above it.

It deliberately does **not** flag an ordinary mid-phrase wrap inside a paragraph. That is correct
prose, and a checker that complains about it teaches the wrong habit.

Run it at 1440 and 390, in both languages, before showing anything.

```
python3 tools/check-line-breaks.py --url http://127.0.0.1:9292 --widths 1440,390 --locales en,sk
```

---

## Writing to be broken well

The best line break is the one the sentence already wanted.

- Short sentences break themselves. `History in its sharpest form.` needs no help.
- A two-clause sentence in a *lead* wants the break at the comma. In a paragraph it wants no break
  at all — let the column decide.
- If a line can only be saved by a break in a strange place, the sentence is the problem. Rewrite it.
- Read it aloud. Where you breathe is where the line ends. This is the same test as
  [COPY-GUIDE.md](COPY-GUIDE.md) rule 6, and it gives the same answer.

---

## Related

- [COPY-GUIDE.md](COPY-GUIDE.md) — how the words are chosen.
- [SPACING.md](SPACING.md) — the space between blocks; this file is the space inside them.
- [../WALTERIN-GROUND-TRUTH.md](../WALTERIN-GROUND-TRUTH.md) — facts that never change.
