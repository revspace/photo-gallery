'use strict';

module.exports = function paginateDates(dates, paginationThreshold) {
	let seenPictures = 0;
	let pages = [];
	let currentSlice = 0;

	dates.forEach((date) => {
		if (seenPictures > paginationThreshold) {
			seenPictures = 0;
			currentSlice += 1;
		}

		if (pages[currentSlice] == null) {
			pages[currentSlice] = [];
		}

		pages[currentSlice].push(date);
		seenPictures += date.entries.length;
	});

	return pages;
};
