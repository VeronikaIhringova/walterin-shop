/*
  Walterin · About — the only two things on the page that need JavaScript.

  1. Direction B's travel through the autobiography. Scroll position drives one transform on one
     element; no layout is written per frame and nothing animates left/top. The loop runs only
     while the track is on screen and stops the moment it is not.
  2. Nothing else. The expandables are <details>, so open/close, keyboard and the accessible name
     all come from the browser, and the text is in the DOM for find-on-page whether open or not.
     "Read more / Read less" is swapped in CSS off the [open] attribute.

  prefers-reduced-motion: the loop never starts, the drawing sits at its full view, and the CSS
  shortens the track to one screen so nobody scrolls through dead space.
*/
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-wui-about-track]').forEach(function (track) {
    var zoom = track.querySelector('[data-wui-about-zoom]');
    if (!zoom || reduce) return;

    var running = false, frame = null, rect = null;

    function measure() { rect = track.getBoundingClientRect(); }

    function draw() {
      if (!running) { frame = null; return; }
      // One read per frame, and only this one.
      var r = track.getBoundingClientRect();
      var range = r.height - window.innerHeight;
      var p = range > 0 ? (-r.top) / range : 0;
      p = p < 0 ? 0 : (p > 1 ? 1 : p);

      // Travel: start on the whole drawing, move in to roughly a third of it, drift downwards
      // as it goes, so the reader ends on the lower part of the page where Egypt sits.
      var scale = 1 + p * 1.6;
      var shiftY = -p * 26;        // per cent of the element's own height
      zoom.style.transform = 'translate3d(0,' + shiftY + '%,0) scale(' + scale.toFixed(4) + ')';

      frame = window.requestAnimationFrame(draw);
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !running) {
          running = true;
          track.setAttribute('data-wui-about-running', 'true');
          if (!frame) frame = window.requestAnimationFrame(draw);
        } else if (!e.isIntersecting && running) {
          running = false;
          track.setAttribute('data-wui-about-running', 'false');
        }
      });
    }, { rootMargin: '100px 0px' });

    io.observe(track);
    measure();
    window.addEventListener('resize', measure, { passive: true });
  });
})();
