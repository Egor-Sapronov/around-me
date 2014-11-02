var Schema = require('mongoose').Schema;

var Comment = new Schema({
    user: {type: Schema.ObjectId, ref: 'User'},
    created: Date,
    content: String
});

module.exports.Comment = Comment;