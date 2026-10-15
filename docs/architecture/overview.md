# Architecture Overview

## Current state
The UI is a React 18 single-page application built with Vite. Existing features center on candidate intake and recruiter review, with navigation placeholders for future modules. Candidate data currently uses browser storage and mock data; this is prototype behavior, not a shared multi-user persistence model.

This foundation adds a versioned HTTP health endpoint, local PostgreSQL/Redis services, documented contracts, environment settings, and CI validation. The target layers below are directional and are not all implemented today.

## Target logical architecture
```text
Browser
  └── React app / module shells
        └── Versioned API client (/api/v1)
              └── API service
                    ├── Identity and tenant context
                    ├── Domain modules
                    ├── Audit and notification events
                    └── Persistence adapters
                          ├── PostgreSQL (source of truth)
                          └── Redis (ephemeral cache / coordination)
```

## Boundary rules
1. UI components must not connect directly to PostgreSQL or Redis.
2. Domain modules expose explicit API contracts and avoid depending on other modules' internal tables.
3. PostgreSQL owns durable business data; Redis is for transient derived data only.
4. All business writes require authentication, tenant authorization, validation, and audit events before production exposure.
5. API errors use stable machine-readable codes and must not leak stack traces or secrets.
6. Configuration comes from environment variables; never commit secrets.
7. Health checks must not expose credentials or customer data.

## Recommended module boundaries
- **Platform Core:** configuration, health/readiness, identity, RBAC, tenant context, audit trail.
- **Talent:** candidate intake, resume metadata, screening, recruiter workflows.
- **Career Hub:** student profile, skills, courses, and career paths.
- **Community:** connections, mentorship, and groups.
- **Opportunities:** internships, jobs, application tracking.
- **Analytics:** authorized aggregate reporting and operational metrics.
- **Shared Services:** notifications, files/object storage, workflow and integration adapters.

Start as a modular monolith with clear boundaries. Extract deployable services only when scale, ownership, or reliability requirements justify the operational cost.
