import http from 'node:http';

const host = process.env.API_HOST || '127.0.0.1';
const port = Number.parseInt(process.env.API_PORT || '4000', 10);
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('API_PORT must be an integer between 1 and 65535');
}

const server = http.createServer((req, res) => {
  const origin = req.headers.origin;
  if (origin && origin === allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'GET' && req.url === '/api/v1/health') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ status: 'ok', service: 'megaclaw-api', version: 'v1', timestamp: new Date().toISOString() }));
    return;
  }
  if (req.method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' });
    res.end();
    return;
  }
  res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ error: { code: 'NOT_FOUND', message: 'The requested API route was not found.' } }));
});

server.listen(port, host, () => console.log(`Megaclaw API starter listening at http://${host}:${port}`));
const shutdown = (signal) => {
  console.log(`Received ${signal}; closing HTTP server.`);
  server.close((error) => {
    if (error) { console.error(error); process.exitCode = 1; }
  });
};
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
