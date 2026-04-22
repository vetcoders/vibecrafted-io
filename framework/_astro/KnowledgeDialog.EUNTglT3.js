import "./disclose-version.DsnmJJEf.js";
import {
  u as _e,
  f as ce,
  p as ge,
  a as ue,
  $ as fe,
  c as i,
  d as c,
  r as o,
  t as k,
  g as p,
  e as ke,
} from "./runtime.QfC15RoP.js";
import { d as be, e as me, s as b, a as T } from "./render.CqgMSlkN.js";
import { c as ye, a as v, f as _ } from "./template.DrTY0w-c.js";
import { i as u } from "./if.Bn6v29Er.js";
import { e as U, i as V } from "./each.Bl5LU2PA.js";
import { h as X } from "./html.BJEAqZdD.js";
import { t as Y, a as we, s as he, p as pe } from "./index.CDVM_SEU.js";
import { a as C, s as xe } from "./attributes.CKni9qMX.js";
import { p as d } from "./props.DDrYma4F.js";
var Le = _('<div class="knowledge-dialog__eyebrow svelte-13o81yk"> </div>'),
  De = _('<p class="knowledge-dialog__summary svelte-13o81yk"> </p>'),
  He = _('<div class="knowledge-dialog__body svelte-13o81yk"></div>'),
  Ke = _('<div class="knowledge-dialog__label svelte-13o81yk"> </div>'),
  Ce = _('<li class="svelte-13o81yk"> </li>'),
  Ee = _(
    '<div class="knowledge-dialog__block svelte-13o81yk"><!> <ul class="knowledge-dialog__bullets svelte-13o81yk"></ul></div>',
  ),
  Me = _('<div class="knowledge-dialog__label svelte-13o81yk"> </div>'),
  Oe = _('<span class="svelte-13o81yk"> </span>'),
  Re = _(
    '<div class="knowledge-dialog__block svelte-13o81yk"><!> <div class="knowledge-dialog__tags svelte-13o81yk"></div></div>',
  ),
  We = _('<div class="knowledge-dialog__label svelte-13o81yk"> </div>'),
  je = _(
    '<div class="knowledge-dialog__block svelte-13o81yk"><!> <div class="knowledge-dialog__footer svelte-13o81yk"></div></div>',
  ),
  qe = _(
    '<div class="knowledge-dialog-shell svelte-13o81yk"><button type="button" class="knowledge-dialog__backdrop svelte-13o81yk"></button> <div role="dialog" aria-modal="true"><button type="button" class="knowledge-dialog__close svelte-13o81yk"><span aria-hidden="true" class="svelte-13o81yk">✕</span></button> <!> <h3 class="knowledge-dialog__title svelte-13o81yk"> </h3> <!> <!> <!> <!> <!></div></div>',
  );
function Se(Z, t) {
  ue(t, !0);
  let x = d(t, "open", 3, !1),
    $ = d(t, "accent", 3, "steel"),
    E = d(t, "eyebrow", 3, ""),
    M = d(t, "title", 3, ""),
    O = d(t, "summary", 3, ""),
    R = d(t, "bodyHtml", 3, ""),
    W = d(t, "bullets", 19, () => []),
    j = d(t, "tags", 19, () => []),
    q = d(t, "footerHtml", 3, ""),
    z = d(t, "detailsLabel", 3, ""),
    A = d(t, "tagsLabel", 3, ""),
    B = d(t, "footerLabel", 3, ""),
    F = d(t, "closeLabel", 3, "Close");
  const G = ke(() => (pe.current ? 0 : 190));
  function L() {
    t.onclose?.();
  }
  function ee(g) {
    x() && g.key === "Escape" && (g.preventDefault(), L());
  }
  _e(() => {
    if (!x() || typeof document > "u") return;
    const { body: g } = document,
      m = g.style.overflow;
    return (
      (g.style.overflow = "hidden"),
      () => {
        g.style.overflow = m;
      }
    );
  });
  var I = ye();
  me("keydown", fe, ee);
  var ae = ce(I);
  {
    var oe = (g) => {
      var m = qe(),
        h = i(m),
        y = c(h, 2),
        D = i(y),
        J = c(D, 2);
      {
        var te = (e) => {
          var a = Le(),
            n = i(a, !0);
          (o(a), k(() => b(n, E())), v(e, a));
        };
        u(J, (e) => {
          E() && e(te);
        });
      }
      var H = c(J, 2),
        le = i(H, !0);
      o(H);
      var N = c(H, 2);
      {
        var re = (e) => {
          var a = De(),
            n = i(a, !0);
          (o(a), k(() => b(n, O())), v(e, a));
        };
        u(N, (e) => {
          O() && e(re);
        });
      }
      var P = c(N, 2);
      {
        var se = (e) => {
          var a = He();
          (X(a, R, !0), o(a), v(e, a));
        };
        u(P, (e) => {
          R() && e(se);
        });
      }
      var Q = c(P, 2);
      {
        var ie = (e) => {
          var a = Ee(),
            n = i(a);
          {
            var w = (l) => {
              var r = Ke(),
                s = i(r, !0);
              (o(r), k(() => b(s, z())), v(l, r));
            };
            u(n, (l) => {
              z() && l(w);
            });
          }
          var f = c(n, 2);
          (U(f, 21, W, V, (l, r) => {
            var s = Ce(),
              K = i(s, !0);
            (o(s), k(() => b(K, p(r))), v(l, s));
          }),
            o(f),
            o(a),
            v(e, a));
        };
        u(Q, (e) => {
          W().length > 0 && e(ie);
        });
      }
      var S = c(Q, 2);
      {
        var ve = (e) => {
          var a = Re(),
            n = i(a);
          {
            var w = (l) => {
              var r = Me(),
                s = i(r, !0);
              (o(r), k(() => b(s, A())), v(l, r));
            };
            u(n, (l) => {
              A() && l(w);
            });
          }
          var f = c(n, 2);
          (U(f, 21, j, V, (l, r) => {
            var s = Oe(),
              K = i(s, !0);
            (o(s), k(() => b(K, p(r))), v(l, s));
          }),
            o(f),
            o(a),
            v(e, a));
        };
        u(S, (e) => {
          j().length > 0 && e(ve);
        });
      }
      var de = c(S, 2);
      {
        var ne = (e) => {
          var a = je(),
            n = i(a);
          {
            var w = (l) => {
              var r = We(),
                s = i(r, !0);
              (o(r), k(() => b(s, B())), v(l, r));
            };
            u(n, (l) => {
              B() && l(w);
            });
          }
          var f = c(n, 2);
          (X(f, q, !0), o(f), o(a), v(e, a));
        };
        u(de, (e) => {
          q() && e(ne);
        });
      }
      (o(y),
        o(m),
        k(() => {
          (C(h, "aria-label", F()),
            xe(
              y,
              1,
              `knowledge-dialog knowledge-dialog--${$()}`,
              "svelte-13o81yk",
            ),
            C(y, "aria-label", M()),
            C(D, "aria-label", F()),
            b(le, M()));
        }),
        T("click", h, L),
        Y(
          3,
          h,
          () => we,
          () => ({ duration: p(G) }),
        ),
        T("click", D, L),
        Y(
          3,
          y,
          () => he,
          () => ({ duration: p(G), start: 0.92 }),
        ),
        v(g, m));
    };
    u(ae, (g) => {
      x() && g(oe);
    });
  }
  (v(Z, I), ge());
}
be(["click"]);
export { Se as K };
