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
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    productPrice: {
        type: Sequelize.REAL,
        allowNull: false,
    },
    productVersion: {
        type: Sequelize.REAL,
        allowNull: false,
    },
    productImage: {
        type: Sequelize.STRING(150),
        allowNull: false,
    },
    productDescription: {
        type: Sequelize.STRING(300),
        allowNull: false,
    },
    productInstalls: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    productRating: {
        type: Sequelize.REAL,
        allowNull: false,
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Product;
