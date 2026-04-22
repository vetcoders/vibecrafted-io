import {
  G as O,
  i as $,
  V as y,
  j as D,
  I as z,
  F as j,
  k as ee,
  g as U,
  W as ne,
  X as re,
  Y as X,
  H as L,
  B as F,
  Z as ae,
  _ as fe,
  a0 as G,
  q as ie,
  a1 as w,
  a2 as q,
  a3 as le,
  a4 as se,
  a5 as ue,
  a6 as oe,
  a7 as V,
  a8 as te,
  a9 as de,
  aa as ve,
  ab as W,
  ac as ce,
  ad as pe,
  ae as J,
  af as K,
  ag as Y,
  U as ge,
  ah as _e,
  ai as he,
  aj as Ee,
  ak as me,
  al as Te,
  am as we,
} from "./runtime.QfC15RoP.js";
function Ne(e, r) {
  return r;
}
function Ae(e, r, s) {
  for (var o = [], c = r.length, l, i = r.length, p = 0; p < c; p++) {
    let h = r[p];
    K(
      h,
      () => {
        if (l) {
          if ((l.pending.delete(h), l.done.add(h), l.pending.size === 0)) {
            var t = e.outrogroups;
            (B(e, V(l.done)),
              t.delete(l),
              t.size === 0 && (e.outrogroups = null));
          }
        } else i -= 1;
      },
      !1,
    );
  }
  if (i === 0) {
    var f = o.length === 0 && s !== null;
    if (f) {
      var v = s,
        a = v.parentNode;
      (Ee(a), a.append(v), e.items.clear());
    }
    B(e, r, !f);
  } else
    ((l = { pending: new Set(r), done: new Set() }),
      (e.outrogroups ??= new Set()).add(l));
}
function B(e, r, s = !0) {
  var o;
  if (e.pending.size > 0) {
    o = new Set();
    for (const i of e.pending.values())
      for (const p of i) o.add(e.items.get(p).e);
  }
  for (var c = 0; c < r.length; c++) {
    var l = r[c];
    if (o?.has(l)) {
      l.f |= w;
      const i = document.createDocumentFragment();
      me(l, i);
    } else Te(r[c], s);
  }
}
var Z;
function ke(e, r, s, o, c, l = null) {
  var i = e,
    p = new Map(),
    f = (r & y) !== 0;
  if (f) {
    var v = e;
    i = D ? z(j(v)) : v.appendChild(O());
  }
  D && ee();
  var a = null,
    h = ue(() => {
      var d = s();
      return oe(d) ? d : d == null ? [] : V(d);
    }),
    t,
    E = new Map(),
    m = !0;
  function k(d) {
    (C.effect.f & pe) === 0 &&
      (C.pending.delete(d),
      (C.fallback = a),
      Ce(C, t, i, r, o),
      a !== null &&
        (t.length === 0
          ? (a.f & w) === 0
            ? J(a)
            : ((a.f ^= w), H(a, null, i))
          : K(a, () => {
              a = null;
            })));
  }
  function n(d) {
    C.pending.delete(d);
  }
  var u = $(() => {
      t = U(h);
      var d = t.length;
      let _ = !1;
      if (D) {
        var M = ne(i) === re;
        M !== (d === 0) && ((i = X()), z(i), L(!1), (_ = !0));
      }
      for (var S = new Set(), g = ie, x = se(), I = 0; I < d; I += 1) {
        D && F.nodeType === ae && F.data === fe && ((i = F), (_ = !0), L(!1));
        var T = t[I],
          b = o(T, I),
          A = m ? null : p.get(b);
        (A
          ? (A.v && G(A.v, T), A.i && G(A.i, I), x && g.unskip_effect(A.e))
          : ((A = Se(p, m ? i : (Z ??= O()), T, b, I, c, r, s)),
            m || (A.e.f |= w),
            p.set(b, A)),
          S.add(b));
      }
      if (
        (d === 0 &&
          l &&
          !a &&
          (m
            ? (a = q(() => l(i)))
            : ((a = q(() => l((Z ??= O())))), (a.f |= w))),
        d > S.size && le(),
        D && d > 0 && z(X()),
        !m)
      )
        if ((E.set(g, S), x)) {
          for (const [P, Q] of p) S.has(P) || g.skip_effect(Q.e);
          (g.oncommit(k), g.ondiscard(n));
        } else k(g);
      (_ && L(!0), U(h));
    }),
    C = { effect: u, items: p, pending: E, outrogroups: null, fallback: a };
  ((m = !1), D && (i = F));
}
function R(e) {
  for (; e !== null && (e.f & _e) === 0; ) e = e.next;
  return e;
}
function Ce(e, r, s, o, c) {
  var l = (o & he) !== 0,
    i = r.length,
    p = e.items,
    f = R(e.effect.first),
    v,
    a = null,
    h,
    t = [],
    E = [],
    m,
    k,
    n,
    u;
  if (l)
    for (u = 0; u < i; u += 1)
      ((m = r[u]),
        (k = c(m, u)),
        (n = p.get(k).e),
        (n.f & w) === 0 && (n.nodes?.a?.measure(), (h ??= new Set()).add(n)));
  for (u = 0; u < i; u += 1) {
    if (((m = r[u]), (k = c(m, u)), (n = p.get(k).e), e.outrogroups !== null))
      for (const T of e.outrogroups) (T.pending.delete(n), T.done.delete(n));
    if (
      ((n.f & Y) !== 0 &&
        (J(n), l && (n.nodes?.a?.unfix(), (h ??= new Set()).delete(n))),
      (n.f & w) !== 0)
    )
      if (((n.f ^= w), n === f)) H(n, null, s);
      else {
        var C = a ? a.next : f;
        (n === e.effect.last && (e.effect.last = n.prev),
          n.prev && (n.prev.next = n.next),
          n.next && (n.next.prev = n.prev),
          N(e, a, n),
          N(e, n, C),
          H(n, C, s),
          (a = n),
          (t = []),
          (E = []),
          (f = R(a.next)));
        continue;
      }
    if (n !== f) {
      if (v !== void 0 && v.has(n)) {
        if (t.length < E.length) {
          var d = E[0],
            _;
          a = d.prev;
          var M = t[0],
            S = t[t.length - 1];
          for (_ = 0; _ < t.length; _ += 1) H(t[_], d, s);
          for (_ = 0; _ < E.length; _ += 1) v.delete(E[_]);
          (N(e, M.prev, S.next),
            N(e, a, M),
            N(e, S, d),
            (f = d),
            (a = S),
            (u -= 1),
            (t = []),
            (E = []));
        } else
          (v.delete(n),
            H(n, f, s),
            N(e, n.prev, n.next),
            N(e, n, a === null ? e.effect.first : a.next),
            N(e, a, n),
            (a = n));
        continue;
      }
      for (t = [], E = []; f !== null && f !== n; )
        ((v ??= new Set()).add(f), E.push(f), (f = R(f.next)));
      if (f === null) continue;
    }
    ((n.f & w) === 0 && t.push(n), (a = n), (f = R(n.next)));
  }
  if (e.outrogroups !== null) {
    for (const T of e.outrogroups)
      T.pending.size === 0 && (B(e, V(T.done)), e.outrogroups?.delete(T));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (f !== null || v !== void 0) {
    var g = [];
    if (v !== void 0) for (n of v) (n.f & Y) === 0 && g.push(n);
    for (; f !== null; )
      ((f.f & Y) === 0 && f !== e.fallback && g.push(f), (f = R(f.next)));
    var x = g.length;
    if (x > 0) {
      var I = (o & y) !== 0 && i === 0 ? s : null;
      if (l) {
        for (u = 0; u < x; u += 1) g[u].nodes?.a?.measure();
        for (u = 0; u < x; u += 1) g[u].nodes?.a?.fix();
      }
      Ae(e, g, I);
    }
  }
  l &&
    ge(() => {
      if (h !== void 0) for (n of h) n.nodes?.a?.apply();
    });
}
function Se(e, r, s, o, c, l, i, p) {
  var f = (i & te) !== 0 ? ((i & de) === 0 ? ve(s, !1, !1) : W(s)) : null,
    v = (i & ce) !== 0 ? W(c) : null;
  return {
    v: f,
    i: v,
    e: q(
      () => (
        l(r, f ?? s, v ?? c, p),
        () => {
          e.delete(o);
        }
      ),
    ),
  };
}
function H(e, r, s) {
  if (e.nodes)
    for (
      var o = e.nodes.start,
        c = e.nodes.end,
        l = r && (r.f & w) === 0 ? r.nodes.start : s;
      o !== null;
    ) {
      var i = we(o);
      if ((l.before(o), o === c)) return;
      o = i;
    }
}
function N(e, r, s) {
  (r === null ? (e.effect.first = s) : (r.next = s),
    s === null ? (e.effect.last = r) : (s.prev = r));
}
export { ke as e, Ne as i };
