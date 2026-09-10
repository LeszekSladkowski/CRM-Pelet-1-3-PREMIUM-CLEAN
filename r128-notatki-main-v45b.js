/* R128 v4.5B — NOTATKI O FIRMIE — MAIN CARD CLEAN TYPOGRAPHY PATCH
   Tylko ekran główny NOTATKI O FIRMIE. Nie rusza PNG, danych, hotspotów ani kart szczegółowych.
*/
(function(){
  'use strict';

  const MAIN_BG='file_00000000c0ac8210a2eab26769101d1e.png';
  const W=852,H=1846;

  const CFG=[
    {x:250,y:612,w:460,h:118,size:27,max:2,gap:7},
    {x:250,y:858,w:460,h:118,size:27,max:2,gap:7},
    {x:250,y:1110,w:460,h:120,size:25,max:2,gap:5},
    {x:250,y:1352,w:460,h:100,size:27,max:2,gap:6}
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

  function findLists(s){
    return Array.from(s.children).filter(function(el){
      if(el.tagName!=='DIV')return false;
      return Array.from(el.children).some(function(ch){return ch.tagName==='DIV'&&/^•\s*/.test((ch.textContent||'').trim())});
    }).slice(0,4);
  }

  function cleanList(el,cfg){
    Object.assign(el.style,{
      left:pct(cfg.x,W),
      top:pct(cfg.y,H),
      width:pct(cfg.w,W),
      height:pct(cfg.h,H),
      fontSize:fsize(cfg.size),
      lineHeight:'1.16',
      fontWeight:'760',
      letterSpacing:'0',
      textShadow:'0 1px 2px rgba(0,0,0,.95)',
      overflow:'hidden',
      color:'#fff',
      boxSizing:'border-box'
    });

    const rows=Array.from(el.children);
    rows.forEach(function(r,i){
      if(i>=cfg.max){r.style.display='none';return;}
      r.textContent=String(r.textContent||'').replace(/^•\s*/, '').trim();
      Object.assign(r.style,{
        display:'-webkit-box',
        WebkitBoxOrient:'vertical',
        WebkitLineClamp:'2',
        overflow:'hidden',
        margin:'0 0 '+cfg.gap+'px 0',
        padding:'0',
        lineHeight:'1.16',
        fontWeight:'760'
      });
    });
  }

  function apply(){
    const s=document.querySelector('.r128-notes-live');
    if(!s||!isMainScreen(s)||s.dataset.v45bMainClean==='1')return;
    const lists=findLists(s);
    if(lists.length!==4)return;
    lists.forEach(function(el,i){cleanList(el,CFG[i])});
    s.dataset.v45bMainClean='1';
    if(window.R128_NOTES)window.R128_NOTES.version='R128-v4.5B-main-card-clean-typography';
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
