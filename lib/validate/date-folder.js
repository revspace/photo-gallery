'use strict';

const ValidationError = require("./error");

module.exports = function validateDateFolderName(name) {
	if (!/^[0-9]{8}$/.test(name)) {
		throw new ValidationError("Invalid folder name");
	}
};
