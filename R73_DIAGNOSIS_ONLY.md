R73 DIAGNOSIS ONLY — NIE WDRAŻAĆ.

Na podstawie testu użytkownika z 02.09.2026:
- R72 funkcjonalnie: PRZELICZ działa, dynamiczna wskazówka działa, LIVE działa i animacja jest prawidłowa.
- R72 wizualnie: NIEAKCEPTOWALNY.
- Główna przyczyna: runtime canvas + blank() maski naruszają WALUTY_KARTA4_GRAPHIC_MASTER_LOCK (zakaz czarnych prostokątnych masek i widocznych canvasów maskujących raster).
- Objawy: pozostałości liter pod kodami walut (PLNN/CZKN/CHFN), duch flagi w WALUTA ZAKUPU, czarne podkłady pod wartościami, druga statyczna wskazówka, obcięta marża/status.
- Nie wolno naprawiać kolejnymi nakładkami.
- Docelowo: zachować master-waluty-karta4.png jako nienaruszony plik archiwalny; przygotować osobny czysty raster roboczy 852x1846 wyłącznie po wyraźnej zgodzie użytkownika, z usuniętymi wypalonymi wartościami i statyczną wskazówką; runtime ma dodawać tylko dynamiczne teksty, jedną wskazówkę i dwie zielone strzałki LIVE bez prostokątnych masek.
