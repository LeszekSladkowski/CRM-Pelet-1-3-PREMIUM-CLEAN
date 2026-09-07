/* R98 — DANE FIRMY IN-SCOPE SURGICAL FIX — ANPOL ONLY
   BAZA: STAN 0 / R92 + wdrożony raster CLEAN MASTER.
   Naprawa R97: logika karty działa teraz WEWNĄTRZ głównego runtime CRM,
   więc ma dostęp do state/liveData/getCompanyById i nie uruchamia starego arkusza.
   Zakres: wyłącznie ANPOL + kafel DANE FIRMY.
*/
importScripts('./sw-r76-stable.js?v=R76-stable-clean-base');

const R98_ASSETS=[
  './r84-backup-prune.js',
  './assets/masters/dane-firmy-clean-master.png'
];
if(Array.isArray(ASSETS))R98_ASSETS.forEach(a=>{if(!ASSETS.includes(a))ASSETS.push(a)});

const r98BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r98BasePatchIndexHtml(text);
  out = out.replaceAll('1.3.0-master-r76-waluty-karta4-surgical-gauge-clean','1.3.0-master-r98-dane-firmy-in-scope-fix');
  out = out.replaceAll('R76 WALUTY KARTA 4 SURGICAL GAUGE CLEAN','R98 DANE FIRMY IN-SCOPE FIX');
  out = out.replace("const BUILD_DATE = '02.09.2026';","const BUILD_DATE = '07.09.2026';");
  out = out.replace("const BUILD_TIME = '17:58';","const BUILD_TIME = '15:28';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R76-waluty-karta4-surgical-gauge-clean-1758'","navigator.serviceWorker.register('./sw.js?v=R98-dane-firmy-in-scope-fix-1528'");

  if(!out.includes('r84-backup-prune.js')){
    out = out.replace('</body>','<script src="./r84-backup-prune.js?v=R98-1528"></script>\n</body>');
  }else{
    out = out.replace(/r84-backup-prune\.js\?v=[^\"']+/g,'r84-backup-prune.js?v=R98-1528');
  }

  const style=String.raw`<style id="r98-dane-firmy-in-scope">
.r98-company-overlay{position:fixed;inset:0;z-index:9999;background:#000;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;touch-action:pan-y pinch-zoom}
.r98-company-card{position:relative;width:min(100vw,720px);margin:0 auto;background:#000}
.r98-company-master{display:block;width:100%;height:auto;pointer-events:none;user-select:none}
.r98-f{position:absolute;z-index:7;color:#f4f4f4;font-family:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;display:flex;align-items:center;overflow:hidden;line-height:1.12;text-shadow:0 1px 2px #000;pointer-events:none}
.r98-name{font-size:clamp(20px,5.7vw,39px);font-weight:900}.r98-sub{font-size:clamp(10px,2.7vw,18px);font-weight:700}.r98-small{font-size:clamp(8px,2.15vw,14px)}
.r98-val{font-size:clamp(10px,2.72vw,18px)}.r98-product{font-size:clamp(10px,2.8vw,19px)}
.r98-chip{justify-content:center;font-size:clamp(8px,2.15vw,14px);font-weight:850;white-space:nowrap;text-overflow:ellipsis}.r98-blue{color:#43b8ff}.r98-green{color:#6dff21}.r98-gold{color:#ffd23f}.r98-red{color:#ff5a55}
.r98-prio{justify-content:center;color:#55bfff;font-size:clamp(8px,2.15vw,14px);font-weight:850}.r98-status-dot{width:.7em;height:.7em;border-radius:50%;background:#31ff22;margin-right:.45em;box-shadow:0 0 8px #31ff22}
.r98-logo{position:absolute;z-index:7;left:71.0%;top:22.7%;width:24.0%;height:10.3%;background:#f5f1e5;border-radius:3%;display:flex;align-items:center;justify-content:center;text-align:center;padding:4%;color:#111;font-weight:900;font-size:clamp(11px,3vw,20px);line-height:1.05;overflow:hidden}
.r98-flag{position:absolute;z-index:6;left:5.0%;top:10.8%;width:14.0%;height:9.2%;object-fit:contain;filter:drop-shadow(0 0 3px rgba(0,0,0,.8));pointer-events:none}
.r98-hot{position:absolute;z-index:20;border:0;background:transparent;padding:0;cursor:pointer;touch-action:manipulation}
</style>`;
  if(!out.includes('r98-dane-firmy-in-scope')) out=out.replace('</head>',style+'\n</head>');

  const helper=String.raw`
  function r98OpenCompanyData(c){
    if(!c)return;
    document.querySelector('.r98-company-overlay')?.remove();
    const raw=(liveData.records||[]).find(function(r){return String(r&&r.id||'')===String(c.id||'')})||{};
    const root=document.createElement('div');root.className='r98-company-overlay';
    const card=document.createElement('section');card.className='r98-company-card';
    const img=document.createElement('img');img.className='r98-company-master';img.src='./assets/masters/dane-firmy-clean-master.png?v=R98-1528';img.alt='DANE FIRMY — MASTER';card.append(img);root.append(card);document.body.append(root);
    const close=function(){root.remove()};
    const esc=function(v){return String(v==null?'':v).replace(/[&<>\"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[ch]})};
    const show=function(v){var s=String(v==null?'':v).trim();return s||'—'};
    const add=function(cls,l,t,w,h,html){var d=document.createElement('div');d.className='r98-f '+cls;Object.assign(d.style,{left:l+'%',top:t+'%',width:w+'%',height:h+'%'});d.innerHTML=html;card.append(d);return d};
    const hot=function(label,l,t,w,h,fn){var b=document.createElement('button');b.type='button';b.className='r98-hot';b.setAttribute('aria-label',label);Object.assign(b.style,{left:l+'%',top:t+'%',width:w+'%',height:h+'%'});b.addEventListener('click',fn);card.append(b);return b};
    const datePL=function(v){if(!v)return '—';try{return new Intl.DateTimeFormat('pl-PL').format(new Date(v))}catch(e){return String(v)}};
    const country=c.countryName||countries[c.countryCode]?.name||c.countryCode||'—';
    const roles=(typeof marketRolesFor==='function'?marketRolesFor(c):[c.role||'—']).join(' / ');
    const city=show(c.city||c.region);const direction=show(c.direction||c.role||roles);
    const address=[c.address,c.city,c.region,c.countryName].filter(Boolean).filter(function(v,i,a){return a.indexOf(v)===i}).join(', ');
    const person=show(c.contactPerson||raw.contactPerson||raw.contact||'Dział handlowy');
    const phone=show(c.phone||raw.phone);const mobile=show(raw.mobile||raw.mobilePhone||raw.phone2);
    const email=show(c.email||raw.email);const website=show(raw.website||raw.www||raw.url);
    const nip=show(raw.nip||raw.vatId||raw.vat);const founded=show(raw.founded||raw.yearFounded||raw.established);
    const activity=show(raw.activity||raw.businessType||c.type);const status=show(raw.status||'NOWY').replaceAll('_',' ');
    const product=show(c.availability||c.certificate||'Pellet drzewny');
    const logistics=c.logistics&&typeof c.logistics==='object'?Object.values(c.logistics).filter(Boolean).slice(0,2).join(' • '):'';
    const product2=show([c.certificate,c.enplusId?('ENplus ID: '+c.enplusId):'',logistics].filter(Boolean).join(' • '));
    const note=show((Array.isArray(c.notes)&&c.notes.length?c.notes.join(' • '):'')||c.missingInfo||raw.missingInfo);
    const lastContact=datePL(raw.lastContact||raw.lastContactAt);const nextContact=datePL(c.nextFollowUpDate||raw.nextContactDate||raw.followUpDate);
    const added=datePL(c.addedAt||raw.addedAt);const updated=datePL(raw.updatedAt||liveData.updatedAt);

    if(typeof r15Flag==='function'){var f=document.createElement('img');f.className='r98-flag';f.src=r15Flag(c.countryCode);f.alt='Flaga '+country;card.append(f)}
    add('r98-name',21.8,12.55,45,3.55,esc(c.name));add('r98-sub',21.8,16.05,47,2.4,esc(show(c.type)));add('r98-small',80,10.9,13.5,2.2,esc('ID: '+show(c.id)));
    add('r98-chip r98-blue',5,17.65,15.4,3,esc(country));add('r98-chip r98-green',22.5,17.65,16.1,3,esc(city));add('r98-chip r98-gold',40.6,17.65,29,3,esc(show(c.type)));add('r98-chip r98-red',77,17.65,18,3,esc(direction));
    add('r98-val',35.7,22.1,31,2.25,esc(c.name));add('r98-val',35.7,24.75,31,2.25,esc(person));add('r98-val',35.7,27.5,31.5,5.4,esc(show(address)));
    add('r98-val',35.7,33.4,31,2.3,esc(phone));add('r98-val',35.7,36.1,31,2.3,esc(mobile));add('r98-val',35.7,38.8,50,2.3,esc(email));add('r98-val',35.7,41.45,50,2.3,esc(website));add('r98-val',35.7,44.1,31,2.3,esc(nip));add('r98-val',35.7,46.8,53,3.45,esc(activity));add('r98-val',35.7,50.25,31,2.3,esc(founded));
    var logo=document.createElement('div');logo.className='r98-logo';logo.textContent=c.name;card.append(logo);
    add('r98-product',12.8,55.7,76,2.45,esc(product));add('r98-product',12.8,58.05,76,3.45,esc(product2));add('r98-prio',74.3,63.45,19.8,2.45,esc('PRIORYTET '+show(c.priority)));
    add('r98-val r98-green',31,66.15,50,2.25,'<span class="r98-status-dot"></span>'+esc(status));add('r98-small',35.4,69.05,13.5,2.25,esc(lastContact));add('r98-small',79.1,69.05,13.5,2.25,esc(nextContact));
    add('r98-small',35.4,71.95,57,3.1,esc(show(c.nextFollowUp||raw.nextFollowUp)));add('r98-small',35.4,75.15,57,3.15,esc(note));add('r98-small',10.2,80.95,18,2,esc(added));add('r98-small',51.4,80.95,23,2,esc(updated));add('r98-small',84,80.95,8.5,2,'L&M');
    hot('Wstecz',2,1.2,12.5,8,close);hot('Synchronizuj',82,1.2,14,8,function(){Promise.resolve(sync('✓ Dane firmy zsynchronizowane')).then(function(){var fresh=getCompanyById(c.id);root.remove();if(fresh)r98OpenCompanyData(fresh)})});
    hot('Pokaż na mapie',70,32.6,25.3,4.8,function(){mapUrl([c.name,c.address||c.city,c.countryName].filter(Boolean).join(', '))});
    hot('Telefon',34.5,33,33.5,2.9,function(){phone!=='—'?openUrl('tel:'+phone):toast('Brak telefonu w rekordzie')});hot('Telefon komórkowy',34.5,35.8,33.5,2.9,function(){mobile!=='—'?openUrl('tel:'+mobile):toast('Brak telefonu komórkowego w rekordzie')});
    hot('E-mail',34.5,38.55,53,2.9,function(){email!=='—'?openUrl('mailto:'+email):toast('Brak e-mail w rekordzie')});hot('WWW',34.5,41.2,53,2.9,function(){website!=='—'?window.open(/^https?:/i.test(website)?website:'https://'+website,'_blank','noopener'):toast('Brak strony WWW w rekordzie')});
    hot('Aktualizuj dane',3.5,83.9,44,6.2,function(){openModuleSheet('AKTUALIZUJ DANE — '+c.name,'Edycja danych pozostaje kontrolowana. Test R98 sprawdza wyłącznie poprawne wyświetlanie MASTER + dane LIVE.')});hot('Szukaj danych w Google',49,83.9,47.5,6.2,function(){window.open('https://www.google.com/search?q='+encodeURIComponent(c.name+' '+country),'_blank','noopener')});hot('Wróć do karty',3.5,91,93,6.4,close);
  }
`;
  if(!out.includes('function r98OpenCompanyData(c)')) out=out.replace('  function renderGenericCompany(id){',helper+'\n  function renderGenericCompany(id){');

  out=out.replace("      if(sec==='status') openStatusSheet();","      if(sec==='data' && c.id==='anpol-pl'){ r98OpenCompanyData(c); return; }\n      if(sec==='status') openStatusSheet();");
  return out;
};
