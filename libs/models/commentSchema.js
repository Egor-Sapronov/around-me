var Schema = require('mongoose').Schema;

var Comment = new Schema({
    user: {type: Schema.ObjectId, ref: 'UserModel'},
    created: Date,
    content: String
});

module.exports.Comment = Comment;