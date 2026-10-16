# Agent Instructions and Ownership Rules

## Rules for every agent

Copy these rules into each coding agent's system/task prompt.

1. Work only on the assigned workstream and acceptance criteria.
2. Inspect the latest `main`, `README.md`, roadmap, this execution pack, related code, tests and recent PR history before changing files.
3. Report the baseline commit SHA and list existing behavior you must preserve.
4. Propose the exact file manifest, implementation plan, dependencies and tests before substantial changes.
5. Use a dedicated branch/worktree from the approved baseline. Never commit directly to `main`.
6. Do not merge PRs. Push the branch and open a draft PR or provide the branch/commit for coordinator review.
7. Do not edit files assigned to another workstream without coordinator approval.
8. Do not modify package manifests/lockfiles, CI, routing, shared styles, Compose, global config or common schemas unless that ownership is explicitly assigned.
9. Do not create duplicate shared types/components or invent API contracts independently. Propose changes to the shared-contract owner.
10. Keep current mock-first behavior functional. Do not imply localStorage data is shared or server-persisted.
11. Preserve `/talentlens` and existing Student Hub routes.
12. Add tests and update documentation. Run the real commands and report actual results, including failures.
13. Do not claim production readiness based only on a build.
14. Do not include secrets, credentials, real personal data, or sensitive sample data in code or logs.
15. At completion report changed files, design decisions, tests/build/CI evidence, limitations, PR URL, and integration risks.

## Role A — Frontend quality

Mission: improve automated coverage and quality gates without changing product behavior.

Owns (unless coordinator reallocates):
- `tests/**`
- browser-test configuration and fixtures
- narrowly scoped CI test-step changes, coordinated with the CI owner
- test documentation

Must not independently:
- refactor application routing
- redesign shared UI
- change package versions without approval
- rewrite product modules to make tests easier

Acceptance:
- stable component/browser tests cover selected critical routes and workflows
- `/talentlens` has a smoke test
- test and build failures are surfaced correctly in CI
- dependency additions are justified and documented

## Role B — UI system

Mission: establish reusable, accessible UI patterns while preserving existing page behavior.

Owns:
- new shared design-system files/components in an agreed directory
- shared tokens/styles only after confirming ownership with coordinator
- UI component examples and relevant component tests

Must not independently:
- change business domain contracts
- change routing architecture
- alter package manifests/lockfiles or global app shell without approval
- perform a full-page redesign in unrelated modules

Acceptance:
- reusable components cover agreed primitives and states
- keyboard/focus/contrast/responsive behavior is verified
- existing screens and routes still work

## Role C — Student Hub

Mission: define and implement mock-first profile, skills, learning and classes workflows.

Owns:
- Student Hub feature files agreed in its manifest
- feature-specific domain contracts in the agreed domain directory
- feature tests and documentation

Must not independently:
- change shared navigation, router, global styles, API envelope, auth model or database migrations
- add backend calls before the service/API contract is approved
- remove mock mode

Acceptance:
- contracts for profile, skills, learning, progress, classes and saved items are documented
- feature flows have validation and tests
- demo-only behavior is clearly communicated

## Role D — Careers

Mission: define and implement mock-first opportunities, summer jobs and applications workflows.

Owns:
- careers/opportunities/summer-jobs feature files agreed in its manifest
- feature-specific contracts, tests and documentation

Must not independently:
- change shared user/identity contracts or global navigation
- publish real listings or present seeded listings as verified vacancies
- create or alter database migrations without schema-owner approval

Acceptance:
- opportunity, employer, listing, eligibility and application contracts are documented
- form/filter/status behavior is tested
- verification, moderation, anti-scam and eligibility safeguards are specified

## Role E — Collaboration

Mission: specify and implement mock-first mentorship, community, notifications and messaging.

Owns:
- feature files assigned for these modules
- feature-specific contracts/tests/docs

Must not independently:
- implement real message delivery without approved authentication, authorization, abuse controls and retention policy
- change global user/identity contracts or shared navigation
- alter database migrations without schema-owner approval

Acceptance:
- workflows and notification semantics are documented and tested
- browser-local demo behavior is explicit
- abuse reporting, blocking, rate limits, privacy and retention requirements are defined before production messaging

## Role F — Backend foundation

Mission: build a maintainable Spring Boot modular monolith with PostgreSQL and tested API conventions.

Owns:
- agreed backend directory
- backend build files, source, migrations and tests within that directory
- backend setup documentation

Must not independently:
- change frontend package files or global CI without approval
- select an identity provider without an architecture decision
- implement placeholder APIs that imply real persistence but do not provide it
- create conflicting migrations or bypass Flyway once selected

Acceptance:
- reproducible build, configuration, health/readiness endpoints and migration workflow
- controller/service/domain/repository boundaries
- unit and integration tests
- documented API/error conventions

## Role G — TalentLens

Mission: preserve and prepare the existing TalentLens experience for eventual shared API integration.

Owns:
- TalentLens feature files specifically assigned
- candidate/recruiter domain proposal, tests and documentation

Must not independently:
- rewrite the existing TalentLens experience
- change shared auth or user models
- connect resume/candidate data to an API before upload, privacy, retention and authorization rules are approved

Acceptance:
- existing `/talentlens` route and behavior are documented and tested
- candidate/recruiter contracts are compatible with shared conventions
- sensitive data handling is specified

## Role W0 — Orchestrator / integration lead

Responsibilities:
- Record baseline SHA and current CI truth.
- Approve file ownership, architecture decisions, shared contracts and dependencies.
- Assign tasks and track branches/PRs.
- Resolve overlaps before code changes.
- Inspect all diffs and CI results.
- Integrate in dependency order and own final cross-module validation.
- Keep the roadmap and task manifest synchronized with verified reality.

## Completion report template

```text
Workstream:
Baseline SHA:
Branch:
PR:
Scope completed:
Files changed:
Shared contracts affected:
Tests run (exact command + result):
Production build (exact command + result):
CI run URL/status:
Known limitations:
Potential conflicts/dependencies:
Acceptance criteria not met:
```
