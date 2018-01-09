var router = require('koa-router')();
var userModel = require('./sql.js');
var md5 = require('md5');
var check = require('./util.js');
var checkNotLogin = check.checkNotLogin;
var checkLogin = check.checkLogin;

// router.get('/signin', async(ctx, next) => {
//     await checkNotLogin(ctx)
//     await ctx.render('signin', {
//         session: ctx.session,
//     })
// })
router.post('/api/signin', async(ctx, next) => {
    var name = ctx.request.body.name;
    var pass = ctx.request.body.pass;
    await userModel.findDataByName(name)
        .then(result => {
            var res = JSON.parse(JSON.stringify(result))
            if (name === res[0]['name'] && md5(pass) === res[0]['pass']) {
                ctx.body = {
                    data: '登录成功',
                    success: true,
                    error_msg: null
                };
                ctx.session.user = res[0]['name']
                ctx.session.id = res[0]['id']
                console.log('session', ctx.session)
                console.log('登录成功')

            } else {
                ctx.body = {
                    data: '用户名或密码错误',
                    success: false,
                    error_msg: '用户名或密码错误'
                };
            }
        }).catch(err => {
            ctx.body = {
                data: '登录失败',
                success: false,
                error_msg: '登录失败'
            };
        })

})

module.exports = router