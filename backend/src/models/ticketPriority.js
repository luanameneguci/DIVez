const Sequelize = require('sequelize');
const sequelize = require('./database');

const TicketPriority = sequelize.define('ticketPriority', {
  idTicketPriority: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  ticketPriority: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = TicketPriority;
