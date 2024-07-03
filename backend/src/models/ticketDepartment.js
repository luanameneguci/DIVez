const Sequelize = require('sequelize');
const sequelize = require('./database');

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
