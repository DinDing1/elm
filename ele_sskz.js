/**
 * @平行绳 飞机频道：https://t.me/tigerorrose
 * 变量：elmck: 必填，账号cookie，短信登录面板项目地址：https://github.com/funaihui/eleWeb
 * cron 0 0/6 * * *
 * 2023.11.7 更新：首次发布；
 * 2024.02.26 更新：打印错误日志；
 */

const $ = new Env('饿了么食神客栈');
const {
        validateCarmeWithType: validateCarmeWithType,
        getCookies: getCookies,
        getUserInfoWithX: getUserInfoWithX,
        wait: wait,
        tryCatchPromise: tryCatchPromise,
        checkCk: checkCk
    } = require("./common.js"),
    _0x286a61 = require("request"),
    _0x127a18 = process.env.ELE_CARME,
    _0x5210b0 = 23,
    _0x3d6440 = require("md5");

function _0x1a523b (_0x10b6c8) {
    if (!_0x10b6c8) {
        return "-1";
    }

    for (var _0x12eabb = _0x10b6c8.split(";"), _0x406903 = 0; _0x406903 < _0x12eabb.length; _0x406903++) {
        var _0x450595 = _0x12eabb[_0x406903].split("=");

        if ([" _m_h5_tk", "_m_h5_tk"].includes(_0x450595[0])) {
            return _0x450595[1];
        }
    }

    return "-1";
}

const _0x5cf4f4 = async (_0x2bc6f9, _0x1c444f, _0x42b574 = 5) => {
    const _0x255e82 = _0x1a523b(_0x2bc6f9),
        _0x192a0b = _0x255e82.split("_")[0];

    return _0x3d6440(_0x192a0b + _0x1c444f);
};

async function _0x389e0e (_0x46c612, _0x150ab1) {
    const _0x4dfa75 = {
            "authority": "shopping.ele.me",
            "accept": "application/json",
            "cache-control": "no-cache",
            "content-type": "application/x-www-form-urlencoded",
            "cookie": _0x46c612,
            "x-miniapp-id-taobao": "3000000091262411",
            "x-miniapp-version": "0.0.116",
            "x-mini-appkey": "34416858",
            "x-req-appkey": "34416858",
            "appid": "3000000091262411"
        },
        _0x303357 = new Date().getTime(),
        _0x46d5fd = 34190632,
        _0xb1a4b3 = "data=" + encodeURIComponent(JSON.stringify(_0x150ab1)),
        _0x529b7d = await _0x5cf4f4(_0x46c612, "&" + _0x303357 + "&" + _0x46d5fd + "&" + JSON.stringify(_0x150ab1), _0x127a18),
        _0x2737f2 = {
            "url": "https://shopping.ele.me/h5/mtop.miniapp.cloud.application.request/1.0/?jsv=2.6.1&appKey=34190632&t=" + _0x303357 + "&sign=" + _0x529b7d + "&api=mtop.miniapp.cloud.application.request&v=1.0&type=originaljson&ttid=1608030065155%40eleme_android_11.0.38",
            "method": "POST",
            "headers": _0x4dfa75,
            "body": _0xb1a4b3
        };

    return tryCatchPromise(_0x712b47 => {
        _0x286a61(_0x2737f2, async (_0x2ad7cf, _0x12230a, _0x4bc800) => {
            if (!_0x2ad7cf && _0x12230a.statusCode === 200) {
                try {
                    const _0x18c432 = JSON.parse(_0x4bc800);

                    _0x712b47(_0x18c432.data.data);
                } catch (_0x24a035) {
                    console.log(_0x4bc800);

                    _0x712b47(null);
                }
            } else {
                _0x712b47(null);
            }
        });
    });
}

async function _0x457235 (_0x3e73c2, _0x41297f, _0x18d496) {
    const _0x2f8479 = {
            "accept": "application/json",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "cookie": _0x3e73c2,
            "User-Agent": "okhttp/3.14.9",
            "Host": "sskz.gzppxia.com",
            "startToken": "150483272097295"
        },
        _0x3d6fd6 = {
            "url": "https://sskz.gzppxia.com/" + _0x18d496,
            "method": "POST",
            "headers": _0x2f8479,
            "body": JSON.stringify(_0x41297f)
        };
    return tryCatchPromise(_0x3a77cc => {
        _0x286a61(_0x3d6fd6, async (_0x10940a, _0x2890da, _0x5f1995) => {
            if (!_0x10940a && _0x2890da.statusCode === 200) {
                try {
                    const _0x4f973a = JSON.parse(_0x5f1995);

                    _0x3a77cc(_0x4f973a);
                } catch (_0x27a6e2) {
                    console.log(_0x5f1995);

                    _0x3a77cc(null);
                }
            } else {
                _0x3a77cc(null);
            }
        });
    });
}

async function _0x566cc1 (_0x184c2c) {
    const _0x2809bb = new Date().getTime(),
        _0x26b748 = {
            "body": "{}",
            "headers": "{}",
            "instance": "INNER",
            "method": "GET",
            "options": "{\"cloudAppId\":\"47729\",\"domain\":\"https://sskz.gzppxia.com/tt_action/\",\"timeout\":3000,\"env\":\"online\",\"options\":{\"path\":\"pages/index/index\"}}",
            "path": "elmeisv.php?method=getOpenid",
            "protocols": "{\"Content-Type\":\"application/json\",\"mc-timestamp\":\"" + _0x2809bb + "\",\"mc-env\":\"online\"}",
            "queryString": "{}",
            "sdkVersion": "1.5.5"
        },
        _0x2c0650 = await _0x389e0e(_0x184c2c, _0x26b748);

    if (_0x2c0650) {
        return JSON.parse(_0x2c0650).openid;
    }
}

async function _0x4e7ec3 (_0x5ebbac, _0xee6b04) {
    const _0x342272 = new Date().getTime(),
        _0xb98c1c = {
            "handler": "login",
            "auth_code": _0xee6b04,
            "attach": null,
            "platform_id": "taoteGame2",
            "channel_id": 1002,
            "cver": "1.0.1",
            "wx_data": {},
            "imei": "",
            "userId": "",
            "token": "",
            "ver": 1,
            "send_time": _0x342272
        };

    _0xb98c1c.wx_data.nickName = "曾天曼";
    _0xb98c1c.wx_data.gender = 2;
    _0xb98c1c.wx_data.avatarUrl = "elm_head_2_jpg";
    _0xb98c1c.wx_data.sk = "";
    _0xb98c1c.wx_data.platform_data = {};
    _0xb98c1c.wx_data.platform_data.h5openid = _0xee6b04;

    const _0x14ba8b = await _0x457235(_0x5ebbac, _0xb98c1c, "tt_action/20220926/action/login.php?XDEBUG_SESSION_START=PHPSTORM");
    return {
        "token": _0x14ba8b.token,
        "openId": _0xee6b04,
        "userId": _0x14ba8b.userId
    };
}

async function _0x567544 (_0x5299ba, _0xdf7c68) {
    const _0x141787 = new Date().getTime(),
        _0x176243 = {
            "handler": "sendElmeCoin",
            "elmeopenid": _0xdf7c68.openId,
            "num": 10,
            "userId": _0xdf7c68.userId,
            "token": _0xdf7c68.token,
            "ver": 1,
            "send_time": _0x141787
        };

    return await _0x457235(_0x5299ba, _0x176243, "tt_action/20220926/action/sendElmeCoin.php?XDEBUG_SESSION_START=PHPSTORM");
}

async function _0x98343b () {
    await validateCarmeWithType(_0x127a18, 1);

    const _0xd02a6 = getCookies("elmck");

    for (let _0x6d3118 = 0; _0x6d3118 < _0xd02a6.length; _0x6d3118++) {
        let _0x367b10 = _0xd02a6[_0x6d3118];
        _0x367b10 = await checkCk(_0x367b10, _0x6d3118, _0x127a18, 1);

        if (!_0x367b10) {
            continue;
        }

        let _0x1b5453 = await getUserInfoWithX(_0x367b10, _0x5210b0);

        if (_0x1b5453 && _0x1b5453[0]) {
            console.log("第", _0x6d3118 + 1, "账号失效！请重新登录！！！😭");
            continue;
        }

        if (!_0x1b5453 || !_0x1b5453.userName) {
            continue;
        }

        const _0x39b81b = _0x1b5453.localId;
        let _0x529f90 = _0x1b5453.encryptMobile;
        console.log("\n****** #" + (_0x6d3118 + 1), _0x529f90, "*********");
        console.log("账号的 id 为", _0x39b81b);

        const _0x103ce8 = await _0x566cc1(_0x367b10),
            _0x44145f = await _0x4e7ec3(_0x367b10, _0x103ce8);

        let _0x4539d8 = await _0x567544(_0x367b10, _0x44145f);

        if (_0x4539d8.errcode) {
            console.log(_0x4539d8.errcode);
        } else {
            console.log("领取金币成功，当前金币：" + _0x4539d8.value);
        }

        while (!_0x4539d8.errcode) {
            await wait(1);
            _0x4539d8 = await _0x567544(_0x367b10, _0x44145f);

            if (_0x4539d8.errcode) {
                console.log(_0x4539d8.errcode);
            } else {
                console.log("领取金币成功，当前金币：" + _0x4539d8.value);
            }
        }

        console.log("防止挤爆了，延时 1 秒");
        await wait(1);
    }

    process.exit(0);
}

_0x98343b();
function Env (t, e) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);

    class s {
        constructor(t) {
            this.env = t;
        }

        send (t, e = "GET") {
            t = "string" == typeof t ? {
                url: t
            } : t;
            let s = this.get;
            "POST" === e && (s = this.post);
            return new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s);
                });
            });
        }

        get (t) {
            return this.send.call(this.env, t);
        }

        post (t) {
            return this.send.call(this.env, t, "POST");
        }

    }

    return new class {
        constructor(t, e) {
            this.name = t;
            this.http = new s(this);
            this.data = null;
            this.dataFile = "box.dat";
            this.logs = [];
            this.isMute = !1;
            this.isNeedRewrite = !1;
            this.logSeparator = "\n";
            this.startTime = new Date().getTime();
            Object.assign(this, e);
            this.log("", `🔔${this.name}, 开始!`);
        }

        isNode () {
            return "undefined" != typeof module && !!module.exports;
        }

        isQuanX () {
            return "undefined" != typeof $task;
        }

        isSurge () {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
        }

        isLoon () {
            return "undefined" != typeof $loon;
        }

        toObj (t, e = null) {
            try {
                return JSON.parse(t);
            } catch {
                return e;
            }
        }

        toStr (t, e = null) {
            try {
                return JSON.stringify(t);
            } catch {
                return e;
            }
        }

        getjson (t, e) {
            let s = e;
            const i = this.getdata(t);

            if (i) {
                try {
                    s = JSON.parse(this.getdata(t));
                } catch { }
            }

            return s;
        }

        setjson (t, e) {
            try {
                return this.setdata(JSON.stringify(t), e);
            } catch {
                return !1;
            }
        }

        getScript (t) {
            return new Promise(e => {
                this.get({
                    url: t
                }, (t, s, i) => e(i));
            });
        }

        runScript (t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20;
                r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"),
                    n = {
                        url: `http://${h}/v1/scripting/evaluate`,
                        body: {
                            script_text: t,
                            mock_type: "cron",
                            timeout: r
                        },
                        headers: {
                            "X-Key": o,
                            Accept: "*/*"
                        }
                    };
                this.post(n, (t, e, i) => s(i));
            }).catch(t => this.logErr(t));
        }

        loaddata () {
            if (!this.isNode()) {
                return {};
            }

            {
                this.fs = this.fs ? this.fs : require("fs");
                this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e);

                if (!s && !i) {
                    return {};
                }

                {
                    const i = s ? t : e;

                    try {
                        return JSON.parse(this.fs.readFileSync(i));
                    } catch (t) {
                        return {};
                    }
                }
            }
        }

        writedata () {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs");
                this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r);
            }
        }

        lodash_get (t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;

            for (const t of i) if (r = Object(r)[t], void 0 === r) {
                return s;
            }

            return r;
        }

        lodash_set (t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t);
        }

        getdata (t) {
            let e = this.getval(t);

            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
                    r = s ? this.getval(s) : "";

                if (r) {
                    try {
                        const t = JSON.parse(r);
                        e = t ? this.lodash_get(t, i, "") : e;
                    } catch (t) {
                        e = "";
                    }
                }
            }

            return e;
        }

        setdata (t, e) {
            let s = !1;

            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
                    o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";

                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t);
                    s = this.setval(JSON.stringify(e), i);
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t);
                    s = this.setval(JSON.stringify(o), i);
                }
            } else {
                s = this.setval(t, e);
            }

            return s;
        }

        getval (t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null;
        }

        setval (t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null;
        }

        initGotEnv (t) {
            this.got = this.got ? this.got : require("got");
            this.cktough = this.cktough ? this.cktough : require("tough-cookie");
            this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
            t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar));
        }

        get (t, e = () => { }) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]);
            this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status);
                e(t, s, i);
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o);
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        s && this.ckjar.setCookieSync(s, null);
                        e.cookieJar = this.ckjar;
                    }
                } catch (t) {
                    this.logErr(t);
                }
            }).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o);
            }, t => {
                const {
                    message: s,
                    response: i
                } = t;
                e(s, i, i && i.body);
            }));
        }

        post (t, e = () => { }) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) {
                this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                    "X-Surge-Skip-Scripting": !1
                }));
                $httpClient.post(t, (t, s, i) => {
                    !t && s && (s.body = i, s.statusCode = s.status);
                    e(t, s, i);
                });
            } else {
                if (this.isQuanX()) {
                    t.method = "POST";
                    this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                        hints: !1
                    }));
                    $task.fetch(t).then(t => {
                        const {
                            statusCode: s,
                            statusCode: i,
                            headers: r,
                            body: o
                        } = t;
                        e(null, {
                            status: s,
                            statusCode: i,
                            headers: r,
                            body: o
                        }, o);
                    }, t => e(t));
                } else {
                    if (this.isNode()) {
                        this.initGotEnv(t);
                        const {
                            url: s,
                            ...i
                        } = t;
                        this.got.post(s, i).then(t => {
                            const {
                                statusCode: s,
                                statusCode: i,
                                headers: r,
                                body: o
                            } = t;
                            e(null, {
                                status: s,
                                statusCode: i,
                                headers: r,
                                body: o
                            }, o);
                        }, t => {
                            const {
                                message: s,
                                response: i
                            } = t;
                            e(s, i, i && i.body);
                        });
                    }
                }
            }
        }

        time (t, e = null) {
            const s = e ? new Date(e) : new Date();
            let i = {
                "M+": s.getMonth() + 1,
                "d+": s.getDate(),
                "H+": s.getHours(),
                "m+": s.getMinutes(),
                "s+": s.getSeconds(),
                "q+": Math.floor((s.getMonth() + 3) / 3),
                S: s.getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));

            for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));

            return t;
        }

        msg (e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) {
                    return t;
                }

                if ("string" == typeof t) {
                    return this.isLoon() ? t : this.isQuanX() ? {
                        "open-url": t
                    } : this.isSurge() ? {
                        url: t
                    } : void 0;
                }

                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e,
                            mediaUrl: s
                        };
                    }

                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e,
                            "media-url": s
                        };
                    }

                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
                        };
                    }
                }
            };

            if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
                let t = ["", "==============📣系统通知📣=============="];
                t.push(e);
                s && t.push(s);
                i && t.push(i);
                console.log(t.join("\n"));
                this.logs = this.logs.concat(t);
            }
        }

        log (...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]);
            console.log(t.join(this.logSeparator));
        }

        logErr (t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t);
        }

        wait (t) {
            return new Promise(e => setTimeout(e, t));
        }

        done (t = {}) {
            const e = new Date().getTime(),
                s = (e - this.startTime) / 1000;
            this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`);
            this.log();
            (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t);
        }

    }(t, e);
}