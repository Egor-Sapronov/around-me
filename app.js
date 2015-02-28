'use strict';

var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    passport = require('./libs/auth/auth').passport,
    authRouter = require('./routes/auth'),
    imagesRouter = require('./routes/api/images'),
    profilesRouter = require('./routes/api/profiles'),
    app = express();

app.set('views', path.join(__dirname, 'client/build/assets/templates'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(passport.initialize());

app.use('/auth', authRouter);
app.use('/api/images', imagesRouter);
app.use('/api/profiles', profilesRouter);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/build/assets/templates/main/index.html');
});

app.get('/upload', function (req, res) {
    res.sendFile(__dirname + '/client/build/assets/templates/main/upload.html');
});

app.get('/profile', function (req, res) {
    res.sendFile(__dirname + '/client/build/assets/templates/account/profile.html');
});

app.post('/api/images', function (req, res) {
    res.status(200).end();
});

module.exports = app;
