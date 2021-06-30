const Work = require("../models/Work.js")
    // const db = require("../config/db.config.js");

exports.create = (request, response) => {
    if (!request.body.title) {
        console.log("Empty request content");
        console.log(request);
        response.status(400).send({
            message: "Empty request content"
        })
        return;
    }

    const work = {
        type: request.body.type,
        worker: request.body.worker,
        description: request.body.worker,
        data: request.body.description
    }

    Work.create(work)
        .then(data => {
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

exports.findOne = (request, response) => {

}

exports.update = (request, response) => {

}

exports.deleteAll = (request, response) => {

}