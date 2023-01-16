const joi = require("joi");

const name = joi.string().min(1).max(5).required();

exports.classifypay_check = {
	body: {
		name,
	},
};
