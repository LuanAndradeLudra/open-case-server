const express = require("express");
const router = new express.Router();
const middlewareAdmin = require("../middlewares/admin");
const middlewareUser = require("../middlewares/user");
const controller = require("../controller/user");

router.get("/find/:id", middlewareAdmin, controller.find);
router.get("/list", middlewareAdmin, controller.list);
router.get("/inventory",middlewareUser, controller.inventory )

module.exports = router
