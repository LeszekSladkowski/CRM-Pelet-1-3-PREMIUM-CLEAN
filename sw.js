/* R56 — chirurgiczna korekta wyłącznie maski KARTY 2.
   KARTA 1 FINAL MASTER pozostaje bezwzględnie nietknięta. */
importScripts('./sw-r54-core.js?v=R56-mask-off-1700');

const r56BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r56BasePatchIndexHtml(text);

  out = out.replaceAll('1.3.0-master-r54-waluty-karta2-raster-restore','1.3.0-master-r56-waluty-karta2-mask-off');
  out = out.replaceAll('R54 WALUTY KARTA 2 RASTER RESTORE','R56 WALUTY KARTA 2 MASK OFF');
  out = out.replace("const BUILD_TIME = '16:15';","const BUILD_TIME = '17:00';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R54-waluty-karta2-raster-restore-1615'","navigator.serviceWorker.register('./sw.js?v=R56-waluty-karta2-mask-off-1700'");

  const r56Style = `<style id="r56-waluty-karta2-mask-off">
/* R56 — zero zmian geometrii KARTY 2; wyłączona tylko maska przecinająca raster LIVE. */
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
  content:none!important;
  display:none!important;
  width:0!important;
  height:0!important;
  background:transparent!important;
  pointer-events:none!important;
}
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

  out = out.replace(/<style id="r54-waluty-karta2-raster-restore">[\s\S]*?<\/style>/, r56Style);
  return out;
};