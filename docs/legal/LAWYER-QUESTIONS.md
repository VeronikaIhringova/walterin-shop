# Questions for the lawyer

Send with the whole `docs/legal/` folder. Updated 29 Sep 2026.

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
