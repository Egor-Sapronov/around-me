'use strict';

var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    passport = require('./libs/auth/auth').passport,
    authRouter = require('./routes/auth'),
    imagesRouter = require('./routes/api/images'),
    app = express();

app.set('views', path.join(__dirname, 'client/build/assets/templates'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(passport.initialize());

app.use('/api/auth', authRouter);
app.use('/api/images', imagesRouter);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/build/assets/templates/main/index.html');
});

app.get('/upload', function (req, res) {
    res.sendFile(__dirname + '/client/build/assets/templates/main/upload.html');
});

app.get('/account/signin', function (req, res) {
    res.sendFile(__dirname + '/client/build/assets/templates/account/signin.html');
});

app.get('/account/signup', function (req, res) {
    res.sendFile(__dirname + '/client/build/assets/templates/account/signup.html');
});

app.post('/api/images', function (req, res) {
    res.status(200).end();
});

module.exports = app;
