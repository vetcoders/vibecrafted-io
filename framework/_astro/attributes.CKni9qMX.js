import {
  as as D,
  al as w,
  a2 as Y,
  K as z,
  j as T,
  a6 as W,
  at as m,
  au as x,
  A as rr,
  av as fr,
  aw as er,
  ax as ir,
  ay as L,
  az as tr,
  U as sr,
  aA as ar,
  aB as ur,
  g as lr,
  aC as or,
  H,
  aD as cr,
  aE as nr,
} from "./runtime.QfC15RoP.js";
import {
  g as vr,
  a as dr,
  d as gr,
  h as br,
  n as _r,
  j as Ar,
} from "./render.CqgMSlkN.js";
function hr(r, i) {
  var f = void 0,
    e;
  D(() => {
    f !== (f = i()) &&
      (e && (w(e), (e = null)),
      f &&
        (e = Y(() => {
          z(() => f(r));
        })));
  });
}
function q(r) {
  var i,
    f,
    e = "";
  if (typeof r == "string" || typeof r == "number") e += r;
  else if (typeof r == "object")
    if (Array.isArray(r)) {
      var t = r.length;
      for (i = 0; i < t; i++)
        r[i] && (f = q(r[i])) && (e && (e += " "), (e += f));
    } else for (f in r) r[f] && (e && (e += " "), (e += f));
  return e;
}
function pr() {
  for (var r, i, f = 0, e = "", t = arguments.length; f < t; f++)
    (r = arguments[f]) && (i = q(r)) && (e && (e += " "), (e += i));
  return e;
}
function Tr(r) {
  return typeof r == "object" ? pr(r) : (r ?? "");
}
const $ = [
  ...` 	
\r\f \v\uFEFF`,
];
function Sr(r, i, f) {
  var e = r == null ? "" : "" + r;
  if ((i && (e = e ? e + " " + i : i), f)) {
    for (var t of Object.keys(f))
      if (f[t]) e = e ? e + " " + t : t;
      else if (e.length)
        for (var s = t.length, l = 0; (l = e.indexOf(t, l)) >= 0; ) {
          var c = l + s;
          (l === 0 || $.includes(e[l - 1])) &&
          (c === e.length || $.includes(e[c]))
            ? (e = (l === 0 ? "" : e.substring(0, l)) + e.substring(c + 1))
            : (l = c);
        }
  }
  return e === "" ? null : e;
}
function K(r, i = !1) {
  var f = i ? " !important;" : ";",
    e = "";
  for (var t of Object.keys(r)) {
    var s = r[t];
    s != null && s !== "" && (e += " " + t + ": " + s + f);
  }
  return e;
}
function P(r) {
  return r[0] !== "-" || r[1] !== "-" ? r.toLowerCase() : r;
}
function Nr(r, i) {
  if (i) {
    var f = "",
      e,
      t;
    if ((Array.isArray(i) ? ((e = i[0]), (t = i[1])) : (e = i), r)) {
      r = String(r)
        .replaceAll(/\s*\/\*.*?\*\/\s*/g, "")
        .trim();
      var s = !1,
        l = 0,
        c = !1,
        d = [];
      (e && d.push(...Object.keys(e).map(P)),
        t && d.push(...Object.keys(t).map(P)));
      var n = 0,
        _ = -1;
      const N = r.length;
      for (var v = 0; v < N; v++) {
        var a = r[v];
        if (
          (c
            ? a === "/" && r[v - 1] === "*" && (c = !1)
            : s
              ? s === a && (s = !1)
              : a === "/" && r[v + 1] === "*"
                ? (c = !0)
                : a === '"' || a === "'"
                  ? (s = a)
                  : a === "("
                    ? l++
                    : a === ")" && l--,
          !c && s === !1 && l === 0)
        ) {
          if (a === ":" && _ === -1) _ = v;
          else if (a === ";" || v === N - 1) {
            if (_ !== -1) {
              var S = P(r.substring(n, _).trim());
              if (!d.includes(S)) {
                a !== ";" && v++;
                var p = r.substring(n, v).trim();
                f += " " + p + ";";
              }
            }
            ((n = v + 1), (_ = -1));
          }
        }
      }
    }
    return (
      e && (f += K(e)),
      t && (f += K(t, !0)),
      (f = f.trim()),
      f === "" ? null : f
    );
  }
  return r == null ? null : String(r);
}
function Or(r, i, f, e, t, s) {
  var l = r.__className;
  if (T || l !== f || l === void 0) {
    var c = Sr(f, e, s);
    ((!T || c !== r.getAttribute("class")) &&
      (c == null
        ? r.removeAttribute("class")
        : i
          ? (r.className = c)
          : r.setAttribute("class", c)),
      (r.__className = f));
  } else if (s && t !== s)
    for (var d in s) {
      var n = !!s[d];
      (t == null || n !== !!t[d]) && r.classList.toggle(d, n);
    }
  return s;
}
function j(r, i = {}, f, e) {
  for (var t in f) {
    var s = f[t];
    i[t] !== s &&
      (f[t] == null ? r.style.removeProperty(t) : r.style.setProperty(t, s, e));
  }
}
function Er(r, i, f, e) {
  var t = r.__style;
  if (T || t !== i) {
    var s = Nr(i, e);
    ((!T || s !== r.getAttribute("style")) &&
      (s == null ? r.removeAttribute("style") : (r.style.cssText = s)),
      (r.__style = i));
  } else
    e &&
      (Array.isArray(e)
        ? (j(r, f?.[0], e[0]), j(r, f?.[1], e[1], "important"))
        : j(r, f, e));
  return e;
}
function M(r, i, f = !1) {
  if (r.multiple) {
    if (i == null) return;
    if (!W(i)) return m();
    for (var e of r.options) e.selected = i.includes(V(e));
    return;
  }
  for (e of r.options) {
    var t = V(e);
    if (x(t, i)) {
      e.selected = !0;
      return;
    }
  }
  (!f || i !== void 0) && (r.selectedIndex = -1);
}
function Ir(r) {
  var i = new MutationObserver(() => {
    M(r, r.__value);
  });
  (i.observe(r, {
    childList: !0,
    subtree: !0,
    attributes: !0,
    attributeFilter: ["value"],
  }),
    rr(() => {
      i.disconnect();
    }));
}
function V(r) {
  return "__value" in r ? r.__value : r.value;
}
const y = Symbol("class"),
  I = Symbol("style"),
  F = Symbol("is custom element"),
  X = Symbol("is html"),
  Lr = L ? "link" : "LINK",
  yr = L ? "input" : "INPUT",
  Cr = L ? "option" : "OPTION",
  Pr = L ? "select" : "SELECT",
  jr = L ? "progress" : "PROGRESS";
function wr(r) {
  if (T) {
    var i = !1,
      f = () => {
        if (!i) {
          if (((i = !0), r.hasAttribute("value"))) {
            var e = r.value;
            (C(r, "value", null), (r.value = e));
          }
          if (r.hasAttribute("checked")) {
            var t = r.checked;
            (C(r, "checked", null), (r.checked = t));
          }
        }
      };
    ((r.__on_r = f), sr(f), ar());
  }
}
function Ur(r, i) {
  var f = k(r);
  f.value === (f.value = i ?? void 0) ||
    (r.value === i && (i !== 0 || r.nodeName !== jr)) ||
    (r.value = i ?? "");
}
function Mr(r, i) {
  i
    ? r.hasAttribute("selected") || r.setAttribute("selected", "")
    : r.removeAttribute("selected");
}
function C(r, i, f, e) {
  var t = k(r);
  (T &&
    ((t[i] = r.getAttribute(i)),
    i === "src" || i === "srcset" || (i === "href" && r.nodeName === Lr))) ||
    (t[i] !== (t[i] = f) &&
      (i === "loading" && (r[fr] = f),
      f == null
        ? r.removeAttribute(i)
        : typeof f != "string" && Z(r).includes(i)
          ? (r[i] = f)
          : r.setAttribute(i, f)));
}
function kr(r, i, f, e, t = !1, s = !1) {
  if (T && t && r.nodeName === yr) {
    var l = r,
      c = l.type === "checkbox" ? "defaultChecked" : "defaultValue";
    c in f || wr(l);
  }
  var d = k(r),
    n = d[F],
    _ = !d[X];
  let v = T && n;
  v && H(!1);
  var a = i || {},
    S = r.nodeName === Cr;
  for (var p in i) p in f || (f[p] = null);
  (f.class ? (f.class = Tr(f.class)) : (f.class = null),
    f[I] && (f.style ??= null));
  var N = Z(r);
  for (const u in f) {
    let o = f[u];
    if (S && u === "value" && o == null) {
      ((r.value = r.__value = ""), (a[u] = o));
      continue;
    }
    if (u === "class") {
      var E = r.namespaceURI === "http://www.w3.org/1999/xhtml";
      (Or(r, E, o, e, i?.[y], f[y]), (a[u] = o), (a[y] = f[y]));
      continue;
    }
    if (u === "style") {
      (Er(r, o, i?.[I], f[I]), (a[u] = o), (a[I] = f[I]));
      continue;
    }
    var A = a[u];
    if (!(o === A && !(o === void 0 && r.hasAttribute(u)))) {
      a[u] = o;
      var G = u[0] + u[1];
      if (G !== "$$")
        if (G === "on") {
          const h = {},
            O = "$$" + u;
          let b = u.slice(2);
          var R = Ar(b);
          if ((vr(b) && ((b = b.slice(0, -7)), (h.capture = !0)), !R && A)) {
            if (o != null) continue;
            (r.removeEventListener(b, a[O], h), (a[O] = null));
          }
          if (R) (dr(b, r, o), gr([b]));
          else if (o != null) {
            let J = function (Q) {
              a[u].call(this, Q);
            };
            a[O] = br(b, r, J, h);
          }
        } else if (u === "style") C(r, u, o);
        else if (u === "autofocus") cr(r, !!o);
        else if (!n && (u === "__value" || (u === "value" && o != null)))
          r.value = r.__value = o;
        else if (u === "selected" && S) Mr(r, o);
        else {
          var g = u;
          _ || (g = _r(g));
          var U = g === "defaultValue" || g === "defaultChecked";
          if (o == null && !n && !U)
            if (((d[u] = null), g === "value" || g === "checked")) {
              let h = r;
              const O = i === void 0;
              if (g === "value") {
                let b = h.defaultValue;
                (h.removeAttribute(g),
                  (h.defaultValue = b),
                  (h.value = h.__value = O ? b : null));
              } else {
                let b = h.defaultChecked;
                (h.removeAttribute(g),
                  (h.defaultChecked = b),
                  (h.checked = O ? b : !1));
              }
            } else r.removeAttribute(u);
          else
            U || (N.includes(g) && (n || typeof o != "string"))
              ? ((r[g] = o), g in d && (d[g] = nr))
              : typeof o != "function" && C(r, g, o);
        }
    }
  }
  return (v && H(!0), a);
}
function Hr(r, i, f = [], e = [], t = [], s, l = !1, c = !1) {
  ur(t, f, e, (d) => {
    var n = void 0,
      _ = {},
      v = r.nodeName === Pr,
      a = !1;
    if (
      (D(() => {
        var p = i(...d.map(lr)),
          N = kr(r, n, p, s, l, c);
        a && v && "value" in p && M(r, p.value);
        for (let A of Object.getOwnPropertySymbols(_)) p[A] || w(_[A]);
        for (let A of Object.getOwnPropertySymbols(p)) {
          var E = p[A];
          (A.description === or &&
            (!n || E !== n[A]) &&
            (_[A] && w(_[A]), (_[A] = Y(() => hr(r, () => E)))),
            (N[A] = E));
        }
        n = N;
      }),
      v)
    ) {
      var S = r;
      z(() => {
        (M(S, n.value, !0), Ir(S));
      });
    }
    a = !0;
  });
}
function k(r) {
  return (r.__attributes ??= {
    [F]: r.nodeName.includes("-"),
    [X]: r.namespaceURI === er,
  });
}
var B = new Map();
function Z(r) {
  var i = r.getAttribute("is") || r.nodeName,
    f = B.get(i);
  if (f) return f;
  B.set(i, (f = []));
  for (var e, t = r, s = Element.prototype; s !== t; ) {
    e = tr(t);
    for (var l in e) e[l].set && f.push(l);
    t = ir(t);
  }
  return f;
}
export { C as a, Er as b, Ur as c, Hr as d, wr as r, Or as s };
