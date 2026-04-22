import "./disclose-version.DsnmJJEf.js";
import {
  b as m,
  m as It,
  s as d,
  y as $t,
  z as kt,
  g as t,
  a as St,
  h as Tt,
  u as Lt,
  d as p,
  c as u,
  r as o,
  t as X,
  p as Ct,
  f as Pt,
  e as P,
} from "./runtime.QfC15RoP.js";
import { d as zt, a as K, e as pt, s as y } from "./render.CqgMSlkN.js";
import { a as D, f as A } from "./template.DrTY0w-c.js";
import { e as mt, i as vt } from "./each.Bl5LU2PA.js";
import { h as ht } from "./html.BJEAqZdD.js";
import { s as ct, a as ot } from "./attributes.CKni9qMX.js";
import { s as Dt } from "./snippet.DsC_m6Us.js";
import { i as At } from "./if.Bn6v29Er.js";
import {
  r as Ht,
  l as Ft,
  t as Et,
  p as Mt,
  a as Kt,
} from "./index.CDVM_SEU.js";
import { b as yt } from "./this.MJJ6CZzJ.js";
import { p as wt } from "./props.DDrYma4F.js";
import { i as xt } from "./utils.vK_o3JBb.js";
import { K as Xt } from "./KnowledgeDialog.EUNTglT3.js";
import Rt from "./Reveal.D1_DA-iE.js";
import { g as jt } from "./index.CFQc2B1F.js";
function gt(h, n, s, l) {
  if (typeof s == "number" || xt(s)) {
    const v = l - s,
      r = (s - n) / (h.dt || 1 / 60),
      L = h.opts.stiffness * v,
      I = h.opts.damping * r,
      g = (L - I) * h.inv_mass,
      k = (r + g) * h.dt;
    return Math.abs(k) < h.opts.precision && Math.abs(v) < h.opts.precision
      ? l
      : ((h.settled = !1), xt(s) ? new Date(s.getTime() + k) : s + k);
  } else {
    if (Array.isArray(s)) return s.map((v, r) => gt(h, n[r], s[r], l[r]));
    if (typeof s == "object") {
      const v = {};
      for (const r in s) v[r] = gt(h, n[r], s[r], l[r]);
      return v;
    } else throw new Error(`Cannot spring ${typeof s} values`);
  }
}
class bt {
  #s = m(0.15);
  #a = m(0.8);
  #i = m(0.01);
  #t;
  #r;
  #n = void 0;
  #o = 0;
  #l = 1;
  #d = 0;
  #e = null;
  #c = null;
  constructor(n, s = {}) {
    ((this.#t = m(n)),
      (this.#r = m(n)),
      typeof s.stiffness == "number" && (this.#s.v = lt(s.stiffness, 0, 1)),
      typeof s.damping == "number" && (this.#a.v = lt(s.damping, 0, 1)),
      typeof s.precision == "number" && (this.#i.v = s.precision));
  }
  static of(n, s) {
    const l = new bt(n(), s);
    return (
      It(() => {
        l.set(n());
      }),
      l
    );
  }
  #f(n) {
    if ((d(this.#r, n), (this.#t.v ??= n), (this.#n ??= this.#t.v), !this.#e)) {
      this.#o = Ht.now();
      var s = 1e3 / (this.#d * 60);
      this.#e ??= Ft((l) => {
        this.#l = Math.min(this.#l + s, 1);
        const v = Math.min(l - this.#o, 1e3 / 30),
          r = {
            inv_mass: this.#l,
            opts: {
              stiffness: this.#s.v,
              damping: this.#a.v,
              precision: this.#i.v,
            },
            settled: !0,
            dt: (v * 60) / 1e3,
          };
        var L = gt(r, this.#n, this.#t.v, this.#r.v);
        return (
          (this.#n = this.#t.v),
          (this.#o = l),
          d(this.#t, L),
          r.settled && (this.#e = null),
          !r.settled
        );
      });
    }
    return this.#e.promise;
  }
  set(n, s) {
    if (
      (this.#c?.reject(new Error("Aborted")),
      s?.instant || this.#t.v === void 0)
    )
      return (
        this.#e?.abort(),
        (this.#e = null),
        d(this.#t, d(this.#r, n)),
        (this.#n = n),
        Promise.resolve()
      );
    s?.preserveMomentum && ((this.#l = 0), (this.#d = s.preserveMomentum));
    var l = (this.#c = $t());
    return (
      l.promise.catch(kt),
      this.#f(n).then(() => {
        l === this.#c && l.resolve(void 0);
      }),
      l.promise
    );
  }
  get current() {
    return t(this.#t);
  }
  get damping() {
    return t(this.#a);
  }
  set damping(n) {
    d(this.#a, lt(n, 0, 1));
  }
  get precision() {
    return t(this.#i);
  }
  set precision(n) {
    d(this.#i, n);
  }
  get stiffness() {
    return t(this.#s);
  }
  set stiffness(n) {
    d(this.#s, lt(n, 0, 1));
  }
  get target() {
    return t(this.#r);
  }
  set target(n) {
    this.set(n);
  }
}
function lt(h, n, s) {
  return Math.max(n, Math.min(s, h));
}
var Ot = A(
    '<div class="card-strip__controls svelte-1h0gz04"><button class="card-strip__arrow card-strip__arrow--left svelte-1h0gz04" type="button"><span aria-hidden="true">←</span></button> <button class="card-strip__arrow card-strip__arrow--right svelte-1h0gz04" type="button"><span aria-hidden="true">→</span></button></div>',
  ),
  Wt = A("<article><!></article>"),
  Yt = A(
    '<div role="region"><div class="card-strip__frame svelte-1h0gz04" aria-hidden="true"></div> <!> <div class="card-strip__rail svelte-1h0gz04" tabindex="0"></div></div>',
  );
function Bt(h, n) {
  St(n, !0);
  let s = wt(n, "leftLabel", 3, "Scroll left"),
    l = wt(n, "rightLabel", 3, "Scroll right"),
    v = m(null),
    r = m(null),
    L = m(!1),
    I = m(!1),
    g = m(!0),
    k = m(!1),
    H = m(0),
    b = m(0),
    w = m(Tt([])),
    _ = null,
    R = 0,
    j = 0,
    O = 0,
    U = 0,
    et = 0,
    F = null,
    f = m(!1);
  const M = new bt(0, { stiffness: 0.13, damping: 0.76, precision: 0.35 });
  function S(e) {
    return Math.min(Math.max(0, e), t(H));
  }
  function $() {
    F !== null && (clearTimeout(F), (F = null));
  }
  function T(e = t(r)?.scrollLeft ?? 0) {
    if (!t(r)) return;
    const a = Math.max(0, t(r).scrollWidth - t(r).clientWidth),
      i = getComputedStyle(t(r)),
      c = parseFloat(i.paddingInlineStart || i.paddingLeft || "0"),
      z = Array.from(t(r).children).filter((tt) => tt instanceof HTMLElement);
    (d(H, a, !0),
      d(b, Math.min(Math.max(0, e), a), !0),
      d(I, a > 1),
      d(g, t(b) <= 1),
      d(k, t(b) >= a - 1),
      d(
        w,
        z.map((tt) => Math.min(Math.max(0, tt.offsetLeft - c), a)),
        !0,
      ));
  }
  function rt(e = t(b)) {
    if (t(w).length === 0) return S(e);
    let a = t(w)[0],
      i = Math.abs(e - a);
    for (const c of t(w).slice(1)) {
      const z = Math.abs(e - c);
      z < i && ((a = c), (i = z));
    }
    return a;
  }
  function V(e = t(b)) {
    if (t(w).length === 0) return 0;
    const a = rt(e),
      i = t(w).indexOf(a);
    return i === -1 ? 0 : i;
  }
  function G(e) {
    if (!t(r)) return;
    const a = S(e);
    (d(f, !1), M.set(a, { instant: !0 }), (t(r).scrollLeft = a), T(a));
  }
  function W(e, a = 0) {
    if (!t(r)) return;
    const i = S(e);
    if (Mt.current || Math.abs(i - t(r).scrollLeft) <= 1) {
      G(i);
      return;
    }
    (d(f, !0), M.set(i, a > 0 ? { preserveMomentum: a } : void 0));
  }
  function Y(e = t(b), a = 0) {
    W(rt(e), a);
  }
  function B(e = t(r)?.scrollLeft ?? t(b), a = 120, i = 0) {
    $();
    const c = e;
    F = setTimeout(() => {
      ((F = null), Y(c, i));
    }, a);
  }
  function E(e) {
    if (!t(I)) return;
    $();
    const a = Math.min(
      Math.max(V(t(f) ? M.target : (t(r)?.scrollLeft ?? t(b))) + e, 0),
      t(w).length - 1,
    );
    W(t(w)[a], 140);
  }
  function dt(e) {
    return !(!t(I) || (e < 0 && t(g)) || (e > 0 && t(k)));
  }
  function st(e) {
    if (!t(r) || e.ctrlKey) return;
    const a = Math.abs(e.deltaX),
      i = Math.abs(e.deltaY),
      c = e.shiftKey ? a > 0 || i > 0 : a > i * 1.08 && a > 0.5,
      z = e.shiftKey && a < 0.5 ? e.deltaY : e.deltaX;
    if (!z || !dt(z) || !c) return;
    (e.preventDefault(), $());
    const tt = t(f) ? M.target : t(r).scrollLeft,
      _t = S(tt + z);
    (G(_t), B(_t, 110, 120));
  }
  function q(e) {
    e.key === "ArrowLeft"
      ? (e.preventDefault(), E(-1))
      : e.key === "ArrowRight" && (e.preventDefault(), E(1));
  }
  function ft(e) {
    !t(r) ||
      e.button !== 0 ||
      ($(),
      d(L, !0),
      d(f, !1),
      M.set(t(r).scrollLeft, { instant: !0 }),
      (_ = e.pointerId),
      (R = e.clientX),
      (j = t(r).scrollLeft),
      (O = 0),
      (U = e.timeStamp),
      (et = t(r).scrollLeft),
      t(r).setPointerCapture?.(e.pointerId));
  }
  function J(e) {
    if (!t(r) || !t(L) || _ !== e.pointerId) return;
    const a = S(j - (e.clientX - R));
    G(a);
    const i = Math.max(1, e.timeStamp - U);
    ((O = (a - et) / i), (U = e.timeStamp), (et = a));
  }
  function at(e, a = !1) {
    if (t(r)) {
      if (_ !== null && e === _)
        try {
          t(r).releasePointerCapture?.(_);
        } catch {}
      if (((_ = null), d(L, !1), !a)) {
        const i = S(t(r).scrollLeft + O * 180),
          c = Math.min(240, Math.max(120, Math.abs(O) * 260));
        Y(i, c);
      }
    }
  }
  function Q(e) {
    _ === e.pointerId && at(e.pointerId);
  }
  function ut(e) {
    _ === e.pointerId && at(e.pointerId, !0);
  }
  function Z() {
    t(r) && (T(t(r).scrollLeft), !t(L) && !t(f) && B(t(r).scrollLeft, 125));
  }
  (Lt(() => {
    if (!t(r)) return;
    const e = S(M.current);
    (!t(L) && Math.abs(t(r).scrollLeft - e) > 0.5 && (t(r).scrollLeft = e),
      T(e),
      t(f) && Math.abs(M.target - e) <= 0.5 && d(f, !1));
  }),
    Lt(() => {
      if (!t(r) || !t(v)) return;
      let e = 0;
      const a = () => {
          t(r) && T(S(t(r).scrollLeft));
        },
        i = () => {
          e ||
            typeof window > "u" ||
            (e = window.requestAnimationFrame(() => {
              ((e = 0), a());
            }));
        },
        c = new ResizeObserver(() => {
          i();
        });
      return (
        c.observe(t(v)),
        a(),
        () => {
          (c.disconnect(),
            e && typeof window < "u" && window.cancelAnimationFrame(e),
            $());
        }
      );
    }));
  var C = Yt();
  let it;
  var N = p(u(C), 2);
  {
    var nt = (e) => {
      var a = Ot(),
        i = u(a),
        c = p(i, 2);
      (o(a),
        X(() => {
          (ot(i, "aria-label", s()),
            (i.disabled = t(g)),
            ot(c, "aria-label", l()),
            (c.disabled = t(k)));
        }),
        K("click", i, () => E(-1)),
        K("click", c, () => E(1)),
        Et(
          3,
          a,
          () => Kt,
          () => ({ duration: Mt.current ? 0 : 160 }),
        ),
        D(e, a));
    };
    At(N, (e) => {
      t(I) && e(nt);
    });
  }
  var x = p(N, 2);
  (mt(
    x,
    21,
    () => n.items,
    vt,
    (e, a, i) => {
      var c = Wt(),
        z = u(c);
      (Dt(
        z,
        () => n.card,
        () => t(a),
        () => i,
      ),
        o(c),
        X(() =>
          ct(
            c,
            1,
            `card-strip__card ${t(a).cardClass ?? ""}`,
            "svelte-1h0gz04",
          ),
        ),
        D(e, c));
    },
  ),
    o(x),
    yt(
      x,
      (e) => d(r, e),
      () => t(r),
    ),
    o(C),
    yt(
      C,
      (e) => d(v, e),
      () => t(v),
    ),
    X(() => {
      ((it = ct(C, 1, "card-strip svelte-1h0gz04", null, it, {
        "card-strip--dragging": t(L),
        "card-strip--at-start": t(g),
        "card-strip--at-end": t(k),
        "card-strip--static": !t(I),
      })),
        ot(C, "aria-label", n.ariaLabel));
    }),
    K("keydown", x, q),
    pt("wheel", x, st),
    K("pointerdown", x, ft),
    K("pointermove", x, J),
    K("pointerup", x, Q),
    pt("pointercancel", x, ut),
    pt("scroll", x, Z),
    D(h, C),
    Ct());
}
zt(["click", "keydown", "pointerdown", "pointermove", "pointerup"]);
var qt = A('<span class="tag"> </span>'),
  Nt = A('<span class="tag"> </span>'),
  Ut = A(
    '<button type="button" class="skill-card-activate"><div class="skill-card-flip"><div class="skill-card-face skill-card-face--front"><div> </div> <h3> </h3> <p class="card-desc"></p> <div class="card-tags"></div> <div class="card-trigger"></div> <span class="card-reveal-hint"> </span></div> <div class="skill-card-face skill-card-face--back" aria-hidden="true"><div> </div> <h3> </h3> <div class="skill-card-meta-label"> </div> <div class="card-tags"></div> <div class="skill-card-meta-label"> </div> <div class="card-trigger"></div> <span class="card-reveal-hint"> </span></div></div></button>',
  ),
  Vt = A(
    '<div class="section-label"> </div> <h2 class="section-title"> </h2> <p class="section-sub"> </p> <!>',
    1,
  ),
  Gt = A(
    '<section id="skills" class="skills-section surface--grid"><!> <!></section>',
  );
function pe(h, n) {
  St(n, !0);
  const s = P(() => jt(n.lang).sections.skills);
  let l = m(null);
  function v(g) {
    return g.cardClass?.includes("copper")
      ? "copper"
      : g.cardClass?.includes("patina")
        ? "patina"
        : g.cardClass?.includes("muted")
          ? "muted"
          : "steel";
  }
  var r = Gt(),
    L = u(r);
  Rt(L, {
    tag: "div",
    class: "container",
    children: (g, k) => {
      var H = Vt(),
        b = Pt(H),
        w = u(b, !0);
      o(b);
      var _ = p(b, 2),
        R = u(_, !0);
      o(_);
      var j = p(_, 2),
        O = u(j, !0);
      o(j);
      var U = p(j, 2);
      (Bt(U, {
        get items() {
          return t(s).cards;
        },
        get ariaLabel() {
          return t(s).title;
        },
        get leftLabel() {
          return t(s).scrollLeft;
        },
        get rightLabel() {
          return t(s).scrollRight;
        },
        card: (F, f = kt) => {
          var M = Ut(),
            S = u(M),
            $ = u(S),
            T = u($),
            rt = u(T, !0);
          o(T);
          var V = p(T, 2),
            G = u(V, !0);
          o(V);
          var W = p(V, 2);
          (ht(W, () => f().descHtml, !0), o(W));
          var Y = p(W, 2);
          (mt(
            Y,
            21,
            () => f().tags,
            vt,
            (e, a) => {
              var i = qt(),
                c = u(i, !0);
              (o(i), X(() => y(c, t(a))), D(e, i));
            },
          ),
            o(Y));
          var B = p(Y, 2);
          (ht(B, () => f().triggerHtml, !0), o(B));
          var E = p(B, 2),
            dt = u(E, !0);
          (o(E), o($));
          var st = p($, 2),
            q = u(st),
            ft = u(q, !0);
          o(q);
          var J = p(q, 2),
            at = u(J, !0);
          o(J);
          var Q = p(J, 2),
            ut = u(Q, !0);
          o(Q);
          var Z = p(Q, 2);
          (mt(
            Z,
            21,
            () => f().tags,
            vt,
            (e, a) => {
              var i = Nt(),
                c = u(i, !0);
              (o(i), X(() => y(c, t(a))), D(e, i));
            },
          ),
            o(Z));
          var C = p(Z, 2),
            it = u(C, !0);
          o(C);
          var N = p(C, 2);
          (ht(N, () => f().triggerHtml, !0), o(N));
          var nt = p(N, 2),
            x = u(nt, !0);
          (o(nt),
            o(st),
            o(S),
            o(M),
            X(() => {
              (ot(M, "aria-label", `${f().id} — ${t(s).openLabel}`),
                ct(T, 1, `card-phase ${f().phaseClass}`),
                y(rt, f().phase),
                y(G, f().id),
                y(dt, t(s).revealLabel),
                ct(q, 1, `card-phase ${f().phaseClass}`),
                y(ft, f().phase),
                y(at, f().id),
                y(ut, t(s).tagsLabel),
                y(it, t(s).triggersLabel),
                y(x, t(s).openLabel));
            }),
            K("click", M, () => d(l, f(), !0)),
            D(F, M));
        },
        $$slots: { card: !0 },
      }),
        X(() => {
          (y(w, t(s).label), y(R, t(s).title), y(O, t(s).sub));
        }),
        D(g, H));
    },
    $$slots: { default: !0 },
  });
  var I = p(L, 2);
  {
    let g = P(() => !!t(l)),
      k = P(() => (t(l) ? v(t(l)) : "steel")),
      H = P(() => (t(l) ? `${t(s).phaseLabel} · ${t(l).phase}` : "")),
      b = P(() => t(l)?.id ?? ""),
      w = P(() => t(l)?.descHtml ?? ""),
      _ = P(() => t(l)?.tags ?? []),
      R = P(() => t(l)?.triggerHtml ?? "");
    Xt(I, {
      get open() {
        return t(g);
      },
      get accent() {
        return t(k);
      },
      get eyebrow() {
        return t(H);
      },
      get title() {
        return t(b);
      },
      get bodyHtml() {
        return t(w);
      },
      get tags() {
        return t(_);
      },
      get footerHtml() {
        return t(R);
      },
      get tagsLabel() {
        return t(s).tagsLabel;
      },
      get footerLabel() {
        return t(s).triggersLabel;
      },
      get closeLabel() {
        return t(s).closeLabel;
      },
      onclose: () => d(l, null),
    });
  }
  (o(r), D(h, r), Ct());
}
zt(["click"]);
export { pe as default };
