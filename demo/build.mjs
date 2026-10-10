import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, relative } from 'node:path';
import { createHash } from 'node:crypto';

const root = fileURLToPath(new URL('../', import.meta.url));
const out = join(root, 'demo/dist');
const base = process.env.DEMO_BASE_PATH || '/bakery/';
const result = spawnSync(process.execPath, [join(root, 'node_modules/vite/bin/vite.js'), 'build', '--config', join(root, 'demo/vite.config.mjs')], { cwd: root, stdio: 'inherit' });
if (result.status !== 0) process.exit(result.status || 1);

const manifest = JSON.parse(readFileSync(join(out, 'manifest.webmanifest'), 'utf8'));
Object.assign(manifest, { id: base, start_url: base, scope: base });
for (const icon of manifest.icons) icon.src = base + icon.src.replace(/^\//, '');
for (const shortcut of manifest.shortcuts) shortcut.url = base + shortcut.url.replace(/^\//, '');
writeFileSync(join(out, 'manifest.webmanifest'), JSON.stringify(manifest, null, 2) + '\n');

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]);
}
const files = walk(out).filter(path => !['sw.js', 'precache.json'].includes(relative(out, path))).sort();
const version = createHash('sha256');
for (const path of files) version.update(relative(out, path)).update(readFileSync(path));
const cache = 'abou-edmond-demo-' + version.digest('hex').slice(0, 12);
const assets = [base, ...files.map(path => base + relative(out, path).split('\\').join('/'))];
writeFileSync(join(out, 'precache.json'), JSON.stringify(assets));
writeFileSync(join(out, 'sw.js'), `const CACHE=${JSON.stringify(cache)};
const ROOT=new URL('./',self.location.href).href;
self.addEventListener('install',event=>event.waitUntil(fetch(new URL('precache.json',ROOT)).then(r=>{if(!r.ok)throw Error('Precache unavailable');return r.json()}).then(assets=>caches.open(CACHE).then(cache=>cache.addAll(assets))).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('abou-edmond-demo-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET'||!request.url.startsWith(ROOT))return;
 if(request.mode==='navigate'){event.respondWith(fetch(request).catch(()=>caches.match(ROOT).then(cached=>cached||Response.error())));return;}
 event.respondWith(caches.match(request).then(cached=>cached||fetch(request)));
});
`);
writeFileSync(join(out, '.nojekyll'), '');
console.log('Static demo ready: demo/dist (' + assets.length + ' offline assets)');
