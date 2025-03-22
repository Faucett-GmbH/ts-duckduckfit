import { t as X, a as Z } from "../chunks/B6QkkUhs.js";
import { p as kt, N as be, v as V, l as x, m as M, f as Te, c as L, r as D, s as k, t as ot, a as Ft, o as Lt, $ as Pe } from "../chunks/DjXzb9G0.js";
import { d as Me, s as rt, e as Le } from "../chunks/4bD7ekPS.js";
import { p as Dt, i as qt } from "../chunks/uaSa8DrZ.js";
import { h as De } from "../chunks/D4G7nJdS.js";
import { p as W } from "../chunks/CLjcMQip.js";
import { b as qe } from "../chunks/jfqPQL2J.js";
import { w as Ue, x as ke, y as Fe, z as ze, A as Ve, h as He, f as Kt, p as Jt, B as Ke, C as Je, u as et, __tla as __tla_0 } from "../chunks/rhqxRTuo.js";
import { L as Re, s as it, a as Ut, g as je, d as Oe, r as jt } from "../chunks/CYItWnOs.js";
import { b as Ye } from "../chunks/RR2e1Zde.js";
import "../chunks/KzIwl7iM.js";
import { G as Ge, I as Ot, b as Yt, a as xe, m as Qe, C as Gt, v as xt } from "../chunks/tpoyokEn.js";
let Hn;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  var G = {}, ct, Qt;
  function $e() {
    return Qt || (Qt = 1, ct = function() {
      return typeof Promise == "function" && Promise.prototype && Promise.prototype.then;
    }), ct;
  }
  var ft = {}, H = {}, $t;
  function K() {
    if ($t) return H;
    $t = 1;
    let i;
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
    return H.getSymbolSize = function(e) {
      if (!e) throw new Error('"version" cannot be null or undefined');
      if (e < 1 || e > 40) throw new Error('"version" should be in range from 1 to 40');
      return e * 4 + 17;
    }, H.getSymbolTotalCodewords = function(e) {
      return r[e];
    }, H.getBCHDigit = function(o) {
      let e = 0;
      for (; o !== 0; ) e++, o >>>= 1;
      return e;
    }, H.setToSJISFunction = function(e) {
      if (typeof e != "function") throw new Error('"toSJISFunc" is not a valid function.');
      i = e;
    }, H.isKanjiModeEnabled = function() {
      return typeof i < "u";
    }, H.toSJIS = function(e) {
      return i(e);
    }, H;
  }
  var dt = {}, Wt;
  function zt() {
    return Wt || (Wt = 1, function(i) {
      i.L = {
        bit: 1
      }, i.M = {
        bit: 0
      }, i.Q = {
        bit: 3
      }, i.H = {
        bit: 2
      };
      function r(o) {
        if (typeof o != "string") throw new Error("Param is not a string");
        switch (o.toLowerCase()) {
          case "l":
          case "low":
            return i.L;
          case "m":
          case "medium":
            return i.M;
          case "q":
          case "quartile":
            return i.Q;
          case "h":
          case "high":
            return i.H;
          default:
            throw new Error("Unknown EC Level: " + o);
        }
      }
      i.isValid = function(e) {
        return e && typeof e.bit < "u" && e.bit >= 0 && e.bit < 4;
      }, i.from = function(e, t) {
        if (i.isValid(e)) return e;
        try {
          return r(e);
        } catch {
          return t;
        }
      };
    }(dt)), dt;
  }
  var ht, Zt;
  function We() {
    if (Zt) return ht;
    Zt = 1;
    function i() {
      this.buffer = [], this.length = 0;
    }
    return i.prototype = {
      get: function(r) {
        const o = Math.floor(r / 8);
        return (this.buffer[o] >>> 7 - r % 8 & 1) === 1;
      },
      put: function(r, o) {
        for (let e = 0; e < o; e++) this.putBit((r >>> o - e - 1 & 1) === 1);
      },
      getLengthInBits: function() {
        return this.length;
      },
      putBit: function(r) {
        const o = Math.floor(this.length / 8);
        this.buffer.length <= o && this.buffer.push(0), r && (this.buffer[o] |= 128 >>> this.length % 8), this.length++;
      }
    }, ht = i, ht;
  }
  var gt, Xt;
  function Ze() {
    if (Xt) return gt;
    Xt = 1;
    function i(r) {
      if (!r || r < 1) throw new Error("BitMatrix size must be defined and greater than 0");
      this.size = r, this.data = new Uint8Array(r * r), this.reservedBit = new Uint8Array(r * r);
    }
    return i.prototype.set = function(r, o, e, t) {
      const n = r * this.size + o;
      this.data[n] = e, t && (this.reservedBit[n] = true);
    }, i.prototype.get = function(r, o) {
      return this.data[r * this.size + o];
    }, i.prototype.xor = function(r, o, e) {
      this.data[r * this.size + o] ^= e;
    }, i.prototype.isReserved = function(r, o) {
      return this.reservedBit[r * this.size + o];
    }, gt = i, gt;
  }
  var mt = {}, te;
  function Xe() {
    return te || (te = 1, function(i) {
      const r = K().getSymbolSize;
      i.getRowColCoords = function(e) {
        if (e === 1) return [];
        const t = Math.floor(e / 7) + 2, n = r(e), a = n === 145 ? 26 : Math.ceil((n - 13) / (2 * t - 2)) * 2, s = [
          n - 7
        ];
        for (let u = 1; u < t - 1; u++) s[u] = s[u - 1] - a;
        return s.push(6), s.reverse();
      }, i.getPositions = function(e) {
        const t = [], n = i.getRowColCoords(e), a = n.length;
        for (let s = 0; s < a; s++) for (let u = 0; u < a; u++) s === 0 && u === 0 || s === 0 && u === a - 1 || s === a - 1 && u === 0 || t.push([
          n[s],
          n[u]
        ]);
        return t;
      };
    }(mt)), mt;
  }
  var wt = {}, ee;
  function tn() {
    if (ee) return wt;
    ee = 1;
    const i = K().getSymbolSize, r = 7;
    return wt.getPositions = function(e) {
      const t = i(e);
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
    }, wt;
  }
  var pt = {}, ne;
  function en() {
    return ne || (ne = 1, function(i) {
      i.Patterns = {
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
      i.isValid = function(t) {
        return t != null && t !== "" && !isNaN(t) && t >= 0 && t <= 7;
      }, i.from = function(t) {
        return i.isValid(t) ? parseInt(t, 10) : void 0;
      }, i.getPenaltyN1 = function(t) {
        const n = t.size;
        let a = 0, s = 0, u = 0, l = null, c = null;
        for (let g = 0; g < n; g++) {
          s = u = 0, l = c = null;
          for (let w = 0; w < n; w++) {
            let f = t.get(g, w);
            f === l ? s++ : (s >= 5 && (a += r.N1 + (s - 5)), l = f, s = 1), f = t.get(w, g), f === c ? u++ : (u >= 5 && (a += r.N1 + (u - 5)), c = f, u = 1);
          }
          s >= 5 && (a += r.N1 + (s - 5)), u >= 5 && (a += r.N1 + (u - 5));
        }
        return a;
      }, i.getPenaltyN2 = function(t) {
        const n = t.size;
        let a = 0;
        for (let s = 0; s < n - 1; s++) for (let u = 0; u < n - 1; u++) {
          const l = t.get(s, u) + t.get(s, u + 1) + t.get(s + 1, u) + t.get(s + 1, u + 1);
          (l === 4 || l === 0) && a++;
        }
        return a * r.N2;
      }, i.getPenaltyN3 = function(t) {
        const n = t.size;
        let a = 0, s = 0, u = 0;
        for (let l = 0; l < n; l++) {
          s = u = 0;
          for (let c = 0; c < n; c++) s = s << 1 & 2047 | t.get(l, c), c >= 10 && (s === 1488 || s === 93) && a++, u = u << 1 & 2047 | t.get(c, l), c >= 10 && (u === 1488 || u === 93) && a++;
        }
        return a * r.N3;
      }, i.getPenaltyN4 = function(t) {
        let n = 0;
        const a = t.data.length;
        for (let u = 0; u < a; u++) n += t.data[u];
        return Math.abs(Math.ceil(n * 100 / a / 5) - 10) * r.N4;
      };
      function o(e, t, n) {
        switch (e) {
          case i.Patterns.PATTERN000:
            return (t + n) % 2 === 0;
          case i.Patterns.PATTERN001:
            return t % 2 === 0;
          case i.Patterns.PATTERN010:
            return n % 3 === 0;
          case i.Patterns.PATTERN011:
            return (t + n) % 3 === 0;
          case i.Patterns.PATTERN100:
            return (Math.floor(t / 2) + Math.floor(n / 3)) % 2 === 0;
          case i.Patterns.PATTERN101:
            return t * n % 2 + t * n % 3 === 0;
          case i.Patterns.PATTERN110:
            return (t * n % 2 + t * n % 3) % 2 === 0;
          case i.Patterns.PATTERN111:
            return (t * n % 3 + (t + n) % 2) % 2 === 0;
          default:
            throw new Error("bad maskPattern:" + e);
        }
      }
      i.applyMask = function(t, n) {
        const a = n.size;
        for (let s = 0; s < a; s++) for (let u = 0; u < a; u++) n.isReserved(u, s) || n.xor(u, s, o(t, u, s));
      }, i.getBestMask = function(t, n) {
        const a = Object.keys(i.Patterns).length;
        let s = 0, u = 1 / 0;
        for (let l = 0; l < a; l++) {
          n(l), i.applyMask(l, t);
          const c = i.getPenaltyN1(t) + i.getPenaltyN2(t) + i.getPenaltyN3(t) + i.getPenaltyN4(t);
          i.applyMask(l, t), c < u && (u = c, s = l);
        }
        return s;
      };
    }(pt)), pt;
  }
  var nt = {}, re;
  function Ae() {
    if (re) return nt;
    re = 1;
    const i = zt(), r = [
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
    ], o = [
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
    return nt.getBlocksCount = function(t, n) {
      switch (n) {
        case i.L:
          return r[(t - 1) * 4 + 0];
        case i.M:
          return r[(t - 1) * 4 + 1];
        case i.Q:
          return r[(t - 1) * 4 + 2];
        case i.H:
          return r[(t - 1) * 4 + 3];
        default:
          return;
      }
    }, nt.getTotalCodewordsCount = function(t, n) {
      switch (n) {
        case i.L:
          return o[(t - 1) * 4 + 0];
        case i.M:
          return o[(t - 1) * 4 + 1];
        case i.Q:
          return o[(t - 1) * 4 + 2];
        case i.H:
          return o[(t - 1) * 4 + 3];
        default:
          return;
      }
    }, nt;
  }
  var yt = {}, $ = {}, ie;
  function nn() {
    if (ie) return $;
    ie = 1;
    const i = new Uint8Array(512), r = new Uint8Array(256);
    return function() {
      let e = 1;
      for (let t = 0; t < 255; t++) i[t] = e, r[e] = t, e <<= 1, e & 256 && (e ^= 285);
      for (let t = 255; t < 512; t++) i[t] = i[t - 255];
    }(), $.log = function(e) {
      if (e < 1) throw new Error("log(" + e + ")");
      return r[e];
    }, $.exp = function(e) {
      return i[e];
    }, $.mul = function(e, t) {
      return e === 0 || t === 0 ? 0 : i[r[e] + r[t]];
    }, $;
  }
  var oe;
  function rn() {
    return oe || (oe = 1, function(i) {
      const r = nn();
      i.mul = function(e, t) {
        const n = new Uint8Array(e.length + t.length - 1);
        for (let a = 0; a < e.length; a++) for (let s = 0; s < t.length; s++) n[a + s] ^= r.mul(e[a], t[s]);
        return n;
      }, i.mod = function(e, t) {
        let n = new Uint8Array(e);
        for (; n.length - t.length >= 0; ) {
          const a = n[0];
          for (let u = 0; u < t.length; u++) n[u] ^= r.mul(t[u], a);
          let s = 0;
          for (; s < n.length && n[s] === 0; ) s++;
          n = n.slice(s);
        }
        return n;
      }, i.generateECPolynomial = function(e) {
        let t = new Uint8Array([
          1
        ]);
        for (let n = 0; n < e; n++) t = i.mul(t, new Uint8Array([
          1,
          r.exp(n)
        ]));
        return t;
      };
    }(yt)), yt;
  }
  var Ct, ae;
  function on() {
    if (ae) return Ct;
    ae = 1;
    const i = rn();
    function r(o) {
      this.genPoly = void 0, this.degree = o, this.degree && this.initialize(this.degree);
    }
    return r.prototype.initialize = function(e) {
      this.degree = e, this.genPoly = i.generateECPolynomial(this.degree);
    }, r.prototype.encode = function(e) {
      if (!this.genPoly) throw new Error("Encoder not initialized");
      const t = new Uint8Array(e.length + this.degree);
      t.set(e);
      const n = i.mod(t, this.genPoly), a = this.degree - n.length;
      if (a > 0) {
        const s = new Uint8Array(this.degree);
        return s.set(n, a), s;
      }
      return n;
    }, Ct = r, Ct;
  }
  var Et = {}, vt = {}, Bt = {}, se;
  function Ie() {
    return se || (se = 1, Bt.isValid = function(r) {
      return !isNaN(r) && r >= 1 && r <= 40;
    }), Bt;
  }
  var U = {}, ue;
  function _e() {
    if (ue) return U;
    ue = 1;
    const i = "[0-9]+", r = "[A-Z $%*+\\-./:]+";
    let o = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
    o = o.replace(/u/g, "\\u");
    const e = "(?:(?![A-Z0-9 $%*+\\-./:]|" + o + `)(?:.|[\r
]))+`;
    U.KANJI = new RegExp(o, "g"), U.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g"), U.BYTE = new RegExp(e, "g"), U.NUMERIC = new RegExp(i, "g"), U.ALPHANUMERIC = new RegExp(r, "g");
    const t = new RegExp("^" + o + "$"), n = new RegExp("^" + i + "$"), a = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
    return U.testKanji = function(u) {
      return t.test(u);
    }, U.testNumeric = function(u) {
      return n.test(u);
    }, U.testAlphanumeric = function(u) {
      return a.test(u);
    }, U;
  }
  var le;
  function J() {
    return le || (le = 1, function(i) {
      const r = Ie(), o = _e();
      i.NUMERIC = {
        id: "Numeric",
        bit: 1,
        ccBits: [
          10,
          12,
          14
        ]
      }, i.ALPHANUMERIC = {
        id: "Alphanumeric",
        bit: 2,
        ccBits: [
          9,
          11,
          13
        ]
      }, i.BYTE = {
        id: "Byte",
        bit: 4,
        ccBits: [
          8,
          16,
          16
        ]
      }, i.KANJI = {
        id: "Kanji",
        bit: 8,
        ccBits: [
          8,
          10,
          12
        ]
      }, i.MIXED = {
        bit: -1
      }, i.getCharCountIndicator = function(n, a) {
        if (!n.ccBits) throw new Error("Invalid mode: " + n);
        if (!r.isValid(a)) throw new Error("Invalid version: " + a);
        return a >= 1 && a < 10 ? n.ccBits[0] : a < 27 ? n.ccBits[1] : n.ccBits[2];
      }, i.getBestModeForData = function(n) {
        return o.testNumeric(n) ? i.NUMERIC : o.testAlphanumeric(n) ? i.ALPHANUMERIC : o.testKanji(n) ? i.KANJI : i.BYTE;
      }, i.toString = function(n) {
        if (n && n.id) return n.id;
        throw new Error("Invalid mode");
      }, i.isValid = function(n) {
        return n && n.bit && n.ccBits;
      };
      function e(t) {
        if (typeof t != "string") throw new Error("Param is not a string");
        switch (t.toLowerCase()) {
          case "numeric":
            return i.NUMERIC;
          case "alphanumeric":
            return i.ALPHANUMERIC;
          case "kanji":
            return i.KANJI;
          case "byte":
            return i.BYTE;
          default:
            throw new Error("Unknown mode: " + t);
        }
      }
      i.from = function(n, a) {
        if (i.isValid(n)) return n;
        try {
          return e(n);
        } catch {
          return a;
        }
      };
    }(vt)), vt;
  }
  var ce;
  function an() {
    return ce || (ce = 1, function(i) {
      const r = K(), o = Ae(), e = zt(), t = J(), n = Ie(), a = 7973, s = r.getBCHDigit(a);
      function u(w, f, I) {
        for (let m = 1; m <= 40; m++) if (f <= i.getCapacity(m, I, w)) return m;
      }
      function l(w, f) {
        return t.getCharCountIndicator(w, f) + 4;
      }
      function c(w, f) {
        let I = 0;
        return w.forEach(function(m) {
          const N = l(m.mode, f);
          I += N + m.getBitsLength();
        }), I;
      }
      function g(w, f) {
        for (let I = 1; I <= 40; I++) if (c(w, I) <= i.getCapacity(I, f, t.MIXED)) return I;
      }
      i.from = function(f, I) {
        return n.isValid(f) ? parseInt(f, 10) : I;
      }, i.getCapacity = function(f, I, m) {
        if (!n.isValid(f)) throw new Error("Invalid QR Code version");
        typeof m > "u" && (m = t.BYTE);
        const N = r.getSymbolTotalCodewords(f), C = o.getTotalCodewordsCount(f, I), S = (N - C) * 8;
        if (m === t.MIXED) return S;
        const B = S - l(m, f);
        switch (m) {
          case t.NUMERIC:
            return Math.floor(B / 10 * 3);
          case t.ALPHANUMERIC:
            return Math.floor(B / 11 * 2);
          case t.KANJI:
            return Math.floor(B / 13);
          case t.BYTE:
          default:
            return Math.floor(B / 8);
        }
      }, i.getBestVersionForData = function(f, I) {
        let m;
        const N = e.from(I, e.M);
        if (Array.isArray(f)) {
          if (f.length > 1) return g(f, N);
          if (f.length === 0) return 1;
          m = f[0];
        } else m = f;
        return u(m.mode, m.getLength(), N);
      }, i.getEncodedBits = function(f) {
        if (!n.isValid(f) || f < 7) throw new Error("Invalid QR Code version");
        let I = f << 12;
        for (; r.getBCHDigit(I) - s >= 0; ) I ^= a << r.getBCHDigit(I) - s;
        return f << 12 | I;
      };
    }(Et)), Et;
  }
  var bt = {}, fe;
  function sn() {
    if (fe) return bt;
    fe = 1;
    const i = K(), r = 1335, o = 21522, e = i.getBCHDigit(r);
    return bt.getEncodedBits = function(n, a) {
      const s = n.bit << 3 | a;
      let u = s << 10;
      for (; i.getBCHDigit(u) - e >= 0; ) u ^= r << i.getBCHDigit(u) - e;
      return (s << 10 | u) ^ o;
    }, bt;
  }
  var Rt = {}, At, de;
  function un() {
    if (de) return At;
    de = 1;
    const i = J();
    function r(o) {
      this.mode = i.NUMERIC, this.data = o.toString();
    }
    return r.getBitsLength = function(e) {
      return 10 * Math.floor(e / 3) + (e % 3 ? e % 3 * 3 + 1 : 0);
    }, r.prototype.getLength = function() {
      return this.data.length;
    }, r.prototype.getBitsLength = function() {
      return r.getBitsLength(this.data.length);
    }, r.prototype.write = function(e) {
      let t, n, a;
      for (t = 0; t + 3 <= this.data.length; t += 3) n = this.data.substr(t, 3), a = parseInt(n, 10), e.put(a, 10);
      const s = this.data.length - t;
      s > 0 && (n = this.data.substr(t), a = parseInt(n, 10), e.put(a, s * 3 + 1));
    }, At = r, At;
  }
  var It, he;
  function ln() {
    if (he) return It;
    he = 1;
    const i = J(), r = [
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
    function o(e) {
      this.mode = i.ALPHANUMERIC, this.data = e;
    }
    return o.getBitsLength = function(t) {
      return 11 * Math.floor(t / 2) + 6 * (t % 2);
    }, o.prototype.getLength = function() {
      return this.data.length;
    }, o.prototype.getBitsLength = function() {
      return o.getBitsLength(this.data.length);
    }, o.prototype.write = function(t) {
      let n;
      for (n = 0; n + 2 <= this.data.length; n += 2) {
        let a = r.indexOf(this.data[n]) * 45;
        a += r.indexOf(this.data[n + 1]), t.put(a, 11);
      }
      this.data.length % 2 && t.put(r.indexOf(this.data[n]), 6);
    }, It = o, It;
  }
  var _t, ge;
  function cn() {
    if (ge) return _t;
    ge = 1;
    const i = J();
    function r(o) {
      this.mode = i.BYTE, typeof o == "string" ? this.data = new TextEncoder().encode(o) : this.data = new Uint8Array(o);
    }
    return r.getBitsLength = function(e) {
      return e * 8;
    }, r.prototype.getLength = function() {
      return this.data.length;
    }, r.prototype.getBitsLength = function() {
      return r.getBitsLength(this.data.length);
    }, r.prototype.write = function(o) {
      for (let e = 0, t = this.data.length; e < t; e++) o.put(this.data[e], 8);
    }, _t = r, _t;
  }
  var St, me;
  function fn() {
    if (me) return St;
    me = 1;
    const i = J(), r = K();
    function o(e) {
      this.mode = i.KANJI, this.data = e;
    }
    return o.getBitsLength = function(t) {
      return t * 13;
    }, o.prototype.getLength = function() {
      return this.data.length;
    }, o.prototype.getBitsLength = function() {
      return o.getBitsLength(this.data.length);
    }, o.prototype.write = function(e) {
      let t;
      for (t = 0; t < this.data.length; t++) {
        let n = r.toSJIS(this.data[t]);
        if (n >= 33088 && n <= 40956) n -= 33088;
        else if (n >= 57408 && n <= 60351) n -= 49472;
        else throw new Error("Invalid SJIS character: " + this.data[t] + `
Make sure your charset is UTF-8`);
        n = (n >>> 8 & 255) * 192 + (n & 255), e.put(n, 13);
      }
    }, St = o, St;
  }
  var Nt = {
    exports: {}
  }, we;
  function dn() {
    return we || (we = 1, function(i) {
      var r = {
        single_source_shortest_paths: function(o, e, t) {
          var n = {}, a = {};
          a[e] = 0;
          var s = r.PriorityQueue.make();
          s.push(e, 0);
          for (var u, l, c, g, w, f, I, m, N; !s.empty(); ) {
            u = s.pop(), l = u.value, g = u.cost, w = o[l] || {};
            for (c in w) w.hasOwnProperty(c) && (f = w[c], I = g + f, m = a[c], N = typeof a[c] > "u", (N || m > I) && (a[c] = I, s.push(c, I), n[c] = l));
          }
          if (typeof t < "u" && typeof a[t] > "u") {
            var C = [
              "Could not find a path from ",
              e,
              " to ",
              t,
              "."
            ].join("");
            throw new Error(C);
          }
          return n;
        },
        extract_shortest_path_from_predecessor_list: function(o, e) {
          for (var t = [], n = e; n; ) t.push(n), o[n], n = o[n];
          return t.reverse(), t;
        },
        find_path: function(o, e, t) {
          var n = r.single_source_shortest_paths(o, e, t);
          return r.extract_shortest_path_from_predecessor_list(n, t);
        },
        PriorityQueue: {
          make: function(o) {
            var e = r.PriorityQueue, t = {}, n;
            o = o || {};
            for (n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
            return t.queue = [], t.sorter = o.sorter || e.default_sorter, t;
          },
          default_sorter: function(o, e) {
            return o.cost - e.cost;
          },
          push: function(o, e) {
            var t = {
              value: o,
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
      i.exports = r;
    }(Nt)), Nt.exports;
  }
  var pe;
  function hn() {
    return pe || (pe = 1, function(i) {
      const r = J(), o = un(), e = ln(), t = cn(), n = fn(), a = _e(), s = K(), u = dn();
      function l(C) {
        return unescape(encodeURIComponent(C)).length;
      }
      function c(C, S, B) {
        const A = [];
        let T;
        for (; (T = C.exec(B)) !== null; ) A.push({
          data: T[0],
          index: T.index,
          mode: S,
          length: T[0].length
        });
        return A;
      }
      function g(C) {
        const S = c(a.NUMERIC, r.NUMERIC, C), B = c(a.ALPHANUMERIC, r.ALPHANUMERIC, C);
        let A, T;
        return s.isKanjiModeEnabled() ? (A = c(a.BYTE, r.BYTE, C), T = c(a.KANJI, r.KANJI, C)) : (A = c(a.BYTE_KANJI, r.BYTE, C), T = []), S.concat(B, A, T).sort(function(b, p) {
          return b.index - p.index;
        }).map(function(b) {
          return {
            data: b.data,
            mode: b.mode,
            length: b.length
          };
        });
      }
      function w(C, S) {
        switch (S) {
          case r.NUMERIC:
            return o.getBitsLength(C);
          case r.ALPHANUMERIC:
            return e.getBitsLength(C);
          case r.KANJI:
            return n.getBitsLength(C);
          case r.BYTE:
            return t.getBitsLength(C);
        }
      }
      function f(C) {
        return C.reduce(function(S, B) {
          const A = S.length - 1 >= 0 ? S[S.length - 1] : null;
          return A && A.mode === B.mode ? (S[S.length - 1].data += B.data, S) : (S.push(B), S);
        }, []);
      }
      function I(C) {
        const S = [];
        for (let B = 0; B < C.length; B++) {
          const A = C[B];
          switch (A.mode) {
            case r.NUMERIC:
              S.push([
                A,
                {
                  data: A.data,
                  mode: r.ALPHANUMERIC,
                  length: A.length
                },
                {
                  data: A.data,
                  mode: r.BYTE,
                  length: A.length
                }
              ]);
              break;
            case r.ALPHANUMERIC:
              S.push([
                A,
                {
                  data: A.data,
                  mode: r.BYTE,
                  length: A.length
                }
              ]);
              break;
            case r.KANJI:
              S.push([
                A,
                {
                  data: A.data,
                  mode: r.BYTE,
                  length: l(A.data)
                }
              ]);
              break;
            case r.BYTE:
              S.push([
                {
                  data: A.data,
                  mode: r.BYTE,
                  length: l(A.data)
                }
              ]);
          }
        }
        return S;
      }
      function m(C, S) {
        const B = {}, A = {
          start: {}
        };
        let T = [
          "start"
        ];
        for (let d = 0; d < C.length; d++) {
          const b = C[d], p = [];
          for (let h = 0; h < b.length; h++) {
            const R = b[h], y = "" + d + h;
            p.push(y), B[y] = {
              node: R,
              lastCount: 0
            }, A[y] = {};
            for (let v = 0; v < T.length; v++) {
              const E = T[v];
              B[E] && B[E].node.mode === R.mode ? (A[E][y] = w(B[E].lastCount + R.length, R.mode) - w(B[E].lastCount, R.mode), B[E].lastCount += R.length) : (B[E] && (B[E].lastCount = R.length), A[E][y] = w(R.length, R.mode) + 4 + r.getCharCountIndicator(R.mode, S));
            }
          }
          T = p;
        }
        for (let d = 0; d < T.length; d++) A[T[d]].end = 0;
        return {
          map: A,
          table: B
        };
      }
      function N(C, S) {
        let B;
        const A = r.getBestModeForData(C);
        if (B = r.from(S, A), B !== r.BYTE && B.bit < A.bit) throw new Error('"' + C + '" cannot be encoded with mode ' + r.toString(B) + `.
 Suggested mode is: ` + r.toString(A));
        switch (B === r.KANJI && !s.isKanjiModeEnabled() && (B = r.BYTE), B) {
          case r.NUMERIC:
            return new o(C);
          case r.ALPHANUMERIC:
            return new e(C);
          case r.KANJI:
            return new n(C);
          case r.BYTE:
            return new t(C);
        }
      }
      i.fromArray = function(S) {
        return S.reduce(function(B, A) {
          return typeof A == "string" ? B.push(N(A, null)) : A.data && B.push(N(A.data, A.mode)), B;
        }, []);
      }, i.fromString = function(S, B) {
        const A = g(S, s.isKanjiModeEnabled()), T = I(A), d = m(T, B), b = u.find_path(d.map, "start", "end"), p = [];
        for (let h = 1; h < b.length - 1; h++) p.push(d.table[b[h]].node);
        return i.fromArray(f(p));
      }, i.rawSplit = function(S) {
        return i.fromArray(g(S, s.isKanjiModeEnabled()));
      };
    }(Rt)), Rt;
  }
  var ye;
  function gn() {
    if (ye) return ft;
    ye = 1;
    const i = K(), r = zt(), o = We(), e = Ze(), t = Xe(), n = tn(), a = en(), s = Ae(), u = on(), l = an(), c = sn(), g = J(), w = hn();
    function f(d, b) {
      const p = d.size, h = n.getPositions(b);
      for (let R = 0; R < h.length; R++) {
        const y = h[R][0], v = h[R][1];
        for (let E = -1; E <= 7; E++) if (!(y + E <= -1 || p <= y + E)) for (let _ = -1; _ <= 7; _++) v + _ <= -1 || p <= v + _ || (E >= 0 && E <= 6 && (_ === 0 || _ === 6) || _ >= 0 && _ <= 6 && (E === 0 || E === 6) || E >= 2 && E <= 4 && _ >= 2 && _ <= 4 ? d.set(y + E, v + _, true, true) : d.set(y + E, v + _, false, true));
      }
    }
    function I(d) {
      const b = d.size;
      for (let p = 8; p < b - 8; p++) {
        const h = p % 2 === 0;
        d.set(p, 6, h, true), d.set(6, p, h, true);
      }
    }
    function m(d, b) {
      const p = t.getPositions(b);
      for (let h = 0; h < p.length; h++) {
        const R = p[h][0], y = p[h][1];
        for (let v = -2; v <= 2; v++) for (let E = -2; E <= 2; E++) v === -2 || v === 2 || E === -2 || E === 2 || v === 0 && E === 0 ? d.set(R + v, y + E, true, true) : d.set(R + v, y + E, false, true);
      }
    }
    function N(d, b) {
      const p = d.size, h = l.getEncodedBits(b);
      let R, y, v;
      for (let E = 0; E < 18; E++) R = Math.floor(E / 3), y = E % 3 + p - 8 - 3, v = (h >> E & 1) === 1, d.set(R, y, v, true), d.set(y, R, v, true);
    }
    function C(d, b, p) {
      const h = d.size, R = c.getEncodedBits(b, p);
      let y, v;
      for (y = 0; y < 15; y++) v = (R >> y & 1) === 1, y < 6 ? d.set(y, 8, v, true) : y < 8 ? d.set(y + 1, 8, v, true) : d.set(h - 15 + y, 8, v, true), y < 8 ? d.set(8, h - y - 1, v, true) : y < 9 ? d.set(8, 15 - y - 1 + 1, v, true) : d.set(8, 15 - y - 1, v, true);
      d.set(h - 8, 8, 1, true);
    }
    function S(d, b) {
      const p = d.size;
      let h = -1, R = p - 1, y = 7, v = 0;
      for (let E = p - 1; E > 0; E -= 2) for (E === 6 && E--; ; ) {
        for (let _ = 0; _ < 2; _++) if (!d.isReserved(R, E - _)) {
          let P = false;
          v < b.length && (P = (b[v] >>> y & 1) === 1), d.set(R, E - _, P), y--, y === -1 && (v++, y = 7);
        }
        if (R += h, R < 0 || p <= R) {
          R -= h, h = -h;
          break;
        }
      }
    }
    function B(d, b, p) {
      const h = new o();
      p.forEach(function(_) {
        h.put(_.mode.bit, 4), h.put(_.getLength(), g.getCharCountIndicator(_.mode, d)), _.write(h);
      });
      const R = i.getSymbolTotalCodewords(d), y = s.getTotalCodewordsCount(d, b), v = (R - y) * 8;
      for (h.getLengthInBits() + 4 <= v && h.put(0, 4); h.getLengthInBits() % 8 !== 0; ) h.putBit(0);
      const E = (v - h.getLengthInBits()) / 8;
      for (let _ = 0; _ < E; _++) h.put(_ % 2 ? 17 : 236, 8);
      return A(h, d, b);
    }
    function A(d, b, p) {
      const h = i.getSymbolTotalCodewords(b), R = s.getTotalCodewordsCount(b, p), y = h - R, v = s.getBlocksCount(b, p), E = h % v, _ = v - E, P = Math.floor(h / v), q = Math.floor(y / v), j = q + 1, O = P - q, at = new u(O);
      let Q = 0;
      const tt = new Array(v), Vt = new Array(v);
      let st = 0;
      const Ne = new Uint8Array(d.buffer);
      for (let Y = 0; Y < v; Y++) {
        const lt = Y < _ ? q : j;
        tt[Y] = Ne.slice(Q, Q + lt), Vt[Y] = at.encode(tt[Y]), Q += lt, st = Math.max(st, lt);
      }
      const ut = new Uint8Array(h);
      let Ht = 0, F, z;
      for (F = 0; F < st; F++) for (z = 0; z < v; z++) F < tt[z].length && (ut[Ht++] = tt[z][F]);
      for (F = 0; F < O; F++) for (z = 0; z < v; z++) ut[Ht++] = Vt[z][F];
      return ut;
    }
    function T(d, b, p, h) {
      let R;
      if (Array.isArray(d)) R = w.fromArray(d);
      else if (typeof d == "string") {
        let P = b;
        if (!P) {
          const q = w.rawSplit(d);
          P = l.getBestVersionForData(q, p);
        }
        R = w.fromString(d, P || 40);
      } else throw new Error("Invalid data");
      const y = l.getBestVersionForData(R, p);
      if (!y) throw new Error("The amount of data is too big to be stored in a QR Code");
      if (!b) b = y;
      else if (b < y) throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` + y + `.
`);
      const v = B(b, p, R), E = i.getSymbolSize(b), _ = new e(E);
      return f(_, b), I(_), m(_, b), C(_, p, 0), b >= 7 && N(_, b), S(_, v), isNaN(h) && (h = a.getBestMask(_, C.bind(null, _, p))), a.applyMask(h, _), C(_, p, h), {
        modules: _,
        version: b,
        errorCorrectionLevel: p,
        maskPattern: h,
        segments: R
      };
    }
    return ft.create = function(b, p) {
      if (typeof b > "u" || b === "") throw new Error("No input text");
      let h = r.M, R, y;
      return typeof p < "u" && (h = r.from(p.errorCorrectionLevel, r.M), R = l.from(p.version), y = a.from(p.maskPattern), p.toSJISFunc && i.setToSJISFunction(p.toSJISFunc)), T(b, R, h, y);
    }, ft;
  }
  var Tt = {}, Pt = {}, Ce;
  function Se() {
    return Ce || (Ce = 1, function(i) {
      function r(o) {
        if (typeof o == "number" && (o = o.toString()), typeof o != "string") throw new Error("Color should be defined as hex string");
        let e = o.slice().replace("#", "").split("");
        if (e.length < 3 || e.length === 5 || e.length > 8) throw new Error("Invalid hex color: " + o);
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
      i.getOptions = function(e) {
        e || (e = {}), e.color || (e.color = {});
        const t = typeof e.margin > "u" || e.margin === null || e.margin < 0 ? 4 : e.margin, n = e.width && e.width >= 21 ? e.width : void 0, a = e.scale || 4;
        return {
          width: n,
          scale: n ? 4 : a,
          margin: t,
          color: {
            dark: r(e.color.dark || "#000000ff"),
            light: r(e.color.light || "#ffffffff")
          },
          type: e.type,
          rendererOpts: e.rendererOpts || {}
        };
      }, i.getScale = function(e, t) {
        return t.width && t.width >= e + t.margin * 2 ? t.width / (e + t.margin * 2) : t.scale;
      }, i.getImageWidth = function(e, t) {
        const n = i.getScale(e, t);
        return Math.floor((e + t.margin * 2) * n);
      }, i.qrToImageData = function(e, t, n) {
        const a = t.modules.size, s = t.modules.data, u = i.getScale(a, n), l = Math.floor((a + n.margin * 2) * u), c = n.margin * u, g = [
          n.color.light,
          n.color.dark
        ];
        for (let w = 0; w < l; w++) for (let f = 0; f < l; f++) {
          let I = (w * l + f) * 4, m = n.color.light;
          if (w >= c && f >= c && w < l - c && f < l - c) {
            const N = Math.floor((w - c) / u), C = Math.floor((f - c) / u);
            m = g[s[N * a + C] ? 1 : 0];
          }
          e[I++] = m.r, e[I++] = m.g, e[I++] = m.b, e[I] = m.a;
        }
      };
    }(Pt)), Pt;
  }
  var Ee;
  function mn() {
    return Ee || (Ee = 1, function(i) {
      const r = Se();
      function o(t, n, a) {
        t.clearRect(0, 0, n.width, n.height), n.style || (n.style = {}), n.height = a, n.width = a, n.style.height = a + "px", n.style.width = a + "px";
      }
      function e() {
        try {
          return document.createElement("canvas");
        } catch {
          throw new Error("You need to specify a canvas element");
        }
      }
      i.render = function(n, a, s) {
        let u = s, l = a;
        typeof u > "u" && (!a || !a.getContext) && (u = a, a = void 0), a || (l = e()), u = r.getOptions(u);
        const c = r.getImageWidth(n.modules.size, u), g = l.getContext("2d"), w = g.createImageData(c, c);
        return r.qrToImageData(w.data, n, u), o(g, l, c), g.putImageData(w, 0, 0), l;
      }, i.renderToDataURL = function(n, a, s) {
        let u = s;
        typeof u > "u" && (!a || !a.getContext) && (u = a, a = void 0), u || (u = {});
        const l = i.render(n, a, u), c = u.type || "image/png", g = u.rendererOpts || {};
        return l.toDataURL(c, g.quality);
      };
    }(Tt)), Tt;
  }
  var Mt = {}, ve;
  function wn() {
    if (ve) return Mt;
    ve = 1;
    const i = Se();
    function r(t, n) {
      const a = t.a / 255, s = n + '="' + t.hex + '"';
      return a < 1 ? s + " " + n + '-opacity="' + a.toFixed(2).slice(1) + '"' : s;
    }
    function o(t, n, a) {
      let s = t + n;
      return typeof a < "u" && (s += " " + a), s;
    }
    function e(t, n, a) {
      let s = "", u = 0, l = false, c = 0;
      for (let g = 0; g < t.length; g++) {
        const w = Math.floor(g % n), f = Math.floor(g / n);
        !w && !l && (l = true), t[g] ? (c++, g > 0 && w > 0 && t[g - 1] || (s += l ? o("M", w + a, 0.5 + f + a) : o("m", u, 0), u = 0, l = false), w + 1 < n && t[g + 1] || (s += o("h", c), c = 0)) : u++;
      }
      return s;
    }
    return Mt.render = function(n, a, s) {
      const u = i.getOptions(a), l = n.modules.size, c = n.modules.data, g = l + u.margin * 2, w = u.color.light.a ? "<path " + r(u.color.light, "fill") + ' d="M0 0h' + g + "v" + g + 'H0z"/>' : "", f = "<path " + r(u.color.dark, "stroke") + ' d="' + e(c, l, u.margin) + '"/>', I = 'viewBox="0 0 ' + g + " " + g + '"', N = '<svg xmlns="http://www.w3.org/2000/svg" ' + (u.width ? 'width="' + u.width + '" height="' + u.width + '" ' : "") + I + ' shape-rendering="crispEdges">' + w + f + `</svg>
`;
      return typeof s == "function" && s(null, N), N;
    }, Mt;
  }
  var Be;
  function pn() {
    if (Be) return G;
    Be = 1;
    const i = $e(), r = gn(), o = mn(), e = wn();
    function t(n, a, s, u, l) {
      const c = [].slice.call(arguments, 1), g = c.length, w = typeof c[g - 1] == "function";
      if (!w && !i()) throw new Error("Callback required as last argument");
      if (w) {
        if (g < 2) throw new Error("Too few arguments provided");
        g === 2 ? (l = s, s = a, a = u = void 0) : g === 3 && (a.getContext && typeof l > "u" ? (l = u, u = void 0) : (l = u, u = s, s = a, a = void 0));
      } else {
        if (g < 1) throw new Error("Too few arguments provided");
        return g === 1 ? (s = a, a = u = void 0) : g === 2 && !a.getContext && (u = s, s = a, a = void 0), new Promise(function(f, I) {
          try {
            const m = r.create(s, u);
            f(n(m, a, u));
          } catch (m) {
            I(m);
          }
        });
      }
      try {
        const f = r.create(s, u);
        l(null, n(f, a, u));
      } catch (f) {
        l(f);
      }
    }
    return G.create = r.create, G.toCanvas = t.bind(null, o.render), G.toDataURL = t.bind(null, o.renderToDataURL), G.toString = t.bind(null, function(n, a, s) {
      return e.render(n, s);
    }), G;
  }
  var yn = pn();
  const Cn = Ue(yn);
  var En = X('<div class="flex flex-row justify-center flex-grow w-full h-full"><div class="inline-block h-6 w-6 animate-spin"><!></div></div> <canvas></canvas>', 1);
  function vn(i, r) {
    kt(r, true);
    let o = Dt(r, "size", 3, 256), e = x(void 0), t = x(false);
    be(() => {
      V(t, true), Cn.toCanvas(M(e), r.text, (g) => {
        g && console.error(g), V(t, false);
      });
    });
    var n = En(), a = Te(n), s = L(a), u = L(s);
    Re(u, {}), D(s), D(a);
    var l = k(a, 2);
    let c;
    Ye(l, (g) => V(e, g), () => M(e)), ot((g) => {
      a.hidden = !M(t), it(l, "title", r.text), c = Ut(l, 1, "w-full h-full", null, c, g), it(l, "width", o()), it(l, "height", o()), je(l, `width:${o() ?? ""}px;height:${o() ?? ""}px;`);
    }, [
      () => ({
        hidden: M(t)
      })
    ]), Z(i, n), Ft();
  }
  const Bn = () => Ge((i = {}, r) => {
    r.length && (Qe(r), Gt("name", Kt(), () => {
      xt(i.name).isNotBlank();
    }), Gt("birthdate", Kt(), () => {
      xt(i.birthdate).isNotBlank();
    }));
  });
  function bn(i, r, o, e) {
    r(new Date(M(o) || "")), e(i);
  }
  var Rn = X('<div class="mr-2 flex flex-row justify-center"><div class="inline-block h-6 w-6 animate-spin"><!></div></div>'), An = X('<form><div class="mb-2"><label for="name"> </label> <input type="text" name="name" autocomplete="name"> <!></div> <div class="mb-2"><label for="birthdate"> </label> <input type="date" name="birthdate" autocomplete="bday"> <!></div> <div class="flex flex-row justify-end"><button type="submit" class="btn primary flex flex-shrink"><!> </button></div></form>');
  function In(i, r) {
    var _a;
    kt(r, true);
    let o = Dt(r, "name", 7), e = Dt(r, "birthdate", 7), t = x(W((_a = e()) == null ? void 0 : _a.toISOString().substring(0, 10))), n = Bn(), a = x(W(n.get())), s = x(false), u = Lt(() => M(s) || !M(a).isValid()), l = Lt(() => xe(M(a), {
      untested: "untested",
      tested: "tested",
      invalid: "invalid",
      valid: "valid",
      warning: "warning"
    }));
    const c = /* @__PURE__ */ new Set(), g = Oe(() => {
      n({
        name: o(),
        birthdate: e()
      }, Array.from(c)).done((P) => {
        V(a, W(P));
      }), c.clear();
    }, 300);
    function w() {
      c.add("name"), c.add("birthdate"), g(), g.flush();
    }
    function f(P) {
      c.add(P.currentTarget.name), g();
    }
    async function I(P) {
      var _a2;
      P.preventDefault();
      try {
        V(s, true), o((_a2 = o()) == null ? void 0 : _a2.trim()), w(), M(a).isValid() && (r.onUpdate({
          name: o(),
          birthdate: e()
        }), n.reset(), V(a, W(n.get())));
      } catch (q) {
        He(q);
      } finally {
        V(s, false);
      }
    }
    var m = An(), N = L(m), C = L(N), S = L(C, true);
    D(C);
    var B = k(C, 2);
    jt(B), B.__input = f;
    var A = k(B, 2);
    Ot(A, {
      name: "name",
      get result() {
        return M(a);
      }
    }), D(N);
    var T = k(N, 2), d = L(T), b = L(d, true);
    D(d);
    var p = k(d, 2);
    jt(p), p.__input = [
      bn,
      e,
      t,
      f
    ];
    var h = k(p, 2);
    Ot(h, {
      name: "birthdate",
      get result() {
        return M(a);
      }
    }), D(T);
    var R = k(T, 2), y = L(R), v = L(y);
    {
      var E = (P) => {
        var q = Rn(), j = L(q), O = L(j);
        Re(O, {}), D(j), D(q), Z(P, q);
      };
      qt(v, (P) => {
        M(s) && P(E);
      });
    }
    var _ = k(v);
    return D(y), D(R), D(m), ot((P, q, j, O, at, Q) => {
      rt(S, P), Ut(B, 1, `w-full ${q ?? ""}`), it(B, "placeholder", j), rt(b, O), Ut(p, 1, `w-full ${at ?? ""}`), y.disabled = M(u), rt(_, ` ${Q ?? ""}`);
    }, [
      () => ke(),
      () => M(l)("name"),
      () => Fe(),
      () => ze(),
      () => M(l)("birthdate"),
      () => Ve()
    ]), Le("submit", m, I), Yt(B, o), Yt(p, () => M(t), (P) => V(t, P)), Z(i, m), Ft({
      validateAll: w
    });
  }
  Me([
    "input"
  ]);
  var _n = X('<div class="flex flex-col"><!></div>'), Sn = X('<div class="container mx-auto p-4"><div class="card flex flex-col"><div><h1> </h1></div> <!> <div class="flex flex-col justify-center items-center"><!></div></div></div>');
  Hn = function(i, r) {
    kt(r, true);
    let o = x(void 0);
    be(() => {
      Ke(r.data.userDocument.docSync().user).then((m) => {
        V(o, W(m));
      });
    });
    let e = Lt(() => et.username && et.documentId ? `${Je()}${qe}/sync?username=${encodeURIComponent(et.username)}&userDocumentId=${encodeURIComponent(et.documentId)}` : null);
    function t({ name: m, birthdate: N }) {
      M(o).change((C) => (C.name = m, C.birthdate = N, C));
    }
    var n = Sn();
    De((m) => {
      ot((N) => Pe.title = N, [
        () => Jt()
      ]);
    });
    var a = L(n), s = L(a), u = L(s), l = L(u, true);
    D(u), D(s);
    var c = k(s, 2);
    {
      var g = (m) => {
        var N = _n(), C = L(N);
        In(C, {
          get name() {
            return M(o).doc.name;
          },
          get birthdate() {
            return M(o).doc.birthdate;
          },
          onUpdate: t
        }), D(N), Z(m, N);
      };
      qt(c, (m) => {
        M(o) && m(g);
      });
    }
    var w = k(c, 2), f = L(w);
    {
      var I = (m) => {
        vn(m, {
          get text() {
            return M(e);
          },
          size: 1024
        });
      };
      qt(f, (m) => {
        M(e) && m(I);
      });
    }
    D(w), D(a), D(n), ot((m) => rt(l, m), [
      () => Jt()
    ]), Z(i, n), Ft();
  };
});
export {
  __tla,
  Hn as component
};
