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

Docelowa naprawa powinna być ograniczona wyłącznie do KARTY 1 i odtwarzać istniejący obwód rastra MASTER 1:1, bez wpływu na K2/K3/K4.

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

## A5 — WALUTY KARTA 3 — ryzyko podwójnego efektu PRZELICZ

Status: POTWIERDZONA KOLIZJA CSS / DO WERYFIKACJI WIZUALNEJ NA S24 ULTRA.

MASTER LOCK KARTY 3 mówi wprost: przycisk PRZELICZ nie może tworzyć drugiej ramki, a po naciśnięciu ma wystąpić wyłącznie poświata na istniejącej geometrii MASTER.

R66 nadaje przyciskowi klasę `r66-calc` i własny efekt box-shadow dla `.r66-calc.wm-pressed`, ale nie wyłącza globalnego pseudo-elementu `.wm-hot.wm-pressed::after` odziedziczonego z bazowego `index.html`. W efekcie w chwili naciśnięcia mogą działać jednocześnie dwa mechanizmy: własna poświata R66 oraz ogólny pseudo-obrys.

KARTA 4 ma już poprawne zabezpieczenie: `.wm-page[data-card="4"] .wm-hot::before,.wm-page[data-card="4"] .wm-hot::after{content:none!important;...}`. KARTA 3 takiego wyłączenia nie ma.

Wniosek: nie zmieniać teraz K3, ale podczas testów wizualnych sprawdzić PRZELICZ i szybkie przyciski 1000/5000/10000. Jeśli widać podwójny obwód lub poświatę niezgodną z MASTER-em, naprawa powinna jedynie wyłączyć globalny pseudo-element w obrębie K3, bez zmiany geometrii.

## A6 — NOTATKI O FIRMIE R128 — selektory zależne od kolejności DOM

Status: RYZYKO STRUKTURALNE, OBECNIE BEZ POTWIERDZONEGO BŁĘDU UI.

R128 v4.5I jest wizualnie zamrożony i pozostaje nietknięty. Audyt wykazał jednak, że `adjustHeader()` pobiera bezpośrednie absolutne DIV-y, filtruje te z `top < 26`, a następnie zakłada, że `header[0]` to nazwa firmy, a kolejne trzy elementy to metadane. Podobnie `findLists()` bierze pierwsze cztery pasujące listy.

To działa w obecnym DOM, ale jest wrażliwe na przyszłe dołożenie nowej absolutnej warstwy przed tymi elementami. Nie jest to powód do zmiany R128 teraz; należy jedynie traktować tę kartę jako strefę, do której nie dokładamy obcych DIV-ów bez jawnych klas/selektorów.

## A7 — AKCJE I STATUS R130 — geometria jest rozdzielona na dwa źródła

Status: POTWIERDZONE RYZYKO UTRZYMANIOWE / NIE NAPRAWIAĆ PRZED TESTEM.

`r130-akcje-status-live.js` nadal definiuje bazową geometrię i identyfikuje się jako silnik R130 v1.0A. Następnie osobny `r130-akcje-status-layout-fix.js` R130 v1.0G skanuje absolutne DIV-y, rozpoznaje je po przybliżonych współrzędnych (`near(..., tolerance 2.8)`) i przesuwa do nowych pozycji wzorca 852x1846.

To oznacza, że ostateczna pozycja elementu nie jest zapisana w jednym miejscu. Dodatkowo korektor oznacza element `dataset` i nie przelicza go ponownie po pierwszym dopasowaniu.

Wniosek: R130 działa, ale jest bardziej podatny na małe rozjazdy niż karta z jedną bezpośrednią geometrią. Podczas dalszego audytu R130 trzeba porównywać sekcja po sekcji z rasterem MASTER, bez dokładania trzeciej warstwy korekt. Docelowo po pełnej walidacji warto scalić geometrię do jednego źródła, ale dopiero jako osobny etap i wyłącznie po pełnym backupie.

## A8 — MASTER LOCK a ponowny audyt 11.09.2026

Status: ZASADA KONTROLNA.

Historyczne MASTER LOCK-i pozostają ważnymi punktami powrotu i nie są kasowane ani przepisywane. Jednocześnie użytkownik 11.09.2026 zgłosił nowe drobne niedoskonałości i wyraził zgodę na dalszy audyt. Oznacza to, że poprawiamy tylko konkretnie potwierdzone elementy, zachowując stare MASTER-y jako rollback.

Nie wolno interpretować audytu jako zgody na ogólne przeprojektowanie kart.

## Kolejność dalszej pracy

1. Dokończyć statyczny audyt WALUT K1–K4 i zanotować wszystkie kolizje efektów naciśnięcia.
2. WALUTY KARTA 1 — przygotować jedną izolowaną poprawkę efektu naciśnięcia.
3. Test użytkownika na Samsung Galaxy S24 Ultra.
4. CELE ASYSTENTA — ustabilizować renderowanie tekstu LIVE bez zmiany rastra/geometrii.
5. Test użytkownika.
6. WALUTY KARTA 4 — rozstrzygnąć źródło grafiki MASTER.
7. AKCJE I STATUS — audyt sekcja po sekcji względem rastra.
8. NOTATKI O FIRMIE — tylko kontrola regresji, bez zmian jeśli brak błędu.
9. Dopiero na końcu porządki repo i aktualizacja README.

## Zakaz w trakcie audytu

- nie kasować historycznych payloadów,
- nie zmieniać `main` bez pojedynczej zatwierdzonej poprawki,
- nie łączyć dwóch napraw w jednym commicie,
- nie naruszać rastrów MASTER bez jednoznacznego polecenia użytkownika,
- nie uznawać audytu za MASTER przed testem na urządzeniu referencyjnym,
- nie scalać warstw runtime w trakcie audytu diagnostycznego.
