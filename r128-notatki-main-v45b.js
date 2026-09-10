/* R128 v4.5I — NOTATKI O FIRMIE — SOFT KINETIC THUMB SCROLL
   TYLKO ekran główny NOTATKI O FIRMIE.
   Grafika CLEAN PNG pozostaje nietknięta. Kod ustawia wyłącznie istniejące dane LIVE.
   ZERO masek, nakładek, nowych ramek, skrótów, wielokropków i ukrywania wierszy.

   Zakres 10.09.2026:
   1) ANPOL pozostaje w zaakceptowanej geometrii v4.5G.
   2) POLSKA / DOSTAWCA / PRIORYTET B pozostają bez zmian.
   3) Cztery białe pola treści zachowują wspólną oś X od końca kółek 1–4.
   4) Krótka treść centruje się pionowo w swojej bezpiecznej strefie.
   5) Dłuższa treść NIE zmniejsza czcionki — jest przewijana kciukiem góra/dół wewnątrz kafla.
   6) Ruch palca ma własną łagodną bezwładność: lekki gest = płynne wyhamowanie, bez twardego zatrzymania.
   7) Scrollbar jest niewidoczny; brak zmian PNG, ikon, tytułów, kolorów, routingu i kart szczegółowych.
*/
(function(){
  'use strict';

  const MAIN_BG='file_00000000c0ac8210a2eab26769101d1e.png';
  const W=852,H=1846;
  const MAIN_LABELS=['KLUCZOWE FAKTY','PARAMETRY OFERTY','WNIOSKI HANDLOWE','FAKTY DO ROZMOWY'];

  /* ANPOL — zaakceptowana geometria z v4.5G. */
  const NAME={x:154,y:304,w:544,h:88,size:56,scaleX:1};

  /* Linia metadanych — bez zmian. */
  const META=[
    {x:104,y:413,w:156,h:48,size:22},
    {x:318,y:413,w:214,h:48,size:22},
    {x:574,y:413,w:242,h:48,size:20}
  ];

  /* Jedna wspólna oś tekstu: x=250. Każdy kafel ma własną bezpieczną strefę przewijania. */
  const CFG=[
    {x:250,y:548,w:474,h:160,size:31,gap:7,line:'1.12'},
    {x:250,y:794,w:474,h:154,size:31,gap:7,line:'1.12'},
    {x:250,y:1038,w:474,h:166,size:31,gap:7,line:'1.12'},
    {x:250,y:1288,w:474,h:128,size:31,gap:7,line:'1.12'}
  ];

  const kineticState=new WeakMap();

  function pct(v,base){return (v/base*100)+'%'}
  function fsize(v){
    const unit=(window.CSS&&CSS.supports&&CSS.supports('font-size','1cqw'))?'cqw':'vw';
    return (v/W*100).toFixed(3)+unit;
  }

  function ensureScrollCss(){
    if(document.getElementById('r128-v45i-scroll-css'))return;
    const st=document.createElement('style');
    st.id='r128-v45i-scroll-css';
    st.textContent='\n      .r128-note-thumb-scroll::-webkit-scrollbar{width:0!important;height:0!important;display:none!important;}\n      .r128-note-thumb-scroll{scrollbar-width:none!important;-ms-overflow-style:none!important;}\n    ';
    document.head.append(st);
  }

  function isMainScreen(s){
    const img=s&&s.querySelector('img.master');
    return !!(img&&String(img.getAttribute('src')||img.src||'').includes(MAIN_BG));
  }

  function directAbsoluteDivs(s){
    return Array.from(s.children).filter(function(el){
      return el.tagName==='DIV' && el.style.position==='absolute';
    });
  }

  function adjustHeader(s){
    const divs=directAbsoluteDivs(s);
    const header=divs.filter(function(el){
      const t=parseFloat(el.style.top||'100');
      return Number.isFinite(t) && t<26;
    });
    if(header.length<4)return;

    const name=header[0];
    Object.assign(name.style,{
      left:pct(NAME.x,W),
      top:pct(NAME.y,H),
      width:pct(NAME.w,W),
      height:pct(NAME.h,H),
      fontSize:fsize(NAME.size),
      lineHeight:'1',
      fontWeight:'950',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      textAlign:'center',
      whiteSpace:'nowrap',
      textOverflow:'clip',
      overflow:'visible',
      transform:'scaleX('+NAME.scaleX+')',
      transformOrigin:'center center'
    });

    header.slice(1,4).forEach(function(el,i){
      const m=META[i];
      Object.assign(el.style,{
        left:pct(m.x,W),
        top:pct(m.y,H),
        width:pct(m.w,W),
        height:pct(m.h,H),
        fontSize:fsize(m.size),
        lineHeight:'1',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center',
        whiteSpace:'nowrap',
        textOverflow:'clip',
        overflow:'visible'
      });
    });
  }

  function findLists(s){
    return Array.from(s.children).filter(function(el){
      if(el.tagName!=='DIV')return false;
      return Array.from(el.children).some(function(ch){
        return ch.tagName==='DIV' && /^•\s*/.test((ch.textContent||'').trim());
      });
    }).slice(0,4);
  }

  function setVerticalMode(el){
    if(!el||!el.isConnected)return;

    /* Naturalny układ od góry daje prawdziwy pomiar scrollHeight. */
    el.style.justifyContent='flex-start';

    requestAnimationFrame(function(){
      if(!el.isConnected)return;
      const fits=el.scrollHeight<=el.clientHeight+2;
      el.style.justifyContent=fits?'center':'flex-start';
      if(fits)el.scrollTop=0;
      else el.scrollTop=Math.max(0,Math.min(el.scrollTop,el.scrollHeight-el.clientHeight));
      el.dataset.scrollNeeded=fits?'0':'1';
    });
  }

  function stopKinetic(el){
    const st=kineticState.get(el);
    if(!st)return;
    if(st.raf){cancelAnimationFrame(st.raf);st.raf=0;}
    st.velocity=0;
  }

  function maxScroll(el){return Math.max(0,el.scrollHeight-el.clientHeight)}

  function startInertia(el){
    const st=kineticState.get(el);
    if(!st||Math.abs(st.velocity)<0.025||maxScroll(el)<=0)return;
    let last=performance.now();

    const frame=function(now){
      if(!el.isConnected){st.raf=0;return;}
      const dt=Math.min(32,Math.max(1,now-last));
      last=now;

      const max=maxScroll(el);
      const next=el.scrollTop+st.velocity*dt;
      if(next<=0){
        el.scrollTop=0;
        st.velocity*=0.30;
      }else if(next>=max){
        el.scrollTop=max;
        st.velocity*=0.30;
      }else{
        el.scrollTop=next;
      }

      /* Miękkie, dłuższe wyhamowanie — ok. 6% utraty prędkości na klatkę 60 Hz. */
      st.velocity*=Math.pow(0.94,dt/16.667);

      if(Math.abs(st.velocity)<0.018){st.velocity=0;st.raf=0;return;}
      st.raf=requestAnimationFrame(frame);
    };

    st.raf=requestAnimationFrame(frame);
  }

  function bindSoftScrollAndTap(el,s,index){
    if(el.dataset.softScrollBound==='1')return;
    el.dataset.softScrollBound='1';

    const st={pointerId:null,lastY:0,lastT:0,startX:0,startY:0,startScroll:0,velocity:0,moved:false,raf:0};
    kineticState.set(el,st);

    el.addEventListener('pointerdown',function(ev){
      if(ev.pointerType==='mouse'&&ev.button!==0)return;
      stopKinetic(el);
      st.pointerId=ev.pointerId;
      st.lastY=ev.clientY;
      st.lastT=performance.now();
      st.startX=ev.clientX;
      st.startY=ev.clientY;
      st.startScroll=el.scrollTop;
      st.velocity=0;
      st.moved=false;
      try{el.setPointerCapture(ev.pointerId)}catch(_){ }
    },{passive:true});

    el.addEventListener('pointermove',function(ev){
      if(st.pointerId!==ev.pointerId)return;
      if(ev.pointerType==='touch'&&ev.isPrimary===false)return;
      const now=performance.now();
      const dy=ev.clientY-st.lastY;
      const dt=Math.max(1,now-st.lastT);
      const totalMove=Math.hypot(ev.clientX-st.startX,ev.clientY-st.startY);

      if(totalMove>5)st.moved=true;
      if(st.moved&&maxScroll(el)>0){
        const before=el.scrollTop;
        const target=Math.max(0,Math.min(maxScroll(el),before-dy));
        el.scrollTop=target;

        /* Wygładzona prędkość palca, dodatnia = treść jedzie w dół. */
        const instant=(st.lastY-ev.clientY)/dt;
        st.velocity=st.velocity*0.66+instant*0.34;
        if(ev.cancelable)ev.preventDefault();
      }

      st.lastY=ev.clientY;
      st.lastT=now;
    },{passive:false});

    function finish(ev,cancelled){
      if(st.pointerId!==ev.pointerId)return;
      try{el.releasePointerCapture(ev.pointerId)}catch(_){ }
      st.pointerId=null;

      const moved=Math.hypot(ev.clientX-st.startX,ev.clientY-st.startY);
      const scrolled=Math.abs(el.scrollTop-st.startScroll);

      if(!cancelled&&st.moved&&scrolled>1){
        startInertia(el);
        return;
      }

      if(!cancelled&&moved<=8&&scrolled<=3){
        const label=MAIN_LABELS[index];
        const targets=Array.from(s.querySelectorAll('[aria-label]'));
        const target=targets.find(function(node){return node.getAttribute('aria-label')===label;});
        if(target&&typeof target.click==='function')target.click();
      }
    }

    el.addEventListener('pointerup',function(ev){finish(ev,false)},{passive:true});
    el.addEventListener('pointercancel',function(ev){finish(ev,true)},{passive:true});
  }

  function alignList(el,cfg,s,index){
    ensureScrollCss();
    el.classList.add('r128-note-thumb-scroll');

    Object.assign(el.style,{
      left:pct(cfg.x,W),
      top:pct(cfg.y,H),
      width:pct(cfg.w,W),
      height:pct(cfg.h,H),
      fontSize:fsize(cfg.size),
      lineHeight:cfg.line,
      fontWeight:'800',
      letterSpacing:'0',
      textShadow:'0 2px 5px #000,0 0 7px #000',
      overflowX:'hidden',
      overflowY:'auto',
      color:'#fff',
      boxSizing:'border-box',
      overflowWrap:'break-word',
      wordBreak:'normal',
      padding:'0 8px 0 0',
      margin:'0',
      display:'flex',
      flexDirection:'column',
      justifyContent:'flex-start',
      WebkitOverflowScrolling:'touch',
      overscrollBehavior:'none',
      touchAction:'pinch-zoom',
      scrollbarWidth:'none',
      msOverflowStyle:'none',
      scrollBehavior:'auto',
      pointerEvents:'auto',
      zIndex:'45'
    });

    Array.from(el.children).forEach(function(r){
      Object.assign(r.style,{
        display:'block',
        flex:'0 0 auto',
        margin:'0 0 '+cfg.gap+'px 0',
        padding:'0',
        fontSize:'inherit',
        lineHeight:cfg.line,
        fontWeight:'800',
        whiteSpace:'normal',
        overflow:'visible',
        textOverflow:'clip',
        WebkitLineClamp:'unset',
        WebkitBoxOrient:'initial'
      });
    });

    setVerticalMode(el);
    bindSoftScrollAndTap(el,s,index);
  }

  function apply(){
    const s=document.querySelector('.r128-notes-live');
    if(!s||!isMainScreen(s))return;

    adjustHeader(s);
    const lists=findLists(s);
    if(lists.length!==4)return;
    lists.forEach(function(el,i){alignList(el,CFG[i],s,i)});

    s.dataset.v45iMainScroll='1';
    if(window.R128_NOTES)window.R128_NOTES.version='R128-v4.5I-soft-kinetic-thumb-scroll';
  }

  function schedule(){
    requestAnimationFrame(function(){requestAnimationFrame(apply)});
    setTimeout(apply,90);
    setTimeout(apply,220);
    setTimeout(apply,500);
    setTimeout(apply,900);
  }

  const app=document.querySelector('#app');
  if(app){
    new MutationObserver(schedule).observe(app,{childList:true,subtree:true});
  }else{
    new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});
  }
  schedule();
})();
