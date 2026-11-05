/* Abogado Brett — capa de movimiento. Sin dependencias.
   Todo es progresivo: sin JS o con «reducir movimiento» el contenido se ve completo y estático. */
(function () {
  'use strict';
  var d = document, w = window, html = d.documentElement;
  w.__motion = true;
  var reduce = w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = w.matchMedia('(hover: hover) and (pointer: fine)').matches;
  html.classList.add('motion');

  // ---------- Aparición al entrar en pantalla ----------
  var sel = '[data-split], [data-anim], .img-reveal, [data-draw], [data-timeline], .reveal';
  var els = d.querySelectorAll(sel);
  function show(el) {
    el.classList.add('is-in');
    if (el.hasAttribute('data-draw')) {
      var m = el.querySelector('animateMotion');
      if (m && m.beginElement && !reduce) setTimeout(function () { try { m.beginElement(); el.classList.add('is-moving'); } catch (e) {} }, 350);
    }
  }
  if (reduce || !('IntersectionObserver' in w)) els.forEach(show);
  else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { show(en.target); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.01 });
    // Un elemento recortado al 100% con clip-path no «intersecta»: se observa su contenedor.
    var proxy = new Map();
    els.forEach(function (el) {
      var clipped = el.matches('.img-reveal, .arch[data-anim]');
      var t = clipped ? el.parentElement : el;
      if (clipped) { (proxy.get(t) || proxy.set(t, []).get(t)).push(el); }
      io.observe(t);
    });
    var baseShow = show;
    show = function (t) { var list = proxy.get(t); if (list) list.forEach(baseShow); if (!list || t.matches(sel)) baseShow(t); };
  }

  // ---------- Scroll: progreso de lectura, parallax, línea de tiempo ----------
  var bar = d.querySelector('[data-progress-bar]');
  var par = [].slice.call(d.querySelectorAll('[data-parallax]'));
  var parX = [].slice.call(d.querySelectorAll('[data-parallax-x]'));
  var tls = [].slice.call(d.querySelectorAll('[data-timeline]'));
  var hero = d.querySelector('[data-hero]');
  var ticking = false;
  function frame() {
    ticking = false;
    var y = w.scrollY, vh = w.innerHeight, max = d.documentElement.scrollHeight - vh;
    if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0) + ')';
    if (!reduce) {
      par.forEach(function (el) {
        var r = el.getBoundingClientRect(), c = r.top + r.height / 2 - vh / 2;
        el.style.transform = 'translate3d(0,' + (c * parseFloat(el.getAttribute('data-parallax'))).toFixed(1) + 'px,0)';
      });
      parX.forEach(function (el) {
        var r = el.parentElement.getBoundingClientRect();
        el.style.transform = 'translate3d(' + ((r.top - vh / 2) * parseFloat(el.getAttribute('data-parallax-x'))).toFixed(1) + 'px,0,0)';
      });
      if (hero) {
        var hp = Math.min(1, y / (hero.offsetHeight || 1));
        hero.style.setProperty('--hp', hp.toFixed(3));
      }
    }
    tls.forEach(function (tl) {
      var r = tl.getBoundingClientRect();
      var p = (vh * 0.75 - r.top) / (r.height || 1);
      if (reduce) p = 1;
      p = Math.max(0, Math.min(1, p));
      tl.style.setProperty('--p', p.toFixed(3));
      var steps = tl.querySelectorAll('.tl-step'), n = steps.length;
      steps.forEach(function (s, i) { s.classList.toggle('is-active', p >= (i + 0.35) / n || p >= 0.999); });
    });
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  w.addEventListener('scroll', onScroll, { passive: true });
  w.addEventListener('resize', onScroll);
  frame();

  if (reduce || !fine) return;

  // ---------- Foco de luz que sigue al cursor ----------
  d.querySelectorAll('[data-spot]').forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  // ---------- Botones magnéticos ----------
  d.querySelectorAll('.is-magnetic, .btn--gold').forEach(function (b) {
    b.addEventListener('pointermove', function (e) {
      var r = b.getBoundingClientRect();
      var x = (e.clientX - r.left - r.width / 2) * 0.18, yy = (e.clientY - r.top - r.height / 2) * 0.28;
      b.style.transform = 'translate(' + x.toFixed(1) + 'px,' + yy.toFixed(1) + 'px)';
    });
    b.addEventListener('pointerleave', function () { b.style.transform = ''; });
  });

  // ---------- Inclinación sutil del retrato ----------
  d.querySelectorAll('[data-tilt]').forEach(function (el) {
    var host = el.closest('section') || el;
    host.addEventListener('pointermove', function (e) {
      var r = host.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5, yy = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--rx', (yy * -5).toFixed(2) + 'deg');
      el.style.setProperty('--ry', (x * 7).toFixed(2) + 'deg');
    });
    host.addEventListener('pointerleave', function () { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
  });
})();
