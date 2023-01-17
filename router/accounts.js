const express = require("express");
const {
	getAllPayAccountsHandler,
	getAllEarnAccountsHandler,
	insertPayAccountsHandler,
	insertEarnAccountsHandler,
	deletePayAccountsHandler,
	deleteEarnAccountsHandler,
	updatePayAccountsHandler,
	updateEarnAccountsHandler,
} = require("../router_handler/accounts");
const expressJoi = require("@escook/express-joi");
const {
	pay_accounts_check,
	earn_accounts_check,
	delete_accounts_check,
} = require("../checking/accounts");

const router = express.Router();

// 获取所有支出的账单
router.get("/getallpayaccounts", getAllPayAccountsHandler);
// 获取所有收入的账单
router.get("/getallearnaccounts", getAllEarnAccountsHandler);
// 添加支出账单
router.post(
	"/insertpayaccounts",
	expressJoi(pay_accounts_check),
	insertPayAccountsHandler,
);
// 添加收入账单
router.post(
	"/insertearnaccounts",
	expressJoi(earn_accounts_check),
	insertEarnAccountsHandler,
);
// 删除支出账单
router.post(
	"/deletepayaccounts",
	expressJoi(delete_accounts_check),
	deletePayAccountsHandler,
);
// 删除收入账单
router.post(
	"/deleteearnaccounts",
	expressJoi(delete_accounts_check),
	deleteEarnAccountsHandler,
);
// 更新支出账单
router.post("/updatepayaccounts", updatePayAccountsHandler);
// 更新收入账单
router.post("/updateearnaccounts", updateEarnAccountsHandler);

module.exports = router;
