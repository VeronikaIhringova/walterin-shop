# Re-download from the customer account: which app

Research, 30 Sep 2026. **Nothing installed, nothing changed.**

The ask: a logged-in customer opens their order and downloads the eBook again. Plus a **per-file
limit of 8** — the PDF eight times and the EPUB eight times, counted separately.

---

## The finding that decides it

**Shopify's own Digital Products app cannot do either.**

- **Customer account:** the download button works only with **classic** customer accounts, needs
  hand-edited theme files, and is **not supported on new customer accounts**. Shopify staff have
  called it "on the roadmap" with no date.
- **Per-file limit:** the limit is set **per variant**, not per file. One counter shared by the PDF
  and the EPUB. "8 per file" is not expressible.

So this is not a preference between apps. Both requirements need a different app.

**Knock-on effect:** the prepared Terms 7.1 says "Each file can be downloaded up to 8 times". On the
current app that sentence would be untrue. See `docs/legal/prepared-terms-7-update.md` — either the
app moves first, or the wording changes.

## Comparison

One correction to the field: **"Downloadable Digital Assets (DDA)" and "Fileflare" are the same
app** — Kestrel Commerce renamed it. Same listing.

| | Customer account | Per-file limit | Basic | Price needed | Branded page | Switching | Reviews |
|---|---|---|---|---|---|---|---|
| **Shopify Digital Products** (now) | Classic only, theme edits, **new accounts unsupported** | **No — per variant** | Yes | Free | None; bare link | — | 4.8 / 1317 |
| **Fileflare** (= ex-DDA) | **New and classic, both documented.** App blocks, no theme code | **Yes — per-asset**, settable on a single file | Yes | **$19/mo** ($190/yr) | Yes, own domain | Auto-sync, CSV bulk-attach, **historical order import** | 4.9 / ~186 |
| **Filemonk** | Download button in account; new-vs-classic **never stated — unverified**. **Replaces** the download page rather than adding to it | **Yes — per file**, shows "3 / 100" to the customer | Yes | **$10/mo** | Yes | Manual; no documented order import | 4.9 / ~497 |
| **Sky Pilot** | Unverified | Unverified | Yes | $9 / $24.99 | Yes | Unverified | — |
| **SendOwl** | **Its own account system, not Shopify's** — fails the ask | Per order (3/5/10 — 8 may not be selectable) | Yes | $39/mo | Yes | Unverified | — |
| **Alva** | Unverified (claim is third-party, not their docs) | Unverified | Yes | Free / $8.99 / $18.99 | Unverified | Unverified | 5.0 / only 11 |
| **BIG Digital Downloads** | Unverified | Unverified | Yes | Free / $12.49 | Unverified | Unverified | — |

## Recommendation: Fileflare, Basic tier, $19/mo — but run a 20-minute test first

Fileflare is the only app where **both** deciding factors are stated in its own documentation rather
than inferred:

1. **New customer accounts, explicitly**, via app blocks with no theme code. That matters on
   Shopify Basic, where app blocks in customer accounts don't need checkout extensibility. Every
   competitor except Filemonk is silent; Filemonk is only strongly implied.
2. **Per-file limits are native** — "per-link, per-asset", and a single file's cap can be set on its
   own row. PDF=8 and EPUB=8 is exactly the feature, and it is on the free tier. The $19 buys the
   customer-account part.
3. **The switch is safe.** Products auto-sync; a historical order import remaps past orders so
   earlier buyers keep access. Irrelevant at zero orders, but it means a later change of mind isn't
   a trap. Both apps can run in parallel; disable the old one only after a clean test delivery.
4. **Additive.** Fileflare adds an account library *and* keeps a branded download page. Filemonk's
   customer-account mode **replaces** the download page.

**The honest weakness: $19/mo is ~$228/year against a 100-copy first edition.** Filemonk does the
same job for $10 and is far better reviewed (497 vs 186). The one thing I could not verify is
whether Filemonk's download button actually renders on the **new** customer-account order page.

So: **install Filemonk on its 14-day trial, enable the account block, log in as a test customer.**
If the button appears, take Filemonk and save $9/mo. If it doesn't, take Fileflare. I won't
recommend Filemonk on faith, and I won't spend the extra $9/mo without checking first.

**Runner-up: Filemonk.** Cheaper, better reviewed, per-file limit confirmed and even shows the
customer their remaining count — nicer than Fileflare. Lost on three things: new-account support
never stated, it replaces rather than supplements the download page, and no documented
historical-order import.

## Two things to fix whichever app wins

**1. Neither app does per-customer language.** Fileflare says so plainly ("templates are
single-language"); Filemonk's language is one global setting, "independent of your Shopify store
language". Slovak is available — as a single global choice, so half the customers get the wrong
language. That is not acceptable for an EN + SK store.

The fix, which both vendors recommend and which is better architecture anyway:
- turn off the app's own download email;
- put the download link into **Shopify's own order confirmation email**;
- translate it per language with Translate & Adapt.

Native SK and EN, and one fewer email per order. It also lands in the same email as the legal block
already prepared in `docs/legal/emails/order-confirmation-legal-block.md`, so the customer gets one
message that does everything.

**2. Keep the limit at 8, not lower.** Fileflare's docs warn that mail-server bots and antivirus
scanners pre-fetch links and burn a download before the customer clicks. 8 per file leaves headroom.

## Data residency

Fileflare is **US-based** and transfers EU personal data to the US under standard contractual
clauses. If EU residency matters, it can be pointed at your own S3-compatible bucket (Cloudflare R2,
Backblaze B2, Wasabi) in an EU region, holding only references — but that is gated to the Growth
tier ($29). For two eBook files and a small run, SCCs are almost certainly sufficient. Flagged
because it is a transfer, and any new processor has to be added to the privacy policy section 3
before it goes live.

## Before anything is installed

Installing an app, attaching files, disabling Digital Products and adding a customer-account app
block are all store and theme writes. None of it happens without "OK live", and it would be staged
and read back first.

Sources: [Fileflare customer accounts](https://fileflare.io/docs/customer-account-downloads/) ·
[Fileflare limits](https://fileflare.io/docs/download-limitations/) ·
[Fileflare pricing](https://fileflare.io/pricing/) ·
[Fileflare migration](https://fileflare.io/docs/migration/) ·
[Filemonk per-file limit](https://filemonk.crisp.help/en/article/limit-the-number-of-downloads-per-order-ziyrex/) ·
[Filemonk customer accounts](https://filemonk.crisp.help/en/article/let-customers-download-files-from-customer-account-pages-15sqje/) ·
[Shopify Digital Products help](https://help.shopify.com/en/manual/products/digital-service-product/digital-downloads) ·
[Shopify app: classic accounts only](https://digitaldownloads.tawk.help/article/add-download-files-button-to-customer-account-order-history)
