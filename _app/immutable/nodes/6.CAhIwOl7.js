import { t as V, a as D } from "../chunks/B6QkkUhs.js";
import { p as aa, l as I, s as n, t as E, m as r, a as ea, $ as ta, o as N, c as a, v as d, r as e } from "../chunks/DjXzb9G0.js";
import { d as ra, e as sa, s as m } from "../chunks/4bD7ekPS.js";
import { i as ia } from "../chunks/uaSa8DrZ.js";
import { h as na } from "../chunks/D4G7nJdS.js";
import { d as la, s as R, a as oa, r as ua, L as da } from "../chunks/CYItWnOs.js";
import { G as ma, I as va, b as fa, a as pa, m as ca, C as _a, v as ha } from "../chunks/tpoyokEn.js";
import { p as S } from "../chunks/CLjcMQip.js";
import "../chunks/KzIwl7iM.js";
import { a as A, b as ba, c as xa, d as ga, e as ya, f as wa, s as $a, h as ka, __tla as __tla_0 } from "../chunks/rhqxRTuo.js";
import { g as ja } from "../chunks/CcUwkYoA.js";
import { b as T } from "../chunks/jfqPQL2J.js";
let Ha;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const Ca = () => ma((u = {}, l) => {
    l.length && (ca(l), _a("username", wa(), () => {
      ha(u.username).isNotBlank();
    }));
  });
  function Ia(u, l, i) {
    l.add(u.currentTarget.name), i();
  }
  var Sa = V('<div class="mr-2 flex flex-row justify-center"><div class="inline-block h-6 w-6 animate-spin"><!></div></div>'), Aa = V('<div class="flex flex-grow flex-col justify-end p-4 sm:justify-start"><div class="card mx-auto my-10 flex w-full flex-shrink flex-col sm:w-72"><h1> </h1> <p><span> </span> <a class="text-blue-500 underline"> </a></p> <form><div class="mb-2"><label for="username"> </label> <input type="text" name="username" autocomplete="username"> <!></div> <div class="flex flex-row justify-end"><button type="submit" class="btn primary flex flex-shrink"><!> </button></div></form></div></div>');
  Ha = function(u, l) {
    aa(l, true);
    let i = I(""), G = Ca(), v = I(S(G.get())), f = I(false), z = N(() => r(f)), F = N(() => pa(r(v), {
      untested: "untested",
      tested: "tested",
      invalid: "invalid",
      valid: "valid",
      warning: "warning"
    }));
    const p = /* @__PURE__ */ new Set(), _ = la(() => {
      G({
        username: r(i)
      }, Array.from(p)).done((t) => {
        d(v, S(t));
      }), p.clear();
    }, 300);
    function H() {
      p.add("username"), _(), _.flush();
    }
    async function J(t) {
      t.preventDefault();
      try {
        d(f, true), d(i, S(r(i).trim())), H(), r(v).isValid() && (await $a(r(i)), await ja(`${T}/`));
      } catch (s) {
        ka(s);
      } finally {
        d(f, false);
      }
    }
    var h = Aa();
    na((t) => {
      E((s) => ta.title = s, [
        () => A()
      ]);
    });
    var L = a(h), b = a(L), K = a(b, true);
    e(b);
    var x = n(b, 2), g = a(x), M = a(g, true);
    e(g);
    var y = n(g, 2);
    R(y, "href", `${T}/signup`);
    var O = a(y, true);
    e(y), e(x);
    var w = n(x, 2), $ = a(w), k = a($), P = a(k, true);
    e(k);
    var o = n(k, 2);
    ua(o), o.__input = [
      Ia,
      p,
      _
    ];
    var Q = n(o, 2);
    va(Q, {
      name: "username",
      get result() {
        return r(v);
      }
    }), e($);
    var q = n($, 2), j = a(q), B = a(j);
    {
      var U = (t) => {
        var s = Sa(), c = a(s), C = a(c);
        da(C, {}), e(c), e(s), D(t, s);
      };
      ia(B, (t) => {
        r(f) && t(U);
      });
    }
    var W = n(B);
    e(j), e(q), e(w), e(L), e(h), E((t, s, c, C, X, Y, Z) => {
      m(K, t), m(M, s), m(O, c), m(P, C), oa(o, 1, `w-full ${X ?? ""}`), R(o, "placeholder", Y), j.disabled = r(z), m(W, ` ${Z ?? ""}`);
    }, [
      () => A(),
      () => ba(),
      () => xa(),
      () => ga(),
      () => r(F)("username"),
      () => ya(),
      () => A()
    ]), sa("submit", w, J), fa(o, () => r(i), (t) => d(i, t)), D(u, h), ea();
  };
  ra([
    "input"
  ]);
});
export {
  __tla,
  Ha as component
};
