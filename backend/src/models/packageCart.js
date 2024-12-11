const Sequelize = require('sequelize');
const sequelize = require('./database');
const Cart = require('./cart');
const Package = require('./package');


const PackageCart = sequelize.define('packageCart', {
    idPackageCart: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idCart: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Cart,
            key: 'idCart'
        }
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

module.exports = PackageCart;
