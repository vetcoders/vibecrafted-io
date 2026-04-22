import "./disclose-version.DsnmJJEf.js";
import {
  u as ce,
  t as de,
  p as he,
  a as fe,
  g as C,
  s as N,
  b as ht,
  c as Y,
  d as ft,
  r as H,
  e as ge,
} from "./runtime.QfC15RoP.js";
import { s as gt } from "./render.CqgMSlkN.js";
import { a as ue, f as me } from "./template.DrTY0w-c.js";
import { b as be } from "./this.MJJ6CZzJ.js";
import { p as ve } from "./props.DDrYma4F.js";
import { g as Me } from "./index.CFQc2B1F.js";
var pe = me(
  '<figure class="hero-canvas svelte-1p3csor" id="showcase"><canvas id="marbleCanvas" aria-hidden="true" class="svelte-1p3csor"></canvas> <div class="hero-canvas-stats svelte-1p3csor" aria-hidden="true"><span> <strong class="svelte-1p3csor"> </strong></span> <span> <strong class="svelte-1p3csor"> </strong></span></div></figure>',
);
function ze(Kt, xt) {
  fe(xt, !0);
  let Ut = ve(xt, "lang", 3, "en"),
    ut = ht(0),
    mt = ht("0%"),
    et = ht(void 0),
    R = ht(!1),
    zt = ge(() => Me(Ut()).sections.marbleCanvas);
  function Lt(e) {
    return {
      r: parseInt(e.slice(1, 3), 16),
      g: parseInt(e.slice(3, 5), 16),
      b: parseInt(e.slice(5, 7), 16),
    };
  }
  function I(e, a = 1) {
    return `rgba(${e.r},${e.g},${e.b},${a})`;
  }
  function J(e, a) {
    return {
      r: Math.min(255, e.r + a),
      g: Math.min(255, e.g + a),
      b: Math.min(255, e.b + a),
    };
  }
  function At(e, a) {
    return {
      r: Math.max(0, e.r - a),
      g: Math.max(0, e.g - a),
      b: Math.max(0, e.b - a),
    };
  }
  const at = [
      { base: "#d97757", accent: "#f4c89a", name: "amber" },
      { base: "#6a9bcc", accent: "#c2ddf0", name: "ocean" },
      { base: "#788c5d", accent: "#bdd4a0", name: "forest" },
      { base: "#b0aea5", accent: "#e8e6dc", name: "smoke" },
      { base: "#c46b8a", accent: "#f0c4d4", name: "rose" },
      { base: "#8b7ec8", accent: "#cdc4ef", name: "amethyst" },
      { base: "#cc8844", accent: "#f0d4a0", name: "honey" },
      { base: "#5ba3a3", accent: "#a8dede", name: "teal" },
    ],
    nt = ["catseye", "swirl", "galaxy", "clear", "solid"];
  function Xt(e) {
    let a = e;
    return () => {
      ((a |= 0), (a = (a + 1831565813) | 0));
      let r = Math.imul(a ^ (a >>> 15), 1 | a);
      return (
        (r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r),
        ((r ^ (r >>> 14)) >>> 0) / 4294967296
      );
    };
  }
  function Rt(e, a, r, i) {
    const l = (e * 2 + 4) * 2,
      g = document.createElement("canvas");
    ((g.width = l), (g.height = l));
    const t = g.getContext("2d"),
      c = l / 2,
      d = l / 2,
      n = e,
      p = at[a % at.length],
      u = Lt(p.base),
      m = Lt(p.accent),
      w = Xt(i);
    (t.beginPath(),
      t.ellipse(
        c + n * 0.05,
        d + n * 0.82,
        n * 0.6,
        n * 0.18,
        0,
        0,
        Math.PI * 2,
      ),
      (t.fillStyle = "rgba(0,0,0,0.22)"),
      t.fill(),
      t.save(),
      t.beginPath(),
      t.arc(c, d, n, 0, Math.PI * 2),
      t.clip());
    const x = t.createRadialGradient(
      c - n * 0.3,
      d - n * 0.35,
      n * 0.05,
      c + n * 0.1,
      d + n * 0.1,
      n * 1.1,
    );
    if (
      (x.addColorStop(0, I(J(u, 60), 0.95)),
      x.addColorStop(0.35, I(u, 0.92)),
      x.addColorStop(0.7, I(At(u, 25), 0.9)),
      x.addColorStop(1, I(At(u, 55), 0.85)),
      (t.fillStyle = x),
      t.fillRect(0, 0, l, l),
      r === "catseye")
    ) {
      const S = w() * Math.PI;
      (t.save(), t.translate(c, d), t.rotate(S));
      const v = n * 0.22 + w() * n * 0.15,
        M = t.createLinearGradient(0, -v * 1.5, 0, v * 1.5);
      (M.addColorStop(0, "rgba(255,255,255,0)"),
        M.addColorStop(0.25, I(m, 0.7)),
        M.addColorStop(0.5, I(J(m, 40), 0.85)),
        M.addColorStop(0.75, I(m, 0.7)),
        M.addColorStop(1, "rgba(255,255,255,0)"),
        (t.fillStyle = M),
        t.fillRect(-n * 1.1, -v, n * 2.2, v * 2),
        (t.strokeStyle = I(J(m, 60), 0.5)),
        (t.lineWidth = 1),
        t.beginPath(),
        t.moveTo(-n * 0.9, 0),
        t.lineTo(n * 0.9, 0),
        t.stroke(),
        t.restore());
    } else if (r === "swirl") {
      (t.save(), t.translate(c, d));
      let S = w() * Math.PI * 2;
      for (let v = 0; v < 2; v++) {
        t.beginPath();
        const M = n * 0.12 + w() * n * 0.1;
        for (let y = 0; y < Math.PI * 3; y += 0.08) {
          const O = n * 0.1 + (y / (Math.PI * 3)) * n * 0.85,
            L = Math.cos(S + y) * O,
            W = Math.sin(S + y) * O;
          y === 0 ? t.moveTo(L, W) : t.lineTo(L, W);
        }
        t.lineWidth = M;
        const E = v === 0 ? m : J(u, 35);
        ((t.strokeStyle = I(E, 0.55)),
          (t.lineCap = "round"),
          t.stroke(),
          (S += Math.PI * 0.7));
      }
      t.restore();
    } else if (r === "galaxy") {
      (t.save(), t.translate(c, d));
      const S = 15 + Math.floor(w() * 20);
      for (let M = 0; M < S; M++) {
        const E = w() * Math.PI * 2,
          y = w() * n * 0.8,
          O = 0.5 + w() * 2,
          L = w() > 0.5 ? m : J(u, 40);
        (t.beginPath(),
          t.arc(Math.cos(E) * y, Math.sin(E) * y, O, 0, Math.PI * 2),
          (t.fillStyle = I(L, 0.4 + w() * 0.35)),
          t.fill());
      }
      const v = t.createRadialGradient(0, 0, 0, 0, 0, n * 0.4);
      (v.addColorStop(0, I(m, 0.25)),
        v.addColorStop(1, "rgba(0,0,0,0)"),
        (t.fillStyle = v),
        t.beginPath(),
        t.arc(0, 0, n * 0.4, 0, Math.PI * 2),
        t.fill(),
        t.restore());
    } else if (r === "clear") {
      ((t.fillStyle = "rgba(255,255,255,0.12)"), t.fillRect(0, 0, l, l));
      const S = t.createRadialGradient(c, d, 0, c, d, n * 0.45);
      (S.addColorStop(0, I(m, 0.6)),
        S.addColorStop(0.6, I(u, 0.35)),
        S.addColorStop(1, "rgba(0,0,0,0)"),
        (t.fillStyle = S),
        t.beginPath(),
        t.arc(c, d, n * 0.5, 0, Math.PI * 2),
        t.fill());
    }
    const _ = t.createRadialGradient(
      c + n * 0.2,
      d + n * 0.35,
      n * 0.02,
      c + n * 0.15,
      d + n * 0.3,
      n * 0.45,
    );
    (_.addColorStop(0, "rgba(255,255,255,0.26)"),
      _.addColorStop(1, "rgba(255,255,255,0)"),
      (t.fillStyle = _),
      t.fillRect(0, 0, l, l));
    const A = t.createRadialGradient(
      c - n * 0.28,
      d - n * 0.32,
      n * 0.02,
      c - n * 0.15,
      d - n * 0.2,
      n * 0.5,
    );
    (A.addColorStop(0, "rgba(255,255,255,0.98)"),
      A.addColorStop(0.12, "rgba(255,255,255,0.72)"),
      A.addColorStop(0.34, "rgba(255,255,255,0.24)"),
      A.addColorStop(0.62, "rgba(255,255,255,0.08)"),
      A.addColorStop(1, "rgba(255,255,255,0)"),
      (t.fillStyle = A),
      t.fillRect(0, 0, l, l));
    const q = t.createRadialGradient(c, d, n * 0.75, c, d, n);
    return (
      q.addColorStop(0, "rgba(0,0,0,0)"),
      q.addColorStop(0.8, "rgba(0,0,0,0.08)"),
      q.addColorStop(1, "rgba(0,0,0,0.28)"),
      (t.fillStyle = q),
      t.fillRect(0, 0, l, l),
      t.restore(),
      g
    );
  }
  function Et(e, a, r, i) {
    const f = [],
      l = i * 2.12,
      g = l * 0.866;
    let t = 0;
    for (let c = a - r + i; c <= a + r - i; c += g) {
      const d = t % 2 ? l / 2 : 0;
      for (let n = e - r + i; n <= e + r - i; n += l) {
        const p = n + d,
          u = p - e,
          m = c - a;
        Math.sqrt(u * u + m * m) + i * 0.85 <= r &&
          f.push({ x: p, y: c, assigned: !1 });
      }
      t++;
    }
    return f;
  }
  function Zt(e, a, r, i) {
    (e.beginPath(), e.arc(a, r, i * 0.95, 0, Math.PI * 2));
    const f = e.createRadialGradient(
      a - i * 0.1,
      r - i * 0.1,
      i * 0.2,
      a,
      r,
      i * 0.95,
    );
    (f.addColorStop(0, "rgba(0,0,0,0.28)"),
      f.addColorStop(0.6, "rgba(0,0,0,0.18)"),
      f.addColorStop(1, "rgba(0,0,0,0.05)"),
      (e.fillStyle = f),
      e.fill(),
      e.beginPath(),
      e.arc(a, r, i * 0.72, 0, Math.PI * 2),
      (e.strokeStyle = "rgba(0,0,0,0.12)"),
      (e.lineWidth = 0.8),
      e.stroke(),
      e.beginPath(),
      e.arc(a, r, i * 0.5, 0, Math.PI * 2),
      (e.strokeStyle = "rgba(0,0,0,0.08)"),
      (e.lineWidth = 0.5),
      e.stroke(),
      e.beginPath(),
      e.arc(a, r, i * 0.88, Math.PI * 0.9, Math.PI * 1.6),
      (e.strokeStyle = "rgba(176,174,165,0.07)"),
      (e.lineWidth = 1),
      e.stroke());
  }
  function kt(e) {
    for (let a = e.length - 1; a > 0; a--) {
      const r = Math.floor(Math.random() * (a + 1));
      [e[a], e[r]] = [e[r], e[a]];
    }
    return e;
  }
  function $(e, a, r, i, f) {
    return Et(e, a, r, i).filter((l) => {
      const g = (l.x - e) / r,
        t = (l.y - a) / r;
      return f(g, t);
    });
  }
  function K(e, a) {
    return Math.sqrt(e * e + a * a);
  }
  function Tt(e, a, r, i) {
    return (
      (Math.abs(e) <= r && Math.abs(a) <= i) ||
      (Math.abs(a) <= r && Math.abs(e) <= i)
    );
  }
  const rt = [
    { name: "circle", build: (e, a, r, i) => Et(e, a, r, i) },
    {
      name: "ring",
      build: (e, a, r, i) =>
        $(e, a, r, i, (f, l) => {
          const g = K(f, l);
          return g >= 0.46 && g <= 0.9;
        }),
    },
    {
      name: "triangle",
      build: (e, a, r, i) => {
        const f = [],
          l = i * 2.12,
          g = l * 0.866,
          t = r * 1.6,
          c = r * 1.8,
          d = a - t * 0.45;
        for (let n = d; n <= d + t; n += g) {
          const u = ((n - d) / t) * c;
          for (let m = e - u / 2; m <= e + u / 2; m += l)
            f.push({ x: m, y: n, assigned: !1 });
        }
        return f;
      },
    },
    {
      name: "diamond",
      build: (e, a, r, i) =>
        $(e, a, r, i, (f, l) => Math.abs(f) + Math.abs(l) * 0.92 <= 0.98),
    },
    {
      name: "star",
      build: (e, a, r, i) =>
        $(e, a, r, i, (f, l) => {
          const g = Math.atan2(l, f),
            t = K(f, l),
            c =
              0.86 *
              (0.45 +
                0.55 *
                  Math.pow(Math.abs(Math.cos(2.5 * g - Math.PI / 2)), 0.6));
          return t <= c;
        }),
    },
    {
      name: "red-cross",
      build: (e, a, r, i) => $(e, a, r, i, (f, l) => Tt(f, l, 0.16, 0.74)),
    },
    {
      name: "cross-in-circle",
      build: (e, a, r, i) =>
        $(e, a, r, i, (f, l) => {
          const g = K(f, l);
          return (g >= 0.66 && g <= 0.9) || Tt(f, l, 0.12, 0.58);
        }),
    },
    {
      name: "hexagon",
      build: (e, a, r, i) =>
        $(e, a, r, i, (f, l) => Math.abs(f) * 0.9 + Math.abs(l) * 0.58 <= 0.92),
    },
    {
      name: "crescent",
      build: (e, a, r, i) =>
        $(e, a, r, i, (f, l) => {
          const g = K(f + 0.12, l),
            t = K(f - 0.22, l);
          return g <= 0.88 && t >= 0.54;
        }),
    },
  ];
  ce(() => {
    if (!C(et)) return;
    const e = C(et),
      a = e.getContext("2d"),
      r = window.matchMedia("(prefers-reduced-motion: reduce)");
    N(R, r.matches, !0);
    const i = (s) => {
      N(R, s.matches, !0);
    };
    r.addEventListener("change", i);
    const l =
        /Safari/i.test(navigator.userAgent) &&
        !/Chrome|Chromium|CriOS|EdgiOS|FxiOS/i.test(navigator.userAgent)
          ? 1.5
          : 2,
      g = Math.max(1, Math.min(window.devicePixelRatio || 1, l));
    let t = 0,
      c = 0,
      d = [],
      n = [],
      p = 12;
    const u = { x: 0, y: 0, radius: 0 },
      m = document.createElement("canvas"),
      w = m.getContext("2d");
    let x = 0,
      _ = 3,
      A = 1,
      q = performance.now(),
      S = 700 + Math.random() * 300,
      v = !1,
      M = 1,
      E = 0,
      y = 0,
      O = 0,
      L = 0,
      W = 0,
      B = !1,
      ot = !0,
      st = document.visibilityState === "visible",
      U = 0,
      Mt,
      pt;
    function St(s, b) {
      return s + Math.random() * (b - s);
    }
    function Dt(s) {
      if (rt.length <= 1) return s;
      let b = s;
      for (; b === s; ) b = Math.floor(Math.random() * rt.length);
      return b;
    }
    function ae() {
      ((m.width = t * g),
        (m.height = c * g),
        w.setTransform(g, 0, 0, g, 0, 0),
        w.clearRect(0, 0, t, c));
      for (const s of d) Zt(w, s.x, s.y, p);
    }
    function yt() {
      N(ut, n.length, !0);
      const s = d.length ? Math.round(re() * 100) : 0;
      N(mt, s + "%");
    }
    function Ct() {
      d = rt[E % rt.length].build(u.x, u.y, u.radius, p);
      for (const b of d) b.assigned = !1;
      ((n = []),
        (x = 0),
        (_ = 3 + Math.floor(Math.random() * 5)),
        (A = 1 + St(0, 0.1)),
        ae(),
        yt());
    }
    function it() {
      if (!t || !c) return;
      (a.clearRect(0, 0, t, c),
        m.width && m.height && a.drawImage(m, 0, 0, t, c));
      const s = ct(),
        b = n.slice().sort((h, o) => h.y - o.y);
      for (const h of b) {
        const o = Math.sqrt(h.vx * h.vx + h.vy * h.vy),
          P = h.z || 0;
        let F = h.settled ? 0.7 + s * 0.3 : 0.5 + Math.min(o * 0.03, 0.4);
        if (((F *= M), P > 0 || o > 0.5)) {
          const D = Math.max(0.4, 1 - P / 180);
          ((a.globalAlpha = F * Math.max(0.05, 0.4 - P / 250)),
            a.beginPath(),
            a.ellipse(
              h.x,
              h.y + p * 0.6 + P * 0.15,
              p * 0.8 * D,
              p * 0.4 * D,
              0,
              0,
              Math.PI * 2,
            ),
            (a.fillStyle = "rgba(0,0,0,1)"),
            a.fill());
        }
        ((a.globalAlpha = F),
          a.drawImage(
            h.sprite,
            h.x - h.sprite.width / 2,
            h.y - P - h.sprite.height / 2,
          ));
      }
      ((a.globalAlpha = 1), yt());
    }
    function wt() {
      if (!d.length) {
        (N(ut, 0), N(mt, "0%"), a.clearRect(0, 0, t, c));
        return;
      }
      for (const h of d) h.assigned = !1;
      n = [];
      const s = Math.min(d.length, Math.max(14, Math.round(d.length * 0.84)));
      (kt(d.slice())
        .slice(0, s)
        .forEach((h, o) => {
          ((h.assigned = !0),
            n.push({
              x: h.x,
              y: h.y,
              vx: 0,
              vy: 0,
              z: 0,
              vz: 0,
              target: h,
              settled: !0,
              chaosLevel: 0,
              sprite: Rt(p, o % at.length, nt[o % nt.length], 9e3 + o),
            }));
        }),
        (x = _),
        (A = 1),
        (v = !1),
        (M = 1),
        it());
    }
    function j() {
      W && (window.clearTimeout(W), (W = 0));
    }
    function lt(s = 3200 + Math.random() * 1200) {
      (j(),
        !(B || !C(R) || !t || !c) &&
          (W = window.setTimeout(() => {
            ((W = 0), !B && C(R) && jt());
          }, s)));
    }
    function $t() {
      const s = (e.parentElement ?? e).getBoundingClientRect();
      return !s.width || !s.height
        ? !1
        : ((t = s.width),
          (c = s.height),
          (e.width = t * g),
          (e.height = c * g),
          a.setTransform(g, 0, 0, g, 0, 0),
          (u.x = t / 2),
          (u.y = c / 2),
          (u.radius = Math.min(t, c) * 0.42),
          (p = Math.max(10, u.radius * 0.08)),
          Ct(),
          (S = 140 + Math.random() * 120),
          C(R) ? (wt(), lt()) : (j(), it()),
          !0);
    }
    function ne() {
      let s = 0;
      for (const b of n) b.settled && s++;
      return s;
    }
    function ct() {
      return d.length ? ne() / d.length : 0;
    }
    function re() {
      const s = ct();
      if (!d.length) return 0;
      const b = Math.max(0, s - 0.92) / 0.08,
        h = (A - 1) * Math.min(1, b);
      return Math.min(A, s + h);
    }
    function oe() {
      return n.every((s) => s.settled);
    }
    function jt() {
      if (!v) {
        if (C(R)) {
          ((E = Dt(E)), Ct(), wt(), lt());
          return;
        }
        ((v = !0),
          (M = 1),
          j(),
          L && window.clearInterval(L),
          (L = window.setInterval(() => {
            ((M -= C(R) ? 0.01 : 0.015),
              it(),
              M <= 0 &&
                (window.clearInterval(L),
                (L = 0),
                (M = 1),
                (E = Dt(E)),
                (v = !1),
                Ct(),
                C(R) && (wt(), lt())));
          }, 16)));
      }
    }
    function se() {
      if (v) return;
      const s = d.filter((k) => !k.assigned);
      if (!s.length) return;
      const b = x + 1,
        h = Math.max(1, _ - x),
        o = Math.max(0, h - 1),
        P = Math.ceil(s.length / h),
        F = St(0.82, 1.18),
        D = b <= 2 ? 1.1 : St(0.92, 1.06);
      let V = Math.max(1, Math.round(P * F * D));
      (h > 1 ? (V = Math.min(V, Math.max(1, s.length - o))) : (V = s.length),
        (x = b));
      const X = 1 - s.length / d.length;
      kt(s);
      const G = 1 - X * 0.8;
      for (let k = 0; k < V; k++) {
        const T = s[k];
        T.assigned = !0;
        const z = u.radius * (1.2 + G * 0.8),
          Z = Math.random() * Math.PI * 2,
          tt = Math.floor(Math.random() * 99999),
          Q = nt[Math.floor(Math.random() * nt.length)],
          le = Math.floor(Math.random() * at.length);
        n.push({
          x: u.x + Math.cos(Z) * z,
          y: u.y + Math.sin(Z) * z - u.radius * G * 0.5,
          vx: (Math.random() - 0.5) * 16 * G,
          vy: (Math.random() - 0.5) * 12 * G + 4,
          z: 40 + Math.random() * 120 + G * 100,
          vz: (Math.random() - 0.2) * 8,
          target: T,
          settled: !1,
          chaosLevel: G,
          sprite: Rt(p, le, Q, tt),
        });
      }
      if (X < 0.6 && n.length > 3 && x < _) {
        const k = (1 - X) * 0.08;
        for (let T = n.length - 1; T >= 0; T--) {
          const z = n[T];
          if (z.settled && Math.random() < k) {
            ((z.settled = !1), (z.target.assigned = !1));
            const Z = Math.random() * Math.PI * 2;
            ((z.vx = Math.cos(Z) * (6 + Math.random() * 8)),
              (z.vy = Math.sin(Z) * (6 + Math.random() * 8) - 4),
              (z.z = 2 + Math.random() * 10),
              (z.vz = 6 + Math.random() * 8));
            const tt = d.filter((Q) => !Q.assigned);
            if (tt.length > 0) {
              const Q = tt[Math.floor(Math.random() * tt.length)];
              ((Q.assigned = !0), (z.target = Q));
            } else ((z.target.assigned = !0), (z.settled = !0));
            break;
          }
        }
      }
      yt();
    }
    function Vt(s) {
      if (B) return;
      const b = Math.min(32, s - q);
      ((q = s),
        (n = n.filter((o) => {
          if (o.settled) return !0;
          const P = o.x > -100 && o.x < t + 100 && o.y > -300 && o.y < c + 100;
          return (!P && o.target && (o.target.assigned = !1), P);
        })));
      const h = ct();
      for (const o of n) {
        if (o.settled) continue;
        const P = o.target.x - o.x,
          F = o.target.y - o.y,
          D = Math.sqrt(P * P + F * F);
        ((o.vz -= 1),
          (o.z += o.vz),
          o.z < 0 &&
            ((o.z = 0), (o.vz = Math.abs(o.vz) > 2 ? -o.vz * 0.38 : 0)));
        const V = o.z > 0,
          X = (o.chaosLevel || 0.5) * (1 - h * 0.8),
          G = D > p * 2.4 ? (Math.random() - 0.5) * 3.2 * X : 0,
          k = (0.018 + h * 0.02) * (V ? 0.25 : 1);
        ((o.vx += P * k + G),
          (o.vy += F * k + G),
          D < p * 0.9 && ((o.vx *= 0.82), (o.vy *= 0.82)));
        let T = 0.87 + h * 0.05;
        (V && (T = 0.97),
          (o.vx *= T),
          (o.vy *= T),
          (o.x += o.vx),
          (o.y += o.vy),
          D < 2 &&
            Math.abs(o.vx) < 0.8 &&
            Math.abs(o.vy) < 0.8 &&
            o.z <= 0 &&
            ((o.settled = !0), (o.x = o.target.x), (o.y = o.target.y)));
      }
      (!v && ct() >= 1 && x >= _ && oe()
        ? jt()
        : ((S -= b), S <= 0 && (se(), (S = 1200 + Math.random() * 900))),
        it(),
        (y = requestAnimationFrame(Vt)));
    }
    function ie() {
      B ||
        C(R) ||
        y ||
        !t ||
        !c ||
        !ot ||
        !st ||
        (j(), (q = performance.now()), (y = requestAnimationFrame(Vt)));
    }
    function Pt() {
      y && (cancelAnimationFrame(y), (y = 0));
    }
    function dt() {
      if (!(B || !t || !c)) {
        if (C(R)) {
          (Pt(), ot && st ? lt() : j());
          return;
        }
        (j(), ot && st ? ie() : Pt());
      }
    }
    function Nt() {
      if (!B) {
        if (!$t()) {
          O = requestAnimationFrame(Nt);
          return;
        }
        dt();
      }
    }
    function It() {
      B ||
        U ||
        (U = requestAnimationFrame(() => {
          ((U = 0), $t() && dt());
        }));
    }
    const Qt = e.parentElement ?? e;
    ((Mt = new ResizeObserver(It)),
      Mt.observe(Qt),
      (pt = new IntersectionObserver(
        (s) => {
          ((ot = s.some((b) => b.isIntersecting)), dt());
        },
        { threshold: 0.12 },
      )),
      pt.observe(Qt));
    const Yt = () => {
        It();
      },
      Ht = (s) => {
        (i(s), It());
      },
      Jt = () => {
        ((st = document.visibilityState === "visible"), dt());
      };
    return (
      r.removeEventListener("change", i),
      r.addEventListener("change", Ht),
      Nt(),
      window.addEventListener("resize", Yt),
      document.addEventListener("visibilitychange", Jt),
      () => {
        ((B = !0),
          Pt(),
          O && cancelAnimationFrame(O),
          U && cancelAnimationFrame(U),
          L && window.clearInterval(L),
          j(),
          Mt?.disconnect(),
          pt?.disconnect(),
          window.removeEventListener("resize", Yt),
          document.removeEventListener("visibilitychange", Jt),
          r.removeEventListener("change", Ht));
      }
    );
  });
  var bt = pe(),
    _t = Y(bt);
  be(
    _t,
    (e) => N(et, e),
    () => C(et),
  );
  var Ft = ft(_t, 2),
    vt = Y(Ft),
    Gt = Y(vt),
    qt = ft(Gt),
    te = Y(qt, !0);
  (H(qt), H(vt));
  var Ot = ft(vt, 2),
    Wt = Y(Ot),
    Bt = ft(Wt),
    ee = Y(Bt, !0);
  (H(Bt),
    H(Ot),
    H(Ft),
    H(bt),
    de(() => {
      (gt(Gt, `${C(zt).marbles ?? ""} `),
        gt(te, C(ut)),
        gt(Wt, `${C(zt).converge ?? ""} `),
        gt(ee, C(mt)));
    }),
    ue(Kt, bt),
    he());
}
export { ze as default };
