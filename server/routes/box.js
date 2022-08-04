const express = require("express");
const router = new express.Router();
const controller = require("../controller/box")

router.get("/find/:id", controller.find)
router.get("/list", controller.list)
router.post("/create", controller.create)
router.put("/update/:id", controller.update)
router.delete("/delete/:id", controller.delete)

module.exports = router