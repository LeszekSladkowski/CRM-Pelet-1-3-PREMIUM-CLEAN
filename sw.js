/* R99 — CRM 1.3 SURGICAL CLEAN STEP 7 — ICON DEDUPE
   Baza funkcjonalna: zweryfikowany R98 / aplikacja R97 / PUNKT 0 R92.
   Zmiana chirurgiczna: jeden wspólny plik icon-512.png obsługuje zwykłą ikonę 512 i maskable.
   Z listy cache usunięto zbędny alias icon-maskable-512.png; wygląd i funkcje aplikacji bez zmian.
   Aktywny łańcuch pozostaje: sw-r54-core.js -> sw-r66-stable.js -> sw-r76-stable.js -> sw.js.
*/
importScripts('./sw-r76-stable.js?v=R99-icon-dedupe');

if(Array.isArray(ASSETS)){
  const r99MaskableDuplicate='./icon-maskable-512.png';
  const r99MaskableDuplicateIndex=ASSETS.indexOf(r99MaskableDuplicate);
  if(r99MaskableDuplicateIndex>=0) ASSETS.splice(r99MaskableDuplicateIndex,1);
  if(!ASSETS.includes('./r84-backup-prune.js')) ASSETS.push('./r84-backup-prune.js');
}

const r99BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r99BasePatchIndexHtml(text);
  out = out.replaceAll('1.3.0-master-r76-waluty-karta4-surgical-gauge-clean','1.3.0-master-r99-surgical-clean-step7-icon-dedupe');
  out = out.replaceAll('R76 WALUTY KARTA 4 SURGICAL GAUGE CLEAN','R99 SURGICAL CLEAN STEP 7 — ICON DEDUPE');
  out = out.replace("const BUILD_DATE = '02.09.2026';","const BUILD_DATE = '07.09.2026';");
  out = out.replace("const BUILD_TIME = '17:58';","const BUILD_TIME = '19:26';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R76-waluty-karta4-surgical-gauge-clean-1758'","navigator.serviceWorker.register('./sw.js?v=R99-surgical-clean-step7-icon-dedupe-1926'");
  if(!out.includes('r84-backup-prune.js')){
    out = out.replace('</body>','<script src="./r84-backup-prune.js?v=R99-1926"></script>\n</body>');
  }else{
    out = out.replace(/r84-backup-prune\.js\?v=[^\"']+/g,'r84-backup-prune.js?v=R99-1926');
  }
  return out;
};
