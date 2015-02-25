'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('FBUser', {
            username: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    is: /[a-z0-9A-Z-]{4,30}/
                }
            }
        },
        {
            freezeTableName: true,
            paranoid: true
        });
};