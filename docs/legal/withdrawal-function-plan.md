# § 20a online withdrawal function: plan

## What the law requires
Source: § 20a of Act No. 108/2024 Coll. (in force 19 June 2026, § 53b: for online contracts concluded after 18 June 2026); Art. 11a of Directive 2011/83/EU (added by Directive (EU) 2023/2673).
1. Label **"odstúpiť od zmluvy tu"** (EN "withdraw from contract here") or an unambiguous equivalent, easily legible, **prominently displayed**, **continuously available** for the whole withdrawal period, easily accessible.
2. The consumer gives or confirms: (a) name, (b) details identifying the contract, (c) email (or other electronic means) for the confirmation.
3. A confirmation step with the button **"potvrdiť odstúpenie od zmluvy"** (EN "confirm withdrawal") or equivalent.
4. The trader sends an **acknowledgement of receipt on a durable medium** (email) **without undue delay**, with **the content of the withdrawal and the date and time of its submission**.
5. The deadline is met if the withdrawal is sent through the function by the last day.
6. Other ways (email, post, model form) stay available. The withdrawal instructions (Annex 3, text 3a) must say where the function is.

## What is built (draft theme 188994257225)
- Footer link "Odstúpiť od zmluvy tu" / "Withdraw from contract here" on every page, independent of the policy-list setting → `/pages/withdrawal`.
- Page template `page.withdrawal` + section `walterin-withdrawal`: form with name, email, order number (required), order date and items (optional), button "Potvrdiť odstúpenie od zmluvy" / "Confirm withdrawal", no login (Shopify contact form).
- Submission goes to the store's contact email (support@) with a timestamp and the statement text.
- On-screen confirmation with content, date and time, and a "Print or save" button.
- **Missing: the confirmation email to the customer.** Shopify can't send it without an app: the contact form has no auto-reply, Flow can only email staff, and Messaging only emails marketing subscribers. The on-screen confirmation is not a durable medium.

## Two ways to finish

### Option A (recommended): app "Revoq – EU Withdrawal Button" (BuschBytes, Köln, DE)
https://apps.shopify.com/eu-withdrawal-form · Free plan; Essential $9/mo; Pro $25/mo (audit logs, PDF evidence). All 24 EU languages incl. Slovak, EU hosting.
- Two-step form without login, matches the order, checks the deadline, **sends the confirmation email automatically**, dashboard.
- Setup: install, then point our footer link to the app's form (or embed the app's block in our `page.withdrawal`), test in EN and SK, then add the app to the privacy policy as a processor.
- Pros: complete and compliant out of the box, with logging (useful as evidence), and a German developer who knows § 356a BGB.
- Cons: a third-party processor, possibly a monthly fee [TO CONFIRM – free-plan limits], and less design control.
- Alternative with the same scope: "EU Withdrawal Form & Button" by Appsentials (Dresden, DE), $0 / $4.99 / $14.99, includes Slovak.

### Option B: native Shopify returns / withdrawal ("return and cancellation rules")
https://help.shopify.com/en/manual/compliance/legal/eu-right-of-withdrawal
- Footer link to the customer account orders page; guests log in with email + a one-time code.
- Pros: no app, no new processor, no cost.
- Cons: needs a verification-code login (not "without login", as the brief requires), and it's less clearly a "withdrawal function" under § 20a. [TO CONFIRM – lawyer]

**Not recommended: our form + manual confirmation emails from support@.** It works technically, but "without undue delay" then depends on someone watching the inbox, including weekends.

## Decision needed
Veronka: Option A (Revoq, free plan to start) → install before the draft is published. Then Claude Code wires the footer link to the app, tests it, and updates the privacy policy (approval list item).

## Before launch, test
Withdrawal via the footer link on mobile and desktop, EN and SK. The customer receives the email with content + date/time. Support receives it. Also test withdrawal after the deadline, and an order with an eBook.
