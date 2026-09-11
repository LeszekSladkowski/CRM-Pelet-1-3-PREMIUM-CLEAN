/* R133 TEST 2 — CELE ASYSTENTA — TYPOGRAPHY SURGICAL ALIGNMENT + PRIORITY COLORS 1:1
   Zakres: wyłącznie warstwa LIVE karty CELE ASYSTENTA.
   Baza: zatwierdzone R132 TEST 2 — szerokie pole i centrowanie nazwy firmy.
   Cel: chirurgiczne osadzenie wszystkich opisów na osiach rastra MASTER 852x1846,
        bez zmiany grafiki, hotspotów, danych ani logiki.
   Priorytet: etykieta PRIORYTET = biała; A+ = czerwony, A = zielony, B = niebieski.
*/

const r133Test2BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r133Test2BasePatchIndexHtml(text);
  if(typeof out !== 'string' || !out) return out;

  out = out.replaceAll('1.3.0-test-r133-cele-typography-priority-1to1','1.3.0-test-r133-cele-typography-priority-surgical-1to1');
  out = out.replaceAll('R133 TEST 1 — CELE ASYSTENTA TYPOGRAPHY + PRIORITY COLORS 1:1','R133 TEST 2 — CELE ASYSTENTA TYPOGRAPHY SURGICAL ALIGNMENT 1:1');
  out = out.replace(/const BUILD_DATE = '[^']*';/,"const BUILD_DATE = '11.09.2026';");
  out = out.replace(/const BUILD_TIME = '[^']*';/,"const BUILD_TIME = '17:24';");
  out = out.replace(/sw\.js\?v=[^'\"]+/g,'sw.js?v=R133-test2-cele-typography-surgical-1724');
  out = out.replace(/r84-backup-prune\.js\?v=[^'\"]+/g,'r84-backup-prune.js?v=R133-test2-1724');

  if(!out.includes('id="r133-cele-typography-priority-test2"')){
    const script = `
<script id="r133-cele-typography-priority-test2">
(function(){
  'use strict';
  const W=852,H=1846;
  const pct=(v,b)=>(v/b*100)+'%';

  function setBox(el,x,y,w,h){
    if(!el) return;
    el.style.left=pct(x,W);
    el.style.top=pct(y,H);
    el.style.width=pct(w,W);
    el.style.height=pct(h,H);
    el.style.boxSizing='border-box';
  }
  function divs(root){return Array.from(root.children).filter(el=>el&&el.tagName==='DIV');}
  function exact(root,label){return divs(root).find(el=>String(el.textContent||'').replace(/\s+/g,' ').trim()===label)||null;}
  function titleBody(root,title){
    const kids=divs(root),i=kids.findIndex(el=>String(el.textContent||'').replace(/\s+/g,' ').trim()===title);
    if(i<0) return null;
    for(let n=i+1;n<kids.length;n++){
      const t=String(kids[n].textContent||'').replace(/\s+/g,' ').trim();
      if(t) return kids[n];
    }
    return null;
  }
  function priorityColor(v){
    const p=String(v||'').trim().toUpperCase();
    if(p==='A+'||p.startsWith('A+')) return '#ff3b30';
    if(p==='A') return '#39ff67';
    if(p==='B') return '#35bfff';
    return '#ffffff';
  }

  function tune(){
    const root=document.querySelector('.r129-goals-live');
    if(!root) return;

    /* META — trzy pola pozostają na osiach MASTER; tylko optyczne centrowanie i czytelny priorytet. */
    const meta=divs(root).filter(el=>{
      const top=parseFloat(el.style.top||'');
      if(!Number.isFinite(top)) return false;
      const y=top*H/100;
      return y>=398&&y<=410;
    });
    meta.forEach(el=>{
      el.style.display='flex';
      el.style.alignItems='center';
      el.style.justifyContent='center';
      el.style.textAlign='center';
      el.style.lineHeight='1';
      el.style.transform='none';
      el.style.whiteSpace='nowrap';
    });
    const pEl=meta.find(el=>String(el.textContent||'').trim().toUpperCase().startsWith('PRIORYTET'));
    if(pEl){
      const raw=String(pEl.textContent||'').trim().toUpperCase();
      const value=raw.replace(/^PRIORYTET\s*/,'').trim()||'—';
      const col=priorityColor(value);
      pEl.innerHTML='<span style="color:#fff;font-weight:900">PRIORYTET</span><span style="display:inline-block;width:10px"></span><span style="color:'+col+';font-weight:950;text-shadow:0 0 7px '+col+'88,0 2px 5px #000">'+value.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</span>';
      pEl.style.color='#fff';
    }

    /* LISTA CELÓW — wracamy dokładnie na referencyjną oś x=205 i szerokość 555 z R129 MASTER. */
    const list=root.querySelector('.r129-goals-scroll');
    if(list){
      setBox(list,205,570,555,430);
      list.style.padding='0';
      list.style.lineHeight='1.22';
      list.style.textAlign='left';
      Array.from(list.children).forEach(row=>{
        row.style.margin='0 0 13px 0';
        row.style.padding='0';
        row.style.lineHeight='1.22';
        row.style.textAlign='left';
      });
    }

    /* Nagłówki i białe treści — jedna wspólna oś x=205, zgodna z LISTA CELÓW. */
    const prTitle=exact(root,'CEL PRIORYTETOWY');
    if(prTitle){
      setBox(prTitle,205,1072,555,48);
      prTitle.style.alignItems='center';prTitle.style.justifyContent='flex-start';prTitle.style.textAlign='left';prTitle.style.lineHeight='1';
    }
    const priorityBody=titleBody(root,'CEL PRIORYTETOWY');
    if(priorityBody){
      setBox(priorityBody,205,1132,555,82);
      priorityBody.style.display='flex';
      priorityBody.style.alignItems='center';
      priorityBody.style.justifyContent='flex-start';
      priorityBody.style.textAlign='left';
      priorityBody.style.lineHeight='1.16';
      priorityBody.style.padding='0';
    }

    const nxTitle=exact(root,'NASTĘPNY KROK');
    if(nxTitle){
      setBox(nxTitle,205,1260,555,48);
      nxTitle.style.alignItems='center';nxTitle.style.justifyContent='flex-start';nxTitle.style.textAlign='left';nxTitle.style.lineHeight='1';
    }
    const nextBody=titleBody(root,'NASTĘPNY KROK');
    if(nextBody){
      setBox(nextBody,205,1317,555,80);
      nextBody.style.display='flex';
      nextBody.style.alignItems='center';
      nextBody.style.justifyContent='flex-start';
      nextBody.style.textAlign='left';
      nextBody.style.lineHeight='1.16';
      nextBody.style.padding='0';
    }

    /* Przyciski akcyjne — podpisy centrowane matematycznie względem pełnych hotspotów/kafli. */
    const edit=exact(root,'EDYTUJ CEL');
    const add=exact(root,'DODAJ CEL');
    const status=exact(root,'DO STATUSU CRM');
    if(edit){setBox(edit,38,1438,235,44);edit.style.alignItems='center';edit.style.justifyContent='center';edit.style.textAlign='center';edit.style.lineHeight='1';edit.style.whiteSpace='nowrap';}
    if(add){setBox(add,286,1438,250,44);add.style.alignItems='center';add.style.justifyContent='center';add.style.textAlign='center';add.style.lineHeight='1';add.style.whiteSpace='nowrap';}
    if(status){setBox(status,548,1438,255,44);status.style.alignItems='center';status.style.justifyContent='center';status.style.textAlign='center';status.style.lineHeight='1';status.style.whiteSpace='nowrap';}

    /* Dolny opis — środek geometryczny kafla 38,1560,765,135. */
    const back=exact(root,'WRÓĆ DO SZCZEGÓŁU');
    if(back){
      setBox(back,121,1595,599,66);
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
    out=out.replace('</body>',script+'\n</body>');
  }
  return out;
};
