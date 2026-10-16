# API Conventions

## Implementation status

The frontend currently uses mock data and browser-local demo state. This document defines conventions for the **planned Spring Boot backend**; it does not describe a production API that exists today. No Node.js application API is part of the approved target architecture.

## Base path and versioning

New application APIs should use `/api/v1`. Breaking contract changes require a new version or an explicitly versioned migration plan. Keep controller endpoints thin and put business rules in service/domain layers.

## Health and readiness

The future Spring Boot service should expose a liveness endpoint and a readiness endpoint. Readiness should report whether required dependencies are available, use bounded timeouts, and avoid returning credentials, connection strings, or user data. Do not treat a process-only health response as proof that persistence or other dependencies are healthy.

## Error envelope

Use a stable, machine-readable error structure, for example:

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "The requested resource was not found.",
    "requestId": "optional-correlation-id"
  }
}
```

Never return access tokens, secrets, database details, stack traces, or unnecessary student/candidate personal information. Map validation failures to useful field-level messages without exposing internal implementation details.

## Business route conventions

- Use nouns for resources and HTTP verbs for operations.
- Validate request payloads and reject invalid fields.
- Use suitable HTTP status codes; use `201 Created` for newly created resources.
- Paginate list endpoints and enforce a maximum page size.
- Use stable identifiers and ISO-8601 UTC timestamps.
- Define explicit request/response DTOs; do not expose persistence entities directly.
- Add authentication, authorization, tenant scoping where applicable, idempotency where needed, and audit logging before business routes are exposed.
- Document contracts and test success, validation, authorization, and failure cases.

## Spring Boot implementation direction

Use Spring Boot controllers, service/domain components, repository adapters, centralized validation/error handling, and managed configuration. Use PostgreSQL migrations as the source of schema evolution. Redis, if adopted, is for transient cache/coordination and must not become the source of truth. API contracts and database persistence should be added incrementally after the mock-first UI is validated.
