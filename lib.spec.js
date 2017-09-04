'use strict';
var expect = require('chai').expect;
var lib = require('./lib.js');

describe('formatZip', function () {
	it('should not change a 5 digit zip', function () {
		expect(lib.formatZip('12345')).to.equal('12345');
	});
	it('should prepend "0" for every missing numeral in a zip less than 5 digits', function () {
		expect(lib.formatZip('1234')).to.equal('01234');
		expect(lib.formatZip('1')).to.equal('00001');
	});
});

describe('toFloatingPointSecondsFormat', function(){
	it('should process milliseconds correctly', function () {
		expect(lib.toFloatingPointSecondsFormat('00:00:00.123')).to.equal(0.123);
	});
	it('should process seconds correctly', function () {
		expect(lib.toFloatingPointSecondsFormat('00:00:45.123')).to.equal(45.123);
	});
	it('should process minutes correctly', function () {
		expect(lib.toFloatingPointSecondsFormat('00:05:45.123')).to.equal(345.123);
	});
	it('should process hours correctly', function () {
		expect(lib.toFloatingPointSecondsFormat('01:05:45.123')).to.equal(3945.123);
	});
});