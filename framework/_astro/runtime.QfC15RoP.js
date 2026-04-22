const Mn = 1,
  Cn = 2,
  Pn = 4,
  Ln = 8,
  Fn = 16,
  jn = 1,
  Yn = 4,
  Hn = 8,
  qn = 16,
  Un = 1,
  Bn = 2,
  Vn = 4,
  Gn = 1,
  zn = 2,
  Kn = "[",
  Xn = "[!",
  Zn = "[?",
  $n = "]",
  qe = {},
  g = Symbol(),
  Ht = "http://www.w3.org/1999/xhtml",
  Wn = "http://www.w3.org/2000/svg",
  Jn = "http://www.w3.org/1998/Math/MathML",
  Qn = "@attach",
  qt = !1;
var Ut = Array.isArray,
  Bt = Array.prototype.indexOf,
  ae = Array.prototype.includes,
  er = Array.from,
  tr = Object.defineProperty,
  de = Object.getOwnPropertyDescriptor,
  Vt = Object.getOwnPropertyDescriptors,
  Gt = Object.prototype,
  zt = Array.prototype,
  ft = Object.getPrototypeOf,
  Qe = Object.isExtensible;
function nr(e) {
  return typeof e == "function";
}
const Kt = () => {};
function Xt(e) {
  for (var t = 0; t < e.length; t++) e[t]();
}
function ot() {
  var e,
    t,
    n = new Promise((r, s) => {
      ((e = r), (t = s));
    });
  return { promise: n, resolve: e, reject: t };
}
const b = 2,
  le = 4,
  Oe = 8,
  Ue = 1 << 24,
  C = 16,
  P = 32,
  J = 64,
  Zt = 128,
  R = 512,
  E = 1024,
  m = 2048,
  L = 4096,
  D = 8192,
  M = 16384,
  se = 32768,
  et = 1 << 25,
  Te = 65536,
  Me = 1 << 17,
  $t = 1 << 18,
  ye = 1 << 19,
  Wt = 1 << 20,
  rr = 1 << 25,
  Q = 65536,
  Ce = 1 << 21,
  pe = 1 << 22,
  U = 1 << 23,
  Z = Symbol("$state"),
  sr = Symbol("legacy props"),
  ir = Symbol(""),
  H = new (class extends Error {
    name = "StaleReactionError";
    message =
      "The reaction that called `getAbortSignal()` was re-run or destroyed";
  })(),
  lr =
    !!globalThis.document?.contentType &&
    globalThis.document.contentType.includes("xml"),
  fr = 1,
  xe = 3,
  ut = 8;
function Jt() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function or(e, t, n) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function Qt(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function en() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function tn(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function nn() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function ur() {
  throw new Error("https://svelte.dev/e/hydration_failed");
}
function cr(e) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function rn() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function sn() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function an() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function _r() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
function Be(e) {
  console.warn("https://svelte.dev/e/hydration_mismatch");
}
function vr() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function dr() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
let ee = !1;
function hr(e) {
  ee = e;
}
let A;
function fe(e) {
  if (e === null) throw (Be(), qe);
  return (A = e);
}
function pr() {
  return fe(V(A));
}
function wr(e) {
  if (ee) {
    if (V(A) !== null) throw (Be(), qe);
    A = e;
  }
}
function yr(e = 1) {
  if (ee) {
    for (var t = e, n = A; t--; ) n = V(n);
    A = n;
  }
}
function Er(e = !0) {
  for (var t = 0, n = A; ; ) {
    if (n.nodeType === ut) {
      var r = n.data;
      if (r === "]") {
        if (t === 0) return n;
        t -= 1;
      } else
        (r === "[" ||
          r === "[!" ||
          (r[0] === "[" && !isNaN(Number(r.slice(1))))) &&
          (t += 1);
    }
    var s = V(n);
    (e && n.remove(), (n = s));
  }
}
function gr(e) {
  if (!e || e.nodeType !== ut) throw (Be(), qe);
  return e.data;
}
function ct(e) {
  return e === this.v;
}
function ln(e, t) {
  return e != e
    ? t == t
    : e !== t || (e !== null && typeof e == "object") || typeof e == "function";
}
function _t(e) {
  return !ln(e, this.v);
}
let fn = !1,
  F = null;
function Ae(e) {
  F = e;
}
function br(e, t = !1, n) {
  F = { p: F, i: !1, c: null, e: null, s: e, x: null, r: d, l: null };
}
function mr(e) {
  var t = F,
    n = t.e;
  if (n !== null) {
    t.e = null;
    for (var r of n) Ot(r);
  }
  return ((t.i = !0), (F = t.p), {});
}
function vt() {
  return !0;
}
let K = [];
function dt() {
  var e = K;
  ((K = []), Xt(e));
}
function Pe(e) {
  if (K.length === 0 && !he) {
    var t = K;
    queueMicrotask(() => {
      t === K && dt();
    });
  }
  K.push(e);
}
function on() {
  for (; K.length > 0; ) dt();
}
function un(e) {
  var t = d;
  if (t === null) return ((v.f |= U), e);
  if ((t.f & se) === 0 && (t.f & le) === 0) throw e;
  Se(e, t);
}
function Se(e, t) {
  for (; t !== null; ) {
    if ((t.f & Zt) !== 0) {
      if ((t.f & se) === 0) throw e;
      try {
        t.b.error(e);
        return;
      } catch (n) {
        e = n;
      }
    }
    t = t.parent;
  }
  throw e;
}
const cn = -7169;
function y(e, t) {
  e.f = (e.f & cn) | t;
}
function Ve(e) {
  (e.f & R) !== 0 || e.deps === null ? y(e, E) : y(e, L);
}
function ht(e) {
  if (e !== null)
    for (const t of e)
      (t.f & b) === 0 || (t.f & Q) === 0 || ((t.f ^= Q), ht(t.deps));
}
function _n(e, t, n) {
  ((e.f & m) !== 0 ? t.add(e) : (e.f & L) !== 0 && n.add(e),
    ht(e.deps),
    y(e, E));
}
const G = new Set();
let w = null,
  k = null,
  Le = null,
  he = !1,
  Ie = !1,
  ie = null,
  be = null;
var tt = 0;
let vn = 1;
class te {
  id = vn++;
  current = new Map();
  previous = new Map();
  #l = new Set();
  #f = new Set();
  #r = new Map();
  #t = new Map();
  #d = null;
  #e = [];
  #h = [];
  #i = new Set();
  #s = new Set();
  #n = new Map();
  #o = new Set();
  is_fork = !1;
  #u = !1;
  #a = new Set();
  #c() {
    return this.is_fork || this.#t.size > 0;
  }
  #w() {
    for (const r of this.#a)
      for (const s of r.#t.keys()) {
        for (var t = !1, n = s; n.parent !== null; ) {
          if (this.#n.has(n)) {
            t = !0;
            break;
          }
          n = n.parent;
        }
        if (!t) return !0;
      }
    return !1;
  }
  skip_effect(t) {
    (this.#n.has(t) || this.#n.set(t, { d: [], m: [] }), this.#o.delete(t));
  }
  unskip_effect(t, n = (r) => this.schedule(r)) {
    var r = this.#n.get(t);
    if (r) {
      this.#n.delete(t);
      for (var s of r.d) (y(s, m), n(s));
      for (s of r.m) (y(s, L), n(s));
    }
    this.#o.add(t);
  }
  #_() {
    if ((tt++ > 1e3 && (G.delete(this), hn()), !this.#c())) {
      for (const a of this.#i) (this.#s.delete(a), y(a, m), this.schedule(a));
      for (const a of this.#s) (y(a, L), this.schedule(a));
    }
    const t = this.#e;
    ((this.#e = []), this.apply());
    var n = (ie = []),
      r = [],
      s = (be = []);
    for (const a of t)
      try {
        this.#p(a, n, r);
      } catch (l) {
        throw (yt(a), l);
      }
    if (((w = null), s.length > 0)) {
      var i = te.ensure();
      for (const a of s) i.schedule(a);
    }
    if (((ie = null), (be = null), this.#c() || this.#w())) {
      (this.#v(r), this.#v(n));
      for (const [a, l] of this.#n) wt(a, l);
    } else {
      (this.#r.size === 0 && G.delete(this), this.#i.clear(), this.#s.clear());
      for (const a of this.#l) a(this);
      (this.#l.clear(), nt(r), nt(n), this.#d?.resolve());
    }
    var o = w;
    if (this.#e.length > 0) {
      const a = (o ??= this);
      a.#e.push(...this.#e.filter((l) => !a.#e.includes(l)));
    }
    o !== null && (G.add(o), o.#_());
  }
  #p(t, n, r) {
    t.f ^= E;
    for (var s = t.first; s !== null; ) {
      var i = s.f,
        o = (i & (P | J)) !== 0,
        a = o && (i & E) !== 0,
        l = a || (i & D) !== 0 || this.#n.has(s);
      if (!l && s.fn !== null) {
        o
          ? (s.f ^= E)
          : (i & le) !== 0
            ? n.push(s)
            : Ee(s) && ((i & C) !== 0 && this.#s.add(s), ue(s));
        var u = s.first;
        if (u !== null) {
          s = u;
          continue;
        }
      }
      for (; s !== null; ) {
        var f = s.next;
        if (f !== null) {
          s = f;
          break;
        }
        s = s.parent;
      }
    }
  }
  #v(t) {
    for (var n = 0; n < t.length; n += 1) _n(t[n], this.#i, this.#s);
  }
  capture(t, n, r = !1) {
    (t.v !== g && !this.previous.has(t) && this.previous.set(t, t.v),
      (t.f & U) === 0 && (this.current.set(t, [n, r]), k?.set(t, n)),
      this.is_fork || (t.v = n));
  }
  activate() {
    w = this;
  }
  deactivate() {
    ((w = null), (k = null));
  }
  flush() {
    try {
      ((Ie = !0), (w = this), this.#_());
    } finally {
      ((tt = 0),
        (Le = null),
        (ie = null),
        (be = null),
        (Ie = !1),
        (w = null),
        (k = null),
        $.clear());
    }
  }
  discard() {
    for (const t of this.#f) t(this);
    (this.#f.clear(), G.delete(this));
  }
  register_created_effect(t) {
    this.#h.push(t);
  }
  #y() {
    for (const f of G) {
      var t = f.id < this.id,
        n = [];
      for (const [c, [_, p]] of this.current) {
        if (f.current.has(c)) {
          var r = f.current.get(c)[0];
          if (t && _ !== r) f.current.set(c, [_, p]);
          else continue;
        }
        n.push(c);
      }
      var s = [...f.current.keys()].filter((c) => !this.current.has(c));
      if (s.length === 0) t && f.discard();
      else if (n.length > 0) {
        if (t)
          for (const c of this.#o)
            f.unskip_effect(c, (_) => {
              (_.f & (C | pe)) !== 0 ? f.schedule(_) : f.#v([_]);
            });
        f.activate();
        var i = new Set(),
          o = new Map();
        for (var a of n) pt(a, s, i, o);
        o = new Map();
        var l = [...f.current.keys()].filter((c) =>
          this.current.has(c) ? this.current.get(c)[0] !== c : !0,
        );
        for (const c of this.#h)
          (c.f & (M | D | Me)) === 0 &&
            Ge(c, l, o) &&
            ((c.f & (pe | C)) !== 0 ? (y(c, m), f.schedule(c)) : f.#i.add(c));
        if (f.#e.length > 0) {
          f.apply();
          for (var u of f.#e) f.#p(u, [], []);
          f.#e = [];
        }
        f.deactivate();
      }
    }
    for (const f of G)
      f.#a.has(this) &&
        (f.#a.delete(this),
        f.#a.size === 0 && !f.#c() && (f.activate(), f.#_()));
  }
  increment(t, n) {
    let r = this.#r.get(n) ?? 0;
    if ((this.#r.set(n, r + 1), t)) {
      let s = this.#t.get(n) ?? 0;
      this.#t.set(n, s + 1);
    }
  }
  decrement(t, n, r) {
    let s = this.#r.get(n) ?? 0;
    if ((s === 1 ? this.#r.delete(n) : this.#r.set(n, s - 1), t)) {
      let i = this.#t.get(n) ?? 0;
      i === 1 ? this.#t.delete(n) : this.#t.set(n, i - 1);
    }
    this.#u ||
      r ||
      ((this.#u = !0),
      Pe(() => {
        ((this.#u = !1), this.flush());
      }));
  }
  transfer_effects(t, n) {
    for (const r of t) this.#i.add(r);
    for (const r of n) this.#s.add(r);
    (t.clear(), n.clear());
  }
  oncommit(t) {
    this.#l.add(t);
  }
  ondiscard(t) {
    this.#f.add(t);
  }
  settled() {
    return (this.#d ??= ot()).promise;
  }
  static ensure() {
    if (w === null) {
      const t = (w = new te());
      Ie ||
        (G.add(w),
        he ||
          Pe(() => {
            w === t && t.flush();
          }));
    }
    return w;
  }
  apply() {
    {
      k = null;
      return;
    }
  }
  schedule(t) {
    if (
      ((Le = t),
      t.b?.is_pending && (t.f & (le | Oe | Ue)) !== 0 && (t.f & se) === 0)
    ) {
      t.b.defer_effect(t);
      return;
    }
    for (var n = t; n.parent !== null; ) {
      n = n.parent;
      var r = n.f;
      if (ie !== null && n === d && (v === null || (v.f & b) === 0)) return;
      if ((r & (J | P)) !== 0) {
        if ((r & E) === 0) return;
        n.f ^= E;
      }
    }
    this.#e.push(n);
  }
}
function dn(e) {
  var t = he;
  he = !0;
  try {
    for (var n; ; ) {
      if ((on(), w === null)) return n;
      w.flush();
    }
  } finally {
    he = t;
  }
}
function hn() {
  try {
    nn();
  } catch (e) {
    Se(e, Le);
  }
}
let Y = null;
function nt(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if (
        (r.f & (M | D)) === 0 &&
        Ee(r) &&
        ((Y = new Set()),
        ue(r),
        r.deps === null &&
          r.first === null &&
          r.nodes === null &&
          r.teardown === null &&
          r.ac === null &&
          kt(r),
        Y?.size > 0)
      ) {
        $.clear();
        for (const s of Y) {
          if ((s.f & (M | D)) !== 0) continue;
          const i = [s];
          let o = s.parent;
          for (; o !== null; )
            (Y.has(o) && (Y.delete(o), i.push(o)), (o = o.parent));
          for (let a = i.length - 1; a >= 0; a--) {
            const l = i[a];
            (l.f & (M | D)) === 0 && ue(l);
          }
        }
        Y.clear();
      }
    }
    Y = null;
  }
}
function pt(e, t, n, r) {
  if (!n.has(e) && (n.add(e), e.reactions !== null))
    for (const s of e.reactions) {
      const i = s.f;
      (i & b) !== 0
        ? pt(s, t, n, r)
        : (i & (pe | C)) !== 0 &&
          (i & m) === 0 &&
          Ge(s, t, r) &&
          (y(s, m), ze(s));
    }
}
function Ge(e, t, n) {
  const r = n.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const s of e.deps) {
      if (ae.call(t, s)) return !0;
      if ((s.f & b) !== 0 && Ge(s, t, n)) return (n.set(s, !0), !0);
    }
  return (n.set(e, !1), !1);
}
function ze(e) {
  w.schedule(e);
}
function wt(e, t) {
  if (!((e.f & P) !== 0 && (e.f & E) !== 0)) {
    ((e.f & m) !== 0 ? t.d.push(e) : (e.f & L) !== 0 && t.m.push(e), y(e, E));
    for (var n = e.first; n !== null; ) (wt(n, t), (n = n.next));
  }
}
function yt(e) {
  y(e, E);
  for (var t = e.first; t !== null; ) (yt(t), (t = t.next));
}
function pn(e, t, n, r) {
  const s = Ke;
  var i = e.filter((_) => !_.settled);
  if (n.length === 0 && i.length === 0) {
    r(t.map(s));
    return;
  }
  var o = d,
    a = wn(),
    l =
      i.length === 1
        ? i[0].promise
        : i.length > 1
          ? Promise.all(i.map((_) => _.promise))
          : null;
  function u(_) {
    a();
    try {
      r(_);
    } catch (p) {
      (o.f & M) === 0 && Se(p, o);
    }
    Ne();
  }
  if (n.length === 0) {
    l.then(() => u(t.map(s)));
    return;
  }
  var f = Et();
  function c() {
    Promise.all(n.map((_) => yn(_)))
      .then((_) => u([...t.map(s), ..._]))
      .catch((_) => Se(_, o))
      .finally(() => f());
  }
  l
    ? l.then(() => {
        (a(), c(), Ne());
      })
    : c();
}
function wn() {
  var e = d,
    t = v,
    n = F,
    r = w;
  return function (i = !0) {
    (oe(e), B(t), Ae(n), i && (e.f & M) === 0 && (r?.activate(), r?.apply()));
  };
}
function Ne(e = !0) {
  (oe(null), B(null), Ae(null), e && w?.deactivate());
}
function Et() {
  var e = d,
    t = e.b,
    n = w,
    r = t.is_rendered();
  return (
    t.update_pending_count(1, n),
    n.increment(r, e),
    (s = !1) => {
      (t.update_pending_count(-1, n), n.decrement(r, e, s));
    }
  );
}
function Ke(e) {
  var t = b | m,
    n = v !== null && (v.f & b) !== 0 ? v : null;
  return (
    d !== null && (d.f |= ye),
    {
      ctx: F,
      deps: null,
      effects: null,
      equals: ct,
      f: t,
      fn: e,
      reactions: null,
      rv: 0,
      v: g,
      wv: 0,
      parent: n ?? d,
      ac: null,
    }
  );
}
function yn(e, t, n) {
  let r = d;
  r === null && Jt();
  var s = void 0,
    i = Ze(g),
    o = !v,
    a = new Map();
  return (
    Rn(() => {
      var l = d,
        u = ot();
      s = u.promise;
      try {
        Promise.resolve(e()).then(u.resolve, u.reject).finally(Ne);
      } catch (p) {
        (u.reject(p), Ne());
      }
      var f = w;
      if (o) {
        if ((l.f & se) !== 0) var c = Et();
        if (r.b.is_rendered()) (a.get(f)?.reject(H), a.delete(f));
        else {
          for (const p of a.values()) p.reject(H);
          a.clear();
        }
        a.set(f, u);
      }
      const _ = (p, h = void 0) => {
        if (c) {
          var x = h === H;
          c(x);
        }
        if (!(h === H || (l.f & M) !== 0)) {
          if ((f.activate(), h)) ((i.f |= U), je(i, h));
          else {
            ((i.f & U) !== 0 && (i.f ^= U), je(i, p));
            for (const [ce, ge] of a) {
              if ((a.delete(ce), ce === f)) break;
              ge.reject(H);
            }
          }
          f.deactivate();
        }
      };
      u.promise.then(_, (p) => _(null, p || "unknown"));
    }),
    Rt(() => {
      for (const l of a.values()) l.reject(H);
    }),
    new Promise((l) => {
      function u(f) {
        function c() {
          f === s ? l(i) : u(s);
        }
        f.then(c, c);
      }
      u(s);
    })
  );
}
function Tr(e) {
  const t = Ke(e);
  return (Mt(t), t);
}
function Ar(e) {
  const t = Ke(e);
  return ((t.equals = _t), t);
}
function En(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1) ne(t[n]);
  }
}
function gn(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & b) === 0) return (t.f & M) === 0 ? t : null;
    t = t.parent;
  }
  return null;
}
function Xe(e) {
  var t,
    n = d;
  oe(gn(e));
  try {
    ((e.f &= ~Q), En(e), (t = Ft(e)));
  } finally {
    oe(n);
  }
  return t;
}
function gt(e) {
  var t = Xe(e);
  if (
    !e.equals(t) &&
    ((e.wv = Pt()),
    (!w?.is_fork || e.deps === null) &&
      (w !== null ? w.capture(e, t, !0) : (e.v = t), e.deps === null))
  ) {
    y(e, E);
    return;
  }
  re || (k !== null ? (Nt() || w?.is_fork) && k.set(e, t) : Ve(e));
}
function bn(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      (t.teardown || t.ac) &&
        (t.teardown?.(),
        t.ac?.abort(H),
        (t.teardown = Kt),
        (t.ac = null),
        we(t, 0),
        Je(t));
}
function bt(e) {
  if (e.effects !== null) for (const t of e.effects) t.teardown && ue(t);
}
let Fe = new Set();
const $ = new Map();
let mt = !1;
function Ze(e, t) {
  var n = { f: 0, v: e, reactions: null, equals: ct, rv: 0, wv: 0 };
  return n;
}
function q(e, t) {
  const n = Ze(e);
  return (Mt(n), n);
}
function Sr(e, t = !1, n = !0) {
  const r = Ze(e);
  return (t || (r.equals = _t), r);
}
function z(e, t, n = !1) {
  v !== null &&
    (!I || (v.f & Me) !== 0) &&
    vt() &&
    (v.f & (b | C | pe | Me)) !== 0 &&
    (O === null || !ae.call(O, e)) &&
    an();
  let r = n ? _e(t) : t;
  return je(e, r, be);
}
function je(e, t, n = null) {
  if (!e.equals(t)) {
    $.set(e, re ? t : e.v);
    var r = te.ensure();
    if ((r.capture(e, t), (e.f & b) !== 0)) {
      const s = e;
      ((e.f & m) !== 0 && Xe(s), k === null && Ve(s));
    }
    ((e.wv = Pt()),
      Tt(e, m, n),
      d !== null &&
        (d.f & E) !== 0 &&
        (d.f & (P | J)) === 0 &&
        (N === null ? In([e]) : N.push(e)),
      !r.is_fork && Fe.size > 0 && !mt && mn());
  }
  return t;
}
function mn() {
  mt = !1;
  for (const e of Fe) ((e.f & E) !== 0 && y(e, L), Ee(e) && ue(e));
  Fe.clear();
}
function De(e) {
  z(e, e.v + 1);
}
function Tt(e, t, n) {
  var r = e.reactions;
  if (r !== null)
    for (var s = r.length, i = 0; i < s; i++) {
      var o = r[i],
        a = o.f,
        l = (a & m) === 0;
      if ((l && y(o, t), (a & b) !== 0)) {
        var u = o;
        (k?.delete(u), (a & Q) === 0 && (a & R && (o.f |= Q), Tt(u, L, n)));
      } else if (l) {
        var f = o;
        ((a & C) !== 0 && Y !== null && Y.add(f),
          n !== null ? n.push(f) : ze(f));
      }
    }
}
function _e(e) {
  if (typeof e != "object" || e === null || Z in e) return e;
  const t = ft(e);
  if (t !== Gt && t !== zt) return e;
  var n = new Map(),
    r = Ut(e),
    s = q(0),
    i = W,
    o = (a) => {
      if (W === i) return a();
      var l = v,
        u = W;
      (B(null), lt(i));
      var f = a();
      return (B(l), lt(u), f);
    };
  return (
    r && n.set("length", q(e.length)),
    new Proxy(e, {
      defineProperty(a, l, u) {
        (!("value" in u) ||
          u.configurable === !1 ||
          u.enumerable === !1 ||
          u.writable === !1) &&
          rn();
        var f = n.get(l);
        return (
          f === void 0
            ? o(() => {
                var c = q(u.value);
                return (n.set(l, c), c);
              })
            : z(f, u.value, !0),
          !0
        );
      },
      deleteProperty(a, l) {
        var u = n.get(l);
        if (u === void 0) {
          if (l in a) {
            const f = o(() => q(g));
            (n.set(l, f), De(s));
          }
        } else (z(u, g), De(s));
        return !0;
      },
      get(a, l, u) {
        if (l === Z) return e;
        var f = n.get(l),
          c = l in a;
        if (
          (f === void 0 &&
            (!c || de(a, l)?.writable) &&
            ((f = o(() => {
              var p = _e(c ? a[l] : g),
                h = q(p);
              return h;
            })),
            n.set(l, f)),
          f !== void 0)
        ) {
          var _ = ve(f);
          return _ === g ? void 0 : _;
        }
        return Reflect.get(a, l, u);
      },
      getOwnPropertyDescriptor(a, l) {
        var u = Reflect.getOwnPropertyDescriptor(a, l);
        if (u && "value" in u) {
          var f = n.get(l);
          f && (u.value = ve(f));
        } else if (u === void 0) {
          var c = n.get(l),
            _ = c?.v;
          if (c !== void 0 && _ !== g)
            return { enumerable: !0, configurable: !0, value: _, writable: !0 };
        }
        return u;
      },
      has(a, l) {
        if (l === Z) return !0;
        var u = n.get(l),
          f = (u !== void 0 && u.v !== g) || Reflect.has(a, l);
        if (u !== void 0 || (d !== null && (!f || de(a, l)?.writable))) {
          u === void 0 &&
            ((u = o(() => {
              var _ = f ? _e(a[l]) : g,
                p = q(_);
              return p;
            })),
            n.set(l, u));
          var c = ve(u);
          if (c === g) return !1;
        }
        return f;
      },
      set(a, l, u, f) {
        var c = n.get(l),
          _ = l in a;
        if (r && l === "length")
          for (var p = u; p < c.v; p += 1) {
            var h = n.get(p + "");
            h !== void 0
              ? z(h, g)
              : p in a && ((h = o(() => q(g))), n.set(p + "", h));
          }
        if (c === void 0)
          (!_ || de(a, l)?.writable) &&
            ((c = o(() => q(void 0))), z(c, _e(u)), n.set(l, c));
        else {
          _ = c.v !== g;
          var x = o(() => _e(u));
          z(c, x);
        }
        var ce = Reflect.getOwnPropertyDescriptor(a, l);
        if ((ce?.set && ce.set.call(f, u), !_)) {
          if (r && typeof l == "string") {
            var ge = n.get("length"),
              ke = Number(l);
            Number.isInteger(ke) && ke >= ge.v && z(ge, ke + 1);
          }
          De(s);
        }
        return !0;
      },
      ownKeys(a) {
        ve(s);
        var l = Reflect.ownKeys(a).filter((c) => {
          var _ = n.get(c);
          return _ === void 0 || _.v !== g;
        });
        for (var [u, f] of n) f.v !== g && !(u in a) && l.push(u);
        return l;
      },
      setPrototypeOf() {
        sn();
      },
    })
  );
}
function rt(e) {
  try {
    if (e !== null && typeof e == "object" && Z in e) return e[Z];
  } catch {}
  return e;
}
function Nr(e, t) {
  return Object.is(rt(e), rt(t));
}
var st, Tn, At, St;
function Rr() {
  if (st === void 0) {
    ((st = window), (Tn = /Firefox/.test(navigator.userAgent)));
    var e = Element.prototype,
      t = Node.prototype,
      n = Text.prototype;
    ((At = de(t, "firstChild").get),
      (St = de(t, "nextSibling").get),
      Qe(e) &&
        ((e.__click = void 0),
        (e.__className = void 0),
        (e.__attributes = null),
        (e.__style = void 0),
        (e.__e = void 0)),
      Qe(n) && (n.__t = void 0));
  }
}
function Re(e = "") {
  return document.createTextNode(e);
}
function Ye(e) {
  return At.call(e);
}
function V(e) {
  return St.call(e);
}
function Or(e, t) {
  if (!ee) return Ye(e);
  var n = Ye(A);
  if (n === null) n = A.appendChild(Re());
  else if (t && n.nodeType !== xe) {
    var r = Re();
    return (n?.before(r), fe(r), r);
  }
  return (t && $e(n), fe(n), n);
}
function xr(e, t = !1) {
  if (!ee) {
    var n = Ye(e);
    return n instanceof Comment && n.data === "" ? V(n) : n;
  }
  if (t) {
    if (A?.nodeType !== xe) {
      var r = Re();
      return (A?.before(r), fe(r), r);
    }
    $e(A);
  }
  return A;
}
function kr(e, t = 1, n = !1) {
  let r = ee ? A : e;
  for (var s; t--; ) ((s = r), (r = V(r)));
  if (!ee) return r;
  if (n) {
    if (r?.nodeType !== xe) {
      var i = Re();
      return (r === null ? s?.after(i) : r.before(i), fe(i), i);
    }
    $e(r);
  }
  return (fe(r), r);
}
function Ir(e) {
  e.textContent = "";
}
function Dr() {
  return !1;
}
function Mr(e, t, n) {
  return document.createElementNS(t ?? Ht, e, void 0);
}
function $e(e) {
  if (e.nodeValue.length < 65536) return;
  let t = e.nextSibling;
  for (; t !== null && t.nodeType === xe; )
    (t.remove(), (e.nodeValue += t.nodeValue), (t = e.nextSibling));
}
function Cr(e, t) {
  if (t) {
    const n = document.body;
    ((e.autofocus = !0),
      Pe(() => {
        document.activeElement === n && e.focus();
      }));
  }
}
let it = !1;
function An() {
  it ||
    ((it = !0),
    document.addEventListener(
      "reset",
      (e) => {
        Promise.resolve().then(() => {
          if (!e.defaultPrevented)
            for (const t of e.target.elements) t.__on_r?.();
        });
      },
      { capture: !0 },
    ));
}
function Pr(e, t, n, r = !0) {
  r && n();
  for (var s of t) e.addEventListener(s, n);
  Rt(() => {
    for (var i of t) e.removeEventListener(i, n);
  });
}
function We(e) {
  var t = v,
    n = d;
  (B(null), oe(null));
  try {
    return e();
  } finally {
    (B(t), oe(n));
  }
}
function Lr(e, t, n, r = n) {
  e.addEventListener(t, () => We(n));
  const s = e.__on_r;
  (s
    ? (e.__on_r = () => {
        (s(), r(!0));
      })
    : (e.__on_r = () => r(!0)),
    An());
}
function Sn(e) {
  (d === null && (v === null && tn(), en()), re && Qt());
}
function Nn(e, t) {
  var n = t.last;
  n === null
    ? (t.last = t.first = e)
    : ((n.next = e), (e.prev = n), (t.last = e));
}
function j(e, t) {
  var n = d;
  n !== null && (n.f & D) !== 0 && (e |= D);
  var r = {
    ctx: F,
    deps: null,
    nodes: null,
    f: e | m | R,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: n,
    b: n && n.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null,
  };
  w?.register_created_effect(r);
  var s = r;
  if ((e & le) !== 0) ie !== null ? ie.push(r) : te.ensure().schedule(r);
  else if (t !== null) {
    try {
      ue(r);
    } catch (o) {
      throw (ne(r), o);
    }
    s.deps === null &&
      s.teardown === null &&
      s.nodes === null &&
      s.first === s.last &&
      (s.f & ye) === 0 &&
      ((s = s.first),
      (e & C) !== 0 && (e & Te) !== 0 && s !== null && (s.f |= Te));
  }
  if (
    s !== null &&
    ((s.parent = n),
    n !== null && Nn(s, n),
    v !== null && (v.f & b) !== 0 && (e & J) === 0)
  ) {
    var i = v;
    (i.effects ??= []).push(s);
  }
  return r;
}
function Nt() {
  return v !== null && !I;
}
function Rt(e) {
  const t = j(Oe, null);
  return (y(t, E), (t.teardown = e), t);
}
function Fr(e) {
  Sn();
  var t = d.f,
    n = !v && (t & P) !== 0 && (t & se) === 0;
  if (n) {
    var r = F;
    (r.e ??= []).push(e);
  } else return Ot(e);
}
function Ot(e) {
  return j(le | Wt, e);
}
function jr(e) {
  te.ensure();
  const t = j(J | ye, e);
  return (n = {}) =>
    new Promise((r) => {
      n.outro
        ? kn(t, () => {
            (ne(t), r(void 0));
          })
        : (ne(t), r(void 0));
    });
}
function Yr(e) {
  return j(le, e);
}
function Rn(e) {
  return j(pe | ye, e);
}
function Hr(e, t = 0) {
  return j(Oe | t, e);
}
function qr(e, t = [], n = [], r = []) {
  pn(r, t, n, (s) => {
    j(Oe, () => e(...s.map(ve)));
  });
}
function Ur(e, t = 0) {
  var n = j(C | t, e);
  return n;
}
function Br(e, t = 0) {
  var n = j(Ue | t, e);
  return n;
}
function Vr(e) {
  return j(P | ye, e);
}
function xt(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = re,
      r = v;
    (at(!0), B(null));
    try {
      t.call(null);
    } finally {
      (at(n), B(r));
    }
  }
}
function Je(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    const s = n.ac;
    s !== null &&
      We(() => {
        s.abort(H);
      });
    var r = n.next;
    ((n.f & J) !== 0 ? (n.parent = null) : ne(n, t), (n = r));
  }
}
function On(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    ((t.f & P) === 0 && ne(t), (t = n));
  }
}
function ne(e, t = !0) {
  var n = !1;
  ((t || (e.f & $t) !== 0) &&
    e.nodes !== null &&
    e.nodes.end !== null &&
    (xn(e.nodes.start, e.nodes.end), (n = !0)),
    y(e, et),
    Je(e, t && !n),
    we(e, 0));
  var r = e.nodes && e.nodes.t;
  if (r !== null) for (const i of r) i.stop();
  (xt(e), (e.f ^= et), (e.f |= M));
  var s = e.parent;
  (s !== null && s.first !== null && kt(e),
    (e.next =
      e.prev =
      e.teardown =
      e.ctx =
      e.deps =
      e.fn =
      e.nodes =
      e.ac =
      e.b =
        null));
}
function xn(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : V(e);
    (e.remove(), (e = n));
  }
}
function kt(e) {
  var t = e.parent,
    n = e.prev,
    r = e.next;
  (n !== null && (n.next = r),
    r !== null && (r.prev = n),
    t !== null &&
      (t.first === e && (t.first = r), t.last === e && (t.last = n)));
}
function kn(e, t, n = !0) {
  var r = [];
  It(e, r, !0);
  var s = () => {
      (n && ne(e), t && t());
    },
    i = r.length;
  if (i > 0) {
    var o = () => --i || s();
    for (var a of r) a.out(o);
  } else s();
}
function It(e, t, n) {
  if ((e.f & D) === 0) {
    e.f ^= D;
    var r = e.nodes && e.nodes.t;
    if (r !== null) for (const a of r) (a.is_global || n) && t.push(a);
    for (var s = e.first; s !== null; ) {
      var i = s.next,
        o = (s.f & Te) !== 0 || ((s.f & P) !== 0 && (e.f & C) !== 0);
      (It(s, t, o ? n : !1), (s = i));
    }
  }
}
function Gr(e) {
  Dt(e, !0);
}
function Dt(e, t) {
  if ((e.f & D) !== 0) {
    ((e.f ^= D), (e.f & E) === 0 && (y(e, m), te.ensure().schedule(e)));
    for (var n = e.first; n !== null; ) {
      var r = n.next,
        s = (n.f & Te) !== 0 || (n.f & P) !== 0;
      (Dt(n, s ? t : !1), (n = r));
    }
    var i = e.nodes && e.nodes.t;
    if (i !== null) for (const o of i) (o.is_global || t) && o.in();
  }
}
function zr(e, t) {
  if (e.nodes)
    for (var n = e.nodes.start, r = e.nodes.end; n !== null; ) {
      var s = n === r ? null : V(n);
      (t.append(n), (n = s));
    }
}
let me = !1,
  re = !1;
function at(e) {
  re = e;
}
let v = null,
  I = !1;
function B(e) {
  v = e;
}
let d = null;
function oe(e) {
  d = e;
}
let O = null;
function Mt(e) {
  v !== null && (O === null ? (O = [e]) : O.push(e));
}
let T = null,
  S = 0,
  N = null;
function In(e) {
  N = e;
}
let Ct = 1,
  X = 0,
  W = X;
function lt(e) {
  W = e;
}
function Pt() {
  return ++Ct;
}
function Ee(e) {
  var t = e.f;
  if ((t & m) !== 0) return !0;
  if ((t & b && (e.f &= ~Q), (t & L) !== 0)) {
    for (var n = e.deps, r = n.length, s = 0; s < r; s++) {
      var i = n[s];
      if ((Ee(i) && gt(i), i.wv > e.wv)) return !0;
    }
    (t & R) !== 0 && k === null && y(e, E);
  }
  return !1;
}
function Lt(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !(O !== null && ae.call(O, e)))
    for (var s = 0; s < r.length; s++) {
      var i = r[s];
      (i.f & b) !== 0
        ? Lt(i, t, !1)
        : t === i && (n ? y(i, m) : (i.f & E) !== 0 && y(i, L), ze(i));
    }
}
function Ft(e) {
  var t = T,
    n = S,
    r = N,
    s = v,
    i = O,
    o = F,
    a = I,
    l = W,
    u = e.f;
  ((T = null),
    (S = 0),
    (N = null),
    (v = (u & (P | J)) === 0 ? e : null),
    (O = null),
    Ae(e.ctx),
    (I = !1),
    (W = ++X),
    e.ac !== null &&
      (We(() => {
        e.ac.abort(H);
      }),
      (e.ac = null)));
  try {
    e.f |= Ce;
    var f = e.fn,
      c = f();
    e.f |= se;
    var _ = e.deps,
      p = w?.is_fork;
    if (T !== null) {
      var h;
      if ((p || we(e, S), _ !== null && S > 0))
        for (_.length = S + T.length, h = 0; h < T.length; h++) _[S + h] = T[h];
      else e.deps = _ = T;
      if (Nt() && (e.f & R) !== 0)
        for (h = S; h < _.length; h++) (_[h].reactions ??= []).push(e);
    } else !p && _ !== null && S < _.length && (we(e, S), (_.length = S));
    if (vt() && N !== null && !I && _ !== null && (e.f & (b | L | m)) === 0)
      for (h = 0; h < N.length; h++) Lt(N[h], e);
    if (s !== null && s !== e) {
      if ((X++, s.deps !== null))
        for (let x = 0; x < n; x += 1) s.deps[x].rv = X;
      if (t !== null) for (const x of t) x.rv = X;
      N !== null && (r === null ? (r = N) : r.push(...N));
    }
    return ((e.f & U) !== 0 && (e.f ^= U), c);
  } catch (x) {
    return un(x);
  } finally {
    ((e.f ^= Ce),
      (T = t),
      (S = n),
      (N = r),
      (v = s),
      (O = i),
      Ae(o),
      (I = a),
      (W = l));
  }
}
function Dn(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = Bt.call(n, e);
    if (r !== -1) {
      var s = n.length - 1;
      s === 0 ? (n = t.reactions = null) : ((n[r] = n[s]), n.pop());
    }
  }
  if (n === null && (t.f & b) !== 0 && (T === null || !ae.call(T, t))) {
    var i = t;
    ((i.f & R) !== 0 && ((i.f ^= R), (i.f &= ~Q)),
      i.v !== g && Ve(i),
      bn(i),
      we(i, 0));
  }
}
function we(e, t) {
  var n = e.deps;
  if (n !== null) for (var r = t; r < n.length; r++) Dn(e, n[r]);
}
function ue(e) {
  var t = e.f;
  if ((t & M) === 0) {
    y(e, E);
    var n = d,
      r = me;
    ((d = e), (me = !0));
    try {
      ((t & (C | Ue)) !== 0 ? On(e) : Je(e), xt(e));
      var s = Ft(e);
      ((e.teardown = typeof s == "function" ? s : null), (e.wv = Ct));
      var i;
      qt && fn && (e.f & m) !== 0 && e.deps;
    } finally {
      ((me = r), (d = n));
    }
  }
}
async function Kr() {
  (await Promise.resolve(), dn());
}
function ve(e) {
  var t = e.f,
    n = (t & b) !== 0;
  if (v !== null && !I) {
    var r = d !== null && (d.f & M) !== 0;
    if (!r && (O === null || !ae.call(O, e))) {
      var s = v.deps;
      if ((v.f & Ce) !== 0)
        e.rv < X &&
          ((e.rv = X),
          T === null && s !== null && s[S] === e
            ? S++
            : T === null
              ? (T = [e])
              : T.push(e));
      else {
        (v.deps ??= []).push(e);
        var i = e.reactions;
        i === null ? (e.reactions = [v]) : ae.call(i, v) || i.push(v);
      }
    }
  }
  if (re && $.has(e)) return $.get(e);
  if (n) {
    var o = e;
    if (re) {
      var a = o.v;
      return (
        (((o.f & E) === 0 && o.reactions !== null) || Yt(o)) && (a = Xe(o)),
        $.set(o, a),
        a
      );
    }
    var l = (o.f & R) === 0 && !I && v !== null && (me || (v.f & R) !== 0),
      u = (o.f & se) === 0;
    (Ee(o) && (l && (o.f |= R), gt(o)), l && !u && (bt(o), jt(o)));
  }
  if (k?.has(e)) return k.get(e);
  if ((e.f & U) !== 0) throw e.v;
  return e.v;
}
function jt(e) {
  if (((e.f |= R), e.deps !== null))
    for (const t of e.deps)
      ((t.reactions ??= []).push(e),
        (t.f & b) !== 0 && (t.f & R) === 0 && (bt(t), jt(t)));
}
function Yt(e) {
  if (e.v === g) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps) if ($.has(t) || ((t.f & b) !== 0 && Yt(t))) return !0;
  return !1;
}
function Xr(e) {
  var t = I;
  try {
    return ((I = !0), e());
  } finally {
    I = t;
  }
}
function Zr(e) {
  if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
    if (Z in e) He(e);
    else if (!Array.isArray(e))
      for (let t in e) {
        const n = e[t];
        typeof n == "object" && n && Z in n && He(n);
      }
  }
}
function He(e, t = new Set()) {
  if (
    typeof e == "object" &&
    e !== null &&
    !(e instanceof EventTarget) &&
    !t.has(e)
  ) {
    (t.add(e), e instanceof Date && e.getTime());
    for (let r in e)
      try {
        He(e[r], t);
      } catch {}
    const n = ft(e);
    if (
      n !== Object.prototype &&
      n !== Array.prototype &&
      n !== Map.prototype &&
      n !== Set.prototype &&
      n !== Date.prototype
    ) {
      const r = Vt(n);
      for (let s in r) {
        const i = r[s].get;
        if (i)
          try {
            i.call(e);
          } catch {}
      }
    }
  }
}
export {
  st as $,
  Rt as A,
  A as B,
  Te as C,
  Mr as D,
  fr as E,
  Ye as F,
  Re as G,
  hr as H,
  fe as I,
  d as J,
  Yr as K,
  Zr as L,
  ln as M,
  Wn as N,
  C as O,
  Un as P,
  Bn as Q,
  se as R,
  nr as S,
  Vn as T,
  Pe as U,
  Pn as V,
  gr as W,
  Xn as X,
  Er as Y,
  ut as Z,
  $n as _,
  br as a,
  Se as a$,
  je as a0,
  rr as a1,
  Vr as a2,
  or as a3,
  Dr as a4,
  Ar as a5,
  Ut as a6,
  er as a7,
  Mn as a8,
  Fn as a9,
  An as aA,
  pn as aB,
  Qn as aC,
  Cr as aD,
  g as aE,
  et as aF,
  Z as aG,
  de as aH,
  cr as aI,
  Yn as aJ,
  Hn as aK,
  jn as aL,
  Ke as aM,
  qn as aN,
  re as aO,
  sr as aP,
  Nt as aQ,
  De as aR,
  Zt as aS,
  Zn as aT,
  _n as aU,
  oe as aV,
  B as aW,
  Ae as aX,
  te as aY,
  un as aZ,
  v as a_,
  Sr as aa,
  Ze as ab,
  Cn as ac,
  M as ad,
  Gr as ae,
  kn as af,
  D as ag,
  P as ah,
  Ln as ai,
  Ir as aj,
  zr as ak,
  ne as al,
  V as am,
  F as an,
  xn as ao,
  Be as ap,
  qe as aq,
  Jn as ar,
  Br as as,
  vr as at,
  Nr as au,
  ir as av,
  Ht as aw,
  ft as ax,
  lr as ay,
  Vt as az,
  q as b,
  ye as b0,
  _r as b1,
  dr as b2,
  tr as b3,
  Rr as b4,
  Kn as b5,
  ur as b6,
  jr as b7,
  Tn as b8,
  Gn as b9,
  zn as ba,
  Or as c,
  kr as d,
  Tr as e,
  xr as f,
  ve as g,
  _e as h,
  Ur as i,
  ee as j,
  pr as k,
  Pr as l,
  Hr as m,
  yr as n,
  Lr as o,
  mr as p,
  w as q,
  wr as r,
  z as s,
  qr as t,
  Fr as u,
  Kr as v,
  We as w,
  Xr as x,
  ot as y,
  Kt as z,
};
