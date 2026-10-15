# Platform Foundation Roadmap

## Foundation slice
- [x] Retain the React/Vite multi-module shell.
- [x] Add repository docs and environment template.
- [x] Add PostgreSQL/Redis Compose services.
- [x] Add API health endpoint and smoke test.
- [x] Add CI web build and API check.

## Next delivery slices
### 1. Backend structure and persistence
- Adopt a maintained server framework if API scope expands.
- Add PostgreSQL migrations, connection pooling and repository/service boundaries.
- Add integration-test database and migration checks.
- Replace browser-only candidate storage using a data-preserving migration plan.

### 2. Identity and tenancy
- Select identity provider and sign-in flow.
- Define tenant, user, role, permission, and membership models.
- Enforce server-side tenant scoping and authorization on every business route.
- Audit sensitive reads and business mutations.

### 3. Talent module API
- Define candidate, resume metadata, screening result, application and recruiter contracts.
- Add validation, pagination, upload constraints, data-retention rules and tests.
- Keep candidate PII out of logs and use synthetic demo fixtures.

### 4. Operational readiness
- Structured logs, request IDs, metrics and traces.
- Readiness checks with bounded timeouts/retries.
- Backup/restore drills, migration policy and incident runbooks.
- Container image and deployment workflow; manage secrets through the target platform.

## Production exit criteria
Do not call the platform production-ready until tests cover critical flows and there is reviewed authentication/authorization, tenant isolation, data protection, dependency scanning, migration and backup/restore practices, observability, rollback, and incident ownership.
