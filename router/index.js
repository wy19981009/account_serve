const express = require("express");
const { indexHandler } = require("../router_handler/index");

const router = express.Router();

router.get("/", indexHandler);

module.exports = router;
