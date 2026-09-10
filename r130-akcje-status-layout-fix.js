/* R130 v1.0G — AKCJE I STATUS — PIXEL REFERENCE ALIGNMENT 1:1
   Jedyny wzorzec: zatwierdzona grafika referencyjna 852 x 1846.
   Zmieniana jest WYŁĄCZNIE geometria warstwy LIVE. Raster MASTER, silnik,
   dane, statusy, alerty, zadania, localStorage i logika przycisków pozostają nietknięte.
*/
(function(){
  'use strict';
  const W=852,H=1846;
  const MARK='r130v10gPixelReferenceAlignment';
  const pct=(v,b)=>(v/b*100)+'%';
  const num=(v,b)=>parseFloat(v||'0')*b/100;
  const near=(a,b,t=2.8)=>Math.abs(a-b)<=t;

  function place(el,x,y,w,h){
    if(!el)return;
    el.style.left=pct(x,W);
    el.style.top=pct(y,H);
    if(w!=null)el.style.width=pct(w,W);
    if(h!=null)el.style.height=pct(h,H);
  }

  function apply(section){
    if(!section)return;

    /* Cofnięcie błędnego wymuszenia pełnego 100vw z R130 v1.0F.
       Karta ponownie korzysta z zamrożonej geometrii .screen aplikacji. */
    ['width','max-width','height','aspect-ratio','margin','transform','transform-origin','overflow'].forEach(p=>section.style.removeProperty(p));
    section.style.position='relative';
    section.style.containerType='inline-size';

    const img=section.querySelector('img.master');
    if(img){
      img.style.position='absolute';
      img.style.inset='0';
      img.style.width='100%';
      img.style.height='100%';
      img.style.objectFit='fill';
      img.style.transform='none';
    }

    const els=[...section.children].filter(e=>e.tagName==='DIV'&&e.style.position==='absolute');
    els.forEach(el=>{
      if(el.dataset[MARK]==='1')return;
      const x=num(el.style.left,W), y=num(el.style.top,H);
      const w=num(el.style.width,W), h=num(el.style.height,H);

      /* NAGŁÓWEK FIRMY — osobne osie wzorca. */
      if(near(x,142)&&near(y,177)) place(el,142,207,500,50);
      else if(near(x,650)&&near(y,182)) place(el,650,208,135,30);
      else if(near(x,142)&&near(y,225)) place(el,142,252,555,28);
      else if(near(x,770)&&near(y,220)) place(el,770,238,44,34);

      /* Pasek klasyfikacji. */
      else if(near(y,294)) place(el,x,300,w,h);

      /* AKTUALNY STATUS. */
      else if(near(x,106)&&near(y,364)) place(el,118,371,300,39);
      else if(near(x,138)&&near(y,423)) place(el,168,425,206,42);
      else if(near(x,138)&&near(y,461)) place(el,168,474,200,28);
      else if(near(x,138)&&near(y,487)) place(el,168,500,195,24);
      else if(near(x,395)&&near(y,449)) place(el,395,452,124,34);
      else if(near(x,586)&&near(y,366)) place(el,586,370,194,34);
      else if(near(x,584)&&near(y,416)) place(el,584,430,92,28);
      else if(near(x,690)&&near(y,416)) place(el,690,430,93,28);
      else if(near(x,584)&&near(y,453)) place(el,584,465,92,28);
      else if(near(x,690)&&near(y,453)) place(el,690,465,93,28);
      else if(near(x,584)&&near(y,490)) place(el,584,500,92,28);
      else if(near(x,690)&&near(y,490)) place(el,690,500,93,28);

      /* NASTĘPNY KONTAKT. */
      else if(near(x,105)&&near(y,545)) place(el,118,555,270,34);
      else if(near(x,105)&&near(y,579)) place(el,118,591,430,31);
      else if(near(x,605)&&near(y,561)) place(el,605,567,168,37);

      /* POWIADOMIENIA / ALERTY. */
      else if(near(x,104)&&near(y,648)) place(el,110,660,350,38);
      else if(near(x,563)&&near(y,648)) place(el,563,660,42,38);
      else if(near(x,630)&&near(y,648)) place(el,630,660,150,36);
      else if(near(x,104)&&near(y,696)) place(el,110,722,425,30);
      else if(near(x,104)&&near(y,724)) place(el,110,750,425,28);
      else if(near(x,540)&&near(y,705)) place(el,540,731,86,28);
      else if(near(x,665)&&near(y,700)) place(el,665,726,112,36);
      else if(near(x,104)&&near(y,761)) place(el,110,793,425,30);
      else if(near(x,104)&&near(y,789)) place(el,110,821,425,28);
      else if(near(x,540)&&near(y,770)) place(el,540,802,86,28);
      else if(near(x,665)&&near(y,765)) place(el,665,797,112,36);
      else if(near(x,105)&&near(y,716)) place(el,110,735,500,42);

      /* SZYBKA ZMIANA STATUSU — tytuły pozostają na osi kart, opisy niżej. */
      else if(near(x,104)&&near(y,860)) place(el,106,872,360,40);
      else if(near(y,968)) place(el,x,972,w,h);
      else if(near(y,1014)) place(el,x,1030,w,h);

      /* PLANOWANE AKCJE / ZADANIA — pięć sztywnych osi wierszy wzorca. */
      else if(near(x,104)&&near(y,1100)) place(el,108,1108,390,40);
      else if(near(x,651)&&near(y,1098)) place(el,651,1110,130,37);
      else if(near(y,1146)) place(el,x===98?102:(x===475?477:x),1178,w,h);
      else if(near(y,1197)) place(el,x===98?102:(x===475?477:x),1225,w,h);
      else if(near(y,1248)) place(el,x===98?102:(x===475?477:x),1271,w,h);
      else if(near(y,1299)) place(el,x===98?102:(x===475?477:x),1318,w,h);
      else if(near(y,1350)) place(el,x===98?102:(x===475?477:x),1365,w,h);
      else if(near(x,578)&&near(y,1395)) place(el,578,1420,165,30);

      /* METRYKA DOLNA. */
      else if(near(y,1454)) place(el,x,1481,w,h);
      else if(near(y,1480)) place(el,x,1508,w,h);

      /* DWA PRZEJŚCIA + POWRÓT. */
      else if(near(y,1550)) place(el,x,1580,w,h);
      else if(near(y,1582)) place(el,x,1618,w,h);
      else if(near(x,328)&&near(y,1681)) place(el,328,1714,300,50);

      el.dataset[MARK]='1';
    });
  }

  function scan(){document.querySelectorAll('.r130-actions-live').forEach(apply);}
  let q=false;
  function schedule(){if(q)return;q=true;requestAnimationFrame(()=>{q=false;scan();});}
  const mo=new MutationObserver(schedule);
  function start(){
    mo.observe(document.documentElement,{childList:true,subtree:true});
    scan();setTimeout(scan,60);setTimeout(scan,180);setTimeout(scan,420);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();

  window.R130_LAYOUT_FIX={version:'R130-v1.0G-pixel-reference-alignment-1to1',apply:scan};
})();