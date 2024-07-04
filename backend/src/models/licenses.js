const Sequelize = require('sequelize');
const sequelize = require('./database');
const User = require('./user');
const Billing = require('./billing');
const LicenseStatus = require('./licenseStatus');

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

Licenses.belongsTo(Billing, { foreignKey: 'idBill' });
Licenses.belongsTo(User, { foreignKey: 'idLicenseUser' });
Licenses.belongsTo(LicenseStatus, { foreignKey: 'idLicenseStatus' });

module.exports = Licenses;
