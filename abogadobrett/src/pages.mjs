import {
  layout, header, btn, waBtn, sectionHead, serviceCard, steps, faq, postCard, relatedPosts, leadForm, ctaBand,
  breadcrumbs, pending, esc, icon, site, services, serviceByKey, posts, categories, waLink,
  schemaPerson, schemaOrg, schemaBreadcrumb, schemaFaq, schemaService,
} from './lib/components.mjs';
import { testimonials } from './data/testimonials.mjs';
import { blogArchive } from './data/blog.mjs';

const img = (name, alt, { w = 600, h = 600, cls = '', eager = false } = {}) => `
<picture class="${cls}">
  <source srcset="/assets/img/${name}.webp" type="image/webp">
  <img src="/assets/img/${name}.jpg" alt="${esc(alt)}" width="${w}" height="${h}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">
</picture>`;

// Método de trabajo general (adaptado al proceso real: formulario → revisión → consulta por videollamada → ejecución)
const method = [
  ['Primer contacto', 'Completas la evaluación en línea o nos escribes por WhatsApp. Sin documentos, solo lo esencial de tu caso.'],
  ['Evaluación preliminar', 'Revisamos tu información y te decimos si tiene sentido avanzar y qué opción encaja contigo.'],
  ['Consulta y diagnóstico', 'Sesión por videollamada para analizar tu caso a fondo, resolver dudas y detallar requisitos.'],
  ['Estrategia', 'Definimos la vía, el calendario y la lista de documentos que necesitas.'],
  ['Ejecución', 'Preparamos y presentamos el expediente contigo, con el apoyo de nuestro equipo en Italia y nuestros aliados.'],
  ['Seguimiento', 'Te acompañamos hasta la resolución y te avisamos de los cambios normativos que te afecten.'],
];

const testimonialsSection = () => {
  if (!testimonials.length) {
    // Sin testimonios autorizados no se publica la sección (no se inventan).
    return pending('testimonios autorizados (nombre, país, texto, foto con permiso) — la sección se activa sola al añadirlos en src/data/testimonials.mjs')
      ? `<section class="section section--tight"><div class="wrap">${pending('testimonios autorizados — la sección aparece al completar src/data/testimonials.mjs')}</div></section>`
      : '';
  }
  return `
<section class="section section--paper" id="testimonios">
  <div class="wrap">
    ${sectionHead('Experiencias', 'Lo que dicen quienes ya hicieron el camino')}
    <div class="testis">
      ${testimonials.map((t) => `<figure class="testi reveal"><blockquote><p>${esc(t.quote)}</p></blockquote><figcaption>${t.photo ? `<img src="${t.photo}" alt="" width="48" height="48" loading="lazy">` : ''}<span><strong>${esc(t.name)}</strong><small>${esc(t.context)}</small></span></figcaption></figure>`).join('')}
    </div>
  </div>
</section>`;
};

// ============ HOME ============
const homeFaq = [
  ['¿Enviar la evaluación tiene costo?', 'Enviar el formulario no tiene costo ni compromiso. Con tu información te indicamos el siguiente paso y, si corresponde una consulta profesional por videollamada, te informamos su valor antes de agendar.'],
  ['¿Atienden a personas que no viven en Italia?', 'Sí. Trabajamos por videollamada con personas de distintos países y contamos con equipo en Italia y Venezuela.'],
  ['¿Pueden garantizar que obtendré la ciudadanía?', 'No. La decisión corresponde a la autoridad italiana. Nuestro compromiso es darte una evaluación honesta y preparar tu caso con rigor para reducir errores y retrasos.'],
  ['¿Cómo afecta la reforma de 2025 a mi caso?', 'La Ley 74/2025 cambió las condiciones para muchos descendientes nacidos en el extranjero, y su alcance sigue en discusión ante los tribunales. Por eso analizamos cada caso de forma individual.'],
];

const home = () => {
  const body = `
<section class="hero">
  <div class="wrap hero__inner">
    <div class="hero__copy">
      <p class="kicker kicker--light">Ciudadanía italiana · Europa</p>
      <h1>Tu ciudadanía italiana y tu vida en Europa, con un abogado que <em>ya hizo ese camino.</em></h1>
      <p class="hero__lead">Soy Johan Brett, abogado ítalo-venezolano. Nieto de italiano, tramité mi propia ciudadanía y hoy vivo en Italia con mi familia. Te ayudo a saber si tu caso califica, elegir la vía correcta y avanzar sin errores.</p>
      <div class="hero__actions">
        ${btn('/contacto/', 'Evaluar mi caso', { variant: 'gold', id: 'hero-primary' })}
        ${btn('#servicios', 'Ver servicios', { variant: 'ghost-light', id: 'hero-secondary', iconName: '' })}
      </div>
      <p class="hero__micro">${icon.check} Evaluación preliminar en línea · sin enviar documentos</p>
    </div>
    <div class="hero__media">
      ${img('johan-brett', 'Johan Brett, abogado y asesor legal y migratorio', { eager: true, cls: 'hero__photo' })}
      <div class="hero__badge"><strong>${esc(site.firm)}</strong><span>Equipo en Italia y Venezuela</span></div>
    </div>
  </div>
</section>

<section class="facts" aria-label="Datos clave">
  <ul class="wrap facts__list">
    <li><strong>Ítalo-venezolano</strong><span>Doble ciudadanía, vive en Italia</span></li>
    <li><strong>Lo vivió en primera persona</strong><span>Tramitó su ciudadanía como nieto de italiano</span></li>
    <li><strong>Formado en Venezuela e Italia</strong><span>En actualización constante</span></li>
    <li><strong>Red de aliados</strong><span>España, Alemania, Portugal y América</span></li>
  </ul>
</section>

<section class="section" id="servicios">
  <div class="wrap">
    ${sectionHead('¿Qué necesitas resolver?', 'Elige tu situación y te mostramos el camino', 'Cada servicio tiene su propia evaluación, con las preguntas que importan para tu caso.')}
    <div class="svc-grid">
      ${services.map(serviceCard).join('')}
      <a class="svc-card svc-card--alt reveal" href="/contacto/?servicio=otro" style="--i:5" data-cta="card-otro" data-service="otro">
        <span class="svc-card__ico">${icon.compass}</span>
        <h3>No sé qué opción necesito</h3>
        <p>Cuéntanos tu situación en pocas líneas y te orientamos hacia el servicio adecuado.</p>
        <span class="svc-card__more">Pedir orientación ${icon.arrow}</span>
      </a>
    </div>
  </div>
</section>

<section class="section section--paper story">
  <div class="wrap story__inner">
    <div class="story__media reveal">
      ${img('johan-brett-familia', 'Johan Brett en Italia', { w: 514, h: 514 })}
    </div>
    <div class="story__copy">
      <p class="kicker">Por qué trabajar conmigo</p>
      <h2>No te hablo desde la teoría. <em>Yo también lo viví.</em></h2>
      <p>Nací fuera de Italia y soy nieto de italiano. Tramité mi ciudadanía, me mudé y hoy vivo en Italia junto a mi esposa y mis dos hijos. Conozco las dudas, los documentos que no aparecen y la incertidumbre de empezar de nuevo.</p>
      <p>Estudié en Venezuela y en Italia, trabajé en el mundo corporativo con empresarios y líderes, y hoy acompaño desde Europa a familias y emprendedores que quieren dar el mismo paso, con un equipo de abogados, asesores y traductores oficiales.</p>
      ${btn('/sobre-johan-brett/', 'Conocer a Johan', { variant: 'text', id: 'story-about' })}
    </div>
  </div>
</section>

<section class="section" id="metodo">
  <div class="wrap">
    ${sectionHead('Cómo trabajamos', 'Un proceso claro, de la primera pregunta a la resolución', 'Sabrás en cada momento en qué etapa estás y qué viene después.')}
    ${steps(method)}
  </div>
</section>

<section class="section section--navy update">
  <div class="wrap update__inner">
    <div>
      <p class="kicker kicker--light">El marco legal cambió</p>
      <h2>La reforma de 2025 cambió las reglas. La información de hace un año ya no sirve.</h2>
      <p>La Ley 74/2025 modificó la ciudadanía por descendencia, y en 2026 la Corte Constitucional italiana y la justicia europea siguen revisando su alcance. Publicamos cada novedad en español, explicada para que sepas cómo te afecta.</p>
      ${btn('/blog/', 'Ver análisis y guías', { variant: 'ghost-light', id: 'update-blog' })}
    </div>
    <ul class="update__list">
      ${posts.filter((p) => p.cat === 'actualidad').slice(0, 3).map((p) => `<li><a href="${p.url}"><time datetime="${p.date}">${new Date(p.date + 'T12:00:00Z').toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</time><span>${esc(p.title)}</span>${icon.arrow}</a></li>`).join('')}
    </ul>
  </div>
</section>

${testimonialsSection()}

<section class="section">
  <div class="wrap faq-wrap">
    ${sectionHead('Preguntas frecuentes', 'Antes de empezar')}
    ${faq(homeFaq)}
  </div>
</section>

<section class="section section--paper" id="evaluar-home">
  <div class="wrap eval">
    <div class="eval__copy">
      <p class="kicker">Evaluación preliminar</p>
      <h2>Empieza por saber dónde estás</h2>
      <p>Responde unas preguntas sobre tu situación. Revisamos tu caso y te indicamos los siguientes pasos. Toma unos 3 minutos.</p>
      <ul class="ticks">
        <li>${icon.check} Sin enviar documentos</li>
        <li>${icon.check} Preguntas específicas para tu servicio</li>
        <li>${icon.check} Respuesta por el canal que prefieras</li>
      </ul>
      <p class="eval__alt">¿Prefieres hablar directamente? ${waBtn('Hola Abogado Brett, quiero hacer una consulta.', 'Escríbenos por WhatsApp', { variant: 'text', location: 'home-eval' })}</p>
    </div>
    ${leadForm()}
  </div>
</section>`;
  return layout({
    path: '/',
    title: 'Abogado Johan Brett · Ciudadanía italiana y migración a Europa',
    description: 'Johan Brett, abogado ítalo-venezolano en Italia. Ciudadanía italiana por descendencia o matrimonio, mentorías y asesoría para migrar o emprender en Europa.',
    body,
    schema: [schemaOrg(), schemaPerson(), schemaFaq(homeFaq), { '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: site.url, inLanguage: 'es' }],
  });
};

// ============ SERVICIO ============
const servicePage = (s) => {
  const related = relatedPosts(s.key === 'matrimonio' ? ['matrimonio'] : s.key === 'migracion' ? ['migracion', 'guia'] : ['ciudadania', 'guia', 'actualidad']);
  const others = services.filter((o) => o.key !== s.key);
  const body = `
<section class="page-hero">
  <div class="wrap">
    ${breadcrumbs([['/servicios/', 'Servicios'], [`/${s.slug}/`, s.short]])}
    <div class="page-hero__grid">
      <div>
        <p class="kicker kicker--light"><span class="kicker__ico">${icon[s.icon]}</span>${esc(s.kicker)}</p>
        <h1>${esc(s.h1)}</h1>
        <p class="page-hero__lead">${esc(s.lead)}</p>
        <div class="hero__actions">
          ${btn('#evaluar', s.ctaLabel, { variant: 'gold', id: `hero-${s.key}`, service: s.key })}
          ${waBtn(s.waText, 'Consultar por WhatsApp', { variant: 'ghost-light', service: s.key, location: 'service-hero' })}
        </div>
      </div>
      <aside class="page-hero__aside">
        <h2>¿Es para ti?</h2>
        <ul class="ticks ticks--light">${s.audience.map((a) => `<li>${icon.check} ${esc(a)}</li>`).join('')}</ul>
      </aside>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div class="split__problem reveal">
      <p class="kicker">${esc(s.problem.title)}</p>
      <p class="lede">${esc(s.problem.text)}</p>
    </div>
    <div>
      <p class="kicker">Cómo te ayudamos</p>
      <div class="benefits">
        ${s.benefits.map(([t, d], i) => `<div class="benefit reveal" style="--i:${i}"><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('')}
      </div>
    </div>
  </div>
</section>

<section class="section section--paper">
  <div class="wrap">
    ${sectionHead('El proceso', 'Así avanzamos contigo')}
    ${steps(s.process)}
  </div>
</section>

<section class="section" id="evaluar-wrap">
  <div class="wrap eval">
    <div class="eval__copy">
      <p class="kicker">Evaluación</p>
      <h2>${esc(s.ctaTitle)}</h2>
      <p>${esc(s.ctaText)}</p>
      <ul class="ticks">
        <li>${icon.check} Unos 3 minutos</li>
        <li>${icon.check} Sin enviar documentos</li>
        <li>${icon.check} Tus datos solo se usan para responderte</li>
      </ul>
      ${s.calendly ? `<p class="eval__alt">¿Ya lo tienes claro? ${btn(site.calendly[s.calendly], 'Reservar sesión en el calendario', { variant: 'text', id: `calendly-${s.key}`, service: s.key, ext: true })}</p>` : ''}
      <p class="eval__alt">¿Prefieres conversar? ${waBtn(s.waText, 'Escribir por WhatsApp', { variant: 'text', service: s.key, location: 'service-eval' })}</p>
    </div>
    ${leadForm(s.key)}
  </div>
</section>

<section class="section section--paper">
  <div class="wrap faq-wrap">
    ${sectionHead('Preguntas frecuentes', esc(s.name))}
    ${faq(s.faqs)}
  </div>
</section>

${related.length ? `<section class="section">
  <div class="wrap">
    ${sectionHead('Para profundizar', 'Artículos relacionados')}
    <div class="post-grid">${related.map(postCard).join('')}</div>
  </div>
</section>` : ''}

<section class="section section--tight section--line">
  <div class="wrap">
    <p class="kicker">Otros servicios</p>
    <ul class="chips">${others.map((o) => `<li><a href="/${o.slug}/">${icon[o.icon]} ${esc(o.name)}</a></li>`).join('')}</ul>
  </div>
</section>`;
  const crumbs = [['/servicios/', 'Servicios'], [`/${s.slug}/`, s.short]];
  return layout({
    path: `/${s.slug}/`,
    title: s.metaTitle,
    description: s.metaDesc,
    body,
    current: s.slug,
    waText: s.waText,
    schema: [schemaService(s), schemaBreadcrumb(crumbs), schemaFaq(s.faqs)],
  });
};

// ============ SERVICIOS (hub) ============
const servicesHub = () => layout({
  path: '/servicios/',
  title: 'Servicios de ciudadanía italiana y migración | Abogado Brett',
  description: 'Ciudadanía italiana por descendencia y matrimonio, mentoría de 12 meses, migración y emprendimiento en Europa y documentos en Italia.',
  current: 'servicios',
  schema: [schemaBreadcrumb([['/servicios/', 'Servicios']])],
  body: `
<section class="page-hero page-hero--compact">
  <div class="wrap">
    ${breadcrumbs([['/servicios/', 'Servicios']])}
    <h1>Servicios</h1>
    <p class="page-hero__lead">Cinco líneas de trabajo, una misma forma de hacerlo: evaluación honesta, estrategia clara y acompañamiento hasta el final.</p>
  </div>
</section>
<section class="section">
  <div class="wrap">
    <div class="svc-list">
      ${services.map((s, i) => `
      <article class="svc-row reveal" style="--i:${i}">
        <span class="svc-row__ico">${icon[s.icon]}</span>
        <div>
          <h2><a href="/${s.slug}/">${esc(s.name)}</a></h2>
          <p>${esc(s.card)}</p>
          <p class="svc-row__for"><strong>Para:</strong> ${esc(s.audience.slice(0, 2).join(' '))}</p>
        </div>
        <div class="svc-row__actions">
          ${btn(`/${s.slug}/`, 'Ver detalle', { variant: 'ghost', id: `hub-${s.key}`, service: s.key })}
          ${btn(`/${s.slug}/#evaluar`, s.ctaLabel.replace(/ de .*| por .*/, ''), { variant: 'text', id: `hub-eval-${s.key}`, service: s.key })}
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>
${ctaBand('¿No sabes por dónde empezar?', 'Cuéntanos tu situación y te orientamos hacia la opción adecuada.')}`,
});

// ============ SOBRE ============
const about = () => layout({
  path: '/sobre-johan-brett/',
  title: 'Sobre Johan Brett: abogado ítalo-venezolano en Italia | Abogado Brett',
  description: 'Conoce a Johan Brett, abogado ítalo-venezolano radicado en Italia, nieto de italiano y fundador de Brett Giuntoli & Asociados. Su historia, formación y forma de trabajar.',
  current: 'sobre-johan-brett',
  schema: [schemaPerson(), schemaBreadcrumb([['/sobre-johan-brett/', 'Sobre Johan Brett']])],
  body: `
<section class="page-hero page-hero--about">
  <div class="wrap">
    ${breadcrumbs([['/sobre-johan-brett/', 'Sobre Johan Brett']])}
    <div class="about-hero">
      <div>
        <p class="kicker kicker--light">Abogado · Asesor legal y migratorio</p>
        <h1>Johan Brett</h1>
        <p class="page-hero__lead">Abogado venezolano con doble ciudadanía ítalo-venezolana. Vive en Italia y acompaña a familias y emprendedores que quieren obtener su ciudadanía italiana, vivir o emprender en Europa.</p>
        ${pending('título profesional exacto, universidad, año y número de inscripción en el Colegio de Abogados')}
      </div>
      ${img('johan-brett', 'Retrato de Johan Brett', { eager: true, cls: 'about-hero__photo' })}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap prose-grid">
    <div class="prose">
      <p class="kicker">Mi historia</p>
      <h2>De nieto de italiano a acompañar a otros en el mismo camino</h2>
      <p>Nací fuera de Italia. Como nieto de italiano, tramité mi ciudadanía y después di el paso de mudarme: hoy vivo en Italia junto a mi esposa y mis dos hijos.</p>
      <p>Ese proceso me enseñó lo que ningún manual explica: la ansiedad de no encontrar un acta, la confusión entre consulados y requisitos que cambian, y la decisión de empezar una vida nueva en otro país. Por eso mi trabajo no se limita al trámite: te ayudo a entender tus opciones y a tomar decisiones informadas.</p>
      <p>Estudié en Venezuela y en Italia y sigo actualizándome de forma permanente. Antes trabajé en el mundo corporativo con empresarios y líderes, una experiencia que hoy aplico a quienes quieren emprender en Europa.</p>
      ${pending('trayectoria profesional verificable: años de ejercicio, cargos y áreas de práctica')}
    </div>
    <aside class="about-card">
      <h2>En síntesis</h2>
      <dl>
        <dt>Nacionalidad</dt><dd>Italiana y venezolana</dd>
        <dt>Residencia</dt><dd>Italia ${pending('ciudad')}</dd>
        <dt>Formación</dt><dd>Venezuela e Italia ${pending('títulos y universidades')}</dd>
        <dt>Despacho</dt><dd>${esc(site.firm)}</dd>
        <dt>Idiomas</dt><dd>Español e italiano ${pending('confirmar idiomas de atención')}</dd>
        <dt>Credenciales</dt><dd>${pending('colegiaciones y jurisdicciones habilitadas') || 'Información disponible a solicitud'}</dd>
      </dl>
    </aside>
  </div>
</section>

<section class="section section--paper">
  <div class="wrap">
    ${sectionHead('El equipo', esc(site.firm), 'Un grupo de profesionales, asesores, abogados y traductores oficiales con presencia en Venezuela e Italia, que trabaja en colaboración con asesores migratorios y despachos aliados.')}
    <div class="ally">
      <p class="kicker">Red de aliados y colaboradores</p>
      <ul class="chips chips--static">${site.allies.map((c) => `<li>${icon.globe} ${esc(c)}</li>`).join('')}</ul>
      <p class="muted">También colaboramos con profesionales de áreas complementarias: inmobiliaria, seguros de salud y finanzas.</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead('Mi forma de trabajar', 'Lo que puedes esperar')}
    <div class="values">
      <div class="value reveal"><h3>Honestidad antes que ventas</h3><p>Si tu caso no es viable, te lo digo. Ningún profesional serio puede garantizar el resultado de un trámite que decide una autoridad.</p></div>
      <div class="value reveal" style="--i:1"><h3>Información actualizada</h3><p>Sigo de cerca cada cambio legislativo y judicial, y lo explico en español en el blog.</p></div>
      <div class="value reveal" style="--i:2"><h3>Acompañamiento personal</h3><p>Trabajo contigo de forma directa y a tu ritmo, por videollamada, desde cualquier país.</p></div>
      <div class="value reveal" style="--i:3"><h3>Visión de proyecto de vida</h3><p>La ciudadanía es un medio. Te ayudo a planificar qué viene después: vivir, trabajar o emprender en Europa.</p></div>
    </div>
  </div>
</section>
${ctaBand('Hablemos de tu caso', 'Empieza con la evaluación preliminar en línea o escríbenos por WhatsApp.')}`,
});

// ============ CONTACTO ============
const contact = () => layout({
  path: '/contacto/',
  title: 'Solicitar evaluación de tu caso | Abogado Brett',
  description: 'Solicita la evaluación preliminar de tu caso de ciudadanía italiana, migración o emprendimiento en Europa. Formulario en 3 pasos, WhatsApp, correo o videollamada.',
  current: 'contacto',
  schema: [schemaBreadcrumb([['/contacto/', 'Contacto']]), schemaOrg()],
  body: `
<section class="page-hero page-hero--compact">
  <div class="wrap">
    ${breadcrumbs([['/contacto/', 'Contacto']])}
    <h1>Cuéntanos tu caso</h1>
    <p class="page-hero__lead">Tres pasos, unos 3 minutos. Revisamos tu información y te respondemos por el canal que elijas.</p>
  </div>
</section>
<section class="section">
  <div class="wrap eval eval--contact">
    ${leadForm()}
    <aside class="channels">
      <h2>Otras formas de contacto</h2>
      <a class="channel" href="${esc(waLink('Hola Abogado Brett, quiero hacer una consulta.'))}" target="_blank" rel="noopener" data-wa="contact-page">${icon.whatsapp}<span><strong>WhatsApp</strong><small>${site.whatsappDisplay}</small></span></a>
      <a class="channel" href="mailto:${site.email}?subject=${encodeURIComponent('Consulta desde abogadobrett.com')}" data-cta="email-contact">${icon.mail}<span><strong>Correo</strong><small>${site.email}</small></span></a>
      <a class="channel" href="${site.calendly.consulta}" target="_blank" rel="noopener" data-cta="calendly-contact">${icon.calendar}<span><strong>Consulta de 60 minutos</strong><small>Reserva directamente por videollamada</small></span></a>
      <a class="channel" href="mailto:${site.emailDocuments}?subject=${encodeURIComponent('Búsqueda de documentos en Italia')}" data-cta="email-docs">${icon.document}<span><strong>Documentos en Italia</strong><small>${site.emailDocuments}</small></span></a>
      ${pending('horario de atención y zona horaria')}
    </aside>
  </div>
</section>`,
});

// ============ BLOG ============
const blog = () => layout({
  path: '/blog/',
  title: 'Recursos: ciudadanía italiana, reformas y guías | Abogado Brett',
  description: 'Análisis de la reforma de la ciudadanía italiana (Ley 74/2025), sentencias, guías prácticas sobre AIRE, CIE, matrimonio y documentos, explicadas en español por Johan Brett.',
  current: 'blog',
  schema: [schemaBreadcrumb([['/blog/', 'Recursos']])],
  body: `
<section class="page-hero page-hero--compact">
  <div class="wrap">
    ${breadcrumbs([['/blog/', 'Recursos']])}
    <h1>Recursos y actualidad</h1>
    <p class="page-hero__lead">Lo que cambió, lo que rige hoy y lo que viene, explicado en español y sin tecnicismos innecesarios.</p>
  </div>
</section>
<section class="section">
  <div class="wrap">
    <div class="filters" role="group" aria-label="Filtrar por tema">
      <button type="button" class="filter is-active" data-filter="all" aria-pressed="true">Todos</button>
      ${Object.entries(categories).map(([k, v]) => `<button type="button" class="filter" data-filter="${k}" aria-pressed="false">${esc(v)}</button>`).join('')}
    </div>
    <div class="post-grid post-grid--all" data-posts>
      ${posts.map((p) => postCard(p).replace('<article class="post-card', `<article data-cat="${p.cat}" class="post-card`)).join('')}
    </div>
    <p class="center">${btn(blogArchive, 'Ver el archivo completo de artículos', { variant: 'ghost', id: 'blog-archive' })}</p>
  </div>
</section>
${ctaBand('¿Leíste algo que aplica a tu caso?', 'Pide una evaluación y te decimos cómo te afecta.')}`,
});

// ============ PRIVACIDAD ============
const privacy = () => layout({
  path: '/privacidad/',
  title: 'Privacidad y cookies | Abogado Brett',
  description: 'Cómo tratamos tus datos personales cuando solicitas una evaluación en abogadobrett.com, y qué cookies utilizamos.',
  noindex: true,
  body: `
<section class="page-hero page-hero--compact">
  <div class="wrap">${breadcrumbs([['/privacidad/', 'Privacidad']])}<h1>Privacidad y cookies</h1></div>
</section>
<section class="section">
  <div class="wrap prose prose--narrow">
    ${pending('revisión de este texto por el propietario/asesor de protección de datos antes de publicar')}
    <h2>Responsable del tratamiento</h2>
    <p>${esc(site.person)} (${esc(site.firm)}). Contacto: <a href="mailto:${site.email}">${site.email}</a>. ${pending('domicilio y número fiscal del responsable')}</p>
    <h2>Qué datos recogemos</h2>
    <p>Los que nos facilitas en el formulario de evaluación: nombre, correo electrónico, número de WhatsApp, país de residencia, canal de contacto preferido y las respuestas sobre tu caso. No solicitamos documentos de identidad ni datos especialmente protegidos en este primer contacto; te pedimos que no los incluyas en el mensaje libre.</p>
    <h2>Para qué los usamos</h2>
    <p>Para evaluar tu consulta y responderte (base jurídica: medidas precontractuales solicitadas por ti). Solo si lo autorizas expresamente, para enviarte novedades legislativas y contenidos relacionados (base jurídica: consentimiento, revocable en cualquier momento).</p>
    <h2>Con quién los compartimos</h2>
    <p>Con el proveedor de gestión de clientes que utilizamos para organizar las consultas ${pending('nombre del CRM, p. ej. GoHighLevel, y su ubicación/garantías de transferencia internacional')} y, cuando tu caso lo requiera y con tu conocimiento, con colaboradores de nuestra red de aliados. No vendemos tus datos.</p>
    <h2>Cuánto tiempo los conservamos</h2>
    <p>Mientras se gestiona tu consulta y, después, durante el plazo necesario para atender posibles responsabilidades. ${pending('plazo de conservación concreto')}</p>
    <h2>Tus derechos</h2>
    <p>Puedes acceder, rectificar, suprimir, oponerte, limitar el tratamiento y solicitar la portabilidad de tus datos escribiendo a <a href="mailto:${site.email}">${site.email}</a>. También puedes presentar una reclamación ante la autoridad de control competente (en Italia, el Garante per la protezione dei dati personali).</p>
    <h2 id="cookies">Cookies</h2>
    <p>Este sitio funciona sin cookies de terceros. Solo si las aceptas en el aviso, se cargan herramientas de medición (Google Tag Manager, Google Analytics 4 y, si se configura, Meta Pixel) para conocer el uso del sitio de forma agregada. Nunca enviamos a estas herramientas tu nombre, correo, teléfono ni detalles de tu caso. Puedes cambiar tu elección en cualquier momento con el enlace «Configurar cookies» del pie de página.</p>
  </div>
</section>`,
});

// ============ 404 ============
const notFound = () => layout({
  path: '/404.html',
  title: 'Página no encontrada | Abogado Brett',
  description: 'La página que buscas no existe o cambió de dirección. Vuelve al inicio o revisa nuestros servicios.',
  noindex: true,
  body: `
<section class="page-hero page-hero--compact page-hero--404">
  <div class="wrap">
    <p class="kicker kicker--light">Error 404</p>
    <h1>Esta página no existe o cambió de dirección</h1>
    <p class="page-hero__lead">Puede que el enlace sea antiguo. Estas son las secciones principales:</p>
    <div class="hero__actions">${btn('/', 'Ir al inicio', { variant: 'gold', id: '404-home' })}${btn('/servicios/', 'Ver servicios', { variant: 'ghost-light', id: '404-services', iconName: '' })}${btn('/blog/', 'Recursos', { variant: 'ghost-light', id: '404-blog', iconName: '' })}</div>
  </div>
</section>`,
});

export const pages = [
  { out: 'index.html', html: home },
  { out: 'servicios/index.html', html: servicesHub },
  ...services.map((s) => ({ out: `${s.slug}/index.html`, html: () => servicePage(s) })),
  { out: 'sobre-johan-brett/index.html', html: about },
  { out: 'contacto/index.html', html: contact },
  { out: 'blog/index.html', html: blog },
  { out: 'privacidad/index.html', html: privacy, noSitemap: true },
  { out: '404.html', html: notFound, noSitemap: true },
];
