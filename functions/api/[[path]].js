export async function onRequest({ request, params, env }) {
  const BASE = env.MELIVECODE_BASE || 'https://melivecode.com/api';
  const upstream = `${BASE}/${params.path || ''}${new URL(request.url).search}`;

  const init = {
    method: request.method,
    headers: Object.fromEntries(request.headers),
    body: ['GET', 'HEAD', 'OPTIONS'].includes(request.method)
      ? null
      : await request.arrayBuffer(),
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  const resp = await fetch(upstream, init);
  const out = new Response(resp.body, resp);
  out.headers.set('Access-Control-Allow-Origin', '*');
  out.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  out.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return out;
}
