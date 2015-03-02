'use strict';

var app = require('./app'),
    db = require('./libs/data/database');

db.sequelize
    .sync({force: true})
    .then(function () {
        app.listen(process.env.PORT || 3000, function () {
        });
    });