// Servidor estático mínimo para desarrollo y QA (emula pretty URLs y 404 de Netlify; /api/lead → función local).
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const ROOT = 'dist', PORT = Number(process.env.PORT || 4321);
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };
const lead = (await import('../netlify/functions/lead.mjs')).default;

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname === '/api/lead') {
    const body = await new Promise((r) => { let b = ''; req.on('data', (c) => (b += c)); req.on('end', () => r(b)); });
    const r = await lead(new Request('http://x/api/lead', { method: req.method, headers: req.headers, body: req.method === 'POST' ? body : undefined }));
    res.writeHead(r.status, { 'Content-Type': 'application/json' }); return res.end(await r.text());
  }
  let p = normalize(join(ROOT, decodeURIComponent(url.pathname)));
  if (!p.startsWith(ROOT)) { res.writeHead(400); return res.end(); }
  try { if ((await stat(p)).isDirectory()) p = join(p, 'index.html'); } catch {}
  try {
    const data = await readFile(p);
    res.writeHead(200, { 'Content-Type': TYPES[extname(p)] || 'application/octet-stream' }); res.end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': TYPES['.html'] }); res.end(await readFile(join(ROOT, '404.html')));
  }
}).listen(PORT, () => console.log(`http://localhost:${PORT}`));
