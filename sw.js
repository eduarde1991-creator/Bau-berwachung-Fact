const C='bue-app-v2',PRE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png','https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js','https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js','https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>Promise.allSettled(PRE.map(u=>c.add(u)))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
const put=(r,x)=>{const cp=x.clone();caches.open(C).then(c=>c.put(r,cp));return x};
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const same=new URL(r.url).origin===location.origin;
 e.respondWith(same?fetch(r).then(x=>put(r,x)).catch(()=>caches.match(r,{ignoreSearch:true})):caches.match(r).then(x=>x||fetch(r).then(y=>put(r,y))))});
