import { b as j, h as O, O as F, E as H, y as V, P as $, Q as z, B as Q, A as D, R as L, d as N, T as Y, U as W, g as X, V as w, W as x, X as y, M as q, i as J, Y as C, v as d, Z as k, m as ee, w as re, _ as se, u as B, a0 as ne, S as G, a1 as K, G as ie, a2 as ae, a3 as ue, a4 as te, a5 as le, a6 as U, a7 as h } from "./DvcnV1Iy.js";
function ve(e, r, [n, s] = [0, 0]) {
  O && n === 0 && F();
  var i = e, u = null, t = null, v = W, I = n > 0 ? H : 0, f = false;
  const A = (l, c = true) => {
    f = true, p(c, l);
  }, p = (l, c) => {
    if (v === (v = l)) return;
    let b = false;
    if (O && s !== -1) {
      if (n === 0) {
        const o = i.data;
        o === V ? s = 0 : o === $ ? s = 1 / 0 : (s = parseInt(o.substring(1)), s !== s && (s = v ? 1 / 0 : -1));
      }
      const S = s > n;
      !!v === S && (i = z(), Q(i), D(false), b = true, s = -1);
    }
    v ? (u ? L(u) : c && (u = N(() => c(i))), t && Y(t, () => {
      t = null;
    })) : (t ? L(t) : c && (t = N(() => c(i, [n + 1, s]))), u && Y(u, () => {
      u = null;
    })), b && D(true);
  };
  j(() => {
    f = false, r(A), f || p(null, null);
  }, I), O && (i = X);
}
let R = false;
function fe(e) {
  var r = R;
  try {
    return R = false, [e(), R];
  } finally {
    R = r;
  }
}
const ce = { get(e, r) {
  if (!e.exclude.includes(r)) return d(e.version), r in e.special ? e.special[r]() : e.props[r];
}, set(e, r, n) {
  return r in e.special || (e.special[r] = _e({ get [r]() {
    return e.props[r];
  } }, r, C)), e.special[r](n), U(e.version), true;
}, getOwnPropertyDescriptor(e, r) {
  if (!e.exclude.includes(r) && r in e.props) return { enumerable: true, configurable: true, value: e.props[r] };
}, deleteProperty(e, r) {
  return e.exclude.includes(r) || (e.exclude.push(r), U(e.version)), true;
}, has(e, r) {
  return e.exclude.includes(r) ? false : r in e.props;
}, ownKeys(e) {
  return Reflect.ownKeys(e.props).filter((r) => !e.exclude.includes(r));
} };
function de(e, r) {
  return new Proxy({ props: e, exclude: r, special: {}, version: le(0) }, ce);
}
const oe = { get(e, r) {
  let n = e.props.length;
  for (; n--; ) {
    let s = e.props[n];
    if (h(s) && (s = s()), typeof s == "object" && s !== null && r in s) return s[r];
  }
}, set(e, r, n) {
  let s = e.props.length;
  for (; s--; ) {
    let i = e.props[s];
    h(i) && (i = i());
    const u = w(i, r);
    if (u && u.set) return u.set(n), true;
  }
  return false;
}, getOwnPropertyDescriptor(e, r) {
  let n = e.props.length;
  for (; n--; ) {
    let s = e.props[n];
    if (h(s) && (s = s()), typeof s == "object" && s !== null && r in s) {
      const i = w(s, r);
      return i && !i.configurable && (i.configurable = true), i;
    }
  }
}, has(e, r) {
  if (r === G || r === K) return false;
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
function be(...e) {
  return new Proxy({ props: e }, oe);
}
function M(e) {
  var _a;
  return ((_a = e.ctx) == null ? void 0 : _a.d) ?? false;
}
function _e(e, r, n, s) {
  var _a;
  var i = (n & ue) !== 0, u = !ie || (n & ae) !== 0, t = (n & ne) !== 0, v = (n & te) !== 0, I = false, f;
  t ? [f, I] = fe(() => e[r]) : f = e[r];
  var A = G in e || K in e, p = t && (((_a = w(e, r)) == null ? void 0 : _a.set) ?? (A && r in e && ((a) => e[r] = a))) || void 0, l = s, c = true, b = false, S = () => (b = true, c && (c = false, v ? l = B(s) : l = s), l);
  f === void 0 && s !== void 0 && (p && u && x(), f = S(), p && p(f));
  var o;
  if (u) o = () => {
    var a = e[r];
    return a === void 0 ? S() : (c = true, b = false, a);
  };
  else {
    var g = (i ? q : J)(() => e[r]);
    g.f |= y, o = () => {
      var a = d(g);
      return a !== void 0 && (l = void 0), a === void 0 ? l : a;
    };
  }
  if ((n & C) === 0) return o;
  if (p) {
    var Z = e.$$legacy;
    return function(a, P) {
      return arguments.length > 0 ? ((!u || !P || Z || I) && p(P ? o() : a), a) : o();
    };
  }
  var E = false, T = se(f), _ = q(() => {
    var a = o(), P = d(T);
    return E ? (E = false, P) : T.v = a;
  });
  return t && d(_), i || (_.equals = k), function(a, P) {
    if (arguments.length > 0) {
      const m = P ? d(_) : u && t ? ee(a) : a;
      if (!_.equals(m)) {
        if (E = true, re(T, m), b && l !== void 0 && (l = m), M(_)) return a;
        B(() => d(_));
      }
      return a;
    }
    return M(_) ? _.v : d(_);
  };
}
export {
  ve as i,
  de as l,
  _e as p,
  be as s
};
