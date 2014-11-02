var Schema = require('mongoose').Schema;

var Image = new Schema({
    geoLoc: [],
    description: String,
    uploaded: Date,
    likes: [
        {type: Schema.ObjectId, ref: 'UserModel'}
    ],
    user: {type: Schema.ObjectId, ref: 'UserModel'},
    image: Buffer
});

Image.virtual('likesCount')
    .get(function () {
        this.populate('likes')
            .exec(function (err, image) {
                return image.likes.length;
            });
    });

module.exports.Image = Image;