import "./disclose-version.DsnmJJEf.js";
import {
  i as P,
  A as S,
  j as f,
  k as E,
  B as g,
  E as T,
  C as D,
  D as F,
  N as I,
  F as k,
  G as B,
  H as x,
  I as _,
  J as O,
  K as R,
  x as G,
  m as V,
  L as j,
  M as q,
  f as M,
  p as z,
  a as H,
  z as J,
} from "./runtime.QfC15RoP.js";
import { d as K, c as w, a as C } from "./template.DrTY0w-c.js";
import { s as Q } from "./snippet.DsC_m6Us.js";
import { i as U, b as h } from "./render.CqgMSlkN.js";
import { B as W } from "./branches.BDY79d1y.js";
import { d as X } from "./attributes.CKni9qMX.js";
import { p as c, r as Y } from "./props.DDrYma4F.js";
function Z(r, t, n, a, s, d) {
  let o = f;
  f && E();
  var e = null;
  f && g.nodeType === T && ((e = g), E());
  var l = f ? g : r,
    u = new W(l, !1);
  (P(() => {
    const i = t() || null;
    var y = i === "svg" ? I : void 0;
    if (i === null) {
      (u.ensure(null, null), h(!0));
      return;
    }
    return (
      u.ensure(i, (m) => {
        if (i) {
          if (((e = f ? e : F(i, y)), K(e, e), a)) {
            f && U(i) && e.append(document.createComment(""));
            var v = f ? k(e) : e.appendChild(B());
            (f && (v === null ? x(!1) : _(v)), a(e, v));
          }
          ((O.nodes.end = e), m.before(e));
        }
        f && _(m);
      }),
      h(!0),
      () => {
        i && h(!1);
      }
    );
  }, D),
    S(() => {
      h(!0);
    }),
    o && (x(!0), _(l)));
}
function $(r, t, n) {
  R(() => {
    var a = G(() => t(r, n?.()) || {});
    if (n && a?.update) {
      var s = !1,
        d = {};
      (V(() => {
        var o = n();
        (j(o), s && q(d, o) && ((d = o), a.update(o)));
      }),
        (s = !0));
    }
    if (a?.destroy) return () => a.destroy();
  });
}
const N = {
  delay: 0,
  once: !0,
  rootMargin: "0px 0px -8% 0px",
  threshold: 0.12,
  visibleClass: "visible",
};
function ee(r, t = {}) {
  let n = null,
    a = null,
    s = { ...N, ...t };
  function d(l) {
    (r.classList.toggle(s.visibleClass, l),
      (r.dataset.revealState = l ? "visible" : "hidden"));
  }
  function o() {
    (n?.disconnect(),
      (n = null),
      a?.removeEventListener("change", e),
      (a = null));
  }
  function e() {
    o();
    const l =
      s.disabled || typeof window > "u" || !("IntersectionObserver" in window);
    if (
      (s.delay > 0
        ? r.style.setProperty("--reveal-delay", `${s.delay}ms`)
        : r.style.removeProperty("--reveal-delay"),
      (a = l ? null : window.matchMedia("(prefers-reduced-motion: reduce)")),
      l || a?.matches)
    ) {
      d(!0);
      return;
    }
    (d(!1),
      (n = new IntersectionObserver(
        (u) => {
          for (const i of u)
            i.isIntersecting
              ? (d(!0), s.once && (n?.disconnect(), (n = null)))
              : s.once || d(!1);
        },
        { threshold: s.threshold, rootMargin: s.rootMargin },
      )),
      n.observe(r),
      a?.addEventListener("change", e));
  }
  return (
    e(),
    {
      update(l = {}) {
        ((s = { ...N, ...l }), e());
      },
      destroy() {
        (o(),
          r.style.removeProperty("--reveal-delay"),
          delete r.dataset.revealState);
      },
    }
  );
}
function de(r, t) {
  H(t, !0);
  let n = c(t, "tag", 3, "div"),
    a = c(t, "class", 3, ""),
    s = c(t, "delay", 3, 0),
    d = c(t, "disabled", 3, !1),
    o = c(t, "once", 3, !0),
    e = c(t, "rootMargin", 3, "0px 0px -8% 0px"),
    l = c(t, "threshold", 3, 0.12),
    u = Y(t, [
      "$$slots",
      "$$events",
      "$$legacy",
      "tag",
      "class",
      "delay",
      "disabled",
      "once",
      "rootMargin",
      "threshold",
      "children",
    ]);
  var i = w(),
    y = M(i);
  (Z(y, n, !1, (m, v) => {
    ($(
      m,
      (p, L) => ee?.(p, L),
      () => ({
        delay: s(),
        disabled: d(),
        once: o(),
        rootMargin: e(),
        threshold: l(),
      }),
    ),
      X(
        m,
        (p) => ({ class: p, ...u }),
        [() => `fade-up ${a()}`.trim()],
        void 0,
        void 0,
        "svelte-1mc8g53",
      ));
    var b = w(),
      A = M(b);
    (Q(A, () => t.children ?? J), C(v, b));
  }),
    C(r, i),
    z());
}
export { de as default };
