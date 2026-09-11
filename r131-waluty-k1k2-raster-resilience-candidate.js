/* R131 CANDIDATE — WALUTY K1/K2 RASTER RESILIENCE ONLY
   Cel: zapobiec czarnemu ekranowi K1/K2 przy nieudanym requestcie z query-stringiem.
   Bez zmian rastra, geometrii hotspotów, efektów press, funkcji i kart K3/K4.
*/

const r131RasterBasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r131RasterBasePatchIndexHtml(text);
  if(typeof out !== 'string' || !out) return out;

  /* R66 zmienia źródło K3, dlatego korygujemy dokładnie jego końcową postać wmBase().
     K1/K2 używają odtąd klucza identycznego z ASSETS (bez ?v=), co daje pewny fallback cache.
     K3 i K4 pozostają w dotychczasowej linii bez zmian. */
  out = out.replace(
    "img.src=card===3?'master-waluty-karta3-r64-clean.webp?v=R66-final-1628':`master-waluty-karta${card}.png?v=R43-LIVE-HARD-FIX`;",
    "img.src=card===3?'master-waluty-karta3-r64-clean.webp?v=R66-final-1628':(card<=2?`master-waluty-karta${card}.png`:`master-waluty-karta${card}.png?v=R43-LIVE-HARD-FIX`);"
  );

  /* Geometria awaryjna 1:1 — identyczna z wymiarem MASTER 852x1846.
     Nie zmienia wyglądu po załadowaniu obrazu; tylko zapobiega zapadnięciu canvasu do zera. */
  if(!out.includes('id="r131-waluty-raster-resilience"')){
    const style = `\n<style id="r131-waluty-raster-resilience">\n.wm-page[data-card="1"] .wm-canvas,.wm-page[data-card="2"] .wm-canvas{aspect-ratio:852/1846!important;}\n</style>`;
    out = out.replace('</head>', style + '\n</head>');
  }

  return out;
};
