import {
  aH as A,
  aI as E,
  aJ as L,
  g as P,
  h as R,
  s as D,
  J as T,
  ad as h,
  aK as m,
  x as w,
  aL as B,
  aM as M,
  a5 as Y,
  aN as y,
  aO as K,
  aG as N,
  aP as G,
} from "./runtime.QfC15RoP.js";
let c = !1;
function J(e) {
  var r = c;
  try {
    return ((c = !1), [e(), c]);
  } finally {
    c = r;
  }
}
const U = {
  get(e, r) {
    if (!e.exclude.includes(r)) return e.props[r];
  },
  set(e, r) {
    return !1;
  },
  getOwnPropertyDescriptor(e, r) {
    if (!e.exclude.includes(r) && r in e.props)
      return { enumerable: !0, configurable: !0, value: e.props[r] };
  },
  has(e, r) {
    return e.exclude.includes(r) ? !1 : r in e.props;
  },
  ownKeys(e) {
    return Reflect.ownKeys(e.props).filter((r) => !e.exclude.includes(r));
  },
};
function q(e, r, a) {
  return new Proxy({ props: e, exclude: r }, U);
}
function z(e, r, a, f) {
  var _ = (a & m) !== 0,
    I = (a & y) !== 0,
    d = f,
    o = !0,
    p = () => (o && ((o = !1), (d = I ? w(f) : f)), d);
  let t;
  if (_) {
    var O = N in e || G in e;
    t = A(e, r)?.set ?? (O && r in e ? (n) => (e[r] = n) : void 0);
  }
  var i,
    S = !1;
  (_ ? ([i, S] = J(() => e[r])) : (i = e[r]),
    i === void 0 && f !== void 0 && ((i = p()), t && (E(), t(i))));
  var s;
  if (
    ((s = () => {
      var n = e[r];
      return n === void 0 ? p() : ((o = !0), n);
    }),
    (a & L) === 0)
  )
    return s;
  if (t) {
    var b = e.$$legacy;
    return function (n, l) {
      return arguments.length > 0 ? ((!l || b || S) && t(l ? s() : n), n) : s();
    };
  }
  var v = !1,
    u = ((a & B) !== 0 ? M : Y)(() => ((v = !1), s()));
  _ && P(u);
  var x = T;
  return function (n, l) {
    if (arguments.length > 0) {
      const g = l ? P(u) : _ ? R(n) : n;
      return (D(u, g), (v = !0), d !== void 0 && (d = g), n);
    }
    return (K && v) || (x.f & h) !== 0 ? u.v : P(u);
  };
}
export { z as p, q as r };
