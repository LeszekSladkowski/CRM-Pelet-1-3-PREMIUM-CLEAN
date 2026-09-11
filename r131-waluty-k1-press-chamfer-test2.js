/* R131 TEST 2 — WALUTY KARTA 1 — PRESS CHAMFER 1:1
   Zakres: wyłącznie feedback dotyku pięciu głównych kafli KARTY 1.
   Bez zmian rastra, hotspotów R57, funkcji, K2/K3/K4 i pozostałych MASTER-ów.
*/

const r131K1ChamferBasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r131K1ChamferBasePatchIndexHtml(text);
  if(typeof out !== 'string' || !out) return out;

  out = out.replaceAll('1.3.0-master-r130v1-0g-pixel-reference-alignment-1to1','1.3.0-test-r131-waluty-k1-press-chamfer-1to1');
  out = out.replaceAll('R130 v1.0G AKCJE I STATUS — PIXEL REFERENCE ALIGNMENT 1:1','R131 TEST 2 — WALUTY K1 PRESS CHAMFER 1:1');
  out = out.replace(/const BUILD_DATE = '[^']*';/,"const BUILD_DATE = '11.09.2026';");
  out = out.replace(/const BUILD_TIME = '[^']*';/,"const BUILD_TIME = '15:19';");
  out = out.replace(/sw\.js\?v=[^'\"]+/g,'sw.js?v=R131-test2-waluty-k1-press-chamfer-1519');
  out = out.replace(/r84-backup-prune\.js\?v=[^'\"]+/g,'r84-backup-prune.js?v=R131-test2-1519');

  if(!out.includes('id="r131-waluty-k1-press-chamfer-test2"')){
    const style = `
<style id="r131-waluty-k1-press-chamfer-test2">
/* K1: wyłączamy historyczny prostokątny/zaokrąglony efekt dla wszystkich hotspotów tej karty. */
.wm-page[data-card="1"] .wm-hot.wm-pressed::after{content:none!important}

/* K1: pięć głównych kafli dostaje jeden skalowalny, fazowany kontur zgodny z geometrią rastra. */
.wm-page[data-card="1"] .wm-hot[aria-label="Kursy LIVE"].wm-pressed::after,
.wm-page[data-card="1"] .wm-hot[aria-label="Kalkulator walut"].wm-pressed::after,
.wm-page[data-card="1"] .wm-hot[aria-label="Opłacalność / marża"].wm-pressed::after,
.wm-page[data-card="1"] .wm-hot[aria-label="Historia kursów"].wm-pressed::after,
.wm-page[data-card="1"] .wm-hot[aria-label="Ustawienia walut"].wm-pressed::after{
  content:''!important;
  position:absolute!important;
  inset:0!important;
  border:0!important;
  border-radius:0!important;
  box-shadow:none!important;
  pointer-events:none!important;
  background-repeat:no-repeat!important;
  background-position:center!important;
  background-size:100% 100%!important;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 200' preserveAspectRatio='none'%3E%3Cpolygon points='32,4 968,4 996,32 996,168 968,196 32,196 4,168 4,32' fill='none' stroke='%2376ff00' stroke-width='6' stroke-linejoin='miter'/%3E%3C/svg%3E")!important;
  filter:drop-shadow(0 0 5px rgba(118,255,0,.95)) drop-shadow(0 0 11px rgba(118,255,0,.55))!important;
}
</style>`;
    out = out.replace('</head>', style + '\n</head>');
  }
  return out;
};
