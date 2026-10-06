# Live proof — card colour, card labels, product page pill

Taken from **walterin.com** on 6 October 2026, straight after the push, in fresh browsers
with no cookies and no preview session. The theme serving every page was **164726866249**,
the live theme — asserted in the run, not assumed.

- `safari-*` WebKit · `chrome-*` Chromium
- `*-1440-*` desktop · `*-390-*` phone (touch emulated, so `@media (hover: none)` really fires)
- `*-en-*` / `*-sk-*`
- `*-HOVER.png` — the desktop hover state, which is the only way the bar appears on a desk

Measured on every one of these pages: card ground, card bar and product page pill are all
exactly `rgb(255, 254, 251)` = `#FFFEFB`, no pill carries an underline, and the shipping line
is `display: none` exactly when a pill is showing.

**A phone screenshot taken in a desktop browser at 390px shows no bars.** That is the test
rig, not the site: the bar waits for `@media (hover: none)`, which a desktop browser never
reports however narrow the window. The shots here emulate touch properly.
