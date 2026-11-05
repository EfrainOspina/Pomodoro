// POST /api/lead — recibe la solicitud del formulario y la registra en GoHighLevel.
// Las credenciales viven SOLO en variables de entorno del hosting (nunca en el navegador).
//
// Modo A (recomendado) · API v2 de GoHighLevel con Private Integration Token:
//   GHL_PRIVATE_TOKEN, GHL_LOCATION_ID
//   opcional: GHL_PIPELINE_ID + GHL_STAGE_ID  → crea una oportunidad en el pipeline
// Modo B · Webhook entrante de un Workflow de GoHighLevel:
//   GHL_WEBHOOK_URL
// Sin ninguna variable → responde 503 y el formulario ofrece WhatsApp/correo (no se simula el envío).
//
// Opcional: ALLOWED_ORIGIN (p. ej. https://www.abogadobrett.com)

const GHL = 'https://services.leadconnectorhq.com';
const SERVICES = ['ciudadania', 'matrimonio', 'mentoria', 'migracion', 'documentos', 'otro'];

const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

const clean = (v, max = 200) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);

function validate(b) {
  const errors = [];
  if (!SERVICES.includes(b.service)) errors.push('service');
  if (!clean(b.first_name)) errors.push('first_name');
  if (!clean(b.last_name)) errors.push('last_name');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(clean(b.email))) errors.push('email');
  const digits = clean(b.phone).replace(/\D/g, '');
  if (digits.length < 8 || digits.length > 15) errors.push('phone');
  if (!b.consent || b.consent.privacy !== true) errors.push('consent');
  return errors;
}

function normalize(b) {
  const answers = {};
  for (const [k, v] of Object.entries(b.answers || {}).slice(0, 12)) answers[clean(k, 160)] = clean(v, 200);
  const src = b.source || {};
  const source = {};
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'referrer', 'landing', 'in_app', 'gclid', 'fbclid']) if (src[k]) source[k] = clean(src[k], 200);
  let phone = clean(b.phone, 24).replace(/[^\d+]/g, '');
  if (phone.startsWith('00')) phone = '+' + phone.slice(2);
  return {
    service: b.service,
    service_name: clean(b.service_name, 80),
    first_name: clean(b.first_name, 60),
    last_name: clean(b.last_name, 60),
    email: clean(b.email, 120).toLowerCase(),
    phone,
    country: clean(b.country, 60),
    preferred_channel: clean(b.preferred_channel, 30),
    heard_from: clean(b.heard_from, 30),
    message: clean(b.message, 1200),
    answers,
    consent: { privacy: true, marketing: b.consent.marketing === true, text_version: clean(b.consent.text_version, 20), at: new Date().toISOString() },
    source,
    page: clean(b.page, 120),
  };
}

const tagsFor = (l) => [
  'web-lead',
  `servicio-${l.service}`,
  l.source.utm_source ? `fuente-${l.source.utm_source.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` : 'fuente-directo',
  l.consent.marketing ? 'acepta-novedades' : null,
].filter(Boolean);

const noteFor = (l) => [
  `Solicitud web · ${l.service_name}`,
  `País: ${l.country} · Canal preferido: ${l.preferred_channel}${l.heard_from ? ` · Nos conoció por: ${l.heard_from}` : ''}`,
  '',
  ...Object.entries(l.answers).map(([q, a]) => `• ${q}: ${a}`),
  l.message ? `\nMensaje: ${l.message}` : '',
  `\nOrigen: ${JSON.stringify(l.source)} · Página: ${l.page}`,
  `Consentimiento privacidad: sí (${l.consent.text_version}, ${l.consent.at}) · Novedades: ${l.consent.marketing ? 'sí' : 'no'}`,
].join('\n');

async function ghlApi(l, env) {
  const headers = { Authorization: `Bearer ${env.GHL_PRIVATE_TOKEN}`, Version: '2021-07-28', 'Content-Type': 'application/json', Accept: 'application/json' };
  const up = await fetch(`${GHL}/contacts/upsert`, {
    method: 'POST', headers,
    body: JSON.stringify({
      locationId: env.GHL_LOCATION_ID,
      firstName: l.first_name, lastName: l.last_name, email: l.email, phone: l.phone,
      source: `Web abogadobrett.com · ${l.service_name}`,
      tags: tagsFor(l),
    }),
  });
  if (!up.ok) throw new Error(`upsert ${up.status}: ${(await up.text()).slice(0, 200)}`);
  const contactId = (await up.json())?.contact?.id;
  if (!contactId) throw new Error('upsert sin contact.id');

  const tasks = [fetch(`${GHL}/contacts/${contactId}/notes`, { method: 'POST', headers, body: JSON.stringify({ body: noteFor(l) }) })];
  if (env.GHL_PIPELINE_ID && env.GHL_STAGE_ID) {
    tasks.push(fetch(`${GHL}/opportunities/`, {
      method: 'POST', headers,
      body: JSON.stringify({
        locationId: env.GHL_LOCATION_ID, pipelineId: env.GHL_PIPELINE_ID, pipelineStageId: env.GHL_STAGE_ID,
        name: `${l.first_name} ${l.last_name} · ${l.service_name}`, status: 'open', contactId, source: l.source.utm_source || 'web',
      }),
    }));
  }
  const res = await Promise.allSettled(tasks);
  res.forEach((r, i) => { if (r.status === 'rejected' || !r.value.ok) console.error('GHL tarea secundaria falló', i, r.reason || r.value.status); });
  return contactId;
}

async function ghlWebhook(l, env) {
  const r = await fetch(env.GHL_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...l, tags: tagsFor(l).join(','), note: noteFor(l) }) });
  if (!r.ok) throw new Error(`webhook ${r.status}`);
}

export default async (req) => {
  if (req.method !== 'POST') return json(405, { ok: false, error: 'method' });
  const env = process.env;
  const origin = req.headers.get('origin');
  if (env.ALLOWED_ORIGIN && origin && origin !== env.ALLOWED_ORIGIN) return json(403, { ok: false, error: 'origin' });
  if (Number(req.headers.get('content-length') || 0) > 20000) return json(413, { ok: false, error: 'size' });

  let body;
  try { body = await req.json(); } catch { return json(400, { ok: false, error: 'json' }); }
  if (body.hp) return json(200, { ok: true }); // honeypot: se descarta en silencio
  const errors = validate(body);
  if (errors.length) return json(422, { ok: false, error: 'validation', fields: errors });

  const lead = normalize(body);
  const useApi = env.GHL_PRIVATE_TOKEN && env.GHL_LOCATION_ID;
  if (!useApi && !env.GHL_WEBHOOK_URL) return json(503, { ok: false, error: 'crm_not_configured' });

  try {
    if (useApi) await ghlApi(lead, env); else await ghlWebhook(lead, env);
    return json(200, { ok: true });
  } catch (e) {
    console.error('Error registrando lead en GoHighLevel:', e.message);
    return json(502, { ok: false, error: 'crm_error' });
  }
};

export const config = { path: '/api/lead' };
