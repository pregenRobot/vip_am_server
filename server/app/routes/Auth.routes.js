const express = require("express");
const multer = require("multer");
var authController = require("../controllers/Auth.controllers");

const router = express.Router();

router.post("/register", authController.register);

module.exports = router;