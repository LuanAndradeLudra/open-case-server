const express = require("express");
const router = new express.Router();
const controller = require("../controller/weapon");
const middlewareAdmin = require("../middlewares/admin");
const middlewareUser = require("../middlewares/user");

router.get("/find/:id", middlewareUser, controller.find);
router.get("/list", middlewareUser, controller.list);
router.post("/create", middlewareAdmin, controller.create);
router.put("/update/:id", middlewareAdmin, controller.update);
router.delete("/delete/:id", middlewareAdmin, controller.delete);

module.exports = router;
