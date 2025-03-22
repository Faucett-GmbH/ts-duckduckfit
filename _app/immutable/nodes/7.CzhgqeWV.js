import { t as Y, a as F } from "../chunks/BZ0OIXfh.js";
import { p as he, l as x, s, t as H, m as e, a as be, v as m, $ as xe, c as a, o as J, r } from "../chunks/Bvg94FyY.js";
import { d as ge, e as ye, s as v } from "../chunks/CpFI7FWg.js";
import { i as Ce } from "../chunks/IxRC03RJ.js";
import { h as we } from "../chunks/CM8RGjgJ.js";
import { s as L, a as K, r as M, L as $e } from "../chunks/D_MrbdsC.js";
import { G as ke, I as O, b as P, m as je, C as N, v as D, a as Se } from "../chunks/DGZ6-Z62.js";
import { p as g } from "../chunks/2TLTvnjh.js";
import "../chunks/KzIwl7iM.js";
import { c as E, g as qe, a as Ae, d as Be, e as Ge, i as Ie, j as Le, f as Q, k as Ne, l as De, h as Ee, __tla as __tla_0 } from "../chunks/C-Z7SKhz.js";
import { b as W, g as Re } from "../chunks/BANrHyJh.js";
import { d as Te } from "../chunks/BzpYRo3t.js";
let ea;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const Ue = () => ke((i = {}, o) => {
    o.length && (je(o), N("username", Q(), () => {
      D(i.username).isNotBlank();
    }), N("usernameConfirm", Q(), () => {
      D(i.usernameConfirm).isNotBlank();
    }), N("usernameConfirm", Ne(), () => {
      D(i.usernameConfirm).equals(i.username);
    }));
  });
  function X(i, o, l) {
    o.add(i.currentTarget.name), l();
  }
  var Ve = Y('<div class="mr-2 flex flex-row justify-center"><div class="inline-block h-6 w-6 animate-spin"><!></div></div>'), ze = Y('<div class="flex flex-grow flex-col justify-end p-4 sm:justify-start"><div class="card mx-auto my-10 flex w-full flex-shrink flex-col sm:w-72"><h1> </h1> <p><span> </span> <a class="text-blue-500 underline"> </a></p> <form><div class="mb-2"><label for="username"> </label> <input type="text" name="username" autocomplete="username"> <!></div> <div class="mb-2"><label for="usernameConfirm"> </label> <input type="text" name="usernameConfirm"> <!></div> <div class="flex flex-row justify-end"><button type="submit" class="btn primary flex flex-shrink"><!> </button></div></form></div></div>');
  ea = function(i, o) {
    he(o, true);
    let l = x(""), p = x(""), R = Ue(), _ = x(g(R.get())), c = x(false), Z = J(() => e(c)), T = J(() => Se(e(_), {
      untested: "untested",
      tested: "tested",
      invalid: "invalid",
      valid: "valid",
      warning: "warning"
    }));
    const u = /* @__PURE__ */ new Set(), h = Te(() => {
      R({
        username: e(l),
        usernameConfirm: e(p)
      }, Array.from(u)).done((t) => {
        m(_, g(t));
      }), u.clear();
    }, 300);
    function ee() {
      u.add("username"), u.add("usernameConfirm"), h(), h.flush();
    }
    async function ae(t) {
      t.preventDefault();
      try {
        m(c, true), m(l, g(e(l).trim())), m(p, g(e(p).trim())), ee(), e(_).isValid() && (await De(e(l)), await Re(`${W}/`));
      } catch (n) {
        Ee(n);
      } finally {
        m(c, false);
      }
    }
    var y = ze();
    we((t) => {
      H((n) => xe.title = n, [
        () => E()
      ]);
    });
    var U = a(y), C = a(U), re = a(C, true);
    r(C);
    var w = s(C, 2), $ = a(w), te = a($, true);
    r($);
    var k = s($, 2);
    L(k, "href", `${W}/signin`);
    var se = a(k, true);
    r(k), r(w);
    var j = s(w, 2), S = a(j), q = a(S), ne = a(q, true);
    r(q);
    var d = s(q, 2);
    M(d), d.__input = [
      X,
      u,
      h
    ];
    var ie = s(d, 2);
    O(ie, {
      name: "username",
      get result() {
        return e(_);
      }
    }), r(S);
    var A = s(S, 2), B = a(A), le = a(B, true);
    r(B);
    var f = s(B, 2);
    M(f), f.__input = [
      X,
      u,
      h
    ];
    var me = s(f, 2);
    O(me, {
      name: "usernameConfirm",
      get result() {
        return e(_);
      }
    }), r(A);
    var V = s(A, 2), G = a(V), z = a(G);
    {
      var oe = (t) => {
        var n = Ve(), b = a(n), I = a(b);
        $e(I, {}), r(b), r(n), F(t, n);
      };
      Ce(z, (t) => {
        e(c) && t(oe);
      });
    }
    var ue = s(z);
    r(G), r(V), r(j), r(U), r(y), H((t, n, b, I, de, fe, ve, pe, _e, ce) => {
      v(re, t), v(te, n), v(se, b), v(ne, I), K(d, 1, `w-full ${de ?? ""}`), L(d, "placeholder", fe), v(le, ve), K(f, 1, `w-full ${pe ?? ""}`), L(f, "placeholder", _e), G.disabled = e(Z), v(ue, ` ${ce ?? ""}`);
    }, [
      () => E(),
      () => qe(),
      () => Ae(),
      () => Be(),
      () => e(T)("username"),
      () => Ge(),
      () => Ie(),
      () => e(T)("usernameConfirm"),
      () => Le(),
      () => E()
    ]), ye("submit", j, ae), P(d, () => e(l), (t) => m(l, t)), P(f, () => e(p), (t) => m(p, t)), F(i, y), be();
  };
  ge([
    "input"
  ]);
});
export {
  __tla,
  ea as component
};
