/* R57 — WALUTY: chirurgiczne dopasowanie efektu naciśnięcia KARTY 1 + usunięcie wyłącznie pasywnego pulsu LIVE na KARCIE 2.
   Raster MASTER KARTY 1, przyciski POWRÓT/LIVE, dolna nawigacja, KARTY 1/3 i 1/4 oraz RYNKI EU pozostają bez zmian. */
importScripts('./sw-r54-core.js?v=R57-press-fit-ring-clean-1908');

const r57BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r57BasePatchIndexHtml(text);

  out = out.replaceAll('1.3.0-master-r54-waluty-karta2-raster-restore','1.3.0-master-r57-waluty-k1-press-fit-k2-ring-clean');
  out = out.replaceAll('R54 WALUTY KARTA 2 RASTER RESTORE','R57 WALUTY K1 PRESS FIT + K2 RING CLEAN');
  out = out.replace("const BUILD_TIME = '16:15';","const BUILD_TIME = '19:08';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R54-waluty-karta2-raster-restore-1615'","navigator.serviceWorker.register('./sw.js?v=R57-waluty-k1-press-fit-k2-ring-clean-1908'");

  /* KARTA 1 — korygujemy wyłącznie niewidzialne pola pięciu kafli menu.
     Dzięki temu istniejący efekt .wm-pressed wpada równo do złotych ramek rastra MASTER. */
  out = out.replace("wmHot(root,[42,710,770,150],()=>currencyGo(2),'Kursy LIVE')","wmHot(root,[42,721,770,160],()=>currencyGo(2),'Kursy LIVE')");
  out = out.replace("wmHot(root,[42,882,770,155],()=>currencyGo(3),'Kalkulator walut')","wmHot(root,[42,905,770,159],()=>currencyGo(3),'Kalkulator walut')");
  out = out.replace("wmHot(root,[42,1055,770,155],()=>currencyGo(4),'Opłacalność / marża')","wmHot(root,[42,1088,770,155],()=>currencyGo(4),'Opłacalność / marża')");
  out = out.replace("wmHot(root,[42,1227,770,155],curHistory,'Historia kursów')","wmHot(root,[42,1267,770,153],curHistory,'Historia kursów')");
  out = out.replace("wmHot(root,[42,1398,770,165],curSettings,'Ustawienia walut')","wmHot(root,[42,1442,770,157],curSettings,'Ustawienia walut')");

  const r57Style = `<style id="r57-waluty-press-fit-ring-clean">
/* KARTA 2 — zachowujemy geometrię R56 i usuwamy tylko stary pasywny puls pod poprawnym przyciskiem LIVE. */
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
  display:none!important;
  visibility:hidden!important;
  opacity:0!important;
  animation:none!important;
  border:0!important;
  box-shadow:none!important;
  background:transparent!important;
}
.wm-page[data-card="2"] .wm-live-spinner{
  z-index:32!important;
}
.wm-page[data-card="2"] .wm-hot{
  touch-action:manipulation!important;
}
</style>`;

  out = out.replace(/<style id="r54-waluty-karta2-raster-restore">[\s\S]*?<\/style>/, r57Style);
  return out;
};
