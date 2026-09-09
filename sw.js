/* R128 v2 — NOTATKI O FIRMIE: SAFE EXTERNAL LIVE MODULE
   Baza: zweryfikowany R127. Minimalny patch routingu + bezpieczny zewnętrzny moduł.
   R120 / R121 / R122 / R127 pozostają bez zmian.
*/
importScripts('./sw-r127-language-base.js?v=R128-v2-safe-notes');

if(Array.isArray(ASSETS)){
  [
    './r128-notatki-live.js',
    './grafiki/rynki-eu/szczegoly-firmy/file_0000000086cc8211895d9ec103b101c6.png',
    './grafiki/rynki-eu/szczegoly-firmy/file_00000000bd78820abbb3d95fa03deebb.png'
  ].forEach(function(a){if(!ASSETS.includes(a))ASSETS.push(a);});
}

const r128v2BasePatch=r48PatchIndexHtml;
r48PatchIndexHtml=function(text){
  let out=r128v2BasePatch(text);

  /* Zachowujemy sprawdzony hotfix separatora R127. */
  out=out.replace("\\n  function r115RenderCompanyMaster(){","\n  function r115RenderCompanyMaster(){");

  /* Tylko metadane wydania. */
  out=out.replaceAll('1.3.0-master-r127-offer-language-clean-master','1.3.0-master-r128v2-company-notes-safe-live');
  out=out.replaceAll('R127 OFERTA — LANGUAGE LIVE + CLEAN MASTER','R128 v2 NOTATKI O FIRMIE — SAFE LIVE');
  out=out.replace("const BUILD_TIME = '10:30';","const BUILD_TIME = '16:41';");
  out=out.replace(/sw\.js\?v=R127-offer-language-clean-master-1030/g,'sw.js?v=R128v2-company-notes-safe-live-1641');
  out=out.replace(/r84-backup-prune\.js\?v=R127-1030/g,'r84-backup-prune.js?v=R128v2-1641');

  /* Minimalna ekspozycja istniejących helperów do zewnętrznego modułu. */
  if(!out.includes('window.R128_CTX=')){
    out=out.replace(
      '  renderCompany=r115RenderCompanyMaster;',
      "  renderCompany=r115RenderCompanyMaster;\n  window.R128_CTX={app:(typeof app!=='undefined'?app:null),hotspot:(typeof hotspot==='function'?hotspot:null),render:(typeof render==='function'?render:null),sync:(typeof sync==='function'?sync:null),getCompanyById:(typeof getCompanyById==='function'?getCompanyById:null),state:(typeof state!=='undefined'?state:null),marketRolesFor:(typeof marketRolesFor==='function'?marketRolesFor:null),countries:(typeof countries!=='undefined'?countries:null),r115NewTile:(typeof r115NewTile==='function'?r115NewTile:null),toast:(typeof toast==='function'?toast:null)};"
    );
  }

  /* Chirurgicznie aktywujemy wyłącznie kafel nr 5. Gdy moduł nie załaduje się, działa stary bezpieczny fallback. */
  out=out.replace(
    "onClick:()=>r115NewTile('NOTATKI O FIRMIE')",
    "onClick:()=>((window.R128_NOTES&&typeof window.R128_NOTES.open==='function')?window.R128_NOTES.open(c):r115NewTile('NOTATKI O FIRMIE'))"
  );

  /* Moduł ładowany PO głównym skrypcie. Jego ewentualny błąd nie może wyłączyć aplikacji R127. */
  if(!out.includes('r128-notatki-live.js?v=R128v2')){
    out=out.replace('</body>','<script src="./r128-notatki-live.js?v=R128v2"></script>\n</body>');
  }
  return out;
};
