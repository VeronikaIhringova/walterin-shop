# Store writes prepared on 7 October 2026 — NOT executed

Everything below is **ready to run and has not been run.** RULE ONE: each one waits for "OK live".
Backup of all four live policies taken first: `docs/backup/policies-2026-10-07/policies-live-en.json`
(CONTACT_INFORMATION 729, PRIVACY_POLICY 14 625, REFUND_POLICY 8 306, TERMS_OF_SERVICE 12 883 chars).

The FAQ page itself needs **none of these** — its text lives in the theme's locale files, so EN and
SK both publish with the theme push. These are the store-side facts the FAQ has to agree with.

---

## 1 · Terms 7.1 and 7.2 — the eBook downloads  ⚠ must go live WITH the FAQ

The FAQ says *"Six times in total, shared between the two files"* and *"no copy protection"*. The
live Terms say neither. **If the FAQ ships without this, the page contradicts the contract.**

This also settles a three-way disagreement in our own notes: `prepared-terms-7-update.md` said
**8 per file counted separately**, an older plan note said **5 in total**, Veronka said **6 in
total** on 7 Oct. Her number wins and the prepared file is now wrong — it should be corrected or
deleted when this is written.

Policy: `gid://shopify/ShopPolicy/49655415113` (TERMS_OF_SERVICE)

**7.1 — live now**
```html
<p>7.1 We deliver the eBook as a download link sent by email after payment.</p>
```
**7.1 — proposed**
```html
<p>7.1 We deliver the eBook as a download link sent by email after payment. The link allows six downloads in total, shared between the PDF and the EPUB. There is no time limit on the link. If it stops working, or you have used all six, write to <a href="mailto:support@walterin.com">support@walterin.com</a> and we will send you a new one.</p>
```

**7.2 — live now**
```html
<p>7.2 eBooks are in PDF or EPUB format. To open them you need a device and an application that support these formats.</p>
```
**7.2 — proposed**
```html
<p>7.2 Every eBook comes as two files: a PDF and an EPUB. To open them you need a device and an application that reads these formats. The files carry no technical protection (no DRM) — they open in any reader, on as many of your own devices as you like, and they keep working if you change device. We do not supply updates to an eBook after you have bought it.</p>
```

Slovak equivalents are in `prepared-terms-7-update.md` and need the same correction from eight to
six before use.

---

## 2 · Refund policy — the withdrawal link  ✅ ALREADY THERE, no write needed

Checked against the live body rather than assumed. The Refund policy already carries **four** links
to `/pages/withdrawal`, including clause 1.1 with the exact agreed wording:

> online via the **"Withdraw from contract here"** link in the footer of every page

Nothing to add. Recorded here so it is not "fixed" a second time.

---

## 3 · The tarot — remove every quantity  ⚠ live to customers right now

Ground truth rule added 7 Oct: **no number describing how many we have or made appears anywhere a
customer can see it.** Three metafields on `gid://shopify/Product/9872039575881` break it, in EN and
in SK.

| Metafield | Live now | Proposed |
|---|---|---|
| `walterin.price_note` | "First edition. 100 copies in each language." | **"First edition."** |
| `walterin.preorder_note` | "…The first edition is being prepared: 100 copies in English, 100 in Slovak." | "…The first edition is being prepared." |
| `walterin.notes` | "…first edition of 100 copies per language, and something they've almost certainly…" | "…a first edition, and something they've almost certainly…" |

Slovak: `100 kusov` / `prvé vydanie, 100 kusov v každom jazyku` — same removals.

The real figures stay internal: **150 EN + 150 SK.**

**One FAQ answer carried the same number and is already fixed in the theme** — *"Will sold-out items
come back?"* now reads "The first edition is small" instead of counting decks.

---

## 4 · Slovak FAQ translations — not needed

Deliberately designed out. The FAQ's Slovak is in `locales/sk.json`, versioned with the theme, so
there is no Translate & Adapt entry to register and no way for the page to half-translate. Measured
before the rebuild: `/sk/pages/faq` was serving **21 English answers** to Slovak readers.

---

## Running order when approved

1. Terms 7.1 + 7.2 (EN, then the SK translation) — read back both.
2. The three tarot metafields (EN, then SK) — read back, then re-check the live product page.
3. Push the theme.

Terms before the theme push, so the contract is never behind the FAQ.
