# Buttons — one component, everywhere

> Last changed 24 Sep 2026. The rules live in `assets/walterin-ui.css`; the component is
> `snippets/wui-button.liquid`.

## The two treatments, and only two

| | Looks like | For |
| --- | --- | --- |
| **Primary** | ink on yellow, ink frame, hard offset shadow, WalterinBold uppercase | the thing you want done: Add to cart, Check out, Send, Subscribe, Notify me |
| **Secondary** | paper fill, same ink frame and shadow | the alternative: Continue shopping, Close, Cancel |

Small square controls — quantity − / +, pagination, slider arrows, cart remove — take a **frame,
never a yellow fill**. They are controls, not calls to action; filling them yellow would make a page
of equal shouting.

**Ink on yellow is ~12:1. White on yellow is ~1.3:1 and is never allowed anywhere.**

## How it was applied without touching a hundred files

Dawn paints every button in the theme through one family of selectors — `.button`,
`.customer button`, `.shopify-challenge__button` — plus two ring pseudo-elements. Those selectors
are pointed at the Walterin button in `assets/walterin-ui.css`, so customer accounts, facets, the
404, the contact form, the newsletter and the cart all converted at once. Anything that is already
`.wui-btn` is skipped by a `:not(.wui-btn)`.

One theme setting was the root cause of the white-on-yellow: `colors_solid_button_labels` was
`#ffffff`. It is now `#222222`, which fixes the contrast of every Dawn button in one place — including
sections using the accent colour scheme, where the same pair was failing inverted.

## For a new button

Use the component:

```liquid
{% render 'wui-button', label: 'Notify me', type: 'submit' %}
{% render 'wui-button', label: 'Close', variant: 'secondary', size: 'sm' %}
```

Do not write a new button class. Do not set a colour on a button.

## What cannot be converted, and why

| | Why |
| --- | --- |
| **Apple Pay / Google Pay / Shop Pay** | Shopify renders these inside a closed shadow DOM. Only four published custom properties reach them, and the brand marks are contractually fixed. We set the height, corner radius and ink ring so they sit correctly next to Add to cart; the rest is Shopify's. |
| **"Buy it now"** (the unbranded fallback) | Converted — it is a real button in the light DOM. It needs Dawn's two ring pseudo-elements suppressed and its `min-width: 12rem` undone, both of which are done. |
| **The checkout** | A separate Shopify-hosted application. Nothing in this theme reaches it. Style it in admin under *Settings → Checkout → Branding*. |
| **The gift card page** | `templates/gift_card.liquid` is its own document with its own `<head>`; it never loads `walterin-ui.css` and its `<body>` has no `.wui`. Converting it means adding the stylesheet to that one template. Not done — no gift cards are sold yet. |
| **`.shopify-challenge__button`** | Shopify injects the markup on `/challenge`, so it has no class we control — it is reached by its own selector instead, and does convert. |

## Two dead classes, for the record

`button--primary` and `button--outline` are used in the Liquid but defined in **no** stylesheet. They
do nothing. `button--outline` is on the password page's submit; `button--primary` is scattered across
facets, banners and the cart notification. Harmless, but do not copy them into new markup.
