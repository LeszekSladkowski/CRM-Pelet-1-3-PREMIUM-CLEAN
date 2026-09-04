/* R82 — RYNKI EU MASTER IMAGE CACHE BRIDGE.
   R81 otwiera juz poprawne pelne karty, ale R80 dodawal do JPG parametr ?v=R80-1158.
   Service Worker cache ma zamrozone pliki pod kluczami bez query string, wiec na telefonie
   obraz MASTER nie byl odnajdywany i zostawaly tylko dynamiczne nakladki na czarnym tle.
   R82 wymusza dokladnie cache'owane, queryless sciezki 4 grafik MASTER. */
(()=>{
'use strict';
const SRC={
  data:'./r79-dane-firmy-master.jpg',
  offer:'./r79-ceny-oferta-master.jpg',
  notes:'./r79-notatki-master.jpg',
  status:'./r79-akcje-status-master.jpg'
};
function detect(img){
  const a=(img?.alt||'').toLowerCase();
  if(a.includes('offer'))return 'offer';
  if(a.includes('notes'))return 'notes';
  if(a.includes('status'))return 'status';
  return 'data';
}
function heal(root){
  if(!root||!root.classList?.contains('r80-card'))return;
  const img=root.querySelector('.r80-master');
  if(!img)return;
  const view=detect(img),src=SRC[view];
  if(img.getAttribute('src')!==src){
    img.removeAttribute('style');
    img.src=src;
  }
  img.style.display='block';
  img.style.visibility='visible';
  root.dataset.r82MasterImage=view;
}
const app=document.getElementById('app');
if(app){
  const run=()=>heal(app.querySelector('.r80-card'));
  new MutationObserver(run).observe(app,{childList:true,subtree:true});
  run();
}
document.documentElement.dataset.r82ImageBridge='active';
})();