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
		fileName: fileName,
		filePath: filePath,
		fileSize: fileSize,
		fileHash: fileHash,	
		fileDuration: fileDuration,
		dataStorageLocation: dataStorageLocation,
		channelCount: channelCount,
		samplingRate: samplingRate,
		description: description,
	} = request.body;

	const source = new Source({
		fileName,
		filePath,
		fileSize,
		fileHash,
		fileDuration,
		dataStorageLocation,
		channelCount,
		samplingRate,
		description,
	});

	const validationResult = validateCreate(source);
}


const validateCreate = (source) => {
	const errors = [];

	if (!source.fileName) {
		errors.push("Missing file name");
	}
	if (!source.filePath) {
		errors.push("Missing file path");
	}
	if (!source.fileSize) {
		errors.push("Missing file size");
	}
	if (!source.fileHash) {
		errors.push("Missing file hash");
	}
	if (!source.fileDuration) {
		errors.push("Missing file duration");
	}
	if (!source.dataStorageLocation) {
		errors.push("Missing data storage location");
	}
	if (!source.channelCount) {
		errors.push("Missing channel count");
	}
	if (!source.samplingRate) {
		errors.push("Missing sampling rate");
	}
	if (!source.description) {
		errors.push("Missing description");
	}
	
	return {
		message: errors.length == 0 ? "Successfully added a source" : "Invalid create source request",
		errors: errors,
		success: errors.length == 0 ? true : false,
	}
}