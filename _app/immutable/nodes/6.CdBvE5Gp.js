import { t as V, a as D } from "../chunks/BZ0OIXfh.js";
import { p as aa, l as I, s as n, t as E, m as r, a as ea, $ as ta, o as N, c as a, v as m, r as e } from "../chunks/Bvg94FyY.js";
import { d as ra, e as sa, s as d } from "../chunks/CpFI7FWg.js";
import { i as ia } from "../chunks/IxRC03RJ.js";
import { h as na } from "../chunks/CM8RGjgJ.js";
import { s as R, a as la, r as oa, L as ua } from "../chunks/D_MrbdsC.js";
import { G as ma, I as da, b as va, a as fa, m as pa, C as ca, v as _a } from "../chunks/DGZ6-Z62.js";
import { p as S } from "../chunks/2TLTvnjh.js";
import "../chunks/KzIwl7iM.js";
import { a as A, b as ha, c as ba, d as xa, e as ga, f as ya, s as wa, h as $a, __tla as __tla_0 } from "../chunks/DIYjIN1w.js";
import { g as ka } from "../chunks/C9O8FMsB.js";
import { b as T } from "../chunks/Cb5I6AzB.js";
import { d as ja } from "../chunks/BzpYRo3t.js";
let Ja;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const Ca = () => ma((u = {}, l) => {
    l.length && (pa(l), ca("username", ya(), () => {
      _a(u.username).isNotBlank();
    }));
  });
  function Ia(u, l, i) {
    l.add(u.currentTarget.name), i();
  }
  var Sa = V('<div class="mr-2 flex flex-row justify-center"><div class="inline-block h-6 w-6 animate-spin"><!></div></div>'), Aa = V('<div class="flex flex-grow flex-col justify-end p-4 sm:justify-start"><div class="card mx-auto my-10 flex w-full flex-shrink flex-col sm:w-72"><h1> </h1> <p><span> </span> <a class="text-blue-500 underline"> </a></p> <form><div class="mb-2"><label for="username"> </label> <input type="text" name="username" autocomplete="username"> <!></div> <div class="flex flex-row justify-end"><button type="submit" class="btn primary flex flex-shrink"><!> </button></div></form></div></div>');
  Ja = function(u, l) {
    aa(l, true);
    let i = I(""), G = Ca(), v = I(S(G.get())), f = I(false), z = N(() => r(f)), F = N(() => fa(r(v), {
      untested: "untested",
      tested: "tested",
      invalid: "invalid",
      valid: "valid",
      warning: "warning"
    }));
    const p = /* @__PURE__ */ new Set(), _ = ja(() => {
      G({
        username: r(i)
      }, Array.from(p)).done((t) => {
        m(v, S(t));
      }), p.clear();
    }, 300);
    function H() {
      p.add("username"), _(), _.flush();
    }
    async function J(t) {
      t.preventDefault();
      try {
        m(f, true), m(i, S(r(i).trim())), H(), r(v).isValid() && (await wa(r(i)), await ka(`${T}/`));
      } catch (s) {
        $a(s);
      } finally {
        m(f, false);
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
    oa(o), o.__input = [
      Ia,
      p,
      _
    ];
    var Q = n(o, 2);
    da(Q, {
      name: "username",
      get result() {
        return r(v);
      }
    }), e($);
    var q = n($, 2), j = a(q), B = a(j);
    {
      var U = (t) => {
        var s = Sa(), c = a(s), C = a(c);
        ua(C, {}), e(c), e(s), D(t, s);
      };
      ia(B, (t) => {
        r(f) && t(U);
      });
    }
    var W = n(B);
    e(j), e(q), e(w), e(L), e(h), E((t, s, c, C, X, Y, Z) => {
      d(K, t), d(M, s), d(O, c), d(P, C), la(o, 1, `w-full ${X ?? ""}`), R(o, "placeholder", Y), j.disabled = r(z), d(W, ` ${Z ?? ""}`);
    }, [
      () => A(),
      () => ha(),
      () => ba(),
      () => xa(),
      () => r(F)("username"),
      () => ga(),
      () => A()
    ]), sa("submit", w, J), va(o, () => r(i), (t) => m(i, t)), D(u, h), ea();
  };
  ra([
    "input"
  ]);
});
export {
  __tla,
  Ja as component
};
