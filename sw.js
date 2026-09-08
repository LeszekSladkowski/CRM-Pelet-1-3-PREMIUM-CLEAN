/* R120 — DANE FIRMY — TOP NAME MASTER FIX
   Baza: działający R119 SYNC STAY + CENTER MASTER.
   Jedyna zmiana: górna nazwa firmy — większa czcionka i optyczne wyśrodkowanie na linii MASTER.
   Dla dłuższych nazw rozmiar czcionki skaluje się automatycznie.
*/
importScripts('./sw-r119-master.js?v=R120-dane-firmy-top-name-master-fix');

const r119TopNameBasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r119TopNameBasePatchIndexHtml(text);

  out = out.replaceAll('1.3.0-master-r119-dane-firmy-sync-center-master','1.3.0-master-r120-dane-firmy-top-name-master-fix');
  out = out.replaceAll('R119 DANE FIRMY — SYNC STAY + CENTER MASTER','R120 DANE FIRMY — TOP NAME MASTER FIX');
  out = out.replace("const BUILD_TIME = '15:09';","const BUILD_TIME = '15:44';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R119-dane-firmy-sync-center-master-1509'","navigator.serviceWorker.register('./sw.js?v=R120-dane-firmy-top-name-master-fix-1544'");
  out = out.replace(/r84-backup-prune\.js\?v=R119-1509/g,'r84-backup-prune.js?v=R120-1544');

  out = out.replace(
    "r117Field(s,c.name,355,235,285,22,'#fff','900','center',true);",
    "r117Field(s,c.name,405,226,310,(String(c.name||'').length<=10?30:String(c.name||'').length<=18?24:18),'#fff','900','center',true);"
  );

  return out;
};
