# Instagram feed — the setup, click by click

> For Veronka. Assumes you have never opened either of these dashboards.
> Two parts, about 30 minutes in total. Do Part 1 first — Part 2 needs the token from it.
>
> **Dashboards get redesigned.** If a button is not where this says, look for the same *words* rather
> than the same position, and tell me what you see instead of guessing.

---

# Part 1 · Meta — get the token

## 1. Sign in as a developer

Go to **developers.facebook.com** and click **Log in** (top right). Use the Facebook account that
manages the Walterin page.

The first time, it asks you to register as a developer: accept the terms, confirm your email, and
pick anything for "What best describes you" — it changes nothing.

## 2. Create the app

Click **My Apps** (top right) → **Create app**.

| It asks | You do |
| --- | --- |
| App name | `Walterin Instagram Feed` — internal only, nobody sees it |
| App contact email | your email |
| **What do you want your app to do?** | choose the option about **Instagram** / accessing Instagram data. If you are offered a plain list of app *types* instead, choose **Business**. |
| Business portfolio | pick the Walterin one if offered; "I don't want to connect" is fine too |

Click **Create app**. It may ask for your Facebook password.

> **You do not need App Review, and you do not need Business Verification.** Those are for apps that
> serve *other people's* businesses. If the dashboard nudges you toward "Submit for review", ignore
> it — we only ever read our own account.

## 3. Add a privacy policy URL

In the left sidebar: **App settings → Basic**.

In **Privacy Policy URL** paste:

```
https://walterin.com/policies/privacy-policy
```

Click **Save changes** at the bottom. Meta requires this; the app will not work properly without it.

## 4. Connect Instagram and generate the token

In the left sidebar find **Instagram**. Click it, then look for **API setup with Instagram business
login** (there are usually two options — the other one mentions Facebook Login; **do not** pick that).

You will see numbered steps. You need the one called **"Generate access tokens"**.

1. Click **Add account** — or **Generate token** if the account is already listed.
2. An Instagram login window opens. Log in as **@walterincomics**.
3. It asks you to allow the app to access the account. Say yes.
4. A long string of letters and numbers appears. **Copy it.**

**Keep that string somewhere private for the next twenty minutes** — a note on your machine is fine,
but not a shared doc, not email, not Slack. It is a password. When Part 2 is done, delete your copy.

While you are here, also copy:

- **Instagram account ID** — a long number shown next to the account on the same screen.
- **App secret** — sidebar **App settings → Basic**, next to *App secret*, click **Show**.

Send me the account ID. **Do not send me the token or the app secret** — you will paste those into
Cloudflare yourself in Part 2, and nowhere else.

---

# Part 2 · Cloudflare — the thing that keeps it alive

This is the piece that refreshes the token every day so you never have to think about it again.

## 1. Make an account

Go to **cloudflare.com** → **Sign up**. Email and a password. Free plan. You do **not** need to move
walterin.com to Cloudflare, and you should not — this is a separate free service that happens to run
small programs.

Verify your email when it arrives.

## 2. Create the worker

In the left sidebar: **Compute (Workers)** → **Workers & Pages** → **Create** → **Start with Hello
World** (or **Create Worker**).

| It asks | You do |
| --- | --- |
| Name | `walterin-instagram` |
| Everything else | leave as it is |

Click **Deploy**. It will show a URL like:

```
https://walterin-instagram.<something>.workers.dev
```

**Send me that URL** — the theme needs it. It is not secret.

## 3. Create the storage

Left sidebar: **Storage & Databases → KV** → **Create a namespace**.

Name it exactly:

```
WALTERIN_IG
```

Click **Add**. This is where the six posts and the current token are kept.

## 4. Paste in the secrets

Back to **Workers & Pages → walterin-instagram → Settings**.

Find **Variables and Secrets** and add these **three**, each one as type **Secret** (not "Text" —
Secret means it is write-only and cannot be read back out of the dashboard):

| Name | Value |
| --- | --- |
| `IG_TOKEN` | the long token from Part 1, step 4 |
| `IG_APP_SECRET` | the App secret from Part 1 |
| `IG_USER_ID` | the Instagram account ID from Part 1 |

Click **Deploy** / **Save**.

Now **delete your own copy of the token**. From this point Cloudflare holds it, refreshes it, and
replaces it — the value you pasted stops being current within a day anyway.

## 5. Bind the storage to the worker

Same **Settings** page, find **Bindings** → **Add** → **KV namespace**.

| Field | Value |
| --- | --- |
| Variable name | `WALTERIN_IG` |
| KV namespace | the one you made in step 3 |

Save.

## 6. Set the schedule

Same **Settings** page → **Triggers** (or **Cron Triggers**) → **Add Cron Trigger**.

Enter exactly:

```
0 4 * * *
```

That means "every day at 04:00 UTC" — the middle of the night here, so a refresh never happens while
people are shopping.

Save.

## 7. Tell me you are done

Send me:

- the worker URL from step 2,
- the Instagram account ID.

I will put the code into the worker, confirm the first fetch works, and build the section in preview.

---

## What you will never have to do again

Nothing. The worker refreshes the token every night. Each refresh buys another 60 days, and it has
59 chances to recover from a bad night before anything expires.

## The one thing that could go wrong, and what it looks like

If the refresh fails **every night for sixty nights** — Meta changing something, the account being
disconnected — the token expires and cannot be revived. You would then repeat **Part 1, step 4**
(two minutes) and paste the new token into Cloudflare as in **Part 2, step 4**.

Until you did, **the section would simply not appear on the site.** No error, no empty box, no broken
layout — the page would look exactly as it does today, with the Instagram band absent. That is
deliberate: a feed showing month-old posts makes a shop look abandoned, and a visible error makes it
look broken. Missing is the safest of the three.

I will also set the worker to email you if a refresh fails twice in a row, so you find out in week
one rather than month two.
