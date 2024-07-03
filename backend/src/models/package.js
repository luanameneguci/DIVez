const Sequelize = require('sequelize');
const sequelize = require('./database');

const Package = sequelize.define('package', {
    idPackage: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    packageName: {
        type: Sequelize.STRING(50)
    },
    packagePrice: {
        type: Sequelize.REAL
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Package;
