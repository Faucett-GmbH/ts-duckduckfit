import { b as ke, n as Ie, a as F, c as ne } from "./BZ0OIXfh.js";
import { i as Le } from "./C__qyGCH.js";
import { w as ue, b as oe, aw as ce, A as y, h as S, B as ve, X as z, m as D, i as de, Y as Me, Z as j, z as L, g as I, an as me, _ as J, d as X, a0 as _e, ax as W, ar as he, q as Oe, J as U, ay as K, az as Q, aA as Z, a5 as Re, F as x, M as $e, aB as ye, aC as He, aq as ze, aD as De, e as ge, aE as Pe, y as Be, E as Ve, aF as We, aG as qe, aH as Ye, L as Fe, aI as Ue, aJ as Ge, p as Je, c as Xe, s as Ke, r as Ze, t as ee, a as je, f as pe } from "./Bvg94FyY.js";
import { l as G, p as M, s as Qe } from "./IxRC03RJ.js";
import { i as xe, a as re, b as er, c as rr, d as ar, f as ir, n as tr, g as sr, j as fr } from "./CpFI7FWg.js";
let m = null;
function ae(e) {
  m = e;
}
function lr(e, r) {
  return r;
}
function nr(e, r, a, i) {
  for (var t = [], s = r.length, l = 0; l < s; l++) He(r[l].e, t, true);
  var o = s > 0 && t.length === 0 && a !== null;
  if (o) {
    var A = a.parentNode;
    ze(A), A.append(a), i.clear(), k(e, r[0].prev, r[s - 1].next);
  }
  De(t, () => {
    for (var n = 0; n < s; n++) {
      var g = r[n];
      o || (i.delete(g.k), k(e, g.prev, g.next)), ge(g.e, !o);
    }
  });
}
function ur(e, r, a, i, t, s = null) {
  var l = e, o = { flags: r, items: /* @__PURE__ */ new Map(), first: null }, A = (r & ce) !== 0;
  if (A) {
    var n = e;
    l = S ? y(ve(n)) : n.appendChild(ue());
  }
  S && z();
  var g = null, p = false, u = de(() => {
    var d = a();
    return $e(d) ? d : d == null ? [] : he(d);
  });
  oe(() => {
    var d = D(u), _ = d.length;
    if (p && _ === 0) return;
    p = _ === 0;
    let h = false;
    if (S) {
      var b = l.data === Me;
      b !== (_ === 0) && (l = j(), y(l), L(false), h = true);
    }
    if (S) {
      for (var E = null, w, c = 0; c < _; c++) {
        if (I.nodeType === 8 && I.data === me) {
          l = I, h = true, L(false);
          break;
        }
        var f = d[c], v = i(f, c);
        w = Ae(I, o, E, null, f, v, c, t, r, a), o.items.set(v, w), E = w;
      }
      _ > 0 && y(j());
    }
    S || or(d, o, l, t, r, i, a), s !== null && (_ === 0 ? g ? J(g) : g = X(() => s(l)) : g !== null && _e(g, () => {
      g = null;
    })), h && L(true), D(u);
  }), S && (l = I);
}
function or(e, r, a, i, t, s, l) {
  var _a, _b, _c, _d;
  var o = (t & ye) !== 0, A = (t & (K | Z)) !== 0, n = e.length, g = r.items, p = r.first, u = p, d, _ = null, h, b = [], E = [], w, c, f, v;
  if (o) for (v = 0; v < n; v += 1) w = e[v], c = s(w, v), f = g.get(c), f !== void 0 && ((_a = f.a) == null ? void 0 : _a.measure(), (h ?? (h = /* @__PURE__ */ new Set())).add(f));
  for (v = 0; v < n; v += 1) {
    if (w = e[v], c = s(w, v), f = g.get(c), f === void 0) {
      var C = u ? u.e.nodes_start : a;
      _ = Ae(C, r, _, _ === null ? r.first : _.next, w, c, v, i, t, l), g.set(c, _), b = [], E = [], u = _.next;
      continue;
    }
    if (A && cr(f, w, v, t), (f.e.f & W) !== 0 && (J(f.e), o && ((_b = f.a) == null ? void 0 : _b.unfix(), (h ?? (h = /* @__PURE__ */ new Set())).delete(f))), f !== u) {
      if (d !== void 0 && d.has(f)) {
        if (b.length < E.length) {
          var N = E[0], T;
          _ = N.prev;
          var H = b[0], B = b[b.length - 1];
          for (T = 0; T < b.length; T += 1) ie(b[T], N, a);
          for (T = 0; T < E.length; T += 1) d.delete(E[T]);
          k(r, H.prev, B.next), k(r, _, H), k(r, B, N), u = N, _ = B, v -= 1, b = [], E = [];
        } else d.delete(f), ie(f, u, a), k(r, f.prev, f.next), k(r, f, _ === null ? r.first : _.next), k(r, _, f), _ = f;
        continue;
      }
      for (b = [], E = []; u !== null && u.k !== c; ) (u.e.f & W) === 0 && (d ?? (d = /* @__PURE__ */ new Set())).add(u), E.push(u), u = u.next;
      if (u === null) continue;
      f = u;
    }
    b.push(f), _ = f, u = f.next;
  }
  if (u !== null || d !== void 0) {
    for (var O = d === void 0 ? [] : he(d); u !== null; ) (u.e.f & W) === 0 && O.push(u), u = u.next;
    var V = O.length;
    if (V > 0) {
      var Ce = (t & ce) !== 0 && n === 0 ? a : null;
      if (o) {
        for (v = 0; v < V; v += 1) (_c = O[v].a) == null ? void 0 : _c.measure();
        for (v = 0; v < V; v += 1) (_d = O[v].a) == null ? void 0 : _d.fix();
      }
      nr(r, O, Ce, g);
    }
  }
  o && Oe(() => {
    var _a2;
    if (h !== void 0) for (f of h) (_a2 = f.a) == null ? void 0 : _a2.apply();
  }), U.first = r.first && r.first.e, U.last = _ && _.e;
}
function cr(e, r, a, i) {
  (i & K) !== 0 && Q(e.v, r), (i & Z) !== 0 ? Q(e.i, a) : e.i = a;
}
function Ae(e, r, a, i, t, s, l, o, A, n) {
  var g = m, p = (A & K) !== 0, u = (A & Pe) === 0, d = p ? u ? Re(t) : x(t) : t, _ = (A & Z) === 0 ? l : x(l), h = { i: _, v: d, k: s, a: null, e: null, prev: a, next: i };
  m = h;
  try {
    return h.e = X(() => o(e, d, _, n), S), h.e.prev = a && a.e, h.e.next = i && i.e, a === null ? r.first = h : (a.next = h, a.e.next = h.e), i !== null && (i.prev = h, i.e.prev = h.e), h;
  } finally {
    m = g;
  }
}
function ie(e, r, a) {
  for (var i = e.next ? e.next.e.nodes_start : a, t = r ? r.e.nodes_start : a, s = e.e.nodes_start; s !== i; ) {
    var l = Be(s);
    t.before(s), s = l;
  }
}
function k(e, r, a) {
  r === null ? e.first = a : (r.next = a, r.e.next = a && a.e), a !== null && (a.prev = r, a.e.prev = r && r.e);
}
function be(e, r, a, i, t) {
  var _a;
  S && z();
  var s = (_a = r.$$slots) == null ? void 0 : _a[a], l = false;
  s === true && (s = r.children, l = true), s === void 0 || s(e, l ? () => i : i);
}
function vr(e, r, a, i, t, s) {
  let l = S;
  S && z();
  var o, A, n = null;
  S && I.nodeType === 1 && (n = I, z());
  var g = S ? I : e, p, u = m;
  oe(() => {
    const d = r() || null;
    var _ = We;
    if (d !== o) {
      var h = m;
      ae(u), p && (d === null ? _e(p, () => {
        p = null, A = null;
      }) : d === A ? J(p) : (ge(p), re(false))), d && d !== A && (p = X(() => {
        if (n = S ? n : document.createElementNS(_, d), ke(n, n), i) {
          S && xe(d) && n.append(document.createComment(""));
          var b = S ? ve(n) : n.appendChild(ue());
          S && (b === null ? L(false) : y(b)), i(n, b);
        }
        U.nodes_end = n, g.before(n);
      })), o = d, o && (A = o), re(true), ae(h);
    }
  }, Ve), l && (L(true), y(g));
}
function Ee(e) {
  var r, a, i = "";
  if (typeof e == "string" || typeof e == "number") i += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var t = e.length;
    for (r = 0; r < t; r++) e[r] && (a = Ee(e[r])) && (i && (i += " "), i += a);
  } else for (a in e) e[a] && (i && (i += " "), i += a);
  return i;
}
function dr() {
  for (var e, r, a = 0, i = "", t = arguments.length; a < t; a++) (e = arguments[a]) && (r = Ee(e)) && (i && (i += " "), i += r);
  return i;
}
function _r(e) {
  return typeof e == "object" ? dr(e) : e ?? "";
}
const te = [...` 	
\r\f\xA0\v\uFEFF`];
function hr(e, r, a) {
  var i = e == null ? "" : "" + e;
  if (r && (i = i ? i + " " + r : r), a) {
    for (var t in a) if (a[t]) i = i ? i + " " + t : t;
    else if (i.length) for (var s = t.length, l = 0; (l = i.indexOf(t, l)) >= 0; ) {
      var o = l + s;
      (l === 0 || te.includes(i[l - 1])) && (o === i.length || te.includes(i[o])) ? i = (l === 0 ? "" : i.substring(0, l)) + i.substring(o + 1) : l = o;
    }
  }
  return i === "" ? null : i;
}
function se(e, r = false) {
  var a = r ? " !important;" : ";", i = "";
  for (var t in e) {
    var s = e[t];
    s != null && s !== "" && (i += " " + t + ": " + s + a);
  }
  return i;
}
function q(e) {
  return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function gr(e, r) {
  if (r) {
    var a = "", i, t;
    if (Array.isArray(r) ? (i = r[0], t = r[1]) : i = r, e) {
      e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
      var s = false, l = 0, o = false, A = [];
      i && A.push(...Object.keys(i).map(q)), t && A.push(...Object.keys(t).map(q));
      var n = 0, g = -1;
      const h = e.length;
      for (var p = 0; p < h; p++) {
        var u = e[p];
        if (o ? u === "/" && e[p - 1] === "*" && (o = false) : s ? s === u && (s = false) : u === "/" && e[p + 1] === "*" ? o = true : u === '"' || u === "'" ? s = u : u === "(" ? l++ : u === ")" && l--, !o && s === false && l === 0) {
          if (u === ":" && g === -1) g = p;
          else if (u === ";" || p === h - 1) {
            if (g !== -1) {
              var d = q(e.substring(n, g).trim());
              if (!A.includes(d)) {
                u !== ";" && p++;
                var _ = e.substring(n, p).trim();
                a += " " + _ + ";";
              }
            }
            n = p + 1, g = -1;
          }
        }
      }
    }
    return i && (a += se(i)), t && (a += se(t, true)), a = a.trim(), a === "" ? null : a;
  }
  return e == null ? null : String(e);
}
function pr(e, r, a, i, t, s) {
  var l = e.__className;
  if (S || l !== a) {
    var o = hr(a, i, s);
    (!S || o !== e.getAttribute("class")) && (o == null ? e.removeAttribute("class") : r ? e.className = o : e.setAttribute("class", o)), e.__className = a;
  } else if (s && t !== s) for (var A in s) {
    var n = !!s[A];
    (t == null || n !== !!t[A]) && e.classList.toggle(A, n);
  }
  return s;
}
function Y(e, r = {}, a, i) {
  for (var t in a) {
    var s = a[t];
    r[t] !== s && (a[t] == null ? e.style.removeProperty(t) : e.style.setProperty(t, s, i));
  }
}
function Ar(e, r, a, i) {
  var t = e.__style;
  if (S || t !== r) {
    var s = gr(r, i);
    (!S || s !== e.getAttribute("style")) && (s == null ? e.removeAttribute("style") : e.style.cssText = s), e.__style = r;
  } else i && (Array.isArray(i) ? (Y(e, a == null ? void 0 : a[0], i[0]), Y(e, a == null ? void 0 : a[1], i[1], "important")) : Y(e, a, i));
  return i;
}
const R = Symbol("class"), $ = Symbol("style"), Ne = Symbol("is custom element"), Se = Symbol("is html");
function Lr(e) {
  if (S) {
    var r = false, a = () => {
      if (!r) {
        if (r = true, e.hasAttribute("value")) {
          var i = e.value;
          P(e, "value", null), e.value = i;
        }
        if (e.hasAttribute("checked")) {
          var t = e.checked;
          P(e, "checked", null), e.checked = t;
        }
      }
    };
    e.__on_r = a, Ge(a), sr();
  }
}
function br(e, r) {
  r ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
}
function P(e, r, a, i) {
  var t = we(e);
  S && (t[r] = e.getAttribute(r), r === "src" || r === "srcset" || r === "href" && e.nodeName === "LINK") || t[r] !== (t[r] = a) && (r === "loading" && (e[qe] = a), a == null ? e.removeAttribute(r) : typeof a != "string" && Te(e).includes(r) ? e[r] = a : e.setAttribute(r, a));
}
function fe(e, r, a, i, t = false) {
  var s = we(e), l = s[Ne], o = !s[Se];
  let A = S && l;
  A && L(false);
  var n = r || {}, g = e.tagName === "OPTION";
  for (var p in r) p in a || (a[p] = null);
  a.class ? a.class = _r(a.class) : a[R] && (a.class = null), a[$] && (a.style ?? (a.style = null));
  var u = Te(e);
  for (const c in a) {
    let f = a[c];
    if (g && c === "value" && f == null) {
      e.value = e.__value = "", n[c] = f;
      continue;
    }
    if (c === "class") {
      var d = e.namespaceURI === "http://www.w3.org/1999/xhtml";
      pr(e, d, f, i, r == null ? void 0 : r[R], a[R]), n[c] = f, n[R] = a[R];
      continue;
    }
    if (c === "style") {
      Ar(e, f, r == null ? void 0 : r[$], a[$]), n[c] = f, n[$] = a[$];
      continue;
    }
    var _ = n[c];
    if (f !== _) {
      n[c] = f;
      var h = c[0] + c[1];
      if (h !== "$$") if (h === "on") {
        const v = {}, C = "$$" + c;
        let N = c.slice(2);
        var b = fr(N);
        if (er(N) && (N = N.slice(0, -7), v.capture = true), !b && _) {
          if (f != null) continue;
          e.removeEventListener(N, n[C], v), n[C] = null;
        }
        if (f != null) if (b) e[`__${N}`] = f, ar([N]);
        else {
          let T = function(H) {
            n[c].call(this, H);
          };
          n[C] = rr(N, e, T, v);
        }
        else b && (e[`__${N}`] = void 0);
      } else if (c === "style") P(e, c, f);
      else if (c === "autofocus") ir(e, !!f);
      else if (!l && (c === "__value" || c === "value" && f != null)) e.value = e.__value = f;
      else if (c === "selected" && g) br(e, f);
      else {
        var E = c;
        o || (E = tr(E));
        var w = E === "defaultValue" || E === "defaultChecked";
        if (f == null && !l && !w) if (s[c] = null, E === "value" || E === "checked") {
          let v = e;
          const C = r === void 0;
          if (E === "value") {
            let N = v.defaultValue;
            v.removeAttribute(E), v.defaultValue = N, v.value = v.__value = C ? N : null;
          } else {
            let N = v.defaultChecked;
            v.removeAttribute(E), v.defaultChecked = N, v.checked = C ? N : false;
          }
        } else e.removeAttribute(c);
        else w || u.includes(E) && (l || typeof f != "string") ? e[E] = f : typeof f != "function" && P(e, E, f);
      }
    }
  }
  return A && L(true), n;
}
function we(e) {
  return e.__attributes ?? (e.__attributes = { [Ne]: e.nodeName.includes("-"), [Se]: e.namespaceURI === Ye });
}
var le = /* @__PURE__ */ new Map();
function Te(e) {
  var r = le.get(e.nodeName);
  if (r) return r;
  le.set(e.nodeName, r = []);
  for (var a, i = e, t = Element.prototype; t !== i; ) {
    a = Ue(i);
    for (var s in a) a[s].set && r.push(s);
    i = Fe(i);
  }
  return r;
}
/**
* @license lucide-svelte v0.483.0 - ISC
*
* ISC License
* 
* Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
* 
* Permission to use, copy, modify, and/or distribute this software for any
* purpose with or without fee is hereby granted, provided that the above
* copyright notice and this permission notice appear in all copies.
* 
* THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
* WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
* MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
* ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
* WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
* ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
* OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
* 
*/
const Er = { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": 2, "stroke-linecap": "round", "stroke-linejoin": "round" };
var Nr = Ie("<svg><!><!></svg>");
function Sr(e, r) {
  const a = G(r, ["children", "$$slots", "$$events", "$$legacy"]), i = G(a, ["name", "color", "size", "strokeWidth", "absoluteStrokeWidth", "iconNode"]);
  Je(r, false);
  let t = M(r, "name", 8, void 0), s = M(r, "color", 8, "currentColor"), l = M(r, "size", 8, 24), o = M(r, "strokeWidth", 8, 2), A = M(r, "absoluteStrokeWidth", 8, false), n = M(r, "iconNode", 24, () => []);
  const g = (...h) => h.filter((b, E, w) => !!b && w.indexOf(b) === E).join(" ");
  Le();
  var p = Nr();
  let u;
  var d = Xe(p);
  ur(d, 1, n, lr, (h, b) => {
    let E = () => D(b)[0], w = () => D(b)[1];
    var c = ne(), f = pe(c);
    vr(f, E, true, (v, C) => {
      let N;
      ee(() => N = fe(v, N, { ...w() }));
    }), F(h, c);
  });
  var _ = Ke(d);
  be(_, r, "default", {}), Ze(p), ee((h, b) => u = fe(p, u, { ...Er, ...i, width: l(), height: l(), stroke: s(), "stroke-width": h, class: b }), [() => A() ? Number(o()) * 24 / Number(l()) : o(), () => g("lucide-icon", "lucide", t() ? `lucide-${t()}` : "", a.class)], de), F(e, p), je();
}
function Mr(e, r) {
  const a = G(r, ["children", "$$slots", "$$events", "$$legacy"]);
  Sr(e, Qe({ name: "loader-circle" }, () => a, { iconNode: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56" }]], children: (t, s) => {
    var l = ne(), o = pe(l);
    be(o, r, "default", {}), F(t, l);
  }, $$slots: { default: true } }));
}
export {
  Sr as I,
  Mr as L,
  pr as a,
  be as b,
  m as c,
  _r as d,
  ur as e,
  Ar as f,
  lr as i,
  Lr as r,
  P as s
};
