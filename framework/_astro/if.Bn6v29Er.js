import {
  i as c,
  j as o,
  k as l,
  C as b,
  W as p,
  Y as v,
  I as g,
  H as f,
  B as m,
} from "./runtime.QfC15RoP.js";
import { B as y } from "./branches.BDY79d1y.js";
function E(_, d, h = !1) {
  var n;
  o && ((n = m), l());
  var s = new y(_),
    u = h ? b : 0;
  function t(a, r) {
    if (o) {
      var e = p(n);
      if (a !== parseInt(e.substring(1))) {
        var i = v();
        (g(i), (s.anchor = i), f(!1), s.ensure(a, r), f(!0));
        return;
      }
    }
    s.ensure(a, r);
  }
  c(() => {
    var a = !1;
    (d((r, e = 0) => {
      ((a = !0), t(e, r));
    }),
      a || t(-1, null));
  }, u);
}
export { E as i };
