# Pi Extension Import Design

## Goal

Import the official Pi example extensions for Subagent, Plan Mode, and SSH directly into this repo so the existing `scripts/install` and `scripts/update` flows will sync them as managed local extensions.

The existing local todo implementation will remain in place. We will not import the upstream `todo.ts` example and we will not replace `extensions/todos.ts`.

## Scope

In scope:
- vendor the upstream example files for:
  - `subagent`
  - `plan-mode`
  - `ssh`
- place them under this repo's managed `extensions/` tree
- update repo documentation so the installed extension set is accurate

Out of scope:
- changing install/update scripts
- changing sync configuration
- replacing the local todo implementation
- refactoring the imported extensions beyond what is strictly required to make them live in this repo

## Current Context

This repo already manages local extensions by syncing the contents of `extensions/` through the existing install/update flow:
- `scripts/install` → `scripts/sync.mjs --mode=install`
- `scripts/update` → `scripts/sync.mjs --mode=update`
- `config/sources.json` already declares `extensions` as a managed local asset copied by children into the target `extensions` directory

That means the correct implementation is to add the desired upstream example files into `./extensions` in this repository.

## Chosen Approach

Use direct upstream vendoring for the requested extensions.

Specifically:
- copy the official upstream example files as directly as possible
- preserve their upstream structure where they are multi-file extensions
- make only minimal repo-local adjustments if required for pathing or documentation
- do not import upstream Todo because this repo already has `extensions/todos.ts`

## File Layout

### New files/directories

- `extensions/subagent/index.ts`
- `extensions/subagent/agents.ts`
- `extensions/subagent/agents/*.md`
- `extensions/subagent/prompts/*.md`
- `extensions/plan-mode/index.ts`
- `extensions/plan-mode/utils.ts`
- `extensions/ssh.ts`

### Existing files to update

- `README.md`

### Existing files intentionally unchanged

- `extensions/todos.ts`
- `scripts/install`
- `scripts/update`
- `config/sources.json`

## Architecture

### Subagent

The upstream subagent example will be copied as a directory-based extension under `extensions/subagent/`.

Its bundled agent definitions and prompt templates will remain colocated with the extension, matching upstream layout as closely as possible. The imported extension should therefore remain easy to diff against upstream in future updates.

### Plan Mode

The upstream plan-mode example will be copied as a directory-based extension under `extensions/plan-mode/`.

It will remain self-contained using its upstream `index.ts` and `utils.ts` structure.

### SSH

The upstream ssh example will be copied as `extensions/ssh.ts`.

It will override built-in read/write/edit/bash behavior when the `--ssh` flag is used, and otherwise fall back to local execution.

### Todo

The existing local `extensions/todos.ts` remains the repo's todo solution.

This avoids duplicate todo tools and `/todos` command conflicts while respecting the user's instruction not to import the new todo example.

## Data / Sync Flow

1. The new extension files are added under `./extensions`.
2. Existing repo install/update commands sync those extension files into the target Pi environment.
3. Pi auto-discovers them from the synced extensions location.
4. No new sync rules are required because `extensions` is already part of managed local assets.

## Error Handling / Compatibility

- If imported upstream extensions assume colocated files, preserve that layout exactly inside `extensions/subagent/` and `extensions/plan-mode/`.
- If README entries become outdated, update them in the same change so repo docs reflect the actual managed assets.
- If naming conflicts appear with existing extensions, preserve upstream names where possible and only adjust if there is a real collision in this repo.
- Todo conflicts are explicitly avoided by not importing upstream `todo.ts`.

## Testing / Verification

Verification should confirm:
- the imported files exist at the expected repo paths
- the repo package metadata still exposes `./extensions`
- install/update flow still requires no config changes
- basic TypeScript/module path integrity for imported files
- README accurately lists the new managed extensions

## Success Criteria

This work is successful when:
- the repo contains direct upstream copies of Subagent, Plan Mode, and SSH extensions
- Todo remains the existing local implementation
- the current repo-managed install/update flow will sync the new extensions without script changes
- repo docs mention the newly managed extensions accurately

## Risks

### Upstream drift

Vendored files may diverge from upstream over time. Preserving upstream structure minimizes future update friction.

### Documentation mismatch

If README is not updated, users may not realize these extensions are now part of the managed setup.

### Hidden runtime assumptions

Subagent and plan-mode are multi-file examples. Copying only partial files would break them, so the full directory layout must be preserved.

## Decision Summary

Approved implementation direction:
- import official upstream `subagent`
- import official upstream `plan-mode`
- import official upstream `ssh`
- do not import upstream `todo.ts`
- keep existing `extensions/todos.ts`
- rely on existing repo sync/install/update behavior
