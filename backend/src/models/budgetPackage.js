const Sequelize = require('sequelize');
const sequelize = require('./database');

const Package = require('./package');
const Budget = require('./budget');


const BudgetPackage = sequelize.define('budgetPackage', {
    idBudgetPackage: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    idPackage: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Package,
            key: 'idPackage'
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
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = BudgetPackage;
