/* R83 — RYNKI EU TRUE LIVE COMPANY CARDS.
   R82 zostaje jako rollback warstwy obrazowej. R83 omija wadliwe/prawie puste rastry JPG R79
   i po R81 bridge przejmuje cztery końcowe widoki firmy pełnym runtime DOM/CSS.
   Wspólny rekord CRM, statusy, ceny, notatki i zadania pozostają w tym samym storage. */
importScripts('./sw-r81-stable.js?v=R81-stable-rollback');

const R83_ASSETS=['./r83-company-runtime.js'];
if(Array.isArray(ASSETS))R83_ASSETS.forEach(a=>{if(!ASSETS.includes(a))ASSETS.push(a)});

const r83BasePatchIndexHtml=r48PatchIndexHtml;
r48PatchIndexHtml=function(text){
  let out=r83BasePatchIndexHtml(text);
  out=out.replaceAll('1.3.0-master-r81-rynki-eu-surgical-bridge','1.3.0-master-r83-rynki-eu-true-live-cards');
  out=out.replaceAll('R81 RYNKI EU SURGICAL BRIDGE','R83 RYNKI EU TRUE LIVE CARDS');
  out=out.replace("const BUILD_TIME = '12:18';","const BUILD_TIME = '13:22';");
  out=out.replace("navigator.serviceWorker.register('./sw.js?v=R81-rynki-eu-surgical-bridge-1218'","navigator.serviceWorker.register('./sw.js?v=R83-rynki-eu-true-live-cards-1322'");
  if(!out.includes('r83-company-runtime.js')){
    out=out.replace('</body>','<script src="./r83-company-runtime.js?v=R83-1322"></script>\n</body>');
  }
  return out;
};
