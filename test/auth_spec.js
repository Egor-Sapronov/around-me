var assert = require('assert');
describe('Register spec', function () {
    it('Should create a new user', function (done) {
        var register = require('../libs/oauth2').register;

        register('Egor2', '123456', function (err, user) {
            if (err) {
                assert.notEqual(err, undefined);
                done();
            } else {
                assert.equal(user.name, 'Egor2');
                done();
            }
        });
    });
});
