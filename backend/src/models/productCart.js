const Sequelize = require('sequelize');
const sequelize = require('./database');

const ProductCart = sequelize.define('productCart', {
    idCart: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'cart',
            key: 'idCart'
        }
    },
    idProduct: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = ProductCart;
