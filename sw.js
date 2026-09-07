/* R93 — RYNKI EU / KARTA 1 DANE FIRMY MASTER 1:1
   Baza: zamrożony R92 SURGICAL CLEAN BASELINE.
   Zakres tej wersji: WYŁĄCZNIE kafel DANE FIRMY w ostatnim oknie kontrahenta.
   Po naciśnięciu kafla otwierana jest pełna dedykowana karta na rastrze
   master-firma-koniec.png 1:1. Pozostałe karty pozostają nietknięte.
*/
importScripts('./sw-r76-stable.js?v=R76-stable-clean-base');

self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));

if(Array.isArray(ASSETS) && !ASSETS.includes('./r84-backup-prune.js')) ASSETS.push('./r84-backup-prune.js');
if(Array.isArray(ASSETS) && !ASSETS.includes('./master-firma-koniec.png')) ASSETS.push('./master-firma-koniec.png');

const r93BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r93BasePatchIndexHtml(text);
  out = out.replaceAll('1.3.0-master-r76-waluty-karta4-surgical-gauge-clean','1.3.0-master-r93-dane-firmy-master-1to1');
  out = out.replaceAll('R76 WALUTY KARTA 4 SURGICAL GAUGE CLEAN','R93 DANE FIRMY MASTER 1:1');
  out = out.replace("const BUILD_DATE = '02.09.2026';","const BUILD_DATE = '07.09.2026';");
  out = out.replace("const BUILD_TIME = '17:58';","const BUILD_TIME = '13:07';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R76-waluty-karta4-surgical-gauge-clean-1758'","navigator.serviceWorker.register('./sw.js?v=R93-dane-firmy-master-1to1-1307'");

  if(!out.includes('r84-backup-prune.js')){
    out = out.replace('</body>','<script src="./r84-backup-prune.js?v=R93-1307"></script>\n</body>');
  }else{
    out = out.replace(/r84-backup-prune\.js\?v=[^\"']+/g,'r84-backup-prune.js?v=R93-1307');
  }

  const anchor='renderCompany=renderCompanyR15;';
  if(out.includes(anchor) && !out.includes('function r93OpenDataMaster')){
    const code=String.raw`
  const r93OriginalOpenSection=r15OpenSection;
  function r93Esc(v){return r13Esc(String(v??''))}
  function r93Val(v,fallback='brak danych'){const s=String(v??'').trim();return s||fallback}
  function r93Manual(c){try{const all=JSON.parse(localStorage.getItem('crm13_company_manual_updates_v1')||'{}');return all[c.id]||{}}catch{return {}}}
  function r93Merged(c){return Object.assign({},c||{},r93Manual(c||{}))}
  function r93Role(c){const rr=marketRolesFor(c);return (rr&&rr.length?rr.join(' / '):(c.role||c.type||c.category||'KONTRAHENT')).toUpperCase()}
  function r93CloseDataMaster(){const x=document.querySelector('.r93-master-overlay');if(x)x.remove();document.body.classList.remove('r93-master-open')}
  function r93Tel(c){const p=String(c.phone||c.mobile||'').replace(/[^+0-9]/g,'');if(p)location.href='tel:'+p;else toast('Brak numeru telefonu.')}
  function r93Mail(c){const e=String(c.email||'').trim();if(e)location.href='mailto:'+e;else toast('Brak adresu e-mail.')}
  function r93Web(c){const w=String(c.website||c.www||'').trim();if(w)window.open(/^https?:/i.test(w)?w:'https://'+w,'_blank','noopener');else toast('Brak strony WWW.')}
  function r93Google(c){const q=[c.name,c.city,c.countryName,c.type,'pellet'].filter(Boolean).join(' ');window.open('https://www.google.com/search?q='+encodeURIComponent(q),'_blank','noopener')}
  function r93Editor(raw){
    const key='crm13_company_manual_updates_v1';let map={};try{map=JSON.parse(localStorage.getItem(key)||'{}')}catch{}
    const c=r93Merged(raw);
    sheetTitle.textContent='AKTUALIZUJ DANE — '+r93Val(c.name,'FIRMA');
    sheetContent.innerHTML='<input class="sheet-input" data-r93-f="contactPerson" placeholder="Osoba kontaktowa" value="'+r93Esc(c.contactPerson||c.contact)+'">'+
      '<input class="sheet-input" data-r93-f="address" placeholder="Adres" value="'+r93Esc(c.address)+'">'+
      '<input class="sheet-input" data-r93-f="phone" placeholder="Telefon" value="'+r93Esc(c.phone)+'">'+
      '<input class="sheet-input" data-r93-f="mobile" placeholder="Telefon komórkowy" value="'+r93Esc(c.mobile)+'">'+
      '<input class="sheet-input" data-r93-f="email" placeholder="E-mail" value="'+r93Esc(c.email)+'">'+
      '<input class="sheet-input" data-r93-f="website" placeholder="Strona WWW" value="'+r93Esc(c.website||c.www)+'">'+
      '<input class="sheet-input" data-r93-f="vat" placeholder="NIP / VAT" value="'+r93Esc(c.vat||c.nip)+'">'+
      '<input class="sheet-input" data-r93-f="activity" placeholder="Rodzaj działalności" value="'+r93Esc(c.activity||c.type)+'">'+
      '<input class="sheet-input" data-r93-f="year" placeholder="Rok założenia" value="'+r93Esc(c.year)+'">'+
      '<button class="sheet-action green wide" data-r93-save>ZAPISZ DANE</button>';
    sheetContent.querySelector('[data-r93-save]').onclick=()=>{const patch={};sheetContent.querySelectorAll('[data-r93-f]').forEach(i=>patch[i.dataset.r93F]=i.value.trim());patch.updatedAt=new Date().toISOString();map[raw.id]={...(map[raw.id]||{}),...patch};localStorage.setItem(key,JSON.stringify(map));closeSheet();r93CloseDataMaster();setTimeout(()=>r93OpenDataMaster(raw),0);toast('✓ Dane zapisane.')};
    sheet.hidden=false;
  }
  function r93Layer(root,x,y,w,h,html,cls){const d=document.createElement('div');d.className='r93-live '+(cls||'');Object.assign(d.style,{left:(x/709*100)+'%',top:(y/1536*100)+'%',width:(w/709*100)+'%',height:(h/1536*100)+'%'});d.innerHTML=html;root.appendChild(d);return d}
  function r93Mask(root,x,y,w,h,cls){const d=document.createElement('div');d.className='r93-mask '+(cls||'');Object.assign(d.style,{left:(x/709*100)+'%',top:(y/1536*100)+'%',width:(w/709*100)+'%',height:(h/1536*100)+'%'});root.appendChild(d);return d}
  function r93OpenDataMaster(raw){
    if(!raw)return;
    r93CloseDataMaster();
    const c=r93Merged(raw),isOpole=(raw.id==='sklad-opalu-opole-pl');
    const modal=document.createElement('div');modal.className='r93-master-overlay';modal.setAttribute('role','dialog');modal.setAttribute('aria-label','DANE FIRMY — '+r93Val(c.name,'FIRMA'));
    const root=document.createElement('div');root.className='r93-master-canvas';modal.appendChild(root);
    const img=document.createElement('img');img.className='r93-master-image';img.src='./master-firma-koniec.png?v=R93-1307';img.alt='DANE FIRMY MASTER';root.appendChild(img);

    if(!isOpole){
      r93Mask(root,35,154,112,101,'flag-mask');
      const fi=document.createElement('img');fi.className='r93-dynamic-flag';fi.src=r15Flag(c.countryCode);fi.alt='';Object.assign(fi.style,{left:(42/709*100)+'%',top:(166/1536*100)+'%',width:(96/709*100)+'%',height:(76/1536*100)+'%'});root.appendChild(fi);

      r93Mask(root,150,154,535,103,'header-mask');
      r93Layer(root,153,158,520,72,'<b>'+r93Esc(r93Val(c.name,'FIRMA'))+'</b><span>'+r93Esc(r93Val(c.activity||c.type||c.category,r93Role(c)))+'</span>','headtxt');
      r93Mask(root,545,154,140,28,'id-mask');r93Layer(root,545,156,136,25,'ID: '+r93Esc(r93Val(c.id,'—')),'idtxt');

      r93Mask(root,34,259,650,55,'badges-mask');
      r93Layer(root,39,263,640,47,'<span class="blue">📍 '+r93Esc(r93Val(c.countryName||c.country,'—'))+'</span><span class="green">◉ '+r93Esc(r93Val(c.city,'—'))+'</span><span class="gold">'+r93Esc(r93Val(c.type||c.category,'KONTRAHENT'))+'</span><span class="red">'+r93Esc(r93Role(c))+'</span>','badges');

      r93Mask(root,499,337,179,137,'logo-mask');
      const logo=(c.logo||c.logoUrl||'').trim();
      if(logo){const li=document.createElement('img');li.className='r93-company-logo';li.src=logo;li.alt='';Object.assign(li.style,{left:(510/709*100)+'%',top:(349/1536*100)+'%',width:(157/709*100)+'%',height:(112/1536*100)+'%'});root.appendChild(li)}
      else r93Layer(root,510,349,157,112,'<strong>'+r93Esc(r93Val(c.name,'FIRMA'))+'</strong>','logo-placeholder');

      const rows=[[252,r93Val(c.name)],[292,r93Val(c.contactPerson||c.contact,'Dział handlowy')],[334,r93Val(c.address||[c.city,c.countryName].filter(Boolean).join(', '))],[417,r93Val(c.phone)],[457,r93Val(c.mobile)],[499,r93Val(c.email)],[539,r93Val(c.website||c.www)],[579,r93Val(c.vat||c.nip)],[622,r93Val(c.activity||c.type||c.category)],[694,r93Val(c.year)]];
      rows.forEach(([y,v])=>{r93Mask(root,248,y,235,36,'row-mask');r93Layer(root,248,y,235,36,r93Esc(v),'rowtxt')});

      r93Mask(root,88,786,575,141,'product-mask');
      const products=Array.isArray(c.products)?c.products.join(', '):(c.products||c.product||c.offer||'Pellet drzewny');
      r93Layer(root,92,790,565,132,r93Esc(r93Val(products))+'<span>'+r93Esc(r93Val(c.availability||c.notes||c.direction,'Dane handlowe do uzupełnienia'))+'</span>','producttxt');

      r93Mask(root,200,970,480,210,'status-mask');
      const st=r15GetStatus(raw.id)||c.status||'NOWY';
      r93Layer(root,204,975,470,200,'<b>● '+r93Esc(String(st).replaceAll('_',' '))+'</b><div>Ostatni kontakt: '+r93Esc(r93Val(c.lastContact,'brak danych'))+'</div><div>Następny kontakt: '+r93Esc(r93Val(c.nextContact||c.nextFollowUp,'brak danych'))+'</div><div>Cel kontaktu: '+r93Esc(r93Val(c.followUp||c.nextStep||c.goal||c.missingInfo,'Uzupełnić dane handlowe'))+'</div><div>Notatka: '+r93Esc(r93Val(Array.isArray(c.notes)?c.notes[0]:c.notes,'—'))+'</div>','statustxt');

      r93Mask(root,30,1192,652,66,'meta-mask');
      r93Layer(root,34,1196,644,58,'Data dodania: '+r93Esc(r93Val(c.createdAt||c.addedAt,'—'))+'  •  Ostatnia aktualizacja: '+r93Esc(r93Val(c.updatedAt,'—'))+'  •  L&M','metatxt');
    }

    const BW=709,BH=1536;
    root.append(hotspot({x:18,y:10,w:105,h:105,label:'Wstecz do karty',onClick:r93CloseDataMaster,z:220,baseW:BW,baseH:BH}));
    root.append(hotspot({x:578,y:8,w:116,h:110,label:'Synchronizuj',onClick:()=>sync('✓ Dane firmy zsynchronizowane'),z:220,baseW:BW,baseH:BH}));
    root.append(hotspot({x:240,y:407,w:248,h:46,label:'Telefon',onClick:()=>r93Tel(c),z:220,baseW:BW,baseH:BH}));
    root.append(hotspot({x:240,y:492,w:248,h:45,label:'E-mail',onClick:()=>r93Mail(c),z:220,baseW:BW,baseH:BH}));
    root.append(hotspot({x:240,y:533,w:248,h:45,label:'Strona WWW',onClick:()=>r93Web(c),z:220,baseW:BW,baseH:BH}));
    root.append(hotspot({x:494,y:485,w:190,h:76,label:'Pokaż na mapie',onClick:()=>r19OpenCompanyMap(c),z:220,baseW:BW,baseH:BH}));
    root.append(hotspot({x:23,y:1295,w:315,h:90,label:'Uaktualnij dane',onClick:()=>r93Editor(raw),z:220,baseW:BW,baseH:BH}));
    root.append(hotspot({x:343,y:1295,w:343,h:90,label:'Szukaj danych w Google',onClick:()=>r93Google(c),z:220,baseW:BW,baseH:BH}));
    root.append(hotspot({x:23,y:1390,w:663,h:92,label:'Wróć do karty',onClick:r93CloseDataMaster,z:220,baseW:BW,baseH:BH}));
    document.body.appendChild(modal);document.body.classList.add('r93-master-open');
  }
  r15OpenSection=function(c,sec){if(sec==='data')return r93OpenDataMaster(c);return r93OriginalOpenSection(c,sec)};`;
    out=out.replace(anchor,anchor+code);
  }

  const style=String.raw`<style id="r93-dane-firmy-master-1to1">
body.r93-master-open{overflow:hidden!important}
.r93-master-overlay{position:fixed;z-index:10000;inset:0;background:#000;overflow:auto;display:flex;justify-content:center;align-items:flex-start;overscroll-behavior:contain}
.r93-master-canvas{position:relative;width:min(100vw,709px);aspect-ratio:709/1536;background:#000;flex:0 0 auto;overflow:hidden}
.r93-master-image{position:absolute;z-index:1;inset:0;width:100%;height:100%;display:block;object-fit:fill;pointer-events:none}
.r93-master-canvas .hotspot,.r93-master-canvas .wm-hot{z-index:220!important;background:transparent!important;border:0!important;box-shadow:none!important;touch-action:manipulation!important}
.r93-mask,.r93-live,.r93-dynamic-flag,.r93-company-logo{position:absolute;box-sizing:border-box}
.r93-mask{z-index:35;background:#020b07}
.r93-live{z-index:40;color:#f5f5f5;font-family:Arial,Roboto,sans-serif;overflow:hidden;line-height:1.12}
.r93-dynamic-flag,.r93-company-logo{z-index:41;object-fit:contain;background:#020b07}
.r93-live.headtxt{display:block!important;font-size:clamp(13px,4.1vw,29px)!important;font-weight:800!important;padding:2px 4px!important;white-space:normal!important}.r93-live.headtxt span{display:block;font-size:.58em;font-weight:500;color:#d0d0d0;margin-top:3px}
.r93-live.idtxt{display:flex!important;align-items:center!important;justify-content:flex-end!important;color:#d7d7d7!important;font-size:clamp(7px,1.9vw,13px)!important;white-space:nowrap!important}
.r93-live.badges{display:flex!important;align-items:center!important;gap:5px!important;font-size:clamp(7px,1.9vw,13px)!important;font-weight:800!important;white-space:nowrap!important}.r93-live.badges span{padding:5px 7px;border:1px solid currentColor;border-radius:7px;background:#06110c}.r93-live.badges .blue{color:#48b6ff}.r93-live.badges .green{color:#56ff24}.r93-live.badges .gold{color:#ffd13a}.r93-live.badges .red{color:#ff5b55}
.r93-live.logo-placeholder{display:flex!important;align-items:center!important;justify-content:center!important;text-align:center!important;color:#fff!important;font-size:clamp(10px,2.7vw,18px)!important;font-weight:900!important;padding:8px!important;border:1px solid #c79b20;border-radius:8px;background:#f7f4ea!important;color:#171717!important}
.r93-live.rowtxt{display:flex!important;align-items:center!important;font-size:clamp(8px,2.25vw,16px)!important;font-weight:500!important;white-space:normal!important;padding:0 3px!important;color:#f0f0f0!important}
.r93-live.producttxt{display:block!important;font-size:clamp(8px,2.25vw,16px)!important;padding:5px 3px!important;color:#f3f3f3!important}.r93-live.producttxt span{display:block;margin-top:8px;color:#e3e3e3}
.r93-live.statustxt{display:block!important;font-size:clamp(7px,1.9vw,14px)!important;padding:3px 2px!important;color:#eee!important}.r93-live.statustxt b{display:block;color:#55ff22!important;font-size:1.07em;margin-bottom:5px}.r93-live.statustxt div{margin:5px 0}
.r93-live.metatxt{display:flex!important;align-items:center!important;justify-content:center!important;text-align:center!important;font-size:clamp(6px,1.65vw,12px)!important;color:#d5d5d5!important;padding:2px 5px!important}
</style>`;
  out=out.replace('</head>',style+'\n</head>');
  return out;
};
