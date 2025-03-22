import { q as P, ac as b, ad as w, ae as V, ab as R, af as B, ag as q, ah as H, ai as k, C as Y, y as z, z as F, aj as T, A as m, B as O, O as $, g as v, ak as G, al as U, am as X, an as J, ao as K, ap as Q, x as Z, d as ee, h as L, p as te, F as re, a as ae } from "./DvcnV1Iy.js";
import { r as ne } from "./CB6iZtqN.js";
import { b as oe } from "./C3b73btl.js";
function ve(e) {
  return e.endsWith("capture") && e !== "gotpointercapture" && e !== "lostpointercapture";
}
const se = ["beforeinput", "click", "change", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"];
function ye(e) {
  return se.includes(e);
}
const ie = { formnovalidate: "formNoValidate", ismap: "isMap", nomodule: "noModule", playsinline: "playsInline", readonly: "readOnly", defaultvalue: "defaultValue", defaultchecked: "defaultChecked", srcobject: "srcObject", novalidate: "noValidate", allowfullscreen: "allowFullscreen", disablepictureinpicture: "disablePictureInPicture", disableremoteplayback: "disableRemotePlayback" };
function ge(e) {
  return e = e.toLowerCase(), ie[e] ?? e;
}
const ue = ["touchstart", "touchmove"];
function ce(e) {
  return ue.includes(e);
}
const le = ["textarea", "script", "style", "title"];
function me(e) {
  return le.includes(e);
}
function be(e, t) {
  if (t) {
    const a = document.body;
    e.autofocus = true, P(() => {
      document.activeElement === a && e.focus();
    });
  }
}
let I = false;
function de() {
  I || (I = true, document.addEventListener("reset", (e) => {
    Promise.resolve().then(() => {
      var _a;
      if (!e.defaultPrevented) for (const t of e.target.elements) (_a = t.__on_r) == null ? void 0 : _a.call(t);
    });
  }, { capture: true }));
}
function x(e) {
  var t = V, a = R;
  b(null), w(null);
  try {
    return e();
  } finally {
    b(t), w(a);
  }
}
function we(e, t, a, o = a) {
  e.addEventListener(t, () => x(a));
  const n = e.__on_r;
  n ? e.__on_r = () => {
    n(), o(true);
  } : e.__on_r = () => o(true), de();
}
const D = /* @__PURE__ */ new Set(), S = /* @__PURE__ */ new Set();
function M(e, t, a, o = {}) {
  function n(r) {
    if (o.capture || y.call(t, r), !r.cancelBubble) return x(() => a == null ? void 0 : a.call(this, r));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? P(() => {
    t.addEventListener(e, n, o);
  }) : t.addEventListener(e, n, o), n;
}
function Ee(e, t, a, o = {}) {
  var n = M(t, e, a, o);
  return () => {
    e.removeEventListener(t, n, o);
  };
}
function Te(e, t, a, o, n) {
  var r = { capture: o, passive: n }, u = M(e, t, a, r);
  (t === document.body || t === window || t === document) && B(() => {
    t.removeEventListener(e, u, r);
  });
}
function ke(e) {
  for (var t = 0; t < e.length; t++) D.add(e[t]);
  for (var a of S) a(e);
}
function y(e) {
  var _a;
  var t = this, a = t.ownerDocument, o = e.type, n = ((_a = e.composedPath) == null ? void 0 : _a.call(e)) || [], r = n[0] || e.target, u = 0, f = e.__root;
  if (f) {
    var l = n.indexOf(f);
    if (l !== -1 && (t === document || t === window)) {
      e.__root = t;
      return;
    }
    var _ = n.indexOf(t);
    if (_ === -1) return;
    l <= _ && (u = l);
  }
  if (r = n[u] || e.target, r !== t) {
    q(e, "currentTarget", { configurable: true, get() {
      return r || a;
    } });
    var E = V, c = R;
    b(null), w(null);
    try {
      for (var s, i = []; r !== null; ) {
        var p = r.assignedSlot || r.parentNode || r.host || null;
        try {
          var d = r["__" + o];
          if (d != null && (!r.disabled || e.target === r)) if (H(d)) {
            var [C, ...W] = d;
            C.apply(r, [e, ...W]);
          } else d.call(r, e);
        } catch (g) {
          s ? i.push(g) : s = g;
        }
        if (e.cancelBubble || p === t || p === null) break;
        r = p;
      }
      if (s) {
        for (let g of i) queueMicrotask(() => {
          throw g;
        });
        throw s;
      }
    } finally {
      e.__root = t, delete e.currentTarget, b(E), w(c);
    }
  }
}
let A = true;
function Le(e) {
  A = e;
}
function Se(e, t) {
  var a = t == null ? "" : typeof t == "object" ? t + "" : t;
  a !== (e.__t ?? (e.__t = e.nodeValue)) && (e.__t = a, e.nodeValue = a + "");
}
function fe(e, t) {
  return j(e, t);
}
function Ae(e, t) {
  k(), t.intro = t.intro ?? false;
  const a = t.target, o = L, n = v;
  try {
    for (var r = Y(a); r && (r.nodeType !== 8 || r.data !== z); ) r = F(r);
    if (!r) throw T;
    m(true), O(r), $();
    const u = j(e, { ...t, anchor: r });
    if (v === null || v.nodeType !== 8 || v.data !== G) throw U(), T;
    return m(false), u;
  } catch (u) {
    if (u === T) return t.recover === false && X(), k(), J(a), m(false), fe(e, t);
    throw u;
  } finally {
    m(o), O(n), ne();
  }
}
const h = /* @__PURE__ */ new Map();
function j(e, { target: t, anchor: a, props: o = {}, events: n, context: r, intro: u = true }) {
  k();
  var f = /* @__PURE__ */ new Set(), l = (c) => {
    for (var s = 0; s < c.length; s++) {
      var i = c[s];
      if (!f.has(i)) {
        f.add(i);
        var p = ce(i);
        t.addEventListener(i, y, { passive: p });
        var d = h.get(i);
        d === void 0 ? (document.addEventListener(i, y, { passive: p }), h.set(i, 1)) : h.set(i, d + 1);
      }
    }
  };
  l(K(D)), S.add(l);
  var _ = void 0, E = Q(() => {
    var c = a ?? t.appendChild(Z());
    return ee(() => {
      if (r) {
        te({});
        var s = re;
        s.c = r;
      }
      n && (o.$$events = n), L && oe(c, null), A = u, _ = e(c, o) || {}, A = true, L && (R.nodes_end = v), r && ae();
    }), () => {
      var _a;
      for (var s of f) {
        t.removeEventListener(s, y);
        var i = h.get(s);
        --i === 0 ? (document.removeEventListener(s, y), h.delete(s)) : h.set(s, i);
      }
      S.delete(l), c !== a && ((_a = c.parentNode) == null ? void 0 : _a.removeChild(c));
    };
  });
  return N.set(_, E), _;
}
let N = /* @__PURE__ */ new WeakMap();
function Ne(e, t) {
  const a = N.get(e);
  return a ? (N.delete(e), a(t)) : Promise.resolve();
}
export {
  Le as a,
  ve as b,
  M as c,
  ke as d,
  Te as e,
  be as f,
  de as g,
  Ae as h,
  me as i,
  ye as j,
  A as k,
  we as l,
  fe as m,
  ge as n,
  Ee as o,
  Se as s,
  Ne as u,
  x as w
};
