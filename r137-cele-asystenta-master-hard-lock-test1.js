/* R137 TEST 1 — CELE ASYSTENTA — MASTER HARD LOCK 1:1
   Źródło prawdy: zatwierdzony wzorzec użytkownika 709x1536 odpowiadający rasterowi 852x1846.
   Cel: przerwać konflikt R133/R134/R135/R136 i wymusić JEDNĄ końcową geometrię przez style !important.
   Zmiany dotyczą wyłącznie warstwy LIVE CELE ASYSTENTA. Raster, hotspoty, dane i funkcje pozostają bez zmian.
*/

const r137HardLockBasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r137HardLockBasePatchIndexHtml(text);
  if(typeof out !== 'string' || !out) return out;

  out = out.replaceAll('1.3.0-test-r136-cele-master-geometry-restore-1to1','1.3.0-test-r137-cele-master-hard-lock-1to1');
  out = out.replaceAll('R136 TEST 1 — CELE ASYSTENTA MASTER GEOMETRY RESTORE 1:1','R137 TEST 1 — CELE ASYSTENTA MASTER HARD LOCK 1:1');
  out = out.replace(/const BUILD_DATE = '[^']*';/,"const BUILD_DATE = '11.09.2026';");
  out = out.replace(/const BUILD_TIME = '[^']*';/,"const BUILD_TIME = '19:03';");
  out = out.replace(/sw\.js\?v=[^'\"]+/g,'sw.js?v=R137-test1-cele-master-hard-lock-1903');
  out = out.replace(/r84-backup-prune\.js\?v=[^'\"]+/g,'r84-backup-prune.js?v=R137-test1-1903');

  if(!out.includes('id="r137-cele-master-hard-lock-test1"')){
    const script = `
<script id="r137-cele-master-hard-lock-test1">
(function(){
  'use strict';
  const W=852,H=1846;
  const pct=(v,b)=>(v/b*100)+'%';
  const fsize=v=>((v/W)*100).toFixed(3)+'cqw';
  const I=(el,p,v)=>{if(el)el.style.setProperty(p,v,'important');};

  function box(el,x,y,w,h,size,opt={}){
    if(!el)return;
    I(el,'position','absolute');
    I(el,'left',pct(x,W)); I(el,'top',pct(y,H)); I(el,'width',pct(w,W)); I(el,'height',pct(h,H));
    I(el,'box-sizing','border-box'); I(el,'display','flex'); I(el,'align-items','center');
    I(el,'justify-content',opt.center?'center':'flex-start'); I(el,'text-align',opt.center?'center':'left');
    I(el,'font-size',fsize(size)); I(el,'font-weight',String(opt.weight||850));
    I(el,'line-height',String(opt.line||1.14)); I(el,'white-space',opt.pre?'pre-line':(opt.nowrap?'nowrap':'normal'));
    I(el,'padding','0'); I(el,'margin','0'); I(el,'overflow','hidden');
    I(el,'overflow-wrap','break-word'); I(el,'word-break','normal');
    I(el,'text-shadow','0 2px 5px #000,0 0 7px #000');
    if(opt.color)I(el,'color',opt.color);
    if(opt.scaleX){I(el,'transform','scaleX('+opt.scaleX+')');I(el,'transform-origin',opt.center?'center center':'left center');}
    else I(el,'transform','none');
  }

  function tune(){
    const root=document.querySelector('.r129-goals-live');
    if(!root)return;
    const d=Array.from(root.children).filter(el=>el&&el.tagName==='DIV');
    if(d.length<14)return;
    const [name,country,role,priority,listTitle,list,priorityTitle,priorityBody,nextTitle,nextBody,edit,add,status,back]=d;

    /* NAZWA FIRMY — środek wzorca MASTER, bez przesunięcia pionowego. */
    box(name,80,311,692,76,58,{center:true,weight:950,nowrap:true,scaleX:.97});

    /* META — jedna oś wzorca; PRIORYTET pozostaje biały + wartość kolorowa z R133. */
    box(country,105,411,150,50,27,{center:true,weight:800,nowrap:true,scaleX:.82});
    box(role,320,411,200,50,27,{center:true,weight:800,nowrap:true,scaleX:.82});
    box(priority,574,411,232,50,23,{center:true,weight:900,nowrap:true,scaleX:.90});

    /* LISTA CELÓW — pozycja, skala i rytm z zatwierdzonego obrazu MASTER. */
    box(listTitle,205,510,555,54,50,{weight:950,color:'#ffd43b'});
    if(list){
      I(list,'left',pct(205,W));I(list,'top',pct(580,H));I(list,'width',pct(555,W));I(list,'height',pct(420,H));
      I(list,'font-size',fsize(33));I(list,'font-weight','820');I(list,'line-height','1.14');
      I(list,'padding','0 8px 0 0');I(list,'margin','0');I(list,'text-align','left');I(list,'transform','none');
      Array.from(list.children).forEach(row=>{
        I(row,'margin','0 0 16px 0');I(row,'padding','0');I(row,'line-height','1.14');I(row,'text-align','left');
      });
    }

    /* CZERWONY KAFEL. */
    box(priorityTitle,205,1047,555,54,40,{weight:950,color:'#ff4a4a'});
    box(priorityBody,205,1112,555,92,33,{weight:850,line:1.16});

    /* ZIELONY KAFEL. */
    box(nextTitle,205,1264,555,54,40,{weight:950,color:'#39ff67'});
    box(nextBody,205,1321,555,88,33,{weight:850,line:1.16});

    /* AKCJE — podpisy ustawione względem faktycznych środków trzech kafli MASTER. */
    box(edit,106,1472,180,58,28,{center:true,weight:900,color:'#22cfff',nowrap:true,scaleX:.80});
    box(add,359,1472,180,58,28,{center:true,weight:900,color:'#fff04d',nowrap:true,scaleX:.80});
    box(status,631,1455,190,96,24,{center:true,weight:900,color:'#ffb126',pre:true,line:1.05,scaleX:.90});

    /* DOLNY POWRÓT — środek optyczny wzorca, nie matematyczny środek starej warstwy. */
    box(back,190,1597,558,96,40,{center:true,weight:900,nowrap:true,scaleX:.92});
  }

  function install(){
    const api=window.R129_GOALS;
    if(api&&typeof api.open==='function'&&!api.__r137HardLock){
      const original=api.open;
      api.open=function(){
        const r=original.apply(this,arguments);
        requestAnimationFrame(()=>requestAnimationFrame(tune));
        setTimeout(tune,80);
        return r;
      };
      api.__r137HardLock=true;
    }
    tune();
  }

  [0,80,180,350,700].forEach(ms=>setTimeout(install,ms));
  window.addEventListener('resize',()=>requestAnimationFrame(tune));
})();
</script>`;
    out = out.replace('</body>',script+'\n</body>');
  }

  return out;
};
