'use strict';

var db = require('../data/database');

/**
 * generate access token for user
 * @param user
 * @return promise <AccessToken>
 */
function createToken(user, token) {
    return db.AccessToken
        .destroy({where: {UserId: user.id}})
        .then(function () {
            return db.AccessToken
                .create({
                    token: token,
                    UserId: user.id
                });
        });
}

/**
 * delete all access tokens for the user
 * @param user
 * @return promise
 */
function logOff(user) {
    return db.AccessToken
        .destroy({where: {UserId: user.id}});
}

module.exports = {
    createToken: createToken,
    logOff: logOff
};
