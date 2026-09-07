/* R97 — DANE FIRMY CLEAN LIVE TEST — ANPOL ONLY
   BAZA: STAN 0 / R92 SURGICAL CLEAN BASELINE.
   ZMIANA: tylko jeden rekord testowy (anpol-pl) i tylko kafel DANE FIRMY.
*/
importScripts('./sw-r76-stable.js?v=R76-stable-clean-base');

const R97_ASSETS=[
  './r84-backup-prune.js',
  './assets/masters/dane-firmy-clean-master.png',
  './r97-dane-firmy-live.css',
  './r97-dane-firmy-live.js'
];
if(Array.isArray(ASSETS))R97_ASSETS.forEach(a=>{if(!ASSETS.includes(a))ASSETS.push(a)});

const r97BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r97BasePatchIndexHtml(text);
  out = out.replaceAll('1.3.0-master-r76-waluty-karta4-surgical-gauge-clean','1.3.0-master-r97-dane-firmy-clean-live-test');
  out = out.replaceAll('R76 WALUTY KARTA 4 SURGICAL GAUGE CLEAN','R97 DANE FIRMY CLEAN LIVE TEST');
  out = out.replace("const BUILD_DATE = '02.09.2026';","const BUILD_DATE = '07.09.2026';");
  out = out.replace("const BUILD_TIME = '17:58';","const BUILD_TIME = '15:03';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R76-waluty-karta4-surgical-gauge-clean-1758'","navigator.serviceWorker.register('./sw.js?v=R97-dane-firmy-clean-live-test-1503'");

  if(!out.includes('r84-backup-prune.js')){
    out = out.replace('</body>','<script src="./r84-backup-prune.js?v=R97-1503"></script>\n</body>');
  }else{
    out = out.replace(/r84-backup-prune\.js\?v=[^\"']+/g,'r84-backup-prune.js?v=R97-1503');
  }
  if(!out.includes('r97-dane-firmy-live.css')){
    out = out.replace('</head>','<link rel="stylesheet" href="./r97-dane-firmy-live.css?v=R97-1503">\n</head>');
  }
  if(!out.includes('r97-dane-firmy-live.js')){
    out = out.replace('</body>','<script src="./r97-dane-firmy-live.js?v=R97-1503"></script>\n</body>');
  }
  return out;
};
