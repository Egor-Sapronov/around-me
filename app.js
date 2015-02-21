'use strict';

var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    passport = require('./libs/auth/auth').passport,
    authRouter = require('./routes/auth'),
    app = express();

app.set('views', path.join(__dirname, 'client/build/assets/templates'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(compression({threshold: 512}));
app.use(passport.initialize());


app.use('/auth', authRouter);

module.exports = app;
