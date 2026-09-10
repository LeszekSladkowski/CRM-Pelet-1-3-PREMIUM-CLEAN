/* R128 v4.5F — NOTATKI O FIRMIE — FINAL SURGICAL BASELINE ALIGNMENT
   TYLKO ekran główny NOTATKI O FIRMIE.
   Grafika CLEAN PNG pozostaje nietknięta. Kod ustawia wyłącznie istniejące dane LIVE.
   ZERO masek, nakładek, nowych ramek, skrótów, wielokropków i ukrywania wierszy.

   Zakres 10.09.2026:
   1) ANPOL pozostaje bez zmian — użytkownik zaakceptował jego położenie i wielkość.
   2) POLSKA / DOSTAWCA / PRIORYTET B pozostają na wspólnej osi w swojej ramce.
   3) Białe opisy kafli 1–4 mają identyczny rytm: jedna wspólna oś X, jedna typografia,
      a pierwszy biały wiersz każdego kafla jest opuszczony do poziomu końca kółka z numerem 1–4.
   4) Pełna treść zostaje zachowana; poprawka nie dotyka PNG, tytułów kafli, ikon, hotspotów ani routingu.
*/
(function(){
  'use strict';

  const MAIN_BG='file_00000000c0ac8210a2eab26769101d1e.png';
  const W=852,H=1846;

  /* ANPOL — ZAMROŻONE w zaakceptowanej pozycji. */
  const NAME={x:146,y:280,w:560,h:92,size:66,scaleX:1.08};

  /* Linia metadanych — wspólna oś w istniejącej ramce. */
  const META=[
    {x:104,y:413,w:156,h:48,size:22},
    {x:318,y:413,w:214,h:48,size:22},
    {x:574,y:413,w:242,h:48,size:20}
  ];

  /* FINALNA SIATKA BIAŁYCH OPISÓW.
     X jest identyczne w każdym kaflu. Y zostało opuszczone o 20 px względem v4.5E,
     tak aby biały opis nie wchodził w kolorowy tytuł i zaczynał się przy dolnej osi kółka numeru.
     Typografia jest wspólna dla wszystkich czterech kafli. */
  const CFG=[
    {x:250,y:560,w:474,h:162,size:31,gap:5,line:'1.08'},
    {x:250,y:806,w:474,h:150,size:31,gap:5,line:'1.08'},
    {x:250,y:1050,w:474,h:162,size:31,gap:5,line:'1.08'},
    {x:250,y:1302,w:474,h:126,size:31,gap:5,line:'1.08'}
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

  function alignList(el,cfg){
    Object.assign(el.style,{
      left:pct(cfg.x,W),
      top:pct(cfg.y,H),
      width:pct(cfg.w,W),
      height:pct(cfg.h,H),
      fontSize:fsize(cfg.size),
      lineHeight:cfg.line,
      fontWeight:'900',
      letterSpacing:'0',
      textShadow:'0 2px 5px #000,0 0 7px #000',
      overflow:'hidden',
      color:'#fff',
      boxSizing:'border-box',
      overflowWrap:'break-word',
      wordBreak:'normal',
      padding:'0',
      margin:'0'
    });

    Array.from(el.children).forEach(function(r){
      Object.assign(r.style,{
        display:'block',
        margin:'0 0 '+cfg.gap+'px 0',
        padding:'0',
        fontSize:'inherit',
        lineHeight:cfg.line,
        fontWeight:'900',
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
    if(!s||!isMainScreen(s))return;

    adjustHeader(s);
    const lists=findLists(s);
    if(lists.length!==4)return;
    lists.forEach(function(el,i){alignList(el,CFG[i])});

    s.dataset.v45fMainAlign='1';
    if(window.R128_NOTES)window.R128_NOTES.version='R128-v4.5F-main-card-final-surgical-baseline';
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
