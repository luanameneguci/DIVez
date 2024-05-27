const { Sequelize, Op, Model, DataTypes } = require('sequelize');
var sequelize = require('./database');

// importa o modelo – chave forasteira idBuyer
var Buyer = require('./buyer');
var License = require('./lincenses');

var Manager = sequelize.define('manager', {
    idManager: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      managerName: {
        type: Sequelize.STRING,
        notNull: true,
        notEmpty: true,
        isAlpha: true,
      },
      managerNif: {
        type: Sequelize.STRING,
        notNull: true,
        notEmpty: true,
      },
      managerEmail: {
        type: Sequelize.STRING,
        notNull: true,
        notEmpty: true,
        isEmail: true,
      },
      managerPassword: {
        type: Sequelize.STRING,
        notNull: true,
        notEmpty: true,
      },
      idBuyer: {
        type: Sequelize.INTEGER,
        // referência a outro modelo
        references: {
          model: Buyer,
          key: "idBuyer",
        },
      },
    },
{
timestamps: false,
});
Manager.hasMany(Buyer, {foreignKey: 'idBuyer' });
Manager.belongsToMany(License, { through: 'ManagerLicense' });
License.belongsToMany(Manager, { through: 'ManagerLicense' });
module.exports = Manager;
