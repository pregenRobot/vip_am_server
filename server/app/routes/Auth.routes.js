const express = require("express");
const multer = require("multer");
var authController = require("../controllers/Auth.controllers");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/token", authController.createToken);

module.exports = router;
