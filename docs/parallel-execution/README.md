# Parallel Engineering Execution Pack

## Purpose

Coordinate parallel implementation of Student Hub + TalentLens in `vermase-del/openclaws`, while keeping `main` stable and allowing work to be integrated in a later release window.

This pack defines the delivery manifest, agent roles, ownership boundaries, shared contracts, branch/PR rules, and integration gate. It is a plan, not evidence that any agents have been launched or that planned features already exist.

## Repository baseline

- Frontend: React 18 + Vite 5; currently JavaScript/JSX with JSDoc contracts and an incremental TypeScript direction.
- Existing TalentLens experience must remain available at `/talentlens`.
- Current frontend is mock-first. Browser-local demo persistence is not a backend.
- PostgreSQL 16 is the primary future business database; Redis 7 remains optional for cache/transient coordination.
- Planned backend: Java + Spring Boot modular monolith with versioned `/api/v1` REST endpoints.
- Existing CI/build/test behavior must be inspected on the actual current `main` before implementation.
- The infrastructure health server is not an application API.

## Operating model

1. Record the exact `main` SHA used as the baseline.
2. Assign one owner/agent per workstream and record branch, files owned, dependencies, and acceptance criteria.
3. Agree shared domain/API contracts before parallel feature implementation.
4. Implement in isolated branches or worktrees. Prefer draft PRs for visibility without merging.
5. Do not let workers commit to `main` or merge their own PRs unless the repository owner explicitly authorizes it.
6. Require real test/build/CI evidence; never infer a pass from a successful commit or an open PR.
7. At the integration checkpoint, reconcile shared-file changes, package/lockfile changes, routes, domain contracts, database migrations, and configuration.
8. Integrate in dependency order on a dedicated integration branch; run cross-module tests there.
9. Merge the release PR only after the release gate in `integration-gate.md` is satisfied.

## Workstreams

| ID | Workstream | Primary output | Depends on |
|---|---|---|---|
| W0 | Orchestration and architecture | Baseline SHA, decisions, contracts, ownership map | None |
| W1 | Frontend quality | Component/browser tests, CI gates | Current frontend |
| W2 | UI system | Reusable components, accessibility and responsive patterns | UI inventory; coordinate shared files |
| W3 | Student Hub | Profile, skills, learning and classes contracts/workflows | Domain contract approval |
| W4 | Careers | Opportunities, summer jobs and applications contracts/workflows | Domain contract approval |
| W5 | Collaboration | Mentorship, community, messaging, notifications requirements/workflows | Domain contract approval and safety requirements |
| W6 | Backend foundation | Spring Boot structure, API conventions, PostgreSQL migrations and test setup | W0 architecture decisions |
| W7 | Identity and privacy | OIDC decision, authorization model, privacy and audit requirements | W6 boundaries; security review |
| W8 | TalentLens | Candidate/recruiter domain contracts and integration plan | Existing TalentLens baseline; shared identity/API conventions |
| W9 | Integration/release | Integrated branch, end-to-end validation, release report | All selected workstreams |

## Recommended first batch

Start with four implementation workers only after W0 records the baseline and boundaries:
- W1 Frontend quality
- W2 UI system, restricted to shared design primitives and styles
- W3 Student Hub mock-first contracts/workflows
- W4 Careers mock-first contracts/workflows

W6 may perform architecture/design preparation in parallel, but should not introduce conflicting application structures until W0 approves the backend conventions. W5 and W8 can begin with specifications and contract proposals, then implement once shared contracts are stable.

## Definition of done

A workstream is not done until:
- Scope and acceptance criteria are met.
- Tests relevant to the changed behavior exist and pass.
- Production build and required CI checks pass.
- No existing Student Hub or TalentLens route regresses.
- Security/privacy requirements are covered where relevant.
- Documentation reflects implemented reality.
- PR is reviewed and its merge status is verified.

## Documents in this pack

- [Task manifest](task-manifest.md): delivery sequence, dependencies and acceptance criteria.
- [Agent instructions](agent-instructions.md): copyable role prompts and ownership rules.
- [Shared contracts](shared-contracts.md): baseline domain/API rules to agree before integration.
- [Integration gate](integration-gate.md): integration checklist and release acceptance.
