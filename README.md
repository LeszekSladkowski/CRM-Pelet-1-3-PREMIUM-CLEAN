# CRM Pelet 1.3 PREMIUM — CLEAN MASTER

Czyste, aktywne repozytorium produkcyjne CRM Pelet 1.3 PREMIUM — L&M Technic Energy.

## Aktualny stan
- aktywna gałąź produkcyjna: `main`,
- zweryfikowana wersja aplikacji: `R97 SURGICAL CLEAN STEP 5 — VERSION SYNC`,
- GitHub Pages aktywne,
- PWA działa z repozytorium CLEAN,
- RYNKI EU i WALUTY są zachowanymi, zatwierdzonymi MASTER-ami,
- `crm-data.json`, `assistant-feed.json` i mechanizm backupów pozostają aktywne.

## Zasada pracy
Jedna rzecz naraz:
1. jedna poprawka lub jeden krok porządkowy,
2. test na Samsung Galaxy S24 Ultra,
3. pozytywne zatwierdzenie użytkownika,
4. zamrożenie VERIFIED / MASTER,
5. dopiero potem następny krok.

Nie łączymy wielu zmian funkcjonalnych ani graficznych w jednym kroku.

## Punkty bezpieczeństwa
Najważniejszy niezmienny punkt powrotny:
- `MASTER/PUNKT-0-R92-VERIFIED`

Kolejne zweryfikowane checkpointy porządkowe:
- `MASTER/R93-SURGICAL-CLEAN-STEP1-VERIFIED`
- `MASTER/R94-SURGICAL-CLEAN-STEP2-VERIFIED`
- `MASTER/R95-SURGICAL-CLEAN-STEP3-VERIFIED`
- `MASTER/R96-SURGICAL-CLEAN-STEP4-VERIFIED`
- `MASTER/R97-SURGICAL-CLEAN-STEP5-VERIFIED`

Dodatkowe zabezpieczenie stanu sprzed PUNKTU 0:
- `backup/pre-punkt-0-R101-2026-09-07`

Żadnego z checkpointów MASTER nie wolno zmieniać bez wyraźnej decyzji użytkownika.

## Aktywny runtime
Aktualny łańcuch Service Workera:
`sw-r54-core.js -> sw-r66-stable.js -> sw-r76-stable.js -> sw.js`

Warstwa `sw-r70-stable.js` została po pozytywnym teście usunięta z aktywnego repozytorium.

## GitHub Pages
Publikacja odbywa się z gałęzi `main` z katalogu `/ (root)`.

## Cel repozytorium
To repozytorium jest czystą, kontrolowaną bazą do dalszego rozwoju CRM Pelet 1.3 PREMIUM. Każdy kolejny zatwierdzony element ma być instalowany osobno, testowany, a następnie zamrażany jako MASTER.
