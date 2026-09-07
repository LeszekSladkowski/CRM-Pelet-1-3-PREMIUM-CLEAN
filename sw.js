/* R94 — DANE FIRMY EXACT UPLOADED MASTER
   Baza wykonawcza: R76 + zachowany R92/R93 punkt powrotu.
   Zakres: WYŁĄCZNIE kafel DANE FIRMY.
   Widok DANE FIRMY korzysta dokładnie z pliku przesłanego przez Leszka do
   00_GRAFIKI_MASTER_DO_WGRANIA — bez masek, bez tekstów LIVE i bez zmian rastra.
*/
importScripts('./sw-r76-stable.js?v=R76-stable-clean-base');

self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));

const R94_MASTER='./00_GRAFIKI_MASTER_DO_WGRANIA/file_000000003a0c8246b64ee82a6b1bc291.png';
if(Array.isArray(ASSETS) && !ASSETS.includes('./r84-backup-prune.js')) ASSETS.push('./r84-backup-prune.js');
if(Array.isArray(ASSETS) && !ASSETS.includes(R94_MASTER)) ASSETS.push(R94_MASTER);

const r94BasePatchIndexHtml=r48PatchIndexHtml;
r48PatchIndexHtml=function(text){
  let out=r94BasePatchIndexHtml(text);
  out=out.replaceAll('1.3.0-master-r76-waluty-karta4-surgical-gauge-clean','1.3.0-master-r94-dane-firmy-exact-uploaded-master');
  out=out.replaceAll('R76 WALUTY KARTA 4 SURGICAL GAUGE CLEAN','R94 DANE FIRMY EXACT UPLOADED MASTER');
  out=out.replace("const BUILD_DATE = '02.09.2026';","const BUILD_DATE = '07.09.2026';");
  out=out.replace("const BUILD_TIME = '17:58';","const BUILD_TIME = '13:37';");
  out=out.replace(/navigator\.serviceWorker\.register\('\.\/sw\.js\?v=[^']+'/g,"navigator.serviceWorker.register('./sw.js?v=R94-dane-firmy-exact-uploaded-master-1337'");

  if(!out.includes('r84-backup-prune.js')){
    out=out.replace('</body>','<script src="./r84-backup-prune.js?v=R94-1337"></script>\n</body>');
  }else{
    out=out.replace(/r84-backup-prune\.js\?v=[^\"']+/g,'r84-backup-prune.js?v=R94-1337');
  }

  const anchor='renderCompany=renderCompanyR15;';
  if(out.includes(anchor) && !out.includes('function r94OpenExactMaster')){
    const code=String.raw`
  const r94OriginalOpenSection=r15OpenSection;
  function r94CloseExactMaster(){
    const el=document.getElementById('r94-exact-master-overlay');
    if(el)el.remove();
    document.body.classList.remove('r94-exact-master-open');
  }
  function r94Hot(root,x,y,w,h,label,fn){
    const b=document.createElement('button');
    b.type='button';b.className='r94-hot';b.setAttribute('aria-label',label);
    Object.assign(b.style,{left:(x/709*100)+'%',top:(y/1536*100)+'%',width:(w/709*100)+'%',height:(h/1536*100)+'%'});
    b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();fn();});
    root.appendChild(b);return b;
  }
  function r94Google(c){
    const q=[c&&c.name,c&&c.city,c&&c.countryName,c&&c.type,'pellet'].filter(Boolean).join(' ');
    window.open('https://www.google.com/search?q='+encodeURIComponent(q),'_blank','noopener');
  }
  function r94OpenExactMaster(c){
    r94CloseExactMaster();
    const overlay=document.createElement('div');overlay.id='r94-exact-master-overlay';overlay.className='r94-exact-master-overlay';
    const root=document.createElement('div');root.className='r94-exact-master-canvas';overlay.appendChild(root);
    const img=document.createElement('img');img.className='r94-exact-master-image';img.src='./00_GRAFIKI_MASTER_DO_WGRANIA/file_000000003a0c8246b64ee82a6b1bc291.png?v=R94-1337';img.alt='DANE FIRMY MASTER 1:1';root.appendChild(img);

    r94Hot(root,18,10,105,105,'Wstecz',r94CloseExactMaster);
    r94Hot(root,578,8,116,110,'Synchronizuj',()=>sync('✓ Synchronizacja uruchomiona'));
    r94Hot(root,494,485,190,76,'Pokaż na mapie',()=>c?r19OpenCompanyMap(c):null);
    r94Hot(root,23,1295,315,90,'Uaktualnij dane',()=>{r94CloseExactMaster();r94OriginalOpenSection(c,'data')});
    r94Hot(root,343,1295,343,90,'Szukaj danych w Google',()=>r94Google(c));
    r94Hot(root,23,1390,663,92,'Wróć do karty',r94CloseExactMaster);

    document.body.appendChild(overlay);document.body.classList.add('r94-exact-master-open');
  }
  r15OpenSection=function(c,sec){
    if(sec==='data')return r94OpenExactMaster(c);
    return r94OriginalOpenSection(c,sec);
  };`;
    out=out.replace(anchor,anchor+code);
  }

  const style=String.raw`<style id="r94-dane-firmy-exact-uploaded-master">
body.r94-exact-master-open{overflow:hidden!important}
.r94-exact-master-overlay{position:fixed;z-index:10000;inset:0;background:#000;overflow:auto;display:flex;justify-content:center;align-items:flex-start;overscroll-behavior:contain}
.r94-exact-master-canvas{position:relative;width:min(100vw,709px);aspect-ratio:709/1536;background:#000;flex:0 0 auto;overflow:hidden}
.r94-exact-master-image{position:absolute;z-index:1;inset:0;width:100%;height:100%;display:block;object-fit:fill;pointer-events:none;user-select:none;-webkit-user-drag:none}
.r94-hot{position:absolute;z-index:20;background:transparent!important;border:0!important;box-shadow:none!important;padding:0!important;margin:0!important;outline:none!important;touch-action:manipulation}
</style>`;
  out=out.replace('</head>',style+'\n</head>');
  return out;
};
