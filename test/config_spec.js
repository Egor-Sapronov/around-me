describe("config lib test", function () {
    var config = require('../libs/config');

    it('Should return string property', function () {
        expect(config.get('mongoose:uri')).toBeDefined();
    });
});   