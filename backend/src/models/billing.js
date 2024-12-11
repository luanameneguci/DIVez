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
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // Set default value to current timestamp
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Billing;
