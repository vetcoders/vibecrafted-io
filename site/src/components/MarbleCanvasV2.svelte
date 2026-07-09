<script lang="ts">
  import type { Lang } from '../lib/i18n';

  // ── Props ──────────────────────────────────────────────────────────
  interface Props {
    boardScale?: number;
    spawnScale?: number;
    boardOffsetX?: number;
    boardOffsetY?: number;
    palette?: 'color' | 'color-desaturated' | 'mono-ink' | 'mono-red';
    drawGrooves?: boolean;
    grooveColor?: string | null;
    boardTint?: string | null;
    boardStroke?: string | null;
    onStats?: (marbleCount: number, convergePct: number) => void;
    lang?: Lang;
  }

  let {
    boardScale = 0.42,
    spawnScale = 1.0,
    boardOffsetX = 0,
    boardOffsetY = 0,
    palette = 'color',
    drawGrooves = true,
    grooveColor = null,
    boardTint = null,
    boardStroke = null,
    onStats,
    lang = 'en',
  } = $props<Props>();

  // ── Reactive DOM state ─────────────────────────────────────────────
  let marbleCount = $state(0);
  let coveragePct = $state('0%');
  let canvasEl: HTMLCanvasElement | undefined = $state();

  // ── Reduced-motion check (reactive via media query) ────────────────
  let reducedMotion = $state(false);

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

  const PALETTES_CURRENT: Palette[] = [
    { base: '#cf6f4e', accent: '#e5b18e', name: 'amber' },
    { base: '#6a9bcc', accent: '#c2ddf0', name: 'ocean' },
    { base: '#788c5d', accent: '#bdd4a0', name: 'forest' },
    { base: '#b0aea5', accent: '#e8e6dc', name: 'smoke' },
    { base: '#c46b8a', accent: '#f0c4d4', name: 'rose' },
    { base: '#8b7ec8', accent: '#cdc4ef', name: 'amethyst' },
    { base: '#cc8844', accent: '#f0d4a0', name: 'honey' },
    { base: '#5ba3a3', accent: '#a8dede', name: 'teal' },
  ];

  const PALETTES_V2_COLOR: Palette[] = [
    { base: '#cf6f4e', accent: '#e5b18e', name: 'rust' },
    { base: '#6a9bcc', accent: '#c2ddf0', name: 'blue' },
    { base: '#788c5d', accent: '#bdd4a0', name: 'olive' },
    { base: '#b0aea5', accent: '#e8e6dc', name: 'off-white' },
    { base: '#c46b8a', accent: '#f0c4d4', name: 'pink' },
    { base: '#8b7ec8', accent: '#cdc4ef', name: 'plum' },
    { base: '#3d7a72', accent: '#a6c5bc', name: 'teal' },
    { base: '#cc8844', accent: '#f0d4a0', name: 'amber' },
  ];

  const PALETTES_MONO_INK: Palette[] = [
    { base: '#1a1a1a', accent: '#f5f4ef', name: 'mono-deep' },
    { base: '#2a2a28', accent: '#e8e6df', name: 'mono-mid' },
    { base: '#3a3834', accent: '#d8d4cb', name: 'mono-light' },
  ];

  const PAL_RED: Palette = { base: '#c0392b', accent: '#f4c4b5', name: 'red' };

  const PATTERNS = ['catseye', 'swirl', 'galaxy', 'clear', 'solid'] as const;

  function pickPalette(i: number): Palette {
    if (palette === 'mono-red' && i % 7 === 3) return PAL_RED;
    if (palette === 'mono-ink' || palette === 'mono-red') return PALETTES_MONO_INK[i % PALETTES_MONO_INK.length];
    if (palette === 'color-desaturated') return PALETTES_CURRENT[i % PALETTES_CURRENT.length];
    return PALETTES_V2_COLOR[i % PALETTES_V2_COLOR.length];
  }

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
    const pal = pickPalette(paletteIdx);
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

  function drawGroove(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string | null): void {
    ctx.beginPath();
    ctx.arc(x, y, r * 0.95, 0, Math.PI * 2);
    if (color) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.stroke();
      return;
    }

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

    // ── Physics constants — fixed 120 Hz steps; units: CSS px, seconds ──
    const STEP_MS = 1000 / 120;
    const DT = STEP_MS / 1000;
    const MAX_FRAME_MS = 200;     // clamp accumulated time on tab-switch resume
    const GRAVITY_Z = 1500;       // px/s² toward the board plane
    const RESTITUTION_Z = 0.35;   // one or two visible bounces, then contact
    const BOUNCE_MIN_VZ = 55;     // px/s — below this a bounce dies to rest
    const ROLL_DAMPING = 0.984;   // per-step Verlet damping while on the board
    const AIR_DAMPING = 0.997;    // per-step damping while airborne
    const WELL_REACH = 3.2;       // pocket potential-well radius, in marble radii
    const WELL_SPRING = 30;       // s⁻² spring toward the pocket inside the well
    const FAR_BIAS = 4;           // s⁻² gentle pull toward the pocket outside it
    const SEAT_DIST = 1.6;        // px — seating snap distance
    const SEAT_SPEED = 10;        // px/s — seating max planar speed
    const SEED_FILL = 0.72;       // initial settled coverage of the board
    const RETIRE_FILL = 0.85;     // above this fill, arrivals retire the oldest marble
    const DEGRADED_FILL = 0.62;   // population cap once the frame budget degrades
    const RETIRE_MS = 1300;       // retirement fade+shrink duration
    const STALL_SOFT_S = 6;       // a live marble older than this slips past collisions
    const STALL_HARD_S = 10;      // and this force-seats it — the scene must go calm

    // Mutable sim state
    let width = 0, height = 0;
    let slots: Slot[] = [];
    let marbles: Marble[] = [];
    let marbleRadius = 12;
    const board = { x: 0, y: 0, radius: 0 };
    const boardLayer = document.createElement('canvas');
    const boardLayerCtx = boardLayer.getContext('2d')!;
    let shapeIndex = 0;
    let rafId = 0;
    let readyFrameId = 0;
    let arrivalTimer: ReturnType<typeof window.setTimeout> | 0 = 0;
    let reducedMotionTimer: ReturnType<typeof window.setTimeout> | 0 = 0;
    let disposed = false;
    let canvasVisible = true;
    let pageVisible = document.visibilityState === 'visible';
    let resizeFrameId = 0;
    let resizeObserver: ResizeObserver | undefined;
    let intersectionObserver: IntersectionObserver | undefined;
    let lastAt = 0;
    let accumMs = 0;
    let marbleSeq = 0;
    let firstArrivalPending = true;
    // Frame-budget guard: degradation is one-way per session (no oscillating quality)
    let degraded = false;
    let slowStreak = 0;
    const frameSamples: number[] = [];

    interface Marble {
      x: number; y: number;     // position on the board plane
      px: number; py: number;   // previous position (Verlet)
      z: number; vz: number;    // height above the board
      pocket: Slot;
      phase: 'live' | 'seated' | 'retiring';
      retireT: number;
      ageS: number;
      seq: number;
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

      if (boardTint) {
        boardLayerCtx.beginPath();
        boardLayerCtx.arc(board.x, board.y, board.radius + marbleRadius * 1.4, 0, Math.PI * 2);
        boardLayerCtx.fillStyle = boardTint;
        boardLayerCtx.fill();
      }

      if (boardStroke) {
        boardLayerCtx.beginPath();
        boardLayerCtx.arc(board.x, board.y, board.radius + marbleRadius * 1.4, 0, Math.PI * 2);
        boardLayerCtx.strokeStyle = boardStroke;
        boardLayerCtx.lineWidth = 1;
        boardLayerCtx.stroke();
      }

      if (!drawGrooves) return;
      for (const slot of slots) drawGroove(boardLayerCtx, slot.x, slot.y, marbleRadius, grooveColor);
    }

    function seatedCount(): number {
      let n = 0;
      for (const m of marbles) if (m.phase === 'seated') n++;
      return n;
    }

    function updateCounters(): void {
      marbleCount = marbles.length;
      const pct = slots.length ? Math.round((seatedCount() / slots.length) * 100) : 0;
      coveragePct = pct + '%';
      onStats?.(marbles.length, pct);
    }

    function buildBoard(): void {
      const shapeDef = SHAPES[shapeIndex % SHAPES.length];
      slots = shapeDef.build(board.x, board.y, board.radius, marbleRadius);
      for (const s of slots) s.assigned = false;
      marbles = [];
      renderBoardLayer();
      updateCounters();
    }

    function makeSeatedMarble(slot: Slot, paletteIdx: number, seed: number): Marble {
      slot.assigned = true;
      return {
        x: slot.x, y: slot.y,
        px: slot.x, py: slot.y,
        z: 0, vz: 0,
        pocket: slot,
        phase: 'seated',
        retireT: 0,
        ageS: 0,
        seq: marbleSeq++,
        sprite: createSprite(marbleRadius, paletteIdx, PATTERNS[paletteIdx % PATTERNS.length], seed),
      };
    }

    function renderScene(): void {
      if (!width || !height) return;

      ctx.clearRect(0, 0, width, height);
      if (boardLayer.width && boardLayer.height) {
        ctx.drawImage(boardLayer, 0, 0, width, height);
      }

      const renderList = marbles.slice().sort((a, b) => a.y - b.y);
      for (const m of renderList) {
        const speed = m.phase === 'live' ? Math.hypot(m.x - m.px, m.y - m.py) / DT : 0;
        const hover = m.z || 0;
        const retireScale = m.phase === 'retiring' ? 1 - m.retireT * 0.45 : 1;
        const mAlpha = m.phase === 'retiring' ? Math.max(0, 1 - m.retireT) : 1;

        if (hover > 0 || speed > 12) {
          // Contact shadow detaches and softens with height — the depth cue
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
        const dw = m.sprite.width * retireScale;
        const dh = m.sprite.height * retireScale;
        ctx.drawImage(m.sprite, m.x - dw / 2, m.y - hover - dh / 2, dw, dh);
      }

      ctx.globalAlpha = 1;
      updateCounters();
    }

    function renderStaticBoard(): void {
      if (!slots.length) {
        marbleCount = 0;
        coveragePct = '0%';
        onStats?.(0, 0);
        ctx.clearRect(0, 0, width, height);
        return;
      }

      for (const slot of slots) slot.assigned = false;
      marbles = [];

      const settledTarget = Math.min(slots.length, Math.max(14, Math.round(slots.length * 0.84)));
      const settledSlots = shuffleArr(slots.slice()).slice(0, settledTarget);
      settledSlots.forEach((slot, index) => {
        marbles.push(makeSeatedMarble(slot, index, 9000 + index));
      });
      renderScene();
    }

    function seedComposition(): void {
      for (const slot of slots) slot.assigned = false;
      marbles = [];

      const target = Math.min(slots.length, Math.max(12, Math.round(slots.length * SEED_FILL)));
      const seededSlots = shuffleArr(slots.slice()).slice(0, target);
      seededSlots.forEach((slot, index) => {
        marbles.push(makeSeatedMarble(slot, index, Math.floor(Math.random() * 99999)));
      });
      renderScene();
    }

    // ── Reduced-motion path: static seeded compositions, slow recompose ──

    function clearReducedMotionCycle(): void {
      if (reducedMotionTimer) {
        window.clearTimeout(reducedMotionTimer);
        reducedMotionTimer = 0;
      }
    }

    function recomposeStatic(): void {
      shapeIndex = pickNextShapeIndex(shapeIndex);
      buildBoard();
      renderStaticBoard();
      scheduleReducedMotionCycle();
    }

    function scheduleReducedMotionCycle(delay = 14000 + Math.random() * 8000): void {
      clearReducedMotionCycle();
      if (disposed || !reducedMotion || !width || !height) return;
      reducedMotionTimer = window.setTimeout(() => {
        reducedMotionTimer = 0;
        if (!disposed && reducedMotion) {
          recomposeStatic();
        }
      }, delay);
    }

    // ── Physics core: Verlet integration + collisions + pocket seating ──

    function physicsStep(): void {
      for (const m of marbles) {
        if (m.phase === 'seated') continue;
        if (m.phase === 'retiring') {
          m.retireT = Math.min(1, m.retireT + STEP_MS / RETIRE_MS);
          continue;
        }
        m.ageS += DT;

        // Vertical: gravity + damped bounce (entropy up)
        m.vz -= GRAVITY_Z * DT;
        m.z += m.vz * DT;
        if (m.z <= 0) {
          m.z = 0;
          if (Math.abs(m.vz) > BOUNCE_MIN_VZ) {
            m.vz = -m.vz * RESTITUTION_Z;
            // Impact scatter: a touch of planar energy so the bounce reads as real
            m.px += rand(-0.35, 0.35);
            m.py += rand(-0.35, 0.35);
          } else {
            m.vz = 0;
          }
        }
        const airborne = m.z > 0.5;

        // Planar Verlet with the claimed pocket as a potential well (entropy down)
        const dx = m.pocket.x - m.x;
        const dy = m.pocket.y - m.y;
        const dist = Math.hypot(dx, dy);
        let ax = 0, ay = 0;
        if (!airborne && dist > 0.0001) {
          const k = dist < marbleRadius * WELL_REACH ? WELL_SPRING : FAR_BIAS;
          ax = dx * k;
          ay = dy * k;
        }
        let damp = airborne ? AIR_DAMPING : ROLL_DAMPING;
        if (!airborne && dist < marbleRadius) damp *= 0.94; // well bottom kills oscillation
        const nx = m.x + (m.x - m.px) * damp + ax * DT * DT;
        const ny = m.y + (m.y - m.py) * damp + ay * DT * DT;
        m.px = m.x;
        m.py = m.y;
        m.x = nx;
        m.y = ny;
      }

      resolveCollisions();
      constrainToBoard();
      settleAndSweep();
    }

    function resolveCollisions(): void {
      const minD = marbleRadius * 2;
      const minD2 = minD * minD;
      for (let i = 0; i < marbles.length; i++) {
        const a = marbles[i];
        if (a.phase !== 'live') continue;
        if (a.ageS > STALL_SOFT_S) continue; // stalled marble slips into its pocket
        for (let j = 0; j < marbles.length; j++) {
          if (j === i) continue;
          const b = marbles[j];
          if (b.phase === 'retiring') continue;
          if (b.phase === 'live' && j < i) continue; // live pair already resolved
          if (Math.abs(a.z - b.z) > marbleRadius * 1.1) continue; // flies over
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 >= minD2 || d2 === 0) continue;
          const d = Math.sqrt(d2);
          const push = minD - d;
          const ux = dx / d;
          const uy = dy / d;
          if (b.phase === 'seated') {
            // Seated marbles are static bodies — the mover takes the full correction
            a.x += ux * push;
            a.y += uy * push;
          } else {
            a.x += ux * push * 0.5;
            a.y += uy * push * 0.5;
            b.x -= ux * push * 0.5;
            b.y -= uy * push * 0.5;
          }
        }
      }
    }

    function constrainToBoard(): void {
      // Motion stays inside the board circle — it never leaks toward the copy column
      const maxR = board.radius - marbleRadius * 0.4;
      for (const m of marbles) {
        if (m.phase !== 'live') continue;
        const dx = m.x - board.x;
        const dy = m.y - board.y;
        const d = Math.hypot(dx, dy);
        if (d > maxR) {
          m.x = board.x + (dx / d) * maxR;
          m.y = board.y + (dy / d) * maxR;
        }
      }
    }

    function settleAndSweep(): void {
      for (const m of marbles) {
        if (m.phase !== 'live' || m.z > 0) continue;
        const dist = Math.hypot(m.pocket.x - m.x, m.pocket.y - m.y);
        const speed = Math.hypot(m.x - m.px, m.y - m.py) / DT;
        const forced = m.ageS > STALL_HARD_S;
        if (forced || (dist < SEAT_DIST && speed < SEAT_SPEED && Math.abs(m.vz) < 1)) {
          m.x = m.pocket.x;
          m.y = m.pocket.y;
          m.px = m.x;
          m.py = m.y;
          m.z = 0;
          m.vz = 0;
          m.phase = 'seated';
        }
      }
      for (let i = marbles.length - 1; i >= 0; i--) {
        const m = marbles[i];
        if (m.phase === 'retiring' && m.retireT >= 1) {
          m.pocket.assigned = false;
          marbles.splice(i, 1);
        }
      }
    }

    // ── Arrival lifecycle: one marble every 20-40 s finds a pocket ──

    function maybeRetireForFill(): void {
      if (!slots.length) return;
      const cap = Math.floor(slots.length * (degraded ? DEGRADED_FILL : RETIRE_FILL));
      const seated = marbles.filter((m) => m.phase === 'seated');
      if (seated.length < cap) return;
      let oldest: Marble | null = null;
      for (const m of seated) if (!oldest || m.seq < oldest.seq) oldest = m;
      if (oldest) oldest.phase = 'retiring';
    }

    function spawnArrival(): void {
      maybeRetireForFill();
      const empty = slots.filter((s) => !s.assigned);
      if (!empty.length) return;
      const slot = empty[Math.floor(Math.random() * empty.length)];
      slot.assigned = true;

      // Drop in just off the pocket mouth — close enough to roll in past at
      // most one seated neighbour, never across the packed board.
      const angle = Math.random() * Math.PI * 2;
      const spread = marbleRadius * rand(0.4, 1.6) * Math.min(spawnScale, 2);
      let sx = slot.x + Math.cos(angle) * spread;
      let sy = slot.y + Math.sin(angle) * spread;
      const bdx = sx - board.x;
      const bdy = sy - board.y;
      const bd = Math.hypot(bdx, bdy);
      const maxR = board.radius - marbleRadius;
      if (bd > maxR) {
        sx = board.x + (bdx / bd) * maxR;
        sy = board.y + (bdy / bd) * maxR;
      }

      const driftA = Math.random() * Math.PI * 2;
      const drift = rand(6, 26) * DT; // initial planar velocity, px per step
      marbles.push({
        x: sx, y: sy,
        px: sx - Math.cos(driftA) * drift,
        py: sy - Math.sin(driftA) * drift,
        z: rand(240, 360), vz: 0,
        pocket: slot,
        phase: 'live',
        retireT: 0,
        ageS: 0,
        seq: marbleSeq++,
        sprite: createSprite(
          marbleRadius,
          marbleSeq,
          PATTERNS[Math.floor(Math.random() * PATTERNS.length)],
          Math.floor(Math.random() * 99999)
        ),
      });
      updateCounters();
    }

    function nextArrivalDelayMs(): number {
      if (firstArrivalPending) return rand(2500, 5000);
      return degraded ? rand(34000, 68000) : rand(20000, 40000);
    }

    function clearArrival(): void {
      if (arrivalTimer) {
        window.clearTimeout(arrivalTimer);
        arrivalTimer = 0;
      }
    }

    function scheduleArrival(): void {
      clearArrival();
      if (disposed || reducedMotion || !canvasVisible || !pageVisible || !slots.length) return;
      arrivalTimer = window.setTimeout(() => {
        arrivalTimer = 0;
        firstArrivalPending = false;
        spawnArrival();
        startLoop();
        scheduleArrival();
      }, nextArrivalDelayMs());
    }

    // ── Frame loop: fixed-timestep accumulator, idle power-down ──

    function sceneActive(): boolean {
      return marbles.some((m) => m.phase !== 'seated');
    }

    function recordFrame(frameMs: number): void {
      frameSamples.push(frameMs);
      if (frameSamples.length > 600) frameSamples.shift();
      if (degraded) return;
      if (frameMs > 20) {
        slowStreak++;
        if (slowStreak >= 90) {
          degraded = true;
          maybeRetireForFill();
        }
      } else {
        slowStreak = 0;
      }
    }

    function tick(now: number): void {
      if (disposed) return;
      rafId = 0;
      const frameMs = Math.min(now - lastAt, MAX_FRAME_MS);
      lastAt = now;
      accumMs += frameMs;
      while (accumMs >= STEP_MS) {
        physicsStep();
        accumMs -= STEP_MS;
      }
      renderScene();
      recordFrame(frameMs);
      if (sceneActive()) {
        rafId = requestAnimationFrame(tick);
      } else {
        // Board settled: physics sleeps until the next arrival timer wakes it
        accumMs = 0;
      }
    }

    function startLoop(): void {
      if (disposed || reducedMotion || rafId || !width || !height || !canvasVisible || !pageVisible) return;
      if (!sceneActive()) return;
      lastAt = performance.now();
      accumMs = 0;
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
        clearArrival();
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
        if (!arrivalTimer) scheduleArrival();
      } else {
        stopLoop();
        clearArrival();
      }
    }

    function resizeCanvas(): boolean {
      const rect = (canvas.parentElement ?? canvas).getBoundingClientRect();
      if (!rect.width || !rect.height) return false;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      board.x = width / 2 + width * boardOffsetX;
      board.y = height / 2 + height * boardOffsetY;
      board.radius = Math.min(width, height) * boardScale;
      marbleRadius = Math.max(10, board.radius * 0.08);
      if (reducedMotion) {
        buildBoard();
        renderStaticBoard();
        scheduleReducedMotionCycle();
      } else {
        clearReducedMotionCycle();
        shapeIndex = 0; // animated mode lives on the classic circular board
        buildBoard();
        seedComposition();
      }
      return true;
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

    // Opt-in perf probe (?mcv2perf) — frame-time evidence for tuning sessions
    if (/[?&]mcv2perf/.test(window.location.search)) {
      (window as unknown as { __mcv2Perf?: unknown }).__mcv2Perf = {
        frames: frameSamples,
        stats: () => {
          const xs = frameSamples.slice().sort((a, b) => a - b);
          const n = xs.length;
          const avg = n ? xs.reduce((s, v) => s + v, 0) / n : 0;
          const p95 = n ? xs[Math.min(n - 1, Math.floor(n * 0.95))] : 0;
          return { n, avg, p95, degraded, marbles: marbles.length };
        },
      };
    }

    ensureCanvasReady();
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup on unmount
    return () => {
      disposed = true;
      stopLoop();
      if (readyFrameId) cancelAnimationFrame(readyFrameId);
      if (resizeFrameId) cancelAnimationFrame(resizeFrameId);
      clearArrival();
      clearReducedMotionCycle();
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  });
</script>

<canvas bind:this={canvasEl} aria-hidden="true" class="mcv2-canvas"></canvas>

<style>
  .mcv2-canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
