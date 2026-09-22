# Final approval list: writes to the LIVE store

Prepared 22 Sep 2026. **Nothing here has been written.** Answer "OK all" or item numbers.

For every item: a backup already exists (path given). Claude Code requests only the scopes that item needs, writes it once (no retry), reads it back through the Admin API and pastes the output, then checks the public URL.

## My recommendation: replace the Terms and the Refund policy now (items 1–2), and get the lawyer's review afterwards
- **Keeping them is the bigger risk.** The live texts are templates that contradict Slovak law. The Terms are a US template with a "[LINK]" placeholder, a US-style liability disclaimer and no seller identification. The Refund policy has conditions the law doesn't allow for the 14-day withdrawal ("unworn or unused, with tags", "receipt", excluded sale items), a 30-day promise, and `[INSERT RETURN ADDRESS]`.
- **The new texts are conservative:** the withdrawal parts are the statutory model wording (Annex 2/3 of 108/2024 and Annex I of Dir. 2011/83), and nothing promises more than the law requires.
- **They're adapted to what is live today:** no Shipping Policy link (delivery is shown at checkout), no § 20a online function, no product-page notice. Those come back in the full version when the draft theme is published (see "Later").
- **Nobody can buy yet,** so no customer relies on either text today. The lawyer can refine them before the first sale with no contracts affected.

---

## 1. Terms of service (EN) + Slovak translation
- **Old:** US template "OVERVIEW… SECTION 1–…" with "[LINK]" (22,845 chars). Backup: `docs/backup/policies/terms_of_service-2026-09-22.html`
- **New:** `docs/legal/publish/terms-now.en.html` (EN) and `terms-now.sk.html` (SK, the binding original), sections 1–12:
  - seller + SOI;
  - consumers only;
  - final prices, no VAT statement;
  - ordering steps; contract concluded on the confirmation email;
  - cards, Apple Pay, Google Pay via Stripe;
  - delivery shown at checkout, maximum 30 days;
  - eBook delivery and personal use;
  - 14-day withdrawal with the statutory wording, and the eBook exception (§ 19(1)(m));
  - claims (24 months, 30 days, we pay shipping for claims and for damaged or wrong items);
  - ADR/SOI, no ODR;
  - Slovak law + Rome I;
  - Slovak version prevails.
- `[DÁTUM ZVEREJNENIA]` is replaced with the publish date at write time.
- **Write:** `shopPolicyUpdate(TERMS_OF_SERVICE)` → `translationsRegister(sk)` · scopes `write_legal_policies`, `read/write_translations`
- **Check:** read-back identical; `/policies/terms-of-service` shows "Walterin s. r. o." and no "[LINK]".

## 2. Refund policy (EN) + Slovak translation
- **Old:** clothing template: 30 days, "tags", "unworn", `[INSERT RETURN ADDRESS]`, info@ (2,815 chars). Backup: `docs/backup/policies/refund_policy-2026-09-22.html`
- **New:** `docs/legal/publish/refund-now.en.html` / `.sk.html`: 14-day withdrawal (email or post), return address = company address, customer pays return shipping, full refund incl. standard delivery within 14 days, eBook rule, claims, damaged/wrong item at our cost, ADR. The **full statutory withdrawal instructions and model form** are appended.
- **Write:** `shopPolicyUpdate(REFUND_POLICY)` → SK translation · same scopes as item 1
- **Check:** read-back identical; `/policies/refund-policy` has no "30-day", "tags" or "[INSERT".

## 3. Privacy policy, section 4: mention the "Cookie preferences" link
- **Old:** "You can withdraw your consent at any time: delete the cookies… or write to support@walterin.com."
- **New:** "You can change or withdraw your consent at any time via the "Cookie preferences" link in the footer of every page, by deleting the cookies for walterin.com in your browser, or by writing to support@walterin.com." SK: "…cez odkaz na nastavenia cookies v pätičke každej stránky…"
- Files: `docs/legal/publish/privacy-v2.en.html` / `.sk.html`. Backup: `docs/backup/policies/privacy_policy-readback-after-publish-2026-09-22.json`
- **Write:** `shopPolicyUpdate(PRIVACY_POLICY)` → SK translation

## 4–6. Live theme 164726866249: false payment claim in three more templates
Same fix as the tarot and Prague templates on 22 Sep (one file per write, via `themeFilesUpsert`, with a check that each file is unchanged since backup).
```diff
- <p>We accept <strong>Visa, Mastercard, Apple Pay, Google Pay, Revolut, and PayPal.</strong> All payments are processed securely through trusted providers.</p>
+ <p>We accept Visa, Mastercard, Apple Pay and Google Pay. All payments are processed securely through trusted providers.</p>
```
- **4.** `templates/page.faq.json` (public /pages/faq)
- **5.** `templates/product.json` (default product template, e.g. stickers). Shopify will also drop the dead Judge.me blocks on save, as it did on 22 Sep.
- **6.** `templates/product.t-shirt.json` (T-shirt, currently a draft product)
- New files: `docs/launch/approval/live-*.json.new`; backups: `docs/backup/live-theme-164726866249-2026-09-22/templates/`

## 7. Create the (unpublished) page for the § 20a function
- **New:** Online Store page "Odstúpenie od zmluvy" / EN title "Withdraw from contract", handle `withdrawal`, template `page.withdrawal`, **unpublished** (`isPublished:false`).
- Why now: the draft theme's footer link goes to `/pages/withdrawal`. The page must exist before the draft is published, and it must be published together with the draft, once the confirmation email works (app, see `docs/legal/withdrawal-function-plan.md`).
- **Write:** `pageCreate` · scope `write_content`

## 8. Metafield definition for product safety (GPSR)
- **New:** product metafield definition `custom.safety_info`, "Safety information", type multi-line text. Empty until Walter or the printer provide the data (`docs/legal/product-safety-gpsr.md`).
- **Write:** `metafieldDefinitionCreate` · scope `write_products`

## 9. Product variants: physical vs digital (needed for checkout and the eBook consent)
You said "don't touch products other than the tarot description", so this is only for your decision:
- **9a.** Prague + Paris **"Printed Collector's Edition"** variants: `requiresShipping false → true`. Today checkout wouldn't ask for an address, and the eBook consent box would show for printed books.
- **9b.** Prague + Paris **"Digital Interactive Edition"** variants: inventory tracking **off**. Today they're "tracked, 0 in stock" and can't be sold.
- Backup: `docs/backup/products/` + `docs/launch/audit-data/products.json` · scope `write_products`, `write_inventory`

---

## Not in this list (and why)
- **The EU legal-guarantee notice on the live theme:** it's needed only before a consumer can buy, and nothing is buyable on live. The draft has it. **If anything becomes buyable on live before the draft is published, the notice must be added to live first.** Tell me and I'll prepare it.
- **Shipping policy:** Pack4you is on hold.
- **The Prague page's "€35,00 · SAVE 45%" crossed-out price:** it may break the 30-day lowest-price rule for price reductions. It's price data, which I'm not allowed to touch. **Your call:** remove the compare-at price or confirm that €35 was the lowest price in the 30 days before the reduction.
- **Order confirmation / digital download email texts:** Shopify doesn't allow writing them via API. You paste them (`docs/legal/emails/`).

## Later, when the draft theme is published (separate approval)
Full versions of the Terms and Refund policy (`docs/legal/vop.sk.md`, `terms.en.md`, `refund-policy.*`, with placeholders filled): add the "Odstúpiť od zmluvy tu" function line (Annex 3 text 3a), clause 9.2 on the legal-guarantee notice, the Shipping Policy link once it exists, the withdrawal app in the privacy policy, and publish the `withdrawal` page.
