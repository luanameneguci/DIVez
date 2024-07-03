const Sequelize = require('sequelize');
const sequelize = require('./database');

const ProductCart = sequelize.define('productCart', {
    idCart: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    idProduct: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = ProductCart;
