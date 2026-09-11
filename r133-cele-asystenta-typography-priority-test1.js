/* R133 TEST 1 — CELE ASYSTENTA — TYPOGRAPHY + PRIORITY COLORS 1:1
   Zakres: wyłącznie warstwa LIVE karty CELE ASYSTENTA.
   Baza: R132 TEST 2 — poprawne pole i centrowanie nazwy firmy.
   Cel: chirurgiczne dopasowanie białych opisów, podpisów przycisków akcyjnych
        oraz czytelny pasek KRAJ / ROLA / PRIORYTET.
   Priorytet: etykieta PRIORYTET = biała; A+ = czerwony, A = zielony, B = niebieski.
   Raster MASTER, hotspoty, dane, logika i pozostałe karty pozostają nietknięte.
*/

const r133TypographyBasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r133TypographyBasePatchIndexHtml(text);
  if(typeof out !== 'string' || !out) return out;

  out = out.replaceAll('1.3.0-test-r132-cele-company-name-center-1to1','1.3.0-test-r133-cele-typography-priority-1to1');
  out = out.replaceAll('R132 TEST 2 — CELE ASYSTENTA COMPANY NAME CENTER 1:1','R133 TEST 1 — CELE ASYSTENTA TYPOGRAPHY + PRIORITY COLORS 1:1');
  out = out.replace(/const BUILD_DATE = '[^']*';/,"const BUILD_DATE = '11.09.2026';");
  out = out.replace(/const BUILD_TIME = '[^']*';/,"const BUILD_TIME = '17:01';");
  out = out.replace(/sw\.js\?v=[^'\"]+/g,'sw.js?v=R133-test1-cele-typography-priority-1701');
  out = out.replace(/r84-backup-prune\.js\?v=[^'\"]+/g,'r84-backup-prune.js?v=R133-test1-1701');

  if(!out.includes('id="r133-cele-typography-priority-test1"')){
    const script = `
<script id="r133-cele-typography-priority-test1">
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
  function divs(root){
    return Array.from(root.children).filter(el=>el && el.tagName==='DIV');
  }
  function byY(root,min,max){
    return divs(root).filter(el=>{const y=baseY(el);return Number.isFinite(y)&&y>=min&&y<=max;});
  }
  function exact(root,label){
    return divs(root).find(el=>String(el.textContent||'').trim()===label)||null;
  }

  function priorityColor(v){
    const p=String(v||'').trim().toUpperCase();
    if(p==='A+' || p.startsWith('A+')) return '#ff3b30';
    if(p==='A') return '#39ff67';
    if(p==='B') return '#35bfff';
    return '#ffffff';
  }

  function tune(){
    const root=document.querySelector('.r129-goals-live');
    if(!root) return;

    /* 1) Pasek META — zachowujemy geometrię, poprawiamy optyczne osadzenie. */
    const meta=byY(root,395,420);
    meta.forEach(el=>{
      el.style.alignItems='center';
      el.style.justifyContent='center';
      el.style.textAlign='center';
      el.style.lineHeight='1';
      el.style.transform='translateY('+Math.max(1,root.clientHeight*(5/H))+'px)';
      el.style.whiteSpace='nowrap';
    });

    const pEl=meta.find(el=>String(el.textContent||'').trim().toUpperCase().startsWith('PRIORYTET'));
    if(pEl){
      const raw=String(pEl.textContent||'').trim().toUpperCase();
      const value=raw.replace(/^PRIORYTET\s*/,'').trim()||'—';
      pEl.innerHTML='<span style="color:#fff;font-weight:900">PRIORYTET</span><span style="display:inline-block;width:8px"></span><span style="color:'+priorityColor(value)+';font-weight:950;text-shadow:0 0 8px '+priorityColor(value)+'99,0 2px 5px #000">'+value.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</span>';
      pEl.style.color='#fff';
    }

    /* 2) LISTA CELÓW — jeden wspólny lewy margines i rytm wierszy. */
    const list=root.querySelector('.r129-goals-scroll');
    if(list){
      setBox(list,212,570,540,430);
      list.style.lineHeight='1.20';
      list.style.padding='0';
      Array.from(list.children).forEach(row=>{
        row.style.margin='0 0 14px 0';
        row.style.padding='0';
        row.style.lineHeight='1.20';
      });
    }

    /* 3) Białe opisy CEL PRIORYTETOWY / NASTĘPNY KROK — identyczna oś tekstu. */
    const priorityBody=byY(root,1125,1150).find(el=>!String(el.textContent||'').trim().toUpperCase().startsWith('CEL PRIORYTETOWY'));
    if(priorityBody){
      setBox(priorityBody,212,1134,540,82);
      priorityBody.style.alignItems='center';
      priorityBody.style.justifyContent='flex-start';
      priorityBody.style.textAlign='left';
      priorityBody.style.lineHeight='1.14';
    }
    const nextBody=byY(root,1310,1335).find(el=>!String(el.textContent||'').trim().toUpperCase().startsWith('NASTĘPNY KROK'));
    if(nextBody){
      setBox(nextBody,212,1319,540,80);
      nextBody.style.alignItems='center';
      nextBody.style.justifyContent='flex-start';
      nextBody.style.textAlign='left';
      nextBody.style.lineHeight='1.14';
    }

    /* 4) Podpisy trzech przycisków akcyjnych — wspólna linia i środek optyczny. */
    const edit=exact(root,'EDYTUJ CEL');
    const add=exact(root,'DODAJ CEL');
    const status=divs(root).find(el=>String(el.textContent||'').replace(/\s+/g,' ').trim()==='DO STATUSU CRM');
    if(edit){setBox(edit,64,1454,204,48);edit.style.alignItems='center';edit.style.justifyContent='center';edit.style.textAlign='center';edit.style.lineHeight='1';}
    if(add){setBox(add,298,1454,226,48);add.style.alignItems='center';add.style.justifyContent='center';add.style.textAlign='center';add.style.lineHeight='1';}
    if(status){setBox(status,560,1454,231,48);status.style.alignItems='center';status.style.justifyContent='center';status.style.textAlign='center';status.style.lineHeight='1';status.style.whiteSpace='nowrap';}

    /* 5) Dolny biały opis — matematyczny środek zielonego kafla. */
    const back=exact(root,'WRÓĆ DO SZCZEGÓŁU');
    if(back){
      setBox(back,145,1590,551,66);
      back.style.alignItems='center';
      back.style.justifyContent='center';
      back.style.textAlign='center';
      back.style.lineHeight='1';
      back.style.whiteSpace='nowrap';
    }
  }

  const observer=new MutationObserver(()=>requestAnimationFrame(tune));
  observer.observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener('load',()=>{setTimeout(tune,60);setTimeout(tune,180);});
  window.addEventListener('resize',()=>requestAnimationFrame(tune));
  setTimeout(tune,250);
})();
</script>`;
    out = out.replace('</body>', script + '\n</body>');
  }

  return out;
};
