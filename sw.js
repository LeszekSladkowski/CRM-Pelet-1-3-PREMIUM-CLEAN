/* R100 — CRM 1.3 SURGICAL CLEAN STEP 8 — PWA START_URL CLEAN
   Baza funkcjonalna: zweryfikowany R99 / PUNKT 0 R92.
   Zmiana chirurgiczna: manifest PWA startuje z czystego './' bez historycznego ?build=R51&screen=home.
   Deduplikacja ikony z R99 pozostaje aktywna; wygląd i funkcje aplikacji bez zmian.
   Aktywny łańcuch pozostaje: sw-r54-core.js -> sw-r66-stable.js -> sw-r76-stable.js -> sw.js.
*/
importScripts('./sw-r76-stable.js?v=R100-pwa-start-url-clean');

if(Array.isArray(ASSETS)){
  const r100MaskableDuplicate='./icon-maskable-512.png';
  const r100MaskableDuplicateIndex=ASSETS.indexOf(r100MaskableDuplicate);
  if(r100MaskableDuplicateIndex>=0) ASSETS.splice(r100MaskableDuplicateIndex,1);
  if(!ASSETS.includes('./r84-backup-prune.js')) ASSETS.push('./r84-backup-prune.js');
}

const r100BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r100BasePatchIndexHtml(text);
  out = out.replaceAll('1.3.0-master-r76-waluty-karta4-surgical-gauge-clean','1.3.0-master-r100-surgical-clean-step8-pwa-start-url-clean');
  out = out.replaceAll('R76 WALUTY KARTA 4 SURGICAL GAUGE CLEAN','R100 SURGICAL CLEAN STEP 8 — PWA START_URL CLEAN');
  out = out.replace("const BUILD_DATE = '02.09.2026';","const BUILD_DATE = '07.09.2026';");
  out = out.replace("const BUILD_TIME = '17:58';","const BUILD_TIME = '19:38';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R76-waluty-karta4-surgical-gauge-clean-1758'","navigator.serviceWorker.register('./sw.js?v=R100-surgical-clean-step8-pwa-start-url-clean-1938'");
  if(!out.includes('r84-backup-prune.js')){
    out = out.replace('</body>','<script src="./r84-backup-prune.js?v=R100-1938"></script>\n</body>');
  }else{
    out = out.replace(/r84-backup-prune\.js\?v=[^\"']+/g,'r84-backup-prune.js?v=R100-1938');
  }
  return out;
};
