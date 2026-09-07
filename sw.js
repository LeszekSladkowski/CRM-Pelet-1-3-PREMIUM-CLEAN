/* R108 — CRM 1.3 RYNKI EU — NOTATKI ASYSTENTA FULL GRAPHIC CARD
   Baza: bezwzględny MASTER R107 CENY I OFERTA + R106 DANE FIRMY.
   Zmiana chirurgiczna: wyłącznie kafel NOTATKI ASYSTENTA na KARCIE 3/3.
   R107 jest importowany jako nieruszona warstwa MASTER.
*/
importScripts('./sw-r107-master.js?v=R108-base-r107-master');

if(Array.isArray(ASSETS)){
  if(!ASSETS.includes('./grafiki/rynki-eu/dane-firmy/template-notatki-asystenta.jpg')){
    ASSETS.push('./grafiki/rynki-eu/dane-firmy/template-notatki-asystenta.jpg');
  }
}

const r108BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r108BasePatchIndexHtml(text);

  /* R108 — dokładamy wyłącznie pełnoekranową kartę NOTATKI ASYSTENTA nad MASTER R107. */
  const r108CompanyMarker='  renderCompany=r107RenderCompanyWithGraphicCards;';
  if(out.includes(r108CompanyMarker) && !out.includes('function r108RenderCompanyNotesGraphic')){
    const r108Patch=`

  function r108RenderCompanyNotesGraphic(){
    const s=document.createElement('section');
    s.className='r108-notes-graphic-page';
    s.innerHTML='<img class="r108-notes-graphic" src="./grafiki/rynki-eu/dane-firmy/template-notatki-asystenta.jpg?v=R108" alt="NOTATKI ASYSTENTA">';

    const hotspot=(cls,label,handler)=>{
      const b=document.createElement('button');
      b.type='button';b.className='r108-notes-hot '+cls;b.setAttribute('aria-label',label);
      b.addEventListener('click',handler);s.append(b);return b;
    };
    hotspot('r108-notes-back-top','Wróć do karty',()=>{state.route='company';render()});
    hotspot('r108-notes-sync','Synchronizuj',()=>sync());
    hotspot('r108-notes-back-bottom','Wróć do karty',()=>{state.route='company';render()});
    return s;
  }

  const r108RenderCompanyBase=renderCompany;
  function r108RenderCompanyWithNotesGraphic(){
    const screen=r108RenderCompanyBase();
    if(screen&&screen.querySelectorAll){
      screen.querySelectorAll('.r15-section').forEach(section=>{
        const title=((section.querySelector('b')||{}).textContent||'').trim();
        if(title==='NOTATKI ASYSTENTA'){
          const clean=section.cloneNode(true);
          clean.addEventListener('click',()=>{state.route='company-notes-graphic';render()});
          section.replaceWith(clean);
        }
      });
    }
    return screen;
  }
  renderCompany=r108RenderCompanyWithNotesGraphic;
`;
    out=out.replace(r108CompanyMarker,r108CompanyMarker+r108Patch);
  }

  /* Główny render zna trzecią pełnoekranową trasę graficzną. */
  out = out.replace(
    "    else if(state.route==='company') view=renderCompany();",
    "    else if(state.route==='company-notes-graphic') view=r108RenderCompanyNotesGraphic();\n    else if(state.route==='company') view=renderCompany();"
  );

  /* R108 — święta zasada Samsung Galaxy S24 Ultra FULL SCREEN FIT. */
  if(!out.includes('id="r108-notes-graphic-style"')){
    const r108Style=`
<style id="r108-notes-graphic-style">
.r108-notes-graphic-page{position:relative;width:100vw;max-width:720px;height:100dvh;min-height:100dvh;margin:0 auto;background:#000;overflow:hidden;touch-action:pan-y pinch-zoom;}
.r108-notes-graphic{position:absolute;inset:0;width:100%;height:100%;object-fit:fill;display:block;pointer-events:none;user-select:none;}
.r108-notes-hot{position:absolute;z-index:25;border:0;background:transparent;padding:0;margin:0;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;}
.r108-notes-back-top{left:1%;top:.3%;width:15%;height:8.5%;}
.r108-notes-sync{right:1%;top:.3%;width:18%;height:8.8%;}
.r108-notes-back-bottom{left:3%;bottom:1.2%;width:94%;height:6.8%;}
body.debug .r108-notes-hot{background:rgba(255,0,0,.15);outline:1px dashed red;}
</style>
`;
    out=out.replace('</head>',r108Style+'</head>');
  }

  /* Publikacja R108 nad wersją R107 wygenerowaną przez warstwę MASTER. */
  out = out.replaceAll('1.3.0-master-r107-rynki-eu-ceny-oferta-full-graphic','1.3.0-master-r108-rynki-eu-notatki-asystenta-full-graphic');
  out = out.replaceAll('R107 RYNKI EU — CENY I OFERTA FULL GRAPHIC','R108 RYNKI EU — NOTATKI ASYSTENTA FULL GRAPHIC');
  out = out.replace("const BUILD_TIME = '21:29';","const BUILD_TIME = '21:47';");
  out = out.replaceAll('R107-ceny-oferta-full-graphic-2129','R108-notatki-asystenta-full-graphic-2147');
  out = out.replaceAll('R107-2129','R108-2147');
  return out;
};
