var Schema = require('mongoose').Schema;

var Image = new Schema({
    geoLoc: [],
    description: String,
    uploaded: Date,
    usersLiked: [
        {type: Schema.ObjectId, ref: 'UserModel'}
    ],
    comments: [
        {type: Schema.ObjectId, ref: 'CommentModel'}
    ],
    user: {type: Schema.ObjectId, ref: 'UserModel'},
    image: Buffer
});

Image.virtual('likes')
    .get(function () {
        this.populate('usersLiked')
            .exec(function (err, image) {
                return image.likes.length;
            });
    });

module.exports.Image = Image;