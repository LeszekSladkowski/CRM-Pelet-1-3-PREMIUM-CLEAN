/* R128 v4.5B — NOTATKI O FIRMIE: MAIN CARD CLEAN TYPOGRAPHY
   Baza: R128 v4.5A test state / zamrożony R127.
   Grafika = cały wygląd. Kod = dane LIVE + niewidzialne hotspoty.
   W tym kroku ruszona wyłącznie prezentacja białych tekstów na głównej karcie NOTATKI O FIRMIE.
   R120 / R121 / R122 / R127 oraz karty szczegółowe R128 pozostają bez zmian.
*/
importScripts('./sw-r127-language-base.js?v=R128-v4-5b-main-card-clean-typography');

if(Array.isArray(ASSETS)){
  [
    './r128-notatki-live.js',
    './r128-notatki-main-v45b.js',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000c0ac8210a2eab26769101d1e.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_0000000043ac8207a71d319b6ef15188.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000a600821083280e45a39d12f3.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000df5c81f69bd362e0ec6b55a9.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000995c82109a658e01b57fd04f.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000c5ec820eb0d4cff0e6895173.png'
  ].forEach(function(a){if(!ASSETS.includes(a))ASSETS.push(a);});
}

const r128v45bBasePatch=r48PatchIndexHtml;
r48PatchIndexHtml=function(text){
  let out=r128v45bBasePatch(text);

  /* Zachowujemy sprawdzony hotfix separatora R127. */
  out=out.replace("\\n  function r115RenderCompanyMaster(){","\n  function r115RenderCompanyMaster(){");

  /* Metadane wydania. */
  out=out.replaceAll('1.3.0-master-r127-offer-language-clean-master','1.3.0-master-r128v4-5b-company-notes-main-card-clean-typography');
  out=out.replaceAll('R127 OFERTA — LANGUAGE LIVE + CLEAN MASTER','R128 v4.5B NOTATKI O FIRMIE — MAIN CARD CLEAN TYPOGRAPHY');
  out=out.replaceAll('1.3.0-master-r128v4-5a-company-notes-main-card-surgical-text-fit','1.3.0-master-r128v4-5b-company-notes-main-card-clean-typography');
  out=out.replaceAll('R128 v4.5A NOTATKI O FIRMIE — MAIN CARD SURGICAL TEXT FIT','R128 v4.5B NOTATKI O FIRMIE — MAIN CARD CLEAN TYPOGRAPHY');
  out=out.replace("const BUILD_TIME = '08:23';","const BUILD_TIME = '08:45';");
  out=out.replace(/sw\.js\?v=R128v4-5a-company-notes-main-card-surgical-text-fit-0823/g,'sw.js?v=R128v4-5b-company-notes-main-card-clean-typography-0845');
  out=out.replace(/r84-backup-prune\.js\?v=R128v4-5a-0823/g,'r84-backup-prune.js?v=R128v4-5b-0845');

  /* Minimalna ekspozycja istniejących helperów do zewnętrznego modułu. */
  if(!out.includes('window.R128_CTX=')){
    out=out.replace(
      '  renderCompany=r115RenderCompanyMaster;',
      "  renderCompany=r115RenderCompanyMaster;\n  window.R128_CTX={app:(typeof app!=='undefined'?app:null),hotspot:(typeof hotspot==='function'?hotspot:null),render:(typeof render==='function'?render:null),sync:(typeof sync==='function'?sync:null),getCompanyById:(typeof getCompanyById==='function'?getCompanyById:null),state:(typeof state!=='undefined'?state:null),marketRolesFor:(typeof marketRolesFor==='function'?marketRolesFor:null),countries:(typeof countries!=='undefined'?countries:null),r115NewTile:(typeof r115NewTile==='function'?r115NewTile:null),toast:(typeof toast==='function'?toast:null)};"
    );
  }

  /* Aktywujemy wyłącznie kafel nr 5. Brak modułu = bezpieczny stary fallback. */
  out=out.replace(
    "onClick:()=>r115NewTile('NOTATKI O FIRMIE')",
    "onClick:()=>((window.R128_NOTES&&typeof window.R128_NOTES.open==='function')?window.R128_NOTES.open(c):r115NewTile('NOTATKI O FIRMIE'))"
  );

  /* Bazowy moduł R128 pozostaje bez zmian. */
  out=out.replace(/<script src="\.\/r128-notatki-live\.js\?v=R128v4-4"><\/script>/g,'<script src="./r128-notatki-live.js?v=R128v4-5a"></script>');
  if(!out.includes('r128-notatki-live.js?v=R128v4-5a')){
    out=out.replace(/<script src="\.\/r128-notatki-live\.js\?v=R128v4-3"><\/script>\n<\/body>/,'<script src="./r128-notatki-live.js?v=R128v4-5a"></script>\n</body>');
    if(!out.includes('r128-notatki-live.js?v=R128v4-5a')){
      out=out.replace('</body>','<script src="./r128-notatki-live.js?v=R128v4-5a"></script>\n</body>');
    }
  }

  /* v4.5B: mały, odseparowany patch typografii ładowany PO bazowym module. */
  if(!out.includes('r128-notatki-main-v45b.js?v=R128v4-5b')){
    out=out.replace('</body>','<script src="./r128-notatki-main-v45b.js?v=R128v4-5b"></script>\n</body>');
  }
  return out;
};
