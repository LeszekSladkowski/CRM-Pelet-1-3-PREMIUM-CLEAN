/* R128 v4.5D — NOTATKI O FIRMIE — MAIN CARD FINAL SURGICAL ALIGNMENT
   TYLKO ekran główny NOTATKI O FIRMIE.
   Zasada bezwzględna: grafika pozostaje nietknięta; kod ustawia wyłącznie istniejące teksty LIVE.
   ZERO masek, nakładek, nowych ramek, skracania treści, wielokropków i kasowania wierszy.

   Zakres zatwierdzony 10.09.2026:
   1) ANPOL — większy, mocniejszy, idealnie centralny w istniejącym polu.
   2) POLSKA / DOSTAWCA / PRIORYTET B — lekko obniżone i idealnie wycentrowane w swojej ramce.
   3) Białe opisy kafli 1–4 — wszystkie istniejące pozycje zachowane 1:1 wraz z punktorami;
      wspólna oś startu tekstu przy dolnej części kółek 1–4; bez ukrywania któregokolwiek wpisu.
*/
(function(){
  'use strict';

  const MAIN_BG='file_00000000c0ac8210a2eab26769101d1e.png';
  const W=852,H=1846;

  /* ANPOL: powiększenie bez zmiany grafiki tła. */
  const NAME={x:154,y:304,w:544,h:88,size:56};

  /* Linia metadanych: całość odrobinę niżej, każda wartość w środku własnej części ramki. */
  const META=[
    {x:104,y:413,w:156,h:48,size:22},
    {x:318,y:413,w:214,h:48,size:22},
    {x:574,y:413,w:242,h:48,size:20}
  ];

  /* Białe opisy: wspólny rytm i czytelność. ŻADNE max/line-clamp/ellipsis.
     Każdy blok ma pełną bezpieczną wysokość wewnątrz swojego istniejącego kafla. */
  const CFG=[
    {x:250,y:548,w:474,h:150,size:27,gap:7},
    {x:250,y:793,w:474,h:132,size:27,gap:7},
    {x:250,y:1038,w:474,h:156,size:25,gap:8},
    {x:250,y:1283,w:474,h:124,size:27,gap:7}
  ];

  function pct(v,base){return (v/base*100)+'%'}
  function fsize(v){
    const unit=(window.CSS&&CSS.supports&&CSS.supports('font-size','1cqw'))?'cqw':'vw';
    return (v/W*100).toFixed(3)+unit;
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
      overflow:'visible'
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

  function alignList(el,cfg){
    /* Ruszamy tylko geometrię i typografię kontenera. Treści nie dotykamy. */
    Object.assign(el.style,{
      left:pct(cfg.x,W),
      top:pct(cfg.y,H),
      width:pct(cfg.w,W),
      height:pct(cfg.h,H),
      fontSize:fsize(cfg.size),
      lineHeight:'1.14',
      fontWeight:'800',
      letterSpacing:'0',
      textShadow:'0 2px 5px #000,0 0 7px #000',
      overflow:'hidden',
      color:'#fff',
      boxSizing:'border-box',
      overflowWrap:'break-word',
      wordBreak:'normal'
    });

    /* Każdy istniejący wiersz zostaje widoczny i zachowuje oryginalny punktor „•”. */
    Array.from(el.children).forEach(function(r){
      Object.assign(r.style,{
        display:'block',
        margin:'0 0 '+cfg.gap+'px 0',
        padding:'0',
        lineHeight:'1.14',
        fontWeight:'800',
        whiteSpace:'normal',
        overflow:'visible',
        textOverflow:'clip',
        WebkitLineClamp:'unset',
        WebkitBoxOrient:'initial'
      });
    });
  }

  function apply(){
    const s=document.querySelector('.r128-notes-live');
    if(!s||!isMainScreen(s)||s.dataset.v45dMainAlign==='1')return;

    adjustHeader(s);

    const lists=findLists(s);
    if(lists.length!==4)return;
    lists.forEach(function(el,i){alignList(el,CFG[i])});

    s.dataset.v45dMainAlign='1';
    if(window.R128_NOTES)window.R128_NOTES.version='R128-v4.5D-main-card-final-surgical-alignment';
  }

  function schedule(){requestAnimationFrame(function(){requestAnimationFrame(apply)})}

  const app=document.querySelector('#app');
  if(app){
    new MutationObserver(schedule).observe(app,{childList:true,subtree:true});
  }else{
    new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});
  }
  schedule();
})();
