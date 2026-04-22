import {
  an as h,
  K as o,
  m as x,
  x as S,
  J as T,
  aF as b,
  aG as l,
} from "./runtime.QfC15RoP.js";
function i(a, f) {
  return a === f || a?.[l] === f;
}
function E(a = {}, f, s, c) {
  var d = h.r,
    w = T;
  return (
    o(() => {
      var n, r;
      return (
        x(() => {
          ((n = r),
            (r = c?.() || []),
            S(() => {
              a !== s(...r) &&
                (f(a, ...r), n && i(s(...n), a) && f(null, ...n));
            }));
        }),
        () => {
          let t = w;
          for (; t !== d && t.parent !== null && t.parent.f & b; ) t = t.parent;
          const p = () => {
              r && i(s(...r), a) && f(null, ...r);
            },
            u = t.teardown;
          t.teardown = () => {
            (p(), u?.());
          };
        }
      );
    }),
    a
  );
}
export { E as b };
