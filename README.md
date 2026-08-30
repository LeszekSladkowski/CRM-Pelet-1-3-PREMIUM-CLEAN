# CRM Pelet 1.3 PREMIUM — CLEAN MASTER

Czysta paczka wdrożeniowa przygotowana z repozytorium `CRM-Pelet-1.3-PREMIUM-main`.

## Zasada tej paczki
- zachowany bieżący interfejs i pliki MASTER,
- zachowane bieżące pliki danych CRM,
- jeden aktywny Service Worker: `sw.js`, zgodny z rejestracją w `index.html`,
- usunięte historyczne backupy, README kolejnych poprawek, CHECKSUMS kolejnych wydań, pliki TEST oraz nieużywane równoległe silniki/Service Workery,
- brak zmian wizualnych w zatwierdzonych grafikach MASTER.

## GitHub Pages
Publikuj z gałęzi `main` / katalogu `/ (root)`.

## Ważne
Paczka nie zeruje `crm-data.json`, `assistant-feed.json` ani `backup-catalog.json`; zachowuje je z paczki źródłowej.
