const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["../nodes/0.2GxuTSY8.js","../chunks/BZ0OIXfh.js","../chunks/Bvg94FyY.js","../chunks/B9Utavrs.js","../chunks/CpFI7FWg.js","../chunks/CM8RGjgJ.js","../chunks/IxRC03RJ.js","../chunks/2TLTvnjh.js","../chunks/D_MrbdsC.js","../chunks/C__qyGCH.js","../chunks/KzIwl7iM.js","../chunks/C-Z7SKhz.js","../chunks/BGOAb-lb.js","../chunks/BANrHyJh.js","../chunks/CYgJF_JY.js","../chunks/CRb5F5jM.js","../chunks/BPnHVCzW.js","../chunks/BzpYRo3t.js","../chunks/0-BqeobR.js","../assets/0.NQlnN2LW.css","../nodes/1.Cp2vlmyb.js","../nodes/2.DabKZBlY.js","../chunks/B90CZVMX.js","../chunks/BFTFq4aB.js","../nodes/3.Cepneeh-.js","../nodes/4.DEKt5Pzo.js","../nodes/5.Dh167Ebp.js","../nodes/6.DsllUZsl.js","../chunks/DGZ6-Z62.js","../nodes/7.CzhgqeWV.js","../nodes/8.BBwjWOu_.js"])))=>i.map(i=>d[i]);
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
import { d as tt } from "../chunks/KzIwl7iM.js";
import { h as G, X as et, b as rt, E as at, d as st, a0 as nt, g as ot, v as C, a7 as it, m as l, at as ct, ak as ut, a5 as lt, p as dt, Q as mt, N as ft, l as U, au as _t, f as E, s as ht, a as vt, c as gt, r as Et, o as T, t as yt } from "../chunks/Bvg94FyY.js";
import { h as Pt, m as bt, u as Rt, s as pt } from "../chunks/CpFI7FWg.js";
import { t as W, a as f, c as R, d as Lt } from "../chunks/BZ0OIXfh.js";
import { p as I, i as V } from "../chunks/IxRC03RJ.js";
import { p as Ot } from "../chunks/2TLTvnjh.js";
import { b as x } from "../chunks/BPnHVCzW.js";
import { o as At } from "../chunks/CRb5F5jM.js";
let $t, Nt, Kt, Zt, Ct, Xt, Ht, Yt, Jt;
let __tla = (async () => {
  var _e, _t2;
  function S(o, t, a) {
    G && et();
    var i = o, s, r;
    rt(() => {
      s !== (s = t()) && (r && (nt(r), r = null), s && (r = st(() => a(i, s))));
    }, at), G && (i = ot);
  }
  function kt(o) {
    return class extends wt {
      constructor(t) {
        super({
          component: o,
          ...t
        });
      }
    };
  }
  class wt {
    constructor(t) {
      __privateAdd(this, _e);
      __privateAdd(this, _t2);
      var _a;
      var a = /* @__PURE__ */ new Map(), i = (r, e) => {
        var n = lt(e);
        return a.set(r, n), n;
      };
      const s = new Proxy({
        ...t.props || {},
        $$events: {}
      }, {
        get(r, e) {
          return l(a.get(e) ?? i(e, Reflect.get(r, e)));
        },
        has(r, e) {
          return e === it ? true : (l(a.get(e) ?? i(e, Reflect.get(r, e))), Reflect.has(r, e));
        },
        set(r, e, n) {
          return C(a.get(e) ?? i(e, n), n), Reflect.set(r, e, n);
        }
      });
      __privateSet(this, _t2, (t.hydrate ? Pt : bt)(t.component, {
        target: t.target,
        anchor: t.anchor,
        props: s,
        context: t.context,
        intro: t.intro ?? false,
        recover: t.recover
      })), (!((_a = t == null ? void 0 : t.props) == null ? void 0 : _a.$$host) || t.sync === false) && ct(), __privateSet(this, _e, s.$$events);
      for (const r of Object.keys(__privateGet(this, _t2))) r === "$set" || r === "$destroy" || r === "$on" || ut(this, r, {
        get() {
          return __privateGet(this, _t2)[r];
        },
        set(e) {
          __privateGet(this, _t2)[r] = e;
        },
        enumerable: true
      });
      __privateGet(this, _t2).$set = (r) => {
        Object.assign(s, r);
      }, __privateGet(this, _t2).$destroy = () => {
        Rt(__privateGet(this, _t2));
      };
    }
    $set(t) {
      __privateGet(this, _t2).$set(t);
    }
    $on(t, a) {
      __privateGet(this, _e)[t] = __privateGet(this, _e)[t] || [];
      const i = (...s) => a.call(this, ...s);
      return __privateGet(this, _e)[t].push(i), () => {
        __privateGet(this, _e)[t] = __privateGet(this, _e)[t].filter((s) => s !== i);
      };
    }
    $destroy() {
      __privateGet(this, _t2).$destroy();
    }
  }
  _e = new WeakMap();
  _t2 = new WeakMap();
  let Tt, xt, Q, _, St;
  Tt = "modulepreload";
  xt = function(o, t) {
    return new URL(o, t).href;
  };
  Q = {};
  _ = function(t, a, i) {
    let s = Promise.resolve();
    if (a && a.length > 0) {
      const e = document.getElementsByTagName("link"), n = document.querySelector("meta[property=csp-nonce]"), p = (n == null ? void 0 : n.nonce) || (n == null ? void 0 : n.getAttribute("nonce"));
      s = Promise.allSettled(a.map((u) => {
        if (u = xt(u, i), u in Q) return;
        Q[u] = true;
        const h = u.endsWith(".css"), D = h ? '[rel="stylesheet"]' : "";
        if (!!i) for (let v = e.length - 1; v >= 0; v--) {
          const y = e[v];
          if (y.href === u && (!h || y.rel === "stylesheet")) return;
        }
        else if (document.querySelector(`link[href="${u}"]${D}`)) return;
        const d = document.createElement("link");
        if (d.rel = h ? "stylesheet" : Tt, h || (d.as = "script"), d.crossOrigin = "", d.href = u, p && d.setAttribute("nonce", p), document.head.appendChild(d), h) return new Promise((v, y) => {
          d.addEventListener("load", v), d.addEventListener("error", () => y(new Error(`Unable to preload CSS for ${u}`)));
        });
      }));
    }
    function r(e) {
      const n = new Event("vite:preloadError", {
        cancelable: true
      });
      if (n.payload = e, window.dispatchEvent(n), !n.defaultPrevented) throw e;
    }
    return s.then((e) => {
      for (const n of e || []) n.status === "rejected" && r(n.reason);
      return t().catch(r);
    });
  };
  St = (o) => tt(o.url).pathname;
  Xt = {};
  var Dt = W('<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>'), It = W("<!> <!>", 1);
  function Vt(o, t) {
    dt(t, true);
    let a = I(t, "components", 23, () => []), i = I(t, "data_0", 3, null), s = I(t, "data_1", 3, null), r = I(t, "data_2", 3, null);
    mt(() => t.stores.page.set(t.page)), ft(() => {
      t.stores, t.page, t.constructors, a(), t.form, i(), s(), r(), t.stores.page.notify();
    });
    let e = U(false), n = U(false), p = U(null);
    At(() => {
      const c = t.stores.page.subscribe(() => {
        l(e) && (C(n, true), _t().then(() => {
          C(p, Ot(document.title || "untitled page"));
        }));
      });
      return C(e, true), c;
    });
    const u = T(() => t.constructors[2]);
    var h = It(), D = E(h);
    {
      var q = (c) => {
        var m = R();
        const L = T(() => t.constructors[0]);
        var O = E(m);
        S(O, () => l(L), (g, P) => {
          x(P(g, {
            get data() {
              return i();
            },
            get form() {
              return t.form;
            },
            children: (A, jt) => {
              var F = R(), X = E(F);
              {
                var Y = (b) => {
                  var k = R();
                  const N = T(() => t.constructors[1]);
                  var j = E(k);
                  S(j, () => l(N), (B, M) => {
                    x(M(B, {
                      get data() {
                        return s();
                      },
                      get form() {
                        return t.form;
                      },
                      children: (w, Bt) => {
                        var z = R(), J = E(z);
                        S(J, () => l(u), (K, Z) => {
                          x(Z(K, {
                            get data() {
                              return r();
                            },
                            get form() {
                              return t.form;
                            }
                          }), ($) => a()[2] = $, () => {
                            var _a;
                            return (_a = a()) == null ? void 0 : _a[2];
                          });
                        }), f(w, z);
                      },
                      $$slots: {
                        default: true
                      }
                    }), (w) => a()[1] = w, () => {
                      var _a;
                      return (_a = a()) == null ? void 0 : _a[1];
                    });
                  }), f(b, k);
                }, H = (b) => {
                  var k = R();
                  const N = T(() => t.constructors[1]);
                  var j = E(k);
                  S(j, () => l(N), (B, M) => {
                    x(M(B, {
                      get data() {
                        return s();
                      },
                      get form() {
                        return t.form;
                      }
                    }), (w) => a()[1] = w, () => {
                      var _a;
                      return (_a = a()) == null ? void 0 : _a[1];
                    });
                  }), f(b, k);
                };
                V(X, (b) => {
                  t.constructors[2] ? b(Y) : b(H, false);
                });
              }
              f(A, F);
            },
            $$slots: {
              default: true
            }
          }), (A) => a()[0] = A, () => {
            var _a;
            return (_a = a()) == null ? void 0 : _a[0];
          });
        }), f(c, m);
      }, d = (c) => {
        var m = R();
        const L = T(() => t.constructors[0]);
        var O = E(m);
        S(O, () => l(L), (g, P) => {
          x(P(g, {
            get data() {
              return i();
            },
            get form() {
              return t.form;
            }
          }), (A) => a()[0] = A, () => {
            var _a;
            return (_a = a()) == null ? void 0 : _a[0];
          });
        }), f(c, m);
      };
      V(D, (c) => {
        t.constructors[1] ? c(q) : c(d, false);
      });
    }
    var v = ht(D, 2);
    {
      var y = (c) => {
        var m = Dt(), L = gt(m);
        {
          var O = (g) => {
            var P = Lt();
            yt(() => pt(P, l(p))), f(g, P);
          };
          V(L, (g) => {
            l(n) && g(O);
          });
        }
        Et(m), f(c, m);
      };
      V(v, (c) => {
        l(e) && c(y);
      });
    }
    f(o, h), vt();
  }
  Yt = kt(Vt);
  Ht = [
    () => _(() => import("../nodes/0.2GxuTSY8.js").then(async (m) => {
      await m.__tla;
      return m;
    }), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]), import.meta.url),
    () => _(() => import("../nodes/1.Cp2vlmyb.js"), __vite__mapDeps([20,1,2,9,4,5,18,13,14,15]), import.meta.url),
    () => _(() => import("../nodes/2.DabKZBlY.js").then(async (m) => {
      await m.__tla;
      return m;
    }), __vite__mapDeps([21,11,2,12,10,7,22,14,23,1,3]), import.meta.url),
    () => _(() => import("../nodes/3.Cepneeh-.js").then(async (m) => {
      await m.__tla;
      return m;
    }), __vite__mapDeps([24,11,2,12,10,7,22,14,23,1,3]), import.meta.url),
    () => _(() => import("../nodes/4.DEKt5Pzo.js"), __vite__mapDeps([25,1,2,9,5,12,10]), import.meta.url),
    () => _(() => import("../nodes/5.Dh167Ebp.js").then(async (m) => {
      await m.__tla;
      return m;
    }), __vite__mapDeps([26,1,2,4,5,6,7,8,9,16,11,12,10]), import.meta.url),
    () => _(() => import("../nodes/6.DsllUZsl.js").then(async (m) => {
      await m.__tla;
      return m;
    }), __vite__mapDeps([27,1,2,4,5,6,7,8,9,28,10,11,12,13,14,15,17]), import.meta.url),
    () => _(() => import("../nodes/7.CzhgqeWV.js").then(async (m) => {
      await m.__tla;
      return m;
    }), __vite__mapDeps([29,1,2,4,5,6,7,8,9,28,10,11,12,13,14,15,17]), import.meta.url),
    () => _(() => import("../nodes/8.BBwjWOu_.js").then(async (m) => {
      await m.__tla;
      return m;
    }), __vite__mapDeps([30,11,2,12,10,7,22,14]), import.meta.url)
  ];
  Jt = [];
  Kt = {
    "/(authed)": [
      4,
      [
        2
      ]
    ],
    "/(authed)/profile": [
      5,
      [
        2
      ]
    ],
    "/(unauthed)/signin": [
      6,
      [
        3
      ]
    ],
    "/(unauthed)/signup": [
      7,
      [
        3
      ]
    ],
    "/(unauthed)/sync": [
      8,
      [
        3
      ]
    ]
  };
  Ct = {
    handleError: ({ error: o }) => {
      console.error(o);
    },
    reroute: St || (() => {
    }),
    transport: {}
  };
  Nt = Object.fromEntries(Object.entries(Ct.transport).map(([o, t]) => [
    o,
    t.decode
  ]));
  Zt = false;
  $t = (o, t) => Nt[o](t);
})();
export {
  __tla,
  $t as decode,
  Nt as decoders,
  Kt as dictionary,
  Zt as hash,
  Ct as hooks,
  Xt as matchers,
  Ht as nodes,
  Yt as root,
  Jt as server_loads
};
