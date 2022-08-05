const express = require("express");
const router = new express.Router();
const controller = require("../controller/authAdmin");
const middlewareAdmin = require("../middlewares/admin");

router.get("/me", middlewareAdmin, controller.me);
router.post("/create", middlewareAdmin, controller.create);
router.post("/auth", controller.auth);

module.exports = router;