/* R130 v1.0D — AKCJE I STATUS — PIXEL MASTER FIT 1:1
   Cel: wyłącznie chirurgiczne dopasowanie warstwy LIVE do zatwierdzonego wzorca.
   Raster MASTER 852x1846, silnik R130 v1.0A, dane, logika i hotspoty pozostają nietknięte.
*/
(function(){
  'use strict';
  const W=852,H=1846,MARK='r130V10dPixelMasterFit';
  const pct=(v,b)=>(v/b*100)+'%';
  const fsize=(v)=>{const unit=(window.CSS&&CSS.supports&&CSS.supports('font-size','1cqw'))?'cqw':'vw';return (v/W*100).toFixed(3)+unit;};
  const coord=(el,key,base)=>parseFloat(el.style[key]||'0')*base/100;
  const near=(a,b,t=3)=>Math.abs(a-b)<=t;
  function setBox(el,x,y,w,h,size,opt={}){
    if(!el)return;
    if(x!=null)el.style.left=pct(x,W);
    if(y!=null)el.style.top=pct(y,H);
    if(w!=null)el.style.width=pct(w,W);
    if(h!=null)el.style.height=pct(h,H);
    if(size!=null)el.style.fontSize=fsize(size);
    el.style.padding='0';el.style.margin='0';
    if(opt.line)el.style.lineHeight=opt.line;
    if(opt.nowrap===false)el.style.whiteSpace='normal';
    if(opt.nowrap===true)el.style.whiteSpace='nowrap';
    if(opt.center===true){el.style.justifyContent='center';el.style.textAlign='center';}
    if(opt.center===false){el.style.justifyContent='flex-start';el.style.textAlign='left';}
    if(opt.weight)el.style.fontWeight=String(opt.weight);
  }
  function apply(section){
    if(!section||section.dataset[MARK])return;
    section.dataset[MARK]='1';
    const divs=[...section.children].filter(el=>el.tagName==='DIV'&&el.style.position==='absolute');
    const at=(x,y,t=4)=>divs.find(el=>near(coord(el,'left',W),x,t)&&near(coord(el,'top',H),y,t));
    const texts=(value)=>divs.filter(el=>String(el.textContent||'').trim()===value);

    /* 1. BLOK FIRMY */
    setBox(at(142,177),142,202,500,58,48,{nowrap:true,weight:950});
    setBox(at(650,182),650,207,135,31,20,{center:true,nowrap:true,weight:800});
    setBox(at(142,225),142,254,555,34,24,{nowrap:true,weight:760});
    setBox(at(770,220),770,245,44,34,26,{center:true});

    /* 2. KLASYFIKACJA */
    setBox(at(79,294),79,309,112,38,21,{center:true,nowrap:true,weight:900});
    setBox(at(228,294),228,309,125,38,21,{center:true,nowrap:true,weight:900});
    setBox(at(397,294),397,309,198,38,20,{center:true,nowrap:true,weight:900});
    setBox(at(650,294),650,309,135,38,20,{center:true,nowrap:true,weight:900});

    /* 3. AKTUALNY STATUS + HISTORIA */
    texts('AKTUALNY STATUS').forEach(el=>setBox(el,106,374,300,42,28,{nowrap:true,weight:950}));
    texts('HISTORIA STATUSÓW').forEach(el=>setBox(el,586,376,194,39,22,{center:true,nowrap:true,weight:900}));
    setBox(at(138,423),138,447,206,48,36,{nowrap:true,weight:950});
    setBox(at(138,461),138,486,200,31,21,{weight:720,nowrap:false});
    setBox(at(138,487),138,513,195,28,19,{nowrap:true,weight:700});
    setBox(at(395,449),395,466,124,38,18,{center:true,nowrap:true,weight:900});
    [416,453,490].forEach((y,i)=>{
      divs.filter(el=>near(coord(el,'top',H),y,4)).forEach(el=>{
        const x=coord(el,'left',W),ny=439+i*36;
        if(near(x,584,5))setBox(el,584,ny,92,31,18,{center:true,nowrap:true,weight:760});
        if(near(x,690,5))setBox(el,690,ny,93,31,16,{center:true,nowrap:true,weight:900});
      });
    });

    /* 4. NASTĘPNY KONTAKT */
    texts('NASTĘPNY KONTAKT').forEach(el=>setBox(el,105,553,330,43,28,{nowrap:true,weight:950}));
    setBox(at(105,579),105,604,445,36,23,{nowrap:true,weight:820});
    texts('ZOBACZ SZCZEGÓŁY').forEach(el=>setBox(el,605,587,168,43,18,{center:true,nowrap:true,weight:900}));

    /* 5. POWIADOMIENIA / ALERTY */
    texts('POWIADOMIENIA / ALERTY').forEach(el=>setBox(el,104,663,360,43,27,{nowrap:true,weight:950}));
    setBox(at(563,648),563,666,42,40,21,{center:true,nowrap:true,weight:950});
    texts('ZOBACZ WSZYSTKIE').forEach(el=>setBox(el,630,665,150,39,16,{center:true,nowrap:true,weight:900}));
    [696,761].forEach((oy,i)=>{
      const ny=724+i*70;
      divs.filter(el=>near(coord(el,'top',H),oy,4)).forEach(el=>{
        const x=coord(el,'left',W);if(near(x,104,5))setBox(el,104,ny,425,38,20,{nowrap:true,weight:900});
      });
      divs.filter(el=>near(coord(el,'top',H),oy+28,4)).forEach(el=>{
        const x=coord(el,'left',W);if(near(x,104,5))setBox(el,104,ny+28,425,31,17,{nowrap:true,weight:680});
      });
      divs.filter(el=>near(coord(el,'top',H),oy+9,4)).forEach(el=>{
        const x=coord(el,'left',W);if(near(x,540,5))setBox(el,540,ny+10,86,31,17,{center:true,nowrap:true,weight:760});
      });
    });
    texts('WYKONAJ').forEach(el=>{const y=coord(el,'top',H);setBox(el,665,y<760?728:798,112,38,16,{center:true,nowrap:true,weight:900});});
    setBox(at(105,716),105,752,500,40,20,{nowrap:true,weight:820});

    /* 6. SZYBKA ZMIANA STATUSU */
    texts('SZYBKA ZMIANA STATUSU').forEach(el=>setBox(el,104,885,390,43,28,{nowrap:true,weight:950}));
    const statusNames=['NOWY','NEGOCJACJE','OFERTA WYSŁANA','AKTYWNY','NIEAKTYWNY'];
    const statusX=[42,195,347,500,653];
    statusNames.forEach((name,i)=>texts(name).forEach(el=>{const y=coord(el,'top',H);if(y>900&&y<1060)setBox(el,statusX[i],990,142,67,name==='OFERTA WYSŁANA'?22:24,{center:true,nowrap:name!=='OFERTA WYSŁANA',line:'1.0',weight:950});}));
    const descMap={'Pierwszy kontakt':0,'Rozmowy w toku':1,'Czekamy na odpowiedź':2,'Współpraca w toku':3,'Wstrzymany / zakończony':4};
    Object.entries(descMap).forEach(([label,i])=>texts(label).forEach(el=>{const y=coord(el,'top',H);if(y>980&&y<1080)setBox(el,statusX[i]+4,1041,134,50,17,{center:true,nowrap:false,line:'1.08',weight:720});}));

    /* 7. PLANOWANE AKCJE / ZADANIA — wspólna siatka 1:1 */
    texts('PLANOWANE AKCJE / ZADANIA').forEach(el=>setBox(el,104,1120,400,44,28,{nowrap:true,weight:950}));
    texts('DODAJ AKCJĘ').forEach(el=>setBox(el,651,1121,130,40,18,{center:true,nowrap:true,weight:900}));
    const oldY=[1146,1197,1248,1299,1350],newY=[1180,1227,1274,1321,1369];
    oldY.forEach((oy,i)=>{
      divs.filter(el=>near(coord(el,'top',H),oy,4)).forEach(el=>{
        const x=coord(el,'left',W),ny=newY[i];
        if(near(x,98,5))setBox(el,98,ny,338,43,20,{weight:760,nowrap:false});
        if(near(x,475,5))setBox(el,487,ny,104,43,21,{center:true,nowrap:true,weight:820});
        if(near(x,590,5))setBox(el,632,ny,132,43,16,{center:true,nowrap:true,weight:900});
      });
    });
    texts('Pokaż tylko otwarte').forEach(el=>setBox(el,572,1424,170,31,17,{nowrap:true,weight:720}));

    /* 8. METRYKI DOLNE */
    setBox(at(104,1454),107,1483,145,27,15,{center:true,nowrap:true,weight:680});
    setBox(at(104,1480),107,1510,145,34,20,{center:true,nowrap:true,weight:850});
    setBox(at(328,1454),358,1483,188,27,15,{center:true,nowrap:true,weight:680});
    setBox(at(312,1480),342,1510,220,34,19,{center:true,nowrap:true,weight:850});
    setBox(at(624,1454),657,1483,145,27,15,{center:true,nowrap:true,weight:680});
    setBox(at(624,1480),657,1510,145,34,20,{center:true,nowrap:true,weight:850});

    /* 9. DOLNA NAWIGACJA */
    texts('PRZEJDŹ DO CEN I OFERTY').forEach(el=>setBox(el,128,1614,282,36,24,{center:true,nowrap:true,weight:950}));
    texts('Ceny, warunki, logistyka').forEach(el=>setBox(el,128,1650,282,29,16,{center:true,weight:680});
    texts('PRZEJDŹ DO NOTATEK').forEach(el=>setBox(el,525,1614,258,36,24,{center:true,nowrap:true,weight:950}));
    texts('Zadania, historia, AI').forEach(el=>setBox(el,525,1650,258,29,16,{center:true,weight:680});
    texts('WRÓĆ DO KARTY').forEach(el=>setBox(el,350,1710,365,58,34,{center:true,nowrap:true,weight:950}));
  }
  function scan(){document.querySelectorAll('.r130-actions-live').forEach(apply);}
  let queued=false;function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;scan();});}
  const mo=new MutationObserver(schedule);
  const start=()=>{mo.observe(document.documentElement,{childList:true,subtree:true});scan();setTimeout(scan,80);setTimeout(scan,260);};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
  window.R130_LAYOUT_FIX={version:'R130-v1.0D-pixel-master-fit-1to1',apply:scan};
})();