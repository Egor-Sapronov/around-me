'use strict';

var db = require('../data/database'),
    authService = require('./authService');

/**
 * Exchange user for access token
 * @param {string} accessToken
 * @param {function} <err,user>
 */
function bearerStrategy(accessToken, done) {
    db.AccessToken
        .find({where: {token: accessToken}})
        .then(function (token) {
            if (!token) {
                return done(null, false);
            }

            return db.User
                .find({where: {id: token.UserId}})
                .then(function (user) {
                    return done(null, user);
                });
        })
        .catch(function (err) {
            if (err) {
                return done(err);
            }
        });
}

function faceBookStrategy(accessToken, refreshToken, profile, done) {
    console.log(profile);
    db.User
        .findOrCreate({
            where: {providerId: profile.id},
            defaults: {
                providerId: profile.id,
                provider: profile.provider,
                profileLink: profile.profileUrl,
                displayName: profile.displayName,
                name: profile._json.name,
                email: profile._json.email,
                gender: profile.gender
            }
        })
        .spread(function (user, created) {
            authService
                .createToken(user, accessToken)
                .then(function () {
                    return done(null, user);
                });

        });
}

module.exports.faceBookStrategy = faceBookStrategy;
module.exports.bearerStrategy = bearerStrategy;
