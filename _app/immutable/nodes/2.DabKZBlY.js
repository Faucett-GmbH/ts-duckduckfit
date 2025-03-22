import { u as o, r, __tla as __tla_0 } from "../chunks/C-Z7SKhz.js";
import { r as n } from "../chunks/B90CZVMX.js";
import { L as l } from "../chunks/BFTFq4aB.js";
let i;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  let a, s;
  a = false;
  s = async (t) => {
    await t.parent(), o.documentId || n(302, "/signin");
    const e = r().find(o.documentId);
    return await e.whenReady(), {
      userDocument: e
    };
  };
  i = Object.freeze(Object.defineProperty({
    __proto__: null,
    load: s,
    ssr: a
  }, Symbol.toStringTag, {
    value: "Module"
  }));
});
export {
  __tla,
  l as component,
  i as universal
};
