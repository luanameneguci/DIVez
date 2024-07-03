// TicketDepartment.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database'); // Adjust path as per your project structure

const TicketDepartment = sequelize.define('TicketDepartment', {
  IDTICKETDEPARTMENT: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  TICKETDEPARTMENT: {
    type: Sequelize.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'TICKETDEPARTMENT',
  timestamps: false
});

module.exports = TicketDepartment;
