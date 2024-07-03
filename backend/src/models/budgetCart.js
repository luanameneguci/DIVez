const Sequelize = require('sequelize');
const sequelize = require('./database');

const BudgetCart = sequelize.define('budgetCart', {
    idCart: {
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

module.exports = BudgetCart;
