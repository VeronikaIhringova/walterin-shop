import asyncio, sys
from playwright.async_api import async_playwright

BASE = "http://127.0.0.1:9292"
OUT  = "docs/design/proof/cards-2026-09-30"
HIDE = "#shopify-pc__banner,.shopify-pc__banner__dialog{display:none!important}"

# name, path, viewport, locale, extra JS (e.g. force the hover state so it can be photographed)
SHOTS = [
    ("collection",      "/collections/all-products", 1440, 900, "en", True),
    ("collection-sk",   "/sk/collections/all-products", 1440, 900, "sk", True),
    ("collection-390",  "/collections/all-products", 390, 844, "en", False),
    ("product-tarot",   "/products/tarot", 1440, 1000, "en", False),
    ("product-tarot-sk","/sk/products/tarot", 1440, 1000, "sk", False),
    ("product-prague",  "/products/walterin-prague", 1440, 1000, "en", False),
    ("product-390",     "/products/walterin-prague", 390, 844, "en", False),
]

FORCE_BAR = """() => { document.querySelectorAll('.wui-cl__bar').forEach(b => { b.style.opacity='1'; b.style.transform='none'; }); }"""

async def run(engine_name, launcher):
    async with async_playwright() as pw:
        b = await getattr(pw, launcher).launch()
        for name, path, w, h, loc, force in SHOTS:
            ctx = await b.new_context(viewport={"width": w, "height": h}, device_scale_factor=2,
                                      is_mobile=(w < 500), has_touch=(w < 500))
            pg = await ctx.new_page()
            try:
                await pg.goto(BASE + path, wait_until="load", timeout=60000)
                await pg.add_style_tag(content=HIDE)
                await pg.wait_for_timeout(2800)
                if force:
                    await pg.evaluate(FORCE_BAR)
                    await pg.wait_for_timeout(300)
                f = f"{OUT}/{engine_name}-{name}.png"
                await pg.screenshot(path=f, full_page=False)
                print("ok  ", f)
            except Exception as e:
                print("ERR ", engine_name, name, str(e)[:90])
            await ctx.close()
        await b.close()

asyncio.run(run(sys.argv[1], sys.argv[2]))
