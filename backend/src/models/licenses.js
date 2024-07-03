const Sequelize = require('sequelize');
const sequelize = require('./database');

const Licenses = sequelize.define('licenses', {
    licenseKey: {
        type: Sequelize.STRING(23),
        primaryKey: true
    },
    idLicenseStatus: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idLicenseUser: {
        type: Sequelize.INTEGER
    },
    idBill: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Licenses;
