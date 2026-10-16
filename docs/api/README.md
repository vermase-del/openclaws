# API Conventions

## Base path
All application APIs use `/api/v1`. Breaking contracts require a new version.

## Health check
`GET /api/v1/health`

Example response:
```json
{
  "status": "ok",
  "service": "megaclaw-api",
  "version": "v1",
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```
This indicates the HTTP process responds; it does not prove database, cache, identity, or downstream connectivity.

## Error envelope
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "The requested API route was not found."
  }
}
```
Never return access tokens, secrets, database details, stack traces, or unnecessary candidate personal information.

## Business route conventions
- Use nouns for resources and HTTP verbs for operations.
- Validate payloads and reject invalid fields.
- Use suitable HTTP status codes; use `201 Created` for new resources.
- Paginate list endpoints and cap page size.
- Use stable identifiers and ISO-8601 UTC timestamps.
- Add authentication, tenant scoping, role checks, idempotency where needed, and audit logging before business APIs are exposed.
