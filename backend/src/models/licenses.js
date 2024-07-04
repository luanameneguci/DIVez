const Sequelize = require('sequelize');
const sequelize = require('./database');

const Billing = require('./billing');

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
        allowNull: false,
        references: {
            model: Billing,
            key: "idBill",
        },
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Licenses;
