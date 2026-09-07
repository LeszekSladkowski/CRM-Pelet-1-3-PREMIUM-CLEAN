/* R99 — ANPOL / DANE FIRMY — STEP 1
   BAZA: MASTER-R92-FROZEN-2026-09-07 (STAN 0).
   ZAKRES CHIRURGICZNY: wyłącznie rekord anpol-pl i wyłącznie kafel DANE FIRMY.
   Pozostałe firmy, państwa, CENY I OFERTA, NOTATKI ASYSTENTA, AKCJE I STATUS,
   RYNKI EU, WALUTY oraz mechanizmy danych/backupów pozostają bez zmian.
*/
importScripts('./sw-r76-stable.js?v=R76-stable-clean-base');

const R99_ASSETS=[
  './r84-backup-prune.js',
  './assets/masters/dane-firmy-clean-master.png'
];
if(Array.isArray(ASSETS))R99_ASSETS.forEach(a=>{if(!ASSETS.includes(a))ASSETS.push(a)});

const r99BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r99BasePatchIndexHtml(text);
  out = out.replaceAll('1.3.0-master-r76-waluty-karta4-surgical-gauge-clean','1.3.0-master-r99-anpol-dane-firmy-step1');
  out = out.replaceAll('R76 WALUTY KARTA 4 SURGICAL GAUGE CLEAN','R99 ANPOL DANE FIRMY STEP 1');
  out = out.replace("const BUILD_DATE = '02.09.2026';","const BUILD_DATE = '07.09.2026';");
  out = out.replace("const BUILD_TIME = '17:58';","const BUILD_TIME = '15:33';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R76-waluty-karta4-surgical-gauge-clean-1758'","navigator.serviceWorker.register('./sw.js?v=R99-anpol-dane-firmy-step1-1533'");

  if(!out.includes('r84-backup-prune.js')){
    out = out.replace('</body>','<script src="./r84-backup-prune.js?v=R99-1533"></script>\n</body>');
  }else{
    out = out.replace(/r84-backup-prune\.js\?v=[^\"']+/g,'r84-backup-prune.js?v=R99-1533');
  }

  const style=String.raw`<style id="r99-anpol-dane-firmy-step1">
.r99-company-overlay{position:fixed;inset:0;z-index:99999;background:#000;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;touch-action:pan-y pinch-zoom}
.r99-company-card{position:relative;width:min(100vw,720px);margin:0 auto;background:#000;line-height:1}
.r99-company-master{display:block;width:100%;height:auto;pointer-events:none;user-select:none;-webkit-user-drag:none}
.r99-f{position:absolute;z-index:7;display:flex;align-items:center;box-sizing:border-box;color:#f4f4f4;font-family:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;font-weight:650;line-height:1.12;background:rgba(2,13,8,.975);padding:0 .45%;overflow:hidden;white-space:normal;text-overflow:ellipsis;text-shadow:0 1px 2px #000;pointer-events:none}
.r99-name{font-size:clamp(19px,5.5vw,36px);font-weight:900}.r99-sub{font-size:clamp(10px,3vw,18px);font-weight:750;color:#e6e6e6}.r99-small{font-size:clamp(8px,2.35vw,15px)}
.r99-val{font-size:clamp(10px,2.9vw,18px)}.r99-product{font-size:clamp(10px,2.9vw,18px)}
.r99-chip{justify-content:center;text-align:center;font-size:clamp(8px,2.3vw,15px);font-weight:850;border-radius:999px;white-space:nowrap}.r99-blue{color:#45b9ff}.r99-green{color:#76ff00}.r99-gold{color:#ffd12a}.r99-red{color:#ff4d4d}
.r99-prio{justify-content:center;color:#55bfff;font-size:clamp(8px,2.3vw,15px);font-weight:900;border-radius:8px}.r99-status-dot{display:inline-block;width:.72em;height:.72em;border-radius:50%;background:#76ff00;margin-right:.5em;box-shadow:0 0 8px rgba(118,255,0,.65)}
.r99-logo{position:absolute;z-index:7;left:70.3%;top:22.55%;width:24.9%;height:9.55%;box-sizing:border-box;display:flex;align-items:center;justify-content:center;text-align:center;color:#111;background:#f4f1e6;border-radius:3%;font-size:clamp(12px,3.4vw,21px);font-weight:900;line-height:1.05;padding:2%;overflow:hidden}
.r99-flag{position:absolute;z-index:8;left:5.2%;top:11.45%;width:10.7%;height:5.55%;object-fit:fill;pointer-events:none}
.r99-hot{position:absolute;z-index:30;border:0;background:transparent;padding:0;margin:0;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
.r99-hot:focus-visible{outline:2px solid #76ff00;outline-offset:-2px}
</style>`;
  if(!out.includes('r99-anpol-dane-firmy-step1')) out=out.replace('</head>',style+'\n</head>');

  const helper=String.raw`
  function r99OpenCompanyData(c){
    if(!c || String(c.id||'')!=='anpol-pl')return;
    var old=document.querySelector('.r99-company-overlay');if(old)old.remove();
    var records=(liveData&&Array.isArray(liveData.records))?liveData.records:[];
    var raw=records.find(function(r){return String(r&&r.id||'')===String(c.id||'')})||{};
    var prevOverflow=document.body.style.overflow;
    var root=document.createElement('div');root.className='r99-company-overlay';
    var card=document.createElement('section');card.className='r99-company-card';
    var img=document.createElement('img');img.className='r99-company-master';img.src='./assets/masters/dane-firmy-clean-master.png?v=R99-1533';img.alt='DANE FIRMY — MASTER 1:1';
    card.append(img);root.append(card);document.body.append(root);document.body.style.overflow='hidden';root.scrollTop=0;
    var close=function(){document.body.style.overflow=prevOverflow;root.remove()};
    var esc=function(v){return String(v==null?'':v).replace(/[&<>\"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[ch]})};
    var show=function(v){var s=String(v==null?'':v).trim();return s||'—'};
    var add=function(cls,l,t,w,h,html){var d=document.createElement('div');d.className='r99-f '+cls;Object.assign(d.style,{left:l+'%',top:t+'%',width:w+'%',height:h+'%'});d.innerHTML=html;card.append(d);return d};
    var hot=function(label,l,t,w,h,fn){var b=document.createElement('button');b.type='button';b.className='r99-hot';b.setAttribute('aria-label',label);Object.assign(b.style,{left:l+'%',top:t+'%',width:w+'%',height:h+'%'});b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();fn()});card.append(b);return b};
    var datePL=function(v){if(!v)return '—';try{return new Intl.DateTimeFormat('pl-PL').format(new Date(v))}catch(e){return String(v)}};
    var country=(c.countryName||(countries&&countries[c.countryCode]?countries[c.countryCode].name:'')||c.countryCode||'—');
    var roles=(typeof marketRolesFor==='function'?marketRolesFor(c):(Array.isArray(c.roles)?c.roles:[c.role||'—'])).filter(Boolean).join(' / ');
    var city=show(c.city||c.region);
    var direction=show(c.direction||c.role||roles);
    var address=[c.address,c.city,c.region,c.countryName].filter(Boolean).filter(function(v,i,a){return a.indexOf(v)===i}).join(', ');
    var person=show(c.contactPerson||raw.contactPerson||raw.contact||'Dział handlowy');
    var phone=show(c.phone||raw.phone);var mobile=show(raw.mobile||raw.mobilePhone||raw.phone2);
    var email=show(c.email||raw.email);var website=show(raw.website||raw.www||raw.url);
    var nip=show(raw.nip||raw.vatId||raw.vat);var founded=show(raw.founded||raw.yearFounded||raw.established);
    var activity=show(raw.activity||raw.businessType||c.type);
    var status=(typeof r15GetStatus==='function'?show(r15GetStatus(c.id)):show(raw.status||'NOWY')).replaceAll('_',' ');
    var product=show(c.availability||c.certificate||'Pellet drzewny');
    var logistics=c.logistics&&typeof c.logistics==='object'?Object.values(c.logistics).filter(Boolean).slice(0,2).join(' • '):'';
    var product2=show([c.certificate,c.enplusId?('ENplus ID: '+c.enplusId):'',logistics].filter(Boolean).join(' • '));
    var note=show((Array.isArray(c.notes)&&c.notes.length?c.notes.join(' • '):'')||c.missingInfo||raw.missingInfo);
    var lastContact=datePL(raw.lastContact||raw.lastContactAt||c.lastContact||c.lastContactAt);
    var nextContact=datePL(c.nextFollowUpDate||raw.nextContactDate||raw.followUpDate);
    var added=datePL(c.addedAt||raw.addedAt);var updated=datePL(raw.updatedAt||(liveData&&liveData.updatedAt));

    if(typeof r15Flag==='function'){var f=document.createElement('img');f.className='r99-flag';f.src=r15Flag(c.countryCode);f.alt='Flaga '+country;card.append(f)}
    add('r99-name',21.8,12.55,45,3.55,esc(c.name));
    add('r99-sub',21.8,16.05,47,2.4,esc(show(c.type)));
    add('r99-small',80,10.9,13.5,2.2,esc('ID: '+show(c.id)));
    add('r99-chip r99-blue',5,17.65,15.4,3,esc(country));
    add('r99-chip r99-green',22.5,17.65,16.1,3,esc(city));
    add('r99-chip r99-gold',40.6,17.65,29,3,esc(show(c.type)));
    add('r99-chip r99-red',77,17.65,18,3,esc(direction));
    add('r99-val',35.7,22.1,31,2.25,esc(c.name));
    add('r99-val',35.7,24.75,31,2.25,esc(person));
    add('r99-val',35.7,27.5,31.5,5.4,esc(show(address)));
    add('r99-val',35.7,33.4,31,2.3,esc(phone));
    add('r99-val',35.7,36.1,31,2.3,esc(mobile));
    add('r99-val',35.7,38.8,50,2.3,esc(email));
    add('r99-val',35.7,41.45,50,2.3,esc(website));
    add('r99-val',35.7,44.1,31,2.3,esc(nip));
    add('r99-val',35.7,46.8,53,3.45,esc(activity));
    add('r99-val',35.7,50.25,31,2.3,esc(founded));
    var logo=document.createElement('div');logo.className='r99-logo';logo.textContent=c.name;card.append(logo);
    add('r99-product',12.8,55.7,76,2.45,esc(product));
    add('r99-product',12.8,58.05,76,3.45,esc(product2));
    add('r99-prio',74.3,63.45,19.8,2.45,esc('PRIORYTET '+show(c.priority)));
    add('r99-val r99-green',31,66.15,50,2.25,'<span class="r99-status-dot"></span>'+esc(status));
    add('r99-small',35.4,69.05,13.5,2.25,esc(lastContact));
    add('r99-small',79.1,69.05,13.5,2.25,esc(nextContact));
    add('r99-small',35.4,71.95,57,3.1,esc(show(c.nextFollowUp||raw.nextFollowUp)));
    add('r99-small',35.4,75.15,57,3.15,esc(note));
    add('r99-small',10.2,80.95,18,2,esc(added));
    add('r99-small',51.4,80.95,23,2,esc(updated));
    add('r99-small',84,80.95,8.5,2,'L&M');

    hot('Wstecz',2,1.2,12.5,8,close);
    hot('Synchronizuj',82,1.2,14,8,function(){
      if(typeof sync==='function'){
        Promise.resolve(sync('✓ Dane firmy zsynchronizowane')).then(function(){var fresh=getCompanyById(c.id);close();if(fresh)r99OpenCompanyData(fresh)});
      }else location.reload();
    });
    hot('Pokaż na mapie',70,32.6,25.3,4.8,function(){
      if(typeof mapUrl==='function')mapUrl([c.name,c.address||c.city,c.countryName].filter(Boolean).join(', '));
      else window.open('https://www.google.com/maps/search/?api=1&query='+encodeURIComponent([c.name,c.address||c.city,c.countryName].filter(Boolean).join(', ')),'_blank','noopener');
    });
    hot('Telefon',34.5,33,33.5,2.9,function(){phone!=='—'?openUrl('tel:'+phone):toast('Brak telefonu w rekordzie')});
    hot('Telefon komórkowy',34.5,35.8,33.5,2.9,function(){mobile!=='—'?openUrl('tel:'+mobile):toast('Brak telefonu komórkowego w rekordzie')});
    hot('E-mail',34.5,38.55,53,2.9,function(){email!=='—'?openUrl('mailto:'+email):toast('Brak e-mail w rekordzie')});
    hot('WWW',34.5,41.2,53,2.9,function(){website!=='—'?window.open(/^https?:/i.test(website)?website:'https://'+website,'_blank','noopener'):toast('Brak strony WWW w rekordzie')});
    hot('Aktualizuj dane',3.5,83.9,44,6.2,function(){if(typeof openModuleSheet==='function')openModuleSheet('AKTUALIZUJ DANE — '+c.name,'Karta R99 jest testem jednego rekordu. Dane pozostają w bazie CRM; wygląd MASTER pozostaje niezmieniony.')});
    hot('Szukaj danych w Google',49,83.9,47.5,6.2,function(){window.open('https://www.google.com/search?q='+encodeURIComponent(c.name+' '+country),'_blank','noopener')});
    hot('Wróć do karty',3.5,91,93,6.4,close);
  }
`;

  const marker='  function r15OpenSection(c,sec){';
  if(out.includes(marker) && !out.includes('function r99OpenCompanyData(c)')){
    out=out.replace(marker,helper+'\n'+marker);
  }
  if(out.includes('function r99OpenCompanyData(c)')){
    out=out.replace(/if\(sec==='data'\)return openModuleSheet\('DANE FIRMY',r13Esc\(r17DataText\(c\)\)\);/,"if(sec==='data' && String(c&&c.id||'')==='anpol-pl')return r99OpenCompanyData(c);\n    if(sec==='data')return openModuleSheet('DANE FIRMY',r13Esc(r17DataText(c)));");
  }
  return out;
};
