const Sequelize = require('sequelize');
const sequelize = require('./database');

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
