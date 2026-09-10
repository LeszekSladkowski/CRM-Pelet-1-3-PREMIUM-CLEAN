/* R130 v1.0A — AKCJE I STATUS — GRAPHIC MASTER + FULL LIVE
   MASTER graficzny: grafiki/rynki-eu/szczegoly-firmy/file_00000000d4dc820e99d86989f5522858.png
   Referencja: Samsung Galaxy S24 Ultra, 852 x 1846.
   Zasada: raster = wygląd. Kod dodaje wyłącznie warstwę LIVE, dane, hotspoty i formularze.
   R128 NOTATKI O FIRMIE i R129 CELE ASYSTENTA pozostają bez zmian.
*/
(function(){
  'use strict';

  const IMG='./grafiki/rynki-eu/szczegoly-firmy/file_00000000d4dc820e99d86989f5522858.png';
  const STORE='crm13_r130_actions_status_v1';
  const STATUS_STORE='crm13_company_statuses';
  const GOALS_STORE='crm13_r129_company_goals_v1';
  const NOTES_STORE='crm13_r128_company_notes_v2';
  const W=852,H=1846;
  const STATUSES=['NOWY','NEGOCJACJE','OFERTA_WYSLANA','AKTYWNY','NIEAKTYWNY'];
  const STATUS_LABEL={NOWY:'NOWY',NEGOCJACJE:'NEGOCJACJE',OFERTA_WYSLANA:'OFERTA WYSŁANA',AKTYWNY:'AKTYWNY',NIEAKTYWNY:'NIEAKTYWNY'};
  const STATUS_COLOR={NOWY:'#28bfff',NEGOCJACJE:'#ffd43b',OFERTA_WYSLANA:'#35bfff',AKTYWNY:'#4dff44',NIEAKTYWNY:'#ff4b56'};
  const STATUS_DESC={NOWY:'Pierwszy kontakt',NEGOCJACJE:'Rozmowy w toku',OFERTA_WYSLANA:'Czekamy na odpowiedź',AKTYWNY:'Współpraca w toku',NIEAKTYWNY:'Wstrzymany / zakończony'};

  function ctx(){return window.R128_CTX||null;}
  function company(){const x=ctx();return x?.getCompanyById?.(x?.state?.selectedCompany)||{};}
  function cid(c){return String(c?.id||c?.name||'firma').trim().toLowerCase().replace(/\s+/g,'-');}
  function clean(a){return (Array.isArray(a)?a:[]).map(v=>String(v||'').trim()).filter(Boolean);}
  function readStore(key){try{const v=JSON.parse(localStorage.getItem(key)||'{}');return v&&typeof v==='object'?v:{}}catch(_){return {};}}
  function writeStore(key,v){localStorage.setItem(key,JSON.stringify(v));}
  function esc(v){return String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
  function pad(n){return String(n).padStart(2,'0');}
  function isoLocal(d=new Date()){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());}
  function plDate(v){const s=String(v||'');const m=s.match(/^(\d{4})-(\d{2})-(\d{2})/);return m?`${m[3]}.${m[2]}.${m[1]}`:s;}
  function plusDays(base,n){const d=new Date((base||isoLocal())+'T12:00:00');d.setDate(d.getDate()+n);return isoLocal(d);}
  function dayDiff(a,b){const x=new Date(String(a)+'T12:00:00'),y=new Date(String(b)+'T12:00:00');return Math.round((x-y)/86400000);}
  function nowStamp(){return new Date().toISOString();}
  function country(c){const x=ctx();return c?.countryName||x?.countries?.[c?.countryCode]?.name||c?.countryCode||'EUROPA';}
  function roleList(c){const x=ctx();try{return clean(x?.marketRolesFor?.(c))}catch(_){return clean([c?.role,c?.type]);}}
  function role(c){return roleList(c)[0]||c?.role||c?.type||'KONTRAHENT';}
  function secondaryRole(c){return roleList(c)[1]||c?.customerRole||((String(role(c)).toUpperCase().includes('DOSTAW'))?'DOSTAWCA':'KLIENT');}
  function place(c){return c?.city||c?.region||c?.address||'—';}
  function displayId(c){return String(c?.displayId||c?.id||'').replace(/^_+|_+$/g,'').replace(/_/g,'-').toUpperCase();}
  function priority(c){return String(c?.priority||'B').toUpperCase();}

  function statusMap(){return readStore(STATUS_STORE);}
  function getStatus(c){return statusMap()[c?.id]||'NOWY';}
  function setRawStatus(c,value){const m=statusMap();if(c?.id)m[c.id]=value;writeStore(STATUS_STORE,m);}

  function goals(c){const g=readStore(GOALS_STORE)[cid(c)]||{};return clean(g.goals);}
  function notes(c){return readStore(NOTES_STORE)[cid(c)]||{};}
  function defaultNextContact(c){
    const n=notes(c),raw=String(c?.nextFollowUp||n?.nextContact||'').trim();
    const m=raw.match(/(20\d{2})[-./](\d{1,2})[-./](\d{1,2})/);
    return {date:m?`${m[1]}-${pad(m[2])}-${pad(m[3])}`:plusDays(isoLocal(),4),method:'TELEFON',who:'DZIAŁ HANDLOWY'};
  }
  function defaultActions(c){
    const src=goals(c);const base=src.length?src:[
      'Skontaktować się z działem handlowym',
      'Zapytanie o aktualne ceny pelletu A1',
      'Potwierdzić dostępność i terminy dostaw',
      'Zapytanie o certyfikaty (ENplus, FSC)',
      'Ustalić warunki pełnego auta (EXW/FCA/DAP)'
    ];
    return base.slice(0,5).map((t,i)=>({id:'a'+Date.now().toString(36)+i,text:t,date:plusDays(isoLocal(),i===0?0:i),status:'DO_WYKONANIA',createdAt:nowStamp()}));
  }
  function read(c){
    const all=readStore(STORE),id=cid(c);let rec=all[id];
    if(!rec){
      const st=getStatus(c),today=isoLocal();
      rec={createdDate:today,updatedAt:nowStamp(),author:'L&M',onlyOpen:true,nextContact:defaultNextContact(c),actions:defaultActions(c),statusHistory:[{date:today,status:st,at:nowStamp()}]};
      all[id]=rec;writeStore(STORE,all);
    }
    rec.actions=Array.isArray(rec.actions)?rec.actions:[];
    rec.statusHistory=Array.isArray(rec.statusHistory)?rec.statusHistory:[];
    rec.nextContact=rec.nextContact&&typeof rec.nextContact==='object'?rec.nextContact:defaultNextContact(c);
    return rec;
  }
  function write(c,patch){const all=readStore(STORE),id=cid(c),old=read(c);all[id]={...old,...(patch||{}),updatedAt:nowStamp(),author:'L&M'};writeStore(STORE,all);return all[id];}

  function setStatus(c,value){
    if(!STATUSES.includes(value))return;
    const old=getStatus(c);setRawStatus(c,value);
    const r=read(c),today=isoLocal();let hist=[...(r.statusHistory||[])];
    if(old!==value||!hist.length)hist.unshift({date:today,status:value,at:nowStamp()});
    hist=hist.slice(0,30);write(c,{statusHistory:hist});ctx()?.toast?.('✓ Status zapisany: '+STATUS_LABEL[value]);open();
  }

  function pct(v,b){return (v/b*100)+'%';}
  function fsize(v){const unit=(window.CSS&&CSS.supports&&CSS.supports('font-size','1cqw'))?'cqw':'vw';return (v/W*100).toFixed(3)+unit;}
  function px(el,x,y,w,h){Object.assign(el.style,{position:'absolute',left:pct(x,W),top:pct(y,H),width:pct(w,W),height:pct(h,H)});return el;}
  function fitText(el,minPx=12){const run=()=>{if(!el.isConnected)return;let fs=parseFloat(getComputedStyle(el).fontSize)||18,guard=0;while((el.scrollHeight>el.clientHeight+1||el.scrollWidth>el.clientWidth+1)&&fs>minPx&&guard++<70){fs=Math.max(minPx,fs-.35);el.style.fontSize=fs+'px';}};requestAnimationFrame(()=>requestAnimationFrame(run));}
  function text(root,value,x,y,w,h,size,opt={}){
    if(value===undefined||value===null||String(value).trim()==='')return null;
    const e=document.createElement('div');e.textContent=String(value);
    e.style.cssText='display:flex;align-items:center;box-sizing:border-box;overflow:hidden;pointer-events:none;text-shadow:0 2px 5px #000,0 0 7px #000;z-index:24;overflow-wrap:break-word;word-break:normal;';
    e.style.justifyContent=opt.center?'center':'flex-start';e.style.textAlign=opt.center?'center':'left';e.style.color=opt.color||'#fff';e.style.fontWeight=opt.weight||'800';e.style.fontSize=fsize(size);e.style.lineHeight=opt.line||'1.08';e.style.whiteSpace=opt.nowrap?'nowrap':'normal';px(e,x,y,w,h);root.append(e);if(opt.fit!==false)fitText(e,opt.min||12);return e;
  }
  function hot(root,x,y,w,h,label,fn){const xctx=ctx();if(xctx?.hotspot){root.append(xctx.hotspot({x,y,w,h,label,onClick:fn,baseW:W,baseH:H,z:60}));return;}const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',label);b.style.cssText='position:absolute;border:0;background:transparent;z-index:60;';px(b,x,y,w,h);b.onclick=fn;root.append(b);}
  function screen(){const s=document.createElement('section');s.className='screen r130-actions-live';s.style.cssText='position:relative;container-type:inline-size;';const img=document.createElement('img');img.className='master';img.src=IMG+'?v=R130-v1-0a';img.alt='AKCJE I STATUS — GRAPHIC MASTER';img.style.cssText='width:100%;height:100%;object-fit:fill;display:block;';s.append(img);return s;}
  function mount(s){const x=ctx();if(x?.app)x.app.replaceChildren(s);else document.querySelector('#app')?.replaceChildren(s);window.scrollTo({top:0,left:0,behavior:'auto'});}
  function back(){ctx()?.render?.();}
  async function syncStay(){const x=ctx(),keep=String(x?.state?.selectedCompany||'');try{const r=x?.sync?.();if(r&&typeof r.then==='function')await r}catch(_){}finally{if(x?.state&&keep)x.state.selectedCompany=keep;setTimeout(open,140);}}

  function dialogBase(title){const d=document.createElement('dialog');d.style.cssText='width:min(94vw,700px);max-height:88vh;overflow:auto;border:2px solid #d7a514;border-radius:22px;background:#06110b;color:#fff;padding:18px;box-shadow:0 0 30px #d7a51488;z-index:99999';const h=document.createElement('h2');h.textContent=title;h.style.cssText='margin:0 0 14px;color:#ffd229;text-align:center;font-size:26px';d.append(h);document.body.append(d);return d;}
  function closeBtn(d,label='ZAMKNIJ'){const b=document.createElement('button');b.textContent=label;b.style.cssText='width:100%;margin-top:14px;padding:14px;border:1px solid #777;border-radius:12px;background:#252525;color:#fff;font-weight:900;font-size:18px';b.onclick=()=>{d.close();d.remove();};d.append(b);}
  function field(d,label,value,type='text'){const l=document.createElement('label');l.style.cssText='display:block;margin:10px 0 6px;color:#ffd229;font-weight:900';l.textContent=label;const i=document.createElement('input');i.type=type;i.value=value||'';i.style.cssText='width:100%;box-sizing:border-box;padding:12px;border:1px solid #9b7814;border-radius:10px;background:#06110d;color:#fff;font-size:18px';d.append(l,i);return i;}
  function selectField(d,label,value,opts){const l=document.createElement('label');l.style.cssText='display:block;margin:10px 0 6px;color:#ffd229;font-weight:900';l.textContent=label;const s=document.createElement('select');s.style.cssText='width:100%;box-sizing:border-box;padding:12px;border:1px solid #9b7814;border-radius:10px;background:#06110d;color:#fff;font-size:18px';opts.forEach(([v,t])=>{const o=document.createElement('option');o.value=v;o.textContent=t;if(v===value)o.selected=true;s.append(o)});d.append(l,s);return s;}
  function saveBar(d,onSave){const bar=document.createElement('div');bar.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:16px';const a=document.createElement('button');a.textContent='ZAPISZ';a.style.cssText='padding:14px;border:2px solid #5dff42;border-radius:12px;background:#073a11;color:#8dff76;font-weight:900;font-size:18px';const b=document.createElement('button');b.textContent='ANULUJ';b.style.cssText='padding:14px;border:1px solid #777;border-radius:12px;background:#252525;color:#fff;font-weight:900;font-size:18px';a.onclick=()=>onSave(d);b.onclick=()=>{d.close();d.remove();};bar.append(a,b);d.append(bar);}

  function statusDialog(c){const d=dialogBase('ZMIEŃ STATUS — '+(c.name||''));const grid=document.createElement('div');grid.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:10px';STATUSES.forEach(v=>{const b=document.createElement('button');b.textContent=STATUS_LABEL[v];b.style.cssText=`min-height:70px;border:2px solid ${STATUS_COLOR[v]};border-radius:14px;background:#050705;color:${STATUS_COLOR[v]};font-weight:900;font-size:17px`;b.onclick=()=>{d.close();d.remove();setStatus(c,v)};grid.append(b)});d.append(grid);closeBtn(d);d.showModal();}
  function historyDialog(c){const d=dialogBase('HISTORIA STATUSÓW — '+(c.name||''));const hist=read(c).statusHistory||[];if(!hist.length){const p=document.createElement('p');p.textContent='Brak zapisanej historii statusów.';d.append(p)}else hist.forEach(h=>{const r=document.createElement('div');r.style.cssText='display:grid;grid-template-columns:110px 1fr;gap:10px;padding:11px;border-bottom:1px solid #594500';r.innerHTML=`<span>${esc(plDate(h.date))}</span><b style="color:${STATUS_COLOR[h.status]||'#fff'}">${esc(STATUS_LABEL[h.status]||h.status)}</b>`;d.append(r)});closeBtn(d);d.showModal();}
  function nextContactDialog(c){const r=read(c),n=r.nextContact||defaultNextContact(c),d=dialogBase('NASTĘPNY KONTAKT — '+(c.name||''));const date=field(d,'Data',n.date,'date'),method=selectField(d,'Forma kontaktu',n.method||'TELEFON',[['TELEFON','TELEFON'],['EMAIL','E-MAIL'],['WHATSAPP','WHATSAPP'],['SPOTKANIE','SPOTKANIE'],['INNE','INNE']]),who=field(d,'Osoba / dział',n.who||'DZIAŁ HANDLOWY');saveBar(d,()=>{write(c,{nextContact:{date:date.value||isoLocal(),method:method.value,who:who.value.trim()||'—'}});d.close();d.remove();ctx()?.toast?.('✓ Następny kontakt zapisany');open();});d.showModal();}

  function normalizeAction(a){return {...a,status:a?.status||'DO_WYKONANIA',text:String(a?.text||''),date:a?.date||isoLocal()};}
  function addActionDialog(c,editId){const r=read(c),existing=(r.actions||[]).map(normalizeAction),old=existing.find(a=>a.id===editId),d=dialogBase(old?'EDYTUJ AKCJĘ':'DODAJ AKCJĘ');const t=document.createElement('textarea');t.value=old?.text||'';t.placeholder='Wpisz zadanie / akcję…';t.style.cssText='width:100%;min-height:120px;box-sizing:border-box;padding:12px;border:1px solid #9b7814;border-radius:10px;background:#06110d;color:#fff;font-size:18px;line-height:1.3';d.append(t);const date=field(d,'Termin',old?.date||isoLocal(),'date'),st=selectField(d,'Status',old?.status||'DO_WYKONANIA',[['DO_WYKONANIA','DO WYKONANIA'],['WYKONANE','WYKONANE'],['PRZETERMINOWANE','PRZETERMINOWANE']]);saveBar(d,()=>{const txt=t.value.trim();if(!txt)return;let arr=[...existing];if(old){arr=arr.map(a=>a.id===old.id?{...a,text:txt,date:date.value||isoLocal(),status:st.value}:a)}else arr.push({id:'a'+Date.now().toString(36),text:txt,date:date.value||isoLocal(),status:st.value,createdAt:nowStamp()});write(c,{actions:arr});d.close();d.remove();ctx()?.toast?.('✓ Akcja zapisana');open();});d.showModal();setTimeout(()=>t.focus(),80);}
  function actionMenu(c,id){const r=read(c),a=(r.actions||[]).map(normalizeAction).find(x=>x.id===id);if(!a)return;const d=dialogBase('AKCJA');const p=document.createElement('p');p.textContent=a.text;p.style.cssText='font-size:18px;line-height:1.35';d.append(p);const grid=document.createElement('div');grid.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:10px';const edit=document.createElement('button');edit.textContent='EDYTUJ';edit.style.cssText='padding:14px;border:2px solid #18bfff;border-radius:12px;background:#06253a;color:#54d7ff;font-weight:900';const del=document.createElement('button');del.textContent='USUŃ';del.style.cssText='padding:14px;border:2px solid #ff4438;border-radius:12px;background:#330606;color:#ff685e;font-weight:900';edit.onclick=()=>{d.close();d.remove();addActionDialog(c,id)};del.onclick=()=>{if(!confirm('Usunąć tę akcję?'))return;write(c,{actions:(r.actions||[]).filter(x=>x.id!==id)});d.close();d.remove();open();};grid.append(edit,del);d.append(grid);closeBtn(d);d.showModal();}
  function toggleAction(c,id){const r=read(c);const arr=(r.actions||[]).map(a=>a.id===id?{...a,status:a.status==='WYKONANE'?'DO_WYKONANIA':'WYKONANE',doneAt:a.status==='WYKONANE'?null:nowStamp()}:a);write(c,{actions:arr});open();}
  function actionStatus(a){if(a.status==='WYKONANE')return 'WYKONANE';if(a.status==='PRZETERMINOWANE')return 'PRZETERMINOWANE';if(a.date&&dayDiff(isoLocal(),a.date)>0)return 'PRZETERMINOWANE';return 'DO_WYKONANIA';}
  function alerts(c){return (read(c).actions||[]).map(normalizeAction).filter(a=>a.status!=='WYKONANE').map(a=>{const diff=dayDiff(isoLocal(),a.date);if(diff>0)return {...a,kind:'late',title:'FOLLOW-UP PRZETERMINOWANY o '+diff+' dni'};if(diff===0)return {...a,kind:'today',title:'DZISIAJ: '+a.text};return null}).filter(Boolean).sort((a,b)=>String(a.date).localeCompare(String(b.date)));}
  function allAlertsDialog(c){const d=dialogBase('POWIADOMIENIA / ALERTY — '+(c.name||'')),arr=alerts(c);if(!arr.length){const p=document.createElement('p');p.textContent='Brak przeterminowanych lub dzisiejszych zadań.';d.append(p)}else arr.forEach(a=>{const b=document.createElement('button');b.style.cssText=`width:100%;text-align:left;margin:6px 0;padding:12px;border:1px solid ${a.kind==='late'?'#ff4438':'#d6a800'};border-radius:12px;background:#090b09;color:#fff`;b.innerHTML=`<b style="color:${a.kind==='late'?'#ff5b52':'#ffd43b'}">${esc(a.title)}</b><br><span>${esc(plDate(a.date))}</span>`;b.onclick=()=>{d.close();d.remove();addActionDialog(c,a.id)};d.append(b)});closeBtn(d);d.showModal();}
  function finishAlert(c,id){const r=read(c),arr=(r.actions||[]).map(a=>a.id===id?{...a,status:'WYKONANE',doneAt:nowStamp()}:a);write(c,{actions:arr});ctx()?.toast?.('✓ Zadanie wykonane');open();}

  function chipsInfo(c){const d=dialogBase('KLASYFIKACJA FIRMY');const p=document.createElement('div');p.style.cssText='line-height:1.55;font-size:18px';p.innerHTML=`<b>Kraj:</b> ${esc(country(c))}<br><b>Lokalizacja:</b> ${esc(place(c))}<br><b>Typ:</b> ${esc(role(c))}<br><b>Rola:</b> ${esc(secondaryRole(c))}<br><b>Priorytet:</b> ${esc(priority(c))}`;d.append(p);closeBtn(d);d.showModal();}
  function openMap(c){const q=[c?.name,c?.address,c?.city,c?.countryName].filter(Boolean).join(', ');if(!q){ctx()?.toast?.('Mapa — brak lokalizacji');return;}window.open('https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(q),'_blank','noopener');}
  function goCountry(c){const x=ctx();if(x?.state)x.state.selectedCountry=c?.countryCode||x.state.selectedCountry;if(typeof x?.go==='function')x.go(c?.countryCode==='DE'?'germany':'country');else chipsInfo(c);}
  function goPricesOffer(c){const x=ctx(),d=dialogBase('CENY I OFERTA — '+(c.name||''));const grid=document.createElement('div');grid.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:10px';const p=document.createElement('button');p.textContent='CENY';p.style.cssText='padding:18px;border:2px solid #25bfff;border-radius:14px;background:#062238;color:#5bd4ff;font-weight:900;font-size:19px';const o=document.createElement('button');o.textContent='OFERTA';o.style.cssText='padding:18px;border:2px solid #ffd11a;border-radius:14px;background:#2a2100;color:#ffe267;font-weight:900;font-size:19px';p.onclick=()=>{d.close();d.remove();if(typeof x?.openPrices==='function')x.openPrices(c);else x?.toast?.('CENY — funkcja chwilowo niedostępna');};o.onclick=()=>{d.close();d.remove();if(typeof x?.openOffer==='function')x.openOffer(c,'company');else x?.toast?.('OFERTA — funkcja chwilowo niedostępna');};grid.append(p,o);d.append(grid);closeBtn(d);d.showModal();}
  function goNotes(c){if(window.R128_NOTES&&typeof window.R128_NOTES.open==='function')return window.R128_NOTES.open(c);ctx()?.toast?.('NOTATKI — funkcja chwilowo niedostępna');}

  function rowText(root,a,y){const st=actionStatus(a),color=st==='WYKONANE'?'#72ff79':st==='PRZETERMINOWANE'?'#ff4b56':'#dceaff';text(root,a.text,98,y,338,42,18,{weight:'730',min:12});text(root,plDate(a.date),475,y,100,42,16,{center:true,weight:'800',nowrap:true,min:11});text(root,st==='DO_WYKONANIA'?'DO WYKONANIA':st,590,y,150,42,14,{center:true,weight:'900',color,nowrap:true,min:10});}

  function renderLive(c,s){
    const rec=read(c),st=getStatus(c),hist=[...(rec.statusHistory||[])];if(!hist.length||hist[0].status!==st){hist.unshift({date:isoLocal(),status:st,at:nowStamp()});write(c,{statusHistory:hist.slice(0,30)});}
    text(s,c.name||'—',142,177,500,50,34,{weight:'950',nowrap:true,min:20});
    text(s,displayId(c),650,182,135,30,14,{center:true,weight:'800',nowrap:true,min:10});
    text(s,(country(c)+'  •  '+role(c)+'  •  '+secondaryRole(c)).toUpperCase(),142,225,555,28,16,{weight:'720',nowrap:true,min:10});
    text(s,(ctx()?.countries?.[c?.countryCode]?.flag)||'',770,220,44,34,24,{center:true,fit:false});
    text(s,country(c).toUpperCase(),79,294,112,37,17,{center:true,weight:'900',nowrap:true,min:11});
    text(s,String(place(c)).toUpperCase(),228,294,125,37,17,{center:true,weight:'900',nowrap:true,min:11});
    text(s,String(role(c)).toUpperCase(),397,294,198,37,16,{center:true,weight:'900',color:'#ffe266',nowrap:true,min:10});
    text(s,String(secondaryRole(c)).toUpperCase(),650,294,135,37,16,{center:true,weight:'900',color:'#ff6370',nowrap:true,min:10});

    text(s,'AKTUALNY STATUS',106,364,300,39,22,{weight:'950',color:'#ffd43b',nowrap:true,min:15});
    text(s,STATUS_LABEL[st]||st,138,423,206,42,28,{weight:'950',color:STATUS_COLOR[st],nowrap:true,min:16});
    text(s,STATUS_DESC[st]||'',138,461,200,28,15,{weight:'700',min:10});
    const since=(rec.statusHistory||[]).find(h=>h.status===st)?.date||rec.createdDate||isoLocal();
    text(s,'od: '+plDate(since),138,487,195,24,14,{weight:'650',nowrap:true,min:10});
    text(s,'ZMIEŃ STATUS',395,449,124,34,15,{center:true,weight:'900',color:'#ffd43b',nowrap:true,min:10});
    text(s,'HISTORIA STATUSÓW',586,366,194,34,16,{center:true,weight:'900',color:'#ffd43b',nowrap:true,min:10});
    (rec.statusHistory||[]).slice(0,3).forEach((h,i)=>{const y=416+i*37;text(s,plDate(h.date),584,y,92,28,13,{center:true,weight:'720',nowrap:true,min:9});text(s,STATUS_LABEL[h.status]||h.status,690,y,93,28,12,{center:true,weight:'900',color:STATUS_COLOR[h.status],nowrap:true,min:9});});

    const nc=rec.nextContact||defaultNextContact(c);
    text(s,'NASTĘPNY KONTAKT',105,545,270,34,22,{weight:'950',color:'#ffd43b',nowrap:true,min:14});
    text(s,`${plDate(nc.date)}  •  ${String(nc.method||'').toUpperCase()}  •  ${String(nc.who||'').toUpperCase()}`,105,579,430,31,16,{weight:'800',nowrap:true,min:10});
    text(s,'ZOBACZ SZCZEGÓŁY',605,561,168,37,14,{center:true,weight:'900',color:'#ffd43b',nowrap:true,min:9});

    const al=alerts(c);
    text(s,'POWIADOMIENIA / ALERTY',104,648,350,38,22,{weight:'950',color:'#ffd43b',nowrap:true,min:14});
    text(s,String(al.length),563,648,42,38,18,{center:true,weight:'950',nowrap:true,min:12});
    text(s,'ZOBACZ WSZYSTKIE',630,648,150,36,13,{center:true,weight:'900',color:'#ff6570',nowrap:true,min:9});
    al.slice(0,2).forEach((a,i)=>{const y=696+i*65;const title=a.kind==='late'?a.title:'DZISIAJ: '+a.text;text(s,title,104,y,425,30,16,{weight:'900',color:a.kind==='late'?'#ff5964':'#ffd43b',nowrap:true,min:10});if(a.kind==='late')text(s,a.text,104,y+28,425,28,14,{weight:'650',nowrap:true,min:9});text(s,plDate(a.date),540,y+9,86,28,13,{center:true,weight:'700',nowrap:true,min:9});text(s,'WYKONAJ',665,y+4,112,36,13,{center:true,weight:'900',color:a.kind==='late'?'#ff6570':'#ffd43b',nowrap:true,min:9});});
    if(!al.length)text(s,'Brak pilnych alertów',105,716,500,42,17,{weight:'800',color:'#80ff75'});

    text(s,'SZYBKA ZMIANA STATUSU',104,860,360,40,23,{weight:'950',color:'#ffd43b',nowrap:true,min:14});
    const sx=[42,195,347,500,653];STATUSES.forEach((v,i)=>{text(s,STATUS_LABEL[v],sx[i],968,142,45,v==='OFERTA_WYSLANA'?15:17,{center:true,weight:'950',color:STATUS_COLOR[v],line:'1.0',min:10});text(s,STATUS_DESC[v],sx[i]+5,1014,132,32,11,{center:true,weight:'700',min:8});});

    text(s,'PLANOWANE AKCJE / ZADANIA',104,1100,390,40,22,{weight:'950',color:'#ffd43b',nowrap:true,min:14});
    text(s,'DODAJ AKCJĘ',651,1098,130,37,14,{center:true,weight:'900',color:'#ffd43b',nowrap:true,min:9});
    const all=(rec.actions||[]).map(normalizeAction);const visible=(rec.onlyOpen?all.filter(a=>a.status!=='WYKONANE'):all).slice(0,5);const ys=[1146,1197,1248,1299,1350];visible.forEach((a,i)=>rowText(s,a,ys[i]));
    text(s,'Pokaż tylko otwarte',578,1395,165,30,14,{weight:'700',nowrap:true,min:9});

    text(s,'Data dodania',104,1454,145,24,12,{center:true,weight:'650',nowrap:true,min:9});text(s,plDate(rec.createdDate),104,1480,145,27,15,{center:true,weight:'850',nowrap:true,min:10});
    text(s,'Ostatnia aktualizacja',328,1454,188,24,12,{center:true,weight:'650',nowrap:true,min:9});text(s,plDate(String(rec.updatedAt||'').slice(0,10))+' '+String(rec.updatedAt||'').slice(11,16),312,1480,220,27,14,{center:true,weight:'850',nowrap:true,min:9});
    text(s,'Aktualizował',624,1454,145,24,12,{center:true,weight:'650',nowrap:true,min:9});text(s,rec.author||'L&M',624,1480,145,27,16,{center:true,weight:'850',nowrap:true,min:10});

    text(s,'PRZEJDŹ DO CEN I OFERTY',120,1550,278,31,18,{center:true,weight:'950',color:'#31c9ff',nowrap:true,min:11});text(s,'Ceny, warunki, logistyka',120,1582,278,25,12,{center:true,weight:'650',min:8});
    text(s,'PRZEJDŹ DO NOTATEK',500,1550,260,31,18,{center:true,weight:'950',color:'#43ff3b',nowrap:true,min:11});text(s,'Zadania, historia, AI',500,1582,260,25,12,{center:true,weight:'650',min:8});
    text(s,'WRÓĆ DO KARTY',328,1681,300,50,26,{center:true,weight:'950',nowrap:true,min:17});

    hot(s,18,18,125,120,'Wstecz',back);hot(s,704,18,128,120,'Synchronizuj',syncStay);
    hot(s,28,286,168,52,'Kraj',()=>goCountry(c));hot(s,207,286,158,52,'Lokalizacja',()=>openMap(c));hot(s,375,286,240,52,'Typ firmy',()=>chipsInfo(c));hot(s,625,286,176,52,'Rola firmy',()=>chipsInfo(c));
    hot(s,356,423,182,94,'Zmień status',()=>statusDialog(c));hot(s,545,355,248,160,'Historia statusów',()=>historyDialog(c));
    hot(s,28,532,518,94,'Następny kontakt',()=>nextContactDialog(c));hot(s,558,542,236,72,'Szczegóły następnego kontaktu',()=>nextContactDialog(c));
    hot(s,595,638,199,58,'Zobacz wszystkie alerty',()=>allAlertsDialog(c));
    al.slice(0,2).forEach((a,i)=>hot(s,643,696+i*65,143,52,'Wykonaj alert '+(i+1),()=>finishAlert(c,a.id)));
    STATUSES.forEach((v,i)=>hot(s,sx[i]-5,906,147,154,'Status '+STATUS_LABEL[v],()=>setStatus(c,v)));
    hot(s,595,1088,199,60,'Dodaj akcję',()=>addActionDialog(c));
    visible.forEach((a,i)=>{hot(s,35,1138+i*51,55,48,'Zmień wykonanie '+(i+1),()=>toggleAction(c,a.id));hot(s,438,1138+i*51,130,48,'Termin akcji '+(i+1),()=>addActionDialog(c,a.id));hot(s,746,1138+i*51,52,48,'Menu akcji '+(i+1),()=>actionMenu(c,a.id));});
    hot(s,735,1380,62,48,'Pokaż tylko otwarte',()=>{write(c,{onlyOpen:!read(c).onlyOpen});open();});
    hot(s,28,1531,385,96,'Przejdź do cen i oferty',()=>goPricesOffer(c));hot(s,425,1531,376,96,'Przejdź do notatek',()=>goNotes(c));hot(s,28,1648,773,105,'Wróć do karty',back);
  }

  function open(){const c=company();if(!c||!Object.keys(c).length){ctx()?.toast?.('AKCJE I STATUS — brak wybranej firmy');return;}const s=screen();renderLive(c,s);mount(s);}
  function installBridge(){const x=ctx();if(!x||x.__r130ActionsBridge)return;const original=x.r115NewTile;x.r115NewTile=function(label,...args){if(String(label||'').trim().toUpperCase()==='AKCJE I STATUS')return open();return typeof original==='function'?original(label,...args):undefined;};x.__r130ActionsBridge=true;}

  document.addEventListener('click',function(e){const b=e.target&&e.target.closest?e.target.closest('button[aria-label]'):null;if(!b)return;if(String(b.getAttribute('aria-label')||'').trim().toUpperCase()==='AKCJE I STATUS'){e.preventDefault();e.stopImmediatePropagation();open();}},true);

  window.R130_ACTIONS={open,version:'R130-v1.0A-actions-status-full-live'};
  installBridge();setTimeout(installBridge,80);setTimeout(installBridge,300);setTimeout(installBridge,900);
})();