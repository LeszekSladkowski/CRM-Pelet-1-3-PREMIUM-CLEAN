/* R132 TEST 2 — CELE ASYSTENTA — COMPANY NAME CENTER 1:1
   Zakres: WYŁĄCZNIE warstwa LIVE z nazwą firmy na karcie CELE ASYSTENTA.
   Baza: zatwierdzony szeroki obszar nazwy z R132 TEST 1.
   Cel: optyczne wycentrowanie nazwy w pionie i zachowanie idealnego środka w poziomie.
   R129 FINAL MASTER pozostaje nietknięty: raster, pozostałe teksty, hotspoty i funkcje bez zmian.
*/

const r132NameCenterBasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r132NameCenterBasePatchIndexHtml(text);
  if(typeof out !== 'string' || !out) return out;

  out = out.replaceAll('1.3.0-test-r131-waluty-k1-press-chamfer-1to1','1.3.0-test-r132-cele-company-name-center-1to1');
  out = out.replaceAll('R131 TEST 2 — WALUTY K1 PRESS CHAMFER 1:1','R132 TEST 2 — CELE ASYSTENTA COMPANY NAME CENTER 1:1');
  out = out.replace(/const BUILD_DATE = '[^']*';/,"const BUILD_DATE = '11.09.2026';");
  out = out.replace(/const BUILD_TIME = '[^']*';/,"const BUILD_TIME = '16:29';");
  out = out.replace(/sw\.js\?v=[^'\"]+/g,'sw.js?v=R132-test2-cele-company-name-center-1629');
  out = out.replace(/r84-backup-prune\.js\?v=[^'\"]+/g,'r84-backup-prune.js?v=R132-test2-1629');

  if(!out.includes('id="r132-cele-company-name-center-test2"')){
    const script = `
<script id="r132-cele-company-name-center-test2">
(function(){
  'use strict';
  const BASE_W=852;
  const BASE_H=1846;
  const NAME_X=80;
  const NAME_W=692;
  const BASE_FONT=47;
  const MIN_PX=16;
  const OPTICAL_SHIFT_Y=14;

  function fitCompanyName(){
    const root=document.querySelector('.r129-goals-live');
    if(!root) return;
    const nameEl=Array.from(root.children).find(function(el){return el && el.tagName==='DIV';});
    if(!nameEl) return;

    nameEl.style.left=(NAME_X/BASE_W*100)+'%';
    nameEl.style.width=(NAME_W/BASE_W*100)+'%';
    nameEl.style.whiteSpace='nowrap';
    nameEl.style.justifyContent='center';
    nameEl.style.alignItems='center';
    nameEl.style.textAlign='center';
    nameEl.style.transformOrigin='center center';
    nameEl.style.transform='translateY('+(root.clientHeight*(OPTICAL_SHIFT_Y/BASE_H))+'px)';

    const unit=(window.CSS&&CSS.supports&&CSS.supports('font-size','1cqw'))?'cqw':'vw';
    nameEl.style.fontSize=(BASE_FONT/BASE_W*100).toFixed(3)+unit;

    const run=function(){
      if(!nameEl.isConnected) return;
      let fs=parseFloat(getComputedStyle(nameEl).fontSize)||18;
      let guard=0;
      while(nameEl.scrollWidth>nameEl.clientWidth+1 && fs>MIN_PX && guard++<80){
        fs=Math.max(MIN_PX,fs-0.4);
        nameEl.style.fontSize=fs+'px';
      }
      nameEl.style.transform='translateY('+(root.clientHeight*(OPTICAL_SHIFT_Y/BASE_H))+'px)';
    };
    requestAnimationFrame(function(){requestAnimationFrame(run);});
  }

  const observer=new MutationObserver(function(){requestAnimationFrame(fitCompanyName);});
  observer.observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener('load',function(){setTimeout(fitCompanyName,60);setTimeout(fitCompanyName,180);});
  window.addEventListener('resize',function(){requestAnimationFrame(fitCompanyName);});
  setTimeout(fitCompanyName,250);
})();
</script>`;
    out = out.replace('</body>', script + '\n</body>');
  }

  return out;
};
