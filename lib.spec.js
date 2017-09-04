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
