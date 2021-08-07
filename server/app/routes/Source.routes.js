const express = require("express");
var sourceController = require("../controllers/Source.controller.js");
const router = express.Router();

router.get("/", sourceController.findTopTen);
router.post("/create", sourceController.create)

module.exports = router;