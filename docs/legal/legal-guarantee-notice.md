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

---

## Moved out of the accordions, 30 Sep 2026

Rendered as its own "Legal guarantee" row in the Details accordion between 29 and 30 Sep. Veronka
removed it: it sat among the accordions that say what the book *is*, and a consumer-law notice does
not belong between the interesting things.

**Where it lives now:** a small text link at the bottom of the buy column, beside the payment icons,
opening the official notice in a dialog (`sections/walterin-buy.liquid`, `.wui-buy__legal-link` +
`.wui-dialog`). Without JavaScript the link goes to Terms clause 10, which carries the same official
image. Physical products only, unchanged logic. The plain-text reminder for digital content is
inside the same dialog, from `snippets/legal-guarantee.liquid`.

Requirement is unchanged — one interaction from the words "Legal guarantee" — and a link that opens
the notice meets it. **Do not put it back in the accordion.**

---

## Decided 7 October 2026 — one place in the shop, and it is the footer

**This supersedes every placement note above, including the 30 September line that said "Do not put
it back in the accordion."** That line and the code had drifted apart — the notice was in a Details
accordion on the live product pages while this file said it was a link and a dialog. Both are now
moot.

**Veronka's decision, after reading `legal-guarantee-placement-research.md`:**

| Where | What |
|---|---|
| Product pages | **Removed completely.** Not in the buy column, not in an accordion, not in a dialog |
| Header, Shop page, cart, checkout | **Nowhere.** Never was, stays that way |
| Order confirmation email | **Not included** |
| Footer, OFFICIAL column | **"Legal guarantee" / "Zákonná záruka"** — a normal link beside Privacy, Terms, FAQ and Contact. Not a separate column, not highlighted. **Opens the official notice in colour on the first click** |
| Terms clause 10 | **Kept**, carrying the same official image |

### Why this is defensible, and where the risk sits

The research recommended keeping a trigger on the product page, and Veronka decided otherwise. The
decision is hers and the reasoning is recorded on both sides. What matters is that **her version is
materially stronger than the "footer link to the Terms" the research argued against**: the notice
itself opens, in colour, on the first click, from every page in the shop. That is close to the
pattern the Commission's practical guidelines are reported to accept — a line that reveals the full
notice on the first click — differing in *which* page carries the line, not in what the consumer
gets.

**The open risk, stated plainly so it is not lost:** § 5(1)(f) of Act 108/2024 requires the notice
`zreteľným spôsobom` — conspicuously — before the consumer sends the order. A footer link is
reachable from everywhere and is in time, but "conspicuous" is a judgement, and a footer is not
where a regulator looks first. This is question 2 in `LAWYER-QUESTIONS.md` and should be asked.

### How it is built

| File | Role |
|---|---|
| `snippets/wui-legal-guarantee-dialog.liquid` | the link and the `<dialog>` holding the notice |
| `snippets/wui-cookie-preferences.liquid` | unrelated, but added in the same footer pass |
| `sections/footer.liquid` | renders it when a column block has `show_legal_guarantee` |
| `sections/footer-group.json` | that checkbox is on, on the **OFFICIAL** column |
| `assets/walterin-ui.css` | `.wui-lg-dialog*` |
| `snippets/legal-guarantee.liquid` | **deleted** — nothing rendered it any more |

**Without JavaScript the link still works.** Its `href` is Terms clause 10, which carries the same
official image; the dialog is an enhancement on top. A legal disclosure must not depend on a script,
so this is not a detail to optimise away later.

**The artwork may not be edited** — not recoloured to the brand palette, not cropped, not rebuilt as
HTML. The EN and SK files are different shapes (1186×1675 and 1215×1569), so the intrinsic size is
set per language or the dialog jumps while the image loads.

### Also moved in the same pass

The small bottom row of the footer is gone. It carried the copyright, a duplicate of the policy
links, and **the § 20a withdrawal link**. The duplicates were dropped; the withdrawal link was
**not** — it is a legal requirement that it be reachable with no login, so it moved into the
OFFICIAL column beside the legal guarantee. Deleting the row without moving it would have been a
silent legal regression.
