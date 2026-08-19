<script lang="ts">
  import { getTranslations, type Lang } from '../lib/i18n';

  // ── Props ──────────────────────────────────────────────────────────
  let { lang = 'en' } = $props<{ lang?: Lang }>();

  // ── Reactive DOM state ─────────────────────────────────────────────
  let marbleCount = $state(0);
  let coveragePct = $state('0%');
  let canvasEl: HTMLCanvasElement | undefined = $state();

  // ── Reduced-motion check (reactive via media query) ────────────────
  let reducedMotion = $state(false);

  // ── i18n labels (derived from prop, no DOM sniffing) ───────────────
  let labels = $derived(getTranslations(lang).sections.marbleCanvas);

  // ═══════════════════════════════════════════════════════════════════
  // MARBLE FACTORY — sprite rendering (pure functions, no reactivity)
  // ═══════════════════════════════════════════════════════════════════

  interface Rgb { r: number; g: number; b: number }
  interface Palette { base: string; accent: string; name: string }

  function hexToRgb(hex: string): Rgb {
    return {
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16),
      b: parseInt(hex.slice(5, 7), 16),
    };
  }

  function rgbStr(c: Rgb, a = 1): string {
    return `rgba(${c.r},${c.g},${c.b},${a})`;
  }

  function lighten(c: Rgb, pct: number): Rgb {
    return { r: Math.min(255, c.r + pct), g: Math.min(255, c.g + pct), b: Math.min(255, c.b + pct) };
  }

  function darken(c: Rgb, pct: number): Rgb {
    return { r: Math.max(0, c.r - pct), g: Math.max(0, c.g - pct), b: Math.max(0, c.b - pct) };
  }

  const PALETTES: Palette[] = [
    { base: '#d97757', accent: '#f4c89a', name: 'amber' },
    { base: '#6a9bcc', accent: '#c2ddf0', name: 'ocean' },
    { base: '#788c5d', accent: '#bdd4a0', name: 'forest' },
    { base: '#b0aea5', accent: '#e8e6dc', name: 'smoke' },
    { base: '#c46b8a', accent: '#f0c4d4', name: 'rose' },
    { base: '#8b7ec8', accent: '#cdc4ef', name: 'amethyst' },
    { base: '#cc8844', accent: '#f0d4a0', name: 'honey' },
    { base: '#5ba3a3', accent: '#a8dede', name: 'teal' },
  ];

  const PATTERNS = ['catseye', 'swirl', 'galaxy', 'clear', 'solid'] as const;

  function mulberry32(seed: number): () => number {
    let a = seed;
    return () => {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function createSprite(radius: number, paletteIdx: number, patternType: string, seed: number): HTMLCanvasElement {
    const pad = 4;
    const s = (radius * 2 + pad) * 2;
    const oc = document.createElement('canvas');
    oc.width = s;
    oc.height = s;
    const g = oc.getContext('2d')!;
    const cx = s / 2, cy = s / 2, r = radius;
    const pal = PALETTES[paletteIdx % PALETTES.length];
    const base = hexToRgb(pal.base);
    const accent = hexToRgb(pal.accent);
    const rng = mulberry32(seed);

    // Shadow
    g.beginPath();
    g.ellipse(cx + r * 0.05, cy + r * 0.82, r * 0.6, r * 0.18, 0, 0, Math.PI * 2);
    g.fillStyle = 'rgba(0,0,0,0.22)';
    g.fill();

    // Base sphere gradient
    g.save();
    g.beginPath();
    g.arc(cx, cy, r, 0, Math.PI * 2);
    g.clip();

    const bg = g.createRadialGradient(cx - r * 0.3, cy - r * 0.35, r * 0.05, cx + r * 0.1, cy + r * 0.1, r * 1.1);
    bg.addColorStop(0, rgbStr(lighten(base, 60), 0.95));
    bg.addColorStop(0.35, rgbStr(base, 0.92));
    bg.addColorStop(0.7, rgbStr(darken(base, 25), 0.9));
    bg.addColorStop(1, rgbStr(darken(base, 55), 0.85));
    g.fillStyle = bg;
    g.fillRect(0, 0, s, s);

    // Pattern layer
    if (patternType === 'catseye') {
      const angle = rng() * Math.PI;
      g.save();
      g.translate(cx, cy);
      g.rotate(angle);
      const ribW = r * 0.22 + rng() * r * 0.15;
      const ribG = g.createLinearGradient(0, -ribW * 1.5, 0, ribW * 1.5);
      ribG.addColorStop(0, 'rgba(255,255,255,0)');
      ribG.addColorStop(0.25, rgbStr(accent, 0.7));
      ribG.addColorStop(0.5, rgbStr(lighten(accent, 40), 0.85));
      ribG.addColorStop(0.75, rgbStr(accent, 0.7));
      ribG.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = ribG;
      g.fillRect(-r * 1.1, -ribW, r * 2.2, ribW * 2);
      g.strokeStyle = rgbStr(lighten(accent, 60), 0.5);
      g.lineWidth = 1;
      g.beginPath();
      g.moveTo(-r * 0.9, 0);
      g.lineTo(r * 0.9, 0);
      g.stroke();
      g.restore();
    } else if (patternType === 'swirl') {
      g.save();
      g.translate(cx, cy);
      let sAngle = rng() * Math.PI * 2;
      for (let si = 0; si < 2; si++) {
        g.beginPath();
        const tw = r * 0.12 + rng() * r * 0.1;
        for (let t = 0; t < Math.PI * 3; t += 0.08) {
          const sr = r * 0.1 + (t / (Math.PI * 3)) * r * 0.85;
          const sx = Math.cos(sAngle + t) * sr;
          const sy = Math.sin(sAngle + t) * sr;
          if (t === 0) g.moveTo(sx, sy); else g.lineTo(sx, sy);
        }
        g.lineWidth = tw;
        const sCol = si === 0 ? accent : lighten(base, 35);
        g.strokeStyle = rgbStr(sCol, 0.55);
        g.lineCap = 'round';
        g.stroke();
        sAngle += Math.PI * 0.7;
      }
      g.restore();
    } else if (patternType === 'galaxy') {
      g.save();
      g.translate(cx, cy);
      const dotCount = 15 + Math.floor(rng() * 20);
      for (let di = 0; di < dotCount; di++) {
        const da = rng() * Math.PI * 2;
        const dd = rng() * r * 0.8;
        const dr = 0.5 + rng() * 2;
        const dc = rng() > 0.5 ? accent : lighten(base, 40);
        g.beginPath();
        g.arc(Math.cos(da) * dd, Math.sin(da) * dd, dr, 0, Math.PI * 2);
        g.fillStyle = rgbStr(dc, 0.4 + rng() * 0.35);
        g.fill();
      }
      const gg = g.createRadialGradient(0, 0, 0, 0, 0, r * 0.4);
      gg.addColorStop(0, rgbStr(accent, 0.25));
      gg.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = gg;
      g.beginPath();
      g.arc(0, 0, r * 0.4, 0, Math.PI * 2);
      g.fill();
      g.restore();
    } else if (patternType === 'clear') {
      g.fillStyle = 'rgba(255,255,255,0.12)';
      g.fillRect(0, 0, s, s);
      const cg = g.createRadialGradient(cx, cy, 0, cx, cy, r * 0.45);
      cg.addColorStop(0, rgbStr(accent, 0.6));
      cg.addColorStop(0.6, rgbStr(base, 0.35));
      cg.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = cg;
      g.beginPath();
      g.arc(cx, cy, r * 0.5, 0, Math.PI * 2);
      g.fill();
    }
    // solid = no extra pattern

    // Glass internal refraction
    const rfl = g.createRadialGradient(cx + r * 0.2, cy + r * 0.35, r * 0.02, cx + r * 0.15, cy + r * 0.3, r * 0.45);
    rfl.addColorStop(0, 'rgba(255,255,255,0.26)');
    rfl.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = rfl;
    g.fillRect(0, 0, s, s);

    // Top specular highlight
    const hl = g.createRadialGradient(cx - r * 0.28, cy - r * 0.32, r * 0.02, cx - r * 0.15, cy - r * 0.2, r * 0.5);
    hl.addColorStop(0, 'rgba(255,255,255,0.98)');
    hl.addColorStop(0.12, 'rgba(255,255,255,0.72)');
    hl.addColorStop(0.34, 'rgba(255,255,255,0.24)');
    hl.addColorStop(0.62, 'rgba(255,255,255,0.08)');
    hl.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = hl;
    g.fillRect(0, 0, s, s);

    // Edge darkening rim
    const rim = g.createRadialGradient(cx, cy, r * 0.75, cx, cy, r);
    rim.addColorStop(0, 'rgba(0,0,0,0)');
    rim.addColorStop(0.8, 'rgba(0,0,0,0.08)');
    rim.addColorStop(1, 'rgba(0,0,0,0.28)');
    g.fillStyle = rim;
    g.fillRect(0, 0, s, s);

    g.restore();
    return oc;
  }

  // ═══════════════════════════════════════════════════════════════════
  // BOARD GEOMETRY
  // ═══════════════════════════════════════════════════════════════════

  interface Slot { x: number; y: number; assigned: boolean }

  function hexGridInCircle(cx: number, cy: number, R: number, mr: number): Slot[] {
    const pos: Slot[] = [];
    const sp = mr * 2.12;
    const rh = sp * 0.866;
    let row = 0;
    for (let y = cy - R + mr; y <= cy + R - mr; y += rh) {
      const off = row % 2 ? sp / 2 : 0;
      for (let x = cx - R + mr; x <= cx + R - mr; x += sp) {
        const px = x + off;
        const dx = px - cx, dy = y - cy;
        if (Math.sqrt(dx * dx + dy * dy) + mr * 0.85 <= R) {
          pos.push({ x: px, y, assigned: false });
        }
      }
      row++;
    }
    return pos;
  }

  function drawGroove(ctx: CanvasRenderingContext2D, x: number, y: number, r: number): void {
    ctx.beginPath();
    ctx.arc(x, y, r * 0.95, 0, Math.PI * 2);
    const sg = ctx.createRadialGradient(x - r * 0.1, y - r * 0.1, r * 0.2, x, y, r * 0.95);
    sg.addColorStop(0, 'rgba(0,0,0,0.28)');
    sg.addColorStop(0.6, 'rgba(0,0,0,0.18)');
    sg.addColorStop(1, 'rgba(0,0,0,0.05)');
    ctx.fillStyle = sg;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, r * 0.72, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0,0,0,0.12)';
    ctx.lineWidth = 0.8;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, r * 0.5, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0,0,0,0.08)';
    ctx.lineWidth = 0.5;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, r * 0.88, Math.PI * 0.9, Math.PI * 1.6);
    ctx.strokeStyle = 'rgba(176,174,165,0.07)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  function shuffleArr<T>(a: T[]): T[] {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ═══════════════════════════════════════════════════════════════════
  // SHAPE DEFINITIONS
  // ═══════════════════════════════════════════════════════════════════

  type ShapePredicate = (nx: number, ny: number) => boolean;

  function buildPredicateShape(cx: number, cy: number, R: number, mr: number, predicate: ShapePredicate): Slot[] {
    return hexGridInCircle(cx, cy, R, mr).filter((point) => {
      const nx = (point.x - cx) / R;
      const ny = (point.y - cy) / R;
      return predicate(nx, ny);
    });
  }

  function circleDistance(nx: number, ny: number): number {
    return Math.sqrt(nx * nx + ny * ny);
  }

  function inRoundedCross(nx: number, ny: number, armHalfWidth: number, armReach: number): boolean {
    return (
      (Math.abs(nx) <= armHalfWidth && Math.abs(ny) <= armReach) ||
      (Math.abs(ny) <= armHalfWidth && Math.abs(nx) <= armReach)
    );
  }

  interface ShapeDef {
    name: string;
    build: (cx: number, cy: number, R: number, mr: number) => Slot[];
  }

  const SHAPES: ShapeDef[] = [
    {
      name: 'circle',
      build: (cx, cy, R, mr) => hexGridInCircle(cx, cy, R, mr),
    },
    {
      name: 'ring',
      build: (cx, cy, R, mr) => buildPredicateShape(cx, cy, R, mr, (nx, ny) => {
        const d = circleDistance(nx, ny);
        return d >= 0.46 && d <= 0.9;
      }),
    },
    {
      name: 'triangle',
      build: (cx, cy, R, mr) => {
        const pos: Slot[] = [];
        const sp = mr * 2.12, rh = sp * 0.866;
        const h = R * 1.6, base = R * 1.8;
        const topY = cy - h * 0.45;
        for (let y = topY; y <= topY + h; y += rh) {
          const progress = (y - topY) / h;
          const rowW = progress * base;
          for (let x = cx - rowW / 2; x <= cx + rowW / 2; x += sp) {
            pos.push({ x, y, assigned: false });
          }
        }
        return pos;
      },
    },
    {
      name: 'diamond',
      build: (cx, cy, R, mr) => buildPredicateShape(cx, cy, R, mr, (nx, ny) =>
        Math.abs(nx) + Math.abs(ny) * 0.92 <= 0.98
      ),
    },
    {
      name: 'star',
      build: (cx, cy, R, mr) => buildPredicateShape(cx, cy, R, mr, (nx, ny) => {
        const a = Math.atan2(ny, nx);
        const d = circleDistance(nx, ny);
        const r = 0.86 * (0.45 + 0.55 * Math.pow(Math.abs(Math.cos(2.5 * a - Math.PI / 2)), 0.6));
        return d <= r;
      }),
    },
    {
      name: 'red-cross',
      build: (cx, cy, R, mr) => buildPredicateShape(cx, cy, R, mr, (nx, ny) =>
        inRoundedCross(nx, ny, 0.16, 0.74)
      ),
    },
    {
      name: 'cross-in-circle',
      build: (cx, cy, R, mr) => buildPredicateShape(cx, cy, R, mr, (nx, ny) => {
        const d = circleDistance(nx, ny);
        return (d >= 0.66 && d <= 0.9) || inRoundedCross(nx, ny, 0.12, 0.58);
      }),
    },
    {
      name: 'hexagon',
      build: (cx, cy, R, mr) => buildPredicateShape(cx, cy, R, mr, (nx, ny) =>
        Math.abs(nx) * 0.9 + Math.abs(ny) * 0.58 <= 0.92
      ),
    },
    {
      name: 'crescent',
      build: (cx, cy, R, mr) => buildPredicateShape(cx, cy, R, mr, (nx, ny) => {
        const outer = circleDistance(nx + 0.12, ny);
        const inner = circleDistance(nx - 0.22, ny);
        return outer <= 0.88 && inner >= 0.54;
      }),
    },
  ];

  // ═══════════════════════════════════════════════════════════════════
  // MAIN EFFECT — canvas lifecycle
  // ═══════════════════════════════════════════════════════════════════

  $effect(() => {
    if (!canvasEl) return;

    const canvas = canvasEl;
    const ctx = canvas.getContext('2d')!;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion = motionQuery.matches;
    const onMotionChange = (e: MediaQueryListEvent) => { reducedMotion = e.matches; };
    motionQuery.addEventListener('change', onMotionChange);

    // DPR cap: Safari gets 1.5, others get 2
    const isSafari = /Safari/i.test(navigator.userAgent) && !/Chrome|Chromium|CriOS|EdgiOS|FxiOS/i.test(navigator.userAgent);
    const DPR_CAP = isSafari ? 1.5 : 2;
    const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, DPR_CAP));

    // Mutable physics state
    let width = 0, height = 0;
    let slots: Slot[] = [];
    let marbles: Marble[] = [];
    let marbleRadius = 12;
    const board = { x: 0, y: 0, radius: 0 };
    const boardLayer = document.createElement('canvas');
    const boardLayerCtx = boardLayer.getContext('2d')!;
    let currentLoop = 0;
    let targetLoops = 3;
    let targetCoverage = 1;
    let lastAt = performance.now();
    let loopTimer = 700 + Math.random() * 300;
    let morphing = false;
    let fadeOutAlpha = 1;
    let shapeIndex = 0;
    let rafId = 0;
    let readyFrameId = 0;
    let morphInterval: ReturnType<typeof window.setInterval> | 0 = 0;
    let reducedMotionTimer: ReturnType<typeof window.setTimeout> | 0 = 0;
    let disposed = false;
    let canvasVisible = true;
    let pageVisible = document.visibilityState === 'visible';
    let resizeFrameId = 0;
    let resizeObserver: ResizeObserver | undefined;
    let intersectionObserver: IntersectionObserver | undefined;

    interface Marble {
      x: number; y: number;
      vx: number; vy: number;
      z: number; vz: number;
      target: Slot;
      settled: boolean;
      chaosLevel: number;
      sprite: HTMLCanvasElement;
    }

    function rand(min: number, max: number): number {
      return min + Math.random() * (max - min);
    }

    function pickNextShapeIndex(current: number): number {
      if (SHAPES.length <= 1) return current;
      let next = current;
      while (next === current) next = Math.floor(Math.random() * SHAPES.length);
      return next;
    }

    function renderBoardLayer(): void {
      boardLayer.width = width * dpr;
      boardLayer.height = height * dpr;
      boardLayerCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      boardLayerCtx.clearRect(0, 0, width, height);
      for (const slot of slots) drawGroove(boardLayerCtx, slot.x, slot.y, marbleRadius);
    }

    function updateCounters(): void {
      marbleCount = marbles.length;
      const pct = slots.length ? Math.round(displayCoverageRatio() * 100) : 0;
      coveragePct = pct + '%';
    }

    function buildBoard(): void {
      const shapeDef = SHAPES[shapeIndex % SHAPES.length];
      slots = shapeDef.build(board.x, board.y, board.radius, marbleRadius);
      for (const s of slots) s.assigned = false;
      marbles = [];
      currentLoop = 0;
      targetLoops = 3 + Math.floor(Math.random() * 5);
      targetCoverage = 1 + rand(0, 0.10);
      renderBoardLayer();
      updateCounters();
    }

    function renderScene(): void {
      if (!width || !height) return;

      ctx.clearRect(0, 0, width, height);
      if (boardLayer.width && boardLayer.height) {
        ctx.drawImage(boardLayer, 0, 0, width, height);
      }

      const conv = convergenceRatio();
      const renderList = marbles.slice().sort((a, b) => a.y - b.y);
      for (const m of renderList) {
        const speed = Math.sqrt(m.vx * m.vx + m.vy * m.vy);
        const hover = m.z || 0;
        let mAlpha = m.settled ? 0.7 + conv * 0.3 : 0.5 + Math.min(speed * 0.03, 0.4);
        mAlpha *= fadeOutAlpha;

        if (hover > 0 || speed > 0.5) {
          const shadowScale = Math.max(0.4, 1 - hover / 180);
          ctx.globalAlpha = mAlpha * Math.max(0.05, 0.4 - hover / 250);
          ctx.beginPath();
          ctx.ellipse(
            m.x,
            m.y + marbleRadius * 0.6 + hover * 0.15,
            marbleRadius * 0.8 * shadowScale,
            marbleRadius * 0.4 * shadowScale,
            0,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = 'rgba(0,0,0,1)';
          ctx.fill();
        }

        ctx.globalAlpha = mAlpha;
        ctx.drawImage(m.sprite, m.x - m.sprite.width / 2, m.y - hover - m.sprite.height / 2);
      }

      ctx.globalAlpha = 1;
      updateCounters();
    }

    function renderStaticBoard(): void {
      if (!slots.length) {
        marbleCount = 0;
        coveragePct = '0%';
        ctx.clearRect(0, 0, width, height);
        return;
      }

      for (const slot of slots) slot.assigned = false;
      marbles = [];

      const settledTarget = Math.min(slots.length, Math.max(14, Math.round(slots.length * 0.84)));
      const settledSlots = shuffleArr(slots.slice()).slice(0, settledTarget);
      settledSlots.forEach((slot, index) => {
        slot.assigned = true;
        marbles.push({
          x: slot.x,
          y: slot.y,
          vx: 0,
          vy: 0,
          z: 0,
          vz: 0,
          target: slot,
          settled: true,
          chaosLevel: 0,
          sprite: createSprite(marbleRadius, index % PALETTES.length, PATTERNS[index % PATTERNS.length], 9000 + index),
        });
      });
      currentLoop = targetLoops;
      targetCoverage = 1;
      morphing = false;
      fadeOutAlpha = 1;
      renderScene();
    }

    function clearReducedMotionCycle(): void {
      if (reducedMotionTimer) {
        window.clearTimeout(reducedMotionTimer);
        reducedMotionTimer = 0;
      }
    }

    function scheduleReducedMotionCycle(delay = 3200 + Math.random() * 1200): void {
      clearReducedMotionCycle();
      if (disposed || !reducedMotion || !width || !height) return;
      reducedMotionTimer = window.setTimeout(() => {
        reducedMotionTimer = 0;
        if (!disposed && reducedMotion) {
          startMorph();
        }
      }, delay);
    }

    function resizeCanvas(): boolean {
      const rect = (canvas.parentElement ?? canvas).getBoundingClientRect();
      if (!rect.width || !rect.height) return false;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      board.x = width / 2;
      board.y = height / 2;
      board.radius = Math.min(width, height) * 0.42;
      marbleRadius = Math.max(10, board.radius * 0.08);
      buildBoard();
      loopTimer = 140 + Math.random() * 120;
      if (reducedMotion) {
        renderStaticBoard();
        scheduleReducedMotionCycle();
      } else {
        clearReducedMotionCycle();
        renderScene();
      }
      return true;
    }

    function settledCount(): number {
      let n = 0;
      for (const m of marbles) if (m.settled) n++;
      return n;
    }

    function convergenceRatio(): number {
      return slots.length ? settledCount() / slots.length : 0;
    }

    function displayCoverageRatio(): number {
      const settled = convergenceRatio();
      if (!slots.length) return 0;
      const overshootProgress = Math.max(0, settled - 0.92) / 0.08;
      const overshoot = (targetCoverage - 1) * Math.min(1, overshootProgress);
      return Math.min(targetCoverage, settled + overshoot);
    }

    function allMarblesSettled(): boolean {
      return marbles.every(m => m.settled);
    }

    function startMorph(): void {
      if (morphing) return;

      if (reducedMotion) {
        shapeIndex = pickNextShapeIndex(shapeIndex);
        buildBoard();
        renderStaticBoard();
        scheduleReducedMotionCycle();
        return;
      }

      morphing = true;
      fadeOutAlpha = 1;
      clearReducedMotionCycle();
      if (morphInterval) window.clearInterval(morphInterval);
      morphInterval = window.setInterval(() => {
        fadeOutAlpha -= reducedMotion ? 0.01 : 0.015;
        renderScene();
        if (fadeOutAlpha <= 0) {
          window.clearInterval(morphInterval);
          morphInterval = 0;
          fadeOutAlpha = 1;
          shapeIndex = pickNextShapeIndex(shapeIndex);
          morphing = false;
          buildBoard();
          if (reducedMotion) {
            renderStaticBoard();
            scheduleReducedMotionCycle();
          }
        }
      }, 16);
    }

    function throwWave(): void {
      if (morphing) return;
      const unassigned = slots.filter(s => !s.assigned);
      if (!unassigned.length) return;

      const nextLoop = currentLoop + 1;
      const remainingLoops = Math.max(1, targetLoops - currentLoop);
      const reserveForLater = Math.max(0, remainingLoops - 1);
      const baseline = Math.ceil(unassigned.length / remainingLoops);
      const variance = rand(0.82, 1.18);
      const pacingBias = nextLoop <= 2 ? 1.1 : rand(0.92, 1.06);
      let toThrow = Math.max(1, Math.round(baseline * variance * pacingBias));

      if (remainingLoops > 1) {
        toThrow = Math.min(toThrow, Math.max(1, unassigned.length - reserveForLater));
      } else {
        toThrow = unassigned.length;
      }

      currentLoop = nextLoop;
      const progress = 1 - unassigned.length / slots.length;
      shuffleArr(unassigned);
      const chaosLevel = 1 - progress * 0.8;

      for (let i = 0; i < toThrow; i++) {
        const slot = unassigned[i];
        slot.assigned = true;
        const spawnSpread = board.radius * (1.2 + chaosLevel * 0.8);
        const angle = Math.random() * Math.PI * 2;
        const mSeed = Math.floor(Math.random() * 99999);
        const mPattern = PATTERNS[Math.floor(Math.random() * PATTERNS.length)];
        const mPalIdx = Math.floor(Math.random() * PALETTES.length);
        marbles.push({
          x: board.x + Math.cos(angle) * spawnSpread,
          y: board.y + Math.sin(angle) * spawnSpread - board.radius * chaosLevel * 0.5,
          vx: (Math.random() - 0.5) * 16 * chaosLevel,
          vy: (Math.random() - 0.5) * 12 * chaosLevel + 4,
          z: 40 + Math.random() * 120 + chaosLevel * 100,
          vz: (Math.random() - 0.2) * 8,
          target: slot,
          settled: false,
          chaosLevel,
          sprite: createSprite(marbleRadius, mPalIdx, mPattern, mSeed),
        });
      }

      // Early waves: dislodge a settled marble to keep motion alive
      if (progress < 0.6 && marbles.length > 3 && currentLoop < targetLoops) {
        const dislodgeChance = (1 - progress) * 0.08;
        for (let j = marbles.length - 1; j >= 0; j--) {
          const m = marbles[j];
          if (m.settled && Math.random() < dislodgeChance) {
            m.settled = false;
            m.target.assigned = false;
            const kickAngle = Math.random() * Math.PI * 2;
            m.vx = Math.cos(kickAngle) * (6 + Math.random() * 8);
            m.vy = Math.sin(kickAngle) * (6 + Math.random() * 8) - 4;
            m.z = 2 + Math.random() * 10;
            m.vz = 6 + Math.random() * 8;
            const empties = slots.filter(s => !s.assigned);
            if (empties.length > 0) {
              const newSlot = empties[Math.floor(Math.random() * empties.length)];
              newSlot.assigned = true;
              m.target = newSlot;
            } else {
              m.target.assigned = true;
              m.settled = true;
            }
            break;
          }
        }
      }
      updateCounters();
    }

    function tick(now: number): void {
      if (disposed) return;

      const dt = Math.min(32, now - lastAt);
      lastAt = now;

      // Remove off-screen marbles
      marbles = marbles.filter(m => {
        if (m.settled) return true;
        const inBounds = m.x > -100 && m.x < width + 100 && m.y > -300 && m.y < height + 100;
        if (!inBounds && m.target) m.target.assigned = false;
        return inBounds;
      });

      const conv = convergenceRatio();

      // Physics step
      for (const m of marbles) {
        if (m.settled) continue;
        const dx = m.target.x - m.x;
        const dy = m.target.y - m.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        m.vz -= 1.0;
        m.z += m.vz;
        if (m.z < 0) {
          m.z = 0;
          m.vz = Math.abs(m.vz) > 2.0 ? -m.vz * 0.38 : 0;
        }
        const inAir = m.z > 0;

        const mChaos = (m.chaosLevel || 0.5) * (1 - conv * 0.8);
        const jitter = dist > marbleRadius * 2.4 ? (Math.random() - 0.5) * 3.2 * mChaos : 0;
        const attract = (0.018 + conv * 0.02) * (inAir ? 0.25 : 1.0);
        m.vx += dx * attract + jitter;
        m.vy += dy * attract + jitter;

        if (dist < marbleRadius * 0.9) {
          m.vx *= 0.82;
          m.vy *= 0.82;
        }

        let friction = 0.87 + conv * 0.05;
        if (inAir) friction = 0.97;
        m.vx *= friction;
        m.vy *= friction;
        m.x += m.vx;
        m.y += m.vy;

        if (dist < 2.0 && Math.abs(m.vx) < 0.8 && Math.abs(m.vy) < 0.8 && m.z <= 0) {
          m.settled = true;
          m.x = m.target.x;
          m.y = m.target.y;
        }
      }

      // Shape completion → morph
      if (!morphing && convergenceRatio() >= 1 && currentLoop >= targetLoops && allMarblesSettled()) {
        startMorph();
      } else {
        loopTimer -= dt;
        if (loopTimer <= 0) {
          throwWave();
          loopTimer = 1200 + Math.random() * 900;
        }
      }
      renderScene();
      rafId = requestAnimationFrame(tick);
    }

    function startLoop(): void {
      if (disposed || reducedMotion || rafId || !width || !height || !canvasVisible || !pageVisible) return;
      clearReducedMotionCycle();
      lastAt = performance.now();
      rafId = requestAnimationFrame(tick);
    }

    function stopLoop(): void {
      if (!rafId) return;
      cancelAnimationFrame(rafId);
      rafId = 0;
    }

    function syncMotionState(): void {
      if (disposed || !width || !height) return;

      if (reducedMotion) {
        stopLoop();
        if (canvasVisible && pageVisible) {
          scheduleReducedMotionCycle();
        } else {
          clearReducedMotionCycle();
        }
        return;
      }

      clearReducedMotionCycle();
      if (canvasVisible && pageVisible) {
        startLoop();
      } else {
        stopLoop();
      }
    }

    function ensureCanvasReady(): void {
      if (disposed) return;
      if (!resizeCanvas()) {
        readyFrameId = requestAnimationFrame(ensureCanvasReady);
        return;
      }
      syncMotionState();
    }

    function scheduleResize(): void {
      if (disposed || resizeFrameId) return;
      resizeFrameId = requestAnimationFrame(() => {
        resizeFrameId = 0;
        if (!resizeCanvas()) return;
        syncMotionState();
      });
    }

    const observedEl = canvas.parentElement ?? canvas;
    resizeObserver = new ResizeObserver(scheduleResize);
    resizeObserver.observe(observedEl);

    intersectionObserver = new IntersectionObserver(
      (entries) => {
        canvasVisible = entries.some((entry) => entry.isIntersecting);
        syncMotionState();
      },
      {
        threshold: 0.12,
      }
    );
    intersectionObserver.observe(observedEl);

    const onWindowResize = () => {
      scheduleResize();
    };

    const handleMotionChange = (e: MediaQueryListEvent) => {
      onMotionChange(e);
      scheduleResize();
    };

    const handleVisibilityChange = () => {
      pageVisible = document.visibilityState === 'visible';
      syncMotionState();
    };

    motionQuery.removeEventListener('change', onMotionChange);
    motionQuery.addEventListener('change', handleMotionChange);

    ensureCanvasReady();
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup on unmount
    return () => {
      disposed = true;
      stopLoop();
      if (readyFrameId) cancelAnimationFrame(readyFrameId);
      if (resizeFrameId) cancelAnimationFrame(resizeFrameId);
      if (morphInterval) window.clearInterval(morphInterval);
      clearReducedMotionCycle();
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  });
</script>

<figure class="hero-canvas" id="showcase">
  <canvas bind:this={canvasEl} id="marbleCanvas" aria-hidden="true"></canvas>
  <div class="hero-canvas-stats" aria-hidden="true">
    <span>{labels.marbles} <strong>{marbleCount}</strong></span>
    <span>{labels.converge} <strong>{coveragePct}</strong></span>
  </div>
</figure>

<style>
  .hero-canvas {
    position: relative;
    align-self: center;
    justify-self: end;
    width: var(--hero-canvas-max);
    height: var(--hero-canvas-max);
    max-width: 100%;
    aspect-ratio: 1;
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: var(--hero-canvas-surface);
    border: 1px solid var(--card-border);
    backdrop-filter: var(--hero-canvas-backdrop);
    -webkit-backdrop-filter: var(--hero-canvas-backdrop);
    box-shadow: var(--hero-canvas-shadow);
  }

  .hero-canvas canvas {
    width: 100%;
    height: 100%;
    display: block;
  }

  .hero-canvas-stats {
    position: absolute;
    top: var(--hero-canvas-stats-offset-block);
    right: var(--hero-canvas-stats-offset-inline);
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: var(--hero-canvas-stats-gap);
    padding: var(--hero-canvas-stats-padding);
    border-radius: var(--radius-sm);
    border: 1px solid var(--glass-panel-border);
    background: var(--glass-panel-bg-strong);
    backdrop-filter: blur(14px) saturate(116%);
    -webkit-backdrop-filter: blur(14px) saturate(116%);
    box-shadow: inset 0 1px 0 var(--glass-panel-highlight);
    color: var(--steel-dark);
    font-family: var(--font-head);
    font-size: 0.72rem;
  }

  .hero-canvas-stats strong {
    color: var(--stone-light);
    font-size: 0.88rem;
  }

  @media (max-width: 900px) {
    .hero-canvas {
      display: none;
    }
  }

</style>
