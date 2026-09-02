/* R72 — WALUTY KARTA 4 SINGLE SURFACE SURGICAL.
   BAZA: stabilny R70. KARTY 1, 2, 3 pozostają FINAL MASTER bez zmian.
   KARTA 4: jeden aktywny raster/canvas — bez dublowania wskazówki i bez wypalonych wartości.
   LIVE: dokładnie dwie zielone strzałki MASTER, obrót 2–3 s podczas synchronizacji. */
importScripts('./sw-r70-stable.js?v=R70-stable-0850');

const R72_K4_ASSETS=['./waluty-k4-r72-live-arrows.png'];
if(Array.isArray(ASSETS))R72_K4_ASSETS.forEach(a=>{if(!ASSETS.includes(a))ASSETS.push(a)});

const r72BasePatchIndexHtml=r48PatchIndexHtml;
r48PatchIndexHtml=function(text){
  let out=r72BasePatchIndexHtml(text);

  out=out.replaceAll('1.3.0-master-r70-waluty-karta4-png-master-restore','1.3.0-master-r72-waluty-karta4-single-surface-surgical');
  out=out.replaceAll('R70 WALUTY KARTA 4 PNG MASTER RESTORE','R72 WALUTY KARTA 4 SINGLE SURFACE SURGICAL');
  out=out.replace("const BUILD_TIME = '08:50';","const BUILD_TIME = '10:20';");
  out=out.replace("navigator.serviceWorker.register('./sw.js?v=R70-waluty-karta4-png-master-restore-0850'","navigator.serviceWorker.register('./sw.js?v=R72-waluty-karta4-single-surface-1020'");

  const k4=String.raw`  function renderCurrency4(){const {page,root}=wmBase(4);
    wmHot(root,[30,25,145,155],()=>currencyGo(3),'Powrót');
    const liveBtn=wmHot(root,[660,25,170,165],()=>currencyRefresh(true),'LIVE — synchronizuj kursy');
    liveBtn.classList.add('r72-k4-live-hot');

    if(!localStorage.getItem('crm13_k4_r70_master_init')){
      currencyState.buyPrice=1240;currencyState.buyCurrency='PLN';
      currencyState.salePrice=2100;currencyState.saleCurrency='USD';
      currencyState.transport=110;currencyState.transportCurrency='CZK';
      currencyState.spreadPct=1.2;currencyState.profitCurrency='PLN';
      curPersist();localStorage.setItem('crm13_k4_r70_master_init','1');
    }
    if(!currencyState.profitCurrency)currencyState.profitCurrency='PLN';

    const v=curProfit(),good=v.profit>=0,outCur=currencyState.profitCurrency;
    const outCost=curConvert(v.cost,'PLN',outCur),outProfit=curConvert(v.profit,'PLN',outCur);

    const masterImg=root.querySelector('.wm-master');
    const mountK4Surface=()=>{
      if(!masterImg||!masterImg.naturalWidth||root.querySelector('.r72-k4-surface'))return;
      const W=852,H=1846;
      const surface=document.createElement('canvas');
      surface.className='r72-k4-surface';surface.width=W;surface.height=H;
      const ctx=surface.getContext('2d',{alpha:false});
      ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
      ctx.drawImage(masterImg,0,0,W,H);

      ctx.drawImage(masterImg,537,67,26,41,486,67,26,41);

      const blank=(x,y,w,h)=>{
        const g=ctx.createLinearGradient(x,y,x+w,y+h);
        g.addColorStop(0,'rgb(3,4,3)');g.addColorStop(.55,'rgb(2,3,2)');g.addColorStop(1,'rgb(1,2,1)');
        ctx.fillStyle=g;ctx.fillRect(x,y,w,h);
      };
      blank(404,399,112,58);
      blank(638,399,78,58);
      blank(404,503,307,60);
      blank(404,608,112,60);
      blank(638,608,78,60);
      blank(404,714,108,60);
      blank(638,714,78,60);
      blank(404,821,100,60);
      blank(443,946,178,67);
      blank(638,951,78,60);
      blank(443,1049,178,67);
      blank(638,1054,78,60);
      blank(88,1274,272,80);
      blank(87,1415,282,76);

      const liveG=ctx.createRadialGradient(748,99,2,748,99,35);
      liveG.addColorStop(0,'rgb(2,5,2)');liveG.addColorStop(1,'rgb(1,3,1)');
      ctx.fillStyle=liveG;ctx.beginPath();ctx.arc(748,99,35,0,Math.PI*2);ctx.fill();

      ctx.save();ctx.lineCap='round';ctx.strokeStyle='rgb(2,4,2)';ctx.lineWidth=27;
      ctx.beginPath();ctx.moveTo(611,1426);ctx.lineTo(719,1349);ctx.stroke();ctx.restore();

      const cx=592,cy=1440,marg=Math.max(-20,Math.min(20,Number(v.margin)||0));
      const ratio=(marg+20)/40,ang=(Math.PI*1.07)+(ratio*Math.PI*.86),len=137;
      const sx=cx+Math.cos(ang)*25,sy=cy+Math.sin(ang)*25,ex=cx+Math.cos(ang)*len,ey=cy+Math.sin(ang)*len;
      ctx.save();ctx.lineCap='round';ctx.shadowColor='rgba(255,255,255,.24)';ctx.shadowBlur=4;
      ctx.strokeStyle='#151515';ctx.lineWidth=12;ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(ex,ey);ctx.stroke();
      const ng=ctx.createLinearGradient(sx,sy,ex,ey);ng.addColorStop(0,'#777');ng.addColorStop(.55,'#eee9dc');ng.addColorStop(1,'#fff9e9');
      ctx.strokeStyle=ng;ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(ex,ey);ctx.stroke();ctx.restore();

      const base=document.createElement('canvas');base.width=W;base.height=H;
      const bctx=base.getContext('2d',{alpha:false});bctx.drawImage(surface,0,0);

      masterImg.style.visibility='hidden';root.insertBefore(surface,masterImg.nextSibling);

      const arrows=new Image();
      arrows.onload=()=>{
        const drawStatic=()=>ctx.drawImage(arrows,708,59,80,80);
        if(!currencyState.loading){drawStatic();return;}
        const started=performance.now();
        const spin=now=>{
          if(!surface.isConnected||!currencyState.loading)return;
          ctx.drawImage(base,0,0);
          const a=((now-started)/820)*Math.PI*2;
          ctx.save();ctx.translate(748,99);ctx.rotate(a);ctx.drawImage(arrows,-40,-40,80,80);ctx.restore();
          requestAnimationFrame(spin);
        };
        requestAnimationFrame(spin);
      };
      arrows.src='waluty-k4-r72-live-arrows.png?v=R72-single-surface';
    };
    if(masterImg.complete&&masterImg.naturalWidth)mountK4Surface();
    else masterImg.addEventListener('load',mountK4Surface,{once:true});

    const buy=wmEdit(root,[399,390,214,77],currencyState.buyPrice,n=>currencyState.buyPrice=n,'r72-k4-edit r72-k4-input');
    wmSelect(root,[625,388,143,80],currencyState.buyCurrency,c=>currencyState.buyCurrency=c);
    wmDyn(root,[642,399,76,58],currencyState.buyCurrency,'gold r72-k4-code');
    wmSelect(root,[390,493,378,78],currencyState.buyCurrency,c=>currencyState.buyCurrency=c);
    wmDyn(root,[405,503,306,58],CURRENCY_FLAGS[currencyState.buyCurrency]+' '+currencyState.buyCurrency+' — '+CURRENCY_NAMES[currencyState.buyCurrency],'gold r72-k4-buycurrency');

    const sale=wmEdit(root,[399,597,214,78],currencyState.salePrice,n=>currencyState.salePrice=n,'r72-k4-edit r72-k4-input');
    wmSelect(root,[625,597,143,80],currencyState.saleCurrency,c=>currencyState.saleCurrency=c);
    wmDyn(root,[642,608,76,58],currencyState.saleCurrency,'gold r72-k4-code');

    const transport=wmEdit(root,[399,703,214,78],currencyState.transport,n=>currencyState.transport=n,'r72-k4-edit r72-k4-input');
    wmSelect(root,[625,703,143,80],currencyState.transportCurrency,c=>currencyState.transportCurrency=c);
    wmDyn(root,[642,714,76,58],currencyState.transportCurrency,'gold r72-k4-code');

    const spread=wmEdit(root,[399,809,214,78],currencyState.spreadPct,n=>currencyState.spreadPct=n,'r72-k4-edit r72-k4-input');
    wmHot(root,[625,809,143,80],()=>{spread.focus();spread.select();toast('SPREAD / PROWIZJA — wpisz wartość w %')},'Spread / prowizja');

    wmSelect(root,[625,941,143,79],outCur,c=>{currencyState.profitCurrency=c;render()});
    wmDyn(root,[642,952,76,58],outCur,'gold r72-k4-code');
    wmSelect(root,[625,1044,143,79],outCur,c=>{currencyState.profitCurrency=c;render()});
    wmDyn(root,[642,1055,76,58],outCur,'gold r72-k4-code');

    wmDyn(root,[443,947,180,65],curFmt(outCost,2),'gold r72-k4-cost');
    wmDyn(root,[443,1050,180,65],curFmt(outProfit,2),good?'green r72-k4-profit':'red r72-k4-profit');
    wmDyn(root,[92,1275,270,80],curFmt(v.margin,2)+'%',good?'green r72-k4-margin':'red r72-k4-margin');
    wmDyn(root,[91,1415,285,76],good?'OPŁACALNE':'NIEOPŁACALNE',good?'green r72-k4-status':'red r72-k4-status');

    const calcBtn=wmHot(root,[53,1534,746,128],()=>{
      [buy,sale,transport,spread].forEach(i=>i.blur());curPersist();
      calcBtn.classList.remove('r72-k4-calculated');void calcBtn.offsetWidth;calcBtn.classList.add('r72-k4-calculated');
      setTimeout(()=>{calcBtn.classList.remove('r72-k4-calculated');render();toast('✓ OPŁACALNOŚĆ PRZELICZONA')},520);
    },'Przelicz opłacalność');
    calcBtn.classList.add('r72-k4-calc');
    wmBottom(root,4);return page}
  function renderCurrency(){`;

  out=out.replace(/  function renderCurrency4\(\)\{[\s\S]*?\n  function renderCurrency\(\)\{/,k4);

  const r72Style=String.raw`<style id="r72-waluty-karta4-single-surface">
.wm-page[data-card="4"]{position:relative!important;width:100%!important;min-height:100dvh!important;overflow:visible!important;background:#000!important;display:flex!important;align-items:flex-start!important;justify-content:flex-start!important}
.wm-page[data-card="4"] .wm-canvas{position:relative!important;width:min(98vw,calc((100dvh - 12px) * 852 / 1846),852px)!important;max-width:852px!important;margin:6px auto!important;overflow:hidden!important;background:#000!important}
.wm-page[data-card="4"] .wm-master{width:100%!important;height:auto!important;display:block!important;object-fit:fill!important}
.wm-page[data-card="4"] .r72-k4-surface{position:absolute!important;z-index:1!important;inset:0!important;width:100%!important;height:100%!important;display:block!important;pointer-events:none!important}
.wm-page[data-card="4"] .wm-edit,.wm-page[data-card="4"] .wm-dyn{z-index:24!important;background:transparent!important;border:0!important;box-shadow:none!important;border-radius:0!important;font-family:"Arial Narrow","Roboto Condensed",Arial,sans-serif!important;font-variant-numeric:tabular-nums!important}
.wm-page[data-card="4"] .wm-edit{padding:0!important;text-align:left!important;color:#fff!important;font-weight:900!important;font-size:clamp(20px,5.5vw,43px)!important;line-height:1!important}
.wm-page[data-card="4"] .wm-edit:focus{outline:0!important;box-shadow:none!important}
.wm-page[data-card="4"] .r72-k4-code{justify-content:flex-start!important;color:#ffd34c!important;font-size:clamp(17px,4.45vw,34px)!important;font-weight:900!important;line-height:1!important}
.wm-page[data-card="4"] .r72-k4-buycurrency{justify-content:flex-start!important;color:#ffd34c!important;font-size:clamp(12px,3.05vw,25px)!important;font-weight:850!important;line-height:1!important;white-space:nowrap!important}
.wm-page[data-card="4"] .r72-k4-cost,.wm-page[data-card="4"] .r72-k4-profit{justify-content:center!important;text-align:center!important;font-size:clamp(18px,4.8vw,38px)!important;font-weight:950!important;line-height:1!important}
.wm-page[data-card="4"] .r72-k4-margin{justify-content:flex-start!important;text-align:left!important;font-size:clamp(26px,7.2vw,58px)!important;font-weight:950!important;line-height:1!important}
.wm-page[data-card="4"] .r72-k4-status{justify-content:flex-start!important;text-align:left!important;font-size:clamp(17px,4.6vw,36px)!important;font-weight:950!important;line-height:1!important}
.wm-page[data-card="4"] .green{color:#76ff00!important;text-shadow:0 0 10px rgba(118,255,0,.42)!important}.wm-page[data-card="4"] .red{color:#ff4239!important;text-shadow:0 0 9px rgba(255,42,30,.35)!important}.wm-page[data-card="4"] .gold{color:#ffd34c!important}
.wm-page[data-card="4"] .wm-hot{z-index:36!important;background:transparent!important;box-shadow:none!important;touch-action:manipulation!important}.wm-page[data-card="4"] .wm-select{z-index:38!important}
.wm-page[data-card="4"] .wm-live-ring,.wm-page[data-card="4"] .wm-live-spinner,.wm-page[data-card="4"] .wm-profit-recalc{display:none!important;visibility:hidden!important;opacity:0!important;animation:none!important;border:0!important;background:transparent!important;box-shadow:none!important}
.wm-page[data-card="4"] .wm-hot::before,.wm-page[data-card="4"] .wm-hot::after{content:none!important;display:none!important}
.wm-page[data-card="4"] .r72-k4-calc{border:0!important;border-radius:999px!important}
.wm-page[data-card="4"] .r72-k4-calc.wm-pressed,.wm-page[data-card="4"] .r72-k4-calc.r72-k4-calculated{background:rgba(118,255,0,.012)!important;box-shadow:0 0 17px 4px rgba(118,255,0,.62),inset 0 0 11px rgba(118,255,0,.12)!important;transform:scale(.998)!important}
</style>`;
  out=out.replace('</head>',r72Style+'\n</head>');
  return out;
};
