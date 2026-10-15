# Local Development Runbook

## Prerequisites

- Node.js 20+ and npm for the frontend.
- Docker Engine/Desktop with Compose only if using local PostgreSQL and Redis.

## Run the frontend

Install dependencies and start Vite:

```bash
npm ci
npm run dev
```

Use the local URL printed by Vite. Build validation is:

```bash
npm run build
```

## Start optional local infrastructure

1. Copy `.env.example` to `.env`.
2. Change the sample local PostgreSQL password if appropriate for your workstation.
3. Start the services:

```bash
docker compose up -d
docker compose ps
docker compose logs postgres
docker compose logs redis
```

PostgreSQL is bound to loopback port 5432 by default and Redis to loopback port 6379. Change the host port variables if either port is already in use. These services are not currently connected to the frontend, and no Spring Boot backend is included in this change.

## Stop and clean up

```bash
docker compose down
```

This stops the services and retains named volumes. Use `docker compose down -v` only if you intentionally want to delete the local PostgreSQL and Redis data.

## Validation and troubleshooting

- `npm ci`: install dependencies from the lockfile.
- `npm run build`: build the frontend for production.
- `docker compose ps`: inspect service and health status.
- `docker compose logs postgres` or `docker compose logs redis`: inspect infrastructure logs.

If ports 5432 or 6379 are occupied, change `POSTGRES_PORT` or `REDIS_PORT` in your local `.env`. Compose credentials are for local development only. Do not expose development ports to untrusted networks or reuse local credentials in shared environments.

## Current limitations

The UI is mock-first and stores some demo state in the browser. The future Spring Boot API, database migrations, database connectivity, authentication, authorization, and backend integration tests are not available yet.
