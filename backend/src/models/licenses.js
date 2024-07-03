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
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

License.belongsTo(Billing, { foreignKey: 'idBill' });
License.belongsTo(User, { foreignKey: 'idLicenseUser' });
License.belongsTo(LicenseStatus, { foreignKey: 'idLicenseStatus' });

module.exports = Licenses;
