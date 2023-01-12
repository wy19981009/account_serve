// 导入express模块;
const express = require("express");
const cors = require("cors");
// 创建express的服务器实例;
const app = express();

app.use(cors());

const indexRouter = require("./router/index");
app.use("/index", indexRouter);

// 调用app.listen方法，在指定的80端口启动web服务器;
app.listen(8088, () => {
	console.log("Express server running at http://127.0.0.1:8088");
});
