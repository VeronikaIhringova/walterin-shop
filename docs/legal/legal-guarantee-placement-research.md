# Can the legal guarantee come off the product pages?

Research for plan item **A4 — "Legal guarantee off the product pages"**, 7 October 2026.
Question asked: *is a footer link alone enough, or must the notice stay where a buyer meets it?*

**Short answer: a footer link alone is not enough, and I would not do it.** The notice can be made
much quieter than it is — but the thing that triggers it has to stay on the product page.

> **What is verified and what is not.** The Slovak statutory text below was read verbatim from the
> consolidated Act at slov-lex.sk (version applying from 27 Sep 2026) and is quoted exactly.
> **EUR-Lex could not be reached from this machine** — every request to the Implementing Regulation
> returned an empty body — so the Regulation's own wording on placement is reported from secondary
> sources and is marked as such. Nothing here should be treated as advice; it is a reading of the
> text, for a lawyer to confirm. The lawyer question is added at the end.

---

## 1 · The provision that actually binds Walterin

Walterin is a Slovak trader, so the duty is the Slovak transposition, not the Directive directly:
**§ 5(1)(f) of Act No. 108/2024 Coll.**, in the version applying from 27 September 2026.

The opening of § 5(1) sets the deadline:

> „Obchodník je povinný **pred uzavretím zmluvy** […] alebo ak sa zmluva uzatvára na základe
> objednávky spotrebiteľa **pred tým, ako spotrebiteľ odošle objednávku** […] spotrebiteľovi
> **jasným a zrozumiteľným spôsobom** oznámiť […]"

and letter (f) sets what and how:

> „f) existenciu a hlavné informácie o zákonnej zodpovednosti obchodníka za vady **tovaru** vrátane
> dĺžky jej trvania, a to **zreteľným spôsobom** aspoň **v podobe a v rozsahu** podľa osobitného
> predpisu²²ᵃ⁾ upravujúceho harmonizované oznámenie,"

Footnote 22a names Implementing Regulation (EU) 2025/1960.

Three things follow, and they decide the whole question:

1. **The deadline is "before the order is sent", not "on the product page".** Nothing in the statute
   names the product page. So in principle the duty could be met anywhere in the path to the order
   button.
2. **But the manner is `zreteľným spôsobom`** — conspicuously, distinctly. That is a *stronger* word
   than the `jasne a zrozumiteľne` used for the other letters, and the legislator chose it only for
   this one and for (g). A small link in a footer, among a dozen other links, is where a court would
   be asked whether "conspicuous" was met. **That is the whole risk, and it is not a technicality.**
3. **`v podobe a v rozsahu`** — "in the form and to the extent" of the harmonised notice. The form is
   the Commission's artwork. A sentence of our own saying the same thing is not the form.

**Goods only.** Letter (f) says `tovaru`. Digital content sits in its own letter:

> „h) existenciu a dĺžku trvania zodpovednosti za vady **digitálneho obsahu alebo digitálnej
> služby**,"

— with **no** reference to the harmonised notice and no prescribed form. The theme already splits it
this way, and that split is correct.

## 2 · What does *not* have to happen — and this is the useful part

**§ 17(3)** lists what must be repeated **immediately before the order button**:

> „(3) Obchodník je povinný […] **bezprostredne pred odoslaním objednávky** spotrebiteľom výslovne,
> jednoznačne a zrozumiteľne uviesť informácie podľa **§ 5 ods. 1 písm. a), d), g) a i)** a § 15
> ods. 1 písm. j) […]"

The list is **a) d) g) i)** — main characteristics, price, the producer's durability guarantee, and
liability for defects in services.

**Letter (f) is not in it.** So the harmonised notice does **not** have to be repeated at checkout,
and does not have to sit beside the Add-to-cart button. That is one thing we can stop worrying about.

*(Letter (g), the durability guarantee, is in the list — but it only bites when a producer offers a
free durability guarantee over two years on the whole product. Walterin offers none, so (g) is
inert. If that ever changes, it must appear immediately before the order button, which is a much
harder requirement than (f).)*

## 3 · What the Regulation adds — secondary sources only

**Not verified against the Official Journal text.** EUR-Lex returned an empty body on every attempt
from this machine (`data.europa.eu` → `eur-lex.europa.eu`, both the ELI and CELEX forms, HTTP 202
with zero bytes). What the secondary sources agree on:

- Applies from **27 September 2026** — i.e. now.
- For distance contracts concluded through an online interface the notice must be shown **in colour,
  RGB**; black and white is only for the offline world.
- The notice is **not editable** — not recoloured, cropped or rebuilt.
- The duty is framed as display **"at every physical and online point of sale"**.

The most directly useful report, and the one that answers Veronka's question, is of **Commission
practical guidelines** describing interactive disclosure:

> "On a product catalogue page, a line such as 'Your legal guarantee rights' can trigger the full
> notice on the first mouse click or roll-over."

If that is accurate, it is close to decisive: **one click from a line on the product page is an
accepted way to do this** — which is almost exactly what the theme does today. It also implies the
trigger belongs on the product page, not only in a footer.

**This needs confirming against the guidance itself before it is relied on.** It is reported at
second hand, and it is the single sentence the whole recommendation leans on.

## 4 · What is on the site today

A **"Legal guarantee" / "Zákonná záruka" accordion** in the product page's details stack. Opening it
shows the Commission's artwork for goods, and a plain sentence for digital content. The footer also
carries a "Legal guarantee" link to the Terms.

> **A discrepancy to fix, noticed while reading:** `docs/legal/legal-guarantee-notice.md` says the
> notice was moved **out** of the accordions on 30 Sep into a small text link plus a dialog, and ends
> with "**Do not put it back in the accordion.**" The code and the live site have it in an accordion.
> One of the two is wrong and the document is the more likely candidate, but it should not be left
> contradicting the site.

## 5 · What I would do

**Not A4 as written.** "Legal guarantee off the product pages, footer only" asks the notice to be
conspicuous while putting it where nothing is conspicuous. The gap between `zreteľným spôsobom` and a
footer link is the kind that only matters once — and the downside is a consumer-protection finding
against a brand on its launch month.

Three options, quietest first:

| | What it is | Risk |
|---|---|---|
| **1 · Quieter trigger, same place** | Keep it one click from the product page, but as a small line beside the payment icons rather than an accordion row among "About the deck" and "What you get" | Lowest. Matches the Commission example as reported |
| **2 · Accordion, as now** | No change | Lowest, but it sits among the storytelling, which is the thing Veronka disliked |
| **3 · Footer only** | What A4 asks for | **The one I would not take.** Rests on "before the order" alone and gives up on "conspicuous" |

Option 1 gets what A4 actually wanted — the notice out of the middle of the story — without taking
the legal risk. It is also, on the file history, where it already was on 30 September.

**Nothing here changes the site.** No code has been touched for this; it is research only, and the
next step is Veronka's call between those three, plus a lawyer's eye on §6.

## 6 · For the lawyer

Added to `LAWYER-QUESTIONS.md`:

1. Does a product-page line that reveals the harmonised notice on one click satisfy `zreteľným
   spôsobom` in § 5(1)(f), or must the notice itself be visible without interaction?
2. Is a footer link, present on every page, capable of satisfying § 5(1)(f) at all?
3. For a product with both a printed and a digital edition, is it enough that the goods notice is
   shown whenever any variant is a good — or must it follow the variant the consumer has selected?

## Sources

- [Act No. 108/2024 Coll., consolidated text applying from 27 Sep 2026 (slov-lex.sk, PDF)](https://www.slov-lex.sk/static/pdf/2024/108/ZZ_2024_108_20260927.pdf) — §§ 5(1), 15(1), 17(3), quoted verbatim above
- [Implementing Regulation (EU) 2025/1960, EUR-Lex](https://eur-lex.europa.eu/eli/reg_impl/2025/1960/oj/eng) — **could not be fetched from this machine; listed as the authority to check**
- [Noerr — labelling obligations under the EmpCo Directive](https://www.noerr.com/en/insights/new-labelling-obligations-for-commercial-guarantees-offered-by-producers-and-legal-guarantee-of-conformity-under-the-empco-directive-action-needed-by-september-2026) — "There are no specific rules on exactly how this is to be carried out"; goods only
- [Cuatrecasas — harmonised notice and label, new EU rules 2026](https://www.cuatrecasas.com/en/global/retail-1/art/harmonized-notice-label-new-eu-rules-2026) — RGB for online interfaces; "every physical and online point of sale"
- [Bureau Veritas — summary of Implementing Regulation (EU) 2025/1960](https://www.cps.bureauveritas.com/newsroom/summary-commission-implementing-regulation-eu-20251960) — A4 minimum, RGB online, applies 27 Sep 2026
- [PPC Land — on the Commission's practical guidelines](https://ppc.land/eu-forces-sellers-to-display-guarantee-notices-in-shops-and-online-in-7-days/) — the "first mouse click or roll-over" example; **the sentence this recommendation leans on, and the one to verify first**
