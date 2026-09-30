# Prepared change: Terms 7.1 and 7.2 (eBook downloads)

**Not written.** Waiting for "OK live". Prepared 29 Sep 2026, limit revised 30 Sep 2026.

Policy: `gid://shopify/ShopPolicy/49655415113` (TERMS_OF_SERVICE), EN body + SK translation.
Backup of all four policies already taken: `docs/backup/policies-2026-09-29/`.

Decisions applied (Veronka, 30 Sep 2026): **download limit 8 per file** — the PDF eight times and the
EPUB eight times, counted separately — **no expiry stated**, **both PDF and EPUB ship with every
eBook**, **no DRM**.

---

## 7.1 — English

**Now (live):**
```html
<p>7.1 We deliver the eBook as a download link sent by email after payment.</p>
```

**Proposed:**
```html
<p>7.1 We deliver the eBook as a download link sent by email after payment. Each file can be downloaded up to 8 times. There is no time limit on the link. If it stops working, or you run out of downloads, write to <a href="mailto:support@walterin.com">support@walterin.com</a> and we will send you a new one.</p>
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
<p>7.1 E-knihu dodáme ako odkaz na stiahnutie, ktorý vám pošleme e-mailom po zaplatení. Každý súbor si môžete stiahnuť najviac 8-krát. Odkaz nie je časovo obmedzený. Ak prestane fungovať alebo vyčerpáte počet stiahnutí, napíšte nám na <a href="mailto:support@walterin.com">support@walterin.com</a> a pošleme vám nový.</p>
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

## The app cannot do per-file limits today — read this before approving

Researched 30 Sep 2026. Shopify's own Digital Products app sets the limit **per variant**, not per
file: one counter shared by the PDF and the EPUB
(<https://help.shopify.com/en/manual/products/digital-service-product/digital-downloads>).

So **"Each file can be downloaded up to 8 times" is not true on the current setup.** Set to 8, a
buyer gets 8 downloads shared across both files — roughly 4 full sets — while the Terms promise 8
each. That is a promise the store does not keep, and it is the one thing worse than a low number
honestly stated.

Three ways out, in the order I'd pick them:

1. **Switch app first, then publish this clause.** Fileflare and Filemonk both do genuine per-file
   limits, and a switch is being considered anyway for customer-account re-downloads
   (`docs/legal/digital-download-app-research.md`). If the app moves, the wording above is correct
   as written and needs no change.
2. **Publish now with per-variant wording.** Change the sentence to "The link can be used up to 8
   times" / "Odkaz sa dá použiť najviac 8-krát" and drop "each file". Honest, and matches what the
   app enforces today — but it is a thinner promise, because 8 shared is 4 sets.
3. **Publish now, set the app limit to 16.** 16 shared behaves like 8 each for anyone who is not
   deliberately hoarding, so the per-file wording stays broadly true. Least clean of the three: the
   Terms say one thing and the setting says another, and the equivalence only holds if buyers take
   both files each time.

## Still on hold until the test order

Veronka's instruction (30 Sep 2026): hold this clause until the test order runs.

Documentation now answers the per-file question (per variant — see above), so the test order is
left to confirm it in practice and to settle the second question. Step 4a of
`docs/launch/EBOOK-LAUNCH.md` should record: download the PDF, then the EPUB, then check the
remaining count on the order in admin. If it dropped by 2, the counter is shared, as documented.

The second question for the same test order — whether the emailed link still works weeks later —
decides whether "There is no time limit on the link" can stand. Shopify's documentation is silent on
it, and that sentence must not be published if the link quietly dies.
