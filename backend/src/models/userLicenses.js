const Sequelize = require('sequelize');
const sequelize = require('./database');

const Product = require('./product');
const User = require('./user');

const UserLicense = sequelize.define('userLicense', {
  idUserLicense: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idProduct: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
        model: Product,
        key: 'idProduct'
    }
  },
}, {
  timestamps: false
});

module.exports = UserLicense;
