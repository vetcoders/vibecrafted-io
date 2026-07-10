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

  // Depth layers: 0 = far (smaller, darker, softened), 1 = mid, 2 = near (crisp).
  // Visual-only — physics keeps one uniform radius so seating stays exact.
  const LAYER_SCALE = [0.92, 1, 1.05] as const;

  // The sprite is the ROTATING layer of a marble: base colour + pattern only.
  // Everything directional (form shading, refraction, specular) lives in the
  // baked glass overlay drawn unrotated on top — so rolling never smears the
  // lighting and a seated marble at any rollAngle stays crisp.
  function createSprite(
    radius: number,
    paletteIdx: number,
    patternType: string,
    seed: number,
    layer = 1,
    pixelScale = 1
  ): HTMLCanvasElement {
    const pad = 4;
    const s = (radius * 2 + pad) * 2;
    const oc = document.createElement('canvas');
    oc.width = Math.max(1, Math.round(s * pixelScale));
    oc.height = oc.width;
    const g = oc.getContext('2d')!;
    g.setTransform(pixelScale, 0, 0, pixelScale, 0, 0);
    const cx = s / 2, cy = s / 2, r = radius * LAYER_SCALE[layer];
    const pal = pickPalette(paletteIdx);
    const base = hexToRgb(pal.base);
    const accent = hexToRgb(pal.accent);
    const rng = mulberry32(seed);

    // No baked shadow: the contact shadow lives on the board plane in
    // renderScene, so it never lifts off with an airborne marble.

    // Base sphere gradient
    g.save();
    g.beginPath();
    g.arc(cx, cy, r, 0, Math.PI * 2);
    g.clip();

    // Rotation-symmetric base: centred falloff only. Directional light is the
    // overlay's job — a baked offset gradient here would spin with the roll.
    const bg = g.createRadialGradient(cx, cy, r * 0.08, cx, cy, r);
    bg.addColorStop(0, rgbStr(lighten(base, 42), 1));
    bg.addColorStop(0.55, rgbStr(base, 1));
    bg.addColorStop(1, rgbStr(darken(base, 38), 1));
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

    // Edge darkening rim (rotation-symmetric, safe to bake here)
    const rim = g.createRadialGradient(cx, cy, r * 0.75, cx, cy, r);
    rim.addColorStop(0, 'rgba(0,0,0,0)');
    rim.addColorStop(0.8, 'rgba(0,0,0,0.08)');
    rim.addColorStop(1, 'rgba(0,0,0,0.28)');
    g.fillStyle = rim;
    g.fillRect(0, 0, s, s);

    g.restore();

    if (layer === 0) {
      // Far layer depth cue: a tint ONLY. Glass stays hard — no blur pass may
      // ever touch the silhouette (the old downscale-upscale soften read as fur).
      g.setTransform(1, 0, 0, 1, 0, 0);
      g.globalCompositeOperation = 'source-atop';
      g.fillStyle = 'rgba(10,14,20,0.16)';
      g.fillRect(0, 0, oc.width, oc.height);
      g.globalCompositeOperation = 'source-over';
    }
    return oc;
  }

  // Baked once per depth band: the FIXED lighting of a glass marble — form
  // shading (light upper-left), internal refraction, specular highlight.
  // Drawn unrotated over the rotating sprite, so light never spins and no
  // per-frame gradients are built.
  function createGlassOverlay(radius: number, layer: number, pixelScale: number): HTMLCanvasElement {
    const pad = 4;
    const s = (radius * 2 + pad) * 2;
    const oc = document.createElement('canvas');
    oc.width = Math.max(1, Math.round(s * pixelScale));
    oc.height = oc.width;
    const g = oc.getContext('2d')!;
    g.setTransform(pixelScale, 0, 0, pixelScale, 0, 0);
    const cx = s / 2, cy = s / 2, r = radius * LAYER_SCALE[layer];

    g.beginPath();
    g.arc(cx, cy, r * 0.99, 0, Math.PI * 2);
    g.clip();

    // Form shading: shadow gathers lower-right, away from the light.
    const form = g.createRadialGradient(cx - r * 0.35, cy - r * 0.4, r * 0.1, cx + r * 0.12, cy + r * 0.14, r * 1.05);
    form.addColorStop(0, 'rgba(0,0,0,0)');
    form.addColorStop(0.55, 'rgba(0,0,0,0.04)');
    form.addColorStop(0.82, 'rgba(0,0,0,0.18)');
    form.addColorStop(1, 'rgba(0,0,0,0.38)');
    g.fillStyle = form;
    g.fillRect(0, 0, s, s);

    // Internal refraction: light re-emerges at the lower rim of real glass.
    const rfl = g.createRadialGradient(cx + r * 0.18, cy + r * 0.42, r * 0.02, cx + r * 0.14, cy + r * 0.36, r * 0.42);
    rfl.addColorStop(0, 'rgba(255,255,255,0.24)');
    rfl.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = rfl;
    g.fillRect(0, 0, s, s);

    // Specular: one crisp point, fixed to the light source.
    const hl = g.createRadialGradient(cx - r * 0.28, cy - r * 0.32, r * 0.02, cx - r * 0.15, cy - r * 0.2, r * 0.5);
    hl.addColorStop(0, 'rgba(255,255,255,0.95)');
    hl.addColorStop(0.12, 'rgba(255,255,255,0.66)');
    hl.addColorStop(0.34, 'rgba(255,255,255,0.22)');
    hl.addColorStop(0.62, 'rgba(255,255,255,0.08)');
    hl.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = hl;
    g.fillRect(0, 0, s, s);

    return oc;
  }

  // ═══════════════════════════════════════════════════════════════════
  // BOARD GEOMETRY
  // ═══════════════════════════════════════════════════════════════════

  interface Slot { x: number; y: number; assigned: boolean; layer: number; vacantS?: number }

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
          pos.push({ x: px, y, assigned: false, layer: 1 });
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
            pos.push({ x, y, assigned: false, layer: 1 });
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
    const ROLL_RESISTANCE = 105;  // px/s² — felt drag; a tossed marble bleeds ~300 px/s in ~3 s
    const COLLISION_RESTITUTION = 0.5; // glass on felt: audible in motion, visually calm
    const SEATED_SPRING = 58;     // s⁻² pull a bumped seated marble back into its pocket
    const SEATED_DAMPING = 0.78;  // per-step damping for tiny seated yields
    const POINTER_REACH = 72;     // px screen-space hover acknowledgement radius
    const POINTER_PUSH = 16;      // s⁻² subtle repulsion, capped by pocket spring
    const WELL_REACH = 2.4;       // empty-pocket capture radius, in marble radii
    const WELL_SPRING = 30;       // s⁻² spring toward a captured pocket
    const CAPTURE_SPEED = 120;    // px/s — a marble still rolling hard passes straight over pockets,
                                  // so the fill front grows from the far wall back toward the entry
    const RELEASE_REACH = 4.2;    // marble radii — a captured marble knocked this far escapes
    const SLOW_SPEED = 30;        // px/s — below this a pocketless marble hunts the nearest hole
    const HUNT_REACH = 9;         // marble radii — how far a slow marble hunts an empty pocket
    const HUNT_PULL = 200;        // s⁻² — must beat rolling drag, or hunters freeze in place
    const HUNT_DRAG = 34;         // px/s² — reduced drag while a marble drifts toward a hole
    const DISH_PULL = 0.5;        // s⁻² per px — the table is a shallow bowl: live marbles
                                  // drift toward its centre, so the fill grows centre-out
    const SEAT_DIST = 6;          // px — seating snap distance (collision jitter keeps
                                  // a marble a few px off-axis; the snap is invisible)
    const SEAT_SPEED = 45;        // px/s — seating max planar speed
    const TOSS_MIN_MS = 900;      // a handful of marbles hits the table every 1-3 s
    const TOSS_MAX_MS = 2600;
    const TOSS_SIZE: [number, number] = [3, 6]; // marbles per handful
    const LIVE_CAP = 12;          // rolling marbles at once — the scene stays legible
    const HOLD_FILLED_MS = 1700;  // beat of stillness on a completed template
    const RETIRE_MS = 1300;       // retirement fade+shrink duration
    const CLEAR_STAGGER_MS = 900; // template clear ripples across the board, no blink
    const LIVE_TIMEOUT_S = 9;     // a marble still homeless after this fades off the table
    const PERSPECTIVE_Y = 0.84;   // tabletop foreshortening, applied only in render space
    const PARALLAX_MAX = [4, 5.5, 7]; // px upward shift per depth layer at full scroll
    const GLINT_MS = 1100;        // specular glint sweep duration

    // Mutable sim state
    let width = 0, height = 0;
    let slots: Slot[] = [];
    let marbles: Marble[] = [];
    let marbleRadius = 12;
    const board = { x: 0, y: 0, radius: 0 };
    const tableLane = { left: 0, right: 0, top: 0, bottom: 0 };
    // One groove layer per depth band so scroll parallax shifts each band
    // together with its marbles — seated marbles never detach from pockets.
    const boardBands = [0, 1, 2].map(() => document.createElement('canvas'));
    const boardBandCtxs = boardBands.map((c) => c.getContext('2d')!);
    let shapeIndex = 0;
    let rafId = 0;
    let readyFrameId = 0;
    let tossTimer: ReturnType<typeof window.setTimeout> | 0 = 0;
    let holdTimer: ReturnType<typeof window.setTimeout> | 0 = 0;
    let cyclePhase: 'filling' | 'hold' | 'clearing' = 'filling';
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
    let firstTossPending = true;
    // Frame-budget guard: degradation is one-way per session (no oscillating quality)
    let degraded = false;
    let slowStreak = 0;
    const frameSamples: number[] = [];
    // Perspective & life state (L2): parallax, glint, ambient low-power loop
    let shadowSprite: HTMLCanvasElement | null = null;
    let glassOverlays: (HTMLCanvasElement | null)[] = [null, null, null];
    let parallaxP = 0;
    let parallaxTarget = 0;
    let ambientRafId = 0;
    let glint: { m: Marble; start: number } | null = null;
    let glintTimer: ReturnType<typeof window.setTimeout> | 0 = 0;
    const pointer = { x: -9999, y: -9999, active: false };

    interface Marble {
      x: number; y: number;     // position on the board plane
      px: number; py: number;   // previous position (Verlet)
      pocket: Slot | null;      // captured pocket — a tossed marble starts homeless
      phase: 'live' | 'seated' | 'retiring';
      retireT: number;
      ageS: number;
      stuckS: number;           // seconds spent nearly-still while holding a pocket it cannot roll into
      seq: number;
      layer: number;
      rollAngle: number;
      sprite: HTMLCanvasElement;
      mk: { pal: number; pattern: string; seed: number }; // sprite recipe, for layer rebakes
    }

    function rand(min: number, max: number): number {
      return min + Math.random() * (max - min);
    }

    function slotLayer(slot: Slot): number {
      const ny = (slot.y - board.y) / (board.radius || 1);
      return ny < -0.3 ? 0 : ny > 0.34 ? 2 : 1;
    }

    function createShadowSprite(r: number): HTMLCanvasElement {
      const w = Math.max(2, Math.ceil(r * 3.6));
      const h = Math.max(2, Math.ceil(r * 1.8));
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const g = c.getContext('2d')!;
      g.translate(w / 2, h / 2);
      g.scale(1, h / w);
      const grad = g.createRadialGradient(0, 0, 0, 0, 0, w / 2);
      grad.addColorStop(0, 'rgba(0,0,0,0.5)');
      grad.addColorStop(0.55, 'rgba(0,0,0,0.26)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = grad;
      g.beginPath();
      g.arc(0, 0, w / 2, 0, Math.PI * 2);
      g.fill();
      return c;
    }

    function renderBoardLayer(): void {
      for (let b = 0; b < 3; b++) {
        boardBands[b].width = width * dpr;
        boardBands[b].height = height * dpr;
        boardBandCtxs[b].setTransform(dpr, 0, 0, dpr, 0, 0);
        boardBandCtxs[b].clearRect(0, 0, width, height);
      }
      // The tint/stroke circle is monolithic — it lives on the mid band.
      const midCtx = boardBandCtxs[1];

      for (const bandCtx of boardBandCtxs) {
        bandCtx.save();
        bandCtx.translate(0, board.y);
        bandCtx.scale(1, PERSPECTIVE_Y);
        bandCtx.translate(0, -board.y);
      }

      if (boardTint) {
        midCtx.beginPath();
        midCtx.arc(board.x, board.y, board.radius + marbleRadius * 1.4, 0, Math.PI * 2);
        midCtx.fillStyle = boardTint;
        midCtx.fill();
      }

      if (boardStroke) {
        midCtx.beginPath();
        midCtx.arc(board.x, board.y, board.radius + marbleRadius * 1.4, 0, Math.PI * 2);
        midCtx.strokeStyle = boardStroke;
        midCtx.lineWidth = 1;
        midCtx.stroke();
      }

      if (drawGrooves) {
        for (const slot of slots) drawGroove(boardBandCtxs[slot.layer], slot.x, slot.y, marbleRadius, grooveColor);
      }

      for (const bandCtx of boardBandCtxs) bandCtx.restore();
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
      for (const s of slots) {
        s.assigned = false;
        s.layer = slotLayer(s);
      }
      marbles = [];
      shadowSprite = createShadowSprite(marbleRadius);
      glassOverlays = [0, 1, 2].map((b) => createGlassOverlay(marbleRadius, b, dpr));
      renderBoardLayer();
      updateCounters();
    }

    function makeSeatedMarble(slot: Slot, paletteIdx: number, seed: number): Marble {
      slot.assigned = true;
      const pattern = PATTERNS[paletteIdx % PATTERNS.length];
      return {
        x: slot.x, y: slot.y,
        px: slot.x, py: slot.y,
        pocket: slot,
        phase: 'seated',
        retireT: 0,
        ageS: 0,
        stuckS: 0,
        seq: marbleSeq++,
        layer: slot.layer,
        rollAngle: rand(0, Math.PI * 2),
        sprite: createSprite(marbleRadius, paletteIdx, pattern, seed, slot.layer, dpr),
        mk: { pal: paletteIdx, pattern, seed },
      };
    }

    function layerOffsetY(layer: number): number {
      return -PARALLAX_MAX[layer] * parallaxP;
    }

    function projectY(y: number, layer: number): number {
      return board.y + (y - board.y) * PERSPECTIVE_Y + layerOffsetY(layer);
    }

    function easeParallax(): void {
      const diff = parallaxTarget - parallaxP;
      if (Math.abs(diff) < 0.002) {
        parallaxP = parallaxTarget;
        return;
      }
      parallaxP += diff * 0.06;
    }

    function drawGlint(now: number): void {
      if (!glint) return;
      const m = glint.m;
      const t = (now - glint.start) / GLINT_MS;
      if (t >= 1 || t < 0 || m.phase !== 'seated') {
        glint = null;
        scheduleGlint();
        return;
      }
      const r = marbleRadius * LAYER_SCALE[m.layer];
      const gy = projectY(m.y, m.layer);
      const alpha = Math.sin(Math.PI * t) * 0.45;
      const sweep = (t * 2 - 1) * r * 1.3;
      ctx.save();
      ctx.beginPath();
      ctx.arc(m.x, gy, r * 0.98, 0, Math.PI * 2);
      ctx.clip();
      ctx.translate(m.x, gy);
      ctx.rotate(-0.6);
      const lg = ctx.createLinearGradient(sweep - r * 0.4, 0, sweep + r * 0.4, 0);
      lg.addColorStop(0, 'rgba(255,255,255,0)');
      lg.addColorStop(0.5, `rgba(255,255,255,${alpha.toFixed(3)})`);
      lg.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = lg;
      ctx.fillRect(-r * 1.6, -r * 1.6, r * 3.2, r * 3.2);
      ctx.restore();
    }

    function renderScene(now = performance.now()): void {
      if (!width || !height) return;

      ctx.clearRect(0, 0, width, height);
      for (let b = 0; b < 3; b++) {
        if (boardBands[b].width && boardBands[b].height) {
          ctx.drawImage(boardBands[b], 0, layerOffsetY(b), width, height);
        }
      }

      const renderList = marbles.slice().sort((a, b) => a.y - b.y);

      // Contact shadows first — every marble is glued to the table plane.
      if (shadowSprite) {
        for (const m of renderList) {
          const rT = m.phase === 'retiring' ? Math.max(0, m.retireT) : 0;
          const retireScale = 1 - rT * 0.45;
          const mAlpha = Math.max(0, 1 - rT);
          const sScale = LAYER_SCALE[m.layer] * retireScale;
          const sw = shadowSprite.width * sScale;
          const sh = shadowSprite.height * sScale;
          const gy = projectY(m.y, m.layer);
          ctx.globalAlpha = mAlpha * 0.26 * (m.layer === 0 ? 0.72 : 1);
          ctx.drawImage(
            shadowSprite,
            m.x + marbleRadius * 0.2 - sw / 2,
            gy + marbleRadius * 0.5 - sh / 2,
            sw,
            sh
          );
        }
      }

      for (const m of renderList) {
        const rT = m.phase === 'retiring' ? Math.max(0, m.retireT) : 0;
        const retireScale = 1 - rT * 0.45;
        const mAlpha = Math.max(0, 1 - rT);
        ctx.globalAlpha = mAlpha;
        const dw = (m.sprite.width / dpr) * retireScale;
        const dh = (m.sprite.height / dpr) * retireScale;
        const breath = m.phase === 'seated' ? Math.sin(now * 0.0011 + m.seq * 1.7) * 0.24 : 0;
        const gy = projectY(m.y + breath, m.layer);
        ctx.save();
        ctx.translate(m.x, gy);
        ctx.rotate(m.rollAngle);
        ctx.drawImage(m.sprite, -dw / 2, -dh / 2, dw, dh);
        ctx.restore();
        // Fixed glass lighting, unrotated — the pattern rolls UNDER the light.
        const ov = glassOverlays[m.layer];
        if (ov) {
          const ow = (ov.width / dpr) * retireScale;
          ctx.drawImage(ov, m.x - ow / 2, gy - ow / 2, ow, ow);
        }
      }

      ctx.globalAlpha = 1;
      drawGlint(now);
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

    function startEmptyTable(): void {
      // The show starts on a bare template: handfuls of marbles fill it live.
      for (const slot of slots) slot.assigned = false;
      marbles = [];
      cyclePhase = 'filling';
      renderScene();
    }

    // ── Reduced-motion path: static seeded compositions, slow recompose ──

    function clearReducedMotionCycle(): void {
      if (reducedMotionTimer) {
        window.clearTimeout(reducedMotionTimer);
        reducedMotionTimer = 0;
      }
    }

    function scheduleReducedMotionCycle(): void {
      clearReducedMotionCycle();
    }

    // ── Physics core: Verlet integration + collisions + pocket seating ──

    function velocity(m: Marble): { vx: number; vy: number } {
      return {
        vx: (m.x - m.px) / DT,
        vy: (m.y - m.py) / DT,
      };
    }

    function advanceVerlet(m: Marble, ax: number, ay: number, resistance = ROLL_RESISTANCE): void {
      const oldX = m.x;
      const oldY = m.y;
      let { vx, vy } = velocity(m);
      const speed = Math.hypot(vx, vy);
      if (speed > 0.001) {
        const nextSpeed = Math.max(0, speed - resistance * DT);
        const k = nextSpeed / speed;
        vx *= k;
        vy *= k;
      }
      m.px = m.x;
      m.py = m.y;
      m.x += vx * DT + ax * DT * DT;
      m.y += vy * DT + ay * DT * DT;
      const traveled = Math.hypot(m.x - oldX, m.y - oldY);
      if (traveled > 0.001) m.rollAngle += traveled / Math.max(1, marbleRadius);
    }

    function pointerForceFor(m: Marble): { ax: number; ay: number } {
      if (!pointer.active) return { ax: 0, ay: 0 };
      const sy = projectY(m.y, m.layer);
      const dx = m.x - pointer.x;
      const dy = sy - pointer.y;
      const dist = Math.hypot(dx, dy);
      if (dist <= 0.001 || dist > POINTER_REACH) return { ax: 0, ay: 0 };
      const t = 1 - dist / POINTER_REACH;
      const power = POINTER_PUSH * t * t;
      return {
        ax: (dx / dist) * power,
        ay: (dy / dist) * power / PERSPECTIVE_Y,
      };
    }

    function stepSeated(m: Marble): void {
      const pocket = m.pocket;
      if (!pocket) return;
      const pointerForce = pointerForceFor(m);
      const ax = (pocket.x - m.x) * SEATED_SPRING + pointerForce.ax;
      const ay = (pocket.y - m.y) * SEATED_SPRING + pointerForce.ay;
      const oldX = m.x;
      const oldY = m.y;
      let { vx, vy } = velocity(m);
      vx *= SEATED_DAMPING;
      vy *= SEATED_DAMPING;
      m.px = m.x;
      m.py = m.y;
      m.x += vx * DT + ax * DT * DT;
      m.y += vy * DT + ay * DT * DT;
      const offset = Math.hypot(m.x - pocket.x, m.y - pocket.y);
      if (offset > 4.5) {
        const ux = (m.x - pocket.x) / offset;
        const uy = (m.y - pocket.y) / offset;
        m.x = pocket.x + ux * 4.5;
        m.y = pocket.y + uy * 4.5;
      }
      const moved = Math.hypot(m.x - oldX, m.y - oldY);
      if (moved > 0.001) m.rollAngle += moved / Math.max(1, marbleRadius);
      const nextSpeed = Math.hypot(m.x - m.px, m.y - m.py) / DT;
      if (!pointer.active && offset < 0.04 && nextSpeed < 0.12) {
        m.x = pocket.x;
        m.y = pocket.y;
        m.px = m.x;
        m.py = m.y;
      }
    }

    function holeIsWalled(hole: Slot): boolean {
      // A hole ringed by seated marbles cannot be rolled into from outside.
      const ring = marbleRadius * 2.12 * 1.15;
      let neighbours = 0;
      let assigned = 0;
      for (const s of slots) {
        if (s === hole) continue;
        const d = Math.hypot(s.x - hole.x, s.y - hole.y);
        if (d > ring) continue;
        neighbours++;
        if (s.assigned) assigned++;
      }
      return neighbours >= 5 && assigned >= neighbours - 1;
    }

    // A single ringed hole is one case — the killer is the enclosed CLUSTER:
    // a patch of empty holes whose every escape route is seated. Flood-fill
    // the empty holes from the lattice perimeter (a slot with fewer than 6
    // neighbours opens onto the bare table); whatever the fill cannot reach
    // is enclosed and only migration can feed it. Cached, refreshed on the
    // migration tick — staleness under half a second is harmless.
    let enclosedHoles = new Set<Slot>();

    function computeEnclosedHoles(): Set<Slot> {
      const enclosed = new Set<Slot>();
      if (!slots.length) return enclosed;
      const ring = marbleRadius * 2.12 * 1.15;
      const empty = slots.filter((s) => !s.assigned);
      if (!empty.length) return enclosed;
      const neighboursOf = (a: Slot, pool: Slot[]) =>
        pool.filter((b) => b !== a && Math.hypot(b.x - a.x, b.y - a.y) <= ring);
      const reachable = new Set<Slot>();
      const queue: Slot[] = [];
      for (const h of empty) {
        if (neighboursOf(h, slots).length < 6) {
          reachable.add(h);
          queue.push(h);
        }
      }
      while (queue.length) {
        const h = queue.pop()!;
        for (const n of neighboursOf(h, empty)) {
          if (!reachable.has(n)) {
            reachable.add(n);
            queue.push(n);
          }
        }
      }
      for (const h of empty) if (!reachable.has(h)) enclosed.add(h);
      return enclosed;
    }

    function nearestEmptySlot(x: number, y: number, reach: number, reachableOnly = false): Slot | null {
      let best: Slot | null = null;
      let bestD = reach;
      for (const s of slots) {
        if (s.assigned) continue;
        const d = Math.hypot(s.x - x, s.y - y);
        if (d < bestD && (!reachableOnly || (!holeIsWalled(s) && !enclosedHoles.has(s)))) {
          bestD = d;
          best = s;
        }
      }
      return best;
    }

    // A hole walled inside a full cluster is physically unreachable from the
    // rim. Every ~1.2 s of endgame, the nearest seated neighbour hops one
    // groove over — the hole migrates rimward until a toss can reach it.
    let reseatCounter = 0;

    function migrateWalledHole(): void {
      if (cyclePhase !== 'filling' || !slots.length) return;
      const holes = slots.filter((s) => !s.assigned);
      if (!holes.length || holes.length > slots.length * 0.45) return;
      enclosedHoles = computeEnclosedHoles();
      for (const hole of holes) {
        if (marbles.some((m) => m.phase === 'live' && m.pocket === hole)) {
          hole.vacantS = 0; // a marble is on its way — the hole is spoken for
          continue;
        }
        hole.vacantS = (hole.vacantS ?? 0) + 0.375; // migration tick cadence
        // Reachable holes belong to the tosses; migration feeds what rolling
        // physically cannot: ringed holes, enclosed clusters — and, as the
        // geometry-blind backstop, any hole the tosses have failed to claim
        // for seconds (sparse templates hide walls the lattice tests miss).
        if (!holeIsWalled(hole) && !enclosedHoles.has(hole) && (hole.vacantS ?? 0) < 4) continue;
        let best: Marble | null = null;
        let bestD = marbleRadius * 2.6;
        for (const m of marbles) {
          if (m.phase !== 'seated' || !m.pocket) continue;
          const d = Math.hypot(m.x - hole.x, m.y - hole.y);
          if (d < bestD) {
            bestD = d;
            best = m;
          }
        }
        if (!best || !best.pocket) continue;
        best.pocket.assigned = false;
        best.pocket = hole;
        hole.assigned = true;
        best.phase = 'live';
        best.ageS = 0;
        best.stuckS = 0;
        return; // one hop per tick — the cascade stays calm
      }
    }

    function physicsStep(): void {
      reseatCounter++;
      if (reseatCounter >= 45) {
        reseatCounter = 0;
        migrateWalledHole();
      }
      const emptyNow = slots.reduce((n, s) => n + (s.assigned ? 0 : 1), 0);
      // Endgame generosity: with few holes left the tosses aim straight at
      // them, so arriving marbles may capture while still rolling briskly.
      const captureSpeed = emptyNow <= 10 ? 220 : CAPTURE_SPEED;
      for (const m of marbles) {
        if (m.phase === 'retiring') {
          m.retireT = Math.min(1, m.retireT + STEP_MS / RETIRE_MS);
          continue;
        }
        if (m.phase === 'seated') {
          stepSeated(m);
          continue;
        }
        m.ageS += DT;
        const speed = Math.hypot(m.x - m.px, m.y - m.py) / DT;
        // The dished tabletop: a gentle, ever-present pull toward the board
        // centre — marbles spiral inward instead of parking along the rim.
        // The dish only pulls homeless marbles — once a pocket claims one, the
        // spring owns it (a dish bias would park it ~2.5px off the hole forever).
        let ax = m.pocket ? 0 : (board.x - m.x) * DISH_PULL;
        let ay = m.pocket ? 0 : (board.y - m.y) * DISH_PULL;
        let hunting = false;

        // A tossed marble rolls free. Pockets capture it only when it passes
        // close AND slow enough — fast marbles roll straight over the holes.
        if (m.pocket) {
          const dx = m.pocket.x - m.x;
          const dy = m.pocket.y - m.y;
          const dist = Math.hypot(dx, dy);
          if (dist > marbleRadius * RELEASE_REACH) {
            m.pocket.assigned = false; // knocked away — the pocket returns to the pool
            m.pocket = null;
          } else {
            ax += dx * WELL_SPRING;
            ay += dy * WELL_SPRING;
            hunting = true; // pocket spring must not fight full felt drag
            // Blocked by a wall of seated neighbours: spring vs collision reaches
            // equilibrium at v≈0 short of the hole. Count the standstill so the
            // sweep can hand-place the marble instead of hogging the live cap.
            if (speed < 12 && dist > SEAT_DIST) m.stuckS += DT;
            else m.stuckS = 0;
          }
        }
        if (!m.pocket && speed < captureSpeed) {
          const near = nearestEmptySlot(m.x, m.y, marbleRadius * WELL_REACH);
          if (near) {
            near.assigned = true;
            m.pocket = near;
            hunting = true;
          } else if (speed < SLOW_SPEED) {
            const hunt = nearestEmptySlot(m.x, m.y, marbleRadius * HUNT_REACH, true);
            if (hunt) {
              // A slow marble drifts toward the nearest open hole — the pull
              // must beat rolling drag or the hunter freezes mid-table.
              const hx = hunt.x - m.x;
              const hy = hunt.y - m.y;
              const hd = Math.max(1, Math.hypot(hx, hy));
              ax += (hx / hd) * HUNT_PULL;
              ay += (hy / hd) * HUNT_PULL;
              hunting = true;
            } else if (m.ageS > LIVE_TIMEOUT_S || speed < 6) {
              // Nowhere to live — the hand lifts it off the table.
              m.phase = 'retiring';
              m.retireT = 0;
              continue;
            }
          }
        }
        if (!m.pocket && m.ageS > LIVE_TIMEOUT_S) {
          m.phase = 'retiring';
          m.retireT = 0;
          continue;
        }
        advanceVerlet(m, ax, ay, hunting ? HUNT_DRAG : ROLL_RESISTANCE);
      }

      resolveCollisions();
      constrainToTableLane();
      settleAndSweep();
    }

    function resolveCollisions(): void {
      const minD = marbleRadius * 2;
      const minD2 = minD * minD;
      for (let i = 0; i < marbles.length; i++) {
        const a = marbles[i];
        if (a.phase === 'retiring') continue;
        for (let j = i + 1; j < marbles.length; j++) {
          const b = marbles[j];
          if (b.phase === 'retiring') continue;
          if (a.phase === 'seated' && b.phase === 'seated') continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 >= minD2 || d2 === 0) continue;
          const d = Math.sqrt(d2);
          const push = minD - d;
          const ux = dx / d;
          const uy = dy / d;
          const invA = a.phase === 'seated' ? 0.22 : 1;
          const invB = b.phase === 'seated' ? 0.22 : 1;
          const totalInv = invA + invB;
          a.x += ux * push * (invA / totalInv);
          a.y += uy * push * (invA / totalInv);
          b.x -= ux * push * (invB / totalInv);
          b.y -= uy * push * (invB / totalInv);

          const avx = a.x - a.px;
          const avy = a.y - a.py;
          const bvx = b.x - b.px;
          const bvy = b.y - b.py;
          const rel = (avx - bvx) * ux + (avy - bvy) * uy;
          if (rel < 0) {
            const impulse = (-(1 + COLLISION_RESTITUTION) * rel) / totalInv;
            const ia = impulse * invA;
            const ib = impulse * invB;
            a.px -= ux * ia;
            a.py -= uy * ia;
            b.px += ux * ib;
            b.py += uy * ib;
          }
        }
      }
    }

    function clampAxis(value: number, previous: number, min: number, max: number): { value: number; previous: number } {
      const v = value - previous;
      if (value < min) {
        const k = v < 0 ? COLLISION_RESTITUTION : 1;
        return { value: min, previous: min - Math.abs(v) * k };
      }
      if (value > max) {
        const k = v > 0 ? COLLISION_RESTITUTION : 1;
        return { value: max, previous: max + Math.abs(v) * k };
      }
      return { value, previous };
    }

    function bounceInLane(m: Marble): void {
      const x = clampAxis(m.x, m.px, tableLane.left, tableLane.right);
      m.x = x.value;
      m.px = x.previous;
      const y = clampAxis(m.y, m.py, tableLane.top, tableLane.bottom);
      m.y = y.value;
      m.py = y.previous;
    }

    function constrainToTableLane(): void {
      for (const m of marbles) {
        if (m.phase !== 'live') continue;
        bounceInLane(m);
      }
    }

    function seatMarble(m: Marble): void {
      const pocket = m.pocket;
      if (!pocket) return;
      m.x = pocket.x;
      m.y = pocket.y;
      m.px = m.x;
      m.py = m.y;
      if (pocket.layer !== m.layer) {
        // Rebake the sprite for its final depth band (tossed marbles fly at mid depth).
        m.layer = pocket.layer;
        m.sprite = createSprite(marbleRadius, m.mk.pal, m.mk.pattern, m.mk.seed, m.layer, dpr);
      }
      m.phase = 'seated';
    }

    function settleAndSweep(): void {
      for (const m of marbles) {
        if (m.phase !== 'live' || !m.pocket) continue;
        const dist = Math.hypot(m.pocket.x - m.x, m.pocket.y - m.y);
        const speed = Math.hypot(m.x - m.px, m.y - m.py) / DT;
        const forced = m.ageS > LIVE_TIMEOUT_S + 3 || m.stuckS > 1.6;
        if (forced || (dist < SEAT_DIST && speed < SEAT_SPEED)) {
          seatMarble(m);
        }
      }
      for (let i = marbles.length - 1; i >= 0; i--) {
        const m = marbles[i];
        if (m.phase === 'retiring' && m.retireT >= 1) {
          if (m.pocket) m.pocket.assigned = false;
          marbles.splice(i, 1);
        }
      }
      if (cyclePhase === 'clearing' && !marbles.length) {
        // Template cleared — deal the next shape and let the tossing resume.
        shapeIndex = (shapeIndex + 1) % SHAPES.length;
        buildBoard();
        cyclePhase = 'filling';
        scheduleToss(true);
        return;
      }
      checkTemplateComplete();
    }

    // ── Template cycle: fill → beat of stillness → ripple clear → next shape ──

    function checkTemplateComplete(): void {
      if (cyclePhase !== 'filling' || !slots.length) return;
      if (slots.some((s) => !s.assigned)) return;
      if (marbles.some((m) => m.phase !== 'seated')) return;
      cyclePhase = 'hold';
      clearToss();
      holdTimer = window.setTimeout(() => {
        holdTimer = 0;
        beginClear();
      }, HOLD_FILLED_MS);
    }

    function beginClear(): void {
      if (disposed || cyclePhase !== 'hold') return;
      cyclePhase = 'clearing';
      for (const m of marbles) {
        m.phase = 'retiring';
        // Negative retireT = per-marble delay, so the clear ripples across the board.
        m.retireT = -(Math.random() * CLEAR_STAGGER_MS) / RETIRE_MS;
      }
      startLoop();
    }

    // ── The toss: a handful of glass marbles hits the table every 1-3 s ──

    function liveCount(): number {
      let n = 0;
      for (const m of marbles) if (m.phase === 'live') n++;
      return n;
    }

    function spawnToss(): void {
      if (cyclePhase !== 'filling' || !slots.length) return;
      const empty = slots.reduce((n, s) => n + (s.assigned ? 0 : 1), 0);
      if (!empty) return;
      const room = LIVE_CAP - liveCount();
      if (room <= 0) return;
      const wanted = Math.round(rand(TOSS_SIZE[0], TOSS_SIZE[1]));
      const size = Math.min(room, empty + 2, wanted, degraded ? 3 : wanted);
      if (size <= 0) return;

      // One throw = one hand position on the table rim; the handful scatters
      // from it. The lane keeps every toss on the hero's right side.
      const edge = Math.random();
      let ox: number;
      let oy: number;
      if (edge < 0.45) {
        ox = tableLane.right - marbleRadius;
        oy = rand(tableLane.top + marbleRadius, tableLane.bottom - marbleRadius);
      } else if (edge < 0.75) {
        ox = rand(board.x - board.radius * 0.4, tableLane.right - marbleRadius * 2);
        oy = tableLane.bottom - marbleRadius;
      } else {
        ox = rand(board.x - board.radius * 0.4, tableLane.right - marbleRadius * 2);
        oy = tableLane.top + marbleRadius;
      }
      // Late game: aim the throw at the remaining holes so the last marbles
      // do not waste themselves rolling across a full board.
      let aimX = board.x + rand(-0.4, 0.4) * board.radius;
      let aimY = board.y + rand(-0.4, 0.4) * board.radius;
      if (empty <= 8) {
        const holes = slots.filter((s) => !s.assigned);
        const target = holes[Math.floor(Math.random() * holes.length)];
        aimX = target.x + rand(-1.5, 1.5) * marbleRadius;
        aimY = target.y + rand(-1.5, 1.5) * marbleRadius;
      }

      for (let i = 0; i < size; i++) {
        const sx = ox + rand(-1.6, 1.6) * marbleRadius;
        const sy = oy + rand(-1.6, 1.6) * marbleRadius;
        const dx = aimX - sx;
        const dy = aimY - sy;
        const dist = Math.max(1, Math.hypot(dx, dy));
        const speed = rand(340, 470) * Math.max(0.85, Math.min(spawnScale, 1.15));
        const spread = rand(-0.35, 0.35); // per-marble scatter within the throw
        const cosS = Math.cos(spread);
        const sinS = Math.sin(spread);
        const ux = (dx / dist) * cosS - (dy / dist) * sinS;
        const uy = (dx / dist) * sinS + (dy / dist) * cosS;
        const pal = marbleSeq;
        const pattern = PATTERNS[Math.floor(Math.random() * PATTERNS.length)];
        const seed = Math.floor(Math.random() * 99999);
        marbles.push({
          x: sx, y: sy,
          px: sx - ux * speed * DT,
          py: sy - uy * speed * DT,
          pocket: null,
          phase: 'live',
          retireT: 0,
          ageS: 0,
          stuckS: 0,
          seq: marbleSeq++,
          layer: 1,
          rollAngle: rand(0, Math.PI * 2),
          sprite: createSprite(marbleRadius, pal, pattern, seed, 1, dpr),
          mk: { pal, pattern, seed },
        });
      }
      updateCounters();
    }

    function nextTossDelayMs(): number {
      if (firstTossPending) return rand(350, 700);
      return rand(TOSS_MIN_MS, TOSS_MAX_MS) * (degraded ? 1.8 : 1);
    }

    function clearToss(): void {
      if (tossTimer) {
        window.clearTimeout(tossTimer);
        tossTimer = 0;
      }
    }

    function clearHold(): void {
      if (holdTimer) {
        window.clearTimeout(holdTimer);
        holdTimer = 0;
        if (cyclePhase === 'hold') cyclePhase = 'filling';
      }
    }

    function scheduleToss(soon = false): void {
      clearToss();
      if (disposed || reducedMotion || !canvasVisible || !pageVisible || !slots.length) return;
      if (soon) firstTossPending = true;
      tossTimer = window.setTimeout(() => {
        tossTimer = 0;
        firstTossPending = false;
        spawnToss();
        startLoop();
        scheduleToss();
      }, nextTossDelayMs());
    }

    // ── Life at rest: glint + scroll parallax on a low-power ambient loop ──
    // Runs ONLY while a glint plays or parallax eases; physics stays asleep.

    function ambientNeeded(): boolean {
      return glint !== null || Math.abs(parallaxTarget - parallaxP) > 0.002;
    }

    function ambientFrame(now: number): void {
      ambientRafId = 0;
      if (disposed || reducedMotion || !canvasVisible || !pageVisible || rafId) return;
      easeParallax();
      renderScene(now);
      if (ambientNeeded()) ambientRafId = requestAnimationFrame(ambientFrame);
    }

    function startAmbient(): void {
      if (ambientRafId || rafId || disposed || reducedMotion || !canvasVisible || !pageVisible) return;
      if (!ambientNeeded()) return;
      ambientRafId = requestAnimationFrame(ambientFrame);
    }

    function stopAmbient(): void {
      if (!ambientRafId) return;
      cancelAnimationFrame(ambientRafId);
      ambientRafId = 0;
    }

    function clearGlint(): void {
      if (glintTimer) {
        window.clearTimeout(glintTimer);
        glintTimer = 0;
      }
      glint = null;
    }

    function scheduleGlint(): void {
      if (glintTimer) {
        window.clearTimeout(glintTimer);
        glintTimer = 0;
      }
      if (disposed || reducedMotion || !canvasVisible || !pageVisible) return;
      glintTimer = window.setTimeout(() => {
        glintTimer = 0;
        const seated = marbles.filter((m) => m.phase === 'seated');
        if (seated.length) {
          glint = { m: seated[Math.floor(Math.random() * seated.length)], start: performance.now() };
          startAmbient();
        } else {
          scheduleGlint();
        }
      }, rand(10000, 20000));
    }

    const onScroll = (): void => {
      // Parallax binds to SCROLL only — never the pointer. Degraded mode
      // freezes it at zero.
      if (reducedMotion || degraded) return;
      parallaxTarget = Math.min(1, Math.max(0, window.scrollY / Math.max(1, window.innerHeight * 0.9)));
      startAmbient();
    };

    const onPointerMove = (event: PointerEvent): void => {
      if (reducedMotion || !canvasVisible || !pageVisible) return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      const screenTop = board.y + (tableLane.top - board.y) * PERSPECTIVE_Y;
      const screenBottom = board.y + (tableLane.bottom - board.y) * PERSPECTIVE_Y;
      pointer.active =
        event.clientX >= tableLane.left - POINTER_REACH &&
        event.clientX <= tableLane.right + POINTER_REACH &&
        event.clientY >= screenTop - POINTER_REACH &&
        event.clientY <= screenBottom + POINTER_REACH;
      if (!pointer.active || rafId) return;
      for (const m of marbles) {
        if (m.phase !== 'seated') continue;
        const sx = m.x;
        const sy = projectY(m.y, m.layer);
        const dx = sx - event.clientX;
        const dy = sy - event.clientY;
        const dist = Math.hypot(dx, dy);
        if (dist > 0.001 && dist < POINTER_REACH) {
          const nudge = Math.min(1.6, (1 - dist / POINTER_REACH) * 2.2);
          m.x += (dx / dist) * nudge;
          m.y += (dy / dist) * nudge / PERSPECTIVE_Y;
        }
      }
      startLoop();
    };

    const onPointerLeave = (): void => {
      pointer.active = false;
    };

    // ── Frame loop: fixed-timestep accumulator, idle power-down ──

    function sceneActive(): boolean {
      return marbles.some((m) => {
        if (m.phase !== 'seated' || !m.pocket) return true;
        const offset = Math.hypot(m.x - m.pocket.x, m.y - m.pocket.y);
        const speed = Math.hypot(m.x - m.px, m.y - m.py) / DT;
        return offset > 0.08 || speed > 0.18;
      });
    }

    function recordFrame(frameMs: number): void {
      frameSamples.push(frameMs);
      if (frameSamples.length > 600) frameSamples.shift();
      if (degraded) return;
      if (frameMs > 20) {
        slowStreak++;
        if (slowStreak >= 90) {
          degraded = true;
          parallaxTarget = 0;
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
      easeParallax();
      renderScene(now);
      recordFrame(frameMs);
      if (sceneActive()) {
        rafId = requestAnimationFrame(tick);
      } else {
        // Board settled: physics sleeps until the next arrival timer wakes it
        accumMs = 0;
        startAmbient();
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
        stopAmbient();
        clearToss();
        clearHold();
        clearGlint();
        parallaxP = 0;
        parallaxTarget = 0;
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
        if (!tossTimer && cyclePhase === 'filling') scheduleToss();
        if (!glintTimer && !glint) scheduleGlint();
        startAmbient();
      } else {
        stopLoop();
        stopAmbient();
        clearToss();
        clearHold();
        clearGlint();
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
      // Rotated sprite blits must resample at best quality or edges shimmer.
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      const rawRadius = Math.min(width, height) * boardScale;
      board.radius = width >= 901 ? Math.min(rawRadius, width * 0.155, height * 0.31) : rawRadius;
      const requestedX = width / 2 + width * boardOffsetX;
      const safeX = width >= 901 ? width * 0.82 : requestedX;
      board.x = Math.min(width - board.radius - 32, Math.max(requestedX, safeX));
      board.y = height / 2 + height * boardOffsetY;
      marbleRadius = Math.max(12, board.radius * 0.115); // chunky glass: rolling reads, a template fills in ~1 min
      tableLane.left = Math.max(board.x - board.radius - marbleRadius * 2.4, width >= 901 ? width * 0.58 : 0);
      tableLane.right = width - marbleRadius * 1.2;
      tableLane.top = Math.max(36, board.y - board.radius * 1.25);
      tableLane.bottom = Math.min(height - 34, board.y + board.radius * 1.25);
      if (reducedMotion) {
        buildBoard();
        renderStaticBoard();
        scheduleReducedMotionCycle();
      } else {
        clearReducedMotionCycle();
        clearHold();
        buildBoard();
        startEmptyTable();
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
        version: 'glass-v5',
        frames: frameSamples,
        dump: () => ({
          board: { x: board.x, y: board.y, r: board.radius, mr: marbleRadius },
          lane: { ...tableLane },
          holes: slots.filter((s) => !s.assigned).map((s) => ({ x: Math.round(s.x), y: Math.round(s.y), walled: holeIsWalled(s) })),
          live: marbles.filter((m) => m.phase !== 'seated').map((m) => ({
            phase: m.phase,
            x: Math.round(m.x), y: Math.round(m.y),
            v: Math.round(Math.hypot(m.x - m.px, m.y - m.py) / DT),
            age: +m.ageS.toFixed(1),
            stuck: +m.stuckS.toFixed(1),
            hasPocket: !!m.pocket,
            pDist: m.pocket ? Math.round(Math.hypot(m.pocket.x - m.x, m.pocket.y - m.y)) : -1,
          })),
          cyclePhase,
        }),
        stats: () => {
          const xs = frameSamples.slice().sort((a, b) => a - b);
          const n = xs.length;
          const avg = n ? xs.reduce((s, v) => s + v, 0) / n : 0;
          const p95 = n ? xs[Math.min(n - 1, Math.floor(n * 0.95))] : 0;
          return {
            n, avg, p95, degraded,
            marbles: marbles.length,
            seated: seatedCount(),
            slots: slots.length,
            parallax: parallaxP,
          };
        },
        // Degradation-path levers for tuning sessions — probe is opt-in only
        forceDegrade: () => {
          degraded = true;
          parallaxTarget = 0;
          startLoop();
        },
        spawnNow: () => {
          spawnToss();
          startLoop();
        },
      };
    }

    ensureCanvasReady();
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    onScroll(); // reload mid-page starts with the right parallax target

    // Cleanup on unmount
    return () => {
      disposed = true;
      stopLoop();
      stopAmbient();
      if (readyFrameId) cancelAnimationFrame(readyFrameId);
      if (resizeFrameId) cancelAnimationFrame(resizeFrameId);
      clearToss();
      clearHold();
      clearGlint();
      clearReducedMotionCycle();
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
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
