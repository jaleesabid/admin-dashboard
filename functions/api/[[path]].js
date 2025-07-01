export async function onRequest({ request, params, env }) {
  const BASE = env.MELIVECODE_BASE || 'https://melivecode.com/api';
  const upstream = `${BASE}/${params.path || ''}${new URL(request.url).search}`;

  // ✅ 1. Handle pre‑flight early
  if (request.method === 'OPTIONS') {
    const reqHeaders = request.headers.get('Access-Control-Request-Headers') || '*';
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': reqHeaders,
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  // ✅ 2. Forward the real request
  const init = {
    method: request.method,
    headers: Object.fromEntries(request.headers),
    body: ['GET', 'HEAD'].includes(request.method) ? null : await request.arrayBuffer(),
  };

  const resp = await fetch(upstream, init);

  // ✅ 3. Pipe response + CORS
  const out = new Response(resp.body, resp);
  out.headers.set('Access-Control-Allow-Origin', '*');
  out.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  out.headers.set('Access-Control-Allow-Headers', '*');
  return out;
}
