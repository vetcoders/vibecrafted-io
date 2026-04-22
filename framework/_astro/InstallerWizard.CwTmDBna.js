import "./disclose-version.DsnmJJEf.js";
import {
  b as at,
  h as pe,
  g as t,
  u as fe,
  t as _,
  p as ue,
  a as _e,
  d as n,
  s as X,
  e as F,
  $ as we,
  c as a,
  r as e,
  n as me,
  f as Ht,
} from "./runtime.QfC15RoP.js";
import { d as he, e as ze, a as N, s as l } from "./render.CqgMSlkN.js";
import { a as c, f as y, b as be } from "./template.DrTY0w-c.js";
import { i as st } from "./if.Bn6v29Er.js";
import { e as M, i as B } from "./each.Bl5LU2PA.js";
import { s as yt, a as $, b as pt } from "./attributes.CKni9qMX.js";
import { p as Pt } from "./props.DDrYma4F.js";
import { p as $t } from "./index.CDVM_SEU.js";
import { T as It, C as ge } from "./CopyButton.i_C0tMbM.js";
import { g as xe } from "./index.CFQc2B1F.js";
const ke = "⚒ Vibecrafted.",
  Ce = [
    {
      key: "diagnostics",
      label: "Diagnostics",
      reason: `We will check your environment for:
  - Any existing framework installation
    foundations · workflows · helpers · binaries
  - Toolchains
    node · python · rust
  - Agents
    claude-code · codex · gemini-cli
  - Additional tools
    zellji · mise · starship · atuin · zoxide
`,
      cmd: ["python3", "scripts/vetcoders_install.py", "list", "--source", "."],
      optional: !0,
    },
    {
      key: "installation",
      label: "Installation",
      reason: `We will install:
  - Missing dependencies
  - Workflows (9 basic, 7 advanced)
  - Helpers and binaries (executables and functions)
`,
      cmd: ["bash", "scripts/install-foundations.sh"],
    },
    {
      key: "post-install",
      label: "Post-installation setup",
      reason: `We will configure:
  - Workspace directories (in $VIBECRAFTED_ROOT/.vibecrafted/)
  - Symlinks for AI coding agents (in $HOME/.agents/)
`,
      cmd: [
        "bash",
        "-c",
        `bash skills/vc-agents/scripts/install-frontier-config.sh --source "." || printf '[warn] Frontier config skipped (non-fatal)\\n'
python3 scripts/vetcoders_install.py install --source "." --with-shell --compact --non-interactive
`,
      ],
    },
    {
      key: "verification",
      label: "Verification and quick tour",
      reason:
        "We will run `vibecrafted doctor` and surface the quick tour of\nthe framework's most useful commands.\n",
      cmd: ["python3", "scripts/vetcoders_install.py", "doctor"],
      optional: !0,
    },
  ],
  qe = {
    categories: [
      "frameworks",
      "foundations",
      "toolchains",
      "agents",
      "additional_tools",
    ],
    labels: {
      frameworks: "Frameworks",
      foundations: "Foundations",
      toolchains: "Toolchains",
      agents: "Agents",
      additional_tools: "Additional tools",
    },
    commands: {
      foundations: ["loctree-mcp", "aicx-mcp", "prview", "screenscribe"],
      toolchains: ["python3", "node", "git", "rsync"],
      agents: ["claude", "codex", "gemini"],
      additional_tools: ["mise", "starship", "atuin", "zoxide"],
    },
    paths: {
      store_dir: "$VIBECRAFTED_ROOT/.vibecrafted/skills",
      helpers: "$XDG_CONFIG_HOME/vetcoders/vc-skills.sh",
      binaries: ["vibecraft", "vibecrafted"],
      symlinks: [
        "$HOME/.agents",
        "$HOME/.claude",
        "$HOME/.codex",
        "$HOME/.gemini",
      ],
    },
  },
  Te = { title: ke, phases: Ce, diagnostics: qe };
var Ae = be(
    '<svg viewBox="0 0 12 12" width="10" height="10" class="svelte-yf1ytr"><polyline points="2,6 5,9 10,3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="svelte-yf1ytr"></polyline></svg>',
  ),
  Se = y(
    '<button><span class="wz-pip svelte-yf1ytr"><!></span> <span class="wz-dot-label svelte-yf1ytr"> </span></button>',
  ),
  Le = y('<p class="wz-body svelte-yf1ytr"> </p>'),
  Ee = y(
    '<div class="wz-welcome-note svelte-yf1ytr"><span class="wz-welcome-note-label svelte-yf1ytr"> </span> <p class="wz-welcome-note-value svelte-yf1ytr"> </p></div>',
  ),
  Me = y('<div class="wz-term-line svelte-yf1ytr"> </div>'),
  Be = y('<span class="wz-cursor svelte-yf1ytr">_</span>'),
  Oe = y(
    '<div class="wz-welcome-split svelte-yf1ytr"><div class="wz-welcome-main svelte-yf1ytr"><h2 class="wz-title svelte-yf1ytr"> </h2> <!> <div class="wz-welcome-notes svelte-yf1ytr"></div> <button class="wz-cta svelte-yf1ytr"> <span class="wz-cta-arrow svelte-yf1ytr">&rarr;</span></button></div> <div class="wz-terminal-shell wz-terminal-shell--hero svelte-yf1ytr"><div class="wz-terminal-meta svelte-yf1ytr"><span class="wz-terminal-kicker svelte-yf1ytr"> </span> <p class="wz-terminal-copy svelte-yf1ytr"> </p></div> <div class="wz-terminal svelte-yf1ytr"><!> <!></div></div></div>',
  ),
  Re = y(
    '<div class="wz-card svelte-yf1ytr"><span class="wz-card-icon svelte-yf1ytr"> </span> <div class="svelte-yf1ytr"><strong class="wz-card-name svelte-yf1ytr"> </strong> <p class="wz-card-desc svelte-yf1ytr"> </p></div></div>',
  ),
  Fe = y(
    '<h2 class="wz-title svelte-yf1ytr"> </h2> <div class="wz-grid svelte-yf1ytr"></div>',
    1,
  ),
  He = y('<p class="wz-body svelte-yf1ytr"> </p>'),
  Pe = y(
    '<div class="wz-check svelte-yf1ytr"><span> </span> <span class="wz-check-label svelte-yf1ytr"> </span> <span> </span></div>',
  ),
  $e = y(
    '<h2 class="wz-title svelte-yf1ytr"> </h2> <!> <div class="wz-stan-summary svelte-yf1ytr" role="status"><span class="wz-stan-chip wz-stan-chip--req svelte-yf1ytr"><span class="wz-stan-chip-dot svelte-yf1ytr" aria-hidden="true"></span> <span class="wz-stan-chip-count svelte-yf1ytr"> </span> <span class="wz-stan-chip-label svelte-yf1ytr"> </span></span> <span class="wz-stan-chip-sep svelte-yf1ytr" aria-hidden="true">·</span> <span class="wz-stan-chip wz-stan-chip--opt svelte-yf1ytr"><span class="wz-stan-chip-dot svelte-yf1ytr" aria-hidden="true"></span> <span class="wz-stan-chip-count svelte-yf1ytr"> </span> <span class="wz-stan-chip-label svelte-yf1ytr"> </span></span></div> <div class="wz-checks svelte-yf1ytr"></div>',
    1,
  ),
  Ie = y('<p class="wz-body svelte-yf1ytr"> </p>'),
  We = y('<div class="wz-term-line svelte-yf1ytr"> </div>'),
  Ve = y('<span class="wz-cursor svelte-yf1ytr">_</span>'),
  Ke = y(
    '<div class="wz-install svelte-yf1ytr"><div class="wz-install-lead svelte-yf1ytr"><h2 class="wz-title svelte-yf1ytr"> </h2> <!></div> <div class="wz-install-hero svelte-yf1ytr"><div class="wz-install-hero-meta svelte-yf1ytr"><span class="wz-install-hero-step svelte-yf1ytr"> </span> <span class="wz-install-hero-hint svelte-yf1ytr"> </span></div> <div class="wz-cmd-block wz-cmd-block--primary svelte-yf1ytr"><div class="wz-cmd-bar svelte-yf1ytr"><span class="wz-cmd-prompt svelte-yf1ytr">$</span> <code class="wz-cmd-text svelte-yf1ytr"></code> <!></div></div> <div class="wz-install-run svelte-yf1ytr"><span class="wz-install-run-kicker svelte-yf1ytr"> </span> <p class="wz-install-run-body svelte-yf1ytr"> </p></div></div> <div class="wz-install-preview svelte-yf1ytr"><div class="wz-install-preview-meta svelte-yf1ytr"><span class="wz-install-preview-kicker svelte-yf1ytr"> </span> <span class="wz-install-preview-body svelte-yf1ytr"> </span></div> <div class="wz-terminal wz-terminal--demo svelte-yf1ytr"><!> <!></div></div></div>',
  ),
  De = y('<p class="wz-body svelte-yf1ytr"> </p>'),
  Xe = y(
    '<div class="wz-next-cmd svelte-yf1ytr"><span class="wz-next-cmd-index svelte-yf1ytr" aria-hidden="true"> </span> <code class="wz-next-cmd-code svelte-yf1ytr"> </code> <span class="wz-next-cmd-desc svelte-yf1ytr"> </span></div>',
  ),
  Ne = y(
    '<div class="wz-done svelte-yf1ytr"><div class="wz-done-stamp svelte-yf1ytr" role="status"><span class="wz-done-stamp-mark svelte-yf1ytr" aria-hidden="true"></span> <span class="wz-done-stamp-text svelte-yf1ytr"> </span></div> <h2 class="wz-title wz-title--done svelte-yf1ytr"> </h2> <!> <div class="wz-next-cmds svelte-yf1ytr"></div></div>',
  ),
  Ye = y(
    '<button class="wz-btn wz-btn-next wz-btn-finish svelte-yf1ytr"> </button>',
  ),
  je = y('<button class="wz-btn wz-btn-next svelte-yf1ytr">&rarr;</button>'),
  Ge = y('<a class="wz-btn wz-btn-next wz-btn-done svelte-yf1ytr"> </a>'),
  Je = y(
    '<div class="wizard svelte-yf1ytr" role="region"><nav class="wz-progress svelte-yf1ytr"><div class="wz-track svelte-yf1ytr"><div class="wz-track-fill svelte-yf1ytr"></div></div> <div class="wz-dots svelte-yf1ytr"></div></nav>  <div class="wz-stage svelte-yf1ytr"><div><!></div></div> <p class="wz-hint svelte-yf1ytr"> </p> <nav class="wz-nav svelte-yf1ytr"><button class="wz-btn wz-btn-back svelte-yf1ytr">&larr;</button> <span class="wz-counter svelte-yf1ytr"> <span class="wz-counter-sep svelte-yf1ytr">/</span> </span> <!></nav></div>',
  );
function oa(Wt, ft) {
  _e(ft, !0);
  let xt = Pt(ft, "lang", 3, "en"),
    kt = Pt(ft, "manifest", 3, Te);
  const Ct = F(() => xe(xt())),
    C = F(() => t(Ct).sections.installer.wizard),
    Y = F(() => t(Ct).copyButton),
    S = F(() => t(C).steps.labels),
    Vt = F(() => t(C).welcomeNotes),
    rt = F(() => t(C).terminal),
    Q = 5;
  let o = at(0),
    j = at("forward"),
    I = at(!0),
    W = at(pe([])),
    nt = at(!1);
  const Kt = "curl -fsSL https://vibecrafted.io/install.sh | bash",
    Dt = ["toolchains", "agents"],
    Xt = ["loctree-mcp", "aicx-mcp"],
    ut = (() => {
      const s = [],
        r = kt().diagnostics;
      if (r && r.categories) {
        for (const i of r.categories)
          if (r.commands && r.commands[i]) {
            const v = Dt.includes(i);
            for (const h of r.commands[i])
              s.push({ label: h, required: v || Xt.includes(h) });
          }
      }
      return s;
    })(),
    qt = ut.filter((s) => s.required).length,
    Nt = ut.length - qt,
    Tt = ["◈", "⇋", "⌘", "↳"],
    Yt = (kt().phases || []).map((s, r) => ({
      icon: Tt[r % Tt.length],
      name: s.label,
      desc:
        s.reason.split(`
`)[0] || s.reason,
    })),
    E = F(() => t(C).pages),
    At = F(() => t(E)[t(o)]),
    jt = It.of(() => (t(o) / (Q - 1)) * 100, {
      duration: $t.current ? 0 : 280,
    }),
    Gt = It.of(() => t(o) + 1, { duration: $t.current ? 0 : 220 });
  function lt(s) {
    s === t(o) ||
      !t(I) ||
      (X(j, s > t(o) ? "forward" : "backward", !0),
      X(I, !1),
      setTimeout(() => {
        (X(o, s, !0), X(I, !0), s === 3 && !t(nt) && St());
      }, 180));
  }
  function U() {
    t(o) < Q - 1 && lt(t(o) + 1);
  }
  function _t() {
    t(o) > 0 && lt(t(o) - 1);
  }
  function St() {
    if (t(nt)) return;
    (X(nt, !0), X(W, [], !0));
    const s = t(rt);
    let r = 0;
    const i = () => {
      r < s.length &&
        (X(W, [...t(W), s[r]], !0),
        r++,
        setTimeout(i, 100 + Math.random() * 150));
    };
    i();
  }
  fe(() => {
    t(nt) || St();
  });
  function Jt(s) {
    s.key === "ArrowRight" || s.key === "Enter"
      ? U()
      : s.key === "ArrowLeft" || s.key === "Backspace"
        ? _t()
        : s.key === "Escape" && t(o) > 0 && lt(0);
  }
  let Lt = 0,
    Et = 0;
  function Qt(s) {
    ((Lt = s.touches[0].clientX), (Et = s.touches[0].clientY));
  }
  function Ut(s) {
    const r = s.changedTouches[0].clientX - Lt,
      i = s.changedTouches[0].clientY - Et;
    Math.abs(r) > 50 && Math.abs(r) > Math.abs(i) * 1.5 && (r < 0 ? U() : _t());
  }
  const Zt = F(() => t(rt).slice(0, 8)),
    Mt = F(() => (t(W).length > 0 ? t(W) : t(Zt)));
  var it = Je();
  ze("keydown", we, Jt);
  var ot = a(it),
    wt = a(ot),
    te = a(wt);
  e(wt);
  var Bt = n(wt, 2);
  (M(
    Bt,
    21,
    () => t(E),
    B,
    (s, r, i) => {
      var v = Se();
      let h;
      var g = a(v),
        p = a(g);
      {
        var q = (w) => {
          var x = Ae();
          c(w, x);
        };
        st(p, (w) => {
          i < t(o) && w(q);
        });
      }
      e(g);
      var f = n(g, 2),
        T = a(f, !0);
      (e(f),
        e(v),
        _(() => {
          ((h = yt(v, 1, "wz-dot svelte-yf1ytr", null, h, {
            active: i === t(o),
            done: i < t(o),
          })),
            $(
              v,
              "aria-label",
              `${t(r).label} — ${t(S).stepAria} ${i + 1} ${t(S).ofAria} ${Q}`,
            ),
            $(v, "aria-current", i === t(o) ? "step" : void 0),
            l(T, t(r).label));
        }),
        N("click", v, () => lt(i)),
        c(s, v));
    },
  ),
    e(Bt),
    e(ot));
  var Z = n(ot, 2),
    mt = a(Z);
  let Ot;
  var ee = a(mt);
  {
    var ae = (s) => {
        var r = Oe(),
          i = a(r),
          v = a(i),
          h = a(v, !0);
        e(v);
        var g = n(v, 2);
        M(
          g,
          17,
          () => t(E)[0].body,
          B,
          (z, d) => {
            var u = Le(),
              b = a(u, !0);
            (e(u), _(() => l(b, t(d))), c(z, u));
          },
        );
        var p = n(g, 2);
        (M(
          p,
          21,
          () => t(Vt),
          B,
          (z, d) => {
            var u = Ee(),
              b = a(u),
              R = a(b, !0);
            e(b);
            var V = n(b, 2),
              G = a(V, !0);
            (e(V),
              e(u),
              _(() => {
                (l(R, t(d).label), l(G, t(d).value));
              }),
              c(z, u));
          },
        ),
          e(p));
        var q = n(p, 2),
          f = a(q);
        (me(), e(q), e(i));
        var T = n(i, 2),
          w = a(T),
          x = a(w),
          m = a(x, !0);
        e(x);
        var k = n(x, 2),
          A = a(k, !0);
        (e(k), e(w));
        var O = n(w, 2),
          L = a(O);
        M(
          L,
          17,
          () => t(Mt),
          B,
          (z, d) => {
            var u = Me(),
              b = a(u, !0);
            (e(u), _(() => l(b, t(d))), c(z, u));
          },
        );
        var H = n(L, 2);
        {
          var P = (z) => {
            var d = Be();
            c(z, d);
          };
          st(H, (z) => {
            t(W).length < t(rt).length && z(P);
          });
        }
        (e(O),
          e(T),
          e(r),
          _(() => {
            (l(h, t(E)[0].title),
              l(f, `${t(C).welcomeCta ?? ""} `),
              l(m, t(C).terminalKicker),
              l(A, t(C).terminalBody));
          }),
          N("click", q, U),
          c(s, r));
      },
      se = (s) => {
        var r = Fe(),
          i = Ht(r),
          v = a(i, !0);
        e(i);
        var h = n(i, 2);
        (M(
          h,
          21,
          () => Yt,
          B,
          (g, p, q) => {
            var f = Re();
            pt(f, `animation-delay: ${q * 60}ms`);
            var T = a(f),
              w = a(T, !0);
            e(T);
            var x = n(T, 2),
              m = a(x),
              k = a(m, !0);
            e(m);
            var A = n(m, 2),
              O = a(A, !0);
            (e(A),
              e(x),
              e(f),
              _(() => {
                (l(w, t(p).icon), l(k, t(p).name), l(O, t(p).desc));
              }),
              c(g, f));
          },
        ),
          e(h),
          _(() => l(v, t(E)[1].title)),
          c(s, r));
      },
      re = (s) => {
        var r = $e(),
          i = Ht(r),
          v = a(i, !0);
        e(i);
        var h = n(i, 2);
        M(
          h,
          17,
          () => t(E)[2].body,
          B,
          (z, d) => {
            var u = He(),
              b = a(u, !0);
            (e(u), _(() => l(b, t(d))), c(z, u));
          },
        );
        var g = n(h, 2),
          p = a(g),
          q = a(p);
        q.textContent = "●";
        var f = n(q, 2),
          T = a(f, !0);
        e(f);
        var w = n(f, 2),
          x = a(w, !0);
        (e(w), e(p));
        var m = n(p, 4),
          k = a(m);
        k.textContent = "○";
        var A = n(k, 2),
          O = a(A, !0);
        e(A);
        var L = n(A, 2),
          H = a(L, !0);
        (e(L), e(m), e(g));
        var P = n(g, 2);
        (M(
          P,
          21,
          () => ut,
          B,
          (z, d, u) => {
            var b = Pe();
            pt(b, `animation-delay: ${u * 40}ms`);
            var R = a(b);
            let V;
            var G = a(R, !0);
            e(R);
            var tt = n(R, 2),
              ct = a(tt, !0);
            e(tt);
            var J = n(tt, 2);
            let dt;
            var bt = a(J, !0);
            (e(J),
              e(b),
              _(() => {
                ((V = yt(R, 1, "wz-badge svelte-yf1ytr", null, V, {
                  req: t(d).required,
                  opt: !t(d).required,
                })),
                  l(G, t(d).required ? "●" : "○"),
                  l(ct, t(d).label),
                  (dt = yt(J, 1, "wz-tag svelte-yf1ytr", null, dt, {
                    req: t(d).required,
                    opt: !t(d).required,
                  })),
                  l(bt, t(d).required ? t(S).required : t(S).optional));
              }),
              c(z, b));
          },
        ),
          e(P),
          _(() => {
            (l(v, t(E)[2].title),
              $(g, "aria-label", t(C).checkSummaryAria),
              l(T, qt),
              l(x, t(S).required),
              l(O, Nt),
              l(H, t(S).optional));
          }),
          c(s, r));
      },
      ne = (s) => {
        var r = Ke(),
          i = a(r),
          v = a(i),
          h = a(v, !0);
        e(v);
        var g = n(v, 2);
        (M(
          g,
          17,
          () => t(E)[3].body,
          B,
          (K, et) => {
            var D = Ie(),
              gt = a(D, !0);
            (e(D), _(() => l(gt, t(et))), c(K, D));
          },
        ),
          e(i));
        var p = n(i, 2),
          q = a(p),
          f = a(q),
          T = a(f, !0);
        e(f);
        var w = n(f, 2),
          x = a(w, !0);
        (e(w), e(q));
        var m = n(q, 2),
          k = a(m),
          A = n(a(k), 2);
        A.textContent = "curl -fsSL https://vibecrafted.io/install.sh | bash";
        var O = n(A, 2);
        (ge(O, {
          class: "wz-cmd-copy",
          textToCopy: Kt,
          get defaultLabel() {
            return t(Y).default;
          },
          get copiedLabel() {
            return t(Y).copied;
          },
          get errorLabel() {
            return t(Y).error;
          },
          get defaultAriaLabel() {
            return t(Y).defaultAria;
          },
          get copiedAriaLabel() {
            return t(Y).copiedAria;
          },
          get errorAriaLabel() {
            return t(Y).errorAria;
          },
        }),
          e(k),
          e(m));
        var L = n(m, 2),
          H = a(L),
          P = a(H, !0);
        e(H);
        var z = n(H, 2),
          d = a(z, !0);
        (e(z), e(L), e(p));
        var u = n(p, 2),
          b = a(u),
          R = a(b),
          V = a(R, !0);
        e(R);
        var G = n(R, 2),
          tt = a(G, !0);
        (e(G), e(b));
        var ct = n(b, 2),
          J = a(ct);
        M(
          J,
          17,
          () => t(Mt),
          B,
          (K, et) => {
            var D = We(),
              gt = a(D, !0);
            (e(D), _(() => l(gt, t(et))), c(K, D));
          },
        );
        var dt = n(J, 2);
        {
          var bt = (K) => {
            var et = Ve();
            c(K, et);
          };
          st(dt, (K) => {
            t(W).length < t(rt).length && K(bt);
          });
        }
        (e(ct),
          e(u),
          e(r),
          _(() => {
            (l(h, t(E)[3].title),
              l(T, t(C).installPasteKicker),
              l(x, t(C).installPasteHint),
              l(P, t(C).installRunKicker),
              l(d, t(C).installRunHint),
              l(V, t(C).installPreviewKicker),
              l(tt, t(C).installPreviewBody));
          }),
          c(s, r));
      },
      le = (s) => {
        var r = Ne(),
          i = a(r),
          v = a(i);
        v.textContent = "◆";
        var h = n(v, 2),
          g = a(h, !0);
        (e(h), e(i));
        var p = n(i, 2),
          q = a(p, !0);
        e(p);
        var f = n(p, 2);
        M(
          f,
          17,
          () => t(E)[4].body,
          B,
          (w, x) => {
            var m = De(),
              k = a(m, !0);
            (e(m), _(() => l(k, t(x))), c(w, m));
          },
        );
        var T = n(f, 2);
        (M(
          T,
          21,
          () => t(C).nextCommands,
          B,
          (w, x, m) => {
            var k = Xe();
            pt(k, `animation-delay: ${m * 80}ms`);
            var A = a(k),
              O = a(A, !0);
            e(A);
            var L = n(A, 2),
              H = a(L, !0);
            e(L);
            var P = n(L, 2),
              z = a(P, !0);
            (e(P),
              e(k),
              _(
                (d) => {
                  (l(O, d), l(H, t(x).cmd), l(z, t(x).desc));
                },
                [() => String(m + 1).padStart(2, "0")],
              ),
              c(w, k));
          },
        ),
          e(T),
          e(r),
          _(() => {
            (l(g, t(C).doneStamp), l(q, t(E)[4].title));
          }),
          c(s, r));
      };
    st(ee, (s) => {
      t(o) === 0
        ? s(ae)
        : t(o) === 1
          ? s(se, 1)
          : t(o) === 2
            ? s(re, 2)
            : t(o) === 3
              ? s(ne, 3)
              : t(o) === 4 && s(le, 4);
    });
  }
  (e(mt), e(Z));
  var ht = n(Z, 2),
    ie = a(ht, !0);
  e(ht);
  var Rt = n(ht, 2),
    vt = a(Rt),
    zt = n(vt, 2),
    Ft = a(zt, !0),
    oe = n(Ft, 2, !0);
  ((oe.nodeValue = "5"), e(zt));
  var ve = n(zt, 2);
  {
    var ce = (s) => {
        var r = Ye(),
          i = a(r);
        (e(r),
          _(() => {
            ($(r, "aria-label", t(S).toFinish),
              l(i, `${t(S).toFinish ?? ""} →`));
          }),
          N("click", r, U),
          c(s, r));
      },
      de = (s) => {
        var r = je();
        (_(() => $(r, "aria-label", t(S).next)), N("click", r, U), c(s, r));
      },
      ye = (s) => {
        var r = Ge(),
          i = a(r);
        (e(r),
          _(() => {
            ($(r, "href", `/${xt()}/quickstart/`),
              l(i, `${t(S).quickStart ?? ""} →`));
          }),
          c(s, r));
      };
    st(ve, (s) => {
      t(o) === Q - 2 ? s(ce) : t(o) < Q - 1 ? s(de, 1) : s(ye, -1);
    });
  }
  (e(Rt),
    e(it),
    _(
      (s) => {
        ($(it, "aria-label", t(At)?.label),
          $(ot, "aria-label", t(S).steps),
          pt(te, `width: ${jt.current}%`),
          (Ot = yt(mt, 1, "wz-slide svelte-yf1ytr", null, Ot, {
            "slide-in-right": t(I) && t(j) === "forward",
            "slide-in-left": t(I) && t(j) === "backward",
            "slide-out-left": !t(I) && t(j) === "forward",
            "slide-out-right": !t(I) && t(j) === "backward",
            "slide-initial": t(I) && t(o) === 0 && t(j) === "forward",
          })),
          l(ie, t(At)?.hint),
          (vt.disabled = t(o) === 0),
          $(vt, "aria-label", t(S).previous),
          l(Ft, s));
      },
      [() => Math.round(Gt.current)],
    ),
    N("touchstart", Z, Qt),
    N("touchend", Z, Ut),
    N("click", vt, _t),
    c(Wt, it),
    ue());
}
he(["click", "touchstart", "touchend"]);
export { oa as default };
