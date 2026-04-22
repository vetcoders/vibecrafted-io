import "./disclose-version.DsnmJJEf.js";
import {
  b as x,
  h as Fe,
  u as Z,
  t as D,
  g as e,
  p as Te,
  a as Ue,
  s as i,
  d as q,
  e as z,
  c as p,
  r as d,
  f as me,
} from "./runtime.QfC15RoP.js";
import { d as Qe, e as ve, a as $, s as S } from "./render.CqgMSlkN.js";
import { a as E, f as K } from "./template.DrTY0w-c.js";
import { i as te } from "./if.Bn6v29Er.js";
import { e as ke, i as Be } from "./each.Bl5LU2PA.js";
import { t as we, f as Ge, a as $e, p as Oe } from "./index.CDVM_SEU.js";
import { r as Ve, a as b, s as O } from "./attributes.CKni9qMX.js";
import { a as Ye } from "./input.rX2j9oe5.js";
import { b as ye } from "./this.MJJ6CZzJ.js";
import { p as Ze } from "./props.DDrYma4F.js";
import { g as ge } from "./index.CFQc2B1F.js";
const Je = {
  "&amp;": "&",
  "&gt;": ">",
  "&lt;": "<",
  "&mdash;": " ",
  "&nbsp;": " ",
  "&rarr;": " ",
};
function Le(r) {
  return r
    .replace(/<code>/g, " ")
    .replace(/<\/code>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, (s) => Je[s] ?? " ")
    .replace(/\s+/g, " ")
    .trim();
}
function F(...r) {
  const s = r.flatMap((l) =>
    Le(l)
      .toLowerCase()
      .split(/[^a-z0-9ąćęłńóśźż-]+/i)
      .filter((f) => f.length >= 3),
  );
  return [...new Set(s)];
}
function Xe(r, s) {
  const l = r.sections.quickstartHero,
    f = r.sections.quickstartResources,
    u = r.sections.quickstartSteps.steps.map((t, c) => ({
      href: `#quickstart-step-${c + 1}`,
      title: t.title,
      body: `${t.kicker} ${t.body} ${"command" in t ? t.command : t.commands.join(" ")} ${"note" in t ? t.note : ""}`,
      keywords: F(
        t.kicker,
        t.title,
        t.body,
        "command" in t ? t.command : t.commands.join(" "),
        "note" in t ? t.note : "",
        "install bootstrap doctor init workflow justdo marbles release hydrate doctor setup prerequisites",
      ),
    })),
    o = f.cards.map((t, c) => ({
      href: `#quickstart-resource-${c + 1}`,
      title: t.title,
      body: `${t.kicker} ${t.items.join(" ")}`,
      keywords: F(
        t.kicker,
        t.title,
        t.items.join(" "),
        "prerequisites foundations artifacts shell helpers control plane runtime",
      ),
    }));
  return {
    fallbackLinks: [
      { href: l.primaryHref, label: l.primaryLabel },
      { href: l.secondaryHref, label: l.secondaryLabel },
      { href: "#quickstart-steps", label: s === "pl" ? "Kroki" : "Steps" },
      {
        href: "#quickstart-resources",
        label: s === "pl" ? "Zasoby" : "Resources",
      },
    ],
    items: [...u, ...o],
  };
}
function Ne(r, s) {
  const l = r.sections.faqHero,
    f = r.sections.faqContent.groups.flatMap((u, o) =>
      u.items.map((t, c) => ({
        href: `#faq-${o + 1}-${c + 1}`,
        title: Le(t.questionHtml),
        body: `${u.title} ${t.answerHtml}`,
        keywords: F(
          u.title,
          t.questionHtml,
          t.answerHtml,
          "install runtime skills license shell foundations artifacts helpers automation",
        ),
      })),
    );
  return {
    fallbackLinks: [
      { href: l.primaryHref, label: l.primaryLabel },
      { href: l.secondaryHref, label: l.secondaryLabel },
      {
        href: "#faq-content",
        label: s === "pl" ? "Sekcje FAQ" : "FAQ sections",
      },
    ],
    items: f,
  };
}
function et(r) {
  const s = r === "pl" ? "/pl/install/" : "/en/install/",
    l = r === "pl" ? "/pl/framework/" : "/en/framework/",
    f = r === "pl" ? "/pl/#pipeline" : "/en/#pipeline";
  return [
    {
      href: l,
      title: "Framework playground",
      body:
        r === "pl"
          ? "Interaktywna plansza konwergencji dla scaffold, init, workflow, followup, marbles, DoU, decorate, hydrate i release."
          : "Interactive convergence board for scaffold, init, workflow, follow-up, marbles, DoU, decorate, hydrate, and release.",
      keywords: F(
        "framework playground convergence board scaffold init workflow followup marbles dou decorate hydrate release demo",
      ),
    },
    {
      href: s,
      title: r === "pl" ? "Prowadzony instalator" : "Guided installer",
      body:
        r === "pl"
          ? "Browser-guided install flow do sprawdzenia wymagań, planu bootstrapu i pierwszego uruchomienia frameworka."
          : "Browser-guided install flow for prerequisites, bootstrap planning, and the first framework launch.",
      keywords: F(
        "install installer guided setup bootstrap doctor prerequisites shell wizard browser",
      ),
    },
    {
      href: f,
      title: "Craft -> Converge -> Ship",
      body:
        r === "pl"
          ? "Cały pipeline produktu: Scaffold, Init, Workflow, Follow-up, Marbles, DoU, Decorate, Hydrate, Release."
          : "The full product pipeline: Scaffold, Init, Workflow, Follow-up, Marbles, DoU, Decorate, Hydrate, Release.",
      keywords: F(
        "pipeline craft converge ship scaffold init workflow followup marbles dou decorate hydrate release",
      ),
    },
  ];
}
function _e(r, s) {
  return r.map((l) => ({
    ...l,
    href: l.href.startsWith("#") ? `${s}${l.href}` : l.href,
  }));
}
function tt(r, s) {
  const l = ge(r),
    f = r === "pl" ? "/pl/quickstart/" : "/en/quickstart/",
    u = r === "pl" ? "/pl/faq/" : "/en/faq/",
    o = Xe(l, r),
    t = Ne(l, r),
    c = et(r),
    H =
      r === "pl"
        ? {
            emptyLabel: "Wpisz pytanie, komendę albo powierzchnię produktu.",
            fallbackLabel: "Skoki awaryjne",
            noResultsLabel:
              "Brak mocnego trafienia. Skorzystaj z najbliższych wejść poniżej.",
            placeholder:
              s === "faq"
                ? "Szukaj po instalacji, licencji, runtime, skillach…"
                : s === "all"
                  ? "Szukaj po frameworku, installu, doctorze, init, workflow, release…"
                  : "Szukaj po instalacji, doctorze, init, workflow, release…",
            resultsLabel: "Najbliższe trafienia",
          }
        : {
            emptyLabel:
              "Ask for a command, product surface, or operating question.",
            fallbackLabel: "Fast paths",
            noResultsLabel:
              "No strong match yet. Use the closest entry points below.",
            placeholder:
              s === "faq"
                ? "Search installation, license, runtime, skills…"
                : s === "all"
                  ? "Search framework, install, doctor, init, workflow, release…"
                  : "Search install, doctor, init, workflow, release…",
            resultsLabel: "Closest matches",
          };
  return s === "all"
    ? {
        ...H,
        fallbackLinks: [
          { href: c[0].href, label: c[0].title },
          { href: c[1].href, label: c[1].title },
          { href: o.fallbackLinks[0].href, label: o.fallbackLinks[0].label },
          { href: t.fallbackLinks[0].href, label: t.fallbackLinks[0].label },
        ],
        items: [...c, ..._e(o.items, f), ..._e(t.items, u)],
      }
    : s === "quickstart"
      ? { ...H, fallbackLinks: o.fallbackLinks, items: o.items }
      : { ...H, fallbackLinks: t.fallbackLinks, items: t.items };
}
const at = {
  en: {
    install: ["bootstrap", "setup", "doctor", "shell"],
    doctor: ["health", "check", "diagnostics", "doctor"],
    init: ["bootstrap", "context", "map", "repo"],
    workflow: ["implement", "research", "pipeline", "agents"],
    release: ["ship", "launch", "hydrate", "decorate", "dou"],
    license: ["bsl", "business", "source"],
    runtime: ["control", "plane", "artifacts"],
  },
  pl: {
    instalacja: ["bootstrap", "doctor", "setup", "shell"],
    doctor: ["diagnoza", "sprawdzenie", "health"],
    init: ["kontekst", "mapowanie", "repo"],
    workflow: ["implementacja", "research", "pipeline", "agenci"],
    release: ["ship", "launch", "hydrate", "decorate", "dou"],
    licencja: ["bsl", "business", "source"],
    runtime: ["control", "plane", "artefakty"],
  },
};
function ae(r) {
  return r
    .toLowerCase()
    .split(/[^a-z0-9ąćęłńóśźż-]+/i)
    .filter((s) => s.length >= 2);
}
function rt(r, s, l, f = 6) {
  const u = l.trim();
  if (u.length < 2) return [];
  const o = ae(u),
    t = at[s],
    c = new Set(o);
  for (const m of o)
    for (const [k, w] of Object.entries(t))
      if (m.startsWith(k) || k.startsWith(m)) {
        c.add(k);
        for (const y of w) c.add(y);
      }
  const H = [...c];
  return r
    .map((m) => {
      const k = ae(m.title),
        w = ae(m.body);
      let y = 0;
      for (const j of H)
        (k.some((h) => h.startsWith(j) || j.startsWith(h)) && (y += 4),
          m.keywords.some((h) => h.startsWith(j) || j.startsWith(h)) &&
            (y += 3),
          w.some((h) => h.startsWith(j) || j.startsWith(h)) && (y += 1));
      return { ...m, score: y };
    })
    .filter((m) => m.score > 0)
    .sort((m, k) => k.score - m.score)
    .slice(0, f);
}
var st = K(
    '<li><a role="option"><span class="search-shell__result-title svelte-rfw7fy"> </span> <span class="search-shell__result-body svelte-rfw7fy"> </span></a></li>',
  ),
  lt = K(
    '<div class="search-shell__section-label svelte-rfw7fy"> </div> <ul class="search-shell__results svelte-rfw7fy" role="listbox"></ul>',
    1,
  ),
  ot = K('<a class="search-shell__fast-path svelte-rfw7fy"> </a>'),
  nt = K(
    '<p class="search-shell__hint svelte-rfw7fy"> </p> <div class="search-shell__section-label svelte-rfw7fy"> </div> <div class="search-shell__fast-paths svelte-rfw7fy"></div>',
    1,
  ),
  it = K(
    '<div id="search-shell-panel" role="region" class="search-shell__panel svelte-rfw7fy"><div class="search-shell__scopes svelte-rfw7fy" role="tablist"><button type="button" role="tab"> </button> <button type="button" role="tab"> </button> <button type="button" role="tab"> </button></div> <!></div>',
  ),
  ct = K(
    '<button class="search-shell__clear svelte-rfw7fy" type="button">×</button>',
  ),
  ft = K(
    '<span class="search-shell__shortcut svelte-rfw7fy" aria-hidden="true"> </span>',
  ),
  ut = K(
    '<div class="search-shell svelte-rfw7fy"><!> <div role="search"><span class="search-shell__icon svelte-rfw7fy" aria-hidden="true">⌕</span> <input class="search-shell__input svelte-rfw7fy" type="search" autocomplete="off" spellcheck="false" aria-controls="search-shell-panel"/> <!></div></div>',
  );
function qt(r, s) {
  Ue(s, !0);
  let l = Ze(s, "defaultSection", 3, "all");
  const f = z(() => ge(s.lang));
  let u = x(""),
    o = x(Fe(l())),
    t = x(-1),
    c = x(!1),
    H = x(!1),
    m = x(!1),
    k = x("Ctrl K"),
    w = x(null),
    y = x(null),
    j = `${s.lang}:${l()}`;
  const h = z(() => tt(s.lang, e(o))),
    qe = z(() => e(u).trim()),
    V = z(() => e(qe).length >= 2),
    g = z(() => rt(e(h).items, s.lang, e(u))),
    J = z(() => e(c) || e(V)),
    re = z(() => (Oe.current ? 0 : 180)),
    se = z(() => !e(H) && !e(m) && e(u).length === 0),
    Se = z(() => (e(k) === "⌘K" ? "Meta+K" : "Control+K"));
  (Z(() => {
    const a = `${s.lang}:${l()}`;
    a !== j && ((j = a), i(o, l()), i(u, ""), i(t, -1), i(c, !1), e(w)?.blur());
  }),
    Z(() => {
      if (!e(V) || e(g).length === 0) {
        i(t, -1);
        return;
      }
      (e(t) < 0 || e(t) >= e(g).length) && i(t, 0);
    }));
  function le(a) {
    if (e(g).length === 0) return;
    const n = e(t) >= 0 ? e(t) : 0;
    i(t, (n + a + e(g).length) % e(g).length);
  }
  function je() {
    e(t) < 0 || e(t) >= e(g).length || window.location.assign(e(g)[e(t)].href);
  }
  function oe() {
    (i(u, ""), i(t, -1), e(w)?.blur(), i(c, !1));
  }
  function xe(a) {
    if (a.key === "Escape") {
      (a.preventDefault(), oe());
      return;
    }
    e(g).length !== 0 &&
      (a.key === "ArrowDown"
        ? (a.preventDefault(), le(1))
        : a.key === "ArrowUp"
          ? (a.preventDefault(), le(-1))
          : a.key === "Enter" && e(t) >= 0 && (a.preventDefault(), je()));
  }
  function ne(a) {
    (a.metaKey || a.ctrlKey) &&
      a.key.toLowerCase() === "k" &&
      (a.preventDefault(), e(w)?.focus(), e(w)?.select());
  }
  function ie(a) {
    const n = a;
    (n.detail?.section && i(o, n.detail.section, !0), e(w)?.focus());
  }
  function ce(a) {
    e(y) && a.target instanceof Node && (e(y).contains(a.target) || i(c, !1));
  }
  (Z(() => {
    const a = window.matchMedia("(pointer: coarse)"),
      n = window.matchMedia("(max-width: 560px)"),
      v = () => {
        (i(H, a.matches, !0),
          i(m, n.matches, !0),
          i(
            k,
            /Mac|iPhone|iPad|iPod/.test(navigator.platform) ? "⌘K" : "Ctrl K",
            !0,
          ));
      };
    return (
      v(),
      a.addEventListener("change", v),
      n.addEventListener("change", v),
      () => {
        (a.removeEventListener("change", v),
          n.removeEventListener("change", v));
      }
    );
  }),
    Z(
      () => (
        window.addEventListener("keydown", ne),
        window.addEventListener("vibecrafted:search-toggle", ie),
        window.addEventListener("pointerdown", ce),
        () => {
          (window.removeEventListener("keydown", ne),
            window.removeEventListener("vibecrafted:search-toggle", ie),
            window.removeEventListener("pointerdown", ce));
        }
      ),
    ));
  var T = ut(),
    fe = p(T);
  {
    var ze = (a) => {
      var n = it(),
        v = p(n),
        C = p(v);
      let de;
      var Ke = p(C, !0);
      d(C);
      var W = q(C, 2);
      let he;
      var Me = p(W, !0);
      d(W);
      var U = q(W, 2);
      let pe;
      var Ae = p(U, !0);
      (d(U), d(v));
      var Ce = q(v, 2);
      {
        var We = (I) => {
            var Q = lt(),
              M = me(Q),
              N = p(M, !0);
            d(M);
            var A = q(M, 2);
            (ke(
              A,
              23,
              () => e(g),
              (B) => B.href,
              (B, R, G) => {
                var P = st(),
                  _ = p(P);
                let Y;
                var ee = p(_),
                  Re = p(ee, !0);
                d(ee);
                var be = q(ee, 2),
                  Pe = p(be, !0);
                (d(be),
                  d(_),
                  d(P),
                  D(() => {
                    ((Y = O(
                      _,
                      1,
                      "search-shell__result svelte-rfw7fy",
                      null,
                      Y,
                      { "search-shell__result--active": e(G) === e(t) },
                    )),
                      b(_, "href", e(R).href),
                      b(_, "aria-selected", e(G) === e(t)),
                      S(Re, e(R).title),
                      S(Pe, e(R).body));
                  }),
                  ve("mouseenter", _, () => i(t, e(G), !0)),
                  E(B, P));
              },
            ),
              d(A),
              D(() => {
                (S(N, e(h).resultsLabel),
                  b(A, "aria-label", e(h).resultsLabel));
              }),
              E(I, Q));
          },
          Ie = (I) => {
            var Q = nt(),
              M = me(Q),
              N = p(M, !0);
            d(M);
            var A = q(M, 2),
              B = p(A, !0);
            d(A);
            var R = q(A, 2);
            (ke(
              R,
              21,
              () => e(h).fallbackLinks,
              Be,
              (G, P) => {
                var _ = ot(),
                  Y = p(_, !0);
                (d(_),
                  D(() => {
                    (b(_, "href", e(P).href), S(Y, e(P).label));
                  }),
                  E(G, _));
              },
            ),
              d(R),
              D(() => {
                (S(N, e(V) ? e(h).noResultsLabel : e(h).emptyLabel),
                  S(B, e(h).fallbackLabel));
              }),
              E(I, Q));
          };
        te(Ce, (I) => {
          e(V) && e(g).length > 0 ? I(We) : I(Ie, -1);
        });
      }
      (d(n),
        D(() => {
          (b(n, "aria-label", e(f).nav.search),
            b(v, "aria-label", e(f).nav.search),
            (de = O(C, 1, "search-shell__scope svelte-rfw7fy", null, de, {
              "search-shell__scope--active": e(o) === "all",
            })),
            b(C, "aria-selected", e(o) === "all"),
            S(Ke, e(f).nav.searchAll),
            (he = O(W, 1, "search-shell__scope svelte-rfw7fy", null, he, {
              "search-shell__scope--active": e(o) === "quickstart",
            })),
            b(W, "aria-selected", e(o) === "quickstart"),
            S(Me, e(f).nav.quickstart),
            (pe = O(U, 1, "search-shell__scope svelte-rfw7fy", null, pe, {
              "search-shell__scope--active": e(o) === "faq",
            })),
            b(U, "aria-selected", e(o) === "faq"),
            S(Ae, e(f).nav.faq));
        }),
        $("click", C, () => i(o, "all")),
        $("click", W, () => i(o, "quickstart")),
        $("click", U, () => i(o, "faq")),
        we(
          1,
          n,
          () => Ge,
          () => ({ duration: e(re), y: 8 }),
        ),
        we(
          2,
          n,
          () => $e,
          () => ({ duration: e(re) }),
        ),
        E(a, n));
    };
    te(fe, (a) => {
      e(J) && a(ze);
    });
  }
  var X = q(fe, 2);
  let ue;
  var L = q(p(X), 2);
  (Ve(L),
    ye(
      L,
      (a) => i(w, a),
      () => e(w),
    ));
  var He = q(L, 2);
  {
    var De = (a) => {
        var n = ct();
        (D(() => b(n, "aria-label", e(f).nav.searchClose)),
          $("click", n, oe),
          E(a, n));
      },
      Ee = (a) => {
        var n = ft(),
          v = p(n, !0);
        (d(n), D(() => S(v, e(k))), E(a, n));
      };
    te(He, (a) => {
      e(u).length > 0 ? a(De) : e(se) && a(Ee, 1);
    });
  }
  (d(X),
    d(T),
    ye(
      T,
      (a) => i(y, a),
      () => e(y),
    ),
    D(() => {
      (b(T, "aria-label", e(f).nav.search),
        (ue = O(X, 1, "search-shell__bar svelte-rfw7fy", null, ue, {
          "search-shell__bar--expanded": e(J),
        })),
        b(L, "placeholder", e(h).placeholder),
        b(L, "aria-label", e(f).nav.search),
        b(L, "aria-keyshortcuts", e(se) ? e(Se) : void 0),
        b(L, "aria-expanded", e(J)));
    }),
    ve("focus", L, () => i(c, !0)),
    $("keydown", L, xe),
    Ye(
      L,
      () => e(u),
      (a) => i(u, a),
    ),
    E(r, T),
    Te());
}
Qe(["click", "keydown"]);
export { qt as default };
