# Slovak translation audit — live site, 9 October 2026

Read-only inventory. Nothing was changed. No wording is proposed here — this is a list of what is
still English on `/sk/`, and where each string lives.

## Method

Every page fetched twice from the live site, never from the dev server:

```
curl -s --compressed -H "Accept-Language: sk-SK,sk;q=0.9" "https://walterin.com/sk/<path>"
curl -s --compressed -H "Accept-Language: en-GB"           "https://walterin.com/<path>"
```

All 18 Slovak fetches were verified to have stayed on `/sk/` and to carry `<html lang="sk">`
(the EN fetches carry `lang="en"`). Visible text was extracted with `<script>`, `<style>`, `<svg>`
and comments stripped, tags turned into separators and entities unescaped, then the two languages
were diffed; strings **identical in both** are the untranslated ones. `<title>`,
`<meta name="description">`, `og:`/`twitter:` descriptions, every `<img alt>`, and the
`placeholder` / `aria-label` / `title` attributes were compared separately. Brand names, product
names, prices, numbers, URLs and email addresses are excluded.

Repo greps were run to prove where each string lives. Raw page captures and the diffs are not
committed.

---

## Worst offenders

**55 distinct untranslated strings**, living in **27 fixable places** (a single rich-text setting
can hold a dozen strings). On top of those: one filter group missing from `/sk/` entirely, and
11 content images with no alt text in either language.

| Source category | Distinct strings | Places to fix | Notes |
|---|---|---|---|
| **SECTION / BLOCK setting** (the value sits in `templates/*.json` or `sections/footer-group.json`; the Slovak belongs in Translate & Adapt) | **35** | 18 | the single biggest bucket. 8 strings sit in the footer and therefore appear on **every page**; 22 are the About page's biography, held in three rich-text settings |
| **Hardcoded English inside a `.liquid` file** | **16** | 6 | all 16 in `sections/contact-form.liquid`, on two pages. The worst kind: no amount of Translate & Adapt work can reach them |
| **Schema default in a `.liquid` file** — the template JSON never sets a value, so Translate & Adapt has no entry to translate | **2** | 2 | `"[n] of 100 left"` (`/products/walterin-prague`, `/products/stickers`) and `"Sign up"` (`/cart`, 404) |
| **Theme locale file** (`locales/sk.json`) | **1** | 1 | `walterin.product_faq.title` is still `"FAQ"` — 1 of 562 keys |
| **Store data — SEO** | **1** | 1 | the shop description `/sk/search` falls back to |
| **PRODUCT field / metafield** | 0 | — | product titles, variant options, descriptions and media alt text are all translated |
| **PAGE body** | 0 | — | the page bodies that render are translated; the About page's body is translated but **switched off** — see below |
| **POLICY** | 0 | — | all four policies are fully translated |

Separately, and not counted above: the **City** filter and its `PRAGUE` value do not render on
`/sk/` at all (store data — Search & Discovery), and 11 content images carry an empty `alt` in both
languages (store data — Content → Files).

### Five worst pages

1. **`/pages/about-us`** — 22 untranslated strings. The whole biography is English on `/sk/`. A
   Slovak page body **exists** (it renders as the Slovak `<meta name="description">`) but
   `templates/page.about.json:119` has `"main": { "type": "main-page", "disabled": true }`, so the
   page body is never shown. What is shown instead is three English rich-text blocks.
2. **`/pages/contact`** — 17 untranslated strings. The whole contact form (name label, reason
   dropdown, all 11 reasons, message label, both placeholders) is hardcoded English in
   `sections/contact-form.liquid`.
3. **`/pages/drop-us-a-note-anytime`** — 18. The same hardcoded form, plus the page's own `<h2>`
   `"drop us a note anytime."`.
4. **Footer, on all 18 pages** — 8. Four column headings (`NAVIGATE`, `SOCIAL`, `OFFICIAL`,
   `SUPPORT`) and the whole newsletter block (heading, two-sentence subtext, button).
5. **`/collections/all` and `/search`** — the **City** filter does not exist on `/sk/` at all
   (verified: `filter.p.tag` appears 9 times in the EN markup and 0 times in the SK markup on both
   pages). Slovak visitors have no way to filter by city.

### Two things worth flagging beyond translation

- **`"[n] of 100 left"` discloses a quantity**, which `docs/WALTERIN-GROUND-TRUTH.md` forbids
  anywhere a customer can see it. It is currently in a hidden `<span>` that JavaScript copies into
  the page when stock is low, on `/products/walterin-prague` and `/products/stickers`, in **both**
  languages. On the tarot it is translated (`Zostáva [n] zo 100`) and still carries the number.
- **`locales/sk.json` is missing `shopify.checkout.payment.card_security_notice`**, and the English
  value claims *"free returns and 24/7 access to our ambassadors"* — which contradicts the Refund
  policy ("You pay the return postage") and the FAQ ("We read it on weekdays, 9:00–17:00 CET"). It
  is a checkout string and outside the page set audited here, but it should not survive in either
  language.

---

## Footer and newsletter block — every page

These 8 strings render identically in both languages on all 18 pages audited, so they are listed
once here and not repeated per page.

| English string | Slovak now | Where it lives | Fix |
|---|---|---|---|
| `Subscribe to our emails` | identical | SECTION setting — `sections/footer-group.json:35` (`email_signup.settings.heading`) | Register the Slovak in Translate & Adapt → Theme → Section/block settings |
| `For curious minds who love witty history.` | identical | SECTION setting — `sections/footer-group.json:36` (`email_signup.settings.subtext`, first sentence) | same setting as the line below; one Translate & Adapt entry covers both |
| `Stories full of lively banter and wanderings, straight to your inbox.` | identical | SECTION setting — `sections/footer-group.json:36` (same `subtext` value, after the `<br/>`) | as above |
| `Subscribe` | identical | SECTION setting — `sections/footer-group.json:38` (`email_signup.settings.button_label`) | Register the Slovak in Translate & Adapt |
| `NAVIGATE` | identical | SECTION setting — `sections/footer-group.json:47` (`link_list.settings.heading`) | Register the Slovak in Translate & Adapt |
| `SOCIAL` | identical | SECTION setting — `sections/footer-group.json:56` | as above |
| `OFFICIAL` | identical | SECTION setting — `sections/footer-group.json:65` | as above |
| `SUPPORT` | identical | SECTION setting — `sections/footer-group.json:74` | as above |

Everything else in the footer **is** translated: all four menus (`Shop`→`Obchod`,
`About`→`O nás`, `Where to Find Us`→`Kde nás nájdete`, `Privacy`→`Ochrana súkromia`,
`Terms`→`Obchodné podmienky`, `FAQ`→`Časté otázky`, `Contact`→`Kontakt`, `Tiktok`→`TikTok`), the
support line, `Cookie preferences`, `Payment methods`, the copyright line and the credits line.
The main navigation is fully translated too (`SHOP`→`OBCHOD`, `ABOUT`→`O NÁS`), as is the
announcement bar (`Welcome, curious traveller`→`Vitajte, zvedaví cestovatelia`) and the cart
drawer.

---

## `/` — home

`<title>`, `<meta name="description">`, `og:title`, `og:description` all translated. All visible
copy translated, including the three expandable story cards and both product cards.

| English string | Slovak now | Where it lives | Fix |
|---|---|---|---|
| `Slideshow about our brand` (`aria-label` on the hero slider) | identical | SECTION setting — `templates/index.json:101` (`accessibility_info`); default at `sections/slideshow.liquid:318` | Register the Slovak in Translate & Adapt |

Plus the 8 footer strings above.

**Images with empty `alt` (both languages):** 10 content images.
- 6 hero slideshow images — `Discover_prague_with_walterin…jpg`, `HOMEPAGE_phone…png`,
  `Page_by_page…jpg`, `HOMEPAGE_phone2…png`, `Daily_Inpiration_with_prague_tarot…jpg`,
  `HOMEPAGE_phone3…png`. `sections/slideshow.liquid:107–127` passes no `alt` to `image_tag`, so the
  alt comes from the file's own alt text in Content → Files, which is empty. Fix: set alt text on
  the six files (store data) and translate it; or add an `alt` setting to the slideshow block.
- 4 images in the four-image gallery — `Group_1060.png`, `Group_676.png`, `Group_673.png`,
  `Group_674.png`. `blocks/ai_gen_block_d287419.liquid:347/363/379/395` use
  `block.settings.image_N.alt`, which is empty for the same reason. Same fix.
- 3 further empty alts are deliberate: the product-card hover images
  (`snippets/card-product.liquid:118` sets `alt=""` on the second image).

Translated alt text that is working correctly, for reference: `Short stories`→`Krátke príbehy`,
`Witty history`→`Vtipná história`, `A universal language`→`Univerzálny jazyk`, and the three
product images.

---

## `/collections/all`

`<title>` `Products – Walterin`→`Produkty – Walterin` and `og:title` translated.
`<meta name="description">` is absent in both languages. Both product cards, their titles, types,
prices and alt text are translated. The whole Availability filter is translated, in the sidebar,
the mobile drawer and the no-JS fallback.

| English string | Slovak now | Where it lives | Fix |
|---|---|---|---|
| `City` (filter group label) | **missing — the group is not rendered on `/sk/` at all** | Store data — the filter is configured in the Search & Discovery app over the product tag `PRAGUE` (`filter.p.tag`). The theme renders whatever `collection.filters` returns; nothing in the repo names it. | Register the Slovak filter label **and** the tag value in Translate & Adapt (Filters / product tags). Until the tag value has a Slovak translation the whole group is dropped from the Slovak storefront. |
| `PRAGUE (2)` / `PRAGUE (2 products)` (filter value, ×4 occurrences: sidebar, drawer, no-JS, aria) | **missing on `/sk/`** | Store data — product tag `PRAGUE` on `walterin-prague` and `stickers` | as above |

Proof: `filter.p.tag` occurs 9× in `en_collall.html` and 0× in `sk_collall.html`; the only
occurrence of the substring `City` in the Slovak page is `themeCityHash` inside Shopify's own
analytics script.

**Images with empty `alt`:** 3, all deliberate (the product-card hover images,
`snippets/card-product.liquid:118`).

Plus the 8 footer strings.

---

## `/products/tarot`

The best-translated page on the site. `<title>`, `<meta name="description">`, `og:` tags, the
gallery, the buy box, variant options, all five accordions, "How a card is read", "Meet the cards",
the specs labels, the Walter paragraph and the product FAQ answers are all native Slovak.

| English string | Slovak now | Where it lives | Fix |
|---|---|---|---|
| `FAQ` (section heading above the product FAQ) | identical | **Theme locale file** — `locales/sk.json:587`, key `walterin.product_faq.title`, value `"FAQ"`; EN is `locales/en.default.json:557` | Edit `locales/sk.json` — the key exists, the value was simply left English |
| `Walter Ihring, the illustrator behind Walterin` (`<img alt>` on Walter's photo) | identical | SECTION setting — `templates/product.tarot.json:65` (`photo_alt`); default at `sections/meet-walter.liquid:160`, used at `:91` | Register the Slovak in Translate & Adapt |

**Deliberately identical, no action:** the 12 card names used as `aria-label` on the card buttons
(`The Magician`, `The Fool`, `Wheel of Fortune`, `The Star`, `Two of Wands`, `Knight of Wands`,
`Six of Cups`, `Seven of Swords`, `Two of Pentacles`, `Seven of Pentacles`) — the ground truth says
card artwork stays English on every site. Also the spec values `84 × 138 mm`, `270 g/m²` and the
book title `Walterin Bratislava`.

**Images with empty `alt`:** 17. The card artwork (`wi-major-*`, `wi-wands-*`, `wi-cups-*`,
`wi-swords-*`, `wi-pentacles-*`, `card-back.png`) and the zoom sheet are intentionally `alt=""` in
`sections/meet-the-cards.liquid:58/78/79/147` and `sections/how-a-card-is-read.liquid:111` — the
accessible name comes from the enclosing button's `aria-label`. The six gallery thumbnails are
`alt: ''` by design in `sections/walterin-buy.liquid:266` and `:974`. Nothing to fix.

Plus the 8 footer strings.

---

## `/products/walterin-prague`

`<title>`, `<meta name="description">`, `og:` tags, the whole buy box, every gallery alt, the
"Look inside" block and all five FAQ answers are translated.

| English string | Slovak now | Where it lives | Fix |
|---|---|---|---|
| `FAQ` | identical | Theme locale file — `locales/sk.json:587`, `walterin.product_faq.title` | as on the tarot page |
| `[n] of 100 left` | identical | **Schema default in a `.liquid` file** — `sections/walterin-buy.liquid:1362`. The value is *not* in this product's template JSON (only `templates/product.tarot.json:31` sets it), so Translate & Adapt has no entry to translate. Rendered hidden at `sections/walterin-buy.liquid:1073`, substituted into the page by JS. | Set `remaining_text` explicitly in this product's template JSON and register the Slovak — **but see the quantity note above: the string should probably not exist at all.** |

**Deliberately identical:** `129 × 207 mm`, `PDF · EPUB`.

**Images with empty `alt`:** 7, all deliberate (six gallery thumbnails and the sticky-bar
thumbnail, `sections/walterin-buy.liquid:266` / `:974`).

Plus the 8 footer strings.

---

## `/products/stickers`

Fully translated otherwise, including all five long image alts.

| English string | Slovak now | Where it lives | Fix |
|---|---|---|---|
| `FAQ` | identical | Theme locale file — `locales/sk.json:587` | as above |
| `[n] of 100 left` | identical | Schema default — `sections/walterin-buy.liquid:1362` | as above |

**Deliberately identical:** `2 · 210 × 210 mm`.

**Images with empty `alt`:** 6, all deliberate (five gallery thumbnails + sticky-bar thumbnail).

Plus the 8 footer strings.

---

## `/pages/faq`

**Clean.** `<title>` `FAQ – Walterin`→`Časté otázky – Walterin`, heading
`Frequently asked questions`→`Časté otázky`, the sidebar title `FAQ`→`Otázky`, all six category
names and all 20 question/answer pairs are native Slovak (`locales/sk.json`, keys
`walterin.faq.*`). The only identical strings are `support@walterin.com` and the `– Walterin` title
suffix.

Plus the 8 footer strings.

---

## `/pages/about-us` — worst page on the site

`<title>` `About Us – Walterin`→`O nás – Walterin` is translated. So is the
`<meta name="description">`, which reads *"Ahoj, volám sa Walter Ihring Venujem sa animovanému
humoru a karikatúre…"* — **that is the page body, and it is fully translated.** It is just not
rendered: `templates/page.about.json:119` disables the `main-page` section. What visitors see
instead is three rich-text blocks whose English sits in the template JSON.

| English string | Slovak now | Where it lives | Fix |
|---|---|---|---|
| `HI, MY NAME IS WALTER IHRING` | identical | BLOCK setting — `templates/page.about.json:18` (`rich_text_FABgJQ` → `heading_HKiFia.heading`) | Either re-enable the page body (`"disabled": true` at `:119`) and delete these blocks — the Slovak already exists — or register all three block settings in Translate & Adapt |
| `Walter Ihring is a Slovak illustrator and author who has spent more than three decades drawing the world with wit, precision, and an eye for the quietly extraordinary.` | identical | BLOCK setting — `templates/page.about.json:25` (`text_krW8A3.text`, first sentence) | as above |
| `His linework carries a gentle irony; his humour is subtle yet sharp, attuned to fleeting moments most people overlook. He first gained recognition in the Slovak cartoon scene by blending observational humour with elegantly restrained line art.` | identical | BLOCK setting — `templates/page.about.json:25` (same `text` value) | as above |
| `In` | identical | BLOCK setting — `templates/page.about.json:94` (`rich_text_kdg7nb` → `text_xw8rpx.text`); appears 4× as the run-in before a bold year | as above |
| `, he was awarded the` | identical | `templates/page.about.json:94` | as above |
| `Zlatý Gunár (Golden Gander)` | identical | `templates/page.about.json:94` | the gloss `(Golden Gander)` is for English readers; the award name itself is Slovak |
| `for outstanding caricature at the festival` | identical | `templates/page.about.json:94` | as above |
| `Kremnické Gagy` | identical | `templates/page.about.json:94` | proper name — no action |
| `— one of Slovakia’s most established humour and satire festivals. (Official website:` | identical | `templates/page.about.json:94` | as above |
| `)In` | identical | `templates/page.about.json:94` | note the missing space/paragraph break — a markup bug in both languages |
| `, he returned as a` | identical | `templates/page.about.json:94` | as above |
| `jury member` | identical | `templates/page.about.json:94` | as above |
| `in the same category — a role reserved almost exclusively for previous winners. His drawings have been exhibited in Slovakia and abroad, and critics often highlight the clarity of his ink work and the quiet sharpness of his humour.` | identical | `templates/page.about.json:94` | as above |
| `Ihring’s work has also appeared in mainstream print. In` | identical | `templates/page.about.json:94` | as above |
| `May 2010` | identical | `templates/page.about.json:94` | a date written in English |
| `, he wrote and illustrated the feature` | identical | `templates/page.about.json:94` | as above |
| `„Walter Ihring o ženách“` | identical | `templates/page.about.json:94` | already Slovak — no action |
| `for the Slovak edition of` | identical | `templates/page.about.json:94` | as above |
| `Playboy` | identical | `templates/page.about.json:94` | proper name — no action |
| `(issue 5/2010). In this playful essay, he reflected on the differences between men and women with characteristic tongue-in-cheek comparisons — dividing women into “fire-engine” and “racing-car” types, contemplating how feminine beauty fuels his creative energy, and admitting that drawing brings calm to both him and his wife. This rare print appearance shows how naturally his humour resonates beyond the traditional circle of cartoon enthusiasts.` | identical | `templates/page.about.json:94` | as above |
| `, Ihring transformed his love of travel, cities, and history into the illustrated guidebook` | identical | `templates/page.about.json:94` | as above |
| `Walterin Bratislava` | identical | `templates/page.about.json:94` | book title — no action |
| `— a blend of comic storytelling, local history, and playful discovery.` | identical | `templates/page.about.json:94` | as above |
| `, he began building the digital platform` | identical | `templates/page.about.json:94` | as above |
| `Walterin.com` | identical | `templates/page.about.json:94` | domain — no action |
| `and expanding` | identical | `templates/page.about.json:94` | as above |
| `into a fully developed illustrated series — bringing his visual storytelling, city narratives, and humour into a new, modern format accessible to readers worldwide.` | identical | `templates/page.about.json:94` | as above |
| `Today, the Walterin series continues to grow, offering visual mini-stories that explore cities, culture, and human quirks through his distinct, gently ironic voice. When not drawing, Walter can often be found in a café, observing passers-by and collecting small human moments that later shape his illustrations.` | identical | `templates/page.about.json:94` | as above |

Counted as **22 untranslated strings** (the 29 rows above minus the 7 that are proper names, book
titles, a domain or already Slovak: `Zlatý Gunár (Golden Gander)`, `Kremnické Gagy`,
`„Walter Ihring o ženách“`, `Playboy`, `Walterin Bratislava`, `Walterin.com`, `https://gagy.eu`).
`May 2010` is counted as untranslated because the month is written in English.

**Images with empty `alt`:** 1 — `illustrated_biography_pixel…png`, the full-width biography
illustration, rendered by `blocks/ai_gen_block_f719dfb` (zoom-lens block) from the file's own alt
text. Fix: set alt text on the file in Content → Files (store data) and translate it.

Plus the 8 footer strings.

---

## `/pages/contact`

`<title>`, `<meta name="description">`, `og:` tags, the intro paragraph, the opening hours
(`9:00–17:00 CET`→`9:00–17:00 SEČ`), `* indicates a required field`→`* povinné pole`, the
`Email` label, the `Send`→`Odoslať` button and the company details below the form are all
translated. The form itself is not, because it is not translatable: the strings are written into
the Liquid.

| English string | Slovak now | Where it lives | Fix |
|---|---|---|---|
| `Contact form` (page `<h2>`) | identical | SECTION setting — `templates/page.contact.json:24` (`heading`); default at `sections/contact-form.liquid:330`; EN locale copy at `locales/en.default.json:259` | Register the Slovak in Translate & Adapt |
| `First and Last Name *` (`placeholder`) | identical | **Hardcoded** — `sections/contact-form.liquid:166` | Move to `locales/*.json` and render with `\| t` |
| `First and Last Name` (`<label>`) | identical | **Hardcoded** — `sections/contact-form.liquid:169` | as above |
| `Contact Reason *` (dropdown display) | identical | **Hardcoded** — `sections/contact-form.liquid:210` | as above |
| `Order status` | identical | **Hardcoded** — `sections/contact-form.liquid:214` (one `assign` string, split on commas) | Move the 11 reasons into `locales/*.json` as a list and render with `\| t`; the hidden input's name `contact[Contact Reason]` must stay English so the emails keep one field name |
| `Cancel or modify an order` | identical | **Hardcoded** — `sections/contact-form.liquid:214` | as above |
| `Returns or exchanges` | identical | **Hardcoded** — `sections/contact-form.liquid:214` | as above |
| `My order is missing` | identical | **Hardcoded** — `sections/contact-form.liquid:214` | as above |
| `My order arrived damaged` | identical | **Hardcoded** — `sections/contact-form.liquid:214` | as above |
| `Issue with my product` | identical | **Hardcoded** — `sections/contact-form.liquid:214` | as above |
| `Shipping questions` | identical | **Hardcoded** — `sections/contact-form.liquid:214` | as above |
| `Product questions` | identical | **Hardcoded** — `sections/contact-form.liquid:214` | as above |
| `General feedback` | identical | **Hardcoded** — `sections/contact-form.liquid:214` | as above |
| `Partnership / Collaboration` | identical | **Hardcoded** — `sections/contact-form.liquid:214` | as above |
| `Other` | identical | **Hardcoded** — `sections/contact-form.liquid:214` | as above |
| `Tell us the details *` (`placeholder`) | identical | **Hardcoded** — `sections/contact-form.liquid:229` | as above |
| `Tell us the details` (`<label>`) | identical | **Hardcoded** — `sections/contact-form.liquid:232` | as above |

**Deliberately identical:** `Walterin s. r. o.`, `support@walterin.com`, `+421 905 549 907`.
One line differs correctly: `…Bratislava – Nové Mesto, Slovakia` → `…, Slovensko`.

**Images with empty `alt`:** none.

Plus the 8 footer strings.

---

## `/pages/where-to-find-us`

`<title>` `Where to find us – Walterin`→`Kde nás nájdete – Walterin`. Every paragraph, both
buttons (`To the shop`→`Do obchodu`, `Write to us`→`Napíšte nám`), the bookshops block and
`Drag the globe`→`Potiahnite glóbus` are translated.

| English string | Slovak now | Where it lives | Fix |
|---|---|---|---|
| `Online` (block heading) | identical | SECTION setting — `templates/page.where-to-find-us.json:27` | None needed — `Online` is the same word in Slovak. Listed only because the diff flags it. |

Plus the 8 footer strings.

---

## `/pages/drop-us-a-note-anytime`

`<title>` `Drop us a note anytime. – Walterin`→`Napíšte nám kedykoľvek. – Walterin` is translated,
and so is the `<h1>` above the form. The `<h2>` inside the section is not, and the form is the same
hardcoded one as `/pages/contact`.

| English string | Slovak now | Where it lives | Fix |
|---|---|---|---|
| `drop us a note anytime.` (section `<h2>`, lower-case) | identical | SECTION setting — `templates/page.drop-us-a-note-anytime.json:27` (`contact_form_d8byQY.settings.heading`) | Register the Slovak in Translate & Adapt. Note this page duplicates `/pages/contact` — the real question is whether it should exist. |
| `First and Last Name *` | identical | Hardcoded — `sections/contact-form.liquid:166` | see `/pages/contact` |
| `First and Last Name` | identical | Hardcoded — `sections/contact-form.liquid:169` | see `/pages/contact` |
| `Contact Reason *` | identical | Hardcoded — `sections/contact-form.liquid:210` | see `/pages/contact` |
| `Order status` … `Other` (11 reasons) | identical | Hardcoded — `sections/contact-form.liquid:214` | see `/pages/contact` |
| `Tell us the details *` | identical | Hardcoded — `sections/contact-form.liquid:229` | see `/pages/contact` |
| `Tell us the details` | identical | Hardcoded — `sections/contact-form.liquid:232` | see `/pages/contact` |

Plus the 8 footer strings.

---

## `/pages/withdrawal`

**Clean.** `<title>` `Withdraw from contract – Walterin`→`Odstúpenie od zmluvy – Walterin`, every
field label (`Name and surname`→`Meno a priezvisko`, `Email for the confirmation`→`E-mail na
potvrdenie`, `Order number`→`Číslo objednávky`, `Order date (optional)`→`Dátum objednávky
(nepovinné)`, `Which items (optional)`→`Ktorý tovar (nepovinné)`), the helper line, the
`Confirm withdrawal`→`Potvrdiť odstúpenie od zmluvy` button and the eBook note are all native
Slovak. Only `support@walterin.com` is identical.

Plus the 8 footer strings.

---

## `/cart`

`<title>` `Your Shopping Cart – Walterin`→`Váš nákupný košík – Walterin`. The cart table, the
empty-cart state, `Update`→`Aktualizovať`, `Check out`→`Prejsť k pokladni`, the recommendations
row and the launch dates are all translated. One leftover Dawn newsletter section sits below the
cart and is not.

| English string | Slovak now | Where it lives | Fix |
|---|---|---|---|
| `Subscribe to our emails` (the one above the cart footer, not the footer's) | identical | BLOCK setting — `templates/cart.json:76` (`newsletter` → `heading.settings.heading`) | Delete this section — it duplicates the footer signup — or register the Slovak |
| `Join our email list for exclusive offers and the latest news.` | identical | BLOCK setting — `templates/cart.json:83` (`paragraph.settings.text`) | as above |
| `Sign up` (button) | identical | **Schema default** — `sections/newsletter.liquid:148`. The `email_form` block in `templates/cart.json` sets no `button_label`, so the raw default renders and Translate & Adapt has nothing to translate. | as above; if the section stays, set `button_label` in the template JSON so it becomes translatable |

**Images with empty `alt`:** none.

Plus the 8 footer strings.

---

## `/search?q=praha`

`<title>` and `og:title` translated, including the count:
`Search: 2 results found for "praha"`→`Vyhľadávanie: počet výsledkov pre výraz „praha“: 2`. The
sort control is fully translated (`Relevance`→`Relevantnosť`,
`Price, low to high`→`Cena, od najnižšej po najvyššiu`, etc.) and so is the Availability filter.

| English string | Slovak now | Where it lives | Fix |
|---|---|---|---|
| `Discover Walterin, illustrated city stories told with humour, wit, and design. Explore Prague, Paris, and more through playful mini-stories and original artwork.` (`<meta name="description">`, `og:description`, `twitter:description`) | **identical** | Store data — the shop description. The theme only emits `page_description \| default: shop.description` (`snippets/meta-tags.liquid:5`, `layout/theme.liquid:38–39`). Every other `/sk/` page gets the Slovak version of this text, so a second, untranslated copy is being used on the search template. | Find the untranslated copy in Translate & Adapt (Store metadata / SEO) and register the Slovak. Nothing to change in the theme. |
| `City` + `PRAGUE (2)` (filter group) | **missing on `/sk/`** | Store data — Search & Discovery filter over the `PRAGUE` tag | see `/collections/all`; the same group is absent here |

**Images with empty `alt`:** none.

Plus the 8 footer strings.

---

## `/policies/terms-of-service`

**Clean.** All 10+ clauses are native Slovak, including the EU legal-guarantee notice. The only
identical strings are `Walterin s. r. o.`, `support@walterin.com` and the three authority URLs
(`https://www.soi.sk`, the MH SR ADR list, `https://walterin.com/policies/privacy-policy`).

Plus the 8 footer strings.

---

## `/policies/privacy-policy`

**Clean.** Every numbered clause is translated. The 21 identical strings are all legitimate:
section numbers whose words are the same in Slovak (`2.3 Newsletter`, `4. Cookies`), product and
company names (`Shopify`, `Shopify Flow`, `Shopify Messaging`, `Shopify Digital Products`,
`Shopify Network Intelligence`, `Stripe`, `Translate & Adapt`,
`Meta Platforms Ireland Limited`, `Walterin s. r. o.`), nine URLs and the support address.

Plus the 8 footer strings.

---

## `/policies/refund-policy`

**Clean.** Identical strings: `support@walterin.com` and the MH SR ADR URL.

Plus the 8 footer strings.

---

## `/policies/contact-information`

**Clean.** `<title>` `Contact information – Walterin`→`Kontaktné údaje – Walterin`. Identical
strings: `Walterin s. r. o.`, `support@walterin.com`, `https://www.soi.sk`.

Plus the 8 footer strings.

---

## `/pages/does-not-exist` — 404

Returns `404` in both languages (confirmed by status code). `<title>`
`404 Not Found – Walterin`→`404 Stránka sa nenašla – Walterin`, `Page not found`→`Stránka sa
nenašla` and `Continue shopping`→`Pokračovať v nákupe` are translated. The same leftover Dawn
newsletter section as on the cart is not.

| English string | Slovak now | Where it lives | Fix |
|---|---|---|---|
| `Subscribe to our emails` | identical | BLOCK setting — `templates/404.json:22` | Delete the section (it duplicates the footer) or register the Slovak |
| `Join our email list for exclusive offers and the latest news.` | identical | BLOCK setting — `templates/404.json:29` | as above |
| `Sign up` | identical | Schema default — `sections/newsletter.liquid:148` | as above |

Plus the 8 footer strings.

---

## Every hardcoded English string found inside a `.liquid` file

Scanned every `.liquid` in `sections/`, `snippets/`, `layout/`, `blocks/` for visible text nodes
and visible attributes (`placeholder`, `aria-label`, `title`, `alt`) outside `{% schema %}` and
outside Liquid/HTML comments. The schema blocks were scanned separately for raw-string
`"default"` values, because a default that is never written into a template JSON cannot be
translated.

### Live and visible to Slovak visitors

| File:line | String | Rendered on | Fix |
|---|---|---|---|
| `sections/contact-form.liquid:166` | `First and Last Name *` (`placeholder`) | `/pages/contact`, `/pages/drop-us-a-note-anytime` | add a key to `locales/en.default.json` + `locales/sk.json`, render with `\| t` |
| `sections/contact-form.liquid:169` | `First and Last Name` (`<label>`) | same | same |
| `sections/contact-form.liquid:210` | `Contact Reason *` | same | same |
| `sections/contact-form.liquid:214` | `Order status,Cancel or modify an order,Returns or exchanges,My order is missing,My order arrived damaged,Issue with my product,Shipping questions,Product questions,General feedback,Partnership / Collaboration,Other` (one `assign`, 11 visible options) | same | move the list to the locale files; keep the hidden input name `contact[Contact Reason]` in English so the notification emails keep one field name |
| `sections/contact-form.liquid:229` | `Tell us the details *` (`placeholder`) | same | same |
| `sections/contact-form.liquid:232` | `Tell us the details` (`<label>`) | same | same |

### Live, but only on a schema default that no template JSON overrides

| File:line | String | Rendered on | Fix |
|---|---|---|---|
| `sections/walterin-buy.liquid:1362` | `"default": "[n] of 100 left"` | `/products/walterin-prague`, `/products/stickers` (hidden `<span>` at `:1073`, injected by JS when stock is low). Not reached on the tarot, where `templates/product.tarot.json:31` sets the value and the Slovak is registered. | decide whether the string should exist at all (quantity disclosure), then either delete it or set `remaining_text` per template and register the Slovak |
| `sections/newsletter.liquid:148` | `"default": "Sign up"` | `/cart`, `/pages/does-not-exist` (404) | set `button_label` in `templates/cart.json` / `templates/404.json`, or delete those newsletter sections |
| `sections/slideshow.liquid:318` | `"default": "Slideshow about our brand"` | `/` — but the value *is* written to `templates/index.json:101`, so this one is translatable as a section setting | register the Slovak in Translate & Adapt |
| `sections/meet-walter.liquid:160` | `"default": "Walter Ihring, the illustrator behind Walterin"` | `/products/tarot` — written to `templates/product.tarot.json:65`, so translatable | register the Slovak in Translate & Adapt |

### Hardcoded but not reachable today — latent

| File:line | String | Why it does not render | Fix |
|---|---|---|---|
| `snippets/cart-discount-field.liquid:19` | `Please enter a discount code!` | `config/settings_data.json:148` has `"enable_cart_discount": false`, so neither `sections/main-cart-footer.liquid:49` nor `snippets/cart-drawer.liquid:384` reaches the snippet. Confirmed absent from the live cart in both languages. | move to the locale files before the discount field is ever switched on |
| `blocks/ai_gen_block_6b3446b.liquid:410` | `Select 3 products to showcase your special recommendations` | block is not used by any template | no action unless the block is adopted |

### Admin-facing only — correct as English

| File:line | String | Note |
|---|---|---|
| `snippets/gpsr-row.liquid:20` | `Safety notes missing: fill product metafield walterin.safety (Walter / printer). Not shown to visitors.` | a note to Veronka, deliberately English, and the snippet says so itself. Confirmed absent from all 36 live captures. |

### Clean

`locales/sk.json` holds **562 keys**; only **one** still carries its English value
(`walterin.product_faq.title` = `"FAQ"`, line 587), and only **one** key present in
`en.default.json` is missing from it (`shopify.checkout.payment.card_security_notice` — a checkout
string whose English value also makes two claims the policies contradict). Everything else in the
theme locale file is translated. That is why the remaining gaps are almost all section/block
settings and store data, not theme strings.

---

## Every image with an empty or missing `alt`

No image anywhere on the site is missing the `alt` **attribute**; the ones below have `alt=""`.
The set is identical in EN and SK on every page, so this is an accessibility and SEO gap in both
languages rather than a translation gap. **11 of them are content images that should have alt
text**; the rest are decorative or named by an ancestor element. Counts of `alt=""` elements per
page: `/` 13, `/collections/all` 3, `/products/tarot` 17, `/products/walterin-prague` 7,
`/products/stickers` 6, `/pages/about-us` 1, every other page 0.

### Genuinely missing — all are content images

| Page | Image | Where the alt comes from | Fix |
|---|---|---|---|
| `/` | `Discover_prague_with_walterin…jpg` | file alt text, Content → Files (`sections/slideshow.liquid:107`) | set alt on the file, then translate it |
| `/` | `HOMEPAGE_phone_a562b586…png` | same (`sections/slideshow.liquid:119`, mobile image) | same |
| `/` | `Page_by_page_128c1900…jpg` | same | same |
| `/` | `HOMEPAGE_phone2_5b723083…png` | same | same |
| `/` | `Daily_Inpiration_with_prague_tarot…jpg` | same | same |
| `/` | `HOMEPAGE_phone3_0bdd1018…png` | same | same |
| `/` | `Group_1060.png` | file alt text (`blocks/ai_gen_block_d287419.liquid:347`) | same |
| `/` | `Group_676.png` | same (`:363`) | same |
| `/` | `Group_673.png` | same (`:379`) | same |
| `/` | `Group_674.png` | same (`:395`) | same |
| `/pages/about-us` | `illustrated_biography_pixel…png` | file alt text (`blocks/ai_gen_block_f719dfb`, zoom-lens block) | same |

### Deliberately `alt=""` — decorative or named by an ancestor

| Page(s) | Images | Why |
|---|---|---|
| `/`, `/collections/all` | `walterin-prague-…-outdoor.jpg`, `PRODUCT_BOOK1…jpg`, `STICKERS_2.jpg` (at `width=533`) | product-card hover images; `snippets/card-product.liquid:118` sets `alt=""` because the card's first image already carries the alt |
| `/products/tarot` | `wi-major-01/02/04/05.jpg`, `wi-wands-01/03.jpg`, `wi-cups-01.jpg`, `wi-swords-03.jpg`, `wi-pentacles-01/02.jpg`, `card-back.png` ×2, and the empty zoom-sheet `<img>` | `sections/meet-the-cards.liquid:58/78/79/147`, `sections/how-a-card-is-read.liquid:111`. The accessible name is on the enclosing button's `aria-label` (the card name). |
| `/products/tarot`, `/products/walterin-prague`, `/products/stickers` | all gallery thumbnails (`width=200`) and the sticky-bar thumbnail (`width=120`) | `sections/walterin-buy.liquid:266` and `:974` pass `alt: ''`; the main gallery image carries the real alt |

### Alt text that is translated and correct, for reference

`/` and `/collections/all` product cards, the three home story cards
(`Short stories`→`Krátke príbehy`, `Witty history`→`Vtipná história`,
`A universal language`→`Univerzálny jazyk`), all four Prague gallery images, all five sticker
gallery images, the tarot gallery (`Tarot of Consciousness: A Graphic Journey`→`Komiksový tarot
vedomia`), `The printed card back`→`Potlačená zadná strana karty` and
`The nine-frame path`→`Cesta v 9 krokoch`. One untranslated alt only:
`Walter Ihring, the illustrator behind Walterin` on `/products/tarot`.

The logo's `alt="Walterin"` is identical in both languages and correct.

---

## Titles and meta descriptions, both languages

Checked `<title>`, `<meta name="description">`, `og:title`, `og:description` on all 18 pages.
**Everything is translated except one page.**

| Page | Finding |
|---|---|
| `/search?q=praha` | `<meta name="description">`, `og:description` and `twitter:description` are the English shop description on `/sk/`. The only meta-level gap on the site. |
| `/collections/all`, `/pages/faq`, `/pages/about-us`, `/pages/where-to-find-us`, `/pages/drop-us-a-note-anytime`, `/pages/withdrawal`, `/cart`, all four policies, 404 | no `<meta name="description">` in **either** language; `og:description` falls back to the shop description, which is correctly Slovak on `/sk/`. Not a translation bug, but worth knowing that ten pages ship without their own meta description. |
| `/`, `/products/tarot`, `/products/walterin-prague`, `/products/stickers`, `/pages/contact` | fully translated title and description, both written natively |
