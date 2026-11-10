# Coordinator playbook

The coordinator runs the project in **ticks**. A tick is started on a schedule (and whenever a worker finishes). Each tick starts with no memory of the last one: GitHub is the only state. Read `VISION.md` and `AGENTS.md` first, then do the steps below in order.

Repository: `UvinduP9/silicon-index`. Local checkout: `/Users/uvindup/Documents/silicon-index` (only `git pull` it; never edit files there during a tick). T3 project id for worker checkouts: `mcp:526c3c0a-a4cc-4c80-ae8d-794d385c3000`.

## Limits

- At most **3 workers** running at once, and at most **3 new dispatches per tick**.
- Never merge anything labelled `needs-gardener`, anything that changes `VISION.md`, or anything with failing CI.
- Never disable checks, push to `main` directly (except the log), or change repository settings.
- New scope beyond `VISION.md` becomes an issue labelled `needs-gardener`, not work.

## 1. Listen to the gardeners

Read the last few comments on issue #1, and every comment by @UvinduP9 since the last log entry anywhere in the repo:

```
gh issue view 1 --comments
gh search issues --repo UvinduP9/silicon-index --commenter UvinduP9 --updated ">=<date of last log entry>"
gh search prs --repo UvinduP9/silicon-index --commenter UvinduP9 --updated ">=<date of last log entry>"
```

Gardener instructions override everything else in this playbook. Act on them first. A gardener approves a `needs-gardener` item by commenting "approved" (or by removing the label).

## 2. Review open pull requests

For each open pull request (`gh pr list`):

1. Check CI (`gh pr checks <n>`). If it's failing, comment with the failure and send a worker to fix it on the same branch.
2. Read the linked issue and the diff (`gh pr diff <n>`). Does it meet every acceptance criterion and nothing more?
3. **Data pull requests:** open at least 3 cited source URLs (or all of them, if fewer than 10) and confirm the numbers match. A single invented or mismatched number means changes requested.
4. **UI pull requests:** build it and look at it at desktop and phone widths, in dark and light mode. Check it against `design/d-hybrid.html` and the frontend-design skill.
5. For large or risky pull requests, start an independent reviewer (`delegate_task`, role `review`) with the issue and the diff. Don't hand it your conclusion.
6. Decide:
   - **Good:** squash-merge (`gh pr merge <n> --squash --delete-branch`). The issue closes via `Closes #n`.
   - **Needs changes:** comment with specific, numbered changes and dispatch a worker to make them on the same branch.
   - **Needs a human call:** label `needs-gardener`, explain the question in one paragraph, and note it in the log.

## 3. Unblock

For each `blocked` issue, check its "Depends on" list. If every dependency is closed, swap `blocked` for `agent-ready`.

## 4. Dispatch

Count running workers (issues labelled `in-progress`). Fill free slots from `agent-ready` issues: lowest phase first, then `p0` before `p1` before `p2`, then lowest number.

Start each worker with `delegate_task`:

- `isolation: "worktree"`, `role` matching the issue type (`implementation`, `research`, `design`), `target.projectId` set to the id above.
- `title`: `#<n> <issue title>`
- `task`: the brief below, filled in.

```
You are a worker on Silicon Index, an open dataset and website that compares computer chips using benchmark results that already exist publicly.

Your job is GitHub issue #<n> in UvinduP9/silicon-index: "<title>".

1. Read VISION.md and AGENTS.md at the root of your checkout and follow them exactly, especially the data rules and design rules.
2. Read the issue and its comments: gh issue view <n> --comments. Read any issue it depends on.
3. Comment on the issue that you've started and swap the label agent-ready for in-progress.
4. Work on a new branch issue-<n>-<slug> from origin/main. Do only what the issue asks.
5. Run every check in AGENTS.md "Commands" and make them pass.
6. Push and open one pull request to main with "Closes #<n>", a summary, how you verified it, and follow-ups. Swap the issue label to in-review.
7. If the issue is ambiguous in a way that changes the result, comment your question on the issue, label it needs-gardener, and stop.

Don't merge, don't push to main, don't change repo settings. Your last line must be: PR <full URL>, head <SHA>, checks <state>. Or, if you stopped: STOPPED #<n>, <one-line reason>.
```

## 5. Tidy

- An issue that has been `in-progress` for more than 24 hours with no pull request: check its worker. If it's dead, comment, relabel `agent-ready`, and let the next tick pick it up.
- Make sure the next 5 issues in line are specific enough for a worker who knows nothing else: goal, context, acceptance criteria, "Depends on".
- Turn follow-ups listed in merged pull requests into issues when they fit `VISION.md`.
- When a phase's issues are all closed, plan the next phase's issues and post the plan to the log for the gardeners.

## 6. Log

Add one comment to issue #1:

```
**Tick <YYYY-MM-DD HH:MM>**
Merged: #a, #b
Changes requested: #c (why)
Dispatched: #d, #e
Waiting on gardeners: #f (question)
Next: <one line>
```

If nothing happened, write a one-line entry so the gardeners know the tick ran.
