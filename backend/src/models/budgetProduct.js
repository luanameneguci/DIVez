const Sequelize = require('sequelize');
const sequelize = require('./database');

const Product = require('./product');
const Budget = require('./budget');


const BudgetProduct = sequelize.define('budgetProduct', {
    idBudgetProduct: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement: true
    },
    idProduct: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'idProduct'
        }
    },
    idBudget: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Budget,
            key: 'idBudget'
        }
    },
    numberOfLicenses: {
        type: Sequelize.INTEGER,
    },
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = BudgetProduct;
