'use strict';

var passport = require('passport'),
    BearerStrategy = require('passport-http-bearer').Strategy,
    bearerStrategy = require('./strategy').bearerStrategy,
    facebookStrategy = require('./strategy').faceBookStrategy,
    FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new BearerStrategy(bearerStrategy));
passport.use(new FacebookStrategy({
    clientID: '1590106217869305',
    clientSecret: '2429eab69c44d26827111c74f4329258',
    callbackURL: "https://around-me-dev.herokuapp.com/auth/facebook/callback"
}, facebookStrategy));

module.exports.passport = passport;