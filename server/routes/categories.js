const express = require("express");
const router = new express.Router();
const controller = require("../controller/categories");
const middlewareBoth = require("../middlewares/both");
const middlewareAdmin = require("../middlewares/admin");

router.get("/find/:id", middlewareBoth, controller.find);
router.get("/list", middlewareBoth, controller.list);
router.get("/listbox", middlewareBoth, controller.listbox);
router.post("/create", middlewareAdmin, controller.create);
router.delete("/delete/:id", middlewareAdmin, controller.delete);

module.exports = router;
