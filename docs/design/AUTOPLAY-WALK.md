# The walk — how the timing was worked out

> "Walk me through it" in S2 · How a card is read. Written 23 Sep 2026, before it was built.
> Decision: **one button, the three-row walk.** The nine-frame version was costed and dropped; the
> reasoning is at the bottom.

## What the numbers are based on

| Source | Figure | How it is used |
| --- | --- | --- |
| Brysbaert 2019, meta-analysis of 190 studies (17,887 people) | silent reading of English non-fiction **238 wpm**, most adults 175–300 | the ceiling. Not used directly — a reader who cannot set the pace needs more. |
| Nielsen Norman Group, auto-forwarding carousels | **1 second per 3 words = 180 wpm**, and **5–7s minimum even for a short heading** | the rate everything below is budgeted at |
| No published Slovak rate exists | **+15%** on every reading figure | Slovak runs longer per word than English. An estimate, and marked as one. |
| — | **1.5s** to take in the pictures on a stop | an estimate, not a citation. The words printed inside the frames repeat the captions underneath, so there is little new to read in the image itself. |
| Mayer, segmenting principle | learner-paced segments beat one continuous run | why it is opt-in and why the row boundary gets a beat |
| WCAG 2.2.2 Pause, Stop, Hide | anything auto-updating past 5s needs a control, available throughout | the Stop control is on screen the whole time it runs |

## The timing that was built

A stop is one row. Words on a stop: the row name (3) + its explanation (16–21) + three column
words (4) + three captions (13) ≈ **41 words**.

```
41 words ÷ 3 words per second   = 13.7s
the three frames                =  1.5s
                                  ------
per row                          ≈ 15s   (English)
Slovak, +15% on the reading part ≈ 17s
beat at each row change              0.8s
```

**Total: 3 × 15 + 2 × 0.8 = 46.6s in English, ≈ 52s in Slovak.**

Every stop gets the same time, because every stop carries the same amount of new reading — which is
exactly why the row, not the frame, is the unit: the explanation belongs to the row, so a nine-stop
walk would show each explanation three times over.

## How it behaves

| | |
| --- | --- |
| Start | one button on the control bar, "Walk me through it" / "Prevedie ma tým", `aria-pressed`. It never starts on its own. |
| Stop | the same button, which reads "Stop" / "Zastaviť" while it runs. Esc also stops it. |
| Hover | nothing happens. Hover-pausing is what broke S3 — the section stalled under the cursor. |
| Click | any click that moves you (a frame on the card, Back, Next, another card) stops the walk and leaves you exactly there. |
| Keyboard | focus entering the section stops it, so a keyboard user is never fighting a timer. |
| Scrolled away | under 50% visible it holds; back in view it carries on from where it was, never from the start. |
| Tab change | hidden tab holds it; it resumes when the tab is visible **and** the section is back in view. |
| At the end | it stops on the last row and stays there. No loop — looping would take the page back for another minute. |
| Reduced motion | the walk is still offered: it is pacing, not animation. The highlight jumps instead of travelling and the arrow appears without its fade. |
| Screen reader | the note is a polite live region. During the walk it speaks three times, once per row, with the row and its explanation. Stepping by hand still announces each frame. Nothing is reachable only through the walk — Back and Next reach all nine frames. |
| Layout shift | the highlight travels by transform, the note has one fixed height in every state, and the button keeps its width when the label changes. Measured 0.0006 at 1440 and 0.0000 at 390 across a whole run. |

## Why not the nine-frame walk

It was costed properly: 11s on the first frame of each row (row + column + caption + explanation
≈ 28 words, plus the picture) and 5s on the other six (only the column and caption are new, and
5s is NN/g's floor), plus two beats — **65s in English, about 72s in Slovak.**

Two reasons it was dropped rather than offered alongside:

1. **A minute is too long to ask for on a product page.** Even opted-in, most people would stop it
   part-way, and a control that is usually abandoned is not a good control.
2. **Two walk buttons is one too many.** The bar already carries Back, nine dots, Next, "Try another
   card" and ten thumbnails. Asking a visitor to choose between two walks they cannot tell apart
   before pressing is worse than giving them one good one — and the nine frames are already there,
   at their own pace, on Back and Next. Self-paced stepping beats an auto-advance of the same
   material anyway (segmenting principle).

If the walk turns out to be popular and people ask to see every frame, the nine-frame version is a
timing change, not a rebuild: the same controller, `DUR` per stop and nine stops instead of three.

## Sources
- Brysbaert, M. (2019). *How many words do we read per minute? A review and meta-analysis of reading rate.* Journal of Memory and Language. https://www.sciencedirect.com/science/article/abs/pii/S0749596X19300786
- Nielsen Norman Group. *Auto-Forwarding Carousels and Accordions Annoy Users and Reduce Visibility.* https://www.nngroup.com/articles/auto-forwarding/
- W3C. *WCAG 2.2 Success Criterion 2.2.2 Pause, Stop, Hide.*
