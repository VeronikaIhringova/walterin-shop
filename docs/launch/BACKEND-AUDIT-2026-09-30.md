# Backend audit — 30 Sep 2026

Read-only. Nothing changed. Store `0ed210-bf.myshopify.com`, Shopify **Basic**.

Inventory: 6 products / 13 variants · 3 collections · 8 pages · 4 blogs / 6 articles (all
unpublished) · 7 menus · 2 markets · 1 delivery profile · 1 location · **0 orders** · 9 customers ·
350 files · **11 themes** · 4 locales · 0 redirects.

## Two earlier claims of mine, corrected

**The `custom.safety_info` / `walterin.safety` mismatch I flagged on 29 Sep does not exist.** There
is no `custom.safety_info` definition anywhere. `walterin.safety` exists and is exactly what
`snippets/gpsr-row.liquid:9` reads. The namespaces match. I was wrong; the note in
`docs/launch/LAUNCH-READINESS.md` about a metafield definition was mis-transcribed. The real problem
in that place is B4 below — the definition has **no values**.

**The old legal pages are already unpublished.** `/pages/privacy-policy` and
`/pages/terms-and-conditions` are both `isPublished: false`. Item L2 is done.

---

## Blocking

**B1 · 12 EU countries can order but have no shipping rate.** The EU market enables all 26 non-SK
states; the shipping zones cover 14. Missing: **BG, CY, EE, GR, HR, HU, LT, LU, LV, MT, RO, SI**. A
Greek customer adds a physical product and hits "no shipping methods available" at checkout — a
silent lost sale you never see. Digital-only carts are unaffected, which is why it hasn't bitten.
*Fix: one "European Union" zone with all 26, instead of a country list.*

**B2 · 14 non-EU countries have rates but no market** (AE, AU, CA, CH, GB, HK, IL, JP, KR, MY, NO,
NZ, SG, US) at €18 flat. Dead weight today, but if a market is ever switched on you are committed to
€18 to Australia with no Pack4you route, customs paperwork and GPSR representative duties.
*Fix: delete them. EU-only until there is a decision.*

**B3 · Domestic shipping to Slovakia is €0.00.** Never decided — Pack4you is unsigned so the cost is
unknown. On a €39 deck against a ~70% margin target that is several points absorbed silently. €18 to
Austria on a €12.50 sticker set is the opposite error. *Fix: decide both once Pack4you prices exist;
weight-banded rates, which needs B5 first.*

**B4 · No product has GPSR safety information.** `walterin.safety` exists with **zero values**, so
`gpsr-row.liquid` renders manufacturer and identifier and nothing else, on all six products. Art. 19
of Reg. (EU) 2023/988 wants warnings with the offer. The snippet is built correctly — the data is
absent. *Fix: one safety line per physical product from Walter/the printer.*

**B5 · Every physical variant weighs 0 kg** — 10 of 11 (stickers, 0.05 kg, is the exception). No
weight-based rates, no correct carrier label, no customs value. *Fix: Walter weighs a packed deck, a
packed book, a folded shirt. Nothing in shipping can be trusted until this is done.*

**B6 · The Paris eBooks can never be sold.** Both digital Paris variants are `tracked: true` at 0
stock — permanently sold out. Prague's are `tracked: false` and correctly available. Paris is DRAFT
so nothing is live, but eBooks go on sale *first* and this would surface on launch day.
*Fix: tracking off on all digital variants. Untracked + `requiresShipping: false` is the only
correct shape for an eBook.*

**B7 · Two draft products oversell.** `t-shirt` and `prague-tarot` are `inventoryPolicy: CONTINUE`
at 0 stock, with no supplier, no weight and no fulfilment route. The moment either goes ACTIVE it
accepts unlimited orders. Everything else on the store is `DENY`. *Fix: set both to DENY now, while
it costs nothing.*

**B8 · A fake 5-star rating is stored on Walterin Prague.** `reviews.rating = 5.0`,
`reviews.rating_count = 1`, plus leftover `judgeme.badge` / `judgeme.widget` blobs (Paris too). Two
customers still carry the tag "Wrote Judge.me web review". These are Shopify **standard**
definitions and the theme reads them — `snippets/card-product.liquid:210` and
`sections/main-product.liquid:509` render stars from `product.metafields.reviews.rating`, behind a
`show_rating` setting. One toggle publishes a single unverifiable review; Google also harvests it
for rich snippets. Ground truth says reviews stay hidden until real ones exist, and under the
Omnibus Directive showing a review you cannot substantiate is an unfair commercial practice.
*Fix: delete the metafields, the two `reviews.*` definitions and the customer tag.*

**B9 · Slovak is published; ground truth says it is not.** `sk.published: true`, but ground truth §5
says "added, not published… publish together with the new design". And it is incomplete — see T1–T3.
Slovak visitors get English text mid-page today. *Fix: Veronka decides. Either unpublish `sk` until
the gaps are closed, or update ground truth and close them now.*

---

## Should fix

**S1 · Tag mix-ups.** `stickers` is tagged `PARIS` (it is a Prague product). `walterin-paris` is
tagged `PRAGUE` **and** sits in the `walterin-prague` collection. `tarot` and `prague-tarot` have no
tags. (`t-shirt` tagged `PRAGUE` is correct — my earlier note was a false alarm.)

**S2 · `productType` empty on all six products.** The Facebook & Instagram channel is installed and
all three active products publish to it; without a type they get mis-categorised or rejected. Only
`tarot` has a Google product category.

**S3 · The flagship product has no SEO description.** `tarot` — `seo.description: null`. Every other
product has one. All six SEO titles are 61–80 chars and get truncated.

**S4 · 7 of 8 pages and 2 of 3 collections have no SEO title or description** — including
`/collections/all-products`, which is what "SHOP" points at.

**S5 · No alt text on the tarot's or stickers' images** — all 5 each, plus `prague-tarot`,
`walterin-paris`, and 2 of 6 Prague images. The tarot is the launch product with zero indexable
image text. EAA applies.

**S6 · No SKUs, no barcodes.** `gpsr-row.liquid:17` prints the SKU as the GPSR product identifier —
with none, the row is weaker than the regulation intends. Pack4you will want codes.
*Suggested: `TAR-EN`, `TAR-SK`, `PRG-BOOK-EN`, `PRG-EBOOK-EN`, `PRG-STK`, `PRG-TEE-W`.*

**S7 · `taxable` is inconsistent** — false on all Prague/Paris variants, true on the rest. Nothing is
charged today (not VAT registered, no rates), but the flags disagree for no reason and VAT
registration would turn that into wrong invoices. *Fix: `true` everywhere — it changes nothing now
and makes registration a single settings change.*

**S8 · No shipping policy.** Blocked on Pack4you. The last legal gap.

**S9 · `#javascript:void(0)` still in the support menu.** The theme now renders it as text, but the
menu item still holds the hack URL. It is also the **only outdated Slovak translation in the store**.
*Fix: once the wording is changed, the hours belong in a theme setting or locale string, not in
navigation.*

**S10 · Two menus disagree where "Shop" goes** — `/collections/all-products` vs `/collections/all`.
Splits SEO and bypasses the manual sort order.

**S11 · Orphan templates.** `templates/page.track-order.json` (Track123 uninstalled, no such page),
`templates/blog.comics-2.json`, and an empty non-disabled `apps` section in `product.tarot.json`.

**S12 · Stale order count.** Store has 0 orders but one customer record claims 2. Not repairable via
API. Two of nine customers also carry the dead Judge.me tag.

**S13 · The location has no address** — only "Slovakia". That is the origin for rate calculation,
labels and customs. *Fix: Ľubochnianska 4, 831 04 Bratislava – Nové Mesto.*

**S14 · Eleven themes, nine unpublished** — including `188994257225` "Walterin Draft (Claude)",
which ground truth says was retired on 22 Sep, plus five June/July backup copies and two
unrelated themes. Every one is a mis-click from being published over the live store, and CLAUDE.md
says "one theme only". GitHub is the backup now, so the theme copies are redundant.
*Veronka's click; I will not touch themes.*

**S15 · Three comic blogs holding one article each.** A blog is a container, a comic is an article.
All six articles are unpublished, untagged, no summaries, no image alt.

---

## Nice to have

- **N1** `/pages/contact` says "DM us on Instagram @walterincomics" but the footer links
  `instagram.com/walterinwittyguide`. One is wrong, and the page is published. It also uses emoji
  against the copy guide, and the Instagram link carries a share-sheet tracking tail.
- **N2** Generic handles: `/products/t-shirt`, `/products/stickers`, `/products/prague-tarot` claim
  store-wide slugs. Both draft products can be renamed free right now; changing a live handle needs
  a redirect, and `urlRedirects` is currently 0.
- **N3** `t-shirt` has taxonomy metafields claiming two sizes and two age groups for a product whose
  only option is `Color: White`. A Meta catalog feed advertising sizes that cannot be bought gets
  flagged.
- **N4** `billingAddress.company` is "Walterin s.r.o."; everything else uses "Walterin s. r. o.".
- **N5** 350 files, almost no alt text. Nine files over 12 MB (largest 20.6 MB). Byte-identical
  duplicates. ~20 throwaway names (`lol.png`, `haha.png`, `yay.png`, `Test.png`…). One file with
  `mimeType: null` — a failed upload. **Do not bulk-delete**: a file still referenced by a section
  breaks with no warning. Start with the byte-identical duplicates, the screenshots and the null file.
- **N6** Retired "Comics Tarot" name in asset filenames.
- **N7** `frontpage` collection has no SEO and no description.
- **N8** Three overlapping related-products sections on the tarot template; two disabled.
- **N9** `/pages/drop-us-a-note-anytime` duplicates `/pages/contact` — two contact pages, two forms,
  linked from two different footer menus.
- **N10** Default `footer` menu holds only "Search".
- **N11** Products are published to Point of Sale. No POS, no shop.
- **N12** "Where to Find Us" resolves correctly — the earlier note that it points at `/` was wrong.

---

## Translations

Slovak: **exactly one outdated translation in the whole store** (the footer hours link). The risk
here is *missing*, not stale.

- **T1** The tarot template is missing 12+ Slovak keys, all in the disabled `collapsible_content`
  section. Invisible today; deleting the section removes the gap entirely.
- **T2** Homepage missing 12+ keys across three AI blocks; `page.about` 5; `page.where-to-find-us` 5
  including `body_html`; plus smaller gaps on 12 other templates. **Section groups (header and
  footer) and theme settings categories have zero Slovak translations** — anything typed into a
  header/footer setting is English for Slovak visitors.
- **T3** **44 of 67 metafield values are untranslated**, including the `walterin.*` fields the
  product pages actually print (`price_note`, `included`, `specs`, `notes`…). Given B9, this is live.
- **T4** All six products missing Slovak `handle` and `product_type`; 6 of 8 pages missing
  `body_html`; two product option names untranslated — that is the variant picker on the eBook.
- **T5** German and Czech are half-seeded and unpublished, which is correct. But a **Czech edition of
  the Prague book exists** (€20.99) while the `cs` storefront is off and Czechia is in the EU market
  — a Czech customer buys a Czech book off an English page. Worth deciding before the eBooks launch.

---

## Digital delivery — what is and is not knowable

The two Prague eBooks are shaped correctly (untracked, `requiresShipping: false`, available). The
two Paris ones are broken (B6).

**The Digital Products app's configuration is not readable via the Admin API.** Every variant
returned **zero** metafields; `metafieldDefinitions(ownerType: PRODUCTVARIANT)` is empty;
`appInstallations` is access-denied. The app keeps attached files and per-variant settings in its own
backend. So which file is attached to which variant, the download limit, and the delivery email
cannot be verified from here.

**Veronka must confirm in Apps → Digital Products, per variant:**
1. A file is attached to each of the four digital variants, **in the right language** — an English
   customer receiving the Czech PDF is invisible from the API.
2. The download limit, and whether it is one field per variant or one per file.
3. The delivery email sends from **support@walterin.com**.
4. Digital line items auto-fulfil, so an eBook order does not sit unfulfilled.

**The eBook consent mechanism cannot be verified end-to-end because there are zero orders.** The
theme side is correct and fails safe. **One real test eBook order is the single most important
pre-launch check on this store** — without that attribute recorded, the 14-day withdrawal right on a
delivered download is not validly waived.

---

## Payments — what is determinable

Readable: `supportedDigitalWallets` → `APPLE_PAY, GOOGLE_PAY`. That is all.

Not readable, and not guessed: payment customizations, web pixels, marketing activities, app
installations, discounts, gift cards — all access-denied. **There is no API surface for which
gateways are connected, or to which account.** On the PayPal / `troplain.shop@gmail.com` incident
there is **no readable signal either way**. I cannot confirm it was disconnected and cannot confirm
it wasn't.

**Veronka must check Settings → Payments:** only Stripe (and PayPal when deliberately added) is
listed; **no provider shows an email that is not hers**; test mode off; card brands match ground
truth; **Revolut Pay not enabled**; manual methods off unless chosen.

Also not readable: the **notification sender address**. `shop.email` is `info@` and
`contactEmail` is `support@` — that pair is correct — but the sender on customer-facing emails is a
third, separate setting, and ground truth says everything customers see comes from support@.
Confirm it, and confirm SPF/DKIM, or order confirmations and download links go to spam.

---

## Clean, so it is not re-audited

`setupRequired: false` · EUR · Europe/Bratislava · kilograms/metric · **`taxesIncluded: false` and
`taxShipping: false`, both correct for a non-VAT payer** · money format uses the Slovak decimal comma
with no tax label · `walterin.com`, SSL on · **EU market region list is complete — all 26, none
missing, none extra** · customer accounts are **new**, optional, login not required — the right
configuration · all four policies present and substantial · old duplicate legal pages unpublished ·
**`compareAtPrice` is null on all 13 variants — no fake discounts anywhere**, which matters under
the Omnibus Directive · 0 redirects, nothing broken · only one delivery profile · no half-built
metaobject model · the `walterin.*` definition set is clean and well-named.

---

## Order I would do it in

1. **B6, B7** — five variant settings. Free, drafts, prevents two launch-day failures.
2. **B8** — delete the fake rating and Judge.me residue. One toggle from being public.
3. **B9** — settle whether Slovak should be live. Everything in Translations depends on it.
4. **B5** — Walter weighs three things. Blocks B1 and B3.
5. **B1, B2, B3** — rebuild the delivery zones as one EU zone.
6. **B4** — six safety lines.
7. **One test eBook order**, and confirm the consent attribute lands.
8. Then S1–S15.

Everything needs "OK live" before any write. Nothing has been changed.
