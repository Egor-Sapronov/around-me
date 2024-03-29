var mongoose = require('mongoose'),
    log = require('./log')(module),
    config = require('./config'),
    User = require('./models/authSchema').User,
    Client = require('./models/authSchema').Client,
    AccessToken = require('./models/authSchema').AccessToken,
    Image = require('./models/imageSchema').Image,
    Comment = require('./models/commentSchema').Comment;

mongoose.connect(config.get('mongoose:uri'));
var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback() {
    log.info("Connected to DB!");
});

// Auth models
var UserModel = mongoose.model('User', User),
    ClientModel = mongoose.model('Client', Client),
    AccessTokenModel = mongoose.model('AccessToken', AccessToken);

// Content models
var ImageModel = mongoose.model('Image', Image),
    CommentModel = mongoose.model('Comment', Comment);

module.exports.UserModel = UserModel;
module.exports.ClientModel = ClientModel;
module.exports.AccessTokenModel = AccessTokenModel;

module.exports.ImageModel = ImageModel;
module.exports.CommentModel = CommentModel;

