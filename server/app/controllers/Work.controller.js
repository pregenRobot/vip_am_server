const { application } = require("express");
const AnnotationWork = require("../models/AnnotationWork.model.js");
const multer = require("multer");
const Dummy = require("../models/Dummy.model.js");
const {MD5} = require("crypto-js");
const dateFormat = require("dateformat");
const fs = require("fs");


exports.dummy = (request, response) => {
    console.log(request.body);

    // response.send(Dummy.findAll({where : {id: {$gt: 0}}}));
    response.status(200).send({message: "Successfully authorized"})
};

exports.create = (request, response) => {
    // console.log(request.body)
    console.log(request.body);
    if (!request.body.type) {
        console.log("Empty request content");
        // console.log(request);
        response.status(400).send({
            message: "Empty request content",
        });
        return;
    }
    // console.log(request);

    const work = {
        id: null,
        type: request.body.type,
        worker: request.body.worker,
        description: request.body.worker,
        data: request.body.description,
        status: "PROCESSING",
    };

    AnnotationWork.create(work)
        .then((data) => {
            response.header("Access-Control-Allow-Origin", "*");
            response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
            response.send(data);
        })
        .catch((err) => {
            response.status(500).send({
                message: err.message ||
                    "Some error when creating a Work. Check with administrator",
            });
            console.log(err);
        });
};

exports.findTopTen = (request, response) => {
    AnnotationWork.findAll({
            limit: 10,
            order: [
                ["updatedAt", "DESC"]
            ],
        })
        .then((data) => {
            console.log(data);
            response.send(data);
        })
        .catch((err) => {
            console.log(err);
            response.status(500).send({
                message: err.message ||
                    "Something went wrong when fetching work. Check with administrator",
            });
        });
};

exports.upload = multer().single("file");


exports.uploadHandler = (request, response, next) => {
    const {
        file,
        user
    } = request;

    console.log(file);
    console.log(user);

    const fileName = `${MD5(user.email + user.name)}_${dateFormat(new Date(), "yyyymmdd_HHmmss")}.zip`

    console.log(fileName);
    
    fs.writeFile(`./app/uploads/${fileName}`, file.buffer, function(err){
        if(err) {
            console.log(err);
            response.status(500).send({
                message: "Something went wrong when writing file to server. Check with administrator",
            });
        } else {
            console.log(`File from ${user.email} successfully saved!`);
            response.status(200).send({
                message: "File successfully saved!"
            });
        }
    })

}

exports.findOne = (request, response) => {};

exports.update = (request, response) => {};

exports.deleteAll = (request, response) => {};