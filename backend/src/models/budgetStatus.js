const Sequelize = require('sequelize');
const sequelize = require('./database');

const BudgetStatus = sequelize.define('budgetStatus', {
    idBudgetStatus: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    budgetStatus: {
        type: Sequelize.STRING(50),
        allowNull: false,
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = BudgetStatus;
