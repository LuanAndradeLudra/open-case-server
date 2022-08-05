const express = require("express");
const router = new express.Router();
const middlewareAdmin = require("../middlewares/admin");
const controller = require("../controller/user");

router.get("/find/:id", middlewareAdmin, controller.find);
router.get("/list", middlewareAdmin, controller.list);

module.exports = router
