var expect = require('chai').expect,
    db = require('../../libs/data/database'),
    userService = require('../../libs/auth/authService');

describe('Auth service', function () {
    describe('#createToken', function () {
        it('Should remove all tokens for the user and generate one new', function (done) {
            var user;
            db.sequelize.sync({force: true})
                .then(function () {
                    return db.User.create({
                        providerId: '11111',
                        provider: 'facebook',
                        profileLink: 'link',
                        displayName: 'egor'
                    });
                })
                .then(function (entity) {
                    user = entity;
                    return userService.createToken(user, 'token');
                })
                .then(function (token) {
                    expect(token.token).to.be.a('string');
                    expect(token.UserId).to.equal(user.id);
                    return db.AccessToken.count({where: {UserId: user.id}});

                })
                .then(function (count) {
                    expect(count).to.equal(1);
                    done();
                });
        });
    });

    describe('#getToken', function () {
        it('Should return token for the user', function (done) {
            var user;
            db.sequelize.sync({force: true})
                .then(function () {
                    return db.User.create({
                        providerId: '11111',
                        provider: 'facebook',
                        profileLink: 'link',
                        displayName: 'egor'
                    });
                })
                .then(function (entity) {
                    user = entity;
                    return userService.createToken(entity, 'token');

                })
                .then(function () {
                    return userService.getToken(user);
                })
                .then(function (token) {
                    expect(token.UserId).to.equal(user.id);
                    done();
                });

        });
    })
});