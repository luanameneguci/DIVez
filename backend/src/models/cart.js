const Sequelize = require('sequelize');
const sequelize = require('./database');

const Cart = sequelize.define('cart', {
    IDCART: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    IDUSER: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'USER',
            key: 'IDUSER'
        }
    },
    CARTPRICE: {
        type: Sequelize.REAL,
        allowNull: false,
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Cart;
