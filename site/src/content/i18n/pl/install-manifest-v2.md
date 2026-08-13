---
# Install manifest — sekcja "Co instalujesz".
# Głos: manifest (Vibe Hangover) — konkretnie, dorośle, zero mystery meat.
# Prawda per komponent: README / AGENTS.md w repo komponentu;
# mapowanie w docs/content-truth.manifest.json.
# Renderuje: site/src/components/sections/SectionInstallManifest.astro

title: "CO INSTALUJESZ"
centerLabel: "SZEŚĆ KOMPONENTÓW · JEDEN CONTROL PLANE"

headingHtml: 'Zero mystery meat. <em class="accent-2">To jest ta maszyna</em>'
subtitle: "Jeden installer, sześć komponentów, jeden katalog prawdy. Dokładnie to ląduje na Twojej maszynie — czym każda część jest, gdzie żyje i którą część bałaganu ma zabić."

components:
  - name: "vibecrafted"
    kind: "CLI · runtime"
    what: "Runtime i launchery. vibecrafted <skill> <agent> wysyła realną robotę do claude, codexa, gemini albo junie, zapisuje każdy run w control plane i rozlicza go jako f / x / n z kwitami — raport, transkrypt, pieczęć."
    kills: "Zabija niesledzoną sesję agenta: robotę, która gdzieś się wydarzyła, zostawiła diff i nikt nie umie powiedzieć, kto co puścił i czy skończył."
    lives: "~/.local/bin/vibecrafted"
  - name: "loctree"
    kind: "CLI + MCP · Rust"
    what: "Percepcja strukturalna. Mapa repo, wycinki zależności, konsumenci, blast radius, martwy kod — mapa, którą agent czyta, zanim dotknie Twojego kodu."
    kills: "Zabija ślepą edycję: refactor, który złamał trzech konsumentów, o których nikt nie wiedział."
    lives: "npm / crates · loct + loctree-mcp"
  - name: "aicx"
    kind: "CLI + MCP · pamięć sesji"
    what: "Parsuje transkrypty agentów — Claude, Codex, Gemini — do przeszukiwalnego magazynu intencji. Co postanowiono, kto i dlaczego: do odzyskania, nie do folkloru."
    kills: "Zabija sesję z amnezją: agenta, który we wtorek re-decyduje to, co zespół ustalił w poniedziałek."
    lives: "magazyn ~/.aicx"
  - name: "vc-frame"
    kind: "kokpit terminalowy · Rust"
    what: "Terminal operatora (twardy fork Zellij): rail sesji, chipy live runs, composer komend, paste stack. Tu patrzysz, jak flota pracuje — i tu jej przerywasz."
    kills: "Zabija rozlazłe piętnaście tabów terminala, w których ważna sesja to zawsze ta zamknięta."
    lives: "binarka · vc-frame"
  - name: "vc-server"
    kind: "webowy control plane · Rust"
    what: "Przeglądarkowa projekcja read-only tego samego control plane, który zapisuje CLI: live runs, decyzje lifecycle, transkrypty, scaffold review. Leptos SSR + axum. Obserwuje; nie umie zmutować Twojego repo."
    kills: "Zabija dashboard, który wymyśla własne liczby — alive / final / failed / attention idą z zachowanych snapshotów, nie z vibe'u."
    lives: "binarka · ~/.local/bin/vc-server"
  - name: "vc-slack"
    kind: "konektor Slack · OAuth + MCP"
    what: "Sprawczość na Twoim Slacku, self-hosted. Agenci postują, odpowiadają, reagują, piszą DM-y i przekazują sobie robotę w ograniczonych wątkach — w scope'ach kontrolowanych przez operatora, z tokenami, które nie opuszczają Twojej strony."
    kills: "Zabija niewidzialną flotę: dispatch i raporty w kanale, w którym Twój zespół i tak siedzi — zamiast ssh, żeby sprawdzić."
    lives: "self-hosted · vetcoders/vc-slack"

truthLabel: "JEDEN KATALOG PRAWDY"
truthBody: "Każdy komponent powyżej czyta lub pisze ~/.vibecrafted/control_plane/ — runy, rozliczenia, stan lifecycle, artefakty scaffold. CLI go zapisuje. vc-frame i vc-server go projektują. Nic nie wymyśla własnych liczb, więc gdy dwie powierzchnie się nie zgadzają, jedna z nich jest zepsuta — i to jest bug, nie wzruszenie ramion."
---
