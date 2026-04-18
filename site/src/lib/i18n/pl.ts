// Kanoniczne źródła publicznego copy są zmapowane w
// docs/content-truth.manifest.json i opisane dla ludzi w
// docs/runtime/CONTENT_TRUTH.md.
export const pl = {
  nav: {
    pipeline: "Pipeline",
    skills: "Skille",
    marbles: "Marbles",
    framework: "Framework",
    quickstart: "Szybki start",
    faq: "FAQ",
    dou: "DoU",
    get: "Pobierz",
    search: "Szukaj dokumentacji",
    searchAll: "Cała powierzchnia",
    searchClose: "Zamknij wyszukiwanie",
    install: "Instaluj",
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
    brand: "VIBECRAFTED",
    tagline:
      "Od repo wygenerowanego przez AI do produktu gotowego do release'u.",
    copyright: "© 2026 VetCoders",
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
        'Silnik <span class="manifesto-title__framework-accent">release</span>&apos;u dla oprogramowania budowanego z AI',
      lead: "Dowieź oprogramowanie budowane z AI bez vibe hangover.",
      quoteHtml:
        "Weź repo, które agenci już wytworzyli, i doprowadź je do stanu, który obca osoba może zainstalować, zaufać mu i użyć.",
      evidence: "Dowody",
      quickstart: "Otwórz szybki start",
      quickstartHref: "/pl/quickstart/",
    },
    pipeline: {
      label: "Metoda",
      title: "Twórz → Konwerguj → Wypuść",
      sub: "Model operacyjny klasy założycielskiej do kształtowania, odszumiania i wreszcie wypuszczania oprogramowania z agentami AI.",
      mermaid: `%% 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. Pipeline v1.3.0
flowchart LR
    subgraph "Twórz"
        scaffold["Scaffold"] --> init["Init"]
        init --> workflow["Workflow"]
        workflow --> followup["Follow-up"]
    end
    followup --> marbles{{"Pętla Marbles"}}
    marbles -->|P0/P1/P2 > 0| marbles
    marbles --> dou["DoU"]
    subgraph "Wypuść"
        dou --> decorate["Decorate"]
        decorate --> hydrate["Hydrate"]
        hydrate --> release(["Release"])
    end`,
      highlighted: `<span class="comment">%% 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. Pipeline v1.3.0</span>
flowchart LR
    subgraph "Twórz"
        scaffold["Scaffold"] --&gt; init["Init"]
        init --&gt; workflow["Workflow"]
        workflow --&gt; followup["Follow-up"]
    end
    followup --&gt; marbles{{"Pętla Marbles"}}
    marbles --&gt;|P0/P1/P2 &gt; 0| marbles
    marbles --&gt; dou["DoU"]
    subgraph "Wypuść"
        dou --&gt; decorate["Decorate"]
        decorate --&gt; hydrate["Hydrate"]
        hydrate --&gt; release(["Release"])
    end`,
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
          body: "Zaudytuj powierzchnię produktu z DoU, wypoleruj z Decorate i zapakuj z Hydrate przed finalnym Release.",
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
          href: "https://github.com/VetCoders/ai-contexters/releases",
          name: "aicx",
          iconClass: "foundation-icon foundation-icon--copper",
          role: "Pamięć",
          body: "Odzyskiwanie decyzji dla warstwy agentowej. CLI `aicx` / serwer `aicx-mcp` indeksują decyzje, intencje i wyniki, żeby sesje mogły odtworzyć co zostało ustalone i dlaczego.",
          linkLabel: "github.com/VetCoders/ai-contexters/releases",
        },
        {
          number: "03",
          href: "https://github.com/VetCoders/prview/releases",
          name: "prview",
          iconClass: "foundation-icon foundation-icon--patina",
          role: "Review",
          body: "Ustrukturyzowane artefakty review. Zamienia zmiany w kodzie w trwałe findingi, które mogą czytać kolejne agenty i ludzie.",
          linkLabel: "github.com/VetCoders/prview/releases",
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
      titleHtml: "To nie magia.<br />To rygorystyczna inżynieria.",
      lead: "Słownictwo jest żywe, bo powstało pod nocną presją. Pod vibem kryje się rygorystyczny model operacyjny dla kontekstu, redukcji wariancji i prawdy o produkcie.",
      revealLabel: "Otwórz notatkę",
      closeLabel: "Zamknij notatkę",
      detailsLabel: "Konsekwencja operacyjna",
      items: [
        {
          number: "01",
          accent: "steel",
          title: "Kontekst wzbogacony AST",
          body: "LLM-y halucynują, gdy kodują na ślepo. Dzięki eksternalizacji pamięci architektonicznej w mapy AST, 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. utrzymuje modele dokładnie zorientowane w Twoim codebase.",
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
          body: "Generowanie kodu jest stochastyczne. Pętla Marbles wykorzystuje priorytetowane pętle odszumiania, aby nieustannie redukować wariancję, wymuszając stan gotowy do wysyłki.",
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
          body: "Ustrukturyzowana Inżynieria Współpracy Człowiek-AI. Opakowujemy deterministyczne checkpointy ludzkie wokół stochastycznej generacji. Rezultat to system, który kontrolujesz, któremu ufasz i który rozumiesz.",
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
    dou: {
      label: "DoU",
      title: "Definicja niezrobionego",
      quote:
        "Agenci AI rozwiązali najtrudniejszą część tworzenia oprogramowania: sprawienie, żeby rzecz działała. Nie rozwiązali jeszcze drugiej najtrudniejszej: sprawienie, żeby była osiągalna.",
      lead: "Problem rzadko dotyczy jakości kodu. To brutalna przestrzeń między działającym systemem a produktem, który obcy mogą odkryć, zainstalować, któremu zaufają i za który zapłacą.",
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
        "Punkty 4–6 to Definicja Niezrobionego. Faza 3 wymusza wejście systemu na rynek.",
      caption: "Trajektoria konwergencji — pętla aż koło się zapełni",
      bars: ["Pętla 1", "Pętla 2", "Pętla 3", "Pętla 4", "Pętla 5"],
      scoreline: "Wynik: 15 → 40 → 65 → 85 → 100",
    },
    get: {
      label: "Pobierz 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍.",
      title: "Zainstaluj silnik release'u. Uruchom pętlę.",
      sub: "Zbootstrapuj control plane przez publiczną ścieżkę instalacji, zweryfikuj lokalną powierzchnię i wejdź w pierwszy workflow prowadzący do realnego shipu.",
      cards: [
        {
          step: "01",
          title: "Zbootstrapuj control plane",
          body: "Zainstaluj framework lokalnie przez publiczną ścieżkę bootstrapu. Jeśli chcesz browser-guided installer, użyj <code>make vibecrafted</code> w repo.",
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
        "Od repo wygenerowanego przez AI do produktu gotowego do release'u.",
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
            "Opcjonalnie, ale bardzo przydatne: loctree, aicx, prview, ScreenScribe",
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
          body: "Użyj publicznej ścieżki bootstrapu. Tworzy kopię w <code>$VIBECRAFTED_ROOT/.vibecrafted/tools</code> i trzyma ten sam install truth co automatyzacja. Jeśli chcesz browser-guided installer, użyj <code>make vibecrafted</code> w repo.",
          command: "curl -fsSL https://vibecrafted.io/install.sh | bash",
          note: "Bezpośredniej ścieżki <code>| bash</code> używaj tylko wtedy, gdy celowo wybierasz compact automation zamiast guided kickoffu.",
        },
        {
          kicker: "Krok 2",
          title: "Sprawdź, czy wszystko jest gotowe",
          body: "Uruchom <code>doctor</code> wcześnie. Szybko pokaże, czy środowisko jest gotowe do pracy i czy czegoś jeszcze nie brakuje.",
          command: "vibecrafted doctor",
          note: "Jeśli coś świeci na żółto, doctor pokaże, czego brakuje, zamiast zostawiać Cię z domysłami.",
        },
        {
          kicker: "Krok 3",
          title: "Wejdź w realne repo",
          body: "Wejdź do repo, które naprawdę ma znaczenie, i pozwól agentowi załadować historię, strukturę i bramki jakości, zanim cokolwiek zmieni.",
          command: "cd $VIBECRAFTED_ROOT/twoj-projekt\nvibecrafted init claude",
          note: "<code>vibecrafted init</code> czyta historię, mapuje strukturę i uruchamia bramki jakości, zanim zacznie się implementacja.",
        },
        {
          kicker: "Krok 4",
          title: "Uruchom pierwsze realne zadanie",
          body: "Gdy kontekst jest już zakotwiczony, możesz uruchomić pełną ścieżkę realizacji albo bardziej kontrolowany workflow, zależnie od tego, ile kontroli chcesz zachować.",
          commands: [
            'vibecrafted justdo codex --prompt "Dodaj uwierzytelnianie użytkowników z JWT"',
            'vibecrafted workflow claude --prompt "Zaplanuj i zaimplementuj moduł auth"',
          ],
          note: "Użyj <code>vibecrafted justdo</code>, gdy chcesz oddać agentowi pełną odpowiedzialność. Użyj <code>vibecrafted workflow</code>, gdy chcesz przejść przez wyraźny układ ERI: Eksploruj &rarr; Research &rarr; Implementuj.",
        },
        {
          kicker: "Krok 5",
          title: "Uruchom flotę, gdy jeden model nie wystarcza",
          body: "Ta ścieżka służy do pracy równoległej i zostawia trwałe artefakty. Chodzi o realne porównanie wyników, nie o pokaz.",
          command:
            "vibecrafted codex implement .vibecrafted/plans/my-plan.md\nvibecrafted claude research .vibecrafted/plans/my-plan.md\nvibecrafted gemini implement .vibecrafted/plans/my-plan.md",
          note: "To są wygodne powierzchnie launchera. Przenośny kontrakt oparty o skrypty spawn jest opisany w kontrakcie runtime.",
        },
        {
          kicker: "Krok 6",
          title: "Domknij pętlę, zanim uznasz pracę za skończoną",
          body: 'W 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. "gotowe" nie oznacza tylko działającego kodu. Oznacza też to, czy ktoś rzeczywiście może z tego skorzystać.',
          command:
            'vibecrafted dou claude --prompt "Audit launch readiness"\nvibecrafted decorate codex --prompt "Polish the release surface"\nvibecrafted hydrate codex --prompt "Package the product"\nvibecrafted release codex --prompt "Prepare release steps"',
          note: "Jeśli nie da się tego znaleźć, zrozumieć i zainstalować, to jeszcze nie jest gotowe. Nawet jeśli testy są zielone.",
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
        label: "Ścieżka nauki",
        lead: "Najpierw ścieżka produktu, dopiero potem źródła.",
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
                "<code>$VIBECRAFTED_ROOT/.vibecrafted/</code> to miejsce, w którym działa cały system. Katalogi agentów tylko odwołują się do tego jednego wspólnego miejsca. To właśnie tam trafiają logika, artefakty i skrypty pomocnicze.",
            },
            {
              questionHtml:
                "Czy mogę zainstalować 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. bez edycji konfiguracji shella?",
              answerHtml:
                "Tak. W trybie interaktywnym możesz zrezygnować z instalacji helperów. Jeśli chcesz mieć je tylko w bieżącej sesji, załaduj ręcznie skrypt pomocniczy <code>${XDG_CONFIG_HOME:-$HOME/.config}/vetcoders/vc-skills.sh</code>.",
            },
            {
              questionHtml:
                "Co dokładnie sprawdza <code>vibecrafted doctor</code>?",
              answerHtml:
                "Polecenie <code>doctor</code> sprawdza centralny magazyn, dostępność helperów, stan odwołań agentów, opcjonalne fundamenty, takie jak loctree, aicx, prview i ScreenScribe, oraz to, czy środowisko nie przeszkadza narzędziom agentowym w stabilnej pracy.",
            },
            {
              questionHtml:
                "Którą ścieżkę instalacji wybrać w CI lub automatyzacji?",
              answerHtml:
                'Użyj <code>make install</code>, jeśli chcesz prostą ścieżkę bez interakcji. Jeśli potrzebujesz pełnej kontroli z poziomu wiersza poleceń, uruchom <code>python3 scripts/vetcoders_install.py install --source "$PWD" --non-interactive</code>.',
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
                "Agent to runtime &mdash; na przykład Codex, Claude albo Gemini. Skill to zestaw instrukcji i zasad pracy, które mówią agentowi, jak ma działać na danym etapie.",
            },
            {
              questionHtml:
                "Dlaczego nie po prostu ChatGPT, Copilot albo jeden wielki prompt?",
              answerHtml:
                "Bo 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. nie służy tylko do rozmowy z modelem. Opiera pracę na strukturze kodu, pamięci decyzji i iteracji. Dzięki temu model widzi repo i realną powierzchnię produktu, zamiast improwizować po omacku.",
            },
            {
              questionHtml:
                "Czy mogę używać 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. bez loctree albo aicx?",
              answerHtml:
                "Technicznie tak, ale tracisz rozumienie struktury i ciągłość między sesjami. Framework dalej działa, tylko agent pracuje na dużo słabszym kontekście.",
            },
            {
              questionHtml:
                "Jak przepchnąć <code>screenscribe review</code> przez wczesną walidację modeli?",
              answerHtml:
                "Potraktuj to jak prawdę runtime, a nie rytuał. CLI musi być widoczny na <code>PATH</code>, <code>~/.config/screenscribe/config.env</code> musi być zgodne z domyślną konfiguracją Libraxis, dla aliasów modeli używaj <code>ai-suggestions</code>, ustaw <code>SCREENSCRIBE_VISION=false</code> jako intencję operatora i pamiętaj, że obecny CLI nadal nadpisuje tę flagę podczas <code>review</code>, więc launcher musi wstrzykiwać <code>--no-vision</code> dla zwykłych uruchomień review na obecnej ścieżce Libraxis. Lokalnym źródłem prawdy w repo jest dokument ScreenScribe Review Gate.",
            },
            {
              questionHtml: "Co to jest pętla Marbles?",
              answerHtml:
                "Marbles to silnik konwergencji. Wynik AI bywa zaszumiony, więc framework zapętla implementację, sprawdzenie, pomiar i poprawki, aż najważniejsze problemy spadną do zera.",
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
                "Użyj <code>vc-justdo</code>, kiedy zadanie jest jasne i chcesz, żeby agent dowiózł je od początku do końca. Ręczne fazy wybierz wtedy, gdy chcesz bliżej pilnować kierunku i decyzji architektonicznych.",
            },
            {
              questionHtml:
                "Co znajduje się w <code>$VIBECRAFTED_ROOT/.vibecrafted/artifacts/</code>?",
              answerHtml:
                "To tutaj trafiają plany, raporty, transkrypty i metadane z większych uruchomień. Powstało po to, żeby praca agentów zostawiała trwały ślad, a nie znikała w historii terminala.",
            },
            {
              questionHtml: "Czym jest Definition of Undone?",
              answerHtml:
                "DoU to audyt, który sprawdza, czy ktoś z zewnątrz może ten projekt znaleźć, zrozumieć, zainstalować i mu zaufać. Mierzy prawdę powierzchni produktu, a nie tylko stan repo.",
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
          note: "Źródło pierwotne dla SHACE, Marbles, Loctree Mapping, PSCD i założycielskiej Definicji Niezrobionego jako oryginalnych konceptów 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍..",
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
        steps: {
          labels: {
            steps: "Kroki",
            required: "wymagane",
            optional: "opcjonalne",
            previous: "Poprzedni krok",
            next: "Następny krok",
            quickStart: "Start",
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
          title: "Vibecrafted. instaluje się na Twojej maszynie",
          leads: [
            "Instalator działa lokalnie. Każdy krok jest jawny — żadnych cichych zmian.",
            "Ta karta przeglądarki to panel sterowania. Terminal to silnik.",
          ],
          cta: "Zaczynamy",
          componentsDetected: "komponenty wykryte",
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
