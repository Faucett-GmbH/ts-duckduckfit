var bn = Array.isArray, Kt = Array.prototype.indexOf, Pn = Array.from, Fn = Object.defineProperty, _t = Object.getOwnPropertyDescriptor, $t = Object.getOwnPropertyDescriptors, Mn = Object.prototype, Ln = Array.prototype, Zt = Object.getPrototypeOf;
function qn(t) {
  return typeof t == "function";
}
const Yn = () => {
};
function Hn(t) {
  return typeof (t == null ? void 0 : t.then) == "function";
}
function jn(t) {
  return t();
}
function Et(t) {
  for (var n = 0; n < t.length; n++) t[n]();
}
const y = 2, wt = 4, X = 8, ot = 16, I = 32, k = 64, G = 128, E = 256, K = 512, h = 1024, O = 2048, P = 4096, C = 8192, tt = 16384, zt = 32768, yt = 65536, Bn = 1 << 17, Jt = 1 << 19, gt = 1 << 20, ct = Symbol("$state"), Un = Symbol("legacy props"), Vn = Symbol("");
function Tt(t) {
  return t === this.v;
}
function Qt(t, n) {
  return t != t ? n == n : t !== n || t !== null && typeof t == "object" || typeof t == "function";
}
function At(t) {
  return !Qt(t, this.v);
}
function Wt(t) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function Xt() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function tn(t) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function nn() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Gn() {
  throw new Error("https://svelte.dev/e/hydration_failed");
}
function Kn(t) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function $n() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Zn() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function en() {
  throw new Error("https://svelte.dev/e/state_unsafe_local_read");
}
function rn() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
let nt = false;
function zn() {
  nt = true;
}
const Jn = 1, Qn = 2, Wn = 4, Xn = 8, te = 16, ne = 1, ee = 2, re = 4, ae = 8, le = 16, se = 1, ue = 2, oe = 4, fe = 1, ie = 2, an = "[", ln = "[!", sn = "]", mt = {}, _e = Symbol(), ce = "http://www.w3.org/1999/xhtml", ve = "http://www.w3.org/2000/svg";
function xt(t) {
  console.warn("https://svelte.dev/e/hydration_mismatch");
}
let f = null;
function vt(t) {
  f = t;
}
function pe(t, n = false, e) {
  var r = f = { p: f, c: null, d: false, e: null, m: false, s: t, x: null, l: null };
  nt && !n && (f.l = { s: null, u: null, r1: [], r2: ft(false) }), dn(() => {
    r.d = true;
  });
}
function he(t) {
  const n = f;
  if (n !== null) {
    const s = n.e;
    if (s !== null) {
      var e = o, r = u;
      n.e = null;
      try {
        for (var a = 0; a < s.length; a++) {
          var l = s[a];
          J(l.effect), z(l.reaction), Ct(l.fn);
        }
      } finally {
        J(e), z(r);
      }
    }
    f = n.p, n.m = true;
  }
  return {};
}
function et() {
  return !nt || f !== null && f.l === null;
}
const L = /* @__PURE__ */ new Map();
function ft(t, n) {
  var e = { f: 0, v: t, reactions: null, equals: Tt, rv: 0, wv: 0 };
  return e;
}
function de(t) {
  return un(ft(t));
}
function Ee(t, n = false) {
  var _a;
  const e = ft(t);
  return n || (e.equals = At), nt && f !== null && f.l !== null && ((_a = f.l).s ?? (_a.s = [])).push(e), e;
}
function un(t) {
  return u !== null && !w && (u.f & y) !== 0 && (A === null ? mn([t]) : A.push(t)), t;
}
function on(t, n) {
  return u !== null && !w && et() && (u.f & (y | ot)) !== 0 && (A === null || !A.includes(t)) && rn(), fn(t, n);
}
function fn(t, n) {
  if (!t.equals(n)) {
    var e = t.v;
    j ? L.set(t, n) : L.set(t, e), t.v = n, t.wv = jt(), It(t, O), et() && o !== null && (o.f & h) !== 0 && (o.f & (I | k)) === 0 && (d === null ? xn([t]) : d.push(t));
  }
  return n;
}
function we(t, n = 1) {
  var e = Gt(t), r = n === 1 ? e++ : e--;
  return on(t, e), r;
}
function It(t, n) {
  var e = t.reactions;
  if (e !== null) for (var r = et(), a = e.length, l = 0; l < a; l++) {
    var s = e[l], i = s.f;
    (i & O) === 0 && (!r && s === o || (m(s, n), (i & (h | E)) !== 0 && ((i & y) !== 0 ? It(s, P) : at(s))));
  }
}
let b = false;
function ye(t) {
  b = t;
}
let x;
function q(t) {
  if (t === null) throw xt(), mt;
  return x = t;
}
function ge() {
  return q(F(x));
}
function Te(t) {
  if (b) {
    if (F(x) !== null) throw xt(), mt;
    x = t;
  }
}
function Ae() {
  for (var t = 0, n = x; ; ) {
    if (n.nodeType === 8) {
      var e = n.data;
      if (e === sn) {
        if (t === 0) return n;
        t -= 1;
      } else (e === an || e === ln) && (t += 1);
    }
    var r = F(n);
    n.remove(), n = r;
  }
}
var pt, _n, cn, Rt, St;
function me() {
  if (pt === void 0) {
    pt = window, _n = document, cn = /Firefox/.test(navigator.userAgent);
    var t = Element.prototype, n = Node.prototype;
    Rt = _t(n, "firstChild").get, St = _t(n, "nextSibling").get, t.__click = void 0, t.__className = void 0, t.__attributes = null, t.__style = void 0, t.__e = void 0, Text.prototype.__t = void 0;
  }
}
function lt(t = "") {
  return document.createTextNode(t);
}
function st(t) {
  return Rt.call(t);
}
function F(t) {
  return St.call(t);
}
function xe(t, n) {
  if (!b) return st(t);
  var e = st(x);
  if (e === null) e = x.appendChild(lt());
  else if (n && e.nodeType !== 3) {
    var r = lt();
    return e == null ? void 0 : e.before(r), q(r), r;
  }
  return q(e), e;
}
function Ie(t, n) {
  if (!b) {
    var e = st(t);
    return e instanceof Comment && e.data === "" ? F(e) : e;
  }
  return x;
}
function Re(t, n = 1, e = false) {
  let r = b ? x : t;
  for (var a; n--; ) a = r, r = F(r);
  if (!b) return r;
  var l = r == null ? void 0 : r.nodeType;
  if (e && l !== 3) {
    var s = lt();
    return r === null ? a == null ? void 0 : a.after(s) : r.before(s), q(s), s;
  }
  return q(r), r;
}
function Se(t) {
  t.textContent = "";
}
function Ot(t) {
  var n = y | O, e = u !== null && (u.f & y) !== 0 ? u : null;
  return o === null || e !== null && (e.f & E) !== 0 ? n |= E : o.f |= gt, { ctx: f, deps: null, effects: null, equals: Tt, f: n, fn: t, reactions: null, rv: 0, v: null, wv: 0, parent: e ?? o };
}
function Oe(t) {
  const n = Ot(t);
  return n.equals = At, n;
}
function Nt(t) {
  var n = t.effects;
  if (n !== null) {
    t.effects = null;
    for (var e = 0; e < n.length; e += 1) S(n[e]);
  }
}
function vn(t) {
  for (var n = t.parent; n !== null; ) {
    if ((n.f & y) === 0) return n;
    n = n.parent;
  }
  return null;
}
function pn(t) {
  var n, e = o;
  J(vn(t));
  try {
    Nt(t), n = Ut(t);
  } finally {
    J(e);
  }
  return n;
}
function kt(t) {
  var n = pn(t), e = (R || (t.f & E) !== 0) && t.deps !== null ? P : h;
  m(t, e), t.equals(n) || (t.v = n, t.wv = jt());
}
function Dt(t) {
  o === null && u === null && tn(), u !== null && (u.f & E) !== 0 && o === null && Xt(), j && Wt();
}
function hn(t, n) {
  var e = n.last;
  e === null ? n.last = n.first = t : (e.next = t, t.prev = e, n.last = t);
}
function D(t, n, e, r = true) {
  var a = o, l = { ctx: f, deps: null, nodes_start: null, nodes_end: null, f: t | O, first: null, fn: n, last: null, next: null, parent: a, prev: null, teardown: null, transitions: null, wv: 0 };
  if (e) try {
    it(l), l.f |= zt;
  } catch (_) {
    throw S(l), _;
  }
  else n !== null && at(l);
  var s = e && l.deps === null && l.first === null && l.nodes_start === null && l.teardown === null && (l.f & (gt | G)) === 0;
  if (!s && r && (a !== null && hn(l, a), u !== null && (u.f & y) !== 0)) {
    var i = u;
    (i.effects ?? (i.effects = [])).push(l);
  }
  return l;
}
function dn(t) {
  const n = D(X, null, false);
  return m(n, h), n.teardown = t, n;
}
function Ne(t) {
  Dt();
  var n = o !== null && (o.f & I) !== 0 && f !== null && !f.m;
  if (n) {
    var e = f;
    (e.e ?? (e.e = [])).push({ fn: t, effect: o, reaction: u });
  } else {
    var r = Ct(t);
    return r;
  }
}
function ke(t) {
  return Dt(), En(t);
}
function De(t) {
  const n = D(k, t, true);
  return () => {
    S(n);
  };
}
function Ce(t) {
  const n = D(k, t, true);
  return (e = {}) => new Promise((r) => {
    e.outro ? gn(n, () => {
      S(n), r(void 0);
    }) : (S(n), r(void 0));
  });
}
function Ct(t) {
  return D(wt, t, false);
}
function En(t) {
  return D(X, t, true);
}
function be(t, n = [], e = Ot) {
  const r = n.map(e);
  return wn(() => t(...r.map(Gt)));
}
function wn(t, n = 0) {
  return D(X | ot | n, t, true);
}
function Pe(t, n = true) {
  return D(X | I, t, true, n);
}
function bt(t) {
  var n = t.teardown;
  if (n !== null) {
    const e = j, r = u;
    dt(true), z(null);
    try {
      n.call(null);
    } finally {
      dt(e), z(r);
    }
  }
}
function Pt(t, n = false) {
  var e = t.first;
  for (t.first = t.last = null; e !== null; ) {
    var r = e.next;
    (e.f & k) !== 0 ? e.parent = null : S(e, n), e = r;
  }
}
function yn(t) {
  for (var n = t.first; n !== null; ) {
    var e = n.next;
    (n.f & I) === 0 && S(n), n = e;
  }
}
function S(t, n = true) {
  var e = false;
  if ((n || (t.f & Jt) !== 0) && t.nodes_start !== null) {
    for (var r = t.nodes_start, a = t.nodes_end; r !== null; ) {
      var l = r === a ? null : F(r);
      r.remove(), r = l;
    }
    e = true;
  }
  Pt(t, n && !e), W(t, 0), m(t, tt);
  var s = t.transitions;
  if (s !== null) for (const _ of s) _.stop();
  bt(t);
  var i = t.parent;
  i !== null && i.first !== null && Ft(t), t.next = t.prev = t.teardown = t.ctx = t.deps = t.fn = t.nodes_start = t.nodes_end = null;
}
function Ft(t) {
  var n = t.parent, e = t.prev, r = t.next;
  e !== null && (e.next = r), r !== null && (r.prev = e), n !== null && (n.first === t && (n.first = r), n.last === t && (n.last = e));
}
function gn(t, n) {
  var e = [];
  Mt(t, e, true), Tn(e, () => {
    S(t), n && n();
  });
}
function Tn(t, n) {
  var e = t.length;
  if (e > 0) {
    var r = () => --e || n();
    for (var a of t) a.out(r);
  } else n();
}
function Mt(t, n, e) {
  if ((t.f & C) === 0) {
    if (t.f ^= C, t.transitions !== null) for (const s of t.transitions) (s.is_global || e) && n.push(s);
    for (var r = t.first; r !== null; ) {
      var a = r.next, l = (r.f & yt) !== 0 || (r.f & I) !== 0;
      Mt(r, n, l ? e : false), r = a;
    }
  }
}
function Fe(t) {
  Lt(t, true);
}
function Lt(t, n) {
  if ((t.f & C) !== 0) {
    t.f ^= C, (t.f & h) === 0 && (t.f ^= h), B(t) && (m(t, O), at(t));
    for (var e = t.first; e !== null; ) {
      var r = e.next, a = (e.f & yt) !== 0 || (e.f & I) !== 0;
      Lt(e, a ? n : false), e = r;
    }
    if (t.transitions !== null) for (const l of t.transitions) (l.is_global || n) && l.in();
  }
}
const An = typeof requestIdleCallback > "u" ? (t) => setTimeout(t, 1) : requestIdleCallback;
let Y = [], H = [];
function qt() {
  var t = Y;
  Y = [], Et(t);
}
function Yt() {
  var t = H;
  H = [], Et(t);
}
function Me(t) {
  Y.length === 0 && queueMicrotask(qt), Y.push(t);
}
function Le(t) {
  H.length === 0 && An(Yt), H.push(t);
}
function ht() {
  Y.length > 0 && qt(), H.length > 0 && Yt();
}
let V = false, $ = false, Z = null, N = false, j = false;
function dt(t) {
  j = t;
}
let M = [];
let u = null, w = false;
function z(t) {
  u = t;
}
let o = null;
function J(t) {
  o = t;
}
let A = null;
function mn(t) {
  A = t;
}
let c = null, p = 0, d = null;
function xn(t) {
  d = t;
}
let Ht = 1, Q = 0, R = false;
function jt() {
  return ++Ht;
}
function B(t) {
  var _a;
  var n = t.f;
  if ((n & O) !== 0) return true;
  if ((n & P) !== 0) {
    var e = t.deps, r = (n & E) !== 0;
    if (e !== null) {
      var a, l, s = (n & K) !== 0, i = r && o !== null && !R, _ = e.length;
      if (s || i) {
        var g = t, U = g.parent;
        for (a = 0; a < _; a++) l = e[a], (s || !((_a = l == null ? void 0 : l.reactions) == null ? void 0 : _a.includes(g))) && (l.reactions ?? (l.reactions = [])).push(g);
        s && (g.f ^= K), i && U !== null && (U.f & E) === 0 && (g.f ^= E);
      }
      for (a = 0; a < _; a++) if (l = e[a], B(l) && kt(l), l.wv > t.wv) return true;
    }
    (!r || o !== null && !R) && m(t, h);
  }
  return false;
}
function In(t, n) {
  for (var e = n; e !== null; ) {
    if ((e.f & G) !== 0) try {
      e.fn(t);
      return;
    } catch {
      e.f ^= G;
    }
    e = e.parent;
  }
  throw V = false, t;
}
function Rn(t) {
  return (t.f & tt) === 0 && (t.parent === null || (t.parent.f & G) === 0);
}
function rt(t, n, e, r) {
  if (V) {
    if (e === null && (V = false), Rn(n)) throw t;
    return;
  }
  e !== null && (V = true);
  {
    In(t, n);
    return;
  }
}
function Bt(t, n, e = true) {
  var r = t.reactions;
  if (r !== null) for (var a = 0; a < r.length; a++) {
    var l = r[a];
    (l.f & y) !== 0 ? Bt(l, n, false) : n === l && (e ? m(l, O) : (l.f & h) !== 0 && m(l, P), at(l));
  }
}
function Ut(t) {
  var _a;
  var n = c, e = p, r = d, a = u, l = R, s = A, i = f, _ = w, g = t.f;
  c = null, p = 0, d = null, R = (g & E) !== 0 && (w || !N || u === null), u = (g & (I | k)) === 0 ? t : null, A = null, vt(t.ctx), w = false, Q++;
  try {
    var U = (0, t.fn)(), T = t.deps;
    if (c !== null) {
      var v;
      if (W(t, p), T !== null && p > 0) for (T.length = p + c.length, v = 0; v < c.length; v++) T[p + v] = c[v];
      else t.deps = T = c;
      if (!R) for (v = p; v < T.length; v++) ((_a = T[v]).reactions ?? (_a.reactions = [])).push(t);
    } else T !== null && p < T.length && (W(t, p), T.length = p);
    if (et() && d !== null && !w && T !== null && (t.f & (y | P | O)) === 0) for (v = 0; v < d.length; v++) Bt(d[v], t);
    return a !== null && (Q++, d !== null && (r === null ? r = d : r.push(...d))), U;
  } finally {
    c = n, p = e, d = r, u = a, R = l, A = s, vt(i), w = _;
  }
}
function Sn(t, n) {
  let e = n.reactions;
  if (e !== null) {
    var r = Kt.call(e, t);
    if (r !== -1) {
      var a = e.length - 1;
      a === 0 ? e = n.reactions = null : (e[r] = e[a], e.pop());
    }
  }
  e === null && (n.f & y) !== 0 && (c === null || !c.includes(n)) && (m(n, P), (n.f & (E | K)) === 0 && (n.f ^= K), Nt(n), W(n, 0));
}
function W(t, n) {
  var e = t.deps;
  if (e !== null) for (var r = n; r < e.length; r++) Sn(t, e[r]);
}
function it(t) {
  var n = t.f;
  if ((n & tt) === 0) {
    m(t, h);
    var e = o, r = f, a = N;
    o = t, N = true;
    try {
      (n & ot) !== 0 ? yn(t) : Pt(t), bt(t);
      var l = Ut(t);
      t.teardown = typeof l == "function" ? l : null, t.wv = Ht;
      var s = t.deps, i;
    } catch (_) {
      rt(_, t, e, r || t.ctx);
    } finally {
      N = a, o = e;
    }
  }
}
function On() {
  try {
    nn();
  } catch (t) {
    if (Z !== null) rt(t, Z, null);
    else throw t;
  }
}
function Vt() {
  var t = N;
  try {
    var n = 0;
    for (N = true; M.length > 0; ) {
      n++ > 1e3 && On();
      var e = M, r = e.length;
      M = [];
      for (var a = 0; a < r; a++) {
        var l = kn(e[a]);
        Nn(l);
      }
    }
  } finally {
    $ = false, N = t, Z = null, L.clear();
  }
}
function Nn(t) {
  var n = t.length;
  if (n !== 0) for (var e = 0; e < n; e++) {
    var r = t[e];
    if ((r.f & (tt | C)) === 0) try {
      B(r) && (it(r), r.deps === null && r.first === null && r.nodes_start === null && (r.teardown === null ? Ft(r) : r.fn = null));
    } catch (a) {
      rt(a, r, null, r.ctx);
    }
  }
}
function at(t) {
  $ || ($ = true, queueMicrotask(Vt));
  for (var n = Z = t; n.parent !== null; ) {
    n = n.parent;
    var e = n.f;
    if ((e & (k | I)) !== 0) {
      if ((e & h) === 0) return;
      n.f ^= h;
    }
  }
  M.push(n);
}
function kn(t) {
  for (var n = [], e = t; e !== null; ) {
    var r = e.f, a = (r & (I | k)) !== 0, l = a && (r & h) !== 0;
    if (!l && (r & C) === 0) {
      if ((r & wt) !== 0) n.push(e);
      else if (a) e.f ^= h;
      else {
        var s = u;
        try {
          u = e, B(e) && it(e);
        } catch (g) {
          rt(g, e, null, e.ctx);
        } finally {
          u = s;
        }
      }
      var i = e.first;
      if (i !== null) {
        e = i;
        continue;
      }
    }
    var _ = e.parent;
    for (e = e.next; e === null && _ !== null; ) e = _.next, _ = _.parent;
  }
  return n;
}
function Dn(t) {
  var n;
  for (ht(); M.length > 0; ) $ = true, Vt(), ht();
  return n;
}
async function qe() {
  await Promise.resolve(), Dn();
}
function Gt(t) {
  var n = t.f, e = (n & y) !== 0;
  if (u !== null && !w) {
    A !== null && A.includes(t) && en();
    var r = u.deps;
    t.rv < Q && (t.rv = Q, c === null && r !== null && r[p] === t ? p++ : c === null ? c = [t] : (!R || !c.includes(t)) && c.push(t));
  } else if (e && t.deps === null && t.effects === null) {
    var a = t, l = a.parent;
    l !== null && (l.f & E) === 0 && (a.f ^= E);
  }
  return e && (a = t, B(a) && kt(a)), j && L.has(t) ? L.get(t) : t.v;
}
function Ye(t) {
  var n = w;
  try {
    return w = true, t();
  } finally {
    w = n;
  }
}
const Cn = -7169;
function m(t, n) {
  t.f = t.f & Cn | n;
}
function He(t) {
  if (!(typeof t != "object" || !t || t instanceof EventTarget)) {
    if (ct in t) ut(t);
    else if (!Array.isArray(t)) for (let n in t) {
      const e = t[n];
      typeof e == "object" && e && ct in e && ut(e);
    }
  }
}
function ut(t, n = /* @__PURE__ */ new Set()) {
  if (typeof t == "object" && t !== null && !(t instanceof EventTarget) && !n.has(t)) {
    n.add(t), t instanceof Date && t.getTime();
    for (let r in t) try {
      ut(t[r], n);
    } catch {
    }
    const e = Zt(t);
    if (e !== Object.prototype && e !== Array.prototype && e !== Map.prototype && e !== Set.prototype && e !== Date.prototype) {
      const r = $t(e);
      for (let a in r) {
        const l = r[a].get;
        if (l) try {
          l.call(t);
        } catch {
        }
      }
    }
  }
}
export {
  _n as $,
  q as A,
  st as B,
  Mn as C,
  Ln as D,
  yt as E,
  ft as F,
  Zn as G,
  Jt as H,
  _t as I,
  o as J,
  $n as K,
  Zt as L,
  bn as M,
  Ne as N,
  f as O,
  nt as P,
  ke as Q,
  Et as R,
  ct as S,
  jn as T,
  _e as U,
  He as V,
  zn as W,
  ge as X,
  ln as Y,
  Ae as Z,
  Fe as _,
  he as a,
  gn as a0,
  Kn as a1,
  Bn as a2,
  re as a3,
  At as a4,
  Ee as a5,
  ae as a6,
  Un as a7,
  ee as a8,
  ne as a9,
  Qn as aA,
  Xn as aB,
  Mt as aC,
  Tn as aD,
  te as aE,
  ve as aF,
  Vn as aG,
  ce as aH,
  $t as aI,
  Le as aJ,
  Hn as aK,
  vt as aL,
  Qt as aM,
  ot as aN,
  zt as aO,
  oe as aP,
  se as aQ,
  ue as aR,
  De as aS,
  le as aa,
  we as ab,
  qn as ac,
  cn as ad,
  fe as ae,
  ie as af,
  z as ag,
  J as ah,
  u as ai,
  dn as aj,
  Fn as ak,
  me as al,
  mt as am,
  sn as an,
  xt as ao,
  Gn as ap,
  Se as aq,
  Pn as ar,
  Ce as as,
  Dn as at,
  qe as au,
  et as av,
  Wn as aw,
  C as ax,
  Jn as ay,
  fn as az,
  wn as b,
  xe as c,
  Pe as d,
  S as e,
  Ie as f,
  x as g,
  b as h,
  Oe as i,
  Ct as j,
  En as k,
  de as l,
  Gt as m,
  Yn as n,
  Ot as o,
  pe as p,
  Me as q,
  Te as r,
  Re as s,
  be as t,
  Ye as u,
  on as v,
  lt as w,
  an as x,
  F as y,
  ye as z
};
