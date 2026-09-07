/* R104 — CRM 1.3 RYNKI EU COMPANY DETAILS — HARD DELETE DANE FIRMY LEGACY TILE
   Baza funkcjonalna: R103 test na bazie zweryfikowanego R102 FINAL CLEAN MASTER / PUNKT 0 R92.
   Korekta po teście S24 Ultra: R103 nie usunął aktywnego kafla DANE FIRMY.
   R104 przejmuje aktywny renderCompany po przypisaniu renderCompanyR15 i fizycznie usuwa z gotowej karty sekcję DANE FIRMY przed wyświetleniem.
   CENY I OFERTA, NOTATKI ASYSTENTA, AKCJE I STATUS oraz górne akcje TELEFON/MAPA/OFERTA/EMAIL pozostają bez zmian.
   Ochrona backupów R101 i porządek katalogu R102 pozostają aktywne.
*/
importScripts('./sw-r76-stable.js?v=R104-hard-delete-dane-firmy-legacy');

if(Array.isArray(ASSETS)){
  const r104MaskableDuplicate='./icon-maskable-512.png';
  const r104MaskableDuplicateIndex=ASSETS.indexOf(r104MaskableDuplicate);
  if(r104MaskableDuplicateIndex>=0) ASSETS.splice(r104MaskableDuplicateIndex,1);
  if(!ASSETS.includes('./r84-backup-prune.js')) ASSETS.push('./r84-backup-prune.js');
}

const r104BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r104BasePatchIndexHtml(text);

  /* R101 — ochrona lokalnych backupów. */
  out = out.replaceAll('await r38CleanBackupWarehouseOnce();','');

  /* R102 — usunięcie historycznego oznaczania R38 jako aktualnej wersji. */
  out = out.replaceAll("if(catalog[0]){catalog[0].current=true;catalog[0].description='MEGA STABILNY MASTER — oficjalny punkt powrotu R38.';}","");
  out = out.replaceAll(
    'Automatyczny backup danych jest tworzony przed aktualizacją. Punkty powrotu MASTER są przechowywane w pakiecie <b>backups/</b> i mogą zostać pobrane do przywrócenia.',
    'Automatyczny backup danych jest tworzony przed aktualizacją. Lokalne kopie danych pozostają w Magazynie Backupów, a zweryfikowane punkty MASTER są zabezpieczone w repozytorium GitHub.'
  );

  /* R104 — HARD DELETE aktywnego kafla DANE FIRMY na KARCIE 3/3.
     Usuwamy prawdziwy element DOM przed przekazaniem ekranu do render(), nie ukrywamy go CSS-em. */
  const r104CompanyMarker='  renderCompany=renderCompanyR15;';
  if(out.includes(r104CompanyMarker) && !out.includes('function r104RenderCompanyNoLegacyData')){
    const r104CompanyPatch=`

  const r104RenderCompanyBase=renderCompany;
  function r104RenderCompanyNoLegacyData(){
    const screen=r104RenderCompanyBase();
    if(screen && screen.querySelectorAll){
      screen.querySelectorAll('.r15-section').forEach(section=>{
        const title=((section.querySelector('b')||{}).textContent||'').trim();
        if(title==='DANE FIRMY') section.remove();
      });
    }
    return screen;
  }
  renderCompany=r104RenderCompanyNoLegacyData;`;
    out = out.replace(r104CompanyMarker,r104CompanyMarker+r104CompanyPatch);
  }

  out = out.replaceAll('1.3.0-master-r76-waluty-karta4-surgical-gauge-clean','1.3.0-master-r104-rynki-eu-hard-delete-dane-firmy-legacy');
  out = out.replaceAll('R76 WALUTY KARTA 4 SURGICAL GAUGE CLEAN','R104 RYNKI EU — HARD DELETE DANE FIRMY LEGACY');
  out = out.replace("const BUILD_DATE = '02.09.2026';","const BUILD_DATE = '07.09.2026';");
  out = out.replace("const BUILD_TIME = '17:58';","const BUILD_TIME = '20:28';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R76-waluty-karta4-surgical-gauge-clean-1758'","navigator.serviceWorker.register('./sw.js?v=R104-rynki-eu-hard-delete-dane-firmy-legacy-2028'");
  if(!out.includes('r84-backup-prune.js')){
    out = out.replace('</body>','<script src="./r84-backup-prune.js?v=R104-2028"></script>\n</body>');
  }else{
    out = out.replace(/r84-backup-prune\.js\?v=[^\"']+/g,'r84-backup-prune.js?v=R104-2028');
  }
  return out;
};
