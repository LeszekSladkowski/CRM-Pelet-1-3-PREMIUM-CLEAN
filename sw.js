/* R128 v4.5A — NOTATKI O FIRMIE: MAIN CARD SURGICAL TEXT FIT
   Baza: R128 v4.4 test state / zamrożony R127.
   Grafika = cały wygląd. Kod = dane LIVE + niewidzialne hotspoty.
   W tym kroku ruszona wyłącznie karta główna NOTATKI O FIRMIE.
   R120 / R121 / R122 / R127 pozostają bez zmian.
*/
importScripts('./sw-r127-language-base.js?v=R128-v4-5a-main-card-surgical-text-fit');

if(Array.isArray(ASSETS)){
  [
    './r128-notatki-live.js',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000c0ac8210a2eab26769101d1e.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_0000000043ac8207a71d319b6ef15188.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000a600821083280e45a39d12f3.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000df5c81f69bd362e0ec6b55a9.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000995c82109a658e01b57fd04f.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000c5ec820eb0d4cff0e6895173.png'
  ].forEach(function(a){if(!ASSETS.includes(a))ASSETS.push(a);});
}

const r128v45aBasePatch=r48PatchIndexHtml;
r48PatchIndexHtml=function(text){
  let out=r128v45aBasePatch(text);

  /* Zachowujemy sprawdzony hotfix separatora R127. */
  out=out.replace("\\n  function r115RenderCompanyMaster(){","\n  function r115RenderCompanyMaster(){");

  /* Tylko metadane wydania — bez zmian w zamrożonych modułach. */
  out=out.replaceAll('1.3.0-master-r127-offer-language-clean-master','1.3.0-master-r128v4-5a-company-notes-main-card-surgical-text-fit');
  out=out.replaceAll('R127 OFERTA — LANGUAGE LIVE + CLEAN MASTER','R128 v4.5A NOTATKI O FIRMIE — MAIN CARD SURGICAL TEXT FIT');
  out=out.replaceAll('1.3.0-master-r128v4-4-company-notes-surgical-readability-grid-fit','1.3.0-master-r128v4-5a-company-notes-main-card-surgical-text-fit');
  out=out.replaceAll('R128 v4.4 NOTATKI O FIRMIE — SURGICAL READABILITY GRID FIT','R128 v4.5A NOTATKI O FIRMIE — MAIN CARD SURGICAL TEXT FIT');
  out=out.replace("const BUILD_TIME = '10:30';","const BUILD_TIME = '08:23';");
  out=out.replace("const BUILD_TIME = '22:46';","const BUILD_TIME = '08:23';");
  out=out.replace(/sw\.js\?v=R127-offer-language-clean-master-1030/g,'sw.js?v=R128v4-5a-company-notes-main-card-surgical-text-fit-0823');
  out=out.replace(/sw\.js\?v=R128v4-4-company-notes-surgical-readability-grid-fit-2246/g,'sw.js?v=R128v4-5a-company-notes-main-card-surgical-text-fit-0823');
  out=out.replace(/r84-backup-prune\.js\?v=R127-1030/g,'r84-backup-prune.js?v=R128v4-5a-0823');
  out=out.replace(/r84-backup-prune\.js\?v=R128v4-4-2246/g,'r84-backup-prune.js?v=R128v4-5a-0823');

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

  /* Moduł ładowany po głównym silniku; zmieniamy wyłącznie cache-buster. */
  out=out.replace(/<script src="\.\/r128-notatki-live\.js\?v=R128v4-4"><\/script>/g,'<script src="./r128-notatki-live.js?v=R128v4-5a"></script>');
  if(!out.includes('r128-notatki-live.js?v=R128v4-5a')){
    out=out.replace(/<script src="\.\/r128-notatki-live\.js\?v=R128v4-3"><\/script>\n<\/body>/,'<script src="./r128-notatki-live.js?v=R128v4-5a"></script>\n</body>');
    if(!out.includes('r128-notatki-live.js?v=R128v4-5a')){
      out=out.replace('</body>','<script src="./r128-notatki-live.js?v=R128v4-5a"></script>\n</body>');
    }
  }
  return out;
};