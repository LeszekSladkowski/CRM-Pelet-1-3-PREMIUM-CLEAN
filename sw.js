/* R114 — CRM 1.3 — NOWE OKNO NR 3 „SZCZEGÓŁY FIRMY” — GRAPHIC MASTER TEST
   Baza funkcjonalna: zweryfikowany i zamrożony R113 CLEAN RESET — R102 BASE.
   Zmiana chirurgiczna: stary widok KARTY NR 3 nie jest już renderowany.
   W jego miejscu działa nowa czysta grafika MASTER w proporcji Samsung Galaxy S24 Ultra 852 × 1846.
   W tym kroku zachowujemy tylko bezpieczne, istniejące akcje: POWRÓT, SYNCHRONIZUJ, TELEFON, MAPA, OFERTA, EMAIL.
   Siedem nowych kafli jest celowo pozostawionych do osobnego ożywiania karta-po-karcie po teście grafiki na telefonie.
*/
importScripts('./sw-r76-stable.js?v=R114-company-details-master');

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

  out = out.replaceAll('1.3.0-master-r76-waluty-karta4-surgical-gauge-clean','1.3.0-master-r114-company-details-graphic-master');
  out = out.replaceAll('R76 WALUTY KARTA 4 SURGICAL GAUGE CLEAN','R114 NOWE OKNO 3 — SZCZEGÓŁY FIRMY GRAPHIC MASTER');
  out = out.replace("const BUILD_DATE = '02.09.2026';","const BUILD_DATE = '08.09.2026';");
  out = out.replace("const BUILD_TIME = '17:58';","const BUILD_TIME = '12:41';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R76-waluty-karta4-surgical-gauge-clean-1758'","navigator.serviceWorker.register('./sw.js?v=R114-company-details-master-1241'");
  if(!out.includes('r84-backup-prune.js')){
    out = out.replace('</body>','<script src="./r84-backup-prune.js?v=R114-1241"></script>\n</body>');
  }else{
    out = out.replace(/r84-backup-prune\.js\?v=[^\"']+/g,'r84-backup-prune.js?v=R114-1241');
  }

  if(!out.includes('r114-company-details-master-runtime')){
    const r114Runtime = `
<script id="r114-company-details-master-runtime">
(function(){
  const R114_IMG='./grafiki/rynki-eu/szczegoly-firmy/master-okno-3-szczegoly-firmy.png';
  function r114BackRoute(c){ return c && c.countryCode==='DE' ? 'germany' : 'country'; }
  function r114Missing(c,label){ if(typeof r15Missing==='function') return r15Missing(c,label); toast(label+' — brak zweryfikowanych danych'); }
  function r114NewTile(label){ toast(label+' — karta zostanie ożywiona w osobnym kroku MASTER'); }
  function r114RenderCompanyMaster(){
    const c=getCompanyById(state.selectedCompany)||{};
    const s=document.createElement('section');
    s.className='screen r114-company-master';
    const img=document.createElement('img');
    img.className='master';
    img.src=R114_IMG;
    img.alt='Szczegóły firmy — nowy MASTER';
    s.append(img);

    s.append(hotspot({x:0,y:0,w:135,h:135,label:'Wstecz',onClick:()=>go(r114BackRoute(c)),baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:720,y:0,w:132,h:150,label:'Synchronizuj',onClick:sync,baseW:852,baseH:1846,z:30}));

    s.append(hotspot({x:22,y:606,w:190,h:144,label:'Telefon',onClick:()=>c.phone?openUrl('tel:'+c.phone):r114Missing(c,'Telefon'),baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:220,y:606,w:193,h:144,label:'Mapa',onClick:()=>typeof r19OpenCompanyMap==='function'?r19OpenCompanyMap(c):r114Missing(c,'Mapa'),baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:418,y:606,w:195,h:144,label:'Oferta',onClick:()=>typeof r17OpenOffer==='function'?r17OpenOffer(c):r114Missing(c,'Oferta'),baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:618,y:606,w:205,h:144,label:'Email',onClick:()=>c.email?openUrl('mailto:'+c.email):r114Missing(c,'E-mail'),baseW:852,baseH:1846,z:30}));

    s.append(hotspot({x:12,y:786,w:398,h:180,label:'Dane firmy',onClick:()=>r114NewTile('DANE FIRMY'),baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:422,y:786,w:398,h:180,label:'Ceny',onClick:()=>r114NewTile('CENY'),baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:12,y:982,w:398,h:180,label:'Historia',onClick:()=>r114NewTile('HISTORIA'),baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:422,y:982,w:398,h:180,label:'Oferta karta',onClick:()=>r114NewTile('OFERTA'),baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:12,y:1177,w:398,h:180,label:'Notatki o firmie',onClick:()=>r114NewTile('NOTATKI O FIRMIE'),baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:422,y:1177,w:398,h:180,label:'Cele asystenta',onClick:()=>r114NewTile('CELE ASYSTENTA'),baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:12,y:1374,w:808,h:190,label:'Akcje i status',onClick:()=>r114NewTile('AKCJE I STATUS'),baseW:852,baseH:1846,z:30}));
    return s;
  }
  renderCompany=r114RenderCompanyMaster;
})();
</script>`;
    out = out.replace('</body>',r114Runtime+'\n</body>');
  }
  return out;
};
