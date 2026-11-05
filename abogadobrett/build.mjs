// Build estático sin dependencias: node build.mjs  (REVIEW=1 muestra los campos pendientes)
import { rm, mkdir, cp, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { pages } from './src/pages.mjs';
import { formSets, serviceOptions } from './src/data/forms.mjs';
import { site } from './src/data/site.mjs';

const DIST = 'dist';
const CONSENT_VERSION = 'privacidad-2026-11';

await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });
await cp('src/assets', join(DIST, 'assets'), { recursive: true });
await rm(join(DIST, 'assets/fonts/fonts.css'));

// CSS: fuentes en línea (evita una petición encadenada) + minificado ligero
const fonts = await readFile('src/assets/fonts/fonts.css', 'utf8');
const css = (fonts + (await readFile('src/assets/css/main.css', 'utf8')))
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s+/g, ' ')
  .replace(/\s*([{}:;,>])\s*/g, '$1')
  .replace(/;}/g, '}')
  .replace(/:has\(>/g, ':has(> ') // conservar espacio legible en :has
  .trim();
await writeFile(join(DIST, 'assets/css/main.css'), css);

// JS: datos del formulario inyectados desde la fuente única
const js = (await readFile('src/assets/js/main.js', 'utf8')).replace(
  'var FORM = __FORM_DATA__;',
  'var FORM = ' + JSON.stringify({ sets: formSets, services: serviceOptions, consentVersion: CONSENT_VERSION }) + ';',
);
if (js.includes('__FORM_DATA__')) throw new Error('Datos del formulario no inyectados en main.js');
await writeFile(join(DIST, 'assets/js/main.js'), js);

const v = createHash('sha1').update(css + js).digest('hex').slice(0, 8);

for (const p of pages) {
  const html = p.html().replace(/__V__/g, v);
  const file = join(DIST, p.out);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}

// SEO técnico
const today = new Date().toISOString().slice(0, 10);
const urls = pages.filter((p) => !p.noSitemap).map((p) => `/${p.out.replace(/index\.html$/, '')}`);
await writeFile(join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${site.url}${u}</loc><lastmod>${today}</lastmod><priority>${u === '/' ? '1.0' : '0.8'}</priority></url>`).join('\n')}
</urlset>
`);
await writeFile(join(DIST, 'robots.txt'), `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${site.url}/sitemap.xml
`);

// Redirecciones 301 desde las URLs del sitio actual (Netlify). Las URLs de artículos del blog no se tocan.
await writeFile(join(DIST, '_redirects'), `# URL antigua                 nueva                 código
/servicios-abogado-brett/*    /servicios/            301
/quien-es-abogado-brett/*     /sobre-johan-brett/    301
/consulta-con-un-abogado/*    /contacto/             301
/asesoria-gratis/*            /contacto/             301
/redes                        /contacto/             301
/redes/                       /contacto/             301
/Mentorias                    /mentorias/            301
/Mentorias/                   /mentorias/            301
/Blog                         /blog/                 301

# Artículos del blog: mientras sigan en WordPress, publicar WordPress en un subdominio
# (p. ej. https://articulos.abogadobrett.com) y descomentar este proxy para conservar sus URLs y su SEO:
# /*  https://articulos.abogadobrett.com/:splat  200
`);

await writeFile(join(DIST, '_headers'), `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net; img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com https://www.facebook.com; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://www.facebook.com; font-src 'self'; style-src 'self' 'unsafe-inline'; frame-ancestors 'self'; base-uri 'self'; form-action 'self'
/assets/*
  Cache-Control: public, max-age=31536000, immutable
`);

console.log(`✓ ${pages.length} páginas · assets v${v} · ${process.env.REVIEW === '1' ? 'modo REVISIÓN (pendientes visibles)' : 'modo producción'}`);
