const CACHE='crm-pelet-1-3-r43-waluty-live-hard-fix';
const ASSETS=[
  './','./index.html','./manifest.webmanifest','./version.json','./backup-catalog.json','./crm-data.json','./assistant-feed.json',
  './master-pulpit.png','./master-rynki-karta1.png','./master-rynki-klienci.png','./master-rynki-dostawcy.png','./master-niemcy-karta2.png','./master-firma-koniec.png','./master-country-header.png','./master-country-footer.png',
  './flag-pl-master.png','./flag-de-master.png','./flag-cz-master.png','./flag-sk-master.png','./flag-at-master.png','./flag-ch-master.png','./flag-lt-master.png','./flag-it-master.png','./flag-fr-master.png','./flag-nl-master.png','./flag-be-master.png','./flag-dk-master.png','./flag-lv-master.png',
  './icon-192.png','./icon-512.png','./icon-maskable-512.png','./master-waluty-karta1.png','./master-waluty-karta2.png','./master-waluty-karta3.png','./master-waluty-karta4.png'
];
self.addEventListener('message',e=>{if(e.data&&e.data.type==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(ASSETS);await self.skipWaiting();})());});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k!==CACHE&&k.startsWith('crm-pelet-')).map(k=>caches.delete(k)));await self.clients.claim();})());});

async function fetchFresh(req){
  try{return await fetch(new Request(req,{cache:'no-store'}));}catch{return null;}
}
async function cachePut(key,response){
  if(response&&response.ok){const c=await caches.open(CACHE);await c.put(key,response.clone());}
}
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url);
  if(e.request.mode==='navigate'){
    // R43: NETWORK FIRST — wymusza finalne grafiki WALUTY MASTER i usuwa stare R39/R40/R41 z cache.
    e.respondWith((async()=>{
      const fresh=await fetchFresh(e.request);
      if(fresh&&fresh.ok){await cachePut('./index.html',fresh);return fresh;}
      return (await caches.match('./index.html'))||(await caches.match('./'))||Response.error();
    })());
    return;
  }
  if(url.pathname.endsWith('/version.json')||url.pathname.endsWith('/backup-catalog.json')||url.pathname.endsWith('/crm-data.json')||url.pathname.endsWith('/assistant-feed.json')||url.pathname.endsWith('/sw.js')||/master-waluty-karta[1-4]\.png$/.test(url.pathname)){
    e.respondWith((async()=>{
      const fresh=await fetchFresh(e.request);
      if(fresh&&fresh.ok){await cachePut(e.request,fresh);return fresh;}
      return (await caches.match(e.request))||Response.error();
    })());
    return;
  }
  e.respondWith((async()=>{
    const cached=await caches.match(e.request);
    if(cached)return cached;
    const fresh=await fetchFresh(e.request);if(fresh&&fresh.ok)await cachePut(e.request,fresh);return fresh||Response.error();
  })());
});
