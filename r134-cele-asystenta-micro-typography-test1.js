/* R134 TEST 1 — CELE ASYSTENTA — MICRO TYPOGRAPHY ALIGNMENT 1:1
   Baza: R133 TEST 1 + R132 TEST 2.
   Zakres: wyłącznie mikro-pozycjonowanie tekstów w karcie CELE ASYSTENTA.
   Nie zmienia: rastra MASTER, nazwy firmy, kolorów priorytetu, hotspotów, danych ani logiki.
   Zasada: jedna korekta typografii, bez globalnego skalowania całej karty.
*/

const r134MicroTypographyBasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r134MicroTypographyBasePatchIndexHtml(text);
  if(typeof out !== 'string' || !out) return out;

  out = out.replaceAll('1.3.0-test-r133-cele-typography-priority-1to1','1.3.0-test-r134-cele-micro-typography-1to1');
  out = out.replaceAll('R133 TEST 1 — CELE ASYSTENTA TYPOGRAPHY + PRIORITY COLORS 1:1','R134 TEST 1 — CELE ASYSTENTA MICRO TYPOGRAPHY ALIGNMENT 1:1');
  out = out.replace(/const BUILD_DATE = '[^']*';/,"const BUILD_DATE = '11.09.2026';");
  out = out.replace(/const BUILD_TIME = '[^']*';/,"const BUILD_TIME = '18:03';");
  out = out.replace(/sw\.js\?v=[^'\"]+/g,'sw.js?v=R134-test1-cele-micro-typography-1803');
  out = out.replace(/r84-backup-prune\.js\?v=[^'\"]+/g,'r84-backup-prune.js?v=R134-test1-1803');

  if(!out.includes('id="r134-cele-micro-typography-test1"')){
    const script = `
<script id="r134-cele-micro-typography-test1">
(function(){
  'use strict';
  const W=852,H=1846;
  const pct=(v,b)=>(v/b*100)+'%';

  function baseY(el){
    const t=parseFloat(el && el.style ? el.style.top : '');
    return Number.isFinite(t) ? t*H/100 : NaN;
  }
  function setBox(el,x,y,w,h){
    if(!el) return;
    el.style.left=pct(x,W);
    el.style.top=pct(y,H);
    el.style.width=pct(w,W);
    el.style.height=pct(h,H);
    el.style.boxSizing='border-box';
  }
  function divs(root){return Array.from(root.children).filter(el=>el&&el.tagName==='DIV');}
  function exact(root,label){return divs(root).find(el=>String(el.textContent||'').trim()===label)||null;}
  function byY(root,min,max){return divs(root).filter(el=>{const y=baseY(el);return Number.isFinite(y)&&y>=min&&y<=max;});}
  function centerText(el){
    if(!el) return;
    el.style.display='flex';
    el.style.alignItems='center';
    el.style.justifyContent='center';
    el.style.textAlign='center';
    el.style.lineHeight='1';
  }
  function leftCenter(el,line='1.16'){
    if(!el) return;
    el.style.display='flex';
    el.style.alignItems='center';
    el.style.justifyContent='flex-start';
    el.style.textAlign='left';
    el.style.lineHeight=line;
  }

  function tune(){
    const root=document.querySelector('.r129-goals-live');
    if(!root) return;

    /* LISTA CELÓW: wracamy do geometrii R129 MASTER, bez dodatkowego zwężania. */
    const list=root.querySelector('.r129-goals-scroll');
    if(list){
      setBox(list,205,570,555,430);
      list.style.padding='0 8px 0 0';
      list.style.lineHeight='1.22';
      Array.from(list.children).forEach(row=>{
        row.style.margin='0 0 13px 0';
        row.style.padding='0';
        row.style.lineHeight='1.22';
      });
    }

    /* Czerwony kafel: nagłówek i biały opis osadzone WEWNĄTRZ pola, nie na ramce. */
    const priorityTitle=exact(root,'CEL PRIORYTETOWY');
    if(priorityTitle){
      setBox(priorityTitle,205,1088,555,46);
      leftCenter(priorityTitle,'1');
    }
    const priorityBody=byY(root,1120,1180).find(el=>el!==priorityTitle && !String(el.textContent||'').trim().toUpperCase().startsWith('CEL PRIORYTETOWY'));
    if(priorityBody){
      setBox(priorityBody,205,1144,555,86);
      leftCenter(priorityBody,'1.16');
    }

    /* Zielony kafel: identyczna logika osi jak czerwony. */
    const nextTitle=exact(root,'NASTĘPNY KROK');
    if(nextTitle){
      setBox(nextTitle,205,1276,555,46);
      leftCenter(nextTitle,'1');
    }
    const nextBody=byY(root,1300,1375).find(el=>el!==nextTitle && !String(el.textContent||'').trim().toUpperCase().startsWith('NASTĘPNY KROK'));
    if(nextBody){
      setBox(nextBody,205,1332,555,84);
      leftCenter(nextBody,'1.16');
    }

    /* Trzy akcje: podpis liczony od pełnej geometrii przycisku, wspólna oś Y. */
    const edit=exact(root,'EDYTUJ CEL');
    const add=exact(root,'DODAJ CEL');
    const status=divs(root).find(el=>String(el.textContent||'').replace(/\s+/g,' ').trim()==='DO STATUSU CRM');
    if(edit){setBox(edit,38,1466,235,44);centerText(edit);edit.style.whiteSpace='nowrap';}
    if(add){setBox(add,286,1466,250,44);centerText(add);add.style.whiteSpace='nowrap';}
    if(status){setBox(status,548,1466,255,44);centerText(status);status.style.whiteSpace='nowrap';}

    /* Dolny przycisk: napis dokładnie w osi pełnego zielonego kafla. */
    const back=exact(root,'WRÓĆ DO SZCZEGÓŁU');
    if(back){
      setBox(back,38,1598,765,58);
      centerText(back);
      back.style.whiteSpace='nowrap';
    }
  }

  const observer=new MutationObserver(()=>requestAnimationFrame(tune));
  observer.observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener('load',()=>{setTimeout(tune,70);setTimeout(tune,190);});
  window.addEventListener('resize',()=>requestAnimationFrame(tune));
  setTimeout(tune,260);
})();
</script>`;
    out = out.replace('</body>',script+'\n</body>');
  }

  return out;
};
