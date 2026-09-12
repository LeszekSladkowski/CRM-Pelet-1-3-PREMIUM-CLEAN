# PUNKT 1 — SURGICAL CLEANUP AUDIT

Data rozpoczęcia: 12.09.2026
Repozytorium: CRM-Pelet-1-3-PREMIUM-CLEAN
Bazowy commit Punktu 0: `4fe9aa2530738b259d93b9c0b95389328c7d3fe6` (R142 HOTFIX)
Bezpieczny branch powrotu: `restore-point-0-2026-09-12-r142`
Branch roboczy: `surgical-cleanup-point-1`

## Zasada nadrzędna
Porządki nie mogą zmieniać zatwierdzonego wyglądu ani funkcji MASTER. Każdy etap jest wykonywany na branchu roboczym, a `main` pozostaje nietknięty do czasu testu na Samsung Galaxy S24 Ultra SM-S928B i wyraźnego zatwierdzenia użytkownika.

## Aktywny łańcuch runtime — NIE USUWAĆ
- `sw.js`
- `sw-r127-language-base.js`
- `sw-r125-base.js`
- `sw-r119-master.js`
- `sw-r76-stable.js`
- `sw-r66-stable.js`
- `sw-r54-core.js`
- `r128-notatki-live.js`
- `r128-notatki-main-v45b.js`
- `r128-talk-detail-one-enter-fix.js`
- `r129-cele-asystenta-live.js`
- `r130-akcje-status-live.js`
- `r130-akcje-status-layout-fix.js`
- `r131-waluty-k1-press-chamfer-test2.js`
- `r141-cele-asystenta-user-master-restore.js`
- `r84-backup-prune.js`
- `version.json`
- wszystkie aktywne grafiki MASTER i dane CRM.

## Etap 1 — pliki eksperymentalne wyłączone z runtime
R141 jawnie usuwa pozostałości eksperymentów R132–R140 z cachowanego/spatchowanego HTML, a `sw.js` ich nie importuje. Dlatego na branchu roboczym można usunąć pozostawione pliki testowe R132–R140 oraz notatkę testową R135. Historia Git i branch Punktu 0 zachowują pełny rollback.

Usuwane w tym etapie:
- `r132-cele-asystenta-company-name-center-test2.js`
- `r132-cele-asystenta-company-name-fit-test1.js`
- `r133-cele-asystenta-typography-priority-test1.js`
- `r133-cele-asystenta-typography-priority-test2.js`
- `r134-cele-asystenta-micro-typography-test1.js`
- `r135-cele-asystenta-optical-alignment-test1.js`
- `r136-cele-asystenta-master-geometry-restore-test1.js`
- `r137-cele-asystenta-master-hard-lock-test1.js`
- `r138-cele-asystenta-mathematical-centering-test1.js`
- `r139-cele-asystenta-single-layer-centering-test1.js`
- `r140-cele-asystenta-master-source-restore-test1.js`
- `R135_CELE_ASYSTENTA_TEST_NOTE.md`

## Wykryta niespójność do kolejnego osobnego kroku
Źródłowy `index.html` nadal zawiera historyczne metadane R43 i rejestrację `sw.js?v=R43...`, natomiast aktualny runtime końcowo nadpisuje je warstwami Service Workera do R141 v1.0B. To jest dług techniczny, ale nie wolno go poprawiać w tym samym kroku co usuwanie plików. Zgodnie z zasadą „jedna rzecz naraz” zostanie potraktowany jako osobny etap po teście Etapu 1.
