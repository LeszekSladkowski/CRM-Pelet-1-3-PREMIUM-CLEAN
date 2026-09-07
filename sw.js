/* R106 — CRM 1.3 RYNKI EU — DANE FIRMY S24 ULTRA FULL SCREEN FIT
   Baza funkcjonalna: R105 test na bazie zweryfikowanego R102 FINAL CLEAN MASTER / PUNKT 0 R92.
   Zmiana chirurgiczna: wyłącznie viewport nowej graficznej karty DANE FIRMY.
   Karta wypełnia cały ekran referencyjny Samsung Galaxy S24 Ultra bez pustego czarnego pola pod grafiką.
   Logika kafla DANE FIRMY, powroty, SYNCHRONIZUJ i wszystkie pozostałe moduły pozostają bez zmian.
*/
importScripts('./sw-r76-stable.js?v=R106-dane-firmy-s24-full-screen-fit');

if(Array.isArray(ASSETS)){
  const r106MaskableDuplicate='./icon-maskable-512.png';
  const r106MaskableDuplicateIndex=ASSETS.indexOf(r106MaskableDuplicate);
  if(r106MaskableDuplicateIndex>=0) ASSETS.splice(r106MaskableDuplicateIndex,1);
  if(!ASSETS.includes('./r84-backup-prune.js')) ASSETS.push('./r84-backup-prune.js');
  if(!ASSETS.includes('./grafiki/rynki-eu/dane-firmy/template-pusty.png')) ASSETS.push('./grafiki/rynki-eu/dane-firmy/template-pusty.png');
}

const r106BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r106BasePatchIndexHtml(text);

  /* R101 — ochrona lokalnych backupów. */
  out = out.replaceAll('await r38CleanBackupWarehouseOnce();','');

  /* R102 — martwy katalog R38 nie jest oznaczany jako aktualny. */
  out = out.replaceAll("if(catalog[0]){catalog[0].current=true;catalog[0].description='MEGA STABILNY MASTER — oficjalny punkt powrotu R38.';}","");
  out = out.replaceAll(
    'Automatyczny backup danych jest tworzony przed aktualizacją. Punkty powrotu MASTER są przechowywane w pakiecie <b>backups/</b> i mogą zostać pobrane do przywrócenia.',
    'Automatyczny backup danych jest tworzony przed aktualizacją. Lokalne kopie danych pozostają w Magazynie Backupów, a zweryfikowane punkty MASTER są zabezpieczone w repozytorium GitHub.'
  );

  /* R105/R106 — pełnoekranowa karta graficzna DANE FIRMY. */
  const r106CompanyMarker='  renderCompany=renderCompanyR15;';
  if(out.includes(r106CompanyMarker) && !out.includes('function r105RenderCompanyDataGraphic')){
    const r106Patch=`

  function r105RenderCompanyDataGraphic(){
    const s=document.createElement('section');
    s.className='r105-data-graphic-page';
    s.innerHTML='<img class="r105-data-graphic" src="./grafiki/rynki-eu/dane-firmy/template-pusty.png?v=R106" alt="DANE FIRMY">';

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

  const r105RenderCompanyBase=renderCompany;
  function r105RenderCompanyWithGraphicData(){
    const screen=r105RenderCompanyBase();
    if(screen&&screen.querySelectorAll){
      screen.querySelectorAll('.r15-section').forEach(section=>{
        const title=((section.querySelector('b')||{}).textContent||'').trim();
        if(title==='DANE FIRMY'){
          const clean=section.cloneNode(true);
          clean.addEventListener('click',()=>{state.route='company-data-graphic';render()});
          section.replaceWith(clean);
        }
      });
    }
    return screen;
  }
  renderCompany=r105RenderCompanyWithGraphicData;
`;
    out=out.replace(r106CompanyMarker,r106CompanyMarker+r106Patch);
  }

  /* Główny render zna trasę graficznej karty. */
  out = out.replace(
    "    else if(state.route==='company') view=renderCompany();",
    "    else if(state.route==='company-data-graphic') view=r105RenderCompanyDataGraphic();\n    else if(state.route==='company') view=renderCompany();"
  );

  /* R106 MASTER RULE — Samsung Galaxy S24 Ultra: karta ma wypełniać cały viewport.
     Nie kadrujemy grafiki; raster i hotspoty rozciągają się razem procentowo do 100vw x 100dvh. */
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

  out = out.replaceAll('1.3.0-master-r76-waluty-karta4-surgical-gauge-clean','1.3.0-master-r106-rynki-eu-dane-firmy-s24-full-screen');
  out = out.replaceAll('R76 WALUTY KARTA 4 SURGICAL GAUGE CLEAN','R106 RYNKI EU — DANE FIRMY S24 FULL SCREEN FIT');
  out = out.replace("const BUILD_DATE = '02.09.2026';","const BUILD_DATE = '07.09.2026';");
  out = out.replace("const BUILD_TIME = '17:58';","const BUILD_TIME = '20:57';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R76-waluty-karta4-surgical-gauge-clean-1758'","navigator.serviceWorker.register('./sw.js?v=R106-rynki-eu-dane-firmy-s24-full-screen-2057'");
  if(!out.includes('r84-backup-prune.js')){
    out = out.replace('</body>','<script src="./r84-backup-prune.js?v=R106-2057"></script>\n</body>');
  }else{
    out = out.replace(/r84-backup-prune\.js\?v=[^\"']+/g,'r84-backup-prune.js?v=R106-2057');
  }
  return out;
};
