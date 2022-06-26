const mysql = require('mysql');
const { DBCONFIG } = require('../../togy.gc.config')

const DB_HOST = DBCONFIG.DB_HOST
    , DB_USER = DBCONFIG.DB_USER
    , DB_PASSWD = DBCONFIG.DB_PASSWD
    , DB_NAME = DBCONFIG.DB_NAME


//  获取项目信息列表
async function getProjectInfo(){
    return new Promise(async (rec,rej) => {
        const connection = mysql.createConnection({
            host:DB_HOST,
            user:DB_USER,
            password:DB_PASSWD,
            database :DB_NAME
        });
        connection.connect();
        const SQL = `select * from Atom_Project;`
        connection.query(SQL,[],(err, results) => {
            if(err){
                rej(err)
            }else{
                if(results.length < 0){
                    rej('无法查询项目列表')
                }else{
                    rec(results)
                }
            }
            connection.end()
        })
    })
}

//  获取项目信息列表ID
async function getProjectInfoForID(id){
    return new Promise(async (rec,rej) => {
        const connection = mysql.createConnection({
            host:DB_HOST,
            user:DB_USER,
            password:DB_PASSWD,
            database :DB_NAME
        });
        connection.connect();
        const SQL = `select * from Atom_Project where id = ?;`
        connection.query(SQL,[id],(err, results) => {
            if(err){
                rej(err)
            }else{
                if(results.length < 0){
                    rej('无法查询项目列表')
                }else{
                    rec(results)
                }
            }
            connection.end()
        })
    })
}

//  创建企业信息
async function createProjectInfo(pname, pcreator, ppeople){
    return new Promise(async (rec,rej) => {
        const connection = mysql.createConnection({
            host:DB_HOST,
            user:DB_USER,
            password:DB_PASSWD,
            database :DB_NAME
        });
        connection.connect();
        const createtime = new Date().getTime()
        const SQL = `INSERT INTO Atom_Project (pname, pcreator, ppeople, createtime) VALUES (?, ?, ?, ?);`
        connection.query(SQL,[pname, pcreator, ppeople, createtime],(err, results) => {
            if(err){
                rej(err)
            }else{
                rec()
            }
            connection.end()
        })
    })
}

//  编辑企业信息
async function editProjectInfo(pname, pcreator, ppeople, id){
    return new Promise(async (rec,rej) => {
        const connection = mysql.createConnection({
            host:DB_HOST,
            user:DB_USER,
            password:DB_PASSWD,
            database :DB_NAME
        });
        connection.connect();
        const SQL = `update Atom_Project set pname = ?, pcreator = ?, ppeople = ?  where id = ? ;`
        connection.query(SQL,[pname, pcreator, ppeople, id],(err, results) => {
            if(err){
                rej(err)
            }else{
                rec()
            }
            connection.end()
        })
    })
}

//  删除企业信息
async function deleteProjectInfo(id){
    return new Promise(async (rec,rej) => {
        const connection = mysql.createConnection({
            host:DB_HOST,
            user:DB_USER,
            password:DB_PASSWD,
            database :DB_NAME
        });
        connection.connect();
        const SQL = `delete from Atom_Project where id = ?;`
        connection.query(SQL,[id],(err, results) => {
            if(err){
                rej(err)
            }else{
                rec()
            }
            connection.end()
        })
    })
}

//  模糊查询

async function searchProjectInfo(searchName){
    return new Promise(async (rec,rej) => {
        const connection = mysql.createConnection({
            host:DB_HOST,
            user:DB_USER,
            password:DB_PASSWD,
            database :DB_NAME
        });
        connection.connect();
        let SQL
        if(searchName != 'EMPTY'){
            SQL = `select * from  atom_project  where concat(pName, pCreator, pPeople) like ?;`
        }else{
            SQL = `select * from Atom_Project;`
        }

        connection.query(SQL,['%'+ searchName + '%'],(err, results) => {
            if(err){
                rej(err)
            }else{
                rec(results)
            }
            connection.end()
        })
    })
}







async function getUserInfo(username){
    return new Promise(async (rec,rej) => {
        const connection = mysql.createConnection({
            host:DB_HOST,
            user:DB_USER,
            password:DB_PASSWD,
            database :DB_NAME
        });
        connection.connect();
        const SQL = `select * from user_info where username = ? ;`
        connection.query(SQL,[username],(err, results) => {
            if(err){
                rej(err)
            }else{
                if(results.length != 1){
                    rej('不存在此账户')
                }else{
                    rec(results)
                }
            }
            connection.end()
        })
    })
}
async function updateUserInfo(username,nickname){
    return new Promise(async (rec,rej) => {
        const connection = mysql.createConnection({
            host:DB_HOST,
            user:DB_USER,
            password:DB_PASSWD,
            database :DB_NAME
        });
        connection.connect();
        const SQL = `update user_info set nickname = ? where username = ? ;`
        connection.query(SQL,[nickname, username],(err, results) => {
            if(err){
                rej(err)
            }else{
                rec()
            }
            connection.end()
        })
    })
}

async function updateUserPass(username,password){
    return new Promise(async (rec,rej) => {
        const connection = mysql.createConnection({
            host:DB_HOST,
            user:DB_USER,
            password:DB_PASSWD,
            database :DB_NAME
        });
        connection.connect();
        const createtime = new Date().getTime()
        const SQL = `INSERT INTO user_passwd (username, password, createtime) VALUES (?, ?, ?);`
        connection.query(SQL,[username, password, createtime],(err, results) => {
            if(err){
                rej(err)
            }else{
                rec()
            }
            connection.end()
        })
    })
}

async function getTurnData(username){
    return new Promise((rec,rej) => {
        const connection = mysql.createConnection({
            host:DB_HOST,
            user:DB_USER,
            password:DB_PASSWD,
            database :DB_NAME
        });
        connection.connect();
        const SQL = `select * from user_turn where username = ? and state = 1 ;`
        connection.query(SQL,[username],(err, results) => {
            if(err){
                rej(err)
            }else{
                rec(results)
            }
            connection.end()
        })
    })
}

async function addTurnData(username, turnpath, turnuser, turnpass){
    return new Promise(async (rec,rej) => {
        const connection = mysql.createConnection({
            host:DB_HOST,
            user:DB_USER,
            password:DB_PASSWD,
            database :DB_NAME
        });
        connection.connect();
        const createtime = new Date().getTime()
        const SQL = `INSERT INTO user_turn (username, turnpath, turnuser, turnpass, createtime, state) VALUES (?, ?, ?, ?, ?, 1);`
        connection.query(SQL,[username, turnpath, turnuser, turnpass, createtime],(err, results) => {
            if(err){
                rej(err)
            }else{
                rec()
            }
            connection.end()
        })
    })
}

async function deleteTurnData(username,id){
    return new Promise(async (rec,rej) => {
        const connection = mysql.createConnection({
            host:DB_HOST,
            user:DB_USER,
            password:DB_PASSWD,
            database :DB_NAME
        });
        connection.connect();
        const SQL = `update user_turn set state = 0 where username = ? and id = ? ;`
        connection.query(SQL,[username, id],(err, results) => {
            if(err){
                rej(err)
            }else{
                rec()
            }
            connection.end()
        })
    })
}

async function editTurnData(username, id, turnpath, turnuser, turnpass){
    return new Promise(async (rec,rej) => {
        const connection = mysql.createConnection({
            host:DB_HOST,
            user:DB_USER,
            password:DB_PASSWD,
            database :DB_NAME
        });
        connection.connect();
        const SQL = `update user_turn set turnpath = ?, turnuser = ?, turnpass = ? where username = ? and id = ? ;`
        connection.query(SQL,[turnpath, turnuser, turnpass, username, id],(err, results) => {
            if(err){
                console.log(err)
                rej(err)
            }else{
                rec()
            }
            connection.end()
        })
    })
}

async function getNasData(username){
    return new Promise((rec,rej) => {
        const connection = mysql.createConnection({
            host:DB_HOST,
            user:DB_USER,
            password:DB_PASSWD,
            database :DB_NAME
        });
        connection.connect();
        const SQL = `select * from user_nas where username = ? and state != 0 ;`
        connection.query(SQL,[username],(err, results) => {
            if(err){
                rej(err)
            }else{
                rec(results)
            }
            connection.end()
        })
    })
}

async function addNasData(username, NasID){
    return new Promise(async (rec,rej) => {
        const connection = mysql.createConnection({
            host:DB_HOST,
            user:DB_USER,
            password:DB_PASSWD,
            database :DB_NAME
        });
        connection.connect();
        const createtime = new Date().getTime()
        const SQL = `INSERT INTO user_nas (username, nasid, createtime, state) VALUES (?, ?, ?, 1);`
        connection.query(SQL,[username, NasID, createtime],(err, results) => {
            if(err){
                rej(err)
            }else{
                rec()
            }
            connection.end()
        })
    })
}


module.exports = {
    getProjectInfo,
    getProjectInfoForID,
    createProjectInfo,
    editProjectInfo,
    deleteProjectInfo,
    searchProjectInfo
}