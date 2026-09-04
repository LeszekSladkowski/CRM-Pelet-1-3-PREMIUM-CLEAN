/* R84 — CLEAN BASE / CHIRURGICZNY PORZĄDEK
   Baza wykonawcza wraca do ostatniej stabilnej gałęzi przed eksperymentami R79–R83: R76.
   Zachowane: zatwierdzone RYNKI EU, WALUTY i aktualne pliki danych CRM.
   Usunięte z runtime: R79/R80/R81/R82/R83 bridge/runtime oraz wadliwe rastry końcowych kart.
   Dodatkowo magazyn backupów jest automatycznie ograniczany do R38 + 2 najnowszych kopii lokalnych.
*/
importScripts('./sw-r76-stable.js?v=R76-stable-clean-base');

if(Array.isArray(ASSETS) && !ASSETS.includes('./r84-backup-prune.js')) ASSETS.push('./r84-backup-prune.js');

const r84BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r84BasePatchIndexHtml(text);
  out = out.replaceAll('1.3.0-master-r76-waluty-karta4-surgical-gauge-clean','1.3.0-master-r84-clean-base');
  out = out.replaceAll('R76 WALUTY KARTA 4 SURGICAL GAUGE CLEAN','R84 CLEAN BASE');
  out = out.replace("const BUILD_TIME = '17:58';","const BUILD_TIME = '13:35';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R76-waluty-karta4-surgical-gauge-clean-1758'","navigator.serviceWorker.register('./sw.js?v=R84-clean-base-1335'");
  if(!out.includes('r84-backup-prune.js')){
    out = out.replace('</body>','<script src="./r84-backup-prune.js?v=R84-1335"></script>\n</body>');
  }
  return out;
};
