/* R103 — CRM 1.3 RYNKI EU COMPANY DETAILS CLEAN STEP 1 — REMOVE DANE FIRMY LEGACY TILE
   Baza funkcjonalna: zweryfikowany R102 FINAL CLEAN MASTER / PUNKT 0 R92.
   Zmiana chirurgiczna: z aktywnej karty szczegółów firmy renderCompanyR15 usunięto wyłącznie stary kafel DANE FIRMY i jego wywołanie dolnego panelu.
   CENY I OFERTA, NOTATKI ASYSTENTA, AKCJE I STATUS oraz górne akcje TELEFON/MAPA/OFERTA/EMAIL pozostają bez zmian.
   Ochrona lokalnych backupów z R101 i czyszczenie katalogu R38 z R102 pozostają aktywne.
   Aktywny łańcuch pozostaje: sw-r54-core.js -> sw-r66-stable.js -> sw-r76-stable.js -> sw.js.
*/
importScripts('./sw-r76-stable.js?v=R103-remove-dane-firmy-legacy-tile');

if(Array.isArray(ASSETS)){
  const r103MaskableDuplicate='./icon-maskable-512.png';
  const r103MaskableDuplicateIndex=ASSETS.indexOf(r103MaskableDuplicate);
  if(r103MaskableDuplicateIndex>=0) ASSETS.splice(r103MaskableDuplicateIndex,1);
  if(!ASSETS.includes('./r84-backup-prune.js')) ASSETS.push('./r84-backup-prune.js');
}

const r103BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r103BasePatchIndexHtml(text);

  /* R101 — nie wolno czyścić całej lokalnej bazy backupów przez historyczny mechanizm R38. */
  out = out.replaceAll('await r38CleanBackupWarehouseOnce();','');

  /* R102 — martwy katalog R38 nie może być już oznaczany jako aktualna wersja. */
  out = out.replaceAll("if(catalog[0]){catalog[0].current=true;catalog[0].description='MEGA STABILNY MASTER — oficjalny punkt powrotu R38.';}","");
  out = out.replaceAll(
    'Automatyczny backup danych jest tworzony przed aktualizacją. Punkty powrotu MASTER są przechowywane w pakiecie <b>backups/</b> i mogą zostać pobrane do przywrócenia.',
    'Automatyczny backup danych jest tworzony przed aktualizacją. Lokalne kopie danych pozostają w Magazynie Backupów, a zweryfikowane punkty MASTER są zabezpieczone w repozytorium GitHub.'
  );

  /* R103 — aktywna KARTA 3/3 szczegółów firmy: całkowity delete starego kafla DANE FIRMY. */
  out = out.replace(
    "    if(sec==='data')return openModuleSheet('DANE FIRMY',r13Esc(r17DataText(c)));\n    if(sec==='offer')return openModuleSheet('CENY I OFERTA',r13Esc(r17OfferText(c)));",
    "    if(sec==='offer')return openModuleSheet('CENY I OFERTA',r13Esc(r17OfferText(c)));"
  );
  out = out.replace(
    "const previews={data:[c.city||c.region||c.countryName,c.type].filter(Boolean).join(' • '),offer:c.priceText||(c.price?`${c.price} €/t`:'Cena: zapytaj o ofertę'),notes:c.nextFollowUp||(Array.isArray(c.notes)&&c.notes[0])||'Brak zapisanych notatek.',status:`Status: ${r15GetStatus(c.id).replaceAll('_',' ')}`};",
    "const previews={offer:c.priceText||(c.price?`${c.price} €/t`:'Cena: zapytaj o ofertę'),notes:c.nextFollowUp||(Array.isArray(c.notes)&&c.notes[0])||'Brak zapisanych notatek.',status:`Status: ${r15GetStatus(c.id).replaceAll('_',' ')}`};"
  );
  out = out.replace(
    "[['data','DANE FIRMY'],['offer','CENY I OFERTA'],['notes','NOTATKI ASYSTENTA'],['status','AKCJE I STATUS']]",
    "[['offer','CENY I OFERTA'],['notes','NOTATKI ASYSTENTA'],['status','AKCJE I STATUS']]"
  );

  out = out.replaceAll('1.3.0-master-r76-waluty-karta4-surgical-gauge-clean','1.3.0-master-r103-rynki-eu-remove-dane-firmy-legacy-tile');
  out = out.replaceAll('R76 WALUTY KARTA 4 SURGICAL GAUGE CLEAN','R103 RYNKI EU — REMOVE DANE FIRMY LEGACY TILE');
  out = out.replace("const BUILD_DATE = '02.09.2026';","const BUILD_DATE = '07.09.2026';");
  out = out.replace("const BUILD_TIME = '17:58';","const BUILD_TIME = '20:18';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R76-waluty-karta4-surgical-gauge-clean-1758'","navigator.serviceWorker.register('./sw.js?v=R103-rynki-eu-remove-dane-firmy-legacy-tile-2018'");
  if(!out.includes('r84-backup-prune.js')){
    out = out.replace('</body>','<script src="./r84-backup-prune.js?v=R103-2018"></script>\n</body>');
  }else{
    out = out.replace(/r84-backup-prune\.js\?v=[^\"']+/g,'r84-backup-prune.js?v=R103-2018');
  }
  return out;
};
