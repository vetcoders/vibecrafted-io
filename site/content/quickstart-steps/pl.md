---
# Quickstart steps — six numbered installation/usage steps.
# Rendered by: site/src/components/sections/QuickstartStepsSection.astro
#
# Each step has:
#   kicker  — small label like "Krok 1"
#   title   — short heading
#   body    — HTML body paragraph (set:html — <code> allowed)
#   command — single shell command (string), OR
#   commands — list of shell commands (array of strings)
#   note    — optional HTML note (set:html — <code>, &gt; entities allowed)
#
# Multi-line commands use the YAML literal block scalar "|" so newlines stay intact.

steps:
  - kicker: "Krok 1"
    title: "Zainstaluj 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. lokalnie"
    body: "Użyj publicznej ścieżki bootstrapu. Tworzy kopię w <code>$VIBECRAFTED_ROOT/.vibecrafted/tools</code> i trzyma ten sam stan instalacji co automatyzacja. Jeśli wolisz instalator z przeglądarki, użyj <code>make vibecrafted</code> w repo."
    command: "curl -fsSL https://vibecrafted.io/install.sh | bash"
    note: "Bezpośredniej ścieżki <code>| bash</code> używaj tylko wtedy, gdy celowo wybierasz compact automation zamiast guided kickoffu."

  - kicker: "Krok 2"
    title: "Sprawdź, czy wszystko jest gotowe"
    body: "Uruchom <code>doctor</code> wcześnie. Szybko pokaże, czy środowisko jest gotowe do pracy i czy czegoś jeszcze nie brakuje."
    command: "vibecrafted doctor"
    note: "Jeśli coś świeci na żółto, doctor pokaże, czego brakuje, zamiast zostawiać Cię z domysłami."

  - kicker: "Krok 3"
    title: "Wejdź w realne repo"
    body: "Wejdź do repo, które naprawdę ma znaczenie, i pozwól agentowi załadować historię, strukturę i bramki jakości, zanim cokolwiek zmieni."
    command: |
      cd $VIBECRAFTED_ROOT/twoj-projekt
      vibecrafted init claude
    note: "<code>vibecrafted init</code> czyta historię, mapuje strukturę i uruchamia bramki jakości, zanim zacznie się implementacja."

  - kicker: "Krok 4"
    title: "Uruchom pierwsze realne zadanie"
    body: "Gdy kontekst jest już zakotwiczony, możesz uruchomić pełną ścieżkę realizacji albo bardziej kontrolowany workflow, zależnie od tego, ile kontroli chcesz zachować."
    commands:
      - 'vibecrafted justdo codex --prompt "Dodaj uwierzytelnianie użytkowników z JWT"'
      - 'vibecrafted workflow claude --prompt "Zaplanuj i zaimplementuj moduł auth"'
    note: "Użyj <code>vibecrafted justdo</code>, gdy chcesz oddać agentowi pełną odpowiedzialność. Użyj <code>vibecrafted workflow</code>, gdy chcesz przejść przez wyraźny układ ERI: Eksploruj &rarr; Research &rarr; Implementuj."

  - kicker: "Krok 5"
    title: "Uruchom flotę, gdy jeden model nie wystarcza"
    body: "Ta ścieżka służy do pracy równoległej i zostawia trwałe artefakty. Chodzi o realne porównanie wyników, nie o pokaz."
    command: |
      vibecrafted codex implement .vibecrafted/plans/my-plan.md
      vibecrafted claude research .vibecrafted/plans/my-plan.md
      vibecrafted gemini implement .vibecrafted/plans/my-plan.md
    note: "To są wygodne powierzchnie launchera. Przenośny kontrakt oparty o skrypty spawn jest opisany w kontrakcie runtime."

  - kicker: "Krok 6"
    title: "Domknij pętlę, zanim uznasz pracę za skończoną"
    body: 'W 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. "gotowe" nie oznacza tylko działającego kodu. Oznacza też to, czy ktoś rzeczywiście może z tego skorzystać.'
    command: |
      vibecrafted dou claude --prompt "Audit launch readiness"
      vibecrafted decorate codex --prompt "Polish the release surface"
      vibecrafted hydrate codex --prompt "Package the product"
      vibecrafted release codex --prompt "Prepare release steps"
    note: "Jeśli nie da się tego znaleźć, zrozumieć i zainstalować, to jeszcze nie jest gotowe. Nawet jeśli testy są zielone."
---
