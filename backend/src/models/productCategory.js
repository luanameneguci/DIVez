const Sequelize = require('sequelize');
const sequelize = require('./database');

const ProductCategory = sequelize.define('productCategory', {
    idCategory: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category: {
        type: Sequelize.STRING(50),
        allowNull: false,
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = ProductCategory;
