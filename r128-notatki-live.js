/* R128 v3 — NOTATKI O FIRMIE LIVE — SURGICAL DETAIL COLOR + TYPOGRAPHY
   Fail-safe external module. Does not alter any existing MASTER renderer.
   Zmiany wyłącznie w module NOTATKI: kolor szczegółu zgodny z wybraną sekcją,
   większa typografia i korekta pól tekstowych.
*/
(function(){
  'use strict';
  const MAIN_IMG='./grafiki/rynki-eu/szczegoly-firmy/file_0000000086cc8211895d9ec103b101c6.png';
  const DETAIL_IMG='./grafiki/rynki-eu/szczegoly-firmy/file_00000000bd78820abbb3d95fa03deebb.png';
  const STORE='crm13_r128_company_notes_v2';
  const W=852,H=1846;
  const SECTIONS=['facts','offer','conclusions','talk'];
  const LABELS={facts:'KLUCZOWE FAKTY',offer:'PARAMETRY OFERTY',conclusions:'WNIOSKI HANDLOWE',talk:'FAKTY DO ROZMOWY'};
  const SECTION_STYLE={
    facts:{color:'#50ff63',border:'#24ff52',bg:'#00170d',shadow:'rgba(36,255,82,.72)'},
    offer:{color:'#1bdcff',border:'#00cfff',bg:'#001521',shadow:'rgba(0,207,255,.72)'},
    conclusions:{color:'#ed45ff',border:'#df23ff',bg:'#19001e',shadow:'rgba(223,35,255,.72)'},
    talk:{color:'#50ff63',border:'#24ff52',bg:'#00170d',shadow:'rgba(36,255,82,.72)'}
  };

  function ctx(){return window.R128_CTX||null;}
  function read(){try{const x=JSON.parse(localStorage.getItem(STORE)||'{}');return x&&typeof x==='object'?x:{}}catch(_){return {}}}
  function id(c){return String(c?.id||c?.name||'firma').trim().toLowerCase().replace(/\s+/g,'-')}
  function write(c,data){const all=read();all[id(c)]={...(all[id(c)]||{}),...data,updatedAt:new Date().toISOString()};localStorage.setItem(STORE,JSON.stringify(all));return all[id(c)]}
  function saved(c){return read()[id(c)]||{}}
  function clean(a){return (Array.isArray(a)?a:[]).map(x=>String(x||'').trim()).filter(Boolean)}
  function role(c){const x=ctx();try{return x?.marketRolesFor?.(c)?.[0]||c?.role||c?.type||'KONTRAHENT'}catch(_){return c?.role||c?.type||'KONTRAHENT'}}
  function country(c){const x=ctx();return c?.countryName||x?.countries?.[c?.countryCode]?.name||c?.countryCode||'EUROPA'}
  function datePL(v){const d=v?new Date(v):new Date();return Number.isNaN(d.getTime())?String(v||''):d.toLocaleDateString('pl-PL',{day:'2-digit',month:'2-digit',year:'numeric'})}
  function sourceShort(v){const s=String(v||'').trim();if(!s)return 'analiza asystenta';if(/chatgpt|asystent/i.test(s))return 'analiza asystenta';return s.length>34?s.slice(0,31)+'…':s}

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
    const talk=clean(c?.notes).slice(0,3);
    if(!talk.length&&c?.nextFollowUp)talk.push(c.nextFollowUp);
    if(!talk.length)talk.push('uzupełnić fakty przed następną rozmową');
    return {facts:clean(facts),offer:clean(offer),conclusions:clean(conclusions),talk:clean(talk),source:c?.sourceLabel||'analiza asystenta'};
  }

  function model(c){
    const d=defaults(c),s=saved(c);
    SECTIONS.forEach(k=>{if(Array.isArray(s[k]))d[k]=clean(s[k])});
    d.source=s.source||d.source||'analiza asystenta';
    d.updatedAt=s.updatedAt||c?.updatedAt||c?.sourceDate||new Date().toISOString();
    return d;
  }

  function px(el,x,y,w,h){Object.assign(el.style,{position:'absolute',left:(x/W*100)+'%',top:(y/H*100)+'%',width:(w/W*100)+'%',height:(h/H*100)+'%'});return el}
  function addText(root,text,x,y,w,h,size,opt={}){
    if(text===undefined||text===null||String(text).trim()==='')return null;
    const e=document.createElement('div');e.textContent=String(text);e.style.cssText='display:flex;align-items:center;overflow:hidden;pointer-events:none;text-shadow:0 1px 4px #000,0 0 6px #000;z-index:24;box-sizing:border-box;';
    e.style.justifyContent=opt.align==='center'?'center':'flex-start';e.style.textAlign=opt.align||'left';e.style.color=opt.color||'#fff';e.style.fontWeight=opt.weight||'700';e.style.fontSize=`clamp(11px,${size/8.52}vw,${size}px)`;e.style.lineHeight=opt.line||'1.15';e.style.whiteSpace=opt.nowrap?'nowrap':'normal';e.style.textOverflow=opt.nowrap?'ellipsis':'clip';px(e,x,y,w,h);root.append(e);return e;
  }
  function addList(root,items,x,y,w,h,size){
    const e=document.createElement('div');e.style.cssText='color:#fff;font-weight:650;line-height:1.20;overflow:hidden;pointer-events:none;text-shadow:0 1px 4px #000,0 0 6px #000;z-index:24;box-sizing:border-box;';e.style.fontSize=`clamp(11px,${size/8.52}vw,${size}px)`;px(e,x,y,w,h);
    clean(items).slice(0,4).forEach(t=>{const r=document.createElement('div');r.textContent='•  '+t;r.style.marginBottom='5px';e.append(r)});root.append(e);return e;
  }
  function addLong(root,text,x,y,w,h,size,opt={}){
    const e=document.createElement('div');e.textContent=String(text||'');e.style.cssText='color:#fff;font-weight:650;line-height:1.28;white-space:pre-wrap;overflow:auto;padding-right:6px;text-shadow:0 1px 4px #000,0 0 6px #000;z-index:24;box-sizing:border-box;touch-action:pan-y pinch-zoom;';e.style.fontSize=`clamp(12px,${size/8.52}vw,${size}px)`;if(opt.color)e.style.color=opt.color;px(e,x,y,w,h);root.append(e);return e;
  }
  function addDetailPanel(root,key){
    const st=SECTION_STYLE[key]||SECTION_STYLE.facts;
    const e=document.createElement('div');
    e.style.cssText=`background:${st.bg};border:3px solid ${st.border};border-radius:18px;box-shadow:0 0 16px ${st.shadow},inset 0 0 26px ${st.shadow};z-index:23;box-sizing:border-box;pointer-events:none;`;
    px(e,34,655,784,680);root.append(e);return st;
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
  function mount(s){const x=ctx();if(x?.app)x.app.replaceChildren(s);else document.querySelector('#app')?.replaceChildren(s);window.scrollTo({top:0,left:0,behavior:'auto'});}
  async function syncStay(c,key){const x=ctx();try{const r=x?.sync?.();if(r&&typeof r.then==='function')await r}catch(_){ }finally{setTimeout(()=>key?openDetail(c,key):open(c),100)}}
  function goals(){const x=ctx();if(x?.r115NewTile)x.r115NewTile('CELE ASYSTENTA');else x?.toast?.('CELE ASYSTENTA — następny osobny krok MASTER')}

  function dialog(c,currentKey,mode){
    const m=model(c);const d=document.createElement('dialog');d.style.cssText='width:min(94vw,700px);max-height:88vh;overflow:auto;border:2px solid #d7a514;border-radius:22px;background:#03150f;color:#fff;padding:18px;box-shadow:0 0 28px #d7a51488;z-index:99999';
    d.innerHTML='<h2 style="margin:0 0 14px;color:#ffd229;text-align:center;font-size:30px">'+(mode==='add'?'DODAJ NOTATKĘ':'EDYTUJ NOTATKI')+'</h2>';
    const sel=document.createElement('select');sel.style.cssText='width:100%;padding:14px;border:1px solid #9b7814;border-radius:10px;background:#06110d;color:#fff;font-size:19px;margin-bottom:12px';SECTIONS.forEach(k=>{const o=document.createElement('option');o.value=k;o.textContent=LABELS[k];o.selected=k===currentKey;sel.append(o)});d.append(sel);
    const ta=document.createElement('textarea');ta.style.cssText='width:100%;min-height:260px;box-sizing:border-box;padding:14px;border:1px solid #9b7814;border-radius:10px;background:#06110d;color:#fff;font-size:20px;line-height:1.4';const fill=()=>ta.value=mode==='add'?'':(m[sel.value]||[]).join('\n');fill();sel.onchange=fill;d.append(ta);
    const bar=document.createElement('div');bar.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px';
    const save=document.createElement('button');save.textContent='ZAPISZ';save.style.cssText='padding:14px;border:2px solid #5dff42;border-radius:12px;background:#073a11;color:#8dff76;font-weight:900;font-size:19px';
    const cancel=document.createElement('button');cancel.textContent='ANULUJ';cancel.style.cssText='padding:14px;border:1px solid #777;border-radius:12px;background:#252525;color:#fff;font-weight:800;font-size:19px';
    save.onclick=()=>{const k=sel.value,now=model(c),lines=String(ta.value||'').split(/\n+/).map(v=>v.trim()).filter(Boolean);now[k]=mode==='add'?clean((now[k]||[]).concat(lines)):lines;const patch={};SECTIONS.forEach(z=>patch[z]=now[z]||[]);write(c,patch);d.close();d.remove();currentKey?openDetail(c,currentKey):open(c);ctx()?.toast?.('NOTATKI O FIRMIE — zapisano')};
    cancel.onclick=()=>{d.close();d.remove()};bar.append(save,cancel);d.append(bar);document.body.append(d);d.showModal();
  }

  function open(c){
    const x=ctx();if(!x){return;}
    c=c||x.getCompanyById?.(x.state?.selectedCompany)||{};const m=model(c),s=screen(MAIN_IMG,'Notatki o firmie — MASTER');
    addText(s,c.name||'—',205,327,450,62,31,{align:'center',weight:'900',nowrap:true});
    addText(s,country(c).toUpperCase(),86,415,160,48,17,{align:'center',weight:'750',nowrap:true});
    addText(s,role(c).toUpperCase(),315,415,220,48,17,{align:'center',weight:'750',nowrap:true});
    addText(s,'PRIORYTET '+String(c.priority||'—').toUpperCase(),590,415,210,48,16,{align:'center',weight:'850',color:'#ffd43b',nowrap:true});
    addList(s,m.facts,245,550,500,168,18);addList(s,m.offer,245,802,500,168,18);addList(s,m.conclusions,245,1045,500,168,18);addList(s,m.talk,245,1280,500,156,18);
    hot(s,0,0,145,150,'Wstecz do karty firmy',()=>x.render?.());hot(s,690,0,162,160,'Synchronizuj',()=>syncStay(c));
    hot(s,25,480,802,238,LABELS.facts,()=>openDetail(c,'facts'));hot(s,25,725,802,238,LABELS.offer,()=>openDetail(c,'offer'));hot(s,25,970,802,238,LABELS.conclusions,()=>openDetail(c,'conclusions'));hot(s,25,1210,802,230,LABELS.talk,()=>openDetail(c,'talk'));
    hot(s,25,1480,235,125,'Edytuj',()=>dialog(c,'facts','edit'));hot(s,275,1480,285,125,'Dodaj notatkę',()=>dialog(c,'facts','add'));hot(s,575,1480,250,125,'Przejdź do celów',goals);hot(s,25,1640,800,145,'Wróć do karty',()=>x.render?.());
    mount(s);
  }

  function sectionConclusion(key,arr){if(arr?.length)return arr[0];return key==='offer'?'Parametry oferty wymagają uzupełnienia.':key==='conclusions'?'Wnioski handlowe są gotowe do rozwijania.':key==='talk'?'Fakty do rozmowy są gotowe.':'Najważniejsze fakty o firmie są zapisane w CRM.'}
  function openDetail(c,key){
    const m=model(c),s=screen(DETAIL_IMG,'Szczegół notatki o firmie — MASTER'),arr=m[key]||[],st=SECTION_STYLE[key]||SECTION_STYLE.facts;
    addText(s,c.name||'—',205,305,450,60,30,{align:'center',weight:'900',nowrap:true});
    addText(s,country(c).toUpperCase(),86,388,160,46,17,{align:'center',weight:'750',nowrap:true});
    addText(s,role(c).toUpperCase(),315,388,220,46,17,{align:'center',weight:'750',nowrap:true});
    addText(s,'PRIORYTET '+String(c.priority||'—').toUpperCase(),590,388,210,46,16,{align:'center',weight:'850',color:'#ffd43b',nowrap:true});

    /* Górna tabela: większe wartości i chirurgiczna korekta ŹRÓDŁA. */
    addText(s,LABELS[key],112,536,245,66,19,{weight:'900',color:st.color});
    addText(s,sourceShort(m.source),118,625,225,72,17,{weight:'800',line:'1.06'});
    addText(s,datePL(m.updatedAt),510,536,245,66,18,{weight:'900'});
    addText(s,(c.name||'FIRMA')+' — '+LABELS[key].toLowerCase(),510,625,250,84,17,{weight:'800',line:'1.08'});

    /* Krytyczna poprawka: duże pole szczegółów ma kolor i opis IDENTYCZNY z wybraną sekcją. */
    addDetailPanel(s,key);
    addText(s,LABELS[key],82,674,690,72,27,{weight:'950',color:st.color});
    addText(s,(c.name||'FIRMA')+' — '+LABELS[key],72,752,710,58,21,{weight:'850'});
    const body=arr.length?arr.map(v=>'• '+v).join('\n'):'Brak zapisanych danych w tej sekcji.';
    addLong(s,body,72,815,708,485,21);

    /* Najważniejszy wniosek: większy tekst i większy odstęp od stałego nagłówka. */
    addLong(s,sectionConclusion(key,arr),180,1448,565,105,20);

    const x=ctx();hot(s,0,0,145,150,'Wstecz do notatek',()=>open(c));hot(s,690,0,162,160,'Synchronizuj',()=>syncStay(c,key));hot(s,25,1580,235,115,'Edytuj wpis',()=>dialog(c,key,'edit'));hot(s,275,1580,285,115,'Dodaj kolejny',()=>dialog(c,key,'add'));hot(s,575,1580,250,115,'Przejdź do celów',goals);hot(s,25,1720,800,100,'Wróć do notatek',()=>open(c));mount(s);
  }

  window.R128_NOTES={open,openDetail};
})();
