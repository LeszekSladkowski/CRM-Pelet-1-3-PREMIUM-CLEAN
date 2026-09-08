/* R113 — CRM 1.3 CLEAN RESET — VERIFIED R102 BASE
   Baza funkcjonalna: dokładnie zweryfikowany R102 FINAL CLEAN.
   Zmiana publikacyjna: wyłącznie nowy numer wydania i token Service Workera,
   aby urządzenie z nowszym R111 mogło pobrać czysty stan R102 jako aktualizację.
   Brak nowych kart, brak nowych funkcji, brak nowych warstw UI.
   Aktywny łańcuch pozostaje: sw-r54-core.js -> sw-r66-stable.js -> sw-r76-stable.js -> sw.js.
*/
importScripts('./sw-r76-stable.js?v=R113-clean-reset-r102-base');

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

  out = out.replaceAll('1.3.0-master-r76-waluty-karta4-surgical-gauge-clean','1.3.0-master-r113-clean-reset-r102-base');
  out = out.replaceAll('R76 WALUTY KARTA 4 SURGICAL GAUGE CLEAN','R113 CLEAN RESET — R102 BASE');
  out = out.replace("const BUILD_DATE = '02.09.2026';","const BUILD_DATE = '08.09.2026';");
  out = out.replace("const BUILD_TIME = '17:58';","const BUILD_TIME = '12:25';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R76-waluty-karta4-surgical-gauge-clean-1758'","navigator.serviceWorker.register('./sw.js?v=R113-clean-reset-r102-base-1225'");
  if(!out.includes('r84-backup-prune.js')){
    out = out.replace('</body>','<script src="./r84-backup-prune.js?v=R113-1225"></script>\n</body>');
  }else{
    out = out.replace(/r84-backup-prune\.js\?v=[^\"']+/g,'r84-backup-prune.js?v=R113-1225');
  }
  return out;
};
