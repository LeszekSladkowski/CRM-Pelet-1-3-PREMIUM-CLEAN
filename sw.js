/* R74 — WALUTY KARTA 4 FINAL SURGICAL CANDIDATE.
   BAZA: stabilny R70. KARTY 1, 2, 3 FINAL MASTER — bez zmian.
   KARTA 4: czysty runtime z zatwierdzonego MASTER-a, bez masek/canvasa.
   LIVE: dokładnie dwie zielone strzałki MASTER. OPŁACALNOŚĆ: jedna dynamiczna wskazówka. */
importScripts('./sw-r70-stable.js?v=R70-stable-0850');

const R74_K4_ASSETS=[
  './master-waluty-karta4-r74-runtime-clean.png',
  './waluty-k4-r72-live-arrows.png'
];
if(Array.isArray(ASSETS))R74_K4_ASSETS.forEach(a=>{if(!ASSETS.includes(a))ASSETS.push(a)});

const r74BasePatchIndexHtml=r48PatchIndexHtml;
r48PatchIndexHtml=function(text){
  let out=r74BasePatchIndexHtml(text);

  out=out.replaceAll('1.3.0-master-r70-waluty-karta4-png-master-restore','1.3.0-master-r74-waluty-karta4-final-surgical');
  out=out.replaceAll('R70 WALUTY KARTA 4 PNG MASTER RESTORE','R74 WALUTY KARTA 4 FINAL SURGICAL');
  out=out.replace("const BUILD_TIME = '08:50';","const BUILD_TIME = '16:13';");
  out=out.replace("navigator.serviceWorker.register('./sw.js?v=R70-waluty-karta4-png-master-restore-0850'","navigator.serviceWorker.register('./sw.js?v=R74-waluty-karta4-final-surgical-1613'");

  const k4=String.raw`  function renderCurrency4(){const {page,root}=wmBase(4);
    wmHot(root,[30,25,145,155],()=>currencyGo(3),'Powrót');
    const liveBtn=wmHot(root,[660,25,170,165],()=>currencyRefresh(true),'LIVE — synchronizuj kursy');
    liveBtn.classList.add('r74-k4-live-hot');

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

    const masterImg=root.querySelector('.wm-master');
    if(masterImg)masterImg.src='master-waluty-karta4-r74-runtime-clean.png?v=R74-final-1613';

    const arrows=document.createElement('img');
    arrows.className='r74-k4-live-arrows'+(currencyState.loading?' is-spinning':'');
    arrows.src='waluty-k4-r72-live-arrows.png?v=R74-final-1613';
    arrows.alt='';arrows.setAttribute('aria-hidden','true');root.appendChild(arrows);

    const cx=592,cy=1440,marg=Math.max(-20,Math.min(20,Number(v.margin)||0));
    const ratio=(marg+20)/40,deg=192.6+(ratio*154.8);
    const needle=document.createElement('div');
    needle.className='r74-k4-needle';
    needle.style.left=(cx/852*100)+'%';
    needle.style.top=(cy/1846*100)+'%';
    needle.style.width=(137/852*100)+'%';
    needle.style.transform='translateY(-50%) rotate('+deg+'deg)';
    needle.setAttribute('aria-hidden','true');
    root.appendChild(needle);

    const buy=wmEdit(root,[399,390,214,77],currencyState.buyPrice,n=>currencyState.buyPrice=n,'r74-k4-edit r74-k4-input');
    wmSelect(root,[625,388,143,80],currencyState.buyCurrency,c=>currencyState.buyCurrency=c);
    wmDyn(root,[642,399,96,58],currencyState.buyCurrency,'gold r74-k4-code');
    wmSelect(root,[390,493,378,78],currencyState.buyCurrency,c=>currencyState.buyCurrency=c);
    wmDyn(root,[405,503,330,58],CURRENCY_FLAGS[currencyState.buyCurrency]+' '+currencyState.buyCurrency+' — '+CURRENCY_NAMES[currencyState.buyCurrency],'gold r74-k4-buycurrency');

    const sale=wmEdit(root,[399,597,214,78],currencyState.salePrice,n=>currencyState.salePrice=n,'r74-k4-edit r74-k4-input');
    wmSelect(root,[625,597,143,80],currencyState.saleCurrency,c=>currencyState.saleCurrency=c);
    wmDyn(root,[642,608,96,58],currencyState.saleCurrency,'gold r74-k4-code');

    const transport=wmEdit(root,[399,703,214,78],currencyState.transport,n=>currencyState.transport=n,'r74-k4-edit r74-k4-input');
    wmSelect(root,[625,703,143,80],currencyState.transportCurrency,c=>currencyState.transportCurrency=c);
    wmDyn(root,[642,714,96,58],currencyState.transportCurrency,'gold r74-k4-code');

    const spread=wmEdit(root,[399,809,214,78],currencyState.spreadPct,n=>currencyState.spreadPct=n,'r74-k4-edit r74-k4-input');
    wmHot(root,[625,809,143,80],()=>{spread.focus();spread.select();toast('SPREAD / PROWIZJA — wpisz wartość w %')},'Spread / prowizja');

    wmSelect(root,[625,941,143,79],outCur,c=>{currencyState.profitCurrency=c;render()});
    wmDyn(root,[642,952,96,58],outCur,'gold r74-k4-code');
    wmSelect(root,[625,1044,143,79],outCur,c=>{currencyState.profitCurrency=c;render()});
    wmDyn(root,[642,1055,96,58],outCur,'gold r74-k4-code');

    wmDyn(root,[418,944,217,70],curFmt(outCost,2),'gold r74-k4-cost');
    wmDyn(root,[418,1047,217,70],curFmt(outProfit,2),good?'green r74-k4-profit':'red r74-k4-profit');
    wmDyn(root,[74,1260,320,92],curFmt(v.margin,2)+'%',good?'green r74-k4-margin':'red r74-k4-margin');
    wmDyn(root,[74,1408,320,78],good?'OPŁACALNE':'NIEOPŁACALNE',good?'green r74-k4-status':'red r74-k4-status');

    const calcBtn=wmHot(root,[53,1534,746,128],()=>{
      [buy,sale,transport,spread].forEach(i=>i.blur());curPersist();
      calcBtn.classList.remove('r74-k4-calculated');void calcBtn.offsetWidth;calcBtn.classList.add('r74-k4-calculated');
      setTimeout(()=>{calcBtn.classList.remove('r74-k4-calculated');render();toast('✓ OPŁACALNOŚĆ PRZELICZONA')},520);
    },'Przelicz opłacalność');
    calcBtn.classList.add('r74-k4-calc');
    wmBottom(root,4);return page}
  function renderCurrency(){`;

  out=out.replace(/  function renderCurrency4\(\)\{[\s\S]*?\n  function renderCurrency\(\)\{/,k4);

  const r74Style=String.raw`<style id="r74-waluty-karta4-final-surgical">
@keyframes r74LiveSpin{to{transform:rotate(360deg)}}
.wm-page[data-card="4"]{position:relative!important;width:100%!important;min-height:100dvh!important;overflow:visible!important;background:#000!important;display:flex!important;align-items:flex-start!important;justify-content:flex-start!important}
.wm-page[data-card="4"] .wm-canvas{position:relative!important;width:min(98vw,calc((100dvh - 12px) * 852 / 1846),852px)!important;max-width:852px!important;margin:6px auto!important;overflow:hidden!important;background:#000!important}
.wm-page[data-card="4"] .wm-master{width:100%!important;height:auto!important;display:block!important;object-fit:fill!important}
.wm-page[data-card="4"] .wm-edit,.wm-page[data-card="4"] .wm-dyn{z-index:24!important;background:transparent!important;border:0!important;box-shadow:none!important;border-radius:0!important;font-family:"Arial Narrow","Roboto Condensed",Arial,sans-serif!important;font-variant-numeric:tabular-nums!important;white-space:nowrap!important;overflow:visible!important}
.wm-page[data-card="4"] .wm-edit{padding:0!important;text-align:left!important;color:#fff!important;font-weight:900!important;font-size:clamp(20px,5.5vw,43px)!important;line-height:1!important}
.wm-page[data-card="4"] .wm-edit:focus{outline:0!important;box-shadow:none!important}
.wm-page[data-card="4"] .r74-k4-code{justify-content:flex-start!important;color:#ffd34c!important;font-size:clamp(16px,4.15vw,32px)!important;font-weight:900!important;line-height:1!important}
.wm-page[data-card="4"] .r74-k4-buycurrency{justify-content:flex-start!important;color:#ffd34c!important;font-size:clamp(11px,2.85vw,23px)!important;font-weight:850!important;line-height:1!important}
.wm-page[data-card="4"] .r74-k4-cost,.wm-page[data-card="4"] .r74-k4-profit{justify-content:center!important;text-align:center!important;font-size:clamp(17px,4.45vw,35px)!important;font-weight:950!important;line-height:1!important}
.wm-page[data-card="4"] .r74-k4-margin{justify-content:center!important;text-align:center!important;font-size:clamp(22px,6.0vw,48px)!important;font-weight:950!important;line-height:1!important}
.wm-page[data-card="4"] .r74-k4-status{justify-content:center!important;text-align:center!important;font-size:clamp(14px,3.75vw,29px)!important;font-weight:950!important;line-height:1!important}
.wm-page[data-card="4"] .green{color:#76ff00!important;text-shadow:0 0 10px rgba(118,255,0,.42)!important}
.wm-page[data-card="4"] .red{color:#ff4239!important;text-shadow:0 0 9px rgba(255,42,30,.35)!important}
.wm-page[data-card="4"] .gold{color:#ffd34c!important}
.wm-page[data-card="4"] .wm-hot{z-index:36!important;background:transparent!important;box-shadow:none!important;touch-action:manipulation!important}
.wm-page[data-card="4"] .wm-select{z-index:38!important}
.wm-page[data-card="4"] .wm-live-ring,.wm-page[data-card="4"] .wm-live-spinner,.wm-page[data-card="4"] .wm-profit-recalc{display:none!important;visibility:hidden!important;opacity:0!important;animation:none!important;border:0!important;background:transparent!important;box-shadow:none!important}
.wm-page[data-card="4"] .wm-hot::before,.wm-page[data-card="4"] .wm-hot::after{content:none!important;display:none!important}
.wm-page[data-card="4"] .r74-k4-live-arrows{position:absolute!important;z-index:28!important;left:83.0986%!important;top:3.1961%!important;width:9.3897%!important;height:auto!important;pointer-events:none!important;transform-origin:50% 50%!important;background:transparent!important}
.wm-page[data-card="4"] .r74-k4-live-arrows.is-spinning{animation:r74LiveSpin .82s linear infinite!important}
.wm-page[data-card="4"] .r74-k4-needle{position:absolute!important;z-index:27!important;height:0.42%!important;min-height:4px!important;border-radius:999px!important;transform-origin:0 50%!important;pointer-events:none!important;background:linear-gradient(90deg,#777 0%,#eee9dc 58%,#fff9e9 100%)!important;box-shadow:0 0 0 3px rgba(15,15,15,.88),0 0 5px rgba(255,255,255,.24)!important}
.wm-page[data-card="4"] .r74-k4-calc{border:0!important;border-radius:999px!important}
.wm-page[data-card="4"] .r74-k4-calc.wm-pressed,.wm-page[data-card="4"] .r74-k4-calc.r74-k4-calculated{background:rgba(118,255,0,.012)!important;box-shadow:0 0 17px 4px rgba(118,255,0,.62),inset 0 0 11px rgba(118,255,0,.12)!important;transform:scale(.998)!important}
</style>`;
  out=out.replace('</head>',r74Style+'\n</head>');
  return out;
};
