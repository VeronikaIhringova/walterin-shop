/* The globe for "Where to find us".

   An orthographic projection computed here — no mapping library, no three.js, nothing fetched at
   runtime. The line is deliberately loose: every point carries a small SEEDED wobble, and the
   coastline is drawn through midpoints as curves rather than straight lines between data points.
   Seeded, so the wobble stays still while you drag instead of shivering.

   A coastline crosses the horizon and comes back, so each visible run is drawn as its own stroke.

   Reduced motion: the globe still drags, it simply never animates on its own.
*/
(function () {
  var NS = 'http://www.w3.org/2000/svg';

  function init(root) {
    (root || document).querySelectorAll('[data-wui-globe]').forEach(function (svg) {
      if (svg.dataset.wuiGlobeReady) return;
      svg.dataset.wuiGlobeReady = '1';

      var land = window.WALTERIN_LAND || [];
      var R = 172, CX = 210, CY = 210;
      var lam = -(parseFloat(svg.dataset.lng) || 17.107);
      var phi = -20;
      var pinLng = parseFloat(svg.dataset.lng) || 17.107;
      var pinLat = parseFloat(svg.dataset.lat) || 48.148;
      var pinLabel = svg.dataset.label || '';

      function rad(d) { return d * Math.PI / 180; }
      function wob(s) { var x = Math.sin(s * 127.1) * 43758.5453; return (x - Math.floor(x)) - 0.5; }

      function project(lon, lat) {
        var l = rad(lon - (-lam)), p = rad(lat), p0 = rad(-phi);
        var cosc = Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l);
        if (cosc < 0) return null;
        return [CX + R * Math.cos(p) * Math.sin(l),
                CY - R * (Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(l))];
      }
      function el(n, a) { var e = document.createElementNS(NS, n); for (var k in a) e.setAttribute(k, a[k]); return e; }
      function curve(P) {
        if (P.length < 2) return '';
        var d = 'M' + P[0][0].toFixed(1) + ' ' + P[0][1].toFixed(1);
        for (var i = 1; i < P.length - 1; i++) {
          var mx = (P[i][0] + P[i + 1][0]) / 2, my = (P[i][1] + P[i + 1][1]) / 2;
          d += 'Q' + P[i][0].toFixed(1) + ' ' + P[i][1].toFixed(1) + ' ' + mx.toFixed(1) + ' ' + my.toFixed(1);
        }
        return d + 'L' + P[P.length - 1][0].toFixed(1) + ' ' + P[P.length - 1][1].toFixed(1) + ' ';
      }
      function inked(pts, amp, seed) {
        var runs = [], P = [], i;
        for (i = 0; i < pts.length; i++) {
          var q = project(pts[i][0], pts[i][1]);
          if (!q) { if (P.length > 1) runs.push(P); P = []; continue; }
          P.push([q[0] + wob(seed + i * 1.7) * amp, q[1] + wob(seed + i * 3.3 + 11) * amp]);
        }
        if (P.length > 1) runs.push(P);
        return runs.map(curve).join('');
      }
      function blob(cx, cy, r, amp, seed, step) {
        var pts = [], a;
        for (a = 0; a <= 360; a += (step || 6))
          pts.push([cx + r * Math.cos(rad(a)) + wob(seed + a) * amp, cy + r * Math.sin(rad(a)) + wob(seed + a + 7) * amp]);
        return curve(pts) + 'Z';
      }

      function draw() {
        while (svg.firstChild) svg.removeChild(svg.firstChild);
        svg.appendChild(el('path', { d: blob(CX, CY, R, 1.6, 3), fill: 'var(--wui-paper)', stroke: 'var(--wui-ink)', 'stroke-width': 3.6, 'stroke-linecap': 'round' }));
        svg.appendChild(el('path', { d: blob(CX, CY, R, 2.2, 91), fill: 'none', stroke: 'var(--wui-ink)', 'stroke-width': 1.6, opacity: 0.45, 'stroke-linecap': 'round' }));
        var eq = []; for (var lo = -180; lo <= 180; lo += 4) eq.push([lo, 0]);
        svg.appendChild(el('path', { d: inked(eq, 1.2, 5), fill: 'none', stroke: 'var(--wui-ink)', 'stroke-width': 1, opacity: 0.2, 'stroke-linecap': 'round' }));
        var a = '', b = '';
        land.forEach(function (r, i) { a += inked(r, 1.5, i * 13 + 1); b += inked(r, 2.6, i * 29 + 57); });
        svg.appendChild(el('path', { d: b, fill: 'none', stroke: 'var(--wui-ink)', 'stroke-width': 1.5, opacity: 0.35, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
        svg.appendChild(el('path', { d: a, fill: 'none', stroke: 'var(--wui-ink)', 'stroke-width': 3, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
        var p = project(pinLng, pinLat);
        if (p) {
          svg.appendChild(el('path', { d: blob(p[0], p[1], 14, 1.6, 17, 12), fill: 'var(--wui-yellow)', stroke: 'var(--wui-ink)', 'stroke-width': 3, 'stroke-linejoin': 'round' }));
          svg.appendChild(el('circle', { cx: p[0], cy: p[1], r: 4, fill: 'var(--wui-ink)' }));
          if (pinLabel) {
            var t = el('text', { x: p[0] + 22, y: p[1] - 14, fill: 'var(--wui-ink)', 'font-size': 17, 'font-family': 'var(--wui-display)' });
            t.textContent = pinLabel;
            svg.appendChild(t);
          }
        }
      }

      var drag = null;
      svg.addEventListener('pointerdown', function (e) {
        drag = { x: e.clientX, y: e.clientY, l: lam, p: phi };
        svg.setPointerCapture(e.pointerId);
      });
      svg.addEventListener('pointermove', function (e) {
        if (!drag) return;
        lam = drag.l + (e.clientX - drag.x) * 0.35;
        phi = Math.max(-80, Math.min(80, drag.p + (e.clientY - drag.y) * 0.35));
        draw();
      });
      ['pointerup', 'pointercancel'].forEach(function (t) {
        svg.addEventListener(t, function () { drag = null; });
      });
      /* keyboard: the globe is content, not a control, but it should still be reachable */
      svg.addEventListener('keydown', function (e) {
        var step = 12;
        if (e.key === 'ArrowLeft') lam -= step; else if (e.key === 'ArrowRight') lam += step;
        else if (e.key === 'ArrowUp') phi = Math.max(-80, phi - step);
        else if (e.key === 'ArrowDown') phi = Math.min(80, phi + step);
        else return;
        e.preventDefault(); draw();
      });
      draw();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(); });
  else init();
  document.addEventListener('shopify:section:load', function (e) { init(e.target); });
})();
