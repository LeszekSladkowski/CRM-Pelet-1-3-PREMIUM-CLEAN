# R144 — HISTORIA LIVE NO-OVERLAY

Krytyczna zasada tego kroku: raster MASTER pozostaje jedyną warstwą wizualną karty. Kod może dodawać wyłącznie dane LIVE bez własnego tła/ramek oraz niewidzialne hotspoty nad istniejącymi elementami grafiki.

Nie wolno dodawać programowych kafli, przycisków, ramek, masek, paneli ani kolorowych nakładek.

Rollback bezpieczeństwa: `restore-point-1-2026-09-12-cleanup` (`fa16687`).
