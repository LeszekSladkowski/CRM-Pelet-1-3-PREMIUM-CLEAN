/* R86 — RYNKI EU / DANE FIRMY MASTER 1:1
   Baza wykonawcza: R85 CLEAN BASE HARD PRUNE.
   Zasada: tylko jedna zatwierdzona karta naraz. Bez przebudowy pozostalych kart.
*/
importScripts('./sw-r76-stable.js?v=R76-stable-clean-base');

if(Array.isArray(ASSETS) && !ASSETS.includes('./r84-backup-prune.js')) ASSETS.push('./r84-backup-prune.js');
if(Array.isArray(ASSETS) && !ASSETS.includes('./master-firma-koniec.png')) ASSETS.push('./master-firma-koniec.png');

const r86BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r86BasePatchIndexHtml(text);

  /* Najpierw zachowujemy chirurgiczne porzadki R85. */
  out = out.replaceAll('1.3.0-master-r76-waluty-karta4-surgical-gauge-clean','1.3.0-master-r86-rynki-eu-dane-firmy-master');
  out = out.replaceAll('R76 WALUTY KARTA 4 SURGICAL GAUGE CLEAN','R86 RYNKI EU DANE FIRMY MASTER');
  out = out.replaceAll('1.3.0-master-r85-clean-base-hard-prune','1.3.0-master-r86-rynki-eu-dane-firmy-master');
  out = out.replaceAll('R85 CLEAN BASE HARD PRUNE','R86 RYNKI EU DANE FIRMY MASTER');
  out = out.replace("const BUILD_TIME = '17:58';","const BUILD_TIME = '14:26';");
  out = out.replace("const BUILD_TIME = '13:52';","const BUILD_TIME = '14:26';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R76-waluty-karta4-surgical-gauge-clean-1758'","navigator.serviceWorker.register('./sw.js?v=R86-rynki-eu-dane-firmy-master-1426'");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R85-clean-base-hard-prune-1352'","navigator.serviceWorker.register('./sw.js?v=R86-rynki-eu-dane-firmy-master-1426'");

  if(!out.includes('r84-backup-prune.js')){
    out = out.replace('</body>','<script src="./r84-backup-prune.js?v=R86-1426"></script>\n</body>');
  }else{
    out = out.replace(/r84-backup-prune\.js\?v=[^\"']+/g,'r84-backup-prune.js?v=R86-1426');
  }

  /*
    KARTA 1 — DANE FIRMY.
    Nie rekonstruujemy grafiki CSS-em. Uzywamy zatwierdzonego rastra
    master-firma-koniec.png 1:1, a funkcje dodajemy przez niewidoczne hotspoty.
    Na tym etapie MASTER uruchamiany jest tylko dla zatwierdzonego rekordu
    Skład Opału Opole. Pozostale firmy zachowuja dotychczasowy stabilny widok,
    dopoki ich warstwa 1:1 nie zostanie osobno zatwierdzona.
  */
  const r86Anchor = 'renderCompany=renderCompanyR15;';
  if(out.includes(r86Anchor) && !out.includes('function renderCompanyR86')){
    const r86Code = `
  function r86CompanyBackRoute(c){return c&&c.countryCode==='DE'?'germany':'country'}
  function r86GoogleCompany(c){
    const q=[c?.name,c?.city,c?.countryName,'pellet'].filter(Boolean).join(' ');
    window.open('https://www.google.com/search?q='+encodeURIComponent(q),'_blank','noopener');
  }
  function r86OpenCompanyEditor(c){
    const key='crm13_company_manual_updates_v1';
    let map={};try{map=JSON.parse(localStorage.getItem(key)||'{}')}catch{}
    const saved=map[c.id]||{};
    sheetTitle.textContent='AKTUALIZUJ DANE — '+c.name;
    sheetContent.innerHTML=\`<input class="sheet-input" data-f="contactPerson" placeholder="Osoba kontaktowa" value="\${r13Esc(saved.contactPerson??c.contactPerson??'')}">
      <input class="sheet-input" data-f="address" placeholder="Adres" value="\${r13Esc(saved.address??c.address??'')}">
      <input class="sheet-input" data-f="phone" placeholder="Telefon" value="\${r13Esc(saved.phone??c.phone??'')}">
      <input class="sheet-input" data-f="email" placeholder="E-mail" value="\${r13Esc(saved.email??c.email??'')}">
      <input class="sheet-input" data-f="website" placeholder="Strona WWW" value="\${r13Esc(saved.website??c.website??c.www??'')}">
      <input class="sheet-input" data-f="vat" placeholder="NIP / VAT" value="\${r13Esc(saved.vat??c.vat??c.nip??'')}">
      <button class="sheet-action green wide" data-save-company>ZAPISZ DANE</button>\`;
    sheetContent.querySelector('[data-save-company]').onclick=()=>{
      const patch={};sheetContent.querySelectorAll('[data-f]').forEach(i=>patch[i.dataset.f]=i.value.trim());
      patch.updatedAt=new Date().toISOString();map[c.id]={...(map[c.id]||{}),...patch};localStorage.setItem(key,JSON.stringify(map));
      closeSheet();toast('✓ Dane firmy zapisane lokalnie.');
    };
    sheet.hidden=false;
  }
  function renderCompanyR86(){
    const c=getCompanyById(state.selectedCompany)||r15AllCompanies()[0];
    if(!c)return renderMarketsR15();
    if(c.id!=='sklad-opalu-opole-pl')return renderCompanyR15();
    const s=screenBase(screens.company);s.classList.add('r86-company-master-1to1');
    const BW=708,BH=1536;
    s.append(hotspot({x:18,y:10,w:104,h:104,label:'Wstecz',onClick:()=>go(r86CompanyBackRoute(c)),z:180,baseW:BW,baseH:BH}));
    s.append(hotspot({x:578,y:8,w:114,h:108,label:'Synchronizuj',onClick:()=>sync('✓ Dane firmy zsynchronizowane'),z:180,baseW:BW,baseH:BH}));
    s.append(hotspot({x:493,y:485,w:190,h:76,label:'Pokaż na mapie',onClick:()=>r19OpenCompanyMap(c),z:180,baseW:BW,baseH:BH}));
    s.append(hotspot({x:23,y:1295,w:315,h:90,label:'Uaktualnij dane',onClick:()=>r86OpenCompanyEditor(c),z:180,baseW:BW,baseH:BH}));
    s.append(hotspot({x:343,y:1295,w:342,h:90,label:'Szukaj danych w Google',onClick:()=>r86GoogleCompany(c),z:180,baseW:BW,baseH:BH}));
    s.append(hotspot({x:23,y:1390,w:662,h:92,label:'Wróć do karty',onClick:()=>go(r86CompanyBackRoute(c)),z:180,baseW:BW,baseH:BH}));
    return s;
  }
  renderCompany=renderCompanyR86;`;
    out = out.replace(r86Anchor, r86Anchor + r86Code);
  }

  return out;
};
