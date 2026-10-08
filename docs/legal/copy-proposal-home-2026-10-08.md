# Site copy, step 5 — the plan, and page 1: the home page

Proposal only. **Nothing is changed and nothing is live.** Approve or correct the text and I will
build it; nothing moves before that.

---

## First, a finding that changes the shape of this job

**The Slovak home page is in English. All of it.** Checked string by string against `/sk/`:

| String on the home page | On `/sk/` |
|---|---|
| Welcome, curious traveller! | same English |
| Walterin: Cities Told in Comics | same English |
| Short Stories · History, in its sharpest form… | same English |
| Witty history · Sharp insights. Clean lines… | same English |
| A UNIVERSAL LANGUAGE · Comics move where language hesitates… | same English |
| Read more → / Read less ← | same English |
| walterin shopping | same English |

Nine for nine. Only the navigation, cart and account are Slovak, because those come from the
theme's own language files.

**Why:** this content lives in section and block settings, whose Slovak lives in Translate & Adapt
— store data, outside the repo — and was never written. Exactly the fault the FAQ had before it
moved into the locale files.

So "the rest of the site copy" is really two jobs at once: **write it better, and write it in
Slovak at all.** I would do both in one pass per page rather than touch each page twice.

**My recommendation on the mechanism:** put this copy in the theme's locale files, as the FAQ now
is. The two languages then live side by side in one file, are reviewed in a diff, publish with the
theme, and cannot be half-translated. The cost is the same as the FAQ's: you would no longer edit
these lines in the theme editor. Your call — say the word and I will use Translate & Adapt instead,
which keeps the editor but puts the Slovak back outside the repo.

---

## The order I suggest

Smallest and most-seen first, so each approval is quick and the pages people actually land on are
fixed earliest.

1. **Home** — below. Four strings; most of it is already approved copy.
2. **Shop / collection** — the page title and any empty-state text.
3. **About** — the longest piece, and the one most likely to need Walter's own voice.
4. **Contact · Where to Find Us · Track order** — short, practical pages.
5. **Cart and checkout-adjacent strings** — "Your cart is empty", the consent sentence, buttons.
6. **404 and search** — two lines each, easy to forget.

Product-page copy, the FAQ and the policies are already done and are not reopened here.

---

## Page 1 · The home page

Only four strings are editable here. The rest of what a visitor reads is the product cards (done)
and the slideshow — whose words are **baked into the images**, so changing them means new artwork
from Walter, not a text edit. Flagged, not proposed.

### 1 · The announcement bar

| | |
|---|---|
| Now | `Welcome, curious traveller!` |
| EN | **`Welcome, curious traveller`** |
| SK | **`Vitajte, zvedavý cestovateľ`** |

Only the exclamation mark goes. The line is good — it is the one piece of chattiness that earns its
place, because "curious traveller" is literally who the books are for. An exclamation mark is the
site raising its voice at someone who has just arrived.

### 2 · The page title

| | |
|---|---|
| Now | `Walterin: Cities Told in Comics` |
| EN | **`Walterin: cities told in comics`** |
| SK | **`Walterin: mestá v komikse`** |

Sentence case, because Title Case On Everything is a habit from elsewhere and the rest of the site
does not do it. The words are right and stay.

**The Slovak is not a translation.** *"Mestá rozprávané v komiksoch"* is what the English says and
nobody would say it. *"Mestá v komikse"* is what a Slovak person would call this — cities, in
comics — and it is shorter than the English, which is rare and worth keeping.

### 3 · The three expandable texts — **no change proposed**

*Short Stories · Witty history · A UNIVERSAL LANGUAGE*, with their previews and full texts.

**You wrote these and approved them on 30 September**, after telling me I had turned them into
poems. They are the best copy on the site and I am not reopening them. Two notes only:

- **`A UNIVERSAL LANGUAGE` is the only all-caps heading of the three.** Sentence case —
  *A universal language* — would match its neighbours. One character of change; your call.
- **They need Slovak**, like everything else here. I have not drafted it, because translating your
  approved English into Slovak is exactly the move the copy rule forbids — Slovak is written
  natively. These three want writing from scratch in Slovak, and they are the one place on the site
  where I would want your eye on every sentence before it goes near the page. I will draft them as
  their own step once you have seen the rest.

### 4 · The shop section title

| | |
|---|---|
| Now | `walterin shopping` |
| EN | **`The shop`** |
| SK | **`Obchod`** |

Three faults in two words: it is the only lowercase heading on the page, "shopping" is a thing you
do rather than a thing you look at, and the brand name is already at the top of the page and in the
menu — repeating it here tells a reader nothing they did not know a second ago.

"The shop" matches the word already in the menu (`SHOP` / `OBCHOD`), so the page and the navigation
stop disagreeing.

---

## Two things I noticed while reading the page

**A whole section is in the template and does not render.** `templates/index.json` carries a
three-icon row — *"Page by page short stories / Discover cities with quick, engaging stories,
perfect for brief reads!"*, *"Snappy historical insights, enriched with lively banter!"*,
*"Explore clever, colourful illustrations, witty and lovable for all!"* — which appears nowhere on
the live page. Good, because it is the worst copy in the repo and it duplicates the three
expandable texts. **Proposal: delete it** rather than leave three exclamation marks waiting for
someone to switch the block back on.

**The old "Coming Soon" badge is still in the page text.** It is hidden with CSS, so nobody sees
it, but it is still read aloud by a screen reader next to our own "Coming soon" bar — the same
words twice. Small, and worth removing properly when something else takes me into that file.
