const express = require("express");
const router = express.Router();

router.use("/extension", require("./extension"));
router.use("/client", require("./client"));
router.use("/ai", require("./ai"));

module.exports = router;
