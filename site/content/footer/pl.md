---
# Footer V2 — "DALEJ § N · TITLE" continuation label między sekcjami.
#
# Source of truth (do 2026-05-14): site/src/lib/i18n/pl.ts → landingV2.footer
# Renderowane przez: site/src/components/SectionFooter.astro
#
# Etap A migracji: markdown istnieje równolegle z pl.ts.
# Etap B (TBD przez parenta): komponent przepiąć na getEntry('i18n', 'pl/footer-v2').
#
# UWAGA: To NIE jest stopka strony — to label nawigacyjny renderowany
# pod każdą sekcją landingu V2 (np. "DALEJ § 02 · INŻYNIERIA"). Komponent
# interpoluje {number} i {title} per sekcja. Trzymamy literal placeholdery.

# Continuation template — komponent podstawia {number} i {title}.
continues: "DALEJ § {number} · {title}"
---
