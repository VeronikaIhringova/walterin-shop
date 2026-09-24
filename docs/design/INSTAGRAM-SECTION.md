# Instagram section — the plan

> Six most recent posts from @walterincomics at the end of every product page, refreshing itself.
> Written 24 Sep 2026. Nothing built yet.

## The short version

Build it ourselves: a small scheduled worker outside Shopify refreshes the token, fetches the six
posts and serves them — and their images — from our own domain. **The token never touches Shopify,
and a visitor's browser never contacts Meta.**

The two reasons not to use an app are design and privacy, and both matter here more than the build cost.

---

## 1 · Which API

**Instagram API with Instagram Login.** Not the Facebook route.

Instagram Basic Display was shut down on **4 December 2024**. Two configurations replaced it:

| | Instagram Login | Facebook Login |
| --- | --- | --- |
| Facebook Page required | **no** | yes |
| Host | `graph.instagram.com` | `graph.facebook.com` |
| Scope we need | `instagram_business_basic` | `instagram_basic` + `pages_read_engagement` |

We have a Facebook Page connected, but the Facebook route buys nothing for a six-post grid — its
extra powers are insights and ads — and it adds a dependency: if the Page link changes, the feed
breaks. Fewer moving parts wins.

**Prerequisite, and it is not optional:** @walterincomics must be an Instagram **Business or Creator**
account. Meta's media reference states the API "cannot be used to get data for media owned by
personal Instagram accounts". Switching is free and takes a minute in the Instagram app.

**The call:**

```
GET https://graph.instagram.com/v25.0/<IG_ID>/media
    ?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp
    &limit=6
    &access_token=<TOKEN>
```

Two things the renderer must tolerate: `media_url` **is omitted when a post contains copyrighted
material**, and for a Reel or video `media_url` is an .mp4 — the still to show is `thumbnail_url`.

## 2 · Setup on the Meta side

**No App Review. No Business Verification.** Meta's App Review page says it plainly: for
"an app only for a business I own or manage", Instagram Login with Standard Access is
**not required** to be reviewed. Review applies to tech providers serving multiple businesses.

1. Create a Meta app, type **Business**.
2. **Instagram → API setup with Instagram business login.**
3. Click **Generate token**, log in as @walterincomics, copy the token.

That token is **long-lived and valid 60 days immediately**. There is no OAuth server to build and no
redirect URI to host — which removes most of the apparent complexity of this job.

A privacy-policy URL is mandatory in the App Dashboard (Meta Platform Terms §4.a). We have one.

## 3 · The token, and keeping it alive

| Token | Lasts |
| --- | --- |
| Short-lived (OAuth only — we never use this) | 1 hour |
| **Long-lived, from the App Dashboard** | **60 days** |
| Refreshed long-lived | 60 days from the refresh |

```
GET https://graph.instagram.com/refresh_access_token
    ?grant_type=ig_refresh_token&access_token=<TOKEN>
```

Conditions: the token must be **at least 24 hours old and not yet expired**. One call, any time
between day 1 and day 60, resets the clock — indefinitely, forever, as long as it keeps happening.

**If it lapses it cannot be refreshed.** A human re-authorises: open the App Dashboard, click
Generate token, paste it into the worker's secret store. About a minute, and only if the refresh has
failed for sixty consecutive days.

The worker refreshes **daily**, so there are 59 chances to recover from a bad day before anything
breaks.

## 4 · Why not Shopify Flow

Two independent reasons, either one fatal:

1. **The store is on Basic.** Flow's *Send HTTP request* action is "only available to the Shopify
   Plus, Advanced, or Grow plans".
2. **Even on a higher plan it could not work.** Flow has a real secrets store, but no action can
   *write* a secret — they are created by hand in Settings. So Flow could call the refresh endpoint
   but would have to put the new token in a metafield. And **metafields are always readable in
   Liquid regardless of their storefront-access setting** — Shopify's own documentation says so, and
   adds that "sensitive credentials should be stored in environment variables or a dedicated secret
   management system". A token in a metafield is a token in the theme.

Shopify Functions cannot make network requests and have no scheduled invocation. Liquid cannot fetch
at all. There is no cron in Shopify other than Flow's scheduled trigger.

## 5 · The architecture

**Changed from the first draft, for a verified reason.** Shopify no longer lets anyone create an
admin-created custom app — "You can no longer create new admin-created custom apps. Existing apps are
unaffected." So the worker cannot simply be handed an Admin API token to write a metafield. Building
a Dev Dashboard app and running OAuth, just to store six posts, is more machinery than this deserves.

So the worker keeps everything and Shopify holds nothing:

```
Cloudflare Worker            ← the only thing to set up
   ├─ the Instagram token lives here, in the Worker's secret store
   ├─ cron, once a day:  refresh the token → fetch 6 posts → store in Workers KV
   └─ serves two things to the storefront, from our own domain:
         GET /feed        the six posts as JSON (no token in it)
         GET /img/<id>    the image bytes, proxied and cached

Theme section: fetches /feed when it scrolls into view. Renders, or stays hidden.
```

**No Shopify app, no Admin API token, no OAuth, no metafield.** One service, one secret store.

**The images still never come from Meta.** The worker fetches them and serves them from its own
domain, so a visitor's browser contacts Cloudflare — our own processor — and never Instagram. The
data-protection argument in §8 is preserved exactly; this only removes the Shopify credentials.

**What the storefront receives** — only things already public:

```json
{ "fetched_at": "2026-09-24T09:00:00Z",
  "posts": [ { "permalink": "...", "img": "/img/1789…", "caption": "…",
               "timestamp": "…", "type": "IMAGE" } ] }
```

**Cache: the worker writes once a day; the /feed response carries a one-hour cache header.** The rate
limit is `4800 × impressions` per 24 hours — tens of thousands, so it is not a constraint. The
constraint is not calling Instagram per page view, which this avoids entirely: the storefront only
ever talks to our worker.

**One trade-off, stated plainly.** The grid is rendered by JavaScript after the page loads, not by
Liquid. It sits at the very bottom of the page, loads only when scrolled to, and reserves its own
space so nothing jumps. With JavaScript off, the section does not appear — which is the same
behaviour as any failure, and the page is complete without it.

## 6 · What happens when it fails

**The section does not render.** Not an empty grid, not a spinner, not an error.

Two conditions, both required, checked before anything is drawn:

- **no posts → no section.** The band disappears and the page closes up, exactly the way Look inside
  does for a product with no spreads.
- **stale data → no section.** If the worker has not written for seven days, the section hides
  itself rather than showing posts from a month ago. A dead feed is worse than no feed, because it
  makes the shop look abandoned.

Instagram being down for an hour changes nothing at all — the page talks to our worker, and the
worker is serving yesterday's stored copy. Instagram would have to be unreachable for seven
consecutive days before a visitor noticed, and what they would notice is a section that is not there.

## 7 · Build vs app, honestly

| | **Build it** | **Instafeed (free tier)** |
| --- | --- | --- |
| Cost | £0 (Worker free tier) | £0, or $8/mo for disconnect alerts |
| Setup | ~half a day | ~20 minutes |
| **Matches our design system** | **yes — it is our section** | **no.** Their markup, their cards. Overriding it is fighting someone else's CSS on every update |
| Six posts, no watermark, no view cap | yes | yes — the only free tier with no traffic ceiling |
| Token refresh | daily, automatic | not advertised as automatic; every app in this category has a "reconnect your account" help page |
| Year-one maintenance | re-authorise if 60 days of failures; otherwise nothing | occasional reconnect; you find out by noticing, unless you pay for alerts |
| Privacy policy | one line about the API | must disclose Meta as a recipient of visitor data |
| If it breaks | I fix it | support ticket |

**Neither route removes the human.** No product here promises permanent hands-off tokens.

**My recommendation: build it.** The deciding factor is not cost, it is the brief — "our design system
throughout, no rounded app-style cards". An embedded app widget is the opposite of that, and every
hour spent overriding its CSS is an hour spent making someone else's component look like ours, which
breaks again when they ship an update.

**The honest cost of my recommendation:** the worker is infrastructure outside Shopify. It is about
fifty lines and free, but it is a thing you cannot fix alone if it breaks while I am not here. If
that is the wrong trade three weeks before print, Instafeed's free tier is a genuinely good product
and we can swap to our own section afterwards.

## 8 · Privacy — the part that actually decides it

**Fashion ID (CJEU C-40/17, 2019):** a site embedding third-party content is a **joint controller**
for the data sent to that third party, *even though it never sees that data*. The EDPB's 2024
guidance confirms the rule is technology-agnostic — it is not only about cookies.

- **Hot-linking Instagram's CDN** (what every app does) means every visitor's browser contacts Meta
  on page load, carrying their IP and user-agent. On EU traffic that belongs behind the consent
  banner, and the privacy policy must name Meta as a recipient. Instafeed's own privacy policy admits
  it: "Displaying Instagram content may cause the visitor's browser to request that content from
  Instagram."
- **Re-hosting the six images on Shopify's CDN** means no third-party request, no Meta contact, no
  consent question for this section at all. The policy still needs a line saying we pull posts from
  the Instagram API — but the visitor-facing processing disappears.

For a store whose default market is Slovakia, that difference is worth more than the half day.

## 9 · The design

Our system throughout. Ink, paper, yellow, WalterinBold, the ink frame and hard shadow. No rounded
app cards, no gradients, no Instagram logo lockup.

- **Grid** — six posts, 3 × 2 on desktop, 2 × 3 on phones. Square crops in the ink frame the gallery
  already uses. The section heading and its line sit in the content frame like every other section;
  the grid follows the same 108px / 31px edge.
- **Panel** — clicking a post opens it in place: the image on one side, the caption on the other,
  the date under it, and **← →** to move between the six without closing. Escape closes, focus
  returns to the tile that opened it. This is the same dialog pattern as "See the whole system" on
  the tarot page, so it is one behaviour, not a new one.
- **Follow** — one `wui-btn` to `instagram.com/walterincomics`. Ink on yellow, like every other
  primary button.
- Spacing from `docs/design/SPACING.md`; the section owns no vertical padding.
- Captions are Instagram's own words, so they can be long — clamp to a readable column and let the
  panel scroll rather than the page.

## 10 · What I need from you

1. ~~Switch @walterincomics to a Business account~~ — already done.
2. **Create the Meta app and generate the token** — `docs/INSTAGRAM-SETUP.md`.
3. Decide: **build it** (my recommendation) or **Instafeed** for now.
4. A Cloudflare account. Free tier, one worker. Step-by-step in `docs/INSTAGRAM-SETUP.md`.

Then: mock-ups at 1440 and 390 before a line of it goes near the live theme.
