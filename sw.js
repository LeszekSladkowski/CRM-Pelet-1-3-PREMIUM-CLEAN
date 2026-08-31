const CACHE='crm-pelet-1-3-r46-r38-fullscreen-master-candidate';
const ASSETS=[
  './','./index.html','./manifest.webmanifest','./version.json','./backup-catalog.json','./crm-data.json','./assistant-feed.json',
  './master-pulpit.png','./master-rynki-karta1.png','./master-rynki-klienci.png','./master-rynki-dostawcy.png','./master-niemcy-karta2.png','./master-firma-koniec.png','./master-country-header.png','./master-country-footer.png',
  './flag-pl-master.png','./flag-de-master.png','./flag-cz-master.png','./flag-sk-master.png','./flag-at-master.png','./flag-ch-master.png','./flag-lt-master.png','./flag-it-master.png','./flag-fr-master.png','./flag-nl-master.png','./flag-be-master.png','./flag-dk-master.png','./flag-lv-master.png',
  './icon-192.png','./icon-512.png','./icon-maskable-512.png','./master-waluty-karta1.png','./master-waluty-karta2.png','./master-waluty-karta3.png','./master-waluty-karta4.png'
];

const R46_APP_VERSION='1.3.0-master-r46-r38-fullscreen-master-candidate';
const R46_RELEASE='R46 R38 FULLSCREEN MASTER CANDIDATE';
const R46_BUILD_DATE='31.08.2026';
const R46_BUILD_TIME='11:24';

function r46PatchIndexHtml(text){
  if(typeof text!=='string'||!text)return text;
  let out=text;
  out=out.replace('<title>CRM Pelet Premium 1.3 — R43 WALUTY LIVE HARD FIX</title>','<title>CRM Pelet Premium 1.3 — R46 R38 FULLSCREEN MASTER CANDIDATE</title>');
  out=out.replace("const APP_VERSION = '1.3.0-master-r43-waluty-live-hard-fix';",`const APP_VERSION = '${R46_APP_VERSION}';`);
  out=out.replace("const APP_RELEASE = 'R43 WALUTY LIVE HARD FIX';",`const APP_RELEASE = '${R46_RELEASE}';`);
  out=out.replace("const BUILD_DATE = '26.08.2026';",`const BUILD_DATE = '${R46_BUILD_DATE}';`);
  out=out.replace("const BUILD_TIME = '17:05';",`const BUILD_TIME = '${R46_BUILD_TIME}';`);
  out=out.replace("navigator.serviceWorker.register('./sw.js?v=R43-waluty-live-hard-fix-1705'","navigator.serviceWorker.register('./sw.js?v=R46-r38-fullscreen-master-candidate-1124'");

  const callMarker="    s.classList.add('r38-markets-final');";
  if(out.includes(callMarker)&&!out.includes('r46R38LiveStats(s);')){
    out=out.replace(callMarker,callMarker+"\n    r46R38LiveStats(s);\n    requestAnimationFrame(()=>r46R38Fullscreen(s));");
  }

  const helperMarker='  renderMarkets=renderMarketsR38;';
  if(out.includes(helperMarker)&&!out.includes('function r46R38LiveStats(parent)')){
    const helper=`

  /* ===== R46 — R38 LIVE + FULLSCREEN S24 ULTRA, bez zmiany rastra MASTER ===== */
  function r46R38VisibleCodes(){return Object.keys(R38_ALL_RECTS)}
  function r46R38RoleMatch(c){
    if(state.marketFilter==='KLIENCI')return marketRolesFor(c).includes('KLIENT');
    if(state.marketFilter==='DOSTAWCY')return marketRolesFor(c).includes('DOSTAWCA');
    return true;
  }
  function r46R38VisibleCompanies(){
    const codes=new Set(r46R38VisibleCodes());
    return r15AllCompanies().filter(c=>codes.has(c.countryCode)&&r46R38RoleMatch(c));
  }
  function r46R38Recent(days=7){
    const codes=new Set(r46R38VisibleCodes()),cut=Date.now()-days*86400000;
    return getLiveRecords().filter(r=>codes.has(r.countryCode)&&Date.parse(r.addedAt||'')>=cut).length;
  }
  function r46R38Today(){
    const codes=new Set(r46R38VisibleCodes()),d=new Date(),y=d.getFullYear(),m=d.getMonth(),day=d.getDate();
    return getLiveRecords().filter(r=>{if(!codes.has(r.countryCode))return false;const t=new Date(r.addedAt||0);return !Number.isNaN(t.valueOf())&&t.getFullYear()===y&&t.getMonth()===m&&t.getDate()===day}).length;
  }
  function r46R38Kpi(parent,x,w,value,small){
    const d=document.createElement('div');d.className='r46-r38-kpi-live';
    Object.assign(d.style,{position:'absolute',zIndex:'190',left:pct(x,941),top:pct(394,1672),width:pct(w,941),height:pct(78,1672),background:'#020302',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',pointerEvents:'none',overflow:'hidden',boxSizing:'border-box'});
    d.innerHTML=\`<b style="color:#ffe063;font-size:clamp(15px,4.6vw,25px);line-height:1.02;font-weight:950;white-space:nowrap">\${r13Esc(String(value))}</b><small style="color:#bdbdbd;font-size:clamp(6.5px,1.75vw,10px);line-height:1.05;margin-top:5px;white-space:nowrap">\${r13Esc(String(small))}</small>\`;
    parent.append(d);
  }
  function r46R38CardLive(parent,code,rect,roleFilter='WSZYSCY'){
    const [x,y,w,h]=rect;
    let arr=r15CountryCompanies(code);
    if(roleFilter==='KLIENCI')arr=arr.filter(c=>marketRolesFor(c).includes('KLIENT'));
    if(roleFilter==='DOSTAWCY')arr=arr.filter(c=>marketRolesFor(c).includes('DOSTAWCA'));
    const fresh=arr.filter(r=>Date.parse(r.addedAt||'')>=Date.now()-7*86400000).length;
    const d=document.createElement('div');d.className='r18-market-card-copy r46-r38-card-live';
    const left=x+w*(132/390),top=y+h*(18/122),ww=w*(190/390),hh=h*(88/122);
    Object.assign(d.style,{position:'absolute',zIndex:'191',left:pct(left,941),top:pct(top,1672),width:pct(ww,941),height:pct(hh,1672),pointerEvents:'none',overflow:'hidden',boxSizing:'border-box'});
    d.innerHTML=\`<strong>\${r13Esc(countries[code]?.name||code)}</strong><small>\${r16CountText(arr.length)}</small>\${fresh?\`<span class="new">NOWE \${fresh}</span>\`:''}\`;
    parent.append(d);
  }
  function r46R38LiveStats(parent){
    const all=r46R38VisibleCompanies();
    const active=new Set(all.map(c=>c.countryCode).filter(Boolean));
    r46R38Kpi(parent,31,211,active.size,'z danymi w bazie');
    r46R38Kpi(parent,244,211,all.length,'rekordów LIVE');
    r46R38Kpi(parent,458,205,r46R38Today(),\`ostatnie 7 dni: \${r46R38Recent(7)}\`);
    r46R38Kpi(parent,666,217,dateOnlyPL(lastSyncDate()),state.syncing?'TRWA SYNCHRONIZACJA':'CRM LIVE');
    if(state.marketFilter==='WSZYSCY'){
      Object.entries(R38_ALL_RECTS).forEach(([code,rect])=>r46R38CardLive(parent,code,rect,'WSZYSCY'));
    }else{
      (R38_FILTER_RECTS[state.marketFilter]||[]).forEach(([code,rect])=>r46R38CardLive(parent,code,rect,state.marketFilter));
    }
  }
  function r46R38Fullscreen(parent){
    if(!parent||parent.dataset.r46Fullscreen==='1')return;
    parent.dataset.r46Fullscreen='1';
    const SOURCE_H=1672,CROP_TOP=80,CROP_BOTTOM=105,CONTENT_H=SOURCE_H-CROP_TOP-CROP_BOTTOM;
    const remapTop=p=>((p/100*SOURCE_H-CROP_TOP)/CONTENT_H*100);
    const remapSize=p=>(p/100*SOURCE_H/CONTENT_H*100);
    parent.style.setProperty('width','min(100vw,720px)','important');
    parent.style.setProperty('max-width','100vw','important');
    parent.style.setProperty('height','100dvh','important');
    parent.style.setProperty('min-height','100dvh','important');
    parent.style.setProperty('max-height','100dvh','important');
    parent.style.setProperty('aspect-ratio','auto','important');
    parent.style.setProperty('margin','0 auto','important');
    parent.style.setProperty('overflow','hidden','important');
    const master=parent.querySelector(':scope > img.master');
    if(master){
      master.style.setProperty('top',(-CROP_TOP/CONTENT_H*100)+'%','important');
      master.style.setProperty('height',(SOURCE_H/CONTENT_H*100)+'%','important');
      master.style.setProperty('bottom','auto','important');
      master.style.setProperty('object-fit','fill','important');
    }
    [...parent.children].forEach(el=>{
      if(el===master)return;
      if(el.classList.contains('r38-sync-glyph')){
        el.style.setProperty('top',remapTop(5.96)+'%','important');
        return;
      }
      const top=el.style.top,height=el.style.height;
      if(top&&top.endsWith('%'))el.style.setProperty('top',remapTop(parseFloat(top))+'%','important');
      if(height&&height.endsWith('%'))el.style.setProperty('height',remapSize(parseFloat(height))+'%','important');
    });
    const app=document.getElementById('app'),body=document.body,html=document.documentElement;
    const oldBodyOverflow=body.style.overflow,oldBodyPadding=body.style.paddingBottom,oldHtmlOverflow=html.style.overflow;
    body.style.overflow='hidden';body.style.paddingBottom='0';html.style.overflow='hidden';
    if(app){
      const mo=new MutationObserver(()=>{
        if(!parent.isConnected){body.style.overflow=oldBodyOverflow;body.style.paddingBottom=oldBodyPadding;html.style.overflow=oldHtmlOverflow;mo.disconnect()}
      });
      mo.observe(app,{childList:true});
    }
  }
`;
    out=out.replace(helperMarker,helperMarker+helper);
  }
  return out;
}

async function r46PatchIndexResponse(response){
  try{
    const text=await response.text();
    const patched=r46PatchIndexHtml(text);
    const headers=new Headers(response.headers);
    headers.delete('content-length');
    headers.delete('content-encoding');
    headers.set('content-type','text/html; charset=utf-8');
    return new Response(patched,{status:response.status,statusText:response.statusText,headers});
  }catch{return response;}
}

self.addEventListener('message',e=>{if(e.data&&e.data.type==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('install',e=>{e.waitUntil((async()=>{
  const c=await caches.open(CACHE);
  await c.addAll(ASSETS);
  try{
    const raw=await fetch('./index.html',{cache:'no-store'});
    if(raw&&raw.ok){
      const patched=await r46PatchIndexResponse(raw);
      await c.put('./index.html',patched.clone());
      await c.put('./',patched.clone());
    }
  }catch{}
  await self.skipWaiting();
})());});
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
    // R46: NETWORK FIRST + R38 LIVE + pełny ekran S24 Ultra bez wewnętrznych pasków systemowych z rastra.
    e.respondWith((async()=>{
      const fresh=await fetchFresh(e.request);
      if(fresh&&fresh.ok){const patched=await r46PatchIndexResponse(fresh);await cachePut('./index.html',patched.clone());return patched;}
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