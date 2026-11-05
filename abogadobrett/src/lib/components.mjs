import { site, waLink } from '../data/site.mjs';
import { services, serviceByKey } from '../data/services.mjs';
import { posts, categories } from '../data/blog.mjs';
import { icon } from './icons.mjs';

// Modo revisión: muestra los campos pendientes en la página (npm run build:review).
export const REVIEW = process.env.REVIEW === '1';

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Dato pendiente del propietario. En producción no se renderiza nada. */
export const pending = (what) => (REVIEW ? `<span class="pending" title="Información pendiente del propietario">Pendiente: ${esc(what)}</span>` : '');

const fmtDate = (iso) =>
  new Date(iso + 'T12:00:00Z').toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });

// ---------- Botones ----------
export const btn = (href, label, { variant = 'primary', id = '', service = '', ext = false, iconName = 'arrow', cls = '' } = {}) =>
  `<a class="btn btn--${variant} ${cls}" href="${esc(href)}"${id ? ` data-cta="${id}"` : ''}${service ? ` data-service="${service}"` : ''}${ext ? ' target="_blank" rel="noopener"' : ''}><span>${esc(label)}</span>${iconName ? icon[iconName] : ''}</a>`;

export const waBtn = (text, label = 'Escribir por WhatsApp', { variant = 'ghost', service = '', location = '' } = {}) =>
  `<a class="btn btn--${variant} btn--wa" href="${esc(waLink(text))}" target="_blank" rel="noopener" data-wa="${location}"${service ? ` data-service="${service}"` : ''}>${icon.whatsapp}<span>${esc(label)}</span></a>`;

// ---------- Cabecera ----------
const navItems = [
  ['/sobre-johan-brett/', 'Sobre Johan'],
  ['/#metodo', 'Cómo trabajamos'],
  ['/blog/', 'Recursos'],
];

export const header = (current) => `
<a class="skip" href="#contenido">Saltar al contenido</a>
<header class="site-header" data-header>
  <div class="wrap site-header__inner">
    <a class="brand" href="/" aria-label="Abogado Brett, inicio">
      <span class="brand__mark" aria-hidden="true">JB</span>
      <span class="brand__text"><span class="brand__name">Johan Brett</span><span class="brand__tag">Abogado · Asesor legal y migratorio</span></span>
    </a>
    <nav class="nav" aria-label="Principal" data-nav>
      <div class="nav__group">
        <button class="nav__link nav__toggle" type="button" aria-expanded="false" aria-controls="menu-servicios" data-dropdown>Servicios <span class="caret" aria-hidden="true"></span></button>
        <ul class="nav__dropdown" id="menu-servicios">
          ${services.map((s) => `<li><a href="/${s.slug}/"${current === s.slug ? ' aria-current="page"' : ''}><span class="nav__ico">${icon[s.icon]}</span><span><strong>${esc(s.name)}</strong><small>${esc(s.card.split('.')[0])}.</small></span></a></li>`).join('')}
          <li class="nav__dropdown-all"><a href="/servicios/">Ver todos los servicios ${icon.arrow}</a></li>
        </ul>
      </div>
      ${navItems.map(([h, l]) => `<a class="nav__link" href="${h}"${current && h.includes(current) ? ' aria-current="page"' : ''}>${l}</a>`).join('')}
      <a class="nav__link nav__link--mobile" href="/contacto/">Contacto</a>
      ${btn('/contacto/', 'Evaluar mi caso', { variant: 'gold', id: 'header', iconName: '', cls: 'nav__cta' })}
    </nav>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menú" data-menu>${icon.menu}${icon.close}</button>
  </div>
</header>`;

// ---------- Pie ----------
export const footer = () => `
<footer class="site-footer">
  <div class="wrap">
    <div class="footer__top">
      <div class="footer__brand">
        <a class="brand brand--light" href="/"><span class="brand__mark" aria-hidden="true">JB</span><span class="brand__text"><span class="brand__name">Johan Brett</span><span class="brand__tag">${esc(site.firm)}</span></span></a>
        <p>Asesoría legal y migratoria para quienes quieren obtener la ciudadanía italiana, vivir o emprender en Europa. Equipo con presencia en Italia y Venezuela.</p>
        <div class="social">
          <a href="${site.social.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon.instagram}</a>
          <a href="${site.social.youtube}" target="_blank" rel="noopener" aria-label="YouTube">${icon.youtube}</a>
          <a href="${site.social.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${icon.facebook}</a>
        </div>
      </div>
      <div>
        <h2 class="footer__h">Servicios</h2>
        <ul>${services.map((s) => `<li><a href="/${s.slug}/">${esc(s.name)}</a></li>`).join('')}</ul>
      </div>
      <div>
        <h2 class="footer__h">El despacho</h2>
        <ul>
          <li><a href="/sobre-johan-brett/">Sobre Johan Brett</a></li>
          <li><a href="/#metodo">Cómo trabajamos</a></li>
          <li><a href="/blog/">Recursos y artículos</a></li>
          <li><a href="/contacto/">Solicitar evaluación</a></li>
        </ul>
      </div>
      <div>
        <h2 class="footer__h">Contacto</h2>
        <ul class="footer__contact">
          <li><a href="${esc(waLink('Hola Abogado Brett, quiero hacer una consulta.'))}" target="_blank" rel="noopener" data-wa="footer">${icon.whatsapp} ${site.whatsappDisplay}</a></li>
          <li><a href="mailto:${site.email}" data-cta="email-footer">${icon.mail} ${site.email}</a></li>
          <li><a href="${site.calendly.consulta}" target="_blank" rel="noopener" data-cta="calendly-footer">${icon.calendar} Agendar videollamada</a></li>
        </ul>
        ${pending('dirección profesional o ciudad de atención')}
      </div>
    </div>
    <div class="footer__legal">
      <p class="footer__disclaimer">La información de este sitio es general y orientativa; no constituye asesoramiento jurídico para un caso concreto ni garantiza resultados. Las decisiones sobre ciudadanía y permisos corresponden a las autoridades competentes.</p>
      <p>© ${new Date().getFullYear()} ${esc(site.person)} · ${esc(site.firm)} · <a href="/privacidad/">Privacidad y cookies</a> · <button class="linklike" type="button" data-cookie-settings>Configurar cookies</button></p>
    </div>
  </div>
</footer>`;

// ---------- Conversión persistente ----------
export const floating = (waText) => `
<a class="wa-float" href="${esc(waLink(waText))}" target="_blank" rel="noopener" data-wa="float" aria-label="Escribir por WhatsApp">${icon.whatsapp}</a>
<div class="mobile-bar" data-mobile-bar>
  <a class="mobile-bar__wa" href="${esc(waLink(waText))}" target="_blank" rel="noopener" data-wa="mobile-bar">${icon.whatsapp}<span>WhatsApp</span></a>
  <a class="mobile-bar__cta" href="/contacto/" data-cta="mobile-bar" data-evaluar>Evaluar mi caso</a>
</div>
<div class="cookie" role="dialog" aria-live="polite" aria-label="Preferencias de cookies" hidden data-cookie>
  <p>Usamos cookies de analítica para entender qué contenidos son útiles. Solo se activan si las aceptas. <a href="/privacidad/#cookies">Más información</a></p>
  <div class="cookie__actions"><button class="btn btn--ghost btn--sm" type="button" data-cookie-reject>Rechazar</button><button class="btn btn--primary btn--sm" type="button" data-cookie-accept>Aceptar</button></div>
</div>`;

// ---------- Bloques ----------
export const breadcrumbs = (items) => `
<nav class="crumbs" aria-label="Ruta de navegación"><ol>
  <li><a href="/">Inicio</a></li>
  ${items.map(([h, l], i) => (i === items.length - 1 ? `<li aria-current="page">${esc(l)}</li>` : `<li><a href="${h}">${esc(l)}</a></li>`)).join('')}
</ol></nav>`;

export const sectionHead = (kicker, title, text = '', cls = '') => `
<div class="section-head ${cls}">
  ${kicker ? `<p class="kicker">${esc(kicker)}</p>` : ''}
  <h2>${title}</h2>
  ${text ? `<p class="section-head__text">${text}</p>` : ''}
</div>`;

export const serviceCard = (s, i) => `
<a class="svc-card reveal" href="/${s.slug}/" style="--i:${i}" data-cta="card-${s.key}" data-service="${s.key}">
  <span class="svc-card__ico">${icon[s.icon]}</span>
  <h3>${esc(s.name)}</h3>
  <p>${esc(s.card)}</p>
  <span class="svc-card__more">Ver servicio ${icon.arrow}</span>
</a>`;

export const steps = (list) => `
<ol class="steps">
  ${list.map(([t, d], i) => `<li class="step reveal" style="--i:${i}"><span class="step__n">${String(i + 1).padStart(2, '0')}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join('')}
</ol>`;

export const faq = (list, id = 'faq') => `
<div class="faq" id="${id}">
  ${list.map(([q, a]) => `<details class="faq__item"><summary><span>${esc(q)}</span>${icon.plus}</summary><div class="faq__a"><p>${esc(a)}</p></div></details>`).join('')}
</div>`;

export const postCard = (p) => `
<article class="post-card reveal">
  <p class="post-card__meta"><span>${esc(categories[p.cat])}</span><time datetime="${p.date}">${fmtDate(p.date)}</time></p>
  <h3><a href="${p.url}">${esc(p.title)}</a></h3>
  <span class="post-card__more" aria-hidden="true">Leer artículo ${icon.arrow}</span>
</article>`;

export const relatedPosts = (cats, n = 3) => posts.filter((p) => cats.includes(p.cat)).slice(0, n);

/** Formulario progresivo. preset = clave de servicio (salta el paso 1). */
export const leadForm = (preset = '') => {
  const s = preset ? serviceByKey[preset] : null;
  return `
<div class="lead" id="evaluar">
  <form class="lead__form" data-lead-form data-preset="${preset}" novalidate>
    <div class="lead__progress" aria-hidden="true"><span data-progress></span></div>
    <p class="lead__step-label" data-step-label aria-live="polite"></p>
    <div class="lead__steps" data-steps>
      <noscript><p class="lead__noscript">Para usar el formulario activa JavaScript, o escríbenos directamente a <a href="mailto:${site.email}">${site.email}</a> o por <a href="${esc(waLink('Hola Abogado Brett, quiero hacer una consulta.'))}">WhatsApp</a>.</p></noscript>
    </div>
    <div class="hp" aria-hidden="true"><label>Empresa<input type="text" name="empresa" tabindex="-1" autocomplete="off"></label></div>
    <div class="lead__nav">
      <button type="button" class="btn btn--text" data-back hidden>← Atrás</button>
      <button type="button" class="btn btn--primary" data-next>Continuar ${icon.arrow}</button>
      <button type="submit" class="btn btn--gold" data-submit hidden><span>Enviar solicitud</span>${icon.arrow}</button>
    </div>
    <p class="lead__note">${icon.shield} Respuesta orientativa en un plazo de ${pending('plazo de respuesta, p. ej. 48 h hábiles') || 'pocos días hábiles'}. No te pediremos documentos en este primer contacto.</p>
  </form>
  <div class="lead__done" data-lead-done hidden tabindex="-1"></div>
</div>`;
};

export const ctaBand = (title, text, { service = '', wa = 'Hola Abogado Brett, quiero hacer una consulta.' } = {}) => `
<section class="cta-band">
  <div class="wrap cta-band__inner">
    <div><h2>${title}</h2><p>${esc(text)}</p></div>
    <div class="cta-band__actions">
      ${btn(service ? `/${serviceByKey[service].slug}/#evaluar` : '/contacto/', 'Evaluar mi caso', { variant: 'gold', id: 'band', service })}
      ${waBtn(wa, 'WhatsApp', { variant: 'ghost-light', service, location: 'band' })}
    </div>
  </div>
</section>`;

// ---------- Documento ----------
export const layout = ({ path, title, description, body, current = '', schema = [], waText = 'Hola Abogado Brett, quiero hacer una consulta.', noindex = false, ogType = 'website' }) => {
  const url = site.url + path;
  const og = site.url + site.ogImage;
  const gtm = site.config.gtmId;
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex, follow">' : `<link rel="canonical" href="${url}">`}
<meta name="theme-color" content="#0B1626">
<meta property="og:type" content="${ogType}">
<meta property="og:locale" content="es_ES">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/cormorant-garamond-normal-500.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/manrope-normal-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/main.css?v=__V__">
${schema.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n')}
<script>window.SITE=${JSON.stringify({ wa: site.whatsapp, email: site.email, leadEndpoint: site.config.leadEndpoint, gtm, waText })};</script>
<script src="/assets/js/main.js?v=__V__" defer></script>
</head>
<body${REVIEW ? ' class="is-review"' : ''}>
${header(current)}
<main id="contenido">
${body}
</main>
${footer()}
${floating(waText)}
</body>
</html>`;
};

// ---------- Schema.org (solo datos verificados) ----------
export const schemaPerson = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': site.url + '/#johan-brett',
  name: site.person,
  jobTitle: 'Abogado, asesor legal y migratorio',
  description: 'Abogado ítalo-venezolano radicado en Italia. Asesoría en ciudadanía italiana, migración y emprendimiento en Europa.',
  image: site.url + '/assets/img/johan-brett.jpg',
  url: site.url + '/sobre-johan-brett/',
  nationality: [{ '@type': 'Country', name: 'Italia' }, { '@type': 'Country', name: 'Venezuela' }],
  worksFor: { '@id': site.url + '/#despacho' },
  sameAs: Object.values(site.social),
  knowsLanguage: ['es', 'it'],
});

export const schemaOrg = () => ({
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  '@id': site.url + '/#despacho',
  name: `${site.name} · ${site.firm}`,
  url: site.url,
  image: site.url + site.ogImage,
  logo: site.url + '/assets/img/apple-touch-icon.png',
  email: site.email,
  telephone: '+' + site.whatsapp,
  founder: { '@id': site.url + '/#johan-brett' },
  areaServed: ['Italia', 'España', 'Unión Europea', 'América Latina'],
  availableLanguage: ['es', 'it'],
  sameAs: Object.values(site.social),
  knowsAbout: ['Ciudadanía italiana iure sanguinis', 'Ciudadanía italiana por matrimonio', 'Migración a Europa', 'Apostilla y traducción de documentos'],
});

export const schemaBreadcrumb = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [['/', 'Inicio'], ...items].map(([p, n], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: site.url + p })),
});

export const schemaFaq = (list) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: list.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

export const schemaService = (s) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: s.name,
  description: s.metaDesc,
  serviceType: s.name,
  provider: { '@id': site.url + '/#despacho' },
  areaServed: ['Italia', 'Unión Europea', 'América Latina'],
  url: `${site.url}/${s.slug}/`,
});

export { icon, site, services, serviceByKey, posts, categories, waLink };
