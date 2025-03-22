import { O as d, Q as g, N as c, R as i, u as m, T as b, m as p, V as v, o as h, W as k } from "./DjXzb9G0.js";
function x(n = false) {
  const s = d, e = s.l.u;
  if (!e) return;
  let f = () => v(s.s);
  if (n) {
    let o = 0, t = {};
    const _ = h(() => {
      let l = false;
      const r = s.s;
      for (const a in r) r[a] !== t[a] && (t[a] = r[a], l = true);
      return l && o++, o;
    });
    f = () => p(_);
  }
  e.b.length && g(() => {
    u(s, f), i(e.b);
  }), c(() => {
    const o = m(() => e.m.map(b));
    return () => {
      for (const t of o) typeof t == "function" && t();
    };
  }), e.a.length && c(() => {
    u(s, f), i(e.a);
  });
}
function u(n, s) {
  if (n.l.s) for (const e of n.l.s) p(e);
  s();
}
k();
export {
  x as i
};
