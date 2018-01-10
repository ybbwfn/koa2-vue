var router = require('koa-router')();
var userModel = require('./sql.js')
var moment = require('moment')

// post 查询心情
router.post('/api/searchMood', async(ctx, next) => {
    var userid = ctx.session.id;
    var currentPage = ctx.request.body.currentPage;
    var pageSize = ctx.request.body.pageSize;
    var total = await userModel.searchTotal([userid]).then(restotal => {
        return restotal[0].total;
    }).catch(() => {
        ctx.body = {
            data: '查询失败',
            success: false,
            error_msg: "查询失败"
        };
    });
    console.log([userid, (currentPage - 1) * pageSize, pageSize])
    await userModel.searchMood([userid, (currentPage - 1) * pageSize, pageSize - 0]).then(result => {
        console.log("result")
        console.log(result)
        console.log("总条数")

        console.log(total)
        ctx.body = {
            data: { data: result, total },
            success: true,
            error_msg: null
        };

    }).catch(() => {
        ctx.body = {
            data: '查询失败',
            success: false,
            error_msg: "查询失败"
        };
    })
})


// post 发表文章
router.post('/api/addJournal', async(ctx, next) => {
        var title = ctx.request.body.title;
        var content = ctx.request.body.content;
        var userid = ctx.session.id;
        var insert_date = moment().format('YYYY-MM-DD HH:mm');
        var del_flag = "0";
        console.log([title, content, userid, insert_date, del_flag])
        await userModel.addJournal([title, content, userid, insert_date, del_flag]).then(() => {
            ctx.body = {
                data: '发表成功',
                success: true,
                error_msg: null
            };
        }).catch(() => {
            ctx.body = {
                data: '发表失败',
                success: false,
                error_msg: "发表失败"
            };
        })
    })
    // post 发表心情
router.post('/api/addMood', async(ctx, next) => {
        var content = ctx.request.body.content;
        var userid = ctx.session.id;
        var insert_date = moment().format('YYYY-MM-DD HH:mm');
        var del_flag = "0";
        console.log([content, userid, insert_date, del_flag])
        await userModel.addMood([content, userid, insert_date, del_flag]).then(() => {
            ctx.body = {
                data: '发表成功',
                success: true,
                error_msg: null
            };
        }).catch(() => {
            ctx.body = {
                data: '发表失败',
                success: false,
                error_msg: "发表失败"
            };
        })
    })
    // post 新增备忘录
router.post('/api/addMemo', async(ctx, next) => {
    var content = ctx.request.body.content;
    var userid = ctx.session.id;
    var insert_date = moment().format('YYYY-MM-DD HH:mm');
    var del_flag = "0";
    console.log([content, userid, insert_date, del_flag])
    await userModel.addMemo([content, userid, insert_date, del_flag]).then(() => {
        ctx.body = {
            data: '发表成功',
            success: true,
            error_msg: null
        };
    }).catch(() => {
        ctx.body = {
            data: '发表失败',
            success: false,
            error_msg: "发表失败"
        };
    })
})


// 删除单篇文章
router.get('/api/delJournal', async(ctx, next) => {
        var postId = ctx.request.querystring.split('=')[1]
        await userModel.delJournal(postId)
            .then(() => {
                ctx.body = {
                    data: true
                }
            }).catch(() => {
                ctx.body = {
                    data: false
                }
            })
    })
    // 删除心情
router.get('/api/delMood', async(ctx, next) => {
    var postId = ctx.request.querystring.split('=')[1]
    await userModel.delMood(postId)
        .then(() => {
            ctx.body = {
                data: true
            }
        }).catch(() => {
            ctx.body = {
                data: false
            }
        })
})

// 删除备忘录
router.get('/api/delMemo', async(ctx, next) => {
    var postId = ctx.request.querystring.split('=')[1]
    await userModel.delMemo(postId)
        .then(() => {
            ctx.body = {
                data: true
            }
        }).catch(() => {
            ctx.body = {
                data: false
            }
        })
})



// 编辑单篇文章页面
router.post('/api/editJournal', async(ctx, next) => {
    var title = ctx.request.body.title;
    var content = ctx.request.body.content;
    await userModel.editJournal([title, content])
        .then(() => {
            ctx.body = {
                data: true
            }
        }).catch(() => {
            ctx.body = {
                data: false
            }
        })
})

module.exports = router