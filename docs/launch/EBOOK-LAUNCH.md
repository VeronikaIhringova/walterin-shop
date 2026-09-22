# eBooks on sale tomorrow: plan

## What becomes buyable
- **Walterin Prague, Interactive eBook**, English (€18.99) and Czech (€20.99). These are the only eBook variants that exist on an ACTIVE product.
- **Not buyable:**
  - Walterin Paris: the product is DRAFT, prices are TBD, and no Slovak variant exists.
  - Slovak Prague eBook: the variant doesn't exist yet.
  - All physical goods (tarot, printed books, stickers): stock 0, "stop selling when out of stock", which stays like that.

## Markets: what changes (approval item 12)
- **Today:** one active market "Slovakia" (SK only). Nobody outside Slovakia can check out.
- **New market "European Union":** 26 countries (AT, BE, BG, HR, CY, CZ, DK, EE, FI, FR, DE, GR, HU, IE, IT, LV, LT, LU, MT, NL, PL, PT, RO, SI, ES, SE), currency EUR, prices the same as Slovakia (no adjustments), status active.
- **Effect:**
  - Customers in all 27 EU countries can check out.
  - eBooks need no shipping, so no shipping zone is needed for them.
  - Physical goods stay unbuyable because they're out of stock, and in a mixed cart the physical item can't be added.
  - No tax is charged: no tax registrations, not a VAT payer.
  - The storefront language stays EN (SK once published).
  - The country selector lists the EU countries.
- **Unchanged:** the non-EU countries in the "International" shipping zone (US, UK, etc.) still can't buy, because they aren't in any market.
- **Rollback:** set the market to draft (`marketUpdate status: DRAFT`).

## Digital Products app: what I can't see and you must check
Claude Code can't read the app's data (files and limits aren't in the Admin API). Please open **Apps → Digital Products** and check:

| Variant | File needed | Status |
|---|---|---|
| Walterin Prague · English · Digital Interactive Edition | PDF (high-res) + EPUB (fixed layout), English | ☐ attached? |
| Walterin Prague · Czech · Digital Interactive Edition | PDF + EPUB, Czech | ☐ attached? |
| Walterin Paris · English · Digital (draft product) | later | – |
| Walterin Paris · French · Digital (not sold) | none | – |

Also: download limit (suggestion: 5 downloads, link valid 30 days), delivery "after payment", and the email text from `docs/legal/emails/digital-download-email.md`.
**If a variant has no file, it must stay tracked with stock 0 (not buyable).** Tracking is switched off only for variants with a file (item 13).

## Order of steps tomorrow
1. You: switch off "Include tax in prices" (Settings → Taxes and duties). I verify `taxesIncluded=false`.
2. You: Digital Products files + limits + email; order confirmation legal block pasted (Settings → Notifications).
3. Me: items 1–11 of the approval list (theme push, legal texts, pages, products), each read back.
4. Me: item 12 (EU market).
5. Me: item 13 (**last**): inventory tracking off on the eBook variants that have files.
6. You: test order (below). Only after it passes do we announce anything.

## Test order (real card)
1. In a private window, go to walterin.com → Walterin Prague → English → Interactive eBook → Add to cart.
2. Cart: the eBook consent box appears and Checkout is blocked until it's ticked; no Apple Pay / Google Pay buttons in the cart. Tick it, then Check out.
3. Checkout: no shipping address is asked for (digital only), price €18.99, no tax line, "Pay now". Pay with your own card.
4. Emails:
   - (a) order confirmation contains the legal block and "eBook: your consent" with the declaration text;
   - (b) download email arrives; the link works; the PDF and EPUB open.
5. Admin: the order shows the attribute "eBook consent".
6. Refund: Orders → the order → Refund → full amount → reason "test". Check that the refund email arrives. The Stripe fee may not be returned (Stripe's terms).
7. Tell me the results; I'll note PASS/FAIL in LAUNCH-READINESS.md.

## Two questions for the accountant (by phone)
1. "We're **not a VAT payer**. When we sell an **eBook** to a private customer in another EU country (e.g. Germany), do we have to charge that country's VAT and register for **OSS** from the first sale, or not until a threshold? Can we start selling tomorrow?"
2. "What **document** must the customer get for each online sale (invoice, receipt, or is Shopify's order confirmation enough for a non-payer)? Do we need **eKasa** for online card payments?"
