// Kanoniczne źródła publicznego copy są zmapowane w
// docs/content-truth.manifest.json i opisane dla ludzi w
// docs/runtime/CONTENT_TRUTH.md.
import type { en } from "./en";

// Deep shape of the EN dictionary with leaves widened to their primitive
// types. `satisfies` against this makes `astro check` the parity gate:
// a missing or extra PL key fails the build instead of returning
// `undefined` at runtime. (Both dicts are `as const`, so `typeof en`
// alone would demand identical literal strings — the widening is the point.)
type CopyShape<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly CopyShape<U>[]
        : { [K in keyof T]: CopyShape<T[K]> };

export const pl = {
  nav: {
    about: "O nas",
    runtime: "Runtime",
    pipeline: "Pipeline",
    skills: "Skille",
    marbles: "Marbles",
    framework: "Framework",
    board: "BOARD",
    quickstart: "Szybki start",
    faq: "FAQ",
    dou: "DoU",
    pricing: "Cennik",
    pilot: "Pilot",
    get: "Pobierz",
    search: "Szukaj dokumentacji",
    searchAll: "Cała powierzchnia",
    searchClose: "Zamknij wyszukiwanie",
    install: "Instaluj",
    vc: "VC",
    vcLabel: "vetcoders",
    github: "GitHub",
    license: "Licencja (BSL 1.1)",
    security: "Bezpieczeństwo",
    skip: "Przejdź do treści",
    switchLang: "Switch to English",
    toggleShort: "EN",
    menu: "Menu",
    closeMenu: "Zamknij menu",
    navPrimary: "Nawigacja główna",
    navFooter: "Nawigacja stopki",
    v2Anchors: {
      about: { label: "O NAS", sub: "Co to jest" },
      runtime: { label: "RUNTIME", sub: "Cykl pracy" },
      aicx: { label: "AICX", sub: "Pamięć" },
      marbles: { label: "MARBLES", sub: "Konwergencja" },
      playground: { label: "PLAYGROUND", sub: "Wypróbuj" },
      dou: { label: "DoU", sub: "Audyt gotowości" },
      pricing: { label: "CENNIK", sub: "Open · Fleet · Forge" },
      faq: { label: "FAQ", sub: "Pytania" },
    },
  },
  footer: {
    ariaLabel: "Stopka strony",
    brand: "𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍.",
    byline: "with AI Agents by vetcoders",
    tagline:
      "Od repo po agentach do wydania, które ktoś obcy może zainstalować.",
    copyright: "(c)2024-2026 LibraxisAI",
    license: "BSL 1.1",
  },
  v2Chrome: {
    footer: {
      ariaLabel: "Stopka strony",
      byline: "z agentami AI od vetcoders",
      tagline:
        "Od repo wygenerowanego przez AI do produktu gotowego do wypuszczenia.",
      quickstart: "SZYBKI START",
      faq: "FAQ",
      github: "GITHUB",
      license: "LICENCJA (BSL 1.1)",
      security: "BEZPIECZEŃSTWO",
    },
    search: {
      ariaLabel: "Wyszukiwanie",
      openAria: "Otwórz wyszukiwarkę",
      queryAria: "Wpisz szukaną frazę",
      placeholder: "Szukaj: install, auth, Stripe, deploy…",
      tabs: {
        all: "WSZYSTKIE SEKCJE",
        quickstart: "SZYBKI START",
        faq: "FAQ",
      },
      prompt:
        "Zapytaj co to naprawia, jak to zainstalować albo gdzie zwykle chowa się ryzyko release.",
      fastPathsLabel: "SZYBKIE ŚCIEŻKI",
      fastPaths: {
        framework: "Playground frameworka",
        install: "Zainstaluj krok po kroku",
        quickstart: "Zobacz szybki start",
        overview: "Wróć do przeglądu",
      },
      resultsLabel: "WYNIKI",
      empty:
        "Wpisz co najmniej dwa znaki, żeby przeszukać statyczny indeks dokumentacji.",
    },
  },
  v2Pages: {
    landing: {
      title: "Vibecrafted — Runtime operacyjny multiagentowych CLI workflows.",
      description:
        "Metoda i runtime orkiestracji agentów CLI (Claude Code, Codex, Junie, Agy, Grok, Gemini): dispatch peerów z TUI, wspólny control plane, rytm read/write i /vc-ship od A do Z.",
    },
    faq: {
      title: "Vibecrafted · FAQ",
      description:
        "Pytania, które obcy zadają jako pierwsze o runtime orkiestracji Vibecrafted.",
    },
    dou: {
      title: "Vibecrafted · DoU — Definicja niezrobionego",
      description:
        "Brutalna przestrzeń między działającym systemem a produktem, który obcy mogą odkryć, zainstalować, któremu zaufają i za który zapłacą.",
    },
    pilot: {
      title: "Vibecrafted · Zgłoś płatny pilot",
      description:
        "Płatny pilot Fleet w pełnej cenie seata. Named buying moment, spisane success criteria, ścieżka design-partner.",
    },
  },
  v2Hero: {
    ariaLabel: "Sekcja główna",
    eyebrow: "RUNTIME OPERACYJNY · MULTIAGENTOWE CLI WORKFLOWS",
    heading: {
      pre: "Runtime operacyjny",
      mid: "dla multiagentowych",
      accent: "CLI workflows.",
    },
    body: "Vibecrafted to metoda i runtime orkiestracji agentów CLI (Claude Code, Codex, Junie, Agy, Grok, Gemini): launchery, które dispatchują peer agentów z TUI, wspólny control plane i rytm read/write. Gdy chcesz jeden przebieg od A do Z — to jest <code>/vc-ship</code>.",
    ctaPrimary: "INSTALUJ",
    ctaSecondary: "QUICK START",
    installLead: "Instalacja",
    installHint: "macOS, Linux i WSL2. Bootstrap instaluje opublikowany kanał.",
    telemetry: {
      marbles: "AGENCI",
      converge: "REPO",
      live: "LIVE",
    },
    telemetryLegend: "Powierzchnia dispatchu: agenci, repo, żywe runy.",
    canvasCaption: "Real usage · Start here · Session Manager · rail sesji.",
    scroll: "SCROLL",
  },
  copyButton: {
    default: "Kopiuj",
    upperDefault: "KOPIUJ",
    copied: "Skopiowano!",
    error: "Błąd",
    defaultAria: "Kopiuj do schowka",
    copiedAria: "Skopiowano do schowka",
    errorAria: "Kopiowanie nie powiodło się",
  },
  sections: {
    pipeline: {
      label: "Metoda",
      title: "Twórz → Konwerguj → Wypuść",
      sub: "Mały model operacyjny do kształtowania pracy agentów, redukowania dryfu i przygotowania release surface, którą da się obejrzeć.",
      hero: {
        stages: [
          { name: "Scaffold", subtitle: "read · mapa przed cięciem" },
          { name: "Implement", subtitle: "write · agenci dowożą" },
          { name: "Review", subtitle: "read · podważ zapis" },
          {
            name: "Konwergencja",
            subtitle: "write · marbles ⬆ polarize ⬇",
            kind: "core" as const,
          },
          { name: "Release", subtitle: "write · wypuść dla obcych" },
        ],
      },
      controls: {
        expand: "Rozwiń",
        expandLabel: "Rozwiń pełny pipeline",
        source: "Źródło",
        preview: "Podgląd",
        split: "Podział",
        copy: "Kopiuj",
        copied: "Skopiowano",
        copyError: "Nie udało się",
        ariaSource: "Pokaż lub ukryj kod źródłowy Mermaid",
        ariaPreview: "Wróć do diagramu hero",
        ariaSplit: "Pokaż źródło i techniczny podgląd obok siebie",
        ariaCopy: "Skopiuj kod Mermaid do schowka",
        ariaCopiedFeedback: "Kod skopiowany do schowka",
        ariaCopyErrorFeedback: "Kopiowanie nie powiodło się",
      },
      mermaidFull: `%%{init: {
  "theme": "base",
  "themeVariables": {
    "background": "#07111f",
    "primaryColor": "#0c1626",
    "primaryTextColor": "#f3efe7",
    "primaryBorderColor": "#2d3b56",
    "lineColor": "#d8894b",
    "secondaryColor": "#101b2d",
    "tertiaryColor": "#0d1728",
    "fontFamily": "Inter, ui-sans-serif, system-ui, sans-serif",
    "fontSize": "16px"
  },
  "flowchart": {
    "curve": "basis",
    "htmlLabels": true,
    "nodeSpacing": 32,
    "rankSpacing": 46,
    "padding": 14
  }
} }%%
flowchart LR
    S["Scaffold · R"] --> I["Implement · W"]
    I --> RV["Review · R"]
    RV --> WF["Workflow · W"]
    WF --> FU["Follow-up · R"]
    FU --> MA{{"Marbles · W ⬆"}}
    MA --> AU["Audit · R"]
    AU --> PO{{"Polarize · W ⬇"}}
    PO --> DU["DoU · R"]
    DU --> HY["Hydrate · W"]
    HY --> RE["Release · W"]

    classDef read fill:#0d1728,stroke:#3b6ea5,color:#dbe7f3,stroke-width:1.3px;
    classDef write fill:#1a1410,stroke:#d8894b,color:#ffd9bd,stroke-width:1.6px;
    classDef core fill:#1a1110,stroke:#e2935a,color:#ffd9bd,stroke-width:2.4px;
    class S,RV,FU,AU,DU read;
    class I,WF,HY,RE write;
    class MA,PO core;`,
      mermaidModal: {
        open: "Rozwiń pełny pipeline",
        close: "Zamknij diagram pipeline'u",
        title: "kadencja vc-ship — Read ↔ Write, 11 taktów",
      },
      notes: [
        {
          title: "Twórz",
          body: "Zaplanuj architekturę, zainicjuj kontekst i uruchom workflow ERi. Zmuś agentów do respektowania AST i historii.",
        },
        {
          title: "Konwerguj",
          body: "Systematycznie redukuj entropię przez pętle Marbles, aż wszystkie problemy P0, P1 i P2 zostaną rozwiązane.",
        },
        {
          title: "Wypuść",
          body: "Przeaudytuj powierzchnię produktu przez DoU, wypoleruj przez Decorate i zapakuj przez Hydrate przed finalnym Release.",
        },
      ],
    },
    evidence: {
      titleHtml: "Mniej magii<br />Więcej pracy, którą da się obejrzeć",
      lead: "Słownictwo żyje tylko wtedy, kiedy system zostaje inspekowalny: kontekst przed edycją, dowód po runie i powierzchnia release, która sama mówi, co nadal jest niepewne.",
      revealLabel: "Otwórz notatkę",
      closeLabel: "Zamknij notatkę",
      detailsLabel: "Konsekwencja operacyjna",
      items: [
        {
          number: "01",
          accent: "steel",
          title: "Kontekst wzbogacony AST",
          body: "Modele dryfują, kiedy piszą w repo na ślepo. Mapy strukturalne dają sesji punkty orientacyjne, zanim agent ruszy plik.",
          details: [
            "Loctree i pokrewne mapy zamieniają repo w teren nawigacyjny przed pierwszą edycją.",
            "Agent pracuje na nazwanych plikach, blast radiusie i topologii symboli — zamiast dryfować w mgle grepów.",
            "To obniża fałszywą pewność: jeśli struktura kłóci się z promptem, wygrywa struktura.",
          ],
        },
        {
          number: "02",
          accent: "copper",
          title: "Stochastyczna konwergencja",
          body: "Każde generowanie kodu to szum. Pętla Marbles przerabia ten szum: małe pętle, kontrprzykłady i widoczna praca nierozwiązana.",
          details: [
            "Jedno odpalenie nie jest dowodem. Pętla stale tnie najbardziej ryzykowne kłamstwo, aż runtime zacznie zgadzać się z obietnicą.",
            "Wczesne pętle wycinają fałsze strukturalne. Późniejsze ściskają chropowatość do powtarzalnego kształtu produktu.",
            "Celem nie jest „ładny output”, tylko stan, w którym problemy P0/P1/P2 zbiegają do zera.",
          ],
        },
        {
          number: "03",
          accent: "patina",
          title: "𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚜𝚖𝚊𝚗𝚜𝚑𝚒𝚙",
          body: "Rzemieślnicza współpraca człowieka i AI. Rzemiosło jest w handoffie: ludzie trzymają scope, smak i decyzje nieodwracalne; agenci robią fieldwork z dowodem przyczepionym do pracy.",
          details: [
            "Ludzie nie ścigają się z modelem na szybkość pisania; biorą odpowiedzialność za scope, truth checki i nieodwracalne decyzje.",
            "Agenci dostają przestrzeń do głębokiego fieldworku, ale gates, artefakty review i dowód z runtime trzymają finalny kształt w ryzach.",
            "Dlatego produkt może być żywy, ale nie mistyczny: rzemiosło pozostaje inspekowalne.",
          ],
        },
      ],
    },
    dou: {
      label: "DoU",
      title: "Definicja niezrobionego",
      quote:
        "Agenci AI często sprawiają, że rzecz działa. Nie sprawiają jednak, że można ją znaleźć, zainstalować, zaufać jej albo za nią zapłacić.",
      lead: "Problem rzadko leży w samej jakości kodu. Leży w przestrzeni między działającym systemem a produktem, który ludzie z zewnątrz mogą odkryć, zainstalować, któremu zaufają i za który zapłacą.",
      diagnosticLabel: "Diagnostyka założyciela:",
      checklist: [
        { kind: "check", text: "Testy przechodzą" },
        { kind: "check", text: "Architektura jest solidna" },
        { kind: "check", text: "README istnieje" },
        { kind: "cross", text: "Nikt nie znajdzie tego w Google" },
        { kind: "cross", text: "Nikt nie zainstaluje bez toolchaina" },
        { kind: "cross", text: "Nikt nie może za to zapłacić" },
      ],
      summary:
        "Punkty 4-6 to Definicja Niezrobionego. Faza 3 pyta, czy system potrafi spotkać się z rynkiem.",
      caption: "Trajektoria konwergencji — pętla aż koło się zapełni",
      bars: ["Pętla 1", "Pętla 2", "Pętla 3", "Pętla 4", "Pętla 5"],
      scoreline: "Wynik: 15 → 40 → 65 → 85 → 100",
    },
    quickstartHero: {
      label: "Szybki start",
      title: "Od zera do pierwszej pętli 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍.",
      lead: "Zainstaluj framework, sprawdź środowisko i uruchom pierwszy workflow w realnym repozytorium. Chodzi o szybki sygnał, nie o długie ustawianie środowiska.",
      quote:
        "Od repo po agentach do wydania, które ktoś obcy może zainstalować.",
      primaryHref: "/pl/",
      primaryLabel: "Wróć do przeglądu",
      secondaryHref: "/pl/framework/",
      secondaryLabel: "Otwórz framework",
    },
    quickstartResources: {
      reveal: "Zobacz więcej",
      nextStep: {
        label: "Następny krok",
        lead: "Kiedy quickstart już ma sens, skieruj się do warstwy wyjaśniającej.",
        faq: "FAQ",
        foundation: "Fundamenty",
        overview: "Przegląd",
      },
      sourceLabel: "Źródła kanoniczne",
      cards: [
        {
          kicker: "Czego potrzebujesz",
          title: "Minimalne wymagania",
          items: [
            "macOS albo Linux",
            "Git, Python 3.10+ i <code>make</code>",
            "Co najmniej jeden runtime: Codex, Claude albo Gemini",
            "Wymagane fundamenty: loctree i aicx",
            "Zalecane narzędzia dowodowe: prview i ScreenScribe",
          ],
        },
        {
          kicker: "Po instalacji",
          title: "Co dostajesz po instalacji",
          items: [
            "Centralny magazyn skilli w <code>$VIBECRAFTED_ROOT/.vibecrafted/skills/</code>",
            "Artefakty pogrupowane według repozytorium i daty w <code>$VIBECRAFTED_ROOT/.vibecrafted/artifacts/</code>",
            "Helpery shellowe do uruchamiania agentów, obserwacji sesji, Marbles, DoU, Hydrate i Release",
            "Lokalną kopię frameworka w <code>$VIBECRAFTED_ROOT/.vibecrafted/tools/</code>",
          ],
        },
      ],
      links: [
        { href: "/pl/faq/", label: "FAQ" },
        {
          href: "https://github.com/vetcoders/vibecrafted/blob/main/docs/FOUNDATION.md",
          label: "Stack zależności",
        },
        {
          href: "https://github.com/vetcoders/vibecrafted/blob/main/docs/QUICK_START.md",
          label: "Szybki start w Markdownie",
        },
        {
          href: "https://github.com/vetcoders/vibecrafted/blob/main/docs/runtime/CONTRACT.md",
          label: "Kontrakt runtime",
        },
        {
          href: "https://github.com/vetcoders/vibecrafted/blob/main/docs/runtime/SCREENSCRIBE_REVIEW.md",
          label: "Bramka review ScreenScribe",
        },
        {
          href: "https://github.com/vetcoders/vibecrafted/blob/main/docs/runtime/CONTENT_TRUTH.md",
          label: "Matryca prawdy contentowej",
        },
      ],
    },
    quickstartSteps: {
      steps: [
        {
          kicker: "Krok 1",
          title: "Zainstaluj 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. lokalnie",
          body: "Zacznij od lokalnej instalacji. Installer przygotuje narzędzia w Twoim środowisku i ustawi bazę, z której korzysta później automatyzacja.",
          command: "curl -fsSL https://vibecrafted.io/install.sh | bash",
          note: "Jeśli wolisz prowadzony start z poziomu repo, użyj <code>make vibecrafted</code>.",
        },
        {
          kicker: "Krok 2",
          title: "Sprawdź środowisko",
          body: "Uruchom doctor, zanim zaczniesz pracę. To szybki przegląd instalacji, helperów, symlinków i ustawień shellowych, które mogą wpływać na pracę agentów.",
          command: "vibecrafted doctor",
          note: "Gdy coś wymaga poprawy, doctor pokazuje konkretny problem zamiast zostawiać Cię z domysłami.",
        },
        {
          kicker: "Krok 3",
          title: "Wejdź do właściwego repo",
          body: "Przejdź do projektu, nad którym naprawdę chcesz pracować, i pozwól agentowi najpierw poznać kontekst: historię, strukturę oraz bramki jakości.",
          command: "cd $VIBECRAFTED_ROOT/twoj-projekt\nvibecrafted init claude",
          note: "<code>vibecrafted init</code> zakotwicza pracę w realnym repo, zanim agent zacznie cokolwiek zmieniać.",
        },
        {
          kicker: "Krok 4",
          title: "Uruchom pierwsze zadanie",
          body: "Kiedy kontekst jest już gotowy, zleć agentowi konkretne zadanie. Możesz wybrać szybki tryb wykonawczy albo spokojniejszy workflow z planem i implementacją.",
          commands: [
            'vibecrafted justdo codex --prompt "Dodaj uwierzytelnianie użytkowników z JWT"',
            'vibecrafted workflow claude --prompt "Zaplanuj i zaimplementuj moduł auth"',
          ],
          note: "<code>justdo</code> jest dobre, gdy chcesz szybkiego wykonania. <code>workflow</code> sprawdza się, gdy potrzebujesz więcej kontroli nad planem i decyzjami.",
        },
        {
          kicker: "Krok 5",
          title: "Uruchom kilka modeli równolegle",
          body: "Gdy jedno podejście to za mało, możesz rozdzielić pracę między modele. Jeden może robić research, drugi implementować, trzeci sprawdzić alternatywną ścieżkę.",
          command:
            "vibecrafted codex implement .vibecrafted/plans/my-plan.md\nvibecrafted claude research .vibecrafted/plans/my-plan.md\nvibecrafted gemini implement .vibecrafted/plans/my-plan.md",
          note: "To nie jest pokaz siły. To sposób na porównanie wyników i zebranie trwałych artefaktów z pracy równoległej.",
        },
        {
          kicker: "Krok 6",
          title: "Domknij pracę przed releasem",
          body: "W 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. gotowe oznacza więcej niż działający kod. Projekt ma być zrozumiały, odnajdywalny, możliwy do uruchomienia i gotowy dla kogoś poza autorem.",
          command:
            'vibecrafted dou claude --prompt "Audit launch readiness"\nvibecrafted decorate codex --prompt "Polish the release surface"\nvibecrafted hydrate codex --prompt "Package the product"\nvibecrafted release codex --prompt "Prepare release steps"',
          note: "Zielone testy to dobry znak, ale nie koniec pracy. Release zaczyna się wtedy, gdy ktoś naprawdę może z tego skorzystać.",
        },
      ],
    },
    faqHero: {
      label: "FAQ",
      title: "Pytania, które padają na początku.",
      lead: "Tutaj wyjaśniamy, jak działa 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. — bez zmuszania Cię do przekopywania repo, konfiguracji shella czy licencji.",
      quote:
        "Installer, docs i command deck muszą obiecywać dokładnie to samo.",
      primaryHref: "/pl/quickstart/",
      primaryLabel: "Szybki start",
      secondaryHref: "/pl/",
      secondaryLabel: "Wróć do przeglądu",
    },
    faqContent: {
      learningPath: {
        label: "Wiedza",
        lead: "Najpierw poznaj ścieżkę pracy, potem sięgaj po źródła.",
        quickstart: "Szybki start",
        foundation: "Fundamenty",
        overview: "Przegląd",
      },
      sourceLabel: "Źródła kanoniczne",
      groups: [
        {
          title: "Instalacja",
          items: [
            {
              open: true,
              questionHtml:
                "Dlaczego 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. instaluje się do <code>$VIBECRAFTED_ROOT/.vibecrafted/</code>, a nie do <code>$HOME/.agents/</code>?",
              answerHtml:
                "<code>$VIBECRAFTED_ROOT/.vibecrafted/</code> to wspólne miejsce pracy całego systemu. Katalogi agentów tylko się do niego odwołują. Dzięki temu logika, artefakty i skrypty pomocnicze nie rozchodzą się po różnych folderach.",
            },
            {
              questionHtml:
                "Czy mogę zainstalować 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. bez edycji konfiguracji shella?",
              answerHtml:
                "Tak. W trybie interaktywnym możesz pominąć instalację helperów. Jeśli chcesz użyć ich tylko w bieżącej sesji, załaduj ręcznie <code>${XDG_CONFIG_HOME:-$HOME/.config}/vetcoders/vc-skills.sh</code>.",
            },
            {
              questionHtml:
                "Co dokładnie sprawdza <code>vibecrafted doctor</code>?",
              answerHtml:
                "<code>doctor</code> sprawdza, czy lokalne środowisko jest gotowe do pracy z agentami: czy istnieje wspólny katalog narzędzi, czy helpery są dostępne, czy odwołania agentów działają, czy wymagane fundamenty <code>loctree-mcp</code> i <code>aicx-mcp</code> są na miejscu, czy narzędzia dowodowe takie jak prview i ScreenScribe są dostępne oraz czy shell nie wypisuje zbędnych komunikatów, które mogłyby zepsuć automatyzację.",
            },
            {
              questionHtml:
                "Którą ścieżkę instalacji wybrać w CI lub automatyzacji?",
              answerHtml:
                'W CI użyj <code>make install</code>, jeśli potrzebujesz prostej instalacji bez pytań. Jeśli chcesz pełnej kontroli z poziomu komendy, uruchom <code>python3 scripts/vetcoders_install.py install --source "$PWD" --non-interactive</code>.',
            },
          ],
        },
        {
          title: "Skille, agenci, zależności",
          items: [
            {
              open: true,
              questionHtml: "Jaka jest różnica między skillem a agentem?",
              answerHtml:
                "Agent to wykonawca, na przykład Codex, Claude albo Gemini. Skill to zestaw zasad, instrukcji i kontekstu, który mówi agentowi, jak ma pracować na danym etapie.",
            },
            {
              questionHtml:
                "Dlaczego nie wystarczy ChatGPT, Copilot albo jeden wielki prompt?",
              answerHtml:
                "Bo 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. nie jest tylko rozmową z modelem. Framework kotwiczy pracę w repo, decyzjach, artefaktach i kolejnych iteracjach. Dzięki temu agent pracuje na realnym kontekście produktu, a nie na luźnym opisie zadania.",
            },
            {
              questionHtml: "Czy loctree i aicx są wymagane?",
              answerHtml:
                "Nie uczciwie. <code>loctree</code> i <code>aicx</code> są wymaganymi fundamentami: jedno daje agentowi percepcję struktury, drugie przywraca wcześniejsze decyzje i intencje. Jeśli któregoś brakuje, najpierw napraw warstwę fundamentów.",
            },
            {
              questionHtml:
                "Jak przepchnąć <code>screenscribe review</code> przez wczesną walidację modeli?",
              answerHtml:
                "Najprościej: upewnij się, że CLI jest dostępne na <code>PATH</code>, konfiguracja w <code>~/.config/screenscribe/config.env</code> pasuje do ustawień Libraxis AI, alias modeli to <code>ai-suggestions</code>, a zwykłe uruchomienia review dostają <code>--no-vision</code>. Szczegóły tej bramki są opisane w dokumencie ScreenScribe Review Gate.",
            },
            {
              questionHtml: "Co to jest pętla Marbles?",
              answerHtml:
                "Marbles to sposób na doprowadzanie pracy agentów do wspólnego, stabilnego wyniku. Framework uruchamia kolejne rundy implementacji, sprawdzenia i poprawek, aż najważniejsze problemy zostaną usunięte albo jasno nazwane.",
            },
          ],
        },
        {
          title: "Praca z frameworkiem",
          items: [
            {
              open: true,
              questionHtml:
                "Kiedy używać <code>vc-justdo</code> zamiast ręcznych faz?",
              answerHtml:
                "Użyj <code>vc-justdo</code>, gdy zadanie jest jasne i chcesz, żeby agent przeszedł przez nie od początku do końca. Ręczne fazy wybierz wtedy, gdy chcesz bliżej pilnować kierunku, decyzji technicznych albo architektury.",
            },
            {
              questionHtml: "Czy mogę uruchomić 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. w CI/CD?",
              answerHtml:
                "Tak. Bezpośrednia ścieżka instalacji jest nieinteraktywna, a skille takie jak review, followup i release są wprost pomyślane jako powtarzalne bramki jakości albo pakowania.",
            },
            {
              questionHtml:
                "Co znajduje się w <code>$VIBECRAFTED_ROOT/.vibecrafted/artifacts/</code>?",
              answerHtml:
                "Tam trafiają plany, raporty, transkrypty i metadane z większych uruchomień. Dzięki temu praca agentów zostawia trwały ślad i nie znika w historii terminala.",
            },
            {
              questionHtml: "Czym jest Definition of Undone?",
              answerHtml:
                "Definition of Undone to audyt niedomkniętych miejsc. Sprawdza, czy ktoś spoza zespołu może projekt znaleźć, zrozumieć, zainstalować i zaufać mu na tyle, żeby naprawdę z niego skorzystać.",
            },
          ],
        },
        {
          title: "Licencja i użycie komercyjne",
          items: [
            {
              open: true,
              questionHtml: "Czy 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. jest open source?",
              answerHtml:
                "𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. jest udostępniany na licencji Business Source License 1.1. Repo jest publiczne i można z niego korzystać, ale nie jest to klasyczny open source na licencji permisyjnej.",
            },
            {
              questionHtml:
                "Czy małe zespoły mogą używać 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. produkcyjnie?",
              answerHtml:
                "Tak. Ten grant pozwala pojedynczym deweloperom i zespołom mniejszym niż pięć osób używać frameworka w produkcji, o ile nie oferują konkurencyjnej usługi hostowanej ani rozwiązania osadzonego.",
            },
            {
              questionHtml:
                "Co jeśli potrzebuję szerszego modelu komercyjnego?",
              answerHtml:
                "Skorzystaj z formularza kontaktowego na tej stronie (albo adresu z licencji w repo) i opisz wielkość zespołu oraz planowane użycie. Vetcoders czyta każdą wiadomość i odpowiada warunkami licencjonowania dopasowanymi do przypadku — plik LICENSE pozostaje źródłem prawdy o tym, co wymaga osobnej umowy. Nie ma jeszcze cennika samoobsługowego; ścieżką komercyjną jest kontakt.",
            },
          ],
        },
      ],
      links: [
        { href: "/pl/quickstart/", label: "Szybki start" },
        {
          href: "https://github.com/vetcoders/vibecrafted/blob/main/docs/FAQ-ANSWERED.md",
          label: "Pełne FAQ - markdown",
        },
        {
          href: "https://github.com/vetcoders/vibecrafted/blob/main/docs/runtime/SCREENSCRIBE_REVIEW.md",
          label: "Bramka review ScreenScribe",
        },
        {
          href: "https://github.com/vetcoders/vibecrafted/blob/main/docs/runtime/CONTENT_TRUTH.md",
          label: "Matryca prawdy contentowej",
        },
        {
          href: "https://github.com/vetcoders/vibecrafted/blob/main/LICENSE",
          label: "Licencja",
        },
      ],
    },
    wizardLayout: {
      defaultDescription: "Zainstaluj Vibecrafted lokalnie.",
      closeInstaller: "Zamknij instalator",
      closeInstallerShort: "Zamknij",
    },
    diffusionCanvas: {
      boardLabel: "Plansza",
      loopPrefix: "Pętla",
    },
    marbleCanvas: {
      marbles: "Marbles",
      converge: "Konwergencja",
    },
    installer: {
      wizard: {
        terminalKicker: "Podgląd instalacji",
        terminalBody: "Skrypt uruchamia lokalny instalator.",
        welcomeCta: "Pokaż jak to działa",
        installPasteKicker: "Krok 1 · Skopiuj",
        installPasteHint: "Wklej do terminala (macOS lub Linux)",
        installRunKicker: "Krok 2 · Uruchom",
        installRunHint:
          "Instalator otwiera się lokalnie i pokazuje każdy krok tutaj.",
        installPreviewKicker: "Podgląd",
        installPreviewBody: "Czysta instalacja, krok po kroku.",
        checkSummaryAria: "Podsumowanie diagnostyki",
        doneStamp: "Status · Gotowy",
        steps: {
          labels: {
            steps: "Kroki",
            required: "wymagane",
            optional: "opcjonalne",
            previous: "Poprzedni krok",
            next: "Następny krok",
            quickStart: "Start",
            toFinish: "Do finału",
            stepAria: "krok",
            ofAria: "z",
          },
        },
        welcomeNotes: [
          {
            label: "Start w terminalu",
            value: "Komenda startowa uruchamia lokalny instalator.",
          },
          {
            label: "Jawna zgoda",
            value: "Widzisz plan, zanim cokolwiek się zmieni.",
          },
        ],
        terminal: [
          "$ curl -fsSL https://vibecrafted.io/install.sh | bash",
          "[bootstrap] Pobieranie install.sh...",
          "[bootstrap] Rozwiązywanie kanału main...",
          "[bootstrap] Weryfikacja integralności... SHA256 \u2713  Signature \u2713",
          "[bootstrap] Przygotowywanie środowiska lokalnego w ~/.vibecrafted/",
          "",
          "[bootstrap] Uruchamianie instalatora...",
          "",
          "[instalator] Witaj -> Wyjaśnienie -> Sprawdzenie -> Lista kontrolna",
          "[instalator] Otwieranie lokalnego widoku instalacji.",
          "[instalator] Rozpoczynanie instalacji...",
          "[instalator] [etap] Konfiguracja fundamentów",
          "[instalator] [etap] Instalacja Vibecrafted",
          "[instalator] Tutaj będą pojawiać się komunikaty na żywo...",
        ],
        pages: [
          {
            label: "Witaj",
            title: "Zainstaluj Vibecrafted",
            body: ["Wklej jedną komendę. Sprawdź plan. Zainstaluj lokalnie."],
            hint: "Instalacja lokalna.",
          },
          {
            label: "Skład",
            title: "Manifest instalacji",
            body: [],
            hint: "Główne komponenty frameworka.",
          },
          {
            label: "Stan",
            title: "Weryfikacja środowiska",
            body: [
              "Vibecrafted sprawdza, co już jest na miejscu i co trzeba doinstalować.",
            ],
            hint: "Najpierw stan.",
          },
          {
            label: "Instaluj",
            title: "Egzekucja instalacji",
            body: ["Kliknij Zainstaluj, żeby uruchomić plan."],
            hint: "Uruchom plan.",
          },
          {
            label: "Gotowe",
            title: "Framework wdrożony",
            body: ["Deck komend jest dostępny lokalnie. Kolejne kroki:"],
            hint: "Środowisko jest gotowe.",
          },
        ],
        nextCommands: [
          { cmd: "vibecrafted doctor", desc: "Weryfikacja stanu" },
          { cmd: "vibecrafted init claude", desc: "Inicjalizacja sesji" },
          { cmd: "vibecrafted help", desc: "Referencja komend" },
        ],
      },
      live: {
        regionLabel: "Instalator Vibecrafted",
        stepsAria: "Kroki",
        brandFallback: "Vibecrafted.",
        labels: {
          welcome: "Start",
          diagnostics: "Diagnostyka",
          plan: "Plan",
          consent: "Zgoda",
          execute: "Instaluj",
          ready: "Gotowe",
        },
        welcome: {
          title: "Zainstaluj Vibecrafted",
          leads: [],
          cta: "Start",
          componentsFound: "komponentów gotowych",
          componentsTotal: "łącznie",
          missingList: "Brakujące komponenty",
          planPreview: "Plan instalacji",
          timeEstimate: "Około 2 minuty",
          sourceDir: "z",
          reRun: "Skanuj ponownie",
        },
        diagnostics: {
          title: "Co znaleziono",
          present: "Obecne",
          missing: "Brakujące",
          empty: "Brak skanu. Spróbuj ponownie.",
        },
        plan: {
          title: "Co się wydarzy",
          empty: "Brak planu. Sprawdź źródła i spróbuj odświeżyć.",
          stepLabel: "Krok",
        },
        consent: {
          title: "Potwierdź instalację",
          body: "Kliknij Zainstaluj, żeby uruchomić plan.",
          accept: "Akceptuję plan",
          withShell: "Zintegruj helpery shella (zalecane)",
          cta: "Zainstaluj teraz",
          again: "Instalacja zakończona. Możesz uruchomić ją ponownie.",
          running: "Instalacja trwa. Otwórz krok postępu.",
        },
        execute: {
          title: "Trwa instalacja",
          stage: "Aktualny etap",
          waiting: "Czekam na pierwszą linię outputu…",
        },
        ready: {
          titleOk: "Zainstalowano",
          titleFail: "Instalacja nie zakończyła się czysto",
          exit: "Kod wyjścia",
          openGuide: "Otwórz START_HERE.md",
          nextSteps: "Następne kroki",
          reinstall: "Uruchom ponownie",
        },
        nav: {
          back: "Wstecz",
          next: "Dalej",
          refresh: "Odśwież preflight",
        },
        status: {
          loadingPreflight: "Skanuję…",
          loadFailed: "Skan się nie powiódł",
          notConnected:
            "Uruchom instalator komendą curl i zostaw terminal otwarty.",
        },
        nextCommands: [
          { cmd: "vibecrafted doctor", desc: "Weryfikacja stanu" },
          { cmd: "vibecrafted init claude", desc: "Inicjalizacja sesji" },
          { cmd: "vibecrafted help", desc: "Lista komend" },
        ],
      },
    },
  },
} as const satisfies CopyShape<typeof en>;
