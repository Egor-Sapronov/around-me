'use strict';

var router = require('express')
        .Router({
            caseSensitive: true,
            strict: true
        }),
    multer = require('multer');

router.use(multer({
    dest: './uploads/',
    rename: function () {
        return Date.now();
    }
}));

router.post('/', function (req, res) {
    res.status(200).end();
});

module.exports = router;