# When a product needs its own template

> Short answer: almost never. Last changed 24 Sep 2026.

## The test

> **Does this page need a *section* the others do not have?**

A section is a whole band across the page — the buy column, Look inside, Questions, "You may also
like", Meet the cards. If the answer is no, the product uses `product.json` and you are done.

## These are **not** reasons for a new template

| | Why not |
| --- | --- |
| Different words | Words live on the product, in its metafields. |
| A different number of options | The buy column builds itself from whatever options the product has. One variant, four variants — same template. |
| A different price, or a different currency | Nothing in the template knows the price. |
| No specs, or no "What you get" | Leave the metafield empty and that accordion does not appear. |
| Digital instead of physical | The page already reacts: the safety block and the express button appear only for things that ship. |
| It is "a book, not a deck" | That is a category, not a structure. |

## These **are** reasons

| | Example |
| --- | --- |
| The page needs a section no other product has | The tarot has *Meet the cards* and *How a card is read*. Nothing else does. |
| The page needs images in a section's own blocks | *Look inside* keeps its spreads in the section, so a product with spreads needs its own template. Walterin Prague is the only one today. |

That second one is a known wart, not a principle. When Look inside is redesigned to read the
product's images like everything else, Prague folds back into the default and there are two templates
again.

## What exists today

| Template | Sections | Used by |
| --- | --- | --- |
| `product.json` | buy → Questions → You may also like | the sticker set, Walterin Paris, **and every new product** |
| `product.walterin-prague-book.json` | the above **+ Look inside** | Walterin Prague |
| `product.tarot.json` | the above **+ Meet the cards, How a card is read, Meet Walter** | the tarot deck |

## The cost of one more

A template is not free. Every one you add is:

- another copy of the Questions to translate into Slovak — twelve strings each time;
- another copy of the buy column's labels to translate;
- another place to forget when something changes everywhere else.

That is why the count went from five to three. Three of the five were templates no product even
pointed at, and one of them was quietly serving two different products the same words.

## If you really do need one

1. Duplicate `templates/product.json`, name it `product.<something>.json`.
2. Add **only the section that is different**. Do not change anything else.
3. Set **Theme template** on the product in admin.
4. Register the Slovak for the new template's strings — including the Questions and the buy column
   labels, which do not carry over.
5. Add a row to the table above, so the next person knows why it exists.
