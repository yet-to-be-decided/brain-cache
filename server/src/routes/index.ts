const mainRouter = require("express").Router();

mainRouter.use("/extension", require("./extension"));

module.exports = mainRouter;
