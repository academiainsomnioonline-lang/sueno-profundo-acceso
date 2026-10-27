// Service worker de Sueño Profundo.
// Guarda SOLO la parte fija de la app (páginas, código e iconos) para que abra rápido y aunque el servidor
// principal no responda (p. ej. bloqueos de IPs en días de fútbol). Nunca guarda datos clínicos:
// las peticiones a la base de datos (otro dominio) van siempre directas a la red.
const V = 'aoi-202610271851';
const RESERVA = '';
const FIJOS = ['/lib/supabase.min.js', '/icon-192.png'];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(V).then(c => c.addAll(FIJOS)).catch(() => {})); });
self.addEventListener('activate', e => e.waitUntil((async () => {
  for (const k of await caches.keys()) if (k !== V) await caches.delete(k);
  await self.clients.claim();
})()));
function aviso() {
  const enlace = RESERVA ? `<p style="margin:22px 0 0"><a href="${RESERVA}" style="display:inline-block;background:#D4AF37;color:#2B2118;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:600">Entrar por el acceso de reserva</a></p>` : '';
  return new Response(`<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sueño Profundo</title><body style="font-family:Inter,system-ui,sans-serif;background:#FFFDF8;color:#24211D;padding:48px 22px;text-align:center;line-height:1.5"><h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:28px;margin:0 0 10px">No conseguimos conectar</h1><p style="margin:0;max-width:420px;display:inline-block">Puede ser tu conexión o un bloqueo puntual de tu operadora (pasa algunos días de partido de fútbol). Tus datos están a salvo.</p>${enlace}<p style="margin:18px 0 0"><a href="" onclick="location.reload();return false" style="color:#9A7A3C">Volver a intentarlo</a></p></body>`, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
const conTiempo = (p, ms) => Promise.race([p, new Promise((_, ko) => setTimeout(() => ko(new Error('lento')), ms))]);
self.addEventListener('fetch', e => {
  const req = e.request; const u = new URL(req.url);
  if (req.method !== 'GET' || u.origin !== location.origin) return;           // base de datos y CDNs: directo
  if (u.pathname === '/calendario.ics' || u.pathname === '/sw.js') return;
  if (req.mode === 'navigate') {                                              // páginas: red primero; si tarda o falla, la copia guardada
    e.respondWith((async () => {
      const c = await caches.open(V);
      const clave = u.origin + u.pathname.replace(/\.html$/, '').replace(/\/index$/, '/');
      const red = fetch(req).then(r => { if (r.ok && r.type === 'basic') c.put(clave, r.clone()); return r; });
      try { return await conTiempo(red, 3500); }
      catch (err) {
        const g = await c.match(clave);
        if (g) { e.waitUntil(red.catch(() => {})); return g; }
        try { return await red; } catch (e2) { return aviso(); }
      }
    })());
    return;
  }
  if (/^\/(lib\/|icon-|apple-touch-icon|manifest-)/.test(u.pathname) || u.pathname === '/demo-sb.js') {   // código e iconos: copia guardada y se refresca por detrás
    e.respondWith((async () => {
      const c = await caches.open(V); const g = await c.match(req);
      const red = fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; });
      if (g) { e.waitUntil(red.catch(() => {})); return g; }
      return red;
    })());
  }
});
