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
    wmDyn(root,[556,478,190,75],`${CURRENCY_FLAGS[currencyState.calcFrom]} ${currencyState.calcFrom}`,'gold med r66-source');
    wmSelect(root,[52,684,748,132],currencyState.calcTo,c=>currencyState.calcTo=c);
    wmDyn(root,[82,709,625,80],`${CURRENCY_FLAGS[currencyState.calcTo]} ${currencyState.calcTo} — ${CURRENCY_NAMES[currencyState.calcTo]}`,'gold med r66-target');

    /* MASTER LOCK: te trzy geometrie są bezapelacyjnie zamrożone. */
    [[54,874,236,108,1000],[311,874,233,108,5000],[565,874,229,108,10000]].forEach(([x,y,w,h,val])=>{
      const b=wmHot(root,[x,y,w,h],()=>{currencyState.calcAmount=val;currencyState.k3QuickSelected=val;curPersist();render()},String(val));
      b.classList.add('r66-quick');
      if(currencyState.k3QuickSelected===val)b.classList.add('r66-selected');
    });

    const v=curCalc();
    const grossEl=wmDyn(root,[92,1178,668,132],`${curFmt(v.gross,2)} ${currencyState.calcTo}`,'green r66-result');
    const settleEl=wmDyn(root,[171,1408,584,72],`DO ROZLICZENIA: ${curFmt(v.settle,2)} ${currencyState.calcTo}`,'green r66-settle');
    const refreshResult=()=>{const nv=curCalc();grossEl.textContent=`${curFmt(nv.gross,2)} ${currencyState.calcTo}`;settleEl.textContent=`DO ROZLICZENIA: ${curFmt(nv.settle,2)} ${currencyState.calcTo}`;};

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

/* ===== R67 — WYŁĄCZNIE KARTA 4: VIEWPORT + CLEAN LIVE + DYNAMIC GAUGE =====
   KARTY 1, 2 i 3 są FINAL MASTER i pozostają BEZWZGLĘDNIE nietknięte.
   KARTA 4: ten etap jest kandydatem do testu — bez statusu MASTER do czasu akceptacji użytkownika. */
const r67BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r67BasePatchIndexHtml(text);

  out = out.replaceAll('1.3.0-master-r66-waluty-karta3-final-surgical','1.3.0-master-r67-waluty-karta4-surgical-test');
  out = out.replaceAll('R66 WALUTY KARTA 3 FINAL SURGICAL','R67 WALUTY KARTA 4 SURGICAL TEST');
  out = out.replace("const BUILD_TIME = '16:28';","const BUILD_TIME = '16:58';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R66-waluty-karta3-final-surgical-1628'","navigator.serviceWorker.register('./sw.js?v=R67-waluty-karta4-surgical-test-1658'");

  out = out.replace(
    /  function renderCurrency4\(\)\{[\s\S]*?\n  function renderCurrency\(\)\{/,
`  function renderCurrency4(){const {page,root}=wmBase(4);
    /* K4: własne hotspoty TOP — bez wmTop(), więc ZERO starego ring/spinnera. */
    wmHot(root,[28,20,155,180],()=>currencyGo(3),'Powrót');
    const liveBtn=wmHot(root,[650,20,190,205],()=>currencyRefresh(true),'LIVE — synchronizuj kursy');
    liveBtn.classList.add('r67-k4-live-hot');

    const v=curProfit(),good=v.profit>=0;
    const masterImg=root.querySelector('.wm-master');

    /* Jeden fizyczny canvas zastępuje widoczny raster K4.
       Na nim usuwamy WYŁĄCZNIE wypalone stare dane i pseudo-poświatę LIVE,
       a wskazówkę OPŁACALNOŚĆ rysujemy z realnej marży. */
    const mountK4Surface=()=>{
      if(!masterImg||!masterImg.naturalWidth||root.querySelector('.r67-k4-master-surface'))return;
      const W=852,H=1846;
      const surface=document.createElement('canvas');
      surface.className='r67-k4-master-surface';surface.width=W;surface.height=H;
      const ctx=surface.getContext('2d',{alpha:false});
      ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
      ctx.drawImage(masterImg,0,0,W,H);

      const darkBox=(x,y,w,h)=>{
        const g=ctx.createLinearGradient(x,y,x+w,y+h);
        g.addColorStop(0,'#070907');g.addColorStop(.52,'#020302');g.addColorStop(1,'#050605');
        ctx.fillStyle=g;ctx.fillRect(x+4,y+4,w-8,h-8);
      };

      /* Czyścimy wypalone wartości — bez HTML-owych czarnych masek. */
      darkBox(400,380,230,82);
      darkBox(630,370,160,95);
      darkBox(395,470,398,92);
      darkBox(400,570,230,82);
      darkBox(630,565,160,95);
      darkBox(400,666,230,82);
      darkBox(630,662,160,95);
      darkBox(400,765,230,82);
      darkBox(434,894,200,88);
      darkBox(434,994,200,88);
      darkBox(72,1212,292,248);
      ctx.strokeStyle='rgba(214,166,40,.82)';ctx.lineWidth=2;
      ctx.beginPath();ctx.moveTo(110,1366);ctx.lineTo(330,1366);ctx.stroke();

      try{
        const rx=652,ry=36,rw=190,rh=176,icx=746,icy=109;
        const glow=ctx.getImageData(rx,ry,rw,rh);
        for(let yy=0;yy<rh;yy++)for(let xx=0;xx<rw;xx++){
          const i=(yy*rw+xx)*4,gx=rx+xx,gy=ry+yy;
          const r=glow.data[i],g=glow.data[i+1],b=glow.data[i+2];
          const green=g>34&&g>r*1.16&&g>b*1.14;
          const d=Math.hypot(gx-icx,gy-icy);
          const keepCircle=d<69;
          const keepLiveText=gx>700&&gx<815&&gy>147&&gy<201;
          if(green&&!keepCircle&&!keepLiveText){glow.data[i]=2;glow.data[i+1]=5;glow.data[i+2]=2;glow.data[i+3]=255;}
        }
        ctx.putImageData(glow,rx,ry);
      }catch{}

      const cx=607,cy=1480;
      ctx.save();ctx.strokeStyle='#020302';ctx.lineWidth=17;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(731,1380);ctx.stroke();ctx.restore();

      const m=Math.max(-20,Math.min(20,Number(v.margin)||0));
      const ratio=(m+20)/40,angle=Math.PI+ratio*Math.PI,len=132;
      const ex=cx+Math.cos(angle)*len,ey=cy+Math.sin(angle)*len;
      ctx.save();ctx.shadowColor='rgba(255,255,255,.40)';ctx.shadowBlur=5;
      const ng=ctx.createLinearGradient(cx,cy,ex,ey);ng.addColorStop(0,'#777');ng.addColorStop(.55,'#f0ede3');ng.addColorStop(1,'#fff7dc');
      ctx.strokeStyle='#050505';ctx.lineWidth=13;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(ex,ey);ctx.stroke();
      ctx.strokeStyle=ng;ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(ex,ey);ctx.stroke();
      ctx.shadowBlur=0;ctx.fillStyle='#101010';ctx.strokeStyle='#b9aa80';ctx.lineWidth=3;ctx.beginPath();ctx.arc(cx,cy,24,0,Math.PI*2);ctx.fill();ctx.stroke();
      ctx.fillStyle='#050505';ctx.beginPath();ctx.arc(cx,cy,12,0,Math.PI*2);ctx.fill();ctx.restore();

      masterImg.style.visibility='hidden';root.insertBefore(surface,masterImg.nextSibling);

      if(currencyState.loading){
        const sx=706,sy=73,sw=82,sh=74,acx=746,acy=109;
        const base=document.createElement('canvas');base.width=W;base.height=H;
        const bctx=base.getContext('2d',{alpha:false});bctx.drawImage(surface,0,0);
        const crop=bctx.getImageData(sx,sy,sw,sh);
        const sprite=document.createElement('canvas');sprite.width=sw;sprite.height=sh;
        const sctx=sprite.getContext('2d');const spr=sctx.createImageData(sw,sh);
        for(let yy=0;yy<sh;yy++)for(let xx=0;xx<sw;xx++){
          const i=(yy*sw+xx)*4,gx=sx+xx,gy=sy+yy;
          const r=crop.data[i],g=crop.data[i+1],b=crop.data[i+2],a=crop.data[i+3];
          const green=g>40&&g>r*1.18&&g>b*1.18;
          const inner=Math.hypot(gx-acx,gy-acy)<43;
          if(green&&inner){spr.data[i]=r;spr.data[i+1]=g;spr.data[i+2]=b;spr.data[i+3]=a;crop.data[i]=2;crop.data[i+1]=5;crop.data[i+2]=2;crop.data[i+3]=255;}
        }
        bctx.putImageData(crop,sx,sy);sctx.putImageData(spr,0,0);
        const started=performance.now();
        const spin=now=>{if(!surface.isConnected||!currencyState.loading)return;ctx.drawImage(base,0,0);const a=((now-started)/820)*Math.PI*2;ctx.save();ctx.translate(acx,acy);ctx.rotate(a);ctx.drawImage(sprite,-(acx-sx),-(acy-sy));ctx.restore();requestAnimationFrame(spin);};
        requestAnimationFrame(spin);
      }
    };
    if(masterImg.complete&&masterImg.naturalWidth)mountK4Surface();else masterImg.addEventListener('load',mountK4Surface,{once:true});

    const buy=wmEdit(root,[400,380,230,82],currencyState.buyPrice,v=>currencyState.buyPrice=v,'med r67-k4-edit');
    wmSelect(root,[630,370,160,95],currencyState.buyCurrency,c=>currencyState.buyCurrency=c);
    wmDyn(root,[646,382,125,66],currencyState.buyCurrency,'gold med r67-k4-code');
    wmSelect(root,[395,470,398,92],currencyState.buyCurrency,c=>currencyState.buyCurrency=c);
    wmDyn(root,[420,484,355,66],`${CURRENCY_FLAGS[currencyState.buyCurrency]} ${currencyState.buyCurrency} — ${CURRENCY_NAMES[currencyState.buyCurrency]}`,'gold small r67-k4-buycurrency');
    wmEdit(root,[400,570,230,82],currencyState.salePrice,v=>currencyState.salePrice=v,'med r67-k4-edit');
    wmSelect(root,[630,565,160,95],currencyState.saleCurrency,c=>currencyState.saleCurrency=c);
    wmDyn(root,[646,580,125,65],currencyState.saleCurrency,'gold med r67-k4-code');
    wmEdit(root,[400,666,230,82],currencyState.transport,v=>currencyState.transport=v,'med r67-k4-edit');
    wmSelect(root,[630,662,160,95],currencyState.transportCurrency,c=>currencyState.transportCurrency=c);
    wmDyn(root,[646,676,125,65],currencyState.transportCurrency,'gold med r67-k4-code');
    const spreadInput=wmEdit(root,[400,765,230,82],currencyState.spreadPct,v=>currencyState.spreadPct=v,'med r67-k4-edit');
    wmHot(root,[628,758,165,100],()=>{spreadInput.focus();spreadInput.select();toast('SPREAD / PROWIZJA — wpisz wartość w %')},'Spread / prowizja procentowa');
    wmDyn(root,[438,900,190,76],curFmt(v.cost,2),'gold med r67-k4-cost');
    wmDyn(root,[438,1000,190,76],curFmt(v.profit,2),good?'green med r67-k4-profit':'red med r67-k4-profit');
    wmDyn(root,[88,1230,285,100],curFmt(v.margin,2)+'%',good?'green big r67-k4-margin':'red big r67-k4-margin');
    wmDyn(root,[82,1390,300,82],good?'OPŁACALNE':'NIEOPŁACALNE',good?'green med r67-k4-status':'red med r67-k4-status');
    const calcBtn=wmHot(root,[52,1530,748,125],()=>{[buy,spreadInput].forEach(i=>i.blur());curPersist();calcBtn.classList.add('r67-k4-calculated');setTimeout(()=>{render();toast('✓ OPŁACALNOŚĆ PRZELICZONA')},120);},'Przelicz opłacalność');
    calcBtn.classList.add('r67-k4-calc');
    wmBottom(root,4);return page}
  function renderCurrency(){`
  );

  const r67Style = `<style id="r67-waluty-karta4-surgical-test">
.wm-page[data-card="4"]{position:relative!important;width:100%!important;min-height:100dvh!important;overflow:visible!important;background:#000!important;display:flex!important;align-items:flex-start!important;justify-content:flex-start!important;}
.wm-page[data-card="4"] .wm-canvas{position:relative!important;width:min(98vw,calc((100dvh - 12px) * 852 / 1846),852px)!important;max-width:852px!important;margin:6px auto!important;overflow:hidden!important;background:#000!important;}
.wm-page[data-card="4"] .wm-master{width:100%!important;height:auto!important;display:block!important;object-fit:fill!important;}
.wm-page[data-card="4"] .r67-k4-master-surface{position:absolute!important;z-index:1!important;inset:0!important;width:100%!important;height:100%!important;display:block!important;pointer-events:none!important;}
.wm-page[data-card="4"] .wm-edit,.wm-page[data-card="4"] .wm-dyn{z-index:24!important;background:transparent!important;border:0!important;box-shadow:none!important;border-radius:0!important;font-family:"Arial Narrow","Roboto Condensed",system-ui,sans-serif!important;font-variant-numeric:tabular-nums!important;}
.wm-page[data-card="4"] .wm-edit{padding:0!important;text-align:left!important;color:#fff!important;font-weight:900!important;}
.wm-page[data-card="4"] .wm-edit:focus{outline:0!important;box-shadow:none!important;}
.wm-page[data-card="4"] .r67-k4-buycurrency{justify-content:flex-start!important;color:#ffd34c!important;font-size:clamp(12px,3.25vw,25px)!important;line-height:1!important;white-space:nowrap!important;}
.wm-page[data-card="4"] .r67-k4-code{justify-content:flex-start!important;color:#ffd34c!important;}
.wm-page[data-card="4"] .r67-k4-cost,.wm-page[data-card="4"] .r67-k4-profit{justify-content:center!important;text-align:center!important;}
.wm-page[data-card="4"] .r67-k4-margin,.wm-page[data-card="4"] .r67-k4-status{justify-content:flex-start!important;text-align:left!important;}
.wm-page[data-card="4"] .wm-hot{z-index:36!important;background:transparent!important;box-shadow:none!important;touch-action:manipulation!important;}
.wm-page[data-card="4"] .wm-select{z-index:38!important;}
.wm-page[data-card="4"] .wm-live-ring,.wm-page[data-card="4"] .wm-live-spinner,.wm-page[data-card="4"] .wm-profit-recalc{display:none!important;visibility:hidden!important;opacity:0!important;animation:none!important;border:0!important;background:transparent!important;box-shadow:none!important;}
.wm-page[data-card="4"] .wm-hot::before,.wm-page[data-card="4"] .wm-hot::after{content:none!important;display:none!important;}
.wm-page[data-card="4"] .wm-hot.r67-k4-calc{box-sizing:border-box!important;border:0!important;border-radius:999px!important;}
.wm-page[data-card="4"] .wm-hot.r67-k4-calc.wm-pressed,.wm-page[data-card="4"] .wm-hot.r67-k4-calc.r67-k4-calculated{background:rgba(118,255,0,.018)!important;box-shadow:0 0 18px 5px rgba(118,255,0,.58),inset 0 0 12px rgba(118,255,0,.12)!important;transform:scale(.998)!important;}
</style>`;
  out = out.replace('</head>',r67Style+'\n</head>');
  return out;
};
