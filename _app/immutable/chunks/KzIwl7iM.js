const c = "en", l = ["en"], i = ["baseLocale", "preferredLanguage"];
globalThis.__paraglide = {};
let n = false, f = () => {
  let e;
  for (const a of i) if (a === "baseLocale" ? e = c : a === "preferredLanguage" && (e = g()), e !== void 0) {
    const o = L(e);
    return n || (n = true, u(o, { reload: false })), o;
  }
  throw new Error("No locale found. Read the docs https://inlang.com/m/gerre34r/library-inlang-paraglideJs/errors#no-locale-found");
};
function g() {
  var _a;
  if (!((_a = navigator == null ? void 0 : navigator.languages) == null ? void 0 : _a.length)) return;
  const e = navigator.languages.map((a) => {
    var _a2;
    return { fullTag: a.toLowerCase(), baseTag: (_a2 = a.split("-")[0]) == null ? void 0 : _a2.toLowerCase() };
  });
  for (const a of e) {
    if (t(a.fullTag)) return a.fullTag;
    if (t(a.baseTag)) return a.baseTag;
  }
}
let u = (e, a) => {
  const o = { reload: true, ...a };
  let r;
  try {
    r = f();
  } catch {
  }
  for (const s of i) ;
  o.reload && window.location && e !== r && window.location.reload();
}, d = () => typeof window < "u" ? window.location.origin : "http://fallback.com";
function t(e) {
  return e ? l.includes(e) : false;
}
function L(e) {
  if (t(e) === false) throw new Error(`Invalid locale: ${e}. Expected one of: ${l.join(", ")}`);
  return e;
}
function p(e) {
  return w(e);
}
function w(e) {
  const a = typeof e == "string" ? new URL(e, d()) : new URL(e), o = a.pathname.split("/").filter(Boolean);
  return o.length > 0 && t(o[0]) && (a.pathname = "/" + o.slice(1).join("/")), a;
}
export {
  p as d,
  f as g
};
