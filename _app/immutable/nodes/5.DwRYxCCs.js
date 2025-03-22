import { t as Z, a as W } from "../chunks/C3b73btl.js";
import { p as Ut, l as x, D as be, w as V, v as M, f as Ne, c as L, r as D, s as k, t as it, a as kt, m as Ht, o as Mt, $ as Pe } from "../chunks/DvcnV1Iy.js";
import { d as Me, s as nt, e as Le } from "../chunks/DxMSxYl-.js";
import { p as Lt, i as Dt } from "../chunks/mt6aCfIN.js";
import { h as De } from "../chunks/CB6iZtqN.js";
import { b as qe } from "../chunks/B7qIyRxi.js";
import { w as Ue, x as ke, y as Fe, z as ze, A as Ve, h as He, f as Kt, p as Jt, B as Ke, C as Je, u as tt, __tla as __tla_0 } from "../chunks/C-o1sGLL.js";
import { L as Re, s as rt, a as qt, g as je, d as Oe, r as jt } from "../chunks/C8BfhpKI.js";
import { b as Ye } from "../chunks/CGmLTidH.js";
import "../chunks/KzIwl7iM.js";
import { G as Ge, a as xe, I as Ot, b as Yt, m as Qe, C as Gt, v as xt } from "../chunks/BPcNmqJU.js";
let Vn;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  var G = {}, lt, Qt;
  function $e() {
    return Qt || (Qt = 1, lt = function() {
      return typeof Promise == "function" && Promise.prototype && Promise.prototype.then;
    }), lt;
  }
  var ct = {}, H = {}, $t;
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
  var ft = {}, Wt;
  function Ft() {
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
    }(ft)), ft;
  }
  var dt, Zt;
  function We() {
    if (Zt) return dt;
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
    }, dt = i, dt;
  }
  var ht, Xt;
  function Ze() {
    if (Xt) return ht;
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
    }, ht = i, ht;
  }
  var gt = {}, te;
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
    }(gt)), gt;
  }
  var mt = {}, ee;
  function tn() {
    if (ee) return mt;
    ee = 1;
    const i = K().getSymbolSize, r = 7;
    return mt.getPositions = function(e) {
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
    }, mt;
  }
  var wt = {}, ne;
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
    }(wt)), wt;
  }
  var et = {}, re;
  function Ae() {
    if (re) return et;
    re = 1;
    const i = Ft(), r = [
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
    return et.getBlocksCount = function(t, n) {
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
    }, et.getTotalCodewordsCount = function(t, n) {
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
    }, et;
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
  var pt, ae;
  function on() {
    if (ae) return pt;
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
    }, pt = r, pt;
  }
  var Ct = {}, Et = {}, vt = {}, se;
  function Ie() {
    return se || (se = 1, vt.isValid = function(r) {
      return !isNaN(r) && r >= 1 && r <= 40;
    }), vt;
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
    }(Et)), Et;
  }
  var ce;
  function an() {
    return ce || (ce = 1, function(i) {
      const r = K(), o = Ae(), e = Ft(), t = J(), n = Ie(), a = 7973, s = r.getBCHDigit(a);
      function u(w, f, I) {
        for (let m = 1; m <= 40; m++) if (f <= i.getCapacity(m, I, w)) return m;
      }
      function l(w, f) {
        return t.getCharCountIndicator(w, f) + 4;
      }
      function c(w, f) {
        let I = 0;
        return w.forEach(function(m) {
          const T = l(m.mode, f);
          I += T + m.getBitsLength();
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
        const T = r.getSymbolTotalCodewords(f), C = o.getTotalCodewordsCount(f, I), S = (T - C) * 8;
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
        const T = e.from(I, e.M);
        if (Array.isArray(f)) {
          if (f.length > 1) return g(f, T);
          if (f.length === 0) return 1;
          m = f[0];
        } else m = f;
        return u(m.mode, m.getLength(), T);
      }, i.getEncodedBits = function(f) {
        if (!n.isValid(f) || f < 7) throw new Error("Invalid QR Code version");
        let I = f << 12;
        for (; r.getBCHDigit(I) - s >= 0; ) I ^= a << r.getBCHDigit(I) - s;
        return f << 12 | I;
      };
    }(Ct)), Ct;
  }
  var Bt = {}, fe;
  function sn() {
    if (fe) return Bt;
    fe = 1;
    const i = K(), r = 1335, o = 21522, e = i.getBCHDigit(r);
    return Bt.getEncodedBits = function(n, a) {
      const s = n.bit << 3 | a;
      let u = s << 10;
      for (; i.getBCHDigit(u) - e >= 0; ) u ^= r << i.getBCHDigit(u) - e;
      return (s << 10 | u) ^ o;
    }, Bt;
  }
  var bt = {}, Rt, de;
  function un() {
    if (de) return Rt;
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
    }, Rt = r, Rt;
  }
  var At, he;
  function ln() {
    if (he) return At;
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
    }, At = o, At;
  }
  var It, ge;
  function cn() {
    if (ge) return It;
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
    }, It = r, It;
  }
  var _t, me;
  function fn() {
    if (me) return _t;
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
    }, _t = o, _t;
  }
  var St = {
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
          for (var u, l, c, g, w, f, I, m, T; !s.empty(); ) {
            u = s.pop(), l = u.value, g = u.cost, w = o[l] || {};
            for (c in w) w.hasOwnProperty(c) && (f = w[c], I = g + f, m = a[c], T = typeof a[c] > "u", (T || m > I) && (a[c] = I, s.push(c, I), n[c] = l));
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
    }(St)), St.exports;
  }
  var ye;
  function hn() {
    return ye || (ye = 1, function(i) {
      const r = J(), o = un(), e = ln(), t = cn(), n = fn(), a = _e(), s = K(), u = dn();
      function l(C) {
        return unescape(encodeURIComponent(C)).length;
      }
      function c(C, S, B) {
        const A = [];
        let N;
        for (; (N = C.exec(B)) !== null; ) A.push({
          data: N[0],
          index: N.index,
          mode: S,
          length: N[0].length
        });
        return A;
      }
      function g(C) {
        const S = c(a.NUMERIC, r.NUMERIC, C), B = c(a.ALPHANUMERIC, r.ALPHANUMERIC, C);
        let A, N;
        return s.isKanjiModeEnabled() ? (A = c(a.BYTE, r.BYTE, C), N = c(a.KANJI, r.KANJI, C)) : (A = c(a.BYTE_KANJI, r.BYTE, C), N = []), S.concat(B, A, N).sort(function(b, y) {
          return b.index - y.index;
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
        let N = [
          "start"
        ];
        for (let d = 0; d < C.length; d++) {
          const b = C[d], y = [];
          for (let h = 0; h < b.length; h++) {
            const R = b[h], p = "" + d + h;
            y.push(p), B[p] = {
              node: R,
              lastCount: 0
            }, A[p] = {};
            for (let v = 0; v < N.length; v++) {
              const E = N[v];
              B[E] && B[E].node.mode === R.mode ? (A[E][p] = w(B[E].lastCount + R.length, R.mode) - w(B[E].lastCount, R.mode), B[E].lastCount += R.length) : (B[E] && (B[E].lastCount = R.length), A[E][p] = w(R.length, R.mode) + 4 + r.getCharCountIndicator(R.mode, S));
            }
          }
          N = y;
        }
        for (let d = 0; d < N.length; d++) A[N[d]].end = 0;
        return {
          map: A,
          table: B
        };
      }
      function T(C, S) {
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
          return typeof A == "string" ? B.push(T(A, null)) : A.data && B.push(T(A.data, A.mode)), B;
        }, []);
      }, i.fromString = function(S, B) {
        const A = g(S, s.isKanjiModeEnabled()), N = I(A), d = m(N, B), b = u.find_path(d.map, "start", "end"), y = [];
        for (let h = 1; h < b.length - 1; h++) y.push(d.table[b[h]].node);
        return i.fromArray(f(y));
      }, i.rawSplit = function(S) {
        return i.fromArray(g(S, s.isKanjiModeEnabled()));
      };
    }(bt)), bt;
  }
  var pe;
  function gn() {
    if (pe) return ct;
    pe = 1;
    const i = K(), r = Ft(), o = We(), e = Ze(), t = Xe(), n = tn(), a = en(), s = Ae(), u = on(), l = an(), c = sn(), g = J(), w = hn();
    function f(d, b) {
      const y = d.size, h = n.getPositions(b);
      for (let R = 0; R < h.length; R++) {
        const p = h[R][0], v = h[R][1];
        for (let E = -1; E <= 7; E++) if (!(p + E <= -1 || y <= p + E)) for (let _ = -1; _ <= 7; _++) v + _ <= -1 || y <= v + _ || (E >= 0 && E <= 6 && (_ === 0 || _ === 6) || _ >= 0 && _ <= 6 && (E === 0 || E === 6) || E >= 2 && E <= 4 && _ >= 2 && _ <= 4 ? d.set(p + E, v + _, true, true) : d.set(p + E, v + _, false, true));
      }
    }
    function I(d) {
      const b = d.size;
      for (let y = 8; y < b - 8; y++) {
        const h = y % 2 === 0;
        d.set(y, 6, h, true), d.set(6, y, h, true);
      }
    }
    function m(d, b) {
      const y = t.getPositions(b);
      for (let h = 0; h < y.length; h++) {
        const R = y[h][0], p = y[h][1];
        for (let v = -2; v <= 2; v++) for (let E = -2; E <= 2; E++) v === -2 || v === 2 || E === -2 || E === 2 || v === 0 && E === 0 ? d.set(R + v, p + E, true, true) : d.set(R + v, p + E, false, true);
      }
    }
    function T(d, b) {
      const y = d.size, h = l.getEncodedBits(b);
      let R, p, v;
      for (let E = 0; E < 18; E++) R = Math.floor(E / 3), p = E % 3 + y - 8 - 3, v = (h >> E & 1) === 1, d.set(R, p, v, true), d.set(p, R, v, true);
    }
    function C(d, b, y) {
      const h = d.size, R = c.getEncodedBits(b, y);
      let p, v;
      for (p = 0; p < 15; p++) v = (R >> p & 1) === 1, p < 6 ? d.set(p, 8, v, true) : p < 8 ? d.set(p + 1, 8, v, true) : d.set(h - 15 + p, 8, v, true), p < 8 ? d.set(8, h - p - 1, v, true) : p < 9 ? d.set(8, 15 - p - 1 + 1, v, true) : d.set(8, 15 - p - 1, v, true);
      d.set(h - 8, 8, 1, true);
    }
    function S(d, b) {
      const y = d.size;
      let h = -1, R = y - 1, p = 7, v = 0;
      for (let E = y - 1; E > 0; E -= 2) for (E === 6 && E--; ; ) {
        for (let _ = 0; _ < 2; _++) if (!d.isReserved(R, E - _)) {
          let P = false;
          v < b.length && (P = (b[v] >>> p & 1) === 1), d.set(R, E - _, P), p--, p === -1 && (v++, p = 7);
        }
        if (R += h, R < 0 || y <= R) {
          R -= h, h = -h;
          break;
        }
      }
    }
    function B(d, b, y) {
      const h = new o();
      y.forEach(function(_) {
        h.put(_.mode.bit, 4), h.put(_.getLength(), g.getCharCountIndicator(_.mode, d)), _.write(h);
      });
      const R = i.getSymbolTotalCodewords(d), p = s.getTotalCodewordsCount(d, b), v = (R - p) * 8;
      for (h.getLengthInBits() + 4 <= v && h.put(0, 4); h.getLengthInBits() % 8 !== 0; ) h.putBit(0);
      const E = (v - h.getLengthInBits()) / 8;
      for (let _ = 0; _ < E; _++) h.put(_ % 2 ? 17 : 236, 8);
      return A(h, d, b);
    }
    function A(d, b, y) {
      const h = i.getSymbolTotalCodewords(b), R = s.getTotalCodewordsCount(b, y), p = h - R, v = s.getBlocksCount(b, y), E = h % v, _ = v - E, P = Math.floor(h / v), q = Math.floor(p / v), j = q + 1, O = P - q, ot = new u(O);
      let Q = 0;
      const X = new Array(v), zt = new Array(v);
      let at = 0;
      const Te = new Uint8Array(d.buffer);
      for (let Y = 0; Y < v; Y++) {
        const ut = Y < _ ? q : j;
        X[Y] = Te.slice(Q, Q + ut), zt[Y] = ot.encode(X[Y]), Q += ut, at = Math.max(at, ut);
      }
      const st = new Uint8Array(h);
      let Vt = 0, F, z;
      for (F = 0; F < at; F++) for (z = 0; z < v; z++) F < X[z].length && (st[Vt++] = X[z][F]);
      for (F = 0; F < O; F++) for (z = 0; z < v; z++) st[Vt++] = zt[z][F];
      return st;
    }
    function N(d, b, y, h) {
      let R;
      if (Array.isArray(d)) R = w.fromArray(d);
      else if (typeof d == "string") {
        let P = b;
        if (!P) {
          const q = w.rawSplit(d);
          P = l.getBestVersionForData(q, y);
        }
        R = w.fromString(d, P || 40);
      } else throw new Error("Invalid data");
      const p = l.getBestVersionForData(R, y);
      if (!p) throw new Error("The amount of data is too big to be stored in a QR Code");
      if (!b) b = p;
      else if (b < p) throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` + p + `.
`);
      const v = B(b, y, R), E = i.getSymbolSize(b), _ = new e(E);
      return f(_, b), I(_), m(_, b), C(_, y, 0), b >= 7 && T(_, b), S(_, v), isNaN(h) && (h = a.getBestMask(_, C.bind(null, _, y))), a.applyMask(h, _), C(_, y, h), {
        modules: _,
        version: b,
        errorCorrectionLevel: y,
        maskPattern: h,
        segments: R
      };
    }
    return ct.create = function(b, y) {
      if (typeof b > "u" || b === "") throw new Error("No input text");
      let h = r.M, R, p;
      return typeof y < "u" && (h = r.from(y.errorCorrectionLevel, r.M), R = l.from(y.version), p = a.from(y.maskPattern), y.toSJISFunc && i.setToSJISFunction(y.toSJISFunc)), N(b, R, h, p);
    }, ct;
  }
  var Tt = {}, Nt = {}, Ce;
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
            const T = Math.floor((w - c) / u), C = Math.floor((f - c) / u);
            m = g[s[T * a + C] ? 1 : 0];
          }
          e[I++] = m.r, e[I++] = m.g, e[I++] = m.b, e[I] = m.a;
        }
      };
    }(Nt)), Nt;
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
  var Pt = {}, ve;
  function wn() {
    if (ve) return Pt;
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
    return Pt.render = function(n, a, s) {
      const u = i.getOptions(a), l = n.modules.size, c = n.modules.data, g = l + u.margin * 2, w = u.color.light.a ? "<path " + r(u.color.light, "fill") + ' d="M0 0h' + g + "v" + g + 'H0z"/>' : "", f = "<path " + r(u.color.dark, "stroke") + ' d="' + e(c, l, u.margin) + '"/>', I = 'viewBox="0 0 ' + g + " " + g + '"', T = '<svg xmlns="http://www.w3.org/2000/svg" ' + (u.width ? 'width="' + u.width + '" height="' + u.width + '" ' : "") + I + ' shape-rendering="crispEdges">' + w + f + `</svg>
`;
      return typeof s == "function" && s(null, T), T;
    }, Pt;
  }
  var Be;
  function yn() {
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
  var pn = yn();
  const Cn = Ue(pn);
  var En = Z('<div class="flex flex-row justify-center flex-grow w-full h-full"><div class="inline-block h-6 w-6 animate-spin"><!></div></div> <canvas></canvas>', 1);
  function vn(i, r) {
    Ut(r, true);
    let o = Lt(r, "size", 3, 256), e = x(void 0), t = x(false);
    be(() => {
      V(t, true), Cn.toCanvas(M(e), r.text, (g) => {
        g && console.error(g), V(t, false);
      });
    });
    var n = En(), a = Ne(n), s = L(a), u = L(s);
    Re(u, {}), D(s), D(a);
    var l = k(a, 2);
    let c;
    Ye(l, (g) => V(e, g), () => M(e)), it((g) => {
      a.hidden = !M(t), rt(l, "title", r.text), c = qt(l, 1, "w-full h-full", null, c, g), rt(l, "width", o()), rt(l, "height", o()), je(l, `width:${o() ?? ""}px;height:${o() ?? ""}px;`);
    }, [
      () => ({
        hidden: M(t)
      })
    ]), W(i, n), kt();
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
  var Rn = Z('<div class="mr-2 flex flex-row justify-center"><div class="inline-block h-6 w-6 animate-spin"><!></div></div>'), An = Z('<form><div class="mb-2"><label for="name"> </label> <input type="text" name="name" autocomplete="name"> <!></div> <div class="mb-2"><label for="birthdate"> </label> <input type="date" name="birthdate" autocomplete="bday"> <!></div> <div class="flex flex-row justify-end"><button type="submit" class="btn primary flex flex-shrink"><!> </button></div></form>');
  function In(i, r) {
    var _a;
    Ut(r, true);
    let o = Lt(r, "name", 7), e = Lt(r, "birthdate", 7), t = x(Ht((_a = e()) == null ? void 0 : _a.toISOString().substring(0, 10))), n = Bn(), a = x(Ht(n.get())), s = x(false), u = Mt(() => M(s) || !M(a).isValid()), l = Mt(() => xe(M(a), {
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
        V(a, P, true);
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
        }), n.reset(), V(a, n.get(), true));
      } catch (q) {
        He(q);
      } finally {
        V(s, false);
      }
    }
    var m = An(), T = L(m), C = L(T), S = L(C, true);
    D(C);
    var B = k(C, 2);
    jt(B), B.__input = f;
    var A = k(B, 2);
    Ot(A, {
      name: "name",
      get result() {
        return M(a);
      }
    }), D(T);
    var N = k(T, 2), d = L(N), b = L(d, true);
    D(d);
    var y = k(d, 2);
    jt(y), y.__input = [
      bn,
      e,
      t,
      f
    ];
    var h = k(y, 2);
    Ot(h, {
      name: "birthdate",
      get result() {
        return M(a);
      }
    }), D(N);
    var R = k(N, 2), p = L(R), v = L(p);
    {
      var E = (P) => {
        var q = Rn(), j = L(q), O = L(j);
        Re(O, {}), D(j), D(q), W(P, q);
      };
      Dt(v, (P) => {
        M(s) && P(E);
      });
    }
    var _ = k(v);
    return D(p), D(R), D(m), it((P, q, j, O, ot, Q) => {
      nt(S, P), qt(B, 1, `w-full ${q ?? ""}`), rt(B, "placeholder", j), nt(b, O), qt(y, 1, `w-full ${ot ?? ""}`), p.disabled = M(u), nt(_, ` ${Q ?? ""}`);
    }, [
      () => ke(),
      () => M(l)("name"),
      () => Fe(),
      () => ze(),
      () => M(l)("birthdate"),
      () => Ve()
    ]), Le("submit", m, I), Yt(B, o), Yt(y, () => M(t), (P) => V(t, P)), W(i, m), kt({
      validateAll: w
    });
  }
  Me([
    "input"
  ]);
  var _n = Z('<div class="flex flex-col"><!></div>'), Sn = Z('<div class="container mx-auto p-4"><div class="card flex flex-col"><div><h1> </h1></div> <!> <div class="flex flex-col justify-center items-center"><!></div></div></div>');
  Vn = function(i, r) {
    Ut(r, true);
    let o = x(void 0);
    be(() => {
      Ke(r.data.userDocument.docSync().user).then((m) => {
        V(o, m, true);
      });
    });
    let e = Mt(() => tt.username && tt.documentId ? `${Je()}${qe}/sync?username=${encodeURIComponent(tt.username)}&userDocumentId=${encodeURIComponent(tt.documentId)}` : null);
    function t({ name: m, birthdate: T }) {
      M(o).change((C) => (C.name = m, C.birthdate = T, C));
    }
    var n = Sn();
    De((m) => {
      it((T) => Pe.title = T, [
        () => Jt()
      ]);
    });
    var a = L(n), s = L(a), u = L(s), l = L(u, true);
    D(u), D(s);
    var c = k(s, 2);
    {
      var g = (m) => {
        var T = _n(), C = L(T);
        In(C, {
          get name() {
            return M(o).doc.name;
          },
          get birthdate() {
            return M(o).doc.birthdate;
          },
          onUpdate: t
        }), D(T), W(m, T);
      };
      Dt(c, (m) => {
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
      Dt(f, (m) => {
        M(e) && m(I);
      });
    }
    D(w), D(a), D(n), it((m) => nt(l, m), [
      () => Jt()
    ]), W(i, n), kt();
  };
});
export {
  __tla,
  Vn as component
};
