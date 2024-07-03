const Sequelize = require('sequelize');
const sequelize = require('./database');
const Product = require('./product');

const Package = sequelize.define('package', {
    idPackage: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    packageName: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    packagePrice: {
        type: Sequelize.REAL,
        allowNull: false,
    }
}, {
    timestamps: false,
    freezeTableName: true
});

Package.belongsToMany(Product, { through: PackageProduct, foreignKey: 'idPackage' });
Product.belongsToMany(Package, { through: PackageProduct, foreignKey: 'idProduct' });

module.exports = Package;
