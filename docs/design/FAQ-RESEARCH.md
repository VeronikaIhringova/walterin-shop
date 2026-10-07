# FAQ pages: how well-made shops build them

Research, 7 Oct 2026. Reference document only — **no wording here is ours to reuse.** Quotes are
short, attributed, and present as evidence of register, not as copy to lift.

Method: each page was fetched and its raw HTML read, so the structural and accessibility notes are
observed in the markup, not inferred from screenshots. EU shops were prioritised, because they have
to carry withdrawal, legal guarantee and pre-contractual information and cannot hide it.

**Reached and read:** rhode, Thames & Hudson, Phaidon, gestalten, Printworks, Flying Tiger
Copenhagen, Moleskine, HAY, plus Finisterre, Nicolas Vahé and Earl of East for markup only.

**Blocked (403 / bot protection), noted and dropped:** Lush UK, Bookshop.org UK, Blackwell's,
Zalando, Fjällräven, COS, ARKET, Normann Copenhagen, Papier (no FAQ path resolves), Taschen's help
centre (`faq.taschen.com`, Zendesk), Rapha (`support.rapha.cc`, renders empty without JS),
Martinus.sk and Alza.sk. Worth knowing: the two Slovak shops both blocked, so there is no
SK-language model in this set.

---

## 1 · The shops

| Shop | URL | Structure | Categories | Accordions | Jump list |
|---|---|---|---|---|---|
| **rhode** (primary ref.) | `rhodeskin.com/en-gb/pages/faq` | Two column, sticky left list | 5: Products · Shipping · Orders and payment · Returns and refunds · Contact us | Yes, scripted `div` | Yes, but JS only — no real anchors |
| **Thames & Hudson** (UK, publisher) | `thamesandhudson.com/pages/faqs` | One column, flat | 8: Payments · Orders · Shipping & Delivery · Products · Preorders · Gift Cards · Trade & Wholesale · Rights, Permissions & Other | Yes, `<button>` + `<h4>` | No |
| **Phaidon** (UK, publisher) | `phaidon.com/faq` | Two column — category heading left, questions right, repeated per group | Shipping & Delivery · Returns & Refunds · Promotion T&Cs (+ more) | Yes, `<button>` + `<h3>`, with FAQPage microdata | No |
| **gestalten** (DE, publisher) | `gestalten.com/pages/shipping-info` | One column prose, not a question list | 4 shipping regions, then Shipment tracking · Delivery times · Payment options · Returns | Only in nav | No |
| **Printworks** (SE, stationery/games) | `printworksmarket.com/pages/faq` | Two column, left list jumps to real anchors | 8: Orders · Shipping & delivery · Returns & claims · Products · Photo print · Personalization · Discounts & promotions · Taxes & duties | Yes, scripted, `aria-expanded` present | **Yes, real `#` anchors** |
| **Flying Tiger Copenhagen** (DK) | `flyingtiger.com/en-gb/pages/faq` | One column, grouped | ~11: Delivery · Return order · My order · Store purchases & gift cards · Products & stores · Payments and refunds · My account & technical support · Corporate · Club · Promo codes · Contact | Yes, native `<details>` | Partial (`/pages/help#shipping`) |
| **Moleskine** (IT) | `moleskine.com/en-gb/faq/` | Search-led help centre, tiles into sub-pages | 7 tiles: Products · Shipping & Delivery · Return & Refund · **Warranty** · then product families | No — links to articles | n/a |
| **HAY** (DK/NL) | `hay.nl/en/customer-service/` | Hub of tiles into separate pages | 8: Track your order · Return policy · Order process and payment · Delivery and delivery times · **Warranty and repair** · Our stores · **Belgian customers** · Giftcard | No | n/a |

Also read for markup only: **Finisterre** (UK) and **Nicolas Vahé** (DK) — one column, native
`<details>`, ~13 questions each; **Earl of East** (UK) — a Shopify FAQ app whose category links are
real anchors (`#faqs-category-workshop-faqs`).

---

## 2 · Structure patterns, and what suits 15–20 questions

Four patterns recur.

1. **Two column: category list left, questions right, all on one page.** rhode, Phaidon, Printworks.
   The left column is sticky; the right column is one long page with a heading per category. On
   phone the list becomes a sticky horizontal strip above the questions.
2. **One column, flat, categories as headings.** Thames & Hudson, Flying Tiger, Finisterre. No jump
   list; the page is simply scrolled, or found with ⌘F.
3. **Search-led help centre.** Moleskine, and the two blocked ones (Taschen, Rapha). A search box,
   popular topics, then tiles into article pages.
4. **Hub of tiles into separate pages.** HAY. Each topic is its own URL; nothing is answered in place.

**For 15–20 questions, pattern 1.** It is the only one that shows the whole shape of the help on one
screen while keeping each answer collapsed, and it is what rhode, Phaidon and Printworks all converge
on at roughly our size. Pattern 2 is also fine and simpler, but with six categories a reader has no
way to see that "eBooks" exists without scrolling past Products.

Patterns 3 and 4 are wrong at our size, and the reason is observable: Moleskine's search box and
HAY's tiles both exist to hide a help desk of hundreds of articles. With eighteen answers, a search
box mostly returns nothing, and tiles add a click to every question. Flying Tiger shows the other
failure — about eleven categories and a page you cannot see the end of.

One sizing rule the good pages follow and rhode breaks: **keep categories roughly even.** rhode's
Shipping holds 13 of its 32 questions, including a full country rate table, while Contact us holds
one. The left list stops being a map of the page.

---

## 3 · Category naming

What the eight shops actually write:

| Job | Words used | Count |
|---|---|---|
| The things you sell | **Products** (rhode, T&H, Printworks, Moleskine), "Products & stores" | 5 |
| Getting it to you | **Shipping & Delivery** (T&H, Phaidon, Moleskine), "Shipping & delivery" (Printworks), **Shipping** (rhode), "Delivery and delivery times" (HAY), "Delivery" (Flying Tiger) | 7 |
| Buying | **Orders and payment** (rhode), "Order process and payment" (HAY), **Orders** + **Payments** split (T&H), "Payments and refunds" (Flying Tiger) | 5 |
| Sending it back | **Returns and refunds** (rhode), "Returns & Refunds" (Phaidon), "Return & Refund" (Moleskine), "Returns & claims" (Printworks), "Return policy" / "Return order" | 7 |
| Faulty goods | **Warranty** (Moleskine), "Warranty and repair" (HAY), folded into "claims" (Printworks) | 3 |
| Reaching a person | **Contact us** (rhode), "Contact Customer Care" (Flying Tiger) | 2 |

Clearest, on the evidence: **Products · Shipping · Orders and payment · Returns and refunds ·
Contact us** — which is exactly rhode's five, and is the set with most agreement across the others.

Two naming lessons:

- **Plain nouns beat clever ones.** Every shop here uses the obvious word. Nobody writes "Good to
  know" or "Help & happiness".
- **"Claims" is the weakest word in the set.** Printworks' "Returns & claims" reads as insurance.
  Moleskine's and HAY's **Warranty** is instantly understood, and separating it from returns is the
  better structural choice (see §5).

Everything beyond those five is shop-specific and earns its place only if it holds real questions:
T&H's **Preorders**, **Gift Cards**, **Trade & Wholesale**, **Rights & Permissions**; Printworks'
**Taxes & duties**, **Personalization**; HAY's **Belgian customers**.

---

## 4 · Tone

What the answers that read well have in common:

- **The number, early.** Not "within the statutory period" but "14 days", "30 days", "1–3 business
  days". Every good answer in this set leads with a figure or a next action.
- **One job per answer.** Three to five sentences. Where more is needed, the answer links out
  rather than growing.
- **The next step is an imperative with an address attached** — "email us at …", "complete the
  withdrawal form", "contact Customer Care".
- **Admitting limits, in the shop's own voice.** The most trustworthy lines are the ones that say
  what the shop cannot promise.
- **Register matched to the brand, not to the FAQ genre.** rhode is chatty to the point of emoji;
  Thames & Hudson is dry and institutional. Both work, because each sounds like the rest of its site.

Short quotes as evidence:

- "No sweat, just select the prompt to reset it" — **rhode**
- "You can change your mind within 14 days" — **Flying Tiger Copenhagen**
- "and we'll see what we can do" — **Printworks**
- "Almost, but not always perfectly identical." — **Printworks**, on whether a personalised print
  matches its on-screen preview
- "we can refund or replace them" — **Thames & Hudson**

The last two are the useful ones. Printworks answers "Will it look exactly like the preview?"
honestly instead of reassuringly, and it is the single most convincing sentence in the whole set.

What the weak answers do: open with a paragraph of conditions before the answer (Flying Tiger on
changing an address — four paragraphs before the point), or answer a different question than the one
asked (Moleskine's tiles, where the "answer" is a link labelled "View return & refund policy").

---

## 5 · The legally required material

**No shop in this set puts statutory text in the FAQ.** The division is consistent: the FAQ gives
the practical version in one or two sentences and a link; the policy page carries the contract.

How each handles it:

- **Flying Tiger Copenhagen (DK)** is the model. Withdrawal gets its own question — "Withdraw right
  from my online purchase?" — answered in two sentences: 14 days, and complete the withdrawal form.
  Faulty goods get a *separate* question, "How can I report an issue with a product purchased
  online?", broken into damaged / defective / missing / wrong item, each saying which photo or number
  to send. **Withdrawal and guarantee are never the same answer.**
- **rhode** names the EU case inside its general return answer — "For EU returns, submit your
  withdrawal request within 30 days of receiving your order" — and links to a dedicated
  `eu-withdrawal-request` form. (Their stylesheet carries a rule specifically for
  `a[href*=eu-withdrawal-request]` inside FAQ answers, which is how visible that link is meant to
  be.) They also state the EU exception to a general rule: "original shipping charges are
  non-refundable with the exception of EU returns".
- **gestalten (DE)** puts the revocation right in prose on the shipping page — "You have a 14-day
  window to revoke your contract without specifying any reasons" — then names who bears the cost, and
  separately renders a **Legal Guarantee** control that opens a dialog containing the official EU
  notice as an image. The statutory notice is a modal, not body copy. (This is the same Shopify
  EU-warranty pattern as our own `snippets/wui-legal-guarantee-dialog.liquid`.)
- **Printworks (SE)** keeps the FAQ practical — Return conditions, How to return, Return cost,
  Refund, Claims, Unclaimed package — with "register your return or cancel your purchase within 30
  days" and a separate EU return portal. The statutory pages sit in the footer as two links:
  **"Returns & Right of Withdrawal"** and **"Guarantee"**.
- **Thames & Hudson (UK)** answers non-conformity under the plain heading "My item is damaged / not
  what I ordered", and gives both clocks as numbers: report within 14 calendar days, refund within 14
  calendar days.
- **Moleskine (IT)** and **HAY (DK/NL)** make **Warranty** a top-level category, separate from
  returns. HAY additionally gives "Belgian customers" its own entry — country-specific differences
  get their own door rather than a parenthesis.

Five things worth carrying over:

1. **Withdrawal and guarantee are two different answers.** Change of mind is not a fault. Every shop
   that handles this well splits them; the ones that bundle them into "claims" read worst.
2. **More than the minimum is stated plainly as a number.** rhode and Printworks both give 30 days
   where 14 is required, and simply say 30. Nobody quotes a directive or an article number.
3. **The exceptions are given in product terms, not legal terms.** gestalten: "gift cards and
   downloadable software products are non-returnable". Printworks: "Due to the personalized nature of
   these items, returns are not accepted unless the product is damaged or defective upon arrival."
   This is exactly the shape a digital-download exception needs.
4. **"How do I exercise it" is a link, not a paragraph** — a withdrawal form, a return portal, or an
   email address with the exact fields to include.
5. **Say who pays return shipping, in the answer.** Four of the shops do; it is the most common real
   dispute and the cheapest thing to pre-empt.

---

## 6 · Accessibility and technical notes, as observed in the markup

| | Accordion mechanism | Question is a heading? | Category heading | Per-question anchor | FAQPage schema |
|---|---|---|---|---|---|
| rhode | `div` + `tabindex="0"` + JS, `max-height` inline style. **No `role`, no `aria-expanded`** | No — `<p>` | `<p>`, on a `div` that has an `id` | No | No |
| Thames & Hudson | `<button>` + JS, `aria-label` duplicating the question. **No `aria-expanded`** | Yes, `<h4>` inside the button | `<h3>` | No | No |
| Phaidon | `<button class="accordion">` with `aria-expanded` | Yes, `<h3>` inside the button | `<h2>` | No | **Yes, microdata** — but one `FAQPage` scope *per category group*, which is invalid; it should be one per page |
| Printworks | JS, `aria-expanded` present | No | `<h3>` | No (category anchors only) | No |
| Flying Tiger | Native `<details>`/`<summary>` | No | — | No | A `WebPage` schema with the entire FAQ dumped into a `text` property |
| gestalten | Native `<details>` (nav only) | — | `<h2>` | No | No |
| Finisterre, Nicolas Vahé | Native `<details>` | No | — | No | No |
| Earl of East | FAQ app | No | `<h4>` | No (category anchors only) | No |

Four conclusions:

- **Native `<details>`/`<summary>` is the majority choice and the right one.** Flying Tiger,
  Finisterre, Nicolas Vahé and gestalten all use it. Open/close, keyboard, the accessible name and
  find-on-page all come from the browser, and the answer is in the DOM whether or not it is open.
  rhode's `div` + `tabindex="0"` is the worst mechanism in the set: focusable, but with no announced
  state and no role.
- **Put the question in a real heading inside the toggle.** Only Phaidon (`<h3>`) and Thames & Hudson
  (`<h4>`) do it. It is what makes the page navigable by heading for a screen-reader user, and it
  costs nothing.
- **The category list should be real links to real ids.** Printworks and Earl of East do
  (`href="#p-orders-p_0"`, `#faqs-category-…`). rhode's list is `<a>` elements **with no `href`** and
  `data-tab-id`, driven entirely by JS — it cannot be copied, sent, or opened in a new tab, and its
  categories are `<p>` rather than headings.
- **Not one of the nine shops can deep-link to a single question.** No FAQ `<details>` or accordion
  in this set carries an `id`. "Here is the answer about faulty cards" is therefore a link to a
  category at best, and usually to the top of the page.

On structured data: only Phaidon has `FAQPage`, and it is malformed. Note also that Google restricted
FAQ rich results to authoritative government and health sites in 2023, so the schema buys a shop
little in search today. It is still worth emitting — correctly, one `FAQPage` per page, built from the
same strings as the visible page so the two cannot drift — but not as an SEO argument.

Phone handling, from the CSS:

- **rhode**: desktop is `display:grid; grid-template-columns:22.5rem 1fr` (30rem above 1240px), left
  column `position:sticky; top:2rem`. Under 760px the grid collapses to one column and the category
  list becomes a **sticky, horizontally scrolling, full-bleed strip** at the top of the panel
  (`overflow-x:auto`, `flex-wrap:nowrap`, negative side margins to break the gutter, `z-index:3`).
  This is the pattern to copy.
- **Printworks** does the same thing with a swipe carousel (`swiper-slide`) on its category buttons.
- **Wide content inside an answer gets its own scroller.** rhode wraps its country rate table in
  `overflow-x:auto` with `table{min-width:500px}`, plus arrow buttons and a progress bar, so the page
  body never scrolls sideways.

---

## 7 · Recommendations for Walterin

Three products (78-card tarot deck; 180-page comic as eBook and print; sticker set), SK + EU,
English and Slovak, six decided categories, roughly 15–20 questions.

### Where we already stand

`sections/walterin-faq.liquid` and `templates/page.faq.json` already exist and already implement most
of what this research recommends, including things **no shop in the set does**:

- two-column grid with a sticky left `<nav>` of **real** `href="#faq-…"` links, collapsing to a
  sticky full-bleed strip on phone — rhode's layout without rhode's JS-only list;
- native `<details>` per question;
- category headings as real `<h2>` with `aria-labelledby` on the group;
- an `id` on each `<details>`, so `/pages/faq#q-returns-faulty` links to **one question**, with
  `assets/walterin-faq.js` opening it on arrival;
- one correct `FAQPage` JSON-LD per page, built from the same locale strings as the visible page.

So the build is not the open question. The open questions are the text, and two small fixes.

### Two fixes to make

1. **Make the question a heading.** In `walterin-faq.liquid` the question inside `<summary>` is a
   `<span class="wui-faq__q">`. Wrap it in `<h3>` (valid inside `<summary>`, and it keeps the
   summary's accessible name). This is the one thing Phaidon and Thames & Hudson do that we do not,
   and it gives the page a real heading outline: h1 page → h2 category → h3 question.
2. **Keep the categories even.** Six categories and ~18 questions means **2–4 questions each**. The
   draft in `docs/legal/faq-proposal-2026-10-07.md` is already close. Resist letting Shipping grow a
   country rate table the way rhode's did — if a table is unavoidable, it goes in its own
   `overflow-x:auto` container, which is the house rule anyway.

### What to copy

- **Flying Tiger's split:** withdrawal is one question, faulty goods is another. Our sixth category
  is "Returns, refunds and guarantee" — three jobs in one name. Keep the name, but make sure it holds
  **three distinct answers**: *I changed my mind* (14 days, how to tell us), *it arrived damaged or
  faulty* (what to send us, and the two-year legal guarantee), *when do I get my money back*. Do not
  let one answer carry all three.
- **The practical-here, statutory-there division.** The FAQ answers in sentences; the Terms and the
  policy pages carry the contract. We already have the footer legal row and
  `snippets/wui-legal-guarantee-dialog.liquid` with the official EU notice — same pattern as
  gestalten. The FAQ should link to them, not restate them.
- **Printworks' and gestalten's phrasing of the digital exception, in product terms.** The eBook's
  loss of the withdrawal right is the single most important legal sentence on the page, and the model
  for it is "downloadable software products are non-returnable" — a plain fact about the product, not
  a clause. We already gate this with `snippets/cart-ebook-consent.liquid`; the FAQ answer should say
  the same thing in the same words.
- **Lead with the number.** 14 days. Two years. Six downloads. 78 cards. 180 pages. 100 copies.
- **Printworks' honesty about a preview** — the model for any answer where the real thing differs
  from the screen: paper stock, card finish, colour, how a comic page reads on a phone.
- **Say who pays return postage**, in the answer, in both languages.

### What to avoid

- **rhode's accordion and category list.** Despite being the primary visual reference, its mechanics
  are the weakest here: `div` + `tabindex` with no state announced, `<a>` with no `href`, categories
  as `<p>`. Copy the layout, not the markup — which the existing section already does.
- **A search box.** At eighteen questions it will mostly return nothing, and an empty result is worse
  than a visible list. Moleskine's search exists because Moleskine has hundreds of articles.
- **A separate help centre.** Taschen's and Rapha's live on Zendesk, outside the theme, in English
  only. For a three-product brand that would mean abandoning the design system and the Slovak locale
  at the exact moment a customer is worried.
- **Printworks' shouted noun labels** (ORDER CONFIRMATION, WRONG INFORMATION). They scan fast but
  they are not questions, and they break our rule that copy should sound like someone speaking.
- **Translating the Slovak.** None of these shops is a model for this — Flying Tiger and Printworks
  both run English as the hub language and localise mechanically. Keeping each question and answer in
  `locales/sk.json` as its own string, written natively, is the point.
- **Treating the schema as an SEO win.** Emit it because it keeps a machine-readable copy honest, not
  because it will produce rich results.

### What the six categories are missing

1. **Pre-orders — the real gap.** The deck goes to print in about three weeks and launch is about a
   month out, so the deck will almost certainly be sellable before it is printed. Thames & Hudson
   gives Preorders a whole category; two questions under *Orders and payment* would do: **when is my
   card charged** and **when will it ship**. Without these, the first wave of buyers has no answer at
   the moment they are most nervous. Note that pre-orders also change the withdrawal clock, so this
   is a legal question as much as a service one — and it needs Veronka's decision before anything is
   written.
2. **Taxes, duties, VAT.** Printworks gives this a whole category; rhode answers it; T&H has a
   question about EU orders over the £130 limit. We only need one short question under *Shipping*,
   and only for buyers outside the EU. **Do not draft the actual claim** — per the standing rule on
   VAT status and unconfirmed legal claims, this needs confirming facts first.
3. **Stockists / wholesale.** Both publishers in this set carry it (T&H "Trade & Wholesale", Phaidon's
   trade pages), and Walter has an existing bookshop readership from the Bratislava and Prague books.
   One question under *Contact us*: can a shop stock the deck, and who do they write to.
4. **The sticker set has no content at all**, as the proposal already flags. That is a content gap,
   not a category gap — *Products* is the right home for it.
5. **Signed or dedicated copies.** Phaidon sells signed editions; our first edition is 100 copies per
   language. If the answer is no, one line under *Products* saying so prevents the email.

Nothing suggests a seventh category. Six is right, and matches the strongest convergence in the set
(rhode's five) plus **eBooks**, which no shop here has because no shop here sells a download
alongside a printed book — which is also why the eBook answers are the ones with no model to copy and
the most care needed.
