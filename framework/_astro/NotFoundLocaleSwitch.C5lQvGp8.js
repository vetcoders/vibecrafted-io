import "./disclose-version.DsnmJJEf.js";
import {
  u as a,
  p as r,
  a as o,
  s,
  g as u,
  b as i,
} from "./runtime.QfC15RoP.js";
function l(f, t) {
  o(t, !0);
  let e = i("en");
  function n() {
    return typeof window > "u"
      ? "en"
      : window.location.pathname.startsWith("/pl") ||
          (navigator.language || (navigator.userLanguage ?? ""))
            .toLowerCase()
            .startsWith("pl")
        ? "pl"
        : "en";
  }
  (a(() => {
    typeof window > "u" ||
      (s(e, n(), !0), (document.documentElement.lang = u(e)));
  }),
    r());
}
export { l as default };
