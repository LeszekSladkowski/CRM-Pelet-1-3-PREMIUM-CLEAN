/* R94 — CRM 1.3 SURGICAL CLEAN STEP 2
   Baza funkcjonalna: zweryfikowany R93 / PUNKT 0 R92.
   Zmiana chirurgiczna: aktywny łańcuch Service Workera omija zbędną warstwę R70.
   Nowy łańcuch: sw-r54-core.js -> sw-r66-stable.js -> sw-r76-stable.js -> sw.js.
   RYNKI EU, WALUTY, crm-data.json, assistant-feed.json i mechanizm backupów pozostają bez zmian.
   Plik sw-r70-stable.js pozostaje jeszcze w repo jako awaryjna kopia do czasu testu użytkownika.
*/
importScripts('./sw-r76-stable.js?v=R94-r70-bypass');

if(Array.isArray(ASSETS) && !ASSETS.includes('./r84-backup-prune.js')) ASSETS.push('./r84-backup-prune.js');

const r94BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r94BasePatchIndexHtml(text);
  out = out.replaceAll('1.3.0-master-r76-waluty-karta4-surgical-gauge-clean','1.3.0-master-r94-surgical-clean-step2-r70-bypass');
  out = out.replaceAll('R76 WALUTY KARTA 4 SURGICAL GAUGE CLEAN','R94 SURGICAL CLEAN STEP 2 — R70 BYPASS');
  out = out.replace("const BUILD_DATE = '02.09.2026';","const BUILD_DATE = '07.09.2026';");
  out = out.replace("const BUILD_TIME = '17:58';","const BUILD_TIME = '17:56';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R76-waluty-karta4-surgical-gauge-clean-1758'","navigator.serviceWorker.register('./sw.js?v=R94-surgical-clean-step2-r70-bypass-1756'");
  if(!out.includes('r84-backup-prune.js')){
    out = out.replace('</body>','<script src="./r84-backup-prune.js?v=R94-1756"></script>\n</body>');
  }else{
    out = out.replace(/r84-backup-prune\.js\?v=[^\"']+/g,'r84-backup-prune.js?v=R94-1756');
  }
  return out;
};
