# Abou Edmond — Bakery & Cake Studio

A responsive, mobile-first frontend design preview built with React 19, Tailwind CSS 4, Lucide React, and the Sites Vinext starter. The attached Lebanese bakery menu inspired the brand name, olive palette, product selection, and contact number. All displayed USD prices are illustrative.

## Two separate experiences

- **Bakery:** browse categories or search, favorite items, reorder saved combinations, customize dough/addons, see live pricing, manage quantities, and complete a local demo checkout.
- **Cake Studio:** filter and select gallery inspiration, build a four-step brief, choose servings/flavors/filling, preview JPG/PNG/WebP uploads, select a target date, and save a local quotation preview.

Orders and cake requests are deliberately separate. No payment is collected and no requests are sent to the bakery. Cart, favorites, profile details, delivery address, orders, quotations, and the text cake draft use browser localStorage. Uploaded image data is used only during the current visit; filenames remain in quotation history. This prototype does not include authentication, CRM integration, real delivery scheduling, or a production ordering API.

## PWA

Includes a web app manifest, install icons, a standalone display mode, a service worker for same-origin static assets and an offline page fallback after a successful visit. Installation depends on browser support and the hosting context. Access remains private through Sites.

## Validation

- `node --experimental-strip-types --test tests/bakery.test.mjs`
- `node node_modules/typescript/bin/tsc --noEmit`
- `pnpm build` (framework build plus the PWA precache manifest).

Browser rendering and screen-size interaction QA were not available in the provided environment. Responsive styles cover narrow phones, tablets, and centered desktop layouts. Native dialogs provide focus trapping and Escape dismissal. Inputs, selectors, navigation, favorite buttons, and quantity controls have accessible labels.

## Photography

Placeholder photography is sourced from Unsplash and bundled locally. Hero/food images are illustrative and are not photographs of this bakery's actual products. The floral wedding cake is by Denio Rodríguez (Unsplash photo `HBETvpRcRgA`). Photography can be replaced with the bakery's own catalog before production.

## Framework and project layout

This is a React **19.2.6** + TypeScript **5.9.3** application using the Next-compatible **Vinext 1.0.0-beta.5** framework on **Vite 8.0.13**, with **Tailwind CSS 4.2.1** and **Lucide React 1.31.0**. The retained `next` dependency provides compatible APIs; the build runs Vinext/Vite.

The project root is the directory containing `package.json`, `pnpm-lock.yaml`, and `vite.config.ts`. In ChatGPT Work, the preserved original is `/workspace/sites/abou-admon-bakery` and the GitHub preparation copy is `/workspace/sites/abou-edmond-github`.

| Path | Purpose |
| --- | --- |
| `app/page.tsx` | Interactive homepage, bakery, cart, profile, orders, and Cake Studio |
| `app/layout.tsx` | Page metadata and PWA identity |
| `app/globals.css` | Tailwind import, brand styles, and responsive layouts |
| `lib/bakery.ts` | Catalog, modifiers, pricing, basket operations, and quotation validation |
| `public/` | Bundled photography, fonts, install icons, manifest, and service worker |
| `tests/bakery.test.mjs` | Seven business-logic tests |
| `scripts/` and `build/` | Cross-platform framework scripts and retained Sites integration |
| `.openai/hosting.json` | Existing Sites project identity; this is not a credential |

All original source folders, including starter components, examples, database scaffolding, and vendor files, are retained. Generated output and caches are ignored.

## Run and edit locally

Requirements: **Node.js 22.13.0 or newer** and **pnpm 11.25.0**. Install dependencies once while online; the source, fonts, and photos are bundled locally for development without relying on remote image or font hosts. The project uses native Worker tooling, so the first install must fetch dependencies for the local operating system.

```bash
npm install --global pnpm@11.25.0
git clone https://github.com/Elie96Ch/bakery.git
cd bakery
pnpm install --frozen-lockfile
pnpm dev
```

The clone command becomes usable after the approved first upload. Open **http://localhost:5173/** for development. Private-repository cloning requires authentication on your own computer, for example through Git Credential Manager or GitHub CLI.

```bash
pnpm test
pnpm typecheck
pnpm build
```

`pnpm build` produces the Worker server in `dist/server/`, static assets in `dist/client/`, and `dist/client/precache.json` for the PWA. Do not commit `dist/`, `node_modules/`, TypeScript build caches, or local environment/credential files.

Clean local clones default to the portable execution profile. The ignored `.sites-runtime/` directory is local tool state and is not needed in GitHub. `pnpm start` serves the built Worker using Wrangler; use the address printed by Wrangler.

## GitHub synchronization

Target repository: **https://github.com/Elie96Ch/bakery** (private). Detailed setup, authentication boundaries, and synchronization commands are in [docs/GITHUB.md](docs/GITHUB.md).

The existing Sites identity and Arabic brand text are retained. Browser storage keys keep their original namespace so a future brand update preserves saved baskets, favorites, profiles, and cake drafts. The service worker uses a new cache version and cleans up the former branded caches.

This preparation is local and has not been uploaded or deployed. GitHub changes and Sites deployments are separate operations: a GitHub push alone does not automatically update the existing live website.
