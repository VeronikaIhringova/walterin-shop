# WALTERIN GROUND TRUTH

> Single source of truth. Updated 22 Sep 2026.
> If anything here conflicts with an older project file, this file wins.
> When a fact changes, update this file, not the prompts.

---

## 1. Company

| | |
|---|---|
| Company | Walterin s. r. o. |
| Registered address | Ľubochnianska 4, 831 04 Bratislava – Nové Mesto, Slovakia |
| IČO | 57297991 |
| DIČ | 2122655755 |
| IČ DPH | **Not a VAT payer** (Veronka, 22 Sep 2026). Prices are final. |
| Commercial register | Obchodný register Mestského súdu Bratislava III, oddiel Sro, vložka č. 193235/B |
| Customer email | support@walterin.com |
| Phone | +421 905 549 907 |
| Return address | TBD (company address for now, later possibly Pack4you) |

⚠️ Walterin is **not** a VAT payer: no VAT wording anywhere ("VAT included", "Tax included", "DPH"). In Shopify, "Include tax in prices" must be **off**. The theme shows tax wording only when that setting is on, so VAT can be switched on later without theme changes.

---

## 2. Store and themes

| | |
|---|---|
| Domain | walterin.com |
| Store | 0ed210-bf.myshopify.com |
| Theme | Shrine LITE 1.3.0 |
| **Live theme** | ID **164726866249**. The only theme. Preview with `shopify theme dev`; push only changed files after Veronka's "OK live" (see CLAUDE.md) |
| Old draft theme | "Walterin Draft (Claude)", ID 188994257225: **retired 22 Sep 2026**, Veronka deletes it after go-live. No new draft themes |
| Preview | `shopify theme dev --store 0ed210-bf.myshopify.com` → http://127.0.0.1:9292 + shareable link |
| Repo | github.com/VeronikaIhringova/walterin-shop · local `~/walterin-shop` |
| Working branch | `tarot-improve` |
| Backup branch | `tarot-prototype-rebuild` (old prototype attempt, not used) |
| Backend access | Claude Code via Shopify AI Toolkit (Shopify CLI 4.8). Minimum scopes, one task at a time |

**Publishing:** Claude Code never publishes a theme. Live changes = push of changed files to the live theme after "OK live". GitHub is the backup (roll back by pushing an older commit).

**Product files:** `docs/products/*.md` (Tarot, Prague, Paris) are binding for each product.

---

## 3. Product: Tarot of Consciousness: A Graphic Journey

- Name: EN **Tarot of Consciousness: A Graphic Journey**, SK **Komiksový tarot vedomia** (short: Tarot of Consciousness / Tarot vedomia). Old name "Comics Tarot of Consciousness" retired on the website (tuck box still says COMICS TAROT, TO CONFIRM). Handle `tarot`.
- **80 cards in the box**: 78 tarot cards (22 Major + 56 Minor Arcana) + **2 extra cards**, and a tuck box.
  Extra card 1 (double-sided): the introduction on one side, the nine-frame path explained on the other.
  Extra card 2 (double-sided): the two readings.
  ⚠️ "Guide cards" is retired: say what the cards actually are. **80** = what's in the box, **78** = the tarot itself (SEO titles keep 78).
- Price: €39, always taken from the product, never hardcoded.
- Editions = variants of the option "Language/Jazyk": **English** and **Slovak**.
- **First edition: 100 copies in English + 100 in Slovak.** Never "150".
- **Not signed, not numbered.** No "signed" wording anywhere, no certificate.
- **No launch date** anywhere until a real date exists.
- Before launch: notify-me form. Tags `tarot-waitlist`, `tarot-waitlist-en` / `tarot-waitlist-sk`. **One optional newsletter checkbox** (Veronka, 22 Sep 2026), unticked by default; the tag `newsletter` is added only when it is ticked.
- Pre-order vs notify-me: undecided (Veronka + Walter).
- **Never show the full deck.** Only the preview set (10 of the 12 named cards exist as artwork;
  The Hermit and The Sun are still missing). The pile in "Meet the cards" counts itself: 78 minus
  the preview cards, so it can never go stale. Card artwork stays **English on every site**;
  the interface and the copy around it are translated. Full list: The Magician, The Fool, The Hermit, Wheel of Fortune, The Star, The Sun, Two of Wands, Knight of Wands, Six of Cups, Seven of Swords, Two of Pentacles, Seven of Pentacles.
- **Naming:** EN only "nine-frame comic" or "nine-frame path"; SK "deväťobrázkový komiks" and "cesta v deviatich krokoch". Never "9-layer system", "9-frame system" or "nine-frame system".
- **Reading systems:** "Card of the day" and "Reading of consciousness" (what to understand / accept / transform). The nine-frame path is the guide inside every card.
- Specs. **Confirmed by Walter (23 Sep 2026): size 84 × 138 mm · print full-colour CMYK ·
  card stock 270 g/m² · finish matte.** Shown as six items in "Meet the cards" together with
  Cards (80 · in the box) and Structure (22 Major · 56 Minor).
  Still TBD and never guessed: corners, box material.
- Reviews: hidden until real, verified reviews exist. Judge.me uninstalled; review tool TBD.
- Product description and metafields in admin are outdated (still say "hand-signed", "9-layer"). To be rewritten.

---

## 4. Fulfilment, shipping, payments

- Fulfilment: **Pack4you** (Slovakia), ships via Packeta, DPD, DHL and others depending on country.
- Contract not signed yet: delivery times, prices and carriers are unknown. All delivery lines stay hidden until then.
- Trust row wording: "Ships across the EU" (no carrier name).
- eBooks (Prague, Paris) are digital (no shipping) and go on sale first. Printed books and the tarot are physical and stay unbuyable until Pack4you is signed.
- Payments: **Stripe Card Payments** (third-party provider, not Shopify Payments): Visa, Mastercard, Amex, JCB, Discover, Diners, Apple Pay, Google Pay. **PayPal pending** (set up before launch). **No Revolut Pay.**
- Apps: Shopify Email (Messaging), Flow, Translate & Adapt, Digital Products (Prague + Paris eBooks), Facebook & Instagram channel (Meta pixel + Conversions API, "Maximum" data sharing). **Uninstalled (Sep 2026): Judge.me, REZ Preorder Notify me, Track123, Socialwidget.**
- Emails: **support@walterin.com** for everything customers do (orders, returns, withdrawal, privacy). info@walterin.com only for general contact.
- Returns: 14-day withdrawal, customer pays return shipping, full refund incl. original standard delivery within 14 days.

---

## 5. Languages

- English: default, published.
- Slovak: added, **not published**. 168 store rows imported (products, pages, menus, cookies, SEO).
- German, Czech: unpublished until translated.
- Plan: publish Slovak together with the new design, after theme texts are translated on the draft.
- Theme strings: `locales/sk.json` (Claude Code). Section texts: translated at the end, when sections are final.

---

## 6. Design system (walterin-ui.css, scoped to `body.wui`)

**Look:** comic frames, not floating cards. Ink outlines, flat colour, paper. No grey, no gradients, no soft shadows. All text is ink.

**Colours (UI):** paper #FFFDF7 · ink #222222 · yellow #FCF205. Nothing else carries meaning in the interface (Veronka, 22 Sep 2026).
Roles: ink = every line and letter · paper = every background · yellow = action, selected, marker.
Unavailable / sold out = faded to 40%. Never a strike-through, never a grey fill.
**Sky #6FE9FA · red #F60403 · green #9FDA29 belong to Walter's artwork only**, never to the UI.

**Frames:** 2.5px ink border · 8px radius · hard shadow 4px 4px 0 ink.

**One button:** WalterinBold, black text on yellow, ink border, hard offset shadow that presses in on hover.

**Type scale (only these, desktop / mobile):**
| Role | Font | Size | Use |
|---|---|---|---|
| Display | WalterinBold | 56 / 40 | Page title |
| Heading | WalterinBold | 40 / 32 | Section headings |
| Label | WalterinBold | 22 / 20 | Labels, tile names, buttons, accordion titles |
| Price | Inter 700 | 32 / 28 | Price only |
| Body | Inter 400 | 17 / 16 | Thesis, descriptions |
| Small | Inter 400 | 14 / 14 | VAT line, notes, privacy, trust rows |

WalterinBold lacks € · → : those characters render in Inter.

**Text never breaks inside a word.** No hyphenation, no mid-word breaks. Hyphenated terms use a
non-breaking hyphen (U+2011): "nine‑frame". Labels that don't fit side by side stack; a long label
steps down one size instead of breaking. Buy column rules: `docs/design/BUY-SECTION-SPEC.md`.

**Spacing tokens:** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96
Measured **optically** (from visible letters to the next border, from a shadow's outer edge).
- Label → its control: 16
- Control ↔ control in a group: 12
- Control → helper text: 12 · helper ↔ helper: 8
- Title → thesis: 16 · price → VAT line: 8
- Between groups: 40 desktop / 32 mobile
- Between page sections: 96 desktop / 64 mobile
- Everything aligns to the site's content width, left and right edges match the header.

---

## 7. Voice

**Standing rule (23 Sep 2026), every language, every surface:** write the way a person speaks; no
metaphors for their own sake; concrete before abstract; nothing repeats between sections; Slovak is
written natively, never translated; read it aloud before showing it. Full version:
`docs/design/COPY-GUIDE.md`.

Dry, warm, short factual sentences, British spelling. Literary, never generic. No mystical, self-help or therapy language. No "elevate", "must-have", "reach your full potential". The audience is intelligent and well-read. Don't simplify. Tease, don't spoil.

---

## 8. Open decisions

| Decision | Who |
|---|---|
| VAT status | Decided: not a VAT payer. Open for the accountant: OSS for eBooks, customer document |
| Return address | Veronka |
| Specs: size, paper, finish, corners, box | Walter / printer |
| Pack4you contract: delivery times, prices | Veronka |
| Pre-order vs notify-me | Veronka + Walter |
| Launch date | Veronka + Walter |
| Legal texts review | Accountant / lawyer |
