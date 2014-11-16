describe("config lib test", function () {
    var config = require('../libs/config');
    var mongoose = require('mongoose');
    it('Should return string property', function () {
        expect(config.get('mongoose:uri')).toBeDefined();
    });
});   