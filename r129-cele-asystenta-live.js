/* R129 v1.0B — CELE ASYSTENTA — GRAPHIC MASTER + LIVE — SURGICAL 1:1
   MASTER graficzny: grafiki/rynki-eu/szczegoly-firmy/file_000000001e34820a89f54a69f0269506.png
   Referencja: Samsung Galaxy S24 Ultra, 852 x 1846.
   Zasada: raster = wygląd. Kod dodaje wyłącznie tekst LIVE, dane, hotspoty i edycję celów.
   R128 NOTATKI O FIRMIE pozostaje nietknięty i zamrożony.
   R129 v1.0B: usunięto wyłącznie zbędny podtytuł pod CELE ASYSTENTA; geometria MASTER i funkcje pozostają 1:1.
*/
(function(){
  'use strict';

  const IMG='./grafiki/rynki-eu/szczegoly-firmy/file_000000001e34820a89f54a69f0269506.png';
  const STORE='crm13_r129_company_goals_v1';
  const NOTES_STORE='crm13_r128_company_notes_v2';
  const W=852,H=1846;

  function ctx(){return window.R128_CTX||null;}
  function company(){const x=ctx();return x?.getCompanyById?.(x?.state?.selectedCompany)||{};}
  function cid(c){return String(c?.id||c?.name||'firma').trim().toLowerCase().replace(/\s+/g,'-');}
  function clean(a){return (Array.isArray(a)?a:[]).map(v=>String(v||'').trim()).filter(Boolean);}
  function esc(v){return String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
  function readStore(key){try{const v=JSON.parse(localStorage.getItem(key)||'{}');return v&&typeof v==='object'?v:{}}catch(_){return {};}}
  function read(c){return readStore(STORE)[cid(c)]||{};}
  function notes(c){return readStore(NOTES_STORE)[cid(c)]||{};}
  function write(c,patch){const all=readStore(STORE),id=cid(c);all[id]={...(all[id]||{}),...(patch||{}),updatedAt:new Date().toISOString()};localStorage.setItem(STORE,JSON.stringify(all));return all[id];}
  function country(c){const x=ctx();return c?.countryName||x?.countries?.[c?.countryCode]?.name||c?.countryCode||'EUROPA';}
  function role(c){const x=ctx();try{return x?.marketRolesFor?.(c)?.[0]||c?.role||c?.type||'KONTRAHENT'}catch(_){return c?.role||c?.type||'KONTRAHENT';}}

  function defaults(c){
    const n=notes(c),s=read(c);
    const goals=clean(s.goals).length?clean(s.goals):[
      'pozyskać aktualną ofertę FCA / DAP',
      'potwierdzić ENplus ID i status',
      'sprawdzić minimalny wolumen, termin realizacji i warunki dostawy',
      'porównać ofertę z kosztami L&M i docelową marżą',
      'uzupełnić dane kontaktowe i ustalić kolejny kontakt'
    ];
    const noteImportant=(n.important&&typeof n.important==='object')?(n.important.talk||n.important.offer||n.important.conclusions||n.important.facts):'';
    const noteNext=(n.nextMove&&typeof n.nextMove==='object')?(n.nextMove.talk||n.nextMove.offer||n.nextMove.conclusions||n.nextMove.facts):'';
    return {
      goals,
      priority:String(s.priority||noteImportant||'Pozyskać aktualną cenę pełnego auta i rabat wolumenowy').trim(),
      nextStep:String(s.nextStep||noteNext||'Przygotować kontakt i zapisać wynik w HISTORII').trim()
    };
  }

  function pct(v,b){return (v/b*100)+'%';}
  function fsize(v){const unit=(window.CSS&&CSS.supports&&CSS.supports('font-size','1cqw'))?'cqw':'vw';return (v/W*100).toFixed(3)+unit;}
  function px(el,x,y,w,h){Object.assign(el.style,{position:'absolute',left:pct(x,W),top:pct(y,H),width:pct(w,W),height:pct(h,H)});return el;}
  function fitText(el,minPx=17){
    const run=()=>{if(!el.isConnected)return;let fs=parseFloat(getComputedStyle(el).fontSize)||18,guard=0;while((el.scrollHeight>el.clientHeight+1||el.scrollWidth>el.clientWidth+1)&&fs>minPx&&guard++<60){fs=Math.max(minPx,fs-.4);el.style.fontSize=fs+'px';}};
    requestAnimationFrame(()=>requestAnimationFrame(run));
  }
  function text(root,value,x,y,w,h,size,opt={}){
    if(value===undefined||value===null||String(value).trim()==='')return null;
    const e=document.createElement('div');e.textContent=String(value);
    e.style.cssText='display:flex;align-items:center;box-sizing:border-box;overflow:hidden;pointer-events:none;text-shadow:0 2px 5px #000,0 0 7px #000;z-index:24;overflow-wrap:break-word;word-break:normal;';
    e.style.justifyContent=opt.center?'center':'flex-start';e.style.textAlign=opt.center?'center':'left';e.style.color=opt.color||'#fff';e.style.fontWeight=opt.weight||'850';e.style.fontSize=fsize(size);e.style.lineHeight=opt.line||'1.14';e.style.whiteSpace=opt.nowrap?'nowrap':'normal';px(e,x,y,w,h);root.append(e);if(opt.fit!==false)fitText(e,opt.min||17);return e;
  }
  function list(root,items,x,y,w,h,size){
    const e=document.createElement('div');
    e.className='r129-goals-scroll';
    e.style.cssText='position:absolute;color:#fff;font-weight:820;line-height:1.22;overflow-x:hidden;overflow-y:auto;box-sizing:border-box;padding:0 8px 0 0;text-shadow:0 2px 5px #000,0 0 7px #000;z-index:26;scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;touch-action:pan-y pinch-zoom;overscroll-behavior:contain;';
    e.style.fontSize=fsize(size);px(e,x,y,w,h);
    clean(items).forEach(v=>{const r=document.createElement('div');r.textContent='•  '+v;r.style.margin='0 0 13px 0';r.style.padding='0';r.style.overflowWrap='break-word';e.append(r);});
    root.append(e);return e;
  }
  function hot(root,x,y,w,h,label,fn){
    const xctx=ctx();
    if(xctx?.hotspot){root.append(xctx.hotspot({x,y,w,h,label,onClick:fn,baseW:W,baseH:H,z:60}));return;}
    const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',label);b.style.cssText='position:absolute;border:0;background:transparent;z-index:60;';px(b,x,y,w,h);b.onclick=fn;root.append(b);
  }
  function screen(){
    const s=document.createElement('section');s.className='screen r129-goals-live';s.style.position='relative';s.style.containerType='inline-size';
    const img=document.createElement('img');img.className='master';img.src=IMG+'?v=R129-v1-0a';img.alt='CELE ASYSTENTA — GRAPHIC MASTER';img.style.cssText='width:100%;height:100%;object-fit:fill;display:block;';s.append(img);return s;
  }
  function mount(s){const x=ctx();if(x?.app)x.app.replaceChildren(s);else document.querySelector('#app')?.replaceChildren(s);window.scrollTo({top:0,left:0,behavior:'auto'});}
  function back(){ctx()?.render?.();}
  async function syncStay(){const x=ctx(),keep=String(x?.state?.selectedCompany||'');try{const r=x?.sync?.();if(r&&typeof r.then==='function')await r}catch(_){}finally{if(x?.state&&keep)x.state.selectedCompany=keep;setTimeout(open,120);}}

  function editDialog(c){
    const m=defaults(c),d=document.createElement('dialog');
    d.style.cssText='width:min(94vw,700px);max-height:88vh;overflow:auto;border:2px solid #d7a514;border-radius:22px;background:#07120b;color:#fff;padding:18px;box-shadow:0 0 28px #d7a51488;z-index:99999';
    d.innerHTML='<h2 style="margin:0 0 14px;color:#ffd229;text-align:center;font-size:28px">EDYTUJ CELE ASYSTENTA</h2>';
    const mk=(label,val,minH)=>{const l=document.createElement('label');l.style.cssText='display:block;margin:12px 0 6px;color:#ffd229;font-weight:900';l.textContent=label;const a=document.createElement('textarea');a.value=val;a.style.cssText=`width:100%;min-height:${minH}px;box-sizing:border-box;padding:12px;border:1px solid #9b7814;border-radius:10px;background:#06110d;color:#fff;font-size:19px;line-height:1.35`;d.append(l,a);return a;};
    const goals=mk('LISTA CELÓW — jeden cel w wierszu',m.goals.join('\n'),220),priority=mk('CEL PRIORYTETOWY',m.priority,100),next=mk('NASTĘPNY KROK',m.nextStep,100);
    const bar=document.createElement('div');bar.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px';
    const save=document.createElement('button');save.textContent='ZAPISZ';save.style.cssText='padding:14px;border:2px solid #5dff42;border-radius:12px;background:#073a11;color:#8dff76;font-weight:900;font-size:19px';
    const cancel=document.createElement('button');cancel.textContent='ANULUJ';cancel.style.cssText='padding:14px;border:1px solid #777;border-radius:12px;background:#252525;color:#fff;font-weight:800;font-size:19px';
    save.onclick=()=>{write(c,{goals:String(goals.value||'').split(/\n+/).map(v=>v.trim()).filter(Boolean),priority:priority.value.trim(),nextStep:next.value.trim()});d.close();d.remove();open();ctx()?.toast?.('✓ CELE ASYSTENTA — zapisano');};
    cancel.onclick=()=>{d.close();d.remove();};bar.append(save,cancel);d.append(bar);document.body.append(d);d.showModal();
  }
  function addDialog(c){
    const d=document.createElement('dialog');d.style.cssText='width:min(92vw,660px);border:2px solid #d7a514;border-radius:20px;background:#07120b;color:#fff;padding:18px;box-shadow:0 0 28px #d7a51488;z-index:99999';
    d.innerHTML='<h2 style="margin:0 0 14px;color:#ffd229;text-align:center">DODAJ CEL</h2>';
    const a=document.createElement('textarea');a.placeholder='Wpisz nowy cel…';a.style.cssText='width:100%;min-height:140px;box-sizing:border-box;padding:12px;border:1px solid #9b7814;border-radius:10px;background:#06110d;color:#fff;font-size:20px;line-height:1.35';d.append(a);
    const bar=document.createElement('div');bar.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px';
    const ok=document.createElement('button');ok.textContent='DODAJ';ok.style.cssText='padding:14px;border:2px solid #5dff42;border-radius:12px;background:#073a11;color:#8dff76;font-weight:900;font-size:19px';
    const no=document.createElement('button');no.textContent='ANULUJ';no.style.cssText='padding:14px;border:1px solid #777;border-radius:12px;background:#252525;color:#fff;font-weight:800;font-size:19px';
    ok.onclick=()=>{const v=a.value.trim();if(!v)return;const m=defaults(c);write(c,{goals:[...m.goals,v]});d.close();d.remove();open();ctx()?.toast?.('✓ Dodano nowy cel');};no.onclick=()=>{d.close();d.remove();};bar.append(ok,no);d.append(bar);document.body.append(d);d.showModal();a.focus();
  }
  function status(c){const x=ctx();if(typeof x?.openStatus==='function')return x.openStatus(c);if(typeof x?.r115NewTile==='function')return x.r115NewTile('AKCJE I STATUS');x?.toast?.('STATUS CRM — funkcja chwilowo niedostępna');}

  function open(){
    const c=company();if(!c||!Object.keys(c).length){ctx()?.toast?.('CELE ASYSTENTA — brak wybranej firmy');return;}
    const m=defaults(c),s=screen();

    text(s,c.name||'—',150,311,552,76,47,{center:true,weight:'950',nowrap:true,min:24});
    text(s,country(c).toUpperCase(),105,404,150,50,22,{center:true,weight:'850',nowrap:true,min:15});
    text(s,role(c).toUpperCase(),320,404,200,50,22,{center:true,weight:'850',nowrap:true,min:15});
    text(s,'PRIORYTET '+String(c.priority||'—').toUpperCase(),574,404,232,50,20,{center:true,weight:'900',color:'#ffd43b',nowrap:true,min:14});

    text(s,'LISTA CELÓW',205,506,555,54,41,{weight:'950',color:'#ffd43b',fit:false});
    list(s,m.goals,205,570,555,430,30);

    text(s,'CEL PRIORYTETOWY',205,1072,555,48,36,{weight:'950',color:'#ff4a4a',fit:false});
    text(s,m.priority,205,1132,555,82,30,{weight:'850',line:'1.16',min:22});

    text(s,'NASTĘPNY KROK',205,1260,555,48,36,{weight:'950',color:'#39ff67',fit:false});
    text(s,m.nextStep,205,1317,555,80,30,{weight:'850',line:'1.16',min:22});

    text(s,'EDYTUJ CEL',83,1457,166,50,22,{center:true,weight:'900',color:'#22cfff',nowrap:true,min:16});
    text(s,'DODAJ CEL',325,1457,160,50,22,{center:true,weight:'900',color:'#fff04d',nowrap:true,min:16});
    text(s,'DO STATUSU\nCRM',578,1448,172,68,20,{center:true,weight:'900',color:'#ffb126',line:'1.05',min:15});
    text(s,'WRÓĆ DO SZCZEGÓŁU',250,1590,500,66,33,{center:true,weight:'900',nowrap:true,min:22});

    hot(s,24,22,145,145,'Wstecz',back);
    hot(s,686,22,150,150,'Synchronizuj',syncStay);
    hot(s,38,1426,235,112,'Edytuj cel',()=>editDialog(c));
    hot(s,286,1426,250,112,'Dodaj cel',()=>addDialog(c));
    hot(s,548,1426,255,112,'Do statusu CRM',()=>status(c));
    hot(s,38,1560,765,135,'Wróć do szczegółu',back);
    mount(s);
  }

  function installBridge(){
    const x=ctx();if(!x||x.__r129GoalsBridge)return;
    const original=x.r115NewTile;
    x.r115NewTile=function(label,...args){if(String(label||'').trim().toUpperCase()==='CELE ASYSTENTA')return open();return typeof original==='function'?original(label,...args):undefined;};
    x.__r129GoalsBridge=true;
  }

  window.R129_GOALS={open,version:'R129-v1.0B-cele-asystenta-surgical-1to1'};
  installBridge();
  setTimeout(installBridge,80);setTimeout(installBridge,300);setTimeout(installBridge,900);
})();