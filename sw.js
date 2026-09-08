/* R121 — CENY — LIVE TILE ACTIVATION
   Baza: zweryfikowany R120 DANE FIRMY — TOP NAME MASTER FIX.
   Jedyna nowa funkcja: aktywacja kafla CENY w OKNIE 3 na czystej grafice MASTER wgranej przez Leszka.
   R120 DANE FIRMY oraz pozostałe zamrożone MASTER-y pozostają bez zmian.
*/
importScripts('./sw-r119-master.js?v=R121-ceny-live-tile-activation');

if(Array.isArray(ASSETS)){
  const r121PriceImg='./grafiki/rynki-eu/szczegoly-firmy/file_00000000295481f4b17fe257ae1822eb.png';
  if(!ASSETS.includes(r121PriceImg)) ASSETS.push(r121PriceImg);
}

const r119TopNameBasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r119TopNameBasePatchIndexHtml(text);

  /* Zachowaj chirurgicznie R120 DANE FIRMY */
  out = out.replaceAll('1.3.0-master-r119-dane-firmy-sync-center-master','1.3.0-master-r121-ceny-live-tile-activation');
  out = out.replaceAll('R119 DANE FIRMY — SYNC STAY + CENTER MASTER','R121 CENY — LIVE TILE ACTIVATION');
  out = out.replace("const BUILD_TIME = '15:09';","const BUILD_TIME = '17:59';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R119-dane-firmy-sync-center-master-1509'","navigator.serviceWorker.register('./sw.js?v=R121-ceny-live-tile-activation-1759'");
  out = out.replace(/r84-backup-prune\.js\?v=R119-1509/g,'r84-backup-prune.js?v=R121-1759');

  out = out.replace(
    "r117Field(s,c.name,355,235,285,22,'#fff','900','center',true);",
    "r117Field(s,c.name,405,226,310,(String(c.name||'').length<=10?30:String(c.name||'').length<=18?24:18),'#fff','900','center',true);"
  );

  /* R121 — funkcjonalna karta CENY na czystej grafice MASTER */
  if(!out.includes('r121-ceny-live-tile-inside-iife')){
    const r121Inside = `
  /* r121-ceny-live-tile-inside-iife */
  const R121_PRICE_IMG='./grafiki/rynki-eu/szczegoly-firmy/file_00000000295481f4b17fe257ae1822eb.png';

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
`;
    out = out.replace('  function r115RenderCompanyMaster(){',r121Inside+'\n  function r115RenderCompanyMaster(){');
  }

  out = out.replace(
    "s.append(hotspot({x:422,y:786,w:398,h:180,label:'Ceny',onClick:()=>r115NewTile('CENY'),baseW:852,baseH:1846,z:30}));",
    "s.append(hotspot({x:422,y:786,w:398,h:180,label:'Ceny',onClick:()=>r121OpenCompanyPrices(c),baseW:852,baseH:1846,z:30}));"
  );

  return out;
};
