# Agent Stuff Setup Manager Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand this repo as `sbusso`'s personal agent setup manager and add manifest-driven install/update flows plus a self-update skill.

**Architecture:** Keep this repo as the source of truth for local custom assets while adding a small manifest that defines curated upstream skill imports. Implement a shared sync script used by `scripts/install` and `scripts/update`, then document the new model and attribution clearly in the repo metadata and README.

**Tech Stack:** Node.js, shell wrappers, JSON config, markdown docs

---

## File Structure

- Create: `config/sources.json`
- Create: `scripts/sync.mjs`
- Create: `scripts/install`
- Create: `scripts/update`
- Create: `skills/self-update/SKILL.md`
- Modify: `README.md`
- Modify: `package.json`
- Modify: `CHANGELOG.md`

### Task 1: Rebrand Metadata And Docs

**Files:**
- Modify: `package.json`
- Modify: `README.md`
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Write the failing test**

Use shell assertions to encode the expected rebrand state.

```bash
rg -n "mitsupi|Armin's pi coding agent commands|released on npm" package.json README.md
```

Expected: matches found in current files.

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
rg -n "mitsupi|Armin's pi coding agent commands|released on npm" package.json README.md
```

Expected: non-empty output showing old branding.

- [ ] **Step 3: Write minimal implementation**

Update `package.json` to a personal, non-published identity. Rewrite `README.md` around personal setup management, install/update usage, and attribution. Add a changelog entry describing the shift.

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
rg -n "mitsupi|Armin's pi coding agent commands|released on npm" package.json README.md
```

Expected: no matches.

- [ ] **Step 5: Commit**

```bash
git add package.json README.md CHANGELOG.md
git commit -m "docs: rebrand repo as personal setup manager"
```

### Task 2: Add Source Manifest

**Files:**
- Create: `config/sources.json`

- [ ] **Step 1: Write the failing test**

Define the expected manifest contract.

```bash
test -f config/sources.json
```

Expected: exit code 1 because the file does not exist yet.

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
test -f config/sources.json
```

Expected: exit code 1.

- [ ] **Step 3: Write minimal implementation**

Create a JSON manifest that declares:

- the default install target root
- upstream repo metadata for `obra/superpowers` and `cloudflare/skills`
- curated skill directory lists for each upstream
- local asset directories managed by this repo

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
node -e "const fs=require('fs'); const p='config/sources.json'; const data=JSON.parse(fs.readFileSync(p,'utf8')); if(!data.upstreams || data.upstreams.length < 2) process.exit(1); console.log(data.upstreams.map(x=>x.name).join(','))"
```

Expected: prints `superpowers,cloudflare-skills` or equivalent.

- [ ] **Step 5: Commit**

```bash
git add config/sources.json
git commit -m "feat: add upstream sources manifest"
```

### Task 3: Build Shared Sync Engine

**Files:**
- Create: `scripts/sync.mjs`

- [ ] **Step 1: Write the failing test**

Expect the sync engine to support a dry-run summary.

```bash
node scripts/sync.mjs --dry-run
```

Expected: module not found or file missing.

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
node scripts/sync.mjs --dry-run
```

Expected: non-zero exit because the script does not exist yet.

- [ ] **Step 3: Write minimal implementation**

Implement a Node script that:

- reads `config/sources.json`
- resolves repo root and target root
- clones or fetches each upstream into a local cache directory
- syncs configured local directories and curated upstream skill directories into the target root
- supports `--dry-run` and `--mode=install|update`
- prints a concise action summary

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
node scripts/sync.mjs --dry-run --mode=install
```

Expected: exit code 0 and a readable summary mentioning local assets and both upstream repos.

- [ ] **Step 5: Commit**

```bash
git add scripts/sync.mjs
git commit -m "feat: add setup sync engine"
```

### Task 4: Add Install And Update Entry Points

**Files:**
- Create: `scripts/install`
- Create: `scripts/update`

- [ ] **Step 1: Write the failing test**

Check for executable entrypoints.

```bash
test -x scripts/install && test -x scripts/update
```

Expected: exit code 1 because the files do not exist yet.

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
test -x scripts/install && test -x scripts/update
```

Expected: exit code 1.

- [ ] **Step 3: Write minimal implementation**

Add small shell wrappers that call `node scripts/sync.mjs --mode=install` and `node scripts/sync.mjs --mode=update`.

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
test -x scripts/install && test -x scripts/update
./scripts/install --dry-run
./scripts/update --dry-run
```

Expected: executables exist and both commands exit 0 with summaries.

- [ ] **Step 5: Commit**

```bash
git add scripts/install scripts/update
git commit -m "feat: add install and update commands"
```

### Task 5: Add Self-Update Skill

**Files:**
- Create: `skills/self-update/SKILL.md`
- Modify: `README.md`

- [ ] **Step 1: Write the failing test**

Check for the new skill file.

```bash
test -f skills/self-update/SKILL.md
```

Expected: exit code 1 because the skill does not exist yet.

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
test -f skills/self-update/SKILL.md
```

Expected: exit code 1.

- [ ] **Step 3: Write minimal implementation**

Create a skill that tells the agent:

- this repo manages the local setup
- use `./scripts/update` to refresh the installation
- keep actions explicit and visible

Also add the skill to the README inventory.

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
test -f skills/self-update/SKILL.md
rg -n "self-update" README.md skills/self-update/SKILL.md
```

Expected: file exists and both files contain the new skill reference.

- [ ] **Step 5: Commit**

```bash
git add skills/self-update/SKILL.md README.md
git commit -m "feat: add self-update skill"
```

### Task 6: Verify End-To-End Behavior

**Files:**
- Verify: `config/sources.json`
- Verify: `scripts/sync.mjs`
- Verify: `scripts/install`
- Verify: `scripts/update`
- Verify: `skills/self-update/SKILL.md`
- Verify: `README.md`

- [ ] **Step 1: Run focused verification**

```bash
node scripts/sync.mjs --dry-run --mode=install
node scripts/sync.mjs --dry-run --mode=update
```

Expected: both commands exit 0 and summarize the same managed assets.

- [ ] **Step 2: Run install against a temporary target**

```bash
tmpdir="$(mktemp -d)"
AGENT_STUFF_TARGET_ROOT="$tmpdir" ./scripts/install
find "$tmpdir" -maxdepth 2 -type d | sort
```

Expected: local managed directories appear under the temporary target root.

- [ ] **Step 3: Run update against the same temporary target**

```bash
tmpdir="$(mktemp -d)"
AGENT_STUFF_TARGET_ROOT="$tmpdir" ./scripts/install >/dev/null
AGENT_STUFF_TARGET_ROOT="$tmpdir" ./scripts/update
find "$tmpdir" -maxdepth 2 -type d | sort
```

Expected: update exits 0 and leaves a coherent installed layout.

- [ ] **Step 4: Check final status**

```bash
git status --short
```

Expected: only intended file changes remain.

## Self-Review

- Spec coverage: rebrand, attribution, manifest-driven install/update, and self-update skill all have explicit tasks.
- Placeholder scan: no `TODO`/`TBD` placeholders remain.
- Type consistency: all scripts and file paths consistently reference `config/sources.json`, `scripts/sync.mjs`, `scripts/install`, `scripts/update`, and `skills/self-update/SKILL.md`.
