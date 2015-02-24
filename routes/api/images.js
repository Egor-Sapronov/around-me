'use strict';

var router = require('express')
        .Router({
            caseSensitive: true,
            strict: true
        }),
    multer = require('multer'),
    fs = require('fs'),
    db = require('../../libs/data/database'),
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
                userId: req.user.id
            })
            .then(function (image) {
                res.status(201).end();
            });
    });

module.exports = router;