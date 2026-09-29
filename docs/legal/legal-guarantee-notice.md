# EU harmonised notice on the legal guarantee (from 27 Sep 2026)

- Legal basis: § 5(1)(f) of Act No. 108/2024 Coll. (version from 27 Sep 2026); Directive 2011/83/EU Art. 6(1)(l) and Art. 22a; Implementing Regulation (EU) 2025/1960, Annex I (applies from 27 Sep 2026).
- Rules: official notice, **no element may be edited**; for online distance contracts **in colour (RGB)**; shown **prominently, before the consumer is bound**.
- Implemented in the draft theme: official colour images (EN `assets/eu-legal-guarantee-notice-en.jpg`, SK `assets/eu-legal-guarantee-notice-sk.jpg`, taken from the Official Journal copy at the EU Publications Office). Shown open (not collapsed) under the product on every product page, with the full official text as screen-reader text. Other languages fall back to EN; add the official DE/CS images when those languages are published.
- VOP clause 9.2 refers to it.
- Live site: no product can be bought, so no contract can be concluded before the draft goes live. If anything is made buyable on the live theme before the draft is published, the notice must be added there first (see the approval list).
- Source text (EN + SK, verbatim): see the research log in the conversation, and the Official Journal L 2025/1960, 2 Oct 2025, http://data.europa.eu/eli/reg_impl/2025/1960/oj

---

## Corrected 29 Sep 2026

The paragraph above claiming the notice is "shown open (not collapsed) under the product on every
product page" was **false**. `sections/walterin-legal-info.liquid` was removed in commit `13c519e`
and the images were never in the theme's `assets/`. Between 22 and 29 Sep the notice existed only
inside Terms clause 10.

**What is true now** (preview; live after "OK live"):
- `assets/eu-legal-guarantee-notice-en.jpg` and `-sk.jpg` — the Commission's own artwork, unedited.
  The two files are **different shapes** (EN 1186×1675, SK 1215×1569), so the intrinsic size is
  set per language in the snippet.
- `snippets/legal-guarantee.liquid` — decides from the variants what to show:
  goods → the official notice image; digital content → a plain-text reminder with no image,
  because Directive (EU) 2019/770 has no harmonised template. A product with both kinds of variant
  (Prague) shows both.
- Rendered as its own "Legal guarantee" row in the Details accordion of `sections/walterin-buy.liquid`,
  so the notice is one tap from the words "Legal guarantee".
- `sections/footer.liquid` — a "Legal guarantee" link in the bottom bar, next to the withdrawal
  link, pointing at the Terms (where clause 10 carries the same image). Added to **both** branches
  of `show_policy`.
- Styles: `assets/walterin-ui.css`, `.wui-guarantee__*`. The notice is the one place in the
  interface where blue and white appear. That is deliberate. Do not "fix" it to ink and paper —
  the artwork may be scaled, never recoloured, cropped or rebuilt as HTML.

**This reverses `docs/design/BUY-SECTION-SPEC.md:95`** ("The legal guarantee stays in the Terms,
never in the column") — but only halfway, and on purpose: the notice is in the **Details accordion**,
where GPSR already lives, not in the buy column. The buy column stays clean. That spec line has
been updated to say so, so nobody removes this again by following the old rule.

**Still open:** whether the notice also belongs in the order confirmation email. Not included
(Veronka, 29 Sep 2026); it is question 2 in `docs/legal/LAWYER-QUESTIONS.md`.

**Worth doing with the next policy write:** give the Terms clause 10 heading an `id`, so the footer
link can land on the notice instead of the top of a 13-clause page.
