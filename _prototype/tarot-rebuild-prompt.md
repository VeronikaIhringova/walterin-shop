# Tarot product page rebuild: brief for Claude Code

## Goal
Rebuild the Comics Tarot product page (`templates/product.tarot.json`) so it matches the approved prototype in `_prototype/tarot-prototype/index.html` (v3). The prototype is the source of truth for structure, copy, interactions and look. Port it to proper Shopify sections: Liquid + scoped CSS + one small shared JS file. No frameworks.

Before planning, read:
- `_prototype/tarot-prototype/index.html` (all of it: CSS, markup, script)
- `CLAUDE.md`, `BRAND-POSITIONING.md`, `PRODUCT-PAGE-IMPROVEMENT-PLAN.md`
- The current tarot template and sections: `templates/product.tarot.json`, `sections/main-product.liquid`, `sections/how-it-works.liquid`, `sections/whats-inside.liquid`, `sections/meet-walter.liquid`, `sections/faq-with-image.liquid`, `sections/about-walterin.liquid`, `assets/walterin-design-system.css`

## Hard rules
- **No signing anywhere.** Delete every "signed", "hand-signed", "signed & numbered" and any certificate.
- **Editions:** 100 copies in English + 100 in Slovak. "First edition, limited". Delete every "150" and "100 PCS".
- **No launch date** anywhere. Delete the delivery estimate while the product is not buyable.
- **Naming:** only "nine-frame comic" / "nine-frame path". Delete "9-layer system" and "9-frame Walterin system".
- **Never show the full deck.** Only the 12 preview cards below appear on this page. The rest appear only as red card backs.
- **Readings reveal little:** show only the short questions. The full guide-card text stays in the box.
- **Fonts:** WalterinBold (headings, captions, margin notes), Inter (UI, body), Cormorant Garamond italic (literary lines, guide-card text). Nothing else.
- **Contrast:** never white text on yellow. One button style everywhere.
- **Every text a merchant might change must be a section/block setting**, not hardcoded. It will be translated to Slovak later.
- Everything must be readable with JavaScript off and without animations. Respect `prefers-reduced-motion`. Mobile first, test at 390px and 1280px, no horizontal scroll.
- Do **not** port the prototype's red "confirm" flags, the section label pills or the "Prototype controls" box. They are review tools only.
- Don't touch other templates or the live theme. Work locally with `shopify theme dev`; run `shopify theme check` before you say a phase is done.

## Design tokens (match the prototype)
```
--paper #FFFDF7   --paper2 #F6F2E7   --table #EFE8D6   --ink #222222   --muted #5E5A52
--yellow #FCE206  --yellow-soft #FFF9D6  --highlighter #FFE94A  --red #C9352C
radius 10px (cards 12–14px) · border 2.5px ink · button shadow 5px 5px 0 ink
ease cubic-bezier(.2,.75,.2,1)
```
Frame button: WalterinBold uppercase, yellow fill, 2.5px ink border, radius 8px, hard offset shadow; on hover it moves 2px and the shadow shrinks, on press it moves 5px and the shadow disappears. Make it one snippet (`snippets/wt-button.liquid`) plus shared CSS.

Paper grain: the subtle SVG noise overlay from the prototype (`body::after`), scoped to the tarot template only.

## The 12 preview cards
Theme assets `card-XX.jpg` (800 × 1314), in Rider–Waite order. Frame edges are percentages of card width (X) and height (Y), measured from the art. Store them in one JSON asset (`assets/tarot-preview.json`) or as a block setting per card, and read them in JS.

| Asset | Name | X edges | Y edges |
|---|---|---|---|
| card-02 | The Magician | 3.5, 33.6, 64.2, 96 | 1.7, 31.7, 62.1, 90.4 |
| card-01 | The Fool | 4.5, 36, 66.5, 96.1 | 1.8, 31.8, 62.1, 90.3 |
| card-10 | The Hermit | 3.9, 35.5, 66.2, 96.5 | 2, 32, 62.3, 91.6 |
| card-11 | Wheel of Fortune | 3.2, 34.1, 65, 96.8 | 2.1, 32.4, 62.3, 91.5 |
| card-18 | The Star | 3.2, 34, 66, 97 | 2.1, 31.9, 62.5, 91.7 |
| card-20 | The Sun | 3.8, 35.5, 66.8, 96.5 | 1.8, 32.3, 62.7, 91.5 |
| card-24 | Two of Wands | 3.2, 35.6, 67, 97.2 | 1.7, 31.9, 62.6, 90.9 |
| card-34 | Knight of Wands | 3, 35.5, 66.9, 97.5 | 1.8, 32.3, 62.7, 91.8 |
| card-42 | Six of Cups | 2.5, 36.2, 67.2, 97.2 | 1.8, 32.6, 63.5, 91.6 |
| card-57 | Seven of Swords | 3.1, 35.8, 67, 96.5 | 1.7, 31.7, 63, 91.4 |
| card-66 | Two of Pentacles | 3, 36, 66.6, 97 | 1.7, 32.4, 62.9, 91.6 |
| card-71 | Seven of Pentacles | 3, 35.9, 66.8, 97.1 | 1.7, 32.4, 63.4, 91.9 |

Nine-frame path labels (row × column):
- Row 1, **What to understand?**: Change / Recognise the moment · Idea / What has potential · Value / What matters
- Row 2, **What to accept?**: Openness / Embrace the unexpected · Meaning / Why do it · Trust / Release control
- Row 3, **What to transform?**: To try / Begin unprepared · To develop / Carry on · To create / Bring into consciousness

New asset: copy `_prototype/tarot-prototype/img/box.webp` (open tuck box render, transparent background) into `assets/`.

## Page structure (in this order)
Every section can send a card to S2 ("read this card"), so the page works as one system.

**S1 · Buy** (restyle `main-product` for the tarot template only)
- Gallery: box render first (on a soft paper background with drop shadow), then card photos; square frame with ink border; thumbnails below; sticky on desktop.
- Kicker, title, Cormorant thesis line ("78 cards. One illustrator. Every card a nine-frame comic."), price with "VAT included · shipping at checkout".
- Edition tiles (English / Slovenčina, "Limited to 100 copies") replacing the variant dropdown. They must still select the real variant.
- Before launch: the existing Coming Soon / Notify system, restyled as an inline email field + frame button, with "One email on release day, for the [edition] edition."
- When buyable: Add to cart (frame button with edition + price) and dynamic checkout buttons (Apple Pay / Google Pay) full width underneath, plus "More payment options".
- Two text links: "How a card reads ↓" and "Draw a card ↓". Each opens the matching S2 tab and scrolls there.
- Trust rows (3, with line icons): First edition, limited: 100 copies per language · Apple Pay, Google Pay, cards and PayPal · Ships across the EU with Packeta.
- "Details" accordion. Remove: emoji bullets, bullet list, launch date, delivery estimate, non-EU card logos.

**S2 · How to read** (new section, replaces `how-it-works`)
- Left: kicker, heading "Every card is a nine-frame comic", three tabs styled like paper index tabs: Read a card · Card of the day · Reading of consciousness. Each tab has its own short text panel. Footer line: "You're trying it with 12 cards. The full deck and both reading guides, word for word, come in the box."
- **Read a card**: big card (keep its real aspect ratio). Pointer position over the card decides which frame is active, using the frame edges. The active frame:
  - spotlight: everything else dims with a soft, feathered dark overlay that glides between frames
  - lift: a copy of that frame scales up slightly with a paper shadow
  - paper label pinned under the frame (above it on the bottom row) with a yellow tape strip: frame name (WalterinBold), description (Cormorant italic), "Row n · question" (small caps)
  - row questions written vertically in the card's left margin with a bracket; the active row gets a highlighter sweep
  - invisible buttons per frame for keyboard and touch; on touch devices a tap selects a frame
  - "Read it frame by frame" steps through frames 1–9 about every 1.6 s; any interaction stops it
  - 12-card picker of mini cards that lift on hover
  - small handwritten hint "Hover a frame" (or "Tap a frame" on touch) that disappears after first use
- **Card of the day**: one red-backed card; "Draw a card" shuffles, flips and names a random card from the 12. Tapping it opens it in Read a card.
- **Reading of consciousness**: three cards labelled "1. What to understand? / 2. What to accept? / 3. What to transform?". "Draw three" deals and flips them one after another. Tapping card n opens it in Read a card with row n lit.
- Mobile order: heading → tabs → card → panel text → footer line.

**S3 · Meet the cards + specs** (replaces `whats-inside`)
- Heading, "They turn on their own. Tap one to read it."
- 4 cards from the 12 that flip to a different preview card every ~2.6 s while in view (never two identical), with a caption. Plus a fifth item: a small pile of 3 red backs with a "+66" tag and "In the box".
- Clicking a card opens it in S2.
- Specs row with the existing star icons: Cards 78 · full deck / Structure 22 Major · 56 Minor / Size 84 × 138 mm / Print Full colour / Paper [setting, currently "Black-core card, 350 g"] / Finish Matte, both sides.

**S4 · Open the box** (new)
- Left: heading "Open the box" and a numbered list (78 cards · 2 guide cards, with a "Try one" link that opens the Card of the day tab · The tuck box).
- Right: the box render. When the stage is ~45% in view, three preview cards rise out of the box top and fan out, and the two guide cards slide out left and right. Guide cards are drawn in HTML like the real ones: title, mini red backs, red Cormorant questions, "Walterin". Handwritten notes with drawn arrows ("78 cards", "2 guide cards", "the tuck box") fade in on desktop and are hidden on mobile. A small "Close / Open the box" toggle.

**S5 · Walter** (replaces `meet-walter`)
- Left: "sketch → finished" drag slider (range input over two images, yellow round handle). Both images are settings. Until Walter's scan exists, use the grayscale-filter fallback from the prototype.
- Right: kicker, heading "Why a comic artist redrew the tarot", Cormorant pull quote with a yellow left rule, two paragraphs, signature in WalterinBold. All text in settings. The current copy is a draft Walter will rewrite.

**S6 · Questions** (replaces `faq-with-image`)
- Left, sticky on desktop: heading and one preview card that changes with the open question (each question block has a card picker). Clicking the card opens it in S2.
- Right: framed accordion, only one open at a time, WalterinBold questions, "+" that rotates into "×" on a yellow circle.
- Questions (blocks): Do I need to know tarot? (with a "Draw a card" link to S2) · English or Slovak? (two buttons that set the edition in S1 and scroll there) · How many are there? · When does it ship? ("Leave my email" link focuses the notify field) · Where do you ship? · Can I return it? · Is it a good gift?
- Add FAQPage JSON-LD built from the blocks.

**S7 · Closing band**
- Full-width yellow band: "100 in English. 100 in Slovak." + "That's the whole first edition." + a white frame button (Notify me or Add to cart, with the edition name). A fan of 3 cards on the right.
- If the visitor drew cards in S2, swap in their cards and text: "Today you drew The Star." or "Your reading: A, B, C." + "Take the whole deck home. 100 copies per language."

**S8 · Footer** (theme footer group, applies site-wide; ask me before changing it)
- Newsletter "Letters from the studio", support "Mon–Fri, 9:00–17:00 CET · We reply within one working day · Walterin · Bratislava, Slovakia", EU payment icons only (Apple Pay, Google Pay, Visa, Mastercard, PayPal).

**Mobile sticky buy bar**: appears when S1 is out of view. Mini card, "Comics Tarot", "€39 · [edition] edition", button (Notify me / Buy).

**Remove from the tarot template**: "About Walterin (cities)" block, the empty reviews widget (hide until reviews exist), "You may also like", anything else not listed above.

## Shared behaviour (`assets/tarot-page.js`, loaded only on this template)
One small state object shared by every section:
- `edition` (en / sk): set by the S1 tiles or the FAQ buttons; updates every `[data-edname]`, the selected variant, the sticky bar and the closing button.
- `openCard(cardId, row?)`: switches S2 to "Read a card", loads the card, lights frame `row*3+1` (or none), scrolls to S2.
- `setMode(mode)`: switches S2 tabs; used by links anywhere on the page (`data-mode-link`).
- `reading`: last drawn cards, used by S7.
Sections talk only through data attributes and these functions. No inline scripts inside sections.

## Work in phases, pause after each
1. **Plan**: list every file you'll create, change or remove; how settings, blocks and the JS state fit together; open questions for me. No code yet.
2. **Foundation**: tokens, button snippet, paper grain, `tarot-page.js`, preview-card data.
3. **S1 Buy** + sticky bar.
4. **S2 How to read**.
5. **S3 + S4**.
6. **S5 + S6 + S7** (+ footer only after I confirm).
7. **QA**: `shopify theme check`, keyboard pass, reduced motion, 390px and 1280px screenshots, then a list of anything that still needs real assets or copy from me.

After each phase, tell me what to look at in the preview (`http://127.0.0.1:9292/products/tarot`) and wait for my OK. Commit each phase to `feat/product-page-updates` with a clear message. Never push to the live theme. At the end I'll run `shopify theme push --unpublished` myself.
