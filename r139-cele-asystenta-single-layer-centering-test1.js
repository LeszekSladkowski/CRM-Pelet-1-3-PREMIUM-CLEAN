/* R139 TEST 1 — CELE ASYSTENTA — SINGLE LAYER CENTERING 1:1
   Źródło prawdy: zatwierdzony raster R129 MASTER 852x1846.
   Cel: usunąć konfliktujące nakładki R132–R138 i pozostawić JEDNĄ końcową warstwę LIVE.
   Zmiana dotyczy wyłącznie: nazwy firmy, META, podpisów 3 przycisków oraz WRÓĆ DO SZCZEGÓŁU.
   LISTA CELÓW, CEL PRIORYTETOWY, NASTĘPNY KROK, raster, ikony, hotspoty, dane i funkcje pozostają wg R129 MASTER.
*/

const r139SingleLayerBasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r139SingleLayerBasePatchIndexHtml(text);
  if(typeof out !== 'string' || !out) return out;

  /* Wyrzucamy stare runtime-patche CELE ASYSTENTA. To one wzajemnie przestawiały teksty po renderze. */
  [
    'r132-cele-company-name-center-test2',
    'r133-cele-typography-priority-test1',
    'r134-cele-micro-typography-test1',
    'r135-cele-optical-alignment-test1',
    'r136-cele-master-geometry-restore-test1',
    'r138-cele-mathematical-centering-test1'
  ].forEach(function(id){
    const re = new RegExp('<script id="'+id+'">[\\s\\S]*?<\\/script>\\s*','g');
    out = out.replace(re,'');
  });

  [
    '1.3.0-test-r132-cele-company-name-center-1to1',
    '1.3.0-test-r133-cele-typography-priority-1to1',
    '1.3.0-test-r134-cele-micro-typography-1to1',
    '1.3.0-test-r135-cele-optical-alignment-1to1',
    '1.3.0-test-r136-cele-master-geometry-restore-1to1',
    '1.3.0-test-r137-cele-master-hard-lock-1to1',
    '1.3.0-test-r138-cele-mathematical-centering-1to1'
  ].forEach(v=>{out=out.replaceAll(v,'1.3.0-test-r139-cele-single-layer-centering-1to1');});
  [
    'R132 TEST 2 — CELE ASYSTENTA COMPANY NAME CENTER 1:1',
    'R133 TEST 1 — CELE ASYSTENTA TYPOGRAPHY + PRIORITY COLORS 1:1',
    'R134 TEST 1 — CELE ASYSTENTA MICRO TYPOGRAPHY ALIGNMENT 1:1',
    'R135 TEST 1 — CELE ASYSTENTA OPTICAL ALIGNMENT 1:1',
    'R136 TEST 1 — CELE ASYSTENTA MASTER GEOMETRY RESTORE 1:1',
    'R137 TEST 1 — CELE ASYSTENTA MASTER HARD LOCK 1:1',
    'R138 TEST 1 — CELE ASYSTENTA MATHEMATICAL CENTERING 1:1'
  ].forEach(v=>{out=out.replaceAll(v,'R139 TEST 1 — CELE ASYSTENTA SINGLE LAYER CENTERING 1:1');});
  out = out.replace(/const BUILD_DATE = '[^']*';/,"const BUILD_DATE = '11.09.2026';");
  out = out.replace(/const BUILD_TIME = '[^']*';/,"const BUILD_TIME = '19:55';");
  out = out.replace(/sw\.js\?v=[^'\"]+/g,'sw.js?v=R139-test1-cele-single-layer-centering-1955');
  out = out.replace(/r84-backup-prune\.js\?v=[^'\"]+/g,'r84-backup-prune.js?v=R139-test1-1955');

  if(!out.includes('id="r139-cele-single-layer-centering-test1"')){
    const script = `
<script id="r139-cele-single-layer-centering-test1">
(function(){
  'use strict';
  const W=852,H=1846;
  const pct=(v,b)=>(v/b*100)+'%';
  const fs=v=>((v/W)*100).toFixed(3)+'cqw';
  const norm=v=>String(v||'').replace(/\\s+/g,' ').trim();

  function setBox(el,x,y,w,h){
    if(!el)return;
    el.style.setProperty('position','absolute','important');
    el.style.setProperty('left',pct(x,W),'important');
    el.style.setProperty('top',pct(y,H),'important');
    el.style.setProperty('width',pct(w,W),'important');
    el.style.setProperty('height',pct(h,H),'important');
    el.style.setProperty('box-sizing','border-box','important');
    el.style.setProperty('transform','none','important');
    el.style.setProperty('margin','0','important');
    el.style.setProperty('padding','0','important');
  }
  function center(el,size,color,weight,pre){
    if(!el)return;
    el.style.setProperty('display','flex','important');
    el.style.setProperty('align-items','center','important');
    el.style.setProperty('justify-content','center','important');
    el.style.setProperty('text-align','center','important');
    el.style.setProperty('font-size',fs(size),'important');
    el.style.setProperty('font-weight',String(weight||900),'important');
    el.style.setProperty('line-height',pre?'1.05':'1','important');
    el.style.setProperty('white-space',pre?'pre-line':'nowrap','important');
    el.style.setProperty('overflow','hidden','important');
    el.style.setProperty('overflow-wrap','normal','important');
    el.style.setProperty('word-break','normal','important');
    if(color)el.style.setProperty('color',color,'important');
  }
  function directDivs(root){return Array.from(root.children).filter(el=>el&&el.tagName==='DIV');}
  function exact(divs,label){return divs.find(el=>norm(el.textContent)===label)||null;}
  function priorityColor(v){
    const p=String(v||'').trim().toUpperCase();
    if(p==='A+')return '#ff3b30';
    if(p==='A')return '#39ff67';
    if(p==='B')return '#35bfff';
    return '#ffffff';
  }

  function tune(){
    const root=document.querySelector('.r129-goals-live');
    if(!root)return;
    const divs=directDivs(root);
    if(divs.length<10)return;

    /* DOM R129 jest deterministyczny: pierwsze 4 DIV-y = nazwa, kraj, rola, priorytet. */
    const name=divs[0], country=divs[1], role=divs[2], priority=divs[3];
    const edit=exact(divs,'EDYTUJ CEL');
    const add=exact(divs,'DODAJ CEL');
    const status=divs.find(el=>norm(el.textContent)==='DO STATUSU CRM')||null;
    const back=exact(divs,'WRÓĆ DO SZCZEGÓŁU');

    /* NAZWA FIRMY — środek rzeczywistej ramki 53..799 / 311..398. */
    setBox(name,53,311,746,87); center(name,47,'#fff',950,false);

    /* META — każdy napis ma prostokąt równy swojej rzeczywistej części ramki. */
    setBox(country,105,398,150,61); center(country,22,'#fff',850,false);
    setBox(role,320,398,200,61); center(role,22,'#fff',850,false);
    setBox(priority,574,398,232,61); center(priority,20,'#fff',900,false);
    if(priority){
      const raw=norm(priority.textContent).toUpperCase();
      const val=raw.replace(/^PRIORYTET\\s*/,'').trim()||'—';
      const c=priorityColor(val);
      priority.innerHTML='<span style="color:#fff;font-weight:900">PRIORYTET</span><span style="display:inline-block;width:8px"></span><span style="color:'+c+';font-weight:950;text-shadow:0 0 8px '+c+'99,0 2px 5px #000">'+val.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</span>';
    }

    /* TRZY GUZIKI — tekst dostaje DOKŁADNIE pełny prostokąt ramki przycisku. */
    setBox(edit,38,1426,235,112); center(edit,22,'#22cfff',900,false);
    setBox(add,286,1426,250,112); center(add,22,'#fff04d',900,false);
    if(status){status.textContent='DO STATUSU\\nCRM';setBox(status,548,1426,255,112);center(status,20,'#ffb126',900,true);}

    /* DOLNY GUZIK — matematyczny środek pełnej zielonej ramki. */
    setBox(back,38,1560,765,135); center(back,33,'#fff',900,false);
  }

  let scheduled=false;
  function scheduleTune(){
    if(scheduled)return; scheduled=true;
    requestAnimationFrame(()=>requestAnimationFrame(()=>{scheduled=false;tune();}));
  }

  const observer=new MutationObserver(function(muts){
    if(muts.some(m=>m.addedNodes&&Array.from(m.addedNodes).some(n=>n.nodeType===1&&(n.matches?.('.r129-goals-live')||n.querySelector?.('.r129-goals-live')))))scheduleTune();
  });
  observer.observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener('load',()=>{setTimeout(tune,80);setTimeout(tune,220);});
  window.addEventListener('resize',scheduleTune);
  [80,220,500,900].forEach(ms=>setTimeout(tune,ms));
})();
</script>`;
    out = out.replace('</body>',script+'\n</body>');
  }
  return out;
};
