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
		fileType,
		fileHash,
		fileDuration,
		dataStorageLocation,
		channelCount,
		samplingRate,
		description,
		
	} = request.body;
}