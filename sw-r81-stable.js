/* R81 SURGICAL LOCAL-BRIDGE FIX — RYNKI EU.
   Przyczyna R80: r15OpenSection / r15OpenStatus / r17OpenOffer żyją w lokalnym scope głównego skryptu,
   więc zewnętrzny runtime nie mógł ich nadpisać z poziomu window.
   R81 naprawia to u źródła: podczas generowania index.html podmienia lokalne funkcje tak,
   aby wywoływały window.r80CompanyOpen(). Dzięki temu stare dolne modale nie mogą się uruchomić. */
importScripts('./sw-r80-stable.js?v=R80-stable-rollback');

const r81BasePatchIndexHtml=r48PatchIndexHtml;
r48PatchIndexHtml=function(text){
  let out=r81BasePatchIndexHtml(text);

  out=out.replaceAll('1.3.0-master-r80-rynki-eu-hard-runtime','1.3.0-master-r81-rynki-eu-surgical-bridge');
  out=out.replaceAll('R80 RYNKI EU HARD RUNTIME','R81 RYNKI EU SURGICAL BRIDGE');
  out=out.replace("const BUILD_TIME = '11:58';","const BUILD_TIME = '12:18';");
  out=out.replace("navigator.serviceWorker.register('./sw.js?v=R80-rynki-eu-hard-runtime-1158'","navigator.serviceWorker.register('./sw.js?v=R81-rynki-eu-surgical-bridge-1218'");

  // KLUCZOWA NAPRAWA: podmiana funkcji wewnątrz tego samego scope, w którym powstały.
  out=out.replace(
    /function r15OpenSection\(c,sec\)\{[\s\S]*?\n  \}/,
    "function r15OpenSection(c,sec){\n    if(window.r80CompanyOpen)return window.r80CompanyOpen(c,sec);\n    if(sec==='status')return r15OpenStatus(c);\n    if(sec==='data')return openModuleSheet('DANE FIRMY',r13Esc(r17DataText(c)));\n    if(sec==='offer')return openModuleSheet('CENY I OFERTA',r13Esc(r17OfferText(c)));\n    return openModuleSheet('NOTATKI ASYSTENTA',r13Esc(r17NotesText(c)))\n  }"
  );

  out=out.replace(
    /function r15OpenStatus\(c\)\{[\s\S]*?\n  \}/,
    "function r15OpenStatus(c){\n    if(window.r80CompanyOpen)return window.r80CompanyOpen(c,'status');\n    sheetTitle.textContent=`Status relacji — ${c.name}`;\n    sheetContent.innerHTML=`<div class=\"r18-status-grid\"><button class=\"r18-status-btn w\" data-s=\"NOWY\">NOWY</button><button class=\"r18-status-btn n\" data-s=\"NEGOCJACJE\">NEGOCJACJE</button><button class=\"r18-status-btn o\" data-s=\"OFERTA_WYSLANA\">OFERTA<br>WYSŁANA</button><button class=\"r18-status-btn a\" data-s=\"AKTYWNY\">AKTYWNY</button><button class=\"r18-status-btn x\" data-s=\"NIEAKTYWNY\">NIEAKTYWNY</button></div>`;\n    sheetContent.querySelectorAll('[data-s]').forEach(b=>b.addEventListener('click',()=>r15SetStatus(c.id,b.dataset.s)));sheet.hidden=false;\n  }"
  );

  out=out.replace(
    /function r17OpenOffer\(c\)\{openModuleSheet\(`CENY I OFERTA — \$\{c\.name\}`,r13Esc\(r17OfferText\(c\)\)\)\}/,
    "function r17OpenOffer(c){if(window.r80CompanyOpen)return window.r80CompanyOpen(c,'offer');openModuleSheet(`CENY I OFERTA — ${c.name}`,r13Esc(r17OfferText(c)))}"
  );

  return out;
};
