const express = require("express");
const router = express.Router();

const contestTypeController = require("../../controllers/contestType");

router.post("/", contestTypeController.create);

module.exports = router;
