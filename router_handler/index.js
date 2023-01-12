// 首页处理函数
exports.indexHandler = (req, res) => {
	res.send({
		status: 200,
		message: "首页数据",
		data: "记账",
	});
};
