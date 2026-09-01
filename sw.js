/* R64 — WALUTY KARTA 3 EMERGENCY CLEAN LIVE.
   KARTA 1 i KARTA 2 FINAL MASTER pozostają bezwzględnie nietknięte.
   KARTA 3 używa jednego samodzielnego rastra 852×1846; bez SVG wrapperów, bez masek i bez czarnych łat. */
importScripts('./sw-r54-core.js?v=R57-press-fit-ring-clean-1908');

const R64_K3_ASSETS=['./master-waluty-karta3-r64-clean.webp'];
if(Array.isArray(ASSETS))R64_K3_ASSETS.forEach(a=>{if(!ASSETS.includes(a))ASSETS.push(a)});

/* ===== R57 FINAL MASTER — KARTA 1 + KARTA 2, BEZ ZMIAN ===== */
const r57BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r57BasePatchIndexHtml(text);

  out = out.replaceAll('1.3.0-master-r54-waluty-karta2-raster-restore','1.3.0-master-r57-waluty-k1-press-fit-k2-ring-clean');
  out = out.replaceAll('R54 WALUTY KARTA 2 RASTER RESTORE','R57 WALUTY K1 PRESS FIT + K2 RING CLEAN');
  out = out.replace("const BUILD_TIME = '16:15';","const BUILD_TIME = '19:08';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R54-waluty-karta2-raster-restore-1615'","navigator.serviceWorker.register('./sw.js?v=R57-waluty-k1-press-fit-k2-ring-clean-1908'");

  /* KARTA 1 — FINAL MASTER R57. */
  out = out.replace("wmHot(root,[42,710,770,150],()=>currencyGo(2),'Kursy LIVE')","wmHot(root,[42,721,770,160],()=>currencyGo(2),'Kursy LIVE')");
  out = out.replace("wmHot(root,[42,882,770,155],()=>currencyGo(3),'Kalkulator walut')","wmHot(root,[42,905,770,159],()=>currencyGo(3),'Kalkulator walut')");
  out = out.replace("wmHot(root,[42,1055,770,155],()=>currencyGo(4),'Opłacalność / marża')","wmHot(root,[42,1088,770,155],()=>currencyGo(4),'Opłacalność / marża')");
  out = out.replace("wmHot(root,[42,1227,770,155],curHistory,'Historia kursów')","wmHot(root,[42,1267,770,153],curHistory,'Historia kursów')");
  out = out.replace("wmHot(root,[42,1398,770,165],curSettings,'Ustawienia walut')","wmHot(root,[42,1442,770,157],curSettings,'Ustawienia walut')");

  const r57Style = `<style id="r57-waluty-press-fit-ring-clean">
.wm-page[data-card="2"]{position:relative!important;overflow:hidden!important;background:#000!important;}
.wm-page[data-card="2"] .wm-canvas{margin-top:max(-60px,-7.042vw)!important;overflow:visible!important;}
.wm-page[data-card="2"]::before{content:none!important;display:none!important;width:0!important;height:0!important;background:transparent!important;pointer-events:none!important;}
.wm-page[data-card="2"] .wm-live-ring{display:none!important;visibility:hidden!important;opacity:0!important;animation:none!important;border:0!important;box-shadow:none!important;background:transparent!important;}
.wm-page[data-card="2"] .wm-live-spinner{z-index:32!important;}
.wm-page[data-card="2"] .wm-hot{touch-action:manipulation!important;}
</style>`;

  out = out.replace(/<style id="r54-waluty-karta2-raster-restore">[\s\S]*?<\/style>/, r57Style);
  return out;
};

/* ===== R64 — WYŁĄCZNIE KARTA 3: EMERGENCY CLEAN LIVE ===== */
const r64BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r64BasePatchIndexHtml(text);

  out = out.replaceAll('1.3.0-master-r57-waluty-k1-press-fit-k2-ring-clean','1.3.0-master-r64-waluty-karta3-emergency-live');
  out = out.replaceAll('R57 WALUTY K1 PRESS FIT + K2 RING CLEAN','R64 WALUTY KARTA 3 EMERGENCY LIVE');
  out = out.replace("const BUILD_DATE = '31.08.2026';","const BUILD_DATE = '01.09.2026';");
  out = out.replace("const BUILD_TIME = '19:08';","const BUILD_TIME = '13:48';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R57-waluty-k1-press-fit-k2-ring-clean-1908'","navigator.serviceWorker.register('./sw.js?v=R64-waluty-karta3-emergency-live-1348'");

  out = out.replace(
    "img.src=`master-waluty-karta${card}.png?v=R43-LIVE-HARD-FIX`;",
    "img.src=card===3?'master-waluty-karta3-r64-clean.webp?v=R64-1348':`master-waluty-karta${card}.png?v=R43-LIVE-HARD-FIX`;"
  );

  out = out.replace(
    /  function renderCurrency3\(\)\{[\s\S]*?\n  function curProfit\(\)\{/,
`  function renderCurrency3(){const {page,root}=wmBase(3);
    wmHot(root,[28,20,155,165],()=>currencyGo(2),'Powrót');
    wmHot(root,[650,20,190,190],()=>currencyRefresh(true),'LIVE — synchronizuj kursy');

    const amount=wmEdit(root,[76,470,415,88],currencyState.calcAmount,v=>{currencyState.calcAmount=v;currencyState.k3QuickSelected=0},'big r64-amount');
    wmSelect(root,[530,451,255,132],currencyState.calcFrom,c=>currencyState.calcFrom=c);
    wmDyn(root,[556,478,190,75],\`\${CURRENCY_FLAGS[currencyState.calcFrom]} \${currencyState.calcFrom}\`,'gold med r64-source');
    wmSelect(root,[52,684,748,132],currencyState.calcTo,c=>currencyState.calcTo=c);
    wmDyn(root,[82,709,625,80],\`\${CURRENCY_FLAGS[currencyState.calcTo]} \${currencyState.calcTo} — \${CURRENCY_NAMES[currencyState.calcTo]}\`,'gold med r64-target');

    [[50,850,237,116,1000],[300,850,237,116,5000],[550,850,237,116,10000]].forEach(([x,y,w,h,val])=>{
      const b=wmHot(root,[x,y,w,h],()=>{currencyState.calcAmount=val;currencyState.k3QuickSelected=val;curPersist();render()},String(val));
      if(currencyState.k3QuickSelected===val)b.classList.add('r64-selected');
    });

    const v=curCalc();
    wmDyn(root,[92,1178,668,132],\`\${curFmt(v.gross,2)} \${currencyState.calcTo}\`,'green r64-result');
    wmDyn(root,[171,1408,584,72],\`DO ROZLICZENIA: \${curFmt(v.settle,2)} \${currencyState.calcTo}\`,'green r64-settle');

    wmHot(root,[50,1548,738,124],()=>{amount.blur();curPersist();render();toast('✓ PRZELICZONO')},'Przelicz');
    wmBottom(root,3);return page}

  function curProfit(){`
  );

  out = out.replace(
    "const y=card===4?1652:1580,h=card===4?180:210,w=WM_W/5;",
    "const y=card===4?1652:card===3?1690:1580,h=card===4?180:card===3?156:210,w=WM_W/5;"
  );

  const r64Style = `<style id="r64-waluty-karta3-emergency-live">
.wm-page[data-card="3"]{position:relative!important;width:100%!important;overflow:hidden!important;background:#000!important;}
.wm-page[data-card="3"] .wm-canvas{position:relative!important;width:min(100vw,852px)!important;max-width:852px!important;margin:0 auto!important;overflow:hidden!important;background:#000!important;}
.wm-page[data-card="3"] .wm-master{width:100%!important;height:auto!important;display:block!important;object-fit:fill!important;}
.wm-page[data-card="3"] .wm-edit,.wm-page[data-card="3"] .wm-dyn{z-index:24!important;background:transparent!important;border:0!important;box-shadow:none!important;border-radius:0!important;font-family:"Arial Narrow","Roboto Condensed",system-ui,sans-serif!important;font-variant-numeric:tabular-nums!important;}
.wm-page[data-card="3"] .wm-edit{padding:0!important;text-align:left!important;color:#fff!important;font-weight:900!important;}
.wm-page[data-card="3"] .wm-edit:focus{outline:0!important;box-shadow:none!important;}
.wm-page[data-card="3"] .r64-amount{font-size:clamp(23px,6.4vw,49px)!important;}
.wm-page[data-card="3"] .r64-source,.wm-page[data-card="3"] .r64-target{justify-content:flex-start!important;color:#ffd34c!important;font-size:clamp(17px,4.6vw,34px)!important;line-height:1!important;}
.wm-page[data-card="3"] .r64-result{justify-content:center!important;text-align:center!important;color:#78ff00!important;font-size:clamp(32px,8.5vw,70px)!important;line-height:1!important;text-shadow:0 0 12px rgba(118,255,0,.60)!important;}
.wm-page[data-card="3"] .r64-settle{justify-content:center!important;text-align:center!important;color:#76ff00!important;font-size:clamp(13px,3.7vw,29px)!important;line-height:1!important;}
.wm-page[data-card="3"] .wm-hot{z-index:36!important;background:transparent!important;box-shadow:none!important;}
.wm-page[data-card="3"] .wm-select{z-index:38!important;}
.wm-page[data-card="3"] .wm-hot::before,.wm-page[data-card="3"] .wm-hot::after{content:none!important;display:none!important;}
.wm-page[data-card="3"] .wm-hot.r64-selected{border:2px solid #76ff00!important;border-radius:22px!important;background:rgba(118,255,0,.018)!important;box-shadow:inset 0 0 0 1px rgba(118,255,0,.80),0 0 15px rgba(118,255,0,.65)!important;}
</style>`;

  out = out.replace('</head>',r64Style+'\n</head>');
  return out;
};

