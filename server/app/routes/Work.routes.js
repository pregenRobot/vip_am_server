const express = require("express");
var workController = require("../controllers/Work.controller.js");

const router = express.Router();

router.get("/", workController.findTopTen);
router.post("/commit", workController.create);

router.get("/view", workController.findOne);

router.post("/upload", workController.upload, workController.uploadHandler);

router.get("/dummy", workController.dummy);


module.exports = router;