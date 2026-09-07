/* R109 — CRM 1.3 RYNKI EU — AKCJE I STATUS FULL GRAPHIC CARD
   Baza: bezwzględny MASTER R108 NOTATKI ASYSTENTA + R107 CENY I OFERTA + R106 DANE FIRMY.
   Zmiana chirurgiczna: wyłącznie kafel AKCJE I STATUS na KARCIE 3/3.
   R108 jest importowany jako nieruszona warstwa MASTER.
*/
importScripts('./sw-r108-master.js?v=R109-base-r108-master');

if(Array.isArray(ASSETS)){
  if(!ASSETS.includes('./grafiki/rynki-eu/dane-firmy/template-akcje-status.png')){
    ASSETS.push('./grafiki/rynki-eu/dane-firmy/template-akcje-status.png');
  }
}

const r109BasePatchIndexHtml = r48PatchIndexHtml;
r48PatchIndexHtml = function(text){
  let out = r109BasePatchIndexHtml(text);

  /* R109 — dokładamy wyłącznie pełnoekranową kartę AKCJE I STATUS nad MASTER R108. */
  const r109CompanyMarker='  renderCompany=r108RenderCompanyWithNotesGraphic;';
  if(out.includes(r109CompanyMarker) && !out.includes('function r109RenderCompanyActionsGraphic')){
    const r109Patch=`

  function r109RenderCompanyActionsGraphic(){
    const s=document.createElement('section');
    s.className='r109-actions-graphic-page';
    s.innerHTML='<img class="r109-actions-graphic" src="./grafiki/rynki-eu/dane-firmy/template-akcje-status.png?v=R109" alt="AKCJE I STATUS">';

    const hotspot=(cls,label,handler)=>{
      const b=document.createElement('button');
      b.type='button';b.className='r109-actions-hot '+cls;b.setAttribute('aria-label',label);
      b.addEventListener('click',handler);s.append(b);return b;
    };
    hotspot('r109-actions-back-top','Wróć do karty',()=>{state.route='company';render()});
    hotspot('r109-actions-sync','Synchronizuj',()=>sync());
    hotspot('r109-actions-back-bottom','Wróć do karty',()=>{state.route='company';render()});
    return s;
  }

  const r109RenderCompanyBase=renderCompany;
  function r109RenderCompanyWithActionsGraphic(){
    const screen=r109RenderCompanyBase();
    if(screen&&screen.querySelectorAll){
      screen.querySelectorAll('.r15-section').forEach(section=>{
        const title=((section.querySelector('b')||{}).textContent||'').trim();
        if(title==='AKCJE I STATUS'){
          const clean=section.cloneNode(true);
          clean.addEventListener('click',()=>{state.route='company-actions-graphic';render()});
          section.replaceWith(clean);
        }
      });
    }
    return screen;
  }
  renderCompany=r109RenderCompanyWithActionsGraphic;
`;
    out=out.replace(r109CompanyMarker,r109CompanyMarker+r109Patch);
  }

  /* Główny render zna czwartą pełnoekranową trasę graficzną. */
  out = out.replace(
    "    else if(state.route==='company') view=renderCompany();",
    "    else if(state.route==='company-actions-graphic') view=r109RenderCompanyActionsGraphic();\n    else if(state.route==='company') view=renderCompany();"
  );

  /* R109 — święta zasada Samsung Galaxy S24 Ultra FULL SCREEN FIT. */
  if(!out.includes('id="r109-actions-graphic-style"')){
    const r109Style=`
<style id="r109-actions-graphic-style">
.r109-actions-graphic-page{position:relative;width:100vw;max-width:720px;height:100dvh;min-height:100dvh;margin:0 auto;background:#000;overflow:hidden;touch-action:pan-y pinch-zoom;}
.r109-actions-graphic{position:absolute;inset:0;width:100%;height:100%;object-fit:fill;display:block;pointer-events:none;user-select:none;}
.r109-actions-hot{position:absolute;z-index:25;border:0;background:transparent;padding:0;margin:0;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;}
.r109-actions-back-top{left:1%;top:.3%;width:15%;height:8.5%;}
.r109-actions-sync{right:1%;top:.3%;width:18%;height:8.8%;}
.r109-actions-back-bottom{left:3%;bottom:1.2%;width:94%;height:6.8%;}
body.debug .r109-actions-hot{background:rgba(255,0,0,.15);outline:1px dashed red;}
</style>
`;
    out=out.replace('</head>',r109Style+'</head>');
  }

  /* Publikacja R109 nad wersją R108 wygenerowaną przez warstwę MASTER. */
  out = out.replaceAll('1.3.0-master-r108-rynki-eu-notatki-asystenta-full-graphic','1.3.0-master-r109-rynki-eu-akcje-status-full-graphic');
  out = out.replaceAll('R108 RYNKI EU — NOTATKI ASYSTENTA FULL GRAPHIC','R109 RYNKI EU — AKCJE I STATUS FULL GRAPHIC');
  out = out.replace("const BUILD_TIME = '21:47';","const BUILD_TIME = '22:06';");
  out = out.replaceAll('R108-notatki-asystenta-full-graphic-2147','R109-akcje-status-full-graphic-2206');
  out = out.replaceAll('R108-2147','R109-2206');
  return out;
};
