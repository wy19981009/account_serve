const db = require("../db");
const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../config");
exports.registeHandler = (req, res) => {
	const userinfo = req.body;
	const sql = `select * from ac_user where username = ?`;
	db.query(sql, userinfo.username, (err, results) => {
		if (err) return res.cc(err);
		if (results.length > 0) {
			return res.cc("用户名被占用，请更换其他用户名");
		}
		const sql = `insert into ac_user set ?`;
		db.query(sql, userinfo, (err, results) => {
			if (err) return res.cc(err);
			if (results.affectedRows !== 1) return res.cc("注册用户失败，请稍后再试");
			res.cc("注册成功！", 200);
		});
	});
};

exports.loginHandler = (req, res) => {
	const userinfo = req.body;
	const sql = `select * from ac_user where username = ?`;
	db.query(sql, userinfo.username, (err, results) => {
		if (err) return res.cc(err);
		if (results.length !== 1) return res.cc("登陆失败！");
		if (results[0].password !== userinfo.password) return res.cc("密码错误！");
		const user = { ...results[0], password: "", avatar: "" };
		// 生成token
		const tokenStr = jwt.sign(user, jwtSecretKey, { expiresIn: "10h" });
		res.send({
			status: 200,
			message: "登录成功!",
			data: "Bearer " + tokenStr,
		});
	});
};
