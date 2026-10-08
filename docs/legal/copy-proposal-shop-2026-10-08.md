# Site copy, page 2 — the Shop page

Proposal only. **Nothing changed, nothing live.** Against `docs/design/COPY-GUIDE.md`, including the
three reference texts added on 8 October. Slovak written natively.

Page: `/collections/all` and `/sk/collections/all`.

---

## Before the copy: three faults the page has now

**1 · The Shop page has no heading.** No `<h1>` anywhere. A visitor lands straight on "Filter:",
a screen reader is given no page title to announce, and a search engine has nothing above the
product names. Every other page on the site has one. **This is the main thing to fix here, and it
is a copy decision because it needs words that do not exist yet.**

**2 · The filter advertises a product that does not exist.** The City filter offers **PARIS**, nine
times in the markup. `/products/walterin-paris` returns **404** — it is a draft. So the one city
filter a customer can click besides Prague leads nowhere, and it names an unreleased book. Not a
copy fix; it is the filter reading a tag on a draft product. Flagged for its own step.

**3 · The browser tab says "Products".** Shopify's default. It is what a customer sees in their
tab bar, in a bookmark and in a search result.

---

## The copy, current vs proposed

### A · The page heading — new, does not exist today

| | |
|---|---|
| Now | *(nothing)* |
| **EN** | **The shop** |
| **SK** | **Obchod** |

The same two words as the menu and the home page's shop section, so the three stop disagreeing.
Nothing cleverer: this is a label, and a label's job is to be recognised, not admired.

### B · The browser tab title

| | |
|---|---|
| Now (EN) | `Products – Walterin` |
| Now (SK) | `Products – Walterin` *(English on the Slovak page)* |
| **EN** | **`The shop – Walterin`** |
| **SK** | **`Obchod – Walterin`** |

### C · An introductory line under the heading — new, optional

Three products is a small shop, and a bare grid under a bare heading reads as unfinished. One line
gives it a reason to exist. **Two options — your pick, or neither.**

**Option 1 — what is here**

> **EN** Three things so far: a tarot deck, a comic book about Prague, and the stickers that came
> out of it.
> **SK** Zatiaľ tri veci: tarotový balíček, komiks o Prahe a nálepky, ktoré z neho vznikli.

Concrete, says what the reader gets, and "zatiaľ" quietly promises more without claiming a date.

**Option 2 — what is coming**

> **EN** Everything Walter has drawn so far. There will be more.
> **SK** Všetko, čo Walter zatiaľ nakreslil. Pribudne toho viac.

Shorter, and it names the person rather than the catalogue.

**My recommendation: Option 1.** It tells a first-time visitor what the three cards below actually
are before they scroll, which is the job the reference texts do on the home page.

### D · The empty-state text

Not visible today, but it renders whenever a filter matches nothing — which **a customer will hit
by clicking the PARIS filter**, until that is fixed.

| | |
|---|---|
| Now (EN) | `Use fewer filters or remove all` |
| Now (SK) | *(Shopify default)* |
| **EN** | **Nothing matches that. Try fewer filters, or see everything.** |
| **SK** | **Tomu nič nezodpovedá. Skúste menej filtrov alebo si pozrite všetko.** |

"See everything" / "pozrite si všetko" is the link back to the unfiltered grid, which the current
wording does not offer.

---

## What I am NOT proposing to change, and why

**The filter labels.** *Filter · Availability · In stock · Out of stock · City · Reset · Remove
all* and their Slovak. These are Shopify's own strings and a shopper recognises them from every
other store; rewriting them for personality makes a control harder to use. One exception worth
your call:

> **SK** `Počet produktov: 3` is Shopify's translation of "3 products" and it reads like a stock
> report. **`3 produkty`** is what a person says. This is a theme locale string, so it is ours to
> change — unlike the rest of the filter, which comes from Shopify.

**The product cards.** Titles, prices and the availability pills were settled on 6–7 October.

**"In stock (1)" and "Out of stock (3)".** These are counts of *products*, not of units, so they do
not break the no-quantities rule. But they do tell a visitor that three of four things are
unavailable, in the first thing they read on the page. **Not a copy change — a question of whether
the Availability filter should be shown at all while almost nothing is for sale.** Your call; I
would hide it until launch.

---

## Slovak notes

- **"Obchod", not "Predajňa".** A *predajňa* is a shop you walk into. The menu already says Obchod.
- **"Zatiaľ tri veci"** — *three things so far*. The literal *"Tri produkty"* would be a label for
  a database row, not a sentence someone says.
- **"ktoré z neho vznikli"** — *that came out of it*. Keeps the stickers connected to the book
  rather than listing them as a third unrelated item.
- **"Tomu nič nezodpovedá"** — *nothing matches that*. The literal *"Žiadne výsledky"* is a search
  engine talking; this is a person answering.

---

## What I need from you

1. The heading: **The shop / Obchod**, or something else.
2. The intro line: **Option 1**, Option 2, or none.
3. Whether to change `Počet produktov: 3` to `3 produkty`.
4. Whether the **Availability filter** should be hidden until launch.

And separately, as its own step: **the PARIS filter entry**, which is a bug rather than copy.
