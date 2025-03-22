import { w as _, b as o, H as f, h as a, x as u, y as d, z as i, A as s, g as r, B as c } from "./DjXzb9G0.js";
let e;
function g() {
  e = void 0;
}
function p(h) {
  let t = null, l = a;
  var n;
  if (a) {
    for (t = r, e === void 0 && (e = c(document.head)); e !== null && (e.nodeType !== 8 || e.data !== u); ) e = d(e);
    e === null ? i(false) : e = s(d(e));
  }
  a || (n = document.head.appendChild(_()));
  try {
    o(() => h(n), f);
  } finally {
    l && (i(true), e = r, s(t));
  }
}
export {
  p as h,
  g as r
};
