const Sequelize = require('sequelize');
const sequelize = require('./database');
const ProductCart = require('./productCart');
const PackageCart = require('./packageCart');
const Billing = require('./billing');

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

Cart.hasMany(ProductCart, { foreignKey: 'idCart' });
ProductCart.belongsTo(Cart, { foreignKey: 'idCart' });

Cart.hasMany(PackageCart, { foreignKey: 'idCart' });
PackageCart.belongsTo(Cart, { foreignKey: 'idCart' });

Cart.hasOne(Billing, { foreignKey: 'idCart' });
Billing.belongsTo(Cart, { foreignKey: 'idCart' });

module.exports = Cart;
