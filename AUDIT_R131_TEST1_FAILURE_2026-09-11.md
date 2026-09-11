# R131 — TEST 1 FAILED — WALUTY — 11.09.2026

## Wynik testu na Samsung Galaxy S24 Ultra

TEST 1 (`R131 TEST 1 — WALUTY K1 PRESS RADIUS`) nie został zatwierdzony.

Na zrzutach użytkownika potwierdzono dwa odrębne problemy:

1. KARTA 1 — zielony efekt naciśnięcia nadal nie pokrywa obwodu rastra. Sama zmiana `border-radius` nie może rozwiązać problemu, ponieważ złote ramki pięciu kafli K1 mają ścięte / fazowane narożniki, a aktualny efekt jest rysowany jako zaokrąglony prostokąt.
2. Pojawiły się czarne ekrany z widocznymi wyłącznie absolutnymi zielonymi elementami LIVE. Taki obraz jest zgodny z sytuacją, w której raster `wm-master` nie zostaje załadowany, podczas gdy warstwy absolutne pozostają aktywne.

## Ważne ustalenie techniczne

Bazowy WALUTY runtime ma:
- `.wm-canvas { height:auto }`,
- raster `.wm-master` jako element nadający canvasowi naturalną wysokość,
- `wmBase()` ustawia `aspectRatio` dopiero po zdarzeniu `load` obrazu.

Jeżeli raster nie dojdzie lub request z wersjonującym query-stringiem nie znajdzie fallbacku cache, canvas może pozostać bez wysokości i warstwy absolutne wizualnie zbiegną się do góry — zgodnie z czarnymi zrzutami użytkownika.

Wcześniejszy audyt cache już wskazał ryzyko: ASSETS zapisują główne rastry bez query-stringa, natomiast runtime K1/K2 żąda `master-waluty-kartaN.png?v=R43-LIVE-HARD-FIX`. Fallback `caches.match(e.request)` jest domyślnie zależny od pełnego klucza requestu.

## Decyzja

- TEST 1: ODRZUCONY / NIE MASTER.
- Produkcja została przywrócona do treści R130 v1.0G.
- Nie kontynuować korekty promienia K1, dopóki nie zabezpieczymy stabilnego ładowania rastra.
- Następny test ma dotyczyć wyłącznie odporności ładowania rastra K1/K2 i nie może zmieniać wyglądu po poprawnym załadowaniu grafiki.
- Dopiero po pozytywnym teście powrócić do efektu press K1; wtedy użyć geometrii fazowanej (polygon/SVG), a nie `border-radius`.
