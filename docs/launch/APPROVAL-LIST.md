# Approval list: all LIVE writes (final setup, 22 Sep 2026)

**Nothing here has been written.** Answer "OK all" or item numbers. For every item: a backup exists, Claude Code writes once (no retry), reads back through the Admin API and pastes the output, then checks the public page. On any failure: stop and report.

Backups: live theme text files `docs/backup/live-theme-164726866249-pre-golive-2026-09-22/` (+ GitHub) · policies, markets, tarot SK title `docs/backup/final-setup/policies-markets-tarot-sk-2026-09-22.json` · products `docs/backup/final-setup/products-2026-09-22.json`.

**Order matters:** 0 → 1 → 2 → 3–5 → 6 → 7–11 → 12 → 13.

---

## 0. Prerequisite (you click, I verify): switch off "Include tax in prices"
- **Where:** Settings → Taxes and duties → (Slovakia and, after item 12, European Union) → "Include sales tax in product price and shipping rate" → **off**. [TO CONFIRM – the exact label in your admin]
- **Why:** you're not a VAT payer. The new theme shows "Tax included" only when this setting is on, so VAT can be switched on later without theme changes. Today `taxesIncluded = true`, which would show "Tax included" after item 1.
- **Check:** I read `shop.taxesIncluded` = false before item 1. **If it's still true, I don't push the theme.**

## 1. Theme push to LIVE 164726866249 (26 files, `--only` each, `--nodelete`)
Just before the push: pull live again and merge any editor changes (workflow rule). The full check found none today.
Files: `docs/launch/approval/theme-push-files.txt`.

| Area | Old (live now) | New |
|---|---|---|
| Tarot page | old Dawn product page | new buy section (edition tiles, notify form, Details accordion incl. **product safety** row, FAQ) |
| Notify form | email + unticked newsletter box (fixed today) | "One email when it's ready. That's all." + optional box "And the newsletter: what's new, what's next." (SK texts included); the `newsletter` tag only when ticked |
| Footer | policy links + Cookie preferences | the same + **"Withdraw from contract here" / "Odstúpiť od zmluvy tu"** (always visible) |
| Footer payment icons | Visa, Mastercard, Apple Pay, Google Pay, **Revolut, PayPal** | Visa, Mastercard, Amex, JCB, Discover, Diners, Apple Pay, Google Pay |
| Product-page payment badges | Shopify's list (includes **PayPal**) | the same fixed list as the footer |
| Cart | – | **eBook consent** box (required) when an eBook is in the cart; express buttons hidden in that case |
| Book, sticker and T-shirt pages | – | "Product safety" accordion under Details (physical products only), no express checkout on products with an eBook variant |
| Tax wording | "Tax included" strings | shown only if "Include tax in prices" is on (item 0 → nothing shown) |
| FAQ page, stickers, T-shirt | "Revolut, and PayPal" | "We accept Visa, Mastercard, Apple Pay and Google Pay." |
| Tarot FAQ | "Comics Tarot of consciousness" | "the Tarot of Consciousness" |
| settings_data | Judge.me embed **on**, REZ/Appikon, REZ CSS | removed |
| Blogs | indexable | `noindex` on blog/article pages |
| Slovak theme texts | older translations | corrected sk.json (commit 4d3b3dd) + new strings |
| Header | – | language switcher (commit 7c89c20) |
| New files | – | `walterin-withdrawal` section + `page.withdrawal` template, `cart-ebook-consent`, `gpsr-row`, `wui-*` snippets, `walterin-ui.css`, `walterin-buy.js` |
| Policy pages | long URLs overflow on phones | wrap |

**Check:** read back every file (checksum = repo); public pages tarot, Prague, stickers, cart, footer, policies at 1280/390.
**Rollback:** push the files from `docs/backup/live-theme-164726866249-pre-golive-2026-09-22/`.

## 2. Upload the EU legal-guarantee notice images to Shopify Files
- **New:** `docs/legal/assets/eu-legal-guarantee-notice-en.jpg` and `-sk.jpg` (the official colour images, Impl. Reg. (EU) 2025/1960). Their Files URLs go into the Terms (item 3).
- Scope `write_files`.

## 3. Terms of service, EN + SK translation (same layout as the Privacy policy: numbered h2, h3 in articles 8–9; side-by-side check `docs/launch/screenshots/side-by-side-*.png`)
- **Old:** US template with "[LINK]" (22,845 chars, backup `docs/backup/policies/terms_of_service-2026-09-22.html`).
- **New:** `docs/legal/publish/terms.en.md` / `terms.sk.md`, 13 articles:
  - seller + SOI; consumers;
  - final prices, no VAT wording;
  - ordering and conclusion; eBook consent in the cart;
  - payments: cards, Apple Pay, Google Pay via Stripe, **no PayPal**;
  - delivery shown at checkout, max 30 days;
  - eBook delivery;
  - 14-day withdrawal incl. **online function** (`/pages/withdrawal`) and the eBook exception;
  - claims (24 months; we pay for claims and for damaged or wrong items);
  - **art. 10 Legal guarantee with the official notice image**;
  - ADR/SOI; privacy link; Slovak law + Rome I; SK prevails.
- `[DÁTUM ZVEREJNENIA]` becomes the publish date.

## 4. Refund policy, EN + SK (same layout: sections 1–6 with h3 subsections; withdrawal instructions = section 4, model form = section 5)
- **Old:** clothing template (30 days, "tags", `[INSERT RETURN ADDRESS]`).
- **New:** `docs/legal/publish/refund.en.md` / `.sk.md`: withdrawal (online link, email, post), return address Walterin s. r. o., Ľubochnianska 4, 831 04 Bratislava, return shipping paid by the customer, refund incl. standard delivery within 14 days, the eBook rule, claims, damaged or wrong item at our cost, ADR. The **full statutory withdrawal instructions (incl. text 3a) and the model form** are appended.

## 5. Privacy policy, EN + SK
Fixes found in the review:
- **(a)** Pack4you was named as a current processor. It's now described as "our fulfilment partner… once physical products are on sale", to be named before then.
- **(b)** Orders now also cover the eBook consent declaration.
- **(c)** Customer service now covers the online withdrawal form.
- **(d)** Section 4 now mentions the "Cookie preferences" footer link.
- **(e)** The date is updated.

- **(f)** New section 2.5 "Customer account": data (email, name, addresses, phone if added, order history); legal basis Art. 6(1)(b); kept until the customer deletes the account or asks us to, then only what accounting and claims require. The later sections are renumbered 2.6–2.9, with cross-references updated.
- Abandoned-checkout emails are **not** mentioned (they stay off).

Files: `docs/legal/publish/privacy.en.md` / `.sk.md`.

## 5b. Contact information, EN + SK (new layout)
Same content as today, now in the same structure as the other policies: "Last updated", then 1. Company, 2. Contact, 3. Supervisory authority. Files: `docs/legal/publish/contact.en.md` / `.sk.md`.

## 6. Create page "Odstúpenie od zmluvy" (published, template `withdrawal`), right after item 1
- Handle `withdrawal`, title EN "Withdraw from contract" (SK translation "Odstúpenie od zmluvy"), empty body, **published**, so the footer link works.
- The form sends to support@ and shows an on-screen confirmation with date and time. **No automatic customer email yet** (needs an app, Revoq undecided). Until then, **reply to every submission by email the same day** (your to-do), because the Terms promise an email confirmation without undue delay.

## 7. Metafield definition `custom.safety_info` (product, multi-line text)
Empty until Walter or the printer give the data. It feeds the "Product safety" row.

## 8. Remove crossed-out prices
- **Prague** (4 variants): compare-at €35.00 → **none** (removes "SAVE 45%" and "You save €16,01").
- **Paris** (4 variants, draft product): compare-at €35.00 → none. Recommended, so the same problem doesn't return when Paris goes live.

## 9. Tarot: new name
- Title "Comics Tarot of Consciousness" → **"Tarot of Consciousness: A Graphic Journey"**; the SK translation of the title "Comics Tarot of Consciousness" → **"Komiksový tarot vedomia"**. Handle stays `tarot`.
- Optional 9b (from the product file): SEO title EN "Tarot of Consciousness: A Graphic Journey · 78-card illustrated tarot | Walterin", SK "Komiksový tarot vedomia · 78 ilustrovaných kariet | Walterin".

## 10. Printed editions = physical (old item 9a)
Prague EN/CZ and Paris EN/FR "Printed Collector's Edition": `requiresShipping false → true`. The variants stay out of stock (not buyable). Effect: the Product safety row appears on the Prague page, and the eBook consent box shows only for real eBooks.

## 11. Paris: English + Slovak only
- The French variants are already unavailable (tracked, 0 in stock, "stop selling"). **No write needed**; they stay like that. No German variant exists.
- **A Slovak variant doesn't exist.** Creating it needs the SK file and a price (TBD), so it's not done now (your to-do).

## 12. Market "European Union" (eBooks buyable in the EU)
- **New:** market "European Union", 26 countries (all EU except SK, which stays in "Slovakia"), EUR, same prices, active. Details and effects: `docs/launch/EBOOK-LAUNCH.md`.
- Scope `write_markets`. Rollback: set it to draft.

## 13. LAST STEP: inventory tracking off on the eBook variants that have a file
- Prague EN Digital (`51921130357065`) and Prague CZ Digital (`51921130324297`): tracked → **not tracked**, which makes them buyable.
- **Only after you confirm the files are attached in Digital Products.** A variant without a file stays tracked at 0.

---

## Not in this list
- Order confirmation and download email texts: Shopify doesn't allow writing them via API, so you paste them (`docs/legal/emails/`).
- Old product "Walterin Prague Tarot Cards" (`prague-tarot`): **DRAFT**, €17.90, not published, no orders, "continue selling when out of stock" set, inventory 0. Nothing changed. If it's ever activated, overselling must be switched off first.
- Shipping policy and Pack4you: on hold.
- The old draft theme 188994257225: you delete it after item 1 is live.
