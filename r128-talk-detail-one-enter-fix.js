/* R128 v4.6E — TALK DETAIL RED TILE — TRUE 1 ENTER WHITE TEXT START
   Zakres chirurgiczny: wyłącznie karta szczegółowa FAKTY DO ROZMOWY.
   Główna karta NOTATKI O FIRMIE v4.5I MASTER oraz pozostałe karty szczegółowe pozostają nietknięte.
   Korekta po teście na Samsung Galaxy S24 Ultra: poprzedni start był wizualnie za niski.
   Biały tekst NAJWAŻNIEJSZEGO WNIOSKU zaczyna się jeden realny wiersz pod czerwonym tytułem,
   a druga linia pozostaje wewnątrz czerwonego kafla z bezpiecznym dolnym marginesem.
*/
(function(){
  'use strict';

  const TALK_BG='file_00000000995c82109a658e01b57fd04f.png';
  const H=1846;

  /* v4.6E: przesunięcie całego białego bloku o 36 px w górę względem v4.6D.
     Zachowujemy identyczną wysokość 80 px — zmienia się wyłącznie pozycja Y. */
  const START_Y=1396;
  const BOTTOM_Y=1476;

  function pct(v){return (v/H*100)+'%';}

  function apply(){
    const s=document.querySelector('.r128-notes-live');
    if(!s)return;
    const img=s.querySelector('img.master');
    const src=String(img?.getAttribute('src')||img?.src||'');
    if(!src.includes(TALK_BG))return;

    const target=Array.from(s.children).find(function(el){
      if(el.tagName!=='DIV'||el.style.position!=='absolute')return false;
      const top=parseFloat(el.style.top||'0');
      const left=parseFloat(el.style.left||'0');
      const width=parseFloat(el.style.width||'0');
      return top>68&&top<72&&left>20&&left<24&&width>60&&width<70&&String(el.textContent||'').trim();
    });
    if(!target)return;

    Object.assign(target.style,{
      top:pct(START_Y),
      height:pct(BOTTOM_Y-START_Y),
      display:'block',
      alignItems:'initial',
      justifyContent:'initial',
      overflow:'hidden',
      whiteSpace:'normal'
    });
    target.dataset.r128TalkDetailOneEnter='v46e';
  }

  function schedule(){
    requestAnimationFrame(function(){requestAnimationFrame(apply);});
    setTimeout(apply,80);
    setTimeout(apply,180);
    setTimeout(apply,420);
  }

  const root=document.querySelector('#app')||document.documentElement;
  new MutationObserver(schedule).observe(root,{childList:true,subtree:true});
  schedule();
})();
