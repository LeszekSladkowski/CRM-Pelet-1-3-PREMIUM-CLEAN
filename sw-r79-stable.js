/* R79 — RYNKI EU: 4 ostatnie okna firmy jako żywe karty 1:1 na wspólnym rekordzie CRM.
   BAZA: R76 bez zmian. R79 dodaje wyłącznie końcówkę gałęzi RYNKI EU.
   DANE FIRMY ↔ CENY I OFERTA ↔ NOTATKI ASYSTENTA ↔ AKCJE I STATUS.
   Jedno źródło stanu per firma: crm13_r79_company_state. */
importScripts('./sw-r76-stable.js?v=R76-frozen');

const R79_ASSETS=['./r79-dane-firmy-master.jpg','./r79-ceny-oferta-master.jpg','./r79-notatki-master.jpg','./r79-akcje-status-master.jpg'];
if(Array.isArray(ASSETS))R79_ASSETS.forEach(a=>{if(!ASSETS.includes(a))ASSETS.push(a)});

const r79BasePatchIndexHtml=r48PatchIndexHtml;
r48PatchIndexHtml=function(text){
  let out=r79BasePatchIndexHtml(text);
  out=out.replaceAll('1.3.0-master-r76-waluty-karta4-surgical-gauge-clean','1.3.0-master-r79-rynki-eu-live-company-branch');
  out=out.replaceAll('R76 WALUTY KARTA 4 SURGICAL GAUGE CLEAN','R79 RYNKI EU LIVE COMPANY BRANCH');
  out=out.replace("const BUILD_DATE = '02.09.2026';","const BUILD_DATE = '04.09.2026';");
  out=out.replace("const BUILD_TIME = '17:58';","const BUILD_TIME = '11:32';");
  out=out.replace("navigator.serviceWorker.register('./sw.js?v=R76-waluty-karta4-surgical-gauge-clean-1758'","navigator.serviceWorker.register('./sw.js?v=R79-rynki-eu-live-company-1132'");

  const css=String.raw`<style id="r79-company-live-css">
.r79-company{position:relative;width:min(calc(100vw - 4px),852px)!important;height:auto!important;aspect-ratio:852/1846;background:#000;overflow:hidden;margin:0 auto}
.r79-company .r79-master{position:absolute;inset:0;width:100%;height:100%;object-fit:fill;pointer-events:none;user-select:none}
.r79-hit{position:absolute;z-index:40;border:0;background:transparent;padding:0;touch-action:manipulation}
.r79-live{position:absolute;z-index:30;color:#fff;font-family:Arial,"Roboto Condensed",sans-serif;font-weight:800;line-height:1.12;overflow:hidden;text-shadow:0 1px 3px #000;background:rgba(0,0,0,.78);border-radius:5px;padding:2px 4px;display:flex;align-items:center}
.r79-live.gold{color:#ffd13b}.r79-live.green{color:#72ff00}.r79-live.red{color:#ff4c43}.r79-live.blue{color:#4fc7ff}
.r79-edit{position:absolute;z-index:45;background:rgba(2,8,8,.92);border:1px solid #967300;color:#fff;border-radius:7px;padding:4px 6px;font:800 clamp(11px,3vw,20px)/1.1 Arial,sans-serif;outline:none}
.r79-edit:focus{border-color:#76ff00;box-shadow:0 0 9px rgba(118,255,0,.5)}
.r79-sync-spin{position:absolute;z-index:32;left:84.3%;top:2.3%;width:9.2%;aspect-ratio:1;display:grid;place-items:center;color:#76ff00;font-size:clamp(28px,8vw,58px);font-weight:1000;text-shadow:0 0 10px #39ff00;pointer-events:none;opacity:0}
.r79-company.syncing .r79-sync-spin{opacity:1;animation:r79spin .85s linear infinite}@keyframes r79spin{to{transform:rotate(360deg)}}
.r79-toastmark{position:absolute;z-index:60;left:50%;top:9%;transform:translateX(-50%);background:#061006;border:1px solid #76ff00;color:#8cff4a;border-radius:999px;padding:7px 15px;font-weight:900;box-shadow:0 0 14px rgba(118,255,0,.45)}
</style>`;

  const js=String.raw`<script id="r79-company-live-js">
(()=>{
 const W=852,H=1846,KEY='crm13_r79_company_state';
 const IMG={data:'r79-dane-firmy-master.jpg',offer:'r79-ceny-oferta-master.jpg',notes:'r79-notatki-master.jpg',status:'r79-akcje-status-master.jpg'};
 const esc=v=>String(v??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]));
 const load=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch{return {}}};
 const saveAll=m=>{localStorage.setItem(KEY,JSON.stringify(m));localStorage.setItem('crm13_r79_updated_at',new Date().toISOString())};
 const baseRecord=()=>{try{return getCompanyById(state.selectedCompany)||r15AllCompanies?.().find(x=>x.id===state.selectedCompany)||null}catch{return null}};
 function model(){const b=baseRecord();if(!b)return null;const all=load(),old=all[b.id]||{};return {...b,...old,id:b.id,_view:old._view||'data',tasks:Array.isArray(old.tasks)?old.tasks:[],notesHistory:Array.isArray(old.notesHistory)?old.notesHistory:[],priceHistory:Array.isArray(old.priceHistory)?old.priceHistory:[],statusHistory:Array.isArray(old.statusHistory)?old.statusHistory:[]}}
 function persist(m,patch={},event='AKTUALIZACJA'){const all=load(),now=new Date().toISOString();const next={...(all[m.id]||{}),...patch,updatedAt:now,updatedBy:'L&M'};if(event==='STATUS'&&patch.status){next.statusHistory=[{at:now,value:patch.status},...(next.statusHistory||[])].slice(0,50)};all[m.id]=next;saveAll(all);try{localStorage.setItem('crm13_company_statuses',JSON.stringify({...r15StatusMap(),...(patch.status?{[m.id]:patch.status}:{})}))}catch{};return {...m,...next}}
 const rect=(el,x,y,w,h)=>Object.assign(el.style,{left:x/W*100+'%',top:y/H*100+'%',width:w/W*100+'%',height:h/H*100+'%'});
 function hit(root,r,label,fn){const b=document.createElement('button');b.className='r79-hit';b.type='button';b.setAttribute('aria-label',label);rect(b,...r);b.onclick=e=>{e.preventDefault();e.stopPropagation();fn()};root.append(b);return b}
 function live(root,r,text,cls=''){const d=document.createElement('div');d.className='r79-live '+cls;d.textContent=text;rect(d,...r);root.append(d);return d}
 function edit(root,r,value,onSave){const i=document.createElement('input');i.className='r79-edit';i.value=value||'';rect(i,...r);i.onchange=()=>onSave(i.value.trim());i.onkeydown=e=>{if(e.key==='Enter'){i.blur()}};root.append(i);return i}
 function nav(root,m){hit(root,[18,18,120,120],'Wstecz',()=>{if(m._view==='data'){try{go('company')}catch{history.back()}}else show('data')});hit(root,[690,18,145,145],'Synchronizuj',async()=>{root.classList.add('syncing');try{await sync('✓ CRM i wiadomości zsynchronizowane')}finally{setTimeout(()=>{root.classList.remove('syncing');render()},250)}});const sp=document.createElement('div');sp.className='r79-sync-spin';sp.textContent='⟳';root.append(sp)}
 function switchView(m,v){persist(m,{_view:v});show(v)}
 function common(root,m){nav(root,m);live(root,[648,182,170,34],m.id||'', 'gold')}
 function data(root,m){common(root,m);live(root,[180,215,430,48],m.name||'');live(root,[300,405,300,34],m.contactPerson||'Dział handlowy');live(root,[300,455,330,70],m.address||[m.city,m.countryName].filter(Boolean).join(', '));live(root,[300,548,310,34],m.phone||'brak danych');live(root,[300,598,310,34],m.mobile||'brak danych');live(root,[300,648,350,34],m.email||'brak danych');live(root,[300,698,350,34],m.website||'brak danych');live(root,[300,748,300,34],m.nip||'brak danych');live(root,[300,798,410,62],m.type||m.role||'KONTRAHENT');live(root,[120,925,600,70],m.products||m.availability||'Pellet drzewny — warunki do ustalenia');const st=m.status||r15GetStatus?.(m.id)||'NOWY';live(root,[240,1125,320,38],st,'green');live(root,[250,1245,430,58],m.nextFollowUp||'Ustalić następny kontakt');hit(root,[28,1450,365,105],'Aktualizuj dane',()=>{const val=prompt('Telefon / e-mail / adres — wpisz notatkę aktualizacyjną:','');if(val!=null){persist(m,{dataUpdateNote:val});toast('✓ Dane firmy zapisane we wspólnym rekordzie CRM.');render()}});hit(root,[414,1450,410,105],'Szukaj danych w Google',()=>window.open('https://www.google.com/search?q='+encodeURIComponent(m.name),'_blank','noopener'));hit(root,[24,1575,804,92],'Wróć do karty',()=>{try{go('company')}catch{history.back()}})}
 function offer(root,m){common(root,m);live(root,[130,210,430,44],m.name||'');const price=m.priceText||(m.price?String(m.price):'—');live(root,[185,455,140,34],price,'gold');live(root,[500,455,170,34],m.priceDate||'—');live(root,[215,720,230,34],m.payment||'Do ustalenia');live(root,[215,770,230,34],m.leadTime||'Do ustalenia');live(root,[545,720,190,34],m.transport||'Do ustalenia');live(root,[545,770,190,34],m.incoterm||'Do ustalenia');live(root,[205,1000,450,40],m.lastOfferDate||'Brak danych');hit(root,[610,320,190,62],'Historia cen',()=>openModuleSheet('HISTORIA CEN — '+m.name,(m.priceHistory||[]).map(x=>x.at+' • '+x.value).join('<br>')||'Brak zapisanej historii cen.'));hit(root,[28,1438,370,112],'Aktualizuj ceny',()=>{const v=prompt('Nowa cena / opis ceny:',price==='—'?'':price);if(v!=null&&v.trim()){const now=new Date().toISOString(),hist=[{at:now,value:v.trim()},...(m.priceHistory||[])].slice(0,50);persist(m,{priceText:v.trim(),priceHistory:hist,lastOfferDate:now});toast('✓ Cena zapisana i dostępna w całej gałęzi CRM.');render()}});hit(root,[420,1438,404,112],'Generuj ofertę',()=>{try{sessionStorage.setItem('crm13_offer_company',JSON.stringify(model()));dashboardTiles['oferty'].action()}catch{openModuleSheet('OFERTA — '+m.name,'Kontrahent przekazany do modułu OFERTY.')}});hit(root,[24,1572,804,95],'Wróć do karty',()=>show('data'))}
 function notes(root,m){common(root,m);live(root,[145,215,430,44],m.name||'');live(root,[52,355,740,105],m.aiSummary||r17NotesText?.(m)||'Brak podsumowania AI.');const open=(m.tasks||[]).filter(t=>!t.done).length;live(root,[650,510,140,34],open?'PRIORYTET: '+open:'BRAK PILNYCH','red');hit(root,[45,870,250,62],'Dodaj nowe zadanie',()=>{const t=prompt('Nowe zadanie:','');if(t&&t.trim()){persist(m,{tasks:[...(m.tasks||[]),{id:Date.now(),text:t.trim(),done:false,date:new Date().toISOString()}]});toast('✓ Zadanie zapisane.');render()}});hit(root,[585,900,210,62],'Dodaj notatkę',()=>{const n=prompt('Nowa notatka:','');if(n&&n.trim()){persist(m,{notesHistory:[{at:new Date().toISOString(),text:n.trim(),by:'L&M'},...(m.notesHistory||[])]});toast('✓ Notatka zapisana.');render()}});hit(root,[30,1460,370,105],'Zapisz zmiany',()=>{toast('✓ Wszystkie notatki i zadania są zapisane we wspólnym rekordzie.');render()});hit(root,[420,1460,400,105],'Dodaj raport PDF',()=>openModuleSheet('RAPORT PDF — '+m.name,'Dane tej firmy są przygotowane do przekazania do modułu RAPORTY / PDF.'));hit(root,[24,1580,804,92],'Wróć do karty',()=>show('data'))}
 function status(root,m){common(root,m);live(root,[145,215,430,44],m.name||'');const st=m.status||r15GetStatus?.(m.id)||'NOWY';live(root,[80,405,250,52],st,'green');const statuses=[['NOWY',[25,785,145,155]],['NEGOCJACJE',[185,785,145,155]],['OFERTA_WYSLANA',[345,785,145,155]],['AKTYWNY',[505,785,145,155]],['NIEAKTYWNY',[665,785,145,155]]];statuses.forEach(([v,r])=>hit(root,r,v,()=>{persist(m,{status:v},'STATUS');toast('✓ Status '+v.replaceAll('_',' ')+' zapisany w całym CRM.');render()}));hit(root,[600,355,200,62],'Historia statusów',()=>openModuleSheet('HISTORIA STATUSÓW — '+m.name,(m.statusHistory||[]).map(x=>x.at+' • '+x.value).join('<br>')||'Brak historii.'));hit(root,[40,1000,230,62],'Dodaj akcję',()=>{const t=prompt('Nowa akcja / zadanie:','');if(t&&t.trim()){persist(m,{tasks:[...(m.tasks||[]),{id:Date.now(),text:t.trim(),done:false,date:new Date().toISOString()}]});toast('✓ Akcja dodana.');render()}});hit(root,[25,1505,390,105],'Przejdź do cen i oferty',()=>switchView(m,'offer'));hit(root,[435,1505,390,105],'Przejdź do notatek',()=>switchView(m,'notes'));hit(root,[24,1630,804,92],'Wróć do karty',()=>show('data'))}
 function show(view){const m=model();if(!m)return;const v=view||m._view||'data';const root=document.createElement('section');root.className='screen r79-company';const img=document.createElement('img');img.className='r79-master';img.src=IMG[v]||IMG.data;img.alt='CRM Pelet Premium — '+v;root.append(img);if(v==='offer')offer(root,m);else if(v==='notes')notes(root,m);else if(v==='status')status(root,m);else data(root,m);app.replaceChildren(root);window.scrollTo({top:0,left:0,behavior:'auto'})}
 const oldRenderCompany=renderCompany;
 renderCompany=function(){const m=model();if(!m)return oldRenderCompany();const root=document.createElement('section');root.className='screen r79-company';const img=document.createElement('img');img.className='r79-master';img.src=IMG.data;root.append(img);data(root,m);return root};
 // Przejmujemy cztery zatwierdzone sekcje na istniejącej karcie firmy bez zmiany wcześniejszych kart RYNKI EU.
 document.addEventListener('click',e=>{const b=e.target.closest?.('[data-sec]');if(!b||state?.route!=='company')return;const v=b.dataset.sec;if(!['data','offer','notes','status'].includes(v))return;e.preventDefault();e.stopImmediatePropagation();show(v)},true);
 window.r79CompanyShow=show;
})();
</script>`;
  out=out.replace('</head>',css+'\n</head>');
  out=out.replace('</body>',js+'\n</body>');
  return out;
};