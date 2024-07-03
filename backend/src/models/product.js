const Sequelize = require('sequelize');
const sequelize = require('./database');

const Product = sequelize.define('product', {
    idProduct: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idCategory: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    productName: {
        type: Sequelize.STRING(50)
    },
    productPrice: {
        type: Sequelize.REAL
    },
    productVersion: {
        type: Sequelize.REAL
    },
    productImage: {
        type: Sequelize.STRING(150)
    },
    productDescription: {
        type: Sequelize.STRING(300)
    },
    productInstalls: {
        type: Sequelize.INTEGER
    },
    productRating: {
        type: Sequelize.REAL
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Product;
