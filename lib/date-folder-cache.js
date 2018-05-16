'use strict';

const Promise = require("bluebird");
const moment = require("moment");
const fs = Promise.promisifyAll(require("fs"));
const path = require("path");

module.exports = function createDateFolderCache(sourceFolder) {
	let cache = new Map();

	function checkCache(stringifiedDate) {
		let parsedDate = moment(stringifiedDate, "YYYYMMDD");

		if (parsedDate.isSame(moment(), "day")) {
			/* We never return cached data for the current day, since the list of photos for that day may change. */
			return false;
		} else if (cache.has(stringifiedDate)) {
			return true;
		} else {
			return false;
		}
	}

	return function getDate(stringifiedDate) {
		return Promise.try(() => {
			if (checkCache(stringifiedDate)) {
				return cache.get(stringifiedDate);
			} else {
				return Promise.try(() => {
					return fs.readdirAsync(path.join(sourceFolder, stringifiedDate));
				}).then((entries) => {
					cache.set(stringifiedDate, entries);
					return entries;
				});
			}
		})
	}
};
