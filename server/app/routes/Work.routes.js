const express = require("express");
// const Work = require("../models/Work.js");
var workController = require("../controllers/Work.controller.js")

const router = express.Router();

router.get("/", workController.findTopTen);
router.post("/upload", workController.create);

module.exports = router;