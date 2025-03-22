var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
import { t as O, a as x, c as S, n as Wt } from "../chunks/BZ0OIXfh.js";
import { av as qt, b as Bt, h as it, X as Zt, aK as Ut, U as bt, az as st, F as xt, a5 as wt, d as kt, q as Lt, g as Gt, ah as et, ag as rt, aL as $t, O as Kt, _ as Vt, a0 as ct, at as Jt, j as nt, u as vt, k as Qt, V as Xt, aM as Yt, J as Nt, E as te, aN as ee, aO as re, ac as oe, n as q, aP as ae, aQ as ne, aR as ie, ai as se, au as dt, p as K, N as ut, t as U, a as V, c as b, r as y, m as D, l as ht, v as ot, s as E, f as z } from "../chunks/Bvg94FyY.js";
import { s as pt } from "../chunks/B9Utavrs.js";
import { k as ce, w as le, o as Ct, e as fe, d as gt, s as Y } from "../chunks/CpFI7FWg.js";
import { p as L, l as I, s as R, i as B } from "../chunks/IxRC03RJ.js";
import { c as de, a as G, s as Z, I as F, b as j, L as ue, d as Et, e as ve } from "../chunks/D_MrbdsC.js";
import { p as he } from "../chunks/2TLTvnjh.js";
import "../chunks/KzIwl7iM.js";
import { u as It, p as pe, q as ge, a as me, t as _e, v as ye, __tla as __tla_0 } from "../chunks/CeoYdeJ7.js";
import { b as tt } from "../chunks/BdWWhBHb.js";
import { b as Rt } from "../chunks/BPnHVCzW.js";
import { d as be } from "../chunks/BzpYRo3t.js";
import "../chunks/C__qyGCH.js";
import { n as xe, p as J } from "../chunks/CfLFzTHT.js";
import { g as we } from "../chunks/BXKgk3Hl.js";
let Pr, Mr;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  var _t, _e2, _r, _mt_instances, o_fn;
  const lt = 0, Q = 1, ft = 2;
  function ke(e, t, r, n, a) {
    it && Zt();
    var i = e, o = qt(), s = Kt, l = bt, v, f, d, m = (o ? xt : wt)(void 0), c = (o ? xt : wt)(void 0), h = false;
    function u(g, p) {
      h = true, p && (et(_), rt(_), $t(s));
      try {
        g === lt && r && (v ? Vt(v) : v = kt(() => r(i))), g !== lt && v && ct(v, () => v = null), g !== Q && f && ct(f, () => f = null), g !== ft && d && ct(d, () => d = null);
      } finally {
        p && ($t(null), rt(null), et(null), Jt());
      }
    }
    var _ = Bt(() => {
      if (l !== (l = t())) {
        if (Ut(l)) {
          var g = l;
          h = false, g.then((p) => {
            g === l && (st(m, p), u(Q, true));
          }, (p) => {
            if (g === l) throw st(c, p), u(ft, true), c.v;
          }), it ? r && (v = kt(() => r(i))) : Lt(() => {
            h || u(lt, true);
          });
        } else st(m, l), u(Q, false);
        return () => l = bt;
      }
    });
    it && (i = Gt);
  }
  function zt(e, t, r) {
    nt(() => {
      var n = vt(() => t(e, r == null ? void 0 : r()) || {});
      if (r && (n == null ? void 0 : n.update)) {
        var a = false, i = {};
        Qt(() => {
          var o = r();
          Xt(o), a && Yt(i, o) && (i = o, n.update(o));
        }), a = true;
      }
      if (n == null ? void 0 : n.destroy) return () => n.destroy();
    });
  }
  const $e = () => performance.now(), P = {
    tick: (e) => requestAnimationFrame(e),
    now: () => $e(),
    tasks: /* @__PURE__ */ new Set()
  };
  function Ft() {
    const e = P.now();
    P.tasks.forEach((t) => {
      t.c(e) || (P.tasks.delete(t), t.f());
    }), P.tasks.size !== 0 && P.tick(Ft);
  }
  function Ne(e) {
    let t;
    return P.tasks.size === 0 && P.tick(Ft), {
      promise: new Promise((r) => {
        P.tasks.add(t = {
          c: e,
          f: r
        });
      }),
      abort() {
        P.tasks.delete(t);
      }
    };
  }
  function X(e, t) {
    le(() => {
      e.dispatchEvent(new CustomEvent(t));
    });
  }
  function Ce(e) {
    if (e === "float") return "cssFloat";
    if (e === "offset") return "cssOffset";
    if (e.startsWith("--")) return e;
    const t = e.split("-");
    return t.length === 1 ? t[0] : t[0] + t.slice(1).map((r) => r[0].toUpperCase() + r.slice(1)).join("");
  }
  function Ot(e) {
    const t = {}, r = e.split(";");
    for (const n of r) {
      const [a, i] = n.split(":");
      if (!a || i === void 0) break;
      const o = Ce(a.trim());
      t[o] = i.trim();
    }
    return t;
  }
  const Ee = (e) => e;
  function ze(e, t, r) {
    var n = de, a, i, o, s = null;
    n.a ?? (n.a = {
      element: e,
      measure() {
        a = this.element.getBoundingClientRect();
      },
      apply() {
        if (o == null ? void 0 : o.abort(), i = this.element.getBoundingClientRect(), a.left !== i.left || a.right !== i.right || a.top !== i.top || a.bottom !== i.bottom) {
          const l = t()(this.element, {
            from: a,
            to: i
          }, r == null ? void 0 : r());
          o = at(this.element, l, void 0, 1, () => {
            o == null ? void 0 : o.abort(), o = void 0;
          });
        }
      },
      fix() {
        if (!e.getAnimations().length) {
          var { position: l, width: v, height: f } = getComputedStyle(e);
          if (l !== "absolute" && l !== "fixed") {
            var d = e.style;
            s = {
              position: d.position,
              width: d.width,
              height: d.height,
              transform: d.transform
            }, d.position = "absolute", d.width = v, d.height = f;
            var m = e.getBoundingClientRect();
            if (a.left !== m.left || a.top !== m.top) {
              var c = `translate(${a.left - m.left}px, ${a.top - m.top}px)`;
              d.transform = d.transform ? `${d.transform} ${c}` : c;
            }
          }
        }
      },
      unfix() {
        if (s) {
          var l = e.style;
          l.position = s.position, l.width = s.width, l.height = s.height, l.transform = s.transform;
        }
      }
    }), n.a.element = e;
  }
  function Tt(e, t, r, n) {
    var a = (e & ne) !== 0, i = (e & ie) !== 0, o = a && i, s = (e & ae) !== 0, l = o ? "both" : a ? "in" : "out", v, f = t.inert, d = t.style.overflow, m, c;
    function h() {
      var $ = se, T = Nt;
      rt(null), et(null);
      try {
        return v ?? (v = r()(t, (n == null ? void 0 : n()) ?? {}, {
          direction: l
        }));
      } finally {
        rt($), et(T);
      }
    }
    var u = {
      is_global: s,
      in() {
        var _a;
        if (t.inert = f, !a) {
          c == null ? void 0 : c.abort(), (_a = c == null ? void 0 : c.reset) == null ? void 0 : _a.call(c);
          return;
        }
        i || (m == null ? void 0 : m.abort()), X(t, "introstart"), m = at(t, h(), c, 1, () => {
          X(t, "introend"), m == null ? void 0 : m.abort(), m = v = void 0, t.style.overflow = d;
        });
      },
      out($) {
        if (!i) {
          $ == null ? void 0 : $(), v = void 0;
          return;
        }
        t.inert = true, X(t, "outrostart"), c = at(t, h(), m, 0, () => {
          X(t, "outroend"), $ == null ? void 0 : $();
        });
      },
      stop: () => {
        m == null ? void 0 : m.abort(), c == null ? void 0 : c.abort();
      }
    }, _ = Nt;
    if ((_.transitions ?? (_.transitions = [])).push(u), a && ce) {
      var g = s;
      if (!g) {
        for (var p = _.parent; p && (p.f & te) !== 0; ) for (; (p = p.parent) && (p.f & ee) === 0; ) ;
        g = !p || (p.f & re) !== 0;
      }
      g && nt(() => {
        vt(() => u.in());
      });
    }
  }
  function at(e, t, r, n, a) {
    var i = n === 1;
    if (oe(t)) {
      var o, s = false;
      return Lt(() => {
        if (!s) {
          var _ = t({
            direction: i ? "in" : "out"
          });
          o = at(e, _, r, n, a);
        }
      }), {
        abort: () => {
          s = true, o == null ? void 0 : o.abort();
        },
        deactivate: () => o.deactivate(),
        reset: () => o.reset(),
        t: () => o.t()
      };
    }
    if (r == null ? void 0 : r.deactivate(), !(t == null ? void 0 : t.duration)) return a(), {
      abort: q,
      deactivate: q,
      reset: q,
      t: () => n
    };
    const { delay: l = 0, css: v, tick: f, easing: d = Ee } = t;
    var m = [];
    if (i && r === void 0 && (f && f(0, 1), v)) {
      var c = Ot(v(0, 1));
      m.push(c, c);
    }
    var h = () => 1 - n, u = e.animate(m, {
      duration: l
    });
    return u.onfinish = () => {
      var _ = (r == null ? void 0 : r.t()) ?? 1 - n;
      r == null ? void 0 : r.abort();
      var g = n - _, p = t.duration * Math.abs(g), $ = [];
      if (p > 0) {
        var T = false;
        if (v) for (var N = Math.ceil(p / 16.666666666666668), w = 0; w <= N; w += 1) {
          var k = _ + g * d(w / N), M = Ot(v(k, 1 - k));
          $.push(M), T || (T = M.overflow === "hidden");
        }
        T && (e.style.overflow = "hidden"), h = () => {
          var C = u.currentTime;
          return _ + g * d(C / p);
        }, f && Ne(() => {
          if (u.playState !== "running") return false;
          var C = h();
          return f(C, 1 - C), true;
        });
      }
      u = e.animate($, {
        duration: p,
        fill: "forwards"
      }), u.onfinish = () => {
        h = () => n, f == null ? void 0 : f(n, 1 - n), a();
      };
    }, {
      abort: () => {
        u && (u.cancel(), u.effect = null, u.onfinish = q);
      },
      deactivate: () => {
        a = q;
      },
      reset: () => {
        n === 0 && (f == null ? void 0 : f(1, 0));
      },
      t: () => h()
    };
  }
  const _mt = class _mt {
    constructor(t) {
      __privateAdd(this, _mt_instances);
      __privateAdd(this, _t, /* @__PURE__ */ new WeakMap());
      __privateAdd(this, _e2);
      __privateAdd(this, _r);
      __privateSet(this, _r, t);
    }
    observe(t, r) {
      var n = __privateGet(this, _t).get(t) || /* @__PURE__ */ new Set();
      return n.add(r), __privateGet(this, _t).set(t, n), __privateMethod(this, _mt_instances, o_fn).call(this).observe(t, __privateGet(this, _r)), () => {
        var a = __privateGet(this, _t).get(t);
        a.delete(r), a.size === 0 && (__privateGet(this, _t).delete(t), __privateGet(this, _e2).unobserve(t));
      };
    }
  };
  _t = new WeakMap();
  _e2 = new WeakMap();
  _r = new WeakMap();
  _mt_instances = new WeakSet();
  o_fn = function() {
    return __privateGet(this, _e2) ?? __privateSet(this, _e2, new ResizeObserver((t) => {
      for (var r of t) {
        _mt.entries.set(r.target, r);
        for (var n of __privateGet(this, _t).get(r.target) || []) n(r);
      }
    }));
  };
  __publicField(_mt, "entries", /* @__PURE__ */ new WeakMap());
  let mt = _mt;
  var Oe = new mt({
    box: "border-box"
  });
  function Te(e, t, r) {
    var n = Oe.observe(e, () => r(e[t]));
    nt(() => (vt(() => r(e[t])), n));
  }
  let Me, Pe, Se;
  Me = true;
  Pe = true;
  Se = async (e) => {
    await e.parent();
  };
  Mr = Object.freeze(Object.defineProperty({
    __proto__: null,
    load: Se,
    prerender: Me,
    ssr: Pe
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  function Le(e, t = {
    enabled: true
  }) {
    let { enabled: r, eventType: n, nodeForEvent: a, options: i } = Mt(t);
    function o(l) {
      l.target && e && !e.contains(l.target) && !l.defaultPrevented && e.dispatchEvent(new CustomEvent("clickoutside", {
        detail: l
      }));
    }
    let s;
    return t.enabled !== false && (s = Ct(a, n, o, i)), {
      update(l) {
        s == null ? void 0 : s(), { enabled: r, eventType: n, nodeForEvent: a, options: i } = Mt(l), r && (s = Ct(a, n, o, i));
      },
      destroy() {
        s == null ? void 0 : s();
      }
    };
  }
  function Mt(e = {}) {
    var _a;
    return {
      enabled: e.enabled ?? true,
      nodeForEvent: ((_a = e.limit) == null ? void 0 : _a.parent) ?? document,
      eventType: e.event ?? "click",
      options: typeof e.options == "boolean" ? {
        capture: e.options
      } : e.options
    };
  }
  function Ie(e, t = "body") {
    let r;
    async function n(i) {
      if (t = i, typeof t == "string") {
        if (r = document.querySelector(t), r === null && (await dt(), r = document.querySelector(t)), r === null) throw new Error(`No element found matching css selector: "${t}"`);
      } else if (t instanceof HTMLElement) r = t;
      else throw new TypeError(`Unknown portal target type: ${t === null ? "null" : typeof t}. Allowed types: string (CSS selector) or HTMLElement.`);
      r.appendChild(e), e.hidden = false;
    }
    function a() {
      e.parentNode && e.parentNode.removeChild(e);
    }
    return n(t), {
      update: n,
      destroy: a
    };
  }
  var Re = O('<div role="menu" tabindex="-1"><!></div>');
  function Fe(e, t) {
    K(t, true);
    let r = L(t, "anchorPosition", 3, "bottom-right"), n = L(t, "position", 3, "top-right"), a = L(t, "open", 15, false), i = L(t, "closeOnClickOutside", 3, true), o, s = ht(0);
    ut(() => {
      t.anchor && o && a() && l();
    });
    async function l() {
      if (!a()) return;
      const c = t.anchor.getBoundingClientRect();
      switch (o.style.top = o.style.left = o.style.bottom = o.style.right = "", await dt(), r()) {
        case "top-left": {
          o.style.top = `${c.top}px`, o.style.left = `${c.left}px`;
          break;
        }
        case "top-right": {
          o.style.top = `${c.top}px`, o.style.right = `${t.anchor.ownerDocument.body.offsetWidth - c.right}px`;
          break;
        }
        case "top-center": {
          o.style.top = `${c.top}px`, o.style.left = `${c.left + c.width * 0.5 - D(s) * 0.5}px`;
          break;
        }
        case "bottom-right": {
          o.style.top = `${c.bottom}px`, o.style.right = `${t.anchor.ownerDocument.body.offsetWidth - c.right}px`;
          break;
        }
        case "bottom-left": {
          o.style.top = `${c.bottom}px`, o.style.left = `${c.left}px`;
          break;
        }
        case "bottom-center": {
          o.style.top = `${c.bottom}px`, o.style.left = `${c.left + c.width * 0.5 - D(s) * 0.5}px`;
          break;
        }
      }
      await dt();
      const h = o.getBoundingClientRect();
      h.left < 0 ? (o.style.right = "", o.style.left = "0px") : h.right > t.anchor.ownerDocument.body.offsetWidth && (o.style.right = "0px", o.style.left = ""), h.top < 0 ? o.style.top = "0px" : h.top > t.anchor.ownerDocument.body.offsetHeight && (o.style.top = "", o.style.bottom = "0px");
    }
    ut(() => {
      const c = be(l, 0);
      return window.addEventListener("resize", c), document.addEventListener("scroll", c, true), () => {
        window.removeEventListener("resize", c), document.removeEventListener("scroll", c, true);
      };
    });
    function v(c) {
      c.stopPropagation(), a() && a(false);
    }
    var f = Re();
    let d;
    var m = b(f);
    pt(m, () => t.children), y(f), Rt(f, (c) => o = c, () => o), nt(() => Te(f, "offsetWidth", (c) => ot(s, c))), zt(f, (c) => Ie == null ? void 0 : Ie(c)), zt(f, (c, h) => Le == null ? void 0 : Le(c, h), () => ({
      event: "pointerdown",
      enabled: i()
    })), U((c) => d = G(f, 1, "absolute flex max-h-full max-w-full flex-col border-gray-300 bg-gray-50 shadow-md transition-transform duration-75 focus:outline-none dark:border-gray-600 dark:bg-gray-700 z-20", null, d, c), [
      () => ({
        "scale-0": !a(),
        "scale-100": a(),
        "origin-top-right": n() === "top-right",
        "origin-top-left": n() === "top-left",
        "origin-top": n() === "top-center",
        "origin-bottom-right": n() === "bottom-right",
        "origin-bottom-left": n() === "bottom-left",
        "origin-bottom": n() === "bottom-center"
      })
    ]), fe("clickoutside", f, v), x(e, f), V();
  }
  function je(e, t) {
    e.preventDefault(), e.stopPropagation(), t(!t());
  }
  var Ae = O('<div><div class="flex min-w-fit flex-grow items-center justify-center"><!></div> <!></div>');
  function De(e, t) {
    K(t, true);
    let r = L(t, "name", 3, ""), n = L(t, "className", 3, ""), a = L(t, "open", 15, false), i = L(t, "closeOnClickOutside", 3, true), o = ht(void 0);
    var s = Ae(), l = b(s);
    l.__pointerdown = [
      je,
      a
    ];
    var v = b(l);
    pt(v, () => t.button), y(l);
    var f = E(l, 2);
    Fe(f, {
      get anchor() {
        return D(o);
      },
      get anchorPosition() {
        return t.anchorPosition;
      },
      get position() {
        return t.position;
      },
      get closeOnClickOutside() {
        return i();
      },
      get children() {
        return t.children;
      },
      get open() {
        return a();
      },
      set open(d) {
        a(d);
      }
    }), y(s), Rt(s, (d) => ot(o, d), () => D(o)), U(() => {
      G(s, 1, `static flex min-w-fit flex-col ${n() ?? ""}`), Z(l, "aria-label", r());
    }), x(e, s), V();
  }
  gt([
    "pointerdown"
  ]);
  function He(e, t) {
    const r = I(t, [
      "children",
      "$$slots",
      "$$events",
      "$$legacy"
    ]);
    F(e, R({
      name: "log-in"
    }, () => r, {
      iconNode: [
        [
          "path",
          {
            d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
          }
        ],
        [
          "polyline",
          {
            points: "10 17 15 12 10 7"
          }
        ],
        [
          "line",
          {
            x1: "15",
            x2: "3",
            y1: "12",
            y2: "12"
          }
        ]
      ],
      children: (a, i) => {
        var o = S(), s = z(o);
        j(s, t, "default", {}), x(a, o);
      },
      $$slots: {
        default: true
      }
    }));
  }
  function We(e, t) {
    const r = I(t, [
      "children",
      "$$slots",
      "$$events",
      "$$legacy"
    ]);
    F(e, R({
      name: "log-out"
    }, () => r, {
      iconNode: [
        [
          "path",
          {
            d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
          }
        ],
        [
          "polyline",
          {
            points: "16 17 21 12 16 7"
          }
        ],
        [
          "line",
          {
            x1: "21",
            x2: "9",
            y1: "12",
            y2: "12"
          }
        ]
      ],
      children: (a, i) => {
        var o = S(), s = z(o);
        j(s, t, "default", {}), x(a, o);
      },
      $$slots: {
        default: true
      }
    }));
  }
  function qe(e, t) {
    const r = I(t, [
      "children",
      "$$slots",
      "$$events",
      "$$legacy"
    ]);
    F(e, R({
      name: "user"
    }, () => r, {
      iconNode: [
        [
          "path",
          {
            d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
          }
        ],
        [
          "circle",
          {
            cx: "12",
            cy: "7",
            r: "4"
          }
        ]
      ],
      children: (a, i) => {
        var o = S(), s = z(o);
        j(s, t, "default", {}), x(a, o);
      },
      $$slots: {
        default: true
      }
    }));
  }
  function Be(e, t) {
    const r = I(t, [
      "children",
      "$$slots",
      "$$events",
      "$$legacy"
    ]);
    F(e, R({
      name: "menu"
    }, () => r, {
      iconNode: [
        [
          "line",
          {
            x1: "4",
            x2: "20",
            y1: "12",
            y2: "12"
          }
        ],
        [
          "line",
          {
            x1: "4",
            x2: "20",
            y1: "6",
            y2: "6"
          }
        ],
        [
          "line",
          {
            x1: "4",
            x2: "20",
            y1: "18",
            y2: "18"
          }
        ]
      ],
      children: (a, i) => {
        var o = S(), s = z(o);
        j(s, t, "default", {}), x(a, o);
      },
      $$slots: {
        default: true
      }
    }));
  }
  var Ze = Wt('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 523.49" fill="currentColor" class="svelte-1gdf6cp"><path d="M85.54,320.91h145.64c11,0,19.91,8.92,19.91,19.91h0c0,11-8.92,19.91-19.91,19.91H72.65c-8.54,0-23.99-1.96-31.42-5.36-15.88-7.26-25.82-23.16-27.36-39.86-.42-4.54-.84-9.09-1.47-13.61v-.06c-.73-5.18,5.5-8.28,9.26-4.64,5.11,4.96,12.19,10.17,21.98,14.68,13.12,6.05,27.46,9.01,41.91,9.01Z"></path><path d="M360.22,342.48c-.14-59.29-49.01-106.96-108.31-106.96h-28.89c-2.91,0-5.26,2.36-5.26,5.26v29.3c0,2.91,2.36,5.26,5.26,5.26h29.07c37.13,0,67.96,29.65,68.3,66.77.34,37.45-30.02,68.02-67.4,68.02H114.8c-11.66,0-21.11,9.45-21.11,21.11v14.12c0,2.54,2.06,4.6,4.6,4.6h154.7c59.21,0,107.37-48.24,107.22-107.49Z"></path><path d="M406.26,95.97c3.11,0,5.48-2.81,4.91-5.87-2.41-12.93-9.48-27.75-9.48-27.75C385.68,24.48,348.75,0,307.62,0,307.62,0,307.63,0,307.62,0,280.27,0,254.54,10.75,235.18,30.28c-19.37,19.53-29.9,45.36-29.67,72.72,0,.94.03,1.87.06,2.8,1.48,41.52,29.5,77.82,69.71,90.32l33.32,10.36.39.12c29.54,8.52,56.1,26.44,74.79,50.45,19.22,24.68,29.37,54.13,29.37,85.16,0,78-65.4,141.45-145.78,141.45h0c-11,0-19.91,8.92-19.91,19.91v15.26c0,2.57,2.08,4.66,4.66,4.66h15.26c49.48,0,96.02-18.79,131.05-52.91,35.18-34.26,54.55-79.85,54.55-128.37,0-39.98-13.06-77.89-37.77-109.63-23.78-30.54-57.5-53.33-94.98-64.19l-33.12-10.3c-24.09-7.49-40.86-29.07-41.74-53.72-.02-.57-.03-1.15-.04-1.72-.14-16.66,6.29-32.4,18.12-44.34,11.82-11.93,27.51-18.49,44.16-18.49,25.09,0,47.62,14.93,57.4,38.05l2.97,6.92c2.91,6.78,9.57,11.18,16.95,11.18h21.33Z"></path><path d="M375.85,108.76c-6.87,0-13.07-4.11-15.75-10.44h0c-4.28-10.13-15.97-14.87-26.1-10.58l-12.07,5.1c-3.46,1.47-5.08,5.46-3.62,8.93l5.1,12.07c8.93,21.11,29.51,34.75,52.43,34.75h93.22c17.08,0,30.93-13.85,30.93-30.93h0c0-4.91-3.98-8.9-8.9-8.9h-115.25Z"></path><path d="M179.13,234.87c-4.49-.34-11.57-1.07-17.85-2.61-42.82-11.45-74.3-36.05-93.68-71.5-6.69-12.25-10.89-24.12-13.51-33.87-3.81-14.17-16.37-24.23-31.02-24.95l-8.61-.42c-2.39-.12-4.47,1.63-4.77,4.01L.76,177.12c-4.62,31.93,12.43,62.53,38.71,80.32,13.96,9.45,30.24,14.45,47.07,14.45l74.75,3.06h17.47c2.72,0,4.93-2.21,4.93-4.93v-30.24c0-2.58-1.98-4.73-4.55-4.92Z"></path></svg>');
  function Ue(e) {
    var t = Ze();
    x(e, t);
  }
  const Ge = "" + new URL("../assets/logo-horizontal.TsqDIa3F.webp", import.meta.url).href;
  function Ke(e, t) {
    It.clear(), we(`${tt}/signin`), t();
  }
  var Ve = O('<div class="mr-2 flex flex-row justify-center"><div class="inline-block h-6 w-6 animate-spin"><!></div></div>'), Je = O('<button class="btn primary icon flex"><!></button>'), Qe = O('<a><!><span class="ms-4"> </span></a> <button class="flex cursor-pointer flex-row justify-between p-2 hover:bg-gray-200 dark:hover:bg-gray-600"><!><span class="ms-4"> </span></button>', 1), Xe = O('<a><!><span class="ms-4"> </span></a>'), Ye = O('<div class="flex flex-shrink flex-row justify-between border-b border-gray-100 bg-white dark:border-gray-900 dark:bg-gray-800"><div class="ms-2 flex flex-shrink flex-row items-center justify-center"><a class="btn flex flex-row items-center justify-center"><span class="inline-block h-8"><!></span> <img class="my-1 ms-2 inline-block h-6 max-sm:hidden" alt="DuckDuckFit"></a> <!></div> <div class="me-2 flex flex-shrink flex-row"><div class="flex flex-col content-center justify-center m-1"><!></div></div></div>');
  function tr(e, t) {
    K(t, true);
    let r = ht(false);
    function n() {
      ot(r, false);
    }
    var a = Ye(), i = b(a), o = b(i);
    Z(o, "href", `${tt}/`);
    var s = b(o), l = b(s);
    Ue(l), y(s);
    var v = E(s, 2);
    Z(v, "src", Ge), y(o);
    var f = E(o, 2);
    ke(f, () => xe.complete, (h) => {
      var u = Ve(), _ = b(u), g = b(_);
      ue(g, {}), y(_), y(u), x(h, u);
    }), y(i);
    var d = E(i, 2), m = b(d), c = b(m);
    De(c, {
      get open() {
        return D(r);
      },
      set open(u) {
        ot(r, he(u));
      },
      button: (u) => {
        var _ = Je(), g = b(_);
        Be(g, {}), y(_), x(u, _);
      },
      children: (u, _) => {
        var g = S(), p = z(g);
        {
          var $ = (N) => {
            var w = Qe(), k = z(w);
            Z(k, "href", `${tt}/profile`);
            let M;
            k.__click = n;
            var C = b(k);
            qe(C, {});
            var A = E(C), H = b(A, true);
            y(A), y(k);
            var W = E(k, 2);
            W.__click = [
              Ke,
              n
            ];
            var _t2 = b(W);
            We(_t2, {});
            var yt = E(_t2), jt = b(yt, true);
            y(yt), y(W), U((At, Dt, Ht) => {
              M = G(k, 1, Et({
                "default flex cursor-pointer flex-row justify-between p-2 hover:bg-gray-200 dark:hover:bg-gray-600": true,
                "bg-black bg-opacity-10": J.route.id === "/(authed)/signin"
              }), null, M, At), Y(H, Dt), Y(jt, Ht);
            }, [
              () => ({
                active: J.route.id === "/(authed)/signin"
              }),
              () => pe(),
              () => ge()
            ]), x(N, w);
          }, T = (N) => {
            var w = Xe();
            Z(w, "href", `${tt}/signin`);
            let k;
            w.__click = n;
            var M = b(w);
            He(M, {});
            var C = E(M), A = b(C, true);
            y(C), y(w), U((H, W) => {
              k = G(w, 1, Et({
                "default flex cursor-pointer flex-row justify-between p-2 hover:bg-gray-200 dark:hover:bg-gray-600": true,
                "bg-black bg-opacity-10": J.route.id === "/(authed)/signin"
              }), null, k, H), Y(A, W);
            }, [
              () => ({
                active: J.route.id === "/(authed)/signin"
              }),
              () => me()
            ]), x(N, w);
          };
          B(p, (N) => {
            It.documentId ? N($) : N(T, false);
          });
        }
        x(u, g);
      },
      $$slots: {
        button: true,
        default: true
      }
    }), y(m), y(d), y(a), x(e, a), V();
  }
  gt([
    "click"
  ]);
  function er(e) {
    const t = e - 1;
    return t * t * t + 1;
  }
  function Pt(e) {
    const t = typeof e == "string" && e.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
    return t ? [
      parseFloat(t[1]),
      t[2] || "px"
    ] : [
      e,
      "px"
    ];
  }
  function St(e, { delay: t = 0, duration: r = 400, easing: n = er, x: a = 0, y: i = 0, opacity: o = 0 } = {}) {
    const s = getComputedStyle(e), l = +s.opacity, v = s.transform === "none" ? "" : s.transform, f = l * (1 - o), [d, m] = Pt(a), [c, h] = Pt(i);
    return {
      delay: t,
      duration: r,
      easing: n,
      css: (u, _) => `
			transform: ${v} translate(${(1 - u) * d}${m}, ${(1 - u) * c}${h});
			opacity: ${l - f * _}`
    };
  }
  function rr(e) {
    const t = e - 1;
    return t * t * t + 1;
  }
  function or(e, { from: t, to: r }, n = {}) {
    var { delay: a = 0, duration: i = (w) => Math.sqrt(w) * 120, easing: o = rr } = n, s = getComputedStyle(e), l = s.transform === "none" ? "" : s.transform, [v, f] = s.transformOrigin.split(" ").map(parseFloat);
    v /= e.clientWidth, f /= e.clientHeight;
    var d = ar(e), m = e.clientWidth / r.width / d, c = e.clientHeight / r.height / d, h = t.left + t.width * v, u = t.top + t.height * f, _ = r.left + r.width * v, g = r.top + r.height * f, p = (h - _) * m, $ = (u - g) * c, T = t.width / r.width, N = t.height / r.height;
    return {
      delay: a,
      duration: typeof i == "function" ? i(Math.sqrt(p * p + $ * $)) : i,
      easing: o,
      css: (w, k) => {
        var M = k * p, C = k * $, A = w + k * T, H = w + k * N;
        return `transform: ${l} translate(${M}px, ${C}px) scale(${A}, ${H});`;
      }
    };
  }
  function ar(e) {
    if ("currentCSSZoom" in e) return e.currentCSSZoom;
    for (var t = e, r = 1; t !== null; ) r *= +getComputedStyle(t).zoom, t = t.parentElement;
    return r;
  }
  function nr(e, t) {
    const r = I(t, [
      "children",
      "$$slots",
      "$$events",
      "$$legacy"
    ]);
    F(e, R({
      name: "circle-x"
    }, () => r, {
      iconNode: [
        [
          "circle",
          {
            cx: "12",
            cy: "12",
            r: "10"
          }
        ],
        [
          "path",
          {
            d: "m15 9-6 6"
          }
        ],
        [
          "path",
          {
            d: "m9 9 6 6"
          }
        ]
      ],
      children: (a, i) => {
        var o = S(), s = z(o);
        j(s, t, "default", {}), x(a, o);
      },
      $$slots: {
        default: true
      }
    }));
  }
  function ir(e, t) {
    const r = I(t, [
      "children",
      "$$slots",
      "$$events",
      "$$legacy"
    ]);
    F(e, R({
      name: "circle-check"
    }, () => r, {
      iconNode: [
        [
          "circle",
          {
            cx: "12",
            cy: "12",
            r: "10"
          }
        ],
        [
          "path",
          {
            d: "m9 12 2 2 4-4"
          }
        ]
      ],
      children: (a, i) => {
        var o = S(), s = z(o);
        j(s, t, "default", {}), x(a, o);
      },
      $$slots: {
        default: true
      }
    }));
  }
  function sr(e, t) {
    const r = I(t, [
      "children",
      "$$slots",
      "$$events",
      "$$legacy"
    ]);
    F(e, R({
      name: "info"
    }, () => r, {
      iconNode: [
        [
          "circle",
          {
            cx: "12",
            cy: "12",
            r: "10"
          }
        ],
        [
          "path",
          {
            d: "M12 16v-4"
          }
        ],
        [
          "path",
          {
            d: "M12 8h.01"
          }
        ]
      ],
      children: (a, i) => {
        var o = S(), s = z(o);
        j(s, t, "default", {}), x(a, o);
      },
      $$slots: {
        default: true
      }
    }));
  }
  function cr(e, t) {
    const r = I(t, [
      "children",
      "$$slots",
      "$$events",
      "$$legacy"
    ]);
    F(e, R({
      name: "triangle-alert"
    }, () => r, {
      iconNode: [
        [
          "path",
          {
            d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"
          }
        ],
        [
          "path",
          {
            d: "M12 9v4"
          }
        ],
        [
          "path",
          {
            d: "M12 17h.01"
          }
        ]
      ],
      children: (a, i) => {
        var o = S(), s = z(o);
        j(s, t, "default", {}), x(a, o);
      },
      $$slots: {
        default: true
      }
    }));
  }
  function lr(e, t) {
    _e(t.notification.id);
  }
  var fr = O('<button><div class="mr-2 h-6 w-6 text-white"><!></div> <div class="flex-grow text-left text-white"> </div></button>');
  function dr(e, t) {
    K(t, true);
    var r = fr();
    let n;
    r.__click = [
      lr,
      t
    ];
    var a = b(r), i = b(a);
    {
      var o = (f) => {
        nr(f, {});
      }, s = (f, d) => {
        {
          var m = (h) => {
            ir(h, {});
          }, c = (h, u) => {
            {
              var _ = (p) => {
                sr(p, {});
              }, g = (p, $) => {
                {
                  var T = (N) => {
                    cr(N, {});
                  };
                  B(p, (N) => {
                    t.notification.type === "warning" && N(T);
                  }, $);
                }
              };
              B(h, (p) => {
                t.notification.type === "info" ? p(_) : p(g, false);
              }, u);
            }
          };
          B(f, (h) => {
            t.notification.type === "success" ? h(m) : h(c, false);
          }, d);
        }
      };
      B(i, (f) => {
        t.notification.type === "error" ? f(o) : f(s, false);
      });
    }
    y(a);
    var l = E(a, 2), v = b(l, true);
    y(l), y(r), U((f) => {
      n = G(r, 1, "m-1 flex flex-grow cursor-pointer flex-row items-center px-3 py-2 shadow", null, n, f), Y(v, t.notification.message);
    }, [
      () => ({
        "bg-green-600": t.notification.type === "success",
        "bg-red-600": t.notification.type === "error",
        "bg-blue-600": t.notification.type === "info",
        "bg-yellow-600": t.notification.type === "warning"
      })
    ]), x(e, r), V();
  }
  gt([
    "click"
  ]);
  var ur = O("<div><!></div>"), vr = O('<div class="fixed left-1/2 top-0 z-[100000] -translate-x-1/2"><div class="flex flex-col"></div></div>');
  function hr(e) {
    var t = vr(), r = b(t);
    ve(r, 13, () => ye, (n) => n.id, (n, a) => {
      var i = ur(), o = b(i);
      dr(o, {
        get notification() {
          return D(a);
        }
      }), y(i), ze(i, () => or, null), Tt(1, i, () => St, () => ({
        y: -64,
        duration: 300
      })), Tt(2, i, () => St, () => ({
        y: -64,
        duration: 300
      })), x(n, i);
    }), y(r), y(t), x(e, t);
  }
  var pr = O("<!> <!> <!>", 1);
  Pr = function(e, t) {
    K(t, true), ut(() => {
      document.body.classList.add("hydrated");
    });
    var r = pr(), n = z(r);
    tr(n, {});
    var a = E(n, 2);
    pt(a, () => t.children);
    var i = E(a, 2);
    hr(i), x(e, r), V();
  };
});
export {
  __tla,
  Pr as component,
  Mr as universal
};
