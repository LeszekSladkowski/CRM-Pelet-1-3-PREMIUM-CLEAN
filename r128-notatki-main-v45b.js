/* R128 v4.5H — NOTATKI O FIRMIE — THUMB SCROLL + AUTO CENTER ENGINE
   TYLKO ekran główny NOTATKI O FIRMIE.
   Grafika CLEAN PNG pozostaje nietknięta. Kod ustawia wyłącznie istniejące dane LIVE.
   ZERO masek, nakładek, nowych ramek, skrótów, wielokropków i ukrywania wierszy.

   Zakres 10.09.2026:
   1) ANPOL pozostaje w zaakceptowanej geometrii v4.5G.
   2) POLSKA / DOSTAWCA / PRIORYTET B pozostają bez zmian.
   3) Cztery białe pola treści zachowują wspólną oś X od końca kółek 1–4.
   4) Krótka treść centruje się pionowo w swojej bezpiecznej strefie.
   5) Dłuższa treść NIE zmniejsza czcionki — jest przewijana kciukiem góra/dół wewnątrz kafla.
   6) Scrollbar jest niewidoczny; brak zmian PNG, ikon, tytułów, kolorów, routingu i kart szczegółowych.
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

  function pct(v,base){return (v/base*100)+'%'}
  function fsize(v){
    const unit=(window.CSS&&CSS.supports&&CSS.supports('font-size','1cqw'))?'cqw':'vw';
    return (v/W*100).toFixed(3)+unit;
  }

  function ensureScrollCss(){
    if(document.getElementById('r128-v45h-scroll-css'))return;
    const st=document.createElement('style');
    st.id='r128-v45h-scroll-css';
    st.textContent='.r128-note-thumb-scroll::-webkit-scrollbar{width:0!important;height:0!important;display:none!important;}';
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

    /* Najpierw naturalny układ od góry, żeby pomiar scrollHeight był prawdziwy. */
    el.style.justifyContent='flex-start';

    requestAnimationFrame(function(){
      if(!el.isConnected)return;
      const fits=el.scrollHeight<=el.clientHeight+2;
      el.style.justifyContent=fits?'center':'flex-start';
      if(fits)el.scrollTop=0;
      el.dataset.scrollNeeded=fits?'0':'1';
    });
  }

  function bindTapOpen(el,s,index){
    if(el.dataset.tapOpenBound==='1')return;
    el.dataset.tapOpenBound='1';
    let sx=0,sy=0,st=0;
    el.addEventListener('pointerdown',function(ev){sx=ev.clientX;sy=ev.clientY;st=el.scrollTop;},{passive:true});
    el.addEventListener('pointerup',function(ev){
      const moved=Math.hypot(ev.clientX-sx,ev.clientY-sy);
      const scrolled=Math.abs(el.scrollTop-st);
      if(moved>8||scrolled>3)return;
      const label=MAIN_LABELS[index];
      const targets=Array.from(s.querySelectorAll('[aria-label]'));
      const target=targets.find(function(node){return node.getAttribute('aria-label')===label;});
      if(target&&typeof target.click==='function')target.click();
    },{passive:true});
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
      overscrollBehavior:'contain',
      touchAction:'pan-y',
      scrollbarWidth:'none',
      msOverflowStyle:'none',
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
    bindTapOpen(el,s,index);
  }

  function apply(){
    const s=document.querySelector('.r128-notes-live');
    if(!s||!isMainScreen(s))return;

    adjustHeader(s);
    const lists=findLists(s);
    if(lists.length!==4)return;
    lists.forEach(function(el,i){alignList(el,CFG[i],s,i)});

    s.dataset.v45hMainScroll='1';
    if(window.R128_NOTES)window.R128_NOTES.version='R128-v4.5H-thumb-scroll-auto-center';
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
