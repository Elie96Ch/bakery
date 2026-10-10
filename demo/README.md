# Abou Edmond static demo

This standalone React/Vite build reuses the existing bakery UI and styles. The original Vinext/Sites project is unchanged. Orders, profiles, and cake requests are demonstrations stored only in the visitor's browser; nothing is sent to the bakery.

## Build locally

Install Node.js 22.13 or newer and the package manager declared in the root package.json, then run from the repository root:

```sh
pnpm install --frozen-lockfile
node demo/build.mjs
```

Upload the contents of `demo/dist` to static hosting. For GitHub Pages, the default URL prefix is `/bakery/`. Set `DEMO_BASE_PATH=/` for hosting at a domain root. The build scopes images, the manifest, and the service worker to the selected prefix.

## GitHub Pages

For this private repository, GitHub Pages requires an eligible paid GitHub plan. The Pages demo will be publicly accessible; the source can remain private.

1. Open repository Settings → Pages.
2. Select GitHub Actions as the publishing source.
3. Open Actions → Deploy bakery demo → Run workflow.
4. The successful deployment job displays the live URL.

Subsequent pushes to main also deploy automatically. GitHub may require an environment approval if configured by the repository owner. Do not use this demo for real customer orders or payments.
