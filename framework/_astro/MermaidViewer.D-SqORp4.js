import "./disclose-version.DsnmJJEf.js";
import { a as ve } from "./index-client.K0QDP7N9.js";
import {
  u as H,
  f as ue,
  t as T,
  p as be,
  a as fe,
  g as a,
  $ as _e,
  b as g,
  e as P,
  c as i,
  s as o,
  d as s,
  r,
} from "./runtime.QfC15RoP.js";
import { d as ye, e as he, a as p, s as A } from "./render.CqgMSlkN.js";
import { i as B } from "./if.Bn6v29Er.js";
import { h as ge } from "./html.BJEAqZdD.js";
import { a as w, f as z } from "./template.DrTY0w-c.js";
import { a as u, s as we } from "./attributes.CKni9qMX.js";
import { b as I } from "./this.MJJ6CZzJ.js";
import { p as K } from "./props.DDrYma4F.js";
var ze = z(
    '<button class="mmd-expand svelte-zobadp" type="button"><span aria-hidden="true">⤢</span> <span class="mmd-expand__label svelte-zobadp">Expand</span></button>',
  ),
  Ce = z(
    '<button class="mmd-preview mmd-preview--interactive svelte-zobadp" type="button"></button>',
  ),
  xe = z('<div class="mmd-preview svelte-zobadp"></div>'),
  ke = z(
    '<div class="mmd-modal svelte-zobadp" role="dialog" aria-modal="true"><div class="mmd-modal__panel svelte-zobadp"><header class="mmd-modal__head svelte-zobadp"><h3 class="mmd-modal__title svelte-zobadp"> </h3> <button class="mmd-modal__close svelte-zobadp" type="button">×</button></header> <div class="mmd-modal__body svelte-zobadp"></div></div></div>',
  ),
  Me = z(
    '<div class="mmd-shell svelte-zobadp"><div class="mmd-toolbar svelte-zobadp"><!> <button class="mmd-split svelte-zobadp" type="button" aria-label="Show source and preview side by side">Split</button> <button class="mmd-toggle svelte-zobadp" type="button" aria-label="Toggle diagram source"> </button> <button type="button"> </button></div> <div class="mmd-code svelte-zobadp"><pre class="svelte-zobadp"><code class="svelte-zobadp"></code></pre></div> <!></div> <!>',
    1,
  );
function Ie(N, n) {
  fe(n, !0);
  let C = K(n, "code", 3, ""),
    Q = K(n, "highlightedCode", 3, ""),
    E = K(n, "fullCode", 3, ""),
    c = g("preview"),
    b = g(void 0),
    L = g(void 0),
    v = g(!1),
    d = g("default"),
    x;
  const W = P(() => Q() || C()),
    f = P(() => !!(E() && E().trim().length > 0)),
    _ = P(() => ({
      open: n.modalLabels?.open ?? "Expand full pipeline",
      close: n.modalLabels?.close ?? "Close pipeline diagram",
      title: n.modalLabels?.title ?? "Full pipeline",
    }));
  ve(() => {
    x && clearTimeout(x);
  });
  function X(e) {
    return e instanceof Error ? e.message : "Unknown error";
  }
  async function O(e, t) {
    if (!e) return;
    const l = window.mermaid;
    if (!l) {
      e.innerHTML = '<div class="mmd-error">Preview unavailable.</div>';
      return;
    }
    const h = `mermaid-${Math.random().toString(36).slice(2, 11)}`;
    try {
      const { svg: m } = await l.render(h, t);
      e.innerHTML = m;
    } catch (m) {
      e.innerHTML = `<div class="mmd-error">Render error: ${X(m)}</div>`;
    }
  }
  (H(() => {
    (a(c) === "preview" || a(c) === "split") && O(a(b), C());
  }),
    H(() => {
      a(v) && a(f) && O(a(L), E());
    }),
    H(() => {
      if (typeof document > "u") return;
      const e = document.body.style.overflow;
      return (
        (document.body.style.overflow = a(v) ? "hidden" : e),
        () => {
          document.body.style.overflow = e;
        }
      );
    }));
  function Y() {
    o(c, a(c) === "code" ? "preview" : "code", !0);
  }
  function Z() {
    o(c, "split");
  }
  function R() {
    a(f) && o(v, !0);
  }
  function S() {
    o(v, !1);
  }
  function $(e) {
    e.target === e.currentTarget && S();
  }
  function ee(e) {
    e.key === "Escape" && a(v) && (e.preventDefault(), S());
  }
  async function ae() {
    try {
      if (navigator.clipboard?.writeText)
        (await navigator.clipboard.writeText(C()), o(d, "copied"));
      else throw new Error("Clipboard API not available");
    } catch {
      const e = document.createElement("textarea");
      ((e.value = C()),
        (e.style.position = "fixed"),
        (e.style.left = "-999999px"),
        (e.style.top = "-999999px"),
        document.body.appendChild(e),
        e.focus(),
        e.select());
      try {
        (document.execCommand("copy"), o(d, "copied"));
      } catch {
        o(d, "error");
      }
      e.remove();
    }
    (clearTimeout(x),
      (x = setTimeout(() => {
        o(d, "default");
      }, 1500)));
  }
  var U = Me();
  he("keydown", _e, ee);
  var k = ue(U),
    D = i(k),
    V = i(D);
  {
    var te = (e) => {
      var t = ze();
      (T(() => u(t, "aria-label", a(_).open)), p("click", t, R), w(e, t));
    };
    B(V, (e) => {
      a(f) && e(te);
    });
  }
  var j = s(V, 2),
    M = s(j, 2),
    oe = i(M, !0);
  r(M);
  var y = s(M, 2),
    re = i(y, !0);
  (r(y), r(D));
  var F = s(D, 2),
    q = i(F),
    G = i(q);
  (ge(G, () => a(W), !0), r(G), r(q), r(F));
  var de = s(F, 2);
  {
    var ie = (e) => {
        var t = Ce();
        (I(
          t,
          (l) => o(b, l),
          () => a(b),
        ),
          T(() => u(t, "aria-label", a(_).open)),
          p("click", t, R),
          w(e, t));
      },
      le = (e) => {
        var t = xe();
        (I(
          t,
          (l) => o(b, l),
          () => a(b),
        ),
          w(e, t));
      };
    B(de, (e) => {
      a(f) ? e(ie) : e(le, -1);
    });
  }
  r(k);
  var se = s(k, 2);
  {
    var ne = (e) => {
      var t = ke(),
        l = i(t),
        h = i(l),
        m = i(h),
        ce = i(m, !0);
      r(m);
      var J = s(m, 2);
      r(h);
      var me = s(h, 2);
      (I(
        me,
        (pe) => o(L, pe),
        () => a(L),
      ),
        r(l),
        r(t),
        T(() => {
          (u(t, "aria-label", a(_).title),
            A(ce, a(_).title),
            u(J, "aria-label", a(_).close));
        }),
        p("click", t, $),
        p("click", J, S),
        w(e, t));
    };
    B(se, (e) => {
      a(v) && a(f) && e(ne);
    });
  }
  (T(() => {
    (u(k, "data-mode", a(c)),
      A(oe, a(c) === "code" ? "Preview" : "Source"),
      we(
        y,
        1,
        `mmd-copy ${a(d) === "copied" ? "is-copied" : ""} ${a(d) === "error" ? "is-error" : ""}`,
        "svelte-zobadp",
      ),
      u(
        y,
        "aria-label",
        a(d) === "copied"
          ? "Copied to clipboard"
          : a(d) === "error"
            ? "Copy failed"
            : "Copy diagram code to clipboard",
      ),
      A(
        re,
        a(d) === "copied" ? "Copied" : a(d) === "error" ? "Failed" : "Copy",
      ));
  }),
    p("click", j, Z),
    p("click", M, Y),
    p("click", y, ae),
    w(N, U),
    be());
}
ye(["click"]);
export { Ie as default };
