/* R122 — HISTORIA — LIVE NAVIGATION
   Baza: zweryfikowany R121 CENY — LIVE TILE ACTIVATION.
   Jedyna nowa funkcja: aktywacja kafla HISTORIA w OKNIE 3 oraz przejścia HISTORIA -> SZCZEGÓŁ HISTORII -> HISTORIA.
   R120 DANE FIRMY, R121 CENY oraz pozostałe zamrożone MASTER-y pozostają bez zmian.
*/
importScripts('./sw-r119-master.js?v=R122-historia-live-navigation');

if(Array.isArray(ASSETS)){
  const r121PriceImg='./grafiki/rynki-eu/szczegoly-firmy/file_00000000295481f4b17fe257ae1822eb.png';
  const r122HistoryImg='./grafiki/rynki-eu/szczegoly-firmy/file_00000000733881f48b17bd50042382ce.png';
  const r122HistoryDetailImg='./grafiki/rynki-eu/szczegoly-firmy/file_00000000efd881f4967d7f1716195e44.png';
  if(!ASSETS.includes(r121PriceImg)) ASSETS.push(r121PriceImg);
  if(!ASSETS.includes(r122HistoryImg)) ASSETS.push(r122HistoryImg);
  if(!ASSETS.includes(r122HistoryDetailImg)) ASSETS.push(r122HistoryDetailImg);
}

const r119TopNameBasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r119TopNameBasePatchIndexHtml(text);

  /* Zachowaj chirurgicznie R120 DANE FIRMY */
  out = out.replaceAll('1.3.0-master-r119-dane-firmy-sync-center-master','1.3.0-master-r122-historia-live-navigation');
  out = out.replaceAll('R119 DANE FIRMY — SYNC STAY + CENTER MASTER','R122 HISTORIA — LIVE NAVIGATION');
  out = out.replace("const BUILD_TIME = '15:09';","const BUILD_TIME = '21:35';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R119-dane-firmy-sync-center-master-1509'","navigator.serviceWorker.register('./sw.js?v=R122-historia-live-navigation-2135'");
  out = out.replace(/r84-backup-prune\.js\?v=R119-1509/g,'r84-backup-prune.js?v=R122-2135');

  out = out.replace(
    "r117Field(s,c.name,355,235,285,22,'#fff','900','center',true);",
    "r117Field(s,c.name,405,226,310,(String(c.name||'').length<=10?30:String(c.name||'').length<=18?24:18),'#fff','900','center',true);"
  );

  /* R122 — zachowaj CENY + aktywuj HISTORIĘ na czystych grafikach MASTER */
  if(!out.includes('r122-history-live-navigation-inside-iife')){
    const r122Inside = `
  /* r122-history-live-navigation-inside-iife */
  const R121_PRICE_IMG='./grafiki/rynki-eu/szczegoly-firmy/file_00000000295481f4b17fe257ae1822eb.png';
  const R122_HISTORY_IMG='./grafiki/rynki-eu/szczegoly-firmy/file_00000000733881f48b17bd50042382ce.png';
  const R122_HISTORY_DETAIL_IMG='./grafiki/rynki-eu/szczegoly-firmy/file_00000000efd881f4967d7f1716195e44.png';

  function r121PriceGoogle(c){
    const q=[c&&c.name,c&&c.city,c&&c.countryName,'pellet cena hurt'].filter(Boolean).join(' ');
    openUrl('https://www.google.com/search?q='+encodeURIComponent(q||'pellet cena hurt'));
  }

  async function r121PriceSyncStay(c){
    const keepId=String((c&&c.id)||state.selectedCompany||'').trim();
    try{
      const result=sync();
      if(result&&typeof result.then==='function') await result;
    }catch(e){
      console.warn('R121 sync CENY',e);
    }finally{
      if(keepId) state.selectedCompany=keepId;
      setTimeout(()=>r121OpenCompanyPrices(getCompanyById(keepId)||c),120);
    }
  }

  function r121OpenCompanyPrices(base){
    const c=base||getCompanyById(state.selectedCompany)||{};
    const s=document.createElement('section');
    s.className='screen r121-company-prices';
    s.style.position='relative';

    const img=document.createElement('img');
    img.className='master';
    img.src=R121_PRICE_IMG;
    img.alt='Ceny — MASTER';
    s.append(img);

    s.append(hotspot({x:0,y:0,w:140,h:145,label:'Wstecz',onClick:render,baseW:853,baseH:1844,z:30}));
    s.append(hotspot({x:690,y:0,w:163,h:155,label:'Synchronizuj',onClick:()=>r121PriceSyncStay(c),baseW:853,baseH:1844,z:30}));
    s.append(hotspot({x:30,y:1550,w:380,h:105,label:'Aktualizuj ceny',onClick:()=>r121PriceSyncStay(c),baseW:853,baseH:1844,z:30}));
    s.append(hotspot({x:420,y:1550,w:383,h:105,label:'Szukaj cen w Google',onClick:()=>r121PriceGoogle(c),baseW:853,baseH:1844,z:30}));
    s.append(hotspot({x:30,y:1674,w:773,h:100,label:'Wróć do karty',onClick:render,baseW:853,baseH:1844,z:30}));

    app.replaceChildren(s);
  }

  async function r122HistorySyncStay(c,detail){
    const keepId=String((c&&c.id)||state.selectedCompany||'').trim();
    try{
      const result=sync();
      if(result&&typeof result.then==='function') await result;
    }catch(e){
      console.warn('R122 sync HISTORIA',e);
    }finally{
      if(keepId) state.selectedCompany=keepId;
      const keepCompany=getCompanyById(keepId)||c;
      setTimeout(()=>detail?r122OpenHistoryDetail(keepCompany):r122OpenCompanyHistory(keepCompany),120);
    }
  }

  function r122HistoryFuture(label){
    toast(label+' — funkcja zostanie uruchomiona w kolejnym osobnym kroku MASTER');
  }

  function r122OpenHistoryDetail(base){
    const c=base||getCompanyById(state.selectedCompany)||{};
    const s=document.createElement('section');
    s.className='screen r122-history-detail';
    s.style.position='relative';

    const img=document.createElement('img');
    img.className='master';
    img.src=R122_HISTORY_DETAIL_IMG;
    img.alt='Szczegół historii — MASTER';
    s.append(img);

    s.append(hotspot({x:0,y:0,w:140,h:145,label:'Wstecz do historii',onClick:()=>r122OpenCompanyHistory(c),baseW:853,baseH:1844,z:30}));
    s.append(hotspot({x:690,y:0,w:163,h:155,label:'Synchronizuj',onClick:()=>r122HistorySyncStay(c,true),baseW:853,baseH:1844,z:30}));
    s.append(hotspot({x:30,y:1505,w:255,h:115,label:'Edytuj wpis',onClick:()=>r122HistoryFuture('EDYTUJ WPIS'),baseW:853,baseH:1844,z:30}));
    s.append(hotspot({x:295,y:1505,w:255,h:115,label:'Dodaj kolejny',onClick:()=>r122HistoryFuture('DODAJ KOLEJNY'),baseW:853,baseH:1844,z:30}));
    s.append(hotspot({x:560,y:1505,w:263,h:115,label:'Zmień status',onClick:()=>r122HistoryFuture('ZMIEŃ STATUS'),baseW:853,baseH:1844,z:30}));
    s.append(hotspot({x:30,y:1645,w:773,h:110,label:'Wróć do historii',onClick:()=>r122OpenCompanyHistory(c),baseW:853,baseH:1844,z:30}));

    app.replaceChildren(s);
  }

  function r122OpenCompanyHistory(base){
    const c=base||getCompanyById(state.selectedCompany)||{};
    const s=document.createElement('section');
    s.className='screen r122-company-history';
    s.style.position='relative';

    const img=document.createElement('img');
    img.className='master';
    img.src=R122_HISTORY_IMG;
    img.alt='Historia — MASTER';
    s.append(img);

    s.append(hotspot({x:0,y:0,w:140,h:145,label:'Wstecz',onClick:render,baseW:853,baseH:1844,z:30}));
    s.append(hotspot({x:690,y:0,w:163,h:155,label:'Synchronizuj',onClick:()=>r122HistorySyncStay(c,false),baseW:853,baseH:1844,z:30}));

    s.append(hotspot({x:25,y:390,w:140,h:125,label:'Wszystko',onClick:()=>r122HistoryFuture('FILTR WSZYSTKO'),baseW:853,baseH:1844,z:30}));
    s.append(hotspot({x:170,y:390,w:140,h:125,label:'Statusy',onClick:()=>r122HistoryFuture('FILTR STATUSY'),baseW:853,baseH:1844,z:30}));
    s.append(hotspot({x:315,y:390,w:155,h:125,label:'Korespondencja',onClick:()=>r122HistoryFuture('FILTR KORESPONDENCJA'),baseW:853,baseH:1844,z:30}));
    s.append(hotspot({x:475,y:390,w:130,h:125,label:'Ceny',onClick:()=>r122HistoryFuture('FILTR CENY'),baseW:853,baseH:1844,z:30}));
    s.append(hotspot({x:610,y:390,w:210,h:125,label:'Notatki',onClick:()=>r122HistoryFuture('FILTR NOTATKI'),baseW:853,baseH:1844,z:30}));

    s.append(hotspot({x:30,y:525,w:245,h:85,label:'Ostatnie 7 dni',onClick:()=>r122HistoryFuture('OSTATNIE 7 DNI'),baseW:853,baseH:1844,z:30}));
    s.append(hotspot({x:285,y:525,w:245,h:85,label:'Ostatnie 30 dni',onClick:()=>r122HistoryFuture('OSTATNIE 30 DNI'),baseW:853,baseH:1844,z:30}));
    s.append(hotspot({x:540,y:525,w:280,h:85,label:'Cała historia',onClick:()=>r122HistoryFuture('CAŁA HISTORIA'),baseW:853,baseH:1844,z:30}));

    const rowYs=[625,750,875,1000,1125,1250];
    rowYs.forEach((y,i)=>s.append(hotspot({x:25,y:y,w:800,h:115,label:'Szczegół historii '+(i+1),onClick:()=>r122OpenHistoryDetail(c),baseW:853,baseH:1844,z:30})));

    s.append(hotspot({x:25,y:1450,w:185,h:110,label:'Dodaj wpis',onClick:()=>r122HistoryFuture('DODAJ WPIS'),baseW:853,baseH:1844,z:30}));
    s.append(hotspot({x:215,y:1450,w:195,h:110,label:'Dodaj korespondencję',onClick:()=>r122HistoryFuture('DODAJ KORESPONDENCJĘ'),baseW:853,baseH:1844,z:30}));
    s.append(hotspot({x:415,y:1450,w:195,h:110,label:'Dodaj cenę',onClick:()=>r122HistoryFuture('DODAJ CENĘ'),baseW:853,baseH:1844,z:30}));
    s.append(hotspot({x:615,y:1450,w:210,h:110,label:'Zmień status',onClick:()=>r122HistoryFuture('ZMIEŃ STATUS'),baseW:853,baseH:1844,z:30}));
    s.append(hotspot({x:30,y:1590,w:773,h:140,label:'Wróć do karty',onClick:render,baseW:853,baseH:1844,z:30}));

    app.replaceChildren(s);
  }
`;
    out = out.replace('  function r115RenderCompanyMaster(){',r122Inside+'\n  function r115RenderCompanyMaster(){');
  }

  out = out.replace(
    "s.append(hotspot({x:422,y:786,w:398,h:180,label:'Ceny',onClick:()=>r115NewTile('CENY'),baseW:852,baseH:1846,z:30}));",
    "s.append(hotspot({x:422,y:786,w:398,h:180,label:'Ceny',onClick:()=>r121OpenCompanyPrices(c),baseW:852,baseH:1846,z:30}));"
  );

  out = out.replace(
    "s.append(hotspot({x:12,y:982,w:398,h:180,label:'Historia',onClick:()=>r115NewTile('HISTORIA'),baseW:852,baseH:1846,z:30}));",
    "s.append(hotspot({x:12,y:982,w:398,h:180,label:'Historia',onClick:()=>r122OpenCompanyHistory(c),baseW:852,baseH:1846,z:30}));"
  );

  return out;
};
