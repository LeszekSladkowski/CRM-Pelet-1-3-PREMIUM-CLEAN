/* R63 — WALUTY KARTA 3 CLEAN LIVE MASTER.
   KARTA 1 i KARTA 2 FINAL MASTER oraz RYNKI EU FINAL MASTER pozostają bezwzględnie nietknięte.
   KARTA 3: zaakceptowany MASTER 852×1846 jest jedyną bazą graficzną; dane LIVE są rysowane wyłącznie
   w pustych polach SVG, bez KURSU KRZYŻOWEGO, bez SPREAD / PROWIZJA i bez czarnych nakładek DOM. */
importScripts('./sw-r54-core.js?v=R57-press-fit-ring-clean-1908');

const R63_K3_ASSETS=['./master-waluty-karta3-r63-clean.svg'];
if(Array.isArray(ASSETS))R63_K3_ASSETS.forEach(a=>{if(!ASSETS.includes(a))ASSETS.push(a)});

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

/* ===== R63 — WYŁĄCZNIE KARTA 3 ===== */
const r63BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r63BasePatchIndexHtml(text);

  out = out.replaceAll('1.3.0-master-r57-waluty-k1-press-fit-k2-ring-clean','1.3.0-master-r63-waluty-karta3-clean-live');
  out = out.replaceAll('R57 WALUTY K1 PRESS FIT + K2 RING CLEAN','R63 WALUTY KARTA 3 CLEAN LIVE');
  out = out.replace("const BUILD_DATE = '31.08.2026';","const BUILD_DATE = '01.09.2026';");
  out = out.replace("const BUILD_TIME = '19:08';","const BUILD_TIME = '11:23';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R57-waluty-k1-press-fit-k2-ring-clean-1908'","navigator.serviceWorker.register('./sw.js?v=R63-waluty-karta3-clean-live-1123'");

  /* KARTA 3 korzysta z jednego czystego obrazu bazowego wygenerowanego z zatwierdzonego MASTER-a. */
  out = out.replace(
    "img.src=`master-waluty-karta${card}.png?v=R43-LIVE-HARD-FIX`;",
    "img.src=card===3?'master-waluty-karta3-r63-clean.svg?v=R63-1123':`master-waluty-karta${card}.png?v=R43-LIVE-HARD-FIX`;"
  );

  /* Cała stara funkcja KARTY 3 jest zastępowana jedną czystą implementacją LIVE. */
  out = out.replace(
    /  function renderCurrency3\(\)\{[\s\S]*?\n  function curProfit\(\)\{/,
`  function renderCurrency3(){const {page,root}=wmBase(3);wmTop(root,3);
    let r63Quick=0;try{r63Quick=Number(localStorage.getItem('crm13_currency_quick')||0)}catch(e){}

    const amount=wmEdit(root,[82,476,420,92],currencyState.calcAmount,v=>{currencyState.calcAmount=v;try{localStorage.removeItem('crm13_currency_quick')}catch(e){}},'big r63-amount');
    amount.addEventListener('focus',()=>{try{localStorage.removeItem('crm13_currency_quick')}catch(e){}});

    wmSelect(root,[530,452,260,130],currencyState.calcFrom,c=>currencyState.calcFrom=c);
    wmDyn(root,[548,478,205,78],\`${'${'}CURRENCY_FLAGS[currencyState.calcFrom]} ${'${'}currencyState.calcFrom}\`,'gold med r63-source');

    wmSelect(root,[52,686,748,132],currencyState.calcTo,c=>currencyState.calcTo=c);
    wmDyn(root,[78,708,630,82],\`${'${'}CURRENCY_FLAGS[currencyState.calcTo]} ${'${'}currencyState.calcTo} — ${'${'}CURRENCY_NAMES[currencyState.calcTo]}\`,'gold med r63-target');

    [[54,850,234,112,1000],[306,850,234,112,5000],[558,850,236,112,10000]].forEach(([x,y,w,h,val])=>{
      const b=wmHot(root,[x,y,w,h],()=>{currencyState.calcAmount=val;try{localStorage.setItem('crm13_currency_quick',String(val))}catch(e){}curPersist();render()},String(val));
      if(r63Quick===val)b.classList.add('wm-quick-selected');
    });

    const v=curCalc();
    wmDyn(root,[102,1162,650,150],\`${'${'}curFmt(v.gross,2)} ${'${'}currencyState.calcTo}\`,'green big r63-result');
    wmDyn(root,[172,1404,585,78],\`DO ROZLICZENIA: ${'${'}curFmt(v.settle,2)} ${'${'}currencyState.calcTo}\`,'green small r63-settle');

    wmHot(root,[52,1542,748,128],()=>{curPersist();render();toast('✓ PRZELICZONO')},'Przelicz');
    wmBottom(root,3);return page}

  function curProfit(){`
  );

  /* Dolny pasek KARTY 3 dopasowany do grafiki MASTER. */
  out = out.replace(
    "const y=card===4?1652:1580,h=card===4?180:210,w=WM_W/5;",
    "const y=card===4?1652:card===3?1692:1580,h=card===4?180:card===3?154:210,w=WM_W/5;"
  );

  const r63Style = `<style id="r63-waluty-karta3-clean-live">
.wm-page[data-card="3"]{position:relative!important;width:100%!important;overflow:hidden!important;background:#000!important;touch-action:pan-x pan-y pinch-zoom!important;}
.wm-page[data-card="3"] .wm-canvas{position:relative!important;width:100%!important;max-width:852px!important;margin:0 auto!important;overflow:hidden!important;background:#000!important;touch-action:pan-x pan-y pinch-zoom!important;}
.wm-page[data-card="3"] .wm-master{width:100%!important;height:auto!important;display:block!important;object-fit:contain!important;}
.wm-page[data-card="3"] .wm-live-ring{display:none!important;visibility:hidden!important;opacity:0!important;border:0!important;box-shadow:none!important;background:transparent!important;}
.wm-page[data-card="3"] .wm-live-spinner{left:79.7%!important;top:2.0%!important;width:14.0%!important;height:7.0%!important;z-index:40!important;background:transparent!important;box-shadow:none!important;display:grid!important;place-items:center!important;}
.wm-page[data-card="3"] .wm-live-spinner span{color:#76ff00!important;font-size:clamp(28px,7.5vw,52px)!important;line-height:1!important;text-shadow:0 0 8px rgba(118,255,0,.70)!important;}
.wm-page[data-card="3"] .wm-edit,.wm-page[data-card="3"] .wm-dyn{z-index:24!important;background:transparent!important;border:0!important;box-shadow:none!important;border-radius:0!important;font-family:"Arial Narrow","Roboto Condensed",system-ui,sans-serif!important;font-variant-numeric:tabular-nums!important;}
.wm-page[data-card="3"] .wm-edit{padding:0 0 0 5px!important;text-align:left!important;color:#f7f7f7!important;font-weight:900!important;}
.wm-page[data-card="3"] .wm-edit:focus{outline:0!important;box-shadow:none!important;}
.wm-page[data-card="3"] .r63-amount{font-size:clamp(23px,6.4vw,49px)!important;}
.wm-page[data-card="3"] .r63-source,.wm-page[data-card="3"] .r63-target{justify-content:flex-start!important;text-align:left!important;color:#ffd34c!important;font-size:clamp(17px,4.6vw,34px)!important;line-height:1!important;}
.wm-page[data-card="3"] .r63-result{justify-content:center!important;text-align:center!important;color:#78ff00!important;font-size:clamp(32px,8.4vw,68px)!important;line-height:1!important;text-shadow:0 0 12px rgba(118,255,0,.62)!important;}
.wm-page[data-card="3"] .r63-settle{justify-content:center!important;text-align:center!important;color:#76ff00!important;font-size:clamp(13px,3.6vw,28px)!important;line-height:1!important;}
.wm-page[data-card="3"] .wm-hot{z-index:36!important;touch-action:manipulation!important;transform:none!important;}
.wm-page[data-card="3"] .wm-select{z-index:38!important;}
.wm-page[data-card="3"] .wm-hot[aria-label="1000"].wm-quick-selected,
.wm-page[data-card="3"] .wm-hot[aria-label="5000"].wm-quick-selected,
.wm-page[data-card="3"] .wm-hot[aria-label="10000"].wm-quick-selected,
.wm-page[data-card="3"] .wm-hot[aria-label="1000"].wm-pressed,
.wm-page[data-card="3"] .wm-hot[aria-label="5000"].wm-pressed,
.wm-page[data-card="3"] .wm-hot[aria-label="10000"].wm-pressed{border:2px solid #76ff00!important;background:rgba(118,255,0,.025)!important;box-shadow:inset 0 0 0 1px rgba(118,255,0,.82),0 0 15px rgba(118,255,0,.72)!important;border-radius:20px!important;}
.wm-page[data-card="3"] .wm-hot[aria-label="Przelicz"].wm-pressed{border:2px solid #76ff00!important;background:rgba(118,255,0,.025)!important;box-shadow:inset 0 0 0 1px rgba(118,255,0,.82),0 0 18px rgba(118,255,0,.70)!important;border-radius:28px!important;}
.wm-page[data-card="3"] .wm-hot::before,.wm-page[data-card="3"] .wm-hot::after{content:none!important;display:none!important;}
</style>`;

  out = out.replace('</head>',r63Style+'\n</head>');
  return out;
};
