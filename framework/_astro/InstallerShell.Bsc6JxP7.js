import "./disclose-version.DsnmJJEf.js";
import { o as la } from "./index-client.K0QDP7N9.js";
import {
  a as ra,
  g as e,
  s as _,
  u as aa,
  c as t,
  r as a,
  d as n,
  t as u,
  p as na,
  b as G,
  e as J,
  f as He,
} from "./runtime.QfC15RoP.js";
import { d as oa, s as r, a as Q } from "./render.CqgMSlkN.js";
import { i as j } from "./if.Bn6v29Er.js";
import { a as i, f as c, c as va } from "./template.DrTY0w-c.js";
import { s as Je, a as De, b as Da, r as ta } from "./attributes.CKni9qMX.js";
import Ha from "./InstallerWizard.CwTmDBna.js";
import { e as te, i as se } from "./each.Bl5LU2PA.js";
import { p as Ma, t as V, f as _e, a as fe } from "./index.CDVM_SEU.js";
import { b as sa } from "./input.rX2j9oe5.js";
import { p as Ra } from "./props.DDrYma4F.js";
import { g as ia } from "./index.CFQc2B1F.js";
import { T as Ba } from "./CopyButton.i_C0tMbM.js";
class Na extends Error {
  status;
  constructor(B, z) {
    (super(B), (this.name = "InstallerApiError"), (this.status = z));
  }
}
async function we(le, B) {
  const z = await fetch(le, {
      ...B,
      headers: {
        Accept: "application/json",
        ...(B?.body ? { "Content-Type": "application/json" } : {}),
        ...B?.headers,
      },
      cache: "no-store",
    }),
    N = await z.text();
  let p = null;
  if (N)
    try {
      p = JSON.parse(N);
    } catch {
      p = null;
    }
  if (!z.ok) {
    const f = p && typeof p == "object" && "error" in p ? p.error : null,
      U =
        (typeof f == "string" && f) ||
        `${z.status} ${z.statusText || "error"}`.trim() ||
        "Installer API request failed";
    throw new Na(U, z.status);
  }
  return p ?? {};
}
const Fe = {
  preflight() {
    return we("/api/preflight");
  },
  status() {
    return we("/api/install/status");
  },
  controlPlane() {
    return we("/api/control-plane");
  },
  health() {
    return we("/api/health");
  },
  startInstall(le) {
    return we("/api/install", {
      method: "POST",
      body: JSON.stringify({ with_shell: le }),
    });
  },
  openStartHere() {
    return we("/api/open-start-here", { method: "POST" });
  },
  closeSession() {
    return we("/api/session", { method: "DELETE" });
  },
};
function Va() {
  return typeof window > "u" ? !1 : window.__VIBECRAFTED_LIVE__ === !0;
}
var qa = c(
    '<span class="lw-brand-product svelte-16sl5ea"> </span> <span class="lw-brand-tagline svelte-16sl5ea"> </span>',
    1,
  ),
  Ga = c('<span class="lw-brand-product svelte-16sl5ea"> </span>'),
  Ja = c(
    '<div class="lw-meta svelte-16sl5ea"><span class="lw-meta-item svelte-16sl5ea"><span class="lw-meta-label svelte-16sl5ea">v</span> </span> <span class="lw-meta-item svelte-16sl5ea"> </span></div>',
  ),
  Ka = c(
    '<li><button><span class="lw-step-pip svelte-16sl5ea"></span> <span class="lw-step-label"> </span></button></li>',
  ),
  Wa = c('<pre class="lw-output lw-output--compact svelte-16sl5ea"> </pre>'),
  Qa = c(
    '<section class="lw-panel lw-panel--lost svelte-16sl5ea"><h2 class="lw-title svelte-16sl5ea"> </h2> <p class="lw-error svelte-16sl5ea"> </p> <!> <button class="lw-cta svelte-16sl5ea"> </button></section>',
  ),
  Ua = c('<p class="lw-muted svelte-16sl5ea"> </p>'),
  Xa = c('<p class="lw-error svelte-16sl5ea"> </p>'),
  Ya = c(
    '<li class="svelte-16sl5ea"><code class="svelte-16sl5ea"> </code></li>',
  ),
  Za = c(
    '<div class="lw-cmd-block lw-cmd-block--primary svelte-16sl5ea"><div class="lw-missing-components svelte-16sl5ea"><span class="lw-missing-label svelte-16sl5ea"> </span> <ul class="lw-missing-list svelte-16sl5ea"></ul></div></div>',
  ),
  $a = c('<li><code class="svelte-16sl5ea"> </code></li>'),
  et = c('<li><span class="lw-muted svelte-16sl5ea">...</span></li>'),
  at = c(
    '<div class="lw-install-run svelte-16sl5ea"><span class="lw-install-run-kicker svelte-16sl5ea"> </span> <ol class="lw-plan-preview-list svelte-16sl5ea"><!> <!></ol></div>',
  ),
  tt = c(
    '<div class="lw-install-hero svelte-16sl5ea"><div class="lw-install-hero-meta svelte-16sl5ea"><span class="lw-install-hero-step svelte-16sl5ea"> </span> <span class="lw-install-hero-hint svelte-16sl5ea"> <code class="svelte-16sl5ea"> </code></span></div> <!> <!></div>',
  ),
  st = c(
    '<section class="lw-panel svelte-16sl5ea"><h2 class="lw-title svelte-16sl5ea"> </h2> <!> <div class="lw-welcome-actions svelte-16sl5ea"><div class="lw-action-row svelte-16sl5ea"><button class="lw-cta svelte-16sl5ea"> </button> <button class="lw-btn lw-btn--ghost svelte-16sl5ea"> </button></div> <span class="lw-welcome-time svelte-16sl5ea"> </span></div></section>',
  ),
  lt = c('<span class="lw-detail svelte-16sl5ea"> </span>'),
  rt = c(
    '<li><span class="lw-dot svelte-16sl5ea" aria-hidden="true"></span> <span class="lw-name svelte-16sl5ea"> </span> <!></li>',
  ),
  nt = c(
    '<article class="lw-cat svelte-16sl5ea"><header class="svelte-16sl5ea"><strong> </strong> <span class="lw-count svelte-16sl5ea"> </span></header> <ul class="svelte-16sl5ea"></ul></article>',
  ),
  ot = c('<div class="lw-cats svelte-16sl5ea"></div>'),
  vt = c('<p class="lw-muted svelte-16sl5ea"> </p>'),
  it = c(
    '<section class="lw-panel svelte-16sl5ea"><h2 class="lw-title svelte-16sl5ea"> </h2> <!></section>',
  ),
  ct = c(
    '<li class="svelte-16sl5ea"><span class="lw-plan-idx svelte-16sl5ea"> </span> <div class="lw-plan-body svelte-16sl5ea"><strong> </strong> <code class="svelte-16sl5ea"> </code></div></li>',
  ),
  ut = c('<ol class="lw-plan svelte-16sl5ea"></ol>'),
  pt = c('<p class="lw-muted svelte-16sl5ea"> </p>'),
  dt = c(
    '<section class="lw-panel svelte-16sl5ea"><h2 class="lw-title svelte-16sl5ea"> </h2> <!></section>',
  ),
  _t = c('<p class="lw-muted svelte-16sl5ea"> </p>'),
  ft = c('<p class="lw-muted svelte-16sl5ea"> </p>'),
  wt = c('<p class="lw-error svelte-16sl5ea"> </p>'),
  mt = c(
    '<section class="lw-panel svelte-16sl5ea"><h2 class="lw-title svelte-16sl5ea"> </h2> <p class="lw-lead svelte-16sl5ea"> </p> <label class="lw-check svelte-16sl5ea"><input type="checkbox" class="svelte-16sl5ea"/> <span> </span></label> <label class="lw-check svelte-16sl5ea"><input type="checkbox" class="svelte-16sl5ea"/> <span> </span></label> <!> <!> <button class="lw-cta svelte-16sl5ea"> </button></section>',
  ),
  gt = c("<li> </li>"),
  ht = c('<ol class="lw-plan-compact svelte-16sl5ea"></ol>'),
  bt = c('<p class="lw-error svelte-16sl5ea"> </p>'),
  xt = c(
    '<section class="lw-panel lw-panel--execute svelte-16sl5ea"><h2 class="lw-title svelte-16sl5ea"> </h2> <div class="lw-stage-line svelte-16sl5ea"><span class="lw-stage-label svelte-16sl5ea"> </span> <span class="lw-stage-value svelte-16sl5ea"> </span></div> <!> <pre class="lw-output svelte-16sl5ea" aria-live="polite"> </pre> <!></section>',
  ),
  yt = c('<p class="lw-error svelte-16sl5ea"> </p>'),
  kt = c(
    '<li class="svelte-16sl5ea"><code class="svelte-16sl5ea"> </code> <span class="svelte-16sl5ea"> </span></li>',
  ),
  Et = c(
    '<section class="lw-panel svelte-16sl5ea"><h2 class="lw-title svelte-16sl5ea"> </h2> <div class="lw-stage-line svelte-16sl5ea"><span class="lw-stage-label svelte-16sl5ea"> </span> <span class="lw-stage-value svelte-16sl5ea"> </span></div> <!> <pre class="lw-output lw-output--compact svelte-16sl5ea"> </pre> <div class="lw-ready-actions svelte-16sl5ea"><button class="lw-cta svelte-16sl5ea"> </button> <button class="lw-btn lw-btn--ghost svelte-16sl5ea"> </button></div> <div class="lw-next svelte-16sl5ea"><span class="lw-next-label svelte-16sl5ea"> </span> <ul class="svelte-16sl5ea"></ul></div></section>',
  ),
  St = c('<button class="lw-btn svelte-16sl5ea"> </button>'),
  Tt = c(
    '<div class="live-wizard svelte-16sl5ea" role="region"><header class="lw-header svelte-16sl5ea"><div class="lw-brand svelte-16sl5ea"><!></div> <!></header> <nav class="lw-progress svelte-16sl5ea"><div class="lw-track svelte-16sl5ea"><div class="lw-track-fill svelte-16sl5ea"></div></div> <ol class="lw-steps svelte-16sl5ea"></ol></nav> <div class="lw-stage svelte-16sl5ea"><!></div> <nav class="lw-nav svelte-16sl5ea"><button class="lw-btn svelte-16sl5ea"> </button> <button class="lw-btn lw-btn--ghost svelte-16sl5ea"> </button> <!></nav></div>',
  );
function It(le, B) {
  ra(B, !0);
  let z = Ra(B, "lang", 3, "en");
  const N = ["welcome", "diagnostics", "plan", "consent", "execute", "ready"];
  let p = G("welcome"),
    f = G(null),
    U = G(null),
    $ = G(!0),
    I = G(null),
    X = G(null),
    K = G(!1),
    Y = null,
    re = 0,
    T = 0,
    R = G(!1),
    W = G(!0),
    Z = G(null),
    ie = G(!1);
  const ee = J(() => N.indexOf(e(p))),
    xe = Ba.of(() => (e(ee) / (N.length - 1)) * 100, {
      duration: Ma.current ? 0 : 240,
    }),
    ye = "vibecrafted-installer:closing",
    o = J(() => ia(z()).sections.installer.live);
  la(() => {
    const s = () => {
      he();
    };
    return (
      window.addEventListener(ye, s),
      me(),
      () => {
        (window.removeEventListener(ye, s), he());
      }
    );
  });
  async function me() {
    (_($, !0), _(U, null), _(K, !1), (T = 0));
    try {
      (_(f, await Fe.preflight(), !0), _(I, e(f).status, !0), _(X, null));
    } catch (s) {
      (_(U, s instanceof Error ? s.message : String(s), !0), _(K, !0));
    } finally {
      _($, !1);
    }
  }
  function ge(s, l = 900) {
    Y ||
      s !== re ||
      e(K) ||
      (Y = setTimeout(async () => {
        if (((Y = null), s === re)) {
          try {
            if (
              (_(I, await Fe.status(), !0),
              _(X, null),
              (T = 0),
              _(K, !1),
              e(I).completed)
            ) {
              he();
              return;
            }
          } catch (v) {
            if (
              (_(X, v instanceof Error ? v.message : String(v), !0),
              (T += 1),
              T >= 3)
            ) {
              (_(K, !0), he());
              return;
            }
          }
          s === re &&
            !e(K) &&
            !e(I)?.completed &&
            (e(p) === "execute" || e(p) === "ready") &&
            ge(s);
        }
      }, l));
  }
  function ke() {
    Y || e(K) || e(I)?.completed || ((re += 1), ge(re, 0));
  }
  function he() {
    ((re += 1), Y && (clearTimeout(Y), (Y = null)));
  }
  async function ca() {
    (_(ie, !0), _(Z, null));
    try {
      const s = await Fe.startInstall(e(W));
      if (!s.ok) {
        _(Z, s.message, !0);
        return;
      }
      ((T = 0), _(K, !1), _(p, "execute"), ke());
    } catch (s) {
      _(Z, s instanceof Error ? s.message : String(s), !0);
    } finally {
      _(ie, !1);
    }
  }
  async function ua() {
    try {
      await Fe.openStartHere();
    } catch (s) {
      _(X, s instanceof Error ? s.message : String(s), !0);
    }
  }
  function Ke(s) {
    _(p, s, !0);
  }
  function We() {
    const s = e(ee);
    s < N.length - 1 && _(p, N[s + 1], !0);
  }
  function pa() {
    const s = e(ee);
    s > 0 && _(p, N[s - 1], !0);
  }
  (aa(() => {
    e(I)?.completed && e(p) === "execute" && _(p, "ready");
  }),
    aa(() => {
      if (
        (e(p) === "execute" || e(p) === "ready") &&
        e(I) &&
        !e(I).completed &&
        !e(K) &&
        !Y
      ) {
        ke();
        return;
      }
      he();
    }));
  const da = J(() => e(o).nextCommands),
    Me = J(() => e(I)?.output ?? []),
    Qe = J(() => e(I)?.plan_labels ?? []),
    Ue = J(() => e(I)?.current_stage ?? null),
    Xe = J(() => e(I)?.exit_code ?? null),
    _a = J(() => e(Xe) === 0),
    Ye = J(() => !!e(I)?.running),
    fa = J(() => !!e(I)?.completed);
  async function wa() {
    (he(),
      await me(),
      e(I) &&
        !e(I).completed &&
        (e(p) === "execute" || e(p) === "ready") &&
        ke());
  }
  var Oe = Tt(),
    Re = t(Oe),
    Be = t(Re),
    ma = t(Be);
  {
    var ga = (s) => {
        var l = qa(),
          v = He(l),
          L = t(v, !0);
        a(v);
        var d = n(v, 2),
          E = t(d, !0);
        (a(d),
          u(() => {
            (r(L, e(f).brand.product_line), r(E, e(f).brand.tagline));
          }),
          i(s, l));
      },
      ha = (s) => {
        var l = Ga(),
          v = t(l, !0);
        (a(l), u(() => r(v, e(o).brandFallback)), i(s, l));
      };
    j(ma, (s) => {
      e(f)?.brand ? s(ga) : s(ha, -1);
    });
  }
  a(Be);
  var ba = n(Be, 2);
  {
    var xa = (s) => {
      var l = Ja(),
        v = t(l),
        L = n(t(v), 1, !0);
      a(v);
      var d = n(v, 2),
        E = t(d, !0);
      (a(d),
        a(l),
        u(() => {
          (r(L, e(f).version), r(E, e(f).source_dir_display));
        }),
        i(s, l));
    };
    j(ba, (s) => {
      e(f) && s(xa);
    });
  }
  a(Re);
  var Ae = n(Re, 2),
    Ne = t(Ae),
    ya = t(Ne);
  a(Ne);
  var Ze = n(Ne, 2);
  (te(
    Ze,
    21,
    () => N,
    se,
    (s, l, v) => {
      var L = Ka(),
        d = t(L);
      let E;
      var A = n(t(d), 2),
        w = t(A, !0);
      (a(A),
        a(d),
        a(L),
        u(() => {
          ((E = Je(d, 1, "lw-step svelte-16sl5ea", null, E, {
            active: e(l) === e(p),
            done: v < e(ee),
          })),
            De(d, "aria-current", e(l) === e(p) ? "step" : void 0),
            r(w, e(o).labels[e(l)]));
        }),
        Q("click", d, () => Ke(e(l))),
        i(s, L));
    },
  ),
    a(Ze),
    a(Ae));
  var Ve = n(Ae, 2),
    ka = t(Ve);
  {
    var Ea = (s) => {
        var l = Qa(),
          v = t(l),
          L = t(v, !0);
        a(v);
        var d = n(v, 2),
          E = t(d, !0);
        a(d);
        var A = n(d, 2);
        {
          var w = (b) => {
            var S = Wa(),
              C = t(S, !0);
            (a(S), u(() => r(C, e(X))), i(b, S));
          };
          j(A, (b) => {
            e(X) && b(w);
          });
        }
        var m = n(A, 2),
          P = t(m, !0);
        (a(m),
          a(l),
          u(() => {
            (r(L, e(o).status.loadFailed),
              r(E, e(o).status.notConnected),
              r(P, e(o).nav.refresh));
          }),
          Q("click", m, wa),
          V(
            1,
            l,
            () => _e,
            () => ({ y: 8, duration: 200 }),
          ),
          V(
            2,
            l,
            () => fe,
            () => ({ duration: 140 }),
          ),
          i(s, l));
      },
      Sa = (s) => {
        var l = st(),
          v = t(l),
          L = t(v, !0);
        a(v);
        var d = n(v, 2);
        {
          var E = (g) => {
              var x = Ua(),
                O = t(x, !0);
              (a(x), u(() => r(O, e(o).status.loadingPreflight)), i(g, x));
            },
            A = (g) => {
              var x = Xa(),
                O = t(x);
              (a(x),
                u(() => r(O, `${e(o).status.loadFailed ?? ""}: ${e(U) ?? ""}`)),
                i(g, x));
            },
            w = (g) => {
              var x = tt(),
                O = t(x),
                y = t(O),
                q = t(y);
              a(y);
              var k = n(y, 2),
                h = t(k),
                H = n(h),
                ae = t(H, !0);
              (a(H), a(k), a(O));
              var ne = n(O, 2);
              {
                var ce = (ue) => {
                  var pe = Za(),
                    be = t(pe),
                    Ie = t(be),
                    je = t(Ie);
                  a(Ie);
                  var Le = n(Ie, 2);
                  (te(
                    Le,
                    21,
                    () => e(f).categories,
                    se,
                    (qe, Ge) => {
                      var ve = va(),
                        Pe = He(ve);
                      (te(
                        Pe,
                        17,
                        () => e(Ge).items.filter((de) => !de.found),
                        se,
                        (de, ze) => {
                          var Ce = Ya(),
                            ea = t(Ce),
                            za = t(ea, !0);
                          (a(ea),
                            a(Ce),
                            u(() => r(za, e(ze).label)),
                            i(de, Ce));
                        },
                      ),
                        i(qe, ve));
                    },
                  ),
                    a(Le),
                    a(be),
                    a(pe),
                    u(() => r(je, `${e(o).welcome.missingList ?? ""}:`)),
                    i(ue, pe));
                };
                j(ne, (ue) => {
                  e(f).missing_count > 0 && ue(ce);
                });
              }
              var oe = n(ne, 2);
              {
                var Te = (ue) => {
                  var pe = at(),
                    be = t(pe),
                    Ie = t(be, !0);
                  a(be);
                  var je = n(be, 2),
                    Le = t(je);
                  te(
                    Le,
                    17,
                    () => e(f).install_plan.slice(0, 3),
                    se,
                    (ve, Pe) => {
                      var de = $a(),
                        ze = t(de),
                        Ce = t(ze, !0);
                      (a(ze), a(de), u(() => r(Ce, e(Pe).command)), i(ve, de));
                    },
                  );
                  var qe = n(Le, 2);
                  {
                    var Ge = (ve) => {
                      var Pe = et();
                      i(ve, Pe);
                    };
                    j(qe, (ve) => {
                      e(f).install_plan.length > 3 && ve(Ge);
                    });
                  }
                  (a(je),
                    a(pe),
                    u(() => r(Ie, e(o).welcome.planPreview)),
                    i(ue, pe));
                };
                j(oe, (ue) => {
                  e(f).install_plan.length > 0 && ue(Te);
                });
              }
              (a(x),
                u(() => {
                  (r(
                    q,
                    `${e(f).found_count ?? ""} / ${e(f).found_count + e(f).missing_count} ${e(o).welcome.componentsFound ?? ""}`,
                  ),
                    r(h, `${e(o).welcome.sourceDir ?? ""} `),
                    r(ae, e(f).source_dir_display));
                }),
                i(g, x));
            };
          j(d, (g) => {
            e($) ? g(E) : e(U) ? g(A, 1) : e(f) && g(w, 2);
          });
        }
        var m = n(d, 2),
          P = t(m),
          b = t(P),
          S = t(b);
        a(b);
        var C = n(b, 2),
          D = t(C, !0);
        (a(C), a(P));
        var M = n(P, 2),
          F = t(M, !0);
        (a(M),
          a(m),
          a(l),
          u(() => {
            (r(L, e(o).welcome.title),
              (b.disabled = e($) || !e(f) || !!e(U)),
              r(S, `${e(o).welcome.cta ?? ""} →`),
              (C.disabled = e($)),
              r(D, e(o).welcome.reRun),
              r(F, e(o).welcome.timeEstimate));
          }),
          Q("click", b, We),
          Q("click", C, me),
          V(
            1,
            l,
            () => _e,
            () => ({ y: 8, duration: 200 }),
          ),
          V(
            2,
            l,
            () => fe,
            () => ({ duration: 140 }),
          ),
          i(s, l));
      },
      Ta = (s) => {
        var l = it(),
          v = t(l),
          L = t(v, !0);
        a(v);
        var d = n(v, 2);
        {
          var E = (w) => {
              var m = ot();
              (te(
                m,
                21,
                () => e(f).categories,
                se,
                (P, b) => {
                  var S = nt(),
                    C = t(S),
                    D = t(C),
                    M = t(D, !0);
                  a(D);
                  var F = n(D, 2),
                    g = t(F);
                  (a(F), a(C));
                  var x = n(C, 2);
                  (te(
                    x,
                    21,
                    () => e(b).items,
                    se,
                    (O, y) => {
                      var q = rt();
                      let k;
                      var h = n(t(q), 2),
                        H = t(h, !0);
                      a(h);
                      var ae = n(h, 2);
                      {
                        var ne = (ce) => {
                          var oe = lt(),
                            Te = t(oe, !0);
                          (a(oe), u(() => r(Te, e(y).detail)), i(ce, oe));
                        };
                        j(ae, (ce) => {
                          e(y).detail && ce(ne);
                        });
                      }
                      (a(q),
                        u(() => {
                          ((k = Je(q, 1, "svelte-16sl5ea", null, k, {
                            found: e(y).found,
                            missing: !e(y).found,
                          })),
                            r(H, e(y).label));
                        }),
                        i(O, q));
                    },
                  ),
                    a(x),
                    a(S),
                    u(() => {
                      (r(M, e(b).label),
                        r(g, `${e(b).present ?? ""}/${e(b).total ?? ""}`));
                    }),
                    i(P, S));
                },
              ),
                a(m),
                i(w, m));
            },
            A = (w) => {
              var m = vt(),
                P = t(m, !0);
              (a(m), u(() => r(P, e(o).diagnostics.empty)), i(w, m));
            };
          j(d, (w) => {
            e(f) && e(f).categories.length > 0 ? w(E) : w(A, -1);
          });
        }
        (a(l),
          u(() => r(L, e(o).diagnostics.title)),
          V(
            1,
            l,
            () => _e,
            () => ({ y: 8, duration: 200 }),
          ),
          V(
            2,
            l,
            () => fe,
            () => ({ duration: 140 }),
          ),
          i(s, l));
      },
      Ia = (s) => {
        var l = dt(),
          v = t(l),
          L = t(v, !0);
        a(v);
        var d = n(v, 2);
        {
          var E = (w) => {
              var m = ut();
              (te(
                m,
                21,
                () => e(f).install_plan,
                se,
                (P, b, S) => {
                  var C = ct(),
                    D = t(C),
                    M = t(D);
                  a(D);
                  var F = n(D, 2),
                    g = t(F),
                    x = t(g, !0);
                  a(g);
                  var O = n(g, 2),
                    y = t(O, !0);
                  (a(O),
                    a(F),
                    a(C),
                    u(() => {
                      (r(M, `${e(o).plan.stepLabel ?? ""} ${S + 1}`),
                        r(x, e(b).label),
                        r(y, e(b).command));
                    }),
                    i(P, C));
                },
              ),
                a(m),
                i(w, m));
            },
            A = (w) => {
              var m = pt(),
                P = t(m, !0);
              (a(m), u(() => r(P, e(o).plan.empty)), i(w, m));
            };
          j(d, (w) => {
            e(f) && e(f).install_plan.length > 0 ? w(E) : w(A, -1);
          });
        }
        (a(l),
          u(() => r(L, e(o).plan.title)),
          V(
            1,
            l,
            () => _e,
            () => ({ y: 8, duration: 200 }),
          ),
          V(
            2,
            l,
            () => fe,
            () => ({ duration: 140 }),
          ),
          i(s, l));
      },
      La = (s) => {
        var l = mt(),
          v = t(l),
          L = t(v, !0);
        a(v);
        var d = n(v, 2),
          E = t(d, !0);
        a(d);
        var A = n(d, 2),
          w = t(A);
        ta(w);
        var m = n(w, 2),
          P = t(m, !0);
        (a(m), a(A));
        var b = n(A, 2),
          S = t(b);
        ta(S);
        var C = n(S, 2),
          D = t(C, !0);
        (a(C), a(b));
        var M = n(b, 2);
        {
          var F = (k) => {
              var h = _t(),
                H = t(h, !0);
              (a(h), u(() => r(H, e(o).consent.again)), i(k, h));
            },
            g = (k) => {
              var h = ft(),
                H = t(h, !0);
              (a(h), u(() => r(H, e(o).consent.running)), i(k, h));
            };
          j(M, (k) => {
            e(fa) ? k(F) : e(Ye) && k(g, 1);
          });
        }
        var x = n(M, 2);
        {
          var O = (k) => {
            var h = wt(),
              H = t(h, !0);
            (a(h), u(() => r(H, e(Z))), i(k, h));
          };
          j(x, (k) => {
            e(Z) && k(O);
          });
        }
        var y = n(x, 2),
          q = t(y);
        (a(y),
          a(l),
          u(() => {
            (r(L, e(o).consent.title),
              r(E, e(o).consent.body),
              r(P, e(o).consent.accept),
              r(D, e(o).consent.withShell),
              (y.disabled = !e(R) || e(ie) || e(Ye)),
              r(q, `${e(o).consent.cta ?? ""} →`));
          }),
          sa(
            w,
            () => e(R),
            (k) => _(R, k),
          ),
          sa(
            S,
            () => e(W),
            (k) => _(W, k),
          ),
          Q("click", y, ca),
          V(
            1,
            l,
            () => _e,
            () => ({ y: 8, duration: 200 }),
          ),
          V(
            2,
            l,
            () => fe,
            () => ({ duration: 140 }),
          ),
          i(s, l));
      },
      Pa = (s) => {
        var l = xt(),
          v = t(l),
          L = t(v, !0);
        a(v);
        var d = n(v, 2),
          E = t(d),
          A = t(E, !0);
        a(E);
        var w = n(E, 2),
          m = t(w, !0);
        (a(w), a(d));
        var P = n(d, 2);
        {
          var b = (F) => {
            var g = ht();
            (te(
              g,
              21,
              () => e(Qe),
              se,
              (x, O) => {
                var y = gt();
                let q;
                var k = t(y, !0);
                (a(y),
                  u(() => {
                    ((q = Je(y, 1, "svelte-16sl5ea", null, q, {
                      active: e(O) === e(Ue),
                    })),
                      r(k, e(O)));
                  }),
                  i(x, y));
              },
            ),
              a(g),
              i(F, g));
          };
          j(P, (F) => {
            e(Qe).length > 0 && F(b);
          });
        }
        var S = n(P, 2),
          C = t(S, !0);
        a(S);
        var D = n(S, 2);
        {
          var M = (F) => {
            var g = bt(),
              x = t(g, !0);
            (a(g), u(() => r(x, e(X))), i(F, g));
          };
          j(D, (F) => {
            e(X) && F(M);
          });
        }
        (a(l),
          u(
            (F) => {
              (r(L, e(o).execute.title),
                r(A, e(o).execute.stage),
                r(m, e(Ue) ?? "…"),
                r(C, F));
            },
            [
              () =>
                e(Me).length > 0
                  ? e(Me).join(`
`)
                  : e(o).execute.waiting,
            ],
          ),
          V(
            1,
            l,
            () => _e,
            () => ({ y: 8, duration: 200 }),
          ),
          V(
            2,
            l,
            () => fe,
            () => ({ duration: 140 }),
          ),
          i(s, l));
      },
      Ca = (s) => {
        var l = Et(),
          v = t(l),
          L = t(v, !0);
        a(v);
        var d = n(v, 2),
          E = t(d),
          A = t(E, !0);
        a(E);
        var w = n(E, 2),
          m = t(w, !0);
        (a(w), a(d));
        var P = n(d, 2);
        {
          var b = (h) => {
            var H = yt(),
              ae = t(H, !0);
            (a(H), u(() => r(ae, e(I).error)), i(h, H));
          };
          j(P, (h) => {
            e(I)?.error && h(b);
          });
        }
        var S = n(P, 2),
          C = t(S, !0);
        a(S);
        var D = n(S, 2),
          M = t(D),
          F = t(M, !0);
        a(M);
        var g = n(M, 2),
          x = t(g, !0);
        (a(g), a(D));
        var O = n(D, 2),
          y = t(O),
          q = t(y, !0);
        a(y);
        var k = n(y, 2);
        (te(
          k,
          21,
          () => e(da),
          se,
          (h, H) => {
            var ae = kt(),
              ne = t(ae),
              ce = t(ne, !0);
            a(ne);
            var oe = n(ne, 2),
              Te = t(oe, !0);
            (a(oe),
              a(ae),
              u(() => {
                (r(ce, e(H).cmd), r(Te, e(H).desc));
              }),
              i(h, ae));
          },
        ),
          a(k),
          a(O),
          a(l),
          u(
            (h) => {
              (r(L, e(_a) ? e(o).ready.titleOk : e(o).ready.titleFail),
                r(A, e(o).ready.exit),
                r(m, e(Xe) ?? "—"),
                r(C, h),
                r(F, e(o).ready.openGuide),
                r(x, e(o).ready.reinstall),
                r(q, e(o).ready.nextSteps));
            },
            [
              () =>
                e(Me).slice(-40).join(`
`),
            ],
          ),
          Q("click", M, ua),
          Q("click", g, () => Ke("consent")),
          V(
            1,
            l,
            () => _e,
            () => ({ y: 8, duration: 200 }),
          ),
          V(
            2,
            l,
            () => fe,
            () => ({ duration: 140 }),
          ),
          i(s, l));
      };
    j(ka, (s) => {
      e(K)
        ? s(Ea)
        : e(p) === "welcome"
          ? s(Sa, 1)
          : e(p) === "diagnostics"
            ? s(Ta, 2)
            : e(p) === "plan"
              ? s(Ia, 3)
              : e(p) === "consent"
                ? s(La, 4)
                : e(p) === "execute"
                  ? s(Pa, 5)
                  : e(p) === "ready" && s(Ca, 6);
    });
  }
  a(Ve);
  var $e = n(Ve, 2),
    Ee = t($e),
    Fa = t(Ee);
  a(Ee);
  var Se = n(Ee, 2),
    Oa = t(Se, !0);
  a(Se);
  var Aa = n(Se, 2);
  {
    var ja = (s) => {
      var l = St(),
        v = t(l);
      (a(l),
        u(() => {
          ((l.disabled = !e(f)), r(v, `${e(o).nav.next ?? ""} →`));
        }),
        Q("click", l, We),
        i(s, l));
    };
    j(Aa, (s) => {
      e(p) !== "ready" && e(p) !== "execute" && s(ja);
    });
  }
  (a($e),
    a(Oe),
    u(() => {
      (De(Oe, "aria-label", e(o).regionLabel),
        De(Ae, "aria-label", e(o).stepsAria),
        Da(ya, `width: ${xe.current}%`),
        (Ee.disabled = e(ee) === 0),
        r(Fa, `← ${e(o).nav.back ?? ""}`),
        (Se.disabled = e($)),
        r(Oa, e(o).nav.refresh));
    }),
    Q("click", Ee, pa),
    Q("click", Se, me),
    i(le, Oe),
    na());
}
oa(["click"]);
var Lt = c(
    '<div class="installer-shell svelte-dp14li"><div class="installer-shell__demo-banner svelte-dp14li" role="note"><span class="installer-shell__badge svelte-dp14li">DEMO</span> <span class="installer-shell__demo-copy svelte-dp14li"> </span></div> <!></div>',
  ),
  Pt = c(
    '<p class="installer-shell__bridge-error svelte-dp14li"> </p> <button class="installer-shell__bridge-action svelte-dp14li"> </button>',
    1,
  ),
  Ct = c(
    '<div class="installer-shell__bridge svelte-dp14li" role="status" aria-live="polite"><span class="installer-shell__bridge-kicker svelte-dp14li"> </span> <!></div>',
  );
function Jt(le, B) {
  ra(B, !0);
  let z = G("booting"),
    N = G(null);
  const p = J(() => ia(B.lang)),
    f = J(() => e(p).sections.installer.live),
    U = J(() => e(p).sections.installer.wizard);
  async function $(T = () => !1) {
    if ((_(N, null), _(z, "booting"), !Va())) {
      T() || _(z, "preview");
      return;
    }
    try {
      (await Fe.health(), T() || _(z, "live"));
    } catch (R) {
      if (T()) return;
      (_(N, R instanceof Error ? R.message : String(R), !0), _(z, "lost"));
    }
  }
  la(() => {
    let T = !1;
    return (
      (async () => await $(() => T))(),
      () => {
        T = !0;
      }
    );
  });
  var I = va(),
    X = He(I);
  {
    var K = (T) => {
        It(T, {
          get lang() {
            return B.lang;
          },
        });
      },
      Y = (T) => {
        var R = Lt(),
          W = t(R),
          Z = n(t(W), 2),
          ie = t(Z, !0);
        (a(Z), a(W));
        var ee = n(W, 2);
        (Ha(ee, {
          get lang() {
            return B.lang;
          },
          get manifest() {
            return B.manifest;
          },
        }),
          a(R),
          u(() => {
            (De(W, "aria-label", e(U).installPreviewKicker),
              r(ie, e(U).installPreviewKicker));
          }),
          i(T, R));
      },
      re = (T) => {
        var R = Ct(),
          W = t(R),
          Z = t(W, !0);
        a(W);
        var ie = n(W, 2);
        {
          var ee = (xe) => {
            var ye = Pt(),
              o = He(ye),
              me = t(o, !0);
            a(o);
            var ge = n(o, 2),
              ke = t(ge, !0);
            (a(ge),
              u(() => {
                (r(me, e(N)), r(ke, e(f).nav.refresh));
              }),
              Q("click", ge, () => $()),
              i(xe, ye));
          };
          j(ie, (xe) => {
            e(z) === "lost" && e(N) && xe(ee);
          });
        }
        (a(R),
          u(() =>
            r(
              Z,
              e(z) === "lost"
                ? e(f).status.notConnected
                : e(f).status.loadingPreflight,
            ),
          ),
          i(T, R));
      };
    j(X, (T) => {
      e(z) === "live" ? T(K) : e(z) === "preview" ? T(Y, 1) : T(re, -1);
    });
  }
  (i(le, I), na());
}
oa(["click"]);
export { Jt as default };
