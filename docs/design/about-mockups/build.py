#!/usr/bin/env python3
"""Five About-page directions, mocked at 1440 and 390."""
import pathlib
D = pathlib.Path(__file__).parent

SHELL = """<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>%(title)s</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
@font-face{font-family:WalterinBold;src:url(https://cdn.shopify.com/s/files/1/0897/8864/5705/files/WalterinBold.woff2?v=1725196093) format('woff2');font-display:swap}
:root{
  --ink:#222;--paper:#fff;--yellow:#FCE206;--yellow-press:#E6CE00;
  --navy:#153055;--grass:#8BC53F;--amber:#F5A800;
  --rule:#222;
  --frame:92%%;--frame-max:1400px;--pad:50px;
  --s-section:96px;--s-block:32px;--s-head:16px;--s-item:8px;
  --display:WalterinBold,'Inter',system-ui,sans-serif;
  --lit:'Cormorant Garamond',Georgia,serif;
  --ui:'Inter',system-ui,-apple-system,sans-serif;
}
*{box-sizing:border-box}
body{margin:0;background:var(--paper);color:var(--ink);font:400 17px/1.62 var(--ui);-webkit-font-smoothing:antialiased}
img{max-width:100%%;display:block}
.wrap{width:var(--frame);max-width:var(--frame-max);margin-inline:auto;padding-inline:var(--pad)}
h1,h2,h3{font-family:var(--display);font-weight:400;letter-spacing:.01em;margin:0;line-height:1.08}
h1{font-size:clamp(34px,4.4vw,60px);text-transform:uppercase}
h2{font-size:clamp(26px,2.9vw,38px);text-transform:uppercase}
h3{font-size:clamp(17px,1.5vw,21px);text-transform:uppercase}
p{margin:0 0 1em}
.lead{font-size:clamp(18px,1.55vw,22px);line-height:1.5}
.kicker{font:600 12px/1 var(--ui);letter-spacing:.18em;text-transform:uppercase;opacity:.55}
.rule{height:2px;background:var(--rule);border:0;margin:0}
.sec{margin-block-start:var(--s-section)}
.btn{display:inline-flex;align-items:center;gap:10px;background:var(--yellow);color:var(--ink);
 font:700 14px/1 var(--ui);letter-spacing:.09em;text-transform:uppercase;text-decoration:none;
 padding:17px 30px;border:2px solid var(--ink);border-radius:42px;box-shadow:4px 4px 0 var(--ink)}
.btn.ghost{background:transparent;box-shadow:none}
.frame{border:2px solid var(--ink);box-shadow:6px 6px 0 var(--ink);background:#fff}
/* --- site chrome, abbreviated --- */
.ann{background:#F2F2F0;font:600 11px/1 var(--ui);letter-spacing:.14em;text-transform:uppercase;text-align:center;padding:12px}
.hdr{display:flex;align-items:center;justify-content:space-between;padding:22px 0}
.hdr nav{display:flex;gap:30px;font:600 13px/1 var(--ui);letter-spacing:.11em;text-transform:uppercase}
.logo{font-family:var(--display);font-size:30px}
.hdr .right{font:600 12px/1 var(--ui);letter-spacing:.1em;opacity:.7}
.foot{margin-top:var(--s-section);border-top:2px solid var(--ink);padding:26px 0;font:500 12px/1 var(--ui);letter-spacing:.08em;text-transform:uppercase;opacity:.5;text-align:center}
.note{background:#FFFBE0;border-left:3px solid var(--yellow-press);padding:12px 16px;font:400 13px/1.5 var(--ui);margin:18px 0}
@media(max-width:749px){
 :root{--pad:16px;--s-section:72px;--s-block:24px;--s-head:12px}
 body{font-size:16px}
 .hdr nav,.hdr .right{display:none}
 .hdr{justify-content:center}
}
%(css)s
</style></head><body>
<div class="ann">Welcome, curious traveller!</div>
<header class="wrap hdr"><nav><a>Walterin</a><a>Shop</a><a>About</a></nav>
<div class="logo">Walterin</div><div class="right">EN / SK &nbsp; ⌕ &nbsp; ♡ &nbsp; ⌂</div></header>
<main>
%(body)s
</main>
<div class="foot">Direction %(letter)s — %(name)s</div>
</body></html>"""


def page(letter, name, css, body):
    html = SHELL % {"title": f"About — {name}", "css": css, "body": body,
                    "letter": letter, "name": name}
    (D / f"dir-{letter}.html").write_text(html)


# ───────────────────────────────────────────────────────── A · Sixteen panels
PANELS = [
    ("1969", "1969", "Born in Bratislava. Everything after this is drawing."),
    ("mama", "Mama", "She danced. I sat at the table and drew her dancing."),
    ("tata", "Tata", "He played the violin. I drew him playing it — badly, on purpose."),
    ("xdraw", "The red X", "The first drawing somebody crossed out. I kept it."),
    ("school", "School", "My grandmother taught. I drew in the margins of everything she gave me."),
    ("football", "Football", "I was the goalkeeper. I drew better than I saved."),
    ("egypt", "Egypt", "A skateboard in front of the pyramids. I was nineteen and thought that was the joke."),
    ("coffee", "Coffee", "Still where most of it starts. A table, a window, other people."),
]
tiles = "".join(
    f'<button class="tile{" on" if i == 1 else ""}"><img src="p-{k}.png" alt="{t}"></button>'
    for i, (k, t, _) in enumerate(
        [("sun", "", ""), ("1969", "", ""), ("mama", "", ""), ("tata", "", ""),
         ("xdraw", "", ""), ("egypt", "", ""), ("school", "", ""), ("football", "", ""),
         ("beatrix", "", ""), ("homeland", "", ""), ("dreaming", "", ""), ("india", "", ""),
         ("veronika", "", ""), ("walto", "", ""), ("nepal", "", ""), ("coffee", "", "")]))
page("A", "Sixteen panels", """
.a-grid{display:grid;grid-template-columns:4fr 3fr;gap:56px;align-items:start}
.tiles{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border:2px solid var(--ink);box-shadow:8px 8px 0 var(--ink)}
.tile{padding:0;border:0;background:none;cursor:pointer;display:block;position:relative;filter:saturate(.12) opacity(.72)}
.tile.on{filter:none}
.tile.on::after{content:"";position:absolute;inset:0;box-shadow:inset 0 0 0 4px var(--yellow)}
.a-read{position:sticky;top:34px}
.a-read .big{font-family:var(--display);font-size:clamp(30px,3.4vw,46px);text-transform:uppercase;line-height:1}
.a-read img{border:2px solid var(--ink);margin:var(--s-block) 0;width:62%}
.a-read .body{font:400 20px/1.55 var(--lit);max-width:34ch}
.a-count{font:600 12px/1 var(--ui);letter-spacing:.16em;opacity:.5;margin-bottom:12px}
.a-more{display:grid;grid-template-columns:repeat(2,1fr);gap:var(--s-block);margin-top:var(--s-block)}
.a-more div{border-top:2px solid var(--ink);padding-top:14px}
@media(max-width:749px){.a-grid{grid-template-columns:1fr;gap:28px}.a-read{position:static}.a-read img{width:48%}.a-more{grid-template-columns:1fr}}
""", f"""
<section class="wrap" style="margin-block-start:var(--s-block)">
  <h1>Sixteen panels.<br>One life.</h1>
  <p class="lead" style="max-width:52ch;margin-top:var(--s-head)">Walter drew his own biography before he drew
  anybody else's. Every panel is a year, a person or a habit. Tap one.</p>
</section>

<section class="wrap sec a-grid">
  <div class="tiles">{tiles}</div>
  <div class="a-read">
    <div class="a-count">Panel 02 of 16</div>
    <div class="big">1969</div>
    <img src="p-1969.png" alt="">
    <p class="body">Born in Bratislava. Everything after this is drawing.</p>
    <p class="body" style="opacity:.75">My mother kept the first ones in a drawer. I found them again
    at forty and most of the jokes still worked, which worried me.</p>
  </div>
</section>

<section class="wrap sec">
  <hr class="rule"><div class="a-more">
    <div><h3>The short version</h3><p style="margin-top:10px">Thirty-five years of ink. A Golden Gander for
    caricature in 2016, and a seat on that jury in 2017. Books about cities: Bratislava, Prague, Paris next.</p></div>
    <div><h3>What he is drawing now</h3><p style="margin-top:10px">A deck of 78 cards — one unbroken story,
    told in panels. It goes to print in three weeks.</p>
    <a class="btn" href="#" style="margin-top:10px">See the deck</a></div>
  </div>
</section>
<div class="wrap note"><b>Copy note:</b> the sixteen captions are Walter's to write — these are drafts in his voice,
so you can see the shape. Two sentences each, maximum.</div>
""")

# ───────────────────────────────────────────────────────── B · Lead with work
page("B", "Lead with the work", """
.b-hero{position:relative;border-block:2px solid var(--ink);background:#153055;overflow:hidden}
.b-hero img{width:100%;height:clamp(320px,44vw,560px);object-fit:cover;opacity:.92}
.b-hero .cap{position:absolute;inset:auto 0 0 0;padding:44px 0;background:linear-gradient(transparent,rgba(21,48,85,.92) 48%)}
.b-hero h1{color:#fff;max-width:18ch}
.b-hero p{color:#fff;opacity:.92;max-width:44ch;margin-top:var(--s-head)}
.b-three{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--s-block)}
.b-three img{border:2px solid var(--ink);margin-bottom:14px}
.b-who{display:grid;grid-template-columns:1fr 1.25fr;gap:56px;align-items:center}
.b-who .grid{border:2px solid var(--ink);box-shadow:8px 8px 0 var(--ink)}
.b-prod{display:grid;grid-template-columns:1fr 1fr;gap:var(--s-block)}
.b-prod a{text-decoration:none;color:inherit;display:block}
.b-prod .frame img{width:100%;aspect-ratio:1;object-fit:cover}
.b-prod .meta{display:flex;justify-content:space-between;align-items:baseline;margin-top:14px;gap:12px}
@media(max-width:749px){.b-three,.b-who,.b-prod{grid-template-columns:1fr;gap:28px}}
""", """
<section class="b-hero">
  <img src="https://cdn.shopify.com/s/files/1/0897/8864/5705/files/walterin-prague-witty-illustrated-comic-guide-book-outdoor.jpg?v=1764241307" alt="">
  <div class="cap"><div class="wrap"><h1>History you recognise,<br>not history you read.</h1>
  <p class="lead">Nine frames. One city. One joke that lands. Walter Ihring has been drawing them for thirty-five years.</p></div></div>
</section>

<section class="wrap sec b-three">
  <div><img src="p-egypt.png" alt=""><h3>Nine frames</h3>
  <p style="margin-top:10px">A story fits in nine. Enter anywhere, leave anywhere, come back to it on the tram.</p></div>
  <div><img src="p-india.png" alt=""><h3>A real place</h3>
  <p style="margin-top:10px">Bratislava, Prague, Paris next. Streets Walter has walked, drawn on the spot, checked twice.</p></div>
  <div><img src="p-coffee.png" alt=""><h3>A joke that lands</h3>
  <p style="margin-top:10px">Not a punchline. The kind that makes you look at the next person who walks past.</p></div>
</section>

<section class="wrap sec b-who">
  <img class="grid" src="grid.png" alt="Walter's illustrated biography">
  <div><span class="kicker">The man drawing it</span>
  <h2 style="margin-top:var(--s-head)">Walter Ihring</h2>
  <p style="margin-top:var(--s-head)">Born in Bratislava in 1969. Thirty-five years of ink, most of it
  in Slovak newspapers and magazines, some of it on walls. A Golden Gander for caricature in 2016 —
  and a seat on that jury the year after, which is how that prize works.</p>
  <p>He draws in cafés. He will tell you the coffee is research.</p>
  <a class="btn ghost" href="#">The whole story →</a></div>
</section>

<section class="wrap sec">
  <h2>What he has made</h2><hr class="rule" style="margin:var(--s-head) 0 var(--s-block)">
  <div class="b-prod">
    <a href="#"><div class="frame"><img src="https://cdn.shopify.com/s/files/1/0897/8864/5705/files/PRODUCT_BOOK1_fb72874e-9084-4d31-b052-f7bdac64b1f2.jpg?v=1790166567" alt=""></div>
    <div class="meta"><h3>Comics Tarot of Consciousness</h3><b>€39,00</b></div>
    <p style="opacity:.7">78 cards. One unbroken story.</p></a>
    <a href="#"><div class="frame"><img src="https://cdn.shopify.com/s/files/1/0897/8864/5705/files/walterin-prague-illustrated-comic-guide-book-cover.jpg?v=1764241286" alt=""></div>
    <div class="meta"><h3>Walterin Prague</h3><b>€18,99</b></div>
    <p style="opacity:.7">A city in nine-frame stories.</p></a>
  </div>
</section>
""")

# ───────────────────────────────────────────────────────── C · Walter speaks
page("C", "Walter speaks", """
.c{max-width:660px;margin-inline:auto}
.c h1{font-size:clamp(40px,5.6vw,76px)}
.c .body{font:400 21px/1.68 var(--lit)}
.c .body p{margin:0 0 1.15em}
.c .body p:first-of-type::first-letter{font-family:var(--display);font-size:3.1em;float:left;line-height:.78;
 padding:6px 12px 0 0}
.c figure{margin:var(--s-section) 0}
.c figure img{border:2px solid var(--ink);margin-inline:auto;width:58%}
.c figcaption{font:600 12px/1 var(--ui);letter-spacing:.15em;text-transform:uppercase;opacity:.5;text-align:center;margin-top:14px}
.c .sig{font-family:var(--display);font-size:30px;margin-top:var(--s-block)}
.c .now{border:2px solid var(--ink);box-shadow:6px 6px 0 var(--ink);padding:30px;margin-top:var(--s-section);
 display:flex;gap:26px;align-items:center}
.c .now img{width:110px;border:2px solid var(--ink);flex:none}
@media(max-width:749px){.c .body{font-size:19px}.c figure img{width:74%}.c .now{flex-direction:column;text-align:center}}
""", """
<section class="wrap sec c">
  <span class="kicker">Bratislava</span>
  <h1 style="margin-top:var(--s-head)">I'm&nbsp;Walter.</h1>
  <div class="body" style="margin-top:var(--s-block)">
  <p>I have been drawing for thirty-five years and I still cannot give you a tidy reason why. It started
  at a kitchen table in 1969, it has not stopped, and nobody in my family is surprised any more.</p>
  <p>What I draw is other people. A woman deciding whether to cross the road. Two men in a café who
  have clearly had this argument before. A city that keeps its best jokes in the side streets. I put
  nine of those in a row and something like a story happens.</p>
  </div>
  <figure><img src="p-coffee.png" alt=""><figcaption>Still where most of it starts</figcaption></figure>
  <div class="body">
  <p>In 2016 they gave me a Golden Gander for caricature. It is a real prize with a very funny name,
  and the year after they put me on the jury, which is the part I am actually proud of.</p>
  <p>Then I started drawing cities. Bratislava first, because I know where its bodies are buried.
  Prague after that. Paris is on the table now, under a coffee cup, getting rings on it.</p>
  </div>
  <div class="sig">— Walter</div>

  <div class="now"><img src="p-dreaming.png" alt="">
  <div><span class="kicker">What I'm drawing now</span>
  <h3 style="margin:10px 0 8px">78 cards, one story</h3>
  <p style="margin:0 0 14px">Comics Tarot of Consciousness goes to print in three weeks.</p>
  <a class="btn" href="#">See the deck</a></div></div>
</section>
<div class="wrap note" style="max-width:660px;margin-inline:auto">
<b>Copy note:</b> this only works if Walter writes it. The draft above is me doing an impression of him —
it shows the length and the register, not the final words.</div>
""")

# ───────────────────────────────────────────────────────── D · The strip
STRIP = [("1969", "1969", "Born in Bratislava."),
         ("school", "1980s", "Drawing in the margins of everything."),
         ("xdraw", "1990s", "First drawings in print. First ones crossed out."),
         ("egypt", "2015", "Walterin Bratislava — a city in nine-frame stories."),
         ("dreaming", "2016", "Golden Gander for caricature. Jury the year after."),
         ("coffee", "Now", "78 cards, going to print.")]
strip = "".join(f'<figure><img src="p-{k}.png" alt=""><figcaption><b>{y}</b><span>{t}</span></figcaption></figure>'
                for k, y, t in STRIP)
page("D", "The strip", """
.d-strip{display:grid;grid-template-columns:repeat(6,1fr);border:2px solid var(--ink);box-shadow:8px 8px 0 var(--ink)}
.d-strip figure{margin:0;border-right:2px solid var(--ink);display:flex;flex-direction:column}
.d-strip figure:last-child{border-right:0}
.d-strip img{width:100%}
.d-strip figcaption{border-top:2px solid var(--ink);padding:16px 14px;display:grid;gap:6px;flex:1}
.d-strip b{font-family:var(--display);font-size:20px}
.d-strip span{font-size:14px;line-height:1.4;opacity:.78}
.d-rest{display:grid;grid-template-columns:1.1fr 1fr;gap:56px;align-items:center}
.d-rest img{border:2px solid var(--ink);box-shadow:8px 8px 0 var(--ink)}
@media(max-width:749px){
 .d-strip{grid-template-columns:1fr 1fr}
 .d-strip figure{border-bottom:2px solid var(--ink)}
 .d-strip figure:nth-child(2n){border-right:0}
 .d-rest{grid-template-columns:1fr;gap:26px}}
""", f"""
<section class="wrap sec">
  <span class="kicker">Walter Ihring</span>
  <h1 style="margin-top:var(--s-head)">Fifty-seven years,<br>six panels.</h1>
  <p class="lead" style="max-width:50ch;margin-top:var(--s-head)">He tells everything else in nine frames.
  It seemed only fair to do the same to him.</p>
</section>

<section class="wrap sec"><div class="d-strip">{strip}</div></section>

<section class="wrap sec d-rest">
  <img src="grid.png" alt="">
  <div><h2>And ten more</h2>
  <p style="margin-top:var(--s-head)">Walter drew his own biography as sixteen panels — his mother dancing,
  his father's violin, a red X across his first published drawing, a skateboard in front of the pyramids.
  It hangs in his studio. This is it.</p>
  <p>Every book since has used the same grammar: a grid, a few words, and the thing you only notice
  the second time.</p>
  <a class="btn" href="#">See what it turned into</a></div>
</section>
""")

# ───────────────────────────────────────────────────────── E · Two pillars
PAIRS = [("football", "The drawing is not the illustration of the text",
          "There is no caption telling you the goalkeeper lost. The panel already told you. "
          "The words in a Walterin book do a different job — they say the thing the picture cannot: "
          "a date, a name, the sentence somebody actually said in 1968."),
         ("homeland", "The text is not the caption of the drawing",
          "Walter writes his books before he finishes drawing them. The research is real — streets, "
          "archives, the awkward bits other guidebooks leave out. Then the drawing decides what gets "
          "cut, which is usually half of it."),
         ("india", "Nine frames, because that is how long a thought is",
          "Short enough for a tram ride, long enough for a turn. It is the unit the whole universe is "
          "built from: the city books, the deck, whatever comes next.")]
pairs = "".join(
    f'<div class="pair{" flip" if i % 2 else ""}"><img src="p-{k}.png" alt="">'
    f'<div><h3>{h}</h3><p style="margin-top:var(--s-head)">{b}</p></div></div>'
    for i, (k, h, b) in enumerate(PAIRS))
page("E", "Two pillars", """
.e-hero{border-bottom:2px solid var(--ink);padding-bottom:var(--s-section)}
.pair{display:grid;grid-template-columns:300px 1fr;gap:64px;align-items:center;padding-block:64px;
 border-bottom:2px solid var(--ink)}
.pair.flip{grid-template-columns:1fr 300px}
.pair.flip>img{order:2}
.pair img{border:2px solid var(--ink);box-shadow:6px 6px 0 var(--ink);width:300px}
.pair h3{font-size:clamp(20px,2vw,27px)}
.pair p{font:400 21px/1.6 var(--lit);max-width:46ch}
.e-who{display:grid;grid-template-columns:150px 1fr;gap:34px;align-items:start;padding-top:var(--s-section)}
.e-who img{border:2px solid var(--ink)}
@media(max-width:749px){.pair,.e-who{grid-template-columns:1fr;gap:24px}.pair.flip>img{order:0}
 .e-who img{width:120px}}
""", f"""
<section class="wrap sec e-hero">
  <h1 style="max-width:16ch">Illustration and text.<br>Neither one is the decoration.</h1>
  <p class="lead" style="max-width:54ch;margin-top:var(--s-block)">Most illustrated books pick a side. The
  picture explains the sentence, or the sentence explains the picture. Walterin books are built the other
  way, and that is the whole brand in one line.</p>
</section>

<section class="wrap">{pairs}</section>

<section class="wrap e-who">
  <img src="p-coffee.png" alt="">
  <div><span class="kicker">Who makes them</span>
  <h2 style="margin-top:var(--s-head)">Walter Ihring</h2>
  <p style="margin-top:var(--s-head)">Born in Bratislava, 1969. Thirty-five years of ink, a Golden Gander
  for caricature in 2016, three books about cities and a deck of 78 cards going to print in three weeks.
  Usually in a café, drawing whoever sits down opposite.</p>
  <a class="btn" href="#">See the deck</a>
  <a class="btn ghost" href="#">His illustrated biography</a></div>
</section>
""")

print("wrote", *[p.name for p in sorted(D.glob("dir-*.html"))])
