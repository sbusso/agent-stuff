---
name: self-update
description: "Refresh this local agent setup through the repo-managed update flow"
---

Use this skill when the user wants to update, refresh, or re-sync the local `agent-stuff` setup managed by this repository.

## What This Repo Owns

This repository is the source of truth for the local setup. It manages:

- local skills, extensions, themes, commands, and helper tooling
- curated upstream skills configured in `config/sources.json`
- install and update entrypoints in `scripts/install` and `scripts/update`

## Update Flow

Run the repo-managed update command from the repository root:

```bash
./scripts/update
```

If the user wants to install or refresh into a different target root, use:

```bash
AGENT_STUFF_TARGET_ROOT=/path/to/target ./scripts/update
```

## Rules

- Keep the update action explicit and user-visible.
- Do not invent alternate sync paths when `./scripts/update` already fits.
- Do not remove unrelated user files outside the managed target paths.
- If the update fails, report the exact repo, path, or command that failed.
