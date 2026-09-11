# R131 — WALUTY KARTA 1 — KANDYDAT PRESS FEEDBACK — 11.09.2026

Status: **NIEAKTYWNY / TYLKO GAŁĄŹ AUDYTOWA**.

Produkcja `main` nie została zmieniona. Kandydat znajduje się w `r131-waluty-k1-press-candidate.js` i nie jest importowany przez `sw.js`.

## Zakres

Kandydat dotyczy wyłącznie pięciu głównych kafli KARTY 1:
- KURSY LIVE,
- KALKULATOR WALUT,
- OPŁACALNOŚĆ / MARŻA,
- HISTORIA KURSÓW,
- USTAWIENIA WALUT.

Nie dotyka POWRÓT, LIVE/SYNCHRONIZUJ, dolnej nawigacji, K2/K3/K4, rastra, hotspotów, routingu ani logiki walut.

## Co zostaje dokładnie jak w R57

R57 zmienił geometrie pięciu hotspotów na:
- `[42,721,770,160]`,
- `[42,905,770,159]`,
- `[42,1088,770,155]`,
- `[42,1267,770,153]`,
- `[42,1442,770,157]`.

Te wartości pozostają bez zmian.

Globalny press używa `inset:4%`. Kandydat również pozostawia `inset:4%`, więc pozycja i rozmiar efektu względem hotspotu nie są zmieniane.

## Jedyna proponowana zmiana

Obecnie globalny efekt ma stały:

`border-radius:16px`

Stała wartość w CSS px nie skaluje się 1:1 z rasterem 852x1846. Przy zmianie rzeczywistej szerokości karty promień wizualny względem ramki może się zmieniać, mimo że sam hotspot i `inset:4%` pozostają proporcjonalne.

Kandydat zastępuje promień wyłącznie dla pięciu kafli K1 przez:

`border-radius:3.1% / 15%`

Dla efektywnego pola po `inset:4%` daje to około 22 jednostki wzorca w osi X i Y, zamiast promienia zależnego od CSS-pikseli urządzenia. Cel: zachować taki sam kształt obwodu niezależnie od skali karty.

## Dlaczego nie zmieniamy jeszcze `inset`

R57 został zatwierdzony po ustawieniu hotspotów właśnie pod istniejący `inset:4%`. Zmiana `inset` jednocześnie z promieniem byłaby dwiema zmianami naraz i utrudniłaby diagnostykę.

Dlatego pierwszy test powinien sprawdzać **wyłącznie stabilizację promienia**.

## Warunek aktywacji testowej

Jeżeli zdecydujemy się na test na urządzeniu referencyjnym:
1. utworzyć osobną wersję testową,
2. dołączyć wyłącznie `r131-waluty-k1-press-candidate.js`,
3. nie zmieniać żadnego innego pliku UI,
4. test Samsung Galaxy S24 Ultra,
5. sprawdzić każdy z pięciu kafli osobno,
6. PASS -> osobny VERIFIED checkpoint; FAIL -> rollback jednym commitem.

## Kryterium PASS

Po naciśnięciu zielona poświata ma pokrywać się optycznie z istniejącym obwodem ramki na całej długości i w narożnikach, bez drugiej ramki, bez przesunięcia góra/dół i bez naruszenia obszaru tekstu.
