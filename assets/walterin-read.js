/* Walterin · How a card is read (sections/how-a-card-is-read.liquid)
   ------------------------------------------------------------------
   One frame of a card at a time: the note on the left holds the frame enlarged, its row and its
   field, its caption and the row's explanation; a drawn arrow runs across the gutter and stops
   short of the card, aimed along the line into that frame's centre.

   The walk holds every frame the same length and the step dots fill as that time runs out, so the
   change is never a surprise. Timing and its sources: docs/design/AUTOPLAY-WALK.md.

   FRAMES below is measured data, not settings: the nine-frame grid of each artwork (percentages of
   the image) and the captions printed inside the frames. Measured in docs/design/data/preview-cards.json.
   The path card's own grid is the same in both languages — docs/design/NINE-FRAME-PATH.md. */
(function () {
  var FRAMES = {
    "wi-major-05.jpg": { rows: [1.67, 31.66, 62.1, 90.33], cols: [3.25, 33.62, 64.25, 96.0], captions: ["TO AWAKEN THE WILL", "TO RECOGNISE STRENGTH", "TO TRUST THE SOURCE", "TO LEARN TO FOCUS", "TO BE OPEN TO POSSIBILITY", "TO PREVAIL THROUGH CREATIVITY", "TO PROTECT THE VISION", "TO FLOW WITH AWARENESS", "TO LET IT BECOME"] },
    "wi-major-01.jpg": { rows: [1.83, 31.74, 62.1, 90.33], cols: [4.62, 35.88, 66.38, 96.12], captions: ["TO AWAKEN COURAGE", "TO RECOGNISE UNITY", "TO TRUST THE PATH", "TO LEARN TO TRUST ONESELF", "TO ACCEPT RISK", "TO PREVAIL WITH EASE", "TO PROTECT JOY", "TO FLOW WITH THE PRESENT", "TO FINISH IN FREEDOM"] },
    "wi-major-02.jpg": { rows: [2.13, 32.42, 62.33, 91.4], cols: [3.25, 33.88, 64.88, 96.62], captions: ["TO AWAKEN ACCEPTANCE", "TO RECOGNISE MOVEMENT", "TO TRUST THE ORDER", "TO LEARN TO FLOW", "TO EMBRACE DESTINY", "TO PREVAIL THROUGH TRUST", "TO PROTECT THE CENTRE", "TO FLOW WITH WISDOM", "TO COME FULL CIRCLE"] },
    "wi-major-04.jpg": { rows: [2.13, 31.81, 62.48, 91.7], cols: [3.25, 34.12, 66.0, 97.0], captions: ["TO AWAKEN HOPE", "TO RECOGNISE THE LIGHT", "TO TRUST THE CLEANSING", "TO LEARN TO HEAL", "TO EMBRACE PURITY", "TO PREVAIL THROUGH HEALING", "TO PROTECT FAITH", "TO FLOW WITH RADIANCE", "TO ACHIEVE REBIRTH"] },
    "wi-wands-01.jpg": { rows: [1.67, 31.89, 62.63, 90.79], cols: [3.25, 35.5, 67.0, 97.12], captions: ["TO FEEL DESIRE AND FEAR", "TO RECOGNISE POSSIBILITIES", "TO CHOOSE A DIRECTION", "TO TRUST INTENTION", "TO MAINTAIN COURAGE", "TO UNITE MIND AND HEART", "TO CROSS THE THRESHOLD", "TO COMMIT TO THE PATH", "TO WALK WITHOUT FEAR"] },
    "wi-wands-03.jpg": { rows: [1.83, 32.27, 62.63, 91.7], cols: [3.0, 35.62, 67.0, 97.25], captions: ["TO FOLLOW THE ADVENTURE", "TO STEP BEYOND CERTAINTY", "TO MASTER THE FIRE", "TO ACT FROM THE HEART", "TO LEARN PATIENCE", "TO DIRECT ENERGY", "TO WALK TOWARDS THE SUMMIT", "TO MASTER IMPULSIVENESS", "TO AWAKEN INSPIRATION"] },
    "wi-cups-01.jpg": { rows: [1.75, 32.5, 63.39, 91.48], cols: [2.62, 36.25, 67.12, 97.0], captions: ["TO EMBRACE THE PAST", "TO SENSE INNOCENCE", "TO FIND JOY ANEW", "TO HEAL MEMORIES", "TO RECOGNISE PURITY", "TO SHAPE THE SOUL", "TO BRING GOODNESS", "TO RESTORE TRUST", "TO LIVE WITH LOVE"] },
    "wi-swords-03.jpg": { rows: [1.67, 31.66, 62.94, 91.4], cols: [3.12, 35.62, 66.88, 96.5], captions: ["TO BECOME AWARE OF ESCAPE", "TO RECOGNISE DECEPTION", "TO UNDERSTAND INTENTION", "TO ADMIT THE TRUTH", "TO TRUST INTUITION", "TO FIND HONESTY", "TO UNCOVER SELF-DECEPTION", "TO PURIFY INTENTION", "TO ALIGN WORD AND ACTION"] },
    "wi-pentacles-01.jpg": { rows: [1.6, 32.42, 62.86, 91.63], cols: [3.0, 35.88, 66.62, 97.0], captions: ["TO LIVE IN MOTION", "TO MOVE WITH LIFE", "TO SET PRIORITIES", "TO CULTIVATE FLEXIBILITY", "TO EMBRACE CHANGE", "TO SOFTEN CHAOS WITH RHYTHM", "TO UNITE OPPOSITES", "TO ACT WITH EASE", "TO SWIM THROUGH THE SWELL"] },
    "wi-pentacles-02.jpg": { rows: [1.6, 32.34, 63.39, 91.86], cols: [3.0, 35.75, 66.75, 97.12], captions: ["TO LET THINGS RIPEN", "TO FEEL LIFE GROWING", "TO THINK IN CYCLES", "TO CULTIVATE PATIENCE", "TO LEARN THROUGH OBSERVATION", "TO TRUST THE SEED", "TO PRESERVE ONE'S STRENGTH", "TO FOCUS ATTENTION", "TO HARVEST WITH GRATITUDE"] }
  };
  /* the printed path card's grid lines, as percentages of the card. The same for both languages. */
  var PATH = { cols: [13.54, 39.00, 65.09, 91.97], rows: [10.10, 35.97, 60.93, 85.02] };

  function parse(node) { try { return JSON.parse(node.textContent); } catch (e) { return null; } }
  function fileOf(src) { return (src || '').split('/').pop().split('?')[0]; }
  function rowOf(i) { return Math.floor(i / 3); }

  function init(root) {
    if (!root || root.dataset.wuiReadReady) return;
    var dataNode = root.querySelector('[data-wui-read-cards]');
    var copyNode = root.querySelector('[data-wui-read-copy]');
    if (!dataNode || !copyNode) return;
    var cards = parse(dataNode) || [], T = parse(copyNode) || {};
    cards = cards.filter(function (c) { return FRAMES[fileOf(c.src)]; });
    if (!cards.length) return;
    root.dataset.wuiReadReady = '1';

    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var grid = root.querySelector('[data-wui-read-grid]');
    var noteslot = root.querySelector('[data-wui-read-note]');
    var cardslot = root.querySelector('[data-wui-read-card]');
    var svg = root.querySelector('[data-wui-read-link]');
    var dots = root.querySelector('[data-wui-read-dots]');
    var live = root.querySelector('[data-wui-read-live]');
    var walkBtn = root.querySelector('[data-wui-read-walk]');
    var dlg = root.querySelector('[data-wui-read-dialog]');
    var sysBtn = root.querySelector('[data-wui-read-system]');
    var nameEl = root.querySelector('[data-wui-read-name]');
    var S = { card: 0, frame: 0 };
    var HOLD = (+root.dataset.wuiHold || 7) * 1000, BEAT = 800;
    var W = { on: false, i: -1, timer: null, endAt: 0, left: 0, fill: null, pauses: {} };

    function card() { return cards[S.card]; }
    function art() { return FRAMES[fileOf(card().src)]; }
    function caption(i) { return art().captions[i]; }

    function cropStyle(i) {
      var g = art(), r = rowOf(i), c = i % 3;
      var fw = (g.cols[c + 1] - g.cols[c]) / 100, fh = (g.rows[r + 1] - g.rows[r]) / 100;
      var px = (g.cols[c] / 100) / (1 - fw) * 100, py = (g.rows[r] / 100) / (1 - fh) * 100;
      return 'background-image:url(' + card().src + ');background-size:' + (100 / fw).toFixed(2) + '% ' +
        (100 / fh).toFixed(2) + '%;background-position:' + px.toFixed(2) + '% ' + py.toFixed(2) +
        '%;aspect-ratio:' + ((fw * 800) / (fh * 1314)).toFixed(3) + ';';
    }
    function frameRing(i) {
      var g = art(), r = rowOf(i), c = i % 3;
      return 'left:' + g.cols[c] + '%;width:' + (g.cols[c + 1] - g.cols[c]) + '%;top:' + g.rows[r] +
        '%;height:' + (g.rows[r + 1] - g.rows[r]) + '%;';
    }
    function pathRing(i) {
      var r = rowOf(i), c = i % 3;
      return 'left:' + PATH.cols[c] + '%;width:' + (PATH.cols[c + 1] - PATH.cols[c]) + '%;top:' + PATH.rows[r] +
        '%;height:' + (PATH.rows[r + 1] - PATH.rows[r]) + '%;';
    }
    function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (m) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[m]; }); }

    function cardHTML() {
      var h = '<div class="wui-read__cardbox" data-wui-read-cardbox><img src="' + esc(card().src) + '" alt="' + esc(card().name) + '" width="800" height="1314" loading="lazy">';
      for (var i = 0; i < 9; i++) {
        h += '<button class="wui-read__hot" type="button" data-frame="' + i + '" data-n="' + (i + 1) + '" style="' + frameRing(i) +
          '" aria-label="' + esc(T.rows[rowOf(i)] + ': ' + caption(i)) + '"></button>';
      }
      return h + '<span class="wui-read__ring" data-wui-read-ring style="' + frameRing(S.frame) + '"></span></div>';
    }
    function noteHTML() {
      var r = rowOf(S.frame), f = S.frame % 3;
      return '<div class="wui-read__note">' +
        '<span class="wui-read__n">' + esc((T.frame_of || '').replace('[n]', S.frame + 1)) + '</span>' +
        '<span class="wui-read__crop" style="' + cropStyle(S.frame) + '"></span>' +
        '<span class="wui-read__text">' +
          '<dl class="wui-read__coord"><dt>' + esc(T.row_word) + '</dt><dd>' + esc(T.rows[r]) + '</dd>' +
          '<dt>' + esc(T.field_word) + '</dt><dd>' + esc(T.fields[r][f]) + '</dd></dl>' +
          '<span class="wui-read__cap">' + esc(caption(S.frame)) + '</span>' +
          '<span class="wui-read__why">' + esc(T.why[r]) + '</span>' +
        '</span></div>';
    }
    function dotsHTML() {
      var h = '';
      for (var r = 0; r < 3; r++) {
        h += '<span class="wui-read__dotgroup">';
        for (var c = 0; c < 3; c++) {
          var i = r * 3 + c;
          h += '<span class="wui-read__dot' + (i === S.frame ? ' is-on' : (i < S.frame ? ' is-done' : '')) +
            '" data-dot="' + i + '"><i></i></span>';
        }
        h += '</span>';
      }
      return h;
    }

    /* the arrow: one line, aimed along the line into the frame's centre, stopping short of the card */
    function drawLink() {
      var note = root.querySelector('.wui-read__note');
      var cb = root.querySelector('[data-wui-read-cardbox]');
      if (!svg || !note || !cb || !grid) return;
      var gr = grid.getBoundingClientRect(), n = note.getBoundingClientRect(), c = cb.getBoundingClientRect();
      var g = art(), r = rowOf(S.frame), col = S.frame % 3;
      svg.setAttribute('viewBox', '0 0 ' + gr.width + ' ' + gr.height);
      svg.setAttribute('preserveAspectRatio', 'none');
      svg.innerHTML = '';
      var fx = c.left - gr.left + c.width * (g.cols[col] + g.cols[col + 1]) / 200;
      var fy = c.top - gr.top + c.height * (g.rows[r] + g.rows[r + 1]) / 200;
      var x0 = n.right - gr.left + 2, y0 = fy + [46, 0, -46][r];
      var stopX = c.left - gr.left - 10;
      var dx = fx - x0, dy = fy - y0, len = Math.hypot(dx, dy) || 1, ux = dx / len, uy = dy / len;
      if (ux < 0.05 || stopX <= x0 + 16) return;
      var t = (stopX - x0) / ux, tipX = x0 + ux * t, tipY = y0 + uy * t;
      var HEAD = 11, HALF = 4.6, bow = 7;
      var ex = tipX - ux * HEAD, ey = tipY - uy * HEAD;
      var c1x = x0 + ux * t * 0.34 - uy * bow, c1y = y0 + uy * t * 0.34 + ux * bow;
      var c2x = ex - ux * t * 0.28, c2y = ey - uy * t * 0.28;
      svg.innerHTML =
        '<path class="wui-read__shaft" d="M ' + x0.toFixed(1) + ' ' + y0.toFixed(1) + ' C ' +
          c1x.toFixed(1) + ' ' + c1y.toFixed(1) + ' ' + c2x.toFixed(1) + ' ' + c2y.toFixed(1) + ' ' +
          ex.toFixed(1) + ' ' + ey.toFixed(1) + '"></path>' +
        '<path class="wui-read__head" d="M ' + tipX.toFixed(1) + ' ' + tipY.toFixed(1) +
          ' L ' + (ex - uy * HALF).toFixed(1) + ' ' + (ey + ux * HALF).toFixed(1) +
          ' L ' + (ex + uy * HALF).toFixed(1) + ' ' + (ey - ux * HALF).toFixed(1) + ' Z"></path>';
    }

    /* during the walk the highlight moves by transform: nine moves, no layout shift */
    function slideRing(node, i) {
      var g = art(), r = rowOf(i), c = i % 3;
      var bw = g.cols[1] - g.cols[0], bh = g.rows[1] - g.rows[0];
      node.style.transform = 'translate(' + ((g.cols[c] - g.cols[0]) / bw * 100).toFixed(2) + '%,' +
        ((g.rows[r] - g.rows[0]) / bh * 100).toFixed(2) + '%) scale(' +
        ((g.cols[c + 1] - g.cols[c]) / bw).toFixed(4) + ',' + ((g.rows[r + 1] - g.rows[r]) / bh).toFixed(4) + ')';
    }

    function setFrame(i, fromWalk) {
      if (!fromWalk && W.fill) { W.fill.cancel(); W.fill = null; }
      S.frame = (i + 9) % 9;
      var ring = root.querySelector('[data-wui-read-ring]');
      if (ring) {
        if (fromWalk) {
          if (!ring.dataset.based) { ring.setAttribute('style', frameRing(0)); ring.dataset.based = '1'; }
          slideRing(ring, S.frame);
        } else {
          ring.style.transform = ''; delete ring.dataset.based;
          ring.setAttribute('style', frameRing(S.frame));
        }
      }
      noteslot.innerHTML = noteHTML();
      dots.innerHTML = dotsHTML();
      var pr = root.querySelector('[data-wui-read-pathring]');
      if (pr) pr.setAttribute('style', pathRing(S.frame));
      drawLink();
      if (live) live.textContent = T.rows[rowOf(S.frame)] + ' · ' + T.fields[rowOf(S.frame)][S.frame % 3] + ' · ' + caption(S.frame);
    }
    function setCard(i) {
      S.card = (i + cards.length) % cards.length;
      cardslot.innerHTML = cardHTML();
      if (nameEl) nameEl.textContent = card().name;
      root.querySelectorAll('[data-card]').forEach(function (b) {
        b.setAttribute('aria-pressed', String(+b.dataset.card === S.card));
      });
      setFrame(0);
    }

    /* ---- the walk: every frame the same length, the dots showing the time left ---- */
    function fillDot(i, ms) {
      var dot = root.querySelector('[data-dot="' + i + '"] i');
      if (!dot) return;
      if (reduce) { dot.style.transform = 'scaleY(1)'; return; }
      W.fill = dot.animate([{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }],
        { duration: ms, easing: 'linear', fill: 'forwards' });
    }
    function schedule(ms) { W.endAt = Date.now() + ms; W.timer = setTimeout(walkNext, ms); }
    function walkNext() {
      W.i++;
      if (W.i > 8) return walkEnd();
      var beat = W.i > 0 && W.i % 3 === 0 ? BEAT : 0;
      setFrame(W.i, true);
      fillDot(W.i, HOLD);
      schedule(HOLD + beat);
    }
    function walkStart() {
      W.on = true; W.pauses = {};
      W.i = S.frame >= 8 ? -1 : S.frame - 1;
      walkBtn.textContent = T.stop; walkBtn.setAttribute('aria-pressed', 'true');
      walkNext();
    }
    function walkEnd() {
      if (!W.on) return;
      clearTimeout(W.timer);
      if (W.fill) { W.fill.cancel(); W.fill = null; }
      W.on = false; W.i = -1; W.pauses = {};
      walkBtn.textContent = T.walk; walkBtn.setAttribute('aria-pressed', 'false');
    }
    function walkPause(why) {
      if (!W.on) return;
      var was = Object.keys(W.pauses).length;
      W.pauses[why] = 1;
      if (!was) { clearTimeout(W.timer); W.left = Math.max(400, W.endAt - Date.now()); if (W.fill) W.fill.pause(); }
    }
    function walkResume(why) {
      if (!W.on || !W.pauses[why]) return;
      delete W.pauses[why];
      if (!Object.keys(W.pauses).length) { schedule(W.left); if (W.fill) W.fill.play(); }
    }

    /* ---- wiring ---- */
    setCard(0);

    if (walkBtn) walkBtn.addEventListener('click', function () { W.on ? walkEnd() : walkStart(); });
    root.addEventListener('click', function (e) {
      if (e.target.closest('[data-wui-read-walk]') || e.target.closest('[data-wui-read-dialog]') ||
          e.target.closest('[data-wui-read-system]')) return;
      var f = e.target.closest('[data-frame]');
      if (f) { walkEnd(); return setFrame(+f.dataset.frame); }
      var s = e.target.closest('[data-step]');
      if (s) { walkEnd(); return setFrame(S.frame + (+s.dataset.step)); }
      var c = e.target.closest('[data-card]');
      if (c) { walkEnd(); return setCard(+c.dataset.card); }
    });
    root.addEventListener('keydown', function (e) {
      if (dlg && dlg.open) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); walkEnd(); setFrame(S.frame + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); walkEnd(); setFrame(S.frame - 1); }
      if (e.key === 'Escape') walkEnd();
    }, true);
    root.addEventListener('focusin', function (e) {
      if (W.on && !e.target.closest('[data-wui-read-walk]') && !e.target.closest('[data-wui-read-system]') &&
          !e.target.closest('[data-wui-read-dialog]') && grid.contains(e.target)) walkEnd();
    });
    if (sysBtn && dlg) {
      sysBtn.addEventListener('click', function () {
        var pr = root.querySelector('[data-wui-read-pathring]');
        if (pr) pr.setAttribute('style', pathRing(S.frame));
        walkPause('dialog');
        if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
      });
      var closeBtn = root.querySelector('[data-wui-read-close]');
      if (closeBtn) closeBtn.addEventListener('click', function () { dlg.close(); });
      dlg.addEventListener('close', function () { walkResume('dialog'); });
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (en) { en.intersectionRatio < 0.5 ? walkPause('view') : walkResume('view'); });
      }, { threshold: [0, 0.5, 1] }).observe(grid);
    }
    document.addEventListener('visibilitychange', function () { document.hidden ? walkPause('tab') : walkResume('tab'); });
    window.addEventListener('resize', drawLink);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawLink);
    root.querySelectorAll('[data-wui-read-card] img').forEach(function (im) {
      if (!im.complete) im.addEventListener('load', drawLink);
    });
  }

  function boot(scope) { (scope || document).querySelectorAll('[data-wui-read]').forEach(init); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { boot(); });
  else boot();
  document.addEventListener('shopify:section:load', function (e) { boot(e.target); });
})();
