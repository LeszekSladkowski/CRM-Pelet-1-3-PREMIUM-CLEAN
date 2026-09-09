/* R126 — OFERTA: MASTER GRAPHIC RESTORE + LIVE PREVIEW FIX
   Baza: dokładny runtime R124/R125 pozostaje bez zmian.
   Jedyna naprawa: komplet źródła grafiki oferty 8/8 + podgląd/generowanie PNG na prawdziwym MASTER 1.2.
   R120 DANE FIRMY, R121 CENY, R122 HISTORIA i pozostałe MASTER-y pozostają nietknięte.
*/
importScripts('./sw-r125-base.js?v=R126-offer-master-restore');

if(Array.isArray(ASSETS)){
  [
    './r125-offer-master-q8/part-01.b64',
    './r125-offer-master-q8/part-02.b64',
    './r125-offer-master-q8/part-03.b64',
    './r125-offer-master-q8/part-04.b64',
    './r125-offer-master-q8/part-05.b64',
    './r125-offer-master-q8/part-06.b64',
    './r125-offer-master-q8/part-07.b64',
    './r125-offer-master-q8/part-08.b64'
  ].forEach(a=>{if(!ASSETS.includes(a))ASSETS.push(a)});
}

const r126BasePatchIndexHtml=r48PatchIndexHtml;
r48PatchIndexHtml=function(text){
  let out=r126BasePatchIndexHtml(text);

  out=out.replaceAll('1.3.0-master-r124-offer-generator-routing','1.3.0-master-r126-offer-master-graphic-restore-live');
  out=out.replaceAll('R124 OFERTY — GENERATOR ROUTING','R126 OFERTA — MASTER GRAPHIC RESTORE LIVE');
  out=out.replace("const BUILD_DATE = '08.09.2026';","const BUILD_DATE = '09.09.2026';");
  out=out.replace("const BUILD_TIME = '22:38';","const BUILD_TIME = '09:35';");
  out=out.replace(/sw\.js\?v=R124-offer-generator-routing-2238/g,'sw.js?v=R126-offer-master-restore-0935');
  out=out.replace(/r84-backup-prune\.js\?v=R124-2238/g,'r84-backup-prune.js?v=R126-0935');

  out=out.replace("paleta:s.paleta||'2350',worek:s.worek||'35',bigbag:s.bigbag||'2220'","paleta:s.paleta||'2100',worek:s.worek||'25',bigbag:s.bigbag||'1900'");

  if(!out.includes('r126-offer-master-live-fix-inside-iife')){
    const r126Inside=`
  /* r126-offer-master-live-fix-inside-iife */
  const R126_MASTER_PARTS=Array.from({length:8},function(_,i){return './r125-offer-master-q8/part-'+String(i+1).padStart(2,'0')+'.b64';});
  let R126_MASTER_URL='';
  let R126_MASTER_PROMISE=null;

  function r126MasterUrl(){
    if(R126_MASTER_URL)return Promise.resolve(R126_MASTER_URL);
    if(R126_MASTER_PROMISE)return R126_MASTER_PROMISE;
    R126_MASTER_PROMISE=Promise.all(R126_MASTER_PARTS.map(async function(u,i){
      const r=await fetch(u+'?v=R126',{cache:'force-cache'});
      if(!r.ok)throw new Error('MASTER part '+(i+1)+' HTTP '+r.status);
      let t=(await r.text()).replace(/[^A-Za-z0-9+/=]/g,'');
      if(i<7)t=t.slice(0,20000);
      return t;
    })).then(function(parts){
      const bin=atob(parts.join(''));
      const bytes=new Uint8Array(bin.length);
      for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);
      R126_MASTER_URL=URL.createObjectURL(new Blob([bytes],{type:'image/webp'}));
      return R126_MASTER_URL;
    }).catch(function(e){R126_MASTER_PROMISE=null;throw e;});
    return R126_MASTER_PROMISE;
  }

  function r126DrawCenteredText(ctx,text,x,y,w,h,font,fill,shadow){
    ctx.save();
    ctx.fillStyle=fill||'#fff';
    ctx.font=font;
    ctx.textAlign='center';
    ctx.textBaseline='middle';
    if(shadow!==false){ctx.shadowColor='rgba(0,0,0,.95)';ctx.shadowBlur=7;}
    ctx.fillText(String(text),x+w/2,y+h/2,w-8);
    ctx.restore();
  }

  r123Canvas=async function(){
    const c=document.getElementById('r123_canvas');if(!c)return;
    const ctx=c.getContext('2d');
    c.width=1024;c.height=1536;
    try{
      const src=await r126MasterUrl();
      const img=new Image();
      await new Promise(function(resolve,reject){img.onload=resolve;img.onerror=reject;img.src=src;});
      ctx.clearRect(0,0,1024,1536);
      ctx.drawImage(img,0,0,1024,1536);

      const pal=(document.getElementById('r123_g_paleta')&&document.getElementById('r123_g_paleta').value)||'2100';
      const worek=(document.getElementById('r123_g_worek')&&document.getElementById('r123_g_worek').value)||'25';
      const big=(document.getElementById('r123_g_bigbag')&&document.getElementById('r123_g_bigbag').value)||'1900';
      const from=r123Date((document.getElementById('r123_g_from')&&document.getElementById('r123_g_from').value)||'');
      const to=r123Date((document.getElementById('r123_g_to')&&document.getElementById('r123_g_to').value)||'');

      ctx.fillStyle='rgba(2,8,3,.985)';
      ctx.fillRect(32,359,258,62);
      ctx.fillRect(343,359,218,62);
      ctx.fillRect(588,359,255,62);
      r126DrawCenteredText(ctx,pal+' zł netto',32,359,258,62,'900 43px Arial','#f0ad24',true);
      r126DrawCenteredText(ctx,worek+' zł netto',343,359,218,62,'900 43px Arial','#f0ad24',true);
      r126DrawCenteredText(ctx,big+' zł netto',588,359,255,62,'900 43px Arial','#f0ad24',true);

      if(from&&to){
        ctx.fillStyle='rgba(244,169,20,.99)';
        ctx.fillRect(115,1317,357,39);
        r126DrawCenteredText(ctx,from+' – '+to,115,1317,357,39,'900 29px Arial','#101010',false);
      }

      const L=R123_LANGS[R123_ACTIVE_LANG]||R123_LANGS.pl;
      const lang=document.getElementById('r123_live_lang');if(lang)lang.textContent=L.flag+' '+L.code;
      const st=document.getElementById('r123_g_status');if(st)st.textContent='✓ R126 MASTER LIVE — pełna grafika 1.2 załadowana';
    }catch(e){
      console.warn('R126 MASTER fallback',e);
      ctx.clearRect(0,0,1024,1536);
      ctx.fillStyle='#020702';ctx.fillRect(0,0,1024,1536);
      ctx.fillStyle='#f0aa21';ctx.font='900 52px Arial';ctx.textAlign='center';
      ctx.fillText('L&M TECHNIC ENERGY — OFERTA',512,180);
      const st=document.getElementById('r123_g_status');if(st)st.textContent='⚠ MASTER chwilowo niedostępny — użyj SYNCHRONIZUJ i otwórz generator ponownie';
    }
  };

  r123CanvasFile=async function(){
    await r123Canvas();
    return new Promise(function(resolve,reject){
      const c=document.getElementById('r123_canvas');
      c.toBlob(function(b){
        if(b)resolve(new File([b],'LM_Oferta_'+R123_ACTIVE_LANG+'_'+Date.now()+'.png',{type:'image/png'}));
        else reject(new Error('blob'));
      },'image/png',.95);
    });
  };
`;
    out=out.replace('  function r115RenderCompanyMaster(){',r126Inside+'\n  function r115RenderCompanyMaster(){');
  }
  return out;
};
