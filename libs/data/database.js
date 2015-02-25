'use strict';

/**
 * Main db module
 */

var Sequelize = require('sequelize'),
    sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/test', {logging: false}),
    User = require('../model/user'),
    AccessToken = require('../model/accessToken'),
    Role = require('../model/role'),
    FBUser = require('../model/fbUser'),
    Image = require('../model/image'),
    db = {
        sequelize: sequelize,
        Sequelize: Sequelize,
        User: sequelize.import('User', User),
        AccessToken: sequelize.import('AccessToken', AccessToken),
        Role: sequelize.import('Role', Role),
        Image: sequelize.import('Image', Image),
        FBUser: sequelize.import('FBUser', FBUser)
    };

db.Image.belongsTo(db.User);

db.AccessToken.belongsTo(db.User);

db.User.belongsToMany(db.Role, {through: 'UserRoles'});
db.Role.belongsToMany(db.User, {through: 'UserRoles'});

module.exports = db;