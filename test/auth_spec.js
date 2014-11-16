var assert = require('assert');
describe('Register spec', function () {
    it('Should create a new user', function (done) {
        var register = require('../libs/oauth2').register;

        register('Egor2', '123456', function (err, user) {
            if (err) {
                assert.notEqual(err, null);
                assert.equal(user, null);
                done();
            } else {
                assert.equal(user.username, 'Egor2');
                assert.equal(err, null);
                done();
            }
        });
    });
});
