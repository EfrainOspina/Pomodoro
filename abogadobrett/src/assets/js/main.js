/* Abogado Brett — interacción, analítica respetuosa y formulario progresivo.
   Sin dependencias. Los datos del formulario los inyecta build.mjs. */
(function () {
  'use strict';
  var d = document, w = window, S = w.SITE || {};
  var FORM = __FORM_DATA__;
  d.documentElement.classList.add('js');

  // ===================== Almacenamiento seguro =====================
  function store(kind) {
    return {
      get: function (k) { try { return w[kind].getItem(k); } catch (e) { return null; } },
      set: function (k, v) { try { w[kind].setItem(k, v); } catch (e) {} },
      del: function (k) { try { w[kind].removeItem(k); } catch (e) {} },
    };
  }
  var local = store('localStorage'), session = store('sessionStorage');

  // ===================== Atribución (first touch por sesión) =====================
  // Solo parámetros de campaña: nunca datos personales.
  (function captureSource() {
    if (session.get('ab_src')) return;
    var p = new URLSearchParams(location.search), src = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (k) { if (p.get(k)) src[k] = p.get(k).slice(0, 100); });
    if (p.get('gclid')) src.gclid = p.get('gclid').slice(0, 200);
    if (p.get('fbclid')) src.fbclid = p.get('fbclid').slice(0, 200);
    src.referrer = d.referrer ? d.referrer.split('?')[0].slice(0, 200) : '';
    src.landing = location.pathname;
    if (/Instagram/i.test(navigator.userAgent)) src.in_app = 'instagram';
    else if (/FBAN|FBAV/i.test(navigator.userAgent)) src.in_app = 'facebook';
    if (!src.utm_source && src.in_app) src.utm_source = src.in_app;
    session.set('ab_src', JSON.stringify(src));
  })();
  function source() { try { return JSON.parse(session.get('ab_src')) || {}; } catch (e) { return {}; } }

  // ===================== Analítica (dataLayer, sin PII) =====================
  w.dataLayer = w.dataLayer || [];
  function gtag() { w.dataLayer.push(arguments); }
  gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  function track(event, params) {
    var o = { event: event, page_path: location.pathname };
    for (var k in params) if (params[k] !== undefined && params[k] !== '') o[k] = params[k];
    w.dataLayer.push(o);
  }
  w.abTrack = track;

  var gtmLoaded = false;
  function loadGTM() {
    if (gtmLoaded || !S.gtm) return;
    gtmLoaded = true;
    gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'denied' });
    w.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    var s = d.createElement('script'); s.async = true; s.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(S.gtm);
    d.head.appendChild(s);
  }
  var cookie = d.querySelector('[data-cookie]');
  var cookieSettings = d.querySelectorAll('[data-cookie-settings]');
  if (!S.gtm) {
    // Sin herramientas de medición configuradas no hay cookies que consentir.
    cookieSettings.forEach(function (b) { b.hidden = true; });
  } else {
    var choice = local.get('ab_consent');
    if (choice === 'granted') loadGTM();
    else if (!choice && cookie) cookie.hidden = false;
    d.addEventListener('click', function (e) {
      if (e.target.closest('[data-cookie-accept]')) { local.set('ab_consent', 'granted'); cookie.hidden = true; loadGTM(); }
      if (e.target.closest('[data-cookie-reject]')) { local.set('ab_consent', 'denied'); cookie.hidden = true; }
      if (e.target.closest('[data-cookie-settings]')) { local.del('ab_consent'); cookie.hidden = false; }
    });
  }

  // Clics en CTA y WhatsApp
  d.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    if (a.hasAttribute('data-wa')) track('whatsapp_click', { location: a.getAttribute('data-wa'), service: a.getAttribute('data-service') || pageService() });
    else if (a.hasAttribute('data-cta')) track('cta_click', { cta_id: a.getAttribute('data-cta'), service: a.getAttribute('data-service') || '' });
  });
  function pageService() { var f = d.querySelector('[data-lead-form]'); return (f && f.getAttribute('data-preset')) || ''; }

  // ===================== Cabecera y menú =====================
  var header = d.querySelector('[data-header]');
  var mobileBar = d.querySelector('[data-mobile-bar]');
  var heroEnd = (d.querySelector('.hero, .page-hero') || {}).offsetHeight || 300;
  function onScroll() {
    var y = w.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 8);
    if (mobileBar) {
      var lead = d.getElementById('evaluar');
      var nearForm = false;
      if (lead) { var r = lead.getBoundingClientRect(); nearForm = r.top < w.innerHeight && r.bottom > 0; }
      mobileBar.classList.toggle('is-visible', y > heroEnd * 0.6 && !nearForm);
    }
  }
  w.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  var menuBtn = d.querySelector('[data-menu]'), nav = d.querySelector('[data-nav]');
  function setMenu(open) {
    menuBtn.setAttribute('aria-expanded', open); menuBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    nav.classList.toggle('is-open', open); d.body.classList.toggle('menu-open', open);
  }
  if (menuBtn && nav) {
    nav.id = 'menu';
    menuBtn.addEventListener('click', function () { setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  }
  d.querySelectorAll('[data-dropdown]').forEach(function (b) {
    var g = b.parentElement;
    function set(open) { g.classList.toggle('is-open', open); b.setAttribute('aria-expanded', open); }
    b.addEventListener('click', function (e) { e.stopPropagation(); set(!g.classList.contains('is-open')); });
    if (w.matchMedia('(hover: hover) and (min-width: 961px)').matches) {
      g.addEventListener('mouseenter', function () { set(true); });
      g.addEventListener('mouseleave', function () { set(false); });
    }
    d.addEventListener('click', function (e) { if (!g.contains(e.target)) set(false); });
    g.addEventListener('keydown', function (e) { if (e.key === 'Escape') { set(false); b.focus(); } });
  });
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav && nav.classList.contains('is-open')) { setMenu(false); menuBtn.focus(); } });

  // Barra móvil: lleva al formulario de la página si existe
  var ev = d.querySelector('[data-evaluar]');
  if (ev && d.getElementById('evaluar')) ev.setAttribute('href', '#evaluar');

  // ===================== Animación de entrada =====================
  if ('IntersectionObserver' in w) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    d.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else d.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-in'); });

  // ===================== Filtros del blog =====================
  var posts = d.querySelector('[data-posts]');
  if (posts) d.querySelectorAll('[data-filter]').forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.getAttribute('data-filter');
      d.querySelectorAll('[data-filter]').forEach(function (x) { x.classList.toggle('is-active', x === b); x.setAttribute('aria-pressed', x === b); });
      posts.querySelectorAll('[data-cat]').forEach(function (p) { p.hidden = f !== 'all' && p.getAttribute('data-cat') !== f; });
    });
  });

  // ===================== Formulario progresivo =====================
  d.querySelectorAll('[data-lead-form]').forEach(initForm);

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function waUrl(text) { return 'https://wa.me/' + S.wa + '?text=' + encodeURIComponent(text); }
  var ICON_ARROW = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var ICON_CHECK = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';

  function initForm(form) {
    var uid = Math.random().toString(36).slice(2, 7);
    var preset = form.getAttribute('data-preset') || '';
    var qs = new URLSearchParams(location.search).get('servicio');
    if (!preset && qs && FORM.sets[qs]) preset = qs;
    var fixed = !!form.getAttribute('data-preset'); // en páginas de servicio el servicio no se pregunta
    var state = { service: preset, step: 0, started: false, sent: false };
    var stepsEl = form.querySelector('[data-steps]');
    var btnNext = form.querySelector('[data-next]'), btnBack = form.querySelector('[data-back]'), btnSubmit = form.querySelector('[data-submit]');
    var progress = form.querySelector('[data-progress]'), label = form.querySelector('[data-step-label]');
    var done = form.parentElement.querySelector('[data-lead-done]');

    function id(n) { return 'f' + uid + '-' + n; }

    function fieldHTML(q) {
      var req = !q.optional, name = 'q_' + q.id, h;
      var lab = esc(q.label) + (q.optional ? ' <span class="opt">(opcional)</span>' : '');
      if (q.type === 'radio') {
        h = '<fieldset class="field" data-field="' + name + '"' + (req ? ' data-required' : '') + '><legend>' + lab + '</legend><div class="choices">' +
          q.options.map(function (o) { return '<label class="choice"><input type="radio" name="' + name + '" value="' + esc(o) + '"><span>' + esc(o) + '</span></label>'; }).join('') +
          '</div><p class="field__err">Selecciona una opción.</p></fieldset>';
      } else if (q.type === 'select') {
        h = '<div class="field" data-field="' + name + '"' + (req ? ' data-required' : '') + '><label for="' + id(name) + '">' + lab + '</label><select id="' + id(name) + '" name="' + name + '"><option value="">Selecciona…</option>' +
          q.options.map(function (o) { return '<option>' + esc(o) + '</option>'; }).join('') + '</select><p class="field__err">Selecciona una opción.</p></div>';
      } else {
        h = '<div class="field" data-field="' + name + '"' + (req ? ' data-required' : '') + '><label for="' + id(name) + '">' + lab + '</label><input type="text" id="' + id(name) + '" name="' + name + '" maxlength="120" placeholder="' + esc(q.placeholder || '') + '"><p class="field__err">Completa este campo.</p></div>';
      }
      return h;
    }

    function stepService() {
      return '<div class="lead__step" data-step="service"><h3 class="lead__title">¿En qué podemos ayudarte?</h3>' +
        '<fieldset class="field" data-field="servicio" data-required><legend class="sr">Servicio</legend><div class="choices choices--services">' +
        FORM.services.map(function (s) { return '<label class="choice"><input type="radio" name="servicio" value="' + s[0] + '"' + (state.service === s[0] ? ' checked' : '') + '><span><strong>' + esc(s[1]) + '</strong><small>' + esc(s[2]) + '</small></span></label>'; }).join('') +
        '</div><p class="field__err">Elige la opción que mejor describa tu caso.</p></fieldset></div>';
    }
    function stepQuestions() {
      var set = FORM.sets[state.service] || [];
      return '<div class="lead__step" data-step="questions"><h3 class="lead__title">Tu situación</h3>' + set.map(fieldHTML).join('') + '</div>';
    }
    function stepContact() {
      var otro = state.service === 'otro';
      return '<div class="lead__step" data-step="contact"><h3 class="lead__title">¿Cómo te contactamos?</h3>' +
        '<div class="row-2">' +
        '<div class="field" data-field="nombre" data-required><label for="' + id('n') + '">Nombre</label><input id="' + id('n') + '" name="nombre" type="text" autocomplete="given-name" maxlength="60"><p class="field__err">Escribe tu nombre.</p></div>' +
        '<div class="field" data-field="apellido" data-required><label for="' + id('a') + '">Apellido</label><input id="' + id('a') + '" name="apellido" type="text" autocomplete="family-name" maxlength="60"><p class="field__err">Escribe tu apellido.</p></div>' +
        '</div><div class="row-2">' +
        '<div class="field" data-field="email" data-required data-type="email"><label for="' + id('e') + '">Correo electrónico</label><input id="' + id('e') + '" name="email" type="email" autocomplete="email" inputmode="email" maxlength="120"><p class="field__err">Escribe un correo válido, por ejemplo nombre@correo.com.</p></div>' +
        '<div class="field" data-field="whatsapp" data-required data-type="phone"><label for="' + id('w') + '">WhatsApp con código de país</label><input id="' + id('w') + '" name="whatsapp" type="tel" autocomplete="tel" inputmode="tel" placeholder="+58 414 000 0000" maxlength="24"><p class="field__err">Incluye el código de país, por ejemplo +54, +58 o +39.</p></div>' +
        '</div>' +
        '<div class="field" data-field="pais" data-required><label for="' + id('p') + '">País de residencia</label><input id="' + id('p') + '" name="pais" type="text" autocomplete="country-name" maxlength="60"><p class="field__err">Indica tu país de residencia.</p></div>' +
        '<fieldset class="field" data-field="canal" data-required><legend>¿Por dónde prefieres que te respondamos?</legend><div class="choices">' +
        ['WhatsApp', 'Correo electrónico', 'Videollamada'].map(function (c, i) { return '<label class="choice"><input type="radio" name="canal" value="' + c + '"' + (i === 0 ? ' checked' : '') + '><span>' + c + '</span></label>'; }).join('') +
        '</div><p class="field__err">Elige un canal.</p></fieldset>' +
        '<div class="field" data-field="mensaje"' + (otro ? ' data-required' : '') + '><label for="' + id('m') + '">' + (otro ? 'Cuéntanos brevemente tu caso' : 'Algo más que debamos saber <span class="opt">(opcional)</span>') + '</label><textarea id="' + id('m') + '" name="mensaje" maxlength="1200" placeholder="No incluyas números de documentos ni datos médicos."></textarea><p class="field__err">Cuéntanos en pocas líneas qué necesitas.</p></div>' +
        '<div class="field" data-field="origen"><label for="' + id('o') + '">¿Cómo nos conociste? <span class="opt">(opcional)</span></label><select id="' + id('o') + '" name="origen"><option value="">Selecciona…</option><option>Instagram</option><option>YouTube</option><option>Facebook</option><option>Google</option><option>Recomendación</option><option>Otro</option></select></div>' +
        '<div class="field" data-field="consentimiento" data-required data-type="check"><label class="check"><input type="checkbox" name="consentimiento" value="si"><span>He leído la <a href="/privacidad/" target="_blank">política de privacidad</a> y acepto que se usen mis datos para responder a mi consulta.</span></label><p class="field__err">Necesitamos tu autorización para poder responderte.</p></div>' +
        '<label class="check"><input type="checkbox" name="marketing" value="si"><span>Quiero recibir novedades sobre cambios legales en ciudadanía italiana (opcional).</span></label>' +
        '</div>';
    }

    function flow() {
      var f = [];
      if (!fixed) f.push('service');
      if ((FORM.sets[state.service] || []).length) f.push('questions');
      f.push('contact');
      return f;
    }
    var titles = { service: 'Servicio', questions: 'Tu situación', contact: 'Tus datos' };

    function render() {
      var keep = collect();
      stepsEl.innerHTML = (fixed ? '' : stepService()) + (state.service && (FORM.sets[state.service] || []).length ? stepQuestions() : '') + (state.service ? stepContact() : '');
      restore(keep);
      show();
    }
    function show() {
      var f = flow(), cur = f[state.step];
      stepsEl.querySelectorAll('[data-step]').forEach(function (el) { el.hidden = el.getAttribute('data-step') !== cur; });
      btnBack.hidden = state.step === 0;
      var last = state.step === f.length - 1;
      btnNext.hidden = last; btnSubmit.hidden = !last;
      var total = state.service ? f.length : 3; // sin servicio elegido aún se asume el recorrido completo
      progress.style.width = ((state.step + 1) / total * 100) + '%';
      label.textContent = 'Paso ' + (state.step + 1) + ' de ' + total + ' · ' + titles[cur];
    }
    function collect() {
      var o = {};
      new FormData(form).forEach(function (v, k) { o[k] = v; });
      return o;
    }
    function restore(o) {
      Object.keys(o).forEach(function (k) {
        var els = form.querySelectorAll('[name="' + k + '"]');
        els.forEach(function (el) {
          if (el.type === 'radio' || el.type === 'checkbox') el.checked = el.value === o[k];
          else el.value = o[k];
        });
      });
    }

    function validate(stepEl) {
      var firstBad = null;
      stepEl.querySelectorAll('[data-field]').forEach(function (fd) {
        var name = fd.getAttribute('data-field'), type = fd.getAttribute('data-type'), ok = true;
        var inputs = fd.querySelectorAll('input, select, textarea');
        var val = '';
        inputs.forEach(function (i) { if ((i.type === 'radio' || i.type === 'checkbox') ? i.checked : true) { if (i.type !== 'radio' && i.type !== 'checkbox') val = i.value.trim(); else val = i.value; } });
        if (fd.hasAttribute('data-required') && !val) ok = false;
        if (ok && val && type === 'email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val);
        if (ok && val && type === 'phone') { var digits = val.replace(/[^\d]/g, ''); ok = /^\+?[\d\s().-]+$/.test(val) && digits.length >= 8 && digits.length <= 15 && (val.charAt(0) === '+' || val.indexOf('00') === 0); }
        fd.classList.toggle('is-invalid', !ok);
        inputs.forEach(function (i) { i.setAttribute('aria-invalid', !ok); var err = fd.querySelector('.field__err'); if (err) { err.id = err.id || id('err-' + name); i.setAttribute('aria-describedby', err.id); } });
        if (!ok && !firstBad) firstBad = fd.querySelector('input, select, textarea');
      });
      if (firstBad) { firstBad.focus({ preventScroll: true }); firstBad.closest('.field').scrollIntoView({ block: 'center', behavior: 'smooth' }); }
      return !firstBad;
    }

    form.addEventListener('change', function (e) {
      if (!state.started) { state.started = true; track('form_start', { service: state.service || 'sin_definir', form_location: location.pathname }); }
      var fd = e.target.closest('.field.is-invalid'); if (fd) fd.classList.remove('is-invalid');
      if (e.target.name === 'servicio') {
        state.service = e.target.value; render();
        // avance automático para reducir fricción
        setTimeout(next, 180);
      }
    });
    form.addEventListener('input', function (e) { var fd = e.target.closest('.field.is-invalid'); if (fd) fd.classList.remove('is-invalid'); });

    function current() { return stepsEl.querySelector('[data-step="' + flow()[state.step] + '"]'); }
    function next() {
      var el = current();
      if (!el || !validate(el)) return;
      if (state.step < flow().length - 1) {
        state.step++; show();
        track('form_step', { service: state.service, step: state.step + 1, step_name: flow()[state.step] });
        focusStep();
      }
    }
    function focusStep() {
      var t = current().querySelector('.lead__title'); if (t) { t.setAttribute('tabindex', '-1'); t.focus({ preventScroll: true }); }
      var r = form.getBoundingClientRect(); if (r.top < 0 || r.top > w.innerHeight * 0.5) form.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
    btnNext.addEventListener('click', next);
    btnBack.addEventListener('click', function () { if (state.step > 0) { state.step--; show(); focusStep(); } });
    form.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && e.target.tagName === 'INPUT' && !btnNext.hidden) { e.preventDefault(); next(); }
    });

    function summary(data) {
      var lines = ['Hola Abogado Brett, envío mi solicitud de evaluación:', '', 'Servicio: ' + serviceName()];
      (FORM.sets[state.service] || []).forEach(function (q) { var v = data['q_' + q.id]; if (v) lines.push(q.label.replace(/[¿?]/g, '') + ': ' + v); });
      lines.push('', 'Nombre: ' + data.nombre + ' ' + data.apellido, 'País: ' + data.pais, 'Correo: ' + data.email, 'WhatsApp: ' + data.whatsapp, 'Prefiero contacto por: ' + data.canal);
      if (data.mensaje) lines.push('', data.mensaje);
      return lines.join('\n');
    }
    function serviceName() { var s = FORM.services.filter(function (x) { return x[0] === state.service; })[0]; return s ? s[1] : state.service; }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(current())) return;
      var data = collect();
      if (data.empresa) return; // honeypot: bot
      var answers = {};
      (FORM.sets[state.service] || []).forEach(function (q) { if (data['q_' + q.id]) answers[q.label] = data['q_' + q.id]; });
      var payload = {
        service: state.service, service_name: serviceName(),
        first_name: data.nombre.trim(), last_name: data.apellido.trim(), email: data.email.trim(), phone: data.whatsapp.trim(),
        country: data.pais.trim(), preferred_channel: data.canal, message: (data.mensaje || '').trim(), heard_from: data.origen || '',
        answers: answers,
        consent: { privacy: true, marketing: data.marketing === 'si', text_version: FORM.consentVersion, at: new Date().toISOString() },
        source: source(), page: location.pathname, hp: data.empresa || '',
      };
      btnSubmit.disabled = true; btnSubmit.innerHTML = '<span class="spinner" aria-hidden="true"></span><span>Enviando…</span>';
      var ctrl = 'AbortController' in w ? new AbortController() : null;
      var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 12000);
      var endpoint = S.leadEndpoint;
      var req = endpoint ? fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: ctrl ? ctrl.signal : undefined })
        .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
        .then(function (j) { if (!j || !j.ok) return Promise.reject('bad'); })
        : Promise.reject('no-endpoint');
      req.then(function () {
        state.sent = true;
        track('form_submit_success', { service: state.service, preferred_channel: data.canal });
        finish(true, data);
      }).catch(function (err) {
        track('form_submit_error', { service: state.service, reason: String(err).slice(0, 40) });
        finish(false, data);
      }).then(function () { clearTimeout(timer); });
    });

    function finish(ok, data) {
      var text = summary(data);
      var mail = 'mailto:' + S.email + '?subject=' + encodeURIComponent('Solicitud de evaluación: ' + serviceName()) + '&body=' + encodeURIComponent(text);
      if (ok) {
        done.innerHTML = '<span class="done-ico">' + ICON_CHECK + '</span><p class="kicker">Solicitud recibida</p><h3>Gracias, ' + esc(data.nombre) + '.</h3>' +
          '<p>Revisaremos tu caso y te responderemos por <strong>' + esc(data.canal.toLowerCase()) + '</strong>. Si tu consulta es urgente, puedes escribirnos ahora por WhatsApp con tu resumen.</p>' +
          '<div class="done-actions"><a class="btn btn--primary" href="' + waUrl(text) + '" target="_blank" rel="noopener" data-wa="form-success" data-service="' + state.service + '"><span>Abrir WhatsApp</span>' + ICON_ARROW + '</a><a class="btn btn--ghost" href="/blog/"><span>Leer recursos</span></a></div>';
      } else {
        // Sin endpoint operativo no fingimos un envío: ofrecemos los canales directos con el resumen ya escrito.
        done.innerHTML = '<p class="kicker">Último paso</p><h3>Envíanos tu resumen</h3>' +
          '<p>No pudimos registrar tu solicitud automáticamente. Tu información ya está preparada: elige cómo enviarla y la recibiremos al instante.</p>' +
          '<div class="done-actions"><a class="btn btn--gold" href="' + waUrl(text) + '" target="_blank" rel="noopener" data-wa="form-fallback" data-service="' + state.service + '"><span>Enviar por WhatsApp</span>' + ICON_ARROW + '</a><a class="btn btn--ghost" href="' + mail + '" data-cta="form-fallback-email"><span>Enviar por correo</span></a></div>';
      }
      form.hidden = true; done.hidden = false; done.focus();
      done.parentElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }

    w.addEventListener('pagehide', function () {
      if (state.started && !state.sent) track('form_abandon', { service: state.service || 'sin_definir', step: state.step + 1, step_name: flow()[state.step] });
    });

    render();
  }
})();
