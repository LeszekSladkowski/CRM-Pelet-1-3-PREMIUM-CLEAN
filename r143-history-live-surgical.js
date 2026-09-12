/* R143 — HISTORIA FIRMY — FULL LIVE SURGICAL
   Cel: ożywić zamrożoną kartę HISTORIA bez naruszania pozostałych MASTER-ów.
   Naprawa obejmuje wyłącznie moduł HISTORIA: filtry, zakres czasu, listę LIVE,
   przyciski dolne, szczegół wpisu oraz centralne osadzenie napisów przycisków.
*/

const r143HistoryBasePatch = r48PatchIndexHtml;

const R143_HISTORY_RUNTIME = `
  const R143_HISTORY_STORE='crm13_r143_company_history_v1';
  const R143_STATUS_STORE='crm13_company_statuses';
  const R143_ACTIONS_STORE='crm13_r130_actions_status_v1';
  const R143_NOTES_STORE='crm13_r128_company_notes_v2';
  const R143_W=853,R143_H=1844;
  const R143_STATUS_LABEL={NOWY:'NOWY',NEGOCJACJE:'NEGOCJACJE',OFERTA_WYSLANA:'OFERTA WYSŁANA',AKTYWNY:'AKTYWNY',NIEAKTYWNY:'NIEAKTYWNY'};
  const R143_FILTER_LABEL={ALL:'WSZYSTKO',STATUS:'STATUSY',KORESPONDENCJA:'KORESPONDENCJA',CENA:'CENY',NOTATKA:'NOTATKI'};
  const r143HistoryUI={filter:'ALL',days:30,selectedId:null};

  function r143Cid(c){return String(c&&((c.id)||(c.name))||'firma').trim().toLowerCase().replace(/\\s+/g,'-');}
  function r143ReadObj(key){try{const x=JSON.parse(localStorage.getItem(key)||'{}');return x&&typeof x==='object'?x:{}}catch(_){return {}}}
  function r143WriteObj(key,x){try{localStorage.setItem(key,JSON.stringify(x));}catch(_){}}
  function r143Now(){return new Date().toISOString();}
  function r143IsoDate(v){const d=v?new Date(v):new Date();if(Number.isNaN(d.getTime()))return new Date().toISOString().slice(0,10);return d.toISOString().slice(0,10);}
  function r143PlDate(v){const d=v?new Date(v):new Date();return Number.isNaN(d.getTime())?String(v||'—'):d.toLocaleDateString('pl-PL',{day:'2-digit',month:'2-digit',year:'numeric'});}
  function r143PlTime(v){const d=v?new Date(v):new Date();return Number.isNaN(d.getTime())?'':d.toLocaleTimeString('pl-PL',{hour:'2-digit',minute:'2-digit'});}
  function r143Esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]});}
  function r143Record(c){
    const all=r143ReadObj(R143_HISTORY_STORE),id=r143Cid(c);let rec=all[id];
    if(Array.isArray(rec))rec={events:rec,seededAt:null};
    if(!rec||typeof rec!=='object')rec={events:[],seededAt:null};
    rec.events=Array.isArray(rec.events)?rec.events:[];
    return {all,id,rec};
  }
  function r143SaveRecord(c,rec){const x=r143Record(c);x.all[x.id]=rec;r143WriteObj(R143_HISTORY_STORE,x.all);return rec;}
  function r143AddEvent(c,type,title,detail,meta){
    const x=r143Record(c),at=r143Now();
    const e={id:'h'+Date.now().toString(36)+Math.random().toString(36).slice(2,6),type:type||'NOTATKA',title:String(title||'Wpis historii').trim(),detail:String(detail||'').trim(),at,date:r143IsoDate(at),meta:meta&&typeof meta==='object'?meta:{}};
    x.rec.events.unshift(e);x.rec.events=x.rec.events.slice(0,250);x.all[x.id]=x.rec;r143WriteObj(R143_HISTORY_STORE,x.all);return e;
  }
  function r143SeedHistory(c){
    const x=r143Record(c);if(x.rec.seededAt)return x.rec.events;
    const seeded=[];
    const actions=r143ReadObj(R143_ACTIONS_STORE)[r143Cid(c)]||{};
    (Array.isArray(actions.statusHistory)?actions.statusHistory:[]).forEach(function(h,i){
      const st=String(h&&h.status||'NOWY');const at=(h&&h.at)||((h&&h.date)?String(h.date)+'T12:00:00':r143Now());
      seeded.push({id:'seed-status-'+i+'-'+String(at).replace(/\\W/g,''),type:'STATUS',title:'Status: '+(R143_STATUS_LABEL[st]||st),detail:'Zmiana statusu firmy',at,date:r143IsoDate(at),meta:{status:st,seed:true}});
    });
    const notes=r143ReadObj(R143_NOTES_STORE)[r143Cid(c)];
    if(notes&&notes.updatedAt)seeded.push({id:'seed-notes-'+String(notes.updatedAt).replace(/\\W/g,''),type:'NOTATKA',title:'Notatki o firmie — aktualizacja',detail:'Zapisano lub zaktualizowano kartę NOTATKI O FIRMIE.',at:notes.updatedAt,date:r143IsoDate(notes.updatedAt),meta:{seed:true}});
    const p=String((c&&c.priceText)||((c&&c.price)!=null?c.price:'')||'').trim();
    if(p)seeded.push({id:'seed-price',type:'CENA',title:'Cena w bazie: '+p,detail:[c&&c.incoterm?('Incoterm: '+c.incoterm):'',c&&c.sourceLabel?('Źródło: '+c.sourceLabel):''].filter(Boolean).join(' • '),at:(c&&c.updatedAt)||(c&&c.sourceDate)||r143Now(),date:r143IsoDate((c&&c.updatedAt)||(c&&c.sourceDate)||r143Now()),meta:{seed:true}});
    x.rec.events=seeded.concat(x.rec.events||[]).sort(function(a,b){return new Date(b.at||b.date)-new Date(a.at||a.date)}).slice(0,250);
    x.rec.seededAt=r143Now();x.all[x.id]=x.rec;r143WriteObj(R143_HISTORY_STORE,x.all);return x.rec.events;
  }
  function r143Events(c){return r143SeedHistory(c).slice().sort(function(a,b){return new Date(b.at||b.date)-new Date(a.at||a.date)});}
  function r143Filtered(c){
    const now=Date.now(),days=Number(r143HistoryUI.days)||0;
    return r143Events(c).filter(function(e){
      if(r143HistoryUI.filter!=='ALL'&&e.type!==r143HistoryUI.filter)return false;
      if(days>0){const t=new Date(e.at||e.date).getTime();if(Number.isFinite(t)&&now-t>days*86400000)return false;}
      return true;
    });
  }
  function r143Rect(el,x,y,w,h){Object.assign(el.style,{position:'absolute',left:(x/R143_W*100)+'%',top:(y/R143_H*100)+'%',width:(w/R143_W*100)+'%',height:(h/R143_H*100)+'%'});return el;}
  function r143Button(root,label,x,y,w,h,onClick,opt){
    opt=opt||{};const b=document.createElement('button');b.type='button';b.textContent=label;b.setAttribute('aria-label',label);
    b.style.cssText='z-index:75;display:flex;align-items:center;justify-content:center;text-align:center;box-sizing:border-box;padding:4px 7px;border-radius:14px;font-weight:900;line-height:1.02;white-space:normal;overflow:hidden;text-shadow:0 1px 3px #000;transition:transform .08s ease,box-shadow .12s ease;';
    b.style.border=opt.active?'2px solid #76ff00':'1.5px solid #b88a10';b.style.background=opt.active?'rgba(12,45,9,.94)':'rgba(3,9,5,.93)';b.style.color=opt.active?'#9cff66':'#fff';b.style.fontSize=(opt.size||18)+'px';
    b.addEventListener('pointerdown',function(){b.style.transform='scale(.97)';});b.addEventListener('pointerup',function(){b.style.transform='scale(1)';});b.addEventListener('pointercancel',function(){b.style.transform='scale(1)';});
    b.onclick=onClick;r143Rect(b,x,y,w,h);root.append(b);return b;
  }
  function r143TypeColor(type){return type==='STATUS'?'#5dff42':type==='KORESPONDENCJA'?'#35bfff':type==='CENA'?'#ffd43b':'#fff';}
  function r143TypeLabel(type){return type==='STATUS'?'STATUS':type==='KORESPONDENCJA'?'KORESPONDENCJA':type==='CENA'?'CENA':'NOTATKA';}
  function r143Row(root,e,y,c){
    const b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Szczegół: '+(e.title||'wpis historii'));
    b.style.cssText='z-index:72;box-sizing:border-box;border:1px solid rgba(185,139,14,.52);border-radius:12px;background:rgba(0,7,3,.94);color:#fff;text-align:left;padding:9px 13px;overflow:hidden;box-shadow:inset 0 0 16px rgba(255,196,0,.035);';
    const top=document.createElement('div');top.style.cssText='display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:12px;color:#cfcfcf;';
    top.innerHTML='<span>'+r143Esc(r143PlDate(e.at||e.date))+' '+r143Esc(r143PlTime(e.at||e.date))+'</span><b style="color:'+r143TypeColor(e.type)+'">'+r143Esc(r143TypeLabel(e.type))+'</b>';
    const title=document.createElement('div');title.textContent=e.title||'Wpis historii';title.style.cssText='margin-top:5px;font-size:16px;font-weight:900;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
    const detail=document.createElement('div');detail.textContent=e.detail||'';detail.style.cssText='margin-top:2px;font-size:12px;color:#d8d8d8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
    b.append(top,title,detail);b.onclick=function(){r143HistoryUI.selectedId=e.id;r122OpenHistoryDetail(c,e.id);};r143Rect(b,28,y,797,105);root.append(b);
  }
  function r143EmptyRow(root,y){const d=document.createElement('div');d.textContent='—';d.style.cssText='z-index:71;display:flex;align-items:center;justify-content:center;border:1px solid rgba(185,139,14,.22);border-radius:12px;background:rgba(0,7,3,.91);color:#555;font-weight:900;';r143Rect(d,28,y,797,105);root.append(d);}
  function r143Field(d,label,value,type){const l=document.createElement('label');l.textContent=label;l.style.cssText='display:block;margin:10px 0 5px;color:#ffd43b;font-weight:900';const i=document.createElement(type==='textarea'?'textarea':'input');if(type!=='textarea')i.type=type||'text';i.value=value||'';i.style.cssText='width:100%;box-sizing:border-box;padding:12px;border:1px solid #987414;border-radius:10px;background:#04110a;color:#fff;font-size:17px;'+(type==='textarea'?'min-height:110px;resize:vertical;':'');d.append(l,i);return i;}
  function r143Select(d,label,value,opts){const l=document.createElement('label');l.textContent=label;l.style.cssText='display:block;margin:10px 0 5px;color:#ffd43b;font-weight:900';const s=document.createElement('select');s.style.cssText='width:100%;box-sizing:border-box;padding:12px;border:1px solid #987414;border-radius:10px;background:#04110a;color:#fff;font-size:17px';opts.forEach(function(o){const e=document.createElement('option');e.value=o[0];e.textContent=o[1];if(o[0]===value)e.selected=true;s.append(e)});d.append(l,s);return s;}
  function r143Dialog(title){const d=document.createElement('dialog');d.style.cssText='width:min(94vw,680px);max-height:88vh;overflow:auto;border:2px solid #d7a514;border-radius:22px;background:#04110a;color:#fff;padding:18px;box-shadow:0 0 30px rgba(215,165,20,.52);z-index:99999';const h=document.createElement('h2');h.textContent=title;h.style.cssText='margin:0 0 12px;text-align:center;color:#ffd43b;font-size:24px';d.append(h);document.body.append(d);return d;}
  function r143DialogButtons(d,onSave){const bar=document.createElement('div');bar.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:16px';const save=document.createElement('button');save.textContent='ZAPISZ';save.style.cssText='padding:14px;border:2px solid #5dff42;border-radius:12px;background:#073a11;color:#9cff80;font-weight:900';const cancel=document.createElement('button');cancel.textContent='ANULUJ';cancel.style.cssText='padding:14px;border:1px solid #777;border-radius:12px;background:#252525;color:#fff;font-weight:900';save.onclick=function(){onSave();};cancel.onclick=function(){d.close();d.remove();};bar.append(save,cancel);d.append(bar);}
  function r143Toast(msg){try{toast(msg);}catch(_){}}
  function r143AddNote(c,edit){const d=r143Dialog(edit?'EDYTUJ WPIS':'DODAJ WPIS');const date=r143Field(d,'Data',edit&&edit.date||r143IsoDate(),'date');const title=r143Field(d,'Tytuł',edit&&edit.title||'','text');const detail=r143Field(d,'Treść',edit&&edit.detail||'','textarea');r143DialogButtons(d,function(){if(!title.value.trim()){title.focus();return;}if(edit){const x=r143Record(c),e=x.rec.events.find(function(v){return v.id===edit.id});if(e){e.title=title.value.trim();e.detail=detail.value.trim();e.date=date.value||r143IsoDate();e.at=(e.date+'T'+r143PlTime(edit.at||new Date())+':00');x.all[x.id]=x.rec;r143WriteObj(R143_HISTORY_STORE,x.all);}}else r143AddEvent(c,'NOTATKA',title.value.trim(),detail.value.trim(),{});d.close();d.remove();r143Toast('✓ Wpis zapisany w HISTORII');r122OpenCompanyHistory(c);});d.showModal();}
  function r143AddCorrespondence(c){const d=r143Dialog('DODAJ KORESPONDENCJĘ');const channel=r143Select(d,'Kanał','EMAIL',[['EMAIL','E-MAIL'],['TELEFON','TELEFON'],['WHATSAPP','WHATSAPP'],['SPOTKANIE','SPOTKANIE'],['INNE','INNE']]);const title=r143Field(d,'Temat','','text');const detail=r143Field(d,'Notatka / wynik kontaktu','','textarea');r143DialogButtons(d,function(){const t=title.value.trim()||channel.value;r143AddEvent(c,'KORESPONDENCJA',t,detail.value.trim(),{channel:channel.value});d.close();d.remove();r143Toast('✓ Korespondencja zapisana');r122OpenCompanyHistory(c);});d.showModal();}
  function r143AddPrice(c){const d=r143Dialog('DODAJ CENĘ');const value=r143Field(d,'Cena','','number');value.step='0.01';const currency=r143Select(d,'Waluta','EUR',[['EUR','EUR'],['PLN','PLN'],['CZK','CZK'],['CHF','CHF'],['USD','USD']]);const incoterm=r143Select(d,'Incoterm','DAP',[['EXW','EXW'],['FCA','FCA'],['DAP','DAP'],['DDP','DDP'],['INNE','INNE']]);const note=r143Field(d,'Opis / warunki','','textarea');r143DialogButtons(d,function(){if(!value.value){value.focus();return;}const title='Cena: '+String(value.value).replace('.',',')+' '+currency.value+'/t • '+incoterm.value;r143AddEvent(c,'CENA',title,note.value.trim(),{value:Number(value.value),currency:currency.value,incoterm:incoterm.value});d.close();d.remove();r143Toast('✓ Cena zapisana w HISTORII');r122OpenCompanyHistory(c);});d.showModal();}
  function r143SetStatus(c){const current=r143ReadObj(R143_STATUS_STORE)[c&&c.id]||'NOWY';const d=r143Dialog('ZMIEŃ STATUS');const status=r143Select(d,'Status',current,[['NOWY','NOWY'],['NEGOCJACJE','NEGOCJACJE'],['OFERTA_WYSLANA','OFERTA WYSŁANA'],['AKTYWNY','AKTYWNY'],['NIEAKTYWNY','NIEAKTYWNY']]);const note=r143Field(d,'Notatka do zmiany statusu','','textarea');r143DialogButtons(d,function(){const maps=r143ReadObj(R143_STATUS_STORE);if(c&&c.id)maps[c.id]=status.value;r143WriteObj(R143_STATUS_STORE,maps);const all=r143ReadObj(R143_ACTIONS_STORE),id=r143Cid(c),rec=all[id]&&typeof all[id]==='object'?all[id]:{};rec.statusHistory=Array.isArray(rec.statusHistory)?rec.statusHistory:[];rec.statusHistory.unshift({date:r143IsoDate(),status:status.value,at:r143Now()});rec.statusHistory=rec.statusHistory.slice(0,30);rec.updatedAt=r143Now();all[id]=rec;r143WriteObj(R143_ACTIONS_STORE,all);r143AddEvent(c,'STATUS','Status: '+(R143_STATUS_LABEL[status.value]||status.value),note.value.trim()||'Zmiana statusu firmy',{status:status.value});d.close();d.remove();r143Toast('✓ Status zmieniony');r122OpenCompanyHistory(c);});d.showModal();}
  function r143DeleteEvent(c,e){if(!e||!confirm('Usunąć ten wpis z HISTORII?'))return;const x=r143Record(c);x.rec.events=x.rec.events.filter(function(v){return v.id!==e.id});x.all[x.id]=x.rec;r143WriteObj(R143_HISTORY_STORE,x.all);r143Toast('✓ Wpis usunięty');r122OpenCompanyHistory(c);}

  async function r122HistorySyncStay(c,detail){const keepId=String((c&&c.id)||state.selectedCompany||'').trim();try{const result=sync();if(result&&typeof result.then==='function')await result;}catch(e){console.warn('R143 sync HISTORIA',e)}finally{if(keepId)state.selectedCompany=keepId;const keepCompany=getCompanyById(keepId)||c;setTimeout(function(){detail?r122OpenHistoryDetail(keepCompany,r143HistoryUI.selectedId):r122OpenCompanyHistory(keepCompany);},120)}}
  function r122OpenHistoryDetail(base,eventId){
    const c=base||getCompanyById(state.selectedCompany)||{};const events=r143Events(c);const e=events.find(function(v){return v.id===(eventId||r143HistoryUI.selectedId)})||events[0];if(!e){r122OpenCompanyHistory(c);return;}r143HistoryUI.selectedId=e.id;
    const s=document.createElement('section');s.className='screen r122-history-detail r143-history-live';s.style.position='relative';const img=document.createElement('img');img.className='master';img.src=R122_HISTORY_DETAIL_IMG;img.alt='Szczegół historii — MASTER LIVE';s.append(img);
    s.append(hotspot({x:0,y:0,w:140,h:145,label:'Wstecz do historii',onClick:function(){r122OpenCompanyHistory(c)},baseW:R143_W,baseH:R143_H,z:90}));s.append(hotspot({x:690,y:0,w:163,h:155,label:'Synchronizuj',onClick:function(){r122HistorySyncStay(c,true)},baseW:R143_W,baseH:R143_H,z:90}));
    const panel=document.createElement('div');panel.style.cssText='z-index:70;box-sizing:border-box;border:1px solid rgba(185,139,14,.55);border-radius:18px;background:rgba(0,8,4,.94);padding:20px;color:#fff;overflow:auto;';panel.innerHTML='<div style="display:flex;justify-content:space-between;gap:12px;color:#bbb;font-size:14px"><span>'+r143Esc(r143PlDate(e.at||e.date))+' '+r143Esc(r143PlTime(e.at||e.date))+'</span><b style="color:'+r143TypeColor(e.type)+'">'+r143Esc(r143TypeLabel(e.type))+'</b></div><h2 style="margin:18px 0 12px;color:#fff;font-size:25px">'+r143Esc(e.title)+'</h2><div style="font-size:18px;line-height:1.45;color:#e7e7e7;white-space:pre-wrap">'+r143Esc(e.detail||'Brak dodatkowego opisu.')+'</div>';r143Rect(panel,38,360,777,1060);s.append(panel);
    r143Button(s,'EDYTUJ WPIS',30,1505,255,115,function(){r143AddNote(c,e)},{size:17});r143Button(s,'DODAJ KOLEJNY',295,1505,255,115,function(){r143AddNote(c,null)},{size:17});r143Button(s,'ZMIEŃ STATUS',560,1505,263,115,function(){r143SetStatus(c)},{size:17});r143Button(s,'WRÓĆ DO HISTORII',30,1645,793,110,function(){r122OpenCompanyHistory(c)},{size:18});
    const del=document.createElement('button');del.type='button';del.textContent='USUŃ';del.style.cssText='position:absolute;z-index:80;right:7%;top:73.5%;border:1px solid #ff4b56;border-radius:10px;background:rgba(40,0,0,.9);color:#ff7b84;padding:8px 13px;font-weight:900';del.onclick=function(){r143DeleteEvent(c,e)};s.append(del);app.replaceChildren(s);
  }
  function r122OpenCompanyHistory(base){
    const c=base||getCompanyById(state.selectedCompany)||{};r143SeedHistory(c);const s=document.createElement('section');s.className='screen r122-company-history r143-history-live';s.style.position='relative';const img=document.createElement('img');img.className='master';img.src=R122_HISTORY_IMG;img.alt='Historia — MASTER LIVE';s.append(img);
    s.append(hotspot({x:0,y:0,w:140,h:145,label:'Wstecz',onClick:render,baseW:R143_W,baseH:R143_H,z:90}));s.append(hotspot({x:690,y:0,w:163,h:155,label:'Synchronizuj',onClick:function(){r122HistorySyncStay(c,false)},baseW:R143_W,baseH:R143_H,z:90}));
    [['ALL','WSZYSTKO',25,140],['STATUS','STATUSY',170,140],['KORESPONDENCJA','KORESPONDENCJA',315,155],['CENA','CENY',475,130],['NOTATKA','NOTATKI',610,210]].forEach(function(a){r143Button(s,a[1],a[2],390,a[3],115,function(){r143HistoryUI.filter=a[0];r122OpenCompanyHistory(c)},{active:r143HistoryUI.filter===a[0],size:a[0]==='KORESPONDENCJA'?13:15});});
    [[7,'OSTATNIE 7 DNI',30,245],[30,'OSTATNIE 30 DNI',285,245],[0,'CAŁA HISTORIA',540,280]].forEach(function(a){r143Button(s,a[1],a[2],525,a[3],85,function(){r143HistoryUI.days=a[0];r122OpenCompanyHistory(c)},{active:r143HistoryUI.days===a[0],size:14});});
    const list=r143Filtered(c),ys=[625,750,875,1000,1125,1250];ys.forEach(function(y,i){if(list[i])r143Row(s,list[i],y,c);else r143EmptyRow(s,y);});
    r143Button(s,'DODAJ WPIS',25,1450,185,110,function(){r143AddNote(c,null)},{size:16});r143Button(s,'DODAJ KORESPONDENCJĘ',215,1450,195,110,function(){r143AddCorrespondence(c)},{size:13});r143Button(s,'DODAJ CENĘ',415,1450,195,110,function(){r143AddPrice(c)},{size:16});r143Button(s,'ZMIEŃ STATUS',615,1450,210,110,function(){r143SetStatus(c)},{size:16});r143Button(s,'WRÓĆ DO KARTY',30,1590,793,140,render,{size:20});
    app.replaceChildren(s);
  }
`;

r48PatchIndexHtml=function(text){
  let out=r143HistoryBasePatch(text);
  if(typeof out!=='string'||!out)return out;

  const startMarker='  async function r122HistorySyncStay';
  const endMarker='  const R123_OFFER_KEY=';
  const start=out.indexOf(startMarker);
  const end=start>=0?out.indexOf(endMarker,start):-1;
  if(start>=0&&end>start){out=out.slice(0,start)+R143_HISTORY_RUNTIME+'\n\n'+out.slice(end);}

  out=out.replaceAll('1.3.0-test-r141v1-0b-cele-user-master-version-sync-hotfix','1.3.0-test-r143-history-live-surgical');
  out=out.replaceAll('R141 v1.0B — CELE ASYSTENTA VERSION SYNC HOTFIX','R143 — HISTORIA FIRMY FULL LIVE SURGICAL');
  out=out.replace(/const BUILD_DATE = '[^']*';/,"const BUILD_DATE = '12.09.2026';");
  out=out.replace(/const BUILD_TIME = '[^']*';/,"const BUILD_TIME = '09:15';");
  out=out.replace(/sw\\.js\\?v=[^'\"]+/g,'sw.js?v=R143-history-live-surgical-0915');
  out=out.replace(/r84-backup-prune\\.js\\?v=[^'\"]+/g,'r84-backup-prune.js?v=R143-0915');
  return out;
};
