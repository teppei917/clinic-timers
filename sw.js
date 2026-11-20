const CACHE='clinic-timers-v8';const HOME=new URL('./index.html',self.location).href;
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.add(new Request(HOME,{cache:'reload'}))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('clinic-timers-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||e.request.mode!=='navigate'||!e.request.url.startsWith(new URL('./',self.location).href))return;e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();e.waitUntil(caches.open(CACHE).then(c=>c.put(HOME,copy)))}return r}).catch(()=>caches.match(HOME)))});
