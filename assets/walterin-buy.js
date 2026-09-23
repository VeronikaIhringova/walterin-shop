/*
  Walterin · Buy section behaviour (sections/walterin-buy.liquid). No build step, no dependencies
  on page load. Everything here is an enhancement: without JS the gallery thumbs are anchors, the
  accordions are plain <details>, the zoom link opens the large image, and both forms post normally.

  - Options: any number of product options; picks the variant, disables combinations that don't
    exist or are sold out (faded, never struck through), and moves to the nearest available one
    with a spoken message when the visitor's choice forces it
  - Motion: the name and the availability notes cross-fade (the price changes instantly); accordions open and close on a height + opacity
    animation; everything is instant under prefers-reduced-motion. Only transform, opacity,
    colour and height ever move, so nothing shifts the layout
  - Gallery: thumbs scroll the strip in place, swipe updates thumbs + counter, arrow keys
  - Zoom: PhotoSwipe, imported on the first tap only (nothing on page load)
  - Notify: submits without leaving the page; falls back to a normal POST (e.g. bot challenge)
  - Sticky bar (phones): shows once the main button has scrolled away
*/
(function () {
  'use strict';

  var reduceMotion = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  function still() { return reduceMotion.matches; }
  function smooth() { return still() ? 'auto' : 'smooth'; }
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function init(root) {
    if (!root || root.__wuiInit) return;
    root.__wuiInit = true;
    gallery(root);
    options(root);
    accordions(root);
    notify(root);
    sticky(root);
  }

  /* ---------- Cross-fade: swap text without a hard jump and without moving anything ---------- */
  function fadeSwap(nodes, write) {
    var list = nodes.filter(Boolean);
    if (!list.length) return write();
    if (still()) return write();
    list.forEach(function (n) { n.classList.add('is-fading'); });
    setTimeout(function () {
      write();
      list.forEach(function (n) { n.classList.remove('is-fading'); });
    }, 90);
  }

  /* ---------- Options ---------- */
  function options(root) {
    var data = $('[data-wui-variants]', root);
    if (!data) return;
    var variants;
    try { variants = JSON.parse(data.textContent); } catch (e) { return; }
    if (!variants || !variants.length) return;

    var inputs = $$('.wui-choice__input', root);
    if (!inputs.length) return;
    var groups = $$('.wui-choices', root);
    var idField = $('[data-wui-variant-id]', root);
    var submit = $('[data-wui-submit]', root);
    var submitLabel = submit && $('[data-wui-submit-label]', submit);
    var stickySubmit = $('[data-wui-sticky-submit]', root);
    var live = $('[data-wui-live]', root);
    var switched = $('[data-wui-switched]', root);
    var express = $('[data-wui-express]', root);
    var digitalNote = $('[data-wui-digital]', root);
    var shipLine = $('[data-wui-ship]', root);
    var delivery = $('[data-wui-delivery]', root);
    var deliveryDigital = $('[data-wui-delivery-digital]', root);
    var deliveryPhysical = $('[data-wui-delivery-physical]', root);
    var remainingTpl = $('[data-wui-remaining-template]', root);
    var atcHTML = submitLabel ? submitLabel.innerHTML : '';
    var soldOutText = root.dataset.soldOut || '';
    var unavailableText = root.dataset.unavailable || '';

    function chosen() {
      return groups.map(function (g) {
        var picked = $('.wui-choice__input:checked', g);
        return picked ? picked.value : null;
      });
    }
    function find(combo) {
      for (var i = 0; i < variants.length; i++) {
        var v = variants[i], hit = true;
        for (var j = 0; j < combo.length; j++) if (combo[j] !== null && v.options[j] !== combo[j]) { hit = false; break; }
        if (hit) return v;
      }
      return null;
    }
    // The nearest variant that keeps the value the visitor just picked, available first
    function nearest(combo, keepIndex) {
      var partial = combo.map(function (v, i) { return i === keepIndex ? v : null; });
      var candidates = variants.filter(function (v) { return v.options[keepIndex] === combo[keepIndex]; });
      var best = candidates.filter(function (v) { return v.available; })[0] || candidates[0];
      return best || find(partial);
    }

    var comingSoon = root.dataset.state === 'coming_soon';

    function paint() {
      var combo = chosen();
      var variant = find(combo);
      if (!variant) return;

      // Per value: does a variant exist with this value and the rest of the choice, and is it available?
      // Before launch nothing is buyable yet, so nothing is marked sold out either.
      if (!comingSoon) groups.forEach(function (g, gi) {
        $$('.wui-choice', g).forEach(function (label) {
          var input = $('.wui-choice__input', label);
          var note = $('[data-wui-note]', label);
          var test = combo.slice();
          test[gi] = input.value;
          var exact = find(test);
          var anyWithValue = variants.filter(function (v) { return v.options[gi] === input.value; });
          var exists = anyWithValue.length > 0;
          var text = '';
          var disabled = false;
          if (!exists || (exact && !exact.available && !anyWithValue.some(function (v) { return v.available; }))) {
            text = soldOutText; disabled = true;
          } else if (!exact) {
            text = unavailableText; disabled = true;
          } else if (!exact.available) {
            text = soldOutText; disabled = true;
          } else if (exact.left && remainingTpl) {
            text = remainingTpl.textContent.replace('[n]', exact.left);
          }
          input.disabled = disabled && !input.checked;
          if (note && note.textContent !== text) {
            fadeSwap([note], function () {
              note.textContent = text;
              note.hidden = !text;
            });
          } else if (note) {
            note.hidden = !text;
          }
        });
      });

      // Price, edition name, button, sticky bar
      var names = groups.map(function (g) {
        var picked = $('.wui-choice__input:checked', g);
        return picked ? picked.dataset.wuiName : '';
      }).filter(Boolean);
      // The price changes instantly: a number that fades reads as a glitch. Names and notes fade.
      $$('[data-wui-price]', root).forEach(function (n) { n.textContent = variant.price; });
      var nameNodes = $$('[data-wui-edname]', root);
      fadeSwap(nameNodes, function () {
        nameNodes.forEach(function (n) { n.textContent = names[0] || ''; });
      });

      if (idField) idField.value = variant.id;
      if (submit) {
        submit.disabled = !variant.available;
        if (stickySubmit) stickySubmit.disabled = !variant.available;
        if (submitLabel) {
          if (variant.available) {
            if (submitLabel.querySelector('[data-wui-price]') === null) submitLabel.innerHTML = atcHTML;
            $$('[data-wui-price]', submitLabel).forEach(function (n) { n.textContent = variant.price; });
          } else {
            submitLabel.textContent = soldOutText;
          }
        }
      }

      // Digital vs physical: no express checkout for a download, and the right delivery text
      var digital = variant.shipping === false;
      if (express) express.hidden = digital;
      if (digitalNote) digitalNote.hidden = !digital;
      if (shipLine) shipLine.hidden = digital;
      if (deliveryDigital) deliveryDigital.hidden = !digital;
      if (deliveryPhysical) deliveryPhysical.hidden = digital;
      if (delivery) {
        var hasDigital = deliveryDigital && !deliveryDigital.hidden;
        var hasPhysical = deliveryPhysical && !deliveryPhysical.hidden;
        delivery.hidden = !hasDigital && !hasPhysical;
      }

      // Waitlist tags follow the first option's code
      var firstPicked = groups[0] && $('.wui-choice__input:checked', groups[0]);
      if (firstPicked) {
        $$('[data-wui-tag]', root).forEach(function (n) {
          n.value = n.dataset.wuiTag.replace('{ed}', firstPicked.dataset.wuiCode || '');
        });
      }
      return variant;
    }

    function say(message) {
      if (live) live.textContent = message;
      if (!switched) return;
      switched.textContent = message;
      switched.hidden = !message;
    }

    inputs.forEach(function (input) {
      input.addEventListener('change', function () {
        if (!input.checked) return;
        var gi = groups.indexOf(input.closest('.wui-choices'));
        var combo = chosen();
        var exact = find(combo);
        if (!exact || !exact.available) {
          var best = nearest(combo, gi);
          if (best) {
            // move the other groups to the nearest variant, and say so
            groups.forEach(function (g, i) {
              if (i === gi) return;
              var want = best.options[i];
              var other = $$('.wui-choice__input', g).filter(function (x) { return x.value === want; })[0];
              if (other && !other.checked) { other.checked = true; }
            });
            var movedName = groups.map(function (g, i) {
              if (i === gi) return null;
              var picked = $('.wui-choice__input:checked', g);
              return picked ? picked.dataset.wuiName : null;
            }).filter(Boolean)[0];
            if (movedName && root.dataset.switched) say(root.dataset.switched.replace('[value]', movedName));
          }
        } else {
          say('');
        }
        paint();
      });
    });

    // The theme's <product-form> can re-enable inputs when it upgrades; re-apply after it does.
    paint();
    if (window.customElements && window.customElements.whenDefined) {
      window.customElements.whenDefined('product-form').then(function () { paint(); });
    }
  }

  /* ---------- Accordions: height + opacity, never a jump ---------- */
  function accordions(root) {
    $$('[data-wui-acc]', root).forEach(function (details) {
      var wrap = $('.wui-accordion__wrap', details);
      var summary = $('summary', details);
      if (!wrap || !summary) return;
      var animation = null;

      function animate(open) {
        if (animation) { animation.cancel(); animation = null; }
        var start = wrap.offsetHeight;
        if (open) details.open = true;
        var end = open ? wrap.scrollHeight : 0;
        if (still()) {
          wrap.style.height = '';
          if (!open) details.open = false;
          details.classList.remove('is-opening', 'is-closing');
          return;
        }
        details.classList.toggle('is-opening', open);
        details.classList.toggle('is-closing', !open);
        wrap.style.height = start + 'px';
        animation = wrap.animate(
          { height: [start + 'px', end + 'px'], opacity: [open ? 0 : 1, open ? 1 : 0] },
          { duration: 200, easing: 'cubic-bezier(0.2, 0.75, 0.2, 1)' }
        );
        animation.onfinish = function () {
          animation = null;
          wrap.style.height = '';
          details.open = open;
          details.classList.remove('is-opening', 'is-closing');
        };
        animation.oncancel = function () { wrap.style.height = ''; };
      }

      summary.addEventListener('click', function (event) {
        event.preventDefault();
        animate(!details.open);
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
    thumbs.forEach(function (t) {
      t.addEventListener('click', function (e) {
        var slide = document.getElementById(t.getAttribute('href').slice(1));
        if (!slide) return;
        e.preventDefault(); // don't jump the page
        track.scrollTo({ left: slide.offsetLeft, behavior: smooth() });
        setCurrent(slide);
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

    zoom(root, track);
  }

  /* ---------- Zoom: PhotoSwipe, loaded on the first tap ---------- */
  function zoom(root, track) {
    var links = $$('[data-wui-zoom]', root);
    if (!links.length || !root.dataset.pswpLightbox) return;
    var lightbox = null;
    var loading = false;

    function styles() {
      if (document.getElementById('wui-pswp-css')) return;
      var link = document.createElement('link');
      link.id = 'wui-pswp-css';
      link.rel = 'stylesheet';
      link.href = root.dataset.pswpCss;
      document.head.appendChild(link);
    }

    function open(index) {
      if (lightbox) { lightbox.loadAndOpen(index); return; }
      if (loading) return;
      loading = true;
      styles();
      import(root.dataset.pswpLightbox)
        .then(function (mod) {
          var Lightbox = mod.default;
          lightbox = new Lightbox({
            gallery: track,
            children: 'a[data-wui-zoom]',
            pswpModule: function () { return import(root.dataset.pswpCore); },
            bgOpacity: 1,
            showHideAnimationType: still() ? 'none' : 'zoom',
            zoom: false,
            counter: true,
            padding: { top: 12, bottom: 12, left: 12, right: 12 }
          });
          lightbox.init();
          lightbox.loadAndOpen(index);
        })
        .catch(function () {
          // no module support or the file failed: fall back to the plain large image
          if (links[index]) window.location.href = links[index].href;
        })
        .then(function () { loading = false; });
    }

    links.forEach(function (link, index) {
      link.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button > 0) return;
        e.preventDefault();
        open(index);
      });
    });
  }

  /* ---------- Notify ---------- */
  function notify(root) {
    var form = $('[data-wui-notify]', root);
    if (!form) return;
    // Every signup gets the waitlist tags; 'newsletter' only when the visitor ticks the box.
    // The box has no name, so without JS nobody is tagged for the newsletter.
    form.addEventListener('submit', function () {
      var tags = $('[data-wui-tag]', form);
      var box = $('[data-wui-newsletter]', form);
      if (!tags) return;
      var list = tags.value.split(',').filter(function (x) { return x && x !== 'newsletter'; });
      if (box && box.checked) list.push('newsletter');
      tags.value = list.join(',');
    });
    if (!window.fetch || !window.DOMParser) return;
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
          var picked = $('.wui-choice__input:checked', root);
          if (picked) $$('[data-wui-edname]', form).forEach(function (n) { n.textContent = picked.dataset.wuiName; });
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
      if (away) bar.removeAttribute('inert');
      else bar.setAttribute('inert', '');
    }).observe(cta);

    var toNotify = $('[data-wui-focus-notify]', bar);
    if (toNotify) {
      toNotify.addEventListener('click', function (e) {
        e.preventDefault();
        cta.scrollIntoView({ behavior: smooth(), block: 'center' });
        var email = $('[data-wui-email]', root);
        if (email) setTimeout(function () { email.focus({ preventScroll: true }); }, still() ? 0 : 500);
      });
    }
  }

  function start() { $$('[data-wui-buy]').forEach(init); }
  document.addEventListener('shopify:section:load', function (e) { $$('[data-wui-buy]', e.target).forEach(init); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
