/* R131 — WALUTY KARTA 1 — PRESS FEEDBACK CANDIDATE
   STATUS: NIEAKTYWNY / AUDYTOWY. Ten plik nie jest importowany przez produkcyjny sw.js.

   Cel:
   - nie zmieniać rastra MASTER,
   - nie zmieniać geometrii pięciu hotspotów R57,
   - nie zmieniać routingu ani logiki,
   - skorygować wyłącznie sposób skalowania zaokrąglenia zielonego efektu naciśnięcia.

   Uzasadnienie:
   R57 dopasował hotspoty do złotych ramek, pozostawiając globalne
   .wm-hot.wm-pressed::after z inset:4% i stałym border-radius:16px.
   Inset skaluje się wraz z hotspotem, natomiast stały promień 16px nie jest
   związany z geometrią wzorca 852x1846. Kandydat zachowuje historyczny inset
   i cień 1:1, zmieniając wyłącznie promień na proporcjonalny do kafla.
*/

const r131K1PressBasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r131K1PressBasePatchIndexHtml(text);
  if(typeof out !== 'string' || !out) return out;

  if(!out.includes('id="r131-waluty-k1-press-candidate"')){
    const style = `
<style id="r131-waluty-k1-press-candidate">
/* R131 CANDIDATE — tylko 5 głównych kafli KARTY 1. */
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
