<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  type Lang = 'en' | 'pl';
  type BoardShape = 'circle' | 'square' | 'hexagon' | 'spiral' | 'waves' | 'grid';
  type PhaseName =
    | 'scaffold'
    | 'init'
    | 'workflow'
    | 'followup'
    | 'marbles'
    | 'dou'
    | 'decorate'
    | 'hydrate'
    | 'release';
  type AccentTone = 'steel' | 'copper' | 'patina' | 'alert';
  type MarblePaletteKey = 'amber' | 'ocean' | 'forest' | 'smoke' | 'rose' | 'violet' | 'honey' | 'teal';

  interface PhaseBlueprint {
    name: PhaseName;
    label: string;
    eyebrow: string;
    title: string;
    description: string;
    detail: string;
    duration: number;
    snapshotRatio: number;
    tone: AccentTone;
  }

  interface PhaseDescriptor extends PhaseBlueprint {}

  interface Slot {
    x: number;
    y: number;
    filled: boolean;
    revealOrder: number;
    visible: boolean;
  }

  interface Marble {
    x: number;
    y: number;
    vx: number;
    vy: number;
    target: Slot | null;
    settled: boolean;
    seed: number;
    palette: MarblePaletteKey;
    alpha: number;
    saturation: number;
    landX?: number;
    landY?: number;
  }

  interface Ping {
    x: number;
    y: number;
    life: number;
    color: string;
  }

  interface FrameworkStrings {
    overlayPhase: string;
    overlayConverge: string;
    overlayMarbles: string;
    showcaseKicker: string;
    showcaseHeading: string;
    showcaseLead: string;
    defaultEyebrow: string;
    defaultPressCopy: string;
    operators: string;
    choosePhase: string;
    alerts: {
      dou: { title: string; detail: string };
      review: { title: string; detail: string };
    };
    hints: Record<PhaseName | 'review' | 'research' | 'agents' | 'prune', string>;
    controls: {
      boardShape: string;
      density: string;
      operators: string;
      precisionFill: string;
      command: string;
      phaseDetail: string;
      actionPanel: string;
      alerts: string;
      metrics: {
        progress: string;
        grooves: string;
        marbles: string;
      };
      buttons: {
        spawnOperators: string;
        runConvergence: string;
        running: string;
        phaseAction: Record<PhaseName, string>;
        nextPhase: string;
        resetLoop: string;
      };
      status: {
        operatorsSpawned: string;
        convergenceStarted: string;
        followupComplete: string;
        blockersSurfaced: string;
        finishApplied: string;
        gapsFilled: string;
        loopReleased: string;
        phaseChanged: string;
      };
      shapes: Record<BoardShape, string>;
    };
    phaseOverrides: Partial<Record<PhaseName, Partial<Omit<PhaseBlueprint, 'name' | 'duration' | 'snapshotRatio' | 'tone'>>>>;
  }

  const SHAPES = ['circle', 'square', 'hexagon', 'spiral', 'waves', 'grid'] as const satisfies readonly BoardShape[];
  const ALERT_RED = '#e05544';
  const PAL = {
    amber: { base: '#d46b3f', light: '#f4c89a' },
    ocean: { base: '#5b87a8', light: '#c2ddf0' },
    forest: { base: '#7d8e57', light: '#bdd4a0' },
    smoke: { base: '#9b9a95', light: '#e8e6dc' },
    rose: { base: '#c46b8a', light: '#f0c4d4' },
    violet: { base: '#8b7ec8', light: '#cdc4ef' },
    honey: { base: '#cc8844', light: '#f0d4a0' },
    teal: { base: '#5ba3a3', light: '#a8dede' }
  } as const satisfies Record<MarblePaletteKey, { base: string; light: string }>;
  const PAL_KEYS = Object.keys(PAL) as MarblePaletteKey[];
  const PHASE_BLUEPRINTS: readonly PhaseBlueprint[] = [
    {
      name: 'scaffold',
      label: 'Scaffold',
      eyebrow: 'Phase 0 · Setup',
      title: 'Trace the outer frame',
      description: 'Set the boundary first. Scaffold is only about the silhouette of the board before we decide how many grooves it can carry.',
      detail: 'Layout shell · geometry lock',
      duration: 1500,
      snapshotRatio: 0.28,
      tone: 'steel'
    },
    {
      name: 'init',
      label: 'Init',
      eyebrow: 'Phase 1 · Craft',
      title: 'Etch the first grooves',
      description: 'Init anchors the board in reality. History and structure start cutting true grooves into the frame so later work has somewhere real to land.',
      detail: 'Context load · first grooves',
      duration: 1600,
      snapshotRatio: 0.48,
      tone: 'steel'
    },
    {
      name: 'workflow',
      label: 'Workflow',
      eyebrow: 'Phase 1 · Craft',
      title: 'Set groove density',
      description: 'Now define capacity. Workflow decides how many grooves the board exposes, so later work lands into a real operating model instead of empty texture.',
      detail: 'Groove count · density tuning',
      duration: 2000,
      snapshotRatio: 0.74,
      tone: 'copper'
    },
    {
      name: 'followup',
      label: 'Follow-up',
      eyebrow: 'Phase 2 · Converge',
      title: 'Shake loose the false positives',
      description: 'Loose marbles start falling away. Followup is where noisy success claims get tested against what actually holds.',
      detail: 'Gravity purge · excess falls off',
      duration: 1500,
      snapshotRatio: 0.68,
      tone: 'steel'
    },
    {
      name: 'marbles',
      label: 'Marbles',
      eyebrow: 'Phase 2 · Converge',
      title: 'Add force, accept variance',
      description: 'More batches arrive and entropy climbs. This is the honest middle: throughput increases, but so does noise.',
      detail: 'Batch throws · growing entropy',
      duration: 3000,
      snapshotRatio: 0.58,
      tone: 'copper'
    },
    {
      name: 'dou',
      label: 'DoU',
      eyebrow: 'Phase 3 · Audit',
      title: 'Definition of Undone',
      description: 'Surface the red truth. Run a systematic gap analysis across the entire product surface to expose what still blocks shipping.',
      detail: 'Plague check · readiness audit',
      duration: 1500,
      snapshotRatio: 0.48,
      tone: 'alert'
    },
    {
      name: 'decorate',
      label: 'Decorate',
      eyebrow: 'Phase 3 · Ship',
      title: 'Turn coherence into finish',
      description: 'The settled marbles saturate and sharpen. Decorate is not random ornament; it is the final coherence pass that makes the system feel intentional.',
      detail: 'Saturation lift · finish pass',
      duration: 2000,
      snapshotRatio: 0.72,
      tone: 'patina'
    },
    {
      name: 'hydrate',
      label: 'Hydrate',
      eyebrow: 'Phase 3 · Ship',
      title: 'Fill the exact missing slots',
      description: 'Now the motion changes tone. The remaining gaps are handled deterministically, one launch-critical hole at a time.',
      detail: 'Precise fill · market-facing completion',
      duration: 2500,
      snapshotRatio: 0.68,
      tone: 'patina'
    },
    {
      name: 'release',
      label: 'Release',
      eyebrow: 'Final Step · Release',
      title: 'Ship code to market',
      description: 'The board glows, holds, and then fades for the next cycle. Shipping is not the absence of motion; it is a completed loop ready to start again.',
      detail: 'Stable board · reset for next cycle',
      duration: 3000,
      snapshotRatio: 0.34,
      tone: 'patina'
    }
  ];
  const FRAMEWORK_I18N: Record<Lang, FrameworkStrings> = {
    en: {
      overlayPhase: 'Phase',
      overlayConverge: 'Converge',
      overlayMarbles: 'Marbles',
      showcaseKicker: 'Framework Playground',
      showcaseHeading: 'Command the convergence board',
      showcaseLead:
        'Board-first teaching surface. Trace the frame, tune the grooves, invite specialists, then let Marbles run the convergence batches.',
      defaultEyebrow: 'Phase 0 · Setup',
      defaultPressCopy: 'Define the board geometry.',
      operators: 'Operators',
      choosePhase: 'Choose Phase',
      alerts: {
        dou: { title: 'DoU', detail: 'Blockers surfaced' },
        review: { title: 'Review', detail: 'Weak fits exposed' }
      },
      hints: {
        scaffold: 'Choose the outer frame first. Capacity comes later, once the board shape is real.',
        init: 'Bootstrap context so the first true grooves are cut from history instead of guessed from nothing.',
        workflow: 'Tune groove density until the board exposes the right amount of working capacity.',
        followup: 'Shake the board and see which claims of progress were never truly anchored.',
        marbles: 'Set the marbles count and force, then let the board run the convergence sequence by itself.',
        dou: 'Flash the undone truth in red and expose what still blocks shipping.',
        decorate: 'Apply final polish pass to saturate colors and sharpen the finish.',
        hydrate: 'Fill the remaining critical gaps with deterministic precision.',
        release: 'Launch the finished surface and release the loop to the market.',
        review: 'Run a stress pass on the first placements before the noisy convergence loops begin.',
        research: 'Probe the lane choices before committing force. Research narrows the search space and marks the promising paths.',
        agents: 'Select specialist count and spawn them into the grooves.',
        prune: 'Remove weak or unnecessary fits so the board can converge around the stronger core.'
      },
      controls: {
        boardShape: 'Board shape',
        density: 'Groove density',
        operators: 'Specialists',
        precisionFill: 'Precision fill',
        command: 'Command surface',
        phaseDetail: 'Phase note',
        actionPanel: 'Board controls',
        alerts: 'Alert indicators',
        metrics: {
          progress: 'Convergence',
          grooves: 'Grooves',
          marbles: 'Marbles'
        },
        buttons: {
          spawnOperators: 'Spawn operators',
          runConvergence: 'Run convergence',
          running: 'Converging...',
          phaseAction: {
            scaffold: 'Accept frame',
            init: 'Bootstrap context',
            workflow: 'Lock grooves',
            followup: 'Run follow-up',
            marbles: 'Stress review',
            dou: 'Surface DoU',
            decorate: 'Apply finish',
            hydrate: 'Fill gaps',
            release: 'Release loop'
          },
          nextPhase: 'Next phase',
          resetLoop: 'Reset loop'
        },
        status: {
          operatorsSpawned: 'Operators dropped into open grooves.',
          convergenceStarted: 'Convergence batches are now running.',
          followupComplete: 'Weak fits were shaken loose.',
          blockersSurfaced: 'Definition of Undone blockers surfaced on the board.',
          finishApplied: 'Decorate pass increased polish and saturation.',
          gapsFilled: 'Hydrate pass filled the next launch-critical gaps.',
          loopReleased: 'Release pulse fired. The board is resetting for a fresh loop.',
          phaseChanged: 'Phase changed.'
        },
        shapes: {
          circle: 'Circle',
          square: 'Square',
          hexagon: 'Hexagon',
          spiral: 'Spiral',
          waves: 'Waves',
          grid: 'Grid'
        }
      },
      phaseOverrides: {}
    },
    pl: {
      overlayPhase: 'Faza',
      overlayConverge: 'Domknięcie',
      overlayMarbles: 'Marbles',
      showcaseKicker: 'Playground frameworku',
      showcaseHeading: 'Steruj planszą konwergencji',
      showcaseLead:
        'Plansza jako powierzchnia nauki. Wyznacz ramę, dostrój rowki, zaproś specjalistów, a potem pozwól Marbles uruchomić batchowe domykanie.',
      defaultEyebrow: 'Faza 0 · Setup',
      defaultPressCopy: 'Zdefiniuj geometrię planszy.',
      operators: 'Operatorzy',
      choosePhase: 'Wybierz fazę',
      alerts: {
        dou: { title: 'DoU', detail: 'Blokery ujawnione' },
        review: { title: 'Review', detail: 'Słabe dopasowania ujawnione' }
      },
      hints: {
        scaffold: 'Najpierw wybierz zewnętrzną ramę. Pojemność przychodzi później, gdy kształt planszy jest już prawdziwy.',
        init: 'Zainicjuj kontekst, żeby pierwsze prawdziwe rowki były wycinane z historii zamiast zgadywane od zera.',
        workflow: 'Dostrój gęstość rowków, aż plansza pokaże właściwą pojemność roboczą.',
        followup: 'Potrząśnij planszą i sprawdź, które deklaracje postępu nigdy nie były naprawdę osadzone.',
        marbles: 'Ustaw liczbę kulek i siłę, a potem pozwól planszy samodzielnie uruchomić sekwencję konwergencji.',
        dou: 'Pokaż na czerwono prawdę o niedomknięciu i ujawnij, co nadal blokuje release.',
        decorate: 'Nałóż końcowy polish pass, żeby nasycić kolory i wyostrzyć finish.',
        hydrate: 'Wypełnij pozostałe krytyczne luki z deterministyczną precyzją.',
        release: 'Wypuść gotową powierzchnię i uwolnij pętlę na rynek.',
        review: 'Uruchom pass stresowy dla pierwszych ułożeń, zanim zaczną się głośniejsze pętle domykania.',
        research: 'Przetestuj możliwe tory, zanim dołożysz siłę. Research zawęża przestrzeń szukania i zaznacza obiecujące ścieżki.',
        agents: 'Wybierz liczbę specjalistów i wpuść ich w rowki.',
        prune: 'Usuń słabe albo zbędne dopasowania, żeby plansza mogła domknąć się wokół mocniejszego rdzenia.'
      },
      controls: {
        boardShape: 'Kształt planszy',
        density: 'Gęstość rowków',
        operators: 'Specjaliści',
        precisionFill: 'Precyzja domknięcia',
        command: 'Powierzchnia komend',
        phaseDetail: 'Notatka fazy',
        actionPanel: 'Sterowanie planszą',
        alerts: 'Wskaźniki alarmowe',
        metrics: {
          progress: 'Domknięcie',
          grooves: 'Rowki',
          marbles: 'Kulki'
        },
        buttons: {
          spawnOperators: 'Wpuść operatorów',
          runConvergence: 'Uruchom konwergencję',
          running: 'Domykanie...',
          phaseAction: {
            scaffold: 'Zatwierdź ramę',
            init: 'Zainicjuj kontekst',
            workflow: 'Zablokuj rowki',
            followup: 'Uruchom follow-up',
            marbles: 'Uruchom review',
            dou: 'Pokaż DoU',
            decorate: 'Nałóż finish',
            hydrate: 'Wypełnij luki',
            release: 'Wypuść pętlę'
          },
          nextPhase: 'Następna faza',
          resetLoop: 'Reset pętli'
        },
        status: {
          operatorsSpawned: 'Operatorzy wpadli do otwartych rowków.',
          convergenceStarted: 'Batchowa konwergencja właśnie ruszyła.',
          followupComplete: 'Słabe dopasowania zostały strząśnięte.',
          blockersSurfaced: 'Blokery Definition of Undone pojawiły się na planszy.',
          finishApplied: 'Pass decorate podbił polish i nasycenie.',
          gapsFilled: 'Hydrate domknął kolejne krytyczne dla launchu luki.',
          loopReleased: 'Impulse release odpalony. Plansza wraca do nowej pętli.',
          phaseChanged: 'Faza została zmieniona.'
        },
        shapes: {
          circle: 'Koło',
          square: 'Kwadrat',
          hexagon: 'Heksagon',
          spiral: 'Spirala',
          waves: 'Fale',
          grid: 'Siatka'
        }
      },
      phaseOverrides: {
        scaffold: {
          eyebrow: 'Faza 0 · Setup',
          title: 'Wyznacz zewnętrzną ramę',
          description: 'Najpierw wyznacz granicę. Scaffold dotyczy tylko sylwetki planszy, zanim zdecydujemy, ile rowków ma unieść.',
          detail: 'Szkielet układu · blokada geometrii'
        },
        init: {
          eyebrow: 'Faza 1 · Twórz',
          title: 'Wytraw pierwsze rowki',
          description: 'Init zakotwicza planszę w rzeczywistości. Historia i struktura zaczynają wycinać prawdziwe rowki, żeby późniejsza praca miała gdzie lądować.',
          detail: 'Ładowanie kontekstu · pierwsze rowki'
        },
        workflow: {
          eyebrow: 'Faza 1 · Twórz',
          title: 'Ustaw gęstość rowków',
          description: 'Tutaj definiujemy pojemność. Workflow decyduje, ile rowków plansza wystawi, żeby dalsza praca wpadała w prawdziwy model operacyjny zamiast pustej tekstury.',
          detail: 'Liczba rowków · strojenie gęstości'
        },
        followup: {
          eyebrow: 'Faza 2 · Domykaj',
          title: 'Strząśnij fałszywe sukcesy',
          description: 'Luźne kulki zaczynają odpadać. Followup to moment, w którym głośne deklaracje sukcesu zderzają się z tym, co naprawdę się trzyma.',
          detail: 'Grawitacyjne czyszczenie · nadmiar odpada'
        },
        marbles: {
          eyebrow: 'Faza 2 · Domykaj',
          title: 'Dodaj siłę i zaakceptuj wariancję',
          description: 'Docierają kolejne batch’e i rośnie entropia. To uczciwy środek: throughput przyspiesza, ale rośnie też szum.',
          detail: 'Rzuty batchowe · rosnąca entropia'
        },
        dou: {
          eyebrow: 'Faza 3 · Audyt',
          title: 'Definition of Undone',
          description: 'Wyciągnij na czerwono prawdę. Uruchom systematyczną analizę luk na całej powierzchni produktu, żeby zobaczyć, co nadal blokuje wysyłkę.',
          detail: 'Plague check · audyt gotowości'
        },
        decorate: {
          eyebrow: 'Faza 3 · Wdrażaj',
          title: 'Zamień spójność w wykończenie',
          description: 'Osadzone kulki zyskują nasycenie i ostrość. Decorate nie jest przypadkową ornamentyką; to końcowy pass spójności, który sprawia, że system czuje się intencjonalny.',
          detail: 'Podbicie nasycenia · pass wykończenia'
        },
        hydrate: {
          eyebrow: 'Faza 3 · Wdrażaj',
          title: 'Wypełnij dokładnie brakujące szczeliny',
          description: 'Tutaj ruch zmienia ton. Pozostałe luki są domykane deterministycznie, po jednym krytycznym dla launchu otworze naraz.',
          detail: 'Precyzyjne wypełnienie · domknięcie pod rynek'
        },
        release: {
          eyebrow: 'Krok końcowy · Release',
          title: 'Wypuść kod na rynek',
          description: 'Plansza rozświetla się, utrzymuje wzór, a potem blednie przed kolejnym cyklem. Shipping nie jest brakiem ruchu; to domknięta pętla gotowa, by zacząć od nowa.',
          detail: 'Stabilna plansza · reset na kolejny cykl'
        }
      }
    }
  };

  let { lang = 'en' } = $props<{ lang?: Lang }>();
  const componentId = `framework-playground-${lang === 'pl' ? 'pl' : 'en'}`;

  let rootEl: HTMLDivElement | undefined;
  let stageEl: HTMLDivElement | undefined;
  let canvasEl: HTMLCanvasElement | undefined;
  let phaseButtons: Array<HTMLButtonElement | null> = [];

  let prefersReducedMotion = $state(false);
  let currentPhaseIndex = $state(0);
  let boardShape = $state<BoardShape>('circle');
  let grooveDensity = $state(1);
  let operatorCount = $state(3);
  let hydrateBatchSize = $state(5);
  let polishIntensity = $state(0.18);
  let polishTarget = $state(0.18);
  let phaseTime = $state(0);
  let grooveRevealProgress = $state(0);
  let boardAlpha = $state(0.88);
  let phasePulse = $state(0);
  let errorFlash = $state(0);
  let shipGlow = $state(0);
  let shakeOffset = $state({ x: 0, y: 0 });
  let convergenceRunning = $state(false);
  let motionActive = $state(false);
  let convergenceWaveCount = $state(0);
  let convergenceCooldown = $state(0);
  let followupShakeMs = $state(0);
  let douPulseMs = $state(0);
  let releasePulseMs = $state(0);
  let slots = $state<Slot[]>([]);
  let marbles = $state<Marble[]>([]);
  let overflowMarbles = $state<Marble[]>([]);
  let pings = $state<Ping[]>([]);
  let liveMessage = $state('');

  let ctx: CanvasRenderingContext2D | null = null;
  let resizeObserver: ResizeObserver | undefined;
  let reducedMotionMedia: MediaQueryList | undefined;
  let resetTimer: ReturnType<typeof setTimeout> | undefined;
  let lastFrameTime = 0;
  let frameWidth = 0;
  let frameHeight = 0;
  let dpr = 1;
  let centerX = 0;
  let centerY = 0;
  let boardRadius = 0;
  let marbleRadius = 0;
  let theme = {
    copper: '#b87333',
    copperBright: '#d4905c',
    patina: '#5a8a7a',
    steel: '#a3b8c7',
    steelDark: '#6b7f8e',
    steelEdge: '#c4d4e0',
    surfaceGlass: 'rgba(14, 14, 17, 0.78)',
    surfaceOverlay: 'rgba(9, 10, 12, 0.88)',
    steelBorder: 'rgba(163, 184, 199, 0.18)'
  };

  let locale = $derived<Lang>(lang === 'pl' ? 'pl' : 'en');
  let text = $derived(FRAMEWORK_I18N[locale]);
  let phases = $derived.by<PhaseDescriptor[]>(() =>
    PHASE_BLUEPRINTS.map((phase) => ({
      ...phase,
      ...(text.phaseOverrides[phase.name] ?? {})
    }))
  );
  let currentPhase = $derived(phases[currentPhaseIndex] ?? phases[0]);
  let visibleSlotCount = $derived.by(() => slots.filter((slot) => slot.visible).length);
  let filledSlotCount = $derived.by(() => slots.filter((slot) => slot.visible && slot.filled).length);
  let settledOverflowCount = $derived.by(() => overflowMarbles.filter((marble) => marble.settled && marble.alpha > 0.06).length);
  let visibleMarbleCount = $derived.by(
    () => marbles.filter((marble) => marble.alpha > 0.06).length + overflowMarbles.filter((marble) => marble.alpha > 0.06).length
  );
  let convergenceProgress = $derived(
    visibleSlotCount > 0 ? Math.round(((filledSlotCount + settledOverflowCount) / visibleSlotCount) * 100) : 0
  );
  let currentHint = $derived(text.hints[currentPhase.name] ?? currentPhase.description);
  let reviewWeakFits = $derived.by(
    () => overflowMarbles.filter((marble) => marble.alpha > 0.18).length + Math.max(0, Math.ceil((visibleSlotCount - filledSlotCount) / 24))
  );
  let douBlockers = $derived.by(() => Math.max(0, Math.ceil((visibleSlotCount - filledSlotCount) / Math.max(1, hydrateBatchSize))));
  let densityPercent = $derived(Math.round(((grooveDensity - 0.5) / 1.5) * 100));
  let operatorPercent = $derived(Math.round(((operatorCount - 1) / 9) * 100));
  let hydratePercent = $derived(Math.round(((hydrateBatchSize - 1) / 9) * 100));
  let boardShapeLabel = $derived(text.controls.shapes[boardShape]);
  let promptCommand = $derived.by(() => currentPhaseCommand(currentPhase));
  let boardAriaLabel = $derived.by(
    () =>
      `${currentPhase.label}. ${currentPhase.title}. ${convergenceProgress}% ${text.controls.metrics.progress.toLowerCase()}. ${filledSlotCount} ${text.controls.metrics.grooves.toLowerCase()} ${locale === 'pl' ? 'wypełnionych' : 'filled'}.`
  );

  function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
  }

  function parseColor(color: string) {
    const value = color.trim();
    if (!value) return null;

    if (value.startsWith('#')) {
      const hex = value.slice(1);
      if (hex.length === 3) {
        const [r, g, b] = hex.split('').map((part) => parseInt(part + part, 16));
        return { r, g, b };
      }
      if (hex.length === 6) {
        return {
          r: parseInt(hex.slice(0, 2), 16),
          g: parseInt(hex.slice(2, 4), 16),
          b: parseInt(hex.slice(4, 6), 16)
        };
      }
    }

    const match = value.match(/rgba?\(([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);
    if (match) {
      return {
        r: Number(match[1]),
        g: Number(match[2]),
        b: Number(match[3])
      };
    }

    return null;
  }

  function withAlpha(color: string, alpha: number) {
    const parsed = parseColor(color);
    if (!parsed) return color;
    return `rgba(${parsed.r}, ${parsed.g}, ${parsed.b}, ${clamp(alpha, 0, 1)})`;
  }

  function toneColor(color: string, delta: number) {
    const parsed = parseColor(color);
    if (!parsed) return color;
    return `rgb(${clamp(parsed.r + delta, 0, 255)}, ${clamp(parsed.g + delta, 0, 255)}, ${clamp(parsed.b + delta, 0, 255)})`;
  }

  function randomPalette(exclude?: MarblePaletteKey) {
    const choices = exclude ? PAL_KEYS.filter((key) => key !== exclude) : PAL_KEYS;
    return choices[Math.floor(Math.random() * choices.length)] ?? 'amber';
  }

  function syncThemeTokens() {
    if (typeof window === 'undefined') return;
    const styles = getComputedStyle(rootEl ?? document.documentElement);
    theme = {
      copper: styles.getPropertyValue('--copper').trim() || theme.copper,
      copperBright: styles.getPropertyValue('--copper-bright').trim() || theme.copperBright,
      patina: styles.getPropertyValue('--patina').trim() || theme.patina,
      steel: styles.getPropertyValue('--steel').trim() || theme.steel,
      steelDark: styles.getPropertyValue('--steel-dark').trim() || theme.steelDark,
      steelEdge: styles.getPropertyValue('--steel-edge').trim() || theme.steelEdge,
      surfaceGlass: styles.getPropertyValue('--surface-glass').trim() || theme.surfaceGlass,
      surfaceOverlay: styles.getPropertyValue('--surface-overlay').trim() || theme.surfaceOverlay,
      steelBorder: styles.getPropertyValue('--steel-border-soft').trim() || theme.steelBorder
    };
  }

  function currentPhaseCommand(phase: PhaseDescriptor) {
    // Keep the playground anchored to public command-deck examples, not demo-only prompts.
    switch (phase.name) {
      case 'scaffold':
        return 'vibecrafted scaffold claude --prompt "Plan the auth architecture"';
      case 'init':
        return 'vibecrafted init claude';
      case 'workflow':
        return 'vibecrafted workflow claude --prompt "Plan and implement auth"';
      case 'followup':
        return 'vibecrafted followup codex --prompt "Audit the auth changes"';
      case 'marbles':
        return 'vibecrafted marbles codex --prompt "Fill the gaps on the auth module" --count 3';
      case 'dou':
        return 'vibecrafted dou claude --prompt "Audit launch readiness"';
      case 'decorate':
        return 'vibecrafted decorate codex --prompt "Polish the release surface"';
      case 'hydrate':
        return 'vibecrafted hydrate codex --prompt "Package the product"';
      case 'release':
        return 'vibecrafted release codex --prompt "Prepare release steps"';
      default:
        return `vibecrafted ${phase.name} codex`;
    }
  }

  function announce(message: string) {
    liveMessage = `${currentPhase.label}. ${message}`;
  }

  function buildSlots() {
    if (!frameWidth || !frameHeight || boardRadius <= 0 || marbleRadius <= 0) return;

    const nextSlots: Slot[] = [];
    const spacing = marbleRadius * (2.2 / grooveDensity);
    const rowHeight = spacing * 0.866;
    let row = 0;

    for (let y = centerY - boardRadius * 1.1; y <= centerY + boardRadius * 1.1; y += rowHeight) {
      const offset = row % 2 ? spacing / 2 : 0;
      for (let x = centerX - boardRadius * 1.1; x <= centerX + boardRadius * 1.1; x += spacing) {
        const px = x + offset;
        const dx = px - centerX;
        const dy = y - centerY;
        let isInside = false;

        if (boardShape === 'circle') {
          isInside = Math.sqrt(dx * dx + dy * dy) + marbleRadius * 0.85 <= boardRadius;
        } else if (boardShape === 'square') {
          isInside = Math.abs(dx) <= boardRadius * 0.85 && Math.abs(dy) <= boardRadius * 0.85;
        } else if (boardShape === 'hexagon') {
          const q = ((2 / 3) * dx) / (boardRadius * 0.8);
          const r = ((-1 / 3) * dx + (Math.sqrt(3) / 3) * dy) / (boardRadius * 0.8);
          const s = -q - r;
          isInside = Math.abs(q) <= 1 && Math.abs(r) <= 1 && Math.abs(s) <= 1;
        } else if (boardShape === 'spiral') {
          const angle = Math.atan2(dy, dx);
          const distance = Math.sqrt(dx * dx + dy * dy);
          const spiralDistance = (angle + Math.PI * 10) * (boardRadius / 20);
          isInside = Math.abs(distance - (spiralDistance % boardRadius)) < spacing * 0.5 && distance < boardRadius;
        } else if (boardShape === 'waves') {
          const wave = Math.sin(px * 0.05) * (boardRadius * 0.2);
          isInside = Math.abs(dy - wave) < spacing * 0.8 && Math.abs(dx) < boardRadius * 0.9;
        } else {
          isInside = Math.abs(dx) < boardRadius && Math.abs(dy) < boardRadius;
        }

        if (isInside) {
          nextSlots.push({
            x: px,
            y,
            filled: false,
            revealOrder: 0,
            visible: false
          });
        }
      }
      row += 1;
    }

    nextSlots.sort((a, b) => {
      const da = Math.hypot(a.x - centerX, a.y - centerY);
      const db = Math.hypot(b.x - centerX, b.y - centerY);
      return da - db;
    });

    nextSlots.forEach((slot, index) => {
      slot.revealOrder = index;
    });

    slots = nextSlots;
    marbles = [];
    overflowMarbles = [];
    pings = [];
  }

  function syncSlotVisibility() {
    const visibleCount = Math.floor(grooveRevealProgress * slots.length);
    const workflowIndex = phases.findIndex((phase) => phase.name === 'workflow');
    slots.forEach((slot) => {
      slot.visible = slot.revealOrder < visibleCount || currentPhaseIndex > workflowIndex;
    });
  }

  function resetBoardState() {
    marbles = [];
    overflowMarbles = [];
    pings = [];
    convergenceRunning = false;
    convergenceWaveCount = 0;
    convergenceCooldown = 0;
    followupShakeMs = 0;
    douPulseMs = 0;
    releasePulseMs = 0;
    phaseTime = 0;
    errorFlash = 0;
    shipGlow = 0;
    shakeOffset = { x: 0, y: 0 };
    slots.forEach((slot) => {
      slot.filled = false;
    });
  }

  function applyPhaseGeometry(index: number) {
    const phase = phases[index];
    currentPhaseIndex = index;
    phaseTime = 0;
    phasePulse = prefersReducedMotion ? 0.18 : 1;
    boardAlpha = phase.name === 'scaffold' ? (prefersReducedMotion ? 0.88 : 0.12) : phase.name === 'init' ? 0.92 : 1;
    shakeOffset = { x: 0, y: 0 };

    if (phase.name === 'scaffold') {
      grooveRevealProgress = 0;
      resetBoardState();
    } else if (phase.name === 'init') {
      grooveRevealProgress = prefersReducedMotion ? 0.18 : 0;
    } else if (phase.name === 'workflow') {
      grooveRevealProgress = prefersReducedMotion ? 1 : 0;
    } else {
      grooveRevealProgress = 1;
    }

    if (phase.name === 'release') {
      shipGlow = Math.max(shipGlow, 0.42);
    }

    syncSlotVisibility();
    motionActive = true;
    announce(text.controls.status.phaseChanged);
    renderBoard();
  }

  function showPhase(index: number) {
    const nextIndex = clamp(index, 0, phases.length - 1);
    applyPhaseGeometry(nextIndex);
  }

  function resizeCanvas() {
    if (!stageEl || !canvasEl) return;
    const rect = stageEl.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    frameWidth = rect.width;
    frameHeight = rect.height;
    dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, prefersReducedMotion ? 1.25 : 2));
    centerX = frameWidth / 2;
    centerY = frameHeight / 2;
    boardRadius = Math.min(frameWidth, frameHeight) * 0.41;
    marbleRadius = Math.max(6, boardRadius * 0.056);
    ctx = canvasEl.getContext('2d');
    if (!ctx) return;
    canvasEl.width = Math.round(frameWidth * dpr);
    canvasEl.height = Math.round(frameHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    buildSlots();
    syncSlotVisibility();
    renderBoard();
  }

  function spawnMarble(target: Slot, chaos: number, palette?: MarblePaletteKey): Marble {
    const angle = Math.random() * Math.PI * 2;
    const distance = boardRadius * (0.6 + chaos * 0.8);
    return {
      x: centerX + Math.cos(angle) * distance,
      y: centerY + Math.sin(angle) * distance - boardRadius * chaos * 0.3,
      vx: (Math.random() - 0.5) * 14 * chaos,
      vy: (Math.random() - 0.5) * 10 * chaos + 3,
      target,
      settled: false,
      seed: Math.floor(Math.random() * 99999),
      palette: palette ?? randomPalette(),
      alpha: 1,
      saturation: 0.62 + polishIntensity * 0.18
    };
  }

  function spawnOverflow(): Marble {
    const angle = Math.random() * Math.PI * 2;
    const distance = boardRadius * 1.15;
    return {
      x: centerX + Math.cos(angle) * distance,
      y: centerY - boardRadius * 0.5 - Math.random() * 100,
      vx: (Math.random() - 0.5) * 18,
      vy: 10 + Math.random() * 14,
      target: null,
      settled: false,
      seed: Math.floor(Math.random() * 99999),
      palette: randomPalette('forest'),
      alpha: 1,
      saturation: 0.54,
      landY: centerY + (Math.random() - 0.5) * boardRadius * 0.8,
      landX: centerX + (Math.random() - 0.5) * boardRadius * 0.8
    };
  }

  function updateMarble(marble: Marble, timeScale: number) {
    if (marble.settled) return;

    const targetX = marble.target ? marble.target.x : marble.landX ?? marble.x;
    const targetY = marble.target ? marble.target.y : marble.landY ?? marble.y;
    const dx = targetX - marble.x;
    const dy = targetY - marble.y;
    const distance = Math.hypot(dx, dy);
    const pull = marble.target ? (distance < 40 ? 0.04 : 0.015) : 0.008;
    const damping = marble.target && distance < 10 ? 0.75 : 0.88;

    marble.vx += dx * pull * timeScale;
    marble.vy += dy * pull * timeScale;
    marble.vx *= damping;
    marble.vy *= damping;
    marble.x += marble.vx * timeScale;
    marble.y += marble.vy * timeScale;

    if (distance < 1.5 && Math.abs(marble.vx) < 0.5 && Math.abs(marble.vy) < 0.5) {
      marble.settled = true;
      marble.x = targetX;
      marble.y = targetY;
      if (marble.target) {
        marble.target.filled = true;
        pings.push({
          x: targetX,
          y: targetY,
          life: 1,
          color: PAL[marble.palette].light
        });
      }
    }
  }

  function spawnOperatorBatch() {
    const openSlots = slots.filter((slot) => slot.visible && !slot.filled);
    if (openSlots.length === 0) {
      showPhase(phases.findIndex((phase) => phase.name === 'workflow'));
      return;
    }
    for (let index = 0; index < Math.min(operatorCount, openSlots.length); index += 1) {
      const pick = Math.floor(Math.random() * openSlots.length);
      const target = openSlots[pick];
      marbles.push(spawnMarble(target, 0.12, 'ocean'));
      openSlots.splice(pick, 1);
    }
    motionActive = true;
    announce(text.controls.status.operatorsSpawned);
  }

  function spawnConvergenceWave() {
    const openSlots = slots.filter((slot) => slot.visible && !slot.filled);
    const filledRatio = visibleSlotCount > 0 ? filledSlotCount / visibleSlotCount : 0;
    const batchSize = Math.max(3, Math.min(10, operatorCount + Math.round(grooveDensity * 2)));

    for (let index = 0; index < batchSize; index += 1) {
      if (openSlots.length > 0) {
        const pick = Math.floor(Math.random() * openSlots.length);
        marbles.push(spawnMarble(openSlots[pick], 0.42 + filledRatio * 0.35));
        openSlots.splice(pick, 1);
      } else {
        overflowMarbles.push(spawnOverflow());
      }
    }

    if (filledRatio > 0.78 || openSlots.length === 0) {
      overflowMarbles.push(spawnOverflow());
    }
  }

  function runConvergence() {
    if (visibleSlotCount === 0) {
      showPhase(phases.findIndex((phase) => phase.name === 'workflow'));
    }
    convergenceWaveCount = Math.max(2, Math.min(8, operatorCount + Math.round(grooveDensity)));
    convergenceCooldown = 0;
    showPhase(phases.findIndex((phase) => phase.name === 'marbles'));
    convergenceRunning = true;
    motionActive = true;
    announce(text.controls.status.convergenceStarted);
  }

  function runFollowupPass() {
    const openSlots = slots.filter((slot) => slot.visible && !slot.filled);
    const settledMarbles = marbles.filter((marble) => marble.target && marble.settled);
    const reviewThrows = Math.min(Math.max(2, operatorCount), openSlots.length);

    for (let index = 0; index < reviewThrows; index += 1) {
      const pick = Math.floor(Math.random() * openSlots.length);
      const target = openSlots[pick];
      marbles.push(spawnMarble(target, 0.3, 'smoke'));
      openSlots.splice(pick, 1);
    }

    for (let index = 0; index < Math.min(2, settledMarbles.length); index += 1) {
      const pick = settledMarbles[Math.floor(Math.random() * settledMarbles.length)];
      if (!pick.target) continue;
      pick.target.filled = false;
      pick.settled = false;
      pick.target = null;
      pick.vx = (Math.random() - 0.5) * 8;
      pick.vy = -4 - Math.random() * 5;
      pick.landX = pick.x + (Math.random() - 0.5) * 24;
      pick.landY = frameHeight + 60;
      pick.alpha = 0.82;
      settledMarbles.splice(settledMarbles.indexOf(pick), 1);
    }

    overflowMarbles.push(spawnOverflow());
    if (Math.random() > 0.45) overflowMarbles.push(spawnOverflow());

    followupShakeMs = prefersReducedMotion ? 140 : 680;
    motionActive = true;
    announce(text.controls.status.followupComplete);
  }

  function runDouAudit() {
    douPulseMs = prefersReducedMotion ? 240 : 1400;
    errorFlash = 0.4;
    motionActive = true;
    announce(text.controls.status.blockersSurfaced);
  }

  function applyFinish() {
    polishTarget = clamp(polishTarget + 0.22, 0.2, 1);
    phasePulse = Math.max(phasePulse, prefersReducedMotion ? 0.2 : 0.85);
    motionActive = true;
    announce(text.controls.status.finishApplied);
  }

  function fillGaps() {
    const gaps = slots.filter((slot) => slot.visible && !slot.filled);
    for (let index = 0; index < Math.min(hydrateBatchSize, gaps.length); index += 1) {
      marbles.push(spawnMarble(gaps[index], 0.05, 'forest'));
    }
    motionActive = true;
    announce(text.controls.status.gapsFilled);
  }

  function restartLoop() {
    if (resetTimer) clearTimeout(resetTimer);
    grooveRevealProgress = 0;
    polishIntensity = 0.18;
    polishTarget = 0.18;
    boardShape = 'circle';
    grooveDensity = 1;
    operatorCount = 3;
    hydrateBatchSize = 5;
    buildSlots();
    resetBoardState();
    applyPhaseGeometry(0);
  }

  function releaseLoop() {
    if (resetTimer) clearTimeout(resetTimer);
    releasePulseMs = prefersReducedMotion ? 500 : 2200;
    shipGlow = 1;
    motionActive = true;
    announce(text.controls.status.loopReleased);
    resetTimer = setTimeout(() => {
      restartLoop();
    }, prefersReducedMotion ? 600 : 2200);
  }

  function runPhaseAction() {
    switch (currentPhase.name) {
      case 'scaffold':
        showPhase(currentPhaseIndex + 1);
        break;
      case 'init':
        showPhase(currentPhaseIndex + 1);
        break;
      case 'workflow':
        grooveRevealProgress = 1;
        syncSlotVisibility();
        phasePulse = Math.max(phasePulse, prefersReducedMotion ? 0.2 : 0.72);
        renderBoard();
        break;
      case 'followup':
        runFollowupPass();
        break;
      case 'marbles':
        runFollowupPass();
        break;
      case 'dou':
        runDouAudit();
        break;
      case 'decorate':
        applyFinish();
        break;
      case 'hydrate':
        fillGaps();
        break;
      case 'release':
        releaseLoop();
        break;
    }
  }

  function handlePhaseKeydown(event: KeyboardEvent, index: number) {
    const lastIndex = phases.length - 1;
    let nextIndex = index;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = index === lastIndex ? 0 : index + 1;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = index === 0 ? lastIndex : index - 1;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = lastIndex;
        break;
      case 'Enter':
      case ' ':
        showPhase(index);
        event.preventDefault();
        return;
      default:
        return;
    }

    event.preventDefault();
    phaseButtons[nextIndex]?.focus();
    showPhase(nextIndex);
  }

  function handleShapeChange(shape: BoardShape) {
    if (boardShape === shape) return;
    boardShape = shape;
    buildSlots();
    syncSlotVisibility();
    renderBoard();
  }

  function shiftBoardShape(delta: number) {
    const nextIndex = (SHAPES.indexOf(boardShape) + delta + SHAPES.length) % SHAPES.length;
    handleShapeChange(SHAPES[nextIndex] ?? 'circle');
  }

  function handleDensityInput(event: Event) {
    grooveDensity = Number((event.currentTarget as HTMLInputElement).value);
    buildSlots();
    syncSlotVisibility();
    renderBoard();
  }

  function handleOperatorInput(event: Event) {
    operatorCount = Number((event.currentTarget as HTMLInputElement).value);
  }

  function handleHydrateInput(event: Event) {
    hydrateBatchSize = Number((event.currentTarget as HTMLInputElement).value);
  }

  function traceBoardShape(context: CanvasRenderingContext2D, radiusScale = 1) {
    const radius = boardRadius * radiusScale;

    if (boardShape === 'circle' || boardShape === 'spiral' || boardShape === 'waves') {
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      return;
    }

    if (boardShape === 'square' || boardShape === 'grid') {
      context.rect(centerX - radius * 0.92, centerY - radius * 0.92, radius * 1.84, radius * 1.84);
      return;
    }

    if (boardShape === 'hexagon') {
      for (let index = 0; index < 6; index += 1) {
        const angle = (index * Math.PI) / 3 - Math.PI / 6;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        if (index === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.closePath();
      return;
    }

    context.arc(centerX, centerY, radius, 0, Math.PI * 2);
  }

  function drawBoardFrame(context: CanvasRenderingContext2D) {
    if (boardAlpha <= 0) return;

    context.save();
    context.beginPath();
    traceBoardShape(context, 1);
    const interior = context.createRadialGradient(centerX, centerY, boardRadius * 0.18, centerX, centerY, boardRadius * 1.02);
    interior.addColorStop(0, withAlpha(theme.surfaceOverlay, 0.54 * boardAlpha));
    interior.addColorStop(1, withAlpha(theme.surfaceGlass, 0.22 * boardAlpha));
    context.fillStyle = interior;
    context.fill();

    context.beginPath();
    traceBoardShape(context, 1);
    context.lineWidth = Math.max(1.5, marbleRadius * 0.12);
    context.strokeStyle = withAlpha(theme.steelEdge, 0.16 * boardAlpha);
    context.stroke();

    if (phasePulse > 0.02) {
      context.beginPath();
      traceBoardShape(context, 1.02);
      context.lineWidth = Math.max(2, marbleRadius * 0.16);
      context.strokeStyle = withAlpha(theme.copperBright, 0.35 * phasePulse);
      context.stroke();
    }

    if (shipGlow > 0.02) {
      context.beginPath();
      traceBoardShape(context, 1.08);
      context.lineWidth = Math.max(3, marbleRadius * 0.24);
      context.strokeStyle = withAlpha(theme.patina, 0.42 * shipGlow);
      context.stroke();
    }
    context.restore();
  }

  function drawGroove(context: CanvasRenderingContext2D, slot: Slot) {
    context.save();
    context.globalAlpha = boardAlpha * 0.84;
    context.beginPath();
    context.arc(slot.x, slot.y, marbleRadius * 0.96, 0, Math.PI * 2);
    const grooveGradient = context.createRadialGradient(
      slot.x - marbleRadius * 0.18,
      slot.y - marbleRadius * 0.18,
      marbleRadius * 0.18,
      slot.x,
      slot.y,
      marbleRadius
    );
    grooveGradient.addColorStop(0, withAlpha(theme.surfaceOverlay, 0.42));
    grooveGradient.addColorStop(0.6, withAlpha(theme.surfaceOverlay, 0.2));
    grooveGradient.addColorStop(1, withAlpha(theme.steel, 0.06));
    context.fillStyle = grooveGradient;
    context.fill();

    context.beginPath();
    context.arc(slot.x, slot.y, marbleRadius * 0.72, 0, Math.PI * 2);
    context.strokeStyle = withAlpha(theme.steelEdge, 0.08);
    context.lineWidth = 0.85;
    context.stroke();
    context.restore();
  }

  function drawPing(context: CanvasRenderingContext2D, ping: Ping) {
    context.save();
    context.globalAlpha = ping.life * 0.6;
    context.beginPath();
    context.arc(ping.x, ping.y, marbleRadius * (1 + (1 - ping.life) * 1.45), 0, Math.PI * 2);
    context.strokeStyle = ping.color;
    context.lineWidth = 2 * ping.life;
    context.stroke();
    context.restore();
  }

  function drawMarble(context: CanvasRenderingContext2D, marble: Marble) {
    if (marble.alpha <= 0.01) return;

    const palette = PAL[marble.palette];
    const speed = Math.hypot(marble.vx, marble.vy);
    const hover = marble.settled ? 0 : Math.min(marbleRadius * 0.8, speed * 1.15);
    const drawY = marble.y - hover;

    context.save();
    context.globalAlpha = marble.alpha;
    context.beginPath();
    context.ellipse(marble.x, marble.y + marbleRadius * 0.6, marbleRadius * 0.6, marbleRadius * 0.24, 0, 0, Math.PI * 2);
    context.fillStyle = 'rgba(0, 0, 0, 0.24)';
    context.fill();

    const gradient = context.createRadialGradient(
      marble.x - marbleRadius * 0.28,
      drawY - marbleRadius * 0.32,
      marbleRadius * 0.14,
      marble.x,
      drawY,
      marbleRadius
    );
    gradient.addColorStop(0, toneColor(palette.light, 22));
    gradient.addColorStop(0.28, palette.light);
    gradient.addColorStop(0.52, palette.base);
    gradient.addColorStop(1, toneColor(palette.base, -42));

    context.beginPath();
    context.arc(marble.x, drawY, marbleRadius, 0, Math.PI * 2);
    context.fillStyle = gradient;
    context.globalAlpha = marble.alpha * marble.saturation;
    context.fill();

    context.beginPath();
    context.arc(marble.x - marbleRadius * 0.28, drawY - marbleRadius * 0.35, marbleRadius * 0.28, 0, Math.PI * 2);
    context.fillStyle = 'rgba(255, 255, 255, 0.42)';
    context.globalAlpha = marble.alpha * 0.72;
    context.fill();
    context.restore();
  }

  function renderBoard() {
    if (!ctx || !canvasEl) return;

    ctx.clearRect(0, 0, frameWidth, frameHeight);
    ctx.save();
    ctx.translate(shakeOffset.x, shakeOffset.y);

    drawBoardFrame(ctx);

    if (convergenceProgress > 92) {
      ctx.save();
      ctx.beginPath();
      traceBoardShape(ctx, 1.05);
      ctx.lineWidth = 3;
      ctx.strokeStyle = withAlpha(theme.copper, ((convergenceProgress - 92) / 8) * 0.28);
      ctx.stroke();
      ctx.restore();
    }

    slots.forEach((slot) => {
      if (slot.visible) {
        drawGroove(ctx, slot);
      }
    });

    pings.forEach((ping) => drawPing(ctx, ping));

    if (errorFlash > 0.04) {
      ctx.save();
      ctx.globalAlpha = errorFlash * 0.15;
      ctx.fillStyle = ALERT_RED;
      ctx.fillRect(0, 0, frameWidth, frameHeight);
      ctx.restore();

      if (errorFlash > 0.22) {
        const alertCopy = currentPhase.name === 'dou' ? text.alerts.dou : text.alerts.review;
        ctx.save();
        ctx.globalAlpha = clamp(errorFlash * 0.9, 0, 1);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `700 ${boardRadius * 0.24}px var(--font-mono), monospace`;
        ctx.fillStyle = ALERT_RED;
        ctx.fillText(alertCopy.title, centerX, centerY - boardRadius * 0.02);
        ctx.font = `600 ${boardRadius * 0.07}px var(--font-head), sans-serif`;
        ctx.fillStyle = 'rgba(255, 214, 208, 0.96)';
        ctx.fillText(alertCopy.detail, centerX, centerY + boardRadius * 0.14);
        ctx.restore();
      }
    }

    const allMarbles = [...marbles, ...overflowMarbles].sort((a, b) => a.y - b.y);
    allMarbles.forEach((marble) => drawMarble(ctx, marble));
    ctx.restore();
  }

  function hasMotion() {
    if (currentPhase.name === 'scaffold' && phaseTime < (prefersReducedMotion ? 24 : 560)) return true;
    if (currentPhase.name === 'init' && grooveRevealProgress < 0.175) return true;
    if (currentPhase.name === 'workflow' && grooveRevealProgress < 0.995) return true;
    if (phasePulse > 0.02 || followupShakeMs > 0 || douPulseMs > 0 || releasePulseMs > 0) return true;
    if (convergenceWaveCount > 0) return true;
    if (pings.length > 0) return true;
    return [...marbles, ...overflowMarbles].some((marble) => !marble.settled && marble.alpha > 0.02);
  }

  function stepSimulation(dt: number) {
    const timeScale = dt / 16;
    phaseTime += dt;
    const phaseDuration = Math.max(1, currentPhase.duration);

    if (currentPhase.name === 'scaffold') {
      boardAlpha = prefersReducedMotion ? 0.88 : Math.min(0.88, Math.max(0.16, phaseTime / 420));
      grooveRevealProgress = 0;
      if (!prefersReducedMotion && phaseTime < 220) {
        const intensity = 1 - phaseTime / 220;
        shakeOffset.x = Math.sin(phaseTime * 0.06) * 2.6 * intensity;
        shakeOffset.y = Math.cos(phaseTime * 0.04) * 1.8 * intensity;
      }
    } else if (currentPhase.name === 'init') {
      boardAlpha = 1;
      grooveRevealProgress = Math.max(grooveRevealProgress, Math.min(0.18, (phaseTime / phaseDuration) * 0.18));
    } else if (currentPhase.name === 'workflow') {
      boardAlpha = 1;
      grooveRevealProgress = Math.max(grooveRevealProgress, Math.min(1, phaseTime / (phaseDuration * 0.65)));
    }

    syncSlotVisibility();

    if (convergenceWaveCount > 0) {
      convergenceCooldown -= dt;
      if (convergenceCooldown <= 0) {
        spawnConvergenceWave();
        convergenceWaveCount -= 1;
        convergenceCooldown = Math.max(220, 720 - operatorCount * 18);
      }
    }

    [...marbles, ...overflowMarbles].forEach((marble) => updateMarble(marble, timeScale));

    for (let index = pings.length - 1; index >= 0; index -= 1) {
      pings[index].life -= dt * 0.002;
      if (pings[index].life <= 0) {
        pings.splice(index, 1);
      }
    }

    if (followupShakeMs > 0) {
      followupShakeMs = Math.max(0, followupShakeMs - dt);
      const intensity = prefersReducedMotion ? 0.6 : followupShakeMs / 680;
      shakeOffset.x = Math.sin(phaseTime * 0.05) * 4 * intensity;
      shakeOffset.y = Math.cos(phaseTime * 0.04) * 3 * intensity;
      overflowMarbles.forEach((marble) => {
        if (marble.settled) {
          marble.vy += 0.3 * timeScale;
          marble.y += marble.vy;
          marble.alpha = Math.max(0, marble.alpha - 0.005 * timeScale);
        }
      });
      overflowMarbles = overflowMarbles.filter((marble) => marble.alpha > 0.02);
    } else {
      shakeOffset.x *= 0.84;
      shakeOffset.y *= 0.84;
    }

    if (douPulseMs > 0) {
      douPulseMs = Math.max(0, douPulseMs - dt);
      errorFlash = 0.22 + (Math.sin(phaseTime * 0.018) * 0.5 + 0.5) * 0.46;
    } else {
      errorFlash *= 0.88;
    }

    if (releasePulseMs > 0) {
      releasePulseMs = Math.max(0, releasePulseMs - dt);
      shipGlow = Math.max(0, shipGlow - dt * 0.0005);
    } else {
      shipGlow *= 0.96;
    }

    phasePulse = Math.max(0, phasePulse - dt * (prefersReducedMotion ? 0.0025 : 0.0018));
    polishIntensity += (polishTarget - polishIntensity) * 0.06 * timeScale;
    marbles.forEach((marble) => {
      if (marble.settled) {
        marble.saturation = Math.min(1, 0.62 + polishIntensity * 0.38);
      }
    });

    renderBoard();
    if (!hasMotion()) {
      convergenceRunning = false;
      motionActive = false;
      lastFrameTime = 0;
    }
  }

  $effect(() => {
    if (!motionActive || typeof window === 'undefined') return;

    let frameId = 0;

    const tick = (timestamp: number) => {
      if (!lastFrameTime) lastFrameTime = timestamp;
      const dt = Math.min(32, timestamp - lastFrameTime);
      lastFrameTime = timestamp;
      if (dt > 0) {
        stepSimulation(dt);
      }
      if (motionActive) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      lastFrameTime = 0;
      window.cancelAnimationFrame(frameId);
    };
  });

  $effect(() => {
    promptCommand;
    currentHint;
    renderBoard();
  });

  onMount(() => {
    reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion = reducedMotionMedia.matches;
    const handleMotionChange = (event: MediaQueryListEvent) => {
      prefersReducedMotion = event.matches;
    };
    reducedMotionMedia.addEventListener('change', handleMotionChange);

    syncThemeTokens();
    resizeCanvas();
    showPhase(0);

    resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    if (stageEl) {
      resizeObserver.observe(stageEl);
    }

    return () => {
      reducedMotionMedia?.removeEventListener('change', handleMotionChange);
      resizeObserver?.disconnect();
    };
  });

  onDestroy(() => {
    if (resetTimer) clearTimeout(resetTimer);
  });
</script>

<div
  bind:this={rootEl}
  class="framework-playground"
  data-phase={currentPhase.name}
>
  <h1 class="framework-playground__sr-heading" id={`${componentId}-heading`}>{text.showcaseHeading}</h1>

  <div class="framework-playground__body">
    <div class="framework-playground__board-column">
      <p class="framework-playground__pressline">
        <span class="framework-playground__press-kicker">{currentPhase.eyebrow}</span>
        <span class="framework-playground__press-copy">{currentPhase.title}.</span>
      </p>

      <div
        bind:this={stageEl}
        class="framework-playground__stage"
        data-board-shape={boardShape}
        id={`${componentId}-panel`}
        role="img"
        aria-label={boardAriaLabel}
        aria-labelledby={`${componentId}-heading`}
      >
        <canvas bind:this={canvasEl} class="framework-playground__canvas" aria-hidden="true"></canvas>
        <div class="framework-playground__overlay" aria-hidden="true">
          <span>{text.overlayPhase} <strong>{currentPhase.label}</strong></span>
          <span>{text.overlayConverge} <strong>{convergenceProgress}%</strong></span>
          <span>{text.overlayMarbles} <strong>{visibleMarbleCount}</strong></span>
        </div>
        <p class="framework-playground__prompt" aria-hidden="true">
          <span class="framework-playground__prompt-mark">$ &gt;</span>
          <span class="framework-playground__prompt-command">{promptCommand}</span>
        </p>
      </div>
    </div>

    <aside class="framework-playground__side-column">
      <p class="framework-playground__side-kicker">{text.operators}</p>
      <p class="framework-playground__side-copy">{currentHint}</p>

      <div class="framework-playground__alert-strip" aria-label={text.controls.alerts}>
        <p class="framework-playground__alert-line" data-alert="dou" data-active={currentPhase.name === 'dou' || douBlockers > 0}>
          <span>{text.alerts.dou.title}</span>
          <strong>{douBlockers}</strong>
        </p>
        <p class="framework-playground__alert-line" data-alert="review" data-active={currentPhase.name === 'followup' || reviewWeakFits > 0}>
          <span>{text.alerts.review.title}</span>
          <strong>{reviewWeakFits}</strong>
        </p>
      </div>

      <section class="framework-playground__controls" aria-label={text.controls.actionPanel}>
        {#if currentPhase.name === 'scaffold'}
          <div class="framework-playground__controls-inner">
            <div class="framework-playground__control-row">
              <span class="framework-playground__control-caption">{text.controls.boardShape}</span>
              <div class="framework-playground__shape-nav">
                <button
                  class="framework-playground__control-btn"
                  type="button"
                  aria-label={locale === 'pl' ? 'Poprzedni kształt planszy' : 'Previous board shape'}
                  onclick={() => shiftBoardShape(-1)}
                >
                  &lt;
                </button>
                <span class="framework-playground__shape-label">{boardShapeLabel}</span>
                <button
                  class="framework-playground__control-btn"
                  type="button"
                  aria-label={locale === 'pl' ? 'Następny kształt planszy' : 'Next board shape'}
                  onclick={() => shiftBoardShape(1)}
                >
                  &gt;
                </button>
              </div>
            </div>
            <div class="framework-playground__control-note">
              {locale === 'pl'
                ? 'Najpierw blokujemy granicę. Gęstość rowków należy do Workflow.'
                : 'Lock the boundary first. Groove density belongs to Workflow.'}
            </div>
            <button class="framework-playground__action-btn" type="button" onclick={runPhaseAction}>
              {text.controls.buttons.phaseAction.scaffold}
            </button>
          </div>
        {:else if currentPhase.name === 'init'}
          <div class="framework-playground__controls-inner">
            <button class="framework-playground__action-btn" type="button" onclick={runPhaseAction}>
              {text.controls.buttons.phaseAction.init}
            </button>
          </div>
        {:else if currentPhase.name === 'workflow'}
          <div class="framework-playground__controls-inner">
            <label class="framework-playground__control">
              <span class="framework-playground__control-caption">
                {text.controls.density}: {grooveDensity.toFixed(1)} · {text.controls.metrics.grooves}: {visibleSlotCount}
              </span>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={grooveDensity}
                aria-label={text.controls.density}
                style={`--range-pct:${densityPercent}%`}
                oninput={handleDensityInput}
              />
            </label>
            <button class="framework-playground__action-btn" type="button" onclick={runPhaseAction}>
              {text.controls.buttons.phaseAction.workflow}
            </button>
          </div>
        {:else if currentPhase.name === 'marbles'}
          <div class="framework-playground__controls-inner">
            <label class="framework-playground__control">
              <span class="framework-playground__control-caption">
                {text.controls.operators}: {operatorCount}
              </span>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={operatorCount}
                aria-label={text.controls.operators}
                style={`--range-pct:${operatorPercent}%`}
                oninput={handleOperatorInput}
              />
            </label>
            <button
              class="framework-playground__action-btn framework-playground__action-btn--muted"
              type="button"
              aria-label={text.controls.buttons.spawnOperators}
              onclick={spawnOperatorBatch}
            >
              {text.controls.buttons.spawnOperators}
            </button>
            <button
              class="framework-playground__action-btn"
              type="button"
              aria-label={text.controls.buttons.runConvergence}
              disabled={convergenceRunning}
              onclick={runConvergence}
            >
              {convergenceRunning ? text.controls.buttons.running : text.controls.buttons.runConvergence}
            </button>
          </div>
        {:else if currentPhase.name === 'followup'}
          <div class="framework-playground__controls-inner">
            <button class="framework-playground__action-btn" type="button" onclick={runPhaseAction}>
              {text.controls.buttons.phaseAction.followup}
            </button>
          </div>
        {:else if currentPhase.name === 'dou'}
          <div class="framework-playground__controls-inner">
            <button class="framework-playground__action-btn" type="button" onclick={runPhaseAction}>
              {text.controls.buttons.phaseAction.dou}
            </button>
          </div>
        {:else if currentPhase.name === 'decorate'}
          <div class="framework-playground__controls-inner">
            <button class="framework-playground__action-btn" type="button" onclick={runPhaseAction}>
              {text.controls.buttons.phaseAction.decorate}
            </button>
          </div>
        {:else if currentPhase.name === 'hydrate'}
          <div class="framework-playground__controls-inner">
            <label class="framework-playground__control">
              <span class="framework-playground__control-caption">
                {text.controls.precisionFill}: {hydrateBatchSize}
              </span>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={hydrateBatchSize}
                aria-label={text.controls.precisionFill}
                style={`--range-pct:${hydratePercent}%`}
                oninput={handleHydrateInput}
              />
            </label>
            <button class="framework-playground__action-btn" type="button" onclick={runPhaseAction}>
              {text.controls.buttons.phaseAction.hydrate}
            </button>
          </div>
        {:else if currentPhase.name === 'release'}
          <div class="framework-playground__controls-inner">
            <button class="framework-playground__action-btn" type="button" onclick={runPhaseAction}>
              {text.controls.buttons.phaseAction.release}
            </button>
          </div>
        {/if}
      </section>

      <p class="framework-playground__side-kicker">{text.choosePhase}</p>
      <div class="framework-playground__rail-shell">
        <div class="framework-playground__rail framework-playground__rail--stack" role="tablist" aria-label={text.choosePhase}>
          {#each phases as phase, index}
            <button
              bind:this={phaseButtons[index]}
              class="framework-playground__chip"
              class:is-active={index === currentPhaseIndex}
              class:is-done={index < currentPhaseIndex}
              data-tone={phase.tone}
              data-tooltip={`${phase.title}. ${phase.description}`}
              type="button"
              role="tab"
              tabindex={index === currentPhaseIndex ? 0 : -1}
              aria-selected={index === currentPhaseIndex}
              aria-controls={`${componentId}-panel`}
              aria-label={`${phase.label}. ${phase.title}. ${phase.description}`}
              onclick={() => showPhase(index)}
              onkeydown={(event) => handlePhaseKeydown(event, index)}
            >
              <span class="framework-playground__chip-label">{phase.label}</span>
            </button>
          {/each}
        </div>
      </div>
    </aside>
  </div>

  <p class="framework-playground__sr-only" aria-live="polite">{liveMessage}</p>
</div>

<style>
  :global(body.framework-page) {
    min-height: 100%;
    background:
      linear-gradient(180deg, rgba(12, 12, 15, 0.94) 0%, rgba(9, 9, 12, 0.98) 100%),
      var(--site-paper-substrate);
    background-attachment: scroll, scroll;
  }

  :global(.framework-page-shell) {
    width: min(1480px, calc(100vw - 0.85rem));
    height: auto;
    min-height: 0;
    margin: 0 auto;
    padding: calc(var(--nav-height) + 0.75rem) 0.4rem 0.7rem;
    display: grid;
    grid-template-rows: min-content;
    gap: 0;
    align-content: start;
  }

  .framework-playground {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    min-height: 0;
    --framework-stage-height: clamp(20.75rem, 48svh, 31.5rem);
    height: auto;
    border: 1px solid var(--card-border);
    border-radius: var(--radius-lg);
    padding: clamp(0.85rem, 1.1vw, 1rem);
    background:
      radial-gradient(circle at 20% 18%, rgba(184, 115, 51, 0.08), transparent 26%),
      radial-gradient(circle at 82% 12%, rgba(163, 184, 199, 0.08), transparent 24%),
      linear-gradient(180deg, rgba(18, 19, 23, 0.94) 0%, rgba(10, 10, 12, 0.96) 100%);
    box-shadow: var(--shadow);
    display: grid;
    gap: clamp(0.8rem, 1vw, 1rem);
  }

  .framework-playground__sr-heading {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .framework-playground__body {
    min-height: 0;
    display: grid;
    grid-template-columns: minmax(0, 1fr) clamp(248px, 20vw, 296px);
    grid-template-rows: auto auto;
    gap: clamp(0.85rem, 1vw, 1.15rem);
    align-items: start;
    align-content: start;
    justify-content: center;
    padding: 0 0.15rem 0 0.4rem;
  }

  .framework-playground__board-column {
    grid-column: 1;
    grid-row: 2;
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
    min-width: 0;
    min-height: 0;
    align-self: start;
  }

  .framework-playground__pressline {
    grid-column: 1 / -1;
    grid-row: 1;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.55rem;
    min-width: 0;
    color: var(--steel-dark);
    font-size: 0.82rem;
    letter-spacing: 0.06em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .framework-playground__press-kicker {
    font-family: var(--font-mono);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-size: 0.74rem;
    color: var(--patina);
  }

  .framework-playground__press-copy {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .framework-playground__stage {
    position: relative;
    width: 100%;
    flex: 0 0 auto;
    height: var(--framework-stage-height);
    min-height: 0;
    border-radius: var(--radius-lg);
    border: 1px solid var(--card-border);
    background-image:
      radial-gradient(circle at 50% 50%, rgba(34, 34, 31, 0.4) 0%, rgba(12, 12, 13, 0.85) 100%),
      url('/presence/background-stone.webp');
    background-size: cover;
    background-position: center;
    background-blend-mode: multiply;
    overflow: hidden;
    box-shadow: inset 0 0 60px rgba(0, 0, 0, 0.5);
  }

  .framework-playground__canvas {
    width: 100%;
    height: 100%;
    display: block;
  }

  .framework-playground__overlay {
    position: absolute;
    top: 1.2rem;
    left: 1.2rem;
    display: grid;
    gap: 0.45rem;
    min-width: 150px;
    padding: 0.85rem 0.95rem;
    border: 1px solid var(--card-border);
    border-radius: var(--radius-md);
    background: rgba(8, 9, 11, 0.82);
    backdrop-filter: var(--blur);
    box-shadow: var(--shadow);
    z-index: 5;
  }

  .framework-playground__overlay span,
  .framework-playground__overlay strong {
    font-family: var(--font-mono);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .framework-playground__overlay span {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    color: var(--steel);
    font-size: 0.7rem;
  }

  .framework-playground__overlay strong {
    color: var(--stone-light);
    font-size: 0.88rem;
  }

  .framework-playground__prompt {
    position: absolute;
    left: 0.9rem;
    right: 0.9rem;
    bottom: 0.9rem;
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    width: fit-content;
    max-width: calc(100% - 1.8rem);
    margin: 0;
    padding: 0.68rem 0.88rem;
    border: 1px solid rgba(163, 184, 199, 0.14);
    border-radius: 999px;
    background: rgba(7, 9, 12, 0.78);
    color: var(--stone-light);
    font-family: var(--font-mono);
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.22);
    z-index: 5;
  }

  .framework-playground__prompt-mark {
    color: var(--steel-dark);
  }

  .framework-playground__prompt-command {
    min-width: 0;
    color: var(--stone-light);
  }

  .framework-playground__side-column {
    grid-column: 2;
    grid-row: 2;
    position: sticky;
    top: calc(var(--nav-height) + 0.8rem);
    width: auto;
    height: auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 0.75rem;
    min-width: 0;
    overflow: visible;
    padding: 0.1rem 0.15rem 0.15rem 0;
  }

  .framework-playground__side-kicker {
    margin: 0;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--steel-dark);
  }

  .framework-playground__side-copy {
    margin: 0;
    color: var(--steel);
    font-size: 0.8rem;
    line-height: 1.4;
    min-height: 2.2rem;
  }

  .framework-playground__alert-strip {
    display: grid;
    gap: 0.22rem;
  }

  .framework-playground__alert-line {
    margin: 0;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding-left: 0.75rem;
    border-left: 1px solid rgba(163, 184, 199, 0.16);
    color: var(--steel-dark);
    font-family: var(--font-mono);
    font-size: 0.69rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .framework-playground__alert-line strong {
    color: var(--stone-light);
    font-size: 0.78rem;
  }

  .framework-playground__alert-line[data-alert="dou"][data-active="true"] {
    border-left-color: rgba(224, 85, 68, 0.78);
    color: #ffb8ae;
  }

  .framework-playground__alert-line[data-alert="review"][data-active="true"] {
    border-left-color: rgba(184, 115, 51, 0.68);
    color: var(--copper-bright);
  }

  .framework-playground__controls {
    margin-top: 0;
    min-width: 0;
  }

  .framework-playground__controls-inner {
    display: grid;
    gap: 0.72rem;
    padding: 0.25rem 0 0.1rem;
  }

  .framework-playground__control {
    display: grid;
    gap: 0.35rem;
  }

  .framework-playground__control-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .framework-playground__control-caption {
    color: var(--steel-edge);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .framework-playground__control-note {
    color: var(--steel-dark);
    font-size: 0.8rem;
    line-height: 1.4;
  }

  .framework-playground__shape-nav {
    display: flex;
    gap: 0.35rem;
    align-items: center;
  }

  .framework-playground__shape-label {
    min-width: 5rem;
    color: var(--stone-light);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-align: center;
    text-transform: uppercase;
  }

  .framework-playground__control-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    padding: 0;
    border: 1px solid var(--card-border);
    border-radius: 8px;
    background: rgba(163, 184, 199, 0.05);
    color: var(--stone-light);
    font-family: var(--font-mono);
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .framework-playground__control-btn:hover,
  .framework-playground__control-btn:focus-visible {
    border-color: var(--copper-bright);
    background: rgba(184, 115, 51, 0.15);
    color: var(--copper-bright);
    box-shadow: 0 0 15px rgba(184, 115, 51, 0.2);
    outline: none;
  }

  .framework-playground__controls-inner input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    height: 4px;
    background: linear-gradient(
      to right,
      var(--copper-bright) 0%,
      var(--copper-bright) var(--range-pct, 0%),
      rgba(163, 184, 199, 0.14) var(--range-pct, 0%),
      rgba(163, 184, 199, 0.14) 100%
    );
    border-radius: 999px;
    outline: none;
    margin: 0.6rem 0;
    cursor: pointer;
  }

  .framework-playground__controls-inner input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background: var(--stone-light);
    border: 3px solid var(--copper-bright);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 15px rgba(184, 115, 51, 0.6);
    transition: transform 0.1s ease;
  }

  .framework-playground__controls-inner input[type="range"]:active::-webkit-slider-thumb {
    transform: scale(1.2);
  }

  .framework-playground__controls-inner input[type="range"]::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background: var(--copper-bright);
    border-radius: 50%;
    cursor: pointer;
    border: none;
    box-shadow: 0 0 10px rgba(184, 115, 51, 0.4);
  }

  .framework-playground__action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0.72rem 0.95rem;
    border: 1px solid rgba(184, 115, 51, 0.4);
    border-radius: var(--radius-md);
    background: rgba(184, 115, 51, 0.1);
    color: var(--copper-bright);
    font-family: var(--font-mono);
    font-size: 0.74rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 0.5rem;
  }

  .framework-playground__action-btn:disabled {
    opacity: 0.56;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  .framework-playground__action-btn--muted {
    border-color: rgba(163, 184, 199, 0.18);
    background: rgba(163, 184, 199, 0.08);
    color: var(--steel-edge);
  }

  .framework-playground__action-btn--muted:hover,
  .framework-playground__action-btn--muted:focus-visible {
    border-color: rgba(163, 184, 199, 0.3);
    background: rgba(163, 184, 199, 0.12);
    box-shadow: 0 4px 20px rgba(163, 184, 199, 0.12);
    outline: none;
  }

  .framework-playground__action-btn:hover,
  .framework-playground__action-btn:focus-visible {
    border-color: var(--copper-bright);
    background: rgba(184, 115, 51, 0.2);
    transform: translateY(-1px);
    box-shadow: 0 4px 20px rgba(184, 115, 51, 0.2);
    outline: none;
  }

  .framework-playground__rail-shell {
    position: relative;
    width: 100%;
    min-width: 0;
  }

  .framework-playground__rail {
    width: 100%;
    min-width: 0;
    overflow: visible;
    padding: 0.15rem 0 0.35rem;
  }

  .framework-playground__rail--stack {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.08rem;
  }

  .framework-playground__chip {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    min-width: 0;
    padding: 0.34rem 0 0.34rem 0.75rem;
    border: 0;
    border-left: 1px solid rgba(163, 184, 199, 0.16);
    border-radius: 0;
    background: transparent;
    box-shadow: none;
    color: var(--stone-light);
    cursor: pointer;
    transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
  }

  .framework-playground__chip:hover,
  .framework-playground__chip:focus-visible {
    border-left-color: rgba(184, 115, 51, 0.36);
    background: transparent;
    outline: none;
  }

  .framework-playground__chip.is-active {
    border-left-color: rgba(184, 115, 51, 0.78);
    background: transparent;
    color: var(--copper-bright);
  }

  .framework-playground__chip.is-done {
    border-left-color: rgba(90, 138, 122, 0.3);
  }

  .framework-playground__chip[data-tone="patina"].is-active {
    border-left-color: rgba(90, 138, 122, 0.72);
    color: var(--patina);
  }

  .framework-playground__chip[data-tone="alert"].is-active {
    border-left-color: rgba(224, 85, 68, 0.78);
    color: #ffb8ae;
  }

  .framework-playground__chip-label {
    font-family: 'IBM Plex Mono', 'JetBrains Mono', 'SF Mono', monospace;
    font-size: 0.71rem;
    letter-spacing: 0.07em;
    line-height: 1;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .framework-playground__chip::after {
    content: attr(data-tooltip);
    position: absolute;
    right: calc(100% + 0.8rem);
    top: 50%;
    transform: translate(0.35rem, -50%);
    width: 240px;
    padding: 0.72rem 0.82rem;
    border: 1px solid rgba(163, 184, 199, 0.16);
    border-radius: 14px;
    background: rgba(9, 10, 13, 0.88);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    color: var(--stone-light);
    font-family: var(--font-head);
    font-size: 0.82rem;
    font-weight: 500;
    line-height: 1.35;
    text-transform: none;
    letter-spacing: normal;
    text-align: left;
    opacity: 0;
    pointer-events: none;
    z-index: 10;
    transition: opacity 0.18s ease, transform 0.18s ease;
  }

  .framework-playground__sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .framework-playground__chip:hover::after,
  .framework-playground__chip:focus-visible::after {
    opacity: 1;
    transform: translate(0, -50%);
  }

  @media (max-width: 960px) {
    :global(.framework-page-shell) {
      width: min(100vw - 0.45rem, 1480px);
      height: auto;
      min-height: 0;
      padding: calc(var(--nav-height) + 0.55rem) 0.25rem 0.6rem;
    }

    .framework-playground {
      --framework-stage-height: clamp(21rem, 56svh, 34rem);
    }

    .framework-playground__body {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto auto;
      gap: 0.95rem;
      padding: 0;
    }

    .framework-playground__pressline,
    .framework-playground__board-column,
    .framework-playground__side-column {
      grid-column: 1;
    }

    .framework-playground__pressline {
      grid-row: 1;
    }

    .framework-playground__board-column {
      grid-row: 2;
    }

    .framework-playground__stage {
      height: var(--framework-stage-height);
    }

    .framework-playground__side-column {
      grid-row: 3;
      position: static;
      padding: 0;
    }

    .framework-playground__rail--stack {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.55rem;
    }

    .framework-playground__chip {
      min-height: 2.65rem;
      padding: 0.65rem 0.75rem;
      justify-content: center;
      border: 1px solid rgba(163, 184, 199, 0.12);
      border-radius: var(--radius-md);
      background: rgba(17, 18, 22, 0.82);
    }

    .framework-playground__chip:hover {
      border-color: rgba(184, 115, 51, 0.28);
    }

    .framework-playground__chip.is-active {
      background: rgba(27, 20, 15, 0.92);
      box-shadow: 0 0 0 1px rgba(184, 115, 51, 0.18);
    }

    .framework-playground__chip::after {
      left: 50%;
      right: auto;
      width: max-content;
      max-width: min(26rem, 44vw);
      transform: translate(-50%, 0.35rem);
    }

    .framework-playground__chip:hover::after,
    .framework-playground__chip:focus-visible::after {
      transform: translate(-50%, 0);
    }
  }

  @media (max-width: 640px) {
    :global(.framework-page-shell) {
      width: min(100vw - 0.35rem, 1480px);
      padding: calc(var(--nav-height) + 0.45rem) 0.15rem 0.35rem;
    }

    .framework-playground {
      --framework-stage-height: clamp(18.75rem, 52svh, 28.5rem);
      padding: 0.75rem;
      gap: 0.75rem;
    }

    .framework-playground__overlay {
      left: auto;
      right: 0.75rem;
      min-width: 132px;
    }

    .framework-playground__prompt {
      left: 0.75rem;
      right: 0.75rem;
      width: auto;
    }

    .framework-playground__rail {
      gap: 0.38rem;
    }

    .framework-playground__rail--stack {
      grid-template-columns: 1fr;
    }

    .framework-playground__chip {
      min-height: 2.4rem;
      padding: 0.42rem 0.5rem;
    }

    .framework-playground__chip-label {
      font-size: 0.72rem;
      letter-spacing: 0.04em;
    }

    .framework-playground__chip::after {
      left: 0;
      right: 0;
      bottom: calc(100% + 0.55rem);
      transform: translate(0, 0.35rem);
      width: auto;
      max-width: none;
    }

    .framework-playground__chip:hover::after,
    .framework-playground__chip:focus-visible::after {
      transform: translate(0, 0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .framework-playground *,
    .framework-playground *::before,
    .framework-playground *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
</style>
