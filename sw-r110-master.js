/* R110 — CRM 1.3 RYNKI EU — DANE FIRMY LIVE / ANPOL VERIFIED
   Baza: bezwzględny MASTER R109 (4 pełnoekranowe karty).
   Zmiana chirurgiczna: wyłącznie ożywienie karty DANE FIRMY dla zweryfikowanego rekordu anpol-pl.
   R109 jest importowany jako nieruszona warstwa MASTER.
*/
importScripts('./sw-r109-master.js?v=R110-base-r109-master');

const r110BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r110BasePatchIndexHtml(text);

  const r110CompanyMarker='  renderCompany=r109RenderCompanyWithActionsGraphic;';
  if(out.includes(r110CompanyMarker) && !out.includes('function r110RenderCompanyDataLive')){
    const r110Patch=`

  function r110LiveField(layer,cls,key){
    const el=document.createElement('div');
    el.className='r110-live-field '+cls;
    el.dataset.live=key;
    layer.append(el);
    return el;
  }

  function r110FormatDate(value){
    if(!value)return '';
    const s=String(value);
    const m=s.match(/^(\\d{4})-(\\d{2})-(\\d{2})/);
    return m?m[3]+'.'+m[2]+'.'+m[1]:s;
  }

  async function r110LoadLiveRecord(id){
    let doc=null;
    try{
      const res=await fetch('./crm-live-overrides.json?live='+Date.now(),{cache:'no-store'});
      if(res.ok){
        doc=await res.json();
        try{localStorage.setItem('crm13_live_overrides_v1',JSON.stringify(doc));}catch(_){}
      }
    }catch(_){}
    if(!doc){
      try{doc=JSON.parse(localStorage.getItem('crm13_live_overrides_v1')||'null');}catch(_){}
    }
    const list=doc&&Array.isArray(doc.records)?doc.records:[];
    return list.find(x=>x&&x.id===id)||null;
  }

  function r110ApplyLiveRecord(screen,base,live){
    const c=Object.assign({},base||{},live||{});
    const set=(key,val)=>{
      const el=screen.querySelector('[data-live="'+key+'"]');
      if(el)el.textContent=val==null?'':String(val);
    };

    set('name',c.name||'');
    set('id',c.displayId||c.id||'');
    set('country',c.countryName||'');
    set('city',c.city||'');
    set('type',c.type||'');
    set('role',c.role||'');
    set('legalName',c.legalName||c.name||'');
    set('contactPerson',c.contactPerson||'');
    set('address',c.address||'');
    set('phone',c.phone||'');
    set('mobile',c.mobile||'');
    set('email',c.email||'');
    set('website',c.website||'');
    set('nip',c.nip||'');
    set('activity',c.activity||'');
    set('year',c.establishedYear||'');
    set('products',c.products||'');
    set('priority',c.priority?('PRIORYTET '+c.priority):'');
    set('status',c.status||'');
    set('lastContact',r110FormatDate(c.lastContact));
    set('nextContact',r110FormatDate(c.nextContact));
    set('goal',c.contactGoal||c.nextFollowUp||'');
    set('note',c.note||'');
    set('addedAt',r110FormatDate(c.addedAt));
    set('updatedAt',c.lastVerified||r110FormatDate(c.sourceDate)||'');
    set('updatedBy',c.updatedBy||'');

    const flag=screen.querySelector('.r110-live-flag');
    if(flag&&c.countryCode)flag.src='./flag-'+String(c.countryCode).toLowerCase()+'-master.png';
  }

  function r110RenderCompanyDataLive(){
    const screen=r105RenderCompanyDataGraphic();
    const id=state.selectedCompany||'';
    if(id!=='anpol-pl')return screen;

    const layer=document.createElement('div');
    layer.className='r110-live-layer';
    layer.innerHTML='<img class="r110-live-flag" alt="">';
    [
      ['r110-name','name'],['r110-id','id'],['r110-country','country'],['r110-city','city'],
      ['r110-type','type'],['r110-role','role'],['r110-legal-name','legalName'],
      ['r110-contact-person','contactPerson'],['r110-address','address'],['r110-phone','phone'],
      ['r110-mobile','mobile'],['r110-email','email'],['r110-website','website'],['r110-nip','nip'],
      ['r110-activity','activity'],['r110-year','year'],['r110-products','products'],
      ['r110-priority','priority'],['r110-status','status'],['r110-last-contact','lastContact'],
      ['r110-next-contact','nextContact'],['r110-goal','goal'],['r110-note','note'],
      ['r110-added','addedAt'],['r110-updated','updatedAt'],['r110-author','updatedBy']
    ].forEach(([cls,key])=>r110LiveField(layer,cls,key));
    screen.append(layer);

    const base=getCompanyById(id)||{};
    r110LoadLiveRecord(id).then(live=>r110ApplyLiveRecord(screen,base,live||{}));
    return screen;
  }
`;
    out=out.replace(r110CompanyMarker,r110CompanyMarker+r110Patch);
  }

  out = out.replace(
    "    else if(state.route==='company-data-graphic') view=r105RenderCompanyDataGraphic();",
    "    else if(state.route==='company-data-graphic') view=r110RenderCompanyDataLive();"
  );

  if(!out.includes('id="r110-live-data-style"')){
    const r110Style=`
<style id="r110-live-data-style">
.r110-live-layer{position:absolute;inset:0;z-index:20;pointer-events:none;color:#f4f4f4;font-family:Arial,Helvetica,sans-serif;}
.r110-live-field{position:absolute;line-height:1.16;text-shadow:0 1px 2px #000;overflow:hidden;}
.r110-live-flag{position:absolute;left:5.1%;top:9.5%;width:12.4%;height:7.3%;object-fit:contain;filter:drop-shadow(0 2px 3px #000);}
.r110-name{left:21.5%;top:11.9%;width:51%;font-size:clamp(20px,4.3vw,31px);font-weight:800;}
.r110-id{left:81.7%;top:10.3%;width:13%;font-size:clamp(11px,2.5vw,18px);white-space:nowrap;}
.r110-country{left:12.8%;top:18.55%;width:16%;font-size:clamp(11px,2.7vw,18px);}
.r110-city{left:31.8%;top:18.55%;width:17%;font-size:clamp(11px,2.7vw,18px);}
.r110-type{left:48.7%;top:18.55%;width:28%;font-size:clamp(10px,2.35vw,17px);white-space:nowrap;}
.r110-role{left:78.7%;top:18.55%;width:17%;font-size:clamp(10px,2.35vw,17px);white-space:nowrap;}
.r110-legal-name{left:37.0%;top:22.35%;width:39%;font-size:clamp(10px,2.45vw,17px);}
.r110-contact-person{left:37.0%;top:25.45%;width:39%;font-size:clamp(10px,2.45vw,17px);}
.r110-address{left:37.0%;top:28.3%;width:39%;height:6.2%;font-size:clamp(10px,2.35vw,17px);white-space:pre-line;}
.r110-phone{left:37.0%;top:34.1%;width:39%;font-size:clamp(10px,2.45vw,17px);}
.r110-mobile{left:37.0%;top:36.85%;width:39%;font-size:clamp(10px,2.45vw,17px);}
.r110-email{left:37.0%;top:39.55%;width:39%;font-size:clamp(9px,2.25vw,16px);}
.r110-website{left:37.0%;top:42.25%;width:39%;font-size:clamp(9px,2.25vw,16px);}
.r110-nip{left:37.0%;top:44.95%;width:39%;font-size:clamp(10px,2.4vw,17px);}
.r110-activity{left:37.0%;top:47.6%;width:54%;height:4.5%;font-size:clamp(9px,2.15vw,16px);}
.r110-year{left:37.0%;top:51.35%;width:39%;font-size:clamp(10px,2.4vw,17px);}
.r110-products{left:13.4%;top:57.15%;width:80%;height:5.7%;font-size:clamp(10px,2.45vw,17px);}
.r110-priority{left:73.5%;top:64.7%;width:20%;font-size:clamp(9px,2.1vw,15px);text-align:center;color:#8fd3ff;font-weight:700;}
.r110-status{left:35.0%;top:67.9%;width:56%;font-size:clamp(10px,2.35vw,17px);color:#56ff3c;font-weight:700;}
.r110-last-contact{left:35.0%;top:70.9%;width:21%;font-size:clamp(9px,2.15vw,15px);}
.r110-next-contact{left:73.0%;top:70.9%;width:21%;font-size:clamp(9px,2.15vw,15px);}
.r110-goal{left:35.0%;top:74.0%;width:58%;height:4.5%;font-size:clamp(9px,2.15vw,16px);}
.r110-note{left:35.0%;top:78.0%;width:58%;height:4.6%;font-size:clamp(9px,2.05vw,15px);}
.r110-added{left:12.2%;top:82.6%;width:23%;font-size:clamp(9px,2.05vw,15px);}
.r110-updated{left:50.7%;top:82.6%;width:28%;font-size:clamp(9px,2.05vw,15px);}
.r110-author{left:84.3%;top:82.6%;width:11%;font-size:clamp(9px,2vw,14px);}
</style>
`;
    out=out.replace('</head>',r110Style+'</head>');
  }

  out = out.replaceAll('1.3.0-master-r109-rynki-eu-akcje-status-full-graphic','1.3.0-master-r110-dane-firmy-live-anpol-verified');
  out = out.replaceAll('R109 RYNKI EU — AKCJE I STATUS FULL GRAPHIC','R110 RYNKI EU — DANE FIRMY LIVE ANPOL VERIFIED');
  out = out.replace("const BUILD_TIME = '22:06';","const BUILD_TIME = '22:20';");
  out = out.replaceAll('R109-akcje-status-full-graphic-2206','R110-dane-firmy-live-anpol-verified-2220');
  out = out.replaceAll('R109-2206','R110-2220');
  return out;
};
