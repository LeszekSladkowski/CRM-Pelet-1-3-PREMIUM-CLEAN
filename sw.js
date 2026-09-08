/* R118 — CRM 1.3 — KAFEL 1 „DANE FIRMY” — PERFECT ALIGNMENT
   Baza: działający R117 DANE FIRMY — ACTIVE TEST.
   Jedyna zmiana: chirurgiczne ustawienie pól tekstowych na zatwierdzonej grafice MASTER.
   Funkcje R117 i pozostałe 6 kafli OKNA 3 pozostają bez zmian.
*/
importScripts('./sw-r76-stable.js?v=R118-dane-firmy-perfect-alignment');

if(Array.isArray(ASSETS)){
  const r102MaskableDuplicate='./icon-maskable-512.png';
  const r102MaskableDuplicateIndex=ASSETS.indexOf(r102MaskableDuplicate);
  if(r102MaskableDuplicateIndex>=0) ASSETS.splice(r102MaskableDuplicateIndex,1);
  if(!ASSETS.includes('./r84-backup-prune.js')) ASSETS.push('./r84-backup-prune.js');
  if(!ASSETS.includes('./grafiki/rynki-eu/szczegoly-firmy/master-okno-3-szczegoly-firmy.png')) ASSETS.push('./grafiki/rynki-eu/szczegoly-firmy/master-okno-3-szczegoly-firmy.png');
  if(!ASSETS.includes('./grafiki/rynki-eu/szczegoly-firmy/file_00000000efac81f5a82658b087ae09a7.png')) ASSETS.push('./grafiki/rynki-eu/szczegoly-firmy/file_00000000efac81f5a82658b087ae09a7.png');
}

const r102BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r102BasePatchIndexHtml(text);

  out = out.replaceAll('await r38CleanBackupWarehouseOnce();','');
  out = out.replaceAll("if(catalog[0]){catalog[0].current=true;catalog[0].description='MEGA STABILNY MASTER — oficjalny punkt powrotu R38.';}","");
  out = out.replaceAll(
    'Automatyczny backup danych jest tworzony przed aktualizacją. Punkty powrotu MASTER są przechowywane w pakiecie <b>backups/</b> i mogą zostać pobrane do przywrócenia.',
    'Automatyczny backup danych jest tworzony przed aktualizacją. Lokalne kopie danych pozostają w Magazynie Backupów, a zweryfikowane punkty MASTER są zabezpieczone w repozytorium GitHub.'
  );

  out = out.replaceAll('1.3.0-master-r76-waluty-karta4-surgical-gauge-clean','1.3.0-master-r118-dane-firmy-perfect-alignment');
  out = out.replaceAll('R76 WALUTY KARTA 4 SURGICAL GAUGE CLEAN','R118 DANE FIRMY — PERFECT ALIGNMENT');
  out = out.replace("const BUILD_DATE = '02.09.2026';","const BUILD_DATE = '08.09.2026';");
  out = out.replace("const BUILD_TIME = '17:58';","const BUILD_TIME = '14:24';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R76-waluty-karta4-surgical-gauge-clean-1758'","navigator.serviceWorker.register('./sw.js?v=R118-dane-firmy-perfect-alignment-1424'");

  if(!out.includes('r84-backup-prune.js')){
    out = out.replace('</body>','<script src="./r84-backup-prune.js?v=R118-1424"></script>\n</body>');
  }else{
    out = out.replace(/r84-backup-prune\.js\?v=[^\"']+/g,'r84-backup-prune.js?v=R118-1424');
  }

  if(!out.includes('r118-dane-firmy-perfect-alignment-inside-iife')){
    const r117Inside = `
  /* r118-dane-firmy-perfect-alignment-inside-iife */
  const R115_COMPANY_IMG='./grafiki/rynki-eu/szczegoly-firmy/master-okno-3-szczegoly-firmy.png';
  const R117_DATA_IMG='./grafiki/rynki-eu/szczegoly-firmy/file_00000000efac81f5a82658b087ae09a7.png';
  const R117_DATA_KEY='crm13_r117_company_data_v1';

  function r115BackRoute(c){ return c && c.countryCode==='DE' ? 'germany' : 'country'; }
  function r115Missing(c,label){ if(typeof r15Missing==='function') return r15Missing(c,label); toast(label+' — brak zweryfikowanych danych'); }
  function r115NewTile(label){ toast(label+' — karta zostanie ożywiona w osobnym kroku MASTER'); }

  function r117ReadStore(){
    try{ const v=JSON.parse(localStorage.getItem(R117_DATA_KEY)||'{}'); return v&&typeof v==='object'?v:{}; }
    catch(e){ return {}; }
  }
  function r117CompanyId(c){ return String((c&&c.id)||state.selectedCompany||'').trim(); }
  function r117Company(c){
    const id=r117CompanyId(c); const all=r117ReadStore();
    return Object.assign({},c||{},id&&all[id]?all[id]:{});
  }
  function r117SaveCompany(c,patch){
    const id=r117CompanyId(c); if(!id) return;
    const all=r117ReadStore();
    all[id]=Object.assign({},all[id]||{},patch||{});
    localStorage.setItem(R117_DATA_KEY,JSON.stringify(all));
  }
  function r117Field(s,text,x,y,w,size,color,weight,align,nowrap){
    if(text===undefined||text===null||String(text).trim()==='') return;
    const e=document.createElement('div'); e.textContent=String(text);
    const minSize=size<=14?9:12;
    e.style.position='absolute'; e.style.left=(x/8.52)+'%'; e.style.top=(y/18.46)+'%'; e.style.width=(w/8.52)+'%';
    e.style.fontSize='clamp('+minSize+'px,'+(size/8.52)+'vw,'+size+'px)'; e.style.lineHeight='1.08'; e.style.color=color||'#fff';
    e.style.fontWeight=weight||'700'; e.style.textAlign=align||'left'; e.style.pointerEvents='none'; e.style.zIndex='24';
    e.style.textShadow='0 1px 4px #000,0 0 5px #000';
    e.style.whiteSpace=nowrap?'nowrap':'normal'; e.style.overflowWrap=nowrap?'normal':'anywhere';
    e.style.overflow='hidden'; e.style.textOverflow=nowrap?'ellipsis':'clip';
    s.append(e);
  }
  function r117DateLabel(v){
    if(!v) return '';
    const t=String(v); if(/^\\d{4}-\\d{2}-\\d{2}/.test(t)) return t.slice(8,10)+'.'+t.slice(5,7)+'.'+t.slice(0,4);
    return t;
  }
  function r117Google(c){
    const d=r117Company(c); const q=[d.name,d.legalName,d.city,d.countryName,d.nip].filter(Boolean).join(' ');
    openUrl('https://www.google.com/search?q='+encodeURIComponent(q||'firma'));
  }
  function r117Map(c){
    const d=r117Company(c);
    if(typeof r19OpenCompanyMap==='function') return r19OpenCompanyMap(d);
    const q=[d.address,d.city,d.countryName].filter(Boolean).join(', ');
    if(q) return openUrl('https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(q));
    r115Missing(d,'Mapa');
  }
  function r117PickLogo(c){
    const input=document.createElement('input'); input.type='file'; input.accept='image/*'; input.style.display='none';
    input.addEventListener('change',()=>{ const f=input.files&&input.files[0]; if(!f) return; const rd=new FileReader(); rd.onload=()=>{ r117SaveCompany(c,{logoData:String(rd.result||''),updatedAt:new Date().toISOString(),author:'L&M'}); r117OpenCompanyData(c); }; rd.readAsDataURL(f); });
    document.body.append(input); input.click(); setTimeout(()=>input.remove(),60000);
  }
  function r117EditCompany(c){
    const d=r117Company(c);
    const dlg=document.createElement('dialog');
    dlg.style.cssText='width:min(94vw,720px);max-height:88vh;overflow:auto;border:2px solid #d7a514;border-radius:22px;background:#03150f;color:#fff;padding:18px;box-shadow:0 0 28px #d7a51488;z-index:99999';
    const title=document.createElement('h2'); title.textContent='UAKTUALNIJ DANE FIRMY'; title.style.cssText='margin:0 0 14px;color:#ffd229;text-align:center'; dlg.append(title);
    const fields=[['name','Nazwa firmy'],['legalName','Pełna nazwa firmy'],['contactPerson','Osoba kontaktowa'],['address','Adres'],['city','Miejscowość'],['phone','Telefon'],['mobile','Telefon komórkowy'],['email','E-mail'],['website','Strona WWW'],['nip','NIP'],['activity','Rodzaj działalności'],['foundedYear','Rok założenia']];
    const inputs={};
    fields.forEach(([key,label])=>{ const row=document.createElement('label'); row.style.cssText='display:block;margin:9px 0;color:#ffd229;font-weight:700'; row.textContent=label; const inp=document.createElement('input'); inp.value=d[key]||''; inp.style.cssText='display:block;width:100%;box-sizing:border-box;margin-top:5px;padding:11px 12px;border:1px solid #9b7814;border-radius:10px;background:#06110d;color:#fff;font-size:16px'; row.append(inp); dlg.append(row); inputs[key]=inp; });
    const actions=document.createElement('div'); actions.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:16px';
    const save=document.createElement('button'); save.textContent='ZAPISZ'; save.style.cssText='padding:13px;border:2px solid #5dff42;border-radius:12px;background:#073a11;color:#8dff76;font-weight:900;font-size:17px';
    const cancel=document.createElement('button'); cancel.textContent='ANULUJ'; cancel.style.cssText='padding:13px;border:1px solid #777;border-radius:12px;background:#252525;color:#fff;font-weight:800;font-size:17px';
    save.addEventListener('click',()=>{ const patch={}; fields.forEach(([key])=>patch[key]=inputs[key].value.trim()); patch.updatedAt=new Date().toISOString(); patch.author='L&M'; r117SaveCompany(c,patch); dlg.close(); dlg.remove(); r117OpenCompanyData(c); toast('DANE FIRMY — zapisano'); });
    cancel.addEventListener('click',()=>{dlg.close();dlg.remove();}); actions.append(save,cancel); dlg.append(actions); document.body.append(dlg); dlg.showModal();
  }
  function r117OpenCompanyData(base){
    const c=r117Company(base||getCompanyById(state.selectedCompany)||{});
    const s=document.createElement('section'); s.className='screen r117-company-data'; s.style.position='relative';
    const img=document.createElement('img'); img.className='master'; img.src=R117_DATA_IMG; img.alt='Dane firmy — MASTER'; s.append(img);

    /* R118 — chirurgicznie wycentrowane pola względem linii MASTER 852 x 1846 */
    r117Field(s,c.name,452,235,165,24,'#fff','900','left',true);
    r117Field(s,String(c.displayId||c.id||'').toUpperCase(),688,188,120,12,'#fff','700','right',true);
    r117Field(s,c.legalName||c.name,342,414,225,15,'#fff','700');
    r117Field(s,c.contactPerson,342,505,225,15,'#fff','700');
    r117Field(s,c.address,342,598,225,15,'#fff','700');
    r117Field(s,c.phone,342,798,455,16,'#fff','700',null,true);
    r117Field(s,c.mobile,342,890,455,16,'#fff','700',null,true);
    r117Field(s,c.email,342,987,455,15,'#fff','700',null,true);
    r117Field(s,c.website,342,1083,455,15,'#fff','700',null,true);
    r117Field(s,c.nip,342,1177,455,16,'#fff','700',null,true);
    r117Field(s,c.activity||c.type,342,1273,455,14,'#fff','700');
    r117Field(s,c.foundedYear,342,1407,455,15,'#fff','700',null,true);
    r117Field(s,r117DateLabel(c.addedAt),72,1513,188,10,'#fff','700','center',true);
    r117Field(s,r117DateLabel(c.updatedAt||c.sourceDate),325,1513,235,10,'#fff','700','center',true);
    r117Field(s,c.author||'',605,1513,190,10,'#fff','700','center',true);

    if(c.logoData){ const logo=document.createElement('img'); logo.src=c.logoData; logo.alt='Logo firmy'; logo.style.cssText='position:absolute;left:68.5%;top:21.0%;width:24.5%;height:14.2%;object-fit:contain;background:white;border-radius:15px;z-index:23;pointer-events:none'; s.append(logo); }

    s.append(hotspot({x:0,y:0,w:140,h:135,label:'Wstecz',onClick:render,baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:700,y:0,w:152,h:150,label:'Synchronizuj',onClick:sync,baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:585,y:386,w:218,h:270,label:'Dodaj logo firmy',onClick:()=>r117PickLogo(c),baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:585,y:660,w:218,h:80,label:'Pokaż na mapie',onClick:()=>r117Map(c),baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:30,y:1546,w:380,h:110,label:'Uaktualnij dane',onClick:()=>r117EditCompany(c),baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:420,y:1546,w:382,h:110,label:'Szukaj danych w Google',onClick:()=>r117Google(c),baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:30,y:1680,w:772,h:95,label:'Wróć do karty',onClick:render,baseW:852,baseH:1846,z:30}));
    app.replaceChildren(s);
  }

  function r115RenderCompanyMaster(){
    const c=getCompanyById(state.selectedCompany)||{};
    const s=document.createElement('section');
    s.className='screen r115-company-master';
    const img=document.createElement('img');
    img.className='master';
    img.src=R115_COMPANY_IMG;
    img.alt='Szczegóły firmy — nowy MASTER';
    s.append(img);

    s.append(hotspot({x:0,y:0,w:135,h:135,label:'Wstecz',onClick:()=>go(r115BackRoute(c)),baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:720,y:0,w:132,h:150,label:'Synchronizuj',onClick:sync,baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:22,y:606,w:190,h:144,label:'Telefon',onClick:()=>c.phone?openUrl('tel:'+c.phone):r115Missing(c,'Telefon'),baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:220,y:606,w:193,h:144,label:'Mapa',onClick:()=>typeof r19OpenCompanyMap==='function'?r19OpenCompanyMap(c):r115Missing(c,'Mapa'),baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:418,y:606,w:195,h:144,label:'Oferta',onClick:()=>typeof r17OpenOffer==='function'?r17OpenOffer(c):r115Missing(c,'Oferta'),baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:618,y:606,w:205,h:144,label:'Email',onClick:()=>c.email?openUrl('mailto:'+c.email):r115Missing(c,'E-mail'),baseW:852,baseH:1846,z:30}));

    s.append(hotspot({x:12,y:786,w:398,h:180,label:'Dane firmy',onClick:()=>r117OpenCompanyData(c),baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:422,y:786,w:398,h:180,label:'Ceny',onClick:()=>r115NewTile('CENY'),baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:12,y:982,w:398,h:180,label:'Historia',onClick:()=>r115NewTile('HISTORIA'),baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:422,y:982,w:398,h:180,label:'Oferta karta',onClick:()=>r115NewTile('OFERTA'),baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:12,y:1177,w:398,h:180,label:'Notatki o firmie',onClick:()=>r115NewTile('NOTATKI O FIRMIE'),baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:422,y:1177,w:398,h:180,label:'Cele asystenta',onClick:()=>r115NewTile('CELE ASYSTENTA'),baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:12,y:1374,w:808,h:190,label:'Akcje i status',onClick:()=>r115NewTile('AKCJE I STATUS'),baseW:852,baseH:1846,z:30}));
    return s;
  }
  renderCompany=r115RenderCompanyMaster;
`;
    const marker='\n})();\n\n</script>';
    const pos=out.lastIndexOf(marker);
    if(pos>=0) out=out.slice(0,pos)+'\n'+r117Inside+out.slice(pos);
  }

  return out;
};