import {
  J as M,
  C as z,
  O as L,
  R as P,
  K as U,
  x as B,
  T as K,
  P as Q,
  Q as j,
  S as q,
  U as G,
  z as k,
  w as O,
} from "./runtime.QfC15RoP.js";
import { c as J, f as V, o as W } from "./render.CqgMSlkN.js";
const D = () => performance.now(),
  m = {
    tick: (r) => requestAnimationFrame(r),
    now: () => D(),
    tasks: new Set(),
  };
function I() {
  const r = m.now();
  (m.tasks.forEach((t) => {
    t.c(r) || (m.tasks.delete(t), t.f());
  }),
    m.tasks.size !== 0 && m.tick(I));
}
function H(r) {
  let t;
  return (
    m.tasks.size === 0 && m.tick(I),
    {
      promise: new Promise((a) => {
        m.tasks.add((t = { c: r, f: a }));
      }),
      abort() {
        m.tasks.delete(t);
      },
    }
  );
}
function g(r, t) {
  O(() => {
    r.dispatchEvent(new CustomEvent(t));
  });
}
function X(r) {
  if (r === "float") return "cssFloat";
  if (r === "offset") return "cssOffset";
  if (r.startsWith("--")) return r;
  const t = r.split("-");
  return t.length === 1
    ? t[0]
    : t[0] +
        t
          .slice(1)
          .map((a) => a[0].toUpperCase() + a.slice(1))
          .join("");
}
function A(r) {
  const t = {},
    a = r.split(";");
  for (const s of a) {
    const [n, e] = s.split(":");
    if (!n || e === void 0) break;
    const i = X(n.trim());
    t[i] = e.trim();
  }
  return t;
}
const Y = (r) => r;
function ot(r, t, a, s) {
  var n = (r & Q) !== 0,
    e = (r & j) !== 0,
    i = n && e,
    f = (r & K) !== 0,
    h = i ? "both" : n ? "in" : "out",
    u,
    d = t.inert,
    y = t.style.overflow,
    c,
    v;
  function _() {
    return O(() => (u ??= a()(t, s?.() ?? {}, { direction: h })));
  }
  var o = {
      is_global: f,
      in() {
        if (((t.inert = d), !n)) {
          (v?.abort(), v?.reset?.());
          return;
        }
        (e || c?.abort(),
          (c = S(t, _(), v, 1, () => {
            (g(t, "introend"),
              c?.abort(),
              (c = u = void 0),
              (t.style.overflow = y));
          })));
      },
      out(b) {
        if (!e) {
          (b?.(), (u = void 0));
          return;
        }
        ((t.inert = !0),
          (v = S(t, _(), c, 0, () => {
            (g(t, "outroend"), b?.());
          })));
      },
      stop: () => {
        (c?.abort(), v?.abort());
      },
    },
    l = M;
  if (((l.nodes.t ??= []).push(o), n && J)) {
    var w = f;
    if (!w) {
      for (var p = l.parent; p && (p.f & z) !== 0; )
        for (; (p = p.parent) && (p.f & L) === 0; );
      w = !p || (p.f & P) !== 0;
    }
    w &&
      U(() => {
        B(() => o.in());
      });
  }
}
function S(r, t, a, s, n) {
  var e = s === 1;
  if (q(t)) {
    var i,
      f = !1;
    return (
      G(() => {
        if (!f) {
          var l = t({ direction: e ? "in" : "out" });
          i = S(r, l, a, s, n);
        }
      }),
      {
        abort: () => {
          ((f = !0), i?.abort());
        },
        deactivate: () => i.deactivate(),
        reset: () => i.reset(),
        t: () => i.t(),
      }
    );
  }
  if ((a?.deactivate(), !t?.duration && !t?.delay))
    return (
      g(r, e ? "introstart" : "outrostart"),
      n(),
      { abort: k, deactivate: k, reset: k, t: () => s }
    );
  const { delay: h = 0, css: u, tick: d, easing: y = Y } = t;
  var c = [];
  if (e && a === void 0 && (d && d(0, 1), u)) {
    var v = A(u(0, 1));
    c.push(v, v);
  }
  var _ = () => 1 - s,
    o = r.animate(c, { duration: h, fill: "forwards" });
  return (
    (o.onfinish = () => {
      (o.cancel(), g(r, e ? "introstart" : "outrostart"));
      var l = a?.t() ?? 1 - s;
      a?.abort();
      var w = s - l,
        p = t.duration * Math.abs(w),
        b = [];
      if (p > 0) {
        var N = !1;
        if (u)
          for (
            var C = Math.ceil(p / 16.666666666666668), $ = 0;
            $ <= C;
            $ += 1
          ) {
            var R = l + w * y($ / C),
              x = A(u(R, 1 - R));
            (b.push(x), (N ||= x.overflow === "hidden"));
          }
        (N && (r.style.overflow = "hidden"),
          (_ = () => {
            var T = o.currentTime;
            return l + w * y(T / p);
          }),
          d &&
            H(() => {
              if (o.playState !== "running") return !1;
              var T = _();
              return (d(T, 1 - T), !0);
            }));
      }
      ((o = r.animate(b, { duration: p, fill: "forwards" })),
        (o.onfinish = () => {
          ((_ = () => s), d?.(s, 1 - s), n());
        }));
    }),
    {
      abort: () => {
        o && (o.cancel(), (o.effect = null), (o.onfinish = k));
      },
      deactivate: () => {
        n = k;
      },
      reset: () => {
        s === 0 && d?.(1, 0);
      },
      t: () => _(),
    }
  );
}
class Z {
  #t;
  #r;
  constructor(t, a) {
    ((this.#t = t), (this.#r = V(a)));
  }
  get current() {
    return (this.#r(), this.#t());
  }
}
const tt = /\(.+\)/,
  rt = new Set(["all", "print", "screen", "and", "or", "not", "only"]);
class at extends Z {
  constructor(t, a) {
    let s =
      tt.test(t) || t.split(/[\s,]+/).some((e) => rt.has(e.trim()))
        ? t
        : `(${t})`;
    const n = window.matchMedia(s);
    super(
      () => n.matches,
      (e) => W(n, "change", e),
    );
  }
}
const it = new at("(prefers-reduced-motion: reduce)"),
  st = (r) => r;
function F(r) {
  const t = r - 1;
  return t * t * t + 1;
}
function E(r) {
  const t = typeof r == "string" && r.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
  return t ? [parseFloat(t[1]), t[2] || "px"] : [r, "px"];
}
function ct(r, { delay: t = 0, duration: a = 400, easing: s = st } = {}) {
  const n = +getComputedStyle(r).opacity;
  return { delay: t, duration: a, easing: s, css: (e) => `opacity: ${e * n}` };
}
function ft(
  r,
  {
    delay: t = 0,
    duration: a = 400,
    easing: s = F,
    x: n = 0,
    y: e = 0,
    opacity: i = 0,
  } = {},
) {
  const f = getComputedStyle(r),
    h = +f.opacity,
    u = f.transform === "none" ? "" : f.transform,
    d = h * (1 - i),
    [y, c] = E(n),
    [v, _] = E(e);
  return {
    delay: t,
    duration: a,
    easing: s,
    css: (o, l) => `
			transform: ${u} translate(${(1 - o) * y}${c}, ${(1 - o) * v}${_});
			opacity: ${h - d * l}`,
  };
}
function ut(
  r,
  {
    delay: t = 0,
    duration: a = 400,
    easing: s = F,
    start: n = 0,
    opacity: e = 0,
  } = {},
) {
  const i = getComputedStyle(r),
    f = +i.opacity,
    h = i.transform === "none" ? "" : i.transform,
    u = 1 - n,
    d = f * (1 - e);
  return {
    delay: t,
    duration: a,
    easing: s,
    css: (y, c) => `
			transform: ${h} scale(${1 - u * c});
			opacity: ${f - d * c}
		`,
  };
}
export { ct as a, ft as f, H as l, it as p, m as r, ut as s, ot as t };
