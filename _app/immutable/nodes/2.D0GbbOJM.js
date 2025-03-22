import { u as o, r as t, __tla as __tla_0 } from "../chunks/rhqxRTuo.js";
import { r as n } from "../chunks/B90CZVMX.js";
import { b as a } from "../chunks/jfqPQL2J.js";
import { L as l } from "../chunks/my93JWH4.js";
let d;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  let s, c;
  s = false;
  c = async (r) => {
    await r.parent(), o.documentId || n(302, `${a}/signin`);
    const e = t().find(o.documentId);
    return await e.whenReady(), {
      userDocument: e
    };
  };
  d = Object.freeze(Object.defineProperty({
    __proto__: null,
    load: c,
    ssr: s
  }, Symbol.toStringTag, {
    value: "Module"
  }));
});
export {
  __tla,
  l as component,
  d as universal
};
