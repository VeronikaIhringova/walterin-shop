/*
  Walterin · card behaviour (sections/meet-the-cards.liquid). No dependencies.

  - The flip is the old section's, to the millisecond: rotateY 0→90 in 280ms on power1.in,
    swap the image at the halfway point, then −90→0 in 280ms on power1.out. Between flips
    2500–4300ms, re-rolled every time; the four start staggered so they never move in sync.
  - A slot can never show a card another slot is already showing: the next card is reserved
    synchronously when the flip starts, not when the image swaps.
  - Turning stops while someone is using the row (pointer inside, focus inside, an open sheet,
    a hidden tab), and there is a real pause control as well (WCAG 2.2.2).
  - Paper feel: the card lifts and its shadow leans with the tilt, and it settles after a flip.
  - prefers-reduced-motion: no turning, no tilt, no settle. Everything still works.
*/
(function () {
  'use strict';

  var reduce = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  var EASE_IN = 'cubic-bezier(.55,.085,.68,.53)';   // GSAP power1.in
  var EASE_OUT = 'cubic-bezier(.25,.46,.45,.94)';   // GSAP power1.out
  var HALF = 280;                                    // each half of the flip
  var MIN_WAIT = 2500, MAX_WAIT = 4300;              // between flips
  var STAGGER = 650;                                 // between the slots' first flips

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function randInt(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }

  function init(root) {
    if (!root || root.__wuiCards) return;
    root.__wuiCards = true;

    var data = $('[data-wui-cards]', root);
    var cards = [];
    try { cards = JSON.parse(data.textContent); } catch (e) { return; }
    var slots = $$('[data-wui-slot]', root);
    if (!slots.length || cards.length <= slots.length) return; // nothing to rotate into

    // What each slot is showing right now, by index into `cards`. Reserved on pick, so two
    // slots can never land on the same card even if their timers fire in the same tick.
    var current = slots.map(function (slot) {
      var name = $('[data-wui-card-name]', slot);
      var shown = name ? name.textContent.trim() : '';
      var i = cards.findIndex(function (c) { return c.name === shown; });
      return i < 0 ? 0 : i;
    });
    // Preload the set: the swap happens at the edge-on midpoint, and a half-loaded image
    // would leave the old picture under the new name.
    var ready = {};
    cards.forEach(function (c) {
      var im = new Image();
      im.decoding = 'async';
      im.src = c.src;
      ready[c.src] = im.decode ? im.decode().catch(function () {}) : Promise.resolve();
    });

    var timers = [];
    var paused = reduce;
    var busy = false;   // a sheet is open
    var hovering = false;

    function suitOf(i) { return cards[i] && cards[i].suit; }

    // Prefer a card whose suit differs from the neighbours'; relax the rule rather than deadlock.
    function pick(slot) {
      var taken = current.slice();
      var left = slot > 0 ? suitOf(current[slot - 1]) : null;
      var right = slot < current.length - 1 ? suitOf(current[slot + 1]) : null;
      var own = suitOf(current[slot]);
      function pool(avoidOwn, avoidNeighbours) {
        return cards.map(function (c, i) { return i; }).filter(function (i) {
          if (taken.indexOf(i) >= 0) return false;
          if (avoidOwn && suitOf(i) === own) return false;
          if (avoidNeighbours && (suitOf(i) === left || suitOf(i) === right)) return false;
          return true;
        });
      }
      var p = pool(true, true);
      if (!p.length) p = pool(false, true);
      if (!p.length) p = pool(true, false);
      if (!p.length) p = pool(false, false);
      if (!p.length) return -1;
      return p[Math.floor(Math.random() * p.length)];
    }

    function schedule(slot, wait) {
      clearTimeout(timers[slot]);
      timers[slot] = setTimeout(function () { flip(slot); }, wait || randInt(MIN_WAIT, MAX_WAIT));
    }

    function flip(slot) {
      if (paused || busy || hovering || document.hidden) { schedule(slot); return; }
      var next = pick(slot);
      if (next < 0) { schedule(slot); return; }
      current[slot] = next;                    // reserved before anything animates

      var el = slots[slot];
      var flipper = $('[data-wui-flip]', el);
      var card = cards[next];
      var away = flipper.animate(
        [{ transform: 'rotateY(0deg)' }, { transform: 'rotateY(90deg)' }],
        { duration: HALF, easing: EASE_IN, fill: 'forwards' }
      );
      away.onfinish = function () {
        (ready[card.src] || Promise.resolve()).then(function () {
        var im = $('[data-wui-card-img]', el);
        var nm = $('[data-wui-card-name]', el);
        var btn = $('[data-wui-open]', el);
        im.src = card.src; im.alt = card.name;
        if (nm) nm.textContent = card.name;
        if (btn) btn.setAttribute('aria-label', card.name);
        var back = flipper.animate(
          [{ transform: 'rotateY(-90deg)' }, { transform: 'rotateY(0deg)' }],
          { duration: HALF, easing: EASE_OUT, fill: 'forwards' }
        );
        back.onfinish = function () {
          flipper.getAnimations().forEach(function (a) { a.cancel(); });
          flipper.style.transform = '';
          el.classList.add('is-settling');
          setTimeout(function () { el.classList.remove('is-settling'); }, 240);
          schedule(slot);
        };
        });
      };
    }

    if (!reduce) slots.forEach(function (_, i) { timers[i] = setTimeout(function () { flip(i); }, i * STAGGER + randInt(0, 600)); });

    /* ---------- pausing ---------- */
    var row = $('[data-wui-row]', root);
    var leaveTimer = null;
    row.addEventListener('pointerenter', function () { hovering = true; clearTimeout(leaveTimer); });
    row.addEventListener('pointerleave', function () { leaveTimer = setTimeout(function () { hovering = false; }, 3000); });
    row.addEventListener('focusin', function () { hovering = true; });
    row.addEventListener('focusout', function () { leaveTimer = setTimeout(function () { hovering = false; }, 3000); });

    var pause = $('[data-wui-pause]', root);
    var PLAY_ICON = '<svg class="wui-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4 2l10 6-10 6z"></path></svg>';
    var PAUSE_ICON = '<svg class="wui-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><rect x="3" y="2" width="4" height="12" rx="1"></rect><rect x="9" y="2" width="4" height="12" rx="1"></rect></svg>';
    if (pause) {
      if (reduce) { pause.setAttribute('aria-pressed', 'true'); pause.innerHTML = PLAY_ICON; pause.setAttribute('aria-label', pause.dataset.labelPlay); }
      pause.addEventListener('click', function () {
        paused = !paused;
        pause.setAttribute('aria-pressed', String(paused));
        pause.setAttribute('aria-label', paused ? pause.dataset.labelPlay : pause.dataset.labelPause);
        pause.innerHTML = paused ? PLAY_ICON : PAUSE_ICON;
        if (!paused) slots.forEach(function (_, i) { schedule(i, randInt(400, 1200)); });
      });
    }

    /* ---------- the hint fades once, then never comes back ---------- */
    var hint = $('[data-wui-hint]', root);
    if (hint) {
      var fade = setTimeout(function () { hint.classList.add('is-gone'); }, 6000);
      ['pointerdown', 'keydown'].forEach(function (ev) {
        row.addEventListener(ev, function () { clearTimeout(fade); hint.classList.add('is-gone'); }, { once: true });
      });
    }

    /* ---------- paper feel: tilt, sheen, a shadow that leans ---------- */
    if (!reduce) slots.forEach(function (el) {
      var t = $('[data-wui-open]', el);
      t.addEventListener('pointermove', function (e) {
        if (e.pointerType === 'touch') return;
        var r = t.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        t.style.setProperty('--wui-rx', ((x - 0.5) * 8).toFixed(2) + 'deg');
        t.style.setProperty('--wui-ry', ((0.5 - y) * 8).toFixed(2) + 'deg');
        t.style.setProperty('--wui-rxn', (x - 0.5).toFixed(3));
        t.style.setProperty('--wui-mx', (x * 100).toFixed(1) + '%');
        t.style.setProperty('--wui-my', (y * 100).toFixed(1) + '%');
      });
      t.addEventListener('pointerleave', function () {
        t.style.setProperty('--wui-rx', '0deg');
        t.style.setProperty('--wui-ry', '0deg');
        t.style.setProperty('--wui-rxn', '0');
      });
    });

    /* ---------- the card sheet ---------- */
    var sheet = $('[data-wui-sheet]', root);
    if (sheet && typeof sheet.showModal === 'function') {
      var opener = null;
      root.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-wui-open]');
        if (!btn) return;
        var el = btn.closest('[data-wui-slot]');
        var i = current[slots.indexOf(el)];
        var card = cards[i];
        opener = btn;
        busy = true;
        $('[data-wui-sheet-name]', sheet).textContent = card.name;
        var im = $('[data-wui-sheet-img]', sheet);
        im.src = card.src; im.alt = card.name;
        sheet.showModal();
      });
      $('[data-wui-sheet-close]', sheet).addEventListener('click', function () { sheet.close(); });
      sheet.addEventListener('click', function (e) { if (e.target === sheet) sheet.close(); });
      sheet.addEventListener('close', function () { busy = false; if (opener) opener.focus(); });
    }

    document.addEventListener('visibilitychange', function () {
      if (!document.hidden && !paused) slots.forEach(function (_, i) { schedule(i); });
    });
  }

  function start() { $$('[data-wui-meet]').forEach(init); }
  document.addEventListener('shopify:section:load', function (e) { $$('[data-wui-meet]', e.target).forEach(init); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
