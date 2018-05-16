'use strict';

const Promise = require("bluebird");
const gm = require("gm");
const fs = Promise.promisifyAll(require("fs"));
const path = require("path");

function createReadStream(filePath) {
	return new Promise((resolve, reject) => {
		let readStream = fs.createReadStream(filePath);

		function openHandler() {
			detachHandlers();
			resolve(readStream);
		}

		function errorHandler(err) {
			detachHandlers();
			reject(err);
		}

		function detachHandlers() {
			readStream.removeListener("open", openHandler);
			readStream.removeListener("error", errorHandler);
		}

		readStream.on("open", openHandler);
		readStream.on("error", errorHandler);
	});
}

module.exports = function createThumbnailer(thumbnailFolder, pictureFolder, {width, height, quality}) {
	return function getThumbnail(date, filename) {
		let thumbnailPath = path.join(thumbnailFolder, date, filename);

		return Promise.try(() => {
			return createReadStream(thumbnailPath);
		}).catch({code: "ENOENT"}, (err) => {
			/* Thumbnail does not exist yet, we need to create one. */

			return Promise.try(() => {
				return Promise.try(() => {
					return fs.mkdirAsync(path.join(thumbnailFolder, date));
				}).catch({code: "EEXIST"}, (err) => {
					/* Ignore this type of error, it just means that the destination folder already exists. */
				});
			}).then(() => {
				let resizer = gm(path.join(pictureFolder, date, filename)).resize(width, height).quality(quality);
				Promise.promisifyAll(resizer); // HACK
				return resizer.writeAsync(thumbnailPath);
			}).then(() => {
				return createReadStream(thumbnailPath);
			});
		});
	}
};
