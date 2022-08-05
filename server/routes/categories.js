const express = require("express");
const router = new express.Router();
const controller = require("../controller/categories");
const middlewareUser = require("../middlewares/user");
const middlewareAdmin = require("../middlewares/admin");

router.get("/find/:id", middlewareUser, controller.find);
router.get("/list", middlewareUser, controller.list);
router.get("/listbox", middlewareUser, controller.listbox);
router.post("/create", middlewareAdmin, controller.create);
router.delete("/delete/:id", middlewareAdmin, controller.delete);

module.exports = router;
