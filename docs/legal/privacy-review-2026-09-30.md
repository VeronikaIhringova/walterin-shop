# Privacy policy review — GDPR and Act 18/2018

Review only, 30 Sep 2026. **Nothing changed.** Against the live policy
(`docs/backup/policies-2026-09-29/privacy_policy.en.html`, last updated 22 Sep 2026).

---

## Verdict first

This is a genuinely good policy — better than most small EU shops have. It already does things that
are usually missing: a per-purpose table of data, purpose, legal basis and retention; named
processors; Meta **joint controllership** under Art. 26 with a link to the Controller Addendum;
Shopify Network Intelligence described correctly as an *independent controller*; the Slovak
supervisory authority with its address; a "no automated decision-making" statement; and an explicit
"we have not appointed a DPO".

So the list below is improvement, not rescue. Two items are worth doing properly; the rest are
tightening.

---

## Worth doing properly

### 1. Retention periods — four are circular

Art. 13(2)(a) allows either a period or the criteria for determining it. Criteria are fine; these
four are not criteria, they restate the question:

| Where | Says | Problem |
|---|---|---|
| 2.1 Website | "for as long as needed for the purpose" | circular |
| 2.3 Newsletter | consent evidence kept "for as long as we may need to prove it" | circular |
| 2.4 Orders | "until the limitation periods for claims arising from it expire" | a criterion, but unnamed — say which |
| 2.6 Complaints | "for as long as consumer protection law requires" | same |

Suggested concrete periods, for the lawyer to confirm:
- server/access logs: **12 months**;
- consent evidence (newsletter, cookies): **until withdrawal + 4 years**, tied to the limitation
  period for claims;
- orders: **contract + 3 years** (general limitation, § 101 Občiansky zákonník), with accounting
  documents **10 years** as already stated;
- withdrawals and complaints: name the statutory record-keeping period rather than gesturing at it.

### 2. A separate cookie page

Section 4 describes cookies by *category* but names no individual cookie — no names, no purposes,
no durations, no distinction between first- and third-party. That is the part supervisory
authorities actually look at, and it is the one substantive gap.

Recommendation: a **Cookie policy** page listing each cookie with name, provider, purpose, type and
duration, grouped by category, plus a "Manage cookie preferences" button that reopens the banner.
Privacy §4 then shortens to a summary and links to it.

Two things that make this easy: the footer **already renders a working "Cookie preferences" link**
(`#shopifyReshowConsentBanner`, added by Shopify — verified live on 29 Sep), so the promise in §4 is
already kept; and Shopify publishes its own cookie list at
<https://www.shopify.com/legal/cookies>, which is most of the content.

Note this page has the same templating constraint as the other policies if it goes under
`/policies/`. As an ordinary page under `/pages/cookies` it can use the design system and the
sidebar ToC directly — see `docs/design/POLICY-PAGE-TOC.md`. A cookie policy is not one of
Shopify's five policy slots anyway, so a page is the natural home.

---

## Tightening

3. **Newsletter withdrawal** (§2.3) names only the unsubscribe link. Add that consent can also be
   withdrawn by writing to support@walterin.com, and state that withdrawal does not affect earlier
   sending. Worth also recording **how** consent is captured — the notify-me form's newsletter box
   is unticked by default and tagged only when ticked, which is good practice and good evidence.
   If double opt-in is ever added, say so; it is the cleanest proof under § 116 of Act 452/2021.

4. **Right to object to direct marketing** (Art. 21(2)) is not named in §6. Marketing here is
   consent-based so the practical effect is small, but the right is absolute and cheap to list.

5. **"Our store's customer data is stored in the European Union"** (§5) is a strong factual claim.
   Shopify hosts across regions and the same section then says Shopify may process in Canada, the
   USA and Singapore. Either substantiate it or soften it to describe where the *primary* data
   store sits. Flagged for the lawyer.

6. **EU–U.S. Data Privacy Framework** (§5) is relied on for US transfers. It survived its first
   annulment challenge, but it has been challenged before and its predecessors fell. Add a line
   that if the adequacy decision ceases to apply, transfers continue on standard contractual
   clauses — so the policy doesn't need rewriting the day something changes.

7. **Fulfilment partner unnamed** (§3). Correctly written in the future tense and honest while
   Pack4you is unsigned. It must be named before any physical product is buyable — it is already on
   the launch list; noting it so it isn't lost.

8. **Act 18/2018 is never cited.** The policy cites GDPR and Act 452/2021 but not the Slovak data
   protection act. Mostly cosmetic — 18/2018 largely mirrors GDPR for this kind of processing — but
   a Slovak reader expects to see it, and §8's under-16 age limit comes from it.

9. **New processors on the way.** If a digital-download app is adopted
   (`docs/legal/digital-download-app-research.md`), it becomes a processor holding customer email
   addresses and order references, and Fileflare transfers to the US under SCCs. Section 3 and
   section 5 must be updated **before** it goes live, not after.

10. **Abandoned-checkout emails** are deliberately not mentioned because the setting is off. Worth
    confirming it is still off, since the policy's silence is only true while it is.

11. **A broken sentence in the Slovak §2.4**, found in the 29 Sep audit and still live:
    "…údaje o doručení a sledovaní zásielky komunikácia k objednávke…" — a missing conjunction
    after "zásielky". Small, but it is the binding language version.

---

## What I checked and found nothing wrong with

Controller identification; the DPO statement; legal bases across all nine purposes; the Meta joint
controllership construction; the Shopify Network Intelligence description; the data-subject rights
list and the one-month response time; the right to complain, including the correct Slovak authority
(Úrad na ochranu osobných údajov SR, Hraničná 12, 820 07 Bratislava 27) and the UK ICO for UK
residents; the under-16 statement, which matches the Slovak age limit rather than defaulting to 13;
"we do not sell your personal data"; the language-version clause. No dark patterns, no
consent-by-default, no pre-ticked boxes.

Cookie consent was tested on 29 Sep: Meta is blocked until consent is given.

---

## Suggested order

1. Cookie page with the real cookie table (item 2) — the only substantive gap.
2. Concrete retention periods (item 1) — needs the lawyer's numbers.
3. Items 3, 4, 6, 8, 11 together in one edit — small, safe, all in the same file.
4. Items 7 and 9 are gated on events (Pack4you signing, an app being installed), not on this review.

Everything above is a recommendation. Nothing is written until the lawyer has seen it and you say
"OK live". Uncertain points are in `docs/legal/LAWYER-QUESTIONS.md`.
