/* R130 v1.0C — AKCJE I STATUS — SURGICAL LIVE ALIGNMENT 1:1
   Wzorzec: zatwierdzona karta referencyjna 852x1846.
   Zmieniana jest WYŁĄCZNIE geometria warstwy LIVE. Raster MASTER, logika, dane,
   hotspoty oraz R128/R129 pozostają nietknięte.
*/
(function(){
  'use strict';
  const W=852,H=1846;
  const pct=(v,b)=>(v/b*100)+'%';
  const fsize=v=>{const u=(window.CSS&&CSS.supports&&CSS.supports('font-size','1cqw'))?'cqw':'vw';return (v/W*100).toFixed(3)+u;};
  const coord=(el,key,base)=>parseFloat(el.style[key]||'0')*base/100;
  const near=(a,b,t=4)=>Math.abs(a-b)<=t;
  function box(el,x,y,w,h,size,opt={}){
    if(!el)return;
    Object.assign(el.style,{left:pct(x,W),top:pct(y,H),width:pct(w,W),height:pct(h,H)});
    if(size!=null)el.style.fontSize=fsize(size);
    el.style.lineHeight=opt.line||'1.04';
    el.style.whiteSpace=opt.wrap?'normal':'nowrap';
    el.style.padding='0';
    el.style.margin='0';
    el.style.alignItems='center';
    if(opt.center){el.style.justifyContent='center';el.style.textAlign='center';}
    else {el.style.justifyContent='flex-start';el.style.textAlign='left';}
    if(opt.weight)el.style.fontWeight=String(opt.weight);
  }
  function apply(s){
    if(!s)return;
    const d=[...s.children].filter(e=>e.tagName==='DIV'&&e.style.position==='absolute');
    const at=(x,y,t=5)=>d.find(e=>near(coord(e,'left',W),x,t)&&near(coord(e,'top',H),y,t));
    const txt=v=>d.filter(e=>String(e.textContent||'').trim()===v);

    /* Nagłówek i klasyfikacja */
    box(at(142,177),142,178,500,43,30,{weight:950});
    box(at(650,182),650,184,135,28,13,{center:true,weight:800});
    box(at(142,225),142,226,555,27,15,{weight:720});
    box(at(770,220),770,220,44,34,24,{center:true});
    box(at(79,294),79,294,112,37,16,{center:true,weight:900});
    box(at(228,294),228,294,125,37,16,{center:true,weight:900});
    box(at(397,294),397,294,198,37,15,{center:true,weight:900});
    box(at(650,294),650,294,135,37,15,{center:true,weight:900});

    /* Aktualny status / historia */
    box(at(138,423),138,423,206,42,27,{weight:950});
    box(at(138,461),138,461,200,28,14,{weight:700,wrap:true});
    box(at(138,487),138,487,195,24,13,{weight:650});
    box(at(395,449),395,449,124,34,14,{center:true,weight:900});
    [416,453,490].forEach(y=>d.filter(e=>near(coord(e,'top',H),y,4)).forEach(e=>{
      const x=coord(e,'left',W); if(near(x,584,5))box(e,584,y,92,28,12,{center:true}); if(near(x,690,5))box(e,690,y,93,28,11,{center:true,weight:900});
    }));

    /* Następny kontakt / alerty */
    box(at(105,579),105,579,430,31,15,{weight:800});
    txt('ZOBACZ SZCZEGÓŁY').forEach(e=>box(e,605,561,168,37,13,{center:true,weight:900}));
    box(at(563,648),563,648,42,38,17,{center:true,weight:950});
    txt('ZOBACZ WSZYSTKIE').forEach(e=>box(e,630,648,150,36,12,{center:true,weight:900}));
    txt('WYKONAJ').forEach(e=>{const y=coord(e,'top',H);box(e,665,y,112,36,12,{center:true,weight:900});});

    /* 5 kafli statusu: tytuły i opisy dokładnie w środku pól wzorca */
    const sx=[42,195,347,500,653];
    const names=['NOWY','NEGOCJACJE','OFERTA WYSŁANA','AKTYWNY','NIEAKTYWNY'];
    const desc=['Pierwszy kontakt','Rozmowy w toku','Czekamy na odpowiedź','Współpraca w toku','Wstrzymany / zakończony'];
    names.forEach((v,i)=>txt(v).forEach(e=>{const y=coord(e,'top',H);if(y>900&&y<1060)box(e,sx[i],956,142,48,i===2?14:16,{center:true,weight:950,wrap:i===2});}));
    desc.forEach((v,i)=>txt(v).forEach(e=>{const y=coord(e,'top',H);if(y>900&&y<1080)box(e,sx[i]+5,1011,132,34,11,{center:true,weight:700,wrap:true});}));

    /* PLANOWANE AKCJE — geometria 1:1: opis | data; ikony/status/menu pozostają w rastrze/hotspotach */
    const rows=[1146,1197,1248,1299,1350];
    rows.forEach(y=>d.filter(e=>near(coord(e,'top',H),y,5)).forEach(e=>{
      const x=coord(e,'left',W);
      if(near(x,98,6)) box(e,98,y,338,42,16,{weight:730,wrap:true});
      if(near(x,475,6)) box(e,475,y,100,42,15,{center:true,weight:800});
      if(near(x,590,6)) box(e,590,y,150,42,12,{center:true,weight:900});
    }));
    txt('DODAJ AKCJĘ').forEach(e=>box(e,651,1098,130,37,13,{center:true,weight:900}));
    txt('Pokaż tylko otwarte').forEach(e=>box(e,578,1395,165,30,13,{weight:700}));

    /* Dolne metryki */
    box(at(104,1454),104,1454,145,24,11,{center:true}); box(at(104,1480),104,1480,145,27,14,{center:true,weight:850});
    box(at(328,1454),328,1454,188,24,11,{center:true}); box(at(312,1480),312,1480,220,27,13,{center:true,weight:850});
    box(at(624,1454),624,1454,145,24,11,{center:true}); box(at(624,1480),624,1480,145,27,15,{center:true,weight:850});

    /* Dolne przejścia — wzorzec ma nagłówek nad opisem, oba wewnątrz kafla */
    txt('PRZEJDŹ DO CEN I OFERTY').forEach(e=>box(e,120,1550,278,31,17,{center:true,weight:950}));
    txt('Ceny, warunki, logistyka').forEach(e=>box(e,120,1582,278,25,11,{center:true}));
    txt('PRZEJDŹ DO NOTATEK').forEach(e=>box(e,500,1550,260,31,17,{center:true,weight:950}));
    txt('Zadania, historia, AI').forEach(e=>box(e,500,1582,260,25,11,{center:true}));
    txt('WRÓĆ DO KARTY').forEach(e=>box(e,328,1681,300,50,25,{center:true,weight:950}));
  }
  function scan(){document.querySelectorAll('.r130-actions-live').forEach(apply);}
  let q=false;function schedule(){if(q)return;q=true;requestAnimationFrame(()=>{q=false;scan();});}
  const mo=new MutationObserver(schedule);
  function start(){mo.observe(document.documentElement,{childList:true,subtree:true});scan();setTimeout(scan,60);setTimeout(scan,180);setTimeout(scan,500);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
  window.R130_LAYOUT_FIX={version:'R130-v1.0C-surgical-live-alignment-1to1',apply:scan};
})();