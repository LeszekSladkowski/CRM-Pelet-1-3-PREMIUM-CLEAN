/* R62 — WALUTY KARTA 3 MASTER 1:1 SURGICAL.
   KARTA 1 i KARTA 2 FINAL MASTER oraz RYNKI EU FINAL MASTER pozostają bezwzględnie nietknięte.
   KARTA 3: zatwierdzony wzorzec MASTER 852×1846 odtwarzany dokładnymi fragmentami rastra,
   z jedną warstwą danych LIVE i chirurgicznie dopasowanymi polami dotykowymi. */
importScripts('./sw-r54-core.js?v=R57-press-fit-ring-clean-1908');

const R62_K3_ASSETS=[
  './waluty-k3-r60-top.webp',
  './waluty-k3-r60-amount.webp',
  './waluty-k3-r60-source.webp',
  './waluty-k3-r60-target.webp',
  './waluty-k3-r60-result.webp',
  './waluty-k3-r60-cross.webp',
  './waluty-k3-r60-spread.webp',
  './waluty-k3-r60-settle.webp'
];
if(Array.isArray(ASSETS))R62_K3_ASSETS.forEach(a=>{if(!ASSETS.includes(a))ASSETS.push(a)});

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

/* ===== R62 — WYŁĄCZNIE KARTA 3 ===== */
const r62BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r62BasePatchIndexHtml(text);

  out = out.replaceAll('1.3.0-master-r57-waluty-k1-press-fit-k2-ring-clean','1.3.0-master-r62-waluty-karta3-master-1to1');
  out = out.replaceAll('R57 WALUTY K1 PRESS FIT + K2 RING CLEAN','R62 WALUTY KARTA 3 MASTER 1:1');
  out = out.replace("const BUILD_DATE = '31.08.2026';","const BUILD_DATE = '01.09.2026';");
  out = out.replace("const BUILD_TIME = '19:08';","const BUILD_TIME = '08:32';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R57-waluty-k1-press-fit-k2-ring-clean-1908'","navigator.serviceWorker.register('./sw.js?v=R62-waluty-karta3-master-1to1-0832'");

  /* KARTA 3: bezpośredni raster bazowy; zaakceptowane fragmenty MASTER są dokładane w tym samym canvasie. */
  out = out.replace(
    "img.src=`master-waluty-karta${card}.png?v=R43-LIVE-HARD-FIX`;",
    "img.src=card===3?'master-waluty-karta3.png?v=R62-K3-MASTER-1TO1-0832':`master-waluty-karta${card}.png?v=R43-LIVE-HARD-FIX`;"
  );

  /* KARTA 3 — wzorzec 1:1 + jedno pole KWOTA LIVE. */
  out = out.replace(
    "    const amountChanged=Math.abs(currencyState.calcAmount-currencyDefaults.calcAmount)>.00001;\n    if(amountChanged)wmEdit(root,[82,395,420,110],currencyState.calcAmount,v=>currencyState.calcAmount=v,'big');else{const hit=wmHot(root,[55,375,470,145],()=>{} ,'Kwota');hit.addEventListener('click',()=>{hit.remove();wmEdit(root,[82,395,420,110],currencyState.calcAmount,v=>currencyState.calcAmount=v,'big').focus()},{once:true})}",
    `    const r62Patch=(rect,src)=>{const p=document.createElement('img');p.className='wm-k3-master-patch';p.src=src;wmRect(p,rect);p.alt='';p.setAttribute('aria-hidden','true');root.append(p);return p};
    const r62Mask=(rect,cls='')=>{const m=document.createElement('div');m.className='wm-k3-value-mask '+cls;wmRect(m,rect);m.setAttribute('aria-hidden','true');root.append(m);return m};
    r62Patch([0,0,852,230],'waluty-k3-r60-top.webp?v=R62');
    r62Patch([68,440,195,86],'waluty-k3-r60-amount.webp?v=R62');
    r62Patch([548,444,184,82],'waluty-k3-r60-source.webp?v=R62');
    r62Patch([70,666,420,86],'waluty-k3-r60-target.webp?v=R62');
    r62Patch([145,1018,560,112],'waluty-k3-r60-result.webp?v=R62');
    r62Patch([88,1206,316,96],'waluty-k3-r60-cross.webp?v=R62');
    r62Patch([432,1206,316,104],'waluty-k3-r60-spread.webp?v=R62');
    r62Patch([142,1322,568,94],'waluty-k3-r60-settle.webp?v=R62');
    r62Mask([74,466,402,64],'r62-mask-amount');
    wmEdit(root,[76,451,400,92],currencyState.calcAmount,v=>{currencyState.calcAmount=v;try{localStorage.removeItem('crm13_currency_quick')}catch(e){}},'big r62-amount');`
  );

  /* WALUTA ŹRÓDŁOWA — jedna aktualna wartość, bez dublowania. */
  out = out.replace(
    "    wmSelect(root,[535,375,260,145],currencyState.calcFrom,c=>currencyState.calcFrom=c);if(currencyState.calcFrom!==currencyDefaults.calcFrom)wmDyn(root,[585,405,175,80],`${CURRENCY_FLAGS[currencyState.calcFrom]} ${currencyState.calcFrom}`,'gold med');",
    "    r62Mask([548,448,198,76],'r62-mask-source');wmSelect(root,[527,419,252,145],currencyState.calcFrom,c=>currencyState.calcFrom=c);wmDyn(root,[552,450,190,72],`${CURRENCY_FLAGS[currencyState.calcFrom]} ${currencyState.calcFrom}`,'gold med r62-source');"
  );

  /* WALUTA DOCELOWA — jedna aktualna wartość, bez dublowania. */
  out = out.replace(
    "    wmSelect(root,[50,590,750,140],currencyState.calcTo,c=>currencyState.calcTo=c);if(currencyState.calcTo!==currencyDefaults.calcTo)wmDyn(root,[100,620,610,82],`${CURRENCY_FLAGS[currencyState.calcTo]} ${currencyState.calcTo} — ${CURRENCY_NAMES[currencyState.calcTo]}`,'gold med');",
    "    r62Mask([76,670,628,80],'r62-mask-target');wmSelect(root,[52,648,748,140],currencyState.calcTo,c=>currencyState.calcTo=c);wmDyn(root,[80,672,620,76],`${CURRENCY_FLAGS[currencyState.calcTo]} ${currencyState.calcTo} — ${CURRENCY_NAMES[currencyState.calcTo]}`,'gold med r62-target');"
  );

  /* Szybkie kwoty — dokładne pola z MASTER; ostatnio wybrany przycisk pozostaje zielony jak na zatwierdzonych zrzutach. */
  out = out.replace(
    "    [[52,760,230,100,1000],[300,760,230,100,5000],[548,760,230,100,10000]].forEach(([x,y,w,h,v])=>wmHot(root,[x,y,w,h],()=>{currencyState.calcAmount=v;curPersist();render()},String(v)));",
    "    {let r62Quick=0;try{r62Quick=Number(localStorage.getItem('crm13_currency_quick')||0)}catch(e){}[[54,829,234,100,1000],[306,829,234,100,5000],[560,829,236,100,10000]].forEach(([x,y,w,h,v])=>{const b=wmHot(root,[x,y,w,h],()=>{currencyState.calcAmount=v;try{localStorage.setItem('crm13_currency_quick',String(v))}catch(e){}curPersist();render()},String(v));if(r62Quick===v)b.classList.add('wm-quick-selected')})}"
  );

  /* WYNIK / KURS KRZYŻOWY / SPREAD / DO ROZLICZENIA — maskujemy tylko stary tekst, nigdy etykiety ani ramki. */
  out = out.replace(
    "    const v=curCalc();wmDyn(root,[195,992,465,90],`${curFmt(v.gross,2)} ${currencyState.calcTo}`,'green big');wmDyn(root,[112,1165,300,78],`1 ${currencyState.calcFrom} = ${curFmt(curConvert(1,currencyState.calcFrom,currencyState.calcTo),6)} ${currencyState.calcTo}`,'gold small');wmDyn(root,[445,1168,295,75],`${curFmt(currencyState.spreadPct,2)}% • ${curFmt(v.commission,2)} ${currencyState.calcTo}`,'gold small');wmDyn(root,[195,1304,500,75],`DO ROZLICZENIA: ${curFmt(v.settle,2)} ${currencyState.calcTo}`,'green small');",
    "    const v=curCalc();r62Mask([184,1050,486,82],'r62-mask-result');r62Mask([94,1248,300,70],'r62-mask-cross');r62Mask([458,1238,282,70],'r62-mask-spread');r62Mask([190,1388,472,62],'r62-mask-settle');wmDyn(root,[160,1044,532,108],`${curFmt(v.gross,2)} ${currencyState.calcTo}`,'green big r62-result');wmDyn(root,[90,1252,310,70],`1 ${currencyState.calcFrom} = ${curFmt(curConvert(1,currencyState.calcFrom,currencyState.calcTo),6)} ${currencyState.calcTo}`,'gold small r62-cross');wmDyn(root,[420,1238,330,70],`${curFmt(currencyState.spreadPct,2)}% • ${curFmt(v.commission,2)} ${currencyState.calcTo}`,'gold small r62-spread');wmDyn(root,[150,1388,555,62],`DO ROZLICZENIA: ${curFmt(v.settle,2)} ${currencyState.calcTo}`,'green small r62-settle');"
  );

  /* PRZELICZ i dolny pasek dokładnie pod zatwierdzonym przyciskiem. */
  out = out.replace(
    "    wmHot(root,[52,1405,750,145],()=>{curPersist();render();toast('✓ PRZELICZONO')},'Przelicz');wmBottom(root,3);return page}",
    "    wmHot(root,[54,1510,742,132],()=>{curPersist();render();toast('✓ PRZELICZONO')},'Przelicz');wmBottom(root,3);return page}"
  );
  out = out.replace(
    "const y=card===4?1652:1580,h=card===4?180:210,w=WM_W/5;",
    "const y=card===4?1652:card===3?1662:1580,h=card===4?180:card===3?184:210,w=WM_W/5;"
  );

  const r62Style = `<style id="r62-waluty-karta3-master-1to1">
/* KARTA 3 — bez cropu, bez skalowania poza jednym canvasem MASTER 852×1846. */
.wm-page[data-card="3"]{position:relative!important;width:100%!important;overflow:hidden!important;background:#000!important;touch-action:pan-x pan-y pinch-zoom!important;}
.wm-page[data-card="3"] .wm-canvas{position:relative!important;width:100%!important;max-width:852px!important;margin:0 auto!important;overflow:hidden!important;background:#000!important;touch-action:pan-x pan-y pinch-zoom!important;}
.wm-page[data-card="3"] .wm-master{width:100%!important;height:auto!important;display:block!important;object-fit:contain!important;}

/* Fragmenty pochodzą z zaakceptowanego MASTER-a i leżą dokładnie w tym samym układzie współrzędnych. */
.wm-page[data-card="3"] .wm-k3-master-patch{position:absolute!important;z-index:4!important;pointer-events:none!important;object-fit:fill!important;display:block!important;}
.wm-page[data-card="3"] .wm-k3-value-mask{position:absolute!important;z-index:10!important;background:#010101!important;border:0!important;box-shadow:none!important;pointer-events:none!important;}

/* Jedna warstwa LIVE. */
.wm-page[data-card="3"] .wm-hot{z-index:36!important;touch-action:manipulation!important;transform:none!important;}
.wm-page[data-card="3"] .wm-edit{z-index:24!important;}
.wm-page[data-card="3"] .wm-dyn{z-index:24!important;}
.wm-page[data-card="3"] .wm-select{z-index:38!important;}
.wm-page[data-card="3"] .wm-edit,.wm-page[data-card="3"] .wm-dyn{background:transparent!important;border:0!important;box-shadow:none!important;border-radius:0!important;}
.wm-page[data-card="3"] .wm-edit{padding:0!important;text-align:left!important;}
.wm-page[data-card="3"] .wm-edit:focus{box-shadow:none!important;outline:0!important;}
.wm-page[data-card="3"] .r62-amount{font-size:clamp(22px,6.1vw,48px)!important;color:#f6f6f6!important;}
.wm-page[data-card="3"] .r62-source,.wm-page[data-card="3"] .r62-target{justify-content:flex-start!important;text-align:left!important;font-size:clamp(17px,4.6vw,34px)!important;line-height:1!important;}
.wm-page[data-card="3"] .r62-result{justify-content:center!important;text-align:center!important;font-size:clamp(25px,6.3vw,52px)!important;line-height:1!important;text-shadow:0 0 10px rgba(116,255,32,.28)!important;}
.wm-page[data-card="3"] .r62-cross,.wm-page[data-card="3"] .r62-spread,.wm-page[data-card="3"] .r62-settle{justify-content:center!important;text-align:center!important;line-height:1.08!important;}
.wm-page[data-card="3"] .r62-cross,.wm-page[data-card="3"] .r62-spread{font-size:clamp(10px,3.05vw,23px)!important;}
.wm-page[data-card="3"] .r62-settle{font-size:clamp(11px,3.15vw,24px)!important;}

/* MASTER zawiera jedno właściwe koło LIVE. Drugi pasywny ring jest całkowicie wyłączony. */
.wm-page[data-card="3"] .wm-live-ring{display:none!important;visibility:hidden!important;opacity:0!important;animation:none!important;border:0!important;box-shadow:none!important;background:transparent!important;}
.wm-page[data-card="3"] .wm-live-spinner{left:82.25%!important;top:2.05%!important;width:13.3%!important;height:auto!important;aspect-ratio:1/1!important;border-radius:50%!important;z-index:40!important;background:#010401!important;display:grid!important;place-items:center!important;box-shadow:none!important;}
.wm-page[data-card="3"] .wm-live-spinner span{display:block!important;color:#76ff00!important;font-size:clamp(26px,7vw,48px)!important;line-height:1!important;transform-origin:50% 50%!important;}

/* Szybkie kwoty: stan wybrany pozostaje dokładnie w obrębie właściwego kafla. */
.wm-page[data-card="3"] .wm-hot[aria-label="1000"].wm-quick-selected,
.wm-page[data-card="3"] .wm-hot[aria-label="5000"].wm-quick-selected,
.wm-page[data-card="3"] .wm-hot[aria-label="10000"].wm-quick-selected,
.wm-page[data-card="3"] .wm-hot[aria-label="1000"].wm-pressed,
.wm-page[data-card="3"] .wm-hot[aria-label="5000"].wm-pressed,
.wm-page[data-card="3"] .wm-hot[aria-label="10000"].wm-pressed{border:2px solid #76ff00!important;background:rgba(118,255,0,.04)!important;box-shadow:inset 0 0 0 1px rgba(118,255,0,.80),0 0 15px rgba(118,255,0,.70)!important;border-radius:20px!important;}
.wm-page[data-card="3"] .wm-hot[aria-label="Przelicz"].wm-pressed{border:2px solid #76ff00!important;background:rgba(118,255,0,.035)!important;box-shadow:inset 0 0 0 1px rgba(118,255,0,.80),0 0 16px rgba(118,255,0,.62)!important;border-radius:28px!important;}
.wm-page[data-card="3"] .wm-hot::before,.wm-page[data-card="3"] .wm-hot::after{content:none!important;display:none!important;}
</style>`;

  out = out.replace('</head>',r62Style+'\n</head>');
  return out;
};
