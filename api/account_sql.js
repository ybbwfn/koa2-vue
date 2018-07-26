var mysql = require('mysql');
var config = require('../config/default.js')
var http = require('http'); 
// getOpenId
const https = require('https');
var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});

let query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log("0")
                console.log(values)
                console.log(err)
                resolve(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    console.log("1")
                    console.log(values)
                    console.log(err)

                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })

}

let addAccount = function (value) {
    let _sql = "insert into account_list(accountType,openid,money,type,createdate,des) values(?,?,?,?,?,?);"
    return query(_sql, value)
}
// 分页查询
let searchAccount = function(value) {
    console.log(value)
    let _sql =
        `SELECT * FROM account_list
        WHERE openid=? 
        AND createdate >=? 
        AND createdate <? 
        LIMIT ?,?;`
    return query(_sql, value)
}
// 查询总条数
let searchTotal = function(value, tableName) {
    let _sql = `select count(*) as total from ${tableName} WHERE openid=?`
    return query(_sql, value)
}
    
let getOpenId = function (value) {
    var options = {
        host: "api.weixin.qq.com",                   //host是要访问的域名，别加http或https
        path: "/sns/jscode2session?appid=wx55a1db881ef19adb&secret=26db988603f33e45d3ad1357f47745e3&js_code=" + value + "&grant_type=authorization_code",       //请求的路径或参数，参数怎么写我不用说了吧？
        method: 'GET'                              //请求类型，这里是get
    }
    var sendmsg = '';                                //创建空字符串，用来存放收到的数据
    return new Promise(function (resolve, reject) {
            
        req = https.request(options, function (req) {      //发出请求，加上参数，然后有回调函数
            req.on("data", function (chunk) {               //监听data,接受数据
                sendmsg += chunk;                         //把接受的数据存入定放的sendmsg
            });
            req.on("end", function (d) {                     //监听end事件，请求结束后调用
                var list = obj= JSON.parse(sendmsg);
                // console.log(list)                  //打印出结果

                    resolve(list)
                
            });

        });
        req.end(); 


    });
 

}

module.exports = {
    query,
    addAccount,
    getOpenId,
    searchAccount,
    searchTotal
}