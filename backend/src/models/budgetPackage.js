const Sequelize = require('sequelize');
const sequelize = require('./database');

const BudgetPackage = sequelize.define('budgetPackage', {
    idPackage: {
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

module.exports = BudgetPackage;
