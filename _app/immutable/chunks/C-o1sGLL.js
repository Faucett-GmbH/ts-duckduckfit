var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value, setter);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});
import { m as Kn, l as ls, w as ut, aQ as Gi, v as lt, D as ds, o as Yi } from "./DvcnV1Iy.js";
import { a as Xi } from "./BGOAb-lb.js";
import { g as Q } from "./KzIwl7iM.js";
let Ha, Ah, Sh, pa, ka, ba, Ea, Ta, oa, xa, kh, Ca, Ma, aa, Ih, Oh, xr, ha, za, wa, rt, Ch, Ka, Eh, An, Zn, Da, $a, Pa;
let __tla = (async () => {
  var _t2, _e2, _n2, _r2, _s2, _If_instances, o_get, a_get, i_fn, c_fn, _t3, _e3, _n3, _r3, _s3, _o2, _Bf_instances, a_fn, i_fn2, _t4, _e4, _n4, _r4, _s4, _o3, _a2, _t5, _e5, _n5, _r5, _s5, _Zf_instances, o_fn, a_fn2, i_fn3, c_fn2, _t6, _e6, _n6, _r6, _s6, _o4, _a3, _i2, _c2, _Qf_instances, g_fn, p_fn, y_fn, f_fn, b_fn, m_fn, l_fn, d_fn, h_fn, u_fn, __fn, _t7, _e7, _n7, _el_instances, r_fn, s_fn, o_fn2, _t8, _e8, _n8, _r7, _s7, _tl_instances, o_fn3, _a4, i_fn4, c_fn3, _t9, _e9, _n9, _ph_instances, r_fn2;
  let Zi, Qi, ea, ta, na, ra, sa, ia, ca, ua, fa, la, da, _a, kn, ga, ya, ma, va, Sa, Aa, Ia, Oa, Ra, ja, Ua, Ba, Fa, La, Na, Va, wr;
  Zi = true;
  Qi = Zi;
  ea = () => "Application";
  ta = (t = {}, e = {}) => (e.locale ?? Q()) === "en" ? ea() : "errors_name_application";
  na = () => "User";
  ra = (t = {}, e = {}) => (e.locale ?? Q()) === "en" ? na() : "errors_name_user";
  sa = () => "Required";
  oa = (t = {}, e = {}) => (e.locale ?? Q()) === "en" ? sa() : "errors_message_required";
  ia = () => "Mismatch";
  aa = (t = {}, e = {}) => (e.locale ?? Q()) === "en" ? ia() : "errors_message_mismatch";
  ca = () => "Already Exists";
  ua = (t = {}, e = {}) => (e.locale ?? Q()) === "en" ? ca() : "errors_message_already_exists";
  fa = () => "Invalid credentials";
  la = (t = {}, e = {}) => (e.locale ?? Q()) === "en" ? fa() : "errors_message_invalid_credentials";
  da = () => "Invalid sync code";
  ha = (t = {}, e = {}) => (e.locale ?? Q()) === "en" ? da() : "errors_message_invalid_sync_code";
  _a = () => "if it presists please contact support";
  kn = (t = {}, e = {}) => (e.locale ?? Q()) === "en" ? _a() : "errors_message_application";
  ga = () => "Sign in";
  pa = (t = {}, e = {}) => (e.locale ?? Q()) === "en" ? ga() : "auth_sign_in";
  ya = () => "Sign up";
  ba = (t = {}, e = {}) => (e.locale ?? Q()) === "en" ? ya() : "auth_sign_up";
  ma = () => "Sign out";
  wa = (t = {}, e = {}) => (e.locale ?? Q()) === "en" ? ma() : "auth_sign_out";
  va = () => "Have an Account?";
  xa = (t = {}, e = {}) => (e.locale ?? Q()) === "en" ? va() : "auth_have_an_account";
  Sa = () => "Already have an Account?";
  ka = (t = {}, e = {}) => (e.locale ?? Q()) === "en" ? Sa() : "auth_already_have_an_account";
  Aa = () => "Username";
  Ea = (t = {}, e = {}) => (e.locale ?? Q()) === "en" ? Aa() : "auth_username_label";
  Ia = () => "Username Confirmation";
  Ca = (t = {}, e = {}) => (e.locale ?? Q()) === "en" ? Ia() : "auth_username_confirm_label";
  Oa = () => "Username";
  Ta = (t = {}, e = {}) => (e.locale ?? Q()) === "en" ? Oa() : "auth_username_placeholder";
  Ra = () => "Confirm Username";
  Ma = (t = {}, e = {}) => (e.locale ?? Q()) === "en" ? Ra() : "auth_username_confirm_placeholder";
  ja = () => "Name";
  Da = (t = {}, e = {}) => (e.locale ?? Q()) === "en" ? ja() : "user_profile_name_label";
  Ua = () => "Enter Name";
  $a = (t = {}, e = {}) => (e.locale ?? Q()) === "en" ? Ua() : "user_profile_name_placeholder";
  Ba = () => "Birthdate";
  Pa = (t = {}, e = {}) => (e.locale ?? Q()) === "en" ? Ba() : "user_profile_birthdate_label";
  Fa = () => "Update Profile";
  Ha = (t = {}, e = {}) => (e.locale ?? Q()) === "en" ? Fa() : "user_profile_update";
  La = () => "Profile";
  za = (t = {}, e = {}) => (e.locale ?? Q()) === "en" ? La() : "profile_title";
  Na = () => "English";
  Va = (t = {}, e = {}) => (e.locale ?? Q()) === "en" ? Na() : "locales_en";
  wr = Object.freeze(Object.defineProperty({
    __proto__: null,
    app_title: Xi,
    auth_already_have_an_account: ka,
    auth_have_an_account: xa,
    auth_sign_in: pa,
    auth_sign_out: wa,
    auth_sign_up: ba,
    auth_username_confirm_label: Ca,
    auth_username_confirm_placeholder: Ma,
    auth_username_label: Ea,
    auth_username_placeholder: Ta,
    errors_message_already_exists: ua,
    errors_message_application: kn,
    errors_message_invalid_credentials: la,
    errors_message_invalid_sync_code: ha,
    errors_message_mismatch: aa,
    errors_message_required: oa,
    errors_name_application: ta,
    errors_name_user: ra,
    locales_en: Va,
    profile_title: za,
    user_profile_birthdate_label: Pa,
    user_profile_name_label: Da,
    user_profile_name_placeholder: $a,
    user_profile_update: Ha
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  globalThis.__sveltekit_t61d11.env;
  function Wa(t) {
    return `${Math.random().toString(36).substring(2)}${`-${t}`}`;
  }
  Sh = function() {
    return typeof __DEV_AUTH_URL__ < "u" ? __DEV_AUTH_URL__ : window.location.origin;
  };
  const vr = {};
  function qa(t) {
    let e = vr;
    return () => (e === vr && (e = t()), e);
  }
  An = Kn([]);
  xr = function(t, e = "error", n = 5e3) {
    const r = Wa("notification");
    return An.push({
      id: r,
      message: t,
      type: e
    }), n > 0 && setTimeout(() => Ka(r), n), r;
  };
  Ka = function(t) {
    const e = An.findIndex((n) => n.id === t);
    e !== -1 && An.splice(e, 1);
  };
  class wt extends Error {
    static from(e, n, ...r) {
      return new wt(Ja(e, n, r));
    }
  }
  function Ja(t, e, n) {
    const r = wr[t](), s = wr[e](...n);
    return `${r}: ${s}`;
  }
  kh = function(t) {
    if (t instanceof wt) {
      xr(t.message);
      return;
    }
    throw console.error(t), xr(`${kn()}: ${kn()}`), t;
  };
  function hs(t, e, n = {}) {
    const { storage: r = "local", serializer: s = JSON, syncTabs: o = true, onWriteError: i = console.error, onParseError: a = console.error, beforeRead: c = (g) => g, beforeWrite: u = (g) => g } = n, f = r === "local" ? localStorage : sessionStorage;
    let l;
    try {
      const g = f == null ? void 0 : f.getItem(t);
      l = g ? c(s.parse(g)) : e;
    } catch (g) {
      a(g), l = e;
    }
    let d = ls(Kn(l));
    function h(g) {
      try {
        const v = u(g);
        f == null ? void 0 : f.setItem(t, s.stringify(v));
      } catch (v) {
        i(v);
      }
    }
    return o && Qi && r === "local" && window.addEventListener("storage", (g) => {
      if (g.key === t && g.storageArea === localStorage) try {
        const v = g.newValue ? s.parse(g.newValue) : e;
        ut(d, c(v), true);
      } catch (v) {
        a(v);
      }
    }), Gi(() => (ds(() => {
      h(lt(d));
    }), () => {
    })), {
      get value() {
        return lt(d);
      },
      set value(g) {
        ut(d, g, true);
      },
      update(g) {
        ut(d, g(lt(d)), true);
      },
      reset() {
        ut(d, e, true);
      }
    };
  }
  const $e = Symbol.for("_am_meta"), Ze = Symbol.for("_am_trace"), Qe = Symbol.for("_am_objectId"), Jt = Symbol.for("_am_isProxy"), _s = Symbol.for("_am_clearCache"), Ga = Symbol.for("_am_uint"), Ya = Symbol.for("_am_int"), Xa = Symbol.for("_am_f64"), gs = Symbol.for("_am_counter"), Za = Symbol.for("_am_text");
  class Re {
    constructor(e) {
      if (typeof e == "string") this.elems = [
        ...e
      ];
      else if (Array.isArray(e)) this.elems = e;
      else if (e === void 0) this.elems = [];
      else throw new TypeError(`Unsupported initial value for Text: ${e}`);
      Reflect.defineProperty(this, Za, {
        value: true
      });
    }
    get length() {
      return this.elems.length;
    }
    get(e) {
      return this.elems[e];
    }
    [Symbol.iterator]() {
      const e = this.elems;
      let n = -1;
      return {
        next() {
          return n += 1, n < e.length ? {
            done: false,
            value: e[n]
          } : {
            done: true
          };
        }
      };
    }
    toString() {
      if (!this.str) {
        this.str = "";
        for (const e of this.elems) typeof e == "string" ? this.str += e : this.str += "\uFFFC";
      }
      return this.str;
    }
    toSpans() {
      if (!this.spans) {
        this.spans = [];
        let e = "";
        for (const n of this.elems) typeof n == "string" ? e += n : (e.length > 0 && (this.spans.push(e), e = ""), this.spans.push(n));
        e.length > 0 && this.spans.push(e);
      }
      return this.spans;
    }
    toJSON() {
      return this.toString();
    }
    set(e, n) {
      if (this[$e]) throw new RangeError("object cannot be modified outside of a change block");
      this.elems[e] = n;
    }
    insertAt(e, ...n) {
      if (this[$e]) throw new RangeError("object cannot be modified outside of a change block");
      n.every((r) => typeof r == "string") ? this.elems.splice(e, 0, ...n.join("")) : this.elems.splice(e, 0, ...n);
    }
    deleteAt(e, n = 1) {
      if (this[$e]) throw new RangeError("object cannot be modified outside of a change block");
      this.elems.splice(e, n);
    }
    map(e) {
      this.elems.map(e);
    }
    lastIndexOf(e, n) {
      this.elems.lastIndexOf(e, n);
    }
    concat(e) {
      return new Re(this.elems.concat(e.elems));
    }
    every(e) {
      return this.elems.every(e);
    }
    filter(e) {
      return new Re(this.elems.filter(e));
    }
    find(e) {
      return this.elems.find(e);
    }
    findIndex(e) {
      return this.elems.findIndex(e);
    }
    forEach(e) {
      this.elems.forEach(e);
    }
    includes(e) {
      return this.elems.includes(e);
    }
    indexOf(e) {
      return this.elems.indexOf(e);
    }
    join(e) {
      return this.elems.join(e);
    }
    reduce(e) {
      this.elems.reduce(e);
    }
    reduceRight(e) {
      this.elems.reduceRight(e);
    }
    slice(e, n) {
      return new Re(this.elems.slice(e, n));
    }
    some(e) {
      return this.elems.some(e);
    }
    toLocaleString() {
      this.toString();
    }
  }
  class En {
    constructor(e) {
      this.value = e || 0, Reflect.defineProperty(this, gs, {
        value: true
      });
    }
    valueOf() {
      return this.value;
    }
    toString() {
      return this.valueOf().toString();
    }
    toJSON() {
      return this.value;
    }
    increment(e) {
      throw new Error("Counters should not be incremented outside of a change callback");
    }
    decrement(e) {
      throw new Error("Counters should not be decremented outside of a change callback");
    }
  }
  class Qa extends En {
    constructor(e, n, r, s, o) {
      super(e), this.context = n, this.path = r, this.objectId = s, this.key = o;
    }
    increment(e) {
      return e = typeof e == "number" ? e : 1, this.context.increment(this.objectId, this.key, e), this.value += e, this.value;
    }
    decrement(e) {
      return this.increment(typeof e == "number" ? -e : -1);
    }
  }
  function ec(t, e, n, r, s) {
    return new Qa(t, e, n, r, s);
  }
  class In {
    constructor(e) {
      this.val = e;
    }
    toString() {
      return this.val;
    }
    toJSON() {
      return this.val;
    }
  }
  function ke(t) {
    if (typeof t == "string" && /^[0-9]+$/.test(t) && (t = parseInt(t, 10)), typeof t != "number") return t;
    if (t < 0 || isNaN(t) || t === 1 / 0 || t === -1 / 0) throw new RangeError("A list index must be positive, but you passed " + t);
    return t;
  }
  function _e(t, e) {
    const { context: n, objectId: r, path: s, textV2: o } = t, i = n.getWithType(r, e);
    if (i === null) return;
    const a = i[0], c = i[1];
    switch (a) {
      case void 0:
        return;
      case "map":
        return vt(n, c, o, [
          ...s,
          e
        ]);
      case "list":
        return Yt(n, c, o, [
          ...s,
          e
        ]);
      case "text":
        return o ? n.text(c) : ht(n, c, [
          ...s,
          e
        ]);
      case "str":
        return c;
      case "uint":
        return c;
      case "int":
        return c;
      case "f64":
        return c;
      case "boolean":
        return c;
      case "null":
        return null;
      case "bytes":
        return c;
      case "timestamp":
        return c;
      case "counter":
        return ec(c, n, s, r, e);
      default:
        throw RangeError(`datatype ${a} unimplemented`);
    }
  }
  function Lt(t, e, n, r) {
    const s = typeof t;
    switch (s) {
      case "object":
        if (t == null) return [
          null,
          "null"
        ];
        if (t[Ga]) return [
          t.value,
          "uint"
        ];
        if (t[Ya]) return [
          t.value,
          "int"
        ];
        if (t[Xa]) return [
          t.value,
          "f64"
        ];
        if (t[gs]) return [
          t.value,
          "counter"
        ];
        if (t instanceof Date) return [
          t.getTime(),
          "timestamp"
        ];
        if (t instanceof In) return [
          t.toString(),
          "str"
        ];
        if (t instanceof Re) return [
          t,
          "text"
        ];
        if (t instanceof Uint8Array) return [
          t,
          "bytes"
        ];
        if (t instanceof Array) return [
          t,
          "list"
        ];
        if (Object.prototype.toString.call(t) === "[object Object]") return [
          t,
          "map"
        ];
        throw Gt(t, r) ? new RangeError("Cannot create a reference to an existing document object") : new RangeError(`Cannot assign unknown object: ${t}`);
      case "boolean":
        return [
          t,
          "boolean"
        ];
      case "number":
        return Number.isInteger(t) ? [
          t,
          "int"
        ] : [
          t,
          "f64"
        ];
      case "string":
        return e ? [
          t,
          "text"
        ] : [
          t,
          "str"
        ];
      case "undefined":
        throw new RangeError([
          `Cannot assign undefined value at ${Sr(n)}, `,
          "because `undefined` is not a valid JSON data type. ",
          "You might consider setting the property's value to `null`, ",
          "or using `delete` to remove it altogether."
        ].join(""));
      default:
        throw new RangeError([
          `Cannot assign ${s} value at ${Sr(n)}. `,
          "All JSON primitive datatypes (object, array, string, number, boolean, null) ",
          `are supported in an Automerge document; ${s} values are not. `
        ].join(""));
    }
  }
  function Gt(t, e) {
    var n, r;
    return t instanceof Date ? false : !!(t && ((r = (n = t[$e]) === null || n === void 0 ? void 0 : n.handle) === null || r === void 0 ? void 0 : r.__wbg_ptr) === e.__wbg_ptr);
  }
  const tc = {
    get(t, e) {
      const { context: n, objectId: r, cache: s } = t;
      return e === Symbol.toStringTag ? t[Symbol.toStringTag] : e === Qe ? r : e === Jt ? true : e === Ze ? t.trace : e === $e ? {
        handle: n,
        textV2: t.textV2
      } : (s[e] || (s[e] = _e(t, e)), s[e]);
    },
    set(t, e, n) {
      const { context: r, objectId: s, path: o, textV2: i } = t;
      if (t.cache = {}, Gt(n, r)) throw new RangeError("Cannot create a reference to an existing document object");
      if (e === Ze) return t.trace = n, true;
      if (e === _s) return true;
      const [a, c] = Lt(n, i, [
        ...o,
        e
      ], r);
      switch (c) {
        case "list": {
          const u = r.putObject(s, e, []), f = Yt(r, u, i, [
            ...o,
            e
          ]);
          for (let l = 0; l < a.length; l++) f[l] = a[l];
          break;
        }
        case "text": {
          if (i) zt(a), r.putObject(s, e, a);
          else {
            Gn(a);
            const u = r.putObject(s, e, "");
            ht(r, u, [
              ...o,
              e
            ]).splice(0, 0, ...a);
          }
          break;
        }
        case "map": {
          const u = r.putObject(s, e, {}), f = vt(r, u, i, [
            ...o,
            e
          ]);
          for (const l in a) f[l] = a[l];
          break;
        }
        default:
          r.put(s, e, a, c);
      }
      return true;
    },
    deleteProperty(t, e) {
      const { context: n, objectId: r } = t;
      return t.cache = {}, n.delete(r, e), true;
    },
    has(t, e) {
      return this.get(t, e) !== void 0;
    },
    getOwnPropertyDescriptor(t, e) {
      const n = this.get(t, e);
      if (typeof n < "u") return {
        configurable: true,
        enumerable: true,
        value: n
      };
    },
    ownKeys(t) {
      const { context: e, objectId: n } = t, r = e.keys(n);
      return [
        ...new Set(r)
      ];
    }
  }, ps = {
    get(t, e) {
      const { context: n, objectId: r } = t;
      return e = ke(e), e === Symbol.hasInstance ? (s) => Array.isArray(s) : e === Symbol.toStringTag ? t[Symbol.toStringTag] : e === Qe ? r : e === Jt ? true : e === Ze ? t.trace : e === $e ? {
        handle: n
      } : e === "length" ? n.length(r) : typeof e == "number" ? _e(t, e) : Jn(t)[e];
    },
    set(t, e, n) {
      const { context: r, objectId: s, path: o, textV2: i } = t;
      if (e = ke(e), Gt(n, r)) throw new RangeError("Cannot create a reference to an existing document object");
      if (e === _s) return true;
      if (e === Ze) return t.trace = n, true;
      if (typeof e == "string") throw new RangeError("list index must be a number");
      const [a, c] = Lt(n, i, [
        ...o,
        e
      ], r);
      switch (c) {
        case "list": {
          let u;
          e >= r.length(s) ? u = r.insertObject(s, e, []) : u = r.putObject(s, e, []), Yt(r, u, i, [
            ...o,
            e
          ]).splice(0, 0, ...a);
          break;
        }
        case "text": {
          if (i) zt(a), e >= r.length(s) ? r.insertObject(s, e, a) : r.putObject(s, e, a);
          else {
            let u;
            Gn(a), e >= r.length(s) ? u = r.insertObject(s, e, "") : u = r.putObject(s, e, ""), ht(r, u, [
              ...o,
              e
            ]).splice(0, 0, ...a);
          }
          break;
        }
        case "map": {
          let u;
          e >= r.length(s) ? u = r.insertObject(s, e, {}) : u = r.putObject(s, e, {});
          const f = vt(r, u, i, [
            ...o,
            e
          ]);
          for (const l in a) f[l] = a[l];
          break;
        }
        default:
          e >= r.length(s) ? r.insert(s, e, a, c) : r.put(s, e, a, c);
      }
      return true;
    },
    deleteProperty(t, e) {
      const { context: n, objectId: r } = t;
      e = ke(e);
      const s = n.get(r, e);
      if (s != null && s[0] == "counter") throw new TypeError("Unsupported operation: deleting a counter from a list");
      return n.delete(r, e), true;
    },
    has(t, e) {
      const { context: n, objectId: r } = t;
      return e = ke(e), typeof e == "number" ? e < n.length(r) : e === "length";
    },
    getOwnPropertyDescriptor(t, e) {
      const { context: n, objectId: r } = t;
      return e === "length" ? {
        writable: true,
        value: n.length(r)
      } : e === Qe ? {
        configurable: false,
        enumerable: false,
        value: r
      } : (e = ke(e), {
        configurable: true,
        enumerable: true,
        value: _e(t, e)
      });
    },
    getPrototypeOf(t) {
      return Object.getPrototypeOf(t);
    },
    ownKeys() {
      const t = [];
      return t.push("length"), t;
    }
  }, nc = Object.assign({}, ps, {
    get(t, e) {
      const { context: n, objectId: r } = t;
      return e = ke(e), e === Symbol.hasInstance ? (s) => Array.isArray(s) : e === Symbol.toStringTag ? t[Symbol.toStringTag] : e === Qe ? r : e === Jt ? true : e === Ze ? t.trace : e === $e ? {
        handle: n
      } : e === "length" ? n.length(r) : typeof e == "number" ? _e(t, e) : sc(t)[e] || Jn(t)[e];
    },
    getPrototypeOf() {
      return Object.getPrototypeOf(new Re());
    }
  });
  function vt(t, e, n, r) {
    const s = {
      context: t,
      objectId: e,
      path: r || [],
      cache: {},
      textV2: n
    }, o = {};
    return Object.assign(o, s), new Proxy(o, tc);
  }
  function Yt(t, e, n, r) {
    const s = {
      context: t,
      objectId: e,
      path: r || [],
      cache: {},
      textV2: n
    }, o = [];
    return Object.assign(o, s), new Proxy(o, ps);
  }
  function ht(t, e, n) {
    const r = {
      context: t,
      objectId: e,
      path: n || [],
      cache: {},
      textV2: false
    }, s = {};
    return Object.assign(s, r), new Proxy(s, nc);
  }
  function rc(t, e) {
    return vt(t, "_root", e, []);
  }
  function Jn(t) {
    const { context: e, objectId: n, path: r, textV2: s } = t;
    return {
      deleteAt(i, a) {
        return typeof a == "number" ? e.splice(n, i, a) : e.delete(n, i), this;
      },
      fill(i, a, c) {
        const [u, f] = Lt(i, s, [
          ...r,
          a
        ], e), l = e.length(n);
        a = ke(a || 0), c = ke(c || l);
        for (let d = a; d < Math.min(c, l); d++) if (f === "list" || f === "map") e.putObject(n, d, u);
        else if (f === "text") if (s) zt(u), e.putObject(n, d, u);
        else {
          Gn(u);
          const h = e.putObject(n, d, ""), g = ht(e, h, [
            ...r,
            d
          ]);
          for (let v = 0; v < u.length; v++) g[v] = u.get(v);
        }
        else e.put(n, d, u, f);
        return this;
      },
      indexOf(i, a = 0) {
        const c = e.length(n);
        for (let u = a; u < c; u++) {
          const f = e.getWithType(n, u);
          if (f && (f[1] === i[Qe] || f[1] === i)) return u;
        }
        return -1;
      },
      insertAt(i, ...a) {
        return this.splice(i, 0, ...a), this;
      },
      pop() {
        const i = e.length(n);
        if (i == 0) return;
        const a = _e(t, i - 1);
        return e.delete(n, i - 1), a;
      },
      push(...i) {
        const a = e.length(n);
        return this.splice(a, 0, ...i), e.length(n);
      },
      shift() {
        if (e.length(n) == 0) return;
        const i = _e(t, 0);
        return e.delete(n, 0), i;
      },
      splice(i, a, ...c) {
        i = ke(i), typeof a != "number" && (a = e.length(n) - i), a = ke(a);
        for (const l of c) if (Gt(l, e)) throw new RangeError("Cannot create a reference to an existing document object");
        const u = [];
        for (let l = 0; l < a; l++) {
          const d = _e(t, i);
          d !== void 0 && u.push(d), e.delete(n, i);
        }
        const f = c.map((l, d) => {
          try {
            return Lt(l, s, [
              ...r
            ], e);
          } catch (h) {
            throw h instanceof RangeError ? new RangeError(`${h.message} (at index ${d} in the input)`) : h;
          }
        });
        for (const [l, d] of f) {
          switch (d) {
            case "list": {
              const h = e.insertObject(n, i, []);
              Yt(e, h, s, [
                ...r,
                i
              ]).splice(0, 0, ...l);
              break;
            }
            case "text": {
              if (s) zt(l), e.insertObject(n, i, l);
              else {
                const h = e.insertObject(n, i, "");
                ht(e, h, [
                  ...r,
                  i
                ]).splice(0, 0, ...l);
              }
              break;
            }
            case "map": {
              const h = e.insertObject(n, i, {}), g = vt(e, h, s, [
                ...r,
                i
              ]);
              for (const v in l) g[v] = l[v];
              break;
            }
            default:
              e.insert(n, i, l, d);
          }
          i += 1;
        }
        return u;
      },
      unshift(...i) {
        return this.splice(0, 0, ...i), e.length(n);
      },
      entries() {
        let i = 0;
        return {
          next: () => {
            const c = _e(t, i);
            return c === void 0 ? {
              value: void 0,
              done: true
            } : {
              value: [
                i++,
                c
              ],
              done: false
            };
          },
          [Symbol.iterator]() {
            return this;
          }
        };
      },
      keys() {
        let i = 0;
        const a = e.length(n);
        return {
          next: () => i < a ? {
            value: i++,
            done: false
          } : {
            value: void 0,
            done: true
          },
          [Symbol.iterator]() {
            return this;
          }
        };
      },
      values() {
        let i = 0;
        return {
          next: () => {
            const c = _e(t, i++);
            return c === void 0 ? {
              value: void 0,
              done: true
            } : {
              value: c,
              done: false
            };
          },
          [Symbol.iterator]() {
            return this;
          }
        };
      },
      toArray() {
        const i = [];
        let a;
        do
          a = _e(t, i.length), a !== void 0 && i.push(a);
        while (a !== void 0);
        return i;
      },
      map(i) {
        return this.toArray().map(i);
      },
      toString() {
        return this.toArray().toString();
      },
      toLocaleString() {
        return this.toArray().toLocaleString();
      },
      forEach(i) {
        return this.toArray().forEach(i);
      },
      concat(i) {
        return this.toArray().concat(i);
      },
      every(i) {
        return this.toArray().every(i);
      },
      filter(i) {
        return this.toArray().filter(i);
      },
      find(i) {
        let a = 0;
        for (const c of this) {
          if (i(c, a)) return c;
          a += 1;
        }
      },
      findIndex(i) {
        let a = 0;
        for (const c of this) {
          if (i(c, a)) return a;
          a += 1;
        }
        return -1;
      },
      includes(i) {
        return this.find((a) => a === i) !== void 0;
      },
      join(i) {
        return this.toArray().join(i);
      },
      reduce(i, a) {
        return this.toArray().reduce(i, a);
      },
      reduceRight(i, a) {
        return this.toArray().reduceRight(i, a);
      },
      lastIndexOf(i, a = 1 / 0) {
        return this.toArray().lastIndexOf(i, a);
      },
      slice(i, a) {
        return this.toArray().slice(i, a);
      },
      some(i) {
        let a = 0;
        for (const c of this) {
          if (i(c, a)) return true;
          a += 1;
        }
        return false;
      },
      [Symbol.iterator]: function* () {
        let i = 0, a = _e(t, i);
        for (; a !== void 0; ) yield a, i += 1, a = _e(t, i);
      }
    };
  }
  function sc(t) {
    const { context: e, objectId: n } = t;
    return {
      set(s, o) {
        return this[s] = o;
      },
      get(s) {
        return this[s];
      },
      toString() {
        return e.text(n).replace(/￼/g, "");
      },
      toSpans() {
        const s = [];
        let o = "";
        const i = e.length(n);
        for (let a = 0; a < i; a++) {
          const c = this[a];
          typeof c == "string" ? o += c : (o.length > 0 && (s.push(o), o = ""), s.push(c));
        }
        return o.length > 0 && s.push(o), s;
      },
      toJSON() {
        return this.toString();
      },
      indexOf(s, o = 0) {
        return e.text(n).indexOf(s, o);
      },
      insertAt(s, ...o) {
        o.every((i) => typeof i == "string") ? e.splice(n, s, 0, o.join("")) : Jn(t).insertAt(s, ...o);
      }
    };
  }
  function Gn(t) {
    if (!(t instanceof Re)) throw new Error("value was not a Text instance");
  }
  function zt(t) {
    if (typeof t != "string") throw new Error("value was not a string");
  }
  function Sr(t) {
    const e = t.map((n) => {
      if (typeof n == "number") return n.toString();
      if (typeof n == "string") return n.replace(/~/g, "~0").replace(/\//g, "~1");
    });
    return t.length === 0 ? "" : "/" + e.join("/");
  }
  let At;
  const oc = new Uint8Array(16);
  function ic() {
    if (!At && (At = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !At)) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    return At(oc);
  }
  const ac = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
  function Xt(t) {
    return typeof t == "string" && ac.test(t);
  }
  const oe = [];
  for (let t = 0; t < 256; ++t) oe.push((t + 256).toString(16).slice(1));
  function ys(t, e = 0) {
    return oe[t[e + 0]] + oe[t[e + 1]] + oe[t[e + 2]] + oe[t[e + 3]] + "-" + oe[t[e + 4]] + oe[t[e + 5]] + "-" + oe[t[e + 6]] + oe[t[e + 7]] + "-" + oe[t[e + 8]] + oe[t[e + 9]] + "-" + oe[t[e + 10]] + oe[t[e + 11]] + oe[t[e + 12]] + oe[t[e + 13]] + oe[t[e + 14]] + oe[t[e + 15]];
  }
  function cc(t, e = 0) {
    const n = ys(t, e);
    if (!Xt(n)) throw TypeError("Stringified UUID is invalid");
    return n;
  }
  function uc(t) {
    if (!Xt(t)) throw TypeError("Invalid UUID");
    let e;
    const n = new Uint8Array(16);
    return n[0] = (e = parseInt(t.slice(0, 8), 16)) >>> 24, n[1] = e >>> 16 & 255, n[2] = e >>> 8 & 255, n[3] = e & 255, n[4] = (e = parseInt(t.slice(9, 13), 16)) >>> 8, n[5] = e & 255, n[6] = (e = parseInt(t.slice(14, 18), 16)) >>> 8, n[7] = e & 255, n[8] = (e = parseInt(t.slice(19, 23), 16)) >>> 8, n[9] = e & 255, n[10] = (e = parseInt(t.slice(24, 36), 16)) / 1099511627776 & 255, n[11] = e / 4294967296 & 255, n[12] = e >>> 24 & 255, n[13] = e >>> 16 & 255, n[14] = e >>> 8 & 255, n[15] = e & 255, n;
  }
  const fc = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), kr = {
    randomUUID: fc
  };
  function bs(t, e, n) {
    if (kr.randomUUID && !e && !t) return kr.randomUUID();
    t = t || {};
    const r = t.random || (t.rng || ic)();
    if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, e) {
      n = n || 0;
      for (let s = 0; s < 16; ++s) e[n + s] = r[s];
      return e;
    }
    return ys(r);
  }
  let ms;
  const ws = new Array(128).fill(void 0);
  ws.push(void 0, null, true, false);
  ws.length;
  const rn = typeof TextEncoder < "u" ? new TextEncoder("utf-8") : {
    encode: () => {
      throw Error("TextEncoder not available");
    }
  };
  rn.encodeInto;
  const lc = typeof TextDecoder < "u" ? new TextDecoder("utf-8", {
    ignoreBOM: true,
    fatal: true
  }) : {
    decode: () => {
      throw Error("TextDecoder not available");
    }
  };
  typeof TextDecoder < "u" && lc.decode();
  typeof FinalizationRegistry > "u" || new FinalizationRegistry((t) => ms.__wbg_automerge_free(t >>> 0));
  typeof FinalizationRegistry > "u" || new FinalizationRegistry((t) => ms.__wbg_syncstate_free(t >>> 0));
  let dc = [];
  function hc(t) {
    for (const e in t) le[e] = t[e];
    for (const e of dc) e();
  }
  const le = {
    create(t) {
      throw new RangeError("Automerge.use() not called");
    },
    load(t, e) {
      throw new RangeError("Automerge.use() not called (load)");
    },
    encodeChange(t) {
      throw new RangeError("Automerge.use() not called (encodeChange)");
    },
    decodeChange(t) {
      throw new RangeError("Automerge.use() not called (decodeChange)");
    },
    initSyncState() {
      throw new RangeError("Automerge.use() not called (initSyncState)");
    },
    encodeSyncMessage(t) {
      throw new RangeError("Automerge.use() not called (encodeSyncMessage)");
    },
    decodeSyncMessage(t) {
      throw new RangeError("Automerge.use() not called (decodeSyncMessage)");
    },
    encodeSyncState(t) {
      throw new RangeError("Automerge.use() not called (encodeSyncState)");
    },
    decodeSyncState(t) {
      throw new RangeError("Automerge.use() not called (decodeSyncState)");
    },
    exportSyncState(t) {
      throw new RangeError("Automerge.use() not called (exportSyncState)");
    },
    importSyncState(t) {
      throw new RangeError("Automerge.use() not called (importSyncState)");
    }
  };
  function ae(t, e = true) {
    if (typeof t != "object") throw new RangeError("must be the document root");
    const n = Reflect.get(t, $e);
    if (n === void 0 || n == null || e && _c(t) !== "_root") throw new RangeError("must be the document root");
    return n;
  }
  function vs(t) {
    return Reflect.get(t, Ze);
  }
  function _c(t) {
    return typeof t != "object" || t === null ? null : Reflect.get(t, Qe);
  }
  function Zt(t) {
    return !!Reflect.get(t, Jt);
  }
  var gc = function(t, e) {
    var n = {};
    for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && e.indexOf(r) < 0 && (n[r] = t[r]);
    if (t != null && typeof Object.getOwnPropertySymbols == "function") for (var s = 0, r = Object.getOwnPropertySymbols(t); s < r.length; s++) e.indexOf(r[s]) < 0 && Object.prototype.propertyIsEnumerable.call(t, r[s]) && (n[r[s]] = t[r[s]]);
    return n;
  };
  function Yn(t) {
    return typeof t == "object" ? t : {
      actor: t
    };
  }
  function Xn(t) {
    const e = Yn(t), n = !!e.freeze, r = e.patchCallback, s = !e.enableTextV2, o = e.actor, i = le.create({
      actor: o,
      text_v1: s
    });
    i.enableFreeze(!!e.freeze);
    const a = e.enableTextV2 || false;
    return Es(i, a), i.materialize("/", void 0, {
      handle: i,
      heads: void 0,
      freeze: n,
      patchCallback: r,
      textV2: a
    });
  }
  function pc(t, e) {
    const n = ae(t), r = n.heads, s = Yn(e), o = n.handle.fork(s.actor, r);
    o.updateDiffCursor();
    const { heads: i } = n, a = gc(n, [
      "heads"
    ]);
    return a.patchCallback = s.patchCallback, o.applyPatches(t, Object.assign(Object.assign({}, a), {
      handle: o
    }));
  }
  function yc(t, e) {
    return _t(Xn(e), "from", {}, (n) => Object.assign(n, t)).newDoc;
  }
  function bc(t, e, n) {
    if (typeof e == "function") return _t(t, "change", {}, e).newDoc;
    if (typeof n == "function") return typeof e == "string" && (e = {
      message: e
    }), _t(t, "change", e, n).newDoc;
    throw RangeError("Invalid args for change");
  }
  function mc(t, e, n, r) {
    if (typeof n == "function") return _t(t, "changeAt", {}, n, e);
    if (typeof r == "function") return typeof n == "string" && (n = {
      message: n
    }), _t(t, "changeAt", n, r, e);
    throw RangeError("Invalid args for changeAt");
  }
  function xt(t, e, n, r) {
    if (n == null) return t;
    const s = ae(t), o = Object.assign(Object.assign({}, s), {
      heads: void 0
    }), { value: i, patches: a } = s.handle.applyAndReturnPatches(t, o);
    if (a.length > 0) {
      r == null ? void 0 : r(a, {
        before: t,
        after: i,
        source: e
      });
      const c = ae(i);
      c.mostRecentPatch = {
        before: ae(t).heads,
        after: c.handle.getHeads(),
        patches: a
      };
    }
    return s.heads = n, i;
  }
  function _t(t, e, n, r, s) {
    if (typeof r != "function") throw new RangeError("invalid change function");
    const o = ae(t);
    if (t === void 0 || o === void 0) throw new RangeError("must be the document root");
    if (o.heads) throw new RangeError("Attempting to change an outdated document.  Use Automerge.clone() if you wish to make a writable copy.");
    if (Zt(t)) throw new RangeError("Calls to Automerge.change cannot be nested");
    let i = o.handle.getHeads();
    s && kc(s, i) && (s = void 0), s && (o.handle.isolate(s), i = s), "time" in n || (n.time = Math.floor(Date.now() / 1e3));
    try {
      o.heads = i;
      const a = rc(o.handle, o.textV2);
      if (r(a), o.handle.pendingOps() === 0) return o.heads = void 0, s && o.handle.integrate(), {
        newDoc: t,
        newHeads: null
      };
      {
        const c = o.handle.commit(n.message, n.time);
        return o.handle.integrate(), {
          newDoc: xt(t, e, i, n.patchCallback || o.patchCallback),
          newHeads: c != null ? [
            c
          ] : null
        };
      }
    } catch (a) {
      throw o.heads = void 0, o.handle.rollback(), a;
    }
  }
  function wc(t, e) {
    e === void 0 && (e = {}), typeof e == "string" && (e = {
      message: e
    }), "time" in e || (e.time = Math.floor(Date.now() / 1e3));
    const n = ae(t);
    if (n.heads) throw new RangeError("Attempting to change an outdated document.  Use Automerge.clone() if you wish to make a writable copy.");
    if (Zt(t)) throw new RangeError("Calls to Automerge.change cannot be nested");
    const r = n.handle.getHeads();
    return n.handle.emptyChange(e.message, e.time), xt(t, "emptyChange", r);
  }
  function vc(t, e) {
    const n = Yn(e), r = n.actor, s = n.patchCallback, o = !n.enableTextV2, i = n.unchecked || false, a = n.allowMissingChanges || false, c = n.convertRawStringsToText || false, u = le.load(t, {
      text_v1: o,
      actor: r,
      unchecked: i,
      allowMissingDeps: a,
      convertRawStringsToText: c
    });
    u.enableFreeze(!!n.freeze);
    const f = n.enableTextV2 || false;
    return Es(u, f), u.materialize("/", void 0, {
      handle: u,
      heads: void 0,
      patchCallback: s,
      textV2: f
    });
  }
  function xs(t, e, n) {
    n || (n = {});
    const r = ae(t);
    if (r.heads) throw new RangeError("Attempting to change an out of date document - set at: " + vs(t));
    if (Zt(t)) throw new RangeError("Calls to Automerge.change cannot be nested");
    const s = r.handle.getHeads();
    return r.handle.loadIncremental(e), xt(t, "loadIncremental", s, n.patchCallback || r.patchCallback);
  }
  function Ss(t) {
    return ae(t).handle.save();
  }
  function xc(t, e) {
    const n = ae(t);
    if (n.heads) throw new RangeError("Attempting to change an out of date document - set at: " + vs(t));
    const r = n.handle.getHeads(), s = ae(e), o = n.handle.getChangesAdded(s.handle);
    return n.handle.applyChanges(o), xt(t, "merge", r, n.patchCallback);
  }
  function Sc(t, e, n) {
    Ar(e, "before"), Ar(n, "after");
    const r = ae(t);
    return r.mostRecentPatch && Cn(r.mostRecentPatch.before, e) && Cn(r.mostRecentPatch.after, n) ? r.mostRecentPatch.patches : r.handle.diff(e, n);
  }
  function kc(t, e) {
    if (t.length !== e.length) return false;
    for (let n = 0; n < t.length; n++) if (t[n] !== e[n]) return false;
    return true;
  }
  function Ar(t, e) {
    if (!Array.isArray(t)) throw new Error(`${e} must be an array`);
  }
  function Cn(t, e) {
    if (!Er(t) || !Er(e)) return t === e;
    const n = Object.keys(t).sort(), r = Object.keys(e).sort();
    if (n.length !== r.length) return false;
    for (let s = 0; s < n.length; s++) if (n[s] !== r[s] || !Cn(t[n[s]], e[r[s]])) return false;
    return true;
  }
  function ks(t) {
    const e = le.importSyncState(t), n = le.encodeSyncState(e);
    return e.free(), n;
  }
  function As(t) {
    const e = le.decodeSyncState(t), n = le.exportSyncState(e);
    return e.free(), n;
  }
  function Ac(t, e) {
    const n = ae(t), r = le.importSyncState(e), s = n.handle.generateSyncMessage(r);
    return [
      le.exportSyncState(r),
      s
    ];
  }
  function Ec(t, e, n, r) {
    const s = le.importSyncState(e);
    r || (r = {});
    const o = ae(t);
    if (o.heads) throw new RangeError("Attempting to change an outdated document.  Use Automerge.clone() if you wish to make a writable copy.");
    if (Zt(t)) throw new RangeError("Calls to Automerge.change cannot be nested");
    const i = o.handle.getHeads();
    o.handle.receiveSyncMessage(s, n);
    const a = le.exportSyncState(s);
    return [
      xt(t, "receiveSyncMessage", i, r.patchCallback || o.patchCallback),
      a,
      null
    ];
  }
  function Ic() {
    return le.exportSyncState(le.initSyncState());
  }
  function Cc(t) {
    return le.decodeSyncMessage(t);
  }
  function me(t) {
    const e = ae(t);
    return e.heads || e.handle.getHeads();
  }
  function Er(t) {
    return typeof t == "object" && t !== null;
  }
  function Oc(t, e) {
    return ae(t).handle.saveSince(e);
  }
  function Es(t, e) {
    t.registerDatatype("counter", (n) => new En(n), (n) => {
      if (n instanceof En) return n.value;
    }), e ? t.registerDatatype("str", (n) => new In(n), (n) => {
      if (n instanceof In) return n.val;
    }) : t.registerDatatype("text", (n) => new Re(n), (n) => {
      if (n instanceof Re) return n.join("");
    });
  }
  function Qt(t) {
    const e = en(t);
    return e.enableTextV2 = true, Xn(e);
  }
  function Ir(t, e) {
    const n = en(e);
    return n.enableTextV2 = true, pc(t, n);
  }
  function Tc(t, e) {
    const n = en(e);
    return n.enableTextV2 = true, yc(t, n);
  }
  function Rc(t, e) {
    const n = en(e);
    return n.enableTextV2 = true, n.patchCallback ? xs(Xn(n), t) : vc(t, n);
  }
  function en(t) {
    return {
      actor: t
    };
  }
  Zn = function(t) {
    return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
  };
  var Et = {
    exports: {}
  }, sn, Cr;
  function Mc() {
    if (Cr) return sn;
    Cr = 1;
    var t = 1e3, e = t * 60, n = e * 60, r = n * 24, s = r * 7, o = r * 365.25;
    sn = function(f, l) {
      l = l || {};
      var d = typeof f;
      if (d === "string" && f.length > 0) return i(f);
      if (d === "number" && isFinite(f)) return l.long ? c(f) : a(f);
      throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(f));
    };
    function i(f) {
      if (f = String(f), !(f.length > 100)) {
        var l = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(f);
        if (l) {
          var d = parseFloat(l[1]), h = (l[2] || "ms").toLowerCase();
          switch (h) {
            case "years":
            case "year":
            case "yrs":
            case "yr":
            case "y":
              return d * o;
            case "weeks":
            case "week":
            case "w":
              return d * s;
            case "days":
            case "day":
            case "d":
              return d * r;
            case "hours":
            case "hour":
            case "hrs":
            case "hr":
            case "h":
              return d * n;
            case "minutes":
            case "minute":
            case "mins":
            case "min":
            case "m":
              return d * e;
            case "seconds":
            case "second":
            case "secs":
            case "sec":
            case "s":
              return d * t;
            case "milliseconds":
            case "millisecond":
            case "msecs":
            case "msec":
            case "ms":
              return d;
            default:
              return;
          }
        }
      }
    }
    function a(f) {
      var l = Math.abs(f);
      return l >= r ? Math.round(f / r) + "d" : l >= n ? Math.round(f / n) + "h" : l >= e ? Math.round(f / e) + "m" : l >= t ? Math.round(f / t) + "s" : f + "ms";
    }
    function c(f) {
      var l = Math.abs(f);
      return l >= r ? u(f, l, r, "day") : l >= n ? u(f, l, n, "hour") : l >= e ? u(f, l, e, "minute") : l >= t ? u(f, l, t, "second") : f + " ms";
    }
    function u(f, l, d, h) {
      var g = l >= d * 1.5;
      return Math.round(f / d) + " " + h + (g ? "s" : "");
    }
    return sn;
  }
  var on, Or;
  function jc() {
    if (Or) return on;
    Or = 1;
    function t(e) {
      r.debug = r, r.default = r, r.coerce = u, r.disable = a, r.enable = o, r.enabled = c, r.humanize = Mc(), r.destroy = f, Object.keys(e).forEach((l) => {
        r[l] = e[l];
      }), r.names = [], r.skips = [], r.formatters = {};
      function n(l) {
        let d = 0;
        for (let h = 0; h < l.length; h++) d = (d << 5) - d + l.charCodeAt(h), d |= 0;
        return r.colors[Math.abs(d) % r.colors.length];
      }
      r.selectColor = n;
      function r(l) {
        let d, h = null, g, v;
        function x(...R) {
          if (!x.enabled) return;
          const M = x, k = Number(/* @__PURE__ */ new Date()), z = k - (d || k);
          M.diff = z, M.prev = d, M.curr = k, d = k, R[0] = r.coerce(R[0]), typeof R[0] != "string" && R.unshift("%O");
          let $ = 0;
          R[0] = R[0].replace(/%([a-zA-Z%])/g, (Y, L) => {
            if (Y === "%%") return "%";
            $++;
            const J = r.formatters[L];
            if (typeof J == "function") {
              const G = R[$];
              Y = J.call(M, G), R.splice($, 1), $--;
            }
            return Y;
          }), r.formatArgs.call(M, R), (M.log || r.log).apply(M, R);
        }
        return x.namespace = l, x.useColors = r.useColors(), x.color = r.selectColor(l), x.extend = s, x.destroy = r.destroy, Object.defineProperty(x, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => h !== null ? h : (g !== r.namespaces && (g = r.namespaces, v = r.enabled(l)), v),
          set: (R) => {
            h = R;
          }
        }), typeof r.init == "function" && r.init(x), x;
      }
      function s(l, d) {
        const h = r(this.namespace + (typeof d > "u" ? ":" : d) + l);
        return h.log = this.log, h;
      }
      function o(l) {
        r.save(l), r.namespaces = l, r.names = [], r.skips = [];
        const d = (typeof l == "string" ? l : "").trim().replace(" ", ",").split(",").filter(Boolean);
        for (const h of d) h[0] === "-" ? r.skips.push(h.slice(1)) : r.names.push(h);
      }
      function i(l, d) {
        let h = 0, g = 0, v = -1, x = 0;
        for (; h < l.length; ) if (g < d.length && (d[g] === l[h] || d[g] === "*")) d[g] === "*" ? (v = g, x = h, g++) : (h++, g++);
        else if (v !== -1) g = v + 1, x++, h = x;
        else return false;
        for (; g < d.length && d[g] === "*"; ) g++;
        return g === d.length;
      }
      function a() {
        const l = [
          ...r.names,
          ...r.skips.map((d) => "-" + d)
        ].join(",");
        return r.enable(""), l;
      }
      function c(l) {
        for (const d of r.skips) if (i(l, d)) return false;
        for (const d of r.names) if (i(l, d)) return true;
        return false;
      }
      function u(l) {
        return l instanceof Error ? l.stack || l.message : l;
      }
      function f() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      return r.enable(r.load()), r;
    }
    return on = t, on;
  }
  var Tr;
  function Dc() {
    return Tr || (Tr = 1, function(t, e) {
      var n = {};
      e.formatArgs = s, e.save = o, e.load = i, e.useColors = r, e.storage = a(), e.destroy = /* @__PURE__ */ (() => {
        let u = false;
        return () => {
          u || (u = true, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
        };
      })(), e.colors = [
        "#0000CC",
        "#0000FF",
        "#0033CC",
        "#0033FF",
        "#0066CC",
        "#0066FF",
        "#0099CC",
        "#0099FF",
        "#00CC00",
        "#00CC33",
        "#00CC66",
        "#00CC99",
        "#00CCCC",
        "#00CCFF",
        "#3300CC",
        "#3300FF",
        "#3333CC",
        "#3333FF",
        "#3366CC",
        "#3366FF",
        "#3399CC",
        "#3399FF",
        "#33CC00",
        "#33CC33",
        "#33CC66",
        "#33CC99",
        "#33CCCC",
        "#33CCFF",
        "#6600CC",
        "#6600FF",
        "#6633CC",
        "#6633FF",
        "#66CC00",
        "#66CC33",
        "#9900CC",
        "#9900FF",
        "#9933CC",
        "#9933FF",
        "#99CC00",
        "#99CC33",
        "#CC0000",
        "#CC0033",
        "#CC0066",
        "#CC0099",
        "#CC00CC",
        "#CC00FF",
        "#CC3300",
        "#CC3333",
        "#CC3366",
        "#CC3399",
        "#CC33CC",
        "#CC33FF",
        "#CC6600",
        "#CC6633",
        "#CC9900",
        "#CC9933",
        "#CCCC00",
        "#CCCC33",
        "#FF0000",
        "#FF0033",
        "#FF0066",
        "#FF0099",
        "#FF00CC",
        "#FF00FF",
        "#FF3300",
        "#FF3333",
        "#FF3366",
        "#FF3399",
        "#FF33CC",
        "#FF33FF",
        "#FF6600",
        "#FF6633",
        "#FF9900",
        "#FF9933",
        "#FFCC00",
        "#FFCC33"
      ];
      function r() {
        if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) return true;
        if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return false;
        let u;
        return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator < "u" && navigator.userAgent && (u = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(u[1], 10) >= 31 || typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
      }
      function s(u) {
        if (u[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + u[0] + (this.useColors ? "%c " : " ") + "+" + t.exports.humanize(this.diff), !this.useColors) return;
        const f = "color: " + this.color;
        u.splice(1, 0, f, "color: inherit");
        let l = 0, d = 0;
        u[0].replace(/%[a-zA-Z%]/g, (h) => {
          h !== "%%" && (l++, h === "%c" && (d = l));
        }), u.splice(d, 0, f);
      }
      e.log = console.debug || console.log || (() => {
      });
      function o(u) {
        try {
          u ? e.storage.setItem("debug", u) : e.storage.removeItem("debug");
        } catch {
        }
      }
      function i() {
        let u;
        try {
          u = e.storage.getItem("debug");
        } catch {
        }
        return !u && typeof process < "u" && "env" in process && (u = n.DEBUG), u;
      }
      function a() {
        try {
          return localStorage;
        } catch {
        }
      }
      t.exports = jc()(e);
      const { formatters: c } = t.exports;
      c.j = function(u) {
        try {
          return JSON.stringify(u);
        } catch (f) {
          return "[UnexpectedJSONParseError]: " + f.message;
        }
      };
    }(Et, Et.exports)), Et.exports;
  }
  var Uc = Dc();
  const Me = Zn(Uc);
  var an = {
    exports: {}
  }, Rr;
  function $c() {
    return Rr || (Rr = 1, function(t) {
      var e = Object.prototype.hasOwnProperty, n = "~";
      function r() {
      }
      Object.create && (r.prototype = /* @__PURE__ */ Object.create(null), new r().__proto__ || (n = false));
      function s(c, u, f) {
        this.fn = c, this.context = u, this.once = f || false;
      }
      function o(c, u, f, l, d) {
        if (typeof f != "function") throw new TypeError("The listener must be a function");
        var h = new s(f, l || c, d), g = n ? n + u : u;
        return c._events[g] ? c._events[g].fn ? c._events[g] = [
          c._events[g],
          h
        ] : c._events[g].push(h) : (c._events[g] = h, c._eventsCount++), c;
      }
      function i(c, u) {
        --c._eventsCount === 0 ? c._events = new r() : delete c._events[u];
      }
      function a() {
        this._events = new r(), this._eventsCount = 0;
      }
      a.prototype.eventNames = function() {
        var u = [], f, l;
        if (this._eventsCount === 0) return u;
        for (l in f = this._events) e.call(f, l) && u.push(n ? l.slice(1) : l);
        return Object.getOwnPropertySymbols ? u.concat(Object.getOwnPropertySymbols(f)) : u;
      }, a.prototype.listeners = function(u) {
        var f = n ? n + u : u, l = this._events[f];
        if (!l) return [];
        if (l.fn) return [
          l.fn
        ];
        for (var d = 0, h = l.length, g = new Array(h); d < h; d++) g[d] = l[d].fn;
        return g;
      }, a.prototype.listenerCount = function(u) {
        var f = n ? n + u : u, l = this._events[f];
        return l ? l.fn ? 1 : l.length : 0;
      }, a.prototype.emit = function(u, f, l, d, h, g) {
        var v = n ? n + u : u;
        if (!this._events[v]) return false;
        var x = this._events[v], R = arguments.length, M, k;
        if (x.fn) {
          switch (x.once && this.removeListener(u, x.fn, void 0, true), R) {
            case 1:
              return x.fn.call(x.context), true;
            case 2:
              return x.fn.call(x.context, f), true;
            case 3:
              return x.fn.call(x.context, f, l), true;
            case 4:
              return x.fn.call(x.context, f, l, d), true;
            case 5:
              return x.fn.call(x.context, f, l, d, h), true;
            case 6:
              return x.fn.call(x.context, f, l, d, h, g), true;
          }
          for (k = 1, M = new Array(R - 1); k < R; k++) M[k - 1] = arguments[k];
          x.fn.apply(x.context, M);
        } else {
          var z = x.length, $;
          for (k = 0; k < z; k++) switch (x[k].once && this.removeListener(u, x[k].fn, void 0, true), R) {
            case 1:
              x[k].fn.call(x[k].context);
              break;
            case 2:
              x[k].fn.call(x[k].context, f);
              break;
            case 3:
              x[k].fn.call(x[k].context, f, l);
              break;
            case 4:
              x[k].fn.call(x[k].context, f, l, d);
              break;
            default:
              if (!M) for ($ = 1, M = new Array(R - 1); $ < R; $++) M[$ - 1] = arguments[$];
              x[k].fn.apply(x[k].context, M);
          }
        }
        return true;
      }, a.prototype.on = function(u, f, l) {
        return o(this, u, f, l, false);
      }, a.prototype.once = function(u, f, l) {
        return o(this, u, f, l, true);
      }, a.prototype.removeListener = function(u, f, l, d) {
        var h = n ? n + u : u;
        if (!this._events[h]) return this;
        if (!f) return i(this, h), this;
        var g = this._events[h];
        if (g.fn) g.fn === f && (!d || g.once) && (!l || g.context === l) && i(this, h);
        else {
          for (var v = 0, x = [], R = g.length; v < R; v++) (g[v].fn !== f || d && !g[v].once || l && g[v].context !== l) && x.push(g[v]);
          x.length ? this._events[h] = x.length === 1 ? x[0] : x : i(this, h);
        }
        return this;
      }, a.prototype.removeAllListeners = function(u) {
        var f;
        return u ? (f = n ? n + u : u, this._events[f] && i(this, f)) : (this._events = new r(), this._eventsCount = 0), this;
      }, a.prototype.off = a.prototype.removeListener, a.prototype.addListener = a.prototype.on, a.prefixed = n, a.EventEmitter = a, t.exports = a;
    }(an)), an.exports;
  }
  var Bc = $c();
  const ot = Zn(Bc);
  function Pc() {
    if (typeof globalThis < "u") return globalThis;
    if (typeof self < "u") return self;
    if (typeof window < "u") return window;
    if (typeof global < "u") return global;
  }
  function Fc() {
    const t = Pc();
    if (t.__xstate__) return t.__xstate__;
  }
  const Hc = (t) => {
    if (typeof window > "u") return;
    const e = Fc();
    e && e.register(t);
  };
  class Mr {
    constructor(e) {
      this._process = e, this._active = false, this._current = null, this._last = null;
    }
    start() {
      this._active = true, this.flush();
    }
    clear() {
      this._current && (this._current.next = null, this._last = this._current);
    }
    enqueue(e) {
      const n = {
        value: e,
        next: null
      };
      if (this._current) {
        this._last.next = n, this._last = n;
        return;
      }
      this._current = n, this._last = n, this._active && this.flush();
    }
    flush() {
      for (; this._current; ) {
        const e = this._current;
        this._process(e.value), this._current = e.next;
      }
      this._last = null;
    }
  }
  const Is = ".", Lc = "", Cs = "", zc = "#", Nc = "*", Os = "xstate.init", On = "xstate.stop";
  function Vc(t, e) {
    return {
      type: `xstate.after.${t}.${e}`
    };
  }
  function Tn(t, e) {
    return {
      type: `xstate.done.state.${t}`,
      output: e
    };
  }
  function Wc(t, e) {
    return {
      type: `xstate.done.actor.${t}`,
      output: e,
      actorId: t
    };
  }
  function qc(t, e) {
    return {
      type: `xstate.error.actor.${t}`,
      error: e,
      actorId: t
    };
  }
  function Ts(t) {
    return {
      type: Os,
      input: t
    };
  }
  function Ee(t) {
    setTimeout(() => {
      throw t;
    });
  }
  const Kc = typeof Symbol == "function" && Symbol.observable || "@@observable";
  function Rs(t, e) {
    const n = jr(t), r = jr(e);
    return typeof r == "string" ? typeof n == "string" ? r === n : false : typeof n == "string" ? n in r : Object.keys(n).every((s) => s in r ? Rs(n[s], r[s]) : false);
  }
  function Qn(t) {
    if (js(t)) return t;
    const e = [];
    let n = "";
    for (let r = 0; r < t.length; r++) {
      switch (t.charCodeAt(r)) {
        case 92:
          n += t[r + 1], r++;
          continue;
        case 46:
          e.push(n), n = "";
          continue;
      }
      n += t[r];
    }
    return e.push(n), e;
  }
  function jr(t) {
    if (Iu(t)) return t.value;
    if (typeof t != "string") return t;
    const e = Qn(t);
    return Jc(e);
  }
  function Jc(t) {
    if (t.length === 1) return t[0];
    const e = {};
    let n = e;
    for (let r = 0; r < t.length - 1; r++) if (r === t.length - 2) n[t[r]] = t[r + 1];
    else {
      const s = n;
      n = {}, s[t[r]] = n;
    }
    return e;
  }
  function Dr(t, e) {
    const n = {}, r = Object.keys(t);
    for (let s = 0; s < r.length; s++) {
      const o = r[s];
      n[o] = e(t[o], o, t, s);
    }
    return n;
  }
  function Ms(t) {
    return js(t) ? t : [
      t
    ];
  }
  function Te(t) {
    return t === void 0 ? [] : Ms(t);
  }
  function Rn(t, e, n, r) {
    return typeof t == "function" ? t({
      context: e,
      event: n,
      self: r
    }) : t;
  }
  function js(t) {
    return Array.isArray(t);
  }
  function Gc(t) {
    return t.type.startsWith("xstate.error.actor");
  }
  function Je(t) {
    return Ms(t).map((e) => typeof e > "u" || typeof e == "string" ? {
      target: e
    } : e);
  }
  function Ds(t) {
    if (!(t === void 0 || t === Lc)) return Te(t);
  }
  function Mn(t, e, n) {
    var _a5, _b, _c3;
    const r = typeof t == "object", s = r ? t : void 0;
    return {
      next: (_a5 = r ? t.next : t) == null ? void 0 : _a5.bind(s),
      error: (_b = r ? t.error : e) == null ? void 0 : _b.bind(s),
      complete: (_c3 = r ? t.complete : n) == null ? void 0 : _c3.bind(s)
    };
  }
  function Ur(t, e) {
    return `${e}.${t}`;
  }
  function er(t, e) {
    const n = e.match(/^xstate\.invoke\.(\d+)\.(.*)/);
    if (!n) return t.implementations.actors[e];
    const [, r, s] = n, i = t.getStateNodeById(s).config.invoke;
    return (Array.isArray(i) ? i[r] : i).src;
  }
  function $r(t, e) {
    return `${t.sessionId}.${e}`;
  }
  let Yc = 0;
  function Xc(t, e) {
    const n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new Set(), i = {}, { clock: a, logger: c } = e, u = {
      schedule: (d, h, g, v, x = Math.random().toString(36).slice(2)) => {
        const R = {
          source: d,
          target: h,
          event: g,
          delay: v,
          id: x,
          startedAt: Date.now()
        }, M = $r(d, x);
        l._snapshot._scheduledEvents[M] = R;
        const k = a.setTimeout(() => {
          delete i[M], delete l._snapshot._scheduledEvents[M], l._relay(d, h, g);
        }, v);
        i[M] = k;
      },
      cancel: (d, h) => {
        const g = $r(d, h), v = i[g];
        delete i[g], delete l._snapshot._scheduledEvents[g], v !== void 0 && a.clearTimeout(v);
      },
      cancelAll: (d) => {
        for (const h in l._snapshot._scheduledEvents) {
          const g = l._snapshot._scheduledEvents[h];
          g.source === d && u.cancel(d, g.id);
        }
      }
    }, f = (d) => {
      if (!o.size) return;
      const h = {
        ...d,
        rootId: t.sessionId
      };
      o.forEach((g) => {
        var _a5;
        return (_a5 = g.next) == null ? void 0 : _a5.call(g, h);
      });
    }, l = {
      _snapshot: {
        _scheduledEvents: ((e == null ? void 0 : e.snapshot) && e.snapshot.scheduler) ?? {}
      },
      _bookId: () => `x:${Yc++}`,
      _register: (d, h) => (n.set(d, h), d),
      _unregister: (d) => {
        n.delete(d.sessionId);
        const h = s.get(d);
        h !== void 0 && (r.delete(h), s.delete(d));
      },
      get: (d) => r.get(d),
      _set: (d, h) => {
        const g = r.get(d);
        if (g && g !== h) throw new Error(`Actor with system ID '${d}' already exists.`);
        r.set(d, h), s.set(h, d);
      },
      inspect: (d) => {
        const h = Mn(d);
        return o.add(h), {
          unsubscribe() {
            o.delete(h);
          }
        };
      },
      _sendInspectionEvent: f,
      _relay: (d, h, g) => {
        l._sendInspectionEvent({
          type: "@xstate.event",
          sourceRef: d,
          actorRef: h,
          event: g
        }), h._send(g);
      },
      scheduler: u,
      getSnapshot: () => ({
        _scheduledEvents: {
          ...l._snapshot._scheduledEvents
        }
      }),
      start: () => {
        const d = l._snapshot._scheduledEvents;
        l._snapshot._scheduledEvents = {};
        for (const h in d) {
          const { source: g, target: v, event: x, delay: R, id: M } = d[h];
          u.schedule(g, v, x, R, M);
        }
      },
      _clock: a,
      _logger: c
    };
    return l;
  }
  let cn = false;
  const tr = 1;
  let ue = function(t) {
    return t[t.NotStarted = 0] = "NotStarted", t[t.Running = 1] = "Running", t[t.Stopped = 2] = "Stopped", t;
  }({});
  const Zc = {
    clock: {
      setTimeout: (t, e) => setTimeout(t, e),
      clearTimeout: (t) => clearTimeout(t)
    },
    logger: console.log.bind(console),
    devTools: false
  };
  class Qc {
    constructor(e, n) {
      this.logic = e, this._snapshot = void 0, this.clock = void 0, this.options = void 0, this.id = void 0, this.mailbox = new Mr(this._process.bind(this)), this.observers = /* @__PURE__ */ new Set(), this.eventListeners = /* @__PURE__ */ new Map(), this.logger = void 0, this._processingStatus = ue.NotStarted, this._parent = void 0, this._syncSnapshot = void 0, this.ref = void 0, this._actorScope = void 0, this._systemId = void 0, this.sessionId = void 0, this.system = void 0, this._doneEvent = void 0, this.src = void 0, this._deferred = [];
      const r = {
        ...Zc,
        ...n
      }, { clock: s, logger: o, parent: i, syncSnapshot: a, id: c, systemId: u, inspect: f } = r;
      this.system = i ? i.system : Xc(this, {
        clock: s,
        logger: o
      }), f && !i && this.system.inspect(Mn(f)), this.sessionId = this.system._bookId(), this.id = c ?? this.sessionId, this.logger = (n == null ? void 0 : n.logger) ?? this.system._logger, this.clock = (n == null ? void 0 : n.clock) ?? this.system._clock, this._parent = i, this._syncSnapshot = a, this.options = r, this.src = r.src ?? e, this.ref = this, this._actorScope = {
        self: this,
        id: this.id,
        sessionId: this.sessionId,
        logger: this.logger,
        defer: (l) => {
          this._deferred.push(l);
        },
        system: this.system,
        stopChild: (l) => {
          if (l._parent !== this) throw new Error(`Cannot stop child actor ${l.id} of ${this.id} because it is not a child`);
          l._stop();
        },
        emit: (l) => {
          const d = this.eventListeners.get(l.type), h = this.eventListeners.get("*");
          if (!d && !h) return;
          const g = [
            ...d ? d.values() : [],
            ...h ? h.values() : []
          ];
          for (const v of g) v(l);
        },
        actionExecutor: (l) => {
          const d = () => {
            if (this._actorScope.system._sendInspectionEvent({
              type: "@xstate.action",
              actorRef: this,
              action: {
                type: l.type,
                params: l.params
              }
            }), !l.exec) return;
            const h = cn;
            try {
              cn = true, l.exec(l.info, l.params);
            } finally {
              cn = h;
            }
          };
          this._processingStatus === ue.Running ? d() : this._deferred.push(d);
        }
      }, this.send = this.send.bind(this), this.system._sendInspectionEvent({
        type: "@xstate.actor",
        actorRef: this
      }), u && (this._systemId = u, this.system._set(u, this)), this._initState((n == null ? void 0 : n.snapshot) ?? (n == null ? void 0 : n.state)), u && this._snapshot.status !== "active" && this.system._unregister(this);
    }
    _initState(e) {
      var _a5;
      try {
        this._snapshot = e ? this.logic.restoreSnapshot ? this.logic.restoreSnapshot(e, this._actorScope) : e : this.logic.getInitialSnapshot(this._actorScope, (_a5 = this.options) == null ? void 0 : _a5.input);
      } catch (n) {
        this._snapshot = {
          status: "error",
          output: void 0,
          error: n
        };
      }
    }
    update(e, n) {
      var _a5, _b;
      this._snapshot = e;
      let r;
      for (; r = this._deferred.shift(); ) try {
        r();
      } catch (s) {
        this._deferred.length = 0, this._snapshot = {
          ...e,
          status: "error",
          error: s
        };
      }
      switch (this._snapshot.status) {
        case "active":
          for (const s of this.observers) try {
            (_a5 = s.next) == null ? void 0 : _a5.call(s, e);
          } catch (o) {
            Ee(o);
          }
          break;
        case "done":
          for (const s of this.observers) try {
            (_b = s.next) == null ? void 0 : _b.call(s, e);
          } catch (o) {
            Ee(o);
          }
          this._stopProcedure(), this._complete(), this._doneEvent = Wc(this.id, this._snapshot.output), this._parent && this.system._relay(this, this._parent, this._doneEvent);
          break;
        case "error":
          this._error(this._snapshot.error);
          break;
      }
      this.system._sendInspectionEvent({
        type: "@xstate.snapshot",
        actorRef: this,
        event: n,
        snapshot: e
      });
    }
    subscribe(e, n, r) {
      var _a5;
      const s = Mn(e, n, r);
      if (this._processingStatus !== ue.Stopped) this.observers.add(s);
      else switch (this._snapshot.status) {
        case "done":
          try {
            (_a5 = s.complete) == null ? void 0 : _a5.call(s);
          } catch (o) {
            Ee(o);
          }
          break;
        case "error": {
          const o = this._snapshot.error;
          if (!s.error) Ee(o);
          else try {
            s.error(o);
          } catch (i) {
            Ee(i);
          }
          break;
        }
      }
      return {
        unsubscribe: () => {
          this.observers.delete(s);
        }
      };
    }
    on(e, n) {
      let r = this.eventListeners.get(e);
      r || (r = /* @__PURE__ */ new Set(), this.eventListeners.set(e, r));
      const s = n.bind(void 0);
      return r.add(s), {
        unsubscribe: () => {
          r.delete(s);
        }
      };
    }
    start() {
      if (this._processingStatus === ue.Running) return this;
      this._syncSnapshot && this.subscribe({
        next: (r) => {
          r.status === "active" && this.system._relay(this, this._parent, {
            type: `xstate.snapshot.${this.id}`,
            snapshot: r
          });
        },
        error: () => {
        }
      }), this.system._register(this.sessionId, this), this._systemId && this.system._set(this._systemId, this), this._processingStatus = ue.Running;
      const e = Ts(this.options.input);
      switch (this.system._sendInspectionEvent({
        type: "@xstate.event",
        sourceRef: this._parent,
        actorRef: this,
        event: e
      }), this._snapshot.status) {
        case "done":
          return this.update(this._snapshot, e), this;
        case "error":
          return this._error(this._snapshot.error), this;
      }
      if (this._parent || this.system.start(), this.logic.start) try {
        this.logic.start(this._snapshot, this._actorScope);
      } catch (r) {
        return this._snapshot = {
          ...this._snapshot,
          status: "error",
          error: r
        }, this._error(r), this;
      }
      return this.update(this._snapshot, e), this.options.devTools && this.attachDevTools(), this.mailbox.start(), this;
    }
    _process(e) {
      let n, r;
      try {
        n = this.logic.transition(this._snapshot, e, this._actorScope);
      } catch (s) {
        r = {
          err: s
        };
      }
      if (r) {
        const { err: s } = r;
        this._snapshot = {
          ...this._snapshot,
          status: "error",
          error: s
        }, this._error(s);
        return;
      }
      this.update(n, e), e.type === On && (this._stopProcedure(), this._complete());
    }
    _stop() {
      return this._processingStatus === ue.Stopped ? this : (this.mailbox.clear(), this._processingStatus === ue.NotStarted ? (this._processingStatus = ue.Stopped, this) : (this.mailbox.enqueue({
        type: On
      }), this));
    }
    stop() {
      if (this._parent) throw new Error("A non-root actor cannot be stopped directly.");
      return this._stop();
    }
    _complete() {
      var _a5;
      for (const e of this.observers) try {
        (_a5 = e.complete) == null ? void 0 : _a5.call(e);
      } catch (n) {
        Ee(n);
      }
      this.observers.clear();
    }
    _reportError(e) {
      if (!this.observers.size) {
        this._parent || Ee(e);
        return;
      }
      let n = false;
      for (const r of this.observers) {
        const s = r.error;
        n || (n = !s);
        try {
          s == null ? void 0 : s(e);
        } catch (o) {
          Ee(o);
        }
      }
      this.observers.clear(), n && Ee(e);
    }
    _error(e) {
      this._stopProcedure(), this._reportError(e), this._parent && this.system._relay(this, this._parent, qc(this.id, e));
    }
    _stopProcedure() {
      return this._processingStatus !== ue.Running ? this : (this.system.scheduler.cancelAll(this), this.mailbox.clear(), this.mailbox = new Mr(this._process.bind(this)), this._processingStatus = ue.Stopped, this.system._unregister(this), this);
    }
    _send(e) {
      this._processingStatus !== ue.Stopped && this.mailbox.enqueue(e);
    }
    send(e) {
      this.system._relay(void 0, this, e);
    }
    attachDevTools() {
      const { devTools: e } = this.options;
      e && (typeof e == "function" ? e : Hc)(this);
    }
    toJSON() {
      return {
        xstate$$type: tr,
        id: this.id
      };
    }
    getPersistedSnapshot(e) {
      return this.logic.getPersistedSnapshot(this._snapshot, e);
    }
    [Kc]() {
      return this;
    }
    getSnapshot() {
      return this._snapshot;
    }
  }
  function gt(t, ...[e]) {
    return new Qc(t, e);
  }
  function eu(t, e, n, r, { sendId: s }) {
    const o = typeof s == "function" ? s(n, r) : s;
    return [
      e,
      {
        sendId: o
      },
      void 0
    ];
  }
  function tu(t, e) {
    t.defer(() => {
      t.system.scheduler.cancel(t.self, e.sendId);
    });
  }
  function nu(t) {
    function e(n, r) {
    }
    return e.type = "xstate.cancel", e.sendId = t, e.resolve = eu, e.execute = tu, e;
  }
  function ru(t, e, n, r, { id: s, systemId: o, src: i, input: a, syncSnapshot: c }) {
    const u = typeof i == "string" ? er(e.machine, i) : i, f = typeof s == "function" ? s(n) : s;
    let l, d;
    return u && (d = typeof a == "function" ? a({
      context: e.context,
      event: n.event,
      self: t.self
    }) : a, l = gt(u, {
      id: f,
      src: i,
      parent: t.self,
      syncSnapshot: c,
      systemId: o,
      input: d
    })), [
      Ne(e, {
        children: {
          ...e.children,
          [f]: l
        }
      }),
      {
        id: s,
        systemId: o,
        actorRef: l,
        src: i,
        input: d
      },
      void 0
    ];
  }
  function su(t, { actorRef: e }) {
    e && t.defer(() => {
      e._processingStatus !== ue.Stopped && e.start();
    });
  }
  function ou(...[t, { id: e, systemId: n, input: r, syncSnapshot: s = false } = {}]) {
    function o(i, a) {
    }
    return o.type = "xstate.spawnChild", o.id = e, o.systemId = n, o.src = t, o.input = r, o.syncSnapshot = s, o.resolve = ru, o.execute = su, o;
  }
  function iu(t, e, n, r, { actorRef: s }) {
    const o = typeof s == "function" ? s(n, r) : s, i = typeof o == "string" ? e.children[o] : o;
    let a = e.children;
    return i && (a = {
      ...a
    }, delete a[i.id]), [
      Ne(e, {
        children: a
      }),
      i,
      void 0
    ];
  }
  function au(t, e) {
    if (e) {
      if (t.system._unregister(e), e._processingStatus !== ue.Running) {
        t.stopChild(e);
        return;
      }
      t.defer(() => {
        t.stopChild(e);
      });
    }
  }
  function Us(t) {
    function e(n, r) {
    }
    return e.type = "xstate.stopChild", e.actorRef = t, e.resolve = iu, e.execute = au, e;
  }
  function nr(t, e, n, r) {
    const { machine: s } = r, o = typeof t == "function", i = o ? t : s.implementations.guards[typeof t == "string" ? t : t.type];
    if (!o && !i) throw new Error(`Guard '${typeof t == "string" ? t : t.type}' is not implemented.'.`);
    if (typeof i != "function") return nr(i, e, n, r);
    const a = {
      context: e,
      event: n
    }, c = o || typeof t == "string" ? void 0 : "params" in t ? typeof t.params == "function" ? t.params({
      context: e,
      event: n
    }) : t.params : void 0;
    return "check" in i ? i.check(r, a, i) : i(a, c);
  }
  const rr = (t) => t.type === "atomic" || t.type === "final";
  function et(t) {
    return Object.values(t.states).filter((e) => e.type !== "history");
  }
  function St(t, e) {
    const n = [];
    if (e === t) return n;
    let r = t.parent;
    for (; r && r !== e; ) n.push(r), r = r.parent;
    return n;
  }
  function Nt(t) {
    const e = new Set(t), n = Bs(e);
    for (const r of e) if (r.type === "compound" && (!n.get(r) || !n.get(r).length)) Br(r).forEach((s) => e.add(s));
    else if (r.type === "parallel") {
      for (const s of et(r)) if (s.type !== "history" && !e.has(s)) {
        const o = Br(s);
        for (const i of o) e.add(i);
      }
    }
    for (const r of e) {
      let s = r.parent;
      for (; s; ) e.add(s), s = s.parent;
    }
    return e;
  }
  function $s(t, e) {
    const n = e.get(t);
    if (!n) return {};
    if (t.type === "compound") {
      const s = n[0];
      if (s) {
        if (rr(s)) return s.key;
      } else return {};
    }
    const r = {};
    for (const s of n) r[s.key] = $s(s, e);
    return r;
  }
  function Bs(t) {
    const e = /* @__PURE__ */ new Map();
    for (const n of t) e.has(n) || e.set(n, []), n.parent && (e.has(n.parent) || e.set(n.parent, []), e.get(n.parent).push(n));
    return e;
  }
  function Ps(t, e) {
    const n = Nt(e);
    return $s(t, Bs(n));
  }
  function sr(t, e) {
    return e.type === "compound" ? et(e).some((n) => n.type === "final" && t.has(n)) : e.type === "parallel" ? et(e).every((n) => sr(t, n)) : e.type === "final";
  }
  const tn = (t) => t[0] === zc;
  function cu(t, e) {
    return t.transitions.get(e) || [
      ...t.transitions.keys()
    ].filter((r) => {
      if (r === Nc) return true;
      if (!r.endsWith(".*")) return false;
      const s = r.split("."), o = e.split(".");
      for (let i = 0; i < s.length; i++) {
        const a = s[i], c = o[i];
        if (a === "*") return i === s.length - 1;
        if (a !== c) return false;
      }
      return true;
    }).sort((r, s) => s.length - r.length).flatMap((r) => t.transitions.get(r));
  }
  function uu(t) {
    const e = t.config.after;
    if (!e) return [];
    const n = (s) => {
      const o = Vc(s, t.id), i = o.type;
      return t.entry.push($u(o, {
        id: i,
        delay: s
      })), t.exit.push(nu(i)), i;
    };
    return Object.keys(e).flatMap((s) => {
      const o = e[s], i = typeof o == "string" ? {
        target: o
      } : o, a = Number.isNaN(+s) ? s : +s, c = n(a);
      return Te(i).map((u) => ({
        ...u,
        event: c,
        delay: a
      }));
    }).map((s) => {
      const { delay: o } = s;
      return {
        ...Fe(t, s.event, s),
        delay: o
      };
    });
  }
  function Fe(t, e, n) {
    const r = Ds(n.target), s = n.reenter ?? false, o = du(t, r), i = {
      ...n,
      actions: Te(n.actions),
      guard: n.guard,
      target: o,
      source: t,
      reenter: s,
      eventType: e,
      toJSON: () => ({
        ...i,
        source: `#${t.id}`,
        target: o ? o.map((a) => `#${a.id}`) : void 0
      })
    };
    return i;
  }
  function fu(t) {
    const e = /* @__PURE__ */ new Map();
    if (t.config.on) for (const n of Object.keys(t.config.on)) {
      if (n === Cs) throw new Error('Null events ("") cannot be specified as a transition key. Use `always: { ... }` instead.');
      const r = t.config.on[n];
      e.set(n, Je(r).map((s) => Fe(t, n, s)));
    }
    if (t.config.onDone) {
      const n = `xstate.done.state.${t.id}`;
      e.set(n, Je(t.config.onDone).map((r) => Fe(t, n, r)));
    }
    for (const n of t.invoke) {
      if (n.onDone) {
        const r = `xstate.done.actor.${n.id}`;
        e.set(r, Je(n.onDone).map((s) => Fe(t, r, s)));
      }
      if (n.onError) {
        const r = `xstate.error.actor.${n.id}`;
        e.set(r, Je(n.onError).map((s) => Fe(t, r, s)));
      }
      if (n.onSnapshot) {
        const r = `xstate.snapshot.${n.id}`;
        e.set(r, Je(n.onSnapshot).map((s) => Fe(t, r, s)));
      }
    }
    for (const n of t.after) {
      let r = e.get(n.eventType);
      r || (r = [], e.set(n.eventType, r)), r.push(n);
    }
    return e;
  }
  function lu(t, e) {
    const n = typeof e == "string" ? t.states[e] : e ? t.states[e.target] : void 0;
    if (!n && e) throw new Error(`Initial state node "${e}" not found on parent state node #${t.id}`);
    const r = {
      source: t,
      actions: !e || typeof e == "string" ? [] : Te(e.actions),
      eventType: null,
      reenter: false,
      target: n ? [
        n
      ] : [],
      toJSON: () => ({
        ...r,
        source: `#${t.id}`,
        target: n ? [
          `#${n.id}`
        ] : []
      })
    };
    return r;
  }
  function du(t, e) {
    if (e !== void 0) return e.map((n) => {
      if (typeof n != "string") return n;
      if (tn(n)) return t.machine.getStateNodeById(n);
      const r = n[0] === Is;
      if (r && !t.parent) return Vt(t, n.slice(1));
      const s = r ? t.key + n : n;
      if (t.parent) try {
        return Vt(t.parent, s);
      } catch (o) {
        throw new Error(`Invalid transition definition for state node '${t.id}':
${o.message}`);
      }
      else throw new Error(`Invalid target: "${n}" is not a valid target from the root node. Did you mean ".${n}"?`);
    });
  }
  function Fs(t) {
    const e = Ds(t.config.target);
    return e ? {
      target: e.map((n) => typeof n == "string" ? Vt(t.parent, n) : n)
    } : t.parent.initial;
  }
  function Le(t) {
    return t.type === "history";
  }
  function Br(t) {
    const e = Hs(t);
    for (const n of e) for (const r of St(n, t)) e.add(r);
    return e;
  }
  function Hs(t) {
    const e = /* @__PURE__ */ new Set();
    function n(r) {
      if (!e.has(r)) {
        if (e.add(r), r.type === "compound") n(r.initial.target[0]);
        else if (r.type === "parallel") for (const s of et(r)) n(s);
      }
    }
    return n(t), e;
  }
  function tt(t, e) {
    if (tn(e)) return t.machine.getStateNodeById(e);
    if (!t.states) throw new Error(`Unable to retrieve child state '${e}' from '${t.id}'; no child states exist.`);
    const n = t.states[e];
    if (!n) throw new Error(`Child state '${e}' does not exist on '${t.id}'`);
    return n;
  }
  function Vt(t, e) {
    if (typeof e == "string" && tn(e)) try {
      return t.machine.getStateNodeById(e);
    } catch {
    }
    const n = Qn(e).slice();
    let r = t;
    for (; n.length; ) {
      const s = n.shift();
      if (!s.length) break;
      r = tt(r, s);
    }
    return r;
  }
  function Wt(t, e) {
    if (typeof e == "string") {
      const s = t.states[e];
      if (!s) throw new Error(`State '${e}' does not exist on '${t.id}'`);
      return [
        t,
        s
      ];
    }
    const n = Object.keys(e), r = n.map((s) => tt(t, s)).filter(Boolean);
    return [
      t.machine.root,
      t
    ].concat(r, n.reduce((s, o) => {
      const i = tt(t, o);
      if (!i) return s;
      const a = Wt(i, e[o]);
      return s.concat(a);
    }, []));
  }
  function hu(t, e, n, r) {
    const o = tt(t, e).next(n, r);
    return !o || !o.length ? t.next(n, r) : o;
  }
  function _u(t, e, n, r) {
    const s = Object.keys(e), o = tt(t, s[0]), i = or(o, e[s[0]], n, r);
    return !i || !i.length ? t.next(n, r) : i;
  }
  function gu(t, e, n, r) {
    const s = [];
    for (const o of Object.keys(e)) {
      const i = e[o];
      if (!i) continue;
      const a = tt(t, o), c = or(a, i, n, r);
      c && s.push(...c);
    }
    return s.length ? s : t.next(n, r);
  }
  function or(t, e, n, r) {
    return typeof e == "string" ? hu(t, e, n, r) : Object.keys(e).length === 1 ? _u(t, e, n, r) : gu(t, e, n, r);
  }
  function pu(t) {
    return Object.keys(t.states).map((e) => t.states[e]).filter((e) => e.type === "history");
  }
  function Be(t, e) {
    let n = t;
    for (; n.parent && n.parent !== e; ) n = n.parent;
    return n.parent === e;
  }
  function yu(t, e) {
    const n = new Set(t), r = new Set(e);
    for (const s of n) if (r.has(s)) return true;
    for (const s of r) if (n.has(s)) return true;
    return false;
  }
  function Ls(t, e, n) {
    const r = /* @__PURE__ */ new Set();
    for (const s of t) {
      let o = false;
      const i = /* @__PURE__ */ new Set();
      for (const a of r) if (yu(jn([
        s
      ], e, n), jn([
        a
      ], e, n))) if (Be(s.source, a.source)) i.add(a);
      else {
        o = true;
        break;
      }
      if (!o) {
        for (const a of i) r.delete(a);
        r.add(s);
      }
    }
    return Array.from(r);
  }
  function bu(t) {
    const [e, ...n] = t;
    for (const r of St(e, void 0)) if (n.every((s) => Be(s, r))) return r;
  }
  function ir(t, e) {
    if (!t.target) return [];
    const n = /* @__PURE__ */ new Set();
    for (const r of t.target) if (Le(r)) if (e[r.id]) for (const s of e[r.id]) n.add(s);
    else for (const s of ir(Fs(r), e)) n.add(s);
    else n.add(r);
    return [
      ...n
    ];
  }
  function zs(t, e) {
    const n = ir(t, e);
    if (!n) return;
    if (!t.reenter && n.every((s) => s === t.source || Be(s, t.source))) return t.source;
    const r = bu(n.concat(t.source));
    if (r) return r;
    if (!t.reenter) return t.source.machine.root;
  }
  function jn(t, e, n) {
    var _a5;
    const r = /* @__PURE__ */ new Set();
    for (const s of t) if ((_a5 = s.target) == null ? void 0 : _a5.length) {
      const o = zs(s, n);
      s.reenter && s.source === o && r.add(o);
      for (const i of e) Be(i, o) && r.add(i);
    }
    return [
      ...r
    ];
  }
  function mu(t, e) {
    if (t.length !== e.size) return false;
    for (const n of t) if (!e.has(n)) return false;
    return true;
  }
  function Dn(t, e, n, r, s, o) {
    if (!t.length) return e;
    const i = new Set(e._nodes);
    let a = e.historyValue;
    const c = Ls(t, i, a);
    let u = e;
    s || ([u, a] = Su(u, r, n, c, i, a, o, n.actionExecutor)), u = nt(u, r, n, c.flatMap((l) => l.actions), o, void 0), u = vu(u, r, n, c, i, o, a, s);
    const f = [
      ...i
    ];
    u.status === "done" && (u = nt(u, r, n, f.sort((l, d) => d.order - l.order).flatMap((l) => l.exit), o, void 0));
    try {
      return a === e.historyValue && mu(e._nodes, i) ? u : Ne(u, {
        _nodes: f,
        historyValue: a
      });
    } catch (l) {
      throw l;
    }
  }
  function wu(t, e, n, r, s) {
    if (r.output === void 0) return;
    const o = Tn(s.id, s.output !== void 0 && s.parent ? Rn(s.output, t.context, e, n.self) : void 0);
    return Rn(r.output, t.context, o, n.self);
  }
  function vu(t, e, n, r, s, o, i, a) {
    let c = t;
    const u = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Set();
    xu(r, i, f, u), a && f.add(t.machine.root);
    const l = /* @__PURE__ */ new Set();
    for (const d of [
      ...u
    ].sort((h, g) => h.order - g.order)) {
      s.add(d);
      const h = [];
      h.push(...d.entry);
      for (const g of d.invoke) h.push(ou(g.src, {
        ...g,
        syncSnapshot: !!g.onSnapshot
      }));
      if (f.has(d)) {
        const g = d.initial.actions;
        h.push(...g);
      }
      if (c = nt(c, e, n, h, o, d.invoke.map((g) => g.id)), d.type === "final") {
        const g = d.parent;
        let v = (g == null ? void 0 : g.type) === "parallel" ? g : g == null ? void 0 : g.parent, x = v || d;
        for ((g == null ? void 0 : g.type) === "compound" && o.push(Tn(g.id, d.output !== void 0 ? Rn(d.output, c.context, e, n.self) : void 0)); (v == null ? void 0 : v.type) === "parallel" && !l.has(v) && sr(s, v); ) l.add(v), o.push(Tn(v.id)), x = v, v = v.parent;
        if (v) continue;
        c = Ne(c, {
          status: "done",
          output: wu(c, e, n, c.machine.root, x)
        });
      }
    }
    return c;
  }
  function xu(t, e, n, r) {
    for (const s of t) {
      const o = zs(s, e);
      for (const a of s.target || []) !Le(a) && (s.source !== a || s.source !== o || s.reenter) && (r.add(a), n.add(a)), Ye(a, e, n, r);
      const i = ir(s, e);
      for (const a of i) {
        const c = St(a, o);
        (o == null ? void 0 : o.type) === "parallel" && c.push(o), Ns(r, e, n, c, !s.source.parent && s.reenter ? void 0 : o);
      }
    }
  }
  function Ye(t, e, n, r) {
    var _a5;
    if (Le(t)) if (e[t.id]) {
      const s = e[t.id];
      for (const o of s) r.add(o), Ye(o, e, n, r);
      for (const o of s) un(o, t.parent, r, e, n);
    } else {
      const s = Fs(t);
      for (const o of s.target) r.add(o), s === ((_a5 = t.parent) == null ? void 0 : _a5.initial) && n.add(t.parent), Ye(o, e, n, r);
      for (const o of s.target) un(o, t.parent, r, e, n);
    }
    else if (t.type === "compound") {
      const [s] = t.initial.target;
      Le(s) || (r.add(s), n.add(s)), Ye(s, e, n, r), un(s, t, r, e, n);
    } else if (t.type === "parallel") for (const s of et(t).filter((o) => !Le(o))) [
      ...r
    ].some((o) => Be(o, s)) || (Le(s) || (r.add(s), n.add(s)), Ye(s, e, n, r));
  }
  function Ns(t, e, n, r, s) {
    for (const o of r) if ((!s || Be(o, s)) && t.add(o), o.type === "parallel") for (const i of et(o).filter((a) => !Le(a))) [
      ...t
    ].some((a) => Be(a, i)) || (t.add(i), Ye(i, e, n, t));
  }
  function un(t, e, n, r, s) {
    Ns(n, r, s, St(t, e));
  }
  function Su(t, e, n, r, s, o, i, a) {
    let c = t;
    const u = jn(r, s, o);
    u.sort((l, d) => d.order - l.order);
    let f;
    for (const l of u) for (const d of pu(l)) {
      let h;
      d.history === "deep" ? h = (g) => rr(g) && Be(g, l) : h = (g) => g.parent === l, f ?? (f = {
        ...o
      }), f[d.id] = Array.from(s).filter(h);
    }
    for (const l of u) c = nt(c, e, n, [
      ...l.exit,
      ...l.invoke.map((d) => Us(d.id))
    ], i, void 0), s.delete(l);
    return [
      c,
      f || o
    ];
  }
  function ku(t, e) {
    return t.implementations.actions[e];
  }
  function Vs(t, e, n, r, s, o) {
    const { machine: i } = t;
    let a = t;
    for (const c of r) {
      const u = typeof c == "function", f = u ? c : ku(i, typeof c == "string" ? c : c.type), l = {
        context: a.context,
        event: e,
        self: n.self,
        system: n.system
      }, d = u || typeof c == "string" ? void 0 : "params" in c ? typeof c.params == "function" ? c.params({
        context: a.context,
        event: e
      }) : c.params : void 0;
      if (!f || !("resolve" in f)) {
        n.actionExecutor({
          type: typeof c == "string" ? c : typeof c == "object" ? c.type : c.name || "(anonymous)",
          info: l,
          params: d,
          exec: f
        });
        continue;
      }
      const h = f, [g, v, x] = h.resolve(n, a, l, d, f, s);
      a = g, "retryResolve" in h && (o == null ? void 0 : o.push([
        h,
        v
      ])), "execute" in h && n.actionExecutor({
        type: h.type,
        info: l,
        params: v,
        exec: h.execute.bind(null, n, v)
      }), x && (a = Vs(a, e, n, x, s, o));
    }
    return a;
  }
  function nt(t, e, n, r, s, o) {
    const i = o ? [] : void 0, a = Vs(t, e, n, r, {
      internalQueue: s,
      deferredActorIds: o
    }, i);
    return i == null ? void 0 : i.forEach(([c, u]) => {
      c.retryResolve(n, a, u);
    }), a;
  }
  function fn(t, e, n, r) {
    let s = t;
    const o = [];
    function i(u, f, l) {
      n.system._sendInspectionEvent({
        type: "@xstate.microstep",
        actorRef: n.self,
        event: f,
        snapshot: u,
        _transitions: l
      }), o.push(u);
    }
    if (e.type === On) return s = Ne(Pr(s, e, n), {
      status: "stopped"
    }), i(s, e, []), {
      snapshot: s,
      microstates: o
    };
    let a = e;
    if (a.type !== Os) {
      const u = a, f = Gc(u), l = Fr(u, s);
      if (f && !l.length) return s = Ne(t, {
        status: "error",
        error: u.error
      }), i(s, u, []), {
        snapshot: s,
        microstates: o
      };
      s = Dn(l, t, n, a, false, r), i(s, u, l);
    }
    let c = true;
    for (; s.status === "active"; ) {
      let u = c ? Au(s, a) : [];
      const f = u.length ? s : void 0;
      if (!u.length) {
        if (!r.length) break;
        a = r.shift(), u = Fr(a, s);
      }
      s = Dn(u, s, n, a, false, r), c = s !== f, i(s, a, u);
    }
    return s.status !== "active" && Pr(s, a, n), {
      snapshot: s,
      microstates: o
    };
  }
  function Pr(t, e, n) {
    return nt(t, e, n, Object.values(t.children).map((r) => Us(r)), [], void 0);
  }
  function Fr(t, e) {
    return e.machine.getTransitionData(e, t);
  }
  function Au(t, e) {
    const n = /* @__PURE__ */ new Set(), r = t._nodes.filter(rr);
    for (const s of r) e: for (const o of [
      s
    ].concat(St(s, void 0))) if (o.always) {
      for (const i of o.always) if (i.guard === void 0 || nr(i.guard, t.context, e, t)) {
        n.add(i);
        break e;
      }
    }
    return Ls(Array.from(n), new Set(t._nodes), t.historyValue);
  }
  function Eu(t, e) {
    const n = Nt(Wt(t, e));
    return Ps(t, [
      ...n
    ]);
  }
  function Iu(t) {
    return !!t && typeof t == "object" && "machine" in t && "value" in t;
  }
  const Cu = function(e) {
    return Rs(e, this.value);
  }, Ou = function(e) {
    return this.tags.has(e);
  }, Tu = function(e) {
    const n = this.machine.getTransitionData(this, e);
    return !!(n == null ? void 0 : n.length) && n.some((r) => r.target !== void 0 || r.actions.length);
  }, Ru = function() {
    const { _nodes: e, tags: n, machine: r, getMeta: s, toJSON: o, can: i, hasTag: a, matches: c, ...u } = this;
    return {
      ...u,
      tags: Array.from(n)
    };
  }, Mu = function() {
    return this._nodes.reduce((e, n) => (n.meta !== void 0 && (e[n.id] = n.meta), e), {});
  };
  function Dt(t, e) {
    return {
      status: t.status,
      output: t.output,
      error: t.error,
      machine: e,
      context: t.context,
      _nodes: t._nodes,
      value: Ps(e.root, t._nodes),
      tags: new Set(t._nodes.flatMap((n) => n.tags)),
      children: t.children,
      historyValue: t.historyValue || {},
      matches: Cu,
      hasTag: Ou,
      can: Tu,
      getMeta: Mu,
      toJSON: Ru
    };
  }
  function Ne(t, e = {}) {
    return Dt({
      ...t,
      ...e
    }, t.machine);
  }
  function ju(t, e) {
    const { _nodes: n, tags: r, machine: s, children: o, context: i, can: a, hasTag: c, matches: u, getMeta: f, toJSON: l, ...d } = t, h = {};
    for (const v in o) {
      const x = o[v];
      h[v] = {
        snapshot: x.getPersistedSnapshot(e),
        src: x.src,
        systemId: x._systemId,
        syncSnapshot: x._syncSnapshot
      };
    }
    return {
      ...d,
      context: Ws(i),
      children: h
    };
  }
  function Ws(t) {
    let e;
    for (const n in t) {
      const r = t[n];
      if (r && typeof r == "object") if ("sessionId" in r && "send" in r && "ref" in r) e ?? (e = Array.isArray(t) ? t.slice() : {
        ...t
      }), e[n] = {
        xstate$$type: tr,
        id: r.id
      };
      else {
        const s = Ws(r);
        s !== r && (e ?? (e = Array.isArray(t) ? t.slice() : {
          ...t
        }), e[n] = s);
      }
    }
    return e ?? t;
  }
  function Du(t, e, n, r, { event: s, id: o, delay: i }, { internalQueue: a }) {
    const c = e.machine.implementations.delays;
    if (typeof s == "string") throw new Error(`Only event objects may be used with raise; use raise({ type: "${s}" }) instead`);
    const u = typeof s == "function" ? s(n, r) : s;
    let f;
    if (typeof i == "string") {
      const l = c && c[i];
      f = typeof l == "function" ? l(n, r) : l;
    } else f = typeof i == "function" ? i(n, r) : i;
    return typeof f != "number" && a.push(u), [
      e,
      {
        event: u,
        id: o,
        delay: f
      },
      void 0
    ];
  }
  function Uu(t, e) {
    const { event: n, delay: r, id: s } = e;
    if (typeof r == "number") {
      t.defer(() => {
        const o = t.self;
        t.system.scheduler.schedule(o, o, n, r, s);
      });
      return;
    }
  }
  function $u(t, e) {
    function n(r, s) {
    }
    return n.type = "xstate.raise", n.event = t, n.id = e == null ? void 0 : e.id, n.delay = e == null ? void 0 : e.delay, n.resolve = Du, n.execute = Uu, n;
  }
  function Bu(t, { machine: e, context: n }, r, s) {
    const o = (i, a) => {
      if (typeof i == "string") {
        const c = er(e, i);
        if (!c) throw new Error(`Actor logic '${i}' not implemented in machine '${e.id}'`);
        const u = gt(c, {
          id: a == null ? void 0 : a.id,
          parent: t.self,
          syncSnapshot: a == null ? void 0 : a.syncSnapshot,
          input: typeof (a == null ? void 0 : a.input) == "function" ? a.input({
            context: n,
            event: r,
            self: t.self
          }) : a == null ? void 0 : a.input,
          src: i,
          systemId: a == null ? void 0 : a.systemId
        });
        return s[u.id] = u, u;
      } else return gt(i, {
        id: a == null ? void 0 : a.id,
        parent: t.self,
        syncSnapshot: a == null ? void 0 : a.syncSnapshot,
        input: a == null ? void 0 : a.input,
        src: i,
        systemId: a == null ? void 0 : a.systemId
      });
    };
    return (i, a) => {
      const c = o(i, a);
      return s[c.id] = c, t.defer(() => {
        c._processingStatus !== ue.Stopped && c.start();
      }), c;
    };
  }
  function Pu(t, e, n, r, { assignment: s }) {
    if (!e.context) throw new Error("Cannot assign to undefined `context`. Ensure that `context` is defined in the machine config.");
    const o = {}, i = {
      context: e.context,
      event: n.event,
      spawn: Bu(t, e, n.event, o),
      self: t.self,
      system: t.system
    };
    let a = {};
    if (typeof s == "function") a = s(i, r);
    else for (const u of Object.keys(s)) {
      const f = s[u];
      a[u] = typeof f == "function" ? f(i, r) : f;
    }
    const c = Object.assign({}, e.context, a);
    return [
      Ne(e, {
        context: c,
        children: Object.keys(o).length ? {
          ...e.children,
          ...o
        } : e.children
      }),
      void 0,
      void 0
    ];
  }
  function Un(t) {
    function e(n, r) {
    }
    return e.type = "xstate.assign", e.assignment = t, e.resolve = Pu, e;
  }
  function Fu(t, e) {
    const n = Te(e);
    if (!n.includes(t.type)) {
      const r = n.length === 1 ? `type "${n[0]}"` : `one of types "${n.join('", "')}"`;
      throw new Error(`Expected event ${JSON.stringify(t)} to have ${r}`);
    }
  }
  const Hr = /* @__PURE__ */ new WeakMap();
  function We(t, e, n) {
    let r = Hr.get(t);
    return r ? e in r || (r[e] = n()) : (r = {
      [e]: n()
    }, Hr.set(t, r)), r[e];
  }
  const Hu = {}, it = (t) => typeof t == "string" ? {
    type: t
  } : typeof t == "function" ? "resolve" in t ? {
    type: t.type
  } : {
    type: t.name
  } : t;
  class ar {
    constructor(e, n) {
      if (this.config = e, this.key = void 0, this.id = void 0, this.type = void 0, this.path = void 0, this.states = void 0, this.history = void 0, this.entry = void 0, this.exit = void 0, this.parent = void 0, this.machine = void 0, this.meta = void 0, this.output = void 0, this.order = -1, this.description = void 0, this.tags = [], this.transitions = void 0, this.always = void 0, this.parent = n._parent, this.key = n._key, this.machine = n._machine, this.path = this.parent ? this.parent.path.concat(this.key) : [], this.id = this.config.id || [
        this.machine.id,
        ...this.path
      ].join(Is), this.type = this.config.type || (this.config.states && Object.keys(this.config.states).length ? "compound" : this.config.history ? "history" : "atomic"), this.description = this.config.description, this.order = this.machine.idMap.size, this.machine.idMap.set(this.id, this), this.states = this.config.states ? Dr(this.config.states, (r, s) => new ar(r, {
        _parent: this,
        _key: s,
        _machine: this.machine
      })) : Hu, this.type === "compound" && !this.config.initial) throw new Error(`No initial state specified for compound state node "#${this.id}". Try adding { initial: "${Object.keys(this.states)[0]}" } to the state config.`);
      this.history = this.config.history === true ? "shallow" : this.config.history || false, this.entry = Te(this.config.entry).slice(), this.exit = Te(this.config.exit).slice(), this.meta = this.config.meta, this.output = this.type === "final" || !this.parent ? this.config.output : void 0, this.tags = Te(e.tags).slice();
    }
    _initialize() {
      this.transitions = fu(this), this.config.always && (this.always = Je(this.config.always).map((e) => Fe(this, Cs, e))), Object.keys(this.states).forEach((e) => {
        this.states[e]._initialize();
      });
    }
    get definition() {
      return {
        id: this.id,
        key: this.key,
        version: this.machine.version,
        type: this.type,
        initial: this.initial ? {
          target: this.initial.target,
          source: this,
          actions: this.initial.actions.map(it),
          eventType: null,
          reenter: false,
          toJSON: () => ({
            target: this.initial.target.map((e) => `#${e.id}`),
            source: `#${this.id}`,
            actions: this.initial.actions.map(it),
            eventType: null
          })
        } : void 0,
        history: this.history,
        states: Dr(this.states, (e) => e.definition),
        on: this.on,
        transitions: [
          ...this.transitions.values()
        ].flat().map((e) => ({
          ...e,
          actions: e.actions.map(it)
        })),
        entry: this.entry.map(it),
        exit: this.exit.map(it),
        meta: this.meta,
        order: this.order || -1,
        output: this.output,
        invoke: this.invoke,
        description: this.description,
        tags: this.tags
      };
    }
    toJSON() {
      return this.definition;
    }
    get invoke() {
      return We(this, "invoke", () => Te(this.config.invoke).map((e, n) => {
        const { src: r, systemId: s } = e, o = e.id ?? Ur(this.id, n), i = typeof r == "string" ? r : `xstate.invoke.${Ur(this.id, n)}`;
        return {
          ...e,
          src: i,
          id: o,
          systemId: s,
          toJSON() {
            const { onDone: a, onError: c, ...u } = e;
            return {
              ...u,
              type: "xstate.invoke",
              src: i,
              id: o
            };
          }
        };
      }));
    }
    get on() {
      return We(this, "on", () => [
        ...this.transitions
      ].flatMap(([n, r]) => r.map((s) => [
        n,
        s
      ])).reduce((n, [r, s]) => (n[r] = n[r] || [], n[r].push(s), n), {}));
    }
    get after() {
      return We(this, "delayedTransitions", () => uu(this));
    }
    get initial() {
      return We(this, "initial", () => lu(this, this.config.initial));
    }
    next(e, n) {
      const r = n.type, s = [];
      let o;
      const i = We(this, `candidates-${r}`, () => cu(this, r));
      for (const a of i) {
        const { guard: c } = a, u = e.context;
        let f = false;
        try {
          f = !c || nr(c, u, n, e);
        } catch (l) {
          const d = typeof c == "string" ? c : typeof c == "object" ? c.type : void 0;
          throw new Error(`Unable to evaluate guard ${d ? `'${d}' ` : ""}in transition for event '${r}' in state node '${this.id}':
${l.message}`);
        }
        if (f) {
          s.push(...a.actions), o = a;
          break;
        }
      }
      return o ? [
        o
      ] : void 0;
    }
    get events() {
      return We(this, "events", () => {
        const { states: e } = this, n = new Set(this.ownEvents);
        if (e) for (const r of Object.keys(e)) {
          const s = e[r];
          if (s.states) for (const o of s.events) n.add(`${o}`);
        }
        return Array.from(n);
      });
    }
    get ownEvents() {
      const e = new Set([
        ...this.transitions.keys()
      ].filter((n) => this.transitions.get(n).some((r) => !(!r.target && !r.actions.length && !r.reenter))));
      return Array.from(e);
    }
  }
  const Lu = "#";
  class cr {
    constructor(e, n) {
      this.config = e, this.version = void 0, this.schemas = void 0, this.implementations = void 0, this.__xstatenode = true, this.idMap = /* @__PURE__ */ new Map(), this.root = void 0, this.id = void 0, this.states = void 0, this.events = void 0, this.id = e.id || "(machine)", this.implementations = {
        actors: (n == null ? void 0 : n.actors) ?? {},
        actions: (n == null ? void 0 : n.actions) ?? {},
        delays: (n == null ? void 0 : n.delays) ?? {},
        guards: (n == null ? void 0 : n.guards) ?? {}
      }, this.version = this.config.version, this.schemas = this.config.schemas, this.transition = this.transition.bind(this), this.getInitialSnapshot = this.getInitialSnapshot.bind(this), this.getPersistedSnapshot = this.getPersistedSnapshot.bind(this), this.restoreSnapshot = this.restoreSnapshot.bind(this), this.start = this.start.bind(this), this.root = new ar(e, {
        _key: this.id,
        _machine: this
      }), this.root._initialize(), this.states = this.root.states, this.events = this.root.events;
    }
    provide(e) {
      const { actions: n, guards: r, actors: s, delays: o } = this.implementations;
      return new cr(this.config, {
        actions: {
          ...n,
          ...e.actions
        },
        guards: {
          ...r,
          ...e.guards
        },
        actors: {
          ...s,
          ...e.actors
        },
        delays: {
          ...o,
          ...e.delays
        }
      });
    }
    resolveState(e) {
      const n = Eu(this.root, e.value), r = Nt(Wt(this.root, n));
      return Dt({
        _nodes: [
          ...r
        ],
        context: e.context || {},
        children: {},
        status: sr(r, this.root) ? "done" : e.status || "active",
        output: e.output,
        error: e.error,
        historyValue: e.historyValue
      }, this);
    }
    transition(e, n, r) {
      return fn(e, n, r, []).snapshot;
    }
    microstep(e, n, r) {
      return fn(e, n, r, []).microstates;
    }
    getTransitionData(e, n) {
      return or(this.root, e.value, e, n) || [];
    }
    getPreInitialState(e, n, r) {
      const { context: s } = this.config, o = Dt({
        context: typeof s != "function" && s ? s : {},
        _nodes: [
          this.root
        ],
        children: {},
        status: "active"
      }, this);
      return typeof s == "function" ? nt(o, n, e, [
        Un(({ spawn: a, event: c, self: u }) => s({
          spawn: a,
          input: c.input,
          self: u
        }))
      ], r, void 0) : o;
    }
    getInitialSnapshot(e, n) {
      const r = Ts(n), s = [], o = this.getPreInitialState(e, r, s), i = Dn([
        {
          target: [
            ...Hs(this.root)
          ],
          source: this.root,
          reenter: true,
          actions: [],
          eventType: null,
          toJSON: null
        }
      ], o, e, r, true, s), { snapshot: a } = fn(i, r, e, s);
      return a;
    }
    start(e) {
      Object.values(e.children).forEach((n) => {
        n.getSnapshot().status === "active" && n.start();
      });
    }
    getStateNodeById(e) {
      const n = Qn(e), r = n.slice(1), s = tn(n[0]) ? n[0].slice(Lu.length) : n[0], o = this.idMap.get(s);
      if (!o) throw new Error(`Child state node '#${s}' does not exist on machine '${this.id}'`);
      return Vt(o, r);
    }
    get definition() {
      return this.root.definition;
    }
    toJSON() {
      return this.definition;
    }
    getPersistedSnapshot(e, n) {
      return ju(e, n);
    }
    restoreSnapshot(e, n) {
      const r = {}, s = e.children;
      Object.keys(s).forEach((c) => {
        const u = s[c], f = u.snapshot, l = u.src, d = typeof l == "string" ? er(this, l) : l;
        if (!d) return;
        const h = gt(d, {
          id: c,
          parent: n.self,
          syncSnapshot: u.syncSnapshot,
          snapshot: f,
          src: l,
          systemId: u.systemId
        });
        r[c] = h;
      });
      const o = Dt({
        ...e,
        children: r,
        _nodes: Array.from(Nt(Wt(this.root, e.value)))
      }, this), i = /* @__PURE__ */ new Set();
      function a(c, u) {
        if (!i.has(c)) {
          i.add(c);
          for (const f in c) {
            const l = c[f];
            if (l && typeof l == "object") {
              if ("xstate$$type" in l && l.xstate$$type === tr) {
                c[f] = u[l.id];
                continue;
              }
              a(l, u);
            }
          }
        }
      }
      return a(o.context, r), o;
    }
  }
  function zu(t, e) {
    return new cr(t, e);
  }
  function Nu({ schemas: t, actors: e, actions: n, guards: r, delays: s }) {
    return {
      createMachine: (o) => zu({
        ...o,
        schemas: t
      }, {
        actors: e,
        actions: n,
        guards: r,
        delays: s
      })
    };
  }
  const Vu = {
    timeout: 1 / 0
  };
  function Wu(t, e, n) {
    const r = {
      ...Vu,
      ...n
    };
    return new Promise((s, o) => {
      const { signal: i } = r;
      if (i == null ? void 0 : i.aborted) {
        o(i.reason);
        return;
      }
      let a = false;
      const c = r.timeout === 1 / 0 ? void 0 : setTimeout(() => {
        u(), o(new Error(`Timeout of ${r.timeout} ms exceeded`));
      }, r.timeout), u = () => {
        clearTimeout(c), a = true, d == null ? void 0 : d.unsubscribe(), l && i.removeEventListener("abort", l);
      };
      function f(h) {
        e(h) && (u(), s(h));
      }
      let l, d;
      f(t.getSnapshot()), !a && (i && (l = () => {
        u(), o(i.reason);
      }, i.addEventListener("abort", l)), d = t.subscribe({
        next: f,
        error: (h) => {
          u(), o(h);
        },
        complete: () => {
          u(), o(new Error("Actor terminated without satisfying predicate"));
        }
      }), a && d.unsubscribe());
    });
  }
  var Ie = {}, je = {}, De = {}, Lr;
  function qs() {
    if (Lr) return De;
    Lr = 1, Object.defineProperty(De, "__esModule", {
      value: true
    }), De.anumber = t, De.abytes = n, De.ahash = r, De.aexists = s, De.aoutput = o;
    function t(i) {
      if (!Number.isSafeInteger(i) || i < 0) throw new Error("positive integer expected, got " + i);
    }
    function e(i) {
      return i instanceof Uint8Array || ArrayBuffer.isView(i) && i.constructor.name === "Uint8Array";
    }
    function n(i, ...a) {
      if (!e(i)) throw new Error("Uint8Array expected");
      if (a.length > 0 && !a.includes(i.length)) throw new Error("Uint8Array expected of length " + a + ", got length=" + i.length);
    }
    function r(i) {
      if (typeof i != "function" || typeof i.create != "function") throw new Error("Hash should be wrapped by utils.wrapConstructor");
      t(i.outputLen), t(i.blockLen);
    }
    function s(i, a = true) {
      if (i.destroyed) throw new Error("Hash instance has been destroyed");
      if (a && i.finished) throw new Error("Hash#digest() has already been called");
    }
    function o(i, a) {
      n(i);
      const c = a.outputLen;
      if (i.length < c) throw new Error("digestInto() expects output buffer of length at least " + c);
    }
    return De;
  }
  var ln = {}, at = {}, zr;
  function qu() {
    return zr || (zr = 1, Object.defineProperty(at, "__esModule", {
      value: true
    }), at.crypto = void 0, at.crypto = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0), at;
  }
  var Nr;
  function Ks() {
    return Nr || (Nr = 1, function(t) {
      Object.defineProperty(t, "__esModule", {
        value: true
      }), t.Hash = t.nextTick = t.byteSwapIfBE = t.isLE = void 0, t.isBytes = r, t.u8 = s, t.u32 = o, t.createView = i, t.rotr = a, t.rotl = c, t.byteSwap = u, t.byteSwap32 = f, t.bytesToHex = d, t.hexToBytes = v, t.asyncLoop = R, t.utf8ToBytes = M, t.toBytes = k, t.concatBytes = z, t.checkOpts = F, t.wrapConstructor = Y, t.wrapConstructorWithOpts = L, t.wrapXOFConstructorWithOpts = J, t.randomBytes = G;
      const e = qu(), n = qs();
      function r(I) {
        return I instanceof Uint8Array || ArrayBuffer.isView(I) && I.constructor.name === "Uint8Array";
      }
      function s(I) {
        return new Uint8Array(I.buffer, I.byteOffset, I.byteLength);
      }
      function o(I) {
        return new Uint32Array(I.buffer, I.byteOffset, Math.floor(I.byteLength / 4));
      }
      function i(I) {
        return new DataView(I.buffer, I.byteOffset, I.byteLength);
      }
      function a(I, B) {
        return I << 32 - B | I >>> B;
      }
      function c(I, B) {
        return I << B | I >>> 32 - B >>> 0;
      }
      t.isLE = new Uint8Array(new Uint32Array([
        287454020
      ]).buffer)[0] === 68;
      function u(I) {
        return I << 24 & 4278190080 | I << 8 & 16711680 | I >>> 8 & 65280 | I >>> 24 & 255;
      }
      t.byteSwapIfBE = t.isLE ? (I) => I : (I) => u(I);
      function f(I) {
        for (let B = 0; B < I.length; B++) I[B] = u(I[B]);
      }
      const l = Array.from({
        length: 256
      }, (I, B) => B.toString(16).padStart(2, "0"));
      function d(I) {
        (0, n.abytes)(I);
        let B = "";
        for (let y = 0; y < I.length; y++) B += l[I[y]];
        return B;
      }
      const h = {
        _0: 48,
        _9: 57,
        A: 65,
        F: 70,
        a: 97,
        f: 102
      };
      function g(I) {
        if (I >= h._0 && I <= h._9) return I - h._0;
        if (I >= h.A && I <= h.F) return I - (h.A - 10);
        if (I >= h.a && I <= h.f) return I - (h.a - 10);
      }
      function v(I) {
        if (typeof I != "string") throw new Error("hex string expected, got " + typeof I);
        const B = I.length, y = B / 2;
        if (B % 2) throw new Error("hex string expected, got unpadded hex of length " + B);
        const j = new Uint8Array(y);
        for (let A = 0, C = 0; A < y; A++, C += 2) {
          const O = g(I.charCodeAt(C)), P = g(I.charCodeAt(C + 1));
          if (O === void 0 || P === void 0) {
            const H = I[C] + I[C + 1];
            throw new Error('hex string expected, got non-hex character "' + H + '" at index ' + C);
          }
          j[A] = O * 16 + P;
        }
        return j;
      }
      const x = async () => {
      };
      t.nextTick = x;
      async function R(I, B, y) {
        let j = Date.now();
        for (let A = 0; A < I; A++) {
          y(A);
          const C = Date.now() - j;
          C >= 0 && C < B || (await (0, t.nextTick)(), j += C);
        }
      }
      function M(I) {
        if (typeof I != "string") throw new Error("utf8ToBytes expected string, got " + typeof I);
        return new Uint8Array(new TextEncoder().encode(I));
      }
      function k(I) {
        return typeof I == "string" && (I = M(I)), (0, n.abytes)(I), I;
      }
      function z(...I) {
        let B = 0;
        for (let j = 0; j < I.length; j++) {
          const A = I[j];
          (0, n.abytes)(A), B += A.length;
        }
        const y = new Uint8Array(B);
        for (let j = 0, A = 0; j < I.length; j++) {
          const C = I[j];
          y.set(C, A), A += C.length;
        }
        return y;
      }
      class $ {
        clone() {
          return this._cloneInto();
        }
      }
      t.Hash = $;
      function F(I, B) {
        if (B !== void 0 && {}.toString.call(B) !== "[object Object]") throw new Error("Options should be object or undefined");
        return Object.assign(I, B);
      }
      function Y(I) {
        const B = (j) => I().update(k(j)).digest(), y = I();
        return B.outputLen = y.outputLen, B.blockLen = y.blockLen, B.create = () => I(), B;
      }
      function L(I) {
        const B = (j, A) => I(A).update(k(j)).digest(), y = I({});
        return B.outputLen = y.outputLen, B.blockLen = y.blockLen, B.create = (j) => I(j), B;
      }
      function J(I) {
        const B = (j, A) => I(A).update(k(j)).digest(), y = I({});
        return B.outputLen = y.outputLen, B.blockLen = y.blockLen, B.create = (j) => I(j), B;
      }
      function G(I = 32) {
        if (e.crypto && typeof e.crypto.getRandomValues == "function") return e.crypto.getRandomValues(new Uint8Array(I));
        if (e.crypto && typeof e.crypto.randomBytes == "function") return e.crypto.randomBytes(I);
        throw new Error("crypto.getRandomValues must be defined");
      }
    }(ln)), ln;
  }
  var Vr;
  function Ku() {
    if (Vr) return je;
    Vr = 1, Object.defineProperty(je, "__esModule", {
      value: true
    }), je.HashMD = void 0, je.setBigUint64 = n, je.Chi = r, je.Maj = s;
    const t = qs(), e = Ks();
    function n(i, a, c, u) {
      if (typeof i.setBigUint64 == "function") return i.setBigUint64(a, c, u);
      const f = BigInt(32), l = BigInt(4294967295), d = Number(c >> f & l), h = Number(c & l), g = u ? 4 : 0, v = u ? 0 : 4;
      i.setUint32(a + g, d, u), i.setUint32(a + v, h, u);
    }
    function r(i, a, c) {
      return i & a ^ ~i & c;
    }
    function s(i, a, c) {
      return i & a ^ i & c ^ a & c;
    }
    class o extends e.Hash {
      constructor(a, c, u, f) {
        super(), this.blockLen = a, this.outputLen = c, this.padOffset = u, this.isLE = f, this.finished = false, this.length = 0, this.pos = 0, this.destroyed = false, this.buffer = new Uint8Array(a), this.view = (0, e.createView)(this.buffer);
      }
      update(a) {
        (0, t.aexists)(this);
        const { view: c, buffer: u, blockLen: f } = this;
        a = (0, e.toBytes)(a);
        const l = a.length;
        for (let d = 0; d < l; ) {
          const h = Math.min(f - this.pos, l - d);
          if (h === f) {
            const g = (0, e.createView)(a);
            for (; f <= l - d; d += f) this.process(g, d);
            continue;
          }
          u.set(a.subarray(d, d + h), this.pos), this.pos += h, d += h, this.pos === f && (this.process(c, 0), this.pos = 0);
        }
        return this.length += a.length, this.roundClean(), this;
      }
      digestInto(a) {
        (0, t.aexists)(this), (0, t.aoutput)(a, this), this.finished = true;
        const { buffer: c, view: u, blockLen: f, isLE: l } = this;
        let { pos: d } = this;
        c[d++] = 128, this.buffer.subarray(d).fill(0), this.padOffset > f - d && (this.process(u, 0), d = 0);
        for (let R = d; R < f; R++) c[R] = 0;
        n(u, f - 8, BigInt(this.length * 8), l), this.process(u, 0);
        const h = (0, e.createView)(a), g = this.outputLen;
        if (g % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
        const v = g / 4, x = this.get();
        if (v > x.length) throw new Error("_sha2: outputLen bigger than state");
        for (let R = 0; R < v; R++) h.setUint32(4 * R, x[R], l);
      }
      digest() {
        const { buffer: a, outputLen: c } = this;
        this.digestInto(a);
        const u = a.slice(0, c);
        return this.destroy(), u;
      }
      _cloneInto(a) {
        a || (a = new this.constructor()), a.set(...this.get());
        const { blockLen: c, buffer: u, length: f, finished: l, destroyed: d, pos: h } = this;
        return a.length = f, a.pos = h, a.finished = l, a.destroyed = d, f % c && a.buffer.set(u), a;
      }
    }
    return je.HashMD = o, je;
  }
  var Wr;
  function Ju() {
    if (Wr) return Ie;
    Wr = 1, Object.defineProperty(Ie, "__esModule", {
      value: true
    }), Ie.sha224 = Ie.sha256 = Ie.SHA256 = void 0;
    const t = Ku(), e = Ks(), n = new Uint32Array([
      1116352408,
      1899447441,
      3049323471,
      3921009573,
      961987163,
      1508970993,
      2453635748,
      2870763221,
      3624381080,
      310598401,
      607225278,
      1426881987,
      1925078388,
      2162078206,
      2614888103,
      3248222580,
      3835390401,
      4022224774,
      264347078,
      604807628,
      770255983,
      1249150122,
      1555081692,
      1996064986,
      2554220882,
      2821834349,
      2952996808,
      3210313671,
      3336571891,
      3584528711,
      113926993,
      338241895,
      666307205,
      773529912,
      1294757372,
      1396182291,
      1695183700,
      1986661051,
      2177026350,
      2456956037,
      2730485921,
      2820302411,
      3259730800,
      3345764771,
      3516065817,
      3600352804,
      4094571909,
      275423344,
      430227734,
      506948616,
      659060556,
      883997877,
      958139571,
      1322822218,
      1537002063,
      1747873779,
      1955562222,
      2024104815,
      2227730452,
      2361852424,
      2428436474,
      2756734187,
      3204031479,
      3329325298
    ]), r = new Uint32Array([
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ]), s = new Uint32Array(64);
    class o extends t.HashMD {
      constructor() {
        super(64, 32, 8, false), this.A = r[0] | 0, this.B = r[1] | 0, this.C = r[2] | 0, this.D = r[3] | 0, this.E = r[4] | 0, this.F = r[5] | 0, this.G = r[6] | 0, this.H = r[7] | 0;
      }
      get() {
        const { A: c, B: u, C: f, D: l, E: d, F: h, G: g, H: v } = this;
        return [
          c,
          u,
          f,
          l,
          d,
          h,
          g,
          v
        ];
      }
      set(c, u, f, l, d, h, g, v) {
        this.A = c | 0, this.B = u | 0, this.C = f | 0, this.D = l | 0, this.E = d | 0, this.F = h | 0, this.G = g | 0, this.H = v | 0;
      }
      process(c, u) {
        for (let M = 0; M < 16; M++, u += 4) s[M] = c.getUint32(u, false);
        for (let M = 16; M < 64; M++) {
          const k = s[M - 15], z = s[M - 2], $ = (0, e.rotr)(k, 7) ^ (0, e.rotr)(k, 18) ^ k >>> 3, F = (0, e.rotr)(z, 17) ^ (0, e.rotr)(z, 19) ^ z >>> 10;
          s[M] = F + s[M - 7] + $ + s[M - 16] | 0;
        }
        let { A: f, B: l, C: d, D: h, E: g, F: v, G: x, H: R } = this;
        for (let M = 0; M < 64; M++) {
          const k = (0, e.rotr)(g, 6) ^ (0, e.rotr)(g, 11) ^ (0, e.rotr)(g, 25), z = R + k + (0, t.Chi)(g, v, x) + n[M] + s[M] | 0, F = ((0, e.rotr)(f, 2) ^ (0, e.rotr)(f, 13) ^ (0, e.rotr)(f, 22)) + (0, t.Maj)(f, l, d) | 0;
          R = x, x = v, v = g, g = h + z | 0, h = d, d = l, l = f, f = z + F | 0;
        }
        f = f + this.A | 0, l = l + this.B | 0, d = d + this.C | 0, h = h + this.D | 0, g = g + this.E | 0, v = v + this.F | 0, x = x + this.G | 0, R = R + this.H | 0, this.set(f, l, d, h, g, v, x, R);
      }
      roundClean() {
        s.fill(0);
      }
      destroy() {
        this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
      }
    }
    Ie.SHA256 = o;
    class i extends o {
      constructor() {
        super(), this.A = -1056596264, this.B = 914150663, this.C = 812702999, this.D = -150054599, this.E = -4191439, this.F = 1750603025, this.G = 1694076839, this.H = -1090891868, this.outputLen = 28;
      }
    }
    return Ie.sha256 = (0, e.wrapConstructor)(() => new o()), Ie.sha224 = (0, e.wrapConstructor)(() => new i()), Ie;
  }
  var dn, qr;
  function Gu() {
    if (qr) return dn;
    qr = 1;
    function t(e) {
      if (e.length >= 255) throw new TypeError("Alphabet too long");
      for (var n = new Uint8Array(256), r = 0; r < n.length; r++) n[r] = 255;
      for (var s = 0; s < e.length; s++) {
        var o = e.charAt(s), i = o.charCodeAt(0);
        if (n[i] !== 255) throw new TypeError(o + " is ambiguous");
        n[i] = s;
      }
      var a = e.length, c = e.charAt(0), u = Math.log(a) / Math.log(256), f = Math.log(256) / Math.log(a);
      function l(g) {
        if (g instanceof Uint8Array || (ArrayBuffer.isView(g) ? g = new Uint8Array(g.buffer, g.byteOffset, g.byteLength) : Array.isArray(g) && (g = Uint8Array.from(g))), !(g instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
        if (g.length === 0) return "";
        for (var v = 0, x = 0, R = 0, M = g.length; R !== M && g[R] === 0; ) R++, v++;
        for (var k = (M - R) * f + 1 >>> 0, z = new Uint8Array(k); R !== M; ) {
          for (var $ = g[R], F = 0, Y = k - 1; ($ !== 0 || F < x) && Y !== -1; Y--, F++) $ += 256 * z[Y] >>> 0, z[Y] = $ % a >>> 0, $ = $ / a >>> 0;
          if ($ !== 0) throw new Error("Non-zero carry");
          x = F, R++;
        }
        for (var L = k - x; L !== k && z[L] === 0; ) L++;
        for (var J = c.repeat(v); L < k; ++L) J += e.charAt(z[L]);
        return J;
      }
      function d(g) {
        if (typeof g != "string") throw new TypeError("Expected String");
        if (g.length === 0) return new Uint8Array();
        for (var v = 0, x = 0, R = 0; g[v] === c; ) x++, v++;
        for (var M = (g.length - v) * u + 1 >>> 0, k = new Uint8Array(M); g[v]; ) {
          var z = g.charCodeAt(v);
          if (z > 255) return;
          var $ = n[z];
          if ($ === 255) return;
          for (var F = 0, Y = M - 1; ($ !== 0 || F < R) && Y !== -1; Y--, F++) $ += a * k[Y] >>> 0, k[Y] = $ % 256 >>> 0, $ = $ / 256 >>> 0;
          if ($ !== 0) throw new Error("Non-zero carry");
          R = F, v++;
        }
        for (var L = M - R; L !== M && k[L] === 0; ) L++;
        for (var J = new Uint8Array(x + (M - L)), G = x; L !== M; ) J[G++] = k[L++];
        return J;
      }
      function h(g) {
        var v = d(g);
        if (v) return v;
        throw new Error("Non-base" + a + " character");
      }
      return {
        encode: l,
        decodeUnsafe: d,
        decode: h
      };
    }
    return dn = t, dn;
  }
  var hn, Kr;
  function Yu() {
    return Kr || (Kr = 1, hn = Gu()("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")), hn;
  }
  var _n, Jr;
  function Xu() {
    if (Jr) return _n;
    Jr = 1;
    var t = Yu();
    return _n = function(e) {
      function n(i) {
        var a = Uint8Array.from(i), c = e(a), u = a.length + 4, f = new Uint8Array(u);
        return f.set(a, 0), f.set(c.subarray(0, 4), a.length), t.encode(f, u);
      }
      function r(i) {
        var a = i.slice(0, -4), c = i.slice(-4), u = e(a);
        if (!(c[0] ^ u[0] | c[1] ^ u[1] | c[2] ^ u[2] | c[3] ^ u[3])) return a;
      }
      function s(i) {
        var a = t.decodeUnsafe(i);
        if (a) return r(a);
      }
      function o(i) {
        var a = t.decode(i), c = r(a);
        if (!c) throw new Error("Invalid checksum");
        return c;
      }
      return {
        encode: n,
        decode: o,
        decodeUnsafe: s
      };
    }, _n;
  }
  var gn, Gr;
  function Zu() {
    if (Gr) return gn;
    Gr = 1;
    var { sha256: t } = Ju(), e = Xu();
    function n(r) {
      return t(t(r));
    }
    return gn = e(n), gn;
  }
  var Qu = Zu();
  const Js = Zn(Qu), ur = "automerge:", fr = (t) => {
    const e = new RegExp(`^${ur}(\\w+)$`), [, n] = t.match(e) || [], r = n, s = Ys(r);
    if (!s) throw new Error("Invalid document URL: " + t);
    return {
      binaryDocumentId: s,
      documentId: r
    };
  }, lr = (t) => {
    const e = t instanceof Uint8Array || typeof t == "string" ? t : "documentId" in t ? t.documentId : void 0, n = e instanceof Uint8Array ? $n(e) : typeof e == "string" ? e : void 0;
    if (n === void 0) throw new Error("Invalid documentId: " + e);
    return ur + n;
  }, ef = (t) => {
    if (!t || !t.startsWith(ur)) return false;
    const e = t;
    try {
      const { documentId: n } = fr(e);
      return Gs(n);
    } catch {
      return false;
    }
  }, Gs = (t) => {
    const e = Ys(t);
    if (e === void 0) return false;
    const n = cc(e);
    return Xt(n);
  }, tf = (t) => Xt(t), nf = () => {
    const t = bs(null, new Uint8Array(16));
    return lr({
      documentId: t
    });
  }, Ys = (t) => Js.decodeUnsafe(t), $n = (t) => Js.encode(t), pn = (t) => {
    if (t instanceof Uint8Array) return $n(t);
    if (ef(t)) return fr(t).documentId;
    if (Gs(t)) return t;
    if (tf(t)) {
      console.warn("Future versions will not support UUIDs as document IDs; use Automerge URLs instead.");
      const e = uc(t);
      return $n(e);
    }
    throw new Error(`Invalid AutomergeUrl: '${t}'`);
  };
  let Bn;
  try {
    Bn = new TextDecoder();
  } catch {
  }
  let U, ze, S = 0;
  const rf = 105, sf = 57342, of = 57343, Yr = 57337, Xr = 6, qe = {};
  let ct = 11281e4, Ce = 1681e4, W = {}, ee, qt, Kt = 0, pt = 0, re, ge, te = [], Pn = [], fe, ie, ft, Zr = {
    useRecords: false,
    mapsAsObjects: true
  }, yt = false, Xs = 2;
  try {
    new Function("");
  } catch {
    Xs = 1 / 0;
  }
  class bt {
    constructor(e) {
      if (e && ((e.keyMap || e._keyMap) && !e.useRecords && (e.useRecords = false, e.mapsAsObjects = true), e.useRecords === false && e.mapsAsObjects === void 0 && (e.mapsAsObjects = true), e.getStructures && (e.getShared = e.getStructures), e.getShared && !e.structures && ((e.structures = []).uninitialized = true), e.keyMap)) {
        this.mapKey = /* @__PURE__ */ new Map();
        for (let [n, r] of Object.entries(e.keyMap)) this.mapKey.set(r, n);
      }
      Object.assign(this, e);
    }
    decodeKey(e) {
      return this.keyMap && this.mapKey.get(e) || e;
    }
    encodeKey(e) {
      return this.keyMap && this.keyMap.hasOwnProperty(e) ? this.keyMap[e] : e;
    }
    encodeKeys(e) {
      if (!this._keyMap) return e;
      let n = /* @__PURE__ */ new Map();
      for (let [r, s] of Object.entries(e)) n.set(this._keyMap.hasOwnProperty(r) ? this._keyMap[r] : r, s);
      return n;
    }
    decodeKeys(e) {
      if (!this._keyMap || e.constructor.name != "Map") return e;
      if (!this._mapKey) {
        this._mapKey = /* @__PURE__ */ new Map();
        for (let [r, s] of Object.entries(this._keyMap)) this._mapKey.set(s, r);
      }
      let n = {};
      return e.forEach((r, s) => n[pe(this._mapKey.has(s) ? this._mapKey.get(s) : s)] = r), n;
    }
    mapDecode(e, n) {
      let r = this.decode(e);
      if (this._keyMap) switch (r.constructor.name) {
        case "Array":
          return r.map((s) => this.decodeKeys(s));
      }
      return r;
    }
    decode(e, n) {
      if (U) return to(() => (zn(), this ? this.decode(e, n) : bt.prototype.decode.call(Zr, e, n)));
      ze = n > -1 ? n : e.length, S = 0, pt = 0, qt = null, re = null, U = e;
      try {
        ie = e.dataView || (e.dataView = new DataView(e.buffer, e.byteOffset, e.byteLength));
      } catch (r) {
        throw U = null, e instanceof Uint8Array ? r : new Error("Source must be a Uint8Array or Buffer but was a " + (e && typeof e == "object" ? e.constructor.name : typeof e));
      }
      if (this instanceof bt) {
        if (W = this, fe = this.sharedValues && (this.pack ? new Array(this.maxPrivatePackedValues || 16).concat(this.sharedValues) : this.sharedValues), this.structures) return ee = this.structures, It();
        (!ee || ee.length > 0) && (ee = []);
      } else W = Zr, (!ee || ee.length > 0) && (ee = []), fe = null;
      return It();
    }
    decodeMultiple(e, n) {
      let r, s = 0;
      try {
        let o = e.length;
        yt = true;
        let i = this ? this.decode(e, o) : _r.decode(e, o);
        if (n) {
          if (n(i) === false) return;
          for (; S < o; ) if (s = S, n(It()) === false) return;
        } else {
          for (r = [
            i
          ]; S < o; ) s = S, r.push(It());
          return r;
        }
      } catch (o) {
        throw o.lastPosition = s, o.values = r, o;
      } finally {
        yt = false, zn();
      }
    }
  }
  function It() {
    try {
      let t = q();
      if (re) {
        if (S >= re.postBundlePosition) {
          let e = new Error("Unexpected bundle position");
          throw e.incomplete = true, e;
        }
        S = re.postBundlePosition, re = null;
      }
      if (S == ze) ee = null, U = null, ge && (ge = null);
      else if (S > ze) {
        let e = new Error("Unexpected end of CBOR data");
        throw e.incomplete = true, e;
      } else if (!yt) throw new Error("Data read, but end of buffer not reached");
      return t;
    } catch (t) {
      throw zn(), (t instanceof RangeError || t.message.startsWith("Unexpected end of buffer")) && (t.incomplete = true), t;
    }
  }
  function q() {
    let t = U[S++], e = t >> 5;
    if (t = t & 31, t > 23) switch (t) {
      case 24:
        t = U[S++];
        break;
      case 25:
        if (e == 7) return ff();
        t = ie.getUint16(S), S += 2;
        break;
      case 26:
        if (e == 7) {
          let n = ie.getFloat32(S);
          if (W.useFloat32 > 2) {
            let r = hr[(U[S] & 127) << 1 | U[S + 1] >> 7];
            return S += 4, (r * n + (n > 0 ? 0.5 : -0.5) >> 0) / r;
          }
          return S += 4, n;
        }
        t = ie.getUint32(S), S += 4;
        break;
      case 27:
        if (e == 7) {
          let n = ie.getFloat64(S);
          return S += 8, n;
        }
        if (e > 1) {
          if (ie.getUint32(S) > 0) throw new Error("JavaScript does not support arrays, maps, or strings with length over 4294967295");
          t = ie.getUint32(S + 4);
        } else W.int64AsNumber ? (t = ie.getUint32(S) * 4294967296, t += ie.getUint32(S + 4)) : t = ie.getBigUint64(S);
        S += 8;
        break;
      case 31:
        switch (e) {
          case 2:
          case 3:
            throw new Error("Indefinite length not supported for byte or text strings");
          case 4:
            let n = [], r, s = 0;
            for (; (r = q()) != qe; ) {
              if (s >= ct) throw new Error(`Array length exceeds ${ct}`);
              n[s++] = r;
            }
            return e == 4 ? n : e == 3 ? n.join("") : Buffer.concat(n);
          case 5:
            let o;
            if (W.mapsAsObjects) {
              let i = {}, a = 0;
              if (W.keyMap) for (; (o = q()) != qe; ) {
                if (a++ >= Ce) throw new Error(`Property count exceeds ${Ce}`);
                i[pe(W.decodeKey(o))] = q();
              }
              else for (; (o = q()) != qe; ) {
                if (a++ >= Ce) throw new Error(`Property count exceeds ${Ce}`);
                i[pe(o)] = q();
              }
              return i;
            } else {
              ft && (W.mapsAsObjects = true, ft = false);
              let i = /* @__PURE__ */ new Map();
              if (W.keyMap) {
                let a = 0;
                for (; (o = q()) != qe; ) {
                  if (a++ >= Ce) throw new Error(`Map size exceeds ${Ce}`);
                  i.set(W.decodeKey(o), q());
                }
              } else {
                let a = 0;
                for (; (o = q()) != qe; ) {
                  if (a++ >= Ce) throw new Error(`Map size exceeds ${Ce}`);
                  i.set(o, q());
                }
              }
              return i;
            }
          case 7:
            return qe;
          default:
            throw new Error("Invalid major type for indefinite length " + e);
        }
      default:
        throw new Error("Unknown token " + t);
    }
    switch (e) {
      case 0:
        return t;
      case 1:
        return ~t;
      case 2:
        return uf(t);
      case 3:
        if (pt >= S) return qt.slice(S - Kt, (S += t) - Kt);
        if (pt == 0 && ze < 140 && t < 32) {
          let s = t < 16 ? Zs(t) : cf(t);
          if (s != null) return s;
        }
        return af(t);
      case 4:
        if (t >= ct) throw new Error(`Array length exceeds ${ct}`);
        let n = new Array(t);
        for (let s = 0; s < t; s++) n[s] = q();
        return n;
      case 5:
        if (t >= Ce) throw new Error(`Map size exceeds ${ct}`);
        if (W.mapsAsObjects) {
          let s = {};
          if (W.keyMap) for (let o = 0; o < t; o++) s[pe(W.decodeKey(q()))] = q();
          else for (let o = 0; o < t; o++) s[pe(q())] = q();
          return s;
        } else {
          ft && (W.mapsAsObjects = true, ft = false);
          let s = /* @__PURE__ */ new Map();
          if (W.keyMap) for (let o = 0; o < t; o++) s.set(W.decodeKey(q()), q());
          else for (let o = 0; o < t; o++) s.set(q(), q());
          return s;
        }
      case 6:
        if (t >= Yr) {
          let s = ee[t & 8191];
          if (s) return s.read || (s.read = Fn(s)), s.read();
          if (t < 65536) {
            if (t == of) {
              let o = Xe(), i = q(), a = q();
              Ln(i, a);
              let c = {};
              if (W.keyMap) for (let u = 2; u < o; u++) {
                let f = W.decodeKey(a[u - 2]);
                c[pe(f)] = q();
              }
              else for (let u = 2; u < o; u++) {
                let f = a[u - 2];
                c[pe(f)] = q();
              }
              return c;
            } else if (t == sf) {
              let o = Xe(), i = q();
              for (let a = 2; a < o; a++) Ln(i++, q());
              return q();
            } else if (t == Yr) return pf();
            if (W.getShared && (dr(), s = ee[t & 8191], s)) return s.read || (s.read = Fn(s)), s.read();
          }
        }
        let r = te[t];
        if (r) return r.handlesRead ? r(q) : r(q());
        {
          let s = q();
          for (let o = 0; o < Pn.length; o++) {
            let i = Pn[o](t, s);
            if (i !== void 0) return i;
          }
          return new Ve(s, t);
        }
      case 7:
        switch (t) {
          case 20:
            return false;
          case 21:
            return true;
          case 22:
            return null;
          case 23:
            return;
          case 31:
          default:
            let s = (fe || Pe())[t];
            if (s !== void 0) return s;
            throw new Error("Unknown token " + t);
        }
      default:
        if (isNaN(t)) {
          let s = new Error("Unexpected end of CBOR data");
          throw s.incomplete = true, s;
        }
        throw new Error("Unknown CBOR token " + t);
    }
  }
  const Qr = /^[a-zA-Z_$][a-zA-Z\d_$]*$/;
  function Fn(t) {
    if (!t) throw new Error("Structure is required in record definition");
    function e() {
      let n = U[S++];
      if (n = n & 31, n > 23) switch (n) {
        case 24:
          n = U[S++];
          break;
        case 25:
          n = ie.getUint16(S), S += 2;
          break;
        case 26:
          n = ie.getUint32(S), S += 4;
          break;
        default:
          throw new Error("Expected array header, but got " + U[S - 1]);
      }
      let r = this.compiledReader;
      for (; r; ) {
        if (r.propertyCount === n) return r(q);
        r = r.next;
      }
      if (this.slowReads++ >= Xs) {
        let o = this.length == n ? this : this.slice(0, n);
        return r = W.keyMap ? new Function("r", "return {" + o.map((i) => W.decodeKey(i)).map((i) => Qr.test(i) ? pe(i) + ":r()" : "[" + JSON.stringify(i) + "]:r()").join(",") + "}") : new Function("r", "return {" + o.map((i) => Qr.test(i) ? pe(i) + ":r()" : "[" + JSON.stringify(i) + "]:r()").join(",") + "}"), this.compiledReader && (r.next = this.compiledReader), r.propertyCount = n, this.compiledReader = r, r(q);
      }
      let s = {};
      if (W.keyMap) for (let o = 0; o < n; o++) s[pe(W.decodeKey(this[o]))] = q();
      else for (let o = 0; o < n; o++) s[pe(this[o])] = q();
      return s;
    }
    return t.slowReads = 0, e;
  }
  function pe(t) {
    if (typeof t == "string") return t === "__proto__" ? "__proto_" : t;
    if (typeof t == "number" || typeof t == "boolean" || typeof t == "bigint") return t.toString();
    if (t == null) return t + "";
    throw new Error("Invalid property name type " + typeof t);
  }
  let af = Hn;
  function Hn(t) {
    let e;
    if (t < 16 && (e = Zs(t))) return e;
    if (t > 64 && Bn) return Bn.decode(U.subarray(S, S += t));
    const n = S + t, r = [];
    for (e = ""; S < n; ) {
      const s = U[S++];
      if ((s & 128) === 0) r.push(s);
      else if ((s & 224) === 192) {
        const o = U[S++] & 63;
        r.push((s & 31) << 6 | o);
      } else if ((s & 240) === 224) {
        const o = U[S++] & 63, i = U[S++] & 63;
        r.push((s & 31) << 12 | o << 6 | i);
      } else if ((s & 248) === 240) {
        const o = U[S++] & 63, i = U[S++] & 63, a = U[S++] & 63;
        let c = (s & 7) << 18 | o << 12 | i << 6 | a;
        c > 65535 && (c -= 65536, r.push(c >>> 10 & 1023 | 55296), c = 56320 | c & 1023), r.push(c);
      } else r.push(s);
      r.length >= 4096 && (e += se.apply(String, r), r.length = 0);
    }
    return r.length > 0 && (e += se.apply(String, r)), e;
  }
  let se = String.fromCharCode;
  function cf(t) {
    let e = S, n = new Array(t);
    for (let r = 0; r < t; r++) {
      const s = U[S++];
      if ((s & 128) > 0) {
        S = e;
        return;
      }
      n[r] = s;
    }
    return se.apply(String, n);
  }
  function Zs(t) {
    if (t < 4) if (t < 2) {
      if (t === 0) return "";
      {
        let e = U[S++];
        if ((e & 128) > 1) {
          S -= 1;
          return;
        }
        return se(e);
      }
    } else {
      let e = U[S++], n = U[S++];
      if ((e & 128) > 0 || (n & 128) > 0) {
        S -= 2;
        return;
      }
      if (t < 3) return se(e, n);
      let r = U[S++];
      if ((r & 128) > 0) {
        S -= 3;
        return;
      }
      return se(e, n, r);
    }
    else {
      let e = U[S++], n = U[S++], r = U[S++], s = U[S++];
      if ((e & 128) > 0 || (n & 128) > 0 || (r & 128) > 0 || (s & 128) > 0) {
        S -= 4;
        return;
      }
      if (t < 6) {
        if (t === 4) return se(e, n, r, s);
        {
          let o = U[S++];
          if ((o & 128) > 0) {
            S -= 5;
            return;
          }
          return se(e, n, r, s, o);
        }
      } else if (t < 8) {
        let o = U[S++], i = U[S++];
        if ((o & 128) > 0 || (i & 128) > 0) {
          S -= 6;
          return;
        }
        if (t < 7) return se(e, n, r, s, o, i);
        let a = U[S++];
        if ((a & 128) > 0) {
          S -= 7;
          return;
        }
        return se(e, n, r, s, o, i, a);
      } else {
        let o = U[S++], i = U[S++], a = U[S++], c = U[S++];
        if ((o & 128) > 0 || (i & 128) > 0 || (a & 128) > 0 || (c & 128) > 0) {
          S -= 8;
          return;
        }
        if (t < 10) {
          if (t === 8) return se(e, n, r, s, o, i, a, c);
          {
            let u = U[S++];
            if ((u & 128) > 0) {
              S -= 9;
              return;
            }
            return se(e, n, r, s, o, i, a, c, u);
          }
        } else if (t < 12) {
          let u = U[S++], f = U[S++];
          if ((u & 128) > 0 || (f & 128) > 0) {
            S -= 10;
            return;
          }
          if (t < 11) return se(e, n, r, s, o, i, a, c, u, f);
          let l = U[S++];
          if ((l & 128) > 0) {
            S -= 11;
            return;
          }
          return se(e, n, r, s, o, i, a, c, u, f, l);
        } else {
          let u = U[S++], f = U[S++], l = U[S++], d = U[S++];
          if ((u & 128) > 0 || (f & 128) > 0 || (l & 128) > 0 || (d & 128) > 0) {
            S -= 12;
            return;
          }
          if (t < 14) {
            if (t === 12) return se(e, n, r, s, o, i, a, c, u, f, l, d);
            {
              let h = U[S++];
              if ((h & 128) > 0) {
                S -= 13;
                return;
              }
              return se(e, n, r, s, o, i, a, c, u, f, l, d, h);
            }
          } else {
            let h = U[S++], g = U[S++];
            if ((h & 128) > 0 || (g & 128) > 0) {
              S -= 14;
              return;
            }
            if (t < 15) return se(e, n, r, s, o, i, a, c, u, f, l, d, h, g);
            let v = U[S++];
            if ((v & 128) > 0) {
              S -= 15;
              return;
            }
            return se(e, n, r, s, o, i, a, c, u, f, l, d, h, g, v);
          }
        }
      }
    }
  }
  function uf(t) {
    return W.copyBuffers ? Uint8Array.prototype.slice.call(U, S, S += t) : U.subarray(S, S += t);
  }
  let Qs = new Float32Array(1), Ct = new Uint8Array(Qs.buffer, 0, 4);
  function ff() {
    let t = U[S++], e = U[S++], n = (t & 127) >> 2;
    if (n === 31) return e || t & 3 ? NaN : t & 128 ? -1 / 0 : 1 / 0;
    if (n === 0) {
      let r = ((t & 3) << 8 | e) / 16777216;
      return t & 128 ? -r : r;
    }
    return Ct[3] = t & 128 | (n >> 1) + 56, Ct[2] = (t & 7) << 5 | e >> 3, Ct[1] = e << 5, Ct[0] = 0, Qs[0];
  }
  new Array(4096);
  class Ve {
    constructor(e, n) {
      this.value = e, this.tag = n;
    }
  }
  te[0] = (t) => new Date(t);
  te[1] = (t) => new Date(Math.round(t * 1e3));
  te[2] = (t) => {
    let e = BigInt(0);
    for (let n = 0, r = t.byteLength; n < r; n++) e = BigInt(t[n]) + (e << BigInt(8));
    return e;
  };
  te[3] = (t) => BigInt(-1) - te[2](t);
  te[4] = (t) => +(t[1] + "e" + t[0]);
  te[5] = (t) => t[1] * Math.exp(t[0] * Math.log(2));
  const Ln = (t, e) => {
    t = t - 57344;
    let n = ee[t];
    n && n.isShared && ((ee.restoreStructures || (ee.restoreStructures = []))[t] = n), ee[t] = e, e.read = Fn(e);
  };
  te[rf] = (t) => {
    let e = t.length, n = t[1];
    Ln(t[0], n);
    let r = {};
    for (let s = 2; s < e; s++) {
      let o = n[s - 2];
      r[pe(o)] = t[s];
    }
    return r;
  };
  te[14] = (t) => re ? re[0].slice(re.position0, re.position0 += t) : new Ve(t, 14);
  te[15] = (t) => re ? re[1].slice(re.position1, re.position1 += t) : new Ve(t, 15);
  let lf = {
    Error,
    RegExp
  };
  te[27] = (t) => (lf[t[0]] || Error)(t[1], t[2]);
  const eo = (t) => {
    if (U[S++] != 132) {
      let n = new Error("Packed values structure must be followed by a 4 element array");
      throw U.length < S && (n.incomplete = true), n;
    }
    let e = t();
    if (!e || !e.length) {
      let n = new Error("Packed values structure must be followed by a 4 element array");
      throw n.incomplete = true, n;
    }
    return fe = fe ? e.concat(fe.slice(e.length)) : e, fe.prefixes = t(), fe.suffixes = t(), t();
  };
  eo.handlesRead = true;
  te[51] = eo;
  te[Xr] = (t) => {
    if (!fe) if (W.getShared) dr();
    else return new Ve(t, Xr);
    if (typeof t == "number") return fe[16 + (t >= 0 ? 2 * t : -2 * t - 1)];
    let e = new Error("No support for non-integer packed references yet");
    throw t === void 0 && (e.incomplete = true), e;
  };
  te[28] = (t) => {
    ge || (ge = /* @__PURE__ */ new Map(), ge.id = 0);
    let e = ge.id++, n = S, r = U[S], s;
    r >> 5 == 4 ? s = [] : s = {};
    let o = {
      target: s
    };
    ge.set(e, o);
    let i = t();
    return o.used ? (Object.getPrototypeOf(s) !== Object.getPrototypeOf(i) && (S = n, s = i, ge.set(e, {
      target: s
    }), i = t()), Object.assign(s, i)) : (o.target = i, i);
  };
  te[28].handlesRead = true;
  te[29] = (t) => {
    let e = ge.get(t);
    return e.used = true, e.target;
  };
  te[258] = (t) => new Set(t);
  (te[259] = (t) => (W.mapsAsObjects && (W.mapsAsObjects = false, ft = true), t())).handlesRead = true;
  function Ke(t, e) {
    return typeof t == "string" ? t + e : t instanceof Array ? t.concat(e) : Object.assign({}, t, e);
  }
  function Pe() {
    if (!fe) if (W.getShared) dr();
    else throw new Error("No packed values available");
    return fe;
  }
  const df = 1399353956;
  Pn.push((t, e) => {
    if (t >= 225 && t <= 255) return Ke(Pe().prefixes[t - 224], e);
    if (t >= 28704 && t <= 32767) return Ke(Pe().prefixes[t - 28672], e);
    if (t >= 1879052288 && t <= 2147483647) return Ke(Pe().prefixes[t - 1879048192], e);
    if (t >= 216 && t <= 223) return Ke(e, Pe().suffixes[t - 216]);
    if (t >= 27647 && t <= 28671) return Ke(e, Pe().suffixes[t - 27639]);
    if (t >= 1811940352 && t <= 1879048191) return Ke(e, Pe().suffixes[t - 1811939328]);
    if (t == df) return {
      packedValues: fe,
      structures: ee.slice(0),
      version: e
    };
    if (t == 55799) return e;
  });
  const hf = new Uint8Array(new Uint16Array([
    1
  ]).buffer)[0] == 1, es = [
    Uint8Array,
    Uint8ClampedArray,
    Uint16Array,
    Uint32Array,
    typeof BigUint64Array > "u" ? {
      name: "BigUint64Array"
    } : BigUint64Array,
    Int8Array,
    Int16Array,
    Int32Array,
    typeof BigInt64Array > "u" ? {
      name: "BigInt64Array"
    } : BigInt64Array,
    Float32Array,
    Float64Array
  ], _f = [
    64,
    68,
    69,
    70,
    71,
    72,
    77,
    78,
    79,
    85,
    86
  ];
  for (let t = 0; t < es.length; t++) gf(es[t], _f[t]);
  function gf(t, e) {
    let n = "get" + t.name.slice(0, -5), r;
    typeof t == "function" ? r = t.BYTES_PER_ELEMENT : t = null;
    for (let s = 0; s < 2; s++) {
      if (!s && r == 1) continue;
      let o = r == 2 ? 1 : r == 4 ? 2 : r == 8 ? 3 : 0;
      te[s ? e : e - 4] = r == 1 || s == hf ? (i) => {
        if (!t) throw new Error("Could not find typed array for code " + e);
        return !W.copyBuffers && (r === 1 || r === 2 && !(i.byteOffset & 1) || r === 4 && !(i.byteOffset & 3) || r === 8 && !(i.byteOffset & 7)) ? new t(i.buffer, i.byteOffset, i.byteLength >> o) : new t(Uint8Array.prototype.slice.call(i, 0).buffer);
      } : (i) => {
        if (!t) throw new Error("Could not find typed array for code " + e);
        let a = new DataView(i.buffer, i.byteOffset, i.byteLength), c = i.length >> o, u = new t(c), f = a[n];
        for (let l = 0; l < c; l++) u[l] = f.call(a, l << o, s);
        return u;
      };
    }
  }
  function pf() {
    let t = Xe(), e = S + q();
    for (let r = 2; r < t; r++) {
      let s = Xe();
      S += s;
    }
    let n = S;
    return S = e, re = [
      Hn(Xe()),
      Hn(Xe())
    ], re.position0 = 0, re.position1 = 0, re.postBundlePosition = S, S = n, q();
  }
  function Xe() {
    let t = U[S++] & 31;
    if (t > 23) switch (t) {
      case 24:
        t = U[S++];
        break;
      case 25:
        t = ie.getUint16(S), S += 2;
        break;
      case 26:
        t = ie.getUint32(S), S += 4;
        break;
    }
    return t;
  }
  function dr() {
    if (W.getShared) {
      let t = to(() => (U = null, W.getShared())) || {}, e = t.structures || [];
      W.sharedVersion = t.version, fe = W.sharedValues = t.packedValues, ee === true ? W.structures = ee = e : ee.splice.apply(ee, [
        0,
        e.length
      ].concat(e));
    }
  }
  function to(t) {
    let e = ze, n = S, r = Kt, s = pt, o = qt, i = ge, a = re, c = new Uint8Array(U.slice(0, ze)), u = ee, f = W, l = yt, d = t();
    return ze = e, S = n, Kt = r, pt = s, qt = o, ge = i, re = a, U = c, yt = l, ee = u, W = f, ie = new DataView(U.buffer, U.byteOffset, U.byteLength), d;
  }
  function zn() {
    U = null, ge = null, ee = null;
  }
  const hr = new Array(147);
  for (let t = 0; t < 256; t++) hr[t] = +("1e" + Math.floor(45.15 - t * 0.30103));
  let _r = new bt({
    useRecords: false
  });
  const no = _r.decode;
  _r.decodeMultiple;
  let Ut;
  try {
    Ut = new TextEncoder();
  } catch {
  }
  let Nn, ro;
  const nn = typeof globalThis == "object" && globalThis.Buffer, kt = typeof nn < "u", yn = kt ? nn.allocUnsafeSlow : Uint8Array, ts = kt ? nn : Uint8Array, ns = 256, rs = kt ? 4294967296 : 2144337920;
  let bn, m, Z, p = 0, Ue, ne = null;
  const yf = 61440, bf = /[\u0080-\uFFFF]/, de = Symbol("record-id");
  class so extends bt {
    constructor(e) {
      super(e), this.offset = 0;
      let n, r, s, o, i;
      e = e || {};
      let a = ts.prototype.utf8Write ? function(y, j, A) {
        return m.utf8Write(y, j, A);
      } : Ut && Ut.encodeInto ? function(y, j) {
        return Ut.encodeInto(y, m.subarray(j)).written;
      } : false, c = this, u = e.structures || e.saveStructures, f = e.maxSharedStructures;
      if (f == null && (f = u ? 128 : 0), f > 8190) throw new Error("Maximum maxSharedStructure is 8190");
      let l = e.sequential;
      l && (f = 0), this.structures || (this.structures = []), this.saveStructures && (this.saveShared = this.saveStructures);
      let d, h, g = e.sharedValues, v;
      if (g) {
        v = /* @__PURE__ */ Object.create(null);
        for (let y = 0, j = g.length; y < j; y++) v[g[y]] = y;
      }
      let x = [], R = 0, M = 0;
      this.mapEncode = function(y, j) {
        if (this._keyMap && !this._mapped) switch (y.constructor.name) {
          case "Array":
            y = y.map((A) => this.encodeKeys(A));
            break;
        }
        return this.encode(y, j);
      }, this.encode = function(y, j) {
        if (m || (m = new yn(8192), Z = new DataView(m.buffer, 0, 8192), p = 0), Ue = m.length - 10, Ue - p < 2048 ? (m = new yn(m.length), Z = new DataView(m.buffer, 0, m.length), Ue = m.length - 10, p = 0) : j === is && (p = p + 7 & 2147483640), n = p, c.useSelfDescribedHeader && (Z.setUint32(p, 3654940416), p += 3), i = c.structuredClone ? /* @__PURE__ */ new Map() : null, c.bundleStrings && typeof y != "string" ? (ne = [], ne.size = 1 / 0) : ne = null, r = c.structures, r) {
          if (r.uninitialized) {
            let C = c.getShared() || {};
            c.structures = r = C.structures || [], c.sharedVersion = C.version;
            let O = c.sharedValues = C.packedValues;
            if (O) {
              v = {};
              for (let P = 0, H = O.length; P < H; P++) v[O[P]] = P;
            }
          }
          let A = r.length;
          if (A > f && !l && (A = f), !r.transitions) {
            r.transitions = /* @__PURE__ */ Object.create(null);
            for (let C = 0; C < A; C++) {
              let O = r[C];
              if (!O) continue;
              let P, H = r.transitions;
              for (let N = 0, V = O.length; N < V; N++) {
                H[de] === void 0 && (H[de] = C);
                let K = O[N];
                P = H[K], P || (P = H[K] = /* @__PURE__ */ Object.create(null)), H = P;
              }
              H[de] = C | 1048576;
            }
          }
          l || (r.nextId = A);
        }
        if (s && (s = false), o = r || [], h = v, e.pack) {
          let A = /* @__PURE__ */ new Map();
          if (A.values = [], A.encoder = c, A.maxValues = e.maxPrivatePackedValues || (v ? 16 : 1 / 0), A.objectMap = v || false, A.samplingPackedValues = d, $t(y, A), A.values.length > 0) {
            m[p++] = 216, m[p++] = 51, xe(4);
            let C = A.values;
            k(C), xe(0), xe(0), h = Object.create(v || null);
            for (let O = 0, P = C.length; O < P; O++) h[C[O]] = O;
          }
        }
        bn = j & wn;
        try {
          if (bn) return;
          if (k(y), ne && os(n, k), c.offset = p, i && i.idsToInsert) {
            p += i.idsToInsert.length * 2, p > Ue && $(p), c.offset = p;
            let A = vf(m.subarray(n, p), i.idsToInsert);
            return i = null, A;
          }
          return j & is ? (m.start = n, m.end = p, m) : m.subarray(n, p);
        } finally {
          if (r) {
            if (M < 10 && M++, r.length > f && (r.length = f), R > 1e4) r.transitions = null, M = 0, R = 0, x.length > 0 && (x = []);
            else if (x.length > 0 && !l) {
              for (let A = 0, C = x.length; A < C; A++) x[A][de] = void 0;
              x = [];
            }
          }
          if (s && c.saveShared) {
            c.structures.length > f && (c.structures = c.structures.slice(0, f));
            let A = m.subarray(n, p);
            return c.updateSharedData() === false ? c.encode(y) : A;
          }
          j & xf && (p = n);
        }
      }, this.findCommonStringsToPack = () => (d = /* @__PURE__ */ new Map(), v || (v = /* @__PURE__ */ Object.create(null)), (y) => {
        let j = y && y.threshold || 4, A = this.pack ? y.maxPrivatePackedValues || 16 : 0;
        g || (g = this.sharedValues = []);
        for (let [C, O] of d) O.count > j && (v[C] = A++, g.push(C), s = true);
        for (; this.saveShared && this.updateSharedData() === false; ) ;
        d = null;
      });
      const k = (y) => {
        p > Ue && (m = $(p));
        var j = typeof y, A;
        if (j === "string") {
          if (h) {
            let H = h[y];
            if (H >= 0) {
              H < 16 ? m[p++] = H + 224 : (m[p++] = 198, H & 1 ? k(15 - H >> 1) : k(H - 16 >> 1));
              return;
            } else if (d && !e.pack) {
              let N = d.get(y);
              N ? N.count++ : d.set(y, {
                count: 1
              });
            }
          }
          let C = y.length;
          if (ne && C >= 4 && C < 1024) {
            if ((ne.size += C) > yf) {
              let N, V = (ne[0] ? ne[0].length * 3 + ne[1].length : 0) + 10;
              p + V > Ue && (m = $(p + V)), m[p++] = 217, m[p++] = 223, m[p++] = 249, m[p++] = ne.position ? 132 : 130, m[p++] = 26, N = p - n, p += 4, ne.position && os(n, k), ne = [
                "",
                ""
              ], ne.size = 0, ne.position = N;
            }
            let H = bf.test(y);
            ne[H ? 0 : 1] += y, m[p++] = H ? 206 : 207, k(C);
            return;
          }
          let O;
          C < 32 ? O = 1 : C < 256 ? O = 2 : C < 65536 ? O = 3 : O = 5;
          let P = C * 3;
          if (p + P > Ue && (m = $(p + P)), C < 64 || !a) {
            let H, N, V, K = p + O;
            for (H = 0; H < C; H++) N = y.charCodeAt(H), N < 128 ? m[K++] = N : N < 2048 ? (m[K++] = N >> 6 | 192, m[K++] = N & 63 | 128) : (N & 64512) === 55296 && ((V = y.charCodeAt(H + 1)) & 64512) === 56320 ? (N = 65536 + ((N & 1023) << 10) + (V & 1023), H++, m[K++] = N >> 18 | 240, m[K++] = N >> 12 & 63 | 128, m[K++] = N >> 6 & 63 | 128, m[K++] = N & 63 | 128) : (m[K++] = N >> 12 | 224, m[K++] = N >> 6 & 63 | 128, m[K++] = N & 63 | 128);
            A = K - p - O;
          } else A = a(y, p + O, P);
          A < 24 ? m[p++] = 96 | A : A < 256 ? (O < 2 && m.copyWithin(p + 2, p + 1, p + 1 + A), m[p++] = 120, m[p++] = A) : A < 65536 ? (O < 3 && m.copyWithin(p + 3, p + 2, p + 2 + A), m[p++] = 121, m[p++] = A >> 8, m[p++] = A & 255) : (O < 5 && m.copyWithin(p + 5, p + 3, p + 3 + A), m[p++] = 122, Z.setUint32(p, A), p += 4), p += A;
        } else if (j === "number") if (!this.alwaysUseFloat && y >>> 0 === y) y < 24 ? m[p++] = y : y < 256 ? (m[p++] = 24, m[p++] = y) : y < 65536 ? (m[p++] = 25, m[p++] = y >> 8, m[p++] = y & 255) : (m[p++] = 26, Z.setUint32(p, y), p += 4);
        else if (!this.alwaysUseFloat && y >> 0 === y) y >= -24 ? m[p++] = 31 - y : y >= -256 ? (m[p++] = 56, m[p++] = ~y) : y >= -65536 ? (m[p++] = 57, Z.setUint16(p, ~y), p += 2) : (m[p++] = 58, Z.setUint32(p, ~y), p += 4);
        else {
          let C;
          if ((C = this.useFloat32) > 0 && y < 4294967296 && y >= -2147483648) {
            m[p++] = 250, Z.setFloat32(p, y);
            let O;
            if (C < 4 || (O = y * hr[(m[p] & 127) << 1 | m[p + 1] >> 7]) >> 0 === O) {
              p += 4;
              return;
            } else p--;
          }
          m[p++] = 251, Z.setFloat64(p, y), p += 8;
        }
        else if (j === "object") if (!y) m[p++] = 246;
        else {
          if (i) {
            let O = i.get(y);
            if (O) {
              if (m[p++] = 216, m[p++] = 29, m[p++] = 25, !O.references) {
                let P = i.idsToInsert || (i.idsToInsert = []);
                O.references = [], P.push(O);
              }
              O.references.push(p - n), p += 2;
              return;
            } else i.set(y, {
              offset: p - n
            });
          }
          let C = y.constructor;
          if (C === Object) z(y);
          else if (C === Array) {
            A = y.length, A < 24 ? m[p++] = 128 | A : xe(A);
            for (let O = 0; O < A; O++) k(y[O]);
          } else if (C === Map) if ((this.mapsAsObjects ? this.useTag259ForMaps !== false : this.useTag259ForMaps) && (m[p++] = 217, m[p++] = 1, m[p++] = 3), A = y.size, A < 24 ? m[p++] = 160 | A : A < 256 ? (m[p++] = 184, m[p++] = A) : A < 65536 ? (m[p++] = 185, m[p++] = A >> 8, m[p++] = A & 255) : (m[p++] = 186, Z.setUint32(p, A), p += 4), c.keyMap) for (let [O, P] of y) k(c.encodeKey(O)), k(P);
          else for (let [O, P] of y) k(O), k(P);
          else {
            for (let O = 0, P = Nn.length; O < P; O++) {
              let H = ro[O];
              if (y instanceof H) {
                let N = Nn[O], V = N.tag;
                V == null && (V = N.getTag && N.getTag.call(this, y)), V < 24 ? m[p++] = 192 | V : V < 256 ? (m[p++] = 216, m[p++] = V) : V < 65536 ? (m[p++] = 217, m[p++] = V >> 8, m[p++] = V & 255) : V > -1 && (m[p++] = 218, Z.setUint32(p, V), p += 4), N.encode.call(this, y, k, $);
                return;
              }
            }
            if (y[Symbol.iterator]) {
              if (bn) {
                let O = new Error("Iterable should be serialized as iterator");
                throw O.iteratorNotHandled = true, O;
              }
              m[p++] = 159;
              for (let O of y) k(O);
              m[p++] = 255;
              return;
            }
            if (y[Symbol.asyncIterator] || mn(y)) {
              let O = new Error("Iterable/blob should be serialized as iterator");
              throw O.iteratorNotHandled = true, O;
            }
            if (this.useToJSON && y.toJSON) {
              const O = y.toJSON();
              if (O !== y) return k(O);
            }
            z(y);
          }
        }
        else if (j === "boolean") m[p++] = y ? 245 : 244;
        else if (j === "bigint") {
          if (y < BigInt(1) << BigInt(64) && y >= 0) m[p++] = 27, Z.setBigUint64(p, y);
          else if (y > -(BigInt(1) << BigInt(64)) && y < 0) m[p++] = 59, Z.setBigUint64(p, -y - BigInt(1));
          else if (this.largeBigIntToFloat) m[p++] = 251, Z.setFloat64(p, Number(y));
          else {
            y >= BigInt(0) ? m[p++] = 194 : (m[p++] = 195, y = BigInt(-1) - y);
            let C = [];
            for (; y; ) C.push(Number(y & BigInt(255))), y >>= BigInt(8);
            Vn(new Uint8Array(C.reverse()), $);
            return;
          }
          p += 8;
        } else if (j === "undefined") m[p++] = 247;
        else throw new Error("Unknown type: " + j);
      }, z = this.useRecords === false ? this.variableMapSize ? (y) => {
        let j = Object.keys(y), A = Object.values(y), C = j.length;
        if (C < 24 ? m[p++] = 160 | C : C < 256 ? (m[p++] = 184, m[p++] = C) : C < 65536 ? (m[p++] = 185, m[p++] = C >> 8, m[p++] = C & 255) : (m[p++] = 186, Z.setUint32(p, C), p += 4), c.keyMap) for (let O = 0; O < C; O++) k(c.encodeKey(j[O])), k(A[O]);
        else for (let O = 0; O < C; O++) k(j[O]), k(A[O]);
      } : (y) => {
        m[p++] = 185;
        let j = p - n;
        p += 2;
        let A = 0;
        if (c.keyMap) for (let C in y) (typeof y.hasOwnProperty != "function" || y.hasOwnProperty(C)) && (k(c.encodeKey(C)), k(y[C]), A++);
        else for (let C in y) (typeof y.hasOwnProperty != "function" || y.hasOwnProperty(C)) && (k(C), k(y[C]), A++);
        m[j++ + n] = A >> 8, m[j + n] = A & 255;
      } : (y, j) => {
        let A, C = o.transitions || (o.transitions = /* @__PURE__ */ Object.create(null)), O = 0, P = 0, H, N;
        if (this.keyMap) {
          N = Object.keys(y).map((K) => this.encodeKey(K)), P = N.length;
          for (let K = 0; K < P; K++) {
            let mr = N[K];
            A = C[mr], A || (A = C[mr] = /* @__PURE__ */ Object.create(null), O++), C = A;
          }
        } else for (let K in y) (typeof y.hasOwnProperty != "function" || y.hasOwnProperty(K)) && (A = C[K], A || (C[de] & 1048576 && (H = C[de] & 65535), A = C[K] = /* @__PURE__ */ Object.create(null), O++), C = A, P++);
        let V = C[de];
        if (V !== void 0) V &= 65535, m[p++] = 217, m[p++] = V >> 8 | 224, m[p++] = V & 255;
        else if (N || (N = C.__keys__ || (C.__keys__ = Object.keys(y))), H === void 0 ? (V = o.nextId++, V || (V = 0, o.nextId = 1), V >= ns && (o.nextId = (V = f) + 1)) : V = H, o[V] = N, V < f) {
          m[p++] = 217, m[p++] = V >> 8 | 224, m[p++] = V & 255, C = o.transitions;
          for (let K = 0; K < P; K++) (C[de] === void 0 || C[de] & 1048576) && (C[de] = V), C = C[N[K]];
          C[de] = V | 1048576, s = true;
        } else {
          if (C[de] = V, Z.setUint32(p, 3655335680), p += 3, O && (R += M * O), x.length >= ns - f && (x.shift()[de] = void 0), x.push(C), xe(P + 2), k(57344 + V), k(N), j) return;
          for (let K in y) (typeof y.hasOwnProperty != "function" || y.hasOwnProperty(K)) && k(y[K]);
          return;
        }
        if (P < 24 ? m[p++] = 128 | P : xe(P), !j) for (let K in y) (typeof y.hasOwnProperty != "function" || y.hasOwnProperty(K)) && k(y[K]);
      }, $ = (y) => {
        let j;
        if (y > 16777216) {
          if (y - n > rs) throw new Error("Encoded buffer would be larger than maximum buffer size");
          j = Math.min(rs, Math.round(Math.max((y - n) * (y > 67108864 ? 1.25 : 2), 4194304) / 4096) * 4096);
        } else j = (Math.max(y - n << 2, m.length - 1) >> 12) + 1 << 12;
        let A = new yn(j);
        return Z = new DataView(A.buffer, 0, j), m.copy ? m.copy(A, 0, n, y) : A.set(m.slice(n, y)), p -= n, n = 0, Ue = A.length - 10, m = A;
      };
      let F = 100, Y = 1e3;
      this.encodeAsIterable = function(y, j) {
        return I(y, j, L);
      }, this.encodeAsAsyncIterable = function(y, j) {
        return I(y, j, B);
      };
      function* L(y, j, A) {
        let C = y.constructor;
        if (C === Object) {
          let O = c.useRecords !== false;
          O ? z(y, true) : ss(Object.keys(y).length, 160);
          for (let P in y) {
            let H = y[P];
            O || k(P), H && typeof H == "object" ? j[P] ? yield* L(H, j[P]) : yield* J(H, j, P) : k(H);
          }
        } else if (C === Array) {
          let O = y.length;
          xe(O);
          for (let P = 0; P < O; P++) {
            let H = y[P];
            H && (typeof H == "object" || p - n > F) ? j.element ? yield* L(H, j.element) : yield* J(H, j, "element") : k(H);
          }
        } else if (y[Symbol.iterator] && !y.buffer) {
          m[p++] = 159;
          for (let O of y) O && (typeof O == "object" || p - n > F) ? j.element ? yield* L(O, j.element) : yield* J(O, j, "element") : k(O);
          m[p++] = 255;
        } else mn(y) ? (ss(y.size, 64), yield m.subarray(n, p), yield y, G()) : y[Symbol.asyncIterator] ? (m[p++] = 159, yield m.subarray(n, p), yield y, G(), m[p++] = 255) : k(y);
        A && p > n ? yield m.subarray(n, p) : p - n > F && (yield m.subarray(n, p), G());
      }
      function* J(y, j, A) {
        let C = p - n;
        try {
          k(y), p - n > F && (yield m.subarray(n, p), G());
        } catch (O) {
          if (O.iteratorNotHandled) j[A] = {}, p = n + C, yield* L.call(this, y, j[A]);
          else throw O;
        }
      }
      function G() {
        F = Y, c.encode(null, wn);
      }
      function I(y, j, A) {
        return j && j.chunkThreshold ? F = Y = j.chunkThreshold : F = 100, y && typeof y == "object" ? (c.encode(null, wn), A(y, c.iterateProperties || (c.iterateProperties = {}), true)) : [
          c.encode(y)
        ];
      }
      async function* B(y, j) {
        for (let A of L(y, j, true)) {
          let C = A.constructor;
          if (C === ts || C === Uint8Array) yield A;
          else if (mn(A)) {
            let O = A.stream().getReader(), P;
            for (; !(P = await O.read()).done; ) yield P.value;
          } else if (A[Symbol.asyncIterator]) for await (let O of A) G(), O ? yield* B(O, j.async || (j.async = {})) : yield c.encode(O);
          else yield A;
        }
      }
    }
    useBuffer(e) {
      m = e, Z = new DataView(m.buffer, m.byteOffset, m.byteLength), p = 0;
    }
    clearSharedData() {
      this.structures && (this.structures = []), this.sharedValues && (this.sharedValues = void 0);
    }
    updateSharedData() {
      let e = this.sharedVersion || 0;
      this.sharedVersion = e + 1;
      let n = this.structures.slice(0), r = new oo(n, this.sharedValues, this.sharedVersion), s = this.saveShared(r, (o) => (o && o.version || 0) == e);
      return s === false ? (r = this.getShared() || {}, this.structures = r.structures || [], this.sharedValues = r.packedValues, this.sharedVersion = r.version, this.structures.nextId = this.structures.length) : n.forEach((o, i) => this.structures[i] = o), s;
    }
  }
  function ss(t, e) {
    t < 24 ? m[p++] = e | t : t < 256 ? (m[p++] = e | 24, m[p++] = t) : t < 65536 ? (m[p++] = e | 25, m[p++] = t >> 8, m[p++] = t & 255) : (m[p++] = e | 26, Z.setUint32(p, t), p += 4);
  }
  class oo {
    constructor(e, n, r) {
      this.structures = e, this.packedValues = n, this.version = r;
    }
  }
  function xe(t) {
    t < 24 ? m[p++] = 128 | t : t < 256 ? (m[p++] = 152, m[p++] = t) : t < 65536 ? (m[p++] = 153, m[p++] = t >> 8, m[p++] = t & 255) : (m[p++] = 154, Z.setUint32(p, t), p += 4);
  }
  const mf = typeof Blob > "u" ? function() {
  } : Blob;
  function mn(t) {
    if (t instanceof mf) return true;
    let e = t[Symbol.toStringTag];
    return e === "Blob" || e === "File";
  }
  function $t(t, e) {
    switch (typeof t) {
      case "string":
        if (t.length > 3) {
          if (e.objectMap[t] > -1 || e.values.length >= e.maxValues) return;
          let r = e.get(t);
          if (r) ++r.count == 2 && e.values.push(t);
          else if (e.set(t, {
            count: 1
          }), e.samplingPackedValues) {
            let s = e.samplingPackedValues.get(t);
            s ? s.count++ : e.samplingPackedValues.set(t, {
              count: 1
            });
          }
        }
        break;
      case "object":
        if (t) if (t instanceof Array) for (let r = 0, s = t.length; r < s; r++) $t(t[r], e);
        else {
          let r = !e.encoder.useRecords;
          for (var n in t) t.hasOwnProperty(n) && (r && $t(n, e), $t(t[n], e));
        }
        break;
      case "function":
        console.log(t);
    }
  }
  const wf = new Uint8Array(new Uint16Array([
    1
  ]).buffer)[0] == 1;
  ro = [
    Date,
    Set,
    Error,
    RegExp,
    Ve,
    ArrayBuffer,
    Uint8Array,
    Uint8ClampedArray,
    Uint16Array,
    Uint32Array,
    typeof BigUint64Array > "u" ? function() {
    } : BigUint64Array,
    Int8Array,
    Int16Array,
    Int32Array,
    typeof BigInt64Array > "u" ? function() {
    } : BigInt64Array,
    Float32Array,
    Float64Array,
    oo
  ];
  Nn = [
    {
      tag: 1,
      encode(t, e) {
        let n = t.getTime() / 1e3;
        (this.useTimestamp32 || t.getMilliseconds() === 0) && n >= 0 && n < 4294967296 ? (m[p++] = 26, Z.setUint32(p, n), p += 4) : (m[p++] = 251, Z.setFloat64(p, n), p += 8);
      }
    },
    {
      tag: 258,
      encode(t, e) {
        let n = Array.from(t);
        e(n);
      }
    },
    {
      tag: 27,
      encode(t, e) {
        e([
          t.name,
          t.message
        ]);
      }
    },
    {
      tag: 27,
      encode(t, e) {
        e([
          "RegExp",
          t.source,
          t.flags
        ]);
      }
    },
    {
      getTag(t) {
        return t.tag;
      },
      encode(t, e) {
        e(t.value);
      }
    },
    {
      encode(t, e, n) {
        Vn(t, n);
      }
    },
    {
      getTag(t) {
        if (t.constructor === Uint8Array && (this.tagUint8Array || kt && this.tagUint8Array !== false)) return 64;
      },
      encode(t, e, n) {
        Vn(t, n);
      }
    },
    we(68, 1),
    we(69, 2),
    we(70, 4),
    we(71, 8),
    we(72, 1),
    we(77, 2),
    we(78, 4),
    we(79, 8),
    we(85, 4),
    we(86, 8),
    {
      encode(t, e) {
        let n = t.packedValues || [], r = t.structures || [];
        if (n.values.length > 0) {
          m[p++] = 216, m[p++] = 51, xe(4);
          let s = n.values;
          e(s), xe(0), xe(0), packedObjectMap = Object.create(sharedPackedObjectMap || null);
          for (let o = 0, i = s.length; o < i; o++) packedObjectMap[s[o]] = o;
        }
        if (r) {
          Z.setUint32(p, 3655335424), p += 3;
          let s = r.slice(0);
          s.unshift(57344), s.push(new Ve(t.version, 1399353956)), e(s);
        } else e(new Ve(t.version, 1399353956));
      }
    }
  ];
  function we(t, e) {
    return !wf && e > 1 && (t -= 4), {
      tag: t,
      encode: function(r, s) {
        let o = r.byteLength, i = r.byteOffset || 0, a = r.buffer || r;
        s(kt ? nn.from(a, i, o) : new Uint8Array(a, i, o));
      }
    };
  }
  function Vn(t, e) {
    let n = t.byteLength;
    n < 24 ? m[p++] = 64 + n : n < 256 ? (m[p++] = 88, m[p++] = n) : n < 65536 ? (m[p++] = 89, m[p++] = n >> 8, m[p++] = n & 255) : (m[p++] = 90, Z.setUint32(p, n), p += 4), p + n >= m.length && e(p + n), m.set(t.buffer ? t : new Uint8Array(t), p), p += n;
  }
  function vf(t, e) {
    let n, r = e.length * 2, s = t.length - r;
    e.sort((o, i) => o.offset > i.offset ? 1 : -1);
    for (let o = 0; o < e.length; o++) {
      let i = e[o];
      i.id = o;
      for (let a of i.references) t[a++] = o >> 8, t[a] = o & 255;
    }
    for (; n = e.pop(); ) {
      let o = n.offset;
      t.copyWithin(o + r, o, s), r -= 2;
      let i = o + r;
      t[i++] = 216, t[i++] = 28, s = o;
    }
    return t;
  }
  function os(t, e) {
    Z.setUint32(ne.position + t, p - ne.position - t + 1);
    let n = ne;
    ne = null, e(n[0]), e(n[1]);
  }
  let gr = new so({
    useRecords: false
  });
  gr.encode;
  gr.encodeAsIterable;
  gr.encodeAsAsyncIterable;
  const is = 512, xf = 1024, wn = 2048;
  function io(t) {
    return new so({
      tagUint8Array: false,
      useRecords: false
    }).encode(t);
  }
  function Sf(t) {
    return no(t);
  }
  const kf = (t, e) => t.length === e.length && t.every((n, r) => n === e[r]), pr = (t, e) => kf(t, e), Af = async (t, e) => {
    let n;
    const r = new Promise((s, o) => {
      n = setTimeout(() => o(new Ef(`withTimeout: timed out after ${e}ms`)), e);
    });
    try {
      return await Promise.race([
        t,
        r
      ]);
    } finally {
      clearTimeout(n);
    }
  };
  class Ef extends Error {
    constructor(e) {
      super(e), this.name = "TimeoutError";
    }
  }
  class If extends ot {
    constructor(e, n = {}) {
      super();
      __privateAdd(this, _If_instances);
      __publicField(this, "documentId");
      __privateAdd(this, _t2);
      __privateAdd(this, _e2);
      __privateAdd(this, _n2);
      __privateAdd(this, _r2, 6e4);
      __privateAdd(this, _s2, {});
      __publicField(this, "isReady", () => this.inState([
        "ready"
      ]));
      __publicField(this, "isDeleted", () => this.inState([
        "deleted"
      ]));
      __publicField(this, "isUnavailable", () => this.inState([
        "unavailable"
      ]));
      __publicField(this, "inState", (e) => e.some((n) => __privateGet(this, _e2).getSnapshot().matches(n)));
      this.documentId = e, "timeoutDelay" in n && n.timeoutDelay && __privateSet(this, _r2, n.timeoutDelay);
      let r;
      const s = "isNew" in n && n.isNew;
      s ? (r = Tc(n.initialValue), r = wc(r)) : r = Qt(), __privateSet(this, _t2, Me(`automerge-repo:dochandle:${this.documentId.slice(0, 5)}`));
      const o = __privateGet(this, _r2), i = Nu({
        actions: {
          onUpdate: Un(({ context: a, event: c }) => {
            const u = a.doc;
            Fu(c, Tt);
            const { callback: f } = c.payload;
            return {
              doc: f(u)
            };
          }),
          onDelete: Un(() => (this.emit("delete", {
            handle: this
          }), {
            doc: void 0
          })),
          onUnavailable: () => {
            this.emit("unavailable", {
              handle: this
            });
          }
        }
      }).createMachine({
        initial: "idle",
        context: {
          documentId: e,
          doc: r
        },
        on: {
          UPDATE: {
            actions: "onUpdate"
          },
          DELETE: ".deleted"
        },
        states: {
          idle: {
            on: {
              CREATE: "ready",
              FIND: "loading"
            }
          },
          loading: {
            on: {
              REQUEST: "requesting",
              DOC_READY: "ready",
              AWAIT_NETWORK: "awaitingNetwork"
            },
            after: {
              [o]: "unavailable"
            }
          },
          awaitingNetwork: {
            on: {
              NETWORK_READY: "requesting"
            }
          },
          requesting: {
            on: {
              DOC_UNAVAILABLE: "unavailable",
              DOC_READY: "ready"
            },
            after: {
              [o]: "unavailable"
            }
          },
          unavailable: {
            entry: "onUnavailable",
            on: {
              DOC_READY: "ready"
            }
          },
          ready: {},
          deleted: {
            entry: "onDelete",
            type: "final"
          }
        }
      });
      __privateSet(this, _e2, gt(i)), __privateGet(this, _e2).subscribe((a) => {
        const c = __privateGet(this, _n2), u = a.context.doc;
        __privateGet(this, _t2).call(this, `\u2192 ${a.value} %o`, u), __privateMethod(this, _If_instances, c_fn).call(this, c, u);
      }), __privateGet(this, _e2).start(), __privateGet(this, _e2).send(s ? {
        type: Of
      } : {
        type: Tf
      });
    }
    get url() {
      return lr({
        documentId: this.documentId
      });
    }
    get state() {
      return __privateGet(this, _e2).getSnapshot().value;
    }
    async whenReady(e = [
      "ready"
    ]) {
      await Af(__privateMethod(this, _If_instances, i_fn).call(this, e), __privateGet(this, _r2));
    }
    async doc(e = [
      "ready",
      "unavailable"
    ]) {
      try {
        await __privateMethod(this, _If_instances, i_fn).call(this, e);
      } catch {
        return;
      }
      return this.isUnavailable() ? void 0 : __privateGet(this, _If_instances, o_get);
    }
    docSync() {
      if (this.isReady()) return __privateGet(this, _If_instances, o_get);
    }
    heads() {
      if (this.isReady()) return me(__privateGet(this, _If_instances, o_get));
    }
    update(e) {
      __privateGet(this, _e2).send({
        type: Tt,
        payload: {
          callback: e
        }
      });
    }
    setRemoteHeads(e, n) {
      __privateGet(this, _s2)[e] = n, this.emit("remote-heads", {
        storageId: e,
        heads: n
      });
    }
    getRemoteHeads(e) {
      return __privateGet(this, _s2)[e];
    }
    change(e, n = {}) {
      if (!this.isReady()) throw new Error(`DocHandle#${this.documentId} is not ready. Check \`handle.isReady()\` before accessing the document.`);
      __privateGet(this, _e2).send({
        type: Tt,
        payload: {
          callback: (r) => bc(r, n, e)
        }
      });
    }
    changeAt(e, n, r = {}) {
      if (!this.isReady()) throw new Error(`DocHandle#${this.documentId} is not ready. Check \`handle.isReady()\` before accessing the document.`);
      let s;
      return __privateGet(this, _e2).send({
        type: Tt,
        payload: {
          callback: (o) => {
            const i = mc(o, e, r, n);
            return s = i.newHeads || void 0, i.newDoc;
          }
        }
      }), s;
    }
    merge(e) {
      if (!this.isReady() || !e.isReady()) throw new Error("Both handles must be ready to merge");
      const n = e.docSync();
      if (!n) throw new Error("The document to be merged in is falsy, aborting.");
      this.update((r) => xc(r, n));
    }
    unavailable() {
      __privateGet(this, _e2).send({
        type: $f
      });
    }
    request() {
      __privateGet(this, _If_instances, a_get) === "loading" && __privateGet(this, _e2).send({
        type: Rf
      });
    }
    awaitNetwork() {
      __privateGet(this, _If_instances, a_get) === "loading" && __privateGet(this, _e2).send({
        type: jf
      });
    }
    networkReady() {
      __privateGet(this, _If_instances, a_get) === "awaitingNetwork" && __privateGet(this, _e2).send({
        type: Df
      });
    }
    delete() {
      __privateGet(this, _e2).send({
        type: Uf
      });
    }
    broadcast(e) {
      this.emit("ephemeral-message-outbound", {
        handle: this,
        data: io(e)
      });
    }
  }
  _t2 = new WeakMap();
  _e2 = new WeakMap();
  _n2 = new WeakMap();
  _r2 = new WeakMap();
  _s2 = new WeakMap();
  _If_instances = new WeakSet();
  o_get = function() {
    var _a5;
    return (_a5 = __privateGet(this, _e2)) == null ? void 0 : _a5.getSnapshot().context.doc;
  };
  a_get = function() {
    var _a5;
    return (_a5 = __privateGet(this, _e2)) == null ? void 0 : _a5.getSnapshot().value;
  };
  i_fn = function(e) {
    const n = Array.isArray(e) ? e : [
      e
    ];
    return Wu(__privateGet(this, _e2), (r) => n.some((s) => r.matches(s)), {
      timeout: __privateGet(this, _r2) * 2
    });
  };
  c_fn = function(e, n) {
    if (n && e && !pr(me(n), me(e))) {
      this.emit("heads-changed", {
        handle: this,
        doc: n
      });
      const s = Sc(n, me(e), me(n));
      s.length > 0 && this.emit("change", {
        handle: this,
        doc: n,
        patches: s,
        patchInfo: {
          before: e,
          after: n,
          source: "change"
        }
      }), this.isReady() || __privateGet(this, _e2).send({
        type: Mf
      });
    }
    __privateSet(this, _n2, n);
  };
  const Cf = {
    REQUESTING: "requesting",
    READY: "ready",
    UNAVAILABLE: "unavailable"
  }, { REQUESTING: Ot, READY: vn, UNAVAILABLE: as } = Cf, Of = "CREATE", Tf = "FIND", Rf = "REQUEST", Mf = "DOC_READY", jf = "AWAIT_NETWORK", Df = "NETWORK_READY", Tt = "UPDATE", Uf = "DELETE", $f = "DOC_UNAVAILABLE";
  class Bf extends ot {
    constructor() {
      super(...arguments);
      __privateAdd(this, _Bf_instances);
      __privateAdd(this, _t3, /* @__PURE__ */ new Map());
      __privateAdd(this, _e3, /* @__PURE__ */ new Set());
      __privateAdd(this, _n3, /* @__PURE__ */ new Map());
      __privateAdd(this, _r3, /* @__PURE__ */ new Set());
      __privateAdd(this, _s3, /* @__PURE__ */ new Map());
      __privateAdd(this, _o2, Me("automerge-repo:remote-heads-subscriptions"));
    }
    subscribeToRemotes(e) {
      __privateGet(this, _o2).call(this, "subscribeToRemotes", e);
      const n = [];
      for (const r of e) __privateGet(this, _e3).has(r) || (__privateGet(this, _e3).add(r), n.push(r));
      n.length > 0 && this.emit("change-remote-subs", {
        add: n,
        peers: Array.from(__privateGet(this, _r3))
      });
    }
    unsubscribeFromRemotes(e) {
      __privateGet(this, _o2).call(this, "subscribeToRemotes", e);
      const n = [];
      for (const r of e) __privateGet(this, _e3).has(r) && (__privateGet(this, _e3).delete(r), __privateGet(this, _n3).has(r) || n.push(r));
      n.length > 0 && this.emit("change-remote-subs", {
        remove: n,
        peers: Array.from(__privateGet(this, _r3))
      });
    }
    handleControlMessage(e) {
      const n = [], r = [], s = [];
      if (__privateGet(this, _o2).call(this, "handleControlMessage", e), e.add) for (const o of e.add) {
        let i = __privateGet(this, _n3).get(o);
        (__privateGet(this, _e3).has(o) || i) && s.push(o), i || (i = /* @__PURE__ */ new Set(), __privateGet(this, _n3).set(o, i), __privateGet(this, _e3).has(o) || n.push(o)), i.add(e.senderId);
      }
      if (e.remove) for (const o of e.remove) {
        const i = __privateGet(this, _n3).get(o);
        i && (i.delete(e.senderId), i.size == 0 && !__privateGet(this, _e3).has(o) && r.push(o));
      }
      (n.length > 0 || r.length > 0) && this.emit("change-remote-subs", {
        peers: Array.from(__privateGet(this, _r3)),
        add: n,
        remove: r
      });
      for (const o of s) {
        const i = __privateGet(this, _s3).get(e.senderId);
        if (i) for (const a of i) {
          const c = __privateGet(this, _t3).get(a);
          if (!c) continue;
          const u = c.get(o);
          u && this.emit("notify-remote-heads", {
            targetId: e.senderId,
            documentId: a,
            heads: u.heads,
            timestamp: u.timestamp,
            storageId: o
          });
        }
      }
    }
    handleRemoteHeads(e) {
      __privateGet(this, _o2).call(this, "handleRemoteHeads", e);
      const n = __privateMethod(this, _Bf_instances, i_fn2).call(this, e);
      for (const r of n) __privateGet(this, _e3).has(r.storageId) && this.emit("remote-heads-changed", r);
      for (const r of n) for (const s of __privateGet(this, _r3)) s !== e.senderId && this.emit("notify-remote-heads", {
        targetId: s,
        documentId: r.documentId,
        heads: r.remoteHeads,
        timestamp: r.timestamp,
        storageId: r.storageId
      });
      for (const r of n) {
        const s = __privateGet(this, _n3).get(r.storageId);
        if (s) for (const o of s) __privateMethod(this, _Bf_instances, a_fn).call(this, o, r.documentId) && this.emit("notify-remote-heads", {
          targetId: o,
          documentId: r.documentId,
          heads: r.remoteHeads,
          timestamp: r.timestamp,
          storageId: r.storageId
        });
      }
    }
    handleImmediateRemoteHeadsChanged(e, n, r) {
      __privateGet(this, _o2).call(this, "handleLocalHeadsChanged", e, n, r);
      const s = __privateGet(this, _t3).get(e), o = Date.now();
      if (!s) __privateGet(this, _t3).set(e, /* @__PURE__ */ new Map([
        [
          n,
          {
            heads: r,
            timestamp: o
          }
        ]
      ]));
      else {
        const a = s.get(n);
        (!a || a.timestamp < Date.now()) && s.set(n, {
          heads: r,
          timestamp: Date.now()
        });
      }
      const i = __privateGet(this, _n3).get(n);
      if (i) for (const a of i) __privateMethod(this, _Bf_instances, a_fn).call(this, a, e) && this.emit("notify-remote-heads", {
        targetId: a,
        documentId: e,
        heads: r,
        timestamp: o,
        storageId: n
      });
    }
    addGenerousPeer(e) {
      __privateGet(this, _o2).call(this, "addGenerousPeer", e), __privateGet(this, _r3).add(e), __privateGet(this, _e3).size > 0 && this.emit("change-remote-subs", {
        add: Array.from(__privateGet(this, _e3)),
        peers: [
          e
        ]
      });
      for (const [n, r] of __privateGet(this, _t3)) for (const [s, { heads: o, timestamp: i }] of r) this.emit("notify-remote-heads", {
        targetId: e,
        documentId: n,
        heads: o,
        timestamp: i,
        storageId: s
      });
    }
    removePeer(e) {
      __privateGet(this, _o2).call(this, "removePeer", e);
      const n = [];
      __privateGet(this, _r3).delete(e), __privateGet(this, _s3).delete(e);
      for (const [r, s] of __privateGet(this, _n3)) s.has(e) && (s.delete(e), s.size == 0 && (n.push(r), __privateGet(this, _n3).delete(r)));
      n.length > 0 && this.emit("change-remote-subs", {
        remove: n,
        peers: Array.from(__privateGet(this, _r3))
      });
    }
    subscribePeerToDoc(e, n) {
      let r = __privateGet(this, _s3).get(e);
      r || (r = /* @__PURE__ */ new Set(), __privateGet(this, _s3).set(e, r)), r.add(n);
      const s = __privateGet(this, _t3).get(n);
      if (s) for (const [o, i] of s) {
        const a = __privateGet(this, _n3).get(o);
        a && a.has(e) && this.emit("notify-remote-heads", {
          targetId: e,
          documentId: n,
          heads: i.heads,
          timestamp: i.timestamp,
          storageId: o
        });
      }
    }
  }
  _t3 = new WeakMap();
  _e3 = new WeakMap();
  _n3 = new WeakMap();
  _r3 = new WeakMap();
  _s3 = new WeakMap();
  _o2 = new WeakMap();
  _Bf_instances = new WeakSet();
  a_fn = function(e, n) {
    const r = __privateGet(this, _s3).get(e);
    return r && r.has(n);
  };
  i_fn2 = function(e) {
    const n = [], { documentId: r, newHeads: s } = e;
    for (const [o, { heads: i, timestamp: a }] of Object.entries(s)) {
      if (!__privateGet(this, _e3).has(o) && !__privateGet(this, _n3).has(o)) continue;
      let c = __privateGet(this, _t3).get(r);
      c || (c = /* @__PURE__ */ new Map(), __privateGet(this, _t3).set(r, c));
      const u = c.get(o);
      u && u.timestamp >= a || (c.set(o, {
        timestamp: a,
        heads: i
      }), n.push({
        documentId: r,
        storageId: o,
        remoteHeads: i,
        timestamp: a
      }));
    }
    return n;
  };
  const Wn = (t, e) => {
    let n = Date.now(), r, s;
    return function(...o) {
      r = n + e - Date.now(), clearTimeout(s), s = setTimeout(() => {
        t(...o), n = Date.now();
      }, r);
    };
  }, Pf = (t) => Hf(t) || co(t) || ao(t) || Ff(t) || Lf(t) || zf(t), Ff = (t) => t.type === "doc-unavailable", ao = (t) => t.type === "request", Hf = (t) => t.type === "sync", co = (t) => t.type === "ephemeral", Lf = (t) => t.type === "remote-subscription-change", zf = (t) => t.type === "remote-heads-changed", Nf = (t) => `${t.senderId}:${t.sessionId}`;
  class Vf extends ot {
    constructor(e, n = Wf(), r) {
      super();
      __publicField(this, "peerId");
      __publicField(this, "peerMetadata");
      __privateAdd(this, _t4);
      __privateAdd(this, _e4, {});
      __privateAdd(this, _n4, 0);
      __privateAdd(this, _r4, Math.random().toString(36).slice(2));
      __privateAdd(this, _s4, {});
      __privateAdd(this, _o3, 0);
      __privateAdd(this, _a2, []);
      __publicField(this, "isReady", () => __privateGet(this, _o3) === __privateGet(this, _a2).length);
      __publicField(this, "whenReady", async () => {
        if (!this.isReady()) return new Promise((e) => {
          this.once("ready", () => {
            e();
          });
        });
      });
      this.peerId = n, this.peerMetadata = r, __privateSet(this, _t4, Me(`automerge-repo:network:${this.peerId}`)), e.forEach((s) => this.addNetworkAdapter(s));
    }
    addNetworkAdapter(e) {
      __privateGet(this, _a2).push(e), e.once("ready", () => {
        __privateWrapper(this, _o3)._++, __privateGet(this, _t4).call(this, "Adapters ready: ", __privateGet(this, _o3), "/", __privateGet(this, _a2).length), __privateGet(this, _o3) === __privateGet(this, _a2).length && this.emit("ready");
      }), e.on("peer-candidate", ({ peerId: n, peerMetadata: r }) => {
        __privateGet(this, _t4).call(this, `peer candidate: ${n} `), __privateGet(this, _e4)[n] || (__privateGet(this, _e4)[n] = e), this.emit("peer", {
          peerId: n,
          peerMetadata: r
        });
      }), e.on("peer-disconnected", ({ peerId: n }) => {
        __privateGet(this, _t4).call(this, `peer disconnected: ${n} `), delete __privateGet(this, _e4)[n], this.emit("peer-disconnected", {
          peerId: n
        });
      }), e.on("message", (n) => {
        if (!Pf(n)) {
          __privateGet(this, _t4).call(this, `invalid message: ${JSON.stringify(n)}`);
          return;
        }
        if (__privateGet(this, _t4).call(this, `message from ${n.senderId}`), co(n)) {
          const r = Nf(n);
          (__privateGet(this, _s4)[r] === void 0 || n.count > __privateGet(this, _s4)[r]) && (__privateGet(this, _s4)[r] = n.count, this.emit("message", n));
          return;
        }
        this.emit("message", n);
      }), e.on("close", () => {
        __privateGet(this, _t4).call(this, "adapter closed"), Object.entries(__privateGet(this, _e4)).forEach(([n, r]) => {
          r === e && delete __privateGet(this, _e4)[n];
        });
      }), this.peerMetadata.then((n) => {
        e.connect(this.peerId, n);
      }).catch((n) => {
        __privateGet(this, _t4).call(this, "error connecting to network", n);
      });
    }
    send(e) {
      const n = __privateGet(this, _e4)[e.targetId];
      if (!n) {
        __privateGet(this, _t4).call(this, `Tried to send message but peer not found: ${e.targetId}`);
        return;
      }
      const s = ((o) => o.type === "ephemeral" ? "count" in o ? o : {
        ...o,
        count: ++__privateWrapper(this, _n4)._,
        sessionId: __privateGet(this, _r4),
        senderId: this.peerId
      } : {
        ...o,
        senderId: this.peerId
      })(e);
      __privateGet(this, _t4).call(this, "sending message %o", s), n.send(s);
    }
  }
  _t4 = new WeakMap();
  _e4 = new WeakMap();
  _n4 = new WeakMap();
  _r4 = new WeakMap();
  _s4 = new WeakMap();
  _o3 = new WeakMap();
  _a2 = new WeakMap();
  function Wf() {
    return `user-${Math.round(Math.random() * 1e5)}`;
  }
  function uo(t) {
    let e = 0;
    t.forEach((s) => {
      e += s.length;
    });
    const n = new Uint8Array(e);
    let r = 0;
    return t.forEach((s) => {
      n.set(s, r), r += s.length;
    }), n;
  }
  var Bt = {
    exports: {}
  }, qf = Bt.exports, cs;
  function Kf() {
    return cs || (cs = 1, function(t) {
      (function(e, n) {
        var r = {};
        n(r);
        var s = r.default;
        for (var o in r) s[o] = r[o];
        t.exports = s;
      })(qf, function(e) {
        e.__esModule = true, e.digestLength = 32, e.blockSize = 64;
        var n = new Uint32Array([
          1116352408,
          1899447441,
          3049323471,
          3921009573,
          961987163,
          1508970993,
          2453635748,
          2870763221,
          3624381080,
          310598401,
          607225278,
          1426881987,
          1925078388,
          2162078206,
          2614888103,
          3248222580,
          3835390401,
          4022224774,
          264347078,
          604807628,
          770255983,
          1249150122,
          1555081692,
          1996064986,
          2554220882,
          2821834349,
          2952996808,
          3210313671,
          3336571891,
          3584528711,
          113926993,
          338241895,
          666307205,
          773529912,
          1294757372,
          1396182291,
          1695183700,
          1986661051,
          2177026350,
          2456956037,
          2730485921,
          2820302411,
          3259730800,
          3345764771,
          3516065817,
          3600352804,
          4094571909,
          275423344,
          430227734,
          506948616,
          659060556,
          883997877,
          958139571,
          1322822218,
          1537002063,
          1747873779,
          1955562222,
          2024104815,
          2227730452,
          2361852424,
          2428436474,
          2756734187,
          3204031479,
          3329325298
        ]);
        function r(d, h, g, v, x) {
          for (var R, M, k, z, $, F, Y, L, J, G, I, B, y; x >= 64; ) {
            for (R = h[0], M = h[1], k = h[2], z = h[3], $ = h[4], F = h[5], Y = h[6], L = h[7], G = 0; G < 16; G++) I = v + G * 4, d[G] = (g[I] & 255) << 24 | (g[I + 1] & 255) << 16 | (g[I + 2] & 255) << 8 | g[I + 3] & 255;
            for (G = 16; G < 64; G++) J = d[G - 2], B = (J >>> 17 | J << 15) ^ (J >>> 19 | J << 13) ^ J >>> 10, J = d[G - 15], y = (J >>> 7 | J << 25) ^ (J >>> 18 | J << 14) ^ J >>> 3, d[G] = (B + d[G - 7] | 0) + (y + d[G - 16] | 0);
            for (G = 0; G < 64; G++) B = ((($ >>> 6 | $ << 26) ^ ($ >>> 11 | $ << 21) ^ ($ >>> 25 | $ << 7)) + ($ & F ^ ~$ & Y) | 0) + (L + (n[G] + d[G] | 0) | 0) | 0, y = ((R >>> 2 | R << 30) ^ (R >>> 13 | R << 19) ^ (R >>> 22 | R << 10)) + (R & M ^ R & k ^ M & k) | 0, L = Y, Y = F, F = $, $ = z + B | 0, z = k, k = M, M = R, R = B + y | 0;
            h[0] += R, h[1] += M, h[2] += k, h[3] += z, h[4] += $, h[5] += F, h[6] += Y, h[7] += L, v += 64, x -= 64;
          }
          return v;
        }
        var s = function() {
          function d() {
            this.digestLength = e.digestLength, this.blockSize = e.blockSize, this.state = new Int32Array(8), this.temp = new Int32Array(64), this.buffer = new Uint8Array(128), this.bufferLength = 0, this.bytesHashed = 0, this.finished = false, this.reset();
          }
          return d.prototype.reset = function() {
            return this.state[0] = 1779033703, this.state[1] = 3144134277, this.state[2] = 1013904242, this.state[3] = 2773480762, this.state[4] = 1359893119, this.state[5] = 2600822924, this.state[6] = 528734635, this.state[7] = 1541459225, this.bufferLength = 0, this.bytesHashed = 0, this.finished = false, this;
          }, d.prototype.clean = function() {
            for (var h = 0; h < this.buffer.length; h++) this.buffer[h] = 0;
            for (var h = 0; h < this.temp.length; h++) this.temp[h] = 0;
            this.reset();
          }, d.prototype.update = function(h, g) {
            if (g === void 0 && (g = h.length), this.finished) throw new Error("SHA256: can't update because hash was finished.");
            var v = 0;
            if (this.bytesHashed += g, this.bufferLength > 0) {
              for (; this.bufferLength < 64 && g > 0; ) this.buffer[this.bufferLength++] = h[v++], g--;
              this.bufferLength === 64 && (r(this.temp, this.state, this.buffer, 0, 64), this.bufferLength = 0);
            }
            for (g >= 64 && (v = r(this.temp, this.state, h, v, g), g %= 64); g > 0; ) this.buffer[this.bufferLength++] = h[v++], g--;
            return this;
          }, d.prototype.finish = function(h) {
            if (!this.finished) {
              var g = this.bytesHashed, v = this.bufferLength, x = g / 536870912 | 0, R = g << 3, M = g % 64 < 56 ? 64 : 128;
              this.buffer[v] = 128;
              for (var k = v + 1; k < M - 8; k++) this.buffer[k] = 0;
              this.buffer[M - 8] = x >>> 24 & 255, this.buffer[M - 7] = x >>> 16 & 255, this.buffer[M - 6] = x >>> 8 & 255, this.buffer[M - 5] = x >>> 0 & 255, this.buffer[M - 4] = R >>> 24 & 255, this.buffer[M - 3] = R >>> 16 & 255, this.buffer[M - 2] = R >>> 8 & 255, this.buffer[M - 1] = R >>> 0 & 255, r(this.temp, this.state, this.buffer, 0, M), this.finished = true;
            }
            for (var k = 0; k < 8; k++) h[k * 4 + 0] = this.state[k] >>> 24 & 255, h[k * 4 + 1] = this.state[k] >>> 16 & 255, h[k * 4 + 2] = this.state[k] >>> 8 & 255, h[k * 4 + 3] = this.state[k] >>> 0 & 255;
            return this;
          }, d.prototype.digest = function() {
            var h = new Uint8Array(this.digestLength);
            return this.finish(h), h;
          }, d.prototype._saveState = function(h) {
            for (var g = 0; g < this.state.length; g++) h[g] = this.state[g];
          }, d.prototype._restoreState = function(h, g) {
            for (var v = 0; v < this.state.length; v++) this.state[v] = h[v];
            this.bytesHashed = g, this.finished = false, this.bufferLength = 0;
          }, d;
        }();
        e.Hash = s;
        var o = function() {
          function d(h) {
            this.inner = new s(), this.outer = new s(), this.blockSize = this.inner.blockSize, this.digestLength = this.inner.digestLength;
            var g = new Uint8Array(this.blockSize);
            if (h.length > this.blockSize) new s().update(h).finish(g).clean();
            else for (var v = 0; v < h.length; v++) g[v] = h[v];
            for (var v = 0; v < g.length; v++) g[v] ^= 54;
            this.inner.update(g);
            for (var v = 0; v < g.length; v++) g[v] ^= 106;
            this.outer.update(g), this.istate = new Uint32Array(8), this.ostate = new Uint32Array(8), this.inner._saveState(this.istate), this.outer._saveState(this.ostate);
            for (var v = 0; v < g.length; v++) g[v] = 0;
          }
          return d.prototype.reset = function() {
            return this.inner._restoreState(this.istate, this.inner.blockSize), this.outer._restoreState(this.ostate, this.outer.blockSize), this;
          }, d.prototype.clean = function() {
            for (var h = 0; h < this.istate.length; h++) this.ostate[h] = this.istate[h] = 0;
            this.inner.clean(), this.outer.clean();
          }, d.prototype.update = function(h) {
            return this.inner.update(h), this;
          }, d.prototype.finish = function(h) {
            return this.outer.finished ? this.outer.finish(h) : (this.inner.finish(h), this.outer.update(h, this.digestLength).finish(h)), this;
          }, d.prototype.digest = function() {
            var h = new Uint8Array(this.digestLength);
            return this.finish(h), h;
          }, d;
        }();
        e.HMAC = o;
        function i(d) {
          var h = new s().update(d), g = h.digest();
          return h.clean(), g;
        }
        e.hash = i, e.default = i;
        function a(d, h) {
          var g = new o(d).update(h), v = g.digest();
          return g.clean(), v;
        }
        e.hmac = a;
        function c(d, h, g, v) {
          var x = v[0];
          if (x === 0) throw new Error("hkdf: cannot expand more");
          h.reset(), x > 1 && h.update(d), g && h.update(g), h.update(v), h.finish(d), v[0]++;
        }
        var u = new Uint8Array(e.digestLength);
        function f(d, h, g, v) {
          h === void 0 && (h = u), v === void 0 && (v = 32);
          for (var x = new Uint8Array([
            1
          ]), R = a(h, d), M = new o(R), k = new Uint8Array(M.digestLength), z = k.length, $ = new Uint8Array(v), F = 0; F < v; F++) z === k.length && (c(k, M, g, x), z = 0), $[F] = k[z++];
          return M.clean(), k.fill(0), x.fill(0), $;
        }
        e.hkdf = f;
        function l(d, h, g, v) {
          for (var x = new o(d), R = x.digestLength, M = new Uint8Array(4), k = new Uint8Array(R), z = new Uint8Array(R), $ = new Uint8Array(v), F = 0; F * R < v; F++) {
            var Y = F + 1;
            M[0] = Y >>> 24 & 255, M[1] = Y >>> 16 & 255, M[2] = Y >>> 8 & 255, M[3] = Y >>> 0 & 255, x.reset(), x.update(h), x.update(M), x.finish(z);
            for (var L = 0; L < R; L++) k[L] = z[L];
            for (var L = 2; L <= g; L++) {
              x.reset(), x.update(z).finish(z);
              for (var J = 0; J < R; J++) k[J] ^= z[J];
            }
            for (var L = 0; L < R && F * R + L < v; L++) $[F * R + L] = k[L];
          }
          for (var F = 0; F < R; F++) k[F] = z[F] = 0;
          for (var F = 0; F < 4; F++) M[F] = 0;
          return x.clean(), $;
        }
        e.pbkdf2 = l;
      });
    }(Bt)), Bt.exports;
  }
  var Jf = Kf();
  function fo(t) {
    const e = Jf.hash(t);
    return Yf(e);
  }
  function Gf(t) {
    const e = new TextEncoder(), n = uo(t.map((r) => e.encode(r)));
    return fo(n);
  }
  function Yf(t) {
    return Array.from(t, (e) => e.toString(16).padStart(2, "0")).join("");
  }
  function Xf(t) {
    if (t.length < 2) return null;
    const e = t[t.length - 2];
    return e === "snapshot" || e === "incremental" ? e : null;
  }
  class Zf {
    constructor(e) {
      __privateAdd(this, _Zf_instances);
      __privateAdd(this, _t5);
      __privateAdd(this, _e5, /* @__PURE__ */ new Map());
      __privateAdd(this, _n5, /* @__PURE__ */ new Map());
      __privateAdd(this, _r5, false);
      __privateAdd(this, _s5, Me("automerge-repo:storage-subsystem"));
      __privateSet(this, _t5, e);
    }
    async id() {
      const e = await __privateGet(this, _t5).load([
        "storage-adapter-id"
      ]);
      let n;
      return e ? n = new TextDecoder().decode(e) : (n = bs(), await __privateGet(this, _t5).save([
        "storage-adapter-id"
      ], new TextEncoder().encode(n))), n;
    }
    async load(e, n) {
      const r = [
        e,
        n
      ];
      return await __privateGet(this, _t5).load(r);
    }
    async save(e, n, r) {
      const s = [
        e,
        n
      ];
      await __privateGet(this, _t5).save(s, r);
    }
    async remove(e, n) {
      const r = [
        e,
        n
      ];
      await __privateGet(this, _t5).remove(r);
    }
    async loadDoc(e) {
      const n = await __privateGet(this, _t5).loadRange([
        e
      ]), r = [], s = [];
      for (const a of n) {
        if (a.data === void 0) continue;
        const c = Xf(a.key);
        c != null && (s.push({
          key: a.key,
          type: c,
          size: a.data.length
        }), r.push(a.data));
      }
      __privateGet(this, _n5).set(e, s);
      const o = uo(r);
      if (o.length === 0) return null;
      const i = xs(Qt(), o);
      return __privateGet(this, _e5).set(e, me(i)), i;
    }
    async saveDoc(e, n) {
      if (!__privateMethod(this, _Zf_instances, i_fn3).call(this, e, n)) return;
      const r = __privateGet(this, _n5).get(e) ?? [];
      __privateMethod(this, _Zf_instances, c_fn2).call(this, r) ? await __privateMethod(this, _Zf_instances, a_fn2).call(this, e, n, r) : await __privateMethod(this, _Zf_instances, o_fn).call(this, e, n), __privateGet(this, _e5).set(e, me(n));
    }
    async removeDoc(e) {
      await __privateGet(this, _t5).removeRange([
        e,
        "snapshot"
      ]), await __privateGet(this, _t5).removeRange([
        e,
        "incremental"
      ]), await __privateGet(this, _t5).removeRange([
        e,
        "sync-state"
      ]);
    }
    async loadSyncState(e, n) {
      const r = [
        e,
        "sync-state",
        n
      ], s = await __privateGet(this, _t5).load(r);
      return s ? As(s) : void 0;
    }
    async saveSyncState(e, n, r) {
      const s = [
        e,
        "sync-state",
        n
      ];
      await __privateGet(this, _t5).save(s, ks(r));
    }
  }
  _t5 = new WeakMap();
  _e5 = new WeakMap();
  _n5 = new WeakMap();
  _r5 = new WeakMap();
  _s5 = new WeakMap();
  _Zf_instances = new WeakSet();
  o_fn = async function(e, n) {
    const r = Oc(n, __privateGet(this, _e5).get(e) ?? []);
    if (r && r.length > 0) {
      const s = [
        e,
        "incremental",
        fo(r)
      ];
      __privateGet(this, _s5).call(this, `Saving incremental ${s} for document ${e}`), await __privateGet(this, _t5).save(s, r), __privateGet(this, _n5).has(e) || __privateGet(this, _n5).set(e, []), __privateGet(this, _n5).get(e).push({
        key: s,
        type: "incremental",
        size: r.length
      }), __privateGet(this, _e5).set(e, me(n));
    } else return Promise.resolve();
  };
  a_fn2 = async function(e, n, r) {
    var _a5;
    __privateSet(this, _r5, true);
    const s = Ss(n), o = Gf(me(n)), i = [
      e,
      "snapshot",
      o
    ], a = new Set(r.map((u) => u.key).filter((u) => u[2] !== o));
    __privateGet(this, _s5).call(this, `Saving snapshot ${i} for document ${e}`), __privateGet(this, _s5).call(this, `deleting old chunks ${Array.from(a)}`), await __privateGet(this, _t5).save(i, s);
    for (const u of a) await __privateGet(this, _t5).remove(u);
    const c = ((_a5 = __privateGet(this, _n5).get(e)) == null ? void 0 : _a5.filter((u) => !a.has(u.key))) ?? [];
    c.push({
      key: i,
      type: "snapshot",
      size: s.length
    }), __privateGet(this, _n5).set(e, c), __privateSet(this, _r5, false);
  };
  i_fn3 = function(e, n) {
    const r = __privateGet(this, _e5).get(e);
    if (!r) return true;
    const s = me(n);
    return !pr(s, r);
  };
  c_fn2 = function(e) {
    if (__privateGet(this, _r5)) return false;
    let n = 0, r = 0;
    for (const s of e) s.type === "snapshot" ? n += s.size : r += s.size;
    return n < 1024 || r >= n;
  };
  class lo extends ot {
  }
  class Qf extends lo {
    constructor({ handle: e, onLoadSyncState: n }) {
      super();
      __privateAdd(this, _Qf_instances);
      __privateAdd(this, _t6);
      __publicField(this, "syncDebounceRate", 100);
      __privateAdd(this, _e6, []);
      __privateAdd(this, _n6, {});
      __privateAdd(this, _r6, {});
      __privateAdd(this, _s6, {});
      __privateAdd(this, _o4, []);
      __privateAdd(this, _a3, false);
      __privateAdd(this, _i2);
      __privateAdd(this, _c2);
      __privateSet(this, _i2, e), __privateSet(this, _c2, n ?? (() => Promise.resolve(void 0)));
      const r = e.documentId.slice(0, 5);
      __privateSet(this, _t6, Me(`automerge-repo:docsync:${r}`)), e.on("change", Wn(() => __privateMethod(this, _Qf_instances, g_fn).call(this), this.syncDebounceRate)), e.on("ephemeral-message-outbound", (s) => __privateMethod(this, _Qf_instances, p_fn).call(this, s)), (async () => (await e.doc([
        vn,
        Ot
      ]), __privateMethod(this, _Qf_instances, __fn).call(this)))();
    }
    get peerStates() {
      return __privateGet(this, _r6);
    }
    get documentId() {
      return __privateGet(this, _i2).documentId;
    }
    hasPeer(e) {
      return __privateGet(this, _e6).includes(e);
    }
    beginSync(e) {
      const n = e.every((s) => __privateGet(this, _r6)[s] in [
        "unavailable",
        "wants"
      ]), r = __privateGet(this, _i2).doc([
        vn,
        Ot,
        as
      ]).then((s) => {
        if (__privateSet(this, _a3, true), __privateMethod(this, _Qf_instances, u_fn).call(this), !(s === void 0 && n)) return s ?? Qt();
      });
      __privateGet(this, _t6).call(this, `beginSync: ${e.join(", ")}`), e.forEach((s) => {
        __privateMethod(this, _Qf_instances, f_fn).call(this, s, (o) => {
          const i = As(ks(o));
          __privateMethod(this, _Qf_instances, l_fn).call(this, s, i), r.then((a) => {
            a && __privateMethod(this, _Qf_instances, d_fn).call(this, s, a);
          }).catch((a) => {
            __privateGet(this, _t6).call(this, `Error loading doc for ${s}: ${a}`);
          });
        });
      });
    }
    endSync(e) {
      __privateGet(this, _t6).call(this, `removing peer ${e}`), __privateSet(this, _e6, __privateGet(this, _e6).filter((n) => n !== e));
    }
    receiveMessage(e) {
      switch (e.type) {
        case "sync":
        case "request":
          this.receiveSyncMessage(e);
          break;
        case "ephemeral":
          this.receiveEphemeralMessage(e);
          break;
        case "doc-unavailable":
          __privateGet(this, _r6)[e.senderId] = "unavailable", __privateMethod(this, _Qf_instances, u_fn).call(this);
          break;
        default:
          throw new Error(`unknown message type: ${e}`);
      }
    }
    receiveEphemeralMessage(e) {
      if (e.documentId !== __privateGet(this, _i2).documentId) throw new Error("channelId doesn't match documentId");
      const { senderId: n, data: r } = e, s = no(new Uint8Array(r));
      __privateGet(this, _i2).emit("ephemeral-message", {
        handle: __privateGet(this, _i2),
        senderId: n,
        message: s
      }), __privateGet(this, _e6).forEach((o) => {
        o !== n && this.emit("message", {
          ...e,
          targetId: o
        });
      });
    }
    receiveSyncMessage(e) {
      if (e.documentId !== __privateGet(this, _i2).documentId) throw new Error("channelId doesn't match documentId");
      if (!__privateGet(this, _i2).inState([
        vn,
        Ot,
        as
      ])) {
        __privateGet(this, _o4).push({
          message: e,
          received: /* @__PURE__ */ new Date()
        });
        return;
      }
      __privateMethod(this, _Qf_instances, __fn).call(this), __privateMethod(this, _Qf_instances, h_fn).call(this, e);
    }
  }
  _t6 = new WeakMap();
  _e6 = new WeakMap();
  _n6 = new WeakMap();
  _r6 = new WeakMap();
  _s6 = new WeakMap();
  _o4 = new WeakMap();
  _a3 = new WeakMap();
  _i2 = new WeakMap();
  _c2 = new WeakMap();
  _Qf_instances = new WeakSet();
  g_fn = async function() {
    __privateGet(this, _t6).call(this, "syncWithPeers");
    const e = await __privateGet(this, _i2).doc();
    e !== void 0 && __privateGet(this, _e6).forEach((n) => __privateMethod(this, _Qf_instances, d_fn).call(this, n, e));
  };
  p_fn = async function({ data: e }) {
    __privateGet(this, _t6).call(this, "broadcastToPeers", __privateGet(this, _e6)), __privateGet(this, _e6).forEach((n) => __privateMethod(this, _Qf_instances, y_fn).call(this, n, e));
  };
  y_fn = function(e, n) {
    __privateGet(this, _t6).call(this, `sendEphemeralMessage ->${e}`);
    const r = {
      type: "ephemeral",
      targetId: e,
      documentId: __privateGet(this, _i2).documentId,
      data: n
    };
    this.emit("message", r);
  };
  f_fn = function(e, n) {
    __privateMethod(this, _Qf_instances, b_fn).call(this, e), e in __privateGet(this, _r6) || (__privateGet(this, _r6)[e] = "unknown");
    const r = __privateGet(this, _s6)[e];
    if (r) {
      n(r);
      return;
    }
    let s = __privateGet(this, _n6)[e];
    s || (__privateGet(this, _c2).call(this, e).then((o) => {
      __privateMethod(this, _Qf_instances, m_fn).call(this, e, o ?? Ic());
    }).catch((o) => {
      __privateGet(this, _t6).call(this, `Error loading sync state for ${e}: ${o}`);
    }), s = __privateGet(this, _n6)[e] = []), s.push(n);
  };
  b_fn = function(e) {
    __privateGet(this, _e6).includes(e) || (__privateGet(this, _e6).push(e), this.emit("open-doc", {
      documentId: this.documentId,
      peerId: e
    }));
  };
  m_fn = function(e, n) {
    const r = __privateGet(this, _n6)[e];
    if (r) for (const s of r) s(n);
    delete __privateGet(this, _n6)[e], __privateGet(this, _s6)[e] = n;
  };
  l_fn = function(e, n) {
    __privateGet(this, _s6)[e] = n, this.emit("sync-state", {
      peerId: e,
      syncState: n,
      documentId: __privateGet(this, _i2).documentId
    });
  };
  d_fn = function(e, n) {
    __privateGet(this, _t6).call(this, `sendSyncMessage ->${e}`), __privateMethod(this, _Qf_instances, f_fn).call(this, e, (r) => {
      const [s, o] = Ac(n, r);
      if (o) {
        __privateMethod(this, _Qf_instances, l_fn).call(this, e, s);
        const i = me(n).length === 0;
        !__privateGet(this, _i2).isReady() && i && s.sharedHeads.length === 0 && !Object.values(__privateGet(this, _r6)).includes("has") && __privateGet(this, _r6)[e] === "unknown" ? this.emit("message", {
          type: "request",
          targetId: e,
          documentId: __privateGet(this, _i2).documentId,
          data: o
        }) : this.emit("message", {
          type: "sync",
          targetId: e,
          data: o,
          documentId: __privateGet(this, _i2).documentId
        }), i || (__privateGet(this, _r6)[e] = "has");
      }
    });
  };
  h_fn = function(e) {
    ao(e) && (__privateGet(this, _r6)[e.senderId] = "wants"), __privateMethod(this, _Qf_instances, u_fn).call(this), Cc(e.data).heads.length > 0 && (__privateGet(this, _r6)[e.senderId] = "has"), __privateMethod(this, _Qf_instances, f_fn).call(this, e.senderId, (n) => {
      __privateGet(this, _i2).update((r) => {
        const [s, o] = Ec(r, n, e.data);
        return __privateMethod(this, _Qf_instances, l_fn).call(this, e.senderId, o), __privateMethod(this, _Qf_instances, d_fn).call(this, e.senderId, r), s;
      }), __privateMethod(this, _Qf_instances, u_fn).call(this);
    });
  };
  u_fn = function() {
    __privateGet(this, _a3) && __privateGet(this, _i2).inState([
      Ot
    ]) && __privateGet(this, _e6).every((e) => __privateGet(this, _r6)[e] === "unavailable" || __privateGet(this, _r6)[e] === "wants") && (__privateGet(this, _e6).filter((e) => __privateGet(this, _r6)[e] === "wants").forEach((e) => {
      const n = {
        type: "doc-unavailable",
        documentId: __privateGet(this, _i2).documentId,
        targetId: e
      };
      this.emit("message", n);
    }), __privateGet(this, _i2).unavailable());
  };
  __fn = function() {
    for (const e of __privateGet(this, _o4)) __privateMethod(this, _Qf_instances, h_fn).call(this, e.message);
    __privateSet(this, _o4, []);
  };
  const xn = Me("automerge-repo:collectionsync");
  class el extends lo {
    constructor(e) {
      super();
      __privateAdd(this, _el_instances);
      __publicField(this, "repo");
      __privateAdd(this, _t7, /* @__PURE__ */ new Set());
      __privateAdd(this, _e7, {});
      __privateAdd(this, _n7, {});
      this.repo = e;
    }
    async receiveMessage(e) {
      xn(`onSyncMessage: ${e.senderId}, ${e.documentId}, ${"data" in e ? e.data.byteLength + "bytes" : ""}`);
      const n = e.documentId;
      if (!n) throw new Error("received a message with an invalid documentId");
      __privateGet(this, _n7)[n] = true;
      const r = __privateMethod(this, _el_instances, r_fn).call(this, n);
      r.receiveMessage(e);
      const s = await __privateMethod(this, _el_instances, o_fn2).call(this, n);
      r.beginSync(s.filter((o) => !r.hasPeer(o)));
    }
    addDocument(e) {
      if (__privateGet(this, _n7)[e]) return;
      const n = __privateMethod(this, _el_instances, r_fn).call(this, e);
      __privateMethod(this, _el_instances, o_fn2).call(this, e).then((r) => {
        n.beginSync(r);
      });
    }
    removeDocument(e) {
      throw new Error("not implemented");
    }
    addPeer(e) {
      if (xn(`adding ${e} & synchronizing with them`), !__privateGet(this, _t7).has(e)) {
        __privateGet(this, _t7).add(e);
        for (const n of Object.values(__privateGet(this, _e7))) {
          const { documentId: r } = n;
          this.repo.sharePolicy(e, r).then((s) => {
            s && n.beginSync([
              e
            ]);
          });
        }
      }
    }
    removePeer(e) {
      xn(`removing peer ${e}`), __privateGet(this, _t7).delete(e);
      for (const n of Object.values(__privateGet(this, _e7))) n.endSync(e);
    }
    get peers() {
      return Array.from(__privateGet(this, _t7));
    }
  }
  _t7 = new WeakMap();
  _e7 = new WeakMap();
  _n7 = new WeakMap();
  _el_instances = new WeakSet();
  r_fn = function(e) {
    if (!__privateGet(this, _e7)[e]) {
      const n = this.repo.find(lr({
        documentId: e
      }));
      __privateGet(this, _e7)[e] = __privateMethod(this, _el_instances, s_fn).call(this, n);
    }
    return __privateGet(this, _e7)[e];
  };
  s_fn = function(e) {
    const n = new Qf({
      handle: e,
      onLoadSyncState: async (r) => {
        if (!this.repo.storageSubsystem) return;
        const { storageId: s, isEphemeral: o } = this.repo.peerMetadataByPeerId[r] || {};
        if (!(!s || o)) return this.repo.storageSubsystem.loadSyncState(e.documentId, s);
      }
    });
    return n.on("message", (r) => this.emit("message", r)), n.on("open-doc", (r) => this.emit("open-doc", r)), n.on("sync-state", (r) => this.emit("sync-state", r)), n;
  };
  o_fn2 = async function(e) {
    const n = Array.from(__privateGet(this, _t7)), r = [];
    for (const s of n) await this.repo.sharePolicy(s, e) && r.push(s);
    return r;
  };
  class tl extends ot {
    constructor({ storage: e, network: n = [], peerId: r, sharePolicy: s, isEphemeral: o = e === void 0, enableRemoteHeadsGossiping: i = false } = {}) {
      super();
      __privateAdd(this, _tl_instances);
      __privateAdd(this, _t8);
      __publicField(this, "networkSubsystem");
      __publicField(this, "storageSubsystem");
      __publicField(this, "saveDebounceRate", 100);
      __privateAdd(this, _e8, {});
      __privateAdd(this, _n8);
      __publicField(this, "sharePolicy", async () => true);
      __publicField(this, "peerMetadataByPeerId", {});
      __privateAdd(this, _r7, new Bf());
      __privateAdd(this, _s7, false);
      __privateAdd(this, _a4, {});
      __publicField(this, "subscribeToRemotes", (e) => {
        __privateGet(this, _s7) ? (__privateGet(this, _t8).call(this, "subscribeToRemotes", {
          remotes: e
        }), __privateGet(this, _r7).subscribeToRemotes(e)) : __privateGet(this, _t8).call(this, "WARN: subscribeToRemotes called but remote heads gossiping is not enabled");
      });
      __publicField(this, "storageId", async () => {
        if (this.storageSubsystem) return this.storageSubsystem.id();
      });
      __privateSet(this, _s7, i), __privateSet(this, _t8, Me("automerge-repo:repo")), this.sharePolicy = s ?? this.sharePolicy, this.on("document", async ({ handle: f, isNew: l }) => {
        if (a) {
          const d = ({ handle: h, doc: g }) => {
            a.saveDoc(h.documentId, g);
          };
          if (f.on("heads-changed", Wn(d, this.saveDebounceRate)), l) await a.saveDoc(f.documentId, f.docSync());
          else {
            const h = await a.loadDoc(f.documentId);
            h && f.update(() => h);
          }
        }
        f.on("unavailable", () => {
          __privateGet(this, _t8).call(this, "document unavailable", {
            documentId: f.documentId
          }), this.emit("unavailable-document", {
            documentId: f.documentId
          });
        }), this.networkSubsystem.isReady() ? f.request() : (f.awaitNetwork(), this.networkSubsystem.whenReady().then(() => {
          f.networkReady();
        }).catch((d) => {
          __privateGet(this, _t8).call(this, "error waiting for network", {
            err: d
          });
        })), __privateGet(this, _n8).addDocument(f.documentId);
      }), this.on("delete-document", ({ documentId: f }) => {
        a && a.removeDoc(f).catch((l) => {
          __privateGet(this, _t8).call(this, "error deleting document", {
            documentId: f,
            err: l
          });
        });
      }), __privateSet(this, _n8, new el(this)), __privateGet(this, _n8).on("message", (f) => {
        __privateGet(this, _t8).call(this, `sending ${f.type} message to ${f.targetId}`), u.send(f);
      }), __privateGet(this, _s7) && __privateGet(this, _n8).on("open-doc", ({ peerId: f, documentId: l }) => {
        __privateGet(this, _r7).subscribePeerToDoc(f, l);
      });
      const a = e ? new Zf(e) : void 0;
      this.storageSubsystem = a;
      const c = (async () => ({
        storageId: await (a == null ? void 0 : a.id()),
        isEphemeral: o
      }))(), u = new Vf(n, r, c);
      this.networkSubsystem = u, u.on("peer", async ({ peerId: f, peerMetadata: l }) => {
        __privateGet(this, _t8).call(this, "peer connected", {
          peerId: f
        }), l && (this.peerMetadataByPeerId[f] = {
          ...l
        }), this.sharePolicy(f).then((d) => {
          d && __privateGet(this, _s7) && __privateGet(this, _r7).addGenerousPeer(f);
        }).catch((d) => {
          console.log("error in share policy", {
            err: d
          });
        }), __privateGet(this, _n8).addPeer(f);
      }), u.on("peer-disconnected", ({ peerId: f }) => {
        __privateGet(this, _n8).removePeer(f), __privateGet(this, _r7).removePeer(f);
      }), u.on("message", async (f) => {
        __privateMethod(this, _tl_instances, o_fn3).call(this, f);
      }), __privateGet(this, _n8).on("sync-state", (f) => {
        __privateMethod(this, _tl_instances, i_fn4).call(this, f);
        const l = __privateGet(this, _e8)[f.documentId], { storageId: d } = this.peerMetadataByPeerId[f.peerId] || {};
        if (!d) return;
        const h = l.getRemoteHeads(d);
        f.syncState.theirHeads && (!h || !pr(h, f.syncState.theirHeads)) && f.syncState.theirHeads && (l.setRemoteHeads(d, f.syncState.theirHeads), d && __privateGet(this, _s7) && __privateGet(this, _r7).handleImmediateRemoteHeadsChanged(f.documentId, d, f.syncState.theirHeads));
      }), __privateGet(this, _s7) && (__privateGet(this, _r7).on("notify-remote-heads", (f) => {
        this.networkSubsystem.send({
          type: "remote-heads-changed",
          targetId: f.targetId,
          documentId: f.documentId,
          newHeads: {
            [f.storageId]: {
              heads: f.heads,
              timestamp: f.timestamp
            }
          }
        });
      }), __privateGet(this, _r7).on("change-remote-subs", (f) => {
        __privateGet(this, _t8).call(this, "change-remote-subs", f);
        for (const l of f.peers) this.networkSubsystem.send({
          type: "remote-subscription-change",
          targetId: l,
          add: f.add,
          remove: f.remove
        });
      }), __privateGet(this, _r7).on("remote-heads-changed", (f) => {
        __privateGet(this, _e8)[f.documentId].setRemoteHeads(f.storageId, f.remoteHeads);
      }));
    }
    get handles() {
      return __privateGet(this, _e8);
    }
    get peers() {
      return __privateGet(this, _n8).peers;
    }
    getStorageIdOfPeer(e) {
      var _a5;
      return (_a5 = this.peerMetadataByPeerId[e]) == null ? void 0 : _a5.storageId;
    }
    create(e) {
      const { documentId: n } = fr(nf()), r = __privateMethod(this, _tl_instances, c_fn3).call(this, {
        documentId: n,
        isNew: true,
        initialValue: e
      });
      return this.emit("document", {
        handle: r,
        isNew: true
      }), r;
    }
    clone(e) {
      if (!e.isReady()) throw new Error(`Cloned handle is not yet in ready state.
        (Try await handle.waitForReady() first.)`);
      const n = e.docSync();
      if (!n) throw new Error("Cloned handle doesn't have a document.");
      const r = this.create();
      return r.update(() => Ir(n)), r;
    }
    find(e) {
      const n = pn(e);
      if (__privateGet(this, _e8)[n]) return __privateGet(this, _e8)[n].isUnavailable() && setTimeout(() => {
        __privateGet(this, _e8)[n].emit("unavailable", {
          handle: __privateGet(this, _e8)[n]
        });
      }), __privateGet(this, _e8)[n];
      const r = __privateMethod(this, _tl_instances, c_fn3).call(this, {
        documentId: n,
        isNew: false
      });
      return this.emit("document", {
        handle: r,
        isNew: false
      }), r;
    }
    delete(e) {
      const n = pn(e);
      __privateMethod(this, _tl_instances, c_fn3).call(this, {
        documentId: n,
        isNew: false
      }).delete(), delete __privateGet(this, _e8)[n], this.emit("delete-document", {
        documentId: n
      });
    }
    async export(e) {
      const n = pn(e), s = await __privateMethod(this, _tl_instances, c_fn3).call(this, {
        documentId: n,
        isNew: false
      }).doc();
      if (s) return Ss(s);
    }
    import(e) {
      const n = Rc(e), r = this.create();
      return r.update(() => Ir(n)), r;
    }
    async flush(e) {
      if (!this.storageSubsystem) return;
      const n = e ? e.map((r) => __privateGet(this, _e8)[r]) : Object.values(__privateGet(this, _e8));
      await Promise.all(n.map(async (r) => {
        const s = r.docSync();
        if (s) return this.storageSubsystem.saveDoc(r.documentId, s);
      }));
    }
  }
  _t8 = new WeakMap();
  _e8 = new WeakMap();
  _n8 = new WeakMap();
  _r7 = new WeakMap();
  _s7 = new WeakMap();
  _tl_instances = new WeakSet();
  o_fn3 = function(e) {
    switch (e.type) {
      case "remote-subscription-change":
        __privateGet(this, _s7) && __privateGet(this, _r7).handleControlMessage(e);
        break;
      case "remote-heads-changed":
        __privateGet(this, _s7) && __privateGet(this, _r7).handleRemoteHeads(e);
        break;
      case "sync":
      case "request":
      case "ephemeral":
      case "doc-unavailable":
        __privateGet(this, _n8).receiveMessage(e).catch((n) => {
          console.log("error receiving message", {
            err: n
          });
        });
    }
  };
  _a4 = new WeakMap();
  i_fn4 = function(e) {
    if (!this.storageSubsystem) return;
    const { storageId: n, isEphemeral: r } = this.peerMetadataByPeerId[e.peerId] || {};
    if (!n || r) return;
    let s = __privateGet(this, _a4)[n];
    s || (s = __privateGet(this, _a4)[n] = Wn(({ documentId: o, syncState: i }) => {
      this.storageSubsystem.saveSyncState(o, n, i);
    }, this.saveDebounceRate)), s(e);
  };
  c_fn3 = function({ documentId: e, isNew: n, initialValue: r }) {
    if (__privateGet(this, _e8)[e]) return __privateGet(this, _e8)[e];
    if (!e) throw new Error(`Invalid documentId ${e}`);
    const s = new If(e, {
      isNew: n,
      initialValue: r
    });
    return __privateGet(this, _e8)[e] = s, s;
  };
  class nl extends ot {
    constructor() {
      super(...arguments);
      __publicField(this, "peerId");
      __publicField(this, "peerMetadata");
    }
  }
  const rl = "" + new URL("../assets/automerge_wasm_bg.BEjDkhWo.wasm", import.meta.url).href, sl = async (t = {}, e) => {
    let n;
    if (e.startsWith("data:")) {
      const r = e.replace(/^data:.*?base64,/, "");
      let s;
      if (typeof Buffer == "function" && typeof Buffer.from == "function") s = Buffer.from(r, "base64");
      else if (typeof atob == "function") {
        const o = atob(r);
        s = new Uint8Array(o.length);
        for (let i = 0; i < o.length; i++) s[i] = o.charCodeAt(i);
      } else throw new Error("Cannot decode base64-encoded data URL");
      n = await WebAssembly.instantiate(s, t);
    } else {
      const r = await fetch(e), s = r.headers.get("Content-Type") || "";
      if ("instantiateStreaming" in WebAssembly && s.startsWith("application/wasm")) n = await WebAssembly.instantiateStreaming(r, t);
      else {
        const o = await r.arrayBuffer();
        n = await WebAssembly.instantiate(o, t);
      }
    }
    return n.instance.exports;
  };
  let _;
  function ho(t) {
    _ = t;
  }
  const Oe = new Array(128).fill(void 0);
  Oe.push(void 0, null, true, false);
  function D(t) {
    return Oe[t];
  }
  let dt = Oe.length;
  function ol(t) {
    t < 132 || (Oe[t] = dt, dt = t);
  }
  function E(t) {
    const e = D(t);
    return ol(t), e;
  }
  let ye = 0, Rt = null;
  function Pt() {
    return (Rt === null || Rt.byteLength === 0) && (Rt = new Uint8Array(_.memory.buffer)), Rt;
  }
  const il = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
  let Ft = new il("utf-8");
  const al = typeof Ft.encodeInto == "function" ? function(t, e) {
    return Ft.encodeInto(t, e);
  } : function(t, e) {
    const n = Ft.encode(t);
    return e.set(n), {
      read: t.length,
      written: n.length
    };
  };
  function Ae(t, e, n) {
    if (n === void 0) {
      const a = Ft.encode(t), c = e(a.length, 1) >>> 0;
      return Pt().subarray(c, c + a.length).set(a), ye = a.length, c;
    }
    let r = t.length, s = e(r, 1) >>> 0;
    const o = Pt();
    let i = 0;
    for (; i < r; i++) {
      const a = t.charCodeAt(i);
      if (a > 127) break;
      o[s + i] = a;
    }
    if (i !== r) {
      i !== 0 && (t = t.slice(i)), s = n(s, r, r = i + t.length * 3, 1) >>> 0;
      const a = Pt().subarray(s + i, s + r), c = al(t, a);
      i += c.written, s = n(s, r, i, 1) >>> 0;
    }
    return ye = i, s;
  }
  function X(t) {
    return t == null;
  }
  let Mt = null;
  function b() {
    return (Mt === null || Mt.byteLength === 0) && (Mt = new Int32Array(_.memory.buffer)), Mt;
  }
  const cl = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
  let _o = new cl("utf-8", {
    ignoreBOM: true,
    fatal: true
  });
  _o.decode();
  function he(t, e) {
    return t = t >>> 0, _o.decode(Pt().subarray(t, t + e));
  }
  function w(t) {
    dt === Oe.length && Oe.push(Oe.length + 1);
    const e = dt;
    return dt = Oe[e], Oe[e] = t, e;
  }
  let jt = null;
  function Ht() {
    return (jt === null || jt.byteLength === 0) && (jt = new Float64Array(_.memory.buffer)), jt;
  }
  function qn(t) {
    const e = typeof t;
    if (e == "number" || e == "boolean" || t == null) return `${t}`;
    if (e == "string") return `"${t}"`;
    if (e == "symbol") {
      const s = t.description;
      return s == null ? "Symbol" : `Symbol(${s})`;
    }
    if (e == "function") {
      const s = t.name;
      return typeof s == "string" && s.length > 0 ? `Function(${s})` : "Function";
    }
    if (Array.isArray(t)) {
      const s = t.length;
      let o = "[";
      s > 0 && (o += qn(t[0]));
      for (let i = 1; i < s; i++) o += ", " + qn(t[i]);
      return o += "]", o;
    }
    const n = /\[object ([^\]]+)\]/.exec(toString.call(t));
    let r;
    if (n.length > 1) r = n[1];
    else return toString.call(t);
    if (r == "Object") try {
      return "Object(" + JSON.stringify(t) + ")";
    } catch {
      return "Object";
    }
    return t instanceof Error ? `${t.name}: ${t.message}
${t.stack}` : r;
  }
  function He(t, e) {
    if (!(t instanceof e)) throw new Error(`expected instance of ${e.name}`);
    return t.ptr;
  }
  function ul(t) {
    try {
      const s = _.__wbindgen_add_to_stack_pointer(-16);
      _.create(s, w(t));
      var e = b()[s / 4 + 0], n = b()[s / 4 + 1], r = b()[s / 4 + 2];
      if (r) throw E(n);
      return Se.__wrap(e);
    } finally {
      _.__wbindgen_add_to_stack_pointer(16);
    }
  }
  function fl(t, e) {
    try {
      const o = _.__wbindgen_add_to_stack_pointer(-16);
      _.load(o, w(t), w(e));
      var n = b()[o / 4 + 0], r = b()[o / 4 + 1], s = b()[o / 4 + 2];
      if (s) throw E(r);
      return Se.__wrap(n);
    } finally {
      _.__wbindgen_add_to_stack_pointer(16);
    }
  }
  function ll(t) {
    try {
      const s = _.__wbindgen_add_to_stack_pointer(-16);
      _.encodeChange(s, w(t));
      var e = b()[s / 4 + 0], n = b()[s / 4 + 1], r = b()[s / 4 + 2];
      if (r) throw E(n);
      return E(e);
    } finally {
      _.__wbindgen_add_to_stack_pointer(16);
    }
  }
  function dl(t) {
    try {
      const s = _.__wbindgen_add_to_stack_pointer(-16);
      _.decodeChange(s, w(t));
      var e = b()[s / 4 + 0], n = b()[s / 4 + 1], r = b()[s / 4 + 2];
      if (r) throw E(n);
      return E(e);
    } finally {
      _.__wbindgen_add_to_stack_pointer(16);
    }
  }
  function hl() {
    const t = _.initSyncState();
    return be.__wrap(t);
  }
  function _l(t) {
    try {
      const s = _.__wbindgen_add_to_stack_pointer(-16);
      _.importSyncState(s, w(t));
      var e = b()[s / 4 + 0], n = b()[s / 4 + 1], r = b()[s / 4 + 2];
      if (r) throw E(n);
      return be.__wrap(e);
    } finally {
      _.__wbindgen_add_to_stack_pointer(16);
    }
  }
  function gl(t) {
    He(t, be);
    const e = _.exportSyncState(t.__wbg_ptr);
    return E(e);
  }
  function pl(t) {
    try {
      const s = _.__wbindgen_add_to_stack_pointer(-16);
      _.encodeSyncMessage(s, w(t));
      var e = b()[s / 4 + 0], n = b()[s / 4 + 1], r = b()[s / 4 + 2];
      if (r) throw E(n);
      return E(e);
    } finally {
      _.__wbindgen_add_to_stack_pointer(16);
    }
  }
  function yl(t) {
    try {
      const s = _.__wbindgen_add_to_stack_pointer(-16);
      _.decodeSyncMessage(s, w(t));
      var e = b()[s / 4 + 0], n = b()[s / 4 + 1], r = b()[s / 4 + 2];
      if (r) throw E(n);
      return E(e);
    } finally {
      _.__wbindgen_add_to_stack_pointer(16);
    }
  }
  function bl(t) {
    He(t, be);
    const e = _.encodeSyncState(t.__wbg_ptr);
    return E(e);
  }
  function ml(t) {
    try {
      const s = _.__wbindgen_add_to_stack_pointer(-16);
      _.decodeSyncState(s, w(t));
      var e = b()[s / 4 + 0], n = b()[s / 4 + 1], r = b()[s / 4 + 2];
      if (r) throw E(n);
      return be.__wrap(e);
    } finally {
      _.__wbindgen_add_to_stack_pointer(16);
    }
  }
  function ce(t, e) {
    try {
      return t.apply(this, e);
    } catch (n) {
      _.__wbindgen_exn_store(w(n));
    }
  }
  const wl = Object.freeze({
    Array: 0,
    0: "Array",
    String: 1,
    1: "String"
  }), us = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((t) => _.__wbg_automerge_free(t >>> 0));
  class Se {
    static __wrap(e) {
      e = e >>> 0;
      const n = Object.create(Se.prototype);
      return n.__wbg_ptr = e, us.register(n, n.__wbg_ptr, n), n;
    }
    __destroy_into_raw() {
      const e = this.__wbg_ptr;
      return this.__wbg_ptr = 0, us.unregister(this), e;
    }
    free() {
      const e = this.__destroy_into_raw();
      _.__wbg_automerge_free(e);
    }
    static new(e, n) {
      try {
        const c = _.__wbindgen_add_to_stack_pointer(-16);
        var r = X(e) ? 0 : Ae(e, _.__wbindgen_malloc, _.__wbindgen_realloc), s = ye;
        _.automerge_new(c, r, s, n);
        var o = b()[c / 4 + 0], i = b()[c / 4 + 1], a = b()[c / 4 + 2];
        if (a) throw E(i);
        return Se.__wrap(o);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    clone(e) {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16);
        var n = X(e) ? 0 : Ae(e, _.__wbindgen_malloc, _.__wbindgen_realloc), r = ye;
        _.automerge_clone(a, this.__wbg_ptr, n, r);
        var s = b()[a / 4 + 0], o = b()[a / 4 + 1], i = b()[a / 4 + 2];
        if (i) throw E(o);
        return Se.__wrap(s);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    fork(e, n) {
      try {
        const c = _.__wbindgen_add_to_stack_pointer(-16);
        var r = X(e) ? 0 : Ae(e, _.__wbindgen_malloc, _.__wbindgen_realloc), s = ye;
        _.automerge_fork(c, this.__wbg_ptr, r, s, w(n));
        var o = b()[c / 4 + 0], i = b()[c / 4 + 1], a = b()[c / 4 + 2];
        if (a) throw E(i);
        return Se.__wrap(o);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    pendingOps() {
      const e = _.automerge_pendingOps(this.__wbg_ptr);
      return E(e);
    }
    commit(e, n) {
      var r = X(e) ? 0 : Ae(e, _.__wbindgen_malloc, _.__wbindgen_realloc), s = ye;
      const o = _.automerge_commit(this.__wbg_ptr, r, s, !X(n), X(n) ? 0 : n);
      return E(o);
    }
    merge(e) {
      try {
        const o = _.__wbindgen_add_to_stack_pointer(-16);
        He(e, Se), _.automerge_merge(o, this.__wbg_ptr, e.__wbg_ptr);
        var n = b()[o / 4 + 0], r = b()[o / 4 + 1], s = b()[o / 4 + 2];
        if (s) throw E(r);
        return E(n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    rollback() {
      return _.automerge_rollback(this.__wbg_ptr);
    }
    keys(e, n) {
      try {
        const i = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_keys(i, this.__wbg_ptr, w(e), X(n) ? 0 : w(n));
        var r = b()[i / 4 + 0], s = b()[i / 4 + 1], o = b()[i / 4 + 2];
        if (o) throw E(s);
        return E(r);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    text(e, n) {
      let r, s;
      try {
        const l = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_text(l, this.__wbg_ptr, w(e), X(n) ? 0 : w(n));
        var o = b()[l / 4 + 0], i = b()[l / 4 + 1], a = b()[l / 4 + 2], c = b()[l / 4 + 3], u = o, f = i;
        if (c) throw u = 0, f = 0, E(a);
        return r = u, s = f, he(u, f);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(r, s, 1);
      }
    }
    spans(e, n) {
      try {
        const i = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_spans(i, this.__wbg_ptr, w(e), X(n) ? 0 : w(n));
        var r = b()[i / 4 + 0], s = b()[i / 4 + 1], o = b()[i / 4 + 2];
        if (o) throw E(s);
        return E(r);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    splice(e, n, r, s) {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_splice(a, this.__wbg_ptr, w(e), n, r, w(s));
        var o = b()[a / 4 + 0], i = b()[a / 4 + 1];
        if (i) throw E(o);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    updateText(e, n) {
      try {
        const o = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_updateText(o, this.__wbg_ptr, w(e), w(n));
        var r = b()[o / 4 + 0], s = b()[o / 4 + 1];
        if (s) throw E(r);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    updateSpans(e, n) {
      try {
        const o = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_updateSpans(o, this.__wbg_ptr, w(e), w(n));
        var r = b()[o / 4 + 0], s = b()[o / 4 + 1];
        if (s) throw E(r);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    push(e, n, r) {
      try {
        const i = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_push(i, this.__wbg_ptr, w(e), w(n), w(r));
        var s = b()[i / 4 + 0], o = b()[i / 4 + 1];
        if (o) throw E(s);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    pushObject(e, n) {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_pushObject(a, this.__wbg_ptr, w(e), w(n));
        var r = b()[a / 4 + 0], s = b()[a / 4 + 1], o = b()[a / 4 + 2], i = b()[a / 4 + 3];
        if (i) throw E(o);
        let c;
        return r !== 0 && (c = he(r, s).slice(), _.__wbindgen_free(r, s * 1, 1)), c;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    insert(e, n, r, s) {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_insert(a, this.__wbg_ptr, w(e), n, w(r), w(s));
        var o = b()[a / 4 + 0], i = b()[a / 4 + 1];
        if (i) throw E(o);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    splitBlock(e, n, r) {
      try {
        const i = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_splitBlock(i, this.__wbg_ptr, w(e), n, w(r));
        var s = b()[i / 4 + 0], o = b()[i / 4 + 1];
        if (o) throw E(s);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    joinBlock(e, n) {
      try {
        const o = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_joinBlock(o, this.__wbg_ptr, w(e), n);
        var r = b()[o / 4 + 0], s = b()[o / 4 + 1];
        if (s) throw E(r);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    updateBlock(e, n, r) {
      try {
        const i = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_updateBlock(i, this.__wbg_ptr, w(e), n, w(r));
        var s = b()[i / 4 + 0], o = b()[i / 4 + 1];
        if (o) throw E(s);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    getBlock(e, n, r) {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_getBlock(a, this.__wbg_ptr, w(e), n, X(r) ? 0 : w(r));
        var s = b()[a / 4 + 0], o = b()[a / 4 + 1], i = b()[a / 4 + 2];
        if (i) throw E(o);
        return E(s);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    insertObject(e, n, r) {
      try {
        const c = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_insertObject(c, this.__wbg_ptr, w(e), n, w(r));
        var s = b()[c / 4 + 0], o = b()[c / 4 + 1], i = b()[c / 4 + 2], a = b()[c / 4 + 3];
        if (a) throw E(i);
        let u;
        return s !== 0 && (u = he(s, o).slice(), _.__wbindgen_free(s, o * 1, 1)), u;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    put(e, n, r, s) {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_put(a, this.__wbg_ptr, w(e), w(n), w(r), w(s));
        var o = b()[a / 4 + 0], i = b()[a / 4 + 1];
        if (i) throw E(o);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    putObject(e, n, r) {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_putObject(a, this.__wbg_ptr, w(e), w(n), w(r));
        var s = b()[a / 4 + 0], o = b()[a / 4 + 1], i = b()[a / 4 + 2];
        if (i) throw E(o);
        return E(s);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    increment(e, n, r) {
      try {
        const i = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_increment(i, this.__wbg_ptr, w(e), w(n), w(r));
        var s = b()[i / 4 + 0], o = b()[i / 4 + 1];
        if (o) throw E(s);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get(e, n, r) {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_get(a, this.__wbg_ptr, w(e), w(n), X(r) ? 0 : w(r));
        var s = b()[a / 4 + 0], o = b()[a / 4 + 1], i = b()[a / 4 + 2];
        if (i) throw E(o);
        return E(s);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    getWithType(e, n, r) {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_getWithType(a, this.__wbg_ptr, w(e), w(n), X(r) ? 0 : w(r));
        var s = b()[a / 4 + 0], o = b()[a / 4 + 1], i = b()[a / 4 + 2];
        if (i) throw E(o);
        return E(s);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    objInfo(e, n) {
      try {
        const i = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_objInfo(i, this.__wbg_ptr, w(e), X(n) ? 0 : w(n));
        var r = b()[i / 4 + 0], s = b()[i / 4 + 1], o = b()[i / 4 + 2];
        if (o) throw E(s);
        return E(r);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    getAll(e, n, r) {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_getAll(a, this.__wbg_ptr, w(e), w(n), X(r) ? 0 : w(r));
        var s = b()[a / 4 + 0], o = b()[a / 4 + 1], i = b()[a / 4 + 2];
        if (i) throw E(o);
        return E(s);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    enableFreeze(e) {
      try {
        const o = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_enableFreeze(o, this.__wbg_ptr, w(e));
        var n = b()[o / 4 + 0], r = b()[o / 4 + 1], s = b()[o / 4 + 2];
        if (s) throw E(r);
        return E(n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    registerDatatype(e, n, r) {
      try {
        const i = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_registerDatatype(i, this.__wbg_ptr, w(e), w(n), w(r));
        var s = b()[i / 4 + 0], o = b()[i / 4 + 1];
        if (o) throw E(s);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    applyPatches(e, n) {
      try {
        const i = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_applyPatches(i, this.__wbg_ptr, w(e), w(n));
        var r = b()[i / 4 + 0], s = b()[i / 4 + 1], o = b()[i / 4 + 2];
        if (o) throw E(s);
        return E(r);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    applyAndReturnPatches(e, n) {
      try {
        const i = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_applyAndReturnPatches(i, this.__wbg_ptr, w(e), w(n));
        var r = b()[i / 4 + 0], s = b()[i / 4 + 1], o = b()[i / 4 + 2];
        if (o) throw E(s);
        return E(r);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    diffIncremental() {
      try {
        const s = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_diffIncremental(s, this.__wbg_ptr);
        var e = b()[s / 4 + 0], n = b()[s / 4 + 1], r = b()[s / 4 + 2];
        if (r) throw E(n);
        return E(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    updateDiffCursor() {
      _.automerge_updateDiffCursor(this.__wbg_ptr);
    }
    resetDiffCursor() {
      _.automerge_resetDiffCursor(this.__wbg_ptr);
    }
    diff(e, n) {
      try {
        const i = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_diff(i, this.__wbg_ptr, w(e), w(n));
        var r = b()[i / 4 + 0], s = b()[i / 4 + 1], o = b()[i / 4 + 2];
        if (o) throw E(s);
        return E(r);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    isolate(e) {
      try {
        const s = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_isolate(s, this.__wbg_ptr, w(e));
        var n = b()[s / 4 + 0], r = b()[s / 4 + 1];
        if (r) throw E(n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    integrate() {
      _.automerge_integrate(this.__wbg_ptr);
    }
    length(e, n) {
      try {
        const i = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_length(i, this.__wbg_ptr, w(e), X(n) ? 0 : w(n));
        var r = Ht()[i / 8 + 0], s = b()[i / 4 + 2], o = b()[i / 4 + 3];
        if (o) throw E(s);
        return r;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    delete(e, n) {
      try {
        const o = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_delete(o, this.__wbg_ptr, w(e), w(n));
        var r = b()[o / 4 + 0], s = b()[o / 4 + 1];
        if (s) throw E(r);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    save() {
      const e = _.automerge_save(this.__wbg_ptr);
      return E(e);
    }
    saveIncremental() {
      const e = _.automerge_saveIncremental(this.__wbg_ptr);
      return E(e);
    }
    saveSince(e) {
      try {
        const o = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_saveSince(o, this.__wbg_ptr, w(e));
        var n = b()[o / 4 + 0], r = b()[o / 4 + 1], s = b()[o / 4 + 2];
        if (s) throw E(r);
        return E(n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    saveNoCompress() {
      const e = _.automerge_saveNoCompress(this.__wbg_ptr);
      return E(e);
    }
    saveAndVerify() {
      try {
        const s = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_saveAndVerify(s, this.__wbg_ptr);
        var e = b()[s / 4 + 0], n = b()[s / 4 + 1], r = b()[s / 4 + 2];
        if (r) throw E(n);
        return E(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    loadIncremental(e) {
      try {
        const o = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_loadIncremental(o, this.__wbg_ptr, w(e));
        var n = Ht()[o / 8 + 0], r = b()[o / 4 + 2], s = b()[o / 4 + 3];
        if (s) throw E(r);
        return n;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    applyChanges(e) {
      try {
        const s = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_applyChanges(s, this.__wbg_ptr, w(e));
        var n = b()[s / 4 + 0], r = b()[s / 4 + 1];
        if (r) throw E(n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    getChanges(e) {
      try {
        const o = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_getChanges(o, this.__wbg_ptr, w(e));
        var n = b()[o / 4 + 0], r = b()[o / 4 + 1], s = b()[o / 4 + 2];
        if (s) throw E(r);
        return E(n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    getChangeByHash(e) {
      try {
        const o = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_getChangeByHash(o, this.__wbg_ptr, w(e));
        var n = b()[o / 4 + 0], r = b()[o / 4 + 1], s = b()[o / 4 + 2];
        if (s) throw E(r);
        return E(n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    getDecodedChangeByHash(e) {
      try {
        const o = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_getDecodedChangeByHash(o, this.__wbg_ptr, w(e));
        var n = b()[o / 4 + 0], r = b()[o / 4 + 1], s = b()[o / 4 + 2];
        if (s) throw E(r);
        return E(n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    getChangesAdded(e) {
      He(e, Se);
      const n = _.automerge_getChangesAdded(this.__wbg_ptr, e.__wbg_ptr);
      return E(n);
    }
    getHeads() {
      const e = _.automerge_getHeads(this.__wbg_ptr);
      return E(e);
    }
    getActorId() {
      let e, n;
      try {
        const o = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_getActorId(o, this.__wbg_ptr);
        var r = b()[o / 4 + 0], s = b()[o / 4 + 1];
        return e = r, n = s, he(r, s);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(e, n, 1);
      }
    }
    getLastLocalChange() {
      const e = _.automerge_getLastLocalChange(this.__wbg_ptr);
      return E(e);
    }
    dump() {
      _.automerge_dump(this.__wbg_ptr);
    }
    getMissingDeps(e) {
      try {
        const o = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_getMissingDeps(o, this.__wbg_ptr, X(e) ? 0 : w(e));
        var n = b()[o / 4 + 0], r = b()[o / 4 + 1], s = b()[o / 4 + 2];
        if (s) throw E(r);
        return E(n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    receiveSyncMessage(e, n) {
      try {
        const o = _.__wbindgen_add_to_stack_pointer(-16);
        He(e, be), _.automerge_receiveSyncMessage(o, this.__wbg_ptr, e.__wbg_ptr, w(n));
        var r = b()[o / 4 + 0], s = b()[o / 4 + 1];
        if (s) throw E(r);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    generateSyncMessage(e) {
      He(e, be);
      const n = _.automerge_generateSyncMessage(this.__wbg_ptr, e.__wbg_ptr);
      return E(n);
    }
    toJS(e) {
      try {
        const o = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_toJS(o, this.__wbg_ptr, w(e));
        var n = b()[o / 4 + 0], r = b()[o / 4 + 1], s = b()[o / 4 + 2];
        if (s) throw E(r);
        return E(n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    materialize(e, n, r) {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_materialize(a, this.__wbg_ptr, w(e), X(n) ? 0 : w(n), w(r));
        var s = b()[a / 4 + 0], o = b()[a / 4 + 1], i = b()[a / 4 + 2];
        if (i) throw E(o);
        return E(s);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    getCursor(e, n, r) {
      let s, o;
      try {
        const d = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_getCursor(d, this.__wbg_ptr, w(e), n, X(r) ? 0 : w(r));
        var i = b()[d / 4 + 0], a = b()[d / 4 + 1], c = b()[d / 4 + 2], u = b()[d / 4 + 3], f = i, l = a;
        if (u) throw f = 0, l = 0, E(c);
        return s = f, o = l, he(f, l);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_free(s, o, 1);
      }
    }
    getCursorPosition(e, n, r) {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_getCursorPosition(a, this.__wbg_ptr, w(e), w(n), X(r) ? 0 : w(r));
        var s = Ht()[a / 8 + 0], o = b()[a / 4 + 2], i = b()[a / 4 + 3];
        if (i) throw E(o);
        return s;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    emptyChange(e, n) {
      var r = X(e) ? 0 : Ae(e, _.__wbindgen_malloc, _.__wbindgen_realloc), s = ye;
      const o = _.automerge_emptyChange(this.__wbg_ptr, r, s, !X(n), X(n) ? 0 : n);
      return E(o);
    }
    mark(e, n, r, s, o) {
      try {
        const c = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_mark(c, this.__wbg_ptr, w(e), w(n), w(r), w(s), w(o));
        var i = b()[c / 4 + 0], a = b()[c / 4 + 1];
        if (a) throw E(i);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    unmark(e, n, r) {
      try {
        const i = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_unmark(i, this.__wbg_ptr, w(e), w(n), w(r));
        var s = b()[i / 4 + 0], o = b()[i / 4 + 1];
        if (o) throw E(s);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    marks(e, n) {
      try {
        const i = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_marks(i, this.__wbg_ptr, w(e), X(n) ? 0 : w(n));
        var r = b()[i / 4 + 0], s = b()[i / 4 + 1], o = b()[i / 4 + 2];
        if (o) throw E(s);
        return E(r);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    marksAt(e, n, r) {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16);
        _.automerge_marksAt(a, this.__wbg_ptr, w(e), n, X(r) ? 0 : w(r));
        var s = b()[a / 4 + 0], o = b()[a / 4 + 1], i = b()[a / 4 + 2];
        if (i) throw E(o);
        return E(s);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    hasOurChanges(e) {
      He(e, be);
      const n = _.automerge_hasOurChanges(this.__wbg_ptr, e.__wbg_ptr);
      return E(n);
    }
    topoHistoryTraversal() {
      const e = _.automerge_topoHistoryTraversal(this.__wbg_ptr);
      return E(e);
    }
    stats() {
      const e = _.automerge_stats(this.__wbg_ptr);
      return E(e);
    }
  }
  const fs = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((t) => _.__wbg_syncstate_free(t >>> 0));
  class be {
    static __wrap(e) {
      e = e >>> 0;
      const n = Object.create(be.prototype);
      return n.__wbg_ptr = e, fs.register(n, n.__wbg_ptr, n), n;
    }
    __destroy_into_raw() {
      const e = this.__wbg_ptr;
      return this.__wbg_ptr = 0, fs.unregister(this), e;
    }
    free() {
      const e = this.__destroy_into_raw();
      _.__wbg_syncstate_free(e);
    }
    get sharedHeads() {
      const e = _.syncstate_sharedHeads(this.__wbg_ptr);
      return E(e);
    }
    get lastSentHeads() {
      const e = _.syncstate_lastSentHeads(this.__wbg_ptr);
      return E(e);
    }
    set lastSentHeads(e) {
      try {
        const s = _.__wbindgen_add_to_stack_pointer(-16);
        _.syncstate_set_lastSentHeads(s, this.__wbg_ptr, w(e));
        var n = b()[s / 4 + 0], r = b()[s / 4 + 1];
        if (r) throw E(n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    set sentHashes(e) {
      try {
        const s = _.__wbindgen_add_to_stack_pointer(-16);
        _.syncstate_set_sentHashes(s, this.__wbg_ptr, w(e));
        var n = b()[s / 4 + 0], r = b()[s / 4 + 1];
        if (r) throw E(n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    clone() {
      const e = _.syncstate_clone(this.__wbg_ptr);
      return be.__wrap(e);
    }
  }
  function go(t) {
    E(t);
  }
  function po(t, e) {
    const n = D(e), r = typeof n == "string" ? n : void 0;
    var s = X(r) ? 0 : Ae(r, _.__wbindgen_malloc, _.__wbindgen_realloc), o = ye;
    b()[t / 4 + 1] = o, b()[t / 4 + 0] = s;
  }
  function yo(t, e) {
    const n = new Error(he(t, e));
    return w(n);
  }
  function bo(t, e) {
    const n = he(t, e);
    return w(n);
  }
  function mo(t) {
    return w(t);
  }
  function wo(t) {
    const e = D(t);
    return w(e);
  }
  function vo(t, e) {
    const n = D(e), r = typeof n == "number" ? n : void 0;
    Ht()[t / 8 + 1] = X(r) ? 0 : r, b()[t / 4 + 0] = !X(r);
  }
  function xo(t) {
    return D(t) === void 0;
  }
  function So(t) {
    const e = D(t);
    return typeof e == "boolean" ? e ? 1 : 0 : 2;
  }
  function ko(t) {
    return D(t) === null;
  }
  function Ao(t) {
    return typeof D(t) == "string";
  }
  function Eo(t) {
    return typeof D(t) == "function";
  }
  function Io(t) {
    const e = D(t);
    return typeof e == "object" && e !== null;
  }
  function Co(t) {
    return Array.isArray(D(t));
  }
  function Oo(t, e) {
    const n = D(e), r = JSON.stringify(n === void 0 ? null : n), s = Ae(r, _.__wbindgen_malloc, _.__wbindgen_realloc), o = ye;
    b()[t / 4 + 1] = o, b()[t / 4 + 0] = s;
  }
  function To() {
    const t = new Error();
    return w(t);
  }
  function Ro(t, e) {
    const n = D(e).stack, r = Ae(n, _.__wbindgen_malloc, _.__wbindgen_realloc), s = ye;
    b()[t / 4 + 1] = s, b()[t / 4 + 0] = r;
  }
  function Mo(t, e) {
    let n, r;
    try {
      n = t, r = e, console.error(he(t, e));
    } finally {
      _.__wbindgen_free(n, r, 1);
    }
  }
  function jo(t, e) {
    return D(t) == D(e);
  }
  function Do(t, e) {
    const n = String(D(e)), r = Ae(n, _.__wbindgen_malloc, _.__wbindgen_realloc), s = ye;
    b()[t / 4 + 1] = s, b()[t / 4 + 0] = r;
  }
  function Uo(t) {
    return w(t);
  }
  function $o(t) {
    const e = BigInt.asUintN(64, t);
    return w(e);
  }
  function Bo(t, e, n) {
    D(t)[E(e)] = E(n);
  }
  function Po() {
    return ce(function(t, e) {
      D(t).getRandomValues(D(e));
    }, arguments);
  }
  function Fo() {
    return ce(function(t, e) {
      D(t).randomFillSync(E(e));
    }, arguments);
  }
  function Ho(t) {
    const e = D(t).crypto;
    return w(e);
  }
  function Lo(t) {
    const e = D(t).process;
    return w(e);
  }
  function zo(t) {
    const e = D(t).versions;
    return w(e);
  }
  function No(t) {
    const e = D(t).node;
    return w(e);
  }
  function Vo() {
    return ce(function() {
      const t = module.require;
      return w(t);
    }, arguments);
  }
  function Wo(t) {
    const e = D(t).msCrypto;
    return w(e);
  }
  function qo(t) {
    console.log(D(t));
  }
  function Ko(t, e) {
    console.log(D(t), D(e));
  }
  function Jo(t, e) {
    const n = D(t)[e >>> 0];
    return w(n);
  }
  function Go(t) {
    return D(t).length;
  }
  function Yo() {
    const t = new Array();
    return w(t);
  }
  function Xo(t, e) {
    const n = new Function(he(t, e));
    return w(n);
  }
  function Zo(t) {
    const e = D(t).next;
    return w(e);
  }
  function Qo() {
    return ce(function(t) {
      const e = D(t).next();
      return w(e);
    }, arguments);
  }
  function ei(t) {
    return D(t).done;
  }
  function ti(t) {
    const e = D(t).value;
    return w(e);
  }
  function ni() {
    return w(Symbol.iterator);
  }
  function ri() {
    return ce(function(t, e) {
      const n = Reflect.get(D(t), D(e));
      return w(n);
    }, arguments);
  }
  function si() {
    return ce(function(t, e) {
      const n = D(t).call(D(e));
      return w(n);
    }, arguments);
  }
  function oi() {
    const t = new Object();
    return w(t);
  }
  function ii(t) {
    return D(t).length;
  }
  function ai(t, e, n) {
    D(t)[e >>> 0] = E(n);
  }
  function ci(t) {
    const e = Array.from(D(t));
    return w(e);
  }
  function ui(t) {
    return Array.isArray(D(t));
  }
  function fi(t, e) {
    return D(t).push(D(e));
  }
  function li(t, e) {
    return D(t).unshift(D(e));
  }
  function di(t) {
    let e;
    try {
      e = D(t) instanceof ArrayBuffer;
    } catch {
      e = false;
    }
    return e;
  }
  function hi(t, e) {
    const n = new Error(he(t, e));
    return w(n);
  }
  function _i() {
    return ce(function(t, e, n) {
      const r = D(t).call(D(e), D(n));
      return w(r);
    }, arguments);
  }
  function gi(t) {
    let e;
    try {
      e = D(t) instanceof Date;
    } catch {
      e = false;
    }
    return e;
  }
  function pi(t) {
    return D(t).getTime();
  }
  function yi(t) {
    const e = new Date(D(t));
    return w(e);
  }
  function bi(t) {
    let e;
    try {
      e = D(t) instanceof Object;
    } catch {
      e = false;
    }
    return e;
  }
  function mi(t, e) {
    const n = Object.assign(D(t), D(e));
    return w(n);
  }
  function wi(t, e, n) {
    const r = Object.defineProperty(D(t), D(e), D(n));
    return w(r);
  }
  function vi(t) {
    const e = Object.entries(D(t));
    return w(e);
  }
  function xi(t) {
    const e = Object.freeze(D(t));
    return w(e);
  }
  function Si(t) {
    const e = Object.keys(D(t));
    return w(e);
  }
  function ki(t) {
    const e = Object.values(D(t));
    return w(e);
  }
  function Ai(t, e) {
    const n = new RangeError(he(t, e));
    return w(n);
  }
  function Ei() {
    return ce(function(t, e, n) {
      const r = Reflect.apply(D(t), D(e), D(n));
      return w(r);
    }, arguments);
  }
  function Ii() {
    return ce(function(t, e) {
      return Reflect.deleteProperty(D(t), D(e));
    }, arguments);
  }
  function Ci() {
    return ce(function(t) {
      const e = Reflect.ownKeys(D(t));
      return w(e);
    }, arguments);
  }
  function Oi() {
    return ce(function(t, e, n) {
      return Reflect.set(D(t), D(e), D(n));
    }, arguments);
  }
  function Ti(t) {
    const e = D(t).buffer;
    return w(e);
  }
  function Ri(t, e) {
    const n = D(t).concat(D(e));
    return w(n);
  }
  function Mi(t, e, n) {
    const r = D(t).slice(e >>> 0, n >>> 0);
    return w(r);
  }
  function ji(t, e) {
    const n = Symbol.for(he(t, e));
    return w(n);
  }
  function Di(t) {
    const e = D(t).toString();
    return w(e);
  }
  function Ui() {
    return ce(function() {
      const t = self.self;
      return w(t);
    }, arguments);
  }
  function $i() {
    return ce(function() {
      const t = window.window;
      return w(t);
    }, arguments);
  }
  function Bi() {
    return ce(function() {
      const t = globalThis.globalThis;
      return w(t);
    }, arguments);
  }
  function Pi() {
    return ce(function() {
      const t = global.global;
      return w(t);
    }, arguments);
  }
  function Fi(t, e, n) {
    const r = new Uint8Array(D(t), e >>> 0, n >>> 0);
    return w(r);
  }
  function Hi(t) {
    const e = new Uint8Array(D(t));
    return w(e);
  }
  function Li(t, e, n) {
    D(t).set(D(e), n >>> 0);
  }
  function zi(t) {
    return D(t).length;
  }
  function Ni(t) {
    let e;
    try {
      e = D(t) instanceof Uint8Array;
    } catch {
      e = false;
    }
    return e;
  }
  function Vi(t) {
    const e = new Uint8Array(t >>> 0);
    return w(e);
  }
  function Wi(t, e, n) {
    const r = D(t).subarray(e >>> 0, n >>> 0);
    return w(r);
  }
  function qi(t, e) {
    const n = qn(D(e)), r = Ae(n, _.__wbindgen_malloc, _.__wbindgen_realloc), s = ye;
    b()[t / 4 + 1] = s, b()[t / 4 + 0] = r;
  }
  function Ki(t, e) {
    throw new Error(he(t, e));
  }
  function Ji() {
    const t = _.memory;
    return w(t);
  }
  URL = globalThis.URL;
  const T = await sl({
    "./automerge_wasm_bg.js": {
      __wbindgen_object_drop_ref: go,
      __wbindgen_string_get: po,
      __wbindgen_error_new: yo,
      __wbindgen_string_new: bo,
      __wbindgen_number_new: mo,
      __wbindgen_object_clone_ref: wo,
      __wbindgen_number_get: vo,
      __wbindgen_is_undefined: xo,
      __wbindgen_boolean_get: So,
      __wbindgen_is_null: ko,
      __wbindgen_is_string: Ao,
      __wbindgen_is_function: Eo,
      __wbindgen_is_object: Io,
      __wbindgen_is_array: Co,
      __wbindgen_json_serialize: Oo,
      __wbg_new_abda76e883ba8a5f: To,
      __wbg_stack_658279fe44541cf6: Ro,
      __wbg_error_f851667af71bcfc6: Mo,
      __wbindgen_jsval_loose_eq: jo,
      __wbg_String_91fba7ded13ba54c: Do,
      __wbindgen_bigint_from_i64: Uo,
      __wbindgen_bigint_from_u64: $o,
      __wbg_set_20cbc34131e76824: Bo,
      __wbg_getRandomValues_3aa56aa6edec874c: Po,
      __wbg_randomFillSync_5c9c955aa56b6049: Fo,
      __wbg_crypto_1d1f22824a6a080c: Ho,
      __wbg_process_4a72847cc503995b: Lo,
      __wbg_versions_f686565e586dd935: zo,
      __wbg_node_104a2ff8d6ea03a2: No,
      __wbg_require_cca90b1a94a0255b: Vo,
      __wbg_msCrypto_eb05e62b530a1508: Wo,
      __wbg_log_5bb5f88f245d7762: qo,
      __wbg_log_1746d5c75ec89963: Ko,
      __wbg_get_bd8e338fbd5f5cc8: Jo,
      __wbg_length_cd7af8117672b8b8: Go,
      __wbg_new_16b304a2cfa7ff4a: Yo,
      __wbg_newnoargs_e258087cd0daa0ea: Xo,
      __wbg_next_40fc327bfc8770e6: Zo,
      __wbg_next_196c84450b364254: Qo,
      __wbg_done_298b57d23c0fc80c: ei,
      __wbg_value_d93c65011f51a456: ti,
      __wbg_iterator_2cee6dadfd956dfa: ni,
      __wbg_get_e3c254076557e348: ri,
      __wbg_call_27c0f87801dedf93: si,
      __wbg_new_72fb9a18b5ae2624: oi,
      __wbg_length_dee433d4c85c9387: ii,
      __wbg_set_d4638f722068f043: ai,
      __wbg_from_89e3fc3ba5e6fb48: ci,
      __wbg_isArray_2ab64d95e09ea0ae: ui,
      __wbg_push_a5b05aedc7234f9f: fi,
      __wbg_unshift_e22df4b34bcf5070: li,
      __wbg_instanceof_ArrayBuffer_836825be07d4c9d2: di,
      __wbg_new_28c511d9baebfa89: hi,
      __wbg_call_b3ca7c6051f9bec1: _i,
      __wbg_instanceof_Date_f65cf97fb83fc369: gi,
      __wbg_getTime_2bc4375165f02d15: pi,
      __wbg_new_cf3ec55744a78578: yi,
      __wbg_instanceof_Object_71ca3c0a59266746: bi,
      __wbg_assign_496d2d14fecafbcf: mi,
      __wbg_defineProperty_cc00e2de8a0f5141: wi,
      __wbg_entries_95cc2c823b285a09: vi,
      __wbg_freeze_cc6bc19f75299986: xi,
      __wbg_keys_91e412b4b222659f: Si,
      __wbg_values_9c75e6e2bfbdb70d: ki,
      __wbg_new_dd6a5dd7b538af21: Ai,
      __wbg_apply_0a5aa603881e6d79: Ei,
      __wbg_deleteProperty_13e721a56f19e842: Ii,
      __wbg_ownKeys_658942b7f28d1fe9: Ci,
      __wbg_set_1f9b04f170055d33: Oi,
      __wbg_buffer_12d079cc21e14bdb: Ti,
      __wbg_concat_3de229fe4fe90fea: Ri,
      __wbg_slice_52fb626ffdc8da8f: Mi,
      __wbg_for_27c67e2dbdce22f6: ji,
      __wbg_toString_7df3c77999517c20: Di,
      __wbg_self_ce0dbfc45cf2f5be: Ui,
      __wbg_window_c6fb939a7f436783: $i,
      __wbg_globalThis_d1e6af4856ba331b: Bi,
      __wbg_global_207b558942527489: Pi,
      __wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb: Fi,
      __wbg_new_63b92bc8671ed464: Hi,
      __wbg_set_a47bac70306a19a7: Li,
      __wbg_length_c20a40f15020d68a: zi,
      __wbg_instanceof_Uint8Array_2b3bbecd033d19f6: Ni,
      __wbg_newwithlength_e9b4878cebadb3d3: Vi,
      __wbg_subarray_a1f73cd4b5b42fe1: Wi,
      __wbindgen_debug_string: qi,
      __wbindgen_throw: Ki,
      __wbindgen_memory: Ji
    }
  }, rl), vl = T.memory, xl = T.__wbg_syncstate_free, Sl = T.syncstate_sharedHeads, kl = T.syncstate_lastSentHeads, Al = T.syncstate_set_lastSentHeads, El = T.syncstate_set_sentHashes, Il = T.syncstate_clone, Cl = T.__wbg_automerge_free, Ol = T.automerge_new, Tl = T.automerge_clone, Rl = T.automerge_fork, Ml = T.automerge_pendingOps, jl = T.automerge_commit, Dl = T.automerge_merge, Ul = T.automerge_rollback, $l = T.automerge_keys, Bl = T.automerge_text, Pl = T.automerge_spans, Fl = T.automerge_splice, Hl = T.automerge_updateText, Ll = T.automerge_updateSpans, zl = T.automerge_push, Nl = T.automerge_pushObject, Vl = T.automerge_insert, Wl = T.automerge_splitBlock, ql = T.automerge_joinBlock, Kl = T.automerge_updateBlock, Jl = T.automerge_getBlock, Gl = T.automerge_insertObject, Yl = T.automerge_put, Xl = T.automerge_putObject, Zl = T.automerge_increment, Ql = T.automerge_get, ed = T.automerge_getWithType, td = T.automerge_objInfo, nd = T.automerge_getAll, rd = T.automerge_enableFreeze, sd = T.automerge_registerDatatype, od = T.automerge_applyPatches, id = T.automerge_applyAndReturnPatches, ad = T.automerge_diffIncremental, cd = T.automerge_updateDiffCursor, ud = T.automerge_resetDiffCursor, fd = T.automerge_diff, ld = T.automerge_isolate, dd = T.automerge_integrate, hd = T.automerge_length, _d = T.automerge_delete, gd = T.automerge_save, pd = T.automerge_saveIncremental, yd = T.automerge_saveSince, bd = T.automerge_saveNoCompress, md = T.automerge_saveAndVerify, wd = T.automerge_loadIncremental, vd = T.automerge_applyChanges, xd = T.automerge_getChanges, Sd = T.automerge_getChangeByHash, kd = T.automerge_getDecodedChangeByHash, Ad = T.automerge_getChangesAdded, Ed = T.automerge_getHeads, Id = T.automerge_getActorId, Cd = T.automerge_getLastLocalChange, Od = T.automerge_dump, Td = T.automerge_getMissingDeps, Rd = T.automerge_receiveSyncMessage, Md = T.automerge_generateSyncMessage, jd = T.automerge_toJS, Dd = T.automerge_materialize, Ud = T.automerge_getCursor, $d = T.automerge_getCursorPosition, Bd = T.automerge_emptyChange, Pd = T.automerge_mark, Fd = T.automerge_unmark, Hd = T.automerge_marks, Ld = T.automerge_marksAt, zd = T.automerge_hasOurChanges, Nd = T.automerge_topoHistoryTraversal, Vd = T.automerge_stats, Wd = T.create, qd = T.load, Kd = T.encodeChange, Jd = T.decodeChange, Gd = T.initSyncState, Yd = T.importSyncState, Xd = T.exportSyncState, Zd = T.encodeSyncMessage, Qd = T.decodeSyncMessage, eh = T.encodeSyncState, th = T.decodeSyncState, nh = T.__wbindgen_malloc, rh = T.__wbindgen_realloc, sh = T.__wbindgen_add_to_stack_pointer, oh = T.__wbindgen_free, ih = T.__wbindgen_exn_store, ah = Object.freeze(Object.defineProperty({
    __proto__: null,
    __wbg_automerge_free: Cl,
    __wbg_syncstate_free: xl,
    __wbindgen_add_to_stack_pointer: sh,
    __wbindgen_exn_store: ih,
    __wbindgen_free: oh,
    __wbindgen_malloc: nh,
    __wbindgen_realloc: rh,
    automerge_applyAndReturnPatches: id,
    automerge_applyChanges: vd,
    automerge_applyPatches: od,
    automerge_clone: Tl,
    automerge_commit: jl,
    automerge_delete: _d,
    automerge_diff: fd,
    automerge_diffIncremental: ad,
    automerge_dump: Od,
    automerge_emptyChange: Bd,
    automerge_enableFreeze: rd,
    automerge_fork: Rl,
    automerge_generateSyncMessage: Md,
    automerge_get: Ql,
    automerge_getActorId: Id,
    automerge_getAll: nd,
    automerge_getBlock: Jl,
    automerge_getChangeByHash: Sd,
    automerge_getChanges: xd,
    automerge_getChangesAdded: Ad,
    automerge_getCursor: Ud,
    automerge_getCursorPosition: $d,
    automerge_getDecodedChangeByHash: kd,
    automerge_getHeads: Ed,
    automerge_getLastLocalChange: Cd,
    automerge_getMissingDeps: Td,
    automerge_getWithType: ed,
    automerge_hasOurChanges: zd,
    automerge_increment: Zl,
    automerge_insert: Vl,
    automerge_insertObject: Gl,
    automerge_integrate: dd,
    automerge_isolate: ld,
    automerge_joinBlock: ql,
    automerge_keys: $l,
    automerge_length: hd,
    automerge_loadIncremental: wd,
    automerge_mark: Pd,
    automerge_marks: Hd,
    automerge_marksAt: Ld,
    automerge_materialize: Dd,
    automerge_merge: Dl,
    automerge_new: Ol,
    automerge_objInfo: td,
    automerge_pendingOps: Ml,
    automerge_push: zl,
    automerge_pushObject: Nl,
    automerge_put: Yl,
    automerge_putObject: Xl,
    automerge_receiveSyncMessage: Rd,
    automerge_registerDatatype: sd,
    automerge_resetDiffCursor: ud,
    automerge_rollback: Ul,
    automerge_save: gd,
    automerge_saveAndVerify: md,
    automerge_saveIncremental: pd,
    automerge_saveNoCompress: bd,
    automerge_saveSince: yd,
    automerge_spans: Pl,
    automerge_splice: Fl,
    automerge_splitBlock: Wl,
    automerge_stats: Vd,
    automerge_text: Bl,
    automerge_toJS: jd,
    automerge_topoHistoryTraversal: Nd,
    automerge_unmark: Fd,
    automerge_updateBlock: Kl,
    automerge_updateDiffCursor: cd,
    automerge_updateSpans: Ll,
    automerge_updateText: Hl,
    create: Wd,
    decodeChange: Jd,
    decodeSyncMessage: Qd,
    decodeSyncState: th,
    encodeChange: Kd,
    encodeSyncMessage: Zd,
    encodeSyncState: eh,
    exportSyncState: Xd,
    importSyncState: Yd,
    initSyncState: Gd,
    load: qd,
    memory: vl,
    syncstate_clone: Il,
    syncstate_lastSentHeads: kl,
    syncstate_set_lastSentHeads: Al,
    syncstate_set_sentHashes: El,
    syncstate_sharedHeads: Sl
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  ho(ah);
  const ch = Object.freeze(Object.defineProperty({
    __proto__: null,
    Automerge: Se,
    SyncState: be,
    TextRepresentation: wl,
    __wbg_String_91fba7ded13ba54c: Do,
    __wbg_apply_0a5aa603881e6d79: Ei,
    __wbg_assign_496d2d14fecafbcf: mi,
    __wbg_buffer_12d079cc21e14bdb: Ti,
    __wbg_call_27c0f87801dedf93: si,
    __wbg_call_b3ca7c6051f9bec1: _i,
    __wbg_concat_3de229fe4fe90fea: Ri,
    __wbg_crypto_1d1f22824a6a080c: Ho,
    __wbg_defineProperty_cc00e2de8a0f5141: wi,
    __wbg_deleteProperty_13e721a56f19e842: Ii,
    __wbg_done_298b57d23c0fc80c: ei,
    __wbg_entries_95cc2c823b285a09: vi,
    __wbg_error_f851667af71bcfc6: Mo,
    __wbg_for_27c67e2dbdce22f6: ji,
    __wbg_freeze_cc6bc19f75299986: xi,
    __wbg_from_89e3fc3ba5e6fb48: ci,
    __wbg_getRandomValues_3aa56aa6edec874c: Po,
    __wbg_getTime_2bc4375165f02d15: pi,
    __wbg_get_bd8e338fbd5f5cc8: Jo,
    __wbg_get_e3c254076557e348: ri,
    __wbg_globalThis_d1e6af4856ba331b: Bi,
    __wbg_global_207b558942527489: Pi,
    __wbg_instanceof_ArrayBuffer_836825be07d4c9d2: di,
    __wbg_instanceof_Date_f65cf97fb83fc369: gi,
    __wbg_instanceof_Object_71ca3c0a59266746: bi,
    __wbg_instanceof_Uint8Array_2b3bbecd033d19f6: Ni,
    __wbg_isArray_2ab64d95e09ea0ae: ui,
    __wbg_iterator_2cee6dadfd956dfa: ni,
    __wbg_keys_91e412b4b222659f: Si,
    __wbg_length_c20a40f15020d68a: zi,
    __wbg_length_cd7af8117672b8b8: Go,
    __wbg_length_dee433d4c85c9387: ii,
    __wbg_log_1746d5c75ec89963: Ko,
    __wbg_log_5bb5f88f245d7762: qo,
    __wbg_msCrypto_eb05e62b530a1508: Wo,
    __wbg_new_16b304a2cfa7ff4a: Yo,
    __wbg_new_28c511d9baebfa89: hi,
    __wbg_new_63b92bc8671ed464: Hi,
    __wbg_new_72fb9a18b5ae2624: oi,
    __wbg_new_abda76e883ba8a5f: To,
    __wbg_new_cf3ec55744a78578: yi,
    __wbg_new_dd6a5dd7b538af21: Ai,
    __wbg_newnoargs_e258087cd0daa0ea: Xo,
    __wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb: Fi,
    __wbg_newwithlength_e9b4878cebadb3d3: Vi,
    __wbg_next_196c84450b364254: Qo,
    __wbg_next_40fc327bfc8770e6: Zo,
    __wbg_node_104a2ff8d6ea03a2: No,
    __wbg_ownKeys_658942b7f28d1fe9: Ci,
    __wbg_process_4a72847cc503995b: Lo,
    __wbg_push_a5b05aedc7234f9f: fi,
    __wbg_randomFillSync_5c9c955aa56b6049: Fo,
    __wbg_require_cca90b1a94a0255b: Vo,
    __wbg_self_ce0dbfc45cf2f5be: Ui,
    __wbg_set_1f9b04f170055d33: Oi,
    __wbg_set_20cbc34131e76824: Bo,
    __wbg_set_a47bac70306a19a7: Li,
    __wbg_set_d4638f722068f043: ai,
    __wbg_set_wasm: ho,
    __wbg_slice_52fb626ffdc8da8f: Mi,
    __wbg_stack_658279fe44541cf6: Ro,
    __wbg_subarray_a1f73cd4b5b42fe1: Wi,
    __wbg_toString_7df3c77999517c20: Di,
    __wbg_unshift_e22df4b34bcf5070: li,
    __wbg_value_d93c65011f51a456: ti,
    __wbg_values_9c75e6e2bfbdb70d: ki,
    __wbg_versions_f686565e586dd935: zo,
    __wbg_window_c6fb939a7f436783: $i,
    __wbindgen_bigint_from_i64: Uo,
    __wbindgen_bigint_from_u64: $o,
    __wbindgen_boolean_get: So,
    __wbindgen_debug_string: qi,
    __wbindgen_error_new: yo,
    __wbindgen_is_array: Co,
    __wbindgen_is_function: Eo,
    __wbindgen_is_null: ko,
    __wbindgen_is_object: Io,
    __wbindgen_is_string: Ao,
    __wbindgen_is_undefined: xo,
    __wbindgen_json_serialize: Oo,
    __wbindgen_jsval_loose_eq: jo,
    __wbindgen_memory: Ji,
    __wbindgen_number_get: vo,
    __wbindgen_number_new: mo,
    __wbindgen_object_clone_ref: wo,
    __wbindgen_object_drop_ref: go,
    __wbindgen_string_get: po,
    __wbindgen_string_new: bo,
    __wbindgen_throw: Ki,
    create: ul,
    decodeChange: dl,
    decodeSyncMessage: yl,
    decodeSyncState: ml,
    encodeChange: ll,
    encodeSyncMessage: pl,
    encodeSyncState: bl,
    exportSyncState: gl,
    importSyncState: _l,
    initSyncState: hl,
    load: fl
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  hc(ch);
  Qt();
  var Ge = null;
  typeof WebSocket < "u" ? Ge = WebSocket : typeof MozWebSocket < "u" ? Ge = MozWebSocket : typeof global < "u" ? Ge = global.WebSocket || global.MozWebSocket : typeof window < "u" ? Ge = window.WebSocket || window.MozWebSocket : typeof self < "u" && (Ge = self.WebSocket || self.MozWebSocket);
  const Sn = Ge, uh = (t) => t.type === "peer", fh = (t) => t.type === "error", lh = "1";
  function ve(t, e = "Assertion failed") {
    if (t === false || t === null || t === void 0) {
      const n = new Error(dh(e));
      throw n.stack = hh(n.stack, "assert.ts"), n;
    }
  }
  const dh = (t) => t.split(`
`).map((e) => e.trim()).join(`
`), hh = (t = "", e) => t.split(`
`).filter((n) => !n.includes(e)).join(`
`), _h = (t) => {
    const { buffer: e, byteOffset: n, byteLength: r } = t;
    return e.slice(n, n + r);
  };
  class gh extends nl {
    constructor() {
      super(...arguments);
      __publicField(this, "socket");
    }
  }
  class ph extends gh {
    constructor(e, n = 5e3) {
      super();
      __privateAdd(this, _ph_instances);
      __publicField(this, "url");
      __publicField(this, "retryInterval");
      __privateAdd(this, _t9, false);
      __privateAdd(this, _e9);
      __privateAdd(this, _n9, Me("automerge-repo:websocket:browser"));
      __publicField(this, "remotePeerId");
      __publicField(this, "onOpen", () => {
        __privateGet(this, _n9).call(this, "open"), clearInterval(__privateGet(this, _e9)), __privateSet(this, _e9, void 0), this.join();
      });
      __publicField(this, "onClose", () => {
        __privateGet(this, _n9).call(this, "close"), this.remotePeerId && this.emit("peer-disconnected", {
          peerId: this.remotePeerId
        }), this.retryInterval > 0 && !__privateGet(this, _e9) && setTimeout(() => (ve(this.peerId), this.connect(this.peerId, this.peerMetadata)), this.retryInterval);
      });
      __publicField(this, "onMessage", (e) => {
        this.receiveMessage(e.data);
      });
      __publicField(this, "onError", (e) => {
        if ("error" in e && e.error.code !== "ECONNREFUSED") throw e.error;
        __privateGet(this, _n9).call(this, "Connection failed, retrying...");
      });
      this.url = e, this.retryInterval = n, __privateSet(this, _n9, __privateGet(this, _n9).extend(e));
    }
    connect(e, n) {
      !this.socket || !this.peerId ? (__privateGet(this, _n9).call(this, "connecting"), this.peerId = e, this.peerMetadata = n ?? {}) : (__privateGet(this, _n9).call(this, "reconnecting"), ve(e === this.peerId), this.socket.removeEventListener("open", this.onOpen), this.socket.removeEventListener("close", this.onClose), this.socket.removeEventListener("message", this.onMessage), this.socket.removeEventListener("error", this.onError)), __privateGet(this, _e9) || __privateSet(this, _e9, setInterval(() => {
        this.connect(e, n);
      }, this.retryInterval)), this.socket = new Sn(this.url), this.socket.binaryType = "arraybuffer", this.socket.addEventListener("open", this.onOpen), this.socket.addEventListener("close", this.onClose), this.socket.addEventListener("message", this.onMessage), this.socket.addEventListener("error", this.onError), setTimeout(() => __privateMethod(this, _ph_instances, r_fn2).call(this), 1e3), this.join();
    }
    join() {
      ve(this.peerId), ve(this.socket), this.socket.readyState === Sn.OPEN && this.send(yh(this.peerId, this.peerMetadata));
    }
    disconnect() {
      ve(this.peerId), ve(this.socket), this.send({
        type: "leave",
        senderId: this.peerId
      });
    }
    send(e) {
      var _a5;
      if ("data" in e && ((_a5 = e.data) == null ? void 0 : _a5.byteLength) === 0) throw new Error("Tried to send a zero-length message");
      if (ve(this.peerId), ve(this.socket), this.socket.readyState !== Sn.OPEN) throw new Error(`Websocket not ready (${this.socket.readyState})`);
      const n = io(e);
      this.socket.send(_h(n));
    }
    peerCandidate(e, n) {
      ve(this.socket), __privateMethod(this, _ph_instances, r_fn2).call(this), this.remotePeerId = e, this.emit("peer-candidate", {
        peerId: e,
        peerMetadata: n
      });
    }
    receiveMessage(e) {
      const n = Sf(new Uint8Array(e));
      if (ve(this.socket), e.byteLength === 0) throw new Error("received a zero-length message");
      if (uh(n)) {
        const { peerMetadata: r } = n;
        __privateGet(this, _n9).call(this, `peer: ${n.senderId}`), this.peerCandidate(n.senderId, r);
      } else fh(n) ? __privateGet(this, _n9).call(this, `error: ${n.message}`) : this.emit("message", n);
    }
  }
  _t9 = new WeakMap();
  _e9 = new WeakMap();
  _n9 = new WeakMap();
  _ph_instances = new WeakSet();
  r_fn2 = function() {
    __privateGet(this, _t9) || (__privateSet(this, _t9, true), this.emit("ready", {
      network: this
    }));
  };
  function yh(t, e) {
    return {
      type: "join",
      senderId: t,
      peerMetadata: e,
      supportedProtocolVersions: [
        lh
      ]
    };
  }
  Me("WebsocketServer");
  class bh {
    constructor(e = "automerge", n = "documents") {
      __publicField(this, "database");
      __publicField(this, "store");
      __publicField(this, "dbPromise");
      this.database = e, this.store = n, this.dbPromise = this.createDatabasePromise();
    }
    createDatabasePromise() {
      return new Promise((e, n) => {
        const r = indexedDB.open(this.database, 1);
        r.onerror = () => {
          n(r.error);
        }, r.onupgradeneeded = (s) => {
          s.target.result.createObjectStore(this.store);
        }, r.onsuccess = (s) => {
          const o = s.target.result;
          e(o);
        };
      });
    }
    async load(e) {
      const r = (await this.dbPromise).transaction(this.store), o = r.objectStore(this.store).get(e);
      return new Promise((i, a) => {
        r.onerror = () => {
          a(o.error);
        }, o.onsuccess = (c) => {
          const u = c.target.result;
          u && typeof u == "object" && "binary" in u ? i(u.binary) : i(void 0);
        };
      });
    }
    async save(e, n) {
      const s = (await this.dbPromise).transaction(this.store, "readwrite");
      return s.objectStore(this.store).put({
        key: e,
        binary: n
      }, e), new Promise((i, a) => {
        s.onerror = () => {
          a(s.error);
        }, s.oncomplete = () => {
          i();
        };
      });
    }
    async remove(e) {
      const r = (await this.dbPromise).transaction(this.store, "readwrite");
      return r.objectStore(this.store).delete(e), new Promise((o, i) => {
        r.onerror = () => {
          i(r.error);
        }, r.oncomplete = () => {
          o();
        };
      });
    }
    async loadRange(e) {
      const n = await this.dbPromise, r = e, s = [
        ...e,
        "\uFFFF"
      ], o = IDBKeyRange.bound(r, s), i = n.transaction(this.store), c = i.objectStore(this.store).openCursor(o), u = [];
      return new Promise((f, l) => {
        i.onerror = () => {
          l(c.error);
        }, c.onsuccess = (d) => {
          const h = d.target.result;
          h ? (u.push({
            data: h.value.binary,
            key: h.key
          }), h.continue()) : f(u);
        };
      });
    }
    async removeRange(e) {
      const n = await this.dbPromise, r = e, s = [
        ...e,
        "\uFFFF"
      ], o = IDBKeyRange.bound(r, s), i = n.transaction(this.store, "readwrite");
      return i.objectStore(this.store).delete(o), new Promise((c, u) => {
        i.onerror = () => {
          u(i.error);
        }, i.oncomplete = () => {
          c();
        };
      });
    }
  }
  rt = qa(() => new tl({
    network: [
      new ph("wss://sync.automerge.org")
    ],
    storage: new bh()
  }));
  Ah = async function(t) {
    let e = rt().find(t), n = ls(Kn(e.docSync()));
    function r(s) {
      ut(n, s.doc, true);
    }
    return e.addListener("change", r), ds(() => () => e.removeListener("change", r)), await e.whenReady(), {
      get doc() {
        return lt(n);
      },
      get docHandle() {
        return e;
      },
      change(s) {
        e.change(s);
      }
    };
  };
  function yr(t, e) {
    t.change(async (n) => {
      const r = n.version || 0;
      for (let s = r + 1; s <= Object.keys(e).length; s++) {
        const o = e[s];
        o && await o(n);
      }
    });
  }
  let br, mt, st, mh;
  br = {
    1: (t) => {
      t.version = 1, t.user = rt().create().documentId;
    }
  };
  mt = hs("user-document-ids", {});
  st = hs("current-username", null);
  mh = Yi(() => mt.value[st.value || ""] || null);
  Eh = {
    get username() {
      return st.value;
    },
    get documentId() {
      return lt(mh);
    },
    clear() {
      st.value = null;
    }
  };
  Ih = async function(t) {
    const e = mt.value;
    if (e[t]) throw wt.from("errors_name_user", "errors_message_already_exists");
    const n = rt().create();
    await n.whenReady(), await yr(n, br);
    const r = rt().find(n.docSync().user);
    await r.whenReady(), r.change((s) => {
      s.username = t;
    }), e[t] = n.documentId, mt.value = e, st.value = t;
  };
  Ch = async function(t) {
    const n = mt.value[t];
    if (!n) throw wt.from("errors_name_user", "errors_message_invalid_credentials");
    const r = rt().find(n);
    await r.whenReady(), await yr(r, br), st.value = t;
  };
  Oh = async function(t, e) {
    const n = mt.value, r = rt().find(e);
    await r.whenReady(), await yr(r, br), n[t] = r.documentId, st.value = t;
  };
})();
export {
  Ha as A,
  Ah as B,
  Sh as C,
  __tla,
  pa as a,
  ka as b,
  ba as c,
  Ea as d,
  Ta as e,
  oa as f,
  xa as g,
  kh as h,
  Ca as i,
  Ma as j,
  aa as k,
  Ih as l,
  Oh as m,
  xr as n,
  ha as o,
  za as p,
  wa as q,
  rt as r,
  Ch as s,
  Ka as t,
  Eh as u,
  An as v,
  Zn as w,
  Da as x,
  $a as y,
  Pa as z
};
