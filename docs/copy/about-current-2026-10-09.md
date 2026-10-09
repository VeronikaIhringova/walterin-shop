# The About page — what is on it right now

> Read-only audit, 9 October 2026. Nothing was changed.
> Sources: a cookie-free fetch of **walterin.com** (EN `Accept-Language: en-GB`, SK
> `Accept-Language: sk-SK`, `<html lang="sk">` confirmed), the Admin API (read-only), and a
> `shopify theme pull` of live theme **164726866249** into a scratch folder, diffed against the repo.

---

## 1 · The URL

| URL | Status | Note |
|---|---|---|
| `https://walterin.com/pages/about-us` | **200** | The real page. This is what the footer and the header both link to (`href="/pages/about-us"`, `aria-current="page"`). |
| `https://walterin.com/sk/pages/about-us` | **200** | Slovak. `<html lang="sk">` confirmed. |
| `https://walterin.com/pages/about` | **404** | **Does not exist.** |
| `https://walterin.com/sk/pages/about` | **404** | Does not exist. |
| `https://walterin.com/pages/o-nas` | **404** | Does not exist; the Slovak URL keeps the English handle. |

Canonical EN: `https://walterin.com/pages/about-us`. Canonical SK:
`https://walterin.com/sk/pages/about-us`. `hreflang` pairs are correct.

The page in the admin: `gid://shopify/Page/139414896969`, handle `about-us`, title `About Us`,
**template suffix `about`** → it renders `templates/page.about.json`. There is only one About page in
the store; the full page list is contact, about-us, privacy-policy, terms-and-conditions, faq,
drop-us-a-note-anytime, withdrawal, where-to-find-us.

---

## 2 · The one thing that explains everything below

`templates/page.about.json` has four sections, and the last one is:

```json
"main": { "type": "main-page", "disabled": true }
```

`main-page` is the section that prints the page's own body. **It is switched off.** So the page's
body — which exists in the admin in English *and* in a complete, approved Slovak translation — is
never rendered. Everything a visitor reads comes from three sections whose text is typed into the
template JSON, and **none of that text has a Slovak translation**.

That is why the Slovak page is entirely English, and why its meta description is in Slovak: the
description is generated from the page body, which is translated; the visible page is section text,
which is not.

Confirmed: `shopify theme pull` of theme 164726866249 → `templates/page.about.json` is byte-identical
to the repo, `"disabled": true` on line 119. And
`translatableResources(resourceType: ONLINE_STORE_THEME_JSON_TEMPLATE)` returns **no entry at all**
for `page.about` — templates `product`, `product.tarot`, `product.walterin-prague-book` and
`page.where-to-find-us` all have Slovak section translations; `page.about` has none.

---

## 3 · The full text, section by section, in page order

**🇬🇧 marks a string that is English on the Slovak page.** On this page that is the entire body.

### Section 0 — Header (shared)

| What it is | English | Slovak |
|---|---|---|
| Announcement bar (paragraph) | `Welcome, curious traveller` | `Vitajte, zvedaví cestovatelia` |
| Nav links | `WALTERIN` · `SHOP` · `ABOUT` | `WALTERIN` · `OBCHOD` · `O NÁS` |
| Language switch | `EN English` · `SK Slovenčina` | identical |
| Icon labels | `Search` · `Log in` · `Cart` | `Vyhľadať` · `Prihlásiť sa` · `Košík` |

Lives in: theme locale (`walterin.home.announcement`) and Shopify navigation menus (store data).
Both are translated.

---

### Section 1 — `rich_text_FABgJQ` (type `rich-text`)

**Heading** (rendered as `<h2 class="rich-text__heading rte h2">`, bold, centred):

- EN: `HI, MY NAME IS WALTER IHRING`
- SK: **🇬🇧** `HI, MY NAME IS WALTER IHRING`

**Paragraph** (the first sentence is bold):

- EN:
  > **Walter Ihring is a Slovak illustrator and author who has spent more than three decades drawing the world with wit, precision, and an eye for the quietly extraordinary.** His linework carries a gentle irony; his humour is subtle yet sharp, attuned to fleeting moments most people overlook. He first gained recognition in the Slovak cartoon scene by blending observational humour with elegantly restrained line art.
- SK: **🇬🇧** identical, untranslated.

**A disabled button block** sits in this section (`button_Y7BWer`, `"disabled": true`, label
`Button label`, no link). It renders nothing.

**Where it lives:** section settings in `templates/page.about.json`, block `heading_HKiFia`
(`settings.heading`) and block `text_krW8A3` (`settings.text`). Proof:

```
templates/page.about.json:
  "heading": "<p><strong>HI, MY NAME IS WALTER IHRING</strong></p>"
  "text": "<p><strong>Walter Ihring is a Slovak illustrator and author who has spent more than
           three decades drawing the world with wit, precision, and an eye for the quietly
           extraordinary.</strong> His linework carries a gentle irony; …"
```

The section also carries two `custom_css` overrides: `/* Left-align everything */* {text-align: left
!important;}` and `/* Keep all headings centered */h1,h2,h3,h4,h5,h6 {text-align: center !important;}`.

---

### Section 2 — `17640782699c48ebbe` (type `_blocks` → app block `ai_gen_block_f719dfb`)

One image, full width, with a hover-zoom lens (`data-zoom-enabled="true"`, `data-zoom-scale="2"`,
`data-lens-size="400"`, `max_width: 650`).

| | |
|---|---|
| Filename | `illustrated_biography_pixel_e4117d82-0460-4764-857f-344ed512bf0f.png` |
| Rendered size | 1806 × 2858 |
| **Alt text, EN** | **EMPTY** (`alt=""`) |
| **Alt text, SK** | **EMPTY** (`alt=""`) |
| Caption | none |

**Where it lives:** `templates/page.about.json` → section `17640782699c48ebbe` → block
`ai_gen_block_f719dfb_JNQd4e` → `"image": "shopify://shop_images/illustrated_biography_pixel_…png"`.
The alt comes from the file's own alt in Shopify Files
(`blocks/ai_gen_block_f719dfb.liquid:257` → `alt="{{ block.settings.image.alt | escape }}"`), and that
alt is unset.

---

### Section 3 — `rich_text_kdg7nb` (type `rich-text`)

No heading. Five paragraphs, left-aligned, all English in both languages.

**Paragraph 1** (EN, and 🇬🇧 identical on SK):
> In **2016**, he was awarded the **Zlatý Gunár (Golden Gander)** for outstanding caricature at the festival **Kremnické Gagy** — one of Slovakia’s most established humour and satire festivals. (Official website: [https://gagy.eu](https://gagy.eu))In **2017**, he returned as a **jury member** in the same category — a role reserved almost exclusively for previous winners. His drawings have been exhibited in Slovakia and abroad, and critics often highlight the clarity of his ink work and the quiet sharpness of his humour.

*(The missing space after `)` before `In 2017` is in the source, not a transcription error: the HTML
reads `…(Official website: <a href="https://gagy.eu">https://gagy.eu</a>)In <strong>2017</strong>…`)*

**Paragraph 2** (EN, and 🇬🇧 identical on SK):
> Ihring’s work has also appeared in mainstream print. In **May 2010**, he wrote and illustrated the feature **„Walter Ihring o ženách“** for the Slovak edition of **Playboy** (issue 5/2010). In this playful essay, he reflected on the differences between men and women with characteristic tongue-in-cheek comparisons — dividing women into “fire-engine” and “racing-car” types, contemplating how feminine beauty fuels his creative energy, and admitting that drawing brings calm to both him and his wife. This rare print appearance shows how naturally his humour resonates beyond the traditional circle of cartoon enthusiasts.

**Paragraph 3** (EN, and 🇬🇧 identical on SK):
> In **2015**, Ihring transformed his love of travel, cities, and history into the illustrated guidebook ***Walterin Bratislava*** — a blend of comic storytelling, local history, and playful discovery.

**Paragraph 4** (EN, and 🇬🇧 identical on SK):
> In **2024**, he began building the digital platform **Walterin.com** and expanding *Walterin* into a fully developed illustrated series — bringing his visual storytelling, city narratives, and humour into a new, modern format accessible to readers worldwide.

**Paragraph 5** (EN, and 🇬🇧 identical on SK):
> Today, the Walterin series continues to grow, offering visual mini-stories that explore cities, culture, and human quirks through his distinct, gently ironic voice. When not drawing, Walter can often be found in a café, observing passers-by and collecting small human moments that later shape his illustrations.

**Where it lives:** `templates/page.about.json` → section `rich_text_kdg7nb` → block `text_xw8rpx` →
`settings.text`, one long HTML string holding all five paragraphs.

---

### Section 4 — `main` (type `main-page`) — **DISABLED, renders nothing**

This is the page's own body, and it is the only part of the About content that *is* translated. It
is worth quoting in full because it is still live data in the admin and still feeds the meta
description:

**EN body** (`page.body`):
> **Hi, My name is Walter Ihring** *(h1)*
>
> I devote my time to animated humour and caricatures. I like travelling, especially across India. My pictures also like travelling, especially for exhibitions in cities far away.
>
> On their return, they sometimes bring me an award as a souvenir from the competitions they had visited. On one hot day in summer, I was sipping my coffee in the square and observing the tourists as they were racing from the town hall to the cathedral, from the cathedral to the ancient fountain in order to quench their thirst for information.
>
> Hunting for the stories of the people who lived there, seeking to discover the secrets held by the streets they were walking upon. It was there that I decided to link sketching with history, travelling and humour and create for them an edition of amusing illustrated tourist guides. In 2015 I published a book about my hometown, Walterin Bratislava.
>
> **To prop up this story with facts, I enclose my illustrated biography.** *(h1)*
>
> *(image)* `witty-guide-walterin-6-1_jpg_480x480.webp`, 738 × 984, **alt EMPTY**

**SK body** (Translate & Adapt, `outdated: false`):
> **Ahoj, volám sa Walter Ihring** *(h1)*
>
> Venujem sa animovanému humoru a karikatúre. Rád cestujem, najmä po Indii. Moje obrázky tiež radi cestujú, hlavne na výstavy do vzdialených miest.
>
> Keď sa vrátia, niekedy mi z pretekov, ktoré navštívili, prinesú ako suvenír cenu. Raz v horúci letný deň som na námestí popíjal kávu a pozoroval turistov, ako sa ženú od radnice ku katedrále a od katedrály k starej fontáne, aby uhasili smäd po informáciách.
>
> Hľadali príbehy ľudí, ktorí tu žili, a tajomstvá ulíc, po ktorých kráčali. Vtedy som sa rozhodol spojiť kreslenie s históriou, cestovaním a humorom a vytvoriť pre nich edíciu zábavných ilustrovaných sprievodcov. V roku 2015 som vydal knihu o svojom rodnom meste, Walterin Bratislava.
>
> **Aby som tento príbeh podoprel faktami, prikladám svoj ilustrovaný životopis.** *(h1)*
>
> *(image)* same file, **alt `Ilustrovaný životopis Waltera Ihringa`**

Note the oddity: the **unused** Slovak version has a real alt text on its image; the **live**
English and Slovak pages have an empty one.

The page has **no metafields** of any kind.

---

### Section 5 — Footer (shared)

| What it is | English | Slovak |
|---|---|---|
| Newsletter heading | `Subscribe to our emails` | **🇬🇧 `Subscribe to our emails`** |
| Newsletter subtext | `For curious minds who love witty history.` / `Stories full of lively banter and wanderings, straight to your inbox.` | **🇬🇧 identical, untranslated** |
| Field label | `Email` | `E-mail` |
| Button | `Subscribe` | **🇬🇧 `Subscribe`** |
| Consent | `By signing up, you agree to our Privacy Policy.` | `Prihlásením súhlasíte so Zásadami ochrany osobných údajov.` |
| Column 1 heading | `NAVIGATE` | **🇬🇧 `NAVIGATE`** |
| Column 1 links | `Walterin` · `Shop` · `About` · `Where to Find Us` | `Walterin` · `Obchod` · `O nás` · `Kde nás nájdete` |
| Column 2 heading | `SOCIAL` | **🇬🇧 `SOCIAL`** |
| Column 2 links | `Instagram` · `Tiktok` · `LinkedIn` | `Instagram` · `TikTok` · `LinkedIn` |
| Column 3 heading | `OFFICIAL` | **🇬🇧 `OFFICIAL`** |
| Column 3 links | `Privacy` · `Terms` · `FAQ` · `Contact` | `Ochrana súkromia` · `Obchodné podmienky` · `Časté otázky` · `Kontakt` |
| Column 4 heading | `SUPPORT` | **🇬🇧 `SUPPORT`** |
| Column 4 links | `We’re here M-F 9:00 –⁠ 17:00 (CET).` · `Drop us a note anytime.` | `Sme tu Po–⁠Pi 9:00–⁠17:00.` · `Napíšte nám kedykoľvek.` |
| Cookie link | `Cookie preferences` | `Nastavenia cookies` |
| Payments label | `Payment methods` | `Spôsoby platby` |
| Copyright | `© 2026 Walterin s. r. o. All rights reserved.` | `© 2026 Walterin s. r. o. Všetky práva vyhradené.` |
| Credits | `illustrations by Walter Ihring · design & development by Veronika Ihringová` | `ilustrácie Walter Ihring · dizajn a vývoj Veronika Ihringová` |
| Screen-reader notes | `Choosing a selection results in a full page refresh.` · `Opens in a new window.` | `Výber bude mať za následok obnovenie celej stránky.` · `Otvorí sa v novom okne.` |

**Where it lives:** `sections/footer-group.json`. Proof for the untranslated ones:

```
sections/footer-group.json:36: "subtext": "<p><strong>For curious minds who love witty history.</strong><br/>Stories full of lively banter and wanderings, straight to your inbox.</p>"
sections/footer-group.json:35: "heading": "Subscribe to our emails"
sections/footer-group.json:38: "button_label": "Subscribe"
sections/footer-group.json:47: "heading": "NAVIGATE"
sections/footer-group.json:56: "heading": "SOCIAL"
sections/footer-group.json:65: "heading": "OFFICIAL"
sections/footer-group.json:74: "heading": "SUPPORT"
```

The link labels come from Shopify navigation menus (store data) and **are** translated; the copyright
and credits come from theme locales (`walterin.footer.copyright`, `walterin.footer.credits_html`) and
are translated.

---

## 4 · Every image on the page

| Image | Filename | Alt EN | Alt SK | Where it is set |
|---|---|---|---|---|
| Header logo | `walterin_currentCollor_logo_827049bc-8889-42e8-b877-2bed229c82d5.svg` | `Walterin` | `Walterin` | header section group / shop name |
| Body image (the only content image) | `illustrated_biography_pixel_e4117d82-0460-4764-857f-344ed512bf0f.png` | **EMPTY** | **EMPTY** | Shopify Files alt, via `blocks/ai_gen_block_f719dfb.liquid:257` |
| *(not rendered — in the disabled page body)* | `witty-guide-walterin-6-1_jpg_480x480.webp` | **EMPTY** | `Ilustrovaný životopis Waltera Ihringa` | page body HTML / its SK translation |

There are no other `<img>` elements in `<main>`. The payment-method marks in the footer are inline
SVG.

---

## 5 · Where each section's text lives — the summary table

| Section | Text lives in | In the repo? | Translated to SK? |
|---|---|---|---|
| Announcement bar | theme locale `walterin.home.announcement` | yes, `locales/*.json` | **yes** |
| Header menu | Shopify navigation menu (store data) | no | **yes** |
| 1 · Heading + lead paragraph | section setting, `templates/page.about.json` blocks `heading_HKiFia`, `text_krW8A3` | yes | **no** |
| 2 · Image | section setting (image handle), alt from Shopify Files | handle yes, alt no | n/a — alt is empty in both |
| 3 · Five paragraphs | section setting, `templates/page.about.json` block `text_xw8rpx` | yes | **no** |
| 4 · `main` page body | page body (store data) + Translate & Adapt | no | yes — but **the section is disabled, so it never shows** |
| 5 · Footer newsletter + column headings | `sections/footer-group.json` | yes | **no** |
| 5 · Footer link labels | Shopify navigation menus (store data) | no | **yes** |
| 5 · Footer copyright + credits | theme locale `walterin.footer.*` | yes | **yes** |

---

## 6 · SEO

| | English | Slovak |
|---|---|---|
| `<title>` | `About Us – Walterin` | `O nás – Walterin` |
| `og:title` | `About Us` | `O nás` |
| Meta description | `Hi, My name is Walter Ihring I devote my time to animated humour and caricatures. I like travelling, especially across India. My pictures also like travelling, especially for exhibitions in cities far away. On their return, they sometimes bring me an award as a souvenir from the competitions they had visited. On one ho` *(cut off by Shopify at ~320 characters, mid-word)* | `Ahoj, volám sa Walter Ihring Venujem sa animovanému humoru a karikatúre. Rád cestujem, najmä po Indii. Moje obrázky tiež radi cestujú, hlavne na výstavy do vzdialených miest. Keď sa vrátia, niekedy mi z pretekov, ktoré navštívili, prinesú ako suvenír cenu. Raz v horúci letný deň som na námestí popíjal kávu a pozoroval ` *(same cut)* |

**No SEO description is set on the page.** Shopify is auto-generating it from the page body — the
body that the template does not render. So the description that Google sees describes a version of
the page that no visitor ever reads, and it ends mid-word (`On one ho`, `a pozoroval `).

The page title is translated (`O nás`) while every word under it is not, which is the worst of both:
a Slovak search result that opens an English page.

---

## 7 · What this adds up to (three findings, no changes made)

1. **The Slovak About page is 100% English below the header.** Heading, lead and all five paragraphs
   are template section settings with no Translate & Adapt entry — `page.about` is the only
   content-bearing template in the store with *zero* Slovak section translations.
2. **A complete, approved Slovak About text already exists** as the page body translation, and is
   switched off. Re-enabling `main` is not the fix on its own (the body text is the older, shorter
   biography, and it would then appear *below* the newer section text), but the Slovak wording is
   there and does not need writing from scratch.
3. **There are now three different biographies of Walter on the site** — this page's "more than
   three decades…", the Prague/tarot product accordion's "Walter Ihring is a Slovak author who
   turns what he knows…", and the disabled page body's "I devote my time to animated humour…".
   They disagree on length, on register (third person vs first person) and on which facts matter.
