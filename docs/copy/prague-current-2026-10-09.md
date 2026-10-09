# Walterin Prague — what is on the page right now

> Read-only audit, 9 October 2026. Nothing was changed.
> Sources: a cookie-free fetch of **walterin.com** (EN with `Accept-Language: en-GB`, SK with
> `Accept-Language: sk-SK`, `<html lang="sk">` confirmed), the Admin API (read-only), a
> `shopify theme pull` of live theme **164726866249** into a scratch folder, and the repo.
>
> The live theme and the repo are identical today except for one file: `snippets/legal-guarantee.liquid`
> exists on the live theme and not in the repo. It is not used by the Prague page.

---

## 0 · Which products are "Prague"

| Handle | Title | Status | Live URL | Prague? |
|---|---|---|---|---|
| `walterin-prague` | Walterin Prague – Comic Book | **ACTIVE** | `/products/walterin-prague` → 200 | **Yes — this report** |
| `stickers` | Walterin Prague Sticker Set | **ACTIVE** | `/products/stickers` → 200 | Yes, a Prague product (€12,50, "Coming soon"). Not covered in detail here. |
| `prague-tarot` | Walterin Prague Tarot Cards | DRAFT | `/products/prague-tarot` → 302 (not public) | Yes, but empty: no description, no metafields, one image `TAROT.jpg` with empty alt, €17,90. SEO title/description are set. |
| `t-shirt` | Walterin Prague T-shirt (The Absinth Drinker & Green Fairy) | DRAFT | → 302 (not public) | Yes, a Prague product. €25,00, one colour "White", three images. |
| `walterin-paris` | Walterin Paris | DRAFT | → 302 (not public) | **No — not Prague.** It is the next city in the same series, with the same two-option structure (Language English/French × Format). Its description still says **"140+ illustrated pages"**, the figure that was corrected to 180 on Prague. |

**Answer to the question in the brief:** `walterin-paris` is a *sibling in the Walterin city series*,
not a Prague product. It is a draft, has no metafields beyond SEO, and is not reachable on the live site.

`walterin-prague` has **four** variants, not two: Language (English · Czech) × Format
(Digital Interactive Edition · Printed Collector's Edition). The eBook and the printed edition are
*Format* values, and the two languages double them.

| Variant | SKU | Price | Available | Tracked | Weight |
|---|---|---|---|---|---|
| English / Digital Interactive Edition | *(empty string)* | €16,00 | true | **false** | 0 kg |
| English / Printed Collector's Edition | *(null)* | €24,00 | false | true | **0 kg** |
| Czech / Digital Interactive Edition | *(empty string)* | €16,00 | true | **false** | 0 kg |
| Czech / Printed Collector's Edition | *(null)* | €24,00 | false | true | **0 kg** |

No compare-at prices are set, so no "was" price is ever shown. **No SKU is set on any variant**, and
**no shipping weight is set on the two printed variants.**

---

# Part A — every text on the page, in page order

Quoted exactly. **🇬🇧 = English string appearing on the Slovak page.**

## A.0 — Header (shared, above the product)

| # | What it is | English | Slovak | Where it lives |
|---|---|---|---|---|
| 1 | Announcement bar | `Welcome, curious traveller` | `Vitajte, zvedaví cestovatelia` | theme locale `walterin.home.announcement` |
| 2 | Nav | `WALTERIN` · `SHOP` · `ABOUT` | `WALTERIN` · `OBCHOD` · `O NÁS` | Shopify menu (store data), translated |
| 3 | Language switch | `EN` `English` · `SK` `Slovenčina` | identical | theme |
| 4 | Icons | `Search` · `Log in` · `Cart` | `Vyhľadať` · `Prihlásiť sa` · `Košík` | theme locale |
| 5 | Logo image | alt `Walterin` | alt `Walterin` | `walterin_currentCollor_logo_827049bc-…svg` |

**There is no breadcrumb on this page.** The word "breadcrumb" does not appear in the rendered HTML
in either language, and no breadcrumb markup is emitted.

## A.1 — Gallery (left column)

Six images, in this order. The thumbnail strip repeats the same six with **alt=""** (correct — they
are decorative duplicates).

| # | File | EN alt | SK alt |
|---|---|---|---|
| 1 | `walterin-prague-illustrated-comic-guide-book-cover.jpg` | `Walterin Prague illustrated comic guide book with witty cover design stacked on a white background` | `Ilustrovaná komiksová kniha Walterin Praha s vtipnou obálkou, na bielom pozadí` |
| 2 | `walterin-prague-witty-illustrated-comic-guide-book-outdoor.jpg` | `Witty illustrated Prague comic guide book by Walterin photographed outdoors on stone pavement` | `Vtipná ilustrovaná komiksová kniha o Prahe od Walterina, odfotená vonku na dlažbe` |
| 3 | `walterin-prague-illustrated-comic-guide-book-in-hands.jpg` | `Person holding the Walterin Prague illustrated comic guide book featuring witty cultural stories` | `Človek drží ilustrovanú komiksovú knihu Walterin Praha s vtipnými príbehmi z kultúry` |
| 4 | `walterin-prague-comic-pages-illustrated-stories-look-inside.jpg` | `Look inside the Walterin Prague book showing illustrated comic pages and witty 9 frame mini stories` | `Pohľad do knihy Walterin Praha: ilustrované komiksové strany a vtipné príbehy v deviatich okienkach` |
| 5 | `PRODUCT_BOOK2.jpg` | `Walterin Prague – Comic Book` *(fallback: the product title, no real alt is set)* | `Walterin Praha – komiksová kniha` *(same fallback)* |
| 6 | `PRODUCT_BOOK.jpg` | `Walterin Prague – Comic Book` *(fallback)* | `Walterin Praha – komiksová kniha` *(fallback)* |

Other gallery strings:

| What it is | English | Slovak |
|---|---|---|
| Slide counter | `1 / 6` | `1 / 6` |
| Track aria-label | `Product images. Swipe or use the arrow keys.` | `Fotky produktu. Potiahnite prstom alebo použite šípky.` |
| Thumb nav aria-label | `Image` | `Fotka` |
| Thumb aria-labels | `Image 1` … `Image 6` | `Fotka 1` … `Fotka 6` |
| Zoom link aria-label | `Enlarge image: <alt>` | `Zväčšiť fotku: <alt>` |

**Images 5 and 6 have no alt text of their own** — the theme falls back to the product title, which is
not a description of the picture.

## A.2 — Buy column

| # | What it is | English | Slovak | Where it lives |
|---|---|---|---|---|
| 1 | H1 | `Walterin Prague – Comic Book` | `Walterin Praha – komiksová kniha` | product title + SK translation |
| 2 | Price | `€16` | `€16` | variant price (changes to `€24` on the printed edition) |
| 3 | Availability pill | `Available from October 23rd` | `Dostupné od 23. októbra` | `snippets/launch-date.liquid` row `walterin-prague\|digital\|20261023` + locale `walterin.launch.from` / `date_20261023`. On the printed edition the pill reads `Coming soon` / `Už čoskoro`. |
| 4 | Shipping line *(hidden for the eBook, shown for the printed edition)* | `Shipping calculated at checkout` | `Doprava sa vypočíta v pokladni` | locale `walterin.buy.shipping` |
| 5 | Option 1 legend | `Language` | `Jazyk` | product option name + SK translation |
| 6 | Option 1 values | `English` · `Czech` | `Angličtina` · `Čeština` | option values + SK translations |
| 7 | Option 2 legend | `Format` | `Formát` | product option name + SK translation |
| 8 | Option 2 values | `Digital Interactive Edition` · `Printed Collector’s Edition` | `Digitálna interaktívna edícia` · `Tlačená zberateľská edícia` | option values + SK translations |
| 9 | Note 1 | `180 pages of Prague, in English or Czech.` | `180 strán Prahy, po anglicky alebo po česky.` | metafield `walterin.price_note` (+ SK translation) |
| 10 | Note 2 | `The eBook arrives the moment you pay. The printed book is a softcover, 129 × 207 mm.` | `E-kniha príde hneď, ako zaplatíte. Tlačená kniha je mäkká väzba, 129 × 207 mm.` | metafield `walterin.choice_note` (+ SK) |

### Notify form (there is no Add to cart — nothing is buyable yet)

| What it is | English | Slovak | Where it lives |
|---|---|---|---|
| Field label (screen-reader only) | `Email address` | `E-mailová adresa` | template setting `notify_label` + Translate & Adapt |
| Placeholder | `Your email address` | `Váš e-mail` | template setting `notify_placeholder` + T&A |
| Button | `Notify me` | `Dajte mi vedieť` | template setting `notify_button` + T&A |
| Checkbox | `And the newsletter: what's new, what's next.` | `Aj newsletter: čo je nové a čo chystáme.` | locale `walterin.notify.newsletter` |
| Note | `One email when it's ready. That's all.` | `Jeden e-mail, keď bude hotový. Nič viac.` | locale `walterin.notify.note` |
| Privacy link | `Privacy policy` → `/policies/privacy-policy` | `Ochrana osobných údajov` → `/sk/policies/privacy-policy` | template setting `privacy_link` + T&A |
| Hidden tag written on submit | `walterin-prague-waitlist,walterin-prague-waitlist-v1` | same | section liquid |
| Success message (not visible until submit) | `You're on the list. One email when it's ready.` | `Ste na zozname. Keď to bude, pošleme jeden e-mail.` | template setting `notify_success` + T&A |

The hidden input `contact[accepts_marketing]` is `value="true"` in the rendered HTML; the checkbox
above it is what the script uses to decide the `newsletter` tag.

### Accordions, in order

**1 · `About the book` / `O knihe`** — heading from locale `walterin.product.walterin-prague_about_heading`.

> **EN** Prague across 180 pages, drawn as nine‑frame comics. The city, its history and the things that happened in it, the way Walter Ihring saw them and drew them.
>
> It is not a guidebook with opening hours. It reads as well at a kitchen table as it does on the way there.

> **SK** Praha na 180 stranách, rozkreslená do deväťobrázkových komiksov. Mesto, jeho história a to, čo sa v ňom stalo — tak, ako to Walter Ihring videl a nakreslil.
>
> Nie je to sprievodca s otváracími hodinami. Číta sa rovnako dobre pri kuchynskom stole ako cestou tam.

**2 · `What you get` / `Čo dostanete`**

> **EN** Two editions of the same book.
> - The printed book — softcover, 129 × 207 mm, 180 pages, full colour
> - The eBook — a high‑resolution PDF and a fixed‑layout EPUB, both together
> - In the eBook: a clickable contents page and a jump link on every chapter
> - English or Czech — you choose before you order

> **SK** Dve vydania tej istej knihy.
> - Tlačená kniha — mäkká väzba, 129 × 207 mm, 180 strán, plnofarebná tlač
> - E-kniha — PDF vo vysokom rozlíšení a EPUB s pevným rozložením, oboje spolu
> - V e-knihe: preklikateľný obsah a odkaz na každú kapitolu
> - Po anglicky alebo po česky — vyberiete si pred objednávkou

Then the spec table, inside the same accordion (from metafield `walterin.specs` + its SK translation):

| EN label | EN value | SK label | SK value |
|---|---|---|---|
| `Pages` | `180` | `Strany` | `180` |
| `Size` | `129 × 207 mm` | `Rozmer` | `129 × 207 mm` |
| `Binding` | `Softcover` | `Väzba` | `Mäkká` |
| `Print` | `Full colour` | `Tlač` | `Plnofarebná` |
| `Languages` | `English · Czech` | `Jazyky` | `Angličtina · Čeština` |
| `eBook` | `PDF · EPUB` | `E-kniha` | `PDF · EPUB` |

**3 · `Reading it on a screen` / `Čítanie na obrazovke`**

> **EN** You get both files: a high-resolution PDF and a fixed-layout EPUB. The drawings keep their proportions on either one, which is the point — the pages were laid out as pages.
>
> The contents page is clickable and every chapter has a jump link. It reads on a desktop, a tablet, a phone and on fixed-layout readers.

> **SK** Dostanete obidva súbory: PDF vo vysokom rozlíšení a EPUB s pevným rozložením. Kresby si na oboch držia proporcie — o to ide, strany boli navrhnuté ako strany.
>
> Obsah je preklikateľný a každá kapitola má svoj odkaz. Číta sa na počítači, tablete, telefóne aj na čítačkách s pevným rozložením.

**4 · `As a gift` / `Ako darček`**

> **EN** An original gift for the people closest to you: your partner, your mum, your dad or a friend.
>
> You’re giving a piece of art unlike anything they already have. Pick the language they love to read in. It’s sure to make anyone happy, and it lasts a lifetime.

> **SK** Originálny darček pre blízkych: pre partnera, maminu, ocina či kamaráta.
>
> Darujete kúsok umenia, aký váš blízky ešte nemá. Vyberte jazyk, v ktorom rád číta. Poteší každého a vydrží celý život.

**5 · `About Walter` / `O Walterovi`**

> **EN** Walter Ihring is a Slovak author who turns what he knows and has experienced into short, funny stories. They become books and other things that make people happy.
>
> He loves drawing funny cartoons, characters and caricatures, and has plenty of competitions under his belt. In 2015 he published Walterin Bratislava, a city told in comics. Since then, more cities have followed, and not just books, but tarot cards and stickers too.

> **SK** Walter Ihring je slovenský autor, ktorý svoje vedomosti a zážitky premieňa na krátke vtipné príbehy. Vznikajú z nich knihy a iné produkty, ktoré ľudí tešia.
>
> Rád kreslí humor, postavičky a karikatúry a má za sebou množstvo súťaží. V roku 2015 vyšla jeho kniha Walterin Bratislava, mesto rozprávané komiksom. Odvtedy pribúdajú ďalšie mestá a nielen knihy, ale aj tarotové karty či nálepky.

Accordions 3–5 come from the **theme language files** (`locales/en.default.json` / `locales/sk.json`,
keys `walterin.product.*`), not from the product metafields. See CONTRADICTORY #2.

There is **no** "Delivery" accordion (the template sets `delivery_digital` to empty and
`show_delivery_physical` to false) and **no** "When can I have it?" accordion (removed 9 Oct 2026).

### Sticky bar (appears on scroll)

| What it is | English | Slovak |
|---|---|---|
| Thumbnail | cover image, `alt=""` | same |
| Name | `Walterin Prague` | `Walterin Praha` (metafield `walterin.short_title`) |
| Line under it | `€16 · English` | `€16 · Angličtina` |
| Button | `Notify me` | `Dajte mi vedieť` |

### Strings present in the HTML but not visible today

| String | EN | SK | Note |
|---|---|---|---|
| `data-sold-out` | `Sold out` | `Vypredané` | used by the script if a variant sells out |
| `data-unavailable` | `Not available` | `Nie je k dispozícii` | |
| `data-switched` | `That combination isn’t available. Switched to [value].` | `Táto kombinácia nie je k dispozícii. Prepnuté na [value].` | |
| `data-wui-remaining-template` | **`[n] of 100 left`** | **🇬🇧 `[n] of 100 left`** | Hidden `<span>`; the section setting `show_remaining` is off, so it never renders. It is **English on the Slovak page** and it contains **a stock number**, which the ground-truth rule forbids. It is the schema default in `sections/walterin-buy.liquid` (line ~1362) and was never overridden for this template. The tarot template *does* have a Slovak override (`Zostáva [n] zo 100`); Prague does not. |
| Per-variant JSON | `"date": "Available from October 23rd"` / `"Coming soon"`, `"price": "€16"` / `"€24"` | `"Dostupné od 23. októbra"` / `"Už čoskoro"` | drives the pill and the price when you switch option |

## A.3 — "Look inside" / "Pozrite dovnútra"

| What it is | English | Slovak | Where it lives |
|---|---|---|---|
| Heading | `Look inside` | `Pozrite dovnútra` | template `product.walterin-prague-book.json` → `look_inside.title`, SK via Translate & Adapt |
| Lead | `Nine frames to a story, the same way the tarot works.` | `Deväť obrázkov na príbeh — presne ako v tarote.` | same, `look_inside.lead` |
| Image | `walterin-prague-look-inside-comic-illustrated-pages.png` (mobile: `walterin-prague-look-inside-comic-pages-mobile.png`) | same files | |
| Image alt | `Look inside pages from Walterin Prague showing full-colour 9-frame comic stories and illustrated mini-scenes.` | `Pohľad do knihy Walterin Praha: farebné komiksové príbehy v deviatich okienkach a ilustrované scénky` | |

**🇬🇧 The image itself has English marketing copy baked into the artwork, and it shows on the Slovak
page:**

> `TAKE A LOOK INSIDE`
> `Original 9 frame stories, historical facts, playful illustrations.`
> `Everything in one place!`

That is English on `/sk/`, it duplicates the section's own heading directly above it, and "9 frame"
is the naming the brand retired in favour of "nine-frame". This was already flagged in
`docs/design/PRAGUE-PAGE-COPY.md` §2 on 24 Sep and is still live.

## A.4 — FAQ section

| What it is | English | Slovak |
|---|---|---|
| Heading | `FAQ` | **🇬🇧 `FAQ`** *(the same string in both; the footer link to the same page is translated as `Časté otázky`, so the page is inconsistent with itself)* |
| Link | `All questions` → `/pages/faq` | `Všetky otázky` → `/sk/pages/faq` |

| # | EN question | EN answer | SK question | SK answer |
|---|---|---|---|---|
| 1 | `What is the difference between the digital and the printed edition?` | `The digital edition is two files you read on a screen, and it arrives by email. The printed edition is a softcover book, 129 × 207 mm, full colour, and it comes by post.` | `Aký je rozdiel medzi digitálnym a tlačeným vydaním?` | `Digitálne vydanie sú dva súbory, ktoré čítate na obrazovke, a príde e-mailom. Tlačené vydanie je kniha v mäkkej väzbe, 129 × 207 mm, plnofarebná, a príde poštou.` |
| 2 | `What do I get with the eBook?` | `A PDF and an EPUB — both, every time. Six downloads in total between the two files, and no copy protection, so they open in any reader on as many of your own devices as you like.` | `Čo dostanem s e-knihou?` | `PDF aj EPUB — vždy oba. Spolu šesť stiahnutí dokopy za oba súbory a žiadna ochrana proti kopírovaniu, takže sa otvoria v ktorejkoľvek čítačke na toľkých vašich zariadeniach, koľko chcete.` |
| 3 | `What language is it in?` | `English or Czech, whichever you pick.` | `V akom jazyku to je?` | `Po anglicky alebo po česky, podľa toho, čo si vyberiete.` |
| 4 | `How long is it?` | `180 pages.` | `Aké je to dlhé?` | `180 strán.` |

Source: `locales/*.json` → `walterin.product_faq.q.walterin-prague_*`.

## A.5 — The shop (the "you may also like" row)

| What it is | English | Slovak |
|---|---|---|
| Heading | `The shop` | `Obchod` |

Three cards, in this order:

| Card | Pill | EN title | SK title | Price |
|---|---|---|---|---|
| 1 | `Available from October 23rd` / `Dostupné od 23. októbra` | `Walterin Prague` / `Comic Book` | `Walterin Praha` / `komiksová kniha` | `From €16,00` / `Od €16,00` |
| 2 | `Coming soon` / `Už čoskoro` | `Tarot of Consciousness:` / `A Graphic Journey` | `Komiksový tarot vedomia` | `€39,00` |
| 3 | `Coming soon` / `Už čoskoro` | `Walterin Prague` / `Sticker Set` | `Walterin Praha` / `Sada nálepiek` | `€12,50` |

Theme boilerplate rendered but visually hidden on each card: `Regular price`, `Sale price`,
`Unit price`, `/`, `per` — SK `Normálna cena`, `Cena po zľave`, `Jednotková cena`, `/`, `za`.

The heading is **not** the template setting. The template says `"title": "You may also like"` and
Translate & Adapt has a Slovak override `Mohlo by sa vám páčiť`, but
`sections/featured-collection.liquid` line 67 ignores both and prints
`{{ 'walterin.home.shop_heading' | t }}`. Two dead settings. See CONTRADICTORY #7.

Card 2's image alt: EN `Tarot of Consciousness: A Graphic Journey`, SK `Komiksový tarot vedomia`
(product-title fallback, no real alt).
Card 3's image alt: `Two sheets of Walterin Prague stickers in clear sleeves, overlapping on a white
surface. Each sheet is headed “Walterin · Prague stickers”.` / `Dva hárky nálepiek Walterin Praha v
priehľadných obaloch, položené cez seba na bielej ploche. Každý hárok má hlavičku „Walterin · Prague
stickers“.`

## A.6 — Footer (shared)

| What it is | English | Slovak |
|---|---|---|
| Newsletter heading | `Subscribe to our emails` | **🇬🇧 `Subscribe to our emails`** |
| Newsletter subtext | `For curious minds who love witty history.` / `Stories full of lively banter and wanderings, straight to your inbox.` | **🇬🇧 identical, untranslated** |
| Email field label | `Email` | `E-mail` |
| Newsletter button | `Subscribe` | **🇬🇧 `Subscribe`** |
| Consent line | `By signing up, you agree to our Privacy Policy.` | `Prihlásením súhlasíte so Zásadami ochrany osobných údajov.` |
| Column 1 heading | `NAVIGATE` | **🇬🇧 `NAVIGATE`** |
| Column 1 links | `Walterin` · `Shop` · `About` · `Where to Find Us` | `Walterin` · `Obchod` · `O nás` · `Kde nás nájdete` |
| Column 2 heading | `SOCIAL` | **🇬🇧 `SOCIAL`** |
| Column 2 links | `Instagram` · `Tiktok` · `LinkedIn` | `Instagram` · `TikTok` · `LinkedIn` |
| Column 3 heading | `OFFICIAL` | **🇬🇧 `OFFICIAL`** |
| Column 3 links | `Privacy` · `Terms` · `FAQ` · `Contact` | `Ochrana súkromia` · `Obchodné podmienky` · `Časté otázky` · `Kontakt` |
| Column 4 heading | `SUPPORT` | **🇬🇧 `SUPPORT`** |
| Column 4 links | `We’re here M-F 9:00 –⁠ 17:00 (CET).` · `Drop us a note anytime.` | `Sme tu Po–⁠Pi 9:00–⁠17:00.` · `Napíšte nám kedykoľvek.` |
| Cookie link | `Cookie preferences` | `Nastavenia cookies` |
| Payments | `Payment methods` | `Spôsoby platby` |
| Copyright | `© 2026 Walterin s. r. o. All rights reserved.` | `© 2026 Walterin s. r. o. Všetky práva vyhradené.` |
| Credits | `illustrations by Walter Ihring · design & development by Veronika Ihringová` | `ilustrácie Walter Ihring · dizajn a vývoj Veronika Ihringová` |
| Screen-reader notes | `Choosing a selection results in a full page refresh.` · `Opens in a new window.` | `Výber bude mať za následok obnovenie celej stránky.` · `Otvorí sa v novom okne.` |

The five untranslated footer strings live in `sections/footer-group.json`
(`heading` / `subtext` / `button_label` on the `email_signup` and `link_list` blocks) and have no
Slovak override in Translate & Adapt.

## A.7 — SEO

| | English | Slovak |
|---|---|---|
| `<title>` | `Walterin Prague – Comic Book` | `Walterin Praha \| Ilustrovaná kniha príbehov a vreckové dejiny` |
| `og:title` | `Walterin Prague – Comic Book` | `Walterin Praha \| Ilustrovaná kniha príbehov a vreckové dejiny` |
| Meta description | `Discover Prague through 180 illustrated pages, comic storytelling, and visual humour in this witty, design-driven book. Available as eBook or premium print.` | `Objavte Prahu na 180 ilustrovaných stranách: komiksové príbehy a vizuálny humor v dôvtipnej knihe s dôrazom na dizajn. Ako e-kniha alebo tlačená kniha.` |

**No SEO title is set in English.** `seo.title` is `null`, so the English page title is just the
product title. The Slovak page *does* have a `meta_title` translation
(`Walterin Praha | Ilustrovaná kniha príbehov a vreckové dejiny`) and Shopify marks it
**`outdated: true`** — it is a translation of an English title that no longer exists. The two
languages therefore have page titles of a completely different shape.

---

# Part B — every fact about the book, and where it comes from

| Fact | Value as written | Where it comes from |
|---|---|---|
| Page count | `180` | Product description (EN+SK) · metafield `walterin.price_note` · metafield `walterin.specs` (`Pages: 180`) · locale `walterin-prague_box_1` · locale FAQ `walterin-prague_pages` (`180 pages.`) · meta description (EN+SK) · `docs/WALTERIN-GROUND-TRUTH.md` §4 ("**180 pages. Exactly 180**") · `docs/products/WALTERIN-PRAGUE.md` §2 · `docs/design/PRAGUE-PAGE-COPY.md` |
| Trim size (printed) | `129 × 207 mm` | metafield `walterin.choice_note` · metafield `walterin.specs` (`Size`) · locale `walterin-prague_box_1` · locale FAQ `walterin-prague_formats` · ground truth §4 |
| Binding | `Softcover` / `Mäkká` | metafield `walterin.specs` (`Binding`) · locale `walterin-prague_box_1` · `choice_note` · FAQ answer 1 · ground truth §4 |
| Print | `Full colour` / `Plnofarebná` | metafield `walterin.specs` (`Print`) · locale `walterin-prague_box_1` · FAQ answer 1 · ground truth §4 |
| Formats | `Digital Interactive Edition` · `Printed Collector’s Edition` | Shopify product option "Format" (+SK) |
| Format names (planned, not live) | `Interactive eBook` · `Printed book` | `docs/products/WALTERIN-PRAGUE.md` §3 and locale `walterin.buy.value.ebook/print` — **not** what the page shows |
| Languages of the book | `English · Czech` / `Angličtina · Čeština` | Shopify product option "Language" · metafield `walterin.specs` (`Languages`) · `price_note` · locale `walterin-prague_box_4` · FAQ answer 3 |
| Slovak edition | not offered | Only `docs/products/WALTERIN-PRAGUE.md` §3 mentions a Slovak edition, "SK coming, TO CONFIRM when". Nothing on the live site. |
| eBook file types | `PDF` and `EPUB`, "a high‑resolution PDF and a fixed‑layout EPUB, both together" | metafield `walterin.specs` (`eBook: PDF · EPUB`) · locale `walterin-prague_box_2` and `_note_lead` · FAQ answer 2 · Terms 7.2 |
| eBook interactivity | `a clickable contents page and a jump link on every chapter` | locale `walterin-prague_box_3` · locale `walterin-prague_note_text` |
| eBook devices | `It reads on a desktop, a tablet, a phone and on fixed-layout readers.` | locale `walterin-prague_note_text` |
| DRM | none — `no copy protection` / Terms: `The files carry no technical protection (no DRM)` | product FAQ answer 2 · live Terms §7.2 |
| Download limit | **`Six downloads in total between the two files`** / Terms: `The link allows six downloads in total, shared between the PDF and the EPUB. There is no time limit on the link.` | product FAQ answer 2 · `/pages/faq` ("Six times in total, shared between the two files.") · live Terms §7.1 |
| Delivery, eBook | `arrives by email` / `The eBook arrives the moment you pay.` | metafield `walterin.choice_note` · FAQ answer 1 |
| Delivery, printed | `it comes by post`; `Shipping calculated at checkout` | FAQ answer 1 · locale `walterin.buy.shipping` |
| Prices | eBook `€16`, printed `€24` (identical for English and Czech) | Shopify variants · rendered price · ground truth §4 |
| Compare-at price | none set on any variant | Admin API |
| Launch date, eBook | `Available from October 23rd` / `Dostupné od 23. októbra` (23 October 2026) | `snippets/launch-date.liquid` row `walterin-prague\|digital\|20261023` · locale `walterin.launch.date_20261023` · ground truth §4 |
| Launch date, printed | `Coming soon` / `Už čoskoro` — no date | `snippets/launch-date.liquid` row `walterin-prague\|physical\|soon` · ground truth §4 |
| Story structure | `nine‑frame comics` / `deväťobrázkových komiksov`; `Nine frames to a story, the same way the tarot works.` | product description · template `look_inside.lead` |
| Genre / what it is | `It is not a guidebook with opening hours.` | product description |
| Author | `Walter Ihring` | product description · `About Walter` accordion |
| Cover title line | `·Walterin· PRAGUE` | cover artwork, images 1–3 |
| Cover subtitle | `PAGE BY PAGE STORIES` | **cover artwork only** — this phrase appears nowhere in the site copy, the metafields, the locale files or any doc |
| Cover author credit | `·BY CARTOONIST· WALTER IHRING` | cover artwork, images 1–3 |
| Interior page numbers visible in the images | `24` (phone mock-up) · `28`, `29` (gallery spread) · `28`, `29`, `57`, `58`, `79`, `80` (Look-inside PNG) | images 4 and 6, and `walterin-prague-look-inside-comic-illustrated-pages.png` |
| Chapter titles visible in the images | `EQUESTRIAN STATUE OF SAINT WENCESLAUS` · `SAINT CHARLES IV AND THE GOLDEN AGE OF PRAGUE` · `CHARLES IV` · `SAINT PROCOPIUS` · `SAINT ADALBERT` · `THE HOUSE AT THE GOLDEN APPLE` · `THE HOUSE AT THE TWO SUNS` · `THE KING OF FRANCE, EXILE IN PRAGUE` · `THE KING OF FRANCE IN PRAGUE CASTLE` | images 4 and 6, and the Look-inside PNG |
| Layout fact readable in the images | each story page carries a nine-panel grid with a one-line footnote underneath, e.g. `· CHARLES IV WAS BORN IN 1316 AND DIED IN PRAGUE IN 1378 · HE'S BURIED AT SAINT VITUS CATHEDRA ·` | images 4 and 6 |
| Shopify standard metafields (set, not shown on the page) | `shopify.book-cover-type` (1 value) · `shopify.genre` (6 values) · `shopify.language-version` (2) · `shopify.target-audience` (2) — all metaobject references, values not rendered anywhere on the page | Admin API |
| Earlier, now-corrected page count | `140` → corrected to 180 everywhere on Prague | ground truth §4. The figure survives only on the **draft** `walterin-paris` ("140+ illustrated pages"). |

## MISSING — facts with no source anywhere

Searched: the live HTML in both languages, the product description, every metafield in every
namespace, the six product images plus the Look-inside artwork, and `grep -ri` across `docs/`,
`templates/`, `sections/`, `snippets/` and `locales/`.

1. **ISBN.** The string "ISBN" does not appear anywhere — not in the store, not in the repo, not on
   any image. No back cover is photographed.
2. **Publisher / imprint.** No publisher is named on the page or in any metafield. The company
   (`Walterin s. r. o.`) appears only in the footer copyright and the Terms. A draft FAQ answer in
   `docs/design/PRAGUE-PAGE-COPY.md` §3 says "Walter Ihring draws it and we publish it" — never
   published to the site.
3. **Publication year.** Not stated. The only date anywhere is the eBook launch, 23 October 2026.
4. **Number of stories / chapters.** Nowhere. The copy says "nine‑frame comics" and "180 pages" but
   never how many stories there are. The Look-inside image says only "Original 9 frame stories".
5. **Paper / stock of the printed book.** The tarot has `270 g/m²` and a matte finish; Prague has
   nothing. No gsm, no paper name, no cover stock, no finish, no lamination.
6. **eBook file size.** Not stated — relevant for a high-resolution PDF.
7. **Printed book weight and spine width.** Both printed variants have weight `0 KILOGRAMS` in
   Shopify, which is a missing value, not a fact.
8. **SKUs.** Empty or null on all four variants. `docs/products/WALTERIN-PRAGUE.md` §3 proposes
   `WT-PRG-BOOK-EN` etc.; none of them is set.
9. **GPSR / product-safety data for the printed book.** `docs/products/WALTERIN-PRAGUE.md` §10 still
   lists it as an open question.
10. **Printing country / printer.** Not stated anywhere.
11. **Whether the Czech edition is a translation or a separate edition.** Not stated.
12. **Shipping times and carrier for the printed edition.** Deliberately absent (Pack4you unsigned) —
    noted here so it is not mistaken for an oversight.

## CONTRADICTORY — the same fact said two ways

**1 · The "As a gift" text exists twice, in two different wordings.**

- Live (from `locales/en.default.json` → `walterin.product.gift_lead` / `gift_text`):
  > `An original gift for the people closest to you: your partner, your mum, your dad or a friend.`
  > `You’re giving a piece of art unlike anything they already have. Pick the language they love to read in. It’s sure to make anyone happy, and it lasts a lifetime.`
- Still in the admin, metafield `walterin.notes` on product `gid://shopify/Product/9279897338185`
  (heading "As a gift"):
  > `For someone who is going to Prague, or who has been and keeps talking about it.`
  > `The printed book is a softcover you can put in a coat pocket. If you need it to arrive by a particular day, write to us before you order and we will tell you whether it is possible.`

The metafield version is **not rendered** (`sections/walterin-buy.liquid` runs the metafield path only
`{%- unless has_locale -%}`, and Prague has a locale entry), but it is what anyone reading the admin
will see, and it has a full Slovak translation in Translate & Adapt.

**2 · The "About Walter" text exists twice.**

- Live (locale `walterin.product.walter_lead` / `walter_text`): `Walter Ihring is a Slovak author who turns what he knows and has experienced into short, funny stories…`
- Metafield `walterin.notes`: `Walter Ihring draws humour and caricature. The drawings travel to exhibitions abroad and every now and then come home with an award.` … `In 2015 came Walterin Bratislava, a city told in comics. Prague is the next city, and the tarot is the first deck.`
- And a third, longer version on the About page: `Walter Ihring is a Slovak illustrator and author who has spent more than three decades drawing the world with wit, precision…` (see Report 2).

Three biographies of the same man, three different lengths, three different claims.

**3 · Download limit: six on the site, ten in the docs.**

- Live, product FAQ: `Six downloads in total between the two files`
- Live, `/pages/faq`: `Six times in total, shared between the two files. There is no time limit on the link.`
- Live, Terms §7.1: `The link allows six downloads in total, shared between the PDF and the EPUB.`
- `docs/legal/ebook-download-limits.md` line 84, the recommended Terms wording:
  `**7.1** We deliver the eBook as a download link sent by email after payment. The link can be used up to 10 times.`
- `docs/launch/EBOOK-LAUNCH.md` lines 39–40: `Recommendation is now **10 downloads, no expiry stated**`

The site is internally consistent at **six**; the two documents recommend **ten** and were never
updated after the decision. The documents are the stale side, but nothing in them says so.

**4 · A "When can I have it?" accordion that no longer exists.**

Metafield `walterin.preorder_note` still holds `When can I have it?` / `Not yet. Leave your email
above and we write once, the day it can be bought — nothing else.` with a full Slovak translation
(`Kedy ju dostanem?`). `sections/walterin-buy.liquid` lines 900–907 say it was removed on 9 Oct 2026
and "the metafield is left alone in admin — nothing reads it now." It is dead data that reads like
live copy.

**5 · The "What you get" list exists twice.**

Metafield `walterin.included` (rich text, EN+SK) holds exactly the same four bullets as locale
`walterin-prague_box_1`…`_4`. Today they match word for word. Two copies of the same sentence in two
systems is a contradiction waiting to happen: whichever one is edited next, the page will show the
other.

**6 · Two headings for the related-products row.**

- `templates/product.walterin-prague-book.json` → `related.settings.title`: `You may also like`
- Translate & Adapt, SK override for that setting: `Mohlo by sa vám páčiť`
- What actually renders: `The shop` / `Obchod`, from `sections/featured-collection.liquid` line 67,
  `{{ 'walterin.home.shop_heading' | t }}`

Both settings are dead. Editing the template heading in the theme editor would change nothing.

**7 · Two different pages 28–29.**

- `walterin-prague-comic-pages-illustrated-stories-look-inside.jpg` (gallery image 4) shows a spread
  numbered **28** and **29**, headed `SAINT CHARLES IV AND THE GOLDEN AGE OF PRAGUE` and `CHARLES IV`.
- `walterin-prague-look-inside-comic-illustrated-pages.png` (the Look inside section) shows its first
  spread numbered **28** and **29**, headed `SAINT PROCOPIUS` and `SAINT ADALBERT`.

Both are on the same page, a few hundred pixels apart. One of the two mock-ups uses placeholder page
numbers. The other spreads in the Look-inside image are 57–58 and 79–80.

**8 · English page title vs Slovak SEO title.**

The product has **no** `seo.title`, so the English page title is the raw product title
`Walterin Prague – Comic Book`. The Slovak locale has a `meta_title` translation,
`Walterin Praha | Ilustrovaná kniha príbehov a vreckové dejiny`, which Shopify flags
`outdated: true`. It matches the SEO title proposed in `docs/products/WALTERIN-PRAGUE.md` §8
(`Walterin Prague | Illustrated book of stories & pocket history`) — the English half of which was
never set.

**9 · Option names: the store vs the product file.**

- Live: `Digital Interactive Edition` · `Printed Collector’s Edition`
- `docs/products/WALTERIN-PRAGUE.md` §3: `Interactive eBook` · `Printed book`, with a note that
  "Digital Interactive Edition / Printed Collector's Edition: TO CONFIRM whether to keep
  'Collector's'." Still unconfirmed, still live.
- The theme's own vocabulary (`locales/*.json` → `walterin.buy.value.ebook` / `.print`) also says
  `Interactive eBook` / `Printed book`.

**10 · A stock number in a hidden string, in English only.**

`[n] of 100 left` sits hidden in the HTML of both the English and the Slovak page
(`data-wui-remaining-template`). It is never shown today because `show_remaining` is off, but it is
the default that would appear the day someone switches stock display on — in English on `/sk/`, and
with a figure the ground truth forbids showing at all.

**11 · The Look-inside artwork contradicts the brand's own naming.**

The image says `Original 9 frame stories`; the copy everywhere else says `nine‑frame` /
`deväťobrázkový`. The image is also English on the Slovak page.
