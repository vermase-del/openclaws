# Student Hub + TalentLens Platform Roadmap

This roadmap separates the validated frontend foundation from future backend work. A checked item means the capability is present in the current repository branch; it does not imply production readiness.

## Current foundation

- [x] React 18 + Vite frontend with Student Hub experiences.
- [x] Preserve existing TalentLens experience at `/talentlens`.
- [x] Mock-first UI and browser-local demo workflows.
- [x] Optional PostgreSQL 16 and Redis 7 local Compose services.
- [x] Frontend CI workflow using `npm ci` and `npm run build`.
- [ ] Automated frontend unit/component and browser smoke tests (planned).

## Next delivery slices

### 1. Frontend quality and contracts

- Add a test runner and unit/component tests for navigation, filters, forms, and saved/demo workflows.
- Add Playwright smoke coverage for critical routes and responsive layouts.
- Migrate JavaScript to TypeScript incrementally, beginning with domain contracts and shared components.
- Introduce a dedicated router only as a separately validated change.
- Define typed API/service interfaces while retaining mock implementations for development.

### 2. Spring Boot backend foundation

- Create a Spring Boot application with environment-based configuration and versioned `/api/v1` routes.
- Add liveness/readiness checks and consistent error/validation handling.
- Establish controller, service/domain, repository, and DTO boundaries.
- Add PostgreSQL migrations, connection pooling, repository tests, and integration-test database coverage.
- Keep Redis optional and limited to transient cache/coordination.

### 3. Identity, authorization, and privacy

- Select and document the identity provider and sign-in flow.
- Define user, role, permission, and membership models; add tenant scoping if required by deployment.
- Enforce authorization on the server for every protected business route.
- Define profile visibility, consent, retention, abuse reporting, and audit requirements.
- Avoid logging sensitive student/candidate data and do not treat frontend role switching as access control.

### 4. Incremental module APIs

- Define contracts for Student Hub profiles, skills, learning, mentorship, opportunities, and applications.
- Define TalentLens candidate, resume metadata, screening, and recruiter workflows.
- Replace browser-only persistence with API-backed workflows using reviewed migration and compatibility plans.
- Add validation, pagination, upload constraints, moderation, and negative authorization tests.
- Preserve mock mode until each API-backed workflow is validated.

### 5. Operational readiness

- Structured logs, request IDs, metrics, and traces.
- Backup/restore drills, migration policy, and incident runbooks.
- Dependency and security scanning, secret management, and deployment workflow.
- Document rollback and ownership before production rollout.

## Production exit criteria

Do not call the platform production-ready until critical flows are tested and reviewed authentication/authorization, privacy controls, tenant isolation where applicable, migration and backup/restore practices, observability, dependency/security scanning, rollback, and incident ownership are in place.
