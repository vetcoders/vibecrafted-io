<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  type Lang = 'en' | 'pl';
  type PhaseId = 'frame' | 'perceive' | 'work' | 'converge' | 'ship';
  type BoardShape = 'ring' | 'oval' | 'grid';
  type MarbleTone = 'teal' | 'steel' | 'copper' | 'mint' | 'danger';
  type OperatorId = 'loctree' | 'aicx' | 'prview' | 'screenscribe' | 'agents' | 'marbles';

  interface PhaseCopy {
    id: PhaseId;
    eyebrow: string;
    title: string;
    verb: string;
    body: string;
    command: string;
    note: string;
    fill: number;
    tone: MarbleTone;
  }

  interface Copy {
    top: {
      brand: string;
      center: string;
      fig: string;
      mode: string;
    };
    hero: {
      kicker: string;
      title: string;
      lead: string;
      foot: string;
    };
    board: {
      shape: string;
      density: string;
      operators: string;
      precision: string;
      spawn: string;
      converge: string;
      next: string;
      reset: string;
      command: string;
      convergence: string;
      grooves: string;
      marbles: string;
      signal: string;
      teaching: string;
      pickShape: string;
      runHint: string;
    };
    shapes: Record<BoardShape, string>;
    phases: PhaseCopy[];
    operators: Record<OperatorId, { label: string; kind: string }>;
    status: {
      ready: string;
      phase: string;
      spawned: string;
      convergence: string;
      thrown: string;
      reset: string;
    };
  }

  interface Slot {
    x: number;
    y: number;
    filled: boolean;
    blocked: boolean;
    order: number;
  }

  interface Marble {
    x: number;
    y: number;
    tx: number;
    ty: number;
    vx: number;
    vy: number;
    tone: MarbleTone;
    alpha: number;
    settled: boolean;
    slot: Slot | null;
    seed: number;
  }

  interface Ping {
    x: number;
    y: number;
    alpha: number;
    danger?: boolean;
  }

  const COPY: Record<Lang, Copy> = {
    en: {
      top: {
        brand: 'Vibecrafted.',
        center: 'Framework — The Game',
        fig: 'FIG. 06 · GAME VC-006',
        mode: 'Teaching mode'
      },
      hero: {
        kicker: '§ 06 · Framework loop',
        title: 'Learn the loop by shaping the board.',
        lead:
          'Shape the frame, load truth, send operators through the slots, then watch weak fits fall away before release.',
        foot: 'Five phases. Six operators. One board.'
      },
      board: {
        shape: 'Board shape',
        density: 'Groove density',
        operators: 'Operators',
        precision: 'Precision fill',
        spawn: 'Spawn operators',
        converge: 'Run convergence',
        next: 'Next phase',
        reset: 'Reset loop',
        command: 'Command',
        convergence: 'Convergence',
        grooves: 'Grooves',
        marbles: 'Marbles',
        signal: 'Signal',
        teaching: 'Teaching surface — not production output.',
        pickShape: 'Pick shape',
        runHint: 'watching convergence...'
      },
      shapes: {
        ring: 'Ring',
        oval: 'Oval',
        grid: 'Grid'
      },
      phases: [
        {
          id: 'frame',
          eyebrow: '01 · Frame',
          title: 'Frame',
          verb: 'Define the board',
          body:
            'Set the outer boundary of the work. Before agents can optimize anything, the system needs a real shape.',
          command: 'vc-scaffold my-project',
          note: 'Boundary first. Work without a frame becomes drift.',
          fill: 0.08,
          tone: 'copper'
        },
        {
          id: 'perceive',
          eyebrow: '02 · Perceive',
          title: 'Perceive',
          verb: 'Load repo truth',
          body:
            'Loctree, AICX, and history establish what is actually true before the first implementation throw.',
          command: 'vibecrafted init codex',
          note: 'Perception beats memory. Ground truth beats intuition.',
          fill: 0.22,
          tone: 'teal'
        },
        {
          id: 'work',
          eyebrow: '03 · Work',
          title: 'Work',
          verb: 'Send specialists',
          body:
            'Specialist force enters the board. Research, implementation, review, and runtime capture start filling real slots.',
          command: 'vibecrafted workflow claude --prompt "Plan and implement auth"',
          note: 'Throughput is useful only when every throw has a slot.',
          fill: 0.42,
          tone: 'steel'
        },
        {
          id: 'converge',
          eyebrow: '04 · Converge',
          title: 'Converge',
          verb: 'Reduce entropy',
          body:
            'Follow-up, Marbles, and DoU expose weak fits. The board keeps looping until blockers are visible and reducible.',
          command: 'vibecrafted marbles codex --prompt "Reduce remaining P0/P1/P2"',
          note: 'The question is not whether it works. The question is what is still wrong.',
          fill: 0.68,
          tone: 'mint'
        },
        {
          id: 'ship',
          eyebrow: '05 · Ship',
          title: 'Ship',
          verb: 'Close the surface',
          body:
            'Decorate, Hydrate, and Release turn a converged repo into a reachable, understandable product surface.',
          command: 'vibecrafted release codex --prompt "Prepare release steps"',
          note: 'Release begins when someone outside the repo can use the thing.',
          fill: 0.9,
          tone: 'mint'
        }
      ],
      operators: {
        loctree: { label: 'Loctree', kind: 'structure' },
        aicx: { label: 'AICX', kind: 'memory' },
        prview: { label: 'PRView', kind: 'review' },
        screenscribe: { label: 'ScreenScribe', kind: 'runtime' },
        agents: { label: 'Agents', kind: 'execution' },
        marbles: { label: 'Marbles', kind: 'convergence' }
      },
      status: {
        ready: 'board awaiting first throw',
        phase: 'phase changed',
        spawned: 'operators entered open grooves',
        convergence: 'convergence loop running',
        thrown: 'manual throw placed on the board',
        reset: 'loop reset'
      }
    },
    pl: {
      top: {
        brand: 'Vibecrafted.',
        center: 'Framework — gra',
        fig: 'FIG. 06 · GAME VC-006',
        mode: 'Tryb nauki'
      },
      hero: {
        kicker: '§ 06 · Pętla frameworka',
        title: 'Zrozum pętlę, kształtując planszę.',
        lead:
          'Ustaw ramę, załaduj prawdę o repo, wpuść operatorów w sloty i zobacz, jak słabe dopasowania odpadają przed releasem.',
        foot: 'Pięć faz. Sześć operatorów. Jedna plansza.'
      },
      board: {
        shape: 'Kształt planszy',
        density: 'Gęstość rowków',
        operators: 'Operatorzy',
        precision: 'Precyzja',
        spawn: 'Wpuść operatorów',
        converge: 'Uruchom konwergencję',
        next: 'Następna faza',
        reset: 'Reset pętli',
        command: 'Komenda',
        convergence: 'Konwergencja',
        grooves: 'Rowki',
        marbles: 'Kulki',
        signal: 'Sygnał',
        teaching: 'Powierzchnia nauki — nie output produkcyjny.',
        pickShape: 'Wybierz kształt',
        runHint: 'obserwuję konwergencję...'
      },
      shapes: {
        ring: 'Ring',
        oval: 'Oval',
        grid: 'Grid'
      },
      phases: [
        {
          id: 'frame',
          eyebrow: '01 · Frame',
          title: 'Frame',
          verb: 'Zdefiniuj planszę',
          body:
            'Ustaw zewnętrzną granicę pracy. Zanim agenci zaczną optymalizować, system potrzebuje realnego kształtu.',
          command: 'vc-scaffold my-project',
          note: 'Najpierw granica. Praca bez ramy szybko zamienia się w drift.',
          fill: 0.08,
          tone: 'copper'
        },
        {
          id: 'perceive',
          eyebrow: '02 · Perceive',
          title: 'Perceive',
          verb: 'Załaduj prawdę repo',
          body:
            'Loctree, AICX i historia ustalają, co naprawdę jest prawdą, zanim ruszy pierwszy throw implementacyjny.',
          command: 'vibecrafted init codex',
          note: 'Percepcja bije pamięć. Ground truth bije intuicję.',
          fill: 0.22,
          tone: 'teal'
        },
        {
          id: 'work',
          eyebrow: '03 · Work',
          title: 'Work',
          verb: 'Wpuść specjalistów',
          body:
            'Siła specjalistów wchodzi na planszę. Research, implementacja, review i runtime capture zaczynają wypełniać realne sloty.',
          command: 'vibecrafted workflow claude --prompt "Zaplanuj i zaimplementuj auth"',
          note: 'Przepustowość ma sens tylko wtedy, gdy każdy throw ma swój slot.',
          fill: 0.42,
          tone: 'steel'
        },
        {
          id: 'converge',
          eyebrow: '04 · Converge',
          title: 'Converge',
          verb: 'Zmniejsz entropię',
          body:
            'Follow-up, Marbles i DoU ujawniają słabe dopasowania. Plansza zapętla pracę, aż blokery są widoczne i redukowalne.',
          command: 'vibecrafted marbles codex --prompt "Reduce remaining P0/P1/P2"',
          note: 'Pytanie nie brzmi, czy działa. Pytanie brzmi, co nadal jest źle.',
          fill: 0.68,
          tone: 'mint'
        },
        {
          id: 'ship',
          eyebrow: '05 · Ship',
          title: 'Ship',
          verb: 'Domknij surface',
          body:
            'Decorate, Hydrate i Release zamieniają domknięte repo w zrozumiałą, dostępną powierzchnię produktu.',
          command: 'vibecrafted release codex --prompt "Prepare release steps"',
          note: 'Release zaczyna się wtedy, gdy ktoś spoza repo może z tego skorzystać.',
          fill: 0.9,
          tone: 'mint'
        }
      ],
      operators: {
        loctree: { label: 'Loctree', kind: 'struktura' },
        aicx: { label: 'AICX', kind: 'pamięć' },
        prview: { label: 'PRView', kind: 'review' },
        screenscribe: { label: 'ScreenScribe', kind: 'runtime' },
        agents: { label: 'Agents', kind: 'wykonanie' },
        marbles: { label: 'Marbles', kind: 'konwergencja' }
      },
      status: {
        ready: 'plansza czeka na pierwszy throw',
        phase: 'faza zmieniona',
        spawned: 'operatorzy weszli w otwarte rowki',
        convergence: 'pętla konwergencji uruchomiona',
        thrown: 'manualny throw trafił na planszę',
        reset: 'pętla zresetowana'
      }
    }
  };

  const OPERATORS: OperatorId[] = ['loctree', 'aicx', 'prview', 'screenscribe', 'agents', 'marbles'];
  const MARBLE_COLORS: Record<MarbleTone, { base: string; light: string }> = {
    teal: { base: '#3d7a72', light: '#a6c5bc' },
    steel: { base: '#c8c2b4', light: '#e5ded2' },
    copper: { base: '#cf6f4e', light: '#e5b18e' },
    mint: { base: '#a6c5bc', light: '#d0e0d8' },
    danger: { base: '#d85a4f', light: '#ffb0a8' }
  };

  let { lang = 'en' } = $props<{ lang?: Lang }>();

  let canvasEl: HTMLCanvasElement | undefined;
  let boardEl: HTMLDivElement | undefined;
  let context: CanvasRenderingContext2D | null = null;
  let frameHandle = 0;
  let lastFrame = 0;
  let waveDelay = 0;
  let waveCount = 0;
  let reduceMotion = false;
  let dpr = 1;
  let width = 0;
  let height = 0;
  let resizeObserver: ResizeObserver | undefined;

  let activeIndex = $state(0);
  let shape = $state<BoardShape>('ring');
  let density = $state(2);
  let operatorCount = $state(6);
  let precision = $state(72);
  let running = $state(false);
  let convergence = $state(0);
  let grooveCount = $state(0);
  let marbleCount = $state(0);
  let statusLine = $state('');

  let slots: Slot[] = [];
  let marbles: Marble[] = [];
  let pings: Ping[] = [];

  const locale = $derived(lang === 'pl' ? 'pl' : 'en');
  const copy = $derived(COPY[locale]);
  const activePhase = $derived(copy.phases[activeIndex] ?? copy.phases[0]);
  const activePercent = $derived(`${Math.round((activePhase.fill + precision / 350) * 100)}%`);

  function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(max, value));
  }

  function seeded(seed: number) {
    let value = seed + 0x6d2b79f5;
    return () => {
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
  }

  function slotSeed() {
    return activeIndex * 2000 + density * 211 + precision * 17 + shape.length * 47;
  }

  function makeSlots(): Slot[] {
    const list: Slot[] = [];
    const rand = seeded(slotSeed());
    const base = density === 1 ? 5 : density === 2 ? 7 : 9;

    if (shape === 'ring') {
      const rings = density === 1 ? [0.32, 0.58, 0.84] : density === 2 ? [0.24, 0.45, 0.66, 0.86] : [0.18, 0.34, 0.5, 0.66, 0.84];
      rings.forEach((radius, ringIndex) => {
        const count = Math.max(6, Math.round(base * radius * 4.4));
        for (let i = 0; i < count; i += 1) {
          const angle = (Math.PI * 2 * i) / count + ringIndex * 0.22;
          list.push({
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            filled: false,
            blocked: false,
            order: list.length
          });
        }
      });
    } else if (shape === 'oval') {
      for (let row = -base; row <= base; row += 1) {
        for (let col = -base; col <= base; col += 1) {
          const x = col / base;
          const y = row / base;
          if (x * x + y * y * 1.85 <= 1) {
            list.push({
              x: x * 0.92,
              y: y * 0.72,
              filled: false,
              blocked: false,
              order: list.length
            });
          }
        }
      }
    } else {
      const limit = base - 1;
      for (let row = -limit; row <= limit; row += 2) {
        for (let col = -limit; col <= limit; col += 2) {
          const jitter = density === 3 ? 0.015 : 0;
          list.push({
            x: col / limit + (rand() - 0.5) * jitter,
            y: row / limit + (rand() - 0.5) * jitter,
            filled: false,
            blocked: false,
            order: list.length
          });
        }
      }
    }

    return list.sort((a, b) => Math.hypot(a.x, a.y) - Math.hypot(b.x, b.y)).map((slot, order) => ({
      ...slot,
      order
    }));
  }

  function boardRadii() {
    if (shape === 'ring') {
      const r = Math.min(width, height) * 0.42;
      return { rx: r, ry: r };
    }
    if (shape === 'oval') {
      return { rx: width * 0.4, ry: height * 0.28 };
    }
    return { rx: width * 0.4, ry: height * 0.32 };
  }

  function mapSlot(slot: { x: number; y: number }) {
    const cx = width / 2;
    const cy = height / 2;
    const { rx, ry } = boardRadii();
    return {
      x: cx + slot.x * rx,
      y: cy + slot.y * ry
    };
  }

  function pickOpenSlot(rand = Math.random) {
    const open = slots.filter((slot) => !slot.filled && !slot.blocked);
    if (!open.length) return null;
    return open[Math.floor(rand() * open.length)] ?? open[0];
  }

  function maxSeededMarbles() {
    if (activePhase.id === 'frame') return 5;
    if (activePhase.id === 'perceive') return 8;
    if (activePhase.id === 'work') return 14;
    if (activePhase.id === 'converge') return 20;
    return 24;
  }

  function createMarble(slot: Slot, tone: MarbleTone, settled = false, chaos = 1): Marble {
    const target = mapSlot(slot);
    const cx = width / 2;
    const cy = height / 2;
    const { rx, ry } = boardRadii();
    const innerScale = 0.55 + chaos * 0.3;
    const angle = Math.random() * Math.PI * 2;
    const startX = settled
      ? target.x
      : cx + Math.cos(angle) * rx * innerScale;
    const startY = settled
      ? target.y
      : cy + Math.sin(angle) * ry * innerScale;
    const dx = target.x - startX;
    const dy = target.y - startY;
    const dist = Math.hypot(dx, dy) || 1;
    const speed = settled ? 0 : Math.min(5, dist * 0.05);
    const noise = settled ? 0 : 0.5;
    return {
      x: startX,
      y: startY,
      tx: target.x,
      ty: target.y,
      vx: (dx / dist) * speed + (Math.random() - 0.5) * noise,
      vy: (dy / dist) * speed + (Math.random() - 0.5) * noise,
      tone,
      alpha: 1,
      settled,
      slot,
      seed: Math.floor(Math.random() * 99999)
    };
  }

  function addBlocker(rand: () => number) {
    const slot = pickOpenSlot(rand);
    if (!slot) return;
    slot.blocked = true;
    const point = mapSlot(slot);
    pings.push({ x: point.x, y: point.y, alpha: 1, danger: true });
  }

  function rebuildBoard(seedMarbles = true) {
    slots = makeSlots();
    marbles = [];
    pings = [];

    if (seedMarbles) {
      const rand = seeded(slotSeed() + 991);
      const precisionBoost = activePhase.id === 'frame' ? 0 : precision / 520;
      const targetFill = clamp(activePhase.fill + precisionBoost, 0.04, 0.94);
      const total = Math.min(maxSeededMarbles(), Math.max(1, Math.floor(slots.length * targetFill)));
      const palette: MarbleTone[] = activeIndex < 2 ? ['teal', 'steel'] : activeIndex === 2 ? ['teal', 'steel', 'copper'] : ['teal', 'steel', 'copper', 'mint'];

      for (let i = 0; i < total; i += 1) {
        const slot = pickOpenSlot(rand);
        if (!slot) break;
        slot.filled = true;
        marbles.push(createMarble(slot, palette[i % palette.length] ?? activePhase.tone, true));
      }

      if (activePhase.id === 'converge') {
        addBlocker(rand);
        addBlocker(rand);
      }
    }

    updateReadouts();
    drawBoard();
  }

  function updateReadouts() {
    const fillable = Math.max(1, slots.filter((slot) => !slot.blocked).length);
    const filled = slots.filter((slot) => slot.filled).length;
    grooveCount = slots.length;
    marbleCount = marbles.filter((marble) => marble.alpha > 0.05).length;
    convergence = Math.round((filled / fillable) * 100);
  }

  function setPhase(index: number) {
    activeIndex = clamp(index, 0, copy.phases.length - 1);
    running = false;
    statusLine = `${activePhase.title}: ${copy.status.phase}`;
    rebuildBoard(true);
  }

  function nextPhase() {
    setPhase((activeIndex + 1) % copy.phases.length);
  }

  function resetLoop() {
    activeIndex = 0;
    running = false;
    statusLine = copy.status.reset;
    rebuildBoard(true);
  }

  function setShape(next: BoardShape) {
    shape = next;
    rebuildBoard(true);
  }

  function setDensity(next: number) {
    density = clamp(next, 1, 3);
    rebuildBoard(true);
  }

  function setOperators(event: Event) {
    operatorCount = Number((event.target as HTMLInputElement).value);
  }

  function setPrecision(event: Event) {
    precision = Number((event.target as HTMLInputElement).value);
    rebuildBoard(true);
  }

  function spawnBatch(count = operatorCount, tone: MarbleTone = activePhase.tone) {
    if (!width || !height) return;
    const rand = seeded(Date.now() % 100000);
    const room = Math.max(0, maxSeededMarbles() + operatorCount - marbles.length);
    for (let i = 0; i < Math.min(count, room); i += 1) {
      const slot = pickOpenSlot(rand);
      if (!slot) break;
      marbles.push(createMarble(slot, tone, false, activePhase.id === 'converge' ? 0.7 : 1));
    }
    statusLine = copy.status.spawned;
    updateReadouts();
    startLoop();
  }

  function spawnOperators() {
    if (activeIndex < 2) setPhase(2);
    spawnBatch(operatorCount, 'teal');
  }

  function runConvergence() {
    if (activeIndex < 3) setPhase(3);
    running = true;
    waveCount = 4;
    waveDelay = 0;
    statusLine = copy.status.convergence;
    startLoop();
  }

  function pickNearestOpenSlot(localX: number, localY: number) {
    let best: Slot | null = null;
    let bestDist = Infinity;
    for (const slot of slots) {
      if (slot.filled || slot.blocked) continue;
      const point = mapSlot(slot);
      const d = Math.hypot(point.x - localX, point.y - localY);
      if (d < bestDist) {
        bestDist = d;
        best = slot;
      }
    }
    return best;
  }

  function throwAt(localX: number, localY: number) {
    const slot = pickNearestOpenSlot(localX, localY);
    if (!slot) return;
    const target = mapSlot(slot);
    const dx = target.x - localX;
    const dy = target.y - localY;
    const dist = Math.hypot(dx, dy) || 1;
    const speed = Math.min(14, dist * 0.18);
    marbles.push({
      x: localX,
      y: localY,
      tx: target.x,
      ty: target.y,
      vx: (dx / dist) * speed,
      vy: (dy / dist) * speed,
      tone: activePhase.tone,
      alpha: 1,
      settled: false,
      slot,
      seed: Math.floor(Math.random() * 99999)
    });
    statusLine = copy.status.thrown;
    startLoop();
  }

  function handleBoardPointer(event: PointerEvent) {
    if (!boardEl) return;
    const rect = boardEl.getBoundingClientRect();
    throwAt(event.clientX - rect.left, event.clientY - rect.top);
  }

  function updateMarble(marble: Marble, dt: number) {
    if (marble.settled) return;
    const dx = marble.tx - marble.x;
    const dy = marble.ty - marble.y;
    const distance = Math.hypot(dx, dy);

    const pull = distance > 40 ? 0.015 : 0.04;
    marble.vx += dx * pull * dt;
    marble.vy += dy * pull * dt;

    const damping = Math.pow(0.88, dt);
    marble.vx *= damping;
    marble.vy *= damping;

    marble.x += marble.vx * dt;
    marble.y += marble.vy * dt;

    const speed = Math.hypot(marble.vx, marble.vy);
    if (distance < 2.6 && speed < 0.85) {
      marble.settled = true;
      marble.x = marble.tx;
      marble.y = marble.ty;
      if (marble.slot) marble.slot.filled = true;
      pings.push({ x: marble.x, y: marble.y, alpha: 1 });
    }
  }

  function tick(now: number) {
    const dt = reduceMotion ? 0.8 : clamp((now - lastFrame) / 16.67, 0.4, 2);
    lastFrame = now;

    marbles.forEach((marble) => updateMarble(marble, dt));
    pings = pings.map((ping) => ({ ...ping, alpha: ping.alpha - 0.05 * dt })).filter((ping) => ping.alpha > 0);

    if (running) {
      waveDelay -= 16.67 * dt;
      if (waveDelay <= 0 && waveCount > 0) {
        spawnBatch(Math.max(2, Math.ceil(operatorCount / 2)), waveCount % 2 ? 'mint' : 'steel');
        waveCount -= 1;
        waveDelay = 520;
      }
      if (waveCount <= 0 && marbles.every((marble) => marble.settled)) {
        running = false;
      }
    }

    updateReadouts();
    drawBoard();

    const moving = marbles.some((marble) => !marble.settled) || pings.length > 0 || running;
    if (moving) {
      frameHandle = window.requestAnimationFrame(tick);
    } else {
      frameHandle = 0;
    }
  }

  function startLoop() {
    if (frameHandle || typeof window === 'undefined') return;
    lastFrame = performance.now();
    frameHandle = window.requestAnimationFrame(tick);
  }

  function resizeCanvas() {
    if (!canvasEl || !boardEl) return;
    const rect = boardEl.getBoundingClientRect();
    width = Math.max(320, rect.width);
    height = Math.max(320, rect.height);
    dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    canvasEl.width = Math.round(width * dpr);
    canvasEl.height = Math.round(height * dpr);
    canvasEl.style.width = `${width}px`;
    canvasEl.style.height = `${height}px`;
    context = canvasEl.getContext('2d');
    context?.setTransform(dpr, 0, 0, dpr, 0, 0);
    rebuildBoard(true);
  }

  function drawBoardFrame(ctx: CanvasRenderingContext2D) {
    const cx = width / 2;
    const cy = height / 2;
    const { rx, ry } = boardRadii();
    ctx.save();
    ctx.translate(cx, cy);
    ctx.strokeStyle = 'rgba(245, 244, 239, 0.10)';
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
    if (shape === 'grid') {
      ctx.strokeRect(-rx, -ry, rx * 2, ry * 2);
    } else {
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawSlot(ctx: CanvasRenderingContext2D, slot: Slot) {
    const point = mapSlot(slot);
    if (slot.blocked) {
      const radius = Math.max(5, Math.min(width, height) * 0.018);
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(216, 90, 79, 0.55)';
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(point.x - 5, point.y - 5);
      ctx.lineTo(point.x + 5, point.y + 5);
      ctx.moveTo(point.x + 5, point.y - 5);
      ctx.lineTo(point.x - 5, point.y + 5);
      ctx.strokeStyle = 'rgba(255, 176, 168, 0.7)';
      ctx.stroke();
      return;
    }
    if (slot.filled) return;
    /*
     * Empty slot bedding — visible dimple where a marble can settle.
     * Drawn for every open slot so the player sees the goal shape
     * before the first throw. Filled slots are covered by the marble.
     */
    const radius = Math.max(4, Math.min(width, height) * 0.014);
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(245, 244, 239, 0.22)';
    ctx.lineWidth = 1;
    ctx.setLineDash([1.5, 2]);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  function drawMarble(ctx: CanvasRenderingContext2D, marble: Marble) {
    const palette = MARBLE_COLORS[marble.tone];
    const radius = Math.max(8, Math.min(width, height) * 0.032);

    ctx.save();
    ctx.beginPath();
    ctx.ellipse(marble.x + radius * 0.05, marble.y + radius * 0.85, radius * 0.62, radius * 0.18, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.32)';
    ctx.fill();
    ctx.restore();

    const sphere = ctx.createRadialGradient(
      marble.x - radius * 0.32,
      marble.y - radius * 0.4,
      radius * 0.08,
      marble.x + radius * 0.05,
      marble.y + radius * 0.1,
      radius * 1.05
    );
    sphere.addColorStop(0, palette.light);
    sphere.addColorStop(0.32, palette.base);
    sphere.addColorStop(0.78, palette.base);
    sphere.addColorStop(1, 'rgba(4, 5, 5, 0.85)');

    ctx.beginPath();
    ctx.arc(marble.x, marble.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = sphere;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(marble.x - radius * 0.36, marble.y - radius * 0.42, radius * 0.22, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(marble.x, marble.y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(245, 244, 239, 0.16)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  function drawPings(ctx: CanvasRenderingContext2D) {
    pings.forEach((ping) => {
      ctx.beginPath();
      ctx.arc(ping.x, ping.y, (1 - ping.alpha) * 22 + 4, 0, Math.PI * 2);
      ctx.strokeStyle = ping.danger ? `rgba(216, 90, 79, ${ping.alpha * 0.5})` : `rgba(166, 197, 188, ${ping.alpha * 0.32})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    });
  }

  function drawBoard() {
    if (!context || !width || !height) return;
    const ctx = context;
    ctx.clearRect(0, 0, width, height);
    drawBoardFrame(ctx);
    slots.forEach((slot) => drawSlot(ctx, slot));
    drawPings(ctx);
    marbles.forEach((marble) => drawMarble(ctx, marble));
  }

  onMount(() => {
    statusLine = copy.status.ready;
    reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (boardEl) {
      resizeObserver = new ResizeObserver(resizeCanvas);
      resizeObserver.observe(boardEl);
    }
    resizeCanvas();
  });

  onDestroy(() => {
    resizeObserver?.disconnect();
    if (frameHandle) window.cancelAnimationFrame(frameHandle);
  });
</script>

<section class="game" aria-labelledby="framework-game-title">
  <div class="game__chrome">
    <span class="game__chrome-brand" aria-hidden="true">𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍<i>.</i></span>
    <span class="game__chrome-center">{copy.top.center}</span>
    <span class="game__chrome-fig">{copy.top.fig}</span>
  </div>

  <div class="game__grid">
    <aside class="phase-rail" aria-label="Framework phases">
      {#each copy.phases as phase, index}
        <button
          type="button"
          class={['phase-card', activeIndex === index && 'phase-card--active']}
          onclick={() => setPhase(index)}
          aria-current={activeIndex === index ? 'step' : undefined}
        >
          <span class="phase-card__num">{String(index + 1).padStart(2, '0')}</span>
          <span class="phase-card__kicker">{phase.title}</span>
          <strong>{phase.verb}</strong>
          <span>{phase.body}</span>
        </button>
      {/each}
    </aside>

    <main class="stage">
      <div class="stage__intro">
        <p class="stage__kicker">{copy.hero.kicker}</p>
        <h1 id="framework-game-title">{copy.hero.title}</h1>
        <p>{copy.hero.lead}</p>
      </div>

      <div class="board-wrap">
        <div
          class="board"
          bind:this={boardEl}
          role="img"
          aria-label={`${activePhase.title}: ${convergence}% ${copy.board.convergence}`}
          onpointerdown={handleBoardPointer}
        >
          <canvas bind:this={canvasEl} class="board__canvas"></canvas>
          <div class="board__hud board__hud--left">
            <span>{activePhase.eyebrow}</span>
            <b>{activePhase.title}</b>
          </div>
          <div class="board__hud board__hud--right">
            <span>{copy.board.signal}</span>
            <b>{statusLine || copy.status.ready}</b>
          </div>
        </div>

        <div class="metrics" aria-label="Board readout">
          <div>
            <span>{copy.board.convergence}</span>
            <strong>{convergence}%</strong>
          </div>
          <div>
            <span>{copy.board.grooves}</span>
            <strong>{grooveCount}</strong>
          </div>
          <div>
            <span>{copy.board.marbles}</span>
            <strong>{marbleCount}</strong>
          </div>
        </div>
      </div>

      <div class="command">
        <span>{copy.board.command}</span>
        <code>$ {activePhase.command}</code>
      </div>
    </main>

    <aside class="control-panel" aria-label="Board controls">
      <div class="converge-badge" aria-hidden="true">
        <svg viewBox="0 0 120 120" class="converge-badge__ring">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            stroke-dasharray="2 4"
          />
        </svg>
        <span class="converge-badge__value">{convergence}%</span>
        <span class="converge-badge__label">{copy.board.convergence}</span>
      </div>

      <div class="control-panel__top">
        <span class="mode-dot"></span>
        <span>{copy.top.mode}</span>
      </div>

      <section class="control-group">
        <p>{copy.board.pickShape}</p>
        <div class="shape-grid">
          {#each (Object.keys(copy.shapes) as BoardShape[]) as shapeKey}
            <button
              type="button"
              class={['shape-button', shape === shapeKey && 'shape-button--active']}
              onclick={() => setShape(shapeKey)}
            >
              <span class={['shape-icon', `shape-icon--${shapeKey}`]}></span>
              {copy.shapes[shapeKey]}
            </button>
          {/each}
        </div>
      </section>

      <section class="control-group">
        <label>
          <span>{copy.board.density}</span>
          <select bind:value={density} onchange={() => setDensity(density)}>
            <option value={1}>Low</option>
            <option value={2}>Medium</option>
            <option value={3}>High</option>
          </select>
        </label>
        <label>
          <span>{copy.board.operators}</span>
          <input type="range" min="2" max="9" bind:value={operatorCount} oninput={setOperators} />
          <b>{operatorCount}</b>
        </label>
        <label>
          <span>{copy.board.precision}</span>
          <input type="range" min="35" max="92" bind:value={precision} oninput={setPrecision} />
          <b>{precision}%</b>
        </label>
      </section>

      <section class="operator-strip" aria-label="Operators">
        {#each OPERATORS as operator}
          <div class="operator-row">
            <span>{copy.operators[operator].label}</span>
            <em>{copy.operators[operator].kind}</em>
          </div>
        {/each}
      </section>

      <div class="actions">
        <button type="button" class="action action--spawn" onclick={spawnOperators}>
          {copy.board.spawn}
        </button>
        <button type="button" class="action action--converge" onclick={runConvergence}>
          {running ? copy.board.runHint : copy.board.converge}
        </button>
        <div class="actions__secondary">
          <button type="button" onclick={nextPhase}>{copy.board.next} →</button>
          <button type="button" onclick={resetLoop}>{copy.board.reset}</button>
        </div>
      </div>

      <p class="phase-note">
        <strong>{activePhase.verb}</strong>
        {activePhase.note}
      </p>
    </aside>
  </div>

  <p class="game__footer">{copy.hero.foot} · {copy.board.teaching}</p>
</section>

<style>
  .game {
    --ink: var(--v2-ink, #080807);
    --ink-deep: #050504;
    --paper: var(--v2-fg-on-dark, #f5f4ef);
    --muted: var(--v2-fg-muted, rgba(245, 244, 239, 0.62));
    --dim: rgba(245, 244, 239, 0.36);
    --rule: rgba(245, 244, 239, 0.1);
    --rule-soft: rgba(245, 244, 239, 0.06);
    --rule-strong: rgba(245, 244, 239, 0.18);
    --copper: var(--v2-accent, #cf6f4e);
    --teal: var(--v2-accent-2, #3d7a72);
    --mint: #a6c5bc;
    min-height: calc(100vh - 72px);
    height: calc(100vh - 72px);
    color: var(--paper);
    /*
     * Atmospheric backdrop: radial light pool centred on the board,
     * fading to deep ink at the edges. A subtle dot field replaces the
     * old linear grid for less "dashboard overlay", more depth.
     */
    background:
      radial-gradient(
        ellipse 70% 60% at 50% 38%,
        rgba(245, 244, 239, 0.045) 0%,
        rgba(245, 244, 239, 0.018) 38%,
        transparent 72%
      ),
      radial-gradient(circle, rgba(245, 244, 239, 0.05) 1px, transparent 1.5px) 0 0 / 28px 28px,
      radial-gradient(ellipse 100% 80% at 50% 50%, var(--ink) 30%, var(--ink-deep) 100%);
    padding: 18px 32px 18px;
    font-family: var(--v2-font-body, Inter, system-ui, sans-serif);
    overflow: auto;
    scrollbar-gutter: stable;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .game__chrome {
    position: relative;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 24px;
    align-items: baseline;
    flex: 0 0 auto;
    padding-bottom: 14px;
    border-bottom: 1px solid var(--rule);
    font-family: var(--v2-font-mono, "JetBrains Mono", monospace);
    font-size: 12px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .game__chrome-brand {
    justify-self: start;
    font-family: var(--v2-font-display, "Instrument Serif", serif);
    font-size: 18px;
    letter-spacing: 0;
    text-transform: none;
    color: var(--paper);
  }

  .game__chrome-brand i {
    font-style: italic;
    color: var(--copper);
  }

  .game__chrome-center {
    justify-self: center;
  }

  .game__chrome-fig {
    justify-self: end;
  }

  .game__grid {
    display: grid;
    grid-template-columns: minmax(220px, 280px) minmax(560px, 1fr) minmax(260px, 320px);
    gap: 32px;
    min-height: 0;
    flex: 1 1 auto;
  }

  .phase-rail {
    min-height: 0;
    overflow: auto;
    padding: 6px 0 10px 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  /*
   * Phase cards: subtle list, not a stack of cards. The active phase
   * carries the typographic weight via a left accent rule + serif size,
   * not a heavy bordered box.
   */
  .phase-card {
    display: grid;
    grid-template-columns: 36px 1fr;
    gap: 4px 14px;
    width: 100%;
    padding: 14px 10px 14px 12px;
    border: 0;
    border-left: 1px solid var(--rule-soft);
    border-radius: 0;
    background: transparent;
    color: var(--dim);
    text-align: left;
    transition:
      border-color 220ms ease,
      color 220ms ease,
      transform 220ms ease;
  }

  .phase-card:hover {
    color: var(--muted);
    border-left-color: var(--rule-strong);
  }

  .phase-card--active {
    color: var(--paper);
    border-left-color: var(--copper);
    transform: translateX(2px);
  }

  .phase-card__num {
    grid-row: span 3;
    font-family: var(--v2-font-mono, "JetBrains Mono", monospace);
    font-size: 11px;
    letter-spacing: 0.18em;
    color: var(--dim);
    align-self: start;
    padding-top: 8px;
  }

  .phase-card--active .phase-card__num {
    color: var(--copper);
  }

  .phase-card__kicker {
    font-family: var(--v2-font-mono, "JetBrains Mono", monospace);
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--dim);
  }

  .phase-card--active .phase-card__kicker {
    color: var(--copper);
  }

  .phase-card strong {
    font-family: var(--v2-font-display, "Instrument Serif", serif);
    font-size: 22px;
    font-weight: 400;
    color: inherit;
    line-height: 1.05;
  }

  .phase-card--active strong {
    font-size: clamp(28px, 3vw, 36px);
    font-style: italic;
    color: var(--paper);
  }

  .phase-card span:last-child {
    font-size: 12px;
    line-height: 1.4;
    color: var(--dim);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .phase-card--active span:last-child {
    color: var(--muted);
  }

  .stage {
    min-height: 0;
    padding: 10px 0 0;
    display: grid;
    grid-template-rows: auto 1fr auto;
    align-content: start;
    gap: 18px;
    min-width: 0;
  }

  /*
   * Stage intro is now a quiet caption above the board, not a competing
   * hero. The narrative moment lives on the active phase-card to the
   * left; this row carries only the section title for context + SEO.
   */
  .stage__intro {
    max-width: 920px;
    width: 100%;
    margin: 0 auto;
    text-align: left;
    padding: 0 4px;
  }

  .stage__kicker {
    margin: 0 0 4px;
    font-family: var(--v2-font-mono, "JetBrains Mono", monospace);
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--copper);
  }

  .stage h1 {
    margin: 0;
    font-family: var(--v2-font-display, "Instrument Serif", serif);
    font-size: clamp(20px, 2.2vw, 26px);
    line-height: 1.15;
    font-weight: 400;
    letter-spacing: 0;
    color: var(--muted);
  }

  .stage__intro > p:last-child {
    margin: 4px 0 0;
    max-width: 640px;
    color: var(--dim);
    font-size: 12px;
    letter-spacing: 0.04em;
    line-height: 1.45;
  }

  .board-wrap {
    min-height: 0;
    align-self: stretch;
    display: grid;
    grid-template-rows: 1fr auto;
    gap: 14px;
    align-content: stretch;
    max-width: 1040px;
    width: 100%;
    margin: 0 auto;
  }

  /*
   * Board: hairline frame, ink fill, with a visible dot field acting as
   * the marble bedding. The dots show through to make slot positions
   * legible without canvas drawing them — same role as the old grooves
   * the operator was missing after the radial backdrop landed.
   */
  .board {
    position: relative;
    height: 100%;
    min-height: clamp(320px, 44vh, 520px);
    border-radius: 2px;
    border: 1px solid var(--rule);
    background:
      radial-gradient(
        ellipse 70% 60% at 50% 50%,
        rgba(245, 244, 239, 0.03) 0%,
        rgba(2, 4, 5, 0) 68%
      ),
      rgba(2, 4, 5, 0.42);
    box-shadow:
      inset 0 0 36px rgba(0, 0, 0, 0.5),
      inset 0 0 0 1px rgba(245, 244, 239, 0.02);
    overflow: hidden;
    cursor: crosshair;
  }

  .board__canvas {
    width: 100%;
    height: 100%;
  }

  .board__hud {
    position: absolute;
    top: 20px;
    display: grid;
    gap: 6px;
    font-family: var(--v2-font-mono, "JetBrains Mono", monospace);
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--dim);
    pointer-events: none;
  }

  .board__hud b {
    color: var(--paper);
    font-weight: 500;
    font-size: 11px;
    letter-spacing: 0.18em;
  }

  .board__hud--left {
    left: 24px;
  }

  .board__hud--right {
    right: 24px;
    text-align: right;
    max-width: 240px;
  }

  /*
   * Metrics: a quiet readout strip — no box, no fill. Hairline above
   * the row separates it from the board without re-introducing a card.
   */
  .metrics {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    padding: 12px 4px 2px;
    border-top: 1px solid var(--rule-soft);
  }

  .metrics div {
    padding: 0 16px;
    border-right: 1px solid var(--rule-soft);
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .metrics div:first-child {
    padding-left: 0;
  }

  .metrics div:last-child {
    border-right: 0;
  }

  .metrics span {
    font-family: var(--v2-font-mono, "JetBrains Mono", monospace);
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--dim);
  }

  .metrics strong {
    font-family: var(--v2-font-display, "Instrument Serif", serif);
    font-size: clamp(22px, 2.2vw, 28px);
    font-weight: 400;
    color: var(--mint);
    line-height: 1;
  }

  /*
   * Command line: terminal-style readout, no panel chrome. A single
   * hairline above keeps it tied to the board without boxing it in.
   */
  .command {
    max-width: 1040px;
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 16px;
    align-items: baseline;
    padding: 10px 4px 4px;
    border-top: 1px solid var(--rule-soft);
  }

  .command span {
    font-family: var(--v2-font-mono, "JetBrains Mono", monospace);
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--dim);
  }

  .command code {
    overflow-wrap: anywhere;
    font-family: var(--v2-font-mono, "JetBrains Mono", monospace);
    color: var(--mint);
    font-size: 13px;
  }

  .control-panel {
    min-height: 0;
    overflow: auto;
    padding: 6px 0 10px 4px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  /*
   * Convergence badge: the right column's hero. Round dotted ring
   * houses the live percentage in serif, with a mono kicker beneath.
   * No box, no fill — just light geometry on the ink.
   */
  .converge-badge {
    position: relative;
    align-self: center;
    width: clamp(132px, 12vw, 158px);
    height: clamp(132px, 12vw, 158px);
    display: grid;
    place-items: center;
    color: var(--mint);
    margin: 4px 0 8px;
  }

  .converge-badge__ring {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }

  .converge-badge__value {
    font-family: var(--v2-font-display, "Instrument Serif", serif);
    font-size: clamp(34px, 3.4vw, 44px);
    font-weight: 400;
    line-height: 1;
    color: var(--mint);
    letter-spacing: -0.01em;
  }

  .converge-badge__label {
    position: absolute;
    bottom: 28%;
    font-family: var(--v2-font-mono, "JetBrains Mono", monospace);
    font-size: 9px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--mint);
    opacity: 0.78;
  }

  .control-panel__top {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    font-family: var(--v2-font-mono, "JetBrains Mono", monospace);
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .mode-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--mint);
    box-shadow: 0 0 8px rgba(166, 197, 188, 0.6);
  }

  /*
   * Section blocks inside the right column: hairline top-rule instead
   * of a full bordered card. Reads as scaffolding, not panels.
   */
  .control-group,
  .operator-strip,
  .phase-note {
    padding: 14px 0 4px;
    border-top: 1px solid var(--rule-soft);
  }

  .control-group:first-of-type {
    border-top: 0;
    padding-top: 4px;
  }

  .control-group p,
  .control-group label > span {
    display: block;
    margin: 0 0 12px;
    font-family: var(--v2-font-mono, "JetBrains Mono", monospace);
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .shape-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .shape-button {
    min-height: 58px;
    display: grid;
    place-items: center;
    gap: 8px;
    border-radius: 2px;
    border: 1px solid var(--rule-soft);
    background: transparent;
    color: var(--dim);
    font-family: var(--v2-font-mono, "JetBrains Mono", monospace);
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    transition:
      border-color 180ms ease,
      color 180ms ease;
  }

  .shape-button:hover {
    color: var(--muted);
    border-color: var(--rule-strong);
  }

  .shape-button--active,
  .shape-button--active:hover {
    color: var(--paper);
    border-color: var(--copper);
    background: transparent;
  }

  .shape-icon {
    width: 30px;
    height: 24px;
    border: 2px dotted var(--copper);
    display: block;
  }

  .shape-icon--ring {
    border-radius: 50%;
  }

  .shape-icon--oval {
    border-radius: 999px;
    border-color: var(--dim);
  }

  .shape-icon--grid {
    border: 0;
    background:
      radial-gradient(circle, var(--dim) 2px, transparent 3px) 0 0 / 10px 10px;
  }

  .control-group label {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 10px 14px;
    align-items: center;
    margin-top: 14px;
  }

  .control-group label > span {
    grid-column: 1 / -1;
    margin-bottom: 0;
  }

  .control-group input,
  .control-group select {
    grid-column: 1;
    accent-color: var(--teal);
  }

  .control-group select {
    width: 100%;
    color: var(--paper);
    background: rgba(245, 244, 239, 0.04);
    border: 1px solid var(--rule);
    border-radius: 6px;
    padding: 10px 12px;
  }

  .control-group b {
    font-family: var(--v2-font-mono, "JetBrains Mono", monospace);
    color: var(--paper);
    min-width: 46px;
    text-align: right;
  }

  .operator-strip {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 6px 14px;
  }

  .operator-row {
    display: block;
    padding-bottom: 6px;
    border-bottom: 1px dashed rgba(245, 244, 239, 0.1);
    font-family: var(--v2-font-mono, "JetBrains Mono", monospace);
    font-size: 12px;
    line-height: 1.25;
    color: var(--paper);
  }

  .operator-row:nth-last-child(-n + 2) {
    border-bottom: 0;
    padding-bottom: 0;
  }

  .operator-row em {
    display: block;
    margin-top: 2px;
    color: var(--muted);
    font-size: 10px;
    font-style: italic;
  }

  .actions {
    display: grid;
    gap: 12px;
  }

  .action,
  .actions__secondary button {
    min-height: 44px;
    border-radius: 2px;
    border: 1px solid var(--rule-strong);
    background: transparent;
    color: var(--paper);
    font-family: var(--v2-font-mono, "JetBrains Mono", monospace);
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    transition:
      border-color 180ms ease,
      background 180ms ease,
      color 180ms ease;
  }

  .actions__secondary button {
    border-color: var(--rule);
    color: var(--muted);
  }

  .action:hover,
  .actions__secondary button:hover {
    border-color: var(--paper);
    color: var(--paper);
  }

  .action:focus-visible,
  .actions__secondary button:focus-visible {
    outline: 1px solid var(--paper);
    outline-offset: 2px;
  }

  .action--spawn {
    border-color: rgba(214, 120, 69, 0.82);
    color: var(--copper);
  }

  .action--spawn:hover {
    border-color: var(--copper);
    background: rgba(214, 120, 69, 0.08);
    color: #ffc28d;
  }

  .action--converge {
    border-color: rgba(121, 217, 150, 0.75);
    color: var(--mint);
  }

  .action--converge:hover {
    border-color: var(--mint);
    background: rgba(166, 197, 188, 0.08);
    color: #c5dbd3;
  }

  .actions__secondary {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .phase-note {
    margin: 0;
    color: var(--muted);
    font-size: 12px;
    line-height: 1.55;
  }

  .phase-note strong {
    display: block;
    margin-bottom: 6px;
    color: var(--paper);
    font-family: var(--v2-font-display, "Instrument Serif", serif);
    font-style: italic;
    font-size: 22px;
    font-weight: 400;
    line-height: 1.1;
  }

  .game__footer {
    flex: 0 0 auto;
    margin: 0;
    text-align: center;
    font-family: var(--v2-font-mono, "JetBrains Mono", monospace);
    font-size: 11px;
    letter-spacing: 0.18em;
    color: var(--dim);
  }

  @media (max-width: 1180px) {
    .game {
      height: auto;
      min-height: calc(100vh - 72px);
      overflow: visible;
    }

    .game__grid {
      grid-template-columns: 1fr;
      border: 0;
      min-height: auto;
    }

    .stage {
      min-height: auto;
      grid-template-rows: auto auto auto;
    }

    .board-wrap {
      grid-template-rows: auto auto;
    }

    .board {
      min-height: 360px;
      height: min(52vh, 460px);
    }

    .phase-rail,
    .control-panel {
      padding: 16px 0;
      border-top: 1px solid var(--rule-soft);
    }

    .phase-rail {
      display: grid;
      grid-template-columns: repeat(5, minmax(140px, 1fr));
      overflow-x: auto;
    }

    .phase-card {
      min-width: 150px;
    }

    .control-panel {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }

    .operator-strip,
    .actions,
    .phase-note {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 760px) {
    .game {
      padding: 16px;
    }

    .game__chrome {
      grid-template-columns: 1fr;
      gap: 8px;
    }

    .game__chrome-brand,
    .game__chrome-center,
    .game__chrome-fig {
      justify-self: start;
    }

    .stage h1 {
      font-size: 22px;
    }

    .board {
      min-height: 320px;
      height: 320px;
    }

    .board-wrap {
      grid-template-rows: 320px auto;
    }

    .metrics,
    .command,
    .control-panel {
      grid-template-columns: 1fr;
    }

    .command {
      align-items: start;
    }

    .command code {
      font-size: 12px;
      line-height: 1.45;
    }

    .metrics div {
      border-right: 0;
      border-bottom: 1px solid var(--rule);
    }

    .metrics div:last-child {
      border-bottom: 0;
    }

    .shape-grid,
    .actions__secondary {
      grid-template-columns: 1fr;
    }
  }

  @media (min-width: 1181px) and (max-height: 900px) {
    .game {
      gap: 10px;
      padding-top: 14px;
      padding-bottom: 14px;
    }

    .game__chrome {
      padding-bottom: 10px;
    }

    .game__grid {
      gap: 20px;
      grid-template-columns: minmax(180px, 236px) minmax(500px, 1fr) minmax(250px, 304px);
    }

    .phase-rail {
      gap: 8px;
      padding-top: 14px;
      padding-right: 14px;
    }

    .phase-card {
      grid-template-columns: 38px 1fr;
      min-height: 70px;
      padding: 10px;
    }

    .phase-card__num {
      font-size: 28px;
    }

    .phase-card strong {
      font-size: 20px;
    }

    .phase-card span:last-child {
      display: none;
    }

    .stage {
      gap: 10px;
      padding-top: 14px;
    }

    .stage h1 {
      font-size: clamp(34px, 3.4vw, 42px);
    }

    .stage__intro > p:last-child {
      margin-top: 8px;
      font-size: 14px;
    }

    .board {
      height: clamp(280px, 36vh, 400px);
    }

    .board-wrap {
      gap: 8px;
    }

    .control-panel {
      gap: 12px;
      padding-top: 14px;
      padding-left: 14px;
    }

    .shape-button {
      min-height: 52px;
    }

    .control-group p,
    .control-group label > span {
      margin-bottom: 9px;
    }

    .operator-row {
      font-size: 11px;
    }

    .phase-note {
      display: none;
    }

    .game__footer {
      display: none;
    }
  }
</style>
