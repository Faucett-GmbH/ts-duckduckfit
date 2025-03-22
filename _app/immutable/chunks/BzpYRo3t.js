const i = () => {
};
function T(r, s = 0, u = {}) {
  let l = false, n = null, e = null;
  const a = u.before || i, d = u.after || i;
  function f() {
    return n !== null ? (clearTimeout(n), n = null, true) : false;
  }
  function c() {
    f() && (e = null), l = false;
  }
  function b() {
    e !== null && (e(), e = null), c();
  }
  const t = function(...m) {
    const h = this;
    function o() {
      r.apply(h, m), d();
    }
    l || (l = true, a()), e = o, f(), n = setTimeout(o, s);
  };
  return t.cancel = c, t.flush = b, t;
}
export {
  T as d
};
