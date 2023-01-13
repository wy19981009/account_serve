const db = require("../db");

// 获取用户基本信息
exports.getUserInfoHandler = (req, res) => {
	const sql = `select id, username, nickname, phone, avatar from ac_user where id = ?`;
	db.query(sql, req.auth.id, (err, results) => {
		if (err) return res.cc(err);
		if (results.length !== 1) return res.cc("获取用户信息失败！");
		res.send({
			status: 200,
			message: "获取用户基本信息成功！",
			data: results,
		});
	});
};

// 更新用户的基本信息
exports.updateUserInfoHandler = (req, res) => {
	const sql = `update ac_user set ? where id = ?`;
	db.query(sql, [req.body, req.body.id], (err, results) => {
		if (err) return res.cc(err);
		if (results.affectedRows !== 1) return res.cc("修改用户基本信息失败！");
		res.cc("修改用户基本信息成功！", 200);
	});
};

// 修改密码
exports.updatePasswordHandler = (req, res) => {
	const sql = `select * from ac_user where id = ?`;
	db.query(sql, req.auth.id, (err, results) => {
		if (err) return res.cc(err);
		if (results.length !== 1) return res.cc("用户不存在！");
		if (req.body.oldPwd !== results[0].password) return res.cc("原密码错误！");
		const sql = `update ac_user set password = ? where id = ?`;
		db.query(sql, [req.body.newPwd, req.auth.id], (err, results) => {
			if (err) return res.cc(err);
			if (results.affectedRows !== 1) return res.cc("更新密码失败！");
			res.cc("更新密码成功！", 200);
		});
	});
};

exports.updateAvatarHandler = (req, res) => {
	const sql = `update ac_user set avatar = ? where id = ?`;
	const filename = "/img/avatar/" + req.file.filename;
	db.query(sql, [filename, req.auth.id], (err, results) => {
		if (err) return res.cc(err);
		if (results.affectedRows !== 1) return res.cc("修改头像失败！");
		res.cc("修改头像成功！", 200);
	});
};
