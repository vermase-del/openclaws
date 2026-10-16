# Student Hub + TalentLens

A responsive Student Hub experience built on the existing React 18 + Vite application. The original TalentLens candidate and recruiter workspace remains accessible at `/talentlens`.

This repository is being evolved into a multi-module application platform. The current frontend remains **mock-first**; PostgreSQL and Redis are available for local infrastructure experiments, and Spring Boot is the planned backend. The infrastructure containers do not yet provide application APIs or persist the UI's demo workflows.

## Current frontend

- React 18 + Vite 5
- Responsive navigation and page shell
- Learning resources, mentorship discovery, classes, jobs, announcements, saved items, and profile preview
- Location-wise skill registry with skill, city, and proficiency filters
- Opportunity board with location/type filters, skill tags, interest tracking, and a demo listing form
- Direct-message inbox with seeded conversations, message composer, and profile/opportunity entry points
- AI Prompt Guide with eight fixed areas, 16 reusable templates, search/filter, editable prompt builder, clipboard copy, and saved prompts
- Summer Jobs page focused on earning while learning, with student-friendly role listings, pay/hours/duration transparency, location/work-mode filters, saved roles, demo application tracking, and an employer role-submission form
- Global search / command palette (`Ctrl+K` or `⌘K`)
- Demo saved items stored in localStorage
- JSDoc domain contracts prepared for incremental TypeScript migration

## Run the frontend locally

Requirements: Node.js 20+ and npm.

```bash
npm ci
npm run dev
```

Vite prints the local URL when it starts. Build the production frontend with:

```bash
npm run build
```

## Optional local infrastructure

Docker Engine/Desktop with Docker Compose is needed only if you want local PostgreSQL and Redis containers.

```bash
cp .env.example .env
docker compose up -d
docker compose ps
```

Stop containers with `docker compose down`. This retains named volumes. Use `docker compose down -v` only when you intend to delete local database and cache data. The sample credentials are for local development only; do not expose these ports to untrusted networks or reuse the credentials elsewhere.

## Routes

- `/dashboard`
- `/learning` and `/learning/:courseId` (detail preview currently opens in a modal)
- `/mentorship`, `/coaching/book`
- `/classes`, `/classes/:id`
- `/jobs`, `/jobs/:id`
- `/skill-registry` (also `/skills`)
- `/opportunities`
- `/messages` and `/messages/:profileId`
- `/ai-prompts` (also `/ai-guide`)
- `/summer-jobs` (also `/earn-while-you-learn`)
- `/community`
- `/saved`, `/profile`
- `/talentlens` — existing TalentLens / MEGACLAW experience

Routing currently uses a lightweight History API implementation to avoid changing the existing dependency lockfile during the first safe refactoring pass. A dedicated router, TypeScript migration, test runner, backend APIs, and real authentication should be introduced as separate validated steps.

## Demo and security notes

This iteration uses mock data. Role switching is a UI preview only; it does not grant or enforce permissions. Booking and job application buttons are previews and do not submit transactions. Seeded organizations, roles, pay ranges, profiles, and opportunities are examples, not verified real vacancies. Demo applications, messages, saved prompts, and employer-submitted listings remain in the current browser and are not shared with other users. Do not store sensitive information in localStorage or enter confidential data into prompts intended for external AI services.

Before production, implement employer identity verification and moderation, lawful age/eligibility checks, privacy and anti-scam reporting, authenticated profile ownership and visibility consent, server-side publication/application workflows, and secure messaging APIs with authorization, abuse reporting, rate limits, notifications, and retention controls. Do not present a submitted listing as public until it has passed review.

## Architecture and roadmap

- **Frontend:** React 18 + Vite 5; incremental TypeScript migration is planned.
- **Data:** mock-first until backend contracts and persistence are implemented.
- **Local infrastructure:** PostgreSQL 16 for durable data and optional Redis 7 for transient cache/coordination.
- **Backend target:** Spring Boot modular monolith with versioned APIs, migrations, authentication/authorization, and tests. No Spring Boot application service is implemented by this change.
- **CI:** install dependencies and validate the Vite production build.

See [Architecture Overview](docs/architecture/overview.md), [API Conventions](docs/api/README.md), [Local Development Runbook](docs/operations/local-development.md), and [Roadmap](docs/roadmap.md).
