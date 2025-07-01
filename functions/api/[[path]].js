// Set MELIVECODE_BASE as a Pages env variable (Settings → Functions → Env vars)
const MELIVECODE = MELIVECODE_BASE || 'https://melivecode.com/api';

export async function onRequest(context) {
  const { request, params } = context;
  const url = new URL(request.url);

  // Build the upstream URL: MELIVECODE + /<captured path> + ?query
  const upstream = `${MELIVECODE}/${params.path || ''}${url.search}`;

  // Clone method, headers, and body for POST/PUT/PATCH
  const init = {
    method: request.method,
    headers: { accept: 'application/json', ...Object.fromEntries(request.headers) },
    body: ['GET', 'HEAD'].includes(request.method) ? null : await request.arrayBuffer(),
  };

  const resp = await fetch(upstream, init);

  // Copy response and inject CORS
  const resHeaders = new Headers(resp.headers);
  resHeaders.set('Access-Control-Allow-Origin', '*');
  resHeaders.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  resHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // For pre‑flight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: resHeaders });
  }

  return new Response(resp.body, { status: resp.status, headers: resHeaders });
}
