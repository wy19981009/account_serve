const joi = require("joi");

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

const username = joi.string().alphanum().min(4).max(10).required();
const password = joi
	.string()
	.pattern(/^[\S]{6,18}$/)
	.required();

const id = joi.number().integer().min(1).required();
const nickname = joi.string().min(1).max(11).required();
const phone = joi.number().min(10).required();
const signature = joi.string().min(1).max(15).required();

// 导出注册和登录表单的验证规则对象
exports.reg_login_check = {
	body: {
		username,
		password,
	},
};

exports.update_userinfo_check = {
	body: {
		id,
		nickname,
		phone,
		signature,
	},
};

exports.update_password_check = {
	body: {
		oldPwd: password,
		// 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
		// 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
		// 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
		newPwd: joi.not(joi.ref("oldPwd")).concat(password),
	},
};

exports.update_signature_check = {
	body: { signature },
};
