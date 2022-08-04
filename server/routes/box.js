const express = require("express");
const router = new express.Router();
const controller = require("../controller/box")

router.get("/list", controller.list)
router.get("/find/:id", controller.find)
router.post("/create", controller.create)

module.exports = router