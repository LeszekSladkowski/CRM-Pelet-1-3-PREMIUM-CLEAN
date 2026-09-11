# R131 — AKCJE I STATUS R130 — AUDYT STATYCZNY — 11.09.2026

Baza audytu: produkcyjny `R130 v1.0G`, commit `397c39d3c515bc5e88b87dce19811947c7a53278`.

## 1. Stan wersji

`version.json` nadal oznacza R130 v1.0G jako `TEST LIVE — CHIRURGICZNE DOPASOWANIE WARSTWY LIVE...`, a nie jako finalnie zamknięty MASTER.

Wniosek: ta karta zgodnie z samą metadokumentacją wymaga jeszcze walidacji końcowej.

## 2. Dwa źródła geometrii

Silnik `r130-akcje-status-live.js` tworzy całą warstwę LIVE i nadal opisuje się jako R130 v1.0A.

Następnie `r130-akcje-status-layout-fix.js` R130 v1.0G:
- skanuje bezpośrednie absolutne DIV-y,
- odczytuje ich aktualne współrzędne,
- rozpoznaje elementy przez porównania `near(...)` z tolerancją 2.8 px,
- przesuwa je do nowych osi wzorca 852×1846,
- oznacza element flagą `dataset`, aby drugi raz go nie korygować.

Ostateczna geometria jest więc wynikiem połączenia bazowego kodu v1.0A i wtórnego korektora v1.0G.

Status: POTWIERDZONE RYZYKO UTRZYMANIOWE.

## 3. Ryzyko zależności od współrzędnych wejściowych

Korektor v1.0G identyfikuje element na podstawie jego pozycji przed korektą, np. `near(x,142)&&near(y,177)` albo `near(y,1146)`.

Jeżeli wcześniejszy silnik lub inna warstwa zmieni pozycję wejściową o więcej niż tolerancja, dana reguła może przestać się uruchamiać bez jawnego błędu JavaScript.

To jest szczególnie ważne przy przyszłych zmianach tekstów, nowych elementach lub refaktorze.

Status: RYZYKO, NIE POTWIERDZONY BŁĄD BIEŻĄCY.

## 4. Mieszany mechanizm skalowania tekstu

R130 korzysta z podobnego mechanizmu jak R129:
- rozmiar początkowy `cqw` / `vw`,
- późniejsze zmniejszanie przez `fitText()` w `px`.

Dlatego R130 również może być podatny na optyczne różnice przy dłuższych treściach, zwłaszcza w statusach, alertach i planowanych akcjach.

Status: DO TESTU TREŚCI DŁUGIEJ I KRÓTKIEJ.

## 5. Pozytywne elementy

- raster MASTER 852×1846 nie jest modyfikowany przez korektor,
- dane, statusy, alerty, zadania i localStorage pozostają w silniku bazowym,
- R128 i R129 są dołączane osobno i korektor R130 działa tylko na `.r130-actions-live`, więc nie powinien bezpośrednio przesuwać elementów tych wcześniejszych kart,
- cache-busting R130 v1.0G jest jawnie zsynchronizowany w `sw.js`.

## Wniosek audytu

Nie dokładać kolejnego `layout-fix` na R130.

Najpierw należy wykonać test sekcja po sekcji na S24 Ultra:
1. nagłówek firmy,
2. pasek klasyfikacji,
3. AKTUALNY STATUS,
4. NASTĘPNY KONTAKT,
5. POWIADOMIENIA / ALERTY,
6. SZYBKA ZMIANA STATUSU,
7. PLANOWANE AKCJE / ZADANIA,
8. metryka dolna i powroty.

Jeżeli znajdziemy błąd, naprawa powinna trafić do jednego źródła geometrii. Po pełnej walidacji warto rozważyć scalenie współrzędnych v1.0G bezpośrednio do silnika LIVE i usunięcie wtórnego korektora dopiero w osobnym, bezpiecznym etapie z rollbackiem.

Status końcowy: R130 FUNKCJONALNY, ALE JESZCZE NIE UZNAWAĆ ZA FINAL MASTER.
