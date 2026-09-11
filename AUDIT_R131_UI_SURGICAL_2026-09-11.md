# R131 — UI SURGICAL AUDIT — 11.09.2026

## Zasada audytu

Audyt prowadzony poza produkcyjnym `main`, bez kasowania plików i bez zmian runtime. Bazą jest dokładnie commit `397c39d3c515bc5e88b87dce19811947c7a53278` — `R130 v1.0G: synchronizacja aktualizatora i cache 1:1`.

Cel: znaleźć drobne rozjazdy wizualne i niespójności między zamrożonymi MASTER LOCK-ami a aktualnym runtime. Naprawy wykonywać dopiero po audycie, pojedynczo: 1 błąd -> 1 poprawka -> test na Samsung Galaxy S24 Ultra -> VERIFIED / MASTER.

## A1 — WALUTY KARTA 1 — efekt naciśnięcia

Status: POTWIERDZONA SŁABOŚĆ IMPLEMENTACJI / DO NAPRAWY POJEDYNCZYM KROKIEM.

R57 dopasował współrzędne pięciu hotspotów KARTY 1 tak, aby istniejący efekt `.wm-pressed` wpadał w złote ramki MASTER. Sam efekt pozostał jednak wspólny dla wszystkich przycisków WALUTY:

```css
.wm-hot.wm-pressed::after {
  inset: 4%;
  border-radius: 16px;
  ...
}
```

Wniosek: geometria efektu zależy od wymiaru hotspotu i używa jednego stałego promienia. To jest kruche i może wizualnie nie pokrywać dokładnie obwodu konkretnego kafla, mimo prawidłowego hotspotu. Zgłoszenie użytkownika z 11.09.2026 jest zgodne z tą konstrukcją.

Nie zmieniać jeszcze produkcji. Docelowa naprawa powinna być ograniczona wyłącznie do KARTY 1 i odtwarzać istniejący obwód rastra MASTER 1:1, bez wpływu na K2/K3/K4.

## A2 — WALUTY KARTA 4 — niespójność MASTER LOCK vs runtime

Status: POTWIERDZONA NIESPÓJNOŚĆ ŹRÓDŁA GRAFIKI.

`WALUTY_KARTA4_GRAPHIC_MASTER_LOCK.md` mówi, że KARTA 4 ma ładować bezpośrednio `master-waluty-karta4.png` i nie wolno podmieniać rastra MASTER.

Aktualny runtime odziedziczony z `sw-r76-stable.js` zmienia jednak źródło obrazu na:

`master-waluty-karta4-r74-runtime-clean.png`

To są dwa różne pliki w repozytorium. Przed jakąkolwiek zmianą trzeba porównać wygląd na urządzeniu referencyjnym i ustalić, który z nich faktycznie był wizualnie zatwierdzonym MASTER-em. Nie naprawiać tego automatycznie.

## A3 — CELE ASYSTENTA R129 — brak regresji po R130

Status: POTWIERDZONE — obecny silnik R129 jest tym samym plikiem, który został zamrożony jako FINAL MASTER.

Aktualny `r129-cele-asystenta-live.js` ma SHA `98723a0679dc7719495261e71c7bfbaa1874bb72`, czyli ten sam SHA, który powstał przy R129 v1.0B przed zamrożeniem FINAL MASTER.

Wniosek: widoczne obecnie przesunięcia opisów nie zostały wprowadzone przez dzisiejsze sprzątanie ani przez R130. Należy je traktować jako drobną niedoskonałość istniejącej implementacji R129 lub efekt zależny od długości treści.

Silnik używa geometrii 852x1846, ale dynamiczne teksty mają rozmiar początkowo wyliczany względnie (`cqw` / `vw`), a funkcja `fitText()` przy przepełnieniu przechodzi do korekty fontu w pikselach. To może powodować różnice optyczne zależne od długości nazwy firmy, priorytetu i treści celu.

Naprawa musi zachować współrzędne MASTER i dotyczyć wyłącznie stabilizacji renderowania tekstu. Nie ruszać rastra, hotspotów ani logiki zapisu celów.

## A4 — dokumentacja i aktywny runtime

Status: POTWIERDZONY DŁUG TECHNICZNY, NIE BŁĄD UI.

`README.md` nadal opisuje R97 jako zweryfikowaną wersję i podaje skrócony łańcuch Service Workera. Produkcyjny `main` jest obecnie R130 v1.0G.

Aktualny runtime jest warstwowy: `sw.js` -> `sw-r127-language-base.js` -> `sw-r125-base.js` -> `sw-r119-master.js` -> `sw-r76-stable.js` -> `sw-r66-stable.js` -> `sw-r54-core.js`, a następnie dokładane są skrypty LIVE R128/R129/R130.

Dokumentację zaktualizować dopiero po zakończeniu audytu i utworzeniu nowego zweryfikowanego punktu powrotnego.

## Kolejność dalszej pracy

1. WALUTY KARTA 1 — dokładnie efekt naciśnięcia, bez ruszania innych kart.
2. Test użytkownika na Samsung Galaxy S24 Ultra.
3. CELE ASYSTENTA — ustabilizowanie tekstu LIVE bez zmiany rastra/geometrii.
4. Test użytkownika.
5. WALUTY KARTA 4 — rozstrzygnięcie źródła grafiki MASTER.
6. Pełny audyt pozostałych kart.
7. Dopiero na końcu porządki repo i aktualizacja README.

## Zakaz w trakcie audytu

- nie kasować historycznych payloadów,
- nie zmieniać `main` bez pojedynczej zatwierdzonej poprawki,
- nie łączyć dwóch napraw w jednym commicie,
- nie naruszać MASTER LOCK-ów bez jednoznacznego polecenia użytkownika,
- nie uznawać audytu za MASTER przed testem na urządzeniu referencyjnym.
