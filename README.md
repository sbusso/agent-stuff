# Agent Stuff

This repository is `sbusso`'s personal setup manager for agent skills, extensions, themes, commands, and local helper tooling.

It is the source of truth for my local agent environment. The repo keeps my own assets in one place and can also pull curated upstream skills into the same setup.

## What This Repo Manages

- local skills in [`skills`](skills)
- local extensions in [`extensions`](extensions)
- local themes in [`themes`](themes)
- local commands in [`commands`](commands)
- sync configuration and install/update entrypoints
- curated upstream skill sources

## Upstream Sources And Credits

This repo is customized from the original author setup and intentionally preserves credit rather than pretending imported work is original.

- Original author reference: Armin's `mitsupi` setup, which this repo was forked from and adapted for personal use
- Workflow/process skills: [`obra/superpowers`](https://github.com/obra/superpowers)
- Cloudflare platform skills: [`cloudflare/skills`](https://github.com/cloudflare/skills)

Imported upstream skills should remain credited to their source repositories in documentation and config.

## Install And Update

Use the repo-managed entrypoints:

```bash
./scripts/install
./scripts/update
```

Both commands support installing into an alternate target root:

```bash
AGENT_STUFF_TARGET_ROOT=/path/to/target ./scripts/install
AGENT_STUFF_TARGET_ROOT=/path/to/target ./scripts/update
```

The upstream and local sync rules live in [`config/sources.json`](config/sources.json).

## Skills

Local skills live in the [`skills`](skills) folder:

* [`/commit`](skills/commit) - Create git commits using concise Conventional Commits-style subjects.
* [`/frontend-design`](skills/frontend-design) - Design and implement distinctive frontend interfaces.
* [`/github`](skills/github) - Interact with GitHub using the `gh` CLI (issues, PRs, runs, APIs).
* [`/librarian`](skills/librarian) - Cache and refresh remote git repositories in `~/.cache/checkouts`.
* [`/native-web-search`](skills/native-web-search) - Trigger native web search with concise summaries and source URLs.
* [`/openscad`](skills/openscad) - Create/render OpenSCAD models and export STL files.
* [`/pi-share`](skills/pi-share) - Load and parse session transcripts from shittycodingagent.ai/buildwithpi/pi.dev URLs.
* [`/self-update`](skills/self-update) - Refresh this local setup through the repo-managed update flow.
* [`/sentry`](skills/sentry) - Fetch and analyze Sentry issues, events, transactions, and logs.
* [`/summarize`](skills/summarize) - Convert files/URLs to Markdown via `uvx markitdown` and summarize.
* [`/tmux`](skills/tmux) - Drive tmux sessions via keystrokes and pane output scraping.
* [`/update-changelog`](skills/update-changelog) - Update changelogs with notable user-facing changes.
* [`/uv`](skills/uv) - Use `uv` for Python dependency management and script execution.
* [`/web-browser`](skills/web-browser) - Browser automation via Chrome/Chromium CDP.

## Pi Coding Agent Extensions

Custom extensions for Pi Coding Agent are in [`extensions`](extensions):

* [`answer.ts`](extensions/answer.ts) - Interactive TUI for answering questions one by one.
* [`btw.ts`](extensions/btw.ts) - Simple `/btw` side-chat popover with optional summary injection back into the main chat on close.
* [`context.ts`](extensions/context.ts) - Context breakdown (extensions, skills, AGENTS.md/CLAUDE.md) + token usage, including loaded-skill highlighting.
* [`control.ts`](extensions/control.ts) - Session control helpers (list controllable sessions, etc.).
* [`files.ts`](extensions/files.ts) - Unified file browser with git status + session references and reveal/open/edit/diff actions.
* [`split-fork.ts`](extensions/split-fork.ts) - `/split-fork` command to branch the current session into a new pi process in a right-hand Ghostty split.
* [`go-to-bed.ts`](extensions/go-to-bed.ts) - Late-night safety guard with explicit confirmation after midnight.
* [`loop.ts`](extensions/loop.ts) - Prompt loop for rapid iterative coding with optional auto-continue.
* [`multi-edit.ts`](extensions/multi-edit.ts) - Replaces the built-in `edit` tool with batch `multi` edits and Codex-style `patch` support, including preflight validation.
* [`notify.ts`](extensions/notify.ts) - Native desktop notifications when the agent finishes.
* [`prompt-editor.ts`](extensions/prompt-editor.ts) - In-editor prompt mode selector with persistence, history, config, and shortcuts.
* [`review.ts`](extensions/review.ts) - Code review command (working tree, PR-style diff, commits, custom instructions, optional fix loop).
* [`session-breakdown.ts`](extensions/session-breakdown.ts) - TUI for 7/30/90-day session and cost analysis with usage graph.
* [`todos.ts`](extensions/todos.ts) - Todo manager extension with file-backed storage and TUI.
* [`uv.ts`](extensions/uv.ts) - Helpers for uv-based Python workflows.
* [`whimsical.ts`](extensions/whimsical.ts) - Replaces the default thinking message with random whimsical phrases.

## Pi Coding Agent Themes

Custom themes are in [`themes`](themes):

* [`nightowl.json`](themes/nightowl.json) - Night Owl-inspired theme.

## Plumbing Commands

These command files need customization before use. They live in [`plumbing-commands`](plumbing-commands):

* [`/make-release`](plumbing-commands/make-release.md) - Automates repository release with version management.

## Legacy Packaging

The [`distributions`](distributions) directory is currently retained as legacy packaging from the forked setup. It is no longer the primary installation path for this repo.

## Intercepted Commands

Command wrappers live in [`intercepted-commands`](intercepted-commands):

* [`pip`](intercepted-commands/pip)
* [`pip3`](intercepted-commands/pip3)
* [`poetry`](intercepted-commands/poetry)
* [`python`](intercepted-commands/python)
* [`python3`](intercepted-commands/python3)
