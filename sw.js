/* R111 — CRM 1.3 RYNKI EU — DANE FIRMY LIVE SURGICAL UI + ACTIVE ACTIONS
   Baza: R110 DANE FIRMY LIVE / ANPOL VERIFIED.
   Zmiana chirurgiczna: wyłącznie karta DANE FIRMY LIVE — geometria tekstów i aktywne przyciski.
   R110 jest importowany 1:1 jako nieruszona warstwa bazowa.
*/
importScripts('./sw-r110-master.js?v=R111-base-r110-master');

const r111BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r111BasePatchIndexHtml(text);

  /* R111 — pewne tło pod niepustymi danymi, żeby tekst nie zderzał się z kreskami szablonu. */
  out = out.replace(
    "if(el)el.textContent=val==null?'':String(val);",
    "if(el){const txt=val==null?'':String(val);el.textContent=txt;el.classList.toggle('has-live',Boolean(txt.trim()));}"
  );

  /* R111 — skróty tylko prezentacyjne dla górnych kolorowych pól. Dane źródłowe pozostają pełne. */
  out = out.replace("set('city',c.city||'');","set('city',(c.city||'').split('/')[0].trim());");
  out = out.replace("set('type',c.type||'');","set('type',(c.type||'').split('/')[0].trim());");

  /* R111 — helpery i prawdziwe akcje dla karty DANE FIRMY. */
  const marker='  function r110RenderCompanyDataLive(){';
  if(out.includes(marker) && !out.includes('function r111AttachLiveActions')){
    const patch=`

  function r111LocalStore(){
    try{return JSON.parse(localStorage.getItem('crm13_company_live_local_v1')||'{}')||{}}catch(_){return {}}
  }
  function r111GetLocalEdit(id){
    const all=r111LocalStore();
    return all&&all[id]?all[id]:null;
  }
  function r111SetLocalEdit(id,patch){
    const all=r111LocalStore();
    all[id]=Object.assign({},all[id]||{},patch||{});
    try{localStorage.setItem('crm13_company_live_local_v1',JSON.stringify(all));}catch(_){}
  }
  function r111MergedCompany(base,live){
    const id=(base&&base.id)||state.selectedCompany||'';
    return Object.assign({},base||{},live||{},r111GetLocalEdit(id)||{});
  }
  function r111GoCompany(){
    state.route='company';render();
  }
  function r111GoCountry(c){
    if(c&&c.countryCode)state.selectedCountry=c.countryCode;
    state.route=(c&&c.countryCode==='DE')?'germany':'country';
    render();
  }
  function r111OpenMap(base){
    const id=(base&&base.id)||state.selectedCompany||'';
    r110LoadLiveRecord(id).then(live=>{
      const c=r111MergedCompany(base,live);
      const q=c.address||[c.name,c.city,c.countryName].filter(Boolean).join(', ');
      if(!q){toast('Brak adresu firmy do mapy.');return;}
      mapUrl(q);
    });
  }
  function r111OpenGoogle(base){
    const id=(base&&base.id)||state.selectedCompany||'';
    r110LoadLiveRecord(id).then(live=>{
      const c=r111MergedCompany(base,live);
      const q=[c.legalName||c.name,c.city,c.countryName].filter(Boolean).join(' ');
      const url='https://www.google.com/search?q='+encodeURIComponent(q);
      const w=window.open(url,'_blank','noopener');
      if(!w)location.href=url;
    });
  }
  function r111OpenDataEditor(base){
    const id=(base&&base.id)||state.selectedCompany||'';
    r110LoadLiveRecord(id).then(live=>{
      const c=r111MergedCompany(base,live);
      sheet.classList.remove('wm-settings-sheet');
      sheetTitle.textContent='UAKTUALNIJ DANE — '+(c.name||'FIRMA');
      sheetContent.innerHTML='';
      const fields=[
        ['legalName','Pełna nazwa firmy',false],
        ['address','Adres',false],
        ['phone','Telefon',false],
        ['mobile','Telefon komórkowy',false],
        ['email','E-mail',false],
        ['website','Strona WWW',false],
        ['nip','NIP',false],
        ['activity','Rodzaj działalności',true],
        ['products','Produkty / oferta',true],
        ['status','Status',false],
        ['contactGoal','Cel kontaktu',true],
        ['note','Notatka',true]
      ];
      const controls={};
      fields.forEach(item=>{
        const key=item[0],labelText=item[1],multi=item[2];
        const label=document.createElement('label');
        label.className='r111-edit-label';
        const title=document.createElement('span');
        title.textContent=labelText;
        label.append(title);
        const input=document.createElement(multi?'textarea':'input');
        input.className='sheet-input r111-edit-input';
        if(multi)input.rows=2;
        input.value=c[key]||'';
        input.dataset.key=key;
        label.append(input);
        sheetContent.append(label);
        controls[key]=input;
      });
      const save=document.createElement('button');
      save.type='button';save.className='sheet-action green wide';save.textContent='ZAPISZ DANE';
      save.addEventListener('click',()=>{
        const patch={};
        Object.keys(controls).forEach(key=>patch[key]=controls[key].value.trim());
        const now=new Date();
        patch.lastVerified=now.toLocaleDateString('pl-PL')+' '+now.toLocaleTimeString('pl-PL',{hour:'2-digit',minute:'2-digit'});
        patch.updatedBy='L&M';
        r111SetLocalEdit(id,patch);
        closeSheet();
        toast('✓ Dane firmy zapisane lokalnie.');
        render();
      });
      sheetContent.append(save);
      sheet.hidden=false;
      setTimeout(()=>{const first=sheetContent.querySelector('.r111-edit-input');if(first)first.focus()},80);
    });
  }
  function r111Hot(screen,cls,label,handler){
    const b=document.createElement('button');
    b.type='button';b.className='r111-hot '+cls;b.setAttribute('aria-label',label);
    b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();handler();});
    screen.append(b);return b;
  }
  function r111AttachLiveActions(screen,base){
    if(!screen||screen.querySelector('.r111-hot'))return;
    const c=base||getCompanyById(state.selectedCompany)||{};
    r111Hot(screen,'r111-back-top','Wróć do karty',r111GoCompany);
    r111Hot(screen,'r111-sync','Synchronizuj',()=>sync());
    r111Hot(screen,'r111-blue','Wróć do listy kraju',()=>r111GoCountry(c));
    r111Hot(screen,'r111-green','Mapa firmy',()=>r111OpenMap(c));
    r111Hot(screen,'r111-yellow','Ceny i oferta',()=>{state.route='company-offer-graphic';render()});
    r111Hot(screen,'r111-red','Akcje i status',()=>{state.route='company-actions-graphic';render()});
    r111Hot(screen,'r111-map','Pokaż na mapie',()=>r111OpenMap(c));
    r111Hot(screen,'r111-update','Uaktualnij dane',()=>r111OpenDataEditor(c));
    r111Hot(screen,'r111-google','Szukaj danych w Google',()=>r111OpenGoogle(c));
    r111Hot(screen,'r111-back-bottom','Wróć do karty',r111GoCompany);
  }

`;
    out=out.replace(marker,patch+marker);
  }

  /* R111 — lokalna edycja ma pierwszeństwo nad warstwą LIVE i wszystkie hotspoty są dołączone po renderze. */
  out = out.replace(
    "r110LoadLiveRecord(id).then(live=>r110ApplyLiveRecord(screen,base,live||{}));\n    return screen;",
    "r110LoadLiveRecord(id).then(live=>r110ApplyLiveRecord(screen,base,r111MergedCompany(base,live||{})));\n    r111AttachLiveActions(screen,base);\n    return screen;"
  );

  /* R111 — chirurgiczna geometria S24 Ultra, bez zmiany grafiki MASTER. */
  if(!out.includes('id="r111-live-surgical-style"')){
    const style=`
<style id="r111-live-surgical-style">
.r110-live-field{line-height:1.06;overflow:hidden;text-overflow:clip;}
.r110-live-field.has-live{background:linear-gradient(90deg,rgba(1,8,4,.98),rgba(1,8,4,.91));padding:0 2px;border-radius:2px;}
.r110-name{left:21.4%;top:11.8%;width:47%;font-size:clamp(18px,3.75vw,27px);line-height:1;font-weight:850;white-space:nowrap;}
.r110-id{left:81.0%;top:10.25%;width:14.7%;font-size:clamp(10px,2.15vw,15px);line-height:1;text-align:center;white-space:nowrap;}
.r110-country{left:7.2%;top:18.25%;width:13.6%;font-size:clamp(10px,2.15vw,15px);text-align:center;white-space:nowrap;}
.r110-city{left:22.7%;top:18.25%;width:15.5%;font-size:clamp(9px,2.0vw,14px);text-align:center;white-space:nowrap;}
.r110-type{left:40.5%;top:18.25%;width:30.0%;font-size:clamp(8px,1.85vw,13px);text-align:center;white-space:nowrap;}
.r110-role{left:77.0%;top:18.25%;width:18.4%;font-size:clamp(8px,1.9vw,13px);text-align:center;white-space:nowrap;}
.r110-legal-name{left:36.5%;top:22.15%;width:34.5%;height:3.15%;font-size:clamp(8px,1.82vw,13px);line-height:1.03;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;}
.r110-contact-person{left:36.5%;top:25.65%;width:34.5%;font-size:clamp(8px,1.9vw,13px);white-space:nowrap;}
.r110-address{left:36.5%;top:28.35%;width:34.0%;height:3.1%;font-size:clamp(8px,1.9vw,13px);line-height:1.05;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;}
.r110-phone{left:36.5%;top:34.05%;width:34.0%;font-size:clamp(9px,2.0vw,14px);white-space:nowrap;}
.r110-mobile{left:36.5%;top:36.75%;width:34.0%;font-size:clamp(9px,2.0vw,14px);white-space:nowrap;}
.r110-email{left:36.5%;top:39.45%;width:34.0%;font-size:clamp(8px,1.85vw,13px);white-space:nowrap;}
.r110-website{left:36.5%;top:42.15%;width:34.0%;font-size:clamp(8px,1.85vw,13px);white-space:nowrap;}
.r110-nip{left:36.5%;top:44.85%;width:34.0%;font-size:clamp(9px,1.95vw,14px);white-space:nowrap;}
.r110-activity{left:36.5%;top:47.45%;width:34.0%;height:3.2%;font-size:clamp(8px,1.72vw,12px);line-height:1.02;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;}
.r110-year{left:36.5%;top:51.0%;width:34.0%;font-size:clamp(9px,1.9vw,13px);}
.r110-products{left:12.4%;top:57.15%;width:76.0%;height:4.3%;font-size:clamp(8px,1.82vw,13px);line-height:1.08;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;}
.r110-priority{left:74.6%;top:64.55%;width:19.1%;font-size:clamp(8px,1.7vw,12px);line-height:1;text-align:center;}
.r110-status{left:34.4%;top:67.75%;width:52.0%;font-size:clamp(8px,1.9vw,13px);line-height:1;color:#56ff3c;font-weight:800;white-space:nowrap;}
.r110-last-contact{left:34.4%;top:70.8%;width:18.5%;font-size:clamp(8px,1.7vw,12px);white-space:nowrap;}
.r110-next-contact{left:79.0%;top:70.8%;width:15.0%;font-size:clamp(8px,1.7vw,12px);white-space:nowrap;}
.r110-goal{left:34.4%;top:73.75%;width:58.7%;height:3.1%;font-size:clamp(7px,1.62vw,11.5px);line-height:1.06;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;}
.r110-note{left:34.4%;top:77.4%;width:58.7%;height:3.45%;font-size:clamp(7px,1.52vw,10.8px);line-height:1.05;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;}
.r110-added{left:7.2%;top:83.65%;width:22.0%;font-size:clamp(8px,1.72vw,12px);white-space:nowrap;text-align:center;}
.r110-updated{left:49.8%;top:83.65%;width:28.0%;font-size:clamp(8px,1.62vw,11.5px);white-space:nowrap;text-align:center;}
.r110-author{left:90.0%;top:83.65%;width:7.0%;font-size:clamp(8px,1.7vw,12px);white-space:nowrap;text-align:center;}

.r111-hot{position:absolute;z-index:70;border:0;background:transparent;padding:0;margin:0;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;}
.r111-back-top{left:1.0%;top:.3%;width:15.0%;height:8.5%;}
.r111-sync{right:1.0%;top:.3%;width:18.0%;height:8.8%;}
.r111-blue{left:4.3%;top:17.45%;width:16.5%;height:3.75%;}
.r111-green{left:22.1%;top:17.45%;width:16.7%;height:3.75%;}
.r111-yellow{left:40.1%;top:17.45%;width:31.0%;height:3.75%;}
.r111-red{left:76.6%;top:17.45%;width:19.2%;height:3.75%;}
.r111-map{left:70.4%;top:32.75%;width:25.6%;height:4.45%;}
.r111-update{left:3.2%;top:85.05%;width:44.6%;height:6.4%;}
.r111-google{left:49.2%;top:85.05%;width:47.0%;height:6.4%;}
.r111-back-bottom{left:3.2%;bottom:1.55%;width:93.6%;height:6.8%;}
body.debug .r111-hot{background:rgba(0,170,255,.18);outline:1px dashed #00a7ff;}
.r111-edit-label{display:block;color:#ffd43b;font-weight:800;margin:6px 0 10px;}
.r111-edit-label>span{display:block;margin:0 0 5px;}
.r111-edit-input{margin:0;color:#fff;}
textarea.r111-edit-input{resize:vertical;min-height:68px;}
</style>
`;
    out=out.replace('</head>',style+'</head>');
  }

  out = out.replaceAll('1.3.0-master-r110-dane-firmy-live-anpol-verified','1.3.0-master-r111-dane-firmy-live-surgical-actions');
  out = out.replaceAll('R110 RYNKI EU — DANE FIRMY LIVE ANPOL VERIFIED','R111 RYNKI EU — DANE FIRMY LIVE SURGICAL ACTIONS');
  out = out.replace("const BUILD_TIME = '22:20';","const BUILD_TIME = '22:55';");
  out = out.replaceAll('R110-dane-firmy-live-anpol-verified-2220','R111-dane-firmy-live-surgical-actions-2255');
  out = out.replaceAll('R110-2220','R111-2255');
  return out;
};
