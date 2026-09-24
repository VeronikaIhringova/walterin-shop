#!/usr/bin/env python3
"""
Responsive check — every page, every width we support, both languages.

Run it against the live site or a preview URL:

    python3 docs/design/responsive-check.py
    python3 docs/design/responsive-check.py http://127.0.0.1:9292

Needs Playwright:  pip install playwright && playwright install chromium

WHY THE WIDTHS ARE WHAT THEY ARE
  320  the narrowest phone still in use
  360  the most common Android width — and the one that broke the tarot page,
       because we had only ever tested 390
  390  iPhone
  412  large Android (Pixel)
  1440 desktop

WHY TEXT SCALING IS IN HERE
  Android Chrome has a text-scaling setting that a lot of people turn up, and it
  multiplies text without touching fixed-px layout columns. At 175% the product
  title stopped fitting a 360px screen and pushed the whole document sideways.
  iOS does not do this to web pages by default, which is why it only showed on
  Android. Any fixed-px column next to text is a latent version of this bug.

WHAT COUNTS AS A FAILURE
  1. the document scrolls sideways at all
  2. an element sticks out past the right edge, unless it is inside a horizontal
     scroller (the gallery track and the card carousel legitimately are)
  3. a leaf element's own text is clipped by its box
"""
import asyncio, sys
from playwright.async_api import async_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "https://walterin.com"
PAGES = [("/products/tarot", "tarot"), ("/products/walterin-prague", "prague"),
         ("/products/stickers", "stickers"), ("/cart", "cart"), ("/", "home"),
         ("/pages/where-to-find-us", "where")]
LOCALES = [("", "en"), ("/sk", "sk")]
WIDTHS = [320, 360, 390, 412]
SCALES = [100, 175]
HIDE = "#shopify-pc__banner,.shopify-pc__banner__dialog{display:none!important}"
UA = ("Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) "
      "Chrome/127.0.0.0 Mobile Safari/537.36")

SCAN = r"""() => {
  const vw = document.documentElement.clientWidth, bad = [], clipped = [];
  const inScroller = e => {
    for (let p = e; p && p !== document.body; p = p.parentElement)
      if (['auto','scroll'].includes(getComputedStyle(p).overflowX)) return true;
    return false;
  };
  document.querySelectorAll('body *').forEach(e => {
    const cs = getComputedStyle(e);
    if (cs.display === 'none' || cs.visibility === 'hidden' || cs.position === 'fixed') return;
    if (e.closest('[hidden],[aria-hidden="true"]')) return;
    // a closed <details> still lays its contents out; the search modal lives in one
    if (e.closest('details:not([open])')) return;
    // visually-hidden helpers are clipped on purpose — that is how they hide
    if (e.closest('.visually-hidden, .skip-to-content-link, .wui-sr')) return;
    if (cs.clipPath === 'inset(50%)' || cs.clip === 'rect(0px, 0px, 0px, 0px)') return;
    const r = e.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return;
    if (!inScroller(e) && r.right > vw + 1)
      bad.push({ sel: e.tagName.toLowerCase() + '.' + (e.className || '').toString().split(' ')[0],
                 right: Math.round(r.right), text: (e.innerText || '').trim().slice(0, 30) });
    // text-overflow: ellipsis is a deliberate truncation, not a layout failure
    if (e.children.length === 0 && e.scrollWidth > e.clientWidth + 1 && cs.overflow !== 'visible'
        && cs.textOverflow !== 'ellipsis')
      clipped.push({ sel: e.tagName.toLowerCase() + '.' + (e.className || '').toString().split(' ')[0],
                     text: (e.innerText || '').trim().slice(0, 30) });
  });
  const uniq = a => { const s = new Set(); return a.filter(x => !s.has(x.sel) && s.add(x.sel)).slice(0, 5); };
  return { vw, doc: document.documentElement.scrollWidth, bad: uniq(bad), clipped: uniq(clipped) };
}"""

async def main():
    fails = 0
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        for width in WIDTHS:
            ctx = await b.new_context(viewport={"width": width, "height": 860}, device_scale_factor=2,
                                      is_mobile=True, has_touch=True, user_agent=UA)
            warm = await ctx.new_page()
            await warm.goto(f"{BASE}/products/tarot", wait_until="load", timeout=60000)
            await warm.wait_for_timeout(3000); await warm.close()
            for path, name in PAGES:
                for pre, loc in LOCALES:
                    for scale in SCALES:
                        pg = await ctx.new_page()
                        tag = f"{name}-{loc}-{width}-{scale}%"
                        try:
                            await pg.goto(f"{BASE}{pre}{path}", wait_until="load", timeout=60000)
                            await pg.add_style_tag(content=HIDE)
                            if scale != 100:
                                await pg.add_style_tag(content=f"html{{text-size-adjust:{scale}%;"
                                                               f"-webkit-text-size-adjust:{scale}%}}")
                            await pg.wait_for_timeout(2600)
                            r = await pg.evaluate(SCAN)
                            bad = r['doc'] > r['vw'] + 1 or r['bad'] or r['clipped']
                            if bad:
                                fails += 1
                                print(f"FAIL {tag:26} doc={r['doc']} vw={r['vw']}")
                                for x in r['bad']:     print(f"       → {x['sel'][:44]:46} right={x['right']} {x['text']!r}")
                                for x in r['clipped']: print(f"       ✂ {x['sel'][:44]:46} {x['text']!r}")
                            else:
                                print(f"ok   {tag}")
                        except Exception as e:
                            fails += 1; print(f"ERR  {tag}: {str(e)[:70]}")
                        await pg.close()
            await ctx.close()
        await b.close()
    print(f"\n{'ALL CLEAR' if not fails else str(fails) + ' FAILING COMBINATIONS'}")
    sys.exit(1 if fails else 0)

asyncio.run(main())
