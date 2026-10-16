# Local Development Runbook

## Prerequisites
- Node.js 20+ and npm
- Docker Engine / Docker Desktop with Compose

## First run
1. Copy `.env.example` to `.env` and change local passwords if needed.
2. Install dependencies with `npm ci`.
3. Start databases with `docker compose up -d`.
4. Start the UI using `npm run dev`.
5. Start the API in another terminal using `npm run api:dev`.
6. Check `http://localhost:4000/api/v1/health`.

## Validation
- `npm run build`: compile the web app.
- `npm run api:check`: verify health and unknown-route behavior.
- `npm run check`: run both checks.
- `docker compose ps`: inspect infrastructure health.

## Stop
Run `docker compose down` to stop services; volumes remain. Use `docker compose down -v` only if you intend to delete all local database/cache data.

## Troubleshooting
- If ports 3000, 4000, 5432, or 6379 are in use, change the related setting or stop the conflicting process.
- Inspect database logs with `docker compose logs postgres` or `docker compose logs redis`.
- For API issues, check `API_HOST`, `API_PORT`, and process output.
- Compose credentials are for local development only. Do not expose these ports to untrusted networks or reuse local credentials in shared environments.
