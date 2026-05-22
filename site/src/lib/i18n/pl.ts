// Kanoniczne źródła publicznego copy są zmapowane w
// docs/content-truth.manifest.json i opisane dla ludzi w
// docs/runtime/CONTENT_TRUTH.md.
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
    get: "Pobierz",
    search: "Szukaj dokumentacji",
    searchAll: "Cała powierzchnia",
    searchClose: "Zamknij wyszukiwanie",
    install: "Instaluj",
    vc: "VC",
    vcLabel: "VetCoders",
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
  },
  footer: {
    ariaLabel: "Stopka strony",
    brand: "𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍.",
    byline: "with AI Agents by VetCoders",
    tagline:
      "Od repo po agentach do wydania, które ktoś obcy może zainstalować.",
    copyright: "(c)2024-2026 VetCoders",
    license: "BSL 1.1",
  },
  v2Chrome: {
    footer: {
      ariaLabel: "Stopka strony",
      byline: "z agentami AI od VetCoders",
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
      title:
        "vibecrafted. — Release engine dla oprogramowania generowanego przez AI.",
      description:
        "Doprowadza repo po agentach do wydania, które obca osoba może zainstalować, zrozumieć i bezpiecznie użyć.",
    },
    faq: {
      title: "vibecrafted. · FAQ",
      description: "Najczęstsze pytania dotyczące Vibecrafted.",
    },
    dou: {
      title: "Vibecrafted. · DoU — The Definition of Undone",
      description:
        "Brutalna przestrzeń między działającym systemem a produktem, który obcy mogą odkryć, zainstalować, któremu zaufają i za który zapłacą.",
    },
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
    hero: {
      frameworkTitleHtml:
        'Release <span class="manifesto-title__framework-accent">engine</span> dla oprogramowania generowanego przez AI',
      lead: "Doprowadź repo po agentach do wydania, które obca osoba może zainstalować, zrozumieć i użyć.",
      quoteHtml:
        "Weź repo po agentach. Odsiej vibe od prawdy i doprowadź je do wydania, któremu można zaufać.",
      evidence: "Dowody",
      quickstart: "Otwórz szybki start",
      quickstartHref: "/pl/quickstart/",
    },
    pipeline: {
      label: "Metoda",
      title: "Twórz → Konwerguj → Wypuść",
      sub: "Mały model operacyjny do kształtowania pracy agentów, redukowania dryfu i przygotowania release surface, którą da się obejrzeć.",
      hero: {
        stages: [
          { name: "Scaffold", subtitle: "przygotuj powierzchnię" },
          { name: "Craft", subtitle: "kształtuj z agentami" },
          {
            name: "Convergence",
            subtitle: "domknij nierozwiązane",
            kind: "core" as const,
          },
          { name: "DoU", subtitle: "znajdź to, co nadal niedokończone" },
          { name: "Release", subtitle: "wypuść dla obcych użytkowników" },
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
    A["Scaffold"] --> B["Init"]
    B --> C["Workflow"]
    C --> D["Follow-up"]
    D --> E{{"Pętla Marbles"}}
    E --> F["DoU"]
    F --> G["Decorate"]
    G --> H["Hydrate"]
    H --> I["Release"]

    classDef stage fill:#0d1728,stroke:#31415d,color:#f3efe7,stroke-width:1.3px;
    classDef core fill:#1a1110,stroke:#d8894b,color:#ffd9bd,stroke-width:2.2px;
    class A,B,C,D,F,G,H,I stage;
    class E core;`,
      mermaidModal: {
        open: "Rozwiń pełny pipeline",
        close: "Zamknij diagram pipeline'u",
        title: "Pełny pipeline — Scaffold → Marbles → Release",
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
    foundation: {
      label: "Fundamenty runtime",
      title: "Infrastruktura pod frameworkiem.",
      sub: "To są fundamenty, a nie skille: wzrok, pamięć, artefakty review i narracyjny dowód z runtime dla warstwy agentowej.",
      learnPath: {
        label: "Najpierw ucz się tutaj",
        lead: "Najpierw zrozum powierzchnię produktu, dopiero potem schodź do źródeł.",
        quickstart: "Szybki start",
        faq: "FAQ",
        framework: "Framework",
      },
      reveal: "Otwórz warstwę",
      bullets: {
        loctree: [
          "Mapuje repozytorium zanim ktokolwiek zacznie je zmieniać.",
          "Chroni przed ślepymi refaktorami i błędnym poczuciem pewności.",
          "Używaj go, gdy ryzykiem jest struktura.",
        ],
        aicx: [
          "Odzyskuje wcześniejsze decyzje, zamiary i kontekst.",
          "Utrzymuje ciągłość pracy między sesjami.",
          "Najbardziej przydatny przy zadaniach rozciągniętych w czasie.",
        ],
        prview: [
          "Pakietuje review w trwałe findingi i czytelny gate.",
          "Zamyka lukę między terminal dumpem a realnym artefaktem.",
          "Używaj przed merge i przed release.",
        ],
        ScreenScribe: [
          "Zamienia nagrania ekranu w ustrukturyzowane dowody.",
          "Patrzy na to, co użytkownik naprawdę zobaczył.",
          "Najlepszy, gdy trzeba zebrać dowód z runtime.",
        ],
      },
      cards: [
        {
          number: "01",
          href: "https://loct.io",
          name: "loctree",
          iconClass: "foundation-icon foundation-icon--steel",
          role: "Struktura",
          body: "Strukturalna inteligencja codebase. Mapuje pliki, zależności, huby i blast radius zanim agent dotknie jakiejkolwiek zmiany.",
          linkLabel: "loct.io",
        },
        {
          number: "02",
          href: "https://github.com/Loctree/aicx/releases",
          name: "aicx",
          iconClass: "foundation-icon foundation-icon--copper",
          role: "Pamięć",
          body: "Odzyskiwanie decyzji dla warstwy agentowej. CLI `aicx` / serwer `aicx-mcp` indeksują decyzje, intencje i wyniki, żeby sesje mogły odtworzyć co zostało ustalone i dlaczego.",
          linkLabel: "github.com/Loctree/aicx/releases",
        },
        {
          number: "03",
          href: "https://github.com/Loctree/prview/releases",
          name: "prview",
          iconClass: "foundation-icon foundation-icon--patina",
          role: "Review",
          body: "Ustrukturyzowane artefakty review. Zamienia zmiany w kodzie w trwałe findingi, które mogą czytać kolejne agenty i ludzie.",
          linkLabel: "github.com/Loctree/prview/releases",
        },
        {
          number: "04",
          href: "https://github.com/VetCoders/ScreenScribe",
          name: "ScreenScribe",
          iconClass: "foundation-icon foundation-icon--muted",
          role: "Runtime",
          body: "Narracyjny review runtime. Zamienia nagrania ekranu z komentarzem w ustrukturyzowane findingi o realnej powierzchni produktu.",
          linkLabel: "github.com/VetCoders/ScreenScribe",
        },
      ],
    },
    marbles: {
      label: "Marbles",
      title: "Odszumiaj aż koło się zapełni",
      sub: "Agenci AI to stochastyczne papugi. Każda generacja wprowadza szum. Nie da się tego obejść promptem. Iterujesz.",
      heading: "Izomorfizm",
      formulas: [
        {
          label: "Dyfuzja obrazu",
          code: "szum → odszumienie × N → obraz",
        },
        {
          label: "Dyfuzja kodu",
          code: "chaos → redukcja_entropii × N → produkt",
        },
      ],
      stepsAria: "Etapy konwergencji",
      steps: [
        "Krok 0: Czysty szum",
        "Krok 1: Init",
        "Krok 2: Implementacja",
        "Krok N: DoU < próg = DoD",
      ],
      note: "Nie ma ustalonej liczby pętli. Pętla działa aż P0=P1=P2=0 i koło się wypełni. Wczesne pętle robią korekty strukturalne, późne pętle dopracowują detale.",
      frameworkHref: "/pl/framework/",
      portal: {
        kicker: "Interaktywny playground",
        title: "Otwórz tablicę konwergencji jako osobną powierzchnię",
        body: "Tablica nie jest już wciśnięta w landing page. Pełnoekranowy playground jest teraz powierzchnią dydaktyczną: ręczne fazy, prompt poleceń i ruch board-first.",
        cta: "Wejdź do playgroundu",
        note: "Board-first. Ręczny. Kształtowany komendami. Zbudowany dla kierunku 1.3.0.",
      },
    },
    evidence: {
      titleHtml: "Mniej magii<br />Więcej pracy, którą da się obejrzeć",
      lead: "Słownictwo może być żywe, jeśli system pozostaje inspekowalny: kontekst przed edycją, dowód po runie i powierzchnia release, która mówi, co nadal jest niepewne.",
      revealLabel: "Otwórz notatkę",
      closeLabel: "Zamknij notatkę",
      detailsLabel: "Konsekwencja operacyjna",
      items: [
        {
          number: "01",
          accent: "steel",
          title: "Kontekst wzbogacony AST",
          body: "Modele psują się szybciej, kiedy piszą w repo na ślepo. Mapy strukturalne dają sesji punkty orientacyjne, zanim zacznie edytować.",
          details: [
            "Loctree i pokrewne mapy strukturalne zamieniają repo w teren nawigacyjny jeszcze zanim zacznie się edycja.",
            "Agent pracuje na nazwanych plikach, blast radiusie i topologii symboli zamiast dryfować w mgle grepów.",
            "To obniża fałszywą pewność: jeśli struktura kłóci się z promptem, wygrywa struktura.",
          ],
        },
        {
          number: "02",
          accent: "copper",
          title: "Stochastyczna konwergencja",
          body: "Generowanie kodu jest szumne. Pętla Marbles daje temu szumowi miejsce: małe pętle, kontrprzykłady i widoczną pracę nierozwiązaną.",
          details: [
            "Jedno odpalenie nie jest dowodem. Pętla stale tnie najbardziej ryzykowne kłamstwo, aż runtime zacznie zgadzać się z obietnicą.",
            "Wczesne pętle usuwają fałsze strukturalne; późniejsze ściskają chropowatość do spokojniejszego i bardziej powtarzalnego kształtu produktu.",
            "Celem nie jest „ładny output”, tylko stan, w którym problemy P0/P1/P2 zbiegają do zera.",
          ],
        },
        {
          number: "03",
          accent: "patina",
          title: "𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚜𝚖𝚊𝚗𝚜𝚑𝚒𝚙",
          body: "Ustrukturyzowana współpraca człowieka i AI. Rzemiosło jest w handoffie: ludzie trzymają scope, smak i decyzje nieodwracalne; agenci robią fieldwork z dowodem przyczepionym do pracy.",
          details: [
            "Ludzie nie ścigają się z modelem na szybkość pisania; biorą odpowiedzialność za scope, truth checki i nieodwracalne decyzje.",
            "Agenci dostają przestrzeń do głębokiego fieldworku, ale gates, artefakty review i dowód z runtime trzymają finalny kształt w ryzach.",
            "Dlatego produkt może być żywy, ale nie mistyczny: rzemiosło pozostaje inspekowalne.",
          ],
        },
      ],
    },
    skills: {
      label: "Zestaw skilli",
      title: "16 wyspecjalizowanych workflowów",
      sub: "Zakodowane na twardo procedury wykute w okopach. Napędzane modelami frontier i inteligencją strukturalną w Rust.",
      scrollLeft: "Przewiń w lewo",
      scrollRight: "Przewiń w prawo",
      revealLabel: "Flip po kontekst. Klik po pełną notatkę.",
      openLabel: "Otwórz notatkę skilla",
      closeLabel: "Zamknij notatkę skilla",
      phaseLabel: "Najlepsze miejsce w pętli",
      tagsLabel: "Tagi operacyjne",
      triggersLabel: "Typowe prompty wejściowe",
      cards: [
        {
          id: "vc-scaffold",
          phase: "Faza 1 · Twórz",
          phaseClass: "build",
          cardClass: "card--accent-steel",
          descHtml:
            "Planowanie architektury od założyciela. Mapuje krajobraz i tworzy scoped plan budowy do realizacji przez agentów.",
          tags: ["architektura", "scoping", "MVP"],
          triggerHtml: '"Scaffold: real-time dashboard" · "Zaplanuj to"',
        },
        {
          id: "vc-init",
          phase: "Faza 1 · Twórz",
          phaseClass: "build",
          descHtml:
            "Bootstrap sesji agenta. Zmusza modele do zaindeksowania historii (AICX), odczytania AST (Loctree) i weryfikacji bramek jakości.",
          tags: ["bootstrap", "kontekst", "ground truth"],
          triggerHtml: '"Init session" · "Zainicjuj" · "Daj kontekst"',
        },
        {
          id: "vc-workflow",
          phase: "Faza 1 · Twórz",
          phaseClass: "build",
          descHtml:
            "Pipeline ERi: Zbadaj &rarr; Researchu &rarr; Zaimplementuj. Ustrukturyzowana implementacja z kumulatywnym kontekstem.",
          tags: ["ERi", "loctree", "research"],
          triggerHtml: '"Workflow" · "Zbadaj i zaimplementuj" · "ERi"',
        },
        {
          id: "vc-agents",
          phase: "Flota Frontier",
          phaseClass: "build card-phase--copper",
          cardClass: "card--accent-copper",
          descHtml:
            "Spawnuj zewnętrzną flotę (Codex, Claude, Gemini) w prawdziwych terminalach z izolowanym kontekstem i trwałymi artefaktami.",
          tags: ["frontier", "izolacja", "eval"],
          triggerHtml: '"Spawn agents" · "Agent fleet" · "Odpal agentów"',
        },
        {
          id: "vc-research",
          phase: "Faza 1 · Twórz",
          phaseClass: "build",
          descHtml:
            "Triangulacja trzech agentów. Rzuć trzy modele na ten sam problem i zsyntetyzuj dokument badawczy bez luk.",
          tags: ["triangulacja", "SoTA", "prawda"],
          triggerHtml: '"Research this" · "Zbadaj to" · "Triple research"',
        },
        {
          id: "vc-partner",
          phase: "Faza 1 · Twórz",
          phaseClass: "build",
          descHtml:
            "Parowanie executive. Tryb wspólnego mózgu do strategicznego debugowania i triażu architektonicznego z delegowanym fieldworkiem.",
          tags: ["partner", "strategia", "ownership"],
          triggerHtml: '"Partner mode" · "Idziemy razem" · "You drive"',
        },
        {
          id: "vc-justdo",
          phase: "Dostawa E2E",
          phaseClass: "build card-phase--light",
          cardClass: "card--accent-steel",
          descHtml:
            "Autonomiczna dostawa. Bierze mandat, decyduje, implementuje, weryfikuje i pakuje bez ceremonii.",
          tags: ["autonomiczny", "dostawa", "wow effect"],
          triggerHtml: '"Just do it" · "Zrób to" · "Dowieź to"',
        },
        {
          id: "vc-followup",
          phase: "Faza 1 · Twórz",
          phaseClass: "build",
          descHtml:
            "Sprawdzian rzeczywistości po implementacji: co się poprawiło, co zdryfowało i czy praca jest gotowa na następną bramkę.",
          tags: ["audyt", "severity", "gotowość"],
          triggerHtml: '"Follow-up check" · "Czy są jeszcze luki?"',
        },
        {
          id: "vc-marbles",
          phase: "Faza 2 · Konwerguj",
          phaseClass: "loop-phase",
          cardClass: "card--accent-copper",
          descHtml:
            "Iteracyjna konwergencja. Pętla aż entropia zostanie zmiażdżona (P0=0, P1=0, P2=0). Adaptacyjne odszumianie kodu.",
          tags: ["dyfuzja", "konwergencja", "entropia"],
          triggerHtml: '"Marbles" · "Kulki" · "Loop until done"',
        },
        {
          id: "vc-review",
          phase: "Faza 1 · Twórz",
          phaseClass: "build",
          descHtml:
            "Pipeline review PR. Generuje artefakty prview i wyciąga maksimum findingów z dowodami na poziomie linii.",
          tags: ["review", "prview", "findings"],
          triggerHtml: '"Review PR" · "Daj findings" · "Run prview"',
        },
        {
          id: "vc-prune",
          phase: "Faza 1 · Twórz",
          phaseClass: "build",
          descHtml:
            "Bezlitosne czyszczenie. Definiuje stożek runtime i wycina martwy kod, eksperymenty i bliznowatą tkankę bez litości.",
          tags: ["prune", "clean", "runtime cone"],
          triggerHtml: '"Prune repo" · "Strip dead code" · "Wyczyść repo"',
        },
        {
          id: "vc-delegate",
          phase: "Fallback",
          phaseClass: "build card-phase--muted",
          descHtml:
            "Bezpieczna natywna delegacja przy użyciu Task tool Claude. Równoległość w sesji dla małych, ograniczonych zadań.",
          tags: ["natywny", "Task tool", "sandboxed"],
          triggerHtml: '"Delegate safely" · "Native agents"',
        },
        {
          id: "vc-dou",
          phase: "Faza 3 · Wypuść",
          phaseClass: "ship",
          descHtml:
            "Definition of Undone. Audytuje powierzchnię produktu, ścieżki instalacji i SEO. Mierzy dystans do launchu.",
          tags: ["DoU", "Plague Score", "lejek"],
          triggerHtml: '"DoU audit" · "Czy jesteśmy gotowi?"',
        },
        {
          id: "vc-decorate",
          phase: "Faza 3 · Wypuść",
          phaseClass: "ship",
          cardClass: "card--accent-steel",
          descHtml:
            "Spójność wizualna. Wykrywa tokeny marki i podnosi słabe wzorce do premium języka interakcji.",
          tags: ["smaczki", "polish", "intentional"],
          triggerHtml: '"Decorate" · "Udekoruj" · "Make it look good"',
        },
        {
          id: "vc-hydrate",
          phase: "Faza 3 · Wypuść",
          phaseClass: "ship",
          descHtml:
            "Pakowanie rynkowe. Realizuje pracę poza kodem: listingi marketplace, poprawki SEO i ścieżki onboardingu.",
          tags: ["pakowanie", "SEO", "onboarding"],
          triggerHtml: '"Hydrate" · "Make it shippable" · "Nawodnij"',
        },
        {
          id: "vc-release",
          phase: "Krok finalny",
          phaseClass: "ship card-phase--patina",
          cardClass: "card--accent-patina",
          descHtml:
            "Finałowy kamień milowy. Tagi, changelogi, publikacja w rejestrze i mechaniki go-to-market. Wyślij to ludziom.",
          tags: ["ship", "publikacja", "rynek"],
          triggerHtml: '"Release" · "Ship to market" · "Wypuść wersję"',
        },
      ],
    },
    dou: {
      label: "DoU",
      title: "Definicja niezrobionego",
      quote:
        "Agenci AI często potrafią sprawić, że rzecz działa. Nie sprawiają automatycznie, że da się ją znaleźć, zainstalować, zaufać jej albo za nią zapłacić.",
      lead: "Problem rzadko dotyczy samej jakości kodu. Chodzi o przestrzeń między działającym systemem a produktem, który obcy mogą odkryć, zainstalować, któremu zaufają i za który zapłacą.",
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
    get: {
      label: "Pobierz 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍.",
      title: "Zainstaluj release engine. Uruchom workflow.",
      sub: "Zainstaluj panel kontrolny i wejdź w pierwszy workflow prowadzący do realnego release.",
      cards: [
        {
          step: "01",
          title: "Zainstaluj panel kontrolny",
          body: "Zainstaluj framework lokalnie przez publiczną ścieżkę. Jeśli chcesz prowadzony instalator w przeglądarce, użyj <code>make vibecrafted</code> w repo.",
          command: "curl -fsSL https://vibecrafted.io/install.sh | bash",
        },
        {
          step: "02",
          title: "Wejdź przez command deck",
          body: "Główne drzwi wejściowe to teraz <code>vibecrafted</code>. Codzienne powierzchnie skilli są dostępne jako bezpośrednie komendy <code>vc-*</code>.",
          command: "vibecrafted help && vibecrafted init claude",
        },
        {
          step: "03",
          title: "Napędzaj prawdziwą pracę",
          body: "Zbadaj codebase, odtwórz ground truth i deleguj implementację do równoległych agentów &mdash; wszystko w jednym pipeline.",
          command:
            'vibecrafted workflow claude --prompt "Plan and implement auth module"',
        },
        {
          step: "04",
          title: "Konwerguj aż przestanie kłamać",
          body: "Pętla marbles znajduje to, co wciąż jest źle i eliminuje to. Każde przejście wyostrza powierzchnię.",
          command: "vibecrafted marbles codex --count 3 --depth 3",
        },
      ],
      installWizardHref: "/pl/install/",
      installWizardLabel: "Otwórz prowadzony instalator",
      links: [
        { href: "/pl/quickstart/", label: "Szybki start" },
        { href: "/pl/faq/", label: "FAQ" },
        { href: "https://github.com/VetCoders/vibecrafted", label: "GitHub" },
      ],
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
          href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/FOUNDATION.md",
          label: "Stack zależności",
        },
        {
          href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/QUICK_START.md",
          label: "Szybki start w Markdownie",
        },
        {
          href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/runtime/CONTRACT.md",
          label: "Kontrakt runtime",
        },
        {
          href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/runtime/SCREENSCRIBE_REVIEW.md",
          label: "Bramka review ScreenScribe",
        },
        {
          href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/runtime/CONTENT_TRUTH.md",
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
                "Jeśli potrzebujesz szerszych uprawnień komercyjnych, skontaktuj się z VetCoders. Przeczytaj warunki licencji i ustal właściwą ścieżkę.",
            },
          ],
        },
      ],
      links: [
        { href: "/pl/quickstart/", label: "Szybki start" },
        {
          href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/FAQ-ANSWERED.md",
          label: "Pełne FAQ - markdown",
        },
        {
          href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/runtime/SCREENSCRIBE_REVIEW.md",
          label: "Bramka review ScreenScribe",
        },
        {
          href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/runtime/CONTENT_TRUTH.md",
          label: "Matryca prawdy contentowej",
        },
        {
          href: "https://github.com/VetCoders/vibecrafted/blob/main/LICENSE",
          label: "Licencja",
        },
      ],
    },
    references: {
      label: "Referencje",
      title: "Ground Truth i inspiracje",
      sub: "Poniższa bibliografia rozszerza listę manifestu o wpływy modelowania strukturalnego i konwergencji wyłonione ponownie w wewnętrznej pracy groundingowej AICX.",
      modal: {
        eyebrow: "Źródło referencji",
        title: "Ta strona zostanie otwarta w nowej karcie.",
        sourceLabel: "Źródło",
        backLabel: "<<< Wróć",
        openLabel: "Otwórz >>>",
        backHover: "Powrót do portalu",
        openHover: "Przejdź do strony",
      },
      items: [
        {
          citationHtml:
            "Morris, K.; B&ouml;ckeler, B. (2026). <em>Humans and Agents in Software Engineering Loops</em>; <em>Harness Engineering</em>; <em>Context Engineering for Coding Agents</em>. Thoughtworks / Martin Fowler.",
          note: "Framing why-loop / how-loop, projektowanie harnessów i dyscyplina workflow prowadzonego przez człowieka stojące za SHACE i rolą operatora.",
          links: [
            {
              href: "https://martinfowler.com/articles/exploring-gen-ai/humans-and-agents.html",
              label: "Humans & Agents",
            },
            {
              href: "https://martinfowler.com/articles/harness-engineering.html",
              label: "Harness Engineering",
            },
            {
              href: "https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html",
              label: "Context Engineering",
            },
          ],
        },
        {
          citationHtml:
            "Gong, L.; Elhoushi, M.; Cheung, A. (2024). <em>AST-T5: Structure-Aware Pretraining for Code Generation</em>.",
          note: "Wątek pretreningu świadomego struktury stojący za insistencją 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍., że modele nie powinny pisać do repo na ślepo.",
          links: [{ href: "https://arxiv.org/abs/2401.03003", label: "arXiv" }],
        },
        {
          citationHtml:
            "Guo, D. et al. (2021). <em>GraphCodeBERT: Pre-training Code Representations with Data Flow</em>.",
          note: "Komplementarny wynik świadomy struktury, który wzmocnił argument za eksternalizowanym kształtem kodu, mimo że GraphCodeBERT modeluje przepływ danych, a nie AST.",
          links: [{ href: "https://arxiv.org/abs/2009.08366", label: "arXiv" }],
        },
        {
          citationHtml:
            "Cunningham, W. (1992) i późniejsza literatura o długu technicznym.",
          note: "Konceptualny przodek DoU: działający kod to nie to samo co zdrowy, godny zaufania, gotowy do wysyłki system.",
          links: [
            {
              href: "https://martinfowler.com/bliki/TechnicalDebt.html",
              label: "Technical Debt",
            },
          ],
        },
        {
          citationHtml:
            "CEGIS / synteza prowadzona kontrprzykładami i późniejsza literatura o optymalizacji prowadzonej kontrprzykładami.",
          note: "Linia konwergencji za Marbles: pętla, inspekcja awarii, dodanie kontrprzykładów, redukcja przestrzeni programów, powtarzanie aż powierzchnia przestanie kłamać.",
          links: [
            {
              href: "https://www.cprover.org/synthesis",
              label: "Przegląd syntezy prowadzonej kontrprzykładami",
            },
          ],
        },
        {
          citationHtml: "VetCoders (2026). <em>Manifest 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍.</em>.",
          note: "Źródło pierwotne dla SHACE, Marbles, Loctree Mapping, PSCD i founderskiej Definition of Undone jako oryginalnych konceptów 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍.",
          links: [
            {
              href: "https://github.com/VetCoders/vibecrafted/blob/main/docs/runtime/MANIFESTO_PL.md",
              label: "Przeczytaj manifest",
            },
          ],
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
} as const;
