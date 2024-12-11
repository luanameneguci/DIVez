const Sequelize = require('sequelize');
const sequelize = require('./database');
const Cart = require('./cart');
const Product = require('./product');

const ProductCart = sequelize.define('productCart', {
    idProductCart: {
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
    idProduct: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'idProduct'
        }
    },
    numberOfLicenses: {
        type: Sequelize.INTEGER,
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = ProductCart;
