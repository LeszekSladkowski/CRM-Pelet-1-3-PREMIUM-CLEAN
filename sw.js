/* R85 — CLEAN BASE + HARD BACKUP PRUNE
   Baza wykonawcza: R76 stable.
   R85 naprawia nieskuteczne czyszczenie lokalnego magazynu backupow.
*/
importScripts('./sw-r76-stable.js?v=R76-stable-clean-base');

if(Array.isArray(ASSETS) && !ASSETS.includes('./r84-backup-prune.js')) ASSETS.push('./r84-backup-prune.js');

const r85BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r85BasePatchIndexHtml(text);
  out = out.replaceAll('1.3.0-master-r76-waluty-karta4-surgical-gauge-clean','1.3.0-master-r85-clean-base-hard-prune');
  out = out.replaceAll('R76 WALUTY KARTA 4 SURGICAL GAUGE CLEAN','R85 CLEAN BASE HARD PRUNE');
  out = out.replace("const BUILD_TIME = '17:58';","const BUILD_TIME = '13:52';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R76-waluty-karta4-surgical-gauge-clean-1758'","navigator.serviceWorker.register('./sw.js?v=R85-clean-base-hard-prune-1352'");
  if(!out.includes('r84-backup-prune.js')){
    out = out.replace('</body>','<script src="./r84-backup-prune.js?v=R85-1352"></script>\n</body>');
  }else{
    out = out.replace(/r84-backup-prune\.js\?v=[^\"']+/g,'r84-backup-prune.js?v=R85-1352');
  }
  return out;
};
