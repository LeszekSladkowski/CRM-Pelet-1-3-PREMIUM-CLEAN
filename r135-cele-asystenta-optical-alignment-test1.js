/* R135 TEST 1 — CELE ASYSTENTA — OPTICAL ALIGNMENT 1:1
   Baza: R134 TEST 1 + R133 TEST 1 + R132 TEST 2.
   Zakres: wyłącznie optyczne osadzenie warstwy tekstowej na karcie CELE ASYSTENTA.
   Nie zmienia: rastra MASTER, nazwy firmy, kolorów priorytetu, hotspotów, danych ani logiki.
   Cel: skorygować elementy widoczne na teście Samsung Galaxy S24 Ultra po R134.
*/

const r135OpticalAlignmentBasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r135OpticalAlignmentBasePatchIndexHtml(text);
  if(typeof out !== 'string' || !out) return out;

  out = out.replaceAll('1.3.0-test-r134-cele-micro-typography-1to1','1.3.0-test-r135-cele-optical-alignment-1to1');
  out = out.replaceAll('R134 TEST 1 — CELE ASYSTENTA MICRO TYPOGRAPHY ALIGNMENT 1:1','R135 TEST 1 — CELE ASYSTENTA OPTICAL ALIGNMENT 1:1');
  out = out.replace(/const BUILD_DATE = '[^']*';/,"const BUILD_DATE = '11.09.2026';");
  out = out.replace(/const BUILD_TIME = '[^']*';/,"const BUILD_TIME = '18:18';");
  out = out.replace(/sw\.js\?v=[^'\"]+/g,'sw.js?v=R135-test1-cele-optical-alignment-1818');
  out = out.replace(/r84-backup-prune\.js\?v=[^'\"]+/g,'r84-backup-prune.js?v=R135-test1-1818');

  if(!out.includes('id="r135-cele-optical-alignment-test1"')){
    const script = `
<script id="r135-cele-optical-alignment-test1">
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
  function center(el){
    if(!el) return;
    el.style.display='flex';
    el.style.alignItems='center';
    el.style.justifyContent='center';
    el.style.textAlign='center';
    el.style.lineHeight='1';
  }
  function leftCenter(el,line='1.15'){
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

    /* META: kasujemy wcześniejsze przesunięcie transform i osadzamy wszystkie 3 opisy na jednej osi. */
    const meta=byY(root,398,456);
    const country=meta.find(el=>{
      const t=String(el.textContent||'').trim().toUpperCase();
      return t && !t.startsWith('PRIORYTET') && !['DOSTAWCA','KLIENT','PRODUCENT','HURTOWNIK','KONTRAHENT'].includes(t) && t.length<22;
    });
    const priority=meta.find(el=>String(el.textContent||'').trim().toUpperCase().startsWith('PRIORYTET'));
    const role=meta.find(el=>el!==country && el!==priority && String(el.textContent||'').trim()!=='');
    [country,role,priority].forEach(el=>{if(el){el.style.transform='none';center(el);el.style.whiteSpace='nowrap';}});
    if(country)setBox(country,105,401,150,54);
    if(role)setBox(role,320,401,200,54);
    if(priority)setBox(priority,574,401,232,54);

    /* LISTA CELÓW: równy lewy margines i spokojniejszy rytm pionowy; bez zmiany fontu. */
    const list=root.querySelector('.r129-goals-scroll');
    if(list){
      setBox(list,205,570,555,430);
      list.style.padding='0 8px 0 0';
      list.style.lineHeight='1.20';
      Array.from(list.children).forEach((row,i,arr)=>{
        row.style.padding='0';
        row.style.lineHeight='1.20';
        row.style.margin=i===arr.length-1?'0':'0 0 16px 0';
      });
    }

    /* KAFEL CZERWONY: tytuł i opis na jednej osi optycznej, z bezpiecznym odstępem od separatora. */
    const priorityTitle=exact(root,'CEL PRIORYTETOWY');
    if(priorityTitle){
      setBox(priorityTitle,212,1090,548,48);
      leftCenter(priorityTitle,'1');
    }
    const priorityBody=byY(root,1125,1235).find(el=>el!==priorityTitle && !String(el.textContent||'').trim().toUpperCase().startsWith('CEL PRIORYTETOWY'));
    if(priorityBody){
      setBox(priorityBody,212,1145,548,88);
      leftCenter(priorityBody,'1.15');
    }

    /* KAFEL ZIELONY: identyczna oś i odstępy jak czerwony. */
    const nextTitle=exact(root,'NASTĘPNY KROK');
    if(nextTitle){
      setBox(nextTitle,212,1278,548,48);
      leftCenter(nextTitle,'1');
    }
    const nextBody=byY(root,1300,1420).find(el=>el!==nextTitle && !String(el.textContent||'').trim().toUpperCase().startsWith('NASTĘPNY KROK'));
    if(nextBody){
      setBox(nextBody,212,1334,548,86);
      leftCenter(nextBody,'1.15');
    }

    /* AKCJE: podpisy schodzą kilka pikseli z górnej ramki i mają wspólny środek optyczny. */
    const edit=exact(root,'EDYTUJ CEL');
    const add=exact(root,'DODAJ CEL');
    const status=divs(root).find(el=>String(el.textContent||'').replace(/\s+/g,' ').trim()==='DO STATUSU CRM');
    if(edit){setBox(edit,38,1473,235,42);center(edit);edit.style.whiteSpace='nowrap';}
    if(add){setBox(add,286,1473,250,42);center(add);add.style.whiteSpace='nowrap';}
    if(status){setBox(status,548,1473,255,42);center(status);status.style.whiteSpace='nowrap';}

    /* WRÓĆ: korekta optyczna względem strzałki w rastrze — tekst niżej, bez zmiany hotspotu. */
    const back=exact(root,'WRÓĆ DO SZCZEGÓŁU');
    if(back){
      setBox(back,38,1610,765,60);
      center(back);
      back.style.whiteSpace='nowrap';
    }
  }

  const observer=new MutationObserver(()=>requestAnimationFrame(tune));
  observer.observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener('load',()=>{setTimeout(tune,70);setTimeout(tune,200);});
  window.addEventListener('resize',()=>requestAnimationFrame(tune));
  setTimeout(tune,280);
})();
</script>`;
    out = out.replace('</body>',script+'\n</body>');
  }

  return out;
};
