const express = require("express");
const router = new express.Router();
const controller = require("../controller/auth");
const middlewareAdmin = require("../middlewares/admin");
const middlewareUser = require("../middlewares/user");

router.get("/me", middlewareUser, controller.me);
router.get("/logout", middlewareUser, controller.logout);
router.get("/find/:id", middlewareAdmin, controller.find);
router.get("/list", middlewareAdmin, controller.list);
router.post("/auth", controller.auth);
router.post("/create", middlewareUser, controller.create);
router.post("/createAdmin", middlewareAdmin, controller.createAdmin);

module.exports = router;
