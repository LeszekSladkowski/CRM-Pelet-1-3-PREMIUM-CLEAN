/* R66 — WALUTY KARTA 3 FINAL SURGICAL CLOSE.
   KARTA 1 i KARTA 2 FINAL MASTER pozostają bezwzględnie nietknięte.
   KARTA 3: bez zmian grafiki MASTER; zamrożone szybkie przyciski 1000/5000/10000;
   chirurgicznie dopasowany PRZELICZ; LIVE obraca wyłącznie istniejące zielone strzałki z MASTER-a,
   bez obcej ikony/spinnera; cała karta otrzymuje finalny viewport-fit. */
importScripts('./sw-r54-core.js?v=R57-press-fit-ring-clean-1908');

const R66_K3_ASSETS=['./master-waluty-karta3-r64-clean.webp'];
if(Array.isArray(ASSETS))R66_K3_ASSETS.forEach(a=>{if(!ASSETS.includes(a))ASSETS.push(a)});

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

/* ===== R66 — WYŁĄCZNIE KARTA 3: FINAL SURGICAL CLOSE ===== */
const r66BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r66BasePatchIndexHtml(text);

  out = out.replaceAll('1.3.0-master-r57-waluty-k1-press-fit-k2-ring-clean','1.3.0-master-r66-waluty-karta3-final-surgical');
  out = out.replaceAll('R57 WALUTY K1 PRESS FIT + K2 RING CLEAN','R66 WALUTY KARTA 3 FINAL SURGICAL');
  out = out.replace("const BUILD_DATE = '31.08.2026';","const BUILD_DATE = '01.09.2026';");
  out = out.replace("const BUILD_TIME = '19:08';","const BUILD_TIME = '16:28';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R57-waluty-k1-press-fit-k2-ring-clean-1908'","navigator.serviceWorker.register('./sw.js?v=R66-waluty-karta3-final-surgical-1628'");

  /* Synchronizacja LIVE ma być realnie widoczna 2–3 s, nie tylko mignąć. */
  out = out.replaceAll("720-(performance.now()-started)","2400-(performance.now()-started)");

  /* Grafika K3 pozostaje dokładnie zatwierdzonym MASTER-em. */
  out = out.replace(
    "img.src=`master-waluty-karta${card}.png?v=R43-LIVE-HARD-FIX`;",
    "img.src=card===3?'master-waluty-karta3-r64-clean.webp?v=R66-final-1628':`master-waluty-karta${card}.png?v=R43-LIVE-HARD-FIX`;"
  );

  out = out.replace(
    /  function renderCurrency3\(\)\{[\s\S]*?\n  function curProfit\(\)\{/,
`  function renderCurrency3(){const {page,root}=wmBase(3);
    wmHot(root,[28,20,155,165],()=>currencyGo(2),'Powrót');
    const liveBtn=wmHot(root,[650,20,190,190],()=>currencyRefresh(true),'LIVE — synchronizuj kursy');
    liveBtn.classList.add('r66-live-hot');

    /* R66 LIVE — ZERO obcej nakładki/spinnera.
       Podczas synchronizacji renderujemy ten sam MASTER na jednym canvasie i obracamy WYŁĄCZNIE
       zielone piksele dwóch istniejących strzałek z zatwierdzonej ikony LIVE.
       Okrąg i napis LIVE pozostają nieruchome. */
    const masterImg=root.querySelector('.wm-master');
    const mountMasterSurface=()=>{
      if(!masterImg||!masterImg.naturalWidth||root.querySelector('.r66-master-surface'))return;
      const W=852,H=1846;
      const surface=document.createElement('canvas');
      surface.className='r66-master-surface';
      surface.width=W;surface.height=H;
      const ctx=surface.getContext('2d',{alpha:false});
      ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
      ctx.drawImage(masterImg,0,0,W,H);
      masterImg.style.visibility='hidden';
      root.insertBefore(surface,masterImg.nextSibling);

      if(currencyState.loading){
        const sx=720,sy=74,sw=64,sh=58;
        const base=document.createElement('canvas');base.width=W;base.height=H;
        const bctx=base.getContext('2d',{alpha:false});
        bctx.drawImage(masterImg,0,0,W,H);

        const crop=bctx.getImageData(sx,sy,sw,sh);
        const sprite=document.createElement('canvas');sprite.width=sw;sprite.height=sh;
        const sctx=sprite.getContext('2d');
        const spr=sctx.createImageData(sw,sh);

        for(let i=0;i<crop.data.length;i+=4){
          const r=crop.data[i],g=crop.data[i+1],b=crop.data[i+2],a=crop.data[i+3];
          const green=g>34&&g>r*1.18&&g>b*1.18;
          if(green){
            spr.data[i]=r;spr.data[i+1]=g;spr.data[i+2]=b;spr.data[i+3]=a;
            crop.data[i]=2;crop.data[i+1]=5;crop.data[i+2]=2;crop.data[i+3]=255;
          }else{
            spr.data[i]=0;spr.data[i+1]=0;spr.data[i+2]=0;spr.data[i+3]=0;
          }
        }
        bctx.putImageData(crop,sx,sy);
        sctx.putImageData(spr,0,0);

        const started=performance.now();
        const spin=now=>{
          if(!surface.isConnected||!currencyState.loading)return;
          ctx.drawImage(base,0,0);
          const angle=((now-started)/820)*Math.PI*2;
          ctx.save();
          ctx.translate(sx+sw/2,sy+sh/2);
          ctx.rotate(angle);
          ctx.drawImage(sprite,-sw/2,-sh/2);
          ctx.restore();
          requestAnimationFrame(spin);
        };
        requestAnimationFrame(spin);
      }
    };
    if(masterImg.complete&&masterImg.naturalWidth)mountMasterSurface();
    else masterImg.addEventListener('load',mountMasterSurface,{once:true});

    const amount=wmEdit(root,[76,470,415,88],currencyState.calcAmount,v=>{currencyState.calcAmount=v;currencyState.k3QuickSelected=0},'big r66-amount');
    wmSelect(root,[530,451,255,132],currencyState.calcFrom,c=>currencyState.calcFrom=c);
    wmDyn(root,[556,478,190,75],\`\${CURRENCY_FLAGS[currencyState.calcFrom]} \${currencyState.calcFrom}\`,'gold med r66-source');
    wmSelect(root,[52,684,748,132],currencyState.calcTo,c=>currencyState.calcTo=c);
    wmDyn(root,[82,709,625,80],\`\${CURRENCY_FLAGS[currencyState.calcTo]} \${currencyState.calcTo} — \${CURRENCY_NAMES[currencyState.calcTo]}\`,'gold med r66-target');

    /* MASTER LOCK: te trzy geometrie są bezapelacyjnie zamrożone. */
    [[54,874,236,108,1000],[311,874,233,108,5000],[565,874,229,108,10000]].forEach(([x,y,w,h,val])=>{
      const b=wmHot(root,[x,y,w,h],()=>{currencyState.calcAmount=val;currencyState.k3QuickSelected=val;curPersist();render()},String(val));
      b.classList.add('r66-quick');
      if(currencyState.k3QuickSelected===val)b.classList.add('r66-selected');
    });

    const v=curCalc();
    const grossEl=wmDyn(root,[92,1178,668,132],\`\${curFmt(v.gross,2)} \${currencyState.calcTo}\`,'green r66-result');
    const settleEl=wmDyn(root,[171,1408,584,72],\`DO ROZLICZENIA: \${curFmt(v.settle,2)} \${currencyState.calcTo}\`,'green r66-settle');
    const refreshResult=()=>{const nv=curCalc();grossEl.textContent=\`\${curFmt(nv.gross,2)} \${currencyState.calcTo}\`;settleEl.textContent=\`DO ROZLICZENIA: \${curFmt(nv.settle,2)} \${currencyState.calcTo}\`;};

    /* PRZELICZ — hotspot chirurgicznie trafia w istniejącą zieloną ramkę MASTER.
       Bez drugiej ramki: tylko krótkie wzmocnienie poświaty dokładnie na tej geometrii. */
    const calcBtn=wmHot(root,[58,1580,738,121],()=>{
      const raw=Number(String(amount.value).replace(',','.'));
      if(Number.isFinite(raw)){currencyState.calcAmount=raw;currencyState.k3QuickSelected=0;curPersist()}
      refreshResult();
      calcBtn.classList.remove('r66-calculated');void calcBtn.offsetWidth;calcBtn.classList.add('r66-calculated');
      setTimeout(()=>calcBtn.classList.remove('r66-calculated'),680);
      toast('✓ PRZELICZONO — wynik zaktualizowany');
    },'Przelicz');
    calcBtn.classList.add('r66-calc');

    wmBottom(root,3);return page}

  function curProfit(){`
  );

  out = out.replace(
    "const y=card===4?1652:1580,h=card===4?180:210,w=WM_W/5;",
    "const y=card===4?1652:card===3?1690:1580,h=card===4?180:card===3?156:210,w=WM_W/5;"
  );

  const r66Style = `<style id="r66-waluty-karta3-final-surgical">
@keyframes r66CalcGlow{0%{box-shadow:0 0 0 rgba(118,255,0,0),inset 0 0 0 rgba(118,255,0,0)}40%{box-shadow:0 0 18px 5px rgba(118,255,0,.72),inset 0 0 12px rgba(118,255,0,.16)}100%{box-shadow:0 0 5px rgba(118,255,0,.08),inset 0 0 0 rgba(118,255,0,0)}}
.wm-page[data-card="3"]{position:relative!important;width:100%!important;min-height:100dvh!important;overflow:visible!important;background:#000!important;display:flex!important;align-items:flex-start!important;justify-content:flex-start!important;}
.wm-page[data-card="3"] .wm-canvas{
  position:relative!important;
  width:min(98vw,calc((100dvh - 12px) * 852 / 1846),852px)!important;
  max-width:852px!important;
  margin:6px auto!important;
  overflow:hidden!important;
  background:#000!important;
}
.wm-page[data-card="3"] .wm-master{width:100%!important;height:auto!important;display:block!important;object-fit:fill!important;}
.wm-page[data-card="3"] .r66-master-surface{position:absolute!important;z-index:1!important;inset:0!important;width:100%!important;height:100%!important;display:block!important;pointer-events:none!important;}
.wm-page[data-card="3"] .wm-edit,.wm-page[data-card="3"] .wm-dyn{z-index:24!important;background:transparent!important;border:0!important;box-shadow:none!important;border-radius:0!important;font-family:"Arial Narrow","Roboto Condensed",system-ui,sans-serif!important;font-variant-numeric:tabular-nums!important;}
.wm-page[data-card="3"] .wm-edit{padding:0!important;text-align:left!important;color:#fff!important;font-weight:900!important;}
.wm-page[data-card="3"] .wm-edit:focus{outline:0!important;box-shadow:none!important;}
.wm-page[data-card="3"] .r66-amount{font-size:clamp(23px,6.4vw,49px)!important;}
.wm-page[data-card="3"] .r66-source,.wm-page[data-card="3"] .r66-target{justify-content:flex-start!important;color:#ffd34c!important;font-size:clamp(17px,4.6vw,34px)!important;line-height:1!important;}
.wm-page[data-card="3"] .r66-result{justify-content:center!important;text-align:center!important;color:#78ff00!important;font-size:clamp(32px,8.5vw,70px)!important;line-height:1!important;text-shadow:0 0 12px rgba(118,255,0,.60)!important;}
.wm-page[data-card="3"] .r66-settle{justify-content:center!important;text-align:center!important;color:#76ff00!important;font-size:clamp(13px,3.7vw,29px)!important;line-height:1!important;}
.wm-page[data-card="3"] .wm-hot{z-index:36!important;background:transparent!important;box-shadow:none!important;}
.wm-page[data-card="3"] .wm-select{z-index:38!important;}
.wm-page[data-card="3"] .wm-hot::before,.wm-page[data-card="3"] .wm-hot::after{content:none!important;display:none!important;}

/* 1000 / 5000 / 10000 — FINAL MASTER LOCK. */
.wm-page[data-card="3"] .wm-hot.r66-quick{box-sizing:border-box!important;}
.wm-page[data-card="3"] .wm-hot.r66-quick.r66-selected{border:2px solid #76ff00!important;border-radius:12px!important;background:rgba(118,255,0,.012)!important;box-shadow:inset 0 0 0 1px rgba(118,255,0,.72),0 0 14px 3px rgba(118,255,0,.72)!important;}

/* PRZELICZ — żadnej drugiej ramki. Po naciśnięciu tylko poświata na istniejącej geometrii MASTER. */
.wm-page[data-card="3"] .wm-hot.r66-calc{box-sizing:border-box!important;border:0!important;border-radius:14px!important;touch-action:manipulation!important;}
.wm-page[data-card="3"] .wm-hot.r66-calc.wm-pressed{border:0!important;background:rgba(118,255,0,.018)!important;box-shadow:0 0 15px 4px rgba(118,255,0,.55),inset 0 0 10px rgba(118,255,0,.12)!important;transform:scale(.998)!important;}
.wm-page[data-card="3"] .wm-hot.r66-calc.r66-calculated{border:0!important;animation:r66CalcGlow .68s ease-out 1!important;}

/* K3 nie używa żadnego dodatkowego LIVE spinnera/ringu. */
.wm-page[data-card="3"] .wm-live-spinner,.wm-page[data-card="3"] .wm-live-ring,.wm-page[data-card="3"] .r65-live-spinner{display:none!important;visibility:hidden!important;opacity:0!important;animation:none!important;}
</style>`;

  out = out.replace('</head>',r66Style+'\n</head>');
  return out;
};
