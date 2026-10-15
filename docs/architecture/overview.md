# Architecture Overview

## Current state

The repository's current application is a React 18 single-page frontend built with Vite. Student Hub includes learning, mentorship, classes, jobs, skill discovery, opportunities, messages, prompt templates, and saved/profile experiences. The existing TalentLens / MEGACLAW experience remains accessible at `/talentlens`.

The frontend is **mock-first**. Seeded examples and browser-local state demonstrate user journeys but are not shared multi-user data or server-enforced workflows. The routing is a lightweight History API implementation. The frontend does not connect directly to PostgreSQL or Redis.

## Local infrastructure

Docker Compose provides optional local PostgreSQL 16 and Redis 7 services. PostgreSQL is intended as the durable source of truth when backend persistence is introduced. Redis is reserved for transient cache/coordination. The services are local development dependencies only; they do not currently connect to the frontend or implement business APIs.

## Target logical architecture

```text
Browser
  └── React + Vite application
        └── Versioned API client (/api/v1)
              └── Spring Boot modular monolith (planned)
                    ├── Platform Core: configuration, health, identity/RBAC
                    ├── Student Hub: profile, skills, learning, career
                    ├── TalentLens: candidate and recruiter workflows
                    ├── Community and mentorship
                    ├── Opportunities and applications
                    ├── Audit and notification events
                    └── Persistence adapters
                          ├── PostgreSQL (durable source of truth)
                          └── Redis (optional transient cache/coordination)
```

The Spring Boot service, API client integration, persistence adapters, migrations, identity, and server-side authorization are **planned, not implemented by this foundation change**.

## Boundary rules

1. UI components must not connect directly to PostgreSQL or Redis.
2. Domain modules expose explicit API contracts and avoid depending on other modules' internal tables.
3. PostgreSQL owns durable business data; Redis is for transient derived data only.
4. All business writes require authentication, authorization, validation, and audit events before production exposure.
5. API errors use stable machine-readable codes and must not leak stack traces or secrets.
6. Configuration comes from environment variables; never commit secrets.
7. Health/readiness checks must not expose credentials or customer data.
8. Keep the mock-first mode usable while API integrations are introduced behind explicit service interfaces.

## Recommended module boundaries

- **Platform Core:** configuration, health/readiness, identity, RBAC, tenant context, audit trail.
- **Student Hub:** student profile, skills, learning, career paths, mentorship.
- **TalentLens:** candidate intake, resume metadata, screening, recruiter workflows.
- **Community:** connections, mentorship groups, community activity.
- **Opportunities:** internships, jobs, applications and moderation.
- **Analytics:** authorized aggregate reporting and operational metrics.
- **Shared Services:** notifications, files/object storage, workflow and integration adapters.

Start as a Spring Boot modular monolith with clear module boundaries. Extract deployable services only when scale, ownership, or reliability requirements justify the operational cost.
