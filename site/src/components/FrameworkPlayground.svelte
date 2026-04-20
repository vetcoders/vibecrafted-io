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
  type PhaseGroup = 'PREP' | 'CRAFT' | 'CONVERGE' | 'SHIP';
  type StepState = 'done' | 'active' | 'todo';
  type OperatorId = 'loctree' | 'aicx' | 'prview' | 'screenscribe';
  type LabelKey = 'agents' | 'pipeline' | 'verify' | 'artifacts';

  interface PhaseStep {
    txt: string;
    state: StepState;
  }

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
    group: PhaseGroup;
    hint: string;
    state: string;
    readoutLoop: string;
    readoutP: string;
    activeOps: OperatorId[];
    showLabels: LabelKey[];
    steps?: PhaseStep[];
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
    boardIdleHint: string;
    boardPhaseBadge: string;
    crumb: { root: string; leaf: string };
    instructor: {
      label: string;
      hintLede: string;
      prev: string;
      next: string;
      shipped: string;
    };
    readout: {
      state: string;
      loop: string;
      p: string;
    };
    boardHead: {
      phase: string;
      marbles: string;
      converge: string;
      issues: string;
    };
    cmdDeck: {
      prompt: string;
      main: string;
    };
    labels: Record<LabelKey, string>;
    operatorRows: Record<OperatorId | 'dou' | 'review', { name: string; sub?: string }>;
    phaseGroups: Record<PhaseGroup, string>;
    phaseState: Record<string, string>;
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
    phaseOverrides: Partial<
      Record<
        PhaseName,
        Partial<Omit<PhaseBlueprint, 'name' | 'duration' | 'snapshotRatio' | 'tone' | 'group'>> & {
          steps?: PhaseStep[];
        }
      >
    >;
  }

  const SHAPES = ['circle', 'square', 'hexagon', 'spiral', 'waves', 'grid'] as const satisfies readonly BoardShape[];
  const OPERATORS: OperatorId[] = ['loctree', 'aicx', 'prview', 'screenscribe'];
  const FRAME_LABELS: LabelKey[] = ['agents', 'pipeline', 'verify', 'artifacts'];
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
      eyebrow: 'Phase 0 · Prep',
      title: 'Define the system you are about to build',
      description:
        'Scope first. Pick the board shape that matches your system topology, then set capacity. The outer frame is your contract with the future: what you will build — and, just as important, what you will not.',
      detail: 'Shape · capacity · constraints',
      hint: 'Scaffold is a thinking step, not a coding step. Set shape and sliders on the left, then spawn or click the board.',
      state: 'awaiting',
      readoutLoop: '—',
      readoutP: '0·0·0',
      activeOps: [],
      showLabels: [],
      group: 'PREP',
      duration: 1500,
      snapshotRatio: 0.28,
      tone: 'steel',
      steps: [
        { txt: 'Pick board shape (topology)', state: 'active' },
        { txt: 'Set density, specialists, precision', state: 'todo' },
        { txt: 'Spawn or click to enter Init', state: 'todo' }
      ]
    },
    {
      name: 'init',
      label: 'Init',
      eyebrow: 'Phase 1 · Craft',
      title: 'Load perception, intentions, ground truth',
      description:
        'Before touching code: loctree maps the living structure, aicx retrieves prior intentions from agent sessions, git history grounds you in runtime truth. Skip this and the next agent writes blind.',
      detail: 'loctree · aicx · git',
      hint: 'vc-init runs three senses in parallel. Perception beats memory, intentions beat RAG, ground truth beats intuition.',
      state: 'indexing',
      readoutLoop: '0',
      readoutP: '0·0·0',
      activeOps: ['loctree', 'aicx'],
      showLabels: ['agents'],
      group: 'CRAFT',
      duration: 1600,
      snapshotRatio: 0.48,
      tone: 'steel',
      steps: [
        { txt: 'loctree repo-view (structure)', state: 'done' },
        { txt: 'aicx intents retrieval', state: 'done' },
        { txt: 'git ground truth', state: 'active' },
        { txt: 'Enter Workflow', state: 'todo' }
      ]
    },
    {
      name: 'workflow',
      label: 'Workflow',
      eyebrow: 'Phase 1 · Craft',
      title: 'Dispatch specialists into real slots',
      description:
        'Agents spawn and take position. Each specialist fills a specific groove — loctree for structure, aicx for memory, prview for review, ScreenScribe for runtime capture. Real work lands on the board here.',
      detail: 'Agent dispatch · parallel fieldwork',
      hint: 'Examine → Research → Implement. Spawn from the panel — or click anywhere on the board to throw a targeted marble.',
      state: 'implementing',
      readoutLoop: '1',
      readoutP: '0·0·2',
      activeOps: ['loctree', 'aicx', 'prview', 'screenscribe'],
      showLabels: ['agents', 'pipeline', 'verify'],
      group: 'CRAFT',
      duration: 2000,
      snapshotRatio: 0.74,
      tone: 'copper',
      steps: [
        { txt: 'Examine what actually runs', state: 'done' },
        { txt: 'Research ground truth', state: 'done' },
        { txt: 'Dispatch specialists', state: 'active' },
        { txt: 'Harvest for follow-up', state: 'todo' }
      ]
    },
    {
      name: 'followup',
      label: 'Follow-up',
      eyebrow: 'Phase 2 · Converge',
      title: 'Shake out the false positives',
      description:
        'Loose claims fall away. Any specialist output that was never truly anchored gets exposed — a GO / NO-GO verdict emerges for each landed marble before the real convergence loops begin.',
      detail: 'Verdict pass · noise purge',
      hint: 'Scar tissue is normal. Weak fits surface here so Marbles does not waste cycles on them.',
      state: 'auditing',
      readoutLoop: '2',
      readoutP: '1·3·2',
      activeOps: ['loctree', 'aicx', 'prview', 'screenscribe'],
      showLabels: ['agents', 'pipeline', 'verify', 'artifacts'],
      group: 'CONVERGE',
      duration: 1500,
      snapshotRatio: 0.68,
      tone: 'steel',
      steps: [
        { txt: 'Workflow landed', state: 'done' },
        { txt: 'Collect severity findings', state: 'done' },
        { txt: 'Issue GO / NO-GO verdict', state: 'active' },
        { txt: 'Enter Marbles loop', state: 'todo' }
      ]
    },
    {
      name: 'marbles',
      label: 'Marbles',
      eyebrow: 'Phase 2 · Converge',
      title: 'Loop until P0 = P1 = P2 = 0',
      description:
        'Iterative convergence. Each loop shrinks variance. No fixed count — you stop when the circle is full and every priority counter is zero. Batches run on their own; you can still click the board to throw a targeted marble at a specific gap.',
      detail: 'Autonomous loop · decreasing entropy',
      hint: 'Late loops compress, not correct. If you are still correcting, you are still in Follow-up.',
      state: 'converging',
      readoutLoop: '4',
      readoutP: '0·1·1',
      activeOps: ['loctree', 'aicx', 'prview', 'screenscribe'],
      showLabels: ['agents', 'pipeline', 'verify', 'artifacts'],
      group: 'CONVERGE',
      duration: 3000,
      snapshotRatio: 0.58,
      tone: 'copper',
      steps: [
        { txt: 'Loop 1 · structural fix', state: 'done' },
        { txt: 'Loop 2 · runtime alignment', state: 'done' },
        { txt: 'Loop 3 · compressing roughness', state: 'done' },
        { txt: 'Loop 4 · final smoothing', state: 'active' }
      ]
    },
    {
      name: 'dou',
      label: 'DoU',
      eyebrow: 'Phase 3 · Ship',
      title: 'Definition of Undone — the red truth',
      description:
        'Tests pass ≠ product works. Systematic gap analysis across the full product surface: install path, runtime behavior, docs, onboarding, funnel, support. Whatever still blocks shipping shows up red.',
      detail: 'Full-surface audit · ship blockers',
      hint: 'The gap is the funnel. Find it and close it before Decorate.',
      state: 'auditing',
      readoutLoop: 'done',
      readoutP: '0·0·3',
      activeOps: ['prview', 'screenscribe'],
      showLabels: ['pipeline', 'verify', 'artifacts'],
      group: 'SHIP',
      duration: 1500,
      snapshotRatio: 0.48,
      tone: 'alert',
      steps: [
        { txt: 'Marbles converged', state: 'done' },
        { txt: 'Check install path', state: 'done' },
        { txt: 'Audit SEO funnel', state: 'active' },
        { txt: 'Audit payment path', state: 'todo' }
      ]
    },
    {
      name: 'decorate',
      label: 'Decorate',
      eyebrow: 'Phase 3 · Ship',
      title: 'Coherence first. Premium second.',
      description:
        'Not ornament — the final coherence pass. Identity vs drift: keep what is distinctive, reduce what merely accumulated. Every hover, spacing rule, and interaction rhythm gets deliberate.',
      detail: 'Coherence pass · intentional finish',
      hint: 'Premium is coherence. Smaczki, not decorations.',
      state: 'polishing',
      readoutLoop: 'done',
      readoutP: '0·0·0',
      activeOps: ['prview'],
      showLabels: ['verify', 'artifacts'],
      group: 'SHIP',
      duration: 2000,
      snapshotRatio: 0.72,
      tone: 'patina',
      steps: [
        { txt: 'DoU audit complete', state: 'done' },
        { txt: 'Detect identity tokens', state: 'done' },
        { txt: 'Polish interaction language', state: 'active' }
      ]
    },
    {
      name: 'hydrate',
      label: 'Hydrate',
      eyebrow: 'Phase 3 · Ship',
      title: 'Fill the market-facing gaps',
      description:
        'Installer, onboarding, docs landing, pricing surface, first-run experience. Deterministic precision on the slots that decide whether a visitor becomes a customer.',
      detail: 'Distribution · first-run · conversion',
      hint: 'Code without distribution is a zine. Hydrate turns it into a product.',
      state: 'packaging',
      readoutLoop: 'done',
      readoutP: '0·0·0',
      activeOps: ['prview'],
      showLabels: ['artifacts'],
      group: 'SHIP',
      duration: 2500,
      snapshotRatio: 0.68,
      tone: 'patina',
      steps: [
        { txt: 'Decoration complete', state: 'done' },
        { txt: 'Write market copy', state: 'done' },
        { txt: 'Publish onboarding flow', state: 'active' }
      ]
    },
    {
      name: 'release',
      label: 'Release',
      eyebrow: 'Final · Ship',
      title: 'Tag · sign · publish · announce',
      description:
        'Build and sign the artifact, push the tag, rebuild the public surface, announce the cycle. The loop closes here — and reopens for the next scope.',
      detail: 'Tag · sign · publish · announce',
      hint: 'What ships is not "working code" — it is a reachable, signed, verifiable product.',
      state: 'released',
      readoutLoop: 'done',
      readoutP: '0·0·0',
      activeOps: [],
      showLabels: [],
      group: 'SHIP',
      duration: 3000,
      snapshotRatio: 0.34,
      tone: 'patina',
      steps: [
        { txt: 'Hydrate complete', state: 'done' },
        { txt: 'Publish to registries', state: 'done' },
        { txt: 'Announce release', state: 'done' },
        { txt: 'Circle is full · shipped', state: 'done' }
      ]
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
      boardIdleHint: '↖ Pick shape · set capacity · or click board to throw',
      boardPhaseBadge: 'Phase',
      crumb: { root: 'Framework', leaf: 'Playground' },
      instructor: {
        label: 'Instructor',
        hintLede: 'n.b.',
        prev: '← prev',
        next: 'next →',
        shipped: 'shipped ✓'
      },
      readout: { state: 'state', loop: 'loop', p: 'p0·p1·p2' },
      boardHead: { phase: 'Phase', marbles: 'Marbles', converge: 'Converge', issues: 'Issues' },
      cmdDeck: { prompt: '$', main: 'vibecrafted' },
      labels: {
        agents: '→ agents',
        pipeline: 'pipeline',
        verify: 'verify ←',
        artifacts: 'artifacts'
      },
      operatorRows: {
        loctree: { name: 'loctree', sub: 'structure' },
        aicx: { name: 'aicx', sub: 'memory' },
        prview: { name: 'prview', sub: 'review' },
        screenscribe: { name: 'ScreenScribe', sub: 'runtime' },
        dou: { name: 'DoU' },
        review: { name: 'Review' }
      },
      phaseGroups: { PREP: 'PREP', CRAFT: 'CRAFT', CONVERGE: 'CONVERGE', SHIP: 'SHIP' },
      phaseState: {
        awaiting: 'awaiting',
        indexing: 'indexing',
        implementing: 'implementing',
        auditing: 'auditing',
        converging: 'converging',
        polishing: 'polishing',
        packaging: 'packaging',
        released: 'released'
      },
      alerts: {
        dou: { title: 'DoU', detail: 'Blockers surfaced' },
        review: { title: 'Review', detail: 'Weak fits exposed' }
      },
      hints: {
        scaffold:
          'Scaffold is scope, not code. Shape + sliders on the left decide what the whole session is about.',
        init:
          'vc-init loads three senses before any edit: loctree structure, aicx intentions, git ground truth.',
        workflow:
          'Specialists take positions. Click the board to throw a targeted marble at the groove you care about.',
        followup:
          'Every claim of progress gets tested. Weak fits surface so Marbles has a clean convergence target.',
        marbles:
          'Loop until P0=P1=P2=0. You can still click to throw a targeted marble — the loop just keeps running.',
        dou:
          'Tests pass ≠ product works. The red slots are real ship blockers: install, funnel, docs, support.',
        decorate:
          'Coherence pass. Identity stays, drift goes. Every hover and rhythm becomes intentional.',
        hydrate:
          'Installer, onboarding, first-run. Code without distribution is a zine — Hydrate turns it into a product.',
        release:
          'Tag. Sign. Publish. Announce. The loop closes and reopens on a new scope.',
        review:
          'Stress-test the first placements before the noisy convergence loops begin.',
        research:
          'Probe the lane choices before committing force. Research narrows the search space.',
        agents:
          'Pick specialist count and send them in. Every agent fills a specific kind of groove.',
        prune:
          'Remove weak fits so the board converges around the stronger core.'
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
      overlayMarbles: 'Kulki',
      showcaseKicker: 'Playground frameworku',
      showcaseHeading: 'Steruj planszą konwergencji',
      showcaseLead:
        'Plansza jako powierzchnia nauki. Wyznacz ramę, dostrój rowki, zaproś specjalistów, a potem pozwól Marbles uruchomić batchowe domykanie.',
      defaultEyebrow: 'Faza 0 · Setup',
      defaultPressCopy: 'Zdefiniuj geometrię planszy.',
      operators: 'Operatorzy',
      choosePhase: 'Wybierz fazę',
      boardIdleHint: '↖ Wybierz kształt · ustaw pojemność · albo kliknij planszę',
      boardPhaseBadge: 'Faza',
      crumb: { root: 'Framework', leaf: 'Playground' },
      instructor: {
        label: 'Instruktor',
        hintLede: 'n.b.',
        prev: '← poprzednia',
        next: 'następna →',
        shipped: 'wydane ✓'
      },
      readout: { state: 'stan', loop: 'pętla', p: 'p0·p1·p2' },
      boardHead: { phase: 'Faza', marbles: 'Kulki', converge: 'Domknięcie', issues: 'Problemy' },
      cmdDeck: { prompt: '$', main: 'vibecrafted' },
      labels: {
        agents: '→ agenty',
        pipeline: 'pipeline',
        verify: 'weryfikacja ←',
        artifacts: 'artefakty'
      },
      operatorRows: {
        loctree: { name: 'loctree', sub: 'struktura' },
        aicx: { name: 'aicx', sub: 'pamięć' },
        prview: { name: 'prview', sub: 'review' },
        screenscribe: { name: 'ScreenScribe', sub: 'runtime' },
        dou: { name: 'DoU' },
        review: { name: 'Review' }
      },
      phaseGroups: { PREP: 'PREP', CRAFT: 'TWÓRZ', CONVERGE: 'DOMYKAJ', SHIP: 'WDRÓŻ' },
      phaseState: {
        awaiting: 'oczekiwanie',
        indexing: 'indeksowanie',
        implementing: 'implementacja',
        auditing: 'audyt',
        converging: 'domykanie',
        polishing: 'polerowanie',
        packaging: 'pakowanie',
        released: 'wydane'
      },
      alerts: {
        dou: { title: 'DoU', detail: 'Blokery ujawnione' },
        review: { title: 'Review', detail: 'Słabe dopasowania ujawnione' }
      },
      hints: {
        scaffold:
          'Scaffold to zakres, nie kod. Kształt i suwaki po lewej decydują o czym w ogóle jest ta sesja.',
        init:
          'vc-init uruchamia trzy zmysły przed dotknięciem kodu: strukturę (loctree), intencje (aicx), ground truth z git.',
        workflow:
          'Specjaliści zajmują pozycje. Możesz kliknąć planszę żeby rzucić kulkę w konkretny rowek.',
        followup:
          'Każda deklaracja postępu jest testowana. Słabe dopasowania wypływają, żeby Marbles miał czysty cel.',
        marbles:
          'Pętla aż P0=P1=P2=0. Możesz nadal klikać w planszę — pętla sama leci, kliki celują w konkretne luki.',
        dou:
          'Testy przechodzą ≠ produkt działa. Czerwone rowki to realne blokery wdrożenia: instalator, lejek, docs, support.',
        decorate:
          'Pass spójności. Tożsamość zostaje, drift znika. Każdy hover i rytm stają się zamierzone.',
        hydrate:
          'Instalator, onboarding, first-run. Kod bez dystrybucji to zin — Hydrate robi z niego produkt.',
        release:
          'Tag. Podpis. Publikacja. Ogłoszenie. Pętla się zamyka i otwiera na nowy zakres.',
        review:
          'Stres-test pierwszych ułożeń, zanim zaczną się głośniejsze pętle domykania.',
        research:
          'Sprawdź możliwe tory, zanim dołożysz siłę. Research zawęża przestrzeń szukania.',
        agents:
          'Wybierz liczbę specjalistów i wpuść ich w rowki. Każdy agent wypełnia inny typ rowka.',
        prune:
          'Usuń słabe dopasowania, żeby plansza mogła domknąć się wokół mocniejszego rdzenia.'
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
          eyebrow: 'Faza 0 · Prep',
          title: 'Zdefiniuj system, który właśnie zaczynasz budować',
          description:
            'Najpierw zakres. Wybierz kształt planszy odpowiadający topologii twojego systemu, potem ustaw pojemność. Rama to kontrakt z przyszłością: co zbudujesz — i, równie ważne, czego nie zbudujesz.',
          detail: 'Kształt · pojemność · ograniczenia',
          hint: 'Scaffold to krok myślenia, nie kodowania. Kształt i suwaki po lewej, potem spawn albo klik w planszę.'
        },
        init: {
          eyebrow: 'Faza 1 · Twórz',
          title: 'Załaduj percepcję, intencje, ground truth',
          description:
            'Zanim dotkniesz kodu: loctree mapuje żywą strukturę, aicx wyciąga intencje z poprzednich sesji agentów, git daje zakotwiczenie w rzeczywistej produkcji. Pomiń to i następny agent pisze na ślepo.',
          detail: 'loctree · aicx · git',
          hint: 'vc-init odpala trzy zmysły równolegle. Percepcja bije pamięć, intencje biją RAG, ground truth bije intuicję.'
        },
        workflow: {
          eyebrow: 'Faza 1 · Twórz',
          title: 'Wypuść specjalistów na realne pozycje',
          description:
            'Agenci się spawnują i zajmują pozycje. Każdy specjalista wypełnia konkretny rowek — loctree strukturę, aicx pamięć, prview review, ScreenScribe runtime. Tutaj realna praca ląduje na planszy.',
          detail: 'Wysyłka agentów · równoległa robota',
          hint: 'Examine → Research → Implement. Wpuść operatorów panelem — albo kliknij w planszę żeby rzucić celowaną kulkę.'
        },
        followup: {
          eyebrow: 'Faza 2 · Domykaj',
          title: 'Strząśnij fałszywe sukcesy',
          description:
            'Luźne deklaracje odpadają. Wszystko, co nie zostało prawdziwie osadzone, wychodzi na jaw — każdy marble dostaje werdykt GO / NO-GO, zanim zacznie się realna konwergencja.',
          detail: 'Werdykt · czyszczenie szumu',
          hint: 'Blizny są normalne. Słabe dopasowania wypływają tutaj, żeby Marbles nie tracił cykli.'
        },
        marbles: {
          eyebrow: 'Faza 2 · Domykaj',
          title: 'Pętla aż P0 = P1 = P2 = 0',
          description:
            'Iteracyjne domykanie. Każda pętla zmniejsza wariancję. Bez ustalonej liczby — kończysz, gdy koło jest pełne, a wszystkie liczniki priorytetów są zerem. Batche lecą same; nadal możesz klikać planszę, żeby rzucić celowanie w konkretną lukę.',
          detail: 'Autonomiczna pętla · malejąca entropia',
          hint: 'Późne pętle kompresują, nie poprawiają. Jeśli nadal poprawiasz, jesteś jeszcze w Follow-up.'
        },
        dou: {
          eyebrow: 'Faza 3 · Wdrażaj',
          title: 'Definition of Undone — czerwona prawda',
          description:
            'Testy przechodzą ≠ produkt działa. Systematyczna analiza luk na całej powierzchni produktu: instalator, runtime, docs, onboarding, lejek, support. Cokolwiek blokuje wdrożenie — pokazuje się na czerwono.',
          detail: 'Audyt powierzchni · blokery wdrożenia',
          hint: 'Luka to lejek. Znajdź ją i zamknij, zanim wejdziesz w Decorate.'
        },
        decorate: {
          eyebrow: 'Faza 3 · Wdrażaj',
          title: 'Najpierw spójność. Premium drugim.',
          description:
            'Nie ornament — końcowy pass spójności. Tożsamość vs drift: zachowaj to, co wyróżniające, zredukuj to, co się tylko nagromadziło. Każdy hover, odstęp i rytm interakcji staje się zamierzony.',
          detail: 'Pass spójności · intencjonalne wykończenie',
          hint: 'Premium to spójność. Smaczki, nie dekoracje.'
        },
        hydrate: {
          eyebrow: 'Faza 3 · Wdrażaj',
          title: 'Wypełnij luki skierowane na rynek',
          description:
            'Instalator, onboarding, landing dokumentacji, cennik, first-run. Deterministyczna precyzja na rowkach, które decydują czy z odwiedzającego zrobi się klient.',
          detail: 'Dystrybucja · first-run · konwersja',
          hint: 'Kod bez dystrybucji to zin. Hydrate robi z niego produkt.'
        },
        release: {
          eyebrow: 'Krok końcowy · Wdrażaj',
          title: 'Tag · podpisz · publikuj · ogłoś',
          description:
            'Zbuduj i podpisz artefakt, wypchnij tag, przebuduj publiczną powierzchnię, ogłoś cykl. Pętla zamyka się tutaj — i otwiera na nowy zakres.',
          detail: 'Tag · podpis · publikacja · ogłoszenie',
          hint: 'Nie wysyła się „działającego kodu" — wysyła się dostępny, podpisany, weryfikowalny produkt.'
        }
      }
    }
  };

  let { lang = 'en' } = $props<{ lang?: Lang }>();
  const componentId = `framework-playground-${lang === 'pl' ? 'pl' : 'en'}`;

  let rootEl: HTMLDivElement | undefined;
  let boardEl: HTMLDivElement | undefined;
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
    copper: '#d97745',
    copperBright: '#e28a5c',
    patina: '#a6c5bc',
    steel: '#b9c3cc',
    steelDark: '#7a8590',
    steelEdge: '#d3dce4',
    surfaceGlass: 'rgba(15, 22, 29, 0.22)',
    surfaceOverlay: 'rgba(8, 12, 17, 0.88)',
    steelBorder: 'rgba(185, 195, 204, 0.18)'
  };

  let locale = $derived<Lang>(lang === 'pl' ? 'pl' : 'en');
  let text = $derived(FRAMEWORK_I18N[locale]);
  let phases = $derived.by<PhaseDescriptor[]>(() =>
    PHASE_BLUEPRINTS.map((phase) => {
      const override = text.phaseOverrides[phase.name] ?? {};
      return {
        ...phase,
        ...override,
        steps: override.steps ?? phase.steps
      } as PhaseDescriptor;
    })
  );
  let currentPhase = $derived(phases[currentPhaseIndex] ?? phases[0]);
  let visibleSlotCount = $derived.by(() => slots.filter((slot) => slot.visible).length);
  let filledSlotCount = $derived.by(() => slots.filter((slot) => slot.visible && slot.filled).length);
  let settledOverflowCount = $derived.by(
    () => overflowMarbles.filter((marble) => marble.settled && marble.alpha > 0.06).length
  );
  let visibleMarbleCount = $derived.by(
    () =>
      marbles.filter((marble) => marble.alpha > 0.06).length +
      overflowMarbles.filter((marble) => marble.alpha > 0.06).length
  );
  let convergenceProgress = $derived(
    visibleSlotCount > 0
      ? Math.round(((filledSlotCount + settledOverflowCount) / visibleSlotCount) * 100)
      : 0
  );
  let currentHint = $derived(text.hints[currentPhase.name] ?? currentPhase.hint ?? currentPhase.description);
  let reviewWeakFits = $derived.by(
    () =>
      overflowMarbles.filter((marble) => marble.alpha > 0.18).length +
      Math.max(0, Math.ceil((visibleSlotCount - filledSlotCount) / 24))
  );
  let douBlockers = $derived.by(() =>
    Math.max(0, Math.ceil((visibleSlotCount - filledSlotCount) / Math.max(1, hydrateBatchSize)))
  );
  let densityPercent = $derived(Math.round(((grooveDensity - 0.5) / 1.5) * 100));
  let operatorPercent = $derived(Math.round(((operatorCount - 1) / 9) * 100));
  let hydratePercent = $derived(Math.round(((hydrateBatchSize - 1) / 9) * 100));
  let boardShapeLabel = $derived(text.controls.shapes[boardShape]);
  let promptCommand = $derived.by(() => currentPhaseCommand(currentPhase));
  let phaseNumberText = $derived(String(currentPhaseIndex).padStart(2, '0'));
  let phaseState = $derived(text.phaseState[currentPhase.state] ?? currentPhase.state);
  let issuesCount = $derived(currentPhase.name === 'dou' ? douBlockers : reviewWeakFits);
  let guideConverged = $derived(convergenceProgress >= 98 || currentPhase.name === 'release');
  let operatorRows = $derived.by(() => {
    const rows: Array<{
      id: string;
      name: string;
      sub?: string;
      val: number;
      active: boolean;
      warn: boolean;
    }> = [];
    OPERATORS.forEach((op, index) => {
      const isActive = currentPhase.activeOps.includes(op);
      const meta = text.operatorRows[op];
      const val = isActive ? Math.floor(convergenceProgress * (0.6 + index * 0.15)) : 0;
      rows.push({ id: op, name: meta.name, sub: meta.sub, val, active: isActive, warn: false });
    });
    const douMeta = text.operatorRows.dou;
    const reviewMeta = text.operatorRows.review;
    const douVal = currentPhase.group === 'SHIP' ? Math.max(1, Math.floor(convergenceProgress / 15)) : 0;
    const reviewVal = Math.max(0, Math.floor(visibleMarbleCount / 3));
    rows.push({
      id: 'dou',
      name: douMeta.name,
      val: douVal,
      active: douVal > 0,
      warn: currentPhase.name === 'dou' && douBlockers > 0
    });
    rows.push({
      id: 'review',
      name: reviewMeta.name,
      val: reviewVal,
      active: reviewVal > 0,
      warn: currentPhase.name === 'followup' && reviewWeakFits > 0
    });
    return rows;
  });
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

  function splitPromptCommand(command: string): { head: string; tail: string } {
    const parts = command.split(' ');
    if (parts.length <= 2) return { head: command, tail: '' };
    return { head: `${parts[0]} ${parts[1]}`, tail: parts.slice(2).join(' ') };
  }

  function escapeHtml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatTitle(title: string): string {
    const trimmed = title.trim();
    if (!trimmed) return '';
    const match = trimmed.match(
      /^(.*?\s)([A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż][\wĄĆĘŁŃÓŚŹŻąćęłńóśźż-]+)([^A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]*)$/u
    );
    if (!match) return escapeHtml(trimmed);
    const [, head, word, tail] = match;
    return `${escapeHtml(head)}<em>${escapeHtml(word)}</em>${escapeHtml(tail)}`;
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
          isInside =
            Math.abs(distance - (spiralDistance % boardRadius)) < spacing * 0.5 &&
            distance < boardRadius;
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
    boardAlpha =
      phase.name === 'scaffold'
        ? prefersReducedMotion
          ? 0.88
          : 0.12
        : phase.name === 'init'
          ? 0.92
          : 1;
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
    if (!boardEl || !canvasEl) return;
    const rect = boardEl.getBoundingClientRect();
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
    if (slots.length === 0) {
      buildSlots();
    }
    const workflowIndex = phases.findIndex((phase) => phase.name === 'workflow');
    if (currentPhaseIndex <= workflowIndex) {
      grooveRevealProgress = 1;
      syncSlotVisibility();
      if (currentPhaseIndex < workflowIndex) {
        applyPhaseGeometry(workflowIndex);
        grooveRevealProgress = 1;
        syncSlotVisibility();
      }
    }
    const openSlots = slots.filter((slot) => slot.visible && !slot.filled);
    if (openSlots.length === 0) return;
    for (let index = 0; index < Math.min(operatorCount, openSlots.length); index += 1) {
      const pick = Math.floor(Math.random() * openSlots.length);
      const target = openSlots[pick];
      marbles.push(spawnMarble(target, 0.12, 'ocean'));
      openSlots.splice(pick, 1);
    }
    motionActive = true;
    announce(text.controls.status.operatorsSpawned);
  }

  function spawnMarbleAtPoint(localX: number, localY: number) {
    if (slots.length === 0) buildSlots();
    const workflowIndex = phases.findIndex((phase) => phase.name === 'workflow');
    if (currentPhaseIndex < workflowIndex) {
      applyPhaseGeometry(workflowIndex);
    }
    grooveRevealProgress = 1;
    syncSlotVisibility();

    const openSlots = slots.filter((slot) => slot.visible && !slot.filled);
    if (openSlots.length === 0) return;

    let nearest = openSlots[0];
    let bestDist = Infinity;
    for (const slot of openSlots) {
      const d = Math.hypot(slot.x - localX, slot.y - localY);
      if (d < bestDist) {
        bestDist = d;
        nearest = slot;
      }
    }

    const dx = nearest.x - localX;
    const dy = nearest.y - localY;
    const distance = Math.hypot(dx, dy) || 1;
    const speed = 5 + Math.min(8, distance * 0.02);
    marbles.push({
      x: localX,
      y: localY,
      vx: (dx / distance) * speed + (Math.random() - 0.5) * 1.4,
      vy: (dy / distance) * speed + (Math.random() - 0.5) * 1.4,
      target: nearest,
      settled: false,
      seed: Math.floor(Math.random() * 99999),
      palette: randomPalette('ocean'),
      alpha: 1,
      saturation: 0.72 + polishIntensity * 0.12
    });
    pings.push({
      x: localX,
      y: localY,
      life: 0.9,
      color: PAL.ocean.light
    });
    motionActive = true;
  }

  function handleBoardPointerDown(event: PointerEvent) {
    if (event.button !== undefined && event.button !== 0) return;
    if (!boardEl) return;
    const rect = boardEl.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;
    spawnMarbleAtPoint(localX, localY);
  }

  function handleBoardKeydown(event: KeyboardEvent) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    spawnMarbleAtPoint(centerX + (Math.random() - 0.5) * boardRadius * 0.4,
                       centerY + (Math.random() - 0.5) * boardRadius * 0.4);
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
    resetTimer = setTimeout(
      () => {
        restartLoop();
      },
      prefersReducedMotion ? 600 : 2200
    );
  }

  function runPhaseAction() {
    switch (currentPhase.name) {
      case 'scaffold':
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
        runConvergence();
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
    const interior = context.createRadialGradient(
      centerX,
      centerY,
      boardRadius * 0.18,
      centerX,
      centerY,
      boardRadius * 1.02
    );
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
    context.ellipse(
      marble.x,
      marble.y + marbleRadius * 0.6,
      marbleRadius * 0.6,
      marbleRadius * 0.24,
      0,
      0,
      Math.PI * 2
    );
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
    context.arc(
      marble.x - marbleRadius * 0.28,
      drawY - marbleRadius * 0.35,
      marbleRadius * 0.28,
      0,
      0,
      Math.PI * 2
    );
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
        drawGroove(ctx!, slot);
      }
    });

    pings.forEach((ping) => drawPing(ctx!, ping));

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
    allMarbles.forEach((marble) => drawMarble(ctx!, marble));
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
      grooveRevealProgress = Math.max(
        grooveRevealProgress,
        Math.min(0.18, (phaseTime / phaseDuration) * 0.18)
      );
    } else if (currentPhase.name === 'workflow') {
      boardAlpha = 1;
      grooveRevealProgress = Math.max(
        grooveRevealProgress,
        Math.min(1, phaseTime / (phaseDuration * 0.65))
      );
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
    let resizeFrameId = 0;
    const handleMotionChange = (event: MediaQueryListEvent) => {
      prefersReducedMotion = event.matches;
    };
    const scheduleResize = () => {
      if (resizeFrameId) return;
      resizeFrameId = window.requestAnimationFrame(() => {
        resizeFrameId = 0;
        resizeCanvas();
      });
    };
    reducedMotionMedia.addEventListener('change', handleMotionChange);

    syncThemeTokens();
    resizeCanvas();
    showPhase(0);

    resizeObserver = new ResizeObserver(scheduleResize);
    if (boardEl) {
      resizeObserver.observe(boardEl);
    }

    return () => {
      if (resizeFrameId) {
        window.cancelAnimationFrame(resizeFrameId);
      }
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
  class="pg"
  class:pg--converged={guideConverged}
  data-phase={currentPhase.name}
  data-tone={currentPhase.tone}
>
  <!-- ===== Internal topbar / crumb ===== -->
  <div class="pg__topbar" aria-hidden="false">
    <div class="pg__crumb">
      <span class="pg__crumb-root">{text.crumb.root}</span>
      <span class="pg__crumb-sep">/</span>
      <b class="pg__crumb-leaf">{text.crumb.leaf}</b>
    </div>
    <div class="pg__meta-strip" aria-hidden="true">
      <span class="pg__meta-dot" data-dot="live"></span>
      <span class="pg__meta-label">{text.overlayPhase} {phaseNumberText}</span>
      <span class="pg__meta-sep">·</span>
      <span class="pg__meta-label pg__meta-label--accent">{currentPhase.label}</span>
    </div>
  </div>

  <!-- ===== Workspace ===== -->
  <div class="pg__workspace">
    <!-- LEFT: OPERATORS -->
    <aside class="pg__operators" aria-label={text.operators}>
      <div class="op-top">
        <div class="op-head">{text.operators}</div>
        <div class="op-list">
          {#each operatorRows as row (row.id)}
            <div class="op" class:is-active={row.active} class:is-warn={row.warn}>
              <div class="op__dot" aria-hidden="true"></div>
              <div class="op__name">
                {row.name}
                {#if row.sub}<em>· {row.sub}</em>{/if}
              </div>
              <div class="op__val">{row.val}</div>
            </div>
          {/each}
        </div>

        <div class="op-note">{currentHint}</div>
      </div>

      <!-- Tiered controls: shape / density / operators / hydrate / alerts -->
      <section class="op-controls" aria-label={text.controls.actionPanel}>
        <div class="op-controls__head">{text.controls.actionPanel}</div>

        <div class="op-controls__row">
          <span class="op-controls__caption">{text.controls.boardShape}</span>
          <div class="op-controls__shape">
            <button
              class="op-controls__btn"
              type="button"
              aria-label={locale === 'pl' ? 'Poprzedni kształt' : 'Previous shape'}
              onclick={() => shiftBoardShape(-1)}
            >
              &lt;
            </button>
            <span class="op-controls__shape-label">{boardShapeLabel}</span>
            <button
              class="op-controls__btn"
              type="button"
              aria-label={locale === 'pl' ? 'Następny kształt' : 'Next shape'}
              onclick={() => shiftBoardShape(1)}
            >
              &gt;
            </button>
          </div>
        </div>

        <label class="op-controls__range">
          <span class="op-controls__caption">
            {text.controls.density}: {grooveDensity.toFixed(1)}
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

        <label class="op-controls__range">
          <span class="op-controls__caption">
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

        <label class="op-controls__range">
          <span class="op-controls__caption">
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

        <div class="op-controls__actions">
          <button
            class="op-controls__action op-controls__action--muted"
            type="button"
            onclick={spawnOperatorBatch}
          >
            {text.controls.buttons.spawnOperators}
          </button>
          <button
            class="op-controls__action"
            type="button"
            disabled={convergenceRunning}
            onclick={runConvergence}
          >
            {convergenceRunning ? text.controls.buttons.running : text.controls.buttons.runConvergence}
          </button>
        </div>

        <div
          class="op-alerts"
          aria-label={text.controls.alerts}
        >
          <p
            class="op-alert"
            data-alert="dou"
            data-active={currentPhase.name === 'dou' || douBlockers > 0}
          >
            <span>{text.alerts.dou.title}</span>
            <strong>{douBlockers}</strong>
          </p>
          <p
            class="op-alert"
            data-alert="review"
            data-active={currentPhase.name === 'followup' || reviewWeakFits > 0}
          >
            <span>{text.alerts.review.title}</span>
            <strong>{reviewWeakFits}</strong>
          </p>
        </div>
      </section>
    </aside>

    <!-- CENTER: BOARD -->
    <section class="pg__board-wrap">
      <div class="board-head">
        <div class="board-head__title">
          <span>{text.boardHead.phase} <b>{phaseNumberText}</b></span>
          <span class="board-head__dot">·</span>
          <span>{currentPhase.label}</span>
          <span class="board-head__desc">{currentPhase.title}.</span>
        </div>
        <div class="board-head__meta">
          <span>{text.boardHead.marbles} <b>{visibleMarbleCount}</b></span>
          <span>{text.boardHead.converge} <b class="mint">{convergenceProgress}%</b></span>
          <span class="warn">{text.boardHead.issues} <b>{issuesCount}</b></span>
        </div>
      </div>

      <div
        bind:this={boardEl}
        class="board"
        class:board--idle={currentPhase.name === 'scaffold'}
        data-board-shape={boardShape}
        id={`${componentId}-panel`}
        role="application"
        tabindex="0"
        aria-label={boardAriaLabel}
        onpointerdown={handleBoardPointerDown}
        onkeydown={handleBoardKeydown}
      >
        <span class="board__corner board__corner--tl" aria-hidden="true"></span>
        <span class="board__corner board__corner--tr" aria-hidden="true"></span>
        <span class="board__corner board__corner--bl" aria-hidden="true"></span>
        <span class="board__corner board__corner--br" aria-hidden="true"></span>

        <div class="board__phase-badge" aria-hidden="true">
          <span class="board__phase-badge-dot"></span>
          <span>{text.boardPhaseBadge} {phaseNumberText} · {currentPhase.label}</span>
        </div>

        {#each FRAME_LABELS as labelKey (labelKey)}
          <span
            class="frame-label frame-label--{labelKey}"
            class:show={currentPhase.showLabels.includes(labelKey)}
            class:active={currentPhase.showLabels.includes(labelKey) && currentPhase.state === labelKey}
            aria-hidden="true"
          >
            {text.labels[labelKey]}
          </span>
        {/each}

        <div class="board__readout" aria-hidden="true">
          <div>{text.readout.state} · <span class="g">{phaseState}</span></div>
          <div>{text.readout.loop} · <b>{currentPhase.readoutLoop}</b></div>
          <div>{text.readout.p} · <b>{currentPhase.readoutP}</b></div>
        </div>

        <div class="board__guide" class:board__guide--converged={guideConverged} aria-hidden="true"></div>

        {#if currentPhase.name === 'scaffold'}
          <div class="board__ghost-slots" aria-hidden="true">
            {#each [0, 1, 2, 3, 4, 5] as slotIndex (slotIndex)}
              <span
                class="board__ghost-slot"
                style={`--slot-angle:${(slotIndex * 60) - 90}deg`}
              ></span>
            {/each}
          </div>
        {/if}

        <canvas bind:this={canvasEl} class="board__canvas" aria-hidden="true"></canvas>

        {#if currentPhase.name === 'scaffold' && visibleMarbleCount === 0}
          <div class="board__idle-cta" aria-hidden="true">
            {text.boardIdleHint}
          </div>
        {/if}

        <div class="board__overlay" aria-hidden="true">
          <span>{text.overlayPhase} <strong>{currentPhase.label}</strong></span>
          <span>{text.overlayConverge} <strong>{convergenceProgress}%</strong></span>
          <span>{text.overlayMarbles} <strong>{visibleMarbleCount}</strong></span>
        </div>
      </div>

      <div class="cmd-deck">
        <div class="cmd-deck__prompt">{text.cmdDeck.prompt}</div>
        <div class="cmd-deck__line">
          <b>{splitPromptCommand(promptCommand).head}</b>
          <em>{splitPromptCommand(promptCommand).tail}</em>
        </div>
        <div class="cmd-deck__status">{phaseState}</div>
      </div>
    </section>

    <!-- RIGHT: INSTRUCTOR -->
    <aside class="pg__instructor" aria-label={text.instructor.label}>
      <div class="inst-head">
        <div class="inst-label">
          {text.overlayPhase} {phaseNumberText} · {currentPhase.label}
        </div>
        <h2 class="inst-title">
          {@html formatTitle(currentPhase.title)}
        </h2>
      </div>

      <p class="inst-desc">{currentPhase.description}</p>

      {#if currentPhase.steps && currentPhase.steps.length > 0}
        <div class="inst-steps">
          {#each currentPhase.steps as step, index (index)}
            <div class="inst-step inst-step--{step.state}">
              <div class="inst-step__num">{String(index + 1).padStart(2, '0')}</div>
              <div class="inst-step__txt">{step.txt}</div>
            </div>
          {/each}
        </div>
      {/if}

      <div class="inst-hint">
        <b>{text.instructor.hintLede}</b>
        {currentHint}
      </div>

      <div class="inst-cta">
        <button
          class="inst-btn"
          type="button"
          disabled={currentPhaseIndex === 0}
          onclick={() => showPhase(currentPhaseIndex - 1)}
        >
          {text.instructor.prev}
        </button>
        <button
          class="inst-btn inst-btn--primary"
          type="button"
          disabled={currentPhaseIndex === phases.length - 1}
          onclick={runPhaseAction}
        >
          {currentPhaseIndex === phases.length - 1
            ? text.instructor.shipped
            : text.controls.buttons.phaseAction[currentPhase.name]}
        </button>
      </div>
    </aside>
  </div>

  <!-- ===== Phase timeline footer ===== -->
  <div class="phase-bar" role="tablist" aria-label={text.choosePhase}>
    {#each phases as phase, index (phase.name)}
      <button
        bind:this={phaseButtons[index]}
        class="phase"
        class:is-active={index === currentPhaseIndex}
        class:is-done={index < currentPhaseIndex}
        data-tone={phase.tone}
        data-group={phase.group}
        type="button"
        role="tab"
        tabindex={index === currentPhaseIndex ? 0 : -1}
        aria-selected={index === currentPhaseIndex}
        aria-controls={`${componentId}-panel`}
        aria-label={`${phase.label}. ${phase.title}.`}
        onclick={() => showPhase(index)}
        onkeydown={(event) => handlePhaseKeydown(event, index)}
      >
        <span class="phase__num">{String(index).padStart(2, '0')}</span>
        <span class="phase__name">{phase.label}</span>
        <span class="phase__group">{text.phaseGroups[phase.group]}</span>
      </button>
    {/each}
  </div>

  <p class="pg__sr-only" aria-live="polite">{liveMessage}</p>
</div>

<style>
  /* ───────── LAYOUT ───────── */
  .pg {
    --pg-stone-deep: var(--stone-deep);
    --pg-bg-deep: var(--bg-deep);
    --pg-ink: var(--stone-light);
    --pg-ink-dim: var(--ink-dim);
    --pg-ink-faint: var(--ink-faint);
    --pg-line: var(--line);
    --pg-line-bright: var(--line-bright);
    --pg-orange: var(--copper);
    --pg-orange-hi: var(--copper-bright);
    --pg-mint: var(--patina);
    --pg-mint-hi: var(--verdigris);
    --pg-red: var(--red);
    /* Internal dividers — nearly invisible etched lines, not walls */
    --pg-divider: rgba(185, 195, 204, 0.08);

    position: relative;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    width: 100%;
    height: calc(100svh - var(--nav-height) - 2.25rem);
    max-height: calc(100svh - var(--nav-height) - 2.25rem);
    border: 1px solid var(--glass-panel-border);
    border-radius: var(--radius-lg);
    background: var(--vt-framework-shell-bg);
    box-shadow: var(--vt-framework-shell-shadow);
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    overflow: hidden;
    color: var(--pg-ink);
    font-family: var(--font-mono);
    isolation: isolate;
  }

  .pg::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(230, 232, 235, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(230, 232, 235, 0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    z-index: 0;
  }

  .pg > * {
    position: relative;
    z-index: 1;
  }

  /* ───────── INTERNAL TOPBAR / CRUMB ───────── */
  .pg__topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 22px;
    border-bottom: 1px solid var(--pg-divider);
    background: transparent;
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }

  .pg__crumb {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--pg-ink-faint);
  }

  .pg__crumb-root {
    color: var(--pg-ink-dim);
  }

  .pg__crumb-sep {
    color: var(--pg-line-bright);
    opacity: 0.85;
  }

  .pg__crumb-leaf {
    color: var(--pg-mint);
    font-weight: 500;
  }

  .pg__meta-strip {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--pg-ink-faint);
  }

  .pg__meta-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--pg-orange);
    box-shadow: 0 0 10px var(--pg-orange);
    animation: pg-pulse 2s ease-in-out infinite;
  }

  .pg__meta-sep {
    color: var(--pg-line-bright);
  }

  .pg__meta-label--accent {
    color: var(--pg-ink);
  }

  @keyframes pg-pulse {
    50% {
      opacity: 0.4;
    }
  }

  /* ───────── WORKSPACE GRID ───────── */
  .pg__workspace {
    display: grid;
    grid-template-columns: clamp(220px, 18%, 280px) minmax(0, 1fr) clamp(280px, 22%, 340px);
    min-height: 0;
    min-width: 0;
    height: 100%;
    overflow: hidden;
  }

  /* ───────── OPERATORS (LEFT) ───────── */
  .pg__operators {
    border-right: 1px solid var(--pg-divider);
    padding: 16px 16px 14px;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    gap: 14px;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
    background: transparent;
  }

  .op-top {
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-height: 0;
  }

  .op-head {
    font-size: 10px;
    letter-spacing: 0.3em;
    color: var(--pg-ink-faint);
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .op-head::before {
    content: '';
    width: 16px;
    height: 1px;
    background: var(--pg-orange);
  }

  .op-list {
    display: flex;
    flex-direction: column;
  }

  .op {
    display: grid;
    grid-template-columns: 10px 1fr auto;
    gap: 10px;
    align-items: center;
    padding: 7px 0;
    border-bottom: 1px dashed var(--pg-line);
    font-size: 11px;
    color: var(--pg-ink-dim);
    transition: color 0.18s ease;
  }

  .op:last-child {
    border-bottom: none;
  }

  .op__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--pg-line-bright);
    transition:
      background 0.2s,
      box-shadow 0.2s;
  }

  .op.is-active {
    color: var(--pg-ink);
  }

  .op.is-active .op__dot {
    background: var(--pg-mint);
    box-shadow: 0 0 8px var(--pg-mint);
  }

  .op.is-warn .op__dot {
    background: var(--pg-orange);
    box-shadow: 0 0 8px var(--pg-orange);
  }

  .op.is-warn {
    color: var(--pg-orange);
  }

  .op__name {
    font-family: var(--font-mono);
  }

  .op__name em {
    color: var(--pg-ink-faint);
    font-style: italic;
    font-weight: 400;
    font-size: 10px;
    letter-spacing: 0.12em;
    margin-left: 4px;
  }

  .op__val {
    font-family: var(--font-display);
    font-size: 15px;
    color: var(--pg-ink);
    font-variation-settings: 'opsz' 48;
  }

  .op.is-warn .op__val {
    color: var(--pg-orange);
  }

  .op-note {
    font-size: 10.5px;
    line-height: 1.45;
    color: var(--pg-ink-dim);
    font-style: italic;
    font-family: var(--font-display);
    padding: 9px 11px;
    background: rgba(166, 197, 188, 0.05);
    border-left: 2px solid var(--pg-mint);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .op-controls {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 10px 2px 2px;
    border-top: 1px dashed var(--pg-line);
    min-height: 0;
    overflow-y: auto;
    scrollbar-width: thin;
  }

  .op-controls__head {
    font-size: 9px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--pg-ink-faint);
    margin: 0 0 2px;
  }

  .op-controls__row {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .op-controls__caption {
    font-size: 9.5px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--pg-ink-faint);
  }

  .op-controls__shape {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .op-controls__shape-label {
    flex: 1;
    color: var(--pg-ink);
    font-family: var(--font-mono);
    font-size: 10.5px;
    letter-spacing: 0.08em;
    text-align: center;
    text-transform: uppercase;
  }

  .op-controls__btn {
    display: inline-flex;
    width: 22px;
    height: 22px;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 1px solid var(--pg-line-bright);
    background: transparent;
    color: var(--pg-ink);
    font-family: var(--font-mono);
    font-size: 11px;
    cursor: pointer;
    transition:
      border-color 0.2s,
      color 0.2s;
  }

  .op-controls__btn:hover,
  .op-controls__btn:focus-visible {
    border-color: var(--pg-orange);
    color: var(--pg-orange);
    outline: none;
  }

  .op-controls__range {
    display: grid;
    gap: 3px;
  }

  .op-controls__range input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 3px;
    background: linear-gradient(
      to right,
      var(--pg-orange-hi) 0%,
      var(--pg-orange-hi) var(--range-pct, 0%),
      rgba(185, 195, 204, 0.14) var(--range-pct, 0%),
      rgba(185, 195, 204, 0.14) 100%
    );
    border-radius: 999px;
    outline: none;
    cursor: pointer;
  }

  .op-controls__range input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    background: var(--pg-ink);
    border: 2px solid var(--pg-orange-hi);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 12px var(--glow-subtle);
  }

  .op-controls__range input[type='range']::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background: var(--pg-orange-hi);
    border-radius: 50%;
    cursor: pointer;
    border: none;
  }

  .op-controls__actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
    margin-top: 2px;
  }

  .op-controls__action {
    border: 1px solid var(--pg-orange);
    background: rgba(217, 119, 69, 0.12);
    color: var(--pg-orange-hi);
    font-family: var(--font-mono);
    font-size: 9.5px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 600;
    padding: 7px 4px;
    cursor: pointer;
    transition: all 0.18s ease;
  }

  .op-controls__action:hover:not(:disabled),
  .op-controls__action:focus-visible:not(:disabled) {
    background: rgba(217, 119, 69, 0.22);
    outline: none;
  }

  .op-controls__action:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .op-controls__action--muted {
    border-color: var(--pg-line-bright);
    background: transparent;
    color: var(--pg-ink-dim);
  }

  .op-controls__action--muted:hover:not(:disabled),
  .op-controls__action--muted:focus-visible:not(:disabled) {
    border-color: var(--pg-mint);
    color: var(--pg-mint);
    background: rgba(166, 197, 188, 0.08);
  }

  .op-alerts {
    display: grid;
    gap: 4px;
    padding-top: 6px;
    border-top: 1px dashed var(--pg-line);
    margin-top: 2px;
  }

  .op-alert {
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 2px 0 2px 8px;
    border-left: 1px solid rgba(185, 195, 204, 0.16);
    color: var(--pg-ink-faint);
    font-family: var(--font-mono);
    font-size: 9.5px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .op-alert strong {
    color: var(--pg-ink);
    font-size: 11px;
  }

  .op-alert[data-active='false'] {
    opacity: 0.55;
  }

  .op-alert[data-alert='dou'][data-active='true'] {
    border-left-color: var(--vt-framework-alert-danger-border);
    color: var(--vt-framework-alert-danger);
  }

  .op-alert[data-alert='review'][data-active='true'] {
    border-left-color: var(--vt-framework-alert-review-border);
    color: var(--pg-orange-hi);
  }

  /* ───────── BOARD (CENTER) ───────── */
  .pg__board-wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 0;
    min-width: 0;
    overflow: hidden;
  }

  .board-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 12px 20px;
    border-bottom: 1px solid var(--pg-divider);
    background: transparent;
    gap: 12px;
    flex: 0 0 auto;
    min-width: 0;
  }

  .board-head__title {
    display: flex;
    align-items: baseline;
    gap: 10px;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--pg-ink-dim);
    min-width: 0;
  }

  .board-head__title b {
    color: var(--pg-orange);
    font-weight: 500;
  }

  .board-head__dot {
    color: var(--pg-line-bright);
  }

  .board-head__desc {
    font-family: var(--font-display);
    font-style: italic;
    font-size: 14px;
    color: var(--pg-ink);
    letter-spacing: 0;
    text-transform: none;
    margin-left: 8px;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .board-head__meta {
    display: flex;
    gap: 18px;
    font-size: 10px;
    letter-spacing: 0.18em;
    color: var(--pg-ink-faint);
    text-transform: uppercase;
    flex-wrap: wrap;
  }

  .board-head__meta b {
    color: var(--pg-ink);
    font-weight: 500;
  }

  .board-head__meta b.mint {
    color: var(--pg-mint);
  }

  .board-head__meta .warn b {
    color: var(--pg-orange);
  }

  .board {
    flex: 1 1 auto;
    align-self: stretch;
    position: relative;
    overflow: hidden;
    background:
      radial-gradient(ellipse at 50% 45%, rgba(166, 197, 188, 0.08), transparent 55%),
      radial-gradient(ellipse at 30% 20%, rgba(26, 35, 48, 0.6), rgba(10, 15, 21, 0.95) 70%);
    width: 100%;
    min-width: 0;
    min-height: 0;
    cursor: crosshair;
    touch-action: manipulation;
  }

  .board:focus-visible {
    outline: 1px solid var(--pg-mint);
    outline-offset: -3px;
  }

  .board--idle {
    /* Amplify center glow in SCAFFOLD phase so the engine reads as awaiting-input, not off */
    background:
      radial-gradient(ellipse at 50% 45%, rgba(166, 197, 188, 0.12), transparent 58%),
      radial-gradient(ellipse at 30% 20%, rgba(26, 35, 48, 0.6), rgba(10, 15, 21, 0.95) 70%);
  }

  .board__canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
  }

  .board__corner {
    position: absolute;
    width: 26px;
    height: 26px;
    border: 1.5px solid var(--pg-ink-faint);
    pointer-events: none;
    opacity: 1;
    z-index: 2;
  }

  .board__corner--tl {
    top: 16px;
    left: 16px;
    border-right: none;
    border-bottom: none;
  }

  .board__corner--tr {
    top: 16px;
    right: 16px;
    border-left: none;
    border-bottom: none;
  }

  .board__corner--bl {
    bottom: 16px;
    left: 16px;
    border-right: none;
    border-top: none;
  }

  .board__corner--br {
    bottom: 16px;
    right: 16px;
    border-left: none;
    border-top: none;
  }

  .frame-label {
    position: absolute;
    font-size: 9px;
    letter-spacing: 0.3em;
    color: var(--pg-ink-faint);
    text-transform: uppercase;
    pointer-events: none;
    transition:
      color 0.3s,
      opacity 0.3s;
    opacity: 0;
    font-family: var(--font-mono);
  }

  .frame-label.show {
    opacity: 1;
  }

  .frame-label.active {
    color: var(--pg-orange);
  }

  .frame-label--agents {
    top: 30px;
    left: 30%;
  }

  .frame-label--pipeline {
    top: 30px;
    right: 30%;
  }

  .frame-label--verify {
    bottom: 30px;
    right: 30%;
  }

  .frame-label--artifacts {
    bottom: 30px;
    left: 30%;
  }

  .board__readout {
    position: absolute;
    top: 28px;
    right: 34px;
    font-size: 10.5px;
    color: var(--pg-ink-dim);
    text-align: right;
    line-height: 1.75;
    font-family: var(--font-mono);
    letter-spacing: 0.12em;
    z-index: 3;
    pointer-events: none;
  }

  .board__readout b {
    color: var(--pg-ink);
    font-weight: 600;
  }

  .board__readout .g {
    color: var(--pg-mint);
    font-weight: 600;
  }

  .board__guide {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: min(72%, 480px);
    aspect-ratio: 1;
    border: 1.5px dashed var(--pg-mint);
    border-radius: 50%;
    pointer-events: none;
    opacity: 0.75;
    transition:
      border-color 0.4s,
      border-style 0.4s,
      opacity 0.4s,
      box-shadow 0.4s;
    z-index: 2;
  }

  .board__guide--converged {
    border-color: var(--pg-mint);
    border-style: solid;
    opacity: 0.72;
    box-shadow:
      0 0 40px rgba(166, 197, 188, 0.22),
      inset 0 0 40px rgba(166, 197, 188, 0.12);
  }

  /* Phase breadcrumb — small mint badge top-left, mirrors readout */
  .board__phase-badge {
    position: absolute;
    top: 28px;
    left: 34px;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--pg-ink-dim);
    z-index: 3;
    pointer-events: none;
  }

  .board__phase-badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--pg-mint);
    box-shadow: 0 0 8px var(--pg-mint);
  }

  /* Ghost slot blueprint — static outlines showing board capacity at SCAFFOLD.
     Positioned as a full-sized frame so children can project out from center. */
  .board__ghost-slots {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 2;
  }

  .board__ghost-slot {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 22px;
    height: 22px;
    margin: -11px 0 0 -11px;
    border: 1px dashed var(--pg-mint);
    border-radius: 50%;
    opacity: 0.4;
    /* Ring of 6 evenly-spaced blueprint dots offset from center.
       rotate orients axis, translateY pushes out by a fixed radius,
       counter-rotate cancels orientation so the circle itself is upright. */
    transform:
      rotate(var(--slot-angle, 0deg))
      translateY(-96px)
      rotate(calc(var(--slot-angle, 0deg) * -1));
  }

  @media (max-width: 1100px) {
    .board__ghost-slot {
      transform:
        rotate(var(--slot-angle, 0deg))
        translateY(-78px)
        rotate(calc(var(--slot-angle, 0deg) * -1));
    }
  }

  /* Idle call-to-action — appears only at SCAFFOLD with zero marbles.
     Positioned just below the guide-circle center, centered horizontally. */
  .board__idle-cta {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 130px);
    font-family: var(--font-display);
    font-style: italic;
    font-size: clamp(0.8rem, 1.2vw, 1rem);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--pg-ink-faint);
    white-space: nowrap;
    pointer-events: none;
    z-index: 3;
    animation: pg-idle-breathe 3.2s ease-in-out infinite;
  }

  @media (max-width: 1100px) {
    .board__idle-cta {
      transform: translate(-50%, 106px);
    }
  }

  @keyframes pg-idle-breathe {
    50% {
      opacity: 0.55;
    }
  }

  .board__overlay {
    position: absolute;
    left: 24px;
    bottom: 72px;
    display: grid;
    gap: 4px;
    padding: 8px 12px;
    border: 1px solid var(--vt-framework-panel-border);
    border-radius: 6px;
    background: var(--vt-framework-panel-bg);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--pg-ink-faint);
    z-index: 4;
    opacity: 0.78;
  }

  .board__overlay span {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }

  .board__overlay strong {
    color: var(--pg-ink);
    font-weight: 500;
  }

  /* ───────── CMD DECK ───────── */
  .cmd-deck {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 20px;
    border-top: 1px solid var(--pg-divider);
    background: transparent;
    font-size: 11.5px;
    min-height: 42px;
    flex: 0 0 auto;
    font-family: var(--font-mono);
    user-select: text;
    -webkit-user-select: text;
  }

  .cmd-deck__prompt {
    color: var(--pg-ink-faint);
  }

  .cmd-deck__line {
    flex: 1;
    min-width: 0;
    color: var(--pg-mint);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .cmd-deck__line b {
    color: var(--pg-ink);
    font-weight: 500;
  }

  .cmd-deck__line em {
    color: var(--pg-orange);
    font-style: normal;
  }

  .cmd-deck__status {
    font-size: 10px;
    letter-spacing: 0.22em;
    color: var(--pg-ink-faint);
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .cmd-deck__status::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--pg-mint);
    box-shadow: 0 0 8px var(--pg-mint);
    animation: pg-pulse 1.2s ease-in-out infinite;
  }

  /* ───────── INSTRUCTOR (RIGHT) ───────── */
  .pg__instructor {
    border-left: 1px solid var(--pg-divider);
    padding: 18px 18px 16px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
    background: transparent;
  }

  .inst-head {
    display: grid;
    gap: 6px;
    flex: 0 0 auto;
  }

  .inst-label {
    font-size: 10px;
    letter-spacing: 0.3em;
    color: var(--pg-orange);
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .inst-label::before {
    content: '';
    width: 16px;
    height: 1px;
    background: var(--pg-orange);
  }

  .inst-title {
    font-family: var(--font-display);
    font-size: clamp(1.35rem, 2.4vw, 1.9rem);
    line-height: 1.06;
    letter-spacing: -0.02em;
    font-weight: 350;
    margin: 0;
    color: var(--pg-ink);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .inst-title :global(em) {
    font-style: italic;
    color: var(--pg-orange);
    font-weight: 300;
  }

  .inst-desc {
    font-family: var(--font-display);
    font-style: italic;
    font-size: 13px;
    line-height: 1.45;
    color: var(--pg-ink-dim);
    margin: 0;
    flex: 0 0 auto;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .inst-steps {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 11px;
    line-height: 1.45;
    font-family: var(--font-mono);
    flex: 0 1 auto;
    min-height: 0;
    overflow: hidden;
    mask-image: linear-gradient(180deg, #000 0, #000 calc(100% - 14px), transparent 100%);
    -webkit-mask-image: linear-gradient(180deg, #000 0, #000 calc(100% - 14px), transparent 100%);
  }

  .inst-step {
    display: grid;
    grid-template-columns: 20px 1fr;
    gap: 10px;
    color: var(--pg-ink-dim);
    padding: 3px 0;
    align-items: start;
  }

  .inst-step__num {
    color: var(--pg-ink-faint);
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.15em;
    padding-top: 2px;
  }

  .inst-step__txt {
    letter-spacing: 0.02em;
  }

  .inst-step--done {
    color: var(--pg-mint);
  }

  .inst-step--done .inst-step__num {
    color: var(--pg-mint);
  }

  .inst-step--active {
    color: var(--pg-ink);
  }

  .inst-step--active .inst-step__num {
    color: var(--pg-orange);
  }

  .inst-hint {
    font-size: 11.5px;
    line-height: 1.45;
    color: var(--pg-ink-faint);
    padding-top: 8px;
    border-top: 1px dashed var(--pg-line);
    font-style: italic;
    font-family: var(--font-display);
    flex: 0 0 auto;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .inst-hint b {
    color: var(--pg-mint);
    font-style: normal;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.2em;
    margin-right: 4px;
    text-transform: lowercase;
  }

  .inst-cta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-top: auto;
    flex: 0 0 auto;
  }

  .inst-btn {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 10px 12px;
    cursor: pointer;
    border: 1px solid var(--pg-line-bright);
    background: transparent;
    color: var(--pg-ink);
    transition: all 0.18s ease;
  }

  .inst-btn:hover:not(:disabled),
  .inst-btn:focus-visible:not(:disabled) {
    border-color: var(--pg-orange);
    color: var(--pg-orange);
    outline: none;
  }

  .inst-btn--primary {
    background: var(--pg-orange);
    border-color: var(--pg-orange);
    color: var(--pg-stone-deep);
    font-weight: 600;
  }

  .inst-btn--primary:hover:not(:disabled),
  .inst-btn--primary:focus-visible:not(:disabled) {
    background: var(--pg-orange-hi);
    border-color: var(--pg-orange-hi);
    color: var(--pg-stone-deep);
  }

  .inst-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  /* ───────── PHASE TIMELINE (FOOTER) ───────── */
  .phase-bar {
    display: flex;
    border-top: 1px solid var(--pg-divider);
    background: transparent;
    position: relative;
    z-index: 2;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: thin;
    flex: 0 0 auto;
  }

  .phase {
    flex: 1 0 auto;
    min-width: 92px;
    padding: 9px 12px 11px;
    border-right: 1px solid var(--pg-divider);
    border-top: none;
    border-bottom: none;
    border-left: none;
    display: flex;
    flex-direction: column;
    gap: 3px;
    cursor: pointer;
    position: relative;
    font-family: var(--font-mono);
    transition: background 0.15s ease;
    text-align: left;
    background: transparent;
    color: inherit;
  }

  .phase:last-child {
    border-right: none;
  }

  .phase:hover {
    background: rgba(230, 232, 235, 0.025);
  }

  .phase__num {
    font-size: 9px;
    letter-spacing: 0.22em;
    color: var(--pg-ink-faint);
  }

  .phase__name {
    font-size: 11px;
    letter-spacing: 0.1em;
    color: var(--pg-ink-dim);
    text-transform: uppercase;
  }

  .phase.is-done .phase__name {
    color: var(--pg-mint);
  }

  .phase.is-done .phase__num {
    color: var(--pg-mint);
    opacity: 0.7;
  }

  .phase.is-active {
    background: rgba(217, 119, 69, 0.08);
  }

  .phase.is-active .phase__name {
    color: var(--pg-orange);
    font-weight: 500;
  }

  .phase.is-active .phase__num {
    color: var(--pg-orange);
  }

  .phase.is-active::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--pg-orange);
    box-shadow: 0 0 10px var(--pg-orange);
  }

  .phase[data-tone='patina'].is-active {
    background: rgba(166, 197, 188, 0.08);
  }

  .phase[data-tone='patina'].is-active .phase__name,
  .phase[data-tone='patina'].is-active .phase__num {
    color: var(--pg-mint);
  }

  .phase[data-tone='patina'].is-active::before {
    background: var(--pg-mint);
    box-shadow: 0 0 10px var(--pg-mint);
  }

  .phase[data-tone='alert'].is-active {
    background: rgba(224, 85, 68, 0.1);
  }

  .phase[data-tone='alert'].is-active .phase__name,
  .phase[data-tone='alert'].is-active .phase__num {
    color: var(--vt-framework-alert-danger);
  }

  .phase[data-tone='alert'].is-active::before {
    background: var(--vt-framework-alert-danger);
    box-shadow: 0 0 10px rgba(224, 85, 68, 0.6);
  }

  .phase__group {
    position: absolute;
    bottom: 3px;
    right: 8px;
    font-size: 8px;
    letter-spacing: 0.25em;
    color: var(--pg-ink-faint);
    opacity: 0.55;
  }

  /* ───────── SR-ONLY ───────── */
  .pg__sr-only {
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

  /* ───────── RESPONSIVE ───────── */
  @media (max-width: 1280px) {
    .pg__workspace {
      grid-template-columns: clamp(210px, 17%, 260px) minmax(0, 1fr) clamp(270px, 22%, 320px);
    }
  }

  @media (max-width: 1100px) {
    .pg {
      height: auto;
      max-height: none;
      min-height: calc(100svh - var(--nav-height));
    }

    .pg__workspace {
      grid-template-columns: minmax(0, 1fr);
      height: auto;
      overflow: visible;
    }

    .pg__operators,
    .pg__instructor {
      border-left: none;
      border-right: none;
      border-top: 1px solid var(--pg-divider);
      overflow: visible;
    }

    .op-controls {
      overflow: visible;
    }

    .board {
      min-height: 420px;
    }

    .phase {
      flex: 0 0 auto;
      min-width: 110px;
    }
  }

  @media (max-width: 720px) {
    .pg__topbar {
      padding: 10px 14px;
      font-size: 9px;
      letter-spacing: 0.18em;
    }

    .pg__meta-strip {
      gap: 6px;
    }

    .pg__crumb-root,
    .pg__crumb-sep {
      display: none;
    }

    .board-head {
      flex-direction: column;
      align-items: flex-start;
      padding: 12px 16px;
      gap: 6px;
    }

    .board-head__title {
      font-size: 10px;
      flex-wrap: wrap;
    }

    .board-head__desc {
      margin-left: 0;
      font-size: 13px;
    }

    .board-head__meta {
      font-size: 9px;
      gap: 12px;
      flex-wrap: wrap;
    }

    .pg__operators {
      padding: 18px 14px;
    }

    .op {
      grid-template-columns: 10px 1fr auto;
      gap: 8px;
      font-size: 11px;
    }

    .op__name em {
      display: none;
    }

    .pg__instructor {
      padding: 18px 14px;
    }

    .inst-title {
      font-size: 20px;
    }

    .board__readout {
      top: 12px;
      right: 14px;
      font-size: 9px;
    }

    .frame-label {
      font-size: 8px;
      letter-spacing: 0.22em;
    }

    .frame-label--pipeline,
    .frame-label--artifacts {
      display: none;
    }

    .cmd-deck {
      padding: 10px 14px;
      font-size: 10px;
    }

    .cmd-deck__status {
      display: none;
    }

    .phase {
      min-width: 104px;
      padding: 10px 12px 12px;
    }

    .phase__name {
      font-size: 10px;
    }

    .phase__group {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .pg *,
    .pg *::before,
    .pg *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* ───────── SHELL CONTEXT ───────── */
  :global(body.framework-page) {
    min-height: 100%;
  }

  :global(.framework-page-shell) {
    width: min(1440px, calc(100vw - 1rem));
    margin: 0 auto;
    padding: calc(var(--nav-height) + 0.55rem) 0.5rem 1.25rem;
    display: block;
  }

  @media (max-width: 720px) {
    :global(.framework-page-shell) {
      padding: calc(var(--nav-height) + 0.4rem) 0.25rem 0.75rem;
    }
  }
</style>