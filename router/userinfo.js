const express = require("express");
const { getUserInfoHandler } = require("../router_handler/userinfo");

const router = express.Router();

router.get("/userinfo", getUserInfoHandler);

module.exports = router;
