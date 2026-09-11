# R131 — CELE ASYSTENTA R129 — AUDYT STATYCZNY — 11.09.2026

Baza: produkcyjny `R130 v1.0G`, bez zmian `main`.
Raster MASTER pozostaje bezwzględnie nietknięty: `grafiki/rynki-eu/szczegoly-firmy/file_000000001e34820a89f54a69f0269506.png`, 852×1846.

## 1. Brak regresji pliku po zamrożeniu

Aktualny `r129-cele-asystenta-live.js` jest tym samym plikiem, który został zamrożony jako R129 v1.0B FINAL MASTER. Dzisiejsze sprzątanie ani R130 nie zmieniły jego kodu.

Wniosek: obecne drobne przesunięcia są właściwością istniejącego sposobu renderowania warstwy LIVE, a nie nową regresją.

## 2. Dwa systemy jednostek w jednym mechanizmie tekstu

Startowy rozmiar fontu jest wyliczany względnie:
- `cqw`, jeżeli przeglądarka go obsługuje,
- w przeciwnym razie `vw`.

Natomiast `fitText()` po wykryciu przepełnienia zaczyna zmniejszać font w absolutnych `px`.

To oznacza, że jeden napis może przejść z geometrii proporcjonalnej do ekranu na geometrię pikselową zależnie od długości treści.

Status: POTWIERDZONE RYZYKO OPTYCZNE.

## 3. Próg minimalny `fitText()` na telefonie

Dla części pól przekazywane są minima np. 22 px lub 24 px. Na telefonie startowy font liczony proporcjonalnie może być już mniejszy niż taki próg. Wtedy warunek zmniejszania `fs > minPx` nie uruchamia się nawet przy przepełnieniu.

Skutek możliwy dla dłuższych nazw, priorytetów lub następnego kroku:
- tekst może zostać przycięty przez `overflow:hidden`,
- albo układać się inaczej niż krótszy tekst mimo tej samej ramki.

Status: POTWIERDZONA SŁABOŚĆ ALGORYTMU, zależna od treści.

## 4. Pionowe centrowanie treści wielowierszowej

Funkcja `text()` stosuje `display:flex` oraz `align-items:center` do wszystkich pól. Dotyczy to również wielowierszowych pól `CEL PRIORYTETOWY` i `NASTĘPNY KROK`.

W efekcie blok 1-liniowy i blok 2- lub 3-liniowy mają inne optyczne położenie początku tekstu, ponieważ cała grupa linii jest centrowana w wysokości pola.

To może odpowiadać zgłoszeniu użytkownika, że "opisy się poprzesuwały", mimo że same współrzędne X/Y pola nie uległy zmianie.

Status: BARDZO PRAWDOPODOBNY KANDYDAT DO KOREKTY.

## 5. Lista celów

`LISTA CELÓW` używa osobnego kontenera `r129-goals-scroll` z przewijaniem pionowym. Jej geometria jest stała w bazie 852×1846 i nie korzysta z `fitText()`.

Nie znaleziono w audycie statycznym nowej regresji routingu ani zapisu celów. Nie ruszać tej części, dopóki test użytkownika nie wskaże konkretnego problemu.

## Bezpieczna koncepcja późniejszej poprawki

Nie zmieniać rastra, współrzędnych, hotspotów ani danych.

Jeżeli korekta będzie potrzebna, wykonać tylko jeden izolowany patch renderowania tekstu:
1. zachować rozmiary proporcjonalne do szerokości kontenera,
2. nie przełączać jednostek na px w połowie algorytmu,
3. dla treści wielowierszowej ustalić jednoznaczny sposób wyrównania zgodny z referencją (najpewniej stały start Y zamiast content-dependent centering),
4. przetestować ANPOL oraz firmę z dłuższą nazwą i dłuższym celem,
5. dopiero po teście zamrozić nowy punkt.

Status końcowy audytu R129: RASTER I LOGIKA OK; DO DOPIESZCZENIA WYŁĄCZNIE STABILNOŚĆ TYPOGRAFII LIVE.
