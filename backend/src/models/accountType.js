const Sequelize = require('sequelize');
const sequelize = require('./database');

const AccountType = sequelize.define('accountType', {
    idAccountType: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    accountType: {
        type: Sequelize.STRING(50),
        allowNull: false,
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = AccountType;
