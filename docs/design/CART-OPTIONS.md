# Cart — benchmark and two design options

Written 6 October 2026, after the cart rebuild. Sources at the end.

---

## What the research says

Consistent across the sources, and all of it supports the same shape:

- **A drawer, not a redirect.** A slide-out cart confirms what was added without
  breaking browsing. Keep both: the drawer for "added", the page for "reviewing".
- **Stepper with − and +**, totals updating live. Plain number inputs cause errors.
- **A trash icon, no confirmation step.** Removing should cost one tap. Undo beats
  "are you sure".
- **Desktop: a sticky right-hand summary.** The subtotal and the button stay in view
  while the eye reads the list. This is the single biggest layout finding.
- **Mobile: one column, compact cards.** Multi-column carts feel crowded on a phone.
- **Mobile: the CTA belongs in the thumb zone** — the lower third of the screen —
  ideally as a sticky bar so it is reachable without scrolling.

Our rebuild already follows the first five. The sixth is the real choice below.

---

## Option A — "Receipt"  *(built, in preview now)*

The cart behaves like a quiet receipt: dense, scannable, nothing shouting.

```
┌────────────────────────────────────────────┬──────────────────┐
│  ▢  WALTERIN PRAGUE – COMIC BOOK   €20,99  │  SUBTOTAL        │
│     CZECH · DIGITAL INTERACTIVE EDITION    │  €58,97 EUR      │
│     [ −  1  + ]   🗑                       │                  │
│                                            │  ☐ I expressly…  │
│  ▢  WALTERIN PRAGUE – COMIC BOOK   €37,98  │  What does this  │
│     ENGLISH · DIGITAL INTERACTIVE EDITION  │  mean?           │
│     [ −  2  + ]   🗑                       │                  │
│                                            │  [ CHECK OUT ]   │
└────────────────────────────────────────────┴──────────────────┘
          items, left                          sticky summary, right
```

- 56px image, so the words get the room. This was the actual bug: the stock
  four-column grid left the text 154px and no type size could fix that.
- Price right-aligned on the title row; quantity and bin on their own row.
- Desktop cart page: items left, **sticky** summary right.
- Phone: one column, summary underneath, options stacked without a separator.

**Strengths:** compact, nothing is cut off, works at 320px, closest to the
"quiet" direction already chosen for the product cards.
**Weakness:** on a phone the Check out button is below the fold once there are
three or more lines.

---

## Option B — "Thumb-first"  *(proposal, not built)*

Everything in A, plus the mobile finding the research is most insistent about.

```
 phone                                 
┌──────────────────────────────┐
│  ▢   WALTERIN PRAGUE –       │   larger image (72px)
│      COMIC BOOK      €20,99  │   price on the title row
│      CZECH                   │
│      DIGITAL INTERACTIVE     │
│      EDITION                 │
│      [ −  1  + ]        🗑   │
│                              │
│  … more lines …              │
│                              │
├──────────────────────────────┤
│  €58,97   [ CHECK OUT ]      │ ← sticky, in the thumb zone
└──────────────────────────────┘
```

- A **sticky checkout bar** at the bottom of the phone screen, showing the
  subtotal and the button, visible however long the list gets.
- The consent checkbox stays inline above it; the bar's button stays disabled
  until it is ticked, with a short hint on tap. *(This is the part that needs
  care: the bar must never let someone reach payment without consenting.)*
- Slightly larger imagery, because the product is artwork.

**Strengths:** the button is always reachable; measurably the strongest mobile
pattern in the sources.
**Weakness:** a second fixed bar on a page that already has a sticky product bar;
it covers content; and it adds a real legal edge case around the consent.

---

## Recommendation

**Ship A now, consider B after launch.**

A is built, measured and fixes every reported fault. B is a genuine improvement
for phones but introduces a sticky bar whose interaction with the mandatory
consent needs designing carefully — and the 23 October launch is not the moment
to put a new legal edge case on the only path to money.

---

## Sources

- [Baymard — Checkout UX best practices](https://baymard.com/research-articles/current-state-of-checkout-ux)
- [Baymard — Checkout flow UX optimization](https://baymard.com/blog/checkout-flow-ux-optimization)
- [Baymard — 35 data-driven ecommerce best practices](https://baymard.com/blog/ecommerce-ux-best-practices)
- [Shopping cart UX best practices 2026](https://belvg.com/blog/best-practices-for-ecommerce-shopping-carts.html)
- [Shopping cart best practices for conversion](https://ezcommerce.us/blog/shopping-cart-best-practices-conversion-checkout)
