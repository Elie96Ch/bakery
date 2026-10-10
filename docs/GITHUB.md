# GitHub preparation and synchronization

## Prepared project

- English brand: **Abou Edmond** in the UI, metadata, PWA manifest, and offline text.
- Arabic brand text and existing localStorage keys are retained.
- Original Work project: `/workspace/sites/abou-admon-bakery`, left untouched.
- Prepared Work copy: `/workspace/sites/abou-edmond-github`.
- Local preparation branch: `github-prep`; intended GitHub destination: `main`.
- Existing original commit and history are preserved locally.
- Generated TypeScript cache files are retained on disk but excluded from the prepared Git index.

## Access check on 10 October 2026

The connected GitHub account is **Elie96Ch**. GitHub reports pull, push, and admin permissions for the private repository **Elie96Ch/bakery**. Its branch listing is empty. The GitHub connector supplies file, blob, tree, commit, and branch-ref writing operations.

The Work shell has no GitHub CLI or GitHub token. Connected-app authentication does not populate shell credentials, so a shell `git push` is not authenticated here. Uploads can instead use the authenticated GitHub connector after explicit approval. No remote-writing operation was performed during preparation.

Because the repository is empty, a connector upload may require an initial text-file commit to establish `main`, followed by a commit containing the full project snapshot. Connector-created GitHub commits can have different SHAs from the local review commit; the source tree must match. No force push or replacement of an existing remote project is authorized.

## First upload from your own computer

If using a complete source export rather than a clone, open a terminal at its project root and authenticate GitHub through your local Git credentials. For a directory with no `.git` folder:

```bash
git init -b main
git add .
git commit -m "Initial Abou Edmond bakery project"
git remote add origin https://github.com/Elie96Ch/bakery.git
git push -u origin main
```

Use this only while the repository is still empty. If GitHub already contains commits, clone it and make your changes there instead. Do not use `--force`.

## Continue editing after the first upload

```bash
git clone https://github.com/Elie96Ch/bakery.git
cd bakery
pnpm install --frozen-lockfile
pnpm dev
```

Before starting another editing session:

```bash
git pull --ff-only origin main
```

After editing and validating:

```bash
pnpm test
pnpm typecheck
pnpm build
git status
git add .
git commit -m "Describe the website change"
git push origin main
```

If the pull or push is rejected, inspect and merge the other changes rather than forcing. GitHub protects the repository according to its own branch rules and permissions.

## Secrets and hosting

Commit source, package metadata, the lockfile, bundled assets, and the existing Sites hosting manifest. Keep tokens, private keys, `.env` files, dependencies, generated build output, local execution state, and caches out of commits. `.gitignore` includes these exclusions.

The live private Site currently keeps its existing URL. Updating a GitHub branch does not deploy it automatically. A later authorized Sites deployment can use this renamed source and the retained project ID.
