const db = require("../db");

// 查询支出分类数据
exports.getClassifyPayHandler = (req, res) => {
	const sql = `select * from ac_pay where user_id_pay = 13 or user_id_pay = ?`;
	const { id } = req.auth;
	db.query(sql, id, (err, results) => {
		if (err) return res.cc(err);
		if (results.length === 0) return res.cc("数据查询失败！");
		res.send({
			status: 200,
			message: "查询成功！",
			data: results,
		});
	});
};

// 增加支出分类
exports.insertClassifyPayHandler = (req, res) => {
	const { id } = req.auth;
	const { name } = req.body;
	const sql = `select * from ac_pay where name = ? and (id = ? or user_id_pay = 13)`;
	db.query(sql, [name, id], (err, results) => {
		if (err) return res.cc(err);
		if (results.length > 0) return res.cc("支出分类名称已被占用，请更换后重试");

		const sql = `insert into ac_pay (name, user_id_pay) values (?, ?)`;
		db.query(sql, [name, id], (err, results) => {
			if (err) return res.cc(err);
			if (results.affectedRows !== 1) return rs.cc("数据插入失败！");
			res.cc("数据新增成功！", 200);
		});
	});
};

// 删除支出分类
exports.deleteClassifyPayHandler = (req, res) => {
	const sql = `delete from ac_pay where user_id_pay = ? and name = ?`;
	db.query(sql, [req.auth.id, req.body.name], (err, results) => {
		if (err) return res.cc(err);
		if (results.affectedRows !== 1) return res.cc("删除失败！");
		res.cc("删除成功！", 200);
	});
};

// 查询收入分类数据
exports.getClassifyEarnHandler = (req, res) => {
	const sql = `select * from ac_earning where user_id_earn = 13 or user_id_earn = ?`;
	const { id } = req.auth;
	db.query(sql, id, (err, results) => {
		if (err) return res.cc(err);
		if (results.length === 0) return res.cc("数据查询失败！");
		res.send({
			status: 200,
			message: "查询成功！",
			data: results,
		});
	});
};

// 增加收入分类
exports.insertClassifyEarnHandler = (req, res) => {
	const { id } = req.auth;
	const { name } = req.body;
	const sql = `select * from ac_earning where name = ? and (id = ? or user_id_earn = 13)`;
	db.query(sql, [name, id], (err, results) => {
		if (err) return res.cc(err);
		if (results.length > 0) return res.cc("收入分类名称已被占用，请更换后重试");

		const sql = `insert into ac_earning (name, user_id_earn) values (?, ?)`;
		db.query(sql, [name, id], (err, results) => {
			if (err) return res.cc(err);
			if (results.affectedRows !== 1) return rs.cc("数据插入失败！");
			res.cc("数据新增成功！", 200);
		});
	});
};

// 删除收入分类
exports.deleteClassifyEarnHandler = (req, res) => {
	const sql = `delete from ac_earning where user_id_earn = ? and name = ?`;
	db.query(sql, [req.auth.id, req.body.name], (err, results) => {
		if (err) return res.cc(err);
		if (results.affectedRows !== 1) return res.cc("删除失败！");
		res.cc("删除成功！", 200);
	});
};
