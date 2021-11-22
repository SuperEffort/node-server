const router = require('koa-router')();
let accessToken = "init_s_token"; // 短token
let refreshToken = "init_l_token"; // 长token

/* 5s刷新一次短token */
setInterval(() => {
    accessToken = "s_tk" + Math.random();
}, 5000);

/* 一小时刷新一次长token */
setInterval(() => {
    refreshToken = "l_tk" + Math.random();
}, 20000);

/* 登录接口获取长短token */
router.get('/login', async (ctx) => {
    ctx.body = {
        returnCode: 0,
        accessToken,
        refreshToken,
    }
})

/* 获取应用数据1 */
router.get('/getData', async (ctx) => {
    let { authorization } = ctx.headers;
    if (authorization !== accessToken) {
        ctx.body = {
            returnCode: 104,
            info: "token无效"
        };
    } else {
        ctx.body = {
            code: 200,
            returnCode: 0,
            data: { id: Math.random() },
        };
    }
})

/* 获取应用数据2 */
router.get('/getData2', async (ctx) => {
    let { authorization } = ctx.headers;
    if (authorization !== accessToken) {
        ctx.body = {
            returnCode: 104,
            info: "token无效"
        };
    } else {
        ctx.body = {
            code: 200,
            returnCode: 0,
            data: { age: Math.random() },
        };
    }
})

/* 刷新token */
router.get('/resultToken', async (ctx) => {
    let { pass } = ctx.headers;
    if (pass !== refreshToken) {
        ctx.body = {
            returnCode: 400,
            info: "token无效,请重新登录"
        };
    } else {
        ctx.body = {
            returnCode: 0,
            accessToken
        };
    }
})

module.exports = router;
