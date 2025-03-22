import { m as n, n as c, o as m, __tla as __tla_0 } from "../chunks/rhqxRTuo.js";
import { r as o } from "../chunks/B90CZVMX.js";
import "../chunks/KzIwl7iM.js";
import { b as r } from "../chunks/jfqPQL2J.js";
let g;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  let i, d;
  i = false;
  d = async (e) => {
    const s = decodeURIComponent(e.url.searchParams.get("username") || ""), t = decodeURIComponent(e.url.searchParams.get("userDocumentId") || "");
    try {
      await n(s, t);
    } catch (a) {
      console.error(a), c(m()), o(302, `${r}/signin`);
    }
    o(302, `${r}/`);
  };
  g = Object.freeze(Object.defineProperty({
    __proto__: null,
    load: d,
    ssr: i
  }, Symbol.toStringTag, {
    value: "Module"
  }));
});
export {
  __tla,
  g as universal
};
