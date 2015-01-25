var log = require('../libs/log')(module);
var mongoose = require('mongoose');
var UserModel = require('../libs/mongo').UserModel;
var ClientModel = require('../libs/mongo').ClientModel;
var AccessTokenModel = require('../libs/mongo').AccessTokenModel;

UserModel.remove({}, function (err) {
    var user = new UserModel({username: "egor", password: "123456"});
    user.save(function (err, user) {
        if (err) return log.error(err);
        else log.info("New user - %s:%s", user.username, user.password);
    });

});

ClientModel.remove({}, function (err) {
    var client = new ClientModel({name: "OurService iOS client v1", clientId: "web", clientSecret: "qwerty"});
    client.save(function (err, client) {
        if (err) return log.error(err);
        else log.info("New client - %s:%s", client.clientId, client.clientSecret);
    });
});
AccessTokenModel.remove({}, function (err) {
    if (err) return log.error(err);
});

setTimeout(function() {
    mongoose.disconnect();
}, 3000);
