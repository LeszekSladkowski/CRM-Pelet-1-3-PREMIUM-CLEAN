/* R97 — CRM 1.3 SURGICAL CLEAN STEP 5 — VERSION SYNC
   Baza funkcjonalna: zweryfikowany R96 / PUNKT 0 R92.
   Zmiana chirurgiczna: synchronizacja metadanych wersji po zakończonych krokach R95–R96.
   Aktywny łańcuch pozostaje: sw-r54-core.js -> sw-r66-stable.js -> sw-r76-stable.js -> sw.js.
   RYNKI EU, WALUTY, crm-data.json, assistant-feed.json i mechanizm backupów pozostają bez zmian.
*/
importScripts('./sw-r76-stable.js?v=R97-version-sync');

if(Array.isArray(ASSETS) && !ASSETS.includes('./r84-backup-prune.js')) ASSETS.push('./r84-backup-prune.js');

const r97BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r97BasePatchIndexHtml(text);
  out = out.replaceAll('1.3.0-master-r76-waluty-karta4-surgical-gauge-clean','1.3.0-master-r97-surgical-clean-step5-version-sync');
  out = out.replaceAll('R76 WALUTY KARTA 4 SURGICAL GAUGE CLEAN','R97 SURGICAL CLEAN STEP 5 — VERSION SYNC');
  out = out.replace("const BUILD_DATE = '02.09.2026';","const BUILD_DATE = '07.09.2026';");
  out = out.replace("const BUILD_TIME = '17:58';","const BUILD_TIME = '18:47';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R76-waluty-karta4-surgical-gauge-clean-1758'","navigator.serviceWorker.register('./sw.js?v=R97-surgical-clean-step5-version-sync-1847'");
  if(!out.includes('r84-backup-prune.js')){
    out = out.replace('</body>','<script src="./r84-backup-prune.js?v=R97-1847"></script>\n</body>');
  }else{
    out = out.replace(/r84-backup-prune\.js\?v=[^\"']+/g,'r84-backup-prune.js?v=R97-1847');
  }
  return out;
};
