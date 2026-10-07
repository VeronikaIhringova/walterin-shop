/* Walterin FAQ — the small amount of behaviour the markup cannot carry itself.
   Everything here is an enhancement: with this file blocked the page still
   navigates, still opens and closes, and still deep-links. */
(function () {
  'use strict';

  var panel = document.querySelector('.wui-faq__panel');
  if (!panel) return;

  /* 1 · A link to one question opens it.
        /pages/faq#q-returns-faulty should show the answer, not a shut row that
        happens to be scrolled into view. Runs on load and on every later hash
        change, because clicking a second deep link does not reload the page. */
  function openFromHash() {
    var id = decodeURIComponent((location.hash || '').replace(/^#/, ''));
    if (!id) return;
    var el = document.getElementById(id);
    if (!el) return;
    if (el.tagName === 'DETAILS') {
      el.open = true;
      // The browser has already jumped; re-align now the row is taller.
      el.scrollIntoView({ block: 'center' });
    }
  }
  openFromHash();
  window.addEventListener('hashchange', openFromHash);

  /* 2 · Which category am I in.
        The nav marks the section currently in view. aria-current, not a class
        alone, so a screen reader hears it too. IntersectionObserver rather
        than a scroll handler: no work on frames where nothing crossed. */
  var links = Array.prototype.slice.call(document.querySelectorAll('[data-wui-faq-nav]'));
  var groups = Array.prototype.slice.call(panel.querySelectorAll('.wui-faq__group'));
  if (!links.length || !groups.length || !('IntersectionObserver' in window)) return;

  var byId = {};
  links.forEach(function (a) {
    byId[decodeURIComponent((a.getAttribute('href') || '').replace(/^#/, ''))] = a;
  });

  function mark(id) {
    links.forEach(function (a) {
      var on = a === byId[id];
      if (on) {
        a.setAttribute('aria-current', 'true');
      } else {
        a.removeAttribute('aria-current');
      }
    });
  }

  var seen = {};
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        seen[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0;
      });
      // The topmost section still on screen wins; ratio breaks ties when two
      // short categories are visible at once.
      var best = null;
      groups.forEach(function (g) {
        if (seen[g.id] > 0 && (best === null || seen[g.id] > seen[best])) best = g.id;
      });
      if (best) mark(best);
    },
    { rootMargin: '-96px 0px -55% 0px', threshold: [0, 0.2, 0.6, 1] }
  );
  groups.forEach(function (g) { io.observe(g); });
})();
