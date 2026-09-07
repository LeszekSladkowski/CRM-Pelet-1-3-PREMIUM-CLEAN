/* R95 — CRM 1.3 SURGICAL CLEAN STEP 3
   Baza funkcjonalna: zweryfikowany R94 / PUNKT 0 R92.
   Zmiana chirurgiczna: fizycznie usunięto nieużywany plik sw-r70-stable.js po pozytywnym teście R94.
   Aktywny łańcuch pozostaje: sw-r54-core.js -> sw-r66-stable.js -> sw-r76-stable.js -> sw.js.
   RYNKI EU, WALUTY, crm-data.json, assistant-feed.json i mechanizm backupów pozostają bez zmian.
*/
importScripts('./sw-r76-stable.js?v=R95-r70-removed');

if(Array.isArray(ASSETS) && !ASSETS.includes('./r84-backup-prune.js')) ASSETS.push('./r84-backup-prune.js');

const r95BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r95BasePatchIndexHtml(text);
  out = out.replaceAll('1.3.0-master-r76-waluty-karta4-surgical-gauge-clean','1.3.0-master-r95-surgical-clean-step3-r70-removed');
  out = out.replaceAll('R76 WALUTY KARTA 4 SURGICAL GAUGE CLEAN','R95 SURGICAL CLEAN STEP 3 — R70 REMOVED');
  out = out.replace("const BUILD_DATE = '02.09.2026';","const BUILD_DATE = '07.09.2026';");
  out = out.replace("const BUILD_TIME = '17:58';","const BUILD_TIME = '18:21';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R76-waluty-karta4-surgical-gauge-clean-1758'","navigator.serviceWorker.register('./sw.js?v=R95-surgical-clean-step3-r70-removed-1821'");
  if(!out.includes('r84-backup-prune.js')){
    out = out.replace('</body>','<script src="./r84-backup-prune.js?v=R95-1821"></script>\n</body>');
  }else{
    out = out.replace(/r84-backup-prune\.js\?v=[^\"']+/g,'r84-backup-prune.js?v=R95-1821');
  }
  return out;
};
