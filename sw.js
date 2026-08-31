/* R59 — WALUTY KARTA 3 CLEAN LIVE.
   KARTA 1 i KARTA 2 FINAL MASTER oraz RYNKI EU FINAL MASTER pozostają bezwzględnie nietknięte.
   KARTA 3 używa zatwierdzonej grafiki MASTER oczyszczonej wyłącznie z wypalonych przykładowych danych;
   wszystkie wartości są rysowane dokładnie raz jako dane LIVE. */
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
.wm-page[data-card="2"] .wm-live-spinner{
  z-index:32!important;
}
.wm-page[data-card="2"] .wm-hot{
  touch-action:manipulation!important;
}
</style>`;

  out = out.replace(/<style id="r54-waluty-karta2-raster-restore">[\s\S]*?<\/style>/, r57Style);
  return out;
};

/* ===== R59 — WYŁĄCZNIE KARTA 3 ===== */
const r59BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r59BasePatchIndexHtml(text);

  /* Spójna wersja / updater. */
  out = out.replaceAll('1.3.0-master-r57-waluty-k1-press-fit-k2-ring-clean','1.3.0-master-r59-waluty-karta3-clean-live');
  out = out.replaceAll('R57 WALUTY K1 PRESS FIT + K2 RING CLEAN','R59 WALUTY KARTA 3 CLEAN LIVE');
  out = out.replace("const BUILD_TIME = '19:08';","const BUILD_TIME = '22:13';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R57-waluty-k1-press-fit-k2-ring-clean-1908'","navigator.serviceWorker.register('./sw.js?v=R59-waluty-karta3-clean-live-2213'");

  /* Tylko KARTA 3 dostaje czysty MASTER bez wypalonych przykładowych danych. K1/K2/K4 bez zmian. */
  out = out.replace(
    "img.src=`master-waluty-karta${card}.png?v=R43-LIVE-HARD-FIX`;",
    "img.src=card===3?'master-waluty-karta3-r59-clean.svg?v=R59-2213':`master-waluty-karta${card}.png?v=R43-LIVE-HARD-FIX`;"
  );

  /* KARTA 3 — jedna, jedyna warstwa danych LIVE. Zero dublowania statycznych wartości z rastra. */
  out = out.replace(
    "    const amountChanged=Math.abs(currencyState.calcAmount-currencyDefaults.calcAmount)>.00001;\n    if(amountChanged)wmEdit(root,[82,395,420,110],currencyState.calcAmount,v=>currencyState.calcAmount=v,'big');else{const hit=wmHot(root,[55,375,470,145],()=>{} ,'Kwota');hit.addEventListener('click',()=>{hit.remove();wmEdit(root,[82,395,420,110],currencyState.calcAmount,v=>currencyState.calcAmount=v,'big').focus()},{once:true})}",
    "    wmEdit(root,[82,438,420,92],currencyState.calcAmount,v=>currencyState.calcAmount=v,'big r59-amount');"
  );

  out = out.replace(
    "    wmSelect(root,[535,375,260,145],currencyState.calcFrom,c=>currencyState.calcFrom=c);if(currencyState.calcFrom!==currencyDefaults.calcFrom)wmDyn(root,[585,405,175,80],`${CURRENCY_FLAGS[currencyState.calcFrom]} ${currencyState.calcFrom}`,'gold med');",
    "    wmSelect(root,[538,417,259,136],currencyState.calcFrom,c=>currencyState.calcFrom=c);wmDyn(root,[566,448,170,78],`${CURRENCY_FLAGS[currencyState.calcFrom]} ${currencyState.calcFrom}`,'gold med r59-source');"
  );

  out = out.replace(
    "    wmSelect(root,[50,590,750,140],currencyState.calcTo,c=>currencyState.calcTo=c);if(currencyState.calcTo!==currencyDefaults.calcTo)wmDyn(root,[100,620,610,82],`${CURRENCY_FLAGS[currencyState.calcTo]} ${currencyState.calcTo} — ${CURRENCY_NAMES[currencyState.calcTo]}`,'gold med');",
    "    wmSelect(root,[52,647,745,131],currencyState.calcTo,c=>currencyState.calcTo=c);wmDyn(root,[82,669,610,82],`${CURRENCY_FLAGS[currencyState.calcTo]} ${currencyState.calcTo} — ${CURRENCY_NAMES[currencyState.calcTo]}`,'gold med r59-target');"
  );

  out = out.replace(
    "    [[52,760,230,100,1000],[300,760,230,100,5000],[548,760,230,100,10000]].forEach(([x,y,w,h,v])=>wmHot(root,[x,y,w,h],()=>{currencyState.calcAmount=v;curPersist();render()},String(v)));",
    "    [[53,812,230,101,1000],[305,812,221,101,5000],[549,812,248,101,10000]].forEach(([x,y,w,h,v])=>wmHot(root,[x,y,w,h],()=>{currencyState.calcAmount=v;curPersist();render()},String(v)));"
  );

  out = out.replace(
    "    const v=curCalc();wmDyn(root,[195,992,465,90],`${curFmt(v.gross,2)} ${currencyState.calcTo}`,'green big');wmDyn(root,[112,1165,300,78],`1 ${currencyState.calcFrom} = ${curFmt(curConvert(1,currencyState.calcFrom,currencyState.calcTo),6)} ${currencyState.calcTo}`,'gold small');wmDyn(root,[445,1168,295,75],`${curFmt(currencyState.spreadPct,2)}% • ${curFmt(v.commission,2)} ${currencyState.calcTo}`,'gold small');wmDyn(root,[195,1304,500,75],`DO ROZLICZENIA: ${curFmt(v.settle,2)} ${currencyState.calcTo}`,'green small');",
    "    const v=curCalc();wmDyn(root,[180,1024,500,108],`${curFmt(v.gross,2)} ${currencyState.calcTo}`,'green big r59-result');wmDyn(root,[98,1218,300,94],`1 ${currencyState.calcFrom} = ${curFmt(curConvert(1,currencyState.calcFrom,currencyState.calcTo),6)} ${currencyState.calcTo}`,'gold small r59-cross');wmDyn(root,[442,1218,292,94],`${curFmt(currencyState.spreadPct,2)}% • ${curFmt(v.commission,2)} ${currencyState.calcTo}`,'gold small r59-spread');wmDyn(root,[158,1328,538,90],`DO ROZLICZENIA: ${curFmt(v.settle,2)} ${currencyState.calcTo}`,'green small r59-settle');"
  );

  out = out.replace(
    "    wmHot(root,[52,1405,750,145],()=>{curPersist();render();toast('✓ PRZELICZONO')},'Przelicz');wmBottom(root,3);return page}",
    "    wmHot(root,[53,1486,744,133],()=>{curPersist();render();toast('✓ PRZELICZONO')},'Przelicz');wmBottom(root,3);return page}"
  );

  /* Dolna nawigacja K3 zaczyna się dopiero pod zatwierdzonym przyciskiem PRZELICZ. */
  out = out.replace(
    "const y=card===4?1652:1580,h=card===4?180:210,w=WM_W/5;",
    "const y=card===4?1652:card===3?1630:1580,h=card===4?180:card===3?200:210,w=WM_W/5;"
  );

  const r59Style = `<style id="r59-waluty-karta3-clean-live">
/* KARTA 3 MASTER 852×1846 — bez cropu, bez przesuwania całego rastra. */
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

/* Dane LIVE są przezroczyste — żadnych czarnych prostokątów/nakładek nad MASTER-em. */
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
.wm-page[data-card="3"] .r59-amount{font-size:clamp(22px,6.1vw,48px)!important;}
.wm-page[data-card="3"] .r59-source,
.wm-page[data-card="3"] .r59-target{
  justify-content:flex-start!important;
  text-align:left!important;
  font-size:clamp(17px,4.6vw,34px)!important;
  line-height:1!important;
}
.wm-page[data-card="3"] .r59-result{
  justify-content:center!important;
  text-align:center!important;
  font-size:clamp(25px,6.3vw,52px)!important;
  line-height:1!important;
  text-shadow:0 0 10px rgba(116,255,32,.28)!important;
}
.wm-page[data-card="3"] .r59-cross,
.wm-page[data-card="3"] .r59-spread,
.wm-page[data-card="3"] .r59-settle{
  justify-content:center!important;
  text-align:center!important;
  line-height:1.12!important;
}
.wm-page[data-card="3"] .r59-cross,
.wm-page[data-card="3"] .r59-spread{font-size:clamp(10px,3.05vw,23px)!important;}
.wm-page[data-card="3"] .r59-settle{font-size:clamp(11px,3.15vw,24px)!important;}

/* MASTER ma już zatwierdzone koło LIVE. Usuwamy pasywny drugi ring. */
.wm-page[data-card="3"] .wm-live-ring{
  display:none!important;
  visibility:hidden!important;
  opacity:0!important;
  animation:none!important;
  border:0!important;
  box-shadow:none!important;
  background:transparent!important;
}
/* Podczas synchronizacji zakrywamy tylko środek statycznej strzałki i obracamy jeden glyph — bez drugiego koła. */
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

/* Na K3 nie wolno rysować ogólnego prostokątnego feedbacku. */
.wm-page[data-card="3"] .wm-hot.wm-pressed::after{display:none!important;}
/* Feedback tylko dla czterech zatwierdzonych przycisków i zawsze wewnątrz ich własnej ramki. */
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

  if(!out.includes('id="r59-waluty-karta3-clean-live"'))out = out.replace('</head>',r59Style+'</head>');
  return out;
};
