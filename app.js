'use strict';

var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    app = express();

app.set('views', path.join(__dirname, 'client/build/assets/templates'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(compression({threshold: 512}));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build/assets/templates/index.html'));
});

app.get('/account', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build/assets/templates/partials/account/profile.html'));
});

app.get('/account/signin', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build/assets/templates/partials/account/signin.html'));
});

module.exports = app;
