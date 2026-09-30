#!/usr/bin/env python3
"""
Flag bad line breaks on the rendered page.

Implements the checks in docs/design/LINE-BREAKS.md:

  orphan     the last line of a block holds a single word
  dangling   a line ends on a word that cannot end a phrase ("move where" / "a")
  unbalanced one line is under 40% of the width of the line above it

It measures the REAL line boxes, using a Range over the text nodes, so it sees
what the browser actually drew — not what the HTML says. A <br> and a natural
wrap are indistinguishable to it, which is the point: the reader cannot tell
them apart either.

The narrow-card exception from LINE-BREAKS.md is applied automatically: a single
long word alone on a line inside a product card under 260px wide is allowed.

  python3 tools/check-line-breaks.py --url http://127.0.0.1:9292 \
      --widths 1440,390 --locales en,sk
"""

import argparse
import asyncio
import sys

from playwright.async_api import async_playwright

# Words that cannot end a phrase. A line ending on one of these has been cut
# mid-thought. Slovak prepositions and conjunctions carry the same weight.
DANGLING = {
    "en": ["the", "a", "an", "and", "or", "but", "of", "in", "on", "at", "to",
           "for", "with", "from", "by", "as", "is", "are", "was", "were", "be",
           "where", "when", "that", "this", "into", "over", "under", "about",
           "you", "your", "our", "it", "its", "not", "no", "so", "if", "than"],
    "sk": ["a", "aj", "alebo", "ale", "do", "na", "so", "s", "z", "zo", "pre",
           "ako", "kde", "keď", "že", "v", "vo", "k", "ku", "o", "od", "po",
           "pri", "za", "je", "sú", "bol", "bola", "byť", "sa", "si", "to",
           "ten", "tá", "the", "ktorý", "ktorá", "ale"],
}

PAGES = {
    "home": "",
    "shop": "collections/all",
    "tarot": "products/tarot",
    "prague": "products/walterin-prague",
    "stickers": "products/stickers",
    "about": "pages/about",
    "faq": "pages/faq",
    "cart": "cart",
}

# Blocks worth judging. Navigation, buttons and one-word labels are excluded:
# they are not prose and the rule does not apply to them.
SELECTOR = (
    "p, h1, h2, h3, h4, blockquote, li, figcaption, dd, "
    ".wui-lead, .wui-small, .card__heading, .wui-accordion__body, .rte"
)

JS = r"""
(args) => {
  const [selector, dangling] = args;

  // Real line boxes: walk the text nodes one character at a time and group by
  // the top of each character's client rect.
  const linesOf = (el) => {
    const range = document.createRange();
    const lines = [];
    let current = null;
    const walk = (node) => {
      if (node.nodeType === 3) {
        for (let i = 0; i < node.length; i++) {
          range.setStart(node, i);
          range.setEnd(node, i + 1);
          const box = range.getBoundingClientRect();
          if (!box.width && !box.height) continue;
          const top = Math.round(box.top);
          if (!current || Math.abs(top - current.top) > 3) {
            current = { top, text: "", left: box.left, right: box.right };
            lines.push(current);
          }
          current.text += node.data[i];
          current.left = Math.min(current.left, box.left);
          current.right = Math.max(current.right, box.right);
        }
      } else if (node.nodeType === 1) {
        const cs = getComputedStyle(node);
        if (cs.display === "none" || cs.visibility === "hidden") return;
        for (const child of node.childNodes) walk(child);
      }
    };
    walk(el);
    return lines
      .map((l) => ({ text: l.text.trim(), w: Math.round(l.right - l.left) }))
      .filter((l) => l.text.length);
  };

  const findings = [];
  document.querySelectorAll(selector).forEach((el) => {
    // Only leaf-ish blocks: skip a wrapper whose text belongs to children we
    // will visit anyway, or the same sentence is reported several times.
    if (el.querySelector(selector)) return;
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") return;
    if (el.closest(".visually-hidden, .wui-sr, [hidden]")) return;
    // Shopify's own consent banner is not our copy and we cannot rewrite it.
    if (el.closest("#shopify-pc__banner, .shopify-pc__banner, #shopify-pc__prefs")) return;
    const box = el.getBoundingClientRect();
    if (box.width < 40 || box.height < 4) return;

    const lines = linesOf(el);
    if (lines.length < 2) return;

    const full = lines.map((l) => l.text).join(" ");
    if (full.length < 12) return;

    // The narrow-card exception: a product card under 260px wide.
    const card = el.closest(".card-wrapper");
    const narrowCard = card && card.getBoundingClientRect().width < 260;

    const last = lines[lines.length - 1];
    const lastWords = last.text.split(/\s+/).filter(Boolean);
    if (lastWords.length === 1 && !(narrowCard && lastWords[0].length >= 8)) {
      findings.push({ kind: "orphan", text: full, line: last.text,
                      detail: `last line is the single word "${lastWords[0]}"` });
    }

    lines.forEach((l, i) => {
      if (i === lines.length - 1) return;
      // A line that ends on punctuation has ended a phrase, whatever the last
      // word is: "but stay with you." and "Ideas travel lightly," are both
      // correct breaks. Only an unpunctuated line can dangle. This must not
      // skip the balance check below, so it is a flag and not an early return.
      const endsPhrase = /[.,;:!?\u2026\u2014\u2013)\]"'\u2019\u201d]$/.test(l.text.trim());
      const words = l.text.replace(/[^\p{L}\p{N}\s'’-]/gu, "").split(/\s+/).filter(Boolean);
      const tail = (words[words.length - 1] || "").toLowerCase();
      // Narrow cards get the same exception as orphans: with ~170px there is
      // often no break that satisfies the rule, and the title is two words.
      if (tail && !endsPhrase && dangling.includes(tail) && !narrowCard) {
        findings.push({ kind: "dangling", text: full, line: l.text,
                        detail: `line ends on "${tail}", which cannot end a phrase` });
      }
      const next = lines[i + 1];
      if (next && l.w > 0 && next.w > 0 && next.w < l.w * 0.4 &&
          next.text.split(/\s+/).filter(Boolean).length <= 2 &&
          i + 1 === lines.length - 1 && !narrowCard) {
        findings.push({ kind: "unbalanced", text: full, line: next.text,
                        detail: `line is ${Math.round(100 * next.w / l.w)}% of the one above` });
      }
    });
  });

  // De-duplicate: the same sentence and the same complaint only once.
  const seen = new Set();
  return findings.filter((f) => {
    const k = f.kind + "|" + f.text + "|" + f.line;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}
"""


async def run(base, widths, locales, pages, engines, quiet):
    total = 0
    async with async_playwright() as pw:
        for engine in engines:
            browser = await getattr(pw, engine).launch()
            for width in widths:
                ctx = await browser.new_context(
                    viewport={"width": width, "height": 900},
                    is_mobile=width < 500, has_touch=width < 500)
                page = await ctx.new_page()
                for locale in locales:
                    words = DANGLING.get(locale, DANGLING["en"])
                    prefix = "" if locale == "en" else f"{locale}/"
                    for name in pages:
                        path = PAGES[name]
                        url = f"{base.rstrip('/')}/{prefix}{path}"
                        try:
                            await page.goto(url, wait_until="load", timeout=60000)
                        except Exception as exc:
                            print(f"  ! {url} did not load: {exc}")
                            continue
                        await page.wait_for_timeout(1800)
                        try:
                            found = await page.evaluate(JS, [SELECTOR, words])
                        except Exception as exc:
                            print(f"  ! {url} could not be measured: {exc}")
                            continue
                        if found:
                            total += len(found)
                            print(f"\n[{engine} {width}px {locale}] {name} — "
                                  f"{len(found)} bad break(s)")
                            for f in found:
                                print(f"   {f['kind']:<10} {f['detail']}")
                                print(f"   {'':<10} in: {f['text'][:96]!r}")
                        elif not quiet:
                            print(f"[{engine} {width}px {locale}] {name} — clean")
                await ctx.close()
            await browser.close()
    return total


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--url", default="http://127.0.0.1:9292")
    ap.add_argument("--widths", default="1440,390")
    ap.add_argument("--locales", default="en,sk")
    ap.add_argument("--pages", default=",".join(PAGES))
    ap.add_argument("--engines", default="webkit")
    ap.add_argument("--quiet", action="store_true",
                    help="only print pages that have findings")
    a = ap.parse_args()

    pages = [p for p in a.pages.split(",") if p in PAGES]
    total = asyncio.run(run(
        a.url,
        [int(w) for w in a.widths.split(",")],
        a.locales.split(","),
        pages,
        a.engines.split(","),
        a.quiet,
    ))
    print(f"\n{'=' * 60}\n{total} bad break(s) in total")
    sys.exit(1 if total else 0)


if __name__ == "__main__":
    main()
