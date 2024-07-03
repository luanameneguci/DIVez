const Sequelize = require('sequelize');
const sequelize = require('./database');

const Billing = sequelize.define('billing', {
    IDBILL: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    IDCART: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'CART',
            key: 'IDCART'
        }
    },
    BILLDATE: {
        type: Sequelize.DATE,
        allowNull: false,
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Billing;
