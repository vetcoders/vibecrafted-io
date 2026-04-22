import {
  D as v,
  G as p,
  J as _,
  F as l,
  b8 as h,
  b9 as T,
  ba as g,
  j as d,
  B as o,
  R as E,
  k as b,
} from "./runtime.QfC15RoP.js";
const y =
  globalThis?.window?.trustedTypes &&
  globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    createHTML: (e) => e,
  });
function M(e) {
  return y?.createHTML(e) ?? e;
}
function m(e) {
  var r = v("template");
  return ((r.innerHTML = M(e.replaceAll("<!>", "<!---->"))), r.content);
}
function s(e, r) {
  var t = _;
  t.nodes === null && (t.nodes = { start: e, end: r, a: null, t: null });
}
function w(e, r) {
  var t = (r & T) !== 0,
    f = (r & g) !== 0,
    a,
    u = !e.startsWith("<!>");
  return () => {
    if (d) return (s(o, null), o);
    a === void 0 && ((a = m(u ? e : "<!>" + e)), t || (a = l(a)));
    var n = f || h ? document.importNode(a, !0) : a.cloneNode(!0);
    if (t) {
      var c = l(n),
        i = n.lastChild;
      s(c, i);
    } else s(n, n);
    return n;
  };
}
function N(e, r, t = "svg") {
  var f = !e.startsWith("<!>"),
    a = `<${t}>${f ? e : "<!>" + e}</${t}>`,
    u;
  return () => {
    if (d) return (s(o, null), o);
    if (!u) {
      var n = m(a),
        c = l(n);
      u = l(c);
    }
    var i = u.cloneNode(!0);
    return (s(i, i), i);
  };
}
function L(e, r) {
  return N(e, r, "svg");
}
function R() {
  if (d) return (s(o, null), o);
  var e = document.createDocumentFragment(),
    r = document.createComment(""),
    t = p();
  return (e.append(r, t), s(r, t), e);
}
function x(e, r) {
  if (d) {
    var t = _;
    (((t.f & E) === 0 || t.nodes.end === null) && (t.nodes.end = o), b());
    return;
  }
  e !== null && e.before(r);
}
export { x as a, L as b, R as c, s as d, m as e, w as f };
