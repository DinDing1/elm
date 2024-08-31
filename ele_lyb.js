/**
 * 变量：elmck: 必填，账号cookie
 * cron: 7 0,6,12,18,22 * * *
 * 修复连连看
 */
// 简单定义一个 Env 对象
class Env {
    constructor(name) {
        this.name = name;
    }
    log(...args) {
        console.log(...args);
    }
}

const $ = new Env('饿了么乐园币');
const {
    "getToken": getToken,
    "checkCk": checkCk,
    "wait": wait,
    "getCookies": getCookies,
    "getUserInfo": getUserInfo,
    "tryCatchPromise": tryCatchPromise
} = require("sj.nommoc/.".split("").reverse().join(""));

const request = require("tseuqer".split("").reverse().join(""));

const md5 = require("md5");

function isEmpty (_0x591a20) {
    return Object["values"](_0x591a20)['length'] === 0;
}

async function lottery (_0x2a7333) {
    const _0x37f589 = {
        'authority': 'shopping.ele.me',
        "accept": 'application/json',
        'accept-language': "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cache-control": "no-cache",
        'content-type': 'application/x-www-form-urlencoded',
        'origin': 'https://r.ele.me',
        'pragma': "no-cache",
        "referer": "https://r.ele.me/linkgame/index.html?navType=3&spm-pre=a2ogi.13162730.zebra-ele-login-module-9089118186&spm=a13.b_activity_kb_m71293.0.0",
        'cookie': _0x2a7333,
        "x-ele-ua": "RenderWay/H5 AppName/wap Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36",
        "user-agent": "Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
    };
    const _0x47799a = {
        "actId": '20221207144029906162546384',
        'collectionId': '20230224114656384938530468',
        "componentId": "20230224114825216373367998",
        "bizScene": 'game_center',
        'bizCode': "LOTTERY",
        'longitude': '120.21993197500706',
        "latitude": '30.178378857672215',
        'asac': '2A232091VOX6SPEQYH6RG4',
        "extParams": "{\"bizType\":\"LOTTERY\"}"
    };

    const _0x5695ee = new Date()["getTime"]();

    const _0x315936 = 12574478;

    var _0x369abd = "=atad".split("").reverse().join("") + encodeURIComponent(JSON['stringify'](_0x47799a));

    const _0x881d98 = getToken(_0x2a7333);

    const _0x34e5a0 = _0x881d98['split']('_')[0];

    const _0x26d75a = md5(_0x34e5a0 + "&" + _0x5695ee + '&' + _0x315936 + '&' + JSON['stringify'](_0x47799a));

    const _0x43bb72 = {
        "url": "=t&87447521=yeKppa&1.6.2=vsj?/0.1/yrettol.thgir.mroftalp.retnecnoitcaretni.iebuok.potm/5h/moc.oaboat.m.sca-ediug//:sptth".split("").reverse().join("") + _0x5695ee + "&sign=" + _0x26d75a + "nosj=epyTatad&nosjlanigiro=epyt&0.1=v&yrettol.thgir.mroftalp.retnecnoitcaretni.iebuok.potm=ipa&".split("").reverse().join(""),
        'method': 'POST',
        'headers': _0x37f589,
        "body": _0x369abd
    };
    return tryCatchPromise(_0x51ba78 => {
        request(_0x43bb72, async (_0x16ed8b, _0x409ead, _0x108964) => {
            if (!_0x16ed8b && _0x409ead["statusCode"] === 200) {
                try {
                    const _0x13c6dc = JSON.parse(_0x108964);

                    if (isEmpty(_0x13c6dc["data"]["data"])) {
                        console['log'](_0x13c6dc["ret"][0]);

                        _0x51ba78(false);
                    } else {
                        if (_0x13c6dc['data']["data"]['errorMsg']) {
                            console['log'](_0x13c6dc['data']['data']["errorMsg"]);
                        } else {
                            let _0x2f73eb = _0x13c6dc["data"]["data"]["sendRightList"][0];

                            const _0x2880f0 = _0x2f73eb['materialInfo']["description"] + _0x2f73eb["materialInfo"]["title"];

                            console["log"](_0x2880f0);
                        }

                        _0x51ba78(_0x13c6dc);
                    }
                } catch (_0x2f051a) {
                    _0x51ba78(false);
                }
            } else {
                _0x51ba78(false);
            }
        });
    });
}

async function lyb_sign (_0x24cd86) {
    const _0x4ec66f = await checkCk(_0x24cd86);

    const _0xcfadee = {
        "authority": "mtop.ele.me",
        "accept": 'application/json',
        'accept-language': "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        'asac': "2A21607NIIT1ND5C4YXJ6C",
        'cache-control': 'no-cache',
        "content-type": 'application/x-www-form-urlencoded',
        "origin": 'https://tb.ele.me',
        "pragma": "no-cache",
        "referer": 'https://tb.ele.me/wow/alsc/mod/b9ee9e6451bc8eda7a6afcbb?spm=a2ogi.13162730.zebra-ele-login-module-9089118186&spm=a2ogi.13162730.zebra-ele-login-module-9089118186&spm-pre=a13.b_activity_kb_m71293.ebridge.login',
        "cookie": _0x4ec66f,
        'user-agent': "Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
    };

    const _0x502234 = new Date()['getTime']();

    const _0x165860 = 12574478;
    const _0x57005c = {
        'bizScene': "game_center",
        "asac": "2A21607NIIT1ND5C4YXJ6C",
        "umidtoken": "@@bbcfa6a7ade8cb1546e9ee9b/dom/csla/wow/em.ele.bt//:sptth@@tuoemit htiw deliaf_daol_2nekoTtluafed".split("").reverse().join("") + _0x502234
    };

    var _0x436165 = "=atad".split("").reverse().join("") + encodeURIComponent(JSON["stringify"](_0x57005c));

    const _0x4d6ee1 = getToken(_0x4ec66f);

    const _0x26b3ee = _0x4d6ee1["split"]('_')[0];

    const _0x4ee849 = md5(_0x26b3ee + "&" + _0x502234 + '&' + _0x165860 + "&" + JSON['stringify'](_0x57005c));

    const _0x3db8af = {
        'url': "https://mtop.ele.me/h5/mtop.koubei.interactioncenter.sign.component.recordsignin/1.0/5.0/?jsv=2.7.1&appKey=12574478&t=" + _0x502234 + '&sign=' + _0x4ee849 + "141.0824.0.78_emorhc_diordna04%5h=dittces&C6JXY4C5DN1TIIN70612A2=casa&0.5=VS&pnosj=epyTatad&eurt=tseuqeRnigoL&eurt=nigoLdeen&gnirts=epyTeulav&nosj=epyt&1=edoce&0.1=v&ningisdrocer.tnenopmoc.ngis.retnecnoitcaretni.iebuok.potm=ipa&".split("").reverse().join(""),
        "method": "POST",
        'headers': _0xcfadee,
        'body': _0x436165
    };
    return tryCatchPromise(_0x203200 => {
        request(_0x3db8af, async (_0x272115, _0x1c441d, _0x179163) => {
            if (!_0x272115 && _0x1c441d['statusCode'] == 200) {
                const _0x533317 = JSON.parse(_0x179163);

                if (_0x533317['data']['errorMsg']) {
                    console['log'](_0x533317['data']['errorMsg']);
                } else {
                    console['log']("功成到签".split("").reverse().join(""));
                }

                _0x203200(_0x533317);
            } else {
                _0x203200(null);
            }
        });
    });
}

async function lyb_llk_token (_0x439987) {
    const _0x2f601c = {
        'bizScene': 'LIANLIANKAN',
        'bizMethod': 'login',
        'bizParam': "{\"inviterId\":null,\"gameId\":null,\"token\":\"token\"}",
        'longitude': 114.174328,
        'latitude': 22.316555
    };

    const _0x470dc0 = await gameRequest(_0x439987, _0x2f601c);
    // console.log('授权成功：', _0x470dc0["data"]);
    return [_0x470dc0['data']['token'], _0x470dc0['data']['openId']];
}

async function lyb_llk_gamecode (_0x38c94c, _0x245e6e) {
    const _0x273bc4 = {
        "bizScene": 'LIANLIANKAN',
        'bizMethod': 'startGameV2',
        'bizParam': "{\"gameId\":null,\"token\":\"" + _0x245e6e + "\"}",
        'longitude': 114.174328,
        'latitude': 22.316555
    };

    const _0x8b94cf = await gameRequest(_0x38c94c, _0x273bc4);

    if (_0x8b94cf['bizErrorMsg'] != 'success') {
        console['log'](_0x8b94cf['bizErrorMsg']);
        return null;
    }
    // console.log('开始游戏成功：', _0x8b94cf["data"]);
    return [_0x8b94cf["data"]['gameCode'], _0x8b94cf["levelId"]];
}

async function lyb_llk_passgame (_0xf45113, gameCode, gameToken, openId, lastLevelId = 0) {
    const _0x2d9a39 = {
        "bizScene": "LIANLIANKAN",
        'bizMethod': 'settlement',
        'bizParam': '{"gameCode":"' + gameCode + '","passLevelTime":' + Math.ceil(1e3 * 20 * lastLevelId) + ',"gameId":null,"token":"' + gameToken + "\",\"sign\":\"" + md5(`Game[${openId}]-${gameToken}|${gameCode}${Math.ceil(1e3 * lastLevelId)}`) + "\"}",
        'longitude': 114.174328,
        'latitude': 22.316555
    };

    const result = await gameRequest(_0xf45113, _0x2d9a39);
    console.log(result?.ret?.[0], result?.ret);
    if (result?.ret?.[0] == 'SUCCESS::调用成功') {
        console.log('游戏通过奖励领取成功！');
        return 3;
    }
    if (result?.['bizErrorMsg'] != 'success') {
        console['log'](result['bizErrorMsg']);
        return null;
    }
    // console.log('游戏结算成功：', result["data"]);
    return result['data']['lastLevelId'];
}

async function gameRequest (_0x5c4a15, _0x293db2) {
    const _0x1de928 = {
        "authority": 'shopping.ele.me',
        "accept": 'application/json',
        'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        "content-type": "application/x-www-form-urlencoded",
        'origin': 'https://r.ele.me',
        'pragma': 'no-cache',
        'referer': 'https://r.ele.me/linkgame/index.html?navType=3&spm-pre=a2ogi.13162730.zebra-ele-login-module-9089118186&spm=a13.b_activity_kb_m71293.0.0',
        'cookie': _0x5c4a15,
        'x-ele-ua': "RenderWay/H5 AppName/wap Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36",
        'user-agent': "Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
    };

    const _0x34fa44 = new Date()["getTime"]();

    const _0x173b76 = 12574478;

    var _0x5976a2 = "=atad".split("").reverse().join("") + encodeURIComponent(JSON['stringify'](_0x293db2));

    const _0x4e9995 = getToken(_0x5c4a15);

    const _0x3f9a68 = _0x4e9995['split']('_')[0];

    const _0x282679 = md5(_0x3f9a68 + '&' + _0x34fa44 + '&' + _0x173b76 + "&" + JSON['stringify'](_0x293db2));

    const _0x2e5dc4 = {
        'url': 'https://shopping.ele.me/h5/mtop.alsc.playgame.mini.game.dispatch/1.0/?jsv=2.6.1&appKey=12574478&t=' + _0x34fa44 + '&sign=' + _0x282679 + '&api=mtop.alsc.playgame.mini.game.dispatch&v=1.0&type=originaljson&dataType=json&timeout=5000&subDomain=shopping&mainDomain=ele.me&H5Request=true&pageDomain=ele.me&ttid=h5%40chrome_android_87.0.4280.141&SV=5.0',
        'method': 'POST',
        'headers': _0x1de928,
        'body': _0x5976a2
    };
    return tryCatchPromise(_0x57f3b2 => {
        request(_0x2e5dc4, async (_0x5bbc13, _0x42298e, _0x37c3cc) => {
            if (!_0x5bbc13 && _0x42298e['statusCode'] == 200) {
                try {
                    const _0x470bb4 = JSON.parse(_0x37c3cc);
                    let _0x87f7ce = _0x470bb4;
                    if (_0x470bb4?.data?.data && (typeof _0x470bb4?.data?.data == 'string')) {
                        _0x87f7ce = JSON.parse(_0x470bb4?.data?.data);
                    }

                    _0x57f3b2(_0x87f7ce);
                } catch (error) {
                    console['log']('解析请求返回数据异常：', _0x37c3cc);

                    _0x57f3b2(null);
                }
            } else {
                _0x57f3b2(null);
            }
        });
    });
}

async function llk_game (_0x25bfaf, gameToken, openId, gameTimes = 0) {
    const [gameCode, gameLevel] = await lyb_llk_gamecode(_0x25bfaf, gameToken);
    if (gameCode) {
        res = await lyb_llk_passgame(_0x25bfaf, gameCode, gameToken, openId, gameTimes);

        console['log']('连连看第' + res + '关闯关成功');
        console['log']('随机等待5-10s');
        gameTimes++;
        await wait(getRandom(5, 10));

        if (res === 3) {
            return;
        } else {
            await llk_game(_0x25bfaf, gameCode, gameToken, openId, gameTimes);
        }
    } else {
        console['log']("过成完已看连连".split("").reverse().join(""));
    }
}

async function water_login (_0x1f943d) {
    const _0x22a643 = {
        "bizScene": 'WATER_SORT',
        'bizParam': "{\"type\":\"login\"}",
        'bizMethod': 'login'
    };

    const _0x2d2d31 = await gameRequest(_0x1f943d, _0x22a643);

    return _0x2d2d31;
}

async function water_game_success (_0x5605a4) {
    const _0x320ec5 = {
        'bizScene': "WATER_SORT",
        'bizParam': "{\"type\":\"gameSuccess\"}",
        'bizMethod': 'gameSuccess'
    };

    const _0x3d4a5f = await gameRequest(_0x5605a4, _0x320ec5);

    return _0x3d4a5f;
}

async function water_reward (_0x381a2a, _0x45fe93) {
    const _0x5b7071 = {
        'bizScene': 'WATER_SORT',
        'bizParam': "{\"type\":\"getPassPrize\",\"data\":{\"addNum\":\"" + _0x45fe93 + "}}1:\"epyt\",\"".split("").reverse().join(""),
        'bizMethod': 'getPassPrize'
    };

    const _0x2a1757 = await gameRequest(_0x381a2a, _0x5b7071);

    return _0x2a1757;
}

async function water_game (_0x3ee10c) {
    const _0x27e9b3 = await water_login(_0x3ee10c);

    const _0x50f5a3 = _0x27e9b3['passConf'];
    const _0x50e194 = [];

    for (let _0x3ac6d8 of Object['values'](_0x50f5a3)) {
        _0x50e194['push'](_0x3ac6d8['passNum']);
    }

    var _0x55c700 = await water_game_success(_0x3ee10c);

    var _0x194b12 = _0x55c700['info']['todayPass'];
    var _0x4ba1ef = 0;

    while (_0x194b12 <= _0x50e194[_0x50e194["length"] - 1]) {
        _0x55c700 = await water_game_success(_0x3ee10c);
        _0x194b12 = _0x55c700['info']["todayPass"];
        console['log']("欢乐倒水第" + _0x194b12 + '关闯关成功');

        if (_0x50e194['includes'](_0x194b12)) {
            _0x4ba1ef = _0x50e194['indexOf'](_0x194b12) + 1;

            const _0x499012 = await water_reward(_0x3ee10c, _0x4ba1ef);

            console['log']("：得获".split("").reverse().join("") + _0x499012['goldnum'] + "币园乐".split("").reverse().join(""));
        }
    }

    console['log']("成完关闯水倒乐快".split("").reverse().join(""));
}

async function start () {
    const _0x1612bb = getCookies();

    for (let _0x18c297 = 0; _0x18c297 < _0x1612bb['length']; _0x18c297++) {
        const _0x5ed52b = _0x1612bb[_0x18c297];

        if (!_0x5ed52b) {
            console['log'](" ❌无效用户信息, 请重新获取ck");
        } else {
            try {
                let _0xaeedd3 = await checkCk(_0x5ed52b, _0x18c297);

                if (!_0xaeedd3) {
                    continue;
                }

                console['log']("号账么了饿【始开******".split("").reverse().join(""), _0x18c297 + 1, "】", '十七不努力', "*********".split("").reverse().join(""));
                await lyb_sign(_0xaeedd3);
                await lottery(_0xaeedd3);

                const [gameToken, openId] = await lyb_llk_token(_0xaeedd3);

                await llk_game(_0xaeedd3, gameToken, openId);
                // await llk_game(_0xaeedd3, gameToken, openId);
                await water_game(_0xaeedd3);
                await wait(getRandom(5, 10));
            } catch (_0x54faf5) {
                console['log'](_0x54faf5);
            }
        }
    }

    process['exit'](0);
}

start();

function getRandom (_0x3bfe5c, _0x38370c) {
    return Math['floor'](Math["random"]() * (_0x38370c - _0x3bfe5c + 1) + _0x3bfe5c);
}
