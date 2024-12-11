const Sequelize = require('sequelize');
const sequelize = require('./database');

const User = require('./user');

const Cart = sequelize.define('cart', {
    idCart: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idUser: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'idUser'
        }
    },
    cartPrice: {
        type: Sequelize.REAL,
        allowNull: false,
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Cart;
