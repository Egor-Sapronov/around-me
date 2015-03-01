'use strict';

var passport = require('passport'),
    authService = require('../libs/auth/authService'),
    router = require('express')
        .Router({
            caseSensitive: true,
            strict: true
        });

router.get('/logoff',
    passport.authenticate('bearer', {session: false}),
    function (req, res) {
        authService.logOff(req.user)
            .then(function () {
                res.status(200).end();
            });
    });

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/facebook', passport.authenticate('facebook', {
    session: false,
    scope: ['email', 'public_profile', 'user_about_me', 'user_photos']
}));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/facebook/callback',
    passport.authenticate('facebook', {
        session: false,
        failureRedirect: '/login'
    }),
    function (req, res) {
        authService.getToken(req.user)
            .then(function (token) {
                res.redirect('/profile#' + token.token);
            });

    });


module.exports = router;