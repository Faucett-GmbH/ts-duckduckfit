var _a;
import { C as u, a8 as p, x as l, a9 as h, aa as g, ab as v, h as f, g as s, O as E, B as T } from "./DvcnV1Iy.js";
function m(r) {
  var t = document.createElement("template");
  return t.innerHTML = r, t.content;
}
function a(r, t) {
  var e = v;
  e.nodes_start === null && (e.nodes_start = r, e.nodes_end = t);
}
function y(r, t) {
  var e = (t & h) !== 0, _ = (t & g) !== 0, n, d = !r.startsWith("<!>");
  return () => {
    if (f) return a(s, null), s;
    n === void 0 && (n = m(d ? r : "<!>" + r), e || (n = u(n)));
    var o = _ || p ? document.importNode(n, true) : n.cloneNode(true);
    if (e) {
      var c = u(o), i = o.lastChild;
      a(c, i);
    } else a(o, o);
    return o;
  };
}
function N(r, t, e = "svg") {
  var _ = !r.startsWith("<!>"), n = `<${e}>${_ ? r : "<!>" + r}</${e}>`, d;
  return () => {
    if (f) return a(s, null), s;
    if (!d) {
      var o = m(n), c = u(o);
      d = u(c);
    }
    var i = d.cloneNode(true);
    return a(i, i), i;
  };
}
function M(r = "") {
  if (!f) {
    var t = l(r + "");
    return a(t, t), t;
  }
  var e = s;
  return e.nodeType !== 3 && (e.before(e = l()), T(e)), a(e, e), e;
}
function b() {
  if (f) return a(s, null), s;
  var r = document.createDocumentFragment(), t = document.createComment(""), e = l();
  return r.append(t, e), a(t, e), r;
}
function C(r, t) {
  if (f) {
    v.nodes_end = s, E();
    return;
  }
  r !== null && r.before(t);
}
const w = "5";
typeof window < "u" && ((_a = window.__svelte ?? (window.__svelte = {})).v ?? (_a.v = /* @__PURE__ */ new Set())).add(w);
export {
  C as a,
  a as b,
  b as c,
  M as d,
  N as n,
  y as t
};
