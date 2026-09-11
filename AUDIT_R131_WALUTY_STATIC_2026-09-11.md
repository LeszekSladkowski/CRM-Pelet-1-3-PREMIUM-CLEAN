# R131 — WALUTY — STATYCZNY AUDYT K1–K4 — 11.09.2026

Baza audytu: produkcyjny stan `R130 v1.0G` / commit `397c39d3c515bc5e88b87dce19811947c7a53278`.

Audyt jest tylko diagnostyczny. `main` pozostaje nietknięty.

## KARTA 1

MASTER LOCK: R57 / FINAL MASTER.

Potwierdzono, że R57 dopasował współrzędne pięciu hotspotów menu, ale sam wizualny feedback naciśnięcia nadal pochodzi z ogólnej reguły:

```css
.wm-hot.wm-pressed::after {
  inset: 4%;
  border-radius: 16px;
  box-shadow: inset 0 0 0 2px rgba(118,255,0,.75), 0 0 18px rgba(118,255,0,.7);
}
```

Ta reguła nie zna rzeczywistego promienia i obwodu złotego kafla z rastra MASTER. To jest bezpośredni kandydat na zgłoszony przez użytkownika rozjazd zielonego podświetlenia.

Status: DO POJEDYNCZEJ NAPRAWY po zakończeniu audytu.

## KARTA 2

MASTER LOCK: R57 / FINAL MASTER.

R57 prawidłowo wyłącza stary `wm-live-ring` i zachowuje raster oraz mechanizm LIVE. Jednak przycisk `ODŚWIEŻ KURSY` jest nadal zwykłym `wmHot(...)`, więc przy naciśnięciu dziedziczy dokładnie ten sam globalny pseudo-obrys `.wm-hot.wm-pressed::after` co KARTA 1.

Wniosek: problem geometrii zielonego feedbacku nie jest ograniczony architektonicznie tylko do K1. K2 również może wykazywać taki efekt na przycisku ODŚWIEŻ KURSY.

Status: DO TESTU WIZUALNEGO NA S24 ULTRA; bez zmiany przed potwierdzeniem.

## KARTA 3

MASTER LOCK: R66 / FINAL MASTER / PEŁEN SUKCES.

R66 definiuje własną poświatę dla `r66-calc.wm-pressed` i mówi, że PRZELICZ nie może tworzyć drugiej ramki. Jednocześnie globalny `.wm-hot.wm-pressed::after` nadal jest aktywny, bo K3 nie wyłącza pseudo-elementu `::after`.

Potencjalny efekt w chwili dotknięcia PRZELICZ:
1. własny box-shadow R66,
2. równocześnie globalny pseudo-obrys `wm-pressed::after`.

Szybkie przyciski 1000 / 5000 / 10000 również są `wmHot` i mogą chwilowo otrzymywać ogólny pseudo-obrys podczas dotyku, niezależnie od zatwierdzonego stanu `r66-selected`.

Status: POTWIERDZONA KOLIZJA CSS; wymaga tylko sprawdzenia, czy jest wizualnie zauważalna na urządzeniu referencyjnym.

## KARTA 4

MASTER LOCK wskazuje `master-waluty-karta4.png` jako jedyny raster ekranu.

Runtime R76 podmienia jednak obraz na `master-waluty-karta4-r74-runtime-clean.png`. To jest niespójność źródła MASTER, której nie wolno naprawiać automatycznie bez porównania obu grafik.

Jednocześnie K4 ma poprawnie izolowany feedback dotyku:

```css
.wm-page[data-card="4"] .wm-hot::before,
.wm-page[data-card="4"] .wm-hot::after {
  content:none!important;
  display:none!important;
}
```

Czyli K4 jako jedyna karta WALUT jawnie odcina globalny pseudo-obrys i używa własnej poświaty dla PRZELICZ.

Status: GEOMETRIA PRESS — architektonicznie czystsza; RASTER MASTER — niespójność do rozstrzygnięcia.

## WNIOSEK DLA CAŁEJ GAŁĘZI WALUTY

Główna przyczyna potencjalnych rozjazdów zielonego podświetlenia jest wspólna: historyczny globalny efekt `.wm-hot.wm-pressed::after` działa na wielu hotspotach niezależnie od geometrii konkretnego rastra.

Nie należy zmieniać globalnej reguły dla całej aplikacji, bo mogłoby to naruszyć inne zamrożone ekrany. Bezpieczna metoda naprawy:

1. K1 — lokalna reguła tylko dla `data-card="1"` i tylko pięciu kafli menu.
2. Test na Samsung Galaxy S24 Ultra.
3. K2 — dopiero jeśli test potwierdzi rozjazd ODŚWIEŻ KURSY.
4. K3 — jeśli widoczna jest druga ramka, wyłączyć wyłącznie pseudo-element globalny w obrębie `data-card="3"`, pozostawiając własne efekty R66.
5. K4 — nie ruszać feedbacku; osobno rozstrzygnąć raster MASTER.

Każda z tych operacji musi być osobnym commitem i osobnym testem użytkownika.
