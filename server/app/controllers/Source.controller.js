const Source = require("../models/Source.model");

exports.findTopTen = (req, res) => {
	Source.find({}, (err, sources) => {
		if (err) {
			res.status(400).send(err);
		} else {
			res.json(sources);
		}
	});
}

exports.create = (request, response) => {

	const {
		fileName,
		filePath,
		fileSize,
		fileHash,
		fileDuration,
		dataStorageLocation,
		channelCount,
		samplingRate,
		description,
		fromEncounterId,
	} = request.body;
	
	const user = request.user;

	const source = {
		fileName: fileName,
		filePath: filePath,
		fileSize: fileSize,
		fileHash: fileHash,	
		fileDuration: fileDuration,
		dataStorageLocation: dataStorageLocation,
		channelCount: channelCount,
		samplingRate: samplingRate,
		description: description,
		fromEncounterId: fromEncounterId,
		addedByUserId: user.id,
	}

	const validationResult = validateCreate(source);

	if (!validationResult.success) {
		response.status(400).send(validationResult);
	}

	console.log(source);

	Source.create(source).then(source => {
		response.status(200).send({message: "Successfully added a new source"});
	}).catch(err => {
		response.status(400).send(err);
	});

}


const validateCreate = (source) => {
	const errors = [];

	if (!source.fileName) {
		errors.push("Missing file name");
	}

	if (!source.filePath) {
		errors.push("Missing file path");
	}

	if (!source.fileHash) {
		errors.push("Missing file hash");
	}

	if (!source.dataStorageLocation) {
		errors.push("Missing data storage location");
	}

	if (!source.fromEncounterId) {
		errors.push("Missing from encounter id");
	}

	if (!source.addedByUserId){
		errors.push("Missing added by user id");
	}
	
	return {
		message: errors.length == 0 ? "Successfully added a source" : "Invalid create source request",
		errors: errors,
		success: errors.length == 0 ? true : false,
	}
}