# Integration and Release Gate

Use this gate when independently developed branches are ready to be combined. A passing individual branch is not proof that combined branches work together.

## Gate A — Intake

- [ ] Record the exact base `main` SHA and integration branch SHA.
- [ ] Inventory every worker branch, commit and PR.
- [ ] Verify each PR's scope and changed-file manifest.
- [ ] Verify actual CI status for every PR.
- [ ] Confirm no unreviewed generated files, secrets, credentials or unrelated refactors.
- [ ] Check license and dependency changes where applicable.
- [ ] Identify conflicts in shared files, package manifests, routing, styles, contracts, configuration and migrations.

## Gate B — Architecture and contracts

- [ ] Shared domain/API contracts have named owners and reviewed decisions.
- [ ] Frontend mock/API service interfaces are compatible.
- [ ] API error, validation, pagination and date/time conventions are consistent.
- [ ] Identity/authorization boundaries are explicit.
- [ ] Database migrations have unique ownership/order and can run from a clean database.
- [ ] No two branches silently implement incompatible versions of the same domain.
- [ ] Existing `/talentlens` and Student Hub route behavior is preserved.

## Gate C — Integrated build and tests

Run the actual commands for the repository and backend; update this list if tooling changes.

- [ ] Clean frontend dependency install succeeds using the committed lockfile.
- [ ] Frontend unit/component tests pass.
- [ ] Browser smoke and critical end-to-end tests pass.
- [ ] Frontend production build succeeds.
- [ ] Backend build and unit tests pass.
- [ ] PostgreSQL migrations succeed against a clean test database.
- [ ] Repository/integration tests pass.
- [ ] API contract tests pass.
- [ ] Authorization negative tests pass for protected resources.
- [ ] Key cross-module workflows pass.
- [ ] TalentLens smoke/regression tests pass.
- [ ] Responsive/accessibility checks pass for agreed critical screens.
- [ ] Security/dependency scans complete and findings are triaged.
- [ ] CI runs on the exact integration candidate commit.

Do not paste guessed commands or claim a test ran when it did not. Record command, result and CI URL.

## Gate D — Cross-module journeys

Verify at minimum, when the corresponding modules are implemented:
- [ ] Profile and skill updates persist through the intended service/API.
- [ ] Learning/class actions maintain consistent profile/progress state.
- [ ] Saved items behave consistently across refresh and sessions as specified.
- [ ] Mentor booking requests validate inputs and access rights.
- [ ] Message and notification visibility respects authorization and preferences.
- [ ] Job application state transitions are valid and duplicate submissions are handled.
- [ ] Employer drafts cannot be published without required validation/permissions.
- [ ] Candidate/recruiter access to TalentLens records is restricted correctly.
- [ ] Mock mode still works without backend credentials.
- [ ] No sensitive data leaks into logs, localStorage, public responses or error messages.

## Gate E — Operational readiness

- [ ] Environment variables and secrets are documented without exposing real values.
- [ ] Health/readiness checks reflect actual service dependencies.
- [ ] Backup and restore are tested for PostgreSQL.
- [ ] Migration and rollback/forward-fix procedures are documented.
- [ ] Logging, metrics, alerts and request IDs are available at the required level.
- [ ] Deployment and rollback procedures are tested.
- [ ] Incident owner and operational responsibilities are assigned.
- [ ] Known limitations and risk acceptances are written down.

## Gate F — Release decision

Release candidate:
- Integration commit SHA:
- Main base SHA:
- CI run:
- Test/build summary:
- Security findings and disposition:
- Known limitations:
- Rollback plan:
- Approver:
- Decision: GO / NO-GO

GO only when all required gates pass or the repository owner explicitly approves a documented exception. A passing frontend build alone does not make the product production-ready.

## Suggested integration sequence

1. Documentation and contract decisions.
2. Test infrastructure and shared UI primitives.
3. Mock-first domain workflows.
4. Backend skeleton and migrations.
5. Identity/security foundations.
6. Backend/API and frontend integration in matching domain pairs.
7. TalentLens integration.
8. Full integrated CI, cross-module tests and operational checks.
9. Release PR to `main`.

Use an integration branch to reconcile branches and validate them together. Do not automatically merge every worker PR directly into `main`.
