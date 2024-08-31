/**
 * 变量：elmck: 必填，账号cookie
 */

const $ = new Env('饿了么福尔魔方');
const qs = require("qs");
const request = require("request");

const {
    sign: getSign,
    getCookies,
    getToken,
    getUserInfo,
    "checkCk": checkCk,
    wait,
} = require("./common.js");

function updateCookie(tkCookie, encCookie, cookieStr) {
    let txt = cookieStr.replace(/\s/g, '');
    txt = txt.replace(/chushi;/g, '');
    if (!txt.endsWith(';')) {
        txt += ';';
    }

    let cookieParts = txt.split(';').slice(0, -1);
    let updated = false;

    for (let i = 0; i < cookieParts.length; i++) {
        let keyValuePair = cookieParts[i].split('=');
        let key = keyValuePair[0].trim();
        if (key === "_m_h5_tk" || key === " _m_h5_tk") {
            cookieParts[i] = tkCookie;
            updated = true;
        } else if (key === "_m_h5_tk_enc" || key === " _m_h5_tk_enc") {
            cookieParts[i] = encCookie;
            updated = true;
        }
    }

    if (updated) {
        return cookieParts.join(';') + ';';
    } else {
        return txt + tkCookie + ';' + encCookie + ';';
    }
}

async function playChefGame(cookie) {
    const t = Date.now();
    const body = JSON.stringify({
        "bizScene": "MAGIC_CUBE",
        "latitude": "0",
        "longitude": "0",
        "bizCode": "MAGIC_CUBE",
        "actId": "20230802212526123181213864",
        "collectionId": "20230802212526148986536967",
        "componentId": "20230803112141370370827352",
        "extParams": "{\"actId\":\"20230802212526123181213864\",\"bizType\":\"MAGIC_CUBE\",\"desc\":\"魔方消消乐\"}",
        "requestId": "20230802212526123181213864"+t,
        "asac": "2A22C0239QW1FOL3UUQY7U"
    })
    const api = 'mtop.koubei.interactioncenter.platform.right.lottery'
    const { data } = await h5Request(body, "12574478", "shopping.ele.me", api, cookie)

    if (Object.keys(data.data).length === 0) {
        return false
    } else if (data.data.sendStatus === "SUCCESS") {
        const amount = data.data.sendRightList[0].discountInfo.amount;
        if (amount === 1) {
            console.log("福尔魔方闯关成功。获得：" + amount + " 乐园币");
            return false
        } else {
            console.log("福尔魔方闯关成功。获得：" + amount + " 乐园币");
            return true
        }
    } else {
        console.log(data.data.errorMsg)
        return false
    }
}

// 161274962374%40eleme_android_11.12.88"
async function h5Request(dataObj, appkey, host, api, cookie, extraHeader = {}, ttid = '161274962374%40eleme_android_11.12.88') {
    const t = new Date().getTime();
    const tk = getToken(cookie)
    const stk = tk.split("_")[0];
    const sign = await getSign(`${stk}&${t}&${appkey}&${dataObj}`)
    const parm = "jsv=2.6.1&appKey=" + appkey + "&t=" + t + "&sign=" + sign + "&api=" + api + "&v=1.0&ecode=1&type=json&valueType=string&needLogin=true&LoginRequest=true&dataType=jsonp&ttid=" + ttid;
    const header = {
        'content-type': 'application/x-www-form-urlencoded',
        'Connection': 'keep-alive',
        'Cookie': cookie + ';',
        'user-agent': 'Mozilla/5.0 (WindOws NT 10.0; WOW64) AppLeWebKit/537.36 (KHTML, like Gecko) chrome/86.0.4240.198 Safari/537.36',
        'accept': 'application/json',
        "Origin": "https://tb.ele.me",
        'referer': "https://servicewechat.com/wxece3a9a4c82f58c9/626/page-frame.html",
        'accept-language': 'zh-CN,zh;q=0.9',
    }
    Object.assign(header, extraHeader)
    const options = {
        url: "https://" + host + "/h5/" + api + "/1.0/?" + parm,
        method: "POST",
        headers: header,
        body: "data="+dataObj
    }

    return new Promise(callback => {
        request(options, async (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const responseBody = JSON.parse(body);
                if (responseBody.ret[0].includes('令牌')) {
                    const setCookieHeader = JSON.stringify(response.headers["set-cookie"]);
                    const newToken = /_m_h5_tk=(\S*);/.exec(setCookieHeader)[1];
                    const newTokenEnc = /_m_h5_tk_enc=(\S*);/.exec(setCookieHeader)[1];
                    cookie = updateCookie(` _m_h5_tk=${newToken.split(";")[0]}`, ` _m_h5_tk_enc=${newTokenEnc.split(";")[0]}`, cookie);
                    callback(await h5Request(dataObj, appkey, host, api, cookie))
                    // await playChefGame(cookie)
                } else {
                    callback(responseBody);
                }
            } else {
                console.log(error || body);
                callback();
            }
        });
    })
}


async function start() {
    const _0x2f100c = getCookies();
    for (let _0x28bb82 = 0; _0x28bb82 < _0x2f100c["length"]; _0x28bb82++) {
        const _0x10e68c = _0x2f100c[_0x28bb82];
        if (!_0x10e68c) {
            console["log"](" ❌无效用户信息, 请重新获取ck");
        } else {
            try {
                let _0x3b7f88 = await checkCk(_0x10e68c, _0x28bb82);
                if (!_0x3b7f88) {
                    continue;
                }
                let _0x2d55f7 = await getUserInfo(_0x3b7f88);
                if (!_0x2d55f7.encryptMobile) {
                    console["log"]('第', _0x28bb82 + 1, "账号失效！请重新登录！！！😭");
                    continue;
                }
                const _0x5cb41f = _0x2d55f7["localId"];
                console["log"]("******开始【饿了么账号", _0x28bb82 + 1, '】', _0x2d55f7.encryptMobile, "*********");
                await playChefGame(_0x3b7f88);
                console["log"]("防止黑号延时5-10秒");
                await wait(getRandom(5, 10));
            } catch (_0x2a2515) {
                console["log"](_0x2a2515);
            }
        }
    }
    process["exit"](0);
}
start();

function getRandom(_0x452fcd, _0x5adc25) {
    return Math["floor"](Math["random"]() * (_0x5adc25 - _0x452fcd + 1) + _0x452fcd);
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }