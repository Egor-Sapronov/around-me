var Schema = require('mongoose').Schema;

var Image = new Schema({
    geoLoc: [],
    description: String,
    uploaded: Date,
    userLiked: [
        {type: Schema.ObjectId, ref: 'UserModel'}
    ],
    user: {type: Schema.ObjectId, ref: 'UserModel'},
    image: Buffer
});

Image.virtual('likes')
    .get(function () {
        this.populate('userLiked')
            .exec(function (err, image) {
                return image.likes.length;
            });
    });

module.exports.Image = Image;