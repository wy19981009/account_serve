const express = require("express");
const {
	getUserInfoHandler,
	updateUserInfoHandler,
	updatePasswordHandler,
	updateAvatarHandler,
} = require("../router_handler/userinfo");
const {
	update_userinfo_check,
	update_password_check,
} = require("../checking/user");
const expressJoi = require("@escook/express-joi");
const multer = require("multer");
const path = require("path");
const stringRandom = require("string-random");

const router = express.Router();

// 获取用户信息
router.get("/userinfo", getUserInfoHandler);

// 更新用户信息
router.post(
	"/updateuserinfo",
	expressJoi(update_userinfo_check),
	updateUserInfoHandler,
);

// 重置密码
router.post(
	"/updatepwd",
	expressJoi(update_password_check),
	updatePasswordHandler,
);

// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const avatar = multer({
	// dest: path.join(__dirname, "../public/img/avatar/"),
	limits: 50000,
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, path.join(__dirname, "../public/img/avatar/"));
		},
		filename: (req, file, cb) => {
			cb(null, stringRandom(32) + ".png");
		},
	}),
});
// 修改头像
router.post("/update/avatar", avatar.single("avatar"), updateAvatarHandler);

module.exports = router;
