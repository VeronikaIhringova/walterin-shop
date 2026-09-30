# Line breaks — break by meaning

**Mandatory, from 30 September 2026. Applies to every text on the site, in every language, at
every width: home, product pages, cards, about, FAQ, footer, cart, emails.**

A line break is punctuation. It tells the reader where to pause. Put one in the wrong place and
the sentence stumbles, even when every word is right.

---

## The rule

1. **Break at phrase boundaries.** After a full stop, after a comma, or at the end of a complete
   thought. Never inside a phrase.
2. **Never leave a single word alone on a line.** (One exception, below.)
3. **Keep pairs together.** Numbers and their units, first and last names, dates, times, prices:
   `9:00–17:00`, `From €18,99`, `129 × 207 mm`, `10 November`, `Walter Ihring`.
4. **Balance the lines.** Roughly even. Not one long line and one stub.
5. **Check every width.** A break that is right at 1440 is often wrong at 390. Desktop and phone,
   both languages, every time.

### The one exception

A **single long word alone on a line is acceptable on a narrow phone card** when it cannot fit
otherwise. `TAROT OF / CONSCIOUSNESS` at a 170px card width is fine — the word is 13 characters and
the card is 170px; there is nowhere else for it to go. The exception is narrow cards only. It is not
a licence to leave orphans in body copy, headings or the footer, where there is room to do better.

---

## How to do it — what actually works

Measured in WebKit and Chromium on 30 Sep 2026 (`scratchpad/wrap_test.py`), not taken from
documentation. Safari is the one that matters here: it is where the brand's readers are, and it is
where two bugs already bit us today.

### Use these

**1 · Phrase spans — for a break that carries meaning.** The only technique that puts the break
exactly where you want it.

```html
<p><span class="wui-line">Comics move</span> <span class="wui-line">where language hesitates.</span></p>
```

```css
.wui-line { display: block; text-wrap: balance; }
```

Each phrase is its own block, so the break never depends on how wide the container happens to be.
If a phrase is still too long for a phone it wraps *inside itself*, which is the acceptable kind of
wrap — and `balance` keeps that wrap even.

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
it on headings and on phrase spans, on top of a break you have already placed. Never instead of one.

### Do not use these

**`text-wrap: pretty` — the engines disagree.** Both report `CSS.supports(...) === true`, but in the
same test WebKit re-balanced the text and Chromium left it exactly as `wrap`. A property that claims
support and then does nothing in Chrome is worse than no property: it looks right to whoever tested
in Safari and is wrong for everyone else.

**A bare `<br>` for anything that must reflow.** It is frozen at every width. A `<br>` that reads
well at 1440 can leave one word on a line at 390, and rule 5 then fails. `<br>` is acceptable only
where the break is correct at *all* widths — a short two-line label, an address, a poem.

**Breaking with `&nbsp;` padding or spaces.** It moves with the font and falls apart on the first
text change.

---

## Checking it

The Playwright run checks this automatically — `tools/check-line-breaks.py`. It reads the real line
boxes out of the rendered page (not the HTML) and flags:

- a **last line holding one word** — rule 2, with the narrow-card exception applied automatically;
- a **line ending on a word that cannot end a phrase** — `the`, `a`, `of`, `and`, `where`, `in`,
  `to`, `for`, `with`, and the Slovak equivalents `a`, `do`, `na`, `so`, `pre`, `ako`, `kde`;
- a **badly unbalanced pair of lines**, where one is under 40% of the other.

Run it at 1440 and 390, in both languages, before showing anything.

```
python3 tools/check-line-breaks.py --url http://127.0.0.1:9292 --widths 1440,390 --locales en,sk
```

---

## Writing to be broken well

The best line break is the one the sentence already wanted.

- Short sentences break themselves. `History in its sharpest form.` needs no help.
- A sentence with two clauses wants the break at the comma, not three words after it.
- If a line can only be saved by a break in a strange place, the sentence is the problem. Rewrite it.
- Read it aloud. Where you breathe is where the line ends. This is the same test as
  [COPY-GUIDE.md](COPY-GUIDE.md) rule 6, and it gives the same answer.

---

## Related

- [COPY-GUIDE.md](COPY-GUIDE.md) — how the words are chosen.
- [SPACING.md](SPACING.md) — the space between blocks; this file is the space inside them.
- [../WALTERIN-GROUND-TRUTH.md](../WALTERIN-GROUND-TRUTH.md) — facts that never change.
