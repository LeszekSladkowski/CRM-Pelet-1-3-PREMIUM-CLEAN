/* R131 TEST 1 — WALUTY KARTA 1 — PRESS RADIUS ONLY
   Jedyna zmiana wizualna: skalowalny promień zielonego efektu naciśnięcia
   dla pięciu głównych kafli KARTY 1. Raster, hotspoty R57, funkcje, K2/K3/K4
   oraz wszystkie pozostałe MASTER-y pozostają bez zmian.
*/

const r131K1PressBasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r131K1PressBasePatchIndexHtml(text);
  if(typeof out !== 'string' || !out) return out;

  out = out.replaceAll('1.3.0-master-r130v1-0g-pixel-reference-alignment-1to1','1.3.0-test-r131-waluty-k1-press-radius');
  out = out.replaceAll('R130 v1.0G AKCJE I STATUS — PIXEL REFERENCE ALIGNMENT 1:1','R131 TEST 1 — WALUTY K1 PRESS RADIUS');
  out = out.replace(/const BUILD_DATE = '[^']*';/,"const BUILD_DATE = '11.09.2026';");
  out = out.replace(/const BUILD_TIME = '[^']*';/,"const BUILD_TIME = '10:30';");
  out = out.replace(/sw\.js\?v=[^'\"]+/g,'sw.js?v=R131-test1-waluty-k1-press-radius-1030');
  out = out.replace(/r84-backup-prune\.js\?v=[^'\"]+/g,'r84-backup-prune.js?v=R131-test1-1030');

  if(!out.includes('id="r131-waluty-k1-press-test1"')){
    const style = `
<style id="r131-waluty-k1-press-test1">
/* R131 TEST 1 — tylko pięć głównych kafli KARTY 1. */
.wm-page[data-card="1"] .wm-hot[aria-label="Kursy LIVE"].wm-pressed::after,
.wm-page[data-card="1"] .wm-hot[aria-label="Kalkulator walut"].wm-pressed::after,
.wm-page[data-card="1"] .wm-hot[aria-label="Opłacalność / marża"].wm-pressed::after,
.wm-page[data-card="1"] .wm-hot[aria-label="Historia kursów"].wm-pressed::after,
.wm-page[data-card="1"] .wm-hot[aria-label="Ustawienia walut"].wm-pressed::after{
  inset:4%!important;
  border-radius:3.1% / 15%!important;
  box-shadow:inset 0 0 0 2px rgba(118,255,0,.75),0 0 18px rgba(118,255,0,.7)!important;
  pointer-events:none!important;
}
</style>`;
    out = out.replace('</head>', style + '\n</head>');
  }
  return out;
};
