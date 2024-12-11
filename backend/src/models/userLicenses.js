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
    idUser: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
          model: User,
          key: 'idUser'
      }
    }
}, {
  timestamps: false
});

module.exports = UserLicense;
