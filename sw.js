/* R107 — CRM 1.3 RYNKI EU — CENY I OFERTA FULL GRAPHIC CARD
   Baza funkcjonalna: bezwzględny MASTER R106 DANE FIRMY S24 FULL SCREEN FIT.
   Zmiana chirurgiczna: wyłącznie kafel CENY I OFERTA na KARCIE 3/3.
   Po kliknięciu otwiera pełnoekranową grafikę template-ceny-oferta.png w standardzie Samsung Galaxy S24 Ultra.
   DANE FIRMY MASTER R106, NOTATKI ASYSTENTA, AKCJE I STATUS oraz wszystkie pozostałe moduły pozostają bez zmian.
*/
importScripts('./sw-r76-stable.js?v=R107-ceny-oferta-full-graphic-card');

if(Array.isArray(ASSETS)){
  const r107MaskableDuplicate='./icon-maskable-512.png';
  const r107MaskableDuplicateIndex=ASSETS.indexOf(r107MaskableDuplicate);
  if(r107MaskableDuplicateIndex>=0) ASSETS.splice(r107MaskableDuplicateIndex,1);
  if(!ASSETS.includes('./r84-backup-prune.js')) ASSETS.push('./r84-backup-prune.js');
  if(!ASSETS.includes('./grafiki/rynki-eu/dane-firmy/template-pusty.png')) ASSETS.push('./grafiki/rynki-eu/dane-firmy/template-pusty.png');
  if(!ASSETS.includes('./grafiki/rynki-eu/dane-firmy/template-ceny-oferta.png')) ASSETS.push('./grafiki/rynki-eu/dane-firmy/template-ceny-oferta.png');
}

const r107BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r107BasePatchIndexHtml(text);

  /* R101 — ochrona lokalnych backupów. */
  out = out.replaceAll('await r38CleanBackupWarehouseOnce();','');

  /* R102 — martwy katalog R38 nie jest oznaczany jako aktualny. */
  out = out.replaceAll("if(catalog[0]){catalog[0].current=true;catalog[0].description='MEGA STABILNY MASTER — oficjalny punkt powrotu R38.';}","");
  out = out.replaceAll(
    'Automatyczny backup danych jest tworzony przed aktualizacją. Punkty powrotu MASTER są przechowywane w pakiecie <b>backups/</b> i mogą zostać pobrane do przywrócenia.',
    'Automatyczny backup danych jest tworzony przed aktualizacją. Lokalne kopie danych pozostają w Magazynie Backupów, a zweryfikowane punkty MASTER są zabezpieczone w repozytorium GitHub.'
  );

  /* R106 MASTER + R107 — pełnoekranowe karty graficzne ostatniego okna. */
  const r107CompanyMarker='  renderCompany=renderCompanyR15;';
  if(out.includes(r107CompanyMarker) && !out.includes('function r105RenderCompanyDataGraphic')){
    const r107Patch=`

  /* R106 MASTER — DANE FIRMY, bez zmian. */
  function r105RenderCompanyDataGraphic(){
    const s=document.createElement('section');
    s.className='r105-data-graphic-page';
    s.innerHTML='<img class="r105-data-graphic" src="./grafiki/rynki-eu/dane-firmy/template-pusty.png?v=R106-MASTER" alt="DANE FIRMY">';

    const hotspot=(cls,label,handler)=>{
      const b=document.createElement('button');
      b.type='button';b.className='r105-data-hot '+cls;b.setAttribute('aria-label',label);
      b.addEventListener('click',handler);s.append(b);return b;
    };
    hotspot('r105-data-back-top','Wróć do karty',()=>{state.route='company';render()});
    hotspot('r105-data-sync','Synchronizuj',()=>sync());
    hotspot('r105-data-back-bottom','Wróć do karty',()=>{state.route='company';render()});
    return s;
  }

  /* R107 — CENY I OFERTA. */
  function r107RenderCompanyOfferGraphic(){
    const s=document.createElement('section');
    s.className='r107-offer-graphic-page';
    s.innerHTML='<img class="r107-offer-graphic" src="./grafiki/rynki-eu/dane-firmy/template-ceny-oferta.png?v=R107" alt="CENY I OFERTA">';

    const hotspot=(cls,label,handler)=>{
      const b=document.createElement('button');
      b.type='button';b.className='r107-offer-hot '+cls;b.setAttribute('aria-label',label);
      b.addEventListener('click',handler);s.append(b);return b;
    };
    hotspot('r107-offer-back-top','Wróć do karty',()=>{state.route='company';render()});
    hotspot('r107-offer-sync','Synchronizuj',()=>sync());
    hotspot('r107-offer-close','Zamknij i wróć do karty',()=>{state.route='company';render()});
    hotspot('r107-offer-back-bottom','Wróć do karty',()=>{state.route='company';render()});
    return s;
  }

  const r107RenderCompanyBase=renderCompany;
  function r107RenderCompanyWithGraphicCards(){
    const screen=r107RenderCompanyBase();
    if(screen&&screen.querySelectorAll){
      screen.querySelectorAll('.r15-section').forEach(section=>{
        const title=((section.querySelector('b')||{}).textContent||'').trim();
        if(title==='DANE FIRMY'){
          const clean=section.cloneNode(true);
          clean.addEventListener('click',()=>{state.route='company-data-graphic';render()});
          section.replaceWith(clean);
        }else if(title==='CENY I OFERTA'){
          const clean=section.cloneNode(true);
          clean.addEventListener('click',()=>{state.route='company-offer-graphic';render()});
          section.replaceWith(clean);
        }
      });
    }
    return screen;
  }
  renderCompany=r107RenderCompanyWithGraphicCards;
`;
    out=out.replace(r107CompanyMarker,r107CompanyMarker+r107Patch);
  }

  /* Główny render zna obie graficzne trasy. */
  out = out.replace(
    "    else if(state.route==='company') view=renderCompany();",
    "    else if(state.route==='company-data-graphic') view=r105RenderCompanyDataGraphic();\n    else if(state.route==='company-offer-graphic') view=r107RenderCompanyOfferGraphic();\n    else if(state.route==='company') view=renderCompany();"
  );

  /* R106 MASTER — viewport DANE FIRMY bez zmian. */
  if(!out.includes('id="r105-data-graphic-style"')){
    const r106Style=`
<style id="r105-data-graphic-style">
.r105-data-graphic-page{position:relative;width:100vw;max-width:720px;height:100dvh;min-height:100dvh;margin:0 auto;background:#000;overflow:hidden;touch-action:pan-y pinch-zoom;}
.r105-data-graphic{position:absolute;inset:0;width:100%;height:100%;object-fit:fill;display:block;pointer-events:none;user-select:none;}
.r105-data-hot{position:absolute;z-index:25;border:0;background:transparent;padding:0;margin:0;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;}
.r105-data-back-top{left:1.5%;top:.5%;width:16%;height:8.5%;}
.r105-data-sync{right:1%;top:.5%;width:18%;height:9%;}
.r105-data-back-bottom{left:3%;bottom:1.2%;width:94%;height:6.7%;}
body.debug .r105-data-hot{background:rgba(255,0,0,.15);outline:1px dashed red;}
</style>
`;
    out=out.replace('</head>',r106Style+'</head>');
  }

  /* R107 — identyczna święta zasada S24 FULL SCREEN FIT dla CENY I OFERTA. */
  if(!out.includes('id="r107-offer-graphic-style"')){
    const r107Style=`
<style id="r107-offer-graphic-style">
.r107-offer-graphic-page{position:relative;width:100vw;max-width:720px;height:100dvh;min-height:100dvh;margin:0 auto;background:#000;overflow:hidden;touch-action:pan-y pinch-zoom;}
.r107-offer-graphic{position:absolute;inset:0;width:100%;height:100%;object-fit:fill;display:block;pointer-events:none;user-select:none;}
.r107-offer-hot{position:absolute;z-index:25;border:0;background:transparent;padding:0;margin:0;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;}
.r107-offer-back-top{left:1%;top:.3%;width:15%;height:8.5%;}
.r107-offer-sync{right:1%;top:.3%;width:18%;height:8.8%;}
.r107-offer-close{right:1%;top:8%;width:9%;height:7%;}
.r107-offer-back-bottom{left:3%;bottom:1.2%;width:94%;height:6.8%;}
body.debug .r107-offer-hot{background:rgba(255,0,0,.15);outline:1px dashed red;}
</style>
`;
    out=out.replace('</head>',r107Style+'</head>');
  }

  out = out.replaceAll('1.3.0-master-r76-waluty-karta4-surgical-gauge-clean','1.3.0-master-r107-rynki-eu-ceny-oferta-full-graphic');
  out = out.replaceAll('R76 WALUTY KARTA 4 SURGICAL GAUGE CLEAN','R107 RYNKI EU — CENY I OFERTA FULL GRAPHIC');
  out = out.replace("const BUILD_DATE = '02.09.2026';","const BUILD_DATE = '07.09.2026';");
  out = out.replace("const BUILD_TIME = '17:58';","const BUILD_TIME = '21:29';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R76-waluty-karta4-surgical-gauge-clean-1758'","navigator.serviceWorker.register('./sw.js?v=R107-ceny-oferta-full-graphic-2129'");
  if(!out.includes('r84-backup-prune.js')){
    out = out.replace('</body>','<script src="./r84-backup-prune.js?v=R107-2129"></script>\n</body>');
  }else{
    out = out.replace(/r84-backup-prune\.js\?v=[^\"']+/g,'r84-backup-prune.js?v=R107-2129');
  }
  return out;
};
