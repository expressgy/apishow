const mysql = require('mysql');
const { DBCONFIG } = require('../togy.gc.config')

const DB_HOST = DBCONFIG.DB_HOST
    , DB_USER = DBCONFIG.DB_USER
    , DB_PASSWD = DBCONFIG.DB_PASSWD
    , DB_NAME = DBCONFIG.DB_NAME


const colorConsole = {
    succeed : '\x1B[32m',
    end : '\x1B[0m',
    warning :'\x1B[41m',
    white :'\x1B[37m',
    blue : '\x1B[34m', // 蓝色
    'bright'    : '\x1B[1m', // 亮色
    'grey'      : '\x1B[2m', // 灰色
    'italic'    : '\x1B[3m', // 斜体
    'underline' : '\x1B[4m', // 下划线
    'reverse'   : '\x1B[7m', // 反向
    'hidden'    : '\x1B[8m', // 隐藏
    'black'     : '\x1B[30m', // 黑色
    'red'       : '\x1B[31m', // 红色
    'green'     : '\x1B[32m', // 绿色
    'yellow'    : '\x1B[33m', // 黄色
    'blue'      : '\x1B[34m', // 蓝色
    'magenta'   : '\x1B[35m', // 品红
    'cyan'      : '\x1B[36m', // 青色
    'white'     : '\x1B[37m', // 白色
    'blackBG'   : '\x1B[40m', // 背景色为黑色
    'redBG'     : '\x1B[41m', // 背景色为红色
    'greenBG'   : '\x1B[42m', // 背景色为绿色
    'yellowBG'  : '\x1B[43m', // 背景色为黄色
    'blueBG'    : '\x1B[44m', // 背景色为蓝色
    'magentaBG' : '\x1B[45m', // 背景色为品红
    'cyanBG'    : '\x1B[46m', // 背景色为青色
    'whiteBG'   : '\x1B[47m' // 背景色为白色
}
const c = {
    bright    : '\x1B[1m', // 亮色
    grey      : '\x1B[2m', // 灰色
    italic    : '\x1B[3m', // 斜体
    underline : '\x1B[4m', // 下划线
    reverse   : '\x1B[7m', // 反向
    hidden    : '\x1B[8m', // 隐藏
    black     : '\x1B[30m', // 黑色
    red       : '\x1B[31m', // 红色
    green     : '\x1B[32m', // 绿色
    yellow    : '\x1B[33m', // 黄色
    blue      : '\x1B[34m', // 蓝色
    magenta   : '\x1B[35m', // 品红
    cyan      : '\x1B[36m', // 青色
    white     : '\x1B[37m', // 白色
    blackBG   : '\x1B[40m', // 背景色为黑色
    redBG     : '\x1B[41m', // 背景色为红色
    greenBG   : '\x1B[42m', // 背景色为绿色
    yellowBG  : '\x1B[43m', // 背景色为黄色
    blueBG    : '\x1B[44m', // 背景色为蓝色
    magentaBG : '\x1B[45m', // 背景色为品红
    cyanBG    : '\x1B[46m', // 背景色为青色
    whiteBG   : '\x1B[47m' // 背景色为白色
}

class initDB{
    #DB_HOST = DB_HOST
    #DB_USER = DB_USER
    #DB_PASSWD = DB_PASSWD
    #DB_NAME = DB_NAME
    constructor() {
        return (async () => {
            return new Promise(async (rec,rej) => {
                //  设置数据库参数
                const db = mysql.createConnection({
                    host:this.#DB_HOST,
                    user:this.#DB_USER,
                    password:this.#DB_PASSWD,
                });
                //  尝试连接数据库
                db.connect(err => {
                    if(err) throw {code:err.code,errno:err.errno,sqlMessage:err.sqlMessage};
                    console.log('mysql connected ......')
                })
                //  创建数据库语句
                const sql = `Create Database If Not Exists ${ DB_NAME } Character Set UTF8;`
                //  执行语句
                db.query(sql,async (err,result) => {
                    if(err) throw {code:err.code,errno:err.errno,sqlMessage:err.sqlMessage}
                    db.destroy()
                    this.connection = await this.#createConnection()
                    rec(this)
                })

            })
        })()
    }
    end(callback){
        this.connection.end(data => {
            console.log(colorConsole.whiteBG+colorConsole.red+`[SUCCESS] : INIT DATABASE SUCCEED!`+colorConsole.end)
        })
    }
    async #createConnection(){
        return new Promise((rec,rej) => {
            const connection = mysql.createConnection({
                host:this.#DB_HOST,
                user:this.#DB_USER,
                password:this.#DB_PASSWD,
                database :this.#DB_NAME
            });

            rec(connection)
        })
    }
    initTable(){
        console.log(colorConsole.red+'[WARNING] : Data table initialization is about to begin!'+colorConsole.end)
    }
    //  初始化项目信息表
    createProjectTable(){
        const createUserInfoSQL = 'Create Table If Not Exists Atom_Project(' +
            'id INT AUTO_INCREMENT PRIMARY KEY,' +
            'pName varchar(128),' +
            'pCreator varchar(32),' +
            'pPeople varchar(256),' +
            'createtime bigint(13))'
        this.connection.query(createUserInfoSQL,(err,data) => {
            if(err) throw {TB:'Atom_Project',code:err.code,errno:err.errno,sqlMessage:err.sqlMessage}
            console.log(colorConsole.succeed+'[INIT TABLE] : Atom_Project INIT SUCCEED'+colorConsole.end)
        })
    }
}

module.exports = initDB