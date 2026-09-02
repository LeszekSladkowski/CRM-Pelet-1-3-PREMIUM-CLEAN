/* R71 — KARTA 4 FINAL SURGICAL PATCH ON TOP OF R70.
   R70 pozostaje zachowany jako sw-r70-stable.js.
   KARTY 1-3: BEZWZGLEDNIE BEZ ZMIAN.
   K4: approved raster 4/4, zero duchow, jedna wskazowka, czysty LIVE. */
importScripts('./sw-r70-stable.js?v=R70-stable-preserved');

const R71_APPROVED='./master-waluty-karta4-r71-approved.webp';
if(Array.isArray(ASSETS)&&!ASSETS.includes(R71_APPROVED))ASSETS.push(R71_APPROVED);

const r71BasePatchIndexHtml=r48PatchIndexHtml;
r48PatchIndexHtml=function(text){
  let out=r71BasePatchIndexHtml(text);

  out=out.replaceAll('1.3.0-master-r70-waluty-karta4-png-master-restore','1.3.0-master-r71-waluty-karta4-final-surgical-live');
  out=out.replaceAll('R70 WALUTY KARTA 4 PNG MASTER RESTORE','R71 WALUTY KARTA 4 FINAL SURGICAL LIVE');
  out=out.replace("const BUILD_TIME = '08:50';","const BUILD_TIME = '09:17';");
  out=out.replace("navigator.serviceWorker.register('./sw.js?v=R70-waluty-karta4-png-master-restore-0850'","navigator.serviceWorker.register('./sw.js?v=R71-waluty-karta4-final-surgical-live-0917'");

  out=out.replace(
    "img.src=card===3?'master-waluty-karta3-r64-clean.webp?v=R66-final-1628':`master-waluty-karta${card}.png?v=R43-LIVE-HARD-FIX`;",
    "img.src=card===3?'master-waluty-karta3-r64-clean.webp?v=R66-final-1628':card===4?'master-waluty-karta4-r71-approved.webp?v=R71-approved-0917':`master-waluty-karta${card}.png?v=R43-LIVE-HARD-FIX`;"
  );

  const surgical=String.raw`    const masterImg=root.querySelector('.wm-master');
    if(masterImg){
      masterImg.alt='WALUTY 4/4 — PREMIUM';
      const wanted='master-waluty-karta4-r71-approved.webp?v=R71-approved-0917';
      if(!String(masterImg.getAttribute('src')||'').includes('master-waluty-karta4-r71-approved.webp'))masterImg.src=wanted;
    }

    const mountK4Surface=()=>{
      if(!masterImg||!masterImg.naturalWidth||root.querySelector('.r70-k4-surface'))return;
      const W=852,H=1846;
      const surface=document.createElement('canvas');
      surface.className='r70-k4-surface';surface.width=W;surface.height=H;
      const ctx=surface.getContext('2d',{alpha:false});
      ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';

      const cleanRect=(x,y,w,h)=>{
        const g=ctx.createLinearGradient(x,y,x,y+h);
        g.addColorStop(0,'#070907');g.addColorStop(.48,'#020302');g.addColorStop(1,'#050605');
        ctx.fillStyle=g;ctx.fillRect(x,y,w,h);
      };
      const cleanDynamic=()=>{
        cleanRect(413,402,184,53);
        cleanRect(646,401,82,52);
        cleanRect(408,505,319,53);
        cleanRect(413,610,184,53);
        cleanRect(646,610,82,52);
        cleanRect(413,716,184,53);
        cleanRect(646,716,82,52);
        cleanRect(413,822,184,53);
        cleanRect(458,949,157,56);
        cleanRect(646,951,82,52);
        cleanRect(458,1052,157,56);
        cleanRect(646,1054,82,52);
        cleanRect(100,1280,255,68);
        cleanRect(100,1419,255,65);
      };

      const eraseStaticNeedle=()=>{
        const cx=606,cy=1458,ex=735,ey=1377;
        const bg=ctx.createRadialGradient(cx,cy,18,cx,cy,170);
        bg.addColorStop(0,'#070807');bg.addColorStop(.55,'#030504');bg.addColorStop(1,'#050705');
        ctx.save();ctx.lineCap='round';ctx.strokeStyle=bg;ctx.lineWidth=26;
        ctx.beginPath();ctx.moveTo(cx+18,cy-12);ctx.lineTo(ex,ey);ctx.stroke();ctx.restore();
      };

      const drawNeedle=()=>{
        const v=curProfit(),m=Math.max(-20,Math.min(20,Number(v.margin)||0)),ratio=(m+20)/40;
        const cx=606,cy=1458,ang=(190+ratio*160)*Math.PI/180,len=146;
        const ex=cx+Math.cos(ang)*len,ey=cy+Math.sin(ang)*len;
        ctx.save();ctx.lineCap='round';ctx.shadowColor='rgba(255,255,255,.30)';ctx.shadowBlur=4;
        ctx.strokeStyle='#111';ctx.lineWidth=12;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(ex,ey);ctx.stroke();
        const ng=ctx.createLinearGradient(cx,cy,ex,ey);
        ng.addColorStop(0,'#7b7b75');ng.addColorStop(.58,'#eee9da');ng.addColorStop(1,'#fffdf2');
        ctx.strokeStyle=ng;ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(ex,ey);ctx.stroke();
        ctx.shadowBlur=0;ctx.fillStyle='#090a09';ctx.strokeStyle='#b5a873';ctx.lineWidth=3;
        ctx.beginPath();ctx.arc(cx,cy,22,0,Math.PI*2);ctx.fill();ctx.stroke();
        ctx.fillStyle='#020302';ctx.beginPath();ctx.arc(cx,cy,10,0,Math.PI*2);ctx.fill();ctx.restore();
      };

      const eraseLiveArrows=()=>{
        const cx=745,cy=93;
        ctx.save();ctx.beginPath();ctx.arc(cx,cy,30,0,Math.PI*2);ctx.clip();
        const g=ctx.createRadialGradient(cx,cy,2,cx,cy,30);
        g.addColorStop(0,'#071008');g.addColorStop(1,'#020703');
        ctx.fillStyle=g;ctx.fillRect(cx-32,cy-32,64,64);ctx.restore();
      };
      const drawLiveArrows=(angle)=>{
        const cx=745,cy=93,r=19;
        ctx.save();ctx.translate(cx,cy);ctx.rotate(angle);
        ctx.strokeStyle='#78ff00';ctx.fillStyle='#78ff00';ctx.lineWidth=8;ctx.lineCap='round';ctx.lineJoin='round';
        const arrow=(a0,a1)=>{
          ctx.beginPath();ctx.arc(0,0,r,a0,a1,false);ctx.stroke();
          const px=Math.cos(a1)*r,py=Math.sin(a1)*r,t=a1+Math.PI/2;
          ctx.beginPath();ctx.moveTo(px,py);
          ctx.lineTo(px+Math.cos(t+2.55)*13,py+Math.sin(t+2.55)*13);
          ctx.lineTo(px+Math.cos(t-2.55)*13,py+Math.sin(t-2.55)*13);
          ctx.closePath();ctx.fill();
        };
        arrow(-2.75,-.25);arrow(.39,2.89);
        ctx.restore();
      };

      const redraw=(liveAngle=null)=>{
        ctx.drawImage(masterImg,0,0,W,H);
        cleanDynamic();
        eraseStaticNeedle();
        drawNeedle();
        if(liveAngle!==null){eraseLiveArrows();drawLiveArrows(liveAngle)}
      };

      redraw(null);
      masterImg.style.visibility='hidden';root.insertBefore(surface,masterImg.nextSibling);

      if(currencyState.loading){
        const started=performance.now();
        const spin=now=>{
          if(!surface.isConnected)return;
          if(!currencyState.loading){redraw(null);return}
          redraw(((now-started)/820)*Math.PI*2);
          requestAnimationFrame(spin);
        };
        requestAnimationFrame(spin);
      }
    };
    if(masterImg&&masterImg.complete&&masterImg.naturalWidth)mountK4Surface();
    else if(masterImg)masterImg.addEventListener('load',mountK4Surface,{once:true});
`;

  out=out.replace(
    /    const masterImg=root\.querySelector\('\.wm-master'\);[\s\S]*?    if\(masterImg\.complete&&masterImg\.naturalWidth\)mountK4Surface\(\);else masterImg\.addEventListener\('load',mountK4Surface,\{once:true\}\);\n/,
    surgical
  );

  const r71Css=String.raw`<style id="r71-k4-final-surgical">
.wm-page[data-card="4"] .wm-select{opacity:0!important}
.wm-page[data-card="4"] .r70-k4-status{white-space:nowrap!important}
</style>`;
  out=out.replace('</head>',r71Css+'\n</head>');
  return out;
};