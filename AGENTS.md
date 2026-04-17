# Agent Notes

## Setup Scripts

Use the repo-managed setup scripts from the repository root:

1. Run `./scripts/install` for first-time setup or to bootstrap another target.
2. Run `./scripts/update` to refresh the local setup and upstream bundles.
3. Use `AGENT_STUFF_TARGET_ROOT=/path ./scripts/install` or `AGENT_STUFF_TARGET_ROOT=/path ./scripts/update` to target a different Pi agent directory.
4. Use `AGENT_STUFF_BUNDLE_ROOT=/path ./scripts/update` if the upstream bundle location under `~/.agents/skills` needs to be overridden.

The sync rules live in `config/sources.json`.

Install/update responsibilities are split:

- local repo assets sync into `~/.pi/agent`
- upstream skill bundles sync under `~/.agents/skills`

Do not copy upstream bundle skills directly into `~/.pi/agent/skills`; that creates collisions with installed bundle skills.

## Extensions

Pi extensions live in `./extensions`. When working in this repo, add or update extensions there. You can consult the `pi-mono` for reference, but do not modify code in `pi-mono`.

Current extensions:

- `answer.ts`
- `btw.ts`
- `context.ts`
- `control.ts`
- `files.ts`
- `go-to-bed.ts`
- `loop.ts`
- `notify.ts`
- `prompt-editor.ts`
- `review.ts`
- `session-breakdown.ts`
- `split-fork.ts`
- `todos.ts`
- `uv.ts`
- `whimsical.ts`
