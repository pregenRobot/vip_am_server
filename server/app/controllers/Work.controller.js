const { application } = require("express");
const Work = require("../models/Work.js")
const multer = require("multer")

exports.create = (request, response) => {
    // console.log(request.body)
    console.log(request.body)
    if (!request.body.type) {
        console.log("Empty request content");
        // console.log(request);
        response.status(400).send({
            message: "Empty request content"
        })
        return;
    }
    // console.log(request);

    const work = {
        id: null,
        type: request.body.type,
        worker: request.body.worker,
        description: request.body.worker,
        data: request.body.description,
        status: "PROCESSING"
    }

    Work.create(work)
        .then(data => {
            response.header('Access-Control-Allow-Origin', '*');
            response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
            response.send(data);
        })
        .catch(err => {
            response.status(500).send({
                message: err.message || "Some error when creating a Work. Check with administrator"
            })
            console.log(err)
        })
}

exports.findTopTen = (request, response) => {
    Work.findAll({
        limit: 10,
        order: [
            ["updatedAt", "DESC"]
        ]
    }).then(data => {
        console.log(data);
        response.send(data);
    }).catch(err => {
        console.log(err);
        response.status(500).send({
            message: err.message || "Something went wrong when fetching work. Check with administrator"
        })
    })
}

const fileStorageEngine = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, "./uploads/")
    },
    filename: (request, file, callback) => {
        const uniqueSuffix = '_' + Date.now() + '_' + Math.round(Math.random() * 1E9);
        callback(null, file.originalname + uniqueSuffix);
    }
})

exports.upload = multer({ storage: fileStorageEngine })

exports.uploadHandler = (request, response) => {
    console.log(request)
    console.log(file);
    response.send("Single file upload success")
}

exports.findOne = (request, response) => {

}

exports.update = (request, response) => {

}

exports.deleteAll = (request, response) => {

}