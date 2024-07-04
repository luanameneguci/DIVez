const Sequelize = require('sequelize');
const sequelize = require('./database');

const TicketPriority = sequelize.define('TicketPriority', {
  idTicketPriority: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  ticketPriority: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'TicketPriority',
  timestamps: false
});

module.exports = TicketPriority;
