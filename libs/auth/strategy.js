'use strict';

var db = require('../data/database');

/**
 * Exchange user for email and password
 * @param {string} email
 * @param {string} password
 * @param {function} <err,user>
 */
function basicStrategy(email, password, done) {
    db.User
        .find({where: {email: email}})
        .then(function (user) {

            if (!user) {
                return done(null, false);
            }

            if (!user.checkPassword(password)) {
                return done(null, false);
            }

            return done(null, user);
        })
        .catch(function (err) {
            if (err) {
                return done(err);
            }
        });
}

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
                    done(null, user);
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
    db.FBUser.findOrCreate({where: {username: profile.displayName}, defaults: {username: profile.displayName}})
        .then(function (user) {
            done(null, user);
        });
}

module.exports.faceBookStrategy = faceBookStrategy;
module.exports.basicStrategy = basicStrategy;
module.exports.bearerStrategy = bearerStrategy;
