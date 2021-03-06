var mysql = require('mysql');
var config = require('../config/default.js')

var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});

let query = function(sql, values) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function(err, connection) {
                if (err) {
                    resolve(err)
                } else {
                    connection.query(sql, values, (err, rows) => {

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
    // 注册用户
let addUser = function(value) {
        let _sql = "insert into users(name,pass) values(?,?);"
        return query(_sql, value)
    }
    // 通过名字查找用户
let findDataByName = function(name) {
    let _sql = `select * from users
     where name="${name}"
    `
    return query(_sql)
}

// 查询心情
let searchMood = function(value) {
        let _sql =
            `SELECT id,content,insert_date FROM mood
            WHERE userid=?  
            AND del_flag=0 
            LIMIT ?,?;`
        return query(_sql, value)
    }
    // 查询备忘录
let searchMemo = function(value) {
        let _sql =
            `SELECT id,content,insert_date FROM memo
            WHERE userid=?  
            AND del_flag=0 
            LIMIT ?,?;`
        return query(_sql, value)
    }
    // 查询日志
let searchJournal = function(value) {
        let _sql =
            `SELECT id,title,content,insert_date FROM journal
            WHERE userid=?  
            AND del_flag=0 
            LIMIT ?,?;`
        return query(_sql, value)
    }
    // 查询总条数
let searchTotal = function(value, tableName) {
    let _sql = `select count(*) as total from ${tableName} WHERE userid=?`
    return query(_sql, value)
}



// 发表文章
let addJournal = function(value) {
        let _sql = "insert into journal(title,content,userid,insert_date,del_flag) values(?,?,?,?,?);"
        return query(_sql, value)
    }
    // 发表心情
let addMood = function(value) {
        let _sql = "insert into mood(content,userid,insert_date,del_flag) values(?,?,?,?);"
        return query(_sql, value)
    }
    // 发表备忘
let addMemo = function(value) {
    let _sql = "insert into memo(content,userid,insert_date,del_flag) values(?,?,?,?);"
    return query(_sql, value)
}


// 更新修改文章
let updateJournal = function(values) {
        let _sql = `update journal set  title=?,content=? where id=?`
        return query(_sql, values)
    }
    // 更新心情
let updateMood = function(values) {
        let _sql = `update mood set  content=? where id=?`
        return query(_sql, values)
    }
    // 更新备忘
let updateMemo = function(values) {
    let _sql = `update memo set content=? where id=?`
    return query(_sql, values)
}




// 删除文章
let delJournal = function(idList) {
        let _sql = `delete from journal where id in (${idList})`
        return query(_sql)
    }
    // 删除心情
let delMood = function(idList) {
        let _sql = `delete from mood where id in (${idList})`
        return query(_sql)
    }
    // 删除备忘
let delMemo = function(idList) {
    let _sql = `delete from memo where id in (${idList})`
    return query(_sql)
}

module.exports = {
    query,

    addUser,
    findDataByName,

    searchTotal,
    searchMood,
    searchMemo,
    searchJournal,

    addJournal,
    addMood,
    addMemo,

    updateJournal,
    updateMood,
    updateMemo,

    delJournal,
    delMood,
    delMemo,
}