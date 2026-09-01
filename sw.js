/* R60 — WALUTY KARTA 3 MASTER RASTER FIX.
   KARTA 1 i KARTA 2 FINAL MASTER oraz RYNKI EU FINAL MASTER pozostają bezwzględnie nietknięte.
   KARTA 3 wraca do bezpośredniego rastra PNG; zatwierdzony wygląd jest odtwarzany dokładnymi,
   bezstratnymi łatami WEBP z zaakceptowanej grafiki 852×1846. Bez pośredniego SVG. */
importScripts('./sw-r54-core.js?v=R57-press-fit-ring-clean-1908');

const R60_K3_ASSETS=[
  './waluty-k3-r60-top.webp',
  './waluty-k3-r60-amount.webp',
  './waluty-k3-r60-source.webp',
  './waluty-k3-r60-target.webp',
  './waluty-k3-r60-result.webp',
  './waluty-k3-r60-cross.webp',
  './waluty-k3-r60-spread.webp',
  './waluty-k3-r60-settle.webp'
];
if(Array.isArray(ASSETS))R60_K3_ASSETS.forEach(a=>{if(!ASSETS.includes(a))ASSETS.push(a)});

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
/* KARTA 2 FINAL MASTER R57 — bez zmian. */
.wm-page[data-card="2"]{
  position:relative!important;
  overflow:hidden!important;
  background:#000!important;
}
.wm-page[data-card="2"] .wm-canvas{
  margin-top:max(-60px,-7.042vw)!important;
  overflow:visible!important;
}
.wm-page[data-card="2"]::before{
  content:none!important;
  display:none!important;
  width:0!important;
  height:0!important;
  background:transparent!important;
  pointer-events:none!important;
}
.wm-page[data-card="2"] .wm-live-ring{
  display:none!important;
  visibility:hidden!important;
  opacity:0!important;
  animation:none!important;
  border:0!important;
  box-shadow:none!important;
  background:transparent!important;
}
.wm-page[data-card="2"] .wm-live-spinner{z-index:32!important;}
.wm-page[data-card="2"] .wm-hot{touch-action:manipulation!important;}
</style>`;

  out = out.replace(/<style id="r54-waluty-karta2-raster-restore">[\s\S]*?<\/style>/, r57Style);
  return out;
};

/* ===== R60 — WYŁĄCZNIE KARTA 3 ===== */
const r60BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r60BasePatchIndexHtml(text);

  /* Wersja/updater — K1/K2 pozostają R57 MASTER, zmiana dotyczy tylko K3. */
  out = out.replaceAll('1.3.0-master-r57-waluty-k1-press-fit-k2-ring-clean','1.3.0-master-r60-waluty-karta3-master-raster-fix');
  out = out.replaceAll('R57 WALUTY K1 PRESS FIT + K2 RING CLEAN','R60 WALUTY KARTA 3 MASTER RASTER FIX');
  out = out.replace("const BUILD_DATE = '31.08.2026';","const BUILD_DATE = '01.09.2026';");
  out = out.replace("const BUILD_TIME = '19:08';","const BUILD_TIME = '06:44';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R57-waluty-k1-press-fit-k2-ring-clean-1908'","navigator.serviceWorker.register('./sw.js?v=R60-waluty-karta3-master-raster-fix-0644'");

  /* KARTA 3: bezpośredni PNG — koniec z pośrednim SVG, które dawało czarny ekran. */
  out = out.replace(
    "img.src=`master-waluty-karta${card}.png?v=R43-LIVE-HARD-FIX`;",
    "img.src=card===3?'master-waluty-karta3.png?v=R60-K3-DIRECT-0644':`master-waluty-karta${card}.png?v=R43-LIVE-HARD-FIX`;"
  );

  /* KARTA 3: dokładne, bezstratne fragmenty zatwierdzonej grafiki MASTER + jedna warstwa LIVE. */
  out = out.replace(
    "    const amountChanged=Math.abs(currencyState.calcAmount-currencyDefaults.calcAmount)>.00001;\n    if(amountChanged)wmEdit(root,[82,395,420,110],currencyState.calcAmount,v=>currencyState.calcAmount=v,'big');else{const hit=wmHot(root,[55,375,470,145],()=>{} ,'Kwota');hit.addEventListener('click',()=>{hit.remove();wmEdit(root,[82,395,420,110],currencyState.calcAmount,v=>currencyState.calcAmount=v,'big').focus()},{once:true})}",
    `    const r60Patch=(rect,src)=>{const p=document.createElement('img');p.className='wm-k3-clean-patch';p.src=src;wmRect(p,rect);p.alt='';p.setAttribute('aria-hidden','true');root.append(p);return p};
    r60Patch([0,0,852,230],'waluty-k3-r60-top.webp?v=R60');
    r60Patch([68,440,195,86],'waluty-k3-r60-amount.webp?v=R60');
    r60Patch([548,444,184,82],'waluty-k3-r60-source.webp?v=R60');
    r60Patch([70,666,420,86],'waluty-k3-r60-target.webp?v=R60');
    r60Patch([145,1018,560,112],'waluty-k3-r60-result.webp?v=R60');
    r60Patch([88,1206,316,96],'waluty-k3-r60-cross.webp?v=R60');
    r60Patch([432,1206,316,104],'waluty-k3-r60-spread.webp?v=R60');
    r60Patch([142,1322,568,94],'waluty-k3-r60-settle.webp?v=R60');
    wmEdit(root,[76,438,400,92],currencyState.calcAmount,v=>currencyState.calcAmount=v,'big r60-amount');`
  );

  out = out.replace(
    "    wmSelect(root,[535,375,260,145],currencyState.calcFrom,c=>currencyState.calcFrom=c);if(currencyState.calcFrom!==currencyDefaults.calcFrom)wmDyn(root,[585,405,175,80],`${CURRENCY_FLAGS[currencyState.calcFrom]} ${currencyState.calcFrom}`,'gold med');",
    "    wmSelect(root,[527,419,252,133],currencyState.calcFrom,c=>currencyState.calcFrom=c);wmDyn(root,[552,450,178,72],`${CURRENCY_FLAGS[currencyState.calcFrom]} ${currencyState.calcFrom}`,'gold med r60-source');"
  );

  out = out.replace(
    "    wmSelect(root,[50,590,750,140],currencyState.calcTo,c=>currencyState.calcTo=c);if(currencyState.calcTo!==currencyDefaults.calcTo)wmDyn(root,[100,620,610,82],`${CURRENCY_FLAGS[currencyState.calcTo]} ${currencyState.calcTo} — ${CURRENCY_NAMES[currencyState.calcTo]}`,'gold med');",
    "    wmSelect(root,[52,648,727,128],currencyState.calcTo,c=>currencyState.calcTo=c);wmDyn(root,[80,672,610,76],`${CURRENCY_FLAGS[currencyState.calcTo]} ${currencyState.calcTo} — ${CURRENCY_NAMES[currencyState.calcTo]}`,'gold med r60-target');"
  );

  out = out.replace(
    "    [[52,760,230,100,1000],[300,760,230,100,5000],[548,760,230,100,10000]].forEach(([x,y,w,h,v])=>wmHot(root,[x,y,w,h],()=>{currencyState.calcAmount=v;curPersist();render()},String(v)));",
    "    [[54,812,228,100,1000],[306,812,219,100,5000],[550,812,246,100,10000]].forEach(([x,y,w,h,v])=>wmHot(root,[x,y,w,h],()=>{currencyState.calcAmount=v;curPersist();render()},String(v)));"
  );

  out = out.replace(
    "    const v=curCalc();wmDyn(root,[195,992,465,90],`${curFmt(v.gross,2)} ${currencyState.calcTo}`,'green big');wmDyn(root,[112,1165,300,78],`1 ${currencyState.calcFrom} = ${curFmt(curConvert(1,currencyState.calcFrom,currencyState.calcTo),6)} ${currencyState.calcTo}`,'gold small');wmDyn(root,[445,1168,295,75],`${curFmt(currencyState.spreadPct,2)}% • ${curFmt(v.commission,2)} ${currencyState.calcTo}`,'gold small');wmDyn(root,[195,1304,500,75],`DO ROZLICZENIA: ${curFmt(v.settle,2)} ${currencyState.calcTo}`,'green small');",
    "    const v=curCalc();wmDyn(root,[160,1018,532,108],`${curFmt(v.gross,2)} ${currencyState.calcTo}`,'green big r60-result');wmDyn(root,[90,1210,310,90],`1 ${currencyState.calcFrom} = ${curFmt(curConvert(1,currencyState.calcFrom,currencyState.calcTo),6)} ${currencyState.calcTo}`,'gold small r60-cross');wmDyn(root,[420,1210,330,90],`${curFmt(currencyState.spreadPct,2)}% • ${curFmt(v.commission,2)} ${currencyState.calcTo}`,'gold small r60-spread');wmDyn(root,[150,1330,555,80],`DO ROZLICZENIA: ${curFmt(v.settle,2)} ${currencyState.calcTo}`,'green small r60-settle');"
  );

  out = out.replace(
    "    wmHot(root,[52,1405,750,145],()=>{curPersist();render();toast('✓ PRZELICZONO')},'Przelicz');wmBottom(root,3);return page}",
    "    wmHot(root,[54,1486,742,132],()=>{curPersist();render();toast('✓ PRZELICZONO')},'Przelicz');wmBottom(root,3);return page}"
  );

  /* Dolna nawigacja K3 zaczyna się poniżej PRZELICZ. */
  out = out.replace(
    "const y=card===4?1652:1580,h=card===4?180:210,w=WM_W/5;",
    "const y=card===4?1652:card===3?1655:1580,h=card===4?180:card===3?191:210,w=WM_W/5;"
  );

  const r60Style = `<style id="r60-waluty-karta3-master-raster-fix">
/* KARTA 3 — zatwierdzony format 852×1846, bez cropu i bez przesuwania rastra. */
.wm-page[data-card="3"]{
  position:relative!important;
  width:100%!important;
  overflow:hidden!important;
  background:#000!important;
  touch-action:pan-x pan-y pinch-zoom!important;
}
.wm-page[data-card="3"] .wm-canvas{
  position:relative!important;
  width:100%!important;
  max-width:852px!important;
  margin:0 auto!important;
  overflow:hidden!important;
  background:#000!important;
  touch-action:pan-x pan-y pinch-zoom!important;
}
.wm-page[data-card="3"] .wm-master{
  width:100%!important;
  height:auto!important;
  display:block!important;
  object-fit:contain!important;
}

/* Dokładne fragmenty zatwierdzonego MASTER-a — piksel w piksel, bez skalowania niezależnego od canvasu. */
.wm-page[data-card="3"] .wm-k3-clean-patch{
  position:absolute!important;
  z-index:2!important;
  pointer-events:none!important;
  object-fit:fill!important;
  display:block!important;
}

/* LIVE zawsze nad rastrami/łatami. */
.wm-page[data-card="3"] .wm-hot,
.wm-page[data-card="3"] .wm-edit,
.wm-page[data-card="3"] .wm-dyn,
.wm-page[data-card="3"] .wm-select{z-index:20!important;}

.wm-page[data-card="3"] .wm-edit,
.wm-page[data-card="3"] .wm-dyn{
  background:transparent!important;
  border:0!important;
  box-shadow:none!important;
  border-radius:0!important;
}
.wm-page[data-card="3"] .wm-edit{
  padding:0!important;
  text-align:left!important;
}
.wm-page[data-card="3"] .wm-edit:focus{box-shadow:none!important;outline:0!important;}
.wm-page[data-card="3"] .r60-amount{font-size:clamp(22px,6.1vw,48px)!important;}
.wm-page[data-card="3"] .r60-source,
.wm-page[data-card="3"] .r60-target{
  justify-content:flex-start!important;
  text-align:left!important;
  font-size:clamp(17px,4.6vw,34px)!important;
  line-height:1!important;
}
.wm-page[data-card="3"] .r60-result{
  justify-content:center!important;
  text-align:center!important;
  font-size:clamp(25px,6.3vw,52px)!important;
  line-height:1!important;
  text-shadow:0 0 10px rgba(116,255,32,.28)!important;
}
.wm-page[data-card="3"] .r60-cross,
.wm-page[data-card="3"] .r60-spread,
.wm-page[data-card="3"] .r60-settle{
  justify-content:center!important;
  text-align:center!important;
  line-height:1.12!important;
}
.wm-page[data-card="3"] .r60-cross,
.wm-page[data-card="3"] .r60-spread{font-size:clamp(10px,3.05vw,23px)!important;}
.wm-page[data-card="3"] .r60-settle{font-size:clamp(11px,3.15vw,24px)!important;}

/* MASTER ma już zatwierdzone koło LIVE — żadnego drugiego ringa. */
.wm-page[data-card="3"] .wm-live-ring{
  display:none!important;
  visibility:hidden!important;
  opacity:0!important;
  animation:none!important;
  border:0!important;
  box-shadow:none!important;
  background:transparent!important;
}
.wm-page[data-card="3"] .wm-live-spinner{
  left:83.05%!important;
  top:2.45%!important;
  width:8.75%!important;
  height:auto!important;
  aspect-ratio:1/1!important;
  z-index:82!important;
  border:0!important;
  border-radius:50%!important;
  background:rgba(0,4,0,.96)!important;
  box-shadow:none!important;
  color:#76ff00!important;
  font-size:clamp(24px,7vw,48px)!important;
  display:grid!important;
  place-items:center!important;
}
.wm-page[data-card="3"] .wm-live-spinner span{
  display:block!important;
  margin:auto!important;
  line-height:1!important;
  transform-origin:50% 50%!important;
}

/* Feedback tylko w obrębie zatwierdzonych ramek. */
.wm-page[data-card="3"] .wm-hot.wm-pressed::after{display:none!important;}
.wm-page[data-card="3"] .wm-hot[aria-label="1000"].wm-pressed::after,
.wm-page[data-card="3"] .wm-hot[aria-label="5000"].wm-pressed::after,
.wm-page[data-card="3"] .wm-hot[aria-label="10000"].wm-pressed::after,
.wm-page[data-card="3"] .wm-hot[aria-label="Przelicz"].wm-pressed::after{
  display:block!important;
  inset:4px!important;
  border-radius:18px!important;
  box-shadow:inset 0 0 0 2px rgba(118,255,0,.82),0 0 12px rgba(118,255,0,.56)!important;
}
.wm-page[data-card="3"] .wm-hot{touch-action:manipulation!important;}
</style>`;

  if(!out.includes('id="r60-waluty-karta3-master-raster-fix"'))out = out.replace('</head>',r60Style+'</head>');
  return out;
};
