/* R130 v1.0B — AKCJE I STATUS — SURGICAL LAYOUT FIT
   Cel: WYŁĄCZNIE chirurgiczne dopasowanie warstwy tekstowej do zamrożonego rastra MASTER 852x1846.
   Silnik R130 v1.0A, dane, logika, hotspoty i wcześniejsze MASTER-y pozostają nietknięte.
*/
(function(){
  'use strict';
  const W=852,H=1846,MARK='r130V10bSurgicalFit';
  const pct=(v,b)=>(v/b*100)+'%';
  const fsize=(v)=>{const unit=(window.CSS&&CSS.supports&&CSS.supports('font-size','1cqw'))?'cqw':'vw';return (v/W*100).toFixed(3)+unit;};
  const coord=(el,key,base)=>parseFloat(el.style[key]||'0')*base/100;
  const near=(a,b,t=2.2)=>Math.abs(a-b)<=t;
  function setBox(el,x,y,w,h,size,opt={}){
    if(!el)return;
    if(x!=null)el.style.left=pct(x,W);
    if(y!=null)el.style.top=pct(y,H);
    if(w!=null)el.style.width=pct(w,W);
    if(h!=null)el.style.height=pct(h,H);
    if(size!=null)el.style.fontSize=fsize(size);
    if(opt.line)el.style.lineHeight=opt.line;
    if(opt.nowrap===false)el.style.whiteSpace='normal';
    if(opt.nowrap===true)el.style.whiteSpace='nowrap';
    if(opt.center===true){el.style.justifyContent='center';el.style.textAlign='center';}
    if(opt.weight)el.style.fontWeight=String(opt.weight);
  }
  function apply(section){
    if(!section||section.dataset[MARK])return;
    section.dataset[MARK]='1';
    const divs=[...section.children].filter(el=>el.tagName==='DIV'&&el.style.position==='absolute');
    const at=(x,y)=>divs.find(el=>near(coord(el,'left',W),x,3)&&near(coord(el,'top',H),y,3));
    const texts=(value)=>divs.filter(el=>String(el.textContent||'').trim()===value);

    /* 1. Nagłówek firmy — koniec z nachodzeniem nazwy na tytuł AKCJE I STATUS. */
    setBox(at(142,177),142,210,500,40,31,{nowrap:true,weight:900});
    setBox(at(650,182),650,211,135,25,13,{center:true,nowrap:true});
    setBox(at(142,225),142,252,555,25,15,{nowrap:true,weight:720});
    setBox(at(770,220),770,248,44,30,22,{center:true});

    /* 2. Rząd klasyfikacji — idealne pionowe centrowanie w czterech polach. */
    setBox(at(79,294),79,296,112,33,16,{center:true,nowrap:true});
    setBox(at(228,294),228,296,125,33,16,{center:true,nowrap:true});
    setBox(at(397,294),397,296,198,33,15,{center:true,nowrap:true});
    setBox(at(650,294),650,296,135,33,15,{center:true,nowrap:true});

    /* 3. Aktualny status / historia — białe dane trzymają wnętrza ramek. */
    setBox(at(138,423),138,426,206,38,27,{nowrap:true});
    setBox(at(138,461),138,466,200,24,14,{});
    setBox(at(138,487),138,491,195,22,13,{nowrap:true});
    setBox(at(395,449),395,455,124,30,14,{center:true,nowrap:true});
    [416,453,490].forEach((y)=>{
      const d=divs.filter(el=>near(coord(el,'top',H),y,3));
      d.forEach(el=>{
        const x=coord(el,'left',W);
        if(near(x,584,4))setBox(el,584,y+4,92,24,12,{center:true,nowrap:true});
        if(near(x,690,4))setBox(el,690,y+4,93,24,11,{center:true,nowrap:true});
      });
    });

    /* 4. Następny kontakt — tekst i przycisk dokładnie wewnątrz zielonego kafla. */
    setBox(at(105,579),105,581,430,28,15,{nowrap:true});
    texts('ZOBACZ SZCZEGÓŁY').forEach(el=>setBox(el,605,575,168,36,13,{center:true,nowrap:true}));

    /* 5. Alerty — licznik i napisy przycisków nie siedzą na krawędziach ramek. */
    const count=at(563,648);setBox(count,563,658,42,31,17,{center:true,nowrap:true});
    texts('ZOBACZ WSZYSTKIE').forEach(el=>setBox(el,630,658,150,31,12,{center:true,nowrap:true}));
    texts('WYKONAJ').forEach(el=>{
      const y=coord(el,'top',H);setBox(el,665,y+11,112,30,12,{center:true,nowrap:true});
    });

    /* 6. Szybka zmiana statusu — szczególnie OFERTA WYSŁANA, bez wychodzenia z kafla. */
    texts('OFERTA WYSŁANA').forEach(el=>{
      const y=coord(el,'top',H);if(y>900&&y<1050)setBox(el,347,958,142,52,14,{center:true,nowrap:false,line:'1.0'});
    });
    texts('NIEAKTYWNY').forEach(el=>{
      const y=coord(el,'top',H);if(y>900&&y<1050)setBox(el,653,966,142,42,15,{center:true,nowrap:true});
    });

    /* 7. Planowane akcje — jeden wspólny grid: treść / data / status. */
    const rowY=[1146,1197,1248,1299,1350];
    rowY.forEach(y=>{
      divs.filter(el=>near(coord(el,'top',H),y,3)).forEach(el=>{
        const x=coord(el,'left',W);
        if(near(x,98,4))setBox(el,98,y+4,338,38,17,{});
        if(near(x,475,4))setBox(el,475,y+5,100,36,15,{center:true,nowrap:true});
        if(near(x,590,4))setBox(el,590,y+7,150,32,13,{center:true,nowrap:true});
      });
    });
    texts('DODAJ AKCJĘ').forEach(el=>setBox(el,651,1110,130,34,13,{center:true,nowrap:true}));
    texts('Pokaż tylko otwarte').forEach(el=>setBox(el,578,1391,165,27,13,{nowrap:true}));

    /* 8. Metryka dolna — spokojne centrowanie w trzech kolumnach. */
    setBox(at(104,1454),104,1457,145,21,11,{center:true,nowrap:true});
    setBox(at(104,1480),104,1482,145,25,14,{center:true,nowrap:true});
    setBox(at(328,1454),328,1457,188,21,11,{center:true,nowrap:true});
    setBox(at(312,1480),312,1482,220,25,13,{center:true,nowrap:true});
    setBox(at(624,1454),624,1457,145,21,11,{center:true,nowrap:true});
    setBox(at(624,1480),624,1482,145,25,15,{center:true,nowrap:true});

    /* 9. Dwa dolne przejścia oraz WRÓĆ DO KARTY — napisy do środka przycisków, nie na ramkę. */
    texts('PRZEJDŹ DO CEN I OFERTY').forEach(el=>setBox(el,120,1567,278,28,17,{center:true,nowrap:true}));
    texts('Ceny, warunki, logistyka').forEach(el=>setBox(el,120,1598,278,23,11,{center:true}));
    texts('PRZEJDŹ DO NOTATEK').forEach(el=>setBox(el,500,1567,260,28,17,{center:true,nowrap:true}));
    texts('Zadania, historia, AI').forEach(el=>setBox(el,500,1598,260,23,11,{center:true}));
    texts('WRÓĆ DO KARTY').forEach(el=>setBox(el,328,1695,300,45,25,{center:true,nowrap:true}));
  }
  function scan(){document.querySelectorAll('.r130-actions-live').forEach(apply);}
  let queued=false;
  function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;scan();});}
  const mo=new MutationObserver(schedule);
  const start=()=>{mo.observe(document.documentElement,{childList:true,subtree:true});scan();setTimeout(scan,80);setTimeout(scan,260);};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
  window.R130_LAYOUT_FIX={version:'R130-v1.0B-surgical-layout-fit',apply:scan};
})();