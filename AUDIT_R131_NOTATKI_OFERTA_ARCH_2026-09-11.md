# R131 — NOTATKI O FIRMIE / OFERTA — AUDYT ARCHITEKTURY — 11.09.2026

Baza: produkcyjny `R130 v1.0G`. Audyt tylko na gałęzi diagnostycznej; `main` bez zmian.

## 1. NOTATKI O FIRMIE — główna karta

`R128_NOTATKI_O_FIRMIE_FINAL_MASTER_LOCK.md` wskazuje jako zamrożony silnik głównej karty `r128-notatki-main-v45b.js`, wersję R128 v4.5I oraz raster `file_00000000c0ac8210a2eab26769101d1e.png` 852×1846.

Aktualny `r128-notatki-main-v45b.js` nadal deklaruje R128 v4.5I i używa tej samej geometrii nazwy firmy, metadanych oraz czterech stref tekstowych wraz z miękkim kinetic scroll.

Status: POZYTYWNE — w audycie statycznym nie znaleziono późniejszej świadomej podmiany geometrii głównej karty. Nie ruszać.

## 2. NOTATKI — karty szczegółowe

`r128-notatki-live.js` v4.6C deklaruje, że główna karta R128 v4.5I pozostaje nietknięta i obsługuje osobno szczegóły.

Warstwa szczegółów korzysta jednak z mechanizmu:
- rozmiar startowy fontu w `cqw` / `vw`,
- późniejsze `fitBlock()` zmniejszające font w `px`,
- część pól może używać pionowego centrowania.

To jest podobny wzorzec do problemu odkrytego w CELE ASYSTENTA. Nie jest to obecnie potwierdzony błąd wizualny NOTATEK, ale stanowi kandydat do testu dla długiej i krótkiej treści.

Status: RYZYKO TYPOGRAFII LIVE, bez zmiany przed testem.

## 3. OFERTA — aktywny MASTER jest składany z fragmentów

R127 (`sw-r127-language-base.js`) nie ładuje jednego prostego pliku obrazu. Składa runtime MASTER z fragmentów base64:
- `r125-offer-master-q8/part-01.b64` ... `part-06.b64`,
- `r126-offer-master-final/p07a.b64` ... `p07d.b64`,
- `r125-offer-master-q8/part-08.b64`.

Assembler usuwa białe znaki i sprawdza:
- oczekiwane długości części,
- łączną długość base64 `140940`,
- długość binarną `105704`.

Wszystkie aktywnie referencjonowane fragmenty są obecne w repozytorium. Jest to pozytywny mechanizm kontroli kompletności.

Status: BRAK BRAKU PLIKU W AKTYWNYM ŁAŃCUCHU OFERTY.

## 4. OFERTA — osierocony / zastąpiony historyczny part-07

Katalog `r125-offer-master-q8` nadal zawiera `part-07.b64` (20048 B), ale aktualny assembler R127 już go nie używa; środkowy fragment nr 7 został zastąpiony czterema plikami R126 `p07a`–`p07d` po 5000 B.

To wygląda na historyczny artefakt / kandydat do przyszłego cleanupu, ale NIE WOLNO go usuwać podczas audytu, ponieważ:
- może być potrzebny do reprodukcji wcześniejszego MASTER-a,
- porządki repo są zaplanowane dopiero po zakończeniu audytu i nowym zweryfikowanym rollback point.

Status: KANDYDAT DO CLEANUPU PÓŹNIEJ, NIE BŁĄD RUNTIME.

## 5. OFERTA — warstwowość

R127 importuje R125, a R125 importuje R119. Generator i wizualny MASTER są więc wynikiem kilku historycznych warstw. To działa, ale utrudnia jednoznaczne określenie, która warstwa jest właścicielem danej geometrii lub tekstu.

Wniosek: nie wykonywać teraz refaktoru OFERTY. Najpierw skończyć testy wizualne i UI. Dopiero po utworzeniu nowego stabilnego punktu powrotnego można rozważyć spłaszczenie aktywnego generatora do jednej warstwy.

## Werdykt

- główna karta NOTATKI — wygląda integralnie względem locka,
- szczegóły NOTATEK — do testu typografii dla różnych długości,
- OFERTA — wszystkie aktywne fragmenty są obecne i assembler ma kontrolę długości,
- stary `part-07.b64` — nieaktywny kandydat do przyszłego cleanupu, ale obecnie zachować.
