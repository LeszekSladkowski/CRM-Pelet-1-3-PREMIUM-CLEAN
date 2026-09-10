/* R128 v4.5F — NOTATKI O FIRMIE: FINAL SURGICAL BASELINE
   Baza: R128 v4.5E / zamrożony R127.
   Grafika = cały wygląd. Kod = dane LIVE + niewidzialne hotspoty.
   W tym kroku ruszona wyłącznie geometria istniejących białych opisów głównej karty NOTATKI O FIRMIE.
   ANPOL pozostaje bez zmian. PNG, tytuły kafli, ikony, hotspoty, routing i karty szczegółowe bez zmian.
   Bez nowych ramek, masek, nakładek, skrótów, wielokropków i kasowania wierszy.
*/
importScripts('./sw-r127-language-base.js?v=R128-v4-5f-main-card-final-surgical-baseline');

if(Array.isArray(ASSETS)){
  [
    './r128-notatki-live.js',
    './r128-notatki-main-v45b.js?v=R128v4-5f-main-card-final-surgical-baseline',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000c0ac8210a2eab26769101d1e.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_0000000043ac8207a71d319b6ef15188.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000a600821083280e45a39d12f3.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000df5c81f69bd362e0ec6b55a9.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000995c82109a658e01b57fd04f.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000c5ec820eb0d4cff0e6895173.png'
  ].forEach(function(a){if(!ASSETS.includes(a))ASSETS.push(a);});
}

const r128v45fBasePatch=r48PatchIndexHtml;
r48PatchIndexHtml=function(text){
  let out=r128v45fBasePatch(text);

  /* Zachowujemy sprawdzony hotfix separatora R127. */
  out=out.replace("\\n  function r115RenderCompanyMaster(){","\n  function r115RenderCompanyMaster(){");

  /* Metadane wydania. */
  out=out.replaceAll('1.3.0-master-r127-offer-language-clean-master','1.3.0-master-r128v4-5f-company-notes-main-card-final-surgical-baseline');
  out=out.replaceAll('R127 OFERTA — LANGUAGE LIVE + CLEAN MASTER','R128 v4.5F NOTATKI O FIRMIE — FINAL SURGICAL BASELINE');
  out=out.replaceAll('1.3.0-master-r128v4-5a-company-notes-main-card-surgical-text-fit','1.3.0-master-r128v4-5f-company-notes-main-card-final-surgical-baseline');
  out=out.replaceAll('R128 v4.5A NOTATKI O FIRMIE — MAIN CARD SURGICAL TEXT FIT','R128 v4.5F NOTATKI O FIRMIE — FINAL SURGICAL BASELINE');
  out=out.replaceAll('1.3.0-master-r128v4-5b-company-notes-main-card-clean-typography','1.3.0-master-r128v4-5f-company-notes-main-card-final-surgical-baseline');
  out=out.replaceAll('R128 v4.5B NOTATKI O FIRMIE — MAIN CARD CLEAN TYPOGRAPHY','R128 v4.5F NOTATKI O FIRMIE — FINAL SURGICAL BASELINE');
  out=out.replaceAll('1.3.0-master-r128v4-5c-company-notes-main-card-surgical-alignment','1.3.0-master-r128v4-5f-company-notes-main-card-final-surgical-baseline');
  out=out.replaceAll('R128 v4.5C NOTATKI O FIRMIE — MAIN CARD SURGICAL ALIGNMENT','R128 v4.5F NOTATKI O FIRMIE — FINAL SURGICAL BASELINE');
  out=out.replaceAll('1.3.0-master-r128v4-5d-company-notes-main-card-final-surgical-alignment','1.3.0-master-r128v4-5f-company-notes-main-card-final-surgical-baseline');
  out=out.replaceAll('R128 v4.5D NOTATKI O FIRMIE — MAIN CARD FINAL SURGICAL ALIGNMENT','R128 v4.5F NOTATKI O FIRMIE — FINAL SURGICAL BASELINE');
  out=out.replaceAll('1.3.0-master-r128v4-5e-company-notes-main-card-true-1to1-alignment','1.3.0-master-r128v4-5f-company-notes-main-card-final-surgical-baseline');
  out=out.replaceAll('R128 v4.5E NOTATKI O FIRMIE — TRUE 1:1 TEXT ALIGNMENT','R128 v4.5F NOTATKI O FIRMIE — FINAL SURGICAL BASELINE');
  out=out.replace(/const BUILD_TIME = '[^']*';/,"const BUILD_TIME = '11:08';");
  out=out.replace(/sw\.js\?v=R128v4-5[a-z0-9-]*/g,'sw.js?v=R128v4-5f-company-notes-main-card-final-surgical-baseline-1108');
  out=out.replace(/r84-backup-prune\.js\?v=R128v4-5[a-z0-9-]*/g,'r84-backup-prune.js?v=R128v4-5f-1108');

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

  /* Bazowy moduł R128 pozostaje bez zmian funkcjonalnych. */
  out=out.replace(/<script src="\.\/r128-notatki-live\.js\?v=R128v4-5[a-f][^"]*"><\/script>/g,'<script src="./r128-notatki-live.js?v=R128v4-5f"></script>');
  if(!out.includes('r128-notatki-live.js?v=R128v4-5f')){
    out=out.replace(/<script src="\.\/r128-notatki-live\.js\?v=R128v4-[0-9a-z-]+"><\/script>\n<\/body>/,'<script src="./r128-notatki-live.js?v=R128v4-5f"></script>\n</body>');
    if(!out.includes('r128-notatki-live.js?v=R128v4-5f')){
      out=out.replace('</body>','<script src="./r128-notatki-live.js?v=R128v4-5f"></script>\n</body>');
    }
  }

  /* v4.5F: jeden moduł geometrii głównej karty, nowy cache-key. */
  out=out.replace(/<script src="\.\/r128-notatki-main-v45b\.js\?v=R128v4-5[b-f][^"]*"><\/script>/g,'<script src="./r128-notatki-main-v45b.js?v=R128v4-5f-main-card-final-surgical-baseline"></script>');
  if(!out.includes('r128-notatki-main-v45b.js?v=R128v4-5f-main-card-final-surgical-baseline')){
    out=out.replace('</body>','<script src="./r128-notatki-main-v45b.js?v=R128v4-5f-main-card-final-surgical-baseline"></script>\n</body>');
  }
  return out;
};
