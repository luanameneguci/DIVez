const Sequelize = require('sequelize');
const sequelize = require('./database');

const TicketDepartment = sequelize.define('ticketDepartment', {
  idTicketDepartment: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  ticketDepartment: {
    type: Sequelize.STRING(50),
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = TicketDepartment;
