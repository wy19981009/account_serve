// 导入 mysql 模块
const mysql = require("mysql");

// 创建数据库连接对象
const db = mysql.createPool({
	host: "rm-7xv7f9cspbdz852krao.mysql.rds.aliyuncs.com",
	user: "keep_accounts",
	password: "KEEP_accounts",
	database: "keep_accounts",
});

// 向外共享 db 数据库连接对象
module.exports = db;
