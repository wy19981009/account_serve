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
