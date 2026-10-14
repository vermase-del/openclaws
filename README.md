# Student Hub + TalentLens

A responsive Student Hub experience built on the existing React 18 + Vite application. The original TalentLens candidate and recruiter workspace remains accessible at `/talentlens`.

## Current foundation

- React 18 + Vite 5
- Responsive navigation and page shell
- Learning resources, mentorship discovery, classes, jobs, announcements, saved items, and profile preview
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
- `/community`
- `/saved`, `/profile`
- `/talentlens` — existing TalentLens / MEGACLAW experience

The current routing is a lightweight History API implementation to avoid changing the existing dependency lockfile during the first safe refactoring pass. A dedicated router, TypeScript migration, test runner, backend APIs, and real authentication should be introduced as separate validated steps.

## Demo and security notes

This iteration uses mock data. Role switching is a UI preview only; it does not grant or enforce permissions. Booking and job application buttons are intentionally marked as previews and do not submit transactions. Do not store sensitive information in localStorage.

## Next steps

1. Add React Router and TypeScript with a regenerated lockfile.
2. Add unit/component tests and Playwright smoke tests.
3. Add Spring Boot API contracts, PostgreSQL migrations, authentication, and server-enforced RBAC.
4. Add CI quality gates and repository hygiene rules.
