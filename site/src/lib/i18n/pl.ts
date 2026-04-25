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
    brand: "Vibecrafted.",
    byline: "with AI Agents by VetCoders",
    tagline:
      "Od repo wygenerowanego przez AI do produktu gotowego do release'u.",
    copyright: "(c)2024-2026 VetCoders",
    license: "BSL 1.1",
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
            "Sprawdzian rzeczywistości. Audyt po implementacji dający brutalny werdykt GO / NO-GO na podstawie bramek jakości.",
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
    wizardLayout: {
      defaultDescription:
        "Prowadzony instalator silnika release'u Vibecrafted.",
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
        terminalBody:
          "Skrypt przygotowuje środowisko, a instalacja jest kontynuowana w przeglądarce.",
        welcomeCta: "Pokaż jak to działa",
        installPasteKicker: "Krok 1 · Skopiuj",
        installPasteHint: "Wklej do terminala (macOS lub Linux)",
        installRunKicker: "Krok 2 · Uruchom",
        installRunHint:
          "Instalator wstaje lokalnie i wraca sterowanie do tej karty — reszta dzieje się tu.",
        installPreviewKicker: "Podgląd",
        installPreviewBody: "Tak wygląda poprawny przebieg instalacji.",
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
            value:
              "Komenda inicjująca przygotowuje środowisko i przekazuje sterowanie do przeglądarki.",
          },
          {
            label: "Jawna zgoda",
            value:
              "Instalator definiuje plan działań i czeka na autoryzację przed modyfikacją systemu.",
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
          "[instalator] Proces będzie kontynuowany w przeglądarce dla lepszej czytelności.",
          "[instalator] Rozpoczynanie instalacji...",
          "[instalator] [etap] Konfiguracja fundamentów",
          "[instalator] [etap] Instalacja Vibecrafted",
          "[instalator] Tutaj będą pojawiać się komunikaty na żywo...",
        ],
        pages: [
          {
            label: "Witaj",
            title: "Widok instalatora",
            body: [
              "Instalacja używa przeglądarki do przejrzystego śledzenia stanu.",
              "Terminal wykonuje logikę bazową, podczas gdy ten widok monitoruje postęp.",
            ],
            hint: "Wizualne śledzenie stanu.",
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
              "Stan systemu jest weryfikowany przed egzekucją.",
              "Dostępne i brakujące zależności są mapowane jawnie.",
            ],
            hint: "Brak modyfikacji w ciemno.",
          },
          {
            label: "Instaluj",
            title: "Egzekucja instalacji",
            body: [
              "Komenda startowa montuje instalator lokalnie.",
              "Proces wymaga ostatecznej autoryzacji przed modyfikacją systemu.",
            ],
            hint: "Terminal inicjuje interfejs.",
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
          title: "Przegląd diagnostyki instalatora",
          leads: [],
          cta: "Zaczynamy",
          componentsFound: "znaleziono",
          componentsTotal: "łącznie",
          missingList: "Brakujące komponenty",
          planPreview: "Co wydarzy się dalej",
          timeEstimate: "≈ 2 minuty na rozgrzanej maszynie",
          sourceDir: "instalator znajduje się w",
          reRun: "Ponów diagnostykę",
        },
        diagnostics: {
          title: "Co znaleziono",
          present: "Obecne",
          missing: "Brakujące",
          empty:
            "Nic jeszcze nie wykryto. Odśwież preflight jeśli to wygląda na błąd.",
        },
        plan: {
          title: "Co się wydarzy",
          empty: "Brak planu. Sprawdź źródła i spróbuj odświeżyć.",
          stepLabel: "Krok",
        },
        consent: {
          title: "Potwierdź instalację",
          body: "Zaakceptuj, by uruchomić instalator. Nic nie wystartuje zanim klikniesz Zainstaluj.",
          accept: "Zapoznałem się z planem i akceptuję",
          withShell: "Zintegruj helpery shella (zalecane)",
          cta: "Zainstaluj teraz",
          again: "Instalacja już zakończona — możesz uruchomić ponownie.",
          running: "Instalacja już trwa. Przejdź do kroku postępu.",
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
          loadingPreflight: "Ładuję preflight…",
          loadFailed: "Preflight się nie powiódł",
          notConnected:
            "Lokalny instalator nieosiągalny. Uruchom komendę curl i zostaw terminal otwarty.",
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
