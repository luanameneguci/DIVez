const Sequelize = require('sequelize');
const sequelize = require('./database');

const Billing = require('./billing');
const Product = require('./product');
const User = require('./user');

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
    licenseVersion: {
        type: Sequelize.REAL
    },
    idBill: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Billing,
            key: "idBill",
        },
    },
    idUser: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'idUser'
        }
    },
    idProduct: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'idProduct'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Licenses;
