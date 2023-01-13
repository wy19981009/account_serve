const express = require("express");
const { registeHandler, loginHandler } = require("../router_handler/user");

// 1. 导入验证表单数据的中间件
const expressJoi = require("@escook/express-joi");
// 2. 导入需要的验证规则对象
const { reg_login_check } = require("../checking/user");

const router = express.Router();

// expressJoi(reg_login_check)
router.post("/register", expressJoi(reg_login_check), registeHandler);

router.post("/login", expressJoi(reg_login_check), loginHandler);

module.exports = router;
