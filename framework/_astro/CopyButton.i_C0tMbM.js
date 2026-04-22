import "./disclose-version.DsnmJJEf.js";
import { a as Y } from "./index-client.K0QDP7N9.js";
import {
  i as q,
  j as F,
  k as G,
  b as k,
  m as H,
  s as u,
  g as s,
  t as T,
  p as J,
  a as K,
  c as A,
  r as C,
  e as j,
} from "./runtime.QfC15RoP.js";
import { d as Q, a as U, s as V } from "./render.CqgMSlkN.js";
import { B as W } from "./branches.BDY79d1y.js";
import { a as E, f as D } from "./template.DrTY0w-c.js";
import { r as X, l as Z, p as h, t as N, a as O } from "./index.CDVM_SEU.js";
import { b as $, s as tt, a as z } from "./attributes.CKni9qMX.js";
import { p as m } from "./props.DDrYma4F.js";
import { i as B } from "./utils.vK_o3JBb.js";
const et = Symbol("NaN");
function rt(r, t, n) {
  F && G();
  var i = new W(r);
  q(() => {
    var e = t();
    (e !== e && (e = et), i.ensure(e, n));
  });
}
function at(r) {
  return r;
}
function w(r, t) {
  if (r === t || r !== r) return () => r;
  const n = typeof r;
  if (n !== typeof t || Array.isArray(r) !== Array.isArray(t))
    throw new Error("Cannot interpolate values of different type");
  if (Array.isArray(r)) {
    const i = t.map((e, o) => w(r[o], e));
    return (e) => i.map((o) => o(e));
  }
  if (n === "object") {
    if (!r || !t) throw new Error("Object cannot be null");
    if (B(r) && B(t)) {
      const o = r.getTime(),
        l = t.getTime() - o;
      return (y) => new Date(o + y * l);
    }
    const i = Object.keys(t),
      e = {};
    return (
      i.forEach((o) => {
        e[o] = w(r[o], t[o]);
      }),
      (o) => {
        const f = {};
        return (
          i.forEach((l) => {
            f[l] = e[l](o);
          }),
          f
        );
      }
    );
  }
  if (n === "number") {
    const i = t - r;
    return (e) => r + e * i;
  }
  return () => t;
}
class g {
  #t;
  #r;
  #a;
  #e = null;
  constructor(t, n = {}) {
    ((this.#t = k(t)), (this.#r = k(t)), (this.#a = n));
  }
  static of(t, n) {
    const i = new g(t(), n);
    return (
      H(() => {
        i.set(t());
      }),
      i
    );
  }
  set(t, n) {
    u(this.#r, t);
    let {
      delay: i = 0,
      duration: e = 400,
      easing: o = at,
      interpolate: f = w,
    } = { ...this.#a, ...n };
    if (e === 0) return (this.#e?.abort(), u(this.#t, t), Promise.resolve());
    const l = X.now() + i;
    let y,
      a = !1,
      x = this.#e;
    return (
      (this.#e = Z((v) => {
        if (v < l) return !0;
        if (!a) {
          a = !0;
          const _ = this.#t.v;
          ((y = f(_, t)), typeof e == "function" && (e = e(_, t)), x?.abort());
        }
        const d = v - l;
        return d > e ? (u(this.#t, t), !1) : (u(this.#t, y(o(d / e))), !0);
      })),
      this.#e.promise
    );
  }
  get current() {
    return s(this.#t);
  }
  get target() {
    return s(this.#r);
  }
  set target(t) {
    this.set(t);
  }
}
var ot = D('<span class="copy-button__text svelte-1j12gkz"> </span>'),
  st = D(
    '<button type="button" data-copy-managed="svelte"><span class="copy-button__label svelte-1j12gkz" aria-live="polite"><!></span></button>',
  );
function bt(r, t) {
  K(t, !0);
  let n = m(t, "class", 3, ""),
    i = m(t, "defaultLabel", 3, "Copy"),
    e = m(t, "copiedLabel", 3, "Copied"),
    o = m(t, "errorLabel", 3, "Error"),
    f = m(t, "defaultAriaLabel", 3, "Copy to clipboard"),
    l = m(t, "copiedAriaLabel", 3, "Copied to clipboard"),
    y = m(t, "errorAriaLabel", 3, "Copy failed"),
    a = k("default"),
    x = j(() => (s(a) === "copied" ? e() : s(a) === "error" ? o() : i())),
    v = j(() => (s(a) === "copied" ? l() : s(a) === "error" ? y() : f())),
    d;
  const _ = g.of(
      () => (s(a) === "copied" ? 1.06 : s(a) === "error" ? 0.985 : 1),
      { duration: h.current ? 0 : 180 },
    ),
    M = g.of(() => (s(a) === "default" ? 0 : -1.5), {
      duration: h.current ? 0 : 180,
    }),
    P = g.of(() => (s(a) === "default" ? 0.92 : 1), {
      duration: h.current ? 0 : 140,
    });
  Y(() => {
    d && clearTimeout(d);
  });
  async function S() {
    try {
      if (navigator.clipboard?.writeText)
        (await navigator.clipboard.writeText(t.textToCopy), u(a, "copied"));
      else throw new Error("Clipboard API not available");
    } catch {
      const c = document.createElement("textarea");
      ((c.value = t.textToCopy),
        (c.style.position = "fixed"),
        (c.style.left = "-999999px"),
        (c.style.top = "-999999px"),
        document.body.appendChild(c),
        c.focus(),
        c.select());
      try {
        (document.execCommand("copy"), u(a, "copied"));
      } catch {
        u(a, "error");
      }
      c.remove();
    }
    (clearTimeout(d),
      (d = setTimeout(() => {
        u(a, "default");
      }, 1500)));
  }
  var p = st(),
    L = A(p),
    I = A(L);
  (rt(
    I,
    () => s(a),
    (c) => {
      var b = ot(),
        R = A(b, !0);
      (C(b),
        T(() => {
          ($(
            b,
            `opacity: ${P.current}; transform: translateY(${M.current}px) scale(${_.current});`,
          ),
            V(R, s(x)));
        }),
        N(
          1,
          b,
          () => O,
          () => ({ duration: h.current ? 0 : 120 }),
        ),
        N(
          2,
          b,
          () => O,
          () => ({ duration: h.current ? 0 : 100 }),
        ),
        E(c, b));
    },
  ),
    C(L),
    C(p),
    T(() => {
      (tt(
        p,
        1,
        `${n() ?? ""} ${s(a) === "copied" ? "is-copied" : ""} ${s(a) === "error" ? "is-error" : ""}`,
        "svelte-1j12gkz",
      ),
        z(p, "data-copy-state", s(a)),
        z(p, "aria-label", s(v)));
    }),
    U("click", p, S),
    E(r, p),
    J());
}
Q(["click"]);
export { bt as C, g as T };
