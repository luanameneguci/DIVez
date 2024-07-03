const Sequelize = require('sequelize');
const sequelize = require('./database');

const LicenseStatus = sequelize.define('licenseStatus', {
    idLicenseStatus: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    licenseStatus: {
        type: Sequelize.STRING(50),
        allowNull: false,
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = LicenseStatus;
