const Sequelize = require('sequelize');
const sequelize = require('./database');

const Package = sequelize.define('package', {
    idPackage: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    packageName: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    packagePrice: {
        type: Sequelize.REAL,
        allowNull: false,
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Package;
