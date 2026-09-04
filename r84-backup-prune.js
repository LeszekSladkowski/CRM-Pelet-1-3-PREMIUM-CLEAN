/* R84 — CHIRURGICZNY PORZĄDEK MAGAZYNU BACKUPÓW
   Cel: maksymalnie 3 widoczne pozycje w aplikacji:
   1) R38 MEGA STABLE z backup-catalog.json
   2) najnowszy lokalny backup danych
   3) drugi najnowszy lokalny/importowany backup danych
   Historia kodu pozostaje w GitHubie, a pełny stan R83 jest dodatkowo zabezpieczony na osobnej gałęzi backupowej.
*/
(()=>{
  'use strict';
  const KEEP_LOCAL = 2;
  const CLEAN_MARK = 'crm13_r84_backup_prune_done_v1';

  async function pruneBackups(){
    try{
      if(typeof r20DbAll!=='function' || typeof r20DbDelete!=='function') return false;
      const all = await r20DbAll();
      const local = (all||[])
        .filter(x=>x && (x.source==='local' || x.source==='import'))
        .sort((a,b)=>(Number(b.createdAt)||0)-(Number(a.createdAt)||0));
      const stale = local.slice(KEEP_LOCAL);
      for(const rec of stale){
        if(rec && rec.id!=null) await r20DbDelete(rec.id);
      }
      localStorage.setItem(CLEAN_MARK, String(Date.now()));
      return true;
    }catch(e){
      console.warn('R84 backup prune', e);
      return false;
    }
  }

  async function run(){
    const ok = await pruneBackups();
    if(ok && typeof r20RenderBackupList==='function' && document.getElementById('r20-backup-list')){
      try{ await r20RenderBackupList(document); }catch{}
    }
  }

  // Jednorazowe sprzątanie po starcie nowej wersji.
  setTimeout(run, 500);

  // Każdy kolejny backup również utrzymuje limit 2 kopii lokalnych.
  setTimeout(()=>{
    try{
      if(typeof r20CreateSnapshot==='function' && !r20CreateSnapshot.__r84Wrapped){
        const original = r20CreateSnapshot;
        const wrapped = async function(...args){
          const rec = await original.apply(this,args);
          await pruneBackups();
          return rec;
        };
        wrapped.__r84Wrapped = true;
        r20CreateSnapshot = wrapped;
      }
    }catch(e){console.warn('R84 snapshot wrap',e);}
  },700);

  document.documentElement.dataset.r84BackupPrune='active';
})();
