# Adding a product

> The whole list. Follow it in order and the page comes out right. Last changed 24 Sep 2026.
> What each field is: `docs/CONTENT-MODEL.md`. When a product needs its own template:
> `docs/WHEN-A-NEW-TEMPLATE.md`.

## 1 · Create the product

**Products → Add product.** Fill in the title, the price, and the images.

The **Description** box is the "About" accordion on the page — the first thing a visitor opens. Write
it the way you would say it, two short paragraphs. It is also what Google shows, so it earns its
keep twice.

## 2 · Set the variants and their SKUs

If there is a choice to make, add the option (`Language`, `Format`) and its values.

**Give every variant a SKU** — `TAROT-EN`, `PRAGUE-CZ-PRINT`. This is not optional bookkeeping: the
notify-me signups are tagged with the SKU, and it is the only identifier that does not change when
the page is in Slovak. Without one the tag falls back to `-v1`, `-v2`, and the theme editor will say
so on the page.

## 3 · Fill the `walterin` metafields

On the product page in admin, scroll to **Metafields**. Every field is optional; leave one empty and
the thing it feeds simply does not appear.

| Field | Fill it with |
| --- | --- |
| Line under the price | One sentence. *"30 stickers on two sheets."* |
| Line under the choices | What the options mean. Skip it if there is nothing to choose. |
| About heading | *About the deck*, *About the book*. Empty gives "About this". |
| What you get | A summary line, then a bullet per item. |
| Specs | One per line, `Label: value`. `Pages: 140` |
| Extra accordions | Each **Heading 3** starts a new accordion; the text under it is the body. |
| Accordion before launch only | Same format. It disappears by itself on launch day. |
| Short name | Only if the full title is too long for the bar on phones. |
| Safety information | **Required for physical goods sold in the EU.** |

## 4 · The template

**Do nothing.** A new product uses `product.json`, which gives it the buy column, the Questions and
"You may also like". That is the right answer for almost everything.

Only pick a different template if the page needs a *section* the default does not have — and read
`docs/WHEN-A-NEW-TEMPLATE.md` first, because the answer is usually no.

## 5 · Slovak

**Translate & Adapt → Products →** your product. Translate the title, the description and the
metafields. Then **Products → (the option) →** translate the option name and its values, or the
Slovak page will show English words in the buttons.

## 6 · Check the page

Open it and confirm:

1. The **price line and the option line** read like something a person would say.
2. **Every accordion has content** — no empty ones, no headings with nothing under them.
3. The **specs table** is there if you filled specs in.
4. On `/sk/`, **nothing is in English.**
5. On a phone, the **bar at the bottom** shows a name that fits.

---

## What happens if you skip a step

| Skipped | What happens |
| --- | --- |
| The description | No About accordion at all. The page opens on "What you get". |
| A metafield | That piece is missing. Nothing breaks, nothing looks half-built. |
| **The SKU** | Waitlist signups are tagged `-v1` / `-v2` instead of by edition, so you cannot tell who wanted which. |
| **Safety information** on a physical product | The EU safety line is missing. This is a legal requirement, not a nicety. |
| The Slovak | The Slovak page shows English for whatever you skipped. |
| The template | You get the default — which is the right answer. This is the one step it is safe to forget. |

## The two mistakes worth naming

**Do not put a product's words in a template.** That is how Walterin Paris ended up pointed at
Walterin Prague's page, ready to show Prague's About text and Prague's specs under the Paris title.
Words belong to the product.

**Do not copy another product's metafields and edit half of them.** That is how the sticker set ended
up describing a t-shirt. Start empty.
