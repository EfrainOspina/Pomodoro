# Rediseño de abogadobrett.com: documento de entrega

Fecha: 5 nov 2026 · Alcance: auditoría, estrategia, arquitectura, diseño, desarrollo, formularios, SEO, analítica y QA.

---

## 1. Auditoría del sitio actual

**Plataforma:** WordPress + Elementor Pro (pop-ups), imágenes vía Jetpack (i0.wp.com), Calendly, Linktree y enlaces cortos `wkf.ms`. Solo en español. Sin acceso al backend de WordPress: el rediseño se construye como proyecto nuevo (ver §8).

**Servicios reales encontrados** (portada, `/servicios-abogado-brett/`, `/Mentorias/`, blog):
- Ciudadanía italiana por descendencia (vía administrativa, consular o judicial; en Italia o en el país de origen).
- Ciudadanía italiana por matrimonio.
- Mentoría de ciudadanía italiana: 6 horas en 12 meses, «ahorras hasta $300», para descendientes, cónyuges e italianos ya reconocidos.
- Asesoría migratoria: visas, residencia, reunificación familiar, asilo o refugio, matrimonio en el extranjero, procesos legales.
- Emprendimiento: apertura de empresa en Italia o España, estudio de mercado laboral o comercial.
- Documentos: búsqueda de actas en Italia, legalización, apostilla, traducción oficial, búsqueda de bienes o empresas.

**Datos biográficos verificados:** abogado venezolano con doble ciudadanía ítalo-venezolana; nieto de italiano, tramitó su ciudadanía; vive en Italia con su esposa y dos hijos; estudió en Venezuela e Italia; experiencia en el mundo corporativo; despacho Brett Giuntoli & Asociados (abogados, asesores y traductores oficiales, con presencia en Venezuela e Italia); red de aliados en varios países de Europa y América.

**Qué funciona y se conserva**
- La historia personal («yo también lo viví»): es el diferencial más fuerte y estaba enterrada.
- El blog: unos 89 artículos, muy activo en 2025–2026 sobre la Ley 74/2025. Es un gran activo SEO y de autoridad.
- El formulario de ciudadanía, cuyas preguntas sobre el antepasado se han reutilizado y simplificado.
- WhatsApp como canal principal, Calendly y las redes sociales.

**Problemas detectados**
1. El hero vende una suscripción («¡SI QUIERO!»), no una consulta, y no explica servicios ni público.
2. Los servicios aparecen como una lista de 16 preguntas en una sola página, sin páginas por línea de servicio.
3. Formularios largos (10–12 campos) dentro de pop-ups; el de migración aparece duplicado en dos páginas.
4. La sección «Comentarios de clientes satisfechos» no tiene testimonios, y «Nuestros aliados» muestra solo «Próximamente…».
5. No hay política de privacidad ni aviso de cookies (exigibles por RGPD, ya que el titular reside en Italia).
6. Inconsistencias: tres listas de países aliados distintas, tres denominaciones de marca, © 2024 frente a © 2026, botones «Send» en inglés.
7. Enlace mal formado en el ítem 16 de Servicios; varios ítems sin enlace; erratas.
8. Sin credenciales profesionales (colegiación, títulos), dirección ni horario.
9. CTA dispersos hacia destinos distintos (pop-ups, `wkf.ms`, mailto, Calendly) sin medición unificada.

## 2. Estrategia

**Público objetivo:** 1) descendientes de italianos en América Latina (núcleo del negocio); 2) cónyuges de italianos; 3) personas que hacen el trámite por su cuenta (mentoría); 4) familias y emprendedores que quieren migrar o abrir un negocio en Europa; 5) quienes necesitan documentos de Italia.

**Propuesta de valor:** «Tu ciudadanía italiana y tu vida en Europa, con un abogado que ya hizo ese camino». Combina la autoridad (abogado, despacho, equipo en Italia y Venezuela, análisis jurídico actualizado) con la cercanía (lo vivió en primera persona).

**Principios de mensaje:** concreto, sin promesas de resultado (la decisión es siempre de la autoridad), con urgencia legítima: la reforma de 2025 deja obsoleta la información anterior.

**Embudo:** Instagram o Google → página del servicio → evaluación en 2–3 pasos → lead en GoHighLevel con etiquetas y origen → respuesta por el canal elegido → consulta de pago o mentoría.

## 3. Arquitectura definitiva

```
/                                   Portada (selector de situación + método + actualidad + evaluación)
/servicios/                         Índice de servicios
/ciudadania-italiana/               Descendencia (iure sanguinis)
/ciudadania-italiana-por-matrimonio/
/mentorias/                         Mentoría 12 meses (+ Calendly)
/migrar-y-emprender-en-europa/
/documentos-en-italia/
/sobre-johan-brett/
/contacto/                          Evaluación completa + canales (?servicio=xxx preselecciona)
/blog/                              Recursos (filtrables) → artículos existentes
/privacidad/                        Privacidad y cookies (noindex)
/404.html
```
La metodología vive en la portada (`/#metodo`) y en cada servicio con su propio proceso. Los testimonios se activan solos al cargar datos reales.

Cada página de servicio tiene: hero con CTA específico, «¿Es para ti?», problema, beneficios, proceso, **formulario incrustado con el servicio ya elegido**, FAQ, artículos relacionados y enlaces cruzados.

Redirecciones 301 de las URLs antiguas en `dist/_redirects` (servicios, quién es, mentorías, consulta, asesoría gratis, redes, Blog).

## 4. Identidad visual aplicada

- **Paleta:** navy 950 `#08121F` / 900 `#0B1626`, blanco cálido `#FAF7F2`, gris piedra `#D3CCBF`/`#8C867B`, dorado `#A9834B` solo en acentos (CTA principal, filetes y numeración).
- **Tipografía:** Cormorant Garamond (titulares, cursiva para el énfasis) + Manrope (texto e interfaz). Servidas desde el propio dominio, sin Google Fonts externo (mejor para RGPD y rendimiento).
- **Recursos gráficos:** monograma «JB» enmarcado (provisional), iconos de trazo fino propios, retícula editorial con filetes de 1 px, fotografía real del titular sobre fondo navy, animaciones de entrada sutiles que respetan `prefers-reduced-motion`.
- Sin plantillas, sin gradientes decorativos (solo una luz radial tenue en el hero) y sin fotografías de stock.

## 5. Funcionalidades implementadas

| Funcionalidad | Estado |
|---|---|
| Formulario progresivo (servicio → preguntas específicas → contacto) con 5 juegos de preguntas | ✅ |
| Validación en cliente y servidor, mensajes en español, foco accesible, honeypot antispam | ✅ |
| Consentimiento de privacidad obligatorio + consentimiento de marketing separado, versionado y con fecha | ✅ |
| Endpoint `/api/lead` → GoHighLevel (API v2 o webhook) | ✅ código · ⏳ credenciales |
| Sin CRM configurado: el formulario ofrece enviar el resumen ya redactado por WhatsApp o correo (sin simular un envío) | ✅ |
| WhatsApp contextual por servicio (botón flotante, barra móvil, hero, pie, confirmación) | ✅ |
| Barra fija móvil «WhatsApp + Evaluar mi caso» (se oculta cerca del formulario y con el menú abierto) | ✅ |
| Atribución: UTM, gclid/fbclid, referrer, landing y detección del navegador in-app de Instagram/Facebook | ✅ |
| Consentimiento de cookies + Consent Mode v2; GTM solo se carga tras aceptar | ✅ · ⏳ ID GTM |
| Calendly (consulta de 60 min y mentoría) | ✅ |
| Menú móvil accesible, desplegable de servicios, Escape para cerrar | ✅ |
| Filtros del blog | ✅ |
| Modo revisión con los datos pendientes visibles | ✅ |

## 6. Integraciones

### GoHighLevel: listo para conectar

**Modo A, API v2 (recomendado).** En GHL: *Settings → Private Integrations → Create* con permisos `contacts.write`, `contacts.readonly` y `opportunities.write`. En Netlify, definir:
```
GHL_PRIVATE_TOKEN=pit-...
GHL_LOCATION_ID=...
GHL_PIPELINE_ID=...        (opcional: crea una oportunidad)
GHL_STAGE_ID=...           (etapa «Nuevo lead web»)
ALLOWED_ORIGIN=https://www.abogadobrett.com
```
Qué hace: *upsert* del contacto (nombre, email, teléfono E.164, `source`), etiquetas `web-lead`, `servicio-<clave>`, `fuente-<utm_source>` y `acepta-novedades`; una nota con todas las respuestas, el origen y el registro de consentimiento; y una oportunidad en el pipeline.

**Modo B, webhook.** Crear un Workflow con el disparador *Inbound Webhook* y poner `GHL_WEBHOOK_URL`. Recibe JSON plano con `tags` y `note`.

**En GHL (configuración del propietario):** workflow «Nuevo lead web» → notificación interna (email/app) → asignación al responsable → WhatsApp o email de acuse → tarea de seguimiento a las 24 h → recordatorio si no agenda. Ramificar por la etiqueta `servicio-*`.

> Verificado en local contra un webhook simulado (200 OK, teléfono normalizado `+5491155555555`, etiquetas correctas). La llamada real a la API de GHL **no se ha probado** por falta de credenciales: hacer un envío de prueba tras configurarlas.

### Analítica (GA4, GTM y Meta Pixel)
Eventos enviados a `dataLayer` (sin datos personales):
`cta_click {cta_id, service}`, `whatsapp_click {location, service}`, `form_start {service}`, `form_step {service, step, step_name}`, `form_submit_success {service, preferred_channel}`, `form_submit_error {service, reason}`, `form_abandon {service, step}`.

En GTM: etiqueta GA4 de configuración; etiquetas de evento GA4 para cada evento; marcar `form_submit_success` y `whatsapp_click` como conversiones; Meta Pixel `Lead` en `form_submit_success` y `Contact` en `whatsapp_click`. Nunca se envían nombre, email, teléfono ni respuestas del caso.

## 7. SEO implementado

- URL limpias en español, title y description únicos por página, un H1 por página con jerarquía H2/H3, canonical, Open Graph y Twitter Card, imagen OG 1200×630.
- Schema.org (solo datos veraces): `LegalService`, `Person`, `Service` por servicio, `BreadcrumbList`, `FAQPage` y `WebSite`. Sin dirección ni valoraciones, porque no existen datos verificados.
- `sitemap.xml`, `robots.txt`, redirecciones 301, 404 propia y `noindex` en privacidad.
- Rendimiento: sin frameworks; CSS 34 KB y JS 30 KB sin comprimir; 3 fuentes woff2 precargadas; imágenes WebP con `width`/`height` (sin CLS), `fetchpriority` en el hero y *lazy-load* en el resto; caché inmutable con versión por hash.
- Enlazado interno: servicio ↔ artículos relacionados ↔ otros servicios; portada → actualidad.

**Palabras clave objetivo (por intención; sin datos de volumen, validar en Search Console y Keyword Planner):**
- Descendencia: *ciudadanía italiana*, *ciudadanía italiana por descendencia*, *iure sanguinis*, *ciudadanía italiana bisnieto/nieto*, *ley 74/2025 ciudadanía italiana*, *ciudadanía italiana vía judicial*, *abogado ciudadanía italiana*.
- Matrimonio: *ciudadanía italiana por matrimonio requisitos*, *ciudadanía italiana por matrimonio tiempo*.
- Mentoría: *cómo tramitar la ciudadanía italiana por mi cuenta*, *asesoría ciudadanía italiana*.
- Migración: *emigrar a Italia*, *emigrar a España desde Venezuela/Argentina*, *abrir empresa en Italia extranjero*, *reagrupación familiar Italia*.
- Documentos: *buscar acta de nacimiento en Italia*, *apostilla y traducción para ciudadanía italiana*.

**Estrategia internacional:** una sola versión en español neutro (`lang="es"`, sin hreflang mientras no haya otras lenguas). Los mercados (Venezuela, Argentina, Colombia, México, España, EE. UU.) se atacan con contenido, no con duplicados: artículos por consulado o país solo cuando aporten información distinta y real. Si más adelante hay versión en italiano o inglés: subcarpetas `/it/` y `/en/` con hreflang recíproco y `x-default`.

## 8. Decisiones técnicas

- **Por qué un sitio estático nuevo y no un tema de WordPress:** no hay acceso al WordPress actual; un sitio estático da el mejor rendimiento en móvil y en el navegador de Instagram, superficie de ataque mínima y despliegue gratuito. El blog sigue en WordPress (ver Publicación). Si se prefiere conservar WordPress para todo, este repositorio sirve de diseño, copy y lógica de referencia para un tema a medida.
- **Build propio sin dependencias** (`build.mjs`): componentes en `src/lib/components.mjs`, contenido en `src/data/*.mjs` (fuente única) y páginas en `src/pages.mjs`. No requiere `npm install`.
- **Netlify** por las funciones serverless (el token del CRM nunca llega al navegador), `_redirects`, `_headers` (CSP, HSTS, nosniff) y CDN.
- El repositorio donde se entrega es `efrainospina/pomodoro`; el proyecto vive aislado en `abogadobrett/` y no toca el Pomodoro. Se recomienda moverlo a un repositorio propio.

## 9. Resultados de pruebas

| Prueba | Resultado |
|---|---|
| QA estática (`npm run qa`): enlaces internos, anclas, H1, title y description, canonical, JSON-LD, alt, sitemap, placeholders | ✅ 12/12 páginas, 0 errores (producción y revisión) |
| Errores de consola, 12 rutas × móvil (iPhone 13) y escritorio (1440) | ✅ 0 (la 404 registra su propio 404, que es lo esperado) |
| Desbordamiento horizontal a 390 px | ✅ 0 px en las 12 rutas |
| Recorrido Instagram: llega con `utm_source=instagram` en el navegador in-app → toca «Ciudadanía» → barra móvil → formulario → validaciones → envío | ✅ atribución capturada, 6 errores mostrados al avanzar vacío; email, teléfono y consentimiento validados; resumen de WhatsApp correcto |
| `?servicio=matrimonio` preselecciona el servicio | ✅ |
| Endpoint: válido, sin consentimiento, honeypot, sin credenciales | ✅ 200 / 422 / 200 descartado / 503 |
| CTA principal visible sin scroll en móvil | ✅ (borde inferior del botón a 606 px de 664) |

**Defectos encontrados y corregidos durante la QA:** datos del formulario no inyectados (el marcador también estaba en un comentario); los botones con `hidden` seguían visibles porque `.btn` imponía `display`; columnas de grid ensanchadas por el contenido mínimo (7–28 px de desbordamiento que ocultaban la barra móvil); casilla de consentimiento con estilo de etiqueta; hero móvil demasiado alto.

**No probado:** API real de GHL (sin credenciales), GTM, GA4 y Pixel (sin ID), Lighthouse en producción, dispositivos iOS y Android físicos, y el proxy al blog de WordPress.

## 10. Publicación

1. Crear un sitio en Netlify desde el repositorio, con *Base directory* `abogadobrett`. Build y publicación ya están en `netlify.toml`.
2. Definir las variables de GHL (§6) y `ALLOWED_ORIGIN`. Enviar un lead de prueba y comprobar contacto, nota, etiquetas y oportunidad.
3. Rellenar `gtmId` en `src/data/site.mjs` cuando exista el contenedor GTM.
4. **Blog:** mover WordPress a un subdominio (p. ej. `articulos.abogadobrett.com`), activar el proxy comentado en `build.mjs` (`/* → subdominio 200`) para conservar las URLs actuales de los artículos, y añadir `noindex` al subdominio o un canonical hacia www. Alternativa: migrar los artículos y crear redirecciones 1:1.
5. Apuntar el DNS de `www.abogadobrett.com` a Netlify y forzar HTTPS.
6. Enviar `sitemap.xml` en Google Search Console y vigilar la cobertura y los 404 durante 4 semanas.
7. Instagram: enlace de la bio `https://www.abogadobrett.com/?utm_source=instagram&utm_medium=social&utm_campaign=bio` y enlaces de historias directos a cada servicio, por ejemplo `/ciudadania-italiana/?utm_source=instagram&utm_medium=story&utm_campaign=<tema>`.
