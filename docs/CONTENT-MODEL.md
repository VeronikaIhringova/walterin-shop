# The content model — what lives where, and why

> Written for whoever runs this shop, not for a developer. Last changed 24 Sep 2026.

The short version: **a template decides what a page is made of. The product decides what it says.**

That split is the whole point. Before it, the words for the Prague book lived inside a template file,
and Walterin Paris was pointed at the same file — so Paris would have displayed Prague's About text,
Prague's specs and Prague's accordions, with nobody having done anything wrong. Now a second product
pointed at the same template shows its own words, because the words belong to the product.

---

## Where each kind of thing lives

| Kind of thing | Where it lives | Who edits it |
| --- | --- | --- |
| Which sections a page has, in what order | the template JSON | the theme editor |
| Words about one specific product | a **product metafield** (`walterin.*`) | the product page in admin |
| Words identical on every product (button labels, screen-reader text) | the section's own settings | the theme editor |
| The "Look inside" spreads | the section's blocks, in the template | the theme editor — see the note at the end |

**Metafields survive a theme change. Section settings do not.** That is the real reason the product's
words are in metafields: if the theme is ever replaced, the words stay in the shop.

---

## The nine fields

All of them live under **Products → (a product) → Metafields**, in the `walterin` namespace. Every
one is optional. Leave a field empty and the thing it feeds simply does not appear — no gap, no
empty accordion, no stray heading.

| Field | Type | What it is | Example (Walterin Prague) |
| --- | --- | --- | --- |
| **Line under the price** `price_note` | one line, max 90 | The one sentence under the price. | *180 pages of Prague, in English or Czech.* |
| **Line under the choices** `choice_note` | one line, max 140 | Explains the options. Leave empty when there is nothing to choose. | *The eBook arrives the moment you pay. The printed book is a softcover, 129 × 207 mm.* |
| **About heading** `about_heading` | one line, max 40 | The first accordion's title. Empty means "About this". | *About the book* |
| **What you get** `included` | rich text | First line is the summary, then a bullet per item. | *Two editions of the same book.* + 4 bullets |
| **Specs** `specs` | multi-line text | One per line, written `Label: value`. The order here is the order on the page. | `Pages: 180`<br>`Size: 129 × 207 mm` |
| **Extra accordions** `notes` | rich text | Every **Heading 3** starts a new accordion; the text under it is that accordion's body. | *Reading it on a screen* · *As a gift* · *About Walter* |
| **Accordion before launch only** `preorder_note` | rich text | Same format. Shown only while the product cannot be bought. | *When can I have it?* |
| **Short name** `short_title` | one line, max 40 | For the bar that follows you down the page on phones. Empty uses the product title. | *Walterin Prague* |
| **Safety information** `safety` | multi-line text | Required by EU law for physical goods. Shown with the manufacturer details. | — |

### Three things that deliberately have no metafield

- **The About text is the product description.** Shopify already has a field for "what is this
  thing", it is translatable, and it feeds search results and the collection pages. A second field
  would mean writing the same paragraph twice and keeping the two in step forever. **So write the
  About copy in the product's Description box.**
- **The sticky bar title is the product title** (or `short_title` when the full one is too long).
- **The waitlist tag is worked out, not typed.** It is the product handle plus `-waitlist`
  (`tarot-waitlist`), and the edition comes from the **variant's SKU**. It has to be the SKU:
  an option value is translated, so on the Slovak site "English" becomes "Angličtina" and one
  campaign would quietly split into two tags. **Give every variant a SKU.** Without one the tag
  falls back to `-v1`, `-v2`, and the theme editor says so on the page.

---

## The accordions, in the order they appear

1. **About** — the product description. ★
2. **What you get** — `included`, then the `specs` table, then the EU safety lines for physical goods. ★
3. **Delivery** — a section setting, because it is the same promise on every product. ★
4. **Everything in `notes`** — dashed rule, no star.
5. **`preorder_note`** — last, and only while the product cannot be bought.

The star marks the three that answer "what is this thing". The rest are extra reading.

---

## Adding copy: two rules that keep this clean

1. **If it is about one product, it goes on the product.** Never in the template.
2. **If it is the same sentence on every product, it goes in the section's settings** — and then it
   is written once and translated once.

---

## The one exception: "Look inside"

The spreads and their line live in the **section's blocks**, in the template, not in metafields.
That is deliberate for now: the section supports a separate, taller image for phones, and a flat list
of images in a metafield cannot pair a wide spread with its phone crop.

**The cost:** a product with spreads needs its own template, because a shared template would show one
product's spreads on all of them. Today that is only Walterin Prague
(`templates/product.walterin-prague-book.json`).

When the section is redesigned, this moves to the product like everything else.

---

## Slovak

Metafields are translated in **Translate & Adapt → Products**, next to the product's title and
description. They are registered against the English value, so **changing the English marks the
Slovak out of date** — expected, and the app shows you which ones.

Do **not** translate anything that is not a sentence. There is nothing like that left in the nine
fields, which is on purpose.
