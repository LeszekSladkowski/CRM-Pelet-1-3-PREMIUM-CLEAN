/* R61 — WALUTY KARTA 3 MASTER CLEAN LIVE.
   KARTA 1 i KARTA 2 FINAL MASTER oraz RYNKI EU FINAL MASTER pozostają bezwzględnie nietknięte.
   KARTA 3: jeden oryginalny raster MASTER 852×1846, bez WEBP/SVG i bez przesuwania grafiki.
   Dane LIVE przykrywają wyłącznie własne pola tekstowe; hotspoty wracają do współrzędnych MASTER. */
importScripts('./sw-r54-core.js?v=R57-press-fit-ring-clean-1908');

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

/* ===== R61 — WYŁĄCZNIE KARTA 3 ===== */
const r61BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r61BasePatchIndexHtml(text);

  out = out.replaceAll('1.3.0-master-r57-waluty-k1-press-fit-k2-ring-clean','1.3.0-master-r61-waluty-karta3-master-clean-live');
  out = out.replaceAll('R57 WALUTY K1 PRESS FIT + K2 RING CLEAN','R61 WALUTY KARTA 3 MASTER CLEAN LIVE');
  out = out.replace("const BUILD_DATE = '31.08.2026';","const BUILD_DATE = '01.09.2026';");
  out = out.replace("const BUILD_TIME = '19:08';","const BUILD_TIME = '07:35';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R57-waluty-k1-press-fit-k2-ring-clean-1908'","navigator.serviceWorker.register('./sw.js?v=R61-waluty-karta3-master-clean-live-0735'");

  /* Oryginalny MASTER K3 — żadnego dodatkowego rastra, SVG ani WEBP. */
  out = out.replace(
    "img.src=`master-waluty-karta${card}.png?v=R43-LIVE-HARD-FIX`;",
    "img.src=card===3?'master-waluty-karta3.png?v=R61-K3-MASTER-0735':`master-waluty-karta${card}.png?v=R43-LIVE-HARD-FIX`;"
  );

  /* KWOTA: jedno pole LIVE dokładnie w polu MASTER. */
  out = out.replace(
    "    const amountChanged=Math.abs(currencyState.calcAmount-currencyDefaults.calcAmount)>.00001;\n    if(amountChanged)wmEdit(root,[82,395,420,110],currencyState.calcAmount,v=>currencyState.calcAmount=v,'big');else{const hit=wmHot(root,[55,375,470,145],()=>{} ,'Kwota');hit.addEventListener('click',()=>{hit.remove();wmEdit(root,[82,395,420,110],currencyState.calcAmount,v=>currencyState.calcAmount=v,'big').focus()},{once:true})}",
    "    wmEdit(root,[82,395,420,110],currencyState.calcAmount,v=>currencyState.calcAmount=v,'big r61-amount');"
  );

  /* WALUTA ŹRÓDŁOWA: zawsze jedna aktualna wartość. */
  out = out.replace(
    "    wmSelect(root,[535,375,260,145],currencyState.calcFrom,c=>currencyState.calcFrom=c);if(currencyState.calcFrom!==currencyDefaults.calcFrom)wmDyn(root,[585,405,175,80],`${CURRENCY_FLAGS[currencyState.calcFrom]} ${currencyState.calcFrom}`,'gold med');",
    "    wmSelect(root,[535,375,260,145],currencyState.calcFrom,c=>currencyState.calcFrom=c);wmDyn(root,[585,405,175,80],`${CURRENCY_FLAGS[currencyState.calcFrom]} ${currencyState.calcFrom}`,'gold med r61-source');"
  );

  /* WALUTA DOCELOWA: zawsze jedna aktualna wartość. */
  out = out.replace(
    "    wmSelect(root,[50,590,750,140],currencyState.calcTo,c=>currencyState.calcTo=c);if(currencyState.calcTo!==currencyDefaults.calcTo)wmDyn(root,[100,620,610,82],`${CURRENCY_FLAGS[currencyState.calcTo]} ${currencyState.calcTo} — ${CURRENCY_NAMES[currencyState.calcTo]}`,'gold med');",
    "    wmSelect(root,[50,590,750,140],currencyState.calcTo,c=>currencyState.calcTo=c);wmDyn(root,[100,620,610,82],`${CURRENCY_FLAGS[currencyState.calcTo]} ${currencyState.calcTo} — ${CURRENCY_NAMES[currencyState.calcTo]}`,'gold med r61-target');"
  );

  /* WYNIK/KURS/SPREAD/ROZLICZENIE — oryginalne współrzędne MASTER, bez przesunięć R60. */
  out = out.replace(
    "    const v=curCalc();wmDyn(root,[195,992,465,90],`${curFmt(v.gross,2)} ${currencyState.calcTo}`,'green big');wmDyn(root,[112,1165,300,78],`1 ${currencyState.calcFrom} = ${curFmt(curConvert(1,currencyState.calcFrom,currencyState.calcTo),6)} ${currencyState.calcTo}`,'gold small');wmDyn(root,[445,1168,295,75],`${curFmt(currencyState.spreadPct,2)}% • ${curFmt(v.commission,2)} ${currencyState.calcTo}`,'gold small');wmDyn(root,[195,1304,500,75],`DO ROZLICZENIA: ${curFmt(v.settle,2)} ${currencyState.calcTo}`,'green small');",
    "    const r61Mask=(rect,cls)=>{const m=document.createElement('div');m.className='wm-k3-mask '+(cls||'');wmRect(m,rect);m.setAttribute('aria-hidden','true');root.append(m);return m};r61Mask([112,1240,300,54],'r61-stale-cross');r61Mask([445,1240,295,54],'r61-stale-spread');const v=curCalc();wmDyn(root,[195,992,465,90],`${curFmt(v.gross,2)} ${currencyState.calcTo}`,'green big r61-result');wmDyn(root,[112,1165,300,78],`1 ${currencyState.calcFrom} = ${curFmt(curConvert(1,currencyState.calcFrom,currencyState.calcTo),6)} ${currencyState.calcTo}`,'gold small r61-cross');wmDyn(root,[445,1168,295,75],`${curFmt(currencyState.spreadPct,2)}% • ${curFmt(v.commission,2)} ${currencyState.calcTo}`,'gold small r61-spread');wmDyn(root,[195,1304,500,75],`DO ROZLICZENIA: ${curFmt(v.settle,2)} ${currencyState.calcTo}`,'green small r61-settle');"
  );

  const r61Style = `<style id="r61-waluty-karta3-master-clean-live">
/* K3 — raster MASTER w dokładnie zatwierdzonym rozmiarze/proporcji. */
.wm-page[data-card="3"]{position:relative!important;width:100%!important;overflow:hidden!important;background:#000!important;touch-action:pan-x pan-y pinch-zoom!important;}
.wm-page[data-card="3"] .wm-canvas{position:relative!important;width:100%!important;max-width:852px!important;margin:0 auto!important;overflow:hidden!important;background:#000!important;}
.wm-page[data-card="3"] .wm-master{width:100%!important;height:auto!important;display:block!important;object-fit:contain!important;}

/* Nie istnieje żadna dodatkowa grafika nad MASTER-em. */
.wm-page[data-card="3"] .wm-k3-clean-patch{display:none!important;visibility:hidden!important;opacity:0!important;}

/* Dane LIVE nad MASTER-em. */
.wm-page[data-card="3"] .wm-hot,
.wm-page[data-card="3"] .wm-edit,
.wm-page[data-card="3"] .wm-dyn,
.wm-page[data-card="3"] .wm-select,
.wm-page[data-card="3"] .wm-k3-mask{z-index:20!important;}

/* Każdy tekst LIVE przykrywa wyłącznie własny stary tekst, nigdy ramkę ani etykietę. */
.wm-page[data-card="3"] .r61-amount,
.wm-page[data-card="3"] .r61-source,
.wm-page[data-card="3"] .r61-target,
.wm-page[data-card="3"] .r61-result,
.wm-page[data-card="3"] .r61-cross,
.wm-page[data-card="3"] .r61-spread,
.wm-page[data-card="3"] .r61-settle{background:#010101!important;border:0!important;box-shadow:none!important;border-radius:4px!important;}

.wm-page[data-card="3"] .r61-amount{padding:0 10px!important;text-align:left!important;font-size:clamp(24px,6.2vw,48px)!important;font-weight:900!important;color:#fff!important;}
.wm-page[data-card="3"] .r61-source,.wm-page[data-card="3"] .r61-target{justify-content:flex-start!important;text-align:left!important;padding:0 8px!important;font-size:clamp(17px,4.4vw,34px)!important;line-height:1!important;}
.wm-page[data-card="3"] .r61-result{justify-content:center!important;text-align:center!important;font-size:clamp(25px,6.1vw,50px)!important;line-height:1!important;text-shadow:0 0 9px rgba(118,255,0,.26)!important;}
.wm-page[data-card="3"] .r61-cross,.wm-page[data-card="3"] .r61-spread{justify-content:center!important;text-align:center!important;font-size:clamp(12px,3.25vw,24px)!important;line-height:1.05!important;}
.wm-page[data-card="3"] .r61-settle{justify-content:center!important;text-align:center!important;font-size:clamp(12px,3.25vw,24px)!important;line-height:1.05!important;}
.wm-page[data-card="3"] .wm-k3-mask{position:absolute!important;background:#010101!important;border:0!important;box-shadow:none!important;pointer-events:none!important;}

/* Chirurgiczne kliknięcie: żadnej drugiej przesuniętej obręczy. */
.wm-page[data-card="3"] .wm-hot{touch-action:manipulation!important;transform:none!important;}
.wm-page[data-card="3"] .wm-hot::before,.wm-page[data-card="3"] .wm-hot::after{content:none!important;display:none!important;}
.wm-page[data-card="3"] .wm-hot[aria-label="1000"]:active,
.wm-page[data-card="3"] .wm-hot[aria-label="5000"]:active,
.wm-page[data-card="3"] .wm-hot[aria-label="10000"]:active,
.wm-page[data-card="3"] .wm-hot[aria-label="Przelicz"]:active{outline:0!important;border:2px solid #76ff00!important;background:rgba(118,255,0,.035)!important;box-shadow:inset 0 0 0 2px rgba(118,255,0,.78),0 0 15px rgba(118,255,0,.55)!important;transform:none!important;}
.wm-page[data-card="3"] .wm-hot[aria-label="1000"]:active,
.wm-page[data-card="3"] .wm-hot[aria-label="5000"]:active,
.wm-page[data-card="3"] .wm-hot[aria-label="10000"]:active{border-radius:20px!important;}
.wm-page[data-card="3"] .wm-hot[aria-label="Przelicz"]:active{border-radius:28px!important;}
</style>`;

  out = out.replace('</head>',r61Style+'\n</head>');
  return out;
};
