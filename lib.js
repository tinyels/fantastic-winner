'use strict';
var moment = require('moment');

//this is adapted from polyfill for es2017 padStart found at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
function padStart(str, targetLength, padString) {
	targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
	padString = padString || ' ';
	if (str.length > targetLength) {
		return str;
	}
	else {
		targetLength = targetLength - str.length;
		if (targetLength > padString.length) {
			padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
		}
		return padString.slice(0, targetLength) + str;
	}
}

function formatZip(zipcode) {
	return padStart(zipcode, 5, '0');
}
function formatTimestamp(timestamp){
	return moment(timestamp).format();
}
function toFloatingPointSecondsFormat(timestamp /*HH:MM:SS.MS*/) {
	const parts = timestamp.split(/[:.]/);  //HACK: a regex would provide better validation of the input
	return parts[3] / 1000 + parts[2] / 1 + parts[1] * 60 + parts[0] * 3600;
}

function normalize(record) {
	var normalized = record.map(function (value, index) {
		switch (index) {
		case 0:
			return formatTimestamp(value);
		case 2:
			return formatZip(value);
		case 3:
			return value.toUpperCase();
		case 4:
		case 5:
			return toFloatingPointSecondsFormat(value);
		default:
			return value;
		}
	});
	normalized[6] = normalized[4] + normalized[5];
	return normalized;
}

module.exports = {
	formatTimestamp: formatTimestamp,
	formatZip: formatZip,
	normalize: normalize,
	toFloatingPointSecondsFormat: toFloatingPointSecondsFormat
};