# R131 — MACIERZ AUDYTU I KOLEJNOŚĆ NAPRAW — 11.09.2026

Baza produkcyjna pozostaje `R130 v1.0G` / `397c39d3c515bc5e88b87dce19811947c7a53278`.

| Obszar | Stan audytu | Ryzyko | Decyzja |
|---|---|---:|---|
| WALUTY K1 — press | potwierdzona słabość globalnego `wm-pressed::after` | średnie / widoczne | pierwsza pojedyncza poprawka po ustaleniu dokładnej geometrii z referencji |
| WALUTY K2 — ODŚWIEŻ | dziedziczy ten sam globalny press | niskie–średnie | tylko jeśli test S24 potwierdzi rozjazd |
| WALUTY K3 — PRZELICZ | własny glow + możliwy globalny pseudo-obrys | średnie | sprawdzić wizualnie; ewentualnie lokalnie wyłączyć `::after` |
| WALUTY K4 — raster | MASTER LOCK i runtime wskazują różne pliki | wysokie integralnościowo | nie ruszać bez porównania referencji |
| CELE ASYSTENTA | raster/logika OK; niestabilność typografii LIVE | średnie | druga osobna poprawka po WALUTY K1 |
| AKCJE I STATUS | geometria w v1.0A + wtórny layout-fix v1.0G | średnie utrzymaniowo | test sekcja po sekcji; nie dokładać trzeciego patcha |
| RYNKI EU główne | brak potwierdzonej późniejszej regresji | niskie | pozostawić zamrożone |
| DANE FIRMY — raster | dokładne bajty assetu nie zgadzają się z MASTER LOCK | wysokie integralnościowo | odnaleźć/potwierdzić prawdziwy raster przed zmianą |
| DANE FIRMY — nazwa | R123 później zmienia X/Y/szerokość/font nazwy firmy | wysokie architektonicznie | po referencji usunąć mutację z warstwy OFERTA osobnym krokiem |
| NOTATKI główne | aktualny silnik odpowiada lockowi v4.5I | niskie | nie ruszać |
| NOTATKI szczegóły | mieszane cqw/vw -> px w dopasowaniu tekstu | niskie–średnie | test długich treści, bez zmiany na ślepo |
| OFERTA | aktywny MASTER składany z istniejących fragmentów i walidowany długością | niskie runtime | nie refaktoryzować podczas audytu |
| OFERTA part-07 | stary fragment nieużywany przez R127 | cleanup | zachować do końca audytu / rollbacku |
| Aktualizator — wersje | `!==` traktuje każdą inną wersję jako nowszą | średnie | później dodać monotoniczny build/version compare |
| Backupy — retencja | R85 automatycznie zachowuje tylko 2 lokalne rekordy | średnie–wysokie | decyzja o polityce retencji po audycie |
| Import ZIP | ręczny parser bez jawnej obsługi DEFLATE | średnie | test rzeczywistych ZIP; później poprawić osobno |
| README | opisuje R97 zamiast R130 | dokumentacyjne | aktualizacja na samym końcu po nowym VERIFIED |

## Kolejność bezpieczna

1. Nie ruszać `main` do zakończenia bieżącego audytu diagnostycznego.
2. Pierwsza naprawa: WALUTY K1 — tylko press feedback, bez zmian rastra/hotspotów/logiki.
3. Test Samsung Galaxy S24 Ultra.
4. Jeśli PASS — osobny VERIFIED checkpoint.
5. Druga naprawa: CELE ASYSTENTA — wyłącznie stabilizacja typografii LIVE.
6. Test i checkpoint.
7. Rozstrzygnięcie DANE FIRMY / K4 raster na podstawie prawdziwych referencji.
8. Dopiero potem logika aktualizacji / backupów.
9. Na końcu cleanup repo + README + nowy stabilny punkt powrotny.

## Zasada krytyczna

Nie łączymy napraw UI, zmian danych, cleanupu i refaktoru runtime w jednym commicie. Każda rzecz ma mieć osobny test użytkownika na urządzeniu referencyjnym.
