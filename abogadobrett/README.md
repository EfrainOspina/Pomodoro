# abogadobrett.com: sitio web

Sitio de captación para Johan Brett (ciudadanía italiana, migración y emprendimiento en Europa). HTML estático generado con Node, sin dependencias, más una función serverless para GoHighLevel.

- **Entrega completa** (auditoría, estrategia, arquitectura, SEO, pruebas y publicación): [`docs/ENTREGA.md`](docs/ENTREGA.md)
- **Datos que debe aportar el propietario:** [`docs/PENDIENTES.md`](docs/PENDIENTES.md)

## Comandos

```bash
npm run build          # genera dist/ (producción: no muestra pendientes)
npm run build:review   # genera dist/ marcando en rojo los datos pendientes
npm run serve          # http://localhost:4321 (incluye /api/lead local)
npm run qa             # build + QA estática (enlaces, SEO, schema, a11y básica)
```
Requiere Node 20 o superior. No hace falta `npm install`.

## Estructura

```
src/data/site.mjs        contacto, redes, Calendly, configuración (GTM, endpoint)
src/data/services.mjs    contenido de las 5 líneas de servicio
src/data/forms.mjs       preguntas de calificación por servicio
src/data/blog.mjs        artículos destacados (URLs reales)
src/data/testimonials.mjs  testimonios autorizados (vacío = la sección no se muestra)
src/lib/components.mjs   layout, cabecera, pie, tarjetas, FAQ, formulario, schema
src/pages.mjs            páginas
src/assets/              CSS, JS, fuentes e imágenes
netlify/functions/lead.mjs  POST /api/lead → GoHighLevel
build.mjs                build + sitemap, robots, _redirects, _headers
scripts/                 servidor local y QA
```

## Editar contenido

- Textos de un servicio: `src/data/services.mjs`.
- Preguntas del formulario: `src/data/forms.mjs` (se inyectan solas en el JS).
- Añadir un testimonio: `src/data/testimonials.mjs`.
- Añadir un artículo destacado: `src/data/blog.mjs`.

Después: `npm run qa` y desplegar.
