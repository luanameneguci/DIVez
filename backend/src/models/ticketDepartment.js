const Sequelize = require('sequelize');
const sequelize = require('./database');

const TicketDepartment = sequelize.define('TicketDepartment', {
  idTicketDepartment: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  ticketDepartment: {
    type: Sequelize.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'TicketDepartment',
  timestamps: false
});

module.exports = TicketDepartment;
