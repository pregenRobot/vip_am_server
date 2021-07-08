const express = require("express");
const multer = require("multer");
// const Work = require("../models/Work.js");
var workController = require("../controllers/Work.controller.js");

const fs = require("fs");

const router = express.Router();

router.get("/", workController.findTopTen);
router.post("/commit", workController.create);

// router.post("/upload", workController.upload.single("file"), workController.uploadHandler)
router.get("/view", workController.findOne);

router.post("/upload", workController.upload, workController.uploadHandler);

// upload = multer();

// router.post("/test", upload.single("file"), (request, response, next) => {
//     const {
//         file,
//         body: { name, email }
//     } = request;

//     const fileName = email + "_" + Date.now() + "_" + Math.floor(Math.random() * 1000) + file.originalname;
//     // fs.writeFile("../uploads/" + fileName, file.buffer);
//     // console.log(file.buffer);
//     fs.writeFile("./app/uploads/" + fileName, file.buffer, function(err) {
//         if (err) {
//             return console.log(err);
//         }
//         console.log("The file was saved!");
//         response.status(200).send({
//             message: "The file was saved!"
//         })
//     });

// })

module.exports = router;