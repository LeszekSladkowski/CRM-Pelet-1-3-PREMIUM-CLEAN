/* R130 v1.0G — AKCJE I STATUS — PIXEL REFERENCE ALIGNMENT 1:1
   Baza: zamrożony raster MASTER 852x1846 + silnik R130 v1.0A.
   Cel: chirurgicznie osadzić warstwę LIVE zgodnie z jedynym zatwierdzonym wzorcem referencyjnym.
   Dane, statusy, alerty, zadania, localStorage, hotspoty oraz wcześniejsze MASTER-y pozostają nietknięte.
*/
importScripts('./sw-r127-language-base.js?v=R130-v1-0g-pixel-reference-alignment-1to1');

if(Array.isArray(ASSETS)){
  [
    './r128-notatki-live.js?v=R128v4-6c-detail-white-1x-enter-start',
    './r128-notatki-main-v45b.js?v=R128v4-5i-soft-kinetic-thumb-scroll',
    './r128-talk-detail-one-enter-fix.js?v=R128v4-6e-talk-detail-true-one-enter-fix',
    './r129-cele-asystenta-live.js?v=R129-v1-0b-cele-asystenta-surgical-1to1',
    './r130-akcje-status-live.js?v=R130-v1-0g-pixel-reference-alignment-1to1',
    './r130-akcje-status-layout-fix.js?v=R130-v1-0g-pixel-reference-alignment-1to1',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000c0ac8210a2eab26769101d1e.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_0000000043ac8207a71d319b6ef15188.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000a600821083280e45a39d12f3.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000df5c81f69bd362e0ec6b55a9.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000995c82109a658e01b57fd04f.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000c5ec820eb0d4cff0e6895173.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_000000001e34820a89f54a69f0269506.png?v=R129-v1-0b',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000d4dc820e99d86989f5522858.png?v=R130-v1-0g'
  ].forEach(function(a){if(!ASSETS.includes(a))ASSETS.push(a);});
}

const r130BasePatch=r48PatchIndexHtml;
r48PatchIndexHtml=function(text){
  let out=r130BasePatch(text);

  out=out.replace("\\n  function r115RenderCompanyMaster(){","\n  function r115RenderCompanyMaster(){");

  [
    '1.3.0-master-r127-offer-language-clean-master',
    '1.3.0-master-r130v1-0a-actions-status-full-live',
    '1.3.0-master-r130v1-0b-actions-status-surgical-layout-fit',
    '1.3.0-master-r130v1-0c-actions-status-surgical-live-alignment-1to1',
    '1.3.0-master-r130v1-0d-actions-status-pixel-master-fit-1to1',
    '1.3.0-master-r130v1-0e-update-engine-sync-hotfix',
    '1.3.0-master-r130v1-0f-reference-geometry-restore'
  ].forEach(function(v){out=out.replaceAll(v,'1.3.0-master-r130v1-0g-pixel-reference-alignment-1to1');});
  [
    'R127 OFERTA — LANGUAGE LIVE + CLEAN MASTER',
    'R130 v1.0A AKCJE I STATUS — FULL LIVE TEST',
    'R130 v1.0B AKCJE I STATUS — SURGICAL LAYOUT FIT',
    'R130 v1.0C AKCJE I STATUS — SURGICAL LIVE ALIGNMENT 1:1',
    'R130 v1.0D AKCJE I STATUS — PIXEL MASTER FIT 1:1',
    'R130 v1.0E AKCJE I STATUS — UPDATE ENGINE SYNC HOTFIX',
    'R130 v1.0F AKCJE I STATUS — REFERENCE GEOMETRY RESTORE'
  ].forEach(function(v){out=out.replaceAll(v,'R130 v1.0G AKCJE I STATUS — PIXEL REFERENCE ALIGNMENT 1:1');});
  out=out.replace(/const BUILD_DATE = '[^']*';/,"const BUILD_DATE = '10.09.2026';");
  out=out.replace(/const BUILD_TIME = '[^']*';/,"const BUILD_TIME = '21:43';");
  out=out.replace(/sw\.js\?v=[^'\"]+/g,'sw.js?v=R130-v1-0g-pixel-reference-alignment-1to1-2143');
  out=out.replace(/r84-backup-prune\.js\?v=[^'\"]+/g,'r84-backup-prune.js?v=R130-v1-0g-2143');

  if(!out.includes('window.R128_CTX=')){
    out=out.replace(
      '  renderCompany=r115RenderCompanyMaster;',
      "  renderCompany=r115RenderCompanyMaster;\n  window.R128_CTX={app:(typeof app!=='undefined'?app:null),hotspot:(typeof hotspot==='function'?hotspot:null),render:(typeof render==='function'?render:null),sync:(typeof sync==='function'?sync:null),go:(typeof go==='function'?go:null),getCompanyById:(typeof getCompanyById==='function'?getCompanyById:null),state:(typeof state!=='undefined'?state:null),marketRolesFor:(typeof marketRolesFor==='function'?marketRolesFor:null),countries:(typeof countries!=='undefined'?countries:null),r115NewTile:(typeof r115NewTile==='function'?r115NewTile:null),openStatus:(typeof r15OpenStatus==='function'?r15OpenStatus:null),openPrices:(typeof r121OpenCompanyPrices==='function'?r121OpenCompanyPrices:null),openHistory:(typeof r122OpenCompanyHistory==='function'?r122OpenCompanyHistory:null),openOffer:(typeof r123OpenGenerator==='function'?r123OpenGenerator:null),toast:(typeof toast==='function'?toast:null)};"
    );
  }

  out=out.replaceAll(
    "onClick:()=>r115NewTile('NOTATKI O FIRMIE')",
    "onClick:()=>((window.R128_NOTES&&typeof window.R128_NOTES.open==='function')?window.R128_NOTES.open(c):r115NewTile('NOTATKI O FIRMIE'))"
  );
  out=out.replaceAll(
    "onClick:()=>r115NewTile('CELE ASYSTENTA')",
    "onClick:()=>((window.R129_GOALS&&typeof window.R129_GOALS.open==='function')?window.R129_GOALS.open():r115NewTile('CELE ASYSTENTA'))"
  );

  out=out.replaceAll(
    "onClick:()=>r115NewTile('AKCJE I STATUS')",
    "onClick:()=>((window.R130_ACTIONS&&typeof window.R130_ACTIONS.open==='function')?window.R130_ACTIONS.open():r115NewTile('AKCJE I STATUS'))"
  );

  out=out.replace(/<script src="\.\/r128-notatki-live\.js\?v=[^"]*"><\/script>/g,'<script src="./r128-notatki-live.js?v=R128v4-6c-detail-white-1x-enter-start"></script>');
  if(!out.includes('r128-notatki-live.js?v=R128v4-6c-detail-white-1x-enter-start'))out=out.replace('</body>','<script src="./r128-notatki-live.js?v=R128v4-6c-detail-white-1x-enter-start"></script>\n</body>');

  out=out.replace(/<script src="\.\/r128-notatki-main-v45b\.js\?v=[^"]*"><\/script>/g,'<script src="./r128-notatki-main-v45b.js?v=R128v4-5i-soft-kinetic-thumb-scroll"></script>');
  if(!out.includes('r128-notatki-main-v45b.js?v=R128v4-5i-soft-kinetic-thumb-scroll'))out=out.replace('</body>','<script src="./r128-notatki-main-v45b.js?v=R128v4-5i-soft-kinetic-thumb-scroll"></script>\n</body>');

  out=out.replace(/<script src="\.\/r128-talk-detail-one-enter-fix\.js\?v=[^"]*"><\/script>/g,'<script src="./r128-talk-detail-one-enter-fix.js?v=R128v4-6e-talk-detail-true-one-enter-fix"></script>');
  if(!out.includes('r128-talk-detail-one-enter-fix.js?v=R128v4-6e-talk-detail-true-one-enter-fix'))out=out.replace('</body>','<script src="./r128-talk-detail-one-enter-fix.js?v=R128v4-6e-talk-detail-true-one-enter-fix"></script>\n</body>');

  out=out.replace(/<script src="\.\/r129-cele-asystenta-live\.js\?v=[^"]*"><\/script>/g,'<script src="./r129-cele-asystenta-live.js?v=R129-v1-0b-cele-asystenta-surgical-1to1"></script>');
  if(!out.includes('r129-cele-asystenta-live.js?v=R129-v1-0b-cele-asystenta-surgical-1to1'))out=out.replace('</body>','<script src="./r129-cele-asystenta-live.js?v=R129-v1-0b-cele-asystenta-surgical-1to1"></script>\n</body>');

  out=out.replace(/<script src="\.\/r130-akcje-status-live\.js\?v=[^"]*"><\/script>/g,'<script src="./r130-akcje-status-live.js?v=R130-v1-0g-pixel-reference-alignment-1to1"></script>');
  if(!out.includes('r130-akcje-status-live.js?v=R130-v1-0g-pixel-reference-alignment-1to1'))out=out.replace('</body>','<script src="./r130-akcje-status-live.js?v=R130-v1-0g-pixel-reference-alignment-1to1"></script>\n</body>');

  out=out.replace(/<script src="\.\/r130-akcje-status-layout-fix\.js\?v=[^"]*"><\/script>/g,'<script src="./r130-akcje-status-layout-fix.js?v=R130-v1-0g-pixel-reference-alignment-1to1"></script>');
  if(!out.includes('r130-akcje-status-layout-fix.js?v=R130-v1-0g-pixel-reference-alignment-1to1'))out=out.replace('</body>','<script src="./r130-akcje-status-layout-fix.js?v=R130-v1-0g-pixel-reference-alignment-1to1"></script>\n</body>');

  return out;
};

/* R131 TEST 2 — tylko fazowany feedback naciśnięcia WALUTY K1. */
importScripts('./r131-waluty-k1-press-chamfer-test2.js?v=R131-test2-waluty-k1-press-chamfer-1519');

/* R132 TEST 2 — szerokie pole + idealne optyczne centrowanie nazwy firmy w CELE ASYSTENTA. */
importScripts('./r132-cele-asystenta-company-name-center-test2.js?v=R132-test2-cele-company-name-center-1629');

/* R133 TEST 1 — typografia i kolory priorytetu na karcie CELE ASYSTENTA. */
importScripts('./r133-cele-asystenta-typography-priority-test1.js?v=R133-test1-cele-typography-priority-1701');

/* R134 TEST 1 — mikrotypografia: osadzenie nagłówków, opisów i podpisów akcji bez zmiany skali całej karty. */
importScripts('./r134-cele-asystenta-micro-typography-test1.js?v=R134-test1-cele-micro-typography-1803');