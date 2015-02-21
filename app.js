'use strict';

var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    passport = require('./libs/auth/auth').passport,
    authRouter = require('./routes/auth'),
    app = express();

app.set('views', path.join(__dirname, 'client/build/assets/templates'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(passport.initialize());


app.use('/auth', authRouter);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/build/assets/templates/main/index.html');
});

app.get('/account/signin', function (req, res) {
    res.sendFile(__dirname + '/client/build/assets/templates/account/signin.html');
});

app.get('/account/signup', function (req, res) {
    res.sendFile(__dirname + '/client/build/assets/templates/account/signup.html');
});

module.exports = app;
