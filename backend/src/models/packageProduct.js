const Sequelize = require('sequelize');
const sequelize = require('./database');
const Product = require('./product');
const Package = require('./package');

const PackageProduct = sequelize.define('packageProduct', {
    idPackageProduct: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idProduct: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: "idProduct",
        },
    },
    idPackage: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Package,
            key: "idPackage",
        },
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = PackageProduct;
