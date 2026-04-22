import "./disclose-version.DsnmJJEf.js";
import {
  f as N,
  p as O,
  a as P,
  s as K,
  g as e,
  e as d,
  d as n,
  c as s,
  r as t,
  t as B,
  b as Q,
} from "./runtime.QfC15RoP.js";
import { d as R, s as i, a as S } from "./render.CqgMSlkN.js";
import { a as h, f as $ } from "./template.DrTY0w-c.js";
import { e as E, i as I } from "./each.Bl5LU2PA.js";
import { s as U, a as V } from "./attributes.CKni9qMX.js";
import { K as W } from "./KnowledgeDialog.EUNTglT3.js";
import { g as X } from "./index.CFQc2B1F.js";
var Y = $('<li class="svelte-1m4ndgd"> </li>'),
  Z = $(
    '<button type="button"><div class="evidence-item__flip svelte-1m4ndgd"><div class="evidence-item__face evidence-item__face--front svelte-1m4ndgd"><span class="evidence-num svelte-1m4ndgd"> </span> <h3 class="svelte-1m4ndgd"> </h3> <p class="svelte-1m4ndgd"> </p></div> <div class="evidence-item__face evidence-item__face--back svelte-1m4ndgd" aria-hidden="true"><span class="evidence-num svelte-1m4ndgd"> </span> <div class="evidence-item__kicker svelte-1m4ndgd"> </div> <ul class="svelte-1m4ndgd"></ul> <span class="evidence-item__reveal svelte-1m4ndgd"> </span></div></div></button>',
  ),
  ee = $('<div class="evidence-grid svelte-1m4ndgd"></div> <!>', 1);
function ve(T, L) {
  P(L, !0);
  const v = d(() => X(L.lang).sections.evidence);
  let r = Q(null);
  var k = ee(),
    u = N(k);
  (E(
    u,
    21,
    () => e(v).items,
    I,
    (_, a) => {
      var l = Z(),
        m = s(l),
        c = s(m),
        o = s(c),
        q = s(o, !0);
      t(o);
      var g = n(o, 2),
        z = s(g, !0);
      t(g);
      var y = n(g, 2),
        A = s(y, !0);
      (t(y), t(c));
      var w = n(c, 2),
        p = s(w),
        C = s(p, !0);
      t(p);
      var b = n(p, 2),
        F = s(b, !0);
      t(b);
      var f = n(b, 2);
      (E(
        f,
        21,
        () => e(a).details.slice(0, 2),
        I,
        (H, J) => {
          var x = Y(),
            M = s(x, !0);
          (t(x), B(() => i(M, e(J))), h(H, x));
        },
      ),
        t(f));
      var D = n(f, 2),
        G = s(D, !0);
      (t(D),
        t(w),
        t(m),
        t(l),
        B(() => {
          (U(
            l,
            1,
            `evidence-item evidence-item--${e(a).accent ?? "steel"}`,
            "svelte-1m4ndgd",
          ),
            V(l, "aria-label", `${e(a).number} ${e(a).title}`),
            i(q, e(a).number),
            i(z, e(a).title),
            i(A, e(a).body),
            i(C, e(a).number),
            i(F, e(v).detailsLabel),
            i(G, e(v).revealLabel));
        }),
        S("click", l, () => K(r, e(a), !0)),
        h(_, l));
    },
  ),
    t(u));
  var j = n(u, 2);
  {
    let _ = d(() => !!e(r)),
      a = d(() => e(r)?.accent ?? "steel"),
      l = d(() => (e(r) ? `${e(r).number} · ${e(v).detailsLabel}` : "")),
      m = d(() => e(r)?.title ?? ""),
      c = d(() => e(r)?.body ?? ""),
      o = d(() => e(r)?.details ?? []);
    W(j, {
      get open() {
        return e(_);
      },
      get accent() {
        return e(a);
      },
      get eyebrow() {
        return e(l);
      },
      get title() {
        return e(m);
      },
      get summary() {
        return e(c);
      },
      get bullets() {
        return e(o);
      },
      get detailsLabel() {
        return e(v).detailsLabel;
      },
      get closeLabel() {
        return e(v).closeLabel;
      },
      onclose: () => K(r, null),
    });
  }
  (h(T, k), O());
}
R(["click"]);
export { ve as default };
