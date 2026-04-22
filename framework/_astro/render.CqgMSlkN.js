import {
  aQ as te,
  g as U,
  m as re,
  ab as z,
  x as se,
  aR as Y,
  U as T,
  B as v,
  j as g,
  J as m,
  aS as j,
  i as ie,
  k as ne,
  X as ae,
  aT as B,
  a2 as p,
  G as X,
  af as x,
  q as H,
  ak as oe,
  aU as le,
  aV as A,
  aW as N,
  aX as q,
  aY as fe,
  aZ as ue,
  a_ as G,
  an as J,
  a0 as ce,
  al as L,
  I as D,
  n as he,
  Y as de,
  a$ as S,
  C as _e,
  b0 as pe,
  b1 as ve,
  b2 as ge,
  A as ye,
  w as be,
  b3 as me,
  b4 as F,
  F as Ee,
  Z,
  b5 as we,
  am as Te,
  aq as I,
  H as k,
  b6 as Se,
  aj as ke,
  b7 as Re,
  a7 as Ae,
  a as Ne,
  _ as De,
  ap as Oe,
  p as xe,
} from "./runtime.QfC15RoP.js";
import { d as Le } from "./template.DrTY0w-c.js";
function Fe(t) {
  let e = 0,
    r = z(0),
    i;
  return () => {
    te() &&
      (U(r),
      re(
        () => (
          e === 0 && (i = se(() => t(() => Y(r)))),
          (e += 1),
          () => {
            T(() => {
              ((e -= 1), e === 0 && (i?.(), (i = void 0), Y(r)));
            });
          }
        ),
      ));
  };
}
var Ie = _e | pe;
function Me(t, e, r, i) {
  new Ve(t, e, r, i);
}
class Ve {
  parent;
  is_pending = !1;
  transform_error;
  #t;
  #_ = g ? v : null;
  #i;
  #f;
  #e;
  #n = null;
  #r = null;
  #s = null;
  #a = null;
  #u = 0;
  #l = 0;
  #c = !1;
  #p = new Set();
  #v = new Set();
  #o = null;
  #b = Fe(
    () => (
      (this.#o = z(this.#u)),
      () => {
        this.#o = null;
      }
    ),
  );
  constructor(e, r, i, n) {
    ((this.#t = e),
      (this.#i = r),
      (this.#f = (s) => {
        var a = m;
        ((a.b = this), (a.f |= j), i(s));
      }),
      (this.parent = m.b),
      (this.transform_error = n ?? this.parent?.transform_error ?? ((s) => s)),
      (this.#e = ie(() => {
        if (g) {
          const s = this.#_;
          ne();
          const a = s.data === ae;
          if (s.data.startsWith(B)) {
            const o = JSON.parse(s.data.slice(B.length));
            this.#E(o);
          } else a ? this.#w() : this.#m();
        } else this.#g();
      }, Ie)),
      g && (this.#t = v));
  }
  #m() {
    try {
      this.#n = p(() => this.#f(this.#t));
    } catch (e) {
      this.error(e);
    }
  }
  #E(e) {
    const r = this.#i.failed;
    r &&
      (this.#s = p(() => {
        r(
          this.#t,
          () => e,
          () => () => {},
        );
      }));
  }
  #w() {
    const e = this.#i.pending;
    e &&
      ((this.is_pending = !0),
      (this.#r = p(() => e(this.#t))),
      T(() => {
        var r = (this.#a = document.createDocumentFragment()),
          i = X();
        (r.append(i),
          (this.#n = this.#d(() => p(() => this.#f(i)))),
          this.#l === 0 &&
            (this.#t.before(r),
            (this.#a = null),
            x(this.#r, () => {
              this.#r = null;
            }),
            this.#h(H)));
      }));
  }
  #g() {
    try {
      if (
        ((this.is_pending = this.has_pending_snippet()),
        (this.#l = 0),
        (this.#u = 0),
        (this.#n = p(() => {
          this.#f(this.#t);
        })),
        this.#l > 0)
      ) {
        var e = (this.#a = document.createDocumentFragment());
        oe(this.#n, e);
        const r = this.#i.pending;
        this.#r = p(() => r(this.#t));
      } else this.#h(H);
    } catch (r) {
      this.error(r);
    }
  }
  #h(e) {
    ((this.is_pending = !1), e.transfer_effects(this.#p, this.#v));
  }
  defer_effect(e) {
    le(e, this.#p, this.#v);
  }
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!this.#i.pending;
  }
  #d(e) {
    var r = m,
      i = G,
      n = J;
    (A(this.#e), N(this.#e), q(this.#e.ctx));
    try {
      return (fe.ensure(), e());
    } catch (s) {
      return (ue(s), null);
    } finally {
      (A(r), N(i), q(n));
    }
  }
  #y(e, r) {
    if (!this.has_pending_snippet()) {
      this.parent && this.parent.#y(e, r);
      return;
    }
    ((this.#l += e),
      this.#l === 0 &&
        (this.#h(r),
        this.#r &&
          x(this.#r, () => {
            this.#r = null;
          }),
        this.#a && (this.#t.before(this.#a), (this.#a = null))));
  }
  update_pending_count(e, r) {
    (this.#y(e, r),
      (this.#u += e),
      !(!this.#o || this.#c) &&
        ((this.#c = !0),
        T(() => {
          ((this.#c = !1), this.#o && ce(this.#o, this.#u));
        })));
  }
  get_effect_pending() {
    return (this.#b(), U(this.#o));
  }
  error(e) {
    var r = this.#i.onerror;
    let i = this.#i.failed;
    if (!r && !i) throw e;
    (this.#n && (L(this.#n), (this.#n = null)),
      this.#r && (L(this.#r), (this.#r = null)),
      this.#s && (L(this.#s), (this.#s = null)),
      g && (D(this.#_), he(), D(de())));
    var n = !1,
      s = !1;
    const a = () => {
        if (n) {
          ge();
          return;
        }
        ((n = !0),
          s && ve(),
          this.#s !== null &&
            x(this.#s, () => {
              this.#s = null;
            }),
          this.#d(() => {
            this.#g();
          }));
      },
      h = (o) => {
        try {
          ((s = !0), r?.(o, a), (s = !1));
        } catch (l) {
          S(l, this.#e && this.#e.parent);
        }
        i &&
          (this.#s = this.#d(() => {
            try {
              return p(() => {
                var l = m;
                ((l.b = this),
                  (l.f |= j),
                  i(
                    this.#t,
                    () => o,
                    () => a,
                  ));
              });
            } catch (l) {
              return (S(l, this.#e.parent), null);
            }
          }));
      };
    T(() => {
      var o;
      try {
        o = this.transform_error(e);
      } catch (l) {
        S(l, this.#e && this.#e.parent);
        return;
      }
      o !== null && typeof o == "object" && typeof o.then == "function"
        ? o.then(h, (l) => S(l, this.#e && this.#e.parent))
        : h(o);
    });
  }
}
const w = Symbol("events"),
  Q = new Set(),
  M = new Set();
function K(t, e, r, i = {}) {
  function n(s) {
    if ((i.capture || V.call(e, s), !s.cancelBubble))
      return be(() => r?.call(this, s));
  }
  return (
    t.startsWith("pointer") || t.startsWith("touch") || t === "wheel"
      ? T(() => {
          e.addEventListener(t, n, i);
        })
      : e.addEventListener(t, n, i),
    n
  );
}
function $e(t, e, r, i = {}) {
  var n = K(e, t, r, i);
  return () => {
    t.removeEventListener(e, n, i);
  };
}
function Ue(t, e, r, i, n) {
  var s = { capture: i, passive: n },
    a = K(t, e, r, s);
  (e === document.body ||
    e === window ||
    e === document ||
    e instanceof HTMLMediaElement) &&
    ye(() => {
      e.removeEventListener(t, a, s);
    });
}
function ze(t, e, r) {
  (e[w] ??= {})[t] = r;
}
function Xe(t) {
  for (var e = 0; e < t.length; e++) Q.add(t[e]);
  for (var r of M) r(t);
}
let $ = null;
function V(t) {
  var e = this,
    r = e.ownerDocument,
    i = t.type,
    n = t.composedPath?.() || [],
    s = n[0] || t.target;
  $ = t;
  var a = 0,
    h = $ === t && t[w];
  if (h) {
    var o = n.indexOf(h);
    if (o !== -1 && (e === document || e === window)) {
      t[w] = e;
      return;
    }
    var l = n.indexOf(e);
    if (l === -1) return;
    o <= l && (a = o);
  }
  if (((s = n[a] || t.target), s !== e)) {
    me(t, "currentTarget", {
      configurable: !0,
      get() {
        return s || r;
      },
    });
    var y = G,
      E = m;
    (N(null), A(null));
    try {
      for (var _, u = []; s !== null; ) {
        var f = s.assignedSlot || s.parentNode || s.host || null;
        try {
          var c = s[w]?.[i];
          c != null && (!s.disabled || t.target === s) && c.call(s, t);
        } catch (d) {
          _ ? u.push(d) : (_ = d);
        }
        if (t.cancelBubble || f === e || f === null) break;
        s = f;
      }
      if (_) {
        for (let d of u)
          queueMicrotask(() => {
            throw d;
          });
        throw _;
      }
    } finally {
      ((t[w] = e), delete t.currentTarget, N(y), A(E));
    }
  }
}
function Ge(t) {
  return (
    t.endsWith("capture") &&
    t !== "gotpointercapture" &&
    t !== "lostpointercapture"
  );
}
const Ce = [
  "beforeinput",
  "click",
  "change",
  "dblclick",
  "contextmenu",
  "focusin",
  "focusout",
  "input",
  "keydown",
  "keyup",
  "mousedown",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
  "pointerdown",
  "pointermove",
  "pointerout",
  "pointerover",
  "pointerup",
  "touchend",
  "touchmove",
  "touchstart",
];
function Je(t) {
  return Ce.includes(t);
}
const Pe = {
  formnovalidate: "formNoValidate",
  ismap: "isMap",
  nomodule: "noModule",
  playsinline: "playsInline",
  readonly: "readOnly",
  defaultvalue: "defaultValue",
  defaultchecked: "defaultChecked",
  srcobject: "srcObject",
  novalidate: "noValidate",
  allowfullscreen: "allowFullscreen",
  disablepictureinpicture: "disablePictureInPicture",
  disableremoteplayback: "disableRemotePlayback",
};
function Ze(t) {
  return ((t = t.toLowerCase()), Pe[t] ?? t);
}
const We = ["touchstart", "touchmove"];
function Ye(t) {
  return We.includes(t);
}
const je = ["textarea", "script", "style", "title"];
function Qe(t) {
  return je.includes(t);
}
let C = !0;
function Ke(t) {
  C = t;
}
function et(t, e) {
  var r = e == null ? "" : typeof e == "object" ? `${e}` : e;
  r !== (t.__t ??= t.nodeValue) && ((t.__t = r), (t.nodeValue = `${r}`));
}
function Be(t, e) {
  return ee(t, e);
}
function tt(t, e) {
  (F(), (e.intro = e.intro ?? !1));
  const r = e.target,
    i = g,
    n = v;
  try {
    for (var s = Ee(r); s && (s.nodeType !== Z || s.data !== we); ) s = Te(s);
    if (!s) throw I;
    (k(!0), D(s));
    const a = ee(t, { ...e, anchor: s });
    return (k(!1), a);
  } catch (a) {
    if (
      a instanceof Error &&
      a.message
        .split(
          `
`,
        )
        .some((h) => h.startsWith("https://svelte.dev/e/"))
    )
      throw a;
    return (
      a !== I && console.warn("Failed to hydrate: ", a),
      e.recover === !1 && Se(),
      F(),
      ke(r),
      k(!1),
      Be(t, e)
    );
  } finally {
    (k(i), D(n));
  }
}
const R = new Map();
function ee(
  t,
  {
    target: e,
    anchor: r,
    props: i = {},
    events: n,
    context: s,
    intro: a = !0,
    transformError: h,
  },
) {
  F();
  var o = void 0,
    l = Re(() => {
      var y = r ?? e.appendChild(X());
      Me(
        y,
        { pending: () => {} },
        (u) => {
          Ne({});
          var f = J;
          if (
            (s && (f.c = s),
            n && (i.$$events = n),
            g && Le(u, null),
            (C = a),
            (o = t(u, i) || {}),
            (C = !0),
            g &&
              ((m.nodes.end = v),
              v === null || v.nodeType !== Z || v.data !== De))
          )
            throw (Oe(), I);
          xe();
        },
        h,
      );
      var E = new Set(),
        _ = (u) => {
          for (var f = 0; f < u.length; f++) {
            var c = u[f];
            if (!E.has(c)) {
              E.add(c);
              var d = Ye(c);
              for (const O of [e, document]) {
                var b = R.get(O);
                b === void 0 && ((b = new Map()), R.set(O, b));
                var W = b.get(c);
                W === void 0
                  ? (O.addEventListener(c, V, { passive: d }), b.set(c, 1))
                  : b.set(c, W + 1);
              }
            }
          }
        };
      return (
        _(Ae(Q)),
        M.add(_),
        () => {
          for (var u of E)
            for (const d of [e, document]) {
              var f = R.get(d),
                c = f.get(u);
              --c == 0
                ? (d.removeEventListener(u, V),
                  f.delete(u),
                  f.size === 0 && R.delete(d))
                : f.set(u, c);
            }
          (M.delete(_), y !== r && y.parentNode?.removeChild(y));
        }
      );
    });
  return (P.set(o, l), o);
}
let P = new WeakMap();
function rt(t, e) {
  const r = P.get(t);
  return r ? (P.delete(t), r(e)) : Promise.resolve();
}
export {
  ze as a,
  Ke as b,
  C as c,
  Xe as d,
  Ue as e,
  Fe as f,
  Ge as g,
  K as h,
  Qe as i,
  Je as j,
  tt as k,
  Be as m,
  Ze as n,
  $e as o,
  et as s,
  rt as u,
};
