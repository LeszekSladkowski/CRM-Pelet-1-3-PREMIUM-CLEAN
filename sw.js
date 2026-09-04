/* R82 — RYNKI EU MASTER IMAGE CACHE BRIDGE.
   R81 zostaje zachowany jako stabilny rollback.
   R82 naprawia brak rastra MASTER: R80 prosil o JPG z query string, podczas gdy zamrozone
   grafiki sa cache'owane pod sciezkami bez query. W efekcie widoczne byly tylko nakladki LIVE.
   R82 laduje maly bridge po runtime R80 i wymusza cache'owane sciezki 4 grafik MASTER. */
importScripts('./sw-r81-stable.js?v=R81-stable-rollback');

if(Array.isArray(ASSETS)&&!ASSETS.includes('./r82-master-image-bridge.js'))ASSETS.push('./r82-master-image-bridge.js');

const r82BasePatchIndexHtml=r48PatchIndexHtml;
r48PatchIndexHtml=function(text){
  let out=r82BasePatchIndexHtml(text);
  out=out.replaceAll('1.3.0-master-r81-rynki-eu-surgical-bridge','1.3.0-master-r82-rynki-eu-master-image-bridge');
  out=out.replaceAll('R81 RYNKI EU SURGICAL BRIDGE','R82 RYNKI EU MASTER IMAGE BRIDGE');
  out=out.replace("const BUILD_TIME = '12:18';","const BUILD_TIME = '12:56';");
  out=out.replace("navigator.serviceWorker.register('./sw.js?v=R81-rynki-eu-surgical-bridge-1218'","navigator.serviceWorker.register('./sw.js?v=R82-rynki-eu-master-image-bridge-1256'");
  if(!out.includes('r82-master-image-bridge.js')){
    out=out.replace('</body>','<script src="./r82-master-image-bridge.js?v=R82-1256"></script>\n</body>');
  }
  return out;
};
