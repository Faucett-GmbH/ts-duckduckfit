import { m as a, n, o as c, __tla as __tla_0 } from "../chunks/C-Z7SKhz.js";
import { r as o } from "../chunks/B90CZVMX.js";
import "../chunks/KzIwl7iM.js";
let p;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  let i, m;
  i = false;
  m = async (e) => {
    const r = decodeURIComponent(e.url.searchParams.get("username") || ""), s = decodeURIComponent(e.url.searchParams.get("userDocumentId") || "");
    try {
      await a(r, s);
    } catch (t) {
      console.error(t), n(c()), o(302, "/signin");
    }
    o(302, "/");
  };
  p = Object.freeze(Object.defineProperty({
    __proto__: null,
    load: m,
    ssr: i
  }, Symbol.toStringTag, {
    value: "Module"
  }));
});
export {
  __tla,
  p as universal
};
