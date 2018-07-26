var router = require('koa-router')();
var userModel = require('./sql.js')
var account = require('./account_sql.js')
var moment = require('moment')
                             //加载http,因为我们用的是http.request，这个理所当然要加载
                             

    // get getOpenId
    router.get('/api/getOpenId', async(ctx, next) => {
        var codeStr = ctx.request.querystring.split('=')[1];
        await account.getOpenId(codeStr).then((res) => {
            ctx.body = {
                data: {openid:res.openid},
                success: true,
                error_msg: null
            };
        }).catch(() => {
            ctx.body = {
                data: '失败',
                success: false,
                error_msg: "失败"
            };
        })
    })
        // post searchAccount
router.post('/api/searchAccount', async(ctx, next) => {
    var openid = ctx.request.body.openid;;
    var currentPage = ctx.request.body.currentPage;
    var pageSize = ctx.request.body.pageSize;
    var startDate = ctx.request.body.date+'-01';
    let dateStr=ctx.request.body.date.split("-");
    var endDate ='';
    if(dateStr[1]==12){
        endDate=(dateStr[0]-0)+1+'-01-01'
    }else{
        endDate=dateStr[0]+'-'+((dateStr[1]-0)+1)+'-01'
    }

    var total = await account.searchTotal([openid], 'account_list').then(restotal => {
        return restotal[0].total;
    }).catch(() => {
        ctx.body = {
            data: '查询失败',
            success: false,
            error_msg: "查询失败"
        };
    });
    //console.log([openid,startDate,endDate ,(currentPage - 1) * pageSize, pageSize - 0])
    await account.searchAccount([openid,startDate,endDate ,(currentPage - 1) * pageSize, pageSize - 0]).then(result => {

        ctx.body = {
            data: { data: result, total, pageCount: Math.ceil(total / pageSize) },
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
    // post 发表心情
    router.post('/api/addAccount', async(ctx, next) => {
        
        let ctxInfo = ctx.request.body;
        var accountType = ctxInfo.accountType+'';
        var money = ctxInfo.money;
        var type = ctxInfo.type;
        var createdate = ctxInfo.createdate;
        var des = ctxInfo.des;
        var openid = ctxInfo.openid;
        await account.addAccount([accountType,openid,money,type,createdate,des]).then(() => {
            ctx.body = {
                data: '成功',
                success: true,
                error_msg: null
            };
        }).catch(() => {
            ctx.body = {
                data: '失败',
                success: false,
                error_msg: "失败"
            };
        })
    })


// post 查询心情
router.post('/api/searchMood', async(ctx, next) => {
        var userid = ctx.session.id;
        var currentPage = ctx.request.body.currentPage;
        var pageSize = ctx.request.body.pageSize;
        var total = await userModel.searchTotal([userid], 'mood').then(restotal => {
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

            ctx.body = {
                data: { data: result, total, pageCount: Math.ceil(total / pageSize) },
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
    // post 查询备忘录
router.post('/api/searchMemo', async(ctx, next) => {
        var userid = ctx.session.id;
        var currentPage = ctx.request.body.currentPage;
        var pageSize = ctx.request.body.pageSize;
        var total = await userModel.searchTotal([userid], 'memo').then(restotal => {
            return restotal[0].total;
        }).catch(() => {
            ctx.body = {
                data: '查询失败',
                success: false,
                error_msg: "查询失败"
            };
        });
        console.log([userid, (currentPage - 1) * pageSize, pageSize])
        await userModel.searchMemo([userid, (currentPage - 1) * pageSize, pageSize - 0]).then(result => {
            console.log("result")
            console.log(result)
            console.log("总条数")

            ctx.body = {
                data: { data: result, total, pageCount: Math.ceil(total / pageSize) },
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
    // post 查询日志
router.post('/api/searchJournal', async(ctx, next) => {
    var userid = ctx.session.id;
    var currentPage = ctx.request.body.currentPage;
    var pageSize = ctx.request.body.pageSize;
    var total = await userModel.searchTotal([userid], 'journal').then(restotal => {
        return restotal[0].total;
    }).catch(() => {
        ctx.body = {
            data: '查询失败',
            success: false,
            error_msg: "查询失败"
        };
    });
    console.log([userid, (currentPage - 1) * pageSize, pageSize])
    await userModel.searchJournal([userid, (currentPage - 1) * pageSize, pageSize - 0]).then(result => {
        console.log("result")
        console.log(result)
        console.log("总条数")

        ctx.body = {
            data: { data: result, total, pageCount: Math.ceil(total / pageSize) },
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
    var postIdList = JSON.parse(postId);

    if (typeof postIdList === 'object') {
        console.log(`删除传入idList-------${postId}`)
        await userModel.delJournal(postIdList.join(","))
            .then(() => {
                ctx.body = {
                    data: '删除成功',
                    success: true,
                    error_msg: null
                };
            }).catch(() => {
                ctx.body = {
                    data: false
                }
            })
    } else {
        console.log(`删除传入postId${postId}`)
        await userModel.delJournal(postId)
            .then(() => {
                ctx.body = {
                    data: '删除成功',
                    success: true,
                    error_msg: null
                };
            }).catch(() => {
                ctx.body = {
                    data: false
                }
            })
    }
})

// 删除心情
router.get('/api/delMood', async(ctx, next) => {
        var postId = ctx.request.querystring.split('=')[1]
        var postIdList = JSON.parse(postId);

        if (typeof postIdList === 'object') {
            console.log(`删除传入idList-------${postId}`)
            await userModel.delMood(postIdList.join(","))
                .then(() => {
                    ctx.body = {
                        data: '删除成功',
                        success: true,
                        error_msg: null
                    };
                }).catch(() => {
                    ctx.body = {
                        data: false
                    }
                })



        } else {
            console.log(`删除传入postId${postId}`)
            await userModel.delMood(postId)
                .then(() => {
                    ctx.body = {
                        data: '删除成功',
                        success: true,
                        error_msg: null
                    };
                }).catch(() => {
                    ctx.body = {
                        data: false
                    }
                })
        }


    })
    // 删除备忘
router.get('/api/delMemo', async(ctx, next) => {
    var postId = ctx.request.querystring.split('=')[1]
    var postIdList = JSON.parse(postId);

    if (typeof postIdList === 'object') {
        console.log(`删除传入idList-------${postId}`)
        await userModel.delMemo(postIdList.join(","))
            .then(() => {
                ctx.body = {
                    data: '删除成功',
                    success: true,
                    error_msg: null
                };
            }).catch(() => {
                ctx.body = {
                    data: false
                }
            })
    } else {
        console.log(`删除传入postId${postId}`)
        await userModel.delMemo(postId)
            .then(() => {
                ctx.body = {
                    data: '删除成功',
                    success: true,
                    error_msg: null
                };
            }).catch(() => {
                ctx.body = {
                    data: false
                }
            })
    }
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