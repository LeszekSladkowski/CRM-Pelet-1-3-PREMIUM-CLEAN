/* R101 — ANPOL / DANE FIRMY — CLICK HARD FIX
   BAZA: pełny R100 zachowany w sw-r100-base.js.
   R101 NIE podmienia już funkcji r15OpenSection. Zamiast tego przechwytuje realny klik
   na aktywnym przycisku .r15-section w fazie capture, wyłącznie dla ANPOL + DANE FIRMY.
   Najpierw próbuje pełnej karty R100; jeżeli tam wystąpi błąd albo overlay nie powstanie,
   natychmiast otwiera bezpieczny raster CLEAN MASTER 1:1. Pozostała aplikacja bez zmian.
*/
importScripts('./sw-r100-base.js?v=R100-base-1600');

const r101BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r101BasePatchIndexHtml(text);

  out = out.replaceAll('1.3.0-master-r100-anpol-dane-firmy-direct-hook','1.3.0-master-r101-anpol-dane-firmy-click-hard-fix');
  out = out.replaceAll('R100 ANPOL DANE FIRMY DIRECT HOOK','R101 ANPOL DANE FIRMY CLICK HARD FIX');
  out = out.replace("const BUILD_TIME = '16:00';","const BUILD_TIME = '16:37';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R100-anpol-dane-firmy-direct-hook-1600'","navigator.serviceWorker.register('./sw.js?v=R101-anpol-dane-firmy-click-hard-fix-1637'");
  out = out.replace(/r84-backup-prune\.js\?v=R100-1600/g,'r84-backup-prune.js?v=R101-1637');

  if(!out.includes('name="r101-anpol-click-hard-fix"')){
    out = out.replace('</head>','<meta name="r101-anpol-click-hard-fix" content="capture-fallback-v1">\n</head>');
  }

  const style = String.raw`<style id="r101-anpol-click-hard-fix-style">
.r101-company-overlay{position:fixed;inset:0;z-index:100000;background:#000;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;touch-action:pan-y pinch-zoom}
.r101-company-card{position:relative;width:min(100vw,720px);margin:0 auto;background:#000;min-height:100dvh}
.r101-company-master{display:block;width:100%;height:auto;min-height:100%;pointer-events:none;user-select:none;-webkit-user-drag:none}
.r101-company-hot{position:absolute;z-index:30;border:0;background:transparent;padding:0;margin:0;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
.r101-company-error{position:absolute;z-index:12;left:5%;right:5%;top:38%;padding:18px;border:1px solid #d9a41c;border-radius:16px;background:#061108;color:#fff;font:800 15px/1.45 system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;text-align:center}
</style>`;
  if(!out.includes('r101-anpol-click-hard-fix-style')) out = out.replace('</head>',style+'\n</head>');

  const runtime = String.raw`
  function r101OpenAnpolSafeMaster(c){
    var old=document.querySelector('.r101-company-overlay');if(old)old.remove();
    var prevBodyOverflow=document.body.style.overflow;
    var root=document.createElement('div');root.className='r101-company-overlay';
    var card=document.createElement('section');card.className='r101-company-card';
    var img=document.createElement('img');img.className='r101-company-master';img.src='./assets/masters/dane-firmy-clean-master.png?v=R101-1637';img.alt='DANE FIRMY — CLEAN MASTER 1:1';
    card.append(img);root.append(card);document.body.append(root);document.body.style.overflow='hidden';root.scrollTop=0;
    var close=function(){document.body.style.overflow=prevBodyOverflow;root.remove()};
    var hot=function(label,l,t,w,h,fn){var b=document.createElement('button');b.type='button';b.className='r101-company-hot';b.setAttribute('aria-label',label);Object.assign(b.style,{left:l+'%',top:t+'%',width:w+'%',height:h+'%'});b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();fn()});card.append(b)};
    img.addEventListener('error',function(){var d=document.createElement('div');d.className='r101-company-error';d.textContent='DANE FIRMY: grafika MASTER nie została pobrana. Zamknij kartę i uruchom synchronizację aplikacji.';card.append(d)});
    hot('Wstecz',1.5,0.5,15,9,close);
    hot('Wróć do karty',2.5,89.5,95,9.5,close);
  }

  function r101OpenAnpolDataHard(c){
    try{
      if(typeof r100OpenAnpolCompanyData==='function'){
        r100OpenAnpolCompanyData(c);
        if(document.querySelector('.r100-company-overlay')) return;
      }
    }catch(err){
      console.error('R101: pełna karta R100 nie wystartowała — uruchamiam bezpieczny MASTER',err);
      var broken=document.querySelector('.r100-company-overlay');if(broken)broken.remove();
    }
    r101OpenAnpolSafeMaster(c);
  }

  document.addEventListener('click',function(e){
    var btn=e.target&&e.target.closest?e.target.closest('.r15-section'):null;
    if(!btn)return;
    if(!state || state.route!=='company' || String(state.selectedCompany||'')!=='anpol-pl')return;
    var label=btn.querySelector('b');
    if(!label || String(label.textContent||'').trim()!=='DANE FIRMY')return;
    e.preventDefault();
    e.stopImmediatePropagation();
    var c=getCompanyById('anpol-pl');
    if(!c){toast('ANPOL — brak rekordu w bieżącej bazie CRM.');return;}
    r101OpenAnpolDataHard(c);
  },true);
`;

  const anchor='  loadCachedCrmData();';
  if(out.includes(anchor) && !out.includes('function r101OpenAnpolDataHard(c)')){
    out = out.replace(anchor,runtime+'\n'+anchor);
  }else if(!out.includes('function r101OpenAnpolDataHard(c)')){
    console.error('R101: NIE ZNALEZIONO punktu startowego runtime — hook capture nie został wstrzyknięty');
  }

  return out;
};