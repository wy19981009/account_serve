// 分类模块
const express = require("express");
const expressJoi = require("@escook/express-joi");
const { classifypay_check } = require("../checking/classify");
const {
	getClassifyPayHandler,
	insertClassifyPayHandler,
	deleteClassifyPayHandler,
	getClassifyEarnHandler,
	insertClassifyEarnHandler,
	deleteClassifyEarnHandler,
} = require("../router_handler/classify");

const router = express.Router();

// 查询支出分类
router.get("/pay", getClassifyPayHandler);

// 增加支出分类
router.post(
	"/insertpay",
	expressJoi(classifypay_check),
	insertClassifyPayHandler,
);

// 删除支出分类
router.post(
	"/deletepay",
	expressJoi(classifypay_check),
	deleteClassifyPayHandler,
);

// 查询收入分类
router.get("/earn", getClassifyEarnHandler);

// 增加收入分类
router.post(
	"/insertearn",
	expressJoi(classifypay_check),
	insertClassifyEarnHandler,
);

// 删除收入分类
router.post(
	"/deleteearn",
	expressJoi(classifypay_check),
	deleteClassifyEarnHandler,
);

module.exports = router;
