const request = require("request"),
      {
  getToken,
  checkCk,
  getCookies,
  getUserInfo,
  validateCarmeWithType,
  wait,
  checkCarmeCount,
  tryCatchPromise,
  getbxua
} = require("./common.js"),
      {
  sign
} = require("./common"),
      GAME_TYEP = 7,
      wait_time = process.env.sq_wait_time || 30,
      kami = process.env.ELE_CARME;

function isEmpty(_0x5d1556) {
  return Object.values(_0x5d1556).length === 0;
}

async function getInfo(_0x552b5a, _0x55f29c, _0x465ccf) {
  const _0x3695d6 = {
    sceneCode: "",
    inviter: "",
    unionId: _0x465ccf,
    communityType: "2",
    groupEnvironment: false,
    encryptedData: "",
    iv: "",
    code: ""
  },
        _0x5a0823 = new Date().getTime(),
        _0x326c79 = 32529321;

  var _0x3f78fc = "data=" + encodeURIComponent(JSON.stringify(_0x3695d6));

  const _0x5f0944 = _0x55f29c.split(";")[0],
        _0x1e9ba1 = _0x5f0944.split("_")[0],
        _0x5b22e5 = await sign(_0x1e9ba1 + "&" + _0x5a0823 + "&" + _0x326c79 + "&" + JSON.stringify(_0x3695d6), kami),
        _0x41f6a7 = "jsv=2.4.12&appKey=" + _0x326c79 + "&t=" + _0x5a0823 + "&sign=" + _0x5b22e5 + "&c=" + _0x55f29c + "&api=mtop.alsc.wechat.biz.api.community.homepage&dataType=json&method=GET&timeout=10000&v=1.0&type=originaljson&ttid=" + encodeURIComponent("wxece3a9a4c82f58c9@wechat_ios_11.7.0") + "&accountSite=eleme" + "&" + _0x3f78fc + "&_bx-m=1",
        {
    bx_ua: _0x120610,
    mini_janus: _0x460147
  } = await getbxua(kami, _0x41f6a7),
        _0x13fb38 = {
    "content-type": "application/x-www-form-urlencoded",
    Connection: "keep-alive",
    Cookie: _0x552b5a + "",
    "x-tap": "wx",
    "mini-janus": encodeURIComponent(_0x460147),
    "x-decode-ua": "false",
    "x-secext-city": "16",
    "bx-ua": encodeURIComponent(_0x120610),
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090923) XWEB/8555",
    accept: "application/json",
    xweb_xhr: "1",
    "sec-fetch-site": "cross-site",
    "sec-fetch-mode": "cors",
    "x-ua": "MiniAppVersion/11.7.0 DeviceId/" + _0x465ccf,
    "x-decode-ua": "false",
    "sec-fetch-dest": "empty",
    referer: "https://servicewechat.com/wxece3a9a4c82f58c9/582/page-frame.html",
    "accept-language": "zh-CN,zh;q=0.9",
    xweb_xhr: 1
  },
        _0x481886 = {
    url: "https://waimai-guide.ele.me/h5/mtop.alsc.wechat.biz.api.community.homepage/1.0/4.0/?" + _0x41f6a7,
    method: "GET",
    headers: _0x13fb38
  };

  return new Promise(_0x336746 => {
    request(_0x481886, async (_0x2c43c2, _0x55bde4, _0x3342f5) => {
      if (!_0x2c43c2 && _0x55bde4.statusCode === 200) {
        try {
          const _0x4f8c91 = JSON.parse(_0x3342f5);

          if (!isEmpty(_0x4f8c91.data)) {
            _0x336746(_0x4f8c91.data);
          } else {
            console.log(_0x4f8c91.ret[0]);

            _0x336746(null);
          }
        } catch (_0x5d3a1e) {
          console.log(_0x3342f5);

          _0x336746(null);
        }
      } else {
        _0x336746(null);
      }
    });
  });
}

async function signin(_0x13f469, _0x31bbbe, _0x236509, _0x4e78d1) {
  const _0x5b271d = {
    sceneCode: _0x31bbbe,
    firstCheckIn: false
  },
        _0x1f27e4 = new Date().getTime(),
        _0x396bfe = 32529321;

  var _0x2b5add = "data=" + encodeURIComponent(JSON.stringify(_0x5b271d));

  const _0x4113cd = _0x236509.split(";")[0],
        _0x254144 = _0x4113cd.split("_")[0],
        _0x3d7641 = await sign(_0x254144 + "&" + _0x1f27e4 + "&" + _0x396bfe + "&" + JSON.stringify(_0x5b271d), kami),
        _0x301a69 = "jsv=2.4.12&appKey=" + _0x396bfe + "&t=" + _0x1f27e4 + "&sign=" + _0x3d7641 + "&c=" + _0x236509 + "&api=mtop.alsc.wechat.biz.api.community.homepage&dataType=json&method=GET&timeout=10000&v=1.0&type=originaljson&ttid=" + encodeURIComponent("wxece3a9a4c82f58c9@wechat_ios_11.4.4") + "&accountSite=eleme&needLogin=true" + "&" + _0x2b5add,
        {
    bx_ua: _0x2d5ae6,
    mini_janus: _0xd9b7a2
  } = await getbxua(kami, _0x301a69),
        _0x555fa2 = {
    "content-type": "application/x-www-form-urlencoded",
    Connection: "keep-alive",
    Cookie: _0x13f469 + "",
    "x-tap": "wx",
    "mini-janus": encodeURIComponent(_0xd9b7a2),
    "x-decode-ua": "false",
    "x-secext-city": "16",
    "bx-ua": encodeURIComponent(_0x2d5ae6),
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090923) XWEB/8555",
    accept: "application/json",
    xweb_xhr: "1",
    "sec-fetch-site": "cross-site",
    "sec-fetch-mode": "cors",
    "x-ua": "MiniAppVersion/11.7.0 DeviceId/" + _0x4e78d1,
    "x-decode-ua": "false",
    "sec-fetch-dest": "empty",
    referer: "https://servicewechat.com/wxece3a9a4c82f58c9/582/page-frame.html",
    "accept-language": "zh-CN,zh;q=0.9",
    xweb_xhr: 1
  },
        _0xa23b33 = {
    url: "https://guide-acs.m.taobao.com/h5/mtop.alsc.wechat.biz.api.checkin/1.0/4.0/?" + _0x301a69,
    method: "GET",
    headers: _0x555fa2
  };

  return tryCatchPromise(_0x198504 => {
    request(_0xa23b33, async (_0x6de9a6, _0xe1e9df, _0x11e0a6) => {
      if (!_0x6de9a6 && _0xe1e9df.statusCode === 200) {
        try {
          const _0x4bd800 = JSON.parse(_0x11e0a6);

          !isEmpty(_0x4bd800.data) ? _0x198504(_0x4bd800.data) : (console.log(_0x4bd800.ret[0]), _0x198504(null));
        } catch (_0x52c3da) {
          console.log(_0x11e0a6 || _0x52c3da);

          _0x198504(null);
        }
      } else {
        _0x198504(null);
      }
    });
  });
}

async function bindInvited(_0x4c9f5d, _0x174adf, _0x1b9541) {
  const _0x4a9986 = {},
        _0x355aae = _0x4a9986._m_h5_tk + ";" + _0x4a9986._m_h5_tk_enc,
        _0x4da162 = _0x355aae,
        _0x54a717 = {
    inviteCode: "" + _0x174adf + "",
    firstCheckIn: false
  },
        _0xe12440 = new Date().getTime(),
        _0x2dd251 = 32529321;

  var _0x4a05ab = "data=" + encodeURIComponent(JSON.stringify(_0x54a717));

  const _0x56d75e = _0x4da162.split(";")[0],
        _0x1e83f2 = _0x56d75e.split("_")[0],
        _0x277517 = await sign(_0x1e83f2 + "&" + _0xe12440 + "&" + _0x2dd251 + "&" + JSON.stringify(_0x54a717), kami),
        _0x59a5f9 = "jsv=2.4.12&appKey=" + _0x2dd251 + "&t=" + _0xe12440 + "&sign=" + _0x277517 + "&c=" + _0x4da162 + "&api=mtop.alsc.wechat.biz.api.community.homepage&dataType=json&method=GET&timeout=10000&v=1.0&type=originaljson&ttid=" + encodeURIComponent("wxece3a9a4c82f58c9@wechat_ios_11.4.4") + "&accountSite=eleme&needLogin=true" + "&" + _0x4a05ab,
        {
    bx_ua: _0x5747b8,
    mini_janus: _0x4286d2
  } = await getbxua(kami, _0x59a5f9),
        _0x484b62 = {
    "content-type": "application/x-www-form-urlencoded",
    Connection: "keep-alive",
    Cookie: _0x4c9f5d + "",
    "x-tap": "wx",
    "mini-janus": encodeURIComponent(_0x4286d2),
    "x-decode-ua": "false",
    "x-secext-city": "16",
    "bx-ua": encodeURIComponent(_0x5747b8),
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090923) XWEB/8555",
    accept: "application/json",
    xweb_xhr: "1",
    "sec-fetch-site": "cross-site",
    "sec-fetch-mode": "cors",
    "x-ua": "MiniAppVersion/11.7.0 DeviceId/" + _0x1b9541,
    "x-decode-ua": "false",
    "sec-fetch-dest": "empty",
    referer: "https://servicewechat.com/wxece3a9a4c82f58c9/582/page-frame.html",
    "accept-language": "zh-CN,zh;q=0.9",
    xweb_xhr: 1
  },
        _0x3f2434 = {
    url: "https://guide-acs.m.taobao.com/h5/mtop.alsc.wechat.biz.api.community.bind.invite/1.0/4.0/?" + _0x59a5f9,
    method: "GET",
    headers: _0x484b62
  };

  return tryCatchPromise(_0x50bfc4 => {
    request(_0x3f2434, async (_0x2948a9, _0x500f2b, _0x392858) => {
      if (!_0x2948a9 && _0x500f2b.statusCode === 200) {
        try {
          const _0x1a883a = JSON.parse(_0x392858);

          if (!isEmpty(_0x1a883a.data)) {
            console.log(_0x1a883a.data.desc + "获得：" + _0x1a883a.data.awardAmount + " 福利金");

            _0x50bfc4(_0x1a883a.data);
          } else {
            console.log(_0x1a883a.ret[0]);

            _0x50bfc4(null);
          }
        } catch (_0x3bf439) {
          console.log(_0x392858);

          _0x50bfc4(null);
        }
      } else {
        _0x50bfc4(null);
      }
    });
  });
}

async function checkIn(_0x392d15, _0x1b2591, _0x4347f6) {
  const _0x1280b1 = _0x1b2591.communityInfo;

  if (_0x1280b1.communityName) {
    console.log("绑定的社群为：" + _0x1280b1.communityName);

    const _0x710ae6 = process.env.inviteCode || "76466F";

    _0x1b2591.userInfo && _0x710ae6 !== _0x1b2591.userInfo.inviteCode && !_0x1b2591.userInfo.inviteUserInfoDTO && _0x710ae6 && (await bindInvited(_0x392d15, _0x710ae6, _0x4347f6));

    const _0x3cf2e7 = _0x1280b1.sceneCode,
          _0x132eb3 = {},
          _0x230536 = _0x132eb3._m_h5_tk + ";" + _0x132eb3._m_h5_tk_enc,
          _0x6ca616 = await signin(_0x392d15, _0x3cf2e7, _0x230536, _0x4347f6);

    _0x6ca616 && console.log(_0x6ca616.desc);
  } else {
    console.log("你还没有加入社群，快找社群加入吧！");
  }
}

async function start() {
  await validateCarmeWithType(kami, 1);

  let _0x2532c1 = getCookies();

  for (let _0x1ac684 = 0; _0x1ac684 < _0x2532c1.length; _0x1ac684++) {
    const _0x1171f4 = _0x2532c1[_0x1ac684];

    if (!_0x1171f4) {
      console.log(" ❌无效用户信息, 请重新获取ck");
    } else {
      try {
        let _0x418cd2 = await checkCk(_0x1171f4, _0x1ac684, kami);

        if (!_0x418cd2) {
          continue;
        }

        let _0x13b310 = await getUserInfo(_0x418cd2);

        if (!_0x13b310.encryptMobile) {
          console.log("第", _0x1ac684 + 1, "账号失效！请重新登录！！！😭");
          continue;
        }

        const _0x5c30d1 = _0x13b310.localId;
        await checkCarmeCount(kami, _0x5c30d1, GAME_TYEP);
        console.log("******开始【饿了么账号", _0x1ac684 + 1, "】", _0x13b310.encryptMobile, "*********");

        const _0x294035 = {},
              _0x5c155a = _0x294035._m_h5_tk + ";" + _0x294035._m_h5_tk_enc,
              _0x214511 = _0x294035.union_id;

        if (!_0x214511) {
          console.log("缺少union_id");
          continue;
        }

        const _0x584107 = await getInfo(_0x418cd2, _0x5c155a, _0x214511);

        if (_0x584107.communityInfo) {
          await checkIn(_0x418cd2, _0x584107, _0x214511);
        } else {
          console.log("获取用户信息：" + JSON.stringify(_0x584107));
        }

        if (_0x1ac684 < _0x2532c1.length - 1) {
          console.log("延时", wait_time, "秒继续下一个");
          await wait(wait_time);
        }
      } catch (_0x1026c8) {
        console.log(_0x1026c8);
      }
    }
  }

  process.exit(0);
}

start();

function Env(t, e) {
  "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);

  class s {
    constructor(t) {
      this.env = t;
    }

    send(t, e = "GET") {
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

    get(t) {
      return this.send.call(this.env, t);
    }

    post(t) {
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

    isNode() {
      return "undefined" != typeof module && !!module.exports;
    }

    isQuanX() {
      return "undefined" != typeof $task;
    }

    isSurge() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
    }

    isLoon() {
      return "undefined" != typeof $loon;
    }

    toObj(t, e = null) {
      try {
        return JSON.parse(t);
      } catch {
        return e;
      }
    }

    toStr(t, e = null) {
      try {
        return JSON.stringify(t);
      } catch {
        return e;
      }
    }

    getjson(t, e) {
      let s = e;
      const i = this.getdata(t);

      if (i) {
        try {
          s = JSON.parse(this.getdata(t));
        } catch {}
      }

      return s;
    }

    setjson(t, e) {
      try {
        return this.setdata(JSON.stringify(t), e);
      } catch {
        return !1;
      }
    }

    getScript(t) {
      return new Promise(e => {
        this.get({
          url: t
        }, (t, s, i) => e(i));
      });
    }

    runScript(t, e) {
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

    loaddata() {
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

    writedata() {
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

    lodash_get(t, e, s) {
      const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
      let r = t;

      for (const t of i) if (r = Object(r)[t], void 0 === r) {
        return s;
      }

      return r;
    }

    lodash_set(t, e, s) {
      return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t);
    }

    getdata(t) {
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

    setdata(t, e) {
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

    getval(t) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null;
    }

    setval(t, e) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null;
    }

    initGotEnv(t) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar));
    }

    get(t, e = () => {}) {
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

    post(t, e = () => {}) {
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

    time(t, e = null) {
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

    msg(e = t, s = "", i = "", r) {
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

    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]);
      console.log(t.join(this.logSeparator));
    }

    logErr(t, e) {
      const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t);
    }

    wait(t) {
      return new Promise(e => setTimeout(e, t));
    }

    done(t = {}) {
      const e = new Date().getTime(),
            s = (e - this.startTime) / 1000;
      this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`);
      this.log();
      (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t);
    }

  }(t, e);
}