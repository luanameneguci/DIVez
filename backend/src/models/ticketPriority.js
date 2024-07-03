// TicketPriority.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database'); // Adjust path as per your project structure

const TicketPriority = sequelize.define('TicketPriority', {
  IDTICKETPRIORITY: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  TICKETPRIORITY: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'TICKETPRIORITY',
  timestamps: false
});

module.exports = TicketPriority;
