const Sequelize = require('sequelize');
const sequelize = require('./database');

const PackageProduct = sequelize.define('packageProduct', {
    idProduct: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    idPackage: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = PackageProduct;
