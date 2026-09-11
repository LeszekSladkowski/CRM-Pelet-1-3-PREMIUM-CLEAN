/* R136 TEST 1 — CELE ASYSTENTA — MASTER GEOMETRY RESTORE 1:1
   Źródło prawdy: zatwierdzony R129 FINAL MASTER, raster 852x1846.
   Zachowane późniejsze, jawnie zatwierdzone wyjątki: R132 TEST 2 (szerokie, wycentrowane pole nazwy firmy)
   oraz kolor wartości PRIORYTETU: A+ czerwony, A zielony, B niebieski, etykieta PRIORYTET biała.
   Zakres: wyłącznie warstwa LIVE CELE ASYSTENTA. Raster, hotspoty, dane, funkcje i pozostałe karty bez zmian.
*/

const r136MasterRestoreBasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r136MasterRestoreBasePatchIndexHtml(text);
  if(typeof out !== 'string' || !out) return out;

  out = out.replaceAll('1.3.0-test-r135-cele-optical-alignment-1to1','1.3.0-test-r136-cele-master-geometry-restore-1to1');
  out = out.replaceAll('R135 TEST 1 — CELE ASYSTENTA OPTICAL ALIGNMENT 1:1','R136 TEST 1 — CELE ASYSTENTA MASTER GEOMETRY RESTORE 1:1');
  out = out.replace(/const BUILD_DATE = '[^']*';/,"const BUILD_DATE = '11.09.2026';");
  out = out.replace(/const BUILD_TIME = '[^']*';/,"const BUILD_TIME = '18:30';");
  out = out.replace(/sw\.js\?v=[^'\"]+/g,'sw.js?v=R136-test1-cele-master-geometry-restore-1830');
  out = out.replace(/r84-backup-prune\.js\?v=[^'\"]+/g,'r84-backup-prune.js?v=R136-test1-1830');

  if(!out.includes('id="r136-cele-master-geometry-restore-test1"')){
    const script = `
<script id="r136-cele-master-geometry-restore-test1">
(function(){
  'use strict';
  const W=852,H=1846;
  const pct=(v,b)=>(v/b*100)+'%';
  const fsize=(v)=>{
    const unit=(window.CSS&&CSS.supports&&CSS.supports('font-size','1cqw'))?'cqw':'vw';
    return (v/W*100).toFixed(3)+unit;
  };

  function baseY(el){
    const t=parseFloat(el&&el.style?el.style.top:'');
    return Number.isFinite(t)?t*H/100:NaN;
  }
  function setBox(el,x,y,w,h){
    if(!el)return;
    el.style.left=pct(x,W);el.style.top=pct(y,H);el.style.width=pct(w,W);el.style.height=pct(h,H);
    el.style.boxSizing='border-box';
  }
  function divs(root){return Array.from(root.children).filter(el=>el&&el.tagName==='DIV');}
  function exact(root,label){return divs(root).find(el=>String(el.textContent||'').trim()===label)||null;}
  function norm(v){return String(v||'').replace(/\s+/g,' ').trim();}
  function byY(root,min,max){return divs(root).filter(el=>{const y=baseY(el);return Number.isFinite(y)&&y>=min&&y<=max;});}
  function priorityColor(v){
    const p=String(v||'').trim().toUpperCase();
    if(p==='A+'||p.startsWith('A+'))return '#ff3b30';
    if(p==='A')return '#39ff67';
    if(p==='B')return '#35bfff';
    return '#ffffff';
  }
  function fit(el,minPx){
    if(!el)return;
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      if(!el.isConnected)return;
      let fs=parseFloat(getComputedStyle(el).fontSize)||18,guard=0;
      while((el.scrollHeight>el.clientHeight+1||el.scrollWidth>el.clientWidth+1)&&fs>minPx&&guard++<80){
        fs=Math.max(minPx,fs-.4);el.style.fontSize=fs+'px';
      }
    }));
  }
  function restoreText(el,x,y,w,h,size,opt={}){
    if(!el)return;
    setBox(el,x,y,w,h);
    el.style.display='flex';
    el.style.alignItems='center';
    el.style.justifyContent=opt.center?'center':'flex-start';
    el.style.textAlign=opt.center?'center':'left';
    el.style.color=opt.color||'#fff';
    el.style.fontWeight=opt.weight||'850';
    el.style.fontSize=fsize(size);
    el.style.lineHeight=opt.line||'1.14';
    el.style.whiteSpace=opt.nowrap?'nowrap':'normal';
    el.style.transform='none';
    el.style.padding='0';
    el.style.margin='0';
    el.style.overflow='hidden';
    el.style.overflowWrap='break-word';
    el.style.wordBreak='normal';
    el.style.textShadow='0 2px 5px #000,0 0 7px #000';
    if(opt.fit!==false)fit(el,opt.min||17);
  }

  function tune(){
    const root=document.querySelector('.r129-goals-live');
    if(!root)return;

    /* NAZWA FIRMY: pozostaje dokładnie R132 TEST 2 — nie ruszamy. */

    /* META wraca do geometrii R129 MASTER. */
    const meta=byY(root,390,470);
    const priority=meta.find(el=>norm(el.textContent).toUpperCase().startsWith('PRIORYTET'));
    const roleWords=['DOSTAWCA','KLIENT','PRODUCENT','HURTOWNIK','KONTRAHENT'];
    const role=meta.find(el=>roleWords.includes(norm(el.textContent).toUpperCase()));
    const country=meta.find(el=>el!==role&&el!==priority&&norm(el.textContent)!=='');
    restoreText(country,105,404,150,50,22,{center:true,weight:'850',nowrap:true,min:15});
    restoreText(role,320,404,200,50,22,{center:true,weight:'850',nowrap:true,min:15});
    if(priority){
      const raw=norm(priority.textContent).toUpperCase();
      const value=raw.replace(/^PRIORYTET\s*/,'').trim()||'—';
      restoreText(priority,574,404,232,50,20,{center:true,weight:'900',nowrap:true,min:14});
      const c=priorityColor(value);
      priority.innerHTML='<span style="color:#fff;font-weight:900">PRIORYTET</span><span style="display:inline-block;width:8px"></span><span style="color:'+c+';font-weight:950;text-shadow:0 0 8px '+c+'99,0 2px 5px #000">'+value.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</span>';
    }

    /* LISTA CELÓW — dokładnie R129 MASTER. */
    const listTitle=exact(root,'LISTA CELÓW');
    restoreText(listTitle,205,506,555,54,41,{weight:'950',color:'#ffd43b',fit:false});
    const list=root.querySelector('.r129-goals-scroll');
    if(list){
      setBox(list,205,570,555,430);
      list.style.color='#fff';list.style.fontWeight='820';list.style.fontSize=fsize(30);
      list.style.lineHeight='1.22';list.style.padding='0 8px 0 0';list.style.margin='0';
      list.style.overflowX='hidden';list.style.overflowY='auto';list.style.textAlign='left';list.style.transform='none';
      Array.from(list.children).forEach(row=>{row.style.margin='0 0 13px 0';row.style.padding='0';row.style.lineHeight='1.22';row.style.textAlign='left';});
    }

    /* CZERWONY KAFEL — dokładnie pozycje i typografia R129 MASTER. */
    const priorityTitle=exact(root,'CEL PRIORYTETOWY');
    restoreText(priorityTitle,205,1072,555,48,36,{weight:'950',color:'#ff4a4a',fit:false});
    const priorityBody=byY(root,1110,1245).find(el=>el!==priorityTitle&&!norm(el.textContent).toUpperCase().startsWith('CEL PRIORYTETOWY'));
    restoreText(priorityBody,205,1132,555,82,30,{weight:'850',line:'1.16',min:22});

    /* ZIELONY KAFEL — dokładnie pozycje i typografia R129 MASTER. */
    const nextTitle=exact(root,'NASTĘPNY KROK');
    restoreText(nextTitle,205,1260,555,48,36,{weight:'950',color:'#39ff67',fit:false});
    const nextBody=byY(root,1290,1430).find(el=>el!==nextTitle&&!norm(el.textContent).toUpperCase().startsWith('NASTĘPNY KROK'));
    restoreText(nextBody,205,1317,555,80,30,{weight:'850',line:'1.16',min:22});

    /* TRZY AKCJE — dokładnie R129 MASTER. */
    const edit=exact(root,'EDYTUJ CEL');
    const add=exact(root,'DODAJ CEL');
    const status=divs(root).find(el=>norm(el.textContent)==='DO STATUSU CRM');
    restoreText(edit,83,1457,166,50,22,{center:true,weight:'900',color:'#22cfff',nowrap:true,min:16});
    restoreText(add,325,1457,160,50,22,{center:true,weight:'900',color:'#fff04d',nowrap:true,min:16});
    restoreText(status,578,1448,172,68,20,{center:true,weight:'900',color:'#ffb126',line:'1.05',min:15});

    /* DOLNY POWRÓT — dokładnie R129 MASTER. */
    const back=exact(root,'WRÓĆ DO SZCZEGÓŁU');
    restoreText(back,250,1590,500,66,33,{center:true,weight:'900',nowrap:true,min:22});
  }

  const observer=new MutationObserver(()=>requestAnimationFrame(tune));
  observer.observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener('load',()=>{setTimeout(tune,50);setTimeout(tune,160);setTimeout(tune,320);});
  window.addEventListener('resize',()=>requestAnimationFrame(tune));
  setTimeout(tune,220);
})();
</script>`;
    out = out.replace('</body>',script+'\n</body>');
  }

  return out;
};

/* R138 DELIVERY FIX: R137 nie jest już importowany z R136. Końcową warstwę R138 importuje wyłącznie główny sw.js, dokładnie jeden raz. */
