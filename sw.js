/* R96 — DANE FIRMY LIVE SURGICAL
   BAZA: zamrożony R94 DANE FIRMY EXACT UPLOADED MASTER.
   ZAKRES: WYŁĄCZNIE karta DANE FIRMY.
   MASTER 709x1536 pozostaje wizualną bazą 1:1.
   Dla innych rekordów podmieniane są chirurgicznie WYŁĄCZNIE wartości pól,
   bez zasłaniania etykiet, ramek, ikon i sekcji MASTER.
*/
importScripts('./sw-r76-stable.js?v=R76-stable-clean-base');

self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));

const R96_MASTER='./00_GRAFIKI_MASTER_DO_WGRANIA/file_000000003a0c8246b64ee82a6b1bc291.png';
if(Array.isArray(ASSETS) && !ASSETS.includes('./r84-backup-prune.js')) ASSETS.push('./r84-backup-prune.js');
if(Array.isArray(ASSETS) && !ASSETS.includes(R96_MASTER)) ASSETS.push(R96_MASTER);

const r96BasePatchIndexHtml=r48PatchIndexHtml;
r48PatchIndexHtml=function(text){
  let out=r96BasePatchIndexHtml(text);
  out=out.replaceAll('1.3.0-master-r76-waluty-karta4-surgical-gauge-clean','1.3.0-master-r96-dane-firmy-live-surgical');
  out=out.replaceAll('R76 WALUTY KARTA 4 SURGICAL GAUGE CLEAN','R96 DANE FIRMY LIVE SURGICAL');
  out=out.replace("const BUILD_DATE = '02.09.2026';","const BUILD_DATE = '07.09.2026';");
  out=out.replace("const BUILD_TIME = '17:58';","const BUILD_TIME = '14:08';");
  out=out.replace(/navigator\.serviceWorker\.register\('\.\/sw\.js\?v=[^']+'/g,"navigator.serviceWorker.register('./sw.js?v=R96-dane-firmy-live-surgical-1408'");

  if(!out.includes('r84-backup-prune.js')){
    out=out.replace('</body>','<script src="./r84-backup-prune.js?v=R96-1408"></script>\n</body>');
  }else{
    out=out.replace(/r84-backup-prune\.js\?v=[^\"']+/g,'r84-backup-prune.js?v=R96-1408');
  }

  const anchor='renderCompany=renderCompanyR15;';
  if(out.includes(anchor) && !out.includes('function r96OpenCompanyMaster')){
    const code=String.raw`
  const r96OriginalOpenSection=r15OpenSection;
  function r96Close(){const e=document.getElementById('r96-company-master');if(e)e.remove();document.body.classList.remove('r96-company-open')}
  function r96Text(v,f='—'){const s=String(v??'').trim();return s||f}
  function r96Date(v){if(!v)return '—';const d=new Date(v);if(!Number.isNaN(d.getTime()))return String(d.getDate()).padStart(2,'0')+'.'+String(d.getMonth()+1).padStart(2,'0')+'.'+d.getFullYear();return String(v).slice(0,10).split('-').reverse().join('.')}
  function r96Role(c){if(Array.isArray(c.roles)&&c.roles.length)return c.roles.join(' / ');return c.role||c.direction||'KONTRAHENT'}
  function r96Status(c){try{return String(r15GetStatus(c.id)||c.status||'NOWY').replaceAll('_',' ')}catch{return String(c.status||'NOWY').replaceAll('_',' ')}}
  function r96Place(c){return c.address||[c.city,c.region,c.countryName||c.country].filter(Boolean).join(', ')||'—'}
  function r96Products(c){const a=c.product||c.products;const first=Array.isArray(a)?a.join(', '):(a||'Pellet drzewny');const second=c.availability||c.certificate||c.priceText||'';return [first,second]}
  function r96Note(c){if(Array.isArray(c.notes))return c.notes[0]||'—';return c.note||c.notes||'—'}
  function r96IsOpole(c){return !!(c&&(c.id==='sklad-opalu-opole-pl'||String(c.name||'').trim().toLowerCase()==='skład opału opole'))}
  function r96Hot(root,x,y,w,h,label,fn){const b=document.createElement('button');b.type='button';b.className='r96-hot';b.setAttribute('aria-label',label);Object.assign(b.style,{left:(x/709*100)+'%',top:(y/1536*100)+'%',width:(w/709*100)+'%',height:(h/1536*100)+'%'});b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();fn&&fn()});root.appendChild(b);return b}
  function r96Tel(v){const p=String(v||'').replace(/[^+0-9]/g,'');if(p)location.href='tel:'+p;else toast('Brak numeru telefonu.')}
  function r96Mail(v){const e=String(v||'').trim();if(e)location.href='mailto:'+e;else toast('Brak adresu e-mail.')}
  function r96Web(v){const w=String(v||'').trim();if(w)window.open(/^https?:/i.test(w)?w:'https://'+w,'_blank','noopener');else toast('Brak strony WWW.')}
  function r96Google(c){const q=[c.name,c.city,c.countryName,c.type,'pellet'].filter(Boolean).join(' ');window.open('https://www.google.com/search?q='+encodeURIComponent(q),'_blank','noopener')}
  function r96Font(ctx,size,weight=600){ctx.font=weight+' '+size+'px Arial,Roboto,sans-serif';ctx.textBaseline='top'}
  function r96Fit(ctx,text,x,y,maxW,size,minSize,color='#f3f3f3',weight=600){text=r96Text(text);let s=size;r96Font(ctx,s,weight);while(s>minSize&&ctx.measureText(text).width>maxW){s-=.5;r96Font(ctx,s,weight)}ctx.fillStyle=color;ctx.fillText(text,x,y,maxW)}
  function r96Wrap(ctx,text,x,y,maxW,lineH,maxLines,size,color='#f3f3f3',weight=500){text=r96Text(text);r96Font(ctx,size,weight);ctx.fillStyle=color;const words=text.split(/\s+/);let line='',lines=[];for(const w of words){const test=line?line+' '+w:w;if(ctx.measureText(test).width<=maxW||!line)line=test;else{lines.push(line);line=w;if(lines.length===maxLines-1)break}}if(line&&lines.length<maxLines)lines.push(line);if(words.length&&lines.length===maxLines){let last=lines[maxLines-1];while(ctx.measureText(last+'…').width>maxW&&last.length>3)last=last.slice(0,-1);lines[maxLines-1]=last+'…'}lines.forEach((ln,i)=>ctx.fillText(ln,x,y+i*lineH,maxW))}
  function r96Wipe(ctx,x,y,w,h,color='#020b07'){ctx.fillStyle=color;ctx.fillRect(x,y,w,h)}
  function r96StatusColor(s){s=String(s).toUpperCase();if(s.includes('NIEAK'))return '#ff4a45';if(s.includes('OFERTA'))return '#42b8ff';if(s.includes('NEGOC'))return '#ffd34c';return '#58ff2f'}

  function r96PaintCompany(root,img,c){
    if(r96IsOpole(c))return;
    const cv=document.createElement('canvas');cv.className='r96-live-canvas';cv.width=709;cv.height=1536;root.appendChild(cv);
    const ctx=cv.getContext('2d',{alpha:false});ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(img,0,0,709,1536);
    const bg='#020b07',white='#f3f1e7';

    // Nagłówek — wyłącznie wartości.
    r96Wipe(ctx,158,236,374,39,bg);r96Fit(ctx,c.name,160,238,368,30,20,'#f5f5f5',800);
    r96Wipe(ctx,158,277,382,25,bg);r96Fit(ctx,c.activity||c.type||c.category,160,278,378,19,14,'#dedede',500);
    r96Wipe(ctx,549,200,128,25,bg);r96Fit(ctx,'ID: '+r96Text(c.id),552,201,124,14,10,'#d7d7d7',500);

    // Flaga — oryginalną flagę przykrywa nowa flaga w tym samym miejscu.
    try{const fl=document.createElement('img');fl.className='r96-flag';fl.src=r15Flag(c.countryCode);fl.alt='';Object.assign(fl.style,{left:(44/709*100)+'%',top:(214/1536*100)+'%',width:(91/709*100)+'%',height:(87/1536*100)+'%'});root.appendChild(fl)}catch{}

    // Badges: ramki i ikony MASTER zostają. Zmieniamy tylko napisy wewnątrz ramek.
    r96Wipe(ctx,77,315,68,24,'#03100a');r96Fit(ctx,c.countryName||c.country,78,316,66,15,10,'#62c8ff',700);
    r96Wipe(ctx,191,315,72,24,'#03100a');r96Fit(ctx,c.city||c.region,192,316,70,15,10,'#62ff43',700);
    r96Wipe(ctx,322,315,169,24,'#03100a');r96Fit(ctx,c.type||c.category,323,316,167,14,9,'#ffd34c',700);
    r96Wipe(ctx,594,315,75,24,'#03100a');r96Fit(ctx,r96Role(c),595,316,73,13,8,'#ff6670',700);

    // Dane firmy — tylko prawa kolumna z wartościami, etykiety i linie pozostają nietknięte.
    const row=(y,val)=>{r96Wipe(ctx,260,y,219,25,bg);r96Fit(ctx,val,262,y+1,215,17,11,'#f2f2f2',500)};
    row(382,c.name);
    row(420,c.contactPerson||c.contact||'Dział handlowy');
    r96Wipe(ctx,260,458,219,63,bg);r96Wrap(ctx,r96Place(c),262,459,215,20,3,17,'#f2f2f2',500);
    row(539,c.phone);
    row(578,c.mobile);
    row(616,c.email);
    row(654,c.website||c.www);
    row(692,c.vat||c.nip);
    r96Wipe(ctx,260,729,219,45,bg);r96Wrap(ctx,c.activity||c.type||c.category,262,730,215,20,2,16,'#f2f2f2',500);
    row(788,c.year||c.founded);

    // Logo / identyfikator firmy — zachowana biała karta MASTER.
    r96Wipe(ctx,510,389,159,122,white);ctx.fillStyle='#111';r96Font(ctx,20,800);const nm=r96Text(c.name,'FIRMA');
    const logo=String(c.logo||c.logoUrl||'').trim();
    if(logo){const li=document.createElement('img');li.className='r96-logo';li.src=logo;li.alt='';Object.assign(li.style,{left:(510/709*100)+'%',top:(389/1536*100)+'%',width:(159/709*100)+'%',height:(122/1536*100)+'%'});root.appendChild(li)}
    else r96Wrap(ctx,nm,521,418,137,24,3,20,'#111',800);

    // Produkty / oferta — tytuł sekcji i ramka pozostają z MASTER.
    const prod=r96Products(c);r96Wipe(ctx,93,878,565,107,bg);r96Wrap(ctx,prod[0],95,881,560,23,2,17,'#f1f1f1',500);if(prod[1])r96Wrap(ctx,prod[1],95,936,560,22,2,16,'#f1f1f1',500);

    // Status / follow-up — każda wartość osobno, bez wielkiej maski.
    const st=r96Status(c),sc=r96StatusColor(st);r96Wipe(ctx,244,1056,270,25,bg);ctx.fillStyle=sc;ctx.beginPath();ctx.arc(228,1071,7,0,Math.PI*2);ctx.fill();r96Fit(ctx,st,247,1057,265,17,11,sc,700);
    r96Wipe(ctx,249,1096,108,24,bg);r96Fit(ctx,r96Date(c.lastContact),251,1097,104,16,10,'#f2f2f2',500);
    r96Wipe(ctx,557,1096,105,24,bg);r96Fit(ctx,r96Date(c.nextContact),559,1097,101,16,10,'#f2f2f2',500);
    r96Wipe(ctx,248,1137,414,46,bg);r96Wrap(ctx,c.nextFollowUp||c.followUp||c.nextStep||c.goal||c.missingInfo,250,1139,410,20,2,16,'#f2f2f2',500);
    r96Wipe(ctx,248,1191,414,48,bg);r96Wrap(ctx,r96Note(c),250,1193,410,20,2,16,'#f2f2f2',500);

    // Priorytet.
    r96Wipe(ctx,548,1016,109,28,'#06101a');r96Fit(ctx,'PRIORYTET '+r96Text(c.priority,'B'),551,1017,105,14,10,'#63c8ff',700);

    // Metadane — czyste daty, bez ISO i godzin technicznych.
    r96Wipe(ctx,76,1284,127,25,bg);r96Fit(ctx,r96Date(c.addedAt||c.createdAt),78,1285,123,15,10,'#f2f2f2',500);
    r96Wipe(ctx,366,1284,153,25,bg);r96Fit(ctx,r96Date(c.updatedAt||c.sourceDate),368,1285,149,15,10,'#f2f2f2',500);

    img.style.visibility='hidden';
  }

  function r96OpenCompanyMaster(c){
    if(!c)return;r96Close();
    const overlay=document.createElement('div');overlay.id='r96-company-master';overlay.className='r96-company-overlay';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-label','DANE FIRMY — '+r96Text(c.name,'FIRMA'));
    const root=document.createElement('div');root.className='r96-company-canvas';overlay.appendChild(root);
    const img=document.createElement('img');img.className='r96-master-image';img.src='./00_GRAFIKI_MASTER_DO_WGRANIA/file_000000003a0c8246b64ee82a6b1bc291.png?v=R96-1408';img.alt='DANE FIRMY MASTER 1:1';root.appendChild(img);
    const mount=()=>r96PaintCompany(root,img,c);if(img.complete&&img.naturalWidth)mount();else img.addEventListener('load',mount,{once:true});

    r96Hot(root,20,58,103,96,'Wstecz',r96Close);
    r96Hot(root,580,58,110,98,'Synchronizuj',()=>sync('✓ Dane firmy zsynchronizowane'));
    r96Hot(root,252,532,224,34,'Telefon',()=>r96Tel(c.phone));
    r96Hot(root,252,571,224,34,'Telefon komórkowy',()=>r96Tel(c.mobile));
    r96Hot(root,252,609,224,34,'E-mail',()=>r96Mail(c.email));
    r96Hot(root,252,647,224,34,'Strona WWW',()=>r96Web(c.website||c.www));
    r96Hot(root,501,529,174,70,'Pokaż na mapie',()=>r19OpenCompanyMap(c));
    r96Hot(root,29,1343,303,78,'Uaktualnij dane',()=>{r96Close();r96OriginalOpenSection(c,'data')});
    r96Hot(root,348,1343,330,78,'Szukaj danych w Google',()=>r96Google(c));
    r96Hot(root,30,1445,649,63,'Wróć do karty',r96Close);

    document.body.appendChild(overlay);document.body.classList.add('r96-company-open');
  }
  r15OpenSection=function(c,sec){if(sec==='data')return r96OpenCompanyMaster(c);return r96OriginalOpenSection(c,sec)};`;
    out=out.replace(anchor,anchor+code);
  }

  const style=String.raw`<style id="r96-dane-firmy-live-surgical">
body.r96-company-open{overflow:hidden!important}
.r96-company-overlay{position:fixed;z-index:10000;inset:0;background:#000;overflow:auto;display:flex;justify-content:center;align-items:flex-start;overscroll-behavior:contain}
.r96-company-canvas{position:relative;width:min(100vw,709px);aspect-ratio:709/1536;background:#000;flex:0 0 auto;overflow:hidden}
.r96-master-image,.r96-live-canvas{position:absolute;z-index:1;inset:0;width:100%;height:100%;display:block;object-fit:fill;pointer-events:none;user-select:none;-webkit-user-drag:none}
.r96-live-canvas{z-index:2}
.r96-flag,.r96-logo{position:absolute;z-index:4;object-fit:contain;pointer-events:none}.r96-flag{background:#020b07}.r96-logo{background:#f3f1e7}
.r96-hot{position:absolute;z-index:20;background:transparent!important;border:0!important;box-shadow:none!important;padding:0!important;margin:0!important;outline:none!important;touch-action:manipulation}
</style>`;
  out=out.replace('</head>',style+'\n</head>');
  return out;
};
