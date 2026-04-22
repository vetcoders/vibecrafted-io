import "./disclose-version.DsnmJJEf.js";
import {
  p as ee,
  a as re,
  $ as te,
  f as ae,
  t as R,
  d as s,
  c as t,
  r,
  g as e,
  s as A,
  e as B,
  b as se,
} from "./runtime.QfC15RoP.js";
import { d as oe, e as le, s as o, a as x } from "./render.CqgMSlkN.js";
import { a as k, f as b } from "./template.DrTY0w-c.js";
import { i as C } from "./if.Bn6v29Er.js";
import { e as F, i as G } from "./each.Bl5LU2PA.js";
import { h as ne } from "./html.BJEAqZdD.js";
import { t as J, s as ie, a as ce, p as ve } from "./index.CDVM_SEU.js";
import { a as $ } from "./attributes.CKni9qMX.js";
import fe from "./Reveal.D1_DA-iE.js";
import { g as de } from "./index.CFQc2B1F.js";
var pe = b(
    '<button class="reference-link svelte-1srf5km" type="button"> </button>',
  ),
  _e = b('<p class="reference-links svelte-1srf5km"></p>'),
  me = b(
    '<li class="reference-item svelte-1srf5km"><p class="reference-citation svelte-1srf5km"></p> <p class="reference-note svelte-1srf5km"> </p> <!></li>',
  ),
  ue = b(
    '<div class="section-label"> </div> <h2 class="section-title"> </h2> <p class="section-sub svelte-1srf5km"> </p> <ol class="references-list svelte-1srf5km"></ol>',
    1,
  ),
  ke = b(
    '<div class="reference-dialog svelte-1srf5km" role="presentation"><div class="reference-dialog__panel svelte-1srf5km" role="dialog" aria-modal="true"><p class="reference-dialog__eyebrow svelte-1srf5km"> </p> <h3 class="reference-dialog__title svelte-1srf5km"> </h3> <p class="reference-dialog__target svelte-1srf5km"><span class="reference-dialog__target-label svelte-1srf5km"> </span> <span> </span></p> <div class="reference-dialog__actions svelte-1srf5km"><button class="reference-dialog__action reference-dialog__action--back svelte-1srf5km" type="button"> </button> <button class="reference-dialog__action reference-dialog__action--open svelte-1srf5km" type="button"> </button></div></div></div>',
  ),
  be = b(
    '<section class="references-section surface--grid svelte-1srf5km" id="references"><!> <!></section>',
  );
function Ee(N, D) {
  re(D, !0);
  const a = B(() => de(D.lang).sections.references),
    T = `reference-modal-${D.lang}`;
  let v = se(null);
  const j = B(() => (ve.current ? 0 : 180));
  function Q(l) {
    A(v, l, !0);
  }
  function y() {
    A(v, null);
  }
  function U() {
    e(v) && (window.open(e(v).href, "_blank", "noopener,noreferrer"), y());
  }
  function V(l) {
    l.key === "Escape" && e(v) && y();
  }
  var P = be();
  le("keydown", te, V);
  var q = t(P);
  fe(q, {
    tag: "div",
    class: "container",
    children: (l, _) => {
      var i = ue(),
        f = ae(i),
        E = t(f, !0);
      r(f);
      var c = s(f, 2),
        I = t(c, !0);
      r(c);
      var d = s(c, 2),
        g = t(d, !0);
      r(d);
      var w = s(d, 2);
      (F(
        w,
        21,
        () => e(a).items,
        G,
        (L, p) => {
          var m = me(),
            n = t(m);
          (ne(n, () => e(p).citationHtml, !0), r(n));
          var h = s(n, 2),
            u = t(h, !0);
          r(h);
          var K = s(h, 2);
          {
            var M = (O) => {
              var S = _e();
              (F(
                S,
                21,
                () => e(p).links,
                G,
                (Y, z) => {
                  var H = pe(),
                    Z = t(H, !0);
                  (r(H),
                    R(() => o(Z, e(z).label)),
                    x("click", H, () => Q(e(z))),
                    k(Y, H));
                },
              ),
                r(S),
                k(O, S));
            };
            C(K, (O) => {
              "links" in e(p) && e(p).links && O(M);
            });
          }
          (r(m), R(() => o(u, e(p).note)), k(L, m));
        },
      ),
        r(w),
        R(() => {
          (o(E, e(a).label), o(I, e(a).title), o(g, e(a).sub));
        }),
        k(l, i));
    },
    $$slots: { default: !0 },
  });
  var W = s(q, 2);
  {
    var X = (l) => {
      var _ = ke(),
        i = t(_),
        f = t(i),
        E = t(f, !0);
      r(f);
      var c = s(f, 2),
        I = t(c, !0);
      r(c);
      var d = s(c, 2),
        g = t(d),
        w = t(g, !0);
      r(g);
      var L = s(g, 2),
        p = t(L, !0);
      (r(L), r(d));
      var m = s(d, 2),
        n = t(m),
        h = t(n, !0);
      r(n);
      var u = s(n, 2),
        K = t(u, !0);
      (r(u),
        r(m),
        r(i),
        r(_),
        R(() => {
          ($(i, "aria-labelledby", T),
            o(E, e(a).modal.eyebrow),
            $(c, "id", T),
            o(I, e(a).modal.title),
            o(w, e(a).modal.sourceLabel),
            o(p, e(v).label),
            $(n, "data-hover", e(a).modal.backHover),
            o(h, e(a).modal.backLabel),
            $(u, "data-hover", e(a).modal.openHover),
            o(K, e(a).modal.openLabel));
        }),
        x("click", _, y),
        x("click", i, (M) => M.stopPropagation()),
        x("click", n, y),
        x("click", u, U),
        J(
          3,
          i,
          () => ie,
          () => ({ duration: e(j), start: 0.965 }),
        ),
        J(
          3,
          _,
          () => ce,
          () => ({ duration: e(j) }),
        ),
        k(l, _));
    };
    C(W, (l) => {
      e(v) && l(X);
    });
  }
  (r(P), k(N, P), ee());
}
oe(["click"]);
export { Ee as default };
