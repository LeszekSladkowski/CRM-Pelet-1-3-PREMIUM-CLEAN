/* R128 v4 — NOTATKI O FIRMIE — CLEAN PNG ENGINE
   Zasada MASTER: grafika = 100% wyglądu. Kod dodaje tylko dane LIVE i niewidzialne hotspoty.
   Zero programowych ramek, masek, paneli i nakładek kolorystycznych.
*/
(function(){
  'use strict';

  const BASE='./grafiki/rynki-eu/szczegoly-firmy/';
  const IMG={
    main:BASE+'file_00000000c0ac8210a2eab26769101d1e.png',
    facts:BASE+'file_0000000043ac8207a71d319b6ef15188.png',
    offer:BASE+'file_00000000a600821083280e45a39d12f3.png',
    conclusions:BASE+'file_00000000df5c81f69bd362e0ec6b55a9.png',
    talk:BASE+'file_00000000995c82109a658e01b57fd04f.png',
    conclusion:BASE+'file_00000000c5ec820eb0d4cff0e6895173.png'
  };
  const STORE='crm13_r128_company_notes_v2';
  const W=852,H=1846;
  const SECTIONS=['facts','offer','conclusions','talk'];
  const LABELS={
    facts:'KLUCZOWE FAKTY',
    offer:'PARAMETRY OFERTY',
    conclusions:'WNIOSKI HANDLOWE',
    talk:'FAKTY DO ROZMOWY'
  };

  function ctx(){return window.R128_CTX||null;}
  function read(){try{const x=JSON.parse(localStorage.getItem(STORE)||'{}');return x&&typeof x==='object'?x:{}}catch(_){return {}}}
  function cid(c){return String(c?.id||c?.name||'firma').trim().toLowerCase().replace(/\s+/g,'-')}
  function saved(c){return read()[cid(c)]||{}}
  function write(c,data){
    const all=read();
    all[cid(c)]={...(all[cid(c)]||{}),...data,updatedAt:new Date().toISOString()};
    localStorage.setItem(STORE,JSON.stringify(all));
    return all[cid(c)];
  }
  function clean(a){return (Array.isArray(a)?a:[]).map(x=>String(x||'').trim()).filter(Boolean)}
  function role(c){const x=ctx();try{return x?.marketRolesFor?.(c)?.[0]||c?.role||c?.type||'KONTRAHENT'}catch(_){return c?.role||c?.type||'KONTRAHENT'}}
  function country(c){const x=ctx();return c?.countryName||x?.countries?.[c?.countryCode]?.name||c?.countryCode||'EUROPA'}
  function datePL(v){const d=v?new Date(v):new Date();return Number.isNaN(d.getTime())?String(v||''):d.toLocaleDateString('pl-PL',{day:'2-digit',month:'2-digit',year:'numeric'})}

  function defaults(c){
    if(/dokers/i.test(String(c?.name||''))){
      return {
        facts:['pellet ENplus A1','ENplus ID LV 330','worki 15 kg','oferta publikowana: sierpień 2026'],
        offer:['380 €/t DAP Polska','pełny samochód ok. 24 t','przy pełnym TIR możliwa indywidualna niższa wycena'],
        conclusions:['wartościowy rekord do kalkulatora','potrzebna cena FCA Łotwa','bez FCA nie liczyć automatycznie marży eksportowej do DE'],
        talk:['możliwość negocjacji pełnego TIR','zapytanie o wariant FCA i DAP L&M','możliwy private-label L&M 15 kg'],
        source:'analiza asystenta'
      };
    }
    const facts=[];
    if(c?.availability)facts.push(c.availability);
    if(c?.enplusId)facts.push('ENplus ID '+c.enplusId);
    if(c?.certificate&&!facts.includes(c.certificate))facts.push(c.certificate);
    if(c?.type)facts.push(c.type);
    if(c?.sourceDate)facts.push('dane źródłowe: '+datePL(c.sourceDate));

    const offer=[];
    if(c?.priceText)offer.push(c.priceText); else if(c?.price)offer.push(c.price+' €/t');
    if(c?.incoterm)offer.push('Incoterm: '+c.incoterm);
    if(c?.logistics?.fullTruck)offer.push(c.logistics.fullTruck); else if(c?.logistics?.pallet)offer.push(c.logistics.pallet);
    if(c?.payment)offer.push('Płatność: '+c.payment);

    const conclusions=['rekord do wykorzystania w kalkulatorze i rozmowie handlowej'];
    if(c?.price||c?.priceText)conclusions.push('porównać warunki z kosztami L&M i docelową marżą');

    const talk=clean(c?.notes).slice(0,4);
    if(!talk.length&&c?.nextFollowUp)talk.push(c.nextFollowUp);
    if(!talk.length)talk.push('uzupełnić fakty przed następną rozmową');
    return {facts:clean(facts),offer:clean(offer),conclusions:clean(conclusions),talk:clean(talk),source:c?.sourceLabel||'analiza asystenta'};
  }

  function defaultImportant(key,arr){
    if(arr?.length)return arr[0];
    if(key==='offer')return 'Pozyskać aktualne parametry oferty i warunki zakupu.';
    if(key==='conclusions')return 'Wybrać najbardziej opłacalny wariant dalszej współpracy.';
    if(key==='talk')return 'Przygotować najważniejsze argumenty do następnej rozmowy.';
    return 'Potwierdzić kluczowe fakty o firmie przed dalszym działaniem.';
  }
  function defaultNext(key){
    if(key==='offer')return 'Pozyskać aktualną ofertę FCA/DAP i porównać ją z kosztami oraz docelową marżą L&M.';
    if(key==='conclusions')return 'Wybrać rekomendowany wariant i przenieść konkretne działanie do karty CELE.';
    if(key==='talk')return 'Wykorzystać przygotowane fakty podczas następnej rozmowy i zapisać wynik w HISTORII.';
    return 'Zweryfikować kluczowe dane i uzupełnić brakujące informacje przed następnym kontaktem.';
  }

  function model(c){
    const d=defaults(c),s=saved(c);
    SECTIONS.forEach(k=>{if(Array.isArray(s[k]))d[k]=clean(s[k])});
    d.source=s.source||d.source||'analiza asystenta';
    d.updatedAt=s.updatedAt||c?.updatedAt||c?.sourceDate||new Date().toISOString();
    d.important=(s.important&&typeof s.important==='object')?s.important:{};
    d.nextMove=(s.nextMove&&typeof s.nextMove==='object')?s.nextMove:{};
    return d;
  }

  function px(el,x,y,w,h){
    Object.assign(el.style,{position:'absolute',left:(x/W*100)+'%',top:(y/H*100)+'%',width:(w/W*100)+'%',height:(h/H*100)+'%'});
    return el;
  }
  function font(size){return `clamp(16px,${(size/W*100).toFixed(3)}vw,${size}px)`;}
  function addText(root,text,x,y,w,h,size,opt={}){
    if(text===undefined||text===null||String(text).trim()==='')return null;
    const e=document.createElement('div');
    e.textContent=String(text);
    e.style.cssText='display:flex;align-items:center;overflow:hidden;pointer-events:none;text-shadow:0 2px 5px #000,0 0 7px #000;z-index:24;box-sizing:border-box;';
    e.style.justifyContent=opt.align==='center'?'center':'flex-start';
    e.style.textAlign=opt.align||'left';
    e.style.color=opt.color||'#fff';
    e.style.fontWeight=opt.weight||'800';
    e.style.fontSize=font(size);
    e.style.lineHeight=opt.line||'1.15';
    e.style.whiteSpace=opt.nowrap?'nowrap':'normal';
    e.style.textOverflow=opt.nowrap?'ellipsis':'clip';
    px(e,x,y,w,h);root.append(e);return e;
  }
  function addList(root,items,x,y,w,h,size,max=6){
    const e=document.createElement('div');
    e.style.cssText='color:#fff;font-weight:750;line-height:1.24;overflow:hidden;pointer-events:none;text-shadow:0 2px 5px #000,0 0 7px #000;z-index:24;box-sizing:border-box;';
    e.style.fontSize=font(size);px(e,x,y,w,h);
    clean(items).slice(0,max).forEach(t=>{const r=document.createElement('div');r.textContent='•  '+t;r.style.marginBottom='7px';e.append(r)});
    root.append(e);return e;
  }
  function addLong(root,text,x,y,w,h,size,opt={}){
    const e=document.createElement('div');
    e.textContent=String(text||'');
    e.style.cssText='color:#fff;font-weight:760;line-height:1.32;white-space:pre-wrap;overflow:auto;padding-right:7px;text-shadow:0 2px 5px #000,0 0 7px #000;z-index:24;box-sizing:border-box;touch-action:pan-y pinch-zoom;';
    e.style.fontSize=font(size);if(opt.color)e.style.color=opt.color;px(e,x,y,w,h);root.append(e);return e;
  }
  function hot(root,x,y,w,h,label,fn){
    const xctx=ctx();
    if(xctx?.hotspot){root.append(xctx.hotspot({x,y,w,h,label,onClick:fn,baseW:W,baseH:H,z:40}));return;}
    const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',label);b.style.cssText='border:0;background:transparent;z-index:40;';px(b,x,y,w,h);b.onclick=fn;root.append(b);
  }
  function screen(imgSrc,alt){
    const s=document.createElement('section');s.className='screen r128-notes-live';s.style.position='relative';
    const img=document.createElement('img');img.className='master';img.src=imgSrc;img.alt=alt;img.style.width='100%';img.style.display='block';s.append(img);return s;
  }
  function mount(s){
    const x=ctx();if(x?.app)x.app.replaceChildren(s);else document.querySelector('#app')?.replaceChildren(s);
    window.scrollTo({top:0,left:0,behavior:'auto'});
  }
  function currentCompany(c){const x=ctx();return c||x?.getCompanyById?.(x?.state?.selectedCompany)||{};}
  function goals(){const x=ctx();if(x?.r115NewTile)x.r115NewTile('CELE ASYSTENTA');else x?.toast?.('CELE ASYSTENTA — następny osobny krok MASTER');}
  async function syncStay(c,key,view){
    const x=ctx();try{const r=x?.sync?.();if(r&&typeof r.then==='function')await r}catch(_){ }
    finally{setTimeout(()=>{if(view==='conclusion')openConclusion(c,key);else if(view==='detail')openDetail(c,key);else open(c)},100)}
  }

  function companyHeader(s,c){
    addText(s,c?.name||'—',190,313,472,70,34,{align:'center',weight:'950',nowrap:true});
    addText(s,country(c).toUpperCase(),70,397,180,60,19,{align:'center',weight:'850',nowrap:true});
    addText(s,role(c).toUpperCase(),285,397,282,60,19,{align:'center',weight:'850',nowrap:true});
    addText(s,'PRIORYTET '+String(c?.priority||'—').toUpperCase(),563,397,260,60,18,{align:'center',weight:'900',color:'#ffd43b',nowrap:true});
  }

  function dialog(c,currentKey,mode){
    const m=model(c),d=document.createElement('dialog');
    d.style.cssText='width:min(94vw,700px);max-height:88vh;overflow:auto;border:2px solid #d7a514;border-radius:22px;background:#03150f;color:#fff;padding:18px;box-shadow:0 0 28px #d7a51488;z-index:99999';
    d.innerHTML='<h2 style="margin:0 0 14px;color:#ffd229;text-align:center;font-size:30px">'+(mode==='add'?'DODAJ NOTATKĘ':'EDYTUJ NOTATKI')+'</h2>';
    const sel=document.createElement('select');sel.style.cssText='width:100%;padding:14px;border:1px solid #9b7814;border-radius:10px;background:#06110d;color:#fff;font-size:19px;margin-bottom:12px';
    SECTIONS.forEach(k=>{const o=document.createElement('option');o.value=k;o.textContent=LABELS[k];o.selected=k===currentKey;sel.append(o)});d.append(sel);
    const ta=document.createElement('textarea');ta.style.cssText='width:100%;min-height:260px;box-sizing:border-box;padding:14px;border:1px solid #9b7814;border-radius:10px;background:#06110d;color:#fff;font-size:20px;line-height:1.4';
    const fill=()=>ta.value=mode==='add'?'':(m[sel.value]||[]).join('\n');fill();sel.onchange=fill;d.append(ta);
    const bar=document.createElement('div');bar.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px';
    const save=document.createElement('button');save.textContent='ZAPISZ';save.style.cssText='padding:14px;border:2px solid #5dff42;border-radius:12px;background:#073a11;color:#8dff76;font-weight:900;font-size:19px';
    const cancel=document.createElement('button');cancel.textContent='ANULUJ';cancel.style.cssText='padding:14px;border:1px solid #777;border-radius:12px;background:#252525;color:#fff;font-weight:800;font-size:19px';
    save.onclick=()=>{
      const k=sel.value,now=model(c),lines=String(ta.value||'').split(/\n+/).map(v=>v.trim()).filter(Boolean);
      now[k]=mode==='add'?clean((now[k]||[]).concat(lines)):lines;
      const patch={};SECTIONS.forEach(z=>patch[z]=now[z]||[]);patch.important=now.important||{};patch.nextMove=now.nextMove||{};
      write(c,patch);d.close();d.remove();currentKey?openDetail(c,currentKey):open(c);ctx()?.toast?.('NOTATKI O FIRMIE — zapisano');
    };
    cancel.onclick=()=>{d.close();d.remove()};bar.append(save,cancel);d.append(bar);document.body.append(d);d.showModal();
  }

  function conclusionDialog(c,key){
    const m=model(c),d=document.createElement('dialog');
    d.style.cssText='width:min(94vw,700px);max-height:88vh;overflow:auto;border:2px solid #ff3333;border-radius:22px;background:#190505;color:#fff;padding:18px;box-shadow:0 0 28px #ff333388;z-index:99999';
    d.innerHTML='<h2 style="margin:0 0 14px;color:#ff4b4b;text-align:center;font-size:28px">NAJWAŻNIEJSZY WNIOSEK HANDLOWY</h2>';
    const lab1=document.createElement('div');lab1.textContent='WNIOSEK';lab1.style.cssText='font-weight:900;color:#ff6666;margin:8px 0';d.append(lab1);
    const a=document.createElement('textarea');a.style.cssText='width:100%;min-height:170px;box-sizing:border-box;padding:14px;border:1px solid #ff4444;border-radius:10px;background:#170707;color:#fff;font-size:20px;line-height:1.4';a.value=m.important?.[key]||defaultImportant(key,m[key]);d.append(a);
    const lab2=document.createElement('div');lab2.textContent='NASTĘPNY RUCH';lab2.style.cssText='font-weight:900;color:#ff6666;margin:16px 0 8px';d.append(lab2);
    const b=document.createElement('textarea');b.style.cssText='width:100%;min-height:170px;box-sizing:border-box;padding:14px;border:1px solid #ff4444;border-radius:10px;background:#170707;color:#fff;font-size:20px;line-height:1.4';b.value=m.nextMove?.[key]||defaultNext(key);d.append(b);
    const bar=document.createElement('div');bar.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px';
    const save=document.createElement('button');save.textContent='ZAPISZ';save.style.cssText='padding:14px;border:2px solid #5dff42;border-radius:12px;background:#073a11;color:#8dff76;font-weight:900;font-size:19px';
    const cancel=document.createElement('button');cancel.textContent='ANULUJ';cancel.style.cssText='padding:14px;border:1px solid #777;border-radius:12px;background:#252525;color:#fff;font-weight:800;font-size:19px';
    save.onclick=()=>{const imp={...(m.important||{}),[key]:a.value.trim()};const nxt={...(m.nextMove||{}),[key]:b.value.trim()};write(c,{important:imp,nextMove:nxt});d.close();d.remove();openConclusion(c,key);ctx()?.toast?.('NAJWAŻNIEJSZY WNIOSEK — zapisano')};
    cancel.onclick=()=>{d.close();d.remove()};bar.append(save,cancel);d.append(bar);document.body.append(d);d.showModal();
  }

  function open(c){
    const x=ctx();if(!x)return;
    c=currentCompany(c);const m=model(c),s=screen(IMG.main,'Notatki o firmie — CLEAN PNG MASTER');
    companyHeader(s,c);
    addList(s,m.facts,248,553,500,130,24,4);
    addList(s,m.offer,248,800,500,130,24,4);
    addList(s,m.conclusions,248,1045,500,130,24,4);
    addList(s,m.talk,248,1282,500,120,24,4);

    hot(s,0,0,145,150,'Wstecz do karty firmy',()=>x.render?.());
    hot(s,690,0,162,160,'Synchronizuj',()=>syncStay(c,null,'main'));
    hot(s,25,470,802,232,LABELS.facts,()=>openDetail(c,'facts'));
    hot(s,25,715,802,232,LABELS.offer,()=>openDetail(c,'offer'));
    hot(s,25,960,802,232,LABELS.conclusions,()=>openDetail(c,'conclusions'));
    hot(s,25,1205,802,220,LABELS.talk,()=>openDetail(c,'talk'));
    hot(s,25,1440,245,120,'Edytuj',()=>dialog(c,'facts','edit'));
    hot(s,280,1440,275,120,'Dodaj notatkę',()=>dialog(c,'facts','add'));
    hot(s,565,1440,265,120,'Przejdź do celów',goals);
    hot(s,25,1580,800,150,'Wróć do karty',()=>x.render?.());
    mount(s);
  }

  function openDetail(c,key){
    const x=ctx();if(!x)return;
    c=currentCompany(c);if(!SECTIONS.includes(key))key='facts';
    const m=model(c),arr=m[key]||[],s=screen(IMG[key],LABELS[key]+' — CLEAN PNG MASTER');
    companyHeader(s,c);
    addList(s,arr,180,580,590,525,31,10);
    addLong(s,m.important?.[key]||defaultImportant(key,arr),180,1260,585,105,28);

    hot(s,0,0,145,150,'Wstecz do notatek',()=>open(c));
    hot(s,690,0,162,160,'Synchronizuj',()=>syncStay(c,key,'detail'));
    hot(s,30,1190,790,225,'Najważniejszy Wniosek Handlowy',()=>openConclusion(c,key));
    hot(s,25,1430,255,125,'Edytuj wpis',()=>dialog(c,key,'edit'));
    hot(s,285,1430,270,125,'Dodaj kolejny',()=>dialog(c,key,'add'));
    hot(s,565,1430,265,125,'Przejdź do celów',goals);
    hot(s,25,1575,800,150,'Wróć do notatek',()=>open(c));
    mount(s);
  }

  function openConclusion(c,key){
    const x=ctx();if(!x)return;
    c=currentCompany(c);if(!SECTIONS.includes(key))key='facts';
    const m=model(c),arr=m[key]||[],s=screen(IMG.conclusion,'Najważniejszy Wniosek Handlowy — CLEAN PNG MASTER');
    companyHeader(s,c);
    addLong(s,m.important?.[key]||defaultImportant(key,arr),190,650,570,290,32);
    addLong(s,m.nextMove?.[key]||defaultNext(key),190,1135,570,220,30);

    hot(s,0,0,145,150,'Wstecz do szczegółu',()=>openDetail(c,key));
    hot(s,690,0,162,160,'Synchronizuj',()=>syncStay(c,key,'conclusion'));
    hot(s,25,1440,250,125,'Edytuj wniosek',()=>conclusionDialog(c,key));
    hot(s,285,1440,270,125,'Dodaj kolejny',()=>dialog(c,key,'add'));
    hot(s,565,1440,265,125,'Przejdź do celów',goals);
    hot(s,25,1580,800,150,'Wróć do szczegółu',()=>openDetail(c,key));
    mount(s);
  }

  window.R128_NOTES={open,openDetail,openConclusion,version:'R128-v4-clean-png-engine'};
})();
