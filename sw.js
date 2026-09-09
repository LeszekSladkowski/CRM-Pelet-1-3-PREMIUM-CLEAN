/* R127 — injection newline hotfix
   Warstwa techniczna: poprawia separator kodu po wstrzyknięciu R127.
   Nie zmienia funkcji, grafiki ani żadnego MASTER-a.
*/
importScripts('./sw-r127-language-base.js?v=R127-newline-hotfix');

const r127NewlineBasePatch=r48PatchIndexHtml;
r48PatchIndexHtml=function(text){
  let out=r127NewlineBasePatch(text);
  out=out.replace("\\n  function r115RenderCompanyMaster(){","\n  function r115RenderCompanyMaster(){");
  return out;
};
