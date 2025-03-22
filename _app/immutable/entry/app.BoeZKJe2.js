const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["../nodes/0.DMcEZu0n.js","../chunks/C3b73btl.js","../chunks/DvcnV1Iy.js","../chunks/BoXaxE4i.js","../chunks/DxMSxYl-.js","../chunks/CB6iZtqN.js","../chunks/mt6aCfIN.js","../chunks/C8BfhpKI.js","../chunks/B2XQHBYJ.js","../chunks/KzIwl7iM.js","../chunks/C-o1sGLL.js","../chunks/BGOAb-lb.js","../chunks/B7qIyRxi.js","../chunks/CGmLTidH.js","../chunks/CJGhRLCx.js","../chunks/BJXYr9_A.js","../chunks/CYgJF_JY.js","../chunks/sZd4nsna.js","../assets/0.NQlnN2LW.css","../nodes/1.mVR0m9yL.js","../nodes/2.BQgFbycx.js","../chunks/B90CZVMX.js","../chunks/3NJf1Sbs.js","../nodes/3.CS6L5wzd.js","../nodes/4.-7_bf1kl.js","../nodes/5.DwRYxCCs.js","../chunks/BPcNmqJU.js","../nodes/6.D1wlsK4C.js","../nodes/7.DtLpfYJ-.js","../nodes/8.DkfMs4zy.js"])))=>i.map(i=>d[i]);
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
import { d as tt } from "../chunks/KzIwl7iM.js";
import { h as G, O as et, b as rt, E as st, d as at, T as nt, g as ot, w as C, a1 as it, v as l, aq as ct, ag as ut, _ as lt, p as dt, I as mt, D as ft, l as M, ar as _t, o as k, f as E, s as ht, a as vt, c as gt, r as Et, t as yt } from "../chunks/DvcnV1Iy.js";
import { h as Pt, m as bt, u as Rt, s as Ot } from "../chunks/DxMSxYl-.js";
import { t as Y, a as f, c as R, d as Lt } from "../chunks/C3b73btl.js";
import { p as S, i as V } from "../chunks/mt6aCfIN.js";
import { b as x } from "../chunks/CGmLTidH.js";
import { o as wt } from "../chunks/sZd4nsna.js";
let Xt, Ct, Kt, Qt, Vt, Wt, Ht, Yt, Jt;
let __tla = (async () => {
  var _e, _t2;
  function D(o, t, s) {
    G && et();
    var i = o, a, r;
    rt(() => {
      a !== (a = t()) && (r && (nt(r), r = null), a && (r = at(() => s(i, a))));
    }, st), G && (i = ot);
  }
  function At(o) {
    return class extends Tt {
      constructor(t) {
        super({
          component: o,
          ...t
        });
      }
    };
  }
  class Tt {
    constructor(t) {
      __privateAdd(this, _e);
      __privateAdd(this, _t2);
      var _a;
      var s = /* @__PURE__ */ new Map(), i = (r, e) => {
        var n = lt(e);
        return s.set(r, n), n;
      };
      const a = new Proxy({
        ...t.props || {},
        $$events: {}
      }, {
        get(r, e) {
          return l(s.get(e) ?? i(e, Reflect.get(r, e)));
        },
        has(r, e) {
          return e === it ? true : (l(s.get(e) ?? i(e, Reflect.get(r, e))), Reflect.has(r, e));
        },
        set(r, e, n) {
          return C(s.get(e) ?? i(e, n), n), Reflect.set(r, e, n);
        }
      });
      __privateSet(this, _t2, (t.hydrate ? Pt : bt)(t.component, {
        target: t.target,
        anchor: t.anchor,
        props: a,
        context: t.context,
        intro: t.intro ?? false,
        recover: t.recover
      })), (!((_a = t == null ? void 0 : t.props) == null ? void 0 : _a.$$host) || t.sync === false) && ct(), __privateSet(this, _e, a.$$events);
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
        Object.assign(a, r);
      }, __privateGet(this, _t2).$destroy = () => {
        Rt(__privateGet(this, _t2));
      };
    }
    $set(t) {
      __privateGet(this, _t2).$set(t);
    }
    $on(t, s) {
      __privateGet(this, _e)[t] = __privateGet(this, _e)[t] || [];
      const i = (...a) => s.call(this, ...a);
      return __privateGet(this, _e)[t].push(i), () => {
        __privateGet(this, _e)[t] = __privateGet(this, _e)[t].filter((a) => a !== i);
      };
    }
    $destroy() {
      __privateGet(this, _t2).$destroy();
    }
  }
  _e = new WeakMap();
  _t2 = new WeakMap();
  let pt, kt, W, _, xt;
  pt = "modulepreload";
  kt = function(o, t) {
    return new URL(o, t).href;
  };
  W = {};
  _ = function(t, s, i) {
    let a = Promise.resolve();
    if (s && s.length > 0) {
      const e = document.getElementsByTagName("link"), n = document.querySelector("meta[property=csp-nonce]"), O = (n == null ? void 0 : n.nonce) || (n == null ? void 0 : n.getAttribute("nonce"));
      a = Promise.allSettled(s.map((u) => {
        if (u = kt(u, i), u in W) return;
        W[u] = true;
        const h = u.endsWith(".css"), I = h ? '[rel="stylesheet"]' : "";
        if (!!i) for (let v = e.length - 1; v >= 0; v--) {
          const y = e[v];
          if (y.href === u && (!h || y.rel === "stylesheet")) return;
        }
        else if (document.querySelector(`link[href="${u}"]${I}`)) return;
        const d = document.createElement("link");
        if (d.rel = h ? "stylesheet" : pt, h || (d.as = "script"), d.crossOrigin = "", d.href = u, O && d.setAttribute("nonce", O), document.head.appendChild(d), h) return new Promise((v, y) => {
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
    return a.then((e) => {
      for (const n of e || []) n.status === "rejected" && r(n.reason);
      return t().catch(r);
    });
  };
  xt = (o) => tt(o.url).pathname;
  Wt = {};
  var Dt = Y('<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>'), It = Y("<!> <!>", 1);
  function St(o, t) {
    dt(t, true);
    let s = S(t, "components", 23, () => []), i = S(t, "data_0", 3, null), a = S(t, "data_1", 3, null), r = S(t, "data_2", 3, null);
    mt(() => t.stores.page.set(t.page)), ft(() => {
      t.stores, t.page, t.constructors, s(), t.form, i(), a(), r(), t.stores.page.notify();
    });
    let e = M(false), n = M(false), O = M(null);
    wt(() => {
      const c = t.stores.page.subscribe(() => {
        l(e) && (C(n, true), _t().then(() => {
          C(O, document.title || "untitled page", true);
        }));
      });
      return C(e, true), c;
    });
    const u = k(() => t.constructors[2]);
    var h = It(), I = E(h);
    {
      var U = (c) => {
        var m = R();
        const L = k(() => t.constructors[0]);
        var w = E(m);
        D(w, () => l(L), (g, P) => {
          x(P(g, {
            get data() {
              return i();
            },
            get form() {
              return t.form;
            },
            children: (A, jt) => {
              var F = R(), H = E(F);
              {
                var J = (b) => {
                  var T = R();
                  const j = k(() => t.constructors[1]);
                  var N = E(T);
                  D(N, () => l(j), (q, B) => {
                    x(B(q, {
                      get data() {
                        return a();
                      },
                      get form() {
                        return t.form;
                      },
                      children: (p, Nt) => {
                        var z = R(), Q = E(z);
                        D(Q, () => l(u), (X, Z) => {
                          x(Z(X, {
                            get data() {
                              return r();
                            },
                            get form() {
                              return t.form;
                            }
                          }), ($) => s()[2] = $, () => {
                            var _a;
                            return (_a = s()) == null ? void 0 : _a[2];
                          });
                        }), f(p, z);
                      },
                      $$slots: {
                        default: true
                      }
                    }), (p) => s()[1] = p, () => {
                      var _a;
                      return (_a = s()) == null ? void 0 : _a[1];
                    });
                  }), f(b, T);
                }, K = (b) => {
                  var T = R();
                  const j = k(() => t.constructors[1]);
                  var N = E(T);
                  D(N, () => l(j), (q, B) => {
                    x(B(q, {
                      get data() {
                        return a();
                      },
                      get form() {
                        return t.form;
                      }
                    }), (p) => s()[1] = p, () => {
                      var _a;
                      return (_a = s()) == null ? void 0 : _a[1];
                    });
                  }), f(b, T);
                };
                V(H, (b) => {
                  t.constructors[2] ? b(J) : b(K, false);
                });
              }
              f(A, F);
            },
            $$slots: {
              default: true
            }
          }), (A) => s()[0] = A, () => {
            var _a;
            return (_a = s()) == null ? void 0 : _a[0];
          });
        }), f(c, m);
      }, d = (c) => {
        var m = R();
        const L = k(() => t.constructors[0]);
        var w = E(m);
        D(w, () => l(L), (g, P) => {
          x(P(g, {
            get data() {
              return i();
            },
            get form() {
              return t.form;
            }
          }), (A) => s()[0] = A, () => {
            var _a;
            return (_a = s()) == null ? void 0 : _a[0];
          });
        }), f(c, m);
      };
      V(I, (c) => {
        t.constructors[1] ? c(U) : c(d, false);
      });
    }
    var v = ht(I, 2);
    {
      var y = (c) => {
        var m = Dt(), L = gt(m);
        {
          var w = (g) => {
            var P = Lt();
            yt(() => Ot(P, l(O))), f(g, P);
          };
          V(L, (g) => {
            l(n) && g(w);
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
  Yt = At(St);
  Ht = [
    () => _(() => import("../nodes/0.DMcEZu0n.js").then(async (m) => {
      await m.__tla;
      return m;
    }), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]), import.meta.url),
    () => _(() => import("../nodes/1.mVR0m9yL.js"), __vite__mapDeps([19,1,2,8,4,5,14,15,12,16,17]), import.meta.url),
    () => _(() => import("../nodes/2.BQgFbycx.js").then(async (m) => {
      await m.__tla;
      return m;
    }), __vite__mapDeps([20,10,2,11,9,21,16,12,22,1,3]), import.meta.url),
    () => _(() => import("../nodes/3.CS6L5wzd.js").then(async (m) => {
      await m.__tla;
      return m;
    }), __vite__mapDeps([23,10,2,11,9,21,16,22,1,3]), import.meta.url),
    () => _(() => import("../nodes/4.-7_bf1kl.js"), __vite__mapDeps([24,1,2,8,5,11,9]), import.meta.url),
    () => _(() => import("../nodes/5.DwRYxCCs.js").then(async (m) => {
      await m.__tla;
      return m;
    }), __vite__mapDeps([25,1,2,4,5,6,12,10,11,9,7,8,13,26]), import.meta.url),
    () => _(() => import("../nodes/6.D1wlsK4C.js").then(async (m) => {
      await m.__tla;
      return m;
    }), __vite__mapDeps([27,1,2,4,5,6,7,8,26,9,10,11,15,12,16,17]), import.meta.url),
    () => _(() => import("../nodes/7.DtLpfYJ-.js").then(async (m) => {
      await m.__tla;
      return m;
    }), __vite__mapDeps([28,1,2,4,5,6,7,8,26,9,10,11,15,12,16,17]), import.meta.url),
    () => _(() => import("../nodes/8.DkfMs4zy.js").then(async (m) => {
      await m.__tla;
      return m;
    }), __vite__mapDeps([29,10,2,11,9,21,16,12]), import.meta.url)
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
  Vt = {
    handleError: ({ error: o }) => {
      console.error(o);
    },
    reroute: xt || (() => {
    }),
    transport: {}
  };
  Ct = Object.fromEntries(Object.entries(Vt.transport).map(([o, t]) => [
    o,
    t.decode
  ]));
  Qt = false;
  Xt = (o, t) => Ct[o](t);
})();
export {
  __tla,
  Xt as decode,
  Ct as decoders,
  Kt as dictionary,
  Qt as hash,
  Vt as hooks,
  Wt as matchers,
  Ht as nodes,
  Yt as root,
  Jt as server_loads
};
