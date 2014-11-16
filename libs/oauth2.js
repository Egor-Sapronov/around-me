var oauth2orize = require('oauth2orize');
var passport = require('passport');
var crypto = require('crypto');
var UserModel = require('./mongo').UserModel;
var ClientModel = require('./mongo').ClientModel;
var AccessTokenModel = require('./mongo').AccessTokenModel;
var log = require('./log')(module);

// create OAuth 2.0 server
var server = oauth2orize.createServer();

// Exchange username & password for access token.
server.exchange(oauth2orize.exchange.password(function (client, username, password, scope, done) {
    UserModel.findOne({username: username}, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        if (!user.checkPassword(password)) {
            return done(null, false);
        }

        AccessTokenModel.remove({userId: user.userId, clientId: client.clientId}, function (err) {
            if (err) return done(err);
        });

        var tokenValue = crypto.randomBytes(32).toString('base64');

        var token = new AccessTokenModel({token: tokenValue, clientId: client.clientId, userId: user.userId});

        var info = {scope: '*'}
        token.save(function (err, token) {
            if (err) {
                return done(err);
            }
            done(null, tokenValue);
        });
    });
}));

function register(username, password, done) {
    var user = new UserModel({username: username, password: password});

    user.save(function (err, user) {
        if (err) {
            done(err, null);
            return log.error(err);
        }
        else {
            done(null, user);
            log.info("New user - %s:%s", user.username, user.password);
        }
    });
}

exports.register = register;


// token endpoint
exports.token = [
    passport.authenticate(['basic', 'oauth2-client-password'], {session: false}),
    server.token(),
    server.errorHandler()
];