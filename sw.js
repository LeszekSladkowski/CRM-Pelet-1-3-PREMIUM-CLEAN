/* R67 HOTFIX — naprawa instalacji KARTY 4 bez naruszania MASTERÓW K1-K3.
   Bazą jest dokładny, działający R66 zapisany jako osobny snapshot blob.
   Ten plik zawiera wyłącznie bezpieczny patch K4; bez zagnieżdżonych template-literal powodujących błąd parsowania Service Workera. */
importScripts('./sw-r66-stable.js?v=R66-final-surgical-stable');

const r67BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r67BasePatchIndexHtml(text);

  out = out.replaceAll('1.3.0-master-r66-waluty-karta3-final-surgical','1.3.0-master-r68-waluty-karta4-final-surgical-candidate');
  out = out.replaceAll('R66 WALUTY KARTA 3 FINAL SURGICAL','R68 WALUTY KARTA 4 FINAL SURGICAL CANDIDATE');
  out = out.replace("const BUILD_TIME = '16:28';","const BUILD_TIME = '18:03';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R66-waluty-karta3-final-surgical-1628'","navigator.serviceWorker.register('./sw.js?v=R68-waluty-karta4-final-surgical-1803'");

  const k4 = String.raw`  function renderCurrency4(){const {page,root}=wmBase(4);
    wmHot(root,[28,20,155,180],()=>currencyGo(3),'Powrót');
    const liveBtn=wmHot(root,[650,20,190,205],()=>currencyRefresh(true),'LIVE — synchronizuj kursy');
    liveBtn.classList.add('r67-k4-live-hot');

    const v=curProfit(),good=v.profit>=0;
    const masterImg=root.querySelector('.wm-master');
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

      /* Wyczyść wyłącznie wypalone dane i starą flagę, bez widocznych warstw HTML. */
      darkBox(400,380,230,82);darkBox(630,370,160,95);darkBox(395,470,398,92);
      darkBox(400,570,230,82);darkBox(630,565,160,95);
      darkBox(400,666,230,82);darkBox(630,662,160,95);darkBox(392,752,246,112);
      darkBox(420,882,232,112);darkBox(420,982,232,112);darkBox(58,1190,325,300);
      ctx.strokeStyle='rgba(214,166,40,.82)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(110,1366);ctx.lineTo(330,1366);ctx.stroke();

      /* Popraw numerację nagłówka 1/4 -> 4/4 bez przebudowy grafiki. */
      darkBox(185,54,486,142);
      ctx.save();ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#f0c457';ctx.shadowColor='rgba(255,194,55,.35)';ctx.shadowBlur=4;ctx.font='700 42px Arial';ctx.fillText('WALUTY 4/4',428,94);ctx.font='700 31px Arial';ctx.fillText('PREMIUM',428,151);ctx.shadowBlur=0;ctx.strokeStyle='rgba(224,176,55,.88)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(260,151);ctx.lineTo(335,151);ctx.moveTo(521,151);ctx.lineTo(596,151);ctx.stroke();ctx.restore();

      /* Usuń stałą pseudo-poświatę LIVE poza właściwą ikoną i napisem. */
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

      /* Dynamiczna wskazówka OPŁACALNOŚĆ; wartości poza skalą zatrzymują się na skraju. */
      const cx=607,cy=1480;
      ctx.save();ctx.strokeStyle='#020302';ctx.lineWidth=40;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(746,1352);ctx.stroke();ctx.restore();
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

      /* LIVE: obracają się tylko istniejące zielone strzałki, bez spinnera/nakładki. */
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
    wmDyn(root,[420,484,355,66],CURRENCY_FLAGS[currencyState.buyCurrency]+' '+currencyState.buyCurrency+' — '+CURRENCY_NAMES[currencyState.buyCurrency],'gold small r67-k4-buycurrency');
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
  function renderCurrency(){`;

  out = out.replace(/  function renderCurrency4\(\)\{[\s\S]*?\n  function renderCurrency\(\)\{/, k4);

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
