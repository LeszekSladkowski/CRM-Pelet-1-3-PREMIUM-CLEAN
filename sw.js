/* R130 v1.0F — AKCJE I STATUS — REFERENCE GEOMETRY RESTORE
   Baza: zamrożony raster MASTER 852x1846 + referencyjne współrzędne LIVE silnika R130 v1.0A.
   Cel: usunąć błędne późniejsze przesunięcia R130 v1.0D i przywrócić pełną geometrię 1:1 na Samsung Galaxy S24 Ultra.
   Dane, statusy, alerty, zadania, localStorage, hotspoty oraz wcześniejsze MASTER-y pozostają nietknięte.
*/
importScripts('./sw-r127-language-base.js?v=R130-v1-0f-reference-geometry-restore');

if(Array.isArray(ASSETS)){
  [
    './r128-notatki-live.js?v=R128v4-6c-detail-white-1x-enter-start',
    './r128-notatki-main-v45b.js?v=R128v4-5i-soft-kinetic-thumb-scroll',
    './r128-talk-detail-one-enter-fix.js?v=R128v4-6e-talk-detail-true-one-enter-fix',
    './r129-cele-asystenta-live.js?v=R129-v1-0b-cele-asystenta-surgical-1to1',
    './r130-akcje-status-live.js?v=R130-v1-0f-reference-geometry-restore',
    './r130-akcje-status-layout-fix.js?v=R130-v1-0f-reference-geometry-restore',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000c0ac8210a2eab26769101d1e.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_0000000043ac8207a71d319b6ef15188.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000a600821083280e45a39d12f3.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000df5c81f69bd362e0ec6b55a9.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000995c82109a658e01b57fd04f.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000c5ec820eb0d4cff0e6895173.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_000000001e34820a89f54a69f0269506.png?v=R129-v1-0b',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000d4dc820e99d86989f5522858.png?v=R130-v1-0f'
  ].forEach(function(a){if(!ASSETS.includes(a))ASSETS.push(a);});
}

const r130BasePatch=r48PatchIndexHtml;
r48PatchIndexHtml=function(text){
  let out=r130BasePatch(text);

  /* Stabilny hotfix separatora zachowany. */
  out=out.replace("\\n  function r115RenderCompanyMaster(){","\n  function r115RenderCompanyMaster(){");

  /* Jednoznaczna synchronizacja wersji z każdego stanu R127/R130 do R130 v1.0F. */
  [
    '1.3.0-master-r127-offer-language-clean-master',
    '1.3.0-master-r130v1-0a-actions-status-full-live',
    '1.3.0-master-r130v1-0b-actions-status-surgical-layout-fit',
    '1.3.0-master-r130v1-0c-actions-status-surgical-live-alignment-1to1',
    '1.3.0-master-r130v1-0d-actions-status-pixel-master-fit-1to1',
    '1.3.0-master-r130v1-0e-update-engine-sync-hotfix'
  ].forEach(function(v){out=out.replaceAll(v,'1.3.0-master-r130v1-0f-reference-geometry-restore');});
  [
    'R127 OFERTA — LANGUAGE LIVE + CLEAN MASTER',
    'R130 v1.0A AKCJE I STATUS — FULL LIVE TEST',
    'R130 v1.0B AKCJE I STATUS — SURGICAL LAYOUT FIT',
    'R130 v1.0C AKCJE I STATUS — SURGICAL LIVE ALIGNMENT 1:1',
    'R130 v1.0D AKCJE I STATUS — PIXEL MASTER FIT 1:1',
    'R130 v1.0E AKCJE I STATUS — UPDATE ENGINE SYNC HOTFIX'
  ].forEach(function(v){out=out.replaceAll(v,'R130 v1.0F AKCJE I STATUS — REFERENCE GEOMETRY RESTORE');});
  out=out.replace(/const BUILD_DATE = '[^']*';/,"const BUILD_DATE = '10.09.2026';");
  out=out.replace(/const BUILD_TIME = '[^']*';/,"const BUILD_TIME = '21:08';");
  out=out.replace(/sw\.js\?v=[^'\"]+/g,'sw.js?v=R130-v1-0f-reference-geometry-restore-2108');
  out=out.replace(/r84-backup-prune\.js\?v=[^'\"]+/g,'r84-backup-prune.js?v=R130-v1-0f-2108');

  /* Wspólny kontekst LIVE dla zamrożonych kart R128/R129 i R130. */
  if(!out.includes('window.R128_CTX=')){
    out=out.replace(
      '  renderCompany=r115RenderCompanyMaster;',
      "  renderCompany=r115RenderCompanyMaster;\n  window.R128_CTX={app:(typeof app!=='undefined'?app:null),hotspot:(typeof hotspot==='function'?hotspot:null),render:(typeof render==='function'?render:null),sync:(typeof sync==='function'?sync:null),go:(typeof go==='function'?go:null),getCompanyById:(typeof getCompanyById==='function'?getCompanyById:null),state:(typeof state!=='undefined'?state:null),marketRolesFor:(typeof marketRolesFor==='function'?marketRolesFor:null),countries:(typeof countries!=='undefined'?countries:null),r115NewTile:(typeof r115NewTile==='function'?r115NewTile:null),openStatus:(typeof r15OpenStatus==='function'?r15OpenStatus:null),openPrices:(typeof r121OpenCompanyPrices==='function'?r121OpenCompanyPrices:null),openHistory:(typeof r122OpenCompanyHistory==='function'?r122OpenCompanyHistory:null),openOffer:(typeof r123OpenGenerator==='function'?r123OpenGenerator:null),toast:(typeof toast==='function'?toast:null)};"
    );
  }

  /* Zamrożone wejścia R128 i R129 pozostają dokładnie aktywne. */
  out=out.replaceAll(
    "onClick:()=>r115NewTile('NOTATKI O FIRMIE')",
    "onClick:()=>((window.R128_NOTES&&typeof window.R128_NOTES.open==='function')?window.R128_NOTES.open(c):r115NewTile('NOTATKI O FIRMIE'))"
  );
  out=out.replaceAll(
    "onClick:()=>r115NewTile('CELE ASYSTENTA')",
    "onClick:()=>((window.R129_GOALS&&typeof window.R129_GOALS.open==='function')?window.R129_GOALS.open():r115NewTile('CELE ASYSTENTA'))"
  );

  /* R130 — aktywne wejście przycisku nr 7 AKCJE I STATUS. */
  out=out.replaceAll(
    "onClick:()=>r115NewTile('AKCJE I STATUS')",
    "onClick:()=>((window.R130_ACTIONS&&typeof window.R130_ACTIONS.open==='function')?window.R130_ACTIONS.open():r115NewTile('AKCJE I STATUS'))"
  );

  /* Skrypty LIVE — wymuszony cache-busting R130 v1.0F. */
  out=out.replace(/<script src="\.\/r128-notatki-live\.js\?v=[^"]*"><\/script>/g,'<script src="./r128-notatki-live.js?v=R128v4-6c-detail-white-1x-enter-start"></script>');
  if(!out.includes('r128-notatki-live.js?v=R128v4-6c-detail-white-1x-enter-start'))out=out.replace('</body>','<script src="./r128-notatki-live.js?v=R128v4-6c-detail-white-1x-enter-start"></script>\n</body>');

  out=out.replace(/<script src="\.\/r128-notatki-main-v45b\.js\?v=[^"]*"><\/script>/g,'<script src="./r128-notatki-main-v45b.js?v=R128v4-5i-soft-kinetic-thumb-scroll"></script>');
  if(!out.includes('r128-notatki-main-v45b.js?v=R128v4-5i-soft-kinetic-thumb-scroll'))out=out.replace('</body>','<script src="./r128-notatki-main-v45b.js?v=R128v4-5i-soft-kinetic-thumb-scroll"></script>\n</body>');

  out=out.replace(/<script src="\.\/r128-talk-detail-one-enter-fix\.js\?v=[^"]*"><\/script>/g,'<script src="./r128-talk-detail-one-enter-fix.js?v=R128v4-6e-talk-detail-true-one-enter-fix"></script>');
  if(!out.includes('r128-talk-detail-one-enter-fix.js?v=R128v4-6e-talk-detail-true-one-enter-fix'))out=out.replace('</body>','<script src="./r128-talk-detail-one-enter-fix.js?v=R128v4-6e-talk-detail-true-one-enter-fix"></script>\n</body>');

  out=out.replace(/<script src="\.\/r129-cele-asystenta-live\.js\?v=[^"]*"><\/script>/g,'<script src="./r129-cele-asystenta-live.js?v=R129-v1-0b-cele-asystenta-surgical-1to1"></script>');
  if(!out.includes('r129-cele-asystenta-live.js?v=R129-v1-0b-cele-asystenta-surgical-1to1'))out=out.replace('</body>','<script src="./r129-cele-asystenta-live.js?v=R129-v1-0b-cele-asystenta-surgical-1to1"></script>\n</body>');

  out=out.replace(/<script src="\.\/r130-akcje-status-live\.js\?v=[^"]*"><\/script>/g,'<script src="./r130-akcje-status-live.js?v=R130-v1-0f-reference-geometry-restore"></script>');
  if(!out.includes('r130-akcje-status-live.js?v=R130-v1-0f-reference-geometry-restore'))out=out.replace('</body>','<script src="./r130-akcje-status-live.js?v=R130-v1-0f-reference-geometry-restore"></script>\n</body>');

  out=out.replace(/<script src="\.\/r130-akcje-status-layout-fix\.js\?v=[^"]*"><\/script>/g,'<script src="./r130-akcje-status-layout-fix.js?v=R130-v1-0f-reference-geometry-restore"></script>');
  if(!out.includes('r130-akcje-status-layout-fix.js?v=R130-v1-0f-reference-geometry-restore'))out=out.replace('</body>','<script src="./r130-akcje-status-layout-fix.js?v=R130-v1-0f-reference-geometry-restore"></script>\n</body>');

  return out;
};