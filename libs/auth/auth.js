'use strict';

var passport = require('passport'),
    BasicStrategy = require('passport-http').BasicStrategy,
    BearerStrategy = require('passport-http-bearer').Strategy,
    basicStrategy = require('./strategy').basicStrategy,
    bearerStrategy = require('./strategy').bearerStrategy,
    facebookStrategy = require('./strategy').faceBookStrategy,
    FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new BasicStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, basicStrategy));
passport.use(new BearerStrategy(bearerStrategy));
passport.use(new FacebookStrategy({
    clientID: '1590106217869305',
    clientSecret: '2429eab69c44d26827111c74f4329258',
    callbackURL: "https://around-me-dev.herokuapp.com/auth/facebook/callback"
}, facebookStrategy));

module.exports.passport = passport;