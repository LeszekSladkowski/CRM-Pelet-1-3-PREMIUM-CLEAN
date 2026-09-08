/* R116 — CRM 1.3 — OKNO NR 3 „SZCZEGÓŁY FIRMY” — FULL ACTIVE
   Baza: bezwzględny MASTER R115.
   Zmiana: ożywienie wszystkich aktywnych elementów OKNA 3 bez zmiany grafiki MASTER.
   Dane robocze per firma zapisują się lokalnie po stabilnym ID i są objęte istniejącym backupem localStorage.
*/
importScripts('./sw-r115-master.js?v=R116-company-details-full-active');

const r115MasterPatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r115MasterPatchIndexHtml(text);

  out = out.replaceAll('1.3.0-master-r115-company-details-iife-fix','1.3.0-master-r116-company-details-full-active');
  out = out.replaceAll('R115 OKNO 3 — IIFE RENDER FIX','R116 OKNO 3 — FULL ACTIVE');
  out = out.replace("const BUILD_TIME = '12:58';","const BUILD_TIME = '13:03';");
  out = out.replace("navigator.serviceWorker.register('./sw.js?v=R115-company-details-iife-fix-1258'","navigator.serviceWorker.register('./sw.js?v=R116-company-details-full-active-1303'");
  out = out.replace(/r84-backup-prune\.js\?v=R115-1258/g,'r84-backup-prune.js?v=R116-1303');

  if(!out.includes('r116-company-details-full-active-inside-iife')){
    const r116Inside = `
  /* r116-company-details-full-active-inside-iife */
  const R116_COMPANY_IMG='./grafiki/rynki-eu/szczegoly-firmy/master-okno-3-szczegoly-firmy.png';

  function r116Esc(v){
    return String(v==null?'':v).replace(/[&<>"']/g,function(ch){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]||ch;
    });
  }
  function r116Id(c){ return (c&&c.id)||state.selectedCompany||'unknown'; }
  function r116Key(c,suffix){ return 'crm13_r116_'+r116Id(c)+'_'+suffix; }
  function r116Read(c,suffix,fallback){
    try{
      const raw=localStorage.getItem(r116Key(c,suffix));
      return raw==null?fallback:JSON.parse(raw);
    }catch(e){ return fallback; }
  }
  function r116Write(c,suffix,value){
    localStorage.setItem(r116Key(c,suffix),JSON.stringify(value));
  }
  function r116Now(){
    try{return new Date().toLocaleString('pl-PL',{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'});}
    catch(e){return new Date().toISOString();}
  }
  function r116Company(){
    const base=getCompanyById(state.selectedCompany)||{};
    const ov=r116Read(base,'company_override',{});
    return Object.assign({},base,ov||{});
  }
  function r116AddHistory(c,type,text){
    const arr=r116Read(c,'history',[]);
    arr.unshift({at:r116Now(),type:type,text:text});
    r116Write(c,'history',arr.slice(0,250));
  }
  function r116Logistics(c){
    const l=c&&c.logistics;
    if(!l) return '—';
    if(typeof l==='string') return l;
    try{
      return Object.keys(l).map(function(k){return k+': '+l[k];}).join(' • ')||'—';
    }catch(e){return '—';}
  }
  function r116BackRoute(c){ return c&&c.countryCode==='DE'?'germany':'country'; }
  function r116Missing(c,label){ toast(label+' — brak zweryfikowanych danych dla tej firmy'); }

  function r116OpenData(c){
    c=r116Company();
    sheetTitle.textContent='DANE FIRMY — '+(c.name||'FIRMA');
    sheetContent.innerHTML=
      '<div class="sheet-copy"><b>Pełna nazwa:</b> '+r116Esc(c.legalName||c.name||'—')+
      '<br><b>Kraj:</b> '+r116Esc(c.countryName||c.countryCode||'—')+
      '<br><b>Miasto / region:</b> '+r116Esc(c.city||c.region||'—')+
      '<br><b>Adres:</b> '+r116Esc(c.address||'—')+
      '<br><b>Osoba kontaktowa:</b> '+r116Esc(c.contactPerson||'—')+
      '<br><b>Telefon:</b> '+r116Esc(c.phone||'—')+
      '<br><b>E-mail:</b> '+r116Esc(c.email||'—')+
      '<br><b>WWW:</b> '+r116Esc(c.website||'—')+
      '<br><b>NIP:</b> '+r116Esc(c.nip||'—')+
      '<br><b>Typ / rola:</b> '+r116Esc((c.type||'—')+' / '+(c.role||'—'))+
      '<br><b>Certyfikat:</b> '+r116Esc(c.certificate||c.availability||'—')+
      '<br><b>Źródło / data:</b> '+r116Esc((c.sourceLabel||'—')+' • '+(c.sourceDate||'—'))+
      '</div>'+
      '<div class="sheet-grid">'+
      '<button class="sheet-action gold" data-r116-edit>EDYTUJ DANE</button>'+
      '<button class="sheet-action blue" data-r116-www>OTWÓRZ WWW</button>'+
      '</div>';
    sheetContent.querySelector('[data-r116-edit]').addEventListener('click',function(){r116OpenDataEdit(c);});
    sheetContent.querySelector('[data-r116-www]').addEventListener('click',function(){
      if(!c.website) return r116Missing(c,'Strona WWW');
      const u=/^https?:\/\//i.test(c.website)?c.website:'https://'+c.website;
      openUrl(u);
    });
    sheet.hidden=false;
  }

  function r116OpenDataEdit(c){
    c=r116Company();
    sheetTitle.textContent='EDYTUJ DANE — '+(c.name||'FIRMA');
    sheetContent.innerHTML=
      '<input class="sheet-input" data-r116-city placeholder="Miasto / region" value="'+r116Esc(c.city||c.region||'')+'">'+
      '<input class="sheet-input" data-r116-address placeholder="Adres" value="'+r116Esc(c.address||'')+'">'+
      '<input class="sheet-input" data-r116-contact placeholder="Osoba kontaktowa" value="'+r116Esc(c.contactPerson||'')+'">'+
      '<input class="sheet-input" data-r116-phone placeholder="Telefon" value="'+r116Esc(c.phone||'')+'">'+
      '<input class="sheet-input" data-r116-email placeholder="E-mail" value="'+r116Esc(c.email||'')+'">'+
      '<input class="sheet-input" data-r116-www placeholder="WWW" value="'+r116Esc(c.website||'')+'">'+
      '<input class="sheet-input" data-r116-cert placeholder="Certyfikat / dostępność" value="'+r116Esc(c.certificate||c.availability||'')+'">'+
      '<button class="sheet-action green wide" data-r116-save>ZAPISZ DANE FIRMY</button>';
    sheetContent.querySelector('[data-r116-save]').addEventListener('click',function(){
      const ov={
        city:sheetContent.querySelector('[data-r116-city]').value.trim(),
        address:sheetContent.querySelector('[data-r116-address]').value.trim(),
        contactPerson:sheetContent.querySelector('[data-r116-contact]').value.trim(),
        phone:sheetContent.querySelector('[data-r116-phone]').value.trim(),
        email:sheetContent.querySelector('[data-r116-email]').value.trim(),
        website:sheetContent.querySelector('[data-r116-www]').value.trim(),
        certificate:sheetContent.querySelector('[data-r116-cert]').value.trim()
      };
      r116Write(c,'company_override',ov);
      r116AddHistory(c,'DANE FIRMY','Zaktualizowano dane kontaktowe firmy');
      closeSheet();
      toast('✓ Dane firmy zapisane lokalnie.');
      render();
    });
    sheet.hidden=false;
  }

  function r116OpenPrices(c){
    c=r116Company();
    const own=r116Read(c,'current_price',null);
    const current=own&&own.text?own.text:(c.priceText||'Brak zapisanej ceny');
    const type=own&&own.type?own.type:(c.priceType||'—');
    const date=own&&own.date?own.date:(c.priceDate||c.sourceDate||'—');
    sheetTitle.textContent='CENY — '+(c.name||'FIRMA');
    sheetContent.innerHTML=
      '<div class="sheet-copy"><b>Aktualny zapis:</b> '+r116Esc(current)+
      '<br><b>Typ ceny:</b> '+r116Esc(type)+
      '<br><b>Data:</b> '+r116Esc(date)+
      '<br><b>Dostępność:</b> '+r116Esc(c.availability||'—')+
      '<br><b>Logistyka:</b> '+r116Esc(r116Logistics(c))+
      '</div>'+
      '<input class="sheet-input" data-r116-price placeholder="Nowa cena / warunki, np. 1650 PLN netto/t FCA" value="">'+
      '<input class="sheet-input" data-r116-price-type placeholder="Typ: FCA / DAP / benchmark / oferta pisemna" value="">'+
      '<input class="sheet-input" data-r116-price-date type="date">'+
      '<div class="sheet-grid"><button class="sheet-action green" data-r116-price-save>ZAPISZ CENĘ</button><button class="sheet-action blue" data-r116-price-sync>SYNCHRONIZUJ</button></div>';
    sheetContent.querySelector('[data-r116-price-save]').addEventListener('click',function(){
      const text=sheetContent.querySelector('[data-r116-price]').value.trim();
      if(!text){toast('Wpisz cenę lub warunki.');return;}
      const obj={
        text:text,
        type:sheetContent.querySelector('[data-r116-price-type]').value.trim()||'AKTUALIZACJA RĘCZNA',
        date:sheetContent.querySelector('[data-r116-price-date]').value||new Date().toISOString().slice(0,10)
      };
      r116Write(c,'current_price',obj);
      r116AddHistory(c,'CENA',obj.text+' • '+obj.type+' • '+obj.date);
      closeSheet();
      toast('✓ Cena zapisana i dopisana do historii.');
    });
    sheetContent.querySelector('[data-r116-price-sync]').addEventListener('click',function(){closeSheet();sync();});
    sheet.hidden=false;
  }

  function r116OpenHistory(c){
    c=r116Company();
    const arr=r116Read(c,'history',[]);
    let html='';
    if(c.priceText){
      html+='<div class="sheet-copy"><b>BAZA / CENA</b><br>'+r116Esc(c.priceText)+'<br><small>'+r116Esc(c.priceDate||c.sourceDate||'')+'</small></div>';
    }
    if(!arr.length){
      html+='<div class="sheet-copy">Brak lokalnych zmian. Kolejne ceny, negocjacje, oferty, notatki i statusy będą zapisywane tutaj automatycznie.</div>';
    }else{
      html+=arr.map(function(x){
        return '<div class="sheet-copy"><b>'+r116Esc(x.type||'ZDARZENIE')+'</b> • '+r116Esc(x.at||'')+'<br>'+r116Esc(x.text||'')+'</div>';
      }).join('');
    }
    sheetTitle.textContent='HISTORIA — '+(c.name||'FIRMA');
    sheetContent.innerHTML=html;
    sheet.hidden=false;
  }

  function r116OfferList(c){
    const arr=r116Read(c,'offers',[]);
    if(!arr.length) return '<div class="sheet-copy">Brak zapisanych ofert dla tej firmy.</div>';
    return arr.slice(0,8).map(function(o){
      return '<div class="sheet-copy"><b>'+r116Esc(o.at||'OFERTA')+'</b><br>Ilość: '+r116Esc(o.qty||'—')+' t • Cena: '+r116Esc(o.price||'—')+'<br>'+r116Esc(o.terms||'')+'</div>';
    }).join('');
  }
  function r116OpenOffer(c){
    c=r116Company();
    sheetTitle.textContent='OFERTA — '+(c.name||'FIRMA');
    sheetContent.innerHTML=
      r116OfferList(c)+
      '<input class="sheet-input" data-r116-offer-qty type="number" min="1" step="1" placeholder="Ilość ton">'+
      '<input class="sheet-input" data-r116-offer-price placeholder="Cena, np. 2100 PLN netto/t">'+
      '<textarea class="sheet-input" data-r116-offer-terms rows="4" placeholder="Warunki: FCA/DAP, termin, płatność, transport"></textarea>'+
      '<div class="sheet-grid">'+
      '<button class="sheet-action green" data-r116-offer-save>ZAPISZ OFERTĘ</button>'+
      '<button class="sheet-action gold" data-r116-offer-master>GENERATOR MASTER</button>'+
      '<button class="sheet-action blue" data-r116-offer-mail>WYŚLIJ E-MAIL</button>'+
      '<button class="sheet-action red" data-r116-offer-close>ZAMKNIJ</button>'+
      '</div>';
    function readOffer(){
      return {
        at:r116Now(),
        qty:sheetContent.querySelector('[data-r116-offer-qty]').value.trim(),
        price:sheetContent.querySelector('[data-r116-offer-price]').value.trim(),
        terms:sheetContent.querySelector('[data-r116-offer-terms]').value.trim()
      };
    }
    sheetContent.querySelector('[data-r116-offer-save]').addEventListener('click',function(){
      const o=readOffer();
      if(!o.qty&&!o.price&&!o.terms){toast('Uzupełnij ofertę przed zapisem.');return;}
      const arr=r116Read(c,'offers',[]);
      arr.unshift(o);
      r116Write(c,'offers',arr.slice(0,100));
      r116AddHistory(c,'OFERTA','Zapisano ofertę: '+(o.qty||'—')+' t • '+(o.price||'—'));
      closeSheet();
      toast('✓ Oferta zapisana w historii firmy.');
    });
    sheetContent.querySelector('[data-r116-offer-master]').addEventListener('click',function(){
      closeSheet();
      if(typeof r17OpenOffer==='function') r17OpenOffer(c); else toast('Generator MASTER nie jest dostępny w tej gałęzi.');
    });
    sheetContent.querySelector('[data-r116-offer-mail]').addEventListener('click',function(){
      if(!c.email){r116Missing(c,'E-mail');return;}
      const o=readOffer();
      const subject='Oferta L&M Technic Energy — '+(c.name||'firma');
      const body='Dzień dobry,\n\nprzesyłamy ofertę L&M Technic Energy.\nIlość: '+(o.qty||'—')+' t\nCena: '+(o.price||'—')+'\nWarunki: '+(o.terms||'—')+'\n\nPozdrawiamy\nL&M Technic Energy';
      location.href='mailto:'+encodeURIComponent(c.email)+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
    });
    sheetContent.querySelector('[data-r116-offer-close]').addEventListener('click',closeSheet);
    sheet.hidden=false;
  }

  function r116OpenNotes(c){
    c=r116Company();
    const saved=r116Read(c,'company_note',{text:c.note||''});
    sheetTitle.textContent='NOTATKI O FIRMIE — '+(c.name||'FIRMA');
    sheetContent.innerHTML=
      '<div class="sheet-copy"><b>Źródło rekordu:</b> '+r116Esc(c.sourceLabel||'—')+'<br><b>Data źródła:</b> '+r116Esc(c.sourceDate||'—')+'</div>'+
      '<textarea class="sheet-input" data-r116-note rows="8" placeholder="Ważne informacje, rozmowy, ustalenia">'+r116Esc(saved&&saved.text?saved.text:'')+'</textarea>'+
      '<button class="sheet-action green wide" data-r116-note-save>ZAPISZ NOTATKĘ</button>';
    sheetContent.querySelector('[data-r116-note-save]').addEventListener('click',function(){
      const text=sheetContent.querySelector('[data-r116-note]').value.trim();
      r116Write(c,'company_note',{text:text,updatedAt:r116Now()});
      r116AddHistory(c,'NOTATKA',text||'Wyczyszczono notatkę');
      closeSheet();
      toast('✓ Notatka firmy zapisana.');
    });
    sheet.hidden=false;
  }

  function r116OpenGoals(c){
    c=r116Company();
    const saved=r116Read(c,'assistant_goal',null);
    const goal=saved&&saved.text?saved.text:(c.nextFollowUp||'Brak celu — wpisz nowe zadanie.');
    const done=saved&&saved.doneAt?saved.doneAt:'—';
    sheetTitle.textContent='CELE ASYSTENTA — '+(c.name||'FIRMA');
    sheetContent.innerHTML=
      '<div class="sheet-copy"><b>Cel bazowy:</b> '+r116Esc(c.nextFollowUp||'—')+
      '<br><b>Brakujące informacje:</b> '+r116Esc(c.missingInfo||'—')+
      '<br><b>Ostatnio wykonany:</b> '+r116Esc(done)+'</div>'+
      '<textarea class="sheet-input" data-r116-goal rows="6">'+r116Esc(goal)+'</textarea>'+
      '<div class="sheet-grid"><button class="sheet-action green" data-r116-goal-save>ZAPISZ CEL</button><button class="sheet-action blue" data-r116-goal-done>ZREALIZOWANE</button></div>';
    sheetContent.querySelector('[data-r116-goal-save]').addEventListener('click',function(){
      const text=sheetContent.querySelector('[data-r116-goal]').value.trim();
      const prev=r116Read(c,'assistant_goal',{});
      r116Write(c,'assistant_goal',{text:text,doneAt:prev&&prev.doneAt?prev.doneAt:''});
      r116AddHistory(c,'CEL ASYSTENTA','Ustalono cel: '+text);
      closeSheet();
      toast('✓ Cel asystenta zapisany.');
    });
    sheetContent.querySelector('[data-r116-goal-done]').addEventListener('click',function(){
      const text=sheetContent.querySelector('[data-r116-goal]').value.trim();
      const at=r116Now();
      r116Write(c,'assistant_goal',{text:text,doneAt:at});
      r116AddHistory(c,'CEL ZREALIZOWANY',text+' • '+at);
      closeSheet();
      toast('✓ Cel oznaczony jako zrealizowany.');
    });
    sheet.hidden=false;
  }

  function r116OpenStatus(c){
    c=r116Company();
    const st=r116Read(c,'status',{status:c.status||'NOWY',priority:c.priority||'B',nextContact:''});
    sheetTitle.textContent='AKCJE I STATUS — '+(c.name||'FIRMA');
    sheetContent.innerHTML=
      '<div class="sheet-copy"><b>Status:</b> '+r116Esc(st.status||'NOWY')+
      '<br><b>Priorytet:</b> '+r116Esc(st.priority||c.priority||'B')+
      '<br><b>Następny kontakt:</b> '+r116Esc(st.nextContact||'—')+'</div>'+
      '<div class="sheet-grid">'+
      '<button class="sheet-action green" data-r116-status="NOWY">NOWY</button>'+
      '<button class="sheet-action gold" data-r116-status="NEGOCJACJE">NEGOCJACJE</button>'+
      '<button class="sheet-action blue" data-r116-status="OFERTA_WYSLANA">OFERTA WYSŁANA</button>'+
      '<button class="sheet-action green" data-r116-status="AKTYWNY">AKTYWNY</button>'+
      '<button class="sheet-action red" data-r116-status="NIEAKTYWNY">NIEAKTYWNY</button>'+
      '</div>'+
      '<input class="sheet-input" data-r116-priority placeholder="Priorytet: A / B / C" value="'+r116Esc(st.priority||c.priority||'B')+'">'+
      '<input class="sheet-input" data-r116-next type="datetime-local" value="'+r116Esc(st.nextContact||'')+'">'+
      '<button class="sheet-action green wide" data-r116-status-save>ZAPISZ PRIORYTET I TERMIN</button>';
    sheetContent.querySelectorAll('[data-r116-status]').forEach(function(b){
      b.addEventListener('click',function(){
        const cur=r116Read(c,'status',{priority:c.priority||'B',nextContact:''});
        cur.status=b.dataset.r116Status;
        r116Write(c,'status',cur);
        r116AddHistory(c,'STATUS','Status: '+cur.status);
        closeSheet();
        toast('✓ Status zapisany: '+cur.status.replaceAll('_',' '));
      });
    });
    sheetContent.querySelector('[data-r116-status-save]').addEventListener('click',function(){
      const cur=r116Read(c,'status',{status:c.status||'NOWY'});
      cur.priority=sheetContent.querySelector('[data-r116-priority]').value.trim()||'B';
      cur.nextContact=sheetContent.querySelector('[data-r116-next]').value;
      r116Write(c,'status',cur);
      r116AddHistory(c,'FOLLOW-UP','Priorytet '+cur.priority+' • następny kontakt '+(cur.nextContact||'—'));
      closeSheet();
      toast('✓ Priorytet i termin kontaktu zapisane.');
    });
    sheet.hidden=false;
  }

  function r116OpenMap(c){
    if(typeof r19OpenCompanyMap==='function') return r19OpenCompanyMap(c);
    const q=c.address||[c.name,c.city,c.region,c.countryName].filter(Boolean).join(' ');
    if(q&&typeof mapUrl==='function') return mapUrl(q);
    r116Missing(c,'Mapa');
  }

  function r116RenderCompanyMaster(){
    const c=r116Company();
    const s=document.createElement('section');
    s.className='screen r116-company-master';
    const img=document.createElement('img');
    img.className='master';
    img.src=R116_COMPANY_IMG;
    img.alt='Szczegóły firmy — MASTER FULL ACTIVE';
    s.append(img);

    s.append(hotspot({x:0,y:0,w:135,h:135,label:'Wstecz',onClick:function(){go(r116BackRoute(c));},baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:720,y:0,w:132,h:150,label:'Synchronizuj',onClick:sync,baseW:852,baseH:1846,z:30}));

    s.append(hotspot({x:22,y:606,w:190,h:144,label:'Telefon',onClick:function(){c.phone?openUrl('tel:'+c.phone):r116Missing(c,'Telefon');},baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:220,y:606,w:193,h:144,label:'Mapa',onClick:function(){r116OpenMap(c);},baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:418,y:606,w:195,h:144,label:'Oferta',onClick:function(){r116OpenOffer(c);},baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:618,y:606,w:205,h:144,label:'Email',onClick:function(){c.email?openUrl('mailto:'+c.email):r116Missing(c,'E-mail');},baseW:852,baseH:1846,z:30}));

    s.append(hotspot({x:12,y:786,w:398,h:180,label:'Dane firmy',onClick:function(){r116OpenData(c);},baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:422,y:786,w:398,h:180,label:'Ceny',onClick:function(){r116OpenPrices(c);},baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:12,y:982,w:398,h:180,label:'Historia',onClick:function(){r116OpenHistory(c);},baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:422,y:982,w:398,h:180,label:'Oferta karta',onClick:function(){r116OpenOffer(c);},baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:12,y:1177,w:398,h:180,label:'Notatki o firmie',onClick:function(){r116OpenNotes(c);},baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:422,y:1177,w:398,h:180,label:'Cele asystenta',onClick:function(){r116OpenGoals(c);},baseW:852,baseH:1846,z:30}));
    s.append(hotspot({x:12,y:1374,w:808,h:190,label:'Akcje i status',onClick:function(){r116OpenStatus(c);},baseW:852,baseH:1846,z:30}));
    return s;
  }
  renderCompany=r116RenderCompanyMaster;
`;
    const marker='\n})();\n\n</script>';
    const pos=out.lastIndexOf(marker);
    if(pos>=0) out=out.slice(0,pos)+'\n'+r116Inside+out.slice(pos);
  }

  return out;
};
