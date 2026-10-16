# Shared Contracts and Architecture Boundaries

This document defines coordination rules, not a fully finalized domain schema. Any open decision must be proposed and reviewed before implementation depends on it.

## 1. Frontend service boundary

Feature components should not couple directly to fetch/storage details. Use feature-level service interfaces/adapters so mock and API implementations can be swapped without rewriting components.

Conceptual pattern:

```text
Page / Component
  -> Feature service interface
      -> Mock adapter (current development)
      -> HTTP API adapter (introduced per accepted workflow)
```

Requirements:
- Mock adapter remains available for local development and deterministic tests.
- API adapter owns HTTP concerns such as serialization, errors and cancellation.
- Components must represent loading, empty, success, validation and failure states as relevant.
- Never store secrets or sensitive candidate/student data in browser localStorage.
- Do not migrate every feature to live APIs in one large change.

## 2. API conventions to agree

Before backend endpoints are implemented, record an architecture decision for:
- Base path: `/api/v1`.
- JSON request/response conventions.
- Validation error shape and stable machine-readable error codes.
- Authentication mechanism and credential transport.
- Pagination, sorting and filtering conventions.
- Time zone/date-time representation.
- Idempotency requirements for operations such as application submission or booking where duplicate requests matter.
- API compatibility/deprecation policy.
- Request/correlation IDs and safe logging.

Do not treat this document as a license to invent an unreviewed endpoint contract.

## 3. Domain ownership

| Domain | Primary owner | Coordination needed |
|---|---|---|
| User identity, account status, roles | W0 + W7 security owner | Every feature/backend agent |
| Profile and visibility | W3 | W7, W8 |
| Skills and proficiency | W3 | W4, W8 |
| Learning, progress and classes | W3 | W6 |
| Mentorship and booking | W5 | W3, W6, W7 |
| Community and events | W5 | W6, W7 |
| Conversations, messages and notifications | W5 | W6, W7 |
| Employer, opportunity and application | W4 | W3, W6, W7 |
| Candidate, resume metadata, recruiter and screening | W8 | W6, W7 |
| Shared API/error/auth conventions | W0 + W6 + W7 | All feature agents |

A feature owner can propose changes to another domain but cannot silently redefine that domain.

## 4. Persistence rules

- PostgreSQL is the primary system of record for application business data.
- Flyway (or another explicitly approved migration tool) must be the sole agreed migration mechanism.
- Every schema change has an owner, migration, test and rollback/forward-fix note.
- Agents must not edit the same migration file concurrently.
- Redis is optional and must not become the only store for durable business records.
- Browser-local persistence is demo-only and must be documented as such.
- No migration should require deleting user data as an implicit side effect.

## 5. Identity, authorization and privacy

- UI role selectors are demonstrations only and never grant permissions.
- The backend must enforce authorization on every protected operation.
- Check resource ownership and access to each record, not just the broad user role.
- Apply tenant scoping only if the deployment requirements call for multi-tenancy, but make the decision explicitly.
- Define consent, visibility, retention, audit and deletion requirements for student/candidate data.
- Do not log credentials, tokens, resume contents, message bodies or unnecessary personal information.
- Real messaging requires authorization, rate limits, blocking/reporting, moderation and retention controls.
- Resume uploads require file type/size checks, safe storage, access control, retention and deletion rules.
- AI integrations require explicit data-handling decisions, server-side credentials, cost limits and safe failure behavior.

## 6. Shared-file ownership matrix

Default ownership; coordinator can amend before assigning work.

| Shared surface | Owner | Other agents |
|---|---|---|
| `package.json`, lockfile | W0 / explicitly assigned dependency owner | Propose changes only |
| CI workflows | W0 + W1 quality owner | Propose changes only |
| App shell, route mapping | W0 / UI integration owner | Avoid edits without coordination |
| Shared styles/design tokens | W2 | Coordinate before editing |
| Shared components | W2 | Consume via approved interface |
| Common frontend domain contracts | W0 + domain owners | Submit proposals |
| Backend build/configuration | W6 | Coordinate before editing |
| Shared backend API envelope/security config | W6 + W7 | Submit proposals |
| Database migrations | Named schema owner per domain | Never edit the same migration concurrently |
| Docker Compose/env examples | W0 + W6 | Coordinate changes |
| Roadmap and execution pack | W0 | Send completion facts to W0 |

## 7. Contract change proposal template

```text
Contract/domain:
Reason for change:
Current contract:
Proposed contract:
Affected workstreams:
Compatibility/migration impact:
Security/privacy impact:
Tests needed:
Decision owner:
Decision (approved/rejected/deferred):
```
