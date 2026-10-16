# Parallel Delivery Task Manifest

Status labels: **Baseline** = already present according to current repository documentation; **Planned** = not yet considered implemented; **Verify** = inspect the current branch and CI before relying on it. This manifest is not a claim that planned work is complete.

## Stage 0 — Baseline and decisions (W0)

Tasks:
- [ ] Record current `main` SHA, recent merged PRs, active branches/PRs, current CI workflow, Node/Java versions, and existing test commands.
- [ ] Run and record current install, test, and production build commands where the environment permits.
- [ ] Inventory routes and key workflows, including `/talentlens`.
- [ ] Record file ownership and shared-file restrictions.
- [ ] Approve frontend test/browser tool choices before adding dependencies.
- [ ] Approve Spring Boot version, Java version, package namespace, API error format, migration tool, and test strategy before backend implementation.
- [ ] Create architecture decision records for decisions that affect multiple agents.

Acceptance: a baseline report and shared decisions are committed; no application behavior is changed by this stage.

## Stage 1 — Frontend test infrastructure (W1)

Tasks:
- [ ] Inspect existing Node route tests and CI before changing scripts.
- [ ] Add React component test tooling only if not already present and justify dependencies.
- [ ] Add tests for shared navigation, filters, forms, saved items, and important demo workflows.
- [ ] Add browser smoke coverage for primary routes and TalentLens.
- [ ] Cover responsive viewport basics, keyboard navigation, and accessible names for key controls.
- [ ] Ensure CI runs tests before the production build and reports failures accurately.

Acceptance: tests are deterministic, run in CI, and critical routes are smoke-tested. No claims of coverage without measured results.

## Stage 2 — UI system (W2)

Tasks:
- [ ] Inventory existing primitives and avoid duplicating them.
- [ ] Define tokens and reusable patterns for typography, spacing, buttons, form controls, dialogs, alerts, cards, tables, empty/loading/error states.
- [ ] Improve responsive navigation and table behavior.
- [ ] Check contrast, focus visibility, keyboard access, and reduced-motion behavior where relevant.
- [ ] Keep feature-specific business logic out of shared primitives.

Acceptance: reusable components have examples/tests; existing page behavior and routes remain intact.

## Stage 3 — Student Hub workflows (W3)

Tasks:
- [ ] Define profile, visibility preference, skill, proficiency, learning resource/course, enrolment/progress, class/session, and saved-item contracts.
- [ ] Refine profile and skill registry workflows.
- [ ] Refine learning catalogue/details/progress and classes/schedule workflows.
- [ ] Keep demo persistence clearly marked and isolated behind services.
- [ ] Add validation, empty/loading/error states, and unit/workflow tests.
- [ ] Document which operations are mock-only and which future API calls are required.

Acceptance: workflows are coherent in mock mode, types/contracts are documented, and existing routes remain compatible.

## Stage 4 — Careers workflows (W4)

Tasks:
- [ ] Define opportunity, employer, listing, eligibility, application, and application-status contracts.
- [ ] Refine opportunities, summer jobs, saved roles, and application tracking.
- [ ] Make compensation, hours, duration, location/work mode and demo status explicit where shown.
- [ ] Define employer verification, listing moderation, anti-scam reporting, and age/eligibility safeguards.
- [ ] Separate draft listing submission from publication.
- [ ] Add tests for filters, forms, validation and status transitions.

Acceptance: demo data cannot be mistaken for verified vacancies; workflow contracts and safety requirements are documented and tested.

## Stage 5 — Collaboration workflows (W5)

Tasks:
- [ ] Define mentor discovery, booking request, event, announcement, conversation, message and notification contracts.
- [ ] Specify unread state, pagination/order, notification preferences, and error behavior.
- [ ] Define blocking/reporting, rate limits, abuse moderation, retention, and authorization before real messaging.
- [ ] Keep browser-local messages clearly demo-only.
- [ ] Add tests for conversation selection, composition, empty states and UI validation.

Acceptance: mock workflows work; real-time or persistent messaging is not implied until backend and security controls exist.

## Stage 6 — Backend foundation (W6)

Tasks:
- [ ] Create a Spring Boot modular monolith in a clearly isolated backend directory.
- [ ] Configure Java/toolchain, build wrapper, profiles, and environment-based configuration.
- [ ] Define controller/application service/domain/repository/DTO boundaries.
- [ ] Establish versioned `/api/v1` routes and a consistent validation/error response format.
- [ ] Configure PostgreSQL connection pooling and Flyway migrations.
- [ ] Add liveness/readiness endpoints, unit tests, repository tests and integration-test strategy.
- [ ] Keep Redis optional; do not add it to flows that do not need it.
- [ ] Update Docker Compose only through an agreed owner and test clean startup/migrations.

Acceptance: backend builds reproducibly; clean database migration and health checks work; tests run in CI. No fake business APIs or placeholder endpoints presented as complete.

## Stage 7 — Identity, authorization and privacy (W7)

Tasks:
- [ ] Document identity provider options and obtain an explicit architecture decision before selecting one.
- [ ] Define user identity, roles, permissions, ownership and lifecycle.
- [ ] Enforce authorization server-side on every protected route.
- [ ] Define profile visibility, consent, retention, audit and sensitive-data logging rules.
- [ ] Add negative authorization tests and tenant isolation if required.
- [ ] Specify appropriate safeguards for minors and sensitive student/candidate data.

Acceptance: security design is reviewed and protected API tests prove both allowed and denied access.

## Stage 8 — Incremental API integration

Recommended order:
1. [ ] Profile and skills.
2. [ ] Learning and classes.
3. [ ] Mentorship, community and notifications.
4. [ ] Messaging after security controls.
5. [ ] Careers, employer listing and applications.
6. [ ] TalentLens candidate/recruiter workflows.
7. [ ] AI provider integration only after privacy, credential, cost and safety boundaries are approved.

For every slice:
- [ ] Agree request/response/error/pagination contracts first.
- [ ] Implement API client and backend endpoint in coordinated branches.
- [ ] Add authentication, authorization, validation and integration tests.
- [ ] Replace browser-only persistence for that workflow only.
- [ ] Retain a mock adapter for local development and tests until acceptance passes.
- [ ] Verify no regression in existing route or TalentLens behavior.

Acceptance: workflow persists in PostgreSQL through authenticated APIs and is covered by integration tests.

## Stage 9 — TalentLens (W8)

Tasks:
- [ ] Inventory the existing `/talentlens` experience before changing it.
- [ ] Define candidate, recruiter, resume metadata, screening and hiring workflow contracts.
- [ ] Specify upload limits, file validation, data retention, consent and access rules before resume upload is connected.
- [ ] Integrate using the shared identity and API conventions.
- [ ] Add regression and authorization tests.

Acceptance: TalentLens routes and key existing behavior are preserved; candidate/recruiter data is protected.

## Stage 10 — Operations and release (W9)

Tasks:
- [ ] Structured logs, request IDs, metrics and traces appropriate to the deployment.
- [ ] Dependency/security scanning and secret management.
- [ ] Environment separation and reproducible deployment.
- [ ] Backup/restore drill, migration runbook, rollback procedure and incident ownership.
- [ ] Critical-flow end-to-end, security, accessibility and load checks appropriate to expected traffic.
- [ ] Confirm CI and production health checks from the release candidate.
- [ ] Publish release notes, known limitations and rollback instructions.

Acceptance: every item in `integration-gate.md` is satisfied or explicitly approved as a documented release exception by the owner.

## Suggested delivery order

| Delivery | Work | Parallel? |
|---|---|---|
| D0 | Baseline, ownership, decisions | Start first |
| D1 | Frontend tests | Parallel after D0 |
| D2 | UI primitives | Parallel after UI inventory |
| D3 | Student Hub contracts/workflows | Parallel after domain contract review |
| D4 | Careers contracts/workflows | Parallel after domain contract review |
| D5 | Collaboration specification | Parallel; implementation after safety/contracts |
| D6 | Backend architecture and skeleton | Design can parallelize; code after decisions |
| D7 | Identity/privacy design | Design parallel; implementation after backend boundaries |
| D8 | API integration slices | Coordinated pairs: frontend + backend |
| D9 | TalentLens integration | After shared API/auth conventions |
| D10 | Operations and release | After integration candidate exists |

Do not equate the D-numbers with GitHub PR numbers. Assign actual PR numbers when branches are opened.
