const CACHE='crm-pelet-1-3-r52-waluty-karta1-master-candidate';
const ASSETS=[
  './','./index.html','./manifest.webmanifest','./version.json','./backup-catalog.json','./crm-data.json','./assistant-feed.json',
  './master-pulpit.png','./master-rynki-karta1.png','./master-rynki-klienci.png','./master-rynki-dostawcy.png','./master-niemcy-karta2.png','./master-firma-koniec.png','./master-country-header.png','./master-country-footer.png',
  './flag-pl-master.png','./flag-de-master.png','./flag-cz-master.png','./flag-sk-master.png','./flag-at-master.png','./flag-ch-master.png','./flag-lt-master.png','./flag-it-master.png','./flag-fr-master.png','./flag-nl-master.png','./flag-be-master.png','./flag-dk-master.png','./flag-lv-master.png',
  './icon-192.png','./icon-512.png','./icon-maskable-512.png','./master-waluty-karta1.png','./master-waluty-karta2.png','./master-waluty-karta3.png','./master-waluty-karta4.png'
];

const R48_APP_VERSION='1.3.0-master-r52-waluty-karta1-master-candidate';
const R48_RELEASE='R52 WALUTY KARTA 1 MASTER CANDIDATE';
const R48_BUILD_DATE='31.08.2026';
const R48_BUILD_TIME='15:04';

function r48PatchIndexHtml(text){
  if(typeof text!=='string'||!text)return text;
  let out=text;
  out=out.replace('<title>CRM Pelet Premium 1.3 — R43 WALUTY LIVE HARD FIX</title>','<title>CRM Pelet Premium 1.3 — R52 WALUTY KARTA 1 MASTER CANDIDATE</title>');
  out=out.replace("const APP_VERSION = '1.3.0-master-r43-waluty-live-hard-fix';",`const APP_VERSION = '${R48_APP_VERSION}';`);
  out=out.replace("const APP_RELEASE = 'R43 WALUTY LIVE HARD FIX';",`const APP_RELEASE = '${R48_RELEASE}';`);
  out=out.replace("const BUILD_DATE = '26.08.2026';",`const BUILD_DATE = '${R48_BUILD_DATE}';`);
  out=out.replace("const BUILD_TIME = '17:05';",`const BUILD_TIME = '${R48_BUILD_TIME}';`);
  out=out.replace("navigator.serviceWorker.register('./sw.js?v=R43-waluty-live-hard-fix-1705'","navigator.serviceWorker.register('./sw.js?v=R52-waluty-karta1-master-1504'");
  out=out.replace("s.append(hotspot({x:28,y:82,w:118,h:118,label:'Wstecz do pulpitu',onClick:()=>go('home'),z:200,baseW:941,baseH:1672}));","s.append(hotspot({x:8,y:58,w:166,h:166,label:'Wstecz do pulpitu',onClick:()=>go('home'),z:260,baseW:941,baseH:1672}));");

  /* R52 WALUTY KARTA 1 — wyłącznie chirurgiczna geometria LIVE.
     Raster MASTER, menu, hotspoty kart 1/2–1/4 i cała zamrożona gałąź RYNKI EU pozostają nietknięte. */
  if(!out.includes('id="r52-waluty-karta1-surgical"')){
    const r52Style=`\n<style id="r52-waluty-karta1-surgical">\n.wm-page[data-card="1"] .wm-live-ring{\n  left:82.159624%!important;top:3.792004%!important;width:11.737089%!important;height:auto!important;aspect-ratio:1/1!important;\n  border:2px solid rgba(118,255,0,.72)!important;border-radius:50%!important;background:transparent!important;\n  box-shadow:0 0 0 2px rgba(0,0,0,.92),0 0 12px rgba(105,255,24,.58),inset 0 0 8px rgba(105,255,24,.12)!important;\n  animation:none!important;transform:none!important;box-sizing:border-box!important;\n}\n.wm-page[data-card="1"] .wm-live-spinner{\n  left:81.455399%!important;top:3.4670%!important;width:13.14554%!important;height:auto!important;aspect-ratio:1/1!important;\n  border-radius:50%!important;box-sizing:border-box!important;display:grid!important;place-items:center!important;\n}\n.wm-page[data-card="1"] .wm-live-spinner span{display:block!important;line-height:1!important;transform-origin:50% 50%!important;margin:auto!important;}\n.wm-page[data-card="1"] .wm-hot[aria-label="LIVE — synchronizuj kursy"]{\n  left:75.117371%!important;top:1.083424%!important;width:23.474178%!important;height:11.105092%!important;\n  z-index:80!important;touch-action:manipulation!important;\n}\n</style>\n`;
    out=out.replace('</head>',r52Style+'</head>');
  }

  const callMarker="    s.classList.add('r38-markets-final');";
  if(out.includes(callMarker)&&!out.includes('r48R38LiveStats(s);')){
    out=out.replace(callMarker,callMarker+"\n    r48R38LiveStats(s);\n    requestAnimationFrame(()=>r48R38Viewport(s));");
  }

  const helperMarker='  renderMarkets=renderMarketsR38;';
  if(out.includes(helperMarker)&&!out.includes('function r48R38LiveStats(parent)')){
    const helper=`

  /* ===== R51 — FINAL FRAME FIT: chirurgiczny header/footer, funkcje R50 zamrożone ===== */
  function r48R38VisibleCodes(){return Object.keys(R38_ALL_RECTS)}
  function r48R38RoleMatch(c){
    if(state.marketFilter==='KLIENCI')return marketRolesFor(c).includes('KLIENT');
    if(state.marketFilter==='DOSTAWCY')return marketRolesFor(c).includes('DOSTAWCA');
    return true;
  }
  function r48R38VisibleCompanies(){
    const codes=new Set(r48R38VisibleCodes());
    return r15AllCompanies().filter(c=>codes.has(c.countryCode)&&r48R38RoleMatch(c));
  }
  function r48R38Recent(days=7){
    const codes=new Set(r48R38VisibleCodes()),cut=Date.now()-days*86400000;
    return getLiveRecords().filter(r=>codes.has(r.countryCode)&&Date.parse(r.addedAt||'')>=cut).length;
  }
  function r48R38Today(){
    const codes=new Set(r48R38VisibleCodes()),d=new Date(),y=d.getFullYear(),m=d.getMonth(),day=d.getDate();
    return getLiveRecords().filter(r=>{if(!codes.has(r.countryCode))return false;const t=new Date(r.addedAt||0);return !Number.isNaN(t.valueOf())&&t.getFullYear()===y&&t.getMonth()===m&&t.getDate()===day}).length;
  }
  function r48R38Kpi(parent,x,w,value,small){
    const d=document.createElement('div');d.className='r48-r38-kpi-live';
    Object.assign(d.style,{position:'absolute',zIndex:'190',left:pct(x,941),top:pct(394,1672),width:pct(w,941),height:pct(78,1672),background:'#020302',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',pointerEvents:'none',overflow:'hidden',boxSizing:'border-box'});
    d.innerHTML=\`<b style="color:#ffe063;font-size:clamp(15px,4.6vw,25px);line-height:1.02;font-weight:950;white-space:nowrap">\${r13Esc(String(value))}</b><small style="color:#bdbdbd;font-size:clamp(6.5px,1.75vw,10px);line-height:1.05;margin-top:5px;white-space:nowrap">\${r13Esc(String(small))}</small>\`;
    parent.append(d);
  }
  function r48R38CardLive(parent,code,rect,roleFilter='WSZYSCY'){
    const [x,y,w,h]=rect;
    let arr=r15CountryCompanies(code);
    if(roleFilter==='KLIENCI')arr=arr.filter(c=>marketRolesFor(c).includes('KLIENT'));
    if(roleFilter==='DOSTAWCY')arr=arr.filter(c=>marketRolesFor(c).includes('DOSTAWCA'));
    const fresh=arr.filter(r=>Date.parse(r.addedAt||'')>=Date.now()-7*86400000).length;
    const d=document.createElement('div');d.className='r48-r38-card-live';
    const left=x+w*.31,top=y+h*.075,ww=w*.49,hh=h*.86;
    Object.assign(d.style,{position:'absolute',zIndex:'191',left:pct(left,941),top:pct(top,1672),width:pct(ww,941),height:pct(hh,1672),pointerEvents:'none',overflow:'hidden',boxSizing:'border-box',background:'#020302',display:'flex',flexDirection:'column',alignItems:'flex-start',justifyContent:'center',padding:'3px 5px',borderRadius:'3px'});
    const badgeOpacity=fresh>0?'1':'.72';
    d.innerHTML=\`<strong style="display:block;color:#f4f4f4;font-size:clamp(11px,3vw,18px);font-weight:850;line-height:1.04;white-space:nowrap">\${r13Esc(countries[code]?.name||code)}</strong><small style="display:block;color:#ddd;font-size:clamp(8px,2.05vw,12px);line-height:1.05;margin-top:3px;white-space:nowrap">\${r16CountText(arr.length)}</small><span style="display:inline-block;margin-top:5px;border:1px solid #b98700;border-radius:999px;color:#ffd43b;padding:2px 6px;font-size:clamp(6px,1.35vw,8px);line-height:1;white-space:nowrap;opacity:\${badgeOpacity}">NOWE \${fresh}</span>\`;
    parent.append(d);
  }
  function r48R38LiveStats(parent){
    const all=r48R38VisibleCompanies();
    const active=new Set(all.map(c=>c.countryCode).filter(Boolean));
    r48R38Kpi(parent,31,211,active.size,'z danymi w bazie');
    r48R38Kpi(parent,244,211,all.length,'rekordów LIVE');
    r48R38Kpi(parent,458,205,r48R38Today(),\`ostatnie 7 dni: \${r48R38Recent(7)}\`);
    r48R38Kpi(parent,666,217,dateOnlyPL(lastSyncDate()),state.syncing?'TRWA SYNCHRONIZACJA':'CRM LIVE');
    if(state.marketFilter==='WSZYSCY'){
      Object.entries(R38_ALL_RECTS).forEach(([code,rect])=>r48R38CardLive(parent,code,rect,'WSZYSCY'));
    }else{
      (R38_FILTER_RECTS[state.marketFilter]||[]).forEach(([code,rect])=>r48R38CardLive(parent,code,rect,state.marketFilter));
    }
  }
  function r48R38Viewport(parent){
    if(!parent||parent.dataset.r48Viewport==='1')return;
    parent.dataset.r48Viewport='1';
    const SOURCE_H=1672,CROP_TOP=50,CROP_BOTTOM=55,CONTENT_H=SOURCE_H-CROP_TOP-CROP_BOTTOM;
    const remapTop=p=>((p/100*SOURCE_H-CROP_TOP)/CONTENT_H*100);
    const remapSize=p=>(p/100*SOURCE_H/CONTENT_H*100);

    /* R51: zwiększamy wyłącznie pionowe pole widzenia. Skala środkowej części pozostaje jak w R50. */
    parent.style.setProperty('width','min(100vw,720px)','important');
    parent.style.setProperty('max-width','100vw','important');
    parent.style.setProperty('height','auto','important');
    parent.style.setProperty('min-height','0','important');
    parent.style.setProperty('max-height','none','important');
    parent.style.setProperty('aspect-ratio','941 / 1911','important');
    parent.style.setProperty('margin','0 auto','important');
    parent.style.setProperty('overflow','hidden','important');
    parent.style.setProperty('touch-action','pan-x pan-y pinch-zoom','important');
    parent.style.setProperty('overscroll-behavior','auto','important');

    const master=parent.querySelector(':scope > img.master');
    if(master){
      master.style.setProperty('top',(-CROP_TOP/CONTENT_H*100)+'%','important');
      master.style.setProperty('left','0','important');
      master.style.setProperty('width','100%','important');
      master.style.setProperty('height',(SOURCE_H/CONTENT_H*100)+'%','important');
      master.style.setProperty('bottom','auto','important');
      master.style.setProperty('object-fit','fill','important');
    }

    [...parent.children].forEach(el=>{
      if(el===master)return;
      if(el.classList.contains('r38-sync-glyph')){
        el.style.setProperty('left','82.05%','important');
        el.style.setProperty('top',remapTop(5.96)+'%','important');
        el.style.setProperty('width','11.60%','important');
        el.style.setProperty('height','auto','important');
        el.style.setProperty('aspect-ratio','1 / 1','important');
        el.style.setProperty('border','3px solid #76ff00','important');
        el.style.setProperty('border-radius','50%','important');
        el.style.setProperty('background','#020302','important');
        el.style.setProperty('box-shadow','0 0 0 10px #000, 0 0 14px 10px rgba(96,255,0,.35), inset 0 0 10px rgba(80,255,0,.12)','important');
        el.style.setProperty('padding','1.6%','important');
        el.style.setProperty('box-sizing','border-box','important');
        el.style.setProperty('display','grid','important');
        el.style.setProperty('place-items','center','important');
        const svg=el.querySelector('svg');
        if(svg){svg.style.setProperty('width','78%','important');svg.style.setProperty('height','78%','important');svg.style.setProperty('margin','auto','important');svg.style.setProperty('display','block','important');svg.style.setProperty('transform-origin','50% 50%','important');}
        return;
      }
      const top=el.style.top,height=el.style.height;
      if(top&&top.endsWith('%'))el.style.setProperty('top',remapTop(parseFloat(top))+'%','important');
      if(height&&height.endsWith('%'))el.style.setProperty('height',remapSize(parseFloat(height))+'%','important');
      if(el.classList.contains('hotspot')){
        const label=el.getAttribute('aria-label')||'';
        if(label==='Wstecz do pulpitu'){
          el.style.setProperty('touch-action','manipulation','important');
          el.style.setProperty('z-index','260','important');
        }else{
          el.style.setProperty('touch-action','pan-x pan-y pinch-zoom','important');
        }
      }
    });

    /* R51: mikromaska tylko na samej krawędzi; nie wchodzi już na logo CRM. */
    const topOvalMask=document.createElement('div');
    topOvalMask.className='r51-r38-top-edge-mask';
    Object.assign(topOvalMask.style,{position:'absolute',zIndex:'199',left:'47%',top:'0',width:'6%',height:'.55%',background:'#000',pointerEvents:'none'});
    parent.append(topOvalMask);

    const app=document.getElementById('app'),body=document.body,html=document.documentElement;
    const saved={bodyOverflowY:body.style.overflowY,bodyOverflowX:body.style.overflowX,bodyTouch:body.style.touchAction,htmlOverflowY:html.style.overflowY,htmlOverflowX:html.style.overflowX,htmlTouch:html.style.touchAction,appMinHeight:app?.style.minHeight||'',appOverflow:app?.style.overflow||'',appTouch:app?.style.touchAction||'',appPadding:app?.style.paddingBottom||''};
    body.style.setProperty('overflow-y','auto','important');body.style.setProperty('overflow-x','hidden','important');body.style.setProperty('touch-action','pan-x pan-y pinch-zoom','important');
    html.style.setProperty('overflow-y','auto','important');html.style.setProperty('overflow-x','hidden','important');html.style.setProperty('touch-action','pan-x pan-y pinch-zoom','important');
    if(app){app.style.setProperty('min-height','calc(100dvh + 112px)','important');app.style.setProperty('overflow','visible','important');app.style.setProperty('touch-action','pan-x pan-y pinch-zoom','important');app.style.setProperty('padding-bottom','112px','important');}
    const restore=()=>{
      body.style.overflowY=saved.bodyOverflowY;body.style.overflowX=saved.bodyOverflowX;body.style.touchAction=saved.bodyTouch;
      html.style.overflowY=saved.htmlOverflowY;html.style.overflowX=saved.htmlOverflowX;html.style.touchAction=saved.htmlTouch;
      if(app){app.style.minHeight=saved.appMinHeight;app.style.overflow=saved.appOverflow;app.style.touchAction=saved.appTouch;app.style.paddingBottom=saved.appPadding;}
    };
    if(app){const mo=new MutationObserver(()=>{if(!parent.isConnected){restore();mo.disconnect()}});mo.observe(app,{childList:true});}
  }
`;
    out=out.replace(helperMarker,helperMarker+helper);
  }
  return out;
}

async function r48PatchIndexResponse(response){
  try{
    const text=await response.text();
    const patched=r48PatchIndexHtml(text);
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
    if(raw&&raw.ok){const patched=await r48PatchIndexResponse(raw);await c.put('./index.html',patched.clone());await c.put('./',patched.clone());}
  }catch{}
  await self.skipWaiting();
})());});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k!==CACHE&&k.startsWith('crm-pelet-')).map(k=>caches.delete(k)));await self.clients.claim();})());});

async function fetchFresh(req){try{return await fetch(new Request(req,{cache:'no-store'}));}catch{return null;}}
async function cachePut(key,response){if(response&&response.ok){const c=await caches.open(CACHE);await c.put(key,response.clone());}}
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url);
  if(e.request.mode==='navigate'){
    e.respondWith((async()=>{
      const fresh=await fetchFresh(e.request);
      if(fresh&&fresh.ok){const patched=await r48PatchIndexResponse(fresh);await cachePut('./index.html',patched.clone());return patched;}
      return (await caches.match('./index.html'))||(await caches.match('./'))||Response.error();
    })());
    return;
  }
  if(url.pathname.endsWith('/version.json')||url.pathname.endsWith('/backup-catalog.json')||url.pathname.endsWith('/crm-data.json')||url.pathname.endsWith('/assistant-feed.json')||url.pathname.endsWith('/sw.js')||/master-waluty-karta[1-4]\.png$/.test(url.pathname)){
    e.respondWith((async()=>{const fresh=await fetchFresh(e.request);if(fresh&&fresh.ok){await cachePut(e.request,fresh);return fresh;}return (await caches.match(e.request))||Response.error();})());
    return;
  }
  e.respondWith((async()=>{const cached=await caches.match(e.request);if(cached)return cached;const fresh=await fetchFresh(e.request);if(fresh&&fresh.ok)await cachePut(e.request,fresh);return fresh||Response.error();})());
});