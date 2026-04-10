<script lang="ts">
  import { onMount } from 'svelte';

  type Lang = 'en' | 'pl';

  interface Slot {
    x: number;
    y: number;
  }

  interface Marble {
    sprite: HTMLCanvasElement;
    alpha: number;
    drop: number;
    dropSpeed: number;
    shaking: boolean;
    shakeT: number;
  }

  interface Rgb {
    r: number;
    g: number;
    b: number;
  }

  interface Palette {
    base: string;
    accent: string;
  }

  let { lang = 'en' } = $props<{ lang?: Lang }>();

  let canvasEl: HTMLCanvasElement | undefined;

  const PALETTES: Palette[] = [
    { base: '#d97757', accent: '#f4c89a' },
    { base: '#6a9bcc', accent: '#c2ddf0' },
    { base: '#788c5d', accent: '#bdd4a0' },
    { base: '#b0aea5', accent: '#e8e6dc' },
    { base: '#c46b8a', accent: '#f0c4d4' },
    { base: '#8b7ec8', accent: '#cdc4ef' },
    { base: '#cc8844', accent: '#f0d4a0' },
    { base: '#5ba3a3', accent: '#a8dede' },
  ];
  const PATTERNS = ['catseye', 'swirl', 'galaxy', 'clear', 'solid'] as const;
  const LOOP_FILL = [0, 0.15, 0.4, 0.65, 0.85, 1];
  const DIM = 0.22;
  const BRIGHT = 0.92;

  function hexToRgb(hex: string): Rgb {
    return {
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16),
      b: parseInt(hex.slice(5, 7), 16),
    };
  }

  function rgbStr(color: Rgb, alpha = 1) {
    return `rgba(${color.r},${color.g},${color.b},${alpha})`;
  }

  function lighten(color: Rgb, delta: number): Rgb {
    return {
      r: Math.min(255, color.r + delta),
      g: Math.min(255, color.g + delta),
      b: Math.min(255, color.b + delta),
    };
  }

  function darken(color: Rgb, delta: number): Rgb {
    return {
      r: Math.max(0, color.r - delta),
      g: Math.max(0, color.g - delta),
      b: Math.max(0, color.b - delta),
    };
  }

  function mulberry32(seed: number): () => number {
    let value = seed;
    return () => {
      value |= 0;
      value = (value + 0x6d2b79f5) | 0;
      let next = Math.imul(value ^ (value >>> 15), 1 | value);
      next = (next + Math.imul(next ^ (next >>> 7), 61 | next)) ^ next;
      return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffle<T>(items: T[]) {
    for (let index = items.length - 1; index > 0; index -= 1) {
      const target = Math.floor(Math.random() * (index + 1));
      [items[index], items[target]] = [items[target], items[index]];
    }
    return items;
  }

  function createSprite(radius: number, paletteIndex: number, pattern: string, seed: number): HTMLCanvasElement {
    const pad = 4;
    const size = (radius * 2 + pad) * 2;
    const offscreen = document.createElement('canvas');
    offscreen.width = size;
    offscreen.height = size;
    const ctx = offscreen.getContext('2d')!;
    const cx = size / 2;
    const cy = size / 2;
    const palette = PALETTES[paletteIndex % PALETTES.length];
    const base = hexToRgb(palette.base);
    const accent = hexToRgb(palette.accent);
    const rng = mulberry32(seed);

    ctx.beginPath();
    ctx.ellipse(cx + radius * 0.05, cy + radius * 0.82, radius * 0.6, radius * 0.18, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.22)';
    ctx.fill();

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.clip();

    const gradient = ctx.createRadialGradient(cx - radius * 0.3, cy - radius * 0.35, radius * 0.05, cx + radius * 0.1, cy + radius * 0.1, radius * 1.1);
    gradient.addColorStop(0, rgbStr(lighten(base, 60), 0.95));
    gradient.addColorStop(0.35, rgbStr(base, 0.92));
    gradient.addColorStop(0.7, rgbStr(darken(base, 25), 0.9));
    gradient.addColorStop(1, rgbStr(darken(base, 55), 0.85));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    if (pattern === 'catseye') {
      const angle = rng() * Math.PI;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      const ribbonWidth = radius * 0.22 + rng() * radius * 0.15;
      const ribbon = ctx.createLinearGradient(0, -ribbonWidth * 1.5, 0, ribbonWidth * 1.5);
      ribbon.addColorStop(0, 'rgba(255,255,255,0)');
      ribbon.addColorStop(0.25, rgbStr(accent, 0.7));
      ribbon.addColorStop(0.5, rgbStr(lighten(accent, 40), 0.85));
      ribbon.addColorStop(0.75, rgbStr(accent, 0.7));
      ribbon.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = ribbon;
      ctx.fillRect(-radius * 1.1, -ribbonWidth, radius * 2.2, ribbonWidth * 2);
      ctx.strokeStyle = rgbStr(lighten(accent, 60), 0.5);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-radius * 0.9, 0);
      ctx.lineTo(radius * 0.9, 0);
      ctx.stroke();
      ctx.restore();
    } else if (pattern === 'swirl') {
      ctx.save();
      ctx.translate(cx, cy);
      let angle = rng() * Math.PI * 2;
      for (let index = 0; index < 2; index += 1) {
        ctx.beginPath();
        const width = radius * 0.12 + rng() * radius * 0.1;
        for (let step = 0; step < Math.PI * 3; step += 0.08) {
          const spiralRadius = radius * 0.1 + (step / (Math.PI * 3)) * radius * 0.85;
          const x = Math.cos(angle + step) * spiralRadius;
          const y = Math.sin(angle + step) * spiralRadius;
          if (step === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineWidth = width;
        ctx.strokeStyle = rgbStr(index === 0 ? accent : lighten(base, 35), 0.55);
        ctx.lineCap = 'round';
        ctx.stroke();
        angle += Math.PI * 0.7;
      }
      ctx.restore();
    } else if (pattern === 'galaxy') {
      ctx.save();
      ctx.translate(cx, cy);
      const dotCount = 15 + Math.floor(rng() * 20);
      for (let index = 0; index < dotCount; index += 1) {
        const angle = rng() * Math.PI * 2;
        const distance = rng() * radius * 0.8;
        const dotRadius = 0.5 + rng() * 2;
        const dot = rng() > 0.5 ? accent : lighten(base, 40);
        ctx.beginPath();
        ctx.arc(Math.cos(angle) * distance, Math.sin(angle) * distance, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = rgbStr(dot, 0.4 + rng() * 0.35);
        ctx.fill();
      }
      const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 0.4);
      glow.addColorStop(0, rgbStr(accent, 0.25));
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    } else if (pattern === 'clear') {
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      ctx.fillRect(0, 0, size, size);
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.45);
      core.addColorStop(0, rgbStr(accent, 0.6));
      core.addColorStop(0.6, rgbStr(base, 0.35));
      core.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    const refraction = ctx.createRadialGradient(cx + radius * 0.2, cy + radius * 0.35, radius * 0.02, cx + radius * 0.15, cy + radius * 0.3, radius * 0.45);
    refraction.addColorStop(0, 'rgba(255,255,255,0.26)');
    refraction.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = refraction;
    ctx.fillRect(0, 0, size, size);

    const specular = ctx.createRadialGradient(cx - radius * 0.28, cy - radius * 0.32, radius * 0.02, cx - radius * 0.15, cy - radius * 0.2, radius * 0.5);
    specular.addColorStop(0, 'rgba(255,255,255,0.98)');
    specular.addColorStop(0.12, 'rgba(255,255,255,0.72)');
    specular.addColorStop(0.34, 'rgba(255,255,255,0.24)');
    specular.addColorStop(0.62, 'rgba(255,255,255,0.08)');
    specular.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = specular;
    ctx.fillRect(0, 0, size, size);

    const rim = ctx.createRadialGradient(cx, cy, radius * 0.75, cx, cy, radius);
    rim.addColorStop(0, 'rgba(0,0,0,0)');
    rim.addColorStop(0.8, 'rgba(0,0,0,0.08)');
    rim.addColorStop(1, 'rgba(0,0,0,0.28)');
    ctx.fillStyle = rim;
    ctx.fillRect(0, 0, size, size);

    ctx.restore();
    return offscreen;
  }

  function hexGridInCircle(cx: number, cy: number, radius: number, marbleRadius: number): Slot[] {
    const slots: Slot[] = [];
    const spacing = marbleRadius * 2.12;
    const rowHeight = spacing * 0.866;
    let row = 0;

    for (let y = cy - radius + marbleRadius; y <= cy + radius - marbleRadius; y += rowHeight) {
      const offset = row % 2 ? spacing / 2 : 0;
      for (let x = cx - radius + marbleRadius; x <= cx + radius - marbleRadius; x += spacing) {
        const px = x + offset;
        const dx = px - cx;
        const dy = y - cy;
        if (Math.sqrt(dx * dx + dy * dy) + marbleRadius * 0.85 <= radius) {
          slots.push({ x: px, y });
        }
      }
      row += 1;
    }

    return slots;
  }

  function drawGroove(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) {
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.95, 0, Math.PI * 2);
    const groove = ctx.createRadialGradient(x - radius * 0.1, y - radius * 0.1, radius * 0.2, x, y, radius * 0.95);
    groove.addColorStop(0, 'rgba(0,0,0,0.28)');
    groove.addColorStop(0.6, 'rgba(0,0,0,0.18)');
    groove.addColorStop(1, 'rgba(0,0,0,0.05)');
    ctx.fillStyle = groove;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.72, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0,0,0,0.12)';
    ctx.lineWidth = 0.8;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.5, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0,0,0,0.08)';
    ctx.lineWidth = 0.5;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.88, Math.PI * 0.9, Math.PI * 1.6);
    ctx.strokeStyle = 'rgba(176,174,165,0.07)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  onMount(() => {
    if (!canvasEl) return;

    const canvas = canvasEl;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));

    let width = 0;
    let slots: Array<(Slot & { marble: Marble | null })> = [];
    let marbleRadius = 0;
    let hoverRadius = 0;
    let currentLoop = 0;
    let totalSlots = 0;
    let filled: Record<number, true> = {};
    let noise: Record<number, true> = {};
    let mouseX = -1;
    let mouseY = -1;
    let loopTimer = 0;
    let loopDelay = prefersReducedMotion ? 1700 : 2200;
    let resetTimer = 0;
    let rafId = 0;
    let resizeObserver: ResizeObserver | undefined;

    function resizeCanvas() {
      const size = Math.min(canvas.offsetWidth, canvas.offsetHeight);
      if (!size) return false;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      width = canvas.width;
      return true;
    }

    function boardLabel() {
      return lang === 'pl' ? 'Plansza' : 'Board';
    }

    function loopLabel(loop: number) {
      if (lang === 'pl') return `Pętla ${loop}`;
      return `Loop ${loop}`;
    }

    function proximity(x: number, y: number) {
      if (mouseX < 0) return 0;
      const dx = x - mouseX;
      const dy = y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return Math.max(0, 1 - distance / hoverRadius);
    }

    function makeMarble(loop: number): Marble {
      return {
        sprite: createSprite(
          marbleRadius,
          loop % PALETTES.length,
          PATTERNS[Math.floor(Math.random() * PATTERNS.length)],
          Math.floor(Math.random() * 999999)
        ),
        alpha: 0,
        drop: 1 + Math.random() * 2.5,
        dropSpeed: prefersReducedMotion ? 0.02 + Math.random() * 0.02 : 0.03 + Math.random() * 0.04,
        shaking: false,
        shakeT: 0,
      };
    }

    function countFilled() {
      let count = 0;
      for (const key in filled) {
        if (filled[key as unknown as number]) {
          const index = Number(key);
          if (slots[index]?.marble && !slots[index].marble?.shaking) count += 1;
        }
      }
      return count;
    }

    function buildBoard() {
      const radius = width * 0.4;
      marbleRadius = Math.max(4, radius * 0.052);
      hoverRadius = marbleRadius * (prefersReducedMotion ? 6 : 9);
      slots = hexGridInCircle(width / 2, width / 2, radius, marbleRadius).map((slot) => ({ ...slot, marble: null }));
      totalSlots = slots.length;
      filled = {};
      noise = {};
      currentLoop = 0;
      loopTimer = prefersReducedMotion ? 850 : 800;
      resetTimer = 0;
    }

    function advanceLoop() {
      if (currentLoop >= 5) {
        resetTimer = prefersReducedMotion ? 1800 : 3000;
        return;
      }

      currentLoop += 1;
      const target = Math.round(totalSlots * LOOP_FILL[currentLoop]);
      if (currentLoop >= 2) {
        const keys = Object.keys(noise);
        const shakeCount = Math.min(keys.length, 1 + Math.floor(Math.random() * 2));
        for (let index = 0; index < shakeCount; index += 1) {
          const slotIndex = Number(keys[index]);
          if (slots[slotIndex]?.marble) {
            slots[slotIndex].marble!.shaking = true;
            slots[slotIndex].marble!.shakeT = 0;
            delete filled[slotIndex];
            delete noise[slotIndex];
          }
        }
      }

      const empties: number[] = [];
      for (let index = 0; index < slots.length; index += 1) {
        if (!filled[index]) empties.push(index);
      }

      shuffle(empties);
      const current = countFilled();
      const toFill = Math.max(0, target - current);
      const noiseRate = currentLoop <= 2 ? (prefersReducedMotion ? 0.03 : 0.06) : 0;
      for (let index = 0; index < Math.min(toFill, empties.length); index += 1) {
        const slotIndex = empties[index];
        slots[slotIndex].marble = makeMarble(currentLoop);
        filled[slotIndex] = true;
        if (Math.random() < noiseRate) noise[slotIndex] = true;
      }

      loopTimer = loopDelay + Math.random() * (prefersReducedMotion ? 520 : 700);
    }

    function render() {
      ctx.clearRect(0, 0, width, width);
      ctx.beginPath();
      ctx.arc(width / 2, width / 2, width * 0.41, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(176,174,165,0.08)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      for (const slot of slots) {
        if (!slot.marble || slot.marble.shaking) {
          const glow = proximity(slot.x, slot.y);
          ctx.globalAlpha = DIM + glow * (BRIGHT - DIM);
          drawGroove(ctx, slot.x, slot.y, marbleRadius);
        }
      }

      ctx.globalAlpha = 1;

      for (const slot of slots) {
        if (!slot.marble) continue;
        const marble = slot.marble;
        if (marble.shaking) {
          marble.shakeT += prefersReducedMotion ? 0.025 : 0.04;
          if (marble.shakeT >= 1) {
            slot.marble = null;
            continue;
          }
          const wobble = Math.sin(marble.shakeT * 18) * marbleRadius * 0.4 * (1 - marble.shakeT);
          const glow = proximity(slot.x, slot.y);
          ctx.globalAlpha = (DIM + glow * (BRIGHT - DIM)) * (1 - marble.shakeT * marble.shakeT);
          ctx.drawImage(marble.sprite, slot.x + wobble - marble.sprite.width / 2, slot.y - marble.sprite.height / 2);
          continue;
        }

        marble.drop = Math.max(0, marble.drop - marble.dropSpeed);
        const yOffset = -marbleRadius * 2 * marble.drop * marble.drop;
        const glow = proximity(slot.x, slot.y);
        const targetAlpha = DIM + glow * (BRIGHT - DIM);
        marble.alpha += (targetAlpha - marble.alpha) * (prefersReducedMotion ? 0.05 : 0.07);

        if (marble.drop < 0.2) {
          ctx.globalAlpha = 0.12 * (1 - marble.drop / 0.2) * marble.alpha;
          ctx.beginPath();
          ctx.ellipse(slot.x, slot.y + marbleRadius * 0.12, marbleRadius * 0.55, marbleRadius * 0.18, 0, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0,0,0,1)';
          ctx.fill();
        }

        ctx.globalAlpha = marble.alpha;
        ctx.drawImage(marble.sprite, slot.x - marble.sprite.width / 2, slot.y + yOffset - marble.sprite.height / 2);
      }

      ctx.globalAlpha = 1;

      const visible = countFilled();
      let percent = totalSlots > 0 ? Math.round((visible / totalSlots) * 100) : 0;
      if (currentLoop >= 5 && Object.keys(filled).length >= totalSlots) percent = 100;
      ctx.font = `700 ${width * 0.09}px var(--font-head), sans-serif`;
      ctx.fillStyle = '#faf9f5';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${percent}%`, width / 2, width / 2 - width * 0.02);
      ctx.font = `${width * 0.038}px var(--font-head), sans-serif`;
      ctx.fillStyle = '#b0aea5';
      ctx.fillText(currentLoop > 0 ? loopLabel(currentLoop) : boardLabel(), width / 2, width / 2 + width * 0.07);
    }

    function tick() {
      loopTimer -= 16;
      if (resetTimer > 0) {
        resetTimer -= 16;
        if (resetTimer <= 0) {
          buildBoard();
        }
      } else if (loopTimer <= 0) {
        advanceLoop();
      }

      render();
      rafId = window.requestAnimationFrame(tick);
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / (rect.right - rect.left)) * width;
      mouseY = ((event.clientY - rect.top) / (rect.bottom - rect.top)) * width;
    };

    const handleMouseLeave = () => {
      mouseX = -1;
      mouseY = -1;
    };

    const handleResize = () => {
      if (!resizeCanvas()) return;
      buildBoard();
      render();
    };

    resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    if (resizeCanvas()) {
      buildBoard();
      render();
      rafId = window.requestAnimationFrame(tick);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      resizeObserver?.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<canvas bind:this={canvasEl} aria-hidden="true"></canvas>
