# R131 — ROZSTRZYGNIĘCIE LINII HISTORYCZNEJ — 11.09.2026

Baza produkcyjna pozostaje bez zmian: `main` / `R130 v1.0G` / commit `397c39d3c515bc5e88b87dce19811947c7a53278`.

Ten dokument niczego nie zmienia w runtime. Porządkuje wyłącznie pochodzenie kilku pozornie sprzecznych MASTER-ów.

## 1. WALUTY KARTA 1 — dzisiejszy rozjazd nie jest późniejszą regresją

R57 w commicie `046ad62a3530b2fb60402ed1487c20cb26c60ca0` zmienił wyłącznie geometrie pięciu hotspotów K1 tak, aby istniejący globalny efekt `.wm-hot.wm-pressed::after` wpadał w złote ramki rastra.

Po R57 kolejne aktywne warstwy (`R66 -> R76 -> R124/R123 -> R127 -> R130`) nie wprowadzają nowego selektora dla `.wm-page[data-card="1"]` ani nie zmieniają pięciu geometrii R57.

Wniosek: obecnie widoczna drobna niedokładność efektu naciśnięcia K1 nie pochodzi z R128/R129/R130 ani z dzisiejszego sprzątania. Jest cechą samej konstrukcji R57: hotspot ma geometrię dopasowaną do kafla, ale pseudo-obrys nadal jest generowany przez globalne `inset:4%` i stały `border-radius:16px`.

To ważne, bo naprawa nie wymaga cofania późniejszych warstw. Powinna być pojedynczym, lokalnym CSS tylko dla K1.

## 2. WALUTY KARTA 3 — potwierdzenie ryzyka podwójnego efektu

R66 definiuje własne zachowanie `.r66-calc.wm-pressed` jako poświatę bez ramki. Jednocześnie bazowy globalny `.wm-hot.wm-pressed::after` nadal tworzy pseudo-obrys dla każdego `wm-hot`.

R66 nie wyłącza globalnego `::after` dla K3. Zatem w chwili naciśnięcia PRZELICZ mogą być aktywne równolegle dwa efekty.

Nie zmieniać bez testu urządzenia. Jeżeli S24 Ultra pokaże drugi obrys, chirurgiczna poprawka powinna wyłączyć wyłącznie `::after` w obrębie K3 i zachować istniejący glow R66.

## 3. WALUTY KARTA 4 — konflikt dokumentacji wyjaśniony chronologią

`WALUTY_KARTA4_GRAPHIC_MASTER_LOCK.md` z rana 02.09.2026 wskazuje bezpośredni raster `master-waluty-karta4.png`.

Później tego samego dnia powstał R74. Commit `6209535e87fac779649bd9802d1b62fde624ce0f` buduje `master-waluty-karta4-r74-runtime-clean.png` bezpośrednio z zatwierdzonego `master-waluty-karta4.png`, usuwając z kopii miejsca przeznaczone na dynamiczne pola, LIVE i pojedynczą wskazówkę. Następnie R74 został wdrożony jako FINAL SURGICAL, a R76 wykonał ostatnie chirurgiczne czyszczenie ducha wskazówki.

Co najważniejsze: późniejsze porządki R84 i R92 jawnie przywracają/utrzymują R76 jako stabilną bazę WALUT.

Wniosek: różnica nazwy pliku K4 nie jest przypadkowym późnym nadpisaniem przez R130. Jest świadomym późniejszym etapem stabilnej linii R74/R76. Stary lock pozostaje wartościowym zapisem wcześniejszego etapu, ale nie powinien sam w sobie służyć do automatycznego cofania K4 do surowego PNG.

Decyzja audytowa: K4 pozostawić nietkniętą. Nie podmieniać rastra podczas R131.

## 4. DANE FIRMY — stary lock jest rollbackiem, nie opisem obecnej linii R117/R119

`RYNKI_EU_DANE_FIRMY_MASTER_LOCK.md` powstał 04.09.2026 przed wdrożeniem R86/R87 i zawiera dokładny hash ówczesnego źródła.

Chronologia repo pokazuje następnie:
- R86/R87 — wdrożenie i hard gate tego MASTER-a,
- R90/R91 — diagnoza i próby naprawy,
- R92 — świadome odłączenie eksperymentalnej warstwy DANE FIRMY i powrót do stabilnej bazy,
- 08.09.2026: R117 — ponowna aktywacja DANE FIRMY jako nowej wersji testowej,
- R118/R119 — kolejne chirurgiczne ustawienie pól, synchronizacja pozostająca na karcie i centrowanie danych.

Wniosek: nie należy oczekiwać, że aktywny raster R117/R119 będzie miał hash oryginalnego źródła z locka 04.09. Różnica hash/rozmiaru jest zgodna z faktem, że późniejsza linia została zbudowana ponownie po R92.

Natomiast osobnym realnym problemem pozostaje to, że R123 modyfikuje pozycję i rozmiar nazwy firmy przez `out.replace(...)`. To jest ingerencja modułu OFERTA w DANE FIRMY i kwalifikuje się do późniejszego chirurgicznego rozdzielenia po ponownej walidacji wizualnej karty.

## 5. Zaktualizowana kwalifikacja ryzyka

- K1 WALUTY: **potwierdzona lokalna niedoskonałość efektu press, bez późniejszej regresji**.
- K3 WALUTY: **potencjalny podwójny press effect, do testu S24**.
- K4 WALUTY: **nie cofać; R76 jest świadomie utrzymaną stabilną linią**.
- DANE FIRMY hash: **historyczna zmiana linii po R92, nie automatycznie błąd**.
- DANE FIRMY nazwa z R123: **realny cross-module side effect**.

## 6. Następny bezpieczny krok

Pierwszym kandydatem do pojedynczej poprawki pozostaje WALUTY KARTA 1 — tylko lokalny press feedback. Bez zmiany rastra, hotspotów, routingu, danych ani pozostałych kart. Poprawka ma najpierw powstać jako nieaktywowany kandydat na gałęzi audytowej, a dopiero po przeglądzie trafić do osobnej wersji testowej.