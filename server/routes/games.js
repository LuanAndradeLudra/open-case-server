const express = require("express");
const router = new express.Router();
const spinController = require("../controller/spin");
const middlewareUser = require("../middlewares/user");

router.get("/spin/roulete/:id", middlewareUser, spinController.roulete);
router.get("/selldrop/:id", middlewareUser, spinController.selldrop);

module.exports = router;
