const rsaFunc = (e, t, r) => {
    var n = "0123456789abcdefghijklmnopqrstuvwxyz";
    function i (e) {
        return n.charAt(e)
    }
    function s (e, t) {
        return e & t
    }
    function o (e, t) {
        return e | t
    }
    function a (e, t) {
        return e ^ t
    }
    function l (e, t) {
        return e & ~t
    }
    function c (e) {
        if (0 == e)
            return -1;
        var t = 0;
        return 0 == (65535 & e) && (e >>= 16,
            t += 16),
            0 == (255 & e) && (e >>= 8,
                t += 8),
            0 == (15 & e) && (e >>= 4,
                t += 4),
            0 == (3 & e) && (e >>= 2,
                t += 2),
            0 == (1 & e) && ++t,
            t
    }
    function u (e) {
        for (var t = 0; 0 != e;)
            e &= e - 1,
                ++t;
        return t
    }
    var d, p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", f = "=";
    function h (e) {
        var t, r, n = "";
        for (t = 0; t + 3 <= e.length; t += 3)
            r = parseInt(e.substring(t, t + 3), 16),
                n += p.charAt(r >> 6) + p.charAt(63 & r);
        for (t + 1 == e.length ? (r = parseInt(e.substring(t, t + 1), 16),
            n += p.charAt(r << 2)) : t + 2 == e.length && (r = parseInt(e.substring(t, t + 2), 16),
                n += p.charAt(r >> 2) + p.charAt((3 & r) << 4)); (3 & n.length) > 0;)
            n += f;
        return n
    }
    function g (e) {
        var t, r = "", n = 0, s = 0;
        for (t = 0; t < e.length && e.charAt(t) != f; ++t) {
            var o = p.indexOf(e.charAt(t));
            o < 0 || (0 == n ? (r += i(o >> 2),
                s = 3 & o,
                n = 1) : 1 == n ? (r += i(s << 2 | o >> 4),
                    s = 15 & o,
                    n = 2) : 2 == n ? (r += i(s),
                        r += i(o >> 2),
                        s = 3 & o,
                        n = 3) : (r += i(s << 2 | o >> 4),
                            r += i(15 & o),
                            n = 0))
        }
        return 1 == n && (r += i(s << 2)),
            r
    }
    var m, v = function (e) {
        var t;
        if (void 0 === d) {
            var r = "0123456789ABCDEF"
                , n = " \f\n\r\t\xa0\u2028\u2029";
            for (d = {},
                t = 0; t < 16; ++t)
                d[r.charAt(t)] = t;
            for (r = r.toLowerCase(),
                t = 10; t < 16; ++t)
                d[r.charAt(t)] = t;
            for (t = 0; t < 8; ++t)
                d[n.charAt(t)] = -1
        }
        var i = []
            , s = 0
            , o = 0;
        for (t = 0; t < e.length; ++t) {
            var a = e.charAt(t);
            if ("=" == a)
                break;
            if (-1 != (a = d[a])) {
                if (void 0 === a)
                    throw new Error("Illegal character at offset " + t);
                s |= a,
                    ++o >= 2 ? (i[i.length] = s,
                        s = 0,
                        o = 0) : s <<= 4
            }
        }
        if (o)
            throw new Error("Hex encoding incomplete: 4 bits missing");
        return i
    }, y = {
        decode: function (e) {
            var t;
            if (void 0 === m) {
                var r = "= \f\n\r\t\xa0\u2028\u2029";
                for (m = Object.create(null),
                    t = 0; t < 64; ++t)
                    m["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(t)] = t;
                for (m["-"] = 62,
                    m._ = 63,
                    t = 0; t < 9; ++t)
                    m[r.charAt(t)] = -1
            }
            var n = []
                , i = 0
                , s = 0;
            for (t = 0; t < e.length; ++t) {
                var o = e.charAt(t);
                if ("=" == o)
                    break;
                if (-1 != (o = m[o])) {
                    if (void 0 === o)
                        throw new Error("Illegal character at offset " + t);
                    i |= o,
                        ++s >= 4 ? (n[n.length] = i >> 16,
                            n[n.length] = i >> 8 & 255,
                            n[n.length] = 255 & i,
                            i = 0,
                            s = 0) : i <<= 6
                }
            }
            switch (s) {
                case 1:
                    throw new Error("Base64 encoding incomplete: at least 2 bits missing");
                case 2:
                    n[n.length] = i >> 10;
                    break;
                case 3:
                    n[n.length] = i >> 16,
                        n[n.length] = i >> 8 & 255
            }
            return n
        },
        re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
        unarmor: function (e) {
            var t = y.re.exec(e);
            if (t)
                if (t[1])
                    e = t[1];
                else {
                    if (!t[2])
                        throw new Error("RegExp out of sync");
                    e = t[2]
                }
            return y.decode(e)
        }
    }, b = 1e13, w = function () {
        function e (e) {
            this.buf = [+e || 0]
        }
        return e.prototype.mulAdd = function (e, t) {
            var r, n, i = this.buf, s = i.length;
            for (r = 0; r < s; ++r)
                (n = i[r] * e + t) < b ? t = 0 : n -= (t = 0 | n / b) * b,
                    i[r] = n;
            t > 0 && (i[r] = t)
        }
            ,
            e.prototype.sub = function (e) {
                var t, r, n = this.buf, i = n.length;
                for (t = 0; t < i; ++t)
                    (r = n[t] - e) < 0 ? (r += b,
                        e = 1) : e = 0,
                        n[t] = r;
                for (; 0 === n[n.length - 1];)
                    n.pop()
            }
            ,
            e.prototype.toString = function (e) {
                if (10 != (e || 10))
                    throw new Error("only base 10 is supported");
                for (var t = this.buf, r = t[t.length - 1].toString(), n = t.length - 2; n >= 0; --n)
                    r += (b + t[n]).toString().substring(1);
                return r
            }
            ,
            e.prototype.valueOf = function () {
                for (var e = this.buf, t = 0, r = e.length - 1; r >= 0; --r)
                    t = t * b + e[r];
                return t
            }
            ,
            e.prototype.simplify = function () {
                var e = this.buf;
                return 1 == e.length ? e[0] : this
            }
            ,
            e
    }(), S = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/, T = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
    function x (e, t) {
        return e.length > t && (e = e.substring(0, t) + "\u2026"),
            e
    }
    var E, O = function () {
        function e (t, r) {
            this.hexDigits = "0123456789ABCDEF",
                t instanceof e ? (this.enc = t.enc,
                    this.pos = t.pos) : (this.enc = t,
                        this.pos = r)
        }
        return e.prototype.get = function (e) {
            if (void 0 === e && (e = this.pos++),
                e >= this.enc.length)
                throw new Error("Requesting byte offset ".concat(e, " on a stream of length ").concat(this.enc.length));
            return "string" === typeof this.enc ? this.enc.charCodeAt(e) : this.enc[e]
        }
            ,
            e.prototype.hexByte = function (e) {
                return this.hexDigits.charAt(e >> 4 & 15) + this.hexDigits.charAt(15 & e)
            }
            ,
            e.prototype.hexDump = function (e, t, r) {
                for (var n = "", i = e; i < t; ++i)
                    if (n += this.hexByte(this.get(i)),
                        !0 !== r)
                        switch (15 & i) {
                            case 7:
                                n += "  ";
                                break;
                            case 15:
                                n += "\n";
                                break;
                            default:
                                n += " "
                        }
                return n
            }
            ,
            e.prototype.isASCII = function (e, t) {
                for (var r = e; r < t; ++r) {
                    var n = this.get(r);
                    if (n < 32 || n > 176)
                        return !1
                }
                return !0
            }
            ,
            e.prototype.parseStringISO = function (e, t) {
                for (var r = "", n = e; n < t; ++n)
                    r += String.fromCharCode(this.get(n));
                return r
            }
            ,
            e.prototype.parseStringUTF = function (e, t) {
                for (var r = "", n = e; n < t;) {
                    var i = this.get(n++);
                    r += i < 128 ? String.fromCharCode(i) : i > 191 && i < 224 ? String.fromCharCode((31 & i) << 6 | 63 & this.get(n++)) : String.fromCharCode((15 & i) << 12 | (63 & this.get(n++)) << 6 | 63 & this.get(n++))
                }
                return r
            }
            ,
            e.prototype.parseStringBMP = function (e, t) {
                for (var r, n, i = "", s = e; s < t;)
                    r = this.get(s++),
                        n = this.get(s++),
                        i += String.fromCharCode(r << 8 | n);
                return i
            }
            ,
            e.prototype.parseTime = function (e, t, r) {
                var n = this.parseStringISO(e, t)
                    , i = (r ? S : T).exec(n);
                return i ? (r && (i[1] = +i[1],
                    i[1] += +i[1] < 70 ? 2e3 : 1900),
                    n = i[1] + "-" + i[2] + "-" + i[3] + " " + i[4],
                    i[5] && (n += ":" + i[5],
                        i[6] && (n += ":" + i[6],
                            i[7] && (n += "." + i[7]))),
                    i[8] && (n += " UTC",
                        "Z" != i[8] && (n += i[8],
                            i[9] && (n += ":" + i[9]))),
                    n) : "Unrecognized time: " + n
            }
            ,
            e.prototype.parseInteger = function (e, t) {
                for (var r, n = this.get(e), i = n > 127, s = i ? 255 : 0, o = ""; n == s && ++e < t;)
                    n = this.get(e);
                if (0 === (r = t - e))
                    return i ? -1 : 0;
                if (r > 4) {
                    for (o = n,
                        r <<= 3; 0 == (128 & (+o ^ s));)
                        o = +o << 1,
                            --r;
                    o = "(" + r + " bit)\n"
                }
                i && (n -= 256);
                for (var a = new w(n), l = e + 1; l < t; ++l)
                    a.mulAdd(256, this.get(l));
                return o + a.toString()
            }
            ,
            e.prototype.parseBitString = function (e, t, r) {
                for (var n = this.get(e), i = "(" + ((t - e - 1 << 3) - n) + " bit)\n", s = "", o = e + 1; o < t; ++o) {
                    for (var a = this.get(o), l = o == t - 1 ? n : 0, c = 7; c >= l; --c)
                        s += a >> c & 1 ? "1" : "0";
                    if (s.length > r)
                        return i + x(s, r)
                }
                return i + s
            }
            ,
            e.prototype.parseOctetString = function (e, t, r) {
                if (this.isASCII(e, t))
                    return x(this.parseStringISO(e, t), r);
                var n = t - e
                    , i = "(" + n + " byte)\n";
                n > (r /= 2) && (t = e + r);
                for (var s = e; s < t; ++s)
                    i += this.hexByte(this.get(s));
                return n > r && (i += "\u2026"),
                    i
            }
            ,
            e.prototype.parseOID = function (e, t, r) {
                for (var n = "", i = new w, s = 0, o = e; o < t; ++o) {
                    var a = this.get(o);
                    if (i.mulAdd(128, 127 & a),
                        s += 7,
                        !(128 & a)) {
                        if ("" === n)
                            if ((i = i.simplify()) instanceof w)
                                i.sub(80),
                                    n = "2." + i.toString();
                            else {
                                var l = i < 80 ? i < 40 ? 0 : 1 : 2;
                                n = l + "." + (i - 40 * l)
                            }
                        else
                            n += "." + i.toString();
                        if (n.length > r)
                            return x(n, r);
                        i = new w,
                            s = 0
                    }
                }
                return s > 0 && (n += ".incomplete"),
                    n
            }
            ,
            e
    }(), M = function () {
        function e (e, t, r, n, i) {
            if (!(n instanceof P))
                throw new Error("Invalid tag value.");
            this.stream = e,
                this.header = t,
                this.length = r,
                this.tag = n,
                this.sub = i
        }
        return e.prototype.typeName = function () {
            switch (this.tag.tagClass) {
                case 0:
                    switch (this.tag.tagNumber) {
                        case 0:
                            return "EOC";
                        case 1:
                            return "BOOLEAN";
                        case 2:
                            return "INTEGER";
                        case 3:
                            return "BIT_STRING";
                        case 4:
                            return "OCTET_STRING";
                        case 5:
                            return "NULL";
                        case 6:
                            return "OBJECT_IDENTIFIER";
                        case 7:
                            return "ObjectDescriptor";
                        case 8:
                            return "EXTERNAL";
                        case 9:
                            return "REAL";
                        case 10:
                            return "ENUMERATED";
                        case 11:
                            return "EMBEDDED_PDV";
                        case 12:
                            return "UTF8String";
                        case 16:
                            return "SEQUENCE";
                        case 17:
                            return "SET";
                        case 18:
                            return "NumericString";
                        case 19:
                            return "PrintableString";
                        case 20:
                            return "TeletexString";
                        case 21:
                            return "VideotexString";
                        case 22:
                            return "IA5String";
                        case 23:
                            return "UTCTime";
                        case 24:
                            return "GeneralizedTime";
                        case 25:
                            return "GraphicString";
                        case 26:
                            return "VisibleString";
                        case 27:
                            return "GeneralString";
                        case 28:
                            return "UniversalString";
                        case 30:
                            return "BMPString"
                    }
                    return "Universal_" + this.tag.tagNumber.toString();
                case 1:
                    return "Application_" + this.tag.tagNumber.toString();
                case 2:
                    return "[" + this.tag.tagNumber.toString() + "]";
                case 3:
                    return "Private_" + this.tag.tagNumber.toString()
            }
        }
            ,
            e.prototype.content = function (e) {
                if (void 0 === this.tag)
                    return null;
                void 0 === e && (e = 1 / 0);
                var t = this.posContent()
                    , r = Math.abs(this.length);
                if (!this.tag.isUniversal())
                    return null !== this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(t, t + r, e);
                switch (this.tag.tagNumber) {
                    case 1:
                        return 0 === this.stream.get(t) ? "false" : "true";
                    case 2:
                        return this.stream.parseInteger(t, t + r);
                    case 3:
                        return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(t, t + r, e);
                    case 4:
                        return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(t, t + r, e);
                    case 6:
                        return this.stream.parseOID(t, t + r, e);
                    case 16:
                    case 17:
                        return null !== this.sub ? "(" + this.sub.length + " elem)" : "(no elem)";
                    case 12:
                        return x(this.stream.parseStringUTF(t, t + r), e);
                    case 18:
                    case 19:
                    case 20:
                    case 21:
                    case 22:
                    case 26:
                        return x(this.stream.parseStringISO(t, t + r), e);
                    case 30:
                        return x(this.stream.parseStringBMP(t, t + r), e);
                    case 23:
                    case 24:
                        return this.stream.parseTime(t, t + r, 23 == this.tag.tagNumber)
                }
                return null
            }
            ,
            e.prototype.toString = function () {
                return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]"
            }
            ,
            e.prototype.toPrettyString = function (e) {
                void 0 === e && (e = "");
                var t = e + this.typeName() + " @" + this.stream.pos;
                if (this.length >= 0 && (t += "+"),
                    t += this.length,
                    this.tag.tagConstructed ? t += " (constructed)" : !this.tag.isUniversal() || 3 != this.tag.tagNumber && 4 != this.tag.tagNumber || null === this.sub || (t += " (encapsulates)"),
                    t += "\n",
                    null !== this.sub) {
                    e += "  ";
                    for (var r = 0, n = this.sub.length; r < n; ++r)
                        t += this.sub[r].toPrettyString(e)
                }
                return t
            }
            ,
            e.prototype.posStart = function () {
                return this.stream.pos
            }
            ,
            e.prototype.posContent = function () {
                return this.stream.pos + this.header
            }
            ,
            e.prototype.posEnd = function () {
                return this.stream.pos + this.header + Math.abs(this.length)
            }
            ,
            e.prototype.toHexString = function () {
                return this.stream.hexDump(this.posStart(), this.posEnd(), !0)
            }
            ,
            e.decodeLength = function (e) {
                var t = e.get()
                    , r = 127 & t;
                if (r == t)
                    return r;
                if (r > 6)
                    throw new Error("Length over 48 bits not supported at position " + (e.pos - 1));
                if (0 === r)
                    return null;
                t = 0;
                for (var n = 0; n < r; ++n)
                    t = 256 * t + e.get();
                return t
            }
            ,
            e.prototype.getHexStringValue = function () {
                var e = this.toHexString()
                    , t = 2 * this.header
                    , r = 2 * this.length;
                return e.substr(t, r)
            }
            ,
            e.decode = function (t) {
                var r;
                r = t instanceof O ? t : new O(t, 0);
                var n = new O(r)
                    , i = new P(r)
                    , s = e.decodeLength(r)
                    , o = r.pos
                    , a = o - n.pos
                    , l = null
                    , c = function () {
                        var t = [];
                        if (null !== s) {
                            for (var n = o + s; r.pos < n;)
                                t[t.length] = e.decode(r);
                            if (r.pos != n)
                                throw new Error("Content size is not correct for container starting at offset " + o)
                        } else
                            try {
                                for (; ;) {
                                    var i = e.decode(r);
                                    if (i.tag.isEOC())
                                        break;
                                    t[t.length] = i
                                }
                                s = o - r.pos
                            } catch (a) {
                                throw new Error("Exception while decoding undefined length content: " + a)
                            }
                        return t
                    };
                if (i.tagConstructed)
                    l = c();
                else if (i.isUniversal() && (3 == i.tagNumber || 4 == i.tagNumber))
                    try {
                        if (3 == i.tagNumber && 0 != r.get())
                            throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
                        l = c();
                        for (var u = 0; u < l.length; ++u)
                            if (l[u].tag.isEOC())
                                throw new Error("EOC is not supposed to be actual content.")
                    } catch (d) {
                        l = null
                    }
                if (null === l) {
                    if (null === s)
                        throw new Error("We can't skip over an invalid tag with undefined length at offset " + o);
                    r.pos = o + Math.abs(s)
                }
                return new e(n, a, s, i, l)
            }
            ,
            e
    }(), P = function () {
        function e (e) {
            var t = e.get();
            if (this.tagClass = t >> 6,
                this.tagConstructed = 0 !== (32 & t),
                this.tagNumber = 31 & t,
                31 == this.tagNumber) {
                var r = new w;
                do {
                    t = e.get(),
                        r.mulAdd(128, 127 & t)
                } while (128 & t);
                this.tagNumber = r.simplify()
            }
        }
        return e.prototype.isUniversal = function () {
            return 0 === this.tagClass
        }
            ,
            e.prototype.isEOC = function () {
                return 0 === this.tagClass && 0 === this.tagNumber
            }
            ,
            e
    }(), _ = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997], A = (1 << 26) / _[_.length - 1], C = function () {
        function e (e, t, r) {
            null != e && ("number" == typeof e ? this.fromNumber(e, t, r) : null == t && "string" != typeof e ? this.fromString(e, 256) : this.fromString(e, t))
        }
        return e.prototype.toString = function (e) {
            if (this.s < 0)
                return "-" + this.negate().toString(e);
            var t;
            if (16 == e)
                t = 4;
            else if (8 == e)
                t = 3;
            else if (2 == e)
                t = 1;
            else if (32 == e)
                t = 5;
            else {
                if (4 != e)
                    return this.toRadix(e);
                t = 2
            }
            var r, n = (1 << t) - 1, s = !1, o = "", a = this.t, l = this.DB - a * this.DB % t;
            if (a-- > 0)
                for (l < this.DB && (r = this[a] >> l) > 0 && (s = !0,
                    o = i(r)); a >= 0;)
                    l < t ? (r = (this[a] & (1 << l) - 1) << t - l,
                        r |= this[--a] >> (l += this.DB - t)) : (r = this[a] >> (l -= t) & n,
                            l <= 0 && (l += this.DB,
                                --a)),
                        r > 0 && (s = !0),
                        s && (o += i(r));
            return s ? o : "0"
        }
            ,
            e.prototype.negate = function () {
                var t = B();
                return e.ZERO.subTo(this, t),
                    t
            }
            ,
            e.prototype.abs = function () {
                return this.s < 0 ? this.negate() : this
            }
            ,
            e.prototype.compareTo = function (e) {
                var t = this.s - e.s;
                if (0 != t)
                    return t;
                var r = this.t;
                if (0 != (t = r - e.t))
                    return this.s < 0 ? -t : t;
                for (; --r >= 0;)
                    if (0 != (t = this[r] - e[r]))
                        return t;
                return 0
            }
            ,
            e.prototype.bitLength = function () {
                return this.t <= 0 ? 0 : this.DB * (this.t - 1) + G(this[this.t - 1] ^ this.s & this.DM)
            }
            ,
            e.prototype.mod = function (t) {
                var r = B();
                return this.abs().divRemTo(t, null, r),
                    this.s < 0 && r.compareTo(e.ZERO) > 0 && t.subTo(r, r),
                    r
            }
            ,
            e.prototype.modPowInt = function (e, t) {
                var r;
                return r = e < 256 || t.isEven() ? new I(t) : new R(t),
                    this.exp(e, r)
            }
            ,
            e.prototype.clone = function () {
                var e = B();
                return this.copyTo(e),
                    e
            }
            ,
            e.prototype.intValue = function () {
                if (this.s < 0) {
                    if (1 == this.t)
                        return this[0] - this.DV;
                    if (0 == this.t)
                        return -1
                } else {
                    if (1 == this.t)
                        return this[0];
                    if (0 == this.t)
                        return 0
                }
                return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
            }
            ,
            e.prototype.byteValue = function () {
                return 0 == this.t ? this.s : this[0] << 24 >> 24
            }
            ,
            e.prototype.shortValue = function () {
                return 0 == this.t ? this.s : this[0] << 16 >> 16
            }
            ,
            e.prototype.signum = function () {
                return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
            }
            ,
            e.prototype.toByteArray = function () {
                var e = this.t
                    , t = [];
                t[0] = this.s;
                var r, n = this.DB - e * this.DB % 8, i = 0;
                if (e-- > 0)
                    for (n < this.DB && (r = this[e] >> n) != (this.s & this.DM) >> n && (t[i++] = r | this.s << this.DB - n); e >= 0;)
                        n < 8 ? (r = (this[e] & (1 << n) - 1) << 8 - n,
                            r |= this[--e] >> (n += this.DB - 8)) : (r = this[e] >> (n -= 8) & 255,
                                n <= 0 && (n += this.DB,
                                    --e)),
                            0 != (128 & r) && (r |= -256),
                            0 == i && (128 & this.s) != (128 & r) && ++i,
                            (i > 0 || r != this.s) && (t[i++] = r);
                return t
            }
            ,
            e.prototype.equals = function (e) {
                return 0 == this.compareTo(e)
            }
            ,
            e.prototype.min = function (e) {
                return this.compareTo(e) < 0 ? this : e
            }
            ,
            e.prototype.max = function (e) {
                return this.compareTo(e) > 0 ? this : e
            }
            ,
            e.prototype.and = function (e) {
                var t = B();
                return this.bitwiseTo(e, s, t),
                    t
            }
            ,
            e.prototype.or = function (e) {
                var t = B();
                return this.bitwiseTo(e, o, t),
                    t
            }
            ,
            e.prototype.xor = function (e) {
                var t = B();
                return this.bitwiseTo(e, a, t),
                    t
            }
            ,
            e.prototype.andNot = function (e) {
                var t = B();
                return this.bitwiseTo(e, l, t),
                    t
            }
            ,
            e.prototype.not = function () {
                for (var e = B(), t = 0; t < this.t; ++t)
                    e[t] = this.DM & ~this[t];
                return e.t = this.t,
                    e.s = ~this.s,
                    e
            }
            ,
            e.prototype.shiftLeft = function (e) {
                var t = B();
                return e < 0 ? this.rShiftTo(-e, t) : this.lShiftTo(e, t),
                    t
            }
            ,
            e.prototype.shiftRight = function (e) {
                var t = B();
                return e < 0 ? this.lShiftTo(-e, t) : this.rShiftTo(e, t),
                    t
            }
            ,
            e.prototype.getLowestSetBit = function () {
                for (var e = 0; e < this.t; ++e)
                    if (0 != this[e])
                        return e * this.DB + c(this[e]);
                return this.s < 0 ? this.t * this.DB : -1
            }
            ,
            e.prototype.bitCount = function () {
                for (var e = 0, t = this.s & this.DM, r = 0; r < this.t; ++r)
                    e += u(this[r] ^ t);
                return e
            }
            ,
            e.prototype.testBit = function (e) {
                var t = Math.floor(e / this.DB);
                return t >= this.t ? 0 != this.s : 0 != (this[t] & 1 << e % this.DB)
            }
            ,
            e.prototype.setBit = function (e) {
                return this.changeBit(e, o)
            }
            ,
            e.prototype.clearBit = function (e) {
                return this.changeBit(e, l)
            }
            ,
            e.prototype.flipBit = function (e) {
                return this.changeBit(e, a)
            }
            ,
            e.prototype.add = function (e) {
                var t = B();
                return this.addTo(e, t),
                    t
            }
            ,
            e.prototype.subtract = function (e) {
                var t = B();
                return this.subTo(e, t),
                    t
            }
            ,
            e.prototype.multiply = function (e) {
                var t = B();
                return this.multiplyTo(e, t),
                    t
            }
            ,
            e.prototype.divide = function (e) {
                var t = B();
                return this.divRemTo(e, t, null),
                    t
            }
            ,
            e.prototype.remainder = function (e) {
                var t = B();
                return this.divRemTo(e, null, t),
                    t
            }
            ,
            e.prototype.divideAndRemainder = function (e) {
                var t = B()
                    , r = B();
                return this.divRemTo(e, t, r),
                    [t, r]
            }
            ,
            e.prototype.modPow = function (e, t) {
                var r, n, i = e.bitLength(), s = H(1);
                if (i <= 0)
                    return s;
                r = i < 18 ? 1 : i < 48 ? 3 : i < 144 ? 4 : i < 768 ? 5 : 6,
                    n = i < 8 ? new I(t) : t.isEven() ? new L(t) : new R(t);
                var o = []
                    , a = 3
                    , l = r - 1
                    , c = (1 << r) - 1;
                if (o[1] = n.convert(this),
                    r > 1) {
                    var u = B();
                    for (n.sqrTo(o[1], u); a <= c;)
                        o[a] = B(),
                            n.mulTo(u, o[a - 2], o[a]),
                            a += 2
                }
                var d, p, f = e.t - 1, h = !0, g = B();
                for (i = G(e[f]) - 1; f >= 0;) {
                    for (i >= l ? d = e[f] >> i - l & c : (d = (e[f] & (1 << i + 1) - 1) << l - i,
                        f > 0 && (d |= e[f - 1] >> this.DB + i - l)),
                        a = r; 0 == (1 & d);)
                        d >>= 1,
                            --a;
                    if ((i -= a) < 0 && (i += this.DB,
                        --f),
                        h)
                        o[d].copyTo(s),
                            h = !1;
                    else {
                        for (; a > 1;)
                            n.sqrTo(s, g),
                                n.sqrTo(g, s),
                                a -= 2;
                        a > 0 ? n.sqrTo(s, g) : (p = s,
                            s = g,
                            g = p),
                            n.mulTo(g, o[d], s)
                    }
                    for (; f >= 0 && 0 == (e[f] & 1 << i);)
                        n.sqrTo(s, g),
                            p = s,
                            s = g,
                            g = p,
                            --i < 0 && (i = this.DB - 1,
                                --f)
                }
                return n.revert(s)
            }
            ,
            e.prototype.modInverse = function (t) {
                var r = t.isEven();
                if (this.isEven() && r || 0 == t.signum())
                    return e.ZERO;
                for (var n = t.clone(), i = this.clone(), s = H(1), o = H(0), a = H(0), l = H(1); 0 != n.signum();) {
                    for (; n.isEven();)
                        n.rShiftTo(1, n),
                            r ? (s.isEven() && o.isEven() || (s.addTo(this, s),
                                o.subTo(t, o)),
                                s.rShiftTo(1, s)) : o.isEven() || o.subTo(t, o),
                            o.rShiftTo(1, o);
                    for (; i.isEven();)
                        i.rShiftTo(1, i),
                            r ? (a.isEven() && l.isEven() || (a.addTo(this, a),
                                l.subTo(t, l)),
                                a.rShiftTo(1, a)) : l.isEven() || l.subTo(t, l),
                            l.rShiftTo(1, l);
                    n.compareTo(i) >= 0 ? (n.subTo(i, n),
                        r && s.subTo(a, s),
                        o.subTo(l, o)) : (i.subTo(n, i),
                            r && a.subTo(s, a),
                            l.subTo(o, l))
                }
                return 0 != i.compareTo(e.ONE) ? e.ZERO : l.compareTo(t) >= 0 ? l.subtract(t) : l.signum() < 0 ? (l.addTo(t, l),
                    l.signum() < 0 ? l.add(t) : l) : l
            }
            ,
            e.prototype.pow = function (e) {
                return this.exp(e, new D)
            }
            ,
            e.prototype.gcd = function (e) {
                var t = this.s < 0 ? this.negate() : this.clone()
                    , r = e.s < 0 ? e.negate() : e.clone();
                if (t.compareTo(r) < 0) {
                    var n = t;
                    t = r,
                        r = n
                }
                var i = t.getLowestSetBit()
                    , s = r.getLowestSetBit();
                if (s < 0)
                    return t;
                for (i < s && (s = i),
                    s > 0 && (t.rShiftTo(s, t),
                        r.rShiftTo(s, r)); t.signum() > 0;)
                    (i = t.getLowestSetBit()) > 0 && t.rShiftTo(i, t),
                        (i = r.getLowestSetBit()) > 0 && r.rShiftTo(i, r),
                        t.compareTo(r) >= 0 ? (t.subTo(r, t),
                            t.rShiftTo(1, t)) : (r.subTo(t, r),
                                r.rShiftTo(1, r));
                return s > 0 && r.lShiftTo(s, r),
                    r
            }
            ,
            e.prototype.isProbablePrime = function (e) {
                var t, r = this.abs();
                if (1 == r.t && r[0] <= _[_.length - 1]) {
                    for (t = 0; t < _.length; ++t)
                        if (r[0] == _[t])
                            return !0;
                    return !1
                }
                if (r.isEven())
                    return !1;
                for (t = 1; t < _.length;) {
                    for (var n = _[t], i = t + 1; i < _.length && n < A;)
                        n *= _[i++];
                    for (n = r.modInt(n); t < i;)
                        if (n % _[t++] == 0)
                            return !1
                }
                return r.millerRabin(e)
            }
            ,
            e.prototype.copyTo = function (e) {
                for (var t = this.t - 1; t >= 0; --t)
                    e[t] = this[t];
                e.t = this.t,
                    e.s = this.s
            }
            ,
            e.prototype.fromInt = function (e) {
                this.t = 1,
                    this.s = e < 0 ? -1 : 0,
                    e > 0 ? this[0] = e : e < -1 ? this[0] = e + this.DV : this.t = 0
            }
            ,
            e.prototype.fromString = function (t, r) {
                var n;
                if (16 == r)
                    n = 4;
                else if (8 == r)
                    n = 3;
                else if (256 == r)
                    n = 8;
                else if (2 == r)
                    n = 1;
                else if (32 == r)
                    n = 5;
                else {
                    if (4 != r)
                        return void this.fromRadix(t, r);
                    n = 2
                }
                this.t = 0,
                    this.s = 0;
                for (var i = t.length, s = !1, o = 0; --i >= 0;) {
                    var a = 8 == n ? 255 & +t[i] : z(t, i);
                    a < 0 ? "-" == t.charAt(i) && (s = !0) : (s = !1,
                        0 == o ? this[this.t++] = a : o + n > this.DB ? (this[this.t - 1] |= (a & (1 << this.DB - o) - 1) << o,
                            this[this.t++] = a >> this.DB - o) : this[this.t - 1] |= a << o,
                        (o += n) >= this.DB && (o -= this.DB))
                }
                8 == n && 0 != (128 & +t[0]) && (this.s = -1,
                    o > 0 && (this[this.t - 1] |= (1 << this.DB - o) - 1 << o)),
                    this.clamp(),
                    s && e.ZERO.subTo(this, this)
            }
            ,
            e.prototype.clamp = function () {
                for (var e = this.s & this.DM; this.t > 0 && this[this.t - 1] == e;)
                    --this.t
            }
            ,
            e.prototype.dlShiftTo = function (e, t) {
                var r;
                for (r = this.t - 1; r >= 0; --r)
                    t[r + e] = this[r];
                for (r = e - 1; r >= 0; --r)
                    t[r] = 0;
                t.t = this.t + e,
                    t.s = this.s
            }
            ,
            e.prototype.drShiftTo = function (e, t) {
                for (var r = e; r < this.t; ++r)
                    t[r - e] = this[r];
                t.t = Math.max(this.t - e, 0),
                    t.s = this.s
            }
            ,
            e.prototype.lShiftTo = function (e, t) {
                for (var r = e % this.DB, n = this.DB - r, i = (1 << n) - 1, s = Math.floor(e / this.DB), o = this.s << r & this.DM, a = this.t - 1; a >= 0; --a)
                    t[a + s + 1] = this[a] >> n | o,
                        o = (this[a] & i) << r;
                for (a = s - 1; a >= 0; --a)
                    t[a] = 0;
                t[s] = o,
                    t.t = this.t + s + 1,
                    t.s = this.s,
                    t.clamp()
            }
            ,
            e.prototype.rShiftTo = function (e, t) {
                t.s = this.s;
                var r = Math.floor(e / this.DB);
                if (r >= this.t)
                    t.t = 0;
                else {
                    var n = e % this.DB
                        , i = this.DB - n
                        , s = (1 << n) - 1;
                    t[0] = this[r] >> n;
                    for (var o = r + 1; o < this.t; ++o)
                        t[o - r - 1] |= (this[o] & s) << i,
                            t[o - r] = this[o] >> n;
                    n > 0 && (t[this.t - r - 1] |= (this.s & s) << i),
                        t.t = this.t - r,
                        t.clamp()
                }
            }
            ,
            e.prototype.subTo = function (e, t) {
                for (var r = 0, n = 0, i = Math.min(e.t, this.t); r < i;)
                    n += this[r] - e[r],
                        t[r++] = n & this.DM,
                        n >>= this.DB;
                if (e.t < this.t) {
                    for (n -= e.s; r < this.t;)
                        n += this[r],
                            t[r++] = n & this.DM,
                            n >>= this.DB;
                    n += this.s
                } else {
                    for (n += this.s; r < e.t;)
                        n -= e[r],
                            t[r++] = n & this.DM,
                            n >>= this.DB;
                    n -= e.s
                }
                t.s = n < 0 ? -1 : 0,
                    n < -1 ? t[r++] = this.DV + n : n > 0 && (t[r++] = n),
                    t.t = r,
                    t.clamp()
            }
            ,
            e.prototype.multiplyTo = function (t, r) {
                var n = this.abs()
                    , i = t.abs()
                    , s = n.t;
                for (r.t = s + i.t; --s >= 0;)
                    r[s] = 0;
                for (s = 0; s < i.t; ++s)
                    r[s + n.t] = n.am(0, i[s], r, s, 0, n.t);
                r.s = 0,
                    r.clamp(),
                    this.s != t.s && e.ZERO.subTo(r, r)
            }
            ,
            e.prototype.squareTo = function (e) {
                for (var t = this.abs(), r = e.t = 2 * t.t; --r >= 0;)
                    e[r] = 0;
                for (r = 0; r < t.t - 1; ++r) {
                    var n = t.am(r, t[r], e, 2 * r, 0, 1);
                    (e[r + t.t] += t.am(r + 1, 2 * t[r], e, 2 * r + 1, n, t.t - r - 1)) >= t.DV && (e[r + t.t] -= t.DV,
                        e[r + t.t + 1] = 1)
                }
                e.t > 0 && (e[e.t - 1] += t.am(r, t[r], e, 2 * r, 0, 1)),
                    e.s = 0,
                    e.clamp()
            }
            ,
            e.prototype.divRemTo = function (t, r, n) {
                var i = t.abs();
                if (!(i.t <= 0)) {
                    var s = this.abs();
                    if (s.t < i.t)
                        return null != r && r.fromInt(0),
                            void (null != n && this.copyTo(n));
                    null == n && (n = B());
                    var o = B()
                        , a = this.s
                        , l = t.s
                        , c = this.DB - G(i[i.t - 1]);
                    c > 0 ? (i.lShiftTo(c, o),
                        s.lShiftTo(c, n)) : (i.copyTo(o),
                            s.copyTo(n));
                    var u = o.t
                        , d = o[u - 1];
                    if (0 != d) {
                        var p = d * (1 << this.F1) + (u > 1 ? o[u - 2] >> this.F2 : 0)
                            , f = this.FV / p
                            , h = (1 << this.F1) / p
                            , g = 1 << this.F2
                            , m = n.t
                            , v = m - u
                            , y = null == r ? B() : r;
                        for (o.dlShiftTo(v, y),
                            n.compareTo(y) >= 0 && (n[n.t++] = 1,
                                n.subTo(y, n)),
                            e.ONE.dlShiftTo(u, y),
                            y.subTo(o, o); o.t < u;)
                            o[o.t++] = 0;
                        for (; --v >= 0;) {
                            var b = n[--m] == d ? this.DM : Math.floor(n[m] * f + (n[m - 1] + g) * h);
                            if ((n[m] += o.am(0, b, n, v, 0, u)) < b)
                                for (o.dlShiftTo(v, y),
                                    n.subTo(y, n); n[m] < --b;)
                                    n.subTo(y, n)
                        }
                        null != r && (n.drShiftTo(u, r),
                            a != l && e.ZERO.subTo(r, r)),
                            n.t = u,
                            n.clamp(),
                            c > 0 && n.rShiftTo(c, n),
                            a < 0 && e.ZERO.subTo(n, n)
                    }
                }
            }
            ,
            e.prototype.invDigit = function () {
                if (this.t < 1)
                    return 0;
                var e = this[0];
                if (0 == (1 & e))
                    return 0;
                var t = 3 & e;
                return (t = (t = (t = (t = t * (2 - (15 & e) * t) & 15) * (2 - (255 & e) * t) & 255) * (2 - ((65535 & e) * t & 65535)) & 65535) * (2 - e * t % this.DV) % this.DV) > 0 ? this.DV - t : -t
            }
            ,
            e.prototype.isEven = function () {
                return 0 == (this.t > 0 ? 1 & this[0] : this.s)
            }
            ,
            e.prototype.exp = function (t, r) {
                if (t > 4294967295 || t < 1)
                    return e.ONE;
                var n = B()
                    , i = B()
                    , s = r.convert(this)
                    , o = G(t) - 1;
                for (s.copyTo(n); --o >= 0;)
                    if (r.sqrTo(n, i),
                        (t & 1 << o) > 0)
                        r.mulTo(i, s, n);
                    else {
                        var a = n;
                        n = i,
                            i = a
                    }
                return r.revert(n)
            }
            ,
            e.prototype.chunkSize = function (e) {
                return Math.floor(Math.LN2 * this.DB / Math.log(e))
            }
            ,
            e.prototype.toRadix = function (e) {
                if (null == e && (e = 10),
                    0 == this.signum() || e < 2 || e > 36)
                    return "0";
                var t = this.chunkSize(e)
                    , r = Math.pow(e, t)
                    , n = H(r)
                    , i = B()
                    , s = B()
                    , o = "";
                for (this.divRemTo(n, i, s); i.signum() > 0;)
                    o = (r + s.intValue()).toString(e).substr(1) + o,
                        i.divRemTo(n, i, s);
                return s.intValue().toString(e) + o
            }
            ,
            e.prototype.fromRadix = function (t, r) {
                this.fromInt(0),
                    null == r && (r = 10);
                for (var n = this.chunkSize(r), i = Math.pow(r, n), s = !1, o = 0, a = 0, l = 0; l < t.length; ++l) {
                    var c = z(t, l);
                    c < 0 ? "-" == t.charAt(l) && 0 == this.signum() && (s = !0) : (a = r * a + c,
                        ++o >= n && (this.dMultiply(i),
                            this.dAddOffset(a, 0),
                            o = 0,
                            a = 0))
                }
                o > 0 && (this.dMultiply(Math.pow(r, o)),
                    this.dAddOffset(a, 0)),
                    s && e.ZERO.subTo(this, this)
            }
            ,
            e.prototype.fromNumber = function (t, r, n) {
                if ("number" == typeof r)
                    if (t < 2)
                        this.fromInt(1);
                    else
                        for (this.fromNumber(t, n),
                            this.testBit(t - 1) || this.bitwiseTo(e.ONE.shiftLeft(t - 1), o, this),
                            this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(r);)
                            this.dAddOffset(2, 0),
                                this.bitLength() > t && this.subTo(e.ONE.shiftLeft(t - 1), this);
                else {
                    var i = []
                        , s = 7 & t;
                    i.length = 1 + (t >> 3),
                        r.nextBytes(i),
                        s > 0 ? i[0] &= (1 << s) - 1 : i[0] = 0,
                        this.fromString(i, 256)
                }
            }
            ,
            e.prototype.bitwiseTo = function (e, t, r) {
                var n, i, s = Math.min(e.t, this.t);
                for (n = 0; n < s; ++n)
                    r[n] = t(this[n], e[n]);
                if (e.t < this.t) {
                    for (i = e.s & this.DM,
                        n = s; n < this.t; ++n)
                        r[n] = t(this[n], i);
                    r.t = this.t
                } else {
                    for (i = this.s & this.DM,
                        n = s; n < e.t; ++n)
                        r[n] = t(i, e[n]);
                    r.t = e.t
                }
                r.s = t(this.s, e.s),
                    r.clamp()
            }
            ,
            e.prototype.changeBit = function (t, r) {
                var n = e.ONE.shiftLeft(t);
                return this.bitwiseTo(n, r, n),
                    n
            }
            ,
            e.prototype.addTo = function (e, t) {
                for (var r = 0, n = 0, i = Math.min(e.t, this.t); r < i;)
                    n += this[r] + e[r],
                        t[r++] = n & this.DM,
                        n >>= this.DB;
                if (e.t < this.t) {
                    for (n += e.s; r < this.t;)
                        n += this[r],
                            t[r++] = n & this.DM,
                            n >>= this.DB;
                    n += this.s
                } else {
                    for (n += this.s; r < e.t;)
                        n += e[r],
                            t[r++] = n & this.DM,
                            n >>= this.DB;
                    n += e.s
                }
                t.s = n < 0 ? -1 : 0,
                    n > 0 ? t[r++] = n : n < -1 && (t[r++] = this.DV + n),
                    t.t = r,
                    t.clamp()
            }
            ,
            e.prototype.dMultiply = function (e) {
                this[this.t] = this.am(0, e - 1, this, 0, 0, this.t),
                    ++this.t,
                    this.clamp()
            }
            ,
            e.prototype.dAddOffset = function (e, t) {
                if (0 != e) {
                    for (; this.t <= t;)
                        this[this.t++] = 0;
                    for (this[t] += e; this[t] >= this.DV;)
                        this[t] -= this.DV,
                            ++t >= this.t && (this[this.t++] = 0),
                            ++this[t]
                }
            }
            ,
            e.prototype.multiplyLowerTo = function (e, t, r) {
                var n = Math.min(this.t + e.t, t);
                for (r.s = 0,
                    r.t = n; n > 0;)
                    r[--n] = 0;
                for (var i = r.t - this.t; n < i; ++n)
                    r[n + this.t] = this.am(0, e[n], r, n, 0, this.t);
                for (i = Math.min(e.t, t); n < i; ++n)
                    this.am(0, e[n], r, n, 0, t - n);
                r.clamp()
            }
            ,
            e.prototype.multiplyUpperTo = function (e, t, r) {
                --t;
                var n = r.t = this.t + e.t - t;
                for (r.s = 0; --n >= 0;)
                    r[n] = 0;
                for (n = Math.max(t - this.t, 0); n < e.t; ++n)
                    r[this.t + n - t] = this.am(t - n, e[n], r, 0, 0, this.t + n - t);
                r.clamp(),
                    r.drShiftTo(1, r)
            }
            ,
            e.prototype.modInt = function (e) {
                if (e <= 0)
                    return 0;
                var t = this.DV % e
                    , r = this.s < 0 ? e - 1 : 0;
                if (this.t > 0)
                    if (0 == t)
                        r = this[0] % e;
                    else
                        for (var n = this.t - 1; n >= 0; --n)
                            r = (t * r + this[n]) % e;
                return r
            }
            ,
            e.prototype.millerRabin = function (t) {
                var r = this.subtract(e.ONE)
                    , n = r.getLowestSetBit();
                if (n <= 0)
                    return !1;
                var i = r.shiftRight(n);
                (t = t + 1 >> 1) > _.length && (t = _.length);
                for (var s = B(), o = 0; o < t; ++o) {
                    s.fromInt(_[Math.floor(Math.random() * _.length)]);
                    var a = s.modPow(i, this);
                    if (0 != a.compareTo(e.ONE) && 0 != a.compareTo(r)) {
                        for (var l = 1; l++ < n && 0 != a.compareTo(r);)
                            if (0 == (a = a.modPowInt(2, this)).compareTo(e.ONE))
                                return !1;
                        if (0 != a.compareTo(r))
                            return !1
                    }
                }
                return !0
            }
            ,
            e.prototype.square = function () {
                var e = B();
                return this.squareTo(e),
                    e
            }
            ,
            e.prototype.gcda = function (e, t) {
                var r = this.s < 0 ? this.negate() : this.clone()
                    , n = e.s < 0 ? e.negate() : e.clone();
                if (r.compareTo(n) < 0) {
                    var i = r;
                    r = n,
                        n = i
                }
                var s = r.getLowestSetBit()
                    , o = n.getLowestSetBit();
                if (o < 0)
                    t(r);
                else {
                    s < o && (o = s),
                        o > 0 && (r.rShiftTo(o, r),
                            n.rShiftTo(o, n));
                    var a = function () {
                        (s = r.getLowestSetBit()) > 0 && r.rShiftTo(s, r),
                            (s = n.getLowestSetBit()) > 0 && n.rShiftTo(s, n),
                            r.compareTo(n) >= 0 ? (r.subTo(n, r),
                                r.rShiftTo(1, r)) : (n.subTo(r, n),
                                    n.rShiftTo(1, n)),
                            r.signum() > 0 ? setTimeout(a, 0) : (o > 0 && n.lShiftTo(o, n),
                                setTimeout((function () {
                                    t(n)
                                }
                                ), 0))
                    };
                    setTimeout(a, 10)
                }
            }
            ,
            e.prototype.fromNumberAsync = function (t, r, n, i) {
                if ("number" == typeof r)
                    if (t < 2)
                        this.fromInt(1);
                    else {
                        this.fromNumber(t, n),
                            this.testBit(t - 1) || this.bitwiseTo(e.ONE.shiftLeft(t - 1), o, this),
                            this.isEven() && this.dAddOffset(1, 0);
                        var s = this
                            , a = function () {
                                s.dAddOffset(2, 0),
                                    s.bitLength() > t && s.subTo(e.ONE.shiftLeft(t - 1), s),
                                    s.isProbablePrime(r) ? setTimeout((function () {
                                        i()
                                    }
                                    ), 0) : setTimeout(a, 0)
                            };
                        setTimeout(a, 0)
                    }
                else {
                    var l = []
                        , c = 7 & t;
                    l.length = 1 + (t >> 3),
                        r.nextBytes(l),
                        c > 0 ? l[0] &= (1 << c) - 1 : l[0] = 0,
                        this.fromString(l, 256)
                }
            }
            ,
            e
    }(), D = function () {
        function e () { }
        return e.prototype.convert = function (e) {
            return e
        }
            ,
            e.prototype.revert = function (e) {
                return e
            }
            ,
            e.prototype.mulTo = function (e, t, r) {
                e.multiplyTo(t, r)
            }
            ,
            e.prototype.sqrTo = function (e, t) {
                e.squareTo(t)
            }
            ,
            e
    }(), I = function () {
        function e (e) {
            this.m = e
        }
        return e.prototype.convert = function (e) {
            return e.s < 0 || e.compareTo(this.m) >= 0 ? e.mod(this.m) : e
        }
            ,
            e.prototype.revert = function (e) {
                return e
            }
            ,
            e.prototype.reduce = function (e) {
                e.divRemTo(this.m, null, e)
            }
            ,
            e.prototype.mulTo = function (e, t, r) {
                e.multiplyTo(t, r),
                    this.reduce(r)
            }
            ,
            e.prototype.sqrTo = function (e, t) {
                e.squareTo(t),
                    this.reduce(t)
            }
            ,
            e
    }(), R = function () {
        function e (e) {
            this.m = e,
                this.mp = e.invDigit(),
                this.mpl = 32767 & this.mp,
                this.mph = this.mp >> 15,
                this.um = (1 << e.DB - 15) - 1,
                this.mt2 = 2 * e.t
        }
        return e.prototype.convert = function (e) {
            var t = B();
            return e.abs().dlShiftTo(this.m.t, t),
                t.divRemTo(this.m, null, t),
                e.s < 0 && t.compareTo(C.ZERO) > 0 && this.m.subTo(t, t),
                t
        }
            ,
            e.prototype.revert = function (e) {
                var t = B();
                return e.copyTo(t),
                    this.reduce(t),
                    t
            }
            ,
            e.prototype.reduce = function (e) {
                for (; e.t <= this.mt2;)
                    e[e.t++] = 0;
                for (var t = 0; t < this.m.t; ++t) {
                    var r = 32767 & e[t]
                        , n = r * this.mpl + ((r * this.mph + (e[t] >> 15) * this.mpl & this.um) << 15) & e.DM;
                    for (e[r = t + this.m.t] += this.m.am(0, n, e, t, 0, this.m.t); e[r] >= e.DV;)
                        e[r] -= e.DV,
                            e[++r]++
                }
                e.clamp(),
                    e.drShiftTo(this.m.t, e),
                    e.compareTo(this.m) >= 0 && e.subTo(this.m, e)
            }
            ,
            e.prototype.mulTo = function (e, t, r) {
                e.multiplyTo(t, r),
                    this.reduce(r)
            }
            ,
            e.prototype.sqrTo = function (e, t) {
                e.squareTo(t),
                    this.reduce(t)
            }
            ,
            e
    }(), L = function () {
        function e (e) {
            this.m = e,
                this.r2 = B(),
                this.q3 = B(),
                C.ONE.dlShiftTo(2 * e.t, this.r2),
                this.mu = this.r2.divide(e)
        }
        return e.prototype.convert = function (e) {
            if (e.s < 0 || e.t > 2 * this.m.t)
                return e.mod(this.m);
            if (e.compareTo(this.m) < 0)
                return e;
            var t = B();
            return e.copyTo(t),
                this.reduce(t),
                t
        }
            ,
            e.prototype.revert = function (e) {
                return e
            }
            ,
            e.prototype.reduce = function (e) {
                for (e.drShiftTo(this.m.t - 1, this.r2),
                    e.t > this.m.t + 1 && (e.t = this.m.t + 1,
                        e.clamp()),
                    this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
                    this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); e.compareTo(this.r2) < 0;)
                    e.dAddOffset(1, this.m.t + 1);
                for (e.subTo(this.r2, e); e.compareTo(this.m) >= 0;)
                    e.subTo(this.m, e)
            }
            ,
            e.prototype.mulTo = function (e, t, r) {
                e.multiplyTo(t, r),
                    this.reduce(r)
            }
            ,
            e.prototype.sqrTo = function (e, t) {
                e.squareTo(t),
                    this.reduce(t)
            }
            ,
            e
    }();
    function B () {
        return new C(null)
    }
    function k (e, t) {
        return new C(e, t)
    }
    var j = "undefined" !== typeof navigator;
    j && "Microsoft Internet Explorer" == navigator.appName ? (C.prototype.am = function (e, t, r, n, i, s) {
        for (var o = 32767 & t, a = t >> 15; --s >= 0;) {
            var l = 32767 & this[e]
                , c = this[e++] >> 15
                , u = a * l + c * o;
            i = ((l = o * l + ((32767 & u) << 15) + r[n] + (1073741823 & i)) >>> 30) + (u >>> 15) + a * c + (i >>> 30),
                r[n++] = 1073741823 & l
        }
        return i
    }
        ,
        E = 30) : j && "Netscape" != navigator.appName ? (C.prototype.am = function (e, t, r, n, i, s) {
            for (; --s >= 0;) {
                var o = t * this[e++] + r[n] + i;
                i = Math.floor(o / 67108864),
                    r[n++] = 67108863 & o
            }
            return i
        }
            ,
            E = 26) : (C.prototype.am = function (e, t, r, n, i, s) {
                for (var o = 16383 & t, a = t >> 14; --s >= 0;) {
                    var l = 16383 & this[e]
                        , c = this[e++] >> 14
                        , u = a * l + c * o;
                    i = ((l = o * l + ((16383 & u) << 14) + r[n] + i) >> 28) + (u >> 14) + a * c,
                        r[n++] = 268435455 & l
                }
                return i
            }
                ,
                E = 28),
        C.prototype.DB = E,
        C.prototype.DM = (1 << E) - 1,
        C.prototype.DV = 1 << E;
    C.prototype.FV = Math.pow(2, 52),
        C.prototype.F1 = 52 - E,
        C.prototype.F2 = 2 * E - 52;
    var N, F, V = [];
    for (N = "0".charCodeAt(0),
        F = 0; F <= 9; ++F)
        V[N++] = F;
    for (N = "a".charCodeAt(0),
        F = 10; F < 36; ++F)
        V[N++] = F;
    for (N = "A".charCodeAt(0),
        F = 10; F < 36; ++F)
        V[N++] = F;
    function z (e, t) {
        var r = V[e.charCodeAt(t)];
        return null == r ? -1 : r
    }
    function H (e) {
        var t = B();
        return t.fromInt(e),
            t
    }
    function G (e) {
        var t, r = 1;
        return 0 != (t = e >>> 16) && (e = t,
            r += 16),
            0 != (t = e >> 8) && (e = t,
                r += 8),
            0 != (t = e >> 4) && (e = t,
                r += 4),
            0 != (t = e >> 2) && (e = t,
                r += 2),
            0 != (t = e >> 1) && (e = t,
                r += 1),
            r
    }
    C.ZERO = H(0),
        C.ONE = H(1);
    var q = function () {
        function e () {
            this.i = 0,
                this.j = 0,
                this.S = []
        }
        return e.prototype.init = function (e) {
            var t, r, n;
            for (t = 0; t < 256; ++t)
                this.S[t] = t;
            for (r = 0,
                t = 0; t < 256; ++t)
                r = r + this.S[t] + e[t % e.length] & 255,
                    n = this.S[t],
                    this.S[t] = this.S[r],
                    this.S[r] = n;
            this.i = 0,
                this.j = 0
        }
            ,
            e.prototype.next = function () {
                var e;
                return this.i = this.i + 1 & 255,
                    this.j = this.j + this.S[this.i] & 255,
                    e = this.S[this.i],
                    this.S[this.i] = this.S[this.j],
                    this.S[this.j] = e,
                    this.S[e + this.S[this.i] & 255]
            }
            ,
            e
    }();
    var W, U, Y = null;
    if (null == Y) {
        Y = [],
            U = 0;
        var K = void 0;
        if ("undefined" !== typeof window && window.crypto && window.crypto.getRandomValues) {
            var X = new Uint32Array(256);
            for (window.crypto.getRandomValues(X),
                K = 0; K < X.length; ++K)
                Y[U++] = 255 & X[K]
        }
        var $ = 0
            , Z = function (e) {
                if (($ = $ || 0) >= 256 || U >= 256)
                    window.removeEventListener ? window.removeEventListener("mousemove", Z, !1) : window.detachEvent && window.detachEvent("onmousemove", Z);
                else
                    try {
                        var t = e.x + e.y;
                        Y[U++] = 255 & t,
                            $ += 1
                    } catch (r) { }
            };
        "undefined" !== typeof window && (window.addEventListener ? window.addEventListener("mousemove", Z, !1) : window.attachEvent && window.attachEvent("onmousemove", Z))
    }
    function J () {
        if (null == W) {
            for (W = new q; U < 256;) {
                var e = Math.floor(65536 * Math.random());
                Y[U++] = 255 & e
            }
            for (W.init(Y),
                U = 0; U < Y.length; ++U)
                Y[U] = 0;
            U = 0
        }
        return W.next()
    }
    var Q = function () {
        function e () { }
        return e.prototype.nextBytes = function (e) {
            for (var t = 0; t < e.length; ++t)
                e[t] = J()
        }
            ,
            e
    }();
    var ee = function () {
        function e () {
            this.n = null,
                this.e = 0,
                this.d = null,
                this.p = null,
                this.q = null,
                this.dmp1 = null,
                this.dmq1 = null,
                this.coeff = null
        }
        return e.prototype.doPublic = function (e) {
            return e.modPowInt(this.e, this.n)
        }
            ,
            e.prototype.doPrivate = function (e) {
                if (null == this.p || null == this.q)
                    return e.modPow(this.d, this.n);
                for (var t = e.mod(this.p).modPow(this.dmp1, this.p), r = e.mod(this.q).modPow(this.dmq1, this.q); t.compareTo(r) < 0;)
                    t = t.add(this.p);
                return t.subtract(r).multiply(this.coeff).mod(this.p).multiply(this.q).add(r)
            }
            ,
            e.prototype.setPublic = function (e, t) {
                null != e && null != t && e.length > 0 && t.length > 0 ? (this.n = k(e, 16),
                    this.e = parseInt(t, 16)) : console.error("Invalid RSA public key")
            }
            ,
            e.prototype.encrypt = function (e) {
                var t = this.n.bitLength() + 7 >> 3
                    , r = function (e, t) {
                        if (t < e.length + 11)
                            return console.error("Message too long for RSA"),
                                null;
                        for (var r = [], n = e.length - 1; n >= 0 && t > 0;) {
                            var i = e.charCodeAt(n--);
                            i < 128 ? r[--t] = i : i > 127 && i < 2048 ? (r[--t] = 63 & i | 128,
                                r[--t] = i >> 6 | 192) : (r[--t] = 63 & i | 128,
                                    r[--t] = i >> 6 & 63 | 128,
                                    r[--t] = i >> 12 | 224)
                        }
                        r[--t] = 0;
                        for (var s = new Q, o = []; t > 2;) {
                            for (o[0] = 0; 0 == o[0];)
                                s.nextBytes(o);
                            r[--t] = o[0]
                        }
                        return r[--t] = 2,
                            r[--t] = 0,
                            new C(r)
                    }(e, t);
                if (null == r)
                    return null;
                var n = this.doPublic(r);
                if (null == n)
                    return null;
                for (var i = n.toString(16), s = i.length, o = 0; o < 2 * t - s; o++)
                    i = "0" + i;
                return i
            }
            ,
            e.prototype.setPrivate = function (e, t, r) {
                null != e && null != t && e.length > 0 && t.length > 0 ? (this.n = k(e, 16),
                    this.e = parseInt(t, 16),
                    this.d = k(r, 16)) : console.error("Invalid RSA private key")
            }
            ,
            e.prototype.setPrivateEx = function (e, t, r, n, i, s, o, a) {
                null != e && null != t && e.length > 0 && t.length > 0 ? (this.n = k(e, 16),
                    this.e = parseInt(t, 16),
                    this.d = k(r, 16),
                    this.p = k(n, 16),
                    this.q = k(i, 16),
                    this.dmp1 = k(s, 16),
                    this.dmq1 = k(o, 16),
                    this.coeff = k(a, 16)) : console.error("Invalid RSA private key")
            }
            ,
            e.prototype.generate = function (e, t) {
                var r = new Q
                    , n = e >> 1;
                this.e = parseInt(t, 16);
                for (var i = new C(t, 16); ;) {
                    for (; this.p = new C(e - n, 1, r),
                        0 != this.p.subtract(C.ONE).gcd(i).compareTo(C.ONE) || !this.p.isProbablePrime(10);)
                        ;
                    for (; this.q = new C(n, 1, r),
                        0 != this.q.subtract(C.ONE).gcd(i).compareTo(C.ONE) || !this.q.isProbablePrime(10);)
                        ;
                    if (this.p.compareTo(this.q) <= 0) {
                        var s = this.p;
                        this.p = this.q,
                            this.q = s
                    }
                    var o = this.p.subtract(C.ONE)
                        , a = this.q.subtract(C.ONE)
                        , l = o.multiply(a);
                    if (0 == l.gcd(i).compareTo(C.ONE)) {
                        this.n = this.p.multiply(this.q),
                            this.d = i.modInverse(l),
                            this.dmp1 = this.d.mod(o),
                            this.dmq1 = this.d.mod(a),
                            this.coeff = this.q.modInverse(this.p);
                        break
                    }
                }
            }
            ,
            e.prototype.decrypt = function (e) {
                var t = k(e, 16)
                    , r = this.doPrivate(t);
                return null == r ? null : function (e, t) {
                    var r = e.toByteArray()
                        , n = 0;
                    for (; n < r.length && 0 == r[n];)
                        ++n;
                    if (r.length - n != t - 1 || 2 != r[n])
                        return null;
                    ++n;
                    for (; 0 != r[n];)
                        if (++n >= r.length)
                            return null;
                    var i = "";
                    for (; ++n < r.length;) {
                        var s = 255 & r[n];
                        s < 128 ? i += String.fromCharCode(s) : s > 191 && s < 224 ? (i += String.fromCharCode((31 & s) << 6 | 63 & r[n + 1]),
                            ++n) : (i += String.fromCharCode((15 & s) << 12 | (63 & r[n + 1]) << 6 | 63 & r[n + 2]),
                                n += 2)
                    }
                    return i
                }(r, this.n.bitLength() + 7 >> 3)
            }
            ,
            e.prototype.generateAsync = function (e, t, r) {
                var n = new Q
                    , i = e >> 1;
                this.e = parseInt(t, 16);
                var s = new C(t, 16)
                    , o = this
                    , a = function () {
                        var t = function () {
                            if (o.p.compareTo(o.q) <= 0) {
                                var e = o.p;
                                o.p = o.q,
                                    o.q = e
                            }
                            var t = o.p.subtract(C.ONE)
                                , n = o.q.subtract(C.ONE)
                                , i = t.multiply(n);
                            0 == i.gcd(s).compareTo(C.ONE) ? (o.n = o.p.multiply(o.q),
                                o.d = s.modInverse(i),
                                o.dmp1 = o.d.mod(t),
                                o.dmq1 = o.d.mod(n),
                                o.coeff = o.q.modInverse(o.p),
                                setTimeout((function () {
                                    r()
                                }
                                ), 0)) : setTimeout(a, 0)
                        }
                            , l = function () {
                                o.q = B(),
                                    o.q.fromNumberAsync(i, 1, n, (function () {
                                        o.q.subtract(C.ONE).gcda(s, (function (e) {
                                            0 == e.compareTo(C.ONE) && o.q.isProbablePrime(10) ? setTimeout(t, 0) : setTimeout(l, 0)
                                        }
                                        ))
                                    }
                                    ))
                            }
                            , c = function () {
                                o.p = B(),
                                    o.p.fromNumberAsync(e - i, 1, n, (function () {
                                        o.p.subtract(C.ONE).gcda(s, (function (e) {
                                            0 == e.compareTo(C.ONE) && o.p.isProbablePrime(10) ? setTimeout(l, 0) : setTimeout(c, 0)
                                        }
                                        ))
                                    }
                                    ))
                            };
                        setTimeout(c, 0)
                    };
                setTimeout(a, 0)
            }
            ,
            e.prototype.sign = function (e, t, r) {
                var n = function (e, t) {
                    if (t < e.length + 22)
                        return console.error("Message too long for RSA"),
                            null;
                    for (var r = t - e.length - 6, n = "", i = 0; i < r; i += 2)
                        n += "ff";
                    return k("0001" + n + "00" + e, 16)
                }((te[r] || "") + t(e).toString(), this.n.bitLength() / 4);
                if (null == n)
                    return null;
                var i = this.doPrivate(n);
                if (null == i)
                    return null;
                var s = i.toString(16);
                return 0 == (1 & s.length) ? s : "0" + s
            }
            ,
            e.prototype.verify = function (e, t, r) {
                var n = k(t, 16)
                    , i = this.doPublic(n);
                return null == i ? null : function (e) {
                    for (var t in te)
                        if (te.hasOwnProperty(t)) {
                            var r = te[t]
                                , n = r.length;
                            if (e.substr(0, n) == r)
                                return e.substr(n)
                        }
                    return e
                }(i.toString(16).replace(/^1f+00/, "")) == r(e).toString()
            }
            ,
            e
    }();
    var te = {
        md2: "3020300c06082a864886f70d020205000410",
        md5: "3020300c06082a864886f70d020505000410",
        sha1: "3021300906052b0e03021a05000414",
        sha224: "302d300d06096086480165030402040500041c",
        sha256: "3031300d060960864801650304020105000420",
        sha384: "3041300d060960864801650304020205000430",
        sha512: "3051300d060960864801650304020305000440",
        ripemd160: "3021300906052b2403020105000414"
    };
    var re = {};
    re.lang = {
        extend: function (e, t, r) {
            if (!t || !e)
                throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
            var n = function () { };
            if (n.prototype = t.prototype,
                e.prototype = new n,
                e.prototype.constructor = e,
                e.superclass = t.prototype,
                t.prototype.constructor == Object.prototype.constructor && (t.prototype.constructor = t),
                r) {
                var i;
                for (i in r)
                    e.prototype[i] = r[i];
                var s = function () { }
                    , o = ["toString", "valueOf"];
                try {
                    /MSIE/.test(navigator.userAgent) && (s = function (e, t) {
                        for (i = 0; i < o.length; i += 1) {
                            var r = o[i]
                                , n = t[r];
                            "function" === typeof n && n != Object.prototype[r] && (e[r] = n)
                        }
                    }
                    )
                } catch (a) { }
                s(e.prototype, r)
            }
        }
    };
    var ne = {};
    "undefined" != typeof ne.asn1 && ne.asn1 || (ne.asn1 = {}),
        ne.asn1.ASN1Util = new function () {
            this.integerToByteHex = function (e) {
                var t = e.toString(16);
                return t.length % 2 == 1 && (t = "0" + t),
                    t
            }
                ,
                this.bigIntToMinTwosComplementsHex = function (e) {
                    var t = e.toString(16);
                    if ("-" != t.substr(0, 1))
                        t.length % 2 == 1 ? t = "0" + t : t.match(/^[0-7]/) || (t = "00" + t);
                    else {
                        var r = t.substr(1).length;
                        r % 2 == 1 ? r += 1 : t.match(/^[0-7]/) || (r += 2);
                        for (var n = "", i = 0; i < r; i++)
                            n += "f";
                        t = new C(n, 16).xor(e).add(C.ONE).toString(16).replace(/^-/, "")
                    }
                    return t
                }
                ,
                this.getPEMStringFromHex = function (e, t) {
                    return hextopem(e, t)
                }
                ,
                this.newObject = function (e) {
                    var t = ne.asn1
                        , r = t.DERBoolean
                        , n = t.DERInteger
                        , i = t.DERBitString
                        , s = t.DEROctetString
                        , o = t.DERNull
                        , a = t.DERObjectIdentifier
                        , l = t.DEREnumerated
                        , c = t.DERUTF8String
                        , u = t.DERNumericString
                        , d = t.DERPrintableString
                        , p = t.DERTeletexString
                        , f = t.DERIA5String
                        , h = t.DERUTCTime
                        , g = t.DERGeneralizedTime
                        , m = t.DERSequence
                        , v = t.DERSet
                        , y = t.DERTaggedObject
                        , b = t.ASN1Util.newObject
                        , w = Object.keys(e);
                    if (1 != w.length)
                        throw "key of param shall be only one.";
                    var S = w[0];
                    if (-1 == ":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + S + ":"))
                        throw "undefined key: " + S;
                    if ("bool" == S)
                        return new r(e[S]);
                    if ("int" == S)
                        return new n(e[S]);
                    if ("bitstr" == S)
                        return new i(e[S]);
                    if ("octstr" == S)
                        return new s(e[S]);
                    if ("null" == S)
                        return new o(e[S]);
                    if ("oid" == S)
                        return new a(e[S]);
                    if ("enum" == S)
                        return new l(e[S]);
                    if ("utf8str" == S)
                        return new c(e[S]);
                    if ("numstr" == S)
                        return new u(e[S]);
                    if ("prnstr" == S)
                        return new d(e[S]);
                    if ("telstr" == S)
                        return new p(e[S]);
                    if ("ia5str" == S)
                        return new f(e[S]);
                    if ("utctime" == S)
                        return new h(e[S]);
                    if ("gentime" == S)
                        return new g(e[S]);
                    if ("seq" == S) {
                        for (var T = e[S], x = [], E = 0; E < T.length; E++) {
                            var O = b(T[E]);
                            x.push(O)
                        }
                        return new m({
                            array: x
                        })
                    }
                    if ("set" == S) {
                        for (T = e[S],
                            x = [],
                            E = 0; E < T.length; E++) {
                            O = b(T[E]);
                            x.push(O)
                        }
                        return new v({
                            array: x
                        })
                    }
                    if ("tag" == S) {
                        var M = e[S];
                        if ("[object Array]" === Object.prototype.toString.call(M) && 3 == M.length) {
                            var P = b(M[2]);
                            return new y({
                                tag: M[0],
                                explicit: M[1],
                                obj: P
                            })
                        }
                        var _ = {};
                        if (void 0 !== M.explicit && (_.explicit = M.explicit),
                            void 0 !== M.tag && (_.tag = M.tag),
                            void 0 === M.obj)
                            throw "obj shall be specified for 'tag'.";
                        return _.obj = b(M.obj),
                            new y(_)
                    }
                }
                ,
                this.jsonToASN1HEX = function (e) {
                    return this.newObject(e).getEncodedHex()
                }
        }
        ,
        ne.asn1.ASN1Util.oidHexToInt = function (e) {
            for (var t = "", r = parseInt(e.substr(0, 2), 16), n = (t = Math.floor(r / 40) + "." + r % 40,
                ""), i = 2; i < e.length; i += 2) {
                var s = ("00000000" + parseInt(e.substr(i, 2), 16).toString(2)).slice(-8);
                if (n += s.substr(1, 7),
                    "0" == s.substr(0, 1))
                    t = t + "." + new C(n, 2).toString(10),
                        n = ""
            }
            return t
        }
        ,
        ne.asn1.ASN1Util.oidIntToHex = function (e) {
            var t = function (e) {
                var t = e.toString(16);
                return 1 == t.length && (t = "0" + t),
                    t
            }
                , r = function (e) {
                    var r = ""
                        , n = new C(e, 10).toString(2)
                        , i = 7 - n.length % 7;
                    7 == i && (i = 0);
                    for (var s = "", o = 0; o < i; o++)
                        s += "0";
                    n = s + n;
                    for (o = 0; o < n.length - 1; o += 7) {
                        var a = n.substr(o, 7);
                        o != n.length - 7 && (a = "1" + a),
                            r += t(parseInt(a, 2))
                    }
                    return r
                };
            if (!e.match(/^[0-9.]+$/))
                throw "malformed oid string: " + e;
            var n = ""
                , i = e.split(".")
                , s = 40 * parseInt(i[0]) + parseInt(i[1]);
            n += t(s),
                i.splice(0, 2);
            for (var o = 0; o < i.length; o++)
                n += r(i[o]);
            return n
        }
        ,
        ne.asn1.ASN1Object = function () {
            this.getLengthHexFromValue = function () {
                if ("undefined" == typeof this.hV || null == this.hV)
                    throw "this.hV is null or undefined.";
                if (this.hV.length % 2 == 1)
                    throw "value hex must be even length: n=0,v=" + this.hV;
                var e = this.hV.length / 2
                    , t = e.toString(16);
                if (t.length % 2 == 1 && (t = "0" + t),
                    e < 128)
                    return t;
                var r = t.length / 2;
                if (r > 15)
                    throw "ASN.1 length too long to represent by 8x: n = " + e.toString(16);
                return (128 + r).toString(16) + t
            }
                ,
                this.getEncodedHex = function () {
                    return (null == this.hTLV || this.isModified) && (this.hV = this.getFreshValueHex(),
                        this.hL = this.getLengthHexFromValue(),
                        this.hTLV = this.hT + this.hL + this.hV,
                        this.isModified = !1),
                        this.hTLV
                }
                ,
                this.getValueHex = function () {
                    return this.getEncodedHex(),
                        this.hV
                }
                ,
                this.getFreshValueHex = function () {
                    return ""
                }
        }
        ,
        ne.asn1.DERAbstractString = function (e) {
            ne.asn1.DERAbstractString.superclass.constructor.call(this);
            this.getString = function () {
                return this.s
            }
                ,
                this.setString = function (e) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.s = e,
                        this.hV = stohex(this.s)
                }
                ,
                this.setStringHex = function (e) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.s = null,
                        this.hV = e
                }
                ,
                this.getFreshValueHex = function () {
                    return this.hV
                }
                ,
                "undefined" != typeof e && ("string" == typeof e ? this.setString(e) : "undefined" != typeof e.str ? this.setString(e.str) : "undefined" != typeof e.hex && this.setStringHex(e.hex))
        }
        ,
        re.lang.extend(ne.asn1.DERAbstractString, ne.asn1.ASN1Object),
        ne.asn1.DERAbstractTime = function (e) {
            ne.asn1.DERAbstractTime.superclass.constructor.call(this);
            this.localDateToUTC = function (e) {
                return utc = e.getTime() + 6e4 * e.getTimezoneOffset(),
                    new Date(utc)
            }
                ,
                this.formatDate = function (e, t, r) {
                    var n = this.zeroPadding
                        , i = this.localDateToUTC(e)
                        , s = String(i.getFullYear());
                    "utc" == t && (s = s.substr(2, 2));
                    var o = s + n(String(i.getMonth() + 1), 2) + n(String(i.getDate()), 2) + n(String(i.getHours()), 2) + n(String(i.getMinutes()), 2) + n(String(i.getSeconds()), 2);
                    if (!0 === r) {
                        var a = i.getMilliseconds();
                        if (0 != a) {
                            var l = n(String(a), 3);
                            o = o + "." + (l = l.replace(/[0]+$/, ""))
                        }
                    }
                    return o + "Z"
                }
                ,
                this.zeroPadding = function (e, t) {
                    return e.length >= t ? e : new Array(t - e.length + 1).join("0") + e
                }
                ,
                this.getString = function () {
                    return this.s
                }
                ,
                this.setString = function (e) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.s = e,
                        this.hV = stohex(e)
                }
                ,
                this.setByDateValue = function (e, t, r, n, i, s) {
                    var o = new Date(Date.UTC(e, t - 1, r, n, i, s, 0));
                    this.setByDate(o)
                }
                ,
                this.getFreshValueHex = function () {
                    return this.hV
                }
        }
        ,
        re.lang.extend(ne.asn1.DERAbstractTime, ne.asn1.ASN1Object),
        ne.asn1.DERAbstractStructured = function (e) {
            ne.asn1.DERAbstractString.superclass.constructor.call(this);
            this.setByASN1ObjectArray = function (e) {
                this.hTLV = null,
                    this.isModified = !0,
                    this.asn1Array = e
            }
                ,
                this.appendASN1Object = function (e) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.asn1Array.push(e)
                }
                ,
                this.asn1Array = new Array,
                "undefined" != typeof e && "undefined" != typeof e.array && (this.asn1Array = e.array)
        }
        ,
        re.lang.extend(ne.asn1.DERAbstractStructured, ne.asn1.ASN1Object),
        ne.asn1.DERBoolean = function () {
            ne.asn1.DERBoolean.superclass.constructor.call(this),
                this.hT = "01",
                this.hTLV = "0101ff"
        }
        ,
        re.lang.extend(ne.asn1.DERBoolean, ne.asn1.ASN1Object),
        ne.asn1.DERInteger = function (e) {
            ne.asn1.DERInteger.superclass.constructor.call(this),
                this.hT = "02",
                this.setByBigInteger = function (e) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.hV = ne.asn1.ASN1Util.bigIntToMinTwosComplementsHex(e)
                }
                ,
                this.setByInteger = function (e) {
                    var t = new C(String(e), 10);
                    this.setByBigInteger(t)
                }
                ,
                this.setValueHex = function (e) {
                    this.hV = e
                }
                ,
                this.getFreshValueHex = function () {
                    return this.hV
                }
                ,
                "undefined" != typeof e && ("undefined" != typeof e.bigint ? this.setByBigInteger(e.bigint) : "undefined" != typeof e.int ? this.setByInteger(e.int) : "number" == typeof e ? this.setByInteger(e) : "undefined" != typeof e.hex && this.setValueHex(e.hex))
        }
        ,
        re.lang.extend(ne.asn1.DERInteger, ne.asn1.ASN1Object),
        ne.asn1.DERBitString = function (e) {
            if (void 0 !== e && "undefined" !== typeof e.obj) {
                var t = ne.asn1.ASN1Util.newObject(e.obj);
                e.hex = "00" + t.getEncodedHex()
            }
            ne.asn1.DERBitString.superclass.constructor.call(this),
                this.hT = "03",
                this.setHexValueIncludingUnusedBits = function (e) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.hV = e
                }
                ,
                this.setUnusedBitsAndHexValue = function (e, t) {
                    if (e < 0 || 7 < e)
                        throw "unused bits shall be from 0 to 7: u = " + e;
                    var r = "0" + e;
                    this.hTLV = null,
                        this.isModified = !0,
                        this.hV = r + t
                }
                ,
                this.setByBinaryString = function (e) {
                    var t = 8 - (e = e.replace(/0+$/, "")).length % 8;
                    8 == t && (t = 0);
                    for (var r = 0; r <= t; r++)
                        e += "0";
                    var n = "";
                    for (r = 0; r < e.length - 1; r += 8) {
                        var i = e.substr(r, 8)
                            , s = parseInt(i, 2).toString(16);
                        1 == s.length && (s = "0" + s),
                            n += s
                    }
                    this.hTLV = null,
                        this.isModified = !0,
                        this.hV = "0" + t + n
                }
                ,
                this.setByBooleanArray = function (e) {
                    for (var t = "", r = 0; r < e.length; r++)
                        1 == e[r] ? t += "1" : t += "0";
                    this.setByBinaryString(t)
                }
                ,
                this.newFalseArray = function (e) {
                    for (var t = new Array(e), r = 0; r < e; r++)
                        t[r] = !1;
                    return t
                }
                ,
                this.getFreshValueHex = function () {
                    return this.hV
                }
                ,
                "undefined" != typeof e && ("string" == typeof e && e.toLowerCase().match(/^[0-9a-f]+$/) ? this.setHexValueIncludingUnusedBits(e) : "undefined" != typeof e.hex ? this.setHexValueIncludingUnusedBits(e.hex) : "undefined" != typeof e.bin ? this.setByBinaryString(e.bin) : "undefined" != typeof e.array && this.setByBooleanArray(e.array))
        }
        ,
        re.lang.extend(ne.asn1.DERBitString, ne.asn1.ASN1Object),
        ne.asn1.DEROctetString = function (e) {
            if (void 0 !== e && "undefined" !== typeof e.obj) {
                var t = ne.asn1.ASN1Util.newObject(e.obj);
                e.hex = t.getEncodedHex()
            }
            ne.asn1.DEROctetString.superclass.constructor.call(this, e),
                this.hT = "04"
        }
        ,
        re.lang.extend(ne.asn1.DEROctetString, ne.asn1.DERAbstractString),
        ne.asn1.DERNull = function () {
            ne.asn1.DERNull.superclass.constructor.call(this),
                this.hT = "05",
                this.hTLV = "0500"
        }
        ,
        re.lang.extend(ne.asn1.DERNull, ne.asn1.ASN1Object),
        ne.asn1.DERObjectIdentifier = function (e) {
            var t = function (e) {
                var t = e.toString(16);
                return 1 == t.length && (t = "0" + t),
                    t
            }
                , r = function (e) {
                    var r = ""
                        , n = new C(e, 10).toString(2)
                        , i = 7 - n.length % 7;
                    7 == i && (i = 0);
                    for (var s = "", o = 0; o < i; o++)
                        s += "0";
                    n = s + n;
                    for (o = 0; o < n.length - 1; o += 7) {
                        var a = n.substr(o, 7);
                        o != n.length - 7 && (a = "1" + a),
                            r += t(parseInt(a, 2))
                    }
                    return r
                };
            ne.asn1.DERObjectIdentifier.superclass.constructor.call(this),
                this.hT = "06",
                this.setValueHex = function (e) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.s = null,
                        this.hV = e
                }
                ,
                this.setValueOidString = function (e) {
                    if (!e.match(/^[0-9.]+$/))
                        throw "malformed oid string: " + e;
                    var n = ""
                        , i = e.split(".")
                        , s = 40 * parseInt(i[0]) + parseInt(i[1]);
                    n += t(s),
                        i.splice(0, 2);
                    for (var o = 0; o < i.length; o++)
                        n += r(i[o]);
                    this.hTLV = null,
                        this.isModified = !0,
                        this.s = null,
                        this.hV = n
                }
                ,
                this.setValueName = function (e) {
                    var t = ne.asn1.x509.OID.name2oid(e);
                    if ("" === t)
                        throw "DERObjectIdentifier oidName undefined: " + e;
                    this.setValueOidString(t)
                }
                ,
                this.getFreshValueHex = function () {
                    return this.hV
                }
                ,
                void 0 !== e && ("string" === typeof e ? e.match(/^[0-2].[0-9.]+$/) ? this.setValueOidString(e) : this.setValueName(e) : void 0 !== e.oid ? this.setValueOidString(e.oid) : void 0 !== e.hex ? this.setValueHex(e.hex) : void 0 !== e.name && this.setValueName(e.name))
        }
        ,
        re.lang.extend(ne.asn1.DERObjectIdentifier, ne.asn1.ASN1Object),
        ne.asn1.DEREnumerated = function (e) {
            ne.asn1.DEREnumerated.superclass.constructor.call(this),
                this.hT = "0a",
                this.setByBigInteger = function (e) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.hV = ne.asn1.ASN1Util.bigIntToMinTwosComplementsHex(e)
                }
                ,
                this.setByInteger = function (e) {
                    var t = new C(String(e), 10);
                    this.setByBigInteger(t)
                }
                ,
                this.setValueHex = function (e) {
                    this.hV = e
                }
                ,
                this.getFreshValueHex = function () {
                    return this.hV
                }
                ,
                "undefined" != typeof e && ("undefined" != typeof e.int ? this.setByInteger(e.int) : "number" == typeof e ? this.setByInteger(e) : "undefined" != typeof e.hex && this.setValueHex(e.hex))
        }
        ,
        re.lang.extend(ne.asn1.DEREnumerated, ne.asn1.ASN1Object),
        ne.asn1.DERUTF8String = function (e) {
            ne.asn1.DERUTF8String.superclass.constructor.call(this, e),
                this.hT = "0c"
        }
        ,
        re.lang.extend(ne.asn1.DERUTF8String, ne.asn1.DERAbstractString),
        ne.asn1.DERNumericString = function (e) {
            ne.asn1.DERNumericString.superclass.constructor.call(this, e),
                this.hT = "12"
        }
        ,
        re.lang.extend(ne.asn1.DERNumericString, ne.asn1.DERAbstractString),
        ne.asn1.DERPrintableString = function (e) {
            ne.asn1.DERPrintableString.superclass.constructor.call(this, e),
                this.hT = "13"
        }
        ,
        re.lang.extend(ne.asn1.DERPrintableString, ne.asn1.DERAbstractString),
        ne.asn1.DERTeletexString = function (e) {
            ne.asn1.DERTeletexString.superclass.constructor.call(this, e),
                this.hT = "14"
        }
        ,
        re.lang.extend(ne.asn1.DERTeletexString, ne.asn1.DERAbstractString),
        ne.asn1.DERIA5String = function (e) {
            ne.asn1.DERIA5String.superclass.constructor.call(this, e),
                this.hT = "16"
        }
        ,
        re.lang.extend(ne.asn1.DERIA5String, ne.asn1.DERAbstractString),
        ne.asn1.DERUTCTime = function (e) {
            ne.asn1.DERUTCTime.superclass.constructor.call(this, e),
                this.hT = "17",
                this.setByDate = function (e) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.date = e,
                        this.s = this.formatDate(this.date, "utc"),
                        this.hV = stohex(this.s)
                }
                ,
                this.getFreshValueHex = function () {
                    return "undefined" == typeof this.date && "undefined" == typeof this.s && (this.date = new Date,
                        this.s = this.formatDate(this.date, "utc"),
                        this.hV = stohex(this.s)),
                        this.hV
                }
                ,
                void 0 !== e && (void 0 !== e.str ? this.setString(e.str) : "string" == typeof e && e.match(/^[0-9]{12}Z$/) ? this.setString(e) : void 0 !== e.hex ? this.setStringHex(e.hex) : void 0 !== e.date && this.setByDate(e.date))
        }
        ,
        re.lang.extend(ne.asn1.DERUTCTime, ne.asn1.DERAbstractTime),
        ne.asn1.DERGeneralizedTime = function (e) {
            ne.asn1.DERGeneralizedTime.superclass.constructor.call(this, e),
                this.hT = "18",
                this.withMillis = !1,
                this.setByDate = function (e) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.date = e,
                        this.s = this.formatDate(this.date, "gen", this.withMillis),
                        this.hV = stohex(this.s)
                }
                ,
                this.getFreshValueHex = function () {
                    return void 0 === this.date && void 0 === this.s && (this.date = new Date,
                        this.s = this.formatDate(this.date, "gen", this.withMillis),
                        this.hV = stohex(this.s)),
                        this.hV
                }
                ,
                void 0 !== e && (void 0 !== e.str ? this.setString(e.str) : "string" == typeof e && e.match(/^[0-9]{14}Z$/) ? this.setString(e) : void 0 !== e.hex ? this.setStringHex(e.hex) : void 0 !== e.date && this.setByDate(e.date),
                    !0 === e.millis && (this.withMillis = !0))
        }
        ,
        re.lang.extend(ne.asn1.DERGeneralizedTime, ne.asn1.DERAbstractTime),
        ne.asn1.DERSequence = function (e) {
            ne.asn1.DERSequence.superclass.constructor.call(this, e),
                this.hT = "30",
                this.getFreshValueHex = function () {
                    for (var e = "", t = 0; t < this.asn1Array.length; t++) {
                        e += this.asn1Array[t].getEncodedHex()
                    }
                    return this.hV = e,
                        this.hV
                }
        }
        ,
        re.lang.extend(ne.asn1.DERSequence, ne.asn1.DERAbstractStructured),
        ne.asn1.DERSet = function (e) {
            ne.asn1.DERSet.superclass.constructor.call(this, e),
                this.hT = "31",
                this.sortFlag = !0,
                this.getFreshValueHex = function () {
                    for (var e = new Array, t = 0; t < this.asn1Array.length; t++) {
                        var r = this.asn1Array[t];
                        e.push(r.getEncodedHex())
                    }
                    return 1 == this.sortFlag && e.sort(),
                        this.hV = e.join(""),
                        this.hV
                }
                ,
                "undefined" != typeof e && "undefined" != typeof e.sortflag && 0 == e.sortflag && (this.sortFlag = !1)
        }
        ,
        re.lang.extend(ne.asn1.DERSet, ne.asn1.DERAbstractStructured),
        ne.asn1.DERTaggedObject = function (e) {
            ne.asn1.DERTaggedObject.superclass.constructor.call(this),
                this.hT = "a0",
                this.hV = "",
                this.isExplicit = !0,
                this.asn1Object = null,
                this.setASN1Object = function (e, t, r) {
                    this.hT = t,
                        this.isExplicit = e,
                        this.asn1Object = r,
                        this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(),
                            this.hTLV = null,
                            this.isModified = !0) : (this.hV = null,
                                this.hTLV = r.getEncodedHex(),
                                this.hTLV = this.hTLV.replace(/^../, t),
                                this.isModified = !1)
                }
                ,
                this.getFreshValueHex = function () {
                    return this.hV
                }
                ,
                "undefined" != typeof e && ("undefined" != typeof e.tag && (this.hT = e.tag),
                    "undefined" != typeof e.explicit && (this.isExplicit = e.explicit),
                    "undefined" != typeof e.obj && (this.asn1Object = e.obj,
                        this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)))
        }
        ,
        re.lang.extend(ne.asn1.DERTaggedObject, ne.asn1.ASN1Object);
    var ie, se = function () {
        var e = function (t, r) {
            return e = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function (e, t) {
                e.__proto__ = t
            }
                || function (e, t) {
                    for (var r in t)
                        Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
                }
                ,
                e(t, r)
        };
        return function (t, r) {
            if ("function" !== typeof r && null !== r)
                throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
            function n () {
                this.constructor = t
            }
            e(t, r),
                t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype,
                    new n)
        }
    }(), oe = function (e) {
        function t (r) {
            var n = e.call(this) || this;
            return r && ("string" === typeof r ? n.parseKey(r) : (t.hasPrivateKeyProperty(r) || t.hasPublicKeyProperty(r)) && n.parsePropertiesFrom(r)),
                n
        }
        return se(t, e),
            t.prototype.parseKey = function (e) {
                try {
                    var t = 0
                        , r = 0
                        , n = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(e) ? v(e) : y.unarmor(e)
                        , i = M.decode(n);
                    if (3 === i.sub.length && (i = i.sub[2].sub[0]),
                        9 === i.sub.length) {
                        t = i.sub[1].getHexStringValue(),
                            this.n = k(t, 16),
                            r = i.sub[2].getHexStringValue(),
                            this.e = parseInt(r, 16);
                        var s = i.sub[3].getHexStringValue();
                        this.d = k(s, 16);
                        var o = i.sub[4].getHexStringValue();
                        this.p = k(o, 16);
                        var a = i.sub[5].getHexStringValue();
                        this.q = k(a, 16);
                        var l = i.sub[6].getHexStringValue();
                        this.dmp1 = k(l, 16);
                        var c = i.sub[7].getHexStringValue();
                        this.dmq1 = k(c, 16);
                        var u = i.sub[8].getHexStringValue();
                        this.coeff = k(u, 16)
                    } else {
                        if (2 !== i.sub.length)
                            return !1;
                        if (i.sub[0].sub) {
                            var d = i.sub[1].sub[0];
                            t = d.sub[0].getHexStringValue(),
                                this.n = k(t, 16),
                                r = d.sub[1].getHexStringValue(),
                                this.e = parseInt(r, 16)
                        } else
                            t = i.sub[0].getHexStringValue(),
                                this.n = k(t, 16),
                                r = i.sub[1].getHexStringValue(),
                                this.e = parseInt(r, 16)
                    }
                    return !0
                } catch (p) {
                    return !1
                }
            }
            ,
            t.prototype.getPrivateBaseKey = function () {
                var e = {
                    array: [new ne.asn1.DERInteger({
                        int: 0
                    }), new ne.asn1.DERInteger({
                        bigint: this.n
                    }), new ne.asn1.DERInteger({
                        int: this.e
                    }), new ne.asn1.DERInteger({
                        bigint: this.d
                    }), new ne.asn1.DERInteger({
                        bigint: this.p
                    }), new ne.asn1.DERInteger({
                        bigint: this.q
                    }), new ne.asn1.DERInteger({
                        bigint: this.dmp1
                    }), new ne.asn1.DERInteger({
                        bigint: this.dmq1
                    }), new ne.asn1.DERInteger({
                        bigint: this.coeff
                    })]
                };
                return new ne.asn1.DERSequence(e).getEncodedHex()
            }
            ,
            t.prototype.getPrivateBaseKeyB64 = function () {
                return h(this.getPrivateBaseKey())
            }
            ,
            t.prototype.getPublicBaseKey = function () {
                var e = new ne.asn1.DERSequence({
                    array: [new ne.asn1.DERObjectIdentifier({
                        oid: "1.2.840.113549.1.1.1"
                    }), new ne.asn1.DERNull]
                })
                    , t = new ne.asn1.DERSequence({
                        array: [new ne.asn1.DERInteger({
                            bigint: this.n
                        }), new ne.asn1.DERInteger({
                            int: this.e
                        })]
                    })
                    , r = new ne.asn1.DERBitString({
                        hex: "00" + t.getEncodedHex()
                    });
                return new ne.asn1.DERSequence({
                    array: [e, r]
                }).getEncodedHex()
            }
            ,
            t.prototype.getPublicBaseKeyB64 = function () {
                return h(this.getPublicBaseKey())
            }
            ,
            t.wordwrap = function (e, t) {
                if (!e)
                    return e;
                var r = "(.{1," + (t = t || 64) + "})( +|$\n?)|(.{1," + t + "})";
                return e.match(RegExp(r, "g")).join("\n")
            }
            ,
            t.prototype.getPrivateKey = function () {
                var e = "-----BEGIN RSA PRIVATE KEY-----\n";
                return e += t.wordwrap(this.getPrivateBaseKeyB64()) + "\n",
                    e += "-----END RSA PRIVATE KEY-----"
            }
            ,
            t.prototype.getPublicKey = function () {
                var e = "-----BEGIN PUBLIC KEY-----\n";
                return e += t.wordwrap(this.getPublicBaseKeyB64()) + "\n",
                    e += "-----END PUBLIC KEY-----"
            }
            ,
            t.hasPublicKeyProperty = function (e) {
                return (e = e || {}).hasOwnProperty("n") && e.hasOwnProperty("e")
            }
            ,
            t.hasPrivateKeyProperty = function (e) {
                return (e = e || {}).hasOwnProperty("n") && e.hasOwnProperty("e") && e.hasOwnProperty("d") && e.hasOwnProperty("p") && e.hasOwnProperty("q") && e.hasOwnProperty("dmp1") && e.hasOwnProperty("dmq1") && e.hasOwnProperty("coeff")
            }
            ,
            t.prototype.parsePropertiesFrom = function (e) {
                this.n = e.n,
                    this.e = e.e,
                    e.hasOwnProperty("d") && (this.d = e.d,
                        this.p = e.p,
                        this.q = e.q,
                        this.dmp1 = e.dmp1,
                        this.dmq1 = e.dmq1,
                        this.coeff = e.coeff)
            }
            ,
            t
    }(ee), ae = "undefined" !== typeof process ? null === (ie = {
        NODE_ENV: "production",
        PUBLIC_URL: "//shadow.elemecdn.com/faas/parkour-game",
        WDS_SOCKET_HOST: void 0,
        WDS_SOCKET_PATH: void 0,
        WDS_SOCKET_PORT: void 0,
        FAST_REFRESH: !0
    }) || void 0 === ie ? void 0 : ie.npm_package_version : void 0;
    const le = function () {
        function e (e) {
            void 0 === e && (e = {}),
                e = e || {},
                this.default_key_size = e.default_key_size ? parseInt(e.default_key_size, 10) : 1024,
                this.default_public_exponent = e.default_public_exponent || "010001",
                this.log = e.log || !1,
                this.key = null
        }
        return e.prototype.setKey = function (e) {
            this.log && this.key && console.warn("A key was already set, overriding existing."),
                this.key = new oe(e)
        }
            ,
            e.prototype.setPrivateKey = function (e) {
                this.setKey(e)
            }
            ,
            e.prototype.setPublicKey = function (e) {
                this.setKey(e)
            }
            ,
            e.prototype.decrypt = function (e) {
                try {
                    return this.getKey().decrypt(g(e))
                } catch (t) {
                    return !1
                }
            }
            ,
            e.prototype.encrypt = function (e) {
                try {
                    return h(this.getKey().encrypt(e))
                } catch (t) {
                    return !1
                }
            }
            ,
            e.prototype.sign = function (e, t, r) {
                try {
                    return h(this.getKey().sign(e, t, r))
                } catch (n) {
                    return !1
                }
            }
            ,
            e.prototype.verify = function (e, t, r) {
                try {
                    return this.getKey().verify(e, g(t), r)
                } catch (n) {
                    return !1
                }
            }
            ,
            e.prototype.getKey = function (e) {
                if (!this.key) {
                    if (this.key = new oe,
                        e && "[object Function]" === {}.toString.call(e))
                        return void this.key.generateAsync(this.default_key_size, this.default_public_exponent, e);
                    this.key.generate(this.default_key_size, this.default_public_exponent)
                }
                return this.key
            }
            ,
            e.prototype.getPrivateKey = function () {
                return this.getKey().getPrivateKey()
            }
            ,
            e.prototype.getPrivateKeyB64 = function () {
                return this.getKey().getPrivateBaseKeyB64()
            }
            ,
            e.prototype.getPublicKey = function () {
                return this.getKey().getPublicKey()
            }
            ,
            e.prototype.getPublicKeyB64 = function () {
                return this.getKey().getPublicBaseKeyB64()
            }
            ,
            e.version = ae,
            e
    }();
    return () => le;
}
function rsaEnc (publicKey, conent) {
    Zn = new (rsaFunc()());
    console.log(Zn)
    Zn.setPublicKey(publicKey);
    d = Zn.encrypt(conent);
    console.log(d);
    return d;
}