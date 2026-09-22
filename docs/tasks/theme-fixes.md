# Theme fixes (backlog)

Found during the legal / privacy work, 22 Sep 2026. Draft theme = "Walterin Draft (Claude)" 188994257225 unless noted.

## 1. Notify-me form and the launch email (draft) · APPROVED 22 Sep 2026, build in the draft theme task

**Goal:** every notify-me signup gets the launch email through Shopify Email. Only people who tick the newsletter box get the `newsletter` tag and newsletters.

**Constraint:** Shopify Email (Messaging) only sends to contacts whose email marketing status is *Subscribed*. A signup stored as "not subscribed" cannot receive the launch email from Shopify Email.

**Proposed approach (recommended):**
1. **The form asks for one clear consent.** Proposed copy: "Email me once when the deck is available." That consent covers the single launch email, and submitting the form gives it. The form also has a separate, **unticked** box: "Also send me the Walterin newsletter."
2. **Every signup is saved as Subscribed** (`contact[accepts_marketing]=true`, sent as a hidden field) and tagged `tarot-waitlist` + `tarot-waitlist-en|sk`. The subscribed status exists only so Shopify Email can deliver the launch email. The consent text says so.
3. **Newsletter tag only when the box is ticked.** On submit, the `newsletter` tag is added only if the box is checked. This is the same method now live on the live theme.
4. **Sending rules (process, written into this file and followed every time):**
   - Launch email → segment `customer_tags CONTAINS 'tarot-waitlist'`.
   - Newsletters → segment `customer_tags CONTAINS 'newsletter'` **only**. Never "All subscribers".
5. **Clean-up 3 months after the launch email.** Contacts that have `tarot-waitlist` but not `newsletter`, and no order, are unsubscribed from email marketing and deleted, as the privacy policy says. It can be done by hand or with a Shopify Flow scheduled workflow: tag check → remove marketing consent. Deleting a customer isn't available as a Flow action, so that step stays manual.
6. **The privacy line under the form** says exactly this: one email when the deck is available, no newsletter unless the box is ticked, and a link to the privacy policy.

**Why this is the cleanest:** no extra app or processor (everything stays in Shopify, as the privacy policy describes), consent is specific and not pre-ticked (GDPR Art. 4(11) and 7; CJEU Planet49), and newsletter consent is separate and optional.

**Risks and mitigations:**
- Someone later sends a campaign to "All subscribers" by mistake, so waitlist-only contacts get marketing they didn't ask for. **Mitigation:** the sending rule above, plus the clean-up in step 5. Optionally, create a saved segment "Newsletter" and use only that.
- Proof of consent: Shopify stores the consent date and opt-in level. For stronger proof, consider **confirmed opt-in** (double opt-in, in Settings → Customer privacy / Marketing). It's safer legally but costs some signups. Decide with the lawyer.

**Alternatives considered:** sending the launch email outside Shopify Email (a new processor and a policy change) or by manual BCC (error-prone, no unsubscribe handling). Both rejected.

**Files concerned:** `sections/walterin-buy.liquid` (the buy-section notify form: its hidden `accepts_marketing`, the tags, the privacy line, a new optional newsletter checkbox) and `snippets/coming-soon-notify.liquid` (old modal, same fix as live).

## 2. Draft `snippets/coming-soon-notify.liquid`
Same fix as on the live theme on 22 Sep 2026: newsletter box not pre-ticked, `newsletter` tag only when ticked. Superseded by item 1 if the old modal is removed.

## 3. Uninstalled app leftovers (live + draft)
- Judge.me embed still **on** in `config/settings_data.json`. Judge.me blocks in `templates/product.json`, `product.tarot.json`, `product.walterin-prague-book.json`. `assets/judgeme-walterin.css` loaded in `layout/theme.liquid`.
- REZ and Appikon embed entries (disabled) and REZ custom CSS in `config/settings_data.json`.
- Remove all of these in the draft. The live theme gets replaced when the draft is published.

## 4. Cookie settings link in the footer · CORRECTED 22 Sep 2026
A "Cookie preferences" link (`#shopifyReshowConsentBanner`) is already in the footer policy list on the live and draft themes; Shopify adds it automatically. No theme work needed. Only privacy policy section 4 should mention it (policy update, needs OK).

## 5. Trust row, footer icons and wrong claims (draft)
- Buy section trust row: "Apple Pay, Google Pay, cards, PayPal". PayPal isn't active yet, so remove it.
- Footer payment icons show **Revolut** and **PayPal** (from the enabled payment types, on live and draft). Veronka is checking Settings → Payments.
- Buy section: "€39 **VAT included**". Remove until the accountant confirms the VAT status (ground truth).
- FAQ on the tarot page: "The first run of **150** decks… Order now and your deck ships the moment it lands". Correct to 100 EN + 100 SK, and no shipping promise.

## 6. Blog pages: noindex (approved 22 Sep 2026, option c)
The 4 empty blogs (`/blogs/news`, `/blogs/vincenzo-peruggia`, `/blogs/aqua`, `/blogs/best-wishes-his-holiness-6-7-1935`) are public (200) and listed in `sitemap_blogs_1.xml`. All their articles are unpublished. In the draft theme, add `<meta name="robots" content="noindex">` in `layout/theme.liquid` when `template.name == 'blog' or template.name == 'article'`. Do not delete the blogs.

## Notes
- `web-pixel-shopify-custom-pixel` shows up in network requests, but Veronka checked Settings → Customer events and there are no custom pixels, only Facebook & Instagram. It's Shopify's pixel sandbox loader. It isn't configured in admin and isn't in the privacy policy.
- Conversions API (server-side) consent can't be tested from a browser. Check it in Meta Events Manager → Test events.
