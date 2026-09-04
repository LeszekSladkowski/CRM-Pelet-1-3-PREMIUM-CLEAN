/* R89 — RYNKI EU / DANE FIRMY UNIVERSAL ROUTE FORCE ACTIVATE
   Baza wykonawcza: R85 CLEAN BASE HARD PRUNE.
   Cel: bezwarunkowo usunąć blokadę R87 i otworzyć SZCZEGÓŁY dla każdej firmy.
   Skład Opału Opole pozostaje na zatwierdzonej karcie MASTER 1:1.
   Pozostałe firmy otwierają żywą kartę firmy bez komunikatu blokady.
*/
importScripts('./sw-r76-stable.js?v=R76-stable-clean-base');

// Wymuś natychmiastowe przejęcie nowego Service Workera, żeby stary R87 nie trzymał aplikacji.
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));

if(Array.isArray(ASSETS) && !ASSETS.includes('./r84-backup-prune.js')) ASSETS.push('./r84-backup-prune.js');
if(Array.isArray(ASSETS) && !ASSETS.includes('./master-firma-koniec.png')) ASSETS.push('./master-firma-koniec.png');

const r89BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r89BasePatchIndexHtml(text);

  out = out.replaceAll('1.3.0-master-r76-waluty-karta4-surgical-gauge-clean','1.3.0-master-r89-dane-firmy-universal-force');
  out = out.replaceAll('R76 WALUTY KARTA 4 SURGICAL GAUGE CLEAN','R89 DANE FIRMY UNIVERSAL FORCE');
  out = out.replaceAll('1.3.0-master-r85-clean-base-hard-prune','1.3.0-master-r89-dane-firmy-universal-force');
  out = out.replaceAll('R85 CLEAN BASE HARD PRUNE','R89 DANE FIRMY UNIVERSAL FORCE');
  out = out.replaceAll('1.3.0-master-r86-rynki-eu-dane-firmy-master','1.3.0-master-r89-dane-firmy-universal-force');
  out = out.replaceAll('R86 RYNKI EU DANE FIRMY MASTER','R89 DANE FIRMY UNIVERSAL FORCE');
  out = out.replaceAll('1.3.0-master-r87-dane-firmy-hard-gate','1.3.0-master-r89-dane-firmy-universal-force');
  out = out.replaceAll('R87 DANE FIRMY HARD GATE','R89 DANE FIRMY UNIVERSAL FORCE');
  out = out.replaceAll('1.3.0-master-r88-dane-firmy-universal-route','1.3.0-master-r89-dane-firmy-universal-force');
  out = out.replaceAll('R88 DANE FIRMY UNIVERSAL ROUTE','R89 DANE FIRMY UNIVERSAL FORCE');
  out = out.replace("const BUILD_DATE = '02.09.2026';","const BUILD_DATE = '04.09.2026';");
  out = out.replace("const BUILD_TIME = '17:58';","const BUILD_TIME = '15:08';");
  out = out.replace("const BUILD_TIME = '13:52';","const BUILD_TIME = '15:08';");
  out = out.replace("const BUILD_TIME = '14:26';","const BUILD_TIME = '15:08';");
  out = out.replace("const BUILD_TIME = '14:44';","const BUILD_TIME = '15:08';");
  out = out.replace("const BUILD_TIME = '14:56';","const BUILD_TIME = '15:08';");

  // WAŻNE: podmieniamy również rejestrację z bazowego index.html (R43), żeby przeglądarka
  // pobrała nowy SW pod nowym adresem i nie została na aktywnym R87.
  out = out.replace(/navigator\.serviceWorker\.register\('\.\/sw\.js\?v=[^']+'/g,"navigator.serviceWorker.register('./sw.js?v=R89-dane-firmy-universal-force-1508'");

  if(!out.includes('r84-backup-prune.js')){
    out = out.replace('</body>','<script src="./r84-backup-prune.js?v=R89-1508"></script>\n</body>');
  }else{
    out = out.replace(/r84-backup-prune\.js\?v=[^\"']+/g,'r84-backup-prune.js?v=R89-1508');
  }

  const anchor = 'renderCompany=renderCompanyR15;';
  if(out.includes(anchor) && !out.includes('function renderCompanyR89')){
    const code = `
  function r89CompanyBackRoute(c){return c&&c.countryCode==='DE'?'germany':'country'}
  function r89GoogleCompany(c){
    const q=[c?.name,c?.city,c?.countryName,'pellet'].filter(Boolean).join(' ');
    window.open('https://www.google.com/search?q='+encodeURIComponent(q),'_blank','noopener');
  }
  function r89OpenCompanyEditor(c){
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
  function renderCompanyR89(){
    const c=getCompanyById(state.selectedCompany)||r15AllCompanies()[0];
    if(!c)return renderMarketsR15();

    // ZERO HARD-GATE. Każdy rekord ma wejście w SZCZEGÓŁY.
    if(c.id==='sklad-opalu-opole-pl'){
      const s=screenBase(screens.company);
      s.classList.add('r89-company-master-1to1');
      s.style.aspectRatio='709 / 1536';
      const BW=709,BH=1536;
      s.append(hotspot({x:18,y:10,w:104,h:104,label:'Wstecz',onClick:()=>go(r89CompanyBackRoute(c)),z:180,baseW:BW,baseH:BH}));
      s.append(hotspot({x:579,y:8,w:114,h:108,label:'Synchronizuj',onClick:()=>sync('✓ Dane firmy zsynchronizowane'),z:180,baseW:BW,baseH:BH}));
      s.append(hotspot({x:494,y:485,w:190,h:76,label:'Pokaż na mapie',onClick:()=>r19OpenCompanyMap(c),z:180,baseW:BW,baseH:BH}));
      s.append(hotspot({x:23,y:1295,w:315,h:90,label:'Uaktualnij dane',onClick:()=>r89OpenCompanyEditor(c),z:180,baseW:BW,baseH:BH}));
      s.append(hotspot({x:344,y:1295,w:342,h:90,label:'Szukaj danych w Google',onClick:()=>r89GoogleCompany(c),z:180,baseW:BW,baseH:BH}));
      s.append(hotspot({x:23,y:1390,w:663,h:92,label:'Wróć do karty',onClick:()=>go(r89CompanyBackRoute(c)),z:180,baseW:BW,baseH:BH}));
      return s;
    }

    // Wszystkie pozostałe rekordy: żywa karta firmowa. Nie ma już komunikatu blokady R87.
    return renderCompanyR15();
  }
  renderCompany=renderCompanyR89;`;
    out = out.replace(anchor, anchor + code);
  }

  return out;
};
