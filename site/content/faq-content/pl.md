---
# FAQ content — grouped Q+A accordion + learning-path strip + canonical-sources block.
# Rendered by: site/src/components/sections/FaqContentSection.astro
#
# Each item has:
#   open        — optional bool, true means the <details> is expanded by default
#   questionHtml — HTML string for the <summary> (allows <code>...</code>)
#   answerHtml   — HTML string for the answer paragraph
# Inline <code>, &mdash;, ${...} placeholders, etc. are all preserved verbatim.

# Top "Ścieżka nauki" surface-path strip.
learningPath:
  label: "Ścieżka nauki"
  lead: "Najpierw ścieżka produktu, dopiero potem źródła."
  quickstart: "Szybki start"
  foundation: "Fundamenty"
  overview: "Przegląd"

# Eyebrow for the canonical-sources <details> at the bottom.
sourceLabel: "Źródła kanoniczne"

groups:
  - title: "Instalacja"
    items:
      - open: true
        questionHtml: "Dlaczego 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. instaluje się do <code>$VIBECRAFTED_ROOT/.vibecrafted/</code>, a nie do <code>$HOME/.agents/</code>?"
        answerHtml: "<code>$VIBECRAFTED_ROOT/.vibecrafted/</code> to miejsce, w którym działa cały system. Katalogi agentów tylko odwołują się do tego jednego wspólnego miejsca. To właśnie tam trafiają logika, artefakty i skrypty pomocnicze."
      - questionHtml: "Czy mogę zainstalować 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. bez edycji konfiguracji shella?"
        answerHtml: "Tak. W trybie interaktywnym możesz zrezygnować z instalacji helperów. Jeśli chcesz mieć je tylko w bieżącej sesji, załaduj ręcznie skrypt pomocniczy <code>${XDG_CONFIG_HOME:-$HOME/.config}/vetcoders/vc-skills.sh</code>."
      - questionHtml: "Co dokładnie sprawdza <code>vibecrafted doctor</code>?"
        answerHtml: "Polecenie <code>doctor</code> sprawdza centralny magazyn, dostępność helperów, stan odwołań agentów, wymagane fundamenty (<code>loctree-mcp</code> i <code>aicx-mcp</code>), narzędzia dowodowe takie jak prview i ScreenScribe oraz to, czy środowisko nie przeszkadza narzędziom agentowym w stabilnej pracy."
      - questionHtml: "Którą ścieżkę instalacji wybrać w CI lub automatyzacji?"
        answerHtml: 'Użyj <code>make install</code>, jeśli chcesz prostą ścieżkę bez interakcji. Jeśli potrzebujesz pełnej kontroli z poziomu wiersza poleceń, uruchom <code>python3 scripts/vetcoders_install.py install --source "$PWD" --non-interactive</code>.'

  - title: "Skille, agenci, zależności"
    items:
      - open: true
        questionHtml: "Jaka jest różnica między skillem a agentem?"
        answerHtml: "Agent to runtime &mdash; na przykład Codex, Claude albo Gemini. Skill to zestaw instrukcji i zasad pracy, które mówią agentowi, jak ma działać na danym etapie."
      - questionHtml: "Dlaczego nie po prostu ChatGPT, Copilot albo jeden wielki prompt?"
        answerHtml: "Bo 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. nie służy tylko do rozmowy z modelem. Opiera pracę na strukturze kodu, pamięci decyzji i iteracji. Dzięki temu model widzi repo i realną powierzchnię produktu, zamiast improwizować po omacku."
      - questionHtml: "Czy loctree i aicx są wymagane?"
        answerHtml: "Nie uczciwie. <code>loctree</code> i <code>aicx</code> są wymaganymi fundamentami: jedno daje agentowi percepcję struktury, drugie przywraca wcześniejsze decyzje i intencje. Jeśli któregoś brakuje, najpierw napraw warstwę fundamentów."
      - questionHtml: "Jak przepchnąć <code>screenscribe review</code> przez wczesną walidację modeli?"
        answerHtml: "Potraktuj to jak prawdę runtime, a nie rytuał. CLI musi być widoczny na <code>PATH</code>, <code>~/.config/screenscribe/config.env</code> musi być zgodne z domyślną konfiguracją Libraxis, dla aliasów modeli używaj <code>ai-suggestions</code>, ustaw <code>SCREENSCRIBE_VISION=false</code> jako intencję operatora i pamiętaj, że obecny CLI nadal nadpisuje tę flagę podczas <code>review</code>, więc launcher musi wstrzykiwać <code>--no-vision</code> dla zwykłych uruchomień review na obecnej ścieżce Libraxis. Lokalnym źródłem prawdy w repo jest dokument ScreenScribe Review Gate."
      - questionHtml: "Co to jest pętla Marbles?"
        answerHtml: "Marbles to silnik konwergencji. Wynik AI bywa zaszumiony, więc framework zapętla implementację, sprawdzenie, pomiar i poprawki, aż najważniejsze problemy spadną do zera."

  - title: "Praca z frameworkiem"
    items:
      - open: true
        questionHtml: "Kiedy używać <code>vc-justdo</code> zamiast ręcznych faz?"
        answerHtml: "Użyj <code>vc-justdo</code>, kiedy zadanie jest jasne i chcesz, żeby agent dowiózł je od początku do końca. Ręczne fazy wybierz wtedy, gdy chcesz bliżej pilnować kierunku i decyzji architektonicznych."
      - questionHtml: "Co znajduje się w <code>$VIBECRAFTED_ROOT/.vibecrafted/artifacts/</code>?"
        answerHtml: "To tutaj trafiają plany, raporty, transkrypty i metadane z większych uruchomień. Powstało po to, żeby praca agentów zostawiała trwały ślad, a nie znikała w historii terminala."
      - questionHtml: "Czym jest Definition of Undone?"
        answerHtml: "DoU to audyt, który sprawdza, czy ktoś z zewnątrz może ten projekt znaleźć, zrozumieć, zainstalować i mu zaufać. Mierzy prawdę powierzchni produktu, a nie tylko stan repo."

  - title: "Licencja i użycie komercyjne"
    items:
      - open: true
        questionHtml: "Czy 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. jest open source?"
        answerHtml: "𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. jest udostępniany na licencji Business Source License 1.1. Repo jest publiczne i można z niego korzystać, ale nie jest to klasyczny open source na licencji permisyjnej."
      - questionHtml: "Czy małe zespoły mogą używać 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. produkcyjnie?"
        answerHtml: "Tak. Ten grant pozwala pojedynczym deweloperom i zespołom mniejszym niż pięć osób używać frameworka w produkcji, o ile nie oferują konkurencyjnej usługi hostowanej ani rozwiązania osadzonego."
      - questionHtml: "Co jeśli potrzebuję szerszego modelu komercyjnego?"
        answerHtml: "Jeśli potrzebujesz szerszych uprawnień komercyjnych, skontaktuj się z vetcoders. Przeczytaj warunki licencji i ustal właściwą ścieżkę."

# Bottom canonical-sources link list.
links:
  - href: "/pl/quickstart/"
    label: "Szybki start"
  - href: "https://github.com/vetcoders/vibecrafted/blob/main/docs/FAQ-ANSWERED.md"
    label: "Pełne FAQ - markdown"
  - href: "https://github.com/vetcoders/vibecrafted/blob/main/docs/runtime/SCREENSCRIBE_REVIEW.md"
    label: "Bramka review ScreenScribe"
  - href: "https://github.com/vetcoders/vibecrafted/blob/main/docs/runtime/CONTENT_TRUTH.md"
    label: "Matryca prawdy contentowej"
  - href: "https://github.com/vetcoders/vibecrafted/blob/main/LICENSE"
    label: "Licencja"
---
