# Working on Silicon Index

This project is built by AI agents, coordinated by an AI coordinator and tended by two human-and-AI gardeners. Read this file and `VISION.md` before doing anything.

## Roles

- **Gardeners**: the project owner (@UvinduP9) and the coordinator. They set direction, approve design and scope changes, and prune the board. Their word overrides everything here.
- **Coordinator**: plans work, writes and grooms issues, dispatches workers, reviews and merges pull requests, and keeps the log. Its playbook is `docs/coordinator.md`.
- **Workers**: take exactly one issue, do it on a branch, and open one pull request.
- **Reviewers**: independent agents the coordinator asks to check a pull request against its issue.

## Model routing

- The gardener assistant and coordinator use Claude Opus 5.5 (`claudeAgent_work`, `claude-opus-5-5`).
- Use Claude workers and reviewers only for UI/UX work where visual design, interaction, layout or usability judgment is the purpose.
- Every other worker and reviewer uses GPT-6.1 Sol (`codex`, `gpt-6.1-sol`): research, data, infrastructure, schemas, application logic, tests, documentation and non-UI review.
- Select the provider and model explicitly for every delegation; never inherit the coordinator's Claude model by default. Split mixed tasks when practical so Claude handles the UI/UX portion and GPT handles the rest.
- If the required model is unavailable, report the blocker instead of substituting another model.

## The board

Work is tracked as GitHub issues in `UvinduP9/silicon-index`, grouped by milestone (Phase 0 to Phase 4).

| Label | Meaning |
|---|---|
| `agent-ready` | Fully specified, dependencies done, a worker can pick it up |
| `in-progress` | A worker is on it |
| `in-review` | A pull request is open |
| `blocked` | Waiting on another issue (listed under "Depends on" in the issue) |
| `needs-gardener` | Needs a human decision or approval before it can move |
| `type:data`, `type:ui`, `type:infra`, `type:research`, `type:design`, `type:docs` | Kind of work |
| `p0`, `p1`, `p2` | Priority, p0 first |

Issue #1 is the coordinator log. Gardeners read it to see what happened.

## How a worker does an issue

1. Read `VISION.md`, this file, and the issue (`gh issue view <n> --comments`). Read every issue listed under "Depends on" too.
2. Comment on the issue that you've started, and set the label to `in-progress` (remove `agent-ready`).
3. Branch from up-to-date `main`: `issue-<n>-<short-slug>`.
4. Do only what the issue asks. If you find other work, note it in your pull request description under "Follow-ups"; don't do it.
5. Run every check listed under Commands below before opening the pull request.
6. Open one pull request to `main` titled like the issue, with `Closes #<n>` in the body, a summary of what changed, how you verified it, and any follow-ups. Set the issue label to `in-review`.
7. If you're stuck or the issue is ambiguous in a way that changes the outcome, comment on the issue with the specific question, label it `needs-gardener`, and stop. Don't guess on direction.

Never push to `main`, force-push, merge your own pull request, change repository settings, add secrets, or sign up for paid services.

## Data rules (non-negotiable)

The whole project rests on trust. A wrong number is worse than a missing one.

- **Every number comes from a public source you actually opened during this task.** Record the URL, the publisher, the date you accessed it, and where on the page the number is. Never write a number from memory, from another AI, or by estimating.
- **If you can't source it, leave it out.** Note the gap in your pull request instead.
- **We never run benchmarks** and never compute our own composite score.
- **Never mix benchmark versions.** Geekbench 6 and Geekbench 7 are different scales and are stored as different benchmarks.
- **Record context**: chip configuration (core counts), device where known, power level for PC chips, sample count or "single result", and the software version where relevant.
- **Respect sources.** Follow each site's terms and robots rules (see `docs/sources.md` once it exists). Prefer official and open-data sources. Don't bulk-scrape a site whose terms forbid it; collect by hand at small scale or skip it.
- `design/data.js` is sample data for prototypes. Never import it or copy numbers from it.

Reviewers check data pull requests by opening a sample of the cited URLs and confirming the numbers.

## Design rules

- All UI and visual design work uses the frontend-design skill in `.claude/skills/frontend-design/SKILL.md`. Load it before designing.
- The approved direction is `design/d-hybrid.html`: pure black (`#000`) background, full contrast, Bricolage Grotesque, the heat ramp, tier colors sampled from it, a Grid view and a Lines view sharing one state. Match it unless an issue says otherwise.
- New visual directions are prototyped in `design/` first and labelled `needs-gardener` for approval before they're built for real.
- Responsive down to 360px, visible keyboard focus, reduced motion respected, light mode works.
- Copy is plain, sentence case, from the user's point of view. No marketing language.

## Engineering rules

- Next.js (App Router), TypeScript in strict mode, Tailwind, static export. Charts are hand-built SVG with d3 for scales and maths, no chart libraries.
- Data lives in `data/` as plain files and is validated against the schema in CI.
- Keep pull requests small and focused. Add tests for logic (data transforms, validation, URL state).

## Commands

Use the Node version in `.nvmrc` (run `nvm use`) and pnpm (`corepack enable` picks up the version in `package.json`).

| Step | Command |
|---|---|
| Install | `pnpm install` |
| Dev server | `pnpm dev` (http://localhost:3000) |
| Lint and formatting check | `pnpm lint` (fix formatting with `pnpm format`) |
| Typecheck | `pnpm typecheck` |
| Test | `pnpm test` |
| Build (static export to `out/`) | `pnpm build` |

All of them must pass before you open a pull request: install, lint, typecheck, test and build must exit cleanly, and `pnpm dev` must start and serve the site. CI runs the same commands on every pull request and on pushes to `main`.

## Pull request conventions

- Title: the issue title. Body: `Closes #<n>`, summary, verification, follow-ups.
- Attribute pull requests and commits to the tool/model that actually did the work; do not credit Claude for GPT work.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
