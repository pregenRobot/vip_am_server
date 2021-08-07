const express = require("express");
var encounterController = require("../controllers/Encounter.controller.js");
const router = express.Router();

router.get("/", encounterController.findTopTen);
router.post("/create",encounterController.create)

module.exports = router;