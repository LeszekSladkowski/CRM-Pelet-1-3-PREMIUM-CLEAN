/* R102 — CRM 1.3 SURGICAL CLEAN FINAL — BACKUP CATALOG CLEAN
   Baza funkcjonalna: zweryfikowany R101 / PUNKT 0 R92.
   Zmiana chirurgiczna: usunięto martwy katalog R38 oraz historyczne oznaczanie go jako AKTUALNA.
   Ochrona lokalnych backupów z R101 pozostaje aktywna.
   Lokalne backupy, RYNKI EU, WALUTY, dane CRM i grafiki MASTER pozostają bez zmian.
   Aktywny łańcuch pozostaje: sw-r54-core.js -> sw-r66-stable.js -> sw-r76-stable.js -> sw.js.
*/
importScripts('./sw-r76-stable.js?v=R102-final-backup-catalog-clean');

if(Array.isArray(ASSETS)){
  const r102MaskableDuplicate='./icon-maskable-512.png';
  const r102MaskableDuplicateIndex=ASSETS.indexOf(r102MaskableDuplicate);
  if(r102MaskableDuplicateIndex>=0) ASSETS.splice(r102MaskableDuplicateIndex,1);
  if(!ASSETS.includes('./r84-backup-prune.js')) ASSETS.push('./r84-backup-prune.js');
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

  out = out.replaceAll('1.3.0-master-r76-waluty-karta4-surgical-gauge-clean','1.3.0-master-r102-final-clean-backup-catalog');
  out = out.replaceAll('R76 WALUTY KARTA 4 SURGICAL GAUGE CLEAN','R102 FINAL CLEAN — BACKUP CATALOG CLEAN');
  out = out.replace("const BUILD_DATE = '02.09.2026';","const BUILD_DATE = '07.09.2026';");
  out = out.replace("const BUILD_TIME = '17:58';","const BUILD_TIME = '20:00';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R76-waluty-karta4-surgical-gauge-clean-1758'","navigator.serviceWorker.register('./sw.js?v=R102-final-clean-backup-catalog-2000'");
  if(!out.includes('r84-backup-prune.js')){
    out = out.replace('</body>','<script src="./r84-backup-prune.js?v=R102-2000"></script>\n</body>');
  }else{
    out = out.replace(/r84-backup-prune\.js\?v=[^\"']+/g,'r84-backup-prune.js?v=R102-2000');
  }
  return out;
};
