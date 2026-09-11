# R131 — USTAWIENIA / AKTUALIZACJE / BACKUPY — AUDYT STATYCZNY — 11.09.2026

Baza: produkcyjny `R130 v1.0G`, bez zmian `main`.

## 1. Sprawdzanie wersji — różne = nowsze

Aktualny `r20CheckUpdate()` pobiera `version.json` z `cache:'no-store'`, co jest poprawne dla świeżości danych. Następnie jednak ustala dostępność aktualizacji przez:

```js
const newer=info.version&&info.version!==APP_VERSION;
```

To nie porównuje kolejności wersji. Każda inna wartość serwera jest traktowana jako „Dostępna nowa wersja” — również wersja starsza, błędna lub testowa.

`r20UpdateNow()` również zatrzymuje się tylko wtedy, gdy `info.version===APP_VERSION`; przy dowolnej innej wartości tworzy backup i uruchamia `ServiceWorker.update()`.

Status: POTWIERDZONA SŁABOŚĆ LOGIKI WERSJI. Na obecnym pojedynczym kanale publikacji może nie powodować błędu, ale przy rollbacku / testowej wersji serwera może opisać downgrade jako update.

Bezpieczna późniejsza poprawka: jedno źródło porównania wersji/release albo jawny monotoniczny numer buildu. Nie poprawiać razem z UI.

## 2. Bezpieczny element aktualizacji

Przed aktualizacją `r20UpdateNow()` tworzy lokalny snapshot danych, dopiero potem wywołuje aktualizację Service Workera. To jest poprawna kolejność bezpieczeństwa.

`r20ClearCache()` usuwa tylko cache o prefiksie `crm-pelet-`, wyrejestrowuje Service Workera i deklaruje pozostawienie danych CRM / backupów. Nie usuwa localStorage ani bazy IndexedDB backupów.

Status: POZYTYWNE — nie znaleziono w tym miejscu bezpośredniego kasowania danych CRM.

## 3. Magazyn backupów — twardy automatyczny pruning

Plik `r84-backup-prune.js` (nagłówek R85) uruchamia się automatycznie po 250 ms. Otwiera `crm_pelet_13_backups_v1 / backups`, sortuje wszystkie rekordy po `createdAt` i zachowuje wyłącznie `KEEP=2` najnowsze. Wszystkie starsze lokalne rekordy są kasowane z IndexedDB.

Ważne: pruning nie rozróżnia źródła / typu / ręcznie ważnego lokalnego backupu. Kryterium to wyłącznie czas utworzenia. Użytkownik widzi więc katalogowy punkt + maksymalnie dwa lokalne rekordy, ale trzeci i starsze lokalne snapshoty znikają automatycznie.

Status: DZIAŁANIE ZAMIERZONE HISTORYCZNIE, ALE WYSOKIE RYZYKO DLA NOWEGO SYSTEMU PUNKTÓW POWROTNYCH. Przed dalszymi pracami nie wolno zakładać, że lokalny Magazyn Backupów jest archiwum wszystkich ważnych punktów. Zweryfikowane punkty powrotne muszą być zabezpieczane w GitHub.

Nie zmieniać teraz retencji na produkcji. Po zamknięciu audytu zdecydować osobnym krokiem, czy KEEP=2 nadal jest właściwą polityką.

## 4. Import ZIP / JSON — ograniczony parser ZIP

Kod importu próbuje ręcznie odczytać pierwszy lokalny nagłówek ZIP i bezpośrednio przekazuje pobrane bajty do `TextDecoder`, po czym `JSON.parse()`.

Nie widać tu obsługi metody kompresji DEFLATE ani pełnego parsera central directory. Jeżeli ZIP nie zawiera pierwszego wpisu jako nieskompresowanego JSON w oczekiwanym układzie, odczyt JSON się nie uda i plik jest klasyfikowany jako `packageOnly` — pakiet aplikacji, a nie backup danych.

Status: OGRANICZENIE IMPLEMENTACJI / DO TESTU na rzeczywistych eksportowanych ZIP-ach. Nie nazywać jeszcze utratą danych; import JSON pozostaje prostszą ścieżką diagnostyczną.

## 5. Status „WSZYSTKO OK”

Karta AKTUALIZACJA APLIKACJI renderuje początkowo `STATUS SYSTEMU — WSZYSTKO OK` zanim zakończy się sieciowe sprawdzenie wersji. Późniejszy check aktualizacji aktualizuje pasek i tekst, ale ten kafel jest wizualnie optymistyczny.

Status: DROBNA NIESPÓJNOŚĆ SEMANTYCZNA, nie błąd silnika.

## Werdykt

Silnik aktualizacji ma dobry fundament: `no-store`, backup przed update, Service Worker i osobne czyszczenie cache. Do przyszłego chirurgicznego dopracowania są trzy niezależne tematy:
1. prawdziwe porównywanie wersji zamiast `!==`,
2. decyzja o retencji `KEEP=2`,
3. poprawny parser/import ZIP backupów.

Każdy temat osobno, dopiero po zakończeniu UI audytu i po zabezpieczeniu punktu rollback w GitHub.
