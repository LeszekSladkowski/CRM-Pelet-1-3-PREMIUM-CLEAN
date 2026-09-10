/* R130 v1.0F — AKCJE I STATUS — REFERENCE GEOMETRY RESTORE
   Cel: przywrócić geometrię 1:1 zatwierdzonego wzorca Samsung Galaxy S24 Ultra.
   Usunięto wyłącznie późniejsze ręczne przesunięcia warstwy LIVE z R130 v1.0D,
   które rozjeżdżały układ względem rastra MASTER.
   Silnik R130 v1.0A, dane, statusy, alerty, zadania, localStorage i hotspoty pozostają nietknięte.
*/
(function(){
  'use strict';
  const MARK='r130V10fReferenceGeometryRestore';

  function apply(section){
    if(!section)return;

    /*
      MASTER ma dokładnie 852 x 1846 = proporcja 6:13.
      R130 ma dostać pełną szerokość viewportu na urządzeniu referencyjnym,
      bez globalnego zwężenia .screen o 8 px i bez dodatkowych transformacji.
    */
    section.dataset[MARK]='1';
    section.style.setProperty('position','relative','important');
    section.style.setProperty('width','min(100vw, 852px)','important');
    section.style.setProperty('max-width','none','important');
    section.style.setProperty('height','auto','important');
    section.style.setProperty('aspect-ratio','852 / 1846','important');
    section.style.setProperty('margin','0 auto','important');
    section.style.setProperty('transform','none','important');
    section.style.setProperty('transform-origin','top center','important');
    section.style.setProperty('container-type','inline-size');
    section.style.setProperty('overflow','hidden');

    const img=section.querySelector('img.master');
    if(img){
      img.style.setProperty('position','absolute','important');
      img.style.setProperty('inset','0','important');
      img.style.setProperty('width','100%','important');
      img.style.setProperty('height','100%','important');
      img.style.setProperty('object-fit','fill','important');
      img.style.setProperty('transform','none','important');
    }

    /*
      WAŻNE: żadnego przepisywania left/top/width/height/font-size elementów LIVE.
      Współrzędne z r130-akcje-status-live.js są bazą referencyjną 852 x 1846.
    */
  }

  function scan(){document.querySelectorAll('.r130-actions-live').forEach(apply);}
  let queued=false;
  function schedule(){
    if(queued)return;
    queued=true;
    requestAnimationFrame(()=>{queued=false;scan();});
  }

  const mo=new MutationObserver(schedule);
  const start=()=>{
    mo.observe(document.documentElement,{childList:true,subtree:true});
    scan();
    setTimeout(scan,80);
    setTimeout(scan,260);
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();

  window.R130_LAYOUT_FIX={version:'R130-v1.0F-reference-geometry-restore',apply:scan};
})();
