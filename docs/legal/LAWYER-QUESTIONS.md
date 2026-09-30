# Questions for the lawyer

Send with the whole `docs/legal/` folder. Updated 30 Sep 2026.

Facts the answers should assume: Walterin s. r. o., Bratislava, **not a VAT payer**, sells to
consumers in Slovakia and the EU. Shopify **Basic** (no checkout customisation). Two kinds of
product: physical goods (tarot deck, printed books, stickers) and digital content (eBooks, PDF +
EPUB, no DRM). eBooks are on sale; physical goods are not buyable until the Pack4you fulfilment
contract is signed. Store languages EN + SK, both published; the Slovak version of the Terms is the
binding one.

---

## 1. The eBook withdrawal waiver

The cart shows an unticked, required checkbox before checkout whenever the cart holds a digital
item, and saves the declaration onto the order. The order confirmation email then repeats it back
(`docs/legal/emails/order-confirmation-legal-block.md`).

- Does this satisfy § 17(10) and § 19(1)(m) of 108/2024 on Shopify Basic, where a checkbox **inside
  checkout** is not technically possible?
- Is the declaration wording strong enough? EN and SK in `locales/en.default.json` →
  `walterin.ebook_consent.declaration` and `locales/sk.json`; it mirrors Terms 8.6.
- Express/wallet buttons (Apple Pay, Google Pay, Shop Pay) are hidden whenever the cart contains a
  digital item, because they skip the cart. Is hiding them the right answer, or is there a
  different expectation?

## 2. The harmonised EU legal guarantee notice

Implementing Regulation (EU) 2025/1960, applying from **27 September 2026**. We use the official
colour artwork, unmodified, EN and SK.

- It is currently only inside Terms clause 10. We plan to add it to product pages for physical
  products (inside the "Details" accordion, so it opens on one tap) and a footer link. **Is that
  enough to count as prominent and pre-contractual?**
- **Does it belong in the order confirmation email as well?** Some commentary says yes; we could
  not find it in the Regulation. Right now it is not there.
- The notice covers **goods**. For digital content there is a duty to remind the consumer of the
  legal guarantee under Directive (EU) 2019/770 but no harmonised template. We plan a plain-text
  line on eBook product pages matching Terms 9.1 (24 months). Is that the right treatment, and is
  the wording adequate?
- Are we right that the artwork may not be recoloured to the brand palette or rebuilt as HTML text?

## 3. The § 20a online withdrawal function

`/pages/withdrawal`, linked in the footer of every page, no login.

- The customer sees an on-screen confirmation with date and time, but **no automatic email**.
  The Terms 8.3, Refund 1.1 and 4.1 all promise an acknowledgement on a durable medium. Today
  support@ answers each submission by hand the same day.
- **Is the manual reply enough** while only eBooks are on sale, or must the automatic email exist
  before we take any order at all?
- Submissions currently arrive at the store email `info@walterin.com`, not `support@`. We intend to
  change the store email to support@. Any objection?

## 4. Digital content: mandatory information

Live Terms 7.1 and 7.2 say the eBook is a download link sent after payment, in PDF or EPUB.

- **There is no DRM or technical protection** (confirmed 29 Sep 2026). Terms will say so explicitly.
  Is a plain statement enough for § 5(1) of 108/2024 and §§ 852a ff. of the Civil Code?
- What else must we state about **functionality, compatibility and interoperability** for a PDF and
  an EPUB? Is "a device and an application that support these formats" sufficient?
- We will state the number of downloads and how long the link stays valid. Is there a minimum?
- § 852i on **updates** to digital content: does it apply to an eBook supplied as a single act, and
  if so what do we have to say?

## 5. Price indication

Draft Terms 3.4 (showing the lowest price of the previous 30 days before a discount) was dropped
before publication, and no discount has run since.

- We need it back before any discount or crossed-out price. Please confirm the wording and whether
  it must appear in the Terms, next to the price, or both.

## 6. Invoicing and the document the customer gets

Open with the accountant too (`docs/launch/accountant.md`).

- As a **non-VAT payer**, what document must each online order produce, and must the Terms say so?
- Is Shopify's order confirmation enough, or do we need an invoicing tool?
- Should "nie sme platiteľmi DPH" appear on the document, the Terms, or neither?

## 7. Delivery commitments made with no carrier

- Live Terms 6.2 promises delivery "no later than 30 days after the contract is concluded". It
  mirrors the statutory default, but we have no fulfilment contract. Safe to leave as is until
  Pack4you is signed?
- The store still has shipping zones covering non-EU countries (US, CA, AU, JP…) that we cannot
  fulfil, and Terms 3.3 mentions customs. Should those zones be removed now?

## 8. Two versions of the model withdrawal form

The EN form follows Annex I of Directive 2011/83 ("goods / digital content", delete as
appropriate); the SK form follows Annex 2 of 108/2024 ("dodaní alebo poskytnutí tohto produktu").
Both are lawful in their own language, but a bilingual buyer sees two different forms, and the EN
file calls itself a translation of the Slovak.

- Leave each in its own statutory form, or align them?

## 9. Terms acceptance at checkout

Shopify Basic has no terms checkbox in checkout; policy links appear in the checkout footer.

- Are the links enough, or do we need a terms checkbox in the cart, next to the eBook consent one?

## 10. Smaller points

- **"Tax ID (DIČ)"** in the English Terms and Contact policy. DIČ is an income-tax number, not a
  VAT number, and we are not a VAT payer. We are relabelling it "Income tax ID (DIČ)". Better
  wording?
- The **Privacy policy omits DIČ** while the Terms and Contact policy include it. Does it matter?
- **ADR**: we name the Slovak Trade Inspection only. The EU ODR platform closed on 20 July 2026. Is
  anything else required under § 11 of 391/2015?
- **Packaging EPR**: obligations in Slovakia (79/2015) and Germany (LUCID) before we ship anything
  physical.
- **Accessibility (EAA)**: we believe Walterin is an exempt microenterprise. Please confirm.

---

## 11. Privacy policy: retention periods

Full review in `docs/legal/privacy-review-2026-09-30.md`. Four retention statements are circular
("for as long as needed for the purpose", "as long as we may need to prove it"). We would like to
replace them with real periods. Please confirm or correct:

- server and access logs — **12 months**?
- evidence of newsletter and cookie consent — **withdrawal + 4 years**?
- orders — **contract + 3 years** (§ 101 Občiansky zákonník), accounting documents 10 years
  (§ 35 zákona 431/2002) — is 3 years right, or 4 for a commercial relationship?
- withdrawals and complaints — what record-keeping period does consumer protection law actually
  impose?

## 12. Cookie policy as a separate page

Our privacy policy describes cookies by category but names no individual cookie — no names,
purposes or durations. We plan a separate Cookie policy page with a full table plus a "Manage
cookie preferences" button.

- Is a category-level description sufficient under § 109 of Act 452/2021, or is the per-cookie
  table required?
- Shopify sets most of the cookies and publishes its own list. Is linking to Shopify's list enough,
  or must we reproduce it ourselves?

## 13. Two factual claims in the privacy policy

- § 5 says "Our store's customer data is stored in the European Union", while the same section says
  Shopify may process in Canada, the USA and Singapore. Can we substantiate the first sentence, or
  should it be softened?
- § 5 relies on the **EU–U.S. Data Privacy Framework** for US transfers. Should we add a fallback
  sentence that transfers continue on standard contractual clauses if the adequacy decision ceases
  to apply, so the policy survives a change without a rewrite?

## 14. A new processor for eBook delivery

We may replace Shopify's Digital Products app so customers can re-download from their account
(`docs/legal/digital-download-app-research.md`). The likely choice is US-based and transfers EU
personal data under standard contractual clauses; it would hold customer email addresses and order
references.

- Anything beyond adding it to privacy sections 3 and 5 before it goes live?
- Is a DPA with the app vendor plus SCCs sufficient, or would you want a transfer impact assessment
  for something this small?

## 15. eBook download limit and what the Terms may promise

The prepared Terms 7.1 says "Each file can be downloaded up to 8 times". Shopify's current app
counts **per variant**, so the PDF and EPUB share one counter and that sentence would be untrue
today (`docs/legal/prepared-terms-7-update.md`).

- If we keep the current app and set the limit to 16 shared, is "each file up to 8 times" an
  acceptable description, or must the Terms describe the shared counter exactly?
- Is any download limit at all a problem, given the consumer has bought the file outright and there
  is no DRM?
