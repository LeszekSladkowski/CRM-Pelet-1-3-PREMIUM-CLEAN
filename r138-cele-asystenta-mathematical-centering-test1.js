/* R138 TEST 1 — CELE ASYSTENTA — MATHEMATICAL CENTERING 1:1
   Cel: wyłącznie chirurgiczne wyśrodkowanie warstwy LIVE względem FAKTYCZNYCH ramek/kafli rastra MASTER 852x1846.
   Zasada: mierzymy granice ramki, wyznaczamy środek i osadzamy napis względem środka. Bez ruszania rastra, ikon, hotspotów, danych i funkcji.
*/

const r138CenterBasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r138CenterBasePatchIndexHtml(text);
  if(typeof out !== 'string' || !out) return out;

  [
    '1.3.0-test-r136-cele-master-geometry-restore-1to1',
    '1.3.0-test-r137-cele-master-hard-lock-1to1'
  ].forEach(v=>{ out=out.replaceAll(v,'1.3.0-test-r138-cele-mathematical-centering-1to1'); });
  [
    'R136 TEST 1 — CELE ASYSTENTA MASTER GEOMETRY RESTORE 1:1',
    'R137 TEST 1 — CELE ASYSTENTA MASTER HARD LOCK 1:1'
  ].forEach(v=>{ out=out.replaceAll(v,'R138 TEST 1 — CELE ASYSTENTA MATHEMATICAL CENTERING 1:1'); });
  out = out.replace(/const BUILD_DATE = '[^']*';/,"const BUILD_DATE = '11.09.2026';");
  out = out.replace(/const BUILD_TIME = '[^']*';/,"const BUILD_TIME = '19:14';");
  out = out.replace(/sw\.js\?v=[^'\"]+/g,'sw.js?v=R138-test1-cele-mathematical-centering-1914');
  out = out.replace(/r84-backup-prune\.js\?v=[^'\"]+/g,'r84-backup-prune.js?v=R138-test1-1914');

  if(!out.includes('id="r138-cele-mathematical-centering-test1"')){
    const script = `
<script id="r138-cele-mathematical-centering-test1">
(function(){
  'use strict';
  const W=852,H=1846;
  const pct=(v,b)=>(v/b*100)+'%';
  const fs=v=>((v/W)*100).toFixed(3)+'cqw';
  const imp=(el,p,v)=>{ if(el) el.style.setProperty(p,v,'important'); };
  const norm=v=>String(v||'').replace(/\\s+/g,' ').trim();

  function place(el,x,y,w,h,size,opt={}){
    if(!el) return;
    imp(el,'position','absolute');
    imp(el,'left',pct(x,W)); imp(el,'top',pct(y,H));
    imp(el,'width',pct(w,W)); imp(el,'height',pct(h,H));
    imp(el,'box-sizing','border-box');
    imp(el,'display','flex'); imp(el,'align-items','center');
    imp(el,'justify-content',opt.centerX?'center':'flex-start');
    imp(el,'text-align',opt.centerX?'center':'left');
    imp(el,'padding','0'); imp(el,'margin','0');
    imp(el,'font-size',fs(size)); imp(el,'font-weight',String(opt.weight||850));
    imp(el,'line-height',String(opt.line||1.14));
    imp(el,'white-space',opt.pre?'pre-line':(opt.nowrap?'nowrap':'normal'));
    imp(el,'overflow','hidden'); imp(el,'overflow-wrap','break-word'); imp(el,'word-break','normal');
    imp(el,'transform','none');
    imp(el,'text-shadow','0 2px 5px #000,0 0 7px #000');
    if(opt.color) imp(el,'color',opt.color);
  }

  function exact(divs,label){ return divs.find(el=>norm(el.textContent)===label)||null; }
  function priorityColor(v){
    const p=String(v||'').trim().toUpperCase();
    if(p==='A+') return '#ff3b30';
    if(p==='A') return '#39ff67';
    if(p==='B') return '#35bfff';
    return '#ffffff';
  }

  function tune(){
    const root=document.querySelector('.r129-goals-live');
    if(!root) return;
    const divs=Array.from(root.children).filter(el=>el&&el.tagName==='DIV');
    const list=root.querySelector('.r129-goals-scroll');

    const listTitle=exact(divs,'LISTA CELÓW');
    const priorityTitle=exact(divs,'CEL PRIORYTETOWY');
    const nextTitle=exact(divs,'NASTĘPNY KROK');
    const edit=exact(divs,'EDYTUJ CEL');
    const add=exact(divs,'DODAJ CEL');
    const status=divs.find(el=>norm(el.textContent)==='DO STATUSU CRM')||null;
    const back=exact(divs,'WRÓĆ DO SZCZEGÓŁU');

    /* Pierwsze cztery dynamiczne pola w R129: nazwa, kraj, rola, priorytet. */
    const dyn=divs.filter(el=>![listTitle,priorityTitle,nextTitle,edit,add,status,back,list].includes(el));
    const name=dyn[0]||null;
    const country=dyn[1]||null;
    const role=dyn[2]||null;
    const priority=dyn[3]||null;

    /* NAZWA FIRMY — cała ramka 53..799 / 311..398, więc środek matematyczny = (426, 354.5). */
    place(name,53,311,746,87,47,{centerX:true,weight:950,nowrap:true});

    /* META — pion dokładnie w środku wspólnej ramki 398..459. Poziome osie zachowują ikony rastra. */
    place(country,105,398,150,61,22,{centerX:true,weight:850,nowrap:true});
    place(role,320,398,200,61,22,{centerX:true,weight:850,nowrap:true});
    place(priority,574,398,232,61,20,{centerX:true,weight:900,nowrap:true});
    if(priority){
      const raw=norm(priority.textContent).toUpperCase();
      const val=raw.replace(/^PRIORYTET\\s*/,'').trim()||'—';
      const c=priorityColor(val);
      priority.innerHTML='<span style="color:#fff;font-weight:900">PRIORYTET</span><span style="display:inline-block;width:8px"></span><span style="color:'+c+';font-weight:950;text-shadow:0 0 8px '+c+'99,0 2px 5px #000">'+val.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</span>';
    }

    /* LISTA — pozostaje w zatwierdzonym lewym układzie MASTER; tylko bez dalszych transformacji. */
    place(listTitle,205,506,555,54,41,{weight:950,color:'#ffd43b'});
    if(list){
      imp(list,'left',pct(205,W)); imp(list,'top',pct(570,H));
      imp(list,'width',pct(555,W)); imp(list,'height',pct(430,H));
      imp(list,'font-size',fs(30)); imp(list,'font-weight','820'); imp(list,'line-height','1.22');
      imp(list,'padding','0 8px 0 0'); imp(list,'margin','0'); imp(list,'text-align','left'); imp(list,'transform','none');
      Array.from(list.children).forEach(row=>{
        imp(row,'margin','0 0 13px 0'); imp(row,'padding','0'); imp(row,'line-height','1.22'); imp(row,'text-align','left');
      });
    }

    /* CZERWONY KAFEL: rzeczywista ramka 1042..1211. Tytuł i opis dostają własne równe osie. */
    place(priorityTitle,205,1042,555,60,36,{weight:950,color:'#ff4a4a'});
    const priorityBody=divs.find(el=>{
      const t=norm(el.textContent); return t && el!==priorityTitle && t!=='LISTA CELÓW' && t!=='NASTĘPNY KROK' && t!=='EDYTUJ CEL' && t!=='DODAJ CEL' && t!=='DO STATUSU CRM' && t!=='WRÓĆ DO SZCZEGÓŁU' && parseFloat(el.style.top||'0')>55 && parseFloat(el.style.top||'0')<68;
    })||null;
    place(priorityBody,205,1102,555,109,30,{weight:850,line:1.16});

    /* ZIELONY KAFEL: rzeczywista ramka 1227..1395 — identyczna geometria względem własnej ramki jak czerwony. */
    place(nextTitle,205,1227,555,60,36,{weight:950,color:'#39ff67'});
    const nextBody=divs.find(el=>{
      const t=norm(el.textContent); return t && el!==nextTitle && /HISTORII|Przygotować kontakt/i.test(t);
    })||null;
    place(nextBody,205,1287,555,108,30,{weight:850,line:1.16});

    /* TRZY GUZIKI AKCYJNE — TU JEST ŚCISŁE CENTROWANIE: tekst dostaje dokładnie prostokąt całego kafla. */
    place(edit,52,1413,235,104,22,{centerX:true,weight:900,color:'#22cfff',nowrap:true});
    place(add,298,1413,249,104,22,{centerX:true,weight:900,color:'#fff04d',nowrap:true});
    if(status){ status.textContent='DO STATUSU\\nCRM'; }
    place(status,558,1413,242,104,20,{centerX:true,weight:900,color:'#ffb126',pre:true,line:1.05});

    /* WRÓĆ DO SZCZEGÓŁU — cały zielony kafel 53..799 / 1548..1674; napis ma dokładnie jego środek. */
    place(back,53,1548,746,126,33,{centerX:true,weight:900,nowrap:true});
  }

  function install(){
    const api=window.R129_GOALS;
    if(api&&typeof api.open==='function'&&!api.__r138Center){
      const original=api.open;
      api.open=function(){
        const r=original.apply(this,arguments);
        requestAnimationFrame(()=>requestAnimationFrame(tune));
        setTimeout(tune,80); setTimeout(tune,180);
        return r;
      };
      api.__r138Center=true;
    }
    tune();
  }

  [0,60,140,260,500,900].forEach(ms=>setTimeout(install,ms));
  window.addEventListener('resize',()=>requestAnimationFrame(tune));
})();
</script>`;
    out = out.replace('</body>',script+'\n</body>');
  }
  return out;
};
