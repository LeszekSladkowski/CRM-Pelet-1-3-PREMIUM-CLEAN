/* R73 — WALUTY KARTA 4 FINAL FREEZE CANDIDATE
   K1/K2/K3 = FINAL MASTER, zero zmian.
   K4 = czysty raster runtime, aktywne pola, jedna wskazówka, dwie strzałki LIVE.
   ZERO runtime canvas-mask / ZERO czarnych prostokątów. */

const R73_K4_ASSETS=['./master-waluty-karta4-r73-runtime-clean.webp','./waluty-k4-r72-live-arrows.png'];
if(Array.isArray(ASSETS))R73_K4_ASSETS.forEach(a=>{if(!ASSETS.includes(a))ASSETS.push(a)});

const r73BasePatchIndexHtml=r48PatchIndexHtml;
r48PatchIndexHtml=function(text){
  let out=r73BasePatchIndexHtml(text);

  out=out.replaceAll('1.3.0-master-r70-waluty-karta4-png-master-restore','1.3.0-master-r73-waluty-karta4-final-freeze-candidate');
  out=out.replaceAll('R70 WALUTY KARTA 4 PNG MASTER RESTORE','R73 WALUTY KARTA 4 FINAL FREEZE CANDIDATE');
  out=out.replace("const BUILD_TIME = '08:50';","const BUILD_TIME = '14:05';");
  out=out.replace("navigator.serviceWorker.register('./sw.js?v=R70-waluty-karta4-png-master-restore-0850'","navigator.serviceWorker.register('./sw.js?v=R73-waluty-karta4-final-freeze-1405'");

  out=out.replace(
    "img.src=card===3?'master-waluty-karta3-r64-clean.webp?v=R66-final-1628':`master-waluty-karta${card}.png?v=R43-LIVE-HARD-FIX`;",
    "img.src=card===3?'master-waluty-karta3-r64-clean.webp?v=R66-final-1628':card===4?'master-waluty-karta4-r73-runtime-clean.webp?v=R73-final-freeze':`master-waluty-karta${card}.png?v=R43-LIVE-HARD-FIX`;"
  );

  const k4=String.raw`  function renderCurrency4(){const {page,root}=wmBase(4);
    wmHot(root,[30,25,145,155],()=>currencyGo(3),'Powrót');
    const liveBtn=wmHot(root,[660,25,170,165],()=>currencyRefresh(true),'LIVE — synchronizuj kursy');
    liveBtn.classList.add('r73-k4-live-hot');

    if(!localStorage.getItem('crm13_k4_r70_master_init')){
      currencyState.buyPrice=1240;currencyState.buyCurrency='PLN';
      currencyState.salePrice=2100;currencyState.saleCurrency='USD';
      currencyState.transport=110;currencyState.transportCurrency='CZK';
      currencyState.spreadPct=1.2;currencyState.profitCurrency='PLN';
      curPersist();localStorage.setItem('crm13_k4_r70_master_init','1');
    }
    if(!currencyState.profitCurrency)currencyState.profitCurrency='PLN';

    const v=curProfit(),good=v.profit>=0,outCur=currencyState.profitCurrency;
    const outCost=curConvert(v.cost,'PLN',outCur),outProfit=curConvert(v.profit,'PLN',outCur);

    const arrows=document.createElement('img');
    arrows.src='waluty-k4-r72-live-arrows.png?v=R73-final-freeze';
    arrows.alt='';arrows.className='r73-k4-live-arrows'+(currencyState.loading?' r73-syncing':'');
    root.append(arrows);

    const margin=Math.max(-20,Math.min(20,Number(v.margin)||0));
    const ratio=(margin+20)/40;
    const needle=document.createElement('div');needle.className='r73-k4-needle';
    needle.style.transform='rotate('+(-160+ratio*140)+'deg)';root.append(needle);

    const buy=wmEdit(root,[399,390,214,77],currencyState.buyPrice,n=>currencyState.buyPrice=n,'r73-k4-edit r73-k4-input');
    wmSelect(root,[625,388,143,80],currencyState.buyCurrency,c=>currencyState.buyCurrency=c);
    wmDyn(root,[642,399,76,58],currencyState.buyCurrency,'gold r73-k4-code');
    wmSelect(root,[390,493,378,78],currencyState.buyCurrency,c=>currencyState.buyCurrency=c);
    wmDyn(root,[405,503,306,58],CURRENCY_FLAGS[currencyState.buyCurrency]+' '+currencyState.buyCurrency+' — '+CURRENCY_NAMES[currencyState.buyCurrency],'gold r73-k4-buycurrency');

    const sale=wmEdit(root,[399,597,214,78],currencyState.salePrice,n=>currencyState.salePrice=n,'r73-k4-edit r73-k4-input');
    wmSelect(root,[625,597,143,80],currencyState.saleCurrency,c=>currencyState.saleCurrency=c);
    wmDyn(root,[642,608,76,58],currencyState.saleCurrency,'gold r73-k4-code');

    const transport=wmEdit(root,[399,703,214,78],currencyState.transport,n=>currencyState.transport=n,'r73-k4-edit r73-k4-input');
    wmSelect(root,[625,703,143,80],currencyState.transportCurrency,c=>currencyState.transportCurrency=c);
    wmDyn(root,[642,714,76,58],currencyState.transportCurrency,'gold r73-k4-code');

    const spread=wmEdit(root,[399,809,214,78],currencyState.spreadPct,n=>currencyState.spreadPct=n,'r73-k4-edit r73-k4-input');
    wmHot(root,[625,809,143,80],()=>{spread.focus();spread.select();toast('SPREAD / PROWIZJA — wpisz wartość w %')},'Spread / prowizja');

    wmSelect(root,[625,941,143,79],outCur,c=>{currencyState.profitCurrency=c;render()});
    wmDyn(root,[642,952,76,58],outCur,'gold r73-k4-code');
    wmSelect(root,[625,1044,143,79],outCur,c=>{currencyState.profitCurrency=c;render()});
    wmDyn(root,[642,1055,76,58],outCur,'gold r73-k4-code');

    wmDyn(root,[430,947,195,65],curFmt(outCost,2),'gold r73-k4-cost');
    wmDyn(root,[430,1050,195,65],curFmt(outProfit,2),good?'green r73-k4-profit':'red r73-k4-profit');
    const marginText=curFmt(v.margin,2)+'%';
    const marginEl=wmDyn(root,[78,1268,306,86],marginText,good?'green r73-k4-margin':'red r73-k4-margin');
    if(marginText.length>9)marginEl.classList.add('r73-long');
    wmDyn(root,[72,1408,320,78],good?'OPŁACALNE':'NIEOPŁACALNE',good?'green r73-k4-status':'red r73-k4-status');

    const calcBtn=wmHot(root,[53,1534,746,128],()=>{
      [buy,sale,transport,spread].forEach(i=>i.blur());curPersist();
      calcBtn.classList.remove('r73-k4-calculated');void calcBtn.offsetWidth;calcBtn.classList.add('r73-k4-calculated');
      setTimeout(()=>{calcBtn.classList.remove('r73-k4-calculated');render();toast('✓ OPŁACALNOŚĆ PRZELICZONA')},520);
    },'Przelicz opłacalność');
    calcBtn.classList.add('r73-k4-calc');
    wmBottom(root,4);return page}
  function renderCurrency(){`;

  out=out.replace(/  function renderCurrency4\(\)\{[\s\S]*?\n  function renderCurrency\(\)\{/,k4);

  const css=String.raw`<style id="r73-waluty-karta4-final-freeze">
@keyframes r73LiveSpin{to{transform:rotate(360deg)}}
.wm-page[data-card="4"]{position:relative!important;width:100%!important;min-height:100dvh!important;overflow:visible!important;background:#000!important;display:flex!important;align-items:flex-start!important;justify-content:flex-start!important}
.wm-page[data-card="4"] .wm-canvas{position:relative!important;width:min(98vw,calc((100dvh - 12px) * 852 / 1846),852px)!important;max-width:852px!important;margin:6px auto!important;overflow:hidden!important;background:#000!important}
.wm-page[data-card="4"] .wm-master{width:100%!important;height:auto!important;display:block!important;object-fit:fill!important}
.wm-page[data-card="4"] .wm-edit,.wm-page[data-card="4"] .wm-dyn{z-index:24!important;background:transparent!important;border:0!important;box-shadow:none!important;border-radius:0!important;font-family:"Arial Narrow","Roboto Condensed",Arial,sans-serif!important;font-variant-numeric:tabular-nums!important;overflow:hidden!important;white-space:nowrap!important}
.wm-page[data-card="4"] .wm-edit{padding:0!important;text-align:left!important;color:#fff!important;font-weight:900!important;font-size:clamp(20px,5.25vw,41px)!important;line-height:1!important}
.wm-page[data-card="4"] .wm-edit:focus{outline:0!important;box-shadow:none!important}
.wm-page[data-card="4"] .r73-k4-code{justify-content:flex-start!important;color:#ffd34c!important;font-size:clamp(16px,4.15vw,32px)!important;font-weight:900!important;line-height:1!important}
.wm-page[data-card="4"] .r73-k4-buycurrency{justify-content:flex-start!important;color:#ffd34c!important;font-size:clamp(11px,2.82vw,23px)!important;font-weight:850!important;line-height:1!important}
.wm-page[data-card="4"] .r73-k4-cost,.wm-page[data-card="4"] .r73-k4-profit{justify-content:flex-end!important;text-align:right!important;padding-right:2px!important;font-size:clamp(17px,4.15vw,34px)!important;font-weight:950!important;line-height:1!important}
.wm-page[data-card="4"] .r73-k4-margin{justify-content:center!important;text-align:center!important;font-size:clamp(24px,6.4vw,52px)!important;font-weight:950!important;line-height:1!important}
.wm-page[data-card="4"] .r73-k4-margin.r73-long{font-size:clamp(18px,5.0vw,40px)!important}
.wm-page[data-card="4"] .r73-k4-status{justify-content:center!important;text-align:center!important;font-size:clamp(16px,4.05vw,32px)!important;font-weight:950!important;line-height:1!important}
.wm-page[data-card="4"] .green{color:#76ff00!important;text-shadow:0 0 10px rgba(118,255,0,.42)!important}.wm-page[data-card="4"] .red{color:#ff4239!important;text-shadow:0 0 9px rgba(255,42,30,.35)!important}.wm-page[data-card="4"] .gold{color:#ffd34c!important}
.wm-page[data-card="4"] .wm-hot{z-index:36!important;background:transparent!important;box-shadow:none!important;touch-action:manipulation!important}.wm-page[data-card="4"] .wm-select{z-index:38!important}
.wm-page[data-card="4"] .wm-live-ring,.wm-page[data-card="4"] .wm-live-spinner,.wm-page[data-card="4"] .wm-profit-recalc{display:none!important;visibility:hidden!important;opacity:0!important;animation:none!important;border:0!important;background:transparent!important;box-shadow:none!important}
.wm-page[data-card="4"] .wm-hot::before,.wm-page[data-card="4"] .wm-hot::after{content:none!important;display:none!important}
.wm-page[data-card="4"] .r73-k4-live-arrows{position:absolute!important;z-index:22!important;left:83.10%!important;top:3.20%!important;width:9.39%!important;height:auto!important;aspect-ratio:1/1!important;object-fit:contain!important;pointer-events:none!important;transform-origin:50% 50%!important}
.wm-page[data-card="4"] .r73-k4-live-arrows.r73-syncing{animation:r73LiveSpin .82s linear infinite!important}
.wm-page[data-card="4"] .r73-k4-needle{position:absolute!important;z-index:23!important;left:71.13%!important;top:79.04%!important;width:14.2%!important;height:.42%!important;transform-origin:0 50%!important;pointer-events:none!important;border-radius:999px!important;background:linear-gradient(90deg,transparent 0 18%,#5d5d5d 20%,#eee9dc 58%,#fff9e9 100%)!important;filter:drop-shadow(0 0 2px rgba(255,255,255,.38))!important}
.wm-page[data-card="4"] .r73-k4-calc{border:0!important;border-radius:999px!important}.wm-page[data-card="4"] .r73-k4-calc.wm-pressed,.wm-page[data-card="4"] .r73-k4-calc.r73-k4-calculated{background:rgba(118,255,0,.01)!important;box-shadow:0 0 16px 4px rgba(118,255,0,.56),inset 0 0 9px rgba(118,255,0,.10)!important;transform:scale(.998)!important}
</style>`;
  out=out.replace('</head>',css+'\n</head>');
  return out;
};
