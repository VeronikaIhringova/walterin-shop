# The walk — how the timing was worked out

> "Walk me through it" in S2 · How a card is read. Written 23 Sep 2026, revised 24 Sep.
> Decision: **one button, one frame at a time, with the time left shown in the dots.**
> The three-row version was built first and replaced on Veronka's call: a whole row puts three
> pictures in front of you and you settle on none of them. What the row version is still good for
> is at the bottom.

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

A stop is one frame. The frames are not equal: the first frame of a row brings the row's
explanation with it, the two that follow bring only a field name and a caption.

| | what is new on the stop | read | picture | change-over | held |
| --- | --- | --- | --- | --- | --- |
| frames 1, 4, 7 | row + field + caption + explanation ≈ 26–30 words | 9.0s | 1.5s | 0.4s | **11s** |
| the other six | field + caption ≈ 7 words | 2.3s | 1.5s | 0.4s | **5s** — NN/g's floor for any stop |

Slovak: **12.5s** and **5.5s** (+15%). A **0.8s beat** at each row change, where the meaning turns.

**Total: 3 × 11 + 6 × 5 + 2 × 0.8 = 64.6s in English, about 72s in Slovak.**

That is a long run for a product page, and it is why two things matter more than the total:
it never starts on its own, and **you can see the change coming**.

## Seeing the change coming

The nine step dots are the progress bar. The dot for the frame you are on fills with yellow from the
bottom as its time runs out, in real time, so the next move is never a surprise; frames already seen
are solid ink, frames still to come are empty. The fill is one Web Animation on a transform, so it
pauses and resumes with the walk and costs no layout shift. Under reduced motion the dot is simply
filled, with no animation.

## How it behaves

| | |
| --- | --- |
| Start | one button on the control bar, "Walk me through it" / "Prevedie ma tým", `aria-pressed`. It never starts on its own, and it carries on from the frame you are looking at. |
| Stop | the same button, which reads "Stop" / "Zastaviť" while it runs. Esc also stops it. |
| Hover | nothing happens. Hover-pausing is what broke S3 — the section stalled under the cursor. |
| Click | any click that moves you (a frame on the card, Back, Next, another card) stops the walk and leaves you exactly there. |
| Keyboard | focus entering the section stops it, so a keyboard user is never fighting a timer. |
| Scrolled away | under 50% visible it holds; back in view it carries on from where it was, never from the start. |
| Tab change | hidden tab holds it; it resumes when the tab is visible **and** the section is back in view. |
| At the end | it stops on the ninth frame and stays there. No loop — looping would take the page back for another minute. |
| The system card | opening "See the whole system" holds the walk; closing the dialog lets it carry on from where it was. |
| Reduced motion | the walk is still offered: it is pacing, not animation. The highlight jumps instead of travelling and the dot is filled rather than filling. |
| Screen reader | the note is a polite live region: each stop announces the row, the field and the caption. Nothing is reachable only through the walk — Back and Next reach all nine frames. |
| Layout shift | the highlight travels by transform, the note has one fixed height in every state and language, and the button keeps its width when the label changes. Measured **0.0000 at 1440 and 0.0000 at 390** across a whole nine-frame run. |

## The row version, and when it would be worth going back to

The first build stopped on each row: 41 words a stop, 15s English / 17s Slovak, **46.6s in all**.
It is the shorter run and the row is the true unit of the explanation. It was replaced because a
row shows three pictures at once and the eye settles on none of them — the section exists to make
you look at *one* frame and understand it.

The trade is honest and worth writing down: per-frame costs 18 more seconds and buys attention on
every picture. If the walk is started often but abandoned early, the row version is a timing change
away — the same controller, three stops instead of nine.

One thing the row build proved and this one keeps: a control that runs for most of a minute needs a
visible clock. Without the filling dots, a 65s run feels like a page moving on its own.

## Sources
- Brysbaert, M. (2019). *How many words do we read per minute? A review and meta-analysis of reading rate.* Journal of Memory and Language. https://www.sciencedirect.com/science/article/abs/pii/S0749596X19300786
- Nielsen Norman Group. *Auto-Forwarding Carousels and Accordions Annoy Users and Reduce Visibility.* https://www.nngroup.com/articles/auto-forwarding/
- W3C. *WCAG 2.2 Success Criterion 2.2.2 Pause, Stop, Hide.*
