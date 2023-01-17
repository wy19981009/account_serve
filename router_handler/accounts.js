const db = require("../db");
const moment = require("moment");

// 获取所有支出账单
exports.getAllPayAccountsHandler = (req, res) => {
	const sql = `select * from ac_pay_accounts where user_id_pay_accounts = ?`;
	db.query(sql, req.auth.id, (err, results) => {
		console.log(results);
		if (err) return res.cc(err);
		if (results.length === 0) return res.cc("暂未查询到数据，请稍后再试！");
		res.send({
			status: 200,
			message: "数据查询成功!",
			data: results,
		});
	});
};
// 获取所有收入账单
exports.getAllEarnAccountsHandler = (req, res) => {
	const sql = `select * from ac_earn_accounts where user_id_earn_accounts = ?`;
	db.query(sql, req.auth.id, (err, results) => {
		console.log(results);
		if (err) return res.cc(err);
		if (results.length === 0) return res.cc("暂未查询到数据，请稍后再试！");
		res.send({
			status: 200,
			message: "数据查询成功!",
			data: results,
		});
	});
};
// 新增支出账单
exports.insertPayAccountsHandler = (req, res) => {
	const sql = `insert into ac_pay_accounts (name, money, pay_date, ac_pay_name, user_id_pay_accounts) values (?,?,?,?,?)`;
	const pay_date = moment().format("YYYY-MM-DD HH:mm:ss");
	const { name, money, ac_pay_name } = req.body;
	db.query(
		sql,
		[name, money, pay_date, ac_pay_name, req.auth.id],
		(err, results) => {
			if (err) return res.cc(err);
			if (results.affectedRows !== 1) return res.cc("新增账单失败！");
			res.cc("新增成功！", 200);
		},
	);
};
// 新增收入账单
exports.insertEarnAccountsHandler = (req, res) => {
	const sql = `insert into ac_earn_accounts (name, money, earn_date, ac_earn_name, user_id_earn_accounts) values (?,?,?,?,?)`;
	const earn_date = moment().format("YYYY-MM-DD HH:mm:ss");
	const { name, money, ac_earn_name } = req.body;
	db.query(
		sql,
		[name, money, earn_date, ac_earn_name, req.auth.id],
		(err, results) => {
			if (err) return res.cc(err);
			if (results.affectedRows !== 1) return res.cc("新增账单失败！");
			res.cc("新增成功！", 200);
		},
	);
};
// 删除支出账单
exports.deletePayAccountsHandler = (req, res) => {
	const sql = `delete from ac_pay_accounts where id = ? and user_id_pay_accounts = ?`;
	db.query(sql, [req.body.id, req.auth.id], (err, results) => {
		if (err) return res.cc(err);
		if (results.affectedRows !== 1) return res.cc("账单删除失败！");
		res.cc("账单删除成功！", 200);
	});
};
// 删除收入账单
exports.deleteEarnAccountsHandler = (req, res) => {
	const sql = `delete from ac_earn_accounts where id = ? and user_id_earn_accounts = ?`;
	db.query(sql, [req.body.id, req.auth.id], (err, results) => {
		if (err) return res.cc(err);
		if (results.affectedRows !== 1) return res.cc("账单删除失败！");
		res.cc("账单删除成功！", 200);
	});
};
// 更新支出账单
exports.updatePayAccountsHandler = (req, res) => {
	const sql = `update ac_pay_accounts set ? where (id = ? and user_id_pay_accounts = ?)`;
	const pay_date = { pay_date: moment().format("YYYY-MM-DD HH:mm:ss") };
	const data = { ...req.body, ...pay_date };
	db.query(sql, [data, req.body.id, req.auth.id], (err, results) => {
		if (err) return res.cc(err);
		if (results.affectedRows !== 1) return res.cc("更新账单失败！");
		res.cc("更新账单成功！", 200);
	});
};
// 更新收入账单
exports.updateEarnAccountsHandler = (req, res) => {
	const sql = `update ac_earn_accounts set ? where id = ? and user_id_earn_accounts = ?`;
	const earn_date = { earn_date: moment().format("YYYY-MM-DD HH:mm:ss") };
	const data = { ...req.body, ...earn_date };
	db.query(sql, [data, req.body.id, req.auth.id], (err, results) => {
		if (err) return res.cc(err);
		if (results.affectedRows !== 1) return res.cc("更新账单失败！");
		res.cc("更新账单成功！", 200);
	});
};
