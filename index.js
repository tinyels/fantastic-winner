'use strict';
var csv = require('csv');
var normalize = require('./lib.js').normalize;
process.stdin.resume();
process.stdin.setEncoding('utf8');

var row = 0;
process.stdin
	.pipe(csv.parse())
	.pipe(csv.transform(function (record) {
		if (row++ === 0) return record;
		return normalize(record);
	}))
	.pipe(csv.stringify())
	.pipe(process.stdout);

