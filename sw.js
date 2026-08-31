/* R55 — cienka nakładka bezpieczeństwa na zachowany rdzeń R54.
   KARTA 1 FINAL MASTER pozostaje nietknięta. */
importScripts('./sw-r54-core.js?v=R55-final-top-1649');

const r55BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r55BasePatchIndexHtml(text);

  out = out.replaceAll('1.3.0-master-r54-waluty-karta2-raster-restore','1.3.0-master-r55-waluty-karta2-final-top');
  out = out.replaceAll('R54 WALUTY KARTA 2 RASTER RESTORE','R55 WALUTY KARTA 2 FINAL TOP');
  out = out.replace("const BUILD_TIME = '16:15';","const BUILD_TIME = '16:49';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R54-waluty-karta2-raster-restore-1615'","navigator.serviceWorker.register('./sw.js?v=R55-waluty-karta2-final-top-1649'");

  const r55Style = `<style id="r55-waluty-karta2-final-top">
/* R55 — wyłącznie ostatnie kilka pikseli KARTY 2. */
.wm-page[data-card="2"]{
  position:relative!important;
  overflow:hidden!important;
  background:#000!important;
}
.wm-page[data-card="2"] .wm-canvas{
  margin-top:max(-60px,-7.042vw)!important;
  overflow:visible!important;
}
.wm-page[data-card="2"]::before{
  content:"";
  position:absolute;
  z-index:29;
  left:0;
  top:0;
  width:100%;
  height:min(45px,5.282vw);
  background:#000;
  pointer-events:none;
}
/* Pełny zielony okrąg LIVE ponad maską; raster i dane LIVE pozostają 1:1. */
.wm-page[data-card="2"] .wm-live-ring{
  z-index:31!important;
}
.wm-page[data-card="2"] .wm-live-spinner{
  z-index:32!important;
}
.wm-page[data-card="2"] .wm-hot{
  touch-action:manipulation!important;
}
</style>`;

  out = out.replace(/<style id="r54-waluty-karta2-raster-restore">[\s\S]*?<\/style>/, r55Style);
  return out;
};
