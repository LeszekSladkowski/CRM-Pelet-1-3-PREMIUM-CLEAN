/* R128 v4.5C — NOTATKI O FIRMIE — MAIN CARD SURGICAL ALIGNMENT
   Tylko ekran główny NOTATKI O FIRMIE.
   Bez nowych ramek, masek i nakładek. Nie rusza PNG, danych, hotspotów ani kart szczegółowych.
   Zakres: większa nazwa firmy, idealne wycentrowanie linii meta oraz podniesienie białych opisów w 4 kaflach.
*/
(function(){
  'use strict';

  const MAIN_BG='file_00000000c0ac8210a2eab26769101d1e.png';
  const W=852,H=1846;

  /* Punkt 1: nazwa firmy — lekko większa i szersza, nadal idealnie centralna. */
  const NAME={x:170,y:309,w:512,h:78,size:39};

  /* Punkt 2: POLSKA / DOSTAWCA / PRIORYTET — minimalnie niżej i centralnie w pionie ramki. */
  const META=[
    {x:104,y:407,w:156,h:50,size:22},
    {x:318,y:407,w:214,h:50,size:22},
    {x:574,y:407,w:242,h:50,size:20}
  ];

  /* Punkt 3: białe opisy — jeden rytm we wszystkich 4 kaflach.
     Początek tekstu podniesiony do wysokości końca kółka numeru danego kafla. */
  const CFG=[
    {x:250,y:548,w:470,h:126,size:27,max:2,gap:6},
    {x:250,y:793,w:470,h:126,size:27,max:2,gap:6},
    {x:250,y:1038,w:470,h:132,size:25,max:2,gap:6},
    {x:250,y:1283,w:470,h:116,size:27,max:2,gap:6}
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
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      textAlign:'center',
      whiteSpace:'nowrap',
      overflow:'hidden'
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
        overflow:'hidden'
      });
    });
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
      lineHeight:'1.14',
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
        lineHeight:'1.14',
        fontWeight:'760'
      });
    });
  }

  function apply(){
    const s=document.querySelector('.r128-notes-live');
    if(!s||!isMainScreen(s)||s.dataset.v45cMainAlign==='1')return;

    adjustHeader(s);

    const lists=findLists(s);
    if(lists.length!==4)return;
    lists.forEach(function(el,i){cleanList(el,CFG[i])});

    s.dataset.v45cMainAlign='1';
    if(window.R128_NOTES)window.R128_NOTES.version='R128-v4.5C-main-card-surgical-alignment';
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
