// budget.js
const Sequelize = require('sequelize');
const sequelize = require('./database');
const BudgetProduct = require('./budgetProduct');
const BudgetPackage = require('./budgetPackage');

const Budget = sequelize.define('budget', {
    idBudget: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    budgetDescription: {
        type: Sequelize.STRING(300)
    },
    budgetDate: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    idBudgetStatus: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idUser: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

Budget.hasMany(BudgetProduct, { foreignKey: 'idBudget' });
BudgetProduct.belongsTo(Budget, { foreignKey: 'idBudget' });

Budget.hasMany(BudgetPackage, { foreignKey: 'idBudget' });
BudgetPackage.belongsTo(Budget, { foreignKey: 'idBudget' });

module.exports = Budget;
