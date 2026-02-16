---
layout: minimal
authors:
    - "thegreataxios"
date: 2026-02-16
title: "Building CI/CD with Bun Workspaces, Changesets, Turborepo, and npm Provenance"
---

# Building CI/CD with Bun Workspaces, Changesets, Turborepo, and npm Provenance

Getting this pipeline right took more effort than expected.

Bun workspaces are fast and clean in local development, but `workspace:*` references do not resolve automatically when publishing a monorepo with npm. If you run `npm publish --workspaces` as-is, npm does not rewrite internal workspace references. In a multi-package setup, that is enough to break publishing.

A useful starting point was Ian's write-up on Changesets with Bun workspaces:

[https://ianm.com/posts/2025-08-18-setting-up-changesets-with-bun-workspaces](https://ianm.com/posts/2025-08-18-setting-up-changesets-with-bun-workspaces)

This post covers the rest: connecting Bun, Turborepo, Changesets, and npm provenance into one release pipeline with three channels:

- `alpha` from active development branches (`thegreataxios/<branch-name>`)
- `beta` from `staging` as the integration gate
- `latest` from `main` as production

Repository:
[https://github.com/thegreataxios/armory](https://github.com/thegreataxios/armory)

The goal was simple: deterministic releases, no manual publishing, no version collisions, and a fast testing loop without release chaos.

## The Model: Alpha for Maintainers, Beta as the Gate

The critical part is governance, not tooling.

- `alpha` exists so maintainers can ship installable builds quickly for testing.
- Non-maintainers do not ship alpha directly. Their path is PR review, then merge to the beta branch first.
- `beta` is where integration happens. If it passes there, it gets promoted to `main` and published as `latest`.

`alpha` is a controlled fast lane, not a free-for-all.
`beta` is the proving ground.
`main` is the stable line.

## Release Channels

| Branch / Context                               | npm tag  | Meaning |
|------------------------------------------------|----------|---------|
| Active development branch (`thegreataxios/<branch-name>`) | `alpha`  | Fast iteration builds |
| `staging`                                      | `beta`   | Integration and release-candidate testing |
| `main`                                         | `latest` | Production release |

This model keeps iteration fast while preserving a predictable promotion path.

## Stack

- [Bun](https://bun.sh) for workspace management and runtime
- [Turborepo](https://turbo.build/repo/docs) for build orchestration
- [Changesets](https://github.com/changesets/changesets) for versioning and changelogs
- [GitHub Actions](https://docs.github.com/actions) for CI/CD
- [npm](https://docs.npmjs.com) `--provenance` for verified publishes

The hard part is making Bun workspace protocol semantics compatible with npm workspace publish behavior.

## The Bun Workspace Constraint

In a Bun monorepo, internal dependencies often look like:

```json
{
  "dependencies": {
    "@armory-sh/base": "workspace:*"
  }
}
```

That is ideal locally.

During `npm publish --workspaces`, it is not. npm expects concrete semver ranges and will not resolve `workspace:*` references automatically.

The fix is straightforward: rewrite workspace references to concrete versions before publish.

## Resolving `workspace:*` Before Publish

```js
// scripts/resolve-workspaces.mjs
import fs from "fs"
import path from "path"

const packagesDir = path.resolve("packages")
const packageDirs = fs.readdirSync(packagesDir)

const versions = new Map()

// Collect versions from each workspace package
for (const dir of packageDirs) {
  const pkgPath = path.join(packagesDir, dir, "package.json")
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"))
  versions.set(pkg.name, pkg.version)
}

// Rewrite workspace:* references
for (const dir of packageDirs) {
  const pkgPath = path.join(packagesDir, dir, "package.json")
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"))

  for (const field of ["dependencies", "devDependencies", "peerDependencies"]) {
    if (!pkg[field]) continue

    for (const [name, version] of Object.entries(pkg[field])) {
      if (typeof version === "string" && version.startsWith("workspace:")) {
        const resolved = versions.get(name)
        if (resolved) pkg[field][name] = resolved
      }
    }
  }

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
}
```

Run it in CI before publishing:

```yaml
- name: Resolve workspace dependencies
  run: node scripts/resolve-workspaces.mjs
```

This compatibility layer is what makes Bun workspaces reliably publishable through npm in this pipeline.

## Where Changesets Fit

Changesets captures release intent in the PR itself.

When a package changes, the developer adds a changeset:

```bash
bun run changeset
```

That produces a `.changeset/*.md` file committed with the PR. Version intent is defined at contribution time; promotion branches then publish that intent under stricter release tags.

## Alpha: Fast Maintainer Builds

Alpha publishes prioritize speed for maintainers:

```yaml
- name: Resolve workspace dependencies
  run: node scripts/resolve-workspaces.mjs

- name: Publish alpha
  run: npm publish --provenance --access public --tag alpha --workspaces
```

This creates installable artifacts quickly for real validation and iteration.

## Beta: Integration Gate on `staging`

Non-maintainer changes flow here first. `staging` publishes beta-tagged release candidates:

```yaml
- name: Resolve workspace dependencies
  run: node scripts/resolve-workspaces.mjs

- name: Publish packages (beta)
  run: npm publish --provenance --access public --tag beta --workspaces
```

If the beta release holds up in testing, it is promoted.

## Production: Promotion to `main`

`main` is the final step:

```yaml
- name: Resolve workspace dependencies
  run: node scripts/resolve-workspaces.mjs

- name: Publish packages (latest)
  run: npm publish --provenance --access public --tag latest --workspaces
```

By this point, release risk should already be low because the artifact has already been exercised upstream.

## Enforcing Changesets in CI

To block undocumented package changes, CI checks for a changeset whenever `packages/` changes:

```yaml
- name: Check for changeset
  run: |
    CHANGED_FILES=$(git diff --name-only origin/${{ github.base_ref }}...HEAD)

    if echo "$CHANGED_FILES" | grep -q "^packages/"; then
      if ! echo "$CHANGED_FILES" | grep -q "^\.changeset/.*\.md$"; then
        echo "::error::Packages changed but no changeset found. Run 'bun run changeset'."
        exit 1
      fi
    fi
```

This keeps versioning explicit, reviewable, and tied to the PR where code changed.

## npm Provenance

Every publish uses provenance:

```bash
npm publish --provenance
```

GitHub Actions also needs OIDC permissions:

```yaml
permissions:
  id-token: write
  contents: write
```

This links published packages to the exact workflow run that built them and marks them as verified on npm.

## Outcome

This structure balances speed with control:

- maintainers can publish quickly when needed
- contributors follow a clear promotion flow
- versioning remains intentional and deterministic
- artifacts are verifiable

Bun provides fast workspace development, Turborepo coordinates builds, Changesets defines release intent at the PR layer, and npm distributes verified artifacts.

Once these pieces are wired together, releases become repeatable and uneventful, which is exactly what a CI/CD pipeline should optimize for.
