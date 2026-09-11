# R131 — RYNKI EU / DANE FIRMY — AUDYT STATYCZNY — 11.09.2026

Baza: produkcyjny `R130 v1.0G`, commit `397c39d3c515bc5e88b87dce19811947c7a53278`. Audyt wyłącznie diagnostyczny; `main` bez zmian.

## 1. RYNKI EU — główna karta

`RYNKI_EU_FINAL_MASTER_LOCK.md` zamraża stan R51 R38 FINAL FRAME FIT na Samsung Galaxy S24 Ultra: pełną geometrię, header/footer, POWRÓT, SYNCHRONIZUJ, statystyki LIVE, filtry, kafle krajów, pionowy scroll i pinch-to-zoom.

W późniejszych warstwach R119 / R123 / R127 nie znaleziono bezpośredniej ponownej implementacji `r48R38Viewport`. Jest to pozytywny sygnał: późniejsze moduły nie wyglądają na świadomie nadpisujące końcowy viewport RYNKI EU.

Status: BRAK POTWIERDZONEJ REGRESJI RYNKI EU w audycie statycznym. Nie zmieniać globalnych reguł `.screen`, hotspotów ani gestów bez testu tej karty.

## 2. DANE FIRMY — twarda niespójność integralności rastra

`RYNKI_EU_DANE_FIRMY_MASTER_LOCK.md` definiuje dokładne źródło zatwierdzone 04.09.2026:
- wymiar źródła: `709 × 1536 px`,
- format bajtów: JPEG/JFIF mimo nazwy `.png`,
- rozmiar: `265333 B`,
- SHA-256: `5859c8ef9ac3f9585ef4e027bf00f1110be17ecb043355faca55eb282624992b`.

Aktualny runtime R119 używa:
`grafiki/rynki-eu/szczegoly-firmy/file_00000000efac81f5a82658b087ae09a7.png`.

Aktualny plik w repo ma rozmiar `1282455 B` i Git blob SHA `76003bb1c64f42828b38aa23c43f5492a08663f9`.

Wniosek: aktualny asset NIE MOŻE być dokładnie tym samym zbiorem bajtów, który opisuje MASTER LOCK (różnica rozmiaru jest jednoznaczna). Może być wizualnie podobny lub przetworzony, ale integralność 1:1 wg blokady nie jest zachowana.

Status: POTWIERDZONA NIESPÓJNOŚĆ MASTER LOCK ↔ AKTUALNY ASSET. Nie podmieniać automatycznie bez odnalezienia zatwierdzonego źródła i porównania na urządzeniu referencyjnym.

## 3. DANE FIRMY — późniejsza ukryta zmiana geometrii nazwy firmy

R119 tworzy nazwę firmy jako:
`r117Field(s,c.name,355,235,285,22,...)`.

Późniejsza warstwa R123 w `sw-r125-base.js`, mimo deklaracji że R120 DANE FIRMY pozostaje bez zmian, wykonuje replacement do:
`r117Field(s,c.name,405,226,310,(String(c.name||'').length<=10?30:String(c.name||'').length<=18?24:18),...)`.

Czyli po zamrożeniu DANE FIRMY późniejszy moduł OFERTA realnie zmienia:
- X: 355 → 405,
- Y: 235 → 226,
- szerokość: 285 → 310,
- rozmiar fontu: stałe 22 → zależny od długości nazwy 30/24/18.

To jest potwierdzona mutacja innego MASTER-a przez późniejszą warstwę i może powodować różne optyczne położenie firm o krótkich i długich nazwach.

Status: POTWIERDZONA KOLIZJA ARCHITEKTONICZNA. Nie naprawiać teraz w `main`; późniejsza korekta powinna usunąć tę zależność z warstwy OFERTA i ustalić jedno źródło geometrii DANE FIRMY po teście referencyjnym.

## 4. Typografia LIVE DANE FIRMY

`r117Field()` używa procentów opartych o 852×1846 oraz `clamp(minPx, vw, maxPx)`, `overflow:hidden` i opcjonalnie `text-overflow:ellipsis`.

Ryzyko: przy różnych szerokościach viewportu i długościach danych widoczny tekst może optycznie różnić się od statycznego wzorca, nawet przy tych samych procentowych współrzędnych.

Status: DO TESTU TREŚCI KRÓTKIEJ / DŁUGIEJ na S24 Ultra.

## Bezpieczny plan późniejszej naprawy

1. Najpierw odnaleźć / potwierdzić prawdziwy zatwierdzony raster DANE FIRMY.
2. Porównać aktualny ekran z referencją na S24 Ultra.
3. Osobnym commitem usunąć zmianę nazwy firmy w warstwie R123/OFERTA lub przenieść właściwą geometrię do jednego źródła.
4. Nie zmieniać pozostałych pól DANE FIRMY w tym samym kroku.
5. Test użytkownika → dopiero wtedy VERIFIED / MASTER.
