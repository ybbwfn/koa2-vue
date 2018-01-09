var router = require('koa-router')();
var userModel = require('./sql.js');
var md5 = require('md5');
var check = require('./util.js');
var checkNotLogin = check.checkNotLogin;
var checkLogin = check.checkLogin;
// 注册页面
// router.get('/api/addUser', async(ctx, next) => {
//         console.log(ctx.session)
//             // await checkNotLogin(ctx)
//         await ctx.render('addUser', {
//             session: ctx.session,
//         })
//     })
// post 注册
router.post('/api/addUser', async(ctx, next) => {

    var user = {
        name: ctx.request.body.name,
        pass: ctx.request.body.pass,
        repeatpass: ctx.request.body.repeatpass
    }
    console.log(user)
    await userModel.findDataByName(user.name)
        .then(result => {
            console.log("result")
            console.log(result)
            if (result.length) {
                try {
                    throw Error('用户已经存在')
                } catch (error) {
                    //处理err
                    console.log(error)
                }

                ctx.body = {
                    data: null,
                    success: false,
                    error_msg: "用户已经存在"
                };
            } else if (user.pass !== user.repeatpass || user.pass == '') {
                ctx.body = {
                    data: null,
                    success: false,
                    error_msg: "密码输入不一致"
                };
            } else {
                ctx.body = {
                    data: '注册成功',
                    success: true,
                    error_msg: null
                };
                // ctx.session.user=ctx.request.body.name				
                userModel.addUser([ctx.request.body.name, md5(ctx.request.body.pass)])
            }
        })

})


module.exports = router