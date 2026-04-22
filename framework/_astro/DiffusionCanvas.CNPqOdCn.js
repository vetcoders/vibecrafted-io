import "./disclose-version.DsnmJJEf.js";
import {
  u as Ae,
  p as Ee,
  a as Ge,
  g as ue,
  e as ze,
} from "./runtime.QfC15RoP.js";
import { a as Fe, f as Oe } from "./template.DrTY0w-c.js";
import { b as We } from "./this.MJJ6CZzJ.js";
import { p as $e } from "./props.DDrYma4F.js";
import { g as _e } from "./index.CFQc2B1F.js";
var qe = Oe('<canvas aria-hidden="true"></canvas>');
function Qe(Me, Z) {
  Ge(Z, !0);
  let ve = $e(Z, "lang", 3, "en");
  const ee = ze(() => _e(ve()).sections.diffusionCanvas);
  let D;
  const j = [
      { base: "#d97757", accent: "#f4c89a" },
      { base: "#6a9bcc", accent: "#c2ddf0" },
      { base: "#788c5d", accent: "#bdd4a0" },
      { base: "#b0aea5", accent: "#e8e6dc" },
      { base: "#c46b8a", accent: "#f0c4d4" },
      { base: "#8b7ec8", accent: "#cdc4ef" },
      { base: "#cc8844", accent: "#f0d4a0" },
      { base: "#5ba3a3", accent: "#a8dede" },
    ],
    te = ["catseye", "swirl", "galaxy", "clear", "solid"],
    ne = [0, 0.15, 0.4, 0.65, 0.85, 1],
    W = 0.22,
    N = 0.92;
  function oe(e) {
    return {
      r: parseInt(e.slice(1, 3), 16),
      g: parseInt(e.slice(3, 5), 16),
      b: parseInt(e.slice(5, 7), 16),
    };
  }
  function y(e, n = 1) {
    return `rgba(${e.r},${e.g},${e.b},${n})`;
  }
  function $(e, n) {
    return {
      r: Math.min(255, e.r + n),
      g: Math.min(255, e.g + n),
      b: Math.min(255, e.b + n),
    };
  }
  function ae(e, n) {
    return {
      r: Math.max(0, e.r - n),
      g: Math.max(0, e.g - n),
      b: Math.max(0, e.b - n),
    };
  }
  function Se(e) {
    let n = e;
    return () => {
      ((n |= 0), (n = (n + 1831565813) | 0));
      let r = Math.imul(n ^ (n >>> 15), 1 | n);
      return (
        (r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r),
        ((r ^ (r >>> 14)) >>> 0) / 4294967296
      );
    };
  }
  function re(e) {
    for (let n = e.length - 1; n > 0; n -= 1) {
      const r = Math.floor(Math.random() * (n + 1));
      [e[n], e[r]] = [e[r], e[n]];
    }
    return e;
  }
  function we(e, n, r, b) {
    const h = (e * 2 + 4) * 2,
      T = document.createElement("canvas");
    ((T.width = h), (T.height = h));
    const t = T.getContext("2d"),
      o = h / 2,
      c = h / 2,
      R = j[n % j.length],
      f = oe(R.base),
      g = oe(R.accent),
      p = Se(b);
    (t.beginPath(),
      t.ellipse(
        o + e * 0.05,
        c + e * 0.82,
        e * 0.6,
        e * 0.18,
        0,
        0,
        Math.PI * 2,
      ),
      (t.fillStyle = "rgba(0,0,0,0.22)"),
      t.fill(),
      t.save(),
      t.beginPath(),
      t.arc(o, c, e, 0, Math.PI * 2),
      t.clip());
    const I = t.createRadialGradient(
      o - e * 0.3,
      c - e * 0.35,
      e * 0.05,
      o + e * 0.1,
      c + e * 0.1,
      e * 1.1,
    );
    if (
      (I.addColorStop(0, y($(f, 60), 0.95)),
      I.addColorStop(0.35, y(f, 0.92)),
      I.addColorStop(0.7, y(ae(f, 25), 0.9)),
      I.addColorStop(1, y(ae(f, 55), 0.85)),
      (t.fillStyle = I),
      t.fillRect(0, 0, h, h),
      r === "catseye")
    ) {
      const S = p() * Math.PI;
      (t.save(), t.translate(o, c), t.rotate(S));
      const m = e * 0.22 + p() * e * 0.15,
        u = t.createLinearGradient(0, -m * 1.5, 0, m * 1.5);
      (u.addColorStop(0, "rgba(255,255,255,0)"),
        u.addColorStop(0.25, y(g, 0.7)),
        u.addColorStop(0.5, y($(g, 40), 0.85)),
        u.addColorStop(0.75, y(g, 0.7)),
        u.addColorStop(1, "rgba(255,255,255,0)"),
        (t.fillStyle = u),
        t.fillRect(-e * 1.1, -m, e * 2.2, m * 2),
        (t.strokeStyle = y($(g, 60), 0.5)),
        (t.lineWidth = 1),
        t.beginPath(),
        t.moveTo(-e * 0.9, 0),
        t.lineTo(e * 0.9, 0),
        t.stroke(),
        t.restore());
    } else if (r === "swirl") {
      (t.save(), t.translate(o, c));
      let S = p() * Math.PI * 2;
      for (let m = 0; m < 2; m += 1) {
        t.beginPath();
        const u = e * 0.12 + p() * e * 0.1;
        for (let M = 0; M < Math.PI * 3; M += 0.08) {
          const C = e * 0.1 + (M / (Math.PI * 3)) * e * 0.85,
            k = Math.cos(S + M) * C,
            E = Math.sin(S + M) * C;
          M === 0 ? t.moveTo(k, E) : t.lineTo(k, E);
        }
        ((t.lineWidth = u),
          (t.strokeStyle = y(m === 0 ? g : $(f, 35), 0.55)),
          (t.lineCap = "round"),
          t.stroke(),
          (S += Math.PI * 0.7));
      }
      t.restore();
    } else if (r === "galaxy") {
      (t.save(), t.translate(o, c));
      const S = 15 + Math.floor(p() * 20);
      for (let u = 0; u < S; u += 1) {
        const M = p() * Math.PI * 2,
          C = p() * e * 0.8,
          k = 0.5 + p() * 2,
          E = p() > 0.5 ? g : $(f, 40);
        (t.beginPath(),
          t.arc(Math.cos(M) * C, Math.sin(M) * C, k, 0, Math.PI * 2),
          (t.fillStyle = y(E, 0.4 + p() * 0.35)),
          t.fill());
      }
      const m = t.createRadialGradient(0, 0, 0, 0, 0, e * 0.4);
      (m.addColorStop(0, y(g, 0.25)),
        m.addColorStop(1, "rgba(0,0,0,0)"),
        (t.fillStyle = m),
        t.beginPath(),
        t.arc(0, 0, e * 0.4, 0, Math.PI * 2),
        t.fill(),
        t.restore());
    } else if (r === "clear") {
      ((t.fillStyle = "rgba(255,255,255,0.12)"), t.fillRect(0, 0, h, h));
      const S = t.createRadialGradient(o, c, 0, o, c, e * 0.45);
      (S.addColorStop(0, y(g, 0.6)),
        S.addColorStop(0.6, y(f, 0.35)),
        S.addColorStop(1, "rgba(0,0,0,0)"),
        (t.fillStyle = S),
        t.beginPath(),
        t.arc(o, c, e * 0.5, 0, Math.PI * 2),
        t.fill());
    }
    const x = t.createRadialGradient(
      o + e * 0.2,
      c + e * 0.35,
      e * 0.02,
      o + e * 0.15,
      c + e * 0.3,
      e * 0.45,
    );
    (x.addColorStop(0, "rgba(255,255,255,0.26)"),
      x.addColorStop(1, "rgba(255,255,255,0)"),
      (t.fillStyle = x),
      t.fillRect(0, 0, h, h));
    const P = t.createRadialGradient(
      o - e * 0.28,
      c - e * 0.32,
      e * 0.02,
      o - e * 0.15,
      c - e * 0.2,
      e * 0.5,
    );
    (P.addColorStop(0, "rgba(255,255,255,0.98)"),
      P.addColorStop(0.12, "rgba(255,255,255,0.72)"),
      P.addColorStop(0.34, "rgba(255,255,255,0.24)"),
      P.addColorStop(0.62, "rgba(255,255,255,0.08)"),
      P.addColorStop(1, "rgba(255,255,255,0)"),
      (t.fillStyle = P),
      t.fillRect(0, 0, h, h));
    const L = t.createRadialGradient(o, c, e * 0.75, o, c, e);
    return (
      L.addColorStop(0, "rgba(0,0,0,0)"),
      L.addColorStop(0.8, "rgba(0,0,0,0.08)"),
      L.addColorStop(1, "rgba(0,0,0,0.28)"),
      (t.fillStyle = L),
      t.fillRect(0, 0, h, h),
      t.restore(),
      T
    );
  }
  function ye(e, n, r, b) {
    const d = [],
      h = b * 2.12,
      T = h * 0.866;
    let t = 0;
    for (let o = n - r + b; o <= n + r - b; o += T) {
      const c = t % 2 ? h / 2 : 0;
      for (let R = e - r + b; R <= e + r - b; R += h) {
        const f = R + c,
          g = f - e,
          p = o - n;
        Math.sqrt(g * g + p * p) + b * 0.85 <= r && d.push({ x: f, y: o });
      }
      t += 1;
    }
    return d;
  }
  function Ce(e, n, r, b) {
    (e.beginPath(), e.arc(n, r, b * 0.95, 0, Math.PI * 2));
    const d = e.createRadialGradient(
      n - b * 0.1,
      r - b * 0.1,
      b * 0.2,
      n,
      r,
      b * 0.95,
    );
    (d.addColorStop(0, "rgba(0,0,0,0.28)"),
      d.addColorStop(0.6, "rgba(0,0,0,0.18)"),
      d.addColorStop(1, "rgba(0,0,0,0.05)"),
      (e.fillStyle = d),
      e.fill(),
      e.beginPath(),
      e.arc(n, r, b * 0.72, 0, Math.PI * 2),
      (e.strokeStyle = "rgba(0,0,0,0.12)"),
      (e.lineWidth = 0.8),
      e.stroke(),
      e.beginPath(),
      e.arc(n, r, b * 0.5, 0, Math.PI * 2),
      (e.strokeStyle = "rgba(0,0,0,0.08)"),
      (e.lineWidth = 0.5),
      e.stroke(),
      e.beginPath(),
      e.arc(n, r, b * 0.88, Math.PI * 0.9, Math.PI * 1.6),
      (e.strokeStyle = "rgba(176,174,165,0.07)"),
      (e.lineWidth = 1),
      e.stroke());
  }
  Ae(() => {
    if (!D || typeof window > "u") return;
    const e = D,
      n = e.getContext("2d");
    if (!n) return;
    const r = window.matchMedia("(prefers-reduced-motion: reduce)"),
      b = window.matchMedia("(pointer: fine)");
    let d = r.matches,
      h = b.matches && !d;
    const T = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    let t = 0,
      o = [],
      c = 0,
      R = 0,
      f = 0,
      g = 0,
      p = {},
      I = {},
      x = -1,
      P = -1,
      L = 0,
      S = d ? 1700 : 2200,
      m = 0,
      u = 0,
      M = 0,
      C = 0,
      k = 0,
      E,
      Q,
      G = !0,
      z = document.visibilityState === "visible",
      _ = !1;
    function ie() {
      const a = Math.min(e.offsetWidth, e.offsetHeight);
      return a
        ? ((e.width = a * T), (e.height = a * T), (t = e.width), !0)
        : !1;
    }
    function se() {
      ((h = b.matches && !d),
        (R = c * (d ? 6 : 9)),
        (S = d ? 1700 : 2200),
        h || ((x = -1), (P = -1)));
    }
    function Pe() {
      return G && z && !d;
    }
    function V() {
      u && (cancelAnimationFrame(u), (u = 0));
    }
    function X() {
      (M && (window.clearTimeout(M), (M = 0)),
        C && (window.clearTimeout(C), (C = 0)));
    }
    function Ie(a) {
      const l = de(a);
      return ((l.drop = 0), (l.dropSpeed = 0), (l.alpha = N * 0.96), l);
    }
    function Y(a = f === 0 ? 800 : 2200 + Math.random() * 520) {
      _ ||
        !d ||
        !G ||
        !z ||
        M ||
        (M = window.setTimeout(() => {
          ((M = 0), !(_ || !d || !G || !z) && ke());
        }, a));
    }
    function ce(a = 3200) {
      _ ||
        !d ||
        !G ||
        !z ||
        C ||
        (C = window.setTimeout(() => {
          ((C = 0), !(_ || !d || !G || !z) && (B(), A(), Y(1200)));
        }, a));
    }
    function ke() {
      if (f >= 5) {
        ce();
        return;
      }
      f += 1;
      const a = Math.round(g * ne[f]),
        l = [];
      for (let w = 0; w < o.length; w += 1) p[w] || l.push(w);
      re(l);
      const s = K(),
        i = Math.max(0, a - s);
      for (let w = 0; w < Math.min(i, l.length); w += 1) {
        const v = l[w];
        ((o[v].marble = Ie(f)), (p[v] = !0));
      }
      (A(), f >= 5 ? ce() : Y());
    }
    function q() {
      if (!G || !z) {
        (V(), X(), A());
        return;
      }
      if (d) {
        (V(), Y(), A());
        return;
      }
      (X(), u || (u = window.requestAnimationFrame(fe)));
    }
    function Te() {
      return ue(ee).boardLabel;
    }
    function Re(a) {
      return `${ue(ee).loopPrefix} ${a}`;
    }
    function J(a, l) {
      if (!h || x < 0) return 0;
      const s = a - x,
        i = l - P,
        w = Math.sqrt(s * s + i * i);
      return Math.max(0, 1 - w / R);
    }
    function de(a) {
      return {
        sprite: we(
          c,
          a % j.length,
          te[Math.floor(Math.random() * te.length)],
          Math.floor(Math.random() * 999999),
        ),
        alpha: 0,
        drop: 1 + Math.random() * 2.5,
        dropSpeed: d
          ? 0.02 + Math.random() * 0.02
          : 0.03 + Math.random() * 0.04,
        shaking: !1,
        shakeT: 0,
      };
    }
    function K() {
      let a = 0;
      for (const l in p)
        if (p[l]) {
          const s = Number(l);
          o[s]?.marble && !o[s].marble?.shaking && (a += 1);
        }
      return a;
    }
    function B() {
      const a = t * 0.4;
      ((c = Math.max(4, a * 0.052)),
        se(),
        (o = ye(t / 2, t / 2, a, c).map((l) => ({ ...l, marble: null }))),
        (g = o.length),
        (p = {}),
        (I = {}),
        (f = 0),
        (L = d ? 850 : 800),
        (m = 0));
    }
    function xe() {
      if (f >= 5) {
        m = d ? 1800 : 3e3;
        return;
      }
      f += 1;
      const a = Math.round(g * ne[f]);
      if (f >= 2) {
        const v = Object.keys(I),
          F = Math.min(v.length, 1 + Math.floor(Math.random() * 2));
        for (let H = 0; H < F; H += 1) {
          const O = Number(v[H]);
          o[O]?.marble &&
            ((o[O].marble.shaking = !0),
            (o[O].marble.shakeT = 0),
            delete p[O],
            delete I[O]);
        }
      }
      const l = [];
      for (let v = 0; v < o.length; v += 1) p[v] || l.push(v);
      re(l);
      const s = K(),
        i = Math.max(0, a - s),
        w = f <= 2 ? (d ? 0.03 : 0.06) : 0;
      for (let v = 0; v < Math.min(i, l.length); v += 1) {
        const F = l[v];
        ((o[F].marble = de(f)), (p[F] = !0), Math.random() < w && (I[F] = !0));
      }
      L = S + Math.random() * (d ? 520 : 700);
    }
    function A() {
      (n.clearRect(0, 0, t, t),
        n.beginPath(),
        n.arc(t / 2, t / 2, t * 0.41, 0, Math.PI * 2),
        (n.strokeStyle = "rgba(176,174,165,0.08)"),
        (n.lineWidth = 1.5),
        n.stroke());
      for (const s of o)
        if (!s.marble || s.marble.shaking) {
          const i = J(s.x, s.y);
          ((n.globalAlpha = W + i * (N - W)), Ce(n, s.x, s.y, c));
        }
      n.globalAlpha = 1;
      for (const s of o) {
        if (!s.marble) continue;
        const i = s.marble;
        if (i.shaking) {
          if (((i.shakeT += d ? 0.025 : 0.04), i.shakeT >= 1)) {
            s.marble = null;
            continue;
          }
          const H = Math.sin(i.shakeT * 18) * c * 0.4 * (1 - i.shakeT),
            O = J(s.x, s.y);
          ((n.globalAlpha = (W + O * (N - W)) * (1 - i.shakeT * i.shakeT)),
            n.drawImage(
              i.sprite,
              s.x + H - i.sprite.width / 2,
              s.y - i.sprite.height / 2,
            ));
          continue;
        }
        i.drop = Math.max(0, i.drop - i.dropSpeed);
        const w = -c * 2 * i.drop * i.drop,
          v = J(s.x, s.y),
          F = W + v * (N - W);
        ((i.alpha += (F - i.alpha) * (d ? 0.05 : 0.07)),
          i.drop < 0.2 &&
            ((n.globalAlpha = 0.12 * (1 - i.drop / 0.2) * i.alpha),
            n.beginPath(),
            n.ellipse(
              s.x,
              s.y + c * 0.12,
              c * 0.55,
              c * 0.18,
              0,
              0,
              Math.PI * 2,
            ),
            (n.fillStyle = "rgba(0,0,0,1)"),
            n.fill()),
          (n.globalAlpha = i.alpha),
          n.drawImage(
            i.sprite,
            s.x - i.sprite.width / 2,
            s.y + w - i.sprite.height / 2,
          ));
      }
      n.globalAlpha = 1;
      const a = K();
      let l = g > 0 ? Math.round((a / g) * 100) : 0;
      (f >= 5 && Object.keys(p).length >= g && (l = 100),
        (n.font = `700 ${t * 0.09}px var(--font-head), sans-serif`),
        (n.fillStyle = "#faf9f5"),
        (n.textAlign = "center"),
        (n.textBaseline = "middle"),
        n.fillText(`${l}%`, t / 2, t / 2 - t * 0.02),
        (n.font = `${t * 0.038}px var(--font-head), sans-serif`),
        (n.fillStyle = "#b0aea5"),
        n.fillText(f > 0 ? Re(f) : Te(), t / 2, t / 2 + t * 0.07));
    }
    function fe() {
      if (!Pe()) {
        V();
        return;
      }
      ((L -= 16),
        m > 0 ? ((m -= 16), m <= 0 && B()) : L <= 0 && xe(),
        A(),
        (u = window.requestAnimationFrame(fe)));
    }
    const he = (a) => {
        if (!h) return;
        const l = e.getBoundingClientRect();
        ((x = ((a.clientX - l.left) / (l.right - l.left)) * t),
          (P = ((a.clientY - l.top) / (l.bottom - l.top)) * t));
      },
      pe = () => {
        ((x = -1), (P = -1));
      },
      Le = () => {
        ie() && (B(), A(), q());
      },
      U = () => {
        k ||
          (k = window.requestAnimationFrame(() => {
            ((k = 0), Le());
          }));
      };
    ((E = new ResizeObserver(U)),
      E.observe(e),
      (Q = new IntersectionObserver(
        (a) => {
          ((G = a.some((l) => l.isIntersecting)), q());
        },
        { threshold: 0.12 },
      )),
      Q.observe(e),
      e.addEventListener("mousemove", he),
      e.addEventListener("mouseleave", pe),
      window.addEventListener("resize", U));
    const be = () => {
        ((z = document.visibilityState === "visible"), q());
      },
      ge = (a) => {
        ((d = a.matches), B(), A(), q());
      },
      me = () => {
        (se(), A());
      };
    return (
      r.addEventListener("change", ge),
      b.addEventListener("change", me),
      document.addEventListener("visibilitychange", be),
      ie() && (B(), A(), q()),
      () => {
        ((_ = !0),
          V(),
          X(),
          E?.disconnect(),
          Q?.disconnect(),
          k && window.cancelAnimationFrame(k),
          e.removeEventListener("mousemove", he),
          e.removeEventListener("mouseleave", pe),
          window.removeEventListener("resize", U),
          document.removeEventListener("visibilitychange", be),
          r.removeEventListener("change", ge),
          b.removeEventListener("change", me));
      }
    );
  });
  var le = qe();
  (We(
    le,
    (e) => (D = e),
    () => D,
  ),
    Fe(Me, le),
    Ee());
}
export { Qe as default };
