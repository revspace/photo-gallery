'use strict';

const ValidationError = require("./error");

module.exports = function validateNumber(name) {
	if (!/^[0-9]+$/.test(name)) {
		throw new ValidationError("Invalid number");
	}
};
