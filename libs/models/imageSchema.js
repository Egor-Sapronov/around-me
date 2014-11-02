var Schema = require('mongoose').Schema;

var Image = new Schema({
    geoLoc: [],
    description: String,
    uploaded: Date,
    likes: [
        {type: Schema.ObjectId, ref: 'User'}
    ],
    user: {type: Schema.ObjectId, ref: 'User'},
    image: Buffer
});

module.exports.Image = Image;