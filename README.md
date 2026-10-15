# Megaclaw Platform

Megaclaw is a multi-application platform shell with a shared UI and a path toward independently deployable, secure modules.

## Current application
The current React + Vite app includes candidate intake, recruiter review, and navigation placeholders. Existing UI is retained while the platform foundation is built additively.

## Stack
- Web: React 18, Vite 5, lucide-react
- Local infrastructure: PostgreSQL 16 and Redis 7 via Docker Compose
- API starter: Node.js HTTP server using built-in modules
- CI: GitHub Actions build and API smoke check

The API and infrastructure are starters, not production-ready identity, persistence, or cache integrations.

## Quick start
Requirements: Node.js 20+, npm, and Docker Compose for infrastructure.

```bash
npm ci
npm run dev
```

Vite runs at `http://localhost:3000`.

In another terminal:

```bash
npm run api:dev
```

Health endpoint: `http://localhost:4000/api/v1/health`.

For local databases, copy `.env.example` to `.env`, then run `docker compose up -d`. PostgreSQL uses port 5432 and Redis port 6379 by default. Do not commit real secrets or expose development ports to untrusted networks.

Run checks:

```bash
npm run build
npm run api:check
npm run check
```

## Repository map
```text
.github/workflows/   CI
 docs/                architecture, API and operations docs
 infra/               local development infrastructure
 scripts/             validation scripts
 server/              lightweight API starter
 src/                 existing React application
 docker-compose.yml
 .env.example
```

## Architecture principles
1. Preserve existing modules; add capabilities through bounded folders and explicit interfaces.
2. Use versioned HTTP contracts between browser and backend.
3. PostgreSQL is the durable source of truth; Redis is only for ephemeral cache/coordination.
4. Add authentication, authorization, tenant boundaries, validation, and auditing before business APIs are exposed.
5. Keep secrets out of source control and avoid logging candidate personal information.
6. Do not claim production readiness before persistence, migrations, identity, observability, backup/restore, deployment hardening, and tests are implemented.

## Roadmap
- [x] Retain the current React/Vite module shell.
- [x] Add repository docs and environment template.
- [x] Add PostgreSQL/Redis Compose services.
- [x] Add API health endpoint and smoke test.
- [x] Add CI web build and API check.
- [ ] Add migrations and database access layer.
- [ ] Move candidate data from browser storage to API-backed persistence.
- [ ] Add identity, RBAC, tenant isolation, and audit events.
- [ ] Add integration tests, observability, backups, deployment runbooks.

See `docs/architecture/overview.md` and `docs/roadmap.md`.
