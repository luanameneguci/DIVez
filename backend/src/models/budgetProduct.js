const Sequelize = require('sequelize');
const sequelize = require('./database');

const BudgetProduct = sequelize.define('budgetProduct', {
    idProduct: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    idBudget: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = BudgetProduct;
