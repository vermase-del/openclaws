import { spawn } from 'node:child_process';
import process from 'node:process';

const port = 4107;
const url = `http://127.0.0.1:${port}/api/v1/health`;
const child = spawn(process.execPath, ['server/health-server.mjs'], {
  env: { ...process.env, API_HOST: '127.0.0.1', API_PORT: String(port) },
  stdio: ['ignore', 'pipe', 'pipe']
});
let logs = '';
child.stdout.on('data', (chunk) => { logs += chunk.toString(); });
child.stderr.on('data', (chunk) => { logs += chunk.toString(); });
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

try {
  let response;
  for (let attempt = 0; attempt < 30; attempt += 1) {
    if (child.exitCode !== null) throw new Error(`API exited early.\n${logs}`);
    try { response = await fetch(url); break; } catch { await sleep(100); }
  }
  if (!response) throw new Error(`API did not become ready.\n${logs}`);
  if (response.status !== 200) throw new Error(`Unexpected HTTP status: ${response.status}`);
  const body = await response.json();
  if (body.status !== 'ok' || body.service !== 'megaclaw-api' || body.version !== 'v1') {
    throw new Error(`Unexpected health response: ${JSON.stringify(body)}`);
  }
  const missing = await fetch(`http://127.0.0.1:${port}/api/v1/missing`);
  if (missing.status !== 404) throw new Error(`Unknown route should return 404, got ${missing.status}`);
  console.log('API smoke check passed: health route and unknown-route handling.');
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  child.kill('SIGTERM');
  await sleep(100);
}
