var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
//oauth2 = require('./libs/oauth2'),
//    passport = require('passport'),
    app = express();

require('./libs/auth');

app.set('views', path.join(__dirname, 'client/build/templates'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
//app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'client/build')));

//app.post('/oauth/token', oauth2.token);
//
//app.get('/api/userInfo',
//    passport.authenticate('bearer', {session: false}),
//    function (req, res) {
//        res.json({user_id: req.user.userId, name: req.user.username, scope: req.authInfo.scope})
//    }
//);

app.get('/',
    function (req, res) {
        res.render('index');
    });

//app.get('/login', function (req, res) {
//    res.render('login');
//});

module.exports = app;
