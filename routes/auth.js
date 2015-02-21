'use strict';

var passport = require('passport'),
    authService = require('../libs/auth/authService'),
    router = require('express')
        .Router({
            caseSensitive: true,
            strict: true
        });

router.get('/login',
    passport.authenticate('basic', {session: false}),
    function (req, res) {
        authService.createToken(req.user)
            .then(function (token) {
                res.status(200).send({
                    token: token.token,
                    username: req.user.username
                });
            });
    });

router.post('/signup', function (req, res) {
    authService.register({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(function (token) {
            res.status(200).send({
                token: token.token,
                username: req.body.username
            });
        });
});

router.get('/logoff',
    passport.authenticate('bearer', {session: false}),
    function (req, res) {
        authService.logOff(req.user)
            .then(function () {
                res.status(200).end();
            });
    });

module.exports = router;