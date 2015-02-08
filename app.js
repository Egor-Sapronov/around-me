'use strict';

var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    auth = require('./libs/auth/auth'),
    passport = require('passport'),
    app = express();

app.set('views', path.join(__dirname, 'client/build/assets/templates'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(compression({threshold: 512}));
app.use(passport.initialize());


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build/assets/templates/main/index.html'));
});

app.get('/account', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build/assets/templates/account/profile.html'));
});

app.get('/account/signup', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build/assets/templates/account/signup.html'));
});

app.get('/account/signin', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build/assets/templates/account/signin.html'));
});

module.exports = app;
