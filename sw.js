/* R92 — CRM 1.3 SURGICAL CLEAN BASELINE
   Baza wykonawcza: ostatnia stabilna gałąź R76.
   Zachowane: zatwierdzone RYNKI EU, WALUTY, aktualne crm-data.json i assistant-feed.json.
   Usunięte z aktywnego runtime: eksperymentalne warstwy DANE FIRMY R86–R91,
   które nakładały dodatkowe maski/teksty na zatwierdzony MASTER.
   Magazyn backupów pozostaje porządkowany przez sprawdzony mechanizm R85.
*/
importScripts('./sw-r76-stable.js?v=R76-stable-clean-base');

if(Array.isArray(ASSETS) && !ASSETS.includes('./r84-backup-prune.js')) ASSETS.push('./r84-backup-prune.js');

const r92BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r92BasePatchIndexHtml(text);
  out = out.replaceAll('1.3.0-master-r76-waluty-karta4-surgical-gauge-clean','1.3.0-master-r92-surgical-clean-baseline');
  out = out.replaceAll('R76 WALUTY KARTA 4 SURGICAL GAUGE CLEAN','R92 SURGICAL CLEAN BASELINE');
  out = out.replace("const BUILD_DATE = '02.09.2026';","const BUILD_DATE = '07.09.2026';");
  out = out.replace("const BUILD_TIME = '17:58';","const BUILD_TIME = '12:13';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R76-waluty-karta4-surgical-gauge-clean-1758'","navigator.serviceWorker.register('./sw.js?v=R92-surgical-clean-baseline-1213'");
  if(!out.includes('r84-backup-prune.js')){
    out = out.replace('</body>','<script src="./r84-backup-prune.js?v=R92-1213"></script>\n</body>');
  }else{
    out = out.replace(/r84-backup-prune\.js\?v=[^\"']+/g,'r84-backup-prune.js?v=R92-1213');
  }
  return out;
};
