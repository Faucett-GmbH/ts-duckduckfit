import { t as oe, a as ie } from "../chunks/BZ0OIXfh.js";
import { p as se, N as we, v as x, l as Mt, m as K, f as Ce, c as U, r as F, s as ue, t as At, a as ae, $ as ye, o as Ee } from "../chunks/Bvg94FyY.js";
import { s as pe } from "../chunks/CpFI7FWg.js";
import { p as Be, i as Re } from "../chunks/IxRC03RJ.js";
import { h as Ae } from "../chunks/CM8RGjgJ.js";
import { b as Ie } from "../chunks/BdWWhBHb.js";
import { L as Te, s as X, a as Ne, f as ve } from "../chunks/D_MrbdsC.js";
import { b as Me } from "../chunks/BPnHVCzW.js";
import { w as Pe, p as Pt, x as Se, u as Y, __tla as __tla_0 } from "../chunks/CeoYdeJ7.js";
import "../chunks/KzIwl7iM.js";
let hn;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  var H = {}, tt, St;
  function be() {
    return St || (St = 1, tt = function() {
      return typeof Promise == "function" && Promise.prototype && Promise.prototype.then;
    }), tt;
  }
  var et = {}, q = {}, bt;
  function k() {
    if (bt) return q;
    bt = 1;
    let o;
    const r = [
      0,
      26,
      44,
      70,
      100,
      134,
      172,
      196,
      242,
      292,
      346,
      404,
      466,
      532,
      581,
      655,
      733,
      815,
      901,
      991,
      1085,
      1156,
      1258,
      1364,
      1474,
      1588,
      1706,
      1828,
      1921,
      2051,
      2185,
      2323,
      2465,
      2611,
      2761,
      2876,
      3034,
      3196,
      3362,
      3532,
      3706
    ];
    return q.getSymbolSize = function(e) {
      if (!e) throw new Error('"version" cannot be null or undefined');
      if (e < 1 || e > 40) throw new Error('"version" should be in range from 1 to 40');
      return e * 4 + 17;
    }, q.getSymbolTotalCodewords = function(e) {
      return r[e];
    }, q.getBCHDigit = function(i) {
      let e = 0;
      for (; i !== 0; ) e++, i >>>= 1;
      return e;
    }, q.setToSJISFunction = function(e) {
      if (typeof e != "function") throw new Error('"toSJISFunc" is not a valid function.');
      o = e;
    }, q.isKanjiModeEnabled = function() {
      return typeof o < "u";
    }, q.toSJIS = function(e) {
      return o(e);
    }, q;
  }
  var nt = {}, Lt;
  function It() {
    return Lt || (Lt = 1, function(o) {
      o.L = {
        bit: 1
      }, o.M = {
        bit: 0
      }, o.Q = {
        bit: 3
      }, o.H = {
        bit: 2
      };
      function r(i) {
        if (typeof i != "string") throw new Error("Param is not a string");
        switch (i.toLowerCase()) {
          case "l":
          case "low":
            return o.L;
          case "m":
          case "medium":
            return o.M;
          case "q":
          case "quartile":
            return o.Q;
          case "h":
          case "high":
            return o.H;
          default:
            throw new Error("Unknown EC Level: " + i);
        }
      }
      o.isValid = function(e) {
        return e && typeof e.bit < "u" && e.bit >= 0 && e.bit < 4;
      }, o.from = function(e, t) {
        if (o.isValid(e)) return e;
        try {
          return r(e);
        } catch {
          return t;
        }
      };
    }(nt)), nt;
  }
  var rt, _t;
  function Le() {
    if (_t) return rt;
    _t = 1;
    function o() {
      this.buffer = [], this.length = 0;
    }
    return o.prototype = {
      get: function(r) {
        const i = Math.floor(r / 8);
        return (this.buffer[i] >>> 7 - r % 8 & 1) === 1;
      },
      put: function(r, i) {
        for (let e = 0; e < i; e++) this.putBit((r >>> i - e - 1 & 1) === 1);
      },
      getLengthInBits: function() {
        return this.length;
      },
      putBit: function(r) {
        const i = Math.floor(this.length / 8);
        this.buffer.length <= i && this.buffer.push(0), r && (this.buffer[i] |= 128 >>> this.length % 8), this.length++;
      }
    }, rt = o, rt;
  }
  var ot, Dt;
  function _e() {
    if (Dt) return ot;
    Dt = 1;
    function o(r) {
      if (!r || r < 1) throw new Error("BitMatrix size must be defined and greater than 0");
      this.size = r, this.data = new Uint8Array(r * r), this.reservedBit = new Uint8Array(r * r);
    }
    return o.prototype.set = function(r, i, e, t) {
      const n = r * this.size + i;
      this.data[n] = e, t && (this.reservedBit[n] = true);
    }, o.prototype.get = function(r, i) {
      return this.data[r * this.size + i];
    }, o.prototype.xor = function(r, i, e) {
      this.data[r * this.size + i] ^= e;
    }, o.prototype.isReserved = function(r, i) {
      return this.reservedBit[r * this.size + i];
    }, ot = o, ot;
  }
  var it = {}, qt;
  function De() {
    return qt || (qt = 1, function(o) {
      const r = k().getSymbolSize;
      o.getRowColCoords = function(e) {
        if (e === 1) return [];
        const t = Math.floor(e / 7) + 2, n = r(e), s = n === 145 ? 26 : Math.ceil((n - 13) / (2 * t - 2)) * 2, a = [
          n - 7
        ];
        for (let u = 1; u < t - 1; u++) a[u] = a[u - 1] - s;
        return a.push(6), a.reverse();
      }, o.getPositions = function(e) {
        const t = [], n = o.getRowColCoords(e), s = n.length;
        for (let a = 0; a < s; a++) for (let u = 0; u < s; u++) a === 0 && u === 0 || a === 0 && u === s - 1 || a === s - 1 && u === 0 || t.push([
          n[a],
          n[u]
        ]);
        return t;
      };
    }(it)), it;
  }
  var st = {}, Ut;
  function qe() {
    if (Ut) return st;
    Ut = 1;
    const o = k().getSymbolSize, r = 7;
    return st.getPositions = function(e) {
      const t = o(e);
      return [
        [
          0,
          0
        ],
        [
          t - r,
          0
        ],
        [
          0,
          t - r
        ]
      ];
    }, st;
  }
  var ut = {}, Ft;
  function Ue() {
    return Ft || (Ft = 1, function(o) {
      o.Patterns = {
        PATTERN000: 0,
        PATTERN001: 1,
        PATTERN010: 2,
        PATTERN011: 3,
        PATTERN100: 4,
        PATTERN101: 5,
        PATTERN110: 6,
        PATTERN111: 7
      };
      const r = {
        N1: 3,
        N2: 3,
        N3: 40,
        N4: 10
      };
      o.isValid = function(t) {
        return t != null && t !== "" && !isNaN(t) && t >= 0 && t <= 7;
      }, o.from = function(t) {
        return o.isValid(t) ? parseInt(t, 10) : void 0;
      }, o.getPenaltyN1 = function(t) {
        const n = t.size;
        let s = 0, a = 0, u = 0, c = null, l = null;
        for (let f = 0; f < n; f++) {
          a = u = 0, c = l = null;
          for (let m = 0; m < n; m++) {
            let d = t.get(f, m);
            d === c ? a++ : (a >= 5 && (s += r.N1 + (a - 5)), c = d, a = 1), d = t.get(m, f), d === l ? u++ : (u >= 5 && (s += r.N1 + (u - 5)), l = d, u = 1);
          }
          a >= 5 && (s += r.N1 + (a - 5)), u >= 5 && (s += r.N1 + (u - 5));
        }
        return s;
      }, o.getPenaltyN2 = function(t) {
        const n = t.size;
        let s = 0;
        for (let a = 0; a < n - 1; a++) for (let u = 0; u < n - 1; u++) {
          const c = t.get(a, u) + t.get(a, u + 1) + t.get(a + 1, u) + t.get(a + 1, u + 1);
          (c === 4 || c === 0) && s++;
        }
        return s * r.N2;
      }, o.getPenaltyN3 = function(t) {
        const n = t.size;
        let s = 0, a = 0, u = 0;
        for (let c = 0; c < n; c++) {
          a = u = 0;
          for (let l = 0; l < n; l++) a = a << 1 & 2047 | t.get(c, l), l >= 10 && (a === 1488 || a === 93) && s++, u = u << 1 & 2047 | t.get(l, c), l >= 10 && (u === 1488 || u === 93) && s++;
        }
        return s * r.N3;
      }, o.getPenaltyN4 = function(t) {
        let n = 0;
        const s = t.data.length;
        for (let u = 0; u < s; u++) n += t.data[u];
        return Math.abs(Math.ceil(n * 100 / s / 5) - 10) * r.N4;
      };
      function i(e, t, n) {
        switch (e) {
          case o.Patterns.PATTERN000:
            return (t + n) % 2 === 0;
          case o.Patterns.PATTERN001:
            return t % 2 === 0;
          case o.Patterns.PATTERN010:
            return n % 3 === 0;
          case o.Patterns.PATTERN011:
            return (t + n) % 3 === 0;
          case o.Patterns.PATTERN100:
            return (Math.floor(t / 2) + Math.floor(n / 3)) % 2 === 0;
          case o.Patterns.PATTERN101:
            return t * n % 2 + t * n % 3 === 0;
          case o.Patterns.PATTERN110:
            return (t * n % 2 + t * n % 3) % 2 === 0;
          case o.Patterns.PATTERN111:
            return (t * n % 3 + (t + n) % 2) % 2 === 0;
          default:
            throw new Error("bad maskPattern:" + e);
        }
      }
      o.applyMask = function(t, n) {
        const s = n.size;
        for (let a = 0; a < s; a++) for (let u = 0; u < s; u++) n.isReserved(u, a) || n.xor(u, a, i(t, u, a));
      }, o.getBestMask = function(t, n) {
        const s = Object.keys(o.Patterns).length;
        let a = 0, u = 1 / 0;
        for (let c = 0; c < s; c++) {
          n(c), o.applyMask(c, t);
          const l = o.getPenaltyN1(t) + o.getPenaltyN2(t) + o.getPenaltyN3(t) + o.getPenaltyN4(t);
          o.applyMask(c, t), l < u && (u = l, a = c);
        }
        return a;
      };
    }(ut)), ut;
  }
  var G = {}, kt;
  function ce() {
    if (kt) return G;
    kt = 1;
    const o = It(), r = [
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      2,
      2,
      1,
      2,
      2,
      4,
      1,
      2,
      4,
      4,
      2,
      4,
      4,
      4,
      2,
      4,
      6,
      5,
      2,
      4,
      6,
      6,
      2,
      5,
      8,
      8,
      4,
      5,
      8,
      8,
      4,
      5,
      8,
      11,
      4,
      8,
      10,
      11,
      4,
      9,
      12,
      16,
      4,
      9,
      16,
      16,
      6,
      10,
      12,
      18,
      6,
      10,
      17,
      16,
      6,
      11,
      16,
      19,
      6,
      13,
      18,
      21,
      7,
      14,
      21,
      25,
      8,
      16,
      20,
      25,
      8,
      17,
      23,
      25,
      9,
      17,
      23,
      34,
      9,
      18,
      25,
      30,
      10,
      20,
      27,
      32,
      12,
      21,
      29,
      35,
      12,
      23,
      34,
      37,
      12,
      25,
      34,
      40,
      13,
      26,
      35,
      42,
      14,
      28,
      38,
      45,
      15,
      29,
      40,
      48,
      16,
      31,
      43,
      51,
      17,
      33,
      45,
      54,
      18,
      35,
      48,
      57,
      19,
      37,
      51,
      60,
      19,
      38,
      53,
      63,
      20,
      40,
      56,
      66,
      21,
      43,
      59,
      70,
      22,
      45,
      62,
      74,
      24,
      47,
      65,
      77,
      25,
      49,
      68,
      81
    ], i = [
      7,
      10,
      13,
      17,
      10,
      16,
      22,
      28,
      15,
      26,
      36,
      44,
      20,
      36,
      52,
      64,
      26,
      48,
      72,
      88,
      36,
      64,
      96,
      112,
      40,
      72,
      108,
      130,
      48,
      88,
      132,
      156,
      60,
      110,
      160,
      192,
      72,
      130,
      192,
      224,
      80,
      150,
      224,
      264,
      96,
      176,
      260,
      308,
      104,
      198,
      288,
      352,
      120,
      216,
      320,
      384,
      132,
      240,
      360,
      432,
      144,
      280,
      408,
      480,
      168,
      308,
      448,
      532,
      180,
      338,
      504,
      588,
      196,
      364,
      546,
      650,
      224,
      416,
      600,
      700,
      224,
      442,
      644,
      750,
      252,
      476,
      690,
      816,
      270,
      504,
      750,
      900,
      300,
      560,
      810,
      960,
      312,
      588,
      870,
      1050,
      336,
      644,
      952,
      1110,
      360,
      700,
      1020,
      1200,
      390,
      728,
      1050,
      1260,
      420,
      784,
      1140,
      1350,
      450,
      812,
      1200,
      1440,
      480,
      868,
      1290,
      1530,
      510,
      924,
      1350,
      1620,
      540,
      980,
      1440,
      1710,
      570,
      1036,
      1530,
      1800,
      570,
      1064,
      1590,
      1890,
      600,
      1120,
      1680,
      1980,
      630,
      1204,
      1770,
      2100,
      660,
      1260,
      1860,
      2220,
      720,
      1316,
      1950,
      2310,
      750,
      1372,
      2040,
      2430
    ];
    return G.getBlocksCount = function(t, n) {
      switch (n) {
        case o.L:
          return r[(t - 1) * 4 + 0];
        case o.M:
          return r[(t - 1) * 4 + 1];
        case o.Q:
          return r[(t - 1) * 4 + 2];
        case o.H:
          return r[(t - 1) * 4 + 3];
        default:
          return;
      }
    }, G.getTotalCodewordsCount = function(t, n) {
      switch (n) {
        case o.L:
          return i[(t - 1) * 4 + 0];
        case o.M:
          return i[(t - 1) * 4 + 1];
        case o.Q:
          return i[(t - 1) * 4 + 2];
        case o.H:
          return i[(t - 1) * 4 + 3];
        default:
          return;
      }
    }, G;
  }
  var at = {}, j = {}, zt;
  function Fe() {
    if (zt) return j;
    zt = 1;
    const o = new Uint8Array(512), r = new Uint8Array(256);
    return function() {
      let e = 1;
      for (let t = 0; t < 255; t++) o[t] = e, r[e] = t, e <<= 1, e & 256 && (e ^= 285);
      for (let t = 255; t < 512; t++) o[t] = o[t - 255];
    }(), j.log = function(e) {
      if (e < 1) throw new Error("log(" + e + ")");
      return r[e];
    }, j.exp = function(e) {
      return o[e];
    }, j.mul = function(e, t) {
      return e === 0 || t === 0 ? 0 : o[r[e] + r[t]];
    }, j;
  }
  var Vt;
  function ke() {
    return Vt || (Vt = 1, function(o) {
      const r = Fe();
      o.mul = function(e, t) {
        const n = new Uint8Array(e.length + t.length - 1);
        for (let s = 0; s < e.length; s++) for (let a = 0; a < t.length; a++) n[s + a] ^= r.mul(e[s], t[a]);
        return n;
      }, o.mod = function(e, t) {
        let n = new Uint8Array(e);
        for (; n.length - t.length >= 0; ) {
          const s = n[0];
          for (let u = 0; u < t.length; u++) n[u] ^= r.mul(t[u], s);
          let a = 0;
          for (; a < n.length && n[a] === 0; ) a++;
          n = n.slice(a);
        }
        return n;
      }, o.generateECPolynomial = function(e) {
        let t = new Uint8Array([
          1
        ]);
        for (let n = 0; n < e; n++) t = o.mul(t, new Uint8Array([
          1,
          r.exp(n)
        ]));
        return t;
      };
    }(at)), at;
  }
  var ct, Ht;
  function ze() {
    if (Ht) return ct;
    Ht = 1;
    const o = ke();
    function r(i) {
      this.genPoly = void 0, this.degree = i, this.degree && this.initialize(this.degree);
    }
    return r.prototype.initialize = function(e) {
      this.degree = e, this.genPoly = o.generateECPolynomial(this.degree);
    }, r.prototype.encode = function(e) {
      if (!this.genPoly) throw new Error("Encoder not initialized");
      const t = new Uint8Array(e.length + this.degree);
      t.set(e);
      const n = o.mod(t, this.genPoly), s = this.degree - n.length;
      if (s > 0) {
        const a = new Uint8Array(this.degree);
        return a.set(n, s), a;
      }
      return n;
    }, ct = r, ct;
  }
  var lt = {}, ft = {}, dt = {}, Kt;
  function le() {
    return Kt || (Kt = 1, dt.isValid = function(r) {
      return !isNaN(r) && r >= 1 && r <= 40;
    }), dt;
  }
  var b = {}, Jt;
  function fe() {
    if (Jt) return b;
    Jt = 1;
    const o = "[0-9]+", r = "[A-Z $%*+\\-./:]+";
    let i = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
    i = i.replace(/u/g, "\\u");
    const e = "(?:(?![A-Z0-9 $%*+\\-./:]|" + i + `)(?:.|[\r
]))+`;
    b.KANJI = new RegExp(i, "g"), b.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g"), b.BYTE = new RegExp(e, "g"), b.NUMERIC = new RegExp(o, "g"), b.ALPHANUMERIC = new RegExp(r, "g");
    const t = new RegExp("^" + i + "$"), n = new RegExp("^" + o + "$"), s = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
    return b.testKanji = function(u) {
      return t.test(u);
    }, b.testNumeric = function(u) {
      return n.test(u);
    }, b.testAlphanumeric = function(u) {
      return s.test(u);
    }, b;
  }
  var jt;
  function z() {
    return jt || (jt = 1, function(o) {
      const r = le(), i = fe();
      o.NUMERIC = {
        id: "Numeric",
        bit: 1,
        ccBits: [
          10,
          12,
          14
        ]
      }, o.ALPHANUMERIC = {
        id: "Alphanumeric",
        bit: 2,
        ccBits: [
          9,
          11,
          13
        ]
      }, o.BYTE = {
        id: "Byte",
        bit: 4,
        ccBits: [
          8,
          16,
          16
        ]
      }, o.KANJI = {
        id: "Kanji",
        bit: 8,
        ccBits: [
          8,
          10,
          12
        ]
      }, o.MIXED = {
        bit: -1
      }, o.getCharCountIndicator = function(n, s) {
        if (!n.ccBits) throw new Error("Invalid mode: " + n);
        if (!r.isValid(s)) throw new Error("Invalid version: " + s);
        return s >= 1 && s < 10 ? n.ccBits[0] : s < 27 ? n.ccBits[1] : n.ccBits[2];
      }, o.getBestModeForData = function(n) {
        return i.testNumeric(n) ? o.NUMERIC : i.testAlphanumeric(n) ? o.ALPHANUMERIC : i.testKanji(n) ? o.KANJI : o.BYTE;
      }, o.toString = function(n) {
        if (n && n.id) return n.id;
        throw new Error("Invalid mode");
      }, o.isValid = function(n) {
        return n && n.bit && n.ccBits;
      };
      function e(t) {
        if (typeof t != "string") throw new Error("Param is not a string");
        switch (t.toLowerCase()) {
          case "numeric":
            return o.NUMERIC;
          case "alphanumeric":
            return o.ALPHANUMERIC;
          case "kanji":
            return o.KANJI;
          case "byte":
            return o.BYTE;
          default:
            throw new Error("Unknown mode: " + t);
        }
      }
      o.from = function(n, s) {
        if (o.isValid(n)) return n;
        try {
          return e(n);
        } catch {
          return s;
        }
      };
    }(ft)), ft;
  }
  var Ot;
  function Ve() {
    return Ot || (Ot = 1, function(o) {
      const r = k(), i = ce(), e = It(), t = z(), n = le(), s = 7973, a = r.getBCHDigit(s);
      function u(m, d, N) {
        for (let v = 1; v <= 40; v++) if (d <= o.getCapacity(v, N, m)) return v;
      }
      function c(m, d) {
        return t.getCharCountIndicator(m, d) + 4;
      }
      function l(m, d) {
        let N = 0;
        return m.forEach(function(v) {
          const P = c(v.mode, d);
          N += P + v.getBitsLength();
        }), N;
      }
      function f(m, d) {
        for (let N = 1; N <= 40; N++) if (l(m, N) <= o.getCapacity(N, d, t.MIXED)) return N;
      }
      o.from = function(d, N) {
        return n.isValid(d) ? parseInt(d, 10) : N;
      }, o.getCapacity = function(d, N, v) {
        if (!n.isValid(d)) throw new Error("Invalid QR Code version");
        typeof v > "u" && (v = t.BYTE);
        const P = r.getSymbolTotalCodewords(d), A = i.getTotalCodewordsCount(d, N), M = (P - A) * 8;
        if (v === t.MIXED) return M;
        const I = M - c(v, d);
        switch (v) {
          case t.NUMERIC:
            return Math.floor(I / 10 * 3);
          case t.ALPHANUMERIC:
            return Math.floor(I / 11 * 2);
          case t.KANJI:
            return Math.floor(I / 13);
          case t.BYTE:
          default:
            return Math.floor(I / 8);
        }
      }, o.getBestVersionForData = function(d, N) {
        let v;
        const P = e.from(N, e.M);
        if (Array.isArray(d)) {
          if (d.length > 1) return f(d, P);
          if (d.length === 0) return 1;
          v = d[0];
        } else v = d;
        return u(v.mode, v.getLength(), P);
      }, o.getEncodedBits = function(d) {
        if (!n.isValid(d) || d < 7) throw new Error("Invalid QR Code version");
        let N = d << 12;
        for (; r.getBCHDigit(N) - a >= 0; ) N ^= s << r.getBCHDigit(N) - a;
        return d << 12 | N;
      };
    }(lt)), lt;
  }
  var gt = {}, Yt;
  function He() {
    if (Yt) return gt;
    Yt = 1;
    const o = k(), r = 1335, i = 21522, e = o.getBCHDigit(r);
    return gt.getEncodedBits = function(n, s) {
      const a = n.bit << 3 | s;
      let u = a << 10;
      for (; o.getBCHDigit(u) - e >= 0; ) u ^= r << o.getBCHDigit(u) - e;
      return (a << 10 | u) ^ i;
    }, gt;
  }
  var ht = {}, mt, Gt;
  function Ke() {
    if (Gt) return mt;
    Gt = 1;
    const o = z();
    function r(i) {
      this.mode = o.NUMERIC, this.data = i.toString();
    }
    return r.getBitsLength = function(e) {
      return 10 * Math.floor(e / 3) + (e % 3 ? e % 3 * 3 + 1 : 0);
    }, r.prototype.getLength = function() {
      return this.data.length;
    }, r.prototype.getBitsLength = function() {
      return r.getBitsLength(this.data.length);
    }, r.prototype.write = function(e) {
      let t, n, s;
      for (t = 0; t + 3 <= this.data.length; t += 3) n = this.data.substr(t, 3), s = parseInt(n, 10), e.put(s, 10);
      const a = this.data.length - t;
      a > 0 && (n = this.data.substr(t), s = parseInt(n, 10), e.put(s, a * 3 + 1));
    }, mt = r, mt;
  }
  var wt, Qt;
  function Je() {
    if (Qt) return wt;
    Qt = 1;
    const o = z(), r = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      " ",
      "$",
      "%",
      "*",
      "+",
      "-",
      ".",
      "/",
      ":"
    ];
    function i(e) {
      this.mode = o.ALPHANUMERIC, this.data = e;
    }
    return i.getBitsLength = function(t) {
      return 11 * Math.floor(t / 2) + 6 * (t % 2);
    }, i.prototype.getLength = function() {
      return this.data.length;
    }, i.prototype.getBitsLength = function() {
      return i.getBitsLength(this.data.length);
    }, i.prototype.write = function(t) {
      let n;
      for (n = 0; n + 2 <= this.data.length; n += 2) {
        let s = r.indexOf(this.data[n]) * 45;
        s += r.indexOf(this.data[n + 1]), t.put(s, 11);
      }
      this.data.length % 2 && t.put(r.indexOf(this.data[n]), 6);
    }, wt = i, wt;
  }
  var Ct, $t;
  function je() {
    if ($t) return Ct;
    $t = 1;
    const o = z();
    function r(i) {
      this.mode = o.BYTE, typeof i == "string" ? this.data = new TextEncoder().encode(i) : this.data = new Uint8Array(i);
    }
    return r.getBitsLength = function(e) {
      return e * 8;
    }, r.prototype.getLength = function() {
      return this.data.length;
    }, r.prototype.getBitsLength = function() {
      return r.getBitsLength(this.data.length);
    }, r.prototype.write = function(i) {
      for (let e = 0, t = this.data.length; e < t; e++) i.put(this.data[e], 8);
    }, Ct = r, Ct;
  }
  var yt, Wt;
  function Oe() {
    if (Wt) return yt;
    Wt = 1;
    const o = z(), r = k();
    function i(e) {
      this.mode = o.KANJI, this.data = e;
    }
    return i.getBitsLength = function(t) {
      return t * 13;
    }, i.prototype.getLength = function() {
      return this.data.length;
    }, i.prototype.getBitsLength = function() {
      return i.getBitsLength(this.data.length);
    }, i.prototype.write = function(e) {
      let t;
      for (t = 0; t < this.data.length; t++) {
        let n = r.toSJIS(this.data[t]);
        if (n >= 33088 && n <= 40956) n -= 33088;
        else if (n >= 57408 && n <= 60351) n -= 49472;
        else throw new Error("Invalid SJIS character: " + this.data[t] + `
Make sure your charset is UTF-8`);
        n = (n >>> 8 & 255) * 192 + (n & 255), e.put(n, 13);
      }
    }, yt = i, yt;
  }
  var Et = {
    exports: {}
  }, Zt;
  function Ye() {
    return Zt || (Zt = 1, function(o) {
      var r = {
        single_source_shortest_paths: function(i, e, t) {
          var n = {}, s = {};
          s[e] = 0;
          var a = r.PriorityQueue.make();
          a.push(e, 0);
          for (var u, c, l, f, m, d, N, v, P; !a.empty(); ) {
            u = a.pop(), c = u.value, f = u.cost, m = i[c] || {};
            for (l in m) m.hasOwnProperty(l) && (d = m[l], N = f + d, v = s[l], P = typeof s[l] > "u", (P || v > N) && (s[l] = N, a.push(l, N), n[l] = c));
          }
          if (typeof t < "u" && typeof s[t] > "u") {
            var A = [
              "Could not find a path from ",
              e,
              " to ",
              t,
              "."
            ].join("");
            throw new Error(A);
          }
          return n;
        },
        extract_shortest_path_from_predecessor_list: function(i, e) {
          for (var t = [], n = e; n; ) t.push(n), i[n], n = i[n];
          return t.reverse(), t;
        },
        find_path: function(i, e, t) {
          var n = r.single_source_shortest_paths(i, e, t);
          return r.extract_shortest_path_from_predecessor_list(n, t);
        },
        PriorityQueue: {
          make: function(i) {
            var e = r.PriorityQueue, t = {}, n;
            i = i || {};
            for (n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
            return t.queue = [], t.sorter = i.sorter || e.default_sorter, t;
          },
          default_sorter: function(i, e) {
            return i.cost - e.cost;
          },
          push: function(i, e) {
            var t = {
              value: i,
              cost: e
            };
            this.queue.push(t), this.queue.sort(this.sorter);
          },
          pop: function() {
            return this.queue.shift();
          },
          empty: function() {
            return this.queue.length === 0;
          }
        }
      };
      o.exports = r;
    }(Et)), Et.exports;
  }
  var xt;
  function Ge() {
    return xt || (xt = 1, function(o) {
      const r = z(), i = Ke(), e = Je(), t = je(), n = Oe(), s = fe(), a = k(), u = Ye();
      function c(A) {
        return unescape(encodeURIComponent(A)).length;
      }
      function l(A, M, I) {
        const B = [];
        let S;
        for (; (S = A.exec(I)) !== null; ) B.push({
          data: S[0],
          index: S.index,
          mode: M,
          length: S[0].length
        });
        return B;
      }
      function f(A) {
        const M = l(s.NUMERIC, r.NUMERIC, A), I = l(s.ALPHANUMERIC, r.ALPHANUMERIC, A);
        let B, S;
        return a.isKanjiModeEnabled() ? (B = l(s.BYTE, r.BYTE, A), S = l(s.KANJI, r.KANJI, A)) : (B = l(s.BYTE_KANJI, r.BYTE, A), S = []), M.concat(I, B, S).sort(function(E, y) {
          return E.index - y.index;
        }).map(function(E) {
          return {
            data: E.data,
            mode: E.mode,
            length: E.length
          };
        });
      }
      function m(A, M) {
        switch (M) {
          case r.NUMERIC:
            return i.getBitsLength(A);
          case r.ALPHANUMERIC:
            return e.getBitsLength(A);
          case r.KANJI:
            return n.getBitsLength(A);
          case r.BYTE:
            return t.getBitsLength(A);
        }
      }
      function d(A) {
        return A.reduce(function(M, I) {
          const B = M.length - 1 >= 0 ? M[M.length - 1] : null;
          return B && B.mode === I.mode ? (M[M.length - 1].data += I.data, M) : (M.push(I), M);
        }, []);
      }
      function N(A) {
        const M = [];
        for (let I = 0; I < A.length; I++) {
          const B = A[I];
          switch (B.mode) {
            case r.NUMERIC:
              M.push([
                B,
                {
                  data: B.data,
                  mode: r.ALPHANUMERIC,
                  length: B.length
                },
                {
                  data: B.data,
                  mode: r.BYTE,
                  length: B.length
                }
              ]);
              break;
            case r.ALPHANUMERIC:
              M.push([
                B,
                {
                  data: B.data,
                  mode: r.BYTE,
                  length: B.length
                }
              ]);
              break;
            case r.KANJI:
              M.push([
                B,
                {
                  data: B.data,
                  mode: r.BYTE,
                  length: c(B.data)
                }
              ]);
              break;
            case r.BYTE:
              M.push([
                {
                  data: B.data,
                  mode: r.BYTE,
                  length: c(B.data)
                }
              ]);
          }
        }
        return M;
      }
      function v(A, M) {
        const I = {}, B = {
          start: {}
        };
        let S = [
          "start"
        ];
        for (let h = 0; h < A.length; h++) {
          const E = A[h], y = [];
          for (let g = 0; g < E.length; g++) {
            const R = E[g], w = "" + h + g;
            y.push(w), I[w] = {
              node: R,
              lastCount: 0
            }, B[w] = {};
            for (let p = 0; p < S.length; p++) {
              const C = S[p];
              I[C] && I[C].node.mode === R.mode ? (B[C][w] = m(I[C].lastCount + R.length, R.mode) - m(I[C].lastCount, R.mode), I[C].lastCount += R.length) : (I[C] && (I[C].lastCount = R.length), B[C][w] = m(R.length, R.mode) + 4 + r.getCharCountIndicator(R.mode, M));
            }
          }
          S = y;
        }
        for (let h = 0; h < S.length; h++) B[S[h]].end = 0;
        return {
          map: B,
          table: I
        };
      }
      function P(A, M) {
        let I;
        const B = r.getBestModeForData(A);
        if (I = r.from(M, B), I !== r.BYTE && I.bit < B.bit) throw new Error('"' + A + '" cannot be encoded with mode ' + r.toString(I) + `.
 Suggested mode is: ` + r.toString(B));
        switch (I === r.KANJI && !a.isKanjiModeEnabled() && (I = r.BYTE), I) {
          case r.NUMERIC:
            return new i(A);
          case r.ALPHANUMERIC:
            return new e(A);
          case r.KANJI:
            return new n(A);
          case r.BYTE:
            return new t(A);
        }
      }
      o.fromArray = function(M) {
        return M.reduce(function(I, B) {
          return typeof B == "string" ? I.push(P(B, null)) : B.data && I.push(P(B.data, B.mode)), I;
        }, []);
      }, o.fromString = function(M, I) {
        const B = f(M, a.isKanjiModeEnabled()), S = N(B), h = v(S, I), E = u.find_path(h.map, "start", "end"), y = [];
        for (let g = 1; g < E.length - 1; g++) y.push(h.table[E[g]].node);
        return o.fromArray(d(y));
      }, o.rawSplit = function(M) {
        return o.fromArray(f(M, a.isKanjiModeEnabled()));
      };
    }(ht)), ht;
  }
  var Xt;
  function Qe() {
    if (Xt) return et;
    Xt = 1;
    const o = k(), r = It(), i = Le(), e = _e(), t = De(), n = qe(), s = Ue(), a = ce(), u = ze(), c = Ve(), l = He(), f = z(), m = Ge();
    function d(h, E) {
      const y = h.size, g = n.getPositions(E);
      for (let R = 0; R < g.length; R++) {
        const w = g[R][0], p = g[R][1];
        for (let C = -1; C <= 7; C++) if (!(w + C <= -1 || y <= w + C)) for (let T = -1; T <= 7; T++) p + T <= -1 || y <= p + T || (C >= 0 && C <= 6 && (T === 0 || T === 6) || T >= 0 && T <= 6 && (C === 0 || C === 6) || C >= 2 && C <= 4 && T >= 2 && T <= 4 ? h.set(w + C, p + T, true, true) : h.set(w + C, p + T, false, true));
      }
    }
    function N(h) {
      const E = h.size;
      for (let y = 8; y < E - 8; y++) {
        const g = y % 2 === 0;
        h.set(y, 6, g, true), h.set(6, y, g, true);
      }
    }
    function v(h, E) {
      const y = t.getPositions(E);
      for (let g = 0; g < y.length; g++) {
        const R = y[g][0], w = y[g][1];
        for (let p = -2; p <= 2; p++) for (let C = -2; C <= 2; C++) p === -2 || p === 2 || C === -2 || C === 2 || p === 0 && C === 0 ? h.set(R + p, w + C, true, true) : h.set(R + p, w + C, false, true);
      }
    }
    function P(h, E) {
      const y = h.size, g = c.getEncodedBits(E);
      let R, w, p;
      for (let C = 0; C < 18; C++) R = Math.floor(C / 3), w = C % 3 + y - 8 - 3, p = (g >> C & 1) === 1, h.set(R, w, p, true), h.set(w, R, p, true);
    }
    function A(h, E, y) {
      const g = h.size, R = l.getEncodedBits(E, y);
      let w, p;
      for (w = 0; w < 15; w++) p = (R >> w & 1) === 1, w < 6 ? h.set(w, 8, p, true) : w < 8 ? h.set(w + 1, 8, p, true) : h.set(g - 15 + w, 8, p, true), w < 8 ? h.set(8, g - w - 1, p, true) : w < 9 ? h.set(8, 15 - w - 1 + 1, p, true) : h.set(8, 15 - w - 1, p, true);
      h.set(g - 8, 8, 1, true);
    }
    function M(h, E) {
      const y = h.size;
      let g = -1, R = y - 1, w = 7, p = 0;
      for (let C = y - 1; C > 0; C -= 2) for (C === 6 && C--; ; ) {
        for (let T = 0; T < 2; T++) if (!h.isReserved(R, C - T)) {
          let D = false;
          p < E.length && (D = (E[p] >>> w & 1) === 1), h.set(R, C - T, D), w--, w === -1 && (p++, w = 7);
        }
        if (R += g, R < 0 || y <= R) {
          R -= g, g = -g;
          break;
        }
      }
    }
    function I(h, E, y) {
      const g = new i();
      y.forEach(function(T) {
        g.put(T.mode.bit, 4), g.put(T.getLength(), f.getCharCountIndicator(T.mode, h)), T.write(g);
      });
      const R = o.getSymbolTotalCodewords(h), w = a.getTotalCodewordsCount(h, E), p = (R - w) * 8;
      for (g.getLengthInBits() + 4 <= p && g.put(0, 4); g.getLengthInBits() % 8 !== 0; ) g.putBit(0);
      const C = (p - g.getLengthInBits()) / 8;
      for (let T = 0; T < C; T++) g.put(T % 2 ? 17 : 236, 8);
      return B(g, h, E);
    }
    function B(h, E, y) {
      const g = o.getSymbolTotalCodewords(E), R = a.getTotalCodewordsCount(E, y), w = g - R, p = a.getBlocksCount(E, y), C = g % p, T = p - C, D = Math.floor(g / p), J = Math.floor(w / p), ge = J + 1, Tt = D - J, he = new u(Tt);
      let Q = 0;
      const O = new Array(p), Nt = new Array(p);
      let $ = 0;
      const me = new Uint8Array(h.buffer);
      for (let V = 0; V < p; V++) {
        const Z = V < T ? J : ge;
        O[V] = me.slice(Q, Q + Z), Nt[V] = he.encode(O[V]), Q += Z, $ = Math.max($, Z);
      }
      const W = new Uint8Array(g);
      let vt = 0, L, _;
      for (L = 0; L < $; L++) for (_ = 0; _ < p; _++) L < O[_].length && (W[vt++] = O[_][L]);
      for (L = 0; L < Tt; L++) for (_ = 0; _ < p; _++) W[vt++] = Nt[_][L];
      return W;
    }
    function S(h, E, y, g) {
      let R;
      if (Array.isArray(h)) R = m.fromArray(h);
      else if (typeof h == "string") {
        let D = E;
        if (!D) {
          const J = m.rawSplit(h);
          D = c.getBestVersionForData(J, y);
        }
        R = m.fromString(h, D || 40);
      } else throw new Error("Invalid data");
      const w = c.getBestVersionForData(R, y);
      if (!w) throw new Error("The amount of data is too big to be stored in a QR Code");
      if (!E) E = w;
      else if (E < w) throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` + w + `.
`);
      const p = I(E, y, R), C = o.getSymbolSize(E), T = new e(C);
      return d(T, E), N(T), v(T, E), A(T, y, 0), E >= 7 && P(T, E), M(T, p), isNaN(g) && (g = s.getBestMask(T, A.bind(null, T, y))), s.applyMask(g, T), A(T, y, g), {
        modules: T,
        version: E,
        errorCorrectionLevel: y,
        maskPattern: g,
        segments: R
      };
    }
    return et.create = function(E, y) {
      if (typeof E > "u" || E === "") throw new Error("No input text");
      let g = r.M, R, w;
      return typeof y < "u" && (g = r.from(y.errorCorrectionLevel, r.M), R = c.from(y.version), w = s.from(y.maskPattern), y.toSJISFunc && o.setToSJISFunction(y.toSJISFunc)), S(E, R, g, w);
    }, et;
  }
  var pt = {}, Bt = {}, te;
  function de() {
    return te || (te = 1, function(o) {
      function r(i) {
        if (typeof i == "number" && (i = i.toString()), typeof i != "string") throw new Error("Color should be defined as hex string");
        let e = i.slice().replace("#", "").split("");
        if (e.length < 3 || e.length === 5 || e.length > 8) throw new Error("Invalid hex color: " + i);
        (e.length === 3 || e.length === 4) && (e = Array.prototype.concat.apply([], e.map(function(n) {
          return [
            n,
            n
          ];
        }))), e.length === 6 && e.push("F", "F");
        const t = parseInt(e.join(""), 16);
        return {
          r: t >> 24 & 255,
          g: t >> 16 & 255,
          b: t >> 8 & 255,
          a: t & 255,
          hex: "#" + e.slice(0, 6).join("")
        };
      }
      o.getOptions = function(e) {
        e || (e = {}), e.color || (e.color = {});
        const t = typeof e.margin > "u" || e.margin === null || e.margin < 0 ? 4 : e.margin, n = e.width && e.width >= 21 ? e.width : void 0, s = e.scale || 4;
        return {
          width: n,
          scale: n ? 4 : s,
          margin: t,
          color: {
            dark: r(e.color.dark || "#000000ff"),
            light: r(e.color.light || "#ffffffff")
          },
          type: e.type,
          rendererOpts: e.rendererOpts || {}
        };
      }, o.getScale = function(e, t) {
        return t.width && t.width >= e + t.margin * 2 ? t.width / (e + t.margin * 2) : t.scale;
      }, o.getImageWidth = function(e, t) {
        const n = o.getScale(e, t);
        return Math.floor((e + t.margin * 2) * n);
      }, o.qrToImageData = function(e, t, n) {
        const s = t.modules.size, a = t.modules.data, u = o.getScale(s, n), c = Math.floor((s + n.margin * 2) * u), l = n.margin * u, f = [
          n.color.light,
          n.color.dark
        ];
        for (let m = 0; m < c; m++) for (let d = 0; d < c; d++) {
          let N = (m * c + d) * 4, v = n.color.light;
          if (m >= l && d >= l && m < c - l && d < c - l) {
            const P = Math.floor((m - l) / u), A = Math.floor((d - l) / u);
            v = f[a[P * s + A] ? 1 : 0];
          }
          e[N++] = v.r, e[N++] = v.g, e[N++] = v.b, e[N] = v.a;
        }
      };
    }(Bt)), Bt;
  }
  var ee;
  function $e() {
    return ee || (ee = 1, function(o) {
      const r = de();
      function i(t, n, s) {
        t.clearRect(0, 0, n.width, n.height), n.style || (n.style = {}), n.height = s, n.width = s, n.style.height = s + "px", n.style.width = s + "px";
      }
      function e() {
        try {
          return document.createElement("canvas");
        } catch {
          throw new Error("You need to specify a canvas element");
        }
      }
      o.render = function(n, s, a) {
        let u = a, c = s;
        typeof u > "u" && (!s || !s.getContext) && (u = s, s = void 0), s || (c = e()), u = r.getOptions(u);
        const l = r.getImageWidth(n.modules.size, u), f = c.getContext("2d"), m = f.createImageData(l, l);
        return r.qrToImageData(m.data, n, u), i(f, c, l), f.putImageData(m, 0, 0), c;
      }, o.renderToDataURL = function(n, s, a) {
        let u = a;
        typeof u > "u" && (!s || !s.getContext) && (u = s, s = void 0), u || (u = {});
        const c = o.render(n, s, u), l = u.type || "image/png", f = u.rendererOpts || {};
        return c.toDataURL(l, f.quality);
      };
    }(pt)), pt;
  }
  var Rt = {}, ne;
  function We() {
    if (ne) return Rt;
    ne = 1;
    const o = de();
    function r(t, n) {
      const s = t.a / 255, a = n + '="' + t.hex + '"';
      return s < 1 ? a + " " + n + '-opacity="' + s.toFixed(2).slice(1) + '"' : a;
    }
    function i(t, n, s) {
      let a = t + n;
      return typeof s < "u" && (a += " " + s), a;
    }
    function e(t, n, s) {
      let a = "", u = 0, c = false, l = 0;
      for (let f = 0; f < t.length; f++) {
        const m = Math.floor(f % n), d = Math.floor(f / n);
        !m && !c && (c = true), t[f] ? (l++, f > 0 && m > 0 && t[f - 1] || (a += c ? i("M", m + s, 0.5 + d + s) : i("m", u, 0), u = 0, c = false), m + 1 < n && t[f + 1] || (a += i("h", l), l = 0)) : u++;
      }
      return a;
    }
    return Rt.render = function(n, s, a) {
      const u = o.getOptions(s), c = n.modules.size, l = n.modules.data, f = c + u.margin * 2, m = u.color.light.a ? "<path " + r(u.color.light, "fill") + ' d="M0 0h' + f + "v" + f + 'H0z"/>' : "", d = "<path " + r(u.color.dark, "stroke") + ' d="' + e(l, c, u.margin) + '"/>', N = 'viewBox="0 0 ' + f + " " + f + '"', P = '<svg xmlns="http://www.w3.org/2000/svg" ' + (u.width ? 'width="' + u.width + '" height="' + u.width + '" ' : "") + N + ' shape-rendering="crispEdges">' + m + d + `</svg>
`;
      return typeof a == "function" && a(null, P), P;
    }, Rt;
  }
  var re;
  function Ze() {
    if (re) return H;
    re = 1;
    const o = be(), r = Qe(), i = $e(), e = We();
    function t(n, s, a, u, c) {
      const l = [].slice.call(arguments, 1), f = l.length, m = typeof l[f - 1] == "function";
      if (!m && !o()) throw new Error("Callback required as last argument");
      if (m) {
        if (f < 2) throw new Error("Too few arguments provided");
        f === 2 ? (c = a, a = s, s = u = void 0) : f === 3 && (s.getContext && typeof c > "u" ? (c = u, u = void 0) : (c = u, u = a, a = s, s = void 0));
      } else {
        if (f < 1) throw new Error("Too few arguments provided");
        return f === 1 ? (a = s, s = u = void 0) : f === 2 && !s.getContext && (u = a, a = s, s = void 0), new Promise(function(d, N) {
          try {
            const v = r.create(a, u);
            d(n(v, s, u));
          } catch (v) {
            N(v);
          }
        });
      }
      try {
        const d = r.create(a, u);
        c(null, n(d, s, u));
      } catch (d) {
        c(d);
      }
    }
    return H.create = r.create, H.toCanvas = t.bind(null, i.render), H.toDataURL = t.bind(null, i.renderToDataURL), H.toString = t.bind(null, function(n, s, a) {
      return e.render(n, a);
    }), H;
  }
  var xe = Ze();
  const Xe = Pe(xe);
  var tn = oe('<div class="flex flex-row justify-center flex-grow w-full h-full"><div class="inline-block h-6 w-6 animate-spin"><!></div></div> <canvas></canvas>', 1);
  function en(o, r) {
    se(r, true);
    let i = Be(r, "size", 3, 256), e = Mt(void 0), t = Mt(false);
    we(() => {
      x(t, true), Xe.toCanvas(K(e), r.text, (f) => {
        f && console.error(f), x(t, false);
      });
    });
    var n = tn(), s = Ce(n), a = U(s), u = U(a);
    Te(u, {}), F(a), F(s);
    var c = ue(s, 2);
    let l;
    Me(c, (f) => x(e, f), () => K(e)), At((f) => {
      s.hidden = !K(t), X(c, "title", r.text), l = Ne(c, 1, "w-full h-full", null, l, f), X(c, "width", i()), X(c, "height", i()), ve(c, `width:${i() ?? ""}px;height:${i() ?? ""}px;`);
    }, [
      () => ({
        hidden: K(t)
      })
    ]), ie(o, n), ae();
  }
  var nn = oe('<div class="container mx-auto p-4"><div class="card flex flex-col"><div><h1> </h1></div> <div class="flex flex-row justify-center"><!></div></div></div>');
  hn = function(o, r) {
    se(r, true);
    let i = Ee(() => Y.username && Y.documentId ? `${Se()}${Ie}/sync?username=${encodeURIComponent(Y.username)}&userDocumentId=${encodeURIComponent(Y.documentId)}` : null);
    var e = nn();
    Ae((f) => {
      At((m) => ye.title = m, [
        () => Pt()
      ]);
    });
    var t = U(e), n = U(t), s = U(n), a = U(s, true);
    F(s), F(n);
    var u = ue(n, 2), c = U(u);
    {
      var l = (f) => {
        en(f, {
          get text() {
            return K(i);
          },
          size: 1024
        });
      };
      Re(c, (f) => {
        K(i) && f(l);
      });
    }
    F(u), F(t), F(e), At((f) => pe(a, f), [
      () => Pt()
    ]), ie(o, e), ae();
  };
});
export {
  __tla,
  hn as component
};
