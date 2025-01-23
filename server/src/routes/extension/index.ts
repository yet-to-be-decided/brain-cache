const express = require("express");
const router = express.Router();
const extensionController = require("../../controllers/extension");

router.post("/storedata", extensionController.storeData);

module.exports = router;
