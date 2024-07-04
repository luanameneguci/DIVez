const Sequelize = require('sequelize');
const sequelize = require('./database');

const Billing = sequelize.define('billing', {
    idBill: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idCart: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'cart',
            key: 'idCart'
        }
    },
    billDate: {
        type: Sequelize.DATE,
        allowNull: false,
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Billing;
