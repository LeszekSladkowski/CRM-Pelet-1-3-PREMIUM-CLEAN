/* R80 HARD FIX — RYNKI EU.
   R79 pozostaje zamrożoną bazą. R80 naprawia realny błąd testu: stare dolne modale
   nadal przejmowały DANE FIRMY / CENY / NOTATKI / STATUS.
   Rozwiązanie: osobny zewnętrzny runtime ładowany po głównym kodzie i twarde
   przejęcie funkcji r15OpenSection / r15OpenStatus / r17OpenOffer. */
importScripts('./sw-r79-stable.js?v=R79-stable-copy');

const R80_ASSETS=['./r80-company-runtime.js'];
if(Array.isArray(ASSETS))R80_ASSETS.forEach(a=>{if(!ASSETS.includes(a))ASSETS.push(a)});

const r80BasePatchIndexHtml=r48PatchIndexHtml;
r48PatchIndexHtml=function(text){
  let out=r80BasePatchIndexHtml(text);
  out=out.replaceAll('1.3.0-master-r79-rynki-eu-live-company-branch','1.3.0-master-r80-rynki-eu-hard-runtime');
  out=out.replaceAll('R79 RYNKI EU LIVE COMPANY BRANCH','R80 RYNKI EU HARD RUNTIME');
  out=out.replace("const BUILD_TIME = '11:32';","const BUILD_TIME = '11:58';");
  out=out.replace("navigator.serviceWorker.register('./sw.js?v=R79-rynki-eu-live-company-1132'","navigator.serviceWorker.register('./sw.js?v=R80-rynki-eu-hard-runtime-1158'");
  if(!out.includes('r80-company-runtime.js')){
    out=out.replace('</body>','<script src="./r80-company-runtime.js?v=R80-hard-1158"></script>\n</body>');
  }
  return out;
};
