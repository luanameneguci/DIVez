const Sequelize = require('sequelize');
const sequelize = require('./database');

const TicketStatus = sequelize.define('ticketStatus', {
  idTicketStatus: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ticketStatus: {
    type: Sequelize.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'ticketStatus',
  timestamps: false
});
module.exports = TicketStatus;
