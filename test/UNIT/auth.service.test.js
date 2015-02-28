var expect = require('chai').expect,
    db = require('../../libs/data/database'),
    userService = require('../../libs/auth/authService');

describe('Auth service', function () {
    describe('#createToken', function () {
        it('Should remove all tokens for the user and generate one new', function (done) {
            db.sequelize.sync({force: true})
                .then(function () {
                    return db.User.create({
                        providerId: '11111',
                        provider: 'facebook',
                        profileLink: 'link',
                        displayName: 'egor'
                    });
                })
                .then(function (user) {
                    userService
                        .createToken(user, 'token')
                        .then(function (token) {
                            expect(token.token).to.be.a('string');
                            expect(token.UserId).to.equal(user.id);
                            return db.AccessToken
                                .count({where: {UserId: user.id}});

                        })
                        .then(function (count) {
                            expect(count).to.equal(1);
                            done();
                        });
                });
        });

    });
});