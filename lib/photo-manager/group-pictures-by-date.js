'use strict';

const groupBy = require("group-by");
const moment = require("moment");

module.exports = function groupPictures(pictures) {
	let groupedPictures = groupBy(pictures, "dateString");

	return Object.keys(groupedPictures).sort().reverse().map((date) => {
		return {
			date: date,
			momentDate: moment(date, "YYYYMMDD"),
			entries: groupedPictures[date]
		}
	});
};
