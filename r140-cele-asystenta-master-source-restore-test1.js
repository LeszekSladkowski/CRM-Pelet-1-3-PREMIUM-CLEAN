/* R140 TEST 1 — CELE ASYSTENTA — MASTER SOURCE RESTORE 1:1
   Źródło prawdy: R129 FINAL MASTER + raster 852x1846.
   Zasada: ZERO zmian geometrii, współrzędnych, rozmiarów, typografii i położenia warstw LIVE R129.
   Jedyna dopuszczona korekta wizualna: etykieta PRIORYTET pozostaje biała, a wartość A+/A/B ma kolor czerwony/zielony/niebieski.
   R132–R139 nie są już importowane przez sw.js.
*/

const r140MasterSourceRestoreBasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r140MasterSourceRestoreBasePatchIndexHtml(text);
  if(typeof out !== 'string' || !out) return out;

  [
    '1.3.0-test-r131-waluty-k1-press-chamfer-1to1',
    '1.3.0-test-r132-cele-company-name-center-1to1',
    '1.3.0-test-r133-cele-typography-priority-1to1',
    '1.3.0-test-r134-cele-micro-typography-1to1',
    '1.3.0-test-r135-cele-optical-alignment-1to1',
    '1.3.0-test-r136-cele-master-geometry-restore-1to1',
    '1.3.0-test-r137-cele-master-hard-lock-1to1',
    '1.3.0-test-r138-cele-mathematical-centering-1to1',
    '1.3.0-test-r139-cele-single-layer-centering-1to1'
  ].forEach(v=>{out=out.replaceAll(v,'1.3.0-test-r140-cele-master-source-restore-1to1');});

  [
    'R131 TEST 2 — WALUTY K1 PRESS CHAMFER 1:1',
    'R132 TEST 2 — CELE ASYSTENTA COMPANY NAME CENTER 1:1',
    'R133 TEST 1 — CELE ASYSTENTA TYPOGRAPHY + PRIORITY COLORS 1:1',
    'R134 TEST 1 — CELE ASYSTENTA MICRO TYPOGRAPHY ALIGNMENT 1:1',
    'R135 TEST 1 — CELE ASYSTENTA OPTICAL ALIGNMENT 1:1',
    'R136 TEST 1 — CELE ASYSTENTA MASTER GEOMETRY RESTORE 1:1',
    'R137 TEST 1 — CELE ASYSTENTA MASTER HARD LOCK 1:1',
    'R138 TEST 1 — CELE ASYSTENTA MATHEMATICAL CENTERING 1:1',
    'R139 TEST 1 — CELE ASYSTENTA SINGLE LAYER CENTERING 1:1'
  ].forEach(v=>{out=out.replaceAll(v,'R140 TEST 1 — CELE ASYSTENTA MASTER SOURCE RESTORE 1:1');});

  out = out.replace(/const BUILD_DATE = '[^']*';/,"const BUILD_DATE = '11.09.2026';");
  out = out.replace(/const BUILD_TIME = '[^']*';/,"const BUILD_TIME = '21:12';");
  out = out.replace(/sw\.js\?v=[^'\"]+/g,'sw.js?v=R140-test1-cele-master-source-restore-2112');
  out = out.replace(/r84-backup-prune\.js\?v=[^'\"]+/g,'r84-backup-prune.js?v=R140-test1-2112');

  /* TYLKO KOLOR PRIORYTETU. Żadnego setBox, transform, top/left/width/height ani zmiany fontu. */
  if(!out.includes('id="r140-cele-priority-color-only"')){
    const script = `
<script id="r140-cele-priority-color-only">
(function(){
  'use strict';
  function norm(v){return String(v||'').replace(/\\s+/g,' ').trim();}
  function color(v){
    const p=String(v||'').trim().toUpperCase();
    if(p==='A+') return '#ff3b30';
    if(p==='A') return '#39ff67';
    if(p==='B') return '#35bfff';
    return '#ffffff';
  }
  function esc(v){return String(v||'').replace(/[&<>\"']/g,function(ch){return ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'})[ch];});}
  function apply(){
    const root=document.querySelector('.r129-goals-live');
    if(!root) return;
    const divs=Array.from(root.children).filter(function(el){return el&&el.tagName==='DIV';});
    const el=divs.find(function(x){return norm(x.textContent).toUpperCase().startsWith('PRIORYTET');});
    if(!el || el.dataset.r140Priority==='1') return;
    const raw=norm(el.textContent).toUpperCase();
    const value=raw.replace(/^PRIORYTET\\s*/, '').trim()||'—';
    const c=color(value);
    el.innerHTML='<span style="color:#fff;font-weight:900">PRIORYTET</span><span style="display:inline-block;width:8px"></span><span style="color:'+c+';font-weight:950;text-shadow:0 0 8px '+c+'99,0 2px 5px #000">'+esc(value)+'</span>';
    el.dataset.r140Priority='1';
  }
  const observer=new MutationObserver(function(){requestAnimationFrame(apply);});
  observer.observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener('load',function(){setTimeout(apply,60);});
  setTimeout(apply,180);
})();
</script>`;
    out = out.replace('</body>',script+'\n</body>');
  }

  return out;
};
