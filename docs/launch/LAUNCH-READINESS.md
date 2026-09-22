# Launch readiness audit: walterin.com

Audit date: 22 September 2026 · read-only (Admin API read scopes, live theme 164726866249, draft theme 188994257225, public pages) · raw data in `docs/launch/audit-data/`.

**Verdict: not ready to sell.** 5 things block every sale today:
1. Only Slovakia is an active market.
2. Nothing is in stock.
3. There are no terms, withdrawal instructions or shipping policy.
4. There is no § 20a withdrawal function.
5. Live pages make false claims ("signed & numbered", a past launch date, "150", Revolut/PayPal/bank transfer).

**Couldn't check with the tools available:** checkout (every variant is sold out, so no cart), payment provider settings, notification templates, Digital Products app settings, tax registrations. These are marked **"Veronka checks"**.

Effort: S = under 1 h · M = half a day · L = 1–3 days.

## Status update: final setup (22 Sep 2026, late)

- **Workflow:** one live theme, preview with `shopify theme dev`, push only changed files after "OK live", GitHub as backup (CLAUDE.md, ground truth).
- **Not a VAT payer** (decided). The theme shows tax wording only if Shopify's "Include tax in prices" is on, so that setting must be off (approval item 0).
- **eBooks first:** the plan is in `docs/launch/EBOOK-LAUNCH.md` (EU market, Digital Products check, test order, 2 accountant questions).
- **§ 20a:** our form (footer link → `/pages/withdrawal`) sends to support@ and shows an on-screen confirmation. **A customer confirmation email (durable medium) still needs an app before physical sales** (Revoq undecided). Until then, support@ replies to every withdrawal submission by email the same day.
- **Legal-guarantee notice:** moved from product pages to Terms art. 10 (official image). **GPSR:** one "Product safety" row in Details, physical products only; safety notes wait for `custom.safety_info` data from Walter / the printer.
- **Full check (preview, 1280 + 390, 20 pages):** no "translation missing", no Liquid errors, no false claims except the tarot product title (approval item 9). No regressions vs live. The policy-page overflow on phones is fixed. **Existing issues, on live too:** layout shift ~0.13 on about-us/blog (header font), a JS error `offsetTop` on main-product pages, empty app/custom-liquid sections, and an empty "drop us a note" page. **Not testable:** carts with items (everything is out of stock until item 13), and SK pages (SK unpublished).
- **Approval list:** `docs/launch/APPROVAL-LIST.md` (items 0–13).

## Status update: 22 Sep 2026, evening

**Done (live store, each approved and read back):**
- New privacy policy EN + SK (L1).
- Old legal pages unpublished (L2).
- Company details + SOI in the contact policy (L7).
- False claims removed from the tarot page, Prague page, tarot description and metafield (L13).
- Live notify form: no pre-ticked newsletter box.

**Done (draft theme 188994257225, pushed, screenshots in `docs/launch/screenshots/`):**
- § 20a footer link + withdrawal page (L8; the confirmation email still needs an app, see `docs/legal/withdrawal-function-plan.md`).
- eBook consent in the cart; express buttons hidden for eBooks (L9).
- EU legal-guarantee notice, official colour image, EN/SK (L11).
- GPSR block (L14; the safety data is still missing).
- No VAT wording (T1).
- PayPal/Revolut claims removed (P2 in the draft).
- Judge.me/REZ/Appikon leftovers removed; blog noindex; notify form with the optional newsletter box (TH1–TH4).

**Drafted (docs/legal/, for the lawyer):**
- VOP / Terms (L3), Refund policy (L4), withdrawal instructions + model form (L5).
- Order confirmation + digital download email texts (L10).
- GPSR data sheet.
- Legal-guarantee notes.
- Publish-ready "now" versions: `docs/legal/publish/`.

**Waiting for your OK:** `docs/launch/APPROVAL-LIST.md`: Terms + Refund policy live, privacy §4, three live templates with PayPal/Revolut claims, withdrawal page, GPSR metafield, printed/digital variant fixes.

**On hold – Pack4you:** L6, S2, S3, S5, S7, S8 (shipping policy, rates, location/connection, SKUs, customs, packaging).

**New finding:** Prague page shows "€35,00 · SAVE 45%". The crossed-out price must be the lowest price of the previous 30 days (price-reduction rule). This is a decision for Veronka, since it's price data.

## Table

| # | Area | What's there now | What's missing | Blocker | Who | Effort |
|---|---|---|---|---|---|---|
| **LEGAL** |
| L1 | Privacy policy | New SK + EN published 22 Sep. Meta blocked without consent (tested). | Mention the footer "Cookie preferences" link in section 4. | no | Claude Code | S |
| L2 | **Old legal pages** | `/pages/privacy-policy` and `/pages/terms-and-conditions` **published** (Jan 2026 texts: "Prices include VAT", Google Analytics, 30-day returns). They contradict the new policy. Not linked from menus, but public and indexable. | Unpublish both (backup first). | **YES** | Claude Code (after OK) | S |
| L3 | Terms (VOP) | `/policies/terms-of-service` = US template with "[LINK]". | SK VOP (binding) + EN: ordering, price, delivery, payment, withdrawal, claims, digital content, ADR, SOI, governing law. | **YES** | Claude Code draft → lawyer | M |
| L4 | Refund policy | Clothing template: 30 days, "tags", "unworn", `[INSERT RETURN ADDRESS]`, info@. | Statutory 14-day withdrawal + claims (reklamácie) policy; return address. | **YES** | Claude Code draft → lawyer; Veronka: return address | M |
| L5 | Withdrawal instructions + model form | None. | Instructions (Annex 3 of 108/2024, incl. text 3a for the online function) + model form (Annex 2), SK + EN. | **YES** | Claude Code → lawyer | S |
| L6 | Shipping policy | None (`/policies/shipping-policy` 404). | Countries, carriers, times, prices, customs, split delivery. | **on hold – Pack4you** | Claude Code structure; Pack4you data | M |
| L7 | Contact information / legal notice | Contact policy: "Walterin s.r.o.", address, phone, **info@**. No IČO, register entry or supervisory authority. Footer has no company details. | § 4(1) zákon 22/2004 requires business name, registered office, **register + entry no.**, email, phone, **supervisory authority (SOI)**, easily and permanently accessible. | **YES** | Claude Code (policy update after OK) | S |
| L8 | § 20a online withdrawal function | Built (form → support@, on-screen confirmation). Customer email needs an app before physical sales. Was: none. Applies to online contracts concluded after 18 Jun 2026 (§ 53b). | "Odstúpiť od zmluvy tu" link, continuously available, no login; form (name, contract ID, email); "Potvrdiť odstúpenie od zmluvy" button; confirmation on durable medium with content + date/time. | **YES** | Claude Code (Task 2 plan → build) | M–L |
| L9 | Digital content (eBooks) | No consent mechanism. Cart page has **dynamic checkout buttons** (Apple/Google Pay) that skip the cart. | Before supply: separate notice + consumer's declaration + express consent (§ 17(10), § 19(1)(m)); confirmation on durable medium (§ 17(12)(b)). Without it the customer can withdraw **and** pays nothing (§ 22(4)(b)). Shopify Basic can't add a checkbox in checkout, so collect it in the cart and switch off express buttons for eBooks. | **YES** (for eBooks) | Claude Code (theme) + lawyer confirms | M |
| L10 | Order confirmation (durable medium) | Shopify default notifications (not readable via API). | § 17(12): confirmation of contract with VOP / withdrawal info (a link alone is risky: CJEU C-49/11) + the eBook consent confirmation. Needs custom notification Liquid, SK + EN. | **YES** | Claude Code drafts Liquid; Veronka pastes (admin only) | M |
| L11 | Harmonised legal-guarantee notice | None. | From **27 Sep 2026**, § 5(1)(f) of 108/2024 requires the EU harmonised notice (Impl. Reg. (EU) 2025/1960) for goods. | **YES** | Claude Code + lawyer | S |
| L12 | Order button wording | Shopify checkout: "Pay now" / SK equivalent. | § 17(4): "objednávka s povinnosťou platby" or equivalent. Lawyer to confirm "Pay now" is equivalent. | confirm | Lawyer | S |
| L13 | **Misleading claims (live)** | Live tarot page: "Only 100 **signed & numbered** copies", "**Next Launch – 13th of July 2026**", "9-layer system", "first run of **150** decks… Order now and your deck ships". Tarot product description (admin) still says "signed", "9-layer". Prague page: "Revolut… PayPal and **bank transfers**". | Remove or correct everywhere (admin description, live + draft theme texts). Unfair commercial practice risk (§ 7–8 of 108/2024). | **YES** | Claude Code (after OK); Veronka for live theme edits | S–M |
| L14 | GPSR product safety info | None on product pages. | EU General Product Safety Reg. 2023/988, Art. 19: online listings must show manufacturer name + postal and electronic address, product identifier, picture, warnings in the consumer's language. | **YES** | Walter/Veronka (data) + Claude Code (theme block) | S–M |
| L15 | Packaging EPR | Unknown. | SK packaging obligations (zákon 79/2015) and **Germany: LUCID registration before shipping any packaged goods to DE consumers**; other EU countries have similar schemes. | **YES** (for DE); ask for SK | Accountant / lawyer | M |
| L16 | Accessibility (EAA) | n/a | Microenterprises providing services are exempt. Confirm Walterin qualifies (<10 staff, ≤ €2M). | no | Accountant | S |
| **CHECKOUT** |
| C1 | Checkout test | Can't reach: every variant is sold out. | Full test order per product type (physical, eBook, mixed) in test mode, both languages. | **YES** | Veronka + Claude Code | M |
| C2 | Terms acceptance | Shopify Basic: no terms checkbox in checkout; policy links in checkout footer. | Lawyer to confirm the links are enough; alternatively a terms checkbox in the cart (theme). | confirm | Lawyer | S |
| C3 | Checkout language | Checkout follows the storefront language; SK unpublished. | SK checkout texts once SK is published. | yes (for SK buyers) | Veronka | S |
| **PAYMENTS** |
| P1 | Stripe (cards, Apple Pay, Google Pay) | `supportedDigitalWallets: APPLE_PAY, GOOGLE_PAY`. Provider settings not readable via API. | Veronka checks: live mode (not test), payouts, statement descriptor "WALTERIN", 3-D Secure. | **YES** (verify) | Veronka | S |
| P2 | PayPal / Revolut | PayPal "pending". Footer payment icons on live **and** draft show **Revolut** and **PayPal**, so some payment type is enabled for them. The draft trust row says PayPal. | Veronka: check Settings → Payments for anything Revolut/PayPal enabled. Remove the claims until they're live. | **YES** (misleading) | Veronka + Claude Code | S |
| P3 | Currency | EUR only. | Fine for the EU. | no | — | — |
| **TAXES** |
| T1 | VAT settings | `taxesIncluded: true`, `taxShipping: false`. Books (eBook **and printed**) `taxable: false`; tarot, stickers, T-shirt `taxable: true`. Draft buy section shows "**€39 VAT included**". Ground truth: VAT status unknown, "VAT included" must not appear if non-payer. | Accountant decides the VAT status, then set taxes and wording accordingly. Remove "VAT included" until confirmed. | **YES** | Accountant → Claude Code | S |
| T2 | OSS / eBooks / distance sales | Unknown. | See the accountant questions below. | **YES** | Accountant | — |
| **SHIPPING** |
| S1 | **Markets** | **Only "Slovakia" is active** (one market, SK only, no web presences). | Customers outside SK can't check out. Create an EU market (and later UK), decide countries, languages per market. | **YES** | Veronka decides; Claude Code configures (after OK) | M |
| S2 | Shipping zones and rates | General profile: Domestic SK **€0**; "International" **€18** to 28 countries incl. US, CA, AU, JP, KR, SG, HK, MY, IL, AE, NZ, GB, CH, NO. Missing EU countries: BG, HR, CY, EE, GR, HU, LV, LT, LU, MT, RO, SI. | Real Pack4you rates per zone. Remove non-EU countries until customs/duties/VAT are settled. | **on hold – Pack4you** | Pack4you → Veronka → Claude Code | M |
| S3 | Fulfilment location / Pack4you | One location "Shop location" (Slovakia, no address). No fulfilment service or app. | Pack4you contract; connection method (app, API or manual CSV); location with their address; stock there. | **on hold – Pack4you** | Veronka + Pack4you | M–L |
| S4 | Weights | 0 kg on all physical variants except stickers (0.05). | Real weights incl. packaging. | **YES** | Walter / printer → Claude Code | S |
| S5 | SKUs | None anywhere. | SKU scheme (Pack4you WMS needs them), e.g. `WT-TAROT-EN`, `WT-TAROT-SK`, `WT-PRG-BOOK-EN`. | **on hold – Pack4you** | Veronka / Pack4you; Claude Code enters | S |
| S6 | Inventory | Tarot EN/SK: tracked, qty 0 (needs 100/100). T-shirt and Prague Tarot: **"continue selling when out of stock"** at qty 0 → oversell risk. | Stock at the Pack4you location; switch overselling off for limited items. | **YES** | Veronka | S |
| S7 | HS codes / country of origin | Missing on all variants. | Needed for UK / non-EU customs only. | on hold – Pack4you | Veronka / Pack4you | S |
| S8 | Packaging | Unknown. | Box sizes / protection for deck and book (Pack4you). | on hold – Pack4you | Pack4you | — |
| **DIGITAL DELIVERY** |
| D1 | eBook variants | Walterin Prague "Digital Interactive Edition" (EN €18.99, CZ €20.99): **inventory tracked, qty 0, DENY**, so they can't be bought. Paris is DRAFT. | Stop tracking inventory on digital variants. Veronka checks in Digital Products: file attached per variant (PDF + EPUB), download limit, email text EN + SK. | **YES** | Veronka + Claude Code | S |
| D2 | **Printed editions misconfigured** | Prague and Paris "**Printed** Collector's Edition" variants: `requiresShipping: false`, `taxable: false`. Checkout would not ask for an address or charge shipping. | Set "physical product" + weight on printed variants. | **YES** | Claude Code (after OK) | S |
| D3 | Paris pricing | Paris EN printed €24.99 = EN digital €24.99; FR printed €24.99 < FR digital €26.99. | Check prices. | no | Veronka / Walter | S |
| **PRODUCTS** |
| PR1 | Comics Tarot | ACTIVE, template `tarot`. Description has "signed", "9-layer". SEO title + description **empty**. 2 images without alt. | New description (facts from ground truth), SEO, alt text; specs TBD from printer. | **YES** (content) | Claude Code drafts → Veronka OK | S |
| PR2 | Prague book | ACTIVE. 2 of 6 images without alt. | Alt text; printed-edition fix (D2). | no | Claude Code | S |
| PR3 | Stickers | ACTIVE. **Description empty**, 5/5 images without alt. | Main characteristics (§ 5(1)(a)) + alt text. | yes (if sold) | Claude Code drafts → Veronka OK | S |
| PR4 | T-shirt | DRAFT, one variant "White", **no sizes**, weight 0. | Sizes, size chart, material/care info, stock. | yes (if sold at launch) | Walter / Veronka | M |
| PR5 | Prague Tarot Cards | DRAFT, €17.90, not in the launch list. | Keep draft. | no | — | — |
| **NOTIFICATIONS** |
| N1 | Sender email | Store email (sender) = **info@walterin.com**; customer contact = support@. | Decide the sender (support@ recommended, to match the policies). | no | Veronka | S |
| N2 | Templates EN + SK | Not readable via API. | Veronka checks: order confirmation, shipping confirmation, digital download email, refund, SK versions, branding (logo, colour). | **YES** (with L10) | Veronka + Claude Code (SK texts) | M |
| N3 | Email authentication | Unknown. | SPF/DKIM for walterin.com in Shopify (Settings → Notifications → Sender email). | no (deliverability) | Veronka | S |
| **INVOICES** |
| I1 | Invoices | Shopify issues no Slovak invoices. No invoicing app. | Accountant: what document each order needs; then an app or accounting integration. | **YES** | Accountant → Veronka | M |
| I2 | eKasa | Card-only online payments. | Confirm eKasa isn't needed without cash on delivery; keep COD (dobierka) off. | confirm | Accountant | S |
| **MARKETS & LANGUAGES** |
| M1 | Languages | EN published; SK, DE, CS unpublished. No market web presences. | Publish SK with the new design (§ 5(4) zákon 22/2004: ordering information must be available in Slovak). | **YES** (for SK buyers) | Veronka + Claude Code | M |
| **ACCOUNTS / CONSENT** |
| A1 | Customer accounts | Optional. | Fine. | no | — | — |
| A2 | Abandoned checkout emails | Setting not readable. | Recommend "only customers subscribed to marketing" (or lawyer confirms legitimate interest). | no | Veronka / lawyer | S |
| A3 | Cookie banner | On in all regions; Meta blocked until consent (tested); "Cookie preferences" link in the live and draft footer (auto-added by Shopify). | Nothing (see L1). | no | — | — |
| A4 | Notify-me | Live form fixed 22 Sep (no pre-tick). **0 waitlist signups.** Draft form fix approved. | Build the draft form (theme-fixes #1). | yes (launch email) | Claude Code | M |
| **THEME BACKLOG** (`docs/tasks/theme-fixes.md`) |
| TH1 | Notify form + launch email | Approved. | Build in draft. | yes | Claude Code | M |
| TH2 | Judge.me / REZ / Appikon leftovers | Judge.me embed still on. | Remove in draft. | no | Claude Code | S |
| TH3 | Blog noindex | Approved. | Build in draft. | no | Claude Code | S |
| TH4 | Trust row "PayPal", footer icons, "VAT included", FAQ "150" | In the draft. | Fix in draft. | **YES** (with L13/T1) | Claude Code | S |

## Questions for the accountant
1. **VAT status:** is Walterin s. r. o. a VAT payer (IČ DPH), or will it be before launch? This decides whether any price may say "VAT included".
2. **eBooks to EU consumers:** electronically supplied services are taxed in the customer's country. Does the €10,000 EU threshold apply to us, and do we need **OSS** registration from the first sale or only above the threshold?
3. **Distance sales of goods** (deck, printed book, stickers, T-shirt) to other EU countries: same €10,000 threshold, and OSS?
4. **VAT rates** if a payer: printed books and eBooks (reduced rate?), tarot deck, stickers, T-shirt. Right now books are marked non-taxable in Shopify.
5. **Invoices:** what document must each online sale produce (for a payer / non-payer)? Which tool (SuperFaktúra, iKros, Shopify app) fits your accounting?
6. **eKasa:** confirm no eKasa obligation for card-only online payments without cash on delivery.
7. **Packaging EPR:** our obligations in Slovakia (zákon 79/2015) and when shipping to Germany (LUCID) and other EU countries.
8. **UK later:** £135 rule (UK VAT at point of sale), EORI, duties.
9. **Pre-orders:** if we take payment before the deck exists, when is the taxable event?
10. **EAA exemption:** confirm we are a microenterprise.

## Ordered to-do list (what to do first)

**Now (this week, no dependencies)**
1. Unpublish the old `/pages/privacy-policy` and `/pages/terms-and-conditions` (L2). Claude Code, after your OK.
2. Remove false claims (L13): tarot product description in admin (Claude Code, after OK); live theme texts "signed & numbered", "13th of July 2026", "150", "9-layer" (Veronka decides: edit live now, or hide until the draft goes live); Prague page "Revolut / bank transfers".
3. Contact information policy with IČO, register entry and SOI, and support@ (L7). Claude Code, after OK.
4. Send the accountant the 10 questions above.
5. Veronka checks Settings → Payments (P1, P2), Notifications (N1–N3), Digital Products app (D1).

**Legal drafts (Claude Code → lawyer)**
6. Task 3: VOP, refund/withdrawal policy, withdrawal instructions + form, harmonised guarantee notice (L3–L5, L11).
7. Task 4: shipping policy with placeholders (L6).
8. Task 2: § 20a function plan (L8) + eBook consent mechanism (L9) + order confirmation template (L10).

**Store setup (after the Pack4you contract and the accountant's answers)**
9. Markets: EU market, countries, languages (S1, M1).
10. Pack4you: location, connection, SKUs, weights, stock 100/100, overselling off (S2–S6).
11. Product fixes: printed variants physical (D2), digital variants untracked (D1), descriptions, SEO, alt, GPSR info (PR1–PR4, L14).
12. Taxes set per the accountant (T1, T2); invoicing app (I1).

**Draft theme (then publish)**
13. Theme backlog TH1–TH4 + § 20a function + eBook consent in cart + GPSR block + SK translation.
14. Test orders: physical, eBook, mixed, SK + EN, then a withdrawal through the function (C1).
15. Lawyer sign-off on all legal texts, then publish them. Launch.
