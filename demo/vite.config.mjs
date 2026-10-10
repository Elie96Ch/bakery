import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const base = process.env.DEMO_BASE_PATH || '/bakery/';
if (!base.startsWith('/') || !base.endsWith('/')) throw new Error('DEMO_BASE_PATH must start and end with /');

export default defineConfig({
  root: fileURLToPath(new URL('./', import.meta.url)),
  base,
  publicDir: '../public',
  css: { postcss: projectRoot },
  plugins: [
    {
      name: 'demo-asset-paths',
      enforce: 'pre',
      transform(code, id) {
        if (!/\/(?:app\/page\.tsx|lib\/bakery\.ts)$/.test(id)) return;
        return code.replace(/(['"])\/(images\/[^'"]*|sw\.js)\1/g,
          (_, quote, path) => JSON.stringify(base + path));
      },
    },
    react(),
  ],
  build: { outDir: 'dist', emptyOutDir: true },
});
