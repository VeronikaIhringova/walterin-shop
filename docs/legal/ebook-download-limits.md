# eBook downloads: how many, how long, and what the Terms should say

Research for Terms 7.1 / 7.2. **Nothing has been set.** 29 Sep 2026.

---

## 1. What the app can actually do

Walterin uses Shopify's **own** Digital Products app (ground truth §4).

| Setting | Exists? | Detail |
|---|---|---|
| Download limit | **Yes** | "Unlimited" or "Limited" with a number. Set **per variant**, not per shop. Changing it "affects all past and future sales for that variant", so it can be raised later and old orders benefit. |
| Link validity / expiry in days | **No** | The app has no time-expiry setting, and Shopify's documentation says nothing about customer download links expiring. |
| Re-send a link | Yes | From the order in admin. |
| Share links | No expiry, but still counted against the variant's download limit. |

**This kills the "30 days" number in `docs/launch/EBOOK-LAUNCH.md`.** That figure came from a
setting called "No. of days available to download", which belongs to **Filemonk** — a *third-party*
Shopify app with a confusingly similar name — not to the app Walterin has installed.

**So: the Terms must not promise a validity period.** We cannot enforce one, and promising a limit
we don't control is worse than promising nothing. Shopify's own docs are silent on whether order
links eventually expire, so the honest line is "no set expiry, write to us if it stops working".

## 2. What comparable sellers do

The closest comparables are DRM-free publishers selling direct: **No Starch Press**, **The Pragmatic
Bookshelf**, **Leanpub**, **itch.io**, **Gumroad**. The pattern is consistent — buy once, re-download
as often as you like, for as long as you like. itch.io has no option to limit a buyer's downloads at
all; Pragmatic's line is "buy once, get every format".

**But they all deliver through an account library, and we don't.** A buyer logs in and the files are
there; the link is tied to a person. Walterin's link arrives in an email and is tied to nothing. That
one difference is the whole argument: for them, unlimited costs nothing because the link isn't
portable. For us, an unlimited link in a forwardable email is a permanent free distribution point,
and with **no DRM** (confirmed by Veronka, 29 Sep 2026) the download limit is the *only* technical
control that exists.

So: copying "unlimited" from publishers whose delivery model is different would be copying the
number without the thing that makes it safe.

## 3. Recommendation

> **Decided by Veronka, 29 Sep 2026: 5, no expiry stated.** My recommendation below was 10;
> the reasoning is kept because it is the argument to revisit if the test order shows the limit
> counts **per file**. The prepared clause is `docs/legal/prepared-terms-7-update.md`.

**Recommended: 10. No expiry stated.**

Why 10, arithmetically — the number has to survive a real customer's life, not a theoretical one:

- Each variant carries **two files** (PDF + EPUB) — confirmed by Veronka, 29 Sep 2026 — and each
  file downloaded counts once. So a
  "full set" is 2.
- A normal reader takes the set on a phone and a laptop, sometimes a tablet: 4–6.
- Add one failed download on bad wifi, and one re-download after a new phone: 8.

10 clears that with room, and a leaked link still dries up. Anyone who does hit it has clearly
either lost their files or shared the email — and in both cases Veronka can raise the variant's
limit or re-send the link in a few clicks, so hitting the limit is an inconvenience, never a lost
purchase.

Why not lower: 5 is the number that looks sensible and isn't. With two files it is two and a half
sets — a customer with a phone and a laptop is already at 4, and one bad download tips them over.
That buys nothing and generates support email.

Why not unlimited: see §2. No DRM, no account, a forwardable link.

**Two things to confirm in the test order**, because the docs don't settle them and I won't guess:
1. Whether the limit counts **per file** (PDF and EPUB separately) or **per order**. If it turns out
   to be per order, 10 is very generous and 6 would do.
2. Whether the emailed link still works a few weeks later. If Shopify does expire it silently, the
   Terms need a sentence about it and we should consider a third-party app before physical launch.

## 4. Terms 7.1 and 7.2 — proposed wording

Replaces the live 7.1 and 7.2, which say nothing about downloads, access or DRM. Both gaps are
mandatory pre-contract information for digital content (§ 5(1) of 108/2024).

### EN

> **7.1** We deliver the eBook as a download link sent by email after payment. The link can be used
> up to six times in total, shared between the PDF and the EPUB. There is no time limit on it. If it stops working, or you run out of downloads,
> write to support@walterin.com and we will send you a new one.
>
> **7.2** eBooks are in PDF and EPUB format. To open them you need a device and an application that
> reads these formats. **The files carry no technical protection (no DRM)** — they open in any
> reader, on as many of your own devices as you like, and they keep working if you change device.
> We do not supply updates to an eBook after you have bought it.

### SK

> **7.1** E-knihu dodáme ako odkaz na stiahnutie, ktorý vám pošleme e-mailom po zaplatení. Odkaz sa
> dá použiť spolu najviac šesťkrát, dokopy za PDF aj EPUB. Časovo obmedzený nie je. Ak prestane fungovať alebo vyčerpáte počet
> stiahnutí, napíšte na support@walterin.com a pošleme vám nový.
>
> **7.2** E-knihy sú vo formáte PDF a EPUB. Na ich otvorenie potrebujete zariadenie a aplikáciu,
> ktoré tieto formáty čítajú. **Súbory nemajú žiadnu technickú ochranu (DRM)** — otvoríte ich
> v ľubovoľnej čítačke, na toľkých vlastných zariadeniach, koľko chcete, a fungujú aj po výmene
> zariadenia. Po kúpe k e-knihe nedodávame aktualizácie.

Notes on the drafting:

- **"no DRM" is stated, not implied.** Veronka confirmed there is none; § 5(1) requires
  interoperability and technical-protection information, and "we didn't mention it" is not an
  answer.
- **The updates sentence is new.** § 852i covers updates to digital content. For a book supplied as
  a single act the honest answer is that there are none, and saying so closes the question. **This
  one needs the lawyer's eye** — it is question 4 in `docs/legal/LAWYER-QUESTIONS.md`.
- **"PDF and EPUB", not "or".** Confirmed 29 Sep 2026: every eBook ships both files. The live
  Terms say "or", which is why 7.2 is being rewritten.
- 7.3 (personal use, no sharing) is unchanged and does not conflict: keeping your own copies on your
  own devices is not sharing.

---

> **Decided and live, 9 October 2026: six downloads, shared between the two files.**
> Not ten. The recommendation above was written before the decision and was never updated, so for
> a fortnight this document and the site disagreed. The wording in this file now matches what is
> actually published: Terms 7.1, the FAQ answer "Six times in total, shared between the two
> files", and the Prague product FAQ. If you change the number, change it in all four places and
> here, in the same step.
