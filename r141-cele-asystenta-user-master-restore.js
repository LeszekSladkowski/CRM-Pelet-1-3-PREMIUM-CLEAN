/* R141 v1.0B — CELE ASYSTENTA — USER MASTER + VERSION SYNC HOTFIX
   Źródło prawdy: przesłana przez użytkownika karta MASTER z 11.09.2026.
   Cel główny pozostaje bez zmian: karta CELE ASYSTENTA wraca do źródłowego R129 v1.0A.
   Hotfix v1.0B naprawia wyłącznie końcową synchronizację numeru wersji po aktywnej warstwie R131 WALUTY.
*/

const r141UserMasterBasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r141UserMasterBasePatchIndexHtml(text);
  if(typeof out !== 'string' || !out) return out;

  /* Usuń ewentualne pozostałości dawnych eksperymentów z już spatchowanego/cachowanego HTML. */
  out = out.replace(/<script\b[^>]*src=["'][^"']*r13[2-9][^"']*["'][^>]*><\/script>\s*/gi,'');
  out = out.replace(/<script\b[^>]*src=["'][^"']*r140-[^"']*["'][^>]*><\/script>\s*/gi,'');
  out = out.replace(/<(style|script)\b[^>]*id=["']r13[2-9][^"']*["'][^>]*>[\s\S]*?<\/\1>\s*/gi,'');
  out = out.replace(/<(style|script)\b[^>]*id=["']r140-[^"']*["'][^>]*>[\s\S]*?<\/\1>\s*/gi,'');

  /* Twarda izolacja karty do historycznej geometrii, bez transformacji i wtórnego skalowania. */
  if(!out.includes('id="r141-cele-user-master-screen-lock"')){
    const style = `
<style id="r141-cele-user-master-screen-lock">
.screen.r129-goals-live{
  position:relative!important;
  width:min(calc(100vw - 12px),708px)!important;
  max-width:calc(100vw - 12px)!important;
  height:auto!important;
  aspect-ratio:6/13!important;
  margin:0 auto 16px!important;
  overflow:hidden!important;
  flex:0 0 auto!important;
  transform:none!important;
  scale:1!important;
  zoom:1!important;
}
.screen.r129-goals-live>img.master{
  position:absolute!important;
  inset:0!important;
  width:100%!important;
  height:100%!important;
  object-fit:fill!important;
  margin:0!important;
  transform:none!important;
}
</style>`;
    out = out.replace('</head>', style+'\n</head>');
  }

  /*
     FINAL VERSION SYNC HOTFIX:
     aktywna warstwa R131 jest wykonywana przed R141 i zmienia identyfikator R130 -> R131.
     R141 v1.0A nie obejmowała R131 w tablicy zamian, dlatego aplikacja po poprawnym
     pobraniu nowego Service Workera nadal raportowała R131 i bez końca widziała R141 jako aktualizację.
     v1.0B synchronizuje wszystkie realne stany wejściowe do jednego identyfikatora końcowego.
  */
  [
    '1.3.0-master-r130v1-0g-pixel-reference-alignment-1to1',
    '1.3.0-test-r131-waluty-k1-press-chamfer-1to1',
    '1.3.0-test-r140-cele-master-source-restore-1to1',
    '1.3.0-test-r141-cele-user-master-v1-0a-restore'
  ].forEach(v=>{out=out.replaceAll(v,'1.3.0-test-r141v1-0b-cele-user-master-version-sync-hotfix');});

  [
    'R130 v1.0G AKCJE I STATUS — PIXEL REFERENCE ALIGNMENT 1:1',
    'R131 TEST 2 — WALUTY K1 PRESS CHAMFER 1:1',
    'R140 TEST 1 — CELE ASYSTENTA MASTER SOURCE RESTORE 1:1',
    'R141 TEST 1 — CELE ASYSTENTA USER MASTER v1.0A RESTORE'
  ].forEach(v=>{out=out.replaceAll(v,'R141 v1.0B — CELE ASYSTENTA VERSION SYNC HOTFIX');});

  out = out.replace(/const BUILD_DATE = '[^']*';/,"const BUILD_DATE = '11.09.2026';");
  out = out.replace(/const BUILD_TIME = '[^']*';/,"const BUILD_TIME = '22:06';");
  out = out.replace(/sw\.js\?v=[^'\"]+/g,'sw.js?v=R141-v1-0b-version-sync-hotfix-2206');
  out = out.replace(/r84-backup-prune\.js\?v=[^'\"]+/g,'r84-backup-prune.js?v=R141-v1-0b-2206');

  return out;
};
