import "./disclose-version.DsnmJJEf.js";
import {
  l as be,
  w as ue,
  u as fe,
  t as C,
  p as _e,
  a as me,
  g as n,
  $ as ke,
  s as E,
  b as J,
  c as l,
  d as r,
  r as t,
  f as he,
  e as P,
} from "./runtime.QfC15RoP.js";
import { d as we, e as Le, a as _, s as o } from "./render.CqgMSlkN.js";
import { a as M, f as A } from "./template.DrTY0w-c.js";
import { i as xe } from "./if.Bn6v29Er.js";
import { e as Q, i as U } from "./each.Bl5LU2PA.js";
import { t as T, a as K, f as ye, p as X } from "./index.CDVM_SEU.js";
import { s as O, a, b as L } from "./attributes.CKni9qMX.js";
function He(D, e) {
  be(window, ["resize"], () => ue(() => e(window[D])));
}
var ze = A("<a> </a>"),
  Be = A("<a> </a>"),
  Ne = A(
    '<button class="nav-backdrop svelte-1rinlnw" type="button"></button> <nav class="nav-links nav-links--mobile svelte-1rinlnw" id="site-nav-mobile"><!> <div class="nav-get-zone nav-get-zone--mobile svelte-1rinlnw"><a class="nav-link nav-link--install nav-link--mobile-item svelte-1rinlnw"> </a> <a class="nav-link nav-link--vc nav-link--mobile-item svelte-1rinlnw" rel="noopener noreferrer" target="_blank"> </a> <a class="nav-link nav-link--toggle nav-link--mobile-item svelte-1rinlnw"> </a> <a class="nav-icon-link nav-link--mobile-item svelte-1rinlnw" href="https://github.com/VetCoders/vibecrafted" rel="noopener noreferrer"><svg aria-hidden="true" class="nav-icon svelte-1rinlnw" viewBox="0 0 24 24"><path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.46c.53.1.72-.23.72-.51v-1.81c-2.94.64-3.56-1.24-3.56-1.24-.48-1.22-1.16-1.55-1.16-1.55-.95-.65.07-.63.07-.63 1.05.07 1.6 1.08 1.6 1.08.94 1.6 2.45 1.14 3.04.87.09-.68.37-1.14.66-1.4-2.35-.27-4.82-1.18-4.82-5.25 0-1.16.41-2.1 1.08-2.84-.11-.27-.47-1.36.1-2.83 0 0 .88-.28 2.89 1.08a10.08 10.08 0 0 1 5.26 0c2-1.36 2.88-1.08 2.88-1.08.58 1.47.22 2.56.11 2.83.67.74 1.08 1.68 1.08 2.84 0 4.08-2.48 4.97-4.85 5.23.38.33.72.97.72 1.95v2.89c0 .28.19.62.73.51A10.5 10.5 0 0 0 12 1.5Z" class="svelte-1rinlnw"></path></svg></a></div></nav>',
    1,
  ),
  Ce = A(
    '<div class="site-nav svelte-1rinlnw"><nav class="nav-links nav-links--desktop svelte-1rinlnw"><!> <div class="nav-get-zone svelte-1rinlnw"><a class="nav-link nav-link--install svelte-1rinlnw"> </a> <a class="nav-link nav-link--vc svelte-1rinlnw" rel="noopener noreferrer" target="_blank"> </a> <a class="nav-link nav-link--toggle svelte-1rinlnw"> </a> <a class="nav-icon-link svelte-1rinlnw" href="https://github.com/VetCoders/vibecrafted" rel="noopener noreferrer"><svg aria-hidden="true" class="nav-icon svelte-1rinlnw" viewBox="0 0 24 24"><path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.46c.53.1.72-.23.72-.51v-1.81c-2.94.64-3.56-1.24-3.56-1.24-.48-1.22-1.16-1.55-1.16-1.55-.95-.65.07-.63.07-.63 1.05.07 1.6 1.08 1.6 1.08.94 1.6 2.45 1.14 3.04.87.09-.68.37-1.14.66-1.4-2.35-.27-4.82-1.18-4.82-5.25 0-1.16.41-2.1 1.08-2.84-.11-.27-.47-1.36.1-2.83 0 0 .88-.28 2.89 1.08a10.08 10.08 0 0 1 5.26 0c2-1.36 2.88-1.08 2.88-1.08.58 1.47.22 2.56.11 2.83.67.74 1.08 1.68 1.08 2.84 0 4.08-2.48 4.97-4.85 5.23.38.33.72.97.72 1.95v2.89c0 .28.19.62.73.51A10.5 10.5 0 0 0 12 1.5Z" class="svelte-1rinlnw"></path></svg></a></div></nav> <button aria-controls="site-nav-mobile" class="nav-toggle svelte-1rinlnw" type="button"><span class="nav-toggle__label svelte-1rinlnw"> </span> <span aria-hidden="true"><span class="svelte-1rinlnw"></span> <span class="svelte-1rinlnw"></span></span></button> <!></div>',
  );
function Ke(D, e) {
  me(e, !0);
  let v = J(!1),
    R = J(1280);
  const S = P(() => (X.current ? 0 : 190)),
    j = P(() => (X.current ? 0 : 140));
  function x() {
    E(v, !1);
  }
  function h() {
    window.setTimeout(x, 0);
  }
  function Y(s) {
    s.key === "Escape" && x();
  }
  fe(() => {
    n(R) > 720 && n(v) && x();
  });
  var V = Ce();
  Le("keydown", ke, Y);
  var y = l(V),
    q = l(y);
  Q(
    q,
    17,
    () => e.links,
    U,
    (s, u) => {
      var i = ze();
      let d;
      var z = l(i, !0);
      (t(i),
        C(
          (B) => {
            ((d = O(i, 1, "nav-link svelte-1rinlnw", null, d, B)),
              a(i, "href", n(u).href),
              a(i, "aria-current", n(u).current ? "page" : void 0),
              o(z, n(u).label));
          },
          [() => ({ "nav-link--current": !!n(u).current })],
        ),
        M(s, i));
    },
  );
  var F = r(q, 2),
    H = l(F),
    p = l(H, !0);
  t(H);
  var w = r(H, 2),
    $ = l(w, !0);
  t(w);
  var b = r(w, 2),
    ee = l(b, !0);
  t(b);
  var ae = r(b, 2);
  (t(F), t(y));
  var m = r(y, 2),
    W = l(m),
    ne = l(W, !0);
  t(W);
  var le = r(W, 2);
  let G;
  t(m);
  var te = r(m, 2);
  {
    var ie = (s) => {
      var u = Ne(),
        i = he(u),
        d = r(i, 2),
        z = l(d);
      Q(
        z,
        17,
        () => e.links,
        U,
        (ce, N, oe) => {
          var g = Be();
          let I;
          L(g, `--nav-item-index: ${oe};`);
          var de = l(g, !0);
          (t(g),
            C(
              (ge) => {
                ((I = O(
                  g,
                  1,
                  "nav-link nav-link--mobile-item svelte-1rinlnw",
                  null,
                  I,
                  ge,
                )),
                  a(g, "href", n(N).href),
                  a(g, "aria-current", n(N).current ? "page" : void 0),
                  o(de, n(N).label));
              },
              [() => ({ "nav-link--current": !!n(N).current })],
            ),
            _("click", g, h),
            M(ce, g));
        },
      );
      var B = r(z, 2),
        k = l(B),
        re = l(k, !0);
      t(k);
      var f = r(k, 2),
        ve = l(f, !0);
      t(f);
      var c = r(f, 2),
        se = l(c, !0);
      t(c);
      var Z = r(c, 2);
      (t(B),
        t(d),
        C(() => {
          (a(i, "aria-label", e.closeLabel),
            a(d, "aria-label", e.primaryNavLabel),
            a(k, "href", e.installHref),
            L(k, `--nav-item-index: ${e.links.length};`),
            o(re, e.installLabel),
            a(f, "href", e.vcHref),
            a(f, "title", e.vcTitle ?? e.vcLabel),
            L(f, `--nav-item-index: ${e.links.length + 1};`),
            o(ve, e.vcLabel),
            a(c, "href", e.toggleHref),
            a(c, "hreflang", e.toggleHreflang),
            a(c, "lang", e.toggleLang),
            a(c, "aria-label", e.toggleLabel),
            L(c, `--nav-item-index: ${e.links.length + 2};`),
            o(se, e.toggleLabel),
            a(Z, "aria-label", e.githubLabel),
            L(Z, `--nav-item-index: ${e.links.length + 3};`));
        }),
        _("click", i, x),
        T(
          1,
          i,
          () => K,
          () => ({ duration: n(j) }),
        ),
        T(
          2,
          i,
          () => K,
          () => ({ duration: n(j) }),
        ),
        _("click", k, h),
        _("click", f, h),
        _("click", c, h),
        _("click", Z, h),
        T(
          1,
          d,
          () => ye,
          () => ({ duration: n(S), y: -10 }),
        ),
        T(
          2,
          d,
          () => K,
          () => ({ duration: n(S) }),
        ),
        M(s, u));
    };
    xe(te, (s) => {
      n(v) && s(ie);
    });
  }
  (t(V),
    C(() => {
      (a(y, "aria-label", e.primaryNavLabel),
        a(H, "href", e.installHref),
        o(p, e.installLabel),
        a(w, "href", e.vcHref),
        a(w, "title", e.vcTitle ?? e.vcLabel),
        o($, e.vcLabel),
        a(b, "href", e.toggleHref),
        a(b, "hreflang", e.toggleHreflang),
        a(b, "lang", e.toggleLang),
        a(b, "aria-label", e.toggleLabel),
        o(ee, e.toggleLabel),
        a(ae, "aria-label", e.githubLabel),
        a(m, "aria-expanded", n(v)),
        a(m, "aria-label", n(v) ? e.closeLabel : e.menuLabel),
        o(ne, n(v) ? e.closeLabel : e.menuLabel),
        (G = O(le, 1, "nav-toggle__glyph svelte-1rinlnw", null, G, {
          "nav-toggle__glyph--open": n(v),
        })));
    }),
    He("innerWidth", (s) => E(R, s, !0)),
    _("click", m, () => E(v, !n(v))),
    M(D, V),
    _e());
}
we(["click"]);
export { Ke as default };
