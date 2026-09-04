/* R90 — RYNKI EU / DANE FIRMY SINGLE MASTER LIVE
   Zasada: jeden renderer DANE FIRMY dla KAŻDEJ wybranej firmy.
   Stare renderery / popupy DANE FIRMY są całkowicie odłączone od trasy.
   Warstwa wizualna korzysta wyłącznie z MASTER-a; dane i akcje są warstwą LIVE.
*/
importScripts('./sw-r76-stable.js?v=R76-stable-clean-base');

self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));

if(Array.isArray(ASSETS) && !ASSETS.includes('./master-firma-koniec.png')) ASSETS.push('./master-firma-koniec.png');
if(Array.isArray(ASSETS) && !ASSETS.includes('./r84-backup-prune.js')) ASSETS.push('./r84-backup-prune.js');

const r90BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r90BasePatchIndexHtml(text);

  const VERSION='1.3.0-master-r90-dane-firmy-single-master-live';
  const RELEASE='R90 DANE FIRMY SINGLE MASTER LIVE';
  out = out.replace(/1\.3\.0-master-r(?:76|85|86|87|88|89)[^'\"<\s]*/g,VERSION);
  out = out.replace(/R(?:76|85|86|87|88|89)[^<'\"\n]*(?:CLEAN|PRUNE|MASTER|GATE|ROUTE|FORCE|CARDS)?/g,m=>m.includes('WALUTY')?m:RELEASE);
  out = out.replace(/navigator\.serviceWorker\.register\('\.\/sw\.js\?v=[^']+'/g,"navigator.serviceWorker.register('./sw.js?v=R90-dane-firmy-single-master-live'");
  out = out.replace("const BUILD_DATE = '02.09.2026';","const BUILD_DATE = '04.09.2026';");
  out = out.replace(/const BUILD_TIME = '[0-9]{2}:[0-9]{2}';/,"const BUILD_TIME = '16:10';");

  if(!out.includes('r84-backup-prune.js')){
    out = out.replace('</body>','<script src="./r84-backup-prune.js?v=R90"></script>\n</body>');
  }

  const anchor='renderCompany=renderCompanyR15;';
  if(out.includes(anchor) && !out.includes('function renderCompanyR90')){
    const code=String.raw`
  function r90Esc(v){return r13Esc(String(v??''))}
  function r90Val(v,fallback='brak danych'){const s=String(v??'').trim();return s||fallback}
  function r90Manual(c){
    try{const all=JSON.parse(localStorage.getItem('crm13_company_manual_updates_v1')||'{}');return all[c.id]||{}}catch{return {}}
  }
  function r90Merged(c){return Object.assign({},c||{},r90Manual(c||{}))}
  function r90Back(c){return c&&c.countryCode==='DE'?'germany':'country'}
  function r90Tel(c){const p=String(c.phone||c.mobile||'').replace(/[^+0-9]/g,''); if(p) location.href='tel:'+p; else toast('Brak numeru telefonu.')}
  function r90Mail(c){const e=String(c.email||'').trim(); if(e) location.href='mailto:'+e; else toast('Brak adresu e-mail.')}
  function r90Web(c){const w=String(c.website||c.www||'').trim(); if(w) window.open(/^https?:/i.test(w)?w:'https://'+w,'_blank','noopener'); else toast('Brak strony WWW.')}
  function r90Google(c){
    const q=[c.name,c.city,c.countryName,c.role,'pellet'].filter(Boolean).join(' ');
    window.open('https://www.google.com/search?q='+encodeURIComponent(q),'_blank','noopener');
  }
  function r90Editor(c){
    const key='crm13_company_manual_updates_v1'; let map={}; try{map=JSON.parse(localStorage.getItem(key)||'{}')}catch{}
    const x=r90Merged(c);
    sheetTitle.textContent='AKTUALIZUJ DANE — '+r90Val(x.name,'FIRMA');
    sheetContent.innerHTML=
      '<input class="sheet-input" data-f="contactPerson" placeholder="Osoba kontaktowa" value="'+r90Esc(x.contactPerson)+'">'+
      '<input class="sheet-input" data-f="address" placeholder="Adres" value="'+r90Esc(x.address)+'">'+
      '<input class="sheet-input" data-f="phone" placeholder="Telefon" value="'+r90Esc(x.phone)+'">'+
      '<input class="sheet-input" data-f="mobile" placeholder="Telefon komórkowy" value="'+r90Esc(x.mobile)+'">'+
      '<input class="sheet-input" data-f="email" placeholder="E-mail" value="'+r90Esc(x.email)+'">'+
      '<input class="sheet-input" data-f="website" placeholder="Strona WWW" value="'+r90Esc(x.website||x.www)+'">'+
      '<input class="sheet-input" data-f="vat" placeholder="NIP / VAT" value="'+r90Esc(x.vat||x.nip)+'">'+
      '<input class="sheet-input" data-f="activity" placeholder="Rodzaj działalności" value="'+r90Esc(x.activity||x.type)+'">'+
      '<input class="sheet-input" data-f="year" placeholder="Rok założenia" value="'+r90Esc(x.year)+'">'+
      '<button class="sheet-action green wide" data-r90-save>ZAPISZ DANE</button>';
    sheetContent.querySelector('[data-r90-save]').onclick=()=>{
      const patch={}; sheetContent.querySelectorAll('[data-f]').forEach(i=>patch[i.dataset.f]=i.value.trim());
      patch.updatedAt=new Date().toISOString(); map[c.id]={...(map[c.id]||{}),...patch}; localStorage.setItem(key,JSON.stringify(map));
      closeSheet(); toast('✓ Dane zapisane.'); render();
    };
    sheet.hidden=false;
  }
  function r90Box(root,x,y,w,h,html,cls=''){
    const d=document.createElement('div'); d.className='r90-live '+cls;
    Object.assign(d.style,{left:(x/709*100)+'%',top:(y/1536*100)+'%',width:(w/709*100)+'%',height:(h/1536*100)+'%'});
    d.innerHTML=html; root.appendChild(d); return d;
  }
  function r90Mask(root,x,y,w,h,cls=''){
    const d=document.createElement('div'); d.className='r90-mask '+cls;
    Object.assign(d.style,{left:(x/709*100)+'%',top:(y/1536*100)+'%',width:(w/709*100)+'%',height:(h/1536*100)+'%'});
    root.appendChild(d); return d;
  }
  function r90Role(c){return r90Val(c.role||c.type||c.category,'KONTRAHENT').toUpperCase()}
  function r90Availability(c){return r90Val(c.availability||c.offer||c.notes,'Dane handlowe do uzupełnienia')}
  function renderCompanyR90(){
    const raw=getCompanyById(state.selectedCompany)||r15AllCompanies()[0]; if(!raw) return renderMarketsR15();
    const c=r90Merged(raw);
    const s=document.createElement('section'); s.className='r90-company-page';
    const root=document.createElement('div'); root.className='r90-company-canvas'; s.appendChild(root);
    const img=document.createElement('img'); img.className='r90-company-master'; img.src='./master-firma-koniec.png?v=R90'; img.alt='DANE FIRMY'; root.appendChild(img);

    const isOpole=(raw.id==='sklad-opalu-opole-pl');
    if(!isOpole){
      r90Mask(root,150,154,535,106,'head');
      r90Box(root,153,154,535,106,'<b>'+r90Esc(c.name)+'</b><span>'+r90Esc(r90Val(c.activity||c.type||c.category,r90Role(c)))+'</span>','headtxt');
      r90Mask(root,543,154,142,32,'idmask'); r90Box(root,543,154,142,32,'ID: '+r90Esc(r90Val(c.id,'—')),'idtxt');
      r90Mask(root,36,257,648,59,'badgemask');
      r90Box(root,36,257,648,59,'<span>📍 '+r90Esc(r90Val(c.countryName||c.country,'Polska'))+'</span><span>◉ '+r90Esc(r90Val(c.city,'—'))+'</span><span>'+r90Esc(r90Role(c))+'</span>','badges');

      const rows=[
        [252, r90Val(c.name)], [292,r90Val(c.contactPerson||c.contact,'Dział handlowy')], [334,r90Val(c.address||[c.city,c.countryName].filter(Boolean).join(', '))],
        [417,r90Val(c.phone)], [457,r90Val(c.mobile)], [499,r90Val(c.email)], [539,r90Val(c.website||c.www)], [579,r90Val(c.vat||c.nip)],
        [622,r90Val(c.activity||c.type||c.category)], [694,r90Val(c.year)]
      ];
      rows.forEach(([y,v])=>{r90Mask(root,248,y,236,36,'rowmask'); r90Box(root,248,y,236,36,r90Esc(v),'rowtxt')});
      r90Mask(root,88,786,575,140,'productmask');
      r90Box(root,88,786,575,140,r90Esc(r90Val(c.products||c.product||c.offer,'Pellet drzewny'))+'<br><span>'+r90Esc(r90Availability(c))+'</span>','producttxt');
      r90Mask(root,200,970,480,208,'statusmask');
      r90Box(root,200,970,480,208,
        '<div><b>● '+r90Esc(r90Val(c.status,'NOWY').toUpperCase())+'</b></div>'+
        '<div>Ostatni kontakt: '+r90Esc(r90Val(c.lastContact,'brak danych'))+'</div>'+
        '<div>Następny kontakt: '+r90Esc(r90Val(c.nextContact,'brak danych'))+'</div>'+
        '<div>Cel: '+r90Esc(r90Val(c.followUp||c.nextStep||c.goal,'Uzupełnić dane handlowe'))+'</div>','statustxt');
      r90Mask(root,32,1192,650,66,'metamask');
      r90Box(root,32,1192,650,66,'Dodano: '+r90Esc(r90Val(c.createdAt||c.addedAt,'—'))+' &nbsp; • &nbsp; Aktualizacja: '+r90Esc(r90Val(c.updatedAt,'—')),'metatxt');
    }

    const BW=709,BH=1536;
    root.append(hotspot({x:18,y:10,w:104,h:104,label:'Wstecz',onClick:()=>go(r90Back(c)),z:190,baseW:BW,baseH:BH}));
    root.append(hotspot({x:579,y:8,w:114,h:108,label:'Synchronizuj',onClick:()=>sync('✓ Dane firmy zsynchronizowane'),z:190,baseW:BW,baseH:BH}));
    root.append(hotspot({x:240,y:410,w:248,h:42,label:'Telefon',onClick:()=>r90Tel(c),z:190,baseW:BW,baseH:BH}));
    root.append(hotspot({x:240,y:495,w:248,h:42,label:'E-mail',onClick:()=>r90Mail(c),z:190,baseW:BW,baseH:BH}));
    root.append(hotspot({x:240,y:535,w:248,h:42,label:'Strona WWW',onClick:()=>r90Web(c),z:190,baseW:BW,baseH:BH}));
    root.append(hotspot({x:494,y:485,w:190,h:76,label:'Mapa',onClick:()=>r19OpenCompanyMap(c),z:190,baseW:BW,baseH:BH}));
    root.append(hotspot({x:23,y:1295,w:315,h:90,label:'Uaktualnij dane',onClick:()=>r90Editor(raw),z:190,baseW:BW,baseH:BH}));
    root.append(hotspot({x:344,y:1295,w:342,h:90,label:'Szukaj danych w Google',onClick:()=>r90Google(c),z:190,baseW:BW,baseH:BH}));
    root.append(hotspot({x:23,y:1390,w:663,h:92,label:'Wróć do karty',onClick:()=>go(r90Back(c)),z:190,baseW:BW,baseH:BH}));
    return s;
  }
  renderCompany=renderCompanyR90;`;
    out=out.replace(anchor,anchor+code);
  }

  const style=String.raw`<style id="r90-dane-firmy-single-master-live">
.r90-company-page{min-height:100dvh;background:#000;display:flex;justify-content:center;align-items:flex-start;overflow:auto!important;padding:0!important}
.r90-company-canvas{position:relative;width:min(100vw,709px);aspect-ratio:709/1536;background:#000;overflow:hidden}
.r90-company-master{position:absolute;inset:0;width:100%;height:100%;object-fit:fill;display:block;z-index:1}
.r90-company-canvas .wm-hot{z-index:190!important;background:transparent!important;box-shadow:none!important;border:0!important;touch-action:manipulation}
.r90-mask,.r90-live{position:absolute;z-index:40;box-sizing:border-box}
.r90-mask{background:#020b07}
.r90-live{color:#f4f4f4;font-family:Arial,Roboto,sans-serif;display:flex;align-items:center;overflow:hidden;line-height:1.12}
.r90-headtxt{display:block;font-size:clamp(12px,3.9vw,31px);font-weight:700;padding:2px 5px}.r90-headtxt span{display:block;font-size:.62em;font-weight:400;color:#c8c8c8;margin-top:3px}
.r90-idtxt{font-size:clamp(7px,1.8vw,14px);justify-content:flex-end;color:#d5d5d5}.r90-badges{gap:8px;font-size:clamp(7px,2vw,15px);font-weight:700}.r90-badges span{border:1px solid #b88a00;border-radius:7px;padding:5px 8px;background:#06110c}
.r90-rowtxt{font-size:clamp(8px,2.25vw,17px);font-weight:500;white-space:normal}.r90-producttxt{display:block;font-size:clamp(8px,2.25vw,17px);padding:6px}.r90-producttxt span{display:block;margin-top:8px;color:#e7e7e7}
.r90-statustxt{display:block;font-size:clamp(7px,2vw,15px);padding:5px 0}.r90-statustxt div{margin:6px 0}.r90-statustxt b{color:#50ff1a}.r90-metatxt{font-size:clamp(6px,1.7vw,13px);justify-content:center;color:#d0d0d0;text-align:center}
</style>`;
  out=out.replace('</head>',style+'\n</head>');
  return out;
};
