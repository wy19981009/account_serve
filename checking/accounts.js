const joi = require("joi");

const id = joi.number().min(1).required();
const name = joi.string().min(1).max(5).required();
const money = joi.number().required();
const ac_pay_name = joi.string().required();
const ac_earn_name = joi.string().required();

exports.pay_accounts_check = {
	body: {
		name,
		money,
		ac_pay_name,
	},
};

exports.earn_accounts_check = {
	body: {
		name,
		money,
		ac_earn_name,
	},
};

exports.delete_accounts_check = {
	body: {
		id,
	},
};
