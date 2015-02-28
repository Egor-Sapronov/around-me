'use strict';

var passport = require('passport'),
    userService = require('../../libs/auth/authService'),
    router = require('express')
        .Router({
            caseSensitive: true,
            strict: true
        });

router.get('/', passport.authenticate('bearer', {session: false}), function (req, res) {
    res.send(req.user);
});

module.exports = router;