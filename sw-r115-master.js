/* R115 — CRM 1.3 — NOWE OKNO NR 3 „SZCZEGÓŁY FIRMY” — IIFE RENDER FIX
   Baza: R114 na zweryfikowanym MASTER R113 CLEAN RESET — R102 BASE.
   Jedyna poprawka funkcjonalna: renderer nowego OKNA 3 jest wstrzykiwany DO WNĘTRZA
   głównego IIFE aplikacji, dzięki czemu faktycznie zastępuje stary renderCompany().
   Grafika MASTER oraz pozostałe ekrany pozostają bez zmian.
*/
importScripts('./sw-r76-stable.js?v=R115-company-details-iife-fix');

if(Array.isArray(ASSETS)){
  const r102MaskableDuplicate='./icon-maskable-512.png';
  const r102MaskableDuplicateIndex=ASSETS.indexOf(r102MaskableDuplicate);
  if(r102MaskableDuplicateIndex>=0) ASSETS.splice(r102MaskableDuplicateIndex,1);
  if(!ASSETS.includes('./r84-backup-prune.js')) ASSETS.push('./r84-backup-prune.js');
  if(!ASSETS.includes('./grafiki/rynki-eu/szczegoly-firmy/master-okno-3-szczegoly-firmy.png')) ASSETS.push('./grafiki/rynki-eu/szczegoly-firmy/master-okno-3-szczegoly-firmy.png');
}

const r102BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r102BasePatchIndexHtml(text);

  /* R101 — nie wolno czyścić całej lokalnej bazy backupów przez historyczny mechanizm R38. */
  out = out.replaceAll('await r38CleanBackupWarehouseOnce();','');

  /* R102 — martwy katalog R38 nie może być już oznaczany jako aktualna wersja. */
  out = out.replaceAll("if(catalog[0]){catalog[0].current=true;catalog[0].description='MEGA STABILNY MASTER — oficjalny punkt powrotu R38.';}","");
  out = out.replaceAll(
    'Automatyczny backup danych jest tworzony przed aktualizacją. Punkty powrotu MASTER są przechowywane w pakiecie <b>backups/</b> i mogą zostać pobrane do przywrócenia.',
    'Automatyczny backup danych jest tworzony przed aktualizacją. Lokalne kopie danych pozostają w Magazynie Backupów, a zweryfikowane punkty MASTER są zabezpieczone w repozytorium GitHub.'
  );

  out = out.replaceAll('1.3.0-master-r76-waluty-karta4-surgical-gauge-clean','1.3.0-master-r115-company-details-iife-fix');
  out = out.replaceAll('R76 WALUTY KARTA 4 SURGICAL GAUGE CLEAN','R115 OKNO 3 — IIFE RENDER FIX');
  out = out.replace("const BUILD_DATE = '02.09.2026';","const BUILD_DATE = '08.09.2026';");
  out = out.replace("const BUILD_TIME = '17:58';","const BUILD_TIME = '12:58';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R76-waluty-karta4-surgical-gauge-clean-1758'","navigator.serviceWorker.register('./sw.js?v=R115-company-details-iife-fix-1258'");

  if(!out.includes('r84-backup-prune.js')){
    out = out.replace('</body>','<script src="./r84-backup-prune.js?v=R115-1258"></script>\n</body>');
  }else{
    out = out.replace(/r84-backup-prune\.js\?v=[^\"']+/g,'r84-backup-prune.js?v=R115-1258');
  }

  /* R115 — krytyczna naprawa: kod musi wejść do tego samego IIFE co renderCompany. */
  if(!out.includes('r115-company-details-master-inside-iife')){
    const r115Inside = `
  /* r115-company-details-master-inside-iife */
  const R115_COMPANY_IMG='./grafiki/rynki-eu/szczegoly-firmy/master-okno-3-szczegoly-firmy.png';
  function r115BackRoute(c){ return c && c.countryCode==='DE' ? 'germany' : 'country'; }
  function r115Missing(c,label){ if(typeof r15Missing==='function') return r15Missing(c,label); toast(label+' — brak zweryfikowanych danych'); }
  function r115NewTile(label){ toast(label+' — karta zostanie ożywiona w osobnym kroku MASTER'); }
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

    s.append(hotspot({x:12,y:786,w:398,h:180,label:'Dane firmy',onClick:()=>r115NewTile('DANE FIRMY'),baseW:852,baseH:1846,z:30}));
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
    if(pos>=0) out=out.slice(0,pos)+'\n'+r115Inside+out.slice(pos);
  }

  return out;
};
