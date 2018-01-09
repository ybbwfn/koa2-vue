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
let delJournal = function(id) {
        let _sql = `delete from journal where id = ${id}`
        return query(_sql)
    }
    // 删除心情
let delMood = function(id) {
        let _sql = `delete from mood where id = ${id}`
        return query(_sql)
    }
    // 删除备忘
let delMemo = function(id) {
    let _sql = `delete from memo where id = ${id}`
    return query(_sql)
}

module.exports = {
    query,

    addUser,
    findDataByName,

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