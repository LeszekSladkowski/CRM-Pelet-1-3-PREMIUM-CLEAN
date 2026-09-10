/* R129 v1.0A — CELE ASYSTENTA: GRAPHIC MASTER + LIVE
   Baza: R128 v4.5I NOTATKI O FIRMIE FINAL MASTER + R128 v4.6E FAKTY DO ROZMOWY FIX.
   Zakres R129: uruchomienie wyłącznie kafla CELE ASYSTENTA na zatwierdzonym czystym rastrze 852x1846.
   NOTATKI O FIRMIE i wszystkie wcześniejsze MASTER-y pozostają nietknięte.
*/
importScripts('./sw-r127-language-base.js?v=R129-v1-0a-cele-asystenta-live');

if(Array.isArray(ASSETS)){
  [
    './r128-notatki-live.js?v=R128v4-6c-detail-white-1x-enter-start',
    './r128-notatki-main-v45b.js?v=R128v4-5i-soft-kinetic-thumb-scroll',
    './r128-talk-detail-one-enter-fix.js?v=R128v4-6e-talk-detail-true-one-enter-fix',
    './r129-cele-asystenta-live.js?v=R129-v1-0a-cele-asystenta-live',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000c0ac8210a2eab26769101d1e.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_0000000043ac8207a71d319b6ef15188.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000a600821083280e45a39d12f3.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000df5c81f69bd362e0ec6b55a9.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000995c82109a658e01b57fd04f.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000c5ec820eb0d4cff0e6895173.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_000000001e34820a89f54a69f0269506.png?v=R129-v1-0a'
  ].forEach(function(a){if(!ASSETS.includes(a))ASSETS.push(a);});
}

const r129BasePatch=r48PatchIndexHtml;
r48PatchIndexHtml=function(text){
  let out=r129BasePatch(text);

  /* Zachowujemy sprawdzony hotfix separatora R127. */
  out=out.replace("\\n  function r115RenderCompanyMaster(){","\n  function r115RenderCompanyMaster(){");

  /* Najpierw odtwarzamy wszystkie zatwierdzone patche R128 bez zmian. */
  out=out.replaceAll('1.3.0-master-r127-offer-language-clean-master','1.3.0-master-r128v4-6e-talk-detail-true-one-enter-fix');
  out=out.replaceAll('R127 OFERTA — LANGUAGE LIVE + CLEAN MASTER','R128 v4.6E FAKTY DO ROZMOWY — TRUE 1 ENTER FIX');
  out=out.replaceAll('1.3.0-master-r128v4-5a-company-notes-main-card-surgical-text-fit','1.3.0-master-r128v4-6e-talk-detail-true-one-enter-fix');
  out=out.replaceAll('R128 v4.5A NOTATKI O FIRMIE — MAIN CARD SURGICAL TEXT FIT','R128 v4.6E FAKTY DO ROZMOWY — TRUE 1 ENTER FIX');
  out=out.replaceAll('1.3.0-master-r128v4-5b-company-notes-main-card-clean-typography','1.3.0-master-r128v4-6e-talk-detail-true-one-enter-fix');
  out=out.replaceAll('R128 v4.5B NOTATKI O FIRMIE — MAIN CARD CLEAN TYPOGRAPHY','R128 v4.6E FAKTY DO ROZMOWY — TRUE 1 ENTER FIX');
  out=out.replaceAll('1.3.0-master-r128v4-5c-company-notes-main-card-surgical-alignment','1.3.0-master-r128v4-6e-talk-detail-true-one-enter-fix');
  out=out.replaceAll('R128 v4.5C NOTATKI O FIRMIE — MAIN CARD SURGICAL ALIGNMENT','R128 v4.6E FAKTY DO ROZMOWY — TRUE 1 ENTER FIX');
  out=out.replaceAll('1.3.0-master-r128v4-5d-company-notes-main-card-final-surgical-alignment','1.3.0-master-r128v4-6e-talk-detail-true-one-enter-fix');
  out=out.replaceAll('R128 v4.5D NOTATKI O FIRMIE — MAIN CARD FINAL SURGICAL ALIGNMENT','R128 v4.6E FAKTY DO ROZMOWY — TRUE 1 ENTER FIX');
  out=out.replaceAll('1.3.0-master-r128v4-5e-company-notes-main-card-true-1to1-alignment','1.3.0-master-r128v4-6e-talk-detail-true-one-enter-fix');
  out=out.replaceAll('R128 v4.5E NOTATKI O FIRMIE — TRUE 1:1 TEXT ALIGNMENT','R128 v4.6E FAKTY DO ROZMOWY — TRUE 1 ENTER FIX');
  out=out.replaceAll('1.3.0-master-r128v4-5f-company-notes-main-card-final-surgical-baseline','1.3.0-master-r128v4-6e-talk-detail-true-one-enter-fix');
  out=out.replaceAll('R128 v4.5F NOTATKI O FIRMIE — FINAL SURGICAL BASELINE','R128 v4.6E FAKTY DO ROZMOWY — TRUE 1 ENTER FIX');
  out=out.replaceAll('1.3.0-master-r128v4-5g-company-notes-anpol-restore-thinner-body','1.3.0-master-r128v4-6e-talk-detail-true-one-enter-fix');
  out=out.replaceAll('R128 v4.5G NOTATKI O FIRMIE — ANPOL RESTORE + THINNER BODY','R128 v4.6E FAKTY DO ROZMOWY — TRUE 1 ENTER FIX');
  out=out.replaceAll('1.3.0-master-r128v4-5h-company-notes-thumb-scroll-auto-center','1.3.0-master-r128v4-6e-talk-detail-true-one-enter-fix');
  out=out.replaceAll('R128 v4.5H NOTATKI O FIRMIE — THUMB SCROLL + AUTO CENTER','R128 v4.6E FAKTY DO ROZMOWY — TRUE 1 ENTER FIX');
  out=out.replaceAll('1.3.0-master-r128v4-5i-company-notes-soft-kinetic-thumb-scroll','1.3.0-master-r128v4-6e-talk-detail-true-one-enter-fix');
  out=out.replaceAll('R128 v4.5I NOTATKI O FIRMIE — SOFT KINETIC THUMB SCROLL','R128 v4.6E FAKTY DO ROZMOWY — TRUE 1 ENTER FIX');
  out=out.replaceAll('1.3.0-master-r128v4-6a-company-notes-detail-white-baseline','1.3.0-master-r128v4-6e-talk-detail-true-one-enter-fix');
  out=out.replaceAll('R128 v4.6A NOTATKI O FIRMIE — DETAIL WHITE TEXT BASELINE','R128 v4.6E FAKTY DO ROZMOWY — TRUE 1 ENTER FIX');
  out=out.replaceAll('1.3.0-master-r128v4-6b-company-notes-detail-white-2x-enter-baseline','1.3.0-master-r128v4-6e-talk-detail-true-one-enter-fix');
  out=out.replaceAll('R128 v4.6B NOTATKI O FIRMIE — DETAIL WHITE TEXT 2x ENTER BASELINE','R128 v4.6E FAKTY DO ROZMOWY — TRUE 1 ENTER FIX');
  out=out.replaceAll('1.3.0-master-r128v4-6c-company-notes-detail-white-1x-enter-start','1.3.0-master-r128v4-6e-talk-detail-true-one-enter-fix');
  out=out.replaceAll('R128 v4.6C NOTATKI O FIRMIE — DETAIL WHITE TEXT 1x ENTER START','R128 v4.6E FAKTY DO ROZMOWY — TRUE 1 ENTER FIX');
  out=out.replaceAll('1.3.0-master-r128v4-6d-talk-detail-one-enter-fix','1.3.0-master-r128v4-6e-talk-detail-true-one-enter-fix');
  out=out.replaceAll('R128 v4.6D FAKTY DO ROZMOWY — WHITE TEXT 1 ENTER FIX','R128 v4.6E FAKTY DO ROZMOWY — TRUE 1 ENTER FIX');

  /* R129 — tylko nowa gałąź CELE ASYSTENTA. */
  out=out.replaceAll('1.3.0-master-r128v4-6e-talk-detail-true-one-enter-fix','1.3.0-master-r129v1-0a-cele-asystenta-live');
  out=out.replaceAll('R128 v4.6E FAKTY DO ROZMOWY — TRUE 1 ENTER FIX','R129 v1.0A CELE ASYSTENTA — GRAPHIC MASTER + LIVE');
  out=out.replace(/const BUILD_DATE = '[^']*';/,"const BUILD_DATE = '10.09.2026';");
  out=out.replace(/const BUILD_TIME = '[^']*';/,"const BUILD_TIME = '15:07';");
  out=out.replace(/sw\.js\?v=[^'\"]+/g,'sw.js?v=R129-v1-0a-cele-asystenta-live-1507');
  out=out.replace(/r84-backup-prune\.js\?v=[^'\"]+/g,'r84-backup-prune.js?v=R129-v1-0a-1507');

  /* Minimalna ekspozycja istniejących helperów. Dodajemy tylko wejście do istniejącego STATUS CRM. */
  if(!out.includes('window.R128_CTX=')){
    out=out.replace(
      '  renderCompany=r115RenderCompanyMaster;',
      "  renderCompany=r115RenderCompanyMaster;\n  window.R128_CTX={app:(typeof app!=='undefined'?app:null),hotspot:(typeof hotspot==='function'?hotspot:null),render:(typeof render==='function'?render:null),sync:(typeof sync==='function'?sync:null),getCompanyById:(typeof getCompanyById==='function'?getCompanyById:null),state:(typeof state!=='undefined'?state:null),marketRolesFor:(typeof marketRolesFor==='function'?marketRolesFor:null),countries:(typeof countries!=='undefined'?countries:null),r115NewTile:(typeof r115NewTile==='function'?r115NewTile:null),openStatus:(typeof r15OpenStatus==='function'?r15OpenStatus:null),toast:(typeof toast==='function'?toast:null)};"
    );
  }else if(!out.includes('openStatus:(typeof r15OpenStatus')){
    out=out.replace(
      "r115NewTile:(typeof r115NewTile==='function'?r115NewTile:null),toast:",
      "r115NewTile:(typeof r115NewTile==='function'?r115NewTile:null),openStatus:(typeof r15OpenStatus==='function'?r15OpenStatus:null),toast:"
    );
  }

  /* NOTATKI O FIRMIE — bez zmian względem R128. */
  out=out.replace(
    "onClick:()=>r115NewTile('NOTATKI O FIRMIE')",
    "onClick:()=>((window.R128_NOTES&&typeof window.R128_NOTES.open==='function')?window.R128_NOTES.open(c):r115NewTile('NOTATKI O FIRMIE'))"
  );

  /* CELE ASYSTENTA — uruchomienie przycisku nr 6 z karty firmy. */
  out=out.replaceAll(
    "onClick:()=>r115NewTile('CELE ASYSTENTA')",
    "onClick:()=>((window.R129_GOALS&&typeof window.R129_GOALS.open==='function')?window.R129_GOALS.open():r115NewTile('CELE ASYSTENTA'))"
  );

  out=out.replace(/<script src="\.\/r128-notatki-live\.js\?v=R128v4-[^"]*"><\/script>/g,'<script src="./r128-notatki-live.js?v=R128v4-6c-detail-white-1x-enter-start"></script>');
  if(!out.includes('r128-notatki-live.js?v=R128v4-6c-detail-white-1x-enter-start')){
    out=out.replace(/<script src="\.\/r128-notatki-live\.js\?v=R128v4-[0-9a-z-]+"><\/script>\n<\/body>/,'<script src="./r128-notatki-live.js?v=R128v4-6c-detail-white-1x-enter-start"></script>\n</body>');
    if(!out.includes('r128-notatki-live.js?v=R128v4-6c-detail-white-1x-enter-start')){
      out=out.replace('</body>','<script src="./r128-notatki-live.js?v=R128v4-6c-detail-white-1x-enter-start"></script>\n</body>');
    }
  }

  /* Zamrożony silnik głównej karty R128 v4.5I pozostaje dokładnie ten sam. */
  out=out.replace(/<script src="\.\/r128-notatki-main-v45b\.js\?v=R128v4-[^"]*"><\/script>/g,'<script src="./r128-notatki-main-v45b.js?v=R128v4-5i-soft-kinetic-thumb-scroll"></script>');
  if(!out.includes('r128-notatki-main-v45b.js?v=R128v4-5i-soft-kinetic-thumb-scroll')){
    out=out.replace('</body>','<script src="./r128-notatki-main-v45b.js?v=R128v4-5i-soft-kinetic-thumb-scroll"></script>\n</body>');
  }

  /* R128 v4.6E — zachowujemy dokładnie istniejący chirurgiczny patch FAKTY DO ROZMOWY. */
  out=out.replace(/<script src="\.\/r128-talk-detail-one-enter-fix\.js\?v=[^"]*"><\/script>/g,'<script src="./r128-talk-detail-one-enter-fix.js?v=R128v4-6e-talk-detail-true-one-enter-fix"></script>');
  if(!out.includes('r128-talk-detail-one-enter-fix.js?v=R128v4-6e-talk-detail-true-one-enter-fix')){
    out=out.replace('</body>','<script src="./r128-talk-detail-one-enter-fix.js?v=R128v4-6e-talk-detail-true-one-enter-fix"></script>\n</body>');
  }

  /* R129 — nowy silnik CELE ASYSTENTA. */
  out=out.replace(/<script src="\.\/r129-cele-asystenta-live\.js\?v=[^"]*"><\/script>/g,'<script src="./r129-cele-asystenta-live.js?v=R129-v1-0a-cele-asystenta-live"></script>');
  if(!out.includes('r129-cele-asystenta-live.js?v=R129-v1-0a-cele-asystenta-live')){
    out=out.replace('</body>','<script src="./r129-cele-asystenta-live.js?v=R129-v1-0a-cele-asystenta-live"></script>\n</body>');
  }
  return out;
};