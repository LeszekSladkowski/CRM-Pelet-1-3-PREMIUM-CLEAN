/* R127 — OFERTA: LANGUAGE LIVE + CLEAN MASTER FINAL CANDIDATE
   Baza: R124 routing + R123 generator + zatwierdzony R126 rich MASTER.
   Dwie chirurgiczne poprawki: faktyczna zmiana języka na grafice LIVE oraz chirurgiczne wyczyszczenie dolnego pasa grafiki.
   R120 DANE FIRMY, R121 CENY, R122 HISTORIA i pozostałe MASTER-y pozostają nietknięte.
*/
importScripts('./sw-r125-base.js?v=R127-offer-language-clean-master');

if(Array.isArray(ASSETS)){
  [
    './r125-offer-master-q8/part-01.b64',
    './r125-offer-master-q8/part-02.b64',
    './r125-offer-master-q8/part-03.b64',
    './r125-offer-master-q8/part-04.b64',
    './r125-offer-master-q8/part-05.b64',
    './r125-offer-master-q8/part-06.b64',
    './r126-offer-master-final/p07a.b64',
    './r126-offer-master-final/p07b.b64',
    './r126-offer-master-final/p07c.b64',
    './r126-offer-master-final/p07d.b64',
    './r125-offer-master-q8/part-08.b64'
  ].forEach(a=>{if(!ASSETS.includes(a))ASSETS.push(a)});
}

const r127BasePatchIndexHtml=r48PatchIndexHtml;
r48PatchIndexHtml=function(text){
  let out=r127BasePatchIndexHtml(text);

  out=out.replaceAll('1.3.0-master-r124-offer-generator-routing','1.3.0-master-r127-offer-language-clean-master');
  out=out.replaceAll('R124 OFERTY — GENERATOR ROUTING','R127 OFERTA — LANGUAGE LIVE + CLEAN MASTER');
  out=out.replace("const BUILD_DATE = '08.09.2026';","const BUILD_DATE = '09.09.2026';");
  out=out.replace("const BUILD_TIME = '22:38';","const BUILD_TIME = '10:30';");
  out=out.replace(/sw\.js\?v=R124-offer-generator-routing-2238/g,'sw.js?v=R127-offer-language-clean-master-1030');
  out=out.replace(/r84-backup-prune\.js\?v=R124-2238/g,'r84-backup-prune.js?v=R127-1030');
  out=out.replace("paleta:s.paleta||'2350',worek:s.worek||'35',bigbag:s.bigbag||'2220'","paleta:s.paleta||'2100',worek:s.worek||'25',bigbag:s.bigbag||'1900'");

  /* AT i CH są językowo niemieckie, ale zachowują własne flagi/kody. */
  out=out.replace("['de','🇦🇹 AT'],['de','🇨🇭 CH']","['at','🇦🇹 AT'],['ch','🇨🇭 CH']");
  out=out.replace("a[0]===R123_ACTIVE_LANG&&i<2","a[0]===R123_ACTIVE_LANG");

  if(!out.includes('r127-offer-language-clean-master-inside-iife')){
    const r127Inside=`
  /* r127-offer-language-clean-master-inside-iife */
  const R127_MASTER_PARTS=[
    ['./r125-offer-master-q8/part-01.b64',20000],
    ['./r125-offer-master-q8/part-02.b64',20000],
    ['./r125-offer-master-q8/part-03.b64',20000],
    ['./r125-offer-master-q8/part-04.b64',20000],
    ['./r125-offer-master-q8/part-05.b64',20000],
    ['./r125-offer-master-q8/part-06.b64',20000],
    ['./r126-offer-master-final/p07a.b64',5000],
    ['./r126-offer-master-final/p07b.b64',5000],
    ['./r126-offer-master-final/p07c.b64',5000],
    ['./r126-offer-master-final/p07d.b64',5000],
    ['./r125-offer-master-q8/part-08.b64',940]
  ];
  let R127_MASTER_URL='';
  let R127_MASTER_PROMISE=null;
  const R127_LANGS={
    pl:{code:'PL',flag:'🇵🇱',title1:'SUPER OFERTA',title2:'NA PELET DRZEWNY PREMIUM A1',strap:'NAJLEPSZA JAKOŚĆ  •  SPRAWDZONE ŹRÓDŁO  •  REALNE KORZYŚCI',sale:'SPRZEDAŻ I DYSTRYBUCJA PELETU DRZEWNEGO',clean:'CZYSTA ENERGIA  •  LEPSZA PRZYSZŁOŚĆ',palette:'PALETA',bags:'WORKI',big:'BIG BAG',perPalette:'/ PALETA',perBag:'/ WOREK 15 KG',perBig:'/ 1 000 KG',quality:'GWARANCJA JAKOŚCI',qualityLines:['100% NATURALNY PRODUKT','BEZ KORY I DODATKÓW CHEMICZNYCH','STABILNA JAKOŚĆ I POWTARZALNE PARAMETRY','CZYSTE SPALANIE • NISKA ZAWARTOŚĆ POPIOŁU','CERTYFIKAT ENplus A1'],delivery:'DOSTAWA — WARUNKI',deliveryLines:['TRANSPORT W CENIE DO 50 KM','POWYŻEJ 50 KM — KOSZT USTALANY INDYWIDUALNIE','TERMIN REALIZACJI: DO 14 DNI'],valid:'OFERTA WAŻNA:',cta:'ZAMÓW JUŻ DZIŚ!',net:'netto'},
    de:{code:'DE',flag:'🇩🇪',title1:'SUPER ANGEBOT',title2:'HOLZPELLETS PREMIUM A1',strap:'BESTE QUALITÄT  •  GEPRÜFTE QUELLE  •  ECHTE VORTEILE',sale:'VERKAUF UND VERTRIEB VON HOLZPELLETS',clean:'SAUBERE ENERGIE  •  BESSERE ZUKUNFT',palette:'PALETTE',bags:'SÄCKE',big:'BIG BAG',perPalette:'/ PALETTE',perBag:'/ SACK 15 KG',perBig:'/ 1 000 KG',quality:'QUALITÄTSGARANTIE',qualityLines:['100% NATÜRLICHES PRODUKT','OHNE RINDE UND CHEMISCHE ZUSÄTZE','STABILE UND WIEDERHOLBARE QUALITÄT','SAUBERE VERBRENNUNG • WENIG ASCHE','ENplus A1 ZERTIFIZIERT'],delivery:'LIEFERUNG — BEDINGUNGEN',deliveryLines:['TRANSPORT BIS 50 KM INKLUSIVE','ÜBER 50 KM — PREIS INDIVIDUELL','LIEFERZEIT: BIS 14 TAGE'],valid:'ANGEBOT GÜLTIG:',cta:'JETZT BESTELLEN!',net:'netto'},
    at:{code:'AT',flag:'🇦🇹',title1:'SUPER ANGEBOT',title2:'HOLZPELLETS PREMIUM A1',strap:'BESTE QUALITÄT  •  GEPRÜFTE QUELLE  •  ECHTE VORTEILE',sale:'VERKAUF UND VERTRIEB VON HOLZPELLETS',clean:'SAUBERE ENERGIE  •  BESSERE ZUKUNFT',palette:'PALETTE',bags:'SÄCKE',big:'BIG BAG',perPalette:'/ PALETTE',perBag:'/ SACK 15 KG',perBig:'/ 1 000 KG',quality:'QUALITÄTSGARANTIE',qualityLines:['100% NATÜRLICHES PRODUKT','OHNE RINDE UND CHEMISCHE ZUSÄTZE','STABILE UND WIEDERHOLBARE QUALITÄT','SAUBERE VERBRENNUNG • WENIG ASCHE','ENplus A1 ZERTIFIZIERT'],delivery:'LIEFERUNG — BEDINGUNGEN',deliveryLines:['TRANSPORT BIS 50 KM INKLUSIVE','ÜBER 50 KM — PREIS INDIVIDUELL','LIEFERZEIT: BIS 14 TAGE'],valid:'ANGEBOT GÜLTIG:',cta:'JETZT BESTELLEN!',net:'netto'},
    ch:{code:'CH',flag:'🇨🇭',title1:'SUPER ANGEBOT',title2:'HOLZPELLETS PREMIUM A1',strap:'BESTE QUALITÄT  •  GEPRÜFTE QUELLE  •  ECHTE VORTEILE',sale:'VERKAUF UND VERTRIEB VON HOLZPELLETS',clean:'SAUBERE ENERGIE  •  BESSERE ZUKUNFT',palette:'PALETTE',bags:'SÄCKE',big:'BIG BAG',perPalette:'/ PALETTE',perBag:'/ SACK 15 KG',perBig:'/ 1 000 KG',quality:'QUALITÄTSGARANTIE',qualityLines:['100% NATÜRLICHES PRODUKT','OHNE RINDE UND CHEMISCHE ZUSÄTZE','STABILE UND WIEDERHOLBARE QUALITÄT','SAUBERE VERBRENNUNG • WENIG ASCHE','ENplus A1 ZERTIFIZIERT'],delivery:'LIEFERUNG — BEDINGUNGEN',deliveryLines:['TRANSPORT BIS 50 KM INKLUSIVE','ÜBER 50 KM — PREIS INDIVIDUELL','LIEFERZEIT: BIS 14 TAGE'],valid:'ANGEBOT GÜLTIG:',cta:'JETZT BESTELLEN!',net:'netto'},
    en:{code:'EN',flag:'🇬🇧',title1:'SUPER OFFER',title2:'PREMIUM A1 WOOD PELLETS',strap:'TOP QUALITY  •  VERIFIED SOURCE  •  REAL BENEFITS',sale:'WOOD PELLET SALES & DISTRIBUTION',clean:'CLEAN ENERGY  •  BETTER FUTURE',palette:'PALLET',bags:'BAGS',big:'BIG BAG',perPalette:'/ PALLET',perBag:'/ 15 KG BAG',perBig:'/ 1,000 KG',quality:'QUALITY GUARANTEE',qualityLines:['100% NATURAL PRODUCT','NO BARK OR CHEMICAL ADDITIVES','STABLE, REPEATABLE PARAMETERS','CLEAN BURNING • LOW ASH','ENplus A1 CERTIFIED'],delivery:'DELIVERY — TERMS',deliveryLines:['TRANSPORT INCLUDED UP TO 50 KM','OVER 50 KM — INDIVIDUAL QUOTE','LEAD TIME: UP TO 14 DAYS'],valid:'OFFER VALID:',cta:'ORDER TODAY!',net:'net'},
    cz:{code:'CZ',flag:'🇨🇿',title1:'SUPER NABÍDKA',title2:'DŘEVĚNÉ PELETY PREMIUM A1',strap:'NEJVYŠŠÍ KVALITA  •  OVĚŘENÝ ZDROJ  •  REÁLNÉ VÝHODY',sale:'PRODEJ A DISTRIBUCE DŘEVĚNÝCH PELET',clean:'ČISTÁ ENERGIE  •  LEPŠÍ BUDOUCNOST',palette:'PALETA',bags:'PYTLE',big:'BIG BAG',perPalette:'/ PALETA',perBag:'/ PYTEL 15 KG',perBig:'/ 1 000 KG',quality:'ZÁRUKA KVALITY',qualityLines:['100% PŘÍRODNÍ PRODUKT','BEZ KŮRY A CHEMICKÝCH PŘÍSAD','STABILNÍ A OPAKOVATELNÁ KVALITA','ČISTÉ SPALOVÁNÍ • NÍZKÝ POPEL','CERTIFIKACE ENplus A1'],delivery:'DOPRAVA — PODMÍNKY',deliveryLines:['DOPRAVA V CENĚ DO 50 KM','NAD 50 KM — INDIVIDUÁLNÍ CENA','DODÁNÍ: DO 14 DNŮ'],valid:'NABÍDKA PLATÍ:',cta:'OBJEDNEJTE DNES!',net:'netto'},
    sk:{code:'SK',flag:'🇸🇰',title1:'SUPER PONUKA',title2:'DREVENÉ PELETY PREMIUM A1',strap:'NAJVYŠŠIA KVALITA  •  OVERENÝ ZDROJ  •  REÁLNE VÝHODY',sale:'PREDAJ A DISTRIBÚCIA DREVENÝCH PELIET',clean:'ČISTÁ ENERGIA  •  LEPŠIA BUDÚCNOSŤ',palette:'PALETA',bags:'VRECIA',big:'BIG BAG',perPalette:'/ PALETA',perBag:'/ VRECE 15 KG',perBig:'/ 1 000 KG',quality:'ZÁRUKA KVALITY',qualityLines:['100% PRÍRODNÝ PRODUKT','BEZ KÔRY A CHEMICKÝCH PRÍSAD','STABILNÁ A OPAKOVATEĽNÁ KVALITA','ČISTÉ SPAĽOVANIE • NÍZKY POPOL','CERTIFIKÁCIA ENplus A1'],delivery:'DOPRAVA — PODMIENKY',deliveryLines:['DOPRAVA V CENE DO 50 KM','NAD 50 KM — INDIVIDUÁLNA CENA','DODANIE: DO 14 DNÍ'],valid:'PONUKA PLATÍ:',cta:'OBJEDNAJTE DNES!',net:'netto'}
  };

  function r127MasterUrl(){
    if(R127_MASTER_URL)return Promise.resolve(R127_MASTER_URL);
    if(R127_MASTER_PROMISE)return R127_MASTER_PROMISE;
    R127_MASTER_PROMISE=Promise.all(R127_MASTER_PARTS.map(async function(row,i){
      const u=row[0],expected=row[1];
      const r=await fetch(u+'?v=R127-language-clean-bottom',{cache:'reload'});
      if(!r.ok)throw new Error('MASTER part '+(i+1)+' HTTP '+r.status);
      let t=(await r.text()).replace(/[^A-Za-z0-9+/=]/g,'');
      if(t.length<expected)throw new Error('MASTER part '+(i+1)+' length '+t.length+'/'+expected);
      return t.slice(0,expected);
    })).then(function(parts){
      const joined=parts.join('');
      if(joined.length!==140940)throw new Error('MASTER base64 length '+joined.length+'/140940');
      const bin=atob(joined);
      if(bin.length!==105704)throw new Error('MASTER binary length '+bin.length+'/105704');
      const bytes=new Uint8Array(bin.length);
      for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);
      R127_MASTER_URL=URL.createObjectURL(new Blob([bytes],{type:'image/webp'}));
      return R127_MASTER_URL;
    }).catch(function(e){R127_MASTER_PROMISE=null;throw e});
    return R127_MASTER_PROMISE;
  }
  function r127MasterImage(){
    return r127MasterUrl().then(function(src){
      return new Promise(function(resolve,reject){
        const img=new Image();img.onload=function(){resolve(img)};img.onerror=reject;img.src=src;
      });
    });
  }
  function r127RoundRect(ctx,x,y,w,h,r,fill,stroke){
    ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fillStyle=fill;ctx.fill();
    if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=2;ctx.stroke()}
  }
  function r127Text(ctx,txt,x,y,maxW,size,color,weight,align){
    txt=String(txt??'');ctx.font=(weight||'700')+' '+size+'px Arial';ctx.fillStyle=color||'#fff';
    ctx.textAlign=align||'left';ctx.textBaseline='middle';
    let s=size;while(s>12&&ctx.measureText(txt).width>maxW){s-=1;ctx.font=(weight||'700')+' '+s+'px Arial'}
    ctx.fillText(txt,x,y);
  }
  function r127Wrap(ctx,txt,x,y,maxW,lineH,size,color,weight){
    ctx.font=(weight||'700')+' '+size+'px Arial';ctx.fillStyle=color||'#fff';ctx.textAlign='left';ctx.textBaseline='top';
    const words=String(txt??'').split(' ');let line='',yy=y;
    for(const w of words){const t=line?line+' '+w:w;if(ctx.measureText(t).width>maxW&&line){ctx.fillText(line,x,yy);line=w;yy+=lineH}else line=t}
    if(line)ctx.fillText(line,x,yy);
  }

  function r127CleanPolishBottom(ctx){
    /* R127: przykrywamy wyłącznie uszkodzony dolny pas; reszta MASTER pozostaje piksel w piksel z R126. */
    ctx.save();
    ctx.fillStyle='rgba(1,7,4,.995)';ctx.fillRect(10,1386,1004,150);
    ctx.strokeStyle='#3e5b24';ctx.lineWidth=2;ctx.strokeRect(10,1386,1004,150);

    ctx.fillStyle='#73c41b';ctx.font='900 35px Arial';ctx.textAlign='left';ctx.textBaseline='middle';
    ctx.fillText('ZAMÓW JUŻ DZIŚ!',28,1417);
    ctx.fillStyle='#fff';ctx.font='900 27px Arial';ctx.fillText('+48 723 588 333',28,1454);
    ctx.font='800 21px Arial';ctx.fillText('lmtechnic@wp.pl',28,1482);

    ctx.fillStyle='#d9dfd8';ctx.font='800 15px Arial';
    ctx.fillText('WŁASNY MAGAZYN',430,1412);
    ctx.fillText('PROFESJONALNA OBSŁUGA',650,1412);
    ctx.fillText('PARTNERSTWO I ZAUFANIE',846,1412);
    ctx.fillStyle='#aeb8ae';ctx.font='700 13px Arial';
    ctx.fillText('duże stany • stała dostępność',430,1437);
    ctx.fillText('doradztwo • wsparcie',650,1437);
    ctx.fillText('długoterminowa współpraca',846,1437);

    ctx.fillStyle='rgba(12,40,13,.98)';ctx.fillRect(10,1500,1004,36);
    ctx.fillStyle='#dce7dc';ctx.font='800 13px Arial';
    ctx.fillText('MAGAZYN: ul. Długa 3A, 83-200 Rokocin',28,1518);
    ctx.fillText('DOSTAWY NA TERENIE CAŁEJ POLSKI',390,1518);
    ctx.fillText('SPRZEDAŻ HURTOWA',790,1518);
    ctx.restore();
  }

  r123Canvas=async function(){
    const c=document.getElementById('r123_canvas');if(!c)return;
    const ctx=c.getContext('2d');c.width=1024;c.height=1536;
    try{
      const img=await r127MasterImage();
      ctx.clearRect(0,0,1024,1536);ctx.drawImage(img,0,0,1024,1536);

      const L=R127_LANGS[R123_ACTIVE_LANG]||R127_LANGS.pl;
      const pal=(document.getElementById('r123_g_paleta')?.value||'2100').replace('.',',');
      const bag=(document.getElementById('r123_g_worek')?.value||'25').replace('.',',');
      const big=(document.getElementById('r123_g_bigbag')?.value||'1900').replace('.',',');
      const f=r123Date(document.getElementById('r123_g_from')?.value||'');
      const t=r123Date(document.getElementById('r123_g_to')?.value||'');
      const dark='rgba(2,8,5,.96)',green='#73c41b',gold='#f1aa22',white='#f7f7f5';

      if(R123_ACTIVE_LANG==='pl')r127CleanPolishBottom(ctx);
      if(R123_ACTIVE_LANG!=='pl'){
        r127RoundRect(ctx,300,18,500,122,10,dark,'#5a683e');
        r127Text(ctx,L.sale,550,48,455,30,white,'800','center');
        r127Text(ctx,L.clean,550,92,455,22,green,'800','center');
        r127RoundRect(ctx,28,145,810,182,12,dark,'#667443');
        r127Text(ctx,L.title1,48,192,750,62,gold,'900','left');
        r127Text(ctx,L.title2,48,252,750,47,white,'900','left');
        r127Text(ctx,L.strap,430,303,730,22,gold,'800','center');

        r127RoundRect(ctx,854,314,154,560,10,'rgba(2,8,5,.98)','#647642');
        r127Text(ctx,L.quality,931,350,135,22,white,'900','center');
        let yy=395;
        L.qualityLines.forEach(q=>{r127Text(ctx,'✓',870,yy,22,25,green,'900','left');r127Wrap(ctx,q,898,yy-13,100,22,15,white,'800');yy+=87});

        r127RoundRect(ctx,615,930,390,318,10,'rgba(2,8,5,.97)','#647642');
        r127Text(ctx,L.delivery,635,965,340,27,gold,'900','left');yy=1018;
        L.deliveryLines.forEach(q=>{r127Text(ctx,'✓',635,yy,24,25,green,'900','left');r127Wrap(ctx,q,670,yy-14,305,24,18,white,'800');yy+=78});

        r127RoundRect(ctx,10,1362,1004,164,0,'rgba(2,8,5,.97)',null);
        r127Text(ctx,L.cta,28,1408,460,42,green,'900','left');
        r127Text(ctx,'+48 723 588 333',28,1460,360,31,white,'900','left');
        r127Text(ctx,'lmtechnic@wp.pl',28,1502,360,26,white,'800','left');
      }

      const cells=[
        {x:14,w:284,label:L.palette,val:pal,sub:L.perPalette},
        {x:307,w:274,label:L.bags,val:bag,sub:L.perBag},
        {x:588,w:260,label:L.big,val:big,sub:L.perBig}
      ];
      cells.forEach(o=>{
        r127RoundRect(ctx,o.x,317,o.w,160,8,'rgba(1,9,4,.95)','#5d7935');
        r127Text(ctx,o.label,o.x+o.w/2,347,o.w-25,27,white,'900','center');
        r127Text(ctx,o.val+' zł',o.x+18,405,o.w-95,49,gold,'900','left');
        r127Text(ctx,L.net,o.x+o.w-18,406,78,23,gold,'800','right');
        r127Text(ctx,o.sub,o.x+o.w/2,452,o.w-25,22,white,'800','center');
      });

      r127RoundRect(ctx,15,1268,995,88,7,'rgba(241,170,34,.97)','#ffd15b');
      r127Text(ctx,L.valid,75,1300,210,26,'#111','900','left');
      r127Text(ctx,f+' – '+t,210,1327,380,34,'#111','900','left');
      r127Text(ctx,'NETTO',920,1313,120,25,'#111','900','center');

      const lang=document.getElementById('r123_live_lang');if(lang)lang.textContent=L.flag+' '+L.code;
      const st=document.getElementById('r123_g_status');if(st)st.textContent='✓ R127 MASTER LIVE — język aktywny • dolny pas czysty';
    }catch(e){
      console.warn('R127 MASTER fallback',e);
      ctx.clearRect(0,0,1024,1536);ctx.fillStyle='#020702';ctx.fillRect(0,0,1024,1536);
      ctx.fillStyle='#f0aa21';ctx.font='900 52px Arial';ctx.textAlign='center';ctx.fillText('L&M TECHNIC ENERGY — OFERTA',512,180);
      const st=document.getElementById('r123_g_status');if(st)st.textContent='⚠ R127: grafika MASTER chwilowo niedostępna — SYNCHRONIZUJ i otwórz generator ponownie';
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
    out=out.replace('  function r115RenderCompanyMaster(){',r127Inside+'\\n  function r115RenderCompanyMaster(){');
  }
  return out;
};
