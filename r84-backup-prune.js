/* R85 — TWARDY CHIRURGICZNY PORZADEK MAGAZYNU BACKUPOW
   Niezalezny od funkcji aplikacji. Bezposrednio porzadkuje IndexedDB.
   Widoczne maja zostac: R38 z katalogu + maksymalnie 2 najnowsze lokalne kopie.
*/
(()=>{
  'use strict';
  const DB='crm_pelet_13_backups_v1';
  const STORE='backups';
  const KEEP=2;

  function openDb(){
    return new Promise((resolve,reject)=>{
      const q=indexedDB.open(DB,1);
      q.onupgradeneeded=()=>{const db=q.result;if(!db.objectStoreNames.contains(STORE))db.createObjectStore(STORE,{keyPath:'id',autoIncrement:true});};
      q.onsuccess=()=>resolve(q.result);
      q.onerror=()=>reject(q.error);
    });
  }

  async function hardPrune(){
    const db=await openDb();
    const all=await new Promise((resolve,reject)=>{
      const tx=db.transaction(STORE,'readonly');
      const q=tx.objectStore(STORE).getAll();
      q.onsuccess=()=>resolve(q.result||[]);
      q.onerror=()=>reject(q.error);
    });
    const sorted=[...all].sort((a,b)=>(Number(b?.createdAt)||0)-(Number(a?.createdAt)||0));
    const keepIds=new Set(sorted.slice(0,KEEP).map(x=>String(x.id)));
    const stale=sorted.filter(x=>!keepIds.has(String(x.id)));
    if(stale.length){
      await new Promise((resolve,reject)=>{
        const tx=db.transaction(STORE,'readwrite');
        const os=tx.objectStore(STORE);
        stale.forEach(x=>os.delete(x.id));
        tx.oncomplete=()=>resolve();
        tx.onerror=()=>reject(tx.error);
        tx.onabort=()=>reject(tx.error);
      });
    }
    db.close();
    localStorage.setItem('crm13_r85_hard_backup_prune',String(Date.now()));
    return stale.length;
  }

  async function run(){
    try{
      const removed=await hardPrune();
      if(removed>0){
        const badge=document.getElementById('r20-backup-count');
        if(badge) badge.textContent='Ilość wersji: 3';
        if(location.hash.includes('settings') || document.getElementById('r20-backup-list')) setTimeout(()=>location.reload(),250);
      }
    }catch(e){console.warn('R85 hard backup prune',e);}
  }

  setTimeout(run,250);
  document.documentElement.dataset.r85BackupPrune='active';
})();
