// QA estático de dist/: enlaces internos y anclas, SEO on-page, schema, accesibilidad básica, restos de plantilla.
import { readFile, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = 'dist';
const files = [];
async function walk(d) { for (const f of await readdir(d)) { const p = join(d, f); (await stat(p)).isDirectory() ? await walk(p) : p.endsWith('.html') && files.push(p); } }
await walk(ROOT);

const errors = [], warns = [];
const pages = {};
for (const f of files) pages['/' + f.slice(ROOT.length + 1).replace(/index\.html$/, '')] = await readFile(f, 'utf8');
const ids = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const exists = async (p) => { try { await stat(join(ROOT, p)); return true; } catch { return false; } };

for (const [path, html] of Object.entries(pages)) {
  const e = (m) => errors.push(`${path}: ${m}`), w = (m) => warns.push(`${path}: ${m}`);
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] || '';
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] || '';
  if (!title) e('sin <title>'); else if (title.length > 70) w(`title largo (${title.length})`);
  if (!desc) e('sin meta description'); else if (desc.length < 70 || desc.length > 175) w(`description ${desc.length} caracteres`);
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) e(`${h1} etiquetas h1`);
  if (!/noindex/.test(html) && !/rel="canonical"/.test(html)) e('sin canonical');
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { JSON.parse(m[1]); } catch { e('JSON-LD inválido'); } }
  for (const m of html.matchAll(/<img\b[^>]*>/g)) if (!/\salt="/.test(m[0])) e('img sin alt');
  if (/__[A-Z_]+__/.test(html)) e('placeholder de build sin reemplazar');
  if (process.env.REVIEW !== '1' && /class="pending"/.test(html)) e('campo pendiente visible en producción');
  if (/href="#"/.test(html)) e('enlace vacío href="#"');
  for (const m of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) if (!/rel="noopener/.test(m[0]) && !/privacidad/.test(m[0])) w('target=_blank sin rel=noopener');
  for (const m of html.matchAll(/(?:href|src|srcset)="(\/[^"]*)"/g)) {
    const [p0, hash] = m[1].split('#'); const p = p0.split('?')[0];
    if (p.startsWith('/api/')) continue;
    if (p && p !== '/' && !(await exists(p.endsWith('/') ? p + 'index.html' : p))) e(`enlace roto ${m[1]}`);
    if (hash) { const target = p ? pages[p] : html; if (target && !ids(target).has(hash)) e(`ancla inexistente ${m[1]}`); }
  }
  for (const m of html.matchAll(/href="#([^"]+)"/g)) if (!ids(html).has(m[1])) e(`ancla inexistente #${m[1]}`);
  // Formulario presente donde corresponde
  if (/^\/(contacto|ciudadania|mentorias|migrar|documentos)/.test(path) && !/data-lead-form/.test(html)) e('falta formulario');
}

const mainJs = await readFile(join(ROOT, 'assets/js/main.js'), 'utf8');
if (/__[A-Z_]+__/.test(mainJs)) errors.push('main.js con placeholder sin reemplazar');
try { new Function(mainJs); } catch (e) { errors.push('main.js no compila: ' + e.message); }

const robots = await readFile(join(ROOT, 'robots.txt'), 'utf8');
if (!/Sitemap:/.test(robots)) errors.push('robots.txt sin Sitemap');
const sm = await readFile(join(ROOT, 'sitemap.xml'), 'utf8');
for (const loc of sm.matchAll(/<loc>https:\/\/www\.abogadobrett\.com([^<]*)<\/loc>/g)) if (!pages[loc[1]]) errors.push(`sitemap apunta a página inexistente ${loc[1]}`);

console.log(`Páginas analizadas: ${files.length}`);
warns.forEach((m) => console.log('  ⚠ ' + m));
errors.forEach((m) => console.log('  ✗ ' + m));
console.log(errors.length ? `✗ ${errors.length} errores` : '✓ Sin errores');
process.exit(errors.length ? 1 : 0);
