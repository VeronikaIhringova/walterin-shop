/*
  Walterin · Buy section behaviour (sections/walterin-buy.liquid). No dependencies.
  Everything here is an enhancement: without JS the gallery thumbs are anchors, the edition
  radios still pick the variant, and both forms post normally.

  - Gallery: thumbs scroll the strip in place, swipe updates thumbs + counter, arrow keys, zoom dialog
  - Edition: updates every [data-edname] / [data-edprice], the waitlist tag, copies left, button state
  - Notify: submits without leaving the page; falls back to a normal POST (e.g. Shopify's bot challenge)
  - Sticky bar (phones): shows once the main button has scrolled away
  - Arrival: turns "2–3 working days" into a date range when dispatch settings exist
*/
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  function smooth() { return reduceMotion && reduceMotion.matches ? 'auto' : 'smooth'; }
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function init(root) {
    if (!root || root.__wuiInit) return;
    root.__wuiInit = true;
    gallery(root);
    editions(root);
    notify(root);
    sticky(root);
    arrival(root);
    $$('[data-wui-open]', root).forEach(function (a) {
      a.addEventListener('click', function () {
        var target = document.getElementById(a.getAttribute('data-wui-open'));
        if (target && target.tagName === 'DETAILS') target.open = true;
      });
    });
  }

  /* ---------- Gallery ---------- */
  function gallery(root) {
    var track = $('[data-wui-track]', root);
    if (!track) return;
    var slides = $$('[data-wui-slide]', track);
    var thumbs = $$('[data-wui-thumb]', root);
    var count = $('[data-wui-count]', root);

    function setCurrent(slide) {
      var index = slides.indexOf(slide);
      thumbs.forEach(function (t) { t.setAttribute('aria-current', t.getAttribute('href') === '#' + slide.id ? 'true' : 'false'); });
      if (count) count.textContent = (index + 1) + ' / ' + slides.length;
    }
    function goTo(slide) {
      track.scrollTo({ left: slide.offsetLeft, behavior: smooth() });
      setCurrent(slide);
    }

    thumbs.forEach(function (t) {
      t.addEventListener('click', function (e) {
        var slide = document.getElementById(t.getAttribute('href').slice(1));
        if (!slide) return;
        e.preventDefault(); // don't jump the page
        goTo(slide);
      });
    });

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) setCurrent(en.target); });
      }, { root: track, threshold: 0.6 });
      slides.forEach(function (s) { io.observe(s); });
    }

    track.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      track.scrollBy({ left: (e.key === 'ArrowRight' ? 1 : -1) * track.clientWidth, behavior: smooth() });
    });

    // Zoom: native <dialog>; the link still opens the large image if <dialog> isn't supported.
    var dialog = $('[data-wui-dialog]', root);
    if (!dialog || typeof dialog.showModal !== 'function') return;
    var stage = $('[data-wui-zoom-stage]', dialog);
    var zoomImg = document.createElement('img');
    zoomImg.decoding = 'async';
    stage.appendChild(zoomImg);
    var opener = null;
    $$('[data-wui-zoom]', root).forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        opener = a;
        var img = $('img', a);
        // Show the image already on screen immediately, then swap in the large one once it has loaded.
        zoomImg.src = img ? img.currentSrc || img.src : a.href;
        zoomImg.alt = img ? img.alt : '';
        dialog.showModal();
        dialog.scrollTop = 0;
        var large = new Image();
        large.onload = function () { if (dialog.open) zoomImg.src = large.src; };
        large.src = a.href;
      });
    });
    $('[data-wui-close]', dialog).addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener('close', function () { zoomImg.removeAttribute('src'); if (opener) opener.focus(); });
  }

  /* ---------- Edition ---------- */
  function editions(root) {
    var inputs = $$('input[data-edition]', root);
    if (!inputs.length) return;
    var submit = $('[data-wui-submit]', root);
    var submitLabel = submit && $('[data-wui-submit-label]', submit);
    var stickySubmit = $('[data-wui-sticky-submit]', root);
    var remaining = $('[data-wui-remaining]', root);
    var atcHTML = submitLabel ? submitLabel.innerHTML : '';

    function apply(input) {
      var name = input.dataset.edname;
      var available = input.dataset.available !== 'false';
      $$('[data-edname]', root).forEach(function (n) { if (n.tagName !== 'INPUT') n.textContent = name; });
      if (input.dataset.price) $$('[data-edprice]', root).forEach(function (n) { n.textContent = input.dataset.price; });
      $$('[data-wui-tag]', root).forEach(function (n) { n.value = n.dataset.wuiTag.replace('{ed}', input.dataset.edition); });
      if (remaining) {
        remaining.textContent = input.dataset.remaining || '';
        remaining.hidden = !input.dataset.remaining;
      }
      if (submit && root.dataset.state === 'available') {
        submit.disabled = !available;
        if (stickySubmit) stickySubmit.disabled = !available;
        if (submitLabel) {
          if (available) {
            submitLabel.innerHTML = atcHTML;
            $$('[data-edname]', submitLabel).forEach(function (n) { n.textContent = name; });
            $$('[data-edprice]', submitLabel).forEach(function (n) { n.textContent = input.dataset.price; });
          } else {
            submitLabel.textContent = root.dataset.soldOutLabel;
          }
        }
      }
    }

    // The theme's <product-form> re-enables the first [name=id] input when it upgrades,
    // which would make a sold-out edition selectable again. Lock sold-out editions after it runs.
    function lockSoldOut() {
      if (root.dataset.state !== 'available') return;
      inputs.forEach(function (i) { if (i.dataset.available === 'false') i.disabled = true; });
    }
    lockSoldOut();
    if (window.customElements) customElements.whenDefined('product-form').then(lockSoldOut);

    inputs.forEach(function (i) { i.addEventListener('change', function () { if (i.checked) apply(i); }); });
    var checked = inputs.filter(function (i) { return i.checked; })[0];
    if (checked) apply(checked);
  }

  /* ---------- Notify ---------- */
  function notify(root) {
    var form = $('[data-wui-notify]', root);
    if (!form || !window.fetch || !window.DOMParser) return;
    form.addEventListener('submit', function (e) {
      var email = $('[data-wui-email]', form);
      if (email && !email.checkValidity()) return; // let the browser explain
      e.preventDefault();
      var button = $('[type="submit"]', form);
      if (button) button.setAttribute('aria-disabled', 'true');
      fetch(form.action, { method: 'POST', body: new FormData(form), credentials: 'same-origin' })
        .then(function (res) {
          if (res.redirected && /challenge/.test(res.url)) throw new Error('challenge');
          return res.text();
        })
        .then(function (html) {
          var fresh = new DOMParser().parseFromString(html, 'text/html').getElementById(form.id);
          if (!fresh || !($('[data-wui-notify-done]', fresh) || $('[data-wui-notify-error]', fresh))) throw new Error('unexpected');
          form.innerHTML = fresh.innerHTML;
          var checked = $('input[data-edition]:checked', root);
          if (checked) $$('[data-edname]', form).forEach(function (n) { n.textContent = checked.dataset.edname; });
          var focusTarget = $('[data-wui-notify-done]', form) || $('[data-wui-email]', form);
          if (focusTarget) focusTarget.focus({ preventScroll: true });
        })
        .catch(function () { HTMLFormElement.prototype.submit.call(form); });
    });
  }

  /* ---------- Sticky bar ---------- */
  function sticky(root) {
    var bar = $('[data-wui-sticky]', root);
    var cta = $('.wui-buy__cta', root);
    if (!bar || !cta || !('IntersectionObserver' in window)) return;
    new IntersectionObserver(function (entries) {
      var en = entries[0];
      var away = !en.isIntersecting && en.boundingClientRect.top < 0;
      bar.classList.toggle('is-shown', away);
      if (away) bar.removeAttribute('inert'); else bar.setAttribute('inert', '');
    }).observe(cta);

    var toNotify = $('[data-wui-focus-notify]', bar);
    if (toNotify) {
      toNotify.addEventListener('click', function (e) {
        e.preventDefault();
        cta.scrollIntoView({ behavior: smooth(), block: 'center' });
        var email = $('[data-wui-email]', root);
        if (email) setTimeout(function () { email.focus({ preventScroll: true }); }, smooth() === 'auto' ? 0 : 500);
      });
    }
  }

  /* ---------- Arrival date range (launch day, once dispatch settings exist) ---------- */
  function arrival(root) {
    var el = $('[data-wui-arrival][data-dispatch]', root);
    if (!el || !window.Intl) return;
    var min = parseInt(el.dataset.daysMin, 10), max = parseInt(el.dataset.daysMax, 10);
    var dispatch = parseInt(el.dataset.dispatch, 10), cutoff = parseInt(el.dataset.cutoff, 10);
    if ([min, max, dispatch, cutoff].some(isNaN)) return;

    // "Now" in Bratislava, as a plain calendar date we can step through.
    var parts = {};
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Bratislava', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', hourCycle: 'h23' })
      .formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; });
    var day = new Date(Date.UTC(+parts.year, +parts.month - 1, +parts.day));
    function isWorkday(d) { var w = d.getUTCDay(); return w !== 0 && w !== 6; }
    function addWorkdays(d, n) { var x = new Date(d); while (n > 0) { x.setUTCDate(x.getUTCDate() + 1); if (isWorkday(x)) n--; } return x; }

    // Dispatch day: after the cut-off or at the weekend, the clock starts on the next working day.
    var extra = dispatch;
    if (!isWorkday(day) || +parts.hour >= cutoff) extra += 1;
    var ship = addWorkdays(day, extra);
    var from = addWorkdays(ship, min), to = addWorkdays(ship, max);

    var fmt = new Intl.DateTimeFormat(document.documentElement.lang || 'en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' });
    el.textContent = el.dataset.template.replace('[from]', fmt.format(from)).replace('[to]', fmt.format(to));
  }

  function start() { $$('[data-wui-buy]').forEach(init); }
  document.addEventListener('shopify:section:load', function (e) { $$('[data-wui-buy]', e.target).forEach(init); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
