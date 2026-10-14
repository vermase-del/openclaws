# Student Hub + TalentLens

A responsive Student Hub experience built on the existing React 18 + Vite application. The original TalentLens candidate and recruiter workspace remains accessible at `/talentlens`.

## Current foundation

- React 18 + Vite 5
- Responsive navigation and page shell
- Learning resources, mentorship discovery, classes, jobs, announcements, saved items, and profile preview
- Location-wise skill registry with skill, city, and proficiency filters
- Opportunity board with location/type filters, skill tags, interest tracking, and a demo listing form
- Direct-message inbox with seeded conversations, message composer, and profile/opportunity entry points
- Global search / command palette (`Ctrl+K` or `⌘K`)
- Demo saved items stored in localStorage
- JSDoc domain contracts prepared for migration to TypeScript

## Run locally

```bash
npm install
npm run dev
```

## Routes

- `/dashboard`
- `/learning` and `/learning/:courseId` (detail preview currently opens in a modal)
- `/mentorship`, `/coaching/book`
- `/classes`, `/classes/:id`
- `/jobs`, `/jobs/:id`
- `/skill-registry` (also `/skills`)
- `/opportunities`
- `/messages` and `/messages/:profileId`
- `/community`
- `/saved`, `/profile`
- `/talentlens` — existing TalentLens / MEGACLAW experience

The current routing is a lightweight History API implementation to avoid changing the existing dependency lockfile during the first safe refactoring pass. A dedicated router, TypeScript migration, test runner, backend APIs, and real authentication should be introduced as separate validated steps.

## Registry, opportunities, and messaging

The first pass uses seeded demo profiles and opportunity listings to demonstrate location-aware discovery. Skill and opportunity filters run in the browser. New opportunity listings, expressions of interest, and sample messages are stored in browser localStorage for the current demo only; they are not shared with other users and are not submitted to an employer. Messaging entry points from profiles and opportunities open a local inbox conversation.

Before production, implement authenticated profile ownership and visibility consent, location normalization, profile verification/moderation, server-side opportunity publishing and application state, and secure messaging APIs with authorization, abuse reporting, rate limits, notifications, and retention controls. Avoid storing sensitive messages in localStorage.

## Demo and security notes

This iteration uses mock data. Role switching is a UI preview only; it does not grant or enforce permissions. Booking and job application buttons are intentionally marked as previews and do not submit transactions. Do not store sensitive information in localStorage.

## Next steps

1. Add React Router and TypeScript with a regenerated lockfile.
2. Add unit/component tests and Playwright smoke tests.
3. Add Spring Boot API contracts, PostgreSQL migrations, authentication, and server-enforced RBAC.
4. Add CI quality gates and repository hygiene rules.
