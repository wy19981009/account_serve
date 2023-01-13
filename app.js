// 导入express模块;
const express = require("express");
const cors = require("cors");
const joi = require("joi");
// 创建express的服务器实例;
const app = express();
// 导入配置文件
const config = require("./config");

// 解析 token 的中间件
const { expressjwt: jwt } = require("express-jwt");

// 跨域中间件
app.use(cors());

// 解析表单数据
app.use(express.urlencoded({ extended: false }));

// 响应数据的中间件
app.use(function (req, res, next) {
	// status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
	res.cc = function (err, status = 400) {
		res.send({
			// 状态
			status,
			// 状态描述，判断 err 是 错误对象 还是 字符串
			message: err instanceof Error ? err.message : err,
		});
	};
	next();
});

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(
	jwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({
		path: [/^\/api\//],
	}),
);

// 首页
const indexRouter = require("./router/index");
app.use("/index", indexRouter);

// 用户
const userRouter = require("./router/user");
app.use("/user", userRouter);

// 获取用户信息
const userInfoRouter = require("./router/userinfo");
app.use("/my", userInfoRouter);

// 定义错误级别的中间件
app.use((err, req, res, next) => {
	// 验证失败导致的错误
	if (err instanceof joi.ValidationError) {
		return res.cc(err);
	}
	if (err.name === "UnauthorizedError") {
		return res.cc("身份认证失败");
	}
	// 未知错误
	res.cc(err, 500);
});

// 调用app.listen方法，在指定的80端口启动web服务器;
app.listen(8088, () => {
	console.log("Express server running at http://127.0.0.1:8088");
});
