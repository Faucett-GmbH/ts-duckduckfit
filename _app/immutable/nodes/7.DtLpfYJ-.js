import { t as X, a as z } from "../chunks/C3b73btl.js";
import { p as ce, l as x, m as he, o as F, s, t as H, v as e, a as be, w as u, $ as xe, c as a, r } from "../chunks/DvcnV1Iy.js";
import { d as ge, e as we, s as v } from "../chunks/DxMSxYl-.js";
import { i as ye } from "../chunks/mt6aCfIN.js";
import { h as Ce } from "../chunks/CB6iZtqN.js";
import { d as $e, s as I, a as J, r as K, L as ke } from "../chunks/C8BfhpKI.js";
import { G as je, I as M, b as O, m as Se, C as L, v as N, a as qe } from "../chunks/BPcNmqJU.js";
import "../chunks/KzIwl7iM.js";
import { c as D, g as Ae, a as Be, d as Ge, e as Ie, i as Le, j as Ne, f as P, k as De, l as Ee, h as Re, __tla as __tla_0 } from "../chunks/C-o1sGLL.js";
import { g as Te } from "../chunks/BJXYr9_A.js";
import { b as Q } from "../chunks/B7qIyRxi.js";
let Ze;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const Ue = () => je((i = {}, m) => {
    m.length && (Se(m), L("username", P(), () => {
      N(i.username).isNotBlank();
    }), L("usernameConfirm", P(), () => {
      N(i.usernameConfirm).isNotBlank();
    }), L("usernameConfirm", De(), () => {
      N(i.usernameConfirm).equals(i.username);
    }));
  });
  function W(i, m, l) {
    m.add(i.currentTarget.name), l();
  }
  var Ve = X('<div class="mr-2 flex flex-row justify-center"><div class="inline-block h-6 w-6 animate-spin"><!></div></div>'), ze = X('<div class="flex flex-grow flex-col justify-end p-4 sm:justify-start"><div class="card mx-auto my-10 flex w-full flex-shrink flex-col sm:w-72"><h1> </h1> <p><span> </span> <a class="text-blue-500 underline"> </a></p> <form><div class="mb-2"><label for="username"> </label> <input type="text" name="username" autocomplete="username"> <!></div> <div class="mb-2"><label for="usernameConfirm"> </label> <input type="text" name="usernameConfirm"> <!></div> <div class="flex flex-row justify-end"><button type="submit" class="btn primary flex flex-shrink"><!> </button></div></form></div></div>');
  Ze = function(i, m) {
    ce(m, true);
    let l = x(""), _ = x(""), E = Ue(), p = x(he(E.get())), c = x(false), Y = F(() => e(c)), R = F(() => qe(e(p), {
      untested: "untested",
      tested: "tested",
      invalid: "invalid",
      valid: "valid",
      warning: "warning"
    }));
    const o = /* @__PURE__ */ new Set(), h = $e(() => {
      E({
        username: e(l),
        usernameConfirm: e(_)
      }, Array.from(o)).done((t) => {
        u(p, t, true);
      }), o.clear();
    }, 300);
    function Z() {
      o.add("username"), o.add("usernameConfirm"), h(), h.flush();
    }
    async function ee(t) {
      t.preventDefault();
      try {
        u(c, true), u(l, e(l).trim(), true), u(_, e(_).trim(), true), Z(), e(p).isValid() && (await Ee(e(l)), await Te(`${Q}/`));
      } catch (n) {
        Re(n);
      } finally {
        u(c, false);
      }
    }
    var g = ze();
    Ce((t) => {
      H((n) => xe.title = n, [
        () => D()
      ]);
    });
    var T = a(g), w = a(T), ae = a(w, true);
    r(w);
    var y = s(w, 2), C = a(y), re = a(C, true);
    r(C);
    var $ = s(C, 2);
    I($, "href", `${Q}/signin`);
    var te = a($, true);
    r($), r(y);
    var k = s(y, 2), j = a(k), S = a(j), se = a(S, true);
    r(S);
    var d = s(S, 2);
    K(d), d.__input = [
      W,
      o,
      h
    ];
    var ne = s(d, 2);
    M(ne, {
      name: "username",
      get result() {
        return e(p);
      }
    }), r(j);
    var q = s(j, 2), A = a(q), ie = a(A, true);
    r(A);
    var f = s(A, 2);
    K(f), f.__input = [
      W,
      o,
      h
    ];
    var le = s(f, 2);
    M(le, {
      name: "usernameConfirm",
      get result() {
        return e(p);
      }
    }), r(q);
    var U = s(q, 2), B = a(U), V = a(B);
    {
      var ue = (t) => {
        var n = Ve(), b = a(n), G = a(b);
        ke(G, {}), r(b), r(n), z(t, n);
      };
      ye(V, (t) => {
        e(c) && t(ue);
      });
    }
    var me = s(V);
    r(B), r(U), r(k), r(T), r(g), H((t, n, b, G, oe, de, fe, ve, _e, pe) => {
      v(ae, t), v(re, n), v(te, b), v(se, G), J(d, 1, `w-full ${oe ?? ""}`), I(d, "placeholder", de), v(ie, fe), J(f, 1, `w-full ${ve ?? ""}`), I(f, "placeholder", _e), B.disabled = e(Y), v(me, ` ${pe ?? ""}`);
    }, [
      () => D(),
      () => Ae(),
      () => Be(),
      () => Ge(),
      () => e(R)("username"),
      () => Ie(),
      () => Le(),
      () => e(R)("usernameConfirm"),
      () => Ne(),
      () => D()
    ]), we("submit", k, ee), O(d, () => e(l), (t) => u(l, t)), O(f, () => e(_), (t) => u(_, t)), z(i, g), be();
  };
  ge([
    "input"
  ]);
});
export {
  __tla,
  Ze as component
};
