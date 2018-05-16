'use strict';

const ValidationError = require("./error");

module.exports = function validatePhotoFilename(name) {
	if (!/^[0-9A-Za-z_.-]+$/.test(name)) {
		throw new ValidationError("Invalid photo filename");
	}
};
