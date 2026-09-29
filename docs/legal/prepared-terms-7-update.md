# Prepared change: Terms 7.1 and 7.2 (eBook downloads)

**Not written.** Waiting for "OK live". Prepared 29 Sep 2026.

Policy: `gid://shopify/ShopPolicy/49655415113` (TERMS_OF_SERVICE), EN body + SK translation.
Backup of all four policies already taken: `docs/backup/policies-2026-09-29/`.

Decisions applied (Veronka, 29 Sep 2026): **download limit 5**, **no expiry stated**, **both PDF and
EPUB ship with every eBook**, **no DRM**.

---

## 7.1 — English

**Now (live):**
```html
<p>7.1 We deliver the eBook as a download link sent by email after payment.</p>
```

**Proposed:**
```html
<p>7.1 We deliver the eBook as a download link sent by email after payment. The link can be used up to 5 times. There is no time limit on it. If it stops working, or you run out of downloads, write to <a href="mailto:support@walterin.com">support@walterin.com</a> and we will send you a new one.</p>
```

## 7.2 — English

**Now (live):**
```html
<p>7.2 eBooks are in PDF or EPUB format. To open them you need a device and an application that support these formats.</p>
```

**Proposed:**
```html
<p>7.2 Every eBook comes as two files: a PDF and an EPUB. To open them you need a device and an application that reads these formats. The files carry no technical protection (no DRM) — they open in any reader, on as many of your own devices as you like, and they keep working if you change device. We do not supply updates to an eBook after you have bought it.</p>
```

## 7.1 — Slovak

**Now (live):**
```html
<p>7.1 E-knihu dodáme ako odkaz na stiahnutie, ktorý vám pošleme e-mailom po zaplatení.</p>
```

**Proposed:**
```html
<p>7.1 E-knihu dodáme ako odkaz na stiahnutie, ktorý vám pošleme e-mailom po zaplatení. Odkaz sa dá použiť najviac 5-krát. Časovo obmedzený nie je. Ak prestane fungovať alebo vyčerpáte počet stiahnutí, napíšte nám na <a href="mailto:support@walterin.com">support@walterin.com</a> a pošleme vám nový.</p>
```

## 7.2 — Slovak

**Now (live):**
```html
<p>7.2 E-knihy sú vo formáte PDF alebo EPUB. Na ich otvorenie potrebujete zariadenie a aplikáciu, ktoré tieto formáty podporujú.</p>
```

**Proposed:**
```html
<p>7.2 Každá e-kniha je v dvoch súboroch: PDF a EPUB. Na ich otvorenie potrebujete zariadenie a aplikáciu, ktoré tieto formáty čítajú. Súbory nemajú žiadnu technickú ochranu (DRM) — otvoríte ich v ľubovoľnej čítačke, na toľkých vlastných zariadeniach, koľko chcete, a fungujú aj po výmene zariadenia. Po kúpe k e-knihe nedodávame aktualizácie.</p>
```

7.3 is unchanged in both languages, and does not conflict: keeping your own copies on your own
devices is not sharing.

---

## What this closes

Both sentences fill gaps left when the drafts were published on 22 Sep — the `[TO FILL]` markers for
downloads/validity and for functionality/technical protection were **deleted rather than answered**.
Both are mandatory pre-contract information for digital content (§ 5(1) of 108/2024).

The "no updates" sentence is new and covers § 852i. It is question 4 in
`docs/legal/LAWYER-QUESTIONS.md` and should not be treated as settled until the lawyer sees it.

## How it gets written

Same two-step as the clause 10 anchor, because the Slovak body is a *translation* of the English:

1. `shopPolicyUpdate` with `type: TERMS_OF_SERVICE` and the full new EN body.
2. That marks the Slovak translation **outdated**; re-query the digest.
3. `translationsRegister` the full new SK body against the fresh digest.
4. Read both back, check both public policy pages.

## One thing to settle before this is published

**If the app counts the limit per file rather than per order, 5 is two full sets and one spare.**

Each order now ships two files. A reader who takes both onto a phone and a laptop has used 4 of the
5. One failed download, or one new phone, and they are out — and they hit it having done nothing
unreasonable.

Publishing "up to 5 times" and then routinely raising it by hand is worse than picking a number
that holds, because the Terms are the promise and the hand-raising is invisible to the buyer.

So: **the test order should settle per-file vs per-order before this clause goes live** (step 4a of
`docs/launch/EBOOK-LAUNCH.md`).

- **Per order** → 5 is comfortable; publish exactly as written above.
- **Per file** → two options, both one-line changes:
  - keep 5 but say what it means: "each file can be downloaded up to 5 times" /
    "každý súbor sa dá stiahnuť najviac 5-krát" — this is a real improvement, because per file the
    honest reading is generous, not thin;
  - or raise the number.

The second question for the same test order — whether the emailed link still works weeks later —
decides whether "There is no time limit on it" can stand. Shopify's documentation is silent, and
that sentence must not be published if the link quietly dies.
