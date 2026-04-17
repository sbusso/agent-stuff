# Import Pi Extensions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Vendor the official Pi example extensions for Subagent, Plan Mode, and SSH into this repo so the existing install/update flow syncs them, while keeping the current local todo extension unchanged.

**Architecture:** Copy upstream example sources directly into this repo's `extensions/` tree, preserving upstream multi-file layouts for `subagent` and `plan-mode`, and copy the single-file `ssh` example as-is. Update README to document the new managed extensions and verify the existing sync configuration already covers them.

**Tech Stack:** TypeScript extensions for `@mariozechner/pi-coding-agent`, Markdown docs, existing repo sync scripts

---

### Task 1: Import the SSH extension

**Files:**
- Create: `extensions/ssh.ts`
- Source reference: `/opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/ssh.ts`
- Test: `extensions/ssh.ts`

- [ ] **Step 1: Verify the upstream SSH source exists**

Run: `test -f /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/ssh.ts && echo OK`
Expected: `OK`

- [ ] **Step 2: Copy the upstream SSH example into this repo**

Run: `cp /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/ssh.ts extensions/ssh.ts`
Expected: command exits successfully with no output

- [ ] **Step 3: Verify the imported file matches upstream exactly**

Run: `cmp -s /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/ssh.ts extensions/ssh.ts && echo MATCH`
Expected: `MATCH`

- [ ] **Step 4: Commit the SSH import**

```bash
git add extensions/ssh.ts
git commit -m "feat: import pi ssh extension"
```

### Task 2: Import the Plan Mode extension directory

**Files:**
- Create: `extensions/plan-mode/index.ts`
- Create: `extensions/plan-mode/utils.ts`
- Source reference: `/opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/plan-mode/index.ts`
- Source reference: `/opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/plan-mode/utils.ts`
- Test: `extensions/plan-mode/index.ts`
- Test: `extensions/plan-mode/utils.ts`

- [ ] **Step 1: Verify the upstream Plan Mode files exist**

Run: `test -f /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/plan-mode/index.ts && test -f /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/plan-mode/utils.ts && echo OK`
Expected: `OK`

- [ ] **Step 2: Create the destination directory**

Run: `mkdir -p extensions/plan-mode`
Expected: command exits successfully with no output

- [ ] **Step 3: Copy the upstream Plan Mode files into this repo**

Run: `cp /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/plan-mode/index.ts extensions/plan-mode/index.ts && cp /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/plan-mode/utils.ts extensions/plan-mode/utils.ts`
Expected: command exits successfully with no output

- [ ] **Step 4: Verify the imported Plan Mode files match upstream exactly**

Run: `cmp -s /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/plan-mode/index.ts extensions/plan-mode/index.ts && cmp -s /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/plan-mode/utils.ts extensions/plan-mode/utils.ts && echo MATCH`
Expected: `MATCH`

- [ ] **Step 5: Commit the Plan Mode import**

```bash
git add extensions/plan-mode/index.ts extensions/plan-mode/utils.ts
git commit -m "feat: import pi plan-mode extension"
```

### Task 3: Import the Subagent extension directory and bundled resources

**Files:**
- Create: `extensions/subagent/index.ts`
- Create: `extensions/subagent/agents.ts`
- Create: `extensions/subagent/agents/scout.md`
- Create: `extensions/subagent/agents/planner.md`
- Create: `extensions/subagent/agents/reviewer.md`
- Create: `extensions/subagent/agents/worker.md`
- Create: `extensions/subagent/prompts/implement.md`
- Create: `extensions/subagent/prompts/scout-and-plan.md`
- Create: `extensions/subagent/prompts/implement-and-review.md`
- Source reference: `/opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/subagent/`
- Test: `extensions/subagent/index.ts`
- Test: `extensions/subagent/agents.ts`

- [ ] **Step 1: Verify the upstream Subagent files exist**

Run: `test -f /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/subagent/index.ts && test -f /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/subagent/agents.ts && test -f /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/subagent/agents/scout.md && test -f /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/subagent/agents/planner.md && test -f /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/subagent/agents/reviewer.md && test -f /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/subagent/agents/worker.md && test -f /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/subagent/prompts/implement.md && test -f /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/subagent/prompts/scout-and-plan.md && test -f /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/subagent/prompts/implement-and-review.md && echo OK`
Expected: `OK`

- [ ] **Step 2: Create the destination directories**

Run: `mkdir -p extensions/subagent/agents extensions/subagent/prompts`
Expected: command exits successfully with no output

- [ ] **Step 3: Copy the upstream Subagent files into this repo**

Run: `cp /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/subagent/index.ts extensions/subagent/index.ts && cp /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/subagent/agents.ts extensions/subagent/agents.ts && cp /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/subagent/agents/scout.md extensions/subagent/agents/scout.md && cp /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/subagent/agents/planner.md extensions/subagent/agents/planner.md && cp /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/subagent/agents/reviewer.md extensions/subagent/agents/reviewer.md && cp /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/subagent/agents/worker.md extensions/subagent/agents/worker.md && cp /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/subagent/prompts/implement.md extensions/subagent/prompts/implement.md && cp /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/subagent/prompts/scout-and-plan.md extensions/subagent/prompts/scout-and-plan.md && cp /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/subagent/prompts/implement-and-review.md extensions/subagent/prompts/implement-and-review.md`
Expected: command exits successfully with no output

- [ ] **Step 4: Verify the imported Subagent files match upstream exactly**

Run: `cmp -s /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/subagent/index.ts extensions/subagent/index.ts && cmp -s /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/subagent/agents.ts extensions/subagent/agents.ts && cmp -s /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/subagent/agents/scout.md extensions/subagent/agents/scout.md && cmp -s /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/subagent/agents/planner.md extensions/subagent/agents/planner.md && cmp -s /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/subagent/agents/reviewer.md extensions/subagent/agents/reviewer.md && cmp -s /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/subagent/agents/worker.md extensions/subagent/agents/worker.md && cmp -s /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/subagent/prompts/implement.md extensions/subagent/prompts/implement.md && cmp -s /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/subagent/prompts/scout-and-plan.md extensions/subagent/prompts/scout-and-plan.md && cmp -s /opt/homebrew/lib/node_modules/@mariozechner/pi-coding-agent/examples/extensions/subagent/prompts/implement-and-review.md extensions/subagent/prompts/implement-and-review.md && echo MATCH`
Expected: `MATCH`

- [ ] **Step 5: Commit the Subagent import**

```bash
git add extensions/subagent/index.ts extensions/subagent/agents.ts extensions/subagent/agents/scout.md extensions/subagent/agents/planner.md extensions/subagent/agents/reviewer.md extensions/subagent/agents/worker.md extensions/subagent/prompts/implement.md extensions/subagent/prompts/scout-and-plan.md extensions/subagent/prompts/implement-and-review.md
git commit -m "feat: import pi subagent extension"
```

### Task 4: Update repository documentation for the new managed extensions

**Files:**
- Modify: `README.md`
- Test: `README.md`

- [ ] **Step 1: Add the new extensions to the README extension list**

Replace the extension list block in `README.md` so it includes these new lines in the Pi Coding Agent Extensions section:

```markdown
* [`plan-mode`](extensions/plan-mode) - Official Pi plan-mode extension for read-only exploration and plan execution workflows.
* [`ssh.ts`](extensions/ssh.ts) - Official Pi SSH remote execution extension for read/write/edit/bash delegation.
* [`subagent`](extensions/subagent) - Official Pi subagent extension with bundled agents and workflow prompts.
* [`todos.ts`](extensions/todos.ts) - Todo manager extension with file-backed storage and TUI.
```

Expected: the README extension list mentions `plan-mode`, `ssh.ts`, and `subagent`, while keeping `todos.ts` and not mentioning upstream `todo.ts`

- [ ] **Step 2: Verify the README mentions the imported extensions**

Run: `rg -n "plan-mode|ssh.ts|subagent|todos.ts" README.md`
Expected: matches for all four names

- [ ] **Step 3: Commit the documentation update**

```bash
git add README.md
git commit -m "docs: list imported pi extensions"
```

### Task 5: Verify sync coverage and imported layout

**Files:**
- Modify: none
- Test: `config/sources.json`
- Test: `extensions/ssh.ts`
- Test: `extensions/plan-mode/index.ts`
- Test: `extensions/subagent/index.ts`

- [ ] **Step 1: Verify extensions remain covered by sync configuration**

Run: `node -e 'const fs=require("fs"); const cfg=JSON.parse(fs.readFileSync("config/sources.json","utf8")); const hit=cfg.localAssets.find(x=>x.name==="extensions" && x.source==="extensions" && x.destination==="extensions" && x.mode==="children"); if(!hit) process.exit(1); console.log("SYNC_OK");'`
Expected: `SYNC_OK`

- [ ] **Step 2: Verify the expected imported files now exist in the repo**

Run: `test -f extensions/ssh.ts && test -f extensions/plan-mode/index.ts && test -f extensions/plan-mode/utils.ts && test -f extensions/subagent/index.ts && test -f extensions/subagent/agents.ts && test -f extensions/subagent/agents/scout.md && test -f extensions/subagent/agents/planner.md && test -f extensions/subagent/agents/reviewer.md && test -f extensions/subagent/agents/worker.md && test -f extensions/subagent/prompts/implement.md && test -f extensions/subagent/prompts/scout-and-plan.md && test -f extensions/subagent/prompts/implement-and-review.md && echo FILES_OK`
Expected: `FILES_OK`

- [ ] **Step 3: Verify there is still no upstream todo example imported into this repo**

Run: `test ! -f extensions/todo.ts && test -f extensions/todos.ts && echo TODO_POLICY_OK`
Expected: `TODO_POLICY_OK`

- [ ] **Step 4: Review the working tree summary**

Run: `git status --short`
Expected: shows the imported extension files, the README update, and no unexpected script/config changes

- [ ] **Step 5: Commit the verification checkpoint**

```bash
git add README.md extensions/ssh.ts extensions/plan-mode/index.ts extensions/plan-mode/utils.ts extensions/subagent/index.ts extensions/subagent/agents.ts extensions/subagent/agents/scout.md extensions/subagent/agents/planner.md extensions/subagent/agents/reviewer.md extensions/subagent/agents/worker.md extensions/subagent/prompts/implement.md extensions/subagent/prompts/scout-and-plan.md extensions/subagent/prompts/implement-and-review.md
git commit -m "chore: verify imported pi extensions"
```

### Self-review

- Spec coverage: the plan covers importing `ssh`, `plan-mode`, and `subagent`, keeping `todos.ts`, and updating docs.
- Placeholder scan: no TODO/TBD placeholders remain.
- Type consistency: all file paths and imported extension names are consistent with the approved spec.
