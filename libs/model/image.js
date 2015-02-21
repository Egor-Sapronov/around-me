'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Image', {
        image: {
            type: DataTypes.BLOB,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        freezeTableName: true,
        paranoid: true
    });
};
