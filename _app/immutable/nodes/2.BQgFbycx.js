import { u as o, r as t, __tla as __tla_0 } from "../chunks/C-o1sGLL.js";
import { r as n } from "../chunks/B90CZVMX.js";
import { b as a } from "../chunks/B7qIyRxi.js";
import { L as f } from "../chunks/3NJf1Sbs.js";
let c;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  let s;
  s = async (r) => {
    await r.parent(), o.documentId || n(302, `${a}/signin`);
    const e = t().find(o.documentId);
    return await e.whenReady(), {
      userDocument: e
    };
  };
  c = Object.freeze(Object.defineProperty({
    __proto__: null,
    load: s
  }, Symbol.toStringTag, {
    value: "Module"
  }));
});
export {
  __tla,
  f as component,
  c as universal
};
