# R131 — GŁĘBOKI AUDYT AKTUALIZATORA / CACHE / BACKUPÓW — 11.09.2026

Audyt diagnostyczny. Produkcyjny `main` bez zmian.

## 1. Co działa prawidłowo

- Przed właściwą aktualizacją aplikacja tworzy automatyczny snapshot danych lokalnych.
- Nowy Service Worker jest pobierany przez `registration.update()`.
- Gdy nowy worker czeka, runtime wysyła `SKIP_WAITING` i czeka na aktywację.
- Nawigacja (`mode === navigate`) działa network-first, a przy braku sieci korzysta z zapisanego `index.html`.
- `version.json`, dane CRM i główne rastry WALUT są pobierane network-first.
- Funkcja WYCZYŚĆ CACHE usuwa cache aplikacji i wyrejestrowuje Service Workera, ale nie kasuje danych CRM/localStorage/IndexedDB.

## 2. Wersja serwerowa jest porównywana tylko przez `!==`

Obecna logika:

```js
const newer=info.version&&info.version!==APP_VERSION;
```

oraz w instalatorze:

```js
if(info.version===APP_VERSION) return;
```

Oznacza to, że dowolna inna wersja serwera jest traktowana jako aktualizacja — także wersja starsza lub testowa.

Ryzyko jest niewielkie przy zwykłej pracy wyłącznie z `main`, ale rośnie podczas rollbacków i wersji testowych. Docelowo updater powinien używać monotonicznego `buildNumber` lub jawnego porządku wersji zamiast samej nierówności stringów.

Nie poprawiać tego podczas audytu UI. Osobny późniejszy commit.

## 3. Nazwa cache nadal pochodzi z R54

Core Service Workera definiuje:

`CACHE='crm-pelet-1-3-r54-waluty-karta2-raster-restore'`

Późniejsze warstwy aż do R130 zmieniają runtime, wersję i listę ASSETS, ale nie zmieniają identyfikatora cache.

Funkcjonalnie instalacja nadal odświeża ASSETS przez `cache.addAll()`, więc nie jest to automatycznie błąd danych. Jest to jednak silny dług diagnostyczny: cache R130 wygląda jak cache R54.

Docelowo nowy zweryfikowany punkt powrotny powinien dostać nowy identyfikator cache, ale dopiero po zakończeniu audytu i testach.

## 4. Ryzyko offline: query-string runtime vs cache instalacyjny

Bazowe ASSETS zawierają np.:

`./master-waluty-karta1.png`

Runtime otwiera jednak raster jako:

`master-waluty-karta1.png?v=R43-LIVE-HARD-FIX`

R76 analogicznie ładuje K4 jako:

`master-waluty-karta4-r74-runtime-clean.png?v=R76-final-1758`

podczas gdy lista R76_K4_ASSETS zawiera wersję bez query-stringa.

Cache API domyślnie rozróżnia klucz z query od klucza bez query. Przy pierwszym użyciu online nie ma problemu, bo żądanie z query zostanie pobrane i zapisane. Natomiast po świeżej instalacji, jeżeli aplikacja przejdzie offline zanim dany ekran został otwarty online, fallback może nie znaleźć odpowiednika zapisanej wersji bez query.

To jest realne ryzyko odporności offline, nie potwierdzony błąd dzisiejszego UI.

Docelowa naprawa: ujednolicić klucze ASSETS i runtime albo w fallbacku używać kontrolowanego `ignoreSearch:true` dla statycznych assetów wersjonowanych query-stringiem.

## 5. `backup-catalog.json` jest pusty

Aktualny plik ma:

```json
{"entries": []}
```

Bazowy ekran MAGAZYN BACKUPÓW pobiera właśnie ten katalog. Jednocześnie późniejsza warstwa R124 usuwa stare automatyczne oznaczenie pierwszego wpisu katalogu jako R38 i zmienia komunikat na zasadę: lokalne kopie pozostają w Magazynie, a zweryfikowane MASTER-y są zabezpieczone w GitHub.

W praktyce więc obecny Magazyn Backupów nie jest katalogiem wszystkich historycznych MASTER-ów aplikacji — pokazuje przede wszystkim lokalne snapshoty urządzenia.

To jest zgodne z nowszym komunikatem R124, ale nie ze starszymi komentarzami kodu R85 mówiącymi o `R38 z katalogu + 2 lokalne kopie`.

Wniosek: komentarz R85 jest historycznie nieaktualny. Nie odtwarzać sztucznie R38 w katalogu bez decyzji użytkownika.

## 6. Retencja lokalna = maksymalnie 2 rekordy

`r84-backup-prune.js` zachowuje dwa najnowsze rekordy IndexedDB i usuwa starsze.

To oznacza, że automatyczny backup przed aktualizacją nie tworzy trwawego wielowersyjnego archiwum na telefonie. Długoterminowymi punktami powrotu pozostają GitHub/commity i ewentualne ręcznie wyeksportowane pliki.

To jest polityka, nie awaria. Wymaga tylko świadomego potwierdzenia przed ewentualną zmianą.

## 7. Import ZIP ma dwa różne zastosowania

Backup tworzony wewnętrznie przez aplikację używa prostego ZIP STORE z pojedynczym `backup.json` i ten format parser potrafi odczytać.

Jeżeli użytkownik poda zwykły skompresowany ZIP (np. DEFLATE), parser nie rozpakowuje go jako backup danych i traktuje plik jako pakiet aplikacji do magazynu. Dla obecnego workflow jest to akceptowalne, ale etykieta `IMPORTUJ ZIP / JSON` może sugerować szerszą obsługę niż faktycznie istnieje.

Nie zmieniać teraz. Test funkcjonalny powinien później rozdzielić: `backup danych` vs `pakiet aplikacji`.

## 8. Klasyfikacja

- updater backup-before-update: **OK**,
- aktywacja Service Workera: **OK**,
- porównywanie wersji: **do wzmocnienia**,
- nazwa cache R54 przy runtime R130: **dług techniczny**,
- query-string/offline cache: **realne ryzyko odporności offline**,
- pusty backup-catalog: **zgodny z nowszą architekturą, ale dokumentacja historyczna niespójna**,
- lokalna retencja 2: **świadoma polityka / do decyzji**,
- ZIP import: **ograniczony format, do późniejszego testu**.

## 9. Decyzja na czas R131

Nie dotykamy updatera, cache ani backupów przed zakończeniem korekt wizualnych. Wyniki są zapisane, aby nie mieszać napraw UI z architekturą aktualizacji.