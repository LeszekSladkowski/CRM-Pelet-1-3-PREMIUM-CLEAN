/* R101 — CRM 1.3 SURGICAL CLEAN STEP 11 — SAFE LOCAL BACKUPS
   Baza funkcjonalna: zweryfikowany R100 / PUNKT 0 R92.
   Zmiana chirurgiczna: wyłączono wyłącznie przestarzałe automatyczne czyszczenie całej lokalnej bazy backupów przez r38CleanBackupWarehouseOnce().
   Katalog R38 pozostaje na razie bez zmian — będzie osobno audytowany po teście tej poprawki.
   Deduplikacja ikony z R99 i czysty start_url z R100 pozostają aktywne.
   Aktywny łańcuch pozostaje: sw-r54-core.js -> sw-r66-stable.js -> sw-r76-stable.js -> sw.js.
*/
importScripts('./sw-r76-stable.js?v=R101-safe-local-backups');

if(Array.isArray(ASSETS)){
  const r101MaskableDuplicate='./icon-maskable-512.png';
  const r101MaskableDuplicateIndex=ASSETS.indexOf(r101MaskableDuplicate);
  if(r101MaskableDuplicateIndex>=0) ASSETS.splice(r101MaskableDuplicateIndex,1);
  if(!ASSETS.includes('./r84-backup-prune.js')) ASSETS.push('./r84-backup-prune.js');
}

const r101BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r101BasePatchIndexHtml(text);

  /* STEP 11 — nie wolno już czyścić całej lokalnej bazy backupów przez historyczny mechanizm R38. */
  out = out.replaceAll('await r38CleanBackupWarehouseOnce();','');

  out = out.replaceAll('1.3.0-master-r76-waluty-karta4-surgical-gauge-clean','1.3.0-master-r101-surgical-clean-step11-safe-local-backups');
  out = out.replaceAll('R76 WALUTY KARTA 4 SURGICAL GAUGE CLEAN','R101 SURGICAL CLEAN STEP 11 — SAFE LOCAL BACKUPS');
  out = out.replace("const BUILD_DATE = '02.09.2026';","const BUILD_DATE = '07.09.2026';");
  out = out.replace("const BUILD_TIME = '17:58';","const BUILD_TIME = '19:52';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R76-waluty-karta4-surgical-gauge-clean-1758'","navigator.serviceWorker.register('./sw.js?v=R101-surgical-clean-step11-safe-local-backups-1952'");
  if(!out.includes('r84-backup-prune.js')){
    out = out.replace('</body>','<script src="./r84-backup-prune.js?v=R101-1952"></script>\n</body>');
  }else{
    out = out.replace(/r84-backup-prune\.js\?v=[^\"']+/g,'r84-backup-prune.js?v=R101-1952');
  }
  return out;
};
