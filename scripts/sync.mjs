#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

function parseArgs(argv) {
  const out = { dryRun: false, mode: "update" };
  for (const arg of argv) {
    if (arg === "--dry-run") {
      out.dryRun = true;
      continue;
    }
    if (arg.startsWith("--mode=")) {
      out.mode = arg.slice("--mode=".length);
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }
  if (!["install", "update"].includes(out.mode)) {
    throw new Error(`Unsupported mode: ${out.mode}`);
  }
  return out;
}

function expandHome(value) {
  if (!value) {
    return value;
  }
  if (value === "~") {
    return os.homedir();
  }
  if (value.startsWith("~/")) {
    return path.join(os.homedir(), value.slice(2));
  }
  return value;
}

function readConfig() {
  const configPath = path.join(repoRoot, "config", "sources.json");
  return JSON.parse(fs.readFileSync(configPath, "utf8"));
}

function runGit(args, options = {}) {
  return execFileSync("git", args, {
    cwd: options.cwd,
    stdio: "pipe",
    encoding: "utf8"
  });
}

function ensureCommand(name) {
  try {
    execFileSync(name, ["--version"], { stdio: "ignore" });
  } catch (error) {
    throw new Error(`Required command not found: ${name}`);
  }
}

function ensureDir(dirPath, dryRun, actions) {
  if (dryRun) {
    actions.push(`mkdir ${dirPath}`);
    return;
  }
  fs.mkdirSync(dirPath, { recursive: true });
}

function removePath(targetPath, dryRun, actions) {
  if (dryRun) {
    actions.push(`rm ${targetPath}`);
    return;
  }
  fs.rmSync(targetPath, { recursive: true, force: true });
}

function copyEntry(sourcePath, destinationPath, dryRun, actions) {
  if (dryRun) {
    actions.push(`copy ${sourcePath} -> ${destinationPath}`);
    return;
  }

  fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
  fs.rmSync(destinationPath, { recursive: true, force: true });
  fs.cpSync(sourcePath, destinationPath, {
    recursive: true,
    force: true,
    verbatimSymlinks: true
  });
}

function relativeChildren(rootPath) {
  return fs
    .readdirSync(rootPath, { withFileTypes: true })
    .filter((entry) => entry.name !== ".DS_Store")
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

function ensureUpstreamCheckout(upstream, cacheRoot, dryRun, actions) {
  const checkoutPath = path.join(cacheRoot, upstream.cacheSubdir || upstream.name);
  const gitDir = path.join(checkoutPath, ".git");

  if (!fs.existsSync(gitDir)) {
    actions.push(`clone ${upstream.repoUrl} -> ${checkoutPath}`);
    if (!dryRun) {
      fs.mkdirSync(cacheRoot, { recursive: true });
      runGit(["clone", "--depth", "1", "--branch", upstream.ref, upstream.repoUrl, checkoutPath]);
    }
    return checkoutPath;
  }

  actions.push(`update ${upstream.name} @ ${checkoutPath}`);
  if (!dryRun) {
    runGit(["fetch", "--depth", "1", "origin", upstream.ref], { cwd: checkoutPath });
    runGit(["reset", "--hard", `origin/${upstream.ref}`], { cwd: checkoutPath });
    runGit(["clean", "-fd"], { cwd: checkoutPath });
  }
  return checkoutPath;
}

function collectLocalEntries(config) {
  const entries = [];

  for (const asset of config.localAssets) {
    const sourceDir = path.join(repoRoot, asset.source);
    if (!fs.existsSync(sourceDir)) {
      throw new Error(`Local asset source not found: ${sourceDir}`);
    }
    if (asset.mode !== "children") {
      throw new Error(`Unsupported local asset mode: ${asset.mode}`);
    }

    for (const child of relativeChildren(sourceDir)) {
      entries.push({
        kind: "local",
        label: `${asset.name}:${child}`,
        sourcePath: path.join(sourceDir, child),
        relativeDestination: path.join(asset.destination, child)
      });
    }
  }

  return entries;
}

function collectUpstreamEntries(config, cacheRoot, dryRun, actions) {
  const entries = [];

  for (const upstream of config.upstreams) {
    const checkoutPath = ensureUpstreamCheckout(upstream, cacheRoot, dryRun, actions);
    const sourceBase = path.join(checkoutPath, upstream.sourceBase);

    for (const entry of upstream.entries) {
      const sourcePath = path.join(sourceBase, entry);
      if (!dryRun && !fs.existsSync(sourcePath)) {
        throw new Error(`Upstream entry not found: ${sourcePath}`);
      }
      entries.push({
        kind: "upstream",
        label: `${upstream.name}:${entry}`,
        sourcePath,
        relativeDestination: path.join(upstream.destination, entry)
      });
    }
  }

  return entries;
}

function readPreviousState(statePath) {
  if (!fs.existsSync(statePath)) {
    return { managedPaths: [] };
  }
  return JSON.parse(fs.readFileSync(statePath, "utf8"));
}

function writeState(statePath, state, dryRun, actions) {
  if (dryRun) {
    actions.push(`write-state ${statePath}`);
    return;
  }
  fs.mkdirSync(path.dirname(statePath), { recursive: true });
  fs.writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const config = readConfig();
  const targetRoot = path.resolve(expandHome(process.env.AGENT_STUFF_TARGET_ROOT || config.defaultTargetRoot));
  const cacheRoot = path.resolve(repoRoot, config.cacheRoot);
  const statePath = path.join(targetRoot, config.stateFile);
  const actions = [];

  ensureCommand("git");

  const upstreamEntries = collectUpstreamEntries(config, cacheRoot, args.dryRun, actions);
  const localEntries = collectLocalEntries(config);
  const desiredEntries = [...upstreamEntries, ...localEntries];
  const desiredPaths = desiredEntries.map((entry) => entry.relativeDestination).sort((a, b) => a.localeCompare(b));

  ensureDir(targetRoot, args.dryRun, actions);

  for (const entry of desiredEntries) {
    const destinationPath = path.join(targetRoot, entry.relativeDestination);
    copyEntry(entry.sourcePath, destinationPath, args.dryRun, actions);
  }

  if (args.mode === "update") {
    const previousState = readPreviousState(statePath);
    const desiredSet = new Set(desiredPaths);
    const stalePaths = previousState.managedPaths
      .filter((relativePath) => !desiredSet.has(relativePath))
      .sort((a, b) => a.localeCompare(b));

    for (const stalePath of stalePaths) {
      removePath(path.join(targetRoot, stalePath), args.dryRun, actions);
    }
  }

  writeState(
    statePath,
    {
      repoRoot,
      targetRoot,
      updatedAt: new Date().toISOString(),
      managedPaths: desiredPaths
    },
    args.dryRun,
    actions
  );

  console.log(`mode: ${args.mode}`);
  console.log(`target: ${targetRoot}`);
  console.log(`managed entries: ${desiredEntries.length}`);
  console.log(`upstreams: ${config.upstreams.map((upstream) => upstream.name).join(", ")}`);

  if (actions.length > 0) {
    console.log("actions:");
    for (const action of actions) {
      console.log(`- ${action}`);
    }
  }
}

try {
  main();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`error: ${message}`);
  process.exit(1);
}
