/*
  Comics Tarot page: one small shared script, loaded only on templates/product.tarot.json.

  Sections never call each other directly. They talk through data attributes and window.Tarot:

    Tarot.state.edition        'en' | 'sk'
    Tarot.state.reading        { kind: 'day' | 'three', cards: ['18', ...] } | null
    Tarot.setEdition(ed)       selects the real variant radio, updates every [data-edname]
    Tarot.setMode(mode)        'read' | 'day' | 'three': switches the How-to-read tabs
    Tarot.openCard(id, row?)   opens a card in "Read a card" (row 0–2 lights frame row*3+1)
    Tarot.setReading(kind, ids)
    Tarot.card(id)             { id, name, src, thumb, x:[4], y:[4] } from #tarot-data

  Markup hooks (work anywhere on the page, delegated):
    [data-mode-link="day"]      open a How-to-read tab and scroll there
    [data-open-card="18"]       read this card (optional [data-row="1"])
    [data-set-edition="sk"]     choose an edition and scroll to the buy box
    [data-focus-notify]         scroll to the buy box and focus the email field
    [data-edname]               text replaced with the current edition's name
    [data-tarot-module="name"]  section root; initialised by Tarot.modules[name](el)

  Events on document: tarot:edition, tarot:mode, tarot:open, tarot:reading (detail = payload).
  All links keep a real href (#tarot-read, #tarot-buy), so the page works without this file.
*/
(function () {
  'use strict';

  var doc = document;
  var motionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var hoverQuery = window.matchMedia ? window.matchMedia('(hover: none)') : null;

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function reduced() { return !!(motionQuery && motionQuery.matches); }
  function touch() { return !!(hoverQuery && hoverQuery.matches); }
  function wait(ms) { return new Promise(function (r) { setTimeout(r, reduced() ? 0 : ms); }); }
  function emit(name, detail) { doc.dispatchEvent(new CustomEvent('tarot:' + name, { detail: detail })); }

  /* ---------- data ---------- */
  var data = { cards: [], rows: [] };
  try {
    var dataEl = doc.getElementById('tarot-data');
    if (dataEl) data = JSON.parse(dataEl.textContent);
  } catch (e) { /* page still renders server-side without it */ }
  var byId = {};
  data.cards.forEach(function (c) { byId[c.id] = c; });

  /* ---------- scrolling ---------- */
  function scrollToEl(el) {
    if (!el) return;
    el.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });
  }
  function scrollToHook(name) { scrollToEl($('[data-tarot-anchor="' + name + '"]')); }

  var Tarot = {
    data: data,
    modules: {},
    state: { edition: 'en', mode: 'read', reading: null },
    $: $,
    $$: $$,
    wait: wait,
    reduced: reduced,
    touch: touch,
    emit: emit,
    scrollTo: scrollToHook,
    card: function (id) { return byId[id]; },
    randomCards: function (n, exclude) {
      var pool = data.cards.map(function (c) { return c.id; }).filter(function (id) {
        return !exclude || exclude.indexOf(id) < 0;
      });
      var out = [];
      while (out.length < n && pool.length) out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
      return out;
    }
  };

  /* ---------- edition ---------- */
  // S1 renders one radio per variant: <input type="radio" name="id" value="{variant.id}"
  //   data-edition="en" data-edname="English">. Checking it is what actually picks the variant.
  function editionInputs() { return $$('input[data-edition]'); }

  Tarot.setEdition = function (ed, opts) {
    var input = editionInputs().filter(function (i) { return i.dataset.edition === ed; })[0];
    if (!input) return;
    Tarot.state.edition = ed;
    if (!input.checked) input.checked = true;
    var name = input.dataset.edname || ed;
    $$('[data-edname]').forEach(function (n) { if (n.tagName !== 'INPUT') n.textContent = name; });
    $$('[data-edition-tag]').forEach(function (n) { n.value = n.dataset.editionTag.replace('{ed}', ed); });
    emit('edition', { edition: ed, name: name, variantId: input.value, input: input });
    if (opts && opts.scroll) scrollToHook('buy');
  };

  doc.addEventListener('change', function (e) {
    var t = e.target;
    if (t && t.matches && t.matches('input[data-edition]')) Tarot.setEdition(t.dataset.edition);
  });

  /* ---------- How-to-read modes ---------- */
  // Generic: any element with [data-mode-tab], [data-mode-panel] or [data-mode-view] follows the mode.
  // S2 adds its own behaviour by listening to tarot:mode / tarot:open.
  Tarot.setMode = function (mode) {
    Tarot.state.mode = mode;
    $$('[data-mode-tab]').forEach(function (b) {
      var on = b.dataset.modeTab === mode;
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      b.tabIndex = on ? 0 : -1;
    });
    $$('[data-mode-panel]').forEach(function (p) { p.hidden = p.dataset.modePanel !== mode; });
    $$('[data-mode-view]').forEach(function (v) { v.hidden = v.dataset.modeView !== mode; });
    emit('mode', { mode: mode });
  };

  Tarot.openCard = function (id, row) {
    if (!byId[id]) return;
    Tarot.setMode('read');
    emit('open', { id: id, row: row == null || row === '' ? null : +row });
    scrollToHook('read');
  };

  Tarot.setReading = function (kind, ids) {
    Tarot.state.reading = { kind: kind, cards: ids.slice() };
    emit('reading', Tarot.state.reading);
  };

  /* ---------- delegated page-wide hooks ---------- */
  doc.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('[data-mode-link],[data-open-card],[data-set-edition],[data-focus-notify]');
    if (!el) return;

    if (el.hasAttribute('data-open-card')) {
      e.preventDefault();
      Tarot.openCard(el.getAttribute('data-open-card'), el.getAttribute('data-row'));
    } else if (el.hasAttribute('data-mode-link')) {
      e.preventDefault();
      Tarot.setMode(el.getAttribute('data-mode-link'));
      scrollToHook('read');
    } else if (el.hasAttribute('data-set-edition')) {
      e.preventDefault();
      Tarot.setEdition(el.getAttribute('data-set-edition'), { scroll: true });
    } else if (el.hasAttribute('data-focus-notify')) {
      e.preventDefault();
      scrollToHook('buy');
      var field = $('[data-notify-email]') || $('[data-buy-submit]');
      if (field) setTimeout(function () { field.focus({ preventScroll: true }); }, reduced() ? 0 : 600);
    }
  });

  /* ---------- sheen on paper cards (.t-tilt) ---------- */
  doc.addEventListener('pointermove', function (e) {
    if (reduced() || e.pointerType === 'touch') return;
    var el = e.target.closest && e.target.closest('.t-tilt');
    if (!el) return;
    var r = el.getBoundingClientRect();
    el.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
    el.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
  });

  /* ---------- section modules ---------- */
  // Each section root: <section data-tarot-module="read">. Modules register below
  // (Tarot.modules.read = function (root) {...}) and are re-run when the theme editor reloads a section.
  function initModules(scope) {
    $$('[data-tarot-module]', scope).concat(scope.matches && scope.matches('[data-tarot-module]') ? [scope] : [])
      .forEach(function (root) {
        var fn = Tarot.modules[root.dataset.tarotModule];
        if (!fn || root.__tarotInit) return;
        root.__tarotInit = true;
        fn(root);
      });
  }

  function start() {
    if (touch()) doc.documentElement.classList.add('t-touch');
    initModules(doc);
    var checked = editionInputs().filter(function (i) { return i.checked; })[0] || editionInputs()[0];
    if (checked) Tarot.setEdition(checked.dataset.edition);
  }

  doc.addEventListener('shopify:section:load', function (e) { initModules(e.target); });

  window.Tarot = Tarot;

  // Modules are defined further down this file; start after they've registered.
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', start);
  else setTimeout(start, 0);
})();

/* ==========================================================================
   Section modules (added phase by phase)
   ========================================================================== */
