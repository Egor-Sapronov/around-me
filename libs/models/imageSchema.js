var Schema = require('mongoose').Schema;

var Image = new Schema({
    geoLoc: [],
    description: String,
    uploaded: Date,
    likes: [
        {type: Schema.ObjectId, ref: 'UserModel'}
    ],
    comments: [
        {type: Schema.ObjectId, ref: 'CommentModel'}
    ],
    user: {type: Schema.ObjectId, ref: 'UserModel'},
    image: Buffer
});

module.exports.Image = Image;