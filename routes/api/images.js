'use strict';

var router = require('express')
        .Router({
            caseSensitive: true,
            strict: true
        }),
    multer = require('multer'),
    fs = require('fs'),
    db = require('../../libs/data/database'),
    path = require('path'),
    passport = require('passport');

router.post('/',
    passport.authenticate('bearer', {session: false}),
    multer({
        dest: './uploads/',
        rename: function () {
            return Date.now();
        }
    }), function (req, res) {
        var filePath = req.files.file.path;
        db.Image
            .create({
                path: filePath,
                UserId: req.user.id
            })
            .then(function (image) {
                res.status(201).send({id: image.id, UserId: image.UserId});
            });
    });

router.get('/:id', function (req, res) {
    db.Image.find({id: req.params.id})
        .then(function (image) {
            res.sendFile(path.resolve(image.path));
        });
});

router.get('/', function (req, res) {
    db.Image.all({attributes: ['id', 'UserId']}).then(function (images) {
        res.send(images);
    });
});

module.exports = router;