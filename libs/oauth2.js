var oauth2orize = require('oauth2orize'),
    passport = require('passport'),
    crypto = require('crypto'),
    auth = require('./auth'),
    UserModel = require('./mongo').UserModel,
    ClientModel = require('./mongo').ClientModel,
    AccessTokenModel = require('./mongo').AccessTokenModel,
    log = require('./log')(module),
    server = oauth2orize.createServer();

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


// token endpoint
exports.token = [
    passport.authenticate(['basic', 'oauth2-client-password'], {session: false}),
    server.token(),
    server.errorHandler()
];