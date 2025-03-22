import { b as j, h as O, X as z, E as G, x as H, Y as $, Z as x, A as V, z as D, _ as L, d as N, a0 as Y, U as X, g as J, I as w, a1 as Q, a2 as W, o as q, i as y, a3 as F, m as d, a4 as k, v as ee, a5 as re, u as U, a6 as se, S as K, a7 as M, P as ne, a8 as ae, a9 as ie, aa as ue, F as te, ab as B, ac as h } from "./Bvg94FyY.js";
import { p as le } from "./2TLTvnjh.js";
function de(e, r, [n, s] = [0, 0]) {
  O && n === 0 && z();
  var a = e, u = null, t = null, v = X, I = n > 0 ? G : 0, f = false;
  const A = (l, o = true) => {
    f = true, p(o, l);
  }, p = (l, o) => {
    if (v === (v = l)) return;
    let b = false;
    if (O && s !== -1) {
      if (n === 0) {
        const c = a.data;
        c === H ? s = 0 : c === $ ? s = 1 / 0 : (s = parseInt(c.substring(1)), s !== s && (s = v ? 1 / 0 : -1));
      }
      const S = s > n;
      !!v === S && (a = x(), V(a), D(false), b = true, s = -1);
    }
    v ? (u ? L(u) : o && (u = N(() => o(a))), t && Y(t, () => {
      t = null;
    })) : (t ? L(t) : o && (t = N(() => o(a, [n + 1, s]))), u && Y(u, () => {
      u = null;
    })), b && D(true);
  };
  j(() => {
    f = false, r(A), f || p(null, null);
  }, I), O && (a = J);
}
let m = false;
function fe(e) {
  var r = m;
  try {
    return m = false, [e(), m];
  } finally {
    m = r;
  }
}
const oe = { get(e, r) {
  if (!e.exclude.includes(r)) return d(e.version), r in e.special ? e.special[r]() : e.props[r];
}, set(e, r, n) {
  return r in e.special || (e.special[r] = _e({ get [r]() {
    return e.props[r];
  } }, r, F)), e.special[r](n), B(e.version), true;
}, getOwnPropertyDescriptor(e, r) {
  if (!e.exclude.includes(r) && r in e.props) return { enumerable: true, configurable: true, value: e.props[r] };
}, deleteProperty(e, r) {
  return e.exclude.includes(r) || (e.exclude.push(r), B(e.version)), true;
}, has(e, r) {
  return e.exclude.includes(r) ? false : r in e.props;
}, ownKeys(e) {
  return Reflect.ownKeys(e.props).filter((r) => !e.exclude.includes(r));
} };
function be(e, r) {
  return new Proxy({ props: e, exclude: r, special: {}, version: te(0) }, oe);
}
const ce = { get(e, r) {
  let n = e.props.length;
  for (; n--; ) {
    let s = e.props[n];
    if (h(s) && (s = s()), typeof s == "object" && s !== null && r in s) return s[r];
  }
}, set(e, r, n) {
  let s = e.props.length;
  for (; s--; ) {
    let a = e.props[s];
    h(a) && (a = a());
    const u = w(a, r);
    if (u && u.set) return u.set(n), true;
  }
  return false;
}, getOwnPropertyDescriptor(e, r) {
  let n = e.props.length;
  for (; n--; ) {
    let s = e.props[n];
    if (h(s) && (s = s()), typeof s == "object" && s !== null && r in s) {
      const a = w(s, r);
      return a && !a.configurable && (a.configurable = true), a;
    }
  }
}, has(e, r) {
  if (r === K || r === M) return false;
  for (let n of e.props) if (h(n) && (n = n()), n != null && r in n) return true;
  return false;
}, ownKeys(e) {
  const r = [];
  for (let n of e.props) {
    h(n) && (n = n());
    for (const s in n) r.includes(s) || r.push(s);
  }
  return r;
} };
function Pe(...e) {
  return new Proxy({ props: e }, ce);
}
function C(e) {
  var _a;
  return ((_a = e.ctx) == null ? void 0 : _a.d) ?? false;
}
function _e(e, r, n, s) {
  var _a;
  var a = (n & ie) !== 0, u = !ne || (n & ae) !== 0, t = (n & se) !== 0, v = (n & ue) !== 0, I = false, f;
  t ? [f, I] = fe(() => e[r]) : f = e[r];
  var A = K in e || M in e, p = t && (((_a = w(e, r)) == null ? void 0 : _a.set) ?? (A && r in e && ((i) => e[r] = i))) || void 0, l = s, o = true, b = false, S = () => (b = true, o && (o = false, v ? l = U(s) : l = s), l);
  f === void 0 && s !== void 0 && (p && u && Q(), f = S(), p && p(f));
  var c;
  if (u) c = () => {
    var i = e[r];
    return i === void 0 ? S() : (o = true, b = false, i);
  };
  else {
    var g = (a ? q : y)(() => e[r]);
    g.f |= W, c = () => {
      var i = d(g);
      return i !== void 0 && (l = void 0), i === void 0 ? l : i;
    };
  }
  if ((n & F) === 0) return c;
  if (p) {
    var Z = e.$$legacy;
    return function(i, P) {
      return arguments.length > 0 ? ((!u || !P || Z || I) && p(P ? c() : i), i) : c();
    };
  }
  var E = false, R = re(f), _ = q(() => {
    var i = c(), P = d(R);
    return E ? (E = false, P) : R.v = i;
  });
  return t && d(_), a || (_.equals = k), function(i, P) {
    if (arguments.length > 0) {
      const T = P ? d(_) : u && t ? le(i) : i;
      if (!_.equals(T)) {
        if (E = true, ee(R, T), b && l !== void 0 && (l = T), C(_)) return i;
        U(() => d(_));
      }
      return i;
    }
    return C(_) ? _.v : d(_);
  };
}
export {
  de as i,
  be as l,
  _e as p,
  Pe as s
};
