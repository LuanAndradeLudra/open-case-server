const express = require("express");
const router = new express.Router();
const controller = require("../controller/box");
const middlewareAdmin = require("../middlewares/admin");
const middlewareBoth = require("../middlewares/both");

router.get("/find/:id", middlewareBoth, controller.find);
router.get("/list", middlewareBoth, controller.list);
router.post("/create", middlewareAdmin, controller.create);
router.put("/update/:id", middlewareAdmin, controller.update);
router.delete("/delete/:id", middlewareAdmin, controller.delete);

module.exports = router;
