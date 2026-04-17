# Agent Stuff Setup Manager Design

## Summary

This repository will be repurposed as `sbusso`'s personal agent setup manager. It will stop presenting itself as a publishable npm package and instead become the source of truth for installing and updating a local agent environment.

The repository will manage:

- local custom skills, extensions, themes, and commands
- curated upstream skills sourced from external repositories
- install and update scripts that synchronize local and upstream assets into the target agent environment
- a self-update skill that instructs the agent how to refresh the setup safely

## Goals

- Rebrand the repository around `sbusso` instead of `mitsupi`
- Preserve attribution to the original author and imported upstream sources
- Remove or de-emphasize npm/distribution publishing workflow from the primary documentation
- Add a repeatable install flow for first-time setup
- Add a repeatable update flow for refreshing local and upstream assets
- Make upstream imports explicit and curated rather than implicit

## Non-Goals

- Publishing this repository to npm
- Preserving distribution packages as the primary installation mechanism
- Mirroring entire upstream repositories into this repo
- Building a general-purpose plugin manager

## Current State

The repo currently still contains:

- `package.json` metadata branded as `mitsupi`
- README content describing the repo as an npm package
- distribution packages under `distributions/`
- a set of local skills, extensions, themes, commands, and helper scripts

This no longer matches the intended use of the repo as a personal setup manager.

## Proposed Architecture

### 1. Repo identity

The repo will describe itself as a personal agent toolkit and setup manager for `sbusso`.

Documentation will explicitly note:

- this repo is customized from an original author setup
- upstream skills may be installed from external sources
- imported content remains credited to its original source repositories

### 2. Manifest-driven upstream sync

A manifest file will define:

- upstream repositories to fetch
- local cache paths for those repositories
- skill directories to import from each upstream
- local destination paths for installation

The initial upstream repositories are:

- `https://github.com/obra/superpowers`
- `https://github.com/cloudflare/skills`

The manifest should be readable and easy to extend, likely JSON.

### 3. Install script

`scripts/install` will:

- create required local directories
- clone or refresh cached upstream repositories
- sync local repo-managed assets into the target setup
- sync curated upstream skill directories into the target setup
- print a concise summary of what was installed

This script is for first-time setup but should be safe to re-run.

### 4. Update script

`scripts/update` will:

- refresh cached upstream repositories
- re-sync curated assets from this repo and upstream repos
- optionally remove previously managed upstream skill directories that are no longer in the manifest
- print a concise summary of what changed

This is the primary maintenance entrypoint.

### 5. Self-update skill

A new local skill will document how the agent should update the local setup intentionally.

The skill should:

- explain when to use it
- point to the repo update entrypoint
- avoid hidden behavior or autonomous destructive cleanup
- keep the update flow explicit and user-visible

This skill is “self-aware” in the limited and practical sense that it knows this repo manages the local agent setup and that the correct way to refresh it is through the repo’s update path.

## Data Flow

1. User runs install or update from this repo.
2. Script reads the sync manifest.
3. Script ensures upstream cache checkouts exist and are current.
4. Script copies selected local assets and curated upstream skills into the configured target directories.
5. Script reports the result.

## File Layout Changes

Expected additions:

- `scripts/install`
- `scripts/update`
- `config/sources.json` or similar manifest file
- `skills/self-update/SKILL.md`

Expected documentation updates:

- `README.md`
- `package.json`
- optionally `CHANGELOG.md`

Possible cleanup targets:

- `distributions/`
- npm-oriented release language in docs and metadata

## Error Handling

Scripts should fail clearly when:

- `git` is unavailable
- an upstream clone or fetch fails
- a configured source directory does not exist
- a target path cannot be created or written

Failures should identify the exact repo or path involved.

## Testing Strategy

Validation should cover:

- manifest parsing
- install script on a clean target directory
- update script on an existing target directory
- idempotent re-run behavior
- basic verification that expected skill directories are created

Testing can begin with shell-based verification commands rather than a full automated test harness.

## Open Design Decisions Resolved

- Installation model: manifest-driven vendored sync
- Repo purpose: personal setup manager
- Initial upstreams: `obra/superpowers` and `cloudflare/skills`
- Self-update support: yes, through a local skill that documents and routes updates through repo scripts

## Implementation Boundary

The first implementation pass should focus on:

- rebranding docs and metadata
- adding manifest-driven install/update scripts
- adding the self-update skill
- documenting attribution and usage

It should avoid expanding into unrelated refactors or broad deletion of working local assets unless those assets directly conflict with the new setup-manager positioning.
