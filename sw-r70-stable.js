/* R70 — WALUTY KARTA 4 PNG MASTER RESTORE.
   KARTY 1, 2, 3: FINAL MASTER — BEZWZGLEDNIE BEZ ZMIAN.
   KARTA 4: zatwierdzony raster master-waluty-karta4.png 852x1846 1:1.
   Naprawa: powrot z wadliwego odwolania do WEBP do pewnego PNG MASTER.
   Funkcje LIVE / PRZELICZ / selektory / obliczenia pozostaja aktywne. */
importScripts('./sw-r66-stable.js?v=R66-final-surgical-stable');

const R70_K4_ASSETS=['./master-waluty-karta4.png'];
if(Array.isArray(ASSETS))R70_K4_ASSETS.forEach(a=>{if(!ASSETS.includes(a))ASSETS.push(a)});

const r70BasePatchIndexHtml=r48PatchIndexHtml;
r48PatchIndexHtml=function(text){
  let out=r70BasePatchIndexHtml(text);

  out=out.replaceAll('1.3.0-master-r66-waluty-karta3-final-surgical','1.3.0-master-r70-waluty-karta4-png-master-restore');
  out=out.replaceAll('R66 WALUTY KARTA 3 FINAL SURGICAL','R70 WALUTY KARTA 4 PNG MASTER RESTORE');
  out=out.replace("const BUILD_DATE = '01.09.2026';","const BUILD_DATE = '02.09.2026';");
  out=out.replace("const BUILD_TIME = '16:28';","const BUILD_TIME = '08:50';");
  out=out.replace("navigator.serviceWorker.register('./sw.js?v=R66-waluty-karta3-final-surgical-1628'","navigator.serviceWorker.register('./sw.js?v=R70-waluty-karta4-png-master-restore-0850'");

  const k4=String.raw`  function renderCurrency4(){const {page,root}=wmBase(4);
    wmHot(root,[30,25,145,155],()=>currencyGo(3),'Powrót');
    const liveBtn=wmHot(root,[660,25,170,165],()=>currencyRefresh(true),'LIVE — synchronizuj kursy');
    liveBtn.classList.add('r70-k4-live-hot');

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
      if(!masterImg||!masterImg.naturalWidth||root.querySelector('.r70-k4-surface'))return;
      const W=852,H=1846;
      const surface=document.createElement('canvas');
      surface.className='r70-k4-surface';surface.width=W;surface.height=H;
      const ctx=surface.getContext('2d',{alpha:false});
      ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
      ctx.drawImage(masterImg,0,0,W,H);

      const heal=(x,y,w,h,kind='all',dilate=2)=>{
        const im=ctx.getImageData(x,y,w,h),src=new Uint8ClampedArray(im.data),d=im.data,n=w*h,m=new Uint8Array(n);
        const hit=(r,g,b)=>{
          const mx=Math.max(r,g,b),mn=Math.min(r,g,b);
          if(kind==='white')return mx>72&&mx-mn<82;
          if(kind==='gold')return (r>62&&g>38&&r>g*1.02&&g>b*1.05);
          if(kind==='green')return g>30&&g>r*1.12&&g>b*1.08;
          if(kind==='red')return r>45&&r>g*1.12&&r>b*1.05;
          return mx>58&&((mx-mn)>9||mx>92);
        };
        for(let py=0;py<h;py++)for(let px=0;px<w;px++){const p=py*w+px,i=p*4;if(hit(src[i],src[i+1],src[i+2]))m[p]=1}
        if(dilate>0){const z=new Uint8Array(m);for(let py=0;py<h;py++)for(let px=0;px<w;px++)if(m[py*w+px])for(let yy=Math.max(0,py-dilate);yy<=Math.min(h-1,py+dilate);yy++)for(let xx=Math.max(0,px-dilate);xx<=Math.min(w-1,px+dilate);xx++)z[yy*w+xx]=1;m.set(z)}
        const pick=(px,py)=>{for(let rr=1;rr<=16;rr++){const cand=[[px-rr,py],[px+rr,py],[px,py-rr],[px,py+rr],[px-rr,py-rr],[px+rr,py+rr],[px-rr,py+rr],[px+rr,py-rr]];for(const q of cand){const qx=q[0],qy=q[1];if(qx>=0&&qx<w&&qy>=0&&qy<h&&!m[qy*w+qx])return (qy*w+qx)*4}}return -1};
        for(let py=0;py<h;py++)for(let px=0;px<w;px++){const p=py*w+px;if(!m[p])continue;const j=pick(px,py),i=p*4;if(j>=0){d[i]=src[j];d[i+1]=src[j+1];d[i+2]=src[j+2];d[i+3]=255}}
        ctx.putImageData(im,x,y);
      };

      heal(402,398,122,62,'white',2);
      heal(638,398,108,62,'gold',2);
      heal(402,503,348,62,'all',2);
      heal(402,608,122,62,'white',2);
      heal(638,608,108,62,'gold',2);
      heal(402,714,105,62,'white',2);
      heal(638,714,108,62,'gold',2);
      heal(402,821,100,62,'white',2);
      heal(444,945,175,67,'gold',3);
      heal(444,1048,175,67,'green',3);
      heal(88,1274,270,78,'green',3);
      heal(87,1415,280,74,'green',3);

      const gx=600,gy=1332,gw=132,gh=125,im=ctx.getImageData(gx,gy,gw,gh),src=new Uint8ClampedArray(im.data),d=im.data,m=new Uint8Array(gw*gh);
      const ax=592-gx,ay=1440-gy,bx=715-gx,by=1352-gy;
      const segDist=(px,py)=>{const vx=bx-ax,vy=by-ay,wx=px-ax,wy=py-ay,c1=vx*wx+vy*wy,c2=vx*vx+vy*vy,t=Math.max(0,Math.min(1,c1/c2)),dx=px-(ax+t*vx),dy=py-(ay+t*vy);return Math.hypot(dx,dy)};
      for(let py=0;py<gh;py++)for(let px=0;px<gw;px++){const i=(py*gw+px)*4,r=src[i],g=src[i+1],b=src[i+2],mx=Math.max(r,g,b),mn=Math.min(r,g,b),hub=Math.hypot(px-ax,py-ay)<31;if(!hub&&segDist(px,py)<12&&mx>47&&mx-mn<100)m[py*gw+px]=1}
      const mm=new Uint8Array(m);for(let py=0;py<gh;py++)for(let px=0;px<gw;px++)if(m[py*gw+px])for(let yy=Math.max(0,py-3);yy<=Math.min(gh-1,py+3);yy++)for(let xx=Math.max(0,px-3);xx<=Math.min(gw-1,px+3);xx++)if(Math.hypot(xx-ax,yy-ay)>=31)mm[yy*gw+xx]=1;m.set(mm);
      const pickNeedle=(px,py)=>{for(let rr=1;rr<=18;rr++){for(const q of [[px,py+rr],[px-rr,py],[px+rr,py],[px,py-rr]]){const qx=q[0],qy=q[1];if(qx>=0&&qx<gw&&qy>=0&&qy<gh&&!m[qy*gw+qx])return (qy*gw+qx)*4}}return -1};
      for(let py=0;py<gh;py++)for(let px=0;px<gw;px++){const p=py*gw+px;if(!m[p])continue;const j=pickNeedle(px,py),i=p*4;if(j>=0){d[i]=src[j];d[i+1]=src[j+1];d[i+2]=src[j+2];d[i+3]=255}}ctx.putImageData(im,gx,gy);

      const cx=592,cy=1440,marg=Math.max(-20,Math.min(20,Number(v.margin)||0)),ratio=(marg+20)/40;
      const ang=(Math.PI*1.07)+(ratio*Math.PI*.86),len=137,ex=cx+Math.cos(ang)*len,ey=cy+Math.sin(ang)*len;
      ctx.save();ctx.lineCap='round';ctx.shadowColor='rgba(255,255,255,.28)';ctx.shadowBlur=4;
      ctx.strokeStyle='#151515';ctx.lineWidth=12;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(ex,ey);ctx.stroke();
      const ng=ctx.createLinearGradient(cx,cy,ex,ey);ng.addColorStop(0,'#777');ng.addColorStop(.55,'#eee9dc');ng.addColorStop(1,'#fff9e9');
      ctx.strokeStyle=ng;ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(ex,ey);ctx.stroke();ctx.shadowBlur=0;
      ctx.fillStyle='#101010';ctx.strokeStyle='#b7a879';ctx.lineWidth=3;ctx.beginPath();ctx.arc(cx,cy,23,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle='#050505';ctx.beginPath();ctx.arc(cx,cy,11,0,Math.PI*2);ctx.fill();ctx.restore();

      const liveBase=document.createElement('canvas');liveBase.width=W;liveBase.height=H;
      const lctx=liveBase.getContext('2d',{alpha:false});lctx.drawImage(surface,0,0);
      const sx=716,sy=64,sw=66,sh=70,acx=748,acy=99,crop=lctx.getImageData(sx,sy,sw,sh);
      const sprite=document.createElement('canvas');sprite.width=sw;sprite.height=sh;const sctx=sprite.getContext('2d'),spr=sctx.createImageData(sw,sh),cd=crop.data;
      for(let yy=0;yy<sh;yy++)for(let xx=0;xx<sw;xx++){const i=(yy*sw+xx)*4,gx=sx+xx,gy=sy+yy,r=cd[i],g=cd[i+1],b=cd[i+2],a=cd[i+3],green=g>55&&g>r*1.25&&g>b*1.15,inner=Math.hypot(gx-acx,gy-acy)<39;if(green&&inner){spr.data[i]=r;spr.data[i+1]=g;spr.data[i+2]=b;spr.data[i+3]=a;let repl=i;for(let rr=1;rr<=10;rr++){const nx=Math.max(0,Math.min(sw-1,xx-rr)),j=(yy*sw+nx)*4;if(!(cd[j+1]>55&&cd[j+1]>cd[j]*1.25&&cd[j+1]>cd[j+2]*1.15)){repl=j;break}}cd[i]=cd[repl];cd[i+1]=cd[repl+1];cd[i+2]=cd[repl+2];cd[i+3]=255}}
      lctx.putImageData(crop,sx,sy);sctx.putImageData(spr,0,0);ctx.drawImage(liveBase,0,0);

      masterImg.style.visibility='hidden';root.insertBefore(surface,masterImg.nextSibling);
      if(currencyState.loading){const started=performance.now();const spin=now=>{if(!surface.isConnected||!currencyState.loading)return;ctx.drawImage(liveBase,0,0);const a=((now-started)/820)*Math.PI*2;ctx.save();ctx.translate(acx,acy);ctx.rotate(a);ctx.drawImage(sprite,-(acx-sx),-(acy-sy));ctx.restore();requestAnimationFrame(spin)};requestAnimationFrame(spin)}
    };
    if(masterImg.complete&&masterImg.naturalWidth)mountK4Surface();else masterImg.addEventListener('load',mountK4Surface,{once:true});

    const buy=wmEdit(root,[399,390,214,77],currencyState.buyPrice,n=>currencyState.buyPrice=n,'r70-k4-edit r70-k4-input');
    wmSelect(root,[625,388,143,80],currencyState.buyCurrency,c=>currencyState.buyCurrency=c);wmDyn(root,[642,399,108,58],currencyState.buyCurrency,'gold r70-k4-code');
    wmSelect(root,[390,493,378,78],currencyState.buyCurrency,c=>currencyState.buyCurrency=c);wmDyn(root,[405,503,342,58],CURRENCY_FLAGS[currencyState.buyCurrency]+' '+currencyState.buyCurrency+' — '+CURRENCY_NAMES[currencyState.buyCurrency],'gold r70-k4-buycurrency');
    const sale=wmEdit(root,[399,597,214,78],currencyState.salePrice,n=>currencyState.salePrice=n,'r70-k4-edit r70-k4-input');
    wmSelect(root,[625,597,143,80],currencyState.saleCurrency,c=>currencyState.saleCurrency=c);wmDyn(root,[642,608,108,58],currencyState.saleCurrency,'gold r70-k4-code');
    const transport=wmEdit(root,[399,703,214,78],currencyState.transport,n=>currencyState.transport=n,'r70-k4-edit r70-k4-input');
    wmSelect(root,[625,703,143,80],currencyState.transportCurrency,c=>currencyState.transportCurrency=c);wmDyn(root,[642,714,108,58],currencyState.transportCurrency,'gold r70-k4-code');
    const spread=wmEdit(root,[399,809,214,78],currencyState.spreadPct,n=>currencyState.spreadPct=n,'r70-k4-edit r70-k4-input');
    wmHot(root,[625,809,143,80],()=>{spread.focus();spread.select();toast('SPREAD / PROWIZJA — wpisz wartość w %')},'Spread / prowizja');

    wmSelect(root,[625,941,143,79],outCur,c=>{currencyState.profitCurrency=c;render()});wmDyn(root,[642,952,108,58],outCur,'gold r70-k4-code');
    wmSelect(root,[625,1044,143,79],outCur,c=>{currencyState.profitCurrency=c;render()});wmDyn(root,[642,1055,108,58],outCur,'gold r70-k4-code');
    wmDyn(root,[443,947,180,65],curFmt(outCost,2),'gold r70-k4-cost');wmDyn(root,[443,1050,180,65],curFmt(outProfit,2),good?'green r70-k4-profit':'red r70-k4-profit');
    wmDyn(root,[92,1275,270,80],curFmt(v.margin,2)+'%',good?'green r70-k4-margin':'red r70-k4-margin');wmDyn(root,[91,1415,285,76],good?'OPŁACALNE':'NIEOPŁACALNE',good?'green r70-k4-status':'red r70-k4-status');

    const calcBtn=wmHot(root,[53,1534,746,128],()=>{[buy,sale,transport,spread].forEach(i=>i.blur());curPersist();calcBtn.classList.remove('r70-k4-calculated');void calcBtn.offsetWidth;calcBtn.classList.add('r70-k4-calculated');setTimeout(()=>{calcBtn.classList.remove('r70-k4-calculated');render();toast('✓ OPŁACALNOŚĆ PRZELICZONA')},520)},'Przelicz opłacalność');
    calcBtn.classList.add('r70-k4-calc');wmBottom(root,4);return page}
  function renderCurrency(){`;

  out=out.replace(/  function renderCurrency4\(\)\{[\s\S]*?\n  function renderCurrency\(\)\{/,k4);

  const r70Style=String.raw`<style id="r70-waluty-karta4-png-master-restore">
.wm-page[data-card="4"]{position:relative!important;width:100%!important;min-height:100dvh!important;overflow:visible!important;background:#000!important;display:flex!important;align-items:flex-start!important;justify-content:flex-start!important}
.wm-page[data-card="4"] .wm-canvas{position:relative!important;width:min(98vw,calc((100dvh - 12px) * 852 / 1846),852px)!important;max-width:852px!important;margin:6px auto!important;overflow:hidden!important;background:#000!important}
.wm-page[data-card="4"] .wm-master{width:100%!important;height:auto!important;display:block!important;object-fit:fill!important}
.wm-page[data-card="4"] .r70-k4-surface{position:absolute!important;z-index:1!important;inset:0!important;width:100%!important;height:100%!important;display:block!important;pointer-events:none!important}
.wm-page[data-card="4"] .wm-edit,.wm-page[data-card="4"] .wm-dyn{z-index:24!important;background:transparent!important;border:0!important;box-shadow:none!important;border-radius:0!important;font-family:"Arial Narrow","Roboto Condensed",Arial,sans-serif!important;font-variant-numeric:tabular-nums!important}
.wm-page[data-card="4"] .wm-edit{padding:0!important;text-align:left!important;color:#fff!important;font-weight:900!important;font-size:clamp(20px,5.5vw,43px)!important;line-height:1!important}.wm-page[data-card="4"] .wm-edit:focus{outline:0!important;box-shadow:none!important}
.wm-page[data-card="4"] .r70-k4-code{justify-content:flex-start!important;color:#ffd34c!important;font-size:clamp(17px,4.5vw,34px)!important;font-weight:900!important;line-height:1!important}.wm-page[data-card="4"] .r70-k4-buycurrency{justify-content:flex-start!important;color:#ffd34c!important;font-size:clamp(12px,3.25vw,26px)!important;font-weight:850!important;line-height:1!important;white-space:nowrap!important}
.wm-page[data-card="4"] .r70-k4-cost,.wm-page[data-card="4"] .r70-k4-profit{justify-content:center!important;text-align:center!important;font-size:clamp(18px,4.8vw,38px)!important;font-weight:950!important;line-height:1!important}.wm-page[data-card="4"] .r70-k4-margin{justify-content:flex-start!important;text-align:left!important;font-size:clamp(26px,7.2vw,58px)!important;font-weight:950!important;line-height:1!important}.wm-page[data-card="4"] .r70-k4-status{justify-content:flex-start!important;text-align:left!important;font-size:clamp(17px,4.6vw,36px)!important;font-weight:950!important;line-height:1!important}
.wm-page[data-card="4"] .green{color:#76ff00!important;text-shadow:0 0 10px rgba(118,255,0,.42)!important}.wm-page[data-card="4"] .red{color:#ff4239!important;text-shadow:0 0 9px rgba(255,42,30,.35)!important}.wm-page[data-card="4"] .gold{color:#ffd34c!important}
.wm-page[data-card="4"] .wm-hot{z-index:36!important;background:transparent!important;box-shadow:none!important;touch-action:manipulation!important}.wm-page[data-card="4"] .wm-select{z-index:38!important}
.wm-page[data-card="4"] .wm-live-ring,.wm-page[data-card="4"] .wm-live-spinner,.wm-page[data-card="4"] .wm-profit-recalc{display:none!important;visibility:hidden!important;opacity:0!important;animation:none!important;border:0!important;background:transparent!important;box-shadow:none!important}.wm-page[data-card="4"] .wm-hot::before,.wm-page[data-card="4"] .wm-hot::after{content:none!important;display:none!important}
.wm-page[data-card="4"] .r70-k4-calc{border:0!important;border-radius:999px!important}.wm-page[data-card="4"] .r70-k4-calc.wm-pressed,.wm-page[data-card="4"] .r70-k4-calc.r70-k4-calculated{background:rgba(118,255,0,.012)!important;box-shadow:0 0 17px 4px rgba(118,255,0,.62),inset 0 0 11px rgba(118,255,0,.12)!important;transform:scale(.998)!important}
</style>`;
  out=out.replace('</head>',r70Style+'\n</head>');
  return out;
};