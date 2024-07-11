const Sequelize = require('sequelize');
const sequelize = require('./database');

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
    },
    budgetPrice: {
        type: Sequelize.REAL,
        allowNull: true,
    },
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Budget;
