<script lang="ts">
  import { onMount } from 'svelte';

  const copyButtonTimers = new WeakMap<HTMLButtonElement, ReturnType<typeof setTimeout>>();

  let canvas: HTMLCanvasElement | undefined;
  let loopCounter: HTMLSpanElement | undefined;
  let coverageCounter: HTMLSpanElement | undefined;

  onMount(() => {
    if (!canvas) return;
    const mountedCanvas = canvas;
    const mountedLoopCounter = loopCounter;
    const mountedCoverageCounter = coverageCounter;
    
    // Polyfills for old code
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var supportsIntersectionObserver = 'IntersectionObserver' in window;
var liveRegion;
var liveRegionTimer;
var appLocale = ((document.documentElement && document.documentElement.lang) || 'en').toLowerCase();
var isPolishLocale = appLocale.indexOf('pl') === 0;
var uiStrings = isPolishLocale ? {
    copy: 'Kopiuj',
    copied: 'Skopiowano',
    copyFailed: 'Błąd kopiowania',
    codeCopied: 'Blok kodu został skopiowany do schowka.',
    copyCodeFallback: 'Kopiowanie się nie udało. Zaznacz polecenie i skopiuj je ręcznie.',
    installCopied: 'Polecenie instalacji zostało skopiowane do schowka.',
    copyInstallFallback: 'Kopiowanie się nie udało. Zaznacz polecenie instalacji i skopiuj je ręcznie.',
    commandCopied: 'Polecenie zostało skopiowane do schowka.',
    copyCommandFallback: 'Kopiowanie się nie udało. Zaznacz polecenie i skopiuj je ręcznie.',
    copyCommandAriaPrefix: 'Skopiuj polecenie: ',
    pipelineCopied: 'Kod pipeline został skopiowany.',
    tooltipCopy: 'Kopiuj',
    previewUnavailable: 'Podgląd jest niedostępny.'
} : {
    copy: 'Copy',
    copied: 'Copied',
    copyFailed: 'Copy failed',
    codeCopied: 'Code block copied to clipboard.',
    copyCodeFallback: 'Copy failed. Select the command and copy it manually.',
    installCopied: 'Install command copied to clipboard.',
    copyInstallFallback: 'Copy failed. Select the install command and copy it manually.',
    commandCopied: 'Command copied to clipboard.',
    copyCommandFallback: 'Copy failed. Select the command and copy it manually.',
    copyCommandAriaPrefix: 'Copy command: ',
    pipelineCopied: 'Pipeline code copied.',
    tooltipCopy: 'Copy',
    previewUnavailable: 'Preview unavailable.'
};

function getLiveRegion(): HTMLDivElement {
    if (liveRegion) return liveRegion;
    liveRegion = document.createElement('div');
    liveRegion.className = 'sr-only';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    document.body.appendChild(liveRegion);
    return liveRegion;
}

function announceUiMessage(message: string | undefined) {
    if (!message) return;
    var region = getLiveRegion();
    clearTimeout(liveRegionTimer);
    region.textContent = '';
    liveRegionTimer = setTimeout(function () {
        region.textContent = message;
    }, 40);
}

function fallbackCopyText(text: string | undefined) {
    if (!text) return false;
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.top = '-9999px';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.focus();
    area.select();
    area.setSelectionRange(0, area.value.length);
    var copied = false;
    try {
        copied = document.execCommand('copy');
    } catch (err) {
        copied = false;
    }
    document.body.removeChild(area);
    return copied;
}

function copyText(text: string | undefined) {
    if (!text) return Promise.resolve(false);
    if (navigator.clipboard?.writeText && window.isSecureContext) {
        return navigator.clipboard.writeText(text).then(function () {
            return true;
        }).catch(function () {
            return fallbackCopyText(text);
        });
    }
    return Promise.resolve(fallbackCopyText(text));
}

function flashCopyButton(btn: HTMLButtonElement | null | undefined, copied: boolean) {
    if (!btn) return;
    var defaultText = btn.getAttribute('data-default-label') || btn.textContent?.trim() || uiStrings.copy;
    btn.textContent = copied ? uiStrings.copied : uiStrings.copyFailed;
    btn.classList.toggle('is-copied', copied);
    btn.classList.toggle('is-error', !copied);
    var existingTimer = copyButtonTimers.get(btn);
    if (existingTimer) {
        clearTimeout(existingTimer);
    }
    var timer = setTimeout(function () {
        btn.textContent = defaultText;
        btn.classList.remove('is-copied', 'is-error');
    }, copied ? 1400 : 1800);
    copyButtonTimers.set(btn, timer);
}


    // ============ GLASS MARBLE RENDERER (shared) ============
var MarbleFactory = (function () {
    // Color helpers
    function hexToRgb(hex) {
        var r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);
        return {r: r, g: g, b: b};
    }

    function rgbStr(c, a) {
        return 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + (a || 1) + ')';
    }

    function lighten(c, pct) {
        return {r: Math.min(255, c.r + pct), g: Math.min(255, c.g + pct), b: Math.min(255, c.b + pct)};
    }

    function darken(c, pct) {
        return {r: Math.max(0, c.r - pct), g: Math.max(0, c.g - pct), b: Math.max(0, c.b - pct)};
    }

    function blend(a, b, t) {
        return {
            r: Math.round(a.r + (b.r - a.r) * t),
            g: Math.round(a.g + (b.g - a.g) * t),
            b: Math.round(a.b + (b.b - a.b) * t)
        };
    }

    var PALETTES = [
        {base: '#d97757', accent: '#f4c89a', name: 'amber'},
        {base: '#6a9bcc', accent: '#c2ddf0', name: 'ocean'},
        {base: '#788c5d', accent: '#bdd4a0', name: 'forest'},
        {base: '#b0aea5', accent: '#e8e6dc', name: 'smoke'},
        {base: '#c46b8a', accent: '#f0c4d4', name: 'rose'},
        {base: '#8b7ec8', accent: '#cdc4ef', name: 'amethyst'},
        {base: '#cc8844', accent: '#f0d4a0', name: 'honey'},
        {base: '#5ba3a3', accent: '#a8dede', name: 'teal'}
    ];
    var PATTERNS = ['catseye', 'swirl', 'galaxy', 'clear', 'solid'];

    function createSprite(radius, paletteIdx, patternType, seed) {
        var pad = 4;
        var s = (radius * 2 + pad) * 2;
        var oc = document.createElement('canvas');
        oc.width = s;
        oc.height = s;
        var g = oc.getContext('2d');
        var cx = s / 2, cy = s / 2, r = radius;
        var pal = PALETTES[paletteIdx % PALETTES.length];
        var base = hexToRgb(pal.base);
        var accent = hexToRgb(pal.accent);
        var rng = mulberry32(seed);

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

        var bg = g.createRadialGradient(cx - r * 0.3, cy - r * 0.35, r * 0.05, cx + r * 0.1, cy + r * 0.1, r * 1.1);
        bg.addColorStop(0, rgbStr(lighten(base, 60), 0.95));
        bg.addColorStop(0.35, rgbStr(base, 0.92));
        bg.addColorStop(0.7, rgbStr(darken(base, 25), 0.9));
        bg.addColorStop(1, rgbStr(darken(base, 55), 0.85));
        g.fillStyle = bg;
        g.fillRect(0, 0, s, s);

        // Pattern layer (inside clip)
        if (patternType === 'catseye') {
            // Single ribbon/vein across the marble
            var angle = rng() * Math.PI;
            g.save();
            g.translate(cx, cy);
            g.rotate(angle);
            var ribW = r * 0.22 + rng() * r * 0.15;
            var ribG = g.createLinearGradient(0, -ribW * 1.5, 0, ribW * 1.5);
            ribG.addColorStop(0, 'rgba(255,255,255,0)');
            ribG.addColorStop(0.25, rgbStr(accent, 0.7));
            ribG.addColorStop(0.5, rgbStr(lighten(accent, 40), 0.85));
            ribG.addColorStop(0.75, rgbStr(accent, 0.7));
            ribG.addColorStop(1, 'rgba(255,255,255,0)');
            g.fillStyle = ribG;
            g.fillRect(-r * 1.1, -ribW, r * 2.2, ribW * 2);
            // thin bright center line
            g.strokeStyle = rgbStr(lighten(accent, 60), 0.5);
            g.lineWidth = 1;
            g.beginPath();
            g.moveTo(-r * 0.9, 0);
            g.lineTo(r * 0.9, 0);
            g.stroke();
            g.restore();
        } else if (patternType === 'swirl') {
            // Two spiral bands of color
            g.save();
            g.translate(cx, cy);
            var sAngle = rng() * Math.PI * 2;
            for (var si = 0; si < 2; si++) {
                g.beginPath();
                var tw = r * 0.12 + rng() * r * 0.1;
                for (var t = 0; t < Math.PI * 3; t += 0.08) {
                    var sr = r * 0.1 + (t / (Math.PI * 3)) * r * 0.85;
                    var sx = Math.cos(sAngle + t) * sr;
                    var sy = Math.sin(sAngle + t) * sr;
                    if (t === 0) g.moveTo(sx, sy); else g.lineTo(sx, sy);
                }
                g.lineWidth = tw;
                var sCol = si === 0 ? accent : lighten(base, 35);
                g.strokeStyle = rgbStr(sCol, 0.55);
                g.lineCap = 'round';
                g.stroke();
                sAngle += Math.PI * 0.7;
            }
            g.restore();
        } else if (patternType === 'galaxy') {
            // Speckled dots inside like a galaxy marble
            g.save();
            g.translate(cx, cy);
            var dotCount = 15 + Math.floor(rng() * 20);
            for (var di = 0; di < dotCount; di++) {
                var da = rng() * Math.PI * 2;
                var dd = rng() * r * 0.8;
                var dr = 0.5 + rng() * 2;
                var dc = rng() > 0.5 ? accent : lighten(base, 40);
                g.beginPath();
                g.arc(Math.cos(da) * dd, Math.sin(da) * dd, dr, 0, Math.PI * 2);
                g.fillStyle = rgbStr(dc, 0.4 + rng() * 0.35);
                g.fill();
            }
            // Central glow
            var gg = g.createRadialGradient(0, 0, 0, 0, 0, r * 0.4);
            gg.addColorStop(0, rgbStr(accent, 0.25));
            gg.addColorStop(1, 'rgba(0,0,0,0)');
            g.fillStyle = gg;
            g.beginPath();
            g.arc(0, 0, r * 0.4, 0, Math.PI * 2);
            g.fill();
            g.restore();
        } else if (patternType === 'clear') {
            // Mostly transparent glass with colored core
            g.fillStyle = 'rgba(255,255,255,0.12)';
            g.fillRect(0, 0, s, s);
            var cg = g.createRadialGradient(cx, cy, 0, cx, cy, r * 0.45);
            cg.addColorStop(0, rgbStr(accent, 0.6));
            cg.addColorStop(0.6, rgbStr(base, 0.35));
            cg.addColorStop(1, 'rgba(0,0,0,0)');
            g.fillStyle = cg;
            g.beginPath();
            g.arc(cx, cy, r * 0.5, 0, Math.PI * 2);
            g.fill();
        }
        // solid = no extra pattern, just the base gradient

        // Glass internal refraction — subtle secondary highlight at bottom
        var rfl = g.createRadialGradient(cx + r * 0.2, cy + r * 0.35, r * 0.02, cx + r * 0.15, cy + r * 0.3, r * 0.45);
        rfl.addColorStop(0, 'rgba(255,255,255,0.26)');
        rfl.addColorStop(1, 'rgba(255,255,255,0)');
        g.fillStyle = rfl;
        g.fillRect(0, 0, s, s);

        // Top specular highlight — the signature glass shine
        var hl = g.createRadialGradient(cx - r * 0.28, cy - r * 0.32, r * 0.02, cx - r * 0.15, cy - r * 0.2, r * 0.5);
        hl.addColorStop(0, 'rgba(255,255,255,0.98)');
        hl.addColorStop(0.12, 'rgba(255,255,255,0.72)');
        hl.addColorStop(0.34, 'rgba(255,255,255,0.24)');
        hl.addColorStop(0.62, 'rgba(255,255,255,0.08)');
        hl.addColorStop(1, 'rgba(255,255,255,0)');
        g.fillStyle = hl;
        g.fillRect(0, 0, s, s);

        // Edge darkening rim
        var rim = g.createRadialGradient(cx, cy, r * 0.75, cx, cy, r);
        rim.addColorStop(0, 'rgba(0,0,0,0)');
        rim.addColorStop(0.8, 'rgba(0,0,0,0.08)');
        rim.addColorStop(1, 'rgba(0,0,0,0.28)');
        g.fillStyle = rim;
        g.fillRect(0, 0, s, s);

        g.restore(); // clip
        return oc;
    }

    // seeded PRNG (Mulberry32)
    function mulberry32(a) {
        return function () {
            a |= 0;
            a = a + 0x6D2B79F5 | 0;
            var t = Math.imul(a ^ a >>> 15, 1 | a);
            t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
            return ((t ^ t >>> 14) >>> 0) / 4294967296;
        };
    }

    return {
        PALETTES: PALETTES,
        PATTERNS: PATTERNS,
        createSprite: createSprite,
        mulberry32: mulberry32
    };
})();

// ============ SOLITAIRE BOARD UTILS (shared) ============
function hexGridInCircle(cx, cy, R, mr) {
    var pos = [], sp = mr * 2.12, rh = sp * 0.866, row = 0;
    for (var y = cy - R + mr; y <= cy + R - mr; y += rh) {
        var off = (row % 2) ? sp / 2 : 0;
        for (var x = cx - R + mr; x <= cx + R - mr; x += sp) {
            var px = x + off, dx = px - cx, dy = y - cy;
            if (Math.sqrt(dx * dx + dy * dy) + mr * 0.85 <= R) pos.push({x: px, y: y});
        }
        row++;
    }
    return pos;
}

// Draw a carved wooden groove — concentric rings like a real solitaire board
function drawGroove(ctx, x, y, r) {
    // Outer shadow ring (depth illusion)
    ctx.beginPath();
    ctx.arc(x, y, r * 0.95, 0, Math.PI * 2);
    var sg = ctx.createRadialGradient(x - r * 0.1, y - r * 0.1, r * 0.2, x, y, r * 0.95);
    sg.addColorStop(0, 'rgba(0,0,0,0.28)');
    sg.addColorStop(0.6, 'rgba(0,0,0,0.18)');
    sg.addColorStop(1, 'rgba(0,0,0,0.05)');
    ctx.fillStyle = sg;
    ctx.fill();
    // Concentric ring — the lathe mark
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
    // Top-left light catch on the rim (like photo reference)
    ctx.beginPath();
    ctx.arc(x, y, r * 0.88, Math.PI * 0.9, Math.PI * 1.6);
    ctx.strokeStyle = 'rgba(176,174,165,0.07)';
    ctx.lineWidth = 1;
    ctx.stroke();
}

function shuffleArr(a) {
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i];
        a[i] = a[j];
        a[j] = t;
    }
    return a;
}


    
    // Execute the showcase logic in this scope
    // ============ HERO MARBLE SHOWCASE (PHYSICS CONVERGENCE) ============
    var animationFrameId = 0;
    var fadeInterval: ReturnType<typeof setInterval> | undefined;
    var showcaseResizeObserver: ResizeObserver | undefined;
    var cleanupShowcase = function () {};
    var isDisposed = false;

(function () {
    var canvas = mountedCanvas;
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var isSafari = /Safari/i.test(navigator.userAgent) && !/Chrome|Chromium|CriOS|EdgiOS|FxiOS/i.test(navigator.userAgent);
    var dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, isSafari ? 1.5 : 2));
    var width = 0, height = 0;
    var slots = [];
    var marbles = [];
    var marbleRadius = 12;
    var board = {x: 0, y: 0, radius: 0};
    var boardLayer = document.createElement('canvas');
    var boardLayerCtx = boardLayer.getContext('2d');
    var currentLoop = 0;
    var targetLoops = 3;
    var targetCoverage = 1;
    var lastAt = performance.now();
    var loopTimer = 0;
    var morphing = false;
    var fadeOutAlpha = 1;

    
    

    function rand(min, max) {
        return min + Math.random() * (max - min);
    }

    function pickLoopGoal() {
        return 3 + Math.floor(Math.random() * 5);
    }

    function pickCoverageGoal() {
        return 1 + rand(0, 0.10);
    }

    // Shape generators — your app is a canvas, you define the shape, agents fill the gaps
    var shapeIndex = 0;

    function buildPredicateShape(cx, cy, R, mr, predicate) {
        return hexGridInCircle(cx, cy, R, mr).filter(function (point) {
            var nx = (point.x - cx) / R;
            var ny = (point.y - cy) / R;
            return predicate(nx, ny, point);
        });
    }

    function circleDistance(nx, ny) {
        return Math.sqrt(nx * nx + ny * ny);
    }

    function inRoundedCross(nx, ny, armHalfWidth, armReach) {
        return (
            (Math.abs(nx) <= armHalfWidth && Math.abs(ny) <= armReach) ||
            (Math.abs(ny) <= armHalfWidth && Math.abs(nx) <= armReach)
        );
    }

    function pickNextShapeIndex(current) {
        if (SHAPES.length <= 1) return current;
        var next = current;
        while (next === current) {
            next = Math.floor(Math.random() * SHAPES.length);
        }
        return next;
    }

    var SHAPES = [
        {
            name: 'circle',
            build: function (cx, cy, R, mr) {
                return hexGridInCircle(cx, cy, R, mr);
            }
        },
        {
            name: 'ring',
            build: function (cx, cy, R, mr) {
                return buildPredicateShape(cx, cy, R, mr, function (nx, ny) {
                    var d = circleDistance(nx, ny);
                    return d >= 0.46 && d <= 0.9;
                });
            }
        },
        {
            name: 'triangle',
            build: function (cx, cy, R, mr) {
                var pos = [], sp = mr * 2.12, rh = sp * 0.866;
                var h = R * 1.6, base = R * 1.8;
                var topY = cy - h * 0.45;
                for (var y = topY; y <= topY + h; y += rh) {
                    var progress = (y - topY) / h;
                    var rowW = progress * base;
                    for (var x = cx - rowW / 2; x <= cx + rowW / 2; x += sp) {
                        pos.push({x: x, y: y});
                    }
                }
                return pos;
            }
        },
        {
            name: 'diamond',
            build: function (cx, cy, R, mr) {
                return buildPredicateShape(cx, cy, R, mr, function (nx, ny) {
                    return (Math.abs(nx) + Math.abs(ny) * 0.92) <= 0.98;
                });
            }
        },
        {
            name: 'star',
            build: function (cx, cy, R, mr) {
                return buildPredicateShape(cx, cy, R, mr, function (nx, ny) {
                    var a = Math.atan2(ny, nx);
                    var d = circleDistance(nx, ny);
                    var r = 0.86 * (0.45 + 0.55 * Math.pow(Math.abs(Math.cos(2.5 * a - Math.PI / 2)), 0.6));
                    return d <= r;
                });
            }
        },
        {
            name: 'red-cross',
            build: function (cx, cy, R, mr) {
                return buildPredicateShape(cx, cy, R, mr, function (nx, ny) {
                    return inRoundedCross(nx, ny, 0.16, 0.74);
                });
            }
        },
        {
            name: 'cross-in-circle',
            build: function (cx, cy, R, mr) {
                return buildPredicateShape(cx, cy, R, mr, function (nx, ny) {
                    var d = circleDistance(nx, ny);
                    return (d >= 0.66 && d <= 0.9) || inRoundedCross(nx, ny, 0.12, 0.58);
                });
            }
        },
        {
            name: 'hexagon',
            build: function (cx, cy, R, mr) {
                return buildPredicateShape(cx, cy, R, mr, function (nx, ny) {
                    return (Math.abs(nx) * 0.9 + Math.abs(ny) * 0.58) <= 0.92;
                });
            }
        },
        {
            name: 'crescent',
            build: function (cx, cy, R, mr) {
                return buildPredicateShape(cx, cy, R, mr, function (nx, ny) {
                    var outer = circleDistance(nx + 0.12, ny);
                    var inner = circleDistance(nx - 0.22, ny);
                    return outer <= 0.88 && inner >= 0.54;
                });
            }
        }
    ];

    function buildBoard() {
        var shapeDef = SHAPES[shapeIndex % SHAPES.length];
        slots = shapeDef.build(board.x, board.y, board.radius, marbleRadius);
        slots.forEach(s => s.assigned = false);
        marbles = [];
        currentLoop = 0;
        targetLoops = pickLoopGoal();
        targetCoverage = pickCoverageGoal();
        renderBoardLayer();
        updateCounters();
    }

    function renderBoardLayer() {
        if (!boardLayerCtx || isDisposed) return;
        boardLayer.width = width * dpr;
        boardLayer.height = height * dpr;
        boardLayerCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        boardLayerCtx.clearRect(0, 0, width, height);

        // Procedural background removed to reveal CSS stone background

        slots.forEach(function (slot) {
            drawGroove(boardLayerCtx, slot.x, slot.y, marbleRadius);
        });
    }

    function resizeCanvas() {
        if (isDisposed) return;
        var rect = canvas.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
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
    }

    window.addEventListener('resize', resizeCanvas);
    if ('ResizeObserver' in window) {
        showcaseResizeObserver = new ResizeObserver(function () {
            resizeCanvas();
        });
        showcaseResizeObserver.observe(canvas);
    }
    cleanupShowcase = function () {
        window.removeEventListener('resize', resizeCanvas);
        showcaseResizeObserver?.disconnect();
        if (fadeInterval) {
            clearInterval(fadeInterval);
            fadeInterval = undefined;
        }
    };
    resizeCanvas();

    function settledCount() {
        var settled = 0;
        for (var i = 0; i < marbles.length; i++) {
            if (marbles[i].settled) settled++;
        }
        return settled;
    }

    function convergenceRatio() {
        if (!slots.length) return 0;
        return settledCount() / slots.length;
    }

    function displayCoverageRatio() {
        var settled = convergenceRatio();
        if (!slots.length) return 0;
        var overshootProgress = Math.max(0, settled - 0.92) / 0.08;
        var overshoot = (targetCoverage - 1) * Math.min(1, overshootProgress);
        return Math.min(targetCoverage, settled + overshoot);
    }

    function allMarblesSettled() {
        for (var i = 0; i < marbles.length; i++) {
            if (!marbles[i].settled) return false;
        }
        return true;
    }

    function startMorph() {
        if (morphing) return;
        morphing = true;
        fadeOutAlpha = 1;
        fadeInterval = setInterval(function () {
            fadeOutAlpha -= 0.015;
            if (fadeOutAlpha <= 0) {
                if (fadeInterval) {
                    clearInterval(fadeInterval);
                    fadeInterval = undefined;
                }
                fadeOutAlpha = 1;
                shapeIndex = pickNextShapeIndex(shapeIndex);
                morphing = false;
                buildBoard();
            }
        }, 16);
    }

    function throwWave() {
        if (morphing) return;
        var unassigned = slots.filter(function (slot) {
            return !slot.assigned;
        });
        if (!unassigned.length) return;

        var nextLoop = currentLoop + 1;
        var remainingLoops = Math.max(1, targetLoops - currentLoop);
        var reserveForLater = Math.max(0, remainingLoops - 1);
        var baseline = Math.ceil(unassigned.length / remainingLoops);
        var variance = rand(0.82, 1.18);
        var pacingBias = nextLoop <= 2 ? 1.1 : rand(0.92, 1.06);
        var toThrow = Math.max(1, Math.round(baseline * variance * pacingBias));

        if (remainingLoops > 1) {
            toThrow = Math.min(toThrow, Math.max(1, unassigned.length - reserveForLater));
        } else {
            toThrow = unassigned.length;
        }

        currentLoop = nextLoop;
        var progress = 1 - (unassigned.length / slots.length);

        shuffleArr(unassigned);

        // Chaos decreases with progress
        var chaosLevel = 1 - progress * 0.8; // 1.0 early → 0.2 late

        for (var i = 0; i < toThrow; i++) {
            var slot = unassigned[i];
            slot.assigned = true;
            // Early: wild spawn positions. Late: closer to target.
            var spawnSpread = board.radius * (1.2 + chaosLevel * 0.8);
            var angle = Math.random() * Math.PI * 2;
            var startX = board.x + Math.cos(angle) * spawnSpread;
            var startY = board.y + Math.sin(angle) * spawnSpread - board.radius * chaosLevel * 0.5;
            var mSeed = Math.floor(Math.random() * 99999);
            var mPattern = MarbleFactory.PATTERNS[Math.floor(Math.random() * MarbleFactory.PATTERNS.length)];
            var mPalIdx = Math.floor(Math.random() * MarbleFactory.PALETTES.length);
            marbles.push({
                x: startX,
                y: startY,
                vx: (Math.random() - 0.5) * 16 * chaosLevel,
                vy: (Math.random() - 0.5) * 12 * chaosLevel + 4,
                z: 40 + Math.random() * 120 + chaosLevel * 100,
                vz: (Math.random() - 0.2) * 8,
                target: slot,
                settled: false,
                chaosLevel: chaosLevel,
                seed: mSeed,
                pattern: mPattern,
                palIdx: mPalIdx,
                sprite: MarbleFactory.createSprite(marbleRadius, mPalIdx, mPattern, mSeed)
            });
        }

        // During early waves: some settled marbles get nudged out to keep the motion alive.
        if (progress < 0.6 && marbles.length > 3 && currentLoop < targetLoops) {
            var dislodgeChance = (1 - progress) * 0.08;
            for (var j = marbles.length - 1; j >= 0; j--) {
                var m = marbles[j];
                if (m.settled && Math.random() < dislodgeChance) {
                    m.settled = false;
                    m.target.assigned = false;
                    var kickAngle = Math.random() * Math.PI * 2;
                    m.vx = Math.cos(kickAngle) * (6 + Math.random() * 8);
                    m.vy = Math.sin(kickAngle) * (6 + Math.random() * 8) - 4;
                    m.z = 2 + Math.random() * 10;
                    m.vz = 6 + Math.random() * 8;
                    // Reassign to a random empty slot
                    var empties = slots.filter(function (s) {
                        return !s.assigned;
                    });
                    if (empties.length > 0) {
                        var newSlot = empties[Math.floor(Math.random() * empties.length)];
                        newSlot.assigned = true;
                        m.target = newSlot;
                    } else {
                        m.target.assigned = true; // put it back
                        m.settled = true;
                    }
                    break; // max 1 dislodge per wave
                }
            }
        }
        updateCounters();
    }

    function updateCounters() {
        if (mountedLoopCounter) mountedLoopCounter.textContent = marbles.length;
        if (mountedCoverageCounter) {
            var pct = slots.length ? Math.round(displayCoverageRatio() * 100) : 0;
            mountedCoverageCounter.textContent = pct + '%';
        }
    }

    function tick(now) {
        if (isDisposed) return;
        var dt = Math.min(32, now - lastAt);
        lastAt = now;

        ctx.clearRect(0, 0, width, height);
        if (boardLayer.width && boardLayer.height) {
            ctx.drawImage(boardLayer, 0, 0, width, height);
        }

        // Remove marbles that flew way off screen
        marbles = marbles.filter(function (m) {
            if (m.settled) return true;
            var inBounds = m.x > -100 && m.x < width + 100 && m.y > -300 && m.y < height + 100;
            if (!inBounds && m.target) {
                m.target.assigned = false;
            }
            return inBounds;
        });

        var conv = convergenceRatio();

        marbles.forEach(m => {
            if (!m.settled) {
                var dx = m.target.x - m.x;
                var dy = m.target.y - m.y;
                var dist = Math.sqrt(dx * dx + dy * dy);

                if (m.z === undefined) {
                    m.z = 0;
                    m.vz = 0;
                }
                m.vz -= 1.0;
                m.z += m.vz;
                if (m.z < 0) {
                    m.z = 0;
                    if (Math.abs(m.vz) > 2.0) {
                        m.vz = -m.vz * 0.38;
                    } else {
                        m.vz = 0;
                    }
                }
                var inAir = m.z > 0;

                var mChaos = (m.chaosLevel || 0.5) * (1 - conv * 0.8);
                var jitter = dist > marbleRadius * 2.4 ? (Math.random() - 0.5) * 3.2 * mChaos : 0;

                var attract = (0.018 + conv * 0.02) * (inAir ? 0.25 : 1.0);
                m.vx += dx * attract + jitter;
                m.vy += dy * attract + jitter;

                if (dist < marbleRadius * 0.9) {
                    m.vx *= 0.82;
                    m.vy *= 0.82;
                }

                var friction = 0.87 + conv * 0.05;
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
        });

        var renderList = marbles.slice().sort((a, b) => a.y - b.y);

        renderList.forEach(m => {
            var sprite = m.sprite;
            var speed = m.vx !== undefined ? Math.sqrt(m.vx * m.vx + m.vy * m.vy) : 0;
            var hover = m.z || 0;

            // Marble alpha: settled marbles are brighter as convergence increases
            var mAlpha = m.settled ? (0.7 + conv * 0.3) : (0.5 + Math.min(speed * 0.03, 0.4));
            mAlpha *= fadeOutAlpha; // fade on shape complete

            if (hover > 0 || speed > 0.5) {
                var shadowScale = Math.max(0.4, 1 - hover / 180);
                var shadowW = marbleRadius * 0.8 * shadowScale;
                var shadowH = marbleRadius * 0.4 * shadowScale;
                var shadowAlpha = Math.max(0.05, 0.4 - hover / 250);

                ctx.globalAlpha = mAlpha * shadowAlpha;
                ctx.beginPath();
                ctx.ellipse(m.x, m.y + marbleRadius * 0.6 + hover * 0.15, shadowW, shadowH, 0, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0,0,0,1)';
                ctx.fill();
            }

            ctx.globalAlpha = mAlpha;
            ctx.drawImage(sprite, m.x - sprite.width / 2, m.y - hover - sprite.height / 2);
        });
        ctx.globalAlpha = 1;

        if (!morphing && convergenceRatio() >= 1 && currentLoop >= targetLoops && allMarblesSettled()) {
            startMorph();
        } else {
            loopTimer -= dt;
            if (loopTimer <= 0) {
                throwWave();
                loopTimer = 1200 + Math.random() * 900;
            }
        }
        updateCounters();

        animationFrameId = requestAnimationFrame(tick);
    }

    loopTimer = 700 + Math.random() * 300;
    animationFrameId = requestAnimationFrame(tick);
})();


    return () => {
        isDisposed = true;
        cleanupShowcase();
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    };
  });
</script>

<figure class="hero-canvas" id="showcase">
  <canvas bind:this={canvas} id="marbleCanvas" aria-hidden="true"></canvas>
  <div class="hero-canvas-stats" aria-hidden="true">
      <span>Marbles <strong bind:this={loopCounter} id="loopCounter">0</strong></span>
      <span>Converge <strong bind:this={coverageCounter} id="coverageCounter">0%</strong></span>
  </div>
</figure>
