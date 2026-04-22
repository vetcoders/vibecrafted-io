import {
  t as y,
  j as d,
  I as v,
  F as i,
  k as m,
  J as A,
  ao as N,
  B as M,
  Z as T,
  am as w,
  ap as C,
  aq as g,
  D as H,
  N as O,
  ar as R,
} from "./runtime.QfC15RoP.js";
import { d as _ } from "./template.DrTY0w-c.js";
function S(h, p, u = !1, f = !1, t = !1, b = !1) {
  var n = h,
    e = "";
  if (u) {
    var l = h;
    d && (n = v(i(l)));
  }
  y(() => {
    var r = A;
    if (e === (e = p() ?? "")) {
      d && m();
      return;
    }
    if (u && !d) {
      ((r.nodes = null), (l.innerHTML = e), e !== "" && _(i(l), l.lastChild));
      return;
    }
    if (
      (r.nodes !== null && (N(r.nodes.start, r.nodes.end), (r.nodes = null)),
      e !== "")
    ) {
      if (d) {
        M.data;
        for (
          var a = m(), c = a;
          a !== null && (a.nodeType !== T || a.data !== "");
        )
          ((c = a), (a = w(a)));
        if (a === null) throw (C(), g);
        (_(M, c), (n = v(a)));
        return;
      }
      var E = f ? O : t ? R : void 0,
        o = H(f ? "svg" : t ? "math" : "template", E);
      o.innerHTML = e;
      var s = f || t ? o : o.content;
      if ((_(i(s), s.lastChild), f || t)) for (; i(s); ) n.before(i(s));
      else n.before(s);
    }
  });
}
export { S as h };
