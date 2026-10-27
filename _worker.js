// Calendario privado para Google Calendar: /calendario.ics?t=CÓDIGO
// Reenvía la petición a la función de Supabase con la clave pública (anon), que ya es pública en la web.
const FN = "https://unzxfeslkayfcpfhpjuq.supabase.co/functions/v1/calendario-ics";
const ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuenhmZXNsa2F5ZmNwZmhwanVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwODcyOTAsImV4cCI6MjEwNzY2MzI5MH0.LSaZeN8krcSlEYD3Ll_s2GdKrY2XS1smpUv7BcMzEXE";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export default {
  async fetch(req, env) {
    const u = new URL(req.url);
    if (u.pathname === "/calendario.ics") {
      const t = u.searchParams.get("t") || "";
      if (!UUID_RE.test(t)) return new Response("Enlace no válido", { status: 404 });
      const r = await fetch(FN + "?t=" + t, { headers: { Authorization: "Bearer " + ANON, apikey: ANON } });
      return new Response(r.body, { status: r.status, headers: {
        "Content-Type": r.headers.get("Content-Type") || "text/plain; charset=utf-8",
        "Content-Disposition": 'inline; filename="citas-sueno-profundo.ics"',
        "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });
    }
    return env.ASSETS.fetch(req);
  },
};
