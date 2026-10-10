const CACHE='abou-edmond-v2';
self.addEventListener('install',event=>{event.waitUntil(fetch('/precache.json').then(response=>{if(!response.ok)throw new Error('PWA asset list unavailable');return response.json();}).then(assets=>caches.open(CACHE).then(async cache=>{await cache.addAll(assets);const response=await fetch('/');if(response.ok&&response.headers.get('content-type')?.includes('text/html'))await cache.put('/',response);})).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>(key.startsWith('abou-admon-')||key.startsWith('abou-edmond-'))&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin||url.pathname.startsWith('/api/')||url.pathname.startsWith('/cdn-cgi/')||url.pathname.includes('auth')||url.search)return;
 if(request.mode==='navigate'){
  event.respondWith(fetch(request).then(response=>{if(response.ok&&response.headers.get('content-type')?.includes('text/html')){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put('/',copy)));}return response;}).catch(async()=>{const response=await caches.match('/');return response||new Response('Please reconnect to visit Abou Edmond for the first time.',{headers:{'Content-Type':'text/plain'},status:503});}));return;
 }
 if(!/\.(?:js|css|jpg|png|webp|svg|woff2|webmanifest)$/.test(url.pathname))return;
 event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(response=>{if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,copy)));}return response;})));
});
