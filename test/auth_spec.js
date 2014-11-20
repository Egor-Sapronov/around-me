var assert = require('assert'),
    UserModel = require('../libs/mongo').UserModel,
    AccessTokenModel = require('../libs/mongo').AccessTokenModel;
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

describe('LogOff spec', function () {
    it('Should remove access token', function (done) {
        var logOff = require('../libs/oauth2').logOff;

        logOff('Egor2', function (err) {
            if (!err) {
                UserModel.findOne({username: 'Egor2'}, function (err, user) {
                    AccessTokenModel.findOne({userId: user.userId}, function (err, token) {
                        if (err) {
                            done();
                        }

                        assert.equal(token, 'dsdgsdg');
                        done();
                    });
                });
            }
        });
    });
});
