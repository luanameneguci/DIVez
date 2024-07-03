const Sequelize = require('sequelize');
const sequelize = require('./database');

const LicenseUser = sequelize.define('licenseUser', {
    idLicenseUser: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    licenseUser: {
        type: Sequelize.STRING(100)
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = LicenseUser;
