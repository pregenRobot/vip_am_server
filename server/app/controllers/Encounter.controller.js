const Encounter = require("../models/Encounter.model.js");

exports.findTopTen = (request, response) => {
    Encounter.find({}).sort({_id: -1}).limit(10).then(encounters => {
        response.status(200).send(encounters);
    });
}

exports.create = (request, response) => {
    console.log(request.body);
    const {
        encounterNumber,
        speciesName,
        latitude,
        longitude,
        country,
        region,
        distanceFromSurveyVessel,
        description,
        encounterDateTime,
        flag,
    }
    = request.body;
    
    const user = request.user;

    const encounter = {
        encounterNumber: encounterNumber,
        speciesName: speciesName,
        latitude: latitude,
        longitude: longitude,
        country: country,
        region: region,
        distanceFromSurveyVessel: distanceFromSurveyVessel,
        description: description,
        addedByUserId: user.id,
        flag: flag,
        encounterDateTime: encounterDateTime,
        addedByUserId: user.id,
    }

    const validationResult = validateCreate(encounter);

    if(!validationResult.success) {
        response.status(400).send(validationResult);
    }
    
    console.log(encounter);

    Encounter.create(encounter).then(() => {
        response.status(200).send({message: "Successfully added encounter"});
    }).catch((err) => {
        response.status(500).send({message: "Error adding encounter", error: err});
    });
};

const validateCreate = (encounter) => {
    const errors = [];
    if (!encounter.encounterNumber) {
        errors.push("Encounter number is required");
    }
    if (!encounter.speciesName) {
        errors.push("Species name is required");
    }
    if (!encounter.addedByUserId) {
        errors.push("User id creating the encounter is required");
    }

    return {
        message: errors.length == 0 ? "Successfully added an encounter" : "Invalid create encounter request",
        errors: errors,
        success: errors.length == 0 ? true : false,
    }
}