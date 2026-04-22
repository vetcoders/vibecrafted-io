import {
  A as p,
  j as f,
  B as c,
  k as m,
  F as d,
  i as _,
  C as l,
} from "./runtime.QfC15RoP.js";
import { e as u, d as h } from "./template.DrTY0w-c.js";
import { B as g } from "./branches.BDY79d1y.js";
function w(a, t, ...n) {
  var r = new g(a);
  _(() => {
    const e = t() ?? null;
    r.ensure(e, e && ((s) => e(s, ...n)));
  }, l);
}
function A(a) {
  return (t, ...n) => {
    var r = a(...n),
      e;
    if (f) ((e = c), m());
    else {
      var s = r.render().trim(),
        i = u(s);
      ((e = d(i)), t.before(e));
    }
    const o = r.setup?.(e);
    (h(e, e), typeof o == "function" && p(o));
  };
}
export { A as c, w as s };
