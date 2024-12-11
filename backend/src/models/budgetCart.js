const Sequelize = require('sequelize');
const sequelize = require('./database');

const Cart = require('./cart');
const Budget = require('./budget');


const BudgetCart = sequelize.define('budgetCart', {
    idBudgetCart: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement: true
    },
    idCart: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Cart,
            key: 'idCart'
        }
    },
    idBudget: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Budget,
            key: 'idBudget'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = BudgetCart;
