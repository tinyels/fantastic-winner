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

function normalize(record) {
	return record.map(function (value, index) {
		switch (index) {
		case 2:
			return formatZip(value);
		case 3:
			return value.toUpperCase();
		default:
			return value;
		}
	});
}

module.exports = {
	formatZip: formatZip,
	normalize: normalize
};