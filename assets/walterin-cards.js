/*
  Walterin · card behaviour (sections/meet-the-cards.liquid). No dependencies.

  The flip is the old section's, to the millisecond: rotateY 0→90 in 280ms on power1.in, swap the
  image at the halfway point, then −90→0 in 280ms on power1.out. Between flips 2500–4300ms,
  re-rolled every time; the four start staggered so they never move in sync.

  Rules that keep it from feeling buggy:
  - A click always opens the card that is on screen. What a slot *shows* is tracked separately
    from what it has *reserved*, so a click during a flip can never open the next card.
  - The click target never rotates: it sits over the card, outside the flipping element, so a
    click lands on the first try whatever the flip is doing, on mouse, touch and keyboard alike.
  - Turning stops for the pause control, the open sheet and a hidden tab. Hovering does not stop
    it: the live section doesn't either, and the cards would otherwise look frozen.
  - The tilt is interpolated frame by frame, only one card is ever tilted, and the tilt is dropped
    while a card is flipping. Leaving, cancelling or losing the pointer all reset it.
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
  var TILT = 13;                                     // degrees, corner to corner
  var FOLLOW = 0.4;                                  // how fast the tilt catches the pointer

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function randInt(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function now() { return Date.now(); }

  function init(root) {
    if (!root || root.__wuiCards) return;
    root.__wuiCards = true;

    var data = $('[data-wui-cards]', root);
    var cards = [];
    try { cards = JSON.parse(data.textContent); } catch (e) { return; }
    var slots = $$('[data-wui-slot]', root);
    if (!slots.length) return;

    /* what each slot SHOWS right now (updated with the DOM) */
    var shown = slots.map(function (slot) {
      var nm = $('[data-wui-card-name]', slot);
      var i = cards.findIndex(function (c) { return c.name === (nm ? nm.textContent.trim() : ''); });
      return i < 0 ? 0 : i;
    });
    /* what each slot has RESERVED (set when a flip starts, so two slots can't pick the same card) */
    var reserved = shown.slice();
    var animating = slots.map(function () { return false; });
    var running = slots.map(function () { return null; });   // the flip in flight, so pause can stop it
    var timers = [];
    var paused = reduce;
    var sheetOpen = false;

    // Preload and decode the set: the swap happens edge-on, and a half-loaded image would leave
    // the old picture standing under the new name.
    var ready = {};
    cards.forEach(function (c) {
      var im = new Image();
      im.decoding = 'async';
      im.src = c.src;
      ready[c.src] = im.decode ? im.decode().catch(function () {}) : Promise.resolve();
    });

    function suitOf(i) { return cards[i] && cards[i].suit; }
    function canRotate() { return cards.length > slots.length; }

    function pick(slot) {
      var taken = reserved.slice();
      var left = slot > 0 ? suitOf(reserved[slot - 1]) : null;
      var right = slot < reserved.length - 1 ? suitOf(reserved[slot + 1]) : null;
      var own = suitOf(reserved[slot]);
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
      return p.length ? p[Math.floor(Math.random() * p.length)] : -1;
    }

    function schedule(slot, wait) {
      clearTimeout(timers[slot]);
      timers[slot] = setTimeout(function () { flip(slot); }, wait || randInt(MIN_WAIT, MAX_WAIT));
    }
    // The live section pauses for nothing but the tab going away; we add the pause control and
    // the open sheet. Hovering does NOT stop the row: the click target never rotates, so a card
    // turning under the cursor can't cost anyone a click.
    function blocked(slot) {
      return paused || sheetOpen || document.hidden || animating[slot] || !canRotate();
    }

    function flip(slot) {
      if (blocked(slot)) { schedule(slot); return; }
      var next = pick(slot);
      if (next < 0) { schedule(slot); return; }
      reserved[slot] = next;
      animating[slot] = true;

      var el = slots[slot];
      var flipper = $('[data-wui-flip]', el);
      var card = cards[next];

      var away = flipper.animate(
        [{ transform: 'rotateY(0deg)' }, { transform: 'rotateY(90deg)' }],
        { duration: HALF, easing: EASE_IN, fill: 'forwards' }
      );
      running[slot] = away;
      away.onfinish = function () {
        if (running[slot] !== away) return;            // cancelled by the pause control
        (ready[card.src] || Promise.resolve()).then(function () {
          var im = $('[data-wui-card-img]', el);
          var nm = $('[data-wui-card-name]', el);
          var btn = $('[data-wui-open]', el);
          im.src = card.src;
          im.alt = card.name;
          if (nm) nm.textContent = card.name;
          if (btn) btn.setAttribute('aria-label', card.name);
          shown[slot] = next;                        // the DOM and the bookkeeping change together

          var back = flipper.animate(
            [{ transform: 'rotateY(-90deg)' }, { transform: 'rotateY(0deg)' }],
            { duration: HALF, easing: EASE_OUT, fill: 'forwards' }
          );
          running[slot] = back;
          back.onfinish = function () {
            flipper.getAnimations().forEach(function (a) { a.cancel(); });
            flipper.style.transform = '';
            animating[slot] = false;
            running[slot] = null;
            el.classList.add('is-settling');
            setTimeout(function () { el.classList.remove('is-settling'); }, 240);
            schedule(slot);
          };
        });
      };
    }

    if (!reduce && canRotate()) {
      slots.forEach(function (_, i) { timers[i] = setTimeout(function () { flip(i); }, i * STAGGER + randInt(0, 600)); });
    }

    /* ---------- the row holds still while anyone is near it ---------- */
    var row = $('[data-wui-row]', root);
    row.addEventListener('pointerleave', function () { resetTilt(); });
    row.addEventListener('pointercancel', function () { resetTilt(); });
    window.addEventListener('blur', function () { resetTilt(); });

    /* ---------- tilt: one card at a time, interpolated, never during a flip ---------- */
    var tiltEl = null, tiltSlot = -1, target = { x: 0, y: 0 }, cur = { x: 0, y: 0 }, raf = null;
    function writeTilt(el, x, y, mx, my) {
      el.style.setProperty('--wui-rx', (x * TILT).toFixed(2) + 'deg');
      el.style.setProperty('--wui-ry', (-y * TILT).toFixed(2) + 'deg');
      el.style.setProperty('--wui-rxn', x.toFixed(3));
      el.style.setProperty('--wui-mxn', x.toFixed(3));
      if (mx != null) {
        el.style.setProperty('--wui-mx', (mx * 100).toFixed(1) + '%');
        el.style.setProperty('--wui-my', (my * 100).toFixed(1) + '%');
      }
    }
    function step() {
      if (!tiltEl) { raf = null; return; }
      cur.x += (target.x - cur.x) * FOLLOW;           // catches up fast, but never in one jump
      cur.y += (target.y - cur.y) * FOLLOW;
      writeTilt(tiltEl, cur.x, cur.y);
      if (Math.abs(target.x - cur.x) < 0.002 && Math.abs(target.y - cur.y) < 0.002) {
        writeTilt(tiltEl, target.x, target.y);
        raf = null;
        if (target.x === 0 && target.y === 0) { tiltEl.classList.remove('is-tilting'); tiltEl = null; tiltSlot = -1; }
        return;
      }
      raf = requestAnimationFrame(step);
    }
    function resetTilt(onlyEl) {
      if (!tiltEl) return;
      if (onlyEl && !onlyEl.contains(tiltEl)) return;
      target.x = 0; target.y = 0;
      if (!raf) raf = requestAnimationFrame(step);
    }
    function hardReset(el) {
      el.style.setProperty('--wui-rx', '0deg');
      el.style.setProperty('--wui-ry', '0deg');
      el.style.setProperty('--wui-rxn', '0');
      el.classList.remove('is-tilting');
    }
    if (!reduce) slots.forEach(function (el, i) {
      var t = $('[data-wui-tilt]', el);          // the stage, not the button: tilt survives a flip
      el.addEventListener('pointermove', function (e) {
        if (e.pointerType === 'touch') return;
        if (tiltEl && tiltEl !== t) { hardReset(tiltEl); }   // only ever one tilted card
        if (tiltEl !== t) { cur.x = 0; cur.y = 0; tiltEl = t; tiltSlot = i; t.classList.add('is-tilting'); }
        var r = t.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        target.x = Math.max(-0.5, Math.min(0.5, x - 0.5));
        target.y = Math.max(-0.5, Math.min(0.5, y - 0.5));
        writeTilt(t, cur.x, cur.y, x, y);
        if (!raf) raf = requestAnimationFrame(step);
      });
      el.addEventListener('pointerleave', function () { resetTilt(); });
    });

    /* ---------- the hint fades once, then never comes back ---------- */
    var hint = $('[data-wui-hint]', root);
    if (hint) {
      var fade = setTimeout(function () { hint.classList.add('is-gone'); }, 6000);
      var gone = function () { clearTimeout(fade); hint.classList.add('is-gone'); };
      ['pointerdown', 'keydown'].forEach(function (ev) { row.addEventListener(ev, gone, { once: true }); });
      var pauseEl = $('[data-wui-pause]', root);
      if (pauseEl) pauseEl.addEventListener('click', gone, { once: true });
    }

    /* ---------- pause control ---------- */
    var pause = $('[data-wui-pause]', root);
    var PLAY_ICON = '<svg class="wui-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4 2l10 6-10 6z"></path></svg>';
    var PAUSE_ICON = '<svg class="wui-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><rect x="3" y="2" width="4" height="12" rx="1"></rect><rect x="9" y="2" width="4" height="12" rx="1"></rect></svg>';
    if (pause) {
      if (reduce || !canRotate()) {
        pause.setAttribute('aria-pressed', 'true');
        pause.innerHTML = PLAY_ICON;
        pause.setAttribute('aria-label', pause.dataset.labelPlay);
      }
      pause.addEventListener('click', function () {
        paused = !paused;
        if (paused) stopAll();
        pause.setAttribute('aria-pressed', String(paused));
        pause.setAttribute('aria-label', paused ? pause.dataset.labelPlay : pause.dataset.labelPause);
        pause.innerHTML = paused ? PLAY_ICON : PAUSE_ICON;
        if (!paused) slots.forEach(function (_, i) { schedule(i, randInt(400, 1200)); });
      });
    }

    // Stop everything on the spot: cancel a flip in flight and set the card face-up again,
    // keeping whatever it was showing. WCAG 2.2.2 means stopped, not "stopped after this one".
    function stopAll() {
      slots.forEach(function (el, i) {
        clearTimeout(timers[i]);
        var flipper = $('[data-wui-flip]', el);
        if (running[i]) { running[i] = null; }
        flipper.getAnimations().forEach(function (a) { a.cancel(); });
        flipper.style.transform = '';
        animating[i] = false;
        reserved[i] = shown[i];
      });
    }

    /* ---------- the card sheet: always the card you can see ---------- */
    var sheet = $('[data-wui-sheet]', root);
    var opener = null;

    root.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-wui-open]');
      if (!btn) return;
      var el = btn.closest('[data-wui-slot]');
      var i = slots.indexOf(el);
      if (i < 0) return;
      var card = cards[shown[i]];                    // what is on screen, not what is reserved
      if (!sheet || typeof sheet.showModal !== 'function') return;   // no dialog support: leave the card alone
      e.preventDefault();
      opener = btn;
      sheetOpen = true;
      $('[data-wui-sheet-name]', sheet).textContent = card.name;
      var im = $('[data-wui-sheet-img]', sheet);
      im.src = card.src;
      im.alt = card.name;
      sheet.showModal();
      document.documentElement.style.overflow = 'hidden';   // nothing scrolls behind the sheet
    });
    if (sheet) {
      var closeBtn = $('[data-wui-sheet-close]', sheet);
      if (closeBtn) closeBtn.addEventListener('click', function () { sheet.close(); });
      sheet.addEventListener('click', function (e) { if (e.target === sheet) sheet.close(); });
      sheet.addEventListener('close', function () {
        document.documentElement.style.overflow = '';
        sheetOpen = false;
        if (opener) opener.focus();
        slots.forEach(function (_, i) { schedule(i); });
      });
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
