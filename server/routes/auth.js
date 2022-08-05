const express = require("express");
const router = new express.Router();
const controller = require("../controller/auth");
const middlewareUser = require("../middlewares/user");

router.get("/me", middlewareUser, controller.me);
router.get("/logout", middlewareUser, controller.logout);
router.post("/auth", controller.auth);
router.post("/create", controller.create);

module.exports = router;
