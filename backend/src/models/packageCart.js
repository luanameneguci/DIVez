const Sequelize = require('sequelize');
const sequelize = require('./database');

const PackageCart = sequelize.define('packageCart', {
    idCart: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    idPackage: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = PackageCart;
