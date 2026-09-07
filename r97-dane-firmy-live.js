(function(){
  'use strict';
  const TEST_ID='anpol-pl';
  const MASTER='./assets/masters/dane-firmy-clean-master.png?v=R97-1503';
  const esc=v=>String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const show=v=>{const s=String(v??'').trim();return s?s:'—'};
  const rawById=id=>Array.isArray(liveData?.records)?(liveData.records.find(r=>String(r?.id||'')===String(id))||{}):{};
  const countryLabel=c=>c.countryName||countries[c.countryCode]?.name||c.countryCode||'—';
  const topRole=c=>marketRolesFor(c).join(' / ')||c.role||'—';
  const fullAddress=c=>[c.address,c.city,c.region,c.countryName].filter(Boolean).filter((v,i,a)=>a.indexOf(v)===i).join(', ');
  const productText=c=>show(c.availability||c.certificate||'Pellet drzewny');
  const secondaryProduct=c=>{const x=[];if(c.certificate)x.push(c.certificate);if(c.enplusId)x.push('ENplus ID: '+c.enplusId);if(c.logistics&&typeof c.logistics==='object'){Object.values(c.logistics).filter(Boolean).slice(0,2).forEach(v=>x.push(String(v)));}return x.join(' • ')||'—';};
  const followNote=c=>show((c.notes&&c.notes.length?c.notes.join(' • '):'')||c.missingInfo||'—');
  const datePL=v=>{if(!v)return '—';try{return new Intl.DateTimeFormat('pl-PL').format(new Date(v));}catch{return String(v)}};
  const add=(root,cls,left,top,width,height,html)=>{const d=document.createElement('div');d.className='r97-f '+cls;Object.assign(d.style,{left:left+'%',top:top+'%',width:width+'%',height:height+'%'});d.innerHTML=html;root.append(d);return d;};
  const hot=(root,label,left,top,width,height,fn)=>{const b=document.createElement('button');b.type='button';b.className='r97-hot';b.setAttribute('aria-label',label);Object.assign(b.style,{left:left+'%',top:top+'%',width:width+'%',height:height+'%'});b.addEventListener('click',fn);root.append(b);return b;};
  const openUrlSafe=url=>{try{location.href=url}catch{}};

  window.r97OpenCompanyData=function(c){
    if(!c)return;
    document.querySelector('.r97-live-overlay')?.remove();
    const raw=rawById(c.id);
    const root=document.createElement('div');root.className='r97-live-overlay';
    const card=document.createElement('section');card.className='r97-live-card';
    const img=document.createElement('img');img.className='r97-master';img.src=MASTER;img.alt='DANE FIRMY — CLEAN MASTER';card.append(img);
    root.append(card);document.body.append(root);

    const close=()=>root.remove();
    const role=topRole(c), city=show(c.city||c.region), country=countryLabel(c);
    const direction=show(c.direction||c.role||role);
    const status=show(raw.status||'NOWY').replaceAll('_',' ');
    const person=show(c.contactPerson||raw.contact||'Dział handlowy');
    const phone=show(c.phone||raw.phone);
    const mobile=show(raw.mobile||raw.mobilePhone||raw.phone2);
    const email=show(c.email||raw.email);
    const website=show(raw.website||raw.www||raw.url);
    const nip=show(raw.nip||raw.vatId||raw.vat);
    const founded=show(raw.founded||raw.yearFounded||raw.established);
    const activity=show(raw.activity||raw.businessType||c.type);
    const lastContact=datePL(raw.lastContact||raw.lastContactAt);
    const nextContact=datePL(c.nextFollowUpDate||raw.nextContactDate||raw.followUpDate);
    const added=datePL(c.addedAt||raw.addedAt);
    const updated=datePL(raw.updatedAt||liveData.updatedAt);

    if(typeof r15Flag==='function'){
      const f=document.createElement('img');f.className='r97-flag';f.src=r15Flag(c.countryCode);f.alt='Flaga '+country;card.append(f);
    }

    add(card,'r97-name',21.8,12.55,44.0,3.55,esc(c.name));
    add(card,'r97-sub',21.8,16.05,46.0,2.4,esc(show(c.type)));
    add(card,'r97-small',80.0,10.9,13.2,2.2,esc('ID: '+show(c.id)));

    add(card,'r97-chip r97-blue',5.0,17.65,15.4,3.0,esc(country));
    add(card,'r97-chip r97-green',22.5,17.65,16.1,3.0,esc(city));
    add(card,'r97-chip r97-gold',40.6,17.65,29.0,3.0,esc(show(c.type)));
    add(card,'r97-chip r97-red',77.0,17.65,18.0,3.0,esc(direction));

    add(card,'r97-val',35.7,22.1,31.0,2.25,esc(c.name));
    add(card,'r97-val',35.7,24.75,31.0,2.25,esc(person));
    add(card,'r97-val',35.7,27.5,31.5,5.4,esc(show(fullAddress(c))));
    add(card,'r97-val r97-clickable',35.7,33.4,31.0,2.3,esc(phone));
    add(card,'r97-val r97-clickable',35.7,36.1,31.0,2.3,esc(mobile));
    add(card,'r97-val r97-clickable',35.7,38.8,50.0,2.3,esc(email));
    add(card,'r97-val r97-clickable',35.7,41.45,50.0,2.3,esc(website));
    add(card,'r97-val',35.7,44.1,31.0,2.3,esc(nip));
    add(card,'r97-val',35.7,46.8,53.0,3.45,esc(activity));
    add(card,'r97-val',35.7,50.25,31.0,2.3,esc(founded));

    const logo=document.createElement('div');logo.className='r97-logo';logo.textContent=c.name;card.append(logo);

    add(card,'r97-product',12.8,55.7,76.0,2.45,esc(productText(c)));
    add(card,'r97-product',12.8,58.05,76.0,3.45,esc(secondaryProduct(c)));

    add(card,'r97-prio',74.3,63.45,19.8,2.45,esc('PRIORYTET '+show(c.priority)));
    add(card,'r97-val r97-green',31.0,66.15,50.0,2.25,'<span class="r97-status-dot"></span>'+esc(status));
    add(card,'r97-small',35.4,69.05,13.5,2.25,esc(lastContact));
    add(card,'r97-small',79.1,69.05,13.5,2.25,esc(nextContact));
    add(card,'r97-small',35.4,71.95,57.0,3.1,esc(show(c.nextFollowUp||raw.nextFollowUp)));
    add(card,'r97-small',35.4,75.15,57.0,3.15,esc(followNote(c)));

    add(card,'r97-small',10.2,80.95,18.0,2.0,esc(added));
    add(card,'r97-small',51.4,80.95,23.0,2.0,esc(updated));
    add(card,'r97-small',84.0,80.95,8.5,2.0,'L&M');

    hot(card,'Wstecz',2.0,1.2,12.5,8.0,close);
    hot(card,'Synchronizuj',82.0,1.2,14.0,8.0,()=>sync('✓ Dane firmy zsynchronizowane'));
    hot(card,'Pokaż na mapie',70.0,32.6,25.3,4.8,()=>mapUrl([c.name,c.address||c.city,c.countryName].filter(Boolean).join(', ')));
    hot(card,'Telefon',34.5,33.0,33.5,2.9,()=>phone!=='—'?openUrlSafe('tel:'+phone):toast('Brak telefonu w rekordzie'));
    hot(card,'Telefon komórkowy',34.5,35.8,33.5,2.9,()=>mobile!=='—'?openUrlSafe('tel:'+mobile):toast('Brak telefonu komórkowego w rekordzie'));
    hot(card,'E-mail',34.5,38.55,53.0,2.9,()=>email!=='—'?openUrlSafe('mailto:'+email):toast('Brak e-mail w rekordzie'));
    hot(card,'WWW',34.5,41.2,53.0,2.9,()=>website!=='—'?window.open(/^https?:/i.test(website)?website:'https://'+website,'_blank','noopener'):toast('Brak strony WWW w rekordzie'));
    hot(card,'Aktualizuj dane',3.5,83.9,44.0,6.2,()=>openModuleSheet('AKTUALIZUJ DANE — '+c.name,'Edycja danych pozostaje kontrolowana. W tym teście sprawdzamy tylko poprawne wyświetlanie CLEAN MASTER + dane LIVE.'));
    hot(card,'Szukaj danych w Google',49.0,83.9,47.5,6.2,()=>window.open('https://www.google.com/search?q='+encodeURIComponent(c.name+' '+country),'_blank','noopener'));
    hot(card,'Wróć do karty',3.5,91.0,93.0,6.4,close);
  };

  document.addEventListener('click',function(e){
    const b=e.target.closest('.expand-card[data-sec="data"]');
    if(!b || String(state.selectedCompany||'')!==TEST_ID)return;
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
    const c=getCompanyById(TEST_ID);if(c)window.r97OpenCompanyData(c);
  },true);
})();
