const Sequelize = require('sequelize');
const sequelize = require('./database');

const TicketStatus = sequelize.define('TicketStatus', {
  idTicketStatus: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  ticketStatus: {
    type: Sequelize.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'TicketStatus',
  timestamps: false
});

module.exports = TicketStatus;
