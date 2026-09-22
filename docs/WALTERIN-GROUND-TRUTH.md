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
| IČ DPH | TBD (confirm VAT status with accountant) |
| Commercial register | Obchodný register Mestského súdu Bratislava III, oddiel Sro, vložka č. 193235/B |
| Customer email | support@walterin.com |
| Phone | +421 905 549 907 |
| Return address | TBD (company address for now, later possibly Pack4you) |

⚠️ If the company is **not** a VAT payer, "VAT included" must not appear anywhere on the site.

---

## 2. Store and themes

| | |
|---|---|
| Domain | walterin.com |
| Store | 0ed210-bf.myshopify.com |
| Theme | Shrine LITE 1.3.0 |
| **Live theme** | ID **164726866249**. Never push, never edit in the editor during the rebuild |
| **Draft theme** | "Walterin Draft (Claude)", ID **188994257225**. All work goes here |
| Draft preview | https://0ed210-bf.myshopify.com/products/tarot?preview_theme_id=188994257225 |
| Repo | github.com/VeronikaIhringova/walterin-shop · local `~/walterin-shop` |
| Working branch | `tarot-improve` |
| Backup branch | `tarot-prototype-rebuild` (old prototype attempt, not used) |
| Backend access | Claude Code via Shopify AI Toolkit (Shopify CLI 4.8). Minimum scopes, one task at a time |

**Publishing:** Veronka publishes the draft manually in Shopify admin → Online Store → Themes. Claude Code never publishes.

---

## 3. Product: Comics Tarot of Consciousness

- 78 cards (22 Major + 56 Minor Arcana), 2 guide cards, tuck box.
- Price: €39, always taken from the product, never hardcoded.
- Editions = variants of the option "Language/Jazyk": **English** and **Slovak**.
- **First edition: 100 copies in English + 100 in Slovak.** Never "150".
- **Not signed, not numbered.** No "signed" wording anywhere, no certificate.
- **No launch date** anywhere until a real date exists.
- Before launch: notify-me form. Tags `tarot-waitlist`, `tarot-waitlist-en` / `tarot-waitlist-sk`. No newsletter checkbox.
- Pre-order vs notify-me: undecided (Veronka + Walter).
- **Never show the full deck.** Only the 12-card preview set: The Magician, The Fool, The Hermit, Wheel of Fortune, The Star, The Sun, Two of Wands, Knight of Wands, Six of Cups, Seven of Swords, Two of Pentacles, Seven of Pentacles.
- **Naming:** only "nine-frame comic" or "nine-frame path". Never "9-layer system" or "9-frame system".
- **Reading systems:** "Card of the day" and "Reading of consciousness" (what to understand / accept / transform). The nine-frame path is the guide inside every card.
- Specs (size, paper, finish, corners, box): TBD, from Walter or the printer. Never guess.
- Reviews: hidden until real, verified reviews exist.
- Product description and metafields in admin are outdated (still say "hand-signed", "9-layer"). To be rewritten.

---

## 4. Fulfilment, shipping, payments

- Fulfilment: **Pack4you** (Slovakia), ships via Packeta, DPD, DHL and others depending on country.
- Contract not signed yet: delivery times, prices and carriers are unknown. All delivery lines stay hidden until then.
- Trust row wording: "Ships across the EU" (no carrier name).
- Payments: Apple Pay, Google Pay, cards, PayPal, Revolut Pay.
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

**Colours:** paper #FFFDF7 · ink #222222 · yellow #FCF205 · sky #6FE9FA · red #F60403 (fills and large type only) · green #9FDA29
Roles: yellow = action / selected · sky = information · green = success · red = error / sold out.

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

Dry, warm, short factual sentences, British spelling. Literary, never generic. No mystical, self-help or therapy language. No "elevate", "must-have", "reach your full potential". The audience is intelligent and well-read. Don't simplify. Tease, don't spoil.

---

## 8. Open decisions

| Decision | Who |
|---|---|
| VAT status (IČ DPH) | Accountant |
| Return address | Veronka |
| Specs: size, paper, finish, corners, box | Walter / printer |
| Pack4you contract: delivery times, prices | Veronka |
| Pre-order vs notify-me | Veronka + Walter |
| Launch date | Veronka + Walter |
| Legal texts review | Accountant / lawyer |
