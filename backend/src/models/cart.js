const Sequelize = require('sequelize');
const sequelize = require('./database');
const ProductCart = require('./productCart');
const PackageCart = require('./packageCart');
const Billing = require('./billing');
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
            model: 'user',
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

Cart.hasMany(ProductCart, { foreignKey: 'idCart' });
ProductCart.belongsTo(Cart, { foreignKey: 'idCart' });

Cart.hasMany(PackageCart, { foreignKey: 'idCart' });
PackageCart.belongsTo(Cart, { foreignKey: 'idCart' });

Cart.hasOne(Billing, { foreignKey: 'idCart' });
Billing.belongsTo(Cart, { foreignKey: 'idCart' });

User.hasMany(Cart, { foreignKey: 'idUser' });
Cart.belongsTo(User, { foreignKey: 'idUser' });

module.exports = Cart;
